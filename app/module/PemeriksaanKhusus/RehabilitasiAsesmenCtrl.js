define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RehabilitasiAsesmenCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'FindPegawai','CacheHelper','ManagePasien','DateHelper',
        function($rootScope, $scope, ModelItem, $state, findPasien, FindPegawai, cacheHelper, ManagePasien, dateHelper) {
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.item={};
            $scope.noRecAntrian = $state.params.noRec;
            // findPasien.getByNoCM($scope.noCM).then(function(data) {
            //     $rootScope.currentPasien = data.data.data;
            //     $scope.pasien = data.data.data;
            // });
            function getRehabilitasiAsesmen(){
                debugger;
                findPasien.getRehabilitasiAsesmen($scope.noRecAntrian).then(function(data){
                    $scope.listData = data.data.data;

                    $scope.dataRehabilitasiAsesmen = new kendo.data.DataSource({
                        data: $scope.listData,
                        pageSize:10
                    });
                })
            };
            getRehabilitasiAsesmen();

            $scope.mainGridOptions={
                pageable: true,
                selectable: "row",
                pageSizes: true,
                columns :[
                    {
                        "field": "lingkarKepala",
                        "title": "Lingkar Kepala",
                        "width": "110px"
                    }, {
                        "field": "beratBadan",
                        "title": "Berat Badan",
                        "width": "90px"
                    }, {
                        "field": "tinggiBadan",
                        "title": "Tinggi Badan",
                        "width": "100px"
                    }, {
                        "field": "riwayatPenyakitSekarang",
                        "title": "Riwayat Penyakit Sekarang",
                        "width": "300px"
                    }, {
                        "field": "riwayatPenyakitDahulu",
                        "title": "Riwayat Penyakit Dahulu",
                        "width": "300px"
                    }, {
                        "field": "fungsiKomunikasi",
                        "title": "Fungsi Komunikasi",
                        "width": "300px"
                    }, {
                        "field": "fungsiMotorik",
                        "title": "Fungsi Motorik",
                        "width": "300px"
                    }, {
                        "field": "kardiorespirasi",
                        "title": "Kardiorespirasi",
                        "width": "300px"
                    }, {
                        "field": "fungsiMenelan",
                        "title": "Fungsi Menelan",
                        "width": "300px"
                    }, {
                        "field": "sensoriMotor",
                        "title": "Sensori Motor",
                        "width": "300px"
                    }, {
                        "field": "fungsiDefekasi",
                        "title": "Fungsi Defekasi",
                        "width": "300px"
                    }, {
                        "field": "aktivitas",
                        "title": "Aktivitas",
                        "width": "300px"
                    }, {
                        "field": "pemeriksaanTambahan",
                        "title": "Pemeriksaan Tambahan",
                        "width": "300px"
                    }, {
                        "field": "diagnosaRehabilitasi",
                        "title": "Diagnosa Rehabilitasi",
                        "width": "300px"
                    }, {
                        "field": "protokolTerapi",
                        "title": "Protokol Terapi",
                        "width": "300px"
                    // },{
                    //     "width" : "90px",
                    //     "template" : "<button class='btnHapus' ng-click='deleteData()'>Hapus</button>"
                    }
                ]
            };

            $scope.click=function(data){
                $scope.item.noRecRehab= data.noRec;
                $scope.item.lingkarKepala = data.lingkarKepala;
                $scope.item.beratBadan = data.beratBadan;
                $scope.item.tinggiBadan = data.tinggiBadan;
                $scope.item.riwayatPenyakitSekarang = data.riwayatPenyakitSekarang;
                $scope.item.riwayatPenyakitDahulu = data.riwayatPenyakitDahulu;
                $scope.item.fungsiKomunikasi = data.fungsiKomunikasi;
                $scope.item.fungsiMotorik = data.fungsiMotorik;
                $scope.item.kardiorespirasi = data.kardiorespirasi;
                $scope.item.fungsiMenelan = data.fungsiMenelan;
                $scope.item.sensoriMotor = data.sensoriMotor;
                $scope.item.fungsiDefekasi = data.fungsiDefekasi;
                $scope.item.aktivitas = data.aktivitas;
                $scope.item.pemeriksaanTambahan = data.pemeriksaanTambahan;
                $scope.item.diagnosaRehabilitasi = data.diagnosaRehabilitasi;
                $scope.item.protokolTerapi= data.protokolTerapi;
            }
            $scope.tanggal = new Date();

            $scope.Save = function() {
                debugger;
                var dataItem = ModelItem.beforePost($scope.item);
                var pasien = ModelItem.beforePost($scope.pasien);
                var tanggal = dateHelper.toTimeStamp($scope.tanggal);

                var data={
                    "noRec" : $scope.item.noRecRehab,
                    "pasienDaftar":{
                        "noRec": $scope.noRecAntrian
                    },
                    "tglInput": tanggal,
                    "lingkarKepala": dataItem.lingkarKepala,
                    "beratBadan": dataItem.beratBadan,
                    "tinggiBadan": dataItem.tinggiBadan,
                    "riwayatPenyakitSekarang": dataItem.riwayatPenyakitSekarang,
                    "riwayatPenyakitDahulu": dataItem.riwayatPenyakitDahulu,
                    "fungsiKomunikasi": dataItem.fungsiKomunikasi,
                    "fungsiMotorik": dataItem.fungsiMotorik,
                    "kardiorespirasi": dataItem.kardiorespirasi,
                    "fungsiMenelan": dataItem.fungsiMenelan,
                    "sensoriMotor": dataItem.sensoriMotor,
                    "fungsiDefekasi": dataItem.fungsiDefekasi,
                    "aktivitas": dataItem.aktivitas,
                    "pemeriksaanTambahan": dataItem.pemeriksaanTambahan,
                    "diagnosaRehabilitasi": dataItem.diagnosaRehabilitasi,
                    "protokolTerapi": dataItem.protokolTerapi
                }
                if(data.noRec==undefined){
                    delete data.noRec
                }
                // console.log(JSON.stringify(data));
                ManagePasien.saveRehabilitasiAsesmen(ModelItem.beforePost(data)).then(function(e) {
                    $scope.Back();
                    getRehabilitasiAsesmen();
                });
            };
            $scope.deleteData=function(){
                debugger;
                if($scope.item.noRecRehab==undefined){
                    window.messageContainer.error("Pilih dahulu data yang mau dihapus!!!")
                }
                $scope.item.noRecRehab;
                // ManagePasien.deleteRehabilitasi().then(function(dat){
                //     // debugger;
                //     getRehabilitasi();

                // });
            };
            $scope.Back=function(){
                $scope.item = {};
            };
        }
    ]);
});