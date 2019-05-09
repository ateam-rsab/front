define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaboratoriumCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pemeriksaan Fisik";
            $rootScope.showMenu = true;
            $scope.noCM = $state.params.noCM;
            //dummy data kesadaran


            ModelItem.get("RiwayatLaboratorium").then(function(data) {
                $scope.item = data;})

            // untuk isi dari generic .json
            ModelItem.getDataDummyGeneric("StatusLabRutin", false).then(function(data) {
                $scope.listStatusLabRutin = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabKhusus", false).then(function(data) {
                $scope.listStatusLabKhusus = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabKoagulasi", false).then(function(data) {
                $scope.listStatusLabKoagulasi = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabAnemia", false).then(function(data) {
                $scope.listStatusLabAnemia = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabBankDarah", false).then(function(data) {
                $scope.listStatusLabBankDarah = data;
            })

            // KIMIA
            ModelItem.getDataDummyGeneric("StatusLabDiabetes", false).then(function(data) {
                $scope.listStatusLabDiabetes = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabFaalGinjal", false).then(function(data) {
                $scope.listStatusLabFaalGinjal = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabTinja", false).then(function(data) {
                $scope.listStatusLabTinja = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabUrine", false).then(function(data) {
                $scope.listStatusLabUrine = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabFaalHati", false).then(function(data) {
                $scope.listStatusLabFaalHati = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabElektrolit", false).then(function(data) {
                $scope.listStatusLabElektrolit = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabFaalPankreas", false).then(function(data) {
                $scope.listStatusLabFaalPankreas = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabFaalJantung", false).then(function(data) {
                $scope.listStatusLabFaalJantung = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabProfilLemak", false).then(function(data) {
                $scope.listStatusLabProfilLemak = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabAnalisaGasDarah", false).then(function(data) {
                $scope.listStatusLabAnalisaGasDarah = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabKadarObat", false).then(function(data) {
                $scope.listStatusLabKadarObat = data;
            })

            // Imunologi
            ModelItem.getDataDummyGeneric("StatusLabImunologi", false).then(function(data) {
                $scope.listStatusLabImunologi = data;
            })

            // Serologi
            ModelItem.getDataDummyGeneric("StatusLabUmum", false).then(function(data) {
                $scope.listStatusLabUmum = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabTorch", false).then(function(data) {
                $scope.listStatusLabTorch = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabSkriningHIV", false).then(function(data) {
                $scope.listStatusLabSkriningHIV = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabHepatitis", false).then(function(data) {
                $scope.listStatusLabHepatitis = data;
            })

            // Hormon
            ModelItem.getDataDummyGeneric("StatusLabReproduksi", false).then(function(data) {
                $scope.listStatusLabReproduksi = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabTiroid", false).then(function(data) {
                $scope.listStatusLabTiroid = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabLainlain", false).then(function(data) {
                $scope.listStatusLabLainlain = data;
            })

            // Mikrobiologi
            ModelItem.getDataDummyGeneric("StatusLabMikroskopik", false).then(function(data) {
                $scope.listStatusLabMikroskopik = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabBiakanResistensiBahan", false).then(function(data) {
                $scope.listStatusLabBiakanResistensiBahan = data;
            })
            ModelItem.getDataDummyGeneric("StatusLabPcr", false).then(function(data) {
                $scope.listStatusLabPcr = data;
            })

            $scope.listKesadaran = [{
                "id": "1",
                "name": "Kompos mentis"
            }, {
                "id": "1",
                "name": "Apatis"
            }, {
                "id": "1",
                "name": "Somnolen"
            }, {
                "id": "1",
                "name": "Sopor"
            }, {
                "id": "1",
                "name": "Coma"
            }, {
                "id": "1",
                "name": "Tumpul"
            }, ];

            $scope.listStatGanguanNeurologi = [{
                "id": "1",
                "name": "Tidak Ada"
            }, {
                "id": "1",
                "name": "Ada"
            }];
        }
    ]);
});