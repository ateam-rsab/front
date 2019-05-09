/**
 * Created by jasamedika on 22/11/2018.
 */
define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('KeluhanUtamaRevCtrl', ['$rootScope', '$scope', '$state', 'CacheHelper', 'ManagePhp',
        function ($rootScope, $scope, $state, cacheHelper, ManagePhp) {
            $scope.title = "Keluhan Utama";
            $rootScope.showMenu = true;
            $scope.noCM = $state.params.noCM;
            $scope.noRecPap = cacheHelper.get('noRecPap'); // noRecPap
            $scope.item = {};

            $scope.getdata = function () {
                var objectfk = "KLU";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk=" + noregistrasifk + '&objectfk=' + objectfk
                    + '&riwayatfk=' + $scope.noRecPap).then(function (e) {
                        $scope.dataEdukasi = e.data.data;
                        if ($scope.dataEdukasi.length != 0) {
                            for (var i = 0; i < $scope.dataEdukasi.length; i++) {
                                if ($scope.dataEdukasi[i].objectfk == "KLU-000001") {
                                    $scope.noRec = $scope.dataEdukasi[i].norec
                                    $scope.item.keluhanUtama = $scope.dataEdukasi[i].nilai
                                }
                            }
                        }
                    })
            }
            $scope.getdata();

            $scope.Save = function () {

                var tempData = [];
                if ($scope.item.keluhanUtama != undefined) {
                    var tmpDataEdukasi = {
                        norec: $scope.noRec,
                        objectfk: "KLU-000001",
                        nilai: $scope.item.keluhanUtama,
                        satuan: "-",
                        jenisobject: "textbox"
                    }
                    tempData.push(tmpDataEdukasi);
                }
                for (var i = tempData.length - 1; i >= 0; i--) {
                    if (tempData[i].nilai == undefined) {
                        tempData.splice([i], 1)
                    }
                    if (tempData[i].norec == undefined) {
                        tempData[i].norec = '-'
                    }
                }

                var jsonSave = {
                    data: tempData,
                    noregistrasifk: $state.params.noRec,
                    riwayatpapfk: $scope.noRecPap
                }
                ManagePhp.saveData(jsonSave).then(function (e) {
                    $scope.getdata();
                    ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Keluhan Utama').then(function (res) {
                    })
                });
            }

        }
    ]);
});