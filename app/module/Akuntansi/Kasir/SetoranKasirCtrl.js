//Owari Start here....
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SetoranKasirCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','$state','DateHelper','ManageKasir',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,$state,dateHelper,manageKasir) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item={};
			debugger;
			$scope.dataParams = JSON.parse($state.params.dataFilter);
			var dariSini = "";
			var dataLoad = {};
			if($scope.dataParams.splitString != undefined){
				var strFilter = $scope.dataParams.splitString;
				var arrFilter= strFilter.split('~');

				dariSini = arrFilter[0];
				$scope.item.idPegawai = arrFilter[1];
				$scope.item.tanggalAwal =dateHelper.formatDate(new Date(arrFilter[2]),"YYYY-MM-DD");
				$scope.item.tanggalAkhir =dateHelper.formatDate(new Date(arrFilter[3]),"YYYY-MM-DD");
				$scope.item.tanggal =dateHelper.formatDate($scope.now,"YYYY-MM-DD");
				$scope.item.jenisSetoran = "Setoran Kasir";
			};

			modelItemAkuntansi.getDataTableTransaksi("/setoran-kasir?id=" + $scope.item.idPegawai + "&tglAwal=" 
				+ $scope.item.tanggalAwal + "&tglAkhir=" + $scope.item.tanggalAkhir).then(
				function(data){
					$scope.dataLoad = data;
					$scope.item.idPegawai = $scope.dataLoad.id;
					$scope.item.namaPegawai = $scope.dataLoad.namaPegawai;
					$scope.item.jumlah = "Rp. " + parseFloat($scope.dataLoad.totalSetor).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
				});

			modelItemAkuntansi.getDataGlobal("valet/terbilang/"+ $scope.item.jumlah).then(
                function(data){
                	$scope.item.terbilang = data.terbilang;
                })

			$scope.Bayar = function(){
				debugger;
				var dataObjPost = {};
				dataObjPost = {
					id: $scope.dataLoad.id,
					totalSetor: $scope.dataLoad.totalSetor,
					keterangan: $scope.item.keterangan,
					jenisTransaksi: $scope.item.jenisSetoran,
					tglAwal: $scope.item.tanggalAwal,
					tglAkhir: $scope.item.tanggalAkhir

					// POST
					// {
					// "id":434,
					// "totalSetor":1000000,
					// "keterangan":"setoran tunai",
					// "jenisTransaksi":"SetoranKasir",
					// "tglAwal":"2017-01-01",
					// "tglAkhir":"2017-01-01"
					// }
				}
				manageKasir.setoran(dataObjPost).then(function(e) {
				})
				Kembali();
			};

			function showButton(){
				$scope.showBtnBack = true;
				$scope.showBtnBayar = true;
				$scope.showBtnCetak = true;
			};
			showButton();
			$scope.Back = function(){
				Kembali()
			};

			function Kembali(){
				$state.go(dariSini)	
			};

//////////////////////////- TAMAT -///////////////////////////////

		}
		]);
});