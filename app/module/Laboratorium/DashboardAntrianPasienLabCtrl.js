define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardAntrianPasienLabCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper) {
            let intervalTime = 5 * 1000;
            let paramTgl = {};
            let tglAwal = new Date();
            let tglAkhir = new Date();
            // $scope.dataPasienAntrian = [];

            function filterDuplicateData(data, key) {
                return [...new Map(data.map(x => [key(x), x])).values()]
            }

            let init = () => {
                tglAwal = dateHelper.formatDate(tglAwal.setHours(0, 0, 0, 0), "YYYY-MM-DD HH:mm:ss");
                tglAkhir = dateHelper.formatDate(tglAkhir.setHours(23, 59, 0, 0), "YYYY-MM-DD HH:mm:ss");
                manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-dashboard?tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir).then(res => {
                    let dataFiltered = filterDuplicateData(res.data.dataPasienOrder, it => it.noRegistrasi);
                    $scope.dataPasienAntrian = dataFiltered;
                    console.log(dataFiltered);
                    
                })
                // setInterval(() => {
                //     init();
                // }, intervalTime)
                // manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-daftar-order-lab?isNotVerif=true&jmlRow=10").then(res => {
                //     $scope.dataPasienAntrian = res.data.data
                // })
            }
            init();

        }
    ]);
});