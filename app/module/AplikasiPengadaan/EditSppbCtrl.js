define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('EditSppbCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'PengajuanUsulanAnggaranService',
		function($rootScope, $scope, $state, DateHelper, ModelItem, PengajuanUsulanAnggaranService) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			$scope.dataSource = new kendo.data.DataSource({
				data: [],
			    aggregate: [
	                { field: "subTotal", aggregate: "sum" }
	            ],
	            editable: true,
				schema: {
					model: {
						fields: {
							namaProduk: { editable: false},
							spesifikasi: { type: "string"},
							keterangan: { type: "string"},
		            		satuanStandar: { editable: false},
		            		qtyKontrak: { type: "number", editable: false},
		            		qtySppb: { type: "number"},
		            		hargaSatuan: { type: "number"},
		            		diskon: { type: "number"},
		            		ppn: { type: "number"},
		            		subTotal: {type: "number", editable: false}
		            	}
		            }
		        },
		        change: function (e) {
	                console.log("change: " + e.action);
	                if (e.field && e.action === "itemchange") {
	                	var disc = $scope.current.diskon / 100;
	                	var ppn = $scope.current.ppn / 100;

						var tempTotal = $scope.current.qtySppb * $scope.current.hargaSatuan;
						var totalPPn = tempTotal * ppn;

						var totalDisc = (tempTotal + totalPPn) * disc;
						$scope.current.subTotal = (tempTotal + totalPPn) - totalDisc;
						init();
	                }
	            }
			});
			
			PengajuanUsulanAnggaranService.getDetilSppb($state.params.noRec).then(function(data){
				$scope.item = data.data.sppb;
				$scope.item.tanggalKartuKendali = new Date($scope.item.tanggalKartuKendali);
				$scope.item.tanggalSppb = new Date($scope.item.tanggalSppb);
				$scope.itemDetil = data.data.detailSppb;
				var i = 1;
				$scope.itemDetil.forEach(function(dats){
					dats.no = i;

					dats.subTotal = (dats.hargaSatuan * dats.qtySppb);

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
				$scope.item.subtotal = temptotal;

				var tempPpn = (10 / 100) * temptotal;
				$scope.item.totalPpn = tempPpn;

				var temptotalAkhir = temptotal + tempPpn;
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
						field: "noRec",
						hidden: true
					},
					{
						field: "namaProduk",
						title: "Nama Produk",
						width: 250
					},
					{
						field: "spesifikasi",
						title: "Spesifikasi",
						width: 200
					},
					{
						field: "satuanStandar",
						title: "Satuan",
						width: 60
					},
					{
						title: "Volume",
						columns: [{
							field: "qtyKontrak",
							title: "Kontrak",
							template: "<div class=\"pull-right\">#=kendo.toString(qtyKontrak, \"n0\")#</div>",
							width: 60
						},
						{
							field: "qtySppb",
							title: "SPPB",
							template: "<div class=\"pull-right\">#=kendo.toString(qtySppb, \"n0\")#</div>",
							width: 60
						}]
					},
					{
						field: "hargaSatuan",
						title: "Harga Satuan",
						width: 100,
						template: "<div class=\"pull-right\">#=kendo.toString(hargaSatuan, \"n0\")#</div>"
					},
					{
						field: "diskon",
						title: "Disc(%)",
						width: 100,
						template: "<div class=\"pull-right\">#=kendo.toString(diskon, \"n0\")#</div>"
					},
					{
						field: "ppn",
						title: "PPn(%)",
						width: 100,
						template: "<div class=\"pull-right\">#=kendo.toString(ppn, \"n0\")#</div>"
					},
					{
						field: "subTotal",
						title: "Sub Total",
						width: 100,
						template: "<div class=\"pull-right\">#=kendo.toString(subTotal, \"n0\")#</div>",
						aggregates: "[\"sum\"]",
                    	footerTemplate: "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
					},
					{
						field: "keterangan",
						title: "Keterangan",
						width: 200
					}
				]
	      	};

			$scope.kl = function(current){
				$scope.current = current;
				console.log(current);
			}
		  	$scope.handleChange = function(data, dataItem, columns) {
		      	$scope.data = data;
		      	$scope.columns = columns;
		      	$scope.dataItem = dataItem;
		    };
		    $scope.$watch('item.disc', function(e) {
		    	if (!$scope.item.disc) return;
		    	$scope.tempDisc = $scope.item.total * ($scope.item.disc / 100);
		    	// console.log($scope.tempDisc);

		    	$scope.item.total = $scope.item.total - $scope.tempDisc;
		    });

		    $scope.notf1Options = {
	            position: {
	                pinned: true,
	            	top: 30,
	                right: 30
	            },
	            autoHideAfter: 3000,
	            stacking: "down",
	            templates: [{
	                type: "ngTemplate",
	                template: $("#notificationTemplate").html()
	            }]
	        };

	        $scope.showPopup = function () {
	            $scope.notf1.show({
	                title: "Informasi",
	                message: $scope.messages
	            }, "ngTemplate");
	        }

			$scope.Save = function(){

				$scope.ArrPenerimaanBarang = [];

				$scope.dataSource._data.forEach(function(data){

					if (data.qtySppb > data.qtyKontrak) {
		    			$scope.messages = "Jumlah volume diminta tidak valid, <br/>Jumlah Volume Maksimal "+data.qtyKontrak;
		    			$scope.showPopup();

					} else {
						var tempData = {
							"noRec": data.noRec,
							"volumeMinta": data.qtySppb,
							"discount": data.diskon,
							"ppn": data.ppn,
							"harga": data.hargaSatuan
						}

						$scope.ArrPenerimaanBarang.push(tempData);
						console.log(JSON.stringify($scope.ArrPenerimaanBarang));

						}
				})

				if ($scope.ArrPenerimaanBarang.length > 0) {
					debugger;

					var tempData = {
						"noRec": $state.params.noRec,
						"penerimaanBarangDetail": $scope.ArrPenerimaanBarang
					}
					
					PengajuanUsulanAnggaranService.savePengajuan(tempData, "sppb/update-sppb/").then(function(e){
						console.log(JSON.stringify(tempData));
					});
				}
			};

			$scope.batal = function() {
			  	window.history.back();
			};
		}
	]);
});