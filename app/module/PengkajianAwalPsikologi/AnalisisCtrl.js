define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AnalisisCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper',
        function ($rootScope, $scope, ModelItem, $state, dateHelper) {
            ModelItem.get("Psikologi").then(function (data) {
                $scope.item = data;
                $scope.title = "Analisis/Psikodinamika";

                $scope.Selanjutnya = function (model) {
                    $scope.item.psikologi.analisis=$scope.item.analisis;
                    $scope.item.state = model;
                    ModelItem.set("Psikologi", $scope.item);
                    $state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.Psikologi.KesanPsikologis');
                    console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                };
                $scope.Back = function () {
                    history.back();
                }
            }, function errorCallBack(err) { });
        }
    ]);
});