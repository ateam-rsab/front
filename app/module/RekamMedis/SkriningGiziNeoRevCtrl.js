define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningGiziNeoRevCtrl', ['$rootScope', '$scope', '$state', 'ManagePhp', 'CacheHelper',
        function($rootScope, $scope, $state, ManagePhp, cacheHelper) {
        
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuSkrining = true;
            $scope.noCM = $state.params.noCM;
            $scope.dataVOloaded = true;
            $scope.item = {};
             $scope.noRecPap = cacheHelper.get('noRecPap');

            $scope.isAnak

            $scope.getdata=function(){
                var objectfk = "SKG";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
                         + '&riwayatfk=' +   $scope.noRecPap).then(function(e) {
                    $scope.data = e.data.data;
                    for (var i = 0; i < $scope.data.length; i++) {
                        if($scope.data[i].objectfk == "SKG-000001"){
                            $scope.noRecBB = $scope.data[i].norec
                            $scope.item.beratBadan = parseFloat($scope.data[i].nilai)
                        }else if($scope.data[i].objectfk == "SKG-000002"){
                            $scope.noRecTB = $scope.data[i].norec
                            $scope.item.tinggiBadan = parseFloat($scope.data[i].nilai)
                        }else if($scope.data[i].objectfk == "SKG-000003"){
                            $scope.noRecLK = $scope.data[i].norec
                            $scope.item.lingkarKepala = parseFloat($scope.data[i].nilai)
                        }
                    }
                })
            };
            $scope.getdata();

            $scope.Save = function() {
             
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
                
                  
                for (var i = data.length - 1; i >= 0; i--) {
                    if(data[i].norec == undefined){
                        data[i].norec = '-'
                    }
                    if(data[i].nilai == undefined){
                        data.splice([i],1)
                    }
                }
                var jsonSave = {
                    data: data,
                    noregistrasifk: $state.params.noRec,
                    riwayatpapfk: $scope.noRecPap
                }
                ManagePhp.saveData(jsonSave).then(function(e) {
                });
            };
        }
    ]);
});