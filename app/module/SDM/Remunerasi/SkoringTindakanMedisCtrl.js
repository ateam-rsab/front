define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SkoringTindakanMedisCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.isEdit = false;
            $scope.isVerifStaf = false
            var userLogin = JSON.parse(localStorage.getItem('datauserlogin'));
            var pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));
            $scope.listStatusVerif = [{
                id: 0,
                statusVerif: "Belum Terverifikasi"
            }, {
                id: 1,
                statusVerif: "Terverifikasi"
            }]

            $scope.optGridSkoringTindakan = {
                toolbar: [{
                    text: "export",
                    name: "Tambah",
                    template: '<button ng-click="tambahData()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>'
                }],
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
                    //     field: "unitKerja",
                    //     title: "<h3>Unit Kerja</h3>",
                    //     width: 150
                }, {
                    field: "detailProduk",
                    title: "<h3>Rincian Tindakan</h3>",
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
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: 100
                }],
            };

            $scope.getAllData = () => {
                $scope.isRouteLoading = true;
                var listKK = []

                if ($scope.item.srcKelompokKerja) {
                    listKK.push($scope.item.srcKelompokKerja.id)
                } else {
                    listKK = $scope.listKk
                }

                ManageSdmNew.getListData("iki-remunerasi/get-all-skoring-tindakan-medis?listKelompokKerjaId=" + listKK + "&namaProduk=" + ($scope.item.srcNamaProduk ? $scope.item.srcNamaProduk.namaProduk : "") + "&detailProduk=" + ($scope.item.srcDetailTindakan ? $scope.item.srcDetailTindakan : "") + "&tglMulaiBerlaku=" + ($scope.item.srcTglBerlaku ? dateHelper.toTimeStamp($scope.item.srcTglBerlaku) : "") + "&isStatusVerifikasi=" + ($scope.item.srcStatusVerif ? ($scope.item.srcStatusVerif.id == 1 ? true : false) : "")).then((res) => {
                    $scope.dataSourceSkoring = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 20
                    });
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
                        } else if (res.data.data.isAtasan || res.data.data.isSuperuser) {
                            $scope.isVerifHidden = false
                            $scope.isHapusGranted = true
                        }
                    } else {
                        $scope.listId = [58, 59, 60, 61, 62, 63, 82]
                        $scope.listKk = []
                        listUK = "58;59;60;61;62;63;82"
                    }

                    $scope.getAllData();

                    ManageSdmNew.getListData("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=id,statusEnabled&values=(" + listUK + "),true&order=name:asc").then((rsUK) => {
                        $scope.listUnitKerjKSM = rsUK.data;
                    });

                    ManageSdmNew.getListData("service/list-generic/?view=SubUnitKerjaPegawai&select=id,name&criteria=statusEnabled,unitKerjaId,name&values=true,(" + listUK + "),KK&order=name:asc").then((rsSK) => {
                        $scope.listKKMedis = rsSK.data;
                    });
                });

                ManageSdmNew.getListData("service/list-generic/?view=Departemen&select=id,namaDepartemen&criteria=statusEnabled,id&values=true,(3;16;18;24;25;26;27;28;35)&order=namaDepartemen:asc").then((res) => {
                    // console.log(res);
                    $scope.listDepartemen = res.data;
                });
            }

            init();

            $scope.tambahData = () => {
                $scope.reset();
                $scope.isEdit = false
                $scope.listRuangan = []
                $scope.listNamaProduk = []
                $scope.listKelompokKerja = []
                $scope.popupTambah.open().center();
            }

            function hapusData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (!$scope.listId.includes(dataItem.unitKerjaId)) {
                    toastr.warning("Tidak memiliki akses menghapus data!")
                    return
                } else if (!$scope.isHapusGranted) {
                    if (dataItem.isStatusVerifikasi) {
                        toastr.warning("Mapping skor sudah terverifikasi")
                        return
                    } else {
                        toastr.warning("Tidak memiliki akses menghapus data!")
                        return
                    }
                } else if (dataItem.isStatusVerifikasi) {
                    toastr.warning("Mapping skor sudah terverifikasi")
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
                    // console.error('Tidak jadi hapus');
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
                        skor: parseInt($scope.item.skor),
                        statusVerifikasi: $scope.item.statusVerif ? true : false,
                        tanggalMulaiBerlaku: dateHelper.toTimeStamp($scope.item.tglBerlaku),
                        produk: {
                            id: $scope.item.namaProduk.id
                        },
                        kelompokKerja: {
                            id: $scope.item.kelompokKerja.id
                        },
                        kdProfile: 0,
                        statusEnabled: statusEnabled,
                        loginUserId: userLogin.id
                    }

                    if ($scope.norecData) {
                        dataSave.noRec = $scope.norecData;
                    }
                    // console.table(dataSave);

                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-medis?noRec=" + ($scope.norecData ? $scope.norecData : "") + "&namaProduk=" + $scope.item.namaProduk.namaProduk + "&kelompokKerjaId=" + $scope.item.kelompokKerja.id + "&detailProduk=" + $scope.item.detailTindakan + "&skor=" + $scope.item.skor).then(res => {
                        if (res.data.data.length > 0) {
                            toastr.warning("Data mapping skoring sudah tersedia!");
                        } else {
                            ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-skoring-tindakan-medis").then(res => {
                                $scope.getAllData();
                                $scope.closePopUp();
                            })
                        }
                    })
                } else {
                    $scope.isRouteLoading = false;
                    modelItem.showMessages(isValid.messages);
                }
            }

            $scope.getDataKelompokKerja = (id) => {
                $scope.item.kelompokKerja = null;
                ManageSdmNew.getListData("service/list-generic/?view=SubUnitKerjaPegawai&select=id,name&criteria=unitKerjaId,statusEnabled,name&values=" + id + ",true,KK&order=name:asc").then((res) => {
                    $scope.listKelompokKerja = res.data;
                });
            }

            $scope.getDataRuangan = (id) => {
                $scope.item.namaProduk = null;
                ManageSdmNew.getListData("service/list-generic/?view=Ruangan&select=id,namaRuangan&criteria=departemenId,statusEnabled&values=" + id + ",true&order=namaRuangan:asc").then((res) => {
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
        }
    ])
});