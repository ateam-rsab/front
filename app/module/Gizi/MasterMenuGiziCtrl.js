define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterMenuGiziCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageGizi', 'FindPasienGizi','$state',
		function($rootScope, $scope, ModelItem, ManageGizi, FindPasienGizi, $state) {
			ModelItem.get("perencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			
			$scope.init = function(){
				$scope.number = 1;
				FindPasienGizi.getGizi("menu/find-all/").then(function(dat){
					$scope.source= dat.data.data.data;
					for(var i=0; i<$scope.source.length; i++){
						$scope.source[i].no = $scope.number++;
					}
					$scope.SourceMenuGizi = new kendo.data.DataSource({
					pageSize: 10,
					data: $scope.source
				  })
				})
			}
			$scope.init();
			
			$scope.JenisWaktu = function(){
			  FindPasienGizi.getGizi("jenis-waktu/get-jenis-waktu/").then(function(dat){
				 $scope.listWaktuMakan = dat.data.data
			  })
			}
			$scope.JenisWaktu();



			$scope.mainGridOptions = {
				pageable: true,
				scrollable:false,
				columns: [{
					"field": "no",
					"title": "<h3 align=center>No</h3>",
					"width": "30px",
					"attributes": {align: "center"}
				}, {
					"field": "detailJenisProduk",
					"title": "<h3 align=center>Detail Jenis Produk</h3>",
					"width": "200px"
				}, {
					"field": "kdProduk",
					"title": "<h3 align=center>Kode</h3>",
					"width": "100px"
				}, {
					"field": "namaProduk",
					"title": "<h3 align=center>Nama Menu</h3>",
					"width": "200px"
				}, {
					"field": "namaBentukProduk",
					"title": "<h3 align=center>Jenis Makanan</h3>",
					"width": "200px"
				}
				]
			};


		  $scope.Cari = function(getPencarian){
		  	debugger
			   	if(getPencarian != undefined){
			   	 var q = getPencarian;
			     var grid = $("#grid").data("kendoGrid");
			     	  grid.dataSource.query({
			          page:1,
			          pageSize:20,
			          filter:{
			          	logic:"or",
			         		 filters:[{field:"detailJenisProduk", operator:"contains",value:q},
			         		          {field:"namaProduk", operator:"contains",value:q},
			         		          {field:"namaBentukProduk", operator:"contains",value:q},
			         		          {field:"kdProduk", operator:"contains",value:q}]
			          }
			      });
			   	}
			  }	

			 $scope.ClearCari = function(Pencarians){
			    $scope.item.pencarian = "";
			     var gridData = $("#grid").data("kendoGrid");
			     gridData.dataSource.filter({});
			     $scope.init();
			 }


			$scope.Batal=function(){
				// FindPasienGizi.getGizi("menu/generate/").then(function(dat){
				// 	$scope.item.kodeMenu = dat.data.data.result;
				// // debugger;
				// });

				$scope.item.namaMenu="",
				$scope.item.bentukProduk=""
			}

			$scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.kodeMenu=data.kodeMenu,
				$scope.item.namaMenu=data.namaMenu,
				$scope.item.bentukProduk=data.namaBentukProduk

			};

			$scope.Refresh = function(){
				$scope.item.pencarian ="";
				$scope.item.siklusMenu = "";
				$scope.item.waktuMakan = "";
				$scope.dataTeknisi = [];
				$scope.init();
			}

			$scope.batal = function(){
				$state.go('home');
			}

			$scope.save = function(){
				debugger
				var data = {
					"kodeMenu": $scope.item.kodeMenu,
					"namaMenu" : $scope.item.namaMenu, 
					"namaBentukProduk": $scope.item.bentukProduk
				};
				ManageGizi.saveGizi(data,"menu/save/").then(function(e) {
				});
			}

			$scope.arrMenuMakanan = [
			{
				"menuMakanan": {
					"id": ""
				}
			}];

			$scope.addMenuMakanan = function () {
				var newData = {
					"menuMakanan": {
						"id": ""
					}
				}
				$scope.arrMenuMakanan.push(newData);

			}



			$scope.removeMenu = function (data) {

				$scope.arrMenuMakanan.splice(data,1);
			};
		}
		]);
});


//============================SOURCE OLD DATA =====================================================================//
	// FindPasienGizi.getGizi("menu/generate/").then(function(dat){
	// 	$scope.item.kodeMenu = dat.data.data.result;
	// 	// debugger;
	// });

	/*		FindPasienGizi.getGizi("detail-jenis-bahan/find-all/?departemenId=6").then(function(dat){
	$scope.sourceDetailJenisBahan= dat.data.data;
	});*/

	/*			FindPasienGizi.getGizi("bentuk-produk/find-all/?departemenId=6").then(function(dat){
	$scope.sourceTipeMakanan= dat.data.data;
	});*/

	/*					$timeout(function () {
						$window.location.reload();
					}, 4500);*/
