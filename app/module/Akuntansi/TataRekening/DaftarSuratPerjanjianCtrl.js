define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarSuratPerjanjianCtrl', ['$rootScope', '$scope', 'DateHelper', '$state', 'ReportHelper', 'MnKeu',
        function($rootScope, $scope, dateHelper, $state, reportHelper, mnKeu) {
            $scope.item = {};
            $scope.dataSuratSelected = {};
            $scope.now = new Date();

            function showButton() {
                $scope.showBtnDetail = false;
                $scope.showBtnCetak = true;
                $scope.showBtnVerifikasi = false;
                $scope.showBtnUbahJenis = false;
                $scope.showBtnUnVerifikasi = false;
            }
            showButton();

            function init() {

                mnKeu.getUrlData('penanggung-jawab-pasien/').then(function(dat) {
                    $scope.listDataMaster = dat.data.data;
                    $scope.dataSuratPerjanjian = new kendo.data.DataSource({
                        data: $scope.listDataMaster,
                        pageSize: 10
                    });
                });


            };
            init();
            $scope.Cetak = function() {
                if ($scope.dataSuratSelected.noRegistrasi != undefined) {
                    var fixUrlLaporan = reportHelper.open("reporting/lapSuratPernyataan?noRegistrasi=" + $scope.dataSuratSelected.noRegistrasi);
                    window.open(fixUrlLaporan, '_blank');
                } else {
                    toastr.error('Pilih Data Terlebih Dulu');
                }
            };
            $scope.cariData = function() {
                var tanggalRegistrasiAwal;
                var tanggalRegistrasiAkhir;
                if ($scope.item.namaPasien == undefined) {
                    $scope.item.namaPasien = '';
                }
                if ($scope.item.noReg == undefined) {
                    $scope.item.noReg = '';
                }
                if ($scope.item.tanggalRegistrasiAwal == undefined) {
                    tanggalRegistrasiAwal = '';
                } else {
                    tanggalRegistrasiAwal = dateHelper.formatDate($scope.item.tanggalRegistrasiAwal, "YYYY-MM-DD");
                }
                if ($scope.item.tanggalRegistrasiAkhir == undefined) {
                    tanggalRegistrasiAkhir = '';
                } else {
                    tanggalRegistrasiAkhir = dateHelper.formatDate($scope.item.tanggalRegistrasiAkhir, "YYYY-MM-DD");
                }
                var namaPasien = $scope.item.namaPasien;
                var noRegistrasi = $scope.item.noReg;
                mnKeu.getUrlData('penanggung-jawab-pasien?namaPasien=' + namaPasien + '&noRegistrasi=' + noRegistrasi + '&dariTglPernyataan=' + tanggalRegistrasiAwal + '&sampaiTglPernyataan=' + tanggalRegistrasiAkhir).then(function(dat) {
                    $scope.listDataMaster = dat.data.data;
                    $scope.dataSuratPerjanjian = new kendo.data.DataSource({
                        data: $scope.listDataMaster,
                        pageSize: 10
                    });
                });
            };
            $scope.batalPencarian = function() {
                $scope.item = {};
                $scope.item = {
                    tanggalRegistrasiAwal: $scope.now,
                    tanggalRegistrasiAkhir: $scope.now
                };
                init();
            };

            $scope.formatTanggal = function(value) {
                var value = value;
                if (value == "null") {
                    return '';
                } else {
                    return dateHelper.formatDate(value, "YYYY-MM-DD");
                }
            };

            $scope.columnSuratPerjanjian = [{
                "field": "noCm",
                "title": "No CM"
            }, {
                "field": "noRegistrasi",
                "title": "No Registrasi"
            }, {
                "field": "namaPasien",
                "title": "Nama Pasien"
            }, {
                "field": "penanggungJawab",
                "title": "Nama Penanggung Jawab"
            }, {
                "field": "hubunganKeluarga",
                "title": "Hubungan"
            }, {
                "field": "tglPernyataan",
                "title": "Tanggal Surat",
                "template": "<span class='style-left'>{{formatTanggal('#: tglPernyataan #')}}</span>"
            }];

        }
    ])
});
