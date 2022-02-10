define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SkoringTindakanMedisCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.isEdit = false;
            $scope.isVerifStaf = false
            $scope.isDuplicated = false
            $scope.desc = {};
            var userLogin = JSON.parse(localStorage.getItem('datauserlogin'));
            var pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));

            $scope.listStatusVerif = [{
                id: 0,
                statusVerif: "Belum Terverifikasi"
            }, {
                id: 1,
                statusVerif: "Terverifikasi"
            }]

            $('#idSkor').on('change, keyup', function () {
                var currentInput = $(this).val();
                var fixedInput = currentInput.replace(/[A-Za-z!@#$%^&*()]/g, '');
                $(this).val(fixedInput);
            });

            $scope.optGridSkoringTindakan = {
                toolbar: [{
                    text: "export",
                    name: "Tambah",
                    template: '<button ng-click="tambahData()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>'
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
                    title: "<h3>Acuan Tindakan<br/>Pelayanan</h3>",
                    width: 150
                }, {
                    field: "detailProduk",
                    title: "<h3>Tindakan Untuk<br/>Skoring</h3>",
                    width: 170
                }, {
                    field: "skor",
                    title: "<h3>Skor</h3>",
                    width: 50
                }, {
                    field: "tglMulaiBerlaku",
                    title: "<h3>Tanggal Berlaku</h3>",
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
                    width: 100
                }],
            };

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
                    title: '<h3 align=center>Daftar Tindakan Belum ada Skor<h3>',
                    headerAttributes: {
                        style: 'text-align : center'
                    },
                    columns: [
                        {
                            field: "id",
                            title: "<h3>ID</h3>",
                            width: 50
                        }, {
                            field: "namaProduk",
                            title: "<h3>Nama Produk</h3>",
                            width: 150
                        }]}
                ],

            }

            $scope.getAllData = () => {
                $scope.isRouteLoading = true;
                var listKK = []

                if ($scope.item.srcKelompokKerja) {
                    listKK.push($scope.item.srcKelompokKerja.id)
                } else {
                    listKK = $scope.listKk
                }

                ManageSdmNew.getListData("iki-remunerasi/get-all-skoring-tindakan-medis?listKelompokKerjaId=" + listKK
                    + "&namaProduk=" + ($scope.item.srcNamaProduk ? $scope.item.srcNamaProduk.namaProduk : "")
                    + "&detailProduk=" + ($scope.item.srcDetailTindakan ? $scope.item.srcDetailTindakan : "")
                    + "&tglMulaiBerlaku=" + ($scope.item.srcTglBerlaku ? dateHelper.toTimeStamp($scope.item.srcTglBerlaku) : "")
                    + "&isStatusVerifikasi=" + ($scope.item.srcStatusVerif ? ($scope.item.srcStatusVerif.id == 1 ? true : false) : "")).then((res) => {
                        $scope.dataSourceSkoring = new kendo.data.DataSource({
                            data: res.data.data,
                            pageSize: 20
                        });
                        $scope.isRouteLoading = false;
                    })
            }

            $scope.getDataTindakanNoSkoring = () => {
                $scope.isRouteLoading = true;
                // dataSourceTindakanNoSkoring
                ManageSdmNew.getListData("iki-remunerasi/get-tindakan-belum-ada-skor").then((res) => {
                    $scope.dataSourceTindakanNoSkoring = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 100
                    })
                })
            }

            $scope.onClickDataTindakanNoSkoring = (data) => {
                if(!data.id) return;
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("iki-remunerasi/get-deskripsi-tindakan-skor-medis?produkId=" + data.id).then((res) => {
                    $scope.isRouteLoading = false;
                    $scope.showDesc = true;
                    res.data.data.produkId = data.id;
                    $scope.desc = res.data.data;
                });
            }

            let init = () => {
                $scope.getDataTindakanNoSkoring();
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
                if (!$scope.isTambahGranted) {
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
                $scope.item.detailTindakan = dataItem.detailProduk;

                $scope.item.statusVerif = dataItem.isStatusVerifikasi;
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin menghapus data?')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.saveData('delete');
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
                $scope.item.detailTindakan = dataItem.detailProduk;

                $scope.item.statusVerif = dataItem.isStatusVerifikasi;

                $scope.popupTambah.open().center();
            }

            $scope.saveData = (method) => {
                var listRawRequired = [
                    "item.tglBerlaku|ng-model|Tanggal Berlaku",
                    "item.kelompokKerja|ng-model|Kelompok Kerja",
                    "item.skor|ng-model|Skor",
                    "item.detailTindakan|ng-model|Rincian Tindakan",
                    "item.namaProduk|k-ng-model|Tindakan"
                ];

                var isValid = modelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    let statusEnabled = method === 'save' || method === 'update';

                    let dataSave = {
                        detailProduk: $scope.item.detailTindakan,
                        skor: parseFloat($scope.desc.skor ? $scope.desc.skor : $scope.item.skor),
                        statusVerifikasi: $scope.item.statusVerif ? true : false,
                        tanggalMulaiBerlaku: dateHelper.toTimeStamp($scope.item.tglBerlaku),
                        produk: {
                            id: $scope.desc.produkId ? $scope.desc.produkId : $scope.item.namaProduk.id
                        },
                        kelompokKerja: {
                            id: $scope.desc.kelompokKerja.id ?? $scope.item.kelompokKerja.id
                        },
                        kdProfile: 0,
                        statusEnabled: statusEnabled,
                        loginUserId: userLogin.id
                    }

                    if ($scope.norecData) {
                        dataSave.noRec = $scope.norecData;
                    }

                    if ($scope.isDuplicated && method != 'delete') {
                        toastr.warning("Data mapping skoring sudah tersedia!")
                        return
                    } else {
                        ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-skoring-tindakan-medis").then(res => {
                            $scope.desc = null;
                            $scope.getAllData();
                            $scope.closePopUp();
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
                $scope.item.tglBerlaku = null;
                $scope.item.skor = null;
                $scope.item.detailTindakan = null;
                $scope.item.statusVerif = null;
                $scope.norecData = null;
            }

            $scope.$watch('item.namaProduk', function (e) {
                if (!e) return;
                if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.detailTindakan && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
                        + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.detailTindakan).replace(/%20/g, "+")
                        + "&skor=" + $scope.item.skor + "&tglBerlaku=" + $scope.item.tglBerlaku).then(res => {
                            if (res.data.data.length > 0) {
                                $scope.isDuplicated = true
                            } else {
                                $scope.isDuplicated = false
                            }
                        })
                }
            })

            $scope.$watch('item.kelompokKerja', function (e) {
                if (!e) return;
                if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.detailTindakan && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
                        + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.detailTindakan).replace(/%20/g, "+")
                        + "&skor=" + $scope.item.skor + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
                            if (res.data.data.length > 0) {
                                $scope.isDuplicated = true
                            } else {
                                $scope.isDuplicated = false
                            }
                        })
                }
            })

            $scope.$watch('item.detailTindakan', function (e) {
                if (!e) return;
                if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.detailTindakan && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
                        + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.detailTindakan).replace(/%20/g, "+")
                        + "&skor=" + $scope.item.skor + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
                            if (res.data.data.length > 0) {
                                $scope.isDuplicated = true
                            } else {
                                $scope.isDuplicated = false
                            }
                        })
                }
            })

            $scope.$watch('item.skor', function (e) {
                if (!e) return;
                if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.detailTindakan && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
                        + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.detailTindakan).replace(/%20/g, "+")
                        + "&skor=" + $scope.item.skor + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
                            if (res.data.data.length > 0) {
                                $scope.isDuplicated = true
                            } else {
                                $scope.isDuplicated = false
                            }
                        })
                }
            })

            $scope.$watch('item.tglBerlaku', function (e) {
                if (!e) return;
                if ($scope.item.namaProduk && $scope.item.kelompokKerja && $scope.item.detailTindakan && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+")
                        + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + encodeURIComponent($scope.item.detailTindakan).replace(/%20/g, "+")
                        + "&skor=" + $scope.item.skor + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
                            if (res.data.data.length > 0) {
                                $scope.isDuplicated = true
                            } else {
                                $scope.isDuplicated = false
                            }
                        })
                }
            })
        }
    ])
});