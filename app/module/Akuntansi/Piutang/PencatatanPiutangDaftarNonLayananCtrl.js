define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PencatatanPiutangDaftarNonLayananCtrl', ['CacheHelper','$timeout', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir','$state','DateHelper',
		function(cacheHelper,$timeout, $q, $rootScope, $scope, modelItemAkuntansi, manageKasir,$state,dateHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.dataPasienSelected = {};
			$scope.item = {};
			$scope.item.tanggalAwal =  $scope.now;
			$scope.item.tanggalAkhir =  $scope.now;

			// modelItemAkuntansi.getDataTableTransaksi("akuntansi/mapping-coa/get-penjamin-list").then(function(data){
			// 	$scope.listJenisPiutang=data;
			// });

			$scope.listStatus = [{"id":1,"namaStatus":"Piutang"},{"id":2,"namaStatus":"Collecting"}]

			//debugger;
			//ON LOAD with Params
			var chacePeriode = cacheHelper.get('periodeTransaksiPencatatanPiutangDaftarNonLayanan');
			if(chacePeriode != undefined){
				var arrPeriode = chacePeriode.split(':');
				$scope.item.tanggalAwal = new Date(arrPeriode[0]);
				$scope.item.tanggalAkhir = new Date(arrPeriode[1]);

				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				if (arrPeriode[2] != "undefined"){
					$scope.item.namaReg = arrPeriode[2];
				};
				// if (arrPeriode[3] != "undefined"){
				// 	$scope.item.jenisPasien = {"namaRekanan":arrPeriode[3]} ;
				// };
				if (arrPeriode[4] != "undefined"){
					$scope.item.status = {"namaStatus":arrPeriode[4]} ;
				};

				loadData();
			}
			else
			{
				$scope.item.tanggalAwal = $scope.now;
				$scope.item.tanggalAkhir = $scope.now;
			};
			///END/// ON LOAD with Params
			
			//ON CLICK tombol CARI
			$scope.SearchData = function(){
				saveCache()
				loadData()
			};
			/////END/// ON CLICK tombol CARI

			function saveCache(){
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
				var chacePeriode = tglAwal1 + ":" + tglAkhir1 + ":" + npp + ":" + jpp + ":" + sttt;
				cacheHelper.set('periodeTransaksiPencatatanPiutangDaftarNonLayanan', chacePeriode);
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
				//jenisPasien.id
				if($scope.item.jenisPasien != undefined){
					var jp = "&penjaminID=" + $scope.item.jenisPasien.id;
					if($scope.item.jenisPasien.id == undefined){
						var jp = "";
					};
				};
				if($scope.item.jenisPasien == null){
					var jp = "";
				};
				var stt =""
				if($scope.item.status != undefined){
					var stt ="&status=" + $scope.item.status.namaStatus;
				};
				// modelItemAkuntansi.getDataTableTransaksi("piutang/daftar-piutang-layanan?tglAwal=" + tglAwal1 + "&tglAkhir=" + tglAkhir1 + np + jp + stt).then(function(data){
				// 	$scope.dataPencatatanPiutang=data;
				// });
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
				"width":"150px",
				"template": "<span class='style-center'>#: noRegistrasi #</span>"
			},
			{
				"field": "tglTransaksi",
				"title": "Tanggal",
				"width":"150px",
				"template": "<span class='style-left'>{{formatTanggal('#: tglTransaksi #')}}</span>"
			},
			{
				"field": "namaPasien",
				"title": "Nama",
				"width":"200px",
				"template": "<span class='style-left'>#: namaPasien #</span>"
			},
			{
				"field": "jenisPasien",
				"title": "Jenis Penjamin",
				"width":"150px",
				"template": "<span class='style-left'>#: jenisPasien #</span>"
			},
			{
				"field": "totalBilling",
				"title": "Total Tagihan",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: totalBilling #', 'Rp. ')}}</span>"
			},
			{
				"field": "totalKlaim",
				"title": "Total Klaim",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: totalKlaim #', 'Rp. ')}}</span>"
			},
			{
				"field": "umur",
				"title": "Umur",
				"width":"250px",
				"template": "<span class='style-left'>#: umur #</span>"
			},
			{
				"field": "status",
				"title": "Status",
				"width":"150px",
				"template": "<span class='style-center'>#: status #</span>"
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
				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				if($scope.item.jenisPasien != undefined){
					var jpp = $scope.item.jenisPasien.namaRekanan;
				};
				if($scope.item.namaReg != undefined){
					var npp = $scope.item.namaReg;
				};
				var obj = {
					splitString : tglAwal1 + "~" + tglAkhir1 + "~" + jpp + "~" + npp + "~PencatatanPiutangDaftarNonLayanan~"
				}

				$state.go(stateName, {
						dataFilter: JSON.stringify(obj)
					});
			};


			$scope.Detail = function(){
				$scope.changePage("DetailPelayananPiutang");
			};
			$scope.changePage = function(stateName){
				// debugger;
				// if($scope.dataSelected.noRegistrasi != undefined)
				// {
					var obj = {
						//splitString : $scope.dataSelected.noRegistrasi + "~PencatatanPiutangDaftarNonLayanan~"
						splitString :  "1701000006~PencatatanPiutangDaftarNonLayanan~"
					}

					$state.go(stateName, {
						dataPasien: JSON.stringify(obj)
					});
				// }
				// else
				// {
				// 	alert("Silahkan pilih data pasien terlebih dahulu");
				// }
			};

			$scope.Riwayat = function(){
				$scope.changePage3("HitungPiutang");
				//$state.go('HitungPiutang'
			};
			$scope.changePage3 = function(stateName){
				debugger;
				// if($scope.dataSelected.noRegistrasi != undefined)
				// {
					var obj = {
						splitString : "PencatatanPiutangDaftarNonLayanan" + "~" + ""//$scope.dataSelected.noRegistrasi
					}

					$state.go(stateName, {
						dataFilter: JSON.stringify(obj)
					});
				// }
				// else
				// {
				// 	alert("Silahkan pilih data pasien terlebih dahulu");
				// }
			};

////////////////////////////////////////////////////////////////////////

}
]);
});