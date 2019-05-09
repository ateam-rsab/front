define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('OrderPenunjangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','ManageServicePhp',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper, manageServicePhp) {
            $scope.item = {};

            $scope.currentNorecPD = $state.params.norecPD;
            $scope.currentNorecAPD = $state.params.norecAPD;
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
            loadPertama();
            function loadPertama(){

                $scope.isRouteLoading=true;
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-pasien-bynorec/"
                    +$scope.currentNorecPD
                    +"/"
                    +$scope.currentNorecAPD)         
                .then(function (e) {
                   $scope.isRouteLoading = false;
                   $scope.item.pasien=e.data[0];

               })
                init();
            }
            function init() {
                manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-data-combo-order?objectkelasfk="+ 6,true).then(function(dat){
                    $scope.listRuangan = dat.data.ruangantujuan;
                    $scope.listDokter = dat.data.dokter;
                })

               
                manageLogistikPhp.getDataTableTransaksi("get-detail-login", true).then(function(dat){
                 $scope.PegawaiLogin2=dat.data
             });

            }
            $scope.getLayanan=function(){
              manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-data-combo-order?objectdepartemenfk="+
                         $scope.item.ruangan.objectdepartemenfk
                         +"&objectkelasfk="+ 6 ,true).then(function(dat){         
                    $scope.listLayanan = dat.data.produk;
              })
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
           
            if (data2.length == 0) {
                alert("Pilih layanan terlebih dahulu!!")
                return
            }

           
            var objSave = {
                // norec_apd: e.data.dataAPD.norec,
                norec_pd: $state.params.norecPD,
                norec_so: "",
                qtyproduk: data2.length,
                objectruanganfk:$scope.item.pasien.objectruanganfk,
                objectruangantujuanfk: $scope.item.ruangan.id,
                departemenfk:$scope.item.ruangan.objectdepartemenfk,
                pegawaiorderfk:$scope.item.dokter.id,
                details:data2
            }
            manageServicePhp.postOrderLayanan(objSave).then(function(e) {
            })
        
            }
//***********************************

}
]);
});

// http://127.0.0.1:1237/printvb/farmasiApotik?cetak-label-etiket=1&norec=6a287c10-8cce-11e7-943b-2f7b4944&cetak=1