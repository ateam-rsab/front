define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('JenisRisikoBerdasarkanSasaranStrategisCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			ModelItem.get("PerencanaanDanPemasaran/analisaSwot").then(function(data) {
				$scope.item = data;
				$scope.no = 1;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.dataJenisResiko = new kendo.data.DataSource({
				data: []
			});	
			$scope.columnJenisResiko = [
				{
					"field": "no",
					"title": "<h3 align=center>No</h3>",
					"width": "30px",
					"attributes": {align:"center"}
				},
				{
					"field": "sasaranStrategis.sasaranStrategis",
					"title": "<h3 align=center>Sasaran Strategis</h3>",
					"width": "300px"
				},
				{
					"field": "risiko.risiko",
					"title": "<h3 align=center>Resiko</h3>",
					"width": "300px"
				}
			];


			$scope.addJenisResiko = function() {

				var tempData = {
					"no": $scope.no++,
					"sasaranStrategis" : $scope.item.sasaranStrategis,
					"risiko" : $scope.item.risiko
				}

				$scope.dataJenisResiko.add(tempData);

				$scope.item.sasaranStrategis = "";
				$scope.item.risiko = "";	
			}
			FindSarpras.getSarpras("service/list-generic/?view=SasaranStrategis&select=id,sasaranStrategis").then(function(dat){
				$scope.sourceMasterSasaranStrategis= dat;
				// debugger;
			});	
			FindSarpras.getSarpras("service/list-generic/?view=Risiko&select=id,risiko").then(function(dat){
				$scope.sourceMasterResiko= dat;
				// debugger;
			});

			$scope.Save = function(){
            	var dat = $scope.dataJenisResiko._data;
				console.log(JSON.stringify(dat));
				var i=0;
				var mappJenisResiko = [];
				dat.forEach(function(data){
					var data ={
						"sasaranStrategis": {
            				"id": data.sasaranStrategis.id
            			},
            			"risiko": {
            				"id": data.risiko.id
						}
					}
					mappJenisResiko[i] =data;
					i++;
				})
				console.log(JSON.stringify(mappJenisResiko));
				ManageSarpras.saveSarpras(mappJenisResiko,"jenis-risiko-sasaran-strategis/save/").then(function(e) {
            		$scope.item = {};
            		// $scope.item.noMesin="",
            		// $scope.item.jenisLinen="",
            		// $scope.item.kapasitas="",
            		// $scope.daftarBahanLinen._data=""
				});
			};
			$scope.DaftarJenisRisiko=function(){
				$state.go("DaftarJenisRisikoBerdasarkanSasaranStrategis")
			}
		}
	])
})