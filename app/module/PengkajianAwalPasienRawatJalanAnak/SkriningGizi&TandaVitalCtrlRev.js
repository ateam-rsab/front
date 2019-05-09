define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SkriningGizi&TandaVitalCtrlRev', ['$q', '$rootScope', '$scope', '$mdDialog', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'FindPasien', 'ManagePasien', 'ManageServicePhp',
        function($q, $rootScope, $scope,  $mdDialog, ModelItem, $state, cacheHelper, dateHelper, FindPasien, ManagePasien, manageServicePhp) {
        $scope.item = {};
        $scope.model = {};
        $scope.data = {};
        var responData='';
        var nocmfk='';    
        var keterangan1='';
        var keterangan2='';
        var status='';
        var alergi="";
        var statinfeksi=";"
        $scope.now = new Date();
        $scope.currentNorecPD = $state.params.norecPD;
        $scope.isRouteLoading = false;
        $scope.disabled=true;
        $scope.disabled1=true;
        firstLoad();            
            
        function firstLoad(){
            $scope.isRouteLoading = true;
            manageServicePhp.getDataTableTransaksi("operator/get-data-header-bayi?norec="
              +$scope.currentNorecPD
            ).then(function (e) {
                   var datas = e.data[0]; 
                   HistoriVital();
                   $scope.item.noregistrasi=datas.noregistrasi;
                   $scope.item.nocm=datas.nocm;
                   $scope.item.namapasien=datas.namapasien;
                   $scope.item.tglregistrasi=datas.tglregistrasi;
                   $scope.item.jeniskelamin=datas.jeniskelamin;
                   $scope.item.alamatlengkap=datas.alamatlengkap;
                   $scope.item.tgllahir=datas.tgllahir;
                   $scope.item.namaruangan=datas.namaruangan;
                   $scope.item.notelepon=datas.notelepon;
                   $scope.item.jenispelayanan= datas.jenispelayanan;
                   $scope.isRouteLoading = false;                     
            });
        }

        $scope.klikGrid=function(){
            if($scope.PasienSelected != undefined){
                $scope.data.Suhu = $scope.PasienSelected.suhu
                $scope.data.Nadi = $scope.PasienSelected.nadi
                $scope.data.Pernapasan = $scope.PasienSelected.pernapasan
                $scope.data.Tdarah = $scope.PasienSelected.tekanandarah
                $scope.data.bBadan = $scope.PasienSelected.beratbadan
                $scope.data.TBadan = $scope.PasienSelected.tinggibadan
                $scope.data.Lkepala = $scope.PasienSelected.lingkarkepala
                if($scope.PasienSelected.keteranganalergi != undefined && $scope.PasienSelected.keteranganalergi != "-"){
                    $scope.model.chkAlergi = true
                    $scope.disabled=false;
                    $scope.item.Alergi = $scope.PasienSelected.keteranganalergi
                }else{
                    $scope.model.chkAlergi = false
                    $scope.disabled=true;
                }
                if($scope.PasienSelected.keteranganinfeksi != undefined && $scope.PasienSelected.keteranganinfeksi != "-"){
                    $scope.model.chkInfeksi = true
                    $scope.disabled1=false;
                    $scope.item.Infeksi = $scope.PasienSelected.keteranganinfeksi
                }else{
                    $scope.model.chkInfeksi = false
                    $scope.disabled1=true;
                }
            }
        }

        function HistoriVital(){        
            manageServicePhp.getDataTableTransaksi("operator/get-data-vital?norec="
              +$scope.currentNorecPD
            ).then(function (e) {
                var datas = e.data;
                for (var i = 0; i < datas.length; i++) {
                    if(datas[i].alergi == true){
                        keterangan1=datas[i].keterangan;
                    }else{
                        keterangan1="-"
                    }

                    if(datas[i].infeksi == true){
                        keterangan2=datas[i].keteranganinfeksi;
                    }else{
                        keterangan2="-"
                    }

                    datas[i].no = i+1
                    var Dsuhu=datas[i].suhu +  "   " +"°C"
                    var Dnadi=datas[i].nadi +  "   " + "x/menit"
                    var Dpernapasan=datas[i].pernapasan +  "   " + "x/menit"
                    var Dtekanandarah=datas[i].tekanandarah +  "    " + "mmHg"
                    var Dberatbadan=datas[i].beratbadan +  "    " + "gram"
                    var Dtinggibadan=datas[i].tinggibadan +  "    " + "cm"
                    var Dlingkarkepala=datas[i].lingkarkepala +  "   "  + "cm"
                    datas[i].Dsuhu=Dsuhu
                    datas[i].Dnadi=Dnadi
                    datas[i].Dpernapasan=Dpernapasan
                    datas[i].Dtekanandarah=Dtekanandarah
                    datas[i].Dberatbadan=Dberatbadan
                    datas[i].Dtinggibadan=Dtinggibadan
                    datas[i].Dlingkarkepala=Dlingkarkepala
                    datas[i].keteranganalergi=keterangan1
                    datas[i].keteranganinfeksi=keterangan2
                }
                $scope.DaftarPasien = new kendo.data.DataSource({
                    data: datas,
                    pageSize: 10,
                    total: datas.length,
                    serverPaging: false,
                    schema: {
                        model: {
                            fields: {
                            }
                        }
                    }
                });                
            });
        }

        $scope.columnDaftarPasien = [
            {
                "field": "no",
                "title": "No",
                "width":"30px",
            },
            {
                "field": "tglinput",
                "title": "Tgl Input",
                "width":"80px",
                "template": "<span class='style-left'>{{formatTanggal('#: tglinput #')}}</span>"
            },
            {
                "field": "Dsuhu",
                "title": "Suhu",
                "width":"90px"
            },
            {
                "field": "Dnadi",
                "title": "Nadi",
                "width":"70px",
                // "template": "<span class='style-center'>#: nocm #</span>"
            },                
            {
                "field": "Dpernapasan",
                "title": "Pernapasan",
                "width":"100px",
                // "template": "<span class='style-left'>#: namaruangan #</span>"
            },
            {
                "field": "Dtekanandarah",
                "title": "Tekanan Darah",
                "width":"100px",
                // "template": "<span class='style-left'>#: namadokter #</span>"
            },
            {
                "field": "Dberatbadan",
                "title": "Berat Badan",
                "width":"100px",
                // "template": "<span class='style-left'>#: kelompokpasien #</span>"
            },
            {
                "field": "Dtinggibadan",
                "title": "Panjang Badan",
                "width":"100px",
                // "template": "<span class='style-left'>#: namarekanan #</span>"
            },
            {
                "field": "Dlingkarkepala",
                "title": "Lingkaran kepala",
                "width":"100px",
                // "template": "<span class='style-left'>{{formatTanggal('#: tglpulang #')}}</span>"
            },
            {
                "field": "keteranganalergi",
                "title": "Alergi",
                "width":"150px",
                // "template": "<span class='style-left'>#: namarekanan #</span>"
            },
            {
                "field": "keteranganinfeksi",
                "title": "Infeksi",
                "width":"150px",
                // "template": "<span class='style-left'>#: namarekanan #</span>"
            },
        ];

        $scope.formatTanggal = function(tanggal){
           return moment(tanggal).format('DD-MMM-YYYY HH:mm');
        }

        $scope.chkalergi = function(){
            // ;
            if($scope.model.chkAlergi == true){
                $scope.disabled=false;
                $scope.focus=true;
            }else{
                $scope.disabled=true;
            }
        }

        $scope.chkinfeksi = function(){
            // ;
            if($scope.model.chkInfeksi == true){
                $scope.disabled1=false;
                $scope.focus=true;
            }else{
                $scope.disabled1=true;
            }
        }

        $scope.Save=function(){
            
            var Suhu = "";
            if ( $scope.data.Suhu != undefined) {
               Suhu = $scope.data.Suhu;
            } 
            var Nadi = "";
            if ( $scope.data.Nadi != undefined) {
                Nadi = $scope.data.Nadi;
            }
            var Pernapasan = "";
            if ( $scope.data.Pernapasan != undefined) {
               Pernapasan = $scope.data.Pernapasan;
            } 
            var Tdarah= "";
            if ( $scope.data.Tdarah !=  undefined) {
                Tdarah =  $scope.data.Tdarah;
            }

            var bBadan = "";
            if ( $scope.data.bBadan !=  undefined) {
                bBadan =  $scope.data.bBadan;    
            }

            var tBadan= "";
            if ( $scope.data.TBadan !=  undefined) {
                tBadan =  $scope.data.TBadan;
            }

            var lKepala = "";
            if ($scope.data.Lkepala != undefined){
                lKepala = $scope.data.Lkepala;
            }

            var Keterangan = "";
            if ($scope.model.chkAlergi == true ) {
                alergi="t";
                if($scope.item.Alergi != undefined){
                    Keterangan = $scope.item.Alergi;
                }else{
                    Keterangan = "-"
                }
            }else{
                alergi="f";
            }

            var Ketinfeksi = "";
            if ($scope.model.chkInfeksi == true ) {
                statinfeksi="t";
                if($scope.item.Infeksi != undefined){
                    Ketinfeksi = $scope.item.Infeksi;
                }else{
                    Ketinfeksi = "-"
                }
            }else{
                statinfeksi="f";
            }

            var norecpap = ""
            if ($scope.PasienSelected.norecpap != undefined){
                norecpap = $scope.PasienSelected.norecpap;
            }
                                
            var tandavital = {
                norecpap: norecpap,
                tglinput: moment($scope.now).format('YYYY-MM-DD HH:mm:ss'),
                alergi: alergi,
                infeksi: statinfeksi,
                beratbadan: bBadan,
                lingkarkepala: lKepala,
                nadi:  Nadi,
                alergi: alergi,
                beratbadan: bBadan,
                lingkarkepala: lKepala,
                nadi:  Nadi,
                objectpasienfk: $scope.currentNorecPD,
                pernapasan: Pernapasan,
                suhu: Suhu,
                tekanandarah: Tdarah,
                tinggibadan: bBadan,
                keterangan: Keterangan,
                ketinfeksi: Ketinfeksi

            }

            var objSave = {
                datas: tandavital,
            }
          
            manageServicePhp.simpantandavital(objSave).then(function (e) {
                // $scope.resultAPD=e.data.dataAPD;
                responData=e.data;
                $scope.isSimpan = true;
                $scope.isBatal = true;
                $scope.isNext=false;
                hapusData();
                HistoriVital();
           })

            function hapusData(){
                $scope.data.Suhu="";
                $scope.data.Nadi="";
                $scope.data.Pernapasan="";
                $scope.data.Tdarah="";
                $scope.data.bBadan="";
                $scope.data.TBadan="";
                $scope.data.Lkepala="";
                $scope.item.Alergi="";
                $scope.item.Infeksi="";
                $scope.model.chkAlergi=false;
                $scope.model.chkInfeksi=false;
            }

           //##save Logging user
           // manageServicePhp.getDataTableTransaksi("logging/save-log-pindah-ruangan?norec_apd="
           //      + $scope.resultAPD.norec
           //       ).then(function(data) {
           //  }) 
        }
        }
    ]);
        // }
});