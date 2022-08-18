define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputResepElektronikCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', '$mdDialog', 'CetakHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, $mdDialog, cetakHelper) {
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
            $scope.dataResepDokter = new kendo.data.DataSource({
                data: []
            });

            $scope.listTipeResep = [{
                name: "Cito",
                id: 1
            },
            {
                name: "Segera Pulang",
                id: 2
            }
            ]

            $scope.dataTempObat = [];
            $scope.dataTempAlergi = [];
            $scope.isHaveRiwayatAlergi = false;
            $scope.isBpjs = false;
            $scope.isRouteLoading = false;
            $scope.jumlahObat = 3;
            $scope.isResepEmpty = true;
            $scope.item = {};
            $scope.listHistoryResep = [];
            $scope.resep = {};
            $scope.listObat = [];
            $scope.tempListResep = [];
            $scope.listResep = [];
            $scope.listQuestion = [{
                name: 'Ya',
                id: 1
            },
            {
                name: 'Tidak',
                id: 2
            }
            ]

            $scope.item.tglResep = new Date();
            let norec_apd = '';
            let norec_pd = '';
            let nocm_str = '';
            let dataProdukDetail = [];
            let noTerima = '';
            let data2 = [];
            let hrg1 = 0;
            let hrgsdk = 0;
            let diffDays = 1;
            $scope.listOfJenisResep = [{
                name: "Racikan",
                id: 1
            },
            {
                name: "Non Racikan",
                id: 2
            }
            ]

            LoadCacheHelper();

            function LoadCacheHelper() {
                let dataPasien = JSON.parse(localStorage.getItem("ResepElektronikRadiologi"));

                console.log(dataPasien);
                manageLogistikPhp.getDataTableTransaksi("akutansi/get-tgl-posting", true).then(function (dat) {
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
                });

                $scope.item.noMr = dataPasien.nocm;
                nocm_str = dataPasien.nocm;
                $scope.item.namaPasien = dataPasien.namapasien;
                $scope.item.jenisKelamin = dataPasien.jeniskelamin;
                $scope.item.noregistrasi = dataPasien.noregistrasi;
                $scope.item.kelompokPasien = dataPasien.kelompokpasien;
                if ($scope.item.kelompokPasien === "BPJS") {
                    $scope.isBpjs = true;
                }
                $scope.item.tglRegistrasi = dataPasien.tglregistrasi;
                norec_apd = dataPasien.norec;
                norec_pd = dataPasien.norec_pd;
                $scope.item.idKelas = dataPasien.klid;
                $scope.item.kelas = dataPasien.namakelas;
                $scope.item.namaRuangan = dataPasien.namaruangan;
                // var chacePeriode = cacheHelper.get('InputResepApotikOrderRevCtrl');
                // if (chacePeriode != undefined) {
                //     //var arrPeriode = chacePeriode.split(':');
                //     $scope.item.noMr = chacePeriode[0]
                //     nocm_str = chacePeriode[0]
                //     $scope.item.namaPasien = chacePeriode[1]
                //     $scope.item.jenisKelamin = chacePeriode[2]
                //     $scope.item.noregistrasi = chacePeriode[3]
                //     $scope.item.umur = chacePeriode[4]
                //     $scope.item.kelompokPasien = chacePeriode[5]
                //     $scope.item.tglRegistrasi = chacePeriode[6]
                //     norec_apd = chacePeriode[7]
                //     norec_pd = chacePeriode[8]
                //     $scope.item.idKelas = chacePeriode[9]
                //     $scope.item.kelas = chacePeriode[10]
                //     $scope.item.idRuangan = chacePeriode[11]
                //     $scope.item.namaRuangan = chacePeriode[12]
                //     manageLogistikPhp.getDataTableTransaksi("tatarekening/get-sudah-verif?noregistrasi=" +
                //         $scope.item.noregistrasi, true).then(function (dat) {
                //         $scope.item.statusVerif = dat.data.status;
                //     });
                //     if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                //         $scope.showTombol = true;
                //     }
                // }
            }

            // $("#listObatNonRacikan").kendoAutoComplete({
            //     dataSource: $scope.dataTempObat,
            //     filter: "startswith",
            //     // placeholder: "Masukkan Nama Obat..."                        
            // });
            // $("#listObatRacikan").kendoAutoComplete({
            //     dataSource: $scope.dataTempObat,
            //     filter: "startswith",
            //     // placeholder: "Masukkan Nama Obat...",

            // });
            var getNamaObat = function () {
                $scope.isRouteLoading = true;
                let listTempObat = [];
                manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo?pasien_id=" + $scope.item.noMr, true).then(function (dat) {
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
                    if (dat.data.alergi.length > 0) {
                        $scope.isHaveRiwayatAlergi = true;
                        $scope.resep.riwayatAlergi = {
                            name: 'Ya',
                            id: 1
                        }
                    }
                    $scope.listRiwayatAlergi = dat.data.alergi;
                    for (let i = 0; i < dat.data.alergi.length; i++) {
                        $scope.dataTempAlergi.push(dat.data.alergi[i].alergi);
                    }
                    $scope.listDokter = dat.data.penulisresep;
                    $scope.listOfProdukArray = $scope.dataTempObat;
                    $scope.listRiwayatAlergi = $scope.dataTempAlergi;
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
                    $("#listAlergi").kendoAutoComplete({
                        dataSource: $scope.dataTempAlergi,
                        filter: "contains"
                    });
                    $scope.resep.riwayatAlergiPasien = $scope.dataTempAlergi[0];

                    $scope.isRouteLoading = false;
                }, function (err) {
                    $scope.isRouteLoading = false;
                });
            }
            getNamaObat();

            var init = function () {
                $scope.item.idLogin = JSON.parse(localStorage.getItem('pegawai'));
                $scope.listObat = [{
                    key: 1 + $scope.listObat.length,
                    namaObatRacikan: "",
                    satuan: "",
                    jumlah: ""

                }];
                $scope.isResepEmpty = $scope.tempListResep.length == 0;

                // console.log(JSON.stringify($scope.tempListResep))
                // $scope.listResep = new kendo.data.DataSource({
                //     data: $scope.tempListResep,
                //     pageSize: 5
                // });
            }
            init();

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
                // if(data.konversisatuan.length > 1) {
                //     $scope.resep.satuanObat = {
                //         satuanstandar:data.satuanstandar,
                //         ssid:data.ssid
                //     }
                // } else {
                //     $scope.resep.satuanObat = {};
                // }
                $scope.getHargaSatuan(data.id);
                manageLogistikPhp.getDataTableTransaksi("logistik/get-info-stok?produkfk=" + data.id, true).then(function (e) { })
            }

            $scope.getSatuanNonRacikan = function (data) {
                $scope.listSatuan = data.konversisatuan;
                // if(data.konversisatuan.length > 1) {
                //     $scope.resep.satuanObat = {
                //         satuanstandar:data.satuanstandar,
                //         ssid:data.ssid
                //     }
                // } else {
                //     $scope.resep.satuanObat = {};
                // }
                $scope.getHargaSatuan(data.id);
                manageLogistikPhp.getDataTableTransaksi("logistik/get-info-stok?produkfk=" + data.id, true)
                    .then(function (e) { })
            }

            $scope.getRiwayatAlergi = function (id) {
                if (id === 1) {
                    $scope.isHaveRiwayatAlergi = true;
                } else {
                    $scope.isHaveRiwayatAlergi = false;
                }
            }

            $scope.autocompleteOptions = {
                filter: "contains"
            }

            // untuk menambah obat racikan
            $scope.tambahObat = function (index) {

                let i = index + 1;
                var data = {
                    key: 1 + $scope.listObat.length,
                    namaObatRacikan: "",
                    satuan: "",
                    jumlah: ""
                };
                let autoComplete = $("#idAutoRacikan");
                // console.log(autoComplete)
                autoComplete.val();
                // console.log(autoComplete)
                // autoComplete.refresh();
                if (!$scope.isBpjs) {
                    $scope.resep.namaObatRacikan[i] = '-';
                }
                console.log($scope.resep.namaObatRacikan[i])

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
                let harga = 0,
                    data;

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

                if (getJenisPegawai !== "DOKTER") {
                    toastr.info('Anda tidak memiliki akses menambahkan Resep Elektronik');
                    return;
                }

                var keteranganPenggunaan = '',
                    intruksiPenggunaan = '',
                    jumlah = '',
                    isRacikan = false,
                    pcs = 0;

                if (data === 2) {
                    if ($scope.item.intruksiPenggunaanRacikan == undefined || $scope.item.intruksiPenggunaanRacikan == '') {
                        toastr.warning('Harap isi Intruksi Pemakaian Obat');
                        return;
                    }
                    $scope.isResepEmpty = false;
                    let autocomplete = $("#idAutoRacikan").kendoAutoComplete()
                    autocomplete.data('kendoAutoComplete').value("");

                    keteranganPenggunaan = $scope.item.intruksiPenggunaanRacikan;
                    intruksiPenggunaan = `${$scope.resep.ketCaraPembuatan} ${$scope.resep.pcsObat} ${$scope.resep.kemasan}`;
                    isRacikan = true;
                    pcs = $scope.resep.pcsObat
                } else {
                    if ($scope.item.keterangan == undefined || $scope.item.keterangan == '') {
                        toastr.warning('Harap isi Keterangan');
                        return;
                    }

                    $scope.isResepEmpty = false;
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
                for (let i = 0; i < dataResep.resep.length; i++) {
                    if ((dataResep.resep[i].namaObat === "-") || (!dataResep.resep[i].namaObat)) {
                        toastr.warning("Harap Isi Obat kembali", "Nama Obat Invalid 😨");
                        console.error("Nama Obat => ", dataResep.resep[i].namaObat, "is not allowed");
                        console.dir("sengaja dibuat error 😨");
                        // sengaja dibuat error
                        console.error(el.namaObat);
                        continue;
                    }
                }

                $scope.tempListResep.push(dataResep);
                $scope.dataResepDokter.add(dataResep);

                clear();
                init();

            }

            $scope.cetakResep = function () {
                window.open(cetakHelper.openURLReporting("reporting/resep?struk_order_id=" + $scope.item.norec_so));
            }

            // clear out variable
            var clear = function () {
                // let autoComplete2 = $("#idAutoRacikan");
                // autoComplete2[0].value = "";
                // $scope.item.keterangan = '';
                // $scope.resep.namaObatNew = null;
                $scope.item.intruksiPenggunaan = '';
                $scope.item.keterangan = '';
                $scope.item.intruksiPenggunaanRacikan = '';

                $scope.resep.namaObatNew = "";
                $scope.resep.namaObatRacikan[0] = '-';
                // $scope.resep.namaObatRacikan = [];
                $scope.resep.jumlahObat = '';
                $scope.resep.satuanObat = '';
                $scope.resep.ketCaraPembuatan = '';
                $scope.resep.jumlahDosis = '';
                $scope.resep.pcsObat = '';
                $scope.resep.kemasan = '';
                $scope.item.intruksiPenggunaanRacikan = '';
                $scope.item.intruksiPenggunaan = '';

                // console.log("1 =>", autocomplete2);

                // console.log("2 =>", autocomplete2);
            }

            // method untuk kirim resep ke farmasi
            $scope.kirimKeFarmasi = function (e) {
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
                    toastr.warning('Anda belum mengisi Riwayat Alergi');
                    $scope.isRouteLoading = false;
                    return;
                }
                if (!$scope.resep.beratBadan) {
                    toastr.warning('Anda belum mengisi Berat Badan');
                    $scope.isRouteLoading = false;
                    return;
                }

                if (!$scope.item.izinPerubahanObat) {
                    $scope.isRouteLoading = false;
                    toastr.warning('Anda belum memilih subtitusi Obat');
                    return;
                }
                
                if ($scope.tempListResep.length == 0) {
                    toastr.warning('Daftar resep masih kosong', 'Peringatan');
                    return
                }

                let gridResep = $scope.tempListResep;
                let dataResep = [];
                let dataTemp = [{
                    "strukorder": {
                        "tglresep": moment($scope.item.tglResep).format('YYYY-MM-DD HH:mm:ss'),
                        "penulisresepfk": $scope.item.idLogin.id,
                        "ruanganfk": $scope.item.idRuangan,
                        "noregistrasifk": norec_apd,
                        "cito": $scope.isCito ? $scope.isCito : false,
                        "pulang": $scope.isSegeraPulang ? $scope.isSegeraPulang : false,
                        "izinobat": $scope.item.izinPerubahanObat,
                        "riwayatalergi": $scope.resep.riwayatAlergiPasien ? $scope.resep.riwayatAlergiPasien : '-',
                        "beratbadan": $scope.resep.beratBadan
                    },
                    // "orderfarmasi": [],
                    "resepdokter": []
                }]
                for (let i = 0; i < gridResep.length; i++) {
                    for (let ii = 0; ii < gridResep[i].resep.length; ii++) {
                        // let dataTempResep = {
                        //     "hargasatuan": gridResep[i].resep[ii].hargaSatuan,
                        //     "nilaikonversi": parseInt(gridResep[i].resep[ii].nilaiKonversi),
                        //     "jeniskemasanfk": gridResep[i].resep[ii].jenisKemasan ? 1 : 2,
                        //     "pcs": parseInt(gridResep[i].resep[ii].pieces),
                        //     "ruanganfk": $scope.item.idRuangan,
                        //     "produkfk": gridResep[i].resep[ii].namaObat.id,
                        //     "jumlah": parseInt(gridResep[i].resep[ii].jumlah),
                        //     "satuanstandarfk": gridResep[i].resep[ii].satuanObat.ssid,
                        //     "satuanstandar": gridResep[i].resep[ii].satuanObat.satuanStandar,
                        //     "satuanviewfk": gridResep[i].resep[ii].satuanObat.ssid,
                        //     "satuanview": gridResep[i].resep[ii].satuanObat.satuanStandar,
                        //     "keterangan": gridResep[i].keterangan,
                        //     "rke": gridResep[i].resep[ii].resepKe
                        // };
                        // dataTemp[0]['orderfarmasi'].push(dataTempResep);
                        dataTemp[0]["resepdokter"].push({
                            "rke": gridResep[i].resep[ii].resepKe,
                            "namaobat": gridResep[i].resep[ii].namaObat,
                            "jumlah": gridResep[i].resep[ii].jumlah,
                            "jeniskemasanfk": gridResep[i].resep[ii].jenisKemasan ? 1 : 2,
                            "keteranganlainnya": gridResep[i].intruksi ? gridResep[i].intruksi : "-",
                            "keteranganpakai": gridResep[i].keterangan
                        });
                    }
                }
                dataResep.push(dataTemp[0]);
                console.log(JSON.stringify($scope.tempListResep));

                var confirm = $mdDialog.confirm()
                    .title('Kirim order resep ini untuk pasien ' + $scope.item.namaPasien + '?')
                    .htmlContent('<ul><li>Periksa kembali daftar resep yang akan dikirim</li>'
                        + '<li>Periksa kembali stok obat yang tersedia</li>'
                        + ($scope.isBpjs ? '<li>Periksa kembali kesesuaian obat fornas</li>' : ''
                            + '</ul>'))
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Kirim')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.isRouteLoading = true;

                    manageLogistikPhp.postpost('farmasi/resep-dokter?strukorder=' + norec_apd, dataResep).then(function (res) {
                        $scope.tempListResep = [];
                        $scope.resep.beratBadan = '';
                        dataResep = [];
                        $scope.isRouteLoading = false;
                        $scope.isResepEmpty = true;
                        $scope.item.izinPerubahanObat = '';
                        $scope.isCito = '';
                        $scope.isSegeraPulang = '';
                        if (res.status === 400) {
                            $scope.isRouteLoading = false;
                            console.error('error');
                        }
                    }, (error) => {
                        console.log(error);
                        $scope.isRouteLoading = false;
                    })
                }, function () {
                    $scope.isRouteLoading = false;
                });
            }


            $scope.columnHistoryResep = {
                pageable: true,
                columns: [{
                    field: "tglorder",
                    title: "<h3>Tanggal</h3>",
                    width: "100px",
                },
                {
                    field: "namalengkap",
                    title: "<h3>Dokter</h3>",
                    width: "100px",
                },
                {
                    command: [{
                        text: "Detail",
                        align: "center",
                        attributes: {
                            align: "center"
                        },
                        click: showDetail,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: "10%",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                }
                ],
            };

            // method untuk show detail resep history
            function showDetail(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                console.log(dataItem);
                $scope.item.norec_so = dataItem.norec;
                $scope.tglorder = dataItem.tglorder;
                $scope.isvalid = dataItem.fornasimplvalidation;
                $scope.popDetailResep.center().open();
                manageLogistikPhp.getDataTableTransaksi('rekam-medis/get-resep-dokter-detail?strukorder=' + dataItem.norec).then(res => {
                    $scope.dataDetailResep = res.data.data;
                    let dataTemp = [];

                });
            }

            // method untuk close popup detail resep history
            $scope.close = function () {
                $scope.popDetailResep.close();
            }

            // method untuk mengambil data history resep
            var getHistoryResep = function () {
                $scope.showLoader = true;
                manageLogistikPhp.getDataTableTransaksi('rekam-medis/get-resep-dokter?nocm=' + nocm_str).then(res => {
                    $scope.listHistoryResep = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 5
                    });
                    $scope.showLoader = false;
                })
            }

            $scope.reoderResep = function () {
                if ($scope.isBpjs && !$scope.isvalid) {
                    toastr.info('Tidak dapat reorder karena order histori dilakukan sebelum implementasi formularium nasional', 'Informasi');
                    return;
                }

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
                console.log($scope.tempListResep);
                $scope.isResepEmpty = false;
                $scope.tabResepElektornik = 0;

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