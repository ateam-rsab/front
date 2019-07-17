define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('TrialBalanceCtrl', ['$q', '$rootScope', '$scope', 'ManageAkuntansi', '$state', 'CacheHelper', 'DateHelper',
        function ($q, $rootScope, $scope, manageAkuntansi, $state, cacheHelper, dateHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading = false;
            $scope.monthUngkul = {
                start: "year",
                depth: "year"
            }
            $scope.yearUngkul = {
                start: "decade",
                depth: "decade"
            }

            var pegawaiUser = {}
            var dataCOA = []
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            function LoadCache() {
                var chacePeriode = cacheHelper.get('NeracaCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.bulan = new Date(chacePeriode[0]);
                    $scope.item.tahun = new Date(chacePeriode[1]);

                    init();
                }
                else {
                    $scope.item.bulan = $scope.now;
                    $scope.item.tahun = $scope.now;
                    init();
                }
            }
            function loadCombo() {
                // manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                //     pegawaiUser = dat.data.datalogin
                // });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            $scope.Tambah = function () {
                $state.go('UsulanPermintaanBarangJasaRuangan')
            }
            $scope.munculJaya = false;
            $scope.closingJurnal = function () {
                var stt = 'false'
                if (confirm('Close Jurnal bulan "' + dateHelper.formatDate($scope.item.bulan, "MMMM YYYY") + '"')) {
                    // Save it!
                    stt = 'true';
                    var norec_tea = $scope.item.norecSaldo
                    if ($scope.item.norecSaldo == undefined) {
                        norec_tea = '-'
                    }
                    var tgltgl = moment($scope.item.bulan).format('YYYYMM');
                    var objSave =
                    {
                        ym: tgltgl,
                        data: dataCOA
                    }
                    manageAkuntansi.postclosingjurnal(objSave).then(function (e) {

                    })
                } else {
                    // Do nothing!
                    stt = 'false'
                }
            }
            $scope.batalClosingJurnal = function () {
                var stt = 'false'
                if (confirm('Batal Closing Jurnal bulan "' + dateHelper.formatDate($scope.item.bulan, "MMMM YYYY") + '"')) {
                    // Save it!
                    stt = 'true';
                    var norec_tea = $scope.item.norecSaldo
                    if ($scope.item.norecSaldo == undefined) {
                        norec_tea = '-'
                    }
                    var tgltgl = moment($scope.item.bulan).format('YYYYMM');
                    var objSave =
                    {
                        ym: tgltgl
                    }
                    manageAkuntansi.postbatalclosingjurnal(objSave).then(function (e) {

                    })
                } else {
                    // Do nothing!
                    stt = 'false'
                }
            }
            function init() {
                $scope.isRouteLoading = true;
                // var ins =""
                // if ($scope.item.instalasi != undefined){
                //     var ins ="&dpid=" +$scope.item.instalasi.id
                // }
                // var rg =""
                // if ($scope.item.ruangan != undefined){
                //     var rg ="&ruid=" +$scope.item.ruangan.id
                // }
                // var Jra =""
                // if ($scope.item.jenisRacikan != undefined){
                //     var Jra ="&jenisobatfk=" +$scope.item.jenisRacikan.id
                // }
                var sDebetAkhir = 0
                var sKreditAkhir = 0

                var bulan = dateHelper.formatDate($scope.item.bulan, "MM")
                var tahun = dateHelper.formatDate($scope.item.tahun, "YYYY")
                var tglAwal1 = tahun + "-" + bulan + "-01"
                var tglAkhir1 = tahun + "-" + bulan + "-" + getLastDay(tahun, bulan)

                // var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                // var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                //manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-trial-balance?"+
                manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-trial-balance-rev-2?" +
                    //"tglAwal=" + tglAwal1 + 
                    //"&tglAkhir=" + tglAkhir1 
                    "bulan=" + bulan +
                    "&tahun=" + tahun
                    , true).then(function (dat) {
                        $scope.isRouteLoading = false;
                        $scope.munculJaya = true;
                        var saldoAwalDebet = 0
                        var saldoAwalKredit = 0
                        var mutasiDebet = 0
                        var mutasiKredit = 0
                        var saldoAkhirDebet = 0
                        var saldoAkhirKredit = 0
                        for (var i = 0; i < dat.data.length; i++) {
                            dat.data[i].no = i + 1
                            // dat.data[i].debetAwal =  parseFloat(dat.data[i].debetAwal)
                            // dat.data[i].kreditAwal =  parseFloat(dat.data[i].kreditAwal)
                            // dat.data[i].debetMutasi =  parseFloat(dat.data[i].debetMutasi)
                            // dat.data[i].kreditMutasi =  parseFloat(dat.data[i].kreditMutasi)
                            dat.data[i].debet = parseFloat(dat.data[i].debet)
                            dat.data[i].kredit = parseFloat(dat.data[i].kredit)
                            // sDebetAkhir=parseFloat(dat.data[i].debetAwal) + parseFloat(dat.data[i].debetMutasi)
                            // sKreditAkhir=parseFloat(dat.data[i].kreditAwal) + parseFloat(dat.data[i].kreditMutasi)
                            sDebetAkhir = parseFloat(dat.data[i].debet)
                            sKreditAkhir = parseFloat(dat.data[i].kredit)
                            // if (sDebetAkhir > sKreditAkhir) {
                            //     dat.data[i].debetAkhir = sDebetAkhir - sKreditAkhir
                            //     dat.data[i].kreditAkhir = 0
                            // }else{
                            //     dat.data[i].debetAkhir = 0
                            //     dat.data[i].kreditAkhir = sKreditAkhir - sDebetAkhir 
                            // }

                            // saldoAwalDebet = saldoAwalDebet + parseFloat(dat.data[i].debetAwal) 
                            // saldoAwalKredit = saldoAwalKredit + parseFloat(dat.data[i].kreditAwal) 
                            // mutasiDebet = mutasiDebet + parseFloat(dat.data[i].debetMutasi) 
                            // mutasiKredit = mutasiKredit + parseFloat(dat.data[i].kreditMutasi) 
                            // saldoAkhirDebet = saldoAkhirDebet + parseFloat(dat.data[i].debetAkhir) 
                            // saldoAkhirKredit = saldoAkhirKredit + parseFloat(dat.data[i].kreditAkhir) 
                            mutasiDebet = mutasiDebet + parseFloat(dat.data[i].debet)
                            mutasiKredit = mutasiKredit + parseFloat(dat.data[i].kredit)
                        }
                        dataCOA = dat.data.data
                        $scope.dataGrid = new kendo.data.DataSource({
                            data: dataCOA,
                            pageSize: 100,
                            total: dat.data.length,
                            serverPaging: false,
                        });

                        // $scope.dataGrid = dat.data;
                        // pegawaiUser = dat.data.datalogin
                        // $scope.item.saldoAwalDebet = parseFloat(saldoAwalDebet).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        // $scope.item.saldoAwalKredit = parseFloat(saldoAwalKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                        // $scope.item.mutasiDebet = parseFloat(mutasiDebet).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        // $scope.item.mutasiKredit = parseFloat(mutasiKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                        // $scope.item.saldoAkhirDebet = parseFloat(saldoAkhirDebet).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        // $scope.item.saldoAkhirKredit = parseFloat(saldoAkhirKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.mutasiDebet = parseFloat(mutasiDebet).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.mutasiKredit = parseFloat(mutasiKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    });

                var chacePeriode = {
                    0: $scope.item.bulan,
                    1: $scope.item.tahun,
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('NeracaCtrl', chacePeriode);


            }
            $scope.$watch('item.filter', function (newValue, oldValue) {
                var layananFilter = [];
                var txtnaonwelah = '';


                for (var i = dataCOA.length - 1; i >= 0; i--) {
                    txtnaonwelah = ' ' + dataCOA[i].namaaccount;
                    txtnaonwelah = txtnaonwelah.toUpperCase()
                    if (txtnaonwelah != null) {
                        if (parseFloat(txtnaonwelah.indexOf($scope.item.filter.toUpperCase())) > 0) {
                            layananFilter.push(dataCOA[i])
                        }
                    }

                }
                if ($scope.item.filter == '') {
                    layananFilter = dataCOA
                }
                $scope.dataGrid = new kendo.data.DataSource({
                    data: layananFilter,
                    pageSize: 20,
                    group: [
                        //{field: "ruanganTindakan"}
                    ],
                });


            });
            $scope.$watch('item.filtera', function (newValue, oldValue) {
                var layananFilter = [];
                var txtnaonwelah = '';


                for (var i = dataCOA.length - 1; i >= 0; i--) {
                    txtnaonwelah = dataCOA[i].noaccount;
                    txtnaonwelah = txtnaonwelah.toUpperCase()
                    if (txtnaonwelah != null) {
                        if ($scope.item.filtera.toUpperCase() == txtnaonwelah.substring(0, $scope.item.filtera.length)) {
                            layananFilter.push(dataCOA[i])
                        }
                    }

                }
                if ($scope.item.filtera == '') {
                    layananFilter = dataCOA
                }
                $scope.dataGrid = new kendo.data.DataSource({
                    data: layananFilter,
                    pageSize: 20,
                    group: [
                        //{field: "ruanganTindakan"}
                    ],
                });


            });
            $scope.getRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function () {

                init();
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
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpermintaanbarang=1&nores=' + $scope.dataSelected.norec + '&view=' + stt, function (response) {
                    //aadc=response;
                });
            }

            $scope.EditTerima = function () {
                var chacePeriode = {
                    0: $scope.dataSelected.norec,
                    1: 'EditTerima',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                }
                cacheHelper.set('UsulanPermintaanBarangJasaRuanganCtrl', chacePeriode);
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
                manageAkuntansi.getDataTableTransaksi("penerimaan-suplier/delete-terima-barang-suplier?" + "norec_sp=" + $scope.dataSelected.norec, true).then(function (dat) {
                    init()
                });
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }
            $scope.optionsDataGrid = {
                toolbar: ["excel"],
                excel: {
                    fileName: "Neraca Saldo",
                    allPages: true,
                },
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                selectable: 'row',
                pageable: true,
                sortable: true,
                columns: [
                    {
                        "field": "no",
                        "title": "No",
                        "width": "50px",
                    },
                    {
                        "field": "noaccount",
                        "title": "No Akun",
                        "width": "140px"
                    },
                    {
                        "field": "namaaccount",
                        "title": "Nama Akun",
                        "width": "250px"
                    },
                    // {
                    //     "title": "Saldo Awal",
                    //     "width" : "250px",
                    //     "columns":[
                    //         {
                    //             //"field": "debetAwal",
                    //             //"title": "Debet",
                    //             //"template": "<span class='style-right'>{{formatRupiah('#: debetAwal #', '')}}</span>"
                    //         },
                    //         {
                    //             //"field": "kreditAwal",
                    //             //"title": "Kredit",
                    //             //"template": "<span class='style-right'>{{formatRupiah('#: kreditAwal #', '')}}</span>"
                    //         }
                    //     ]
                    // },
                    {
                        "title": "Mutasi",
                        "width": "250px",
                        // "attributes": {
                        //     "style": "text-align:center;valign=middle"
                        // },
                        "columns": [
                            {
                                "field": "debet",
                                "title": "Debet",
                                "template": "<span class='style-right'>{{formatRupiah('#: debet #', '')}}</span>"
                            },
                            {
                                "field": "kredit",
                                "title": "Kredit",
                                "template": "<span class='style-right'>{{formatRupiah('#: kredit #', '')}}</span>"
                            }
                        ]
                    },
                    // {
                    //     "title": "Saldo Akhir",
                    //     "width" : "250px",
                    //     "columns":[
                    //         {
                    //             "field": "debetAkhir",
                    //             "title": "Debet",
                    //             "template": "<span class='style-right'>{{formatRupiah('#: debetAkhir #', '')}}</span>"
                    //         },
                    //         {
                    //             "field": "kreditAkhir",
                    //             "title": "Kredit",
                    //             "template": "<span class='style-right'>{{formatRupiah('#: kreditAkhir #', '')}}</span>"
                    //         }
                    //     ]
                    // }
                ],

            };

            $scope.columnGrid = [

            ];
            // $scope.data2 = function(dataItem) {
            //     return {
            //         dataSource: new kendo.data.DataSource({
            //             data: dataItem.details
            //         }),
            //         columns: [
            //             {
            //                 "field": "tglkebutuhan",
            //                 "title": "Tgl Kebutuhan",
            //                 "width" : "50px",
            //                 "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
            //             },
            //             {
            //                 "field": "prid",
            //                 "title": "Kode Produk",
            //                 "width" : "40px",
            //             },
            //             {
            //                 "field": "namaproduk",
            //                 "title": "Nama Produk",
            //                 "width" : "90px",
            //             },
            //             {
            //                 "field": "spesifikasi",
            //                 "title": "Spesifikasi",
            //                 "width" : "120px",
            //             },
            //             {
            //                 "field": "satuanstandar",
            //                 "title": "Satuan",
            //                 "width" : "20px",
            //             },
            //             {
            //                 "field": "qtyproduk",
            //                 "title": "Qty",
            //                 "width" : "20px",
            //             },
            //             {
            //                 "field": "hargasatuan",
            //                 "title": "Harga Satuan",
            //                 "width" : "40px",
            //                 "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
            //             },
            //             {
            //                 "field": "total",
            //                 "title": "Total",
            //                 "width" : "50px",
            //                 "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
            //             }
            //         ]
            //     }
            // };  
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
                return thn + ' thn '// + bln + ' bln'
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
            function getLastDay(y, m) {
                if (m == 2 && y % 4 != 0) {
                    return 28
                }
                else {
                    return 31 + (m <= 7 ? ((m % 2) ? 1 : 0) : (!(m % 2) ? 1 : 0)) - (m == 2) - (m == 2 && y % 4 != 0 || !(y % 100 == 0 && y % 400 == 0));
                }
            }
            //***********************************

        }
    ]);
});
