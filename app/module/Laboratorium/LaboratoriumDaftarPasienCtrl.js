define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('LaboratoriumDaftarPasienCtrl', ['FindProduk', 'CacheHelper', 'ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienLaboratorium', 'DateHelper',

        function(produkService, cacheHelper, managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienLaboratorium, dateHelper) {
            $scope.now = new Date();

            $scope.selectedJenisProduk = [];
            $scope.tglAwal = new Date();
            $scope.tglAkhir = new Date();
            $rootScope.isOpen = true;
            $scope.isPjLab = false;
            $scope.statusLaborat = undefined;
            $scope.statusLoadFirst = true;
            //status patalogi antomi
            if (ModelItem.getPegawai().ruangan.kdRuangan === "39")
                $scope.statusLaborat = 0;

            //status mikrobiolgi
            else if (ModelItem.getPegawai().ruangan.kdRuangan === "278")
                $scope.statusLaborat = 1;
            // status patalogi klinik
            else
                $scope.statusLaborat = 2;
            $scope.isPjLab = ModelItem.getStatusUser() === 'pjLboratorium';
            $scope.selected = function(data) {
                $scope.item = data;
                cacheHelper.set('currentPasienLaboratorium', $scope.item);
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
            $scope.listPasien = cacheHelper.get('listLaboratorium');
            produkService.jenisProdukByKelompokProduk(1).then(function(e) {
                $scope.listJenisProduk = e.data.data;
            });
            // if (cacheHelper.get('tglAwalLaboratorium') !== undefined)
            //     $scope.tglAwal = cacheHelper.get('tglAwalLaboratorium');
            // else
            $scope.tglAwal = new Date($scope.tglAwal.getFullYear(), $scope.tglAwal.getMonth(), $scope.tglAwal.getDate(), 0, 0, 0);
            // if (cacheHelper.get('tglAkhirLaboratorium') !== undefined)
            //     $scope.tglAkhir = cacheHelper.get('tglAkhirLaboratorium');
            $scope.printLaborat = function() {
                managePasien.updateStatusAntrian($scope.item.noRec, 13).then(function(e) {
                    window.location = configuration.urlPrinting + "registrasi-pelayanan/report-detail-laboratorium/?noOrder=" + $scope.item.strukOrder.noOrder + "&X-AUTH-TOKEN=" + ModelItem.getAuthorize()
                });

            }

            /*add_hanafi*/
            $scope.refresh = function() {
            if (ModelItem.getPegawai().ruangan.kdRuangan === "39" || ModelItem.getPegawai().ruangan.kdRuangan === "278") {
              
                    $scope.currentDate = new Date();
                    $scope.isLoading = true;
                    cacheHelper.set('tglAwalLaboratorium', $scope.tglAwal);
                    cacheHelper.set('tglAkhirLaboratorium', $scope.tglAkhir); 
                    findPasienLaboratorium.getListPatient($scope.statusLoadFirst,dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD HH:mm:00'), dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD HH:mm:59'), $scope.noCm, ModelItem.getPegawai()).then(function(e) {
                        debugger;
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
                            cacheHelper.set('listLaboratorium', temp);
                            if (cacheHelper.get('currentPasienLaboratorium') !== undefined)
                                $scope.item = cacheHelper.get('currentPasienLaboratorium');
                        });
                        $scope.isLoading = false;
                    });
                $scope.statusLoadFirst=false;
         
            } else {
                   
                    $scope.isLoading = true;
                    cacheHelper.set('tglAwalLaboratorium', $scope.tglAwal);
                    cacheHelper.set('tglAkhirLaboratorium', $scope.tglAkhir);
                    console.log(dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD HH:mm:00'))
                    findPasienLaboratorium.getListPatient($scope.statusLoadFirst,dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD HH:mm:00'), dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD HH:mm:59'), $scope.noCm).then(function(e) {
                        debugger;
                        $scope.isLoading = false;
                        var data = [];
                        for (var key in e.data.data) {
                            if (e.data.data.hasOwnProperty(key)) {
                                var element = e.data.data[key];
                                element.strukOrder.tglOrder = dateHelper.formatDate(element.strukOrder.tglOrder, 'DD-MM-YYYY HH:mm:00')
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
                                } else if (element.statusAntrian === 'STATUS_CETAK') {
                                    element.myStyle = { 'background-color': '#89c9f7' };
                                    element.statusAntrian = "Hasil di Ambil";
                                } else if (element.statusAntrian === 'SELESAI_HASIL')
                                    element.statusAntrian = "Persiapan";
                                else if (element.statusAntrian === 'PERSIAPAN') {
                                    element.myStyle = { 'background-color': '#89c9f7' }
                                    element.statusAntrian = "Menunggu Periksa";
                                } else if (element.statusAntrian === 'PERIKSA') {
                                    element.myStyle = { 'background-color': '#89c9f7' };
                                    element.statusAntrian = "Selesai Periksa";
                                } else if (element.statusAntrian === 'SAMPLE_DI_TERIMA') {
                                    element.myStyle = { 'background-color': '#89c9f7' };
                                    element.statusAntrian = "Sample di Terima";
                                } else if (element.statusAntrian === 'SAMPLE_DI_AMBIL') {
                                    element.myStyle = { 'background-color': '#89c9f7' };
                                    element.statusAntrian = "Sample di Ambil";
                                } else if (element.statusAntrian === 'SAMPLE_DI_AMBIL') {
                                    element.myStyle = { 'background-color': '#89c9f7' };
                                    element.statusAntrian = "Sample di Ambil";
                                } else if (element.statusAntrian === 'VALIDASI_ANALIS') {
                                    element.myStyle = { 'background-color': '#89c9f7' };
                                    element.statusAntrian = "Release Analis";
                                } else if (element.statusAntrian === 'VALIDASI' || element.statusAntrian === 'STATUS_CETAK') {
                                    element.myStyle = { 'background-color': '#1da214' };
                                    element.statusAntrian = "Release Dokter";
                                } else if (element.statusAntrian === 'AMBIIL_HASIL') {
                                      element.myStyle = { 'background-color': '#FF0000' };
                                } else { 
                                      element.myStyle = { 'background-color': '#1da214' };
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
                            cacheHelper.set('listLaboratorium', temp);
                            if (cacheHelper.get('currentPasienLaboratorium') !== undefined)
                                $scope.item = cacheHelper.get('currentPasienLaboratorium');
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
            if ($state.current.name === 'Laboratorium.Queue' || $state.current.name === 'Laboratorium.Sample' || $state.current.name === 'Radiologi.Result' || $state.current.name === 'Laboratorium.Take') {
                $scope.notDetail = false;
            }

            $scope.title = $state.params.title;
            if ($scope.title === undefined)
                $scope.title = "Daftar Pasien Terdaftar";
            $scope.verifikasi = function(data) {
                var statOrder = $scope.item.statusAntrian;
                $state.go(data, {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec,
                    statOrder: statOrder === "Menunggu" ? 0 : 1
                })
            }
            $scope.CetakBarcode = function() {
                $state.go('LaboratoriumCetakBarcodeCtrl', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec
                });
            }
            $scope.AmbilSpesimen = function(data) {
                managePasien.updateStatusAntrian($scope.item.noRec, 10);
                $state.go(data ? data : 'DashboardLaboratoriumCtrlSpesimen', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec
                })
            }
            $scope.SimpanInternal = function() {
                manageLaboratorium.saveInternalMessage($scope.item.strukOrder);
            }

            $scope.ambilDataSirs = function(data) {
                managePasien.migrasiDataSirs(dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD HH:mm:00'), dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD HH:mm:59')).then(function(e) {})

            }
            $scope.PemeriksaanPasien = function(data) { 
                $state.go(data ? data : 'DashboardLaboratoriumCtrlPemeriksaan', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec
                })
            }
            $scope.MasukanHasil = function(data) {
                // managePasien.updateStatusAntrian($state.params.noAntrianPasien, 11);
                $state.go(data ? data : 'DashboardLaboratoriumCtrlInputHasil', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec,
                    status : "hasil"
                })
            }
            $scope.PengambilanHasil = function(data) {
                managePasien.updateStatusAntrian($scope.item.noRec, 13)
                    //LaboratoriumPasien.AmbilHasil
                $state.go(data ? data : 'DashboardLaboratoriumCtrlAmbilHasil', {
                    noRegistrasi: $scope.item.pasienDaftar.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec
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