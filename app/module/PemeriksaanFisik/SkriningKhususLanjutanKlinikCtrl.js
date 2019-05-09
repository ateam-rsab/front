define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SkriningKhususLanjutanKlinikCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, managePasien, findPasien) {

            //$rootScope.listActive -> data listMenu

            $scope.title = "Tanda Vital";
            $scope.noCM = $state.params.noCM;
            $scope.formId = 320;
            $scope.noRecPap = window.localStorage.getItem('idPengkajianLanjut'); // noRecPap
            $scope.item = {};
            $scope.klinik = [];

            // controller master data PAP
            findPasien.getDataKajianLanjutan($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.data.pengkajianAwalTransaksi.noRec;
				}
				$scope.formMaster = data.data.data.pengkajianAwal;
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
                	managePasien.updatePengkajianAwalPasien($scope.tempData, $scope.currentState).then(function(e) {
                		// $scope.Next();
                	})
                } else {
                	$scope.tempData = {  
                		"pengkajianAwalBaru":{  
                			"noRec": $scope.noRecPap
                		},
                		"detailPengkajianAwal": dataForm
                	}
                	managePasien.simpanPengkajianAwalPasien($scope.tempData, $scope.currentState).then(function(e) {
                		// $scope.Next();
                	})
                }
            }
        }

    ]);
});