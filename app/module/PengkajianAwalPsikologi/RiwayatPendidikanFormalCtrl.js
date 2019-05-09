define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RiwayatPendidikanFormalCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state',
        function ($rootScope, $scope, ModelItem, DateHelper, $state) {
            $scope.now = new Date();

            ModelItem.get("Psikologi").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
                var items = [];
                if (data.psikologi !== undefined && data.psikologi.riwayatPendidikanFormal !== undefined)
                    items = data.psikologi.riwayatPendidikanFormal;

                $scope.Selanjutnya = function (model) {
                    var riwayatPendidikanFormal = [];
                    for (var i in $scope.dataRiwayatPendidikanFormal._data) {
                        var temp = {};
                        var dataItem = $scope.dataRiwayatPendidikanFormal._data[i];
                        if (dataItem.pendidikan !== undefined || dataItem.namaSekolah !== undefined || dataItem.jurusan !== undefined || dataItem.tahun !== undefined || dataItem.keterangan !== undefined) {
                            temp = {
                                pendidikan: { id: dataItem.pendidikan.id },
                                namaSekolah: dataItem.namaSekolah,
                                jurusan: dataItem.jurusan,
                                tahun: dataItem.tahun,
                                keterangan: dataItem.keterangan,
                                tglRegistrasi: 1469791366435,
                                pasien: { id: "1631" }
                            }
                            riwayatPendidikanFormal.push(temp);
                        }
                    }
                    if ($scope.item.psikologi === undefined)
                        $scope.item.psikologi = {};
                    $scope.item.psikologi.riwayatPendidikanFormal = riwayatPendidikanFormal;
                    $state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.Psikologi.RiwayatPendidikanNonFormal');
                    console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                };

                $scope.Back = function () {
                    history.back();
                }

                $scope.dataRiwayatPendidikanFormal = new kendo.data.DataSource({
                data: items
            });
            $scope.columnRiwayatPendidikanFormal = [{
                "field": "no",
                "title": "No",
                width: "25px"
            }, {
                    "field": "pendidikan.name",
                    "title": "Pendidikan",
                    width: "100px"
                }, {
                    "field": "namaSekolah",
                    "title": "Nama Sekolah",
                    width: "100px"
                }, {
                    "field": "jurusan",
                    "title": "Jurusan",
                    width: "100px"
                }, {
                    "field": "tahun",
                    "title": "Tahun",
                    width: "100px"
                }, {
                    "field": "keterangan",
                    "title": "Keterangan",
                    width: "200px"
                }, {
                    command: { text: "Delete", click: $scope.removeRiwayatPendidikanFormal },
                    title: "&nbsp;",
                    width: "110px"
                }
            ];
            }, function errorCallBack(err) { });
            ModelItem.getDataDummyGeneric("Sekolah", true).then(function (data) {
                $scope.listSekolah = data;
            })
            

            $scope.addDataRiwayatPendidikanFormal = function () {
                var tempDaftarRiwayat = {
                    "no": $scope.dataRiwayatPendidikanFormal._data.length + 1,
                    "pendidikan": $scope.item.pendidikan,
                    "namaSekolah": $scope.item.namaSekolah,
                    "jurusan": $scope.item.jurusan,
                    "tahun": $scope.item.tahun,
                    "keterangan": $scope.item.keterangan

                }
                $scope.dataRiwayatPendidikanFormal.add(tempDaftarRiwayat);
                $scope.reset();
            }
            $scope.removeRiwayatPendidikanFormal = function (e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                $scope.tempDaftarRiwayat == $scope.dataRiwayatPendidikanFormal
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });
                grid.removeRow(row);
            };

            $scope.reset = function () {
                $scope.item.pendidikan = undefined,
                    $scope.item.namaSekolah = undefined,
                    $scope.item.jurusan = undefined,
                    $scope.item.tahun = undefined,
                    $scope.item.keterangan = undefined
            }



            $scope.Back = function () {
                history.back();
            }
        }
    ]);
});