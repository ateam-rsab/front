define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardRekamMedikCtrl', ['ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'DateHelper',
        function(managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, dateHelper) {
            $scope.i = 2;
            $scope.kelompok = [{
                key: "ruangan.namaRuangan",
                name: "Ruangan"
            }, {
                key: "kelompokPasien",
                name: "Kelompok Pasien"
            }, {
                key: "jenisKelamin",
                name: "Jenis Kelamin"
            }, {
                key: "asalRujukan.asalRujukan",
                name: "Asal Rujukan"
            }, {
                key: "pasien.agama.agama",
                name: "Agama"
            }, {
                key: "pasien.pekerjaan.pekerjaan",
                name: "Pekerjaan"
            }, {
                key: "pasien.pendidikan.namaExternal",
                name: "Pendidikan"
            }, {
                key: "pasien.statusPerkawinan.statusPerkawinan",
                name: "Status Perkawinan"
            }]
            $scope.now = new Date();
            $scope.from = new Date();
            $scope.until = new Date();
            $scope.Column = [{
                field: "noAntrian",
                title: "No.",
                width: 50,
                aggregates: ["count"]
            }, {
                field: "pasien.namaPasien",
                title: "Nama Pasien",
                aggregates: ["count"]
            }, {
                field: "pasien.noCm",
                title: "No. Rekam Medis",
                aggregates: ["count"]
            }, {
                field: "pasien.umur",
                title: "Umur",
                aggregates: ["count"]
            }, {
                hidden: true,
                field: "ruangan.namaRuangan",
                title: "Nama Ruangan",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
            }];
            $scope.group = {
                field: "ruangan.namaRuangan",
                aggregates: [{
                    field: "pasien",
                    aggregate: "count"
                }, {
                    field: "ruangan.namaRuangan",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [{
                field: "pasien",
                aggregate: "count"
            }, {
                field: "ruangan.namaRuangan",
                aggregate: "count"
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

            $scope.findData = function() {
                $scope.isRouteLoading = true;

                if ($scope.noCm === undefined)
                    $scope.noCm = '';
                if ($scope.ruangan === undefined) {
                    if ($scope.kodeRuangan !== undefined)
                        $scope.ruangan = {
                            id: $scope.kodeRuangan
                        };
                    else
                        $scope.ruangan = {};
                }
                if ($scope.ruangan === undefined)
                    return;
                if ($scope.ruangan.id === undefined)
                    $scope.ruangan.id = "";
                findPasien.findQueue($scope.from, $scope.until, $scope.ruangan, $scope.namaPasien).then(function(e) {
                    $scope.isRouteLoading = false;
                    var data = [];
                    for (var key in e.data.data) {
                        if (e.data.data.hasOwnProperty(key)) {
                            var element = e.data.data[key];
                            data.push(element);
                        }
                    }
                    $scope.listPasien = data;
                    $scope.groupItem = $scope.kelompok[0];
                    $scope.patienGrids = new kendo.data.DataSource({
                        data: $scope.listPasien,
                        group: $scope.group
                    });


                    if ($scope.kodeRuangan !== undefined) {
                        $scope.listPasien.then(function(e) {
                            $scope.listPatients = e.data.data;
                            $scope.patienGrids = new kendo.data.DataSource({
                                data: $scope.listPatients,
                                group: $scope.group
                            });

                            var listQueue = _.filter(e.data.data, {
                                "statusAntrian": "MENUNGGU"
                            });
                            $scope.sumMenunggu = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                            $scope.ruanganMenunggu = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;

                            listQueue = _.filter(e.data.data, {
                                "statusAntrian": "DIPANGGIL_SUSTER"
                            });
                            $scope.sumSuster = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                            $scope.ruanganSuster = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;
                            listQueue = _.filter(e.data.data, {
                                "statusAntrian": "DIPANGGIL_DOKTER"
                            });
                            $scope.sumDokter = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                            $scope.ruanganDokter = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;

                            listQueue = _.filter(e.data.data, {
                                "statusAntrian": "SELESAI_DIPERIKSA"
                            });
                            $scope.sumSelesai = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                            $scope.ruanganSelesai = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;
                        });

                    }



                });

            }
            $scope.findData();
        }
    ])
});