define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PsikologisCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien',
        function($q, $rootScope, $scope, ModelItem, $state, ManagePasien) {
            //-----------------
            //hardcore dulu 
            var transferPasienInternal = {
              "noRec":"2c9090ad562b818501562b8326980000"
            };
            //-----------------

            $scope.item = {};
            $q.all([ModelItem.getDataDummyGeneric("Psikologis", false)
                    ]).then(function(data) {
                
                if(data[0].statResponse)
                $scope.listPsikologis = data[0];

            
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
      
            $scope.arrPsikologis = [];
            $scope.cekArrPsikologis = function(data) {

                var isExist = _.find($scope.arrPsikologis, function(dataExist){ return dataExist == data; });

                if(isExist == undefined)
                {
                    $scope.arrPsikologis.push(data);
                }
                else
                {
                    $scope.arrPsikologis = _.without($scope.arrPsikologis, data);
                }
            
                console.log('list risiko jatuh : ' + JSON.stringify($scope.arrPsikologis));
            };

            $scope.Save = function()
            {
                var detailPsikologis = [];
                for(var i=0; i<$scope.listPsikologis.length; i++)
                {
                    var obj = {
                            "psikologis": $scope.listPsikologis[i],
                            "checked":false
                    }

                    for(var j=0; j<$scope.arrPsikologis.length; j++){
                        
                        if($scope.listPsikologis[i].id == $scope.arrPsikologis[j].id)
                        obj.checked = true;

                    }

                    detailPsikologis.push(obj);
                }

                $scope.item.detailPsikologis = detailPsikologis;
                
                ManagePasien.saveTranferPasienInternalPsikologis(transferPasienInternal, ModelItem.beforePost($scope.item)).then(function(e) {
                    
                    /*$state.go('dashboardpasien.AsesmenGizi', {
                        noCM: $scope.noCM,
                        tanggal: $state.params.tanggal
                    });*/
                });
            }
        }
    ]);
});