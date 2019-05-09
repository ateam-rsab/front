define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPenerimaanSterilisasiAlatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'IPSRSService', 'ManageCSSD', 'DateHelper', '$state',
        function ($rootScope, $scope, ModelItem, ManageSarpras, IPSRSService, ManageCSSD, DateHelper, $state) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.jenisPermintaan = [
                { id: 1, name: "Internal" },
                // {id:2, name:"Eksternal"}
            ]
            $scope.item.jenisPermintaan = 1;
            $scope.item.tanggalAwal = new Date();
            $scope.item.tanggalAkhir = new Date();
            var init = function () {
                IPSRSService.getItem("cssd-sterilisasi/list-sterilisasi?noOrder=&tanggalAwal=&tanggalAhir").then(function (dat) {
                    $scope.dataGrid = dat.data.data;
                    var dataGridInternal = [];
                    var dataGridEksternal = [];
                    $scope.dataGrid.forEach(function (data) {
                        if (data.customer == undefined) {
                            dataGridInternal.push(data)
                        } else {
                            dataGridEksternal.push(data)
                        }
                    });
                    dataGridInternal.forEach(function (data) {
                        var tanggal = new Date(data.tanggalOrder)
                        data.tanggalOrder = DateHelper.getTanggalFormatted(tanggal);
                        data.listSteril = data.caraSterilisisasi;
                    });
                    // dataGridEksternal.forEach(function (data) {
                    //     var tanggal = new Date(data.tanggalOrder)
                    //     data.tanggalOrder = DateHelper.getTanggalFormatted(tanggal);
                    //     data.listSteril = data.caraSterilisisasi.toString();
                    // });
                    $scope.dataSourceInternal = new kendo.data.DataSource({
                        pageSize: 5,
                        data: dataGridInternal,
                        autoSync: true
                    });
                    $scope.dataSourceEksternal = new kendo.data.DataSource({
                        pageSize: 5,
                        data: dataGridEksternal,
                        autoSync: true
                    });
                });
            };
            init();
            $scope.refresh = function () {
                init();
            }
            $scope.cari = function () {
                debugger
                var orderNo = $scope.item.noOrder;
                var tanggalAwal = DateHelper.getTanggalFormattedNew($scope.item.tanggalAwal);
                var tanggalAkhir = DateHelper.getTanggalFormattedNew($scope.item.tanggalAkhir);
                if ($scope.item.noOrder == undefined) {
                    orderNo = "";
                }
                ManageCSSD.getItem("/cssd-sterilisasi/list-permintaan-sterilisasi-dari-ruangan?startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir).then(function (dat) {
                    debugger
                    $scope.dataGrid = dat.data.data;
                    var dataGridInternal = [];
                    var dataGridEksternal = [];
                    $scope.dataGrid.forEach(function (data) {
                        if (data.customer == undefined || data.customer == null) {
                            dataGridInternal.push(data)
                        } else {
                            dataGridEksternal.push(data)
                        }
                    });
                    dataGridInternal.forEach(function (data) {
                        var tanggal = new Date(data.tanggalOrder)
                        data.tanggalOrder = DateHelper.getTanggalFormatted(tanggal);
                        data.listSteril = data.caraSterilisisasi;
                    });
                    dataGridEksternal.forEach(function (data) {
                        var tanggal = new Date(data.tanggalOrder)
                        data.tanggalOrder = DateHelper.getTanggalFormatted(tanggal);
                        data.listSteril = data.caraSterilisisasi.toString();
                    });
                    $scope.dataSourceInternal = new kendo.data.DataSource({
                        pageSize: 5,
                        data: dataGridInternal,
                        autoSync: true
                    });
                    $scope.dataSourceEksternal = new kendo.data.DataSource({
                        pageSize: 5,
                        data: dataGridEksternal,
                        autoSync: true
                    });
                });
            }
            function generatedTemplate(caraSterilisisasi) {
                var template = '<ul>';
                for (var i = 0; i < caraSterilisisasi.lenght; i++) {
                    if (caraSterilisisasi != undefined) {
                        template = template + "<li>" + caraSterilisisasi[i] + "</li>";
                    } else if (caraSterilisisasi.lenght == 0) {
                        template = template + "<li>Tidak Ada Cara Sterilisasi</li>";
                    }
                    return template + '<ul>';
                }
            }
            $scope.gridDaftarSterelisasiInternal = {
                pageable: true,
                columns: [
                    {
                        field: "noOrder",
                        title: "<h3 align=center>Nomor Order<h3>",
                        width: 120
                    },
                    {
                        field: "tanggalOrder",
                        title: "<h3 align=center>Tanggal Order<h3>",
                        width: 150,
                    },
                    {
                        field: "caraSterilisisasi",
                        title: "<h3 align=center>Jenis Sterelisasi<h3>",
                        width: 250,
                        // template: "#= generatedTemplate(caraSterilisisasi)#"
                        
                    },
                    {
                        field: "prosesSterilisasi",
                        title: "<h3 align=center>Proses Sterilisasi<h3>",
                        width: 200
                    }, {
                        field: "petugasPenerima",
                        title: "<h3 align=center>Petugas yang menyerahkan<h3>",
                        width: 200
                    },
                    {
                        field: "menyerahkan",
                        title: "<h3 align=center>Petugas yang menerima<h3>",
                        width: 200
                    },
                    {
                        field: "namaRuangan",
                        title: "<h3 align=center>Ruangan<h3>",
                        width: 200
                    },
                    {
                        field: "ujiSwab", title: "<h3 align=center>Uji Swab<h3>", columns: [
                            { field: "ujiSwapJamMulai", title: "<h3 align=center>Jam Mulai<h3>", width: 120 },
                            { field: "ujiSwapJamAhir", title: "<h3 align=center>Jam Selesai<h3>", width: 120 }
                        ]
                    },
                    {
                        field: "prosesDecontaminasi", title: "<h3 align=center>Proses Decontaminasi<h3>", columns: [
                            { field: "decontaminasiJamMulai", title: "<h3 align=center>Jam Mulai<h3>", width: 120 },
                            { field: "decontaminasiJamAhir", title: "<h3 align=center>Jam Selesai<h3>", width: 120 }
                        ]
                    },
                    {
                        field: "pengemasan", title: "<h3 align=center>Pengemasan<h3>", columns: [
                            { field: "pengemasanJamMulai", title: "<h3 align=center>Jam Mulai<h3>", width: 120 },
                            { field: "pengemasanJamAhir", title: "<h3 align=center>Jam Selesai<h3>", width: 120 }
                        ]
                    },
                    {
                        field: "prosesSterelisasi", title: "<h3 align=center>Proses Sterelisasi<h3>", columns: [
                            { field: "sterilisasiJamMulai", title: "<h3 align=center>Jam Mulai<h3>", width: 120 },
                            { field: "sterilisasiJamAhir", title: "<h3 align=center>Jam Selesai<h3>", width: 120 },
                            { field: "jenisSterilisasi", title: "<h3 align=center>Jenis Sterelisasi<h3>", width: 120 }
                        ]
                    },
                    {
                        field: "penyimpanan", title: "<h3 align=center>Penyimpananan<h3>", columns: [
                            { field: "penyimpananJamMulai", title: "<h3 align=center>Jam Mulai<h3>", width: 120 },
                            { field: "penyimpananJamAhir", title: "<h3 align=center>Jam Selesai<h3>", width: 120 }
                        ]
                    },
                    {
                        field: "prosesDIstribusi", title: "<h3 align=center>Proses Distribusi<h3>", columns: [
                            { field: "noKirim", title: "<h3 align=center>Nomor Kirim<h3>", width: 120 },
                            { field: "status", title: "<h3 align=center>Status<h3>", width: 120 }
                        ]
                    }
                ],
                editable: false,
                scrollable: true,
                selectable: true
            };

            $scope.gridDaftarSterelisasiEksternal = {
                pageable: true,
                columns: [
                    {
                        field: "noOrder",
                        title: "<h3 align=center>Nomor Order<h3>",
                        width: 120
                    },
                    {
                        field: "tanggalOrder",
                        title: "<h3 align=center>Tanggal Order<h3>",
                        width: 150
                    },
                    {
                        field: "customer",
                        title: "<h3 align=center>Nama Rumah Sakit<h3>",
                        width: 200
                    },
                    {
                        field: "listSteril",
                        title: "<h3 align=center>Cara Sterilisasi<h3>",
                        width: 250
                    },
                    {
                        field: "prosesSterilisasi",
                        title: "<h3 align=center>Proses Sterelisasi<h3>",
                        width: 200
                    },
                    {
                        field: "petugasPenerima",
                        title: "<h3 align=center>Petugas Yang Menerima<h3>",
                        width: 200
                    },
                    {
                        field: "ujiSwab",
                        title: "<h3 align=center>UJi SWAB<h3>",
                        columns: [
                            {
                                field: "ujiSwapJamMulai",
                                title: "<h3 align=center>Jam Mulai<h3>",
                                width: 120
                            },
                            {
                                field: "ujiSwapJamAhir",
                                title: "<center>Jam Selesai<h3>",
                                width: 120
                            }
                        ]
                    },
                    {
                        field: "prosesDecontaminasi",
                        title: "<h3 align=center>Proses Decontaminasi<h3>",
                        columns: [
                            {
                                field: "decontaminasiJamMulai",
                                title: "<h3 align=center>Jam Mulai<h3>",
                                width: 120
                            },
                            {
                                field: "decontaminasiJamAhir",
                                title: "<h3 align=center>Jam Selesai<h3>",
                                width: 120
                            }
                        ]
                    },
                    {
                        field: "pengemasan", title: "<h3 align=center>Pengemasan<h3>", columns: [
                            { field: "pengemasanJamMulai", title: "<h3 align=center>Jam Mulai<h3>", width: 120 },
                            { field: "pengemasanJamAhir", title: "<h3 align=center>Jam Selesai<h3>", width: 120 }
                        ]
                    },
                    {
                        field: "prosesSterelisasi", title: "<h3 align=center>Proses Sterelisasi<h3>", columns: [
                            { field: "sterilisasiJamMulai", title: "<h3 align=center>Jam Mulai<h3>", width: 120 },
                            { field: "sterilisasiJamAhir", title: "<h3 align=center>Jam Selesai<h3>", width: 120 },
                            { field: "jenisSterilisasi", title: "<h3 align=center>Jenis Sterelisasi<h3>", width: 120 }
                        ]
                    },
                    {
                        field: "penyimpanan", title: "<h3 align=center>Penyimpnanan<h3>", columns: [
                            { field: "penyimpananJamMulai", title: "<h3 align=center>Jam Mulai<h3>", width: 120 },
                            { field: "penyimpananJamAhir", title: "<h3 align=center>Jam Selesai<h3>", width: 120 }
                        ]
                    },
                    {
                        field: "prosesDIstribusi", title: "<h3 align=center>Proses Distribusi<h3>", columns: [
                            { field: "noKirim", title: "<h3 align=center>Nomor Kirim<h3>", width: 120 },
                            { field: "status", title: "<h3 align=center>Status<h3>", width: 120 }
                        ]
                    }
                ],
                editable: false,
                scrollable: true,
                selectable: true
            };
            $scope.klik = function (current) {
                $scope.current = current;
                $scope.item.strukPelayananId = current.strukPelayananId;
                $scope.noKirim = current.noKirim;
            };
            $scope.ujiSwab = function () {
                debugger
                if ($scope.item.strukPelayananId === undefined) {
                    window.messageContainer.error('Pilih Data')
                } else {
                    $state.go('UjiSWAB', {
                        strukPelayananId: $scope.item.strukPelayananId
                    })
                }
            }
            $scope.decontaminasi = function () {
                if ($scope.item.strukPelayananId === undefined) {
                    window.messageContainer.error('Pilih Data')
                } else {
                    $state.go('Decontaminasi', {
                        strukPelayananId: $scope.item.strukPelayananId
                    })
                }
            }
            $scope.penyimpanan = function () {
                if ($scope.item.strukPelayananId === undefined) {
                    window.messageContainer.error('Pilih Data')
                } else {
                    $state.go('Penyimpanan', {
                        strukPelayananId: $scope.item.strukPelayananId
                    })
                }
            }
            $scope.sterelisasi = function () {
                if ($scope.item.strukPelayananId === undefined) {
                    window.messageContainer.error('Pilih Data')
                } else {
                    $state.go('SterilisasiAlat', {
                        strukPelayananId: $scope.item.strukPelayananId
                    })
                }
            }
            $scope.distribusi = function () {
                if ($scope.item.strukPelayananId === undefined) {
                    window.messageContainer.error('Pilih Data')
                } else {
                    $state.go('Distribusi', {
                        strukPelayananId: $scope.item.strukPelayananId
                    })
                }
            }
            $scope.pengemasan = function () {
                if ($scope.item.strukPelayananId === undefined) {
                    window.messageContainer.error('Pilih Data')
                } else {
                    $state.go('Pengemasan', {
                        strukPelayananId: $scope.item.strukPelayananId
                    })
                }
            }
            $scope.retur = function () {
                if ($scope.item.strukPelayananId === undefined) {
                    window.messageContainer.error('Pilih Data')
                } else if ($scope.noKirim == "-" || $scope.noKirim == null) {
                    window.messageContainer.error('Order Belum Dikirim')
                }
                else {
                    $state.go('ReturStrerilisasiAlat', {
                        strukPelayananId: $scope.item.strukPelayananId
                    })
                }
            }
            $scope.monitoringDecontaminasiEO = function () {
                if ($scope.item.strukPelayananId === undefined) {
                    window.messageContainer.error('Pilih Data')
                } else {
                    $state.go('MonitoringDecontaminasiEO', {
                        strukPelayananId: $scope.item.strukPelayananId
                    })
                }
            }
            $scope.monitoringDecontaminasiSteam = function () {
                if ($scope.item.strukPelayananId === undefined) {
                    window.messageContainer.error('Pilih Data')
                } else {
                    $state.go('MonitoringDekontaminasiSteam', {
                        strukPelayananId: $scope.item.strukPelayananId
                    })
                }
            }
        }
    ]);
});