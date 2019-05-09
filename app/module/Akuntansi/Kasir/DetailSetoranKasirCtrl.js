define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailSetoranKasirCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','$state','DateHelper',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,$state,dateHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item={};

			debugger;
			$scope.dataParams = JSON.parse($state.params.dataFilter);
			var dariSini = "";
			var noSetor = "";

			if($scope.dataParams.splitString != undefined){
				var strFilter = $scope.dataParams.splitString;
				var arrFilter= strFilter.split('~');

				dariSini = arrFilter[0];
				noSetor = arrFilter[1];
				// noSetorr = $scope.dataSelected.noSetor + "~" + $scope.dataSelected.tglSetor  + "~" + 
				// 			   $scope.dataSelected.idPegawai  + "~" + $scope.dataSelected.namaPegawai  + "~" + 
				// 			   $scope.dataSelected.tglAwal  + "~" + $scope.dataSelected.tglAkhir  + "~" 
				$scope.item.noStruk = noSetor;
				$scope.item.tglStruk = arrFilter[2];
				$scope.item.idKasir = arrFilter[3];
				$scope.item.namaKasir = arrFilter[4];
				$scope.item.tglAwal = arrFilter[5];
				$scope.item.tglAkhir = arrFilter[6];
				$scope.item.total = arrFilter[7];
			};


			// $scope.item.tglAwal =dateHelper.formatDate(new Date(), "YYYY-MM-DD") ;
			// $scope.item.tglAkhir = dateHelper.formatDate(new Date(), "YYYY-MM-DD") ;

			function showButton(){
				$scope.showBtnCetak = true;
				$scope.showBtnBack = true;
			};
			showButton();

			$scope.Back = function(){
				$state.go(dariSini)
			};

			loadData();
			function loadData(){
				debugger;
				var namaKsr = ""
				if(noSetor != ""){
					namaKsr = noSetor 
					modelItemAkuntansi.getDataTableTransaksi("kasir/detail-setoran-kasir?noSetor=" + namaKsr).then(function(data) {
						$scope.dataSource=data;
					});
				};
				
			}

			$scope.columnGrid = [
			{
				"field": "noRegistrasi",
				"title": "NoRegistrasi",
				"width":"100px",
				"template": "<span class='style-center'>#: noRegistrasi #</span>"
			},
			{
				"field": "noCM",
				"title": "NORM",
				"width":"50px",
				"template": "<span class='style-center'>#: noCM #</span>"
			},
			{
				"field": "tglRegistrasi",
				"title": "Tanggal Registrasi",
				"width":"100px",
				"template": "<span class='style-center'>#: tglRegistrasi #</span>"
			},
			{
				"field": "namaPasien",
				"title": "Nama Pasien",
				"width":"200px"
			},
			{
				"field": "jenisPasien",
				"title": "Jenis Pasien",
				"width":"150px",
				"template": "<span class='style-center'>#: jenisPasien #</span>"
			},
			{
				"field": "caraBayar",
				"title": "Cara Bayar",
				"width":"150px",
				"template": "<span class='style-center'>#: caraBayar #</span>"
			},
			{
				"field": "totalBayar",
				"title": "Total Bayar",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: totalBayar #', 'Rp. ')}}</span>"
			}
			];
			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			}
//////////////////////////////////// -TAMAT- /////////////////////////////////////////
}
]);
});