define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('ProdukFormulaGiziCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Produk Formula";
			$scope.titled = "Daftar Produk Formula";


			ModelItem.get("PerencanaanDanPemasaran/DiagramTows").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindSarpras.getSarpras("menu-to-bahan/get-menu-gizi/").then(function(dat){
				$scope.sourceProdukHasil= dat.data.data.data;
				// debugger;
			});

			$scope.SelectProduk=function(){
				var produkHasilID = $scope.item.produkHasil.id;
				var url = "menuId=" + produkHasilID; 
				FindSarpras.getSarpras("menu-to-bahan/find-all/?"+url).then(function(dat){
					 var data = []
					 var i = 1
					 dat.data.data.forEach(function(e){
					 	var detail = {
					 		"id": e.id,
					 		"bahanProduk": e.bahanProduk,
					 		"standarPorsi": e.standarPorsi,
					 		"keterangan": e. keterangan,
					 		"no":i
					 	}
					 	data[i-1]=detail
					 	i++;
					 });
					 $scope.sourceDaftarProdukFormula = data;
					 // debugger;
				});	
			}

			$scope.columnDaftarProdukFormula = [
			{
				"field": "no",
				"title": "<h3 align=center>No<h3>",
				"width": "30px",
				"attributes": {align:"center"}
			}, {
				"field": "bahanProduk.namaProduk",
				"title": "<h3 align=center>Produk Asal</h3>",
				"width": "300px"
			}, {
				"field": "standarPorsi",
				"title": "<h3 align=center>Qty<h3>",
				"width": "100px"
			}, {
				"field": "keterangan",
				"title": "<h3 align=center>Keterangan<h3>",
				"width": "200px"
			}];

			$scope.Save = function(){
            	var data = {
            		"produkHasil": {
            			"id": $scope.item.produkHasil.id
            		},
            		"produkAsal": $scope.item.produkAsal,
            		"qty": $scope.item.qty,
            		"keterangan": $scope.item.keterangan
            	};
            	console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(ModelItem.beforePost(data),"produkFormula/save/").then(function(e) {
				});
				$scope.item = {};
			};
		}
	])
})