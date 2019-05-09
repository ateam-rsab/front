define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('BuatSppbCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'PengajuanUsulanAnggaranService',
		function($rootScope, $scope, $state, DateHelper, ModelItem, PengajuanUsulanAnggaranService) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			$scope.dataSource = new kendo.data.DataSource({
				data: [],
			    aggregate: [
	                { field: "volumeMinta", aggregate: "sum" },
	                { field: "subTotal", aggregate: "sum" }
	            ],
	            editable: true,
				schema: {
					model: {
						fields: {
							spesifikasi: { editable: false},
							namaProduk: { editable: false},
							spekBarang: { type: "string"},
		            		satuanStandar: { editable: false},
		            		volumeBarang: { type: "number", editable: false},
		            		totalDiterima: { type: "number", editable: false},
		            		sisaPenerimaan: { type: "number", editable: false},
		            		volumeMinta: { type: "number"},
		            		hargaSupplier: { type: "number", editable: false},
		            		disc: { type: "number"},
		            		ppn: { type: "number"},
		            		subTotal: {type: "number", editable: false}
		            	}
		            }
		        },
		        change: function (e) {
	                console.log("change: " + e.action);
	                if (e.field && e.action === "itemchange") {
	                	var disc = $scope.current.disc / 100;
	                	var ppn = $scope.current.ppn / 100;

						var tempTotal = $scope.current.volumeMinta * $scope.current.hargaSupplier;
						var totalPPn = tempTotal * ppn;

						var totalDisc = (tempTotal + totalPPn) * disc;
						$scope.current.subTotal = (tempTotal + totalPPn) - totalDisc;
						init();
	                }
	                // debugger;
	            }
			});
			
			PengajuanUsulanAnggaranService.getDataSpek($state.params.noRec).then(function(data){
				$scope.item = data.data.headKontrak;

				$scope.itemDetil = data.data.detailKontrak;
				var i = 1;
				$scope.itemDetil.forEach(function(dats){
					debugger;
					dats.no = i;
					dats.disc = 0;
					dats.ppn = 10;
					dats.volumeMinta = 0;
					// // dats.volumeMinta = dats.volumeBarang;

					dats.subTotal = (dats.hargaSupplier * dats.volumeBarang);

					$scope.dataSource.add(dats);
					i++;
				})

				var date = $scope.item.tanggal;
				$scope.item.tanggal = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggal));

				init();
			})
			
			var init = function(){
				$scope.dataSource.fetch();

			   	var temptotal = $scope.dataSource.aggregates().subTotal.sum;
				// $scope.item.subtotal = kendo.toString(temptotal, "n0");
				$scope.item.subtotal = temptotal;

				var tempPpn = (10 / 100) * temptotal;
				// $scope.item.totalPpn = kendo.toString(tempPpn, "n0");
				$scope.item.totalPpn = tempPpn;

				var temptotalAkhir = temptotal + tempPpn;
				// $scope.item.total = kendo.toString(temptotalAkhir, "n0");
				// $scope.item.total = temptotalAkhir;
				var num = temptotal.toFixed(2)
			    var cents = (num - Math.floor(num)).toFixed(2);
				$scope.item.total = Math.floor(num).toLocaleString() + '.' + cents.split('.')[1];

			}

			$scope.mainGridOptions = {
		        columns: [
		          	{
						field: "no",
						title: "No",
						width: 40,
						type: "number"
					},
					{
						field: "namaProduk",
						title: "Nama Produk",
						width: 350
					},
					{
						field: "spesifikasi",
						title: "Spesifikasi",
						width: 300
					},
					{
						field: "satuanStandar",
						title: "Satuan",
						width: 60
					},
					{
						title: "Volume",
						columns: [{
							field: "volumeBarang",
							title: "Kontrak",
							template: "<div class=\"pull-right\">#=kendo.toString(volumeBarang, \"n0\")#</div>",
							width: 80
						},
						{
							field: "sisaPenerimaan",
							title: "Maksimal",
							template: "<div class=\"pull-right\">#=kendo.toString(sisaPenerimaan, \"n0\")#</div>",
							width: 80
						},
						{
							field: "volumeMinta",
							title: "Diminta",
							// template: "<div class=\"pull-right\">#=kendo.toString(volumeMinta, \"n0\")#</div>",
							aggregates: "[\"sum\"]",
							attributes: {
								style: "text-align:right"
							},
							format: "{0:n0}",
	                    	footerTemplate: "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>",
							width: 80
						}]
					},
					{
						field: "hargaSupplier",
						title: "Harga",
						width: 100,
						template: "<div class=\"pull-right\">#=kendo.toString(hargaSupplier, \"n0\")#</div>"
					},
					{
						field: "disc",
						title: "Disc(%)",
						width: 60,
						template: "<div class=\"pull-right\">#=kendo.toString(disc, \"n0\")#</div>"
					},
					{
						field: "ppn",
						title: "PPn(%)",
						width: 60,
						template: "<div class=\"pull-right\">#=kendo.toString(ppn, \"n0\")#</div>"
					},
					{
						field: "subTotal",
						title: "Sub Total",
						width: 100,
						template: "<div class=\"pull-right\">#=kendo.toString(subTotal, \"n0\")#</div>",
						aggregates: "[\"sum\"]",
                    	footerTemplate: "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
					}
				]//,
		    	// /editable: true
	      	};

	   //    	var init = function() {
				// $scope.item = {};
				// $scope.now = new Date();
				// $scope.dataVOloaded = true;

				// $scope.dataSource = new kendo.data.DataSource({
			 //        data: [],
		  //           schema: {
		  //           	model: {
		  //           		fields: {
		  //           			spesifikasi: { editable: false},
		  //           			namaProduk: { editable: false},
		  //           			spekBarang: { type: "string"},
		  //           			satuanStandar: { editable: false},
		  //           			volumeBarang: { type: "number", editable: false},
		  //           			volumeMinta: { type: "number"},
		  //           			hargaSupplier: { type: "number", editable: false},
		  //           			disc: { type: "number"},
		  //           			ppn: { type: "number"},
		  //           			subTotal: {type: "number", editable: false}
		  //           		}
		  //           	}
		  //           },
		  //           change: function (e) {
	   //                  console.log("change: " + e.action);
	   //                  if (e.field && e.action === "itemchange") {
	   //                  	debugger;
				// 			$scope.current.subTotal = $scope.current.volumeMinta * $scope.current.hargaSupplier;
							
				// 			// init();
				// 			// console.log(JSON.stringify($scope.dataSpek));
				// 			// debugger;
	   //                  }
	   //                  // debugger;
	   //              },
			 //        aggregate: [
	   //                  { field: "subTotal", aggregate: "sum" },
	   //                  { field: "volumeMinta", aggregate: "sum" }
	   //              ],
	   //              editable: true
			 //    });
				// PengajuanUsulanAnggaranService.getDataSpek($state.params.noRec).then(function(data){
				// 	$scope.item = data.data.headKontrak;

				// 	$scope.itemDetil = data.data.detailKontrak;
				// 	var i = 1;
				// 	$scope.itemDetil.forEach(function(dats){
				// 		dats.no = i;
				// 		dats.disc = 0;
				// 		dats.ppn = 0;
				// 		dats.volumeMinta = dats.volumeBarang;

				// 		dats.subTotal = (dats.hargaSupplier * dats.volumeBarang);

				// 		$scope.dataSource.add(dats);
				// 		i++;
				// 	})

				// 	var date = $scope.item.tanggal;
				// 	$scope.item.tanggal = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggal));
				// 	$scope.dataSource.fetch();

				//    	var temptotal = $scope.dataSource.aggregates().subTotal.sum;
				// 	// $scope.item.subtotal = kendo.toString(temptotal, "n0");
				// 	$scope.item.subtotal = temptotal;

				// 	var tempPpn = (10 / 100) * temptotal;
				// 	// $scope.item.totalPpn = kendo.toString(tempPpn, "n0");
				// 	$scope.item.totalPpn = tempPpn;

				// 	var temptotalAkhir = temptotal + tempPpn;
				// 	// $scope.item.total = kendo.toString(temptotalAkhir, "n0");
				// 	$scope.item.total = temptotalAkhir;
				// })

		  //   }

		  //   init();

			$scope.kl = function(current){
				$scope.current = current;
				console.log(current);
			}
		  	$scope.handleChange = function(data, dataItem, columns) {
		      	$scope.data = data;
		      	$scope.columns = columns;
		      	$scope.dataItem = dataItem;

		      	// console.log(data);
		      	// debugger;
		    };
		    $scope.$watch('item.disc', function(e) {
		    	if (!$scope.item.disc) return;
		    	$scope.tempDisc = $scope.item.total * ($scope.item.disc / 100);
		    	// console.log($scope.tempDisc);

		    	$scope.item.total = $scope.item.total - $scope.tempDisc;
		    	// console.log($scope.item.total);
		    });
		    // template notification popup
		    // $scope.notf1Options = {
	     //        position: {
	     //            pinned: true,
	     //        	top: 30,
	     //            right: 30
	     //        },
	     //        autoHideAfter: 3000,
	     //        stacking: "down",
	     //        templates: [{
	     //            type: "ngTemplate",
	     //            template: $("#notificationTemplate").html()
	     //        }]
	     //    };

	     //    $scope.showPopup = function () {
	     //        $scope.notf1.show({
	     //            title: "Informasi",
	     //            message: $scope.messages
	     //        }, "ngTemplate");
	     //    }

			$scope.Save = function(){

				$scope.ArrPenerimaanBarang = [];

				$scope.dataSource._data.forEach(function(data){

					if (data.volumeMinta !== 0 && data.volumeMinta !== undefined && data.volumeMinta <= data.sisaPenerimaan) {
						
						var tempData = {
							"produk":{  
						        "id":data.idProduk
						    },
						    "asalProduk":{  
						        "id":data.idAsalProduk
						    },
						    "qtyproduk":data.volumeBarang,
						    "discount":data.disc,
						    "ppn":data.ppn,
						    "harga":data.hargaSupplier,
						    "kartuPengendaliDetail":{
						    	"noRec":data.noRec	
						    },
						    "satuan":{  
						        "id":data.idSatuan
						    },
						    "volumeMinta":data.volumeMinta,
						    "satuanTerima":{  
						       "id":data.satuanTerima
						    }
						}

						$scope.ArrPenerimaanBarang.push(tempData);
						console.log(JSON.stringify($scope.ArrPenerimaanBarang));

					} else {
						// $scope.messages = "Jumlah volume diminta tidak valid, <br/>Jumlah Volume Maksimal "+data.sisaPenerimaan;
		    			// $scope.showPopup();
						// window.messageContainer.error("Data volume di minta tidak valid");
					}
				})

				if ($scope.ArrPenerimaanBarang.length === $scope.dataSource._data.length) {

					var tempData = {
						"noRecKontrak": $state.params.noRec,
						"tanggal": DateHelper.getPeriodeFormatted(new Date($scope.item.tanggal)),
						"supplier": {
							"id": $scope.item.supplierId
						},
						"penerimaanBarangDetail": $scope.ArrPenerimaanBarang
					}
					PengajuanUsulanAnggaranService.savePengajuan(tempData, "sppb/save-sppb/").then(function(e){
						$scope.isNext = true;
						// console.log(JSON.stringify(tempData));
					});
				} else {
					window.messageContainer.error("Data tidak valid");
				}
			};
			$scope.Back = function() {
			  	window.history.back();
			};
		}
	]);
});