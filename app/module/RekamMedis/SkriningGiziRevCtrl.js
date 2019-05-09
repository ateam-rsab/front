define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningGiziNeoRevCtrl', ['$rootScope', '$scope', '$state', 'ManagePhp',
        function($rootScope, $scope, $state, ManagePhp) {
        
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuSkrining = true;
            $scope.noCM = $state.params.noCM;
            $scope.dataVOloaded = true;
            $scope.item = {};

            $scope.isAnak

            $scope.getdata=function(){
                var objectfk = "SKG";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk).then(function(e) {
                    $scope.dataTandaVital = e.data.data;
                    for (var i = 0; i < $scope.dataTandaVital.length; i++) {
                        if($scope.dataTandaVital[i].objectfk == "SKG-000001"){
                            $scope.noRecBB = $scope.dataTandaVital[i].norec
                            $scope.item.beratBadan = $scope.dataTandaVital[i].nilai
                        }else if($scope.dataTandaVital[i].objectfk == "SKG-000002"){
                            $scope.noRecTB = $scope.dataTandaVital[i].norec
                            $scope.item.tinggiBadan = $scope.dataTandaVital[i].nilai
                        }else if($scope.dataTandaVital[i].objectfk == "SKG-000003"){
                            $scope.noRecLK = $scope.dataTandaVital[i].norec
                            $scope.item.lingkarKepala = $scope.dataTandaVital[i].nilai
                        }
                    }
                })
            };
            $scope.getdata();

            $scope.Save = function() {
                
                if ($scope.dataTandaVital.length != 0) {
                   var data = [
                        {
                            norec: $scope.noRecBB,
                            objectfk: "SKG-000001",
                            nilai: $scope.item.beratBadan,
                            satuan: "Kg",
                            jenisobject : "textbox"
                        },
                        {
                            norec: $scope.noRecTB,
                            objectfk: "SKG-000002",
                            nilai: $scope.item.tinggiBadan,
                            satuan: "Cm",
                            jenisobject: 'textbox'
                        },
                        {
                            norec: $scope.noRecLK,
                            objectfk: "SKG-000003",
                            nilai: $scope.item.lingkarKepala,
                            satuan: "Cm",
                            jenisobject: "textbox"
                        }
                    ]
                } else {
                    var data = [
                        {
                            norec: "-",
                            objectfk: "SKG-000001",
                            nilai: $scope.item.beratBadan,
                            satuan: "Kg",
                            jenisobject : "textbox"
                        },
                        {
                            norec: "-",
                            objectfk: "SKG-000002",
                            nilai: $scope.item.tinggiBadan,
                            satuan: "Cm",
                            jenisobject: 'textbox'
                        },
                        {
                            norec: "-",
                            objectfk: "SKG-000003",
                            nilai: $scope.item.lingkarKepala,
                            satuan: "Cm",
                            jenisobject: "textbox"
                        }
                    ]                                
                }
                for (var i = data.length - 1; i >= 0; i--) {
                    if(data[i].nilai == undefined){
                        data.splice([i],1)
                    }
                    if(data[i].norec == undefined){
                        data[i].norec = '-'
                    }

                }
                var jsonSave = {
                    data: data,
                    noregistrasifk: $state.params.noRec
                }
                ManagePhp.saveData(jsonSave).then(function(e) {
                });
            };
        }
    ]);
});