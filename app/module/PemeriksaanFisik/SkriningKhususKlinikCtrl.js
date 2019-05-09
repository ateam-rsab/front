define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SkriningKhususKlinikCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'FindPasien', 'CacheHelper',
        function($rootScope, $scope, ModelItem, $state, managePasien, findPasien, cacheHelper) {

            //$rootScope.listActive -> data listMenu

            $scope.title = "Tanda Vital";
            $rootScope.showMenu = true;
            $scope.noCM = $state.params.noCM;
            $scope.formId = 320;
            $scope.noRecPap = cacheHelper.get('noRecPap'); // noRecPap
            $scope.item = {};
            $scope.klinik = [];

            // controller master data PAP
            findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				$scope.formMaster.detail.forEach(function(frmMaster){
                    switch (frmMaster.id) {
                        case 516:
                            $scope.klinik.push(frmMaster);
                            break;
                        case 565:
                            $scope.klinik.push(frmMaster);
                            break;
                        case 514:
                            $scope.klinik.push(frmMaster);
                            break;529
                        case 584:
                            $scope.klinik.push(frmMaster);
                            break;
                        case 529:
                            $scope.klinik.push(frmMaster);
                            break;
                        case 539:
                            $scope.klinik.push(frmMaster);
                            break;
                        case 504:
                            $scope.klinik.push(frmMaster);
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
            
            $scope.Save = function(){
                var dataForm = [];
                $scope.klinik.forEach(function(data){
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
                    } else {
                        debugger;
                        if (data.detail) {
                            debugger;
                            data.detail.forEach(function(subItems){
                                debugger;
                                if (subItems.value !== null) {
                                    var tmpData = {
                                        "pengkajianAwal": {
                                            "id": subItems.id
                                        },
                                        "nilai": subItems.value
                                    }
                                    dataForm.push(tmpData);
                                }
                            })
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
            }
        }

    ]);
});