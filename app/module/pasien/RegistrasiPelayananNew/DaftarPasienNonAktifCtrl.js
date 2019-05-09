
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPasienNonAktifCtrl', ['$state', 'ManageServicePhp', '$rootScope', '$scope', 'DateHelper','ManageTataRekening',
        function($state, manageServicePhp, $rootScope, $scope, dateHelper, manageTataRekening) {
            $scope.title = "Daftar Pasien Non Aktif";
            $scope.dataVOloaded = false;
            $scope.isRouteLoading=false;
            $scope.now = new Date();
            $scope.item = {
                from: $scope.now,
                until: $scope.now
            };
            $scope.findData = function() {
                $scope.isRouteLoading=true;
                var tglAwal = moment($scope.item.from).format('YYYY-MM-DD');
                var tglAkhir = moment($scope.item.until).format('YYYY-MM-DD');

                var reg =""
                if ($scope.item.noReg != undefined){
                    var reg ="&noReg=" +$scope.item.noReg
                }
                var rm =""
                if ($scope.item.noRm != undefined){
                    var rm ="&noCm=" +$scope.item.noRm
                }  
                 var nama =""
                if ($scope.item.namaPasien != undefined){
                    var nama ="&namaPasien=" +$scope.item.namaPasien
                }   
                manageServicePhp.getDataTableTransaksi("operator/get-daftar-pasien-nonaktif?"+
                    "tglAwal="+tglAwal+
                    "&tglAkhir="+tglAkhir
                    +reg
                    +rm
                    +nama).then(function(e){
                      $scope.isRouteLoading=false;
                      $scope.dataPasienBatal = new kendo.data.DataSource({
                          data: e.data.data,                       
                      });
                  })

                }
                $scope.findData();
                $scope.mainGridOptions = {
                    columns: [
                        {
                            field: "tglregistrasi",
                            title: "Tgl Registrasi"
                        },
                        {
                            field: "noregistrasi",
                            title: "No Registrasi",
                            hidden: false
                        },
                        {
                            field: "nocm",
                            title: "No Rm",
                            hidden: false
                        },  
                        {
                            field: "namapasien",
                            title: "Nama Pasien"
                        },
                        {
                            field: "kelompokpasien",
                            title: "Tipe Pasien"
                        },
                        {
                            field: "namaruangan",
                            title: "Ruangan"
                        }
                    ],
                    selectable: "row",
                    sortable: true
                }

                $scope.Detail = function(){
                    if($scope.dataPasienSelected.noregistrasi != undefined){
                        var objSave ={
                            noregistrasi:$scope.dataPasienSelected.noregistrasi
                        }
                        manageTataRekening.postJurnalAkuntansi(objSave).then(function(data){
                            
                        });
                        var obj = {
                            noRegistrasi : $scope.dataPasienSelected.noregistrasi
                        }

                        $state.go('RincianTagihanTataRekening', {
                            dataPasien: JSON.stringify(obj)
                        });
                    }
                }


       }
    ]);

});