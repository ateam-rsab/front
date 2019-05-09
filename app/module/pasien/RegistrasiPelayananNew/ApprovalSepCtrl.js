define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ApprovalSepCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien','ManageServicePhp',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien ,manageServicePhp) {
            $scope.isRouteLoading = true;
              $scope.model={};
            $scope.clear = function(){
                $scope.now = new Date();
                var tanggals = DateHelper.getDateTimeFormatted3($scope.now);
                $scope.item = {
                    tglSep: $scope.now,

                };
                $scope.item.jenisPelayanan = $scope.jenisPelayanan[0];
          
                $scope.isRouteLoading = false;
            };

        
            $scope.jenisPelayanan = [{
                "idjenispelayanan": 1, "jenispelayanan": "Rawat Inap"
            },{
                "idjenispelayanan": 2, "jenispelayanan": "Rawat Jalan"
            }];
          
             // "penjamin": "{penjamin lakalantas -> 1=Jasa raharja PT, 2=BPJS Ketenagakerjaan, 3=TASPEN PT, 4=ASABRI PT} jika lebih dari 1 isi -> 1,2 (pakai delimiter koma)",
     

      
            $scope.clear();
            $scope.postPengajuanSep = function(){             
                    $scope.isRouteLoading = true;
                    var dataGen = {
                        nokartu:  $scope.item.noKepesertaan,
                        tglsep:  new moment($scope.item.tglSep).format('YYYY-MM-DD'),
                        jenispelayanan: $scope.item.jenisPelayanan.idjenispelayanan,
                        keterangan:   $scope.item.keterangan === undefined ? "" : $scope.item.keterangan
                    };
         
                    manageServicePhp.postApprovalSep(dataGen).then(function(e) {
                        document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                    }).then(function(){
                        $scope.isRouteLoading = false;
                    })
            }

        }
    ]);
});