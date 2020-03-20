define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarKonsultasiKosongCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog) {

            $scope.dataVOloaded = true;
            $scope.item = {};

            var initDaftarKonsul = function () {
                $scope.gridDaftarKonsul = {
                    toolbar: ["excel"],
                    excel: {
                        allPages: true,
                        fileName: "RSAB HK Export Daftar Konsultasi Kosong - " + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') +".xlsx"
                    },
                    excelExport: function (e) {
                        var sheet = e.workbook.sheets[0];
                        sheet.frozenRows = 2;
                        sheet.mergedCells = ["A1:I1"];
                        sheet.name = dateHelper.formatDate($scope.item.tglAwal, 'DD MMM YYYY') + " - " + dateHelper.formatDate($scope.item.tglAkhir, 'DD MMM YYYY');
                        var myHeaders = [{
                            value: "Daftar Konsultasi Kosong Periode " + dateHelper.formatDate($scope.item.tglAwal, 'DD MMM YYYY') + " - " + dateHelper.formatDate($scope.item.tglAkhir, 'DD MMM YYYY'),
                            fontSize: 14,
                            textAlign: "center",
                            background: "#ffffff",
                        }];
                        sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 30 });
                    },
                    pageable: true,
                    columns: [
                        {
                            field: "namaRuangan",
                            title: "Ruangan", width: "150px"
                        },
                        {
                            field: "tglPelayanan",
                            title: "Tanggal Pelayanan", width: "150px"

                        },
                        {
                            field: "dokterPenanggungJawab",
                            title: "Dokter Penanggung Jawab", width: "150px"
                        },
                        {
                            field: "pegawaiTindakan",
                            title: "Pegawai Tindakan", width: "150px"
                        },
                        {
                            field: "namaProduk",
                            title: "Tindakan", width: "150px"
                        },
                        {
                            field: "hargaJual",
                            title: "Tarif", width: "100px"
                        },
                        {
                            field: "noRegistrasi",
                            title: "No Registrasi", width: "100px"
                        },
                        {
                            field: "namaPasien",
                            title: "Nama Pasien", width: "150px"
                        },
                        {
                            field: "namaRekanan",
                            title: "Penjamin", width: "150px"
                        }
                    ]
                };
            };

            $scope.loadDataGridKonsul = function () {
                $scope.isRouteLoading = true;

                ManageSdmNew.getListData("konsultasi/get-konsultasi-kosong?tglAwal=" + dateHelper.formatDate($scope.item.tglAwal, 'YYYY-MM-DD HH:mm') + "&tglAkhir=" + dateHelper.formatDate($scope.item.tglAkhir, 'YYYY-MM-DD HH:mm')).then(function (data) {
                    $scope.dataSourceKonsul = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 10,
                        sort: [
                            { field: "namaRuangan", dir: "asc" },
                            { field: "tglPelayanan", dir: "asc" },
                            { field: "dokterPenanggungJawab", dir: "asc" },
                            { field: "namaProduk", dir: "asc" },
                            { field: "namaPasien", dir: "asc" }
                        ]
                    });
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.LoadData = function () {
                $scope.loadDataGridKonsul();
                initDaftarKonsul();
            }

            $scope.init = function () {
                $scope.date = new Date();
                var tanggals = dateHelper.getDateTimeFormatted3($scope.date);
                $scope.item.tglAwal = tanggals + " 00:00";
                $scope.item.tglAkhir = tanggals + " 23:59";

                initDaftarKonsul();

                $scope.isRouteLoading = false;
            };

            $scope.init();
        }
    ]);
});
