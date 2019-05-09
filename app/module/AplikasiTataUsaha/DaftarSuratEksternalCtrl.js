define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarSuratEksternalCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.now = new Date();
            $scope.item = {};
            pencarianData();
            $scope.item.tanggalAwal = new Date();
            $scope.item.tanggalAkhir = new Date();

            $scope.cari = function() {
                pencarianData();
            }

            function pencarianData() {
                debugger;
                var ruangan = ModelItem.getPegawai().ruangan;
                var idRuangan = "";
                if (!_.isUndefined(ruangan.id)) {
                    idRuangan = ruangan.id;
                }
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).add(1, 'day').format('DD-MM-YYYY');
                ManageSarpras.getOrderList("surat-masuk/get-daftar-surat-masuk-ke-eksternal/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + idRuangan, true).then(function(dat) {

                /*for (var i = 0; i < dat.data.data.length; i++) {
                        var element = dat.data.data[i];
                        // element.noDokumen = formatNumber(dat.data.data[i].noDokumen, 10);

                        for (var x = 0; x < dat.data.data[i].ruangans.length; x++) {
                            if (_.isUndefined(element.ruanganTujuan)) {
                                element.ruanganTujuan = dat.data.data[i].ruangans[x].namaRuangan;
                            } else {
                                element.ruanganTujuan += ' , ' + dat.data.data[i].ruangans[x].namaRuangan;
                            }
                        }

                    }*/


                    $scope.dataSource = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false
                    });

                    $scope.detailGridOptions = function(dataItem) {

                        return {
                            dataSource: new kendo.data.DataSource({
                                data: dataItem.ruangans
                            }),
                            columns: [{
                                field: "namaRuangan",
                                title: "<h3 align=center>Nama Ruangan<h3>"
                            }, {
                                field: "status",
                                title: "<h3 align=center>Status<h3>"
                            }]
                        };

                    };
                });
            }

            $scope.colGridDaftarSurat = {
                pageable: true,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            eq: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                columns: [{
                    field: "noDokumen",
                    title: "<h3 align=center>No Surat<h3>",
                    width: "10%"
                }, {
                    field: "",
                    title: "<h3 align=center>Nama Surat<h3>",
                    width: "15%"
                }, {
                    field: "ruanganAsal",
                    title: "<h3 align=center>Ruangan Pengirim<h3>",
                    width: "15%"
                }, {
                    field: "tujuanSurat",
                    title: "<h3 align=center>Tujuan Surat<h3>",
                    width: "15%"
                }, {
                    field: "namaMetodeKirim",
                    title: "<h3 align=center>Metode Kirim<h3>",
                    width: "10%"
                }, {
                    field: "pembuatSurat",
                    title: "<h3 align=center>Petugas Kirim<h3>",
                    width: "15%"
                }, {
                    field: "status",
                    title: "<h3 align=center>Status<h3>",
                    width: "10%"
                }]
            }

            $scope.gridDaftarSurat = new kendo.data.DataSource({
                data: []
            });

        }
    ])
})