define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('NeurologiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
            $scope.title = "Neurologi";

            $scope.isShowForm = false;
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

            //variable show hide field keterangan kalo ada gangguan neurologis
            $scope.isAdaGangguan = false;
            $scope.$watch('item.GangguanNeurologis', function(newValue, oldValue) {
                if (newValue == "Ada") {
                    $scope.isAdaGangguan = true;
                } else {
                    $scope.isAdaGangguan = false;
                }
            });


            $q.all([ModelItem.getDataDummyGeneric("DataKesadaran", false),
                ModelItem.getDataDummyGeneric("StatusAdaTidakAda", false),
                ModelItem.get("PemeriksaanFisikNeurologi"),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {

                if (data[0].statResponse)
                    $scope.listKesadaran = data[0];

                if (data[1].statResponse)
                    $scope.listAdaTidakAda = data[1];

                if (data[2].statResponse) {
                    $scope.item = {};
                    $scope.item.isNormal = "true";
                    $scope.item.noRec = "";
                    $scope.item = data[2];
                }


                if (data[3].statResponse) {
                    $rootScope.currentPasien = data[3].data.data;
                    $scope.pasien = data[3].data.data;
                }

                //ambil data current pasien seusia no cm dan tanggal     
                getDataCurentPasien();
            });

            function getDataCurentPasien() {
                findPasien.getNeurologi($state.params.noCM, $state.params.tanggal).then(function(e) {

                    if (e.data.data.PapNeurologi[0] != undefined) {
                        $scope.item.PapNeurologi = e.data.data.PapNeurologi[0];
                        $scope.item.noRec = $scope.item.PapNeurologi.noRec;

                        //isi data dari database ke model form
                        $scope.item.gangguanNeorologis = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapNeurologi.gangguanNeorologis.id);
                        $scope.item.kesadaran = ModelItem.convertObjectLoadData($scope.listKesadaran, $scope.item.PapNeurologi.kesadaran.id);
                        $scope.item.isNormal = $scope.item.PapNeurologi.isNormal;

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
                ManagePasien.saveNeurologi(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {

                    $scope.kajianAwal.neurologi = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.isNext = true;
                    // $state.go('dashboardpasien.Gastrointestinal', {
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