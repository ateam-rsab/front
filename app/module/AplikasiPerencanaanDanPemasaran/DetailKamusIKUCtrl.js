define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DetailKamusIKUCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras','$window', '$timeout',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras, $window, $timeout){
			$scope.item = {};
			$scope.title = "Detail Kamus indikator";
			$scope.tahun = []
			ModelItem.get("PerencanaanDanPemasaran/programKerjaStrategis").then(function(data) {
				$scope.item = data;
				$scope.item.total = 0;
				$scope.now = new Date();
				$scope.item.periodeTahun= new Date($scope.now).getFullYear();
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
				$scope.dataVOloaded = true;
				$scope.target = [];
			}, function errorCallBack(err) {});

			// FindSarpras.getProgramKerjaStrategis("service/list-generic/?view=SasaranStrategis&select=id,sasaranStrategis").then(function(dat){
			// 	$scope.sourcedaftarSasaranStrategiss= dat;
			// 	// debugger;
			// });

			// 
			FindSarpras.getSarpras("kamus-indikator/detail-indikator/?id=" + $state.params.id).then(function(dat){
				$scope.item.perspektif = dat.data.data[0].kamus.indikator.sasaranStrategis.perspektif.perspektif;
				$scope.item.sasaranStrategis = dat.data.data[0].kamus.indikator.sasaranStrategis.sasaranStrategis;
				$scope.item.indikator = dat.data.data[0].kamus.indikator.indikator;
				$scope.item.definisi = dat.data.data[0].kamus.indikator.definisiOperasional;
				$scope.item.formula = dat.data.data[0].kamus.indikator.formula;
				$scope.item.bobot = dat.data.data[0].kamus.bobotIndikator.bobotIndikator;
				$scope.item.pic = dat.data.data[0].kamus.pic.namaDepartemen;
				$scope.item.sumberData = dat.data.data[0].kamus.sumberData;
				$scope.item.periodePelaporan = dat.data.data[0].kamus.periodePelaporan.periodePelaporan;

				var daftarTarget = [];
				var column= []
				var listTarget = [];
				for(var i=dat.data.data[0].kamus.awalPeriode;i<=dat.data.data[0].kamus.akhirPeriode;i++){
					var data = {
						"tahun" : i,
						"target" : "-"
					}
					// $scope.tahun[i-dat.data.data[0].kamus.awalPeriode] = i; 
					listTarget[i-dat.data.data[0].kamus.awalPeriode] = data;

					// var colNum = {
					// 	"field": "listTarget["+(i-dat.data.data[0].kamus.awalPeriode)+"].targetindikator",
					// 	"title": "<h3 align=center>"+i+"</h3>",
					// 	"width": "100px"
					// }
					// column.push(colNum);
				}

				// $scope.columnDaftarTarget = column;
				dat.data.data[0].listTarget.forEach(function(e){
					var idx = e.tahun - dat.data.data[0].kamus.awalPeriode;
					listTarget[idx].target = e.target;
					if(e.id != undefined) listTarget[idx].id = e.id
				});

				daftarTarget[0] = {
					"listTarget" : listTarget
				}

				$scope.sourceDaftarTarget = daftarTarget;
				$scope.item.target = daftarTarget[0].listTarget;
				// debugger;
			});
			
			// $scope.select=function(data){
			// 	$scope.item.target= 
			// }
			
			$scope.columnDaftarTarget = function(){
				var column= [];

				for(var i=$state.params.awalPeriode;i<=$state.params.akhirPeriode;i++){
					var colNum = {
						"field": "listTarget["+(i-$state.params.awalPeriode)+"].target",
						"title": "<h3 align=center>"+i+"</h3>",
						"width": "100px"
					}
					column.push(colNum);
				}
				// var colNum = {
				// 		"command":["edit"]
				// 	}
				// 	column.push(colNum);
				return column;
				// return [
				// {
				// 	"field": "listTarget[0].targetindikator",
				// 	"title": "<h3 align=center>1</h3>",
				// 	"width": "100px"
				// }, {
				// 	"field": "listTarget[1].targetindikator",
				// 	"title": "<h3 align=center>2</h3>",
				// 	"width": "100px"
				//  }, {
				// 	"field": "listTarget[2].targetindikator",
				// 	"title": "<h3 align=center>3</h3>",
				// 	"width": "100px"
				// }, {
				// 	"field": "listTarget[3].targetindikator",
				// 	"title": "<h3 align=center>4<h3>",
				// 	"width": "100px"
				// }, {
				// 	"field": "listTarget[4].targetindikator",
				// 	"title": "<h3 align=center>5<h3>",
				// 	"width": "100px"
				// }
				// ];
			}
			$scope.Save=function(){
				
            	console.log(JSON.stringify($scope.item.target));
            	// debugger;
				ManageSarpras.saveSarpras(ModelItem.beforePost($scope.item.target),"target-indikator/save/").then(function(e) {
					$timeout(function () {
	                    $window.location.reload();
	              }, 5000);
				});
				// debugger;
			}
			$scope.Kembali = function(){
				$state.go("KamusIKU")
			}
			 $scope.mainGridOptions = {
                // sortable: true,
                // pageable: true,
                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                }
            };

            $scope.detailGridOptions = function(dataItem) {
              debugger;  
              return {
                  
                    dataSource: {
                        data : dataItem.detail,
                        
                        serverPaging: true,
                        pageSize: 5,
                       
                    },
                    scrollable: false,
                    sortable: true,
                    //pageable: true,
                    columns: [
                    { field: "OrderID", title:"ID", width: "56px" },
                    { field: "ShipCountry", title:"Ship Country", width: "110px" },
                    { field: "ShipAddress", title:"Ship Address" },
                    { field: "ShipName", title: "Ship Name", width: "190px" }
                    ]
                };
            };
	}])
})