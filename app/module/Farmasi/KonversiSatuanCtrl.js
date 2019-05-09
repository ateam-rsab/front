define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KonversiSatuanCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            var idProduk =0;
           // Init();
           //  LoadCache();
           //  function LoadCache(){
           //      var chacePeriode = cacheHelper.get('TransaksiPelayananApotikCtrl');
           //      if(chacePeriode != undefined){
           //         //var arrPeriode = chacePeriode.split(':');
           //         $scope.item.noMr = chacePeriode[0]
           //         $scope.item.namaPasien = chacePeriode[1]
           //         $scope.item.jenisKelamin = chacePeriode[2]
           //         $scope.item.noregistrasi = chacePeriode[3]
           //         $scope.item.umur = chacePeriode[4]
           //         $scope.listKelas =([{id:chacePeriode[5],namakelas:chacePeriode[6]}]) 
           //         $scope.item.kelas ={id:chacePeriode[5],namakelas:chacePeriode[6]} 
           //         $scope.item.tglRegistrasi = chacePeriode[7]
           //         norec_apd = chacePeriode[8]
           //         init()
           //     }else{

           //     }
           // }
       $scope.Cari = function(){
            Init();
       } 
        function Init() {
            
            manageLogistikPhp.getDataTableTransaksi("logistik/get-data-combo?namaproduk="+ $scope.item.namaProduk, true).then(function(dat){
                for (var i = 0; i < dat.data.produk.length; i++) {
                    dat.data.produk[i].no = i+1
                }
                $scope.dataGridProduk = dat.data.produk;
                $scope.listsatuanstandar_asal = dat.data.satuanstandar;
                $scope.listsatuanstandar_tujuan = dat.data.satuanstandar;
            });

        }

        $scope.klikGridProduk = function(dataSelected){
            KlikProduk()
        }
        function KlikProduk(){
            idProduk=$scope.dataSelectedProduk.id;
            manageLogistikPhp.getDataTableTransaksi("logistik/get-konversi-satuan?produkfk="+idProduk, true).then(function(dat){
                for (var i = 0; i < dat.data.length; i++) {
                    dat.data[i].no = i+1
                    $scope.item.satuanstandar_asal = {id:dat.data[i].ssidasal,satuanstandar:dat.data[i].satuanstandar_asal}
                }
                $scope.dataGrid = dat.data;

            });
            kosong();
        }
        $scope.klikGrid = function(dataSelected){
           // $scope.item.satuanstandar_asal = {id:dataSelected.ssidasal,satuanstandar:dataSelected.satuanstandar_asal}
            $scope.item.satuanstandar_tujuan = {id:dataSelected.ssidtujuan,satuanstandar:dataSelected.satuanstandar_tujuan}
            $scope.item.nilaikonversi = dataSelected.nilaikonversi
            $scope.item.norec = dataSelected.norec
        }

        $scope.formatTanggal = function(tanggal){
            return moment(tanggal).format('DD-MMM-YYYY');
        }

        $scope.kosongkan = function(){
            kosong();
        }
        function kosong(){
            // $scope.item.satuanstandar_asal = ''
            $scope.item.satuanstandar_tujuan = ''
            $scope.item.nilaikonversi = ''
            $scope.item.norec = '-'
        }
        $scope.tambahData = function(){
            if ($scope.item.satuanstandar_asal == undefined){
                alert("Pilih satuan!!")
                return;
            }
            if ($scope.item.satuanstandar_tujuan == undefined){
                alert("Pilih satuan!!")
                return;
            }
            if ($scope.item.nilaikonversi == undefined){
                alert("Isi nilai konversi!!")
                return;
            }
            if ($scope.item.norec == undefined){
                alert("error, ulangi proses!")
                return;
            }
            var objSave = [
                {
                    norec:$scope.item.norec,
                    nilaikonversi:parseFloat($scope.item.nilaikonversi),
                    objekprodukfk:idProduk,
                    satuanstandar_asal:$scope.item.satuanstandar_asal.id,
                    satuanstandar_tujuan:$scope.item.satuanstandar_tujuan.id
                }
            ]
            manageLogistikPhp.postkonversisatuan(objSave).then(function(e) {
                //$scope.item.resep = e.data.noresep
                KlikProduk()
            })

        }
        $scope.hapusData = function(){
            if ($scope.item.satuanstandar_asal == undefined){
                alert("Pilih satuan!!")
                return;
            }
            if ($scope.item.satuanstandar_tujuan == undefined){
                alert("Pilih satuan!!")
                return;
            }
            if ($scope.item.nilaikonversi == undefined){
                alert("Isi nilai konversi!!")
                return;
            }
            if ($scope.item.norec == undefined){
                alert("error, ulangi proses!")
                return;
            }
            var objSave = [
                {
                    norec:$scope.item.norec
                }
            ]
            manageLogistikPhp.posthapuskonversisatuan(objSave).then(function(e) {
                //$scope.item.resep = e.data.noresep
                KlikProduk()
            })
        }
        $scope.columnGrid = [
            {
                "field": "no",
                "title": "No",
                "width" : "20px",
            },
            {
                "field": "satuanstandar_asal",
                "title": "Satuan Asal",
                "width" : "80px",
            },
            {
                "field": "satuanstandar_tujuan",
                "title": "Satuan Tujuan",
                "width" : "80px",
            },
            {
                "field": "nilaikonversi",
                "title": "Nilai Konversi",
                "width" : "40px",
            }
        ];

        $scope.columnGridProduk = [
            {
                "field": "no",
                "title": "No",
                "width" : "10px",
            },
            {
                "field": "id",
                "title": "Id Produk",
                "width" : "30px",
            },
            {
                "field": "namaproduk",
                "title": "Nama Produk",
                "width" : "80px",
            }
        ];

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
            $scope.back=function(){
                $state.go("DaftarPasienApotik")
            }
            $scope.TambahObat =function(){
                 debugger;
                var arrStr ={ 0 : $scope.item.noMr ,
                    1 : $scope.item.namaPasien,
                    2 : $scope.item.jenisKelamin,
                    3 : $scope.item.noregistrasi, 
                    4 : $scope.item.umur,
                    5 : $scope.item.kelas.id,
                    6 : $scope.item.kelas.namakelas,
                    7 : $scope.item.tglRegistrasi,
                    8 : norec_apd
                }
                cacheHelper.set('InputResepApotikCtrl', arrStr);
                $state.go('InputResepApotik')
            }
//***********************************

}
]);
});
