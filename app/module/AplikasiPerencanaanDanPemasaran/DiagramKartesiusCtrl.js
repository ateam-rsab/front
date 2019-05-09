define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DiagramKartesiusCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Diagram Kartesius";
			$scope.pencarian = "Pencarian";
			ModelItem.get("PerencanaanDanPemasaran/DiagramKartesius").then(function(data) {
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
			$scope.tahun = function(){
				$scope.item.awal= $scope.item.awal.getFullYear();
				$scope.item.akhir= $scope.item.awal+4;
			}
			$scope.search = function(){
				var awal =  $scope.item.awal;
				var akhir = $scope.item.akhir;
				var url = "awalPeriode=" + awal + "&akhirPeriode=" + akhir;
		
				var sumbuX = 0;
				var sumbuY = 0;
				// FindSarpras.getDaftarAnalisaSwot("swot/find-detail-faktor/?" + url).then(function(dat){
				// 	// debugger;
				//     $scope.sourceDaftarAnalisaSwot = dat.data;
				// });

				FindSarpras.getSarpras("swot/find-total-skor/?" + url + "&faktorId=1").then(function(dat){
				    $scope.item.Kekuatan = dat.data.data.totalSkor.toFixed(2);
				    sumbuX += parseFloat(dat.data.data.totalSkor.toFixed(2));
				    $scope.item.SumbuX =sumbuX;
				    $scope.createChart();
				});

				FindSarpras.getSarpras("swot/find-total-skor/?" + url + "&faktorId=2").then(function(dat){
				    $scope.item.Kelemahan = dat.data.data.totalSkor.toFixed(2);
				    sumbuX -= parseFloat(dat.data.data.totalSkor.toFixed(2));
				    $scope.item.SumbuX =sumbuX;
				    $scope.createChart();
				});

				FindSarpras.getSarpras("swot/find-total-skor/?" + url + "&faktorId=3").then(function(dat){
				    $scope.item.Peluang = dat.data.data.totalSkor.toFixed(2);
				    sumbuY += parseFloat(dat.data.data.totalSkor.toFixed(2));
				    $scope.item.SumbuY =sumbuY;
				    $scope.createChart();
				});

				FindSarpras.getSarpras("swot/find-total-skor/?" + url + "&faktorId=4").then(function(dat){
				    $scope.item.Ancaman = dat.data.data.totalSkor.toFixed(2);
				    sumbuY -= parseFloat(dat.data.data.totalSkor.toFixed(2));
				    $scope.item.SumbuY =sumbuY;
				    $scope.createChart();
				});
				
					// $scope.item.SumbuX = $scope.item.Kekuatan - $scope.item.Kelemahan;
					// $scope.item.SumbuY = $scope.item.Peluang - $scope.item.Ancaman.toFixed(2);
			}

			// $scope.calculate = function(){
			// 	$scope.item.SumbuX = $scope.item.Kekuatan - $scope.item.Kelemahan;
			// 	$scope.item.SumbuY = $scope.item.Peluang - $scope.item.Ancaman;
			// 	debugger;
			// }
			$scope.createChart= function() {
                $("#chart").kendoChart({ 
                // title: { 
                //     text: "Hasil Analisa" 
                // }, 
                legend: { 
                    visible: true 
                }, 
                seriesDefaults: { 
                    type: "scatterLine", 
                    style: "smooth" 
                }, 
                series: [{ 
                    // name: "Hasil Analisa", 
                    data: [[0,0],[$scope.item.SumbuX,$scope.item.SumbuY]] 
                }], 
                xAxis: { 
                    max:  Math.abs(1), 
                    min:  -Math.abs(1),
                    labels: { 
                        format: "{0}" 
                    }
                    // , 
                    // title: { 
                    //     text: "Kelemahan < == > Kekuatan" 
                    // } 
                }, 
                yAxis: { 
                    max:  Math.abs(5),
                    min:  -Math.abs(5),
                    labels: { 
                        format: "{0}" 
                    }
                    // , 
                    // title: { 
                    //     text: "Ancaman < == > Peluang" 
                    // } 
                }, 
                tooltip: { 
                    visible: true, 
                    format: "{1} in {0}" 
                } 
            });
            };
			
	}])
})