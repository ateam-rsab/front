define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PemesananGiziCtrl', ['ManageGizi', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasienGizi', 'DateHelper',

        function(manageGizi, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper) {

            ModelItem.getDataDummyGeneric("RisikoGizi", false).then(function(data) {
                $scope.listSkriningGizi = data;
            })
            ModelItem.getDataDummyGeneric("AlergiMakanan", false).then(function(data) {
                $scope.listAlergiMakanan = data;
            })
            ModelItem.getDataDummyGeneric("JenisDiet", false).then(function(data) {
                $scope.sourceJenisDiet = data;
            })
            $scope.column = [{
                "field": "jenisMenu.jenisDiet",
                "title": "Jenis Diet"
            }, {
                "field": "keterangan",
                "title": "Keterangan"
            }];
            $scope.jenisMenuDiet = new kendo.data.DataSource({
                data: []
            });
            $scope.addJenisDiet = function() {
                $scope.jenisMenuDiet.add({
                    jenisMenu: $scope.item.jenisDiet,
                    keterangan: $scope.item.keterangan
                });
            }

            $scope.removeJenisDiet = function() {

                $scope.jenisMenuDiet.data([]);
            };
            $scope.listTindakLanjutGizi = [{
                id: "1",
                name: "Perlu Asuhan Gizi (Lanjutkan ke Asesmen Gizi)"
            }, {
                id: "2",
                name: "Belum perlu asuhan gizi"
            }]
        }
    ])
});