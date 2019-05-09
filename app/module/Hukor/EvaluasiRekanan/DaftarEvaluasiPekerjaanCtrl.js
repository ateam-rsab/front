define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarEvaluasiPekerjaanCtrl', ['$rootScope', '$scope', 'ModelItem',
        'DateHelper', '$document', '$state', 'ManageSarpras',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.item = {};

            $scope.colgridPelaksanaanDiseminasi = {
                columns: [{
                    field: "noUsulan",
                    title: "No. Evaluasi",
                    width: "10%"
                }, {
                    field: "namaRekanan",
                    title: "Rekanan",
                    width: "20%"
                }, {
                    field: "tglUsulan",
                    title: "Tanggal Evaluasi",
                    width: "20%"
                }
                ]
            };


            $scope.detailGridOptions = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.komponen
                    }),
                    columns: [{
                        field: "namaRuangan",
                        title: "Nama Ruangan",
                        width: "25%"
                    }, {
                        field: "komponenEvaluasi",
                        title: "Komponen Evaluasi",
                        width: "25%"
                    }, {
                        field: "hasilEvaluasi",
                        title: "hasilEvaluasi",
                        width: "25%"
                    }, {
                        field: "rekomendasi",
                        title: "rekomendasi",
                        width: "25%"
                    }]
                };

            };

            $scope.klik = function (current) {
                var selectedItem = current;
                $scope.noEvaluasi = selectedItem.noUsulan;
            };

            $scope.input = function () {
                if ($scope.noEvaluasi === undefined) {
                    toastr.warning("Pilih data terlebih dahulu..!!");
                    return;
                }
                $state.go('InputRekomendasi', {noEvaluasi: $scope.noEvaluasi});
            }

            $scope.cari = function () {
                getGrid();
            }
            getGrid();
            function getGrid() {
                var awal = moment($scope.item.periodeAwal).format("DD-MM-YYYY");
                var akhir = moment($scope.item.periodeAkhir).format("DD-MM-YYYY");
                var datas = akhir.split("-");
                akhir = (parseInt(datas[0], 10) + 1) + "-" + datas[1] + "-" + datas[2];
                var url = "evaluasi-rekanan/get-list-evaluasi-by-ruangan-pembuat?ruanganId=" + ModelItem.getPegawai().ruangan.id + "&tglAwal=" + awal + "&tglAkhir=" + akhir;
                if ($scope.item.noEvaluasi !== undefined) {
                    url += "&noUsulan=" + $scope.item.noEvaluasi;
                }
                console.log(url);
                ManageSarpras.getOrderList(url).then(function (dat) {
                    $scope.dataSource = new kendo.data.DataSource({
                        data: dat.data.data
                    });
                });
            }
        }
    ]);
});


