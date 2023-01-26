define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarHasilTriaseCtrl', ['$q', '$rootScope', '$scope', 'ManagePhp', '$state', 'CacheHelper', '$http',
		function ($q, $rootScope, $scope, ManagePhp, $state, cacheHelper, $http) {
			$scope.item = {};
			$scope.dataRegis = {}
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item.tglMasukAwal = new Date();
			$scope.item.tglMasukAkhir = new Date();
			$scope.isSafeSave = false;
			var init = function () {
				loadData();
			}


			init();

			function loadData() {

				var carinocm = "";

				var carinamapasien = "";
				var tglMasukAwal = "";
				var tglMasukAkhir = "";

				if ($scope.item.carinocm != undefined) {
					carinocm = "&nocm=" + $scope.item.carinocm;
				}

				if ($scope.item.carinamapasien != undefined) {
					carinamapasien = "&namaPasien=" + $scope.item.carinamapasien;
				}

				if ($scope.item.tglMasukAwal != undefined) {
					tglMasukAwal = "&tglMasukAwal=" + new moment($scope.item.tglMasukAwal).format('YYYY-MM-DD');
				}

				if ($scope.item.tglMasukAkhir != undefined) {
					tglMasukAkhir = "&tglMasukAkhir=" + new moment($scope.item.tglMasukAkhir).format('YYYY-MM-DD');
				}


				ManagePhp.getData("generic/get-hasil-triase?" + carinocm + carinamapasien + tglMasukAwal + tglMasukAkhir).then(
					function (dat) {
						//debugger
						$scope.listDataMaster = dat.data.hasilTriase;

						$scope.dataSource = new kendo.data.DataSource({
							pageSize: 10,
							data: $scope.listDataMaster,
							autoSync: true

						});

					}
				);
			}


			$scope.cari = function () {

				loadData()
			}

			$scope.hapus = function () {
				ManagePhp.getData("asuransi-pasien/hapus-asuransi-pasien?id=" + $scope.item.id).then(function (e) {

					if (e.Status = 400) {
						toastr.error(e.data.message);
					} else {
						$scope.item = {};
						toastr.success(e.data.message);
						init();

					}


				});
			}

			$scope.columnAsuransiPasien = [
				{
					"field": "no",
					"title": "No"
				},
				{
					"field": "generatetriase",
					"title": "No.Transaksi"
				},
				{
					"field": "tanggalmasuk",
					"title": "Tanggal Masuk"
				},
				// {
				// 	"field": "nocm",
				// 	"title": "No.RM"
				// },
				{
					"field": "noregistrasi",
					"title": "No.Registrasi"
				},
				{
					"field": "namapasien",
					"title": "Nama Pasien"
				},
				{
					"field": "statuspasien",
					"title": "Status Pasien"
				},
				{
					"field": "beratbadan",
					"title": "Berat Badan"
				},
				{
					"field": "tekanandarah",
					"title": "Tekanan Darah"
				},
				{
					"field": "suhu",
					"title": "Suhu"
				},
				{
					"field": "nadi",
					"title": "Nadi"
				},
				{
					"field": "pernapasan",
					"title": "Pernapasan"
				},
				{
					"field": "namahasilkategoritriase",
					"title": "Hasil"
				},
				{
					"field": "tgl_diputuskan",
					"title": "Tanggal ditetapkan"
				},
				{
					"field": "tgl_diperiksa_dokter",
					"title": "Tanggal diperiksa"
				},
				{
					"field": "response_time",
					"title": "Response Time"
				},
				{
					"command":
						[
							{
								text: "Edit",
								click: enableData,
								// imageClass: "k-icon k-floppy"
							},

						],

					title: "",
					width: "50px",
				}
			];

			$scope.mainGridOptions = {
				pageable: true,
				columns: $scope.columnAsuransiPasien,
				editable: "popup",
				selectable: "row",
				scrollable: false,
				dataBound: function (e) {
                    $('td').each(function () {
                        if ($(this).text() == 'Kategori 1') { $(this).addClass('kat-1') };
                        if ($(this).text() == 'Kategori 2') { $(this).addClass('kat-2') };
                        if ($(this).text() == 'Kategori 3') { $(this).addClass('kat-3') };
                        if ($(this).text() == 'Kategori 4') { $(this).addClass('kat-4') };
                        // if ($(this).text() == 'Kategori 5') { $(this).addClass('blm-verifikasi') };
                    })
                },
			};

			////fungsi klik untuk edit
			$scope.klik = function (current) {
				$scope.showEdit = true;
				$scope.current = current;
				// $scope.item.alamatlengkap = current.alamatlengkap;
				// $scope.item.golonganasuransi = current.golonganasuransi;
				// $scope.item.golonganasuransiId = current.golonganasuransiId;
				// $scope.item.hubunganpeserta = current.hubunganpeserta;
				// $scope.item.hubunganpesertaid = current.hubunganpesertaid;
				// $scope.item.kdinstitusiAsal = current.kdinstitusiasal;
				// $scope.item.jeniskelamin = current.jeniskelamin;
				// $scope.item.jeniskelaminid = current.jeniskelaminid;
				// $scope.item.kelasdijamin = current.kelasdijamin;
				// $scope.item.kelasdijaminid = current.kelasdijaminid;
				// $scope.item.kdLastunitbagian = current.kdLastunitbagian;
				// $scope.item.pegawai = current.pegawai;
				// $scope.item.pegawaiid = current.pegawaiid;
				// $scope.item.kdpenjaminpasien = current.kdpenjaminpasien;
				// $scope.item.lastunitbagian = current.lastunitbagian;
				// $scope.item.namapeserta = current.namapeserta;
				// $scope.item.nikinstitusissal = current.nikinstitusiasal;
				// $scope.item.nippns = current.nippns;
				// $scope.item.noasuransi = current.noasuransi;
				// $scope.item.noasuransihead = current.noasuransihead;
				// $scope.item.nocm = current.nocm;
				// $scope.item.nocmid = current.nocmid;
				// $scope.item.noidentitas = current.noidentitas;
				// $scope.item.notelpfixed = current.notelpfixed;
				// $scope.item.notelpmobile = current.notelpmobile;
				// $scope.item.qasuransi = current.qasuransi;
				// $scope.item.tglakhirberlakulast = current.tglakhirberlakulast;
				// $scope.item.tgllahir = current.tgllahir;
				// $scope.item.tglmulaiberlakulast = current.tglmulaiberlakulast;
				// $scope.item.id = current.id;
				// $scope.item.noRec = current.norec;
				// $scope.item.reportdisplay = current.reportdisplay;
				// $scope.item.kodeexternal = current.kodeexternal;
				// $scope.item.namaexternal = current.namaexternal;
				// $scope.item.statusenabled = current.statusenabled;
			};


			function enableData(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				$scope.edit = dataItem;
				if(!dataItem.noregistrasi) {
					$scope.popUpEdit.center().open();
				} else {
					toastr.info('Pasien Sudah Terdaftar');
				}
				
				// console.log(dataItem);
			}

			// function disableData(e) {
			// 		e.preventDefault();
			// 		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

			// 		if(!dataItem){
			// 			toastr.error("Data Tidak Ditemukan");
			// 			return;
			// 		}
			// 		var itemDelete = {
			// 			"id": dataItem.id
			// 		}

			// 		ManagePhp.getData("asuransi-pasien/update-status-enabled-asuransi-pasien?id="+dataItem.id+"&statusenabled=false").then(function(dat){
			// 		 toastr.success(dat.data.message);
			// 		 init();
			// 		 });
			// } 



			// $scope.editTambah = function () {
			// 	cacheHelper.set('CacheFormAsuransiPasien',$scope.current)
			// 	$state.go("AsuransiPasienEdit")

			// }

			// $scope.batal = function () {
			// 	$scope.showEdit = false;
			// 	$scope.item = {};
			// }

			// $scope.hapus = function () {
			// 	debugger
			// 	ManagePhp.getData("asuransi-pasien/hapus-asuransi-pasien?id="+$scope.item.id).then(
			// 		function (e) {

			// 			debugger
			// 			if (e.data.status==201){
			// 				$scope.item = {};
			// 				toastr.success(e.data.message);
			// 				init();
			// 			}else{
			// 				toastr.error(e.data.message);


			// 			}


			// 		}
			// 	);
			// }
			// /rekam-medis/get-noregistrasi-pasien-triase?noregistrasi=181101106
			// http://172.16.99.236:8000/service/transaksi/rekam-medis/get-noregistrasi-pasien-triase/1909000031
			$scope.validationNoreg = function () {
				ManagePhp.getData('rekam-medis/get-noregistrasi-pasien-triase?noregistrasi=' + $scope.item.editNoreg).then(res => {
					if (res.data.noregistrasi) {
						toastr.info('No. Registrasi Ditemukan');
						$scope.dataRegis = {
							noreg: res.data.noregistrasi,
							nama: res.data.namapasien
						}
						$scope.isSafeSave = true;
					} else {
						toastr.info('No. Registrasi Salah');
						$scope.item.editNoreg = '';
						$scope.isSafeSave = false;
					}
				});
			}

			$scope.editNoregistrasi = function () {
				if(!$scope.isSafeSave) {
					toastr.info('Tidak bisa menyimpan No. Registrasi');
					return
				}
				let data = {
					"noregistrasi": $scope.item.editNoreg
				}
				ManagePhp.postData(data, 'rekam-medis/update-noregistrasi-pasien-triase?norec=' + $scope.edit.norec).then(res => {
					loadData();
					$scope.popUpEdit.close();
				})
			}

			$scope.close = function () {
				$scope.popUpEdit.close();
			}

			var HttpClient = function () {
				this.get = function (aUrl, aCallback) {
					var anHttpRequest = new XMLHttpRequest();
					anHttpRequest.onreadystatechange = function () {
						if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
							aCallback(anHttpRequest.responseText);
					}

					anHttpRequest.open("GET", aUrl, true);
					anHttpRequest.send(null);
				}
			}

			$scope.CetakHasilTriase = function () {



				var tglAwal = moment($scope.item.tglMasukAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.tglMasukAkhir).format('YYYY-MM-DD HH:mm:ss');
				var client = new HttpClient();
				client.get('http://127.0.0.1:1237/printvb/gawatdarurat?cetak-hasil-triase=1' +
					'&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&view=true', function (response) {

					});
			}


		}
	]);
});
