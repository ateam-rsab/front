define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapKunjunganPasienCtrl', ['CacheHelper', '$q', '$scope', 'ManagePhp', 'DateHelper', '$state',
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

                $scope.isRouteLoading = true;
                var bulan = moment($scope.item.bulan).format('YYYY-MM');
                ManagePhp.getData("laporan/get-rekapkunjungan-rawatjalan?"
                    + "monthYear=" + bulan
                ).then(function (data) {
                    var result = data.data.data
                    if (result.length > 0) {
                        for (let i = 0; i < result.length; i++) {
                            result[i].no = i + 1;
                        }
                    }
                    $scope.isRouteLoading = false;
                    $scope.sourceLaporan =
                        // new kendo.data.DataSource(
                        {
                            data: result,
                            group: $scope.group,
                            pageSize: 10,
                            total: result.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                    }
                                }
                            }
                        }
                })
            }




            $scope.optionsGrid = {
                toolbar: [
                    "excel",
                    "pdf",
                ],
                excel: { fileName: "RekapKunjunganRawatJalan.xlsx", allPages: true, },
                pdf: {
                    fileName: "RekapKunjunganRawatJalan.pdf", allPages: true,
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
                            value: "LAPORAN REKAPITULASI KUNJUNGAN PASIEN BPJS & NON BPJS RAWAT JALAN " + ( DateHelper.formatDate($scope.item.bulan, 'MMMM YYYY')).toUpperCase(),
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
                    { field: "satuan", title: "SATUAN", width: "100px" },

                    {
                        title: "REGULER", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                title: "RAWAT JALAN REG", headerAttributes: { style: "text-align : center" },
                                columns: [
                                    { field: "rajalRegBPJS", title: "BPJS", width: "30px", },
                                    { field: "rajalRegNonBPJS", title: "NON BPJS", width: "30px", },
                                    { field: "totalRajal", title: "JML", width: "30px", }
                                ]
                            }]
                    },
                    {
                        title: "UNGGULAN", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                title: "MELATI", headerAttributes: { style: "text-align : center" },
                                columns: [
                                    { field: "melatiBPJS", title: "BPJS", width: "30px", },
                                    { field: "melatiNonBPJS", title: "NON BPJS", width: "30px", },
                                    { field: "totalMelati", title: "JML", width: "30px", }
                                ]
                            },
                            {
                                title: "CLP", headerAttributes: { style: "text-align : center" },
                                columns: [
                                    { field: "clpBPJS", title: "BPJS", width: "30px", },
                                    { field: "clpNonBPJS", title: "NON BPJS", width: "30px", },
                                    { field: "totalClp", title: "JML", width: "30px", }
                                ]
                            },
                            {
                                title: "POTAS", headerAttributes: { style: "text-align : center" },
                                columns: [
                                    { field: "potasBPJS", title: "BPJS", width: "30px", },
                                    { field: "potasNonBPJS", title: "NON BPJS", width: "30px", },
                                    { field: "totalPotas", title: "JML", width: "30px", }
                                ]
                            },
                            {
                                title: "KLINIK REMAJA", headerAttributes: { style: "text-align : center" },
                                columns: [
                                    { field: "klinikRemajaBPJS", title: "BPJS", width: "30px", },
                                    { field: "klinikRemajaNonBPJS", title: "NON BPJS", width: "30px", },
                                    { field: "totalKlinikRemaja", title: "JML", width: "30px", }
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