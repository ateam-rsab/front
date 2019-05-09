define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PengalamanOrganisasiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state',
        function ($rootScope, $scope, ModelItem, DateHelper, $state) {
            $scope.now = new Date();
            ModelItem.get("Psikologi").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
                var items = [];
                if (data.psikologi !== undefined && data.psikologi.pengalamanOrganisasi !== undefined)
                    items = data.psikologi.pengalamanOrganisasi;

                $scope.Selanjutnya = function (model) {
                    var pengalamanOrganisasi = [];
                    for (var i in $scope.dataPengalamanOrganisasi._data) {
                        var temp = {};
                        var dataItem = $scope.dataPengalamanOrganisasi._data[i];
                        if (dataItem.namaOrganisasi !== undefined || dataItem.jabatan !== undefined || dataItem.tahun !== undefined || dataItem.keterangan !== undefined) {
                            temp = {
                                tahun: dataItem.tahun,
                                namaOrganisasi: dataItem.namaOrganisasi,
                                jabatan: dataItem.jabatan,
                                keterangan: dataItem.keterangan,
                                tglRegistrasi: 1469791366435,
                                pasien: { id: "1631" }
                            }
                            pengalamanOrganisasi.push(temp);
                        }
                    }
                    if ($scope.item.psikologi === undefined)
                        $scope.item.psikologi = {};
                    $scope.item.psikologi.pengalamanOrganisasi = pengalamanOrganisasi;
                    $state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.Psikologi.AsesmenPsikologis');
                    console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                };
                $scope.Back = function () {
                    history.back();
                }

                $scope.dataPengalamanOrganisasi = new kendo.data.DataSource({
                    data: items
                });
                $scope.columnPengalamanOrganisasi = [{
                    "field": "no",
                    "title": "No. Urut",
                    width: "75px"
                },
                    {
                        "field": "tahun",
                        "title": "Tahun",
                        width: "150px"
                    }, {
                        "field": "namaOrganisasi",
                        "title": "Nama dan Jenis Organisasi",
                        width: "200px"
                    }, {
                        "field": "jabatan",
                        "title": "Jabatan",
                        width: "200px"
                    }, {
                        "field": "keterangan",
                        "title": "Keterangan",
                        width: "200px"
                    }, {
                        command: { text: "Delete", click: $scope.removePengalamanOrganisasi },
                        title: "&nbsp;",
                        width: "110px"
                    }
                ];

            }, function errorCallBack(err) { });




            $scope.addDataPengalamanOrganisasi = function () {
                var temp = {
                    "no": $scope.dataPengalamanOrganisasi._data.length + 1,
                    "tahun": $scope.item.tahun,
                    "namaOrganisasi": $scope.item.namaOrganisasi,
                    "jabatan": $scope.item.jabatan,
                    "keterangan": $scope.item.keterangan,
                }
                $scope.dataPengalamanOrganisasi.add(temp);
                $scope.reset();
            }
            $scope.removePengalamanOrganisasi = function (e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                $scope.temp == $scope.dataPengalamanOrganisasi
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });
                grid.removeRow(row);
            };

            $scope.reset = function () {
                $scope.item.JenisKursus = undefined,
                    $scope.item.tahun = undefined,
                    $scope.item.keterangan = undefined,
                    $scope.item.namaOrganisasi= undefined,
                    $scope.item.jabatan = undefined
            }


        }
    ]);
});