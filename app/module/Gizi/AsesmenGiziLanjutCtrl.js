define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('AsesmenGiziLanjutCtrl', ['FindPasien', 'ManageGizi', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasienGizi', 'DateHelper',

        function(findPasienTemp, manageGizi, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper) {
            ModelItem.getDataDummyGeneric("KasusPenyakit", true, undefined, 10).then(function(data) {
                $scope.kasusPenyakits = data;
            });

            findPasienTemp.getAsesmenGiziLanjut($state.params.noRec).then(function(e) {
                var data = e.data.data.AsesmenGiziLanjut[0];
                $scope.item = data;
                $scope.isSave = true;


            });
            $rootScope.hideButtonAdd = true;
            ModelItem.getDataDummyGeneric("Ruangan", true, undefined, 10).then(function(data) {
                $scope.ruangans = data;
            });
            ModelItem.getDataDummyGeneric("KlinisFisikGizi", false).then(function(data) {
                $scope.listKlinisFisikGizi = data;
            })
            $scope.now = new Date();
            $scope.currentIcd = {
                kdDiagnosa: "Z 71.3"
            }
            $scope.Save = function() {
                $scope.item.pasien = { noRec: $state.params.noRec };
                $scope.item.tanggalPendaftaran = $state.params.tanggal;
                manageGizi.saveAssementLanjut(ModelItem.beforePost($scope.item)).then(function() { $scope.isSave = true; }, function(err) {});
            }
            $scope.OrderGizi = function() {
                $state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.GiziOrder');
            }
            $scope.Evaluasi = function() {
                $state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.PerjanjianGizi');
            }
        }
    ])
});