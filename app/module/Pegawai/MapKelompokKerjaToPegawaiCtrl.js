define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MapKelompokKerjaToPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ManageAkuntansi','$state','CacheHelper','DateHelper',  'ManagePhp','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageAkuntansi,$state,cacheHelper,dateHelper,managePhp,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            $scope.disable=true;
            var pegawaiUser = {}
            loadCombo();  
            LoadCache();      
            function LoadCache(){
              init();
            }
            function loadCombo(){
                managePhp.getData("operator/get-data-combo-operator", false).then(function (data) {
                    $scope.listKkHead = data.data.kelompokkerjahead;
                    $scope.listKkerja = data.data.kelompokkerja;
                });
                modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-dokter", true, true, 20).then(function(data) {
                     $scope.listPegawai = data;
                });
            }

            function init() {
                var kkHead ='' ;
                if ($scope.item.KkHead != undefined) {
                    kkHead = '&kkHead='+ $scope.item.KkHead.id;
                }
                var Kkerja='';
                if ($scope.item.Kkerja != undefined) {
                    Kkerja ='&Kkerja=' + $scope.item.Kkerja.id;
                }

                $scope.isRouteLoading=true;
                manageAkuntansi.getDataTableTransaksi("humas/get-daftar-map-kelompok-kerja?"+kkHead+Kkerja, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var datas = dat.data.datas;
                    for (var i = datas.length - 1; i >= 0; i--) {
                        datas[i].no=i+1
                    }
                   
                   $scope.dataGrid = new kendo.data.DataSource({
                        data: datas,
                        sort:[
                            {
                                field: "kelompokkerjahead",
                                dir:"asc"
                            }
                        ],
                        pageSize: 12
                    });
                });
            }
           
            $scope.cariFilter = function(){
                init();
            }            
            
            $scope.getIdPegawai = function () {

                if ($scope.item.Pegawai != undefined) {
                    $scope.item.IdPegawai = $scope.item.Pegawai.id
                }
                
            }

            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.columnGridExcel ={
                toolbar: ["excel"],
                excel: {
                    fileName: "Map Kelompok Kerja To Pegawai" + moment($scope.item.tglAwal).format( 'DD/MMM/YYYY'),
                    allPages: true,
                },
                sortable: false,
                reorderable: true,
                filterable: false,
                pageable: true,
                columnMenu: false,
                resizable: true,
                selectable: 'row',
                columns:[
                    // {
                    //     "field": "no",
                    //     "title": "No",
                    //     "width" : "35px",
                    // },
                    {
                        "field": "kelompokkerjahead",
                        "title": "Kelompok Kerja Head",
                        "width" : "120px"
                    },
                    {
                        "field": "kelompokkerja",
                        "title": "Kelompok Kerja",
                        "width" : "120px"
                    },
                    {
                        "field": "namalengkap",
                        "title": "Nama Dokter",
                        "width" : "150px"
                    }
                ] 
            }

            $scope.klikGrid = function(dataSelected){
                // $scope.item.id = dataSelected.id
                // $scope.item.noakun = dataSelected.noaccount
                // $scope.item.namaAkun = dataSelected.namaaccount
                // $scope.item.struktur = {id:dataSelected.objectstrukturaccountfk,strukturaccount:dataSelected.strukturaccount}
                // $scope.item.jenis = {id:dataSelected.objectjenisaccountfk,jenisaccount:dataSelected.jenisaccount}
                // $scope.item.kategory = {id:dataSelected.objectkategoryaccountfk,kategoryaccount:dataSelected.kategoryaccount}
                // $scope.item.status = {id:dataSelected.objectstatusaccountfk,statusaccount:dataSelected.statusaccount}
                // if (dataSelected.saldonormaladd == "D") {
                //     $scope.item.saldoAdd={id:1,saldo:"D"}
                // }else{
                //     $scope.item.saldoAdd={id:2,saldo:"K"}
                // }
                // if (dataSelected.saldonormalmin == "D") {
                //     $scope.item.saldoMin={id:1,saldo:"D"}
                // }else{
                //     $scope.item.saldoMin={id:2,saldo:"K"}
                // }
                // if (dataSelected.statusenabled == true) {
                //     $scope.item.statusenabled={id:1,statusenabled:"True"}
                // }else{
                //     $scope.item.statusenabled={id:2,statusenabled:"False"}
                // }
            }

            
            function itungUsia(tgl){
           
                var tanggal = $scope.now;
                var tglLahir = new Date(tgl);
                var selisih = Date.parse(tanggal.toGMTString()) - Date.parse(tglLahir.toGMTString());
                var thn = Math.round(selisih/(1000*60*60*24*365));
                return thn + ' thn '// + bln + ' bln'
            }

            var HttpClient = function() {
                this.get = function(aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function() { 
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open( "GET", aUrl, true );            
                    anHttpRequest.send( null );
                }
            }

            $scope.simpan = function(){
            
                if( $scope.item.Pegawai == undefined){
                    toastr.error('Pegawai Tidak Boleh Kosong')
                    return
                }
                if($scope.item.KkerjaInsert == undefined){
                    toastr.error('Kelompok Kerja Tidak Boleh Kosong')
                    return
                }

                var objSave = 
                {
                    "idPegawai":  $scope.item.Pegawai.id,
                    "objectkelompokkerja":$scope.item.KkerjaInsert.id
                }
                manageAkuntansi.postkelompokkerja(objSave).then(function(e) {
                    init()
                    $scope.Batal()      
                })               
            }

            $scope.Batal= function(){
               $scope.item.struktur = undefined
               $scope.item.Pegawai = undefined
               $scope.item.IdPegawai =''
               $scope.item.KkerjaInsert = undefined
            }
//***********************************

}
]);
});
