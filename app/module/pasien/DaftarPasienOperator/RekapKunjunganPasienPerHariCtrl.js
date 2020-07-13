define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapKunjunganPasienPerHariCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper', 'DateHelper', 'ReportService', 'ManageSdmNew',
        function ($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper, dateHelper, ReportService, ManageSdmNew) {
            $scope.item = {};
            $scope.item.periodeAwal = new Date();
            $scope.item.periodeAkhir = new Date();
            $scope.listOfDept = [];
            $scope.listOfRuangan = [];

            $scope.totalPasienBaru = 0;
            $scope.totalPasienLama = 0;
            $scope.subTotal = 0;

            $scope.isRouteLoading = false;

            $scope.getData = () => {
                $scope.totalPasienBaru = 0;
                $scope.totalPasienLama = 0;
                $scope.subTotal = 0;
                $scope.isRouteLoading = true;
                ReportService.getListData("reporting/rekapitulasi-kunjungan-pasien?tglAwal=" + ($scope.item.periodeAwal ? dateHelper.formatDate($scope.item.periodeAwal, "YYYY-MM-DD HH:mm:ss") : "") +
                    "&tglAkhir=" + ($scope.item.periodeAkhir ? dateHelper.formatDate($scope.item.periodeAkhir, "YYYY-MM-DD HH:mm:ss") : "") +
                    "&idDepartemen=" + ($scope.item.dept ? $scope.item.dept.id : "") + "&idRuangan=" + ($scope.item.ruangan ? $scope.item.ruangan.id : "")).then(res => {

                    for (let i = 0; i < res.data.data.length; i++) {
                        $scope.totalPasienBaru += res.data.data[i].pasienBaru;
                        $scope.totalPasienLama += res.data.data[i].pasienLama;
                        $scope.subTotal += res.data.data[i].total;
                    }

                    $scope.dataSource = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 25
                    });

                    $scope.isRouteLoading = false;
                })
            }

            let init = () => {
                $scope.getData();

                ManageSdmNew.getListData('service/list-generic/?view=Departemen&select=id,namaDepartemen,&criteria=statusEnabled&values=true&order=namaDepartemen:asc').then(res => {
                    $scope.listOfDept = res;
                });

                $scope.gridOpt = {
                    toolbar: [{
                        text: "export",
                        name: "Export",
                        template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }, {
                        text: "export",
                        name: "Cetak Laporan",
                        template: '<button ng-click="cetakLaporan()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-printer"></span>Cetak Laporan</button>'
                    }],
                    selectable: 'row',
                    pageable: true,

                    columns: [

                        {
                            "field": "tglRegistrasi",
                            "title": "<h3>Tanggal Registrasi</h3>",
                            footerTemplate: "<span>Total</span>"
                        },
                        {
                            "field": "pasienBaru",
                            "title": "<h3>Pasien Baru</h3>",
                            footerTemplate: "<span>{{totalPasienBaru}}</span>"
                        },
                        {
                            "field": "pasienLama",
                            "title": "<h3>Pasien Lama</h3>",
                            footerTemplate: "<span>{{totalPasienLama}}</span>"
                        },
                        {
                            "field": "total",
                            "title": "<h3>Total</h3>",
                            footerTemplate: "<span>{{subTotal}}</span>"

                        }
                    ]
                }
            }
            init();

            $scope.getRuangan = () => {
                $scope.item.ruangan = null;
                ManageSdmNew.getListData('service/list-generic/?view=Ruangan&select=id,namaRuangan,&criteria=statusEnabled,departemenId&values=true,' + ($scope.item.dept ? $scope.item.dept.id : '') + '&order=namaRungan:asc').then(res => {
                    $scope.listOfRuangan = res;
                });
            }

            $scope.exportExcel = () => {
                var tempDataExport = [];
                var rows = [{
                    cells: [{
                            value: "Tanggal Registrasi"
                        },
                        {
                            value: "Pasien Baru"
                        },
                        {
                            value: "Pasien Lama"
                        },
                        {
                            value: "Total"
                        }

                    ]
                }];

                tempDataExport = $scope.dataSource;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                    value: data[i].tglRegistrasi
                                },
                                {
                                    value: data[i].pasienBaru
                                },
                                {
                                    value: data[i].pasienLama
                                },
                                {
                                    value: data[i].total
                                }
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            freezePane: {
                                rowSplit: 1
                            },
                            columns: [
                                // Column settings (width)
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                }
                            ],
                            // Title of the sheet
                            title: "Kunjugan Pasien",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "rekap-kunjungan-pasien-periode" + dateHelper.formatDate($scope.item.periodeAwal, 'DD-MMM-YYYY') + "s/d" + dateHelper.formatDate($scope.item.periodeAkhir, 'DD-MMM-YYYY') + ".xlsx"
                    });
                });
            }

            $scope.cetakLaporan = () => {
                let url = '';

                if (!$scope.item.dept) {
                    toastr.info('Harap isi Departemen/Instalasi');
                }

                if (!$scope.item.ruangan) url = "http:" + "//" + '192.168.12.4' + ":7777/" + 'service-reporting/lap-rekap-harian-by-dept/' + $scope.item.dept.id + '/' + dateHelper.formatDate($scope.item.periodeAwal, 'YYYY-MM-DD') + '/' + dateHelper.formatDate($scope.item.periodeAkhir, 'YYYY-MM-DD')
                else url = "http:" + "//" + '192.168.12.4' + ":7777/" + 'service-reporting/lap-rekap-harian-by-ruangan/' + $scope.item.dept.id + '/' + $scope.item.ruangan.id + '/' + dateHelper.formatDate($scope.item.periodeAwal, 'YYYY-MM-DD') + '/' + dateHelper.formatDate($scope.item.periodeAkhir, 'YYYY-MM-DD')
                window.open(url, '_blank')
            }
        }
    ]);
});