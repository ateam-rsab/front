define(['initialize'], function (initialize) {
  'use strict'
  initialize.controller('RekapLayananITCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'IPSRSService', 'DateHelper', 'ManageSarpras', 'CetakHelper',
    function ($rootScope, $scope, $state, ModelItem, IPSRSService, DateHelper, ManageSarpras, CetakHelper) {
      $scope.item = {}
      // $scope.item.tglAwal = new Date()
      // $scope.item.tglAkhir = new Date()

      var onInit = function () {
        IPSRSService.getItem('service/list-generic/?view=Ruangan&select=id,namaRuangan', true).then(function (dat) {
          $scope.listRuangan = dat
        })
        $scope.dataStatusPekerjaan = [
          {
            id: 1,
            name: 'Sudah Dikerjakan'
          },
          {
            id: 2,
            name: 'Pending'
          },
          {
            id: 3,
            name: 'Belum Dikerjakan'
          }
        ]
      }
      onInit()

      $scope.cetakLaporanPerbaikan = function () {
        let url = ''
        let baseUrlLaporan = 'reporting/daftarPermintaanPerbaikanIT'

        if ($scope.item.tglAwal == undefined && $scope.item.tglAkhir == undefined && $scope.item.statusPekerjaan == undefined && $scope.item.namaRuangan == undefined) { 
            url = baseUrlLaporan + '?'
        } else if ($scope.item.tglAwal != undefined && $scope.item.tglAkhir != undefined && $scope.item.statusPekerjaan == undefined && $scope.item.namaRuangan == undefined) {
            url = baseUrlLaporan + '?startDate=' + DateHelper.getPeriodeFormatted($scope.item.tglAwal) + '&endDate=' + DateHelper.getPeriodeFormatted($scope.item.tglAkhir);
        } else if ($scope.item.tglAwal == undefined && $scope.item.tglAkhir == undefined && $scope.item.statusPekerjaan != undefined && $scope.item.namaRuangan != undefined) {
            url = baseUrlLaporan + '?ruanganId=' + $scope.item.namaRuangan.id + '&statusPekerjaan=' + $scope.item.statusPekerjaan.id;
        } else if ($scope.item.tglAwal == undefined && $scope.item.tglAkhir == undefined && $scope.item.statusPekerjaan == undefined && $scope.item.namaRuangan != undefined) {
            url = baseUrlLaporan + '?ruanganId=' + $scope.item.namaRuangan.id;
        } else if ($scope.item.tglAwal == undefined && $scope.item.tglAkhir == undefined && $scope.item.statusPekerjaan != undefined && $scope.item.namaRuangan == undefined) {
            url = baseUrlLaporan + '?statusPekerjaan=' + $scope.item.statusPekerjaan.id;
        }
        
        var urlLaporan = CetakHelper.openURLReporting(url)
        window.open(urlLaporan, '', 'width=' + screen.availWidth + ', height=' + screen.availHeight)
      }
    }
  ])
})
