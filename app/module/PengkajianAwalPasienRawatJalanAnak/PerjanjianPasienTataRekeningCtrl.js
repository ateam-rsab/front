define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PerjanjianPasienTataRekeningCtrl', ['$q', 'DateHelper', '$rootScope', '$scope', 'ModelItem', '$state','CacheHelper','ManageServicePhp','ModelItemAkuntansi','FindPasien','ManagePasien','ManagePhp',
        function($q, dateHelper, $rootScope, $scope, ModelItem, $state,cacheHelper,manageServicePhp,modelItemAkuntansi,findPasien,managePasien,managePhp) {
            $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
            $scope.now = new Date();            
            $scope.currentNorecPD = $state.params.norecPD;
            $scope.currentNorecAPD = $state.params.norecAPD;
            $scope.item = {};
            $scope.item.tglPelayanan = $scope.now;
            $scope.isNext=true;
            $scope.isKembali=true;
            $scope.isBatal=true;            
            $scope.perjanjian = {};
            var dataPasien=[];
            var pasienID='';
            var pasienFK='';
            var noRec='';
            FormLoad();
           
            function FormLoad(){
                $scope.isRouteLoading = true;
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-pasien-bynorec/"
                      +$scope.currentNorecPD
                      +"/"
                      +$scope.currentNorecAPD)         
                    .then(function (e) {
                     //debugger;
                     dataPasien = e.data[0]
                     $scope.item.pasien=dataPasien;
                     pasienID =$scope.item.pasien.nocm; 
                     pasienFK =$scope.item.pasien.nocmfk;
                     loadPerjanjian();
                                 
                })
            }

            // PERJANJIAN
            $scope.gridPerjanjian = {
                pageable: true,
                columns: [
                    {
                        "field": "noperjanjian",
                        "title": "No Perjanjian",
                        "width": "100px"
                    },
                    {
                        "field": "tglperjanjian",
                        "title": "Tgl Perjanjian",
                        "width": "100px"
                    },
                    {
                        "field": "namaruangan",
                        "title": "Poliklinik",
                        "width": "150px"
                    }, {
                        "field": "namalengkap",
                        "title": "Dokter",
                        "width": "150px"
                    }, {
                        "field": "keterangan",
                        "title": "Keterangan",
                        "width": "200px"
                    }

                ]
            }
                
            function loadPerjanjian() {
                //debugger;
                $scope.perjanjian.tglPerjanjian = new Date();
                managePhp.getData("rekam-medis/get-combo" ).then(function (dat) {
                    $scope.listRuangan = dat.data.ruangan
                    $scope.listDokter = dat.data.dokter
                })
                managePhp.getData("rekam-medis/get-perjanjian?nocm=" + pasienID).then(function (dat) {
                        debugger;
                        let array = dat.data.data;
                        $scope.sourcePerjanjian = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }
                
            $scope.tambahPerjanjian = function () {
                if ($scope.perjanjian.ruangan == undefined) {
                    toastr.error('Ruangan masih kosong')
                    return
                }
                if ($scope.perjanjian.dokter == undefined) {
                    toastr.error('Dokter masih kosong')
                    return
                }

                var jsonSave = {
                    norec: $scope.perjanjian.norec !== undefined ? $scope.perjanjian.norec : '',
                    nocm: pasienID,
                    objectdokterfk: $scope.perjanjian.dokter.id,
                    tglperjanjian: moment( $scope.perjanjian.tglPerjanjian).format('YYYY-MM-DD HH:mm'),
                    jumlahkujungan: null,
                    keterangan: $scope.perjanjian.keteranganLainnya !== undefined ? $scope.perjanjian.keteranganLainnya : '-',
                    objectruanganfk: $scope.perjanjian.ruangan.id,
                }
                managePhp.postData(jsonSave, 'rekam-medis/post-perjanjian/save').then(function (e) {
                    loadPerjanjian()
                     $scope.perjanjian = {}
                     managePhp.postLogging('Pengkajian Awal', 'Norec pasienperjanjian_t',e.data.norec, 'Perjanjian').then(function (res) {
                    })
                });
            };

            $scope.klikPerjanjian = function (data) {
                $scope.perjanjian.ruangan = { id:data.objectruanganfk, namaruangan:data.namaruangan}
                $scope.perjanjian.dokter = { id:data.objectdokterfk, namalengkap:data.namalengkap}
                $scope.perjanjian.tglPerjanjian = data.tglperjanjian
                $scope.perjanjian.norec = data.norec
                $scope.perjanjian.keteranganLainnya = data.keterangan
            }

            $scope.hapusPerjanjian = function () {
                if ($scope.dataPerjanjian == undefined) {
                    toastr.error('Pilih data yg mau di hapus')
                    return
                }
                var jsonSave = {
                    norec: $scope.dataPerjanjian.norec,
                }
                managePhp.postData(jsonSave, 'rekam-medis/post-perjanjian/delete').then(function (e) {
                    loadPerjanjian()
                    $scope.perjanjian = {}
                });
            }
            // END PERJANJIAN

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

            $scope.cetakSurat=function(noRec){
                $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
                var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-suratPerjanjian=1&noRec='+noRec+'&strPegawai='+$scope.dataLogin.namaLengkap+'&view=true', function(response) {
                    // do something with response
                });
            }

            $scope.Cetak=function(noRec){
                 $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
                var pasienID = $scope.item.pasienID;
                var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-suratPerjanjian-bypasienID=1&pasienID='+pasienFK+'&strPegawai='+$scope.dataLogin.namaLengkap+'&view=true', function(response) {
                    // do something with response
                });
            }

            $scope.clear =function(){
                $scope.item.dokter="";
                $scope.item.ruangan="";
                $scope.item.keteranganLainnya="";
                $scope.item.tglPerjanjian="";
            }
            
        }
    ]);
});