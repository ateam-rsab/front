define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PasienLamaPenunjangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            $scope.item.row = 20
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('DaftarPasienRadiologiCtrl');
              if(chacePeriode != undefined){
               //var arrPeriode = chacePeriode.split(':');
                $scope.item.tglAwal = new Date(chacePeriode[0]);
                $scope.item.tglAkhir = new Date(chacePeriode[1]);
                $scope.item.namaPasien = chacePeriode[2];
                $scope.item.noMr = chacePeriode[3];
                $scope.item.noReg = chacePeriode[4];
               
                //init();
             }
             else{
               $scope.item.tglAwal = $scope.now;
               $scope.item.tglAkhir = $scope.now;
               //init();
             }
           }
            function loadCombo(){
                $scope.isRouteLoading=true;
                manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                    $scope.isRouteLoading=false;
                    $scope.listDepartemen = dat.data.departemen;
                    $scope.listKelompokPasien = dat.data.kelompokpasien;
                });
            }
            function init() {
                $scope.isRouteLoading=true;
                var tgl ="?tgllahir="
                if ($scope.item.tglLahir != undefined){
                    var tgl ="?tgllahir=" +  moment($scope.item.tglLahir).format('YYYY-MM-DD');
                }
                var rm =""
                if ($scope.item.noMr != undefined){
                    var rm ="&nocm=" +$scope.item.noMr
                }
                var nm =""
                if ($scope.item.namaPasien != undefined){
                    var nm ="&namapasien=" +$scope.item.namaPasien
                }

                var row='&row='+$scope.item.row

                // var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD');
                // var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD');
                manageLogistikPhp.getDataTableTransaksi("pasien/get-pasien-lama-penunjang"+tgl+rm+nm+row,true).then(function(dat){
                    $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.length; i++) {
                        dat.data[i].no = i+1
                        var tanggal = $scope.now;
                        var tanggalLahir = new Date(dat.data[i].tgllahir);
                        var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                        dat.data[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                        if (dat.data[i].jeniskelaminfk == 2) {
                            dat.data[i].lp = 'P'
                        }else{
                            dat.data[i].lp = 'L'
                        }
                    }
                   $scope.dataGrid = dat.data;
                });

                

                
            }

            $scope.Regis=function(){
                var chacePeriode ={ 0 : $scope.dataSelected.nocm ,
                    1 : $scope.dataSelected.namapasien,
                    2 : $scope.dataSelected.lp,
                    3 : $scope.dataSelected.umur,
                    4 : $scope.dataSelected.psid    
                }
                cacheHelper.set('RegistrasiPenunjangCtrl', chacePeriode);
                $state.go('RegistrasiPenunjang')
            }
            // $scope.RegistrasiLama=function(){
            //     $state.go('RegistrasiPenunjang')
            // }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
                
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD');
                var chacePeriode ={ 0 : tglAwal ,
                    1 : tglAkhir,
                    2 : $scope.item.namaPasien,
                    3 : $scope.item.noMr,
                    4 : $scope.item.noReg,
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('DaftarPasienRadiologiCtrl', chacePeriode);
            }

            $scope.TransaksiPelayanan = function(){
                debugger;
                var arrStr ={ 0 : $scope.dataSelected.nocm ,
                    1 : $scope.dataSelected.namapasien,
                    2 : $scope.dataSelected.jeniskelamin,
                    3 : $scope.dataSelected.noregistrasi, 
                    4 : $scope.dataSelected.umur,
                    5 : $scope.dataSelected.klid,
                    6 : $scope.dataSelected.namakelas,
                    7 : $scope.dataSelected.tglregistrasi,
                    8 : $scope.dataSelected.norec,
                    9 : $scope.dataSelected.namaruangan,
                    10 : $scope.dataSelected.ruid,
                    11 : $scope.dataSelected.norec_pd
                }
                cacheHelper.set('TransaksiPelayananRadiologiCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologi')
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }


            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "30px",
                },
                {
                    "field": "nocm",
                    "title": "NoMR",
                    "width" : "70px",
                },
                {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width" : "120px",
                },
                {
                    "field": "tgllahir",
                    "title": "Tgl Lahir",
                    "width" : "70px",
                },
                {
                    "field": "lp",
                    "title": "L/P",
                    "width" : "30px",
                },
                {
                    "field": "umur",
                    "title": "Umur",
                    "width" : "70px"
                },
                {
                    "field": "Telp",
                    "title": "No Telepon",
                    "width" : "80px",
                }
            ];

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatTanggal = function(tanggal){
              return moment(tanggal).format('DD/MM/YYYY');
            }
            function itungUsia(tgl){
                debugger;
                // var tg = parseInt(form.elements[0].value);
                // var bl = parseInt(form.elements[1].value);
                // var th = parseInt(form.elements[2].value);
                var tanggal = $scope.now;
                var tglLahir = new Date(tgl);
                var selisih = Date.parse(tanggal.toGMTString()) - Date.parse(tglLahir.toGMTString());
                var thn = Math.round(selisih/(1000*60*60*24*365));
                //var bln = Math.round((selisih % 365)/(1000*60*60*24));
                return thn + ' thn '// + bln + ' bln'
            }
//***********************************

}
]);
});
