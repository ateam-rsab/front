define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LogbookKinerjaCtrl', ['$q', '$http', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'ReportHelper', 'FindPegawai', 'CetakHelper', 'FindSdm',
        function ($q, $http, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, reportHelper, findPegawai, cetakHelper, FindSdm) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.isLoading = true;
            $scope.isRouteLoading = true;
            $scope.dataVOloaded = true;
            $scope.yearSelected = {
                format: "MMMM yyyy",
                start: "year",
                depth: "year"
            };

            $q.all([
                ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true"),
                ManageSdmNew.getListData("pegawai/get-all-pegawai-custom/")
            ]).then(function (res) {
                if (res[0].statResponse) {
                    $scope.listPegawai = res[0].data;
                    $scope.daftarListPegawai = $scope.listPegawai
                }
                if (res[1].statResponse) {
                    $scope.listPegawaiPensiun = res[1].data;
                }
                $scope.isRouteLoading = false;
            })

            $scope.cari = function () {
                var listRawRequired = [
                    "item.pegawai|k-ng-model|Nama pegawai",
                    "item.periode|k-ng-model|Periode"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.isRouteLoading = true;
                    $q.all([
                        ManageSdmNew.getListData("sdm/get-all-tindakan-dokter-rescored/" + dateHelper.getFormatMonthPicker($scope.item.periode) + "/" + $scope.item.pegawai.id),
                        ManageSdmNew.getListData("sdm/get-rekapitulasi-capaian/" + dateHelper.getFormatMonthPicker($scope.item.periode) + "/" + $scope.item.pegawai.id)
                    ]).then(function (res) {
                        if (res[0].statResponse) {
                            // define grid logbook kinerja and show data
                            $scope.showGridKinerja = true;
                            var dataGrid = [];
                            res[0].data.data.forEach(function (element) {
                                var customData = {};
                                for (var key in element) {
                                    switch (key) {
                                        case "datas":
                                            var lisObjek = element.datas;
                                            lisObjek.forEach(function (subElement) {
                                                var tgl = subElement.tanggal;
                                                var key = tgl.slice(-2);
                                                if (key[0] === "0") {
                                                    key = key.slice(-1);
                                                    customData[key] = subElement["count"];
                                                } else {
                                                    customData[key] = subElement["count"];
                                                };
                                            });

                                            break;
                                        default:
                                            customData[key] = element[key];

                                            break;
                                    }
                                };
                                dataGrid.push(customData);
                            });

                            $scope.mainGridOption = {
                                toolbar: ["excel"],
                                excel: {
                                    fileName: "lapLogbookPegawai " + $scope.item.pegawai.namaLengkap + " " + dateHelper.getFormatMonthPicker($scope.item.periode) + ".xlsx",
                                    allPages: true,
                                },
                                excelExport: function (e) {
                                    var sheet = e.workbook.sheets[0];
                                    sheet.frozenRows = 3;
                                    sheet.mergedCells = ["A1:AN1"];
                                    sheet.name = "Orders";
                                    var myHeaders = [{
                                        value: "Logbook " + $scope.item.pegawai.namaLengkap + "(Periode " + dateHelper.getPeriodFormat($scope.item.periode) + ") ",
                                        fontSize: 14,
                                        textAlign: "left",
                                        background: "#ffffff",
                                    }];
                                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 30 });
                                },
                                editable: false,
                                scrollable: true,
                                selectable: "row",
                                columns: [{
                                    field: "namaProduk",
                                    title: "Tugas",
                                    width: 400
                                }, {
                                    field: "namaKelas",
                                    title: "Kelas",
                                    width: 100
                                }, {
                                    field: "produkId",
                                    title: "idProduk",
                                    hidden: true
                                }, {
                                    field: "poin",
                                    title: "Poin",
                                    headerAttributes: {
                                        style: "text-align: center"
                                    },
                                    width: 80,
                                    format: "{0:n2}",
                                    attributes: {
                                        class: "table-cell",
                                        style: "text-align: right;"
                                    }
                                }, {
                                    field: "hargaKelas1",
                                    title: "Tarif (Rp.)",
                                    template: '# if( hargaKelas1 != null ) {# #= hargaKelas1# #} else {# #= harga# #} #',
                                    format: "{0:n0}",
                                    width: 100,
                                    headerAttributes: {
                                        style: "text-align: center"
                                    },
                                    attributes: {
                                        class: "table-cell",
                                        style: "text-align: right; font-size: 14px;"
                                    }
                                }, {
                                    field: "Pencapaian",
                                    headerAttributes: {
                                        style: "text-align: center"
                                    },
                                    columns: $scope.generateGridColumn()
                                }, {
                                    title: "Total",
                                    headerAttributes: {
                                        style: "text-align: center"
                                    },
                                    columns: [{
                                        field: "totalKonsul",
                                        title: "Konsultasi",
                                        width: 80,
                                        headerAttributes: {
                                            style: "text-align: center"
                                        },
                                        attributes: {
                                            style: "text-align: right;"
                                        },
                                        aggregates: ["sum"],
                                        footerTemplate: "#= sum #",
                                        footerAttributes: {
                                            "class": "table-footer-cell",
                                            style: "text-align: right;"
                                        }
                                    }, {
                                        field: "totalVisit",
                                        title: "Visite",
                                        width: 80,
                                        headerAttributes: {
                                            style: "text-align: center"
                                        },
                                        attributes: {
                                            style: "text-align: right;"
                                        },
                                        aggregates: ["sum"],
                                        footerTemplate: "#= sum #",
                                        footerAttributes: {
                                            class: "table-footer-cell",
                                            style: "text-align: right;"
                                        }
                                    },
                                    {
                                        field: "totalTindakan",
                                        title: "Tindakan",
                                        width: 80,
                                        headerAttributes: {
                                            style: "text-align: center"
                                        },
                                        attributes: {
                                            style: "text-align: right;"
                                        },
                                        aggregates: ["sum"],
                                        footerTemplate: "#= sum #",
                                        footerAttributes: {
                                            class: "table-footer-cell",
                                            style: "text-align: right;"
                                        }
                                    },
                                    {
                                        field: "totalProduk",
                                        title: "Total",
                                        width: 80,
                                        headerAttributes: {
                                            style: "text-align: center"
                                        },
                                        attributes: {
                                            style: "text-align: right;"
                                        },
                                        aggregates: ["sum"],
                                        footerTemplate: "#= sum #",
                                        footerAttributes: {
                                            class: "table-footer-cell",
                                            style: "text-align: right;"
                                        }
                                    },
                                    {
                                        field: "kontribusi",
                                        footerTemplate: "#= sum #",
                                        hidden: true
                                    },
                                    {
                                        field: "pointQty",
                                        title: "Poin",
                                        width: 80,
                                        headerAttributes: {
                                            style: "text-align: center"
                                        },
                                        attributes: {
                                            style: "text-align: right;"
                                        },
                                        aggregates: ["sum"],
                                        format: "{0:n2}",
                                        footerTemplate: " #= kendo.toString(sum, 'n2') #",
                                        footerAttributes: {
                                            class: "table-footer-cell",
                                            style: "text-align: right;"
                                        }
                                    }
                                    ]
                                }, {
                                    field: "idKelas",
                                    title: "idKelas",
                                    hidden: true
                                }],
                                dataBound: $scope.onDataBound
                            };

                            $scope.dataSource = new kendo.data.DataSource({
                                data: dataGrid, aggregate: [
                                    { field: "totalKonsul", aggregate: "sum" },
                                    { field: "totalVisit", aggregate: "sum" },
                                    { field: "totalTindakan", aggregate: "sum" },
                                    { field: "totalProduk", aggregate: "sum" },
                                    { field: "pointQty", aggregate: "sum" },
                                    { field: "kontribusi", aggregate: "sum" }
                                ]
                            })

                            $scope.isLoading = false;
                            $scope.isRouteLoading = false;
                        }

                        if (res[1].statResponse) {
                            // define grid uraian tugas and show grid data
                            $scope.showGridUraian = true;
                            $scope.opsiGridUraianTugas = {
                                selectable: "row",
                                scrollable: true,
                                columns: [{
                                    field: "rincianKegiatanId",
                                    title: "Id",
                                    width: 1,
                                    visible: false
                                }, {
                                    field: "rincianKegiatan",
                                    title: "Uraian Tugas",
                                    width: 420
                                }, {
                                    field: "target",
                                    title: "<center>Target<br/>(/Bulan)</center>",
                                    template: "<span class=\"pull-right\"> #= target # </span>",
                                    width: 60
                                }, {
                                    field: "bobot",
                                    title: "<center>Bobot</center>",
                                    template: "<span class=\"pull-right\"> #= bobot # </span>",
                                    width: 60
                                }, {
                                    field: "satuan",
                                    title: "<center>Satuan</center>",
                                    width: 60
                                }, {
                                    headerTemplate: getHeader("Capaian"),
                                    columns: $scope.generateGridColumn(),
                                    attributes: {
                                        style: "text-align:center"
                                    }
                                }, {
                                    field: "total",
                                    title: "Total",
                                    width: "100px",
                                    format: "{0:n2}",
                                    attributes: {
                                        class: "table-cell-right"
                                    }
                                }, {
                                    field: "nilai",
                                    title: "Nilai",
                                    width: "100px",
                                    format: "{0:n2}",
                                    attributes: {
                                        class: "table-cell-right"
                                    }
                                }, {
                                    field: "hasil",
                                    title: "Hasil",
                                    width: "100px",
                                    format: "{0:n2}",
                                    aggregates: ["sum"],
                                    footerTemplate: " #= kendo.toString(sum,'0.00')#",
                                    attributes: {
                                        class: "table-cell-right"
                                    }
                                }],
                                editable: false
                            };

                            $scope.gridUraianTugas = new kendo.data.DataSource({
                                data: res[1].data.data.uraianTugas,
                                schema: {
                                    model: {
                                        id: "idRincianKegiatan",
                                        fields: {
                                            idRincianKegiatan: { editable: false },
                                            bobot: { type: "number" },
                                            total: { type: "number" },
                                            nilai: { type: "number" },
                                            hasil: { type: "number" },
                                            satuan: { type: "number" },
                                            capaian: { type: "number", validation: { min: 0, required: false } },
                                            rincianKegiatan: { editable: false },
                                            target: { type: "number", editable: false }
                                        }
                                    }
                                },
                                aggregate: {
                                    field: "hasil", aggregate: "sum"
                                }
                            });
                        }
                    }, (error) => {
                        $scope.isRouteLoading = false;
                        throw (error);
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };

            $scope.cetakLogBook = function () {
                if ($scope.jenisCetakan == 'CetakLogbook') {
                    $scope.cetak();
                } else if ($scope.jenisCetakan == 'CetakDetailLogbook') {
                    $scope.cetakDaftarLogBookKinerjaRekapWithPasien();
                }
                var myWindow = $("#winPopUpCetak");
                myWindow.data("kendoWindow").close();
            }

            $scope.batalCetak = function () {
                var myWindow = $("#winPopUpCetak");
                myWindow.data("kendoWindow").close();
            }

            $scope.isShowPopUpCetak = false;
            $scope.openWindowCetak = function (param) {
                ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai=" + $scope.item.pegawai.id).then(function (res) {
                    $scope.listJabatanCetak = res.data.data;
                    $scope.item.jabatanCetak = $scope.listJabatanCetak[0];
                });

                ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/list-atasan-langsung-pegawai?idPegawai=" + $scope.item.pegawai.id, true).then(function (dat) {
                    $scope.listAtasan = dat.data.data.data;
                    $scope.item.atasanCetak = dat.data.data.data[0];

                    ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai=" + $scope.item.atasanCetak.id).then(function (res) {
                        $scope.listJabatanAtasanCetak = res.data.data;
                        $scope.item.jabatanAtasanCetak = $scope.listJabatanAtasanCetak[0];
                    });
                });

                $scope.jenisCetakan = param;

                var myWindow = $("#winPopUpCetak");
                myWindow.data("kendoWindow").center().open();

                $scope.isShowPopUp = true;
            }

            $scope.getJabatanAtasanCetak = function () {
                ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai=" + $scope.item.atasanCetak.id).then(function (res) {
                    $scope.listJabatanAtasanCetak = res.data.data;
                    $scope.item.jabatanAtasanCetak = $scope.listJabatanAtasanCetak[0];
                });
            }

            $scope.cetakDaftarLogBookKinerjaRekapWithPasien = function () {
                var listRawRequired = [
                    "item.pegawai|k-ng-model|Nama pegawai",
                    "item.periode|k-ng-model|Periode"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var fixUrlLaporan = cetakHelper.openURLReporting("reporting/logbookTindakanDokterDetailPasien?periode=" + dateHelper.getFormatMonthPicker($scope.item.periode)
                        + "&idPegawai=" + $scope.item.pegawai.id + "&idJabatan=" + $scope.item.jabatanCetak.id + "&idAtasan=" + $scope.item.atasanCetak.id
                        + "&idJabatanAtasan=" + $scope.item.jabatanAtasanCetak.id + "&ffs=false");

                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            $scope.generateGridColumn = function () {
                var year = $scope.item.periode.getYear();
                var month = $scope.item.periode.getMonth();
                var dateInMonth = new Date(year, month + 1, 0);
                var listDay = [];
                for (var i = 0; i < dateInMonth.getDate(); i++) {
                    var data = {
                        field: "[" + (i + 1) + "]",
                        title: (i + 1).toString(),
                        width: "50px", attributes: { style: "text-align: right;" },
                        headerAttributes: { style: "text-align: center;" }
                    };
                    listDay.push(data);
                }

                return listDay;
            }

            $scope.onDataBound = function (e) {
                var grid = $("#gridLogKinerja").data("kendoGrid");
                var totalCapaian = grid.dataSource.aggregates().pointQty.sum;
                var totalKontribusi = grid.dataSource.aggregates().kontribusi.sum;

                $scope.totalCapaian = totalCapaian.toFixed(2);
                $scope.totalKontribusi = totalKontribusi.toFixed(2);
                $(grid.tbody).on("click", "td", function (e) {
                    // disable show popup on empty cell date value
                    if (e.currentTarget.innerText === "") return;

                    var row = $(this).closest("tr");
                    var selectedData = grid.dataItem(row);
                    var colIdx = $("td", row).index(this);
                    if (colIdx >= 5) {
                        // disable show popup if cell index < 4
                        var colDateIdx = colIdx - 5;
                        var colName = $('#gridLogKinerja tr').eq(1).find('th').eq(colDateIdx).text();

                        if (colName.length === 1) {
                            colName = "0" + colName;
                        }
                        if (colName.length <= 2) {
                            // show detail on date cell click only
                            var akhir = dateHelper.getFormatMonthPicker($scope.item.periode) + "-" + colName;
                            $scope.showDetail(selectedData.idProduk, selectedData.idKelas, $scope.item.pegawai.id, akhir, selectedData.diskon, selectedData.statusDiskon);
                        }
                    }
                });
            }

            $scope.showDetail = function (idProduk, idKelas, idPegawai, tgl, diskon, statusDiskon) {
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("sdm/get-detail-pasien/" + idProduk + "/" + idKelas + "/" + idPegawai + "/" + tgl + "/" + false
                    + "?diskon=" + diskon + "&statusDiskon=" + (statusDiskon ? statusDiskon : "")).then(function (data) {
                        $scope.dats = data.data.data
                        $scope.dats.tgl = dateHelper.formatDate(tgl, "dd-MM-yyyy");
                        $scope.detilGridOptions = {
                            scrollable: true,
                            columns: [{
                                field: "namaProduk",
                                title: "Nama Tindakan",
                                width: 400
                            }, {
                                field: "tglpelayanan",
                                title: "Tanggal",
                                template: "#= kendo.toString(kendo.parseDate(new Date(tglpelayanan)), 'dd-MM-yyyy') #",
                                width: 90,
                                attibutes: {
                                    class: "table-cell",
                                    style: "text-align: center;"
                                }
                            }, {
                                field: "tglpelayanan",
                                title: "Jam",
                                template: "#= kendo.toString(kendo.parseDate(new Date(tglpelayanan)), 'HH:mm') #",
                                width: 90,
                                attibutes: {
                                    class: "table-cell",
                                    style: "text-align: center;"
                                }
                            }, {
                                field: "ruangan",
                                title: "Ruangan",
                                width: 200
                            }, {
                                field: "namaKelas",
                                title: "Kelas",
                                width: 100
                            }, {
                                field: "harga",
                                title: "Harga",
                                template: "#= kendo.toString(harga, 'n0') #",
                                width: 120,
                                attibutes: {
                                    class: "table-cell",
                                    style: "text-align: right;"
                                }
                            }, {
                                title: "Pasien",
                                columns: [{
                                    field: "noCm",
                                    title: "No. CM",
                                    width: 100
                                }, {
                                    field: "noRegistrasi",
                                    title: "No. Reg",
                                    width: 150
                                }, {
                                    field: "namapasien",
                                    title: "Nama",
                                    width: 300
                                }]
                            }, {
                                field: "jenisPetugas",
                                title: "Petugas",
                                width: 150
                            }]
                        }

                        $scope.dataDetil = new kendo.data.DataSource({
                            data: data.data.data
                        });

                        $scope.isRouteLoading = false;

                        $scope.winDialog.center().open();
                    }, (error) => {
                        $scope.isRouteLoading = false;
                    })
            }

            $scope.cetak = function () {
                var listRawRequired = [
                    "item.periode|k-ng-model|Periode",
                    "item.pegawai|k-ng-model|Pegawai"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var fixUrlLaporan = cetakHelper.openURLReporting("reporting/lapLogbookKinerjaStaffMedis?idDokter=" + $scope.item.pegawai.id + "&idJabatan=" + $scope.item.jabatanCetak.id
                        + "&periode=" + dateHelper.getFormatMonthPicker($scope.item.periode));

                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            function getHeader(e) {
                var kolomTitle = e + " : " + dateHelper.getBulanFormatted(new Date($scope.item.periode));
                return kolomTitle;
            }

            $scope.toogleCheckVerifikasi = function (current) {
                if (current) {
                    $scope.daftarListPegawai = $scope.listPegawaiPensiun;
                } else {
                    $scope.daftarListPegawai = $scope.listPegawai;
                }
            }

            $scope.$watch('item.pegawai', function (e) {
                if (!e) return;
                if (e.id === undefined && e.idPegawai) {
                    e.id = e.idPegawai
                }
            })
        }
    ]);
});