define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardRuanganBedahCtrl', ['$q', '$rootScope', '$scope', 'ManageServicePhp', '$state', 'CacheHelper', 'DateHelper', '$window', 'ModelItemAkuntansi',
        function ($q, $rootScope, $scope, ManageServicePhp, $state, cacheHelper, dateHelper, $window, modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataAntrian = [];
            $scope.currentPage = 1;
            $scope.lengthData = 0;
            $scope.isSimpleMode = false;
            let intervalSlide = 1;
            $scope.txtButtonMode = 'Simple Mode';
            $scope.init = function () {
                $scope.isRouteLoading = true;
                // simrs_harkit/service/transaksi/rekam-medis/get-dashboard-jadwal-harian?tgloperasi=2020-02-27
                ManageServicePhp.getDataTableTransaksi("rekam-medis/get-dashboard-jadwal-harian?tgloperasi=" + dateHelper.formatDate(new Date(), 'YYYY-MM-DD'), true).then(function (data) {
                    $scope.dataAntrian = data.data.daftar;
                    console.log(data.data.daftar);
                    $scope.isRouteLoading = false;
                    // $scope.bindSlideShow();
                   
                    $scope.lengthData = data.data.daftar.length ;
                    
                    // }

                    $scope.sildeShow();
                    // $scope.bindSlideShow();
                    
                    
                }, () => {}, () => {
                    
                });
            }
            $scope.init();

            $scope.bindSlideShow = () => {
                for (let i = 0; i < $scope.dataAntrian.length; i++) {
                    $scope.changePage(i + 1);
                }
            }
            // $scope.bindSlideShow();

            $scope.changePage = (page) => {
                console.log(page)
                if (page === $scope.currentPage) return;
                $(`#nr${page}`).addClass('active');
                $(`#nr${$scope.currentPage}`).removeClass('active');
                $(`#r${page}`).show();
                $(`#r${$scope.currentPage}`).hide();

                $scope.currentPage = page
            }

            $scope.sildeShow = () => {
                let temp = 0;
                setInterval(() => {
                    temp += 1;

                    if (temp <= $scope.lengthData) $scope.changePage(temp);
                    else temp = 0;
                    // $scope.sildeShow();
                    // console.log(temp);
                }, intervalSlide * 1000)
                // $scope.changePage()
            }
            

            $scope.changeMode = () => {
                $scope.isSimpleMode = !$scope.isSimpleMode;

                $scope.txtButtonMode = $scope.isSimpleMode ? 'Simple Mode' : 'Slideshow Mode';
            }
        }
    ]);
});
