define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('InformasiPemesananDanPenerimaanBarangCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem){
			$scope.title = "";
			$scope.dataVOloaded = true;
// $scope.tabTitle = "Sudah Diterima";
			$scope.statusDiterima = false;
			$scope.item = {};
			$scope.now = new Date();
			$scope.cekStatus = function(id){
				if(!id){
					$scope.statusDiterima = false;
				}
				else{
					$scope.statusDiterima = true;
				}
			}
					$scope.columnDiterima = [
						{
							"field": "noPesan",
							"title": "No Pesan"
						},
						{
							"field": "pengirim",
							"title": "Pengirim"
						},
						{
							"field": "noKirim",
							"title": "No Kirim"
						},
						{
							"field": "noKonfirmasi",
							"title": "No Konfirmasi"
						},
						{
							"field": "ruangan",
							"title": "Ruangan Pemesan"
						}
					];
					$scope.columnDikirim = [
						{
							"field": "noPesan",
							"title": "No Pesan"
						},
						{
							"field": "tujuan",
							"title": "Tujuan"
						},
						{
							"field": "noKirim",
							"title": "No Kirim"
						},
						{
							"field": "noKonfirmasi",
							"title": "No Konfirmasi"
						},
						{
							"field": "ruangan",
							"title": "Ruangan Pemesan"
						}
					];

			$scope.sourceDiterima = [
				{
					"noPesan": "1234",
					"pengirim": "Rony",
					"noKirim": "2345",
					"noKonfirmasi": "3456",
					"ruangan": "Annex Lt2"
				},
				{
					"noPesan": "4567",
					"pengirim": "Baka",
					"noKirim": "5678",
					"noKonfirmasi": "7890",
					"ruangan": "Gudang"
				}
			];

			$scope.statusBarang = [
				{
					"id": 0,
					"name": "Belum Dikirim"
				},
				{
					"id": 1,
					"name": "Sudah Diterima"
				}
			]
	}])
})