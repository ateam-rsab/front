define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SkriningGiziDewasaCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
		function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) 
		{
			debugger;
			$scope.dataForm = {};
			var isNotClick = true;
			$scope.isRawatInap = window.isRawatInap;
			// if ($scope.isRawatInap === undefined)
			// 	$scope.isRawatInap = true;
			// console.log(JSON.stringify($scope.isRawatInap));
			// debugger;
			$rootScope.showMenuPengkajianMedis = false;
			$scope.noCM = $state.params.noCM;
			$rootScope.showMenu = true;
			$rootScope.showMenuDetail = false;
			$scope.pasien = {};
			$scope.item = {};
			var date = new Date();
			/*$scope.item.tglInputData = date;*/
			$scope.now = date;

			$scope.arrSkriningGiziDewasa = [
                { "name": "Berat Badan", "nilai": "", "type": "numeric", "ket": "Kg", "noRec": "" },
                { "name": "Tinggi Badan", "nilai": "", "type": "numeric", "ket": "Kg", "noRec": "" },
                { "name": "Lingkar Kepala", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "", "visible": false },
                { "name": "Index Masa Tubuh", "nilai": "", "type": "", "ket": "Kg / m2", "noRec": "" },
                { "name": "Status Gizi", "nilai": "", "type": "", "ket": "", "noRec": "" }
            ];
			
            ModelItem.getDataDummyGeneric("DataTandaVital", false).then(function(data){
                debugger;
                $scope.DataTandaVital = data
            })
            $scope.DataSourceSkriningGizi=function(){
                var noCm = $state.params.noCM;
                var tglAwal = "";
                var tglAkhir = "";
                var status = 2;

                findPasien.getTandaVitals(noCm, tglAwal, tglAkhir, status).then(function(e) {
					var akhir = e.data.length - 1;
                    debugger;
                    var dataSkriningGizi = e.data[akhir];

                    $scope.arrSkriningGiziDewasa[0].nilai=dataSkriningGizi.beratBadan;
                    $scope.arrSkriningGiziDewasa[1].nilai=dataSkriningGizi.tinggiBadan;
                    $scope.arrSkriningGiziDewasa[2].nilai=dataSkriningGizi.lingkarKepala;
                    $scope.arrSkriningGiziDewasa[3].nilai=dataSkriningGizi.imt;
                    $scope.arrSkriningGiziDewasa[4].nilai=dataSkriningGizi.statusGizi;
                })
            };
            $scope.DataSourceSkriningGizi();
			$scope.kajianAwal = cacheHelper.get("kajianAwal");
			if ($scope.kajianAwal === undefined)
				$scope.kajianAwal = {};
			findPasien.getByNoCM($scope.noCM).then(function(data) {
				$rootScope.currentPasien = data.data.data;
				$scope.pasien = data.data.data;
			});
			ModelItem.setActiveMenu($rootScope.listActive, "SkriningGiziDewasa");
			
			$scope.noRecPap = window.localStorage.noRecPap;
			$scope.formId = 1;
			$scope.arrPengkajianDewasa = [];
			$scope.arrPengkajianObstetri = [];
			$scope.pasienDewasa = {};
			$scope.pasienObstetri = {};
			$scope.opsiYaTidak = [
				// maipulasi data detil skrining obstetri
				{"id": 67,"nama": "Tidak","descNilai": "0","value": null},
				{"id": 66,"nama": "Ya","descNilai": "1","value": null}
			]
			findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				$scope.formMaster.detail.forEach(function(frmMaster){
					if (frmMaster.id === 55) {
						var masterData = frmMaster.detail;
						masterData.forEach(function(subFrm){
							if (subFrm.id === 56) {
								var subData = subFrm.detail;
								subData.forEach(function(items){
									if (items.id === 57) {
										if (items.value !== null)
											items.value = parseInt(items.value);
										$scope.pasienDewasa.turunBeratBadan = items;
										var getskor = $scope.pasienDewasa.turunBeratBadan;
										if (getskor.detail) {
											getskor.detail.forEach(function(e){
												debugger;
												if (items.value === e.id) {
													var arrSkor = {
														"id": e.id,
														"idParent": items.id,
														"descNilai": e.descNilai,
														"namaDetail": e.namaDetail,
														"value": "true"
													}
													$scope.arrPengkajianDewasa.push(arrSkor)
												} else { 
													if (e.detail) {
														e.detail.forEach(function(x){
															debugger;
															if (items.value === x.id) {
																var arrSkor = {
																	"id": x.id,
																	"idParent": items.id,
																	"descNilai": x.descNilai,
																	"namaDetail": x.namaDetail,
																	"value": "true"
																}
																$scope.arrPengkajianDewasa.push(arrSkor)
																debugger;
															}
														})
														debugger;
													}
												}
											})
										}
										debugger;
									}
									if (items.id === 65) {
										if (items.value !== null)
											items.value = parseInt(items.value);
										$scope.pasienDewasa.tidakNafsuMakan = items;
										var getskor = $scope.pasienDewasa.tidakNafsuMakan;
										if (getskor.detail) {
											getskor.detail.forEach(function(e){
												if (items.value === e.id) {
													var arrSkor = {
														"id": e.id,
														"idParent": items.id,
														"descNilai": e.descNilai,
														"namaDetail": e.namaDetail,
														"value": "true"
													}
													$scope.arrPengkajianDewasa.push(arrSkor)
												} else { 
													if (e.detail) {
														e.detail.forEach(function(x){
															debugger;
															if (items.value === x.id) {
																var arrSkor = {
																	"id": x.id,
																	"idParent": items.id,
																	"descNilai": x.descNilai,
																	"namaDetail": x.namaDetail,
																	"value": "true"
																}
																$scope.arrPengkajianDewasa.push(arrSkor)
																debugger;
															}
														})
														debugger;
													}
												}
											})
										}
										debugger;
									}
									if (items.id === 698) {
										if (items.value !== null)
											items.value = parseInt(items.value);
										$scope.pasienDewasa.perluKonsultasi = items;
										var getskor = $scope.pasienDewasa.perluKonsultasi;
										if (getskor.detail) {
											getskor.detail.forEach(function(e){
												if (items.value === e.id) {
													var arrSkor = {
														"id": e.id,
														"idParent": items.id,
														"descNilai": 0,
														"namaDetail": e.namaDetail,
														"value": "true"
													}
													$scope.arrPengkajianDewasa.push(arrSkor)
												} else { 
													if (e.detail) {
														e.detail.forEach(function(x){
															debugger;
															if (items.value === x.id) {
																var arrSkor = {
																	"id": x.id,
																	"idParent": items.id,
																	"descNilai": 0,
																	"namaDetail": x.namaDetail,
																	"value": "true"
																}
																$scope.arrPengkajianDewasa.push(arrSkor)
																debugger;
															}
														})
														debugger;
													}
												}
											})
										}
										debugger;
									}
								})
								debugger;
							}
						})
						console.log(JSON.stringify($scope.arrPengkajianDewasa));
						getTotalDewasa();
					}
					if (frmMaster.id === 41) {
						var masterData = frmMaster.detail;
						masterData.forEach(function(subFrm){
							if (subFrm.detail && subFrm.id === 42) {
								subFrm.detail.forEach(function(e){
									if (e.detail && e.id === 43) {
										e.detail.forEach(function(items){
											items.detail = $scope.opsiYaTidak; // modifikasi data detail
											if(items.id === 47) {
												if(items.value !== null)
													items.value = parseInt(items.value)
												items.detail.forEach(function(x){
													if(x.id === items.value){
														var arrSkor = {
															"id": x.id,
															"idParent": items.id,
															"descNilai": x.descNilai,
															"namaDetail": x.namaDetail,
															"value": "true"
														}
														$scope.arrPengkajianObstetri.push(arrSkor)
														debugger;
													}
												})
												$scope.pasienObstetri.nilaiHB = items;
											}
											if(items.id === 45) {
												if(items.value !== null)
													items.value = parseInt(items.value)
												items.detail.forEach(function(x){
													if(x.id === items.value){
														var arrSkor = {
															"id": x.id,
															"idParent": items.id,
															"descNilai": x.descNilai,
															"namaDetail": x.namaDetail,
															"value": "true"
														}
														$scope.arrPengkajianObstetri.push(arrSkor)
														debugger;
													}
												})
												$scope.pasienObstetri.metabolisme = items
											}
											if(items.id === 46) {
												if(items.value !== null)
													items.value = parseInt(items.value)
												items.detail.forEach(function(x){
													if(x.id === items.value){
														var arrSkor = {
															"id": x.id,
															"idParent": items.id,
															"descNilai": x.descNilai,
															"namaDetail": x.namaDetail,
															"value": "true"
														}
														$scope.arrPengkajianObstetri.push(arrSkor)
														debugger;
													}
												})
												$scope.pasienObstetri.tambahBeratBadan = items
											}
											if(items.id === 44) {
												if(items.value !== null)
													items.value = parseInt(items.value)
												items.detail.forEach(function(x){
													if(x.id === items.value){
														var arrSkor = {
															"id": x.id,
															"idParent": items.id,
															"descNilai": x.descNilai,
															"namaDetail": x.namaDetail,
															"value": "true"
														}
														$scope.arrPengkajianObstetri.push(arrSkor)
														debugger;
													}
												})
												$scope.pasienObstetri.asupanMakanan = items
											}
										})
									}
								})
							}
						})
						console.log(JSON.stringify($scope.pasienObstetri));
						getTotalObstetri();
					}
				})
				// $scope.pasienDewasa.turunBeratBadan = $scope.formMaster.detail[1].detail[0].detail[0];
				// $scope.pasienDewasa.tidakNafsuMakan = $scope.formMaster.detail[1].detail[0].detail[1];
				// $scope.pasienDewasa.perluKonsultasi = $scope.formMaster.detail[1].detail[0].detail[2];
				// console.log(JSON.stringify($scope.pasienDewasa));
				// debugger;
				// $scope.pasien = data.data.data;
			});
			
			var getTotalDewasa = function() {
				var skorAwal = 0;
				$scope.arrPengkajianDewasa.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
					debugger;
				})
				$scope.dataForm.totalSkorDewasa = skorAwal
			}
			var getTotalObstetri = function() {
				var skorAwal = 0;
				$scope.arrPengkajianObstetri.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
					debugger;
				})
				$scope.dataForm.totalSkorObstetri = skorAwal
			}

			// $scope.arrayDetilPengkajianAwal = [];
			$scope.cekTotalSkor = function(data, stat) {
				var result = $.grep($scope.arrPengkajianDewasa, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"namaDetail": stat.namaDetail,
					"value": "true"
				}
				if (result.length == 0) {
					debugger;
					$scope.arrPengkajianDewasa.push(tempData);
					console.log(JSON.stringify($scope.arrPengkajianDewasa));
				} else {
					for (var i = 0; i < $scope.arrPengkajianDewasa.length; i++)
						if ($scope.arrPengkajianDewasa[i].idParent && $scope.arrPengkajianDewasa[i].idParent === data.id) { 
							$scope.arrPengkajianDewasa.splice(i, 1);
							break;
						}
					$scope.arrPengkajianDewasa.push(tempData);
					console.log(JSON.stringify($scope.arrPengkajianDewasa));
					debugger;
				}

				// $scope.arrayDetilPengkajianAwal.forEach(function(data){
				// 	skor += parseInt(data.descNilai);
				// })
				getTotalDewasa();
			}

			$scope.klikChange = function(data, stat) {
				debugger;
				// $scope.pasienDewasa.perluKonsultasi.detail.forEach(function(items){
				// 	items.value = null
				// })
				// stat.value = "true";
				var result = $.grep($scope.arrPengkajianDewasa, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"namaDetail": stat.namaDetail,
					"value": "true"
				}
				if (result.length == 0) {
					debugger;
					$scope.arrPengkajianDewasa.push(tempData);
					// console.log(JSON.stringify($scope.arrayDetilPengkajianAwal));
				} else {
					for (var i = 0; i < $scope.arrPengkajianDewasa.length; i++)
						if ($scope.arrPengkajianDewasa[i].idParent && $scope.arrPengkajianDewasa[i].idParent === data.id) { 
							$scope.arrPengkajianDewasa.splice(i, 1);
							break;
						}
					$scope.arrPengkajianDewasa.push(tempData);
					console.log(JSON.stringify($scope.arrPengkajianDewasa));
					debugger;
				}
			}
			
			$scope.cekSkorObstetri = function(data, stat) {
				var result = $.grep($scope.arrPengkajianObstetri, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"namaDetail": stat.namaDetail,
					"value": "true"
				}
				if (result.length == 0) {
					debugger;
					$scope.arrPengkajianObstetri.push(tempData);
					console.log(JSON.stringify($scope.arrPengkajianObstetri));
				} else {
					for (var i = 0; i < $scope.arrPengkajianObstetri.length; i++)
						if ($scope.arrPengkajianObstetri[i].idParent && $scope.arrPengkajianObstetri[i].idParent === data.id) { 
							$scope.arrPengkajianObstetri.splice(i, 1);
							break;
						}
					$scope.arrPengkajianObstetri.push(tempData);
					console.log(JSON.stringify($scope.arrPengkajianObstetri));
					debugger;
				}
				getTotalObstetri();
			}
			$scope.Save = function() {
				var dataForm = [];
				$scope.arrPengkajianDewasa.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData)
					debugger;
				});
				$scope.arrPengkajianObstetri.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData)
					debugger;
				});
				// var konsultasiGizi = {};
				// $scope.pasienDewasa.perluKonsultasi.detail.forEach(function(data){
				// 	if (data.value === 'true') {
				// 		var tmpData = {
				// 		"pengkajianAwal": {
				// 			"id": data.id
				// 		},
				// 		"nilai": data.value
				// 	}
				// 	dataForm.push(tmpData)
				// 	}
				// })
				// dataForm.push(konsultasiGizi);
				if ($scope.noRecTransaksi) {
					$scope.tempData = {   
						"noRec": $scope.noRecTransaksi,
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					// console.log(JSON.stringify($scope.tempData));
					ManagePasien.updatePengkajianAwalPasien($scope.tempData).then(function(e) {
						$scope.saveGizi();
					})
				} else {
					$scope.tempData = {  
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					// console.log(JSON.stringify($scope.tempData));
					ManagePasien.simpanPengkajianAwalPasien($scope.tempData).then(function(e) {
						$scope.saveGizi();
					})
				}
				
			}
			$scope.Next = function() {
				$rootScope.next();
			}
			$scope.setSkriningGiziForSend = function(masterSkriningGizi, arrSkriningGizi) {
                debugger;
                var listDataSkriningGizi = [];
                for (var i = 8; i < masterSkriningGizi.length; i++) {
                     var nilai = "";
                     var noRec = "";
                     var objDataSkriningGizi = "";
                     for (var j = 0; j < arrSkriningGizi.length; j++) {
                         if (arrSkriningGizi[j].name == masterSkriningGizi[i].name) {
                             noRec = arrSkriningGizi[j].noRec;
                             nilai = arrSkriningGizi[j].nilai;
							 debugger;
                             break;
                         }
                     }
                     if (masterSkriningGizi[i] != "") {
                         var obj = {
                             "noRec": noRec,
                             "nilai": nilai,
                             "dataSkriningGizi": masterSkriningGizi[i]
                         }
                         listDataSkriningGizi.push(obj);
                     }
                 }
                 return listDataSkriningGizi;
            };
			$scope.saveGizi = function() {
                debugger;
                // $scope.item.TekananDarah = $scope.td.tekananDarah1 + "/" + $scope.td.tekananDarah2;
                $scope.item.skriningGizi = $scope.setSkriningGiziForSend($scope.DataTandaVital, $scope.arrSkriningGiziDewasa);
                    
                var beratBadan = $scope.item.skriningGizi[0].nilai;
                var tinggiBadan = $scope.item.skriningGizi[1].nilai;
                var lingkarKepala = $scope.item.skriningGizi[2].nilai;
                var imt = $scope.item.skriningGizi[3].nilai;
                var statusGizi = $scope.item.skriningGizi[5].nilai;
				debugger;

                if($scope.dataSkriningGizi){
                    debugger;
                    var tglInput;
                    if ($scope.dataSkriningGizi[0].tglInput === null) {
                        tglInput = dateHelper.getPeriodeFormatted(new Date());
                    } else {
                        tglInput =$scope.dataSkriningGizi[0].tglInput
                    }

                    var data = {
                        "noRec": $scope.dataSkriningGizi[0].noRec,
                        "tglInput": tglInput,
                        "pasienDaftar":{
                            "noRec": $state.params.noRec
                        },
                        "beratBadan": beratBadan,
                        "tinggiBadan": tinggiBadan,
                        "lingkarKepala": lingkarKepala,
                        "imt": imt,
                        "statusGizi": statusGizi
                    }
                    // console.log(JSON.stringify(data));
                    ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                        $scope.DataSourceSkriningGizi();
                    });
                }else{
                    debugger;
                    var data = {
                    "noRec":  null,
                    "pasienDaftar":{
                        "noRec": $state.params.noRec
                    },
                    "beratBadan": beratBadan,
                    "tinggiBadan": tinggiBadan,
                    "lingkarKepala": lingkarKepala,
					"imt": imt,
					"statusGizi": statusGizi
                    }
                    // console.log(JSON.stringify(data));
                    ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                        $scope.DataSourceSkriningGizi();
                    });
                }
            }
		}
	]);
});