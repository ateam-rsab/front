define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('EvaluasiHargaULPCtrl', ['$rootScope', '$state', '$scope', 'ModelItem', 'DateHelper', 'PengajuanUsulanAnggaranService', 'ManageSarpras',
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
		        data: []
		    });

			ManageSarpras.getDetailPenawaran($state.params.noRec).then(function(data){
				$scope.item = data.data.kartuPengendaliDetail;

				$scope.item.hargaHPS = 5000;

				$scope.dataDetail = data.data.penerimaanDetail;

				var i = 1;

				$scope.dataDetail.forEach(function(spek){
					spek.no = i;
					spek.tanggal = DateHelper.getPeriodeFormatted(new Date(spek.tanggal));
					spek.noRec = {
						"noRec": spek.noRec,
						"kdProfile": spek.kdProfile
					}

					$scope.dataSource.add(spek);
					i++;
				});
			});

			$scope.mainGridOptions = {
		        pageable: true,
		        selectable: true,
		        columns: [
		          	{
						field: "no",
						title: "<h3 align=center>No</h3>",
						width: 50
					},
					{
						field: "tanggal",
						title: "<h3 align=center>Tanggal</h3>",
						width: 150
					},
					{
						field: "supplierId",
						title: "supplierId",
						hidden: true
					},
					{
						field: "namaSupplier",
						title: "<h3 align=center>Nama Supplier</h3>",
						width: 300
					},
					{
						field: "namaObat",
						title: "<h3 align=center>Nama Obat</h3>",
						width: 250
					},
					// {
					// 	field: "namaObat",
					// 	title: "<h3 align=center>Nama Obat</h3>",
					// 	width: 250
					// },
					{
						field: "namaDagang",
						title: "<h3 align=center>Nama Dagang</h3>",
						width: 250
					},
					{
						field: "spesifikasi",
						title: "<h3 align=center>Spesifikasi</h3>",
						width: 300
					},
					{
						field: "isiKemasan",
						title: "<h3 align=center>Satuan<br/>Kemasan</h3>",
						width: 80,
						"template":"<div class=\"pull-right\">#=kendo.toString(kemasan, \"n0\")# #=\"ampul\"#</div>"
					},
					{
						field: "hargaSatuanTerkecil",
						title: "<h3 align=center>Harga<br/>Satuan</h3>",
						width: 80,
						"template":"<div class=\"pull-right\">#=kendo.toString(hargaSatuanTerkecil, \"n0\")#</div>"
					},
					{
						field: "tipeObat",
						title: "<h3 align=center>Tipe Obat</h3>",
						"template":"<div style=\"text-align:center\">#=tipeObat#</div>"
					}]//,
		    	// /editable: true
	      	};

			$scope.kl = function(current){
				$scope.current = current;
				console.log(current);

			};

			$scope.simpan = function() {
				var tmp = {
					 "hargaPenawaranSupplier": $scope.current.hargaSatuanTerkecil,
				     "supplierId": $scope.current.supplierId,
				     "noRecDetailKartuPengendali": $scope.current.noRecKartuPengendaliDetail,
				     "noRecPenawaranHargaSupplier": $scope.current.noRecPenawaranHargaSupplier
				}

				PengajuanUsulanAnggaranService.savePengajuan(tmp,"kartu-pengendali/rekap-pemenang-from-ulp").then(function(e){	
					console.log(JSON.stringify(tmp));
				});

			};

			$scope.batal = function() {
			  	window.history.back();
			};
		}
	]);
});