define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SaldoBarangDetailCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
            var details =[];
            $scope.selectedJenisProduk =[]
            $scope.selectedDetailJenis =[]
            LoadCache();
            loadCombo();
            
            $scope.selectOptionsDetailJenis = {
                // placeholder: "Pilih Detail Jenis Produk...",
                dataTextField: "detailjenisproduk",
                dataValueField: "id",
                filter: "contains"
              };
            $scope.selectOptJenisProduk = {
                // placeholder: "Pilih Jenis Produk...",
                dataTextField: "jenisproduk",
                dataValueField: "id",
                filter: "contains"
              };
            function LoadCache(){
                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-data-stock-flow", true).then(function(dat){
                    $scope.listRuangan = dat.data.ruangan
                    $scope.listJenisProduk = dat.data.jenisproduk
                    $scope.listDetailJenis = dat.data.detailjenisproduk
                    // $scope.listKdSirs = dat.data.kodesirs
                    // $scope.listKdSirs1 = dat.data.kodesirs
                    $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                    var chacePeriode = cacheHelper.get('SaldoBarangDetailCtrl');
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
                });
                  
           }
            function loadCombo(){
                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                    $scope.listKdSirs = data
                    $scope.listKdSirs1 = data
                    $scope.listProduk = data
                });
            }
            $scope.newOrder =  function(){
                $state.go('OrderBarangLogistik')
            }
            function init() {
                
                $scope.isRouteLoading=true;
                // var ins =""
                // if ($scope.item.instalasi != undefined){
                //     var ins ="&dpid=" +$scope.item.instalasi.id
                // }
                var rg =""
                if ($scope.item.ruangan != undefined){
                    var rg = +$scope.item.ruangan.id
                }

                var listJenisProd = ""
                if ($scope.selectedJenisProduk.length != 0){
                    var a = ""
                    var b = ""
                    for (var i = $scope.selectedJenisProduk.length - 1; i >= 0; i--) {
                        var c = $scope.selectedJenisProduk[i].id
                        b = "," + c
                        a = a + b
                    }
                    listJenisProd = a.slice(1, a.length)
                }
                var listDetailJenis =""
                if ($scope.selectedDetailJenis.length != 0){
                    var a = ""
                    var b = ""
                    for (var i = $scope.selectedDetailJenis.length - 1; i >= 0; i--) {
                        var c = $scope.selectedDetailJenis[i].id
                        b = "," + c
                        a = a + b
                    }
                    listDetailJenis = a.slice(1, a.length)

                }
                var KdSirs1 = ""
                if ($scope.item.KdSirs1 != undefined) {
                    KdSirs1 =  "&KdSirs1=" + $scope.item.KdSirs1
                }
                var KdSirs2 = ""
                if ($scope.item.KdSirs2 != undefined) {
                    KdSirs2 =  "&KdSirs2=" + $scope.item.KdSirs2
                }
                var IdProduk = ""
                if ($scope.item.Produk != undefined) {
                    IdProduk = "&IdProduk=" + $scope.item.Produk.id
                }
                //  var produkfk =""
                // if ($scope.item.namaBarang != undefined){
                //     var produkfk ="&produkfk=" + $scope.item.namaBarang.id
                // }
                var ttlsaldoawal = 0
                var ttlpenerimaan = 0
                var ttlpengeluaran = 0
                var ttlsaldoakhir = 0

                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-daftar-stock-flow-v1?"+
                    "tglawal=" + tglAwal + 
                    "&tglakhir=" + tglAkhir +
                    "&ruanganfk=" + rg +
                    "&jenisprodukfk=" +listJenisProd+
                    "&detailjenisprodukfk=" +  listDetailJenis +
                    KdSirs1 + KdSirs2 + IdProduk
                    , true).then(function(dat){
                    details=dat.data.data;
                    $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.data.length; i++) {
                        dat.data.data[i].no = i+1
                        ttlsaldoawal = parseFloat(ttlsaldoawal) + parseFloat(dat.data.data[i].ttlawal)
                        ttlpenerimaan = parseFloat(ttlpenerimaan) + parseFloat(dat.data.data[i].ttlmasuk)
                        ttlpengeluaran = parseFloat(ttlpengeluaran) + parseFloat(dat.data.data[i].ttlkeluar)
                        ttlsaldoakhir = parseFloat(ttlsaldoakhir) + parseFloat(dat.data.data[i].ttlakhir)
                        // var tanggal = $scope.now;
                        // var tanggalLahir = new Date(dat.data.daftar[i].tgllahir);
                        // var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                        // dat.data.daftar[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                        //itungUsia(dat.data[i].tgllahir)
                    }

                    $scope.item.ttlsaldoawal = parseFloat(ttlsaldoawal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.ttlpenerimaan = parseFloat(ttlpenerimaan).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.ttlpengeluaran = parseFloat(ttlpengeluaran).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.ttlsaldoakhir = parseFloat(ttlsaldoakhir).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    
                     $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 20,
                        total: dat.data.data.length,
                        serverPaging: false,
                        // sort:[
                        //     {
                        //         field: "namaproduk",
                        //         dir:"asc"
                        //     }
                        // ],
                       
                    });
                      $scope.dataExcel = dat.data.data;
                   // $scope.dataGrid = dat.data.data;
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
                cacheHelper.set('SaldoBarangDetailCtrl', chacePeriode);

                
            }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){
                // $scope.popUpCari.center().open()
                init();
            }
            $scope.cariPopUp = function(){
                console.log($scope.selectedJenisProduk)
                init();
                $scope.popUpCari.close()
            }
            $scope.batal = function(){
                $scope.popUpCari.close()
            }

            // $scope.TransaksiPelayanan = function(){
            //     
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
            $scope.EditOrder = function(){
                if ($scope.dataSelected.status == 'Terima Order Barang') {
                    alert('Tidak bisa mengubah order ini!')
                    return;
                }
                if ($scope.dataSelected.statusorder == 'Sudah Kirim') {
                    alert('Sudah Di Kirim!')
                    return;
                }
                var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'EditOrder',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('OrderBarangLogistikCtrl', chacePeriode);
                $state.go('OrderBarangLogistik')
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
                } else {
                    // Do nothing!
                    return;
                }
                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/delete-terima-barang-suplier?"+"norec_sp=" + $scope.dataSelected.norec, true).then(function(dat){
                    init()
                });
            }

            $scope.closingPersediaan = function(){
                var stt = 'false'
                if (confirm('Close Persediaan bulan "' + dateHelper.formatDate($scope.item.tglAkhir,"MMMM YYYY") + '"')) {
                    // Save it!
                    stt='true';
                    // var norec_tea = $scope.item.norecSaldo
                    // if ($scope.item.norecSaldo ==  undefined){
                    //     norec_tea ='-'
                    // }
                    var tgltgl = moment($scope.item.tglAkhir).format('YYYYMM');
                    var objSave = 
                    {
                        ym : tgltgl,
                        data : details
                    }
                    manageLogistikPhp.postclosingpersediaan(objSave).then(function(e) {
                        
                    })
                } else {
                    // Do nothing!
                    stt='false'
                }
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.columnGrid = {
                toolbar:["excel"],
                excel: {
                    fileName:"Saldo Penerimaan & Pengeluaran"+moment($scope.now).format( 'DD/MMM/YYYY'),
                    allPages: true,
                },
                selectable: 'row',
                pageable: true,
                editable: false,
                sortable:true,
                columns: [
                   {
                        field: "no",
                        title: "No",
                        width : "20px",
                    },
                    {
                        field: "kodebmn",
                        title: "Kode",
                        width : "30px"
                    },
                    {
                        field: "kodeproduk",
                        title: "Kode Sirs",
                        width : "30px"
                    },
                    {
                        field: "namaproduk",
                        title: "Nama Barang",
                        width : "90px"
                    },
                    {
                        field: "satuanstandar",
                        title: "Satuan",
                        width : "20px",
                    },
                    {
                        title: "Saldo Awal",
                        columns : [
                        {
                            field: "qtyawal",
                            title: "Qty",
                            width : "30px",
                            template: "<span class='style-right'>{{formatRupiah('#: qtyawal #', '')}}</span>"
                        },
                        {
                            field: "ttlawal",
                            title: "Jumlah (Rp)",
                            width : "60px",
                            template: "<span class='style-right'>{{formatRupiah('#: ttlawal #', '')}}</span>"
                        }],
                        width : "90px",
                    },
                    {
                        field: "harga",
                        title: "Harga Satuan",
                        width : "40px",
                        template: "<span class='style-right'>{{formatRupiah('#: harga #', '')}}</span>"
                    },
                    {
                        title: "Penerimaan",
                        columns : [
                        {
                            field: "qtymasuk",
                            title: "Qty",
                            width : "30px",
                            template: "<span class='style-right'>{{formatRupiah('#: qtymasuk #', '')}}</span>"
                        },
                        {
                            field: "ttlmasuk",
                            title: "Jumlah (RP)",
                            width : "60px",
                            template: "<span class='style-right'>{{formatRupiah('#: ttlmasuk #', '')}}</span>"
                        }],
                        width : "90px",
                    },
                    {
                        title: "Pengeluaran",
                        columns : [
                        {
                            field: "qtykeluar",
                            title: "Qty",
                            width : "30px",
                            template: "<span class='style-right'>{{formatRupiah('#: qtykeluar #', '')}}</span>"
                        },
                        {
                            field: "ttlkeluar",
                            title: "Jumlah (Rp)",
                            width : "60px",
                            template: "<span class='style-right'>{{formatRupiah('#: ttlkeluar #', '')}}</span>"
                        }],
                        width : "90px",
                    },
                    {
                        title: "Saldo Akhir",
                        columns : [
                        {
                            field: "qtyakhir",
                            title: "Qty",
                            width : "30px",
                            template: "<span class='style-right'>{{formatRupiah('#: qtyakhir #', '')}}</span>"
                        },
                        {
                            field: "ttlakhir",
                            title: "Jumlah (Rp)",
                            width : "60px",
                            template: "<span class='style-right'>{{formatRupiah('#: ttlakhir #', '')}}</span>"
                        }],
                        width : "90px",
                    }
                ],

            };

            // $scope.columnGrid = [
            //     {
            //         field: "no",
            //         title: "No",
            //         width : "20px",
            //     },
            //     {
            //         field: "kodebmn",
            //         title: "Kode",
            //         width : "50px"
            //     },
            //     {
            //         field: "kodeproduk",
            //         title: "Kode Sirs",
            //         width : "50px"
            //     },
            //     {
            //         field: "namaproduk",
            //         title: "Nama Barang",
            //         width : "50px"
            //     },
            //     {
            //         field: "satuanstandar",
            //         title: "Satuan",
            //         width : "20px",
            //     },
            //     {
            //         field: "harga",
            //         title: "Harga Satuan",
            //         width : "40px",
            //         template: "<span class='style-right'>{{formatRupiah('#: harga #', '')}}</span>"
            //     },
            //     {
            //         title: "Saldo Awal",
            //         columns : [
            //         {
            //             field: "qtyawal",
            //             title: "Qty",
            //             width : "30px",
            //             template: "<span class='style-right'>{{formatRupiah('#: qtyawal #', '')}}</span>"
            //         },
            //         {
            //             field: "ttlawal",
            //             title: "Jumlah (Rp)",
            //             width : "60px",
            //             template: "<span class='style-right'>{{formatRupiah('#: ttlawal #', '')}}</span>"
            //         }],
            //         width : "90px",
            //     },
            //     {
            //         title: "Penerimaan",
            //         columns : [
            //         {
            //             field: "qtymasuk",
            //             title: "Qty",
            //             width : "30px",
            //             template: "<span class='style-right'>{{formatRupiah('#: qtymasuk #', '')}}</span>"
            //         },
            //         {
            //             field: "ttlmasuk",
            //             title: "Jumlah (RP)",
            //             width : "60px",
            //             template: "<span class='style-right'>{{formatRupiah('#: ttlmasuk #', '')}}</span>"
            //         }],
            //         width : "90px",
            //     },
            //     {
            //         title: "Pengeluaran",
            //         columns : [
            //         {
            //             field: "qtykeluar",
            //             title: "Qty",
            //             width : "30px",
            //             template: "<span class='style-right'>{{formatRupiah('#: qtykeluar #', '')}}</span>"
            //         },
            //         {
            //             field: "ttlkeluar",
            //             title: "Jumlah (Rp)",
            //             width : "60px",
            //             template: "<span class='style-right'>{{formatRupiah('#: ttlkeluar #', '')}}</span>"
            //         }],
            //         width : "90px",
            //     },
            //     {
            //         title: "Saldo Akhir",
            //         columns : [
            //         {
            //             field: "qtyakhir",
            //             title: "Qty",
            //             width : "30px",
            //             template: "<span class='style-right'>{{formatRupiah('#: qtyakhir #', '')}}</span>"
            //         },
            //         {
            //             field: "ttlakhir",
            //             title: "Jumlah (Rp)",
            //             width : "60px",
            //             template: "<span class='style-right'>{{formatRupiah('#: ttlakhir #', '')}}</span>"
            //         }],
            //         width : "90px",
            //     }
            // ];

            // $("#kGrid").kendoGrid({
            //     toolbar: ["excel"],
            //         excel: {
            //             fileName: "SaldoPenerimaanDanPengeluaranBarang.xlsx",
            //             allPages: true,
            //         },
                
            //     dataSource: $scope.dataExcel,
            //     sortable: true,
            //     pageable: true,
            //     resizable: true,
            //     columns: [
            //         {
            //             field: "no",
            //             title: "No",
            //             width : "20px",
            //         },
            //         {
            //             field: "kodebmn",
            //             title: "Kode",
            //             width : "30px"
            //         },
            //         {
            //             field: "kodeproduk",
            //             title: "Kode Sirs",
            //             width : "50px"
            //         },
            //         {
            //             field: "namaproduk",
            //             title: "Nama Barang",
            //             width : "50px"
            //         },
            //         {
            //             field: "satuanstandar",
            //             title: "Satuan",
            //             width : "20px",
            //         },
            //         {
            //             field: "harga",
            //             title: "Harga Satuan",
            //             width : "40px",
            //             template: "<span class='style-right'>{{formatRupiah('#: harga #', '')}}</span>"
            //         },
            //         {
            //             title: "Saldo Awal",
            //             columns : [
            //             {
            //                 field: "qtyawal",
            //                 title: "Qty",
            //                 width : "30px",
            //                 template: "<span class='style-right'>{{formatRupiah('#: qtyawal #', '')}}</span>"
            //             },
            //             {
            //                 field: "ttlawal",
            //                 title: "Jumlah (Rp)",
            //                 width : "60px",
            //                 template: "<span class='style-right'>{{formatRupiah('#: ttlawal #', '')}}</span>"
            //             }],
            //             width : "90px",
            //         },
            //         {
            //             title: "Penerimaan",
            //             columns : [
            //             {
            //                 field: "qtymasuk",
            //                 title: "Qty",
            //                 width : "30px",
            //                 template: "<span class='style-right'>{{formatRupiah('#: qtymasuk #', '')}}</span>"
            //             },
            //             {
            //                 field: "ttlmasuk",
            //                 title: "Jumlah (RP)",
            //                 width : "60px",
            //                 template: "<span class='style-right'>{{formatRupiah('#: ttlmasuk #', '')}}</span>"
            //             }],
            //             width : "90px",
            //         },
            //         {
            //             title: "Pengeluaran",
            //             columns : [
            //             {
            //                 field: "qtykeluar",
            //                 title: "Qty",
            //                 width : "30px",
            //                 template: "<span class='style-right'>{{formatRupiah('#: qtykeluar #', '')}}</span>"
            //             },
            //             {
            //                 field: "ttlkeluar",
            //                 title: "Jumlah (Rp)",
            //                 width : "60px",
            //                 template: "<span class='style-right'>{{formatRupiah('#: ttlkeluar #', '')}}</span>"
            //             }],
            //             width : "90px",
            //         },
            //         {
            //             title: "Saldo Akhir",
            //             columns : [
            //             {
            //                 field: "qtyakhir",
            //                 title: "Qty",
            //                 width : "30px",
            //                 template: "<span class='style-right'>{{formatRupiah('#: qtyakhir #', '')}}</span>"
            //             },
            //             {
            //                 field: "ttlakhir",
            //                 title: "Jumlah (Rp)",
            //                 width : "60px",
            //                 template: "<span class='style-right'>{{formatRupiah('#: ttlakhir #', '')}}</span>"
            //             }],
            //             width : "90px",
            //         }
            //     ]

             // });

            // $scope.data2 = function(dataItem) {
            //     return {
            //         dataSource: new kendo.data.DataSource({
            //             data: dataItem.details
            //         }),
            //         columns: [
            //             {
            //                 "field": "namaproduk",
            //                 "title": "Nama Produk",
            //                 "width" : "100px",
            //             },
            //             {
            //                 "field": "satuanstandar",
            //                 "title": "Satuan",
            //                 "width" : "30px",
            //             },
            //             {
            //                 "field": "qtyproduk",
            //                 "title": "Qty",
            //                 "width" : "30px",
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
            $scope.CetakLap = function() {
                var tglawal = moment($scope.item.tglAwal).format('YYYY-MM-DD 00:00');
                var tglakhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD 23:59');
                if($scope.item.ruangan == undefined)
                    var ruangan = "";
                else
                    var ruangan = $scope.item.ruangan.id;
                
                var stt = 'false'
                if (confirm('View Laporan Stok Opname? ')){
                    // Save it!
                    stt='true';
                }else {
                    // Do nothing!
                    stt='false'
                }
                // old
                // var client = new HttpClient();        
                // client.get('http://127.0.0.1:1237/printvb/logistik?cetak-stokopname=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&ruangan='+ruangan+'&view='+ stt+'&user='+ $scope.dataLogin.namaLengkap, function(response) {
                // });
                var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-stokopname2=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&ruangan='+ruangan+'&view='+ stt+'&user='+ $scope.dataLogin.namaLengkap, function(response) {
                });
            };

            $scope.CetakRiwayat = function() {                
                $scope.isRouteLoading=true;
                var tglawal = moment($scope.item.tglAwal).format('YYYY-MM-DD 00:00');
                var tglakhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD 23:59');
                if($scope.item.ruangan == undefined)
                    var ruangan = "";
                else
                    var ruangan = $scope.item.ruangan.id;

                var data2 = details

                var  TempData = []
                        for(var i=0;i<data2.length; i++){
                           // if (details[i].rekananfk != null && details[i].statusbarang == null){
                               TempData.push(data2[i])
                            // }    
                        }
                var data = 
                    {
                        details:TempData
                    }
                    manageLogistikPhp.riwayatrealisasi(data).then(function(e) {
                    $scope.isRouteLoading=false;
                    // debugger;
                    var noIr = e.data.noIr
                    if (confirm('View Riwayat Persediaan? ')) {
                        stt='true';
                    } else {                   
                    var stt = 'false'
                    }
                    // Do nothing!
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/logistik?cetak-riwayatpersediaan=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&idriwayat='+noIr+'&view='+ stt+'&user='+ $scope.dataLogin.namaLengkap, function(response) {
                    });
                        // stt='false'
                })
            };

           
//***********************************

}
]);
});
