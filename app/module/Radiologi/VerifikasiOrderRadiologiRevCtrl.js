define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('VerifikasiOrderRadiologiRevCtrl', ['FindProduk', 'CacheHelper', 'ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienRadiologi', 'DateHelper', '$mdDialog',
        function (produkService, cacheHelper, managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienRadiologi, dateHelper, $mdDialog) {
            $scope.item = {};
            $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            $scope.isRouteLoading = false;
            $scope.dataOrderRadiologi = JSON.parse(localStorage.getItem("dataOrderRadiologi"));
            console.log($scope.dataOrderRadiologi);
            $scope.isDetail = $scope.dataOrderRadiologi.status === "SELESAI DIVERIFIKASI";
            $scope.totalHargaProduk = 'Rp. 0,00';

            let dataLogin = JSON.parse(localStorage.getItem("pegawai"));

            $scope.listDokterVerifikasi = [{
                id: 950,
                namalengkap: "dr Yarmaniani Miliati Muchtar, Sp.Rad"
            }, {
                id: 320266,
                namalengkap: "dr. Ido Narpati Bramantya, Sp.Rad"
            }, {
                id: 22632,
                namalengkap: "dr. Gita Maria, Sp.Rads"
            }, {
                id: 1420,
                namalengkap: "dr. Ade Satrijani Sutarto, Sp.Rad"
            }]
            $scope.layanan = {};

            let init = () => {
                $scope.isRouteLoading = true;
                findPasienRadiologi.getData("lab-radiologi/get-daftar-order-detail?strukorder=" + $state.params.norec).then((res) => {
                    $scope.isRouteLoading = false;
                    $scope.detailOrderRadiologi = res.data;
                    $scope.norec_apd = res.data.norec_apd;

                    console.log($scope.norec_apd);
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
            }, {
                "field": "jadualTindakan",
                "title": "Jadwal Tindakan",
                "width": 100,
            }, {
                "field": "konsultasiAnestesi",
                "title": "Konsultasi Anestesi",
                "width": 100,
            }, {
                "field": "pemeriksaanRadiologi",
                "title": "Pemeriksaan Radiologi",
                "width": 100,
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
                console.log(dataItem);

                $scope.popupVerifikasi.open().center();
            }

            let dataSource = [];
            $scope.verifikasiData = () => {
                if (!$scope.layanan.iptProduk) {
                    toastr.warning("Harap pilih Nama Produk terlebih dahulu");
                    return
                }

                if (!$scope.layanan.iptQty) {
                    toastr.warning("Harap isi QTY terlebih dahulu");
                    return
                }

                if (!$scope.layanan.jadwalTindakan) {
                    toastr.warning("Harap pilih Jadwal Tindakan terlebih dahulu");
                    return
                }
                let data = {
                    namaproduk: $scope.layanan.iptProduk.namaproduk,
                    detailKomponenHarga: $scope.layanan.iptProduk.detailKomponenHarga,
                    hargasatuan: $scope.layanan.iptProduk.hargasatuan,
                    idProduk: $scope.layanan.iptProduk.prid,
                    qtyproduk: $scope.layanan.iptQty,
                    persiapan: $scope.layanan.persiapan,
                    riwayat: $scope.layanan.riwayat,
                    catatan_tambahan: $scope.layanan.catatan_tambahan,
                    jadualTindakan: dateHelper.formatDate($scope.layanan.jadwalTindakan, "YYYY-MM-DD HH:mm"),
                    pemeriksaanRadiologi: $scope.layanan.pemeriksaanRadiologi,
                    persiapanRadiologi: $scope.layanan.persiapanRadiologi,
                    konsultasiAnestesi: $scope.layanan.konsultasiAnestesi,
                    dokterVerif: $scope.layanan.dokterVerif.id
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

            $scope.cetakBuktiLayanan = function () {
                let client = new HttpClient();
                let confirm = $mdDialog.confirm()
                    .title('Lihat Bukti Layanan?')
                    .ariaLabel('Lucky day')
                    .ok('Ya')
                    .cancel('Tidak');

                $mdDialog.show(confirm).then(function () {
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan-ruangan=1&norec='
                        + $scope.item.noregistrasi + '&strIdPegawai=' + $scope.pegawai.id +
                        '&strIdRuangan=ORDERRADIOLOGI' + $scope.norec_apd + '&view=true', function (response) {
                            // do something with response
                        });
                }, function () {
                    console.log("Batal");
                });
                // if (!$scope.item.noregistrasi && !norec_apd) {
                //     //cetakan langsung service VB6 by grh
                //     var stt = 'false'
                //     if (confirm('View Bukti Layanan? ')) {
                //         // Save it!
                //         stt = 'true';
                //     } else {
                //         // Do nothing!
                //         stt = 'false'
                //     }
                //     var client = new HttpClient();

                   

                // }
            }


            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }

            $scope.simpanData = () => {

                let dataSourceGrid = $scope.dataSourceVerified._data;
                let dataSave = {
                    norec_pp: "",
                    noorder: $scope.dataOrderRadiologi.noorder,
                    norec_so: $scope.dataOrderRadiologi.norec_so,
                    objectkelasfk: $scope.dataOrderRadiologi.objectkelasfk,
                    norec_pd: $scope.dataOrderRadiologi.norec_pd,
                    objectpegawaiorderfk: $scope.dataOrderRadiologi.dokter,
                    iddokterverif: dataLogin.id,
                    namadokterverif: dataLogin.namaLengkap,
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
                        jadualTindakan: dataSourceGrid[i].jadualTindakan,
                        produkfk: dataSourceGrid[i].idProduk,
                        qtyproduk: dataSourceGrid[i].qtyproduk,
                        pemeriksaanRadiologi: dataSourceGrid[i].pemeriksaanRadiologi,
                        persiapanRadiologi: dataSourceGrid[i].persiapanRadiologi,
                        konsultasiAnestesi: dataSourceGrid[i].konsultasiAnestesi,
                    })

                    dataBridge.bridging.push({
                        produkid: dataSourceGrid[i].idProduk
                    })

                    dataSave.bridging.push({
                        produkid: dataSourceGrid[i].idProduk,
                        iddokterverif: dataSourceGrid[i].dokterVerif,
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
                    }
                }

                console.log(dataSave);

                findPasienRadiologi.saveData("lab-radiologi/save-pelayanan-rad", dataSave).then((res) => {

                    findPasienRadiologi.saveData("lab-radiologi/save-bridging-zeta", dataBridge).then((res) => {
                        $scope.showAlertSuccess();
                    });

                })


            }
        }
    ]);
});