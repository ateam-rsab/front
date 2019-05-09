define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('VerbalKonsepCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
          $scope.idDokumen = $state.params.idDokumen;
          $scope.item = {};


         $scope.onInit = function(){
         debugger
            if ($scope.idDokumen !== "") {
                debugger
                // sementara pake ruangan ini yang d set front end untuk tes 
                $scope.item.getRuangan = {
                    "id":304,
                    "namaRuangan":"Sub Bagian Tata Usaha"   
                }

                // ruangan ini aja klo udah beres tes dan sebarkan disetiap ruangan
                var ruangan = ModelItem.getPegawai().ruangan;
                var idRuangan = "";
                if (!_.isUndefined(ruangan.id)) {
                    idRuangan = ruangan.id;
                }

                //Ambil data Pegawai dari database
                ManageSarpras.getOrderList("surat-masuk/get-draft-surat-by-id-and-ruangan/" + $scope.idDokumen + '/' +
                    $scope.item.getRuangan.id).then(function(data) {
                    debugger;
                    $scope.item = data.data.data;
                    $scope.item.tanggal = moment(new Date(data.data.data.tglDokumen)).format('DD-MM-YYYY');
                    $scope.item.namaSurat = data.data.data.judulDokumen;
                    // if (!_.isNull(data.data.data.noDokumen)) {
                    $scope.item.noDraft = formatNumber(data.data.data.noDokumen, 10);
                    $scope.item.lampiran = data.data.data.lampiranPerihal;
                    //}

                })
                } else {
                    $scope.item = {};
                }
            }
            $scope.onInit();

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
            //Download file format
            $scope.downloadFormat = function() {
                ManageSarpras.downloadFile("surat-masuk/download-dokumen/" + $state.params.idDokumen, true);
            }
            $scope.tutup = function() {
                $state.go('DaftarDraftSuratMasuk');
                //window.location = "#/DaftarDraftSuratMasuk";
            }
            $scope.save = function() {
                debugger;
                var ruangan = ModelItem.getPegawai().ruangan;
                var idRuangan = "";
                if (!_.isUndefined(ruangan.id)) {
                    idRuangan = ruangan.id;
                }
                console.log($scope.item);
                var paramSave = {
                    "idDokumen": $scope.item.id,
                    "idRuangan": idRuangan,
                    "noRec": $scope.item.noRec,
                    "lampiran": $scope.item.lampiran
                }
                console.log(paramSave);
                ManageSarpras.saveSarpras(paramSave, "surat-masuk/save-draft-verbal-konsep").then(function(dat) {
                    console.log(dat);

                });
            }
        }
    ])
})