define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DokumenVerbalKonsepCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.now = new Date();
            if ($state.params.idDokumen !== "") {
                //Ambil data Pegawai dari database
                var nomor = 1;
                ManageSarpras.getOrderList("surat-masuk/get-verbal-konsep-by-id-dokumen/" + $state.params.idDokumen).then(function(data) {
                    $scope.item = data.data.data;
                    $scope.item.tanggal = moment(data.data.data.tglDokumen).format('DD-MM-YYYY');
                    $scope.item.namaSurat = data.data.data.judulDokumen;
                    $scope.item.noDraft = formatNumber(data.data.data.noDokumen, 10); //moment(data.data.data.tglLahir).format('DD-MM-YYYY');
                    $scope.Haidude = data.data.data.verbalKonseps;
                    for(var i=0; i<$scope.Haidude.length; i++){
                        $scope.Haidude[i].no = nomor++;
                    }
                    $scope.gridVerbalKonsep = new kendo.data.DataSource({
                        data: $scope.Haidude,
                        pageSize: 10,
                        total: data.data.data.verbalKonseps.length,
                        serverPaging: false
                    });
                })
            } else {
                $scope.item = {};

            }
            //Download file format
            $scope.downloadFormat = function() {
                ManageSarpras.downloadFile("surat-masuk/download-dokumen/" + $scope.item.id, true);
            }


            $scope.colGridVerbalKonsep = {
                columns: [
                  { field: "no", title: "<h3 align=center>No<h3>", width:"15px" }, 
                  { field: "namaRuangan", title: "<h3 align=center>Ruangan Tujuan<h3>",width:"120px" },
                  { field: "lampiranPerihal", title: "<h3 align=center>Lembar Catatan<h3>",width:"200px" } 
                ]
            }


            $scope.tutup = function() {
                $state.go("DaftarDraft");
            }

            function formatNumber(angka, panjang) {
                if (angka == null) {
                    return "";
                }
                if (panjang < 1) {                    return angka;
                }
                var nol = "";
                var finalLength = panjang - angka.length;
                for (var i = 0; i < finalLength; i++) {
                    nol += "0";
                }
                return nol + angka;
            }
        }
    ])
})