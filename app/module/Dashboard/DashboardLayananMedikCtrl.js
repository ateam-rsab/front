define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardLayananMedikCtrl', ['ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'DateHelper',
        function(managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, dateHelper) {
            $scope.i = 2;
            $scope.now = new Date();
            $scope.kelompok = [{
                key: "tglPelayanan",
                name: "Tanggal Pelayanan"
            }, {
                key: "pelayananPasien.produk.namaProduk",
                name: "Nama Tindakan"
            }]

            $scope.$watch('groupItem', function(e) {
                if (e === undefined) return;
                var groupItem = _.groupBy($scope.listPasien, function(i) {
                    var sub = i;
                    var arr = e.key.split('.');
                    for (var key in arr) {
                        if (arr.hasOwnProperty(key)) {
                            var element = arr[key];
                            sub = sub[element];
                        }
                    }
                    return sub;
                })
                var hasilGroup = [];
                for (var key in groupItem) {
                    if (groupItem.hasOwnProperty(key)) {
                        var element = groupItem[key];
                        hasilGroup.push({
                            category: key,
                            value: element.length
                        })
                    }
                }
                $("#chart").kendoChart({
                    title: {
                        text: "Pengelompokan " + e.name
                    },
                    legend: {
                        position: "top"
                    },
                    seriesDefaults: {
                        labels: {
                            template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                            position: "outsideEnd",
                            visible: true,
                            background: "transparent"
                        }
                    },
                    series: [{
                        type: "pie",
                        data: hasilGroup
                    }],
                    tooltip: {
                        visible: true,
                        template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                    }
                });
            });
            $scope.Column = [{
                field: "pelayananPasien.tglPelayanan",
                title: "Tanggal Pelayanan",
                template: "#= new moment(new Date(pelayananPasien.tglPelayanan)).format('DD-MM-YYYY hh:mm:ss') #"
            }, {
                field: "pelayananPasien.produk.namaProduk",
                title: "Nama Tindakan",
            }];
            findPasien.findDetailPelayananByPegawai($state.params.noRecRegistrasi).then(function(e) {
                var data = e.data.data.orders;

                data = ModelItem.beforePost(data, true);
                $scope.listPasien = [];
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var element = data[key];
                        element.tglPelayanan = new moment(new Date(element.pelayananPasien.tglPelayanan)).format('DD-MM-YYYY hh:mm:ss')
                        $scope.listPasien.push(element);
                    }
                }
                $scope.patienGrids = new kendo.data.DataSource({
                    data: $scope.listPasien,
                });
            });
        }
    ])
});