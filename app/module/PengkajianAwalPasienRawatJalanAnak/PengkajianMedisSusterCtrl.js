
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PengkajianMedisSusterCtrl', ['$timeout','$q','$rootScope', '$scope', 'ModelItem', 'DateHelper','FindPasien', '$state','ManagePasien',
        function($timeout,$q,$rootScope, $scope, ModelItem, DateHelper, findPasien, $state, ManagePasien) {
			// get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
            $scope.dataVOloaded = true;
            $scope.item = {};
            // findPasien.getPengkajianKebutuhanDasar($state.params.noRec).then(function(data) {
            //     debugger;
            //     $scope.List = data.data.data.kebutuhanDasar;
            // });
            $scope.formId = 713;
            $scope.arrKebutuhanDasar = [];
            $scope.listYaTidak = [{
                "id": 328,
                "descNilai": "",
                "value": null,
                "nama": "Tidak Ada Masalah"
            },
            {
                "id": 329,
                "descNilai": "",
                "value": null,
                "nama": "Ada Masalah"
            }]
            findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
				}
				$scope.formMaster = data.data.pengkajianAwal;
                console.log(JSON.stringify($scope.formMaster));
                $scope.formMaster.detail.forEach(function(item){
                    if (item.value) {
                        item.value = parseInt(item.value);
                        item.detail.forEach(function(opsi){
                            if (item.value === opsi.id) {
                                $scope.arrKebutuhanDasar.push({
                                    "id": opsi.id,
                                    "idParent": item.id,
                                    "descNilai": opsi.descNilai,
                                    "nama": opsi.nama,
                                    "value": opsi.value
                                })
                            }
                        })
                    } else {
                        item.detail.forEach(function(opsi){
                            if (opsi.nama === "Tidak ada masalah") {
                                debugger;
                                item.value = opsi.id;
                            }
                        })
                    }
                })
			});
            $scope.arrKeteranganKebDas = [];
            $scope.setKeterangan = function(data){
                var result = $.grep($scope.arrKeteranganKebDas, function(e) { 
                    debugger;
					return e.id == data.id;
				});
                if (result.length == 0) {
					$scope.arrKeteranganKebDas.push(data);
				} else {
					for (var i = 0; i < $scope.arrKeteranganKebDas.length; i++)
						if ($scope.arrKeteranganKebDas[i].id && $scope.arrKeteranganKebDas[i].id === data.id) { 
							$scope.arrKeteranganKebDas.splice(i, 1);
							break;
						}
					$scope.arrKeteranganKebDas.push(data);
				}
                console.log(JSON.stringify($scope.arrKeteranganKebDas));
                // $scope.arrKebutuhanDasar.forEach(function(e){
                //     debugger;
                //     if (e.idParent === data.id)
                //         e.descNilai = data.descNilai
                // })
            }
            $scope.klikOption = function(data, stat) {
                debugger;
                var result = $.grep($scope.arrKebutuhanDasar, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"nama": stat.nama,
					"value": stat.id
				}
				if (result.length == 0) {
					$scope.arrKebutuhanDasar.push(tempData);
				} else {
					for (var i = 0; i < $scope.arrKebutuhanDasar.length; i++)
						if ($scope.arrKebutuhanDasar[i].idParent && $scope.arrKebutuhanDasar[i].idParent === data.id) { 
							$scope.arrKebutuhanDasar.splice(i, 1);
							break;
						}
					$scope.arrKebutuhanDasar.push(tempData);
				}
                console.log(JSON.stringify($scope.arrKebutuhanDasar));
            }
            // ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data){
            //     $scope.listStatus = data;
            //     debugger;
            // });
			// $q.all([ModelItem.getDataDummyGeneric("OksigenasiPolaNafas", false),
            //     ModelItem.getDataDummyGeneric("OksigenasiBatuk", false),
            //     ModelItem.getDataDummyGeneric("OksigenasiSianosis", false),
            //     ModelItem.getDataDummyGeneric("CairanNadi", false),
            //     ModelItem.getDataDummyGeneric("CairanUbunUbun", false),
            //     ModelItem.getDataDummyGeneric("CairanTurgorKulit", false),
            //     ModelItem.getDataDummyGeneric("CairanCrt", false),
            //     ModelItem.getDataDummyGeneric("CairanEdema", false),
            //     ModelItem.getDataDummyGeneric("CairanAkral", false),
            //     ModelItem.getDataDummyGeneric("NeurologiKomponen", false),
            //     ModelItem.getDataDummyGeneric("NeurologiKejang", false),
            //     ModelItem.getDataDummyGeneric("NutrisiMukosa", false),
            //     ModelItem.getDataDummyGeneric("NutrisiStomatitis", false),
            //     ModelItem.getDataDummyGeneric("NutrisiMuntah", false),
            //     ModelItem.getDataDummyGeneric("NutrisiMual", false),
            //     ModelItem.getDataDummyGeneric("DefeaksiAnus", false),
            //     ModelItem.getDataDummyGeneric("DefeaksiBab", false),
            //     ModelItem.getDataDummyGeneric("DefeaksiFeses", false),
            //     ModelItem.getDataDummyGeneric("UrinBak", false),
            //     ModelItem.getDataDummyGeneric("UrinAlatGenitalia", false),
            //     ModelItem.getDataDummyGeneric("IntegumenWarna", false),
            //     ModelItem.getDataDummyGeneric("IntegumenKelainanKulit", false),
            //     ModelItem.getDataDummyGeneric("IntegumenKulit", false),
            //     ModelItem.getDataDummyGeneric("AnakAktif", false),
            //     ModelItem.getDataDummyGeneric("AnakLelah", false),
            //     ModelItem.getDataDummyGeneric("KognisiPenglihatan", false),
            //     ModelItem.getDataDummyGeneric("KognisiPendengaran", false),
            //     ModelItem.getDataDummyGeneric("KognisiDayaIngat", false),
            //     ModelItem.getDataDummyGeneric("StatusLamaTidur", false),
            //     ModelItem.getDataDummyGeneric("KonsepDiriGambaran", false),
            //     ModelItem.getDataDummyGeneric("PeranMasalah", false),
            //     ModelItem.getDataDummyGeneric("PeranPengaruhPenyakit", false),
            //     ModelItem.getDataDummyGeneric("KopingEfektif", false),
            //     ModelItem.getDataDummyGeneric("NilaiPertolongan", false),
            //     ModelItem.getDataDummyGeneric("NilaiHarapan", false),
            //     ModelItem.getDataDummyGeneric("PersepsiSehat", false),
            //     ModelItem.getDataDummyGeneric("PersepsiPenyakit", false),
            //     ModelItem.getDataDummyGeneric("PersepsiKegiatan", false)
            // ]).then(function(data) {
            // 	debugger;

            //     if (data[0].statResponse) {
            //         $scope.listOksigenasiPolaNafas = data[0];
            //         debugger;
                    
            //     }
            //     if (data[1].statResponse) {
            //         $scope.listOksigenasiBatuk = data[1];
            //     }
            //     if (data[2].statResponse) {
            //         $scope.listOksigenasiSianosis = data[2];
            //     }
            //     if (data[3].statResponse) {
            //         $scope.listCairanNadi = data[3];
            //     }
            //     if (data[4].statResponse) {
            //         $scope.listCairanUbunUbun = data[4];
            //     }
            //     if (data[5].statResponse) {
            //         $scope.listCairanTurgorKulit = data[5];
            //     }
            //     if (data[6].statResponse) {
            //         $scope.listCairanCrt = data[6];
            //     }
            //     if (data[7].statResponse) {
            //         $scope.listCairanEdema = data[7];
            //     }
            //     if (data[8].statResponse) {
            //         $scope.listCairanAkral = data[8];
            //     }
            //     if (data[9].statResponse) {
            //         $scope.listNeurologiKomponen = data[9];
            //     }
            //     if (data[10].statResponse) {
            //         $scope.listNeurologiKejang = data[10];
            //     }
            //     if (data[11].statResponse) {
            //         $scope.listNutrisiMukosa = data[11];
            //     }
            //     if (data[12].statResponse) {
            //         $scope.listNutrisiStomatitis = data[12];
            //     }
            //     if (data[13].statResponse) {
            //         $scope.listNutrisiMuntah = data[13];
            //     }
            //     if (data[14].statResponse) {
            //         $scope.listNutrisiMual = data[14];
            //     }
            //     if (data[15].statResponse) {
            //         $scope.listDefeaksiAnus = data[15];
            //     }
            //     if (data[16].statResponse) {
            //         $scope.listDefeaksiBab = data[16];
            //     }
            //     if (data[17].statResponse) {
            //         $scope.listDefeaksiFeses = data[17];
            //     }
            //     if (data[18].statResponse) {
            //         $scope.listUrinBak = data[18];
            //     }
            //     if (data[19].statResponse) {
            //         $scope.listUrinAlatGenitalia = data[19];
            //     }
            //     if (data[20].statResponse) {
            //         $scope.listIntegumenWarna = data[20];
            //     }
            //     if (data[21].statResponse) {
            //         $scope.listIntegumenKelainanKulit = data[21];
            //     }
            //     if (data[22].statResponse) {
            //         $scope.listIntegumenKulit = data[22];
            //     }
            //     if (data[23].statResponse) {
            //         $scope.listAnakAktif = data[23];
            //     }
            //     if (data[24].statResponse) {
            //         $scope.listAnakLelah = data[24];
            //     }
            //     if (data[25].statResponse) {
            //         $scope.listKognisiPenglihatan = data[25];
            //     }
            //     if (data[26].statResponse) {
            //         $scope.listKognisiPendengaran = data[26];
            //     }
            //     if (data[27].statResponse) {
            //         $scope.listKognisiDayaIngat = data[27];
            //     }
            //     if (data[28].statResponse) {
            //         $scope.listStatusLamaTidur = data[28];
            //     }
            //     if (data[29].statResponse) {
            //         $scope.listKonsepDiriGambaran = data[29];
            //     }
            //     if (data[30].statResponse) {
            //         $scope.listPeranMasalah = data[30];
            //     }
            //     if (data[31].statResponse) {
            //         $scope.listPeranPengaruhPenyakit = data[31];
            //     }
            //     if (data[32].statResponse) {
            //         $scope.listKopingEfektif = data[32];
            //     }
            //     if (data[33].statResponse) {
            //         $scope.listNilaiPertolongan = data[33];
            //     }
            //     if (data[34].statResponse) {
            //         $scope.listNilaiHarapan = data[34];
            //     }
            //     if (data[35].statResponse) {
            //         $scope.listPersepsiSehat = data[35];
            //     }
            //     if (data[36].statResponse) {
            //         $scope.listPersepsiPenyakit = data[36];
            //     }
            //     if (data[37].statResponse) {
            //         $scope.listPersepsiKegiatan = data[37];
            //     }
            //     $timeout(function()
            //     {
            //         debugger;
            //          $scope.item.polaNafas=$scope.listOksigenasiPolaNafas[0];
            //          $scope.item.batuk =$scope.listOksigenasiBatuk[0];
            //          $scope.item.sianosis =$scope.listOksigenasiSianosis[0];
            //          $scope.item.nadi =$scope.listCairanNadi[0];
            //          $scope.item.ubunUbun =$scope.listCairanUbunUbun[0];
            //          $scope.item.turgorKulit =$scope.listCairanTurgorKulit[0];
            //          $scope.item.crt =$scope.listCairanCrt[0];
            //          $scope.item.edema =$scope.listCairanEdema[0];
            //          $scope.item.akral =$scope.listCairanAkral[0];
            //          $scope.item.komponen =$scope.listNeurologiKomponen[0];
            //          $scope.item.kejang =$scope.listNeurologiKejang[0];
            //          $scope.item.mukosa =$scope.listNutrisiMukosa[0];
            //          $scope.item.stomatitis =$scope.listNutrisiStomatitis[0];
            //          $scope.item.muntah =$scope.listNutrisiMuntah[0];
            //          $scope.item.mual =$scope.listNutrisiMual[0];
            //          $scope.item.anus =$scope.listDefeaksiAnus[0];
            //          $scope.item.bab =$scope.listDefeaksiBab[0];
            //          $scope.item.feses =$scope.listDefeaksiFeses[0];
            //          $scope.item.bak =$scope.listUrinBak[0];
            //          $scope.item.alatGenitalia =$scope.listUrinAlatGenitalia[0];
            //          $scope.item.warna =$scope.listIntegumenWarna[0];
            //          $scope.item.kelainanKulit =$scope.listIntegumenKelainanKulit[0];
            //          $scope.item.kulit =$scope.listIntegumenKulit[0];
            //          $scope.item.aktif =$scope.listAnakAktif[0];
            //          $scope.item.lelah =$scope.listAnakLelah[0];
            //          $scope.item.penglihatan =$scope.listKognisiPenglihatan[0];
            //          $scope.item.pendengaran =$scope.listKognisiPendengaran[0];
            //          $scope.item.dayaIngat =$scope.listKognisiDayaIngat[0];
            //          $scope.item.lamaTidur =$scope.listStatusLamaTidur[0];
            //          $scope.item.gambaran =$scope.listKonsepDiriGambaran[0];
            //          $scope.item.masalah =$scope.listPeranMasalah[0];
            //          $scope.item.pengaruhPenyakit =$scope.listPeranPengaruhPenyakit[0];
            //          $scope.item.koping =$scope.listKopingEfektif[0];
            //          $scope.item.pertolongan =$scope.listNilaiPertolongan[0];
            //          $scope.item.harapan =$scope.listNilaiHarapan[0];
            //          $scope.item.sehat =$scope.listPersepsiSehat[0];
            //          $scope.item.penyakit =$scope.listPersepsiPenyakit[0];
            //          $scope.item.kegiatan =$scope.listPersepsiKegiatan[0];
            //     })
               
            // });
            // findPasien.getKebutuhanDasar($state.params.noRec).then(function(e){
            //     $scope.item = e.data.data.kebutuhanDasar;
            //     // console.log(JSON.stringify($scope.item));
            //     // debugger;
            // })
            $scope.listStatus = [
                {"id": 0, "checked": true, "name": "Tidak ada masalah"}, 
                {"id": 1, "checked": false, "name": "Ada masalah"}
            ];
            $scope.item = {};
            $scope.arrayDataKebutuhan = [];
            $scope.klikOksigenasi = function(list){
                if (list.id === 1) {
                    $scope.oksigenasi = {
                        "name": "oksigenasi",
                        "status": list.name,
                        "keterangan": ""
                    }
                    debugger;
                    $scope.arrayDataKebutuhan.push($scope.oksigenasi)
                }
            }
            $scope.klikCairan = function(list){
                if (list.id === 1) {
                    $scope.cairan = {
                        "name": "cairan",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.cairan)
                }
            }
            $scope.klikKesadaran = function(list){
                if (list.id === 1) {
                    $scope.kesadaran = {
                        "name": "kesadaran",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.kesadaran)
                }
            }
            $scope.klikNutrisi = function(list){
                if (list.id === 1) {
                    $scope.nutrisi = {
                        "name": "nutrisi",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.nutrisi)
                }
            }
            $scope.klikEliminasi = function(list){
                if (list.id === 1) {
                    $scope.eliminasi = {
                        "name": "eliminasi",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.eliminasi)
                }
            }
            $scope.klikIntegumen = function(list){
                if (list.id === 1) {
                    $scope.integumen = {
                        "name": "integumen",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.integumen)
                }
            }
            $scope.klikAktifitas = function(list){
                if (list.id === 1) {
                    $scope.aktifitas = {
                        "name": "aktifitas",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.aktifitas)
                }
            }
            $scope.klikSeksualitas = function(list){
               if (list.id === 1) {
                    $scope.seksualitas = {
                        "name": "seksualitas",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.seksualitas)
                }
            }
            $scope.klikTidur = function(list){
               if (list.id === 1) {
                    $scope.tidur = {
                        "name": "tidur",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.tidur)
                }
            }
            $scope.klikKonsep = function(list){
               if (list.id === 1) {
                    $scope.konsep = {
                        "name": "konsep",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.konsep)
                }
            }
            $scope.klikKoping = function(list){
                if (list.id === 1) {
                    $scope.koping = {
                        "name": "koping",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.koping)
                }
            }
            $scope.klikPersepsi = function(list){
                if (list.id === 1) {
                    $scope.persepsi = {
                        "name": "persepsi",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.persepsi)
                }
            }
            $scope.klikUpaya = function(list){
                if (list.id === 1) {
                    $scope.upaya = {
                        "name": "upaya",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.upaya)
                }
            }
            $scope.klikBermain = function(list){
                if (list.id === 1) {
                    $scope.bermain = {
                        "name": "bermain",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.bermain)
                }
            }
            $scope.klikRekreasi = function(list){
                if (list.id === 1) {
                    $scope.rekreasi = {
                        "name": "rekreasi",
                        "status": list.name,
                        "keterangan": ""
                    }
                    $scope.arrayDataKebutuhan.push($scope.rekreasi)
                }
            }
            $scope.Save = function() {
                var dataForm = [];
                $scope.arrKebutuhanDasar.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.value.toString()
					}
					dataForm.push(tmpData);
				});
                $scope.arrKeteranganKebDas.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.id
						},
						"nilai": data.value.toString()
					}
					dataForm.push(tmpData);
				});
                // console.log(JSON.stringify(dataForm));
                if ($scope.noRecTransaksi) {
					$scope.tempData = {   
						"noRec": $scope.noRecTransaksi,
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					ManagePasien.updatePengkajianAwalPasien($scope.tempData).then(function(e) {
						// $scope.Next();
					})
				} else {
					$scope.tempData = {  
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					ManagePasien.simpanPengkajianAwalPasien($scope.tempData).then(function(e) {
						// $scope.Next();
					})
				}
            };
		}
	]);
});
  