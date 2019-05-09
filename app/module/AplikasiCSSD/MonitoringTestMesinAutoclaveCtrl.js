define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('MonitoringTestMesinAutoclaveCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', '$state', 'ManageSarpras', 'DateHelper',
    function($rootScope, $scope, ModelItem, IPSRSService, $state, ManageSarpras, DateHelper) {
      $scope.item = {};
      $scope.now = new Date();
      $scope.dataVOloaded = true;
      $scope.item.tgl = new Date();
      $scope.item.awal = $scope.now;
      $scope.item.akhir = $scope.now;
      $scope.statusSave = true;
      $scope.RubahData = false;
      ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat) {
        $scope.dataMasterPetugas = dat.data;
      });

      $scope.klik = function(dataSelected) {
        debugger
        if (dataSelected != undefined) {
          $scope.item.tgl = dataSelected.tanggal
          $scope.item.jamMasuk = dataSelected.jamMasuk
          $scope.item.jamKeluar = dataSelected.jamKeluar
          $scope.item.pemeriksaan = dataSelected.pemeriksaan
          $scope.item.keterangan = dataSelected.keterangan
          $scope.item.petugas = {
            id: dataSelected.idPegawai,
            namaLengkap: dataSelected.namaPegawai
          }
          $scope.item.noMesin = {
            id: dataSelected.idMesin,
            namaExternal: dataSelected.namaMesin
          }
          $scope.noRec = dataSelected.noRec;
          $scope.item.suhuSterile = dataSelected.suhu;
          toastr.info('1 Data Edit Dipilih ');
          $scope.jamMasukSelect = dataSelected.jamMasuk;
          $scope.jamKeluarSelect = dataSelected.jamKeluar;
        }
      }

      IPSRSService.getItem("pencatatan-suhu-mesin/get-mesin", true).then(function(dat) {
        $scope.listMesin = dat.data.data;
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
        var tanggalawalParse = new moment($scope.item.awal).format('YYYY-MM-DD');
        var tanggalakhirParse = new moment($scope.item.akhir).format('YYYY-MM-DD');
        var no = 1;

        if ($scope.RubahData == false && getPencarian == undefined) {
          ManageSarpras.getOrderList("monitoringtestmesinautoclave/get-monitoring-test-mesin-clave?startDate=" + tanggalawalParse + "&endDate=" + tanggalakhirParse, true).then(function(dat) {
            $scope.datagrid = dat.data.data;
            for (var i = 0; i < $scope.datagrid.length; i++) {
              $scope.datagrid[i].no = no++;
              var tanggal = new moment($scope.datagrid[i].tanggal).format('YYYY-MM-DD');
              // var jamMasuk = new moment($scope.datagrid[i].jamMasuk).format('HH:mm');
              // var jamKeluar = new moment($scope.datagrid[i].jamKeluar).format('HH:mm');
              $scope.datagrid[i].tanggal = tanggal;
              // $scope.datagrid[i].jamMasuk = jamMasuk;
              // $scope.datagrid[i].jamKeluar = jamKeluar;
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

      $scope.columnAutoClave = [{
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
          "field": "namaMesin",
          "title": "<h3 align=center>No Mesin<h3>",
          "width": "100px",
          "attributes": {
            "class": "table-cell"
          },
          "filterable": false

        },
        {
          "field": "suhu",
          "title": "<h3 align=center>Suhu Sterile<h3>",
          "width": "100px",
          "attributes": {
            "class": "table-cell"
          },
          "filterable": false
        },
        {
          "field": "jamMasuk",
          "title": "<h3 align=center>Jam Masuk<h3>",
          "width": "100px",
          "attributes": {
            "class": "table-cell"
          },
          "filterable": false
        },
        {
          "field": "jamKeluar",
          "title": "<h3 align=center>Jam Keluar<h3>",
          "width": "100px",
          "attributes": {
            "class": "table-cell"
          },
          "filterable": false
        },
        {
          "field": "pemeriksaan",
          "title": "<h3 align=center>Pemeriksaan Setelah 4 Jam<h3>",
          "width": "100px",
          "attributes": {
            "class": "table-cell"
          },
          "filterable": false
        },
        {
          "field": "namaPegawai",
          "title": "<h3 align=center>Petugas<h3>",
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
          "jamMasuk": isigrid.jamMasuk,
          "jamKeluar": isigrid.jamKeluar,
          "pemeriksaan": isigrid.pemeriksaan,
          "keterangan": isigrid.keterangan,
          "mesinId": isigrid.idMesin,
          "petugasId": isigrid.idPegawai,
          "suhu": isigrid.suhu,
          "statusEnabled": "false"
        }
        ManageSarpras.saveDataUji(data, "monitoringtestmesinautoclave/save-monitoring-test-mesin-clave").then(function(e) {
          $scope.init();
          $scope.item = {};
          $scope.noRec = undefined;
          $scope.item.tgl = new Date();
          $scope.item.awal = new Date();
          $scope.item.akhir = new Date();
        });
      }

      $scope.Save = function() {
        if ($scope.noRec == undefined) {
          var tanggal = DateHelper.formatDate($scope.item.tgl, "YYYY-MM-DD");
          var jamMasuk = new moment($scope.item.jamMasuk).format('HH:mm');
          var jamKeluar = new moment($scope.item.jamKeluar).format('HH:mm');
        } else {
          var tanggal = DateHelper.formatDate($scope.item.tgl, "YYYY-MM-DD");

          if ($scope.item.jamMasuk == $scope.jamMasukSelect) {
            var jamMasuk = $scope.item.jamMasuk;
          } else {
            var jamMasuk = new moment($scope.item.jamMasuk).format('HH:mm');
          }

          if ($scope.item.jamKeluar == $scope.jamKeluarSelect) {
            var jamKeluar = $scope.item.jamKeluar;
          } else {
            var jamKeluar = new moment($scope.item.jamKeluar).format('HH:mm');
          }

        }

        var listRawRequired = [
          "item.tgl|k-ng-model|Tanggal ",
          "item.noMesin|k-ng-model|No Mesin",
          "item.suhuSterile|ng-model|Suhu",
          "item.jamMasuk|k-ng-model|Jam Masuk",
          "item.jamKeluar|k-ng-model|Jam Keluar",
          "item.pemeriksaan|ng-model|Pemeriksaan",
          "item.petugas|k-ng-model|Petugas",
        ];
        var isValid = ModelItem.setValidation($scope, listRawRequired);
        if (isValid.status) {

          var data = {
            "noRec": $scope.noRec,
            "tanggal": tanggal,
            "jamMasuk": jamMasuk,
            "jamKeluar": jamKeluar,
            "pemeriksaan": $scope.item.pemeriksaan,
            "keterangan": $scope.item.keterangan,
            "mesinId": $scope.item.noMesin.id,
            "petugasId": $scope.item.petugas.id,
            "suhu": $scope.item.suhuSterile,
            "statusEnabled": $scope.statusSave
          }
          ManageSarpras.saveDataUji(data, "monitoringtestmesinautoclave/save-monitoring-test-mesin-clave").then(function(e) {
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
