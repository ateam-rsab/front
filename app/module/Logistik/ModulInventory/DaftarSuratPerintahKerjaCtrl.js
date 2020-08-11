define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarSuratPerintahKerjaCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper', 'ModelItemAkuntansi',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper, modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading = false;
            $scope.button = false
            var pegawaiUser = {}
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();

            function LoadCache() {
                var chacePeriode = cacheHelper.get('DaftarSuratPerintahKerjaCtrl');
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
                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function (data) {
                    $scope.listNamaBarang = data;
                });
                // manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                //     pegawaiUser = dat.data.datalogin
                // });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            $scope.Tambah = function () {
                $state.go('UsulanPelaksanaanKegiatan')
            }

            function init() {
                $scope.isRouteLoading = true;

                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("upk/get-daftar-usulan-terupk?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    "&nostruk=" + ($scope.item.struk ? $scope.item.struk : "") +
                    "&nofaktur=" + ($scope.item.nofaktur ? $scope.item.nofaktur : "") +
                    "&namarekanan=" + ($scope.item.namarekanan ? $scope.item.namarekanan : "") +
                    "&produkfk=" + ($scope.item.namaBarang ? $scope.item.namaBarang.id : ""), true).then(function (dat) {
                    $scope.isRouteLoading = false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i + 1
                        // var tanggal = $scope.now;
                        // var tanggalLahir = new Date(dat.data.daftar[i].tgllahir);
                        // var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                        // dat.data.daftar[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                        //itungUsia(dat.data[i].tgllahir)
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data.daftar
                    })
                    pegawaiUser = dat.data.datalogin
                });

                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir,
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('DaftarSuratPerintahKerjaCtrl', chacePeriode);


            }
            $scope.getRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function () {

                init();
            }

            $scope.newSPPB = function () {
                if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }

                if(!$scope.dataSelected.noverifikasi) {
                    toastr.warning('Data belum dikonfirmasi');
                    return;
                }
                // if ($scope.dataSelected.noorderhps == undefined) {
                //     alert("Data Belum Diverifikasi HPS!")
                //     return;
                // }
                debugger;
                var chacePeriode = {
                    0: $scope.dataSelected.norec,
                    1: 'EditOrder',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('OrderBarangSPPBCtrl', chacePeriode);
                $state.go('OrderBarangSPPB', {
                    norec: $scope.dataSelected.norec,
                    noOrder: 'EditOrder'
                });
                // $state.go('OrderBarangSPPB')
            }

            // $scope.TransaksiPelayanan = function(){
            //     debugger;
            //     var arrStr ={ 0 : $scope.dataSelected.nocm ,
            //         1 : $scope.dataSelected.namapasien,
            //         2 : $scope.dataSelected.jeniskelamin,
            //         3 : $scope.dataSelected.noregistrasi, 
            //         4 : $scope.dataSelected.umur,
            //         5 : $scope.dataSelected.klid,
            //         6 : $scope.dataSelected.namakelas,
            //         7 : $scope.dataSelected.tglregistrasi,
            //         8 : $scope.dataSelected.norec_apd,
            //         9 : 'resep'
            //     }
            //     cacheHelper.set('TransaksiPelayananApotikCtrl', arrStr);
            //     $state.go('TransaksiPelayananApotik')

            //     var arrStr2 ={ 0 : $scope.dataSelected.norec 
            //     }
            //     cacheHelper.set('DaftarResepCtrl', arrStr2);
            //     $state.go('DaftarResepCtrl')
            // }

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
                if (confirm('View Bukti UPK? ')) {
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
                // var stt = 'false'
                // if (confirm('View Bukti UPK? ')) {
                //     // Save it!
                //     stt='true';
                // } else {
                //     // Do nothing!
                //     stt='false'
                // }
                // var client = new HttpClient();
                // client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpelaksanaankegiatan=1&nores='+$scope.dataSelected.norec+'&view='+stt, function(response) {
                //     //aadc=response;
                // });

                if (!$scope.dataSelected) {
                    toastr.info('Anda belum memilih data untuk di cetak');
                    return;
                }

                window.open('http://192.168.12.4:7777/service-reporting/lap-upk/nores=' + $scope.dataSelected.norec);
            }

            $scope.pph = function () {
                if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }

                // if ($scope.dataSelected.noorderhps != undefined) {
                //     alert("Data Sudah Diverifikasi HPS!")
                //     return;
                // }

                var chacePeriode = {
                    0: $scope.dataSelected.norec,
                    1: 'EditTerima',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('PenentuanPpndanPphCtrl', chacePeriode);
                $state.go('PenentuanPpndanPph')
            }

            $scope.EditTerima = function () {
                if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }

                // if(!$scope.dataSelected.noverifikasi) {
                //     toastr.warning('Data belum dikonfirmasi');
                //     return;
                // }
                // if ($scope.dataSelected.noorderhps == undefined) {
                //     alert("Data Belum Diverifikasi HPS!")
                //     return;
                // }
                // var chacePeriode ={ 0 : $scope.dataSelected.norec,
                //     1 : 'EditTerima',
                //     2 : '',
                //     3 : '', 
                //     4 : '',
                //     5 : '',
                //     6 : ''
                // }
                // cacheHelper.set('UsulanPelaksanaanKegiatanCtrl', chacePeriode);
                // $state.go('UsulanPelaksanaanKegiatan')
                // cacheHelper.set('InputSPKBaruCtrl', chacePeriode);
                // $state.go('InputSPKBaru', {
                // norec: $scope.dataSelected.norec,
                // noOrder:'EditTerima'
                // });
                // $state.go('KegiatanSPK')
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
                $state.go('EditKegiatanSPK', {
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
                    "title": "No",
                    "width": "35px",
                },
                {
                    "field": "tglorder",
                    "title": "Tgl Usulan",
                    "width": "80px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglorder #', '')}}</span>"
                },
                {
                    "field": "tglkebutuhan",
                    "title": "Tgl Kebutuhan",
                    "width": "80px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
                },
                {
                    "field": "noorder",
                    "title": "No Usulan",
                    "width": "100px",
                },
                {
                    "field": "keterangan",
                    "title": "Jenis Usulan",
                    "width": "120px",
                },
                {
                    "field": "koordinator",
                    "title": "Koordinator Barang",
                    "width": "60px",
                },
                {
                    "field": "ruangan",
                    "title": "Unit Pengusul",
                    "width": "120px",
                },
                {
                    "field": "ruangantujuan",
                    "title": "Unit Tujuan",
                    "width": "120px",
                },
                {
                    "field": "penanggungjawab",
                    "title": "Penanggung Jawab",
                    "width": "100px",
                },
                {
                    "field": "mengetahui",
                    "title": "Mengetahui",
                    "width": "100px",
                },
                {
                    "field": "noverifikasi",
                    "title": "No Confirm",
                    "width": "100px",
                    // "template": '# if( noverifikasi==null) {#<span class="center">-<span># } #',

                },
                {
                    "field": "noorderhps",
                    "title": "No Confirm HPS",
                    "width": "100px",
                    // "template": '# if( noverifikasi==null) {#<span class="center">-<span># } #',

                },
                {
                    "field": "tglverifikasi",
                    "title": "Tgl Verifikasi",
                    "width": "100px",
                    "template": '# if( tglverifikasi==null) {#<span class="center">-<span># } else {#<span>#= kendo.toString(new Date(tglverifikasi), "dd-MM-yyyy HH:mm") #<span>#} #',
                    // "template": "<span class='style-right'>{{formatTanggal('#: tglverifikasi #', '')}}</span>"
                }
            ];

            $scope.gridOption = {
                toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }

                ],
                pageable: true,
                scrollable: true,
                columns: $scope.columnGrid
            }

            $scope.exportExcel = function () {
                var tempDataExport = [];
                var rows = [{
                    cells: [{
                            value: "Tanggal Usulan"
                        },
                        {
                            value: "Tanggal Kebutuhan"
                        },
                        {
                            value: "No. Usulan"
                        },
                        {
                            value: "Jenis Usulan"
                        },
                        {
                            value: "Koordinator Barang"
                        },
                        {
                            value: "Unit Pengusul"
                        },
                        {
                            value: "Unit Tujuan"
                        },
                        {
                            value: "Penanggung Jawab"
                        },
                        {
                            value: "Mengetahui"
                        },
                        {
                            value: "No. Confirm"
                        },
                        {
                            value: "No. Confirm HPS"
                        },
                        {
                            value: "Status Bayar"
                        },
                        {
                            value: "Tanggal Verifikasi"
                        }
                    ]
                }];

                tempDataExport = $scope.dataGrid;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                    value: data[i].tglorder
                                },
                                {
                                    value: data[i].tglkebutuhan
                                },
                                {
                                    value: data[i].noorder
                                },
                                {
                                    value: data[i].keterangan
                                },
                                {
                                    value: data[i].koordinator
                                },
                                {
                                    value: data[i].ruangan
                                },
                                {
                                    value: data[i].ruangantujuan
                                },
                                {
                                    value: data[i].penanggungjawab
                                },
                                {
                                    value: data[i].mengetahui
                                },
                                {
                                    value: data[i].noverifikasi
                                },
                                {
                                    value: data[i].noorderhps
                                },
                                {
                                    value: data[i].tglverifikasi
                                }
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            freezePane: {
                                rowSplit: 1
                            },
                            columns: [
                                // Column settings (width)
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                }
                            ],
                            // Title of the sheet
                            title: "Daftar Verifikasi Tagihan Rekanan",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "daftar-verifikasi-tagihan-rekanan.xlsx"
                    });
                });
            };

            $scope.data2 = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [{
                            "field": "tglkebutuhan",
                            "title": " Kebutuhan",
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
                            "field": "qtyproduk",
                            "title": "Qty",
                            "width": "20px",
                        },
                        {
                            "field": "qtyprodukkonfirmasi",
                            "title": "Qty Confirm",
                            "width": "40px",
                        },
                        {
                            "field": "hargasatuan",
                            "title": "Harga Satuan",
                            "width": "40px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                        },
                        {
                            "field": "total",
                            "title": "Total",
                            "width": "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                        },
                        {
                            "field": "hargasatuanquo",
                            "title": "Harga Konfirmasi",
                            "width": "40px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuanquo #', '')}}</span>"
                        },
                        {
                            "field": "hargappnquo",
                            "title": "ppn Konfirmasi",
                            "width": "40px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargappnquo #', '')}}</span>"
                        },
                        {
                            "field": "hargadiscountquo",
                            "title": "Diskon Konfirmasi",
                            "width": "40px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargadiscountquo #', '')}}</span>"
                        },
                        {
                            "field": "totalkonfirmasi",
                            "title": "Total Confirm",
                            "width": "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: totalkonfirmasi #', '')}}</span>"
                        }
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

            function itungUsia(tgl) {
                debugger;
                // var tg = parseInt(form.elements[0].value);
                // var bl = parseInt(form.elements[1].value);
                // var th = parseInt(form.elements[2].value);
                var tanggal = $scope.now;
                var tglLahir = new Date(tgl);
                var selisih = Date.parse(tanggal.toGMTString()) - Date.parse(tglLahir.toGMTString());
                var thn = Math.round(selisih / (1000 * 60 * 60 * 24 * 365));
                //var bln = Math.round((selisih % 365)/(1000*60*60*24));
                return thn + ' thn ' // + bln + ' bln'
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
            //***********************************

        }
    ]);
});