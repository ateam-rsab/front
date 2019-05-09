define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('CetakGajiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.Detail = function() {
                $state.go("RekamDataPegawai");
            }
            $scope.dataSource = new kendo.data.DataSource({
                data: [{
                        "kodeJenis": "BHN001",
                        "JenisBahan": "Aldet"
                    }, {
                        "kodeJenis": "BHN002",
                        "JenisBahan": "Laudet"
                    }, {
                        "kodeJenis": "BHN003",
                        "JenisBahan": "MC. Bleach"
                    }, {
                        "kodeJenis": "BHN004",
                        "JenisBahan": "OXO. Bleach"
                    }, {
                        "kodeJenis": "BHN005",
                        "JenisBahan": "E. 951"
                    }, {
                        "kodeJenis": "BHN006",
                        "JenisBahan": "M. Saur"
                    }, {
                        "kodeJenis": "BHN007",
                        "JenisBahan": "M. Soft"
                    }

                ]
            });



            $scope.Listketerangan = [{
                    "id": 1,
                    "kode": "1",
                    "keterangan": "Golongan I"
                }, {
                    "id": 2,
                    "kode": "2",
                    "keterangan": "Golongan II"
                }, {
                    "id": 3,
                    "kode": "3",
                    "keterangan": "Golongan III"
                }, {
                    "id": 4,
                    "kode": "4",
                    "keterangan": "Golongan IV"
                }, {
                    "id": 5,
                    "kode": "5",
                    "keterangan": "Rekapitulasi"
                }

            ];



            $scope.daftarBahanLinen = new kendo.data.DataSource({
                data: [{
                        "kodeJenis": "BHN001",
                        "JenisBahan": "Aldet"
                    }, {
                        "kodeJenis": "BHN002",
                        "JenisBahan": "Laudet"
                    }, {
                        "kodeJenis": "BHN003",
                        "JenisBahan": "MC. Bleach"
                    }, {
                        "kodeJenis": "BHN004",
                        "JenisBahan": "OXO. Bleach"
                    }, {
                        "kodeJenis": "BHN005",
                        "JenisBahan": "E. 951"
                    }, {
                        "kodeJenis": "BHN006",
                        "JenisBahan": "M. Saur"
                    }, {
                        "kodeJenis": "BHN007",
                        "JenisBahan": "M. Soft"
                    }

                ]
            });
            $scope.mainGridOptions = {
                columns: $scope.columnInformasiDaftarGajiPns,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.columnInformasiDaftarGajiPns = [{
                "field": "noGaji",
                "title": "No Gaji"
            }, {
                "field": "periode",
                "title": "Periode"
            }, {
                "field": "jenis",
                "title": "Jenis"
            }, {
                "field": "keterangan",
                "title": "Keterangan"
            }];


























        }
    ]);
});
