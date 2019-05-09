define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RiwayatPendidikanNonFormalCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state',
        function ($rootScope, $scope, ModelItem, DateHelper, $state) {
            $scope.now = new Date();
            ModelItem.get("Psikologi").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
                var items = [];
                if (data.psikologi !== undefined && data.psikologi.riwayatPendidikanNonFormal !== undefined)
                    items = data.nonformal.grid;

                $scope.Selanjutnya = function (model) {
                    var riwayatPendidikanNonFormal = [];
                    for (var i in $scope.dataRiwayatPendidikanNonFormal._data) {
                        var temp = {};
                        var dataItem = $scope.dataRiwayatPendidikanNonFormal._data[i];
                        if (dataItem.jenisKursus !== undefined || dataItem.keterangan !== undefined) {
                            temp = {
                                jenisKursus: dataItem.jenisKursus,
                                keterangan: dataItem.keterangan,
                                tglRegistrasi: 1469791366435,
                                pasien: { id: "1631" }
                            }
                            riwayatPendidikanNonFormal.push(temp);
                        }
                    }
                    if ($scope.item.psikologi === undefined)
                        $scope.item.psikologi = {};
                    $scope.item.psikologi.riwayatPendidikanNonFormal = riwayatPendidikanNonFormal;
                    $state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.Psikologi.PengalamanOrganisasi');
                    console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                };

                $scope.Back = function () {
                    history.back();
                }

                $scope.dataRiwayatPendidikanNonFormal = new kendo.data.DataSource({
                    data: items
                });
                $scope.columnRiwayatPendidikanNonFormal = [{
                    "field": "No",
                    "title": "No. Urut",
                    width: "75px"
                },
                    {
                        "field": "jenisKursus",
                        "title": "Jenis Kursus",
                        width: "150px"
                    },
                    {
                        "field": "keterangan",
                        "title": "Keterangan",
                        width: "200px"
                    },
                    {
                        command: { text: "Delete", click: $scope.removeRiwayatPendidikanNonFormal },
                        title: "&nbsp;",
                        width: "110px"
                    }
                ];

            }, function errorCallBack(err) { });
            ModelItem.getDataDummyGeneric("JenisKursus", true).then(function (data) {
                $scope.listJenisKursus = data;
            })




            $scope.addDataRiwayatPendidikanNonFormal = function () {
                var tempDaftarRiwayat = {
                    "No": $scope.dataRiwayatPendidikanNonFormal._data.length + 1,
                    "jenisKursus": $scope.item.jenisKursus,
                    "keterangan": $scope.item.Keterangan

                }
                $scope.dataRiwayatPendidikanNonFormal.add(tempDaftarRiwayat);
                $scope.reset();
            }
            $scope.removeRiwayatPendidikanNonFormal = function (e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                $scope.tempDaftarRiwayat == $scope.dataRiwayatPendidikanNonFormal
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });
                grid.removeRow(row);
            };

            $scope.reset = function () {
                $scope.item.jenisKursus = undefined,
                    $scope.item.LamaKursus = undefined,
                    $scope.item.Keterangan = undefined
            }

        }
    ]);
});