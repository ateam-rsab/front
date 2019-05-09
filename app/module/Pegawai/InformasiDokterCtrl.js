define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InformasiDokterCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'FindPegawai',
        function($rootScope, $scope, ModelItem, $state, findPasien, findPegawai) {
            $scope.now = new Date();
            $scope.item = {};
            ModelItem.getDataDummyGeneric("Ruangan", true, undefined, 10).then(function(data) {
                $scope.ruangans = data;
            });

            ModelItem.getDataDummyGeneric("JamPraktek", true, undefined, 10).then(function(data) {
                $scope.jamPrakteks = data;
            });
            $scope.$watch('item.tanggalJadwal', function(e) {
                if (e === undefined) return;
                $scope.refresh();
            })
            $scope.$watch('item.ruangan', function(e) {
                if (e === undefined) return;
                $scope.refresh();
            })
            $rootScope.isOpen = true;
            $scope.refresh = function() {
                if ($scope.item.tanggalJadwal !== undefined && $scope.item.ruangan !== undefined) {
                    var data = findPegawai.getDokterRawatJalan($scope.item.tanggalJadwal, $scope.item.ruangan);
                    data.fetch(function() {
                        $scope.listData = this._data;
                        $scope.$apply();
                    });
                }
            };

            $scope.item = {};
            $scope.item.ruangan = {
                id: 1
            };
            $scope.item.tanggalJadwal = new Date(2016, 5, 16);

            $scope.listTime = [{
                name: "Pagi"
            }, {
                name: "Siang"
            }, {
                name: "Sore"
            }]

            $scope.listDokterSenen = [{
                waktu: "Pagi",
                children: [{
                    index: 0,
                    children: [{
                        namaDokter: "Prof. Dr. dr. Teguh Santoso, M.D., Sp.PD-KKV, Sp.JP, Ph.D., FACC, FESC"
                    }, {
                        namaDokter: "Dokter B"
                    }, {
                        namaDokter: "Dokter C"
                    }, {
                        namaDokter: "Dokter D"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter E"
                    }]
                }]
            }, {
                waktu: "Siang",
                children: [{
                    index: 0,
                    children: [{
                        namaDokter: "Dokter A"
                    }, {
                        namaDokter: "Dokter B"
                    }, {
                        namaDokter: "Dokter C"
                    }, {
                        namaDokter: "Dokter D"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter A"
                    }, {
                        namaDokter: "Dokter B"
                    }, {
                        namaDokter: "Dokter C"
                    }, {
                        namaDokter: "Dokter D"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter E"
                    }]
                }, {
                    index: 1,
                    children: [{
                        namaDokter: "Dokter A"
                    }, {
                        namaDokter: "Dokter B"
                    }, {
                        namaDokter: "Dokter C"
                    }, {
                        namaDokter: "Dokter D"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter E"
                    }]
                }]
            }, {
                waktu: "Sore",
                children: [{
                    index: 0,
                    children: [{
                        namaDokter: "Dokter A"
                    }, {
                        namaDokter: "Dokter B"
                    }, {
                        namaDokter: "Dokter C"
                    }, {
                        namaDokter: "Dokter D"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter E"
                    }]
                }, {
                    index: 1,
                    children: [{
                        namaDokter: "Dokter A"
                    }, {
                        namaDokter: "Dokter B"
                    }, {
                        namaDokter: "Dokter C"
                    }, {
                        namaDokter: "Dokter D"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter E"
                    }, {
                        namaDokter: "Dokter E"
                    }]
                }]
            }]

        }
    ]);
});