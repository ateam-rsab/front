define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputResepApotikCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper) {
            $scope.item = {};
            // $scope.resepd = {};
            $scope.now = new Date();
            $scope.item.rke = 1;
            $scope.showInputObat = true
            $scope.showRacikan = false
            $scope.isRouteLoading = false;
            $scope.tombolSimpanVis = true
            $scope.disabledRuangan = false;
            $scope.statusConsis = false;
            $scope.dataResepDokter = [];
            $scope.listResepVerifikasi = new kendo.data.DataSource({
                data: [],
                pageSize: 5
            })
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
            var isPemakaianObatAlkes = false;

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
                var chacePeriode = cacheHelper.get('InputResepApotik');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.nocm = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noRegistrasi = chacePeriode[3]

                    $scope.item.umur = chacePeriode[4]

                    $scope.listKelas = ([{ id: chacePeriode[5], namakelas: chacePeriode[6] }])
                    $scope.item.kelas = { id: chacePeriode[5], namakelas: chacePeriode[6] }
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

                    init()
                } else {

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
                });
                manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo", true).then(function (dat) {
                    $scope.listOfProduk = dat.data.produk;
                    // for (let i = 0; i < dat.data.produk.length; i++) {
                    //     dataTemp.push(dat.data.produk[i].namaproduk);
                    // }
                    
                });
                manageLogistikPhp.getDataTableTransaksi('rekam-medis/get-resep-dokter-detail?strukorder=' + norecResep).then(res => {
                    $scope.dataDetailResep = res.data.data;
                    // var dataTemp = [];
                    let data = [];
                    for(let i = 0; i < res.data.data.length; i++) {
                        for(let ii = 0; ii < res.data.data[i].obat.length; ii++) { 
                            let dataTemp = {
                                resep:res.data.data[i].resep,
                                keteranganlainnya: res.data.data[i].obat[ii].keteranganlainnya,
                                keteranganpakai: res.data.data[i].obat[ii].keteranganpakai,
                                namaobat: res.data.data[i].obat[ii].namaobat,
                                objectprodukfk: res.data.data[i].obat[ii].objectprodukfk,
                                qtyproduk: res.data.data[i].obat[ii].qtyproduk,
                                satuanview: res.data.data[i].obat[ii].satuanview,
                            }
                            data.push(dataTemp);

                        }
                    }
                    $scope.listResepDokter = new kendo.data.DataSource({
                        data:data,
                        pageSize: 10
                    });
                   
                });


                $scope.columnResepDokter = {
                    pageable: true,
                    columns: [
                        {
                            field: "resep",
                            title: "<h3>r/Ke</h3>", width: "20px",
                        },
                        {
                            field: "namaobat",
                            title: "<h3>Nama Obat</h3>", width: "100px",
                        },
                        // {
                        //     field: "keteranganlainnya",
                        //     title: "<h3>Instruksi Racikan</h3>", width: "100px",
                        // },
                        // {
                        //     field: "keteranganpakai",
                        //     title: "<h3>Keterangan Pakai</h3>", width: "100px",
                        // },
                        {
                            command: [{
                                text: "Detail",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: inputObat,
                                imageClass: "k-icon k-i-pencil"
                            }],
                            title: "",
                            width: "10%",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        }
                    ],
                }

                $scope.columnConvertFarmasi = {
                    pageable: true,
                    columns: [
                        {
                            field: "resep",
                            title: "<h3>Resep</h3>", width: "20px",
                        },
                        {
                            field: "namaobat",
                            title: "<h3>Nama Obat</h3>", width: "100px",
                        },
                        {
                            command: [{
                                text: "Input",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                // click: inputObat,
                                imageClass: "k-icon k-i-pencil"
                            }],
                            title: "",
                            width: "10%",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        }
                    ],
                }
            }

            function inputObat(e) {
                e.preventDefault();
                let dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item = {
                    resep: dataItem.resep,
                    namaobat: dataItem.namaobat,
                    qtyproduk: dataItem.qtyproduk,
                    keteranganpakai: dataItem.keteranganpakai,
                    keteranganlainnya: dataItem.keteranganlainnya,
                };

                $scope.resep = {
                    resep: dataItem.resep,
                    namaObat: {
                        namaproduk:$scope.item.namaobat
                    },
                    jumlahObat: $scope.item.qtyproduk,
                    keteranganPakai: $scope.item.keteranganpakai,
                    InstruksiPeracikan: $scope.item.keteranganlainnya,

                }
                $scope.popupInputObat.center().open();
                // console.log(dataItem)
                
                console.log($scope.item)
            }

            $scope.verifikasiObat = function () {
                let dataTemp = [];
                let data = {
                    resep: $scope.resep.resep,
                    namaobat: $scope.resep.namaObat.namaproduk,
                    idObat: $scope.resep.namaObat.id,
                    qtyproduk: $scope.resep.jumlahObat,
                    keteranganpakai: $scope.resep.keteranganPakai,
                    keteranganlainnya: $scope.resep.InstruksiPeracikan,
                }
                dataTemp.push(data);
                $scope.listResepVerifikasi.add(data);
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
                                    fields: {
                                    }
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
                    $scope.listSatuan = ([{ ssid: $scope.item.produk.ssid, satuanstandar: $scope.item.produk.satuanstandar }])
                }
                $scope.item.satuan = { ssid: $scope.item.produk.ssid, satuanstandar: $scope.item.produk.satuanstandar }
                $scope.item.nilaiKonversi = 1// $scope.item.satuan.nilaikonversi
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
                            $scope.item.satuan = { ssid: $scope.dataSelected.satuanviewfk, satuanstandar: $scope.dataSelected.satuanview }
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
                        $scope.item.jumlah = 0//parseFloat($scope.item.jumlah) / parseFloat(newValue)
                        $scope.item.hargaSatuan = 0//hrg1 * parseFloat(newValue)
                        $scope.item.hargadiskon = 0//hrgsdk * parseFloat(newValue)
                        $scope.item.hargaNetto = 0
                        $scope.item.total = 0// parseFloat(newValue) * 
                        // (hrg1-hrgsdk)
                        // $scope.item.jumlahxmakan =1
                        // $scope.item.dosis =1
                    }
                }
            });

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.kembali = function () {
                window.history.back();
            }


        }
    ]);
});
