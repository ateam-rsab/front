define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardGiziCtrl', ['ManageGizi', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasienGizi', 'DateHelper', '$interval', 'FindPasienGizi',

        function(manageGizi, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper, $interval, findPasienGizi) {
            $scope.sumQueue = "-";
            $scope.sumDoneSample = "-";
            $scope.sumQueueSample = "-";
            $scope.sumDonePemeriksaan = "-";
            $scope.sumQueuePemeriksaan = "-";
            $scope.sumDoneTake = "-";
            $scope.sumQueueTake = "-";
            $scope.now = new Date();
            $interval(function() {
                $scope.now = new Date();
            }, 1000);
            $scope.state = 0;
            $scope.$watch('state', function(e) {});
            if ($state.params.title) {
                var index = $state.current.url.replace('/', '').replace('/:title', '');
                $scope.state = parseInt(index);
            }
            $scope.first = function() {
                $scope.state = 0;
                $state.go('Gizi');
            }
            $scope.last = function() {
                $scope.state = 4;
                $scope.bind();
            }
            $scope.next = function() {
                $scope.state = $scope.state + 1;
                if ($scope.state > 4)
                    $scope.state = 4;
                $scope.bind();
            }
            $scope.back = function() {
                $scope.state = $scope.state - 1;
                if ($scope.state === 0) {
                    $scope.state = 0;
                    $state.go('Gizi');
                } else {
                    $scope.bind();
                }

            }
            $scope.bind = function() {
                var i = $scope.state;
                if (i === 1) {
                    window.titleBar = 'Daftar Pasien';
                    $state.go('Gizi.Queue', {
                        title: window.titleBar,
                        state: $scope.state
                    });
                } else if (i === 2) {
                    window.titleBar = 'Menunggu Persiapan';
                    $state.go('Gizi.Sample', {
                        title: window.titleBar,
                        state: $scope.state
                    });
                } else if (i === 3) {
                    window.titleBar = 'Menunggu Periksa';
                    $state.go('Gizi.Result', {
                        title: window.titleBar,
                        state: $scope.state
                    });
                } else if (i === 4) {
                    window.titleBar = 'Tersedia Hasil';
                    $state.go('Gizi.Take', {
                        title: window.titleBar,
                        state: $scope.state
                    });
                }

            }
            $scope.navigateQueue = function() {

                window.titleBar = 'Daftar Pasien';
                $scope.state = 1;
                $state.go('Gizi.Queue', {
                    title: window.titleBar
                });

            }
            $scope.navigatePersiapan = function() {
                window.titleBar = 'Menunggu Persiapan';
                $scope.state = 2;
                $state.go('Gizi.Sample', {
                    title: window.titleBar
                });
            }
            $scope.navigatePeriksa = function() {
                window.titleBar = 'Menunggu Periksa';
                $scope.state = 3;
                $state.go('Gizi.Result', {
                    title: window.titleBar
                });
            }
            $scope.navigateHasil = function() {
                window.titleBar = 'Tersedia Hasil';
                $scope.state = 4;
                $state.go('Gizi.Take', {
                    title: window.titleBar
                });
            }

            $scope.refresh = function() {
                findPasienGizi.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'queue').then(function(data) {
                    $scope.sumQueue = data.data.type;
                });
                findPasienGizi.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'doneSample').then(function(data) {
                    $scope.sumDoneSample = data.data.type;
                });
                findPasienGizi.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'queueSample').then(function(data) {
                    $scope.sumQueueSample = data.data.type;
                });
                findPasienGizi.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'donePemeriksaan').then(function(data) {
                    $scope.sumDonePemeriksaan = data.data.type;
                });
                findPasienGizi.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'queuePemeriksaan').then(function(data) {
                    $scope.sumQueuePemeriksaan = data.data.type;
                });
                findPasienGizi.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'doneTake').then(function(data) {
                    $scope.sumDoneTake = data.data.type;
                });
                findPasienGizi.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'queueTake').then(function(data) {
                    $scope.sumQueueTake = data.data.type;
                });
            }
            $scope.isToogle = false;
            $scope.showTanggal = function() {
                $scope.isToogle = !$scope.isToogle;
            }
            $scope.$watch('now', function() {
                $scope.isToogle = false;
            })
            $scope.refresh();
        }
    ])
});