define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TerimaBarangPphpCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'PengajuanUsulanAnggaranService',
		function($rootScope, $scope, $state, DateHelper, ModelItem, PengajuanUsulanAnggaranService) {
			// ModelItem.get("PengajuanUsulan/DaftarPengajuanUsulan").then(function(data) {
			// 	$scope.item = data;
			// 	$scope.now = new Date();
			// 	$scope.dataVOloaded = true;
				

			// }, function errorCallBack(err) {});

			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			$scope.dataSource = new kendo.data.DataSource({
		        data: [],
		        aggregate: [
                    { field: "subTotal", aggregate: "sum" }
                ]
		    });

			$scope.mainGridOptions = {
		        dataSource: $scope.dataSource,
		        pageable: true,
		        editable: true,
		        columns: [
		          	{
						field: "no",
						title: "No",
						width: 40,
						type: "number"
					},
					{
						field: "kegiatan",
						title: "Kegiatan",
						width: 100,
						type: "datetime"
					},
					{
						field: "namaBarang",
						title: "Nama Barang",
						width: 100,
						type: "datetime"
					},
					{
						field: "spekBarang",
						title: "Spesifikasi",
						width: 100,
						type: "string"
					},
					{
						title: "Jumlah Terima",
						columns: [{
							field: "qtyTerima",
							title: "Qty",
							width: 50,
							type: "numberic",
							template: "<div class=\"pull-right\">#=kendo.toString(qtyTerima, \"n0\")#</div>"
						},
						{
							field: "satuanTerima",
							title: "Satuan",
							width: 50,
							type: "numberic",
							template: "<div class=\"pull-right\">#=kendo.toString(satuanTerima, \"n0\")#</div>"
						}]
					},
					{
						field: "hargaKemasan",
						title: "Kemasan",
						width: 80,
						type: "numberic",
						template: "<div class=\"pull-right\">#=kendo.toString(hargaKemasan, \"n0\")#</div>"
					},
					{
						field: "hargaSatuan",
						title: "Harga<br/>Satuan",
						width: 80,
						type: "numberic",
						template: "<div class=\"pull-right\">#=kendo.toString(hargaSatuan, \"n0\")#</div>"
					},
					{
						field: "disc",
						title: "Disc",
						width: 60,
						type: "numberic",
						template: "<div class=\"pull-right\">#=kendo.toString(disc, \"p0\")#</div>"
					},
					{
						field: "ppn",
						title: "PPn",
						width: 60,
						type: "numberic",
						template: "<div class=\"pull-right\">#=kendo.toString(ppn, \"p0\")#</div>"
					},
					{
						field: "subTotal",
						title: "Harga</br/>Total",
						width: 90,
						type: "numberic",
						template: "<div class=\"pull-right\">#=kendo.toString(subTotal, \"n0\")#</div>",
						aggregates: "[\"sum\"]",
                    	footerTemplate: "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
					},
					{
						field: "kondisiBarang",
						title: "Kondisi Barang",
						width: 100,
						type: "string"
					}
				]//,
		    	// /editable: true
	      	};
			
			PengajuanUsulanAnggaranService.getDetilPphp($state.params.noRec).then(function(data){
				$scope.item = data.data.headSppb;

				$scope.itemDetil = data.data.detailSppb;
				var i = 1;
				$scope.itemDetil.forEach(function(dats){
					dats.no = i;

					dats.subTotal = (dats.hargaSupplier * dats.volumeBarang);

					$scope.dataSource.add(dats);
					i++;
				})

				var date = $scope.item.tanggal;
				$scope.item.tanggal = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggal));

				init();
			})
		}
	]);
});