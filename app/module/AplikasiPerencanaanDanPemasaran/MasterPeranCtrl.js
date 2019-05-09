define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MasterPeranCtrl', ['$rootScope', '$scope', '$state', 'ModelItem','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Master Peran";
			ModelItem.get("PerencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindSarpras.getSarpras("peran/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var peran = {
				 		"peran": e.peran,
				 		"no":i
				 	}
			 	data[i-1]=peran
			 	i++;
			});
				$scope.source= data;
				
				$scope.sourceMasterPeran = new kendo.data.DataSource({
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
					"field": "peran",
					"title": "<h3 align=center>Peran</h3>",
					"width": "300px"
                }
                ]
            };

			// FindSarpras.getSarpras("peran/find-all/").then(function(dat){
			// 	var data = []
			// 	var i = 1
			// 	dat.data.data.forEach(function(e){
			// 	 	var peran = {
			// 	 		"peran": e.peran,
			// 	 		"no":i
			// 	 	}
			//  	data[i-1]=peran
			//  	i++;
			// 	});
			// 	$scope.sourceMasterPeran= data;
			// 	// debugger;
			// });
			// $scope.columnMasterPeran = [
			// {
			// 	"field": "no",
			// 	"title": "<h3 align=center>No<h3>",
			// 	"width": "30px",
			// 	"attributes": {align: "center"}
			// }, {
			// 	"field": "peran",
			// 	"title": "<h3 align=center>Peran</h3>",
			// 	"width": "300px"
			// }];
			$scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.peran=data.peran
			};

			$scope.Batal = function () {
                // debugger;
                $scope.item.peran=""
            };

			$scope.Save = function(){
            	var data = {
            		"peran": $scope.item.peran
            	};
            	console.log(JSON.stringify(data)); 
				ManageSarpras.saveSarpras(data,"peran/save/").then(function(e) {
            		FindSarpras.getSarpras("peran/find-all/").then(function(dat){
						var data = []
						var i = 1
						dat.data.data.forEach(function(e){
						 	var peran = {
						 		"peran": e.peran,
						 		"no":i
						 	}
					 	data[i-1]=peran
					 	i++;
						});
						$scope.sourceMasterPeran= data;
						// debugger;
					});
					$scope.item.peran="";
				});
			};
	}])
})