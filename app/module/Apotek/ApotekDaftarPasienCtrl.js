define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ApotekDaftarPasienCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienApotek', 'DateHelper',

        function($rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienApotek, dateHelper) {
            $scope.now = new Date();
            $rootScope.isOpen = true;

            $scope.refresh = function() {
                findPasienApotek.getListPatient(dateHelper.formatDate($scope.tglAwal, 'DD-MM-YYYY'), dateHelper.formatDate($scope.tglAkhir, 'DD-MM-YYYY'), $scope.noCm).then(function(e) {
                    $scope.listDataPasien =
                        new kendo.data.DataSource({
                            data: e.data.data,
                            group: $scope.group
                        });
                });


            }
            $scope.refresh();
            $scope.notDetail = true;
            if ($state.current.name === 'Apotek.Queue' || $state.current.name === 'Apotek.Sample' || $state.current.name === 'Apotek.Result' || $state.current.name === 'Apotek.Take') {
                $scope.notDetail = false;
            }

            $scope.title = $state.params.title;
            if ($scope.title === undefined)
                $scope.title = "Daftar Pasien Terdaftar";

            $scope.AmbilSpesimen = function() {
                $state.go('DashboardApotekCtrlSpesimen', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                })
            }
            $scope.PemeriksaanPasien = function() {
                $state.go('DashboardApotekCtrlPemeriksaan', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder
                })
            }
            $scope.MasukanHasil = function() {
                $state.go('DashboardApotekCtrlInputHasil', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder
                })
            }
            $scope.PengambilanHasil = function() {
                $state.go('DashboardApotekCtrlAmbilHasil', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder
                })
            }
            $scope.group = {
                field: "statusAntrian",
            };
            $scope.Column = [
                // {
                //     "field": "noAntrian",
                //     "title": "No.",
                //     "width": 50
                // },
                {
                    field: "strukOrder.noOrder",
                    title: ModelItem.translate("No Pemesanan", 1)
                },
                //  {
                //     "field": "noRegistrasi",
                //     "title": "No Registrasi"
                // },
                {
                    "field": "pasien.namaPasien",
                    "title": "Nama Pasien"
                }, {
                    "field": "pasienDaftar.tglRegistrasi",
                    "title": "Tanggal Registrasi",
                    template: "#= new moment(new Date(pasienDaftar.tglRegistrasi)).format('DD-MM-YYYY') #"
                }, {
                    "field": "asalRujukan.asalRujukan",
                    "title": "Asal Rujukan"
                }, {
                    "field": "statusAntrian",
                    "title": "Status"
                }
            ];
        }
    ]);
});