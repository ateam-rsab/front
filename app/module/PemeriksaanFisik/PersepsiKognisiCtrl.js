define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PersepsiKognisiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
            debugger;
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Genetalia";

            $scope.dataVOloaded = true;
            $scope.isShowForm = false;
            $scope.isAdaGangguan = false;

            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = false;

            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};

            $q.all([ModelItem.getDataDummyGeneric("StatusYaTidak", false),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {
                debugger;
                if (data[0].statResponse)
                    $scope.listStatusYaTidak = data[0];

                if (data[1].statResponse) {
                    $rootScope.currentPasien = data[1].data.data;
                    $scope.pasien = data[2].data.data;
                }
                getDataCurentPasien();
            });

            /*function getDataCurentPasien() {
                debugger;
                findPasien.getKognisi($state.params.noRec, $state.params.tanggal).then(function(e) {

                    if (e.data.data.PersepsiKognisi[0] != undefined) {

                        $scope.item.PersepsiKognisi = e.data.data.PersepsiKognisi[0];
                        $scope.item.noRec = $scope.item.PersepsiKognisi.noRec;

                        //isi data dari database ke model form
                        $scope.item.TanyaPengelihatan = $scope.item.PersepsiKognisi.penglihatan;
                        $scope.item.TanyaPendengaran = $scope.item.PersepsiKognisi.pendengaran;
                        $scope.item.TanyaDayaIngat = $scope.item.PersepsiKognisi.dayaIngat;

                        if ($scope.item.isNormal) {
                            $scope.warna.normal = "#05b72a";
                            $scope.warna.tidakNormal = "#718876";
                        } else {
                            $scope.warna.normal = "#718876";
                            $scope.warna.tidakNormal = "#05b72a";
                        }
                    }
                });
            };*/

            function getDataCurentPasien() {
                debugger;
                findPasien.getKognisi($state.params.noRec).then(function(e) {
                    if (e.data.data.PersepsiKognisi[0] != undefined) {
                        $scope.item.PersepsiKognisi = e.data.data.PersepsiKognisi[0];
                        $scope.item.noRec = $scope.item.PersepsiKognisi.noRec;

                        $scope.item.TanyaPengelihatan = $scope.item.PersepsiKognisi.penglihatan;
                        $scope.item.TanyaPendengaran = $scope.item.PersepsiKognisi.pendengaran;
                        $scope.item.TanyaDayaIngat = $scope.item.PersepsiKognisi.dayaIngat;

                    }
                });
            };

            $scope.Save = function() {
                debugger;
                var pasienDaftar = {noRec : $state.params.noRec}
                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.SavePersepsiKognisi(pasienDaftar,ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {

                    $scope.kajianAwal.genetalia = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.isNext = true;
                });
            };
            $scope.Next = function() {
                $rootScope.nextDetail();
            }


        }
    ]);
});