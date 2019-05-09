define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('AnamesisKhususCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper',
        function(findPasien, managePasien, $rootScope, $scope, ModelItem, $state, dateHelper) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian  Keperawatan";
            $scope.noCM = $state.params.noCM;
            //indikator harap tunggu
            $rootScope.doneLoad = false;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.tanggal = $state.params.tanggal;

            $scope.noCM = $state.params.noCM;
            $scope.item = {};
            $scope.dataRiwayatPenyakitOrObat = new kendo.data.DataSource({
                data: []
            });
            findPasien.getByNoCM($scope.noCM).then(function(data) {
                $scope.pasien = data.data.data;
            });
            $scope.columnRiwayatPenyakitOrObat = [{
                "field": "riwayatPenyakit",
                "title": "Riwayat Penyakit"
            }, {
                "field": "riwayatPengobatan",
                "title": "Riwayat Pengobatan"
            }];

            $scope.addDataRiwayatPenyakitOrObat = function() {
                $scope.dataRiwayatPenyakitOrObat.add({
                    riwayatPenyakit: $scope.item.riwayatPenyakit,
                    riwayatPengobatan: $scope.item.riwayatPengobatan
                });
            }

            $scope.removeRiwayatPenyakitOrObat = function() {
                $scope.dataRiwayatPenyakitOrObat.data([]);
            };
            $scope.Save = function() {
                var data = {};
                data.keluhanKhusus =$scope.item.keluhanUtamaKhusus;
                
                var riwayatPenyakitPengobatan = $scope.dataRiwayatPenyakitOrObat._data;

                var tempListRiwayatPenyakit = [];
                for(var i=0; i<riwayatPenyakitPengobatan.length; i++)
                {
                    var obj = {
                        "riwayatPengobatanYangDiterima": riwayatPenyakitPengobatan[i].riwayatPengobatan,
                        "riwayatPenyakit": riwayatPenyakitPengobatan[i].riwayatPenyakit
                    }

                    tempListRiwayatPenyakit.push(obj);
                }

                data.riwayatPenyakitPengobatan = tempListRiwayatPenyakit;

                
                managePasien.saveAnamesisDokter(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost(data)).then(function(e) {
                
                });

            };
        }
    ]);
});