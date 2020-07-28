define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputResepApotikNonLayananCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, $mdDialog) {
            $scope.item = {};
            $scope.isConsisDisabled = true;
            $scope.norecObat = null;
            $scope.isSimpanDisabled = false;
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.tglAwal = new Date();
            $scope.item.rke = 1;
            $scope.showInputObat = true
            $scope.showRacikan = false
            $scope.isRouteLoading = false;

            $scope.item.hargaNetto = 0;

            var pegawaiUser = {}

            var norec_apd = '';
            var noOrder = '';
            var norecResep = '';
            var dataProdukDetail = [];
            var noTerima = '';
            var data2 = [];
            var data2R = [];
            var hrg1 = 0
            var hrgsdk = 0
            var racikan = 0
            var strStatus = 0
            var tarifJasa = 0
            var jasa = 0
            var jmlQty = 0
            var Totals = 0
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();

            function LoadCache() {
                // init()
                var chacePeriode = cacheHelper.get('InputResepApotikNonLayananCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    // $scope.item.nocm = chacePeriode[0]
                    // $scope.item.namaPasien = chacePeriode[1]
                    // $scope.item.jenisKelamin = chacePeriode[2]
                    // $scope.item.noRegistrasi = chacePeriode[3]

                    // $scope.item.umur = chacePeriode[4]

                    // $scope.listKelas =([{id:chacePeriode[5],namakelas:chacePeriode[6]}]) 
                    // $scope.item.kelas ={id:chacePeriode[5],namakelas:chacePeriode[6]} 
                    // $scope.item.tglregistrasi = chacePeriode[7]
                    // norec_apd = chacePeriode[8]
                    norecResep = chacePeriode[0]
                    noOrder = chacePeriode[1]
                    // $scope.item.jenisPenjamin = chacePeriode[10]
                    // $scope.item.kelompokPasien = chacePeriode[11]
                    // $scope.item.beratBadan = chacePeriode[12]
                    // $scope.item.AlergiYa = chacePeriode[13]
                    // norecResep = chacePeriode[14]

                    // $scope.item.tglAwal =  new Date($scope.now);
                    // $scope.item.resep = '-';

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
                    cacheHelper.set('InputResepApotikNonLayananCtrl', chacePeriode);
                } else {
                    init()
                }
            }
            $scope.LoadResep = function () {
                manageLogistikPhp.getDataTableTransaksi('farmasi/get-norec_bebas?nostruk=' + $scope.item.resep, true).then(function (dat) {
                    norecResep = dat.data[0].norec
                    noOrder = 'EditResep'
                    init();
                })
            }

            function init() {
                $scope.item.nocm = Math.floor(Math.random() * 100000000000) + 0;
                $scope.isRouteLoading = true;
                // debugger;
                manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo", true).then(function (dat) {
                    $scope.isRouteLoading = false;
                    $scope.listPenulisResep = dat.data.penulisresep;
                    $scope.listRuangan = dat.data.ruangan;
                    $scope.listJenisKemasan = dat.data.jeniskemasan;
                    $scope.listProduk = dat.data.produk;
                    $scope.listAsalProduk = dat.data.asalproduk;
                    $scope.listRoute = dat.data.route;
                    $scope.listAturanPakai = dat.data.signa;
                    $scope.listJenisRacikan = dat.data.jenisracikan;
                    pegawaiUser = dat.data.detaillogin[0];



                    if (noOrder != '') {
                        if (noOrder == 'EditResep') {
                            manageLogistikPhp.getDataTableTransaksi("kasir/get-detail-obat-bebas?norecResep=" + norecResep, true).then(function (data_ih) {
                                $scope.isRouteLoading = false;
                                $scope.item.resep = data_ih.data.detailresep.nostruk
                                $scope.item.ruangan = {
                                    id: data_ih.data.detailresep.id,
                                    namaruangan: data_ih.data.detailresep.namaruangan
                                }
                                $scope.item.penulisResep = {
                                    id: data_ih.data.detailresep.pgid,
                                    namalengkap: data_ih.data.detailresep.namalengkap
                                }
                                $scope.item.nocm = data_ih.data.detailresep.nocm
                                $scope.item.namapasien = data_ih.data.detailresep.nama
                                $scope.item.tglLahir = data_ih.data.detailresep.tgllahir
                                $scope.item.noTelepon = data_ih.data.detailresep.notlp
                                $scope.item.alamat = data_ih.data.detailresep.alamat
                                $scope.item.tglAwal = moment(data_ih.data.detailresep.tglresep).format('YYYY-MM-DD HH:mm:ss'),
                                    data2 = data_ih.data.pelayananPasien
                                // for (var i = data2.length - 1; i >= 0; i--) {
                                // data.no = $scope.item.no

                                // data2[i].noregistrasifk = norec_apd//$scope.item.noRegistrasi
                                // data2[i].tglregistrasi = $scope.item.tglregistrasi
                                // data.generik = null
                                //data2[i].hargajual = $scope.item.hargaSatuan
                                // data.jenisobatfk = null
                                // data2[i].kelasfk = $scope.item.kelas.id
                                //data2[i].stock = $scope.item.stok
                                //data2[i].harganetto = $scope.item.hargaSatuan
                                //data2[i].nostrukterimafk = noTerima
                                // data.ruanganfk = $scope.item.ruangan.id

                                // data.rke = $scope.item.rke
                                // data.jeniskemasanfk = $scope.item.jenisKemasan.id
                                // data.jeniskemasan = $scope.item.jenisKemasan.jeniskemasan
                                // data2[i].aturanpakaifk = $scope.item.aturanPakai.id
                                // data2[i].aturanpakai = $scope.item.aturanPakai.nama
                                // data.routefk = $scope.item.route.id
                                // data.route = $scope.item.route.name
                                //data2[i].asalprodukfk = $scope.item.asal.id
                                //data2[i].asalproduk = $scope.item.asal.asalproduk
                                // data.produkfk = $scope.item.produk.id
                                // data.namaproduk = $scope.item.produk.namaproduk
                                // data.nilaikonversi = $scope.item.nilaiKonversi
                                // data.satuanstandarfk = $scope.item.satuan.id
                                // data.satuanstandar = $scope.item.satuan.satuanstandar
                                // data.satuanviewfk = $scope.item.satuan.ssid
                                // data.satuanview = $scope.item.satuan.satuanstandar
                                //data2[i].jmlstok = $scope.item.stok
                                // data.jumlah = $scope.item.jumlah
                                //data2[i].hargasatuan = $scope.item.hargaSatuan
                                //data2[i].hargadiscount = $scope.item.hargadiskon
                                //data2[i].total = $scope.item.total
                                // }
                                // $scope.dataGrid.add($scope.dataSelected)
                                $scope.dataGrid = new kendo.data.DataSource({
                                    data: data2
                                });
                                // $scope.dataGrid = dat.data.orderpelayanan
                                // $scope.item.ruangan = {id:dat.data.strukorder.id,namaruangan:dat.data.strukorder.namaruangan}
                                // $scope.item.penulisResep = {id:dat.data.strukorder.pgid,namalengkap:dat.data.strukorder.namalengkap}
                                var subTotal = 0;
                                for (var i = data2.length - 1; i >= 0; i--) {
                                    subTotal = subTotal + parseFloat(data2[i].total)
                                }
                                $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            });
                        } else {
                            manageLogistikPhp.getDataTableTransaksi("logistik/get-detail-order?noorder=" + noOrder, true).then(function (dat) {
                                $scope.isRouteLoading = false;
                                $scope.item.ruangan = {
                                    id: dat.data.strukorder.id,
                                    namaruangan: dat.data.strukorder.namaruangan
                                }
                                $scope.item.penulisResep = {
                                    id: dat.data.strukorder.pgid,
                                    namalengkap: dat.data.strukorder.namalengkap
                                }
                                data2 = dat.data.orderpelayanan
                                for (var i = data2.length - 1; i >= 0; i--) {
                                    // data.no = $scope.item.no
                                    // manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?"+
                                    //     "produkfk="+ data2[i].produkfk +
                                    //     "&ruanganfk="+ $scope.item.ruangan.id , true).then(function(dat){
                                    //         //dataProdukDetail =dat.data.detail;
                                    //         // data2[i].jmlstok =dat.data.jmlstok / data2[i].nilaiKonversi 
                                    //         // data2[i].jumlah =dat.data.detail.jumlah//parseFloat($scope.dataSelected.jumlah) / parseFloat($scope.dataSelected.nilaikonversi)
                                    //         // $scope.item.hargaSatuan =0
                                    //         // $scope.item.hargadiskon =0
                                    //         // $scope.item.total =0
                                    //         // $scope.item.jumlahxmakan =1
                                    //         // $scope.item.dosis =dat.data.detail.dosis
                                    //         // $scope.item.jumlahxmakan =parseFloat($scope.dataSelected.jumlah) / parseFloat($scope.item.dosis)

                                    //         // $scope.item.nilaiKonversi = $scope.dataSelected.nilaikonversi
                                    //         // $scope.item.satuan = {ssid:$scope.dataSelected.satuanviewfk,satuanstandar:$scope.dataSelected.satuanview}
                                    //         for (var i = 0; i < dat.data.detail.length; i++) {
                                    //             if (parseFloat(data2[i].jumlah * parseFloat(data2[i].nilaikonversi) ) <= parseFloat(dat.data.detail[i].qtyproduk) ){
                                    //                 hrg1 = parseFloat(dat.data.detail[i].hargajual)* parseFloat(data2[i].nilaikonversi)
                                    //                 hrgsdk = parseFloat(dat.data.detail[i].hargadiscount) * parseFloat(data2[i].nilaikonversi)
                                    //                 data2[i].hargasatuan = hrg1 
                                    //                 data2[i].hargadiscount = hrgsdk 
                                    //                 data2[i].total = parseFloat(data2[i].jumlah) * (hrg1-hrgsdk)
                                    //                 data2[i].nostrukterimafk = dat.data.detail[i].norec
                                    //                 data2[i].asalproduk=dat.data.detail[i].asalproduk
                                    //                 data2[i].asalprodukfk=dat.data.detail[i].objectasalprodukfk
                                    //                 break;
                                    //             }
                                    //         }
                                    //         // data2[i].hargasatuan =dat.data.detail.hargajual
                                    //         // data2[i].hargadiscount = dat.data.detail.hargadiscount
                                    //         // data2[i].total = (dat.data.detail.hargajual-dat.data.detail.hargadiscount)*data2[i].jumlah
                                    // });

                                    data2[i].noregistrasifk = norec_apd //$scope.item.noRegistrasi
                                    data2[i].tglregistrasi = $scope.item.tglregistrasi
                                    // data.generik = null
                                    //data2[i].hargajual = $scope.item.hargaSatuan
                                    // data.jenisobatfk = null
                                    data2[i].kelasfk = $scope.item.kelas.id
                                    //data2[i].stock = $scope.item.stok
                                    //data2[i].harganetto = $scope.item.hargaSatuan
                                    //data2[i].nostrukterimafk = noTerima
                                    // data.ruanganfk = $scope.item.ruangan.id

                                    // data.rke = $scope.item.rke
                                    // data.jeniskemasanfk = $scope.item.jenisKemasan.id
                                    // data.jeniskemasan = $scope.item.jenisKemasan.jeniskemasan
                                    // data2[i].aturanpakaifk = $scope.item.aturanPakai.id
                                    // data2[i].aturanpakai = $scope.item.aturanPakai.nama
                                    // data.routefk = $scope.item.route.id
                                    // data.route = $scope.item.route.name
                                    //data2[i].asalprodukfk = $scope.item.asal.id
                                    //data2[i].asalproduk = $scope.item.asal.asalproduk
                                    // data.produkfk = $scope.item.produk.id
                                    // data.namaproduk = $scope.item.produk.namaproduk
                                    // data.nilaikonversi = $scope.item.nilaiKonversi
                                    // data.satuanstandarfk = $scope.item.satuan.id
                                    // data.satuanstandar = $scope.item.satuan.satuanstandar
                                    // data.satuanviewfk = $scope.item.satuan.ssid
                                    // data.satuanview = $scope.item.satuan.satuanstandar
                                    //data2[i].jmlstok = $scope.item.stok
                                    // data.jumlah = $scope.item.jumlah
                                    //data2[i].hargasatuan = $scope.item.hargaSatuan
                                    //data2[i].hargadiscount = $scope.item.hargadiskon
                                    //data2[i].total = $scope.item.total
                                }
                                // $scope.dataGrid.add($scope.dataSelected)
                                $scope.dataGrid = new kendo.data.DataSource({
                                    data: data2
                                });
                                // $scope.dataGrid = dat.data.orderpelayanan

                                var subTotal = 0;
                                for (var i = data2.length - 1; i >= 0; i--) {
                                    subTotal = subTotal + parseFloat(data2[i].total)
                                }
                                $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            });
                        }
                    }
                });

            }

            $scope.getSatuan = function () {
                GETKONVERSI()
            }

            function GETKONVERSI() {
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
                if ($scope.item.ruangan == undefined) {
                    //alert("Pilih Ruangan terlebih dahulu!!")
                    return;
                }
                // if ($scope.item.asal == undefined) {
                //     //alert("Pilih asal terlebih dahulu!!")
                //     return;
                // }



                $scope.item.jumlah = 0
                $scope.item.dosis = 1
                $scope.item.jumlahxmakan = 1
                manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?" +
                    "produkfk=" + $scope.item.produk.id +
                    "&ruanganfk=" + $scope.item.ruangan.id, true).then(function (dat) {
                    dataProdukDetail = dat.data.detail;
                    $scope.item.stok = dat.data.jmlstok / $scope.item.nilaiKonversi
                    $scope.item.jumlah = $scope.dataSelected.jumlah //parseFloat($scope.dataSelected.jumlah) / parseFloat($scope.dataSelected.nilaikonversi)
                    $scope.item.hargaSatuan = 0
                    $scope.item.hargadiskon = 0
                    $scope.item.hargaNetto = 0
                    $scope.item.total = 0
                    // $scope.item.jumlahxmakan =1
                    $scope.item.dosis = $scope.dataSelected.dosis
                    $scope.item.jumlahxmakan = parseFloat($scope.dataSelected.jumlah) / parseFloat($scope.item.dosis)

                    $scope.item.nilaiKonversi = $scope.dataSelected.nilaikonversi
                    $scope.item.satuan = {
                        ssid: $scope.dataSelected.satuanviewfk,
                        satuanstandar: $scope.dataSelected.satuanview
                    }
                    $scope.item.hargaSatuan = $scope.dataSelected.hargasatuan
                    $scope.item.hargaNetto = $scope.dataSelected.harganetto
                    $scope.item.hargadiskon = $scope.dataSelected.hargadiscount
                    $scope.item.total = $scope.dataSelected.total
                });
            }
            $scope.getNilaiKonversi = function () {
                $scope.item.nilaiKonversi = $scope.item.satuan.nilaikonversi
            }
            $scope.$watch('item.nilaiKonversi', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.stok > 0) {
                        $scope.item.stok = parseFloat($scope.item.stok) * (parseFloat(oldValue) / parseFloat(newValue))
                        $scope.item.jumlah = 0 //parseFloat($scope.item.jumlah) / parseFloat(newValue)
                        $scope.item.hargaSatuan = 0 //hrg1 * parseFloat(newValue)
                        $scope.item.hargadiskon = 0 //hrgsdk * parseFloat(newValue)
                        $scope.item.hargaNetto = 0
                        $scope.item.total = 0 // parseFloat(newValue) * 
                        // (hrg1-hrgsdk)
                        // $scope.item.jumlahxmakan =1
                        // $scope.item.dosis =1
                    }
                }
            });
            $scope.$watch('item.rke', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if (tarifJasa == 0) {
                        for (var i = data2.length - 1; i >= 0; i--) {
                            tarifJasa = 800
                            if (data2[i].rke == $scope.item.rke) {
                                tarifJasa = 0
                                break;
                            }
                        }
                    }
                }
            });
            $scope.$watch('item.jumlahxmakan', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.stok > 0) {
                        $scope.item.jumlah = parseFloat($scope.item.jumlahxmakan) * parseFloat($scope.item.dosis)
                    }
                }
            });
            $scope.$watch('item.dosis', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if ($scope.item.stok > 0) {
                        $scope.item.jumlah = parseFloat($scope.item.jumlahxmakan) * parseFloat($scope.item.dosis)
                    }
                }
            });
            $scope.$watch('item.jenisKemasan.jeniskemasan', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if (newValue == 'Racikan') {
                        $scope.showRacikanDose = true
                    } else {
                        $scope.showRacikanDose = false
                    }
                    // if (newValue == 'Racikan') {
                    //    $scope.showInputObat =false
                    //    $scope.showRacikan = true
                    // }else{

                    //    $scope.showInputObat =true
                    //    $scope.showRacikan = false
                    // }
                }
            });

            $scope.$watch('item.hargadiskon', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    hrgsdk = parseFloat($scope.item.hargadiskon);
                    hrg1 = parseFloat($scope.item.hargaSatuan);
                    jasa = parseFloat(tarifJasa);
                    jmlQty = parseFloat($scope.item.jumlah)
                    Totals = jmlQty * (hrg1 - hrgsdk);
                    $scope.item.total = Totals + jasa //(parseFloat($scope.item.jumlah) * (hrg1-hrgsdk)) + parseFloat(tarifJasa)
                }
            })

            $scope.$watch('item.jumlah', function (newValue, oldValue) {
                if (newValue != oldValue) {

                    if ($scope.item.jenisKemasan == undefined) {
                        return
                    }
                    // if (racikan == 'Racikan') {
                    //     hrg1 = parseFloat($scope.item.totalSubTotalR)
                    //     hrgsdk = parseFloat($scope.item.totalDiskonR)
                    //     $scope.item.hargaSatuan =hrg1
                    //     $scope.item.hargadiskon =hrgsdk
                    //     $scope.item.total = parseFloat($scope.item.jumlah) * (hrg1-hrgsdk)
                    //     noTerima = null
                    // }else{
                    if ($scope.item.stok == 0) {
                        $scope.item.jumlah = 0
                        //alert('Stok kosong')

                        return;
                    }
                    var qty20 = 0
                    if (parseFloat(tarifJasa) != 0) {
                        if ($scope.item.jenisKemasan.id == 2) {
                            tarifJasa = 800
                        }
                        if ($scope.item.jenisKemasan.id == 1) {
                            qty20 = Math.floor(parseFloat($scope.item.jumlah) / 20)
                            if (parseFloat($scope.item.jumlah) % 20 == 0) {
                                qty20 = qty20
                            } else {
                                qty20 = qty20 + 1
                            }

                            if (qty20 != 0) {
                                tarifJasa = 800 * qty20
                            }

                        }
                    }
                    if ($scope.item.no == undefined) {
                        tarifJasa = 800
                        for (var i = data2.length - 1; i >= 0; i--) {
                            if (data2[i].rke == $scope.item.rke) {
                                tarifJasa = 0
                            }
                        }
                    }
                    // tarifJasa = 

                    var ada = false;
                    var totalharga = 0;
                    for (var i = 0; i < dataProdukDetail.length; i++) {
                        ada = false
                        if (parseFloat($scope.item.jumlah * parseFloat($scope.item.nilaiKonversi)) <= parseFloat(dataProdukDetail[i].qtyproduk)) {
                            hrg1 = Math.round(parseFloat(dataProdukDetail[i].hargajual) * parseFloat($scope.item.nilaiKonversi))


                            hrgsdk = parseFloat(dataProdukDetail[i].hargadiscount) * parseFloat($scope.item.nilaiKonversi)
                            $scope.item.hargaSatuan = hrg1
                            $scope.item.hargaNetto = Math.round(parseFloat(dataProdukDetail[i].harganetto) * parseFloat($scope.item.nilaiKonversi))
                            if ($scope.item.hargadiskon == 0) {
                                $scope.item.hargadiskon = hrgsdk
                            } else {
                                hrgsdk = $scope.item.hargadiskon
                            }
                            totalharga = (parseFloat($scope.item.jumlah) * (hrg1 - hrgsdk)) + parseFloat(tarifJasa)
                            // if (totalharga < 500) {
                            //     totalharga=500
                            // }else{
                            //     totalharga = Math.round((totalharga)/500)*500
                            // }
                            $scope.item.total = totalharga //(parseFloat($scope.item.jumlah) * (hrg1-hrgsdk)) + parseFloat(tarifJasa)
                            noTerima = dataProdukDetail[i].norec
                            $scope.item.asal = {
                                id: dataProdukDetail[i].objectasalprodukfk,
                                asalproduk: dataProdukDetail[i].asalproduk
                            }
                            ada = true;
                            break;
                        }
                    }
                    if (ada == false) {
                        $scope.item.hargaSatuan = 0
                        $scope.item.hargaNetto = 0
                        $scope.item.hargadiskon = 0
                        $scope.item.total = 0

                        noTerima = ''
                    }
                    if ($scope.item.jumlah == 0) {
                        $scope.item.hargaSatuan = 0
                        $scope.item.hargaNetto = 0
                    }
                    // }
                    // if ($scope.item.stok > 0) {
                    //     $scope.item.stok =parseFloat($scope.item.stok) * (parseFloat(oldValue)/ parseFloat(newValue))
                    // }
                }
            });

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.tambah = function () {
                if ($scope.item.jumlah == 0) {
                    alert("Jumlah harus di isi!")
                    return;
                }
                if ($scope.item.total == 0) {
                    alert("Stok tidak ada harus di isi!")
                    return;
                }
                if ($scope.item.jenisKemasan == undefined) {
                    alert("Pilih Jenis Kemasan terlebih dahulu!")
                    return;
                }
                if (noTerima == '') {
                    $scope.item.jumlah = 0
                    alert("Jumlah blm di isi!!")
                    return;
                }
                if ($scope.item.produk == undefined) {
                    alert("Pilih Produk terlebih dahulu!")
                    return;
                }
                if ($scope.item.satuan == undefined) {
                    alert("Pilih Satuan terlebih dahulu!")
                    return;
                }
                if ($scope.item.aturanPakai == undefined) {
                    alert("Aturan Pakai Belum Diisi!")
                    return;
                }

                if (!$scope.item.route) {
                    alert("Harap isi Route!")
                    return;
                }

                var jRacikan = null
                if ($scope.item.jenisRacikan != undefined) {
                    jRacikan = $scope.item.jenisRacikan.id
                }
                var dosis = 1;
                if ($scope.item.jenisKemasan.jeniskemasan == 'Racikan') {
                    dosis = $scope.item.dosis
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

                            data.noregistrasifk = '-'
                            data.tglregistrasi = '-'
                            data.generik = null
                            data.hargajual = String($scope.item.hargaSatuan)
                            data.jenisobatfk = jRacikan
                            data.kelasfk = '-'
                            data.stock = String($scope.item.stok)
                            data.harganetto = String($scope.item.hargaNetto)
                            data.nostrukterimafk = noTerima
                            data.ruanganfk = $scope.item.ruangan.id

                            data.rke = $scope.item.rke
                            data.jeniskemasanfk = $scope.item.jenisKemasan.id
                            data.jeniskemasan = $scope.item.jenisKemasan.jeniskemasan
                            // data.aturanpakaifk = $scope.item.aturanPakai.id
                            // data.aturanpakai = $scope.item.aturanPakai.name
                            data.aturanpakai = $scope.item.aturanPakai
                            data.routefk = $scope.item.route.id
                            data.route = $scope.item.route.name
                            data.asalprodukfk = $scope.item.asal.id
                            data.asalproduk = $scope.item.asal.asalproduk
                            data.produkfk = $scope.item.produk.id
                            data.namaproduk = $scope.item.produk.namaproduk
                            data.nilaikonversi = $scope.item.nilaiKonversi
                            data.satuanstandarfk = $scope.item.satuan.ssid
                            data.satuanstandar = $scope.item.satuan.satuanstandar
                            data.satuanviewfk = $scope.item.satuan.ssid
                            data.satuanview = $scope.item.satuan.satuanstandar
                            data.jmlstok = String($scope.item.stok)
                            data.jumlah = $scope.item.jumlah
                            data.dosis = dosis
                            data.hargasatuan = String($scope.item.hargaSatuan)
                            data.hargadiscount = String($scope.item.hargadiskon)
                            data.total = $scope.item.total
                            data.jmldosis = String(($scope.item.jumlah) / dosis) + '/' + String(dosis)
                            data.jasa = tarifJasa

                            data2[i] = data;
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });
                            var subTotal = 0;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal = subTotal + parseFloat(data2[i].total)
                            }
                            $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                        }
                        // break;
                    }

                } else {
                    data = {
                        no: nomor,
                        noregistrasifk: '-', //$scope.item.noRegistrasi,
                        tglregistrasi: '-',
                        generik: null,
                        hargajual: String($scope.item.hargaSatuan),
                        jenisobatfk: jRacikan,
                        kelasfk: '-',
                        stock: String($scope.item.stok),
                        harganetto: String($scope.item.hargaNetto),
                        nostrukterimafk: noTerima,
                        ruanganfk: $scope.item.ruangan.id, //£££
                        rke: $scope.item.rke,
                        jeniskemasanfk: $scope.item.jenisKemasan.id,
                        jeniskemasan: $scope.item.jenisKemasan.jeniskemasan,
                        // aturanpakaifk:$scope.item.aturanPakai.id,
                        // aturanpakai:$scope.item.aturanPakai.name,
                        aturanpakai: $scope.item.aturanPakai,
                        routefk: $scope.item.route.id,
                        route: $scope.item.route.name,
                        asalprodukfk: $scope.item.asal.id,
                        asalproduk: $scope.item.asal.asalproduk,
                        produkfk: $scope.item.produk.id,
                        namaproduk: $scope.item.produk.namaproduk,
                        nilaikonversi: $scope.item.nilaiKonversi,
                        satuanstandarfk: $scope.item.satuan.ssid,
                        satuanstandar: $scope.item.satuan.satuanstandar,
                        satuanviewfk: $scope.item.satuan.ssid,
                        satuanview: $scope.item.satuan.satuanstandar,
                        jmlstok: String($scope.item.stok),
                        jumlah: $scope.item.jumlah,
                        dosis: dosis,
                        hargasatuan: String($scope.item.hargaSatuan),
                        hargadiscount: String($scope.item.hargadiskon),
                        total: $scope.item.total,
                        jmldosis: String(($scope.item.jumlah) / dosis) + '/' + String(dosis),
                        jasa: tarifJasa
                    }
                    data2.push(data)
                    // $scope.dataGrid.add($scope.dataSelected)
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: data2
                    });
                    var subTotal = 0;
                    for (var i = data2.length - 1; i >= 0; i--) {
                        subTotal = subTotal + parseFloat(data2[i].total)
                    }
                    $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                }
                if ($scope.item.jenisKemasan.jeniskemasan != 'Racikan') {
                    $scope.item.rke = parseFloat($scope.item.rke) + 1
                }
                // 26  0   t       jasa produksi non steril
                // 27  0   t       jasa pelayanan TPN
                // 28  0   t       jasa pelayanan handling cytotoxic
                // 29  0   t       jasa pelayanan IV Admixture
                // 30  0   t       jasa pelayanan Repacking obat injeksi
                // strStatus= $scope.item.produk.id

                Kosongkan()
                racikan = ''
            }

            $scope.klikGrid = function (dataSelected) {
                var dataProduk = [];
                //no:no,
                $scope.item.no = dataSelected.no
                $scope.item.rke = dataSelected.rke
                manageLogistikPhp.getDataTableTransaksi("farmasi/get-jenis-obat?jrid=" + dataSelected.jenisobatfk, true).then(function (JR) {
                    $scope.item.jenisRacikan = {
                        id: JR.data.data[0].id,
                        jenisracikan: JR.data.data[0].jenisracikan
                    }
                });
                // 
                $scope.item.jenisKemasan = {
                    id: dataSelected.jeniskemasanfk,
                    jeniskemasan: dataSelected.jeniskemasan
                }
                // $scope.item.aturanPakai = {id:dataSelected.aturanpakaifk,name:dataSelected.aturanpakai}
                $scope.item.aturanPakai = dataSelected.aturanpakai
                $scope.item.route = {
                    id: dataSelected.routefk,
                    name: dataSelected.route
                }
                if (dataSelected.asalprodukfk != 0) {
                    $scope.item.asal = {
                        id: dataSelected.asalprodukfk,
                        asalproduk: dataSelected.asalproduk
                    }
                }
                for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
                    if ($scope.listProduk[i].id == dataSelected.produkfk) {
                        dataProduk = $scope.listProduk[i]
                        break;
                    }
                }
                $scope.item.produk = dataProduk //{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
                // $scope.item.stok = dataSelected.jmlstok //* $scope.item.nilaiKonversi 

                $scope.item.jumlah = 0
                tarifJasa = dataSelected.jasa
                // $scope.item.dosis = dataSelected.dosis
                GETKONVERSI()
                // $scope.item.nilaiKonversi = dataSelected.nilaikonversi
                // $scope.item.satuan = {ssid:dataSelected.satuanviewfk,satuanstandar:dataSelected.satuanview}


                // // $scope.item.jumlah = dataSelected.jumlah
                // $scope.item.hargaSatuan = dataSelected.hargasatuan
                // $scope.item.hargadiskon = dataSelected.hargadiscount
                // $scope.item.total = dataSelected.total
            }

            function Kosongkan() {
                $scope.item.produk = ''
                $scope.item.asal = ''
                $scope.item.satuan = ''
                $scope.item.nilaiKonversi = 0
                $scope.item.stok = 0
                $scope.item.jumlah = 0
                $scope.item.dosis = 1
                $scope.item.jumlahxmakan = 1
                $scope.item.hargadiskon = 0
                $scope.item.no = undefined
                $scope.item.total = 0
                $scope.item.hargaSatuan = 0
                $scope.item.hargaNetto = 0
                $scope.item.aturanPakai = undefined;
            }
            $scope.batal = function () {
                Kosongkan()
            }
            $scope.BatalInput = function () {
                BaruLagi()
            }

            function BaruLagi() {
                $scope.item.nocm = Math.floor(Math.random() * 100000000000) + 0;
                $scope.item.resep = '';
                // $scope.item.penulisResep =[]
                // $scope.item.nocm = '';
                $scope.item.namapasien = '';
                $scope.item.tglLahir = '';
                $scope.item.noTelepon = '';
                $scope.item.alamat = '';
                $scope.item.rke = 1;
                $scope.dataGrid = [];
                data2 = [];
                $scope.isConsisDisabled = true;
                $scope.isSimpanDisabled = false;
            }

            $scope.columnGrid = [{
                    "field": "no",
                    "title": "No",
                    "width": "30px",
                },
                {
                    "field": "rke",
                    "title": "R/ke",
                    "width": "40px",
                },
                {
                    "field": "jeniskemasan",
                    "title": "Kemasan",
                    "width": "70px",
                },
                {
                    "field": "asalproduk",
                    "title": "Asal Produk",
                    "width": "100px",
                },
                {
                    "field": "jmldosis",
                    "title": "Jml/Dosis",
                    "width": "60px",
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
                    "field": "jumlah",
                    "title": "Qty Obat",
                    "width": "70px",
                },
                {
                    "field": "hargasatuan",
                    "title": "Harga Satuan",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                },
                {
                    "field": "hargadiscount",
                    "title": "Harga Discount",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                },
                {
                    "field": "total",
                    "title": "Total",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                }
            ];
            // $scope.columnGridR = [
            // {
            //     "field": "no",
            //     "title": "No",
            //     "width" : "30px",
            // },
            // {
            //     "field": "rke",
            //     "title": "R/ke",
            //     "width" : "40px",
            // },
            // {
            //     "field": "jeniskemasan",
            //     "title": "Kemasan",
            //     "width" : "70px",
            // },
            // {
            //     "field": "asalproduk",
            //     "title": "Asal Produk",
            //     "width" : "100px",
            // },
            // {
            //     "field": "namaproduk",
            //     "title": "Deskripsi",
            //     "width" : "200px",
            // },
            // {
            //     "field": "satuanstandar",
            //     "title": "Satuan",
            //     "width" : "80px",
            // },
            // {
            //     "field": "jumlah",
            //     "title": "Qty",
            //     "width" : "70px",
            // },
            // {
            //     "field": "hargasatuan",
            //     "title": "Harga Satuan",
            //     "width" : "100px",
            //     "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
            // },
            // {
            //     "field": "hargadiscount",
            //     "title": "Harga Discount",
            //     "width" : "100px",
            //     "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
            // },
            // {
            //     "field": "total",
            //     "title": "Total",
            //     "width" : "100px",
            //     "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
            // }
            // ];
            // $scope.mainGridOptions = { 
            //     pageable: true,
            //     columns: $scope.columnProduk,
            //     editable: "popup",
            //     selectable: "row",
            //     scrollable: false
            // };
            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.kembali = function () {
                //$state.go("TransaksiPelayananApotik")
                window.history.back();
            }
            $scope.CariPasien = function () {
                manageLogistikPhp.getDataTableTransaksi("farmasi/get-detail-pasien?nocm=" + $scope.item.nocm, true).then(function (data_ih) {
                    $scope.item.nocm = data_ih.data.nocm
                    $scope.item.namapasien = data_ih.data.namapasien
                    $scope.item.tglLahir = new Date(data_ih.data.tgllahir);
                    $scope.item.noTelepon = data_ih.data.notelepon
                    $scope.item.alamat = data_ih.data.alamatlengkap
                })
            }

            $scope.BridgingConsisD = function () {

                // if ($scope.dataSelected.jeniskemasan != 'Non Racikan') {
                //     alert("Harus Non Racikan!!")
                //     return
                // }
                var confirm = prompt("Input Counter ID", "1");
                var objSave = {
                    strukresep: $scope.norecObat,
                    counterid: confirm
                }

                manageLogistikPhp.saveconsisobatbebas(objSave).then(function (e) {
                    // $state.go()
                })
            }

            $scope.BridgingMiniR45 = function () {
                if ($scope.dataSelected == undefined) {
                    alert("Pilih Resep terlebih dahulu!!")
                    return
                } //
                if ($scope.dataSelected.jeniskemasan != 'Racikan/Puyer') {
                    alert("Harus Racikan puyer!!")
                    return
                }
                var objSave = {
                    strukresep: $scope.dataSelected.norec_resep,
                    rke: $scope.dataSelected.rke
                }

                manageLogistikPhp.postpost("bridging/save-mini-r45-rev-1", objSave).then(function (e) {

                })
            }

            $scope.simpan = function () {
                $scope.isSimpanDisabled = true;
                let isConfirm = $scope.item.ruangan.namaruangan === 'Farmasi 1',
                    penulis = null;

                if (!$scope.item.nocm) {
                    toastr.warning("No tidak boleh kosong");
                    $scope.item.nocm = Math.floor(Math.random() * 100000000000) + 0;
                    return;
                }

                if ($scope.item.nocm == '-' || $scope.item.nocm == '--' || $scope.item.nocm == '---' || $scope.item.nocm == '----' || $scope.item.nocm == '-----') {
                    toastr.warning("No. MR yang anda masukan salah!");
                    $scope.item.nocm = Math.floor(Math.random() * 100000000000) + 0;
                    $scope.item.nocm = '';
                    return;
                }

                if ($scope.item.penulisResep != undefined) {
                    // alert("Pilih Penulis Resep terlebih dahulu!!")
                    // return
                    penulis = $scope.item.penulisResep.id
                }

                if (data2.length == 0) {
                    toastr.info("Pilih Produk terlebih dahulu!!")
                    return;
                }

                if ($scope.item.karyawan == true) {
                    if ($scope.item.polikaryawan == true) {
                        toastr.info("Pilih salah satu!!")
                        return;
                    }

                }
                var subTotal = 0;
                for (var i = data2.length - 1; i >= 0; i--) {
                    subTotal = subTotal + parseFloat(data2[i].total)
                }
                var nrssp = '';
                if (norecResep != undefined) {
                    nrssp = norecResep
                }
                var kry = '';
                if ($scope.item.karyawan == true) {
                    kry = "Karyawan"
                }
                if ($scope.item.polikaryawan == true) {
                    kry = "Poli Karyawan"
                }
                var strukresep = {
                    noresep: nrssp,
                    tglresep: moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss'),
                    nocm: $scope.item.nocm,
                    namapasien: $scope.item.namapasien,
                    penulisresepfk: penulis,
                    ruanganfk: $scope.item.ruangan.id,
                    keteranganlainnya: 'Penjualan Obat Bebas',
                    totalharusdibayar: subTotal,
                    tglLahir: $scope.item.tglLahir,
                    noTelepon: $scope.item.noTelepon,
                    alamat: $scope.item.alamat,
                    karyawan: kry,
                }
                var objSave = {
                    strukresep: strukresep,
                    details: data2
                }
                //
                manageLogistikPhp.postpelayananapotikbebas(objSave).then(function (e) {
                    $scope.item.resep = e.data.data.nostruk;
                    $scope.isConsisDisabled = false;
                    // $scope.isSimpanDisabled = false;
                    $scope.norecObat = e.data.data.norec;
                    var stt = 'false'
                    if (confirm('View resep? ')) {
                        // Save it!
                        stt = 'true';
                    } else {
                        // Do nothing!
                        stt = 'false'
                    }
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores=NonLayanan' + e.data.data.norec + '&view=' + stt + '&user=' + pegawaiUser.namalengkap, function (response) {
                        //aadc=response;
                    });

                    var confirmDialog = $mdDialog.confirm()
                        .title(`Apakah Obat akan dikeluarkan melalui "ROBOTIK" ?`)
                        .ok('Ya')
                        .cancel('Batal');

                    if (isConfirm) {
                        $mdDialog.show(confirmDialog).then(function () {
                            // yes
                            $scope.BridgingConsisD();
                        }, function () {
                            console.info('Cancel');
                        });
                    }
                    // BaruLagi()
                    // if (noOrder == 'EditResep') {
                    //     var objDelete = {norec:norecResep}
                    //     manageLogistikPhp.posthapuspelayananapotik(objDelete).then(function(e) {

                    //     })
                    // }
                    // if (norecResep != '') {
                    //     var chacePeriode = {
                    //         0: '',
                    //         1: '',
                    //         2: '',
                    //         3: '',
                    //         4: '',
                    //         5: '',
                    //         6: ''
                    //     }
                    //     cacheHelper.set('InputResepApotikNonLayananCtrl', chacePeriode);
                    //     window.history.back();
                    // }
                    // window.history.back();
                }, err => $scope.isSimpanDisabled = false)

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
                if ($scope.item.jumlah == 0) {
                    alert("Jumlah harus di isi!")
                    return;
                }
                if ($scope.item.total == 0) {
                    alert("Stok tidak ada harus di isi!")
                    return;
                }
                if ($scope.item.jenisKemasan == undefined) {
                    alert("Pilih Jenis Kemasan terlebih dahulu!!")
                    return;
                }
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

        }
    ]);
});