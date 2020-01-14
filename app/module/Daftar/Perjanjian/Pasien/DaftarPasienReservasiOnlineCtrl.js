define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPasienReservasiOnlineCtrl', ['CacheHelper', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket', 'ManageAkuntansi', '$http',
        function (cacheHelper, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket, manageAkuntansi, $http) {
            $scope.isRouteLoading = false;
            $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            var dateNow = new Date();
            dateNow.setDate(dateNow.getDate() + 1);
            $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
            $scope.now = new Date();
            $scope.from = $scope.now;
            $scope.until = $scope.now;
            LoadData();
            // $scope.listPasien = cacheHelper.get('listPerjanjian');
            // if (cacheHelper.get('tglAwalPerjanjian') !== undefined)
            //     $scope.from = cacheHelper.get('tglAwalPerjanjian');
            // if (cacheHelper.get('tglAkhirPerjanjian') !== undefined)
            //     $scope.until = cacheHelper.get('tglAkhirPerjanjian');
            $scope.listStatus = [
                { id: 1, nama: 'Confirm' },//#
                { id: 2, nama: 'Reservasi' },
            ]

            $scope.kodeReservasi = '';

            $scope.columnResevasi = {
                pageable: true,
                scrollable: true,
                columns: [
                    {
                        field: "noreservasi",
                        title: "<h3>Kode<br> Reservasi</h3>",
                        width: 100
                    },
                    {
                        field: "nocm",
                        title: "<h3>No. Rekam<br> Medis</h3>",
                        width: 100
                    },
                    {
                        field: "tanggalreservasi",
                        title: "<h3>Tanggal Reservasi</h3>",
                        width: 150
                    },
                    {
                        field: "namapasien",
                        title: "<h3>Nama Pasien</h3>",
                        width: 200
                    },
                    {
                        field: "namaruangan",
                        title: "<h3>Ruangan Tujuan</h3>",
                        width: 200
                    },
                    {
                        field: "dokter",
                        title: "<h3>Dokter</h3>",
                        width: 200
                    },
                    {
                        field: "status",
                        title: "<h3>Status</h3>",
                        width: 100
                    },
                    {
                        field: "notelepon",
                        title: "<h3>Nomor<br> Telepon</h3>",
                        width: 100
                    },
                    {
                        command: [
                            { text: "Konfirmasi", click: confirm }
                        ], width: 130, align: "center",
                        attributes: {
                            align: "center"
                        },
                    }
                ]
            };


            // $scope.Column = [
            //     {
            //         field: "noreservasi",
            //         title: "Kode Reservasi",
            //         width: 150
            //     },
            //     {
            //         field: "nocm",
            //         title: "No Rekam Medis",
            //         width: 150
            //     }, 
            //     {
            //         field: "tanggalreservasi",
            //         title: "Tanggal Reservasi",
            //         width: 150
            //     },
            //     {
            //         field: "namapasien",
            //         title: "Nama Pasien",
            //         width: 200
            //     },
            //     {
            //         field: "namaruangan",
            //         title: "Ruangan Tujuan",
            //         width: 200
            //     },
            //     {
            //         field: "dokter",
            //         title: "Dokter",
            //         width: 200
            //     },
            //     {
            //         field: "status",
            //         title: "Status",
            //         width: 200
            //     },
            //     {
            //         field: "notelepon",
            //         title: "Nomor Telepon",
            //         width: 200
            //     }

            // ];


            $scope.Page = {
                refresh: true//,
                //pageSizes: true//,
                //buttonCount: 5
            }
            $scope.findData = function () {
                LoadData()
                // cacheHelper.set('tglAwalPerjanjian', $scope.from);
                // cacheHelper.set('tglAkhirPerjanjian', $scope.until);
                // findPasien.findPerjanjian($scope.from, $scope.until, $scope.kodeReservasi).then(function(e) {
                //     $scope.listPasien = e.data.data;
                //     cacheHelper.set('listPerjanjian', $scope.listPasien);
                //     $scope.listPasien.forEach(function(data) {
                //         var date = new Date(data.tglReservasi);
                //         data.tglReservasiNew = dateHelper.getTanggalFormatted(date);
                //     });
                // });
            }
            // $scope.findData();
            // socket.on('DaftarAntrianPerjanjian', function(data) {
            //     $scope.findData();
            // });

            function LoadData() {

                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.from).format('YYYY-MM-DD');
                var tglAkhir = moment($scope.until).format('YYYY-MM-DD');
                var status = "";
                if ($scope.status != undefined) {
                    status = $scope.status.nama;
                }
                var namapasienpm = ''
                var namapasienapr = ''
                if ($scope.namaPasien != undefined) {
                    namapasienpm = $scope.namaPasien;
                    namapasienapr = $scope.namaPasien;
                }
                manageAkuntansi.getDataTableTransaksi("pelayanan/get-data-pasien-reservasi?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir
                    + "&kdReservasi=" + $scope.kodeReservasi
                    + "&statusRev=" + status
                    + "&namapasienpm=" + $scope.namaPasien
                    + "&namapasienapr=" + $scope.namaPasien
                ).then(function (data) {
                    $scope.isRouteLoading = false;
                    $scope.listPasien = new kendo.data.DataSource({
                        data: data.data.data,
                        group: $scope.group,
                        pageSize: 10,
                        total: data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                    $scope.dataExcel = data.data;
                })
            }

            function confirm(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                console.log(dataItem);
                if (dataItem.nocm) {
                    let data = {
                        "noreservasi": dataItem.noreservasi,
                    }

                    manageAkuntansi.postupdatestatusconfirm(data).then(function (e) {
                        LoadData();
                        var param = dataItem.norec + "*" + dataItem.nocm;
                        // $state.go('registrasiPelayanan', {
                        //      noCm: param
                        //  });
                        var cacheSet = undefined;
                        cacheHelper.set('CacheRegistrasiPasien', cacheSet);
                        var cahce = {
                            0: dataItem,
                            1: 'Online',
                            2: '',
                            3: '',
                            4: '',
                            5: '',
                            6: ''
                        };
                        cacheHelper.set('CacheRegisOnline', cahce);
                        $state.go('RegistrasiPelayananRev', {
                            noCm: dataItem.nocm
                        });
                    })
                } else {
                    let cache = {
                        0: dataItem,
                        1: 'Online',
                        2: '',
                        3: '',
                        4: '',
                        5: '',
                        6: ''
                    }
                    cacheHelper.set('CacheRegisOnline', cache);

                    $state.go('RegistrasiPasienNewRev', {
                        noRec: dataItem.norec
                    });
                }

            }

            $scope.reconfirm = function () {
                // window.isPerjanjian = $scope.item.noreservasi;
                // findPasien.CheckNoReconfirm($scope.item.noreservasi).then(function(e) {
                if ($scope.item.nocm == undefined) {
                    var cahce = {
                        0: $scope.item,
                        1: 'Online',
                        2: '',
                        3: '',
                        4: '',
                        5: '',
                        6: ''
                    };
                    cacheHelper.set('CacheRegisOnline', cahce);
                    // var isMenuDinamis = JSON.parse(localStorage.getItem('isMenuDinamis'))
                    // if(isMenuDinamis && isMenuDinamis == true){
                    $state.go('RegistrasiPasienNewRev', {
                        noRec: $scope.item.norec
                    });
                    // }else{
                    //      $state.go('RegistrasiPasienBaruOnlineRev', {// registrasiPasienBaruOnline
                    //             noRec: $scope.item.norec
                    //     });
                    // }

                } else {
                    var data = {
                        "noreservasi": $scope.item.noreservasi,
                    }

                    manageAkuntansi.postupdatestatusconfirm(data).then(function (e) {
                        LoadData();
                        var param = $scope.item.norec + "*" + $scope.item.nocm;
                        // $state.go('registrasiPelayanan', {
                        //      noCm: param
                        //  });
                        var cacheSet = undefined;
                        cacheHelper.set('CacheRegistrasiPasien', cacheSet);
                        var cahce = {
                            0: $scope.item,
                            1: 'Online',
                            2: '',
                            3: '',
                            4: '',
                            5: '',
                            6: ''
                        };
                        cacheHelper.set('CacheRegisOnline', cahce);
                        $state.go('RegistrasiPelayananRev', {
                            noCm: $scope.item.nocm
                        });
                    })
                }
            }

            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }

            $scope.CetakLaporan = function () {
                var tglAwal = moment($scope.from).format('YYYY-MM-DD 00:00');
                var tglAkhir = moment($scope.until).format('YYYY-MM-DD 23:59');

                var status = "";
                if ($scope.status != undefined) {
                    status = $scope.status.id;
                }
                var stt = 'false'
                if (confirm('View Laporan Reservasi Online? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-LaporanReservasiOnline=1&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&statusId=' + status + '&namaKasir=' + $scope.dataLogin.namaLengkap + '&view=' + stt, function (response) {
                    // do something with response
                });
            }


        }
    ]);
});