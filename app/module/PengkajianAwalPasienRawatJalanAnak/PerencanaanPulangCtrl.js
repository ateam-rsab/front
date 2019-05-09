define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PerencanaanPulangCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, cacheHelper, DateHelper) {
            debugger;
            $rootScope.showMenuPengkajianMedis = false;
            $rootScope.showMenu = true;
            $scope.pasien = {};

            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listStatusKesadaran = data;
            })
            $scope.item = {};

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
                    $scope.dataRiwayatPenyakitOrObat.data([]);
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
            if ($scope.kajianAwal.riwayatKesehatan !== undefined) {
                $scope.item = $scope.kajianAwal.riwayatKesehatan;
                $scope.dataVOloaded = true;
            } else
                ModelItem.get("RiwayatKesehatan").then(function(data) {
                    $scope.item = data;

                    $scope.dataVOloaded = true;
                }, function errorCallBack(err) {});

            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listYaTidak = data;
            })

            ModelItem.getDataDummyGeneric("StatusKomponenPenilaian", false).then(function(data) {
                $scope.listDiagnosis = data;
            })

            $scope.tempItem = {};
            $scope.isAdaDiagnosis = true;
            $scope.datariwayat = [];
            $scope.addDataRiwayatPenyakitOrObat = function() {
                if($scope.tempItem.riwayatPenyakitOrObat != "" && $scope.tempItem.riwayatPenyakitOrObat != undefined )
                {
                    for(var i=0; i < $scope.datariwayat.length; i++)
                    {

                        if($scope.datariwayat[i].name == $scope.tempItem.riwayatPenyakitOrObat.name)
                        {
                            return;
                        }
                    }
                    // alert($scope.tempItem.HubunganPasienDenganAnggotaKeluarga)
                    var tempDatariwayat = {
                        "name" : $scope.tempItem.riwayatPenyakitOrObat.name,
                        "status" : $scope.tempItem.HubunganPasienDenganAnggotaKeluarga,
                        "tanggalbs" : $scope.tempItem.TextAreaKeterangan


                    }

                    $scope.dataRiwayatPenyakitOrObat.add(tempDatariwayat);
                    $scope.datariwayat.push(tempDatariwayat);
                }
            }

            $scope.removeRiwayatPenyakitOrObat = function(e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.datariwayat = $scope.datariwayat
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });

                grid.removeRow(row);
            };

            //-----keperluan grid RiwayatPenyakitOrObat
            $scope.dataRiwayatPenyakitOrObat = new kendo.data.DataSource({
                data: []
            });

            $scope.columnRiwayatPenyakitOrObat = [{
                "field": "name",
                "title": "Komponen Penilaian"
            }, {
                "field": "status",
                "title": "Status"
            }, {
                "field": "tanggalbs",
                "title": "Keterangan"
            }, {
                command: { text: "Hapus", click: $scope.removeRiwayatPenyakitOrObat },
                title: "&nbsp;",
                width: "110px"
            }];
//dimulai dari sini servicenya
            $scope.Next = function() {
                $scope.item.dataRiwayat = $scope.datariwayat;

                if($scope.item.RiwayatDalamKeluarga == "Tidak")
                {
                    $scope.item.PenyakitMayor = "";
                }

                var dataVO = delete $scope.item.attributes;
                console.log(JSON.stringify($scope.item));
                debugger;
                //kirim data inputan dari frontend ke server
                GetPostOnPengkajianAwal.SendData(dataVO, "Pengkajian/RiwayatKesehatan")
                    .then(
                        function(res) {
                            console.log(JSON.stringify(res));
                            //eksekusi posting berhasil
                        },
                        function(err) {
                            //eksekusi kalo posting gagal
                        })
            };
            $scope.dataPerencanaan = new kendo.data.DataSource({
                data: [],
                pageSize: 20,
                schema: {
                  model: {
                    fields: {
                      komponen: { defaultValue: { id: 0, name: "--Pilih komponen"}},
                      status: { defaultValue: { id: 0, name: "--Pilih status"}},
                      keterangan: { type: "string"},
                    }
                  }
                },
            });
            $scope.optionsPerencanaan = {
                navigatable: true,
                dataSource: $scope.dataPerencanaan,
                pageable: true,
                toolbar: [{
                    name: "create",
                    text: "Tambah"
                }],
                columns: [
                    {"field": "komponen", "title": "Komponen Penilaian", "editor": categoryDropDownEditor_komponen, "template": "#=komponen.name#"}, 
                    {"field": "status", "title": "Status", "editor": categoryDropDownEditor_status, "template": "#=status.name#"}, 
                    {"field": "keterangan", "title": "Keterangan"},
                    {"command": [{name: "edit",text: "Edit"},{name: "destroy",text: "Hapus"}], "title": " ","width": 160}
                ],
                editable: true
            };
            function categoryDropDownEditor_komponen(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: $scope.listDiagnosis
                    });
            }
            function categoryDropDownEditor_status(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: $scope.listYaTidak
                    });
            }
        }
    ]);
});