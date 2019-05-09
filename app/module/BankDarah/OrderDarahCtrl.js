define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('OrderDarahCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper',
        function(findPasien, ManagePasien, $rootScope, $scope, ModelItem, $state, dateHelper) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.listBentukDarah = ModelItem.kendoHttpSource('/product/find-bentuk-darah', true);
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            ModelItem.getDataDummyGeneric("Rhesus", false).then(function(data) {
                $scope.listRhesus = data;
            });
            ModelItem.getDataDummyGeneric("GolonganDarah", false).then(function(data) {
                $scope.listGolonganDarah = data;
            });

            $scope.Add = function() {
                $scope.dataLabu.add($scope.item);
                $scope.item.noKantung = undefined;
                $scope.item.noSelang = undefined;
                $scope.item.jumlahDarah = undefined;
                $scope.item.golonganDarah = undefined;
                $scope.item.rhesus = undefined;
                $scope.item.bentukDarah = undefined;
            }
            $scope.dataLabu = new kendo.data.DataSource({
                data: []
            });
            $scope.columnPenerimaan = [{
                field: "golonganDarah.golonganDarah",
                title: "Golongan Darah"
            }, {
                field: "rhesus.Rhesus",
                title: "Rehesus"
            }, {
                field: "bentukDarah.namaBentukProduk",
                title: "Bentuk Darah"
            }, {
                field: "jumlahDarah",
                title: "Jumlah"
            }, {
                command: {
                    text: "Hapus",
                    click: $scope.removeRiwayatDiagnosa
                },
                title: "&nbsp;",
                width: "110px"
            }];
            $scope.xxxx = $scope.dataLabu._data[0];
            $scope.removeRiwayatDiagnosa = function(e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.xxx.remove(selectedItem);
            };
            $scope.Save = function() {
                var data = [];
                var tempData = $scope.dataLabu._data;
                for (var key in tempData) {
                    if (tempData.hasOwnProperty(key)) {
                        var element = tempData[key];
                        if (element !== undefined && element.golonganDarah !== undefined)

                            data.push({
                            produk: {
                                golonganDarah: {
                                    id: element.golonganDarah.id
                                },
                                rhesus: {
                                    id: element.rhesus.id
                                },
                                bentukProduk: {
                                    id: element.bentukDarah.id
                                }
                            },
                            qtyProduk: element.jumlahDarah,
                        });
                    }
                }
                debugger;
                if ($state.params.tanggal === undefined) {
                    $scope.tanggal = dateHelper.formatDate($scope.now, "YYYY-MM-DD hh:mm:ss")
                }
                 else {
                    $scope.tanggal = $state.params.tanggal
                 }
                ManagePasien.saveOrderDarah($scope.pasien, $scope.tanggal, ModelItem.beforePost({
                    orderTindakan: data,
                    strukOrder: {
                        tglOrder: $scope.item.tanggalPermintaan,
                        pegawaiOrder: ModelItem.getPegawai(),
                        keteranganOrder: "Permintaan Bang Darah"
                    },
                    ruangan: {
                        id: 41
                    },
                    noRec: $state.params.noRec,
                    tanggalPendaftaran: $scope.now
                }));
            }
        }
    ]);
});