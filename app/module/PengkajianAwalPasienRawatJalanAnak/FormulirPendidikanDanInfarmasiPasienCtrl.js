/**
 * Created by jasamedika on 6/20/2016.
 */
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('FormulirPendidikanDanInfarmasiPasienCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, cacheHelper, DateHelper) {
            $scope.listBahasa = ["Indonesia", "Inggris", "Daerah"];
            $scope.item = {};
            $scope.now = new Date();
            $scope.listStatusYaTidak = ["Ya", "Tidak"];
            $scope.listPendidikan = ["SD", "SLTP", "SLTA", "DIII/S1"];
            $scope.listBahasaTulis = ["Baik", "Kurang"];
            $scope.listTipePembelajaran = ["Tidak Ada", "Penglihatan Terganggu", "Bahasa", "Kognitif Kurang"];
            $scope.listHambatanPendidikan = ["Budaya/Agama/Spiritual", "Emosional", "Gangguan bicara", "Fisik Lemah"];

            $scope.listTopik = [{
                title: "Hak dan Kewajiban Pasien & Keluarga, Tata tertib",
                metode: ["Ceramah"],
                evaluasi: ["Menjelaskan", "Edukasi ulang"],
                material: ["Leaflet", "Booklet", "Lembar balik", "Audio visual"]
            }, {
                title: "Penyakit",
                metode: ["Ceramah", "Simulasi", "Demonstrasi"],
                evaluasi: ["Menjelaskan", "Mendemonstrasikan", "Edukasi ulang"],
                material: ["Leaflet", "Booklet", "Lembar balik", "Audio visual"]
            }];
            $scope.source = new kendo.data.DataSource({
                data: $scope.listTopik,
                pageSize: 21
            });
            $scope.detail = function(data) {
                $scope.data = data;
            }
        }
    ]);
});
/**
 * Created by jasamedika on 6/20/2016.
 */