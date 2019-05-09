define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RadiologiDaftarPasienCtrl', ['FindProduk', 'CacheHelper', 'ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienRadiologi', 'DateHelper',

        function(produkService, cacheHelper, managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienRadiologi, dateHelper) {
            $scope.now = new Date();
            debugger;
            $scope.selectedJenisProduk = [];
            $scope.tglAwal = dateHelper.formatDate(new Date(), "YYYY-MM-DD");
            $scope.tglAkhir = dateHelper.formatDate(new Date(), "YYYY-MM-DD");
            $rootScope.isOpen = true;
            $scope.isPjRad = false;
            $scope.statusRadiologi = undefined;
            $scope.statusLoadFirst = true;
 
            //status patalogi antomi
            if (ModelItem.getPegawai().ruangan.id == "35")
                $scope.statusRadiologi = 1;
            else
                $scope.statusRadiologi = 2;
            $scope.isPjRad = ModelItem.getStatusUser() == 'radiologi';
            $scope.selected = function(data) {
                // debugger;
                $scope.item = data;
                cacheHelper.set('currentPasienRadiologi', $scope.item);
            }
            $scope.isShowDetail = false;
            $scope.showDetail = function() {
                $scope.isShowDetail = !$scope.isShowDetail;
            }
            $scope.isLoading = false;
            ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
                $scope.listRuanganTujuan = _.filter(data, function(e) {
                    return e.departemenId === 14;
                });
            })
            $scope.listPasien = cacheHelper.get('listRadiologi');
            produkService.jenisProdukRadiologi().then(function(e) {
                $scope.listJenisProduk = e.data.data;
            });
            // $scope.tglAwal = new Date($scope.tglAwal.getFullYear(), $scope.tglAwal.getMonth(), $scope.tglAwal.getDate(), 0, 0, 0);

            /*add_hanafi*/
            $scope.refresh = function() {
                if (ModelItem.getPegawai().ruangan.id == "35") {
              
                    $scope.currentDate = new Date();
                    $scope.isLoading = true;
                    // cacheHelper.set('tglAwalRadiologi', $scope.tglAwal);
                    // cacheHelper.set('tglAkhirRadiologi', $scope.tglAkhir); 
                    findPasienRadiologi.getListPatient('', dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD HH:mm:00'), dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD HH:mm:59'), '', $scope.noCm ).then(function(e) {
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
                                    element.myStyle = { 'background-color': '#FF0000' };
                                    element.statusAntrian = "Check in";
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
                                } else if (element.statusAntrian === 'SAMPLE_DI_AMBIL') {
                                    element.myStyle = { 'background-color': '#FF7E3B' };
                                    element.statusAntrian = "Sample di Ambil";
                                } else if (element.statusAntrian === 'VALIDASI_ANALIS') {
                                    element.myStyle = { 'background-color': '#f6a8ff' };
                                    element.statusAntrian = "Release Analis";
                                } else if (element.statusAntrian === 'VALIDASI' || element.statusAntrian === 'STATUS_CETAK') {
                                    element.myStyle = { 'background-color': '#f6a8ff' };
                                    element.statusAntrian = "Release Dokter";
                                }
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
                            cacheHelper.set('listRadiologi', temp);
                            if (cacheHelper.get('currentPasienRadiologi') !== undefined)
                                $scope.item = cacheHelper.get('currentPasienRadiologi');
                        });
                        $scope.isLoading = false;
                    });
                    $scope.statusLoadFirst=false;
                } else {
                    $scope.currentDate = new Date();
                    $scope.isLoading = true;
                    cacheHelper.set('tglAwalRadiologi', $scope.tglAwal);
                    cacheHelper.set('tglAkhirRadiologi', $scope.tglAkhir); 
                    findPasienRadiologi.getListPatient('',dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD HH:mm:00'), dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD HH:mm:59'), $scope.noCm, ModelItem.getPegawai() ).then(function(e) {
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
                                    element.myStyle = { 'background-color': '#FF0000' };
                                    element.statusAntrian = "Check in";
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
                                } else if (element.statusAntrian === 'SAMPLE_DI_AMBIL') {
                                    element.myStyle = { 'background-color': '#FF7E3B' };
                                    element.statusAntrian = "Sample di Ambil";
                                } else if (element.statusAntrian === 'VALIDASI_ANALIS') {
                                    element.myStyle = { 'background-color': '#f6a8ff' };
                                    element.statusAntrian = "Release Analis";
                                } else if (element.statusAntrian === 'VALIDASI' || element.statusAntrian === 'STATUS_CETAK') {
                                    element.myStyle = { 'background-color': '#f6a8ff' };
                                    element.statusAntrian = "Release Dokter";
                                }
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
                            cacheHelper.set('listRadiologi', temp);
                            if (cacheHelper.get('currentPasienRadiologi') !== undefined)
                                $scope.item = cacheHelper.get('currentPasienRadiologi');
                        });
                        $scope.isLoading = false;
                    });
                    $scope.statusLoadFirst=false;
                }
            }

            socket.on('DaftarAntrian', function(data) {
                if ($scope.isLoading === false)
                    $scope.refresh();

            });

            socket.on('DaftarAntrianLaboratorium', function(data) {
                if ($scope.isLoading === false)
                    $scope.refresh();

            });
            socket.on('ResultLabDevice', function(data) {
                var obj = JSON.parse(data.message.replaceAll("'", '"'));
                for (var key in $scope.listPasien) {
                    if ($scope.listPasien.hasOwnProperty(key)) {
                        var element = $scope.listPasien[key];
                        if (element.noRec === obj.antrian.noRec) {
                            element.myStyle = { 'background-color': '#ff2f2f' }
                            element.statusAntrian = "Terdapat hasil baru";
                        }

                    }
                }

            });
            $scope.refresh();
            $scope.notDetail = true;

            $scope.title = $state.params.title;
            if ($scope.title === undefined)
                $scope.title = "Daftar Pasien Terdaftar";
            $scope.verifikasi = function(data) {
                // console.log(JSON.stringify($scope.item));
                // debugger;
                $state.go(data, {
                    noRec: $scope.item.noRec,
                    noRegistrasi: $scope.item.strukOrder.noRegistrasi.noRegistrasi,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec,
                    tanggal: dateHelper.getDateTimeFormatted(new Date($scope.item.pasien.tglDaftar))
                })
            }
            $scope.group = {
                field: "statusAntrian",
            };
            $scope.Column = [
                {
                    "field": "strukOrder.cito",
                    "title": "Cito",
                    template: "<input disabled type='checkbox' #= strukOrder.cito ? \"checked='checked'\" : \"\" # /> ",
                    width: "50px"
                }, {
                    "field": "strukOrder.noOrderIntern",
                    "title": "No Laboratorium"
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
            $rootScope.isOpen = true;
            var a = $rootScope.$$phase;
            if ($rootScope.$$phase === undefined)
                $scope.$apply();
        }

    ]);
});