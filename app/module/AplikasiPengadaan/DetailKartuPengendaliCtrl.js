define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailKartuPengendaliCtrl', ['$sce', '$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'dataRupService', 'ManageSarpras',
		function($sce, $rootScope, $scope, $state, DateHelper, ModelItem, dataRupService, ManageSarpras) {

			$scope.item = {};
			$scope.items = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			$scope.showBilling = false;
			$scope.urlBilling = $sce.trustAsResourceUrl(dataRupService.lapKartuPengendali($state.params.noRec));
			
			$scope.dataSpek = new kendo.data.DataSource({
				data: [],
				aggregate: [
	               	{ field: "total", aggregate: "sum" }],
	            editable: false,
                pageSize: 100,
			});

			ManageSarpras.getDetailKartu($state.params.noRec).then(function(data){
				$scope.items = data.data.kartuPengendaliHeader;

				$scope.items.tanggal = DateHelper.getTanggalFormatted(new Date($scope.items.tanggal));

				$scope.dataDetail = data.data.kartuPengendaliDetail;

				var i = 1;

				$scope.dataDetail.forEach(function(spek){
					spek.no = i;
					spek.tanggal = DateHelper.getTanggalFormatted(new Date(spek.tanggal));
					spek.noRec = {
						"noRec": spek.noRec,
						"kdProfile": spek.kdProfile
					}

					$scope.dataSpek.add(spek);
					i++;
				});

				init();
			});

			var init = function(){
				$scope.dataSpek.fetch();

				var temptotal = $scope.dataSpek.aggregates().total.sum;
				$scope.items.subtotal = kendo.toString(temptotal, "n0");

				var tempPpn = (10 / 100) * temptotal;
				$scope.items.totalPpn = kendo.toString(tempPpn, "n0");

				var temptotalAkhir = temptotal + tempPpn;
				$scope.items.total = kendo.toString(temptotalAkhir, "n0");

				var pembulatan = Math.round(temptotalAkhir);
				$scope.items.pembulatan = kendo.toString(pembulatan, "n0");

			};

			$scope.columnKartuPengendali = [
				{
					"field": "no",
					"title": "No",
					width: "50px",
					attributes: {
						style: "text-align: center"
					},
				},
				{
					"field": "tanggal",
					"title": "Tanggal Kebutuhan",
					"width": "120px",
					
				},
				{
					"field": "namaProduk",
					"title": "Nama Produk/Spesifikasi",
					"width": "250px"
				},
				{
					"field": "volume",
					"title": "Qty",
					width: "70px",
					template: "<div class=\"pull-right\">#=kendo.toString(volume, \"n0\")#</div>"
				},
				{
					"field": "hargaSatuan",
					"title": "Harga Satuan",
					width: "120px",
					template: "<div class=\"pull-right\">#=kendo.toString(hargaSatuan, \"n0\")#</div>"
				}, {
                    "field": "total",
                    "title": "Total",
                    width: "150px",
                    "format": "{0:n0}",
					attributes: {
						style: "text-align: right"
					},
	               	"aggregates": "[\"sum\"]",
	                "footerTemplate": "Jumlah: <div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"

                }
			];

			$scope.kl = function(current){
				$scope.current = current;
				console.log(current);
			}
			$scope.cetak = function() {
			  	$scope.showBilling = true;
			  	$scope.showBtnCetak = false;
			}
			$scope.batal = function() {
			  	window.history.back();
			}
			$scope.kembali = function() {
				$scope.showBilling = false;
			}

		}
	]);
});		