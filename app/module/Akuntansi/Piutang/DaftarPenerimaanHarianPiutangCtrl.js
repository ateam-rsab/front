define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPenerimaanHarianPiutangCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','$state','DateHelper','CacheHelper',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,$state,dateHelper,cacheHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};

			$scope.item.tanggalAwal =new Date();
			$scope.item.tanggalAkhir = new Date();
			//showButton();
			loadCache()

			// function showButton(){
			// 	$scope.showBtnKompensasi = true;
			// };
			

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			};

			function simpanCache(){
				//SIMPAN CAHCE
				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				//item.jenisTransaksi
				// if($scope.item.jenisTransaksi != undefined){
				// 	var jt = $scope.item.jenisTransaksi.jenis
				// };
				// if($scope.item.noRekening != undefined){
				// 	var nr = $scope.item.noRekening.namaExternal
				// };
				var chaceFilter = tglAwal1 + "~" + tglAkhir1 + "~"// + jt + "~" + nr + "~"
				cacheHelper.set('filterHistory', chaceFilter);
				///END
			};
			function loadCache(){
				//ON LOAD with Params
				var chaceFilter = cacheHelper.get('filterHistory');
				if(chaceFilter != undefined){
					//debugger;
					var arrPeriode = chaceFilter.split('~');
					$scope.item.tanggalAwal = new Date(arrPeriode[0]);
					$scope.item.tanggalAkhir = new Date(arrPeriode[1]);

					// if (arrPeriode[2] != "undefined"){
					// 	$scope.item.jenisTransaksi.jenis = arrPeriode[2];
					// };
					// if (arrPeriode[3] != "undefined"){
					// 	$scope.item.noRekening.namaExternal = arrPeriode[3];
					// };

					loadData()
				}
				else
				{
					$scope.item.tanggalAwal = $scope.now;
					$scope.item.tanggalAkhir = $scope.now;
				};
				///END/// ON LOAD with Params
			}

			function loadData(){
				debugger;
				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				//item.jenisTransaksi
				// if($scope.item.jenisTransaksi != undefined){
				// 	var jt = $scope.item.jenisTransaksi.jenis
				// };
				// if($scope.item.noRekening != undefined){
				// 	var nr = $scope.item.noRekening.id
				// };
				// modelItemAkuntansi.getDataTableTransaksi("kasir/monitoring-rekening-koran?tglAwal=" + tglAwal1 + "&tglAkhir=" + 
				// 	tglAkhir1 + "&jenisTransaksiLike=" + jt + "&kdRekening=" + nr).then(function(data) {
				// 	$scope.dataDaftarPenerimaanHarian=data;
				// });
				modelItemAkuntansi.getDataTableTransaksi("bendaharapenerimaan/daftar-penerimaan-bank?tglAwal=" + tglAwal1 + "&tglAkhir=" + tglAkhir1 + "&jenisTransaksiLike=64").then(function(data) {
					//$scope.dataDaftarPenerimaanHarian = data;
					$scope.dataSource = new kendo.data.DataSource({
						data: data
					});
				});
			};

			$scope.columnGrid = [
			{
				"field": "noStruk",
				"title": "No Struk",
				"width":"100px",
				"template": "<span class='style-center'>#: noStruk #</span>"
			},
			{
				"field": "tglStruk",
				"title": "Tanggal Struk",
				"width":"100px",
				"template": "<span class='style-center'>#: tglStruk #</span>"
			},
			{
				"field": "keterangan",
				"title": "Keterangan",
				"width":"200px"
			},
			{
				"field": "jenisTransaksi",
				"title": "Jenis Transaksi",
				"width":"150px",
				"template": "<span class='style-center'>#: jenisTransaksi #</span>"
			},
			{
				"field": "totalSetor",
				"title": "Total",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: totalSetor #', 'Rp. ')}}</span>"
			},
			{
				"field": "status",
				"title": "Status",
				"width":"100px"
			}
			];

			$scope.SearchData = function(){
				loadData();
				simpanCache()
			};

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			};

			// $scope.Kompensasi = function(){
			// 	$state.go('PembayaranPiutang')
			// };

			$scope.Kompensasi = function(){
				if ($scope.dataSelected.status == '-') {
					$scope.changePage("PembayaranPiutang");	
				}else{
					alert("Sudah Di Kompensasi!");
					return;
				}
				
			};
			$scope.changePage = function(stateName){
				debugger;
				var noSetorr = "No Data !!"
				if($scope.dataSelected != undefined){
					noSetorr = $scope.dataSelected.noStruk
				};

				var chaceFilter = "DaftarPenerimaanHarianPiutang" + "~" + noSetorr+ "~"+$scope.dataSelected.tglStruk+ "~"+$scope.dataSelected.jenisTransaksi+ "~"+$scope.dataSelected.totalSetor+ "~"+$scope.dataSelected.keterangan
				cacheHelper.set('PembayaranPiutangCache', chaceFilter);

				// var obj = {
				// 	splitString : "DaftarPenerimaanHarianPiutang" + "~" + noSetorr + "~"
				// };

				 $state.go(stateName, {noSetor: noSetorr});
			};

			// $scope.dataDaftarPenerimaanHarian = new kendo.data.DataSource({
			// 	data: [{"no":"1","tanggalTerima":"2017-01-01","noFPK":"ADH1254543BG","totalSaldo":11000000,"keterangan":"Pembayaran Klaim Asuransi NoPenagihan : PNG0000001111","status":"Kompensasi"},
			// 	{"no":"2","tanggalTerima":"2017-01-01","noFPK":"BDG23423847","totalSaldo":20000000,"keterangan":"Pembayaran Klaim BPJS NoPenagihan : PNG0000001112","status":"Penerimaan"}]
			// });
			// $scope.columnDaftarPenerimaanHarian = [
			// {
			// 	"field": "no",
			// 	"title": "No",
			// 	"width":"50px",
			// 	"template": "<span class='style-center'>#: no #</span>"
			// },
			// {
			// 	"field": "tanggalTerima",
			// 	"title": "Tanggal Terima",
			// 	"width":"100px",
			// 	"template": "<span class='style-center'>#: tanggalTerima #</span>"
			// },
			// {
			// 	"field": "noFPK",
			// 	"title": "No FPK",
			// 	"width":"100px",
			// 	"template": "<span class='style-center'>#: noFPK #</span>"
			// },
			// {
			// 	"field": "totalSaldo",
			// 	"title": "Total Saldo",
			// 	"width":"100px",
			// 	"template": "<span class='style-right'>{{formatRupiah('#: totalSaldo #', 'Rp. ')}}</span>"
			// },
			// {
			// 	"field": "keterangan",
			// 	"title": "Keterangan",
			// 	"width":"300px"
			// },
			// {
			// 	"field": "status",
			// 	"title": "Status",
			// 	"width":"70px",
			// 	"template": "<span class='style-center'>#: status #</span>"
			// }
			// ];
			


///////////////////////////////////// -TAMAT- /////////////////////////////////////////////////

		}
		]);
});