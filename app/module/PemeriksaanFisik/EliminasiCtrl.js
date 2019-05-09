define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('EliminasiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
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


            $scope.isShowForm = false;


            $scope.isAdaGangguansatu = false;
            $scope.$watch('item.pengeluaranDefeaksi', function(newValue, oldValue) {
                if (newValue == "Stome") {
                    $scope.isAdaGangguansatu = true;
                } else {
                    $scope.isAdaGangguansatu = false;
                }
            });
            if ($state.current.name.indexOf('Pemeriksaan') >= 0)
                $rootScope.showMenuDetail = false;

            $scope.isAdaGangguan = false;
            $scope.$watch('item.kelainanUrin', function(newValue, oldValue) {

                if (newValue != undefined) {
                    if (newValue.name == "Ada") {
                        $scope.isAdaGangguan = true;
                    } else {
                        $scope.isAdaGangguan = false;
                    }
                }


            });


            $scope.isAdaGangguanLainLain = false;
            $scope.$watch('item.karakteristikFeses', function(newValue, oldValue) {
                if (newValue != undefined) {
                    if (newValue.name == "Lain-lain") {
                        $scope.isAdaGangguanLainLain = true;
                    } else {
                        $scope.isAdaGangguanLainLain = false;
                    }
                }
            });

            $q.all([ModelItem.getDataDummyGeneric("StatusAdaTidakAda", false),
                ModelItem.getDataDummyGeneric("Pengeluaran", false),
                ModelItem.getDataDummyGeneric("Urin", false),
                ModelItem.getDataDummyGeneric("GerakanAnak", false),
                ModelItem.getDataDummyGeneric("KarakteristikFeses", false),
                ModelItem.getDataDummyGeneric("StatusKonsistensi", false),
                ModelItem.get("PemeriksaanFisikEliminasi"),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {

                if (data[0].statResponse)
                    $scope.listStatusEliminasi = data[0];

                if (data[1].statResponse)
                    $scope.listStatusPengeluaran = data[1];

                if (data[2].statResponse)
                    $scope.listStatusUrin = data[2];

                if (data[3].statResponse)
                    $scope.listStatusGerakanAnak = data[3];

                if (data[4].statResponse)
                    $scope.listStatusKarakteristikFeses = data[4];

                if (data[5].statResponse)
                    $scope.listStatusKonsistensi = data[5];

                if (data[6].statResponse) {
                    $scope.item = {};
                    $scope.item = data[6];
                    $scope.item.isNormal = "true";
                    $scope.item.noRec = "";
                }


                if (data[7].statResponse) {
                    $rootScope.currentPasien = data[7].data.data;
                    $scope.pasien = data[7].data.data;
                }

                //ambil data current pasien seusia no cm dan tanggal     
                getDataCurentPasien();
            });

            function getDataCurentPasien() {
                findPasien.getEliminasi($state.params.noCM, $state.params.tanggal).then(function(e) {
                    if (e.data.data.PapEliminasi[0] != undefined) {

                        $scope.item.PapEliminasi = e.data.data.PapEliminasi[0];
                        $scope.item.noRec = $scope.item.PapEliminasi.noRec;

                        //isi data dari database ke model form
                        $scope.item.kelainanUrin = ModelItem.convertObjectLoadData($scope.listStatusEliminasi, $scope.item.PapEliminasi.kelainanUrin.id);
                        $scope.item.pengeluaranDefeaksi = ModelItem.convertObjectLoadData($scope.listStatusPengeluaran, $scope.item.PapEliminasi.pengeluaranDefeaksi.id);
                        $scope.item.diuresisUrin = $scope.item.PapEliminasi.diuresisUrin;
                        $scope.item.konsistensiDefeaksi = $scope.item.PapEliminasi.konsistensiDefeaksi;
                        $scope.item.frekuensiDefeaksi = $scope.item.PapEliminasi.frekuensiDefeaksi;
                        $scope.item.karakteristikFeses = ModelItem.convertObjectLoadData($scope.listStatusKarakteristikFeses, $scope.item.PapEliminasi.karakteristikFeses.id);
                        $scope.item.pengeluaranUrin = ModelItem.convertObjectLoadData($scope.listStatusUrin, $scope.item.PapEliminasi.pengeluaranUrin.id);
                        $scope.item.isNormal = $scope.item.PapEliminasi.isNormal;

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
                ManagePasien.saveEliminasi(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.kajianAwal.eliminasi = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.isNext = true;
                    // $state.go('dashboardpasien.Integumen', {
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