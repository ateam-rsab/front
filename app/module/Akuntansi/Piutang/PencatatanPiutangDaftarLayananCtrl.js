define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PencatatanPiutangDaftarLayananCtrl', ['CacheHelper','$timeout', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir','$state','DateHelper','ManageSdm',
		function(cacheHelper,$timeout, $q, $rootScope, $scope, modelItemAkuntansi, manageKasir,$state,dateHelper,manageSdm) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.dataPasienSelected = {};
			$scope.item = {};
			$scope.item.tanggalAwal =  $scope.now;
			$scope.item.tanggalAkhir =  $scope.now;
			$scope.cboDefault = true;
			$scope.cboRekanan = false;

			// modelItemAkuntansi.getDataTableTransaksi("akuntansi/mapping-coa/get-penjamin-list").then(function(data){
			// 	$scope.listJenisPiutang=data;
			// });
			
			// manageKasir.getDataGeneric("KelompokPasien&select=id,kelompokPasien").then(function(data){
			// 	//debugger;
			// 	$scope.listjenisPenjamin=data.data;
			// })

			$scope.UbahRekanan = function(){
				$scope.cboDefault = false;
				$scope.cboRekanan = true;
			}
			$scope.batalRekanan = function(){
				$scope.cboRekanan = false
				$scope.cboDefault=true
			}
			$scope.simpanRekanan = function(){
				var updateRekanan = {
					"norec_pd": $scope.dataSelected.norec_pd,
					"objectrekananfk": $scope.item.namaRekanan.id
				}
				manageKasir.saveUpdateRekanan(updateRekanan).then(function(e){
					
					$scope.cboRekanan = false
					$scope.cboDefault=true
					LoadData();
				})
			}

			modelItemAkuntansi.getDataTableTransaksi("piutang/get-data-combo-piutang").then(function(data){
				$scope.listJenisPiutang=data.rekanan;
				$scope.listjenisPenjamin=data.kelompokpasien;
				$scope.listRekanan = data.rekanan;

				var chacePeriode = cacheHelper.get('periodeTransaksiPencatatanPiutangDaftarLayanan');
				if(chacePeriode != undefined){
					var arrPeriode = chacePeriode.split(':');
					$scope.item.tanggalAwal = new Date(arrPeriode[0]);
					$scope.item.tanggalAkhir = new Date(arrPeriode[1]);

					var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
					var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
					if (arrPeriode[2] != "undefined"){
						$scope.item.namaReg = arrPeriode[2];
					};
					if (arrPeriode[4] != "undefined"){
						$scope.item.status = {"namaStatus":arrPeriode[4]} ;
					};

					if (arrPeriode[5] != 'undefined') {
						$scope.item.jenisPenjamin = {id:arrPeriode[5],kelompokpasien:arrPeriode[6]}
					}
					if (arrPeriode[7] != 'undefined') {
						$scope.item.jenisPasien = {id:arrPeriode[7],namarekanan:arrPeriode[8]}
					}

					
				}
				else
				{
					$scope.item.tanggalAwal = $scope.now;
					$scope.item.tanggalAkhir = $scope.now;
					loadData()
				};
			});
			// manageSdm.getListData("KelompokPasien&select=id,kelompokPasien").then(function(data){
			// 	$scope.listJenisPiutang=data;
			// });

			$scope.listStatus = [{"id":1,"namaStatus":"Piutang"},{"id":2,"namaStatus":"Collecting"},{"id":3,"namaStatus":"Lunas"}]

			//debugger;
			//ON LOAD with Params
			
			///END/// ON LOAD with Params
			
			//ON CLICK tombol CARI
			$scope.SearchData = function(){
				simpanCache()
				loadData()
			};
			/////END/// ON CLICK tombol CARI

			function simpanCache(){
				//SIMPAN CAHCE
				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				if($scope.item.jenisPasien != undefined){
					var jpp = $scope.item.jenisPasien.namaRekanan;
				};
				if($scope.item.namaReg != undefined){
					var npp = $scope.item.namaReg;
				};
				if($scope.item.status != undefined){
					var sttt = $scope.item.status.namaStatus;
				};

				if($scope.item.jenisPenjamin != undefined){
					var jenisPenjaminID = $scope.item.jenisPenjamin.id;
				};
				if($scope.item.jenisPenjamin != undefined){
					var jenisPenjaminNM = $scope.item.jenisPenjamin.kelompokpasien;
				};

				if($scope.item.jenisPasien != undefined){
					var jenisPasienID = $scope.item.jenisPasien.id;
				};
				if($scope.item.jenisPasien != undefined){
					var jenisPasienNM = $scope.item.jenisPasien.namarekanan;
				};

				var chacePeriode = tglAwal1 + ":" + tglAkhir1 + ":" + npp + ":" + jpp + ":" + sttt  + ":" 
					+ jenisPenjaminID  + ":" + jenisPenjaminNM  
					+ ":" + jenisPasienID  + ":" + jenisPasienNM
				cacheHelper.set('periodeTransaksiPencatatanPiutangDaftarLayanan', chacePeriode);
				///END
			};

			function loadData(){
				//FITER
				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				var np = "&namaPasien=" + $scope.item.namaReg;
				if($scope.item.namaReg == undefined){
					var np = "";
				};
				var noregistrasi = "&noregistrasi=" + $scope.item.noRegistrasi;
				if($scope.item.noRegistrasi == undefined){
					var noregistrasi = "";
				};
				var noMR = "&nocm=" + $scope.item.noMR;
				if($scope.item.noMR == undefined){
					var noMR = "";
				};
				//jenisPasien.id
				var jp = "";
				if($scope.item.jenisPenjamin != undefined){
					var jp = "&kelompokpasienfk=" + $scope.item.jenisPenjamin.id;
				};
				var mp = "";
				if($scope.item.jenisPasien != undefined){
					var mp = "&rekananfk=" + $scope.item.jenisPasien.id;
				};
				// if($scope.item.jenisPasien == null){
				// 	var jp = "";
				// };
				var stt =""
				var $status =""
				if($scope.item.status != undefined){
					//var stt ="&status=" + $scope.item.status.namaStatus;
					 $status = $scope.item.status.namaStatus;
				};
				modelItemAkuntansi.getDataTableTransaksi("piutang/daftar-piutang-layanan?tglAwal=" + tglAwal1 + "&tglAkhir=" + tglAkhir1 + np + jp + stt+mp+noregistrasi+noMR).then(function(data){
					//$scope.dataPencatatanPiutang=data;
					// var dat =[];
					// for (var i = 0; i < data.length; i++) {
					// 	if (data[i].status == $status){
					// 		dat.push(data[i]);	
					// 	}
					// }
					$scope.dataPencatatanPiutang = data
					// $scope.dataPencatatanPiutang=dat;
				});
				
			};

			function showButton(){
				$scope.showBtnCollecting = true;
				$scope.showBtnDetail = true;
				$scope.showBtnRiwayat = true;
			}

			showButton();

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.formatTanggal = function(tanggal)
			{
				return moment(tanggal).format('DD-MMM-YYYY');
			}

			$scope.columnPencatatanPiutang = [

			{
				"field": "noRegistrasi",
				"title": "No Reg",
				"width":"80px",
				"template": "<span class='style-center'>#: noRegistrasi #</span>"
			},
			{
				"field": "tglTransaksi",
				"title": "Tanggal",
				"width":"80px",
				"template": "<span class='style-left'>{{formatTanggal('#: tglTransaksi #')}}</span>"
			},
			{
				"field": "namaPasien",
				"title": "Nama",
				"width":"130px",
				"template": "<span class='style-left'>#: namaPasien #</span>"
			},
			{
				"field": "jenisPasien",
				"title": "Kelompok Pasien",
				"width":"100px",
				"template": "<span class='style-left'>#: jenisPasien #</span>"
			},
			{
				"field": "rekanan",
				"title": "Penjamin",
				"width":"130px",
				"template": "<span class='style-left'>#: rekanan #</span>"
			},
			{
				"field": "totalBilling",
				"title": "Total Tagihan",
				"width":"100px",
				"template": "<span class='style-right'>{{formatRupiah('#: totalBilling #', '')}}</span>"
			},
			{
				"field": "totalKlaim",
				"title": "Total Klaim",
				"width":"100px",
				"template": "<span class='style-right'>{{formatRupiah('#: totalKlaim #', '')}}</span>"
			},
			{
				"field": "totalBayar",
				"title": "Total Bayar",
				"width":"100px",
				"template": "<span class='style-right'>{{formatRupiah('#: totalBayar #', '')}}</span>"
			},
			{
				"field": "umur",
				"title": "Umur",
				"width":"100px",
				"template": "<span class='style-left'>#: umur #</span>"
			},
			{
				"field": "status",
				"title": "Status",
				"width":"100px",
				"template": "<span class='style-center'>#: status #</span>"
			},
			{
				"field": "noposting",
				"title": "NoCollect",
				"width":"100px",
				"template": "<span class='style-center'>#: noposting #</span>"
			}
			];

			//fungsi clear kriteria search
			$scope.ClearSearch = function(){
				$scope.item = {};
				$scope.item.tanggalRegistrasiAwal = $scope.now;
				$scope.item.tanggalRegistrasiAkhir = $scope.now;
				$scope.item.ruangan = {};
				$scope.SearchData();
			}

			$scope.Collecting = function(){
				//$state.go('CollectingPiutang');
				$scope.changePage2("CollectingPiutang");
			};
			$scope.changePage2 = function(stateName){
				debugger;
				// var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				// var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				// if($scope.item.jenisPasien != undefined){
				// 	var jpp = $scope.item.jenisPasien.namaRekanan;
				// };
				// if($scope.item.namaReg != undefined){
				// 	var npp = $scope.item.namaReg;
				// };
				// var obj = {
				// 	splitString : tglAwal1 + "~" + tglAkhir1 + "~" + jpp + "~" + npp + "~PencatatanPiutangDaftarLayanan~"
				// }
				var obj = {
					splitString : "a s @ e p i c "
				}

				$state.go(stateName, {
						dataFilter: JSON.stringify(obj)
					});
			};


			$scope.Detail = function(){
				$scope.changePage("DetailPelayananPiutang");
			};
			$scope.changePage = function(stateName){
				debugger;
				if($scope.dataSelected.noRegistrasi != undefined)
				{
					var namaForm = "PencatatanPiutangDaftarLayanan";
					var noReg = $scope.dataSelected.noRegistrasi;
					var obj = {
						splitString : noReg + "~" + namaForm
					}

					$state.go(stateName, {
						dataPasien: JSON.stringify(obj)
					});
				}
				else
				{
					alert("Silahkan pilih data pasien terlebih dahulu");
				}
			};

			$scope.Riwayat = function(){
				$scope.changePage3("HitungPiutang");
				//$state.go('HitungPiutang'
			};
			$scope.changePage3 = function(stateName){
				debugger;
				if($scope.dataSelected.noRegistrasi != undefined)
				{
					var obj = {
						splitString : "PencatatanPiutangDaftarLayanan" + "~" + ""//$scope.dataSelected.noRegistrasi
					}

					$state.go(stateName, {
						dataFilter: JSON.stringify(obj)
					});
				}
				else
				{
					alert("Silahkan pilih data pasien terlebih dahulu");
				}
			};

////////////////////////////////////////////////////////////////////////

}
]);
});