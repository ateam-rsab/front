define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('KasKecilCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.now = new Date();
            var data2 = [];
            let pegawaiUser = null;
            let qty = 0;
            let hrgsatuan = 0;
            let ppn = 0;
            let hargadiskon = 0;
            var ttlTotal = 0;
            var ttlDiskon = 0;
            var ttlPpn = 0;
            var grandTotal = 0;

            let dataProdukDetail = [];
            $scope.dataGrid = new kendo.data.DataSource({
                data: []
            });
            $scope.isRouteLoading = false;

            function init() {

                $scope.item.asalproduk = {
                    asalproduk: "Kas Kecil",
                    id: 7,
                };

                $scope.item.kelompokproduk = {
                    id: 24,
                    kelompokproduk: 'Barang Persediaan'
                };

                $scope.columnGrid = [{
                        "field": "no",
                        "title": "No",
                        "width": "30px",
                    },
                    {
                        "field": "namaproduk",
                        "title": "Nama Produk",
                        "width": "120px",
                    },
                    {
                        "field": "satuanstandar",
                        "title": "Satuan",
                        "width": "50px",
                    },
                    {
                        "field": "jumlah",
                        "title": "Qty",
                        "width": "50px",
                    },
                    {
                        "field": "hargasatuan",
                        "title": "Harga Satuan",
                        "width": "70px",
                        "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                    },
                    {
                        "field": "ppn",
                        "title": "Ppn",
                        "width": "70px",
                        "template": "<span class='style-right'>{{formatRupiah('#: ppn #', '')}}</span>"
                    },
                    {
                        "field": "hargadiscount",
                        "title": "Harga Discount",
                        "width": "70px",
                        "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                    },
                    {
                        "field": "total",
                        "title": "SubTotal",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                    },
                    {
                        "field": "nobatch",
                        "title": "No Batch",
                        "width": "50px",
                    },
                    {
                        "field": "tglkadaluarsa",
                        "title": "Tgl Kadaluarsa",
                        "width": "100px",
                        "template": "<span class='style-center'>{{formatTanggal('#: tglkadaluarsa #', '')}}</span>"
                    }
                ];

                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-produk?idkelompokproduk=" + $scope.item.kelompokproduk.id, true).then(function (dat) {
                    $scope.listProduk = dat.data.produk;
                });

                manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo?produk=0", true).then(function (dat) {
                    $scope.listKoordinator = dat.data.jenisusulan;
                    $scope.item.koordinator = {
                        id: 1,
                        jenisusulan: 'Medis'
                    };
                });

                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-combo", true).then(function (dat) {
                    $scope.listKelompokProduk = dat.data.kelompokproduk;

                    $scope.listmataAnggaran = dat.data.mataanggaran;



                    modelItemAkuntansi.getDataDummyPHP("spk/ruangan/get-data-combo-pegawai-part", true, true, 20).then(function (data) {
                        $scope.listPegawaiPembuat = data;
                    });

                    $scope.listAsalBarang = dat.data.asalproduk;
                    $scope.listRuangan = dat.data.ruangan;
                    $scope.listRuanganKK = dat.data.ruangan;
                    $scope.item.ruanganPenerima = {
                        id: $scope.listRuangan[0].id,
                        namaruangan: $scope.listRuangan[0].namaruangan
                    }
                    $scope.item.ruanganKK = {
                        id: $scope.listRuangan[0].id,
                        namaruangan: $scope.listRuangan[0].namaruangan
                    }
                    $scope.listPegawai = dat.data.detaillogin;
                    $scope.item.pegawaiPenerima = {
                        id: $scope.listPegawai[0].id,
                        namalengkap: $scope.listPegawai[0].namalengkap
                    }
                    $scope.listRekanan = dat.data.rekanan;
                    $scope.listpegawaiKK = dat.data.pegawaipenerima;
                    $scope.listProduk = dat.data.produk;
                    pegawaiUser = dat.data.detaillogin[0];
                });

            }

            init();

            $scope.tambah = function () {

                // if ($scope.item.subTotaltxt == 0) {
                //     alert("SubTotal harus di isi!")
                //     return;
                // }
                if ($scope.item.jumlah == 0) {
                    toastr.info("Jumlah harus di isi!");
                    return;
                }
                if (!$scope.item.produk) {
                    // alert("Pilih Produk terlebih dahulu!!")
                    toastr.info("Pilih Produk terlebih dahulu!");
                    return;
                }
                if (!$scope.item.satuan) {
                    // alert("Pilih Satuan terlebih dahulu!!")
                    toastr.info("Pilih Satuan terlebih dahulu!");
                    return;
                }
                if (!$scope.item.asalproduk) {
                    toastr.info("Pilih Sumber Danaa terlebih dahulu!");
                    return;
                }
                var nomor = $scope.dataGrid ? data2.length + 1 : 1

                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {

                            data.no = $scope.item.no
                            data.hargasatuan = String($scope.item.hargaSatuan)
                            data.ruanganfk = $scope.item.ruanganPenerima.id
                            data.asalprodukfk = $scope.item.asalproduk.id
                            data.asalproduk = $scope.item.asalproduk.asalproduk
                            data.produkfk = $scope.item.produk.id
                            data.namaproduk = $scope.item.produk.namaproduk
                            data.nilaikonversi = $scope.item.nilaiKonversi
                            data.satuanstandarfk = $scope.item.satuan.ssid
                            data.satuanstandar = $scope.item.satuan.satuanstandar
                            data.satuanviewfk = $scope.item.satuan.ssid
                            data.satuanview = $scope.item.satuan.satuanstandar
                            data.jumlahspk = data2[i].jumlahspk
                            data.jumlahterima = data2[i].jumlahterima
                            data.jumlah = $scope.item.jumlah
                            data.hargadiscount = String($scope.item.hargaDiskon)
                            data.persendiscount = String($scope.item.hargaDiskonPersen)
                            data.ppn = String($scope.item.ppn)
                            data.persenppn = String($scope.item.ppnpersen)
                            data.total = $scope.item.subTotaltxt
                            data.keterangan = $scope.item.keterangan
                            data.nobatch = $scope.item.nobatch
                            data.tglkadaluarsa = $scope.item.tglkadaluarsa

                            data2[i] = data;
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2,
                                pageSize: 20
                            });

                            ttlTotal = 0;
                            ttlDiskon = 0;
                            ttlPpn = 0;
                            grandTotal = 0;

                            for (var i = data2.length - 1; i >= 0; i--) {
                                ttlTotal = ttlTotal + (parseFloat(data2[i].hargasatuan) * parseFloat(data2[i].jumlah))
                                ttlDiskon = ttlDiskon + (parseFloat(data2[i].hargadiscount) * parseFloat(data2[i].jumlah))
                                ttlPpn = ttlPpn + (parseFloat(data2[i].ppn) * parseFloat(data2[i].jumlah))
                            }
                            $scope.item.total = parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.totalDiskon = parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.totalPpn = parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                            grandTotal = ttlTotal + ttlPpn - ttlDiskon
                            $scope.item.grandTotal = parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                        }
                        // break;
                    }

                } else {
                    data = {
                        no: nomor,
                        hargasatuan: String($scope.item.hargaSatuan),
                        ruanganfk: $scope.item.ruanganPenerima.id,
                        asalprodukfk: $scope.item.asalproduk.id,
                        asalproduk: $scope.item.asalproduk.asalproduk,
                        produkfk: $scope.item.produk.id,
                        namaproduk: $scope.item.produk.namaproduk,
                        nilaikonversi: $scope.item.nilaiKonversi,
                        satuanstandarfk: $scope.item.satuan.ssid,
                        satuanstandar: $scope.item.satuan.satuanstandar,
                        satuanviewfk: $scope.item.satuan.ssid,
                        satuanview: $scope.item.satuan.satuanstandar,
                        jumlahspk: 0,
                        jumlahterima: 0,
                        jumlah: $scope.item.jumlah,
                        hargadiscount: String($scope.item.hargaDiskon),
                        persendiscount: String($scope.item.hargaDiskonPersen),
                        ppn: String($scope.item.ppn),
                        persenppn: String($scope.item.ppnpersen),
                        total: $scope.item.subTotaltxt,
                        keterangan: $scope.item.keterangan,
                        nobatch: $scope.item.nobatch,
                        tglkadaluarsa: $scope.item.tglkadaluarsa
                    }

                    data2.push(data)
                    console.log(data2);
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: data2,
                        pageSize: 20
                    });

                    ttlTotal = 0;
                    ttlDiskon = 0;
                    ttlPpn = 0;
                    grandTotal = 0;

                    for (var i = data2.length - 1; i >= 0; i--) {
                        ttlTotal = ttlTotal + (parseFloat(data2[i].hargasatuan) * parseFloat(data2[i].jumlah))
                        ttlDiskon = ttlDiskon + (parseFloat(data2[i].hargadiscount) * parseFloat(data2[i].jumlah))
                        ttlPpn = ttlPpn + (parseFloat(data2[i].ppn) * parseFloat(data2[i].jumlah))
                    }
                    $scope.item.total = parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    $scope.item.totalDiskon = parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    $scope.item.totalPpn = parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                    grandTotal = ttlTotal + ttlPpn - ttlDiskon
                    $scope.item.grandTotal = parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                }
                Kosongkan();
            }

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.hapus = function () {
                if ($scope.item.jumlah == 0) {
                    alert("Jumlah harus di isi!")
                    return;
                }
                // if ($scope.item.total == 0) {
                //     alert("Stok tidak ada harus di isi!")
                //     return;
                // }
                // if ($scope.item.jenisKemasan == undefined) {
                //     alert("Pilih Jenis Kemasan terlebih dahulu!!")
                //     return;
                // }
                // if ($scope.item.asal == undefined) {
                //     alert("Pilih Asal Produk terlebih dahulu!!")
                //     return;
                // }
                if ($scope.item.produk == undefined) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return;
                }
                if ($scope.item.satuan == undefined) {
                    alert("Pilih Satuan terlebih dahulu!!")
                    return;
                }
                // var nomor =0
                // if ($scope.dataGrid == undefined) {
                //     nomor = 1
                // }else{
                //     nomor = data2.length+1
                // }
                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {

                            //data2[i] = data;
                            // delete data2[i]
                            data2.splice(i, 1);

                            // var subTotal = 0 ;
                            // for (var i = data2.length - 1; i >= 0; i--) {
                            //     subTotal=subTotal+ parseFloat(data2[i].total)
                            //     data2[i].no = i+1
                            // }
                            // data2.length = data2.length -1
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });
                            // for (var i = data2.length - 1; i >= 0; i--) {
                            //     subTotal=subTotal+ parseFloat(data2[i].total)
                            // }
                            // $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                            var ttlTotal = 0;
                            var ttlDiskon = 0;
                            var ttlPpn = 0;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                ttlTotal = ttlTotal + (parseFloat(data2[i].hargasatuan) * parseFloat(data2[i].jumlah))
                                ttlDiskon = ttlDiskon + (parseFloat(data2[i].hargadiscount) * parseFloat(data2[i].jumlah))
                                ttlPpn = ttlPpn + (parseFloat(data2[i].ppn) * parseFloat(data2[i].jumlah))
                            }
                            $scope.item.total = parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.totalDiskon = parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.totalPpn = parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                            var grandTotal = 0;
                            grandTotal = ttlTotal + ttlPpn - ttlDiskon
                            $scope.item.grandTotal = parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                        }
                        // break;
                    }

                }
                Kosongkan()
            }

            $scope.SavePenerimaan = function () {
                // $scope.saveShow = false;
                let rkk = $scope.item.ruanganKK ? $scope.item.ruanganKK.id : null;
                let tglkk = $scope.item.tglKK ? $scope.item.tglKK : null;
                let pegkk = $scope.item.pegawaiKK ? $scope.item.pegawaiKK.id : null;
                let nokontrak = $scope.item.noKontrak ? $scope.item.noKontrak : "-";
                let kelTrans = 35;
                let usulan = $scope.item.noUsulan ? $scope.item.noUsulan : "-";
                let jenisusulan = $scope.item.koordinator ? $scope.item.koordinator.jenisusulan : null;
                let jenisusulanfk = $scope.item.koordinator ? $scope.item.koordinator.id : null;
                let mataanggaran = $scope.item.mataAnggaran ? $scope.item.mataAnggaran.norec : '';
                let ketTerima = $scope.item.ketTerima ? $scope.item.ketTerima : "";
                let namapengadaan = $scope.item.namaPengadaan ? $scope.item.namaPengadaan : '-';
                let noOrder = $scope.item.noOrder ? $scope.item.noOrder : '-';
                let norecOrder = null;
                if (norecTerima == '' && norecSPPB == '') {
                    norecOrder = null;
                } else if (norecTerima == undefined && norecSPPB == undefined) {
                    norecOrder = null;
                } else if (norecSPPB != undefined && norecSPPB != "") {
                    norecOrder = norecSPPB;
                } else if (norecTerima != undefined && norecTerima != "") {
                    norecOrder = NoOrderFk;
                }
                var struk = {
                    nostruk: norecTerima,
                    noorder: noOrder,
                    rekananfk: $scope.item.namaRekanan.id,
                    namarekanan: $scope.item.namaRekanan.namarekanan,
                    ruanganfk: $scope.item.ruanganPenerima.id,
                    nokontrak: nokontrak,
                    nofaktur: $scope.item.noFaktur,
                    tglfaktur: moment($scope.item.tglFaktur).format('YYYY-MM-DD HH:mm'),
                    tglstruk: moment($scope.item.tglTerima).format('YYYY-MM-DD HH:mm'),
                    tglorder: moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm'),
                    tglrealisasi: moment($scope.item.tglTerima).format('YYYY-MM-DD HH:mm'),
                    tglkontrak: moment($scope.item.tglUsulan).format('YYYY-MM-DD HH:mm'),
                    objectpegawaipenanggungjawabfk: $scope.item.pegawaiPembuat.id,
                    pegawaimenerimafk: $scope.item.pegawaiPenerima.id,
                    namapegawaipenerima: $scope.item.pegawaiPenerima.namalengkap,
                    qtyproduk: data2.length,
                    totalharusdibayar: grandTotal,
                    totalppn: ttlPpn,
                    totaldiscount: ttlDiskon,
                    totalhargasatuan: ttlTotal,
                    asalproduk: parseFloat($scope.item.asalproduk.id),
                    ruanganfkKK: rkk,
                    tglKK: tglkk,
                    pegawaifkKK: pegkk,
                    norecsppb: norecSPPB,
                    kelompoktranskasi: kelTrans,
                    norecrealisasi: norec_Realisasi,
                    nousulan: usulan,
                    // norec:norec,
                    objectmataanggaranfk: mataanggaran,
                    noterima: $scope.item.noTerima,
                    noBuktiKK: $scope.item.noBuktiKK,
                    ketterima: ketTerima,
                    jenisusulan: jenisusulan,
                    jenisusulanfk: jenisusulanfk,
                    namapengadaan: namapengadaan,
                    norecOrder: norecOrder,
                }
                var objSave = {
                    struk: struk,
                    details: data2
                }

                manageLogistikPhp.postterimabarangsupliernew(objSave).then(function (e) {
                    NorecCetak = e.data.data.norec
                    var forSave = {
                        struk: struk,
                        norec: NorecCetak,
                        details: data2
                    }
                    manageLogistikPhp.postjurnalterimabarangnew(forSave).then(function (data) {
                        $scope.popUp.center().open();
                    });
                })
            }

            $scope.getSatuan = function () {
                // if ($scope.item.produk == undefined) {
                //     $scope.item.nilaiKonversi = ''
                // }
                // if ( $scope.item.nilaiKonversi == '') {
                //     GETKONVERSI(0)    
                // }
                // if ($scope.item.nilaiKonversi == undefined) {
                GETKONVERSI(0)
                // }

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
                $scope.item.nilaiKonversi = 1 // $scope.item.satuan.nilaikonversi
                $scope.item.jumlah = 0;
                $scope.item.hargaSatuan = 0;
                // $scope.item.ppn = 0;
                $scope.item.ppnpersen = 0;
                $scope.item.hargaDiskon = 0;
                $scope.item.hargaDiskonPersen = 0;
                $scope.item.subTotaltxt = 0;

                // $scope.item.keterangan = '-';
                $scope.item.keterangan = $scope.item.produk.spesifikasi;
                $scope.item.nobatch = '-';
                $scope.item.tglkadaluarsa = new Date();
                // if ($scope.item.ruangan == undefined) {
                //     //alert("Pilih Ruangan terlebih dahulu!!")
                //     return;
                // }
                manageLogistikPhp.getDataTableTransaksi("logistik/get-harga?" +
                    "produkfk=" + $scope.item.produk.id +
                    "&ruanganfk=50", true).then(function (dat) {
                    dataProdukDetail = dat.data.detail;
                    $scope.item.hargaSatuan = 0
                    $scope.item.hargadiskon = 0
                    $scope.item.hargaNetto = 0
                    $scope.item.total = 0
                    $scope.item.jumlah = 0
                    $scope.item.hargaSatuan = dat.data.detail[0].harga
                });
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
                    $scope.item.hargaSatuan = dat.data.detail[0].hargapenerimaan
                });
            }
            $scope.loadComboProduk = function () {
                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-produk?idkelompokproduk=" + $scope.item.kelompokproduk.id, true).then(function (dat) {
                    $scope.listProduk = dat.data.produk;
                });
            }

            $scope.simpan = function () {
                if (!$scope.item.noTerima) {
                    toastr.error("No Terima Tidak Boleh Kosong!!")
                    return;
                }
                if ($scope.item.asalproduk == undefined) {
                    alert("Pilih Asal Produk!!")
                    return
                }
                if ($scope.item.ruanganPenerima == undefined) {
                    alert("Pilih Ruangan Penerima!!")
                    return
                }
                if ($scope.item.pegawaiPenerima == undefined) {
                    alert("Pilih Pegawai Penerima!!")
                    return
                }
                if ($scope.item.tglFaktur == undefined) {
                    alert("Pilih Tanggal Faktur!!")
                    return
                }
                if ($scope.item.noFaktur == undefined) {
                    alert("No Faktur Kosong!!")
                    return
                }
                if ($scope.item.namaRekanan == undefined) {
                    alert("Pilih Nama Rekanan!!")
                    return
                }
                if ($scope.item.noTerima == undefined) {
                    alert("No Terima Kosong!!")
                    return
                }
                if (data2.length == 0) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return
                }
                if ($scope.item.pegawaiPembuat == undefined) {
                    alert("Pegawai Pembuat Komitmen Kosong!!")
                    return
                }

                var confirm = $mdDialog.confirm()
                    .title('Peringatan')
                    .textContent('Apakah Anda Yakin Menyimpan Data?')
                    .ariaLabel('Lucky day')
                    .cancel('Tidak')
                    .ok('Ya')
                $mdDialog.show(confirm).then(function () {
                    $scope.SavePenerimaan();
                })

            }

            function Kosongkan() {
                $scope.item.produk = '';
                // $scope.item.asal ='';
                $scope.item.satuan = '';
                $scope.item.nilaiKonversi = 0;
                $scope.item.hargaSatuan = 0;
                $scope.item.jumlah = 0;
                $scope.item.hargadiskon = 0;
                $scope.item.no = undefined;
                $scope.item.ppn = 0;
                $scope.item.hargaDiskon = 0;
                $scope.item.subTotaltxt = 0;
            }

            $scope.batal = function () {
                Kosongkan();
            }

            $scope.cetak = () => {

                var jabatan1 = ''
                if ($scope.item.DataJabatan1 != undefined) {
                    jabatan1 = $scope.item.DataJabatan1.namajabatan;
                }

                var pegawai1 = ''
                if ($scope.item.DataPegawai1 != undefined) {
                    pegawai1 = $scope.item.DataPegawai1.id;
                }

                var jabatan2 = ''
                if ($scope.item.DataJabatan2 != undefined) {
                    jabatan2 = $scope.item.DataJabatan2.namajabatan;
                }

                var pegawai2 = ''
                if ($scope.item.DataPegawai2 != undefined) {
                    pegawai2 = $scope.item.DataPegawai2.id;
                }

                var jabatan3 = ''
                if ($scope.item.DataJabatan3 != undefined) {
                    jabatan3 = $scope.item.DataJabatan3.namajabatan;
                }

                var pegawai3 = ''
                if ($scope.item.DataPegawai3 != undefined) {
                    pegawai3 = $scope.item.DataPegawai3.id;
                }


                var stt = 'false'
                if (confirm('View Bukti Penerimaan? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing! NorecCetak
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-penerimaan=1&nores=' + NorecCetak + '&pegawaiPenerima=' + pegawai2 + '&pegawaiPenyerahan=' + pegawai1 + '&pegawaiMengetahui=' + pegawai3 +
                    '&jabatanPenerima=' + jabatan2 + '&jabatanPenyerahan=' + jabatan1 + '&jabatanMengetahui=' + jabatan3 + '&view=' + stt + '&user=' + pegawaiUser.namalengkap,
                    function (response) {
                        //aadc=response; 

                    });
                $scope.popUp.close();
                $scope.saveShow = false;
            }

            $scope.$watch('item.jumlah', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    qty = parseFloat($scope.item.jumlah)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotaltxt = qty * (hrgsatuan + ppn - hargadiskon)
                }
            });
            $scope.$watch('item.hargaSatuan', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    qty = parseFloat($scope.item.jumlah)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotaltxt = qty * (hrgsatuan + ppn - hargadiskon)
                }
            });
            $scope.$watch('item.ppn', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    qty = parseFloat($scope.item.jumlah)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotaltxt = qty * (hrgsatuan + ppn - hargadiskon)
                }
            });
            $scope.$watch('item.hargaDiskon', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    qty = parseFloat($scope.item.jumlah)
                    hrgsatuan = parseFloat($scope.item.hargaSatuan)
                    ppn = parseFloat($scope.item.ppn)
                    hargadiskon = parseFloat($scope.item.hargaDiskon)
                    $scope.item.subTotaltxt = qty * (hrgsatuan + ppn - hargadiskon)
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

            $scope.Generate = function (data) {

                if (data === true) {
                    var AsalPro = ''
                    if ($scope.item.asalproduk != undefined) {
                        AsalPro = $scope.item.asalproduk.id
                    }
                    manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-nostruk-generate?asalproduk=" + AsalPro, true).then(function (dat) {
                        var datas = dat.data
                        if (datas.noStruk != "") {
                            $scope.item.noTerima = datas.noStruk
                        } else {
                            $scope.item.noTerima = ""
                        }

                        if (datas.noBuktiKK != "") {
                            $scope.item.noBuktiKK = datas.noBuktiKK
                        } else {
                            $scope.item.noBuktiKK = ""
                        }
                    })
                } else {
                    $scope.item.noTerima = '';
                    $scope.item.noBuktiKK = '';
                }
            };

            $scope.Generate1 = function (data) {

                if (data === true) {
                    var AsalPro = ''
                    if ($scope.item.asalproduk != undefined) {
                        AsalPro = $scope.item.asalproduk.id
                    }
                    manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-nostruk-generate?asalproduk=" + AsalPro, true).then(function (dat) {
                        var datas = dat.data
                        if (datas.noStruk != "") {
                            $scope.item.noTerima = datas.noStruk
                        } else {
                            $scope.item.noTerima = ""
                        }

                        if (datas.noBuktiKK != "") {
                            $scope.item.noBuktiKK = datas.noBuktiKK
                        } else {
                            $scope.item.noBuktiKK = ""
                        }
                    })
                } else {
                    $scope.item.noTerima = '';
                    $scope.item.noBuktiKK = '';
                }
            };

            $scope.KlikFakturOtomatis = function (data) {
                if (data === true) {
                    /* Format No Faktur PB/BLN-THN/APT/NO URUT (APT = BLU, BG = Hibah,  KK = Kas  Kecil) */
                    var asalproduk = '';
                    if ($scope.item.asalproduk != undefined) {
                        asalproduk = $scope.item.asalproduk.asalproduk
                    }
                    var nows = moment(new Date()).format('MM-YY')
                    if (asalproduk.indexOf('Badan Layanan') > -1 || asalproduk == '')
                        $scope.item.noFaktur = 'PB/' + nows + '/APT/____'
                    else if (asalproduk.indexOf('Hibah') > -1)
                        $scope.item.noFaktur = 'PB/' + nows + '/BG/____'
                    else if (asalproduk.indexOf('Kas Kecil') > -1)
                        $scope.item.noFaktur = 'PB/' + nows + '/KK/____'

                } else {
                    delete $scope.item.noFaktur
                }
            };
        }
    ]);
});