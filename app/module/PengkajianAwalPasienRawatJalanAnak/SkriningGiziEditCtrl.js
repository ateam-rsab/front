define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningGiziEditCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
            var isNotClick = true;
            $scope.now = new Date();
            ModelItem.setActiveMenu($rootScope.listActive, "SkriningGizi");

            $scope.item = {};
            ModelItem.get("SkriningGizi").then(function(data) {
                $scope.item = data;
                $scope.item.noRec = "";
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});

            $scope.tempListSkriningGizi = [];
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};
            findPasien.getByNoCM($scope.noCM).then(function(data) {
                $rootScope.currentPasien = data.data.data;
                $scope.pasien = data.data.data;
            });


            $q.all([ModelItem.getDataDummyGeneric("DataPertanyaanSkriningGizi", false),
                ModelItem.getDataDummyGeneric("StatusYaTidak", false),
                ModelItem.getDataDummyGeneric("DataPenyakit", false),
            ]).then(function(data) {

                if (data[0].statResponse) {
                    /*$scope.listPertanyaanSkriningGizi = data[0];
                    $scope.tempListSkriningGizi = [];*/
                    $scope.listPertanyaanSkriningGizi = _.filter(data[0], function(e) {
                        return e.kategori === '1';
                    });

                    $scope.tempListSkriningGizi = [];
                    for (var i = 0; i < $scope.listPertanyaanSkriningGizi.length; i++) {
                        var objSkrining = {
                            "id": $scope.listPertanyaanSkriningGizi[i].id
                        }

                        var obj = {
                            "nilai": "0",
                            "skriningGizi": objSkrining,
                            "noRec": "",
                            "yaTidak": {
                                "id": 1
                            }
                        }
                        $scope.tempListSkriningGizi.push(obj);

                    }
                }
                if (data[1].statResponse) { $scope.listStatusYaTidak = data[1]; }

                if (data[2].statResponse) { $scope.listDaftarPenyakit = data[2]; }
                getDataCurentPasien();
            });

            $scope.cekTotalSkor = function(data, stat) {
                isNotClick = false;
                var skor = 0;

                for (var i = 0; i < $scope.listPertanyaanSkriningGizi.length; i++) {
                    if ($scope.listPertanyaanSkriningGizi[i].stat.name == "Ya") {
                        skor += $scope.listPertanyaanSkriningGizi[i].nilai;

                    }
                }

                $scope.item.TotalSkor = skor;
                /*if (skor >=4){
                 alert('score gizi di atas 4')
                 }*/

                var currentData = _.find($scope.tempListSkriningGizi, function(arr) { return arr.skriningGizi.id == data.id; });
                var indexArray = _.indexOf($scope.tempListSkriningGizi, currentData);

                var objYaTidak = {
                    "id": stat.id
                }

                $scope.tempListSkriningGizi[indexArray].yaTidak = objYaTidak;
                if (stat.name == "Ya") {
                    for (var i = 0; i < $scope.listPertanyaanSkriningGizi.length; i++) {
                        if ($scope.tempListSkriningGizi[indexArray].skriningGizi.id == $scope.listPertanyaanSkriningGizi[i].id) {
                            $scope.tempListSkriningGizi[indexArray].nilai = $scope.listPertanyaanSkriningGizi[i].nilai;
                        }
                    }
                } else {
                    $scope.tempListSkriningGizi[indexArray].nilai = "0";
                }

            }


            function getDataCurentPasien() {
                findPasien.getSkriningGizi($state.params.noRec, $state.params.tanggal).then(function(e) {

                    if (e.data.data.PapSkriningGizi[0] != undefined) {
                        $scope.item.PapSkriningGizi = e.data.data.PapSkriningGizi[0];
                        /*if ($scope.item.keluhanUtama !== undefined)
                         $scope.editMode = true;*/
                        $scope.item.noRec = $scope.item.PapSkriningGizi.noRec;
                        $scope.item.beratBadan = $scope.item.PapSkriningGizi.beratBadan;
                        $scope.item.lingkarKepala = $scope.item.PapSkriningGizi.lingkarKepala;
                        $scope.item.tinggiBadan = $scope.item.PapSkriningGizi.tinggiBadan;
                        $scope.item.TotalSkor = $scope.item.PapSkriningGizi.totalSkor;
                        var tglConvert = $scope.item.PapSkriningGizi.tglInputData;
                        $scope.item.tglinput = dateHelper.formatDate(tglConvert, 'YYYY-MM-DD HH:mm:ss')
                        var giziDetailSet = $scope.item.PapSkriningGizi.papSkriningGiziDetailSet;
                        for (var i = 0; i < giziDetailSet.length; i++) {
                            for (var j = 0; j < $scope.listPertanyaanSkriningGizi.length; j++) {
                                if ($scope.listPertanyaanSkriningGizi[j].id == giziDetailSet[i].skriningGizi.id) {
                                    $scope.listPertanyaanSkriningGizi[j].noRec = giziDetailSet[i].noRec;
                                    $scope.listPertanyaanSkriningGizi[j].stat = ModelItem.convertObjectLoadData($scope.listStatusYaTidak, giziDetailSet[i].yaTidak.id);
                                }
                            }
                        }

                        for (var k = 0; k < $scope.listPertanyaanSkriningGizi.length; k++) {
                            for (var l = 0; l < $scope.tempListSkriningGizi.length; l++) {
                                if ($scope.listPertanyaanSkriningGizi[k].id == $scope.tempListSkriningGizi[l].skriningGizi.id) {
                                    if ($scope.listPertanyaanSkriningGizi[k].stat.name == "Ya") {
                                        $scope.tempListSkriningGizi[l].nilai = $scope.listPertanyaanSkriningGizi[k].nilai;
                                    } else {
                                        $scope.tempListSkriningGizi[l].nilai = 1;
                                    }
                                }
                            }
                        }
                        if (!$scope.$$phase)
                            $scope.$apply();
                    }
                });
            };

            $scope.Save = function() {
                for (var i = 0; i < $scope.listPertanyaanSkriningGizi.length; i++) {
                    for (var j = 0; j < $scope.tempListSkriningGizi.length; j++) {
                        if ($scope.tempListSkriningGizi[j].skriningGizi.id == $scope.listPertanyaanSkriningGizi[i].id) {
                            if ($scope.item.PapSkriningGizi == undefined) {
                                $scope.tempListSkriningGizi[j].noRec = "";
                            } else {
                                $scope.tempListSkriningGizi[j].noRec = $scope.listPertanyaanSkriningGizi[i].noRec;
                            }

                            $scope.tempListSkriningGizi[j].yaTidak = $scope.listPertanyaanSkriningGizi[i].stat;
                        }
                    }
                }

                var totalscore = $scope.item.TotalSkor
                $scope.item.papSkriningGiziDetailSet = $scope.tempListSkriningGizi;
                $scope.pasienku = { noRec: $state.params.noRec }
                $scope.pasienpap = { noRec: $scope.item.PapSkriningGizi.noRec }
                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.saveSkriningGiziEdit($scope.pasienpap, $scope.pasienku, totalscore, ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {

                    $scope.kajianAwal.skriningGizi = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);

                    /*$route.reload('MonitorSkorGizi', {reload: true});*/
                    $state.go('MonitorSkorGizi')
                });
            };


        }
    ]);
});