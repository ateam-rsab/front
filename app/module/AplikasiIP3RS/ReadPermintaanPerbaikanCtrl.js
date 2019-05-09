define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ReadPermintaanPerbaikanCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', '$state', 'DateHelper','$mdDialog',
		function($rootScope, $scope, ModelItem, IPSRSService, $state, DateHelper,$mdDialog) {		
			$scope.item = {};
			$scope.noew = new Date()
			// $scope.item.tanggalDiperiksa = $scope.noew;
			$scope.dataVOloaded = true;
			$scope.pihakLuar = false;
			$scope.btnPihakLuar = true;	
			$scope.btnTdkPihakLuar = false;
			$scope.item.UserPemesan = $state.params.userPemesan;
			$scope.showTeknisiPihakLuar = function () {
				$scope.pihakLuar = true;
				$scope.btnTdkPihakLuar = true;
				$scope.btnPihakLuar = false;
			};
			$scope.hideTeknisiPihakLuar = function () {
				$scope.pihakLuar = false;
				$scope.btnTdkPihakLuar = false;
				$scope.btnPihakLuar = true;
			};
			var init = function () {
				IPSRSService.getItem("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function(dat){
					$scope.ruangan = dat.data.namaRuangan;
					$scope.idRuangan = dat.data.id;
					if ($scope.idRuangan == 229) {
						$scope.verifPekerjaan = false;
						$scope.admin = true;
						$scope.user = false
					} else {
						$scope.verifPekerjaan = true;
						$scope.admin = false;
						$scope.user = true
					}
				});	
			}
			$scope.dataNoAsset = [
				{id : 1, noAsset : "1740000000014"},
				{id : 2, noAsset : "1740000000015"},
				{id : 3, noAsset : "1740000000016"},
				{id : 4, noAsset : "1740000000017"},
				{id : 5, noAsset : "1740000000018"},
				{id : 6, noAsset : "1740000000019"},
				{id : 7, noAsset : "1740000000020"}
			]
			init();
			$scope.showGreen = false;
			$scope.showRed = false;
			IPSRSService.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
				$scope.dataMasterTeknisi = dat.data;
			});	
			IPSRSService.getItem("service/list-generic/?view=StatusPekerjaan&select=*", true).then(function(dat){
				$scope.dataStatusPekerjaan = dat.data;
			});	
			IPSRSService.getItem("psrsPermintaanPerbaikan/get-kontrak", true).then(function(dat){
				$scope.dataRekanan = dat.data.data;
			});	
			IPSRSService.getItem("service/list-generic/?view=JenisPekerjaan&select=*", true).then(function(dat){
				$scope.dataJenisPekerjaan = dat.data;
			});	
			IPSRSService.getItem("service/list-generic/?view=AsalSukuCadang&select=*", true).then(function(dat){
				$scope.dataAsalSukuCadang = dat.data;
			});
			IPSRSService.getItem("service/list-generic/?view=RekananSkKontrakDetail&select=*", true).then(function(dat){
				$scope.dataDetailRekanan = dat.data;
			});
			$scope.getDetail = function () {
				IPSRSService.getItem("psrsPermintaanPerbaikan/get-kontrak-detail?noRec="+$scope.item.namaPt.noRec, true).then(function(dat){
					$scope.dataDetailRekanan = dat.data.data;
				});	
			}
			IPSRSService.getItem("psrsPermintaanPerbaikan/pre-add-perbaikan?noRec="+$state.params.noRec, true).then(function(dat){
				$scope.dataSource = dat.data;
				var tanggal = new Date($scope.dataSource.header.tanggalOrder);
				$scope.item.noOrder = $scope.dataSource.header.noOrder;
				$scope.item.tanggalOrder = DateHelper.getTanggalFormatted(tanggal);
				$scope.item.noAsset = $scope.dataSource.detail.noRegisterAset;
				$scope.item.namaBarang = $scope.dataSource.detail.namaProduk;
				$scope.item.merkBarang = $scope.dataSource.detail.merkProduk;
				$scope.item.noSeri = $scope.dataSource.detail.noSeri;
				$scope.item.type = $scope.dataSource.detail.typeProduk;
				// $scope.item.namaTeknisi = $scope.dataSource.header.namaTeknisi;
				if (dat.data.selisih <= 15 ){
					$scope.showGreen = true;
					$scope.showRed = false;
					$scope.item.warning = "Waktu Kedatangan "+dat.data.selisih+" Menit";
				} else {
					$scope.showGreen = false;
					$scope.showRed = true;
					$scope.item.warning = "Waktu Kedatangan "+dat.data.selisih+" Menit";
				}
				$scope.teknisi=[];
				$scope.displayTeknisi = [];
				$scope.dataTeknisi = $scope.dataSource.teknisi;
				for(var i=0; i<$scope.dataTeknisi.length;i++){
					var data= {
						"noRec":$scope.dataTeknisi[i].noRec,
			      		"pegawai":{
			      			"id":$scope.dataTeknisi[i].idPegawai
			      		}
					};
					var dataText= {
						"noRec":$scope.dataTeknisi[i].noRec,
			      		"namaLengkap":$scope.dataTeknisi[i].namaPegawai
					}
					$scope.teknisi.push(data);
					$scope.displayTeknisi.push(dataText);	
				};
				console.log(JSON.stringify($scope.displayTeknisi));
				$scope.item.keterangan = $scope.dataSource.planing.keterangan;
				$scope.item.analisaKerusakan = $scope.dataSource.planing.analisaKerusakan;
				$scope.item.statusPekerjaan = {
					"id":$scope.dataSource.planing.statusPekerjaanId,
				    "statusPekerjaan":$scope.dataSource.planing.statusPekerjaan
				};
				$scope.item.keteranganRespon = $scope.dataSource.planing.keteranganRespon;
				$scope.item.jenisKerusakan = $scope.dataSource.planing.jenisKerusakan;
				if ($scope.dataSource.planing.tanggalDiperiksa == 0) {
					$scope.item.tanggalDiperiksa = new Date();
				} else {
					var tanggalDiperiksa = new Date($scope.dataSource.planing.tanggalDiperiksa);
					$scope.item.tanggalDiperiksa = DateHelper.getTanggalFormattedNew(tanggalDiperiksa);
				}
				$scope.item.namaTeknisiPihakLuar = $scope.dataSource.planing.namaRekanan;
				$scope.item.asalSukuCadang = $scope.dataSource.planing.sukuCadangId;
				$scope.item.jenisPekerjaan = $scope.dataSource.planing.sukuCadangId;
			});	
			$scope.arrTeknisi = [];
			
			/*$scope.addTeknisi = function (data) {
				var newData = {
					"noRec":"",
					"pegawai":{
						"id": $scope.item.teknisi[data].id
					}
				}
				$scope.teknisi.push(newData);
				console.log(JSON.stringify($scope.teknisi));

			};*/
			
			$scope.tambahTeknisi = function () {
				var data = {
					"noRec":"",
					"pegawai":{
						"id": ""
					}
				}
				$scope.arrTeknisi.push(data);
				console.log(JSON.stringify($scope.item.teknisi));
			}
			
			$scope.insertTeknisi = function () {
				for(var i=0; i<$scope.arrTeknisi.length;i++){
					var data = {
						"noRec":"",
						"pegawai":{
							"id": $scope.item.teknisi[i].id
						}
					};
					$scope.teknisi.push(data);
				}
				console.log(JSON.stringify($scope.teknisi));
			}

			$scope.removeTeknisi = function (data) {
				$scope.arrTeknisi.pop();
				$scope.teknisi.pop();
				console.log(JSON.stringify($scope.teknisi));
				console.log(JSON.stringify($scope.arrTeknisi));
			};

			$scope.batals= function(){
			debugger
			 	$state.go("RespondPerbaikan")
			}

			$scope.popup=function(){
				debugger
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Apakah anda akan kembali ke daftar respon perbaikan?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $state.go("RespondPerbaikan")
                })
            };

			$scope.simpan=function(){
				debugger
				var listRawRequired = [
				"item.jenisKerusakan|ng-model|Jenis Kerusakan",
				"item.analisaKerusakan|ng-model|Analisa Kerusakan",
				"item.statusPekerjaan|k-ng-model|Status Pekerjaan"
				// "userPelapor|ng-model|User"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
				$scope.insertTeknisi();
				var tanggalSaveDiperiksa = new Date($scope.item.tanggalDiperiksa);
				if ($scope.btnPihakLuar == false){
					var data = 
					{
					  "keterangan": $scope.item.keterangan,
				      "rekanananSkKontrakVO": {
				      		"noRec":$scope.item.namaPt.noRec
				      },
				      "statusPekerjaan": {
				      		"id":$scope.item.statusPekerjaan.id
				      },
				      "asalSukuCadang":
					    {
					    	"id":$scope.item.asalSukuCadang
					    },
				      "teknisi": $scope.teknisi,
				      "keteranganRespon": $scope.item.keteranganRespon,
				      "jenisKerusakan": $scope.item.jenisKerusakan,
				      "rekananSkKontrakDetail": {
				      	"noRec":$scope.item.detailPekerjaan.noRec
				      },
				      "noRec": "",
				      "namaTeknisi": $scope.item.namaTeknisiPihakLuar,
				      "noRecOrder": $state.params.noRec,
				      "analisaKerusakan": $scope.item.analisaKerusakan,
				      "JenisPekerjaan": {
				      	"id":$scope.item.jenisPekerjaan
				      },
				      "tglDiperiksa": DateHelper.getTanggalFormattedNew(tanggalSaveDiperiksa)
					}
				} else {
					var data = 
					{
					  "keterangan": $scope.item.keterangan,
				      "statusPekerjaan": {
				      		"id":$scope.item.statusPekerjaan.id
				      },
				      "asalSukuCadang":
					    {
					    	"id":$scope.item.asalSukuCadang
					    },
				      "teknisi": $scope.teknisi,
				      "keteranganRespon": $scope.item.keteranganRespon,
				      "jenisKerusakan": $scope.item.jenisKerusakan,
				      "noRec": "",
				      "noRecOrder": $state.params.noRec,
				      "analisaKerusakan": $scope.item.analisaKerusakan,
				      "JenisPekerjaan": {
				      	"id":$scope.item.jenisPekerjaan
				      },
				      "tglDiperiksa": DateHelper.getTanggalFormattedNew(tanggalSaveDiperiksa)
					}
				}
				
				if(isValid.status){
					console.log(JSON.stringify(data));
					IPSRSService.saveDataSarPras(data, "psrsPermintaanPerbaikan/save-perbaikan/").then(function(e) {
					$scope.popup();
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			};
			$scope.$watch('item.jenisPekerjaan', function(newValue, oldValue) {
				if (newValue == "1") {
					$scope.item.jenisPekerjaan = 1;
				} else if(newValue == "2") {
					$scope.item.jenisPekerjaan = 2;
				} else {
					$scope.item.jenisPekerjaan = 3;
				}
			});

			$scope.$watch('item.asalSukuCadang', function(newValue, oldValue) {
				if (newValue == "1") {
					$scope.item.asalSukuCadang = 1;
				} else if(newValue == "2") {
					$scope.item.asalSukuCadang = 2;
				} else {
					$scope.item.asalSukuCadang = 3;
				}
			});
			$scope.verifikasi = function () {
				IPSRSService.getItem("psrsPermintaanPerbaikan/verifikasi-ruangan?noRecKirimProduk="+$state.params.noRecKirimProduk, true).then(function(dat){
					$scope.disVerif = true;
					window.messageContainer.log('Verifikasi Berhasil')
				});	
			}
			$scope.batal = function () {
				$state.go('RespondPerbaikan',{})
			}
		}
		]);
});