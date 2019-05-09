define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('UnpostingAccountCtrl', ['CacheHelper','$timeout', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', '$state','DateHelper',
		function(cacheHelper,$timeout, $q, $rootScope, $scope, modelItemAkuntansi,$state,dateHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			//$scope.dataSelectedPiutang = {};
			$scope.item.tanggalAwal = $scope.now;
			$scope.item.tanggalAkhir = $scope.now;
			
			$scope.listStatus = [{"id":0,"namaStatus":"Unposting"},{"id":1,"namaStatus":"Posting"}]
			modelItemAkuntansi.getDataTableTransaksi("akuntansi/get-jenis-transaksi/").then(function(data){
		         $scope.listJenisTransaksi =data;
		       });

			//ON LOAD with Params
			var chacePeriode = cacheHelper.get('filterDataParams');
			if(chacePeriode != undefined){
				var arrPeriode = chacePeriode.split('~');
				$scope.item.tanggalAwal = new Date(arrPeriode[0]);
				$scope.item.tanggalAkhir = new Date(arrPeriode[1]);

				if (arrPeriode[2] != "undefined"){
					$scope.item.namaCollector = arrPeriode[2];
				};
				if (arrPeriode[4] != "undefined"){
					$scope.item.status = {"namaStatus":arrPeriode[4]} ;
				}

				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				var np = ""
				if($scope.item.jenistransaksi != undefined){
					var np = "&jenistransaksi=" + $scope.item.jenistransaksi.jenistransaksi;
				};
				var stt =""
				if($scope.item.status != undefined){
					var stt ="&status=" + $scope.item.status.id;
				};
				modelItemAkuntansi.getDataTableTransaksi("akuntansi/daftar-posting-jurnal?tglAwal=" + tglAwal1 + "&tglAkhir=" + tglAkhir1 + np + stt).then(function(data){
					$scope.dataSource2=data[0];
					for (var i = 0; i < $scope.dataSource2.length; i++) {
						$scope.dataSource2[i].tanggal2 = dateHelper.formatDate($scope.dataSource2[i].tanggal,"YYYY-MM-DD hh:mm");
						if ($scope.dataSource2[i].status == 0) {
							$scope.dataSource2[i].status2 = "Unposting"
						} else {
							$scope.dataSource2[i].status2 = "Posting"
						}
					}
				});

			}
			else
			{
				$scope.item.tanggalAwal = $scope.now;
				$scope.item.tanggalAkhir = $scope.now;
			};
			///END/// ON LOAD with Params

			//ON CLICK tombol CARI
			$scope.cariData = function(){
				//SIMPAN CAHCE
				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				if($scope.item.namaCollector != undefined){
					var npp = $scope.item.namaCollector;
				};
				if($scope.item.status != undefined){
					var sttt = $scope.item.status.namaStatus;
				};
				var chacePeriode = tglAwal1 + "~" + tglAkhir1 + "~" + npp + "~" + sttt;
				cacheHelper.set('filterDataParams', chacePeriode);
				/////END

				///FILTER DATA
				var np = ""
				if($scope.item.jenistransaksi != undefined){
					var np = "&jenistransaksi=" + $scope.item.jenistransaksi.jenistransaksi;
				};
				var stt =""
				if($scope.item.status != undefined){
					var stt ="&status=" + $scope.item.status.id;
				};
				modelItemAkuntansi.getDataTableTransaksi("akuntansi/daftar-posting-jurnal?tglAwal=" + tglAwal1 + "&tglAkhir=" + tglAkhir1 + np + stt).then(function(data) {
					$scope.dataSource2=data[0];
					for (var i = 0; i < $scope.dataSource2.length; i++) {
						$scope.dataSource2[i].tanggal2 = dateHelper.formatDate($scope.dataSource2[i].tanggal,"YYYY-MM-DD hh:mm");
						if ($scope.dataSource2[i].status == 0) {
							$scope.dataSource2[i].status2 = "Unposting"
						} else {
							$scope.dataSource2[i].status2 = "Posting"
						}
					}
				});
				/////END
			};
			///END/// //ON CLICK tombol CARI

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			}

			$scope.columnPencatatanPiutang = [
			{
				"field": "tanggal2",
				"title": "Tanggal"
			},
			{
				"field": "jenistransaksi",
				"title": "Jenis Transaksi"
			},
			{
				"field": "noreff",
				"title": "No Referensi"
			},
			{
				"field": "status2",
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

 

			$scope.Posting = function(){
				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				var jnsTransaksi ="";
				if ($scope.item.jenistransaksi != undefined) {
					jnsTransaksi ="&jenistransaksi=" + 	$scope.item.jenistransaksi.jenistransaksi
				}
				modelItemAkuntansi.getDataTableTransaksi("akuntansi/posting-jurnal?tglAwal=" + tglAwal1 
					+ "&tglAkhir=" + tglAkhir1 +  jnsTransaksi).then(function(data) {
				});		
				
			};
			$scope.PostingBrs = function(){
				modelItemAkuntansi.getDataTableTransaksi("akuntansi/posting-jurnal?norec=" + $scope.dataSelected.norec).then(function(data) {
				});
			}
			$scope.UnPosting = function(){
				var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
				var jnsTransaksi ="";
				if ($scope.item.jenistransaksi != undefined) {
					jnsTransaksi ="&jenistransaksi=" + 	$scope.item.jenistransaksi.jenistransaksi
				}
				modelItemAkuntansi.getDataTableTransaksi("akuntansi/unposting-jurnal?tglAwal=" + tglAwal1 + "&tglAkhir=" + tglAkhir1 + jnsTransaksi ).then(function(data) {
				});
			};
			
          ////////////////////////////////////////////////////////////

		}
]);
});