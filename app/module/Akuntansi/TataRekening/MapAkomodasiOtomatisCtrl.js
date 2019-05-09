define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MapAkomodasiOtomatisCtrl', ['$q', '$rootScope', '$scope', 'ManageTataRekening','$state','CacheHelper',
        function($q, $rootScope, $scope,manageTataRekening,$state,cacheHelper) {
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
        function Init() {
            manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-akomodasi-tea?ruangan=1", true).then(function(dat){
                $scope.listruanganinap = dat.data.ruangan;
            });
            

        }
        $scope.getProduk = function(){
            manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-akomodasi-tea?produk=1&objectruanganfk="+$scope.item.ruanganInap.id, true).then(function(dat){
                for (var i = dat.data.listakomodasi.length - 1; i >= 0; i--) {
                    dat.data.listakomodasi[i].no = i+1
                    if ( dat.data.listakomodasi[i].israwatgabung == 1) {
                        dat.data.listakomodasi[i].israwatgabungSS = 'Yes'
                    }else{
                        dat.data.listakomodasi[i].israwatgabungSS = 'No'
                    }
                }
                $scope.listpelayanan = dat.data.produk;
                $scope.listrg = [
                        {id:1,status:'Yes'},
                        {id:2,status:'No'}
                    ]
                $scope.dataGrid = dat.data.listakomodasi;
            });
        }

        
        $scope.klikGrid = function(dataSelected){
            $scope.item.id = dataSelected.maid
            $scope.item.pelayanan = {id:dataSelected.id,namaproduk:dataSelected.namaproduk}
            if (dataSelected.israwatgabung == '1') {
                $scope.item.rg = {id:1,status:'Yes'}
            }else{

                $scope.item.rg = {id:2,status:'No'}
            }
            
        }

        $scope.formatTanggal = function(tanggal){
            return moment(tanggal).format('DD-MMM-YYYY');
        }

        $scope.kosongkan = function(){
            kosong();
        }
        function kosong(){
            // $scope.item.satuanstandar_asal = ''
            $scope.item.pelayanan = ''
            $scope.item.rg = ''
            $scope.item.id =''
        }
        $scope.tambahData = function(){
            if ($scope.item.pelayanan == undefined){
                alert("Pilih pelayanan!!")
                return;
            }
            if ($scope.item.ruanganInap == undefined){
                alert("Pilih Ruangan!!")
                return;
            }
            var maid = '';
            if ($scope.item.id != undefined){
               maid = $scope.item.id
            }
            var rgg = 'NO';
            if ($scope.item.rg != undefined){
                if ($scope.item.rg.status == 'Yes') {
                    rgg = 'YES'
                }else{
                    rgg = "NO"
                }
            }
            var objSave = {
                    maid:maid,
                    pelayanan:$scope.item.pelayanan.id,
                    rg:rgg,
                    ruangan:$scope.item.ruanganInap.id,
                    status:'SIMPAN_JANG'
                }
            manageTataRekening.savemapakomodasitea(objSave).then(function(e) {
                kosong();
                manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-akomodasi-tea?produk=1&objectruanganfk="+$scope.item.ruanganInap.id, true).then(function(dat){
                    for (var i = dat.data.listakomodasi.length - 1; i >= 0; i--) {
                        dat.data.listakomodasi[i].no = i+1
                        if ( dat.data.listakomodasi[i].israwatgabung == 1) {
                            dat.data.listakomodasi[i].israwatgabungSS = 'Yes'
                        }else{
                            dat.data.listakomodasi[i].israwatgabungSS = 'No'
                        }
                    }
                    $scope.dataGrid = dat.data.listakomodasi;
                });
            })

        }
        $scope.hapusData = function(){
             if ($scope.item.pelayanan == undefined){
                alert("Pilih pelayanan!!")
                return;
            }
            if ($scope.item.ruanganInap == undefined){
                alert("Pilih Ruangan!!")
                return;
            }
            var maid = '';
            if ($scope.item.id != undefined){
               maid = $scope.item.id
            }
            var rg = null;
            if ($scope.item.rg != undefined){
                if ($scope.item.rg.status = 'Yes') {
                    rg = 1
                }else{
                    rg = null
                }
            }
            var objSave = {
                    maid:maid,
                    pelayanan:$scope.item.pelayanan.id,
                    rg:rg,
                    ruangan:$scope.item.ruanganInap.id,
                    status:'HAPUS'
                }
            manageTataRekening.savemapakomodasitea(objSave).then(function(e) {
                kosong()
                manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-akomodasi-tea?produk=1&objectruanganfk="+$scope.item.ruanganInap.id, true).then(function(dat){
                    for (var i = dat.data.listakomodasi.length - 1; i >= 0; i--) {
                        dat.data.listakomodasi[i].no = i+1
                        if ( dat.data.listakomodasi[i].israwatgabung == 1) {
                            dat.data.listakomodasi[i].israwatgabungSS = 'Yes'
                        }else{
                            dat.data.listakomodasi[i].israwatgabungSS = 'No'
                        }
                    }
                    $scope.dataGrid = dat.data.listakomodasi;
                });
            })
        }
        $scope.columnGrid = [
            {
                "field": "no",
                "title": "No",
                "width" : "20px",
            },
            {
                "field": "namaproduk",
                "title": "Pelayanan",
                "width" : "80px",
            },
            {
                "field": "israwatgabungSS",
                "title": "Rawat Gabung",
                "width" : "20px",
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
            
//***********************************

}
]);
});
