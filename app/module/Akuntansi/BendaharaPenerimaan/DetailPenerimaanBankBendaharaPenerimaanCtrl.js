define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailPenerimaanBankBendaharaPenerimaanCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'MnKeu','$state','ManageKasir','DateHelper',
		function($q, $rootScope, $scope, modelItemAkuntansi, mnKeu,$state,manageKasir,dateHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item={};

			$scope.dataParams = JSON.parse($state.params.dataFilter);
			var dariSini = "";
			var noStruk = "";
			var jenisForm = "";

			if($scope.dataParams.splitString != undefined){
				var strFilter = $scope.dataParams.splitString;
				var arrFilter= strFilter.split('~');

				dariSini = arrFilter[0];
				noStruk = arrFilter[1];
				jenisForm = arrFilter[2];
				if(jenisForm != "Detail"){
					$scope.txtDisable = false
					$scope.showBtnSimpan = true
					$scope.showJenisTransaksi1 = true
					$scope.showJenisTransaksi2 = false
					$scope.showCaraBayar1 = true
					$scope.showCaraBayar2 = false
					$scope.showNamaBank1 = true
					$scope.showNamaBank2 = false
					loadCombo();
				}
				else{
					$scope.txtDisable = true
					$scope.showBtnSimpan = false
					$scope.showJenisTransaksi1 = false
					$scope.showJenisTransaksi2 = true
					$scope.showCaraBayar1 = false
					$scope.showCaraBayar2 = true
					$scope.showNamaBank1 = false
					$scope.showNamaBank2 = true
					loadData();
				}
			};

			// $scope.$watch('item.caraBayar', function(newValue, oldValue) {
		 //       if(newValue != undefined && newValue.caraBayar == "TUNAI"){
		 //        $scope.show1 = false;
		 //        $scope.show2 = false;
		 //      }
		 //      else
		 //      {
		 //        $scope.show1 = true;
		 //        $scope.show2 = true;
		 //      }
		 //    });
		 $scope.$watch('item.caraBayar', function(newValue, oldValue) {
		 	if (newValue != oldValue  ) {
		 		$scope.caraBayarNonTunai = false
		 		if ( $scope.item.caraBayar.caraBayar != "TUNAI") {
		 			$scope.caraBayarNonTunai = true	
		 		} 
		 	}
		 });
		 $scope.handleInputBlur = function(){
		 	debugger;
		 	//if (newValue != "" && newValue.caraBayar !="" ) {
		 	var duit = $scope.item.jumlah
		 		modelItemAkuntansi.getDataGlobal("valet/terbilang/"+ duit).then(
		 			function(data){
		 				$scope.item.terbilang = data.terbilang;
		 			})
		 	//}
		 	$scope.item.jumlah = duit// parseFloat(duit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
		 }

		 // Number.prototype.format = function(n, x, s, c) {
		 // 	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
		 // 	num = this.toFixed(Math.max(0, ~~n));

		 // 	return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
		 // };


		 function loadData(){
		 	debugger;
		 	if(jenisForm == "Detail"){
		 		modelItemAkuntansi.getDataTableTransaksi("bendaharapenerimaan/daftar-penerimaan-bank?noStruk=" + noStruk).then(function(data) {
						//$scope.dataSource=data;
						$scope.item.keterangan = data[0].keterangan
						$scope.item.jumlah  = data[0].totalSetor
						$scope.item.jenisTransaksitxt  = data[0].jenisTransaksi
					});
		 	}
		 }

		 function showButton(){
		 	$scope.showBtnCetak = true;
		 	$scope.showBtnBack = true;
		 };
		 showButton();

		 function loadCombo(){
				// $scope.listJenisTransaksi=new kendo.data.DataSource({
				// 	data:[{"jenis":"Pembayaran Piutang"},{"jenis":"Setoran Kasir"},{"jenis":"Bunga"},{"jenis":"Belum teridentifikasi"}]
				// });
				mnKeu.getListGeneric("KelompokTransaksi&select=id,kelompokTransaksi&criteria=qKelompokTransaksi&values=54")
				.then(function(data){
					$scope.listJenisTransaksi=data;
				});
				mnKeu.getListGeneric("BankAccount&select=id,bankAccountNama,bankAccountNomor").then(function(data){
					$scope.listNamaBank = data;
				});
				mnKeu.getListGeneric("CaraBayar&select=id,caraBayar").then(function(data){
					$scope.listCaraBayar = data;
				});
				manageKasir.getDataGeneric("Bank&select=id,nama").then(function(data){
					$scope.listnamaBankTransfer = data;
				});
				// $scope.listnamaBankTransfer=new kendo.data.DataSource({
				// 	data:[{"nama":"Bank BRI"},{"nama":"Bank BCA"},{"nama":"Bank BNI"},{"nama":"BANK DKI"}]
				// });
			}
			$scope.Back = function(){
				$state.go(dariSini)
			}

			function Kembali(){
				$state.go(dariSini)
			}
			$scope.Save = function(){
				debugger;
				if($scope.item.jumlah == ""){
					alert("Jumlah belum diisi!");
					return;
				}
				if($scope.item.keterangan == ""){
					alert("Keterangan belum diisi!");
					return;
				}
				if($scope.item.jenisTransaksi == undefined){
					alert("Jenis Transaksi belum di pilih!");
					return;
				}
				
				if($scope.item.caraBayar == undefined){
					alert("Cara Bayar belum di pilih!");
					return;
				}else{
					if ($scope.item.caraBayar.caraBayar != 'TUNAI') {
						if($scope.item.namaBank == undefined){
							alert("Nama Bank belum di pilih!");
							return;
						}
						if($scope.item.namaBankTransfer == undefined){
							alert("Nama Bank Transfer belum di pilih!");
							return;
						}
						if($scope.item.namaKartu == ""){
							alert("Nama Pemilik Rekening belum di isi!");
							return;
						}
					}
				}
				var dataObjPost ={};
				if ($scope.item.caraBayar.caraBayar != 'TUNAI') {
					dataObjPost = {
						keterangan: $scope.item.keterangan,
						totalSetor: $scope.item.jumlah,
						jenisTransaksi: $scope.item.jenisTransaksi.id,
						caraBayar: $scope.item.caraBayar.id,
						detailBank : {
							id : $scope.item.namaBank.id,
							namaBank : $scope.item.namaBankTransfer.nama,
							namaKartu : $scope.item.namaKartu
						}
					}
				}else{
					dataObjPost = {
						keterangan: $scope.item.keterangan,
						totalSetor: $scope.item.jumlah,
						jenisTransaksi: $scope.item.jenisTransaksi.id,
						caraBayar: $scope.item.caraBayar.id,
						detailBank : 'KOSONG'
					}
				}
				manageKasir.penerimaanBank(dataObjPost).then(function(e) {
				})
				Kembali();
			}
/////////////////////////// -TAMAT- ////////////////////////////////////

}
]);
});