define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterDampakRisikoCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras',
		function($rootScope, $scope, ModelItem, ManageSarpras, FindSarpras) {
			ModelItem.get("perencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.item = {};

    		FindSarpras.getSarpras("dampak-resiko/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var dampakRisiko = {
				 		// "id": e.id,
				 		"dampakResiko": e.dampakResiko,
				 		"no":i
				 	}
				 	data[i-1]=dampakRisiko
				 	i++;
				 })
				$scope.source= data;
				
				$scope.sourceDampakRisiko = new kendo.data.DataSource({
    				pageSize: 10,
    				data:$scope.source
    				// ,
    				// schema: {
        //                     model: {
        //                         fields: {
        //                             no: { editable: false, nullable: true },
        //                             dampakResiko: { validation: { required: true } }
        //                         }
        //                     }
        //                 }
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
					"field": "dampakResiko",
					"title": "<h3 align=center>Dampak Risiko</h3>",
					"width": "300px"
                }
     //            ,{
     //            	command: ["edit"],
					// title: "&nbsp;",
					// width: "50px"
     //            }
                ]
                // editable: "popup"
            };
			// debugger;
			

			// $scope.columnDampakRisiko = [{
			// 	"field": "no",
			// 	"title": "<h3 align=center>No</h3>",
			// 	"width": "30px",
			// 	"attributes": {align: "center"}
			// }, {
			// 	"field": "dampakResiko",
			// 	"title": "<h3 align=center>Dampak Risiko</h3>",
			// 	"width": "300px"
			// }];
			
			$scope.SelectDampak=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.dampakResiko=data.dampakResiko
				// debugger;
			};

			$scope.enableKodeJenisLinen = "true";

			$scope.Save=function()
			{
				var data = {
					"dampakResiko": $scope.item.dampakResiko
				};
				console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(ModelItem.beforePost(data),  "dampak-resiko/save/").then(function(e) {
					FindSarpras.getSarpras("dampak-resiko/find-all/").then(function(dat){
						var data = []
						var i = 1
						dat.data.data.forEach(function(e){
						 	var dampakRisiko = {
						 		"id": e.id,
						 		"dampakResiko": e.dampakResiko,
						 		"no":i
						 	}
						 	data[i-1]=dampakRisiko
						 	i++;
						 });
						$scope.sourceDampakRisiko = data;
					});
				});
				$scope.Batal();
			};
			// $scope.Delete = function () {
   //              // debugger;
   //              var data = $scope.selected.id;

			// 	console.log(data);
   //              ManageSarpras.deleteMasterJenisLinen("jenis-linen/delete-jenis-linen/?id=" + data).then(
			// 		function (e) {
			// 			FindSarpras.getSarpras("jenis-linen/find-all-jenis-linen/").then(function(dat){
			// 			$scope.sourceMasterJenisLinen = dat.data.data;

			// 			});
			// 		});
   //          };
   //          $scope.editJenisLinen = function()
   //          {
   //              if($scope.dataSelectedRowCoa)
   //              {
   //                  if(this.dataItem.id != $scope.dataSelectedRowCoa.id)
   //                  {
   //                      alert("row beom ke select");
   //                  }
   //                  else
   //                  {
   //                      $scope.isEditing = true;
   //                      $scope.showButtonTemplate = true;
   //                      showDataEdit($scope.dataSelectedRowCoa.id);
   //                  }
   //              }   
   //          };
            $scope.Batal = function () {
                // debugger;
                $scope.item.dampakResiko=""
            };
		}
	]);
});