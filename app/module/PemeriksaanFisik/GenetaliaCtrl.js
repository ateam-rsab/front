define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('GenetaliaCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Genetalia";

            $scope.dataVOloaded = true;
            $scope.isShowForm = false;
            $scope.isAdaGangguan = false;

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

            $scope.$watch('item.status', function(newValue, oldValue) {
                $scope.item.keterangan = "";
                if (newValue == "Kelainan") {
                    $scope.isAdaGangguan = true;
                } else {
                    $scope.isAdaGangguan = false;
                    $scope.item.keterangan = "";
                }
            });
            if ($state.current.name.indexOf('Pemeriksaan') >= 0)
                $rootScope.showMenuDetail = false;



            $q.all([ModelItem.getDataDummyGeneric("genetalia", false),
                ModelItem.get("PemeriksaanFisikGenetalia"),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {

                if (data[0].statResponse)
                    $scope.listStatusGenetalia = data[0];

                if (data[1].statResponse) {
                    $scope.item = {};
                    $scope.item = data[1];
                    $scope.item.keterangan = "";
                    $scope.item.isNormal = "true";
                    $scope.item.noRec = "";
                }

                if (data[2].statResponse) {
                    $rootScope.currentPasien = data[2].data.data;
                    $scope.pasien = data[2].data.data;
                }

                //ambil data current pasien seusia no cm dan tanggal     
                getDataCurentPasien();
            });

            function getDataCurentPasien() {
                debugger;
                findPasien.getGenetalia($state.params.noCM, $state.params.tanggal).then(function(e) {

                    if (e.data.data.PapGenatalia[0] != undefined) {

                        $scope.item.PapGenetalia = e.data.data.PapGenatalia[0];
                        $scope.item.noRec = $scope.item.PapGenetalia.noRec;

                        //isi data dari database ke model form
                        $scope.item.status = $scope.item.PapGenetalia.status;
                        $scope.item.keterangan = $scope.item.PapGenetalia.keterangan;
                        $scope.item.isNormal = $scope.item.PapGenetalia.isNormal;

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
                ManagePasien.saveGenetalia(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {

                    $scope.kajianAwal.genetalia = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.isNext = true;
                    // $state.go('dashboardpasien.pengkajianUtama', {
                    //     noCM: $state.params.noCm,
                    //     tanggal: moment(new Date($state.params.tanggal)).format('YYYY-MM-DD HH:mm:ss'),
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