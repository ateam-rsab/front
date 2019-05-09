define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PelaksanaanDiseminasiCtrl', ['$rootScope', '$scope', 'ModelItem',
        'DateHelper', '$document', '$state', 'ManageSarpras', '$q',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, $state, ManageSarpras, $q) {
            $scope.item = {};

            if ($state.params.idPlanning !== "") {
                $q.all([
                    ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true),
                    ManageSarpras.getOrderList("service/list-generic/?view=StrukPlanning&select=namaplanning,kdruangan.id,kdruangan.namaRuangan&criteria=noplanning&values=" + $state.params.idPlanning, true),
                    ManageSarpras.getOrderList("penyuluhan/get-planning-humas-by-noplanning?noPlanning=" + $state.params.idPlanning, true)
                ]).then(function (data) {
                    $scope.item.noPlanning = $state.params.idPlanning;
                    $scope.item.periodeAwal = new Date(DateHelper.getTanggalFormattedNew(new Date(formatDate(data[2].data.data.data[0].tglPlanning))));
                    $scope.item.periodeAkhir = new Date(DateHelper.getTanggalFormattedNew(new Date(formatDate(data[2].data.data.data[0].tglPlanningAkhir))));
                    $scope.item.periodeAwal2 = new Date(DateHelper.getTanggalFormattedNew(new Date(formatDate(data[2].data.data.data[0].tglPlanning))));
                    $scope.item.periodeAkhir2 = new Date(DateHelper.getTanggalFormattedNew(new Date(formatDate(data[2].data.data.data[0].tglPlanningAkhir))));
                    $scope.listRuangan = data[0].data;
                    $scope.item.judulDiseminasi = data[1].data[0].namaplanning;
                    var ruangan = {
                        'id': data[1].data[0].kdruangan_id,
                        'namaRuangan': data[1].data[0].kdruangan_namaRuangan
                    }
                    $scope.item.ruangan = ruangan;

                });
            }

            function formatDate(tanggal) {
                var res = tanggal.split("-");
                return res[1] + "-" + res[0] + "-" + res[2];
            }

            $scope.redirect = function () {
                window.location = "#/DaftarPelaksanaanDiseminasi";
            }

            $scope.save = function () {
                var data = {
                    "tglPlanningExecAwal": $scope.item.periodeAwal2,
                    "tglPlanningExecAkhir": $scope.item.periodeAkhir2,
                    "noPlanning": $scope.item.noPlanning,
                    "ruanganExec": $scope.item.ruangan
                }
                console.log(JSON.stringify(data));
                ManageSarpras.saveSarpras(data, "penyuluhan/save-pelaksanaan-penyuluhan").then(function (e) {
                    window.location = "#/DaftarPelaksanaanDiseminasi";
                });
            }
        }
    ]);
});