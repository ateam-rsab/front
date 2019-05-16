define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('ResumeRJCtrl', ['$q', '$scope', '$state', 'ManagePhp', '$timeout', 'CacheHelper', '$rootScope',
		function ($q, $scope, $state, ManagePhp, $timeout, cacheHelper,	$rootScope) {
			$scope.isRouteLoading = false;
			$scope.now = new Date()
			$scope.item = {
				tglresume: $scope.now
			} // set defined object

			var noReg = ''

			$scope.pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'))
			var cookie = document.cookie.split(';')
			var kelompokUser = cookie[0].split('=')
			var getCache = cacheHelper.get('cacheRekamMedis')
			if (getCache != undefined) {
				$scope.nocm = getCache[0]
				$scope.norecPd = getCache[8]
				noReg = getCache[7]
				$scope.item.namaruangan = getCache[12]
				
				// $rootScope.itemFormResumeRJ = getCache
			}

			loadData()

			$scope.resumeOpt = {
				//toolbar: [{
				//	name: "create", text: "Input Baru",
				//	template: '<button ng-click="inputBaru()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Input Baru</button>'
				//},],
				pageable: true,
				scrollable: true,
				columns: [
					// { field: "rowNumber", title: "#", width: 40, width: 40, attributes: { style: "text-align:right; padding-right: 15px;"}, hideMe: true},
					//  { field: "no", title: "No", width: 50 },
					{ field: "tglinputdiagnosa", title: "Tanggal", width: 120 },
					{ field: "namaruangan", title: "Unit/Klinik", width: 120 },
					{ field: "namadiagnosa", title: "Diagnosis", width: 150 },
					{ field: "kddiagnosa", title: "ICD", width: 120 },
					{ field: "jenisdiagnosa", title: "Obat-obatan/Jenis Pemeriksaan", width: 120 },
					{ field: "riwayatlalu", title: "Riwayat Rawat Inap & Prosedur Bedah/Operasi yang lalu", width: 150 },
					{ field: "namalengkap", title: "Dokter", width: 120 },
					{command: [{ imageClass: "k-icon k-i-pencil", text: "Detail", click: detailData }], title: "&nbsp;", width: 90 }
					//{ command: [{ imageClass: "k-icon k-delete", text: "Hapus", click: hapus }, { name: "edit", text: "Edit", click: editData }], title: "&nbsp;", width: 150 }
				]
			};

			$scope.inputBaru = function () {
				if (kelompokUser[1] == 'dokter') {
					$scope.item.namadokter = { id: $scope.pegawaiLogin.id, namalengkap: $scope.pegawaiLogin.namaLengkap }
				}
				$scope.popUp.center().open()
			}
			$scope.batal = function () {
				$scope.popUp.close()
			}

			//loadData();

			function hapus(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if (!dataItem) {
					toastr.error("Data Tidak Ditemukan");
					return
				}
				var itemDelete = {
					"norec": dataItem.norec
				}

				ManagePhp.postData(itemDelete, 'rekam-medis/post-resume-medis/delete').then(function (e) {
					if (e.status == 201) {
						loadData()
					}
				})

			}
			function editData(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if (!dataItem) {
					toastr.error("Data Tidak Ditemukan");
					return
				}
				$scope.item.norec = dataItem.norec
				$scope.item.tglresume = dataItem.tglresume
				$scope.item.namaruangan = dataItem.namaruangan
				$scope.item.diagnosis = dataItem.diagnosis
				$scope.item.icd = dataItem.icd
				$scope.item.jenispemeriksaan = dataItem.jenispemeriksaan
				$scope.item.riwayatlalu = dataItem.riwayatlalu
				$scope.item.namadokter = { id: dataItem.pegawaifk, namalengkap: dataItem.namadokter }
				$scope.popUp.center().open()

			}

			function detailData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.show = dataItem

				$scope.item.norec = dataItem.norec
				$scope.item.tglresume = dataItem.tglinputdiagnosa
				$scope.item.namaruangan = dataItem.namaruangan
				$scope.item.diagnosis = dataItem.namadiagnosa
				$scope.item.icd = dataItem.kddiagnosa
				$scope.item.jenispemeriksaan = dataItem.jenisdiagnosa
				$scope.item.riwayatlalu = dataItem.riwayatlalu
				$scope.item.namadokter = { id: dataItem.pegawaifk, namalengkap: dataItem.namalengkap }
    
                $scope.popUp.center().open();

            }

			function loadData() {
                //ManagePhp.getData("rekam-medis/get-anamnesis?noregistrasifk=" + norec_apd
                ManagePhp.getData("pasien/get-summarylistpasienbynoreg?noReg=" + noReg
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        for (let i in array) {

                        }
                        $scope.sourceResume = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }

			// function loadData() {
			// 	//$scope.isRouteLoading = true;
			// 	//ManagePhp.getData("rekam-medis/get-combo").then(function (e) {
			// 	//	$scope.listDokter = e.data.dokter
			// 	//})
			// 	//$scope.isRouteLoading = true;
            //     //var norReg = ""
            //     //if ($scope.item.noregistrasi != undefined) {
            //     //   norReg = "noReg=" + $scope.item.noregistrasi;
            //     //}
			// 	$q.all([
			// 		//ManagePhp.getData("rekam-medis/get-resume-medis/" + $scope.nocm)
			// 		ManagePhp.getData("pasien/get-summarylistpasienbynoreg?noReg=" + noReg)
			// 	]).then(function (res) {
			// 		if (res[0].statResponse) {
			// 			var result = res[0].data.data
			// 			if (result.length > 0) {
			// 				for (let index = 0; index < result.length; index++) {
			// 					result[index].no = index + 1
			// 				}
			// 			}

			// 			$scope.sourceResume = new kendo.data.DataSource({
			// 				data: result,
			// 				pageSize: 20,
			// 			});
			// 		}

			// 		$scope.isRouteLoading = false;
			// 	}, (error) => {
			// 		$scope.isRouteLoading = false;
			// 		throw error;
			// 	})


			// };

			//loadData()

			$scope.Save = function (data) {
				var item = {
					"norec": $scope.item.norec != undefined ? $scope.item.norec : "",
					"tglresume": moment($scope.item.tglresume).format('YYYY-MM-DD HH:mm'),
					"diagnosis": $scope.item.diagnosis != undefined ? $scope.item.diagnosis : "",
					"icd": $scope.item.icd != undefined ? $scope.item.icd : "",
					"jenispemeriksaan": $scope.item.jenispemeriksaan != undefined ? $scope.item.jenispemeriksaan : "",
					"riwayatlalu": $scope.item.riwayatlalu != undefined ? $scope.item.riwayatlalu : "",
					// "namadokter": $scope.item.namadokter != undefined ? $scope.item.namadokter.id : null,
					"pegawaifk": $scope.item.namadokter != undefined ? $scope.item.namadokter.id : null,
					"noregistrasifk": $state.params.noRec
				}

				ManagePhp.postData(item, 'rekam-medis/post-resume-medis/save').then(function (e) {
					// delete $scope.item;
					clear()
					init();
					 ManagePhp.postLogging('Summary List', 'Norec resumemedis_t',e.data.resume.norec, 'Resume RJ').then(function (res) {
                    })
				});
			};
			function clear() {
				delete $scope.item.namadokter
				delete $scope.item.diagnosis
				delete $scope.item.icd
				delete $scope.item.jenispemeriksaan
				delete $scope.item.riwayatlalu
			}
			function categoryDropDownEditor(container, options) {
				$('<input required name="' + options.field + '"/>')
					.appendTo(container)
					.kendoDropDownList({
						dataTextField: "jenisJabatan",
						dataValueField: "id",
						dataSource: $scope.listJenisJabatan
					});
			}
			var timeoutPromise;
			$scope.$watch('item.filterDiagnosis', function (newVal, oldVal) {
				if (newVal != oldVal) {
					applyFilter("diagnosis", newVal)
				}
			})
			$scope.$watch('item.filterJenisPemeriksaan', function (newVal, oldVal) {
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function () {
					if (newVal != oldVal) {
						applyFilter("jenispemeriksaan", newVal)
					}
				}, 500)
			})
			$scope.$watch('item.filterRiwayatLalu', function (newVal, oldVal) {
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function () {
					if (newVal != oldVal) {
						applyFilter("riwayatlalu", newVal)
					}
				}, 500)
			})

			function applyFilter(filterField, filterValue) {
				var dataGrid = $("#gridResume").data("kendoGrid");
				var currFilterObject = dataGrid.dataSource.filter();
				var currentFilters = currFilterObject ? currFilterObject.filters : [];

				if (currentFilters && currentFilters.length > 0) {
					for (var i = 0; i < currentFilters.length; i++) {
						if (currentFilters[i].field == filterField) {
							currentFilters.splice(i, 1);
							break;
						}
					}
				}

				if (filterValue.id) {
					currentFilters.push({
						field: filterField,
						operator: "eq",
						value: filterValue.id
					});
				} else {
					currentFilters.push({
						field: filterField,
						operator: "contains",
						value: filterValue
					})
				}

				dataGrid.dataSource.filter({
					logic: "and",
					filters: currentFilters
				})
			}
			$scope.resetFilter = function () {
				var dataGrid = $("#gridResume").data("kendoGrid");
				dataGrid.dataSource.filter({});
				delete $scope.item.filterDiagnosis
				delete $scope.item.filterJenisPemeriksaan
				delete $scope.item.filterRiwayatLalu
			}

			$scope.cetak = function () {
				if (confirm('View Resume? ')) {
					var stt = 'true';
				} else {
					var stt = 'false'
				}
				// Do nothing!
				var client = new HttpClient();
				client.get('http://127.0.0.1:1237/printvb/rekammedis?cetak-resume-rj=' + $scope.nocm
					+ '&view=' + stt
					, function (response) {
					});
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
		}
	]);
});