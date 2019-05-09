define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RisikoJatuhCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien',
        function($q, $rootScope, $scope, ModelItem, $state, ManagePasien) {
            
            //-----------------
            //hardcore dulu 
            var transferPasienInternal = {
              "noRec":"2c9090ad562b818501562b8326980000"
            };
            //-----------------

            $scope.item = {};
            $q.all([ModelItem.getDataDummyGeneric("ResikoJatuh", false)
                    ]).then(function(data) {
                
                if(data[0].statResponse)
                $scope.listRisikoJatuh = data[0];

            
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
      
            $scope.arrRisikoJatuh = [];
            $scope.cekArrRisikoJatuh = function(data) {

                var isExist = _.find($scope.arrRisikoJatuh, function(dataExist){ return dataExist == data; });

                if(isExist == undefined)
                {
                    $scope.arrRisikoJatuh.push(data);
                }
                else
                {
                    $scope.arrRisikoJatuh = _.without($scope.arrRisikoJatuh, data);
                }
            
                console.log('list risiko jatuh : ' + JSON.stringify($scope.arrRisikoJatuh));
            };

            $scope.Save = function()
            {
                var resikoJatuhDetail = [];
                for(var i=0; i<$scope.listRisikoJatuh.length; i++)
                {
                    var obj = {
                            "resikoJatuh": $scope.listRisikoJatuh[i],
                            "isNilai":false
                    }

                    for(var j=0; j<$scope.arrRisikoJatuh.length; j++){
                        if($scope.listRisikoJatuh[i].id == $scope.arrRisikoJatuh[j].id)
                        obj.isNilai = true;
                    }

                    detailPsikologis.push(obj);
                }

                $scope.item.resikoJatuhDetail = resikoJatuhDetail;
                
                ManagePasien.saveTranferPasienInternalRisikoJatuh(transferPasienInternal, ModelItem.beforePost($scope.item)).then(function(e) {
                    
                    /*$state.go('dashboardpasien.AsesmenGizi', {
                        noCM: $scope.noCM,
                        tanggal: $state.params.tanggal
                    });*/
                });
            }

        }
    ]);
});