define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SuratKeputusanRatePajakCtrl', ['$rootScope', '$scope', 'ModelItem','$state','NamaAsuransi','ManageSdm','InformasiKomunikasi','InformasiJenisRespon',
		function($rootScope, $scope, ModelItem,$state,NamaAsuransi,ManageSdm,InformasiKomunikasi,InformasiJenisRespon) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, 


			function errorCallBack(err) {});
			$scope.no=1;
			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})


			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: [{}]
			});

		   $scope.loadGrid = function () {
				debugger;
				ManageSdm.getItem("skratepajak/get-sk-ratepajak", true).then(function(dat){
				$scope.dataMaster = dat.data.data.data;
				$scope.dataSource = new kendo.data.DataSource({
				pageSize:50,
				data : $scope.dataMaster,
				$scrollable : true
				

					});
				});
			}

				ManageSdm.getItem("skratepajak/get-sk-ratepajak", true).then(function(dat){
				$scope.dataMaster = dat.data.data.data;
				$scope.dataSource = new kendo.data.DataSource({
				pageSize:50,
				data : $scope.dataMaster,
				$scrollable : true
				

					});
				});



			$scope.columnKomunikasi = [
			
			
				

				{
					"field": "noSK",
					"title": "No SK",
					"width": "20%"
				},
				
				{
					"field": "objekPajak",
					"title": "Kode Objek Pajak",
					"width": "20%"
				},
				
				{
					"field": "namaRange",
					"title": "Range",
					"width": "20%"
				},
				{
					"field": "persenHargaSatuan",
					"title": "Persen Harga Satuan",
					"width": "20%"
				},
				{
					"field": "hargaSatuan",
					"title": "Harga Satuan",
					"width": "20%"
				},
				{
					"field": "factorRate",
					"title": "Factor Rate",
					"width": "20%"
				},
				{
					"field": "operatorFactorRate",
					"title": "Operator Factor Rate",
					"width": "20%"
				},
				{
					"field": "rumusPerhitungan",
					"title": "Rumus Perhitungan",
					"width": "20%"
				},
				{
					"field": "keteranganLainnya",
					"title": "Keterangan Lainnya",
					"width": "20%"
				}

				];

	

		     InformasiJenisRespon.getOrderList("skratepajak/get-objek-pajak", true).then(function(dat){
		     debugger;
		     $scope.ListDataobjekpajak = dat.data.data.data;
		      	
	      	});

	          InformasiJenisRespon.getOrderList("skratepajak/get-range", true).then(function(dat){
	         debugger;
	         $scope.ListDatarange = dat.data.data.data;
	          	
	      	});
			$scope.Save = function () {
			debugger;
			var data = 


			{
				"noSK" : $scope.item.nosk,
				"persenHargaSatuan" : $scope.item.persenhargasatuan,
				"hargaSatuan" : $scope.item.hargasatuan,
				"factorRate" : $scope.item.factorrate,
				"operatorFactorRate" : $scope.item.operatorfactor,
				"rumusPerhitungan" : $scope.item.RumusPerhitungan,
				"keteranganLainnya" : $scope.item.keteranganlainnya,
				"kdObjekPajak" : {"id" : $scope.item.objekpajak.idObjekPajak},
				"kdRange" : {"id" : $scope.item.range.idRange}
			}
		


			ManageSdm.saveData(data,"skratepajak/save-sk-ratepajak").then(function(e) {
			console.log(JSON.stringify(e.data));
			$scope.loadGrid();
			});

			}

			$scope.reset = function(){

	            $scope.item.nosk="";
				$scope.item.persenhargasatuan="";
			    $scope.item.hargasatuan="";
				$scope.item.factorrate="";
			    $scope.item.operatorfactor="";
				$scope.item.RumusPerhitungan="";
				$scope.item.keteranganlainnya="";
			    $scope.item.objekpajak="";
				$scope.item.range="";
				}


		
			function init(){

          
		
       		};

			}

	]);
});