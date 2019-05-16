define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarSPKCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper', 'ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,modelItemAkuntansi) {
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
              var chacePeriode = cacheHelper.get('DaftarSPKCtrl');
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
            $scope.Tambah = function(){
                $state.go('KegiatanSPK')
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
                var produkfk =""
                if ($scope.item.namaBarang != undefined){
                    var produkfk ="&produkfk=" + $scope.item.namaBarang.id
                }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("spk/get-daftar-spk?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    "&noKontrak=" + $scope.item.nousulan +
                    "&keterangan=" + $scope.item.jenisusulan 
                    + produkfk
                    // "&namarekanan=" + $scope.item.namarekanan
                    ,true).then(function(dat){
                        $scope.isRouteLoading=false;
                        var dataPasien = [];                   
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1 
                        if (dat.data.daftar[i].status == 1) {
                            dat.data.daftar[i].status2 = "Done"
                        }else{
                            dat.data.daftar[i].status2 = ""
                        }                      
                    }
                   $scope.dataGrid = dat.data.daftar;
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
                cacheHelper.set('DaftarSPKCtrl', chacePeriode);

                
            }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
            }

            $scope.newSPPB = function(){
                // debugger;
                 var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'EditOrder',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('OrderBarangSPPBCtrl', chacePeriode);
                $state.go('OrderBarangSPPB', {
                    norec: $scope.dataSelected.norec,
                    noOrder:'EditOrder'
                });
                // $state.go('OrderBarangSPPB')
            }

            $scope.PenerimaanSPK = function(){
                 var chacePeriode ={ 0 : '' ,
                    1 : 'SPK',
                    2 : $scope.dataSelected.norec,
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('PenerimaanBarangSuplierCtrl', chacePeriode);
                $state.go('PenerimaanBarangSuplier', {
                    norec: $scope.dataSelected.norec,
                    noOrder:'SPK'
                });
            }

            $scope.Verifikasi = function(){
                 var chacePeriode ={ 0 : '' ,
                    1 : 'VerifSPK',
                    2 : $scope.dataSelected.norec,
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('InputSPKBaruCtrl', chacePeriode);
                $state.go('InputSPKBaru', {
                    norec: $scope.dataSelected.norec,
                    noOrder:'VerifSPK'
                });
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
            // $scope.CetakBukti = function(){
            //     var stt = 'false'
            //     if (confirm('View Bukti Penerimaan? ')) {
            //         // Save it!
            //         stt='true';
            //     } else {
            //         // Do nothing!
            //         stt='false'
            //     }
            //     var client = new HttpClient();
            //     client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-penerimaan=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
            //         //aadc=response;
            //     });
            // }
            $scope.Cetak = function(){
                var stt = 'false'
                if (confirm('View Bukti SPK? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-spk=1&nores='+$scope.dataSelected.norec+'&view='+stt, function(response) {
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
                cacheHelper.set('EditKegiatanSPKCtrl', chacePeriode);
                $state.go('EditKegiatanSPK', {
                    norec: $scope.dataSelected.norec,
                    noOrder:'EditTerima'
                });
                // $state.go('EditKegiatanSPK')
            }

            $scope.HapusSPK= function(){
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }

                if ($scope.dataSelected.norecpenerimaan != undefined) {
                    alert("SPK Sudah Diterima, Tidak Dapat Dihapus!!")
                    return;
                }

                manageLogistikPhp.getDataTableTransaksi("spk/get-data-SPKkeUPK?"
                    +"&ketOrder="+ $scope.dataSelected.keterangan
                    +"&rekananfk="+ $scope.dataSelected.rekananfk, true)
                    .then(function(dat){
                        var data =dat.data;
                        var datae={
                             "data": data,
                        }
                        var datas={
                            "norec_so": $scope.dataSelected.norec,
                            "nokontrakspk": $scope.dataSelected.nospk
                        }

                        if (data != undefined){
                            manageLogistikPhp.updatedataspkkeupk(datae).then(function(e) {
                                // init()
                            })
                            manageLogistikPhp.deletespk(datas).then(function(e) {
                                init()
                            })
                        }
                });
            }

            $scope.TambahSPK= function(){
                $state.go ('InputSPKBaru');
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


            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "35px",
                },
                {
                    "field": "nospk",
                    "title": "No PO",
                    "width" : "120px"
                },
                // {
                //     "field": "noorder",
                //     "title": "No Usulan",
                //     "width" : "100px",
                // },
                {
                    "field": "tglorder",
                    "title": "Tanggal",
                    "width" : "58px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglorder #', '')}}</span>"
                },
                {
                    "field": "supplier",
                    "title": "Supplier",
                    "width" : "120px"
                },
                {
                    "field": "jmlitem",
                    "title": "Item",
                    "width" : "35px",
                    "template": "<span class='style-right'>#= kendo.toString(jmlitem) #</span>",
                },
                // {
                //     "field": "tglkebutuhan",
                //     "title": "Tgl Kebutuhan",
                //     "width" : "85px",
                //     "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
                // },
                // {
                //     "field": "keterangan",
                //     "title": "Jenis Usulan",
                //     "width" : "120px",
                // },
                // {
                //     "field": "koordinator",
                //     "title": "Koordinator Barang",
                //     "width" : "60px",
                // },
                {
                    "field": "ruangan",
                    "title": "Unit Pembuat",
                    "width" : "120px",
                },
                {
                    "field": "penanggungjawab",
                    "title": "Pembuat PO",
                    "width" : "110px",
                },
                {
                    "field": "mengetahui",
                    "title": "Mengetahui",
                    "width" : "110px",
                },
                {
                    "field": "ruangantujuan",
                    "title": "Unit Peminta",
                    "width" : "120px",
                },
                // {
                //     "field": "tglkontrak",
                //     "title": "Tgl Kontrak",
                //     "width" : "100px",
                //      "template": '# if( tglkontrak==null) {#<span class="center">-<span># } else {#<span>#= kendo.toString(new Date(tglkontrak), "dd-MM-yyyy HH:mm") #<span>#} #',
                // },
                // {
                //     "field": "status2",
                //     "title": "Status",
                //     "width" : "100px"
                // }
            ];
            $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "tglkebutuhan",
                            "title": "Tgl Kebutuhan",
                            "width" : "80px",
                            "template": "<span class='style-right'>{{formatTanggal('#: tglkebutuhan #', '')}}</span>"
                        },
                        {
                            "field": "prid",
                            "title": "Kode Produk",
                            "width" : "40px",
                        },
                        {
                            "field": "namaproduk",
                            "title": "Nama Produk",
                            "width" : "90px",
                        },
                        {
                            "field": "spesifikasi",
                            "title": "Spesifikasi",
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
                            "width" : "50px",
                        },
                        {
                            "field": "qtyterimalast",
                            "title": "Sdh Terima",
                            "width" : "65px",
                        },
                        {
                            "field": "hargasatuan",
                            "title": "Harga Satuan",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                        },
                        {
                            "field": "total",
                            "title": "Total",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                        }
                        //  {
                        //     "field": "qtyprodukkonfirmasi",
                        //     "title": "Qty Confirm",
                        //     "width" : "40px",
                        // },
                        // {
                        //     "field": "hargasatuanquo",
                        //     "title": "Harga Confirm",
                        //     "width" : "40px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: hargasatuanquo #', '')}}</span>"
                        // },
                        // {
                        //     "field": "totalkonfirmasi",
                        //     "title": "Total Confirm",
                        //     "width" : "50px",
                        //     "template": "<span class='style-right'>{{formatRupiah('#: totalkonfirmasi #', '')}}</span>"
                        // }
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