define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RencanaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien',
        function ($rootScope, $scope, ModelItem, $state, dateHelper, managePasien) {
            ModelItem.get("Psikologi").then(function (data) {
                $scope.item = data;
                $scope.title = "Rencana Program dan Intervensi";
                $scope.Save = function (model) {
                    $scope.item.psikologi.rencana = $scope.item.rencana;
                    $scope.item.psikologi.tglRegistrasi = 1469791366435;
                    $scope.item.psikologi.pasien = { id: "1631" };
                    $scope.item.state = model;
                    ModelItem.set("Psikologi", $scope.item);
                    //$state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.Psikologi.Rencana');
                    console.log(JSON.stringify(ModelItem.beforePost($scope.item.psikologi)));
                    managePasien.savePsikologi(ModelItem.beforePost($scope.item.psikologi)).then(function () {
                    }, function (err) {
                        debugger
                    });

                };
                $scope.Back = function () {
                    history.back();
                }
            }, function errorCallBack(err) { });

            console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
        }
    ]);
});