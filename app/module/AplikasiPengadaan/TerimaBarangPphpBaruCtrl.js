define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TerimaBarangPphpBaruCtrl', ['$rootScope', '$scope', '$state', 'FindProduk', 'DateHelper', 'ModelItem', 'PengajuanUsulanAnggaranService',
		function($rootScope, $scope, $state, findProduk, DateHelper, ModelItem, PengajuanUsulanAnggaranService) {
			
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			PengajuanUsulanAnggaranService.getGetData("KondisiBarang&select=id,name").then(function(e){
				$scope.listKondisiTerima = e.data;
				debugger;	
			})

			$scope.dataSource = new kendo.data.DataSource({
				data: [],
			    aggregate: [
	                { field: "volumeDiminta", aggregate: "sum" },
	                { field: "subTotal", aggregate: "sum" }
	            ],
	            editable: true,
				schema: {
					model: {
						fields: {
							noRec: { editable: false},
							namaPengendali: { type: "string", editable: false},
							namaProduk: { type: "string", editable: false},
							asalProduk: { type: "string", editable: false},
		            		volumeKontrak: { type: "number"},
		            		volumeDiminta: { type: "number"},
		            		volumeMinta: { type: "number"},
		            		hargaSatuan: { type: "number"},
		            		listSatuan: { type: "object", editable: true},
		            		satuanTerima: { type: "object", editable: true},
		            		diskon: { type: "number"},
		            		ppn: { type: "number"},
		            		subTotal: {type: "number", editable: false}
		            	}
		            }
		        },
		        change: function (e) {
	                console.log("change: " + e.action);
	                if (e.field && e.action === "itemchange") {
	                	console.log(e.items[0]);
	                	var disc = e.items[0].diskon / 100;
	                	var ppn = e.items[0].ppn / 100;

						var tempTotal = e.items[0].volumeMinta * e.items[0].hargaSatuan;
						var totalPPn = tempTotal * ppn;

						var totalDisc = (tempTotal + totalPPn) * disc;
						e.items[0].subTotal = (tempTotal + totalPPn) - totalDisc;
						init();
	                }
	            }
			});
			
			PengajuanUsulanAnggaranService.getDetilPphp($state.params.noRec).then(function(data){
				$scope.item = data.data.headSppb;
				$scope.item.tanggal = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggal));

				// console.log(JSON.stringify($scope.item));

				$scope.itemDetil = data.data.detailSppb;
				var i = 1;
				$scope.itemDetil.forEach(function(dats){
					dats.no = i;
					dats.qtyAwal = dats.volumeDiminta;
					dats.subTotal = (dats.hargaSatuan * dats.volumeDiminta);
					$scope.dataSource.add(dats);
					i++;
				})
				var temptotal = $scope.dataSource.aggregates().subTotal.sum;
				var num = temptotal.toFixed(2);
				var cents = (num - Math.floor(num)).toFixed(2);
				$scope.item.total = Math.floor(num).toLocaleString() + '.' + cents.split('.')[1];
			})

			var selectedValue = null;
			
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
				debugger;
			}

			init();

			$scope.mainGridOptions = {
		        columns: [
		          	{
		          		field: "noRec",
		          		hidden: true
		          	},
					{
		          		field: "idProduk",
		          		hidden: true
		          	},
		          	{
		          		field: "idSatuan",
		          		hidden: true
		          	},
		          	{
		          		field: "qtyAwal",
		          		hidden: true
		          	},
		          	{
						field: "no",
						title: "No",
						width: 40,
						type: "number"
					},
					{
						field: "namaProduk",
						title: "Nama Produk",
						width: 250
					},
					{
						field: "asalProduk",
						title: "Asal Produk",
						width: 200
					},
					{
						field: "namaPengendali",
						title: "Nama Pengendali",
						width: 150
					},
					{
						title: "Volume",
						columns: [{
							field: "volumeKontrak",
							title: "Kontrak",
							width: 100,
							template: "<div class=\"pull-right\">#=kendo.toString(volumeKontrak, \"n0\")#</div>"
						},
						{
							field: "volumeDiminta",
							title: "Maksimal",
							width: 100,
							aggregates: "[\"sum\"]",
	                    	footerTemplate: "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
						},
						{
							field: "volumeMinta",
							title: "Diterima",
							width: 100
						}]
					},
					{ 
						field: "satuanTerima",
						title: "Satuan Terima",
						width: 180,
						"template": "<input kendo-combo-box k-ng-model=\"dataItem.satuanTerima\" k-data-text-field=\"'satuanStandar'\" k-data-value-field=\"'id'\" k-data-source=\"dataItem.listSatuan\"  k-on-change=\"handleChange(data, columns, dataItem)\" style=\"width: 100%\" ></input>"
						// editor: function listSatuanDropDown(container, options) {
      //                   if (options.model.listSatuan.length <= 1)
      //                       return;
      //                       $('<input data-text-field="satuanStandar" data-value-field="id" k-on-change="handleChange(data, dataItem, columns)" data-bind="value:' + options.field + '"/>')
      //                           .appendTo(container)
      //                           .kendoDropDownList({
      //                               dataSource: options.model.listSatuan,
      //                               dataTextField: "satuanStandar",
      //                               dataValueField: "id",
      //                                 change: function(e) {
      //                                   debugger;
      //                                   selectedValue = e.sender.value();
      //                                 }
      //                               // select: onSelect
      //                           });            
      //               	} 
                    },
					// {
					// 	// field: "idSatuan",
					// 	title: "Satuan",
					// 	"template": "<input kendo-combo-box k-ng-model=\"dataItem.satuan\" k-data-text-field=\"'satuanStandar'\" k-data-value-field=\"'id'\" k-data-source=\"dataItem.listSatuan\"  k-on-change=\"update(data, columns, dataItem)\" style=\"width: 100%\" ></input>"
					// },
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
						template: "<div class=\"pull-right\">#=kendo.toString(diskon, \"n0\")#</div>",
						hidden: true
					},
					{
						field: "ppn",
						title: "PPn(%)",
						width: 100,
						template: "<div class=\"pull-right\">#=kendo.toString(ppn, \"n0\")#</div>",
						hidden: true
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
						field: "KondisiBarang",
						title: "Kondisi",
						width: 180,
						"template": "<input kendo-combo-box k-ng-model=\"dataItem.Kondisi\" k-data-text-field=\"'name'\" k-data-value-field=\"'id'\" k-data-source=\"listKondisiTerima\"  k-on-change=\"handleChange(data, columns, dataItem)\" style=\"width: 100%\" ></input>"
					}
				]
	      	};

			$scope.kl = function(current){
				$scope.current = current;
				console.log(current);
			}
			$scope.handleChange = function(data, columns, dataItem) {
		      	$scope.data = data;
		      	$scope.columns = columns;
		      	$scope.dataItem = dataItem;
		      	
		      	findProduk.getKonversi(dataItem.idSatuan, dataItem.satuanTerima.id, dataItem.qtyAwal).then(function(e) {
                    dataItem.volumeDiminta = e.data.value;
                    console.log(dataItem.volumeDiminta);
		      		$scope.dataSource.fetch();
		      		debugger;
                });
		      	// dataItem.volumeDiminta = dataItem.qtyAwal * dataItem.satuanTerima.qtyKemasan;

		    };
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
				$scope.arrDetilPenerimaan = [];
				$scope.dataSource._data.forEach(function(tempData){
					if (tempData.volumeDiminta >= tempData.volumeMinta && tempData.Kondisi !== undefined && tempData.satuanTerima !== undefined) {
						var dat = {
							"produk" : {
								"id" : tempData.idProduk
							},
							"asalProduk" : {
								"id" : tempData.idAsalProduk
							},
							"qtyproduk": tempData.qtyAwal,
							"discount" : tempData.diskon,
							"ppn" : tempData.ppn,
							"harga" : tempData.hargaSatuan,
							"strukPelayananDetail" : {
								"noRec" : tempData.noRec
							},
							"kartuPengendaliDetail" : {
								"noRec" : tempData.noRecKartuPengendaliDetail
							},
							"volumeMinta" : tempData.volumeMinta,
							"satuanTerima" : {
								"id" : tempData.satuanTerima.id
							},
							"kondisiBarang" : {
								"id" : tempData.Kondisi.id
							}
						}

						$scope.arrDetilPenerimaan.push(dat);
						debugger;

					}
				})
				// console.log(JSON.stringify($scope.arrDetilPenerimaan));
				if ($scope.arrDetilPenerimaan.length === $scope.dataSource._data.length) {
					debugger;
					var tempPostData = {
						"tanggal" : $scope.item.tanggal,
						"penerimaanBarangDetail" : $scope.arrDetilPenerimaan,
						"supplier" : {
							"id" : $scope.item.supplierId
						}
					}
					PengajuanUsulanAnggaranService.savePengajuan(tempPostData, "pphp/save-pphp/").then(function(e){
						console.log(JSON.stringify(e.data));
					});
				} else {
					$scope.messages = "Data Belum Lengkap";
                    $scope.showPopup();
				}
			};

			$scope.batal = function() {
			  	window.history.back();
			};

			$scope.cariSatuan = function(e) {
				return ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + idProduk, true).then(function(e){
					$scope.listSatuan = e.data;
					console.log("sampah" + e.data);
				}) ;
			}
		}
	]);
});