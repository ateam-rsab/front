define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterMenuCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageGizi', 'FindPasienGizi',
		function($rootScope, $scope, ModelItem, ManageGizi, FindPasienGizi) {
			ModelItem.get("perencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			FindPasienGizi.getGizi("menu-gizi/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var a = {
				 		"id": e.id,
				 		"menu": e.menu,
				 		"no": i
				 	}
			 	data[i-1]=a
			 	i++;
				});
				$scope.source= dat.data.data;
				debugger;
				$scope.sourceMenuGizi = new kendo.data.DataSource({
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
					"width": "20px",
					"attributes": {align: "center"}
				}, {
					"field": "menu",
					"title": "<h3 align=center>Nama Menu</h3>",
					"width": "200px"
                }
                ]
            };
            
            $scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.namaMenu=data.namaMenu

			};
			$scope.Batal=function(){
				$scope.item.namaMenu="";
			};
            $scope.Save = function(){
            	var data = {
            		"menu": $scope.item.namaMenu
            	};
            	console.log(JSON.stringify(data)); 
				ManageGizi.saveGizi(data,"menu-gizi/save/").then(function(e) {
					FindPasienGizi.getGizi("menu-gizi/find-all/").then(function(dat){
						var data = []
						var i = 1
						dat.data.data.forEach(function(e){
						 	var a = {
						 		"id": e.id,
						 		"menu": e.menu,
						 		"nomor": i
						 	}
					 	data[i-1]=a
					 	i++;
						});
						$scope.source= dat.data.data;
						debugger;
						$scope.sourceMenuGizi = new kendo.data.DataSource({
							pageSize: 10,
							data:$scope.source
						});
						// debugger;
					})
					$scope.Batal();
				})
			}

		}
	]);
});