define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningNyeriCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
        debugger;
            // $rootScope.listActive -> data listMenu
            // ModelItem.setActiveMenu($rootScope.listActive, "SkriningNyeri");
            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = cacheHelper.get('noRecPap');
            // indikator harap tunggu
            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $rootScope.isNyeri = true; // disable input text box rasa nyeri
            
            $scope.title = {};
            $scope.item = {};

            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};
            
            //get master form skrining nyeri
            $scope.formId = 75;
			$scope.arrSkorNeonatus = [];
			$scope.arrSkorDewasa = [];
			$scope.arrSkorflacc = [];
			$scope.papNyeri = {};
			$scope.opsiYaTidak = [
				// maipulasi data detil skrining obstetri
				{"id": 67,"nama": "Tidak","descNilai": "0","value": null},
				{"id": 66,"nama": "Ya","descNilai": "1","value": null}
			]

            $scope.arrParameterNeonatus = [];
            $scope.arrParameterDewasa = [];
            $scope.arrParameterflacc = [];

            /* get master form skrining nyeri */
			findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
				}
				$scope.formMaster = data.data.pengkajianAwal;
                // console.log(JSON.stringify($scope.formMaster));
				$scope.formMaster.detail.forEach(function(frmMaster){
                    switch (frmMaster.id) {
                        case 77:
                            $scope.title.neonatus = frmMaster.nama;
                            var masterData = frmMaster.detail;
                            masterData.forEach(function(items){
                                if (items.id !== 98) {
                                    if (items.value !== null)
                                        items.value = parseInt(items.value);
                                    $scope.arrParameterNeonatus.push(items);
                                    if (items.detail) {
                                        items.detail.forEach(function(e){
                                            if (items.value === e.id) {
                                                var arrSkor = {
                                                    "id": e.id,
                                                    "idParent": items.id,
                                                    "descNilai": e.descNilai,
                                                    "nama": e.nama,
                                                    "value": "true"
                                                }
                                                $scope.arrSkorNeonatus.push(arrSkor)
                                            } else { 
                                                if (e.detail) {
                                                    e.detail.forEach(function(x){
                                                        if (items.value === x.id) {
                                                            var arrSkor = {
                                                                "id": x.id,
                                                                "idParent": items.id,
                                                                "descNilai": x.descNilai,
                                                                "nama": x.nama,
                                                                "value": "true"
                                                            }
                                                            $scope.arrSkorNeonatus.push(arrSkor)
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                            getTotal();
                            break;
                        case 99:
                            $scope.title.dewasa = frmMaster.nama;
                            var masterData = frmMaster.detail;
                            masterData.forEach(function(items){
                                debugger;
                                if (items.value !== null) {
                                    items.value = parseInt(items.value);
                                    if (items.id === 106) {
                                        // if ($scope.isDewasa) {
                                            $scope.item.skalaNyeri = items.value
                                        // }
                                    }
                                }
                                $scope.arrParameterDewasa.push(items);
                                if (items.detail) {
                                    items.detail.forEach(function(e){
                                        if (e.value === "true") {
                                            $scope.arrNyeriMempengaruhi.push(e);
                                        } else if (items.value === e.id) {
                                            var arrSkor = {
                                                "id": e.id,
                                                "idParent": items.id,
                                                "descNilai": e.descNilai,
                                                "nama": e.nama,
                                                "value": "true"
                                            }
                                            $scope.arrSkorDewasa.push(arrSkor)
                                        } else { 
                                            if (e.detail) {
                                                e.detail.forEach(function(x){
                                                    if (items.value === x.id) {
                                                        var arrSkor = {
                                                            "id": x.id,
                                                            "idParent": items.id,
                                                            "descNilai": x.descNilai,
                                                            "nama": x.nama,
                                                            "value": "true"
                                                        }
                                                        $scope.arrSkorDewasa.push(arrSkor)
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            })
                            break;
                        case 124:
                            $scope.title.flacc = frmMaster.nama;
                            var masterData = frmMaster.detail;
                            masterData.forEach(function(items){
                                debugger;
                                if(items.id === 125){
                                    $scope.formFlacc = items.detail;
                                    items.detail.forEach(function(data){
                                        debugger;
                                        if (data.value) {
                                            data.value = parseInt(data.value);
                                            data.detail.forEach(function(e){
                                                if (e.id === data.value) {
                                                    data.descNilai = e.descNilai;
                                                    var tempData = {
                                                        "id": e.id,
                                                        "idParent": data.id,
                                                        "descNilai": e.descNilai,
                                                        "nama": e.nama,
                                                        "value": "true"
                                                    }
                                                    $scope.arrSkorflacc.push(tempData);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            getTotals();
                            break;
                        case 701:
                            $scope.titleNyeriAnak = frmMaster.nama;
                            $scope.formNyeriAnak = frmMaster.detail;
                            $scope.formNyeriAnak.forEach(function(items){
                                debugger;
                                if (items.value)
                                    items.value = parseInt(items.value);
                                $scope.item.titleNyeriAnak = items.nama;
                                items.detail.forEach(function(data){
                                    if (data.id === items.value) {
                                        debugger;
                                        $scope.item.skalaNyeri = data.descNilai;
                                        // if ($scope.isAnak) {
                                        //     debugger;
                                        //     $scope.item.skalaNyeri = parseInt(data.descNilai);
                                        // }
                                        // data.detail.forEach(function(e){
                                        //     if (e.id === data.value) {
                                        //         data.descNilai = e.descNilai
                                        //     }
                                        // })
                                    }
                                })
                            })

                        default:
                    }
                    $rootScope.doneLoad = true;
				})
			});
            $scope.arrSkorSkalaNyeri = [];
            $scope.cekSkalaNyeri = function(data, stat) {
                debugger;
                $scope.item.skalaNyeri = stat.descNilai;
				var result = $.grep($scope.arrSkorSkalaNyeri, function(e) { 
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
					$scope.arrSkorSkalaNyeri.push(tempData);
				} else {
					for (var i = 0; i < $scope.arrSkorSkalaNyeri.length; i++)
						if ($scope.arrSkorSkalaNyeri[i].idParent && $scope.arrSkorSkalaNyeri[i].idParent === data.id) { 
							$scope.arrSkorSkalaNyeri.splice(i, 1);
							break;
						}
					$scope.arrSkorSkalaNyeri.push(tempData);
				}
			}
            $scope.cekSkor = function(data, stat) {
				var result = $.grep($scope.arrSkorNeonatus, function(e) { 
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
					$scope.arrSkorNeonatus.push(tempData);
				} else {
					for (var i = 0; i < $scope.arrSkorNeonatus.length; i++)
						if ($scope.arrSkorNeonatus[i].idParent && $scope.arrSkorNeonatus[i].idParent === data.id) { 
							$scope.arrSkorNeonatus.splice(i, 1);
							break;
						}
					$scope.arrSkorNeonatus.push(tempData);
				}
				getTotal();
			}

            $scope.cekSkors = function(data, stat) {
                data.value = stat.id;
                data.descNilai = stat.descNilai;
				var result = $.grep($scope.arrSkorflacc, function(e) { 
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
					$scope.arrSkorflacc.push(tempData);
				} else {
					for (var i = 0; i < $scope.arrSkorflacc.length; i++)
						if ($scope.arrSkorflacc[i].idParent && $scope.arrSkorflacc[i].idParent === data.id) { 
							$scope.arrSkorflacc.splice(i, 1);
							break;
						}
					$scope.arrSkorflacc.push(tempData);
				}
				getTotals();
            }
            $scope.arrTextBoxNyeri = [];
            $scope.cekArrTextBox = function(data) {
                // debugger;
                var result = $.grep($scope.arrTextBoxNyeri, function(e) { 
					return e.id == data.id;
				});
				if (result.length == 0) {
					$scope.arrTextBoxNyeri.push(data);
				} else {
					for (var i = 0; i < $scope.arrTextBoxNyeri.length; i++)
						if ($scope.arrTextBoxNyeri[i].id && $scope.arrTextBoxNyeri[i].id === data.id) { 
							$scope.arrTextBoxNyeri.splice(i, 1);
							break;
						}
					$scope.arrTextBoxNyeri.push(data);
				}
                // console.log(JSON.stringify($scope.arrTextBoxNyeri));
            }
            $scope.cekSkorss = function(data, stat) {
                debugger;
                switch (stat.id) {
                    case 101:
                        $scope.isNyeri = false;
                        break;
                    case 102:
                        $scope.isNyeri = true;
                        break;
                }
                data.value = stat.id;
                data.descNilai = stat.descNilai;
				var result = $.grep($scope.arrSkorDewasa, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					// "descNilai": stat.descNilai,
					"nama": stat.nama,
					"value": "true"
				}
				if (result.length == 0) {
					$scope.arrSkorDewasa.push(tempData);
				} else {
					for (var i = 0; i < $scope.arrSkorDewasa.length; i++)
						if ($scope.arrSkorDewasa[i].idParent && $scope.arrSkorDewasa[i].idParent === data.id) { 
							$scope.arrSkorDewasa.splice(i, 1);
							break;
						}
					$scope.arrSkorDewasa.push(tempData);
				}
                // console.log(JSON.stringify($scope.arrSkorDewasa));
            }
            
			var getTotal = function() {
				var skorAwal = 0;
				$scope.arrSkorNeonatus.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
				})
				$scope.totalSkorNeonatus = skorAwal
			}
			var getTotals = function() {
				var skorAwal = 0;
				$scope.arrSkorflacc.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
				})
				$scope.totalSkorFlacc = skorAwal
			}
            
            // $scope.sourceDataNeonatus = new kendo.data.DataSource({
            //     pageSize: 10,
            //     data:$scope.ListDataNeonatus
            // });

            // $scope.mainGridOptions1 = {
            //     pageable: true,
            //     scrollable:false,
            //     columns: [{
            //         "field": "name",
            //         "title": "<h3 align=center>Kategori<h3>",
            //         "width": "300px"
            //     }]
            // }

            // $scope.mainGridOptions = {
            //     pageable: true,
            //     scrollable:false,
            //     columns: [{
            //         "field": "kategrori",
            //         "title": "<h3 align=center>Kategori<h3>",
            //         "width": "300px"
            //     }, {
            //         "field": "skor",
            //         "title": "<h3 align=center>Skor<h3>",
            //         "template": "<input c-text-box type='number' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].jumlah' ng-keypress='($event.which == 13)? total():dataModelGrid[#: id #].jumlah'/>",
            //         "width": "100px"
            //     }]
            // };

            $scope.arrKarateristikNyeri = [];
            $scope.cekArrKarateristikNyeri = function(data) {

                var isExist = _.find($scope.arrKarateristikNyeri, function(dataExist) {
                    return dataExist == data;
                });

                if (isExist == undefined) {
                    $scope.arrKarateristikNyeri.push(data);
                } else {
                    $scope.arrKarateristikNyeri = _.without($scope.arrKarateristikNyeri, data);
                }

                // console.log('list statKaratersitikNyeri : ' + JSON.stringify($scope.arrKarateristikNyeri));
            };

            $scope.arrNyeriMempengaruhi = [];
            $scope.isAdaTidak = false;
            $scope.$watch('item.rasaNyeri', function(newValue) {
                if (newValue != undefined) {
                    if (newValue.name == "Ada") {
                        $scope.isAdaTidak = true
                    } else {
                        $scope.isAdaTidak = false
                    }
                }
            });
            $scope.sourceGmbrNyeri = [
                {"id":1,"nilai":0,"name":"no hurt"},
                {"id":2,"nilai":2,"name":"hurt little bit"},
                {"id":3,"nilai":4,"name":"hurt little more"},
                {"id":4,"nilai":6,"name":"hurt even bit"},
                {"id":5,"nilai":8,"name":"hurt whole bit"},
                {"id":6,"nilai":10,"name":"hurt worst"}                                   
            ]
			$scope.isChecked = function(id){
                // debugger;
				var match = false;
				for(var i=0 ; i < $scope.arrNyeriMempengaruhi.length; i++) {
					if($scope.arrNyeriMempengaruhi[i].id == id){
					match = true;
					}
				}
				return match;
			};
            $scope.cekArrNyeriMempengaruhi = function(data, item) {
				// debugger;
				if(data){
					$scope.arrNyeriMempengaruhi.push(item);
				} else {
					for(var i=0 ; i < $scope.arrNyeriMempengaruhi.length; i++) {
						if($scope.arrNyeriMempengaruhi[i].id == item.id){
						$scope.arrNyeriMempengaruhi.splice(i,1);
						}
					}      
				}
                
                // var isExist = _.find($scope.arrNyeriMempengaruhi, function(dataExist) {
                //     return dataExist == data;
                // });

                // if (isExist == undefined) {
                //     $scope.arrNyeriMempengaruhi.push(data);
                // } else {
                //     $scope.arrNyeriMempengaruhi = _.without($scope.arrNyeriMempengaruhi, data);
                // }

                // console.log('list statNyerMempengaruhi : ' + JSON.stringify($scope.arrNyeriMempengaruhi));
            };

            // $q.all([ModelItem.getDataDummyGeneric("StatusAdaTidakAda", false),
            //     ModelItem.getDataDummyGeneric("DataTipeNyeri", false),
            //     ModelItem.getDataDummyGeneric("DataKarateristikNyeri", false),
            //     ModelItem.getDataDummyGeneric("DataNyeriMempengaruhi", false),
            //     ModelItem.getDataDummyGeneric("DataLokasiNyeri", false),
            //     ModelItem.get("SkriningNyeri"),
            //     findPasien.getByNoCM($scope.noCM)
            // ]).then(function(data) {

            //     if (data[0].statResponse)
            //         $scope.listAdaTidakAda = data[0];

            //     if (data[1].statResponse)
            //         $scope.listTipeNyeri = data[1];

            //     if (data[2].statResponse) {
            //         for (var i = 0; i < data[2].length; i++) {
            //             data[2][i].isChecked = false;
            //         }
            //         $scope.listKarateristikNyeri = data[2];
            //     }

            //     if (data[3].statResponse) {
            //         for (var i = 0; i < data[3].length; i++) {
            //             data[3][i].isChecked = false;
            //         }
            //         $scope.listNyeriMempengaruhi = data[3];
            //     }


            //     if (data[4].statResponse)
            //         $scope.listLokasiNyeri = data[4];

            //     if (data[5].statResponse) {
            //         $scope.item = {};
            //         $scope.item = data[5];
            //         $scope.item.noRec = "";
            //     }


            //     if (data[6].statResponse) {
            //         $rootScope.currentPasien = data[6].data.data;
            //         $scope.pasien = data[6].data.data;
            //     }

            //     //ambil data current pasien seusia no cm dan tanggal     
            //     getDataCurentPasien();
            // });

            // function getDataCurentPasien() {
            //     debugger;
            //     findPasien.getSkriningNyeri($state.params.noRec,$state.params.tanggal).then(function(e) {
            //         if (e.data.data.PapSkriningNyeri[0] != undefined) {
            //             $scope.item.PapSkriningNyeri = e.data.data.PapSkriningNyeri[0];
            //             /*if ($scope.item.keluhanUtama !== undefined)
            //                 $scope.editMode = true;*/
            //             $scope.item.noRec = $scope.item.PapSkriningNyeri.noRec;

            //             $scope.item.rasaNyeri = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapSkriningNyeri.rasaNyeri.id);
            //             $scope.item.frekuensi = $scope.item.PapSkriningNyeri.frekuensi;
            //             $scope.item.durasi = $scope.item.PapSkriningNyeri.durasi;
            //             $scope.item.rasaNyeri = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapSkriningNyeri.rasaNyeri.id);
            //             $scope.item.typeNyeri = ModelItem.convertObjectLoadData($scope.listTipeNyeri, $scope.item.PapSkriningNyeri.typeNyeri.id);
            //             $scope.item.lokasiNyeri = ModelItem.convertObjectLoadData($scope.listLokasiNyeri, $scope.item.PapSkriningNyeri.lokasiNyeri.id);
            //             debugger;
            //             //function(listCurrentData, listMaster, arrTick, nameObjCollection)
            //             //set value checkbox
            //             ModelItem.setCheckedForListCheckbox($scope.item.PapSkriningNyeri.karakteristikNyeriSet, $scope.listKarateristikNyeri, $scope.arrKarateristikNyeri, "dataKarakteristikNyeri");
            //             ModelItem.setCheckedForListCheckbox($scope.item.PapSkriningNyeri.pengaruhNyeriSet, $scope.listNyeriMempengaruhi, $scope.arrNyeriMempengaruhi, "dataNyeriPempengaruhi");
            //             if (!$scope.$$phase)
            //                 $scope.$apply();

            //             console.log(JSON.stringify($scope.item.PapSkriningNyeri));
            //         }
            //     });
            // };

            $scope.Save = function() {
                var dataForm = [];
                if ($scope.item.skalaNyeri !== undefined) {
                     if ($scope.isDewasa) {
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": 106
                            },
                            "nilai": $scope.item.skalaNyeri.toString()
                        }
                        dataForm.push(tmpData);
                    }
                } 
                // else {
                //     throw new Error('This is not an error. This is just to abort javascript');
                //     // window.messageContainer.error('Skor nyeri belum terisis');
                // }
                $scope.arrSkorSkalaNyeri.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData);
					debugger;
				});
				$scope.arrSkorNeonatus.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData);
					debugger;
				});
				$scope.arrSkorflacc.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData);
					debugger;
				});
                $scope.arrNyeriMempengaruhi.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.id
						},
						"nilai": "true"
					}
					dataForm.push(tmpData)
					debugger;
				});
				$scope.arrSkorDewasa.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData);

                    if (data.id  === 101) {
                        $scope.arrTextBoxNyeri.forEach(function(items){
                            var tmpDataText = {
                                "pengkajianAwal": {
                                    "id": items.id
                                },
                                "nilai": items.value === null ? "-" : items.value 
                            }
                            dataForm.push(tmpDataText);
                            // console.log(JSON.stringify(tmpDataText))
                        })
                    }
					debugger;
				});
                // $scope.tempData = {  
                //     "pengkajianAwalBaru":{  
                //         "noRec": $scope.noRecPap
                //     },
                //     "detailPengkajianAwal": dataForm
                // }
                // console.log(JSON.stringify($scope.tempData));
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
                        // console.log(JSON.stringify(e.data));
						// $scope.Next();
					})
				}
                // for (var i = 0; i < $scope.listKarateristikNyeri.length; i++) {
                //     delete $scope.listKarateristikNyeri[i].isChecked;
                // }

                // for (var i = 0; i < $scope.listNyeriMempengaruhi.length; i++) {
                //     delete $scope.listNyeriMempengaruhi[i].isChecked;
                // }

                // 
                // $scope.item.karakteristikNyeriSet = ModelItem.setObjCollectionForCheckbox($scope.listKarateristikNyeri, $scope.arrKarateristikNyeri, "dataKarakteristikNyeri");
                // $scope.item.pengaruhNyeriSet = ModelItem.setObjCollectionForCheckbox($scope.listNyeriMempengaruhi, $scope.arrNyeriMempengaruhi, "dataNyeriPempengaruhi");

                // cacheHelper.set("kajianAwal", $scope.kajianAwal);
                // var pasien = { noRec: $state.params.noRec };
                // $scope.item.pengkajianAwalBaru = {
                //     "noRec": $scope.noRecPap
                // };
                // ManagePasien.saveSkriningNyeri(ModelItem.beforePost(pasien), dateHelper.toTimeStamp(new Date()), ModelItem.beforePost($scope.item)).then(function(e) {
                //     $scope.kajianAwal.SkriningNyeri = $scope.item;
                //     cacheHelper.set("kajianAwal", $scope.kajianAwal);
                //     $scope.isNext = true;
                // });
            };

            $scope.Next = function() {
                $rootScope.next();
            }

        //Skrining Nyeri Neonatal
            $scope.loadData=function(){
                $scope.skorWajah1=0;
                $scope.skorWajah2=0;
                $scope.skorTangisan1=0;
                $scope.skorTangisan2=0;
                $scope.skorTangisan3=0;
                $scope.skorNapas1=0;
                $scope.skorNapas2=0;
                $scope.skorTangan1=0;
                $scope.skorTangan2=0;
                $scope.skorKaki1=0;
                $scope.skorKaki2=0;
                $scope.skorKesadaran1=0;
                $scope.skorKesadaran2=0;
                $scope.skorKesadaran3=0;
                $scope.totalSkor=0;
            }

            $scope.loadData();
            $scope.checkSkor=function(){
                debugger;
                if($scope.item.checkWajah1!=undefined){
                    if($scope.item.checkWajah1===true){
                        $scope.skorWajah1 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorWajah1 = 0;
                        $scope.hitungSkor();
                    }
                    
                }
                if($scope.item.checkWajah2!=undefined){
                    if($scope.item.checkWajah2===true){
                        $scope.skorWajah2 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorWajah2 = 0;
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkTangisan1!=undefined){
                    if($scope.item.checkTangisan1===true){
                        $scope.skorTangisan1 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorTangisan1 = 0;
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkTangisan2!=undefined){
                    if($scope.item.checkTangisan2===true){
                        $scope.skorTangisan2 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorTangisan2 = 0;
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkTangisan3!=undefined){
                    if($scope.item.checkTangisan3===true){
                        $scope.skorTangisan3 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorTangisan3 = 0
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkNapas1!=undefined){
                    if($scope.item.checkNapas1===true){
                        $scope.skorNapas1 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorNapas1 = 0;
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkNapas2!=undefined){
                    if($scope.item.checkNapas2===true){
                        $scope.skorNapas2 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorNapas2 = 0;
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkTangan1!=undefined){
                    if($scope.item.checkTangan1===true){
                        $scope.skorTangan1 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorTangan1 = 0;
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkTangan1!=undefined){
                    if($scope.item.checkTangan1===true){
                        $scope.skorTangan1 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorTangan1 = 0;
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkTangan2!=undefined){
                    if($scope.item.checkTangan2===true){
                        $scope.skorTangan2 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorTangan2 = 0;
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkKaki1!=undefined){
                    if($scope.item.checkKaki1===true){
                        $scope.skorKaki1 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorKaki1 = 0;
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkKaki2!=undefined){
                    if($scope.item.checkKaki2===true){
                        $scope.skorKaki2 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorKaki2 = 0;
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkKesadaran1!=undefined){
                    if($scope.item.checkKesadaran1===true){
                        $scope.skorKesadaran1 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorKesadaran1 = 0;
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkKesadaran2!=undefined){
                    if($scope.item.checkKesadaran2===true){
                        $scope.skorKesadaran2 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorKesadaran2 = 0;
                        $scope.hitungSkor();
                    }
                }
                if($scope.item.checkKesadaran3!=undefined){
                    if($scope.item.checkKesadaran3===true){
                        $scope.skorKesadaran3 = 1;
                        $scope.hitungSkor();
                    }
                    else{
                        $scope.skorKesadaran3 = 0;
                        $scope.hitungSkor();
                    }
                }
            }

            $scope.hitungSkor=function(){
                
                $scope.totalSkor = $scope.skorWajah1 + $scope.skorWajah2 + $scope.skorTangisan1 + $scope.skorTangisan2 + $scope.skorTangisan3 + $scope.skorNapas1 + $scope.skorNapas2 + $scope.skorTangan1 + $scope.skorTangan2 + $scope.skorKaki1 + $scope.skorKaki2 + $scope.skorKesadaran1 + $scope.skorKesadaran2 + $scope.skorKesadaran3;
                debugger;
            }
        //End Skrining Nyeri Neonatal

        //Skrining Nyeri Anak
            $scope.BatalAnak=function(){
                debugger;
            }
            $scope.loadDataAnak=function(){
                $scope.skorWajah=0;
                $scope.skorLegs=0;
                $scope.skorActivity=0;
                $scope.skorCry=0;
                $scope.skorConsolability=0;
                $scope.totalSkorAnak=0;
            }

            $scope.loadDataAnak();

            $scope.checkSkorFace=function(){
                debugger;
                // var nilai = document.activeElement("face1").value;
                if($scope.item.face1 === "skor0"){
                    $scope.skorWajah = 0;
                    $scope.hitungSkorAnak();

                }
                if($scope.item.face2 === "skor1"){
                    $scope.skorWajah = 1;
                    $scope.hitungSkorAnak();
                }
                if($scope.item.face3 === "skor2"){
                    $scope.skorWajah = 2;
                    $scope.hitungSkorAnak();
                }
            }

             $scope.checkSkorActivity=function(){
                debugger;
                // var nilai = document.activeElement("face1").value;
                if($scope.item.activity1 === "skor0"){
                    $scope.skorActivity = 0;
                    $scope.hitungSkorAnak();

                }
                if($scope.item.activity2 === "skor1"){
                    $scope.skorActivity = 1;
                    $scope.hitungSkorAnak();
                }
                if($scope.item.activity3 === "skor2"){
                    $scope.skorActivity = 2;
                    $scope.hitungSkorAnak();
                }
            }

            $scope.checkSkorLegs=function(){
                debugger;
                // var nilai = document.activeElement("face1").value;
                if($scope.item.legs1 === "skor0"){
                    $scope.skorLegs = 0;
                    $scope.hitungSkorAnak();

                }
                if($scope.item.legs2 === "skor1"){
                    $scope.skorLegs = 1;
                    $scope.hitungSkorAnak();
                }
                if($scope.item.legs3 === "skor2"){
                    $scope.skorLegs = 2;
                    $scope.hitungSkorAnak();
                }
            }

            $scope.checkSkorCry=function(){
                debugger;
                // var nilai = document.activeElement("face1").value;
                if($scope.item.cry1 === "skor0"){
                    $scope.skorCry = 0;
                    $scope.hitungSkorAnak();

                }
                if($scope.item.cry2 === "skor1"){
                    $scope.skorCry = 1;
                    $scope.hitungSkorAnak();
                }
                if($scope.item.cry3 === "skor2"){
                    $scope.skorCry = 2;
                    $scope.hitungSkorAnak();
                }
            }

            $scope.checkSkorConsolability=function(){
                debugger;
                // var nilai = document.activeElement("face1").value;
                if($scope.item.consolability1 === "skor0"){
                    $scope.skorConsolability = 0;
                    $scope.hitungSkorAnak();

                }
                if($scope.item.consolability2 === "skor1"){
                    $scope.skorConsolability = 1;
                    $scope.hitungSkorAnak();
                }
                if($scope.item.consolability3 === "skor2"){
                    $scope.skorConsolability = 2;
                    $scope.hitungSkorAnak();
                }
            }


            $scope.hitungSkorAnak=function(){
                $scope.totalSkorAnak = $scope.skorWajah + $scope.skorLegs + $scope.skorActivity + $scope.skorCry + $scope.skorConsolability;
                debugger;
            }
        //End Skrining Nyeri Anak        
        }
    ]);
});