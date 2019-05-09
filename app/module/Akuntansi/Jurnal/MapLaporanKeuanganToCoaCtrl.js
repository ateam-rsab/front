define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MapLaporanKeuanganToCoaCtrl', ['$q', '$rootScope', '$scope', 'ManageAkuntansi','$state','CacheHelper','DateHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageAkuntansi,$state,cacheHelper,dateHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var pegawaiUser = {}
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            $scope.listJenisLaporan = [
                {id:1,jenislaporan:'Neraca'},
                {id:2,jenislaporan:'Arus Kas'},
                {id:3,jenislaporan:'Laporan Aktivitas'},
                {id:4,jenislaporan:'Rincian Pendapatan'},
                {id:5,jenislaporan:'Rincian Beban'}
            ]
            $scope.listTingkat = [
                {id:1,tingkat:'1'},
                {id:2,tingkat:'2'},
                {id:3,tingkat:'3'}
            ]
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
                modelItemAkuntansi.getDataDummyPHP("akuntansi/get-data-combo-coa-part2", true, true, 20).then(function(data) {
                    $scope.listAkun= data;
                })
                // manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                //     pegawaiUser = dat.data.datalogin
                // });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            $scope.Tambah = function(){
                $state.go('MasterCoaCtrl')
            }
            function init() {
                var noakun ='kdmap=' + $scope.item.noakunS
                if ($scope.item.noakunS == undefined) {
                    noakun=''
                }
                var namaAkun ='&namamap=' + $scope.item.namaAkunS
                if ($scope.item.namaAkunS == undefined) {
                    namaAkun=''
                }
                var namalaporan =''
                if ($scope.item.jenislaporan != undefined) {
                    namalaporan='&namalaporan=' + $scope.item.jenislaporan.jenislaporan
                }
                $scope.isRouteLoading=true;
                manageAkuntansi.getDataTableTransaksi("master/get-data-daftar-maplaporanakuntansi-coa?"+noakun+namaAkun+namalaporan, true).then(function(dat){
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
                // manageAkuntansi.getDataTableTransaksi("master/get-data-combo-master-coa", true).then(function(dat){
                //     $scope.listStruktur = dat.data.strukturaccount
                //     $scope.listJenis = dat.data.jenisaccount
                //     $scope.listKategory = dat.data.kategoryaccount
                //     $scope.listStatus = dat.data.statusaccount
                //     $scope.listSaldo = [{id:1,saldo:'D'},{id:2,saldo:'K'}]
                //     $scope.listStatusEnabled = [{id:1,statusenabled:'True'},{id:2,statusenabled:'False'}]
                // });

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
            $scope.KlikTombolAnuTulisannaMapCOATeaGeuning_apalteu = function(){
                $scope.item.objectaccountfk = $scope.dataSelected.id
                $scope.item.noakunP = $scope.dataSelected.noaccount
                $scope.item.namaAkunP = $scope.dataSelected.namaaccount
                manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-daftar-map-laporan-akuntansi?mapid="+ $scope.dataSelected.id, true).then(function(dat){
                    for (var i = dat.data.length - 1; i >= 0; i--) {
                        dat.data[i].no = i+1
                    }
                    $scope.dataPopUp = new kendo.data.DataSource({
                        data: dat.data,
                        // sort:[
                        //     {
                        //         field: "tgl",
                        //         dir:"asc"
                        //     }
                        // ],
                        pageSize: 12
                    });
                });

                $scope.item.kdAkun2 = {}
                $scope.popupMaoCOA.center().open();
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
                $scope.item.norec_head = dataSelectedPopUp.norec
                $scope.item.detail = {
                    kdprofile: dataSelectedPopUp.kdprofile,
                    namaaccount: dataSelectedPopUp.namaaccount,
                    noaccount: dataSelectedPopUp.noaccount,
                    norec: dataSelectedPopUp.norec,
                    objectaccountfk: dataSelectedPopUp.objectaccountfk,
                    objectmaplaporanakuntansitocoafk: dataSelectedPopUp.objectmaplaporanakuntansitocoafk,
                    statuseanbled: dataSelectedPopUp.statuseanbled
                }
                $scope.item.kdAkun2 ={
                }
            }
            $scope.batalSaldo = function(){
                $scope.item.norecSaldo = undefined
                $scope.item.tglSaldo = $scope.now;
                $scope.item.saldoDebet = 0
                $scope.item.saldoKredit = 0
                $scope.item.saldoStatus = 1
                $scope.item.detail = ''
                $scope.item.norec_head = undefined
            }

            $scope.tambahSaldo = function(){
                var norec_head = $scope.item.norec_head
                if ($scope.item.norec_head ==  undefined){
                    norec_head ='-'
                }
                var idaccount = ''
                if ($scope.item.kdAkun2 !=  undefined){
                    idaccount =$scope.item.kdAkun2.id
                }
                var objSave = 
                {
                    norec_head:norec_head,
                    id : $scope.item.id,
                    objectaccountfk : idaccount
                }
                manageAkuntansi.postaddmaplaporanakuntansimappingtochartofaccount(objSave).then(function(e) {
                    $scope.item.kdAkun2 = {}
                    manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-daftar-map-laporan-akuntansi?mapid="+ $scope.item.id, true).then(function(dat){
                        for (var i = dat.data.length - 1; i >= 0; i--) {
                            dat.data[i].no = i+1
                        }
                        $scope.dataPopUp = new kendo.data.DataSource({
                            data: dat.data,
                            // sort:[
                            //     {
                            //         field: "tgl",
                            //         dir:"asc"
                            //     }
                            // ],
                            pageSize: 12
                        });
                    });
                    $scope.item.kdAkun2 = {}
                })
                
            }

            $scope.hapusSaldo = function(){
                var objSave = 
                {
                    head:$scope.item.norec_head
                }
                manageAkuntansi.posthapusmappinglaporanakutansitochartofaccountteaheueuh(objSave).then(function(e) {
                    manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-daftar-map-laporan-akuntansi?mapid="+ $scope.item.id, true).then(function(dat){
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
                    
                    $scope.item.detail = ''
                    $scope.item.norec_head = undefined
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
                        "field": "id",
                        "title": "ID",
                        "width" : "30px"
                    },
                    {
                        "field": "urutan",
                        "title": "Urutan",
                        "width" : "20px"
                    },
                    {
                        "field": "kdmap",
                        "title": "Kode",
                        "width" : "70px"
                    },
                    {
                        "field": "nomap",
                        "title": "No",
                        "width" : "20px"
                    },
                    {
                        "field": "namamap",
                        "title": "Caption",
                        "width" : "250px"
                    },
                    {
                        "field": "namalaporan",
                        "title": "Laporan",
                        "width" : "100px"
                    },
                    {
                        "field": "mapcoa",
                        "title": "COA",
                        "width" : "60px"
                    }
                ] 
            }

            $scope.columnGrid = [
                    {
                        "field": "id",
                        "title": "ID",
                        "width" : "30px"
                    },
                    {
                        "field": "kdmap",
                        "title": "Kode",
                        "width" : "50px"
                    },
                    {
                        "field": "nomap",
                        "title": "No",
                        "width" : "20px"
                    },
                    {
                        "field": "namamap",
                        "title": "Caption",
                        "width" : "250px"
                    },
                    {
                        "field": "namalaporan",
                        "title": "Laporan",
                        "width" : "100px"
                    },
                    {
                        "field": "mapcoa",
                        "title": "COA",
                        "width" : "60px"
                    }
            ];
                   
            $scope.columnPopUpMap = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "20px"
                },
                {
                    "field": "objectaccountfk",
                    "title": "ID",
                    "width" : "30px"
                },
                {
                    "field": "noaccount",
                    "title": "Kode Perkiraan",
                    "width" : "60px"
                },
                {
                    "field": "namaaccount",
                    "title": "Nama Perkiraan",
                    "width" : "90px"
                }
            ];
        $scope.klikGrid = function(dataSelected){
            $scope.item.id = dataSelected.id
            $scope.item.urutan = dataSelected.urutan
            $scope.item.nomor = dataSelected.nomap
            $scope.item.kdmap = dataSelected.kdmap
            $scope.item.caption = dataSelected.namamap
            if (dataSelected.namalaporan == 'Neraca'){
                $scope.item.jenisLaporanM = {id:1,jenislaporan:'Neraca'}
            }
            if (dataSelected.namalaporan == 'Arus Kas'){
                $scope.item.jenisLaporanM = {id:2,jenislaporan:'Arus Kas'}
                
            }
            if (dataSelected.namalaporan == 'Laporan Aktivitas'){
                $scope.item.jenisLaporanM = {id:3,jenislaporan:'Laporan Aktivitas'}
                
            }

            if (dataSelected.mapcoa == false){
                $scope.item.mapcoa = {id:2,mapcoa:'false'}
            }
            if (dataSelected.mapcoa == true){
                $scope.item.mapcoa = {id:1,mapcoa:'true'}
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

            $scope.Batal= function(){
                delete $scope.item.id
                delete $scope.item.urutan
                delete $scope.item.nomor
                delete $scope.item.kdmap
                delete $scope.item.caption
                delete $scope.item.jenisLaporanM 
                delete $scope.item.mapcoa
            }
//***********************************

}
]);
});
