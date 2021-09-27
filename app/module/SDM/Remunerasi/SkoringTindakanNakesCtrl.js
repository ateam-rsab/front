define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SkoringTindakanNakesCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.isEdit = false;
            $scope.isVerifStaf = false
            $scope.isDuplicated = false

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
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "namaProduk",
                    title: "<h3>Produk</h3>",
                    width: 150
                }, {
                    field: "namaProfesi",
                    title: "<h3>Profesi</h3>",
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

                ManageSdmNew.getListData("iki-remunerasi/get-all-skoring-tindakan-nakes?"
                    + "namaProduk=" + ($scope.item.srcNamaProduk ? $scope.item.srcNamaProduk : "")
                    + "&isVerif=" + ($scope.item.srcStatusVerif ? ($scope.item.srcStatusVerif.id == 1 ? true : false) : "")
                    + "&profesiId=" + ($scope.item.srcProfesi ? $scope.item.srcProfesi.id : "")).then((res) => {
                        $scope.dataSourceSkoring = new kendo.data.DataSource({
                            data: res.data.data,
                            pageSize: 20
                        });
                        $scope.isRouteLoading = false;
                    })
            }

            let init = () => {
                ManageSdmNew.getListData("iki-remunerasi/get-akses-skoring-tindakan-nakes?pegawaiId=" + pegawaiLogin.id).then((res) => {
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
                        } else if (res.data.data.isAtasan || res.data.data.isSuperuser) {
                            $scope.isVerifHidden = false
                            $scope.isHapusGranted = true
                        }
                    } else {
                        $scope.listId = [21]
                        $scope.listSk = []
                        listUK = "21"
                    }

                    $scope.getAllData();
                });

                getProfesi();
            }

            init();

            $scope.tambahData = () => {
                $scope.reset();
                getProfesi();
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

                $scope.item.profesi = {
                    id: dataItem.profesiId,
                    namaProfesi: dataItem.namaProfesi
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
                var listTempProfesi = []

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

                $scope.item.profesi = {
                    id: dataItem.profesiId,
                    namaProfesi: dataItem.namaProfesi
                }

                $scope.item.namaProduk = {
                    id: dataItem.produkId,
                    namaProduk: dataItem.namaProduk
                }

                listTempProfesi.push($scope.item.profesi)
                listProduk.push($scope.item.namaProduk)

                $scope.listProfesi = listTempProfesi
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
                    "item.namaProduk|k-ng-model|Tindakan",
                    "item.profesi|k-ng-model|Profesi"
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
                        ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-skoring-tindakan-nakes").then(res => {
                            $scope.getAllData();
                            $scope.closePopUp();
                        })
                    }
                } else {
                    $scope.isRouteLoading = false;
                    modelItem.showMessages(isValid.messages);
                }
            }

            function getProfesi() {
                $scope.item.profesi = null;
                ManageSdmNew.getListData("service/list-generic/?view=Profesi&"
                    + "select=id,namaProfesi&criteria=statusEnabled&values=true&order=namaProfesi:asc").then((res) => {
                        $scope.listProfesi = res.data;
                    });
            }

            $scope.getProduk = (profesiId) => {
                $scope.item.namaProduk = null;
                ManageSdmNew.getListData("service/list-generic/?view=ProdukNakes&"
                    + "select=id,namaProduk&criteria=statusEnabled,profesiId&values=true," + profesiId + "&order=namaProduk:asc").then(res => {
                        $scope.listNamaProduk = res.data;
                    })
            }

            $scope.closePopUp = () => {
                $scope.reset();
                $scope.popupTambah.close();
            }

            $scope.reset = () => {
                $scope.item.profesi = null;
                $scope.item.namaProduk = null;
                $scope.item.tglBerlaku = null;
                $scope.item.skor = null;
                $scope.item.statusVerif = null;
                $scope.norecData = null;
            }

            $scope.$watch('item.namaProduk', function (e) {
                if (!e) return;
                if ($scope.item.namaProduk && $scope.item.profesi && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-nakes?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+") + "&profesiId=" + $scope.item.profesi.id
                        + "&skor=" + $scope.item.skor + "&tglBerlaku=" + dateHelper.toTimeStamp($scope.item.tglBerlaku)).then(res => {
                            if (res.data.data.length > 0) {
                                $scope.isDuplicated = true
                            } else {
                                $scope.isDuplicated = false
                            }
                        })
                }
            })

            $scope.$watch('item.profesi', function (e) {
                if (!e) return;
                if ($scope.item.namaProduk && $scope.item.profesi && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-nakes?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+") + "&profesiId=" + $scope.item.profesi.id
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
                if ($scope.item.namaProduk && $scope.item.profesi && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-nakes?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+") + "&profesiId=" + $scope.item.profesi.id
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
                if ($scope.item.namaProduk && $scope.item.profesi && $scope.item.skor && $scope.item.tglBerlaku) {
                    ManageSdmNew.getListData("iki-remunerasi/get-duplicate-skoring-tindakan-nakes?noRec=" + ($scope.norecData ? $scope.norecData : "")
                        + "&namaProduk=" + encodeURIComponent($scope.item.namaProduk.namaProduk).replace(/%20/g, "+") + "&profesiId=" + $scope.item.profesi.id
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