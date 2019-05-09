define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('StatusKemandirianCtrl', ['$q', 'FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien',
        function($q, findPasien, managePasien, $rootScope, $scope, ModelItem, $state, ManagePasien) {
            /*$scope.title = "transfer Pasien Internal - Status Kemandirian";
            $scope.item = {};
            findPasien.getByNoCM($state.params.noCm).then(function(e) {
                $scope.item.pasien = e.data;
                if (!$scope.$$phase)
                    $scope.$apply();
            });
            ModelItem.getDataDummyGeneric("StatusMandiri", false).then(function(data) {
                $scope.listStatusKemandirian = data;
                $scope.item.ekstremitasAtas = data[0];
                $scope.item.batangTumbuh = data[0];
                $scope.item.ekstremitasBawah = data[0];
                $scope.item.makanan = data[0];
                $scope.item.jalanKaki = data[0];
                $scope.item.kursiRoda = data[0];
            });
            $scope.Save = function() {
                managePasien.saveStatusKemandirianTransferInternal(ModelItem.beforePost($scope.item));
            }*/


            //-----------------
            //hardcore dulu 
            var transferPasienInternal = {
              "noRec":"2c9090ad562b818501562b8326980000"
            };
            //-----------------

            $scope.item = {};
            $q.all([ModelItem.getDataDummyGeneric("StatusMandiri", false),
                ModelItem.getDataDummyGeneric("AktivitasKemandirian", false)
                    ]).then(function(data) {
                
                if(data[0].statResponse)
                $scope.listStatusMandiri = data[0];

                if(data[1].statResponse){
                    for(var i=0; i<data[1].length; i++){
                        data[1][i].valueModel = {};
                    }
                    $scope.listAktivitasKemandirian = data[1];
                    
                }

                //ambil data current pasien seusia no cm dan tanggal     
                //getDataCurentPasien();
            });

            /*function getDataCurentPasien()
            {
                findPasien.getPernafasan($state.params.noCM, $state.params.tanggal).then(function(e) {
                   if(e.data.data.PapPernapasan[0] != undefined){
                        
                    }
                });
            };*/

            $scope.clickRadioOption = function(aktivitasKemandirian, statusMandiri)
            {
                var tempAktivitasKemandirian = JSON.parse(JSON.stringify(aktivitasKemandirian));
                delete tempAktivitasKemandirian.valueModel;
                var tempStatusMandiri = JSON.parse(JSON.stringify(statusMandiri));

                aktivitasKemandirian.valueModel = {
                    "aktivitasKemandirian": tempAktivitasKemandirian,
                    "statusMandiri": statusMandiri
                }
            }
      
            $scope.Save = function()
            {
                
                var tempDetailAktivitasKemandirian = [];
                for(var i=0; i<$scope.listAktivitasKemandirian.length; i++)
                {
                    var obj = JSON.parse(JSON.stringify($scope.listAktivitasKemandirian[i].valueModel));
                    delete obj.aktivitasKemandirian.data;
                    tempDetailAktivitasKemandirian.push(obj);
                }

                $scope.item.detailAktivitasKemandirian = tempDetailAktivitasKemandirian;
                
                
                ManagePasien.saveTranferPasienInternalStatusKemandirian(transferPasienInternal, ModelItem.beforePost($scope.item)).then(function(e) {
                    
                    /*$state.go('dashboardpasien.AsesmenGizi', {
                        noCM: $scope.noCM,
                        tanggal: $state.params.tanggal
                    });*/
                });
            }

        }
    ]);
});