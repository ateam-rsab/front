define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KirimMenuMakananPasienCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Gizi/KirimMenuMakananPasien").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.daftarPasien = new kendo.data.DataSource({
				data: []
			});
			$scope.columnPasien = [
			{
				"field": "tglOrder",
				"title": "Tgl Order",
				"width": "15%"
			},
			{
				"field": "noOrder",
				"title": "No. Order",
				"width": "10%"
			},
			{
				"field": "namaPasien",
				"title": "Nama Pasien",
				"width": "25%"
			},
			{
				"field": "jk",
				"title": "JK",
				"width": "10%"
			},
			{
				"field": "umur",
				"title": "Umur",
				"width": "10%"
			},
			{
				"field": "jenisWaktu",
				"title": "Jenis Waktu",
				"width": "15%"
			},
			{
				"field": "kelas",
				"title": "Kelas",
				"width": "10%"
			},
			{
				"field": "jenisDiet",
				"title": "Jenis Diet",
				"width": "15%"
			}

			];
			$scope.daftarKeterangan = new kendo.data.DataSource({
				data: []
			});
			$scope.columnKeterangan = [
			{
				"field": "keterangan",
				"title": "Keterangan",
				"width": "15%"
			},
			{
				"field": "namaRuangan",
				"title": "Nama Ruangan",
				"width": "25%"
			},
			{
				"field": "noKamar",
				"title": "No. Kamar",
				"width": "10%"
			},
			{
				"field": "noBed",
				"title": "No. Bed",
				"width": "10%"
			},
			{
				"field": "Diagnosa",
				"title": "Diagnosa",
				"width": "10%"
			},
			{
				"field": "jmlPesan",
				"title": "Jml. Pesan",
				"width": "15%"
			},
			{
				"field": "kategoryDiet",
				"title": "Kategory Diet",
				"width": "15%"
			}

			];
			ModelItem.getDataDummyGeneric("MakananDiet", false).then(function(data) {
				$scope.listMakananDiet = data;
			});
			$scope.MakananDiet = [];
			$scope.cekArrMakananDiet = function(data) {

				var isExist = _.find($scope.MakananDiet, function(dataExist){ return dataExist == data; });

				if(isExist == undefined)
				{
					$scope.MakananDiet.push(data);
				}
				else
				{
					$scope.MakananDiet = _.without($scope.MakananDiet, data);
				}
			
				console.log('list MakananDiet : ' + JSON.stringify($scope.MakananDiet));
			};
		}
	]);
});