define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RekapPenjualanCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			$scope.title = "Rekap Penjualan";

			$scope.dataVOloaded = true;
			$scope.item = {};
			
			$scope.columnResep = [{
				"field": "noReg",
				"title": "No Reg"
			}, {
				"field": "rs",
				"title": "RS"
			}, {
				"field": "inap",
				"title": "inap"
			}, {
				"field": "noResep",
				"title": "No Resep"
			}, {
				"field": "waktuLayanan",
				"title": "Waktu Layanan"
			}, {
				"field": "namaPasien",
				"title": "Nama Pasien"
			}, {
				"field": "jenisKelamin",
				"title": "L/P"
			}, {
				"field": "umur",
				"title": "Umur"
			}, {
				"field": "dokter",
				"title": "Dokter"
			}, {
				"field": "unitLayanan",
				"title": "Unit Layanan"
			}, {
				"field": "jumlahResep",
				"title": "Jumlah Resep"
			}, {
				"field": "harga",
				"title": "Harga"
			}, {
				"field": "diskon",
				"title": "Diskon"
			}, {
				"field": "jasa",
				"title": "Jasa"
			}, {
				"field": "embalace",
				"title": "Embalace"
			}, {
				"field": "ppn",
				"title": "PPN"
			}, {
				"field": "total",
				"title": "Total"
			} ];

			$scope.now = new Date();

			ModelItem.getDataDummyGeneric("Apotek/Penjualan/DataFarmasi", false).then(function(data) {
				$scope.listDataFarmasi = data;
			})

			$scope.dataRekapJualan = new kendo.data.DataSource({
				data: []
			});

			var arrColumnRekapPenjualan = [{
				"field": "noReg",
				"title": "No Reg",
                "width": 200
			}, {
				"field": "rs",
				"title": "RS",
                "width": 200
			}, {
				"field": "inap",
				"title": "inap",
                "width": 200
			}, {
				"field": "noResep",
				"title": "No Resep",
                "width": 200
			}, {
				"field": "waktuLayanan",
				"title": "Waktu Layanan",
                "width": 200
			}, {
				"field": "namaPasien",
				"title": "Nama Pasien",
                "width": 200
			}, {
				"field": "jenisKelamin",
				"title": "L/P",
                "width": 200
			}, {
				"field": "umur",
				"title": "Umur",
                "width": 200
			}, {
				"field": "dokter",
				"title": "Dokter",
                "width": 200
			}, {
				"field": "unitLayanan",
				"title": "Unit Layanan",
                "width": 200
			}, {
				"field": "jumlahResep",
				"title": "Jumlah Resep",
                "width": 200
			}, {
				"field": "harga",
				"title": "Harga",
                "width": 200
			}, {
				"field": "diskon",
				"title": "Diskon",
                "width": 200
			}, {
				"field": "jasa",
				"title": "Jasa",
                "width": 200
			}, {
				"field": "embalace",
				"title": "Embalace",
                "width": 200
			}, {
				"field": "ppn",
				"title": "PPN",
                "width": 200
			}, {
				"field": "total",
				"title": "Total",
                "width": 200
			} ];

			
			ModelItem.getGridOption("Apotek/Penjualan/DataRekapPenjualan", arrColumnRekapPenjualan).then(function(data) {
				$scope.mainGridOptions = data;
			})


		}
	]);
});