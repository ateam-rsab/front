define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('MonitoringMesinAutoclaveCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', '$state', 'ManageSarpras', 'DateHelper',
    function($rootScope, $scope, ModelItem, IPSRSService, $state, ManageSarpras, DateHelper) {
      $scope.item = {};
      $scope.now = new Date();
      $scope.dataVOloaded = true;
      $scope.item.tgl = new Date();
      $scope.statusSave = true;
      $scope.RubahData = false;
      $scope.item.awal = $scope.now;
      $scope.item.akhir = $scope.now;
      ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat) {
        $scope.dataMasterPetugas = dat.data;
      });

      $scope.klick = function(dataSelected) {
        debugger
        if (dataSelected != undefined) {
          $scope.item.tgl = dataSelected.tanggal
          $scope.item.program = dataSelected.program
          $scope.item.hasil = dataSelected.hasil
          $scope.item.noMesin = {
            id: dataSelected.idMesin,
            namaExternal: dataSelected.namaMesin
          }
          $scope.item.operator = {
            id: dataSelected.idPegawai,
            namaLengkap: dataSelected.namaPegawai
          }
          $scope.item.keterangan = dataSelected.keterangan
          $scope.noRec = dataSelected.noRec;
          toastr.info('1 Data Edit Dipilih ');
        }
      }

      IPSRSService.getItem("pencatatan-suhu-mesin/get-mesin", true).then(function(dat) {
        $scope.listMonitoringMesin = dat.data;
      });

      $scope.batal = function() {
        $state.go('home');
      }

      $scope.mainGridOptions = {
        pageable: true,
        filterable: {
          extra: false,
          operators: {
            string: {
              startsWith: "Pencarian"
            }
          }
        },
        sortable: true,
        editable: false
      }

      $scope.ChangeData = function() {
        $scope.isLoading = true;
        $scope.Pencarians = "";
        $scope.Pencarians = undefined;
        $scope.RubahData = false;
        $scope.init();
        $scope.isLoading = false;
      }

      $scope.ClearCari = function(Pencarians) {
        $scope.item.Pencarians = "";
        var gridData = $("#grid").data("kendoGrid");
        gridData.dataSource.filter({});
      }

      $scope.init = function(Pencarians) {
        debugger
        var getPencarian = Pencarians;
        var tanggalawalParse = new moment($scope.item.awal).format('YYYY-MM-DD')
        var tanggalakhirParse = new moment($scope.item.akhir).format('YYYY-MM-DD');
        var no = 1;
        if ($scope.RubahData == false && getPencarian == undefined) {
          ManageSarpras.getOrderList("monitoringmesinautoclavebowidick/get-monitoring-mesin-clave-bowidick?startDate=" + tanggalawalParse + "&endDate=" + tanggalakhirParse, true).then(function(dat) {
            debugger
            $scope.datagrid = dat.data.data;
            for (var i = 0; i < $scope.datagrid.length; i++) {
              $scope.datagrid[i].no = no++;
              var tanggal = new moment($scope.datagrid[i].tanggal).format('YYYY-MM-DD');
              $scope.datagrid[i].tanggal = tanggal;

            }
            $scope.dataSource = new kendo.data.DataSource({
              data: $scope.datagrid,
              pageable: true,
              sortable: true,
              batch: true,
              autoSync: false
            });
          });
        } else {
          $scope.FilterdataSource(Pencarians)
        }
      }
      $scope.init();

      $scope.FilterdataSource = function(getPencarian) {
        if (getPencarian != undefined) {
          var q = getPencarian;
          var grid = $("#grid").data("kendoGrid");
          grid.dataSource.query({
            page: 1,
            pageSize: 20,
            filter: {
              logic: "or",
              filters: [{
                  field: "namaMesin",
                  operator: "contains",
                  value: q
                },
                {
                  field: "namaPegawai",
                  operator: "contains",
                  value: q
                }
              ]
            }
          });
        }
      }

      $scope.columnMonitoringMesin = [{
          "field": "no",
          "title": "<h3 align=center>No. <h3>",
          "width": "40px",
          "filterable": false
        },
        {
          "field": "tanggal",
          "title": "<h3 align=center>Tanggal<h3>",
          "width": "100px",
          "attributes": {
            "class": "table-cell"
          },
          "filterable": false
        },
        {
          "field": "program",
          "title": "<h3 align=center>Program<h3>",
          "width": "100px",
          "attributes": {
            "class": "table-cell"
          },
          "filterable": false
        },
        {
          "field": "namaMesin",
          "title": "<h3 align=center>No Mesin<h3>",
          "width": "100px",
          "attributes": {
            "class": "table-cell"
          },
          "filterable": false
        },
        {
          "field": "hasil",
          "title": "<h3 align=center>Hasil<h3>",
          "width": "100px",
          "attributes": {
            "class": "table-cell"
          },
          "filterable": false
        },
        {
          "field": "namaPegawai",
          "title": "<h3 align=center>Operator<h3>",
          "width": "100px",
          "attributes": {
            "class": "table-cell"
          },
          "filterable": false
        },
        {
          "field": "keterangan",
          "title": "<h3 align=center>Keterangan<h3>",
          "width": "100px",
          "attributes": {
            "class": "table-cell"
          },
          "filterable": false
        },
        {
          "title": "<h3 align=center>Action</h3>",
          "width": "100px",
          "template": "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
        }

      ];

      $scope.Refresh = function() {
        $scope.item = {};
        $scope.now = new Date();
        $scope.item.tgl = new Date();
        $scope.item.awal = $scope.now;
        $scope.item.akhir = $scope.now;
        $scope.noRec = undefined;
      }

      $scope.disableData = function() {
        debugger
        var isigrid = this.dataItem;
        var Idgrid = isigrid.id;
        var data = {
          "noRec": isigrid.noRec,
          "tanggal": isigrid.tanggal,
          "program": isigrid.program,
          "mesinId": isigrid.idMesin,
          "hasil": isigrid.hasil,
          "operatorId": isigrid.idPegawai,
          "keterangan": isigrid.keterangan,
          "statusEnabled": false
        }
        ManageSarpras.saveDataUji(data, "monitoringmesinautoclavebowidick/save-monitoring-mesin-clave-bowidick").then(function(e) {
          $scope.init();
          $scope.item = {};
          $scope.noRec = undefined;
          $scope.item.tgl = new Date();
          $scope.item.awal = new Date();
          $scope.item.akhir = new Date();
        });
      }

      $scope.Save = function() {
        debugger
        var tanggal = DateHelper.formatDate($scope.item.tgl, "YYYY-MM-DD")
        var mesinId = $scope.item.noMesin;
        var operatorId = $scope.item.operator;

        var listRawRequired = [
          "item.tgl|k-ng-model|Tanggal",
          "item.program|ng-model|Program",
          "item.noMesin|k-ng-model|No Mesin",
          "item.hasil|ng-model|Hasil",
          "item.operator|k-ng-model|Operator",
        ];
        var isValid = ModelItem.setValidation($scope, listRawRequired);
        if (isValid.status) {

          var data = {
            "noRec": $scope.noRec,
            "tanggal": tanggal,
            "program": $scope.item.program,
            "mesinId": $scope.item.noMesin.id,
            "hasil": $scope.item.hasil,
            "operatorId": $scope.item.operator.id,
            "keterangan": $scope.item.keterangan,
            "statusEnabled": $scope.statusSave
          }
          ManageSarpras.saveDataUji(data, "monitoringmesinautoclavebowidick/save-monitoring-mesin-clave-bowidick").then(function(e) {
            $scope.init();
            $scope.item = {};
            $scope.noRec = undefined;
            $scope.item.tgl = new Date();
            $scope.item.awal = new Date();
            $scope.item.akhir = new Date();
          });
        } else {
          ModelItem.showMessages(isValid.messages);
        }
      }

    }
  ]);
});
