
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KeluhanPelangganBaruCtrl', ['$rootScope', '$scope', 'ModelItem','IPSRSService','ManageSarpras','$mdDialog', '$state',
		function($rootScope, $scope, ModelItem,IPSRSService,ManageSarpras,$mdDialog,$state) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.tglorder = new moment($scope.now).format('YYYY-MM-DD');
			$scope.item.tglkeluhan = new moment($scope.now).format('YYYY-MM-DD');
			$scope.dataVOloaded = false;

	         var init = function () {
			  var nomor = 1; 
			  IPSRSService.getItem("pekerjaan/get-pekerjaan", true).then(function(dat){
				$scope.listDataPekerjaan = dat.data.data;				
			   });
			 }
	         init();

	         IPSRSService.getItem("sdm/get-login-user-permohonan-status", true).then(function(dat){
			   $scope.ruanganId = dat.data.data.idRuangan;
			 });

	         IPSRSService.getItem("service/list-generic/?view=Komunikasi&select=*", true).then(function(dat){
	             $scope.ListDataKomunikasi = dat;
			 });

			 IPSRSService.getItem("service/list-generic/?view=JenisRespon&select=*", true).then(function(dat){
	             $scope.ListDataJenisRespon = dat;
			 });
		          
		     IPSRSService.getItem("service/list-generic/?view=Ruangan&select=*", true).then(function(dat){
	             $scope.ListDataRuangan = dat;
			 });

			 IPSRSService.getItem("service/list-generic/?view=KelompokTransaksi&select=*", true).then(function(dat){
	             $scope.ListDataTransaksi = dat;
			 });		   

			 IPSRSService.getItem("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
	             $scope.ListDataPegawaiTujuan = dat.data.data.data;
			 });


			 IPSRSService.getItem("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
	             $scope.ListDataPegawaiPenerima = dat.data.data.data;
			 });

			 IPSRSService.getItem("historiPelayananCs/get-load-produk-informasi", true).then(function(dat){
	             $scope.ListDataInformasi = dat.data.data.listproduk;
			 });



				$scope.getDataPegawai = function () {
					$scope.pegawaiId = $scope.item.namaPegawai.id;
					IPSRSService.getItem("sdm/get-data-pegawai?pegawaiId="+$scope.pegawaiId, true).then(function(dat){
	            		$scope.item.jabatan = dat.data.data.jabatan;
						$scope.item.nip = dat.data.data.nip;
						$scope.item.ruangan = dat.data.data.namaRuangan;
						$scope.item.ruanganId = dat.data.data.ruanganId
			   		});
				}


				$scope.getCuti = function () {
					$scope.cutiHabis = false;
					 IPSRSService.getItem("sdm/get-data-cuti?pegawaiId="+$scope.pegawaiId+"&&statusPegawaiId="+$scope.item.statusPegawai.id+"&&kategoriPegawaiId="+$scope.item.namaPegawai.kategoriPegawaiId, true).then(function(dat){
						$scope.item.jumlahCuti = dat.data.data.jatahCuti;
						$scope.item.sisaCuti = dat.data.data.sisaCuti;
						if ($scope.item.jumlahCuti <= 0) {
							$scope.cutiHabis = true;
						} else {
							$scope.cutiHabis = false;
						}

					});
				}

				$scope.cutiHabis = false;
				$scope.dataVOloaded = true;
				$scope.disJumlahCuti = true;
				$scope.hideJumlahCuti = false;
				$scope.showJumlahCuti = function () {
					if ($scope.item.statusPegawai.id == 1) {
						$scope.hideJumlahCuti = true;
						$scope.getCuti();
						
					} else {
						$scope.hideJumlahCuti = false;
					}
				}

	          	IPSRSService.getItem("service/list-generic/?view=Komunikasi&select=*", true).then(function(dat){
						$scope.listKomunikasi = dat.komunikasi;
				});
	       
				$scope.listDataJenisKelamin = [{"id":1, "jenisKelamin":"Laki-laki"},{"id":2, "jenisKelamin":"Perempuan"}]
				
				$scope.dataSource = new kendo.data.DataSource({
					pageSize: 10,
					data: $scope.listDataMaster,
					autoSync: true,
					scrollable : true
				});
				
				 $scope.mainGridOptions = {
	              editable: "popup",
	                pageable: true,
	                 sortable: true,
	                scrollable: true,
	                height: 300,
	                selectable: "row",
	                columns: $scope.columnPermohonanPerubahanStatus,
	                
	               
	            };

		
				$scope.statusBarang = [
						{
							"id": 0,
							"name": "Belum Dikirim"
						},
						{
							"id": 1,
							"name": "Sudah Diterima"
						}
				]




			   $scope.keluhan = function(){
			   	debugger
			   	   $state.go('DaftarKeluhanPelanggan');
			   }


				$scope.klik = function(dataSelected){
					 debugger;
	            	$scope.showEdit = true;
					$scope.dataSelected = dataSelected;
					$scope.item.noRec = dataSelected.noRec;
					$scope.item.noCm = dataSelected.noCm;
					$scope.item.alamat = dataSelected.alamatCustomer;
					$scope.item.deskripsi = dataSelected.deskripsi
									 
				
				};


	            $scope.Save=function(){
	                var confirm = $mdDialog.confirm()
	                      .title('Peringatan!')
	                      .textContent('Apakah anda yakin akan menyimpan data ini?')
	                      .ariaLabel('Lucky day')
	                      .ok('Ya')
	                      .cancel('Tidak')

	                $mdDialog.show(confirm).then(function() {
	                    $scope.Simpan();
	                })
	            };

	            $scope.reset = function(){
	            $scope.item.namaPasien  = "";
				$scope.item.noRm = "";
				$scope.item.ruangan = "";
				$scope.item.alamat = "";
				$scope.item.email = "";
				$scope.item.noTlp = "";
				$scope.item.pekerjaan = "";
				$scope.item.keluhan = "";
				$scope.item.saran = "";
				$scope.item.umur = "";
				$scope.item.tglkeluhan = "";
				$scope.item.tglOrder = "";
				}



			$scope.Simpan = function () {
				debugger
	          var listRawRequired = [
			  "item.namaPasien|ng-model|Nama Pasien",
	          "item.noRm|ng-model|No RM",
	          "item.ruangan|k-ng-model|Lokasi",
	          "item.alamat|ng-model|Alamat",
	           "item.email|ng-model|Email",
	          "item.noTlp|ng-model|Nomor Telepon",
	          "item.pekerjaan|ng-model|Pekerjaan",
	          "item.keluhan|ng-model|Keluhan",
	           "item.saran|ng-model|Saran",
	          "item.umur|ng-model|Umur",
	          "item.tglkeluhan|k-ng-model|Tanggal Keluhan",
	          "item.tglOrder|k-ng-model|Tanggal Order"
	          ];
	            var isValid = ModelItem.setValidation($scope, listRawRequired);
					var data = 
					{
								"namaPasien" : $scope.item.namaPasien,
								"noRm" : $scope.item.noRm,
								"ruangan" : {"id" : 151},
								"alamat" : $scope.item.alamat,
								"email" : $scope.item.email,
								"noTlp" : $scope.item.noTlp,
								"pekerjaan" : {"id" : $scope.item.pekerjaan.id},
								"keluhan" : $scope.item.keluhan,
								"saran" : $scope.item.saran,
								"umur" : $scope.item.umur,
								"tglKeluhan" : $scope.item.tglkeluhan,
								"tglOrder" : $scope.item.tglorder
								}

						ManageSarpras.saveDataUji(data,"keluhan-pelanggan/save-keluhan-pelanggan/").then(function(e) {
						console.log(JSON.stringify(e.data));
					   });
			     }
			 }
		]);
});