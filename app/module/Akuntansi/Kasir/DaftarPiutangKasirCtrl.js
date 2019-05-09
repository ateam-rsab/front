define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPiutangKasirCtrl', ['CacheHelper', '$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir', 'DateHelper', '$mdDialog','DateHelper',
        function(cacheHelper, $state, $q, $rootScope, $scope, modelItemAkuntansi, manageKasir, DateHelper, $mdDialog,dateHelper) {
            function showButton() {
                //$scope.showBtnCetak = true;
                $scope.showBtnBayarTagihan = true;
                $scope.showBtnTutup = true;
            }

            showButton();

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.dataPasienSelected = {};

            var chacePeriode = cacheHelper.get('DaftarPiutangKasir');

            if (chacePeriode != undefined) {
                var arrPeriode = chacePeriode.split(':');
                $scope.item.periodeAwal = new Date(arrPeriode[0]);
                $scope.item.periodeAkhir = new Date(arrPeriode[1]);
            } else {
                $scope.item.periodeAwal = $scope.now;
                $scope.item.periodeAkhir = $scope.now;
            }
            loadData()

            // var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD');
            // var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD');
            // var namaAtauNoReg = undefinedChecker($scope.item.nama);
            // var idPenjamin = undefinedCheckerObject($scope.item.penjamin);
            // var idRuangan = undefinedCheckerObject($scope.item.ruangan);

            // manageKasir.getItem("transaksi/akuntansi/mapping-coa/get-penjamin-list/", true).then(function(dat) {
            //     $scope.listPenjamin = dat.data;
            // });
            // var init = function(a, b, c, d, e) {
            //     manageKasir.getItem("transaksi/kasir/daftar-piutang-pasien?namaPasien=" + a + "&penjaminId=" + b + "&tglAwal=" + c + "&tglAkhir=" + d + "&ruanganId=" + e, true).then(function(dat) {
            //         $scope.listDataMaster = dat.data;

            //         $scope.dataSource = new kendo.data.DataSource({
            //             pageSize: 10,
            //             data: $scope.listDataMaster,
            //             autoSync: true,
            //             schema: {
            //                 model: {
            //                     fields: {
            //                         tanggalMasuk: { type: "date" },
            //                         tanggalPulang: { type: "date" }
            //                     }
            //                 }
            //             }

            //         });
            //     });
            //     return $scope.dataSource;
            // }
            // init(namaAtauNoReg, idPenjamin, tglAwal, tglAkhir, idRuangan);

            function loadData(){
                //FITER
                var tglAwal1=dateHelper.formatDate($scope.item.periodeAwal,"YYYY-MM-DD");
                var tglAkhir1=dateHelper.formatDate($scope.item.periodeAkhir,"YYYY-MM-DD");
                var nm = "&namaPasien=" + $scope.item.nama;
                if($scope.item.nama == undefined){
                    var nm = "";
                };
                 var pj = "";
                if($scope.item.penjamin != undefined){
                    var pj = "&penjaminID=" + $scope.item.penjamin.id;
                };
                var rg = "";
                if($scope.item.ruangan != undefined){
                    var rg = "&ruanganId=" + $scope.item.ruangan.id;
                };
                debugger;   
                manageKasir.getItem("transaksi/piutang/daftar-piutang-layanan?"
                    +"tglAwal=" + tglAwal1 
                    + "&tglAkhir=" + tglAkhir1 
                    + nm 
                    + pj 
                    + rg).then(function(data){
                        $scope.dataSource=data;
                        for (var x=0 ;x< $scope.dataSource.data.length;x++){
                            var element = $scope.dataSource.data[x];
                            element.sisaBayar= element.totalKlaim - element.totalBayar
                          }
                        for (var i = 0; i < data.length; i++) {
                            Things[i]
                        }
                        
                        
                    });
                    var chacePeriode = tglAwal1 + ":" + tglAkhir1;
                    cacheHelper.set('DaftarPiutangKasir', chacePeriode);
                    
                };

            //GET DATA RUANGAN
            $q.all([
                modelItemAkuntansi.getDataGeneric("ruangan"),
                ]).then(function(data) {
                    $scope.listRuangan = data[0];
                });

                $scope.formatTanggal = function(tanggal) {
                    if (tanggal != "null") {
                        return moment(tanggal).format('DD-MMM-YYYY');
                    } else {
                        return "-";
                    }

                }

                $scope.formatRupiah = function(value, currency) {
                    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
                }
                // $scope.columnDaftarPiutang = [{
                //     "field": "tanggalMasuk",
                //     "title": "Tanggal Masuk",
                //     "template": "<span class='style-left'>{{formatTanggal('#: tanggalMasuk #')}}</span>"
                // },
                // {
                //     "field": "noRegistrasi",
                //     "title": "No Registrasi"
                // },
                // {
                //     "field": "namaPasien",
                //     "title": "Nama Pasien"
                // },
                // {
                //     "field": "namaPenjamin",
                //     "title": "Nama Penjamin"
                // },
                // {
                //     "field": "totalTagihan",
                //     "title": "Total Tagihan",
                //     "template": "<span class='style-right'>{{formatRupiah('#: totalTagihan #', 'Rp.')}}</span>"
                // },
                // {
                //     "field": "totalBayar",
                //     "title": "Total Bayar",
                //     "template": "<span class='style-right'>{{formatRupiah('#: totalBayar #', 'Rp.')}}</span>"
                // },
                // {
                //     "field": "sisaBayar",
                //     "title": "Sisa",
                //     "template": "<span class='style-right'>{{formatRupiah('#: sisaBayar #', 'Rp.')}}</span>"
                // }
                // ];
                $scope.columnDaftarPiutang = [
                {
                    "field": "tglTransaksi",
                    "title": "Tanggal Masuk",
                    "width":"50px",
                    "template": "<span class='style-left'>{{formatTanggal('#: tglTransaksi #')}}</span>"
                },
                {
                    "field": "umur",
                    "title": "Umur Piutang",
                    "template": "<span class='style-left'>{{('#: umur #')}}</span>",
                    "width":"100px"
                },
                {
                    "field": "noRegistrasi",
                    "title": "No Registrasi",
                    "width":"50px"
                },
                {
                    "field": "namaPasien",
                    "title": "Nama Pasien",
                    "width":"150px"
                },
                {
                    "field": "jenisPasien",
                    "title": "Nama Penjamin",
                    "width":"100px"
                },
                {
                    "field": "totalKlaim",
                    "title": "Total Tagihan",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalKlaim #', 'Rp.')}}</span>",
                    "width":"100px"
                },
                {
                    "field": "totalBayar",
                    "title": "Total Bayar",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalBayar #', 'Rp.')}}</span>",
                    "width":"100px"
                },
                {
                    "field": "sisaBayar",
                    "title": "Sisa",
                    "template": "<span class='style-right'>{{formatRupiah('#: sisaBayar #', 'Rp.')}}</span>",
                    "width":"100px"
                },
                {
                    "field": "status",
                    "title": "Status",
                    "width":"100px"
                }
                ];
                $scope.mainGridOptions = {
                    pageable: true,
                    sortable: true,
                    columns: $scope.columnDaftarPiutang,
                    editable: "popup",
                    selectable: "row",
                    scrollable: false
                };
                $scope.Cetak = function() {

                }

                $scope.BayarTagihan = function() {
                    $state.go('PembayaranPiutangKasir', {
                    /*noCM: $scope.noCM,
                    tanggal: $state.params.TglRegistrasi*/
                });
                }

                $scope.Tutup = function() {

                }

                function checkValue(obj, param) {
                    var res = "";
                    var data = undefined;

                    if (param.length > 1) {
                        if (obj[param[0]] != undefined)
                            data = obj[param[0]][param[1]];
                    } else {
                        data = obj[param[0]];
                    }

                    if (data != undefined)
                        var res = data;

                    return res;
                };
                $scope.ClearSearch = function() {
                    $scope.item = {};
                    $scope.item.periodeAwal = $scope.now;
                    $scope.item.periodeAkhir = $scope.now;
                    $scope.item.penjamin = { namaExternal: "" };
                    var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD');
                    var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD');
                    var namaAtauNoReg = undefinedChecker($scope.item.nama);
                    var idPenjamin = undefinedCheckerObject($scope.item.penjamin);
                    var idRuangan = undefinedCheckerObject($scope.item.ruangan);
                    init(namaAtauNoReg, idPenjamin, tglAwal, tglAkhir, idRuangan);
                }

            //fungsi search data
            $scope.cariData = function() {
                loadData()
                // var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD');
                // var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD');
                // var namaAtauNoReg = undefinedChecker($scope.item.nama);
                // var idPenjamin = undefinedCheckerObject($scope.item.penjamin);
                // var idRuangan = undefinedCheckerObject($scope.item.ruangan);


                // var chacePeriode = tglAwal + ":" + tglAkhir;
                // cacheHelper.set('DaftarPiutangKasir', chacePeriode);
                // init(namaAtauNoReg, idPenjamin, tglAwal, tglAkhir, idRuangan);
            }

            function undefinedCheckerObject(data) {
                var temp = "";

                if (!_.isUndefined(data)) {
                    temp = data.id;
                }
                return temp;
            }
            //PENGECEKAN UNTUK DATA/PARAMETER KOSONG
            function undefinedChecker(data) {
                var temp = "";

                if (!_.isUndefined(data)) {
                    temp = data;
                }
                return temp;
            }
            $scope.klik = function(current) {

                $scope.current = current;
                $scope.item.norecSPP = current.norecSPP;
            };
            $scope.bayarTagihan = function() {
                $scope.changePage("PembayaranPiutangKasir");
            }

            $scope.Perbaharui = function() {
                $scope.ClearSearch();
            }

            $scope.DetailBiaya = function() {
                $scope.changePage("DetailTagihanKasir");
            }

            $scope.changePage = function(stateName) {
                debugger;
                if ($scope.dataPasienSelected.noRec != undefined) {
                    var obj = {
                        noRegistrasi: $scope.dataPasienSelected.noRec
                    }

                    $state.go(stateName, {
                        dataPasien: JSON.stringify(obj)
                    });
                } else {
                    var alertDialog = modelItemAkuntansi.showAlertDialog("Informasi",
                        "Silahkan pilih data pasien terlebih dahulu", "Ok");

                    $mdDialog.show(alertDialog).then(function() {

                    });
                }
            }



        }
        ]);
});