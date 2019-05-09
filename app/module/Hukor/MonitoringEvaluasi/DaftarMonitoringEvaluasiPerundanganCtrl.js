define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarMonitoringEvaluasiPerundanganCtrl', ['$rootScope', '$scope', 'ModelItem',
        'DateHelper', '$document', '$state', 'ManageSarpras',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.item = {};

             $scope.colgridPelaksanaanDiseminasi = {
                columns: [{
                    field: "namaUsulan",
                    title: "Nama Peraturan",
                    width: "30%"
                }, {
                    field: "evaluasi",
                    title: "Evaluasi Peraturan",
                    width: "20%"
                }, {
                    field: "tujuanEvaluasi",
                    title: "Tujuan Evaluasi",
                    width: "2o%"
                }, {
                    field: "nama",
                    title: "Nama Tujuan Evaluasi Peraturan",
                    width: "2o%"
                },  {
                    field: "status",
                    title: "Status",
                    width: "10%"
                }
                ]
            };

            $scope.klik = function (current) {
                var selectedItem = current;
                $scope.noUsulan = selectedItem.noUsulan;
            };

            $scope.detail = function () {
                if ($scope.noUsulan === undefined) {
                    toastr.warning("Pilih data terlebih dahulu..!!");
                    return;
                }
                $state.go('MonitoringEvaluasiPerundanganView', {noUsulan: $scope.noUsulan});
            }

            $scope.rekomendasi = function () {
                if ($scope.noUsulan === undefined) {
                    toastr.warning("Pilih data terlebih dahulu..!!");
                    return;
                }
                $state.go('RekomendasiEvaluasiPerundangan', {noUsulan: $scope.noUsulan});
            }

            $scope.cari = function () {
                getGrid();
            }
            getGrid();
            function getGrid() {
                var awal = moment($scope.item.periodeAwal).format("DD-MM-YYYY");
                var akhir = moment($scope.item.periodeAkhir).add(1, 'day').format("DD-MM-YYYY");
                var url = "monitoring-evaluasi-perundangan/get-by-ruangan-pembuat?ruanganId=" + ModelItem.getPegawai().ruangan.id +"&tglAwal=" + awal + "&tglAkhir=" + akhir;
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


