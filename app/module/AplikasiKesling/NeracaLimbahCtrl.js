define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('NeracaLimbahCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'FindPasien', 'MasterLimbah', 'ManageKKKL', 'TampilDataLimbahKeluar', 'CetakHelper',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, FindPasien, MasterLimbah, ManageKKKL, TampilDataLimbahKeluar, cetakHelper) {
			ModelItem.get("Humas/MonitoringStatusPks").then(function (data) {
				$scope.item = data;
				$scope.isShowPopUp = false;
				$scope.now = new Date();
				$scope.dataVOloaded = true;

			}, function errorCallBack(err) { });

			MasterLimbah.getOrderList("service/list-generic/?view=JenisLimbahB3Masuk&select=*").then(function (dat) {
				$scope.ListLimbah = dat.data;
			});
			$('#tbKinerja').kendoNumericTextBox({
				format: 'p0',
				min: 0,
				max: 0.1,
				step: 0.01
			})
			$scope.optionGrid = {
				// dataSource: $scope.ListLimbah,
				pageable: true,
				toolbar: ['excel', 'pdf'],
				editable: false,
				columns: $scope.columnMonitoringStatusPKS
			}

			$scope.columnMonitoringStatusPKS = [
				{
					field: "periodeAwal",
					title: "<h3 align=center>Periode Awal</h3>",
					width: "150px",
					headerAttributes: { style: "text-align : center" },
					attributes: {
						style: "text-align:center;valign=middle"
					},
					// template: "#= new Date(periodeAwal).getFullYear().getDate() #"
					// template: '#= kendo.toString(periodeAwal, "MM/dd/yyyy") #',
				},
				{
					field: "periodeAhir",
					title: "<h3 align=center>Periode Akhir</h3>",
					width: "150px",
					headerAttributes: { style: "text-align : center" },
					attributes: {
						style: "text-align:center;valign=middle"
					},
					// template: "#= new Date(periodeAhir) #"
					// template: '#= kendo.toString(periodeAhir, "dd-MMM-yyyy") #',
				},
				{
					field: "kinerjaPengelolaan",
					title: "<h3 align=center>Kinerja Pengelolaan <br>( % )</h3>",
					width: "150px",
					headerAttributes: { style: "text-align : center" },
					attributes: {
						style: "text-align:center;valign=middle"
					},
					template: '#=kendo.format("{0:p}", kinerjaPengelolaan / 100)#'
					// format: "{0:p}"
				},
				{
					field: "catatan",
					title: "<h3 align=center>Catatan</h3>",
					width: "250px",
					
					headerAttributes: { style: "text-align : center" }
				},
				{
					field: "residu",
					title: "<h3 align=center>Residu</h3>",
					width: "90px",
					attributes: {
						style: "text-align:center;valign=middle"
					},
					headerAttributes: { style: "text-align : center" }
				},
				{
					field: "jumlahYangBelumTerkelola",
					title: "<h3 align=center>Jumlah Yang <br>Belum Terkelola</h3>",
					width: "150px",
					format: "{0:##,#}",
					attributes: {
						style: "text-align:center;valign=middle"
					},
					headerAttributes: { style: "text-align : center" }
				},
				{
					field: 'action',
					title: '<h3 align=center>Action</h3>',
					width: '200px',
					attributes: {
						style: "text-align:center;valign=middle"
					},
					command: [
						{
							name: 'Edit',
							title: 'Edit',
							click: function (e) {
								e.preventDefault();
								var grid = $('#idDataNeracaLimbah').data('kendoGrid');
								var item = grid.dataItem($(e.target).closest('tr'));
								var total = []
								ManageKKKL.getOrderList('neraca-limbah/neraca-limbah-by-id?noRec=' + item.noRec).then(function (res) {
									$scope.selectedData = res.data;
									var dataTotal = $scope.selectedData.detailJenisLimbah;
									var dataTemp = {};
									for(var i = 0; i < dataTotal.length; i++) {
										dataTemp = dataTotal[i].jumlah;
										total.push(dataTemp);										
									}
									const reducer = (accumulator, currentValue) => accumulator + currentValue;
									$scope.totalLimbahMasukB3 = total.reduce(reducer);
									console.log($scope.totalLimbahMasukB3)
								});
								var popUp = $('#popUpEdit').data('kendoWindow');
								popUp.open().center();
							}
						},
						{
							name: 'Hapus',
							title: 'Delete',
							click: function (e) {
								e.preventDefault();
								var grid = $('#idDataNeracaLimbah').data('kendoGrid');
								var item = grid.dataItem($(e.target).closest('tr'));
								var periode = item.periodeAwal + ' s/d ' + item.periodeAhir
								ManageKKKL.getOrderList('neraca-limbah/delete-neraca-limbah?noRec=' + item.noRec).then(function (res) {
									toastr.success('Sukses menghapus data periode  ' + periode);
									$scope.init();
									grid.refresh();
									$scope.sourceOrder.refresh();
								});
							}
						},
						{
							name: 'Detail',
							title: 'Detail',
							click: function (e) {
								var grid = $('#idDataNeracaLimbah').data('kendoGrid');
								var item = grid.dataItem($(e.target).closest('tr'));
								e.preventDefault();
								debugger;
								$state.go('NeracaLimbahDetail', {
									noRec: item.noRec
								});
							}
						}
					]
				}
			];

			$scope.countTotal = function() {

				if($scope.selectedData.neracaLimbah.residu == undefined) return;
				var jumlahSisa = $scope.selectedData.neracaLimbah.residu + $scope.selectedData.neracaLimbah.jumlahYangBelumTerkelola,
					totalLimbahMasuk = $scope.totalLimbahMasukB3;
				$scope.selectedData.neracaLimbah.kinerjaPengelolaan = (jumlahSisa - totalLimbahMasuk) / totalLimbahMasuk;

			}
			$scope.editDataNeracaLimbah = function () {
				
				var data = {
					"noRec": $scope.selectedData.neracaLimbah.noRec,
					"periodeAwal": $scope.selectedData.neracaLimbah.periodeAwal,
					"residu": $scope.selectedData.neracaLimbah.residu,
					"periodeAhir": $scope.selectedData.neracaLimbah.periodeAhir,
					"catatan": $scope.selectedData.neracaLimbah.catatan,
					"kinerjaPengelolaan": $scope.selectedData.neracaLimbah.kinerjaPengelolaan,
					"jumlahYangBelumTerkelola": $scope.selectedData.neracaLimbah.jumlahYangBelumTerkelola,
					"totalLimbahMasuk":  $scope.selectedData.neracaLimbah.jumlahYangBelumTerkelola
				}
				ManageKKKL.saveDataSarPras( data ,'neraca-limbah/update-neraca-limbah').then(function(res) {
					console.log(JSON.stringify(res.data));
					var popUp = $('#popUpEdit').data('kendoWindow');
					popUp.close();
					$scope.init();
				})
			}

			$scope.init = function () {
				TampilDataLimbahKeluar.getOrderList("neraca-limbah/list-neraca-limbah").then(function (dat) {
					$scope.sourceOrder = new kendo.data.DataSource({
						pageable: true,
						pageSize: 5,
						data:dat.data.data,
						schema: {
							model: {
								id: 'neracaLimbahId',
								fields: {
									catatan: { editable: false },
									jumlahYangBelumTerkelola: { type: 'number', editable: false },
									kinerjaPengelolaan: { type: 'number', editable: false },
									periodeAhir: { editable: false },
									periodeAwal: { editable: false },
									residu: { type: 'number', editable: false }
								}
							}
						}
					});
					dat.data.data.forEach(function (datas) {
						var namaHari = ['Senin', 'Selasa', 'Rabu', 'Kamis','Jumat','Sabtu','Minggu'];
						var namaBulan = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
						var awal = new Date(datas.periodeAwal),
							hariAwal = namaHari[awal.getDay() - 1] ,
							tglAwal = awal.getDate(),
							// bulanAwal = namaBulan[awal.getMonth()],
							bulanAwal = awal.getMonth() + 1,
							tahunAwal = awal.getFullYear();
							// startDate = hariAwal + ', ' + tglAwal + ' ' + bulanAwal + ' ' + tahunAwal;
							if(tglAwal < 10) {
								tglAwal = '0' + awal.getDate()
							}
							if(bulanAwal < 10) {
								bulanAwal = '0' + awal.getMonth();
							}
						var startDate = tahunAwal +  '/' +  bulanAwal + '/' + tglAwal;
							
						datas.periodeAwal = startDate;

						var akhir = new Date(datas.periodeAhir),
							hariAkhir = namaHari[akhir.getDay() - 1],
							tglAkhir = akhir.getDate(),
							// bulanAkhir = namaBulan[akhir.getMonth()],
							bulanAkhir = akhir.getMonth() + 1,
							tahunAkhir = akhir.getFullYear();
							// endDate = hariAkhir + ', ' + tglAkhir + ' ' + bulanAkhir + ' ' + tahunAkhir;
							if(tglAkhir < 10) {
								tglAkhir = '0' + awal.getDate()
							}
							if(bulanAkhir < 10) {
								bulanAkhir = '0' + awal.getMonth();
							}
						var endDate = tahunAkhir + '/' + bulanAkhir + '/' + tglAkhir;
						datas.periodeAhir = endDate;
					})
				});
			}
			$scope.init();
			
			$scope.formatPercentage = {
                format: "p2",
                min: 0,
                decimals: 2
            };

			$scope.kl = function (current) {
				$scope.current = current;
				console.log(current)
			}
			$scope.navToDetail = function () {
				if ($scope.current == undefined || $scope.current == "" || $scope.current == null) {
					toastr.warning('Anda belum memilih row', 'Perhatian');
				} else {
					$state.go('NeracaLimbahDetail', {
						noRec: $scope.current.noRec
					});
				}
			};
			$scope.cetakLaporan = function (current) {
				if (current == undefined) {
					toastr.warning('Anda Belum Memilih Data Untuk Dicetak')
				} else {
					// var monthS, dayS, yearS;
					// var monthE, dayE, yearE;
					// var startDate = new Date(current.periodeAwal);
					// var endDate = new Date(current.periodeAhir);
					// monthS = (startDate.getMonth() + 1);
					// if (monthS < 10) {
					// 	monthS = '0' + (startDate.getMonth() + 1)
					// }
					// dayS = startDate.getDate();
					// if (dayS < 10) {
					// 	dayS = '0' + startDate.getDate();
					// }
					// yearS = startDate.getFullYear();

					// monthE = (endDate.getMonth() + 1);
					// if (monthE < 10) {
					// 	monthE = '0' + (endDate.getMonth() + 1);
					// }
					// dayE = endDate.getDate();
					// if (dayE < 10) {
					// 	dayE = '0' + endDate.getDate();
					// }
					// yearE = endDate.getFullYear();
					// var fullStartDate = yearS + '/' + monthS + '/' + dayS;
					// var fullEndDate = yearE + '/' + monthE + '/' + dayE;
					// var url = 'reporting/neracaLimbahB3?noRec=' + current.noRec + '&startDate=' + fullStartDate + '&endDate=' + fullEndDate;
					var url = 'reporting/neracaLimbahB3?noRec=' + current.noRec + '&startDate=' + current.periodeAwal + '&endDate=' + current.periodeAhir;
					var urlLaporan = cetakHelper.openURLReporting(url);
					window.open(urlLaporan, '', 'width:600, height:500');
				}

			}
		}
	]);
});