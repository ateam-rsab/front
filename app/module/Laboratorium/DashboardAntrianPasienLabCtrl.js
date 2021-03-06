define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardAntrianPasienLabCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper) {
            let intervalTime = 5 * 1000;
            let paramTgl = {};

            // $scope.dataPasienAntrian = [];

            function filterDuplicateData(data, key) {
                return [...new Map(data.map(x => [key(x), x])).values()]
            }

            function dynamicSort(property) {
                var sortOrder = 1;
                if (property[0] === "-") {
                    sortOrder = -1;
                    property = property.substr(1);
                }
                return function (a, b) {
                    /* next line works with strings and numbers, 
                     * and you may want to customize it to your needs
                     */
                    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder;
                }
            }

            let init = () => {
                let tglAwal = dateHelper.formatDate(new Date().setHours(0, 0, 0, 0), "YYYY-MM-DD HH:mm:ss");
                let tglAkhir = dateHelper.formatDate(new Date().setHours(23, 59, 0, 0), "YYYY-MM-DD HH:mm:ss");
                manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-dashboard?tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir).then(res => {
                    let dataFiltered = filterDuplicateData(res.data.dataPasienOrder, it => it.noRegistrasi);
                    let dataSorted = dataFiltered.sort(dynamicSort("tglOrder"));
                    console.log(dataSorted);
                    $scope.dataPasienAntrian = dataSorted;
                })
                setTimeout(() => {
                    init();
                }, intervalTime)
            }
            init();

        }
    ]);
});