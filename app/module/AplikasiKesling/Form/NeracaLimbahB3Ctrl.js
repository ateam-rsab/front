define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('NeracaLimbahB3Ctrl', ['$rootScope', '$scope', 'ModelItem','DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {		
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.dataJenisAwalLimbah = new kendo.data.DataSource({
				data: [
				{ 
					"jenisAwalLimbah":"Limbah Medis Cair",
					"jumlah" : "2"
				}
				]
			});

			$scope.columndataJenisAwalLimbah= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "jenisAwalLimbah",
				"title": "<h3 align=center>Jenis Awal Limbah</h3>",
				"width": "200px"
			}, {
				"field": "jumlah",
				"title": "<h3 align=center>Jumlah (Kg)</h3>",
				"width": "100px"
		    }];

		    $scope.dataPerlakuanLimbah = new kendo.data.DataSource({
				data: [
				{ 
					"perlakuan":"Disimpan",
					"jumlah" : "",
					"jenisLimbahyangDikelola":""
				},
				{ 
					"perlakuan":"Dimanfaatkan",
					"jumlah" : "",
					"jenisLimbahyangDikelola":""
				},
				{ 
					"perlakuan":"Diolah",
					"jumlah" : "",
					"jenisLimbahyangDikelola":""
				},
				{ 
					"perlakuan":"Ditimbun",
					"jumlah" : "",
					"jenisLimbahyangDikelola":""
				},
				{ 
					"perlakuan":"Diserahkan ke Pihak ke 3",
					"jumlah" : "",
					"jenisLimbahyangDikelola":""
				},
				{ 
					"perlakuan":"Ekspor",
					"jumlah" : "",
					"jenisLimbahyangDikelola":""
				},
				{ 
					"perlakuan":"Perlakuan Lainnya",
					"jumlah" : "",
					"jenisLimbahyangDikelola":""
				}
				]
			});

			$scope.columndataPerlakuanLimbah= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "perlakuan",
				"title": "<h3 align=center>Perlakuan (Master)</h3>",
				"width": "200px"
			}, {
				"field": "jumlah",
				"title": "<h3 align=center>Jumlah (Kg)</h3>",
				"width": "100px"
			}, {
				"field": "jenisLimbahyangDikelola",
				"title": "<h3 align=center>Jenis Limbah yang Dikelola</h3>",
				"width": "200px"
			},{
				"field": "perizinanLimbah",
				"title": "<h3 align=center>Perizinan Limbah B3 dari KLH</h3>",
				"width": "100px",
				columns: [
				{
					"title": "<h3 align=center>ADA</h3>",
					"template": "<h3 align=center><input type=\"checkbox\" ng-click=\"klik()\"></h3>",
					width:"50px"
				},{
					"title": "<h3 align=center>TIDAK ADA</h3>",
					"template": "<h3 align=center><input type=\"checkbox\" ng-click=\"klik()\"></h3>",
					width:"100px"
				},{
					"title": "<h3 align=center>KADALUARSA</h3>",
					"template": "<h3 align=center><input type=\"checkbox\" ng-click=\"klik()\"></h3>",
					width:"100px"
				}
				]
		    }];

			$scope.now = new Date();
			ModelItem.get("Kesling/LimbahB3Keluar").then(function(data) {
				$scope.item = data;
				scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Kesling/MasterParameter/checkboxDataAktif", false).then(function(data) {
			$scope.ListDataAktif = data;
			})

			$scope.enableKodeParameter=true;
			
		}
	]);
});