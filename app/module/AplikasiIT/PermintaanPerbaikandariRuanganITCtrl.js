define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('PermintaanPerbaikandariRuanganITCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', '$state', '$location', 'FindSarpras',
    function($rootScope, $scope, ModelItem, IPSRSService, $state, $location, FindSarpras) {
      $scope.item = {};
      $scope.now = new Date();
      $scope.dataVOloaded = true;
      $scope.DataShow = true;
      $scope.isShowPopUp = false;
      $scope.RubahData = false;
      $scope.tanggalPesan = new Date();

      $scope.batal = function() {
        // body...
        $scope.item.ruangan = "";
        $scope.item.noSeri = "";
        $scope.item.namaBarang = "";
        $scope.item.kodeBarang = "";
        $scope.item.merk = "";
        $scope.item.type = "";
        $scope.item.kerusakan = "";
        $scope.item.user = "";
        $scope.item.statusRespon = "";
        $scope.item.ketStatusRespon = "";
        $scope.item.statusPengerjaan = "";
      }

      $scope.listJenisPekerjaan = [{
        "id" : 1,
        "name" : "Hardware"
      },
      {
        "id":2,
        "name": "Software"
      }];

      $scope.klick = function(dataSelected) {
        if (dataSelected != undefined) {
          $scope.item.tanggalPesan = dataSelected.tglPesan
          $scope.item.ruangan = {
            id: dataSelected.kdRuangan,
            namaRuangan: dataSelected.namaRuangan
          }
          // $scope.item.noSeri = dataSelected.noSeri
          $scope.item.noSeri = {
            id: dataSelected.noSeri,
            noSeri: dataSelected.noSeri
          }
          $scope.item.namaBarang = dataSelected.namaProduk
          $scope.item.kodeBarang = dataSelected.kdProduk
          $scope.item.type = dataSelected.typeProduk
          $scope.item.merk = dataSelected.merk
          $scope.item.kerusakan = dataSelected.keluhan
          $scope.item.noOrder = dataSelected.noOrder
          $scope.noRec = dataSelected.noRec
          $scope.item.petugas = dataSelected.pelapor
          toastr.info('1 Data Edit Dipilih ');
        }
      }

      $scope.noOrderDef = function() {
        IPSRSService.getItem("it-perbaikan/get-no-order", true).then(function(dat) {
          $scope.item.noOrder = dat.data.data.noOrder;
          $scope.item.tanggalPesan = new Date();
        });
      };
      $scope.noOrderDef();

      IPSRSService.getItem("ipsrs-perbaikan/find-ruangan-asset", true).then(function(dat) {
        $scope.listRuangan = dat.data.data.ruanganAset;
      })

      $scope.barang = function() {
        IPSRSService.getItem("ipsrs-perbaikan/find-asset-by-ruangan?id=" + $scope.item.ruangan.id, true).then(function(dat) {
          $scope.listNoSeri = dat.data.data.dataAset;
        })
      }

      $scope.ubah = function() {
        $scope.item.kodeBarang = $scope.item.namaBarang.kdProduk;
        $scope.noRec = $scope.item.namaBarang.noRec;
        $scope.item.merk = $scope.item.namaBarang.merkProduk;
        $scope.item.type = $scope.item.namaBarang.typeProduk;
      }

      FindSarpras.getSarpras("user/get-user").then(function(dat) {
        $scope.petugasId = dat.data.data.pegawai.id;
        $scope.item.petugas = dat.data.data.namaUser;
      });

      $scope.mainGridOptions = {
        toolbar : ['excel','pdf'],
        pageable: true,
        pageSize: 20,
        columns: [
          { "field": "no", "title": "<h3 align=center>No.<h3>" ,"width": "15px" },
          { "field": "tglPesan", "title": "<h3 align=center>Tanggal Pesan<h3>", "width": "30px" },
          { "field": "noOrder", "title": "<h3 align=center>No Order<h3>", "width": "40px" },
          { "field": "kdProduk", "title": "<h3 align=center>Kode Produk<h3>" ,"width": "40px" },
          { "field": "namaProduk", "title": "<h3 align=center>Nama Produk<h3>", "width": "40px" },
          { "field": "typeProduk", "title": "<h3 align=center>Type Produk<h3>", "width": "40px" },
          { "field": "noSeri", "title": "<h3 align=center>No Seri<h3>", "width": "40px" },
          { "field": "keluhan", "title": "<h3 align=center>Keluhan<h3>", "width": "40px" },
          { "field": "namaRuangan", "title": "<h3 align=center>Nama Ruangan<h3>", "width": "40px" },
          { "field": "ketStatusRespon", "title": "<h3 align=center>Keterangan<h3>", "width": "40px" },
          { "field": "statusPengerjaan", "title": "<h3 align=center>Status<h3>", "width": "40px" },
          { "field": "ketkerusakan", "title": "<h3 align=center>Status<h3>", "width": "40px" },
          { "field": "statusRespon", "title": "<h3 align=center>Status Respon<h3>", "width": "40px" }
        ]
      }

      $scope.InitData = function(Pencarians) {
        var getPencarian = Pencarians;
        var number = 1;
        if ($scope.RubahData == false && getPencarian == undefined) {
          IPSRSService.getItem("it-perbaikan/get-all-permintaan-perbaikan", true).then(function(dat) {
            $scope.datagrid = dat.data.data.listPermintaanPerbaikan;
            for (var i = 0; i < $scope.datagrid.length; i++) {
              $scope.datagrid[i].no = number++;

              var tglPesan = new moment($scope.datagrid[i].tglPesan).format('YYYY-MM-DD');
              $scope.datagrid[i].tglPesan = tglPesan;

              var typeProduk = $scope.item.typeProduk;
              var noSeri = $scope.item.noSeri;
              if (typeProduk == "" || typeProduk == undefined || typeProduk == null) {
                $scope.datagrid[i].typeProduk = "-";
              }
              if (noSeri == "" || noSeri == undefined || noSeri == null) {
                $scope.datagrid[i].noSeri = "-";
              } else {
                return $scope.dataSource = $scope.datagrid;
              }

              var statusPengerjaan = $scope.datagrid[i].statusPengerjaan;
              if (statusPengerjaan == 0) {
                $scope.datagrid[i].statusPengerjaan = "Belum Ada Yang Dikerjakan";
              } else if (statusPengerjaan == 1) {
                $scope.datagrid[i].statusPengerjaan = "Pemeliharaan Sudah Dikerjakan";
              } else if (statusPengerjaan == 2) {
                $scope.datagrid[i].statusPengerjaan = "Service Sudah Dikerjakan";
              } else if (statusPengerjaan == 3) {
                $scope.datagrid[i].statusPengerjaan = "Kalibrasi Sudah Dikerjakan";
              } else {
                return $scope.dataSource = $scope.datagrid;
              }

              var statusRespon = $scope.datagrid[i].statusRespon;
              if (statusRespon == 0) {
                $scope.datagrid[i].statusRespon = "Jadwal Belum Keluar";
              } else if (statusRespon == 1) {
                $scope.datagrid[i].statusRespon = "Respon Hijau 0-15 Menit";
              } else if (statusRespon == 2) {
                $scope.datagrid[i].statusRespon = "Respon Kuning 15-30 Menit";
              } else if (statusRespon == 3) {
                $scope.datagrid[i].statusRespon = "Respon Merah >30 Menit";
              } else {
                return $scope.dataSource = $scope.datagrid;
              }

              var merkProduk = $scope.datagrid[i].merk;
              if (merkProduk == "" || merkProduk == undefined || merkProduk == null) {
                $scope.datagrid[i].merk = "-";
              } else {
                return $scope.dataSource = $scope.datagrid;
              }

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
      $scope.InitData();

      $scope.FilterdataSource = function(getPencarian) {
        if (getPencarian != undefined) {
          var q = getPencarian;
          var grid = $("#gridDataBrg").data("kendoGrid");
          grid.dataSource.query({
            page: 1,
            pageSize: 20,
            filter: {
              logic: "or",
              filters: [{
                  field: "noOrder",
                  operator: "contains",
                  value: q
                },
                {
                  field: "kdProduk",
                  operator: "contains",
                  value: q
                },
                {
                  field: "namaProduk",
                  operator: "contains",
                  value: q
                }
              ]
            }
          });
        }
      }

      $scope.ClearCari = function(Pencarians) {
        $scope.item.Pencarians = "";
        $scope.item.pencarian = "";
        var gridData = $("#gridDataBrg").data("kendoGrid");
        gridData.dataSource.filter({});
      }

      $scope.simpan = function() {
        var Tanggal = new moment($scope.item.tanggalPesan).format("YYYY-MM-DD");
        var dataTemp = {
          "registrasiAset": {
            "noRec": $scope.noRec,
            "keteranganLainnya" : $scope.item.jenisPekerjaan.name
          },
          "pelaporId": $scope.petugasId,
          "ruanganId": $scope.item.ruangan.id,
          "tglPesan": Tanggal,
          "keluhan": $scope.item.kerusakan,
          "itStatusPerbaikan": {
            "statusRespon": 0,
            "statusPengerjaan": 0,
            "ketStatusRespon": "Belum di Respon"
          }
        }

        IPSRSService.saveDataSarPras(dataTemp, "it-perbaikan/save-permintaan-perbaikan").then(function(e) {
          $scope.noOrderDef();
          $scope.InitData();
          $scope.item = {};
          $scope.noRec = undefined;
          $scope.item.tgl = new Date();
        });

      }
    }
  ]);
});

// ========================================================OLD SOURCE==========================================================================



// $scope.simpan = function() {
//   debugger
//   $scope.ketStatusRespon = $scope.item.ketStatusRespon;
//   $scope.noRec = $scope.item.noSeri.noRec;
//   // if($scope.norechead!=undefined){
//   //     var norechead = $scope.norechead
//   // }else{
//   //   var norechead = null
//   // }
//   if ($scope.noRec != undefined || $scope.noRec != "") {
//     var Tanggal = new moment($scope.item.tanggalPesan).format("YYYY-MM-DD");
//     if ($scope.ketStatusRespon == undefined || $scope.ketStatusRespon == "") {
//       var dataTemp = {
//         // "noRec": norechead,
//         "registrasiAset": {
//           "noRec": $scope.noRec
//         },
//         "pelaporId": $scope.petugasId,
//         "ruanganId": $scope.item.ruangan.id,
//         "tglPesan": Tanggal,
//         "keluhan": $scope.item.kerusakan,
//         "itStatusPerbaikan": {
//           "statusRespon": 0,
//           "statusPengerjaan": 0,
//           "ketStatusRespon": "Belum di Respon"
//         }
//
//       }
//     } else {
//       var dataTemp = {
//         "registrasiAset": {
//           "noRec": $scope.noRec
//         },
//         "pelaporId": $scope.petugasId,
//         "ruanganId": $scope.item.ruangan.id,
//         "tglPesan": Tanggal,
//         "keluhan": $scope.item.kerusakan,
//         "itStatusPerbaikan": {
//           "statusRespon": 0,
//           "statusPengerjaan": 0,
//           "ketStatusRespon": "Belum di Respon"
//
//         }
//       }
//     }
//
//     IPSRSService.saveDataSarPras(dataTemp, "it-perbaikan/save-permintaan-perbaikan").then(function(e) {
//       debugger
//       $scope.noOrderDef();
//       // init();
//       $scope.InitData();
//       $scope.DataShow = true;
//       $scope.item = {};
//       $scope.noRec = undefined;
//       $scope.item.tgl = new Date();
//     });
//   } else {
//     window.messageContainer.error('Pilih Produk Terlebih dahulu !')
//   }
// };
