define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RegistrasiPelayananCtrl', ['$scope', 'ModelItem', '$state', '$rootScope', 'FindPasien', 'FindPegawai', function($scope, modelItem, $state, $rootScope, findPasien, findPegawai) {
        $scope.item = {};
        $scope.now = new Date();
        $scope.doneLoad = $rootScope.doneLoad;
        $scope.showFind = true;
        $scope.onSelect = function(a) {
            findPasien.getByNoCM(a.obj.dataItem.noCm).then(function(e) {
                $scope.item = e.data;

            });
        };
        $rootScope.isOpen = true;
        $scope.noCm = "";

        $scope.now = new Date();
        $scope.headerTemplate = '<table><tr><th width="150px">No. Rekam Medis</th><th width="150px">Nama Pasien</th><th width="300px">Alamat Pasien</th><th width="100px">Tanggal Lahir</th></tr></table>';
        $scope.template = '<table><tr><td width="150px">#: data.noCm #</td><td width="150px">#: data.namaPasien #</td><td width="300px">#: data.alamatPasien #</td><td width="100px">#: data.tanggalLahir #</td></tr></table>';
        modelItem.getDataDummyGeneric("KasusPenyakit", true, undefined, 10).then(function(data) {
            $scope.kasusPenyakits = data;
        });
        modelItem.getDataDummyGeneric("RuanganRawatJalan", true, undefined, 10).then(function(data) {
            $scope.ruangans = data;
        });
        //
        modelItem.getDataDummyGeneric("AsalRujukan", true, undefined, 10).then(function(data) {
            $scope.asalrujukans = data;
        });

        modelItem.getDataDummyGeneric("KelompokPasien", true, undefined, 10).then(function(data) {
            $scope.kelompokPasiens = data;
        });

        $scope.$watch('item.ruanganPelayanan', function(e) {
            if (e === undefined) return;
            $scope.dokters = findPegawai.getDokterRawatJalan($scope.item.tanggalPendaftaran, e);
        })
        $scope.$watch('noCm', function(e) {
            //method untuk pencarian data pasien berdasrkan noCM yang akan di masukan ke dalam auto complete

            findPasien.findByNoCM(e).fetch(function(e) {
                $scope.itemPatiens = this._data;
            });
        });
        modelItem.get("PasienVO").then(function(data) {
            $rootScope.doneLoad = false;
            $scope.doneLoad = false;
            $scope.item = data;
            $scope.item.tanggalPendaftaran = new Date();
            if ($state.params.noCm !== undefined) {
                if ($state.params.noCm !== '-') {
                    $scope.showFind = false;
                    findPasien.getByNoCM($state.params.noCm).then(function(e) {
                        $scope.item = e.data;
                    });
                } else {
                    //$scope.item = {};

                }
            }
        }, function(error) {
            $rootScope.doneLoad = false;
            $scope.doneLoad = false;
            window.messageContainer.error(error);
        });
        $scope.Lanjutkan = function() {
            modelItem.set("PasienVO", $scope.item);
            $state.go('');
        };
    }]);
});