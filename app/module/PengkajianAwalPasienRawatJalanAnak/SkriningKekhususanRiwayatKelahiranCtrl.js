define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningKekhususanRiwayatKelahiranCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
        debugger;
            //$rootScope.listActive -> data listMenu
            //ModelItem.setActiveMenu($rootScope.listActive, "SkriningNyeri");
            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
            //indikator harap tunggu
            // $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;

            $scope.noCM = $state.params.noCM;
            $scope.noRecPap = window.localStorage.getItem('noRecPap');

            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};

            $scope.formId = 356;
            $scope.arrParameterSkriningTmbhn = [];

            findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
				}
				$scope.formMaster = data.data.pengkajianAwal;
                if ($scope.formMaster.value !== null)
                    $scope.formMaster.value = parseInt($scope.formMaster.value)
                if ($scope.formMaster.value === 358)
                    $scope.adaMasalah = true;
				// $scope.formMaster.detail.forEach(function(frmMaster){
                // })
            })

            $scope.checkRadio=function(data, stat){
                debugger;
                if(stat.id === 358){
                    $scope.adaMasalah = true; 
                    data.value = stat.id
                }else{
                    $scope.adaMasalah = false; 
                    data.value = stat.id
                }
                console.log('Pilihan anda adalah : ' + stat.nama)
            }

            $scope.ListRadio = [
                {"id": 3, "name": "Ada Masalah"},
                {"id": 4, "name": "Tidak Ada Masalah"}
            ]

            $scope.Save = function(){
                var dataForm = [];
                if ($scope.formMaster.value === 358) {
                    debugger;
                    var tmpData = {
						"pengkajianAwal": {
							"id": $scope.formMaster.id
						},
						"nilai": $scope.formMaster.value.toString()
					}
					dataForm.push(tmpData);

                    $scope.formMaster.detail.forEach(function(data){
                        if (data.value !== null) {
                            var tmpData = {
                                "pengkajianAwal": {
                                    "id": data.id
                                },
                                "nilai": data.value
                            }
                            dataForm.push(tmpData);
                        }
                    })                    
                } else {
                    debugger;
                    var tmpData = {
						"pengkajianAwal": {
							"id": $scope.formMaster.id
						},
						"nilai": $scope.formMaster.value.toString()
					}
					dataForm.push(tmpData);
                }
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
            }
           
        }
    ]);
});