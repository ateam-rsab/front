define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ListDaftarSuratMasukTujuanCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;
            $scope.redirect = function() {
                //window.location = "#/DistribusiSurat";
                $state.go('DistribusiSurat');
            }
            pencarianData();

            function pencarianData() {
                debugger;
                var ruangan = ModelItem.getPegawai().ruangan;
                var idRuangan = "";
                if (!_.isUndefined(ruangan.id)) {
                    idRuangan = ruangan.id;
                }
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).format('DD-MM-YYYY');
                ManageSarpras.getOrderList("surat-masuk/get-draft-surat-by-ruangan/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + idRuangan, true).then(function(dat) {
                    for (var i = 0; i < dat.data.data.length; i++) {
                        var element = dat.data.data[i];
                        if (!_.isNull(dat.data.data[i].noDokumen)) {
                            element.noDokumen = formatNumber(dat.data.data[i].noDokumen, 10);
                        }

                    }
                    $scope.gridDaftarSurat = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false
                    });
                });
            }

            $scope.cari = function() {
                pencarianData();
            }
            $scope.verbalKonsep = function() {
                $scope.go("VerbalKonsep");
            }
            $scope.colGridDaftarSurat = {
                pageable: true,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                                eq: "Sama dengan",
                                neq: "Mengandung kata"
                        }
                    }
                },
                columns: [{
                    field: "noDokumen",
                    title: "No Draft Surat",
                    width: "10%"
                }, {
                    field: "judulDokumen",
                    title: "Nama Surat",
                    width: "10%",
                    template: "<a href='/surat-masuk/get-draft-surat/${id}'>${judulDokumen}</a>"
                }, {
                    field: "namaRuanganAsal",
                    title: "Ruangan Pengirim",
                    width: "10%"
                }, {
                    field: "namaRuangan",
                    title: "Ruangan Penerima",
                    width: "10%"
                }, {
                    field: "",
                    title: "Status",
                    width: "10%"
                }]
            }

        }
    ])
})