define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MapRuanganToJenisRuanganCtrl', ['$q', '$rootScope', '$scope', 'ManagePhp', '$state', 'CacheHelper',
        function ($q, $rootScope, $scope, managePhp, $state, cacheHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading = false;
            $scope.currentRuangan = [];
            $scope.listTempRuangan = []
            Init()

            function Init() {
                $scope.isRouteLoading = true;
                managePhp.getMaster("master-laporan/get-list-combo", true).then(function (dat) {
                    $scope.isRouteLoading = false;
                    $scope.listJenis = dat.data.jenisruangan
                    $scope.listRuangan = dat.data.ruangan
                    $scope.listRuanganArr = dat.data.ruangan
                });
            }
            $scope.loadData = function (jenis) {
                $scope.isRouteLoading = true;
                $scope.currentRuangan = []
                managePhp.getMaster("master-laporan/get-map-ruangantojenis?idjenis=" + jenis.id).then(function (res) {
                    if (res.data.data.length > 0) {
                        var array = res.data.data
                        for (let j = 0; j < $scope.listRuangan.length; j++) {
                            for (let i = 0; i < array.length; i++) {
                                if ($scope.listRuangan[j].id == array[i].objectruanganfk) {
                                    $scope.listRuangan[j].isChecked = true
                                    // $('#diceklis').addClass('warna')
                                    $scope.currentRuangan.push($scope.listRuangan[j])
                                }
                            }
                        }
                    } else {
                        for (let j = 0; j < $scope.listRuangan.length; j++) {
                            $scope.listRuangan[j].isChecked = false
                            // $('#diceklis').addClass('warna')
                            $scope.currentRuangan = []
                        }
                    }
                    if ($scope.currentRuangan.length != 0)
                        toastr.info($scope.currentRuangan.length + ' Ruangan dipilih', 'Info')
                    $scope.isRouteLoading = false;
                });
            }

            $scope.cariRuangan = function () {
                $scope.listTempRuangan = []
                if ($scope.item.ruangan != undefined) {
                    var ruangan = $scope.item.ruangan.toLowerCase()
                    for (let i = 0; i < $scope.listRuanganArr.length; i++) {
                        var arrRuang = $scope.listRuanganArr[i].namaruangan.toLowerCase()
                        if (arrRuang.indexOf(ruangan) != -1) {
                            $scope.listTempRuangan.push($scope.listRuanganArr[i])
                        }
                    }
                    $scope.listRuangan = []
                    $scope.listRuangan = $scope.listTempRuangan
                }
                if ($scope.item.ruangan == "" || $scope.item.ruangan == undefined)
                    $scope.listRuangan = $scope.listRuanganArr
            }
            $scope.cekAll = function (bool) {
                if (bool) {
                    $scope.listRuangan.forEach(function (e) {
                        e.isChecked = true
                        $scope.currentRuangan.push(e)
                    })
                } else {
                    $scope.listRuangan.forEach(function (e) {
                        e.isChecked = false
                        $scope.currentRuangan = []
                    })
                }

            }

            $scope.addRuangan = function (bool, data) {
                var index = $scope.currentRuangan.indexOf(data);
                if (_.filter($scope.currentRuangan, {
                    id: data.id
                }).length === 0 && bool)

                    $scope.currentRuangan.push(data);
                else
                    $scope.currentRuangan.splice(index, 1);
                // }
            }
            $scope.simpan = function () {
                if ($scope.currentRuangan.length == 0) {
                    toastr.error('Belum ada ruangan yg di pilih')
                    return
                }
                var objSave =
                {
                    "ruangan": $scope.currentRuangan,
                    "jenisruanganid": $scope.item.jenis.id
                }
                managePhp.postMaster(objSave, 'master-laporan/save-map-ruangantojenis').then(function (e) {
                    $scope.item = {}
                })

            }

            //***********************************

        }
    ]);
});
