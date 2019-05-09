define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SkriningKhususObstetrikGinekologiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'FindPasien', 'CacheHelper',
        function($rootScope, $scope, ModelItem, $state, managePasien, findPasien, cacheHelper) {

            //$rootScope.listActive -> data listMenu

            $scope.title = "Tanda Vital";
            $rootScope.showMenu = true;
            $scope.noCM = $state.params.noCM;
            $scope.formId = 586;
            $scope.noRecPap = cacheHelper.get('noRecPap'); // noRecPap
            $scope.item = {};
            $scope.klinik = [];
            $scope.arrPenyakitLain = [];
            // controller master data PAP
            findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				$scope.formMaster.detail.forEach(function(frmMaster){
                    switch (frmMaster.id){
                        case 587:
                            frmMaster.detail.forEach(function(data){
                                switch (data.id) {
                                    case 588:
                                        $scope.kawin = data;
                                        break;
                                    case 604:
                                        $scope.kehamilanSkrng = data;
                                        break;
                                    case 629:
                                        $scope.ginekologi = data;
                                        break;
                                    case 642:
                                        $scope.golDarah = data;
                                        break;
                                    case 647:
                                        $scope.pLain = data;
                                        $scope.pLain.detail.forEach(function(items){
                                            debugger;
                                            if (items.value === "true") {
                                                $scope.arrPenyakitLain.push(items)
                                            }
                                        })
                                        break;
                                }
                            })
                            break;
                        case 651:
                            $scope.rawatInapCoy = frmMaster;
                            break;
                    }
                })
            })
            $scope.numberPicker = {
                format: "{0:n0}"
            }
            $scope.radioKlik=function(data, stat){
                data.value = stat.id;
                debugger;
            }
            $scope.isChecked = function(id){
				var match = false;
				for(var i=0 ; i < $scope.arrPenyakitLain.length; i++) {
					if($scope.arrPenyakitLain[i].id == id){
					match = true;
					}
				}
				return match;
			};
            $scope.checkboxCLick = function(bool, item) {
				debugger;
				if(bool){
					// add item
                    item.value = "true";
					$scope.arrPenyakitLain.push(item);
				} else {
					// remove item
					for(var i=0 ; i < $scope.arrPenyakitLain.length; i++) {
						if($scope.arrPenyakitLain[i].id == item.id){
						$scope.arrPenyakitLain.splice(i,1);
						}
					}      
				}
            };
            $scope.Save = function(){
                var dataForm = [];
                $scope.kawin.detail.forEach(function(data){
                    if (data.value !== null) {
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": data.id
                            },
                            "nilai": data.value.toString()
                        }
                        dataForm.push(tmpData);
                    }
                })
                $scope.kehamilanSkrng.detail.forEach(function(data){
                    debugger;
                    if (data.value !== null) {
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": data.id
                            },
                            "nilai": data.value.toString()
                        }
                        dataForm.push(tmpData);
                    }
                })
                $scope.ginekologi.detail.forEach(function(data){
                    if (data.value !== null) {
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": data.id
                            },
                            "nilai": data.value.toString()
                        }
                        dataForm.push(tmpData);
                    }

                    if (data.detail !== undefined) {
                        data.detail.forEach(function(items){
                            if (items.value !== null) {
                                var tmpData = {
                                    "pengkajianAwal": {
                                        "id": items.id
                                    },
                                    "nilai": items.value.toString()
                                }
                                dataForm.push(tmpData);
                            }
                        })
                    }
                })
                $scope.golDarah.detail.forEach(function(data){
                    if (data.value !== null) {
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": data.id
                            },
                            "nilai": data.value.toString()
                        }
                        dataForm.push(tmpData);
                    }

                    if (data.detail !== undefined) {
                        data.detail.forEach(function(items){
                            if (items.value !== null) {
                                var tmpData = {
                                    "pengkajianAwal": {
                                        "id": items.id
                                    },
                                    "nilai": items.value.toString()
                                }
                                dataForm.push(tmpData);
                            }
                        })
                    }
                })
                $scope.arrPenyakitLain.forEach(function(data){
                    debugger;
                    if (data.value === "true")
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": data.id
                            },
                            "nilai": data.value.toString()
                        }
                        dataForm.push(tmpData);
                })
                $scope.rawatInapCoy.detail.forEach(function(data){
                    debugger;
                    if (data.value !== null) {
                        debugger;
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": data.id
                            },
                            "nilai": data.value.toString()
                        }
                        dataForm.push(tmpData);
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
            }
        }

    ]);
});