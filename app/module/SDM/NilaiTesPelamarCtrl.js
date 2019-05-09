define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('NilaiTesPelamarCtrl', ['ManageSdm', '$timeout', '$rootScope', '$scope', 'ModelItem', '$state',
        function(ManageSdm, $timeout, $rootScope, $scope, ModelItem, $state) {
            $scope.now = new Date();
            if ($state.params.noRec !== "") {
                $scope.item = JSON.parse($state.params.noRec);
                $scope.isDisable = true;
            } else {
                $scope.item = {};
            }


            $scope.columnLaporanUjiHasil = [{
                    "field": "no",
                    "title": "No Pendaftaran",
                    "width": "10%"
                },
                {
                    "field": "nama",
                    "title": "Nama",
                    "width": "20%"
                },
                {
                    "field": "satuan",
                    "title": "Universitas",
                    "width": "20%"
                },
                {
                    "field": "hasilUji",
                    "title": "Jurusan",
                    "width": "20%"
                },
                {
                    "field": "hasilUji",
                    "title": "Posisi Yang Dilamar",
                    "width": "20%"
                }
            ];
            $scope.$watch('item.nilaiTertulis', function(e) {
                calculate();
            });
            $scope.$watch('item.nilaiWawancara', function(e) {
                calculate();
            });
            $scope.$watch('item.nilaiPsikotes', function(e) {
                calculate();
            });
            $scope.$watch('item.nilaiKesehatan', function(e) {
                calculate();
            });

            function calculate() {
                var data = parseFloat($scope.item.nilaiTertulis) +
                    parseFloat($scope.item.nilaiWawancara) +
                    parseFloat($scope.item.nilaiPsikotes) +
                    parseFloat($scope.item.nilaiKesehatan);
                $scope.item.test = data / 4 >= 75 ? "Lolos" : "Tidak Lolos";
            }
            $scope.Save = function() {
                $scope.item.picture = $scope.snapshotData;
                $scope.item.hasilTest = $scope.item.test === 'Lolos';
                ManageSdm.saveIsianPelamar($scope.item, "sdm/save-isian-pelamar").then(function(e) {
                    $scope.Back();
                });
                $scope.daftarBahanLinen == new kendo.data.DataSource({
                    data: []
                });
            };

        }
    ]);
});