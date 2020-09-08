define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarMonitoringUsulanCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper', 'ModelItemAkuntansi',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper, modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading = false;
            var pegawaiUser = {}
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();

            function LoadCache() {
                var chacePeriode = cacheHelper.get('DaftarMonitoringUsulanCtrl');
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
                localStorage.removeItem('dataUsulan');
                $state.go('UsulanPermintaanBarangJasaRuangan')
            }

            function init() {
                $scope.isRouteLoading = true;
                var ins = ""
                if ($scope.item.instalasi != undefined) {
                    var ins = "&dpid=" + $scope.item.instalasi.id
                }
                var rg = ""
                if ($scope.item.ruangan != undefined) {
                    var rg = "&ruid=" + $scope.item.ruangan.id
                }
                var produkfk = ""
                if ($scope.item.namaBarang != undefined) {
                    var produkfk = "&produkfk=" + $scope.item.namaBarang.id
                }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("data/get-monitoring?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    "&nostruk=" + $scope.item.struk +
                    "&nofaktur=" + $scope.item.nofaktur +
                    "&namarekanan=" + $scope.item.namarekanan +
                    produkfk, true).then(function (dat) {
                    $scope.isRouteLoading = false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i + 1
                        dat.data.daftar[i].tglorder = dateHelper.formatDate(dat.data.daftar[i].tglorder, 'DD-MM-YYYY')
                        dat.data.daftar[i].tglkebutuhan = dateHelper.formatDate(dat.data.daftar[i].tglkebutuhan, 'DD-MM-YYYY')
                        // 
                        dat.data.daftar[i].noverifikasi = dat.data.daftar[i].noverifikasi ? dat.data.daftar[i].noverifikasi : "-";
                        dat.data.daftar[i].tglverifikasi = dat.data.daftar[i].tglverifikasi ? dateHelper.formatDate(dat.data.daftar[i].tglverifikasi, 'DD-MM-YYYY') : "-";
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data.daftar,
                        pageSize: 20
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

            $scope.newUPK = function () {
                var chacePeriode = {
                    0: $scope.dataSelected.norec,
                    1: 'EditTerima',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('UsulanPelaksanaanKegiatanCtrl', chacePeriode);
                $state.go('UsulanPelaksanaanKegiatan')
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
            $scope.CetakBuktiLayanan = function () {
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
            $scope.Cetak = function () {
                var stt = 'false'
                if (confirm('View Bukti Usulan? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpermintaanbarang=1&nores=' + $scope.dataSelected.norec + '&view=' + stt, function (response) {
                    //aadc=response;
                });
            }

            $scope.EditTerima = function () {
                if (!$scope.dataSelected) {
                    toastr.warning("Harap pilih data terlebih dahulu", "Perhatian")
                }
                if ($scope.dataSelected.noverifikasi !== "-") {
                    toastr.warning("Tidak Bisa Ubah Usulan", "Usulan Sudah di Verifikasi")
                    return;
                }

                // var chacePeriode = {
                //     0: $scope.dataSelected.norec,
                //     1: 'EditTerima',
                //     2: '',
                //     3: '',
                //     4: '',
                //     5: '',
                //     6: ''
                // }
                // cacheHelper.set('UsulanPermintaanBarangJasaRuanganCtrl', chacePeriode);
                let dataUsulan = {
                    noreUsulan: $scope.dataSelected.norec,
                    jenisOrder: "Edit",
                }
                localStorage.setItem('dataUsulan', JSON.stringify(dataUsulan));
                $state.go('UsulanPermintaanBarangJasaRuangan')
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
                    "width": "40px",
                },
                {
                    "field": "tglorder",
                    "title": "Tanggal<br>Usulan",
                    "width": "100px",
                    // "template": "<span>{{formatTanggal('#: tglorder #', '')}}</span>"
                },
                {
                    "field": "tglkebutuhan",
                    "title": "Tanggal<br> Kebutuhan",
                    "width": "100px",
                    // "template": "<span>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
                },
                {
                    "field": "nousulan",
                    "title": "No. Usulan",
                    "width": "150px",
                },
                {
                    "field": "keterangan",
                    "title": "Jenis Usulan",
                    "width": "100px",
                },
                {
                    "field": "koordinator",
                    "title": "Koordinator<br> Barang",
                    "width": "150px",
                },
                {
                    "field": "ruangan",
                    "title": "Unit Pengusul",
                    "width": "150px",
                },
                {
                    "field": "ruangantujuan",
                    "title": "Unit Tujuan",
                    "width": "200px",
                },
                {
                    "field": "penanggungjawab",
                    "title": "Penanggung Jawab",
                    "width": "200px",
                },
                {
                    "field": "mengetahui",
                    "title": "Mengetahui",
                    "width": "200px",
                },
                {
                    "field": "noverifikasi",
                    "title": "No. UPK",
                    "width": "120px",
                },
                {
                    "field": "tglverifikasi",
                    "title": "Tanggal<br>Verifikasi",
                    "width": "100px",
                    // "template": "<span class='style-right'>{{formatTanggal('#: tglverifikasi #', '')}}</span>"
                }
            ];

            $scope.mainGroupOpt = {
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
                            value: "No."
                        },
                        {
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
                            value: "No. UPK"
                        },
                        {
                            value: "Tanggal Verifikasi"
                        }
                    ]
                }];

                tempDataExport = $scope.dataGrid;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                    value: data[i].no
                                },
                                {
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
                            title: "Daftar Monitoring Usulan",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "daftar-monitoring-usulan.xlsx"
                    });
                });
            };

            $scope.data2 = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [{
                            "field": "tglrealisasi",
                            "title": "Tanggall Perpindahan",
                            "width": "80px",
                            "template": "<span>{{formatTanggal('#: tglrealisasi #', '')}}</span>"
                        },
                        {
                            "field": "noverifikasi",
                            "title": "No Dokumen",
                            "width": "85px",
                        },
                        {
                            "field": "namalengkap",
                            "title": "Penanggung Jawab",
                            "width": "110px",
                        },
                        {
                            "field": "kelompoktransaksi",
                            "title": "Keterangan",
                            "width": "80px",
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
            // $scope.formatTanggal = function (tanggal) {
            //     return moment(tanggal).format('DD/MM/YYYY HH:mm');
            // }

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