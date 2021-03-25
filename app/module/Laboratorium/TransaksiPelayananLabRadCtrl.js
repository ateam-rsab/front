define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('TransaksiPelayananLabRadCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','ManagePasien', 'ManageServicePhp',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,managePasien, manageServicePhp) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var norec_apd = ''
            var norec_pd = ''
            var norec_so = ''
            $scope.CmdOrderPelayanan= true;
            $scope.OrderPelayanan = false;
            // var pegawaiUser = {}

            var data2 = [];
            $scope.PegawaiLogin2 ={};
            var namaRuangan = ''
            var namaRuanganFk = ''
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            function LoadCache(){
                var chacePeriode = cacheHelper.get('editOrderCache');
                if(chacePeriode != undefined){
                   //var arrPeriode = chacePeriode.split(':');
                    $scope.item.noMr = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    $scope.item.kelompokPasien=chacePeriode[13]
                    $scope.item.umur = chacePeriode[4]
                    $scope.listKelas =([{id:chacePeriode[5],namakelas:chacePeriode[6]}]) 
                    $scope.item.kelas ={id:chacePeriode[5],namakelas:chacePeriode[6]} 
                    $scope.item.tglRegistrasi = chacePeriode[7]
                    norec_apd = chacePeriode[8]
                    namaRuangan = chacePeriode[9]
                    namaRuanganFk = chacePeriode[10]
                    norec_pd = chacePeriode[11]
                    norec_so = chacePeriode[12]


                    $scope.item.ruanganAsal = namaRuangan;
                    // manageLogistikPhp.getDataTableTransaksi("logistik/get_detailPD?norec_apd="+norec_apd, true).then(function(data_ih){
                    //     if(data_ih.data.detailPD[0].namarekanan!=undefined)
                    //          $scope.item.jenisPenjamin = data_ih.data.detailPD[0].namarekanan
                    //     if(data_ih.data.detailPD[0].beratbadan!=undefined)
                    //          $scope.item.beratBadan = data_ih.data.detailPD[0].beratbadan
                    // });
                    init()
               }else{

               }

           }
        function init() {
            $scope.isRouteLoading=true;
            
            manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-data-combo?objectkelasfk="+$scope.item.kelas.id,true).then(function(dat){
                $scope.listRuanganTujuan = dat.data.ruangantujuan;
                $scope.listLayanan = dat.data.produk;
                $scope.listDokter = dat.data.dokter;
            })
             manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-order-pelayanan?norec_so="+norec_so
                  +"&objectkelasfk=" +$scope.item.kelas.id, true).then(function(dat){
                for (var i = 0; i < dat.data.data.length; i++) {
                    dat.data.data[i].no = i+1
                    // dat.data[i].total =parseFloat(dat.data[i].jumlah) * (parseFloat(dat.data[i].hargasatuan)-parseFloat(dat.data[i].hargadiscount))
                }
                 $scope.isRouteLoading=false;
                $scope.dataGrid = dat.data.data;
               
            });
            // manageLogistikPhp.getDataTableTransaksi("get-detail-login", true).then(function(dat){
            //    $scope.PegawaiLogin2=dat.data
            // });

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
        {
            "field": "tglpelayanan",
            "title": "Tgl Pelayanan",
            "width" : "90px",
        },
        {
            "field": "ruangantujuan",
            "title": "Ruangan Tujuan",
            "width" : "140px"
        },
        {
            "field": "prid",
            "title": "Kode",
            "width" : "40px",
        },
        {
            "field": "namaproduk",
            "title": "Layanan",
            "width" : "160px",
        },
        {
            "field": "qtyproduk",
            "title": "Qty",
            "width" : "40px",
        },
        // {
        //     "field": "hargasatuan",
        //     "title": "Harga Satuan",
        //     "width" : "80px",
        //     "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
        // },
        // {
        //     "field": "hargadiscount",
        //     "title": "Diskon",
        //     "width" : "80px",
        //     "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
        // },
        // {
        //     "field": "total",
        //     "title": "Total",
        //     "width" : "80px",
        //     "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
        // },
        {
            "field": "catatan",
            "title": "Catatan",
            "width" : "100px"
        }
        ];

        $scope.columnGridOrder = [
            {
                "field": "no",
                "title": "No",
                "width" : "30px",
            },
            {
                "field": "namaproduk",
                "title": "Layanan",
                "width" : "160px",
            },
            {
                "field": "qtyproduk",
                "title": "Qty",
                "width" : "40px",
            }
        ];
        $scope.back = function(){
            window.history.back();
        }
        $scope.order = function(){
            $scope.CmdOrderPelayanan = false;
            $scope.OrderPelayanan = true;
        }
        $scope.Batal = function(){
            
        }
        $scope.add = function(){
            if ($scope.item.qty == 0) {
                alert("Qty harus di isi!")
                return;
            }
            if ($scope.item.ruangantujuan == undefined) {
                alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                return;
            }
            if ($scope.item.layanan == undefined) {
                alert("Pilih Layanan terlebih dahulu!!")
                return;
            }
            var nomor =0
            if ($scope.dataGridOrder == undefined) {
                nomor = 1
            }else{
                nomor = data2.length+1
            }
            var data ={};
            if ($scope.item.no != undefined){
                for (var i = data2.length - 1; i >= 0; i--) {
                    if (data2[i].no ==  $scope.item.no){
                        data.no = $scope.item.no

                        data.produkfk = $scope.item.layanan.id
                        data.namaproduk = $scope.item.layanan.namaproduk
                        data.qtyproduk =parseFloat($scope.item.qty)
                        data.objectruanganfk = namaRuanganFk
                        data.objectruangantujuanfk = $scope.item.ruangantujuan.id
                        data.objectkelasfk=  $scope.item.kelas.id
                        data.catatanOrder = "", // catatan hanya untuk dokter
                        data2[i] = data;
                        $scope.dataGridOrder = new kendo.data.DataSource({
                            data: data2
                        });
                    }
                }

            }else{
                data={
                        no:nomor,
                        produkfk:$scope.item.layanan.id,
                        namaproduk:$scope.item.layanan.namaproduk,
                        qtyproduk:parseFloat($scope.item.qty),
                        objectruanganfk:namaRuanganFk,
                        objectruangantujuanfk:$scope.item.ruangantujuan.id,
                        objectkelasfk: $scope.item.kelas.id,
                        catatanOrder: "", // catatan hanya untuk dokter
                    }
                data2.push(data)
                // $scope.dataGrid.add($scope.dataSelected)
                $scope.dataGridOrder = new kendo.data.DataSource({
                    data: data2
                });
            }
        }
        $scope.klikGrid = function(dataSelected){
            var dataProduk =[];
            //no:no,
            $scope.item.no = dataSelected.no
            for (var i = $scope.listLayanan.length - 1; i >= 0; i--) {
                if ($scope.listLayanan[i].id == dataSelected.produkfk){
                    dataProduk = $scope.listLayanan[i]
                    break;
                }
            }
            $scope.item.layanan = dataProduk;//{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
            // $scope.item.stok = dataSelected.jmlstok //* $scope.item.nilaiKonversi 

            $scope.item.qty = dataSelected.qtyproduk
        }
        $scope.hapus = function(){
            if ($scope.item.qty == 0) {
                alert("Qty harus di isi!")
                return;
            }
            if ($scope.item.ruangantujuan == undefined) {
                alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                return;
            }
            if ($scope.item.layanan == undefined) {
                alert("Pilih Layanan terlebih dahulu!!")
                return;
            }
            var nomor =0
            if ($scope.dataGrid == undefined) {
                nomor = 1
            }else{
                nomor = data2.length+1
            }
            var data ={};
            if ($scope.item.no != undefined){
                for (var i = data2.length - 1; i >= 0; i--) {
                    if (data2[i].no ==  $scope.item.no){
                        data2.splice(i, 1); 
                        for (var i = data2.length - 1; i >= 0; i--) {
                            data2[i].no = i+1
                        }
                        // data2[i] = data;
                        $scope.dataGridOrder = new kendo.data.DataSource({
                            data: data2
                        });
                    }
                }

            }
        }
        $scope.batal = function(){
            $scope.item.layanan =''
            $scope.item.qty =''
            $scope.item.no=undefined
        }
        $scope.BatalOrder= function(){
            data2=[]
            $scope.dataGridOrder = new kendo.data.DataSource({
                data: data2
            });
            $scope.CmdOrderPelayanan = true;
            $scope.OrderPelayanan = false;
        }
        $scope.Simpan = function(){
            if ($scope.item.ruangantujuan == undefined) {
                    alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                    return
                }
                if (data2.length == 0) {
                    alert("Pilih layanan terlebih dahulu!!")
                    return
                }
                var objSave = {
                            norec_apd: norec_apd,
                            norec_pd: norec_pd,
                            norec_so: norec_so,
                            qtyproduk: data2.length,//
                            objectruanganfk:namaRuanganFk,
                            objectruangantujuanfk: $scope.item.ruangantujuan.id,
                            departemenfk:$scope.item.ruangantujuan.departemenfk,
                            pegawaiorderfk:$scope.item.dokter.id,
                            details:data2
                        }
                
                manageServicePhp.postOrderLayanan(objSave).then(function(e) {
                    init()
                    
                })
        }

        $scope.hapusTindakan =  function(){
            if ($scope.dataSelected == undefined) {
                toastr.error('Pilih pelayanan dahulu!');
                return;
            }
           
            var objDelete = {
                "norec_op": $scope.dataSelected.norec_op,
            };
            manageServicePhp.deleteOrderPelayanan(objDelete).then(function(e){
                init()
            })
        }
            
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            // $scope.back=function(){
            //     //$state.go("DaftarPasienApotik")
            //     window.history.back();
            // }
            // $scope.TambahObat =function(){
            //      //debugger;
            //     var arrStr ={ 0 : $scope.item.noMr ,
            //         1 : $scope.item.namaPasien,
            //         2 : $scope.item.jenisKelamin,
            //         3 : $scope.item.noregistrasi, 
            //         4 : $scope.item.umur,
            //         5 : $scope.item.kelas.id,
            //         6 : $scope.item.kelas.namakelas,
            //         7 : $scope.item.tglRegistrasi,
            //         8 : norec_apd,
            //         9 : '',
            //         10 : $scope.item.jenisPenjamin,
            //         11 : $scope.item.kelompokPasien,
            //         12 : $scope.item.beratBadan,
            //         13 : $scope.item.AlergiYa
            //     }
            //     cacheHelper.set('InputResepApotikCtrl', arrStr);
            //     $state.go('InputResepApotik')
            // }
            // $scope.EditResep =function(){
            //      //debugger;
            //     var arrStr ={ 0 : $scope.item.noMr ,
            //         1 : $scope.item.namaPasien,
            //         2 : $scope.item.jenisKelamin,
            //         3 : $scope.item.noregistrasi, 
            //         4 : $scope.item.umur,
            //         5 : $scope.item.kelas.id,
            //         6 : $scope.item.kelas.namakelas,
            //         7 : $scope.item.tglRegistrasi,
            //         8 : norec_apd,
            //         9 : 'EditResep',
            //         10 : $scope.item.jenisPenjamin,
            //         11 : $scope.item.kelompokPasien,
            //         12 : $scope.item.beratBadan,
            //         13 : $scope.item.AlergiYa,
            //         14 : $scope.dataSelected.norec_resep
            //     }
            //     cacheHelper.set('InputResepApotikCtrl', arrStr);
            //     $state.go('InputResepApotik')
            // }

            // $scope.orderApotik =function(){
            //     $state.go("InputResepApotikOrder")
            // }
            // $scope.HapusResep = function(){
            //     var objDelete = {norec:$scope.dataSelected.norec_resep}
            //     manageLogistikPhp.posthapuspelayananapotik(objDelete).then(function(e) {
            //         init();
            //     })
            // }
            // $scope.cetakEtiket = function(){
            //     var client = new HttpClient();
            //     client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-label-etiket=1&norec='+$scope.dataSelected.norec_resep+'&cetak=1', function(response) {
            //         // aadc=response;
            //     });
            // }
            $scope.cetakResep = function(){
                if ($scope.dataSelected == undefined) {
                    alert('Pilih resep yg akan di cetak')
                    return;
                }
                var stt = 'false'
                if (confirm('View resep? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores='+$scope.dataSelected.norec_resep+'&view='+stt+'&user='+$scope.dataSelected.detail.userData.namauser, function(response) {
                    // aadc=response;
                });
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

// http://127.0.0.1:1237/printvb/farmasiApotik?cetak-label-etiket=1&norec=6a287c10-8cce-11e7-943b-2f7b4944&cetak=1