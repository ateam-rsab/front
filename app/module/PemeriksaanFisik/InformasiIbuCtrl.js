define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InformasiIbuCtrl', ['ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper','$timeout',
        function(managePasien, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper,$timeout) {
            $scope.title = "Tanda Vital";
            $rootScope.showMenu = true;
            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
            $scope.formId = 372;

            $scope.arrParameterInformasiIbu = [];

			// paste dummy model disini
            // $scope.dummyDataMasterForm = {
            //     "pengkajianAwal": {
            //         "id": 372,
            //         "nama": "Informasi Ibu",
            //         "detail": [
            //             {
            //                 "id": 374,
            //                 "detail": [
            //                     {
            //                         "id": 376,
            //                         "descNilai": "",
            //                         "value": null,
            //                         "nama": "Tidak"
            //                     },
            //                     {
            //                         "id": 375,
            //                         "descNilai": "",
            //                         "value": null,
            //                         "nama": "Ya"
            //                     }
            //                 ],
            //                 "descNilai": "",
            //                 "value": null,
            //                 "nama": "Ibu dirawat"
            //             },
            //             {
            //                 "id": 377,
            //                 "descNilai": ".......",
            //                 "value": null,
            //                 "nama": "No. MR ibu"
            //             },
            //             {
            //                 "id": 382,
            //                 "detail": [
            //                     {
            //                         "id": 383,
            //                         "descNilai": "",
            //                         "value": null,
            //                         "nama": "Kawin"
            //                     },
            //                     {
            //                         "id": 384,
            //                         "descNilai": "",
            //                         "value": null,
            //                         "nama": "Tidak kawin"
            //                     }
            //                 ],
            //                 "descNilai": "",
            //                 "value": null,
            //                 "nama": "Status perkawinan"
            //             },
            //             {
            //                 "id": 381,
            //                 "descNilai": ".......",
            //                 "value": null,
            //                 "nama": "Agama"
            //             },
            //             {
            //                 "id": 385,
            //                 "detail": [
            //                     {
            //                         "id": 387,
            //                         "descNilai": "",
            //                         "value": null,
            //                         "nama": "Bidan"
            //                     },
            //                     {
            //                         "id": 386,
            //                         "descNilai": "",
            //                         "value": null,
            //                         "nama": "Dokter"
            //                     }
            //                 ],
            //                 "descNilai": "",
            //                 "value": null,
            //                 "nama": "Ditolong oleh"
            //             },
            //             {
            //                 "id": 378,
            //                 "descNilai": ".......",
            //                 "value": null,
            //                 "nama": "Ruang"
            //             },
            //             {
            //                 "id": 379,
            //                 "descNilai": ".......",
            //                 "value": null,
            //                 "nama": "Tanggal lahir"
            //             },
            //             {
            //                 "id": 373,
            //                 "descNilai": ".......",
            //                 "value": null,
            //                 "nama": "Nama"
            //             },
            //             {
            //                 "id": 380,
            //                 "descNilai": ".......",
            //                 "value": null,
            //                 "nama": "Bangsa"
            //             }
            //         ],
            //         "descNilai": "",
            //         "value": null
            //     }
            // }
            // if ($scope.dummyDataMasterForm.pengkajianAwalTransaksi) {
            //     $scope.noRecTransaksi = $scope.dummyDataMasterForm.pengkajianAwalTransaksi.noRec;
            //     debugger;
            // }
            // $scope.formMaster = $scope.dummyDataMasterForm.pengkajianAwal;
            // $scope.formMaster.detail.forEach(function(frmMaster){
            //     if (frmMaster.value) {
            //         switch (frmMaster.id){
            //             case 378:
            //                 frmMaster.value = {
            //                     "id" : parseInt(frmMaster.value)
            //                 }
            //                 break;
            //             case 380:
            //                 frmMaster.value = {
            //                     "id" : parseInt(frmMaster.value)
            //                 }
            //                 break;
            //             case 381:
            //                 frmMaster.value = {
            //                     "id" : parseInt(frmMaster.value)
            //                 }
            //                 break;
            //         }
            //     }
            // })
            // end of dummy model
            
			findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
					debugger;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				$scope.formMaster.detail.forEach(function(frmMaster){
                    if (frmMaster.value) {
                        switch (frmMaster.id){
                            case 378:
                                frmMaster.value = {
                                    "id" : parseInt(frmMaster.value)
                                }
                                break;
                            case 380:
                                frmMaster.value = {
                                    "id" : parseInt(frmMaster.value)
                                }
                                break;
                            case 381:
                                frmMaster.value = {
                                    "id" : parseInt(frmMaster.value)
                                }
                                break;
                        }
                    }
                })
			})
            $scope.klikOption = function(data, stat) {
                debugger;
                var result = $.grep($scope.arrParameterInformasiIbu, function(e) { 
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
					$scope.arrParameterInformasiIbu.push(tempData);
				} else {
					for (var i = 0; i < $scope.arrParameterInformasiIbu.length; i++)
						if ($scope.arrParameterInformasiIbu[i].idParent && $scope.arrParameterInformasiIbu[i].idParent === data.id) { 
							$scope.arrParameterInformasiIbu.splice(i, 1);
							break;
						}
					$scope.arrParameterInformasiIbu.push(tempData);
				}
                console.log(JSON.stringify($scope.arrParameterInformasiIbu));
            }
            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listStatusYaTidak = data;
                // console.log(JSON.stringify($scope.listStatusYaTidak));
            });
            $timeout(function()
                {
                    $scope.item.apaiburawat=$scope.listStatusYaTidak[1];
                })
            $scope.listDitolong = [
                {
                    "id": 1,
                    "kdProfile": 0,
                    "name": "Dokter"
                },
                {
                    "id": 2,
                    "kdProfile": 0,
                    "name": "Bidan"
                }
            ]
            if ($state.params.noCmIbu !== "" || $state.params.noCmIbu !== undefined) {
                debugger;
                findPasien.getByNoCM($state.params.noCmIbu).then(function(data) {
                    debugger;
                    $scope.item.ibu = ModelItem.beforePost(data.data.data);
                    console.log(JSON.stringify($scope.item.ibu));

                    ModelItem.getDataDummyGeneric("Ruangan", true, true, undefined, {
                        filter: {
                            field: "id",
                            operator: "equal",
                            value: $state.params.terdaftar
                        }
                    }, '*').then(function(e) {
                        e.fetch(function() {
                            $scope.isBusy = false;
                            if (this._data.length !== 0)
                                $scope.item.ibu.ruangan = this._data[0];
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        })
                    })

                    // binding data dari findPasienCtrl ke input field di halaman Informasi Ibu
                    $scope.formMaster.detail.forEach(function(data){
                        debugger;
                        switch (data.id) {
                            case 373:
                                data.value = $scope.item.ibu.namaPasien;
                                console.log(data.nama + ' : ' + data.value)
                                break;
                            case 377:
                                data.value = $scope.item.ibu.noCm;
                                console.log(data.nama + ' : ' + data.value)
                                break;
                            case 378:
                                data.value = {
                                    "id": $scope.item.ibu.pasienDaftar.ruangan === undefined ? null : $scope.item.ibu.pasienDaftar.ruangan.id
                                };
                                console.log(data.nama + ' : ' + data.value)
                                break;
                            case 379:
                                data.value = dateHelper.getPeriodeFormatted($scope.item.ibu.tglLahir);
                                console.log(data.nama + ' : ' + data.value)
                                break;
                            case 380:
                                if ($scope.item.ibu.kebangsaan !== null)
                                    data.value = {
                                        "id": $scope.item.ibu.kebangsaan.id
                                    };
                                console.log(data.nama + ' : ' + data.value)
                                break;
                            case 381:
                                data.value = {
                                    "id": $scope.item.ibu.agama.id
                                };
                                console.log(data.nama + ' : ' + data.value)
                                break;
                            case 382:
                                if ($scope.item.ibu.statusPerkawinan.id === 1) {
                                    data.value = 383
                                } else if ($scope.item.ibu.statusPerkawinan.id === 2){
                                    data.value = 384
                                } else {
                                    data.value = data.value
                                };
                                console.log(data.nama + ' : ' + data.value);
                                $scope.arrParameterInformasiIbu.push({
                                    "id": data.id,
                                    "idParent": data.id,
                                    "descNilai": data.descNilai,
                                    "nama": data.nama,
                                    "value": data.value
                                })
                                break;
                            case 374:
                                data.value = 376;
                                console.log(data.nama + ' : ' + data.value)
                                $scope.arrParameterInformasiIbu.push({
                                    "id": data.id,
                                    "idParent": data.id,
                                    "descNilai": data.descNilai,
                                    "nama": data.nama,
                                    "value": data.value
                                })
                                break;
                            case 385:
                                data.value = 386;
                                console.log(data.nama + ' : ' + data.value)
                                $scope.arrParameterInformasiIbu.push({
                                    "id": data.id,
                                    "idParent": data.id,
                                    "descNilai": data.descNilai,
                                    "nama": data.nama,
                                    "value": data.value
                                })
                                break;
                        }
                    })

                });
            }

            findPasien.getInformasiIbu($state.params.noRec).then(function(e) {
                if (e.data.data.PapInformasiIbu.length !== 0) {
                    var data = ModelItem.beforePost(e.data.data.PapInformasiIbu[0], true);
                    $scope.item = data;
                    $scope.item.ibu.kebangsaan = data.kebangsaan;
                    $scope.item.ibu.tglLahir = data.tanggallahir;
                    $scope.item.diTolongOleh = data.ditolongOleh;
                }

            })
            $scope.listRuangan = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan');
            var arrFieldSelectVoAgama = ['id', 'agama'];
            ModelItem.getKendoSource("Agama", arrFieldSelectVoAgama, true).then(function(data) {
                $scope.listDataAgama = data;
            })
            arrFieldSelectVoAgama = ['id', 'name'];
            ModelItem.getKendoSource("Kebangsaan", arrFieldSelectVoAgama, true).then(function(data) {
                $scope.listKebangsaan = data;
            });
            arrFieldSelectVoAgama = ['id', 'statusPerkawinan'];
            ModelItem.getKendoSource("StatusPerkawinan", arrFieldSelectVoAgama, true).then(function(data) {
                $scope.listStatusPerkawinan = data;
            });

            $scope.item = {};
            $scope.item.ibuDirawat = $state.params.terdaftar ? true : false;

            $scope.item.tanggallahir = {};
            $scope.dataRiwayatKelahiran = new kendo.data.DataSource({
                data: []
            });
            $scope.columnRiwayatKelahiran = [{
                "field": "id",
                "title": "no"
            }, {
                "field": "tanggal",
                "title": "Tanggal Tahun Kelahiran"
            }, {
                "field": "jk",
                "title": "jenis kelamin"
            }];

            $scope.now = new Date();
            $scope.Save = function() {
                var dataForm = [];
                $scope.arrParameterInformasiIbu.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData);
				});
               $scope.formMaster.detail.forEach(function(data){
                   debugger;
                    if (!data.detail) {
                        switch (data.id) {
                            case 373:
                                var tmpData = {
                                    "pengkajianAwal": {
                                        "id": data.id
                                    },
                                    "nilai": data.value
                                }
                                dataForm.push(tmpData);
                                break;
                            case 377:
                                var tmpData = {
                                    "pengkajianAwal": {
                                        "id": data.id
                                    },
                                    "nilai": data.value
                                }
                                dataForm.push(tmpData);
                                break;
                            case 378:
                                var tmpData = {
                                    "pengkajianAwal": {
                                        "id": data.id
                                    },
                                    "nilai": data.value.id.toString()
                                }
                                dataForm.push(tmpData);
                                break;
                            case 379:
                                var tmpData = {
                                    "pengkajianAwal": {
                                        "id": data.id
                                    },
                                    "nilai": data.value
                                }
                                dataForm.push(tmpData);
                                break;
                            case 380:
                                var tmpData = {
                                    "pengkajianAwal": {
                                        "id": data.id
                                    },
                                    "nilai": data.value.id.toString()
                                }
                                dataForm.push(tmpData);
                                break;
                            case 381:
                                var tmpData = {
                                    "pengkajianAwal": {
                                        "id": data.id
                                    },
                                    "nilai": data.value.id.toString()
                                }
                                dataForm.push(tmpData);
                                break;
                        }
                    }
                })
                // console.log(JSON.stringify(dataForm));

                if ($scope.noRecTransaksi) {
					$scope.tempData = {   
						"noRec": $scope.noRecTransaksi,
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					managePasien.updatePengkajianAwalPasien($scope.tempData).then(function(e) {
						// $scope.Next();
					})
				} else {
					$scope.tempData = {  
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					managePasien.simpanPengkajianAwalPasien($scope.tempData).then(function(e) {
						// $scope.Next();
					})
				}

                // save yang lama
                // var listRawRequired = [
                //     "item.diTolongOleh|ng-model|Di tolong oleh"
                // ];

                // var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                // if(isValid.status){
                //     $scope.item.noRecAntrian = $state.params.noRec;
                //     var data = {
                //         ibuDirawat: $scope.item.ibuDirawat,
                //         ibu: { id: $scope.item.ibu.id },
                //         pasienDaftar: { noRec: $state.params.noRec },
                //         ruangan: $scope.item.ruangan,
                //         tanggallahir: $scope.item.ibu.tglLahir,
                //         ditolongOleh: $scope.item.diTolongOleh,
                //         noRec: $scope.item.noRec,
                //         kebangsaan: { 
                //             id: $scope.item.ibu.kebangsaan.id 
                //         }
                //     }
                //     // console.log(JSON.stringify(data));
                //     managePasien.saveInformsiIbu(ModelItem.beforePost(data)).then(function() {
                //         $scope.isNext = true;
                //     });
                // } else {
                //     ModelItem.showMessages(isValid.messages);
                // }
                
            }
            $scope.Next = function() {
                $rootScope.next();
            }
            $scope.findData = function() {
                var isRawat = ""
                $scope.arrParameterInformasiIbu.forEach(function(data){
                    debugger;
                })
                if ($scope.item.ibuDirawat === "true") {
                    debugger;
                    console.log(JSON.stringify($state.params))
                    $state.go('dashboardpasien.InformasiIbu.findPasienTerdaftar', {
                        noCM: $scope.noCM,
                        tanggal: $scope.tanggal,
                        noRec: $state.params.noRec,
                        noCmIbu: $state.params.noCmIbu
                    })
                } else {
                    debugger;
                    console.log(JSON.stringify($state.params))
                    $state.go('dashboardpasien.InformasiIbu.findPasien', {
                        noCM: $scope.noCM,
                        tanggal: $scope.tanggal,
                        noRec: $state.params.noRec,
                        noCmIbu: $state.params.noCmIbu
                    })
                }
            }


        }
    ]);
});