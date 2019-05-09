define(['initialize'], function(initialize) {
    'use strict';
    //initialize.controller('DaftarResepCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper',
    initialize.controller('MiniR45Ctrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            // LoadCache();
            // loadCombo();
           //  function LoadCache(){
           //    var chacePeriode = cacheHelper.get('MiniR45Ctrl');
           //    if(chacePeriode != undefined){
           //     //var arrPeriode = chacePeriode.split(':');
           //      $scope.item.tglAwal = new Date(chacePeriode[0]);
           //      $scope.item.tglAkhir = new Date(chacePeriode[1]);
               
                init();
           //   }
           //   else{
           //     $scope.item.tglAwal = $scope.now;
           //     $scope.item.tglAkhir = $scope.now;
           //     init();
           //   }
           // }
            // function loadCombo(){
            //     manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
            //         $scope.listDepartemen = dat.data.departemen;
            //         $scope.listKelompokPasien = dat.data.kelompokpasien;
            //     });
            //     $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            // }
            function init() {
                $scope.isRouteLoading=true;
                var nama =""
                if ($scope.item.nama != undefined){
                    var nama ="&nama=" +$scope.item.nama
                }
                var transaksiid =""
                if ($scope.item.transaksiid != undefined){
                    var transaksiid ="&transaksiid=" +$scope.item.transaksiid
                }
                var mrn =""
                if ($scope.item.nomr != undefined){
                    var mrn ="&mrn=" +$scope.item.nomr
                }
                var alamat =""
                if ($scope.item.alamat != undefined){
                    var alamat ="&alamat=" +$scope.item.alamat
                }
                // var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                // var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("bridging-aerocom/get-hasil_mini-r45?"+nama+transaksiid+mrn+alamat, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.data.length; i++) {
                        dat.data.data[i].no = i+1
                    }
                   // $scope.dataGrid = dat.data.data;
                   $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 15,
                        total: dat.data.data.length,
                        serverPaging: false,
                    });
                });

                // var chacePeriode ={ 0 : tglAwal ,
                //     1 : tglAkhir,
                //     2 : '',
                //     3 : '', 
                //     4 : '',
                //     5 : '',
                //     6 : ''
                // }
                // cacheHelper.set('DaftarResepCtrl2', chacePeriode);

                
            }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
            }

            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }


            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "20px",
                },
                {
                    "field": "warddescription",
                    "title": "Ruangan",
                    "width" : "50px",
                },
                {
                    "field": "transactioncode",
                    "title": "Transaction Code",
                    "width" : "50px",
                },
                {
                    "field": "patientid",
                    "title": "NoMR",
                    "width" : "50px",
                },
                {
                    "field": "patientname",
                    "title": "Nama",
                    "width" : "60px",
                },
                {
                    "field": "sex",
                    "title": "JK",
                    "width" : "20px",
                },
                {
                    "field": "dob",
                    "title": "Tgl Lahir",
                    "width" : "60px",
                },
                {
                    "field": "address",
                    "title": "Alamat",
                    "width" : "100px",
                },
                {
                    "field": "doctor",
                    "title": "Dokter",
                    "width" : "70px",
                },
                {
                    "field": "medicationname",
                    "title": "Jenis",
                    "width" : "50px",
                },
                {
                    "field": "signadescription",
                    "title": "Signa",
                    "width" : "50px",
                }
            ];
            // $scope.mainGridOptions = { 
            //     pageable: true,
            //     columns: $scope.columnProduk,
            //     editable: "popup",
            //     selectable: "row",
            //     scrollable: false
            // };
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
