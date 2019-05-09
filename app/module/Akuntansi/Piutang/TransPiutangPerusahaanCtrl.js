define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TransPiutangPerusahaanCtrl', ['$q', '$rootScope', '$scope', 'ManageUC','$state','CacheHelper',
		function($q, $rootScope, $scope,manageUC,$state,cacheHelper) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			// $scope.item.tglAwal = $scope.now;
			// $scope.item.tglAkhir = $scope.now;
			LoadCache();
			function LoadCache(){
	          var chacePeriode = cacheHelper.get('TransPiutangPerusahaanCtrl');
	          if(chacePeriode != undefined){
	           //var arrPeriode = chacePeriode.split(':');
	            $scope.item.tglAwal = new Date(chacePeriode[0]);
	            $scope.item.tglAkhir = new Date(chacePeriode[1]);
	           
	            init();
	         }
	         else{
	           $scope.item.tglAwal = $scope.now;
	           $scope.item.tglAkhir = $scope.now;
	           init();
	         }
	       }
			function init() {
				var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD');
				var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD');
				manageUC.getDataTableTransaksi("piutang/laporan-transaksi-piutang-perusahaan/" + 
					tglAwal + "/" + tglAkhir, true).then(function(dat){
					for (var i = 0; i < dat.data.results.length; i++) {
						dat.data.results[i].no = i+1
					}
					$scope.listDataMaster = dat.data.results;
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});
					$scope.item.terbilang = dat.data.terbilang;
					$scope.item.total = parseFloat(dat.data.grandtotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");

				});

				var chacePeriode ={ 0 : tglAwal ,
					1 : tglAkhir,
					2 : '',
					3 : '', 
					4 : '',
					5 : '',
					6 : ''
				}
				cacheHelper.set('TransPiutangPerusahaanCtrl', chacePeriode);
			}
			$scope.cariFilter = function(){
				init();
			}


			// $scope.tambah = function(){
			// 	$state.go('Produk')
			// }
			$scope.formatTanggal = function(tanggal){
				return moment(tanggal).format('DD-MMM-YYYY');
			}


			$scope.columnProduk = [
			{
				"field": "no",
				"title": "No",
				"width" : "70px",
			},
			{
				"field": "noregistrasi",
				"title": "No. Registrasi",
				"width" : "100px",
			},
			{
				"field": "nomr",
				"title": "No.MR",
				"width" : "100px",
			},
			{
				"field": "keterangan",
				"title": "Nama Pasien",
				"width" : "200px",
			},
			{
				"field": "masuk",
				"title": "Tgl Masuk",
				"width" : "150px",
			},
			{
				"field": "keluar",
				"title": "Tgl Keluar",
				"width" : "150px",
			},
			{
				"field": "perusahaan",
				"title": "Perusahaan",
				"width" : "200px",
			},
			{
				"field": "total",
				"title": "Total",
				"width" : "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
			}
			];
			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.columnProduk,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
			$scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
//***********************************

}
]);
});
