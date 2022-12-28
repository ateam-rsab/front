define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('WaktuTungguResepCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper', 'DateHelper', 'ManageTataRekening',
		function ($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper, dateHelper, manageTataRekening) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.periodeAwal = $scope.now;
			$scope.item.periodeAkhir = $scope.now;
			$scope.formatTanggal = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}
			const loadCombo = () => {
				manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function (data) {
					$scope.listDepartemen = data.data.departemen;
				})
			}
			loadCombo();
			$scope.SearchData = () => {
				let newParam = '', tglAwal = '', tglAkhir = '', noResep = '', noRegistrasi = '', nocm = '', namapasien = '',ruid='';
				($scope.item.periodeAwal) ? tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss') : tglAwal = '';
				($scope.item.periodeAkhir) ? tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss') : tglAkhir = '';
				($scope.item.noResep) ? noResep = $scope.item.noResep : noResep = '';
				($scope.item.noReg) ? noRegistrasi = $scope.item.noReg : noRegistrasi = '';
				($scope.item.noRm) ? nocm = $scope.item.noRm : nocm = '';
				($scope.item.nama) ? namapasien = $scope.item.nama : namapasien = '';
				($scope.item.ruangan) ? ruid = $scope.item.ruangan.id : ruid='';

				if (ruid) {
					newParam += 'ruid=' + ruid + '&';
				}
				if (tglAwal) {
					newParam += 'tglAwal=' + tglAwal + '&';
				}

				if (tglAkhir) {
					newParam += 'tglAkhir=' + tglAkhir + '&';
				}

				if (noResep) {
					newParam += 'noresep=' + noResep + '&';
				}

				if (noRegistrasi) {
					newParam += 'noregistrasi=' + noRegistrasi + '&';
				}

				if (nocm) {
					newParam += 'nocm=' + nocm + '&';
				}

				if (namapasien) {
					newParam += 'namapasien=' + namapasien + '&';
				}

				manageTataRekening.getDataTableTransaksi("apotik/antrian-resep?" + newParam, false)
					.then((data) => {
						$scope.item.antren = data.data.data;
					})
					.then((data) => {
						$scope.daftarWaktuTungguResep = new kendo.data.DataSource({
							data: $scope.item.antren,
							pageSize: 10,
							serverPaging: false,
							schema: {
								model: {
									fields: {}
								}
							}
						});
					})
			}

			$scope.columnOptions = {
				toolbar: [
					"excel",

				],
				excel: {
					fileName: "DaftarRegistrasiPasien.xlsx",
					allPages: true,
				},
				excelExport: function (e) {
					var sheet = e.workbook.sheets[0];
					sheet.frozenRows = 2;
					sheet.mergedCells = ["A1:M1"];
					sheet.name = "Orders";

					var myHeaders = [{
						value: "Daftar Registrasi Pasien",
						fontSize: 20,
						textAlign: "center",
						background: "#ffffff",
						// color:"#ffffff"
					}];

					sheet.rows.splice(0, 0, {
						cells: myHeaders,
						type: "header",
						height: 70
					});
				},
				selectable: 'row',
				pageable: true,
				resizable: true,
				navigatable: true,
				// filterable:'row',
				columns: [{
					"field": "tanggal_resep",
					"title": "Tgl Registrasi",
					"width": 80,
					"template": "<span class='style-left'>{{formatTanggal('#: tanggal_resep #')}}</span>"
				},
				{
					"field": "nomor_resep",
					"title": "No Resep",
					"width": 80
				},
				{
					"field": "noregistrasi",
					"title": "No Registrasi",
					"width": 80
				},
				{
					"field": "nocmfk",
					"title": "No RM",
					"width": 80,
					"template": "<span class='style-center'>#: nocmfk #</span>"
				},
				{
					"field": "nama_pasien",
					"title": "Nama Pasien",
					"width": 150,
					"template": "<span class='style-left'>#: nama_pasien #</span>"
				},
				{
					"field": "ruangan_asal",
					"title": "Nama Ruangan",
					"width": 150,
					"template": "<span class='style-left'>#: ruangan_asal #</span>"
				},
				{
					"field": "nama_dokter",
					"title": "Nama Dokter",
					"width": 150,
					"template": '# if( nama_dokter==null) {# - # } else {# #= nama_dokter # #} #'
				},
				{
					"field": "time_proses",
					"title": "Proses",
					"width": 100,
					"template": "<span class='style-left'>#: time_proses #</span>"
				},
				{
					"field": "time_selsai",
					"title": "Selesai",
					"width": 100,
					"template": "<span class='style-left'>#: time_selsai #</span>"
				},
				{
					"field": "time_diserahkan",
					"title": "Diserahkan",
					"width": 80,
					"template": "<span class='style-left'>{{formatTanggal('#: time_diserahkan #')}}</span>"
				},
				{
					"field": "waktu_tunggu",
					"title": "Waktu Tunggu",
					"width": 80,
				}
				],
				dataBound: function () {
					// $('.k-grid-header-wrap').css({'touch-action': 'auto'})
					// $('.k-selectable').css({'touch-action': 'auto'})
				}
			};

			$scope.getIsiComboRuangan = () => {
				$scope.listRuangan = $scope.item.instalasi.ruangan
			}

			$scope.klikGrid = (dataPasienSelected) => {
				if (dataPasienSelected != undefined) {
					$scope.item.namaDokter = {
						id: dataPasienSelected.pgid,
						namalengkap: dataPasienSelected.namadokter
					}
				}
			}

			$scope.Proses = () => {
				console.log($scope.dataPasienSelected)
				if (!$scope.dataPasienSelected) {
					toastr.warning('OOps! Pilih pasien.')
					return;
				}
				var confirm = $mdDialog.confirm()
					.title('Proses!')
					.textContent('Resep akan di proses')
					.ariaLabel('Lucky day')
					.ok('Ok')

				$mdDialog.show(confirm).then(function () {
					manageTataRekening.postData("apotik/update-proses?id=" + $scope.dataPasienSelected.id + "&param=proses",null)
						.then((data) => {
							console.log(data)
							if(data.data.status==400){
								toastr.warning('OOps! '+data.data.message);
							}else{
								toastr.success('Sukses '+data.data.message);
							}
							$scope.SearchData();
						})
				});
			}

			$scope.Selesai = () => {
				if (!$scope.dataPasienSelected) {
					toastr.warning('OOps! Pilih pasien.')
					return;
				}
				var confirm = $mdDialog.confirm()
					.title('Selesai!')
					.textContent('Resep akan di selesaikan')
					.ariaLabel('Lucky day')
					.ok('Ok')

				$mdDialog.show(confirm).then(function () {
					manageTataRekening.postData("apotik/update-proses?id=" + $scope.dataPasienSelected.id + "&param=selesai",null)
						.then((data) => {
							if(data.data.status==400){
								toastr.warning('OOps! '+data.data.message);
							}else{
								toastr.success('Sukses '+data.data.message);
							}
							$scope.SearchData();
						})
				});

			}
			$scope.Diserahkan = () => {
				if (!$scope.dataPasienSelected) {
					toastr.warning('OOps! Pilih pasien.')
					return;
				}
				var confirm = $mdDialog.confirm()
					.title('Diserahkan!')
					.textContent('Resep akan di diserahkan')
					.ariaLabel('Lucky day')
					.ok('Ok')

				$mdDialog.show(confirm).then(function () {
					manageTataRekening.postData("apotik/update-proses?id=" + $scope.dataPasienSelected.id + "&param=serahkan",null)
						.then((data) => {
							if(data.data.status==400){
								toastr.warning('OOps! '+data.data.message);
							}else{
								toastr.success('Sukses '+data.data.message);
							}
							$scope.SearchData();
						})
				});
			}
		}
	]);
});