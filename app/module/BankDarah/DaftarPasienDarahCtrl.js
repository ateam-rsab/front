define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPasienDarahCtrl', ['ReportHelper', 'CacheHelper', 'ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper',

        function(reportHelper, cacheHelper, managePasien, socket, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper) {
            $scope.now = new Date();
            $rootScope.isOpen = true;
            $scope.tglAwal = new Date();
            $scope.tglAkhir = new Date();
            $scope.selected = function(data) {
                $scope.item = data;
            }
            $scope.listPasien = cacheHelper.get('listBankDarah');
            // if (cacheHelper.get('tglAwalBankDarah') !== undefined)
            $scope.tglAwal = new Date($scope.tglAwal.getFullYear(), $scope.tglAwal.getMonth(), $scope.tglAwal.getDate(), 0, 0, 0);
            // if (cacheHelper.get('tglAkhirBankDarah') !== undefined)
            //     $scope.tglAkhir = cacheHelper.get('tglAkhirBankDarah');
            $scope.refresh = function() {
                cacheHelper.set('tglAwalBankDarah', $scope.tglAwal);
                cacheHelper.set('tglAkhirBankDarah', $scope.tglAkhir);
                findPasien.getListPatientDarah(dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD HH:mm:00'), dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD HH:mm:59'), $scope.noCm).then(function(e) {
                    var data = [];
                    for (var key in e.data.data) {
                        if (e.data.data.hasOwnProperty(key)) {
                            var element = e.data.data[key];
                            if (element.strukOrder !== undefined)
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
                                element.statusAntrian = "Check in";
                            } else if (element.statusAntrian === 'HASIL') {
                                element.myStyle = { 'background-color': '#89c9f7' };
                                element.statusAntrian = "Hasil di Ambil";
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
                                element.statusAntrian = "Selesai";
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
                        cacheHelper.set('listBankDarah', temp);
                    });
                });


            }
            socket.on('DaftarAntrianBankDarah', function(data) {
                $scope.refresh();
            });
            $scope.refresh();
            $scope.notDetail = true;
            if ($state.current.name === 'BankDarah.Queue' || $state.current.name === 'BankDarah.Sample' || $state.current.name === 'Radiologi.Result' || $state.current.name === 'BankDarah.Take') {
                $scope.notDetail = false;
            }

            $scope.title = $state.params.title;
            if ($scope.title === undefined)
                $scope.title = "Daftar Pasien Terdaftar";
            $scope.verifikasi = function() {


            }
            $scope.CetakBarcode = function() {
                if($scope.item != undefined){
                    var fixUrlLaporan = reportHelper.open("lapBankDarah?noOrder="+ $scope.item.strukOrder.noOrder + "&noCm="+ $scope.item.pasienDaftar.noRec);
                    window.open(fixUrlLaporan, '_blank')
                } 

                /*$state.go('BankDarahCetakBarcodeCtrl', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec
                })*/
            }

            $scope.group = {
                field: "statusAntrian",
            };
            $scope.KirimDarah = function() {
                $state.go('KirimDarahKeRuangan', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec
                })
            }
            $scope.Column = [
                // {
                //     "field": "noAntrian",
                //     "title": "No.",
                //     "width": 50
                // },
                // {
                //     field: "strukOrder.noOrder",
                //     title: ModelItem.translate("No Pemesanan", 1)
                // },
                {
                    "field": "strukOrder.cito",
                    "title": "Cito",
                    template: "<input disabled type='checkbox' #= strukOrder.cito ? \"checked='checked'\" : \"\" # /> ",
                    width: "50px"
                }, {
                    "field": "strukOrder.noOrderIntern",
                    "title": "No Bank Darah"
                }, {
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