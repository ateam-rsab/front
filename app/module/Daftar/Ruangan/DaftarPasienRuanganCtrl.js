define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPasienRuanganCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru',
        function($rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru) {
            $scope.title = "ini page pencarian pasien";
            $scope.dataVOloaded = false;

            //list data pekerjaan
            var arrFieldSelectVoPekerjaan = ['id', 'pekerjaan'];
            ModelItem.getKendoSource("Pekerjaan", arrFieldSelectVoPekerjaan, false).then(function(data) {
                $scope.Column = [{
                    field: "NoRegistrasi",
                    title: "No. Registrasi",
                    width: 240
                }, {
                    field: "NoRM",
                    title: "No. RM",
                    width: 240
                }, {
                    field: "NamaPasien",
                    title: "NamaPasien",
                    width: 240
                }, {
                    field: "RuanganTujuan",
                    title: "RuanganTujuan",
                    width: 240
                }, ];

                $scope.Page = {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                }
                $scope.listDataPekerjaan = data;
                $rootScope.doneLoad = false;
                $scope.dataVOloaded = true;
            });

            $scope.RegistrasiMasukRuangan = function() {
                $state.go('registrasiMasukRuangan', {
                    id: '1233445'
                });
            }

        }
    ]);
});