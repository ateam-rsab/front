define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('StandarPelayananMakananCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'ManageGizi', 'FindPasienGizi', '$window',
    function($rootScope, $scope, $state, ModelItem, ManageGizi, FindPasienGizi, $window) {
      $scope.item = {};
      $scope.isShowPopUp = false;
      $scope.now = new Date();

      $scope.SourceDataStandar = new kendo.data.DataSource({
        pageSize: 10,
        data: []
      })

      var onChange = function(e) {
        var grid = $(this).data("mainGridOptions");
      }

      // ModelItem.getDataDummyGeneric("Ruangan", true, true, 10).then(function(data) {
      //   debugger
      //   $scope.ListnamaRuangan = data;
      // });

      //daftar standar pelayanan makanan combobox
      // ModelItem.getDataDummyGeneric("Ruangan", true, true, 10).then(function(data) {
      //   $scope.SourceRuangan = data;
      // });
      //==================================

      FindPasienGizi.getGizi("standar-pelayanan-makanan/get-ruangan/").then(function(dat) {
        debugger
        $scope.ListnamaRuangan = dat.data
      });

      FindPasienGizi.getGizi("service/list-generic/?view=Kelas&select=id,namaExternal").then(function(dat) {
        $scope.ListKelas = dat.data
      });

      //daftar standar pelayanan makanan combobox
      // FindPasienGizi.getGizi("service/list-generic/?view=Kelas&select=id,namaKelas").then(function(dat) {
      //   debugger
      //   $scope.SourceKelas = dat.data
      // });
      //====================================

      FindPasienGizi.getGizi("service/list-generic/?view=SatuanStandar&select=id,satuanStandar").then(function(dat) {
        $scope.ListSatuan = dat.data;
      });

      FindPasienGizi.getGizi("menu/find-all/").then(function(dat) {
        var dataTemp = [];
        $scope.listMenuMakanan = dat.data.data.data;
        for (var i = 0; i < $scope.listMenuMakanan.length; i++) {
          var dataOld = $scope.listMenuMakanan[i].detailJenisProduk
          if (dataOld == dataTemp) {
            dataTemp = $scope.listMenuMakanan[i].detailJenisProduk
          }
        }
      });

      FindPasienGizi.getGizi("jenis-waktu/get-jenis-waktu/").then(function(dat) {
        $scope.ListwaktuMakan = dat.data.data;
      });

      //daftar standar pelayanan makanan combobox
      // FindPasienGizi.getGizi("jenis-waktu/get-jenis-waktu/").then(function(dat) {
      //   $scope.SourceJenisWaktu = dat.data.data;
      // });
      //========================================

      // ModelItem.get("Gizi/MasterSiklusMenu").then(function(dat) {
      //   $scope.SourceMenuSiklus = dat.data.data;
      // });

      FindPasienGizi.getGizi("menu/find-all/").then(function(dat) {
        $scope.SourceMenuSiklus = dat.data.data;
      });

      $scope.mainGridOptions = {
        pageable: true,
        scrollable: false,
        change: onChange,
        autoBind: true,
        columns: [{
            "field": "no",
            "title": "<h3 align=center>No</h3>",
            "width": "30px"
          },
          {
            "field": "namaMenu",
            "title": "<h3 align=center>Nama Menu</h3>",
            "width": "200px"
          }, {
            "field": "deskripsiMenu",
            "title": "<h3 align=center>Deskripsi Menu</h3>",
            "width": "200px"
          }, {
            "field": "berat",
            "title": "<h3 align=center>Berat (gr)<h3>",
            "width": "100px"
          }, {
            "field": "satuan",
            "title": "<h3 align=center>Satuan<h3>",
            "width": "200px",
            footerTemplate: "<h3 align=center>Jumlah:<h3>"
          }, {
            "title": "<h3 align=center>Nilai Gizi<h3>",
            "columns": [{
                "field": "energi",
                "title": "<h3 align=center>Energi (Kkal)<h3>",
                "width": "150px",
                headerAttributes: {
                  style: "text-align : center"
                },
                footerTemplate: "<span class='style-right'><h3 align=center>{{jumlahenergi}}</h3></span>"
              }, {
                "field": "protein",
                "title": "<h3 align=center>Protein (gr)<h3>",
                "width": "150px",
                footerTemplate: "<span class='style-right'><h3 align=center>{{JumlahProtein}}</h3></span>"
              }, {
                "field": "lemak",
                "title": "<h3 align=center>Lemak (gr)<h3>",
                "width": "150px",
                footerTemplate: "<span class='style-right'><h3 align=center>{{JumlahLemak}}</h3></span>"
              }, {
                "field": "karbonhidrat",
                "title": "<h3 align=center>Karbohidrat (gr)<h3>",
                "width": "150px",
                footerTemplate: "<span class='style-right'><h3 align=center>{{JumlahKarbohidrat}}</h3></span>"
              }, {
                "field": "keterangan",
                "title": "<h3 align=center>Keterangan<h3>",
                "width": "200px"
              }, {
                command: {
                  text: "Hapus",
                  width: "50px",
                  align: "center",
                  attributes: {
                    align: "center"
                  },
                  click: $scope.removeSiklus
                },
                title: "<h3 align=center>Action<h3>",
                width: "80px"
              }
            ],
            pageable: true,
            sortable: false,
            selectable: "row",
            editable: "popup"
          }
        ]
      }

      $scope.Batal = function() {
        $scope.item = {};
        $scope.SourceDataStandar.data([]);
      }

      $scope.init = function(Pencarians) {
        //hardCord
        var getPencarian = Pencarians;
        var berat2 = 0;
        var jumlahenergi2 = 0;
        var JumlahProtein2 = 0;
        var JumlahLemak2 = 0;
        var JumlahKarbohidrat2 = 0;
        $scope.number = 1;
        if (getPencarian == undefined) {
          FindPasienGizi.getGizi("standar-pelayanan-makanan/get-all/").then(function(dat) {
            $scope.source = dat.data.data;
            for (var i = 0; i < $scope.source.length; i++) {
              $scope.source[i].no = $scope.number++;
            }

            $scope.dataSource = new kendo.data.DataSource({
              pageSize: 10,
              data: $scope.source
            });
            var DataGrid2 = $scope.source;
            for (var i = 0; i < DataGrid2.length; i++) {
              if (DataGrid2[i].energi == null) {
                DataGrid2[i].energi = 0
              }
              if (DataGrid2[i].protein == null) {
                DataGrid2[i].protein = 0
              }
              if (DataGrid2[i].lemak == null) {
                DataGrid2[i].lemak = 0
              }
              if (DataGrid2[i].berat == null) {
                DataGrid2[i].berat = 0
              }
              if (DataGrid2[i].karbonhidrat == null) {
                DataGrid2[i].karbonhidrat = 0
              }
              jumlahenergi2 += (parseInt(DataGrid2[i].energi) * 1);
              berat2 += (parseInt(DataGrid2[i].berat) * 1);
              JumlahProtein2 += (parseInt(DataGrid2[i].protein) * 1);
              JumlahLemak2 += (parseInt(DataGrid2[i].lemak) * 1);
              JumlahKarbohidrat2 += (parseInt(DataGrid2[i].karbonhidrat) * 1);
            }
            $scope.jumlahenergi2 = jumlahenergi2;
            $scope.JumlahProtein2 = JumlahProtein2;
            $scope.JumlahLemak2 = JumlahLemak2;
            $scope.berat2 = berat2;
            $scope.JumlahKarbohidrat2 = JumlahKarbohidrat2;
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
                  field: "namaKelas",
                  operator: "contains",
                  value: q
                },
                {
                  field: "namaRuangan",
                  operator: "contains",
                  value: q
                },
                {
                  field: "menuMakanan",
                  operator: "contains",
                  value: q
                },
                {
                  field: "jenisWaktu",
                  operator: "contains",
                  value: q
                }
              ]
            }
          });
        }
      }

      $scope.columnPelayananMakanan = [{
          "field": "no",
          "title": "<h3 align=center>No</h3>",
          "width": "30px"
        },
        {
          "field": "namaRuangan",
          "title": "<h3 align=center>Ruangan</h3>",
          "width": "100px"
        },
        {
          "field": "menuMakanan",
          "title": "<h3 align=center>Nama Menu</h3>",
          "width": "200px"
        }, {
          "field": "berat",
          "title": "<h3 align=center>Berat (gr)<h3>",
          "width": "100px",
          footerTemplate: "<span class='style-right'><h3 align=center>{{berat2}}</h3></span>"
        }, {
          "field": "satuanStandar",
          "title": "<h3 align=center>Satuan<h3>",
          "width": "200px",
          footerTemplate: "<h3 align=center>Jumlah:<h3>"
        }, {
          "title": "<h3 align=center>Nilai Gizi<h3>",
          "columns": [{
            "field": "energi",
            "title": "<h3 align=center>Energi (Kkal)<h3>",
            "width": "150px",
            footerTemplate: "<span class='style-right'><h3 align=center>{{jumlahenergi2}}</h3></span>"
          }, {
            "field": "protein",
            "title": "<h3 align=center>Protein (gr)<h3>",
            "width": "150px",
            footerTemplate: "<span class='style-right'><h3 align=center>{{JumlahProtein2}}</h3></span>"
          }, {
            "field": "lemak",
            "title": "<h3 align=center>Lemak (gr)<h3>",
            "width": "150px",
            footerTemplate: "<span class='style-right'><h3 align=center>{{JumlahLemak2}}</h3></span>"
          }, {
            "field": "karbonhidrat",
            "title": "<h3 align=center>Karbohidrat (gr)<h3>",
            "width": "150px",
            footerTemplate: "<span class='style-right'><h3 align=center>{{JumlahKarbohidrat2}}</h3></span>"
          }, {
            "field": "jenisWaktu",
            "title": "<h3 align=center>Jenis Waktu<h3>",
            "width": "200px"
          }]
        }
      ]

      $scope.mainGridOptions2 = {
        pageable: true,
        scrollable: false,
      }

      $scope.ClearCari = function(Pencarians) {
        $scope.item.Pencarians = "";
        var dataGrid = $("#grid").data("kendoGrid");
        dataGrid.dataSource.filter({});
      }

      $scope.Refresh = function() {
        $scope.item = {};
      }

      $scope.SumData = function(argument) {
        var jumlahenergi = 0;
        var JumlahProtein = 0;
        var JumlahLemak = 0;
        var JumlahKarbohidrat = 0;
        var DataGrid = $scope.SourceDataStandar._data;
        for (var i = 0; i < DataGrid.length; i++) {
          jumlahenergi += (parseInt(DataGrid[i].energi) * 1);
          JumlahProtein += (parseInt(DataGrid[i].protein) * 1);
          JumlahLemak += (parseInt(DataGrid[i].lemak) * 1);
          JumlahKarbohidrat += (parseInt(DataGrid[i].karbonhidrat) * 1);
        }
        $scope.jumlahenergi = jumlahenergi;
        $scope.JumlahProtein = JumlahProtein;
        $scope.JumlahLemak = JumlahLemak;
        $scope.JumlahKarbohidrat = JumlahKarbohidrat;
        $scope.data = 1;
        // return $scope.jumlahenergi, $scope.JumlahProtein, $scope.JumlahLemak, $scope.JumlahKarbohidrat;
      }
      $scope.SumData($scope.data);

      $scope.removeSiklus = function(e) {
        e.preventDefault();
        $scope.remove = true;
        var grid = this;
        var row = $(e.currentTarget).closest("tr");
        var tr = $(e.target).closest("tr");
        var data = this.dataItem(tr);

        $scope.tempDataPenerimaanLinen = $scope.SourceDataStandar
          .filter(function(el) {
            return el.no !== grid[0].no;
          });
        grid.removeRow(row);
        $scope.SumData();
        // $scope.RunningRemove();
      };


      $scope.CountConverte = function(values) {
        var data = values;
      }

      $scope.sum = function() {
        // body...
      }

      $scope.no = 1;
      $scope.Tambah = function() {
        var listRawRequired = [
          "item.menuMakanan|k-ng-model|Menu Makanan",
          "item.namaRuangan|k-ng-model|Nama Ruangan",
          "item.satuan|k-ng-model|Satuan",
          "item.waktuMakan|k-ng-model|Waktu Makan",
          "item.kelas|k-ng-model|Kelas",
          "item.berat|ng-model|Berat",
          "item.energi|ng-model|Energi",
          "item.protein|ng-model|Protein",
          "item.lemak|ng-model|Lemak",
          "item.Karbonhidrat|ng-model|Karbohidrat",
          "item.qty|ng-model|Qty",
        ];
        var isValid = ModelItem.setValidation($scope, listRawRequired);
        if (isValid.status) {
          var tempData = {
            "no": $scope.no++,
            "ObjeckMenu": {
              "id": $scope.item.menuMakanan.detailJenisId,
              "namaProduk": $scope.item.menuMakanan.detailJenisProduk
            },
            "ObjeckRuangan": {
              "id": $scope.item.namaRuangan.id,
              "namaRuangan": $scope.item.namaRuangan.namaRuangan
            },
            "ObjeckSatuan": {
              "id": $scope.item.satuan.id,
              "satuanStandar": $scope.item.satuan.satuanStandar
            },
            "ObjeckWaktuMakanan": {
              "id": $scope.item.waktuMakan.id,
              "jenisWaktu": $scope.item.waktuMakan.jenisWaktu
            },
            "ObjectKelas": {
              "id": $scope.item.kelas.id,
              "namaExternal": $scope.item.kelas.namaExternal
            },
            "qty": $scope.item.qty,
            "deskripsiMenu": "Deskripsi Dummy",
            "keterangan": "Keterangan Dummy",
            "satuan": $scope.item.satuan.satuanStandar,
            "namaMenu": $scope.item.menuMakanan.detailJenisProduk,
            "berat": $scope.item.berat,
            "energi": $scope.item.energi,
            "protein": $scope.item.protein,
            "lemak": $scope.item.lemak,
            "karbonhidrat": $scope.item.Karbonhidrat
          }
          $scope.SourceDataStandar.add(tempData);
          $scope.SumData();
          $scope.init();
          $scope.item = {};
        } else {
          ModelItem.showMessages(isValid.messages);
        }
      }

      $scope.Save = function(argument) {
        var data = [];
        if ($scope.SourceDataStandar._data[0] != undefined) {
          $scope.SourceDataStandar._data.forEach(function(e) {
            var dataTemp = {
              "ruanganId": e.ObjeckRuangan.id,
              "kelasId": e.ObjectKelas.id,
              "menuMakananId": e.ObjeckMenu.id,
              "jenisWaktuId": e.ObjeckWaktuMakanan.id,
              "satuanStandarId": e.ObjeckSatuan.id,
              "berat": e.berat,
              "qty": e.qty,
              "energi": e.energi,
              "protein": e.protein,
              "karbonhidrat": e.karbonhidrat,
              "lemak": e.lemak
            }

            data.push(dataTemp);
          })
          console.log(JSON.stringify(data));
          ManageGizi.saveGizi(data,"standar-pelayanan-makanan/save/").then(function(e) {
            $scope.init();
          });
        } else {
          window.messageContainer.error('Daftar Harap di Tambah dahulu')
        }
      }

      // $scope.addSiklus = function() {
      //   var tempSiklus = {
      //     "kodeSiklus": $scope.item.kodeSiklus,
      //     "namaSiklus": $scope.item.namaSiklus,
      //     "jmlHariSiklus": $scope.item.jmlHariSiklus,
      //     "deskripsi": $scope.item.deskripsi
      //   }
      //
      //   $scope.daftarSiklus.add(tempSiklus);
      // }
    }
  ]);
});

//===============================================================Remove DataSource=========================================//

/*ModelItem.get("perencanaanDanPemasaran/Master").then(function(data) {
$scope.item = data;
//$scope.dataVOloaded = true;
}, function errorCallBack(err) {});*/

/*			$scope.removeSiklus = function(e) {
// body...
e.preventDefault();
var grid = this;
var row = $(e.currentTarget).closest("tr");
$scope.tempSiklus== $scope.SourceDataStandar
.filter(function(el){
return el.no !== grid._data[0].no;
});
grid.removeRow(row);
$scope.SumData();
}*/


/*		    function removeSiklus(e) {
e.preventDefault();
var grid = this;
var row = $(e.currentTarget).closest("tr");
$scope.tempSiklus== $scope.SourceDataStandar
.filter(function(el){
return el.no !== grid._data[0].no;
});
grid.removeRow(row);
$scope.SumData();
};*/
