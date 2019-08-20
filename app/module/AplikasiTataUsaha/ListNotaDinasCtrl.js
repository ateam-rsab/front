define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('ListNotaDinasCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window', '$q',
        function ($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window, $q) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;
            $scope.isRouteLoading = true;
            $scope.dataSourceKonsepSurat = new kendo.data.DataSource({
                data: [],
                pageSize: 5
            })
            initializeData();

            function initializeData() {
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).add(1, 'day').format('DD-MM-YYYY');
                var idPegawai = ModelItem.getPegawai().id;
                $q.all([
                    ManageSarpras.getOrderList("nota-dinas/get-inbox-nota-dinas?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idPegawai=" + idPegawai, true),
                    ManageSarpras.getOrderList("nota-dinas/get-outbox-nota-dinas?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idPegawai=" + idPegawai, true),
                ]).then(function (data) {
                    $scope.notaMasuk = new kendo.data.DataSource({
                        data: data[0].data.data
                    });

                    $scope.notaKeluar = new kendo.data.DataSource({
                        data: data[1].data.data
                    });
                });
            }

            $scope.cari = function () {
                initializeData();
            }
            $scope.colNotaMasuk = [{
                "field": "pembuat",
                "title": "<h3 align=center>Pengirim.<h3>",
                "width": "30%"
            }, {

                "field": "perihal",
                "title": "<h3 align=center>Perihal<h3>",
                "width": "50%"
            }, {

                "field": "jenis",
                "title": "<h3 align=center>Jenis<h3>",
                "width": "10%"
            }, {

                "field": "tanggal",
                "title": "<h3 align=center>Tanggal<h3>",
                "width": "10%"
            }];

            $scope.colNotaKeluar = [{
                "field": "perihal",
                "title": "<h3 align=center>Perihal<h3>",
                "width": "50%"
            }, {

                "field": "jenis",
                "title": "<h3 align=center>Jenis<h3>",
                "width": "10%"
            }, {

                "field": "tanggal",
                "title": "<h3 align=center>Tanggal<h3>",
                "width": "10%"
            }];

            $scope.detailGridOptions = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.ruangans
                    }),
                    columns: [{
                        "field": "ruangan_namaRuangan",
                        "title": "Ruangan",
                        "width": "20%"
                    }, {

                        "field": "jabatanInternal_namaJabatan",
                        "title": "Jabatan",
                        "width": "30%"
                    }, {

                        "field": "namaLengkap",
                        "title": "Nama ",
                        "width": "40%"
                    }]
                };

            };

            $scope.optKonsepSurat = {
                toolbar: [
                    // "excel",
                    // { text: "export", name: "Export detail", template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export All to Excel</button>' },
                    // { name: "username", text: "Show username", template: '<button ng-click="toogleClick()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-refresh"></span>{{username}} Username</button>' },
                    { name: "SuratBaru", text: "Tambah Konsep Surat Baru", template: '<button ng-click="tambahSuratBaru()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Konsep Surat Baru</button>' }
                ],
                // excel: {
                //     allPages: true,
                //     margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                //     scale: 0.8,
                //     fileName: "RSAB HK Export Data Pegawai-" + DateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                // },
                pageable: true,
                pageSize: 5, //page size
                selectable: 'row',
                scrollable: true,
                columns: [
                    {
                        // field: "nipPns",
                        title: "<h3>No.</h3>",
                        width: "17%",
                    },
                    {
                        // field: "namaLengkap",
                        title: "<h3>Tanggal</h3>",
                        width: "25%"
                    },
                    {
                        // field: "unitKerja",
                        title: "<h3>Tema Surat</h3>",
                        width: "20%"
                    },
                    {
                        // field: "subUnitKerja",
                        title: "<h3>Status</h3>",
                        width: "20%"
                    },
                    {
                        // field: "jabatanInternal",
                        title: "<h3>Terkirim</h3>",
                        width: "20%",
                    },
                    {
                        field: "kategoriPegawai",
                        title: "<h3>Dibaca</h3>",
                        width: "15%",
                        attributes: {
                            style: "text-align:center;valign=middle"
                        }
                    },
                    {
                        command: [
                            {
                                text: "Lihat",
                                width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                // click: editDataPegawai,
                                imageClass: "k-i-arrow-60-right"
                            },
                            {
                                text: "Hapus",
                                width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                // click: confirmHapusDataPegawai,
                                imageClass: "k-i-arrow-60-right"
                            }
                        ],
                        title: "",
                        width: "20%",
                        attributes: {
                            style: "text-align:center;valign=middle"
                        },
                    }
                ],
                excelExport: function (e) {
                    var columns = e.workbook.sheets[0].columns;
                    columns.forEach(function (column) {
                        delete column.width;
                        column.autoWidth = true;
                    });
                },
                change: function (e) {
                    var grid = $("#gridDataPegawai").data("kendoGrid");
                    var selectedRows = grid.dataItem(grid.select());
                    for (var i = 0; i < $scope.arrayMapAtasan.length; i++) {
                        if (selectedRows.idPegawai == $scope.arrayMapAtasan[i].pegawai.id) {
                            if ($scope.arrayMapAtasan[i].atasanLangsung) selectedRows.atasanLangsung = $scope.arrayMapAtasan[i].atasanLangsung;
                            if ($scope.arrayMapAtasan[i].atasanPejabatPenilai) selectedRows.atasanPejabatPenilai = $scope.arrayMapAtasan[i].atasanPejabatPenilai;
                            break;
                        }
                    }
                    $scope.dataItem = selectedRows;
                }
            };

            $scope.tambahSuratBaru = function () {
                $state.go('NotaDanDisposisi')
            }
        }
    ])
})