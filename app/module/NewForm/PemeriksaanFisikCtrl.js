define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PemeriksaanFisikCtrl', ['$rootScope', '$scope', 'ModelItem',
        function($rootScope, $scope, ModelItem) {
            //$rootScope.listActive -> data listMenu
            // ModelItem.setActiveMenu($rootScope.listActive, "RiwayatPemeriksaan");

            $scope.now = new Date();
            $scope.item = {};
            ModelItem.get("NewForm/PemeriksaanFisik").then(function(data) {
                $scope.item = data;


                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});
            ModelItem.getDataDummyGeneric("PemeriksaanFisik/KesulitanMenyusui", false).then(function(data) {
                $scope.listKesulitanMenyusui = data;
            })
            ModelItem.getDataDummyGeneric("StatusKelamin", false).then(function(data) {
                $scope.listJenisKelamin = data;
            })
            ModelItem.getDataDummyGeneric("PemeriksaanFisik/Refleks", false).then(function(data) {
                $scope.listRefleks = data;
            });
            ModelItem.getDataDummyGeneric("PemeriksaanFisik/Kelainan", false).then(function(data) {
                $scope.listKelainan = data;
            });
            ModelItem.getDataDummyGeneric("PemeriksaanFisik/TeknikMenyusui", false).then(function(data) {
                $scope.listTeknikMenyusui = data;
            });
            ModelItem.getDataDummyGeneric("PemeriksaanFisik/RencanaTindakLanjut", false).then(function(data) {
                $scope.listRencanaTindakLanjut = data;
            });
            $scope.arrKelainan = [];
            $scope.cekArrKelainan = function(data) {
                $scope.item.CheckBox = $scope.arrKelainan;
                var isExist = _.find($scope.arrKelainan, function(dataExist) {
                    return dataExist == data; });

                if (isExist == undefined) {
                    $scope.arrKelainan.push(data);
                } else {
                    $scope.arrKelainan = _.without($scope.arrKelainan, data);
                }

                console.log('list Kelainan : ' + JSON.stringify($scope.arrKelainan));
                var islainlain = _.find($scope.arrKelainan, function(arr) {
                    return arr.name == "lain-lain"; });
                if (islainlain) {
                    $scope.showLainLain = true;
                } else {
                    $scope.showLainLain = false;
                }
            };
            $scope.showSebab = false;
            $scope.$watch('item.KesulitanMenyusui', function(newValue, oldValue) {
                if (newValue == "ada") {
                    $scope.showSebab = true;
                } else {
                    $scope.showSebab = false;
                }
            });
            $scope.showCatatan = false;
            $scope.$watch('item.TeknikMenyusui', function(newValue, oldValue) {
                if (newValue == "kurang") {
                    $scope.showCatatan = true;
                } else {
                    $scope.showCatatan = false;
                }
            });
            $scope.showDirujuk = false;
            $scope.showPengobatan = false;
            $scope.showTanggalKunjunganUlang = false;
            $scope.$watch('item.RencanaTindakLanjut', function(newValue, oldValue) {
                if (newValue == "dirujuk langsung") {
                    $scope.showDirujuk = true;
                    $scope.showPengobatan = false;
                    $scope.showTanggalKunjunganUlang = false;
                } else if (newValue == "pengobatan") {
                    $scope.showDirujuk = false;
                    $scope.showPengobatan = true;
                    $scope.showTanggalKunjunganUlang = false;
                } else if (newValue == "kunjungan ulang") {
                    $scope.showDirujuk = false;
                    $scope.showPengobatan = false;
                    $scope.showTanggalKunjunganUlang = true;
                } else {
                    $scope.showDirujuk = false;
                    $scope.showPengobatan = false;
                    $scope.showTanggalKunjunganUlang = false;
                }
            });
            /*$scope.showLainLain	 = false;
            $scope.$watch('item.Kelainan', function(newValue, oldValue) {
            	if (newValue == "lain-lain") {
            		$scope.showLainLain = true;
            	} else {
            		$scope.showLainLain = false;
            	}
            });*/
        }
    ]);
});