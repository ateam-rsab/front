define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('RiwayatKesehatanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
            // ModelItem.setActiveMenu($rootScope.listActive, "RiwayatKesehatan");
            $scope.title = "Tanda Vital";
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.isPernahDirawat = false;
            $scope.$watch('item.pernahDirawat', function(newValue, oldValue) {
                if (newValue != undefined) {
                    if (newValue.name == "Ya") {
                        $scope.isPernahDirawat = true;
                    } else {
                        $scope.isPernahDirawat = false;
                        $scope.tempItem = {};
                        $scope.dataRiwayatPenyakitOrObat.data([]);
                    }
                }
            });

            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};
            findPasien.getByNoCM($scope.noCM).then(function(data) {
                $rootScope.currentPasien = data.data.data;
                $scope.pasien = data.data.data;
            });

            //waktu saat ini
            $scope.now = new Date();

            $scope.isAdaAlatImplant = false;
            $scope.$watch('item.alatImplant', function(newValue, oldValue) {
                if (newValue != undefined) {
                    if (newValue.name == "Ya") {
                        $scope.isAdaAlatImplant = true;
                    } else {
                        $scope.isAdaAlatImplant = false;
                        $scope.item.KeteranganAlatImplant = "";
                    }
                }
            });

            $scope.isAdaPenyakitMayor = false;
            $scope.$watch('item.riwayatDalamKeluarga', function(newValue, oldValue) {
                if (newValue != undefined) {
                    if (newValue.name == "Ya") {
                        $scope.isAdaPenyakitMayor = true;
                    } else {
                        $scope.isAdaPenyakitMayor = false;
                    }
                }
            });


            $scope.item = {};


            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listYaTidak = data;
                ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                    $scope.listDiagnosis = data;
                    ModelItem.getDataDummyGeneric("DataPenyakitMayor", false).then(function(data) {
                        $scope.listDataPenyakitMayor = data;
                        ModelItem.get("RiwayatKesehatan").then(function(data) {
                            $scope.item = data;
                            $rootScope.dataVOloaded = true;
                            $scope.item.KeteranganAlatImplant = "";
                            $scope.item.pernahDirawat = $scope.listYaTidak[0];
                            $scope.item.alatImplant = $scope.listYaTidak[0];
                            $scope.item.riwayatDalamKeluarga = $scope.listYaTidak[0];
                            findPasien.getRiwayatKesehatan($state.params.noRec).then(function(e) {
                                if (e.data.data.RiwayatKesehatan.length !== 0) {
                                    var data = e.data.data.RiwayatKesehatan[0];
                                    data.attributes = $scope.item.attributes;
                                    $scope.item = data;
                                    $scope.item.pernahDirawat = $scope.item.pernahDirawat ? $scope.listYaTidak[1] : $scope.listYaTidak[0];
                                    $scope.item.alatImplant = $scope.item.terpasangAlatImplan ? $scope.listYaTidak[1] : $scope.listYaTidak[0];
                                    $scope.item.riwayatDalamKeluarga = $scope.item.riwayatPenyakitMayor ? $scope.listYaTidak[1] : $scope.listYaTidak[0];
                                    $scope.item.penyakitMayor = data.dataPenyakitMayor;
                                    $scope.item.keteranganAlatImplant = data.keterangan;
                                    var tempData = [];
                                    var id = 0;
                                    for (var key in data.PernahDirawatDetail) {
                                        if (data.PernahDirawatDetail.hasOwnProperty(key)) {
                                            var element = data.PernahDirawatDetail[key];
                                            var tempDatariwayat = {
                                                "id": element.diagnosa.id,
                                                "name": element.diagnosa.namaDiagnosa,
                                                "tanggal": element.tanggal,
                                                noRec: element.noRec
                                            }
                                            tempData.push(tempDatariwayat);
                                            id++;

                                        }
                                    }
                                    $scope.dataRiwayatPenyakitOrObat = new kendo.data.DataSource({
                                        data: tempData
                                    });
                                }

                            });
                        }, function errorCallBack(err) {});
                    })
                })
            })





            $scope.tempItem = {};
            $scope.isAdaDiagnosis = true;
            $scope.addDataRiwayatPenyakitOrObat = function() {

                if ($scope.tempItem.riwayatPenyakitOrObat != "" && $scope.tempItem.riwayatPenyakitOrObat != undefined && $scope.tempItem.tanggalRiwayat != null && $scope.tempItem.tanggalRiwayat != undefined) {
                    for (var i = 0; i < $scope.dataRiwayatPenyakitOrObat._data.length; i++) {

                        if ($scope.dataRiwayatPenyakitOrObat._data[i].name == $scope.tempItem.riwayatPenyakitOrObat.name) {
                            return;
                        }
                    }

                    var tanggalBaru = $scope.tempItem.tanggalRiwayat;

                    var tempDatariwayat = {
                        "id": $scope.tempItem.riwayatPenyakitOrObat.id,
                        "name": $scope.tempItem.riwayatPenyakitOrObat.namaDiagnosa,
                        "tanggal": tanggalBaru
                    }

                    $scope.dataRiwayatPenyakitOrObat.add(tempDatariwayat);
                }
            }

            $scope.removeRiwayatPenyakitOrObat = function(e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.dataRiwayatPenyakitOrObat.remove(selectedItem);
            };

            //-----keperluan grid RiwayatPenyakitOrObat
            $scope.dataRiwayatPenyakitOrObat = new kendo.data.DataSource({
                data: []
            });

            $scope.columnRiwayatPenyakitOrObat = [{
                "field": "name",
                "title": "Nama"
            }, {
                "field": "tanggal",
                "title": "Tanggal"
            }, {
                command: {
                    text: "Hapus",
                    click: $scope.removeRiwayatPenyakitOrObat
                },
                title: "&nbsp;",
                width: "110px"
            }];

            $scope.Save = function() {
                var dataRiwayat = $scope.dataRiwayatPenyakitOrObat._data;
                var tempDataRiwayat = [];
                for (var i = 0; i < dataRiwayat.length; i++) {

                    var data = {
                        'diagnosa': {
                            'id': $scope.dataRiwayatPenyakitOrObat._data[i].id,
                            'namaDiagnosa': $scope.dataRiwayatPenyakitOrObat._data[i].name
                        },
                        'tanggal': $scope.dataRiwayatPenyakitOrObat._data[i].tanggal,
                        'noRec': $scope.dataRiwayatPenyakitOrObat._data[i].noRec,
                    }

                    tempDataRiwayat.push(data);
                }
                $scope.item.dataRiwayat = tempDataRiwayat;

                if ($scope.item.RiwayatDalamKeluarga == "Tidak") {
                    $scope.item.PenyakitMayor = "";
                }

                var pasienDaftar = {noRec: $state.params.noRec}

                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.saveRiwayatKesehatan(ModelItem.beforePost($scope.pasien),pasienDaftar, dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.kajianAwal.riwayatKesehatan = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.isNext = true;
                });
            };
            $scope.Next = function() {
                $rootScope.next();
            }
        }
    ]);
});