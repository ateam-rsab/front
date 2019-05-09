define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarAnalisaSWOTCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Daftar Analisa SWOT";
			ModelItem.get("PerencanaanDanPemasaran/DaftarAnalisaSwot").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.awal= new Date($scope.now).getFullYear();
				$scope.item.akhir= $scope.item.awal+4;
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
          		
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.search = function(){
				var awal =  $scope.item.awal;
				var akhir = $scope.item.akhir;
				var faktorId = $scope.item.jenisAnalisaSwot.id;
				var url = "awalPeriode=" + awal + "&akhirPeriode=" + akhir + "&faktorId=" + faktorId;
				var urlb = "awalPeriode=" + awal + "&faktorId=" + faktorId;
				
				FindSarpras.getSarpras("/swot/find-detail-faktor/?" + url).then(function(dat){
					 var data = []
					 var i = 1
					 dat.data.data.forEach(function(e){
					 	var detailFaktor = {
					 		"detailFaktor": e.detailFaktor,
					 		"bobot": e.bobot,
					 		"rating": e.rating,
					 		"skor": e.skor,
					 		"no":i
					 	}
				 	data[i-1]=detailFaktor
				 	i++;
					});
					    $scope.source = data;
					    // debugger;
				    $scope.sourceDaftarAnalisaSwot = new kendo.data.DataSource({
						pageSize: 10,
						data:$scope.source
					});
				})

				FindSarpras.getSarpras("swot/find-total-skor/?" + urlb).then(function(dat){
				    $scope.item.total = dat.data.data.totalSkor.toFixed(2);
				    // debugger;
				});
			};

						// debugger;
			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
                    "field": "no",
					"title": "<h3 align=center>No<h3>",
					"width": "30px",
					"attributes": {align:"center"}
				}, {
					"field": "detailFaktor",
					"title": "<h3 align=center>Analisa</h3>",
					"width": "300px"
				}, {
					"field": "rating",
					"title": "<h3 align=center>Rating<h3>",
					"width": "100px",
					"attributes": {align:"center"}
				}, {
					"field": "bobot",
					"title": "<h3 align=center>Bobot<h3>",
					"width": "100px",
					"attributes": {align:"center"}
				}, {
					"field": "skor",
					"title": "<h3 align=center>Skor<h3>",
					"width": "100px",
					"attributes": {align:"center"}
	            }]
		    };
		    FindSarpras.getSarpras("service/list-generic/?view=SWOT&select=id,namaFaktor").then(function(dat){
				$scope.sourceDaftarSwot= dat.data;
				// debugger;
			});	
			// var awal =  $scope.item.awal;
			// 	var akhir = $scope.item.akhir;
			// 	var faktorId = $scope.item.jenisAnalisaSwot.id;
			// 	var url = "awalPeriode=" + awal + "&akhirPeriode=" + akhir + "&faktorId=" + faktorId;
			// FindSarpras.getDaftarAnalisaSwot("service/list-generic/?view=SWOT&select=id,namaFaktor").then(function(dat){
			// 	$scope.sourceDaftarSwot= dat.data;
			// 	// debugger;
			// });	

			// $scope.columnDaftarAnalisaSwot = [
			// {
			// 	"field": "no",
			// 	"title": "<h3 align=center>No<h3>",
			// 	"width": "30px",
			// 	"attributes": {align:"center"}
			// }, {
			// 	"field": "detailFaktor",
			// 	"title": "<h3 align=center>Analisa</h3>",
			// 	"width": "300px"
			// }, {
			// 	"field": "rating",
			// 	"title": "<h3 align=center>Rating<h3>",
			// 	"width": "100px",
			// 	"attributes": {align:"center"}
			// }, {
			// 	"field": "bobot",
			// 	"title": "<h3 align=center>Bobot<h3>",
			// 	"width": "100px",
			// 	"attributes": {align:"center"}
			// }, {
			// 	"field": "skor",
			// 	"title": "<h3 align=center>Skor<h3>",
			// 	"width": "100px",
			// 	"attributes": {align:"center"}
			// }];

			$scope.titleTable = function(){
					$scope.columnDaftarAnalisaSwot = [
				{
					"field": "no",
					"title": "<h3 align=center>No<h3>",
					"width": "50px"
				}, {
					"field": "detailFaktor",
					"title": "<h3 align=center>"+$scope.item.jenisAnalisaSwot.namaFaktor+"</h3>",
					"width": "200px"
				}, {
					"field": "bobot",
					"title": "<h3 align=center>Bobot<h3>",
					"width": "150px"
				}, {
					"field": "rating",
					"title": "<h3 align=center>Rating<h3>",
					"width": "200px",
					footerTemplate: "Total:"
				}, {
					"field": "skor",
					"title": "<h3 align=center>Skor<h3>",
					"width": "150px",
					footerTemplate: "<center>#= sum #</center> "
				}];
			
			}

			$scope.tahun = function(){
				$scope.item.awal= $scope.item.awal.getFullYear();
				$scope.item.akhir= $scope.item.awal+4;
			}

			$scope.klik = function(r){
				console.log(JSON.stringify(r));
				$scope.current = r;
			}

			$scope.diagramKartesius = function(){
				$state.go("DiagramKartesius")
			}
	}])
})