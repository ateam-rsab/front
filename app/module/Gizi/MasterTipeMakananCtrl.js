define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterTipeMakananCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageGizi', 'FindPasienGizi','$window', '$timeout','$state',	
		function($rootScope, $scope, ModelItem, ManageGizi, FindPasienGizi, $window, $timeout,$state) {
			ModelItem.get("").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
				$scope.statusSave = true;
			}, function errorCallBack(err) {});
		
		    $scope.init = function(){
			 FindPasienGizi.getGizi("bentuk-produk/get-all-produk-gizi").then(function(dat){
					$scope.source= dat.data.data;
					var nomor = 1;
					  $scope.source.forEach(function(e){
					   e.no = nomor++
					  })
				$scope.sourceTipeMakanan = new kendo.data.DataSource({
				pageSize:10,
				data:$scope.source
				});
			 })
		    }
		    $scope.init();

			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [
                 /*{
					"field": "kdBentukProduk",
					"title": "<h3 align=center>Kode<br>Tipe Makanan</h3>",
					"width": "20px",
					"attributes": {align:"center"}
				}, */
				{
					"field": "no",
					"title": "<h3 align=center>No.</h3>",
					"width": "20px"
                },				
                {
					"field": "namaProduk",
					"title": "<h3 align=center>Tipe Makanan</h3>",
					"width": "300px"
                },
                {
				 "title": "<h3 align=center>Action</h3>",
			      "width" : "100px",
			     "template" : "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
		     	}
                ]
            };

			$scope.Batal=function(){
				$scope.item.kode="",
				$scope.item.tipeMakanan=""
			}

			$scope.Select=function(data)
			{
				$scope.item.tipeMakanan = data.namaProduk,
				$scope.DataId=data.id
				toastr.info($scope.item.tipeMakanan+' Dipilih');
			};

            $scope.disableData = function(){
               var isigrid = this.dataItem;
               var Idgrid = isigrid.id;
               var namaProduks = isigrid.namaProduk;
                 var data ={
			 	         	"id" : Idgrid,
							"departemen": {"id": 6},
						 	"kelompokProduk" : {"id":6},
							"kdBentukProduk" : 6,
						 	"namaBentukProduk":namaProduks,
						 	"namaExternal" :namaProduks,
						 	"qBentukProduk":12, 
						 	"statusEnabled":false
						}
				ManageGizi.saveGizi(data,"bentuk-produk/save/").then(function(e) {
					$scope.init();
				})
            }

             $scope.Baru = function(){
				toastr.info('Mode Edit : Mati');
				$scope.item.tipeMakanan = "";
				$scope.DataId= undefined;
			}



			$scope.Save = function(){
            	 
			 var data ={
			 	         "id" : $scope.DataId,
						 "departemen": {"id": 6},
						 "kelompokProduk" : {"id":6},
						 "kdBentukProduk" : 6,
						 "namaBentukProduk":$scope.item.tipeMakanan,
						 "namaExternal" :$scope.item.tipeMakanan,
						 "qBentukProduk":12, 
						 "statusEnabled":$scope.statusSave
						}
				ManageGizi.saveGizi(data,"bentuk-produk/save/").then(function(e) {
					$scope.init();
				});
			}
		}
	]);
});

 /*"kdBentukProduk":$scope.item.kode,*/




//=========================================SOURCE OLD
//console.log(JSON.stringify(data)); 
/*					FindPasienGizi.getGizi("bentuk-produk/find-all/").then(function(dat){
$scope.source= dat.data.data;*/
/*						$scope.sourceTipeMakanan = new kendo.data.DataSource({
pageSize: 10,
data:$scope.source
});*/
// debugger;
/*})*/

	//FindPasienGizi.getGizi("bentuk-produk/find-all/?departemenId=6").then(function(dat){