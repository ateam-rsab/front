define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('AntrianPasienDiperiksaCtrl', ['$sce', '$state', '$q', '$rootScope', '$scope', '$window', 'ModelItemAkuntansi', 'ManageTataRekening', 'ManageKasir', 'CacheHelper',
		function ($sce, $state, $q, $rootScope, $scope, window, modelItemAkuntansi, manageTataRekening, manageKasir, cacheHelper) {
			// debugger;
			$scope.now = new Date();

			$scope.cboDokter = false;
			$scope.cboUbahDokter = true;

			$scope.dataParams = JSON.parse($state.params.dataPasien);
			// debugger;
			$scope.showBilling = false;
			//$scope.urlBilling = $sce.trustAsResourceUrl(manageTataRekening.openPageBilling($scope.dataParams.noRegistrasi));
			$scope.inputKegiatanPelayanan = () => {
				$scope.dataSelected.norec_apd = $scope.item.norec_apd;
				$scope.dataSelected.norec_pd = $scope.item.norec_pd;
				if($scope.dataSelected) {
					localStorage.setItem('dataAPD', JSON.stringify($scope.dataSelected));
					$state.go('InputKegiatanPelayananPerawat', {
						noRec: $scope.dataSelected.norec
					});
					
					return;
				}
				toastr.info("Harap pilih pasien terlebih dahulu");
			}
			$scope.item = {};
			$scope.konsul = {}
			$scope.isRouteLoading = false;
			var status = '';

			//  manageTataRekening.getDataTableTransaksi("akutansi/get-terakhir-posting", true).then(function(dat){
			//     var tgltgltgltgl = dat.data.data[0].max
			//     $scope.startDateOptions = {
			//         min: new Date(tgltgltgltgl),
			//         max: new Date($scope.now)
			//     };
			// })
			manageTataRekening.getDataTableTransaksi("akutansi/get-tgl-posting", true).then(function (dat) {
				var tgltgltgltgl = dat.data.mindate[0].max
				var tglkpnaja = dat.data.datedate
				$scope.minDate = new Date(tgltgltgltgl);
				$scope.maxDate = new Date($scope.now);
				$scope.startDateOptions = {
					disableDates: function (date) {
						var disabled = tglkpnaja;
						if (date && disabled.indexOf(date.getDate()) > -1) {
							return true;
						} else {
							return false;
						}
					}
				};
			});
			//$scope.Pegawai=modelItemAkuntansi.getPegawai();

			LoadData();
			$scope.UbahDokter = function () {
				if (!$scope.currentRowData) {
					messageContainer.error('Data belum dipilih')
				} else {
					$scope.cboDokter = true
					$scope.cboUbahDokter = false
				}
			}
			$scope.batal = function () {
				$scope.cboDokter = false
				$scope.cboUbahDokter = true
			}
			$scope.UbahRekanan = function () {
				$scope.cboRekanan = true
				$scope.cboUbahDokter = false
			}
			$scope.batalRekanan = function () {
				$scope.cboRekanan = false
				$scope.cboUbahDokter = true
			}

			// $scope.listStatus = manageKasir.getStatus();

			$scope.CariNoreg = function () {
				if ($scope.item.noRegistrasi == '') {
					return;
				}
				if ($scope.item.noRegistrasi == '0') {
					return;
				}
				if ($scope.item.noRegistrasi == undefined) {
					return;
				}
				$scope.isRouteLoading = true;

				cacheHelper.set('AntrianPasienDiperiksaNOREG', $scope.item.noRegistrasi)
				//add Akomodasi
				var objSave = {
					noregistrasi: $scope.item.noRegistrasi
				}

				manageTataRekening.saveakomodasitea(objSave).then(function (data) {
					$q.all([
						modelItemAkuntansi.getDataTableTransaksi("pelayanan/get-detail_apd?noregistrasi=" + $scope.item.noRegistrasi),
						modelItemAkuntansi.getDataTableTransaksi("pelayanan/get-data-combo-apd")
					])
						.then(function (data) {

							if (data[0].statResponse) {
								$scope.item = data[0][0];
								$scope.item.tglPulang = $scope.formatTanggal($scope.item.tglPulang);
								$scope.item.tglMasuk = $scope.formatTanggal($scope.item.tglMasuk);
								$scope.item.Noverifikasi = $scope.item.strukfk;


								// $scope.dataRincianTagihan = new kendo.data.DataSource({
								// 	data: data[0].details
								// });
							}
							if (data[1].statResponse) {
								$scope.listDokter = data[1].dokter;
								$scope.listRuanganDokter = data[1].ruangan;
								$scope.listRekanan = data[1].rekanan;
								$scope.listKelompokPasien = data[1].kelompokpasien;
							}
							$scope.isRouteLoading = false;
						});

				})
				//end akomodasi
				manageKasir.getDataTableTransaksi("tatarekening/get-detail-pasien?noregistrasi=" + $scope.item.noRegistrasi).then(function (e) {
					$scope.dataRincianTagihan = new kendo.data.DataSource({
						data: e.data
					});
				})

				manageKasir.getDataTableTransaksi("tatarekening/get-sudah-verif?noregistrasi=" + chacePeriode).then(function (e) {
					status = e.data.status;
				});
			}
			$scope.TambahObat = function () {
				//             if ($scope.item.Noverifikasi != null) {
				// 	window.messageContainer.error("Data sudah Diverifikasi");
				//                 return;
				// }
				if (status == true) {
					window.messageContainer.error("Data Sudah Diclosing, Hubungi Tatarekening!!!");
					return;
				}
				var arrStr = {
					0: $scope.item.noCm,
					1: $scope.item.namaPasien,
					2: $scope.item.jenisKelamin,
					3: $scope.item.noRegistrasi,
					4: '-',//$scope.item.umur,
					5: $scope.item.klsid2,//$scope.item.kelas.id,
					6: $scope.item.kelasRawat,//$scope.item.kelas.namakelas,
					7: $scope.item.tglMasuk,
					8: $scope.dataSelected.norec,
					9: '',
					10: $scope.item.namaPenjamin,
					11: $scope.item.jenisPasien,
					12: 0,//$scope.item.beratBadan,
					13: '-'//$scope.item.AlergiYa
				}
				if (arrStr != null) {
					cacheHelper.set('InputResepApotikCtrl', arrStr);
					cacheHelper.set('cachePemakaianOA', arrStr);
					$state.go('InputResepApotik')
				}

			}

			function LoadData() {
				// debugger;
				var chacePeriode = ''
				chacePeriode = cacheHelper.get('AntrianPasienDiperiksaNOREG');
				if (chacePeriode == '') {
					return
				}
				if (chacePeriode == undefined) {
					return
				}

				$scope.isRouteLoading = true;
				//add Akomodasi
				var objSave = {
					noregistrasi: $scope.item.noRegistrasi
				}

				manageTataRekening.saveakomodasitea(objSave).then(function (data) {
					$q.all([
						modelItemAkuntansi.getDataTableTransaksi("pelayanan/get-detail_apd?noregistrasi=" + chacePeriode),
						modelItemAkuntansi.getDataTableTransaksi("pelayanan/get-data-combo-apd")
					])
						.then(function (data) {

							if (data[0].statResponse) {
								$scope.item = data[0][0];
								$scope.item.tglPulang = $scope.formatTanggal($scope.item.tglPulang);
								$scope.item.tglMasuk = $scope.formatTanggal($scope.item.tglMasuk);
								$scope.item.Noverifikasi = $scope.item.strukfk;


								// $scope.dataRincianTagihan = new kendo.data.DataSource({
								// 	data: data[0].details
								// });
							}
							if (data[1].statResponse) {
								$scope.listDokter = data[1].dokter;
								$scope.listRuanganDokter = data[1].ruangan;
								$scope.listRekanan = data[1].rekanan;
								$scope.listKelompokPasien = data[1].kelompokpasien;
							}
							$scope.isRouteLoading = false;
						});
				})
				//end akomodasi	
				manageKasir.getDataTableTransaksi("tatarekening/get-detail-pasien?noregistrasi=" + chacePeriode).then(function (e) {
					$scope.dataRincianTagihan = new kendo.data.DataSource({
						data: e.data
					});
				})
				manageKasir.getDataTableTransaksi("tatarekening/get-data-master").then(function (e) {
					$scope.listJenisPetugas = e.data.JenisPetugasPelaksana;
					$scope.listPetugas = e.data.Pegawai;
					$scope.listRuangan = e.data.Ruangan;
				});
				manageKasir.getDataTableTransaksi("tatarekening/get-sudah-verif?noregistrasi=" + chacePeriode).then(function (e) {
					status = e.data.status;
				});

				manageTataRekening.postData('rensar/post-tindakan-nicu').then(function (e) {

				});
				//           	modelItemAkuntansi.getDataTableTransaksi("tatarekening/get-daftar-registrasi-pasien?noReg="+chacePeriode, false).then(function(data) {
				//     $scope.item.Noverifikasi = data.data.nostruk;
				// })

			}

			// function showButton(){
			// 	$scope.showBtnKembali = true;
			// 	$scope.showBtnCetak = true;
			// }

			// $scope.pilihProdukByRuangan =function(){
			//              manageKasir.getDataTableTransaksi("tatarekening/get-produkbyruangan?objectruanganfk="+$scope.item.ruangan.id).then(function(data){
			//                  $scope.listPelayanan = data;
			//                  $scope.item.kelas ='';
			//                  $scope.item.pelayanan ='';
			//              });
			//          }
			// $scope.pilihKelasByProduk =function(){
			//              manageKasir.getDataTableTransaksi("tatarekening/get-kelasbyproduk?objectprodukfk="+$scope.item.pelayanan.id).then(function(data){
			//                  $scope.listKelas = data;
			//                  $scope.item.kelas ='';
			//              });
			//          }
			// $scope.pilihHargaByKelas =function(){
			//              $scope.item.harga = $scope.item.kelas.hargasatuan
			//          }

			// showButton();

			$scope.dataVOloaded = true;
			$scope.now = new Date();


			$scope.rowNumber = 0;
			$scope.renderNumber = function () {
				return ++$scope.rowNumber;
			}


			// $scope.Cetak=function(){
			//              var confirm = $mdDialog.confirm()
			//                    .title('Informasi!')
			//                    .textContent('tes?')
			//                    .ariaLabel('Lucky day')
			//                    .ok('Ya')
			//                    .cancel('Tidak')


			//          };

			// $scope.Cetak = function()
			// {
			// 	// $mdDialog.show(confirm).then(function() {
			// 	debugger
			// 	var NoStruk = $scope.dataRincianTagihan;
			// 	var struk = "";
			// 	var kwitansi = "";
			// 	var stt = 'false'
			// 	if (confirm('View Rincian Biaya? ')) {
			// 	    // Save it!
			// 	    stt='true';
			// 	} else {
			// 	    // Do nothing!
			// 	    stt='false'
			// 	}
			// 	manageKasir.getDataTableTransaksi("get-data-login").then(function (e) {
			//              	var client = new HttpClient(); 
			//               client.get('http://127.0.0.1:1237/printvb/kasir?cetak-RincianBiaya=1&strNoregistrasi=' + $scope.item.noRegistrasi + '&strNoStruk=' + struk + '&strNoKwitansi=' + kwitansi +  '&strIdPegawai='+ e.data[0].namalengkap + '&view=' + stt, function(response) {
			//                   // do something with response
			//               });
			//           	})

			//                  // client.get('http://127.0.0.1:1237/printvb/kasir?cetak-billing=1&noregistrasi=' + $scope.item.noRegistrasi + '&strIdPegawai='+ $scope.Pegawai.id + '&view=' + stt, function(response) {
			//                  //     // do something with response
			//                  // });
			//              // })


			// 	// $scope.showBilling = true;
			// 	// $scope.showBtnCetak = false;
			// }
			// $scope.$watch('item.qty', function(newValue, oldValue) {
			//  	if (newValue != oldValue  ) {
			//  		$scope.item.subTotal = parseFloat($scope.item.qty) * (parseFloat($scope.item.harga)-parseFloat($scope.item.diskon))
			//  	}
			//  });
			// $scope.$watch('item.diskon', function(newValue, oldValue) {
			//  	if (newValue != oldValue  ) {
			//  		$scope.item.subTotal = parseFloat($scope.item.qty) * (parseFloat($scope.item.harga)-parseFloat($scope.item.diskon))
			//  	}
			//  });
			// $scope.$watch('item.harga', function(newValue, oldValue) {
			//  	if (newValue != oldValue  ) {
			//  		$scope.item.subTotal = parseFloat($scope.item.qty) * (parseFloat($scope.item.harga)-parseFloat($scope.item.diskon))
			//  	}
			//  });

			$scope.columnRincianTagihan = [
				/*{
					"field": "no",
					"title": "No",
					"width":"50px",
					"template": "<span> {{renderNumber()}} </span>"
				},*/
				{
					"field": "tglregistrasi",
					"title": "Tgl Registrasi",
					"width": "100px",
					"template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
				},
				{
					"field": "namaruangan",
					"title": "Nama Ruangan",
					"width": "150px",
				},
				{
					"field": "namadokter",
					"title": "Dokter",
					"width": "150px",
				},
				{
					"field": "namakelas",
					"title": "Kelas",
					"width": "80px",
				},
				{
					"field": "namakamar",
					"title": "Kamar",
					"width": "80px",
				},
				{
					"field": "nobed",
					"title": "Bed",
					"width": "80px"
				},
				{
					"field": "israwatgabung",
					"title": "Rawat Gabung",
					"width": "80px"
				},
				{
					"field": "tglmasuk",
					"title": "Tgl Masuk",
					"width": "100px"
				},
				{
					"field": "tglkeluar",
					"title": "Tgl Keluar",
					"width": "100px"
				}
			];

			// $scope.Save = function(){
			// 	window.messageContainer.log("Sukses");
			// 	$scope.showBtnSimpan = false;
			// }

			// $scope.Back = function(){
			// 	if($scope.showBilling)
			// 	{
			// 		$scope.showBilling = false;
			// 		$scope.showBtnCetak = true;
			// 	}
			// 	else
			// 	{
			// 		window.history.back();
			// 		//$state.go('DaftarPasienPulang', {});
			// 	}

			// }

			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.formatTanggal = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}
			$scope.InputTindakan = function () {
				if ($scope.dataSelected == undefined) {
					alert("Pilih pelayanan dahulu!");
					return;
				}
				// if ($scope.dataSelected.nostruklastfk != null 
				// 	&&
				// 	$scope.dataSelected.rpp != null 
				// 	) {
				// 	window.messageContainer.error("Data sudah Diverifikasi");
				//                 return;
				// }
				if (status == true) {
					window.messageContainer.error("Data Sudah Diclosing, Hubungi Tatarekening!!!");
					return;
				}
				if ($scope.item) {
					$state.go('dashboardpasien.InputBilling', {
						noRec: $scope.currentRowData.norec,
						noAntrianPasien: $scope.currentRowData.norec,
						noRegister: $scope.item.norec_pd
					});
				} else {
					messageContainer.error('Pasien belum di pilih')
				}
			}
			$scope.Detail = function () {
				if ($scope.item.noRegistrasi != undefined) {
					var obj = {
						noRegistrasi: $scope.item.noRegistrasi
					}

					$state.go('RincianTagihanTataRekening', {
						dataPasien: JSON.stringify(obj)
					});
				}
			}
			$scope.klik = function (rowClick) {
				$scope.currentRowData = rowClick;
			}
			$scope.Perjanjian = function () {
				debugger
				if ($scope.item) {
					$state.go('PerjanjianPasienTataRekening', {
						norecPD: $scope.item.norec_pd,
						norecAPD: $scope.currentRowData.norec,
					});
				} else {
					messageContainer.error('Pasien belum di pilih')
				}
			}
			// $scope.klik = function(current){
			// 	$scope.item.tanggalPelayanan=current.tglPelayanan;
			// 	$scope.item.jenisPetugas={id:current.jppid,jenispetugaspe:current.jenispetugaspe};
			// 	$scope.item.petugas={id:current.pgid,paramedis:current.dokter};
			// 	$scope.item.ruangan={id:current.ruid,ruanganTindakan:current.ruanganTindakan};
			// 	 manageKasir.getDataTableTransaksi("tatarekening/get-produkbyruangan?objectruanganfk="+current.ruid).then(function(data){
			//                  $scope.listPelayanan = data;
			//                  $scope.item.pelayanan={id:current.prid,namaPelayanan:current.namaPelayanan};
			//                  manageKasir.getDataTableTransaksi("tatarekening/get-kelasbyproduk?objectprodukfk="+current.prid).then(function(data){
			//                   $scope.listKelas = data;
			//                   $scope.item.kelas={id:current.klid,kelasTindakan:current.kelasTindakan};
			//               });
			//              });

			// 	$scope.item.qty=current.jumlah;
			// 	$scope.item.harga=current.harga;
			// 	$scope.item.diskon=current.diskon;
			// 	$scope.item.subTotal=current.total;
			// }

			// $scope.batal = function(){
			// 	$scope.item.tanggalPelayanan=  $scope.now;
			// 	$scope.item.jenisPetugas='';
			// 	$scope.item.petugas='';
			// 	$scope.item.ruangan='';
			// 	$scope.item.pelayanan='';
			//              $scope.item.kelas='';

			// 	$scope.item.qty=0;
			// 	$scope.item.harga=0;
			// 	$scope.item.subTotal=0;
			// }

			// $scope.UpdateHarga = function(){
			// 	if ($scope.dataSelected == undefined) {
			// 		alert("Pilih pelayanan dahulu!");
			//                  return;
			// 	}
			// 	if ($scope.dataSelected.strukfk != null) {
			// 		alert("Pelayanan yang sudah di Verif tidak bisa di ubah!");
			//                  return;
			// 	}
			// 	if($scope.item.qty == undefined){
			//                  alert("Jumlah belum di isi!");
			//                  return;
			//              }
			// 	if($scope.item.harga == undefined){
			//                  alert("Harga belum di isi!");
			//                  return;
			//              }
			// 	if($scope.item.subTotal == undefined){
			//                  alert("SubTotal belum di isi!");
			//                  return;
			//              }
			//          	var objSave = {
			// 		"norec": $scope.dataSelected.norec,
			// 		"jumlah": $scope.item.qty,
			// 		"harga": $scope.item.harga,
			// 		"total": $scope.item.subTotal
			// 	};
			//          	manageKasir.UpdateHargaPelayananPasien(objSave).then(function (e) {
			//              	//initModulAplikasi(); 
			//              	LoadData();
			//           	})

			// }

			// $scope.HapusTindakan = function(){
			// 	if ($scope.dataSelected == undefined) {
			// 		alert("Pilih pelayanan dahulu!");
			//                  return;
			// 	}
			// 	if ($scope.dataSelected.strukfk != null) {
			// 		alert("Pelayanan yang sudah di Verif tidak bisa di ubah!");
			//                  return;
			// 	}
			// 	if($scope.item.qty == undefined){
			//                  alert("Jumlah belum di isi!");
			//                  return;
			//              }
			// 	if($scope.item.harga == undefined){
			//                  alert("Harga belum di isi!");
			//                  return;
			//              }
			// 	if($scope.item.subTotal == undefined){
			//                  alert("SubTotal belum di isi!");
			//                  return;
			//              }
			//          	var objSave = {
			// 		"norec": $scope.dataSelected.norec
			// 	};
			//          	manageKasir.HapusPelayananPasien(objSave).then(function (e) {
			//              	//initModulAplikasi(); 
			//              	LoadData();
			//           	})

			// }

			// $scope.inputTindakan = function(){
			// 	if ($scope.dataSelected == undefined) {
			// 		alert("Pilih pelayanan dahulu!");
			//                  return;
			// 	}
			// 	if ($scope.dataSelected.strukfk != null) {
			// 		alert("Pelayanan yang sudah di Verif tidak bisa di ubah!");
			//                  return;
			// 	}
			//              if ($scope.item){
			//                  $state.go('dashboardpasien.InputBilling',{
			//                      noRec: $scope.dataSelected.norec_apd,
			//                      noRecRegistrasi: $scope.item.norec_pd   
			//                  });
			//              } else {
			//                  messageContainer.error('Pasien belum di pilih')
			//              }
			//          }

			// var HttpClient = function() {
			//     this.get = function(aUrl, aCallback) {
			//         var anHttpRequest = new XMLHttpRequest();
			//         anHttpRequest.onreadystatechange = function() { 
			//             if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
			//                 aCallback(anHttpRequest.responseText);
			//         }

			//         anHttpRequest.open( "GET", aUrl, true );            
			//         anHttpRequest.send( null );
			//     }
			// }
			// $scope.TESTCETAK = function(){

			//           	var client = new HttpClient();
			// 	client.get('http://localhost:8080/cetak-antrian?cetak=1&norec=ff8081815d9810c2015d984db6790010', function(response) {
			// 	    // do something with response
			// 	});
			// }

			$scope.DaftarRuangan = function () {
				if ($scope.currentRowData === undefined) {
					messageContainer.error("Pilih data terlebih dahulu");
					return
				} else {
					manageTataRekening.getDataTableTransaksi("pindahpasien/get-combo-pindahpasien")
						.then(function (e) {
							$scope.listKelas = e.data.kelas
							$scope.konsul.kelas = $scope.listKelas[17]
						})
					$scope.cboDokter = false;
					$scope.cboUbahDokter = false;
					$scope.cboKonsul = true;
					$scope.showUbahTanggal = false;
				}
			}
			$scope.getKelas = function (ruangan) {
				if (ruangan != undefined && ruangan.namaruangan.indexOf('Bedah') > -1) {
					$scope.konsul.kelas = { id: $scope.currentRowData.kelasid, namakelas: $scope.currentRowData.namakelas }
				}
			}
			$scope.simpanKonsul = function () {
				var current = $scope.currentRowData;
				var length = $scope.dataRincianTagihan._data.length + 1;
				var dataKonsul = {
					"asalrujukanfk": current.objectasalrujukanfk,
					"kelasfk": $scope.konsul.kelas.id,//6,//nonKelas current.kelasid,
					"noantrian": length,
					"norec_pd": $scope.item.norec_pd,
					"dokterfk": $scope.konsul.namaDokter.id,
					"objectruangantujuanfk": $scope.konsul.ruangan.id,
					"objectruanganasalfk": current.ruid_asal
				}
				manageTataRekening.saveKonsulRuangan(dataKonsul).then(function (e) {
					LoadData();
					$scope.saveLogKonsul();
					$scope.batalKonsul();

				})
			}
			//#save Log Konsul
			$scope.saveLogKonsul = function () {
				manageTataRekening.getDataTableTransaksi("logging/save-log-konsul?norec_pd="
					+ $scope.item.norec_pd
					+ "&dokterfk="
					+ $scope.konsul.namaDokter.id
					+ "&kelasfk="
					+ $scope.currentRowData.kelasid
					+ "&objectruangantujuanfk="
					+ $scope.konsul.ruangan.id).then(function (data) {
					})
			}
			$scope.saveLogUbahRekanan = function () {
				manageTataRekening.getDataTableTransaksi("logging/save-log-ubah-rekanan?norec_pd="
					+ $scope.item.norec_pd
				).then(function (data) {
				})
			}
			//end log
			$scope.batalKonsul = function () {
				$scope.cboUbahDokter = true;
				$scope.cboKonsul = false;

			}
			$scope.simpan = function () {
				var current = $scope.currentRowData;
				var length = $scope.dataRincianTagihan._data.length + 1;
				var updateDokter = {
					"norec_apd": current.norec,
					"objectpegawaifk": $scope.item.namaDokter.id
				}
				manageTataRekening.saveUpdateDokter(updateDokter).then(function (e) {
					LoadData();
					$scope.batal();
				})
			}
			$scope.simpanRekanan = function () {
				var current = $scope.currentRowData;
				var length = $scope.dataRincianTagihan._data.length + 1;
				var updateDokter = {
					"norec_pd": $scope.item.norec_pd,
					"objectrekananfk": $scope.item.namaRekanan.id,
					"objectkelompokpasienlastfk": $scope.item.kelompokPasien.id
				}
				manageTataRekening.saveUpdateRekanan(updateDokter).then(function (e) {
					LoadData();
					$scope.saveLogUbahRekanan();
					$scope.batalRekanan();
				})
			}
			$scope.saveLogging = function (jenis, referensi, noreff, ket) {
				manageTataRekening.getDataTableTransaksi("logging/save-log-all?jenislog=" + jenis
					+ "&referensi=" + referensi
					+ "&noreff=" + noreff
					+ "&keterangan=" + ket
				).then(function (data) {

				})
			}
			$scope.HapusRegistrasi = function () {
				if (!$scope.currentRowData) {
					window.messageContainer.error('Data belum dipilih')
				} else {
					var dataJson = {
						norec_apd: $scope.currentRowData.norec
					}
					manageTataRekening.hapusAntrianPasien(dataJson).then(function (e) {
						if (e.status == 201) {
							$scope.saveLogging('Hapus Konsul', 'norec Pasien Daftar',
								$scope.item.norec_pd, $scope.currentRowData.namaruangan)
						}
						LoadData();
						// $scope.batalKonsul();
					})
				}
			}

			$scope.EditRegistrasi = function () {
				$state.go('RegistrasiPelayananRev', {
					noCm: $scope.item.noCm
				});
				var cacheSet = $scope.item.norec_pd
					+ "~" + $scope.item.noRegistrasi
					+ "~" + $scope.dataSelected.norec;
				cacheHelper.set('CacheRegistrasiPasien', cacheSet);
			}
			$scope.InputTindakanBeta = function () {
				if ($scope.dataSelected == undefined) {
					window.messageContainer.error("Pilih pelayanan dahulu!");
					return;
				}
				// if ($scope.dataSelected.strukfk != ' / ') {
				// 	window.messageContainer.error("Pelayanan yang sudah di Verif tidak bisa di ubah!");
				//                 return;
				// }
				if (status == true) {
					window.messageContainer.error("Data Sudah Diclosing, Hubungi Tatarekening!!!");
					return;
				}
				if ($scope.item) {
					$state.go('InputTindakanPelayananRev', {
						norecPD: $scope.item.norec_pd,
						norecAPD: $scope.currentRowData.norec,

					});
				} else {
					messageContainer.error('Pasien belum di pilih')
				}
			}

			$scope.PindahPulang = function () {
				if ($scope.item.tglPulang != "Invalid date") {
					toastr.error('Pasien Sudah Di Pulangkan', 'Informasi');
				} else {
					// manageKasir.getDataTableTransaksi("pindahpasien/get-ruangan-last?norec_pd="+$scope.item.norec_pd).then(function (e) {
					//  $scope.item.ruanganLast=e.data.data[0].objectruanganlastfk
					// if ($scope.item.ruanganLast !=undefined){
					manageTataRekening.getDataTableTransaksi('registrasi/get-norec-apd?noreg=' + $scope.item.noRegistrasi
						+ '&namaRuangan=' + $scope.item.lastRuangan).then(function (e) {
							if (e.data.length > 0) {
								$state.go('PindahPulangPasien', {
									norecPD: $scope.item.norec_pd,
									norecAPD: e.data[0].norec_apd
								});
								var CachePindah = $scope.item.ruanganLast
								cacheHelper.set('CachePindah', CachePindah);
							}
						})
					// }
					// })	
				}
			}
			$scope.UbahTanggal = function () {
				if ($scope.currentRowData === undefined) {
					messageContainer.error("Pilih data terlebih dahulu");
				} else {
					$scope.item.tglRegiss = new Date();
					$scope.item.tglMasuks = new Date();
					$scope.item.tglKeluars = new Date();
					$scope.cboDokter = false;
					$scope.cboUbahDokter = false;
					$scope.showUbahTanggal = true;
					$scope.item.cekTglRegis = false;
					$scope.item.cekTglMasuk = false;
					$scope.item.cekTglKeluar = false;
				}
			}
			$scope.batalUbahTanggal = function () {
				$scope.cboUbahDokter = true;
				$scope.showUbahTanggal = false;

			}

			$scope.simpanTanggal = function () {

				var tglregistrasis = "";
				if ($scope.item.cekTglRegis) {
					tglregistrasis = moment($scope.item.tglRegiss).format('YYYY-MM-DD HH:mm:ss')
				}
				var tglmasuks = "";
				if ($scope.item.cekTglMasuk) {
					tglmasuks = moment($scope.item.tglMasuks).format('YYYY-MM-DD HH:mm:ss')
				}
				var tglkeluars = "";
				if ($scope.item.cekTglKeluar) {
					tglkeluars = moment($scope.item.tglKeluars).format('YYYY-MM-DD HH:mm:ss')
				}

				var dataJson = {
					noregistrasi: $scope.item.noRegistrasi,
					norec_pd: $scope.item.norec_pd,
					ruanganasal: $scope.currentRowData.ruid_asal,
					norec_apd: $scope.currentRowData.norec,
					tglregistrasi: tglregistrasis,
					tglmasuk: tglmasuks,
					tglkeluar: tglkeluars
				}
				manageTataRekening.postUpdateTanggal(dataJson).then(function (e) {
					if (e.status = 201) {
						$scope.saveLogging('Ubah Tgl Detail Registrasi', 'norec Antrian Pasien Diperiksa',
							$scope.currentRowData.norec, '')
						LoadData();
						$scope.batalUbahTanggal();
					}
				})

			}


			$scope.orderPenunjang = function () {
				if (status == true) {
					window.messageContainer.error("Data Sudah Diclosing, Hubungi Tatarekening!!!");
					return;
				}

				if ($scope.currentRowData != undefined) {
					$state.go('OrderPenunjang', {
						norecPD: $scope.item.norec_pd,
						norecAPD: $scope.currentRowData.norec,
					});

				}
			}




		}
	]);
});