define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RegistrasiPenunjangRevCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','ManageServicePhp',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper, manageServicePhp) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            var norec_apd = ''
            var norec_pd = ''
            var psid = ''
            $scope.CmdOrderPelayanan= true;
            $scope.OrderPelayanan = false;
            // var pegawaiUser = {}

            var data2 = [];
            $scope.PegawaiLogin2 ={};
            var namaRuangan = ''
            var namaRuanganFk = ''
            $scope.item.tglRegistrasi = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            function LoadCache(){
                var chacePeriode = cacheHelper.get('RegistrasiPenunjangCtrl');
                if(chacePeriode != undefined){
                   //var arrPeriode = chacePeriode.split(':');
                    $scope.item.noMr = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.umur = chacePeriode[3]
                    psid = chacePeriode[4]
                    // manageLogistikPhp.getDataTableTransaksi("logistik/get_detailPD?norec_apd="+norec_apd, true).then(function(data_ih){
                    //     $scope.item.jenisPenjamin = data_ih.data.detailPD[0].namarekanan
                    //     $scope.item.kelompokPasien = data_ih.data.detailPD[0].kelompokpasien
                    //     $scope.item.beratBadan = data_ih.data.detailPD[0].beratbadan
                    // });
                    init()
               }else{

               }

           }
        function init() {
            manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-data-combo?objectkelasfk="+ 6,true).then(function(dat){
                $scope.listRuangan = dat.data.ruangantujuan;
                $scope.listLayanan = dat.data.produk;
                $scope.listDokter = dat.data.dokter;
            })
            
            manageLogistikPhp.getDataTableTransaksi("pasien/get-data-combo", true).then(function(dat){
                // $scope.listRuangan = dat.data.ruangantujuan;
                // $scope.listLayanan = dat.data.produk;
                $scope.listAsalRujukan = dat.data.asalrujukan;
                $scope.listKelompokPasien = dat.data.kelompokpasien;
                $scope.listDokter = dat.data.dokter;
            });
            manageLogistikPhp.getDataTableTransaksi("get-detail-login", true).then(function(dat){
               $scope.PegawaiLogin2=dat.data
            });

        }

        $scope.formatTanggal = function(tanggal){
            return moment(tanggal).format('DD-MMM-YYYY');
        }


        $scope.columnGrid = [
        {
            "field": "no",
            "title": "No",
            "width" : "30px",
        },
        {
            "field": "tglpelayanan",
            "title": "Tgl Pelayanan",
            "width" : "90px",
        },
        {
            "field": "ruangan",
            "title": "Nama Ruangan",
            "width" : "140px"
        },
        {
            "field": "produkfk",
            "title": "Kode",
            "width" : "40px",
        },
        {
            "field": "namaproduk",
            "title": "Layanan",
            "width" : "160px",
        },
        {
            "field": "jumlah",
            "title": "Qty",
            "width" : "40px",
        },
        {
            "field": "hargasatuan",
            "title": "Harga Satuan",
            "width" : "80px",
            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
        },
        {
            "field": "hargadiscount",
            "title": "Diskon",
            "width" : "80px",
            "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
        },
        {
            "field": "total",
            "title": "Total",
            "width" : "80px",
            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
        },
        {
            "field": "nostruk",
            "title": "No Struk",
            "width" : "80px"
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
        $scope.kembali=function(){
            window.history.back();
        }
        $scope.add = function(){
            if ($scope.item.qty == 0) {
                alert("Qty harus di isi!")
                return;
            }
            if ($scope.item.ruangan == undefined) {
                alert("Pilih Ruangan terlebih dahulu!!")
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
                        data.objectruanganfk = $scope.item.ruangan.id
                        data.objectkelasfk=6

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
                        objectruanganfk:$scope.item.ruangan.id,
                        objectkelasfk:6
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
        $scope.Simpan= function(){
            if ($scope.item.ruangan == undefined) {
                alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                return
            }
            if ($scope.item.kelompokpasien == undefined) {
                alert("Pilih kelompokpasien terlebih dahulu!!")
                return
            }
            if ($scope.item.asalRujukan == undefined) {
                alert("Pilih asalRujukan terlebih dahulu!!")
                return
            }
            if (data2.length == 0) {
                alert("Pilih layanan terlebih dahulu!!")
                return
            }

            var objSaveRegistrasi = {
                objectpegawaifk: $scope.item.dokter.id,
                kelompokpasienfk: $scope.item.kelompokpasien.id,
                asalrujukanfk:$scope.item.asalRujukan.id,
                nocmfk: psid,
                objectruanganfk:$scope.item.ruangan.id,
                objectruanganfk:$scope.item.ruangan.id,
                statuspasien: 'Baru',
            }
            
            manageLogistikPhp.postregistrasipenunjang(objSaveRegistrasi).then(function(e) {
                var objSave = {
                    // norec_apd: e.data.dataAPD.norec,
                    norec_pd: e.data.dataPD.norec,
                    norec_so: "",
                    qtyproduk: data2.length,
                    objectruanganfk:$scope.item.ruangan.id,
                    objectruangantujuanfk: $scope.item.ruangan.id,
                    departemenfk:e.data.dataRuangan.objectdepartemenfk,
                    pegawaiorderfk:$scope.item.dokter.id,
                    details:data2
                }
                manageServicePhp.postOrderLayanan(objSave).then(function(e) {
                })
            })

                
                    // $scope.item.resep = e.data.noresep.norec
                    // var stt = 'false'
                    // if (confirm('View resep? ')) {
                    //     // Save it!
                    //     stt='true';
                    // } else {
                    //     // Do nothing!
                    //     stt='false'
                    // }
                    // var client = new HttpClient();
                    // client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores='+e.data.noresep.norec+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    //     //aadc=response;
                    // });
                    // if (noOrder == 'EditResep') {
                    //     var objDelete = {norec:norecResep}
                    //     manageLogistikPhp.posthapuspelayananapotik(objDelete).then(function(e) {

                    //     })
                    // }
                    // window.history.back();
                
        }
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