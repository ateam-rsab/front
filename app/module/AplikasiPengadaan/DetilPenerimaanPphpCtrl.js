define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetilPenerimaanPphpCtrl', ['$rootScope', '$scope', '$state', 'FindProduk', 'DateHelper', 'ModelItem', 'PengajuanUsulanAnggaranService',
		function($rootScope, $scope, $state, findProduk, DateHelper, ModelItem, PengajuanUsulanAnggaranService) {
			
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			$scope.dataSource = new kendo.data.DataSource({
				data: [],
			    aggregate: [
	                { field: "hasilKonversi", aggregate: "sum" },
	                { field: "subTotal", aggregate: "sum" }
	            ]
			})
			
			PengajuanUsulanAnggaranService.getDetilPphp($state.params.noRec).then(function(data){
				$scope.item = data.data.headSppb;
				$scope.item.tanggal = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggal));

				// console.log(JSON.stringify($scope.item));

				$scope.itemDetil = data.data.detailSppb;
				var i = 1;
				$scope.itemDetil.forEach(function(dats){
					dats.no = i;
					dats.qtyAwal = dats.volumeDiminta;
					dats.subTotal = (dats.hargaSatuan * dats.hasilKonversi);
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
							format: "{0:n0}",
							attributes: {
								style: "text-align:right"
							}
						},
						{
							field: "volumeDiminta",
							title: "Maksimal",
							width: 100,
							format: "{0:n0}",
							attributes: {
								style: "text-align:right"
							}
						},
						{
							field: "hasilKonversi",
							title: "Terima",
							width: 100,
							format: "{0:n0}",
							attributes: {
								style: "text-align:right"
							},
							aggregates: "[\"sum\"]",
	                    	footerTemplate: "<div class=\"pull-right\">Qty: #=kendo.toString(sum, \"n0\")#</div>"
						}]
					},
					{ 
						field: "satuanStandar",
						title: "Satuan Terima",
						width: 180
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
						template: "<div class=\"pull-right\">#=kendo.toString(ppn, \"n0\")#</div>",
                    	footerTemplate: "<div class=\"pull-right\">Sub total:</div>"
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
						field: "kondisiBarang",
						title: "Kondisi",
						width: 180
					}
				]
	      	}

			$scope.batal = function() {
			  	window.history.back();
			}
		}
	]);
});