define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('VerifikasiCatatanKegiatanHarianCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.item.showJabatanHistori = false;
            let clicked = 1;
            $scope.isRouteLoading = false;
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            let dataPegawai = JSON.parse(localStorage.getItem('pegawai'));

            $scope.init = () => {
                $scope.optGrid1 = {
                    pageable: true,
                    scrollable: true,
                    columns: [{
                        field: "jenisIndikator",
                        title: "<h3>Jenis Indikator</h3>",
                        width: 50
                    }, {
                        field: "namaIndikator",
                        title: "<h3>Indikator</h3>",
                        width: 120
                    }, {
                        field: "namaKegiatan",
                        title: "<h3>Kegiatan</h3>",
                        width: 120
                    }, {
                        field: "hasil",
                        title: "<h3>Hasil</h3>",
                        width: 50
                    }, {
                        field: "satuanIndikator",
                        title: "<h3>Satuan</h3>",
                        width: 50
                    }, {
                        field: "catatan",
                        title: "<h3>Catatan</h3>",
                        width: 120
                    }, {
                        field: "tglKegiatanFormat",
                        title: "<h3>Tanggal</h3>",
                        width: 50
                    }, {
                        field: "statusVerifikasi",
                        title: "<h3>Status</h3>",
                        width: 50
                    }, {
                        command: [{
                            text: "Verifikasi",
                            click: verifData,
                            imageClass: "k-icon k-i-pencil"
                        }, {
                            text: "Hapus",
                            click: hapusData,
                            imageClass: "k-icon k-i-pencil"
                        },],
                        title: "",
                        width: 100
                    }],
                    dataBound: function (e) {
                        $('td').each(function () {
                            if ($(this).text() == 'Terverifikasi') { $(this).addClass('verified') };
                            if ($(this).text() == 'Belum Verifikasi') { $(this).addClass('unverified') };
                        })
                    },
                }

                $scope.optGrid2 = {
                    toolbar: [
                        { text: "export", name: "Export detail", template: '<button ng-click="exportToExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-print"></span>Export To Excel</button>' }
                    ],
                    pageable: true,
                    scrollable: true,
                    columns: [{
                        field: "jenisIndikator",
                        title: "<h3>Jenis Indikator</h3>",
                        width: 50
                    }, {
                        field: "namaIndikator",
                        title: "<h3>Indikator</h3>",
                        width: 120
                    }, {
                        field: "namaKegiatan",
                        title: "<h3>Kegiatan</h3>",
                        width: 120
                    }, {
                        field: "hasil",
                        title: "<h3>Hasil</h3>",
                        width: 50
                    }, {
                        field: "satuanIndikator",
                        title: "<h3>Satuan</h3>",
                        width: 50
                    }, {
                        field: "catatan",
                        title: "<h3>Catatan</h3>",
                        width: 120
                    }, {
                        field: "tglKegiatanFormat",
                        title: "<h3>Tanggal</h3>",
                        width: 50
                    }, {
                        field: "statusVerifikasi",
                        title: "<h3>Status</h3>",
                        width: 50
                    }],
                    dataBound: function (e) {
                        $('td').each(function () {
                            if ($(this).text() == 'Terverifikasi') { $(this).addClass('verified') };
                            if ($(this).text() == 'Belum Verifikasi') { $(this).addClass('unverified') };
                        })
                    },
                }

                ManageSdmNew.getListData("iki-remunerasi/get-akses-pegawai-verifikasi-kinerja?pegawaiId=" + dataPegawai.id).then((res) => {
                    $scope.listPegawai = res.data.data;
                });
            }

            $scope.init();

            $scope.exportToExcel = function () {
                if (!$scope.dataSource2) {
                    toastr.info("Tidak ada data untuk di export")
                    return
                }
                var tempDataExport = [];
                var rows = [
                    {
                        cells: [
                            { value: "Jenis Indikator" },
                            { value: "Nama Indikator" },
                            { value: "Indikator" },
                            { value: "Kegiatan" },
                            { value: "Hasil" },
                            { value: "Satuan" },
                            { value: "Catatan" },
                            { value: "Tanggal" },
                            { value: "Status" }
                        ]
                    }
                ];

                tempDataExport = $scope.dataSource2;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].jenisIndikator },
                                { value: data[i].namaIndikator },
                                { value: data[i].namaKegiatan },
                                { value: data[i].hasil },
                                { value: data[i].satuanIndikator },
                                { value: data[i].catatan },
                                { value: data[i].tglKegiatanFormat },
                                { value: data[i].statusVerifikasi }
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [
                            {
                                freezePane: {
                                    rowSplit: 1
                                },
                                columns: [
                                    // Column settings (width)
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true }
                                ],
                                // Title of the sheet
                                title: "Catatan Kegiatan Harian Terverifikasi",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    // item.srcBulan
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: `catatan-kegiatan-harian-terverifikasi | ${dateHelper.formatDate($scope.item.srcBulan, 'MMMM YYYY')}-${$scope.item.srcPegawai.namaLengkap}-${$scope.item.srcJabatan.namaJabatan}.xlsx` });
                });
            }

            $scope.getJabatanByIdPegawai = (id) => {
                ManageSdmNew.getListData("pegawai/jabatan-kontrak-verif-kinerja?pegawaiId=" + id + "&pegawaiLoginId=" + dataPegawai.id).then((res) => {
                    $scope.listJabatan = res.data.data;
                })
            }

            $scope.getDataCatatanKegiatan = () => {
                if (!$scope.item.srcBulan) {
                    toastr.info("Harap pilih Bulan terlebih dahulu");
                    return;
                }

                if (!$scope.item.srcPegawai) {
                    toastr.info("Harap pilih Pegawai terlebih dahulu");
                    return;
                }

                if (!$scope.item.srcJabatan) {
                    toastr.info("Harap pilih Jabatan Pegawai terlebih dahulu");
                    return;
                }

                if ($scope.item.srcJabatan && !$scope.item.srcJabatan.isCariAkses) {
                    toastr.warning("Tidak ada akses untuk menampilkan data", "Peringatan")
                    return
                }

                $scope.isRouteLoading = true;
                $q.all([
                    ManageSdmNew.getListData("iki-remunerasi/catatan-kegiatan-harian-belum-verif?pegawaiId=" + ($scope.item.srcPegawai ? $scope.item.srcPegawai.id : "") + "&jabatanId=" + ($scope.item.srcJabatan ? $scope.item.srcJabatan.id : "") + "&bulan=" + ($scope.item.srcBulan ? dateHelper.toTimeStamp($scope.item.srcBulan) : '')),
                    ManageSdmNew.getListData("iki-remunerasi/catatan-kegiatan-harian-sudah-verif?pegawaiId=" + ($scope.item.srcPegawai ? $scope.item.srcPegawai.id : "") + "&jabatanId=" + ($scope.item.srcJabatan ? $scope.item.srcJabatan.id : "") + "&bulan=" + ($scope.item.srcBulan ? dateHelper.toTimeStamp($scope.item.srcBulan) : ''))
                ]).then(function (res) {
                    $scope.dataSource1 = new kendo.data.DataSource({
                        data: res[0].data.data,
                        pageSize: 50
                    });

                    $scope.dataSource2 = new kendo.data.DataSource({
                        data: res[1].data.data,
                        pageSize: 50
                    });

                    $scope.isRouteLoading = false;
                }, (error) => {
                    throw (error);
                })
            }

            $scope.simpanVerif = (data, method) => {
                $scope.isRouteLoading = true

                let statusEnabled = method === "verif";

                let dataSave = {
                    namaKegiatan: data.namaKegiatan,
                    capaian: data.hasil,
                    catatan: data.catatan,
                    statusVerifikasi: true,
                    logbookKinerja: {
                        noRec: data.logbookKinerja.noRec
                    },
                    kdProfile: 0,
                    statusEnabled: statusEnabled,
                    noRec: data.noRec
                }

                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-working-record").then(res => {
                    $scope.getDataCatatanKegiatan();
                })
            }

            function verifData(e) {
                e.preventDefault();
                clicked++;
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem.isStatusVerifikasi) {
                    toastr.warning("Catatan kegiatan sudah terverifikasi", "Peringatan")
                    return
                }

                if (dateHelper.toTimeStamp(new Date()) > dataItem.tglBatasAkhirVerif) {
                    toastr.warning("Batas masa verifikasi sudah lewat", "Peringatan")
                    return
                }

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan Verifikasi Catatan Kegiatan ' + dataItem.namaKegiatan + '?')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    console.log(clicked)
                    $scope.simpanVerif(dataItem, "verif");
                }, function () { });
            }

            function hapusData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem.isStatusVerifikasi) {
                    toastr.warning("Catatan kegiatan sudah terverifikasi tidak dapat dihapus", "Peringatan")
                    return
                }

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan Menghapus Catatan Kegiatan ' + dataItem.namaKegiatan + '?')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.simpanVerif(dataItem, "hapus");
                }, function () { });
            }

            $scope.$watch('item.srcPegawai', function (e) {
                if (!e) return;

                $scope.item.srcJabatan = null
            })

            $scope.updateListJabatan = (id) => {
                if ((!$scope.item || !$scope.item.srcBulan) && $scope.item.showJabatanHistori) {
                    $scope.item.showJabatanHistori = false;

                    toastr.warning("Harap pilih Bulan terlebih dahulu", "Peringatan");
                    return;
                }

                if (!id && $scope.item.showJabatanHistori) {
                    $scope.item.showJabatanHistori = false;

                    toastr.warning("Harap pilih Pegawai terlebih dahulu", "Peringatan");
                    return;
                }

                if ($scope.item.showJabatanHistori) {
                    $scope.item.srcJabatan = undefined;
                    $scope.listJabatan = [];
                    ManageSdmNew.getListData("pegawai/jabatan-logbook-kinerja?pegawaiId=" + id + "&bulan=" + ($scope.item.srcBulan ? dateHelper.toTimeStamp($scope.item.srcBulan) : '')).then((res) => {
                        $scope.listJabatan = res.data.data;
                    });
                } else {
                    $scope.item.srcJabatan = undefined;
                    $scope.listJabatan = [];
                    ManageSdmNew.getListData("pegawai/jabatan-kontrak-verif-kinerja?pegawaiId=" + id + "&pegawaiLoginId=" + dataPegawai.id).then((res) => {
                        $scope.listJabatan = res.data.data;
                    });
                }
            }
        }
    ])
});