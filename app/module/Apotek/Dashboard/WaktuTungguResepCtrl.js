define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('WaktuTungguResepCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper', 'DateHelper', 'ManageTataRekening',
		function ($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper, dateHelper, manageTataRekening) {
			$scope.item = {};
			$scope.now = new Date(new Date().setHours(0, 0, 0, 0));
			$scope.item.periodeAwal = new Date(new Date().setHours(0, 0, 0, 0));
			$scope.item.periodeAkhir = new Date(new Date().setHours(23, 30, 0, 0));
			$scope.formatTanggal = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}
			$scope.formatTime = function (tanggal) {
				return moment(tanggal).format('HH:mm');
			}
			const loadCombo = () => {
				manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function (data) {
					$scope.listDepartemen = data.data.departemen;
				})
				manageTataRekening.getDataTableTransaksi("logistik/get-datacombo", false).then(function (data) {
					$scope.listDepo = data.data.ruanganfarmasi;
				})
			}
			loadCombo();
			$scope.SearchData = () => {
				let newParam = '', tglAwal = '', tglAkhir = '', noResep = '', noRegistrasi = '', nocm = '', namapasien = '', ruid = '', depo = '';
				($scope.item.periodeAwal) ? tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss') : tglAwal = '';
				($scope.item.periodeAkhir) ? tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss') : tglAkhir = '';
				($scope.item.noResep) ? noResep = $scope.item.noResep : noResep = '';
				($scope.item.noReg) ? noRegistrasi = $scope.item.noReg : noRegistrasi = '';
				($scope.item.noRm) ? nocm = $scope.item.noRm : nocm = '';
				($scope.item.nama) ? namapasien = $scope.item.nama : namapasien = '';
				($scope.item.ruangan) ? ruid = $scope.item.ruangan.id : ruid = '';
				($scope.item.depo) ? depo = $scope.item.depo.id : depo = '';

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

				if (depo) {
					newParam += 'depo=' + depo;
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
				toolbar: [{
					text: "export",
					name: "Export detail",
					template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
				  }
				],
				selectable: 'row',
				pageable: true,
				resizable: true,
				navigatable: true,
				// filterable:'row',
				columns: [
					{
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
					// {
					// 	"field": "noregistrasi",
					// 	"title": "No Registrasi",
					// 	"width": 80
					// },
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
					// {
					// 	"field": "depo",
					// 	"title": "Depo",
					// 	"width": 150,
					// 	"template": "<span class='style-left'>#: depo #</span>"
					// },
					{
						"field": "time_proses",
						"title": "Proses",
						"width": 100,
						"template": "<span class='style-left'>{{formatTime('#: time_proses #')}}</span>"
					},
					{
						"field": "time_selsai",
						"title": "Selesai",
						"width": 100,
						"template": "<span class='style-left'>{{formatTime('#: time_selsai #')}}</span>"
					},
					{
						"field": "time_diserahkan",
						"title": "Diserahkan",
						"width": 80,
						"template": "<span class='style-left'>{{formatTime('#: time_diserahkan #')}}</span>"
					},
					{
						"field": "waktu_tunggu",
						"title": "Waktu Tunggu",
						"width": 80,
					}
				],
				dataBound: function (e) {
					var columns = e.sender.columns;
					var columnIndexselesai = this.wrapper.find(".k-grid-header [data-field=" + "time_selsai" + "]").index();
					var columnIndexdiserahkan = this.wrapper.find(".k-grid-header [data-field=" + "time_diserahkan" + "]").index();

					// iterate the table rows and apply custom cell styling
					var rows = e.sender.tbody.children();
					for (var j = 0; j < rows.length; j++) {
						var row = $(rows[j]);
						var dataItem = e.sender.dataItem(row);
						var units1 = dataItem.get("time_selsai");
						var units2 = dataItem.get("time_diserahkan");

						var cell1 = row.children().eq(columnIndexselesai);
						cell1.addClass(badgeColor(units1));
						var cell2 = row.children().eq(columnIndexdiserahkan);
						cell2.addClass(badgeColor(units2));
					}
				}
			};


			$scope.exportExcel = () => {
				var tempDataExport = [];
				var rows = [
					{
						cells: [
							{
								value: "Tgl Registrasi"
							}, {
								value: "No Resep"
							}, {
								value: "Nama Pasien"
							}, {
								value: "Nama Ruangan"
							}, {
								value: "Nama Dokter"
							}, {
								value: "Proses"
							}, {
								value: "Selesai"
							}, {
								value: "Diserahkan"
							}, {
								value: "Waktu Tunggu"
							}
						]
					}
				];

				tempDataExport = $scope.daftarWaktuTungguResep;
				tempDataExport.fetch(() => {
					var data = tempDataExport._data;
					for (var i = 0; i < data.length; i++) {
						//push single row for every record
						rows.push(
							{
								cells: [
									{
										value: data[i].tanggal_resep
									},
									{
										value: data[i].nomor_resep
									},
									{
										value: data[i].nama_pasien
									},
									{
										value: data[i].ruangan_asal
									},
									{
										value: data[i].nama_dokter
									},
									{
										value: $scope.formatTime(data[i].time_proses)
									},
									{
										value: $scope.formatTime(data[i].time_selsai)
									},
									{
										value: $scope.formatTime(data[i].time_diserahkan)
									},
									{
										value: data[i].waktu_tunggu
									},
								]
							}
						)
					}

					var workbook = new kendo.ooxml.Workbook({
						sheets: [
							{
								freezePane: {
									rowSplit: 1
								},
								columns: [
									{
										autoWidth: true
									}, {
										autoWidth: true
									}, {
										autoWidth: true
									}, {
										autoWidth: true
									}, {
										autoWidth: true
									}, {
										autoWidth: true
									}, {
										autoWidth: true
									}, {
										autoWidth: true
									}
								],
								// Title of the sheet
								title: "Waktu Tunggu Resep",
								// Rows of the sheet
								rows: rows
							}
						]
					}
					);
					//save the file as Excel file with extension xlsx
					kendo.saveAs({
						dataURI: workbook.toDataURL(),
						fileName: "Waktu-Tunggu-Resep-"+$scope.dateNow()+".xlsx"
					});
				});
			};

			$scope.dateNow=()=>{
				let today = new Date();
				let dd = String(today.getDate()).padStart(2,'0');
				let mm = String(today.getMonth()+1).padStart(2,'0');
				let yy = today.getFullYear();
				today = dd+'/'+mm+'/'+yy;
 				return today;
			}
			
			function badgeColor(units) {
				if (units == null) {
					return "cancel";
				}
			}

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
					manageTataRekening.postData("apotik/update-proses?id=" + $scope.dataPasienSelected.id + "&param=proses", null)
						.then((data) => {
							console.log(data)
							if (data.data.status == 400) {
								toastr.warning('OOps! ' + data.data.message);
							} else {
								toastr.success('Sukses ' + data.data.message);
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
					manageTataRekening.postData("apotik/update-proses?id=" + $scope.dataPasienSelected.id + "&param=selesai", null)
						.then((data) => {
							if (data.data.status == 400) {
								toastr.warning('OOps! ' + data.data.message);
							} else {
								toastr.success('Sukses ' + data.data.message);
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
					manageTataRekening.postData("apotik/update-proses?id=" + $scope.dataPasienSelected.id + "&param=serahkan", null)
						.then((data) => {
							if (data.data.status == 400) {
								toastr.warning('OOps! ' + data.data.message);
							} else {
								toastr.success('Sukses ' + data.data.message);
							}
							$scope.SearchData();
						})
				});
			}
		}
	]);
});