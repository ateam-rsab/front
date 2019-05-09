define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PernafasanCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {

            $scope.title = "Pernafasan";
            $scope.dataVOloaded = true;
            //$rootScope.showMenuDetail = true;



            $scope.isBentukDadaTidakNormal = false;
            $scope.$watch('item.bentukDada', function(newValue, oldValue) {

                if (newValue != undefined) {
                    if (newValue.name == "Tidak normal") {
                        $scope.isBentukDadaTidakNormal = true;
                    } else {
                        $scope.isBentukDadaTidakNormal = false;
                    }
                }
            });

            $scope.isPolaNafasTidakNormal = false;
            $scope.$watch('item.polaNapas', function(newValue, oldValue) {
                if (newValue != undefined) {
                    if (newValue.name == "Tidak normal") {
                        $scope.isPolaNafasTidakNormal = true;
                    } else {
                        $scope.isPolaNafasTidakNormal = false;
                    }
                }
            });

            $scope.isSuaraNafasTidakNormal = false;
            $scope.$watch('item.suaraNapas', function(newValue, oldValue) {
                if (newValue != undefined) {
                    if (newValue.name == "Tidak normal") {
                        $scope.isSuaraNafasTidakNormal = true;
                    } else {
                        $scope.isSuaraNafasTidakNormal = false;
                    }
                }
            });

            $scope.isAlatBantuVentilator = false;
            $scope.$watch('item.alatBantuNafas', function(newValue, oldValue) {
                if (newValue != undefined) {
                    if (newValue.name == "Ventilator") {
                        $scope.isAlatBantuVentilator = true;
                    } else {
                        $scope.isAlatBantuVentilator = false;
                    }
                }
            });

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

            $q.all([ModelItem.getDataDummyGeneric("StatusAdaTidakAda", false),
                ModelItem.getDataDummyGeneric("StatusNormalTidakNormal", false),
                ModelItem.getDataDummyGeneric("DataAlatBantuNafas", false),
                ModelItem.getDataDummyGeneric("StatusRegulerIrreguler", false),
                ModelItem.get("PemeriksaanFisikPernafasan"),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {

                if (data[0].statResponse)
                    $scope.listAdaTidakAda = data[0];

                if (data[1].statResponse)
                    $scope.listNormalTidakNormal = data[1];

                if (data[2].statResponse)
                    $scope.listDataAlatBantuNafas = data[2];

                if (data[3].statResponse) {
                    for (var i = 0; i < data[3].length; i++) {
                        delete data[3].$hashKey;
                    }
                    $scope.listRegulerIrreguler = data[3];
                }

                if (data[4].statResponse)
                    $scope.item = data[4];

                if (data[5].statResponse) {
                    $rootScope.currentPasien = data[5].data.data;
                    $scope.pasien = data[5].data.data;
                }

                //ambil data current pasien seusia no cm dan tanggal     
                getDataCurentPasien();
            });

            function getDataCurentPasien() {
                findPasien.getPernafasan($state.params.noCM, $state.params.tanggal).then(function(e) {
                    if (e.data.data.PapPernapasan[0] != undefined) {
                        $scope.item.PapPernapasan = e.data.data.PapPernapasan[0];
                        /*if ($scope.item.keluhanUtama !== undefined)
                            $scope.editMode = true;*/
                        $scope.item.noRec = $scope.item.PapPernapasan.noRec;

                        $scope.item.irama = ModelItem.convertObjectLoadData($scope.listRegulerIrreguler, $scope.item.PapPernapasan.irama.id);
                        $scope.item.retraksiDada = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapPernapasan.retraksiDada.id);
                        $scope.item.bentukDada = ModelItem.convertObjectLoadData($scope.listNormalTidakNormal, $scope.item.PapPernapasan.bentukDada.id);
                        $scope.item.polaNapas = ModelItem.convertObjectLoadData($scope.listNormalTidakNormal, $scope.item.PapPernapasan.polaNapas.id);
                        $scope.item.suaraNapas = ModelItem.convertObjectLoadData($scope.listNormalTidakNormal, $scope.item.PapPernapasan.suaraNapas.id);
                        $scope.item.nafasKupingHidung = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapPernapasan.nafasKupingHidung.id);
                        $scope.item.sianosis = ModelItem.convertObjectLoadData($scope.listAdaTidakAda, $scope.item.PapPernapasan.sianosis.id);
                        $scope.item.alatBantuNafas = ModelItem.convertObjectLoadData($scope.listDataAlatBantuNafas, $scope.item.PapPernapasan.alatBantuNafas.id);
                        $scope.item.isNormal = $scope.item.PapPernapasan.isNormal;

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
            };

            $scope.Save = function() {

                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.savePernafasan(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {

                    $scope.kajianAwal.pernafasan = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.isNext = true;
                    // $state.go('dashboardpasien.Sirkulasi', {
                    //     noCM: $scope.noCM,
                    //     tanggal: $state.params.TglRegistrasi,
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