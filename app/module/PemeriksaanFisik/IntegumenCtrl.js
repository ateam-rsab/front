define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('IntegumenCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
            debugger;
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Integumen";

            $scope.dataVOloaded = true;

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

            $scope.item = {};
            $scope.item.isNormal = "true";
            $scope.item.noRec = "";
            debugger;
            $q.all([ModelItem.getDataDummyGeneric("StatusAdaTidakAda", false),
                ModelItem.getDataDummyGeneric("WarnaKulit", false),
                ModelItem.getDataDummyGeneric("StatusUtuhTidak", false),
                ModelItem.get("PemeriksaanFisikIntegumen"),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {

                if (data[0].statResponse)
                    $scope.listStatusKesadaran = data[0];

                if (data[1].statResponse)
                    $scope.listStatusWarnaKulit = data[1];

                if (data[2].statResponse)
                    $scope.listStatusKeutuhanKulit = data[2];

                if (data[3].statResponse)
                    $scope.item = data[3];

                if (data[4].statResponse) {
                    $rootScope.currentPasien = data[4].data.data;
                    $scope.pasien = data[4].data.data;
                }

                //ambil data current pasien seusia no cm dan tanggal     
                getDataCurentPasien();
            });

            function getDataCurentPasien() {
                findPasien.getIntegumen($state.params.noCM, $state.params.tanggal).then(function(e) {
                    if (e.data.data.PapIntegumen[0] != undefined) {
                        $scope.item.PapIntegumen = e.data.data.PapIntegumen[0];
                        $scope.item.noRec = $scope.item.PapIntegumen.noRec;

                        //isi data dari database ke model form
                        $scope.item.luka = ModelItem.convertObjectLoadData($scope.listStatusKesadaran, $scope.item.PapIntegumen.luka.id);
                        $scope.item.kelainan = ModelItem.convertObjectLoadData($scope.listStatusKesadaran, $scope.item.PapIntegumen.kelainan.id);
                        $scope.item.warnaKulit = ModelItem.convertObjectLoadData($scope.listStatusWarnaKulit, $scope.item.PapIntegumen.warnaKulit.id);
                        $scope.item.resikoDekubitos = ModelItem.convertObjectLoadData($scope.listStatusKesadaran, $scope.item.PapIntegumen.resikoDekubitos.id);
                        $scope.item.isNormal = $scope.item.PapIntegumen.isNormal;

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
                ManagePasien.saveIntegumen(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.kajianAwal.integumen = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.isNext = true;
                    // $state.go('dashboardpasien.Muskuloskeletal', {
                    //     noCM: $scope.noCM,
                    //     tanggal: $state.params.tanggal,
                    //     noRec: $state.params.noRec
                    // });
                });
            };
            $scope.Next = function() {
                $rootScope.nextDetail();
            }

            $scope.isKelainan = false;
            $scope.$watch('item.kelainan', function(newValue, oldValue) {
                if (newValue != undefined) {
                    if (newValue.name == "Ada") {
                        $scope.isKelainan = true;
                    } else {
                        $scope.isKelainan = false;
                    }
                }
            });


            $scope.isResikoDekubitus = false;
            $scope.$watch('item.resikoDekubitos', function(newValue, oldValue) {
                if (newValue != undefined) {
                    if (newValue.name == "Ada") {
                        $scope.isResikoDekubitus = true;
                    } else {
                        $scope.isResikoDekubitus = false;
                    }
                }
            });


            $scope.isLuka = false;
            $scope.$watch('item.luka', function(newValue, oldValue) {
                if (newValue != undefined) {
                    if (newValue.name == "Ada") {
                        $scope.isLuka = true;
                    } else {
                        $scope.isLuka = false;
                    }
                }
            });


        }
    ]);
});