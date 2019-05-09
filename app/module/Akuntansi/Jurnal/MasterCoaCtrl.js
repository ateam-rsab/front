define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MasterCoaCtrl', ['$q', '$rootScope', '$scope', 'ManageAkuntansi','$state','CacheHelper','DateHelper',
        function($q, $rootScope, $scope,manageAkuntansi,$state,cacheHelper,dateHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var pegawaiUser = {}
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            function LoadCache(){
             //  var chacePeriode = cacheHelper.get('TrialBalanceCtrl');
             //  if(chacePeriode != undefined){
             //   //var arrPeriode = chacePeriode.split(':');
             //    $scope.item.tglAwal = new Date(chacePeriode[0]);
             //    $scope.item.tglAkhir = new Date(chacePeriode[1]);
               
             //    // init();
             // }
             // else{
             //   $scope.item.tglAwal = $scope.now;
             //   $scope.item.tglAkhir = $scope.now;
             //   // init();
             // }
              init();
           }
            function loadCombo(){
                // manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                //     pegawaiUser = dat.data.datalogin
                // });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            $scope.Tambah = function(){
                $state.go('MasterCoaCtrl')
            }
            function init() {
                var noakun ='noaccount=' + $scope.item.noakunS
                if ($scope.item.noakunS == undefined) {
                    noakun=''
                }
                var namaAkun ='&namaaccount=' + $scope.item.namaAkunS
                if ($scope.item.namaAkunS == undefined) {
                    namaAkun=''
                }
                $scope.isRouteLoading=true;
                manageAkuntansi.getDataTableTransaksi("master/get-data-daftar-master-coa?"+noakun+namaAkun, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    for (var i = dat.data.length - 1; i >= 0; i--) {
                        dat.data[i].no=i+1
                    }
                    // $scope.dataGrid = new kendo.data.DataSource({
                    //     data: dat.data,
                    //     pageSize: 50,
                    //     total: dat.data.length,
                    //     serverPaging: false,
                    // });
                   // $scope.dataGrid = dat.data;
                   $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data,
                        sort:[
                            {
                                field: "noaccount",
                                dir:"asc"
                            }
                        ],
                        pageSize: 12
                    });
                   // pegawaiUser = dat.data.datalogin
                });
                manageAkuntansi.getDataTableTransaksi("master/get-data-combo-master-coa", true).then(function(dat){
                    $scope.listStruktur = dat.data.strukturaccount
                    $scope.listJenis = dat.data.jenisaccount
                    $scope.listKategory = dat.data.kategoryaccount
                    $scope.listStatus = dat.data.statusaccount
                    $scope.listSaldo = [{id:1,saldo:'D'},{id:2,saldo:'K'}]
                    $scope.listStatusEnabled = [{id:1,statusenabled:'True'},{id:2,statusenabled:'False'}]
                });

                // var chacePeriode ={ 0 : tglAwal ,
                //     1 : tglAkhir,
                //     2 : '',
                //     3 : '', 
                //     4 : '',
                //     5 : '',
                //     6 : ''
                // }
                // cacheHelper.set('MasterCoaCtrl', chacePeriode);

                
            }
            // $scope.getRuangan = function(){
            //     $scope.listRuangan = $scope.item.instalasi.ruangan;
            // }
            $scope.cariFilter = function(){

                init();
            }
            $scope.riwayatSaldo = function(){
                $scope.item.objectaccountfk = $scope.dataSelected.id
                $scope.item.noakunP = $scope.dataSelected.noaccount
                $scope.item.namaAkunP = $scope.dataSelected.namaaccount
                manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-daftar-saldo-awal?coaid="+ $scope.dataSelected.id, true).then(function(dat){
                    for (var i = dat.data.length - 1; i >= 0; i--) {
                        dat.data[i].no = i+1
                    }
                    $scope.dataPopUp = new kendo.data.DataSource({
                        data: dat.data,
                        sort:[
                            {
                                field: "tgl",
                                dir:"asc"
                            }
                        ],
                        pageSize: 12
                    });
                });

                $scope.item.tglSaldo = $scope.now;
                $scope.item.saldoDebet = 0
                $scope.item.saldoKredit = 0
                $scope.item.saldoStatus = 1
                $scope.popupRiwayatSaldo.center().open();
            }
            $scope.CariCoaPOP = function(){
                
                manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-daftar-saldo-awal?noaccount="+ $scope.item.noakunP, true).then(function(dat){
                    for (var i = dat.data.length - 1; i >= 0; i--) {
                        dat.data[i].no = i+1
                    }
                    $scope.dataPopUp = new kendo.data.DataSource({
                        data: dat.data,
                        sort:[
                            {
                                field: "tgl",
                                dir:"asc"
                            }
                        ],
                        pageSize: 12
                    });
                    $scope.item.objectaccountfk = dat.data[0].id
                    $scope.item.id = dat.data[0].id
                    $scope.item.noakunP = dat.data[0].noaccount
                    $scope.item.namaAkunP = dat.data[0].namaaccount
                });

                $scope.item.tglSaldo = $scope.now;
                $scope.item.saldoDebet = 0
                $scope.item.saldoKredit = 0
                $scope.item.saldoStatus = 1
                $scope.popupRiwayatSaldo.center().open();
            }
            $scope.klikPopUp = function(dataSelectedPopUp){
                $scope.item.norecSaldo = dataSelectedPopUp.norec
                $scope.item.tglSaldo = dataSelectedPopUp.tgl
                $scope.item.saldoDebet = dataSelectedPopUp.hargasatuand
                $scope.item.saldoKredit = dataSelectedPopUp.hargasatuank
                $scope.item.saldoStatus = dataSelectedPopUp.statusenabled
            }
            $scope.batalSaldo = function(){
                $scope.item.norecSaldo = undefined
                $scope.item.tglSaldo = $scope.now;
                $scope.item.saldoDebet = 0
                $scope.item.saldoKredit = 0
                $scope.item.saldoStatus = 1
            }

            $scope.tambahSaldo = function(){
                var norec_tea = $scope.item.norecSaldo
                if ($scope.item.norecSaldo ==  undefined){
                    norec_tea ='-'
                }
                var tgltgl = moment($scope.item.tglSaldo).format('YYYYMM');
                var objSave = 
                {
                    norec : norec_tea,
                    objectaccountfk : $scope.item.id,
                    hargasatuand : $scope.item.saldoDebet,
                    hargasatuank : $scope.item.saldoKredit,
                    statusenabled : $scope.item.saldoStatus,
                    ym : tgltgl,
                }
                manageAkuntansi.postaddsaldoawal(objSave).then(function(e) {
                    $scope.item.tglSaldo = $scope.now;
                    $scope.item.saldoDebet = 0
                    $scope.item.saldoKredit = 0
                    $scope.item.saldoStatus = 1
                    $scope.item.norecSaldo = undefined
                    manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-daftar-saldo-awal?coaid="+ $scope.item.id, true).then(function(dat){
                        for (var i = dat.data.length - 1; i >= 0; i--) {
                            dat.data[i].no = i+1
                        }
                        $scope.dataPopUp = new kendo.data.DataSource({
                            data: dat.data,
                            sort:[
                                {
                                    field: "tgl",
                                    dir:"asc"
                                }
                            ],
                            pageSize: 12
                        });
                    });
                })
                
            }

            $scope.hapusSaldo = function(){
                var objSave = 
                {
                    head:$scope.item.norecSaldo
                }
                manageAkuntansi.posthapussaldoawal(objSave).then(function(e) {
                    manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-daftar-saldo-awal?coaid="+ $scope.item.id, true).then(function(dat){
                        for (var i = dat.data.length - 1; i >= 0; i--) {
                            dat.data[i].no = i+1
                        }
                        $scope.dataPopUp = new kendo.data.DataSource({
                            data: dat.data,
                            sort:[
                                {
                                    field: "tgl",
                                    dir:"asc"
                                }
                            ],
                            pageSize: 12
                        });
                    });
                    $scope.item.norecSaldo = undefined
                    $scope.item.tglSaldo = $scope.now;
                    $scope.item.saldoDebet = 0
                    $scope.item.saldoKredit = 0
                    $scope.item.saldoStatus = 1
                })
               
            }

            // $scope.CetakRincian = function(){
            //     var stt = 'false'
            //     if (confirm('View resep? ')) {
            //         // Save it!
            //         stt='true';
            //     } else {
            //         // Do nothing!
            //         stt='false'
            //     }
            //     var client = new HttpClient();
            //     client.get('http://127.0.0.1:1237/printvb/logistik?cetak-rincian-penerimaan=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
            //         //aadc=response;
            //     });
            // }

        
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }
            $scope.columnGridExcel ={
                toolbar: ["excel"],
                excel: {
                    fileName: "Master Coa  " + moment($scope.item.tglAwal).format( 'DD/MMM/YYYY'),
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
                    {
                        "field": "no",
                        "title": "No",
                        "width" : "30px",
                    },
                    {
                        "field": "noaccount",
                        "title": "No Akun",
                        "width" : "100px"
                    },
                    {
                        "field": "namaaccount",
                        "title": "Nama Akun",
                        "width" : "250px"
                    },
                    {
                        "field": "saldonormaladd",
                        "title": "Saldo (+)",
                        "width" : "60px"
                    },
                    {
                        "field": "saldonormalmin",
                        "title": "Saldo (-)",
                        "width" : "60px"
                    },
                    // {
                    //     "field": "jenisaccount",
                    //     "title": "Jenis",
                    //     // "width" : "100px"
                    // },
                    {
                        "field": "kategoryaccount",
                        "title": "Kategory",
                        "width" : "100px"
                    },
                    // {
                    //     "field": "statusaccount",
                    //     "title": "Status",
                    //     "width" : "100px"
                    // },
                    {
                        "field": "strukturaccount",
                        "title": "Struktur",
                        "width" : "100px"
                    }
                ] 
            }

            $scope.columnGrid = [
                    {
                        "field": "no",
                        "title": "No",
                        "width" : "30px",
                    },
                    {
                        "field": "noaccount",
                        "title": "No Akun",
                        "width" : "100px"
                    },
                    {
                        "field": "namaaccount",
                        "title": "Nama Akun",
                        "width" : "250px"
                    },
                    {
                        "field": "saldonormaladd",
                        "title": "Saldo (+)",
                        "width" : "60px"
                    },
                    {
                        "field": "saldonormalmin",
                        "title": "Saldo (-)",
                        "width" : "60px"
                    },
                    // {
                    //     "field": "jenisaccount",
                    //     "title": "Jenis",
                    //     // "width" : "100px"
                    // },
                    {
                        "field": "kategoryaccount",
                        "title": "Kategory",
                        "width" : "100px"
                    },
                    // {
                    //     "field": "statusaccount",
                    //     "title": "Status",
                    //     "width" : "100px"
                    // },
                    {
                        "field": "strukturaccount",
                        "title": "Struktur",
                        "width" : "100px"
                    }
            ];
                   
            $scope.columnPopUp = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "20px"
                },
                {
                    "field": "tgl",
                    "title": "Tanggal",
                    "width" : "60px"
                },
                {
                    "field": "hargasatuand",
                    "title": "Saldo Debet",
                    "width" : "130px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuand #', '')}}</span>"
                },
                {
                    "field": "hargasatuank",
                    "title": "Saldo Kredit",
                    "width" : "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuank #', '')}}</span>"
                },
                {
                    "field": "statusenabled",
                    "title": "Status",
                    "width" : "20px"
                }
            ];
        $scope.klikGrid = function(dataSelected){
            $scope.item.id = dataSelected.id
            $scope.item.noakun = dataSelected.noaccount
            $scope.item.namaAkun = dataSelected.namaaccount
            $scope.item.struktur = {id:dataSelected.objectstrukturaccountfk,strukturaccount:dataSelected.strukturaccount}
            $scope.item.jenis = {id:dataSelected.objectjenisaccountfk,jenisaccount:dataSelected.jenisaccount}
            $scope.item.kategory = {id:dataSelected.objectkategoryaccountfk,kategoryaccount:dataSelected.kategoryaccount}
            $scope.item.status = {id:dataSelected.objectstatusaccountfk,statusaccount:dataSelected.statusaccount}
            if (dataSelected.saldonormaladd == "D") {
                $scope.item.saldoAdd={id:1,saldo:"D"}
            }else{
                $scope.item.saldoAdd={id:2,saldo:"K"}
            }
            if (dataSelected.saldonormalmin == "D") {
                $scope.item.saldoMin={id:1,saldo:"D"}
            }else{
                $scope.item.saldoMin={id:2,saldo:"K"}
            }
            if (dataSelected.statusenabled == true) {
                $scope.item.statusenabled={id:1,statusenabled:"True"}
            }else{
                $scope.item.statusenabled={id:2,statusenabled:"False"}
            }
        }
            // $scope.data2 = function(dataItem) {
            //     return {
            //         dataSource: new kendo.data.DataSource({
            //             data: dataItem.details
            //         }),
            //         columns: [
            //             {
            //                 "field": "tglkebutuhan",
            //                 "title": "Tgl Kebutuhan",
            //                 "width" : "50px",
            //                 "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
            //             },
            //             {
            //                 "field": "prid",
            //                 "title": "Kode Produk",
            //                 "width" : "40px",
            //             },
            //             {
            //                 "field": "namaproduk",
            //                 "title": "Nama Produk",
            //                 "width" : "90px",
            //             },
            //             {
            //                 "field": "spesifikasi",
            //                 "title": "Spesifikasi",
            //                 "width" : "120px",
            //             },
            //             {
            //                 "field": "satuanstandar",
            //                 "title": "Satuan",
            //                 "width" : "20px",
            //             },
            //             {
            //                 "field": "qtyproduk",
            //                 "title": "Qty",
            //                 "width" : "20px",
            //             },
            //             {
            //                 "field": "hargasatuan",
            //                 "title": "Harga Satuan",
            //                 "width" : "40px",
            //                 "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
            //             },
            //             {
            //                 "field": "total",
            //                 "title": "Total",
            //                 "width" : "50px",
            //                 "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
            //             }
            //         ]
            //     }
            // };  
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
                var idCoa = ''
                if ($scope.item.id != undefined)
                    idCoa =  $scope.item.id

                if( $scope.item.noakun == undefined){
                    toastr.error('Kode Akun harus di isi')
                    return
                }
                if($scope.item.namaAkun == undefined){
                    toastr.error('Nama Akun harus di isi')
                    return
                }

                if($scope.item.statusenabled == undefined){
                    toastr.error('Status enabled belum di pilih')
                    return
                }

                if($scope.item.saldoAdd == undefined){
                    toastr.error('Saldo (+) belum di pilih')
                    return
                }
                if($scope.item.saldoMin == undefined){
                    toastr.error('Saldo (-) belum di pilih')
                    return
                }
              
                var objectjenisaccountfk = null    
                if( $scope.item.jenis != undefined)
                    objectjenisaccountfk = $scope.item.jenis.id

                var objectkategoryaccountfk = null
                if( $scope.item.kategory != undefined)
                    objectkategoryaccountfk = $scope.item.kategory.id

                var objectstatusaccountfk = null
                if( $scope.item.status != undefined)
                    objectstatusaccountfk = $scope.item.status.id    

                var objectstrukturaccountfk = null
                if( $scope.item.struktur != undefined)
                    objectstrukturaccountfk = $scope.item.struktur.id    
 
                var objSave = 
                {
                    "id":  idCoa,
                    "statusenabled":$scope.item.statusenabled.id == 1 ? true :false,
                    "objectjenisaccountfk":objectjenisaccountfk,
                    "objectkategoryaccountfk":objectkategoryaccountfk,
                    "objectstatusaccountfk": objectstatusaccountfk,
                    "objectstrukturaccountfk":objectstrukturaccountfk,
                    "kdaccount":$scope.item.noakun ,
                    "namaaccount":$scope.item.namaAkun ,
                    "saldonormaladd":$scope.item.saldoAdd.saldo,
                    "saldonormalmin":$scope.item.saldoMin.saldo,
                }
                manageAkuntansi.postcoa(objSave).then(function(e) {
                    init()
                    $scope.Batal()      
                })               
            }

            $scope.HapusCoa = function(){
                var idCoa = ''
                if ($scope.item.id != undefined)
                    idCoa =  $scope.item.id

                if( $scope.item.noakun == undefined){
                    toastr.error('Kode Akun harus di isi')
                    return
                }
                if($scope.item.namaAkun == undefined){
                    toastr.error('Nama Akun harus di isi')
                    return
                }

                if($scope.item.statusenabled == undefined){
                    toastr.error('Status enabled belum di pilih')
                    return
                }

                if($scope.item.saldoAdd == undefined){
                    toastr.error('Saldo (+) belum di pilih')
                    return
                }
                if($scope.item.saldoMin == undefined){
                    toastr.error('Saldo (-) belum di pilih')
                    return
                }
              
                var objectjenisaccountfk = null    
                if( $scope.item.jenis != undefined)
                    objectjenisaccountfk = $scope.item.jenis.id

                var objectkategoryaccountfk = null
                if( $scope.item.kategory != undefined)
                    objectkategoryaccountfk = $scope.item.kategory.id

                var objectstatusaccountfk = null
                if( $scope.item.status != undefined)
                    objectstatusaccountfk = $scope.item.status.id    

                var objectstrukturaccountfk = null
                if( $scope.item.struktur != undefined)
                    objectstrukturaccountfk = $scope.item.struktur.id    
 
                var objSave = 
                {
                    "id":  idCoa,
                    "statusenabled":$scope.item.statusenabled.id == 1 ? true :false,
                    "objectjenisaccountfk":objectjenisaccountfk,
                    "objectkategoryaccountfk":objectkategoryaccountfk,
                    "objectstatusaccountfk": objectstatusaccountfk,
                    "objectstrukturaccountfk":objectstrukturaccountfk,
                    "kdaccount":$scope.item.noakun ,
                    "namaaccount":$scope.item.namaAkun ,
                    "saldonormaladd":$scope.item.saldoAdd.saldo,
                    "saldonormalmin":$scope.item.saldoMin.saldo,
                }
                manageAkuntansi.hapuscoa(objSave).then(function(e) {
                    init()
                    $scope.Batal()      
                })               
            }

            $scope.Batal= function(){
                delete $scope.item.id
                delete $scope.item.noakun
                delete $scope.item.namaAkun
                delete $scope.item.statusenabled
                delete $scope.item.saldoAdd 
                delete $scope.item.saldoMin 
                delete $scope.item.jenis
                delete $scope.item.kategory
                delete $scope.item.status
                delete $scope.item.struktur
            }
//***********************************

}
]);
});
