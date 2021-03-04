define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardAntrianPasienLabCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper) {
            let intervalTime = 1 * 1000;
            let paramTgl = {};
            
            // $scope.dataPasienAntrian = [];

            function filterDuplicateData(data, key) {
                return [...new Map(data.map(x => [key(x), x])).values()]
            }

            let init = () => {
                let tglAwal = dateHelper.formatDate(new Date().setHours(0, 0, 0, 0), "YYYY-MM-DD HH:mm:ss");
                let tglAkhir = dateHelper.formatDate(new Date().setHours(23, 59, 0, 0), "YYYY-MM-DD HH:mm:ss");
                manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-dashboard?tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir).then(res => {
                    let dataFiltered = filterDuplicateData(res.data.dataPasienOrder, it => it.noRegistrasi);
                    $scope.dataPasienAntrian = dataFiltered;
                })
                setTimeout(() => {
                    init();
                }, intervalTime)
            }
            init();

        }
    ]);
});