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
                { name: 'Ketua/ Kepala Komite/ Satuan/ Instalasi/ Unit/ Bagian/ KSM/ Bidang/ Koordinator', id: 3 },
                { name: 'Kepala Ruangan/ Kepala Seksi/ Kepala Subbagian/ Subkoordinator/ Pengelola Urusan (dengan staf)/ Penanggung Jawab', id: 4 },
                { name: 'Staf/ Ketua Tim', id: 5 }
            ];
            $scope.levelDireksi = [
                { name: 'Direktorat Keuangan dan Barang Milik Negara', id: 4 },
                { name: 'Direktorat Pelayanan Medik, Keperawatan, dan Penunjang', id: 1 },
                { name: 'Direktorat Perencanaan, Organisasi, dan Umum', id: 2 },
                { name: 'Direktorat Sumber Daya Manusia, Pendidikan, dan Penelitian', id: 3 },
                { name: 'Direktur Utama', id: 5 }
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
                        if ($(this).text() == 'Direktur Utama') {
                            $(this).addClass('du')
                        };
                    })
                },
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "id",
                    title: "Kode",
                    width: 50
                }, {
                    field: "namaJabatan",
                    title: "Nama Jabatan",
                    width: 150

                }, {
                    field: "kelompokJabatan",
                    title: "Kelompok Jabatan ",
                    width: 120
                }, {
                    field: "jenisJabatan",
                    title: "Jenis Jabatan ",
                    width: 120
                }, {
                    field: "eselon",
                    title: "Eselon ",
                    width: 70
                }, {
                    field: "unitKerja",
                    title: "Unit Kerja",
                    width: 120
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
                        { value: "Nama Jabatan" },
                        { value: "Kelompok Jabatan" },
                        { value: "Jenis Jabatan" },
                        { value: "Eselon" },
                        { value: "Unit Kerja" },
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
                                { value: data[i].namaJabatan },
                                { value: data[i].kelompokJabatan },
                                { value: data[i].jenisJabatan },
                                { value: data[i].eselon },
                                { value: data[i].unitKerja },
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
                    jabatanId: dataItem.id
                }

                if (dataItem.levelDireksi) {
                    $scope.data.levelDireksi = {
                        id: dataItem.levelDireksi,
                        name: dataItem.levelDireksiFormatted
                    }
                }

                if (dataItem.levelJabatan) {
                    $scope.data.levelJabatan = {
                        id: dataItem.levelJabatan,
                        name: dataItem.levelJabatanFormatted
                    }
                }

                if (dataItem.kelompokJabatan) {
                    $scope.data.kelompokJabatan = {
                        id: dataItem.kelompokJabatanId,
                        namaKelompokJabatan: dataItem.kelompokJabatan
                    }
                }

                if (dataItem.jenisJabatan) {
                    $scope.data.jenisJabatan = {
                        id: dataItem.jenisJabatanId,
                        jenisJabatan: dataItem.jenisJabatan
                    }
                }

                if (dataItem.unitKerja) {
                    $scope.data.unitKerja = {
                        name: dataItem.unitKerja,
                        id: dataItem.unitKerjaId
                    }
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
                    jabatanId: dataItem.id,
                    namaJabatan: dataItem.namaJabatan
                }

                var listKJ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                if (listKJ.includes(dataItem.kelompokJabatanId)) {
                    $scope.data.kelompokJabatan = {
                        id: dataItem.kelompokJabatanId,
                        namaKelompokJabatan: dataItem.kelompokJabatan
                    }
                }

                var listJJ = [7, 8, 9]
                if (listJJ.includes(dataItem.jenisJabatanId)) {
                    $scope.data.jenisJabatan = {
                        id: dataItem.jenisJabatanId,
                        jenisJabatan: dataItem.jenisJabatan
                    }
                }

                if (dataItem.eselon && dataItem.eselonId != 0) {
                    $scope.data.eselon = {
                        id: dataItem.eselonId,
                        eselon: dataItem.eselon
                    }
                }

                if (dataItem.unitKerja && dataItem.unitKerjaId != 0) {
                    $scope.data.unitKerja = {
                        id: dataItem.unitKerjaId,
                        name: dataItem.unitKerja
                    }
                }

                if (dataItem.levelJabatan) {
                    $scope.data.levelJabatan = {
                        id: dataItem.levelJabatan,
                        name: dataItem.levelJabatanFormatted
                    }
                }

                if (dataItem.levelDireksi) {
                    $scope.data.levelDireksi = {
                        id: dataItem.levelDireksi,
                        name: dataItem.levelDireksiFormatted
                    }
                }
                // console.log(dataItem)
                $scope.isEdit = true
                $scope.popupTambah.open().center();
            }

            $scope.getDataJabatan = () => {
                $scope.isRouteLoading = true;

                ManageSdmNew.getListData("jabatan/get-master-jabatan?namaJabatan=" + ($scope.item.namaJabatan ? $scope.item.namaJabatan : "")
                    + "&jenisJabatanId=" + ($scope.item.jenisJabatan ? $scope.item.jenisJabatan.id : "")
                    + "&unitKerjaId=" + ($scope.item.unitKerja ? $scope.item.unitKerja.id : "")).then((res) => {
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
                                } else if (res.data.data[i].levelDireksi === 5) {
                                    res.data.data[i].levelDireksiFormatted = "Direktur Utama";
                                } else {
                                    res.data.data[i].levelDireksiFormatted = "";
                                }

                                if (res.data.data[i].levelJabatan === 1) {
                                    res.data.data[i].levelJabatanFormatted = "Direktur Utama";
                                } else if (res.data.data[i].levelJabatan === 2) {
                                    res.data.data[i].levelJabatanFormatted = "Direktur";
                                } else if (res.data.data[i].levelJabatan === 3) {
                                    res.data.data[i].levelJabatanFormatted = "Ketua/ Kepala Komite/ Satuan/ Instalasi/ Unit/ Bagian/ KSM/ Bidang/ Koordinator";
                                } else if (res.data.data[i].levelJabatan === 4) {
                                    res.data.data[i].levelJabatanFormatted = "Kepala Ruangan/ Kepala Seksi/ Kepala Subbagian/ Subkoordinator/ Pengelola Urusan (dengan staf)/ Penanggung Jawab";
                                } else if (res.data.data[i].levelJabatan === 5) {
                                    res.data.data[i].levelJabatanFormatted = "Staf/ Ketua Tim";
                                } else {
                                    res.data.data[i].levelJabatanFormatted = "";
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

                ManageSdmNew.getListData("service/list-generic/?view=KelompokJabatan&select=id,namaKelompokJabatan&criteria=statusEnabled,id&values=true,(1;2;3;4;5;6;7;8;9;10)&order=namaKelompokJabatan:asc", true).then(res => {
                    $scope.listKelompokJabatan = res.data;
                });

                ManageSdmNew.getListData("service/list-generic/?view=JenisJabatan&select=id,jenisJabatan&criteria=statusEnabled,id&values=true,!0&order=jenisJabatan:asc", true).then(res => {
                    $scope.listJenisJabatan = res.data;
                });

                ManageSdmNew.getListData("service/list-generic/?view=JenisJabatan&select=id,jenisJabatan&criteria=statusEnabled,id&values=true,(7;8;9)&order=jenisJabatan:asc", true).then(res => {
                    $scope.listEntriJenisJabatan = res.data;
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
                $scope.reset();
                $scope.popupTambah.open().center();
            }

            $scope.simpanData = (method) => {
                var listRawRequired = [
                    "data.levelDireksi|ng-model|Level Direksi",
                    "data.levelJabatan|ng-model|Level Jabatan",
                    "data.unitKerja|k-ng-model|Unit Kerja",
                    "data.jenisJabatan|k-ng-model|Jenis Jabatan",
                    "data.kelompokJabatan|k-ng-model|Kelompok Jabatan",
                    "data.namaJabatan|k-ng-model|Nama Jabatan"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if ((isValid.status && method == "simpan") || method == "hapus") {
                    let statusEnabled = method === "simpan";

                    let dataSave = {
                        namaJabatan: $scope.data.namaJabatan,
                        levelJabatan: $scope.data.levelJabatan.id,
                        subLevelJabatan: $scope.data.levelDireksi.id,
                        kdProfile: 0,
                        statusEnabled: statusEnabled
                    }

                    if ($scope.data.kelompokJabatan) {
                        dataSave.kelompokJabatan = {
                            id: $scope.data.kelompokJabatan.id
                        }
                    }

                    if ($scope.data.jenisJabatan) {
                        dataSave.jenisJabatan = {
                            id: $scope.data.jenisJabatan.id
                        }
                    }

                    if ($scope.data.unitKerja) {
                        dataSave.unitKerja = {
                            id: $scope.data.unitKerja.id
                        }
                    }

                    if ($scope.data.eselon) {
                        dataSave.eselon = {
                            id: $scope.data.eselon.id
                        }
                    }

                    if ($scope.data.jabatanId) {
                        dataSave.id = $scope.data.jabatanId;
                    }

                    if ($scope.msgIsDuplikatData != "" && $scope.isEdit) {
                        toastr.warning($scope.msgIsDuplikatData + ", mohon untuk memberi Nama Jabatan unik/ sesuai Unit Kerja", "Peringatan")
                        return
                    } else if ($scope.msgIsDuplikatData != "" && !$scope.isHapus) {
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
                $scope.data.kelompokJabatan = null;
                $scope.data.jenisJabatan = null;
                $scope.data.unitKerja = null;
                $scope.data.eselon = null;
                $scope.data.levelDireksi = null;
                $scope.data.levelJabatan = null;
                $scope.isEdit = false;
                $scope.isHapus = false;
            }

            $scope.$watch('data.namaJabatan', function (e) {
                if (!e) return;
                if (!$scope.data.namaJabatan && !$scope.data.jenisJabatan.id) return

                $scope.msgIsDuplikatData = ""
                ManageSdmNew.getListData("jabatan/validate-nama-jabatan/?idJabatan=" + ($scope.data.jabatanId ? $scope.data.jabatanId : "")
                    + "&namaJabatan=" + encodeURIComponent($scope.data.namaJabatan).replace(/%20/g, "+")
                    + "&idJenisJabatan=" + $scope.data.jenisJabatan.id, true).then(function (dat) {
                        if (dat.data.data.msg) {
                            $scope.msgIsDuplikatData = dat.data.data.msg
                        }
                    });
            })

            $scope.$watch('data.jenisJabatan', function (e) {
                if (!e) return;
                if (!$scope.data.namaJabatan && !$scope.data.jenisJabatan.id) return

                $scope.msgIsDuplikatData = ""
                ManageSdmNew.getListData("jabatan/validate-nama-jabatan/?idJabatan=" + ($scope.data.jabatanId ? $scope.data.jabatanId : "")
                    + "&namaJabatan=" + encodeURIComponent($scope.data.namaJabatan).replace(/%20/g, "+")
                    + "&idJenisJabatan=" + $scope.data.jenisJabatan.id, true).then(function (dat) {
                        if (dat.data.data.msg) {
                            $scope.msgIsDuplikatData = dat.data.data.msg
                        }
                    });
            })
        }
    ]);
});