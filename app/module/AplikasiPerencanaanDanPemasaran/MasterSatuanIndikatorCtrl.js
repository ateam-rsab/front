define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MasterSatuanIndikatorCtrl', ['$rootScope', '$scope', '$state', 'ModelItem','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Master Satuan Indikator";
			ModelItem.get("PerencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindSarpras.getSarpras("satuan-indikator/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var satuanIndikator = {
				 		"satuanIndikator": e.satuanIndikator,
				 		"no":i
				 	}
			 	data[i-1]=satuanIndikator
			 	i++;
				});
				$scope.source= data;
				// debugger;
				$scope.sourceMasterSatuanIndikator = new kendo.data.DataSource({
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
					"field": "satuanIndikator",
					"title": "<h3 align=center>Satuan Indikator</h3>",
					"width": "300px"
                }
                ]
            };
			$scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.satuanIndikator=data.satuanIndikator
			};
			$scope.Batal = function(){
				$scope.item.satuanIndikator = "";
			}
			$scope.Save = function(){
            	var data = {
            		"satuanIndikator": $scope.item.satuanIndikator
            	};
            	console.log(JSON.stringify(data)); 
				ManageSarpras.saveSarpras(data,"satuan-indikator/save/").then(function(e) {
            		FindSarpras.getSarpras("satuan-indikator/find-all/").then(function(dat){
						var data = []
						var i = 1
						dat.data.data.forEach(function(e){
						 	var satuanIndikator = {
						 		"satuanIndikator": e.satuanIndikator,
						 		"no":i
						 	}
					 	data[i-1]=satuanIndikator
					 	i++;
						});
						$scope.sourceMasterSatuanIndikator= data;
						// debugger;
					});
					$scope.item.satuanIndikator="";
				});
			};
	}])
})