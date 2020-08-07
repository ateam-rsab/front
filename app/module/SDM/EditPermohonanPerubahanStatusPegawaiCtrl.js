define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('EditPermohonanPerubahanStatusPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'ManageSdmNew', 'DateHelper', '$mdDialog', 'CetakHelper', '$state',
		function ($q, $rootScope, $scope, ModelItem, ManageSdm, ManageSdmNew, DateHelper, $mdDialog, cetakHelper, $state) {
			var currentEdit = JSON.parse(localStorage.getItem('DataPerubahanStatus'));
			$scope.pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));
			$scope.item = {};
			$scope.now = new Date();
			$scope.monthSelectorOptions = {
				start: "year",
				depth: "year"
			};
			$scope.datePickerOptionsCutiLuar = {
				format: 'yyyy-MM-dd',
				change: onChangeDate,
				// min: twoDaysAfter($scope.now)
				min: new Date(new Date().getFullYear(), new Date().getMonth() + 1, getNextMonth($scope.now))
			};
			$scope.datePickerOptions = {
				format: 'yyyy-MM-dd',
				change: onChangeDate
				// min: twoDaysAfter($scope.now)
			};
			function getNextMonth(date) {
				let now = new Date();
				let year = now.getFullYear();
				let month = now.getMonth();
				let today = now.getDate();
				let lastDay = new Date(year, month + 1, 0);
				if (lastDay == 31) {
					today = today - 1;
				} else if (lastDay == 28) {
					today = today + 2;
				} else if (lastDay == 29) {
					today = today + 1;
				}
				// debugger;
				return today;
			}
			function onChangeDate(e) {
				if ($scope.tanggalPermohonan.length > 1) {
					var lastModel = $scope.tanggalPermohonan.length - 1;
					for (var i = 0; i < $scope.tanggalPermohonan.length; i++) {
						if (i < lastModel && kendo.toString(new Date($scope.tanggalPermohonan[i].tgl), "MM/dd/yyyy") === kendo.toString(this.value(), "MM/dd/yyyy")) {
							if ($scope.dataItem.statusPegawai.id != 24 && $scope.dataItem.statusPegawai.id != 25 && $scope.dataItem.statusPegawai.id != 29) {
								toastr.error("Tanggal " + kendo.toString(this.value(), "dd/MM/yyyy") + " sudah diajukan", "Peringatan");
								$scope.tanggalPermohonan[lastModel].tgl = "";
								$(this.element).closest('span').addClass("duplicateDate");
								$(this.element).parent('span').addClass("duplicateDate");
								this.value("");
							}
						} else {
							$(this.element).closest('span').removeClass("duplicateDate");
							$(this.element).parent('span').removeClass("duplicateDate");
						}
					}
				}
			};
			$scope.addNewTgl = function () {
				var lastDate = $scope.tanggalPermohonan.length - 1;
				if ($scope.tanggalPermohonan[lastDate].tgl != "dd/MM/yyyy") {
					if ($scope.dataItem.statusPegawai.id == 27 || $scope.dataItem.statusPegawai.id == 26
						|| $scope.dataItem.statusPegawai.id == 28) {
						var newItemNo = $scope.tanggalPermohonan.length + 1;
						$scope.tanggalPermohonan.push({
							id: newItemNo,
							tgl: "dd/MM/yyyy"
						})
					} else if ($scope.dataItem.statusPegawai.id == 24 || $scope.dataItem.statusPegawai.id == 25) {
						if ($scope.tanggalPermohonan.length < 2) {
							var newItemNo = $scope.tanggalPermohonan.length + 1;
							$scope.tanggalPermohonan.push({
								id: newItemNo,
								tgl: "dd/MM/yyyy"
							})
						} else {
							messageContainer.error('Tanggal terdiri dari tanggal awal dan tanggal akhir (periode)')
						}

						//untuk sakit
					} else if ($scope.dataItem.statusPegawai.id == 29) {
						if ($scope.tanggalPermohonan.length < 2) {
							var newItemNo = $scope.tanggalPermohonan.length + 1;
							$scope.tanggalPermohonan.push({
								id: newItemNo,
								tgl: "dd/MM/yyyy"
							})
						} else {
							messageContainer.error('Tanggal terdiri dari tanggal awal dan tanggal akhir (periode)')
						}

						///untuk cuti tahunan
					} else if ($scope.dataItem.statusPegawai.id == 1) {

						var jumlahCutiN3 = 12
						if ($scope.dataItem.jumlahCutiN3 == undefined || $scope.dataItem.jumlahCutiN3 == null || $scope.dataItem.jumlahCutiN3 == 0) {
							jumlahCutiN3 = $scope.dataItem.jumlahCutiN3
						}



						var isBolehCuti = false
						if ($scope.dataItem.sisaCuti + $scope.dataItem.jumlahCutiN3 > 24 && $scope.dataItem.isTangguhkanN1 == true && $scope.tanggalPermohonan.length < 24 + $scope.dataItem.sisaCutiN1) {
							isBolehCuti = true
						} else if ($scope.dataItem.sisaCuti + $scope.dataItem.jumlahCutiN3 > 24 && $scope.dataItem.isTangguhkanN1 == false && $scope.tanggalPermohonan.length < 24) {
							isBolehCuti = true
						} else if ($scope.dataItem.sisaCuti + $scope.dataItem.jumlahCutiN3 <= 24 && $scope.dataItem.isTangguhkanN1 == true && $scope.tanggalPermohonan.length < $scope.dataItem.sisaCutiN1 + $scope.dataItem.sisaCuti + $scope.dataItem.jumlahCutiN3) {
							isBolehCuti = true
						} else if ($scope.dataItem.sisaCuti + $scope.dataItem.jumlahCutiN3 <= 24 && $scope.dataItem.isTangguhkanN1 == false && $scope.tanggalPermohonan.length < $scope.dataItem.sisaCuti + $scope.dataItem.jumlahCutiN3) {
							isBolehCuti = true
						}

						if (!isBolehCuti) {
							toastr.warning('Jumlah tanggal permohonan melebihi jatah cuti tahunan yang ditetapkan !')
							return
						}


						var newItemNo = $scope.tanggalPermohonan.length + 1;
						$scope.tanggalPermohonan.push({
							id: newItemNo,
							tgl: "dd/MM/yyyy"
						})



					} else {
						messageContainer.error('Jumlah sisa cuti tidak cukup, Jumlah sisa cuti anda : ' + $scope.dataItem.sisaCuti + ' hari')
					}

				} else {
					messageContainer.error('Tanggal yang diajukan belum dipilih.')
				}
			};
			$scope.showAddTgl = function (current) {
				return current.id === $scope.tanggalPermohonan[$scope.tanggalPermohonan.length - 1].id;
			};
			$scope.removeNewTgl = function (id) {
				if (id == 1 && $scope.tanggalPermohonan.length == 1) return;

				if ($scope.dataItem.statusPegawai.id == 24 || $scope.dataItem.statusPegawai.id == 25 || $scope.dataItem.statusPegawai.id == 29) {

				} else {

					for (var i = 0; i < $scope.tanggalPermohonan.length; i++) {
						if (id == $scope.tanggalPermohonan[i].id) {
							$scope.tanggalPermohonan.splice(i, 1);
							break;
						}
					}

				}
			};
			$q.all([
				ManageSdmNew.getListData("sdm/get-login-user-permohonan-status?idPegawai=" + $scope.pegawaiLogin.id),
				ManageSdmNew.getListData("pegawai/get-all-pegawai-kepala-ruangan"),
				ManageSdmNew.getListData("pegawai/get-all-jabatan"),
				// ManageSdm.findPegawaiById(ModelItem.getPegawai().id)
			]).then(function (result) {
				if (result[0].statResponse) {
					$scope.loginUser = result[0].data.data;
					load();
					// $scope.loadGrid();
				}
				if (result[1].statResponse) {
					$scope.listKaRuangan = result[1].data.data;
				}
				if (result[2].statResponse) {
					$scope.listAllJabatan = result[2].data.data;
				}
				$scope.getCuti();
				$scope.getIzin();
				// condition base if bagian sdm can view all permohonan perubahan status kehadiran
				// uncomment codes below to activate
				// if(result[2].statResponse){
				// 	if(result[2].data.data.subUnitKerja.indexOf("Sub Bagian Kesejahteraan Pegawai") >= 0){
				// 		urlDaftarPermohonan = "sdm/get-list-approval-status?namaPegawai=";
				// 	} else {
				// 		urlDaftarPermohonan = "sdm/get-list-approval-status?namaPegawai="+pegawaiLogin.nama
				// 	}
				// }
			});
			// ManageSdm.getItem("sdm/get-login-user-permohonan-status", true).then(function(dat){
			// 	$scope.loginUser = dat.data.data;
			// 	load();
			// 	$scope.loadGrid();
			// }, function(err){
			// 	console.log('error get user login data');
			// });
			var load = function () {
				var d = new Date();
				var y = d.getFullYear();
				$scope.item.tahunCutiN1 = y - 1
				$scope.item.tahunCutiN2 = y - 2

				if (currentEdit.isCutiLuarNegeri == "1") {
					$scope.cutiLuar = true;
					$scope.cutiDalam = false;
					$scope.datePickerOptionsCutiLuar.min = getNextMonth($scope.now);
				} else if (currentEdit.isCutiLuarNegeri == "2") {
					$scope.cutiLuar = false;
					$scope.cutiDalam = true;
				}

				//debugger;
				if (currentEdit && currentEdit.noRec === $state.params.noRec) {
					for (var key in currentEdit) {
						if (currentEdit.hasOwnProperty(key)) {
							if (key.indexOf("tgl") >= 0) {
								currentEdit[key] = DateHelper.getDateTimeFormatted3(new Date(currentEdit[key]));
							} else if (key == "listTanggal") {
								currentEdit[key].forEach(function (lisTgl) {
									for (var subKeys in lisTgl) {
										if (lisTgl.hasOwnProperty(subKeys)) {
											if (subKeys == "tgl") {
												lisTgl[subKeys] = DateHelper.getDateTimeFormatted3(new Date(lisTgl[subKeys]));
											}
										}
									}
								})


								$scope.tanggalPermohonan = currentEdit[key];
								for (var i = 0; i < $scope.tanggalPermohonan.length; i++) {
									$scope.tanggalPermohonan[i].id = i + 1;
								}
							}
						}
					}

					$scope.dataItem = currentEdit;

					$scope.item.isCutiLuarNegeri = $scope.dataItem.isCutiLuarNegeri;
					$scope.item.isCutiLuarKota = $scope.dataItem.isCutiLuarKota;
					// $scope.item.isCutiLuarNegeri="1";
					$scope.isRouteLoading = false;
				}
				// if($state.params.noRec) {
				//     $scope.isRouteLoading = true;
				//     // get daftar permohonan cuti per ruangan
				//     // var idSubUnitKerja = '';
				//     // if ($scope.loginUser.idSubUnitKerja) var idSubUnitKerja = $scope.loginUser.idSubUnitKerja;
				//     // ManageSdm.getItem("sdm/get-list-permohonan-status?unitKerjaId="+ idSubUnitKerja, true).then(function(dat){
				//     // 	$scope.dataMaster = dat.data.data.listData;

				//     // get daftar cuti per pegawai (berdasarkan hasil meeting dengan pihak SDM)
				//     ManageSdm.findPegawaiById(ModelItem.getPegawai().id).then(function(res){
				//         if(res.statResponse){
				//             var pegawaiLogin = res.data.data;
				//             var dataPermohonanPerubahanStatus = [];
				//             ManageSdm.getItem("sdm/get-list-approval-status?namaPegawai="+pegawaiLogin.nama).then(function(e){ // get permohonan status by user login
				// 				var currentPermohonan = _.find(e.data.data.listData, function(o){
				// 					return o.noRec === $state.params.noRec;
				// 				});
				// 				for (var key in currentPermohonan){
				// 					if(currentPermohonan.hasOwnProperty(key)){
				// 						if(key.indexOf("tgl")>=0){
				// 							currentPermohonan[key] = DateHelper.getTanggalFormattedNew(new Date(currentPermohonan[key]));
				// 						} else if(key == "lisTanggal"){
				// 							currentPermohonan[key].forEach(function(lisTgl){
				// 								for(var subKeys in lisTgl){
				// 									if(lisTgl.hasOwnProperty(subKeys)){
				// 										if(subKeys == "tgl"){
				// 											lisTgl[subKeys] = DateHelper.getTanggalFormattedNew(new Date(lisTgl[subKeys]));
				// 										}
				// 									}
				// 								}
				// 							})
				// 							$scope.tanggalPermohonan = currentPermohonan[key];
				// 							for(var i = 0; i < $scope.tanggalPermohonan.length; i++){
				// 								$scope.tanggalPermohonan[i].id = i + 1;
				// 							}
				// 						}
				// 					}
				// 				}
				// 				$scope.dataItem = currentPermohonan;
				//                 $scope.isRouteLoading = false;
				//             }, (err) => {
				//                 $scope.isRouteLoading = false;
				//             });
				//         }
				//     }, (err) => {
				//         $scope.isRouteLoading = false;
				//     });
				// } 
				else {
					messageContainer.warning('Data permohonan perubahan ptatus kehadiran pegawai tidak ditemukan');
				}
			};

			$scope.$watchGroup(['dataItem.namaPegawai', 'dataItem.statusPegawai'], function (newVals, oldVals) {
				if (!newVals[0] || !newVals[1]) return;
				ManageSdmNew.getListData("sdm/get-data-pegawai?pegawaiId=" + newVals[0].id, true).then(function (dat) {
					$scope.dataItem.kategoriPegawaiId = dat.data.data.kategoriPegawaiId;
					if (!$scope.dataItem.kategoriPegawaiId) {
						$scope.dataItem.jumlahCuti = "";
						$scope.dataItem.sisaCuti = "";
						$scope.dataItem.jumlahIjin = "";
						$scope.dataItem.sisaIjin = "";
						$scope.dataItem.jmlsakit = "";
					} /*else{
						$scope.getIzin(e);
					} */
					$scope.isRouteLoading = false;
				}, (err) => {
					$scope.isRouteLoading = false;
				}).then(function () {
					//Cuti Tahunan
					if ($scope.dataItem.statusPegawai.id == 1) {
						$scope.hideJumlahCuti = true;
						$scope.getCuti();

					} else {
						$scope.hideJumlahCuti = false;
					}
					//Sakit
					if ($scope.dataItem.statusPegawai.id == 29) {
						$scope.hideSakit = true;
						$scope.cutiHabis = false;
					} else {
						$scope.hideSakit = false;
					}

					//Ijin
					if ($scope.dataItem.statusPegawai.id == 27) {
						$scope.hideJumlahIjin = true;
						$scope.getIzin();
					} else {
						$scope.hideJumlahIjin = false;
					}

				});
			});

			// $scope.getDataPegawai = function (e) {
			// 	$scope.isRouteLoading = true;
			// 	ManageSdm.getItem("sdm/get-data-map-pegawai?pegawaiId="+e.id, true).then(function(dat){
			// 		// debugger;
			// 		// $scope.item.jabatan = dat.data.data.jabatan;
			// 		$scope.dataItem.nip = dat.data.data.nip;
			// 		// $scope.item.ruangan = dat.data.data.unitKerja;
			// 		// $scope.item.ruanganId = dat.data.data.unitKerjaId;
			// 		$scope.dataItem.kategoriPegawaiId = dat.data.data.kategoriPegawaiId;
			//                  if(!$scope.dataItem.kategoriPegawaiId){
			//                  $scope.dataItem.jumlahCuti = "";
			//                  $scope.dataItem.sisaCuti = "";
			//                  $scope.dataItem.jumlahIjin = "";
			//                  $scope.dataItem.sisaIjin = "";
			//                  $scope.dataItem.jmlsakit = "";
			// 		} /*else{
			// 			$scope.getIzin(e);
			// 		} */
			// 		$scope.listjabatan = dat.data.data.jabatan;
			//                  $scope.dataItem.namaJabatan=_.find($scope.listjabatan, function(jab) {
			//                      $scope.dataItem.unitkerja = jab.namaUnitKerja;
			//                      $scope.dataItem.ruangan = jab.namaSubunitKerja;
			//                      return jab.idJabatan;
			//                  });
			// 		$scope.isRouteLoading = false;
			// 	},(err) => {
			// 		$scope.isRouteLoading = false;
			// 	});
			// }

			$scope.getJabatan = function (params, value) {
				if (!value) return;
				ManageSdmNew.getListData("sdm/get-data-pegawai?pegawaiId=" + value.id, true).then(function (dat) {
					if (params === 'pegawai1') {
						$scope.currentData.jabatan1 = dat.data.data.jabatan;
					} else if (params === 'pegawai2') {
						$scope.currentData.jabatan2 = dat.data.data.jabatan;
					} else {
						// debugger;
					}
				})
			}
			$scope.getCuti = function () {
				$scope.cutiHabis = false;
				ManageSdmNew.getListData("sdm/get-data-cuti?pegawaiId=" + $scope.dataItem.namaPegawai.id + "&statusPegawaiId=" + $scope.dataItem.statusPegawai.id, true).then(function (dat) {

					$scope.dataItem.isTangguhkanN = dat.data.data.isTangguhkanN;
					$scope.dataItem.isTangguhkanN1 = dat.data.data.isTangguhkanN1;

					$scope.dataItem.sisaCuti = dat.data.data.sisaCutiN;
					$scope.dataItem.sisaCutiN1 = dat.data.data.sisaCutiN1;
					$scope.dataItem.sisaCutiN2 = dat.data.data.sisaCutiN2;

					$scope.dataItem.jumlahCutiB = dat.data.data.dataCutiB;
					$scope.dataItem.sisaCutiB = dat.data.data.sisaCutiB;

					$scope.dataItem.jumlahCuti = dat.data.data.dataCutiN;
					$scope.dataItem.jumlahCutiN1 = dat.data.data.dataCutiN1;
					$scope.dataItem.jumlahCutiN2 = dat.data.data.dataCutiN2;
					$scope.dataItem.jumlahCutiN3 = dat.data.data.dataCutiN3;

					$scope.sisaCutiTotal = $scope.dataItem.sisaCutiN2 + $scope.dataItem.sisaCutiN1 + $scope.dataItem.sisaCuti + $scope.dataItem.sisaCutiB;
					if ($scope.dataItem.sisaCutiN2 <= 0 && $scope.dataItem.sisaCutiN1 <= 0 && $scope.dataItem.sisaCuti <= 0 && $scope.dataItem.sisaCutiB <= 0) {
						$scope.cutiHabis = true;
					} else {
						$scope.cutiHabis = false;
					}

				});

				var cutiTahunan = 1;
				ManageSdmNew.getListData("sdm/get-jumlah-pengajuan-ketidakhadiran-diproses-edit?idPegawai=" + $scope.dataItem.namaPegawai.id + "&idPlan=" + cutiTahunan + "&noPlanning=" + $scope.dataItem.noPlanning, true).then(function (dat) {
					$scope.jumlahCutiTahunanDiproses = dat.data.data.jumlahPengajuanDiproses;
					$scope.jumlahCutiTahunDepanDiproses = dat.data.data.jumlahPengajuanTahunDepanDiproses;
				});
			}
			$scope.getIzin = function (e) {
				// debugger;
				$scope.cutiHabis = false;
				ManageSdmNew.getListData("sdm/get-data-cuti?pegawaiId=" + $scope.dataItem.namaPegawai.id + "&statusPegawaiId=" + $scope.dataItem.statusPegawai.id + "&kategoriPegawaiId=" + $scope.dataItem.kategoriPegawaiId, true).then(function (dat) {
					// +$scope.item.kategoriPegawaiId

					$scope.dataItem.jumlahIjin = dat.data.data.jatahIzin;
					$scope.dataItem.sisaIjin = dat.data.data.sisaIzin;
					$scope.sisaIzin = dat.data.data.sisaIzin;
					// if ($scope.dataItem.sisaIjin <= 0) {
					// 	$scope.cutiHabis = true;
					// } else {
					// 	$scope.cutiHabis = false;
					// }
				});

				var izin = 27;
				ManageSdmNew.getListData("sdm/get-jumlah-pengajuan-ketidakhadiran-diproses-edit?idPegawai=" + $scope.dataItem.namaPegawai.id + "&idPlan=" + izin + "&noPlanning=" + $scope.dataItem.noPlanning, true).then(function (dat) {
					$scope.jumlahIzinDiproses = dat.data.data.jumlahPengajuanDiproses;
				});
			}
			$scope.cutiHabis = false;
			$scope.dataVOloaded = true;
			$scope.disJumlahCuti = true;
			$scope.disSakit = true;
			$scope.hideJumlahCuti = false;

			$scope.showJumlahSakit = function () {
				if ($scope.dataItem.sakit.id == 1) {
					$scope.dataItem.jmlsakit = 3;
				} else {
					$scope.dataItem.jmlsakit = 5;
				}
				var RealDay = days(new Date($scope.item.tglAkhir), new Date($scope.item.tglAwal));
				var dateDiff = days(new Date($scope.item.tglAkhir), new Date($scope.item.tglAwal));
				removeA(dateDiff, 'Sunday');
				removeA(dateDiff, 'Saturday');
				var totalHari = dateDiff.length + 1;
				if (totalHari > $scope.dataItem.jmlsakit) {
					alert('Jumlah Permohonan Tidak Boleh Lebih dari : ' + $scope.dataItem.jmlsakit + ' hari')
					$scope.item.tglAwal = "";
					$scope.item.tglAkhir = "";
				}
			}
			$scope.listDetailSakit = [{
				"id": 1, "sakit": "Rawat Jalan"
			}, {
				"id": 2, "sakit": "Rawat Inap"
			}]


			$scope.radioIsCutiLuarNegeri = [
				{ "id": 1, "nama": "Ya" }, { "id": 2, "nama": "Tidak" }]

			$scope.radioIsCutiLuarKota = [
				{ "idStatus": 1, "namaStatus": "Ya " }, { "idStatus": 2, "namaStatus": "Tidak " }]

			$scope.setMinDate = function () {
				// alert($scope.item.isCutiLuarNegeri);
				if ($scope.item.isCutiLuarNegeri === "1") {
					$scope.cutiLuar = true;
					$scope.cutiDalam = false;
					// $scope.datePickerOptionsCutiLuar.min = getNextMonth($scope.now);
				}
				else {
					$scope.cutiLuar = false;
					$scope.cutiDalam = true;
				}
			}

			$scope.alertTgl = function (ev) {
				$mdDialog.show(
					$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(false)
						.title('Peringatan')
						.textContent('Jumlah hari yang anda pilih melebihi sisa cuti')
						.ariaLabel('Alert Tgl')
						.ok('OK')
						.targetEvent(ev)
				);
			};
			var days = function (date1, date2) {
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
				var _days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
				var days = [];
				for (var i = 0; i < diff; i++) {
					date1.setDate(date1.getDate() + i);
					days.push(_days[date1.getDay()]);
				}
				return days;
			};

			var removeA = function (arr) {
				var what, a = arguments, L = a.length, ax;
				while (L > 1 && arr.length) {
					what = a[--L];
					while ((ax = arr.indexOf(what)) !== -1) {
						arr.splice(ax, 1);
					}
				}
				return arr;
			}

			// var bisaCuti = false;
			//          var condition2;
			//          var condition = true;
			//          $scope.checkTanggalCuti = function () {
			//              var listTanggalPermohonan = [];
			//              var listTanggalPengajuan = [];
			//              $scope.tanggalPermohonan.forEach(function (el) {
			//                  if(el.tgl) {
			//                      el.tgl.setHours(7);
			//                      listTanggalPermohonan.push(DateHelper.toTimeStamp(new Date(el.tgl)));
			//                  } else {
			//                      el.setHours(7);
			//                      listTanggalPermohonan.push(DateHelper.toTimeStamp(new Date(el)));
			//                  }
			//              });
			//              ManageSdmNew.getListData('sdm/get-list-tanggal-permohonan?idPegawai=' + $scope.dataItem.namaPegawai.id).then(res => {
			//                  var dataPengajuan = res.data.data;
			//                  for(let i = 0; i < dataPengajuan.length; i++) {
			//                      dataPengajuan[i].lisTanggal.forEach(function(data) {
			//                          listTanggalPengajuan.push(data.tgl);
			//                      })
			//                  }

			//                  for(let i = 0; i < listTanggalPengajuan.length; i ++) {
			//                      for(let ii = 0; ii < listTanggalPermohonan.length; ii++) {
			//                          if(listTanggalPengajuan[i] === listTanggalPermohonan[ii]) {
			//                              condition2 = 'no';
			//                              condition = false;
			//                              $scope.tanggalTidakBisaCuti = listTanggalPermohonan[ii];
			//                              break;
			//                          } else {
			//                              condition2 = 'yes';
			//                              condition = true;
			//                              continue;
			//                          }

			//                      }
			//                      if(!condition) {
			//                          condition2 = 'no';
			//                          condition = false;
			//                          break;
			//                      } else {
			//                          condition2 = 'yes';
			//                          condition = true;
			//                      }
			//                  }
			//                  bisaCuti = condition;
			//              });
			//          }

			$scope.Save = function () {
				// $scope.checkTanggalCuti();
				//             if(!bisaCuti) {
				//                 $scope.checkTanggalCuti();
				//                 toastr.info('Tanggal permohonan sudah diajukan!');
				//                 return;
				//             } else {
				//                 $scope.checkTanggalCuti();
				//             }
				if ($scope.dataItem.statusPegawai == undefined) {
					toastr.error('Status kehadiran harus diisi')
					return
				}
				var listRawRequired = [
					"dataItem.namaPegawai|ng-model|Pegawai",
					"dataItem.tglPengajuan|k-ng-model|Tanggal pengajuan",
					"dataItem.statusPegawai|ng-model|Status kehadiran",
					"dataItem.alamatCuti|k-ng-model|Alamat",
					"dataItem.nomorTelepon|ng-model|No Telepon",

				]

				if ($scope.dataItem.statusPegawai.id == 28) {
					listRawRequired.push(
						"dataItem.noSuratTugas|ng-model|No Surat Tugas",
						"dataItem.noNotaDinas|ng-model|No Nota Dinas",
						"dataItem.tglNotaDinas|k-ng-model|Tanggal Nota Dinas",
						"dataItem.jabatanPemberiNotaDinas|k-ng-model|Jabatan Pemberi Nota Dinas",
						"dataItem.alamatTugas|ng-model|Alamat Tugas"
					)
				}

				if ($scope.dataItem.statusPegawai.id == 1) {
					var tahunFuture = [];
					for (var i = 0; i < $scope.tanggalPermohonan.length; i++) {
						if ($scope.tanggalPermohonan[i].tgl instanceof Date)
							var tgl = $scope.tanggalPermohonan[i].tgl.getFullYear()
						else
							var tgl = parseInt($scope.tanggalPermohonan[i].tgl.substr(0, 4))

						var yearNow = parseInt(moment(new Date()).format('YYYY'))
						// if(tgl > yearNow){
						//     toastr.warning('Sisa cuti belum ditangguhkan/ Hutang cuti tidak diperkenankan !')
						//     return
						// }    
						if (tgl > yearNow) {
							tahunFuture.push(tgl);
							// if ($scope.dataItem.isTangguhkanN == false && $scope.dataItem.sisaCuti > 6 && $scope.sisaCutiTotal == $scope.dataItem.sisaCuti) {
							// 	toastr.warning('Sisa cuti belum ditangguhkan/ Hutang cuti tidak diperkenankan !')
							// 	return
							// }
						}
					}
					if ($scope.dataItem.isTangguhkanN == false && $scope.dataItem.sisaCuti > 6 && tahunFuture.length + $scope.jumlahCutiTahunDepanDiproses > $scope.sisaCutiTotal - 6) {
						toastr.warning('Sisa cuti belum ditangguhkan/ Hutang cuti tidak diperkenankan !')
						return
					}
					//cek jumlah tanggal tidak lebih banyak dari total sisa cuti
					if ($scope.tanggalPermohonan.length > ($scope.sisaCutiTotal - $scope.jumlahCutiTahunanDiproses)) {
						toastr.warning('Jumlah tanggal permohonan melebihi sisa cuti total dan pengajuan cuti tahunan yang belum diputuskan persetujuannya!')
						return
					}
				} else if ($scope.dataItem.statusPegawai.id == 27) {
					if ($scope.tanggalPermohonan.length > ($scope.sisaIzin - $scope.jumlahIzinDiproses)) {
						toastr.warning('Jumlah tanggal permohonan melebihi sisa hak izin tahunan!')
						return
					}
				}

				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if (isValid.status) {
					var listDate = [], dataSend = {};
					for (var i = 0; i < $scope.tanggalPermohonan.length; i++) {
						var element = $scope.tanggalPermohonan[i];
						for (var key in element) {
							if (element.hasOwnProperty(key) && key === "tgl") {
								if (element[key] instanceof Date)
									element[key] = DateHelper.getDateTimeFormatted3(element[key])
							} else {
								delete element[key];
							}
						}
					}

					var statusCutiLuarNegeri = "";
					if ($scope.item.isCutiLuarNegeri == undefined) {
						toastr.warning('Status cuti luar negeri belum diisi', 'Peringatan');
						return;
					} else {
						if ($scope.item.isCutiLuarNegeri == 1) {
							statusCutiLuarNegeri = "true";
						}
						else {
							statusCutiLuarNegeri = "false";
						}
					}

					var statusCutiLuarKota = "";
					if ($scope.item.isCutiLuarKota == undefined) {
						toastr.warning('Status cuti luar kota belum diisi', 'Peringatan');
						return;
					} else {
						if ($scope.item.isCutiLuarKota == 1) {
							statusCutiLuarKota = "true";
						}
						else {
							statusCutiLuarKota = "false";
						}
					}

					dataSend = {
						"noRec": $scope.dataItem.noRec,
						"noPlanning": $scope.dataItem.noPlanning,
						"pegawai": {
							"id": $scope.dataItem.namaPegawai.id
						},
						"statusPegawaiPlan": {
							"id": $scope.dataItem.statusPegawai.id
						},
						// "ruanganKerja": {
						// 	"id": $scope.dataItem.ruanganId
						// },
						"alamatCuti": $scope.dataItem.alamatCuti,
						"nomorTelepon": $scope.dataItem.nomorTelepon,
						"deskripsiStatusPegawaiPlan": $scope.dataItem.deskripsiStatusPegawaiPlan,
						"keteranganLainyaPlan": $scope.dataItem.keterangan,
						"tglPengajuan": $scope.dataItem.tglPengajuan,
						"listTanggal": $scope.tanggalPermohonan,
						"noSuratTugas": $scope.dataItem.noSuratTugas,
						"noNotaDinas": $scope.dataItem.noNotaDinas,
						"tglNotaDinas": $scope.dataItem.tglNotaDinas,
						"jenisPerawatan": $scope.dataItem.sakit.id,
						"alamatTugas": $scope.dataItem.alamatTugas,
						"jabatanPemberiNotaDinas": {
							"id": $scope.dataItem.jabatanPemberiNotaDinas.id != null ? $scope.dataItem.jabatanPemberiNotaDinas.id : 14
						},
						"isCutiLuarNegeri": statusCutiLuarNegeri,
						"isCutiLuarKota": statusCutiLuarKota
					}
					// ManageSdm.editPermohonanUbhStsHadirPgw(dataSend).then(function(e) {
					ManageSdmNew.saveData(dataSend, "sdm/update-pegawai-status").then(function (e) {
						if (e.data.data.bisaCuti == false) {
							toastr.info('Tanggal permohonan sudah diajukan!');
							return;
						}
						// $scope.loadGrid();
						// load();
						$scope.isNext = true;
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			}

			$scope.Back = function () {
				window.history.back();
			}
		}
	]);
});