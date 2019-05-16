define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DashboardApotekCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        'FindPasienApotek', 'DateHelper', '$interval',

        function($rootScope, $scope, ModelItem, $state, findPasienApotek, dateHelper, $interval) {
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
                $state.go('Apotek');
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
                    $state.go('Apotek');
                } else {
                    $scope.bind();
                }

            }
            $scope.bind = function() {
                var i = $scope.state;
                if (i === 1) {
                    window.titleBar = 'Daftar Pasien';
                    $state.go('Apotek.Queue', {
                        title: window.titleBar,
                        state: $scope.state
                    });
                } else if (i === 2) {
                    window.titleBar = 'Menunggu Persiapan';
                    $state.go('Apotek.Sample', {
                        title: window.titleBar,
                        state: $scope.state
                    });
                } else if (i === 3) {
                    window.titleBar = 'Menunggu Periksa';
                    $state.go('Apotek.Result', {
                        title: window.titleBar,
                        state: $scope.state
                    });
                } else if (i === 4) {
                    window.titleBar = 'Tersedia Hasil';
                    $state.go('Apotek.Take', {
                        title: window.titleBar,
                        state: $scope.state
                    });
                }

            }
            $scope.navigateQueue = function() {

                window.titleBar = 'Daftar Pasien';
                $scope.state = 1;
                $state.go('Apotek.Queue', {
                    title: window.titleBar
                });

            }
            $scope.navigatePersiapan = function() {
                window.titleBar = 'Menunggu Persiapan';
                $scope.state = 2;
                $state.go('Apotek.Sample', {
                    title: window.titleBar
                });
            }
            $scope.navigatePeriksa = function() {
                window.titleBar = 'Menunggu Periksa';
                $scope.state = 3;
                $state.go('Apotek.Result', {
                    title: window.titleBar
                });
            }
            $scope.navigateHasil = function() {
                window.titleBar = 'Tersedia Hasil';
                $scope.state = 4;
                $state.go('Apotek.Take', {
                    title: window.titleBar
                });
            }

            $scope.refresh = function() {
                
                findPasienApotek.getListPatient2('', dateHelper.formatDate(new Date(), 'YYYY-MM-DD 00:00:00'), dateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'), $scope.noCm, ModelItem.getPegawai()).then(function(e) {
                    var data = e.data.data;
                    $scope.isLoading = false;
                    var count = _.filter(data, function(e) {
                        return e.statusAntrian === 'MENUNGGU';
                    });

                    var item = _.max(count, function(e) {
                        return e.noAntrian;
                    });
                    if (item === -Infinity)
                        item = { noAntrian: 0 }
                    $scope.sumQueue = formatNumber(item.noAntrian, 3);

                    count = _.filter(data, function(e) {
                        return e.statusAntrian === 'SAMPLE_DI_TERIMA';
                    });

                    item = _.max(count, function(e) {
                        return e.noAntrian;
                    });
                    if (item === -Infinity)
                        item = { noAntrian: 0 }
                    $scope.sumQueueSample = formatNumber(item.noAntrian, 3);

                    count = _.filter(data, function(e) {
                        return e.statusAntrian === 'PERIKSA';
                    });

                    item = _.max(count, function(e) {
                        return e.noAntrian;
                    });
                    if (item === -Infinity)
                        item = { noAntrian: 0 }
                    $scope.sumDoneSample = formatNumber(item.noAntrian, 3);

                    count = _.filter(data, function(e) {
                        return e.statusAntrian === 'VALIDASI_ANALIS';
                    });

                    item = _.max(count, function(e) {
                        return e.noAntrian;
                    });

                    if (item === -Infinity)
                        item = { noAntrian: 0 }
                    $scope.sumDonePemeriksaan = formatNumber(item.noAntrian, 3);

                    count = _.filter(data, function(e) {
                        return e.statusAntrian === 'STATUS_CETAK';
                    });

                    item = _.max(count, function(e) {
                        return e.noAntrian;
                    });
                    if (item === -Infinity)
                        item = { noAntrian: 0 }
                    $scope.sumDoneTake = formatNumber(item.noAntrian, 3);
                    $scope.isLoading = false;
                });
                // findPasienApotek.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'queue').then(function(data) {
                //     debugger;
                //     $scope.sumQueue = data.data.type;
                // });
                // findPasienApotek.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'doneSample').then(function(data) {
                //     $scope.sumDoneSample = data.data.type;
                // });
                // findPasienApotek.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'queueSample').then(function(data) {
                //     $scope.sumQueueSample = data.data.type;
                // });
                // findPasienApotek.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'donePemeriksaan').then(function(data) {
                //     $scope.sumDonePemeriksaan = data.data.type;
                // });
                // findPasienApotek.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'queuePemeriksaan').then(function(data) {
                //     $scope.sumQueuePemeriksaan = data.data.type;
                // });
                // findPasienApotek.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'doneTake').then(function(data) {
                //     $scope.sumDoneTake = data.data.type;
                // });
                // findPasienApotek.getQueuePatien(dateHelper.formatDate($scope.now, 'DD-MM-YYYY'), 'queueTake').then(function(data) {
                //     $scope.sumQueueTake = data.data.type;
                // });
            }
            
            function formatNumber(angka, panjang) {
                if (angka == null) {
                    return "";
                }
                if (panjang < 1) {
                    return angka;
                }
                var nol = "";
                var finalLength = panjang - angka.length;
                for (var i = 0; i < finalLength; i++) {
                    nol += "0";
                }
                return nol + angka;
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


    ]);
});