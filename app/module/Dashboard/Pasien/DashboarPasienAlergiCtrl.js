define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DashboarPasienAlergiCtrl', ['DateHelper', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper',
        function(dateHelper, managePasien, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper) {
            $scope.isNext = false;
            $scope.data = {};
            $scope.listDataAlergi = [{ name: "Ya", id: 1, value: true},
                { name: "Tidak", id: 2, value: false }
            ];

            //$rootScope.listActive -> data listMenu
            // ModelItem.setActiveMenu($rootScope.listActive, "Alergi");

            $scope.noCM = $state.params.noCM;
            $scope.listAlergi = [];
            $rootScope.tanggal = $state.params.tanggal;
            // if ($state.current.name === 'dashboardpasien.inputAlergi') {
            //     $rootScope.showMenu = true;
            // } else {
            //     findPasien.getAlergy($scope.noCM).then(function(data) {
            //         $scope.listAlergi = data.data;
            //         $scope.isLoadingAlergi = false;
            //     });
            // }
            $scope.DataSourceSkriningGizi=function(){
                var noCm = $state.params.noCM;

                findPasien.getAlergiPAP(noCm).then(function(e) {
                    debugger;
                    $scope.dataAlergi = e.data[0].alergi;
                    $scope.noRecAlergi = e.data[0].noRec;
                    if($scope.dataAlergi===true){
                        $scope.data.alergi = true
                    }else{
                        $scope.data.alergi = false
                    }
                })
            };
            $scope.DataSourceSkriningGizi();
            // findPasien.getAlergi($state.params.noRec).then(function(e) {
            //     $scope.listAlergi = [];
            //     var data = ModelItem.beforePost(e.data.data.PapAlergi, true);
            //     for (var key in data) {
            //         if (data.hasOwnProperty(key)) {
            //             var element = data[key];
            //             $scope.listAlergi.push({
            //                 noCM: $scope.noCM,
            //                 tanggal: element.tglInput,
            //                 alergi: element.alergi.namaAlergi,
            //                 keterangan: element.keteranganData,
            //                 reaksi: element.reaksi
            //             });
            //         }
            //     }

            // });
            // $scope.item = {};
            // $scope.kajianAwal = cacheHelper.get("kajianAwal");
            // if ($scope.kajianAwal === undefined)
            //     $scope.kajianAwal = {};
            // if ($scope.kajianAwal.listAlergi !== undefined)
            //     $scope.listAlergi = $scope.kajianAwal.listAlergi;
            // findPasien.getByNoCM($scope.noCM).then(function(data) {
            //     $rootScope.currentPasien = data.data.data;
            //     $scope.item = data.data.data;
            // });
            // $scope.now = new Date();
            // ModelItem.getDataDummyGeneric("Alergi", true, undefined, 10).then(function(data) {
            //     $scope.jenisAlergis = data;
            // })
            // $scope.isAddAlergi = false;
            // $scope.addAlergi = function() {
            //     $scope.isAddAlergi = true;
            // };
            // $scope.back = function() {
            //     $scope.isAddAlergi = false;
            // };
            $scope.klikOption = function(data, stat) {
                $scope.data.alergi = stat.value;
                console.log("pilihan anda adalah " + stat.value)
            }
            $scope.Save = function() {

                // $scope.dataAlergi = {
                //     'id': $scope.item.alergi.id
                // }

                // $scope.item.dataAlergi = $scope.dataAlergi;

                // $scope.kajianAwal.listAlergi = $scope.listAlergi;
                // var pasien = { noRec: $state.params.noRec };
                // debugger;

                // if($scope.data.alergi){
                //     debugger;
                //     var alergi = true
                // }else{
                //     debugger;
                //     var alergi = false
                // }
                if($scope.noRecAlergi ===undefined){
                    var data = {
                        "noRec": null,
                        "pasienDaftar":{
                            "noRec": $state.params.noRec
                        },
                        "alergi": $scope.data.alergi
                    }
                }else{
                    var data = {
                        "noRec": $scope.noRecAlergi,
                        "pasienDaftar":{
                            "noRec": $state.params.noRec
                        },
                        "alergi": $scope.data.alergi
                    }
                }
                managePasien.saveAlergiPAP(data).then(function(e) {
                    $scope.DataSourceSkriningGizi();
                });


            };

            $scope.isLoadingAlergi = true;

            // $scope.Next = function() {
            //     $rootScope.next();
            // }

        }
    ]);
});