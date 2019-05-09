define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RadiologiDaftarHistoryPasienCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienRadiologi', 'DateHelper',

        function($rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienRadiologi, dateHelper) {
            $scope.now = new Date();
            $scope.namaPasienDevice = "";
            $scope.selected = {};
            $scope.selectedData = function(data) {

                $scope.selected = data;
            };
            $scope.mapping = function() {
                findPasienRadiologi.saveMapping($scope.selected.StudyInstanceUID, $scope.selected.NoMr, $scope.item.noRec).then(function() {
                    window.messageContainer.log('Data Berhasil di Mapping');
                });
            };
            //$scope.listDataPasien = findPasienRadiologi.getListPatient(dateHelper.formatDate($scope.tglAwal, 'DD-MM-YYYY'), dateHelper.formatDate($scope.tglAkhir, 'DD-MM-YYYY'), $scope.noCm);
            $scope.refresh = function() {
                findPasienRadiologi.getHistoryPatient($state.params.noRec).then(function(e) {
                    var data = [];
                    for (var key in e.data.data) {
                        if (e.data.data.hasOwnProperty(key)) {
                            var element = e.data.data[key];
                            if (element.strukOrder.pegawaiOrder === undefined)
                                element.strukOrder.pegawaiOrder = {
                                    namaExternal: 'Belum ada dokter'
                                }
                        }
                    }

                    for (var key in e.data) {
                        if (e.data.hasOwnProperty(key)) {
                            var element = e.data[key];
                            if (element.statusAntrian === "0") {
                                element.myStyle = { 'background-color': '#FFFC38' };
                                element.statusAntrian = "Menunggu";
                            } else if (element.statusAntrian === "1") {
                                element.myStyle = { 'background-color': '#33e46a' };
                                element.statusAntrian = "Check in";
                            } else if (element.statusAntrian === "6") {
                                element.myStyle = { 'background-color': '#89c9f7' };
                                element.statusAntrian = "Hasil di Ambil";
                            }
                            // else if (element.statusAntrian === 'SELESAI_HASIL')
                            //     element.statusAntrian = "Persiapan";
                            else if (element.statusAntrian === "4") {
                                element.myStyle = { 'background-color': '#FF8DFC' }
                                element.statusAntrian = "Menunggu Periksa";
                            } else if (element.statusAntrian === "5") {
                                element.myStyle = { 'background-color': '#1da214' };
                                element.statusAntrian = "Selesai Periksa";
                            } else if (element.statusAntrian === "10") {
                                element.myStyle = { 'background-color': '#FF3BAD' };
                                element.statusAntrian = "Sample di Terima";
                            } else if (element.statusAntrian === "9") {
                                element.myStyle = { 'background-color': '#FF7E3B' };
                                element.statusAntrian = "Sample di Ambil";
                            } else if (element.statusAntrian === "14") {
                                element.myStyle = { 'background-color': '#f6a8ff' };
                                element.statusAntrian = "Release Analis";
                            } else if (element.statusAntrian === "3") {
                                element.myStyle = { 'background-color': '#f6a8ff' };
                                element.statusAntrian = "Release Dokter";
                            }



                            //
                            //
                            //
                            data.push(element);
                        }
                    }
                    data = _.sortBy(data, function(e) {
                        if (e.strukOrder.noOrderIntern == undefined)
                            return 100000;
                        return -1 * parseInt(e.strukOrder.noOrderIntern.substring(1));
                    });
                    $scope.listDataPasien =
                        new kendo.data.DataSource({
                            data: data
                        });
                });

            }
            $scope.loadPacs = true;
            $scope.findDataPacs = function() {
                $scope.loadPacs = false;
                findPasienRadiologi.findPasienDevice($scope.namaPasienDevice).then(function(e) {
                    var data = e.data;
                    $scope.loadPacs = true;
                    $scope.listPacs = data;
                });
            }
            $scope.Mapping = function() {
                $state.go('RadiologiPasienMapping');
            }
            $scope.refresh();
            $scope.notDetail = true;
            $scope.title = $state.params.title;

            if ($state.current.name === 'Radiologi.Queue' || $state.current.name === 'Radiologi.Sample' || $state.current.name === 'Radiologi.Result' || $state.current.name === 'Radiologi.Take') {
                $scope.notDetail = false;
            }
            if ($scope.title === undefined)
                $scope.title = "Daftar pasien";
            $scope.AmbilSpesimen = function() {
                $state.go('DashboardRadiologiCtrlSpesimen', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec
                })
            }
            $scope.PemeriksaanPasien = function() {

                $state.go('DashboardRadiologiCtrlPemeriksaan', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec
                })
            }
            $scope.MasukanHasil = function() {
                if ($scope.item.statusAntrian === 'Release Dokter') {
                    $state.go('DashboardRadiologiCtrlLihatHasil', {
                        noRegistrasi: $scope.item.pasienDaftar.noRec,
                        noOrder: $scope.item.strukOrder.noOrder,
                        noAntrianPasien: $scope.item.noRec
                    })
                } else {
                    window.messageContainer.log('Belum ada hasil')
                }

            }
            $scope.PengambilanHasil = function() {
                $state.go('DashboardRadiologiCtrlAmbilHasil', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec
                })
            }
            $scope.Column = [{
                field: "strukOrder.noOrderIntern",
                title: ModelItem.translate("No Pemesanan", 1)
            }, {
                "field": "pasienDaftar.pasien.namaPasien",
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
            }];
        }
    ]);
});