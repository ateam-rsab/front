define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InputTagihanNonLayananCtrl', ['$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir','CacheHelper','DateHelper',
		function($state, $q, $rootScope, $scope, modelItemAkuntansi, manageKasir,cacheHelper,dateHelper) {
			// debugger;
			//$scope.dataParams = JSON.parse($state.params.dataPasien);
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.tglStruk = new Date();
			$scope.item.jumlah =1
			$scope.item.keterangan ='-'
			var noRegistrasi2 =''
			$scope.abisSimpanKauPulanglah = true

			var dataProduk =[]

			// var data = cacheHelper.get('InputTagihanNonLayananCtrl');
   //          if (data !== undefined) {
   //              var splitResultData = data.split("#");
   //              var noRegistrasi2 = splitResultData[0]
   //              var cmdBayar = splitResultData[1]
   //              var dariSini = splitResultData[2]
   //              // $scope.item.periodeAwal = new Date(splitResultData[0]);
   //              // $scope.item.periodeAkhir = new Date(splitResultData[1]);
   //          }
			
			loadCombo();

			function loadCombo(){
				manageKasir.getDataTableTransaksi("kasir/daftar-kasir", false).then(function(data) {
				    $scope.listKelompokTransaksi = data.data.dataKP;
				})
			}

			// $q.all([
			// 	modelItemAkuntansi.getDataTableTransaksi("kasir/detail-tagihan-non-layanan/"+ noRegistrasi2 )
			// 	])
			// .then(function(data) {

			// 	if (data[0].statResponse){
			// 		$scope.item = data[0];
			// 		// $scope.item.totalTagihan = $scope.item.jumlahBayar;
			// 		// $scope.item.jumlahBayarFix = $scope.item.jumlahBayar - $scope.item.totalDeposit;
			// 		$scope.dataDaftarTagihan = new kendo.data.DataSource({
			// 			data: data[0].detailTagihan
			// 		});
			// 	}

			// });

			function showButton(){
				//$scope.showBtnCetak = true;
				// debugger;
				// $scope.showBtnBack = true;
				// if (cmdBayar == "0"){
				// 	$scope.showBtnBayar = true;
				// }
				// if (cmdBayar == "1"){
				// 	$scope.showBtnBayar = false;
				// }
				
				//$scope.showBtnTutup = true;
			}

			showButton();

			$scope.Back = function(){
				window.history.back();
				//$state.go(dariSini)
			};

			$scope.dataVOloaded = true;
			$scope.now = new Date();


			// $scope.dataDaftarTagihan = new kendo.data.DataSource({
			// 	data: []
			// });
			$scope.columnDaftarTagihan = [
			{
				"field": "no",
				"title": "No",
				"width":"30px"
			},
			{
				"field": "namaproduk",
				"title": "Tagihan",
				"width":"300px"
			},
			{
				"field": "jumlah",
				"title": "Qty",
				"width":"50px"
			},
			{
				"field": "harga",
				"title": "Harga",
				"width":"100px"
			},
			{
				"field": "total",
				"title": "Total",
				"width":"100px"
			}
			];
			$scope.columnDaftarProduk = [
			{
				"field": "namaproduk",
				"title": "Nama Layanan",
				"width":"300px"
			}
			];

			$scope.CariProduk = function(){

				manageKasir.getDataTableTransaksi("farmasi/get-produk-obat?namaproduk="+$scope.item.namaproduk+"&take=50", false).then(function(data) {
				    $scope.dataDaftarProduk = data.data.data;
				})
			}

			$scope.tambah = function(){
				if ($scope.dataSelectedProduk == undefined) {
					alert("pilih produk terlebih dahulu !!")
					return;
				}
				var no =0
				if (dataProduk.length == 0) {
					no=1
				}else{
					no=dataProduk.length+1
				}

				if ($scope.item.no != undefined) {
					no=$scope.item.no 
				}
				var data ={};
				if ($scope.item.no != undefined) {//LAMA
					for (var i = dataProduk.length - 1; i >= 0; i--) {
	                    if (dataProduk[i].no ==  $scope.item.no){
	                        data.no = $scope.item.no

	                        data.id = $scope.dataSelectedProduk.id
	                        data.namaproduk = $scope.dataSelectedProduk.namaproduk
	                        data.jumlah =parseFloat($scope.item.jumlah)
	                        data.harga = parseFloat($scope.dataSelectedProduk.harga)
	                        data.total = parseFloat($scope.item.jumlah) * parseFloat($scope.dataSelectedProduk.harga)

	                        dataProduk[i] = data;
	                        $scope.dataDaftarTagihan = new kendo.data.DataSource({
	                            data: dataProduk
	                        });
	                        var subTotal = 0 ;
	                        for (var i = dataProduk.length - 1; i >= 0; i--) {
	                            subTotal=subTotal+ parseFloat(dataProduk[i].total)
	                        }
	                        $scope.item.totalBilling=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

	                    }
	                    // break;
	                }
				}else{//BARU
					data={
	                        no:no,
	                        id:$scope.dataSelectedProduk.id,
	                        namaproduk:$scope.dataSelectedProduk.namaproduk,
	                        jumlah:parseFloat($scope.item.jumlah),
	                        harga:parseFloat($scope.dataSelectedProduk.harga),
	                        total: parseFloat($scope.item.jumlah) * parseFloat($scope.dataSelectedProduk.harga)
	                    }
	                dataProduk.push(data)
	                // $scope.dataGrid.add($scope.dataSelectedProduk)
	                $scope.dataDaftarTagihan = new kendo.data.DataSource({
	                    data: dataProduk
	                });
	                var subTotal = 0 ;
	                for (var i = dataProduk.length - 1; i >= 0; i--) {
	                    subTotal=subTotal+ parseFloat(dataProduk[i].total)
	                }
	                $scope.item.totalBilling=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
				}
			}

			//$scope.simpan = function(){
			function simpan(){
				
				
			}

			$scope.bayar = function(){
				if (dataProduk.length == 0) {
					alert("Pilih produk terlebih dahulu !")
				}
				if ($scope.item.kelompokTransaksi == undefined) {
					alert("Pilih kelompok transaksi terlebih dahulu !")	
				}
				if ($scope.item.namaPasien_klien == undefined) {
					alert("Isi Nama Pelanggan terlebih dahulu !")	
				}
				var subTotal = 0 ;
				for (var i = dataProduk.length - 1; i >= 0; i--) {
	                    subTotal=subTotal+ parseFloat(dataProduk[i].total)
	                }
				
				var objSave ={
					norec:'-',
					kelompoktransaksifk:$scope.item.kelompokTransaksi.id,
					keteranganlainnya:$scope.item.keterangan,
					namapasien_klien:$scope.item.namaPasien_klien,
					tglstruk:moment($scope.item.tglStruk).format('YYYY-MM-DD hh:mm:ss'),
					totalharusdibayar:parseFloat(subTotal),
					details:dataProduk

				}
				manageKasir.postinputnonlayanan(objSave).then(function(data) {
				    noRegistrasi2 = data.data.data.norec
					$scope.changePage("PenerimaanPembayaranKasir");
				})
				
			}

			$scope.changePage = function(stateName){
				debugger;
				var obj = {
					pageFrom: "InputTagihanNonLayanan",
            		noRegistrasi : noRegistrasi2
            	}

                $state.go(stateName, {
                   dataPasien: JSON.stringify(obj)
                });
			}

			$scope.Tutup = function(){
				
			}

		}
		]);
});