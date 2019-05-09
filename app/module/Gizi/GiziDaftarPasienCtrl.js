define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('GiziDaftarPasienCtrl', ['CacheHelper', 'ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'DateHelper',

        function(cacheHelper, managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, dateHelper) {
            $scope.now = new Date();
            $rootScope.isOpen = true;
            $scope.tglAwal = new Date();
            $scope.tglAkhir = new Date();
            $scope.selected = function(data) {
                debugger;
                $scope.item = data;
            }
            $scope.noCm = "";
            $scope.listPasien = cacheHelper.get('listGizi');
            // if (cacheHelper.get('tglAwalGizi') !== undefined)
            $scope.tglAwal = new Date($scope.tglAwal.getFullYear(), $scope.tglAwal.getMonth(), $scope.tglAwal.getDate(), 0, 0, 0);
            // if (cacheHelper.get('tglAkhirGizi') !== undefined)
            //     $scope.tglAkhir = cacheHelper.get('tglAkhirGizi');
            $scope.refresh = function() {
                cacheHelper.set('tglAwalGizi', $scope.tglAwal);
                cacheHelper.set('tglAkhirGizi', $scope.tglAkhir);
                findPasien.getListPatientGizi(dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD HH:mm:00'), dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD HH:mm:59'), $scope.noCm).then(function(e) {
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

                    for (var key in e.data.data) {
                        if (e.data.data.hasOwnProperty(key)) {
                            var element = e.data.data[key];
                            if (element.statusAntrian === 'MENUNGGU') {
                                element.myStyle = { 'background-color': '#FFFC38' };
                                element.statusAntrian = "Menunggu";
                            } else if (element.statusAntrian === 'DIPANGGIL_SUSTER') {
                                element.myStyle = { 'background-color': '#33e46a' };
                                element.statusAntrian = "Kirim Sebagian Menu";
                            } else if (element.statusAntrian === 'DIPANGGIL_DOKTER') {
                                element.myStyle = { 'background-color': '#89c9f7' };
                                element.statusAntrian = "Kirim Semua Menu";
                            }
                            // else if (element.statusAntrian === 'SELESAI_HASIL')
                            //     element.statusAntrian = "Persiapan";
                            else if (element.statusAntrian === 'PERSIAPAN') {
                                element.myStyle = { 'background-color': '#FF8DFC' }
                                element.statusAntrian = "Menunggu Periksa";
                            } else if (element.statusAntrian === 'PERIKSA') {
                                element.myStyle = { 'background-color': '#1da214' };
                                element.statusAntrian = "Selesai Periksa";
                            } else if (element.statusAntrian === 'SAMPLE_DI_TERIMA') {
                                element.myStyle = { 'background-color': '#FF3BAD' };
                                element.statusAntrian = "Sample di Terima";
                            } else if (element.statusAntrian === 'SAMPLE_DI_AMBIL') {
                                element.myStyle = { 'background-color': '#FF7E3B' };
                                element.statusAntrian = "Sample di Ambil";
                            } else if (element.statusAntrian === 'VALIDASI_ANALIS') {
                                element.myStyle = { 'background-color': '#f6a8ff' };
                                element.statusAntrian = "Release Analis";
                            } else if (element.statusAntrian === 'VALIDASI') {
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
                    $scope.listDataPasien.fetch(function(e) {
                        var temp = [];
                        for (var key in this._data) {
                            if (this._data.hasOwnProperty(key)) {
                                var element = this._data[key];

                                if (angular.isFunction(element) === false && key !== "_events" && key !== "length")
                                    temp.push(element);
                            }
                        }
                        $scope.listPasien = temp;
                        cacheHelper.set('listGizi', temp);
                    });
                });


            }
            socket.on('DaftarAntrianGizi', function(data) {
                $scope.refresh();
            });
            $scope.refresh();
            $scope.notDetail = true;
            if ($state.current.name === 'Gizi.Queue' || $state.current.name === 'Gizi.Sample' || $state.current.name === 'Radiologi.Result' || $state.current.name === 'Gizi.Take') {
                $scope.notDetail = false;
            }

            $scope.title = $state.params.title;
            if ($scope.title === undefined)
                $scope.title = "Daftar Pasien Terdaftar";

            $scope.group = {
                field: "statusAntrian",
            };
            $scope.CetakBarcode = function() {
                $scope.noOrder = "";
                for (var key in $scope.listPasien) {
                    if ($scope.listPasien.hasOwnProperty(key)) {
                        var element = $scope.listPasien[key];
                        if (element.isChecked === true) {
                            $scope.noOrder += "," + element.strukOrder.noOrder;
                        }
                    }
                }
                $state.go('KirimMenuCetakCtrl', {
                    noKirimOrder: $scope.noOrder
                })
            }
            $scope.kirimMenu = function() {
                $scope.noOrder = "";
                for (var key in $scope.listPasien) {
                    if ($scope.listPasien.hasOwnProperty(key)) {
                        var element = $scope.listPasien[key];
                        if (element.isChecked === true) {
                            $scope.noOrder += "," + element.strukOrder.noOrder;
                        }
                    }
                }
                $state.go('KirimMenuCtrl', {
                    noKirimOrder: $scope.noOrder
                })
            }
            $scope.ProdukFormula = function() {
                findPasien.getOrderGizi().then(function(e) {
                    cacheHelper.set('bahanDiet', e.data.data);
                    $state.go('PemesananBahan', {
                        noKirimOrder: $scope.noOrder

                    })
                });


            }
            $scope.Produksi = function() {
                $scope.noOrder = "";
                for (var key in $scope.listPasien) {
                    if ($scope.listPasien.hasOwnProperty(key)) {
                        var element = $scope.listPasien[key];
                        if (element.isChecked === true) {
                            $scope.noOrder += "," + element.strukOrder.noOrder;
                        }
                    }
                }
                debugger;
                $state.go('Produksi', {
                    noKirimOrder: $scope.noOrder

                })

            }
            $scope.Column = [{
                    "field": "pasien.namaPasien",
                    "title": "Nama Pasien"
                }, {
                    "field": "pasienDaftar.tglRegistrasi",
                    "title": "Tanggal Registrasi",
                    template: "#= new moment(new Date(pasienDaftar.tglRegistrasi)).format('DD-MM-YYYY') #"
                }, {
                    "field": "asalRujukan.asalRujukan",
                    "title": "Asal Pasien"
                }, {
                    "field": "statusAntrian",
                    "title": "Status"
                }, {
                    "field": "pasienDaftar.ruangan.namaRuangan",
                    "title": "Asal Ruangan"
                }, {
                    "field": "strukOrder.pegawaiOrder.namaExternal",
                    "title": "Dokter"
                }


            ];
        }
    ]);
});