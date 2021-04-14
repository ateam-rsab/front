define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('VerifikasiOrderRadiologiRevCtrl', ['FindProduk', 'CacheHelper', 'ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienRadiologi', 'DateHelper', '$mdDialog',
        function (produkService, cacheHelper, managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienRadiologi, dateHelper, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.dataOrderRadiologi = JSON.parse(localStorage.getItem("dataOrderRadiologi"));
            $scope.totalHargaProduk = 'Rp. 0,00';

            let dataLogin = JSON.parse(localStorage.getItem("pegawai"));

            $scope.layanan = {};

            let init = () => {
                $scope.isRouteLoading = true;
                // http://192.168.12.3:5555/simrs_harkit/service/transaksi/lab-radiologi/get-compnonen-rad
                findPasienRadiologi.getData("lab-radiologi/get-daftar-order-detail?strukorder=" + $state.params.norec).then((res) => {
                    $scope.isRouteLoading = false;
                    $scope.detailOrderRadiologi = res.data;

                    $scope.dataSourceDetail = new kendo.data.DataSource({
                        data: res.data.detail,
                        pageSize: 20
                    })
                });

                // http://192.168.12.3:5555/simrs_harkit/service/transaksi/transaksi/lab-radiologi/get-compnonen-rad
                findPasienRadiologi.getData("lab-radiologi/get-compnonen-rad", true).then(function (dat) {
                    $scope.listLayanan = dat.data.data;
                });
            }
            init();

            $scope.columnsDetailOrder = [{
                "field": "namaproduk",
                "title": "Nama Layanan",
                "width": 100,
            }, {
                "field": "qtyproduk",
                "title": "QTY",
                "width": 30,
            }, {
                "field": "persiapan",
                "title": "Persiapan",
                "width": 100,
            }, {
                "field": "riwayat",
                "title": "Riwayat",
                "width": 100,
            }, {
                "field": "catatan_tambahan",
                "title": "Catatan",
                "width": 150,
            }, {
                command: [{
                    text: "Verifikasi Order",
                    click: verifikasiOrder,
                    imageClass: "k-icon k-i-pencil"
                }],
                title: "",
                width: 70
            }];

            $scope.columnsDetailOrderVerified = [{
                "field": "namaproduk",
                "title": "Nama Layanan",
                "width": 100,
            }, {
                "field": "qtyproduk",
                "title": "QTY",
                "width": 30,
            }, {
                "field": "persiapan",
                "title": "Persiapan",
                "width": 100,
            }, {
                "field": "riwayat",
                "title": "Riwayat",
                "width": 100,
            }, {
                "field": "catatan_tambahan",
                "title": "Catatan",
                "width": 150,
            }];

            $scope.columnsHargaProduk = [{
                "field": "komponenharga",
                "title": "Komponen Harga",
            }, {
                "field": "hargaFormatted",
                "title": "Harga",
            }]

            function verifikasiOrder(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                $scope.layanan = dataItem;

                $scope.popupVerifikasi.open().center();
            }

            let dataSource = [];
            $scope.verifikasiData = () => {
                let data = {
                    namaproduk: $scope.layanan.iptProduk.namaproduk,
                    detailKomponenHarga: $scope.layanan.iptProduk.detailKomponenHarga,
                    hargasatuan: $scope.layanan.iptProduk.hargasatuan,
                    idProduk: $scope.layanan.iptProduk.prid,
                    qtyproduk: $scope.layanan.iptQty,
                    persiapan: $scope.layanan.persiapan,
                    riwayat: $scope.layanan.riwayat,
                    catatan_tambahan: $scope.layanan.catatan_tambahan,
                }

                dataSource = [
                    ...dataSource,
                    data
                ]
                $scope.dataSourceVerified = new kendo.data.DataSource({
                    data: dataSource,
                    pageSize: 100
                });

                $scope.popupVerifikasi.close();
            }

            $scope.resetData = () => {
                $scope.dataSourceVerified = new kendo.data.DataSource({
                    data: [],
                    pageSize: 100
                });
            }

            $scope.onChangeProduk = (data) => {
                for (let i in data.detailKomponenHarga) {
                    data.detailKomponenHarga[i].hargaFormatted = new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                    }).format(data.detailKomponenHarga[i].hargasatuan);
                }

                $scope.totalHargaProduk = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format(data.hargasatuan);

                $scope.dataSourceHargaProduk = new kendo.data.DataSource({
                    data: data.detailKomponenHarga,
                    pageSize: 10
                })
            }

            $scope.showAlertSuccess = function (ev) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Verifikasi Berhasil')
                    .textContent('Anda akan di arahkan ke laman Daftar Order Pasien Radiologi.')
                    .ok('Ya')
                    .targetEvent(ev)
                ).then(() => {
                    $state.go("DaftarOrderRadiologi");
                });
              };

            $scope.simpanData = () => {
             
                let dataSourceGrid = $scope.dataSourceVerified._data;
                let dataSave = {
                    norec_pp: "",
                    noorder: $scope.dataOrderRadiologi.noorder,
                    norec_so: $scope.dataOrderRadiologi.norec_so,
                    objectkelasfk: $scope.dataOrderRadiologi.objectkelasfk,
                    norec_pd: $scope.dataOrderRadiologi.norec_pd,

                    // blm ada
                    // objectruangantujuanfk: $scope.dataOrderRadiologi,
                    // ambigu dengan dokterorder
                    objectpegawaiorderfk: $scope.dataOrderRadiologi.dokter,

                    iddokterverif: dataLogin.id,
                    namadokterverif: dataLogin.namaLengkap,
                    // iddokterorder: $scope.dataOrderRadiologi.dokter,
                    // namadokterorder: $scope.dataOrderRadiologi.namalengkap,
                    details: [],
                    bridging: []
                }

                let dataBridge = {
                    bridging: [],
                    noorder: $scope.dataOrderRadiologi.noorder,
                    objectkelasfk: $scope.dataOrderRadiologi.objectkelasfk,
                    // objectruangantujuanfk: 276,
                    objectpegawaiorderfk: $scope.dataOrderRadiologi.dokter,
                    iddokterverif: dataLogin.id,
                    namadokterverif: dataLogin.namaLengkap,
                }

                for (let i = 0; i < dataSourceGrid.length; i++) {
                    dataSave.details.push({
                        namaproduk: dataSourceGrid[i].namaproduk,
                        objectkelasfk: $scope.dataOrderRadiologi.objectkelasfk,
                        objectruanganfk: $scope.dataOrderRadiologi.objectruanganfk,

                        produkfk: dataSourceGrid[i].idProduk,
                        qtyproduk: dataSourceGrid[i].qtyproduk,
                    })

                    dataBridge.bridging.push({
                        produkid: dataSourceGrid[i].idProduk
                    })

                    dataSave.bridging.push({
                        produkid: dataSourceGrid[i].idProduk,
                        hargasatuan: dataSourceGrid[i].hargasatuan,
                        qtyproduk: dataSourceGrid[i].qtyproduk,
                        komponenharga: []
                    })

                    for (let ii = 0; ii < dataSourceGrid[i].detailKomponenHarga.length; ii++) {

                        dataSave.bridging[i].komponenharga.push({
                            objectkomponenhargafk: dataSourceGrid[i].detailKomponenHarga[ii].objectkomponenhargafk,
                            komponenharga: dataSourceGrid[i].detailKomponenHarga[ii].komponenharga,
                            hargasatuan: dataSourceGrid[i].detailKomponenHarga[ii].hargasatuan,
                            objectprodukfk: dataSourceGrid[i].detailKomponenHarga[ii].objectprodukfk,
                        });
                        // dataSave.bridging[i].komponenharga.push(dataSourceGrid[i].detailKomponenHarga[ii]);
                    }
                }

                console.log(dataSave);
                console.log(dataSourceGrid);

                // http://192.168.12.3:5555/simrs_harkit/service/transaksi/lab-radiologi/save-pelayanan-rad
                findPasienRadiologi.saveData("lab-radiologi/save-pelayanan-rad", dataSave).then((res) => {

                    findPasienRadiologi.saveData("lab-radiologi/save-bridging-zeta", dataBridge).then((res) => {
                        $scope.showAlertSuccess();
                    });

                })

                
            }
        }
    ]);
});