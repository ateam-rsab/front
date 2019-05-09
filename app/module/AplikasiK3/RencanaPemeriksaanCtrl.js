define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RencanaPemeriksaanCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', '$document', 'R', 'RencanaPemeriksaanService',
        function ($rootScope, $scope, $state, ModelItem, DateHelper, $document, r, RencanaPemeriksaanService) {
            $scope.now = new Date();
            ModelItem.get("K3/JadwalRencanaPemeriksaan").then(function (data) {
                $scope.item = data;
                $scope.item.idPegawai = $state.params.id;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) { });

            console.log($state.params.id);

            RencanaPemeriksaanService.findPegawaiId("pegawai/get-all-pegawai?id=" + $state.params.id).then(function success(dat) {
                console.log("asd" + JSON.stringify(dat.data.data[0].namaLengkap));
                $scope.item.id = dat.data.data[0].id;
                $scope.item.nama = dat.data.data[0].namaLengkap;

            }, function error(error) {
                console.log(error);
            });


            $scope.save = function () {
                console.log("asd")
                var data = {

                    "pegawai": {
                        "id": $scope.item.id
                    },
                    "tglPemeriksaan": $scope.item.tglPemeriksaan,
                    "pemeriksaan": $scope.item.pemeriksaan
                }
                RencanaPemeriksaanService.saveRencanaPemeriksaan(ModelItem.beforePost(data), "jadwal-rencana-pemeriksaan/save-jadwal/").then(function (dat) {
                    $scope.item.id = "";
                    $scope.item.nama = "";
                    $scope.item.tglPemeriksaan = "";
                    $scope.item.pemeriksaan = "";
                    back();
                });
            }

            var back = function () {
                $state.go("JadwalRencanaPemeriksaan");
            }





        }
    ]);
});