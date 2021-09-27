define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputKegiatanPelayananNakesCtrl', ['CacheHelper', 'ManagePegawai', 'ManageServicePhp', 'DateHelper', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function (chacheHelper, managePegawai, manageServicePhp, dateHelper, manageSdm, manageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.pasien = {};
            $scope.nakes = {};
            $scope.item = {};
            $scope.labelButtonSave = "Tambah";
            $scope.isEdit = false;
            $scope.isRouteLoading = true;
            $scope.nakes.tglPelayanan = new Date();
            $scope.nakes.data = JSON.parse(localStorage.getItem('pegawai'));
            $scope.pasien.data = JSON.parse(localStorage.getItem('dataAPD'));
            $scope.norec_apd = $scope.pasien.data.norec;
            $scope.nakes.jmlLayanan = 0;
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
                    field: "namaProfesi",
                    title: "<h3>Profesi Pelaksana</h3>",
                    width: 75
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
                $scope.nakes.tglPelayanan = new Date(data.tglPelayanan);
                $scope.nakes.profesi = {
                    namaProfesi: data.namaProfesi,
                    id: data.profesiId
                };
                $scope.getListProduk(data.profesiId)
                $scope.nakes.kegiatan = {
                    namaProduk: data.namaProduk,
                    id: data.produkId
                };
                $scope.nakes.jmlLayanan = data.jumlah;

                $scope.noRecAPD = data.noRecAPD
                $scope.item.norecEdit = data.noRec
                // console.log($scope.item.norecEdit)
            }

            function confirmHapus(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin menghapus data?')
                    .textContent('Anda akan menghapus data secara permanen!')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    manageSdmNew.saveData({}, `/iki-remunerasi/delete-pelayanan-pasien-nakes?noRec=${dataItem.noRec}`).then(res => {
                        $scope.reset();
                        $scope.getDataGrid();
                    });
                });
            }

            $scope.getDataGrid = () => {
                $scope.isRouteLoading = true;
                manageSdmNew.getListData(`iki-remunerasi/get-pelayanan-pasien-nakes?noRec=${$state.params.noRec}&pegawaiId=${$scope.nakes.data.id}`).then(res => {
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
                $scope.nakes.nakesPelaksana = $scope.nakes.data.namaLengkap;
                manageServicePhp.getDataTableTransaksi(`registrasipasien/get-pasien-bynorec/${$scope.pasien.data.norec_pd}/${$scope.pasien.data.norec_apd}`).then(res => {
                    $scope.pasien = res.data[0];
                })
                $scope.getDataGrid();
                manageSdmNew.getListData("service/list-generic/?view=Profesi&select=id,namaProfesi&criteria=statusEnabled&values=true&order=namaProfesi:asc").then(res => {
                    $scope.listProfesi = res.data;
                })
            }
            $scope.init();

            $scope.getListProduk = (profesiId) => {
                $scope.nakes.kegiatan = null;
                manageSdmNew.getListData("service/list-generic/?view=ProdukNakes&select=id,namaProduk&criteria=statusEnabled,profesiId&values=true," + profesiId + "&order=namaProduk:asc").then(res => {
                    $scope.listProduk = res.data;
                })
            }

            $scope.reset = () => {
                $scope.nakes.tglPelayanan = new Date();
                $scope.nakes.kegiatan = null;
                $scope.nakes.jmlLayanan = 0;
                $scope.labelButtonSave = "Tambah";
                $scope.isEdit = false;

                $scope.item.norecEdit = undefined
            }

            $scope.tambahKegiatan = () => {
                let norecApd = $scope.labelButtonSave === "Edit" ? $scope.noRecAPD : $scope.norec_apd;
                // let statusEnabled = method === "hapus" ? false : true;
                if (!$scope.nakes.tglPelayanan) {
                    toastr.warning("Harap pilih tanggal pelayanan");
                    return;
                }

                if (!$scope.nakes.kegiatan) {
                    toastr.warning("Harap pilih Kegiatan");
                    return;
                }

                if (!$scope.nakes.jmlLayanan || $scope.nakes.jmlLayanan === 0) {
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
                        id: $scope.nakes.kegiatan.id
                    },
                    tglPelayanan: dateHelper.toTimeStamp($scope.nakes.tglPelayanan),
                    jumlah: $scope.nakes.jmlLayanan,
                    pegawai: {
                        id: $scope.nakes.data.id
                    }
                }

                if ($scope.item.norecEdit) dataSave.noRec = $scope.item.norecEdit;

                manageSdmNew.saveData(dataSave, "iki-remunerasi/save-pelayanan-pasien-nakes").then(res => {
                    $scope.reset();
                    $scope.getDataGrid();
                })
            }
        }
    ])
});