define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SkoringTindakanPerawatCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.isEdit = false;
            $scope.isVerifStaf = false
            $scope.isDuplicated = false

            var userLogin = JSON.parse(localStorage.getItem('datauserlogin'));
            var pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));

            $scope.listStatusKlasif = [{
                id: 1,
                statusKlasif: "Asuhan"
            }, {
                id: 2,
                statusKlasif: "Tindakan"
            }, {
                id: 3,
                statusKlasif: "Laporan"
            }]

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
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "namaProduk",
                    title: "<h3>Produk Perawat</h3>",
                    width: 150
                }, {
                    field: "stKlasif",
                    title: "<h3>Klasifikasi</h3>",
                    width: 60
                }, {
                    field: "skor",
                    title: "<h3>Skor</h3>",
                    width: 50
                }, {
                    field: "tglMulaiBerlaku",
                    title: "<h3>Tanggal Berlaku</h3>",
                    width: 80
                }, {
                    field: "stVerif",
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

            $scope.getAllData = () => {
                $scope.isRouteLoading = true;

                ManageSdmNew.getListData("iki-remunerasi/get-all-skoring-tindakan-perawat?"
                    + "namaProduk=" + ($scope.item.srcNamaProduk ? $scope.item.srcNamaProduk : "")
                    + "&kdKlasif=" + ($scope.item.srcStatusKlasif ? $scope.item.srcStatusKlasif.id : "")
                    + "&isVerif=" + ($scope.item.srcStatusVerif ? ($scope.item.srcStatusVerif.id == 1 ? true : false) : "")).then((res) => {
                        $scope.dataSourceSkoring = new kendo.data.DataSource({
                            data: res.data.data,
                            pageSize: 20
                        });
                        $scope.isRouteLoading = false;
                    })
            }

            let init = () => {
                ManageSdmNew.getListData("iki-remunerasi/get-akses-skoring-tindakan-perawat?pegawaiId=" + pegawaiLogin.id).then((res) => {
                    var listUK = ""
                    if (!_.isEmpty(res.data.data)) {
                        $scope.listId = res.data.data.listId
                        $scope.listSk = res.data.data.listSk
                        $scope.isStaf = res.data.data.isStaf
                        $scope.isAtasan = res.data.data.isAtasan
                        $scope.isSuperuser = res.data.data.isSuperuser

                        listUK = res.data.data.listId.join(";")
                        if (res.data.data.isStaf) {
                            $scope.isVerifHidden = true
                            $scope.isHapusGranted = false
                            $scope.isTambahGranted = true
                        } else if (res.data.data.isSuperuser) {
                            $scope.isVerifHidden = false
                            $scope.isHapusGranted = true
                            $scope.isTambahGranted = true
                        } else {
                            $scope.isVerifHidden = true
                            $scope.isHapusGranted = false
                            $scope.isTambahGranted = false
                        }
                    } else {
                        $scope.listId = [21]
                        $scope.listSk = []
                        listUK = "21"
                    }

                    $scope.getAllData();
                });

                getProduk();
            }

            init();

            $scope.tambahData = () => {
                // if (!$scope.isTambahGranted) {
                //     toastr.warning("Tidak memiliki akses menambah data!")
                //     return
                // }

                $scope.reset();
                getProduk();
                $scope.isEdit = false
                $scope.isVerifStaf = false
                $scope.popupTambah.open().center();
            }

            function hapusData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (!$scope.listId.includes(dataItem.unitKerjaId)) {
                    toastr.warning("Tidak memiliki akses menghapus data!");
                    return
                } else if (!$scope.isHapusGranted) {
                    if (dataItem.kdVerif) {
                        toastr.warning("Mapping skor sudah terverifikasi");
                        return
                    } else {
                        toastr.warning("Tidak memiliki akses menghapus data!");
                        return
                    }
                } else if (dataItem.kdVerif) {
                    toastr.warning("Mapping skor sudah terverifikasi");
                    return
                }

                $scope.item.namaProduk = {
                    id: dataItem.produkId,
                    namaProduk: dataItem.namaProduk
                }

                $scope.norecData = dataItem.noRec;

                $scope.item.tglBerlaku = new Date(dataItem.tglMulaiBerlaku);
                $scope.item.skor = dataItem.skor
                $scope.item.statusVerif = dataItem.kdVerif;

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

                if (dataItem.kdVerif && $scope.isStaf) {
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

                $scope.norecData = dataItem.noRec;

                $scope.item.tglBerlaku = new Date(dataItem.tglMulaiBerlaku);
                $scope.item.skor = dataItem.skor
                $scope.item.statusVerif = dataItem.kdVerif;

                $scope.popupTambah.open().center();
            }

            $scope.saveData = (method) => {
                var listRawRequired = [
                    "item.tglBerlaku|ng-model|Tanggal Berlaku",
                    "item.skor|ng-model|Skor",
                    "item.namaProduk|k-ng-model|Tindakan"
                ];

                var isValid = modelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    let statusEnabled = method === 'save' || method === 'update';

                    let dataSave = {
                        skor: parseFloat($scope.item.skor),
                        statusVerifikasi: $scope.item.statusVerif ? true : false,
                        tanggalMulaiBerlaku: dateHelper.toTimeStamp($scope.item.tglBerlaku),
                        produk: {
                            id: $scope.item.namaProduk.id
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
                        ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-skoring-tindakan-perawat").then(res => {
                            $scope.getAllData();
                            $scope.closePopUp();
                        })
                    }
                } else {
                    $scope.isRouteLoading = false;
                    modelItem.showMessages(isValid.messages);
                }
            }

            function getProduk() {
                $scope.item.namaProduk = null;
                ManageSdmNew.getListData("service/list-generic/?view=ProdukPerawat&"
                    + "select=id,namaProduk&criteria=statusEnabled&values=true&order=namaProduk:asc").then((res) => {
                        $scope.listNamaProduk = res.data;
                    });
            }

            $scope.closePopUp = () => {
                $scope.reset();
                $scope.popupTambah.close();
            }

            $scope.reset = () => {
                $scope.item.namaProduk = null;
                $scope.item.tglBerlaku = null;
                $scope.item.skor = null;
                $scope.item.statusVerif = null;
                $scope.norecData = null;
            }

            $scope.$watch('item.namaProduk', function (e) {
                if (!e) return;
                if ($scope.item.namaProduk && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-perawat?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+") + "&skor=" + $scope.item.skor
                        + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
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
                if ($scope.item.namaProduk && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-perawat?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+") + "&skor=" + $scope.item.skor
                        + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
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
                if ($scope.item.namaProduk && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-perawat?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+") + "&skor=" + $scope.item.skor
                        + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
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