define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarOrderLabCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper', 'ManageServicePhp', '$window',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper, manageServicePhp, $window) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.isRouteLoading = false;
            $scope.now = new Date();
            $scope.item.tglAwal = $scope.now;
            $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            $scope.item.tglAkhir = $scope.now;
            $scope.btnSimpanVis = false;
            $scope.item.belumVerifikasi = true;
            var loginRadiologi = false
            if ($scope.item.belumVerifikasi) $scope.cekBelumVerifs = true;
            else $scope.cekBelumVerifs = false;

            $scope.cekbelumVerifikasi = function (data) {
                if (data === true) {
                    $scope.cekBelumVerifs = true;
                } else if (data === false || data === undefined) {
                    $scope.cekBelumVerifs = false;
                } else {
                    return;
                }
            }

            $scope.optGridOrder = {
                dataBound: function (e) {
                    $('td').each(function () {
                        if ($(this).text() == 'MASUK') {
                            $(this).addClass('masuk')
                        };
                        if ($(this).text() == 'SELESAI DIPERIKSA') {
                            $(this).addClass('selesai')
                        };
                        // DIPANGGIL_SUSTER
                        if ($(this).text() == 'DIPANGGIL_SUSTER') {
                            $(this).addClass('dipanggil')
                        };
                    })
                },
                columns: [{
                    "field": "noorder",
                    "title": "No Order",
                    "width": 100,
                }, {
                    "field": "tglorder",
                    "title": "Tanggal Order",
                    "width": 100,
                }, {
                    "field": "noregistrasi",
                    "title": "No. Registrasi",
                    "width": 100,
                }, {
                    "field": "nocm",
                    "title": "No. Rekam Medis",
                    "width": 90,
                }, {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width": 150,
                }, {
                    "field": "umur",
                    "title": "Umur",
                    "width": 100,
                }, {
                    "field": "namaruangan",
                    "title": "Ruangan Asal",
                    "width": 100,
                }, {
                    "field": "pegawaiorder",
                    "title": "Pegawai Order",
                    "width": 100,
                }, {
                    "field": "status",
                    "title": "Status",
                    "width": 100,
                }]
            }

            $scope.item.jmlRow = 100
            $scope.selected = function (data) {
                $scope.dataSelected = data;
                manageLogistikPhp.getDataTableTransaksi("dokter/get-acc-number-radiologi?noOrder=" + $scope.dataSelected.noorder)
                    .then(function (e) {
                        $scope.dataRisOrder = e.data.data[0]

                    })
                // if ($scope.dataSelected.norec_apd!=null){
                //     $scope.showBuktiLayanan=true
                // }
                manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-apd?noregistrasi=" + $scope.dataSelected.noregistrasi +
                    "&noorder=" + $scope.dataSelected.noorder + "&idruangan=" + $scope.dataSelected.objectruangantujuanfk).then(function (e) {
                    $scope.norec_apd = e.data.data[0].norec
                })
            }


            LoadCache();
            loadCombo();

            function LoadCache() {
                var chacePeriode = cacheHelper.get('DaftarPasienLaboratoriumCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.tglAwal = new Date(chacePeriode[0]);
                    $scope.item.tglAkhir = new Date(chacePeriode[1]);
                    $scope.item.namaPasien = chacePeriode[2];
                    $scope.item.noMr = chacePeriode[3];
                    $scope.item.noReg = chacePeriode[4];

                    init();
                } else {
                    $scope.item.tglAwal = $scope.now;
                    $scope.item.tglAkhir = $scope.now;
                    init();
                }
            }

            function loadCombo() {
                var datauserlogin = JSON.parse(window.localStorage.getItem("datauserlogin"));
                manageLogistikPhp.getDataTableTransaksi("pegawai/get-kelompok-user?luId=" + datauserlogin.id, true).then(function (e) {
                    if (e.data.data.kelompokuser.indexOf('radiologi') > -1) /* KEl USER ITI*/ {
                        loginRadiologi = true
                    }

                })
                manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-data-combo", true).then(function (dat) {
                    $scope.listDepartemen = dat.data.departemen;
                    $scope.listKelompokPasien = dat.data.kelompokpasien;
                    $scope.listDokter = dat.data.dokter
                });
            }

            function init() {
                $scope.isRouteLoading = true;
                var ins = ""
                if ($scope.item.instalasi != undefined) {
                    var ins = "&deptId=" + $scope.item.instalasi.id
                }
                var rg = ""
                if ($scope.item.ruangan != undefined) {
                    var rg = "&ruangId=" + $scope.item.ruangan.id
                }
                var kp = ""
                if ($scope.item.kelompokPasien != undefined) {
                    var kp = "&kelId=" + $scope.item.kelompokPasien.id
                }
                var dok = ""
                if ($scope.item.dokter != undefined) {
                    var dok = "&pegId=" + $scope.item.dokter.id
                }

                var reg = ""
                if ($scope.item.noReg != undefined) {
                    var reg = "&noregistrasi=" + $scope.item.noReg
                }
                var rm = ""
                if ($scope.item.noMr != undefined) {
                    var rm = "&nocm=" + $scope.item.noMr
                }
                var nm = ""
                if ($scope.item.namaPasien != undefined) {
                    var nm = "&namapasien=" + $scope.item.namaPasien
                }
                var noOrderan = ""
                if ($scope.item.noOrderCari != undefined) {
                    var noOrderan = "&noOrders=" + $scope.item.noOrderCari
                }
                var isNotVerif = ""
                if ($scope.item.belumVerifikasi) {
                    var isNotVerif = "isNotVerif=" + true
                    var jmlRow = ""
                    if ($scope.item.jmlRow) {
                        jmlRow = "&jmlRow=" + $scope.item.jmlRow
                    }
                }
                var jmlRow = ""
                if ($scope.item.jmlRow) {
                    jmlRow = "&jmlRow=" + $scope.item.jmlRow
                }

                var tglAwal = ""
                var tglAkhir = ""
                if (!$scope.cekBelumVerifs) {
                    tglAwal = "&tglAwal=" + moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                    tglAkhir = "&tglAkhir=" + moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                }


                manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-daftar-order-lab?" +
                    isNotVerif +
                    tglAwal +
                    tglAkhir +
                    reg +
                    rm +
                    nm +
                    ins + rg + kp +
                    dok +
                    noOrderan +
                    jmlRow, true).then(function (dat) {
                    $scope.isRouteLoading = false;
                    for (var i = 0; i < dat.data.data.length; i++) {
                        dat.data.data[i].no = i + 1
                        var tanggal = $scope.now;
                        var tanggalLahir = new Date(dat.data.data[i].tgllahir);
                        var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                        dat.data.data[i].umur = umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari';

                    }

                    console.log(dat.data.data);
                    
                    $scope.listDataPasien = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 100
                    });
                   
                });

            }

            $scope.getRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function () {
                $scope.isRouteLoading = true;
                init();

                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir,
                    2: $scope.item.namaPasien,
                    3: $scope.item.noMr,
                    4: $scope.item.noReg,
                    5: '',
                    6: ''
                }
                cacheHelper.set('DaftarPasienLaboratoriumCtrl', chacePeriode);
            }

            $scope.editOrder = function () {
                if ($scope.dataSelected.status == 'SELESAI DIPERIKSA') {
                    toastr.error('Data Sudah Di Verifikasi');
                    return
                }

                var arrStr = {
                    0: $scope.dataSelected.nocm,
                    1: $scope.dataSelected.namapasien,
                    2: $scope.dataSelected.jeniskelamin,
                    3: $scope.dataSelected.noregistrasi,
                    4: $scope.dataSelected.umur,
                    5: $scope.dataSelected.objectkelasfk,
                    6: $scope.dataSelected.namakelas,
                    7: $scope.dataSelected.tglregistrasi,
                    8: $scope.dataSelected.norec,
                    9: $scope.dataSelected.namaruangan,
                    10: $scope.dataSelected.objectruanganfk,
                    11: $scope.dataSelected.norec_pd,
                    12: $scope.dataSelected.norec_so,
                    13: $scope.dataSelected.kelompokpasien
                }
                cacheHelper.set('editOrderCache', arrStr);
                $state.go('TransaksiPelayananLabRad')
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }

            $scope.columnGrid = [{
                    "field": "no",
                    "title": "No",
                    "width": "30px",
                },

                {
                    "field": "noorder",
                    "title": "No Order",
                    "width": "120px",
                },
                {
                    "field": "tglorder",
                    "title": "Tgl Order",
                    "width": "120px",
                    "template": "<span class='style-center'>{{formatTanggal('#: tglorder #')}}</span>"
                },
                {
                    "field": "noregistrasi",
                    "title": "No Registrasi",
                    "width": "100px",
                },
                {
                    "field": "nocm",
                    "title": "No MR",
                    "width": "70px",
                },
                {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width": "150px",
                },
                {
                    "field": "namaruangan",
                    "title": "Ruangan Order",
                    "width": "130px",
                },
                {
                    "field": "ruangantujuan",
                    "title": "Ruangan Tujuan",
                    "width": "130px",
                }, {
                    "field": "umur",
                    "title": "Umur",
                    "width": "100px"
                },
                {
                    "field": "pegawaiorder",
                    "title": "Pengorder",
                    "width": "100px"
                },
                // {
                //     "field": "kelompokpasien",
                //     "title": "Kelompok Pasien",
                //     "width" : "100px",
                // },

                // {
                //     "field": "namakelas",
                //     "title": "Nama Kelas",
                //     "width" : "80px",
                // },
                {
                    "field": "tglregistrasi",
                    "title": "Tgl Registrasi",
                    "width": "100px",
                    "template": "<span class='style-center'>{{formatTanggal('#: tglregistrasi #')}}</span>"
                },
                {
                    "field": "tglpulang",
                    "title": "Tgl Pulang",
                    "width": "100px",
                    "template": "<span class='style-center'>{{formatTanggal('#: tglpulang #')}}</span>"
                },

                // {
                //     "field": "",
                //     "title": "No Verifikasi",
                //     "width" : "120px",
                // },
            ];
            $scope.data2 = function (dataItem) {
                for (var i = 0; i < dataItem.details.length; i++) {
                    dataItem.details[i].no = i + 1

                }
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details,

                    }),
                    columns: [{
                            "field": "tglpelayanan",
                            "title": "Tgl Pelayanan",
                            "width": "50px",
                            "template": "<span class='style-center'>{{formatTanggal('#: tglpelayanan #')}}</span>"
                        },
                        {
                            "field": "namaproduk",
                            "title": "Layanan",
                            "width": "150px",

                        },
                        {
                            "field": "qtyproduk",
                            "title": "Jumlah",
                            "width": "50px",

                        }

                    ]
                }
            };

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MM-YYYY HH:mm');
            }

            function itungUsia(tgl) {

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


            $scope.LihatHasil = function (data) {

                if ($scope.dataSelected == undefined) {
                    toastr.error('Pilih data dulu');
                    return
                }
                if (loginRadiologi == true) {
                    if ($scope.dataRisOrder != undefined) {
                        $window.open("http://182.23.26.34:1111/URLCall.do?LID=dok&LPW=dok&LICD=003&PID=" + $scope.dataRisOrder.patient_id +
                            '&ACN=' + $scope.dataRisOrder.accession_num, "_blank");
                    } else {
                        toastr.info('Hasil Radiologi belum ada')
                    }
                } else {
                    if ($scope.norec_apd != undefined) {
                        // $state.go(data ? data : 'DashboardLaboratoriumCtrlInputHasil', {
                        //     noRegistrasi: $scope.dataSelected.norec_pd,
                        //     noOrder: $scope.dataSelected.noorder ,
                        //     noAntrianPasien: $scope.norec_apd,
                        //     status : "hasil"
                        // })
                        var arrStr = {
                            0: $scope.dataSelected.nocm,
                            1: $scope.dataSelected.namapasien,
                            2: $scope.dataSelected.jeniskelamin,
                            3: $scope.dataSelected.noregistrasi,
                            4: $scope.dataSelected.umur,
                            5: $scope.dataSelected.kelompokpasien,
                            6: $scope.dataSelected.tglregistrasi,
                            7: $scope.norec_apd,
                            8: $scope.dataSelected.norec_pd,
                            9: $scope.dataSelected.objectkelasfk,
                            10: $scope.dataSelected.namakelas,
                            11: $scope.dataSelected.objectruanganfk,
                            12: $scope.dataSelected.namaruangan
                        }
                        cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);

                        $state.go('HasilLaboratorium', {
                            norecPd: $scope.dataSelected.norec_pd,
                            noOrder: $scope.dataSelected.noorder,
                            norecApd: $scope.norec_apd
                        })
                    } else {
                        toastr.info('Hasil Lab belum ada')
                    }

                }

            }

            $scope.verifikasi = function () {
                // isCheckAll = false
                if ($scope.dataSelected == undefined) {
                    toastr.error('Pilih data dulu');
                    return
                }
                if ($scope.dataSelected.nostruk != null) {
                    toastr.error('Data Sudah DiClosing Hubungi Tata Rekening');
                    return
                }
                if ($scope.dataSelected.status == 'SELESAI DIPERIKSA') {
                    toastr.error('Data Sudah Di Verifikasi');
                    return
                }
                delete $scope.item.dokterVerif
                $scope.btnSimpanVis = false
                $scope.item.noOrder = $scope.dataSelected.noorder;
                $scope.item.namaPasiens = $scope.dataSelected.namapasien;
                $scope.item.dokterOrder = {
                    id: $scope.dataSelected.objectpegawaiorderfk,
                    namalengkap: $scope.dataSelected.pegawaiorder
                };
                $scope.popUpVerif.center().open();
                loadDataVerif();

            }

            let formatCurrency = (money) => {
                return new Intl.NumberFormat("id-ID", {
                    style: 'currency',
                    currency: 'IDR'
                }).format(money);
            }

            function loadDataVerif() {
                $scope.sourceVerif = new kendo.data.DataSource({
                    data: [],
                    pageSize: 10,
                    total: 0

                });
                $scope.totalHarga = 'Rp. 0, 00';
                let tempHarga = 0;
                manageServicePhp.getDataTableTransaksi("lab-radiologi/get-order-pelayanan?norec_so=" + $scope.dataSelected.norec_so +
                    "&objectkelasfk=" + $scope.dataSelected.objectkelasfk, true).then(function (dat) {

                    var dataSource = dat.data.data;
                    // console.log(dataSource)
                    // $scope.catatanOrder = dat.data.
                    for (let i = 0; i < dataSource.length; i++) {
                        dataSource[i].statCheckbox = false;
                        dataSource[i].no = i + 1;

                        dataSource[i].hargaSatuanFormatted = formatCurrency(dataSource[i].hargasatuan);
                        tempHarga += parseInt(dataSource[i].hargasatuan) * parseInt(dataSource[i].qtyproduk);
                    }

                    $scope.totalHarga = tempHarga.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                    });

                    $scope.sourceVerif = new kendo.data.DataSource({
                        data: dataSource,
                        pageSize: 10,
                        total: dataSource.length,
                        serverPaging: false,

                    });

                });
            }


            $scope.columnVerif = [
                // { 
                //     "title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
                //     template: "# if (statCheckbox) { #"+
                //     "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />"+
                //     "# } else { #"+
                //     "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
                //     "# } #",
                //     width:"30px"
                // },
                {
                    "field": "no",
                    "title": "No",
                    "width": "30px",
                },
                {
                    "field": "tglpelayanan",
                    "title": "Tgl Pelayanan",
                    "width": "90px",
                },
                {
                    "field": "namaproduk",
                    "title": "Layanan",
                    "width": "160px",
                    "footerTemplate": "Total",
                    "footerAttributes": {
                        "class": "table-footer-cell",
                        "style": "text-align: right;"
                    }
                },
                {
                    "field": "qtyproduk",
                    "title": "Jumlah",
                    "width": "40px",
                },
                {
                    "field": "hargaSatuanFormatted",
                    "title": "Harga",
                    "width": "140px",
                    "footerTemplate": "<span>{{totalHarga}}</span>"
                },
                {
                    "field": "ruangantujuan",
                    "title": "Ruangan Tujuan",
                    "width": "140px"
                },
                {
                    "field": "catatan",
                    "title": "Catatan",
                    "width": "140px"
                },

            ];

            $scope.selectRow = function (dataItem) {

                var dataSelect = _.find($scope.sourceVerif._data, function (data) {
                    return data.prid == dataItem.prid;
                });

                if (dataSelect.statCheckbox) {
                    dataSelect.statCheckbox = false;
                } else {
                    dataSelect.statCheckbox = true;
                }

                $scope.tempCheckbox = dataSelect.statCheckbox;

                reloadDataGrid($scope.sourceVerif._data);

            }
            var isCheckAll = false
            $scope.selectUnselectAllRow = function () {
                var tempData = $scope.sourceVerif._data;

                if (isCheckAll) {
                    isCheckAll = false;
                    for (var i = 0; i < tempData.length; i++) {
                        tempData[i].statCheckbox = false;
                    }
                } else {
                    isCheckAll = true;
                    for (var i = 0; i < tempData.length; i++) {
                        tempData[i].statCheckbox = true;
                    }
                }

                reloadDataGrid(tempData);
            }
            //refresh data grid
            function reloadDataGrid(ds) {
                var newDs = new kendo.data.DataSource({
                    data: ds,
                    pageSize: 10,
                    total: ds.length,
                    serverPaging: false,

                });
                var grid = $('#kGrids').data("kendoGrid");

                grid.setDataSource(newDs);
                grid.refresh();
                // $scope.dataVOloaded = true;
            }

            $scope.batalVerif = function () {
                $scope.popUpVerif.close();
            }

            $scope.simpanVerifikasi = function () {
                if ($scope.item.dokterVerif == undefined) {
                    toastr.error('Dokter Verifikasi harus di isi')
                    return
                }
                var dataPost = [];
                for (var i = 0; i < $scope.sourceVerif._data.length; i++) {
                    // if($scope.sourceVerif._data[i].statCheckbox){
                    var datasys = {
                        "produkid": $scope.sourceVerif._data[i].prid,
                        "hargasatuan": $scope.sourceVerif._data[i].hargasatuan,
                        "qtyproduk": $scope.sourceVerif._data[i].qtyproduk,
                        "komponenharga": $scope.sourceVerif._data[i].details,
                    }
                    dataPost.push(datasys)
                    // }
                }
                var norec_pp = ''
                if ($scope.sourceVerif._data[0].norec_pp != null) {
                    norec_pp = $scope.sourceVerif._data[0].norec_pp
                }

                var itemsave = {
                    "bridging": dataPost,
                    "norec_pp": norec_pp,
                    "noorder": $scope.item.noOrder,
                    "norec_so": $scope.dataSelected.norec_so,
                    "objectkelasfk": $scope.dataSelected.objectkelasfk,
                    "norec_pd": $scope.dataSelected.norec_pd,
                    "objectruangantujuanfk": $scope.dataSelected.objectruangantujuanfk,
                    "objectpegawaiorderfk": $scope.dataSelected.objectpegawaiorderfk,
                    "iddokterverif": $scope.item.dokterVerif.id,
                    "namadokterverif": $scope.item.dokterVerif.namalengkap,
                    "iddokterorder": $scope.item.dokterOrder.id,
                    "namadokterorder": $scope.item.dokterOrder.namalengkap,
                }

                if (dataPost.length > 0) {
                    $scope.btnSimpanVis = true;
                    var departemen = $scope.sourceVerif._data[0].objectdepartemenfk;
                    if (departemen == 3) {
                        /*lab */
                        manageServicePhp.saveBridingSysmex(itemsave)
                            .then(function (e) {});
                        // manageServicePhp.saveHasilPemeriksaan(itemsave)
                        //     .then(function(e) {
                        // });
                    } else if (departemen == 27) {
                        manageServicePhp.saveBrigdingZeta(itemsave)
                            .then(function (e) {});

                    }

                    manageServicePhp.savePelayananPasien(itemsave)
                        .then(function (e) {
                            // $scope.btnSimpanVis = false;
                            // $scope.popUpVerif.close();
                            init()

                        });
                } else {
                    toastr.error('Belum ada data yang dipilih');
                }
            }
            $scope.hapusTindakan = function () {
                if ($scope.dataSelectedVerif == undefined) {
                    toastr.error('Pilih data dahulu!');
                    return;
                }

                var objDelete = {
                    "norec_op": $scope.dataSelectedVerif.norec_op,
                };
                manageServicePhp.deleteOrderPelayanan(objDelete).then(function (e) {
                    loadDataVerif()
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

            $scope.cetakBuktiLayanan = function () {

                if ($scope.dataSelected != undefined && $scope.norec_apd != null) {
                    // if ($scope.dataSelected.status != 'SELESAI DIPERIKSA') {
                    //     toastr.error('Pilih pasien yang sudah di verifikasi')
                    //     return
                    // }
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapBuktiPelayanan?noRegistrasi=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //cetakan langsung service VB6 by grh
                    var stt = 'false'
                    if (confirm('View Bukti Layanan? ')) {
                        // Save it!
                        stt = 'true';
                    } else {
                        // Do nothing!
                        stt = 'false'
                    }
                    var client = new HttpClient();

                    // client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan-ruangan=1&norec=' 
                    //     + $scope.dataSelected.noregistrasi + '&strIdPegawai=' + $scope.pegawai.id +
                    //     '&strIdRuangan=ORDERRADIOLOGI' +$scope.norec_apd + '&view='+ stt, function(response) {
                    //     // do something with response
                    // });
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan-ruangan=1&norec=' +
                        $scope.dataSelected.noregistrasi + '&strIdPegawai=' + $scope.pegawai.id + '&strIdRuangan=' +
                        $scope.dataSelected.objectruangantujuanfk + '&view=' + stt,
                        function (response) {
                            //http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan-ruangan=1&norec=1707000166&strIdPegawai=1&strIdRuangan=&view=true
                            // do something with response
                        });

                }
            }

            //********************************  $scope.cekBelumVerifs=true;***

        }
    ]);
});