define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('ProduksiCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageGizi', 'FindPasienGizi',
		function($rootScope, $scope,$state, ModelItem, DateHelper, ManageGizi, FindPasienGizi){
			$scope.item = {};
			$scope.title = "Produksi Bahan";
			$scope.titled = "Daftar Produk Formula";

			FindPasienGizi.getGizi("service/list-generic/?view=JenisWaktu&select=id,jenisWaktu").then(function(dat){
				$scope.SourceJenisWaktu = dat.data;
			});

			
			$scope.mySplit = function(string) {
			    var array = string.split(',');
			    array.splice(-1,1);
			    return array;
			};

			
			$scope.init = function () {
				FindPasienGizi.getProduksiGizi($state.params.produkId,$state.params.noRecOrder, $state.params.jenisWaktuId).then(function(dat){
	                $scope.orderGizi = dat.data.data.list;
	                $scope.orderGizi.forEach(function(data){
							data.stok = parseInt(data.stok);
						});
	                $scope.sourceDaftarProduksi = new kendo.data.DataSource({
	                    data: $scope.orderGizi,
	                    pageSize: 20,
	                });
	            });
			};
			$scope.init();

			

			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
    //             	"field": "no",
				// 	"title": "<h3 align=center>No<h3>",
				// 	"width": "50px",
				// 	"attributes": {align:"center"}
				// }, {
					"field": "menu",
					"title": "<h3 align=center>Nama Menu</h3>",
					"width": "300px"
				}, {
					"field": "stok",
					"title": "<h3 align=center>Stok/Porsi<h3>",
					"width": "100px"
				}, {
					"field": "jumlahMenu",
					"title": "<h3 align=center>Jumlah/Porsi<h3>",
					"width": "100px"
				}
                ]
                // ,
                // editable: "inline"
            };
            $scope.disProduksi = true;
            $scope.disCekProduksi = false;

			$scope.kembali=function(){
				$state.go('DaftarPemesananPasien')
			};
			$scope.detailListProduksi = [];

			$scope.cekProduk = function () {
				var orderPelayanans = []
				$scope.detailListProduksi = [];
				var getNoRecOrder = $scope.mySplit($state.params.noRecOrder);
				var getProdukId = $scope.mySplit($state.params.produkId);
				for(var i=0; i<getNoRecOrder.length; i++){
					orderPelayanans.push({
						"noRec":getNoRecOrder[i],
						"produk":{
							"id":getProdukId[i] 
						}
					})
				};
				var data = {
					"orderPelayanans": orderPelayanans
				}
				FindPasienGizi.saveDataGizi(data, "registrasi-pelayanan/cek-produksi?").then(function(e) {
					
					$scope.detailListProduksi = e.data.data;
					var kurangBahan = [];
					console.log(JSON.stringify($scope.detailListProduksi));
					for (var i=0;i<$scope.detailListProduksi.length;i++){
						if ($scope.detailListProduksi[i].stokLess == true) {
							window.messageContainer.error('Tolong Lakukan Pemesanan '+$scope.detailListProduksi[i].produk)
							kurangBahan.push({"name":"ada"})
						} 
					};
					if (kurangBahan.length == 0) {
						$scope.disProduksi = false;	
					}
				});

			};
			$scope.produksi = function () {
				var orderPelayanans = []
				var getNoRecOrder = $scope.mySplit($state.params.noRecOrder);
				var getProdukId = $scope.mySplit($state.params.produkId);
				for(var i=0; i<getNoRecOrder.length; i++){
					orderPelayanans.push({
						"noRec":getNoRecOrder[i],
						"produk":{
							"id":getProdukId[i] 
						}
					})
				};
				var data = {
					"orderPelayanans": orderPelayanans
				}
				FindPasienGizi.saveDataGizi(data, "registrasi-pelayanan/save-produksi?").then(function(e) {
					console.log(JSON.stringify(e.data));
					$scope.init();
					$scope.disProduksi = true;
            		$scope.disCekProduksi = true;
				});
			}
		}
	])
})