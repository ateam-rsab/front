define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PembayaranPiutangCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','$state','DateHelper','CacheHelper','ManageKasir',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,$state,dateHelper,cacheHelper,manageKasir) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item={};
			showButton();

			debugger;
			//$scope.dataParams = JSON.parse($state.params.noSetor);
			var dariSini = "";
			var noStruk = "";
			var ttlSaldo = 0;
			var noSbm = ""; 

			function loadCache(){
				//ON LOAD with Params
				var chaceFilter = cacheHelper.get('PembayaranPiutangCache');
				if(chaceFilter != undefined){
					debugger;
					var arrFilter = chaceFilter.split('~');
					dariSini = arrFilter[0];
					noStruk = arrFilter[1];
//"DaftarPenerimaanHarianPiutang" + "~" + noSetorr+ "~"+$scope.item.dataSelected.tglStruk+ "~"
//+$scope.item.dataSelected.tglStruk+ "~"+$scope.item.dataSelected.totalSetor+ "~"+$scope.item.dataSelected.keterangan
					if(noStruk != "No Data !!"){
					//modelItemAkuntansi.getDataTableTransaksi("kasir/monitoring-rekening-koran?noStruk=" + noStruk).then(function(data) {
						// $scope.dataDaftarPenerimaanHarian=data;
						$scope.item.tanggalTerima = arrFilter[2];
						$scope.item.jenisTransaksi = arrFilter[3];
						$scope.item.totalSaldo ='Rp. ' +  parseFloat( arrFilter[4]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
						ttlSaldo = arrFilter[4];
						$scope.item.Keterangan = arrFilter[5];
						$scope.item.Terbilang = "-"
					//});
					}
					else{
						$scope.item.tanggalTerima = "No Data !!"
						$scope.item.jenisTransaksi = "No Data !!"
						$scope.item.totalSaldo = "No Data !!"
						$scope.item.Keterangan = "No Data !!"
					}
					modelItemAkuntansi.getDataTableTransaksi("piutang/daftar-collected-piutang-layanan").then(function(data){
						//$scope.dataCollecting=data;
						var dat =[];
						for (var i = 0; i < data.length; i++) {
							if (data[i].status != 'Lunas') {
								dat.push(data[i])
							}
						}
						$scope.dataCollecting=dat;
					});

					loadData()
				}
				///END/// ON LOAD with Params
			};

			// if($scope.dataParams.splitString != undefined){
			// 	debugger;
			// 	var strFilter = $scope.dataParams.splitString;
			// 	var arrFilter= strFilter.split('~');

			// 	dariSini = arrFilter[0];
			// 	noStruk = arrFilter[1];

				
			// };
			loadCache()


			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			};

			function showButton(){
				$scope.showBtnBack = true;
			};
			

			$scope.Back = function(){
				Kembali()
			};

			function Kembali(){
				$state.go(dariSini)
			}

			

			function loadData(){
				// debugger;
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
			};

			$scope.LoadDataCollect =function(){
				debugger;
				modelItemAkuntansi.getDataTableTransaksi("piutang/collected-piutang-layanan/" + $scope.dataSelectedCollecting.noPosting).then(function(data){
					$scope.dataPembayaranPiutang = data;
					//if($scope.dataSource != undefined){
						//$scope.item.noCollect = $scope.dataSource[0].noPosting;
						//$scope.item.namaCollector = $scope.dataSource[0].collector;
						//$scope.item.tglCollect = "blm ada data";
					//};
					//debugger;
					 var ttlBayar = 0;
					 var ttlKlaim = 0;
					 var ttlSelisih = 0;
					for(var i=0; i<$scope.dataPembayaranPiutang.length; i++){
						$scope.dataPembayaranPiutang[i].totalKlaim = parseInt($scope.dataPembayaranPiutang[i].totalKlaim) - parseInt($scope.dataPembayaranPiutang[i].totalBayar);
						ttlBayar += parseInt($scope.dataPembayaranPiutang[i].totalKlaim);
						ttlKlaim += parseInt($scope.dataPembayaranPiutang[i].totalKlaim);
						ttlSelisih = ttlKlaim-ttlBayar;
						$scope.dataPembayaranPiutang[i].selisih = ttlSelisih;
					};
					$scope.item.totalKlaim = 'Rp. ' +  parseFloat(ttlKlaim).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
					$scope.item.totalBayar = 'Rp. ' +  parseFloat(ttlBayar).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
					$scope.item.selisihPembayaran = 'Rp. ' +  parseFloat(ttlSaldo - ttlBayar ).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 

				});
			}

			$scope.columnPembayaranPiutang = [
			{
				"field": "noRegistrasi",
				"title": "No Registrasi"
			},
			{
				"field": "namaPasien",
				"title": "Nama Pasien"
			},
			{
				"field": "jenisPasien",
				"title": "Jenis Penjamin"
			},
			{
				"field": "totalKlaim",
				"title": "Sisa Klaim",
				"template": "<span class='style-right'>{{formatRupiah('#: totalKlaim #', 'Rp.')}}</span>"
			},
			{
				"field": "totalKlaim",
				"title": "Bayar",
				"template": "<span class='style-right'>{{formatRupiah('#: totalKlaim #', 'Rp.')}}</span>"
			},
			{
				"field": "selisih",
				"title": "Selisih",
				"template": "<span class='style-right'>{{formatRupiah('#: selisih #', 'Rp.')}}</span>"
			}
			];
			$scope.columnCollecting = [
			{
				"field": "noPosting",
				"title": "No Collecting"
			},
			{
				"field": "tglTransaksi",
				"title": "Tanggal"
			},
			{
				"field": "collector",
				"title": "Nama Collector"
			},
			{
				"field": "jlhPasien",
				"title": "Jumlah Klaim"
			},
			{
				"field": "totalKlaim",
				"title": "Total Klaim",
				"template": "<span class='style-right'>{{formatRupiah('#: totalKlaim #', 'Rp.')}}</span>"
			},
			{
				"field": "totalSudahDibayar",
				"title": "Total Sudah dibayar",
				"template": "<span class='style-right'>{{formatRupiah('#: totalSudahDibayar #', 'Rp.')}}</span>"
			},
			{
				"field": "status",
				"title": "Status"
			}
			];

			$scope.Bayar = function(){
				debugger;
				if($scope.item.totalKlaim == undefined){
					alert("Nama Penjamin belum dipilih!");
					return;
				}

				var dataObjPost = {};
				var arrObjPembayaran = [];
				var arrObj2 = [];
				for(var i=0; i<$scope.dataPembayaranPiutang.length; i++){
					arrObj2 = {norecSPPenjamin: $scope.dataPembayaranPiutang[i].noRec,
						       jumlahDibayar: $scope.dataPembayaranPiutang[i].totalKlaim}
					arrObjPembayaran.push(arrObj2)
				}
				dataObjPost = {norecSBM : noStruk,
					detailPenjamin: arrObjPembayaran
				}
				manageKasir.kompensasiPiutang(dataObjPost).then(function(e) {
				})
				// for(var i=0; i<$scope.dataPembayaranPiutang.length; i++){
				// 	arrObj2 = {norecSPPenjamin: $scope.dataPembayaranPiutang[i].norecSPPenjamin,
				// 		       jumlahDibayar: $scope.dataPembayaranPiutang[i].totalKlaim}
				// 	arrObjPembayaran.push(arrObj2)
				// }
				// dataObjPost = {norecSBM : noStruk,
				// 	detailPenjamin: arrObjPembayaran
				// }
				//manageSdm.postData("tagihan-rekanan/save-klaim-pembayaran",dataObjPost).then(function(e) {
				//})

				Kembali();
			};

			// $scope.columnPembayaranPiutang = [
			// {"field": "no","title": "No","width":"50px"},
			// {"field": "noRegistrasi","title": "No Registrasi","width":"150px"},
			// {"field": "noCm","title": "Nomor CM","width":"150px"},
			// {"field": "namaPasien","title": "nama Pasien","width":"300px"},
			// {"field": "totalKlaim","title": "Total Klaim","width":"150px",
			// "template": "<span class='style-right'>{{formatRupiah('#: totalKlaim #', 'Rp.')}}</span>"},
			// {"field": "jenisPenjamin","title": "Jenis Penjamin","width":"200px"},
			// {"field": "status","title": "Status","width":"100px"}
			// ];

			// $scope.dataPembayaranPiutang = new kendo.data.DataSource({
			// 	data: [{
			// 		"no": "1",
			// 		"noRegistrasi": "173245",
			// 		"noCm": "0000000150",
			// 		"namaPasien": "Agus",
			// 		"totalKlaim": 2000000,
			// 		"jenisPenjamin": "BPJS",
			// 		"status": "Collecting"
			// 	},{
			// 		"no": "2",
			// 		"noRegistrasi": "173246",
			// 		"noCm": "0000000151",
			// 		"namaPasien": "Rahman",
			// 		"totalKlaim": 2000000,
			// 		"jenisPenjamin": "BPJS",
			// 		"status": "Collecting"
			// 	},{
			// 		"no": "3",
			// 		"noRegistrasi": "173247",
			// 		"noCm": "0000000152",
			// 		"namaPasien": "Miftah",
			// 		"totalKlaim": 2000000,
			// 		"jenisPenjamin": "BPJS",
			// 		"status": "Collecting"
			// 	}
			// 	]
			// });
			



////////////////////// -TAMAT- //////////////////////////
		}
		]);




});