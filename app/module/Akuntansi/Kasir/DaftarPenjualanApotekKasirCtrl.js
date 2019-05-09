define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPenjualanApotekKasirCtrl', ['CacheHelper', '$timeout', '$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir',
        function(cacheHelper, $timeout, $state, $q, $rootScope, $scope, modelItemAkuntansi,manageKasir) {
            function showButton() {
                // $scope.showBtnBayarTagihan = true;
                // $scope.showBtnPerbaharui = true;
                // $scope.showBtnDetail = true;
            }
            var kelompokTrandID = 0
            $scope.judul = false;
            $scope.judul2 = false;
            $scope.judul3 = false;
            $state.params.dataFilter;
            if ($state.params.dataFilter == "obatBebas") {
                kelompokTrandID  = 62
                $scope.judul = true;
            }
            if ($state.params.dataFilter == "terimaUmum") {
                kelompokTrandID  = 70
                $scope.judul2 = true;
            }
            if ($state.params.dataFilter == "keluarUmum") {
                kelompokTrandID  = 71
                $scope.judul3 = true;
            }

            showButton();

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.periodeAwal = new Date();
            $scope.item.periodeAkhir = new Date();


            $scope.dataPasienSelected = {};


            $q.all([
                modelItemAkuntansi.getDataTableTransaksi("kasir/daftar-tagihan-non-layanan?jenisTagihanId="+kelompokTrandID+"&namaPelanggan=" + $scope.item.namaPelanggan + "&status=" + $scope.item.status + "&tglAwal=" + moment($scope.item.periodeAwal).format('YYYY-MM-DD') + "&tglAkhir=" + moment($scope.item.periodeAkhir).format('YYYY-MM-DD')),
                manageKasir.getDataGeneric("KelompokTransaksi&select=id,kelompoktransaksi&criteria=qKelompokTransaksi&values=5")
                ]).then(function(data) {
                    if (data[0].statResponse) {
                        $scope.dataDaftarNonLayanan = new kendo.data.DataSource({
                            data: data[0],
                            pageSize: 10,
                            total: data[0].length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                        tglTransaksi: { type: "date" }
                                    }
                                }
                            }
                        });
                        $scope.listKelompokTransaksi = data[1];
                    }

                    $scope.listStatus =[
                    {id:1, namaExternal:"Lunas"},
                    {id:2, namaExternal:"Belum Bayar"} 
        ]// manageKasir.getStatus();
                //Set all date 
                //$scope.item.periodeAwal = $scope.now;
                //$scope.item.periodeAkhir = $scope.now;
                //Cek cache apabila sudah ada
                var data = cacheHelper.get('DaftarPenjualanApotekKasirCtrl');
                if (data !== undefined) {
                    var splitResultData = data.split("#");

                    $scope.item.periodeAwal = new Date(splitResultData[0]);
                    $scope.item.periodeAkhir = new Date(splitResultData[1]);
                }


                $timeout($scope.SearchData, 500);

            });

                $scope.formatTanggal = function(tanggal) {
                    return moment(tanggal).format('DD-MMM-YYYY');
                }

                function formatRupiah(value, currency) {
                    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                }

                $scope.columnDaftarNonLayanan = [{
                    "field": "tglTransaksi",
                    "title": "Tanggal",
                    "width": "150px",
                    "template": "<span class='style-left'>{{formatTanggal('#: tglTransaksi #')}}</span>"
                },
                {
                    "field": "namaPelanggan",
                    "title": "Nama Pelanggan",
                    "width": "150px",
                    "template": "<span class='style-left'>#: namaPelanggan #</span>"
                },
                {
                    "field": "jenisTagihan",
                    "title": "Jenis Tagihan",
                    "width": "150px",
                    "template": "<span class='style-center'>#: jenisTagihan #</span>"
                },
                {
                    "field": "total",
                    "title": "Jumlah",
                    "width": "150px"//,
                    //"template": "<span class='style-right'>{{formatRupiah('#: total #', 'Rp.')}}</span>"
                },
                {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width": "150px",
                    "template": "<span class='style-left'>#: keterangan #</span>"
                },
                {
                    "field": "statusBayar",
                    "title": "Status",
                    "width": "150px",
                    "template": "<span class='style-center'>#: statusBayar #</span>"
                }
                ];



                $scope.Cetak = function() {

                }

                $scope.Bayar = function() {
                    debugger;
                //cacheHelper.set('PembayaranTagihanNonLayananKasir', $scope.listPegawai);
                //$scope.changePage("PembayaranTagihanNonLayananKasir");
                if($scope.dataPasienSelected.statusBayar == "Lunas"){

                    var alertDialog = modelItemAkuntansi.showAlertDialog("Informasi", 
                        "Tagihan sudah Lunas", "Ok");

                    $mdDialog.show(alertDialog).then(function() {

                    });
                }
                else
                {
                    if ($state.params.dataFilter == "obatBebas") {
                        //$scope.changePage2("PembayaranTagihanNonLayananKasir");
                        var obj = {
                            noRegistrasi : $scope.dataPasienSelected.noRec
                        }
                        var tempCache = $scope.dataPasienSelected.noRec + "#0#DaftarPenjualanApotekKasir/obatBebas#"  ;
                        cacheHelper.set('PembayaranTagihanNonLayananKasir', tempCache);
                        $state.go("PembayaranTagihanNonLayananKasir", {
                            dataPasien: JSON.stringify(obj)
                        });
                    }
                    if ($state.params.dataFilter == "terimaUmum") {
                        var obj = {
                            noRegistrasi : $scope.dataPasienSelected.noRec
                        }
                        var tempCache = $scope.dataPasienSelected.noRec + "#0#DaftarPenjualanApotekKasir/terimaUmum#"  ;
                        cacheHelper.set('PembayaranTagihanNonLayananKasir', tempCache);
                        $state.go("PembayaranTagihanNonLayananKasir", {
                            dataPasien: JSON.stringify(obj)
                        });
                    }
                    if ($state.params.dataFilter == "keluarUmum") {
                        var tempData=$scope.dataPasienSelected.jenisTagihan
                          +"#"+$scope.dataPasienSelected.jenisTagihan+" a/n "+$scope.dataPasienSelected.namaPelanggan
                          +"#"+$scope.dataPasienSelected.jenisTagihan
                          +"#"+$scope.dataPasienSelected.jenisTagihan
                          +"#"+$scope.dataPasienSelected.jenisTagihan
                          +"#"+$scope.dataPasienSelected.noRec
                          +"#"+$scope.dataPasienSelected.total
                          +"#DaftarPenjualanApotekKasir/keluarUmum"
                          //setting caching
                        cacheHelper.set('PembayaranTagihan', tempData);
                        $state.go('PembayaranTagihan')
                    }
                    
                }
            }
            $scope.changePage2 = function(stateName){
                debugger;
                if($scope.dataPasienSelected.noRec != undefined)
                {
                    var obj = {
                        noRegistrasi : $scope.dataPasienSelected.noRec
                    }
                    var tempCache = $scope.dataPasienSelected.noRec + "#0#DaftarPenjualanApotekKasir#"  ;
                    cacheHelper.set('PembayaranTagihanNonLayananKasir', tempCache);
                    $state.go(stateName, {
                        dataPasien: JSON.stringify(obj)
                    });
                }
                else
                {
                    var alertDialog = modelItemAkuntansi.showAlertDialog("Informasi", 
                        "Silahkan pilih data terlebih dahulu", "Ok");

                    $mdDialog.show(alertDialog).then(function() {

                    });
                }
            }

            $scope.Perbaharui = function() {

            }

            $scope.changePage = function(stateName) {
                if ($scope.dataPasienSelected.noRec != undefined) {
                    $state.go(stateName, {
                        //ataPasien: JSON.stringify($scope.dataPasienSelected)
                    });
                } else {
                    alert("Silahkan pilih data pasien terlebih dahulu");
                }
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
            }

            function isInt(value) {
                var er = /^-?[0-9]+$/;

                return er.test(value);
            }

            //fungsi clear kriteria search
            $scope.ClearSearch = function() {
                $scope.item = {};
                $scope.item.periodeAwal = $scope.now;
                $scope.item.periodeAkhir = $scope.now;

                $scope.SearchData();
            }

            $scope.Detail = function() {
                if ( $scope.dataPasienSelected.statusBayar != "Lunas") {
                    debugger;
                    if ($state.params.dataFilter == "obatBebas") {
                        //$scope.changePage2("PembayaranTagihanNonLayananKasir");
                        var obj = {
                            noRegistrasi : $scope.dataPasienSelected.noRec
                        }
                        var tempCache = $scope.dataPasienSelected.noRec + "#0#DaftarPenjualanApotekKasir/obatBebas#"  ;
                        cacheHelper.set('PembayaranTagihanNonLayananKasir', tempCache);
                        $state.go("PembayaranTagihanNonLayananKasir", {
                            dataPasien: JSON.stringify(obj)
                        });
                    }
                    if ($state.params.dataFilter == "terimaUmum") {
                        var obj = {
                            noRegistrasi : $scope.dataPasienSelected.noRec
                        }
                        var tempCache = $scope.dataPasienSelected.noRec + "#0#DaftarPenjualanApotekKasir/terimaUmum#"  ;
                        cacheHelper.set('PembayaranTagihanNonLayananKasir', tempCache);
                        $state.go("PembayaranTagihanNonLayananKasir", {
                            dataPasien: JSON.stringify(obj)
                        });
                    }
                    if ($state.params.dataFilter == "keluarUmum") {
                        var tempData=$scope.dataPasienSelected.jenisTagihan
                          +"#"+$scope.dataPasienSelected.jenisTagihan+" a/n "+$scope.dataPasienSelected.namaPelanggan
                          +"#"+$scope.dataPasienSelected.jenisTagihan
                          +"#"+$scope.dataPasienSelected.jenisTagihan
                          +"#"+$scope.dataPasienSelected.jenisTagihan
                          +"#"+$scope.dataPasienSelected.noRec
                          +"#"+$scope.dataPasienSelected.total
                          +"#DaftarPenjualanApotekKasir/keluarUmum"
                          //setting caching
                        cacheHelper.set('PembayaranTagihan', tempData);
                        $state.go('PembayaranTagihan')
                    }
                //     dataPasien: JSON.stringify(obj)
                // });
                }else{
                     debugger;
                    if ($state.params.dataFilter == "obatBebas") {
                        //$scope.changePage2("PembayaranTagihanNonLayananKasir");
                        var obj = {
                            noRegistrasi : $scope.dataPasienSelected.noRec
                        }
                        var tempCache = $scope.dataPasienSelected.noRec + "#1#DaftarPenjualanApotekKasir/obatBebas#"  ;
                        cacheHelper.set('PembayaranTagihanNonLayananKasir', tempCache);
                        $state.go("PembayaranTagihanNonLayananKasir", {
                            dataPasien: JSON.stringify(obj)
                        });
                    }
                    if ($state.params.dataFilter == "terimaUmum") {
                        var obj = {
                            noRegistrasi : $scope.dataPasienSelected.noRec
                        }
                        var tempCache = $scope.dataPasienSelected.noRec + "#1#DaftarPenjualanApotekKasir/terimaUmum#"  ;
                        cacheHelper.set('PembayaranTagihanNonLayananKasir', tempCache);
                        $state.go("PembayaranTagihanNonLayananKasir", {
                            dataPasien: JSON.stringify(obj)
                        });
                    }
                    if ($state.params.dataFilter == "keluarUmum") {
                        var obj = {
                            noRegistrasi : $scope.dataPasienSelected.noRec
                        }
                        var tempCache = $scope.dataPasienSelected.noRec + "#1#DaftarPenjualanApotekKasir/keluarUmum#"  ;
                        cacheHelper.set('PembayaranTagihanNonLayananKasir', tempCache);
                        $state.go("PembayaranTagihanNonLayananKasir", {
                            dataPasien: JSON.stringify(obj)
                        });
                    }
                }
            }

            //fungsi search data
            $scope.SearchData = function() {
                //kriteria pencarian
                var namaPelanggan = checkValue($scope.item, ["namaPelanggan"]);
                var tanggalAwal = checkValue($scope.item, ["periodeAwal"]);
                var tanggalAkhir = checkValue($scope.item, ["periodeAkhir"]);
                var status = checkValue($scope.item, ["status", "namaExternal"]);
                var jenisTagihan = checkValue($scope.item, ["kelompokTransaksi", "id"]);

                tanggalAwal = moment(tanggalAwal).format('YYYY-MM-DD');
                tanggalAkhir = moment(tanggalAkhir).format('YYYY-MM-DD');

                var tempCache = tanggalAwal + "#" + tanggalAkhir;
                cacheHelper.set('DaftarPenjualanApotekKasirCtrl', tempCache);
                init(namaPelanggan, status, tanggalAwal, tanggalAkhir,jenisTagihan);
                /*if (tanggalAwal != "") {
                    //tanggalAwal = moment(tanggalAwal).format('DD-MM-YYYY')
                    //tanggalAwal = new Date(new Date(tanggalAwal)).getTime();
                }

                if (tanggalAkhir != "") {
                    //tanggalAkhir = moment(tanggalAkhir).format('DD-MM-YYYY')
                    //tanggalAkhir = new Date(c(tanggalAkhir)).getTime();
                }

                var kriteriaFilter = [
                    { text: "namaPelanggan", operator: "contains", value: namaPelanggan },
                    { text: "status.namaExternal", operator: "eq", value: status },
                    { text: "tglTransaksi", operator: "gte", value: tanggalAwal },
                    { text: "tglTransaksi", operator: "lte", value: tanggalAkhir }
                    ];*/

                //prosesSearch(kriteriaFilter);
            }

            /*function prosesSearch(kriteriaFilter) {
                var arrFilter = [];
                for (var i = 0; i < kriteriaFilter.length; i++) {
                    if (kriteriaFilter[i].value != "") {
                        var obj = {
                            field: kriteriaFilter[i].text,
                            operator: kriteriaFilter[i].operator,
                            value: kriteriaFilter[i].value
                        };

                        arrFilter.push(obj);
                    }
                }

                var grid = $("#kGrid").data("kendoGrid");
                grid.dataSource.query({
                    page: 1,
                    pageSize: 10,
                    filter: {
                        logic: "and",
                        filters: arrFilter
                    }
                });
            }*/

            var init = function(a, b, c, d,e) {
                modelItemAkuntansi.getDataTableTransaksi("kasir/daftar-tagihan-non-layanan?jenisTagihanId="+kelompokTrandID+"&namaPelanggan=" + a + "&status=" + b + "&tglAwal=" + c + "&tglAkhir=" + d ).then(function(data) {
                    //manageKasir.getItem("transaksi/kasir/daftar-piutang-pasien?namaPasien=" + a + "&penjaminId=" + b + "&tglAwal=" + c + "&tglAkhir=" + d + "&ruanganId=" + e, true).then(function(dat) {
                    //$scope.listDataMaster = dat.data;

                    $scope.dataDaftarNonLayanan = new kendo.data.DataSource({
                        data: data,
                        pageSize: 10,
                        //total: dat.data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                    tglTransaksi: { type: "date" }
                                }
                            }
                        }
                    });
                });
                return $scope.dataDaftarNonLayanan;
            }
        }
        ]);
});