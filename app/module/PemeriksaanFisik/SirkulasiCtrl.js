define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SirkulasiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
            debugger;
            $scope.title = "Sirkulasi";

            $scope.dataVOloaded = true;
            $scope.isShowForm = false;
            $rootScope.showMenuDetail = true;
            if ($state.current.name.indexOf('Pemeriksaan') >= 0)
                $rootScope.showMenuDetail = false;

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



            $q.all([ModelItem.getDataDummyGeneric("StatusAdaTidakAda", false),
                ModelItem.getDataDummyGeneric("StatusHangatDingin", false),
                ModelItem.getDataDummyGeneric("DataIntensitasNadi", false),
                ModelItem.getDataDummyGeneric("DataCRT", false),
                ModelItem.get("PemeriksaanFisikSirkulasi"),
                ModelItem.getDataDummyGeneric("StatusTurgorKulit", false),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {

                if (data[0].statResponse)
                    $scope.listAdaTidakAda = data[0];

                if (data[1].statResponse)
                    $scope.listHangatDingin = data[1];

                if (data[2].statResponse)
                    $scope.listIntensitasNadi = data[2];

                if (data[3].statResponse) {
                    $scope.listCRT = data[3];
                }

                if (data[4].statResponse) {
                    $scope.item = {};
                    $scope.item = data[4];
                    $scope.item.isNormal = "false";
                    $scope.item.noRec = "";
                }

                if (data[5].statResponse) {
                    $scope.listTurgorKulit = data[5];
                }

                if (data[6].statResponse) {
                    $rootScope.currentPasien = data[6].data.data;
                    $scope.pasien = data[6].data.data;
                }

                //ambil data current pasien seusia no cm dan tanggal     
                getDataCurentPasien();
            });

            function getDataCurentPasien() {
                findPasien.getSirkulasi($state.params.noCM, $state.params.tanggal).then(function(e) {

                    if (e.data.data.PapSirkulasi[0] != undefined) {
                        $scope.item.PapSirkulasi = e.data.data.PapSirkulasi[0];
                        $scope.item.noRec = $scope.item.PapSirkulasi.noRec;

                        //isi data dari database ke model form
                        $scope.item.crt = ModelItem.convertObjectLoadData($scope.listCRT, $scope.item.PapSirkulasi.crt.id);
                        $scope.item.sianosis = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapSirkulasi.sianosis.id);
                        $scope.item.edema = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapSirkulasi.edema.id);
                        $scope.item.iramaNadi = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapSirkulasi.iramaNadi.id);
                        $scope.item.pucat = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapSirkulasi.pucat.id);
                        $scope.item.clubbingFinger = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapSirkulasi.clubbingFinger.id);
                        $scope.item.intensitasNadi = ModelItem.convertObjectLoadData($scope.listIntensitasNadi, $scope.item.PapSirkulasi.intensitasNadi.id);
                        $scope.item.akral = ModelItem.convertObjectLoadData($scope.listHangatDingin, $scope.item.PapSirkulasi.akral.id);
                        $scope.item.isNormal = $scope.item.PapSirkulasi.isNormal;

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
                debugger;
                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.saveSirkulasi(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.kajianAwal.sirkulasi = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.isNext = true;
                    // $state.go('dashboardpasien.Neurologi', {
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