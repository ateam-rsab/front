define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JumlahCutiPegawaiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'DateHelper',
		function($rootScope, $scope, ModelItem, $state, manageSdm, dateHelper) {
            var load = function () {
                $scope.now = new Date();
                $scope.item = {
                    "periode": $scope.now
                };
                manageSdm.getListData("KomponenIndex&select=id,komponenIndex").then(function(data){
                   $scope.listStatusPegawai = [];
                   data.data.forEach(function(e){
                        if (e.id === 5) {
                            e.komponenIndex = "Cuti Tahunan";
                            $scope.listStatusPegawai.push(e);
                        } else if (e.id === 17) {
                            e.komponenIndex = "Izin"
                            $scope.listStatusPegawai.push(e);
                        } else {

                        }
                   })
                }, function (err){
                    $scope.isRouteLoading = false
                }).then(function(){
                    $scope.isRouteLoading = true;
                    manageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true", true).then(function(dat){
                        $scope.listPegawai = dat.data;
                        $scope.isRouteLoading = false
                    }, function(err){
                        $scope.isRouteLoading = false
                    });
                });
			}
            $scope.formatThn = {
                start: "year",
                depth: "year",
                format: "yyyy"
            }
            $scope.formatInt ={
                format: "n0",
                min: 0
            }
            $scope.kelompokShift = [{
                "id": 1, "name": "Non-shift",
            }, {
                "id": 2, "name": "Shift 1",
            }, {
                "id": 3, "name": "Shift 2",
            }]
            load();
            $scope.Save = function(){
                var listRawRequired = [
                    "item.periode|k-ng-model|Periode",
                    "item.pegawai|k-ng-model|pegawai",
                    "item.komponenIndex|k-ng-model|Komponen Index",
                    "item.jmlCuti|k-ng-model|Jumlah Cuti"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    // var dataSend = [];
                    // $scope.kelompokShift.forEach(function(ls){
                    //     if (ls.value){
                    //         var tmpData = {
                    //             "kelompokShift": {
                    //                 "id": ls.id
                    //             },
                    //             "value": ls.value,
                    //             "noRec": "",
                    //             "komponenIndex": {
                    //                 "id": $scope.item.komponenIndex.id
                    //             },
                    //             "periode": dateHelper.formatDate($scope.item.periode, "YYYY")
                    //         }
                    //         dataSend.push(tmpData);
                    //     }
                    // })
                    var data = {
                        "statusEnabled": true,
                        "tahun": dateHelper.formatDate($scope.item.periode, "YYYY"),
                        "kdProfile": 0,
                        "pegawai": {
                            "id": $scope.item.pegawai.id
                        },
                        "value": $scope.item.jmlCuti,
                        "komponenIndex": {
                            "id": $scope.item.komponenIndex.id
                        }
                    }
                    // console.log(JSON.stringify(data));
                    manageSdm.saveData(data, "sdm/save-jatah-cuti-dan-izin-pegawai").then(function(e){
                        $scope.isNext = true;
                        $scope.load();
                    }, function(err){
                        debugger;
                    })
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.findDataCuti = function(){
                var listRawRequired = [
                    "item.pegawai|k-ng-model|pegawai",
                    "item.periode|k-ng-model|periode",
                    "item.komponenIndex|k-ng-model|komponen"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    manageSdm.getItem("sdm/get-data-cuti?pegawaiId="+$scope.item.pegawai.id+"&statusPegawaiId="+$scope.item.komponenIndex.id+"&kategoriPegawaiId=&year=" + new Date($scope.item.periode).getFullYear(), true).then(function(dat){
                        // +$scope.item.kategoriPegawaiId
                        $scope.item.jmlCuti = dat.data.data.jatahCuti;
                        $scope.item.sisaCuti = dat.data.data.sisaCuti;
                        if ($scope.item.jumlahCuti <= 0) {
                            $scope.cutiHabis = true;
                        } else {
                            $scope.cutiHabis = false;
                        }
    
                    });
                } else {
                    ModelItem.showMessages(isValid.messages)
                }
            }
        }
	]);
});