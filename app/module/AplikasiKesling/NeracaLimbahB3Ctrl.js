define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('NeracaLimbahB3Ctrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','TampilDataNeraca','TampilPerlakuan','TampilPerizinan','ManageSarpras',
		function($rootScope, $scope, ModelItem, DateHelper,TampilDataNeraca,TampilPerlakuan,TampilPerizinan,ManageSarpras) {
			ModelItem.get("Kesling/NeracaLimbah").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.qtyproduk8 = 0;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});		
		   
			$scope.item = {};

			$scope.daftarPerizinan = [{"id": 1, "name": "Ada"}, {"id": 2, "name": "TIdak Ada"}, {"id": 3, "name": "Kadaluarsa"}];
			
			$scope.penjumlahan = function () {
				
				if ($scope.item.qtyproduk2==undefined) {
					$scope.item.qtyproduk2=0;	
				} else {
					$scope.item.qtyproduk2=$scope.item.qtyproduk2;
				}	
				
				if ($scope.item.qtyproduk1==undefined) {
					$scope.item.qtyproduk1=0;	
				} else {
					$scope.item.qtyproduk1=$scope.item.qtyproduk1;
				}

				if ($scope.item.qtyproduk3==undefined) {
					$scope.item.qtyproduk3=0;	
				} else {
					$scope.item.qtyproduk3=$scope.item.qtyproduk3;
				}	
				
				if ($scope.item.qtyproduk4==undefined) {
					$scope.item.qtyproduk4=0;	
				} else {
					$scope.item.qtyproduk4=$scope.item.qtyproduk4;
				}	
				
				
				if ($scope.item.qtyproduk5==undefined) {
					$scope.item.qtyproduk5=0;	
				} else {
					$scope.item.qtyproduk5=$scope.item.qtyproduk5;
				}	
				
				
				if ($scope.item.qtyproduk6==undefined) {
					$scope.item.qtyproduk6=0;	
				} else {
					$scope.item.qtyproduk6=$scope.item.qtyproduk6;
				}	
				
				if ($scope.item.qtyproduk7==undefined) {
					$scope.item.qtyproduk7=0;	
				} else {
					$scope.item.qtyproduk7=$scope.item.qtyproduk7;
				}	
				
				//var a = $scope.item.qtyproduk8;
				var b = $scope.item.qtyproduk1;
				var d = $scope.item.qtyproduk2;
				var e = $scope.item.qtyproduk3;
				var f = $scope.item.qtyproduk4;
				var g = $scope.item.qtyproduk5;
				var h = $scope.item.qtyproduk6;
				var i = $scope.item.qtyproduk7;
				var c = b + d + e +f +g +h + i; 
				$scope.item.qtyproduk8 = c;
				//debugger;
              //   var d= $scope.item.qtyproduk1;
			//	var e= $scope.item.qtyproduk2;
			//	var f= $scope.item.qtyproduk3;
			//	var g= $scope.item.qtyproduk4;
			//	var h= $scope.item.qtyproduk5;
			//	var i= $scope.item.qtyproduk6;
			//	var j= $scope.item.qtyproduk7;
			
			
			
				//$scope.item.qtyproduk8=d+e+f;

			};
			
			
			
			
				TampilPerlakuan.getOrderList("service/list-generic/?view=Perlakuan&select=*" ).then(function(dat){
				    $scope.Listperlakuan = dat.data;
				
					
				});
				
				
				TampilPerizinan.getOrderList("service/list-generic/?view=PerizinanLimbah&select=*" ).then(function(dat){
				    $scope.Listperizinan = dat.data;
			
					
				});
				
			$scope.sourceOrder = new kendo.data.DataSource({
				data: [],
				aggregate: [
					{ field: "total", aggregate: "sum" }
					
					// { field: "risk", aggregate: "totalRisk" }

				]
			});

			$scope.columndataJenisAwalLimbah= [
				{
					"field": "limbag",
					"title": "Jenis Limbah Awal",
					"width": "200px"
				}, {
					"field": "total",
					"title": "Jumlah (Kg)",
					"width": "100px",			   
					footerTemplate: "<center>#= sum #</center> "
			    }
		    ];
			
			$scope.cari = function() {
				var awal  =  DateHelper.getPeriodeFormatted($scope.item.periodeAwal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.periodeAkhir);
	       		//debugger;
          		TampilDataNeraca.getOrderList("limbah-b3-keluar/get-total-limbah-by-periode-list/?periodeAwal="+awal+"&periodeAkhir="+akhir).then(function(dat){
			  		$scope.sourceOrder1 = dat.data.data.data;
					$scope.sourceOrder1.forEach(function(data){
						$scope.sourceOrder.add(data);
					})
					//debugger;
				});
			}
			
			$scope.tambahbro = function () {
                 
				var a= $scope.item.residu;
				var b= $scope.item.jumlahbelumkelola;
				var c= $scope.item.plus;
				var d = $scope.sourceOrder._aggregateResult.total.sum;
				// debugger;

				$scope.item.plus=a+b;

				var x = c / d;
				var kinerjapengelola =((d-x)/d)*100;
				$scope.item.kinerjapengelolaan = Math.round(kinerjapengelola, 2);

			};
			
			$scope.Save = function () {

				$scope.item.detailPerlakuan = []
				
				if ( $scope.item.perizinan !== undefined)
				{
					
					var tempItem = {
						"perizinanLimbah": {
							"id": parseInt($scope.item.perizinan.id)
						},
						"jenisLimbahYangDikelola": $scope.item.jenislimbah,
						"perlakuan": {
							"id": 1
						},
						"jumlah": $scope.item.qtyproduk1,
					}

					$scope.item.detailPerlakuan.push(tempItem);
					// console.log(JSON.stringify($scope.item.detailPerlakuan));
					// debugger;

				} else {
					$scope.item.perizinan={};
				}
				// else
				// {
				// 	$scope.item.perizinan.id=$scope.item.perizinan.id;
				// 	//debugger;
				// }
				
				
				if ( $scope.item.perizina !== undefined)
				{
					var tempItem = {
						"perizinanLimbah": {
							"id": parseInt($scope.item.perizina.id)
						},
						"jenisLimbahYangDikelola": $scope.item.jenislimbah2,
						"perlakuan": {
							"id": 2
						},
						"jumlah": $scope.item.qtyproduk2,
					}

					$scope.item.detailPerlakuan.push(tempItem);
					//debugger;
				} else {

					$scope.item.perizina={};
				}
				// else
				// {
				// 	$scope.item.perizina.id=$scope.item.perizina.id;
				// 	//debugger;
				// }
				
				if ( $scope.item.perizin !== undefined)
				{
					var tempItem = {
						"perizinanLimbah": {
							"id": parseInt($scope.item.perizin.id)
						},
						"jenisLimbahYangDikelola": $scope.item.jenislimbah3,
						"perlakuan": {
							"id": 3
						},
						"jumlah": $scope.item.qtyproduk3,
					}

					$scope.item.detailPerlakuan.push(tempItem);
					//debugger;
				} else {

					$scope.item.perizin={};
				}
				// else
				// {
				// 	$scope.item.perizin.id=$scope.item.perizin.id;
				// 	//debugger;
				// }
				
				if ( $scope.item.perizi !== undefined)
				{
					var tempItem = {
						"perizinanLimbah": {
							"id": parseInt($scope.item.perizi.id)
						},
						"jenisLimbahYangDikelola": $scope.item.jenislimbah4,
						"perlakuan": {
							"id": 4
						},
						"jumlah": $scope.item.qtyproduk4,
					}

					$scope.item.detailPerlakuan.push(tempItem);
					//debugger;
				} else {

					$scope.item.perizi={};
				}
				// else
				// {
				// 	$scope.item.perizi.id=$scope.item.perizi.id;
				// 	//debugger;
				// }
				
				if ( $scope.item.periz !== undefined)
				{
					var tempItem = {
						"perizinanLimbah": {
							"id": parseInt($scope.item.periz.id)
						},
						"jenisLimbahYangDikelola": $scope.item.jenislimbah5,
						"perlakuan": {
							"id": 5
						},
						"jumlah": $scope.item.qtyproduk5,
					}

					$scope.item.detailPerlakuan.push(tempItem);
					//debugger;
				} else {

					$scope.item.periz={};
				}
				// else
				// {
				// 	$scope.item.periz.id=$scope.item.periz.id;
				// 	//debugger;
				// }
				
				if ( $scope.item.peri !== undefined)
				{
					var tempItem = {
						"perizinanLimbah": {
							"id": parseInt($scope.item.peri.id)
						},
						"jenisLimbahYangDikelola": $scope.item.jenislimbah6,
						"perlakuan": {
							"id": 6
						},
						"jumlah": $scope.item.qtyproduk6,
					}

					$scope.item.detailPerlakuan.push(tempItem);
					//debugger;
				} else {
					$scope.item.peri={};
				}
				// else
				// {
				// 	$scope.item.peri.id=$scope.item.peri.id;
				// 	//debugger;
				// }
				
				
				
				if ( $scope.item.per !== undefined)
				{
					var tempItem = {
						"perizinanLimbah": {
							"id": parseInt($scope.item.per.id)
						},
						"jenisLimbahYangDikelola": $scope.item.jenislimbah7,
						"perlakuan": {
							"id": 7
						},
						"jumlah": $scope.item.qtyproduk7,
					}

					$scope.item.detailPerlakuan.push(tempItem);
					//debugger;
				} else {

					$scope.item.per={};
				}
				// else
				// {
				// 	$scope.item.per.id=$scope.item.per.id;
				// 	//debugger;
				// }

		// 		var data2 = [{
		// 			"perizinanLimbah": {
		// 				"id": $scope.item.perizinan.id
		// 			},
		// 			"jenisLimbahYangDikelola": $scope.item.jenislimbah,
		// 			"perlakuan": {
		// 				"id": 1
		// 			},
		// 			"jumlah": $scope.item.qtyproduk1,
		// 		},
		// 		{
		// 	"perizinanLimbah": {
		// 		"id": $scope.item.perizina.id
				
		// 	},
		// 	"jenisLimbahYangDikelola": $scope.item.jenislimbah2,
		// 	"perlakuan": {
		// 		"id": 2
		// 	},
		// 	"jumlah": $scope.item.qtyproduk2
		// 	},{
		// 	"perizinanLimbah": {
		// 		"id": $scope.item.perizin.id
		// 	},
		// 	"jenisLimbahYangDikelola": $scope.item.jenislimbah3,
		// 	"perlakuan": {
		// 		"id": 3
		// 	},
		// 	"jumlah": $scope.item.qtyproduk3
		// 	},{
		// 	"perizinanLimbah": {
		// 		"id": $scope.item.perizi.id
		// 	},
		// 	"jenisLimbahYangDikelola": $scope.item.jenislimbah4,
		// 	"perlakuan": {
		// 		"id": 4
		// 	},
		// 	"jumlah": $scope.item.qtyproduk4
		// 	},{
		// 	"perizinanLimbah": {
		// 		"id": $scope.item.periz.id
		// 	},
		// 	"jenisLimbahYangDikelola": $scope.item.jenislimbah5,
		// 	"perlakuan": {
		// 		"id": 5
		// 	},
		// 	"jumlah": $scope.item.qtyproduk5
		// 	},{
		// 	"perizinanLimbah": {
		// 	"id": $scope.item.peri.id
		// 	},
		// 	"jenisLimbahYangDikelola": $scope.item.jenislimbah6,
		// 	"perlakuan": {
		// 		"id": 6
		// 	},
		// 	"jumlah": $scope.item.qtyproduk6
		// 	},{
		// 	"perizinanLimbah": {
		// 		"id": $scope.item.per.id
		// 	},
		// 	"jenisLimbahYangDikelola": $scope.item.jenislimbah7,
		// 	"perlakuan": {
		// 		"id": 7
		// 	},
		// 	"jumlah": $scope.item.qtyproduk7
		// }
			
			
			
			
			
		// 	]
				
				var detail = $scope.sourceOrder1;
				//debugger;
				var i = 0;
				var detailHVA = [];
				detail.forEach(function (data) {
					var data = {
						"jenisLimbahB3Masuk": {
							"id": data.jenisLimbahB3Masuk
						},
						"jumlah": data.total
					}

					detailHVA[i] = data;
					i++;

				})
		
	     
				var data1 = {
			
					
					"detailPerlakuan": $scope.item.detailPerlakuan,
					"periodeAwal": new Date($scope.item.periodeAwal).getTime(),
					"residu":$scope.item.residu,
					"catatan":$scope.item.catatan,
					"periodeAhir": new Date($scope.item.periodeAkhir).getTime(),
					"detailJenisLimbah":detailHVA,
					"kinerjaPengelolaan":$scope.item.kinerjapengelolaan,
					"jumlahYangBelumTerkelola": $scope.item.jumlahbelumkelola   
				}			
	
			
			
	
		
				// console.log(JSON.stringify(data1));
                ManageSarpras.saveDataNeracaLimbah(data1, "neraca-limbah/save-neraca-limbah/").then(function (e) {
					console.log(JSON.stringify(e.data));

					setTimeout(location.reload.bind(location), 5000);
                });
				
				
			};	
			
		}
	]);
});