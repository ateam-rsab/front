define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ScheduleCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru',
        function(findPasien, ManagePasien, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru) {
            findPasien.getByNoRegistrasi($state.params.noRegister).then(function(data) {
                debugger;
                $scope.item.pasien = data.data.pasien;
                $scope.item.pasien.noRec = data.data.noRec;
            });
            $scope.model = { detailPelaksana: [], tglRencana: new Date() };
            $scope.now = new Date();
            ModelItem.getDataDummyGeneric("Pegawai", false).then(function(data) {
                $scope.listPegawai = _.sortBy(_.filter(data, function(x) {
                    return x.statusEnabled === true;
                }), function(e) {
                    return e.namaLengkap;
                });
            })
            ModelItem.getDataDummyGeneric("JenisPetugasPelaksana", true, undefined, 10).then(function(data) {
                $scope.sourceJenisDiagnosisPrimer = data;
            });
            $scope.addPegawai = function() {
                $scope.model.detailPelaksana.push($scope.temp);
                $scope.temp = undefined;
            }
            $scope.simpan = function() {
                $scope.items.push($scope.model);
                $scope.model = { detailPelaksana: [], tglPelayanan: new Date() };
            }

            $scope.Save = function() {
                // console.log(JSON.stringify(ModelItem.beforePost($scope.model.detailPelaksana)));
                // console.log(JSON.stringify());
                $scope.model.noCm = { noRec: $state.params.noRegister }
                ManagePasien.saveRencanaOperasi(ModelItem.beforePost($scope.model))
            }
        }
    ]);
});