define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KopingCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
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

            $q.all([ModelItem.getDataDummyGeneric("StatusPenangananStress", false),
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {
                debugger;
                if (data[0].statResponse)
                    $scope.listStatusKoping = data[0];

                if (data[1].statResponse) {
                    $rootScope.currentPasien = data[2].data.data;
                    $scope.pasien = data[2].data.data;
                }
                getDataCurentPasien();
            });
            $scope.Save = function() {
                var pasienDaftar = {noRec : $state.params.noRec}
                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.saveKoping(pasienDaftar,ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {

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