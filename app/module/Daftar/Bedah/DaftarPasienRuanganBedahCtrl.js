define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPasienRuanganBedahCtrl', ['ReportHelper', 'CacheHelper', 'ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasien', 'DateHelper',

        function(reportHelper, cacheHelper, managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienBedahSentral, dateHelper) {
            $scope.now = new Date();
            $rootScope.isOpen = true;
            $scope.tglAwal = new Date();
            $scope.tglAkhir = new Date();
            $scope.selected = function(data) {
                $scope.item = data;
            }
            $scope.transferInternal = function() {
                $state.go('PasienBedah.SuratPermintaanMasuk', {
                    noCM: $scope.item.pasien.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec: $scope.item.noRec,
                    noRegister: $scope.item.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec
                });
                // $state.go('dashboardpasien.pengkajianUtama', {
                //     noCM: $scope.item.pasien.noCm,
                //     tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                //     noRec: $scope.item.noRec
                // });
            }
            $scope.cekStatusBeforePemeriksaan = function(statusCode, statusAntrian) {
                var obj = {
                    "msg": "",
                    "status": true
                }
                switch (statusCode) {
                    case "suster":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = false;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.status = true;
                                break;
                            case "MENUNGGU":
                                obj.msg = "Pasien harus di panggil suster terlebih dahulu";
                                obj.status = false;
                                break;
                        };
                        break;
                    case "dokter":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.status = true;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.msg = "Pasien harus di panggil dokter terlebih dahulu";
                                obj.status = false;
                                break;
                            case "MENUNGGU":
                                obj.msg = "Pasien harus di panggil suster terlebih dahulu";
                                obj.status = false;
                                break;
                        };
                        break;
                }

                return obj;
            }
            // $scope.susterClick = function() {

            //     var cookie = document.cookie.split(';');

            //     var statusCode = ModelItem.getStatusUser();
            //     cookie = cookie[0].split('=');
            //     $state.go('dashboardpasien.SoapSuster', {
            //         noCM: $scope.item.pasien.noCm,
            //         tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
            //         noRec: $scope.item.noRec
            //     });
            // }
            $scope.rincianClick = function() {
                var cookie = document.cookie.split(';');

                var statusCode = ModelItem.getStatusUser();
                cookie = cookie[0].split('=');
                debugger;
                $state.go('BillingDetail', {
                    noAntrianPasien: $scope.item.noRec,
                    noRecRegistrasi: $scope.item.pasienDaftar.noRec
                    
                });
            }
            $scope.PengkajianMedis = function() {
                var cookie = document.cookie.split(';');

                var statusCode = ModelItem.getStatusUser();
                cookie = cookie[0].split('=');
                debugger;
                $state.go('dashboardpasien.PengkajianMedis', {
                    noCM: $scope.item.pasien.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec: $scope.item.noRec,
                    ruangana: $scope.item.ruangan.id
                });
            }
             $scope.susterClick = function() {

                var cookie = document.cookie.split(';');

                var statusCode = ModelItem.getStatusUser();
                cookie = cookie[0].split('=');
                debugger;
                $state.go('dashboardpasien.SoapSuster', {
                    noCM: $scope.item.pasien.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec: $scope.item.noRec,
                    noRegister: $scope.item.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec
                });
            }
            $scope.pasienNoCm = $scope.item;
            debugger;
            $scope.listPasien = cacheHelper.get('listBedahSentral');
            $scope.tglAwal = new Date($scope.tglAwal.getFullYear(), $scope.tglAwal.getMonth(), $scope.tglAwal.getDate(), 0, 0, 0);
            $scope.refresh = function() {
                cacheHelper.set('tglAwalBedahSentral', $scope.tglAwal);
                cacheHelper.set('tglAkhirBedahSentral', $scope.tglAkhir);
                findPasienBedahSentral.getListBedahPatient(dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD HH:mm:00'), dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD HH:mm:59'), $scope.noCm).then(function(e) {
                    debugger;
                    console.log($scope)

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
                                element.statusAntrian = "Check in";
                            } else if (element.statusAntrian === 'HASIL') {
                                element.myStyle = { 'background-color': '#89c9f7' };
                                element.statusAntrian = "Hasil di Ambil";
                            } else if (element.statusAntrian === 'PERSIAPAN') {
                                element.myStyle = { 'background-color': '#FF8DFC' }
                                element.statusAntrian = "Menunggu Periksa";
                            } else if (element.statusAntrian === 'PERIKSA') {
                                element.myStyle = { 'background-color': '#1da214' };
                                element.statusAntrian = "Check Out";
                            } else if (element.statusAntrian === 'SAMPLE_DI_TERIMA') {
                                element.myStyle = { 'background-color': '#FF3BAD' };
                                element.statusAntrian = "Check In";
                            } else if (element.statusAntrian === 'SAMPLE_DI_AMBIL') {
                                element.myStyle = { 'background-color': '#FF7E3B' };
                                element.statusAntrian = "Sign In";
                            } else if (element.statusAntrian === 'VALIDASI_ANALIS') {
                                element.myStyle = { 'background-color': '#f6a8ff' };
                                element.statusAntrian = "Time Out";
                            } else if (element.statusAntrian === 'VALIDASI') {
                                element.myStyle = { 'background-color': '#701afb' };
                                element.statusAntrian = "Sign Out";
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
                        cacheHelper.set('listBedahSentral', temp);
                    });
                });

            }
            socket.on('DaftarAntrianBedahSentral', function(data) {
                $scope.refresh();
            });

            $scope.refresh();
            $scope.notDetail = true;
            if ($state.current.name === 'BedahSentral.Queue' || $state.current.name === 'BedahSentral.Sample' || $state.current.name === 'Radiologi.Result' || $state.current.name === 'BedahSentral.Take') {
                $scope.notDetail = false;
            }

            $scope.title = $state.params.title;
            if ($scope.title === undefined)
                $scope.title = "Daftar Pasien Terdaftar";
            $scope.verifikasi = function() {
                $state.go('DashboardBedahSentralCtrlVerifikasi', {
                    noRegistrasi: $scope.item.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec,
                    noRegister: $scope.item.noRec
                })
            }
            $scope.kasa = function() {
                $state.go('PerhitunganKasa', {
                    noRegistrasi: $scope.item.noRec,
                    noOrder: $scope.item.strukOrder.noOrder,
                    noAntrianPasien: $scope.item.noRec,
                    noRegister: $scope.item.noRec
                })
            }
            $scope.CheckIn = function() {
                $state.go('CheckIn', {
                    noRegister: $scope.item.noRec
                })
            }
            $scope.Rencana = function() {
                $state.go('PasienBedah.Schedule', {
                    noRegister: $scope.item.noRec
                })
            }
            $scope.SignIn = function() {
                $state.go('SignIn', {
                    noRegister: $scope.item.noRec
                })
            }
            $scope.PerhitunganKasa = function() {
                $state.go('PasienBedah.PerhitunganKasa', {
                    noRegister: $scope.item.noRec
                })
            }
            $scope.TimeOut = function() {
                $state.go('TimeOut', {
                    noRegister: $scope.item.noRec
                })
            }
            $scope.laporanPembedahan = function() {
                $state.go('PasienBedah.LaporanPembedahan', {
                    noRegister: $scope.item.noRec
                })
            }
            $scope.CheckOut = function() {
                $state.go('CheckOut', {
                    noRegister: $scope.item.noRec
                })
            }
            $scope.SignOut = function() {
                $state.go('SignOut', {
                    noRegister: $scope.item.noRec
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
                    "title": "No BedahSentral"
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

            $scope.laporanClick = function()
            {
                if($scope.item.pasien.noCm != undefined){
                    var fixUrlLaporan = reportHelper.open("reporting/lapCheckListProsedurKeselamatan?noRegistrasi="+$scope.item.pasien.noCm);
                    window.open(fixUrlLaporan, '_blank')
                } 
            }

        }
    ]);
});