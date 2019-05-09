define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SkriningGiziAnakCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
		function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
			debugger;

			var isNotClick = true;
			$scope.noCM = $state.params.noCM;
			$rootScope.showMenu = true;
			$rootScope.showMenuDetail = false;

			$scope.isRawatInap = window.isRawatInap;
			// if ($scope.isRawatInap === undefined)
			// 	$scope.isRawatInap = true
			// console.log(JSON.stringify($scope.isRawatInap));

			$scope.pasien = {};
			$scope.item = {};
			var date = new Date();

			$scope.arrSkriningGiziAnak = [
                { "name": "Berat Badan", "nilai": "", "type": "numeric", "ket": "Kg", "noRec": "" },
                { "name": "Tinggi Badan", "nilai": "", "type": "numeric", "ket": "Kg", "noRec": "" },
                { "name": "Lingkar Kepala", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "", "visible": false }
            ];
            ModelItem.getDataDummyGeneric("DataTandaVital", false).then(function(data){
                debugger;
                $scope.DataTandaVital = data
            })
            $scope.DataSourceSkriningGizi=function(){
                var noCm = $state.params.noCM;
                var tglAwal = "";
                var tglAkhir = "";
                var status = "";

                findPasien.getTandaVitals(noCm, tglAwal, tglAkhir, status).then(function(e) {
                    debugger;
					$scope.dataSkriningGizi = e.data[0];
                    $scope.arrSkriningGiziAnak[0].nilai=$scope.dataSkriningGizi.beratBadan;
                    $scope.arrSkriningGiziAnak[1].nilai=$scope.dataSkriningGizi.tinggiBadan;
                    $scope.arrSkriningGiziAnak[2].nilai=$scope.dataSkriningGizi.lingkarKepala;
                })
            };
            $scope.DataSourceSkriningGizi();
			// get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
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
				if (usia >= 0 && usia <= 11) {$scope.isNeonatal = true}
				if (usia >= 12 && usia <= 216) {$scope.isAnak = true}
				// if (usia >= 217) {$scope.isDewasa = true}
				// debugger;
			});

			// mengambil data VO
			ModelItem.setActiveMenu($rootScope.listActive, "SkriningGizi");
            $scope.formId = 1;
			$scope.arrPengkajianAnak = [];
			$scope.pasienAnak = {};
			$scope.opsiYaTidak = [
				// maipulasi data detil skrining obstetri
				{"id": 67,"nama": "Tidak","descNilai": "0","value": null},
				{"id": 66,"nama": "Ya","descNilai": "1","value": null}
			]

            /* get master form skrining gizi */
			findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				$scope.formMaster.detail.forEach(function(frmMaster){
					if (frmMaster.id === 2) {
						var masterData = frmMaster.detail;
						masterData.forEach(function(subFrm){
							if (subFrm.detail && subFrm.id === 3) {
								subFrm.detail.forEach(function(e){
									if (e.detail && e.id === 4) {
										e.detail.forEach(function(items){
											items.detail = $scope.opsiYaTidak; // modifikasi data detail
											if(items.id === 5) {
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
														$scope.arrPengkajianAnak.push(arrSkor)
														debugger;
													}
												})
												$scope.pasienAnak.nutisiBuruk = items;
											}
											if(items.id === 6) {
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
														$scope.arrPengkajianAnak.push(arrSkor)
														debugger;
													}
												})
												$scope.pasienAnak.beratBadan = items
											}
											if(items.id === 7) {
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
														$scope.arrPengkajianAnak.push(arrSkor)
														debugger;
													}
												})
												$scope.pasienAnak.kondisiTertentu = items
											}
											if(items.id === 8) {
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
														$scope.arrPengkajianAnak.push(arrSkor)
														debugger;
													}
												})
												$scope.pasienAnak.resikoMalnutrisi = items
											}
										})
									}
								})
							}
							if (subFrm.detail && subFrm.id === 16) {
								$scope.pasienAnak.daftarResikoMalnutrisi = subFrm
							}
						})
						// console.log(JSON.stringify($scope.pasienAnak.daftarResikoMalnutrisi));
						getTotal();
					}
				})
			});

			//Validasi Ketika radio button di klik
            $scope.cekSkor = function(data, stat) {
				var result = $.grep($scope.arrPengkajianAnak, function(e) { 
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
					$scope.arrPengkajianAnak.push(tempData);
					// console.log(JSON.stringify($scope.arrPengkajianAnak));
				} else {
					for (var i = 0; i < $scope.arrPengkajianAnak.length; i++)
						if ($scope.arrPengkajianAnak[i].idParent && $scope.arrPengkajianAnak[i].idParent === data.id) { 
							$scope.arrPengkajianAnak.splice(i, 1);
							break;
						}
					$scope.arrPengkajianAnak.push(tempData);
					// console.log(JSON.stringify($scope.arrPengkajianAnak));
					debugger;
				}
				getTotal();
			}
            
			var getTotal = function() {
				var skorAwal = 0;
				$scope.arrPengkajianAnak.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
					debugger;
				})
				$scope.totalSkor = skorAwal
			}

			$scope.cekTotalSkor = function(data, stat){
				isNotClick = false;
				var skor = 0;

				for(var i = 0; i < $scope.listPertanyaanSkriningGizi.length; i++)
				{
					if($scope.listPertanyaanSkriningGizi[i].stat.name == "Ya")
					{
						skor += $scope.listPertanyaanSkriningGizi[i].nilai;

					}
				}
				$scope.item.TotalSkor = skor;
				var currentData = _.find($scope.tempListSkriningGizi, function(arr){ return arr.skriningGizi.id == data.id; });
				var indexArray = _.indexOf($scope.tempListSkriningGizi, currentData);

				var objYaTidak = {
					"id":stat.id
				}

				$scope.tempListSkriningGizi[indexArray].yaTidak = objYaTidak;
				if(stat.name == "Ya")
				{
					for(var i=0; i < $scope.listPertanyaanSkriningGizi.length; i++){
						if( $scope.tempListSkriningGizi[indexArray].skriningGizi.id == $scope.listPertanyaanSkriningGizi[i].id)
						{
							$scope.tempListSkriningGizi[indexArray].nilai = $scope.listPertanyaanSkriningGizi[i].nilai;
						}
					}
				}
				else{
					$scope.tempListSkriningGizi[indexArray].nilai = "0";
				}
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
			// simpan data
			$scope.Save = function() { // simpan data ke master pap
				var dataForm = [];
				$scope.arrPengkajianAnak.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData)
					debugger;
				});
				if (dataForm.length !== 0) {
					if ($scope.noRecTransaksi) {
						$scope.tempData = {   
							"noRec": $scope.noRecTransaksi,
							"pengkajianAwalBaru":{  
								"noRec": $scope.noRecPap
							},
							"detailPengkajianAwal": dataForm
						}
						ManagePasien.updatePengkajianAwalPasien($scope.tempData).then(function(e) {
							$scope.saveGizi();
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
							$scope.saveGizi();
							$scope.Next();

						})
					}
				}
			}
			$scope.saveGizi = function(){ // simpan data ke service lama
				$scope.item.skriningGizi = $scope.setSkriningGiziForSend($scope.DataTandaVital, $scope.arrSkriningGiziAnak);
                    
                var beratBadan = $scope.item.skriningGizi[0].nilai;
                var tinggiBadan = $scope.item.skriningGizi[1].nilai;
                var lingkarKepala = $scope.item.skriningGizi[2].nilai;
                if($scope.dataSkriningGizi){
                    debugger;
                    var tglInput;
                    if ($scope.dataSkriningGizi.tglInput === null) {
                        tglInput = dateHelper.getPeriodeFormatted(new Date());
                    } else {
                        tglInput =$scope.dataSkriningGizi.tglInput
                    }

                    var data = {
                        "noRec": $scope.dataSkriningGizi.noRec,
                        "tglInput": tglInput,
                        "pasienDaftar":{
                            "noRec": $state.params.noRec
                        },
                        "beratBadan": beratBadan,
                        "tinggiBadan": tinggiBadan,
                        "lingkarKepala": lingkarKepala
                    }
                    ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                        $scope.DataSourceSkriningGizi();
                    });
                } else {
                    debugger;
                    var data = {
                    "noRec":  null,
                    "pasienDaftar":{
                        "noRec": $state.params.noRec
                    },
                    "beratBadan": beratBadan,
                    "tinggiBadan": tinggiBadan,
                    "lingkarKepala": lingkarKepala
                    }
                    ManagePasien.saveTandavital(ModelItem.beforePost(data)).then(function(e) {
                        $scope.DataSourceSkriningGizi();
                    });
                }
			}
			$scope.Next = function() {
				$rootScope.next();
			}

		}
	]);
});