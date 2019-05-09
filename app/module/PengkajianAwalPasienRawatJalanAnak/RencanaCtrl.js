define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RencanaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'ManagePasien',
        function($rootScope, $scope, ModelItem, $state, findPasien, managePasien) {
            $scope.noCM = $state.params.noCM;
            //indikator harap tunggu
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.tanggal = $state.params.tanggal;

            $scope.petugas = ModelItem.getPegawai();

            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                $scope.noRec = data.data.noRec;
                $scope.tglDaftar = new moment(data.data.tglRegistrasi).format('YYYY-MM-DD');
                $scope.ruangan = data.data.ruangan.id;
            });

            $scope.getDataRencana=function(){
                findPasien.getRencana($state.params.noCM).then(function(data) {
                    debugger;
                    $scope.dataRencana = data.data.data;

                    $scope.sourceRencana = new kendo.data.DataSource({
                        pageSize: 10,
                        data: $scope.dataRencana
                    });

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
                            "field": "rencana",
                            "title": "Rencana",
                            "width": "300px"
                        }
                        ]
                    };
                });
            };

            $scope.SelectData=function(data)
            {
                console.log(JSON.stringify(data));
                $scope.item.rencana=data.rencana
                // debugger;
            };

            $scope.Batal = function(){
                $scope.item.rencana = "";
            }

            $scope.getDataRencana();

            $scope.Save = function(){
                debugger;
                $scope.now = new Date();
                var Rencana = [];

                var data = {  
                    "rencana": $scope.item.rencana,
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
                Rencana.push(data);

                var dataFix = {
                    "rencana": Rencana
                }
                console.log(JSON.stringify(dataFix));
                managePasien.saveRencana(dataFix,"rencana/save-rencana").then(function(e) {
                });
                $scope.getDataRencana();
                $scope.Batal();
            }
        }
    ]);
});