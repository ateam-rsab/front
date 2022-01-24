define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('HIS_Obat_MSCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            var idProduk =0;
           Init();
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
                for (var i = 0; i < dat.data.dataHIS.length; i++) {
                    dat.data.dataHIS[i].no = i+1
                    if (dat.data.dataHIS[i].statusenabled == true) {
                        dat.data.dataHIS[i].sttid =1
                        dat.data.dataHIS[i].sttstatus ='Enabled'
                    }else{
                        dat.data.dataHIS[i].sttid =2
                        dat.data.dataHIS[i].sttstatus ='Disabled'
                    }
                }
                $scope.dataGridProduk = dat.data.produk;
                $scope.listsatuanstandar = dat.data.satuanstandar;
                $scope.listsstatusenabled = [{id:1,status:'Enabled'},{id:2,status:'Disabled'}];
                $scope.item.statusenabled = {id:1,status:'Enabled'};
                $scope.dataGrid = dat.data.dataHIS;
            });

        }

        $scope.klikGridProduk = function(dataSelected){
            KlikProduk()
        }
        function KlikProduk(){
            $scope.item.uid = undefined
            $scope.item.barcodeID = '-'
            $scope.item.HObatID = $scope.dataSelectedProduk.id
            $scope.item.namaObat = $scope.dataSelectedProduk.namaproduk
            $scope.item.packageUnit = ''
            $scope.item.dosageform = {id:$scope.dataSelectedProduk.ssid,satuanstandar:$scope.dataSelectedProduk.satuanstandar}
            $scope.item.statusenabled = {id:1,status:'Enabled'};
        }
        $scope.klikGrid = function(dataSelected){
            $scope.item.uid = $scope.dataSelected.norec
            $scope.item.barcodeID = $scope.dataSelected.barcodeid
            $scope.item.HObatID = $scope.dataSelected.hobatid
            $scope.item.namaObat = $scope.dataSelected.namaproduk
            $scope.item.packageUnit = $scope.dataSelected.packageunit
            $scope.item.dosageform = {id:$scope.dataSelected.ssid,satuanstandar:$scope.dataSelected.satuanstandar}
            $scope.item.statusenabled = {id:$scope.dataSelected.sttid,status:$scope.dataSelected.sttstatus};
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
            if ($scope.item.HObatID == undefined){
                alert("Pilih obat!!")
                return;
            }
            if ($scope.item.namaObat == undefined){
                alert("Pilih Obat!!")
                return;
            }
            if ($scope.item.packageUnit == undefined){
                alert("Isi packageUnit!!")
                return;
            }
            var stts = 'f'
            if ($scope.item.statusenabled.id == 1) {
                stts = 't'
            }
            var brcd = '-'
            if ($scope.item.uid != undefined) {
                // brcd = $scope.item.barcodeID
                brcd= $scope.item.uid
            }
            var objSave ={
                    norec:brcd,
                    hobatid:$scope.item.HObatID,
                    namaproduk:$scope.item.namaObat,
                    packageunit:$scope.item.packageUnit,
                    dosageform:$scope.item.dosageform.satuanstandar,
                    statusenabled:stts
                }
            
            manageLogistikPhp.postaerocom_hisobatms(objSave).then(function(e) {
                $scope.item.barcodeID = e.data.data.barcodeid
                Init();
            })

        }
        $scope.columnGrid = [
            {
                "field": "no",
                "title": "No",
                "width" : "20px",
            },
            {
                "field": "barcodeid",
                "title": "BarcodeID",
                "width" : "30px",
            },
            {
                "field": "hobatid",
                "title": "HObatID",
                "width" : "20px",
            },
            {
                "field": "namaproduk",
                "title": "Nama Obat",
                "width" : "100px",
            },
            {
                "field": "packageunit",
                "title": "PackageUnit",
                "width" : "30px",
            },
            {
                "field": "satuanstandar",
                "title": "DosageForm",
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
