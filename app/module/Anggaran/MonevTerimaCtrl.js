define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MonevTerimaCtrl', ['$q', '$rootScope', '$scope','FindPasien','DateHelper','ManagePasien','ModelItem','$http',
		function($q, $rootScope, $scope,findPasien,dateHelper,ManagePasien,ModelItem,$http) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item={};
			$scope.item.tglAwal = new Date();
			$scope.item.tglAkhir = new Date();
			$scope.dataSelected = {};

			$scope.dataListTahun=new kendo.data.DataSource({
				data:[{"FieldTahun":"2015"},{"FieldTahun":"2016"},{"FieldTahun":"2017"},{"FieldTahun":"2018"},{"FieldTahun":"2019"},
				{"FieldTahun":"2020"},{"FieldTahun":"2021"},{"FieldTahun":"2022"},{"FieldTahun":"2023"},{"FieldTahun":"2024"},
				{"FieldTahun":"2025"},{"FieldTahun":"2026"},{"FieldTahun":"2027"},{"FieldTahun":"2028"},{"FieldTahun":"2029"},{"FieldTahun":"2030"}]
			});


// findPasien.getDataTRPNBP($scope.item.tglAwal,$scope.item.tglAkhir).then(function(data){
// 	$http.get('module/Anggaran/dummy_json/monevTerima.json').success(function(data) {
// 		debugger;
// 		$scope.dataGrid=data.result;
// 			for (var i = 0; i < $scope.dataGrid.length; i++) {
// 				$scope.dataGrid[i].totalRealisasi =$scope.dataGrid[i].harga * $scope.dataGrid[i].volumeRealisasi;
// 			}
// 	/*for (var i = 0; i < $scope.dataPenyusunanTRPNBP.length; i++) {
// 		$scope.item.prosentase = $scope.dataPenyusunanTRPNBP[i].prosentase
// 	}*/
	
// });


	$scope.Cari=function(){
		// findPasien.getDataTRPNBP(tglAwal1,tglAkhir1).then(function(data){
			$http.get('module/Anggaran/dummy_json/monevTerima.json').success(function(data) {
			// debugger;
			$scope.dataGrid=data.result;
			for (var i = 0; i < $scope.dataGrid.length; i++) {
				$scope.dataGrid[i].totalRealisasi =$scope.dataGrid[i].harga * $scope.dataGrid[i].volumeRealisasi;
			}
		});
		}


		$scope.columnGrid = [
		{
			"field": "kdProduk",
			"title": "Kode Produk"
		},
		{
			"field": "namaProduk",
			"title": "Nama Produk"
		},
		{
			"field": "volumeTarget",
			"title": "Volume Target"
		},
		{
			"field": "harga",
			"title": "Harga",
			"template": "<span class='style-right'>{{formatRupiah('#: harga #', 'Rp.')}}</span>"
		},

		{
			"field": "totalTarget",
			"title": "Total Target",
			"template": "<span class='style-right'>{{formatRupiah('#: totalTarget #', 'Rp.')}}</span>"
		},
		{
			"field": "volumeRealisasi",
			"title": "Volume Realisasi"
		},
		{
			"field": "totalRealisasi",
			"title": "Total Realisasi",
			"template": "<span class='style-right'>{{formatRupiah('#: totalRealisasi #', 'Rp.')}}</span>"
		}
		];

		$scope.columnGrid2 = [
		{
			"field": "kdProduk",
			"title": "Kode Produk"
		},
		{
			"field": "namaProduk",
			"title": "Nama Produk"
		},
		{
			"field": "volumeTarget",
			"title": "Volume Target"
		},
		{
			"field": "harga",
			"title": "Harga",
			"template": "<span class='style-right'>{{formatRupiah('#: harga #', 'Rp.')}}</span>"
		},

		{
			"field": "totalTarget",
			"title": "Total Target",
			"template": "<span class='style-right'>{{formatRupiah('#: totalTarget #', 'Rp.')}}</span>"
		},
		{
			"field": "volumeRealisasi",
			"title": "Volume Realisasi"
		},
		{
			"field": "totalRealisasi",
			"title": "Total Realisasi",
			"template": "<span class='style-right'>{{formatRupiah('#: totalRealisasi #', 'Rp.')}}</span>"
		}
		];

		$scope.formatRupiah = function(value, currency) {
			return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		};

		$scope.dataDetilKegiatan = new kendo.data.DataSource({
				data: [],
				editable: true
			});

		$scope.pushDataKegiatan = function(dataDetilKegiatan){
				//var id = $scope.dataGrid2.length + 1;
				debugger;
				// var newData = {
				// 	//"no": id,
				// 	"kdProduk": dataDetilKegiatan.kdProduk,
				// 	"namaProduk": dataDetilKegiatan.namaProduk,
				// 	"volumeTarget": dataDetilKegiatan.volumeTarget,
				// 	"harga": dataDetilKegiatan.harga,
				// 	"totalTarget": dataDetilKegiatan.totalTarget,
				// 	"volumeRealisasi": dataDetilKegiatan.volumeRealisasi,
				// 	"totalRealisasi": dataDetilKegiatan.totalRealisasi
				// };

				$scope.dataGrid2.add(dataDetilKegiatan);
				
			};
		$scope.dataGrid2 = new kendo.data.DataSource({
				data: [],
				editable: true
			});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}       
]);
});

// }
// }
// ]);
// });