define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('MenuMonitoringCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'FindPasien', 'DateHelper', 'ManageServicePhp', 'ModelItemAkuntansi',
        function ($rootScope, $scope, $state, ModelItem, findPasien, DateHelper, manageServicePhp, modelItemAkuntansi) {
            $scope.now = new Date();
            $scope.nav = function (state) {
                // debugger;
                $scope.currentState = state;
                $state.go(state, $state.params);
                console.log($scope.currentState);
            }
            $scope.histori = {}
            $scope.kunjungan = {};
            $scope.klaim = {};
            $scope.raharja={}
            $scope.clear = function () {
              
                $scope.isRouteLoading = false;
                $scope.klaim = {
                    tglSep: $scope.now
                };
                $scope.histori = {
                    tglAwal: $scope.now,
                    tglAkhir: $scope.now
                }
                $scope.raharja = {
                    tglAwal: $scope.now,
                    tglAkhir: $scope.now
                }
                $scope.kunjungan = {
                    tglSep :$scope.now
                };

            };
            $scope.isShowPembuatanSep = false;
            $scope.isShowPotensi = true;
            $scope.isShowApproval = false;
            $scope.isShowTglPulang = false;
            $scope.isShowIntegrasi = false;
            $scope.showPembuatanSep = function () {
                $scope.isShowPembuatanSep = !$scope.isShowPembuatanSep;
            }
            $scope.showPotensi = function () {
                $scope.isShowPotensi = !$scope.isShowPotensi;
            }
            $scope.showApproval = function () {
                $scope.isShowApproval = !$scope.isShowApproval;
            }
            $scope.showTglPulang = function () {
                $scope.isShowTglPulang = !$scope.isShowTglPulang;
            }
            $scope.showIntegrasi = function () {
                $scope.isShowIntegrasi = !$scope.isShowIntegrasi;
            }
            $scope.clear();
            $scope.jenisPelayananKunjungan = [{
                "id": 1, "nama": "Rawat Inap   "
            }, {
                "id": 2, "nama": "Rawat Jalan   "
            }];
            // ***

            $scope.findKunjungan = function (data) {
                $scope.isRouteLoading = true;
                var data = {
                    jenispelayanan: data.jenisPel,
                    tglsep: new moment(data.tglSep).format('YYYY-MM-DD')
                }
                manageServicePhp.getDataTableTransaksi("bpjs/get-monitoring-kunjungan?tglsep="
                    + data.tglsep
                    + "&jenispelayanan="
                    + data.jenispelayanan
                ).then(function (e) {
                    document.getElementById("jsonKunjungan").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }

            // KLAIM
            $scope.jenisPelayananKlaim = [{
                "id": 1, "nama": "Rawat Inap     "
            }, {
                "id": 2, "nama": "Rawat Jalan      "
            }];

            $scope.listStatusKlaim = [{
                "id": 3, "statusklaim": "Proses Verifikasi", "value": 1
            }, {
                "id": 4, "statusklaim": "Pending Verifikasi", "value": 2
            }, {
                "id": 5, "statusklaim": "Klaim", "value": 3
            }];


            $scope.findKlaim = function (data) {
                $scope.isRouteLoading = true;
                var data = {
                    jenispelayanan: data.jenisPel,
                    status: data.statusKlaim.value,
                    tglsep: new moment(data.tglSep).format('YYYY-MM-DD')
                }
                manageServicePhp.getDataTableTransaksi("bpjs/get-monitoring-klaim?tglsep="
                    + data.tglsep
                    + "&jenispelayanan="
                    + data.jenispelayanan
                    + "&status="
                    + data.status
                ).then(function (e) {
                    document.getElementById("jsonKlaim").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
            // END KLAIM

            // HISTROI
            $scope.findHistori = function (data) {
                $scope.isRouteLoading = true;

                manageServicePhp.getDataTableTransaksi("bpjs/get-monitoring-historipelayanan-peserta?noKartu="
                    + data.noKartu
                    + "&tglMulai="
                    + moment(data.tglAwal).format('YYYY-MMDD')
                    + "&tglAkhir="
                    + moment(data.tglAkhir).format('YYYY-MMDD')
                ).then(function (e) {
                    document.getElementById("jsonHistori").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
            // RAHARJA

             // HISTROI
             $scope.findRaharja = function (data) {
                $scope.isRouteLoading = true;

                manageServicePhp.getDataTableTransaksi("bpjs/get-monitoring-klaim-jasaraharja?tglMulai="
                    + moment(data.tglAwal).format('YYYY-MMDD')
                    + "&tglAkhir="
                    + moment(data.tglAkhir).format('YYYY-MMDD')
                ).then(function (e) {
                    document.getElementById("jsonRaharja").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});