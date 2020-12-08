define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('OrderBarangSPPBLangsungCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'ModelItemAkuntansi',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke = 1;
            $scope.showInputObat = true
            $scope.showRacikan = false
            $scope.saveShow = true;
            $scope.item.tglAwal = new Date();
            var pegawaiUser = {}
            var norec_Realisasi = '';
            var noOrder = '';
            var norecrOrder = '';
            var dataProdukDetail = [];
            var noTerima = '';
            var data2 = [];
            var data2R = [];
            var hrg1 = 0
            var hrgsdk = 0
            var hrgPpn = 0
            var racikan = 0
            var TotTotal = 0
            var qtyConfirm = 0
            $scope.isRouteLoading = false;
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;


            function init() {

                $scope.isRouteLoading = true;
                $scope.columnGrid = [{
                        "field": "no",
                        "title": "No",
                        "width": "30px",
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
                        "field": "qtyblmsppb",
                        "title": "Qty",
                        "width": "70px",
                        // "template": "<span class='style-right'>{{qtyblmsppb ? qtyblmsppb : 0}}</span>"
                    },
                    {
                        "field": "qtyprodukkonfirmasi",
                        "title": "Qty Konfirmasi",
                        "width": "70px",
                    },
                    {
                        "field": "hargasatuanquo",
                        "title": "Harga Satuan",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: hargasatuanquo #', '')}}</span>"
                    },
                    {
                        "field": "hargadiscountquo",
                        "title": "Disc%",
                        "width": "50px",
                        "template": "<span class='style-right'>{{formatRupiah('#: hargadiscountquo #', '')}}</span>"
                    },
                    {
                        "field": "hargappnquo",
                        "title": "PPN",
                        "width": "50px",
                        "template": "<span class='style-right'>{{formatRupiah('#: hargappnquo #', '')}}</span>"
                    },
                    {
                        "field": "totalkonfirmasi",
                        "title": "SubTotal",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: totalkonfirmasi #', '')}}</span>"
                    }
                ];

                modelItemAkuntansi.getDataDummyPHP("sppb/permintaan-pengiriman-barang/get-data-combo-part", true, true, 20).then(function (data) {
                    $scope.listProduk = data;
                })
                modelItemAkuntansi.getDataDummyPHP("sppb/permintaan-pengiriman-barang/get-data-rekanan-part", true, true, 20).then(function (data) {
                    $scope.listRekanan = data;
                })
                modelItemAkuntansi.getDataDummyPHP("sppb/permintaan-pengiriman-barang/get-data-pegawai-part", true, true, 20).then(function (data) {
                    $scope.listPegawaiPembuat = data;
                })
                manageLogistikPhp.getDataTableTransaksi("sppb/permintaan-pengiriman-barang/get-data-combo", true).then(function (dat) {
                    // $scope.listPegawaiPembuat = dat.data.penulisresep;
                    // $scope.listRekanan = dat.data.rekanan;
                    $scope.listKoordinator = dat.data.jenisusulan;
                    $scope.item.koordinator = {
                        id: 1,
                        jenisusulan: 'Medis'
                    };
                    $scope.listmataAnggaran = dat.data.mataanggaran;
                    // $scope.listProduk = dat.data.produk;
                    $scope.listAsalProduk = dat.data.asalproduk;
                    // $scope.item.noOrder = dat.data.noSPPB;
                    $scope.isRouteLoading = false;
                    $scope.item.tglUsulan = $scope.now;
                });

            }
            init();

            $scope.getSatuan = function () {
                GETKONVERSI(0)
            }

            $scope.$watch('item.noOrder', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    manageLogistikPhp.getDataTableTransaksi("data/get-no-usulan?NoSPK=" + $scope.item.noOrder, true).then(function (data) {
                        var datas = data.data;
                        for (var i = datas.length - 1; i >= 0; i--) {
                            if (datas[i].noorder == $scope.item.noOrder) {
                                alert("No. SPPB Tidak Boleh Sama!");
                                $scope.item.noOrder = '';
                                $scope.isNoUsulanSama = true;
                                break;
                            }
                        }
                    })

                }
            });

            function GETKONVERSI(jml) {
                if (!$scope.item.produk) {
                    return;
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
                // if (!$scope.item.ruangan) {
                //     //alert("Pilih Ruangan terlebih dahulu!!")
                //     return;
                // }
                $scope.item.jumlah = 0
                $scope.item.hargaSatuan = 0
                $scope.item.disc = 0
                $scope.item.ppn = 0
                $scope.item.total = 0
                // $scope.item.spesifikasi = $scope.item.produk.spesifikasi
                // if (!$scope.item.asal) {
                //     //alert("Pilih asal terlebih dahulu!!")
                //     return;
                // }
                manageLogistikPhp.getDataTableTransaksi("logistik/get-harga?" +
                    "produkfk=" + $scope.item.produk.id +
                    "&ruanganfk=50", true).then(function (dat) {
                    dataProdukDetail = dat.data.detail[0];
                    // $scope.item.hargaSatuan =0
                    // $scope.item.hargadiskon =0
                    // $scope.item.hargaNetto=0
                    // $scope.item.total = 0
                    // $scope.item.jumlah = 0 
                    // if(!dataProdukDetail){
                    //    $scope.item.hargaSatuan = 0
                    // }else{
                    //     $scope.item.hargaSatuan = dataProdukDetail[0].harga
                    // }

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
                    $scope.item.hargaSatuan = dataProdukDetail[0].hargapenerimaan
                });
            }
            $scope.$watch('item.nilaiKonversi', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.stok > 0) {
                        $scope.item.stok = parseFloat($scope.item.stok) * (parseFloat(oldValue) / parseFloat(newValue))
                        $scope.item.jumlah = 0 //parseFloat($scope.item.jumlah) / parseFloat(newValue)
                        $scope.item.hargaSatuan = 0 //hrg1 * parseFloat(newValue)
                        $scope.item.hargadiskon = 0 //hrgsdk * parseFloat(newValue)
                        $scope.item.total = 0 // parseFloat(newValue) * 
                        // (hrg1-hrgsdk)
                    }
                }
            });
            // $scope.$watch('item.suplier', function(newValue, oldValue) {
            //     if (newValue != oldValue  ) {
            //        $scope.item.alamatSupl = $scope.item.suplier.alamatlengkap
            //        $scope.item.telpSupl = 'Telp. ' + $scope.item.suplier.telepon + ' Fax. ' + $scope.item.suplier.faksimile
            //     }
            // });
            $scope.$watch('item.jumlah', function (newValue, oldValue) {
                if(!$scope.item.disc) {
                    $scope.item.disc = 0;
                }
                if(!$scope.item.ppn) {
                    $scope.item.ppn = 0;
                }
                if (newValue != oldValue) {
                    hrg1 = parseFloat($scope.item.hargaSatuan)
                    hrgsdk = (hrg1 * parseFloat($scope.item.disc)) / 100
                    hrgPpn = ((hrg1 - hrgsdk) * parseFloat($scope.item.ppn)) / 100
                    $scope.item.subTotal = parseFloat($scope.item.jumlah) * ((hrg1 - hrgsdk) + hrgPpn)
                }
            });
            $scope.$watch('item.hargaSatuan', function (newValue, oldValue) {
                if(!$scope.item.disc) {
                    $scope.item.disc = 0;
                }
                if(!$scope.item.ppn) {
                    $scope.item.ppn = 0;
                }
                if (newValue != oldValue) {
                    hrg1 = parseFloat($scope.item.hargaSatuan)
                    hrgsdk = (hrg1 * parseFloat($scope.item.disc)) / 100
                    hrgPpn = ((hrg1 - hrgsdk) * parseFloat($scope.item.ppn)) / 100
                    $scope.item.subTotal = parseFloat($scope.item.jumlah) * ((hrg1 - hrgsdk) + hrgPpn)
                }
            });
            $scope.$watch('item.disc', function (newValue, oldValue) {
                if(!$scope.item.disc) {
                    $scope.item.disc = 0;
                }
                if(!$scope.item.ppn) {
                    $scope.item.ppn = 0;
                }
                if (newValue != oldValue) {
                    hrg1 = parseFloat($scope.item.hargaSatuan)
                    hrgsdk = (hrg1 * parseFloat($scope.item.disc)) / 100
                    hrgPpn = ((hrg1 - hrgsdk) * parseFloat($scope.item.ppn)) / 100
                    $scope.item.subTotal = parseFloat($scope.item.jumlah) * ((hrg1 - hrgsdk) + hrgPpn)
                }
            });
            $scope.$watch('item.ppn', function (newValue, oldValue) {
                if(!$scope.item.disc) {
                    $scope.item.disc = 0;
                }
                if(!$scope.item.ppn) {
                    $scope.item.ppn = 0;
                }
                if (newValue != oldValue) {
                    hrg1 = parseFloat($scope.item.hargaSatuan)
                    hrgsdk = (hrg1 * parseFloat($scope.item.disc)) / 100
                    hrgPpn = ((hrg1 - hrgsdk) * parseFloat($scope.item.ppn)) / 100
                    $scope.item.subTotal = parseFloat($scope.item.jumlah) * ((hrg1 - hrgsdk) + hrgPpn)
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

            $scope.tambah = function () {
                if ($scope.item.jumlah == 0) {
                    alert("Jumlah harus di isi!")
                    return;
                }
                // if ($scope.item.total == 0) {
                //     alert("Stok tidak ada harus di isi!")
                //     return;
                // }
                // if ($scope.item.jenisKemasan) {
                //     alert("Pilih Jenis Kemasan terlebih dahulu!!")
                //     return;
                // }
                // if (noTerima == '') {
                //     $scope.item.jumlah = 0
                //     alert("Jumlah blm di isi!!")
                //     return;
                // }

                if(!$scope.item.ppn) {
                    alert("Harap isi PPN");
                    $scope.item.ppn = 0
                    return;
                }

                if (!$scope.item.produk) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return;
                }
                if (!$scope.item.satuan) {
                    alert("Pilih Satuan terlebih dahulu!!")
                    return;
                }
                var nomor = 0
                if (!$scope.dataGrid) {
                    nomor = 1
                } else {
                    nomor = data2.length + 1
                }
                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {
                            console.log($scope.dataSelected);
                            data.no = $scope.item.no

                            // data.noregistrasifk = norec_apd//$scope.item.noRegistrasi
                            // data.tglregistrasi = moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss')
                            // data.generik = null
                            data.hargajual = null
                            data.jenisobatfk = null
                            // data.kelasfk = $scope.item.kelas.id
                            data.stock = null
                            data.harganetto = null
                            data.nostrukterimafk = null
                            data.ruanganfk = null

                            // data.rke = $scope.item.rke
                            // data.jeniskemasanfk = $scope.item.jenisKemasan.id
                            // data.jeniskemasan = $scope.item.jenisKemasan.jeniskemasan
                            // data.aturanpakaifk = $scope.item.aturanPakai.id
                            // data.aturanpakai = $scope.item.aturanPakai.name
                            // data.routefk = $scope.item.route.id
                            // data.route = $scope.item.route.name
                            data.asalprodukfk = null
                            data.asalproduk = null
                            data.produkfk = $scope.item.produk.id
                            data.namaproduk = $scope.item.produk.namaproduk
                            data.nilaikonversi = $scope.item.nilaiKonversi
                            data.satuanstandarfk = $scope.item.satuan.ssid
                            data.satuanstandar = $scope.item.satuan.satuanstandar
                            data.satuanviewfk = $scope.item.satuan.ssid
                            data.satuanview = $scope.item.satuan.satuanstandar
                            data.jmlstok = null
                            data.jumlah = $scope.item.jumlah
                            data.qtyblmsppb = $scope.item.jumlah
                            data.qtysppb = $scope.item.jumlah
                            // data.qtysppb = $scope.item.qtysppb
                            data.qtyprodukkonfirmasi = $scope.dataSelected.qtyprodukkonfirmasi

                            // if($scope.item.jumlah > data2[i].jumlah){
                            //     alert("Qty Lebih Melebihi Qty Sebelumnya!!")
                            //     return;
                            // }else if($scope.item.jumlah < data2[i].jumlah){
                            //     qtyConfirm=(parseFloat(data2[i].jumlah)-($scope.item.jumlah))
                            //     data.jumlah=qtyConfirm 
                            //     data.qtyprodukkonfirmasi = $scope.item.jumlah
                            // }else if($scope.item.jumlah == data2[i].jumlah){
                            //     data.jumlah = i
                            //     data.qtyprodukkonfirmasi = $scope.item.jumlah
                            // }else{
                            //     data.qtyprodukkonfirmasi= $scope.item.jumlah
                            // }
                            // hargasatuanquo:String($scope.item.hargaSatuan),
                            data.hargasatuan = String($scope.item.hargaSatuan)

                            data.hargasatuanquo = String($scope.item.hargaSatuan)
                            data.hargadiscountquo = String($scope.item.disc)
                            data.hargappnquo = String($scope.item.ppn)
                            data.totalkonfirmasi = $scope.item.subTotal

                            data.hargadiscount = String($scope.item.disc)
                            data.ppn = String($scope.item.ppn)
                            data.total = $scope.item.subTotal
                            data.norec_op = data2[i].norec_op

                            data2[i] = data;
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2,
                                pageSize: 10
                            });
                            var subTotal = 0;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal = subTotal + parseFloat(data2[i].total)
                                // if(data2[i].hargadiscount == null){
                                //    data2[i].hargadiscount=0
                                // }
                                // if(data2[i].ppn == null){
                                //     data2[i].ppn=(parseFloat(data2[i].hargasatuan)*(data2[i].jumlah))*10/100
                                // }
                            }
                            $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.terbilang = terbilang(parseFloat(subTotal))
                            TotTotal = parseFloat(subTotal)
                        }
                        // break;
                    }

                } else {
                    data = {
                        no: nomor,
                        // noregistrasifk:norec_apd,//$scope.item.noRegistrasi,
                        // tglregistrasi:moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
                        // generik:null,
                        hargajual: null,
                        jenisobatfk: null,
                        // kelasfk:$scope.item.kelas.id,
                        stock: null,
                        harganetto: null,
                        nostrukterimafk: null,
                        ruanganfk: null, //£££
                        // rke:$scope.item.rke,
                        // jeniskemasanfk:$scope.item.jenisKemasan.id,
                        // jeniskemasan:$scope.item.jenisKemasan.jeniskemasan,
                        // aturanpakaifk:$scope.item.aturanPakai.id,
                        // aturanpakai:$scope.item.aturanPakai.name,
                        // routefk:$scope.item.route.id,
                        // route:$scope.item.route.name,
                        asalprodukfk: null,
                        asalproduk: null,
                        produkfk: $scope.item.produk.id,
                        namaproduk: $scope.item.produk.namaproduk,
                        nilaikonversi: $scope.item.nilaiKonversi,
                        satuanstandarfk: $scope.item.satuan.ssid,
                        satuanstandar: $scope.item.satuan.satuanstandar,
                        satuanviewfk: $scope.item.satuan.ssid,
                        satuanview: $scope.item.satuan.satuanstandar,
                        jmlstok: null,
                        jumlah: $scope.item.jumlah,
                        qtyblmsppb: $scope.item.jumlah,
                        // qtysppb: $scope.item.qtysppb,
                        qtysppb: $scope.item.jumlah,
                        qtyprodukkonfirmasi: $scope.item.jumlah,
                        hargasatuan: String($scope.item.hargaSatuan),

                        hargasatuanquo: String($scope.item.hargaSatuan),
                        hargadiscountquo: String($scope.item.disc),
                        hargappnquo: String($scope.item.ppn),
                        totalkonfirmasi: $scope.item.subTotal,

                        hargadiscount: String($scope.item.disc),
                        ppn: String($scope.item.ppn),
                        total: $scope.item.subTotal,
                        norec_op: null
                    }
                    data2.push(data)
                    // $scope.dataGrid.add($scope.dataSelected)
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: data2,
                        pageSize: 10
                    });
                    var subTotal = 0;
                    for (var i = data2.length - 1; i >= 0; i--) {
                        subTotal = subTotal + parseFloat(data2[i].total)
                        // if(data2[i].hargadiscount == null){
                        //     data2[i].hargadiscount=0
                        // }
                        // if(data2[i].ppn == null){
                        //     data2[i].ppn=(parseFloat(data2[i].hargasatuan)*(data2[i].jumlah))*10/100
                        // }
                    }
                    $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    $scope.item.terbilang = terbilang(parseFloat(subTotal))

                    TotTotal = parseFloat(subTotal)
                }
                // if ($scope.item.jenisKemasan.jeniskemasan != 'Racikan') {
                //     $scope.item.rke = parseFloat($scope.item.rke) + 1
                // }
                Kosongkan()
                racikan = ''
            }

            $scope.getIsiAlamat = function () {
                manageLogistikPhp.getDataTableTransaksi("sppb/get-detail-rekanan?rekananid=" + $scope.item.suplier.id, true).then(function (dat) {
                    var datas = dat.data;
                    if ($scope.item.alamatSupl != undefined && $scope.item.telpSupl != undefined) {
                        return
                    } else {
                        $scope.item.alamatSupl = datas[0].alamatlengkap;
                        $scope.item.telpSupl = 'Telp. ' + datas[0].telepon + ' Fax. ' + datas[0].faksimile;
                    }
                });
            }

            $scope.klikGrid = function (dataSelected) {
                var dataProduk = [];
                //no:no,
                $scope.item.no = dataSelected.no
                // for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
                //     if ($scope.listProduk[i].id == dataSelected.produkfk){
                //         dataProduk = $scope.listProduk[i]
                //         break;
                //     }
                // }
                // $scope.item.produk = dataProduk
                manageLogistikPhp.getDataTableTransaksi("sppb/permintaan-pengiriman-barang/get-data-combo-part?namaproduk=" + dataSelected.namaproduk, true, true, 20).then(function (data) {
                    // $scope.listProduk= data;
                    $scope.listProduk.add(data.data[0])
                    $scope.item.produk = data.data[0];

                    $scope.item.jumlah = 0
                    GETKONVERSI(dataSelected.jumlah)
                    $scope.item.nilaiKonversi = dataSelected.nilaikonversi
                    $scope.item.satuan = {
                        ssid: dataSelected.satuanstandarfk,
                        satuanstandar: dataSelected.satuanstandar
                    }

                    if (noOrder == 'EditOrder') {
                        $scope.item.jumlah = dataSelected.qtyblmsppb;
                        $scope.item.qtysppb = dataSelected.qtysppb;
                        $scope.item.hargaSatuan = dataSelected.hargasatuanquo;
                        $scope.item.disc = dataSelected.hargadiscountquo;
                        $scope.item.ppn = dataSelected.hargappnquo;
                        $scope.item.subTotal = dataSelected.totalkonfirmasi;
                    } else {
                        $scope.item.jumlah = dataSelected.qtyblmsppb;
                        $scope.item.qtysppb = dataSelected.qtysppb;
                        $scope.item.hargaSatuan = dataSelected.hargasatuan;
                        $scope.item.disc = dataSelected.hargadiscount;
                        $scope.item.ppn = dataSelected.ppn;
                        $scope.item.subTotal = dataSelected.total;
                    }

                })

            }

            function Kosongkan() {
                $scope.item.produk = '';
                $scope.item.asal = '';
                $scope.item.satuan = '';
                $scope.item.nilaiKonversi = 0;
                $scope.item.stok = 0;
                $scope.item.jumlah = 0;
                $scope.item.hargadiskon = 0;
                $scope.item.no = undefined;
                $scope.item.total = 0;
                $scope.item.hargaSatuan = 0;
                $scope.item.ppn = 0;
                $scope.item.disc = 0;
            }

            $scope.batal = function () {
                Kosongkan()
            }

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.kembali = function () {
                //$state.go("TransaksiPelayananApotik")
                window.history.back();
            }

            $scope.simpan = function () {
                if (!$scope.item.noOrder) {
                    toastr.warning("No SPPB Tidak Boleh Kosong!!");
                    return;
                }
                if (!$scope.item.koordinator) {
                    toastr.warning("Pilih Koordinator!!");
                    return;
                }
                if (!$scope.item.pegawaiPembuat) {
                    toastr.warning("Pilih Pegawai Pembuat Komitmen!!");
                    return;
                }
                if (!$scope.item.suplier) {
                    toastr.warning("Pilih Perusahaan!!");
                    return;
                }
                if (!$scope.item.asalProduk) {
                    toastr.warning("Pilih Sumber Dana!!");
                    return;
                }
                if (!$scope.item.tglUsulan) {
                    toastr.warning("Pilih Tgl Usulan!!");
                    return;
                }
                if (!$scope.item.tahun) {
                    toastr.warning("Isi Tahun Pengadaan!!");
                    return;
                }

                var strAlamat = $scope.item.alamatSupl ? $scope.item.alamatSupl : "";
                var qtyHari = $scope.item.jmlHari ? $scope.item.jmlHari : 0;
                var mataanggaran = $scope.item.mataAnggaran ? $scope.item.mataAnggaran.norec : "";

                if (data2.length == 0) {
                    alert("Pilih Produk terlebih dahulu!!");
                    return;
                }

                var strukorder = {
                    noorder: $scope.item.noOrder,
                    asalprodukfk: $scope.item.asalProduk.id,
                    pegawaiorderfk: $scope.item.pegawaiPembuat.id,
                    keteranganorder: $scope.item.keterangan,
                    qtyjenisproduk: data2.length,
                    tglorder: moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss'),
                    alamat: strAlamat,
                    notelpmobile: $scope.item.telpSupl,
                    koordinator: $scope.item.koordinator.jenisusulan,
                    koordinatorid: $scope.item.koordinator.id,
                    tglusulan: moment($scope.item.tglUsulan).format('YYYY-MM-DD'),
                    nousulan: $scope.item.noUsulan,
                    namapengadaan: $scope.item.namaPengadaan,
                    nokontrak: $scope.item.noKontrak,
                    tahunusulan: $scope.item.tahun,
                    namarekanansales: $scope.item.suplier.namarekanan,
                    objectrekananfk: $scope.item.suplier.id,
                    total: TotTotal,
                    norec: norecrOrder,
                    jmlHari: qtyHari,
                    norecrealisasi: norec_Realisasi,
                    objectmataanggaranfk: mataanggaran
                }

                var TempData = []
                for (var i = 0; i < data2.length; i++) {
                    if (data2[i] != undefined) {
                        TempData.push(data2[i])
                    }
                }

                var subTotal = 0;
                var ppn = 0;
                var subtotalwithppn = 0;
                for (var i = TempData.length - 1; i >= 0; i--) {
                    subTotal = subTotal + parseFloat(TempData[i].total)
                    ppn = parseFloat((subTotal * 10) / 100)
                    subtotalwithppn = parseFloat(subTotal - ((subTotal * 10) / 100))
                }

                $scope.dataGrid._data = TempData;


                var objSave = {
                    strukorder: strukorder,
                    subTotal,
                    ppn,
                    subtotalwithppn,
                    details: TempData
                }

                // manageLogistikPhp.postpermintaanpengirimanbarang(objSave).then(function(e) {
                // manageLogistikPhp.savesppbnew(objSave).then(function(e) {
                manageLogistikPhp.postpost("sppb/save-sppb-langsung", objSave).then(function (e) {
                    $scope.item.noKirim = e.data.nokirim.nokirim
                    var stt = 'false'
                    if (confirm('View SPPB? ')) {
                        // Save it!
                        stt = 'true';
                    } else {
                        // Do nothing!
                        stt = 'false'
                    }
                    var client = new HttpClient();
                    //client.get('http://127.0.0.1:1237/printvb/printvb/logistik?cetak-SPPB=1&nores='+e.data.nokirim+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    client.get('http://127.0.0.1:1237/printvb/logistik?cetak-SPPB=1&norec=' + e.data.nokirim + '&view=true', function (response) {
                        //aadc=response;
                    });
                    window.history.back();
                    $scope.saveShow = false;
                    Kosongkan();
                })

                // $state.go("TransaksiPelayananApotik")

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
            $scope.BatalR = function () {
                $scope.showInputObat = true
                $scope.showRacikan = false
                $scope.item.jenisKemasan = ''

                racikan = ''
            }
            $scope.hapus = function () {
                // if (!$scope.item.jumlah == 0) {
                //     alert("Jumlah harus di isi!")
                //     return;
                // }
                // if ($scope.item.total == 0) {
                //     alert("Stok tidak ada harus di isi!")
                //     return;
                // }
                // if (!$scope.item.jenisKemasan) {
                //     alert("Pilih Jenis Kemasan terlebih dahulu!!")
                //     return;
                // }
                // if (!$scope.item.asal) {
                //     alert("Pilih Asal Produk terlebih dahulu!!")
                //     return;
                // }
                if (!$scope.item.produk) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return;
                }
                if (!$scope.item.satuan) {
                    alert("Pilih Satuan terlebih dahulu!!")
                    return;
                }
                // var nomor =0
                // if ($scope.dataGrid) {
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

                            var subTotal = 0;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal = subTotal + parseFloat(data2[i].total)
                                data2[i].no = i + 1
                            }
                            // data2.length = data2.length -1
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2,
                                pageSize: 10
                            });
                            // for (var i = data2.length - 1; i >= 0; i--) {
                            //     subTotal=subTotal+ parseFloat(data2[i].total)
                            // }
                            $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                        }
                        // break;
                    }

                }
                Kosongkan()
            }

            function terbilang(bilangan) {

                bilangan = String(bilangan);
                var angka = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
                var kata = new Array('', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan');
                var tingkat = new Array('', 'Ribu', 'Juta', 'Milyar', 'Triliun');

                var panjang_bilangan = bilangan.length;

                /* pengujian panjang bilangan */
                if (panjang_bilangan > 15) {
                    kaLimat = "Diluar Batas";
                    return kaLimat;
                }

                /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
                var i = 0
                var j = 0

                for (i = 1; i <= panjang_bilangan; i++) {
                    angka[i] = bilangan.substr(-(i), 1);
                }

                i = 1;
                j = 0;
                var kaLimat = "";
                var subkaLimat = "";
                kaLimat = "";


                /* mulai proses iterasi terhadap array angka */
                while (i <= panjang_bilangan) {

                    subkaLimat = "";
                    var kata1 = "";
                    var kata2 = "";
                    var kata3 = "";

                    /* untuk Ratusan */
                    if (angka[i + 2] != "0") {
                        if (angka[i + 2] == "1") {
                            kata1 = "Seratus";
                        } else {
                            kata1 = kata[angka[i + 2]] + " Ratus";
                        }
                    }

                    /* untuk Puluhan atau Belasan */
                    if (angka[i + 1] != "0") {
                        if (angka[i + 1] == "1") {
                            if (angka[i] == "0") {
                                kata2 = "Sepuluh";
                            } else if (angka[i] == "1") {
                                kata2 = "Sebelas";
                            } else {
                                kata2 = kata[angka[i]] + " Belas";
                            }
                        } else {
                            kata2 = kata[angka[i + 1]] + " Puluh";
                        }
                    }

                    /* untuk Satuan */
                    if (angka[i] != "0") {
                        if (angka[i + 1] != "1") {
                            kata3 = kata[angka[i]];
                        }
                    }

                    /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
                    if ((angka[i] != "0") || (angka[i + 1] != "0") || (angka[i + 2] != "0")) {
                        subkaLimat = kata1 + " " + kata2 + " " + kata3 + " " + tingkat[j] + " ";
                    }

                    /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
                    kaLimat = subkaLimat + kaLimat;
                    i = i + 3;
                    j = j + 1;

                }

                /* mengganti Satu Ribu jadi Seribu jika diperlukan */
                if ((angka[5] == "0") && (angka[6] == "0")) {
                    kaLimat = kaLimat.replace("Satu Ribu", "Seribu");
                }

                return kaLimat + "Rupiah";
            }
            //***********************************

        }
    ]);
});