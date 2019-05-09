define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('CekRujukanRevCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien','ManageServicePhp',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien,manageServicePhp) {
            $scope.isRouteLoading = true;
            $scope.clear = function(){
                $scope.item = {};
                $scope.item.identitas = $scope.dataCheckbox[0];
                $scope.isRouteLoading = false;
            };
            $scope.dataCheckbox = [{
                "id": 1, "name": "No Rujukan"
            }, {
                "id": 2, "name": "No Kartu"
            }];
            $scope.clear();
            $scope.findData = function(data){
                if(!data) return;
                if(!$scope.item.identitas){
                    messageContainer.error('Pilih Pencarian Terlebih Dahulu');
                    return;
                } else {
                    // console.log(JSON.stringify($scope.item.identitas))
                    if($scope.item.identitas.id === 1) {
                        $scope.cekNoRujukan(data);
                    } else {
                        $scope.cekNoKartu(data);
                    }
                }
                // findPasien.getDetailSep(data).then(function(e) {
                //     document.getElementById("json").innerHTML = JSON.stringify(e.data.data, undefined, 2);
                // });
            }
            $scope.cekNoRujukan = function(noKartu){
                $scope.isRouteLoading = true;
                manageServicePhp.checkPesertaByNoRujukanRs(noKartu).then(function(e) {
                    document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function(){
                     $scope.isRouteLoading = false;
                });
            }
            $scope.cekNoKartu = function(nik){
                $scope.isRouteLoading = true;
                manageServicePhp.cekRujukanRsByNoKartu(nik).then(function(e) {
                    document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function(){
                     $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});