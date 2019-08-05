define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputResepApotikOrderRevCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper) {
            $scope.isRouteLoading = false;
            $scope.jumlahObat = 3;
            $scope.isResepEmpty = true;
            $scope.item = {};
            $scope.listHistoryResep = [];
            $scope.resep = {};
            $scope.listObat = [];
            $scope.tempListResep = [];
            $scope.listHistoryResep = [];
            $scope.listResep = [];
            let norec_apd = '';
            let norec_pd = '';
            let nocm_str = '';
            let dataProdukDetail = [];
            let noTerima = '';
            let data2 = [];
            let hrg1 = 0;
            let hrgsdk = 0;
            let diffDays = 1;
            $scope.listOfJenisResep = [
                {
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
                var chacePeriode = cacheHelper.get('InputResepApotikOrderRevCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.noMr = chacePeriode[0]
                    nocm_str = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    $scope.item.umur = chacePeriode[4]
                    $scope.item.kelompokPasien = chacePeriode[5]
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
                        });
                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true;
                    }
                }
            }

            var init = function () {
                $scope.item.tglResep = new Date();
                manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo", true).then(function (dat) {
                    $scope.listOfProduk = dat.data.produk;
                });
                $scope.item.idLogin = JSON.parse(localStorage.getItem('pegawai'));
                $scope.listObat = [
                    {
                        key: 1 + $scope.listObat.length,
                        namaObat: "",
                        satuan: "",
                        jumlah: ""

                    }
                ];
                if ($scope.tempListResep.length > 0) {
                    $scope.isResepEmpty = false;
                } else {
                    $scope.isResepEmpty = true;
                }
                // console.log(JSON.stringify($scope.tempListResep))
                $scope.listResep = new kendo.data.DataSource({
                    data: $scope.tempListResep,
                    pageSize: 5
                });
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

            $scope.getSatuan = function (data) {
                manageLogistikPhp.getDataTableTransaksi("logistik/get-info-stok?produkfk=" + data.id, true)
                    .then(function (e) { })
            }


            // untuk menambah obat racikan
            $scope.tambahObat = function () {
                var data = {
                    key: 1 + $scope.listObat.length,
                    namaObat: "",
                    satuan: "",
                    jumlah: ""
                }

                $scope.listObat.push(data);
            }

            $scope.hapusObat = function (index, item) {
                // $scope.listObat
                // console.log(item);
                let indexed = $scope.listObat.indexOf(item);
                $scope.listObat.splice(indexed, 1);
                console.log($scope.listObat);
                // let filtered = $scope.listObat.filter(function(item) {
                //     return item.key != index + 1
                // })
                // console.log(filtered);
            }

            // simpan ke temporary resep
            $scope.simpan = function (data) {
                var keteranganPenggunaan = '', intruksiPenggunaan = '', jumlah = '', isRacikan = false, pcs = 0;

                if (data === 2) {
                    if ($scope.item.intruksiPenggunaanRacikan == undefined || $scope.item.intruksiPenggunaanRacikan == '') {
                        toastr.warning('Harap isi Intruksi Pemakaian Obat');
                        return
                    }
                    keteranganPenggunaan = $scope.item.intruksiPenggunaanRacikan;
                    intruksiPenggunaan = `${$scope.resep.ketCaraPembuatan} ${$scope.resep.pcsObat} ${$scope.resep.kemasan}`;
                    isRacikan = true;
                    pcs = $scope.resep.pcsObat
                } else {
                    if ($scope.item.keterangan == undefined || $scope.item.keterangan == '') {
                        toastr.warning('Harap isi Keterangan');
                        return
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
                            namaObat: $scope.resep.namaObat,
                            jumlah: $scope.resep.jumlahObat,
                            jenisKemasan: isRacikan,
                            pieces: pcs,
                            satuanObat: {
                                satuanStandar: $scope.resep.satuanObat.satuanstandar,
                                ssid: $scope.resep.satuanObat.ssid
                            }
                        });
                    }
                } else {
                    for (var i = 0; i < $scope.listObat.length; i++) {
                        dataResep.resep.push({
                            namaObat: $scope.resep.namaObat[i],
                            jumlah: $scope.resep.jumlahDosis[i],
                            pieces: pcs,
                            jenisKemasan: isRacikan,
                            satuanObat: {
                                satuanStandar: $scope.resep.satuanObat[i].satuanstandar,
                                ssid: $scope.resep.satuanObat[i].ssid
                            }
                        });
                    }
                }
                $scope.tempListResep.push(dataResep);
                // console.log($scope.tempListResep)
                clear();
                init();
            }

            // clear out variable
            var clear = function () {
                $scope.item.keterangan = '';
                $scope.resep.namaObat = '';
                $scope.resep.jumlahObat = '';
                $scope.resep.satuanObat = '';
                $scope.resep.ketCaraPembuatan = '';
                $scope.resep.jumlahDosis = '';
                $scope.resep.pcsObat = '';
                $scope.resep.kemasan = '';
                $scope.item.intruksiPenggunaanRacikan = '';
                $scope.item.intruksiPenggunaan = '';
            }

            $scope.getSatuan = function (data) {
                // console.log(data);
                $scope.listSatuan = data.konversisatuan;
            }

            // method untuk kirim resep ke farmasi
            $scope.kirimKeFarmasi = function () {
                // console.log($scope.tempListResep)
                let gridResep = $scope.tempListResep;
                let dataResep = [];
                let dataTemp = [{
                    "strukorder": {
                        "tglresep": moment($scope.item.tglResep).format('YYYY-MM-DD HH:mm:ss'),
                        "penulisresepfk": $scope.item.idLogin.id,
                        "ruanganfk": $scope.item.idRuangan,
                        "noregistrasifk": norec_apd
                    },
                    "orderfarmasi": [],
                    "resepdokter": []
                }]
                for (let i = 0; i < gridResep.length; i++) {
                    // let dataTemp = {
                    //     "strukorder": {
                    //         "tglresep": moment($scope.item.tglResep).format('YYYY-MM-DD HH:mm:ss'),
                    //         "penulisresepfk": $scope.item.idLogin.id,
                    //         "ruanganfk": $scope.item.idRuangan,
                    //         "noregistrasifk": norec_apd
                    //     },
                    //     "orderfarmasi": []
                    // }
                    for (let ii = 0; ii < gridResep[i].resep.length; ii++) {
                        let dataTempResep = {
                            "jeniskemasanfk": gridResep[i].resep[ii].jenisKemasan ? 1 : 2,
                            "pcs": parseInt(gridResep[i].resep[ii].pieces),
                            "ruanganfk": $scope.item.idRuangan,
                            "produkfk": gridResep[i].resep[ii].namaObat.id,
                            "jumlah": parseInt(gridResep[i].resep[ii].jumlah),
                            "satuanstandarfk": gridResep[i].resep[ii].satuanObat.ssid,
                            "satuanstandar": gridResep[i].resep[ii].satuanObat.satuanStandar,
                            "satuanviewfk": gridResep[i].resep[ii].satuanObat.ssid,
                            "satuanview": gridResep[i].resep[ii].satuanObat.satuanStandar,
                            "keterangan": gridResep[i].keterangan
                        };
                        dataTemp[0]['orderfarmasi'].push(dataTempResep);
                        dataTemp[0]["resepdokter"].push(
                            {
                                "produkfk": gridResep[i].resep[ii].namaObat.id,
                                "jumlah": parseInt(gridResep[i].resep[ii].jumlah),
                                "satuanstandarfk": gridResep[i].resep[ii].satuanObat.ssid,
                                "jeniskemasanfk": gridResep[i].resep[ii].jenisKemasan ? 1 : 2,
                                "keteranganlainnya": gridResep[i].intruksi ? gridResep[i].intruksi : "-",
                                "keteranganpakai": gridResep[i].keterangan,
                                "satuanview": gridResep[i].resep[ii].satuanObat.satuanStandar
                            }
                        );
                    }
                }
                dataResep.push(dataTemp[0]);
                manageLogistikPhp.postpost('farmasi/resep-dokter?strukorder=' + norec_apd, dataResep).then(function (res) {
                    $scope.tempListResep = [];
                    dataResep = [];
                    $scope.isResepEmpty = true;
                })
            }

            // 
            $scope.columnHistoryResep = {
                pageable: true,
                columns: [
                    {
                        field: "tglorder",
                        title: "<h3>Tanggal</h3>", width: "100px",
                    },
                    {
                        field: "namalengkap",
                        title: "<h3>Dokter</h3>", width: "100px",
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
                        width: "2%",
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
                $scope.popDetailResep.center().open();
                manageLogistikPhp.getDataTableTransaksi('rekam-medis/get-resep-dokter-detail?strukorder=' + dataItem.norec).then(res => {
                    $scope.dataDetailResep = res.data.data;
                    console.log($scope.dataDetailResep)
                    let dataTemp = [];
                    // for(let i = 0; i < $scope.dataDetailResep.length; i++) {
                    //     let dataTempObat = [];
                    //     for(let ii = 0; i < $scope.dataDetailResep[i].obat.length; ii++) {
                    //         if($scope.dataDetailResep[i].obat[ii]){
                    //             if($scope.dataDetailResep[i].obat[ii].keteranganpakai === $scope.dataDetailResep[i].obat[ii + 1].keteranganpakai) {
                    //                 dataTempObat.push($scope.dataDetailResep[i].obat[ii])
                    //             } 
                    //         }

                    //     }
                    //     dataTemp.push(dataTempObat);
                    // }
                    // console.log(dataTemo);
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


            // method untuk event ketika tab berubah
            $scope.onChangeTab = function (data) {
                if (data === 2) {
                    getHistoryResep();
                }
            }

        }
    ]);
});

