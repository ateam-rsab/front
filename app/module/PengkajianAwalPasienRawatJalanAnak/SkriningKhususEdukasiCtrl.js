/**
 * Created by jasamedika on 6/13/2016.
 */
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SkriningKhususEdukasiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, managePasien, findPasien) {

            //$rootScope.listActive -> data listMenu

            $scope.title = "Tanda Vital";
            $rootScope.showMenu = true;
            $scope.noCM = $state.params.noCM;
            $scope.formId = 675;
            $scope.noRecPap = window.localStorage.getItem('noRecPap'); // noRecPap
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
                            $scope.arrKebutuhanEdukasi.push(data)
                        }
                    })
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
				for(var i=0 ; i < $scope.arrKebutuhanEdukasi.length; i++) {
					if($scope.arrKebutuhanEdukasi[i].id == id){
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
					$scope.arrKebutuhanEdukasi.push(item);
				} else {
					// remove item
					for(var i=0 ; i < $scope.arrKebutuhanEdukasi.length; i++) {
						if($scope.arrKebutuhanEdukasi[i].id == item.id){
						$scope.arrKebutuhanEdukasi.splice(i,1);
						}
					}      
				}
            };
            $scope.Save = function(){
                var dataForm = [];
                $scope.arrKebutuhanEdukasi.forEach(function(data){
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
                console.log(JSON.stringify(dataForm));

                // if ($scope.noRecTransaksi) {
                // 	$scope.tempData = {   
                // 		"noRec": $scope.noRecTransaksi,
                // 		"pengkajianAwalBaru":{  
                // 			"noRec": $scope.noRecPap
                // 		},
                // 		"detailPengkajianAwal": dataForm
                // 	}
                // 	managePasien.updatePengkajianAwalPasien($scope.tempData).then(function(e) {
                // 		// $scope.Next();
                // 	})
                // } else {
                // 	$scope.tempData = {  
                // 		"pengkajianAwalBaru":{  
                // 			"noRec": $scope.noRecPap
                // 		},
                // 		"detailPengkajianAwal": dataForm
                // 	}
                // 	managePasien.simpanPengkajianAwalPasien($scope.tempData).then(function(e) {
                // 		// $scope.Next();
                // 	})
                // }
            }
        }

    ]);
});