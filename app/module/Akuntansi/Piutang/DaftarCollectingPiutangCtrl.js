define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarCollectingPiutangCtrl', ['CacheHelper','$timeout', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', '$state','DateHelper',
		function(cacheHelper,$timeout, $q, $rootScope, $scope, modelItemAkuntansi,$state,dateHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.isRouteLoading=false;
			//$scope.dataSelectedPiutang = {};
			// $scope.item.tanggalAwal = $scope.now;
			// $scope.item.tanggalAkhir = $scope.now;
			
			$scope.listStatus = [{"id":1,"namaStatus":"Collecting"},{"id":2,"namaStatus":"Selesai"}]

			//ON LOAD with Params
			var chacePeriode = cacheHelper.get('filterDataParams');
			if(chacePeriode != undefined){
				var arrPeriode = chacePeriode.split('~');
				$scope.item.tanggalAwal = new Date(arrPeriode[0]);
				$scope.item.tanggalAkhir = new Date(arrPeriode[1]);

				if (arrPeriode[2] != "undefined"){
					$scope.item.namaCollector = arrPeriode[2];
				};
				if (arrPeriode[3] != "undefined"){
					$scope.item.status = {"namaStatus":arrPeriode[3]} ;
				}
				if (arrPeriode[4] != "undefined"){
					$scope.item.noCollect = arrPeriode[4];
				};

				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				var np = "&namaPasien=" + $scope.item.namaCollector;
				if($scope.item.namaCollector == undefined){
					var np = "";
				};
				var nps = "&noposting=" + $scope.item.noCollect;
				if($scope.item.noCollect == undefined){
					var nps = "";
				};
				var stt =""
				if($scope.item.status != undefined){
					var stt ="&status=" + $scope.item.status.namaStatus;
				};
				$scope.isRouteLoading=true;
				modelItemAkuntansi.getDataTableTransaksi("piutang/daftar-collected-piutang-layanan?tglAwal=" + tglAwal1 + "&tglAkhir=" + tglAkhir1 + np + nps + stt).then(function(data){
					$scope.isRouteLoading=false;
					for (var i = 0; i < data.length; i++) {
						data[i].sisa =parseFloat(data[i].totalKlaim) - parseFloat(data[i].totalSudahDibayar);
					}
					$scope.dataSource2=data;
				});

			}
			else
			{
				$scope.item.tanggalAwal = $scope.now;
				$scope.item.tanggalAkhir = $scope.now;
			};
			///END/// ON LOAD with Params

			
			$scope.Ubah = function(){
				// var tglAwal1="dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD")";
				// var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				// if($scope.item.jenisPasien != undefined){
				// 	var jpp = $scope.item.jenisPasien.namaRekanan;
				// };
				// if($scope.item.namaReg != undefined){
				// 	var npp = $scope.item.namaReg;
				// };
				// if($scope.item.status != undefined){
				// 	var sttt = $scope.item.status.namaStatus;
				// };

				// if($scope.item.jenisPenjamin != undefined){
				// 	var jenisPenjaminID = $scope.item.jenisPenjamin.id;
				// };
				// if($scope.item.jenisPenjamin != undefined){
				// 	var jenisPenjaminNM = $scope.item.jenisPenjamin.kelompokpasien;
				// };

				// if($scope.item.jenisPasien != undefined){
				// 	var jenisPasienID = $scope.item.jenisPasien.id;
				// };
				// if($scope.item.jenisPasien != undefined){
				// 	var jenisPasienNM = $scope.item.jenisPasien.namarekanan;
				// };

				var chacePeriode = '' + ":" + $scope.dataSelected.noPosting + ":" + '' + ":" + '' + ":" + ''  + ":" 
					+ ''  + ":" + ''  
					+ ":" + ''  + ":" + ''  + ":" + 'as@epic'
				cacheHelper.set('periodeTransaksiPencatatanPiutangDaftarLayanan', chacePeriode);

				var obj = {
					splitString : "a s @ e p i c "
				}

				$state.go('CollectingPiutang', {
						dataFilter: JSON.stringify(obj)
					});
			}

			$scope.cariData = function(){
				//SIMPAN CAHCE
				$scope.isRouteLoading=true;
				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				if($scope.item.namaCollector != undefined){
					var npp = $scope.item.namaCollector;
				};
				if($scope.item.status != undefined){
					var sttt = $scope.item.status.namaStatus;
				};
				if($scope.item.noCollect != undefined){
					var npps = $scope.item.noCollect;
				};
				var chacePeriode = tglAwal1 + "~" + tglAkhir1 + "~" + npp + "~" + sttt + "~" + npps;
				cacheHelper.set('filterDataParams', chacePeriode);
				/////END

				///FILTER DATA
				var np = "&namaPasien=" + $scope.item.namaCollector;
				if($scope.item.namaCollector == undefined){
					var np = "";
				};
				var nps = "&noposting=" + $scope.item.noCollect;
				if($scope.item.noCollect == undefined){
					var nps = "";
				};
				var stt =""
				if($scope.item.status != undefined){
					var stt ="&status=" + $scope.item.status.namaStatus;
				};
				
				modelItemAkuntansi.getDataTableTransaksi("piutang/daftar-collected-piutang-layanan?tglAwal=" + tglAwal1 + "&tglAkhir=" + tglAkhir1 + np + nps + stt).then(function(data) {
					$scope.isRouteLoading=false;
					for (var i = 0; i < data.length; i++) {
						data[i].sisa =parseFloat(data[i].totalKlaim) - parseFloat(data[i].totalSudahDibayar);
					}
					$scope.dataSource2=data;

				});
				/////END
			};
			///END/// //ON CLICK tombol CARI

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			}

			$scope.columnPencatatanPiutang = [
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
				"field": "kelompokpasien",
				"title": "Kelompok Pasien"
			},
			{
				"field": "namarekanan",
				"title": "Penjamin"
			},
			{
				"field": "jlhPasien",
				"title": "Total Pasien"
			},
			{
				"field": "totalKlaim",
				"title": "Total Klaim",
				"template": "<span class='style-right'>{{formatRupiah('#: totalKlaim #', 'Rp.')}}</span>"
			},
			{
				"field": "totalSudahDibayar",
				"title": "Total Sudah Dibayar",
				"template": "<span class='style-right'>{{formatRupiah('#: totalSudahDibayar #', 'Rp.')}}</span>"
			},
			{
				"field": "status",
				"title": "Status"
			}
			];
			// $scope.mainGridOptions = { 
   //              pageable: true,
   //              columns: $scope.columCollecting,
   //              editable: "popup",
   //              selectable: "row",
   //              scrollable: false
   //          };

 

			$scope.detail = function(){
				$scope.changePage("DetailCollectingPiutang");
			};
			$scope.changePage = function(stateName){
				if($scope.dataSelected.noPosting != undefined)
				{
					var obj = {
						splitString : $scope.dataSelected.noPosting + "~..:."
					}

					$state.go(stateName, {
						dataCollect: JSON.stringify(obj)
					});
				}
				else
				{
					alert("Silahkan pilih data Collector terlebih dahulu");
				}
			};

			$scope.kps = function(){
				if($scope.dataSelected.noPosting != undefined)
				{
					$state.go('KartuPiutangPasien', {
						id: $scope.dataSelected.idrekanan,
					});
				}else
				{
					alert("Silahkan pilih data Collector terlebih dahulu");
				}
			}

			$scope.bayar = function(){
				if($scope.dataSelected.noPosting != undefined)
				{
					$state.go('PembayaranPiutangPerusahaan', {
						noposting: $scope.dataSelected.noPosting,
					});
				}else
				{
					alert("Silahkan pilih data Collector terlebih dahulu");
				}
			}
			// $scope.collector = [{
			// 	id: 1,
			// 	collector: "neng eci"
			// },{
			// 	id: 2,
			// 	collector : "neng evi"
			// },{
			// 	id: 3,
			// 	collector: "neng nenden"
			// }];
			// var autocomplete = $("#collect").kendoAutoComplete({
			// 	dataTextField: "collector",
			// 	dataValueField: "id",
   //              dataSource: $scope.collector,
   //              height: 600
   //          }).data("kendoAutoComplete");
          ////////////////////////////////////////////////////////////

		}
]);
});