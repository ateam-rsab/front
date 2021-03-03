define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SkoringTindakanMedisCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;

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
                    title: "<h3>Nama Produk</h3>",
                    width: 100
                }, {
                    field: "unitKerja",
                    title: "<h3>Unit Kerja</h3>",
                    width: 150
                }, {
                    field: "kelompokKerja",
                    title: "<h3>Kelompok Kerja</h3>",
                    width: 150
                }, {
                    field: "skor",
                    title: "<h3>Skor</h3>",
                    width: 50
                }, {
                    field: "tglMulaiBerlaku",
                    title: "<h3>Tanggal Berlaku</h3>",
                    width: 70
                }, {
                    field: "detailProduk",
                    title: "<h3>Detail Produk</h3>",
                    width: 100
                }, {
                    field: "statusVerifikasi",
                    title: "<h3>Status</h3>",
                    width: 120
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
                ManageSdmNew.getListData("iki-remunerasi/get-all-skoring-tindakan-medis").then((res) => {
                    $scope.dataSourceSkoring = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 20
                    });
                    $scope.isRouteLoading = false;
                })
            }

            let init = () => {
                $scope.getAllData();

                ManageSdmNew.getListData("service/list-generic/?view=Produk&select=id,namaProduk&criteria=statusEnabled&values=true&order=id:asc").then((res) => {
                    // $scope.listNamaProduk = res.data;
                });

                ManageSdmNew.getListData("service/list-generic/?view=Departemen&select=id,namaDepartemen&criteria=statusEnabled&values=true&order=id:asc").then((res) => {
                    console.log(res);
                    $scope.listDepartemen = res.data;
                });

                ManageSdmNew.getListData("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=name,statusEnabled&values=Kelompok Staf Medik,true&order=id:asc").then((res) => {
                    $scope.listUnitKerjKSM = res.data;
                });
            }
            init();

            $scope.tambahData = () => {
                $scope.reset();
                $scope.popupTambah.open().center();
            }

            function hapusData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
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
                    console.error('Tidak jadi hapus');
                });
            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                
                $scope.item.namaProduk = {
                    id: dataItem.produkId,
                    namaProduk: dataItem.namaProduk
                }
                $scope.item.unitKerja = {
                    id: dataItem.unitKerjaId,
                    name: dataItem.unitKerja
                }
                $scope.getDataKelompokKerja();
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
                let statusEnabled = method === 'save' || method === 'update';
                // id: 12239
                // namaProduk: "Konsultasi Dokter Spesialis R"
                let dataSave = {
                    detailProduk: $scope.item.detailTindakan,
                    skor: parseInt($scope.item.skor),
                    statusVerifikasi: $scope.item.statusVerif? true : false,
                    tanggalMulaiBerlaku: dateHelper.toTimeStamp($scope.item.tglBerlaku),
                    produk: {
                        id: $scope.item.namaProduk.id
                    },
                    kelompokKerja: {
                        id: $scope.item.kelompokKerja.id
                    },
                    kdProfile: 0,
                    statusEnabled: statusEnabled
                }

                if ($scope.norecData) {
                    dataSave.noRec = $scope.norecData;
                }
                console.table(dataSave);

                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-skoring-tindakan-medis").then(res => {
                    $scope.getAllData();
                    $scope.closePopUp();
                })
            }

            $scope.getDataKelompokKerja = () => {
                $scope.item.kelompokKerja = null;
                ManageSdmNew.getListData("service/list-generic/?view=SubUnitKerjaPegawai&select=id,name&criteria=unitKerjaId,statusEnabled&values=" + $scope.item.unitKerja.id + ",true&order=id:asc").then((res) => {
                    $scope.listKelompokKerja = res.data;
                });
            }

            $scope.getDataRuangan = () => {
                $scope.item.namaProduk = null;
                ManageSdmNew.getListData("service/list-generic/?view=Ruangan&select=id,namaRuangan&criteria=departemenId,statusEnabled&values=" + $scope.item.departemen.id + ",true&order=id:asc").then((res) => {
                    $scope.listRuangan = res.data;
                });
            }

            $scope.getProduk = () => {
                $scope.item.namaProduk = null;
                ManageSdmNew.getListData("iki-remunerasi/get-daftar-input-tindakan?ruanganId=" + $scope.item.ruangan.id).then((res) => {
                    $scope.listNamaProduk = res.data.data;
                });
            }

            $scope.closePopUp = () => {
                $scope.reset();
                $scope.popupTambah.close();
            }

            $scope.reset = () => {
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