define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('EditKegiatanSPKCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'ModelItemAkuntansi', 'DateHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, modelItemAkuntansi, dateHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke = 1;
            $scope.dataSelected = {};
            $scope.showInputObat = true
            $scope.showRacikan = false
            $scope.saveShow = true;
            $scope.item.tglDibutuhkan = new Date();
            $scope.item.tglUsulan = new Date();
            $scope.item.tglKebutuhan = new Date();
            $scope.item.tglConfirm = new Date();
            $scope.supplier = true;
            var pegawaiUser = {}
            var norec_Realisasi = '';
            var norecRR = '';
            var keltrans = '';
            var norec_apd = '';
            var noOrder = '';
            var norecData = '';
            var dataProdukDetail = [];
            var noTerima = '';
            var data2 = [];
            var data2R = [];
            var hrg1 = 0;
            var hrgsdk = 0;
            var hrgPpn = 0;
            var racikan = 0;
            var TotTotal = 0;
            var TotPpn = 0;
            var qty = 0;
            var hrgsatuan = 0;
            var ppn = 0;
            var hargadiskon = 0;
            var ppnprs = 0;
            var hargadiskonprs = 0;
            $scope.item.tglKontrak = $scope.now;
            $scope.dataSelected = {};
            // $scope.item.tglAkhir = $scope.now;
            Load();
            // LoadCache();

            // init();
            function LoadCache() {
                var chacePeriode = cacheHelper.get('EditKegiatanSPK');
                if (chacePeriode != undefined) {
                    norecData = chacePeriode[0]
                    noOrder = chacePeriode[1]

                    init()
                    var chacePeriode = {
                        0: '',
                        1: '',
                        2: '',
                        3: '',
                        4: '',
                        5: '',
                        6: ''
                    }
                    cacheHelper.set('EditKegiatanSPK', chacePeriode);
                } else {
                    init()
                }
            }

            function Load() {
                if ($state.params) {
                    norecData = $state.params.norec;
                    noOrder = $state.params.noOrder;
                    init();
                } else {
                    init();
                }
            }

            function init() {
                $scope.isRouteLoading = true;
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
                    $scope.listKoordinator = dat.data.jenisusulan; //[{id:1,namaKoordinator:'Medis'}]
                    // $scope.item.koordinator = {
                    //     id: 1,
                    //     jenisusulan: 'Medis'
                    // };
                    // $scope.listUnitPengusul = dat.data.ruangan_login;
                    $scope.listUnitPengusul = dat.data.ruangan;
                    // $scope.item.ruanganPengusul = {id:$scope.listUnitPengusul[0].id,namaruangan:$scope.listUnitPengusul[0].namaruangan};
                    $scope.listUnitTujuan = dat.data.ruangan;
                    // $scope.item.ruanganTujuan = {id:$scope.listUnitTujuan[0].id,namaruangan:$scope.listUnitTujuan[0].namaruangan};
                    $scope.item.noUsulan = $scope.listUnitPengusul[0].kodeUsulan
                    $scope.listAsalProduk = dat.data.asalproduk;
                    $scope.item.noOrder = dat.data.noSPPB;
                    $scope.listmataAnggaran = dat.data.mataAnggaran;
                    $scope.listSatuan = dat.data.satuanstandar

                    $scope.isRouteLoading = false;

                    if (norecData) {
                        manageLogistikPhp.getDataTableTransaksi("spk/get-detail-SPPB?norecOrder=" + norecData, true).then(function (data) {
                            $scope.item.koordinator = {
                                id: data.data.detail.jenisusulanid,
                                jenisusulan: data.data.detail.keteranganlainnya
                            }
                            $scope.item.tglUsulan = data.data.detail.tglusulan
                            $scope.item.tglKontrak = data.data.detail.tglkontrak
                            $scope.item.noUsulan = data.data.detail.nousulan
                            $scope.item.namaPengadaan = data.data.detail.namapengadaan
                            $scope.item.tahun = data.data.detail.tahunusulan
                            $scope.item.alamatSupl = data.data.detail.alamat
                            $scope.item.telpSupl = data.data.detail.telp
                            $scope.item.keteranganUsulan = data.data.detail.keterangan
                            $scope.item.nip = data.data.detail.nippns
                            $scope.item.penanggungjawab = {
                                id: data.data.detail.penanggungjawabid,
                                namalengkap: data.data.detail.penanggungjawab
                            }
                            $scope.item.mengetahui = {
                                id: data.data.detail.pegawaimengetahuiid,
                                namalengkap: data.data.detail.pegawaimengetahui
                            }
                            $scope.item.noSPK = data.data.detail.nokontrak
                            // $scope.item.asalProduk = {id:data.data.details[0].asalprodukfk,asalproduk:data.data.details[0].asalproduk} 
                            $scope.item.pegawaiConfirm = {
                                id: data.data.detail.idpegawaispk,
                                namalengkap: data.data.detail.pegawaispk
                            }
                            $scope.item.noKontrak = data.data.detail.kontrak
                            $scope.item.keteranganUsulan = data.data.detail.keterangan
                            $scope.item.mataAnggaran = {
                                mataanggaran: data.data.detail.mataanggaran,
                                norec: data.data.detail.objectmataanggaranfk
                            }
                            $scope.item.BiayaKirim = data.data.detail.totalbiayakirim
                            $scope.item.rekanan = {
                                id: data.data.detail.rekananid,
                                namarekanan: data.data.detail.namarekanan
                            }
                            $scope.item.ruanganPengusul = {
                                id: data.data.detail.idunitpengusul,
                                namaruangan: data.data.detail.unitpengusul
                            }
                            $scope.item.ruanganTujuan = {
                                id: data.data.detail.idunittujuan,
                                namaruangan: data.data.detail.unittujuan
                            }
                            norec_Realisasi = data.data.detail.norecrealisasi
                            data2 = data.data.details

                            var datas = [];
                            if (data.data.details.length != 0) {
                                datas = data.data.details;
                                for (var i = 0; i < datas.length; i++) {
                                    datas[i].statCheckbox = false;
                                }
                                $scope.dataGrid = new kendo.data.DataSource({
                                    data: datas,
                                    pageSize: 10,
                                    total: datas,
                                    serverPaging: false,
                                    schema: {
                                        model: {
                                            fields: {
                                                tglTransaksi: {
                                                    type: "date"
                                                }
                                            }
                                        }
                                    }
                                });
                            } else {
                                $scope.dataGrid = new kendo.data.DataSource({
                                    data: datas,
                                    pageSize: 10,
                                    total: datas,
                                    serverPaging: false,
                                    schema: {
                                        model: {
                                            fields: {
                                                tglTransaksi: {
                                                    type: "date"
                                                }
                                            }
                                        }
                                    }
                                });
                            }

                            var grid = $('#kGrid').data("kendoGrid");

                            grid.setDataSource($scope.dataGrid);
                            grid.refresh();
                            var subTotal = 0;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal = subTotal + parseFloat(data2[i].hargasatuan * data2[i].jumlah)
                            }
                            $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.terbilang = terbilang(parseFloat(subTotal))
                            TotTotal = parseFloat(subTotal)
                        });
                    }

                });

            }

            $scope.getKodeUsulan = function () {
                $scope.item.noUsulan = $scope.item.ruanganPengusul.kodeUsulan
            }
            $scope.getNip_pns = function () {
                $scope.item.nip = $scope.item.mengetahui.nip_pns
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
                $scope.item.spesifikasi = $scope.item.produk.spesifikasi
                // $scope.item.nilaiKonversi = 1
                // $scope.item.jumlah=0
                // $scope.item.hargaSatuan=0
                // $scope.item.ppnpersen=0
                // $scope.item.ppn=0
                // $scope.item.hargaDiskon=0
                // $scope.item.hargaDiskonPersen=0
                // $scope.item.subTotal = 0       
            }
            $scope.getNilaiKonversi = function () {
                if ($scope.item.satuan.nilaikonversi == undefined) {
                    $scope.item.nilaiKonversi = 1;
                } else {
                    $scope.item.nilaiKonversi = $scope.item.satuan.nilaikonversi
                }

            }

            $scope.$watch('item.noSPK', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    manageLogistikPhp.getDataTableTransaksi("data/get-no-usulan?NoSPK=" + $scope.item.noUsulan, true).then(function (data) {
                        var datas = data.data;
                        for (var i = datas.length - 1; i >= 0; i--) {
                            if (datas[i].noorder == $scope.item.noSPK) {
                                alert("No Terima Tidak Boleh Sama!");
                                $scope.item.noSPK = '';
                                $scope.isNoUsulanSama = true;
                                break;
                            }
                        }
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
                    }
                }
            });
            $scope.$watch('item.suplier', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.item.alamatSupl = $scope.item.suplier.alamatlengkap
                    $scope.item.telpSupl = 'Telp. ' + $scope.item.suplier.telepon + ' Fax. ' + $scope.item.suplier.faksimile
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

            $scope.tambah = function () {
                // if ($scope.item.jumlah == 0) {
                //     alert("Jumlah harus di isi!")
                //     return;
                // }
                // if ($scope.item.total == 0) {
                //     alert("Stok tidak ada harus di isi!")
                //     return;
                // }
                // if ($scope.item.jenisKemasan == undefined) {
                //     alert("Pilih Jenis Kemasan terlebih dahulu!!")
                //     return;
                // }
                // if (noTerima == '') {
                //     $scope.item.jumlah = 0
                //     alert("Jumlah blm di isi!!")
                //     return;
                // }
                var spesifikasi = '-'
                if ($scope.item.spesifikasi != undefined) {
                    spesifikasi = $scope.item.spesifikasi;
                }
                if ($scope.item.produk == undefined) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return;
                }
                if ($scope.item.satuan == undefined) {
                    alert("Pilih Satuan terlebih dahulu!!")
                    return;
                }
                var nomor = 0
                if ($scope.dataGrid == undefined) {
                    nomor = 1
                } else {
                    nomor = data2.length + 1
                }
                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {
                            data.no = $scope.item.no

                            data.hargajual = null
                            data.jenisobatfk = null
                            data.stock = null
                            data.harganetto = null
                            data.nostrukterimafk = null
                            data.ruanganfk = null
                            data.asalprodukfk = null
                            data.asalproduk = null
                            data.produkfk = $scope.item.produk.id
                            data.namaproduk = $scope.item.produk.namaproduk
                            data.nilaikonversi = $scope.item.nilaiKonversi
                            data.satuanstandarfk = $scope.item.satuan.ssid
                            data.satuanstandar = $scope.item.satuan.satuanstandar
                            data.satuanviewfk = $scope.item.satuan.ssid
                            data.satuanview = $scope.item.satuan.satuanstandar
                            data.nokontrakspk = $scope.item.noSPK
                            data.jmlstok = null
                            data.jumlah = $scope.item.jumlah
                            data.hargasatuan = $scope.item.hargaSatuan
                            data.hargadiscount = String($scope.item.hargaDiskon)
                            data.ppn = String($scope.item.ppn)
                            data.persenppn = String($scope.item.ppnpersen)
                            data.total = $scope.item.subTotal
                            data.tglkebutuhan = $scope.item.tglKebutuhan
                            data.kdproduk = $scope.item.produk.kdproduk
                            data.spesifikasi = spesifikasi
                            data.norec_op = data2[i].norec_op


                            data2[i] = data;
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
                            grandTotal = ttlTotal + ttlPpn
                            $scope.item.totalIniLoh = parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        }
                    }

                } else {
                    data = {
                        no: nomor,
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
                        hargasatuan: $scope.item.hargaSatuan,
                        hargadiscount: String($scope.item.hargaDiskon),
                        ppn: String($scope.item.ppn),
                        persenppn: String($scope.item.ppnpersen),
                        total: $scope.item.subTotal,
                        tglkebutuhan: $scope.item.tglKebutuhan,
                        kdproduk: $scope.item.produk.kdproduk,
                        spesifikasi: spesifikasi,
                        norec_op: null
                    }
                    data2.push(data)
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

                    grandTotal = ttlTotal + ttlPpn
                    $scope.item.totalIniLoh = parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                }
                Kosongkan()
            }

            $scope.klikGrid = function (dataSelected) {
                var dataProduk = [];
                //no:no,
                // $scope.item.tglkebutuhan = $scope.now;
                $scope.item.no = dataSelected.no
                // for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
                //     if ($scope.listProduk[i].id == dataSelected.produkfk){
                //         dataProduk = $scope.listProduk[i]
                //         break;
                //     }
                // }
                manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo-saeutik?namaproduk=" + dataSelected.namaproduk, true, true, 20).then(function (data) {
                    $scope.item.tglkebutuhan = $scope.now;
                    $scope.listProduk.add(data.data[0])
                    $scope.item.produk = data.data[0];
                    // if(dataSelected.namarekanan != undefined){
                    //     $scope.item.rekanan = {id:dataSelected.objectrekananfk, namarekanan:dataSelected.namarekanan};
                    // }else{
                    //     $scope.item.rekanan ='';
                    // }
                    $scope.item.jumlah = dataSelected.jumlah
                    // GETKONVERSI(dataSelected.jumlah)
                    $scope.item.nilaiKonversi = dataSelected.nilaikonversi
                    $scope.item.satuan = {
                        ssid: dataSelected.satuanstandarfk,
                        satuanstandar: dataSelected.satuanstandar
                    }
                    $scope.item.jumlah = dataSelected.jumlah
                    $scope.item.hargaSatuan = dataSelected.hargasatuan
                    if (dataSelected.persenppn == 0 || dataSelected.persenppn == undefined || dataSelected.persenppn == "0") {
                        $scope.item.ppnpersen = parseFloat(dataSelected.hargasatuan) / parseFloat(dataSelected.ppn);
                    }
                    $scope.item.ppn = dataSelected.ppn
                    $scope.item.hargaDiskon = dataSelected.hargadiscount
                    if (dataSelected.hargadiscount == 0 || dataSelected.hargadiscount == undefined || dataSelected.hargadiscount == "0") {
                        $scope.item.hargaDiskonPersen = 0
                    } else {
                        $scope.item.hargaDiskonPersen = parseFloat(dataSelected.hargasatuan) / parseFloat(dataSelected.hargadiscount);
                    }
                    $scope.item.subTotal = dataSelected.total
                    // $scope.disableKdProduk=true;
                    // $scope.disableNamaProduk=true;
                    // $scope.disableSatuan=true;
                    // $scope.disableSubtot=true;  

                })
                // manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo-rekanan-saeutik?namarekanan="+dataSelected.namarekanan, true, true, 20).then(function(data) {
                //     $scope.listRekanan.add(data.data[0])
                //     $scope.item.rekanan = data.data[0];                
                // })

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

            $scope.columnGrid = [{
                    "field": "no",
                    "title": "No",
                    "width": "30px",
                },
                {
                    "field": "tglkebutuhan",
                    "title": "Tanggal Kebutuhan",
                    "width": "100px",
                    "template": "<span>{{formatTanggal('#: tglkebutuhan #')}}</span>"
                },
                {
                    "field": "produkfk",
                    "title": "Kode Barang",
                    "width": "100px",
                },
                {
                    "field": "namaproduk",
                    "title": "Produk",
                    "width": "200px",
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan",
                    "width": "80px",
                },
                {
                    "field": "jumlah",
                    "title": "Qty",
                    "width": "70px",
                },
                {
                    "field": "hargasatuan",
                    "title": "Harga Satuan",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                },
                {
                    "field": "total",
                    "title": "SubTotal",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                }
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
                if ($scope.item.noSPK == undefined) {
                    alert("Nomor Kontrak Masih Kosong!!")
                    return
                }
                if ($scope.item.koordinator == undefined) {
                    alert("Pilih Koordinator!!")
                    return
                }
                if ($scope.item.penanggungjawab == undefined) {
                    alert("Pilih Pegawai penanggung jawab!!")
                    return
                }
                if ($scope.item.mengetahui == undefined) {
                    alert("Pilih Pegawai yang mengetahui!!")
                    return
                }
                if ($scope.item.pegawaiConfirm == undefined) {
                    alert("Pilih Pegawai yang Mengkonfirmasi!!")
                    return
                }

                if ($scope.item.ruanganTujuan == undefined) {
                    alert("Pilih ruangan tujuan!!")
                    return
                }
                if ($scope.item.ruanganPengusul == undefined) {
                    alert("Pilih Unit Pengusul!!")
                    return
                }
                if ($scope.item.keteranganUsulan == undefined) {
                    alert("Isi Jenis Usulan!!")
                    return
                }
                if ($scope.item.tglUsulan == undefined) {
                    alert("Pilih Tgl Usulan!!")
                    return
                }
                if ($scope.item.tglDibutuhkan == undefined) {
                    alert("Isi tgl Dibutuhkan!!")
                    return
                }
                if ($scope.item.BiayaKirim == undefined) {
                    alert("Biaya Kirim Kosong")
                    return
                }
                var strAlamat = '';
                if ($scope.item.alamatSupl != undefined) {
                    strAlamat = $scope.item.alamatSupl
                }
                var qtyHari = 0;
                if ($scope.item.jmlHari != undefined) {
                    qtyHari = $scope.item.jmlHari
                }
                if (data2.length == 0) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return
                }
                var mataanggaran = null;
                if ($scope.item.mataAnggaran != undefined) {
                    mataanggaran = $scope.item.mataAnggaran.norec
                }
                var noUsulan = '-';
                if ($scope.item.noUsulan != undefined) {
                    noUsulan = $scope.item.noUsulan
                }
                var kontrak = '-'
                if ($scope.item.noKontrak != undefined) {
                    kontrak = $scope.item.noKontrak
                }

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
                    norec: norecData,
                    ppn: TotPpn,
                    objectmataanggaranfk: mataanggaran,
                    biayakirim: parseFloat($scope.item.BiayaKirim),
                    kontrak: kontrak,
                    norecrealisasi: norec_Realisasi
                }

                var data = {
                    strukorder: strukorder,
                    details: data2
                }
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
                if ($scope.item.jumlah == 0) {
                    alert("Jumlah harus di isi!")
                    return;
                }
                if ($scope.item.total == 0) {
                    alert("Stok tidak ada harus di isi!")
                    return;
                }
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

                            var subTotal = 0;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal = subTotal + parseFloat(data2[i].total)
                                data2[i].no = i + 1
                                data2[i].tglkebutuhan = dateHelper.formateDate(data2[i].tglkebutuhan, 'DD-MM-YYYY');
                            }
                            // data2.length = data2.length -1
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
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