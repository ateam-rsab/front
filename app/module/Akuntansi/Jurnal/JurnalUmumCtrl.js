define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('JurnalUmumCtrl', ['$q', '$rootScope', '$scope', 'ManageAkuntansi','$state','CacheHelper','DateHelper',
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
              var chacePeriode = cacheHelper.get('JurnalUmumCtrl');
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
                // manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                //     pegawaiUser = dat.data.datalogin
                // });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            $scope.Tambah = function(){
                $state.go('UsulanPermintaanBarangJasaRuangan')
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
                // var Jra =""
                // if ($scope.item.jenisRacikan != undefined){
                //     var Jra ="&jenisobatfk=" +$scope.item.jenisRacikan.id
                // }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-jurnal-umum?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir 
                    , true).then(function(dat){
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
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data.data,
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
                        group: [
                            // {
                            //      field: "tgl", 
                            //      // aggregates: [
                            //      //    { field: "debet", aggregate: "sum"},
                            //      //    { field: "kredit", aggregate: "sum"}
                            //      // ]
                            // },
                            {
                                 field: "kelompok", 
                                 // aggregates: [
                                 //    { field: "debet", aggregate: "sum"},
                                 //    { field: "kredit", aggregate: "sum"}
                                 // ]
                            }
                        ],
                        sort:[
                            {
                                field: "debet",
                                dir:"desc"
                            }
                        ]

                        // aggregate: [ 
                        //     { field: "debet", aggregate: "sum" },
                        //     { field: "kredit", aggregate: "sum" }
                        // ]
                        
                        // pageSize: 10,
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
            $scope.CetakBukti = function(){
                var stt = 'false'
                if (confirm('View Bukti Penerimaan? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-penerimaan=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response;
                });
            }
            $scope.Cetak = function(){
                var stt = 'false'
                if (confirm('View Bukti Penerimaan? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpermintaanbarang=1&nores='+$scope.dataSelected.norec+'&view='+stt, function(response) {
                    //aadc=response;
                });
            }
            
            $scope.EditTerima = function(){
                var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'EditTerima',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('UsulanPermintaanBarangJasaRuanganCtrl', chacePeriode);
                $state.go('UsulanPermintaanBarangJasaRuangan')
            }

            $scope.HapusPenerimaan = function(){
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }
                if ($scope.dataSelected.nosbm != undefined) {
                    alert("Sudah di bayar tidak dapat di hapus!!")
                    return;
                }
                var stt = 'false'
                if (confirm('Hapus Penerimaan? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    return;
                }
                manageAkuntansi.getDataTableTransaksi("penerimaan-suplier/delete-terima-barang-suplier?"+"norec_sp=" + $scope.dataSelected.norec, true).then(function(dat){
                    init()
                });
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }


            $scope.columnGrid = [
                // {
                //     "field": "no",
                //     "title": "No",
                //     "width" : "20px",
                // },
                {
                    "field": "kelompok",
                    "title": "Kelompok",
                    "width" : "120px"
                },
                // {
                //     "field": "tgl",
                //     "title": "Tanggal",
                //     "width" : "50px"
                // },
                {
                    "field": "noaccount",
                    "title": "Kode Perkiraan",
                    "width" : "70px"
                },
                {
                    "field": "namaaccount",
                    "title": "Nama Perkiraan",
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
                }
            ];
            // $scope.group = {
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
            // };
            $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "tglpelayanan",
                            "title": "Tgl Pelayanan",
                            "width" : "70px",
                        },
                        {
                            "field": "noregistrasi",
                            "title": "noregistrasi",
                            "width" : "40px",
                        },
                        {
                            "field": "namapasien",
                            "title": "Nama Pasien",
                            "width" : "90px",
                        },
                        {
                            "field": "id",
                            "title": "id",
                            "width" : "40px",
                        },
                        {
                            "field": "namaproduk",
                            "title": "namaproduk",
                            "width" : "100px",
                        },
                        {
                            "field": "qty",
                            "title": "Qty",
                            "width" : "20px",
                        },
                        {
                            "field": "tarif",
                            "title": "Harga Satuan",
                            "width" : "40px",
                            "template": "<span class='style-right'>{{formatRupiah('#: tarif #', '')}}</span>"
                        }
                    ]
                }
            };  
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
//***********************************

}
]);
});
