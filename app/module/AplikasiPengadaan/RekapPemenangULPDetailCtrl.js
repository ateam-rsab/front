define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RekapPemenangULPDetailCtrl', ['$rootScope', '$state', '$scope', 'ModelItem', 'DateHelper', 'PengajuanUsulanAnggaranService', 'ManageSarpras',
		function($rootScope, $state, $scope, ModelItem, DateHelper, PengajuanUsulanAnggaranService, ManageSarpras) {
			// ModelItem.get("PengajuanUsulan/DaftarPengajuanUsulan").then(function(data) {
			// 	$scope.item = data;
			// 	$scope.now = new Date();
			// 	$scope.dataVOloaded = true;

			// 	$scope.item.pengadaan = "LELANG";
			// 	$scope.item.noUsulan = "016000100c";
			// 	$scope.item.tanggal = "2016-9-27";
			// 	$scope.item.total = "121000";
			// 	$scope.item.jumlah = 21;
				

			// }, function errorCallBack(err) {});

			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			$scope.dataSource = new kendo.data.DataSource({
		        data: [],
		        aggregate: [
	               	{ field: "subTotal", aggregate: "sum" }],
	            editable: false,
		    });

		    console.log(JSON.stringify($state.params));

			ManageSarpras.getDetailRekap($state.params.noRec,$state.params.supplierId).then(function(data){
				$scope.item = data.data.supplier;
				$scope.dataDetail = data.data.detailProduk;

				var i = 1;

				$scope.dataDetail.forEach(function(spek){
					spek.no = i;

					$scope.dataSource.add(spek);
					i++;
				});

				init();
			});

			var init = function() {
				$scope.dataSource.fetch();

				var temptotal = $scope.dataSource.aggregates().subTotal.sum;
				$scope.item.nilaiKontrak = kendo.toString(temptotal, "n0");
			}
			$scope.mainGridOptions = {
		        // pageable: true,
		        // selectable: true,
		        columns: [
		          	{
						field: "no",
						title: "<h3 align=center>No</h3>",
						width: 50
					},
					{
						field: "namaProduk",
						title: "<h3 align=center>Nama Produk</h3>",
						width: 300
					},
					{
						field: "harga",
						title: "<h3 align=center>Harga Supplier</h3>",
						format: "{0:n0}",
						attributes: {
							style: "text-align:right"
						}
					},
					{
						field: "volume",
						title: "<h3 align=center>Volume</h3>",
						format: "{0:n0}",
						attributes: {
							style: "text-align:right"
						}
					},
					{
						field: "subTotal",
						title: "<h3 align=center>Total</h3>",
						format: "{0:n0}",
						attributes: {
							style: "text-align:right"
						},
						"aggregates": "[\"sum\"]",
	                	"footerTemplate": "Jumlah: <div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
					}
				]
	      	};

			// $scope.kl = function(current){
			// 	$scope.current = current;
			// 	console.log(current);

			// };

			// $scope.simpan = function() {
			// 	var tmp = {
			// 		 "hargaPenawaranSupplier": $scope.current.hargaSatuanTerkecil,
			// 	     "supplierId": $scope.current.supplierId,
			// 	     "noRecDetailKartuPengendali": $scope.current.noRecKartuPengendaliDetail,
			// 	     "noRecPenawaranHargaSupplier": $scope.current.noRecPenawaranHargaSupplier
			// 	}

			// 	PengajuanUsulanAnggaranService.savePengajuan(tmp,"kartu-pengendali/rekap-pemenang-from-ulp").then(function(e){	
			// 		console.log(JSON.stringify(tmp));
			// 	});

			// };

			$scope.batal = function() {
			  	window.history.back();
			};
		}
	]);
});