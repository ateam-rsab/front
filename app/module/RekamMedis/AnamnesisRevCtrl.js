define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AnamnesisRevCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper',
        function (findPasien, managePasien, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper) {


            $scope.sourceAnamnesisDokter = new kendo.data.DataSource({
                pageSize: 10,
                data: []
            });

            $scope.mainGridOptions = {
                pageable: true,
                columns: [
                    {
                        "field": "tanggalInput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "petugas",
                        "title": "Petugas",
                        "width": "200px"
                    }, {
                        "field": "namaRuangan",
                        "title": "Ruangan",
                        "width": "200px"
                    }, {
                        "field": "anamnesisDokter",
                        "title": "Anamnesis",
                        "width": "300px"
                    }
                ]
            };



        }
    ]);
});