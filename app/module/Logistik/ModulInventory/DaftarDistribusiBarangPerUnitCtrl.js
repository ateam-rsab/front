define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarDistribusiBarangPerUnitCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper) {
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
              var chacePeriode = cacheHelper.get('DaftarDistribusiBarangCtrl');
              if(chacePeriode != undefined){
               //var arrPeriode = chacePeriode.split(':');
                $scope.item.tglAwal = new Date(chacePeriode[0]);
                $scope.item.tglAkhir = new Date(chacePeriode[1]);
               
                init();
             }
             else{
               $scope.item.tglAwal = moment($scope.now).format('YYYY-MM-DD 00:00'); 
               $scope.item.tglAkhir = moment($scope.now).format('YYYY-MM-DD 23:59');
               init();
             }
           }
            function loadCombo(){
                manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                    // pegawaiUser = dat.data.datalogin
                    $scope.listRuanganAsal = dat.data.ruangan;
                    $scope.listRuangan = dat.data.ruangan;
                });

                manageLogistikPhp.getDataTableTransaksi("aset/get-combo-aset", true).then(function(dat){
                    // pegawaiUser = dat.data.datalogin
                    $scope.listKelompokBarang = dat.data.kelompokproduk;
                    $scope.listJenisBarang = dat.data.jenisproduk;
                    $scope.listAsalProduk = dat.data.asalproduk;
                });

            }
            function init() {
                $scope.isRouteLoading=true;
                var ra =""
                if ($scope.item.RuanganAsal != undefined){
                    var ra ="&ruanganasalfk=" +$scope.item.RuanganAsal.id
                }
                var rg =""
                if ($scope.item.ruangan != undefined){
                    var rg ="&ruangantujuanfk=" +$scope.item.ruangan.id
                }
                var namaProduk =""
                if ($scope.item.NamaBarang != undefined){
                    var namaProduk ="&namaproduk=" + $scope.item.NamaBarang
                }

                //*Filter Baru

                var AsalProduk =""
                if ($scope.item.AsalProduk != undefined){
                    var AsalProduk ="&AsalProduk=" +$scope.item.AsalProduk.id
                }
                var kelompokProduk =""
                if ($scope.item.kelompokProduk != undefined){
                    var kelompokProduk ="&kelompokProduk=" +$scope.item.kelompokProduk.id
                }
                var jenisProduk =""
                if ($scope.item.jenisProduk != undefined){
                    var jenisProduk ="&jenisProduk=" + $scope.item.jenisProduk.id
                }
                //*End Filter Baru
                var KdSirs1 = ""
                if ($scope.item.KdSirs1 != undefined) {
                    KdSirs1 =  "&KdSirs1=" + $scope.item.KdSirs1
                }
                var KdSirs2 = ""
                if ($scope.item.KdSirs2 != undefined) {
                    KdSirs2 =  "&KdSirs2=" + $scope.item.KdSirs2
                }

                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-daftar-distribusi-barang-perunit?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    "&nokirim=" + $scope.item.struk + ra + rg + AsalProduk + KdSirs1 + KdSirs2 +
                    kelompokProduk + jenisProduk + namaProduk 
                    , true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var datas = dat.data.data;
                    var jenistransfer ='';
                    var subtotal = 0;
                    for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i+1
                        // datas[i].statCheckbox = false;
                        if(datas[i].jenispermintaanfk == 1){
                            jenistransfer = "Amprahan";
                        }else{
                            jenistransfer = "Transfer";
                        }
                        datas[i].jenispermintaan = jenistransfer;
                        subtotal= parseFloat(datas[i].total)+subtotal
                    }
                     $scope.subTotals = subtotal

                    // $scope.dataGrid = datas;
                    $scope.dataGrid = new kendo.data.DataSource({
                        data:datas,
                        pageSize: 100,
                        total: datas.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                    // $scope.dataGrid = {
                    //     data:datas,
                    //     pageSize: 100,
                    //     selectable: true,
                    //     refresh: true,
                    //     aggregate:[
                    //         {field:'total', aggregate:'sum'},
                    //     ]
                    // };     
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
                cacheHelper.set('DaftarDistribusiBarangCtrl', chacePeriode);

                
            }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
            }

            // $scope.TransaksiPelayanan = function(){
            //     debugger;
            //     var arrStr ={ 0 : $scope.dataSelected.nocm ,
            //         1 : $scope.dataSelected.namapasien,
            //         2 : $scope.dataSelected.jeniskelamin,
            //         3 : $scope.dataSelected.noregistrasi, 
            //         4 : $scope.dataSelected.umur,
            //         5 : $scope.dataSelected.klid,
            //         6 : $scope.dataSelected.namakelas,
            //         7 : $scope.dataSelected.tglregistrasi,
            //         8 : $scope.dataSelected.norec_apd,
            //         9 : 'resep'
            //     }
            //     cacheHelper.set('TransaksiPelayananApotikCtrl', arrStr);
            //     $state.go('TransaksiPelayananApotik')

            //     var arrStr2 ={ 0 : $scope.dataSelected.norec 
            //     }
            //     cacheHelper.set('DaftarResepCtrl', arrStr2);
            //     $state.go('DaftarResepCtrl')
            // }

            $scope.CetakBuktiLayanan = function(){
                var stt = 'false'
                if (confirm('View resep? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores=NonLayanan'+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response;
                });
            }
            $scope.NewKirim = function(){
                $state.go('KirimBarangLogistik')
            }
            $scope.EditKirim = function(){
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di ubah!!")
                    return;
                }
                var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : '',
                    2 : 'EditKirim',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('KirimBarangLogistikCtrl', chacePeriode);
                $state.go('KirimBarangLogistik')
            }
            $scope.Cetak = function(){
                var stt = 'false'
                if (confirm('View Bukti Kirim? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-pengeluaran=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response;
                });
            }
            $scope.DaftarDistribusiBarang = function(){
                // var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                //     1 : 'EditTerima',
                //     2 : '',
                //     3 : '', 
                //     4 : '',
                //     5 : '',
                //     6 : ''
                // }
                // cacheHelper.set('PenerimaanBarangSuplierCtrl', chacePeriode);
                // $state.go('PenerimaanBarangSuplier')
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

            // $scope.formatRupiah = function(value, currency) {
            //     if (value=="undefined" ||value=="null" ){
            //         value=0;
            //         return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
            //     }else{
            //         return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
            //     }
            // };

            //  $scope.selectRow = function(dataItem)
            // {
               
            //     var dataSelect = _.find($scope.dataGrid._data, function(data){
            //         return data.no == dataItem.no; 
            //     });
               

            //     if(dataSelect.statCheckbox){
            //         dataSelect.statCheckbox = false;
            //     }
            //     else
            //     {
            //         dataSelect.statCheckbox = true;
            //     }
                
            //     $scope.tempCheckbox = dataSelect.statCheckbox;
            //       var tempData = $scope.dataGrid._data;
            //     reloadDataGrid(tempData);
              
            // }



            // var isCheckAll = false
            // $scope.selectUnselectAllRow = function()
            // {
            //     var tempData = $scope.dataGrid._data;

            //     if(isCheckAll)
            //     {
            //         isCheckAll = false;
            //         for(var i=0; i<tempData.length; i++)
            //         {
            //             tempData[i].statCheckbox = false;
            //         }
            //     }
            //     else{
            //         isCheckAll = true;
            //         for(var i=0; i<tempData.length; i++)
            //         {
            //             tempData[i].statCheckbox = true;
            //         }
            //     }
            //     reloadDataGrid(tempData);
            // }

            // $scope.cekData = function()
            //     {
            //     var tempData = $scope.dataGrid._data;

            //     if(isCheckAll)
            //     {
            //         isCheckAll = false;
            //         for(var i=0; i<tempData.length; i++)
            //         {
            //             tempData[i].statCheckbox = false;
            //         }
            //     }
            //     else{
            //         isCheckAll = true;
            //         for(var i=0; i<5; i++)
            //         {
            //             tempData[i].statCheckbox = true;
            //         }
            //     }
                
            //     reloadDataGrid(tempData);
                
            // }

            // function reloadDataGrid(ds) {
            //     var newDs = new kendo.data.DataSource({
            //             data:  ds,
            //             _data:  ds,
            //             pageSize: 50,
            //             total:  ds.length,
            //             serverPaging: false,
            //             schema: {
            //                 model: {
            //                     fields: {
            //                     }
            //                 }
            //             }
            //         });    
               

            //     var grid = $('#kGrids').data("kendoGrid");

            //     grid.setDataSource(newDs);
            //     grid.refresh();

            // }

            $scope.columnGrid = {
                toolbar: ["excel"],
                excel: {
                    fileName: "Laporan Distribusi Barang Per Unit  " + moment($scope.item.tglAwal).format( 'DD/MMM/YYYY') + "-"
                    + moment($scope.item.tglAkhir).format( 'DD/MMM/YYYY')+".xlsx",
                    allPages: true,
                },
                excelExport: function(e){

                  var sheet = e.workbook.sheets[0];
                  sheet.frozenRows = 1;
                  sheet.mergedCells = ["A1:M1"];
                  sheet.name = "Orders";

                  var myHeaders = [{
                    value:"Rekap Pengeluaran Barang Gudang",
                    fontSize: 10,
                    textAlign: "center",
                    background:"#ffffff",
                                    // color:"#ffffff"
                  }];

                  sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 20});
                },
                sortable: false,
                reorderable: true,
                filterable: false,
                pageable: true,
                columnMenu: false,
                resizable: true,
                selectable: 'row',
                columns: [
                    // { 
                    //     "title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
                    //     template: "# if (statCheckbox) { #"+
                    //     "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />"+
                    //     "# } else { #"+
                    //     "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
                    //     "# } #",
                    //     width:"20px"
                    // },
                    {
                        "field": "no",
                        "title": "No",
                        "width" : "30px",
                    },
                    {
                        "field": "tglkirim",
                        "title": "Tanggal",
                        "width" : "60px",
                        "template": "<span class='style-right'>{{formatTanggal('#: tglkirim #', '')}}</span>"
                    },
                     {
                        "field": "nokirim",
                        "title": "No Pengeluaran",
                        "width" : "80px",
                    },
                    {
                        "field": "ruanganasal",
                        "title": "Ruangan Asal",
                        "width" : "80px",
                    },
                    {
                        "field": "ruangantujuan",
                        "title": "Ruangan Tujuan",
                        "width" : "80px",
                    },
                    {
                        "field": "kodebarang",
                        "title": "Kode Produk",
                        "width" : "70px"
                    },
                    {
                        "field": "kdsirs",
                        "title": "Kode Sirs",
                        "width" : "70px"
                    },
                    {
                        "field": "namaproduk",
                        "title": "Nama Barang",
                        "width" : "100px",
                                    // "template": "<span class='style-right'>{{formatTanggal('#: tglstruk #', '')}}</span>" 
                    },
                   
                    {
                        "field": "jenispermintaan",
                        "title": "Jenis Pengeluaran",
                        "width" : "60px",
                    },
                    
                    {
                        "field": "satuanstandar",
                        "title": "Satuan",
                        "width" : "80px",
                    },
                    {
                        "field": "qtyproduk",
                        "title": "Qty",
                        "width" : "50px",
                        // template: "<span class='style-right'>{{number('#: qtyproduk #', '')}}</span>"
                    },
                    {
                        "field": "hargasatuan",
                        "title": "Harga Satuan",
                        "width" : "90px",
                        template: "<span class='style-right'>{{formatRupiah('#: hargasatuan #', 'Rp. ')}}</span>",
                    },
                    {
                        "field": "total",
                        "title": "Nilai",
                        "width" : "120px",
                        // aggregates:["sum"],
                        template: "<span class='style-right'>{{formatRupiah('#: total #', 'Rp. ')}}</span>",
                        // footerTemplate: "<span class='style-right'>{{formatRupiah(subTotals,'Rp. ')}}</span>" 
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
            $scope.formatRupiah = function(value, number) {
                return number + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ",");
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
