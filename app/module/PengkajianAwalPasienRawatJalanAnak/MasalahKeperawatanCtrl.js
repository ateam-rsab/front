define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MasalahKeperawatanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'FindPasien', 'ManagePasien',
        function($rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, findPasien, ManagePasien) {

            //$rootScope.listActive -> data listMenu
            //ModelItem.setActiveMenu($rootScope.listActive, "MasalahKeperawatan");

            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};
            // findPasien.getByNoCM($scope.noCM).then(function(data) {
            //     $rootScope.currentPasien = data.data.data;
            //     $scope.pasien = data.data.data;
            // });


            $rootScope.showMenuPengkajianMedis = false;
            $scope.title = "Tanda Vital";
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $scope.isPernahDirawat = false;
            $scope.$watch('item.PernahDirawat', function(newValue, oldValue) {
                if (newValue == "Ya") {
                    $scope.isPernahDirawat = true;
                } else {
                    $scope.isPernahDirawat = false;
                    $scope.tempItem = {};
                    $scope.datariwayat = [];
                    $scope.dataRiwayatPenyakitOrObat = [];
                }
            });
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};

            //waktu saat ini
            $scope.now = new Date();

            $scope.isAdaAlatImplant = false;
            $scope.$watch('item.AlatImplant', function(newValue, oldValue) {
                if (newValue == "Ya") {
                    $scope.isAdaAlatImplant = true;
                } else {
                    $scope.isAdaAlatImplant = false;
                    $scope.item.KeteranganAlatImplant = "";
                }
            });

            $scope.isAdaPenyakitMayor = false;
            $scope.$watch('item.RiwayatDalamKeluarga', function(newValue, oldValue) {
                if (newValue == "Ya") {
                    $scope.isAdaPenyakitMayor = true;
                } else {
                    $scope.isAdaPenyakitMayor = false;
                }
            });

            $scope.item = {};
            $scope.dataVOloaded = true;

            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listYaTidak = data;
                ModelItem.getDataDummyGeneric("DataPenyakitMayor", false).then(function(data) {
                    $scope.listDiagnosis = data;
                    ModelItem.getDataDummyGeneric("DataPenyakitMayor", false).then(function(data) {
                        $scope.listDataPenyakitMayor = data;
                        findPasien.getMasalahKeperawatan($state.params.noRec).then(function(e) {
                            var data = e.data.data.MasalahKeperawatan[0];
                            if (data !== undefined) {
                                debugger;
                                $scope.tempNoRec = data.noRec;
                                var masalahKeperawatanDetail = data.masalahKeperawatanDetail;
                                for (var key in masalahKeperawatanDetail) {
                                    if (masalahKeperawatanDetail.hasOwnProperty(key)) {
                                        var element = masalahKeperawatanDetail[key];
                                        var tempDatariwayat = {
                                            "dataMasalahKeperawatan": element.dataMasalahKeperawatan,
                                            "tanggalDitemukan": element.tanggalDitemukan,
                                            "tanggalTeratasi": element.tanggalTeratasi,
                                            noRec: element.noRec
                                        }
                                        $scope.dataRiwayatPenyakitOrObat.push(tempDatariwayat);
                                        $scope.datariwayat.push(tempDatariwayat);
                                    }
                                }

                            }

                        });

                    });
                });
            })

            $scope.delete = function(data) {
                var temp = $scope.dataRiwayatPenyakitOrObat;
                $scope.dataRiwayatPenyakitOrObat = [];
                for (var key in temp) {
                    if (temp.hasOwnProperty(key)) {
                        var element = temp[key];
                        if (element.noRec !== data.noRec)
                            $scope.dataRiwayatPenyakitOrObat.push(element);
                    }
                }
            }
            $scope.edit = function(data) {

                $scope.item.riwayatPenyakitOrObat = data.dataMasalahKeperawatan;
                $scope.tempItem.tanggala = dateHelper.toDate(data.tanggalDitemukan);
                $scope.tempItem.tanggalb = dateHelper.toDate(data.tanggalTeratasi);
                $scope.currentNoRec = data.noRec;
            }

            $scope.tempItem = {};
            $scope.isAdaDiagnosis = true;
            $scope.datariwayat = [];
            $scope.addDataRiwayatPenyakitOrObat = function() {
                if ($scope.item.riwayatPenyakitOrObat != "" && $scope.item.riwayatPenyakitOrObat != undefined && $scope.tempItem.tanggala && $scope.tempItem.tanggalb != null && $scope.tempItem.tanggala && $scope.tempItem.tanggalb != undefined) {
                    for (var i = 0; i < $scope.datariwayat.length; i++) {

                        /*                        if ($scope.datariwayat[i].name == $scope.tempItem.riwayatPenyakitOrObat.name) {
                                                    return;
                                                }*/
                    }

                    // var tanggalBarua = dateHelper.getTanggalFormatted($scope.tempItem.tanggala);
                    // var tanggalBarub = dateHelper.getTanggalFormatted($scope.tempItem.tanggalb);


                    var tempDatariwayat = {
                        "dataMasalahKeperawatan": $scope.item.riwayatPenyakitOrObat,
                        "tanggalDitemukan": $scope.tempItem.tanggala,
                        "tanggalTeratasi": $scope.tempItem.tanggalb,
                        noRec: $scope.dataRiwayatPenyakitOrObat.length + 1

                    }
                    var valid = false;
                    var temp = $scope.dataRiwayatPenyakitOrObat;
                    if ($scope.currentNoRec !== undefined) {
                        temp = [];
                        for (var key in $scope.dataRiwayatPenyakitOrObat) {
                            if ($scope.dataRiwayatPenyakitOrObat.hasOwnProperty(key)) {
                                var element = $scope.dataRiwayatPenyakitOrObat[key];
                                if (element.noRec === $scope.currentNoRec) {
                                    element = {
                                        "dataMasalahKeperawatan": $scope.item.riwayatPenyakitOrObat,
                                        "tanggalDitemukan": $scope.tempItem.tanggala,
                                        "tanggalTeratasi": $scope.tempItem.tanggalb,
                                        noRec: $scope.dataRiwayatPenyakitOrObat.length + 1

                                    }
                                    valid = true;
                                }
                                temp.push(element)
                            }
                        }
                    } else temp.push(tempDatariwayat)
                    $scope.dataRiwayatPenyakitOrObat = temp;
                    // $scope.datariwayat.push(tempDatariwayat);
                }
            }

            $scope.removeRiwayatPenyakitOrObat = function(e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.datariwayat = $scope.datariwayat
                    .filter(function(el) {
                        return el.name !== grid._data[0].name;
                    });

                grid.removeRow(row);
            };

            //-----keperluan grid RiwayatPenyakitOrObat
            $scope.dataRiwayatPenyakitOrObat = [];

            $scope.columnRiwayatPenyakitOrObat = [{
                "field": "tanggalDitemukan",
                "title": "Tanggal ditemukan"
            }, {
                "field": "dataMasalahKeperawatan",
                "title": "Masalah keperawatan"
            }, {
                "field": "tanggalTeratasi",
                "title": "Tanggal teratasi"
            }, {
                command: {
                    text: "Hapus",
                    click: $scope.removeRiwayatPenyakitOrObat
                },
                title: "&nbsp;",
                width: "110px"
            }];
            //dimulai dari sini servicenya
            $scope.Save = function() {
                $scope.item.dataRiwayat = $scope.dataRiwayatPenyakitOrObat;

                /*if ($scope.item.RiwayatDalamKeluarga == "Tidak") {
                    $scope.item.PenyakitMayor = "";
                }

                var dataVO = delete $scope.item.attributes;

                //kirim data inputan dari frontend ke server
                GetPostOnPengkajianAwal.SendData(dataVO, "Pengkajian/RiwayatKesehatan")
                    .then(
                        function(res) {
                            //eksekusi posting berhasil
                        },
                        function(err) {
                            //eksekusi kalo posting gagal
                        })*/
                debugger;
                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                $scope.item.pasienDaftar = { noRec: $state.params.noRec };
                $scope.item.noRec = $scope.tempNoRec;
                ManagePasien.saveMasalahKeperawatan(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.kajianAwal.masalahkeperawatan = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.isNext = true;
                });
            };
            $scope.Next = function() {
                $rootScope.next();
            }
            $scope.dataKeperawatan = new kendo.data.DataSource({
                data: [],
                pageSize: 20,
            });
            $scope.dataBidan = new kendo.data.DataSource({
                data: [],
                pageSize: 20,
            });
            $scope.optionsKeperawatan = {
                navigatable: true,
                dataSource: $scope.dataKeperawatan,
                pageable: true,
                height: 550,
                toolbar: [{
                    name: "create",
                    text: "Tambah"
                }],
                columns: [
                    {"field": "tglAwal","title": "Tanggal Ditemukan", "width": 200, "type": "date", "format": "{0:dd/MM/yyyy}", "editor": dateTimeEditor}, 
                    {"field": "diagnosis","title": "Diagnosis Keperawatan"}, 
                    {"field": "tglAkhir","title": "Tanggal Teratasi", "width": 200, "type": "date", "format": "{0:dd/MM/yyyy}", "editor": dateTimeEditor},
                    {"command": [{name: "edit",text: "Edit"},{name: "destroy",text: "Hapus"}], "title": " ","width": 160}
                ],
                editable: true
            };
            $scope.optionsBidan = {
                navigatable: true,
                dataSource: $scope.dataBidan,
                pageable: true,
                height: 550,
                toolbar: [{
                    name: "create",
                    text: "Tambah"
                }],
                columns: [
                    {"field": "tglAwal","title": "Tanggal Ditemukan", "width": 200, "type": "date", "format": "{0:dd/MM/yyyy}", "editor": dateTimeEditor}, 
                    {"field": "diagnosis","title": "Diagnosis Bidan"}, 
                    {"field": "tglAkhir","title": "Tanggal Teratasi", "width": 200, "type": "date", "format": "{0:dd/MM/yyyy}", "editor": dateTimeEditor},
                    {"command": [{name: "edit",text: "Edit"},{name: "destroy",text: "Hapus"}], "title": " ","width": 160}
                ],
                editable: true
            };
            function dateTimeEditor(container, options) {
                $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                        .appendTo(container)
                        .kendoDateTimePicker({});
            }
        }
    ]);
});