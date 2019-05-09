define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPasienRuanganBPJSCtrl', ['socket', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien',
        function(socket, $rootScope, $scope, ModelItem, $state, findPasien) {
            $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            //list data pekerjaan
            var arrFieldSelectVoPekerjaan = ['id', 'pekerjaan'];
            $scope.Column = [{
                field: "pasienDaftar.noRegistrasi",
                title: "No. Registrasi",
                width: 240
            }, {
                field: "pasien.noCm",
                title: "No. Rekam Medik",
                width: 240
            }, {
                field: "pasien.namaPasien",
                title: "Nama Pasien",
                width: 240
            }, {
                field: "ruangan.namaRuangan",
                title: "Ruangan Tujuan",
                width: 240
            }, ];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
            $scope.item = {};
            $scope.now = new Date();
            $scope.from = new Date();
            $scope.until = new Date();
            $rootScope.doneLoad = false;
            $scope.dataVOloaded = true;
            $scope.ruangan = {
                id: 1
            };
            // $scope.$watch('from', function(e) {
            //     if (e === undefined) return;
            //     $scope.findData();
            // });
            // $scope.$watch('until', function(e) {
            //     if (e === undefined) return;
            //     $scope.findData();
            // });

            socket.on('DaftarAntrian', function(data) {
                $scope.findData();
            });
            $scope.findData = function() {
                $rootScope.doneLoad = true;
                findPasien.findReconfirmBpjs($scope.from, $scope.until).then(function(e) {
                    $scope.listPasien = e.data.data;
                    $rootScope.doneLoad = false;
                });
            }
            $scope.findData();
            $scope.Reconfirm = function() {
                $state.go('detailAsuransi.dataAsuransi', {
                    noRegister: $scope.item.noRec
                });
            }
        }
    ]);
});