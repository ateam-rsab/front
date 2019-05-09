define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KirimDraftCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.now = new Date();
            if ($state.params.idDokumen !== "") {
                //Ambil data Pegawai dari database
                ManageSarpras.getOrderList("surat-masuk/get-draft-surat-by-id/" + $state.params.idDokumen).then(function(data) {
                    $scope.item = data.data.data;
                    $scope.item.tanggal = new Date(data.data.data.tglDokumen);
                    $scope.item.namaSurat = data.data.data.judulDokumen;
                    if (!_.isNull(data.data.data.noDokumen)) {
                        $scope.item.noDraft = formatNumber(data.data.data.noDokumen, 10);
                    }
                    //moment(data.data.data.tglLahir).format('DD-MM-YYYY');
                    $scope.item.ruanganTujuan = data.data.data.ruangans;
                })
            } else {
                $scope.item = {};
                $scope.item.ruanganTujuan = [];
            }
            ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true).then(function(dat) {
                $scope.ListRuangan = dat.data;
                $scope.dataVOloaded = true;
            });



            function formatNumber(angka, panjang) {
                if (angka == null) {
                    return "";
                }
                if (panjang < 1) {
                    return angka;
                }
                var nol = "";
                var finalLength = panjang - angka.length;
                for (var i = 0; i < finalLength; i++) {
                    nol += "0";
                }
                return nol + angka;
            }
            $("#multiSelect").kendoMultiSelect({
                placeholder: "Select...",
                dataTextField: "namaRuangan",
                dataValueField: "id",
                dataSource: $scope.ListRuangan
            });
            $scope.redirect = function() {
                window.location = "#/DaftarDraft";
            }

            $scope.kirim = function() {

                var paramSave = {
                    "dokumen": { "id": $scope.item.id },
                    "ruangans": $scope.item.ruanganTujuan
                }
                console.log(paramSave);
                ManageSarpras.saveSarpras(paramSave, "surat-masuk/save-kirim-draft-surat").then(function(dat) {
                    console.log(dat);

                });
            }


        }
    ])
})