define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JumlahCutiPershiftCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'DateHelper',
		function($rootScope, $scope, ModelItem, $state, manageSdm, dateHelper) {
            $scope.isRouteLoading = false;
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
                "id": 3, "name": "Shift",
            }]
            load();
            $scope.Save = function(){
                $scope.isRouteLoading = true;
                $scope.isNext = true;
                var listRawRequired = [
                    "item.periode|k-ng-model|Periode",
                    "item.komponenIndex|k-ng-model|Komponen Index"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    var dataSend = [];
                    $scope.kelompokShift.forEach(function(ls){
                        if (ls.value){
                            var tmpData = {
                                "kelompokShift": {
                                    "id": ls.id
                                },
                                "value": ls.value,
                                "noRec": "",
                                "komponenIndex": {
                                    "id": $scope.item.komponenIndex.id
                                },
                                "periode": dateHelper.formatDate($scope.item.periode, "YYYY")
                            }
                            dataSend.push(tmpData);
                        }
                    })
                    var data = {
                        "factorRateKelompokShift" : dataSend
                    }
                    // console.log(JSON.stringify(data));
                    manageSdm.saveData(data, "sdm/save-jatah-cuti-dan-izin").then(function(e){
                        $scope.isNext = false;
                        $scope.isRouteLoading = false;
                        $scope.load();
                    }, function(err){
                        debugger;
                    })
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
        }
	]);
});