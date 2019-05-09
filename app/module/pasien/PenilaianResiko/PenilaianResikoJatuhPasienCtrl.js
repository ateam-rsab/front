define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenilaianResikoJatuhPasienCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
		function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
			// copy from PenilaianResikoJatuhPasienAnakCtrl.js
			var isNotClick = true;
			$scope.noCM = $state.params.noCM;
			$rootScope.showMenu = true;
			$rootScope.showMenuDetail = false;
            $scope.listStatusResikoJatuh = [{
                "id": 0, "name": "Risiko jatuh rendah", "desc": "Risiko jatuh rendah", "value": 0
            }, {
                "id": 1, "name": "Risiko jatuh tinggi", "desc": "Risiko jatuh tinggi", "value": 1
            }]
			$scope.dataForm = [];
            $scope.listPertanyaanResikoJatuh = [{
                "id": 1, "desc": "Apakah pernah jatuh dalam 3 bulan terakhir"
            }, {
                "id": 2, "desc": "Apakah menggunakan alat bantu (tongkat, kursi roda, dll)"
            }]
            $scope.isRawatInap = true;
			$scope.pasien = {};
			$scope.item = {};
			var date = new Date();
            $scope.noRecPap = window.localStorage.getItem('noRecPap'); // get noRecPap dari local storage yg di ush di halaman dashboard PAP
			$scope.formId = 147; //get master form skrining nyeri

			/*$scope.item.tglInputData = date;*/
			$scope.now = date;
			$scope.kajianAwal = cacheHelper.get("kajianAwal");
			if ($scope.kajianAwal === undefined)
				$scope.kajianAwal = {};
			findPasien.getByNoCM($scope.noCM).then(function(data) {
				$rootScope.currentPasien = data.data.data;
				$scope.pasien = data.data.data;
				var umur = $scope.pasien.umur.split(','),
					thn = parseInt(umur[0]),
					bln = parseInt(umur[1]),
					usia = (thn * 12) + bln;
				// if (usia >= 0 && usia <= 11) {$scope.isNeonatal = true}
				if (usia >= 12 && usia <= 216) {$scope.isAnak = true}
				if (usia >= 217) {$scope.isDewasa = true}
				// debugger;
			});

			// mengambil data VO
			ModelItem.setActiveMenu($rootScope.listActive, "ResikoJatuh");
				$scope.dataVOloaded = true;
			$q.all([
                // ModelItem.getDataDummyGeneric("DataPertanyaanSkriningGizi", false),
				ModelItem.getDataDummyGeneric("StatusYaTidak", false),
				// ModelItem.getDataDummyGeneric("DataPenyakit", false),
			]).then(function(data) {

				// if (data[0].statResponse)
				// {
				// 	/*$scope.listPertanyaanSkriningGizi = data[0];*/
					
				// 	$scope.listPertanyaanSkriningGizi = _.filter(data[0], function(e) {
                //         return e.kategori === '1';
                //     });

                //     $scope.tempListSkriningGizi = [];
				// 	for(var i=0; i<$scope.listPertanyaanSkriningGizi.length; i++)
				// 	{
				// 		var objSkrining = {
				// 			"id":$scope.listPertanyaanSkriningGizi[i].id
				// 		}

				// 		var obj = {
				// 			"nilai":"0",
				// 			"skriningGizi":objSkrining,
				// 			"noRec":"",
				// 			"yaTidak":{
				// 				"id":1
				// 			}
				// 		}

				// 		$scope.tempListSkriningGizi.push(obj);

				// 	}
				// }
				if (data[0].statResponse)
				{
					$scope.listStatusYaTidak = data[0];
				}

				// if (data[2].statResponse)
				// {
				// 	$scope.listDaftarPenyakit = data[2];
				// }
				// getDataCurentPasien();
			});
			$scope.arrParameterResikoInapAnak = [];
			$scope.arrParameterResikoInapDewasa = [];
			$scope.arrParameterResikoJalan = [];
            $scope.arrGeriatri = [];
			// paste dummy model disini

			findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
					debugger;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				$scope.formMaster.detail.forEach(function(frmMaster){
					if (frmMaster.id === 161) {
						var masterData = frmMaster.detail;
						masterData.forEach(function(subFrm){
							if (subFrm.id === 226) {
								var subData = subFrm.detail;
								subData.forEach(function(items){
									if (items.detail !== undefined) {
										items.detail.forEach(function(data){
											// debugger;
											if (data.value === "true") {
												// data.value = parseInt(data.value);
												$scope.arrGeriatri.push(data);
											}
										})
										// getTotalGeriatri();
									}
								})
							}
							if (subFrm.id === 198) {
								var subData = subFrm.detail;
								subData.forEach(function(e){
									if (e.id === 199) {
										e.detail.forEach(function(items){
											debugger;
											if (items.id === 200) {
												if (items.value !== null)
													items.value = parseInt(items.value);
												items.detail.forEach(function(data){
													if (items.value === data.id) {
														items.descNilai = data.descNilai;
														var arrSkor = {
															"id": data.id,
															"idParent": items.id,
															"descNilai": data.descNilai,
															"namaDetail": data.namaDetail,
															"value": "true"
														}
														$scope.arrParameterResikoInapDewasa.push(arrSkor)
													} else { 
														if (data.detail) {
															debugger;
															data.detail.forEach(function(x){
																debugger;
																if (items.value === x.id) {
																	items.descNilai = x.descNilai;
																	debugger;
																	var arrSkor = {
																		"id": x.id,
																		"idParent": items.id,
																		"descNilai": x.descNilai,
																		"namaDetail": x.namaDetail,
																		"value": "true"
																	}
																	$scope.arrParameterResikoInapDewasa.push(arrSkor)
																}
															})
														}
													}
												})
											}
										})
										$scope.getTotalDewasa();
									}
								})
							}
							if (subFrm.id === 162) {
								var subData = subFrm.detail;
								subData.forEach(function(e){
									if (e.id === 163) {
										debugger;
										e.detail.forEach(function(items){
											if (items.value !== null) {
												debugger;
												items.value = parseInt(items.value);
											}
											items.detail.forEach(function(data){
												debugger;
												if (items.value === data.id) {
													items.descNilai = data.descNilai;
													debugger;
													var arrSkor = {
														"id": data.id,
														"idParent": items.id,
														"descNilai": data.descNilai,
														"namaDetail": data.namaDetail,
														"value": "true"
													}
													$scope.arrParameterResikoInapAnak.push(arrSkor)
												} else { 
													debugger;
													if (data.detail) {
														debugger;
														data.detail.forEach(function(x){
															debugger;
															if (items.value === x.id) {
																debugger;
																var arrSkor = {
																	"id": x.id,
																	"idParent": items.id,
																	"descNilai": x.descNilai,
																	"namaDetail": x.namaDetail,
																	"value": "true"
																}
																$scope.arrParameterResikoInapAnak.push(arrSkor)
															}
														})
													}
												}
											})
										})
										$scope.getTotals();
									}
								})
							}
						})
					}
				})
			})
			$scope.cekSkor = function(data, stat) {
                data.value = stat.id;
                data.descNilai = stat.descNilai;
				var result = $.grep($scope.arrParameterResikoJalan, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"nama": stat.nama,
					"value": "true"
				}
				if (result.length == 0) {
					debugger;
					$scope.arrParameterResikoJalan.push(tempData);
					console.log(JSON.stringify($scope.arrParameterResikoJalan));
				} else {
					for (var i = 0; i < $scope.arrParameterResikoJalan.length; i++)
						if ($scope.arrParameterResikoJalan[i].idParent && $scope.arrParameterResikoJalan[i].idParent === data.id) { 
							$scope.arrParameterResikoJalan.splice(i, 1);
							break;
						}
					$scope.arrParameterResikoJalan.push(tempData);
					console.log(JSON.stringify($scope.arrParameterResikoJalan));
					debugger;
				}
                debugger;
			}
			$scope.cekSkors = function(data, stat) {
				debugger;
                data.value = stat.id;
                data.descNilai = stat.descNilai;
				var result = $.grep($scope.arrParameterResikoInapAnak, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"nama": stat.nama,
					"value": "true"
				}
				if (result.length == 0) {
					debugger;
					$scope.arrParameterResikoInapAnak.push(tempData);
					console.log(JSON.stringify($scope.arrParameterResikoInapAnak));
				} else {
					for (var i = 0; i < $scope.arrParameterResikoInapAnak.length; i++)
						if ($scope.arrParameterResikoInapAnak[i].idParent && $scope.arrParameterResikoInapAnak[i].idParent === data.id) { 
							$scope.arrParameterResikoInapAnak.splice(i, 1);
							break;
						}
					$scope.arrParameterResikoInapAnak.push(tempData);
					console.log(JSON.stringify($scope.arrParameterResikoInapAnak));
					debugger;
				}
				$scope.getTotals();
                debugger;
            }
			$scope.getTotals = function() {
				var skorAwal = 0;
				$scope.arrParameterResikoInapAnak.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
					debugger;
				})
				$scope.totalSkorResikoAnak = skorAwal
			}
			$scope.cekSkorDewasa = function(data, stat) {
                data.value = stat.id;
                data.descNilai = stat.descNilai;
				var result = $.grep($scope.arrParameterResikoInapDewasa, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"nama": stat.nama,
					"value": "true"
				}
				if (result.length == 0) {
					debugger;
					$scope.arrParameterResikoInapDewasa.push(tempData);
					console.log(JSON.stringify($scope.arrParameterResikoInapDewasa));
				} else {
					for (var i = 0; i < $scope.arrParameterResikoInapDewasa.length; i++)
						if ($scope.arrParameterResikoInapDewasa[i].idParent && $scope.arrParameterResikoInapDewasa[i].idParent === data.id) { 
							$scope.arrParameterResikoInapDewasa.splice(i, 1);
							break;
						}
					$scope.arrParameterResikoInapDewasa.push(tempData);
					console.log(JSON.stringify($scope.arrParameterResikoInapDewasa));
					debugger;
				}
				$scope.getTotalDewasa();
                debugger;
            }
			$scope.getTotalDewasa = function() {
				var skorAwal = 0;
				$scope.arrParameterResikoInapDewasa.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
					debugger;
				})
				$scope.totalSkorResikoDewasa = skorAwal
			}
			$scope.isChecked = function(id){
				var match = false;
				for(var i=0 ; i < $scope.arrGeriatri.length; i++) {
					if($scope.arrGeriatri[i].id == id){
					match = true;
					}
				}
				return match;
			};
            $scope.cekArrGeriatri = function(bool, item) {
				debugger;
				if(bool){
					// add item
					$scope.arrGeriatri.push(item);
				} else {
					// remove item
					for(var i=0 ; i < $scope.arrGeriatri.length; i++) {
						if($scope.arrGeriatri[i].id == item.id){
						$scope.arrGeriatri.splice(i,1);
						}
					}      
				}
                // var isExist = _.find($scope.arrGeriatri, function(dataExist) {
                //     return dataExist == data;
                // });

                // if (isExist == undefined) {
                //     $scope.arrGeriatri.push(data);
                // } else {
                //     $scope.arrGeriatri = _.without($scope.arrGeriatri, data);
                // }
				
				var skorAwal = 0;
				$scope.arrGeriatri.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
					debugger;
				})
				$scope.totalSkorResikoGeriatri = skorAwal;

				// getTotalGeriatri();
                console.log('list statResikoGeriatri : ' + JSON.stringify($scope.arrGeriatri));
            };
			$scope.Save = function() {
				var dataForm = [];
				$scope.arrParameterResikoJalan.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData)
					debugger;
				});
				$scope.arrParameterResikoInapAnak.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData)
					debugger;
				});
				$scope.arrParameterResikoInapDewasa.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData)
					debugger;
				});
				$scope.arrGeriatri.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.id
						},
						"nilai": "true"
					}
					dataForm.push(tmpData)
					debugger;
				});
				if ($scope.noRecTransaksi) {
					$scope.tempData = {   
						"noRec": $scope.noRecTransaksi,
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					ManagePasien.updatePengkajianAwalPasien($scope.tempData).then(function(e) {
						$scope.Next();
					})
				} else {
					$scope.tempData = {  
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					ManagePasien.simpanPengkajianAwalPasien($scope.tempData).then(function(e) {
						$scope.Next();
					})
				}
			}
			$scope.Next = function() {
				$rootScope.next();
			}

		}
	]);
});