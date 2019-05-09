define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengajuanUsulanAnggaran2Ctrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper','PengajuanUsulanAnggaranService',
		function($rootScope, $scope, ModelItem, DateHelper, PengajuanUsulanAnggaranService) {

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.now = new Date();
			
			$scope.listTahun = [
				{"id": "1", "name": "2017"},
				{"id": "2", "name": "2018"},
				{"id": "3", "name": "2019"},
				{"id": "4", "name": "2020"},
				{"id": "5", "name": "2021"}
			];

			$scope.kolomKegiatan = [
			 	{
					"field": "no",
					"title": "No",
					width: "50px"
				},
            	{
					"field": "kegiatan.namaKegiatan",
					"title": "Kegiatan"
				}, 
				{
					"field": "detilKegiatan.namaKegiatanDetail",
					"title": "Detil Kegiatan"
				},
				{
					"field": "output.namaOutput",
					"title": "Output"
				}
		    ];

			PengajuanUsulanAnggaranService.getGetData("Ruangan&select=id,namaRuangan", true).then(function(dat){
				$scope.listRuanganUnitKerja = dat;
			});
			PengajuanUsulanAnggaranService.getGetData("Pengendali&select=id,kodePengendali,namaPengendali", true).then(function(dat){
				$scope.listPengendali = dat;
			});

			PengajuanUsulanAnggaranService.getGetData("Kegiatan&select=id,kodeKegiatan,namaKegiatan", true).then(function(dat){
				$scope.listKegiatan = dat;
			});

			PengajuanUsulanAnggaranService.getGetData("KegiatanDetail&select=id,kodeKegiatanDetail,namaKegiatanDetail", true).then(function(dat){
				$scope.listKegiatanDetail = dat;
			});

			PengajuanUsulanAnggaranService.getGetData("Output&select=id,kodeOutput,namaOutput", true).then(function(dat){
				$scope.listKodeOutput = dat;
			});

			PengajuanUsulanAnggaranService.getKomponen("komponen/find-all-komponen/", true).then(function(dat){
				$scope.listKomponen = dat.data.data;
			});

			PengajuanUsulanAnggaranService.getGetData("ChartOfAccount&select=id,kdAccount,namaAccount", true).then(function(dat){
				$scope.listKodeAkun = dat;
			});

			PengajuanUsulanAnggaranService.getGetData("JenisBelanja&select=id,kodeJenisBelanja,namaJenisBelanja,ketJenisBelanja", true).then(function(dat){
				$scope.listJenisBelanja = dat;
				// debugger;
			});

			PengajuanUsulanAnggaranService.getGetData("JenisPengadaan&select=id,kodeJenisPengadaan,namaJenisPengadaan,ketJenisPengadaan", true).then(function(dat){
				$scope.listJenisPengadaan = dat;
				// debugger;
			});

			PengajuanUsulanAnggaranService.getGetData("AsalProduk&select=id,kdAsalProduk,asalProduk", true).then(function(dat){
				$scope.listSumberDana = dat;
				// debugger;
			});
			
			PengajuanUsulanAnggaranService.getGetData("SatuanStandar&select=id,satuanStandar", true).then(function(dat){
				$scope.listUnit = dat;
				// debugger;
			});
			
			/* duplikasi
			PengajuanUsulanAnggaranService.getGetData("Ruangan&select=id,kdRuangan,namaRuangan", true).then(function(dat){
				$scope.listTujuanPengiriman = dat;
				// debugger;
			});
			*/

			PengajuanUsulanAnggaranService.getGetData("Produk&select=id,kdProduk,namaProduk", true).then(function(dat){
				$scope.listNamaProduk = dat;
				// debugger;
			});
			//debugger;

			$scope.addKegiatan = false;

			$scope.tambahKegiatan = function(){
				$scope.dat = {};
				$scope.addKegiatan = true;
			}

			$scope.dataKegiatan = new kendo.data.DataSource({
				data: [],
				editable: true
			});

			$scope.ArrKegiatan = [];

			$scope.pushDataKegiatan = function(dataBaruKegiatan){
				var id = $scope.ArrKegiatan.length + 1;
				
				var newData = {
					"no": id,
					"kegiatan": dataBaruKegiatan.kegiatan,
					"kegiatanDetail": dataBaruKegiatan.detailKegiatan,
					"output": dataBaruKegiatan.output,
					"detailAnggaran": $scope.ArrDetilKegiatan
				};

				$scope.dataKegiatan.add(newData);
				$scope.ArrKegiatan.push(newData);
				$scope.addKegiatan = false;

				//console.log(JSON.stringify($scope.ArrKegiatan));
				//debugger;
			}

			$scope.kolomDetilKegiatan = [
			 	{
					"field": "no",
					"title": "No",
					width: "50px"
				},
            	{
					"field": "tanggalPengajuan",
					"title": "Kegiatan"
				}, 
				{
					"field": "komponen.namaKomponen",
					"title": "Komponen"
				},
				{
					"field": "akun",
					"title": "Akun"
				},
				{
					"field": "asalProduk",
					"title": "Sumber Dana"
				}
		    ];
			
			$scope.dataDetilKegiatan = new kendo.data.DataSource({
				data: [],
				editable: true
			});

			$scope.ArrDetilKegiatan = [];

			$scope.pushDetilAnggaran = function(dataBaruDetilKegiatan){
				var id = $scope.ArrKegiatan.length + 1;
				
				var newData = {
					"no": id,
					"tanggalPengajuan": dataBaruDetilKegiatan.tanggalPengajuan,
					"komponen": dataBaruDetilKegiatan.komponen,
					"akun": dataBaruDetilKegiatan.akun.namaAccount,
					"asalProduk": dataBaruDetilKegiatan.asalProduk.asalProduk
				};

				$scope.dataDetilKegiatan.add(newData);
				$scope.ArrDetilKegiatan.push(newData);

				console.log(JSON.stringify($scope.ArrDetilKegiatan));
				//debugger;
			}

			$scope.kolomdetailSpekAnggaran = [
			 	{
					"field": "no",
					"title": "No",
					width: "50px"
				},
            	{
					"field": "tanggalPengajuan",
					"title": "Kegiatan"
				}, 
				{
					"field": "komponen.namaKomponen",
					"title": "Komponen"
				},
				{
					"field": "akun",
					"title": "Akun"
				},
				{
					"field": "asalProduk",
					"title": "Sumber Dana"
				}
		    ];
			
			$scope.detailSpekAnggaran = new kendo.data.DataSource({
				data: [],
				editable: true
			});

			$scope.ArrSpekAnggaran = [];

			$scope.pushSpekAnggaran = function(dataBaruSpekAnggaran){
				var id = $scope.ArrSpekAnggaran.length + 1;
				
				var newData = {
					"no": id,
					"tanggalPengajuan": dataBaruDetilKegiatan.tanggalPengajuan,
					"komponen": dataBaruDetilKegiatan.komponen,
					"akun": dataBaruDetilKegiatan.akun.namaAccount,
					"asalProduk": dataBaruDetilKegiatan.asalProduk.asalProduk
				};

				$scope.dataDetilKegiatan.add(newData);
				$scope.ArrDetilKegiatan.push(newData);

				console.log(JSON.stringify($scope.ArrDetilKegiatan));
				//debugger;
			}

			$scope.simpanUsang = function(){
				$scope.item.kegiatanAnggaran = $scope.ArrKegiatan;
				//PenerimaanBarangLogistik.savePenerimaanLogistik(ModelItem.beforePost($scope.item),"penerimaan-barang/save-penerimaan-barang/").then(function(e){

				//});
				console.log(JSON.stringify($scope.item));
				debugger;
			}

		}
	]);
});