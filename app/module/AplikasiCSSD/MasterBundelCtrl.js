define(['initialize'], function(initialize) { 
	'use strict';
	initialize.controller('MasterBundelCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras','$state',
		function($rootScope, $scope, ModelItem, ManageSarpras, FindSarpras,$state) {
			ModelItem.get("Laundry/MasterJenisLinen").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.item = {};
	
			$scope.Init = function(){
				FindSarpras.getSarpras("bundlesetalat/get-bundle-set-alat").then(function(dat){
					$scope.sourceMasterJenisLinen = dat.data.data;
					$scope.no = 1;
					for(var i=0; i<$scope.sourceMasterJenisLinen.length; i++){
						 $scope.sourceMasterJenisLinen[i].no = $scope.no++;
					}
				});
			}
			$scope.Init();
			$scope.mainGridOptions = { 
				pageable: true,
				filterable: {
				extra: false,
				operators: {
							string: {
									  startsWith: "Pencarian"
									}
							}
				},
             sortable: true,
	     	}
			$scope.columndataJenisLinen = [{
				"field": "no",
				"title": "<h3 align=center>No</h3>",
				"width": "20px"
			}, {
				"field": "namaExternal",
				"title": "<h3 align=center>Nama Eksternal</h3>",
				"width": "170px"
			}, 
			{
			 "title": "<h3 align=center>Action</h3>",
		      "width" : "50px",
		     "template" : "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];
		
			$scope.disableData = function(){
			var allData = this.dataItem;
				var data = {
					"id" :allData.id,
					"namaExternal": allData.namaExternal,
					"statusEnabled" : "false"
				};
				ManageSarpras.saveSarpras(data,  "bundlesetalat/save-bundle-set-alat").then(function(e) {
                	$scope.item.namaEksternal="",
                	$scope.Init();
                	$scope.selectedid = undefined;
				});
		     }

			$scope.tutup = function(){
			  $state.go('home');
			}
		
			$scope.SelectJenisLinen=function(data){
				debugger
				if($scope.selectedid == undefined){
				   toastr.info("Mode Edit : Aktif");	
				}
				$scope.item.namaEksternal=data.namaExternal,
				$scope.selectedid = data.id;
			};

			$scope.baru = function(){
                $scope.item.namaEksternal="",
                $scope.selectedid = undefined,
                toastr.info("Mode Edit : Mati");
			}


			$scope.enableKodeJenisLinen = "true";
			$scope.Save=function(){
				var data = {
					"id" : $scope.selectedid,
					"namaExternal": $scope.item.namaEksternal,
					"statusEnabled" : true
				};
				ManageSarpras.saveSarpras(data,"bundlesetalat/save-bundle-set-alat").then(function(e) {
					$scope.Init();
				});
				$scope.Batal();
			};

            $scope.Batal = function () {
                $scope.item.namaEksternal="";
            };
		}
	]);
});

