define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MasterJabatanRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'NamaAsuransi', 'ManageSdm', 'ManageSdmNew', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, NamaAsuransi, ManageSdm, ManageSdmNew, $timeout, $mdDialog) {
            $scope.item = {};
            $scope.data = {};
            $scope.msgIsDuplikatData = ""
            $scope.isEdit = false;
            $scope.isHapus = false;
            $scope.levelJabatan = [
                { name: 'Direktur Utama', id: 1 },
                { name: 'Direktur', id: 2 },
                { name: 'Ketua/ Kepala Komite/ Satuan/ Instalasi/ Unit/ Bagian/ KSM/ Bidang', id: 3 },
                { name: 'Kepala Ruangan/ Kepala Seksi/ Kepala Subbagian/ Pengelola Urusan', id: 4 },
                { name: 'Staf/ Ketua Tim', id: 5 }
            ];
            $scope.levelDireksi = [
                { name: 'Direktorat Pelayanan Medik, Keperawatan, dan Penunjang', id: 1 },
                { name: 'Direktorat Perencanaan, Organisasi, dan Umum', id: 2 },
                { name: 'Direktorat Sumber Daya Manusia, Pendidikan, dan Penelitian', id: 3 },
                { name: 'Direktorat Keuangan dan Barang Milik Negara', id: 4 }
            ];

            $scope.daftarJabatanOpt = {
                toolbar: [{
                    text: "export",
                    name: "Tambah",
                    template: '<button ng-click="showInputData()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>'
                }, {
                    text: "export",
                    name: "Tambah",
                    template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                }],
                dataBound: function (e) {
                    $('td').each(function () {
                        if ($(this).text() == 'Direktorat Pelayanan Medik, Keperawatan, dan Penunjang') {
                            $(this).addClass('dmk')
                        };
                        if ($(this).text() == 'Direktorat Perencanaan, Organisasi, dan Umum') {
                            $(this).addClass('dpou')
                        };
                        if ($(this).text() == 'Direktorat Sumber Daya Manusia, Pendidikan, dan Penelitian') {
                            $(this).addClass('dsp')
                        };
                        if ($(this).text() == 'Direktorat Keuangan dan Barang Milik Negara') {
                            $(this).addClass('dkbmn')
                        };
                    })
                },
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "id",
                    title: "Kode",
                    width: 90
                }, {
                    field: "unitKerja",
                    title: "Unit Kerja",
                    width: 120
                }, {
                    field: "jenisJabatanId",
                    title: "Jenis Jabatan ",
                    template: "# if (jenisJabatanId === 1) {# #= 'Fungsional' # #} else if (jenisJabatanId === 3){# #= 'Internal' # #} else if (jenisJabatanId === 5){# #= 'Struktural' # #} else {# #= '-' # #}#",
                    width: 120
                }, {
                    field: "namaJabatan",
                    title: "Nama Jabatan",
                    width: 150
                }, {
                    field: "eselonId",
                    title: "Eselon ",
                    template: "# if (eselonId === 1) {# #= 'I.a' # #} else if (eselonId === 2){# #= 'I.b' # #} else if (eselonId === 3){# #= 'II.a' # #} else if (eselonId === 4){# #= 'II.b' # #} else if (eselonId === 5){# #= 'III.a' # #} else if (eselonId === 6){# #= 'III.b' # #} else if (eselonId === 7){# #= 'IV.a' # #} else if (eselonId === 8){# #= 'IV.b' # #} else if (eselonId === 9){# #= 'V.a' # #} else if (eselonId === 10){# #= 'V.b' # #} else {# #= '-' # #}#",
                    width: 70
                }, {
                    field: "levelJabatanFormatted",
                    title: "Level Jabatan ",
                    width: 100
                }, {
                    field: "levelDireksiFormatted",
                    title: "Level Direksi ",
                    width: 150
                }, {
                    command: [{
                        text: "Hapus",
                        click: hapusData,
                        imageClass: "k-icon k-i-cancel"
                    }, {
                        text: "Edit",
                        click: editData,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: 120
                }]
            };

            $scope.exportExcel = function () {
                var tempDataExport = [];
                var rows = [{
                    cells: [
                        { value: "Kode" },
                        { value: "Unit Kerja" },
                        { value: "Jenis Jabatan" },
                        { value: "Nama Jabatan" },
                        { value: "Eselon" },
                        { value: "Level Jabatan" },
                        { value: "Level Direksi" },
                    ]
                }];

                tempDataExport = $scope.daftarJabatan;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    for (var i = 0; i < data.length; i++) {
                        rows.push({
                            cells: [
                                { value: data[i].id },
                                { value: data[i].unitKerja },
                                { value: data[i].jenisJabatan },
                                { value: data[i].namaJabatan },
                                { value: data[i].eselon },
                                { value: data[i].levelJabatanFormatted },
                                { value: data[i].levelDireksiFormatted }
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            freezePane: {
                                rowSplit: 1
                            },
                            columns: [
                                { autoWidth: true },
                                { autoWidth: true },
                                { autoWidth: true },
                                { autoWidth: true },
                                { autoWidth: true },
                                { autoWidth: true },
                                { autoWidth: true }],
                            // Title of the sheet
                            title: "Master Jabatan",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "master-jabatan-rsabhk.xlsx"
                    });
                });
            };

            function hapusData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                $scope.data = {
                    namaJabatan: dataItem.namaJabatan,
                    levelDireksi: {
                        id: dataItem.levelDireksi,
                        name: dataItem.levelDireksiFormatted
                    },
                    levelJabatan: {
                        name: dataItem.levelJabatanFormatted,
                        id: dataItem.levelJabatan
                    },
                    jenisJabatan: {
                        jenisJabatan: dataItem.jenisJabatan,
                        id: dataItem.jenisJabatanId
                    },
                    unitKerja: {
                        name: dataItem.unitKerja,
                        id: dataItem.unitKerjaId
                    },
                    jabatanId: dataItem.id
                }

                if (dataItem.eselon) {
                    $scope.data.eselon = {
                        id: dataItem.eselonId
                    }
                }

                ManageSdmNew.getListData("jabatan/get-pegawai-jabatan?jabatanId=" + dataItem.id).then((res) => {
                    if (res.data.data.length > 0) {
                        toastr.warning("Data sudah digunakan, tidak dapat dihapus!", "Peringatan")
                        return
                    } else {
                        var confirm = $mdDialog.confirm()
                            .title('Apakah anda yakin menghapus Jabatan ' + dataItem.namaJabatan + '?')
                            .ariaLabel('Lucky day')
                            .targetEvent(e)
                            .ok('Ya')
                            .cancel('Tidak');
                        $mdDialog.show(confirm).then(function () {
                            $scope.isHapus = true
                            $scope.simpanData('hapus');
                        }, function () {
                            $scope.reset();
                        });
                    }
                })
            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                $scope.data = {
                    namaJabatan: dataItem.namaJabatan,
                    levelDireksi: {
                        id: dataItem.levelDireksi,
                        name: dataItem.levelDireksiFormatted
                    },
                    levelJabatan: {
                        name: dataItem.levelJabatanFormatted,
                        id: dataItem.levelJabatan
                    },
                    jenisJabatan: {
                        jenisJabatan: dataItem.jenisJabatan,
                        id: dataItem.jenisJabatanId
                    },
                    unitKerja: {
                        name: dataItem.unitKerja,
                        id: dataItem.unitKerjaId
                    },
                    jabatanId: dataItem.id
                }

                if (dataItem.eselon) {
                    $scope.data.eselon = {
                        id: dataItem.eselonId,
                        eselon: dataItem.eselon
                    }
                }
                // console.log(dataItem)
                $scope.isEdit = true
                $scope.popupTambah.open().center();
            }

            $scope.getDataJabatan = () => {
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("jabatan/get-master-jabatan?namaJabatan=" + ($scope.item.namaJabatan ? $scope.item.namaJabatan : "") + "&jenisJabatanId=" + ($scope.item.jenisJabatan ? $scope.item.jenisJabatan.id : "") + "&unitKerjaId=" + ($scope.item.unitKerja ? $scope.item.unitKerja.id : "")).then((res) => {
                    var resData = []
                    for (let i = 0; i < res.data.data.length; i++) {
                        if (!res.data.data[i].id == 0) {
                            if (res.data.data[i].levelDireksi === 1) {
                                res.data.data[i].levelDireksiFormatted = "Direktorat Pelayanan Medik, Keperawatan, dan Penunjang";
                            } else if (res.data.data[i].levelDireksi === 2) {
                                res.data.data[i].levelDireksiFormatted = "Direktorat Perencanaan, Organisasi, dan Umum";
                            } else if (res.data.data[i].levelDireksi === 3) {
                                res.data.data[i].levelDireksiFormatted = "Direktorat Sumber Daya Manusia, Pendidikan, dan Penelitian";
                            } else if (res.data.data[i].levelDireksi === 4) {
                                res.data.data[i].levelDireksiFormatted = "Direktorat Keuangan dan Barang Milik Negara";
                            }

                            if (res.data.data[i].levelJabatan === 1) {
                                res.data.data[i].levelJabatanFormatted = "Direktur Utama";
                            } else if (res.data.data[i].levelJabatan === 2) {
                                res.data.data[i].levelJabatanFormatted = "Direktur";
                            } else if (res.data.data[i].levelJabatan === 3) {
                                res.data.data[i].levelJabatanFormatted = "Ketua/ Kepala Komite/ Satuan/ Instalasi/ Unit/ Bagian/ KSM/ Bidang";
                            } else if (res.data.data[i].levelJabatan === 4) {
                                res.data.data[i].levelJabatanFormatted = "Kepala Ruangan/ Kepala Seksi/ Kepala Subbagian/ Pengelola Urusan";
                            } else if (res.data.data[i].levelJabatan === 5) {
                                res.data.data[i].levelJabatanFormatted = "Staf/ Ketua Tim";
                            } else {
                                res.data.data[i].levelJabatanFormatted = "-";
                            }

                            resData.push(res.data.data[i]);
                        }
                    }
                    $scope.daftarJabatan = new kendo.data.DataSource({
                        data: resData,
                        pageSize: 50
                    })
                    $scope.isRouteLoading = false;
                })
            }

            let init = () => {
                $scope.getDataJabatan();
                ManageSdmNew.getListData("service/list-generic/?view=JenisJabatan&select=id,jenisJabatan&criteria=statusEnabled,id&values=true,!0&order=jenisJabatan:asc", true).then(res => {
                    $scope.listJenisJabatan = res.data;
                });

                ManageSdmNew.getListData("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=statusEnabled,id&values=true,!0&order=jenisJabatan:asc", true).then(res => {
                    $scope.listUnitKerja = res.data;
                })

                ManageSdmNew.getListData("service/list-generic/?view=Eselon&select=id,eselon&criteria=statusEnabled,id&values=true,!0&order=eselon:asc", true).then(res => {
                    $scope.listEselon = res.data;
                })
            }

            init();

            $scope.showInputData = () => {
                $scope.popupTambah.open().center();
            }

            $scope.simpanData = (method) => {
                var listRawRequired = [
                    "data.levelDireksi|ng-model|Level Direksi",
                    "data.levelJabatan|ng-model|Level Jabatan",
                    "data.unitKerja|k-ng-model|Unit Kerja"

                ];

                if ($scope.data.jenisJabatan && $scope.data.jenisJabatan.id == 1) {
                    listRawRequired.push(
                        "data.eselon|k-ng-model|Eselon",
                        "data.jenisJabatan|k-ng-model|Jenis Jabatan",
                        "data.namaJabatan|k-ng-model|Nama Jabatan"
                    )
                } else {
                    listRawRequired.push(
                        "data.jenisJabatan|k-ng-model|Jenis Jabatan",
                        "data.namaJabatan|k-ng-model|Nama Jabatan"
                    )
                }

                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if (isValid.status) {
                    let statusEnabled = method === "simpan";

                    let dataSave = {
                        namaJabatan: $scope.data.namaJabatan,
                        levelJabatan: $scope.data.levelJabatan.id,
                        subLevelJabatan: $scope.data.levelDireksi.id,
                        jenisJabatan: {
                            id: $scope.data.jenisJabatan.id
                        },
                        unitKerja: {
                            id: $scope.data.unitKerja.id
                        },
                        kdProfile: 0,
                        statusEnabled: statusEnabled
                    }

                    if ($scope.data.eselon) {
                        dataSave.eselon = {
                            id: $scope.data.eselon.id
                        }
                    }

                    if ($scope.data.jabatanId) {
                        dataSave.id = $scope.data.jabatanId;
                    }

                    if ($scope.msgIsDuplikatData != "" && !$scope.isHapus) {
                        toastr.warning($scope.msgIsDuplikatData, "Peringatan")
                        return
                    }

                    // console.log(dataSave);
                    ManageSdmNew.saveData(dataSave, "jabatan/save-master-jabatan").then(function (e) {
                        $scope.reset();
                        $scope.closepopupTambah();
                        $scope.getDataJabatan();
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            $scope.closepopupTambah = () => {
                $scope.popupTambah.close();
            }

            $scope.reset = () => {
                $scope.data.jabatanId = null;
                $scope.data.namaJabatan = null;
                $scope.data.jenisJabatan = null;
                $scope.data.unitKerja = null;
                $scope.data.eselon = null;
                $scope.data.levelDireksi = null;
                $scope.data.levelJabatan = null;
                $scope.isEdit = false;
                $scope.isHapus = false;
                $scope.isJabInternal = false;
            }

            $scope.$watch('data.namaJabatan', function (e) {
                if (!e) return;
                if (!$scope.data.namaJabatan && !$scope.data.jenisJabatan.id) return
                $scope.msgIsDuplikatData = ""
                ManageSdmNew.getListData("jabatan/validate-nama-jabatan/?idJabatan=" + ($scope.data.jabatanId ? $scope.data.jabatanId : "") + "&namaJabatan=" + encodeURIComponent($scope.data.namaJabatan).replace(/%20/g, "+") + "&idJenisJabatan=" + $scope.data.jenisJabatan.id, true).then(function (dat) {
                    if (dat.data.data.msg) {
                        $scope.msgIsDuplikatData = dat.data.data.msg
                    }
                });
            })

            $scope.$watch('data.jenisJabatan', function (e) {
                if (!e) return;
                if ($scope.data.jenisJabatan.id == 3) {
                    //Jenis jabatan internal tidak boleh mengisi eselon
                    $scope.isJabInternal = true
                    $scope.data.eselon = null
                } else {
                    $scope.isJabInternal = false
                }
                if (!$scope.data.namaJabatan && !$scope.data.jenisJabatan.id) return
                $scope.msgIsDuplikatData = ""
                ManageSdmNew.getListData("jabatan/validate-nama-jabatan/?idJabatan=" + ($scope.data.jabatanId ? $scope.data.jabatanId : "") + "&namaJabatan=" + encodeURIComponent($scope.data.namaJabatan).replace(/%20/g, "+") + "&idJenisJabatan=" + $scope.data.jenisJabatan.id, true).then(function (dat) {
                    if (dat.data.data.msg) {
                        $scope.msgIsDuplikatData = dat.data.data.msg
                    }
                });
            })
        }
    ]);
});