define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DataLembarPengajuanKlaimCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien', 'ManageServicePhp',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien,manageServicePhp) {
            $scope.isRouteLoading = true;
            $scope.clear = function(){
                $scope.now = new Date();
                $scope.item = {
                    tglMasuk: $scope.now
                };
                $scope.isRouteLoading = false;
                $scope.item.jenisPelayanan = $scope.jenisPelayanan[1];
            };

            $scope.jenisPelayanan = [{
                "idjenispelayanan": 1, "jenispelayanan": "Rawat Inap"
            },{
                "idjenispelayanan": 2, "jenispelayanan": "Rawat Jalan"
            }];
            $scope.clear();
            $scope.findDataBySep = function(data){
                $scope.isRouteLoading = true;
                var data = {
                    jenispelayanan: data.jenisPelayanan.idjenispelayanan,
                    tglmasuk: new moment(data.tglMasuk).format('YYYY-MM-DD')
                }
                manageServicePhp.getDataTableTransaksi("bpjs/data-lpk?tglmasuk="
                    +data.tglmasuk
                    +"&jenispelayanan="
                    +data.jenispelayanan
                    ).then(function(e) {
                    document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function(){
                    $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});