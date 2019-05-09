define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InstruksiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'ManagePasien',
        function($rootScope, $scope, ModelItem, $state, findPasien, managePasien) {

            $scope.noCM = $state.params.noCM;
            //indikator harap tunggu
            debugger;
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

            $scope.getDataIntruksi=function(){

                findPasien.getInstruksi($state.params.noCM).then(function(data) {
                    $scope.dataInstruksi = data.data.data;

                    $scope.sourceInstruksi = new kendo.data.DataSource({
                        pageSize: 10,
                        data: $scope.dataInstruksi
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
                            "field": "instruksi",
                            "title": "Instruksi",
                            "width": "300px"
                        }
                        ]
                    }
                })
            };

            $scope.SelectData=function(data)
            {
                console.log(JSON.stringify(data));
                $scope.item.instruksi=data.instruksi
                // debugger;
            };

            $scope.Batal = function(){
                $scope.item.instruksi = "";
            }

            $scope.getDataIntruksi();

            $scope.Save = function(){
                debugger;
                $scope.now = new Date();
                var instruksi = [];

                var data = {  
                    "instruksi": $scope.item.instruksi,
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
                instruksi.push(data);

                var dataFix = {
                    "instruksi": instruksi
                }
                console.log(JSON.stringify(dataFix));
                managePasien.saveRencana(dataFix,"instruksi/save-instruksi").then(function(e) {
                });
                $scope.getDataIntruksi();
                $scope.Batal();
            }
        }
    ]);
});