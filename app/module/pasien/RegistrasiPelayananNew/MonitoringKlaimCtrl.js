define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MonitoringKlaimCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien', 'ManageServicePhp',
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

            $scope.listStatusKlaim = [{
                "id": 3, "statusklaim": "Proses Verifikasi", "value":1
            },{
                "id": 4, "statusklaim": "Pending Verifikasi", "value":2
            },{
                "id": 5, "statusklaim": "Klaim", "value":3
            }];
            $scope.clear();
          
            $scope.findDataBySep = function(data){
                $scope.isRouteLoading = true;
               var data = {
                    jenispelayanan: data.jenisPelayanan.idjenispelayanan,
                    status: data.statusKlaim.value,
                    tglsep: new moment(data.tglSep).format('YYYY-MM-DD')
                }
                manageServicePhp.getDataTableTransaksi("bpjs/get-monitoring-klaim?tglsep="
                    +data.tglsep
                    +"&jenispelayanan="
                    +data.jenispelayanan
                    +"&status="
                    +data.status
                    ).then(function(e) {
                    document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function(){
                    $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});