define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('StandarPorsiCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras',
		function($rootScope,$scope, ModelItem, ManageSarpras, FindSarpras) {
			ModelItem.get("Laundry/MasterJenisLinen").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.item = {};
              
			FindSarpras.getMasterJenisLinen("jenis-linen/find-all-jenis-linen/").then(function(dat){
				$scope.sourceDampakResiko = dat.data.data;
			});
			
			$scope.daftarBahanLinen = new kendo.data.DataSource({
				data: []
			});

			$scope.columnDampakResiko = [{
				"field": "no",
				"title": "Menu"
			
			}, {
				"field": "code",
				"title": "Lauk Hewani"
		
			
			}, {
				"field": "DampakResiko", 
				"title": "Standar Porsi"
				
			}, {
				"field": "keterangan", 
				"title": "Keterangan"	
			
			}];
		$scope.no=1;	
	
	$scope.addDataBahanLinen = function() {

				var tempDataBahanLinen = {
					"no": $scope.no++,
					"code": $scope.item.jenisMakanan.name,
					"DampakResiko" : $scope.item.standarPorsi+" "+$scope.item.satuan.name,
					"keterangan" : $scope.item.keterangan
					
				
				}

				$scope.daftarBahanLinen.add(tempDataBahanLinen);
				$scope.item.jenisMakanan.name="",
				$scope.item.standarPorsi="",
				$scope.item.satuan.name="",
			    $scope.item.keterangan=""
			}
			
			$scope.sourceGenerik = [{
					"id": 1,
					"kode": "1",
					"name": "Rolade daging"
				},
				{
					"id": 2,
					"kode": "2",
					"name": "Semur"
				}

			];
			
			
			$scope.laukHewani = [{
					"id": 1,
					"kode": "1",
					"name": "Daging giling"
				},
				{
					"id": 2,
					"kode": "2",
					"name": "Telur Ayam"
				}

			];
			
			$scope.standarPorsi = [{
					"id": 1,
					"kode": "1",
					"name": "gram"
				},
				{
					"id": 2,
					"kode": "2",
					"name": "kg"
				}

			];
			
			
			
					
					
					
					
			
			
			
			
			
			
		
	

		}
	]);
});