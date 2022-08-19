define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('ResepElektronikCtrl', ['ManagePasien', 'socket', '$state', '$timeout', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', 'ManageLogistikPhp', 'CacheHelper', "CetakHelper", "$mdDialog",
        function (managePasien, socket, $state, $timeout, findPasien, $rootScope, $scope, ModelItem, DateHelper, $document, r, manageLogistikPhp, cacheHelper, cetakHelper, $mdDialog) {
            $scope.title = "Resep elektronik";
            $scope.dataResep = [];
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.item.namaPasien = "";
            $scope.item.ruangan = "";

            $scope.listInstalasi = [
                {
                    namaRuangan: 'Instalasi Rawat Jalan',
                    id: 18
                },
                {
                    namaRuangan: 'Instalasi Rawat Inap',
                    id: 16
                },
                {
                    namaRuangan: 'Instalasi Gawat Darurat',
                    id: 24
                }
            ];

            $scope.listRuangan = [
                {
                    namaRuangan: 'Farmasi 1',
                    id: 94
                },
                {
                    namaRuangan: 'Farmasi 2',
                    id: 116
                }
            ];

            $scope.listOfKelompokPasien = []

            $scope.arrColumnGridResepElektronik = {
                toolbar: [
                    { text: "export", name: "Export detail", template: '<button ng-click="refresh()" class="k-button k-button-icontext k-grid-refresh"><span class="k-icon k-i-refresh"></span>Refresh</button>' },
                    { text: "export", template: '<button ng-click="toDashboard()" class="k-button k-button-icontext k-grid-left"><span class="fa fa-list" style="margin-right:"2px""></span>Dashboard Antrian</button>' },
                ],
                pageable: false,
                dataBound: function (e) {
                    $('td').each(function () {
                        if ($(this).text() == 'Sudah Bayar') { $(this).addClass('sudah-bayar') };
                        if ($(this).text() == 'Selesai') { $(this).addClass('selesai') };
                        if ($(this).text() == 'Verifikasi') { $(this).addClass('verifikasi') };
                        if ($(this).text() == 'Dibatalkan Pasien') { $(this).addClass('dibatalkan-pasien') };
                        if ($(this).text() == 'Blm Verifikasi') { $(this).addClass('blm-verifikasi') };
                        if ($(this).text() == 'Ya') { $(this).addClass('selesai') };
                        if ($(this).text() == 'Tidak') { $(this).addClass('dibatalkan-pasien') };
                    })
                },
                columns: [
                    {
                        "field": "noorder",
                        "title": "No Pesanan",
                        "width": "160px",
                        // "filterable": {
                        //     "multi": "true",
                        //     "search": "true"
                        // }
                    }, {
                        "field": "nocm",
                        "title": "No Rekam Medis",
                        "width": "160px",
                    }, {
                        "field": "namapasien",
                        "title": "Nama Pasien",
                        "width": "150px",
                        // "filterable": {
                        //     "multi": "true",
                        //     "search": "true"
                        // }

                    }, {
                        "field": "jeniskelamin",
                        "title": "Jenis Kelamin",
                        "width": "100px",
                    },
                    {
                        "field": "namaruanganrawat",
                        "title": "Ruang Rawat",
                        "width": "150px",
                    },
                    {
                        "field": "namadepartemen",
                        "title": "Nama Departemen",
                        "width": "200px",
                    },
                    {
                        "field": "strukOrder.tglOrder",
                        "title": "Tanggal/Jam Masuk",
                        "width": "150px",
                        "template": "#= new moment(new Date(tglorder)).format('DD-MM-YYYY HH:mm:ss') #"
                    },
                    {
                        "field": "namalengkap",
                        "title": "Dokter",
                        "width": "150px",
                    },
                    {
                        "field": "kelompokpasien",
                        "title": "Tipe Pasien",
                        "width": "160px",
                    },
                    {
                        hidden: true,
                        "field": "namaruangan",
                        "width": "100px",
                        "title": "Depo",
                        "aggregates": ["count"],
                        "groupHeaderTemplate": "Ruangan #= value # "

                    },
                    // {
                    //     "field": "cito",
                    //     "title": "Cito",
                    //     "width": "70px",
                    //     "template": "#if(cito) { #Ya# } else { #-# } #",
                    // },
                    // {
                    //     "field": "dipulangkan",
                    //     "title": "Segera<br> Pulang",
                    //     "width": "70px",
                    //     "template": "#if(dipulangkan===1) { #Ya# } else { #Tidak# } #",
                    // },
                    // {
                    //     // "field": "dipulangkan",
                    //     "title": "Subtitusi",
                    //     "width": "70px",
                    //     "template": "Ya",
                    // },
                    {
                        "field": "statusorder",
                        "title": "Status",
                        "width": "100px",

                    },
                    {
                        "field": "waktutunggu",
                        "title": "Waktu Tunggu",
                        "width": "100px",
                    }
                ],
                editable: false,
                // filterable: true,
            }

            $scope.toDashboard = function () {
                $state.go('DashboardResepElektronik');
            }

            // $scope.item.namaDept = {
            //     namaRuangan: 'Instalasi Rawat Jalan',
            //     id: 18
            // }

            LoadCache();
            function LoadCache() {
                var chacePeriode = cacheHelper.get('ResepElektronikCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.startDate = new Date(chacePeriode[0]);
                    $scope.untilDate = new Date(chacePeriode[1]);
                } else {
                    $scope.item.startDate = $scope.now;
                    $scope.item.untilDate = $scope.now;
                }
            }

            $scope.noCm = "";
            $scope.ruanganId = "";
            $scope.group = {
                field: "namaruanganrawat",
                aggregates: [{
                    field: "namaruanganrawat",
                    aggregate: "count"
                }]
            };

            var init = function () {
                manageLogistikPhp.getDataTableMaster('list-generic/kelompok-pasien').then(res => {
                    // console.log(res);
                    $scope.listOfKelompokPasien = res.data;
                });
            }

            init();

            $scope.refresh = function () {
                $scope.patienGrids = [];
                // debugger;
                $scope.isRouteLoading = true;
                var nocm = ''
                if ($scope.noCm != undefined) {
                    nocm = '&nocm=' + $scope.noCm
                }

                // if($scope.item.namaDept === undefined) {

                // }

                var tglAwal = moment($scope.startDate).format('YYYY-MM-DD');
                var tglAkhir = moment($scope.untilDate).format('YYYY-MM-DD');
                manageLogistikPhp.getDataTableTransaksi('logistik/get-daftar-order-resep-elektronik?tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + nocm + "&dep_id=" + ($scope.item.namaDept ? $scope.item.namaDept.id : "") + "&kelompok_id=" + ($scope.item.kelompokPasien ? $scope.item.kelompokPasien.id : "")).then(function (res) {
                    // findPasien.findOrderObat($scope.noCm, $scope.ruanganId, $scope.startDate, $scope.untilDate).then(function(e) {
                        for (var i = 0; i < res.data.data.length; i++) {
                            res.data.data[i].no = i + 1
                            var tanggal = $scope.now;
                            var tanggalLahir = new Date(res.data.data[i].tgllahir);
                            var umur = DateHelper.CountAge(tanggalLahir, tanggal);
                            res.data.data[i].umur = umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                            //itungUsia(dat.data[i].tgllahir)
                        }
                        $scope.patienGrids = new kendo.data.DataSource({
                            //data: ModelItem.beforePost(e.data.data, true),
                            data: ModelItem.beforePost(res.data.data, true),
                            // group: $scope.group
                        });
                    // });
                    $scope.ratarata = res.data.rata_waktu_tunggu;
                    $scope.isRouteLoading = false;
                });
                var chacePeriode = [
                    tglAwal,
                    tglAkhir
                ]

                cacheHelper.set('ResepElektronikCtrl', chacePeriode);
            };

            $scope.refresh();

            // $scope.intervalFunction = function () {
            //     $timeout(function () {
            //         $scope.refresh();
            //         $scope.intervalFunction();
            //       }, 6000);
            // }

            // $scope.intervalFunction();

            $scope.now = new Date();

            $scope.updateProduksi = function () {
                if ($scope.item.statusorder == 'Verifikasi' && $scope.item.dep_id === 16) {
                    $state.go('ProduksiElektronik', { norec_so: $scope.item.norec_so })
                } else if ($scope.item.statusorder == 'Sudah Bayar') {
                    $state.go('ProduksiElektronik', { norec_so: $scope.item.norec_so });
                } else if ($scope.item.statusorder == 'Verifikasi' && $scope.item.dep_id === 18) {
                    if ($scope.item.kelompokpasien === "BPJS") {
                        $state.go('ProduksiElektronik', { norec_so: $scope.item.norec_so });
                    } else {
                        $state.go('ProduksiElektronik', { norec_so: $scope.item.norec_so });
                        // toastr.info('Pasien Belum Bayar');
                    }

                } else if ($scope.item.statusorder == 'Selesai') {
                    $state.go('ProduksiElektronik', { norec_so: $scope.item.norec_so });
                    toastr.info('Obat sudah selesai tidak bisa Produksi')
                } else {
                    toastr.info('Belum bisa di Produksi');
                }
            }

            $scope.serahkanObat = function () {
                if (!$scope.item.statusorder == 'Selesai' && $scope.item.dep_id === 16) {
                    toastr.info('Obat belum siap di serahkan');

                    return;
                }

                let data = {
                    norec_so: $scope.item.norec_so
                }

                manageLogistikPhp.postpost('logistik/post-resep-elektronik-penyerahan-resep-norec', data).then(res => {
                    $scope.refresh();
                })

            }

            $scope.batalkanResep = function (e) {
                let data = {
                    norec: $scope.item.norec_so
                }
                if ($scope.item.statusorder == 'Blm Verifikasi') {
                    var confirm = $mdDialog.confirm()
                        .title('Batal order resep ini untuk pasien ' + $scope.item.namapasien + '?')
                        .ariaLabel('Lucky day')
                        .targetEvent(e)
                        .ok('Batalkan Resep')
                        .cancel('Tidak');
                    $mdDialog.show(confirm).then(function () {
                        $scope.isRouteLoading = true;
                        manageLogistikPhp.postpost('farmasi/batal-resep-dokter', data).then(function (res) {
                            $scope.refresh();
                            $scope.isRouteLoading = false;
                        }, (error) => {
                            $scope.isRouteLoading = false;
                        })
                    }, function () {
                        $scope.isRouteLoading = false;
                    });
                } else {
                    toastr.warning('Tidak bisa dibatalkan');
                    return;
                }
            }

            $scope.verifikasi = function () {
                if ($scope.item.statusorder == 'Blm Verifikasi') {
                    var arrStr = {
                        0: $scope.item.nocm,
                        1: $scope.item.namapasien,
                        2: $scope.item.jeniskelamin,
                        3: $scope.item.noregistrasi,
                        4: $scope.item.umur,
                        5: $scope.item.klid,
                        6: $scope.item.namakelas,
                        7: $scope.item.tglregistrasi,
                        8: $scope.item.norec_apd,
                        9: $scope.item.noorder,
                        10: $scope.item.jenisPenjamin,
                        11: $scope.item.kelompokpasien,
                        12: $scope.item.beratbadan,
                        13: $scope.item.AlergiYa,
                        14: $scope.item.norec_so,
                        15: $scope.item.cito,
                        16: $scope.item.dipulangkan,
                        17: $scope.item.izinobat,
                        18: $scope.item.riwayatalergi
                    }

                    let dataResepPasien = {
                        noCm: $scope.item.nocm,
                        namaPasien: $scope.item.namapasien,
                        jenisKelamin: $scope.item.jeniskelamin,
                        noRegistrasi: $scope.item.noregistrasi,
                        umur: $scope.item.umur,
                        klid: $scope.item.klid,
                        namaKelas: $scope.item.namakelas,
                        tglRegistrasi: $scope.item.tglregistrasi,
                        norec_apd: $scope.item.norec_apd,
                        nOrder: $scope.item.noorder,
                        jenisPenjamin: $scope.item.jenisPenjamin ? $scope.item.jenisPenjamin : '-',
                        kelompokPasien: $scope.item.kelompokpasien,
                        beratbadan: $scope.item.beratbadan,
                        AlergiYa: $scope.item.AlergiYa,
                        norec_so: $scope.item.norec_so,
                        cito: $scope.item.cito,
                        dipulangkan: $scope.item.dipulangkan,
                        izinObat: $scope.item.izinobat,
                        riwayatalergi: $scope.item.riwayatalergi,
                        dokter: $scope.item.namalengkap,
                        ruanganFarmasi: $scope.item.namaruangan
                    }
                    cacheHelper.set('InputResepApotikCtrl', arrStr);
                    cacheHelper.set('CacheDataResepElektronik', dataResepPasien);
                    $state.go('InputResepElektronikApotik');

                } else if ($scope.item.statusorder == 'Sedang dalam Proses') {
                    $scope.refresh();
                } else {
                    toastr.info('Sudah di verifikasi')
                }
            }

            $scope.columnGridRiwayat = [
                {
                    "field": "no",
                    "title": "No",
                    "width": "30px",
                },
                {
                    "field": "rke",
                    "title": "Rke",
                    "width": "50px",
                },
                {
                    "field": "jeniskemasan",
                    "title": "Jenis Kemasan",
                    "width": "100px",
                },
                {
                    "field": "namaproduk",
                    "title": "Deskripsi",
                    "width": "200px"
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan",
                    "width": "100px"
                },
                {
                    "field": "aturanpakai",
                    "title": "Aturan Pakai",
                    "width": "100px"
                },
                {
                    "field": "jumlah",
                    "title": "Qty",
                    "width": "100px"
                },
                // {
                //     "field": "namalengkap",
                //     "title": "Dokter",
                //     "width" : "100px"
                // },
                {
                    "field": "namaruangan",
                    "title": "Apotik",
                    "width": "70px",
                },
                // {
                //     "field": "statusorder",
                //     "title": "Status",
                //     "width" : "70px",
                // }
            ];

            $scope.detailGridOptions = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            field: "rke",
                            title: "Rke",
                            width: "30px",
                        },
                        {
                            field: "jeniskemasan",
                            title: "Jenis Kemasan",
                            width: "100px",
                        },
                        {
                            field: "namaproduk",
                            title: "Deskripsi",
                            width: "200px"
                        },
                        {
                            field: "satuanstandar",
                            title: "Satuan",
                            width: "100px"
                        },
                        {
                            field: "aturanpakai",
                            title: "Aturan Pakai",
                            width: "100px"
                        },
                        {
                            field: "jumlah",
                            title: "Qty",
                            width: "100px"
                        }]
                };
            };

            $scope.editObat = function () {
                if ($scope.item.statusorder === "Verifikasi") {
                    $state.go('EditResepElektronik', { norec_so: $scope.item.norec_so })
                } else {
                    toastr.info('Tidak bisa edit Resep')
                }
            }

            $scope.lihatResep = function () {
                if ($scope.item.no) {
                    manageLogistikPhp.getDataTableTransaksi("rekam-medis/get-resep-dokter-detail?strukorder=" + $scope.item.norec_so, true).then(res => {
                        $scope.dataResepDetail = res.data.data;
                        $scope.showLoader = false;
                        for (let i = 0; i < res.data.data.length; i++) {
                            if (res.data.data[i].obat.length > 1) {
                                $scope.dataResepDetail[i]["jenisKemasan"] = "Racikan";
                            } else {
                                $scope.dataResepDetail[i]["jenisKemasan"] = "Non Racikan";
                            };
                        };


                    });
                    $scope.popupLihatObat.open().center();
                };
            };

            $scope.printCopyResep = function () {
                console.log($scope.item);
                window.open(cetakHelper.openURLReporting("reporting/resep?struk_order_id=" + $scope.item.norec_so));
            }
        }
    ]);
});