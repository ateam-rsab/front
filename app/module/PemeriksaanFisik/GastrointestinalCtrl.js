define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('GastrointestinalCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
            $scope.title = "Gastrointestinal";
            $scope.dataVOloaded = true;


            if ($state.current.name === 'dashboardpasien.soap.Gastrointestinal') {
                $rootScope.showMenuDetail = false;
            } else {
                $rootScope.showMenuDetail = false;
                $scope.isShowForm = false;
            }


            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = false;

            if ($state.$current.name.indexOf("dashboardpasien.PengkajianMedis.Pemeriksaan") != -1) {
                $rootScope.showMenuDetail = false;
            } else {
                $rootScope.showMenuDetail = true;
            }

            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};

            if ($state.current.name.indexOf('Pemeriksaan') >= 0)
                $rootScope.showMenuDetail = false;
            $scope.isMulutLainlain = false;
            $scope.$watch('item.mulut', function(newValue, oldValue) {

                if (newValue != undefined) {
                    if (newValue.name == "Lain-lain") {
                        $scope.isMulutLainlain = true;
                    } else {
                        $scope.isMulutLainlain = false;
                    }
                }
            });

            $scope.item = {};


            $q.all([ModelItem.getDataDummyGeneric("StatusAdaTidakAda", false),
                ModelItem.getDataDummyGeneric("DataMulut", false),
                ModelItem.getDataDummyGeneric("StatusTeraturTidak", false),
                ModelItem.getDataDummyGeneric("StatusBaikKurang", false),
                ModelItem.get("PemeriksaanFisikGastrointestinal"),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {

                if (data[0].statResponse)
                    $scope.listAdaTidakAda = data[0];

                if (data[1].statResponse)
                    $scope.listMulut = data[1];

                if (data[2].statResponse)
                    $scope.listTeraturTidak = data[2];

                if (data[3].statResponse)
                    $scope.listBaikKurang = data[3];

                if (data[4].statResponse) {
                    $scope.item = data[4];
                    $scope.item.KeteranganMulut = "";
                    $scope.item.isNormal = "true";
                    $scope.item.noRec = "";
                }


                if (data[5].statResponse) {
                    $rootScope.currentPasien = data[5].data.data;
                    $scope.pasien = data[5].data.data;
                }

                //ambil data current pasien seusia no cm dan tanggal     
                getDataCurentPasien();
            });

            function getDataCurentPasien() {
                findPasien.getGastrointestinal($state.params.noCM, $state.params.tanggal).then(function(e) {
                    if (e.data.data.PapGastrointestinal[0] != undefined) {

                        $scope.item.PapGastrointestinal = e.data.data.PapGastrointestinal[0];
                        $scope.item.noRec = $scope.item.PapGastrointestinal.noRec;

                        //isi data dari database ke model form
                        $scope.item.nyeriUluHati = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapGastrointestinal.nyeriUluHati.id);
                        $scope.item.mual = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapGastrointestinal.mual.id);
                        $scope.item.ascites = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapGastrointestinal.ascites.id);
                        $scope.item.peristaltikUsus = $scope.item.PapGastrointestinal.peristaltikUsus;
                        $scope.item.mulut = ModelItem.convertObjectLoadData($scope.listMulut, $scope.item.PapGastrointestinal.mulut.id);
                        $scope.item.muntah = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapGastrointestinal.muntah.id);
                        $scope.item.lingkarPerut = $scope.item.PapGastrointestinal.lingkarPerut;
                        $scope.item.isNormal = $scope.item.PapGastrointestinal.isNormal;

                        if ($scope.item.isNormal) {
                            $scope.warna.normal = "#05b72a";
                            $scope.warna.tidakNormal = "#718876";
                        } else {
                            $scope.warna.normal = "#718876";
                            $scope.warna.tidakNormal = "#05b72a";
                        }
                    }
                });
            };


            $scope.warna = {};
            $scope.warna.normal = "#05b72a";
            $scope.warna.tidakNormal = "#718876";

            $scope.changeStat = function(stat) {
                var target = "";
                if (stat == "Normal") {
                    $scope.warna.normal = "#05b72a";
                    $scope.warna.tidakNormal = "#718876";
                    $scope.item.isNormal = true;
                } else {
                    $scope.warna.normal = "#718876";
                    $scope.warna.tidakNormal = "#05b72a";
                    $scope.item.isNormal = false;
                }
            }

            $scope.Save = function() {

                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.saveGastrointestinal(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.kajianAwal.gastrointestinal = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.isNext = true;
                    // $state.go('dashboardpasien.Eliminasi', {
                    //     noCM: $scope.noCM,
                    //     tanggal: $state.params.tanggal,
                    //     noRec: $state.params.noRec
                    // });
                });
            };
            $scope.Next = function() {
                $rootScope.nextDetail();
            }
        }
    ]);
});