define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RealisasiPendapatanRawatJalanCtrl', ['CacheHelper', '$q', '$scope', 'ManagePhp', 'DateHelper', '$state',
        function (cacheHelper, $q, $scope, ManagePhp, DateHelper, $state) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.item.bulan = $scope.now;
            $scope.monthOnly = {
                start: "year",
                depth: "year",
                format: "MMMM yyyy",
            }
            $scope.yearOnly = {
                start: "decade",
                depth: "decade"
            }

            $scope.search = function () {
                loadData()
            }

            function loadData() {

                // $scope.isRouteLoading = true;
                // var bulan = moment($scope.item.bulan).format('YYYY-MM');
                // ManagePhp.getData("laporan/get-rekapkunjungan-rawatjalan?"
                //     + "monthYear=" + bulan
                // ).then(function (data) {
                //     var result = data.data.data
                //     if (result.length > 0) {
                //         for (let i = 0; i < result.length; i++) {
                //             result[i].no = i + 1;
                //         }
                //     }
                //     $scope.isRouteLoading = false;
                //     $scope.sourceLaporan =
                //         {
                //             data: result,
                //             group: $scope.group,
                //             pageSize: 10,
                //             total: result.length,
                //             serverPaging: false,
                //             schema: {
                //                 model: {
                //                     fields: {
                //                     }
                //                 }
                //             }
                //         }
                // })
            }




            $scope.optionsGrid = {
                toolbar: [
                    "excel",
                    "pdf",
                ],
                excel: { fileName: "RealisasiPendapatanRawatJalan.xlsx", allPages: true, },
                pdf: {
                    fileName: "RealisasiPendapatanRawatJalan.pdf", allPages: true,
                    avoidLinks: true,
                    paperSize: "A4",
                    margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                    landscape: true,
                    repeatHeaders: true,
                    template: $("#page-template").html(),
                    scale: 0.8
                },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 4;
                    sheet.mergedCells = ["A1:R1"];
                    sheet.name = "Laporan";

                    var myHeaders = [

                        {
                            value: "Realisasi Pendapatan Rawat Jalan " + (DateHelper.formatDate($scope.item.bulan, 'MMMM YYYY')).toUpperCase(),
                            fontSize: 15,
                            textAlign: "center",
                            background: "#c1d2d2",
                            // color:"#ffffff"
                        }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 50 });
                },
                sortable: true,
                pageable: true,
                selectable: "row",
                columns: [
                    { field: "no", title: "NO", width: "30px" },
                    { field: "uraian", title: "URAIAN", width: "150px", },
                    {
                        title: "RBA", headerAttributes: { style: "text-align : center" },
                        columns: [
                            { field: "rajalRegBPJS", title: "Vol", width: "30px", },
                            { field: "rajalRegNonBPJS", title: "Rupiah", width: "30px", },
                        ]
                    },
                    {
                        title: "REALISASI (2)*", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                title: "S/D BULAN LALU", headerAttributes: { style: "text-align : center" },
                                columns: [
                                    { field: "rajalRegBPJS", title: "Vol", width: "30px", },
                                    { field: "rajalRegNonBPJS", title: "Rupiah", width: "30px", },
                                ]
                            },
                        ]
                    },
                    {
                        title: "REALISASI (3)*", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                title: "BULAN ", headerAttributes: { style: "text-align : center" },
                                columns: [
                                    { field: "rajalRegBPJS", title: "Vol", width: "30px", },
                                    { field: "rajalRegNonBPJS", title: "Rupiah", width: "30px", },
                                ]
                            },
                        ]
                    },
                    {
                        title: "REALISASI (4)*", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                title: "BULAN ", headerAttributes: { style: "text-align : center" },
                                columns: [
                                    { field: "rajalRegBPJS", title: "Vol", width: "30px", },
                                    { field: "rajalRegNonBPJS", title: "Rupiah", width: "30px", },
                                ]
                            },
                        ]
                    },
                    {
                        title: "% CAPAIAN (5)*", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                title: "Sampai bln ini ", headerAttributes: { style: "text-align : center" },
                                columns: [
                                    { field: "rajalRegBPJS", title: "Vol", width: "30px", },
                                    { field: "rajalRegNonBPJS", title: "Rupiah", width: "30px", },
                                ]
                            },
                        ]
                    },
                ]

            }
            $scope.Perbaharui = function () {
                $scope.clears();
            }
            $scope.formatRupiah = function (value, currency) {
                if (value == null || value == "null")
                    value = 0
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }

            $scope.clears = function () {
                delete $scope.item.bulan
            }
        }
    ]);
});