define(['initialize'], function (initialize) {
  'use strict'
  initialize.controller('DashboardKetersediaanRuangRapatCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'ManageIT', 'DateHelper', '$state', '$location', 'socket', '$window', '$mdDialog',
    function ($rootScope, $scope, ModelItem, IPSRSService, ManageIT, DateHelper, $state, $location, socket, $window, $mdDialog) {
      $scope.isEmpty = false

      $scope.now = new Date()
      $scope.item = {}
      $scope.item.tanggal = $scope.now
      $scope.dataRuanganRapat = [
        {
          namaRuangan: 'Ruangan Auditorium',
          ketersediaanRuangan: [
            {
              unit: 'Laundry',
              waktu: '09.30 s/d 10.30',
              status: 'Dipakai'
            },
            {
              unit: 'K3KL',
              waktu: '10.30 s/d 11.30',
              status: 'Order'
            },
            {
              unit: 'SDM',
              waktu: '13.30 s/d 16.00',
              status: 'Order'
            }
          ]
        },
        {
          namaRuangan: 'Ruangan Rapat 1',
          ketersediaanRuangan: [
            {
              unit: 'CSSD',
              waktu: '09.30 s/d 10.30',
              status: 'Dipakai'
            },
            {
              unit: 'Tata Rekening',
              waktu: '10.30 s/d 11.30',
              status: 'Order'
            }
          ]
        },
        {
          namaRuangan: 'Ruangan Rapat 2',
          ketersediaanRuangan: [
            {
              unit: 'Unit Logistik',
              waktu: '09.30 s/d 10.30',
              status: 'Dipakai'
            }
          ]
        }
      ]
	  $scope.findData = function () {
		var awal = DateHelper.getPeriodeFormatted($scope.item.tanggal)
		ManageIT.getItem('daftar-order-pemakaian-ruang-rapat/get-pemakaian-ruang-rapat?dateNow=' + awal).then(function (res) {
			$scope.dataRuangan = res.data.data
			$scope.dataRuangan.forEach(element => {
			  element.ketersediaanRuangan.forEach(el => {
				var dateAwal = new Date(el.mulaiRapat),
				  dateAkhir = new Date(el.selesaiRapat),
				  jamAwal = dateAwal.getHours() + ':' + dateAwal.getMinutes(),
				  jamAkhir = dateAkhir.getHours() + ':' + dateAkhir.getMinutes()
				el.selesaiRapat = jamAwal + ' s/d ' + jamAkhir
			  })
			})
		  })
	  }
      var onInit = function () {
        // var awal = DateHelper.getPeriodeFormatted($scope.item.tanggal)
        // ManageIT.getItem('daftar-order-pemakaian-ruang-rapat/get-pemakaian-ruang-rapat?dateNow=' + awal).then(function (res) {
        //   $scope.dataRuangan = res.data.data
        //   $scope.dataRuangan.forEach(element => {
        //     element.ketersediaanRuangan.forEach(el => {
        //       var dateAwal = new Date(el.mulaiRapat),
        //         dateAkhir = new Date(el.selesaiRapat),
        //         jamAwal = dateAwal.getHours() + ':' + dateAwal.getMinutes(),
        //         jamAkhir = dateAkhir.getHours() + ':' + dateAkhir.getMinutes()
        //       el.selesaiRapat = jamAwal + ' s/d ' + jamAkhir
        //     })
        //   })
		// })
		$scope.findData();
      }
      onInit()
    }])
})
