define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputResepApotikOrderRevCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper) {
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
            $scope.showInputDokter = $scope.dataLogin.id === 320263

            // $("#idAutoRacikan").kendoAutoComplete();

            $scope.dataResepDokter = new kendo.data.DataSource({
                data: []
            });

            $scope.listTipeResep = [{
                name: "Cito",
                id: 1
            }, {
                name: "Segera Pulang",
                id: 2
            }]

            $scope.listQuestion = [{
                name: 'Ya',
                id: 1
            }, {
                name: 'Tidak',
                id: 2
            }]

            $scope.listOfJenisResep = [{
                name: "Racikan",
                id: 1
            }, {
                name: "Non Racikan",
                id: 2
            }]

            $scope.isRouteLoading = false;
            $scope.isPopup = false;

            $scope.jumlahObat = 3;
            $scope.isHaveRiwayatAlergi = false;
            $scope.isBpjs = false;
            $scope.isResepEmpty = true;
            $scope.resep = {};
            $scope.listHistoryResep = [];
            $scope.listObat = [];
            $scope.listResep = [];
            $scope.dataTempObat = []
            $scope.tempListResep = [];

            $scope.item = {};
            $scope.item.tglResep = new Date();

            let norec_apd = '';
            let norec_pd = '';
            let nocm_str = '';

            let noTerima = '';
            let dataProdukDetail = [];
            let data2 = [];
            let hrg1 = 0;
            let hrgsdk = 0;
            let diffDays = 1;

            LoadCacheHelper();

            function LoadCacheHelper() {
                manageLogistikPhp.getDataTableTransaksi("akutansi/get-tgl-posting", true).then(function (dat) {
                    $scope.isRouteLoading = true;

                    var tgltgltgltgl = dat.data.mindate[0].max
                    var tglkpnaja = dat.data.datedate
                    $scope.minDate = new Date(tgltgltgltgl);
                    $scope.maxDate = new Date($scope.now);
                    $scope.startDateOptions = {
                        disableDates: function (date) {
                            var disabled = tglkpnaja;
                            if (date && disabled.indexOf(date.getDate()) > -1) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    };
                }, function (err) {
                    $scope.isRouteLoading = false;
                });

                var chacePeriode = cacheHelper.get('InputResepApotikOrderRevCtrl');
                if (chacePeriode != undefined) {
                    nocm_str = chacePeriode[0]
                    $scope.item.noMr = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    $scope.item.umur = chacePeriode[4]
                    $scope.item.kelompokPasien = chacePeriode[5]
                    if ($scope.item.kelompokPasien === "BPJS") {
                        $scope.isBpjs = true;
                    }
                    $scope.item.tglRegistrasi = chacePeriode[6]
                    norec_apd = chacePeriode[7]
                    norec_pd = chacePeriode[8]
                    $scope.item.idKelas = chacePeriode[9]
                    $scope.item.kelas = chacePeriode[10]
                    $scope.item.idRuangan = chacePeriode[11]
                    $scope.item.namaRuangan = chacePeriode[12]
                    manageLogistikPhp.getDataTableTransaksi("tatarekening/get-sudah-verif?noregistrasi=" +
                        $scope.item.noregistrasi, true).then(function (dat) {
                            $scope.item.statusVerif = dat.data.status;
                        }, function (err) {
                            $scope.isRouteLoading = false;
                        });
                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true;
                    }
                }
            }

            var getNamaObat = function () {
                $scope.isRouteLoading = true;

                let listTempObat = [];
                manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo", true).then(function (dat) {
                    $scope.listOfProduk = dat.data.produk;
                    $scope.listOfProdukFornas = dat.data.produkfornas;
                    for (let i = 0; i < dat.data.produk.length; i++) {
                        $scope.dataTempObat.push(dat.data.produk[i].namaproduk
                            + ($scope.isBpjs ? ' ------- ' + dat.data.produk[i].status : '')
                            + (dat.data.produk[i].jumlah > 0 ? ' ------- TERSEDIA '
                                + dat.data.produk[i].jumlah + ' '
                                + dat.data.produk[i].satuanstandar : ' ------- TIDAK TERSEDIA'));
                        listTempObat.push({ name: dat.data.produk[i].namaproduk });
                    }
                    $scope.listDokter = dat.data.penulisresep;
                    $scope.listOfProdukArray = $scope.dataTempObat;
                    $scope.listOfProdukArrayRacikan = new kendo.data.DataSource({
                        data: listTempObat
                    });
                    $scope.listOfProdukArrayRacikan.read();

                    $("#listObatRacikan").kendoAutoComplete({
                        dataSource: $scope.dataTempObat,
                        filter: "contains"

                    });
                    $("#listObatNonRacikan").kendoAutoComplete({
                        dataSource: $scope.dataTempObat,
                        filter: "contains"
                    });

                    $scope.isRouteLoading = false;
                }, function (err) {
                    $scope.isRouteLoading = false;
                });
            }

            getNamaObat();

            var init = function () {
                $scope.isRouteLoading = true;

                $scope.item.idLogin = JSON.parse(localStorage.getItem('pegawai'));

                $scope.listObat = [{
                    key: 1 + $scope.listObat.length,
                    namaObatRacikan: "",
                    satuan: "",
                    jumlah: ""
                }];

                if ($scope.tempListResep.length > 0) {
                    $scope.isResepEmpty = false;
                } else {
                    $scope.isResepEmpty = true;
                }

                manageLogistikPhp.getDataTableMaster("produk/master-paket?idjenispaket=5").then(res => {
                    $scope.listPaketResep = res.data

                    $scope.isRouteLoading = false;
                }, err => {
                    $scope.isRouteLoading = false;
                })
            }

            init();

            $scope.getDetailPaketResep = (data) => {
                if (!data) return;

                $scope.isRouteLoading = true;
                $scope.isPopup = true;
                manageLogistikPhp.getDataTableTransaksi("logistik/daftar-resep-paket?idpaket=" + data.id).then(res => {
                    if (res.data && res.data.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            res.data[i].checked = true;
                            res.data[i].jmlPaketObat = 0;
                            res.data[i].instruksi = '';
                        }
                        $scope.dataListResepByPaket = res.data;

                        $scope.popUpPaket.open().center();

                        $scope.isRouteLoading = false;
                        $scope.isPopup = false;
                    } else {
                        toastr.warning('Daftar obat tidak ditemukan', 'Peringatan')

                        $scope.isRouteLoading = false;
                        $scope.isPopup = false;
                    }
                }, (error) => {
                    $scope.isRouteLoading = false;
                    $scope.isPopup = false;
                })
            }

            $scope.updateCheckedData = (index) => {
                $scope.dataListResepByPaket[index].checked = !$scope.dataListResepByPaket[index].checked;
            }

            $scope.simpanPaket = () => {
                for (let i = 0; i < $scope.dataListResepByPaket.length; i++) {
                    let resep = {
                        resepKe: $scope.tempListResep.length + 1,
                        jenisKemasan: false,
                        jumlah: $scope.dataListResepByPaket[i].jmlPaketObat,
                        namaObat: $scope.dataListResepByPaket[i].namaproduk,
                        pieces: 0,
                    }
                    $scope.tempListResep.push({
                        keterangan: $scope.dataListResepByPaket[i].instruksi,
                        resep: [
                            resep
                        ]
                    });
                }

                $scope.popUpPaket.close();
            }

            // untuk Konversi ke romawi
            function convertToRoman(number) {
                let result = ''
                let decimal = [1000, 500, 100, 50, 10, 5, 1];
                let roman = ["M", "D", "C", "L", "X", "V", "I"];
                if (number === 90) {
                    return result = 'XC'
                } else if (number === 900) {
                    return result = 'CM'
                } else {
                    for (var i = 0; i <= decimal.length; i++) {
                        while (number % decimal[i] < number) {
                            result += roman[i];
                            number -= decimal[i];
                        }
                    }
                    return result;
                }
            }

            $scope.getSatuan = function (data, index) {
                $scope.listSatuan = data.konversisatuan;

                $scope.getHargaSatuan(data.id);
                manageLogistikPhp.getDataTableTransaksi("logistik/get-info-stok?produkfk=" + data.id, true).then(function (e) { })
            }

            $scope.getSatuanNonRacikan = function (data) {
                $scope.listSatuan = data.konversisatuan;

                $scope.getHargaSatuan(data.id);
                manageLogistikPhp.getDataTableTransaksi("logistik/get-info-stok?produkfk=" + data.id, true).then(function (e) { })
            }

            $scope.getRiwayatAlergi = function (id) {
                if (id === 1) {
                    $scope.isHaveRiwayatAlergi = true;
                } else {
                    $scope.isHaveRiwayatAlergi = false;
                }
            }

            // untuk menambah obat racikan
            $scope.tambahObat = function (index) {
                var data = {
                    key: 1 + $scope.listObat.length,
                    namaObatRacikan: "",
                    satuan: "",
                    jumlah: ""
                };

                // let autoComplete = $("#idAutoRacikan").data('kendoAutoComplete');

                let i = index + 1;
                if (!$scope.isBpjs) {
                    $scope.resep.namaObatRacikan[i] = '-';
                }

                // autoComplete.refresh();

                $scope.listObat.push(data);
            }

            $scope.hapusObat = function (index) {
                if ($scope.listObat.length != 1) {
                    $scope.listObat.splice(index);
                } else {
                    $scope.resep.namaObatRacikan[index] = '';
                    $scope.resep.jumlahDosis = ''
                }
            }

            $scope.hapusResep = function (index) {
                $scope.tempListResep.splice(index, 1);
                if ($scope.tempListResep.length === 0) {
                    $scope.isResepEmpty = true;
                }
            }

            $scope.findLastIndex = function (index) {
                for (let i = index + 1; i === $scope.listObat.length; i++) {
                    return true;
                }
                return false;
            }

            $scope.getHargaSatuanNew = function (id) {
                let harga = 0, data;
                manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?produkfk=" + id + "&ruanganfk=94", true).then((res) => {
                    data = res.data.detail;
                    for (let i = 0; i < data.length; i++) {
                        harga = res.data.detail[i].hargajual;
                    }
                });

                return harga;
            }

            $scope.getHargaSatuan = function (id) {
                manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?produkfk=" + id + "&ruanganfk=94", true).then((res) => {
                    if (res.data.detail) {
                        $scope.item.hargaSatuan = [];
                        for (let i = 0; i < res.data.detail.length; i++) {
                            // let dataTemp = {}
                        }
                        $scope.item.hargaSatuan = parseFloat(res.data.detail[0].hargajual);
                    }
                })
            }

            $scope.getNilaiKonversi = function (data) {
                $scope.item.nilaiKonversi = data.nilaikonversi;
            }

            // simpan ke temporary resep
            $scope.simpan = function (data) {
                let getJenisPegawai = $scope.dataLogin.jenisPegawai.jenispegawai ? $scope.dataLogin.jenisPegawai.jenispegawai : $scope.dataLogin.jenisPegawai.jenisPegawai;
                if (getJenisPegawai !== "DOKTER" && $scope.dataLogin.id != 320263) {
                    toastr.info('Anda tidak memiliki akses menambahkan Resep Elektronik', 'Informasi');
                    return;
                }

                var keteranganPenggunaan = '', intruksiPenggunaan = '', jumlah = '', isRacikan = false, pcs = 0;
                if (data === 2) {
                    if ($scope.item.intruksiPenggunaanRacikan == undefined || $scope.item.intruksiPenggunaanRacikan == '') {
                        toastr.warning('Harap isi Intruksi Pemakaian Obat', 'Peringatan');
                        return;
                    }

                    keteranganPenggunaan = $scope.item.intruksiPenggunaanRacikan;
                    intruksiPenggunaan = `${$scope.resep.ketCaraPembuatan} ${$scope.resep.pcsObat} ${$scope.resep.kemasan}`;
                    isRacikan = true;
                    pcs = $scope.resep.pcsObat
                } else {
                    if ($scope.item.keterangan == undefined || $scope.item.keterangan == '') {
                        toastr.warning('Harap isi Keterangan', 'Peringatan');
                        return;
                    }

                    keteranganPenggunaan = $scope.item.keterangan;
                    intruksiPenggunaan = $scope.item.intruksiPenggunaan;
                    isRacikan = false;
                }

                var dataResep = {
                    resep: [],
                    keterangan: keteranganPenggunaan,
                    intruksi: intruksiPenggunaan
                }

                if (data === 1) {
                    for (var i = 0; i < $scope.listObat.length; i++) {
                        dataResep.resep.push({
                            // nilaiKonversi: $scope.item.nilaiKonversi,
                            // hargaSatuan: $scope.getHargaSatuanNew($scope.resep.namaObat.id),

                            namaObat: $scope.resep.namaObatNew.split(" ------- ")[0],
                            jumlah: $scope.resep.jumlahObat.toString(),
                            jenisKemasan: isRacikan,
                            resepKe: $scope.tempListResep.length + 1,
                            pieces: pcs,

                            // satuanObat: {
                            //     satuanStandar: $scope.resep.satuanObat.satuanstandar,
                            //     ssid: $scope.resep.satuanObat.ssid
                            // }
                        });
                    }
                } else {
                    for (var i = 0; i < $scope.listObat.length; i++) {
                        dataResep.resep.push({
                            // [1][""0""].name
                            // namaObat: $scope.resep.namaObatRacikan[i][0].name,

                            namaObat: $scope.resep.namaObatRacikan[i].split(" ------- ")[0],

                            // nilaiKonversi: $scope.item.nilaiKonversi,
                            // hargaSatuan: $scope.getHargaSatuanNew($scope.resep.namaObat[i].id),

                            jumlah: $scope.resep.jumlahDosis[i].toString(),
                            resepKe: $scope.tempListResep.length + 1,
                            pieces: pcs,
                            jenisKemasan: isRacikan,

                            // satuanObat: {
                            //     satuanStandar: $scope.resep.satuanObat[i].satuanstandar,
                            //     ssid: $scope.resep.satuanObat[i].ssid
                            // }
                        });
                    }
                }

                $scope.tempListResep.push(dataResep);
                $scope.dataResepDokter.add(dataResep);

                clear();
                init();
            }

            $scope.cetakResep = function () {
                window.open("http://192.168.12.4:7777/service-reporting/resep-pasien/" + $scope.item.norec_so);
            }

            $scope.reoderResep = function () {
                if ($scope.isBpjs && !$scope.isvalid) {
                    toastr.info('Tidak dapat reorder karena order histori dilakukan sebelum implementasi formularium nasional', 'Informasi');
                    return;
                }

                clear();

                let data = [];
                for (let i = 0; i < $scope.dataDetailResep.length; i++) {
                    let dataTemp = {
                        keterangan: $scope.dataDetailResep[i].obat[0].keteranganpakai,
                        intruksi: $scope.dataDetailResep[i].obat[0].keteranganlainnya,
                        resep: []
                    };
                    for (let ii = 0; ii < $scope.dataDetailResep[i].obat.length; ii++) {
                        dataTemp.resep.push({
                            namaObat: $scope.dataDetailResep[i].obat[ii].namaobat,
                            jumlah: $scope.dataDetailResep[i].obat[ii].qtyproduk,
                            resepKe: $scope.dataDetailResep[i].resep,
                            pieces: parseInt($scope.dataDetailResep[i].obat[ii].keteranganlainnya),
                            jenisKemasan: $scope.dataDetailResep[i].obat[ii].length < 2 ? false : true,
                        });
                    }

                    data.push(dataTemp);
                }
                $scope.tempListResep = data;
                $scope.isResepEmpty = false;
                $scope.tabResepElektornik = 0;

                $scope.close();
            }

            // clear out variable
            var clear = function () {
                // let autoComplete = $("#idAutoRacikan").data('kendoAutoComplete');
                // autoComplete.refresh();

                $scope.item.intruksiPenggunaan = '';
                $scope.item.keterangan = '';
                $scope.item.intruksiPenggunaanRacikan = '';

                $scope.resep.namaObatNew = "";
                $scope.resep.namaObatNewFornas = undefined;
                $scope.resep.namaObatRacikan = [];
                $scope.resep.namaObatRacikanFornas = [];
                $scope.resep.jumlahObat = '';
                $scope.resep.satuanObat = '';
                $scope.resep.ketCaraPembuatan = '';
                $scope.resep.jumlahDosis = '';
                $scope.resep.pcsObat = '';
                $scope.resep.kemasan = '';
            }

            // method untuk kirim resep ke farmasi
            $scope.kirimKeFarmasi = function () {
                if ($scope.dataLogin.id === 320263 && !$scope.item.dokter) {
                    toastr.info('Harap isi Dokter terlebih dahulu', 'Informasi');
                    return;
                }

                let getJenisPegawai = $scope.dataLogin.jenisPegawai.jenispegawai ? $scope.dataLogin.jenisPegawai.jenispegawai : $scope.dataLogin.jenisPegawai.jenisPegawai;
                if (getJenisPegawai !== "DOKTER" && $scope.dataLogin.id !== 320263) {
                    toastr.info('Anda tidak memiliki akses menambahkan Resep Elektronik', 'Informasi');
                    return;
                }

                if (!$scope.resep.riwayatAlergi) {
                    toastr.warning('Anda belum mengisi Riwayat Alergi', 'Peringatan')
                    return;
                }

                if (!$scope.resep.beratBadan) {
                    toastr.warning('Anda belum mengisi Berat Badan', 'Peringatan');
                    return
                }

                if (!$scope.item.izinPerubahanObat) {
                    toastr.warning('Anda belum memilih subtitusi Obat', 'Peringatan');
                    return
                }

                $scope.isRouteLoading = true;

                let dataTemp = [{
                    "strukorder": {
                        "tglresep": moment($scope.item.tglResep).format('YYYY-MM-DD HH:mm:ss'),
                        "penulisresepfk": $scope.showInputDokter ? $scope.item.dokter.id : $scope.item.idLogin.id,
                        "ruanganfk": $scope.item.idRuangan,
                        "noregistrasifk": norec_apd,
                        "cito": $scope.isCito ? $scope.isCito : false,
                        "pulang": $scope.isSegeraPulang ? $scope.isSegeraPulang : false,
                        "izinobat": $scope.item.izinPerubahanObat,
                        "riwayatalergi": $scope.resep.riwayatAlergiPasien ? $scope.resep.riwayatAlergiPasien : '-',
                        "beratbadan": $scope.resep.beratBadan
                    },
                    "resepdokter": []
                }]

                let gridResep = $scope.tempListResep;
                for (let i = 0; i < gridResep.length; i++) {
                    for (let ii = 0; ii < gridResep[i].resep.length; ii++) {
                        dataTemp[0]["resepdokter"].push(
                            {
                                "rke": gridResep[i].resep[ii].resepKe,
                                "namaobat": gridResep[i].resep[ii].namaObat,
                                "jumlah": gridResep[i].resep[ii].jumlah,
                                "jeniskemasanfk": gridResep[i].resep[ii].jenisKemasan ? 1 : 2,
                                "keteranganlainnya": gridResep[i].intruksi ? gridResep[i].intruksi : "-",
                                "keteranganpakai": gridResep[i].keterangan
                            }
                        );
                    }
                }

                let dataResep = [];
                dataResep.push(dataTemp[0]);
                manageLogistikPhp.postpost('farmasi/resep-dokter?strukorder=' + norec_apd, dataResep).then(function (res) {
                    dataResep = [];
                    $scope.tempListResep = [];
                    $scope.resep.beratBadan = '';
                    $scope.item.izinPerubahanObat = '';
                    $scope.isCito = '';
                    $scope.isSegeraPulang = '';
                    $scope.isResepEmpty = true;
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                })
            }

            $scope.columnHistoryResep = {
                pageable: true,
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
                    field: "tglorder",
                    title: "<h3>Tanggal</h3>", width: "100px",
                }, {
                    field: "namalengkap",
                    title: "<h3>Dokter</h3>", width: "100px",
                }, {
                    command: [{
                        text: " Detail",
                        align: "center",
                        attributes: {
                            align: "center"
                        },
                        click: showDetail,
                        imageClass: "fa fa-bars"
                    }],
                    title: "",
                    width: "10%",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                }],
            };

            // method untuk show detail resep history
            function showDetail(e) {
                e.preventDefault();

                $scope.isRouteLoading = true;
                $scope.isPopup = true;
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item.norec_so = dataItem.norec;
                $scope.tglorder = dataItem.tglorder;
                $scope.isvalid = dataItem.fornasimplvalidation;

                $scope.popDetailResep.center().open();

                $scope.dataDetailResep = [];
                manageLogistikPhp.getDataTableTransaksi('rekam-medis/get-resep-dokter-detail?strukorder=' + dataItem.norec).then(res => {
                    $scope.dataDetailResep = res.data.data;

                    $scope.isRouteLoading = false;
                    $scope.isPopup = false
                }, (error) => {
                    $scope.isRouteLoading = false;
                    $scope.isPopup = false
                });
            }

            // method untuk close popup detail resep history
            $scope.close = function () {
                $scope.popDetailResep.close();
            }

            // method untuk mengambil data history resep
            var getHistoryResep = function () {
                $scope.isRouteLoading = true;
                $scope.showLoader = true;
                manageLogistikPhp.getDataTableTransaksi('rekam-medis/get-resep-dokter?nocm=' + nocm_str).then(res => {
                    $scope.listHistoryResep = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 5
                    });

                    $scope.showLoader = false;
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.showLoader = false;
                    $scope.isRouteLoading = false;
                })
            }

            // method untuk event ketika tab berubah
            $scope.onChangeTab = function (data) {
                if (data === 2) {
                    getHistoryResep();
                }
            }
        }
    ]);
});