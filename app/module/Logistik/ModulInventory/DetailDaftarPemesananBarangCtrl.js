define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DetailDaftarPemesananBarangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper', 'ModelItemAkuntansi', '$mdDialog',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            $scope.chkBool=true;
            var pegawaiUser = {}
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('DetailDaftarPemesananBarangCtrl');
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
                 modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                    $scope.listNamaBarang = data;
                }); 
                // manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                //     pegawaiUser = dat.data.datalogin
                // });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            $scope.newOrder =  function(){
                var confirmDialog = $mdDialog.alert()
                    .title(`Tidak bisa membuat SPPB`)
                    .textContent('Harap hubungi pihak ITI')
                    .ok('Ya')

                $mdDialog.show(confirmDialog)
                // $state.go('OrderBarangSPPB')
            }
            $scope.terimaBarang = function(){
                var data = [];
                var dataIn = '';
                var dataOn = '';
                var norec = '';
                for(var i=0; i<$scope.dataGrid._data.length; i++){
                    if($scope.dataGrid._data[i].statCheckbox){
                        if (dataOn == '') {
                             dataOn = $scope.dataGrid._data[i].produkfk;
                             dataIn = dataOn;
                        }else{
                            dataIn = $scope.dataGrid._data[i].produkfk
                            dataOn =  dataOn + ',' + dataIn 
                        }
                        if (norec != '') {
                            if ($scope.dataGrid._data[i].norec != norec) {
                                 alert('No SPPB tidak sama!')
                                 return;
                            }
                        }
                        

                        norec = $scope.dataGrid._data[i].norec
                        $scope.dataGrid._data[i]= dataOn
                        // dataIn = dataIn +  $scope.dataGrid[i].produkfk 
                        // data.push({$scope.dataGrid._data[i]})
                        // data.push({
                        //     "id" : $scope.dataSource._data[i].id,
                        //     "idproduk" : $scope.dataSource._data[i].idproduk,
                        //     "namaproduk" :$scope.dataSource._data[i].namaproduk,
                        //     "ruanganid" : $scope.dataSource._data[i].ruanganid,
                        //     "namaruangan" :$scope.dataSource._data[i].namaruangan,
                        //     "kodeexternal" :$scope.dataSource._data[i].kodeexternal,
                        // },)
                    }
                }


                // if ($scope.dataSelected.status2 != 'Done'){
                    $state.go('PenerimaanBarangSuplier')
                    var chacePeriode ={ 0 : '' ,
                        1 : 'SPPBDetail',
                        2 : norec,
                        3 : dataOn, 
                        4 : '',
                        5 : '',
                        6 : ''
                    }
                    cacheHelper.set('PenerimaanBarangSuplierCtrl', chacePeriode);
                    $state.go('PenerimaanBarangSuplier')
                // }else{
                    // alert('Permintaan sudah di terima!!')
                // }
                
            }
            function init() {
                $scope.isRouteLoading=true;
                // var ins =""
                // if ($scope.item.instalasi != undefined){
                //     var ins ="&dpid=" +$scope.item.instalasi.id
                // }
                // var rg =""
                // if ($scope.item.namaruangantujuan != undefined){
                //     var rg ="&ruangantujuanfk=" +$scope.item.namaruangantujuan.id
                // }
                // var Jra =""
                // if ($scope.item.jenisRacikan != undefined){
                //     var Jra ="&jenisobatfk=" +$scope.item.jenisRacikan.id
                // }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                 var produkfk =""
                if ($scope.item.namaBarang != undefined){
                    var produkfk ="&produkfk=" + $scope.item.namaBarang.id
                }
                manageLogistikPhp.getDataTableTransaksi("sppb/get-data-sppb-detail?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    "&noorder=" + $scope.item.noSPPB +
                    "&noKontrak=" + $scope.item.noKontrak +
                    "&keterangan=" + $scope.item.keterangan +
                    "&rekanan=" + $scope.item.namaPerusahaan 
                    + produkfk
                    , true).then(function(dat){
                        $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].statCheckbox = false;
                        dat.data.daftar[i].no = i+1
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data:  dat.data.daftar,
                        pageSize: 50,
                        total:  dat.data.daftar.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });        
                   pegawaiUser = dat.data.datalogin
                });

                var chacePeriode ={ 0 : tglAwal ,
                    1 : tglAkhir,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('DaftarPemesananBarangCtrl', chacePeriode);

                
            }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
            }           

            $scope.Cetak = function(){
                var stt = 'false'
                if (confirm('View resep? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                //client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores=NonLayanan'+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-SPPB=1&norec='+$scope.dataSelected.norec+'&view=true', function(response) {
                    
                    //aadc=response;
                });
            }
            $scope.editOrder = function(){
                if ($scope.dataSelected.status2 != 'Done'){
                    // $state.go('OrderBarangSPPB')
                    var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                        1 : 'EditOrder',
                        2 : '',
                        3 : '', 
                        4 : '',
                        5 : '',
                        6 : ''
                    }
                    cacheHelper.set('EditBarangSPPBCtrl', chacePeriode);
                    $state.go('EditBarangSPPB', {
                    norec: $scope.dataSelected.norec,
                    noOrder:'EditOrder'
                    });
                    // $state.go('OrderBarangSPPB')
                }else{
                    alert('Permintaan sudah di terima!!')
                }
            }
            $scope.KirimBarang = function(){
                if ($scope.dataSelected.status != 'Terima Order Barang') {
                    alert('Tidak bisa mengirim ke ruangan Sendiri!')
                    return;
                }
                if ($scope.dataSelected.statusorder == 'Sudah Kirim') {
                    alert('Sudah Di Kirim!')
                    return;
                }
                var chacePeriode ={ 0 : '' ,
                    1 : $scope.dataSelected.norec,
                    2 : 'KirimBarang',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('KirimBarangLogistikCtrl', chacePeriode);
                $state.go('KirimBarangLogistik')
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
                }else{
                    // Do nothing!
                    return;
                }
                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/delete-terima-barang-suplier?"+"norec_sp=" + $scope.dataSelected.norec, true).then(function(dat){
                    init()
                });
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            //  $scope.mainGridOptions = {
            //   editable: "popup",
            //     pageable: true,
            //     //scrollable: true,
            //     // height: 300,
            //     selectable: "row",
            //     columns: $scope.columnGrid,
            //     // filterable: {
            //     //     extra: false,
            //     //     operators: {
            //     //         string: {
            //     //             startsWith: "Cari Produk",
            //     //            // eq: "Is equal to",
            //     //            // neq: "Is not equal to"
            //     //         }
            //     //     }
            //     // },
            // };

            function checkValue(obj, param){
                var res="";
                var data = undefined;

                if(param.length > 1){
                    if(obj[param[0]] != undefined)
                        data = obj[param[0]][param[1]]; 
                }
                else
                {
                    data = obj[param[0]];
                }

                if(data != undefined)
                    var res = data;
                
                return res;
            }


            $scope.selectRow = function(dataItem)
            {
               
                var dataSelect = _.find($scope.dataGrid._data, function(data){
                    return data.no == dataItem.no; 
                });
               

                if(dataSelect.statCheckbox){
                    dataSelect.statCheckbox = false;
                }
                else
                {
                    dataSelect.statCheckbox = true;
                }
                
                $scope.tempCheckbox = dataSelect.statCheckbox;
                  var tempData = $scope.dataGrid._data;
                // reloadDataGrid(tempData);
              
            }



            var isCheckAll = false
            $scope.selectUnselectAllRow = function()
            {
                var tempData = $scope.dataGrid._data;

                if(isCheckAll)
                {
                    isCheckAll = false;
                    for(var i=0; i<tempData.length; i++)
                    {
                        tempData[i].statCheckbox = false;
                    }
                }
                else{
                    isCheckAll = true;
                    for(var i=0; i<tempData.length; i++)
                    {
                        tempData[i].statCheckbox = true;
                    }
                }
                // reloadDataGrid(tempData);
            }

            $scope.cekData = function()
                {
                var tempData = $scope.dataGrid._data;

                if(isCheckAll)
                {
                    isCheckAll = false;
                    for(var i=0; i<tempData.length; i++)
                    {
                        tempData[i].statCheckbox = false;
                    }
                }
                else{
                    isCheckAll = true;
                    for(var i=0; i<5; i++)
                    {
                        tempData[i].statCheckbox = true;
                    }
                }
                
                // reloadDataGrid(tempData);
                
            }

            function reloadDataGrid(ds) {
                var newDs = new kendo.data.DataSource({
                        data:  ds,
                        _data:  ds,
                        pageSize: 50,
                        total:  ds.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });    
               

                var grid = $('#kGrid').data("kendoGrid");

                grid.setDataSource(newDs);
                grid.refresh();

            }



            $scope.mainGridOptions = {
                columns: [
                 { 
                    "title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
                    template: "# if (statCheckbox) { #"+
                    "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />"+
                    "# } else { #"+
                    "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
                    "# } #",
                    width:"20px"
                },
                {
                    "field": "no",
                    "title": "No",
                    "width" : "25px",
                },
                {
                    "field": "tglorder",
                    "title": "Tgl Order",
                    "width" : "42px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglorder #', '')}}</span>"
                },
                {
                    "field": "noorder",
                    "title": "No SPPB",
                    "width" : "80px",
                },
                {
                    "field": "produkfk",
                    "title": "Kd Produk",
                    "width" : "40px",
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Produk",
                    "width" : "110px",
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan",
                    "width" : "45px",
                },
                {
                    "field": "qtyproduk",
                    "title": "Qty Produk",
                    "width" : "35px",
                },
                {
                    "field": "qtyterimalast",
                    "title": "Qty Terima",
                    "width" : "35px",
                },
                {
                    "field": "hargasatuan",
                    "title": "Harga",
                    "width" : "60px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                },
                {
                    "field": "total",
                    "title": "Total",
                    "width" : "60px",
                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                },
                {
                    "field": "petugas",
                    "title": "Petugas",
                    "width" : "100px",
                }
            ]
        }
            $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "namaproduk",
                            "title": "Nama Produk",
                            "width" : "100px",
                        },
                        {
                            "field": "satuanstandar",
                            "title": "Satuan",
                            "width" : "30px",
                        },
                        {
                            "field": "qtyproduk",
                            "title": "Qty",
                            "width" : "30px",
                            "template": "<span class='style-right'>{{formatRupiah('#: qtyproduk #', '')}}</span>"
                        },
                        {
                            "field": "qtyterimalast",
                            "title": "Sdh Terima",
                            "width" : "30px",
                            "template": "<span class='style-right'>{{formatRupiah('#: qtyterimalast #', '')}}</span>"
                        },
                        {
                            "field": "hargasatuan",
                            "title": "Harga Satuan",
                            "width" : "30px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                        },
                        {
                            "field": "hargadiscount",
                            "title": "Disc%",
                            "width" : "30px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                        },
                        {
                            "field": "hargappn",
                            "title": "Ppn%",
                            "width" : "30px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargappn #', '')}}</span>"
                        },
                        // {
                        //     "field": "totalkonfirmasi",
                        //     "title": "Total",
                        //     "width" : "30px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: totalkonfirmasi #', '')}}</span>"
                        // },
                        {
                            "field": "total",
                            "title": "Total",
                            "width" : "30px",
                            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
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
