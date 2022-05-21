define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputKegiatanPelayananPerawatCtrl', ['CacheHelper', 'ManagePegawai', 'ManageServicePhp', 'DateHelper', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function (chacheHelper, managePegawai, manageServicePhp, dateHelper, manageSdm, manageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.pasien = {};
            $scope.perawat = {};
            $scope.item = {};
            $scope.labelButtonSave = "Tambah";
            $scope.isEdit = false;
            $scope.isRouteLoading = true;
            $scope.perawat.tglPelayanan = new Date();
            $scope.perawat.data = JSON.parse(localStorage.getItem('pegawai'));
            $scope.pasien.data = JSON.parse(localStorage.getItem('dataAPD'));
            $scope.norec_apd = $scope.pasien.data.norec;
            $scope.perawat.jmlLayanan = 0;
            $scope.optGrid = {
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "tglPelayananFormatted",
                    title: "<h3>Tanggal Pelayanan</h3>",
                    width: 75,
                    template: "<div style='text-align:center'>{{ '#: tglPelayananFormatted #' }}</div>"
                }, {
                    field: "namaProduk",
                    title: "<h3>Kegiatan</h3>",
                    width: 200
                }, {
                    field: "skor",
                    title: "<h3>Skor</h3>",
                    width: 30,
                    template: "<div style='text-align:right'>{{ '#: skor #' }}</div>"
                }, {
                    field: "jumlah",
                    title: "<h3>Jumlah</h3>",
                    width: 30,
                    template: "<div style='text-align:right'>{{ '#: jumlah #' }}</div>"
                }, {
                    field: "tSkor",
                    title: "<h3>Total Skor</h3>",
                    width: 30,
                    template: "<div style='text-align:right'>{{ '#: tSkor #' }}</div>"
                }, {
                    command: [{
                        text: "Hapus",
                        click: confirmHapus,
                        imageClass: "k-icon k-i-cancel"
                    },],
                    title: "",
                    width: 50
                }],
            }

            $scope.klikGrid = (data) => {
                $scope.labelButtonSave = "Edit";
                $scope.isEdit = true;
                $scope.perawat.tglPelayanan = new Date(data.tglPelayanan);
                $scope.perawat.kegiatan = {
                    namaProduk: data.namaProduk,
                    id: data.produkId
                };
                $scope.perawat.jmlLayanan = data.jumlah;

                $scope.noRecAPD = data.noRecAPD
                $scope.item.norecEdit = data.noRec
                // console.log($scope.item.norecEdit)
            }

            function confirmHapus(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                $scope.isRouteLoading = true;

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin menghapus data?')
                    .textContent('Anda akan menghapus data secara permanen!')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    manageSdmNew.saveData({}, `/iki-remunerasi/delete-pelayanan-pasien-perawat?noRec=${dataItem.noRec}`).then(res => {
                        $scope.reset();
                        $scope.getDataGrid();
                        toastr.info("Silakan informasikan kepada atasan langsung untuk melakukan verifikasi ulang Logbook Skor Kinerja", "Informasi")

                        $scope.isRouteLoading = false;
                    }, (error) => {
                        $scope.isRouteLoading = false;
                    });
                });
            }

            $scope.getDataGrid = () => {
                $scope.isRouteLoading = true;
                manageSdmNew.getListData(`iki-remunerasi/get-pelayanan-pasien-perawat?noRec=${$state.params.noRec}&pegawaiId=${$scope.perawat.data.id}`).then(res => {
                    // for (let i = 0; i < res.data.data.length; i++) {
                    //     res.data.data[i].tglPelayananFormatted = dateHelper.formatDate(res.data.data[i].tglPelayanan, "DD MMMM YYYY");
                    // }

                    $scope.dataSource = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10
                    });
                    $scope.isRouteLoading = false;
                })
            }

            $scope.init = () => {
                // console.log($state.params.noRec)
                $scope.perawat.perawatPelaksana = $scope.perawat.data.namaLengkap;
                manageServicePhp.getDataTableTransaksi(`registrasipasien/get-pasien-bynorec/${$scope.pasien.data.norec_pd}/${$scope.pasien.data.norec}`).then(res => {
                    $scope.pasien = res.data[0];
                })
                $scope.getDataGrid();
                manageSdmNew.getListData("service/list-generic/?view=ProdukPerawat&select=id,namaProduk&criteria=statusEnabled&values=true&order=namaProduk:asc").then(res => {
                    $scope.listProduk = res.data;
                })
            }
            $scope.init();

            $scope.reset = () => {
                $scope.perawat.tglPelayanan = new Date();
                $scope.perawat.kegiatan = null;
                $scope.perawat.jmlLayanan = 0;
                $scope.labelButtonSave = "Tambah";
                $scope.isEdit = false;

                $scope.item.norecEdit = undefined
            }

            $scope.tambahKegiatan = () => {
                let norecApd = $scope.labelButtonSave === "Edit" ? $scope.noRecAPD : $scope.norec_apd;
                // let statusEnabled = method === "hapus" ? false : true;
                if (!$scope.perawat.tglPelayanan) {
                    toastr.warning("Harap pilih tanggal pelayanan");
                    return;
                }

                if (!$scope.perawat.kegiatan) {
                    toastr.warning("Harap pilih Kegiatan");
                    return;
                }

                if (!$scope.perawat.jmlLayanan || $scope.perawat.jmlLayanan === 0) {
                    toastr.warning("Jumlah layanan salah");
                    return;
                }

                let dataSave = {
                    kdProfile: 0,
                    statusEnabled: true,
                    antrianPasienDiperiksa: {
                        noRec: norecApd
                    },
                    produk: {
                        id: $scope.perawat.kegiatan.id
                    },
                    tglPelayanan: dateHelper.toTimeStamp($scope.perawat.tglPelayanan),
                    jumlah: $scope.perawat.jmlLayanan,
                    pegawai: {
                        id: $scope.perawat.data.id
                    }
                }

                if ($scope.item.norecEdit) dataSave.noRec = $scope.item.norecEdit;

                manageSdmNew.saveData(dataSave, "iki-remunerasi/save-pelayanan-pasien-perawat").then(res => {
                    $scope.reset();
                    $scope.getDataGrid();
                }, (error) => {
                    if (error.status == 400) {
                        toastr.error("Tanggal kegiatan harus diisi dengan tanggal di bulan berjalan", "Informasi")
                    }
                })
            }
        }
    ])
});