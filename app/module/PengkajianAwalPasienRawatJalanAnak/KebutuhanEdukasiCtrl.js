/**
 * Created by jasamedika on 6/13/2016.
 */
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KebutuhanEdukasiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'GetPostOnPengkajianAwal', 'ManagePasien', 'FindPasien', 'DateHelper', 'CacheHelper',
        function($rootScope, $scope, ModelItem, $state, GetPostOnPengkajianAwal, managePasien, findPasien, dateHelper, cacheHelper) {
        //$rootScope.listActive -> data listMenu

            $scope.title = "Kebutuhan Edukasi";
            $rootScope.showMenu = true;
            $scope.noCM = $state.params.noCM;
            $scope.formId = 675;
            $scope.noRecPap = cacheHelper.get('noRecPap'); // noRecPap
            $scope.item = {};
            $scope.arrKebutuhanEdukasi = [];
            // controller master data PAP
            findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				$scope.formMaster.detail.forEach(function(frmMaster){
                    frmMaster.detail.forEach(function(data){
                        debugger;
                        if (data.value === "true") {
                            data.value = true;
                            debugger;
                            // $scope.arrKebutuhanEdukasi.push(data);
                        }
                    })
                })
            })
            $scope.parentChange = function(index) {
                angular.forEach($scope.formMaster.detail[index].detail, function(list) {
                    list.value = $scope.formMaster.detail[index].value;
                });
            };
            $scope.numberPicker = {
                format: "{0:n0}"
            }
            $scope.Save = function(){
                var dataForm = [];
                $scope.formMaster.detail.forEach(function(data){
                    data.detail.forEach(function(child){
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": child.id,
                                "name": child.nama
                            },
                            "nilai": child.value === null || child.value === false ? false : child.value.toString()
                        }
                        dataForm.push(tmpData);
                    })
                })

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