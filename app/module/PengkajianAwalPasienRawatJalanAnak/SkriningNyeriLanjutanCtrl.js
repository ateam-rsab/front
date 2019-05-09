define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningNyeriLanjutanCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
            // duplicate from skriningNyeriCtrl
            // $rootScope.listActive -> data listMenu
            // ModelItem.setActiveMenu($rootScope.listActive, "SkriningNyeri");
            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = cacheHelper.get('idPengkajianLanjut');
            // indikator harap tunggu
            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $rootScope.isNyeri = true; // disable input text box rasa nyeri
            
            $scope.title = {};
            $scope.item = {};

            $scope.noCM = $state.params.noCM;
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
				{"id": 67,"nama": "Tidak","descNilai": "0","value": null},
				{"id": 66,"nama": "Ya","descNilai": "1","value": null}
			]

            $scope.arrParameterNeonatus = [];
            $scope.arrParameterDewasa = [];
            $scope.arrParameterflacc = [];

            /* get master form skrining nyeri pengkajian lanjutan*/
			findPasien.getDataKajianLanjutan($scope.formId, $scope.noRecPap).then(function(data) {
				if (data.data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.data.pengkajianAwalTransaksi.noRec;
				}
				$scope.formMaster = data.data.data.pengkajianAwal;
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
                                if (items.value !== null) {
                                    items.value = parseInt(items.value);
                                    if (items.id === 106) {
                                        if ($scope.isDewasa) {
                                            $scope.item.skalaNyeri = items.value
                                        }
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
                                if(items.id === 125){
                                    $scope.formFlacc = items.detail;
                                    items.detail.forEach(function(data){
                                        if (data.value) {
                                            data.value = parseInt(data.value);
                                            data.detail.forEach(function(e){
                                                if (e.id === data.value) {
                                                    data.descNilai = e.descNilai
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
                                if (items.value)
                                    items.value = parseInt(items.value);
                                $scope.item.titleNyeriAnak = items.nama;
                                items.detail.forEach(function(data){
                                    if (data.id === items.value) {
                                        $scope.item.skalaNyeri = data.descNilai;
                                    }
                                })
                            })
                            break;
                        default:
                    }
                    $rootScope.doneLoad = true;
				})
			});
            $scope.arrSkorSkalaNyeri = [];
            $scope.cekSkalaNyeri = function(data, stat) {
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
				var match = false;
				for(var i=0 ; i < $scope.arrNyeriMempengaruhi.length; i++) {
					if($scope.arrNyeriMempengaruhi[i].id == id){
					match = true;
					}
				}
				return match;
			};
            $scope.cekArrNyeriMempengaruhi = function(data, item) {
				if(data){
					$scope.arrNyeriMempengaruhi.push(item);
				} else {
					for(var i=0 ; i < $scope.arrNyeriMempengaruhi.length; i++) {
						if($scope.arrNyeriMempengaruhi[i].id == item.id){
						$scope.arrNyeriMempengaruhi.splice(i,1);
						}
					}      
				}
            };

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
                $scope.arrSkorSkalaNyeri.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData);
				});
				$scope.arrSkorNeonatus.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData);
				});
				$scope.arrSkorflacc.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData);
				});
                $scope.arrNyeriMempengaruhi.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.id
						},
						"nilai": "true"
					}
					dataForm.push(tmpData)
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
                        })
                    }
				});
                if ($scope.noRecTransaksi) {
					$scope.tempData = {   
						"noRec": $scope.noRecTransaksi,
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					ManagePasien.updatePengkajianAwalPasien($scope.tempData, $scope.currentState).then(function(e) {
						// $scope.Next();
					})
				} else {
					$scope.tempData = {  
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					ManagePasien.simpanPengkajianAwalPasien($scope.tempData, $scope.currentState).then(function(e) {
						// $scope.Next();
					})
				}
            };

            $scope.Next = function() {
                $rootScope.next();
            }  
        }
    ]);
});