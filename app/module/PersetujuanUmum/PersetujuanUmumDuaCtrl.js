define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PersetujuanUmumDuaCtrl', ['ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'FindPasien',
        function(managePasien, $rootScope, $scope, ModelItem, $state, dateHelper, findPasien) {
            $rootScope.doneLoad = false;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.item = {};
            $scope.now = new Date();
            ModelItem.getDataDummyGeneric("KelompokPasien", true, undefined, 10).then(function(data) {
                $scope.listJenisPembayaran = data;
            });
            findPasien.getPersetujuanUmum($state.params.noCM, $state.params.tanggal).then(function(e) {
                if (e.data.data.PersetujuanUmum === undefined)
                    return;
                if (e.data.data.PersetujuanUmum.length !== 0) {
                    $scope.persetujuanUmum = ModelItem.beforePost(e.data.data.PersetujuanUmum[0]);
                    $scope.item.ruanganTujuan = $scope.persetujuanUmum.ruanganTujuan;
                    $scope.item.kelasPerawatan = $scope.persetujuanUmum.kelasPerawatan;
                    $scope.item.jenisPembayaran = $scope.persetujuanUmum.jenisPembayaran;
                    $scope.item.tglRencana = $scope.persetujuanUmum.tglRencana;
                    // $scope.isNext = true;
                }

            });
            $scope.listRuang = ModelItem.kendoHttpSource('/ruangan/get-all-ruangan-rawat-inap');
            ModelItem.getDataDummyGeneric("Kelas", true).then(function(data) {
                $scope.listKelasPerawatan = data;
            })

            $scope.Save = function() {
                var pasien = {};
                findPasien.getByNoCM($state.params.noCM).then(function(data) {
                    var temp = dateHelper.toDate($state.params.tanggal);
                    $scope.item.tglRegistrasi = $state.params.tanggal;
                    pasien.id = data.data.data.id;
                    pasien.noCM = $state.params.noCM;
                    $scope.item.pasien = pasien;
                    managePasien.savePersetujuanUmum(ModelItem.beforePost($scope.item)).then(function() {
                        $state.go('dashboardpasien.PengkajianMedis.Instruksi.SuratPermintaanMasuk');
                    }, function(err) {});
                    //$state.go('dashboardpasien.PengkajianMedis.Instruksi.SuratPermintaanMasuk');    
                });
            };
            $scope.Next = function() {
                $state.go('dashboardpasien.PengkajianMedis.Instruksi.SuratPermintaanMasuk');
            }
        }
    ]);
});