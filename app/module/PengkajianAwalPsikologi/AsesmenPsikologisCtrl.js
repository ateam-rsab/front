define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AsesmenPsikologisCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function ($rootScope, $scope, ModelItem, $state) {
            $scope.title = "Asesmen Psikologi";

            ModelItem.get("Psikologi").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;

                var items = [];
				if (data.psikologi !== undefined && data.psikologi.asesmenPsikologis !== undefined)
                    items = data.psikologi.asesmenPsikologis;

                $scope.Selanjutnya = function (model) {
                    var asesmenPsikologis = [];
                    for (var i in $scope.DaftarAsesmenPsikologi._data) {
                        var dataItem = $scope.DaftarAsesmenPsikologi._data[i];
                        var temp = {};
                        if (dataItem.asesmenPsikologisDetail !== undefined || dataItem.keterangan !== undefined) {
                            temp = {
                                asesmenPsikologisDetail: { id: dataItem.asesmenPsikologisDetail.id },
                                tglRegistrasi: 1469791366435,
                                pasien: { id: "1631" },
                                keterangan: dataItem.keterangan
                            }
                            asesmenPsikologis.push(temp);

                        }
                    }
                    if ($scope.item.psikologi === undefined)
                        $scope.item.psikologi= {};
                    $scope.item.psikologi.asesmenPsikologis = asesmenPsikologis;
                    $scope.item.state = model;
                    ModelItem.set("Psikologi", $scope.item);
                    $state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.Psikologi.ProfilSensori');
                    console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                };

                $scope.Back = function () {
                    history.back();
                }

                $scope.DaftarAsesmenPsikologi = new kendo.data.DataSource({
                    data: items
                });

                $scope.columnAsesmenPsikologi = [{
                    "field": "no",
                    "title": "No",
                    width: "50px"
                }, {
                        "field": "asesmenPsikologisDetail.name",
                        "title": "Observasi dan Wawancara",
                        width: "200px"
                    }, {
                        "field": "keterangan",
                        "title": "Keterangan",
                        width: "200px"

                    }, {
                        command: { text: "Hapus", click: $scope.removeDaftarAsesmenPsikologi },
                        title: "&nbsp;",
                        width: "110px"
                    }];

            }, function errorCallBack(err) { });

            ModelItem.getDataDummyGeneric("AsesmenPsikologis", false).then(function (data) {
                $scope.listAsesmen = data;
            })



            $scope.tambah = function () {
                var temp = {
                    "no": $scope.DaftarAsesmenPsikologi._data.length + 1,
                    "asesmenPsikologisDetail": $scope.item.observasi,
                    "keterangan": $scope.item.keterangan

                }
                $scope.DaftarAsesmenPsikologi.add(temp);
                $scope.reset();
            }

            $scope.removeDaftarAsesmenPsikologi = function (e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                $scope.temp == $scope.DaftarAsesmenPsikologi
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });
                grid.removeRow(row);
            };

            $scope.reset = function () {
                $scope.item.observasi = undefined,
                    $scope.item.keterangan = undefined
            }
        }
    ]);
});