define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SuratPerintahKerjaCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'ModelItemAkuntansi',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke = 1;
            $scope.dataSelected = {};
            $scope.showInputObat = true
            $scope.showRacikan = false
            $scope.saveShow = true;
            $scope.item.tglDibutuhkan = new Date();
            // $scope.item.tglUsulan = new Date();
            $scope.item.tglKebutuhan = new Date();
            $scope.item.tglConfirm = new Date();
            $scope.supplier = true;
            var norecResep = '';

            $scope.isEdit = false;
            var data2 = [];

            var TotTotal = 0;
            var TotPpn = 0;
            var qty = 0;
            var hrgsatuan = 0;
            var ppn = 0;
            var hargadiskon = 0;
            $scope.item.tglKontrak = $scope.now;
            $scope.dataSelected = {};
            let dataSPK = JSON.parse(localStorage.getItem('dataSPK'));
            let dataUser = JSON.parse(localStorage.getItem('pegawai'));
            norecResep = dataSPK.norec;

            function init() {
                $scope.isRouteLoading = true;

                $scope.dataGrid = new kendo.data.DataSource({
                    data: dataSPK.details,
                    pageSize: 100
                });
                $scope.item.noUsulan = dataSPK.nousulan;
                $scope.item.ruanganPengusul = dataSPK.ruangan;
                $scope.item.ruanganTujuan = dataSPK.ruangantujuan;
                $scope.item.penanggungjawab = dataSPK.penanggungjawab;
                $scope.item.tglUsulan = dataSPK.tglusulan;
                $scope.item.mengetahui = dataSPK.mengetahui;
                // $scope.item.pegawaiConfirm = {
                //     namalengkap: dataUser.id,
                //     id: dataUser.namaLengkap
                // }


                modelItemAkuntansi.getDataDummyPHP("spk/ruangan/get-data-combo-saeutik", true, true, 20).then(function (data) {
                    $scope.listProduk = data;
                })

                modelItemAkuntansi.getDataDummyPHP("spk/ruangan/get-data-combo-pegawai-part", true, true, 20).then(function (data) {
                    $scope.listPegawai = data;
                })

                modelItemAkuntansi.getDataDummyPHP("spk/rekanan/get-data-combo-rekanan", true, true, 20).then(function (data) {
                    $scope.listRekanan = data;
                })

                manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo?produk=0", true).then(function (dat) {
                    $scope.listKoordinator = dat.data.jenisusulan;
                    $scope.item.koordinator = {
                        id: 1,
                        jenisusulan: 'Medis'
                    };
                    $scope.listUnitPengusul = dat.data.ruangan_login;
                    $scope.listUnitTujuan = dat.data.ruangan;

                    $scope.listmataAnggaran = dat.data.mataAnggaran;

                    $scope.listAsalProduk = dat.data.asalproduk;
                    $scope.item.noOrder = dat.data.noSPPB;

                    $scope.isRouteLoading = false;
                });
            }
            init();

            $scope.UbahSupplier = function () {
                $scope.supplier = false
                $scope.button = true
            }

            $scope.batalRekanan = function () {
                $scope.supplier = true
                $scope.button = false
            }

            $scope.changePage = function (stateName) {
                if ($scope.dataSelected.norec_op != undefined) {
                    $state.go(stateName, {
                        dataPasien: JSON.stringify($scope.dataSelected)
                    });
                } else {
                    alert("Silahkan pilih data pasien terlebih dahulu");
                }
            }

            function checkValue(obj, param) {
                var res = "";
                var data = undefined;

                if (param.length > 1) {
                    if (obj[param[0]] != undefined)
                        data = obj[param[0]][param[1]];
                } else {
                    data = obj[param[0]];
                }

                if (data != undefined)
                    var res = data;

                return res;
            }


            $scope.getKodeUsulan = function () {
                $scope.item.noUsulan = $scope.item.ruanganPengusul.kodeUsulan
            }

            $scope.getSatuan = function () {
                GETKONVERSI(0)
            }

            function GETKONVERSI(jml) {
                if ($scope.item.produk == undefined) {
                    return
                }
                if ($scope.item.produk == "") {
                    return
                }
                $scope.listSatuan = $scope.item.produk.konversisatuan
                if ($scope.listSatuan.length == 0) {
                    $scope.listSatuan = ([{
                        ssid: $scope.item.produk.ssid,
                        satuanstandar: $scope.item.produk.satuanstandar
                    }])
                }
                $scope.item.satuan = {
                    ssid: $scope.item.produk.ssid,
                    satuanstandar: $scope.item.produk.satuanstandar
                }
                $scope.item.nilaiKonversi = 1;
                $scope.item.jumlah = 0;
                $scope.item.hargaSatuan = 0;
                $scope.item.ppnpersen = 0;
                $scope.item.ppn = 0;
                $scope.item.hargaDiskon = 0;
                $scope.item.hargaDiskonPersen = 0;
                $scope.item.subTotal = 0;
                // $scope.item.spesifikasi = $scope.item.produk.spesifikasi;
                //  manageLogistikPhp.getDataTableTransaksi("logistik/get-harga?"+
                //     "produkfk="+ $scope.item.produk.id +
                //     "&ruanganfk=50" , true).then(function(dat){
                //         dataProdukDetail =dat.data.detail;
                //         $scope.item.hargaSatuan =0
                //         $scope.item.hargadiskon =0
                //         $scope.item.hargaNetto=0
                //         $scope.item.total = 0
                //         $scope.item.jumlah = 0 
                //         $scope.item.hargaDiskon=0
                //         $scope.item.hargaDiskonPersen=0
                //         $scope.item.ppn=0
                //         $scope.item.ppnpersen =0
                //         $scope.item.subTotal=0
                //         $scope.item.hargaSatuan = dat.data.detail[0].harga
                // });
            }

            $scope.getNilaiKonversi = function () {
                $scope.item.nilaiKonversi = $scope.item.satuan.nilaikonversi
                manageLogistikPhp.getDataTableTransaksi("logistik/get-harga?" +
                    "produkfk=" + $scope.item.produk.id +
                    "&ruanganfk=50", true).then(function (dat) {
                    dataProdukDetail = dat.data.detail;
                    $scope.item.hargaSatuan = 0
                    $scope.item.hargadiskon = 0
                    $scope.item.hargaNetto = 0
                    $scope.item.total = 0
                    $scope.item.jumlah = 0
                    $scope.item.hargaDiskon = 0
                    $scope.item.hargaDiskonPersen = 0
                    $scope.item.ppn = 0
                    $scope.item.ppnpersen = 0
                    $scope.item.subTotal = 0
                    $scope.item.hargaSatuan = dat.data.detail[0].hargapenerimaan
                });
            }

            $scope.$watch('item.noSPK', function (newValue, oldValue) {
                if (newValue != oldValue) {

                    manageLogistikPhp.getDataTableTransaksi("spk/get-no-spk?NoSPK=" + $scope.item.noSPK, true).then(function (data_ih) {
                        var datas = data_ih.data;
                        for (var i = datas.length - 1; i >= 0; i--) {
                            if (datas[i].nokontrakspk == $scope.item.noSPK) {
                                alert("No SPK Tidak Boleh Sama!")
                                $scope.item.noSPK = "";
                                break
                            }
                        }
                        // if (datas == $scope.item.hps) {

                        // }
                    })

                }
            });

            $scope.$watch('item.noKontrak', function (newValue, oldValue) {
                if (newValue != oldValue) {

                    manageLogistikPhp.getDataTableTransaksi("spk/get-no-kontrak?NoSPK=" + $scope.item.noKontrak, true).then(function (data_ih) {
                        var datas = data_ih.data;
                        for (var i = datas.length - 1; i >= 0; i--) {
                            if (datas[i].nokontrak == $scope.item.noKontrak) {
                                alert("No Kontrak Tidak Boleh Sama!")
                                $scope.item.noKontrak = "";
                                break
                            }
                        }
                        // if (datas == $scope.item.hps) {

                        // }
                    })

                }
            });


            $scope.$watch('item.nilaiKonversi', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.stok > 0) {
                        $scope.item.stok = parseFloat($scope.item.stok) * (parseFloat(oldValue) / parseFloat(newValue))
                        $scope.item.jumlah = 0 //parseFloat($scope.item.jumlah) / parseFloat(newValue)
                        $scope.item.hargaSatuan = 0 //hrg1 * parseFloat(newValue)
                        $scope.item.hargadiskon = 0 //hrgsdk * parseFloat(newValue)
                        $scope.item.total = 0 // parseFloat(newValue) * 
                        // (hrg1-hrgsdk)
                        $scope.item.hargaSatuan = 0
                        $scope.item.hargadiskon = 0
                        $scope.item.hargaNetto = 0
                        $scope.item.total = 0
                        $scope.item.jumlah = 0
                        $scope.item.hargaDiskon = 0
                        $scope.item.hargaDiskonPersen = 0
                        $scope.item.ppn = 0
                        $scope.item.ppnpersen = 0
                        $scope.item.subTotal = 0
                    }
                }
            });
            $scope.$watch('item.jumlah', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    qty = parseFloat($scope.item.jumlah)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotal = qty * (hrgsatuan + ppn - hargadiskon)
                }
            });
            $scope.$watch('item.hargaSatuan', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    qty = parseFloat($scope.item.jumlah)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotal = qty * (hrgsatuan + ppn - hargadiskon)
                }
            });
            $scope.$watch('item.ppn', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    qty = parseFloat($scope.item.jumlah)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotal = qty * (hrgsatuan + ppn - hargadiskon)
                }
            });
            $scope.$watch('item.hargaDiskon', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    qty = parseFloat($scope.item.jumlah)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotal = qty * (hrgsatuan + ppn - hargadiskon)
                }
            });
            $scope.$watch('item.ppnpersen', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.item.ppn = (parseFloat($scope.item.ppnpersen) * parseFloat($scope.item.hargaSatuan)) / 100
                }
            });
            $scope.$watch('item.hargaDiskonPersen', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.item.hargaDiskon = (parseFloat($scope.item.hargaDiskonPersen) * parseFloat($scope.item.hargaSatuan)) / 100
                }
            });
            $scope.$watch('item.asalProduk', function (newValue, oldValue) {
                // $scope.isRouteLoading=true;
                // manageLogistikPhp.getDataTableTransaksi("sppb/permintaan-pengiriman-barang/get-data-combo?produk=1", true).then(function(dat){
                //     $scope.listProduk = dat.data.produk;
                //     $scope.isRouteLoading=false;
                // });
            });

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.klikGrid = function (dataSelected) {
                var dataProduk = [];
                $scope.isEdit = true;
                $scope.item.nilaiKonversi = dataSelected.nilaikonversi;
                $scope.item.satuan = {
                    ssid: dataSelected.satuanstandarfk,
                    satuanstandar: dataSelected.satuanstandar
                }
                $scope.item.jumlah = dataSelected.qtyblmteralisasi;
                $scope.item.hargaSatuan = dataSelected.hargaspk;
                $scope.item.ppnpersen = dataSelected.persenppn;
                $scope.item.ppn = dataSelected.ppn;
                $scope.item.hargaDiskon = dataSelected.hargadiscount;
                $scope.item.hargaDiskonPersen = 0;
                $scope.item.subTotal = dataSelected.total;
                $scope.item.spesifikasi = dataSelected.spesifikasi;

                $scope.item.no = dataSelected.no;
                manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo-saeutik?namaproduk=" + dataSelected.namaproduk, true, true, 20).then(function (data) {
                    $scope.item.tglkebutuhan = $scope.now;
                    $scope.listProduk.add(data.data[0])
                    $scope.item.produk = data.data[0];

                    // $scope.item.jumlah = 0;
                    // GETKONVERSI(dataSelected.qtyblmteralisasi);

                });
            }

            $scope.tambah = function () {

                let data = {
                    hargajual: null,
                    jenisobatfk: null,

                    stock: null,
                    harganetto: null,
                    nostrukterimafk: null,
                    ruanganfk: null,
                    asalprodukfk: null,
                    asalproduk: null,
                    produkfk: $scope.item.produk.id,
                    namaproduk: $scope.item.produk.namaproduk,
                    nilaikonversi: $scope.item.nilaiKonversi,
                    satuanstandarfk: $scope.item.satuan.ssid,
                    satuanstandar: $scope.item.satuan.satuanstandar,

                    nokontrakspk: $scope.item.noSPK,
                    satuanviewfk: $scope.item.satuan.ssid,
                    satuanview: $scope.item.satuan.satuanstandar,
                    jmlstok: null,
                    jumlah: $scope.item.jumlah,

                    qtyblmteralisasi: $scope.item.jumlah,
                    hargasatuan: $scope.item.hargaSatuan,
                    hargaspk: $scope.item.hargaSatuan,
                    hargadiscount: String($scope.item.hargaDiskon),
                    ppn: String($scope.item.ppn),
                    persenppn: String($scope.item.ppnpersen),
                    total: $scope.item.subTotal,
                    tglkebutuhan: $scope.item.tglKebutuhan,
                    kdproduk: $scope.item.produk.kdproduk,
                    spesifikasi: $scope.item.spesifikasi.spesifikasi,
                    norec_op: null
                }

                data2.push(data)
                // $scope.dataGrid.add($scope.dataSelected)
                $scope.dataGrid = new kendo.data.DataSource({
                    data: data2
                });

                var ttlTotal = 0;
                var ttlDiskon = 0;
                var ttlPpn = 0;
                var grandTotal = 0;

                for (var i = data2.length - 1; i >= 0; i--) {
                    ttlTotal = ttlTotal + (parseFloat(data2[i].hargasatuan) * parseFloat(data2[i].jumlah))
                    ttlDiskon = ttlDiskon + (parseFloat(data2[i].hargadiscount) * parseFloat(data2[i].jumlah))
                    ttlPpn = ttlPpn + (parseFloat(data2[i].ppn) * parseFloat(data2[i].jumlah))
                }
                $scope.item.totalSubTotal = parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.totalPpn = parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                // $scope.item.totalPpn=parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                grandTotal = ttlTotal + ttlPpn
                $scope.item.totalIniLoh = parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.isEdit = false;
                Kosongkan();
            }

            function Kosongkan() {
                $scope.item.produk = ''
                $scope.item.spesifikasi = ''
                $scope.item.asal = ''
                $scope.item.satuan = ''
                $scope.item.nilaiKonversi = 0
                $scope.item.stok = 0
                $scope.item.jumlah = 0
                $scope.item.hargadiskon = 0
                $scope.item.no = undefined
                $scope.item.total = 0
                $scope.item.hargaSatuan = 0
                $scope.item.ppn = 0
                $scope.item.disc = 0
                // $scope.item.rekanan=''
            }
            $scope.batal = function () {
                Kosongkan()
            }

            $scope.columnGrid = [

                {
                    "field": "tglkebutuhan",
                    "title": "Tanggal Kebutuhan",
                    "width": "100px",
                    "template": "<span class='style-left'>{{formatTanggal('#: tglkebutuhan #')}}</span>"
                },
                {
                    "field": "produkfk",
                    "title": "Kode Barang",
                    "width": "100px",
                },
                {
                    "field": "namaproduk",
                    "title": "Deskripsi",
                    "width": "200px",
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan",
                    "width": "80px",
                },
                {
                    "field": "qtyblmteralisasi",
                    "title": "Qty",
                    "width": "70px",
                },
                {
                    "field": "qtyteralisasi",
                    "title": "Qty Terealisasi",
                    "width": "70px",
                    "template": "<span >{{qtyteralisasi ? qtyteralisasi : 0}}</span>"
                },
                {
                    "field": "hargaspk",
                    "title": "Harga SPK",
                    "width": "70px",
                    // "template": "<span class='style-right'>{{formatRupiah('#: hargaspk #', '')}}</span>"
                }
                // {
                //     "field": "statusbarang",
                //     "title": "Stat Barang",
                //     "width" : "100px",
                //     // "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                // }
            ];

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.kembali = function () {
                //$state.go("TransaksiPelayananApotik")
                window.history.back();
            }

            $scope.simpan = function () {
                if (!$scope.item.ruanganTujuan) {
                    toastr.warning("Anda belum memilih Unit Tujuan");
                    return;
                }

                if ($scope.item.ruanganTujuan.namaruangan === "Belum Pilih Ruangan") {
                    toastr.warning("Anda belum memilih Unit Tujuan");
                    return;
                }

                if (!$scope.item.noSPK) {
                    toastr.warning("Nomor Kontrak Masih Kosong!");
                    return;
                }
                if (!$scope.item.koordinator) {
                    toastr.warning("Anda belum memilih koordinator!");
                    return;
                }
                if (!$scope.item.penanggungjawab) {
                    toastr.warning('Anda belum memilih penanggung jawab');
                    return;
                }
                if (!$scope.item.mengetahui) {
                    toastr.warning("Anda belum memilih Pegawai yang Mengetahui");
                    return;
                }

                if (!$scope.item.pegawaiConfirm) {
                    toastr.warning('Anda belum memilih Pegawai yang Mengkonfirmasi');
                    return;
                }

                if (!$scope.item.ruanganTujuan) {
                    toastr.warning('Anda belum memilih Ruang Tujuan');
                    return;
                }
                if (!$scope.item.ruanganPengusul) {
                    toastr.warning('Anda belum memilih Unit Pengusul');
                    return;
                }
                if (!$scope.item.keteranganUsulan) {
                    toastr.warning('Anda belum memilih Jenis Usulan');
                    return;
                }
                if (!$scope.item.tglUsulan) {
                    toastr.warning('Anda belum memasukkan Tanggal Usulan');
                    return;
                }
                if (!$scope.item.tglDibutuhkan) {
                    toastr.warning('Anda belum memasukan Tanggal Dibutuhkan');
                    return;
                }
                if (!$scope.item.BiayaKirim) {
                    toastr.warning('Biaya Kirim Kosong');
                    return;
                }
                var strAlamat = $scope.item.alamatSupl ? $scope.item.alamatSupl : '';

                // if ($scope.item.alamatSupl != undefined) {
                //     strAlamat=$scope.item.alamatSupl
                // }
                var qtyHari = $scope.item.jmlHari ? $scope.item.jmlHari : 0;

                // if ($scope.item.jmlHari != undefined) {
                //     qtyHari = $scope.item.jmlHari
                // }
                if (data2.length == 0) {
                    toastr.warning("Harap pilih Produk terlebih dahulu!");
                    // alert("Pilih Produk terlebih dahulu!!")
                    return;
                }

                var mataanggaran = $scope.item.mataAnggaran ? $scope.item.mataAnggaran.norec : null;
                // if($scope.item.mataAnggaran != undefined){
                //     mataanggaran = $scope.item.mataAnggaran.norec
                // }
                var noUsulan = $scope.item.noUsulan ? $scope.item.noUsulan : '-';
                // if($scope.item.noUsulan != undefined){
                //     noUsulan = $scope.item.noUsulan
                // }
                var kontrak = $scope.item.noKontrak ? $scope.item.noKontrak : '-';
                // if($scope.item.noKontrak != undefined){
                //     kontrak = $scope.item.noKontrak
                // }

                // init()
                var strukorder = {
                    keteranganorder: $scope.item.keteranganUsulan,
                    qtyjenisproduk: data2.length,
                    tglUsulan: moment($scope.item.tglUsulan).format('YYYY-MM-DD HH:mm:ss'),
                    tglDibutuhkan: moment($scope.item.tglDibutuhkan).format('YYYY-MM-DD HH:mm:ss'),
                    koordinator: $scope.item.koordinator.jenisusulan,
                    nousulan: noUsulan,
                    ruanganfkPengusul: $scope.item.ruanganPengusul.id,
                    ruanganfkTujuan: $scope.item.ruanganTujuan.id,
                    penanggungjawabfk: $scope.item.penanggungjawab.id,
                    objectpegawaispkfk: $scope.item.pegawaiConfirm.id,
                    nokontrakspk: $scope.item.noSPK,
                    rekananfk: $scope.item.rekanan.id,
                    tglkontrak: moment($scope.item.tglKontrak).format('YYYY-MM-DD HH:mm:ss'),
                    mengetahuifk: $scope.item.mengetahui.id,
                    nipPns: $scope.item.nip,
                    total: TotTotal,
                    norec: norecResep,
                    ppn: TotPpn,
                    objectmataanggaranfk: mataanggaran,
                    biayakirim: $scope.item.BiayaKirim ? parseFloat($scope.item.BiayaKirim) : 0,
                    kontrak: kontrak,
                    // norecrealisasi:norec_Realisasi,
                    // norecriwayatrealisasi:norecRR,
                    // objectkelompoktransaksifk:keltrans,
                    // objectsrukverifikasifk:verifikasifk
                }

                var data = {
                    strukorder: strukorder,
                    details: data2
                }
                // manageLogistikPhp.postspklangsung(data).then(function(e) {
                manageLogistikPhp.postspklangsungNew(data).then(function (e) {
                    $scope.item.noKirim = e.data.nokirim
                    var nokirim = e.data.nokirim
                    var stt = 'false'
                    if (confirm('View Cetak SPK? ')) {
                        // Save it!
                        stt = 'true';
                    } else {
                        stt = 'false'
                    }

                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/logistik?cetak-spk=1&nores=' + nokirim + '&view=' + stt, function (response) {
                        //aadc=response;
                    });

                    $scope.saveShow = false;
                    Kosongkan();
                    $state.go("DaftarSPK");
                })
                $scope.saveShow = false;
                Kosongkan();
                $state.go("DaftarSPK");
                // $state.go("TransaksiPelayananApotik")

            }
        }
    ]);
});