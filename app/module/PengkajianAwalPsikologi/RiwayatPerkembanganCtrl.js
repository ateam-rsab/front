define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RiwayatPerkembanganCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function ($rootScope, $scope, ModelItem, $state) {
            $scope.title = "Riwayat Perkembangan";
            $scope.dataVOloaded = true;

            ModelItem.get("Psikologi").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;

                var items = [];
                if (data.psikologi !== undefined && data.psikologi.riwayatPerkembangan !== undefined)
                    items = data.psikologi.riwayatPerkembangan;


                $scope.Selanjutnya = function (model) {
                    $scope.riwayatPerkembangan = [];
                    for (var i in $scope.dataRiwayatPerkembangan._data) {
                        var dataItem = $scope.dataRiwayatPerkembangan._data[i];
                        var temp = {};
                        if (dataItem.riwayatPerkembangan !== undefined || dataItem.keterangan !== undefined) {
                            temp = {
                                riwayatPerkembanganDetail: { id: dataItem.riwayatPerkembangan.id },
                                tglRegistrasi: 1469791366435,
                                pasien: { id: "1631" },
                                keterangan: dataItem.keterangan
                            }
                            $scope.riwayatPerkembangan.push(temp);

                        }
                    }
                    if ($scope.item.psikologi === undefined)
                        $scope.item.psikologi = {};
                    $scope.item.psikologi.riwayatPerkembangan = $scope.riwayatPerkembangan;
                    $scope.item.state = model;
                    ModelItem.set("Psikologi", $scope.item);
                    $state.go('dashboardpasien.PengkajianMedis.PemeriksaanKhusus.Psikologi.RiwayatPendidikanFormal');
                    //$scope.item.psikologisRiwayat={riwayatPerkembangan:$scope.item.riwayatPerkembangan};
                    console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                };

                 $scope.dataRiwayatPerkembangan = new kendo.data.DataSource({
                        data: items
                    });
                    $scope.columnRiwayatPerkembangan = [{
                        "field": "no",
                        "title": "No",
                        width: "25px"
                    }, {
                            "field": "riwayatPerkembangan.name",
                            "title": "Riwayat Perkembangan",
                            width: "100px"
                        }, {
                            "field": "keterangan",
                            "title": "Keterangan",
                            width: "100px"
                        }, {
                            command: { text: "Delete", click: $scope.removeRiwayatPerkembangan },
                            title: "&nbsp;",
                            width: "110px"
                        }
                    ];
            }, function errorCallBack(err) { });

            ModelItem.getDataDummyGeneric("RiwayatPerkembangan", true).then(function (data) {
                $scope.listRiwayatPerkembangan = data;
            })
            

            $scope.addDataRiwayatPerkembangan = function () {
                var tempDaftarRiwayat = {
                    "no": $scope.dataRiwayatPerkembangan._data.length + 1,
                    "riwayatPerkembangan": $scope.item.riwayatPerkembangan,
                    "keterangan": $scope.item.keterangan

                }
                $scope.dataRiwayatPerkembangan.add(tempDaftarRiwayat);
                $scope.reset();
            }
            $scope.removeRiwayatPerkembangan = function (e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                $scope.tempDaftarRiwayat == $scope.dataRiwayatPerkembangan
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });
                grid.removeRow(row);
            };

            $scope.reset = function () {
                $scope.item.riwayatPerkembangan = undefined,
                    $scope.item.keterangan = undefined
            }



            $scope.Back = function () {
                history.back();
            }

        }
    ]);
});