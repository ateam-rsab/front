define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterTingkatRisikoCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras',
		function($rootScope, $scope, ModelItem, ManageSarpras, FindSarpras) {
			ModelItem.get("perencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.item = {};

			// FindSarpras.getMasterTingkatResiko("tingkat-resiko/find-all/").then(function(dat){
			// 	var data = []
			// 	var i = 1
			// 	dat.data.data.forEach(function(e){
			// 	 	var tingkatResiko = {
			// 	 		"id": e.id,
			// 	 		"tingkatResiko": e.tingkatResiko,
			// 	 		"warna": e.warna,
			// 	 		"no":i
			// 	 	}
			// 	 	data[i-1]=tingkatResiko
			// 	 	i++;
			// 	 });
			// 	$scope.sourceTingkatResiko = data;
			// });
			FindSarpras.getSarpras("service/list-generic/?view=TingkatResiko&select=*").then(function(dat){
				var data = []
				var i = 1
				// debugger;
				dat.data.forEach(function(e){
				 	var tingkatResiko = {
				 		"id": e.id,
				 		"tingkatResiko": e.tingkatResiko,
				 		"warna": e.warna,
				 		"no":i
				 	}
				 	data[i-1]=tingkatResiko
				 	i++;
				 });
				$scope.source = data;
				debugger;

				$scope.sourceTingkatResiko = new kendo.data.DataSource({
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
				"width": "10px",
				"attributes": {align: "center"}
			}, {
				"field": "tingkatResiko",
				"title": "<h3 align=center>Tingkat Risiko</h3>",
				"width": "300px"
			}, {
				// "field": "warna",
				"title": "<h3 align=center>warna</h3>",
				"width": "200px",
				"attributes": {style: "background-color: #: warna#"}
			}]
            };
			
			$scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.tingkatResiko=data.tingkatResiko,
				$scope.item.warna=data.warna
				debugger;
			};

			$scope.Batal = function () {
                // debugger;
                $scope.item.tingkatResiko=""
            };

			$scope.enableKodeJenisLinen = "true";

			$scope.Save=function()
			{
				var data = {
					"tingkatResiko": $scope.item.tingkatResiko,
					"warna": $scope.item.warna
				};
				debugger;
				console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(ModelItem.beforePost(data),  "tingkat-resiko/save/").then(function(e) {
					FindSarpras.getSarpras("service/list-generic/?view=TingkatResiko&select=*").then(function(dat){
						var data = []
						var i = 1
						dat.data.forEach(function(e){
						 	var tingkatResiko = {
						 		"id": e.id,
						 		"tingkatResiko": e.tingkatResiko,
						 		"warna": e.warna,
						 		"no":i
						 	}
						 	data[i-1]=tingkatResiko
						 	i++;
						 });
						$scope.sourceTingkatResiko = data;
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
			// 			FindSarpras.getMasterJenisLinen("jenis-linen/find-all-jenis-linen/").then(function(dat){
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
            //     $scope.item.tingkatResiko=""
            // };
		}
	]);
});