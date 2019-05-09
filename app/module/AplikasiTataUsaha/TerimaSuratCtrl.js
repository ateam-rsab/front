define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('TerimaSuratCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.item = {};
            $scope.idDocument = $state.params.idDokumen
            if ($state.params.idDokumen !== "") {
                ManageSarpras.getOrderList("surat-masuk/get-surat-masuk-internal-eksternal-by-no-rec/?norec=" + $state.params.idDokumen).then(function(dat) {
                    console.log("data " + dat.data.data);
                    $scope.item.tanggal = new Date(dat.data.data.tglDokumen);
                    $scope.item.namaPengantar = dat.data.data.pegawaiPengantarSuratNamaLengkap;
                    $scope.item.noSurat = dat.data.data.noDokumen;
                    $scope.item.jamDiserahkan = dat.data.data.jamKirim;
                    $scope.item.namaSurat = dat.data.data.namaJudulDokumen;
                    $scope.item.namaPengirim = dat.data.data.pegawaiPengirimNamaLengkap;
                    $scope.item.namaPenerima = ModelItem.getPegawai().namaLengkap;
                    $scope.item.idDok = dat.data.data.id;
                    $scope.item.noRec = dat.data.data.noRec;
                })
            }

            $scope.tutup = function() {
                $state.go('DaftarSuratMasukInternalEksternal');
            }

            $scope.download = function() {
                ManageSarpras.downloadFile("surat-masuk/download-dokumen/" + $scope.item.idDok, true);
            }

            $scope.save = function(current) {
                if ($scope.item.jamDiterima === undefined) {
                    toastr.warning("Jam diterima di isi terlebih dahulu..!!");
                    return;
                }

                var data = {
                    "dokumen": {
                        "id": $scope.item.idDok
                    },
                     "dokumen" : {
                        "id" : $scope.item.idDok
                     },
                    "jamTerima": moment($scope.item.jamDiterima).format('HH:mm'),
                    "pegawaiPengirimSurat": {
                        "id": ModelItem.getPegawai().id
                    },
                    "noRec": $scope.item.noRec

                }

                ManageSarpras.saveSarpras(data, "surat-masuk/save-terima-surat").then(function(dat) {
                });
            };
        }
    ])
})