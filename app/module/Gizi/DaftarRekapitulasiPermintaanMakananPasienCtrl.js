define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarRekapitulasiPermintaanMakananPasienCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
		function($rootScope, $scope, ModelItem, DateHelper, $document, r) {
			$scope.title = "Resep elektronik";			

			$scope.dataVOloaded = true;
			$scope.item = {};


			//define column untuk grid
			var arrColumnGridResepElektronik = [{
				"field": "nama",
				"title": "Nama Pasien",
				"width": "300px"
			}, {
				"field": "noCM",
				"title": "No.CM",
				"width": "100px"
			}, {
				"field": "jk",
				"title": "JK",
				"width": "100px"
			}, {
				"field": "kelas",
				"title": "Kelas",
				"width": "100px"
			}, {
				"field": "tipePembayaran",
				"title": "Tipe Pembayaran",
				"width": "200px"
			}, {
				"field": "tglPendaftaran",
				"title": "Tgl Pendaftaran",
				"width": "200px"
			}, {
				"field": "alergi",
				"title": "Alergi",
				"width": "100px"
			}, {
				"field": "diagnosis",
				"title": "Diagnosis",
				"width": "100px"
			}, {
				"field": "namaPemesan",
				"title": "Nama Pemesan",
				"width": "150px"
			}, {
				"field": "tglPesan",
				"title": "Tgl Pesan",
				"width": "100px"
			}, {
				"field": "jenisWaktu",
				"title": "Jenis Waktu",
				"width": "100px"
			}, {
				"field": "minum",
				"title": "Minum",
				"width": "100px"
			}, {
				"field": "frekuensi",
				"title": "Frekuensi",
				"width": "100px"
			}, {
				"field": "volume",
				"title": "Volume",
				"width": "100px"
			}, {
				"field": "jenisDiet",
				"title": "Jenis Diet",
				"width": "100px"
			}, {
				"field": "namaMenu",
				"title": "Nama Menu",
				"width": "100px"
			}, {
				"field": "tipeMakanan",
				"title": "Tipe Makanan",
				"width": "100px"
		    }];
		ModelItem.getGridOption("Gizi/DaftarRekapitulasiPermintaanMakananPasien/DaftarRekapitulasiPermintaanMakananPasien", arrColumnGridResepElektronik).then(function(data) {
				$scope.mainGridOptions = data;
			})

			$scope.cari = function()
			{
				var filterArr = new Array();
				var isFilter = false;
				var grid = $('div[kendo-grid]').data('kendoGrid');
		        
		        if($scope.item.noPerencanaan != "")
		        {
		        	filterArr.push({ field: "noPerencanaan", operator: "contains", value: $scope.item.noPerencanaan });
		        	isFilter = true;
		        }

		        if($scope.item.ruangan != "")
		        {
		        	filterArr.push({ field: "unitLayanan", operator: "contains", value: $scope.item.ruangan.name });
		        	isFilter = true;
		        }
		        
		        if(isFilter)
		        {
		        	grid.dataSource.filter(filterArr);
			        grid.dataSource.read();
			        grid.refresh();
		        }
		        else
		        {
		        	grid.dataSource.read();
			        grid.refresh();
		        }
			}

			$scope.now = new Date();
			ModelItem.get("Gizi/DaftarRekapitulasiPermintaanMakananPasien").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});
		}
			
	]);
});
