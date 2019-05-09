define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarResepProduksiSterilCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper) {
            
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            $scope.item.jenis =  $state.params.jenisPelayanan;
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;

            LoadCache();
            loadCombo();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('DaftarResepProduksiSterilCtrl');
              if(chacePeriode != undefined){
               //var arrPeriode = chacePeriode.split(':');
                $scope.item.tglAwal = new Date(chacePeriode[0]);
                $scope.item.tglAkhir = new Date(chacePeriode[1]);
               
                init();
             }
             else{
               $scope.item.tglAwal = $scope.now;
               $scope.item.tglAkhir = $scope.now;
               init();
             }
           }
            function loadCombo(){
                manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                    $scope.listDepartemen = dat.data.departemen;
                    $scope.listKelompokPasien = dat.data.kelompokpasien;
                });
                $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            function init() {
                $scope.isRouteLoading=true;
                var ins =""
                if ($scope.item.instalasi != undefined){
                    var ins ="&dpid=" +$scope.item.instalasi.id
                }
                var rg =""
                if ($scope.item.ruangan != undefined){
                    var rg ="&ruid=" +$scope.item.ruangan.id
                }
      //   "Produksi_NonSteril"
      // "Pelayanan_TPN"
      // "Pelayanan_Handling_Cytotoxic"
      // "Pelayanan_IV_Admixture"
      // "Pelayanan_Repacking_Obat_Injeksi"
                // status
                if ($state.params.jenisPelayanan == "Produksi_NonSteril") {
                    var statussss = "&status=26"
                }
                if ($state.params.jenisPelayanan == "Pelayanan_TPN") {
                    var statussss = "&status=27"
                }
                if ($state.params.jenisPelayanan == "Pelayanan_Handling_Cytotoxic") {
                    var statussss = "&status=28"
                }
                if ($state.params.jenisPelayanan == "Pelayanan_IV_Admixture") {
                    var statussss = "&status=29"
                }
                if ($state.params.jenisPelayanan == "Pelayanan_Repacking_Obat_Injeksi") {
                    var statussss = "&status=30"
                }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("farmasi/get-daftar-resep?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    "&noresep=" + $scope.item.noResep +
                    "&noregistrasi=" + $scope.item.noReg +
                    "&nocm=" + $scope.item.noMr +
                    "&namapasien=" + $scope.item.namaPasien+ins+rg+statussss //+Jra
                    , true).then(function(dat){
                        $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
                        var tanggal = $scope.now;
                        var tanggalLahir = new Date(dat.data.daftar[i].tgllahir);
                        var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                        dat.data.daftar[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                        //itungUsia(dat.data[i].tgllahir)
                    }
                   $scope.dataGrid = dat.data.daftar;
                });

                var chacePeriode ={ 0 : tglAwal ,
                    1 : tglAkhir,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('DaftarResepProduksiSterilCtrl', chacePeriode);

                
            }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
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
                    8 : $scope.dataSelected.norec_apd,
                    9 : 'resep'
                }
                cacheHelper.set('TransaksiPelayananApotikCtrl', arrStr);
                $state.go('TransaksiPelayananApotik')

                var arrStr2 ={ 0 : $scope.dataSelected.norec 
                }
                cacheHelper.set('DaftarResepCtrl', arrStr2);
                $state.go('DaftarResepCtrl')
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
                "width" : "20px",
            },
            {
                "field": "tglresep",
                "title": "Tgl Resep",
                "width" : "50px",
            },
            {
                "field": "noresep",
                "title": "NoResep",
                "width" : "60px",
            },
            {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width" : "60px",
            },
            {
                "field": "nocm",
                "title": "No MR",
                "width" : "50px",
            },
            {
                "field": "namapasien",
                "title": "Nama Pasien",
                "width" : "120px",
            },
            {
                "field": "namaruangan",
                "title": "Nama Ruangan",
                "width" : "100px",
            },
            {
                "field": "dokter",
                "title": "Dokter",
                "width" : "100px"
            },
            {
                "field": "namaruanganapotik",
                "title": "Apotik",
                "width" : "70px",
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
