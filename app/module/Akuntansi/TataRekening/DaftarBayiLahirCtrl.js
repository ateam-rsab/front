define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarBayiLahirCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper', 'DateHelper', 'ReportService',
        function ($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper, dateHelper, ReportService) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.item.tglAwal = new Date();
            $scope.item.tglAkhir = new Date();
            $scope.optGrid = {
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                toolbar: [
                    "excel",

                ],
                excel: {
                    fileName: "DaftarBayiLahir.xlsx",
                    allPages: true,
                },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:M1"];
                    sheet.name = "Orders";

                    var myHeaders = [{
                        value: "Daftar Registrasi Pasien",
                        fontSize: 20,
                        textAlign: "center",
                        background: "#ffffff",
                        // color:"#ffffff"
                    }];

                    sheet.rows.splice(0, 0, {
                        cells: myHeaders,
                        type: "header",
                        height: 70
                    });
                },
                selectable: 'row',
                pageable: true,
                columns: [{
                    "field": "tglDaftarFormatted",
                    "title": "Tanggal Daftar",
                    "width": "80px",
                },
                {
                    "field": "tglLahirFormatted",
                    "title": "Tanggal Lahir",
                    "width": "80px"
                },
                {
                    "field": "namaAnak",
                    "title": "Nama Anak",
                    "width": "80px",
                },
                {
                    "field": "noCmAnak",
                    "title": "No. RM Anak",
                    "width": "50px",
                },
                {
                    "field": "namaIbu",
                    "title": "Nama Ibu",
                    "width": "150px",
                },
                {
                    "field": "noCmIbu",
                    "title": "No. RM Ibu",
                    "width": "50px"
                },
                ]
            };

            $scope.getData = () => {
                $scope.isRouteLoading = true;
                let tglAwal = dateHelper.toTimeStamp($scope.item.tglAwal),
                    tglAkhir = dateHelper.toTimeStamp($scope.item.tglAkhir);
                ReportService.getListData(`reporting/daftar-ibu-dan-anak?tglAwal=${tglAwal}&tglAkhir=${tglAkhir}`, false).then(function (data) {

                    for(let i = 0; i < data.data.data.length; i++) {
                        data.data.data[i].tglLahirFormatted = dateHelper.formatDate(data.data.data[i].tglLahir);
                        data.data.data[i].tglDaftarFormatted = dateHelper.formatDate(data.data.data[i].tglDaftar);
                    }
                    $scope.dataBayiLahir = new kendo.data.DataSource({
                        data: [...data.data.data],
                        pageSize: 100
                    });

                    $scope.isRouteLoading = false;
                })
            }
            $scope.getData();
        }
    ]);
});