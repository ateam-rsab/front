define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CekKepesertaanRevCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien', 'ManageServicePhp',
        function ($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien, manageServicePhp) {
            $scope.isRouteLoading = true;
            $scope.clear = function () {
                $scope.item = {};
                $scope.item.identitas = $scope.dataCheckbox[0];
                $scope.isRouteLoading = false;
            };
            $scope.isShowPotensi = true;
            $scope.isShowApproval = false;
            $scope.isShowTglPulang = false;
            $scope.isShowIntegrasi = false;
            $scope.showPembuatanSep = function () {
                $scope.isShowPembuatanSep = !$scope.isShowPembuatanSep;
            }
            $scope.showPotensi = function () {
                $scope.isShowPotensi = !$scope.isShowPotensi;
            }

            $scope.dataCheckbox = [{
                "id": 1, "name": "No Kartu"
            }, {
                "id": 2, "name": "NIK"
            }];
            $scope.clear();
            $scope.findData = function (data) {
                if (!data) return;
                if (!$scope.item.identitas) {
                    messageContainer.error('Pilih Pencarian Terlebih Dahulu');
                    return;
                } else {
                    // console.log(JSON.stringify($scope.item.identitas))
                    if ($scope.item.identitas.id === 1) {
                        $scope.cekNoKartu(data);
                    } else {
                        $scope.cekNik(data);
                    }
                }
                // findPasien.getDetailSep(data).then(function(e) {
                //     document.getElementById("json").innerHTML = JSON.stringify(e.data.data, undefined, 2);
                // });
            }
            $scope.cekNoKartu = function (noKartu) {
                $scope.isRouteLoading = true;
                manageServicePhp.checkPesertaByNoBpjs(noKartu).then(function (e) {
                    document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
            $scope.cekNik = function (nik) {
                $scope.isRouteLoading = true;
                manageServicePhp.checkPesertaByNik(nik).then(function (e) {
                    document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});