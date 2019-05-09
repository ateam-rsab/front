define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarReturDistribusiBarangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var pegawaiUser = {}
            var datas =[];
            var data3 =[];
            var etos =[];
            var dataCheck=[];
            $scope.dataAh = [];
            var norecKirim = '';
            var noKirim = '';
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            ComboLoad();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('DaftarReturDistribusiBarangCtrl');
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

       function ComboLoad () {

        manageLogistikPhp.getDataTableTransaksi("humas/get-daftar-combo", true).then(function(dat){
         $scope.listDataJabatan = dat.data.jabatan;
     });

        modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai-all", true, true, 20).then(function(data) {
            $scope.ListDataPegawai=data;
        });
    }

    function loadCombo(){
        modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
            $scope.listNamaBarang = data;
        });                 
    }

    $scope.BatalCetak = function(){

     $scope.popUp.close();               

 }

 function init() {
    $scope.isRouteLoading=true;             
    var rg =""
    if ($scope.item.namaruangantujuan != undefined){
        var rg ="&ruangantujuanfk=" +$scope.item.namaruangantujuan.id
    }
    var produkfk =""
    if ($scope.item.namaBarang != undefined){
        var produkfk ="&produkfk=" + $scope.item.namaBarang.id
    }
    var noretur =""
    if ($scope.item.NoRetur != undefined){
        var noretur ="&noretur=" + $scope.item.NoRetur
    }
    var nokirim=""
    if ($scope.item.struk != undefined) {
        nokirim ="&nokirim=" + $scope.item.struk
    }
    var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
    var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
    manageLogistikPhp.getDataTableTransaksi("retur-stok/get-daftar-retur-distribusi-ruangan?"+
        "tglAwal=" + tglAwal + 
        "&tglAkhir=" + tglAkhir +
         nokirim + noretur+rg+produkfk
        , true).then(function(dat){
            $scope.isRouteLoading=false;
            for (var i = 0; i < dat.data.daftar.length; i++) {
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
        cacheHelper.set('DaftarReturDistribusiBarangCtrl', chacePeriode);


    }
    $scope.klikGrid = function(data){
        if (data != undefined) {

            etos= data.details;

        }

    }
    $scope.getRuangan = function(){
        $scope.listRuangan = $scope.item.instalasi.ruangan;
    }
    $scope.cariFilter = function(){

        init();
    }

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
                $scope.popUp.center().open();
                // var stt = 'false'
                // if (confirm('View Bukti Kirim? ')) {
                //     // Save it!
                //     stt='true';
                // } else {
                //     // Do nothing!
                //     stt='false'
                // }
                // var client = new HttpClient();
                // client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-pengeluaran=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                //     //aadc=response;
                // });
            }

            $scope.CetakAh = function(){
                var jabatan1 = ''
                if($scope.item.DataJabatan != undefined){
                    jabatan1 = $scope.item.DataJabatan.namajabatan;
                }
                
                var jabatan2 = ''
                if($scope.item.DataJabatan1 != undefined){
                    jabatan2 = $scope.item.DataJabatan1.namajabatan;
                }
                
                var jabatan3 =''
                if($scope.item.DataJabatan2 != undefined){
                    jabatan3 = $scope.item.DataJabatan2.namajabatan;
                }

                var pegawai = ''
                if($scope.item.DataPegawai != undefined){
                    pegawai =$scope.item.DataPegawai.id;
                }

                var pegawai1 = ''
                if($scope.item.DataPegawai1 != undefined){
                    pegawai1 =$scope.item.DataPegawai1.id;
                }
                
                var pegawai2 = ''
                if($scope.item.DataPegawai2 != undefined){
                    pegawai2 =$scope.item.DataPegawai2.id;
                }

                var stt = 'false'
                if (confirm('View Bukti Kirim? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-pengeluaran=1&nores='+$scope.dataSelected.norec+'&pegawaiPenyerah='+pegawai+'&pegawaiPenerima='+pegawai1+'&pegawaiMegetahui='+pegawai2
                    +'&JabatanPenyerah='+jabatan1+'&JabatanPenerima='+jabatan2+'&jabatanMengetahui='+jabatan3+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response; 

                });                 
                 $scope.popUp.close();
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

            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "20px",
                },
                // {
                //     "field": "status",
                //     "title": "Status",
                //     "width" : "60px"
                // },
                {
                    "field": "tglretur",
                    "title": "Tgl Retur",
                    "width" : "50px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglretur #', '')}}</span>"
                },
                {
                    "field": "noretur",
                    "title": "No Retur",
                    "width" : "80px",
                },
                {
                    "field": "nostruk",
                    "title": "No Kirim",
                    "width" : "80px",
                },
                {
                    "field": "jeniskirim",
                    "title": "Jenis Kirim",
                    "width" : "80px",
                },
                {
                    "field": "jmlitem",
                    "title": "Item",
                    "width" : "35px",
                    "template": "<span class='style-right'>#= kendo.toString(jmlitem) #</span>",
                },
                {
                    "field": "namaruanganasal",
                    "title": "Nama Ruangan Asal",
                    "width" : "100px",
                },
                {
                    "field": "namaruangantujuan",
                    "title": "Nama Ruangan Tujuan",
                    "width" : "100px",
                },
                {
                    "field": "petugasretur",
                    "title": "Petugas",
                    "width" : "100px",
                },
                {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width" : "100px",
                }
            ];
            

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
                            "title": "Qty Retur",
                            "width" : "30px",
                            "template": "<span class='style-right'>#= kendo.toString(qtyproduk) #</span>",
                        }
                    ]
                }
            };  
            
        $scope.formatRupiah = function(value, currency) {
            return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }
        
        $scope.formatTanggal = function(tanggal){
              return moment(tanggal).format('DD/MM/YYYY');
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
//***********************************

}
]);
});
