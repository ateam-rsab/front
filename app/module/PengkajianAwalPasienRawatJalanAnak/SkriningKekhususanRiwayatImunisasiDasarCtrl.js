define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningKekhususanRiwayatImunisasiDasarCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
        debugger;
            //$rootScope.listActive -> data listMenu
            //ModelItem.setActiveMenu($rootScope.listActive, "SkriningNyeri");
            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
            //indikator harap tunggu
            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;

            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.item = {};
            
            $scope.formId = 359;
            $scope.arrParameterSkriningTmbhn = [];
            findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
					debugger;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				// $scope.formMaster.detail.forEach(function(frmMaster){
                //     if (!frmMaster.value)
                //         frmMaster.value = 329
                //         $scope.arrParameterSkriningTmbhn.push({
                //             // "id": frmMaster.id,
                //             "idParent": frmMaster.id,
                //             "descNilai": frmMaster.descNilai,
                //             "nama": frmMaster.nama,
                //             "value": frmMaster.value
                //         })
                // })
			})
            $scope.klikOption = function(data, stat){
                debugger;
            }
            $scope.Save = function() {
                debugger;
                var dataForm = [];
                if ($scope.formMaster.value !== null) {
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
                
                // for (var i = 0; i < $scope.listKarateristikNyeri.length; i++) {
                //     delete $scope.listKarateristikNyeri[i].isChecked;
                // }

                // for (var i = 0; i < $scope.listNyeriMempengaruhi.length; i++) {
                //     delete $scope.listNyeriMempengaruhi[i].isChecked;
                // }

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

            // $scope.ListRadio = [
            //     {"id": 1, "name": "Lengkap"},
            //     {"id": 2, "name": "Tidak Lengkap"},
            //     {"id": 3, "name": "Tidak Pernah"}
            // ]

           
        }
    ]);
});