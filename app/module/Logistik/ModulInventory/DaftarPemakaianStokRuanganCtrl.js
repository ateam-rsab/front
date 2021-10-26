define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPemakaianStokRuanganCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper, $mdDialog) {
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
                var chacePeriode = cacheHelper.get('DaftarPemakaianStokRuanganCtrl');
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

                manageLogistikPhp.getDataTableTransaksi("get-detail-login").then(function (dat) {
                    $scope.listRuangan = dat.data.ruangan
                });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }

            function init() {
                $scope.isRouteLoading = true;
                var nostruk = ""
                if ($scope.item.nostruk != undefined)
                    nostruk = "&nostruk=" + $scope.item.nostruk
                var ket = ""
                if ($scope.item.keterangan != undefined)
                    ket = "&keterangan=" + $scope.item.keterangan
                var ruid = ""
                if ($scope.item.ruangan != undefined)
                    ruid = "&ruanganid=" + $scope.item.ruangan.id

                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-daftar-pemakaian-ruangan?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    nostruk + ket + ruid, true).then(function (dat) {
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
                        data: dat.data.daftar,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false,
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
                cacheHelper.set('DaftarPemakaianStokRuanganCtrl', chacePeriode);


            }
            
            // $scope.getRuangan = function(){
            //     $scope.listRuangan = $scope.item.instalasi.ruangan;
            // }
            $scope.addPemakaian = function () {
                $state.go("PemakaianStokRuangan")
            }
            $scope.cariFilter = function () {

                init();
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
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpermintaanbarang=1&nores=' + $scope.dataSelected.norec + '&view=' + stt, function (response) {
                    //aadc=response;
                });
            }

            $scope.editPemakaian = function () {
                if ($scope.dataSelected == undefined) {
                    toastr.error('Pilih data dulu', 'Error')
                    return
                }
                var chacePeriode = {
                    0: $scope.dataSelected.norec,
                    1: 'EditPemakaian',
                    2: '',
                    3: '',
                    4: $scope.dataSelected,
                    5: '',
                    6: ''
                }
                cacheHelper.set('PemakaianStokRuanganCtrl', chacePeriode);
                $state.go('PemakaianStokRuangan')
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
                    "width": "25px",
                },
                {
                    "field": "tglstruk",
                    "title": "Tanggal",
                    "width": "50px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglstruk #', '')}}</span>"
                },
                {
                    "field": "nostruk",
                    "title": "No Pemakaian",
                    "width": "80px",
                },
                {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width": "120px",
                },
                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": "60px",
                },
                {
                    "field": "namapegawai",
                    "title": "Pegawai",
                    "width": "100px",
                },
                {
                    "field": "total",
                    "title": "Total",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                },
                {
                    command: [{
                            text: "Export to excel",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: exportDetail,
                            imageClass: "k-icon k-i-pencil"
                        },
                    ],
                    title: "",
                    width: "100px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                }
            ];

            function exportDetail(e) {
                e.preventDefault();

                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                let dataSourceDetail = new kendo.data.DataSource({
                    data: dataItem.details
                });

                var tempDataExport = [];
                var rows = [{
                    cells: [{
                            value: "Nama Produk"
                        },
                        {
                            value: "Satuan Standar"
                        },
                        {
                            value: "Harga Satuan"
                        },
                        {
                            value: "Qty Produk"
                        },
                        {
                            value: "Total"
                        }
                    ]
                }];

                tempDataExport = dataSourceDetail;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                    value: data[i].namaproduk
                                },
                                {
                                    value: data[i].satuanstandar
                                },
                                {
                                    value: data[i].hargasatuan
                                },
                                {
                                    value: data[i].qtyproduk
                                },
                                {
                                    value: data[i].total
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
                            title: "Detail Pemakaian Stok Ruangan",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "detail_pemakaian_stok_ruangan.xlsx"
                    });
                });
            }

            $scope.gridOpt = {
                toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }, {
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcelDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export Detail</button>'
                    },

                ],
                pageable: true,
                scrollable: true,
                columns: $scope.columnGrid
            };

            $scope.exportExcelDetail = function () {

                let dataGridPSR = $scope.dataGrid.data();
                let dataTempSourceExportPB = [];
                console.log(dataGridPSR)

                for (let i = 0; i < dataGridPSR.length; i++) {

                    for (let ii = 0; ii < dataGridPSR[i].details.length; ii++) {
                        let dataTemp2 = {
                            nostruk: dataGridPSR[i].nostruk,
                            keterangan: dataGridPSR[i].keterangan,
                            namaruangan: dataGridPSR[i].namaruangan,
                            tglstruk: dataGridPSR[i].tglstruk,
                            namapegawai: dataGridPSR[i].namapegawai,
                            // tglorder: dataGridPSR[i].tglorder,
                            kodeProduk:dataGridPSR[i].details[ii].kdproduk,
                            namaproduk:dataGridPSR[i].details[ii].namaproduk,
                            satuanstandar: dataGridPSR[i].details[ii].satuanstandar,
                            qtyproduk: dataGridPSR[i].details[ii].qtyproduk,
                            qtyterimalast: dataGridPSR[i].details[ii].qtyterimalast,
                            hargasatuan: dataGridPSR[i].details[ii].hargasatuan,
                            hargadiscount: dataGridPSR[i].details[ii].hargadiscount,
                            hargappn: dataGridPSR[i].details[ii].hargappn,
                            total: dataGridPSR[i].details[ii].total,
                            qtyprodukkonfirmasi: dataGridPSR[i].details[ii].qtyprodukkonfirmasi
                        }
                        dataTempSourceExportPB.push(dataTemp2);
                    }

                }

                $scope.dataSourceExportPB = new kendo.data.DataSource({
                    data: dataTempSourceExportPB
                });

                console.log($scope.dataSourceExportPB);

                var tempDataExport = [];
                var rows = [{
                    cells: [{
                            value: "Tanggal"
                        },
                        {
                            value: "No. Pemakaian"
                        },
                        {
                            value: "Ruangan"
                        },
                        {
                            value: "Deskripsi"
                        }, 
                        {
                            value: "Kode Produk"
                        },
                        {
                            value: "Satuan"
                        },
                        {
                            value: "QTY"
                        },
                        {
                            value: "Harga Satuan"
                        },
                        {
                            value: "Disc%"
                        },
                        {
                            value: "PPN%"
                        },
                        {
                            value: "Total"
                        },
                        {
                            value: "Keterangan"
                        },
                        {
                            value: "Pegawai"
                        },
                    ]
                }];

                tempDataExport = $scope.dataSourceExportPB;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                    value: data[i].tglstruk
                                },
                                {
                                    value: data[i].nostruk
                                },
                                {
                                    value: data[i].namaruangan
                                },
                                {
                                    value: data[i].namaproduk
                                },
                                {
                                    value: data[i].kodeProduk
                                },
                                {
                                    value: data[i].satuanstandar
                                },
                                {
                                    value: data[i].qtyproduk
                                },
                                {
                                    value: data[i].hargasatuan
                                },
                                {
                                    value: data[i].hargadiscount
                                },
                                {
                                    value: data[i].hargappn
                                },
                                {
                                    value: data[i].total
                                },
                                {
                                    value: data[i].keterangan
                                },
                                {
                                    value: data[i].namapegawai
                                }
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            freezePane: {
                                rowSplit: 1
                            },
                            columns: [{
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
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }
                            ],
                            // Title of the sheet
                            title: "Detail Pemakaian Stok Ruangan",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "detail-pemakaian-stok-ruangan.xlsx"
                    });
                });
            }

            $scope.exportExcel = function () {

                var tempDataExport = [];
                var rows = [{
                    cells: [{
                            value: "Tanggal"
                        },
                        {
                            value: "No Pemakaian"
                        },
                        {
                            value: "Keterangan"
                        },
                        {
                            value: "Ruangan"
                        },
                        {
                            value: "Pegawai"
                        }, {
                            value:"Total"
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
                                    value: data[i].tglstruk
                                },
                                {
                                    value: data[i].nostruk
                                },
                                {
                                    value: data[i].keterangan
                                },
                                {
                                    value: data[i].namaruangan
                                },
                                {
                                    value: data[i].namapegawai
                                },
                                {
                                    value: data[i].total
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
                            title: "Data Pemakaian Stok Ruangan",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "data_pemakaian_stok_ruangan.xlsx"
                    });
                });
            };

            $scope.data2 = function (dataItem) {
                console.log(dataItem);
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [{
                            "field": "namaproduk",
                            "title": "Deskripsi",
                            "width": "50px"
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
            $scope.hapusPemakaian = function () {
                if ($scope.dataSelected == undefined) {
                    toastr.error('Pilih data dulu', 'Error')
                    return
                }
                var confirm = $mdDialog.confirm()
                    .title('Peringatan')
                    .textContent('Apakah anda yakin mau menghapus data ini !? ')
                    .ariaLabel('Lucky day')
                    .ok('Ya')
                    .cancel('Tidak')
                $mdDialog.show(confirm).then(function () {
                    $scope.Hapus($scope.dataSelected.norec);

                })
            }
            $scope.Hapus = function (norecSP) {
                var data = {
                    "nostruk": norecSP,
                }
                manageLogistikPhp.hapusPemakaianRuangan(data).then(function (e) {
                    init()
                })

            }
        }
    ]);
});