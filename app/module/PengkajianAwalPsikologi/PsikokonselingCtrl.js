define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PsikokonselingCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper',
        function ($rootScope, $scope, ModelItem, $state, dateHelper) {
            ModelItem.get("Psikologi").then(function (data) {
                $scope.item = data;
                $scope.title = "Psikokonseling dan Psikoterapi";

                $scope.Selanjutnya = function (model) {
                    $scope.item.psikologi.psikokonseling=$scope.item.psikokonseling;
                    $scope.item.state = model;
                    ModelItem.set("Psikologi", $scope.item);
                    $state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.Psikologi.Rencana');
                    console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                };
                $scope.Back = function () {
                    history.back();
                }
            }, function errorCallBack(err) { });
        }
    ]);
});