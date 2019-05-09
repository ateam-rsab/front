define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('SystemAdminProdukCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'SysAdminProdukService',
		function ($rootScope, $scope, ModelItem, DateHelper, $document, r, $state, SysAdminProdukService) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.item.detailJenisPeriksa = {};
			$scope.item.detailJenisPeriksa.id = 0;

			$scope.disableDetailJenisPeriksa = true;
			$scope.disableSatuanStandar = true;
			$scope.disableKode = true;
			$scope.disableNama = true;
			$scope.disableUmurMin = true;
			$scope.disableUmurMax = true;
			$scope.disableSatuanUmur = true;
			$scope.disableNilaiMin = true;
			$scope.disableNilaiMax = true;
			$scope.disableNilaiReferensi = true;


			$scope.showDetailPemeriksaan = true;
			
			$scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
			// $scope.namaProdukOptions = {
			// 	dataTextField: "namaProduk",
            //     dataValueField: "detailJenisProdukId",
			// }

			$scope.dataProduk = new kendo.data.DataSource({
				data: [
					// {
					// 	"kodeProduk": "10101010",
					// 	"namaProduk": "Poliklinik Anak"						
					// },
					// {

					// 	"kodeProduk": "10101010",
					// 	"namaProduk": "Poliklinik Anak"	
					// },
					// {

					// 	"kodeProduk": "10101010",
					// 	"namaProduk": "Poliklinik Anak"	
					// }
				]
			});
			$scope.columnProduk = [
				{
					"field": "kdProduk",
					"title": "Kode Produk",
					"width": "150px"
				}, {
					"field": "namaProduk",
					"title": "Nama Produk",
					"width": "300px"
				}];

			SysAdminProdukService. getDataProduk("Produk&select=id,namaProduk,kdProduk").then(function success(dat) {
				$scope.dataProduk = dat.data;
				console.log(JSON.stringify($scope.dataProduk));
			}, function error(error) {
                console.log(error);
            });

			// SysAdminProdukService.getListDetailJenis("DetailJenisProduk&select=id,detailJenisProduk").then(function success(dat) {
			// 	$scope.listDetailJenisPeriksa = dat;
			// }, function error(error) {
            //     console.log(error);
            // });

			// $scope.$watch("item.detailJenisPeriksa", function () {
			// 	$scope.item.namaProduk = "";
			// 	$scope.dataNamaProduk = {};
			// 	SysAdminProdukService.getListNamaProduk("product/find-detail-produk?idJenisProduk=", $scope.item.detailJenisPeriksa.id).then(function success(dat) {
			// 		$scope.dataNamaProduk = dat.data;
			// 	}, function error(error) {
			// 		console.log(error);
			// 	});
			// });

			// $scope.$watch("item.namaProduk", function () {
			// 	$scope.item.namaDetailPemeriksaan = "";
			// 	SysAdminProdukService.getListNamaDetailPemeriksaan("product/get-produk-hasil-by-id/?id=", $scope.item.namaProduk.id).then(function success(dat) {
			// 		$scope.dataNamaDetailPemeriksaan = dat.data.data;
			// 		console.log($scope.dataNamaDetailPemeriksaan);

			// 	}, function error(error) {
			// 		console.log(error);
			// 	});
			// });




			ModelItem.get("Produk/SystemAdminProduk").then(function (data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });

		}
	]);
});