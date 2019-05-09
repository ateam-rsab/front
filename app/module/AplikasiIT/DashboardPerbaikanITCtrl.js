define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('DashboardPerbaikanITCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state', 'ManageIT', '$mdDialog', 'IPSRSService',
    function($rootScope, $scope, ModelItem, DateHelper, $state, ManageIT, $mdDialog, IPSRSService) {
      $scope.now = new Date();
      $scope.dataVOloaded = true;
      $scope.item = {};
      $scope.item.awal = $scope.now;
      $scope.item.akhir = $scope.now;
      $scope.listRuangan = ModelItem.kendoHttpSource('service/list-generic/?view=Ruangan&select=namaRuangan,id', true);
      $scope.listAlat = ModelItem.kendoHttpSource('service/list-generic/?view=Produk&select=namaProduk,id', true);

      $scope.refresh = function() {
        $scope.item.awal = $scope.now;
        $scope.item.akhir = $scope.now;
        $scope.init();
      }

      $scope.init = function() {
        debugger
        var number = 1;
        var awal = DateHelper.getTanggalFormattedNew($scope.item.awal);
        var akhir = DateHelper.getTanggalFormattedNew($scope.item.akhir);

        // IPSRSService.getItem("it-perbaikan/get-all-permintaan-perbaikan?startDate="+awal+"&endDate="+akhir, true).then(function(dat) {
          ManageIT.getItem("it-perbaikan/get-all-permintaan-perbaikan?ruanganId=&noAset=&produkId=&dateStart="+awal+"&dateEnd="+akhir).then(function(dat) {
          debugger
          $scope.datagrid = dat.data.data.listPermintaanPerbaikan;
          for (var i = 0; i < $scope.datagrid.length; i++) {
            $scope.datagrid[i].nomor = number++;

            var tglPesan = new moment($scope.datagrid[i].tglPesan).format('YYYY-MM-DD');
            $scope.datagrid[i].tglPesan = tglPesan;

            var noSeri = $scope.item.noSeri;
            if (noSeri == "" || noSeri == undefined || noSeri == null) {
              $scope.datagrid[i].noSeri = "-";
            } else {
              return $scope.dataSource = $scope.datagrid;
            }

            // Hardcode ============================================================================
            var mulai = $scope.item.tanggal;
            if (mulai == "" || mulai == undefined || mulai == null) {
              $scope.datagrid[i].mulai = "15-05-2018";
            } else {
              return $scope.dataSource = $scope.datagrid;
            }

            var selesai = $scope.item.tanggal;
            if (selesai == "" || selesai == undefined || selesai == null) {
              $scope.datagrid[i].selesai = "20-05-2018";
            } else {
              return $scope.dataSource = $scope.datagrid;
            }

            var lapor = $scope.item.waktu;
            if (lapor == "" || lapor == undefined || lapor == null) {
              $scope.datagrid[i].lapor = "00:00";
            } else {
              return $scope.dataSource = $scope.datagrid;
            }

            var respon = $scope.item.waktu;
            if (respon == "" || respon == undefined || respon == null) {
              $scope.datagrid[i].respon = "01:00";
            } else {
              return $scope.dataSource = $scope.datagrid;
            }

            var tiba = $scope.item.waktu;
            if (tiba == "" || tiba == undefined || tiba == null) {
              $scope.datagrid[i].tiba = "03:00";
            } else {
              return $scope.dataSource = $scope.datagrid;
            }

            var noVerifikasi = $scope.item.noVerifikasi;
            if (noVerifikasi == "" || noVerifikasi == undefined || noVerifikasi == null) {
              $scope.datagrid[i].noVerifikasi = "Serah Terima Beres";
            } else {
              return $scope.dataSource = $scope.datagrid;
            }
            // ============================================================================================

            // var onDataBound = function () {
            //   $('td').each(function () {
            //     if ($(this).text() == 'Belum di Kerjakan') {$(this).addClass('yellow')}
            //     if ($(this).text() == 'Sudah di Kerjakan') {$(this).addClass('green')}
            //     if ($(this).text() == 'Pending') {$(this).addClass('red')}
            //     // for status response
            //     if ($(this).text() == 'Belum di Respon') {$(this).addClass('yellow')}
            //     if ($(this).text() == 'Respon 0-15menit') {$(this).addClass('green')}
            //     if ($(this).text() == 'Respon 15-30menit') {$(this).addClass('yellow')}
            //     if ($(this).text() == 'Respon lebih dari 30menit') {$(this).addClass('red')}
            //   })
            // }

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

          }
          $scope.dataSource = new kendo.data.DataSource({
            data: $scope.datagrid,
            pageSize: 10,
            sortable: true,
            batch: true,
            autoSync: false
          });
        });
      }
      $scope.init();

      $scope.cari = function() {
        debugger
        if ($scope.item.ruangan == undefined) {
          $scope.ruangan = "";
        } else {
          $scope.ruangan = $scope.item.ruangan.id;
        }
        if ($scope.item.noAsset == undefined) {
          $scope.noAsset = "";
        } else {
          $scope.noAsset = $scope.item.noAsset;
        }
        if ($scope.item.alat == undefined) {
          $scope.produk = "";
        } else {
          $scope.produk = $scope.item.alat.id;
        }
        if ($scope.item.awal == undefined) {
          $scope.awal = "";
        } else {
          var tglAwal = new Date($scope.item.awal);
          $scope.awal = DateHelper.getTanggalFormattedNew(tglAwal);
        }
        if ($scope.item.akhir == undefined) {
          $scope.akhir = "";
        } else {
          var tglAkhir = new Date($scope.item.akhir);
          $scope.akhir = DateHelper.getTanggalFormattedNew(tglAkhir);
        }
        ManageIT.getItem("it-perbaikan/get-all-permintaan-perbaikan?ruanganId="+$scope.ruangan+"&noAset="+$scope.noAsset+"&produkId="+$scope.produk+"&dateStart="+$scope.awal+"&dateEnd="+$scope.akhir).then(function(dat) {
        // IPSRSService.getItem("it-perbaikan/get-all-permintaan-perbaikan?startDate=" + awal + "&endDate=" + akhir, true).then(function(dat) {
          debugger
          $scope.datagrid = dat.data.data.listPermintaanPerbaikan;
          $scope.nomor = 1;
          // $scope.masterData.forEach(function(data) {
          //   var date1 = new Date(data.tglPesan);
          //   var date2 = new Date(data.tanggalRespon);
          //   var date3 = new Date(data.tanggalMulai);
          //   var date4 = new Date(data.tanggalLapor);
          //   var date5 = new Date(data.tanggalSelesai);
          //   data.mulai = DateHelper.getTanggalFormatted(date3);
          //   if (data.tanggalSelesai == null) {
          //     data.selesai = "-";
          //   } else {
          //     data.selesai = DateHelper.getTanggalFormatted(date5);
          //   }
          //   if (data.noVerifikasi == null) {
          //     data.noVerifikasi = "Belum Diverifikasi";
          //   }
          //
          //   data.lapor = DateHelper.getDateTimeFormatted(date4);
          //   data.respon = DateHelper.getDateTimeFormatted(date2);
          //   data.tiba = DateHelper.getDateTimeFormatted(date1);
          //   data.no = $scope.nomor++
          // })
          $scope.dataSource = new kendo.data.DataSource({
            pageSize: 10,
            data: $scope.masterData
          });
        });
      };

      var onDataBound = function() {
        $('td').each(function() {
          if ($(this).text() == "Pending") { $(this).addClass('red') } 
          else if ($(this).text() == "Pemeliharaan Sudah Dikerjakan") { $(this).addClass('green') }
          else if ($(this).text() == "Belum Ada Yang Dikerjakan") { $(this).addClass('yellow') }
        });
      };

      $scope.mainGridOptions = {
        pageable: true,
        dataBound: onDataBound,
        toolbar:['excel','pdf'],
        // data: $scope.tempData,
        filterable: {
          extra: false,
          operators: {
            string: {
              startsWith: "Pencarian"
            }
          }
        }
      }

      $scope.columnDashboard = [
        {field: "nomor", title: "<h3 align=center>No<h3>",width: "40px", filterable: false},
        {field: "namaRuangan", title: "<h3 align=center>Ruangan<h3>", width: "200px", filterable: false},
        {field: "noOrder", title: "<h3 align=center>No Order<h3>", width: "100px", filterable: false},
        {field: "noSeri", title: "<h3 align=center>No Seri<h3>", width: "100px", filterable: false},
        {field: "namaProduk", title: "<h3 align=center>Nama Alat<h3>", width: "200px", filterable: false},
        {field: "pelapor", title: "<h3 align=center>Pelapor<h3>", width: "200px", filterable: false},
        {field: "keluhan", title: "<h3 align=center>Proses Pelaksanaan<h3>", width: "200px", filterable: false},
        {field: "tanggal", title: "<h3 align=center>Tanggal<h3>", headerAttributes: {style: "text-align : center"},
          columns: [{field: "mulai", title: "<h3 align=center>Mulai<h3>", width: 100, filterable: false},
          {field: "selesai", title: "<h3 align=center>Selesai<h3>", width: 100, filterable: false}], width: "300px"
        },
        {field: "waktu", title: "<h3 align=center>Waktu<h3>", headerAttributes: {style: "text-align : center"},
          columns: [{field: "lapor", title: "<h3 align=center>Lapor<h3>", width: 100, filterable: false},
          {field: "respon", title: "<h3 align=center>Respon<h3>", width: 100, filterable: false},
          {field: "tiba", title: "<h3 align=center>Tiba<h3>", width: 100, filterable: false}], width: "360px", filterable: false
        },
        {field: "noVerifikasi", title: "<h3 align=center>Serah Terima Setelah Selesai Pekerjaan<h3>", width: "200px", filterable: false},
        {field: "statusPengerjaan", title: "<h3 align=center>Finalisasi Hasil Pekerjaan<h3>", width: "100px", filterable: false}
      ];

      $scope.click = function(current) {
          $scope.current = current;
          $scope.strukOrderId = current.noRec;
          $scope.noRegistrasiAset = current.noRecRegistrasiAset;
      };

      $scope.tutup = function() {
        $state.go("home");
      }

      $scope.detail = function() {
          if ($scope.strukOrderId == undefined) {
            window.messageContainer.error('Silahkan pilih data')
          } else {
            $state.go('DetailDashboardPerbaikanIT', {
              strukOrderId: $scope.strukOrderId,
              noRegistrasiAset: $scope.noRegistrasiAset
            })
          }
      }

    }
  ]);
});
