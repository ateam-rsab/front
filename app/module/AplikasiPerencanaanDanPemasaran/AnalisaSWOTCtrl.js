define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('AnalisaSWOTCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras', '$window', '$timeout',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras, $window, $timeout){
			$scope.item = {};
			ModelItem.get("PerencanaanDanPemasaran/analisaSwot").then(function(data) {
				$scope.item = data;
				$scope.item.total = 0;
				$scope.no = 1;
				$scope.now = new Date();
				$scope.item.awal= new Date($scope.now).getFullYear();
				$scope.item.akhir= $scope.item.awal+4
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
          		$scope.JenisAnalisa = false;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			FindSarpras.getSarpras("service/list-generic/?view=SWOT&select=id,namaFaktor").then(function(dat){
				$scope.sourceFaktor = dat.data;
			// debugger;
			});

			$scope.dataAnalisaSwot = new kendo.data.DataSource({
				data: []
			});	
			$scope.columnAnalisaSwot = [
				{
					"field": "no",
					"title": "<h3 align=center>No</h3>",
					"width": "30px",
					"attributes":{align:"center"}
				},
				{
					"field": "detailFaktor",
					"title": "<h3 align=center>Analisa</h3>",
					"width": "300px"
				},
				{
					"field": "rating.rating",
					"title": "<h3 align=center>Rating</h3>",
					"width": "70px",
					"attributes":{align:"center"}
				},
				{
					"field": "bobot",
					"title": "<h3 align=center>Bobot</h3>",
					"width": "70px",
					"attributes":{align:"center"}
				},
				{
					"field": "skor",
					"title": "<h3 align=center>Skor</h3>",
					"width": "70px",
					"attributes":{align:"center"}
				}
			];
			$scope.addAnalisaSwot = function() {

				var tempDataAnalisa = {
					"no": $scope.no++,
					"detailFaktor": $scope.item.analisa,
					"bobot" : $scope.item.bobot,
					"rating" : $scope.item.rating,
					"skor" : $scope.item.skor
				}

				$scope.dataAnalisaSwot.add(tempDataAnalisa);
				var total = $scope.item.total;
				var skor = $scope.item.skor;
				var total2 = parseFloat(total) + parseFloat(skor);
				$scope.item.total = total2.toFixed(2);

				$scope.item.analisa = "";
				$scope.item.bobot = "";
				$scope.item.rating = "";
				$scope.item.skor = "";

				
			}
			$scope.Batal=function(){
				$scope.item.jenisAnalisaSwot="",
				$scope.item.analisa = "",
				$scope.item.bobot = "",
				$scope.item.rating = "",
				$scope.item.skor = ""
			}
			$scope.disab = function(){
				$scope.item.jenisAnalisaSwot.disabled = "true";
				// debugger;
			}
			$scope.tahun = function(){
				$scope.item.awal= $scope.item.awal.getFullYear();
				$scope.item.akhir= $scope.item.awal+4;
			}
			$scope.analisaSwots = function(){
				console.log($scope.item.jenisAnalisaSwot);
				if ($scope.item.jenisAnalisaSwot.id == 1){
					$scope.item.analisa = "Kekuatan (Strenght)";
				}else if ($scope.item.jenisAnalisaSwot.id == 2){
					$scope.item.analisa = "Kelemahan (Weakness)";
				}else if ($scope.item.jenisAnalisaSwot.id == 3){
					$scope.item.analisa = "Peluang (Opportunity)";
				}else{
					$scope.item.analisa = "Ancaman (Threats)";
				}
			};
			$scope.sourceJenisAnalisaSwot = [
				{
					"id": "1",
					"nama": "Kekuatan"
				},
				{
					"id": "2",
					"nama": "Kelemahan"
				},
				{
					"id": "3",
					"nama": "Peluang"
				},
				{
					"id": "4",
					"nama": "Ancaman"
				}
			];

			
			$scope.sourceRating = [
				{
					"id": 1,
					"rating": 1
				},
				{
					"id": 2,
					"rating": 2
				},
				{
					"id": 3,
					"rating": 3
				},
				{
					"id": 4,
					"rating": 4
				},
				{
					"id": 5,
					"rating": 5
				}
			];
			$scope.sourceJenisAnalisa = [
				{
					"id": 1,
					"jenisAnalisaSwot": "Faktor yang membentuk Kekuatan (Strenght)"
				},
				{
					"id": 2,
					"jenisAnalisaSwot": "Faktor yang membentuk Kelemahan (Weakness)"
				},
				{
					"id": 3,
					"jenisAnalisaSwot": "Faktor yang membentuk Peluang (Opportunity)"
				},
				{
					"id": 4,
					"jenisAnalisaSwot": "Faktor yang membentuk Ancaman (Threats)"
				}
			];

			FindSarpras.getSarpras("service/list-generic/?view=SWOT&select=id,namaFaktor").then(function(dat){
				$scope.sourceAnalisaSwot= dat;
				// debugger;
			});	

			$scope.skor = function(){
				// var bobot = parseFloat($scope.item.bobot);
				var bobot = $scope.item.bobot;
				var rating = $scope.item.rating.rating ;
				var skor1 = bobot * rating;
				$scope.item.skor = skor1.toFixed(2);
			}
			// $scope.Batal= function(){
			// 	$scope.item.jenisAnalisaSwot = "",
			// 	$skor.item.analisa="",
			// 	$skor.item.bobot="",
			// 	$skor.item.rating="",
			// 	$skor.item.skor="",
			// 	$skor.item.total=0
			// }
		
			$scope.Save = function(){
				var dat = $scope.dataAnalisaSwot._data;
				console.log(JSON.stringify(dat));
				var i=0;
				var mappAnalisa = [];
				dat.forEach(function(value){
					var data ={
						"swot": {
							"id": $scope.item.jenisAnalisaSwot.id
						},
            			"awalPeriode": $scope.item.awal,
            			"akhirPeriode": $scope.item.akhir,
						"detailFaktor": value.detailFaktor,
	            		"bobot": value.bobot,
	            		"rating" : value.rating.id,
	            		"skor" : value.skor
						}
					mappAnalisa[i] =data;
					i++;
				})
            	// debugger;
            	console.log(JSON.stringify(mappAnalisa));
				ManageSarpras.saveSarpras(mappAnalisa,"swot/save-detail-faktor/").then(function(e) {
					$timeout(function () {
	                    $window.location.reload();
	              }, 5000);
				});
				$scope.Batal();
			};
		}
	])
})