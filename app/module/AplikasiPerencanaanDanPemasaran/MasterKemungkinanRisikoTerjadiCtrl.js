define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterKemungkinanRisikoTerjadiCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras',
		function($rootScope, $scope, ModelItem, ManageSarpras, FindSarpras) {
			$scope.item = {};

			ModelItem.get("PerencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			
			FindSarpras.getSarpras("kemungkinan-resiko-terjadi/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var KemungkinanResiko = {
				 		"id": e.id,
				 		"kemungkinanResiko": e.kemungkinanResiko,
				 		"no":i
				 	}
				 	data[i-1]=KemungkinanResiko
				 	i++;
				 });
				$scope.source = data;
				// debugger;
				$scope.sourceKemungkinanResiko = new kendo.data.DataSource({
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
					"field": "kemungkinanResiko",
					"title": "<h3 align=center>Kemungkinan Risiko Terjadi</h3>",
					"width": "300px"
                }
                ]
            };
			
			$scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.kemungkinanResiko=data.kemungkinanResiko
			};

			$scope.enableKodeJenisLinen = "true";

			$scope.Batal=function()
			{
				$scope.item.kemungkinanResiko="";
			};
			$scope.Save=function()
			{
				var data = {
					"kemungkinanResiko": $scope.item.kemungkinanResiko
				};
				console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(ModelItem.beforePost(data),  "kemungkinan-resiko-terjadi/save/").then(function(e) {
					FindSarpras.getSarpras("kemungkinan-resiko-terjadi/find-all/").then(function(dat){
						var data = []
						var i = 1
						dat.data.data.forEach(function(e){
						 	var KemungkinanResiko = {
						 		"id": e.id,
						 		"kemungkinanResiko": e.kemungkinanResiko,
						 		"no":i
						 	}
						 	data[i-1]=KemungkinanResiko
						 	i++;
						 });
						$scope.sourceKemungkinanResiko = data;
						// debugger;
					});
				});
				$scope.item.kemungkinanResiko="";
			};
			// $scope.Delete = function () {
   //              // debugger;
   //              var data = $scope.selected.id;

			// 	console.log(data);
   //              ManageSarpras.deleteSarpras("jenis-linen/delete-jenis-linen/?id=" + data).then(
			// 		function (e) {
			// 			FindSarpras.geSarpras("jenis-linen/find-all-jenis-linen/").then(function(dat){
			// 			$scope.sourceMasterJenisLinen = dat.data.data;

			// 			});
			// 		});
   //          };
            // $scope.editJenisLinen = function()
            // {
            //     if($scope.dataSelectedRowCoa)
            //     {
            //         if(this.dataItem.id != $scope.dataSelectedRowCoa.id)
            //         {
            //             alert("row beom ke select");
            //         }
            //         else
            //         {
            //             $scope.isEditing = true;
            //             $scope.showButtonTemplate = true;
            //             showDataEdit($scope.dataSelectedRowCoa.id);
            //         }
            //     }   
            // };
            // $scope.Batal = function () {
            //     // debugger;
            //     $scope.item.kemungkinanResiko=""
            // };
		}
	]);
});