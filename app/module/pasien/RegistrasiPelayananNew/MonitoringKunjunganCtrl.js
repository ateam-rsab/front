define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MonitoringKunjunganCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien', 'ManageServicePhp',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien,manageServicePhp) {
            $scope.isRouteLoading = true;
            $scope.clear = function(){
                $scope.now = new Date();
                $scope.item = {
                    tglSep: $scope.now
                };
                $scope.isRouteLoading = false;
                 $scope.item.jenisPelayanan = $scope.jenisPelayanan[0];
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
                    tglsep: new moment(data.tglSep).format('YYYY-MM-DD')
                }
                manageServicePhp.getDataTableTransaksi("bpjs/get-monitoring-kunjungan?tglsep="
                    +data.tglsep
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