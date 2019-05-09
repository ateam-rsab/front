define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarSetoranKasirBendaharaPenerimaanCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','$state','DateHelper','CacheHelper',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,$state,dateHelper,cacheHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item={};

			$scope.item.tglAwal = $scope.now;
			$scope.item.tglAkhir = $scope.now;

			function showButton(){
				$scope.showBtnCetak = true;
				$scope.showBtnDetail = true;
			};
			showButton();
			
			var tglAwal = dateHelper.formatDate($scope.item.tglAwal,"YYYY-MM-DD") ;
			var tglAkhir = dateHelper.formatDate($scope.item.tglAkhir,"YYYY-MM-DD") ;

			loadCache();
			loadData();

			function simpanCache(){
				//SIMPAN CAHCE
				var tglAwal1=dateHelper.formatDate($scope.item.tglAwal,"YYYY-MM-DD");
				var tglAkhir1=dateHelper.formatDate($scope.item.tglAkhir,"YYYY-MM-DD");
				if($scope.item.namaKasir != undefined){
					var npp = $scope.item.namaKasir;
				};
				var chaceFilter = tglAwal1 + "~" + tglAkhir1 + "~" + npp + "~"
				cacheHelper.set('filterHistory', chaceFilter);
				///END
			};
			function loadCache(){
				//ON LOAD with Params
				var chaceFilter = cacheHelper.get('filterHistory');
				if(chaceFilter != undefined){
					var arrPeriode = chaceFilter.split('~');
					$scope.item.tglAwal = new Date(arrPeriode[0]);
					$scope.item.tglAkhir = new Date(arrPeriode[1]);

					if (arrPeriode[2] != "undefined"){
						$scope.item.namaKasir = arrPeriode[2];
					};

					loadData()
				}
				else
				{
					$scope.item.tanggalAwal = $scope.now;
					$scope.item.tanggalAkhir = $scope.now;
					$scope.item.namaKasir = "";
				};
				///END/// ON LOAD with Params
			};


			function loadData(){
				debugger;
				var namaKsr = ""
				if($scope.item.namaKasir != ""){
					namaKsr = $scope.item.namaKasir
				};
				modelItemAkuntansi.getDataTableTransaksi("kasir/daftar-setoran-kasir?tglAwal=" +  tglAwal+ "&tglAkhir=" + tglAkhir + "&namaKasirLike=" + namaKsr).then(function(data) {
					$scope.dataSource=data;
				});
			}

			$scope.columnGrid = [
			{
				"field": "noSetor",
				"title": "No Struk",
				"width":"50px",
				"template": "<span class='style-center'>#: noSetor #</span>"
			},
			{
				"field": "tglSetor",
				"title": "Tanggal Struk",
				"width":"100px",
				"template": "<span class='style-center'>#: tglSetor #</span>"
			},
			{
				"field": "namaPegawai",
				"title": "Nama Pegawai",
				"width":"200px"
			},
			{
				"field": "tglAwal",
				"title": "Tanggal Awal",
				"width":"150px",
				"template": "<span class='style-center'>#: tglAwal #</span>"
			},
			{
				"field": "tglAkhir",
				"title": "Tanggal Akhir",
				"width":"150px",
				"template": "<span class='style-center'>#: tglAkhir #</span>"
			},
			{
				"field": "totalSetor",
				"title": "Total",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: totalSetor #', 'Rp. ')}}</span>"
			}
			];

			$scope.SearchData = function(){
				loadData();
				simpanCache()
			};

			$scope.Detail = function(){
				$scope.changePage("DetailSetoranKasir");
			};
			$scope.changePage = function(stateName){
				var noSetorr = "No Data !!~No Data !!~No Data !!~No Data !!~No Data !!~No Data !!~No Data !!~"
				if($scope.dataSelected != undefined)
				{
					noSetorr = $scope.dataSelected.noSetor + "~" + $scope.dataSelected.tglSetor  + "~" + 
					$scope.dataSelected.idPegawai  + "~" + $scope.dataSelected.namaPegawai  + "~" + 
					$scope.dataSelected.tglAwal  + "~" + $scope.dataSelected.tglAkhir  + "~" + $scope.dataSelected.totalSetor + "~"
				}
				var obj = {
						//splitString : "DaftarSetoranKasirBendaharaPenerimaan" + "~00001" //+ $scope.dataSelected.noSetor + "~..:."
					splitString : "DaftarSetoranKasirBendaharaPenerimaan" + "~" + noSetorr + "~..:."
				}

				$state.go(stateName, {
					dataFilter: JSON.stringify(obj)
				});

				// else
				// {
				// 	//alert("Silahkan pilih data Kasir terlebih dahulu");
				// }
			};
			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			}
//////////////////////////////////// -TAMAT- /////////////////////////////////////////
}
]);
});