define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MuskuloskeletalCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Integumen";

            $scope.isShowForm = false;
            $rootScope.dataVOloaded = true;
            $rootScope.showMenuPengkajianMedis = false;
            $scope.isAdaGangguan = false;
            $scope.$watch('item.KelainanTulang', function(newValue, oldValue) {
                if (newValue == "Ada") {
                    $scope.isAdaGangguan = true;
                } else {
                    $scope.isAdaGangguan = false;
                }
            });
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
                ModelItem.getDataDummyGeneric("GerakanAnak", false),
                ModelItem.getDataDummyGeneric("StatusAktifitas", false),
                ModelItem.get("PemeriksaanFisikPernafasan"),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {

                if (data[0].statResponse)
                    $scope.listStatusMuskuloskeletal = data[0];

                if (data[1].statResponse)
                    $scope.listStatusGerakanAnak = data[1];

                if (data[2].statResponse)
                    $scope.listStatusAktifitas = data[2];

                if (data[3].statResponse) {
                    $scope.item = {};
                    $scope.item = data[3];
                    $scope.item.isNormal = "true";
                    $scope.item.noRec = "";
                }


                if (data[4].statResponse) {
                    $rootScope.currentPasien = data[4].data.data;
                    $scope.pasien = data[4].data.data;
                }

                //ambil data current pasien seusia no cm dan tanggal     
                getDataCurentPasien();
            });

            function getDataCurentPasien() {
                findPasien.getMuskuloskeletal($state.params.noCM, $state.params.tanggal).then(function(e) {
                    if (e.data.data.PapMuskuloskeletal[0] != undefined) {

                        $scope.item.PapMuskuloskeletal = e.data.data.PapMuskuloskeletal[0];
                        $scope.item.noRec = $scope.item.PapMuskuloskeletal.noRec;

                        //isi data dari database ke model form
                        $scope.item.gerakanAnak = ModelItem.convertObjectLoadData($scope.listStatusGerakanAnak, $scope.item.PapMuskuloskeletal.gerakanAnak.id);
                        $scope.item.kelainanTulang = ModelItem.convertObjectLoadData($scope.listStatusMuskuloskeletal, $scope.item.PapMuskuloskeletal.kelainanTulang.id);
                        $scope.item.isNormal = $scope.item.PapMuskuloskeletal.isNormal;

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
                ManagePasien.saveMuskuloskeletal(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {

                    $scope.kajianAwal.muskloskeletal = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.isNext = true;
                    // $state.go('dashboardpasien.Genatalia', {
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