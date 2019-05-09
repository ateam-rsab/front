define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarUsulanEvaluasiDanKajianOrganisasiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state', 'ManageSarpras',
        function ($rootScope, $scope, ModelItem, DateHelper, $state, ManageSarpras) {

            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true;

            $scope.cari = function () {
                var awal = moment($scope.item.periodeAwal).format("DD-MM-YYYY");
                var akhir = moment($scope.item.periodeAkhir).add(1, 'day').format("DD-MM-YYYY");
                var url = "usulan-evaluasi/get-list-evaluasi-by-ruangan-pembuat?ruanganId=" +
                    ModelItem.getPegawai().ruangan.id + "&tglAwal=" + awal + "&tglAkhir=" + akhir;
                if ($scope.item.noUsulan !== undefined) {
                    url += "&noUsulan=" + $scope.item.item.noUsulan;
                }
                ManageSarpras.getOrderList(url).then(function (dat) {
                    $scope.daftarEvaluasi = new kendo.data.DataSource({
                        data: dat.data.data
                    });
                });
            }
            $scope.cari();

            $scope.columnEvaluasi = {
                columns: [
                    {
                        "field": "noUsulan",
                        "title": "No Usulan",
                        "width": "100%"
                    }
                ]
            };

            $scope.detailGridOptions = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.komponen
                    }),
                    columns: [
                        {
                            field: "komponenEvaluasi",
                            title: "Komponen Evaluasi",
                            width: "25%"
                        }, {
                            field: "namaRuangan",
                            title: "Ruangan Tujuan",
                            width: "25%"
                        }, {
                            field: "namaLengkap",
                            title: "Nama Penerima",
                            width: "25%"
                        }, {
                            field: "status",
                            title: "status",
                            width: "25%"
                        }]
                };

            };
            $scope.klik = function (current) {
                var data = current;
                $scope.noUsulan = data.noUsulan;
            }

            $scope.detailUsulan = function () {
                if ($scope.noUsulan === undefined) {
                    toastr.warning("Pilih data terlebih dahulu..");
                    return;
                }
                $state.go('UsulanEvaluasiDanKajianOrganisasiView', {noUsulan: $scope.noUsulan});
            }
            $scope.rekomendasi = function () {
                if ($scope.noUsulan === undefined) {
                    toastr.warning("Pilih data terlebih dahulu..");
                    return;
                }
                $state.go('RekomendasiUsulanEvaluasi', {noUsulan: $scope.noUsulan});
            }
        }
    ]);
});