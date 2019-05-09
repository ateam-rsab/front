define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('transferpasienInternalrsCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper','DateHelper', 'FindPasien','ManagePasien',
        function($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, findPasien, ManagePasien) {



            $scope.title = "transfer Pasien Internal - Diagnosa";
            $scope.now = new Date();

            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};

            ModelItem.getDataNotGeneric("registrasi-pelayanan/get-all-dokter", false).then(function(data){

                $scope.listDokter = data;
            });

            $scope.arrStatusYaTidak = [];
            $scope.arrStatusYaTidakKet = function (data) {
                $scope.isNamaHubungan = false;
                if (data=="Ya"){
                    $scope.isNamaHubungan = true;
                }else
                {
                    $scope.isNamaHubungan = false;
                }
                /*$scope.arrxxx == data;
                var isExist = _.find($scope.arrStatusYaTidak, function (dataExist) {
                    return dataExist == data;
                });

                if (isExist == undefined) {
                    $scope.arrStatusYaTidak.push(data);
                }
                else {
                    $scope.arrStatusYaTidak = _.without($scope.arrStatusYaTidak, data);
                }*/

            };


            $q.all([ModelItem.getDataDummyGeneric("StatusYaTidak", false),
                ModelItem.getDataDummyGeneric("Fasilitas", false),
                ModelItem.getDataDummyGeneric("KeadaanPasien", false),
                ModelItem.getDataDummyGeneric("Tenaga", false),
                ModelItem.getDataDummyGeneric("Ruangan", false),
                ModelItem.get("PemeriksaanFisikEliminasi"),
                findPasien.getByNoCM($scope.noCM),
                findPasien.getPersetujuan($scope.noCM)

            ]).then(function(data) {

                if (data[0].statResponse) {
                    for (var i = 0; i < data[0].length; i++) {
                        data[0][i].isChecked = false;
                    }
                    $scope.listStatusYaTidak = data[0];
                }
                if(data[1].statResponse)
                    $scope.listStatusFasilitas = data[1];

                if(data[2].statResponse)
                    $scope.listStatusKondisiPasien = data[2];

                if(data[3].statResponse)
                    $scope.listStatusTenaga = data[3];

                if(data[4].statResponse)
                    $scope.listStatusRuangan = data[4];

                if(data[5].statResponse)
                    $scope.item = data[5];

                if(data[6].statResponse){
                    $rootScope.currentPasien = data[6].data.data;
                    $scope.pasien = data[6].data.data;
                }

                if(data[7].statResponse){
                    
                    $scope.item.pasienDaftar = {
                        "noRec" : data[7].data[0].noRec
                    }

                }


                //ambil data current pasien seusia no cm dan tanggal
                getDataCurentPasien();
            });


            $scope.Save = function() {
                /*$scope.item.keluargadiberitahu = ModelItem.setObjCollectionForCheckbox($scope.listStatusYaTidak, $scope.arrStatusYaTidak, "statusRiwayatPsikologi");
                */
               /* $scope.item.keluargadiberitahu = $scope.arrxxx*/
                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.saveTransferPasien(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.kajianAwal.transferpasien = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $state.go('SuratPermintaanMasukRumahSakit', {
                        noCM: $scope.noCM,
                        tanggal: $state.params.tanggal
                    });
                });
                
            };


        }]);
});
