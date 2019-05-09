define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('AlatSOPCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService',
		function($rootScope, $scope, ModelItem, IPSRSService) {
			ModelItem.get("IPSRS/AlatSOP").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;

				IPSRSService.getItem("/ipsrs-data-alat/get-all-registrasi-aset", true).then(function(dat){
				debugger
					$scope.listAset = dat.data.data.listRegistrasiAset;
					//debugger;
				});

				$scope.autoComplite = function () {
					debugger
					var noRec = $scope.item.pencarianNamaBarang.noRec
					IPSRSService.getItem("ipsrs-data-alat/get-one-registrasi-aset?noRec="+noRec, true).then(function(dat){
					// $scope.dataAset = dat.data.data.registrasiAset;
					// $scope.item.noRegistrasiAsset = dat.data.data.registrasiAset.noRegisterAset;
					// $scope.item.kodeAspak = dat.data.data.registrasiAset.kdAspac;
					// $scope.item.kodeBmn = dat.data.data.registrasiAset.kdBmn;
					// $scope.item.kodeRsabhk = dat.data.data.registrasiAset.kdRsabhk;
					// $scope.item.kodeBmn = dat.data.data.registrasiAset.noRegisterAset;
					// $scope.item.namaBarang = dat.data.data.registrasiAset.namaProduk;
					// $scope.item.merk = dat.data.data.registrasiAset.noRegisterAset;
					// $scope.item.type = dat.data.data.registrasiAset.noRegisterAset;
					// $scope.item.qty = dat.data.data.registrasiAset.noRegisterAset;
					// $scope.item.satuan = dat.data.data.registrasiAset.noRegisterAset;
					// $scope.item.kelompokAsset = dat.data.data.registrasiAset.noRegisterAset;
					// $scope.item.lokasiAsset = dat.data.data.registrasiAset.noRegisterAset;
					// $scope.item.kondisiAsset = dat.data.data.registrasiAset.noRegisterAset;
					// $scope.item.sumberDana = dat.data.data.registrasiAset.noRegisterAset;
					// $scope.item.noSeri = dat.data.data.registrasiAset.noRegisterAset;
					// $scope.item.dayaListrik = dat.data.data.registrasiAset.noRegisterAset;

					$scope.dataAset = dat.data.data.registrasiAset;
					$scope.item.noRegistrasiAsset = dat.data.data.registrasiAset.noRegisterAset;
					$scope.item.kodeAspak = dat.data.data.registrasiAset.kdAspac;
					$scope.item.kodeBmn = dat.data.data.registrasiAset.kdBmn;
					$scope.item.kodeRsabhk = dat.data.data.registrasiAset.kdRsabhk;
					$scope.item.kodeBmn = dat.data.data.registrasiAset.kodeBmn;
					$scope.item.namaBarang = dat.data.data.registrasiAset.namaProduk;
					$scope.item.merk = dat.data.data.registrasiAset.namaMerkProduk;
					$scope.item.type = dat.data.data.registrasiAset.namaTypeProduk;
					$scope.item.qty = dat.data.data.registrasiAset.qtyProdukAset;
					$scope.item.satuan = dat.data.data.registrasiAset.hargaSatuanRevaluasi;
					$scope.item.kelompokAsset = dat.data.data.registrasiAset.kelompokAsetId;
					//$scope.item.lokasiAsset = dat.data.data.registrasiAset.noRegisterAset;
					//$scope.item.kondisiAsset = dat.data.data.registrasiAset.noRegisterAset;
					//$scope.item.sumberDana = dat.data.data.registrasiAset.noRegisterAset;
					$scope.item.noSeri = dat.data.data.registrasiAset.noSeri;
					//$scope.item.dayaListrik = dat.data.data.registrasiAset.noRegisterAset;
				});
				}
				$scope.datahistoryAlat = new kendo.data.DataSource({
 					pageSize: 5,
			        data: [
			        {tanggalServiceAlat:"23 September 2016", namaPemeliharaan:"Cek Plugger"},
			        {tanggalServiceAlat:"24 September 2016", namaPemeliharaan:"Cek Perkakas"},
			        {tanggalServiceAlat:"25 September 2016", namaPemeliharaan:"Cek Ditektor"}
			        ],
			        autoSync: true
			    });

				$scope.historyAlat = {
			        dataSource: $scope.datahistoryAlat,
			        pageable: false,
			        columns: [
			          	{
							field: "tanggalServiceAlat",
							title: "Tanggal Service Alat",
							width: 100
						},
						{
							field: "namaPemeliharaan",
							title: "Nama Pemeliharaan",
							width: 100
						}],
			    	editable: false
		      	};
		      	$scope.datasertifikatKalibrasi = new kendo.data.DataSource({
 					pageSize: 5,
			        data: [
			        {tanggalKalibrasi:"23 September 2016", nomorSertifikat:"0000000001", sertifikat:"Download Sertifikat"},
			        {tanggalKalibrasi:"24 September 2016", nomorSertifikat:"0000000002", sertifikat:"Download Sertifikat"},
			        {tanggalKalibrasi:"25 September 2016", nomorSertifikat:"0000000003", sertifikat:"Download Sertifikat"}
			        ],
			        autoSync: true
			    });

				$scope.sertifikatKalibrasi = {
			        dataSource: $scope.datasertifikatKalibrasi,
			        pageable: false,
			        columns: [
			          	{
							field: "tanggalKalibrasi",
							title: "Tanggal Kalibrasi",
							width: 75
						},
						{
							field: "nomorSertifikat",
							title: "Nomor Sertifikat",
							width: 75
						},
						{
							field: "sertifikat",
							title: "Sertifikat",
							width: 75
						}],
			    	editable: false
		      	};

		      	$scope.dataserviceManual = new kendo.data.DataSource({
 					pageSize: 5,
			        data: [
			        {tanggalService:"23 September 2016", nomorSertifikat:"0000000001", sertifikat:"Download Manual Book"},
			        {tanggalService:"24 September 2016", nomorSertifikat:"0000000002", sertifikat:"Download Manual Book"},
			        {tanggalService:"25 September 2016", nomorSertifikat:"0000000003", sertifikat:"Download Manual Book"}
			        ],
			        autoSync: true
			    });

				$scope.serviceManual = {
			        dataSource: $scope.dataserviceManual,
			        pageable: false,
			        columns: [
			          	{
							field: "tanggalService",
							title: "Tanggal Service",
							width: 75
						},
						{
							field: "nomorSertifikat",
							title: "Nomor Sertifikat",
							width: 75
						},
						{
							field: "sertifikat",
							title: "Sertifikat",
							width: 75
						}],
			    	editable: false
		      	};

		      	$scope.datasop = new kendo.data.DataSource({
 					pageSize: 5,
			        data: [
			        {daftarSOP:"Doownload SOP 1"},
			        {daftarSOP:"Doownload SOP 2"},
			        {daftarSOP:"Doownload SOP 3"}

			        ],
			        autoSync: true
			    });

				$scope.sop = {
			        dataSource: $scope.datasop,
			        pageable: false,
			        columns: [
			          	{
							field: "daftarSOP",
							title: "Daftar SOP",
							width: 75
						}],
			    	editable: false
		      	};

		      	$scope.UploadHistoryAlat = function(){

		      	}

		      	$scope.UploadSertifikatKalibrasi = function(){

		      	}

		      	$scope.UploadServiceManual = function(){

		      	}

		      	$scope.UploadSop = function(){
		      		
		      	}




		      	
			}, function errorCallBack(err) {});
			
		}
	]);
});