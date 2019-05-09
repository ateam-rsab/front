define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarAntrianPasienRegistrasiCtrl', ['SaveToWindow', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket', 'ManagePasien', '$mdDialog', '$window',
        function(saveToWindow, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket, managePasien, $mdDialog, window) {
            $scope.isRouteLoading = true;
            $scope.title = "ini page pencarian pasien";
            $scope.kodeRuangan = $state.params.kodeRuangan;
            $scope.isCalling = false;

            if ($state.current.name === 'LaporanKonselingFind' || $state.current.name === 'PelayananIVAdmixtureFind' || $state.current.name === 'PelayananHandlingCytotoxicFind' || $state.current.name === 'PelayananTPNFind') {
                $scope.isCalling = true;
            }
            if ($scope.isCalling === true) {
                $scope.$on("kendoWidgetCreated", function(event, widget) {
                    if (widget === $scope.grid) {
                        $scope.grid.element.on('dblclick', function(e) {
                            if ($state.current.name === 'PelayananHandlingCytotoxicFind') {
                                $state.go('PelayananHandlingCytotoxicDetail', {
                                    noRec: $scope.item.pasienDaftar.noRec
                                })
                            } else if ($state.current.name === 'PelayananIVAdmixtureFind') {
                                $state.go('PelayananIVAdmixtureDetail', {
                                    noRec: $scope.item.pasienDaftar.noRec
                                })
                            } else if ($state.current.name === 'PelayananTPNFind') {
                                $state.go('PelayananTPNDetail', {
                                    noRec: $scope.item.pasienDaftar.noRec
                                })
                            } else if ($state.current.name === 'LaporanKonselingFind') {
                                $state.go('LaporanKonselingDetailCtrl', {
                                    noRec: $scope.item.pasienDaftar.noRec
                                })
                            }

                        });
                    }
                });
            }
            $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            $scope.now = new Date();
            $scope.from = new Date();
            $scope.until = new Date();
            $scope.group = {
                field: "ruangan.namaRuangan",
                aggregates: [{
                    field: "pasien",
                    aggregate: "count"
                }, {
                    field: "ruangan.namaRuangan",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [{
                field: "pasien",
                aggregate: "count"
            }, {
                field: "ruangan.namaRuangan",
                aggregate: "count"
            }]
            $scope.Column = [{
                field: "noAntrian",
                title: "No.",
                width: 50,
                aggregates: ["count"]
            }, {
                field: "pasien.namaPasien",
                title: "Nama Pasien",
                aggregates: ["count"]
            }, {
                field: "pasien.noCm",
                title: "No. Rekam Medis",
                aggregates: ["count"]
            }, {
                field: "pasien.umur",
                title: "Umur",
                aggregates: ["count"]
            }, {
                field: "dokter",
                title: "Dokter",
                aggregates: ["count"]
            }, {
                field: "pasienDaftar.tglRegistrasi",
                title: "Tgl Registrasi",
                template: "#= new moment(new Date(pasienDaftar.tglRegistrasi)).format('DD-MM-YYYY') #",
                aggregates: ["count"]
            }, {
                field: "pasienDaftar.noRegistrasi",
                title: "No Registrasi",
                aggregates: ["count"]
            }, {
                field: "jenisKelamin",
                title: "Jenis Kelamin",
                aggregates: ["count"]
            }, {
                field: "kelompokPasien",
                title: "Tipe Pembayaran",
                aggregates: ["count"]
            }, {
                field: "statusAntrian",
                title: "Status",
                aggregates: ["count"]
            }, {
                hidden: true,
                field: "ruangan.namaRuangan",
                title: "Nama Ruangan",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
            }];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
            var arrFieldSelectVoPekerjaan = ['id', 'namaRuangan'];
            ModelItem.getDataDummyGeneric("Ruangan", true, undefined, 10).then(function(data) {
                $scope.ruangans = data;
            });

            $scope.findData = function() {
                $scope.isRouteLoading = true;

                if ($scope.noCm === undefined)
                    $scope.noCm = '';
                if ($scope.ruangan === undefined) {
                    if ($scope.kodeRuangan !== undefined)
                        $scope.ruangan = {
                            id: $scope.kodeRuangan
                        };
                    else
                        $scope.ruangan = {};
                }
                if ($scope.ruangan === undefined)
                    return;
                if ($scope.ruangan.id === undefined)
                    $scope.ruangan.id = "";

                findPasien.findQueueSemua($scope.from, $scope.until, $scope.ruangan, $scope.namaPasien).then(function(e) {
                    debugger;
                    $scope.isRouteLoading = false;
                    var data = [];
                    for (var key in e.data.data) {
                        if (e.data.data.hasOwnProperty(key)) {     
                            var element = e.data.data[key];
                            var tglRegistrasi = new moment(element.pasienDaftar.tglRegistrasi).format('DD-MM-YYYY');
                            if (element.pasienDaftar.noRegistrasi === undefined)
                                element.pasienDaftar.noRegistrasi = {
                                    namaExternal: '-'
                                }
                        }
                    }

                    var data = [];
                    for (var key in e.data.data) {
                        if (e.data.data.hasOwnProperty(key)) {
                            var element = e.data.data[key];
                            data.push(element);
                        }
                    }
                    $scope.listPasien = data;
                    $scope.patienGrids = new kendo.data.DataSource({
                        data: $scope.listPasien,
                        group: $scope.group
                    });

                    if ($scope.kodeRuangan !== undefined) {
                        $scope.listPasien.then(function(e) {
                            $scope.listPatients = e.data.data;
                            $scope.patienGrids = new kendo.data.DataSource({
                                data: $scope.listPatients,
                                group: $scope.group
                            });
                            var listQueue = _.filter(e.data.data, {
                                "statusAntrian": "MENUNGGU"
                            });
                            $scope.sumMenunggu = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                            $scope.ruanganMenunggu = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;

                            listQueue = _.filter(e.data.data, {
                                "statusAntrian": "DIPANGGIL_SUSTER"
                            });
                            $scope.sumSuster = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                            $scope.ruanganSuster = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;
                            listQueue = _.filter(e.data.data, {
                                "statusAntrian": "DIPANGGIL_DOKTER"
                            });
                            $scope.sumDokter = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                            $scope.ruanganDokter = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;

                            listQueue = _.filter(e.data.data, {
                                "statusAntrian": "SELESAI_DIPERIKSA"
                            });
                            $scope.sumSelesai = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                            $scope.ruanganSelesai = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;
                        });

                    }



                });

            }
            $scope.findData();
            socket.on('DaftarAntrian', function(data) {
                $scope.findData();
            });
            $scope.detailBilling = function() {
                $state.go('BillingPasien', {
                    noPendaftaran: $scope.item.pasienDaftar.noRegistrasi
                });
            }

            $scope.susterClick = function() {

                $state.go('dashboardpasien.pengkajianUtama', {
                    noCM: $scope.item.pasien.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD hh:mm:ss,SSS')
                });
            }
            $scope.detailOrder = function() {
                $state.go('ResepElektronikDetail', { noOrder: $scope.item.pasienDaftar.noRegistrasi });
            }
            $scope.monitoring = function() {
                $state.go('MonitoringPasien', { noCm: $scope.item.pasien.noCm });
            }

            $scope.masukPasien = function(data) {
                $scope.isRouteLoading = true;

                if (data === undefined)
                    data = $scope.item;
                var statusCode = ModelItem.getStatusUser()
                var statusAntrian = 0;

                var objValid = $scope.cekStatusBeforePanggil(statusCode, $scope.item.statusAntrian);

                if (objValid.status) {
                    $scope.item = data;

                    socket.emit('DaftarAntrian' + data.ruangan.id, "asdasdsad", function(a, b, c, d, e, f) {})
                    managePasien.updateStatusAntrian(data.noRec, objValid.statusAntrian).then(function() {
                        if (statusCode === 'suster')
                            $scope.item.statusAntrian = "DIPANGGIL_SUSTER";
                        else
                            $scope.item.statusAntrian = "DIPANGGIL_DOKTER";
                        $scope.isRouteLoading = false;
                        //$scope.findData();
                    });
                } else {
                    $scope.isRouteLoading = false;
                    window.messageContainer.error(objValid.msg);
                }
            }


            $scope.pemeriksaanPasien = function() {
                var cookie = document.cookie.split(';');

                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.pengkajianUtama', {
                            noCM: $scope.item.pasien.noCm,
                            tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.noRec
                        });
                    } else {
                        $state.go('dashboardpasien.pengkajianUtama', {
                            noCM: $scope.item.pasien.noCm,
                            tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.noRec
                        });
                    }
                } else {
                    window.messageContainer.error(objValid.msg);
                }
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

            $scope.cekStatusBeforePanggil = function(statusCode, statusAntrian) {
                var obj = {
                    "msg": "",
                    "status": false,
                    "statusAntrian": 0
                }

                switch (statusCode) {
                    case "suster":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = false;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.msg = "Pasien sudah di panggil suster";
                                obj.status = false;
                                break;
                            case "MENUNGGU":
                                obj.status = true;
                                obj.statusAntrian = 1;
                                break;
                        };
                        break;
                    case "dokter":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = false;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.status = true;
                                obj.statusAntrian = 2;
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

             $scope.batal = function() {
                $scope.showAlert();
             }
            $("#confirmBtn").on("click", function () {
                window.myconfirm("Anda Yakin akan membatalkan pasien?").then(function () {
                  window.myalert("Operation done!");
                }, function () {
                  window.myalert("You chose to Cancel action.");
                });
            });
            function myconfirm(content){
                return $("<div></div>").kendoConfirm({
                  title: "My Title",
                  content: content
                }).data("kendoConfirm").open().result;
            }

        }
    ]);
});