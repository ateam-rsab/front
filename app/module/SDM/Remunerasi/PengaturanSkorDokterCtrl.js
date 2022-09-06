define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PengaturanSkorDokterCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.isEdit = false;
            $scope.isVerifStaf = false
            $scope.isDuplicated = false
            $scope.desc = {};
            var userLogin = JSON.parse(localStorage.getItem('datauserlogin'));
            var pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));

            const tglBerlaku = new Date();
            tglBerlaku.setFullYear(2020, 0, 1);
            $scope.item.tglBerlaku = tglBerlaku;
            $scope.desc.tglBerlaku = tglBerlaku;

            $scope.angkaFormatter = new Intl.NumberFormat('id-ID');

            $scope.listStatusVerif = [{
                id: 0,
                statusVerif: "Belum Verifikasi"
            }, {
                id: 1,
                statusVerif: "Terverifikasi"
            }]

            $('#idSkor,#idDescSkor').on('change, keyup', function () {
                var currentInput = $(this).val();
                var fixedInput = currentInput.replace(/[^\d.-]/g, '');
                $(this).val(fixedInput);
            });

            $scope.optGridSkoringTindakan = {
                toolbar: [{
                    text: "export",
                    name: "Tambah",
                    template: '<button ng-click="tambahData()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>'
                }, {
                    text: "export",
                    name: "Export Excel",
                    template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export Excel</button>'
                }],
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
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "kelompokKerja",
                    title: "<h3>Kelompok Kerja</h3>",
                    width: 120
                }, {
                    field: "namaProduk",
                    title: "<h3>Tindakan</h3>",
                    width: 150
                    // }, {
                    //     field: "detailProduk",
                    //     title: "<h3>Tindakan Untuk<br/>Skoring</h3>",
                    //     width: 170
                }, {
                    field: "skor",
                    title: "<h3>Skor</h3>",
                    width: 50,
                    attributes: {
                        style: "text-align: right;"
                    },
                    template: "<span>{{angkaFormatter.format('#= skor #')}}</span>"
                }, {
                    field: "tglMulaiBerlaku",
                    title: "<h3>Tanggal<br/>Berlaku</h3>",
                    width: 80
                }, {
                    field: "statusVerifikasi",
                    title: "<h3>Status</h3>",
                    width: 80
                }, {
                    command: [{
                        text: "Edit",
                        click: editData,
                        imageClass: "k-icon k-i-pencil"
                    }, {
                        text: "Hapus",
                        click: hapusData,
                        imageClass: "k-icon k-i-cancel"
                    }],
                    title: "",
                    width: 150
                }],
            };

            $scope.exportExcel = () => {
                var tempDataExport = [];
                var rows = [
                    {
                        cells: [
                            { value: "Kelompok Kerja" },
                            { value: "Tindakan" },
                            // { value: "Tindakan Untuk Skoring" },
                            { value: "Skor" },
                            { value: "Tanggal Berlaku" },
                            { value: "Status" }
                        ]
                    }
                ];

                tempDataExport = $scope.dataSourceSkoring;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].kelompokKerja },
                                { value: data[i].namaProduk },
                                // { value: data[i].detailProduk },
                                { value: data[i].skor },
                                { value: data[i].tglMulaiBerlaku },
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
                                    // { autoWidth: true },
                                    // { autoWidth: true },
                                    // { autoWidth: true },
                                    // { autoWidth: true },
                                    { autoWidth: true }
                                ],
                                // Title of the sheet
                                // title: "Skoring Tindakan Medis " + pegawaiLogin.nama,
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "skoring-tindakan-medis " + pegawaiLogin.nama + ".xlsx" });
                });

            }

            $scope.optGridSkoringTindakanNoSkoring = {
                pageable: true,
                scrollable: true,
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
                columns: [{
                    field: 'Daftar',
                    title: '<h3 align=center>Daftar Tindakan Belum Ada Skor<h3>',
                    headerAttributes: {
                        style: 'text-align : center'
                    },
                    columns: [
                        {
                            field: "kelompokKerja",
                            title: "<h3>Kelompok Kerja</h3>",
                            width: 100
                        }, {
                            field: "produkId",
                            title: "<h3>ID</h3>",
                            width: 75
                        }, {
                            field: "produk",
                            title: "<h3>Tindakan</h3>",
                            width: 150
                        }]
                }]
            }

            $scope.getAllData = () => {
                $scope.isRouteLoading = true;
                // var listKK = []

                // if ($scope.item.srcKelompokKerja) {
                //     listKK.push($scope.item.srcKelompokKerja.id)
                // } else {
                //     listKK = $scope.listKk
                // }

                ManageSdmNew.getListData("iki-remunerasi/get-tindakan-belum-ada-skor?listKelompokKerjaId=" + $scope.listKk).then((res) => {
                    $scope.dataSourceTindakanNoSkoring = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 100
                    })
                }, function (error) {
                    $scope.isRouteLoading = false;
                })

                ManageSdmNew.getListData("iki-remunerasi/get-all-skoring-tindakan-medis?listKelompokKerjaId=" + $scope.listKk
                    + "&namaProduk=" + ($scope.item.srcNamaProduk ? $scope.item.srcNamaProduk.namaProduk : "")
                    + "&detailProduk=" + ($scope.item.srcDetailTindakan ? $scope.item.srcDetailTindakan : "")
                    + "&tglMulaiBerlaku=" + ($scope.item.srcTglBerlaku ? dateHelper.toTimeStamp($scope.item.srcTglBerlaku) : "")
                    + "&isStatusVerifikasi=" + ($scope.item.srcStatusVerif ? ($scope.item.srcStatusVerif.id == 1 ? true : false) : "")).then((res) => {
                        $scope.dataSourceSkoring = new kendo.data.DataSource({
                            data: res.data.data,
                            pageSize: 20
                        });

                        $scope.isRouteLoading = false;
                    }, function (error) {
                        $scope.isRouteLoading = false;
                    })
            }

            $scope.onClickDataTindakanNoSkoring = (data) => {
                if (!data.produkId || !data.kelompokKerjaId) return;

                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("iki-remunerasi/get-deskripsi-tindakan-skor-medis?produkId=" + data.produkId + "&kelompokKerjaId=" + data.kelompokKerjaId).then((res) => {
                    $scope.isRouteLoading = false;
                    $scope.showDesc = true;
                    res.data.data.produkId = data.produkId;
                    $scope.desc = res.data.data;
                    $scope.desc.kelompokKerja = {
                        "id": data.kelompokKerjaId,
                        "name": data.kelompokKerja
                    }
                    $scope.desc.namaProduk = data.produk
                    $scope.desc.isVerified = false

                    $scope.desc.tglBerlaku = tglBerlaku

                    $scope.isRouteLoading = false;
                }, function (error) {
                    $scope.isRouteLoading = false;
                })
            }

            let init = () => {
                ManageSdmNew.getListData("iki-remunerasi/get-akses-skoring-tindakan-medis?pegawaiId=" + pegawaiLogin.id).then((res) => {
                    var listUK = ""
                    if (!_.isEmpty(res.data.data)) {
                        $scope.listId = res.data.data.listId
                        $scope.listKk = res.data.data.listKk
                        $scope.isStaf = res.data.data.isStaf
                        $scope.isAtasan = res.data.data.isAtasan
                        $scope.isSuperuser = res.data.data.isSuperuser

                        listUK = res.data.data.listId.join(";")
                        if (res.data.data.isStaf) {
                            $scope.isVerifHidden = true
                            $scope.isHapusGranted = false
                            $scope.isTambahGranted = true
                        } else if (res.data.data.isAtasan || res.data.data.isSuperuser) {
                            $scope.isVerifHidden = false
                            $scope.isHapusGranted = true
                            $scope.isTambahGranted = true
                        } else {
                            $scope.isVerifHidden = true
                            $scope.isHapusGranted = false
                            $scope.isTambahGranted = false
                        }
                    } else {
                        $scope.listId = [58, 59, 60, 61, 62, 63, 82]
                        $scope.listKk = []
                        listUK = "58;59;60;61;62;63;82"
                    }

                    $scope.getAllData();

                    ManageSdmNew.getListData("service/list-generic/?view=UnitKerjaPegawai&select="
                        + "id,name&criteria=id,statusEnabled&values=(" + listUK + "),true&order=name:asc").then((rsUK) => {
                            $scope.listUnitKerjKSM = rsUK.data;
                        });

                    ManageSdmNew.getListData("service/list-generic/?view=SubUnitKerjaPegawai&select="
                        + "id,name&criteria=statusEnabled,unitKerjaId,name&values=true,(" + listUK + "),KK&order=name:asc").then((rsSK) => {
                            $scope.listKKMedis = rsSK.data;
                        });
                });

                ManageSdmNew.getListData("service/list-generic/?view=Departemen&select="
                    + "id,namaDepartemen&criteria=statusEnabled,id&values=true,(3;16;18;24;25;26;27;28;35)&order=namaDepartemen:asc").then((res) => {
                        $scope.listDepartemen = res.data;
                    });
            }

            init();

            $scope.tambahData = () => {
                if (!$scope.isTambahGranted && !pegawaiLogin.id == 320263) {
                    toastr.warning("Tidak memiliki akses menambah data!")
                    return
                }

                $scope.reset();
                $scope.isEdit = false
                $scope.isVerifStaf = false
                $scope.listRuangan = []
                $scope.listNamaProduk = []
                $scope.listKelompokKerja = []
                $scope.popupTambah.open().center();
            }

            function hapusData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (!$scope.listId.includes(dataItem.unitKerjaId)) {
                    toastr.warning("Tidak memiliki akses menghapus data!");
                    return
                } else if (!$scope.isHapusGranted) {
                    if (dataItem.isStatusVerifikasi) {
                        toastr.warning("Mapping skor sudah terverifikasi");
                        return
                    } else {
                        toastr.warning("Tidak memiliki akses menghapus data!");
                        return
                    }
                } else if (dataItem.isStatusVerifikasi) {
                    toastr.warning("Mapping skor sudah terverifikasi");
                    return
                }

                $scope.item.namaProduk = {
                    id: dataItem.produkId,
                    namaProduk: dataItem.namaProduk
                }
                $scope.item.unitKerja = {
                    id: dataItem.unitKerjaId,
                    name: dataItem.unitKerja
                }

                $scope.item.kelompokKerja = {
                    id: dataItem.kelompokKerjaId,
                    name: dataItem.kelompokKerja
                }

                $scope.norecData = dataItem.noRec;

                $scope.item.tglBerlaku = new Date(dataItem.tglMulaiBerlaku);
                $scope.item.skor = dataItem.skor
                // $scope.item.detailTindakan = dataItem.detailProduk;
                $scope.item.detailTindakan = dataItem.namaProduk;

                $scope.item.statusVerif = dataItem.isStatusVerifikasi;
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin menghapus data?')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.saveData('delete', false);
                }, function () {
                    $scope.reset();
                });
            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var listProduk = []

                if (!$scope.listId.includes(dataItem.unitKerjaId)) {
                    toastr.warning("Tidak memiliki akses mengubah data!")
                    return
                }

                $scope.isEdit = true
                if (dataItem.isStatusVerifikasi && $scope.isStaf) {
                    $scope.isVerifStaf = true
                } else {
                    $scope.isVerifStaf = false
                }
                $scope.item.namaProduk = {
                    id: dataItem.produkId,
                    namaProduk: dataItem.namaProduk
                }
                listProduk.push($scope.item.namaProduk)
                $scope.listNamaProduk = listProduk
                $scope.item.unitKerja = {
                    id: dataItem.unitKerjaId,
                    name: dataItem.unitKerja
                }
                $scope.getDataKelompokKerja(dataItem.unitKerjaId);
                $scope.item.kelompokKerja = {
                    id: dataItem.kelompokKerjaId,
                    name: dataItem.kelompokKerja
                }

                $scope.norecData = dataItem.noRec;

                $scope.item.tglBerlaku = new Date(dataItem.tglMulaiBerlaku);
                $scope.item.skor = dataItem.skor
                // $scope.item.detailTindakan = dataItem.detailProduk;
                $scope.item.detailTindakan = dataItem.namaProduk;

                $scope.item.statusVerif = dataItem.isStatusVerifikasi;

                $scope.popupTambah.open().center();
            }

            $scope.saveData = (method, isNotScored) => {
                var listRawRequired = isNotScored ? [
                    "desc.skor|ng-model|Skor",
                    "desc.tglBerlaku|ng-model|Tanggal Berlaku"
                ] : [
                    "item.tglBerlaku|ng-model|Tanggal Berlaku",
                    "item.kelompokKerja|ng-model|Kelompok Kerja",
                    "item.skor|ng-model|Skor",
                    // "item.detailTindakan|ng-model|Tindakan Untuk Skoring",
                    "item.namaProduk|k-ng-model|Tindakan"
                ];

                $scope.isRouteLoading = true;
                var isValid = modelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    let statusEnabled = method === 'save' || method === 'update';

                    let dataSave = {
                        // detailProduk: isNotScored ? $scope.desc.namaProduk : $scope.item.detailTindakan,
                        detailProduk: isNotScored ? $scope.desc.namaProduk : $scope.item.namaProduk.namaProduk,
                        skor: parseFloat(isNotScored ? $scope.desc.skor : $scope.item.skor),
                        statusVerifikasi: isNotScored ? $scope.desc.isVerified : $scope.item.statusVerif ? true : false,
                        tanggalMulaiBerlaku: dateHelper.toTimeStamp(isNotScored ? $scope.desc.tglBerlaku : $scope.item.tglBerlaku),
                        produk: {
                            id: isNotScored ? $scope.desc.produkId : $scope.item.namaProduk.id
                        },
                        kelompokKerja: {
                            id: isNotScored ? $scope.desc.kelompokKerja.id : $scope.item.kelompokKerja.id
                        },
                        kdProfile: 0,
                        statusEnabled: statusEnabled,
                        loginUserId: userLogin.id
                    }

                    if ($scope.norecData) {
                        dataSave.noRec = $scope.norecData;
                    }

                    if (isNotScored && !$scope.isTambahGranted && !pegawaiLogin.id == 320263) {
                        toastr.warning("Tidak memiliki akses menambah data!")

                        $scope.isRouteLoading = false;
                        return
                    } else if ($scope.isDuplicated && method != 'delete') {
                        toastr.warning("Data mapping skoring sudah tersedia!")

                        $scope.isRouteLoading = false;
                        return
                    } else {
                        ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-skoring-tindakan-medis").then(res => {
                            $scope.desc = null;
                            $scope.showDesc = false;
                            $scope.getAllData();
                            $scope.closePopUp();

                            $scope.isRouteLoading = false;
                        }, function (error) {
                            $scope.isRouteLoading = false;
                        })
                    }
                } else {
                    $scope.isRouteLoading = false;
                    modelItem.showMessages(isValid.messages);
                }
            }

            $scope.getDataKelompokKerja = (id) => {
                $scope.item.kelompokKerja = null;
                ManageSdmNew.getListData("service/list-generic/?view=SubUnitKerjaPegawai&select="
                    + "id,name&criteria=unitKerjaId,statusEnabled,name&values=" + id + ",true,KK&order=name:asc").then((res) => {
                        $scope.listKelompokKerja = res.data;
                    });
            }

            $scope.getDataRuangan = (id) => {
                $scope.item.namaProduk = null;
                ManageSdmNew.getListData("service/list-generic/?view=Ruangan&select="
                    + "id,namaRuangan&criteria=departemenId,statusEnabled&values=" + id + ",true&order=namaRuangan:asc").then((res) => {
                        $scope.listRuangan = res.data;
                    });
            }

            $scope.getProduk = (id) => {
                $scope.item.namaProduk = null;
                ManageSdmNew.getListData("iki-remunerasi/get-daftar-input-tindakan?ruanganId=" + id).then((res) => {
                    $scope.listNamaProduk = res.data.data;
                });
            }

            $scope.closePopUp = () => {
                $scope.reset();
                $scope.popupTambah.close();
            }

            $scope.reset = () => {
                $scope.item.departemen = null
                $scope.item.ruangan = null
                $scope.item.unitKerja = null;
                $scope.item.namaProduk = null;
                $scope.item.kelompokKerja = null;
                $scope.item.tglBerlaku = tglBerlaku;
                $scope.item.skor = null;
                $scope.item.detailTindakan = null;
                $scope.item.statusVerif = null;
                $scope.norecData = null;
            }

            // $scope.$watch('item.namaProduk', function (e) {
            //     if (!e) return;
            //     // if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.detailTindakan && $scope.item.skor && $scope.item.tglBerlaku) {
            //     if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.skor && $scope.item.tglBerlaku) {
            //         ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=" + ($scope.norecData ? $scope.norecData : "")
            //             + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
            //             // + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.detailTindakan).replace(/%20/g, "+")
            //             + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
            //             + "&skor=" + $scope.item.skor + "&tglBerlaku=" + $scope.item.tglBerlaku).then(res => {
            //                 if (res.data.data.length > 0) {
            //                     $scope.isDuplicated = true
            //                 } else {
            //                     $scope.isDuplicated = false
            //                 }
            //             })
            //     }
            // })

            // $scope.$watch('item.kelompokKerja', function (e) {
            //     if (!e) return;
            //     // if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.detailTindakan && $scope.item.skor && $scope.item.tglBerlaku) {
            //     if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.skor && $scope.item.tglBerlaku) {
            //         ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=" + ($scope.norecData ? $scope.norecData : "")
            //             + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
            //             // + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.detailTindakan).replace(/%20/g, "+")
            //             + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
            //             + "&skor=" + $scope.item.skor + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
            //                 if (res.data.data.length > 0) {
            //                     $scope.isDuplicated = true
            //                 } else {
            //                     $scope.isDuplicated = false
            //                 }
            //             })
            //     }
            // })

            // $scope.$watch('item.detailTindakan', function (e) {
            //     if (!e) return;
            //     // if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.detailTindakan && $scope.item.skor && $scope.item.tglBerlaku) {
            //     if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.skor && $scope.item.tglBerlaku) {
            //         ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=" + ($scope.norecData ? $scope.norecData : "")
            //             + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
            //             // + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.detailTindakan).replace(/%20/g, "+")
            //             + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
            //             + "&skor=" + $scope.item.skor + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
            //                 if (res.data.data.length > 0) {
            //                     $scope.isDuplicated = true
            //                 } else {
            //                     $scope.isDuplicated = false
            //                 }
            //             })
            //     }
            // })

            // $scope.$watch('item.skor', function (e) {
            //     if (!e) return;
            //     // if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.detailTindakan && $scope.item.skor && $scope.item.tglBerlaku) {
            //     if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.skor && $scope.item.tglBerlaku) {
            //         ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=" + ($scope.norecData ? $scope.norecData : "")
            //             + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
            //             // + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.detailTindakan).replace(/%20/g, "+")
            //             + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
            //             + "&skor=" + $scope.item.skor + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
            //                 if (res.data.data.length > 0) {
            //                     $scope.isDuplicated = true
            //                 } else {
            //                     $scope.isDuplicated = false
            //                 }
            //             })
            //     }
            // })

            // $scope.$watch('item.tglBerlaku', function (e) {
            //     if (!e) return;
            //     // if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.detailTindakan && $scope.item.skor && $scope.item.tglBerlaku) {
            //     if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.skor && $scope.item.tglBerlaku) {
            //         ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=" + ($scope.norecData ? $scope.norecData : "")
            //             + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
            //             // + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.detailTindakan).replace(/%20/g, "+")
            //             + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
            //             + "&skor=" + $scope.item.skor + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
            //                 if (res.data.data.length > 0) {
            //                     $scope.isDuplicated = true
            //                 } else {
            //                     $scope.isDuplicated = false
            //                 }
            //             })
            //     }
            // })

            // $scope.$watch('desc.skor', function (e) {
            //     if (!e) return;
            //     if ($scope.desc.namaProduk && $scope.desc.kelompokKerja && $scope.desc.skor && $scope.desc.tglBerlaku) {
            //         ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=&namaProduk=" + encodeURIComponent($scope.desc.namaProduk).replace(/%20/g, "+")
            //             + "&kelompokKerjaId=" + $scope.desc.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.desc.namaProduk).replace(/%20/g, "+")
            //             + "&skor=" + $scope.desc.skor + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.desc.tglBerlaku)).then(res => {
            //                 if (res.data.data.length > 0) {
            //                     $scope.isDuplicated = true
            //                 } else {
            //                     $scope.isDuplicated = false
            //                 }
            //             })
            //     }
            // })

            // $scope.$watch('desc.tglBerlaku', function (e) {
            //     if (!e) return;
            //     if ($scope.desc.namaProduk && $scope.desc.kelompokKerja && $scope.desc.skor && $scope.desc.tglBerlaku) {
            //         ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=&namaProduk=" + encodeURIComponent($scope.desc.namaProduk).replace(/%20/g, "+")
            //             + "&kelompokKerjaId=" + $scope.desc.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.desc.namaProduk).replace(/%20/g, "+")
            //             + "&skor=" + $scope.desc.skor + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.desc.tglBerlaku)).then(res => {
            //                 if (res.data.data.length > 0) {
            //                     $scope.isDuplicated = true
            //                 } else {
            //                     $scope.isDuplicated = false
            //                 }
            //             })
            //     }
            // })
        }
    ])
});
