define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPengajuanPengadaanBarangPengendaliRevCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper', 'ModelItemAkuntansi',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper, modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading = false;
            var pegawaiUser = '';
            var idpegawai = '';
            $scope.item.KelompokUserId = 0;
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            var norecAjukan = '';
            LoadCache();
            loadCombo();

            function LoadCache() {
                var chacePeriode = cacheHelper.get('DaftarPengajuanPengadaanBarangPengendaliCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.tglAwal = new Date(chacePeriode[0]);
                    $scope.item.tglAkhir = new Date(chacePeriode[1]);
                    init();
                } else {
                    $scope.item.tglAwal = $scope.now;
                    $scope.item.tglAkhir = $scope.now;
                    init();
                }
            }

            function loadCombo() {
                $scope.listStatus = [{
                    id: 1,
                    status: 'Disetujui'
                }, {
                    id: 2,
                    status: 'Tidak Disetujui'
                }]
                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function (data) {
                    $scope.listNamaBarang = data;
                });
                modelItemAkuntansi.getDataDummyPHP("upk/ruangan/get-data-combo-pegawai-part", true, true, 20).then(function (data) {
                    $scope.listPegawaiMenyetujui = data;
                })
                manageLogistikPhp.getDataTableTransaksi("usulan-permintaan/ruangan/get-data-combo", true).then(function (dat) {
                    pegawaiUser = dat.data.login[0].objectkelompokuserfk
                    idpegawai = dat.data.login[0].id
                    // $scope.item.KelompokUserId = pegawaiUser;
                    if (pegawaiUser == 27) {
                        $scope.button1 = true;
                        $scope.button = false;
                        init();
                    } else if (pegawaiUser == 24) {
                        $scope.button1 = false;
                        $scope.button = true;
                        init();
                    } else {
                        $scope.button1 = false;
                        $scope.button = false;
                    }
                });
            }
            $scope.Tambah = function () {
                $state.go('UsulanPelaksanaanKegiatan')
            }

            function init() {
                $scope.isRouteLoading = true;
                
                var produkfk = ""
                if ($scope.item.namaBarang != undefined) {
                    var produkfk = "&produkfk=" + $scope.item.namaBarang.id
                }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("upk/get-daftar-upk?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    "&nostruk=" + $scope.item.struk +
                    "&nofaktur=" + $scope.item.nofaktur +
                    "&namarekanan=" + $scope.item.namarekanan +
                    "&produkfk=" + ($scope.item.namaBarang ? $scope.item.namaBarang.id : ""), true).then(function (dat) {
                    $scope.isRouteLoading = false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i + 1
                    }
                    
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data.daftar,
                        pageSize: 10
                    })

                    pegawaiUser = dat.data.datalogin
                });
            }
            $scope.getRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function () {
                init();
            }
            
            $scope.buatUPK = function () {
                if (!$scope.dataSelected) {
                    alert("Data Belum Dipilih!")
                    return;
                }
                
                localStorage.setItem('dataUPK', JSON.stringify($scope.dataSelected));
                $state.go('UsulanPelaksanaanKegiatanRev')
            }

            $scope.CetakRincian = function () {
                var stt = 'false'
                if (confirm('View resep? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-rincian-penerimaan=1&nores=' + $scope.dataSelected.norec + '&view=' + stt + '&user=' + pegawaiUser.userData.namauser, function (response) {
                    //aadc=response;
                });
            }
            $scope.CetakBukti = function () {
                var stt = 'false'
                if (confirm('View Bukti Penerimaan? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-penerimaan=1&nores=' + $scope.dataSelected.norec + '&view=' + stt + '&user=' + pegawaiUser.userData.namauser, function (response) {
                    //aadc=response;
                });
            }
            $scope.Cetak = function () {
                var stt = 'false'
                if (confirm('View Bukti Penerimaan? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpelaksanaankegiatan=1&nores=' + $scope.dataSelected.norec + '&view=' + stt, function (response) {
                    //aadc=response;
                });
            }
            
            $scope.LihatUsulan = function () {

                if (!$scope.dataSelected) {
                    alert("Data Belum Dipilih!")
                    return;
                }

                manageLogistikPhp.getDataTableTransaksi("upk/get-rincian-verifikasi?" + "noKonfirmasi=" + $scope.dataSelected.nokonfirmasi, true).then(function (dat) {
                    var datas = dat.data.data[0];
                    $scope.item.tglVerifikasi = moment(datas.tglkonfirmasi).format('DD-MM-YYYY HH:mm');
                    $scope.item.PegawaiMenyetujui = {
                        id: datas.objectpegawaifk,
                        namalengkap: datas.namalengkap
                    };
                    if (datas.status == 2) {
                        $scope.item.Status = {
                            id: 2,
                            status: 'Tidak Disetujui'
                        };
                    } else if (datas.status == 1) {
                        $scope.item.Status = {
                            id: 1,
                            status: 'Disetujui'
                        };
                    }
                    $scope.item.Keterangan = datas.keterangan;
                    norecAjukan = $scope.dataSelected.norec
                    $scope.PopUpVerifikasi.center().open();
                });
            }

            $scope.AjukanLagi = function () {
                if ($scope.item.Status.id == 1) {
                    alert("Data Sudah Disetujui!!!")
                    return;
                }

                var chacePeriode = {
                    0: norecAjukan,
                    1: 'AjukanKembali',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('UsulanPermintaanBarangJasaRuanganCtrl', chacePeriode);
                $state.go('UsulanPermintaanBarangJasaRuangan')
            }

            $scope.Batal1 = function () {
                $scope.item.tglVerifikasi = '';
                $scope.item.PegawaiMenyetujui = undefined;
                $scope.item.Status = undefined;
                $scope.item.Keterangan = undefined;
                $scope.PopUpVerifikasi.close();
            }

            $scope.EditTerima = function () {
                if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }
                if ($scope.dataSelected.noorderhps == undefined) {
                    alert("Data Belum Diverifikasi HPS!")
                    return;
                }

                var chacePeriode = {
                    0: $scope.dataSelected.norec,
                    1: 'EditTerima',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                // cacheHelper.set('UsulanPelaksanaanKegiatanCtrl', chacePeriode);
                // $state.go('UsulanPelaksanaanKegiatan')
                cacheHelper.set('KegiatanSPKCtrl', chacePeriode);
                $state.go('KegiatanSPK', {
                    norec: $scope.dataSelected.norec,
                    noOrder: 'EditTerima'
                });
                // $state.go('KegiatanSPK')
            }

            $scope.HapusPenerimaan = function () {
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }
                if ($scope.dataSelected.nosbm != undefined) {
                    alert("Sudah di bayar tidak dapat di hapus!!")
                    return;
                }
                var stt = 'false'
                if (confirm('Hapus Penerimaan? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    return;
                }
                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/delete-terima-barang-suplier?" + "norec_sp=" + $scope.dataSelected.norec, true).then(function (dat) {
                    init()
                });
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }


            $scope.columnGrid = [{
                    "field": "no",
                    "title": "<h3>No</h3>",
                    "width": "50px",
                },
                {
                    "field": "tglorder",
                    "title": "<h3>Tanggal Usulan</h3>",
                    "width": "90px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglorder #', '')}}</span>"
                },
                {
                    "field": "tglkebutuhan",
                    "title": "<h3>Tanggal Kebutuhan</h3>",
                    "width": "90px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
                },
                {
                    "field": "noorder",
                    "title": "<h3>No Usulan</h3>",
                    "width": "150px",
                },
                {
                    "field": "keterangan",
                    "title": "<h3>Jenis Usulan</h3>",
                    "width": "200px",
                },
                {
                    "field": "koordinator",
                    "title": "<h3>Koordinator Barang</h3>",
                    "width": "150px",
                },
                {
                    "field": "ruangan",
                    "title": "<h3>Unit Pengusul</h3>",
                    "width": "200px",
                },
                {
                    "field": "ruangantujuan",
                    "title": "<h3>Unit Tujuan</h3>",
                    "width": "200px",
                },
                {
                    "field": "penanggungjawab",
                    "title": "<h3>Penanggung Jawab</h3>",
                    "width": "200px",
                },
                {
                    "field": "mengetahui",
                    "title": "<h3>Mengetahui</h3>",
                    "width": "200px",
                },
            ];
            $scope.data2 = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [{
                            "field": "tglkebutuhan",
                            "title": "Tanggal Kebutuhan",
                            "width": "50px",
                            "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
                        },
                        {
                            "field": "prid",
                            "title": "Kode Produk",
                            "width": "40px",
                        },
                        {
                            "field": "namaproduk",
                            "title": "Nama Produk",
                            "width": "90px",
                        },
                        {
                            "field": "spesifikasi",
                            "title": "Spesifikasi",
                            "width": "100px",
                        },
                        {
                            "field": "satuanstandar",
                            "title": "Satuan",
                            "width": "30px",
                        },
                        {
                            "field": "qtyusulan",
                            "title": "Qty Usulan",
                            "width": "30px",
                        },
                        {
                            "field": "qtyupk",
                            "title": "Qty UPK",
                            "width": "30px",
                        },
                        {
                            "field": "qtyspk",
                            "title": "Qty SPK",
                            "width": "30px",
                        },
                        {
                            "field": "hargausulan",
                            "title": "Harga Usulan",
                            "width": "30px",
                        },
                        {
                            "field": "hargaupk",
                            "title": "Harga UPK",
                            "width": "30px",
                        },
                        {
                            "field": "hargaspk",
                            "title": "Harga SPK",
                            "width": "30px",
                        }
                        // {
                        //     "field": "total",
                        //     "title": "Total",
                        //     "width": "50px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                        // },
                        // {
                        //     "field": "hargasatuanquo",
                        //     "title": "Harga Konfirmasi",
                        //     "width": "40px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: hargasatuanquo #', '')}}</span>"
                        // },
                        // {
                        //     "field": "hargappnquo",
                        //     "title": "ppn Konfirmasi",
                        //     "width": "40px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: hargappnquo #', '')}}</span>"
                        // },
                        // {
                        //     "field": "hargadiscountquo",
                        //     "title": "Diskon Konfirmasi",
                        //     "width": "40px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: hargadiscountquo #', '')}}</span>"
                        // },
                        // {
                        //     "field": "totalkonfirmasi",
                        //     "title": "Total Confirm",
                        //     "width": "50px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: totalkonfirmasi #', '')}}</span>"
                        // }
                    ]
                }
            };
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
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD/MM/YYYY');
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

            $scope.Cetak = function () {
                var stt = 'false'
                if (confirm('View Bukti UPK? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpelaksanaankegiatan=1&nores=' + $scope.dataSelected.norec + '&view=' + stt, function (response) {

                });
            }

        }
    ]);
});