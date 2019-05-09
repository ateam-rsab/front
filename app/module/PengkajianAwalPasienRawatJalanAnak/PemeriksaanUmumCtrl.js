define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PemeriksaanUmumCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, findPasien) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian  Keperawatan";
            $scope.noCM = $state.params.noCM;
            //indikator harap tunggu
            $rootScope.doneLoad = false;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.tanggal = $state.params.tanggal;
            $scope.noCM = $state.params.noCM;
            $scope.item = {};
            $scope.dataRiwayatPenyakitOrObat = new kendo.data.DataSource({
                data: []
            });

            findPasien.checkPemeriksaanPasien($scope.noCM, $scope.tanggal, "Pernafasan").then(function(e) {
                $scope.flagPernafasan = e.data;
            });
            findPasien.checkPemeriksaanPasien($scope.noCM, $scope.tanggal, "Sirkulasi").then(function(e) {
                $scope.flagSirkulasi = e.data;
            });
            findPasien.checkPemeriksaanPasien($scope.noCM, $scope.tanggal, "Neurologi").then(function(e) {
                $scope.flagNeurologi = e.data;
            });
            findPasien.checkPemeriksaanPasien($scope.noCM, $scope.tanggal, "Gastrointestinali").then(function(e) {
                $scope.flagGastrointestinali = e.data;
            });
            findPasien.checkPemeriksaanPasien($scope.noCM, $scope.tanggal, "Eliminasi").then(function(e) {
                $scope.flagEliminasi = e.data;
            });
            findPasien.checkPemeriksaanPasien($scope.noCM, $scope.tanggal, "Integumen").then(function(e) {
                $scope.flagIntegumen = e.data;
            });
            findPasien.checkPemeriksaanPasien($scope.noCM, $scope.tanggal, "Muskuloskeletal ").then(function(e) {
                $scope.flagMuskuloskeletal = e.data;
            });
            findPasien.checkPemeriksaanPasien($scope.noCM, $scope.tanggal, "Genatalia").then(function(e) {
                $scope.flagGenatalia = e.data;
            });

        }
    ]);
});