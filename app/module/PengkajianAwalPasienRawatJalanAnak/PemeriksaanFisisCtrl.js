define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PemeriksaanFisisCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'ManagePasien',
        function($rootScope, $scope, ModelItem, $state, findPasien, managePasien) {

            $scope.noCM = $state.params.noCM;
            //indikator harap tunggu
            $rootScope.doneLoad = false;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            
            $scope.petugas = ModelItem.getPegawai();

            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                debugger;
                $scope.noRec = data.data.noRec;
                $scope.tglDaftar = new moment(data.data.tglRegistrasi).format('YYYY-MM-DD');
                $scope.ruangan = data.data.ruangan.id;
            });

            $scope.getPemeriksaanFisis=function(){

                findPasien.getPemeriksaanUmum($state.params.noCM).then(function(data) {
                    $scope.dataPemeriksaanUmum = data.data.data;

                    $scope.sourcePemeriksaanUmum = new kendo.data.DataSource({
                        pageSize: 10,
                        data: $scope.dataPemeriksaanUmum
                    })

                    $scope.mainGridOptions = {
                        pageable: true,
                        columns: [
                        {
                            "field": "tanggalInput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "petugas",
                            "title": "Petugas",
                            "width": "200px"
                        }, {
                            "field": "namaRuangan",
                            "title": "Ruangan",
                            "width": "200px"
                        }, {
                            "field": "pemeriksaanUmum",
                            "title": "Pemeriksaan Fisik Umum",
                            "width": "300px"
                        }
                        ]
                    }
                })
            };

            $scope.SelectData=function(data)
            {
                console.log(JSON.stringify(data));
                $scope.item.pemeriksaanUmum=data.pemeriksaanUmum
                // debugger;
            };

            $scope.Batal = function(){
                $scope.item.pemeriksaanUmum = "";
            }

            $scope.getPemeriksaanFisis();

            $scope.Save = function(){
                debugger;
                $scope.now = new Date();

                var data = {  
                    "pemeriksaanUmum": $scope.item.pemeriksaanUmum,
                    "petugas":{  
                        "id":$scope.petugas.id
                    },
                     "tanggalInput": $scope.now,
                     "tanggalPendaftaran":$scope.tglDaftar,
                     "pasienDaftar":{  
                        "noRec":$scope.noRec
                     },
                     "ruangan":{  
                        "id":$scope.ruangan
                     }
                }
                console.log(JSON.stringify(data));
                managePasien.savePemeriksaanUmum(data,"pemeriksaanUmum/save-pemeriksaan-umum").then(function(e) {
                    $scope.getPemeriksaanFisis();
                    $scope.Batal();
                });
                
            }
        }
    ]);
});