define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarNonLayananKasirCtrl', ['CacheHelper', '$timeout', '$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir','DateHelper',
        function(cacheHelper, $timeout, $state, $q, $rootScope, $scope, modelItemAkuntansi,manageKasir,dateHelper) {
            function showButton() {
                // $scope.showBtnBayarTagihan = true;
                // $scope.showBtnPerbaharui = true;
                // $scope.showBtnDetail = true;
            }

            showButton();

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            // $scope.item.periodeAwal = new Date();
            // $scope.item.periodeAkhir = new Date();
                                  
            $scope.item.periodeAwal = dateHelper.setJamAwal(new Date());
            $scope.item.periodeAkhir = dateHelper.setJamAkhir(new Date());

            $scope.isRouteLoading=false;


            $scope.dataPasienSelected = {};


            $q.all([
                modelItemAkuntansi.getDataTableTransaksi("kasir/daftar-tagihan-non-layanan?namaPelanggan=" + $scope.item.namaPelanggan + "&status=" + $scope.item.status + "&tglAwal=" + moment($scope.item.periodeAwal).format('YYYY-MM-DD') + "&tglAkhir=" + moment($scope.item.periodeAkhir).format('YYYY-MM-DD')),
                manageKasir.getDataGeneric("KelompokTransaksi&select=id,kelompoktransaksi&criteria=qKelompokTransaksi&values=5")
                ]).then(function(data) {
                    if (data[0].statResponse) {
                        var dataFilter =[]
                        debugger;
                        for (var i = 0; i < data[0].length; i++) {
                            if (data[0][i].jenisTagihanId != 70 ) {
                                if (data[0][i].jenisTagihanId != 71) {
                                    if (data[0][i].jenisTagihanId != 62) {
                                        dataFilter.push(data[0][i])
                                    }
                                    
                                }
                            }
                        }
                        $scope.dataDaftarNonLayanan = new kendo.data.DataSource({
                            
                            data: dataFilter,
                            pageSize: 10,
                            total: dataFilter.length,
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
                var data = cacheHelper.get('DaftarNonLayananKasirCtrl');
                if (data !== undefined) {
                    var splitResultData = data.split("#");

                    $scope.item.periodeAwal = dateHelper.setJamAwal(new Date(splitResultData[0]));
                    $scope.item.periodeAkhir = dateHelper.setJamAkhir(new Date(splitResultData[1]));
                }


                $timeout($scope.SearchData, 500);

            });

                $scope.formatTanggal = function(tanggal) {
                    return moment(tanggal).format('DD-MMM-YYYY HH:mm');
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
                    $scope.changePage2("PembayaranTagihanNonLayananKasir");
                }
            }
            $scope.changePage2 = function(stateName){
                debugger;
                if($scope.dataPasienSelected.noRec != undefined)
                {
                    var obj = {
                        noRegistrasi : $scope.dataPasienSelected.noRec
                    }
                    var tempCache = $scope.dataPasienSelected.noRec + "#0#DaftarNonLayananKasir" ;
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
                $scope.item.periodeAwal = dateHelper.setJamAwal(new Date());
                $scope.item.periodeAkhir = dateHelper.setJamAkhir(new Date());

                $scope.SearchData();
            }

            $scope.Detail = function() {
                var tempCache = $scope.dataPasienSelected.noRec + "#1#DaftarNonLayananKasir" ;
                cacheHelper.set('PembayaranTagihanNonLayananKasir', tempCache);
                $state.go('PembayaranTagihanNonLayananKasir')//, {
                //     dataPasien: JSON.stringify(obj)
                // });
            }
            $scope.InputTagihan=function(){
                $state.go('InputTagihanNonLayanan')
            }

            //fungsi search data
            $scope.SearchData = function() {
                //kriteria pencarian
                var namaPelanggan = checkValue($scope.item, ["namaPelanggan"]);
                var tanggalAwal = checkValue($scope.item, ["periodeAwal"]);
                var tanggalAkhir = checkValue($scope.item, ["periodeAkhir"]);
                var status = checkValue($scope.item, ["status", "namaExternal"]);
                var jenisTagihan = checkValue($scope.item, ["kelompokTransaksi", "id"]);

                tanggalAwal = moment(tanggalAwal).format('YYYY-MM-DD HH:mm');
                tanggalAkhir = moment(tanggalAkhir).format('YYYY-MM-DD HH:mm');

                var tempCache = tanggalAwal + "#" + tanggalAkhir;
                cacheHelper.set('DaftarNonLayananKasirCtrl', tempCache);
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
                $scope.isRouteLoading=true;
                modelItemAkuntansi.getDataTableTransaksi("kasir/daftar-tagihan-non-layanan?namaPelanggan=" + a + "&status=" + b + "&tglAwal=" + c + "&tglAkhir=" + d + "&jenisTagihanId=" + e).then(function(data) {
                    //manageKasir.getItem("transaksi/kasir/daftar-piutang-pasien?namaPasien=" + a + "&penjaminId=" + b + "&tglAwal=" + c + "&tglAkhir=" + d + "&ruanganId=" + e, true).then(function(dat) {
                    //$scope.listDataMaster = dat.data;
                    debugger;
                    var dataFilter = []
                    // for (var x=0;x < data.length;x++){
                    //      if (data[x].jenisTagihanId != 62){
                    //         dataFilter.push(data[x])
                    //     }                          
                    // }
                    for (var i = 0; i < data.length; i++) {
                            if (data[i].jenisTagihanId != 70 ) {
                                if (data[i].jenisTagihanId != 71) {
                                    if (data[i].jenisTagihanId != 62) {
                                        dataFilter.push(data[i])
                                    }
                                    
                                }
                            }
                        }
                    $scope.isRouteLoading=false;
                    $scope.dataDaftarNonLayanan = new kendo.data.DataSource({
                        data: dataFilter,//data,
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