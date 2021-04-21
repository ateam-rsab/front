define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPasienPenunjangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading = false;
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            loadCombo();
            LoadCache();

            function LoadCache() {
                var chacePeriode = cacheHelper.get('DaftarPasienPenunjang');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    // $scope.item.tglAwal = new Date(chacePeriode[0]);
                    // $scope.item.tglAkhir = new Date(chacePeriode[1]);
                    $scope.item.namaPasien = chacePeriode[2];
                    $scope.item.noMr = chacePeriode[3];
                    $scope.item.noReg = chacePeriode[4];

                    init();
                } else {
                    // $scope.item.tglAwal = $scope.now;
                    // $scope.item.tglAkhir = $scope.now;
                    init();
                }
            }

            function loadCombo() {
                manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function (dat) {
                    $scope.listDepartemen = dat.data.departemen;
                    $scope.listKelompokPasien = dat.data.kelompokpasien;
                });
                // manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-data-combo", true).then(function(dat){

                //     $scope.listRuangan = dat.data.ruangantujuan;
                //      $scope.item.ruangan = {id:  $scope.listRuangan[0].id,namaruangan:  $scope.listRuangan[0].namaruangan};
                // });

            }

            function init() {
                var ins = ""
                if ($scope.item.instalasi) {
                    var ins = "&deptId=" + $scope.item.instalasi.id
                }
                var rg = ""
                if ($scope.item.ruangan) {
                    var rg = "&ruangId=" + $scope.item.ruangan.id
                }
                var kp = ""
                if ($scope.item.kelompokPasien) {
                    var kp = "&kelId=" + $scope.item.kelompokPasien.id
                }

                var reg = ""
                if ($scope.item.noReg) {
                    var reg = "&noregistrasi=" + $scope.item.noReg
                }
                var rm = ""
                if ($scope.item.noMr) {
                    var rm = "&nocm=" + $scope.item.noMr
                }
                var nm = ""
                if ($scope.item.namaPasien) {
                    var nm = "&namapasien=" + $scope.item.namaPasien
                }

                let tglAwal = $scope.item.tglAwal ? moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss') : "",
                    tglAkhir = $scope.item.tglAkhir ? moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss') : "",
                    tglOrderAwal = $scope.item.tglOrderAwal ? moment($scope.item.tglOrderAwal).format('YYYY-MM-DD HH:mm:ss') : '',
                    tglOrderAkhir = $scope.item.tglOrderAkhir ? moment($scope.item.tglOrderAkhir).format('YYYY-MM-DD HH:mm:ss') : '';

                $scope.isRouteLoading = true;
                manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-daftar-pasien-penunjang?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    "&tglOrderAwal=" + tglOrderAwal + "&tglOrderAkhir=" + tglOrderAkhir +
                    reg +
                    rm +
                    nm +
                    ins + rg + kp, true).then(function (dat) {
                    for (var i = 0; i < dat.data.data.length; i++) {
                        dat.data.data[i].no = i + 1
                        var tanggal = $scope.now;
                        var tanggalLahir = new Date(dat.data.data[i].tgllahir);
                        var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                        dat.data.data[i].umur = umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                        //itungUsia(dat.data[i].tgllahir)
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10
                    });
                    $scope.listRuangan = dat.data.ruanganlogin;
                    $scope.item.ruangan = {
                        id: $scope.listRuangan[0].id,
                        namaruangan: $scope.listRuangan[0].namaruangan
                    };
                    $scope.isRouteLoading = false;
                });




            }
            $scope.getRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function () {

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
                cacheHelper.set('DaftarPasienPenunjang', chacePeriode);
            }

            $scope.TransaksiPelayanan = function () {

                var arrStr = {
                    0: $scope.dataSelected.nocm,
                    1: $scope.dataSelected.namapasien,
                    2: $scope.dataSelected.jeniskelamin,
                    3: $scope.dataSelected.noregistrasi,
                    4: $scope.dataSelected.umur,
                    5: $scope.dataSelected.klid,
                    6: $scope.dataSelected.namakelas,
                    7: $scope.dataSelected.tglregistrasi,
                    8: $scope.dataSelected.norec,
                    9: $scope.dataSelected.namaruangan,
                    10: $scope.dataSelected.ruid,
                    11: $scope.dataSelected.norec_pd,
                    12: "", //nor
                    13: $scope.dataSelected.kelompokpasien,
                    18: $scope.dataSelected.nostruklastfk
                }
                cacheHelper.set('RincianPelayananLabRadCtrl', arrStr);
                $state.go('RincianPelayananLabRad')
            }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }


            $scope.columnGrid = [{
                "field": "no",
                "title": "No",
                "width": "30px",
            }, {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width": "80px",
            }, {
                "field": "nocm",
                "title": "No MR",
                "width": "70px",
            }, {
                "field": "namapasien",
                "title": "Nama Pasien",
                "width": "150px",
            }, {
                "field": "namaruangan",
                "title": "Nama Ruangan",
                "width": "130px",
            }, {
                "field": "jeniskelamin",
                "title": "Jenis Kelamin",
                "width": "70px",
            }, {
                "field": "umur",
                "title": "Umur",
                "width": "100px"
            }, {
                "field": "kelompokpasien",
                "title": "Kelompok Pasien",
                "width": "100px",
            }, {
                "field": "namakelas",
                "title": "Nama Kelas",
                "width": "80px",
            }, {
                "field": "tglorder",
                "title": "Tanggal<br>Order",
                "width": "100px",
            }, {
                "field": "tglregistrasi",
                "title": "Tanggal<br>Registrasi",
                "width": "100px",
            }, {
                "field": "tglpulang",
                "title": "Tanggal<br>Pulang",
                "width": "100px",
            }, {

                command: [{
                    text: "Rincian Pelayanan",
                    click: rincianPelayanan,
                    imageClass: "k-icon k-i-pencil"
                }],
                title: "",
                width: 100

            }];

            function rincianPelayanan(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                $scope.dataSelected = dataItem;

                $scope.TransaksiPelayanan();
            }

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

            $scope.Rincian = function () {

            }
            //***********************************

        }
    ]);
});