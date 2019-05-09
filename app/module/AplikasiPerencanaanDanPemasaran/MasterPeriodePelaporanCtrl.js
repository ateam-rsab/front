define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MasterPeriodePelaporanCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Master Periode Pelaporan";
			ModelItem.get("PerencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindSarpras.getSarpras("periode-pelaporan/find-all/").then(function(dat){
				var data = []
				 var i = 1
				 dat.data.data.forEach(function(e){
				 	var periodePelaporan = {
				 		"periodePelaporan": e.periodePelaporan,
				 		"no":i
				 	}
			 	data[i-1]=periodePelaporan
			 	i++;
				});
				$scope.source= data;
				// debugger;
				$scope.sourceMasterPeriodePelaporan = new kendo.data.DataSource({
    				pageSize: 10,
    				data:$scope.source
				});
				// debugger;
			})
			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
                    "field": "no",
					"title": "<h3 align=center>No</h3>",
					"width": "30px",
					"attributes": {align: "center"}
				}, {
					"field": "periodePelaporan",
					"title": "<h3 align=center>Periode Pelaporan</h3>",
					"width": "300px"
                }
                ]
            };
			
			$scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.periodePelaporan=data.periodePelaporan
			};
			$scope.Batal=function(){
				$scope.item.periodePelaporan="";
			}
			$scope.Save = function(){
            	var data = {
            		"periodePelaporan": $scope.item.periodePelaporan
            	};
            	console.log(JSON.stringify(data)); 
				ManageSarpras.saveSarpras(data,"periode-pelaporan/save/").then(function(e) {
            		FindSarpras.getSarpras("periode-pelaporan/find-all/").then(function(dat){
						var data = []
						var i = 1
						dat.data.data.forEach(function(e){
						 	var periodePelaporan = {
						 		"periodePelaporan": e.periodePelaporan,
						 		"no":i
						 	}
					 	data[i-1]=periodePelaporan
					 	i++;
						});
						$scope.sourceMasterPeriodePelaporan= data;
						// debugger;
					});
					$scope.item.periodePelaporan="";
				});
			};
	}])
})