define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('KoreksiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'ManageSarpras',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.item = {};

            $scope.disableNoUsulan = true;
            $scope.disableUsulan = true;
            $scope.disableKajian = true;

            ModelItem.get("Hukor/Koreksi").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
                $scope.item.noUsulan = $state.params.id;
            }, function errorCallBack(err) { });

            ManageSarpras.getOrderList("kajian-evaluasi/find-all-by-jabatan/?id=" + $state.params.id).then(function (dat) {
                debugger;
                $scope.item.noUsulan = dat.data.data[0].kajianEvaluasi.noUsulan;
                $scope.item.usulan = dat.data.data[0].kajianEvaluasi.usulan;
                $scope.item.kajian = dat.data.data[0].kajianEvaluasi.kajian;
                $scope.item.koreksi = dat.data.data[0].koreksi;

            });

            $scope.Save = function () {
                var data = [
                    {
                        "id": $state.params.id,
                        "koreksi": $scope.item.koreksi
                    }
                ]
                debugger;
                ManageSarpras.saveDataSarPras(ModelItem.beforePost(data), "kajian-evaluasi/update-kajian/").then(function (e) {
                    console.log(JSON.stringify(e.data));
                    $scope.item = {};
                    $state.go('DaftarUsulanEvaluasiDanKajianOrganisasiTujuan', {

                    });

                });
            }

        }
    ]);
});