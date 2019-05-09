define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SuratPermintaanMasukRumahSakitDuaCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'ManagePasien', 'FindPasien',
        function($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, managePasien, findPasien) {
            $scope.now = new Date();
            $rootScope.hideButtonAdd = true;
            $rootScope.doneLoad = false;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.item = {};

            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.tanggal = $state.params.tanggal;
            $rootScope.tanggal = $state.params.tanggal;
            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");

            ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
                $scope.ListPegawai = data;
            });
            ModelItem.getDataDummyGeneric("CaraMasuk", true).then(function(data) {
                $scope.ListAksesMasuk = data;
            });
            $scope.ListUnitKerja = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
            ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
                $scope.ListDokterPenanggunggJawab = data;
            });
            ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
                $scope.ListNamaPegawai = data;
            });
            ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
                $scope.ListPerawatan = data;
            });
            ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
                $scope.ListDokterPengirim = data;
            });
            ModelItem.getDataDummyGeneric("StatusPerawatan", false).then(function(data) {
                $scope.ListStatusPerawatan = data;
            });
            /*findPasien.getPersetujuanUmum($state.params.noCM, $state.params.tanggal).then(function(e) {
             $scope.persetujuanUmum = e.data.data.PersetujuanUmum[0];
             });*/

            /*findPasien.getSuratPermintaanMasukRumahSakit($state.params.noCM, $state.params.tanggal).then(function(e) {
             if (e.data.data.SuratPermintaanMasuk === undefined)
             return;
             if (e.data.data.SuratPermintaanMasuk.length !== 0) {
             $scope.item = e.data.data.SuratPermintaanMasuk[0];
             $scope.isHide = true;
             }
             });*/
            $scope.Save = function() {
                /*var pasien = {};
                 findPasien.getByNoCM($state.params.noCM).then(function(data) {
                 var temp = dateHelper.toDate($state.params.tanggal);
                 $scope.item.tanggalPendaftaran = $state.params.tanggal;
                 pasien.id = data.data.data.id;
                 pasien.noCM = $state.params.noCM;
                 $scope.item.pasien = pasien;

                 managePasien.saveSuratPermintaanMasuk(ModelItem.beforePost($scope.item)).then(function() {});
                 });*/



                /*
                 $scope.item.StatusPsikososialSet = ModelItem.setObjCollectionForCheckbox($scope.listStatusRiwayatPsikologi, $scope.arrStatusRiwayatPsikologi, "statusRiwayatPsikologi");
                 $scope.item.tempatTinggal = ModelItem.setObjCollectionForCheckbox($scope.listStatusTempatTinggal, $scope.arrStatusTempatTinggal, "tempatTinggal");
                 */
                /*cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.saveSuratPermintaanMasukRumahSakit(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.kajianAwal.riwayatpsikososial = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);

                    $state.go('dashboardpasien.PengkajianMedis.Instruksi.TransferInternal', {
                        noCM: $scope.noCM,
                        tanggal: $state.params.tanggal
                    });

                });*/

                var pasien = {};
                findPasien.getByNoCM($state.params.noCM).then(function(data) {
                    var temp = dateHelper.toDate($state.params.tanggal);
                    $scope.item.tanggalPendaftaran = $state.params.tanggal;
                    pasien.id = data.data.data.id;
                    pasien.noCM = $state.params.noCM;
                    $scope.item.pasien = pasien;
                    $scope.item.pasienDaftar = {
                        noRec: $state.params.noRec
                    };

                    managePasien.saveSuratPermintaanMasuk(ModelItem.beforePost($scope.item)).then(function() {});

                    /*$state.go('dashboardpasien.PengkajianMedis.Instruksi.TransferInternal', {
                        noCM: $scope.noCM,
                        tanggal: $state.params.tanggal
                    });*/
                });
            };
        }
    ]);
});