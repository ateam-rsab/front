define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('ProdukFormulaCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Produk Formula";

		// 	// ModelItem.get("PerencanaanDanPemasaran/DiagramTows").then(function(data) {
		// 	// 	$scope.item = data;
		// 	// 	$scope.dataVOloaded = true;
		// 	// }, function errorCallBack(err) {});

		// 	FindSarpras.getSarpras("service/list-generic/?view=ProdukHasil&select=id,produkHasil").then(function(dat){
		// 		$scope.sourceProdukHasil= dat;
		// 	});
			
		// 	FindSarpras.getSarpras("produk-formula/find-all/").then(function(dat){
		// 		 var data = []
		// 		 var i = 1
		// 		 dat.data.data.forEach(function(e){
		// 		 	var detail = {
		// 		 		"id": e.id,
		// 		 		"produkHasil": e.produkHasil,
		// 		 		"produkAsal": e.produkAsal,
		// 		 		"qty": e.qty,
		// 		 		"keterangan": e. keterangan,
		// 		 		"no":i
		// 		 	}
		// 		 	data[i-1]=detail
		// 		 	i++;
		// 		 });
		// 		 $scope.sourceDaftarProdukFormula = data;
		// 	});	
			
		// 	$scope.columnDaftarProdukFormula = [
		// 	{
		// 		"field": "no",
		// 		"title": "<h3 align=center>No<h3>",
		// 		"width": "30px",
		// 		"attributes": {align:"center"}
		// 	}, {
		// 		"field": "produkAsal",
		// 		"title": "<h3 align=center>Produk Asal</h3>",
		// 		"width": "300px"
		// 	}, {
		// 		"field": "qty",
		// 		"title": "<h3 align=center>Qty<h3>",
		// 		"width": "100px"
		// 	}, {
		// 		"field": "keterangan",
		// 		"title": "<h3 align=center>Keterangan<h3>",
		// 		"width": "200px"
		// 	}];

		// 	$scope.Save = function(){
  //           	var data = {
  //           		"produkHasil": {
  //           			"id": $scope.item.produkHasil.id
  //           		},
  //           		"produkAsal": $scope.item.produkAsal,
  //           		"qty": $scope.item.qty,
  //           		"keterangan": $scope.item.keterangan
  //           	};
  //           	console.log(JSON.stringify(data));
		// 		ManageSarpras.saveSarpras(ModelItem.beforePost(data),"produkFormula/save/").then(function(e) {
		// 		});
		// 		$scope.item = {};
		// 	};
		}
	])
})