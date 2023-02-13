define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('JurnalRev2018Ctrl', ['$q', '$rootScope', '$scope', 'ManageAkuntansi','$state','CacheHelper','DateHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageAkuntansi,$state,cacheHelper,dateHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var data2 = [];
            var pegawaiUser = {}
            var dataPOsting = []
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('JurnalUmumCtrl');
              if(chacePeriode != undefined){
               //var arrPeriode = chacePeriode.split(':');
                $scope.item.tglAwal = new Date(chacePeriode[0]);
                $scope.item.tglAkhir = new Date(chacePeriode[1]);
               
                init();
             }
             else{
               $scope.item.tglAwal =  moment($scope.item.tglAwal).format('YYYY-MM-DD 00:00:00')//$scope.now;
               $scope.item.tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD 23:59:59')//$scope.now;
               init();
             }
           }
            function loadCombo(){
                // manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                //     pegawaiUser = dat.data.datalogin
                // });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            function init() {
                $scope.isRouteLoading=true;
                // var ins =""
                // if ($scope.item.instalasi != undefined){
                //     var ins ="&dpid=" +$scope.item.instalasi.id
                // }
                // var rg =""
                // if ($scope.item.ruangan != undefined){
                //     var rg ="&ruid=" +$scope.item.ruangan.id
                // }
                var Jra =""
                if ($scope.item.deskripsiJurnal != undefined){
                    var Jra =$scope.item.deskripsiJurnal
                }
                $scope.dataGrid = new kendo.data.DataSource({
                    data: []
                })
                $scope.item.ttlDebet = parseFloat(0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlKredit = parseFloat(0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")


                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:00');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:59');
                manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-jurnal-umum-2018?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    "&keterangan=" + Jra
                    , true).then(function(dat){
                        console.log(dat);
                        $scope.isRouteLoading=false;
                    // for (var i = 0; i < dat.data.data.length; i++) {
                    //     dat.data.data[i].no = i+1
                    //     // if (dat.data[i].debet == null) {
                    //     //     dat.data[i].debet = 0
                    //     // } 
                    //     // if (dat.data[i].kredit == null) {
                    //     //     dat.data[i].kredit = 0
                    //     // } 
                    //     // dat.data[i].saldo = parseFloat(dat.data[i].debet)-parseFloat(dat.data[i].kredit)
                    //     // dat.data[i].thnSebelum = 0
                    //     // dat.data[i].naikturun = 0
                    //     // dat.data[i].naikturunpersen = 0
                    // }
                    var debetX = 0
                    var kreditX = 0
                    for (var i = dat.data.length - 1; i >= 0; i--) {
                        debetX = parseFloat(debetX) + dat.data[i].debet
                        kreditX = parseFloat(kreditX) + dat.data[i].kredit
                    }
                    $scope.item.ttlDebet = parseFloat(debetX).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    $scope.item.ttlKredit = parseFloat(kreditX).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data,
                        
                        // group: {
                        //     field: "tgl",
                        //     aggregates: [
                        //     {
                        //         field: "debet",
                        //         aggregate: "sum"
                        //     }, 
                        //     {
                        //         field: "kredit",
                        //         aggregate: "sum"
                        //     }]
                        // }
                        // group: [
                        //     // {
                        //     //      field: "tgl", 
                        //     //      // aggregates: [
                        //     //      //    { field: "debet", aggregate: "sum"},
                        //     //      //    { field: "kredit", aggregate: "sum"}
                        //     //      // ]
                        //     // },
                        //     {
                        //          field: "kelompok", 
                        //          // aggregates: [
                        //          //    { field: "debet", aggregate: "sum"},
                        //          //    { field: "kredit", aggregate: "sum"}
                        //          // ]
                        //     }
                        // ],
                        sort:[
                            {
                                field: "nojurnal",
                                dir:"asc"
                            }
                        ],

                        // aggregate: [ 
                        //     { field: "debet", aggregate: "sum" },
                        //     { field: "kredit", aggregate: "sum" }
                        // ]
                        
                        pageSize: 20,
                        // total: data.length,
                        // serverPaging: false,
                        // schema: {
                        //     model: {
                        //         fields: {
                        //         }
                        //     }
                        // }
                    });
                   // $scope.dataGrid = dat.data;
                   // pegawaiUser = dat.data.datalogin
                });

                var chacePeriode ={ 0 : tglAwal ,
                    1 : tglAkhir,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('JurnalUmumCtrl', chacePeriode);

                
            }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
            }
            // $scope.klikGrid = function(dataSelected){
            $scope.DetailJurnal = function(){
                $scope.item.nojurnal=$scope.dataSelected.nojurnal
                $scope.item.tanggal=$scope.dataSelected.tgl
                $scope.item.deskripsi=$scope.dataSelected.keteranganlainnya
                $scope.dataPopUp = new kendo.data.DataSource({
                        data: []
                    });
                manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-detail-jurnal?nojurnal="+$scope.dataSelected.nojurnal, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var ttlDebet =0.0
                    var ttlKredit =0.0
                    for (var i = dat.data.length - 1; i >= 0; i--) {
                        dat.data[i].no = i+1
                        ttlDebet = ttlDebet + parseFloat(dat.data[i].hargasatuand)
                        ttlKredit = ttlKredit + parseFloat(dat.data[i].hargasatuank)
                    }
                    $scope.item.ttlDebet = parseFloat(ttlDebet).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.ttlKredit = parseFloat(ttlKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.dataPopUp = new kendo.data.DataSource({
                        data: dat.data,
                        pageSize: 20
                        
                        // sort:[
                        //     {
                        //         field: "nojurnal",
                        //         dir:"asc"
                        //     }
                        // ]

                    });
                });
                $scope.popupKomponen.center().open();
            }
            $scope.PostingJurnal = function(){
                $scope.item.nojurnal=$scope.dataSelected.nojurnal
                $scope.item.tanggal=$scope.dataSelected.tgl
                $scope.item.deskripsi=$scope.dataSelected.keteranganlainnya
                $scope.item.posted=$scope.dataSelected.posted
                $scope.dataPopUp = new kendo.data.DataSource({
                        data: []
                    });
                manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-detail-jurnal-posting?nojurnal="+$scope.dataSelected.nojurnal, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var ttlDebet =0.0
                    var ttlKredit =0.0
                    for (var i = dat.data.length - 1; i >= 0; i--) {
                        dat.data[i].no = i+1
                        ttlDebet = ttlDebet + parseFloat(dat.data[i].hargasatuand)
                        ttlKredit = ttlKredit + parseFloat(dat.data[i].hargasatuank)
                    }
                    $scope.item.ttlDebet = parseFloat(ttlDebet).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.ttlKredit = parseFloat(ttlKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    dataPOsting = dat.data
                    $scope.dataPopUp = new kendo.data.DataSource({
                        data: dat.data//,
                        
                        // sort:[
                        //     {
                        //         field: "nojurnal",
                        //         dir:"asc"
                        //     }
                        // ]

                    });
                });
                $scope.popupPosting.center().open();
            }

            $scope.cetakPostingJurnal = function(){
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD hh:mm');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD hh:mm');
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/akuntansi?cetak-jurnal-rev='+$scope.dataSelected.nojurnal+
                    '&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&Iddepartement='+$scope.item.deskripsi+'&idRuangan='+$scope.item.posted+'&namaKasir='+'&view=true', function(response) {

                });
            }

            $scope.cetakPostingJurnalDetail = function(){
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD hh:mm');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD hh:mm');
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/akuntansi?cetak-jurnal-detail-rev='+$scope.dataSelected.nojurnal+
                    '&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&typeDetail='+'&idRuangan='+$scope.item.posted+'&namaKasir='+'&view=true', function(response) {

                });
            }

            $scope.cetakPostingJurnalDetailSelisih = function(){
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD hh:mm');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD hh:mm');
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/akuntansi?cetak-jurnal-detail-rev='+$scope.dataSelected.nojurnal+
                    '&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&typeDetail=BEDAHARGA'+'&idRuangan='+$scope.item.posted+'&namaKasir='+'&view=true', function(response) {

                });
            }

            $scope.CetakRincian = function(){
                var stt = 'false'
                if (confirm('View resep? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-rincian-penerimaan=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response;
                });
            }
            
        
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.columnGridExcel = {
                toolbar: ["excel"],
                excel: {
                    fileName: "Jurnal " + moment($scope.item.tglAwal).format( 'DD/MMM/YYYY'),
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
                    //     "width" : "20px",
                    // },
                    // {
                    //     "field": "kelompok",
                    //     "title": "Kelompok",
                    //     "width" : "120px"
                    // },
                        {
                            "field": "tgl",
                            "title": "Tanggal",
                            "width" : "40px",
                            "template": "<span class='style-center'>#: tgl #</span>"
                        },
                        {
                            "field": "nojurnal",
                            "title": "No Jurnal",
                            "width" : "50px",
                            "template": "<span class='style-center'>#: nojurnal #</span>"
                        },
                        {
                            "field": "kelompok",
                            "title": "Desk Jurnal",
                            "width" : "150px"
                        },
                        {
                            "field": "debet",
                            "title": "Debet",
                            "width" : "80px", 
                            // "aggregates": ["sum"],
                            // "footerTemplate": "#=sum#",
                            // "groupFooterTemplate": "#=sum#",
                            "template": "<span class='style-right'>{{formatRupiah('#: debet #', '')}}</span>"
                        },
                        {
                            "field": "kredit",
                            "title": "Kredit",
                            "width" : "80px", 
                            // "aggregates": ["sum"],
                            // "footerTemplate": "#=sum#",
                            // "groupFooterTemplate": "#=sum#",
                            "template": "<span class='style-right'>{{formatRupiah('#: kredit #', '')}}</span>"
                        },
                        {
                            "field": "posted",
                            "title": "Posted",
                            "width" : "50px",
                        }

                   ]
            }


            $scope.columnGrid = [
                // {
                //     "field": "no",
                //     "title": "No",
                //     "width" : "20px",
                // },
                // {
                //     "field": "kelompok",
                //     "title": "Kelompok",
                //     "width" : "120px"
                // },
                {
                    "field": "tgl",
                    "title": "Tanggal",
                    "width" : "40px",
                    "template": "<span class='style-center'>#: tgl #</span>"
                },
                {
                    "field": "nojurnal",
                    "title": "No Jurnal",
                    "width" : "50px",
                    "template": "<span class='style-center'>#: nojurnal #</span>"
                },
                {
                    "field": "kelompok",
                    "title": "Desk Jurnal",
                    "width" : "150px"
                },
                {
                    "field": "debet",
                    "title": "Debet",
                    "width" : "80px", 
                    // "aggregates": ["sum"],
                    // "footerTemplate": "#=sum#",
                    // "groupFooterTemplate": "#=sum#",
                    "template": "<span class='style-right'>{{formatRupiah('#: debet #', '')}}</span>"
                },
                {
                    "field": "kredit",
                    "title": "Kredit",
                    "width" : "80px", 
                    // "aggregates": ["sum"],
                    // "footerTemplate": "#=sum#",
                    // "groupFooterTemplate": "#=sum#",
                    "template": "<span class='style-right'>{{formatRupiah('#: kredit #', '')}}</span>"
                },
                {
                    "field": "posted",
                    "title": "Posted",
                    "width" : "50px",
                }
            ];


            $scope.columnPopUpExcel = {
                toolbar: [
                        "excel",
                        {
                            "name": "hapusJurnalbyCoa",
                            "text": "Hapus Jurnal",
                            "template": '<a ng-click="hapusJurnalKlik()" class="k-button k-button-icontext k-grid-upload">Hapus Jurnal</a>'   
                        }
                    ],
                excel: {
                    fileName: "Detail Posting  " + moment($scope.item.tglAwal).format( 'DD/MMM/YYYY'),
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
                        "width" : "20px"
                    },
                    {
                        "field": "noaccount",
                        "title": "Kode",
                        "width" : "60px"
                    },
                    {
                        "field": "namaaccount",
                        "title": "Perkiraan",
                        "width" : "130px"
                    },
                    {
                        "field": "keteranganlainnya",
                        "title": "Keterangan",
                        "width" : "100px"
                    },
                    {
                        "field": "hargasatuand",
                        "title": "Debit",
                        "width" : "70px", 
                        // "aggregates": ["sum"],
                        // "footerTemplate": "#=sum#",
                        // "groupFooterTemplate": "#=sum#",
                        template: "<span class='style-right'>{{formatRupiah('#: hargasatuand #', '')}}</span>"
                    },
                    {
                        "field": "hargasatuank",
                        "title": "Kredit",
                        "width" : "70px", 
                        // "aggregates": ["sum"],
                        // "footerTemplate": "#=sum#",
                        // "groupFooterTemplate": "#=sum#",
                        template: "<span class='style-right'>{{formatRupiah('#: hargasatuank #', '')}}</span>"
                    }
                ] 
                // ,
                // toolbar: [{
                //     "name": "hapusJurnalbyCoa",
                //     "text": "Hapus Jurnal",
                //     "template": '<a ng-click="onClick()" class="k-button k-button-icontext k-grid-upload">Hapus Jurnal</a>'   
                // }]
            }

            $scope.hapusJurnalKlik = function(){
                // $scope.item.accountid
                // $scope.item.nojurnal
                if ($scope.item.posted != undefined) {
                    alert("Sudah posting tidak bisa di hapus !")
                    return
                }
                var stt = 'false'
                if (confirm("Hapus jurnal by : " + $scope.item.noaccount + ' ' + $scope.item.namaaccount.replace('--- ','') + ' ?')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                if (stt == 'true') {
                    var objSave = 
                    {
                        nojurnal : $scope.item.nojurnal,
                        accountid : $scope.item.accountid
                    }
                    manageAkuntansi.postpost(objSave,"akuntansi/save-hapus-jurnal-bycoanojurnal").then(function(e) {

                    })
                }
            }



            $scope.columnPopUp = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "20px"
                },
                {
                    "field": "noaccount",
                    "title": "Kode",
                    "width" : "60px"
                },
                {
                    "field": "namaaccount",
                    "title": "Perkiraan",
                    "width" : "130px"
                },
                {
                    "field": "keteranganlainnya",
                    "title": "Keterangan",
                    "width" : "100px"
                },
                {
                    "field": "hargasatuand",
                    "title": "Debit",
                    "width" : "70px", 
                    // "aggregates": ["sum"],
                    // "footerTemplate": "#=sum#",
                    // "groupFooterTemplate": "#=sum#",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuand #', '')}}</span>"
                },
                {
                    "field": "hargasatuank",
                    "title": "Kredit",
                    "width" : "70px", 
                    // "aggregates": ["sum"],
                    // "footerTemplate": "#=sum#",
                    // "groupFooterTemplate": "#=sum#",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuank #', '')}}</span>"
                }
            ];
            $scope.columnPopUpExport = {
                toolbar:["excel"],
                excel: {
                    fileName:"Detail_Jurnal_"+moment($scope.now).format( 'DD/MMM/YYYY'),
                    allPages: true,
                },
                selectable: 'row',
                pageable: true,
                editable: false,
                column: [
                    {
                        "field": "no",
                        "title": "No",
                        "width" : "20px"
                    },
                    {
                        "field": "noaccount",
                        "title": "Kode",
                        "width" : "60px"
                    },
                    {
                        "field": "namaaccount",
                        "title": "Perkiraan",
                        "width" : "130px"
                    },
                    {
                        "field": "keteranganlainnya",
                        "title": "Keterangan",
                        "width" : "100px"
                    },
                    {
                        "field": "hargasatuand",
                        "title": "Debit",
                        "width" : "70px", 
                        // "aggregates": ["sum"],
                        // "footerTemplate": "#=sum#",
                        // "groupFooterTemplate": "#=sum#",
                        "template": "<span class='style-right'>{{formatRupiah('#: hargasatuand #', '')}}</span>"
                    },
                    {
                        "field": "hargasatuank",
                        "title": "Kredit",
                        "width" : "70px", 
                        // "aggregates": ["sum"],
                        // "footerTemplate": "#=sum#",
                        // "groupFooterTemplate": "#=sum#",
                        "template": "<span class='style-right'>{{formatRupiah('#: hargasatuank #', '')}}</span>"
                    }
                ]
            }
            
        $scope.entryJurnal = function(){

            $scope.item.nojurnal='-'
            $scope.item.tglEntry= $scope.item.tglAkhir;//$scope.now;
            $scope.item.deskripsi=''

            $scope.item.kdAkun = ""
            $scope.item.debet = "0"
            $scope.item.kredit = "0"
            $scope.item.keterangan = ""
            $scope.item.ttlDebet = 0
            $scope.item.ttlKredit = 0
            data2=[]
            $scope.dataPopUp = new kendo.data.DataSource({
                data: []
            });
            modelItemAkuntansi.getDataDummyPHP("akuntansi/get-data-combo-coa-part", true, true, 20).then(function(data) {
                $scope.listAkun= data;
            })
            $scope.popupEntry.center().open();
        }
        $scope.deleteJurnal = function(){
            if ($scope.dataSelected.posted == undefined) {
                var stt = 'false'
                if (confirm('Hapus Jurnal? ')){
                    // Save it!
                    stt='true';
                }else {
                    // Do nothing!
                    stt='false'
                }
                if (stt == 'true') {
                    var objSave = 
                    {
                        head:$scope.dataSelected.nojurnal
                    }
                    manageAkuntansi.posthapusentryjurnal(objSave).then(function(e) {
                    })
                }
            }else{
                alert("Sudah Posting !")
                return; 
            }
            
        }
        $scope.editJurnal = function(){
            if ($scope.dataSelected.posted == undefined) {
                $scope.item.no= undefined

                $scope.item.nojurnal=$scope.dataSelected.nojurnal
                $scope.item.tglEntry= $scope.dataSelected.tgl
                $scope.item.deskripsi=$scope.dataSelected.keteranganlainnya

                $scope.item.kdAkun = ""
                $scope.item.debet = "0"
                $scope.item.kredit = "0"
                $scope.item.keterangan = ""
                $scope.dataPopUp = new kendo.data.DataSource({
                    data: []
                });
                manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-detail-jurnal?nojurnal="+$scope.dataSelected.nojurnal, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var ttlDebet =0.0
                    var ttlKredit =0.0
                    for (var i = dat.data.length - 1; i >= 0; i--) {
                        dat.data[i].no = i+1
                        dat.data[i].namaaccount2 = dat.data[i].namaaccount.replace('--- ', "")
                        ttlDebet = ttlDebet + parseFloat(dat.data[i].hargasatuand)
                        ttlKredit = ttlKredit + parseFloat(dat.data[i].hargasatuank)
                    }
                    data2 = dat.data
                    $scope.item.ttlDebet = parseFloat(ttlDebet).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.ttlKredit = parseFloat(ttlKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.dataPopUp = new kendo.data.DataSource({
                        data: data2,
                        pageSize: 20
                    });
                });
                modelItemAkuntansi.getDataDummyPHP("akuntansi/get-data-combo-coa-part", true, true, 20).then(function(data) {
                    $scope.listAkun= data;
                })
                $scope.popupEntry.center().open();
            }else{
                alert("Sudah Posting !")
                return; 
            }
        }
        $scope.$watch('item.filter', function(newValue, oldValue) {
            var layananFilter =[];
            var txtnaonwelah ='';
            
            for (var i = data2.length - 1; i >= 0; i--) {
                txtnaonwelah=' ' + data2[i].keteranganlainnya;
                txtnaonwelah = txtnaonwelah.toUpperCase()
                if (txtnaonwelah != null) {
                    if (parseFloat(txtnaonwelah.indexOf($scope.item.filter.toUpperCase())) > 0) {
                        layananFilter.push(data2[i])
                    }   
                }
                
            }
            if ($scope.item.filter == '') {
                layananFilter = data2
            }
            $scope.dataPopUp = new kendo.data.DataSource({
                data: layananFilter,
                pageSize: 20,
                group: [
                    //{field: "ruanganTindakan"}
                ],
            });
        });
        $scope.perbaikanJurnal = function(){
            if ($scope.item.posted == undefined) {
                var angka = 0
                $scope.item.notif = ''
                var objSave = 
                    {
                        nojurnal:$scope.item.nojurnal
                    }
                manageAkuntansi.postbengkeljurnal(objSave).then(function(e) {
                    angka=angka+1
                    // $scope.item.notif = angka +'/5'
                    $scope.item.notif = $scope.item.notif + angka +'/9. ' + 'count perbaikan = ' + e.data.data + ', '
                })

                var objSave ={
                    nojurnal: $scope.item.nojurnal,
                    tglAwal: moment($scope.item.tanggal).format('YYYY-MM-DD 00:00:00'),
                    tglAkhir: moment($scope.item.tanggal).format('YYYY-MM-DD 23:59:59')
                }
                manageAkuntansi.postdeldoublejurnal(objSave).then(function(e) {
                    angka=angka+1
                    // $scope.item.notif = angka +'/5'
                    $scope.item.notif = $scope.item.notif + angka +'/9. ' + 'count double = ' + e.data.data + ', '
                })
                manageAkuntansi.postJurnalAkuntansi(objSave).then(function(data){
                    angka=angka+1
                    // $scope.item.notif = angka +'/5'
                    $scope.item.notif = $scope.item.notif + angka +'/9. ' + 'count Jurnal = ' + data.data.count + ', '
                    angka=angka+1
                    // $scope.item.notif = angka +'/5'
                    $scope.item.notif = $scope.item.notif + angka +'/9. ' + 'count adj = ' + data.data.count2 + ', '
                    angka=angka+1
                    // $scope.item.notif = angka +'/5'
                    $scope.item.notif = $scope.item.notif + angka +'/9. ' + 'count OB = ' + data.data.count3 + ', '
                })
                manageAkuntansi.postJurnalPenerimaanAkuntansi(objSave).then(function(data){
                    angka=angka+1
                    // $scope.item.notif = angka +'/5'
                    $scope.item.notif = $scope.item.notif + angka +'/9. ' + 'count Penerimaan = ' + data.data.count + ', '
                });
                manageAkuntansi.postJurnalAkuntansiVerifikasi(objSave).then(function(data){
                    angka=angka+1
                    // $scope.item.notif = angka +'/5'
                    $scope.item.notif = $scope.item.notif + angka +'/9. ' + 'count verif = ' + data.data.count  + ', '
                    angka=angka+1
                    $scope.item.notif = $scope.item.notif + angka +'/9. ' + 'count deposit = ' + data.data.countDeposit  + ', '
                    angka=angka+1
                    $scope.item.notif = $scope.item.notif + angka +'/9. ' + 'count diskon = ' + data.data.countDiskon   + ', '
                })
            }else{
                alert("Sudah Posting !")
                return; 
            }
            
        }
        $scope.perbaikanJurnal2 = function(){
            if ($scope.dataSelected == undefined) {
                alert("No selected row!")
                return
            }
            if ($scope.dataSelected.posted == undefined) {
                $scope.item.nojurnal=$scope.dataSelected.nojurnal
                $scope.item.tanggal=$scope.dataSelected.tgl
                var angka = 0
                $scope.item.notif = 'Perbaiki Jurnal :  '
                var objSave = 
                    {
                        nojurnal:$scope.item.nojurnal
                    }
                if (parseInt($scope.dataSelected.nojurnal.substr(12,1)) <3) {
                    manageAkuntansi.postbengkeljurnal(objSave).then(function(e) {
                        angka=angka+1
                        // $scope.item.notif1 = $scope.item.notif1 + angka +'/9. ' + 'count perbaikan = ' + e.data.data + ', '
                        // if (e.data.data > 0) {
                        //     $scope.item.notif = $scope.item.notif + angka +'. X , '
                        // }else{
                            $scope.item.notif = $scope.item.notif + angka +'. √ , '
                        // }
                    })

                    var objSave ={
                        nojurnal: $scope.item.nojurnal,
                        tglAwal: moment($scope.item.tanggal).format('YYYY-MM-DD 00:00:00'),
                        tglAkhir: moment($scope.item.tanggal).format('YYYY-MM-DD 23:59:59')
                    }
                    manageAkuntansi.postdeldoublejurnal(objSave).then(function(e) {
                        angka=angka+1
                        // $scope.item.notif2 = $scope.item.notif2  + angka +'/9. ' + 'count double = ' + e.data.data + ', '
                        if (e.data.data > 0) {
                            $scope.item.notif = $scope.item.notif + angka +'. X , '
                        }else{
                            $scope.item.notif = $scope.item.notif + angka +'. √ , '
                        }
                    })
                    manageAkuntansi.postJurnalAkuntansi(objSave).then(function(data){
                        angka=angka+1
                        // $scope.item.notif3 = $scope.item.notif3 + angka +'/9. ' + 'count Jurnal = ' + data.data.count + ', '
                        if (data.data.count == 100) {
                            $scope.item.notif = $scope.item.notif + angka +'. X , '
                        }else{
                            $scope.item.notif = $scope.item.notif + angka +'. √ , '
                        }
                        angka=angka+1
                        // $scope.item.notif4 = $scope.item.notif4 + angka +'/9. ' + 'count adj = ' + data.data.count2 + ', '
                        $scope.item.notif = $scope.item.notif + angka +'. √ , '
                        angka=angka+1
                        // $scope.item.notif5 = $scope.item.notif5 + angka +'/9. ' + 'count OB = ' + data.data.count3 + ', '
                        $scope.item.notif = $scope.item.notif + angka +'. √ , '
                    })
                    manageAkuntansi.postJurnalPenerimaanAkuntansi(objSave).then(function(data){
                        angka=angka+1
                        // $scope.item.notif6 = $scope.item.notif6 + angka +'/9. ' + 'count Penerimaan = ' + data.data.count + ', '
                        if (data.data.count == 100) {
                            $scope.item.notif = $scope.item.notif + angka +'. X , '
                        }else{
                            $scope.item.notif = $scope.item.notif + angka +'. √ , '
                        }
                    });
                }
                if (parseInt($scope.dataSelected.nojurnal.substr(12,1)) >=3) {
                    manageAkuntansi.postJurnalAkuntansiVerifikasi(objSave).then(function(data){
                        angka=angka+1
                        // $scope.item.notif7 = $scope.item.notif7 + angka +'/9. ' + 'count verif = ' + data.data.count  + ', '
                        if (data.data.count == 100) {
                            $scope.item.notif = $scope.item.notif + angka +'. X , '
                        }else{
                            $scope.item.notif = $scope.item.notif + angka +'. √ , '
                        }
                        angka=angka+1
                        // $scope.item.notif = $scope.item.notif8 + angka +'/9. ' + 'count deposit = ' + data.data.countDeposit  + ', '
                        if (data.data.countDeposit == 100) {
                            $scope.item.notif = $scope.item.notif + angka +'. X , '
                        }else{
                            $scope.item.notif = $scope.item.notif + angka +'. √ , '
                        }
                        angka=angka+1
                        // $scope.item.notif = $scope.item.notif9 + angka +'/9. ' + 'count diskon = ' + data.data.countDiskon   + ', '
                        if (data.data.countDiskon == 100) {
                            $scope.item.notif = $scope.item.notif + angka +'. X , '
                        }else{
                            $scope.item.notif = $scope.item.notif + angka +'. √ . '
                        }
                    })
                }
                
            }else{
                alert("Sudah Posting !")
                return; 
            }
            
        }
        $scope.tambah = function () {
            if ($scope.item.kdAkun == undefined) {
                alert("Pilih Akun terlabih dahulu!")
                return;
            }
            if ($scope.item.keterangan == undefined) {
                alert("Isi Keterangan terlebih dahulu!!")
                return;
            }
            
            var nomor =0
            if ($scope.dataPopUp == undefined) {
                nomor = 1
            }else{
                nomor = data2.length+1
            }
            // $scope.disabledRuangan=true;'--- '
            var namaakun = $scope.item.kdAkun.namaaccount
            if (parseFloat($scope.item.debet) == 0 ) {
                namaakun = '--- ' + $scope.item.kdAkun.namaaccount
            }
            var data ={};
            if ($scope.item.no != undefined){
                for (var i = data2.length - 1; i >= 0; i--) {
                    if (data2[i].no ==  $scope.item.no){
                        data.no = $scope.item.no
                        data.accountid = $scope.item.kdAkun.id
                        data.noaccount = $scope.item.kdAkun.noaccount
                        data.namaaccount = namaakun
                        data.namaaccount2 = $scope.item.kdAkun.namaaccount
                        data.hargasatuand = $scope.item.debet
                        data.hargasatuank = $scope.item.kredit
                        data.keteranganlainnya = ''

                        data2[i] = data;
                        $scope.dataPopUp = new kendo.data.DataSource({
                            data: data2
                        });
                        var ttlDebet = 0 ;
                        var ttlKredit = 0 ;
                        for (var i = data2.length - 1; i >= 0; i--) {
                            ttlDebet = ttlDebet + parseFloat(data2[i].hargasatuand)
                            ttlKredit = ttlKredit + parseFloat(data2[i].hargasatuank)
                        }
                        $scope.item.ttlDebet=parseFloat(ttlDebet).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.ttlKredit=parseFloat(ttlKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                    }
                    // break;
                }

            }else{
                data={
                        no:nomor,
                        accountid : $scope.item.kdAkun.id,
                        noaccount : $scope.item.kdAkun.noaccount,
                        namaaccount : namaakun,
                        namaaccount2 : $scope.item.kdAkun.namaaccount,
                        hargasatuand : $scope.item.debet,
                        hargasatuank : $scope.item.kredit,
                        keteranganlainnya : ''
                    }
                data2.push(data)
                $scope.dataPopUp = new kendo.data.DataSource({
                    data: data2
                });
                var ttlDebet = 0 ;
                var ttlKredit = 0 ;
                for (var i = data2.length - 1; i >= 0; i--) {
                    ttlDebet = ttlDebet + parseFloat(data2[i].hargasatuand)
                    ttlKredit = ttlKredit + parseFloat(data2[i].hargasatuank)
                }
                $scope.item.ttlDebet=parseFloat(ttlDebet).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlKredit=parseFloat(ttlKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
            }
           
            $scope.item.kdAkun = ""
            $scope.item.debet = "0"
            $scope.item.kredit = "0"
            // $scope.item.keterangan = ""
            
            modelItemAkuntansi.getDataDummyPHP("akuntansi/get-data-combo-coa-part", true, true, 20).then(function(data) {
                $scope.listAkun= data;
            })
        }
        $scope.SimpanPopUp =function(){
            if ($scope.item.deskripsi == undefined) {
                alert("Isi Deskripsi terlebih dahulu!!")
                return
            }
            if (data2.length == 0) {
                alert("Pilih Nama Akun terlebih dahulu!!")
                return
            }
            var strukresep = {
                        nojurnal: $scope.item.nojurnal,
                        tglentry: moment($scope.item.tglEntry).format('YYYY-MM-DD hh:mm:ss'),
                        deskripsi: $scope.item.deskripsi
                    }
            var objSave = 
                {
                    head:strukresep,
                    detail:data2
                }
            manageAkuntansi.postentryjurnal(objSave).then(function(e) {
                $scope.popupEntry.center().close();
            })
        }
        $scope.klikPopUp = function(dataSelectedPopUp){
            $scope.item.no = dataSelectedPopUp.no
            $scope.listAkun = [{id:dataSelectedPopUp.accountid,noaccount:dataSelectedPopUp.noaccount,namaaccount:dataSelectedPopUp.namaaccount2}]
            $scope.item.kdAkun ={id:dataSelectedPopUp.accountid,noaccount:dataSelectedPopUp.noaccount,namaaccount:dataSelectedPopUp.namaaccount2} 
            $scope.item.debet = dataSelectedPopUp.hargasatuand
            $scope.item.kredit = dataSelectedPopUp.hargasatuank
            $scope.item.keterangan = dataSelectedPopUp.keteranganlainnya
            $scope.item.accountid = dataSelectedPopUp.accountid
            $scope.item.noaccount = dataSelectedPopUp.noaccount
            $scope.item.namaaccount = dataSelectedPopUp.namaaccount
        }
        $scope.batal = function(dataSelectedPopUp){
            $scope.item.no = undefined
            $scope.item.kdAkun =""
            $scope.item.debet = 0
            $scope.item.kredit = 0
            $scope.item.keterangan = ""
            modelItemAkuntansi.getDataDummyPHP("akuntansi/get-data-combo-coa-part", true, true, 20).then(function(data) {
                $scope.listAkun= data;
            })
        }
        $scope.hapus = function(){
            if ($scope.item.kdAkun == undefined) {
                alert("Pilih Akun terlabih dahulu!")
                return;
            }
            if ($scope.item.keterangan == undefined) {
                alert("Isi Keterangan terlebih dahulu!!")
                return;
            }
            var data ={};
            if ($scope.item.no != undefined){
                for (var i = data2.length - 1; i >= 0; i--) {
                    if (data2[i].no ==  $scope.item.no){                            

                        data2.splice(i, 1);

                        $scope.dataPopUp = new kendo.data.DataSource({
                            data: data2
                        });
                        var ttlDebet = 0 ;
                        var ttlKredit = 0 ;
                        for (var i = data2.length - 1; i >= 0; i--) {
                            ttlDebet = ttlDebet + parseFloat(data2[i].hargasatuand)
                            ttlKredit = ttlKredit + parseFloat(data2[i].hargasatuank)
                        }
                        $scope.item.ttlDebet=parseFloat(ttlDebet).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.ttlKredit=parseFloat(ttlKredit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                    }
                }

            }
            $scope.item.no = ""
            $scope.item.kdAkun =""
            $scope.item.debet = 0
            $scope.item.kredit = 0
            $scope.item.keterangan = ""
            modelItemAkuntansi.getDataDummyPHP("akuntansi/get-data-combo-coa-part", true, true, 20).then(function(data) {
                $scope.listAkun= data;
            })
        }
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
            $scope.savePostingJurnal = function(){
                var objSave = 
                    {
                        nojurnal : $scope.item.nojurnal,
                        keteranganlainnya : $scope.item.deskripsi,
                        tglbuktitransaksi :  moment($scope.item.tanggal).format('DD-MMM-YYYY 00:00'),
                        data : dataPOsting
                    }
                
                manageAkuntansi.postjurnalrev(objSave).then(function(e) {
                    $scope.dataSelected.posted = e.data.data.noposting
                })
            }
            $scope.saveUnPostingJurnal = function(){

                var objSave = 
                    {
                        nojurnal : $scope.dataSelected.nojurnal
                    }
                
                manageAkuntansi.postunjurnalrev(objSave).then(function(e) {
                    $scope.dataSelected.posted = ''
                })
            }
                
//***********************************

}
]);
});
