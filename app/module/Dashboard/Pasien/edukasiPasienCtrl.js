define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('edukasiPasienCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'ManagePasien',
        function($rootScope, $scope, ModelItem, $state, findPasien, managePasien) {
            $scope.noCM = $state.params.noCM;
            //indikator harap tunggu
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.tanggal = $state.params.tanggal;

            $scope.petugas = ModelItem.getPegawai();

            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                debugger;
                $scope.noRec = data.data.noRec;
                $scope.tglDaftar = new moment(data.data.tglRegistrasi).format('YYYY-MM-DD');
                $scope.ruangan = data.data.ruangan.id;
            });

            $scope.getDataEdukasiPasien=function(){

                findPasien.getEdukasiPasien($state.params.noCM).then(function(data) {
                    $scope.dataEdukasiPasien = data.data.data;

                    $scope.sourceEdukasiPasien = new kendo.data.DataSource({
                        pageSize: 10,
                        data: $scope.dataEdukasiPasien
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
                            "field": "edukasi",
                            "title": "Edukasi Pasien",
                            "width": "300px"
                        }
                        ]
                    }
                })
            };

            $scope.SelectData=function(data)
            {
                console.log(JSON.stringify(data));
                $scope.item.edukasiPasien=data.edukasi
                // debugger;
            };

            $scope.Batal = function(){
                $scope.item.edukasiPasien = "";
            }

            $scope.getDataEdukasiPasien();

            $scope.Save = function(){
                debugger;
                $scope.now = new Date();

                var data = {  
                    "edukasi": $scope.item.edukasiPasien,
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
                managePasien.saveRencana(data,"edukasi/save-edukasi").then(function(e) {
                    $scope.getDataEdukasiPasien();
                    $scope.Batal();
                });
                
            }
        }
    ]);
});