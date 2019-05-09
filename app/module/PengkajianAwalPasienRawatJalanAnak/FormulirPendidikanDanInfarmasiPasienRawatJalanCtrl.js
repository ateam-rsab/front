/**
 * Created by jasamedika on 6/20/2016.
 */
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('FormulirPendidikanDanInfarmasiPasienRawatJalanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, cacheHelper, DateHelper) {
            $scope.listBahasa = ["Indonesia", "Inggris", "Daerah"];
            $scope.item = {};
            $scope.now = new Date();
            $scope.listEvaluasi = ["Sudah mengerti", "Re-pendidikan", "Re-demonstrasi"];
            $scope.listStatusYaTidak = ["Ya", "Tidak"];
            $scope.listPendidikan = ["SD", "SLTP", "SLTA", "DIII/S1"];
            $scope.listBahasaTulis = ["Baik", "Kurang"];
            $scope.listTipePembelajaran = ["Tidak Ada", "Penglihatan Terganggu", "Bahasa", "Kognitif Kurang"];
            $scope.listHambatanPendidikan = ["Budaya/Agama/Spiritual", "Emosional", "Gangguan bicara", "Fisik Lemah"];

        }
    ]);
});
/**
 * Created by jasamedika on 6/20/2016.
 */