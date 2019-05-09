define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PersepsiPasienCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
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

            $q.all([ModelItem.getDataDummyGeneric("StatusKesehatan", false),
                ModelItem.getDataDummyGeneric("StatusPenyebabPenyakit", false),
                ModelItem.getDataDummyGeneric("StatusYangDilakukan", false),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {
                debugger;
                if (data[0].statResponse)
                    $scope.listStatusKesehatan= data[0];

                if (data[1].statResponse)
                    $scope.listStatusPenyebabPenyakit = data[1];

                if (data[2].statResponse)
                    $scope.listStatusYangDilakukan = data[2];

                if (data[3].statResponse) {
                    $rootScope.currentPasien = data[3].data.data;
                    $scope.pasien = data[2].data.data;
                }
                getDataCurentPasien();
            });

            $scope.Save = function() {
                var pasienDaftar = {noRec : $state.params.noRec}
                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.savePersepsiPasien(pasienDaftar,ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {

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