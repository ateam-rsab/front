define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputResepElektronikApotikCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, $mdDialog) {
            $scope.item = {};
            $scope.selectedResep = {};
            $scope.onSave = false;
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke = 1;
            $scope.showInputObat = true
            $scope.showRacikan = false
            $scope.isRouteLoading = false;
            $scope.tombolSimpanVis = true
            $scope.disabledRuangan = false;
            $scope.statusConsis = false;
            $scope.dataTempResep = [];
            $scope.dataGrid = new kendo.data.DataSource({
                data: []
            })
            $scope.item.hargaNetto = 0;

            $scope.isConsisDisabled = true;
            $scope.norecObat = null;

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
            var isPemakaianObatAlkes = false;
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();

            function LoadCache() {
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
                let cacheResepElektronik = cacheHelper.get('CacheDataResepElektronik');
                let chacePeriode = cacheHelper.get('InputResepApotikCtrl');
                if (cacheResepElektronik != undefined) {
                    $scope.item.nocm = cacheResepElektronik.noCm;
                    $scope.item.namaPasien = cacheResepElektronik.namaPasien;
                    $scope.item.jenisKelamin = cacheResepElektronik.jenisKelamin;
                    $scope.item.noRegistrasi = cacheResepElektronik.noRegistrasi;

                    $scope.item.umur = cacheResepElektronik.umur;

                    // $scope.listKelas = ([{ id: cacheResepElektronik., namakelas: cacheResepElektronik[6] }])
                    $scope.item.kelas = {
                        id: cacheResepElektronik.klid,
                        namakelas: cacheResepElektronik.namaKelas
                    };
                    $scope.item.tglregistrasi = cacheResepElektronik.tglRegistrasi;
                    norec_apd = cacheResepElektronik.norec_apd;
                    noOrder = cacheResepElektronik.nOrder;
                    $scope.item.jenisPenjamin = cacheResepElektronik.jenisPenjamin;
                    $scope.item.kelompokPasien = cacheResepElektronik.kelompokPasien;
                    $scope.item.beratBadan = cacheResepElektronik.beratbadan;
                    $scope.item.AlergiYa = cacheResepElektronik.riwayatalergi;
                    norecResep = cacheResepElektronik.norec_so;
                    $scope.item.subtitusiObat = cacheResepElektronik.izinObat


                    $scope.item.tglAwal = new Date($scope.now);
                    $scope.item.resep = '-';

                    init()
                } else {
                    var arrPeriode = chacePeriode.split(':');
                    $scope.item.nocm = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noRegistrasi = chacePeriode[3]

                    $scope.item.umur = chacePeriode[4]

                    $scope.listKelas = ([{
                        id: chacePeriode[5],
                        namakelas: chacePeriode[6]
                    }])
                    $scope.item.kelas = {
                        id: chacePeriode[5],
                        namakelas: chacePeriode[6]
                    }
                    $scope.item.tglregistrasi = chacePeriode[7]
                    norec_apd = chacePeriode[8]
                    noOrder = chacePeriode[9]
                    $scope.item.jenisPenjamin = chacePeriode[10]
                    $scope.item.kelompokPasien = chacePeriode[11]
                    $scope.item.beratBadan = chacePeriode[12]
                    $scope.item.AlergiYa = chacePeriode[13]
                    norecResep = chacePeriode[14]

                    $scope.item.tglAwal = new Date($scope.now);
                    $scope.item.resep = '-';
                }
                var cachePemakaianOA = cacheHelper.get('cachePemakaianOA');
                if (cachePemakaianOA != undefined) {
                    isPemakaianObatAlkes = true
                    cacheHelper.set('cachePemakaianOA', undefined);
                }
            }

            function init() {
                $scope.isRouteLoading = true;
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

                    // $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                    // $scope.item.penulisResep = {id:data.data.detailresep.pgid,namalengkap:data.data.detailresep.namalengkap}



                    if (noOrder != '') {
                        if (noOrder == 'EditResep') {
                            manageLogistikPhp.getDataTableTransaksi("logistik/get_detail-resep?norecResep=" + norecResep, true).then(function (data) {
                                $scope.isRouteLoading = false;

                                $scope.disabledRuangan = true;
                                $scope.item.resep = data.data.detailresep.noresep
                                $scope.item.ruangan = {
                                    id: data.data.detailresep.id,
                                    namaruangan: data.data.detailresep.namaruangan
                                }
                                $scope.item.penulisResep = {
                                    id: data.data.detailresep.pgid,
                                    namalengkap: data.data.detailresep.namalengkap
                                }

                                data2 = data.data.pelayananPasien
                                for (var i = data2.length - 1; i >= 0; i--) {
                                    // data.no = $scope.item.no

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
                                    data: data2,
                                    pageSize: 10
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
                                    data: data2,
                                    pageSize: 10
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

                manageLogistikPhp.getDataTableTransaksi("rekam-medis/get-resep-dokter-detail?strukorder=" + norecResep, true).then(res => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        let dataTemp = {
                            isRacikan: res.data.data[i].obat.length > 1 ? true : false,
                            resep: res.data.data[i].resep,
                            keteranganlainnya: "",
                            keteranganpakai: "",
                            status: '-',
                            obat: [],
                        }
                        for (let ii = 0; ii < res.data.data[i].obat.length; ii++) {
                            dataTemp.keteranganlainnya = res.data.data[i].obat[ii].keteranganlainnya;
                            dataTemp.keteranganpakai = res.data.data[i].obat[ii].keteranganpakai,
                                dataTemp.obat.push({
                                    namaobat: res.data.data[i].obat[ii].namaobat,
                                    qtyproduk: res.data.data[i].obat[ii].qtyproduk
                                });

                        }
                        $scope.dataTempResep.push(dataTemp);
                    }
                    // console.log($scope.dataTempResep);
                    $scope.dataSourceResepDokter = new kendo.data.DataSource({
                        data: $scope.dataTempResep,
                        pageSize: 5
                    })
                });

                $scope.columnResepDokter = {
                    pageable: true,
                    columns: [{
                            field: "resep",
                            title: "<h3>r/Ke</h3>",
                            width: "3%",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        },
                        {
                            field: "isRacikan",
                            title: "<h3>Jenis</h3>",
                            width: "50px",
                            template: "#if(isRacikan) { # #: 'Racikan' # #} else { #Non Racikan# } #",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            }
                        },
                        {

                            field: "keteranganpakai",
                            title: "<h3>Keterangan Pakai</h3>",
                            width: "100px",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        },
                        {

                            field: "keteranganlainnya",
                            title: "<h3>Instruksi</h3>",
                            width: "100px",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        },
                        {

                            field: "status",
                            title: "<h3>Status</h3>",
                            width: "100px",
                            template: '#= status #',
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        },
                        {
                            command: [{
                                text: "Detail",
                                click: showDetail
                            }],
                            title: "&nbsp;",
                            width: "3%",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        }
                    ]
                }

            }

            function showDetail(e) {
                e.preventDefault();
                let dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.selectedResep = dataItem;
                $scope.item.rke = dataItem.resep;
                // $scope.item.aturanPakai = "";
                $scope.item.aturanPakai = dataItem.keteranganpakai;

                $scope.item.produk = null;
                $scope.item.route = null;
                $scope.item.dosis = 1;
                $scope.item.jumlahxmakan = 1;
                $scope.item.satuan = null;
                $scope.item.stok = 0;

                if (!dataItem.isRacikan) {
                    $scope.item.jenisKemasan = {
                        id: 2,
                        jeniskemasan: "Non Racikan"
                    }

                    $scope.resep = {
                        rke: dataItem.resep,
                        namaObat: dataItem.obat[0].namaobat,
                        jumlah: dataItem.obat[0].qtyproduk,
                        keteranganPakai: dataItem.keteranganpakai,
                        instruksi: dataItem.keteranganlainnya,
                        isRacikan: 'Jumlah'
                    }
                    $scope.racikan = true;
                } else {
                    $scope.item.jenisKemasan = {
                        id: 1,
                        jeniskemasan: "Racikan"
                    }

                    let dataObat = [];
                    $scope.resep = {
                        rke: dataItem.resep,
                        keteranganPakai: dataItem.keteranganpakai,
                        instruksi: dataItem.keteranganlainnya,
                        isRacikan: 'Dosis'
                    }

                    for (let i = 0; i < dataItem.obat.length; i++) {
                        let dataTemp = {
                            namaObat: dataItem.obat[i].namaobat,
                            jumlah: dataItem.obat[i].qtyproduk,
                        }
                        dataObat.push(dataTemp);
                    }


                    $scope.listObatRacikan = new kendo.data.DataSource({
                        data: dataObat,
                        pageSize: 10
                    });

                    $scope.racikan = false;
                }
                $scope.popupInputObat.center().open();
            }

            $scope.columnObatRacikan = {
                pageable: true,
                columns: [{
                        field: "namaObat",
                        title: "Nama Obat",
                        width: "90%",
                        // attributes: {
                        //     style: "text-align:center;valign=middle"
                        // },
                    },
                    {
                        field: "jumlah",
                        title: "Dosis",
                        width: "10%",
                        attributes: {
                            style: "text-align:center;valign=middle"
                        },
                    },

                ]
            }

            $scope.getSatuan = function () {

                /* info stok all ruangan */
                manageLogistikPhp.getDataTableTransaksi("logistik/get-info-stok?produkfk=" + $scope.item.produk.id, true)
                    .then(function (e) {
                        $scope.item.namaProduks = $scope.item.produk.namaproduk;
                        for (var i = 0; i < e.data.infostok.length; i++) {
                            e.data.infostok[i].no = i + 1
                        }
                        $scope.dataGridStok = new kendo.data.DataSource({
                            data: e.data.infostok,
                            pageable: true,
                            pageSize: 5,
                            total: e.data.infostok.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {}
                                }
                            }
                        })
                    })
                /* end info stok all ruangan */

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
                    $scope.consis = dat.data.consis;

                    //parseFloat($scope.dataSelected.jumlah) / parseFloat($scope.dataSelected.nilaikonversi)
                    $scope.item.hargaSatuan = 0
                    $scope.item.hargadiskon = 0
                    $scope.item.hargaNetto = 0
                    $scope.item.total = 0
                    // $scope.item.jumlahxmakan =1
                    if ($scope.dataSelected != undefined) {
                        $scope.item.jumlah = $scope.dataSelected.jumlah
                        $scope.item.dosis = $scope.dataSelected.dosis
                        $scope.item.jumlahxmakan = parseFloat($scope.dataSelected.jumlah) / parseFloat($scope.item.dosis)
                        $scope.item.nilaiKonversi = $scope.dataSelected.nilaikonversi
                        $scope.item.satuan = {
                            ssid: $scope.dataSelected.satuanviewfk,
                            satuanstandar: $scope.dataSelected.satuanview
                        }
                        $scope.item.hargaSatuan = $scope.dataSelected.hargasatuan
                        $scope.item.hargadiskon = $scope.dataSelected.hargadiscount
                        $scope.item.hargaNetto = $scope.dataSelected.harganetto
                        $scope.item.total = $scope.dataSelected.total
                    }


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
            // $scope.$watch('item.tglAwal', function(newValue, oldValue) {
            //     statusPosting == true
            //     if (newValue != oldValue  ) {
            //         statusPosting == true
            //         var tgltgl = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
            //         manageLogistikPhp.getDataTableTransaksi("akutansi/get-sudah-posting?tgl="+
            //             tgltgl, true).then(function(dat){
            //                 statusPosting = dat.data.status
            //                 if (statusPosting == true) {
            //                     window.messageContainer.error('Data Sudah di Posting, Hubungi Bagian Akuntansi.')
            //                 }
            //             }
            //         ) 
            //     }
            //     $scope.tombolSimpanVis = true
            // });
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
                    hrgsdk = $scope.item.hargadiskon
                    $scope.item.total = (parseFloat($scope.item.jumlah) * (hrg1 - hrgsdk)) + parseFloat(tarifJasa)
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
                    tarifJasa = 800
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
                        for (var i = data2.length - 1; i >= 0; i--) {
                            if (data2[i].rke == $scope.item.rke) {
                                tarifJasa = 0
                            }
                        }
                    }
                    // tarifJasa = 

                    var ada = false;
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
                            $scope.item.total = (parseFloat($scope.item.jumlah) * (hrg1 - hrgsdk)) + parseFloat(tarifJasa)
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
                        $scope.item.hargadiskon = 0
                        $scope.item.hargaNetto = 0
                        $scope.item.total = 0

                        noTerima = ''
                        if (dataProdukDetail.length > 1) {
                            var stt = 'false'
                            if (confirm('Struk Penerimaan berbeda, merge/satukan stok? ')) {
                                var objSave = {
                                    produkfk: $scope.item.produk.id,
                                    ruanganfk: $scope.item.ruangan.id
                                }

                                $scope.tombolSimpanVis = false;
                                manageLogistikPhp.poststockmerger(objSave).then(function (e) {
                                    Kosongkan();
                                })
                            } else {
                                // Do nothing!
                                stt = 'false'
                            }

                        }
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
                if ($scope.item.hargaSatuan == 0) {
                    alert("Harga Satuan tidak memiliki harga!")
                    return;
                }
                // if ($scope.item.total == 0) {
                //     alert("Stok tidak ada harus di isi!")
                //     return;
                // }
                if ($scope.item.jenisKemasan == undefined) {
                    alert("Pilih Jenis Kemasan terlebih dahulu!!")
                    return;
                }
                if (noTerima == '') {
                    $scope.item.jumlah = 0
                    alert("Jumlah blm di isi!!")
                    return;
                }
                if ($scope.item.produk == undefined) {
                    alert("Produk terlebih dahulu!!")
                    return;
                }
                if ($scope.item.satuan == undefined) {
                    alert("Pilih Satuan terlebih dahulu!!")
                    return;
                }
                if ($scope.item.aturanPakai == undefined) {
                    alert("Aturan Pakai Belum Diisi!!")
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
                $scope.disabledRuangan = true;
                var data = {};
                if ($scope.item.no != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == $scope.item.no) {
                            data.no = $scope.item.no

                            data.noregistrasifk = norec_apd //$scope.item.noRegistrasi
                            data.tglregistrasi = moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss')
                            data.generik = null
                            data.hargajual = String($scope.item.hargaSatuan)
                            data.jenisobatfk = jRacikan
                            data.kelasfk = $scope.item.kelas.id
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
                                data: data2,
                                pageSize: 10
                            });
                            var subTotal = 0;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal = subTotal + parseFloat(data2[i].total)
                            }
                            $scope.item.totalSubTotal = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                        }
                    }

                } else {
                    data = {
                        no: nomor,
                        noregistrasifk: norec_apd, //$scope.item.noRegistrasi,
                        tglregistrasi: moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
                        generik: null,
                        hargajual: String($scope.item.hargaSatuan),
                        jenisobatfk: jRacikan,
                        kelasfk: $scope.item.kelas.id,
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
                        data: data2,
                        pageSize: 10
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
                if ($scope.consis == 1) {
                    $scope.statusConsis = true;
                }
                // 26  0   t       jasa produksi non steril
                // 27  0   t       jasa pelayanan TPN
                // 28  0   t       jasa pelayanan handling cytotoxic
                // 29  0   t       jasa pelayanan IV Admixture
                // 30  0   t       jasa pelayanan Repacking obat injeksi
                // strStatus= $scope.item.produk.id
                $scope.popupInputObat.close();
                Kosongkan();
                racikan = ''
            }

            let subTotal = 0;
            $scope.tambahObat = function () {
                let gridResepDokter = $('#gridResepDokter').data().kendoGrid.dataSource._data[$scope.selectedResep.resep - 1];
                var nomor = 0
                if ($scope.dataGrid == undefined) {
                    nomor = 1
                } else {
                    nomor = data2.length + 1
                }
                var jRacikan = null
                if ($scope.item.jenisRacikan != undefined) {
                    jRacikan = $scope.item.jenisRacikan.id
                }

                var dosis = 1;
                if ($scope.item.jenisKemasan.jeniskemasan == 'Racikan') {
                    dosis = $scope.item.dosis
                }

                if (!$scope.item.jenisKemasan) {
                    toastr.warning('Anda belum memilih Jenis Kemasan!');
                    return
                }

                if (!$scope.item.asal) {
                    toastr.warning('Anda belum mengisi Asal Produk!')
                    return;
                }

                if (!$scope.item.satuan) {
                    toastr.warning('Anda belum mengisi Satuan Produk!')
                    return;
                }

                if (!$scope.item.produk) {
                    toastr.warning('Anda belum mengisi Nama Produk!')
                    return;
                }

                if (!$scope.item.route) {
                    toastr.warning('Anda belum mengisi Route!')
                    return;
                }

                let obat = {
                    no: nomor,
                    noregistrasifk: norec_apd, //$scope.item.noRegistrasi,
                    tglregistrasi: moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
                    generik: null,
                    hargajual: String($scope.item.hargaSatuan),
                    jenisobatfk: jRacikan,
                    kelasfk: $scope.item.kelas.id,
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
                    jasa: $scope.item.jumlah === 0 ? 0 : 800
                }

                subTotal = subTotal + obat.total;
                $scope.item.totalSubTotal = subTotal.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                })
                Kosongkan();
                $scope.dataGrid.add(obat);
                gridResepDokter["status"] = "<span> &#10004;</span>"
                $('#gridResepDokter').data('kendoGrid').refresh();
                if ($scope.item.jenisKemasan.jeniskemasan === "Non Racikan") {
                    $scope.popupInputObat.close();
                }
                // $scope.getLengthObat();


            }

            $scope.tutupPopUpObat = function () {
                $scope.popupInputObat.close();
            }

            // let count = 0;            
            // $scope.getLengthObat = function () {
            //     count += 1;
            //     if(!$scope.racikan) {
            //         if (count >= $scope.listObatRacikan._data.length) {
            //             $scope.popupInputObat.close();
            //             count = 0;
            //             // return false;
            //         }
            //     } else {
            //         $scope.popupInputObat.close();
            //         count = 0;
            //         // return true
            //     }
            // }

            $scope.tesButton = function () {
                // kendoGrid.dataSource.options.data


                // $scope.selectedResep.status = "&#10004;";
            }

            $scope.klikGrid = function (dataSelected) {
                var dataProduk = [];
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
                $scope.item.produk = '';
                $scope.item.asal = '';
                $scope.item.satuan = '';
                $scope.item.nilaiKonversi = 0;
                $scope.item.stok = 0;
                $scope.item.jumlah = 0;
                $scope.item.dosis = 1;
                // $scope.item.jumlahxmakan = 1
                $scope.item.hargadiskon = 0;
                $scope.item.no = undefined;
                $scope.item.total = 0;
                $scope.item.hargaSatuan = 0;
                $scope.item.hargaNetto = 0;
                // $scope.item.aturanPakai=undefined;
                $scope.dataSelected = undefined;
            }

            $scope.batal = function () {
                Kosongkan();
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
                },
                {
                    command: [{
                        text: "Hapus",
                        width: "40px",
                        align: "center",
                        attributes: {
                            align: "center"
                        },
                        click: hapusObat,
                        imageClass: "k-i-arrow-60-right"
                    }],
                    title: "",
                    width: "5%",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                }
            ];

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            function hapusObat(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin menghapus Obat?')
                    // .textContent(`Anda akan menghapus data pegawai dengan nama ${dataItem}`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    // hapusDataPegawai(dataItem.idPegawai);
                    Kosongkan();
                    $scope.dataGrid.remove(dataItem);
                    console.warn('Masuk sini pak eko');
                }, function () {
                    console.error('Tidak jadi hapus');
                });
            }

            $scope.kembali = function () {
                //$state.go("TransaksiPelayananApotik")
                window.history.back();
            }

            $scope.simpan = function () {
                $scope.isRouteLoading = true;
                let isConfirm = $scope.item.ruangan.namaruangan === 'Farmasi 1';
                // $scope.isConsisDisabled = false;
                if ($scope.dataGrid._data.length === 0) {
                    $scope.isRouteLoading = false;
                    // $scope.isConsisDisabled = false;
                    toastr.info('Belum ada obat yang dimasukkan');
                    return;
                }
                manageLogistikPhp.getDataTableTransaksi("tatarekening/get-sudah-verif?noregistrasi=" +
                    $scope.item.noRegistrasi, true).then(function (dat) {
                    if (dat.data.status == true) {
                        alert('Sudah verifikasi Tatarekening Tidak Bisa hapus Obat!')
                        return;
                    }
                });
                if ($scope.item.penulisResep == undefined) {
                    // alert("Pilih Penulis Resep terlebih dahulu!!");
                    toastr.warning('Pilih Penulis Resep terlebih dahulu!!');
                    return
                }
                if (data2.length == 0 && $scope.dataGrid._data.length == 0) {
                    // alert("Pilih Produk terlebih dahulu!!");
                    toastr.warning('Pilih Produk terlebih dahulu!!');
                    return
                }
                for (var i = data2.length - 1; i >= 0; i--) {
                    if (data2[i].hargasatuan == 0) {
                        alert("Terdapat obat dengan harga kosong, kemungkinan stock kosong!!")
                        return
                    }

                }
                var strukresep = {
                    tglresep: moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss'),
                    pasienfk: norec_apd,
                    nocm: $scope.item.nocm,
                    namapasien: $scope.item.namaPasien,
                    penulisresepfk: $scope.item.penulisResep.id,
                    ruanganfk: $scope.item.ruangan.id,
                    noorder: noOrder,
                    status: strStatus,
                    norecResep: norecResep,
                    noresep: $scope.item.resep,
                    retur: '-',
                    isobatalkes: isPemakaianObatAlkes,
                    norec_so: norecResep
                }

                var objSave = {
                    strukresep: strukresep,
                    pelayananpasien: $scope.dataGrid._data //$scope.dataGrid._data
                }

                // $scope.tombolSimpanVis = false;
                manageLogistikPhp.postpelayananapotik(objSave).then(function (e) {
                    $scope.isConsisDisabled = false;
                    console.log(e.data);
                    $scope.item.resep = e.data.noresep.norec;
                    $scope.isRouteLoading = false;
                    $scope.onSave = true;

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
                    // Bridging Consis
                    // if ($scope.item.consisid != undefined) {
                    //     var objSave = {
                    //         strukresep: $scope.item.resep,
                    //         counterid: $scope.item.consisid
                    //     }
                    //     manageLogistikPhp.postbridgingconsisd(objSave).then(function (e) {
                    //     }, function (error) {
                    //         $scope.onSave = false;
                    //     })
                    // }
                    // //Bridging MiniR45
                    // var objSave =
                    // {
                    //     strukresep: $scope.item.resep
                    // }

                    // manageLogistikPhp.postbridgingminir45(objSave).then(function (e) {

                    // }, function (error) {
                    //     $scope.onSave = false;
                    // })

                    //#region logging
                    manageLogistikPhp.getDataTableTransaksi("logging/save-log-input-resep?norec_apd=" +
                        norec_apd +
                        "&penulisresepfk=" +
                        $scope.item.penulisResep.id +
                        "&ruanganfk=" +
                        $scope.item.ruangan.id +
                        "&tglresep=" +
                        moment($scope.item.tglAwal).format('YYYY-MM-DD hh:mm:ss')
                    ).then(function (data) {

                    }, function (error) {
                        $scope.onSave = false;
                    })
                    //#endregion

                    var stt = 'false'
                    if (confirm('View resep? ')) {
                        // Save it!
                        stt = 'true';
                    } else {
                        // Do nothing!
                        stt = 'false'
                    }
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=' + $scope.item.consisid + '&nores=' + e.data.noresep.norec + '&view=' + stt + '&user=' + pegawaiUser.namalengkap, function (response) {
                        //aadc=response;
                    });

                    // window.history.back();
                }, function (error) {
                    $scope.onSave = false;
                })
            }

            $scope.BridgingConsisD = function () {
                var confirm = prompt("Isi Nomor sesuai Jenis Pasien : BPJS, Umum dan Ranap", "3");
                var objSave = {
                    strukresep: $scope.item.resep,
                    counterid: confirm
                }

                manageLogistikPhp.saveconsisobatbebas(objSave).then(function (e) {

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
                    strukresep: $scope.dataSelected.resep,
                    rke: $scope.dataSelected.rke
                }

                manageLogistikPhp.postpost("bridging/save-mini-r45-rev-1", objSave).then(function (e) {

                })
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
                $scope.showInputObat = true;
                $scope.showRacikan = false;
                $scope.item.jenisKemasan = '';

                racikan = '';
            }

            $scope.hapus = function () {
                // if ($scope.item.jumlah == 0) {
                //     alert("Jumlah harus di isi!")
                //     return;
                // }
                // if ($scope.item.total == 0) {
                //     alert("Stok tidak ada harus di isi!")
                //     return;
                // }
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

            // $scope.hapusData = function () {
            //     Kosongkan();
            //     $scope.dataGrid.remove($scope.dataSelected);
            // }

            $scope.columnGridStok = [{
                    "field": "no",
                    "title": "No",
                    "width": "20px",
                },
                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": "100px",
                },
                {
                    "field": "qtyproduk",
                    "title": "Stok",
                    "width": "50px",
                }

            ];

            //***********************************

        }
    ]);
});