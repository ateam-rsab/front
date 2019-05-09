define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RiwayatTumbuhKembangCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {

            //$rootScope.listActive -> data listMenu
            // ModelItem.setActiveMenu($rootScope.listActive, "RiwayatTumbuhKembang");

            /*$scope.item.tglInputData = date;*/
            

            $scope.title = "RiwayatTumbuhKembang";
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            var date = new Date();
            $scope.now = date;
            $scope.item = {};
            ModelItem.get("RiwayatTumbuhKembang").then(function(data) {

            }, function errorCallBack(err) {});

                $scope.item.pasienDaftar = {"noRec": $state.params.noRec}
                $scope.item.tglInput =  $scope.now

                findPasien.getStatusTumbuhKembang($state.params.noRec).then(function(e) {
                        debugger;
                        $scope.dataTumbuhKembang = e.data.data.PapRiwayatTumbuhKembang[e.data.data.PapRiwayatTumbuhKembang.length-1];
                        $scope.item.berdiri = $scope.dataTumbuhKembang.berdiri
                        $scope.item.berjalan = $scope.dataTumbuhKembang.berjalan
                        $scope.item.bicara = $scope.dataTumbuhKembang.bicara
                        $scope.item.duduk = $scope.dataTumbuhKembang.duduk
                        $scope.item.tengkurap = $scope.dataTumbuhKembang.tengkurap
                        $scope.item.tumbuhGigi = $scope.dataTumbuhKembang.tumbuhGigi
                        $scope.item.merangkak = $scope.dataTumbuhKembang.merangkak
                              
                })
            $scope.Save = function() {

                
                ManagePasien.saveTumbuhKembang(ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.isNext = true;
                });
            }
            $scope.Next = function() {
                $rootScope.next();
            }
        }
    ]);
});