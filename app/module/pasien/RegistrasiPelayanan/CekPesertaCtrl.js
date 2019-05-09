define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('CekPesertaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien) {
            $scope.isRouteLoading = true;
            $scope.clear = function(){
                $scope.item = {};
                $scope.item.identitas = $scope.dataCheckbox[0];
                $scope.isRouteLoading = false;
            };
            $scope.dataCheckbox = [{
                "id": 1, "name": "No Kartu"
            }, {
                "id": 2, "name": "NIK"
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
                        $scope.cekNoKartu(data);
                    } else {
                        $scope.cekdNik(data);
                    }
                }
                // findPasien.getDetailSep(data).then(function(e) {
                //     document.getElementById("json").innerHTML = JSON.stringify(e.data.data, undefined, 2);
                // });
            }
            $scope.cekNoKartu = function(noKartu){
                $scope.isRouteLoading = true;
                findPasien.checkKepesertaan(noKartu).then(function(e) {
                    document.getElementById("json").innerHTML = JSON.stringify(e.data.data, undefined, 4);
                }).then(function(){
                     $scope.isRouteLoading = false;
                });
            }
            $scope.cekdNik = function(nik){
                $scope.isRouteLoading = true;
                findPasien.checkKepesertaanByNik(nik).then(function(e) {
                    document.getElementById("json").innerHTML = JSON.stringify(e.data.data, undefined, 4);
                }).then(function(){
                     $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});