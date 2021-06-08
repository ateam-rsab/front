define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('OrderJadwalBedahCtrl', ['$q', '$rootScope', '$scope', '$state', '$timeout', 'DateHelper', 'CacheHelper', 'ManagePhp', 'ManageSdm', "$mdDialog",
        function ($q, $rootScope, $scope, $state, $timeout, DateHelper, cacheHelper, managePhp, ManageSdm, $mdDialog) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.tglPembedahan = new Date();
            $scope.item.tglJadwalPembedahan = new Date();
            $scope.isRouteLoading = false;
            $scope.isSaveLoad = false;
            $scope.pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));
            $scope.dataPasien = JSON.parse(localStorage.getItem('cacheHelper'));
            $scope.item.jenisBedah = "Jenis Operasi Elektif";
            let jenisPegawai = $scope.pegawaiLogin.jenisPegawai.jenispegawai ? $scope.pegawaiLogin.jenisPegawai.jenispegawai : $scope.pegawaiLogin.jenisPegawai.jenisPegawai;
            let idPegawaiLogin = $scope.pegawaiLogin;
            $scope.item.tglOperasi = new Date();
            var norec_apd = '';
            var norec_pd = '';
            var nocm_str = '';
            $scope.item.qty = 1;
            $scope.riwayatForm = false;
            $scope.inputOrder = true;
            $scope.CmdOrderPelayanan = true;
            $scope.OrderPelayanan = false;
            $scope.showTombol = false;

            $scope.item.notelp = localStorage.getItem("nomorTelpPasien");
            $scope.isEdit = false;
            $scope.header.DataNoregis = '';
            var myVar = 0;
            var detail = '';

            $scope.dataDaftarJadwalBedah = [];
            $scope.showModalInputJadwal = false;
            $scope.showInputan = false;

            LoadCache();

            function LoadCache() {
                $scope.item.notelp = $scope.item.notelp === null ? $scope.item.notelp : 0;
                var chacePeriode = cacheHelper.get('cacheCPPT');
                if (!chacePeriode) {
                    $scope.item.noMr = chacePeriode[0];
                    $scope.item.namaPasien = chacePeriode[1];
                    $scope.item.jenisKelamin = chacePeriode[2];
                    $scope.item.noregistrasi = chacePeriode[3];
                    $scope.item.umur = chacePeriode[4];
                    $scope.item.kelompokPasien = chacePeriode[5];
                    $scope.item.tglRegistrasi = chacePeriode[6];
                    norec_apd = chacePeriode[7];
                    norec_pd = chacePeriode[8];
                    $scope.item.idKelas = chacePeriode[9];
                    $scope.item.kelas = chacePeriode[10];
                    $scope.item.idRuangan = chacePeriode[11];
                    $scope.item.namaRuangan = chacePeriode[12];
                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true
                    }
                }
            }
            var data2 = [];
            $scope.PegawaiLogin2 = {};
            var namaRuangan = '';
            var namaRuanganFk = '';

            managePhp.getData("rekam-medis/get-combo").then(function (dat) {
                // = dat.data;
            });

            ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true", true).then(function (data) {
                $scope.dataMasterPetugas = data;
            });

            LoadCacheHelper();

            function LoadCacheHelper() {
                var chacePeriode = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.noMr = chacePeriode[0]
                    nocm_str = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    $scope.item.umur = chacePeriode[4]
                    $scope.item.kelompokPasien = chacePeriode[5]
                    $scope.item.tglRegistrasi = chacePeriode[6]
                    norec_apd = chacePeriode[7]
                    norec_pd = chacePeriode[8]
                    $scope.item.idKelas = chacePeriode[9]
                    $scope.item.kelas = chacePeriode[10]
                    $scope.item.idRuangan = chacePeriode[11]
                    $scope.item.namaRuangan = chacePeriode[12]
                    $scope.header.DataNoregis = chacePeriode[13]
                    if ($scope.header.DataNoregis == undefined) {
                        $scope.header.DataNoregis = false;
                    }

                    managePhp.getData("tatarekening/get-sudah-verif?noregistrasi=" +
                        $scope.item.noregistrasi, true).then(function (dat) {
                        $scope.item.statusVerif = dat.data.status;
                    });
                }
            }

            function getLapPascaBedah() {
                managePhp.getData("rekam-medis/get-lap-pasca-bedah?nocm=" + $scope.item.noMr, true).then(function (dat) {
                    $scope.dataDaftar = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {}
                            }
                        }
                    });
                });
            };

            function init() {
                $scope.item.dokterJadwalBedah = {
                    namaLengkap: $scope.pegawaiLogin.namaLengkap,
                    id: $scope.pegawaiLogin.id
                }
                getDataOrderJadwalBedah();
                getLapPascaBedah();

                $scope.listOfPenanganKhusus = [{
                        id: 1,
                        name: 'Minor'
                    },
                    {
                        id: 2,
                        name: 'Medium'
                    },
                    {
                        id: 3,
                        name: 'Mayor'
                    },
                    {
                        id: 4,
                        name: 'Khusus'
                    },
                ];

                $scope.listOfLabelPasien = [{
                        id: 1,
                        name: 'Sudah dipasang'
                    },
                    {
                        id: 3,
                        name: 'Belum dipasang'
                    },
                ];

                $scope.listOfStatus = [{
                        id: 11,
                        name: 'Emergency'
                    },
                    {
                        id: 33,
                        name: 'Elektif'
                    },
                    {
                        id: 34,
                        name: 'Poliklinik'
                    },
                ];

                $scope.listYesOrNo = [{
                        id: 1,
                        name: 'Ya'
                    },
                    {
                        id: 2,
                        name: 'Tidak'
                    },
                ];

                $scope.listSesuaiOrNot = [{
                        id: 1,
                        name: 'Sesuai'
                    },
                    {
                        id: 2,
                        name: 'Tidak Sesuai'
                    },
                ];

                managePhp.getData("pelayanan/get-order-penunjang?departemenfk=25&nocm=" + nocm_str + '&norec_apd=' + norec_apd, true).then(function (dat) {
                    $scope.item.ruanganAsal = dat.data.data[0].namaruangan;
                    $scope.listRuanganTujuan = dat.data.ruangantujuan;
                    $scope.item.ruangantujuan = {
                        id: dat.data.ruangantujuan[0].id,
                        namaruangan: dat.data.ruangantujuan[0].namaruangan
                    };
                    $scope.listLayanan = dat.data.produk;
                    namaRuanganFk = dat.data.data[0].objectruanganfk;
                    norec_pd = dat.data.data[0].noregistrasifk;
                });

                managePhp.getData("get-detail-login", true).then(function (dat) {
                    $scope.PegawaiLogin2 = dat.data;
                });

                if ($scope.header.DataNoregis == true) {
                    managePhp.getData('laporan/get-order-ok?noregistrasi=' + $scope.item.noregistrasi).then(function (e) {
                        for (var i = e.data.daftar.length - 1; i >= 0; i--) {
                            e.data.daftar[i].no = i + 1;
                        }
                        $scope.dataGridRiwayat = new kendo.data.DataSource({
                            data: e.data.daftar,
                            pageSize: 10
                        });

                    });
                } else {
                    managePhp.getData('laporan/get-order-ok?NoCM=' + $scope.item.noMr).then(function (e) {
                        for (var i = e.data.daftar.length - 1; i >= 0; i--) {
                            e.data.daftar[i].no = i + 1
                        }
                        $scope.dataGridRiwayat = new kendo.data.DataSource({
                            data: e.data.daftar,
                            pageSize: 10
                        });

                    });
                }
                $scope.treeSourceRuangan = [];
                managePhp.getData("rekam-medis/get-menu-rekam-medis-dynamic?namaemr=bedah").then(function (e) {
                    var inlineDefault = new kendo.data.HierarchicalDataSource({
                        data: e.data.data,
                        schema: {
                            model: {
                                children: "child",
                                expanded: true
                            }
                        }
                    });
                    $scope.treeSourceBedah = inlineDefault;
                    $scope.mainTreeViewBedahOption = {
                        dataTextField: ["caption"],
                        datakKeyField: ["id"],
                        select: onSelect,
                        dragAndDrop: true,
                        checkboxes: false
                    }
                    // var treeview = $("#treeview").data("kendoTreeView");
                    // .expandPath([2, 5])
                });
            };

            init();

            $scope.columnDaftarJadwalBedah = {
                toolbar: [{
                        name: "create",
                        text: "Input Baru",
                        template: '<button ng-click="inputBaruJadwalBedah()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Baru</button>'
                    },
                    {
                        template: '<button ng-click="gotToDashboard()" class="k-button k-button-icontext k-grid-upload">Dashboard Bedah</button>'
                    }
                ],
                scrollable: true,
                selectable: 'row',
                pageable: true,
                columns: [{
                        "field": "tgloperasi",
                        "title": "<h3>Tanggal<br> Permintaan Bedah</h3>",
                        "width": 200,
                        "template": "<span class='style-left'>#: tgloperasi ? tgloperasi : '-' #</span>"
                    },
                    {
                        "field": "tglverifikasi",
                        "title": "<h3>Tanggal Bedah</h3>",
                        "width": 200,
                        "template": "<span class='style-left'>#: tglverifikasi ? tglverifikasi : '-' #</span>"
                    },
                    {
                        "field": "noregistrasi",
                        "title": "<h3>No.<br> Registrasi</h3>",
                        "width": 100
                    },
                    {
                        "field": "namaDokterTujuan",
                        "title": "<h3>Dokter yang<br> mengerjakan</h3>",
                        "width": 200
                    },
                    {
                        "field": "namaRuanganTujuan",
                        "title": "<h3>Ruangan Tujuan</h3>",
                        "width": 200
                    },
                    {
                        "field": "namaruangan",
                        "title": "<h3>Nama Ruangan</h3>",
                        "width": 200
                        // "template": "<span class='style-left'>#: if(!namaruangan) { namaruangan = '' } #</span>"
                    },
                    {
                        "field": "ruangoperasiFormatted",
                        "title": "<h3>Nama<br> Ruangan Bedah</h3>",
                        "width": 200
                        // "template": "<span class='style-left'>#: if(!namaruangan) { namaruangan = '' } #</span>"
                    },
                    {
                        "field": "telp",
                        "title": "<h3>No. Telepon</h3>",
                        "width": 200,
                        // "template": "<span class='style-left'>#: notelp ? notelp : '-' #</span>"
                    },
                    {
                        "field": "statusBedah",
                        "title": "<h3>Sifat Bedah</h3>",
                        "width": 200,
                        // "template": "<span class='style-left'>#: iscito ? 'CITO' : 'Jenis Operasi Elektif' #</span>"
                    },
                    {
                        command: [{
                            text: "Detail",
                            click: detailJadwalBedah,
                            imageClass: "k-icon k-i-pencil"
                        }, ],
                        title: "",
                        width: 100
                    }
                ]
            };

            $scope.gotToDashboard = function () {
                $state.go('DashboardRuanganBedah')
            }

            function clearJadwal() {
                $scope.item.tglJadwalPembedahan = "";
                $scope.item.lamaOperasi = null;
                // $scope.item.dokterJadwalBedah = null;

                $scope.item.diagnosaJadwalBedah = "";
                $scope.item.tindakanJadwalBedah = "";
                $scope.item.posisiKhusus = "";
                $scope.item.macamAnastesi = "";
                $scope.norecJadwalBedah = "";
            }

            function detailJadwalBedah(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                // console.log(dataItem);

                $scope.isEdit = true;
                $scope.item.jenisBedah = "Jenis Operasi Elektif";
                $scope.isVerif = dataItem.tglverifikasi ? true : false;
                $scope.item.tglJadwalPembedahan = new Date(dataItem.tgloperasi);
                $scope.item.lamaOperasi = dataItem.lamaoperasi;
                $scope.item.dokterJadwalBedah = {
                    namaLengkap: dataItem.namaDokterTujuan,
                    id: dataItem.doktertujuanfk
                };
                $scope.norecJadwalBedah = dataItem.norec;
                $scope.item.diagnosaJadwalBedah = dataItem.diagnosa;
                $scope.item.tindakanJadwalBedah = dataItem.tindakan;
                $scope.item.posisiKhusus = dataItem.posisikhusus;
                $scope.item.macamAnastesi = dataItem.macamanestesi;
                $scope.item.notelp = dataItem.telp ? dataItem.telp : 0;
                $scope.showModalInputJadwal.open().center();
            }

            function getDataOrderJadwalBedah() {
                managePhp.getData("rekam-medis/get-jadwal-operasi?nocm=" + $scope.item.noMr, true).then(function (data) {
                    for (let i = 0; i < data.data.data.length; i++) {
                        data.data.data[i].ruangoperasiFormatted = data.data.data[i].ruangoperasi ? data.data.data[i].ruangoperasi : '-';
                        data.data.data[i].statusBedah = data.data.data[i].iscito ? 'CITO' : "Jenis Operasi Elektif";
                    };

                    $scope.dataDaftarJadwalBedah = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 20
                    })

                });
            }

            $scope.closeModalJadwalBedah = function () {
                $scope.showModalInputJadwal.close();
                clearJadwal();
            }

            $scope.saveOrderBedah = function () {
                let nocm = $("#idNoCM").val();
                // console.log(nocm);
                // bugs, kadang no cm hilang
                if (!$scope.item.noMr) {
                    $scope.item.noMr = nocm;
                    // return;
                }

                if (!$scope.item.tglJadwalPembedahan) {
                    toastr.info("Tanggal Bedah belum dipilih!");
                    return;
                }

                if (!$scope.item.lamaOperasi) {
                    toastr.info("Harap isi Lama Operasi!");
                    return;
                }

                if (!$scope.item.notelp) {
                    toastr.info("Harap isi Nomor Telepon!");
                    return;
                }
                if (!$scope.item.dokterJadwalBedah) {
                    toastr.info("Harap pilih Dokter Bedah!");
                    return;
                }
                if (!$scope.item.diagnosaJadwalBedah) {
                    toastr.info("Harap isi Diagnosa!");
                    return;
                }
                if (!$scope.item.tindakanJadwalBedah) {
                    toastr.info("Harap isi Tindakan!");
                    return;
                }
                if (!$scope.item.posisiKhusus) {
                    toastr.info("Harap isi Posisi Khusus/Peralatan khusus!");
                    return;
                }

                if (!$scope.item.macamAnastesi) {
                    toastr.info("Harap isi Macam Anestesi!");
                    return;
                }

                $scope.isSaveLoad = true;
                $scope.isRouteLoading = true;
                let data = {
                    norec: $scope.norecJadwalBedah,
                    pasienfk: $scope.item.noMr,
                    dokterfk: $scope.pegawaiLogin.id,
                    doktertujuanfk: $scope.item.dokterJadwalBedah.id,
                    noregistrasifk: norec_apd,
                    ruanganfk: $scope.item.idRuangan,
                    ruangantujuanfk: 44,
                    iscito: $scope.item.jenisBedah === "CITO" ? true : false,
                    tglinput: DateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm'),
                    tgloperasi: DateHelper.formatDate($scope.item.tglJadwalPembedahan, 'YYYY-MM-DD HH:mm'),
                    diagnosa: $scope.item.diagnosaJadwalBedah,
                    tindakan: $scope.item.tindakanJadwalBedah,
                    posisikhusus: $scope.item.posisiKhusus,
                    macamanestesi: $scope.item.macamAnastesi,
                    lamaoperasi: $scope.item.lamaOperasi,
                    
                    telp: $scope.item.notelp
                };
                console.log(data);

                managePhp.postData(data, 'rekam-medis/save-jadwal-operasi/save').then(function (e) {
                    // init();
                    getDataOrderJadwalBedah();
                    clearJadwal();
                    LoadCache();
                    $scope.isSaveLoad = false;
                    $scope.closeModalJadwalBedah();
                    $scope.isRouteLoading = false;
                });
            }

            $scope.Batal = function () {
                $scope.showInputan = false;
            };

            $scope.showInput = function (namaEMR, noEMR) {
                if (!$scope.showData) {
                    $scope.showData = true;
                } else {
                    $scope.showData = false;
                }

            };

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            };

            $scope.inputBaru = function () {
                if (jenisPegawai != "DOKTER") {
                    toastr.info("Anda tidak bisa menambahkan Laporan Bedah");
                    $scope.isSuster = true;
                    return;
                }
                $scope.isSuster = false;
                $scope.showInputan = true;
                // $scope.item = {};
                // window.scrollBy(0, 50);
            };

            $scope.inputBaruJadwalBedah = function () {
                $scope.item.dokterJadwalBedah = {
                    namaLengkap: $scope.pegawaiLogin.namaLengkap,
                    id: $scope.pegawaiLogin.id
                }
                console.log($scope.pegawaiLogin.namaLengkap)
                $scope.isEdit = false;
                if (jenisPegawai != "DOKTER") {
                    toastr.info("Anda tidak bisa menambahkan Laporan Bedah");
                    $scope.isSuster = true;
                    return;
                }
                $scope.isSuster = false;
                clearJadwal();
                $scope.showModalInputJadwal.open().center();
            }

            /** method utk auto scroll ketika input baru */
            $scope.$watch('showInputan', function (newVal) {
                if (newVal) {
                    $timeout(function () {
                        window.scrollBy({
                            top: 580,
                            behavior: 'smooth'
                        });
                        // console.log('aaaaaaaaaa')
                    }, 100);
                } else {
                    $timeout(function () {
                        window.scrollBy({
                            top: -630,
                            behavior: 'smooth'
                        });
                        // console.log('aaaaaaaaaa')
                    }, 100);
                }

            });

            $scope.columnDaftar = {
                toolbar: [{
                    name: "create",
                    text: "Input Baru",
                    template: '<button ng-click="inputBaru()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Baru</button>'
                }],
                selectable: 'row',
                pageable: true,
                columns: [{
                        "field": "tglbedah",
                        "title": "<h3>Tanggal Bedah</h3>",
                        "width": "80px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglbedah #')}}</span>"
                    },
                    {
                        "field": "noemr",
                        "title": "<h3>No. EMR</h3>",
                        "width": "80px"
                    },
                    {
                        "field": "noregistrasi",
                        "title": "<h3>No. Registrasi</h3>",
                        "width": "150px",
                        "template": "<span class='style-left'>#: noregistrasi #</span>"
                    },
                    {
                        "field": "namaruangan",
                        "title": "<h3>Nama Ruangan</h3>",
                        "width": "150px",
                        // "template": "<span class='style-left'>#: if(!namaruangan) { namaruangan = '' } #</span>"
                    },
                    {
                        command: [{
                                text: "Edit",
                                click: editData,
                                imageClass: "k-icon k-i-pencil"
                            },
                            {
                                text: "Detail",
                                click: detailData,
                                imageClass: "k-icon k-detail"
                            },
                            {
                                text: "Hapus",
                                click: hapusData,
                                imageClass: "k-icon k-i-cancel"
                            },
                            {
                                text: "Cetak",
                                click: cetakBedah,
                                imageClass: "k-icon k-print"
                            }
                        ],
                        title: "",
                        width: 160
                    }
                ]
            };

            function cetakBedah(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                window.open("http://192.168.12.4:7777/service-reporting/lap-bedah/" + dataItem.noverifikasifk);
            }

            $scope.setLamaPembedahan = function () {
                console.log($scope.item.jamMulai);
                console.log($scope.item.jamSelesai);
                var tglAwal = new moment(new Date()).format('YYYY-MM-DD');
                var tglAkhir = new moment(new Date()).format('YYYY-MM-DD');
                var JamAwal = new moment(new Date($scope.item.jamMulai)).format('HH:mm');
                var JamAkhir = new moment(new Date($scope.item.jamSelesai)).format('HH:mm');
                if (JamAwal == 'Invalid date') {
                    var jam = $scope.item.jamMulai.split(":");
                    var setJam = new Date($scope.item.jamSelesai).setHours(jam[0]);
                    JamAwal = new moment(new Date(setJam).setMinutes(jam[1])).format('HH:mm');
                }
                if (JamAkhir == 'Invalid date') {
                    var jam = $scope.item.jamSelesai.split(":");
                    var setJam = new Date($scope.item.jamMulai).setHours(jam[0]);
                    JamAkhir = new moment(new Date(setJam).setMinutes(jam[1])).format('HH:mm');
                }
                // if(JamAwal != 'Invalid date' && JamAkhir != 'Invalid date') {
                if (DateHelper.toTimeStamp($scope.item.jamMulai) > DateHelper.toTimeStamp($scope.item.jamSelesai)) {
                    toastr.info('Jam Selesai tidak boleh kurang dari Jam Mulai');
                    return;
                }
                var TotalWaktu = DateHelper.CountDifferenceHourMinute(tglAwal + " " + JamAwal, tglAkhir + " " + JamAkhir);
                return $scope.item.lamaPembedahan = TotalWaktu;
                // }
            }

            // $scope.$watch('item.tglPembedahan', function(oldVal, newVal) {
            //     if(oldVal != newVal) {
            //         $scope.setLamaPembedahan();
            //     }
            // })

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                if (idPegawaiLogin.id !== dataItem.pegawaifk) {
                    $scope.isSuster = true;
                    toastr.info("Anda tidak memiliki hak akses untuk Edit");
                    return;
                } else {
                    $scope.isSuster = false;
                }
                // console.log(dataItem);
                $scope.item.selectedAsistenOperator = {
                    namaLengkap: dataItem.asistenoperator,
                    id: dataItem.asistenoperatorfk
                };
                $scope.item.selectedPerawatInstrumen = {
                    namaLengkap: dataItem.perawatinst,
                    id: dataItem.perawatinstfk
                };
                $scope.item.selectedDataOperator = {
                    namaLengkap: dataItem.namaoperator,
                    id: dataItem.operatorfk
                };
                $scope.item.selectedPenataAnest = {
                    namaLengkap: dataItem.as,
                    id: dataItem.penataanestesifk
                };
                $scope.item.selectedAnestesiologis = {
                    namaLengkap: dataItem.anestesiologis,
                    id: dataItem.anestesiologisfk
                };
                $scope.item.noRecBedah = dataItem.norec;
                $scope.item.tglPembedahan = dataItem.tglbedah;
                $scope.item.jamMulai = dataItem.jammulai;
                $scope.item.jamSelesai = dataItem.jamselesai;
                $scope.item.lamaPembedahan = dataItem.lamabedah;
                $scope.item.selectedLabelPasien = dataItem.labelpasien;
                $scope.item.selectedPenangananKhusus = dataItem.kondisipenanganan
                $scope.item.selectedStatus = dataItem.status
                $scope.item.tindakanPembedahanSatu = dataItem.tindakanbedah1;
                $scope.item.tindakanPembedahanDua = dataItem.tindakanbedah2;
                $scope.item.tindakanPembedahanTiga = dataItem.tindakanbedah3;
                $scope.item.tindakanPembedahanEmpat = dataItem.tindakanbedah4;
                $scope.item.jaringanPatologi = dataItem.jaringanpatologi;
                $scope.item.uraianPembedahan = dataItem.uraianbedah;
                $scope.item.tekananDarah = dataItem.tekanandarah;
                $scope.item.nadi = dataItem.nadi;
                $scope.item.suhu = dataItem.suhu;
                $scope.item.pernafasan = dataItem.pernafasan;
                // $scope.item.selectedAvailMakan = { name:dataItem.makan, id: dataItem.makan === 'Ya' ? 1:2 };
                $scope.item.selectedAvailMakan = dataItem.makan;
                // $scope.item.selectedAvailMinum = { name:dataItem.minum, id: dataItem.minum === 'Ya' ? 1:2 };
                $scope.item.selectedAvailMinum = dataItem.minum;

                $scope.item.macam = dataItem.infusmacam;
                $scope.item.jumlah = dataItem.infusjml;
                $scope.item.tetesan = dataItem.infustetesan;
                $scope.item.obatObatan = dataItem.obat;
                $scope.item.instruksiKhusus = dataItem.instruksikhusus;
                $scope.item.jmlPendarahan = dataItem.jmlperdarahan;
                $scope.item.komplikasi = dataItem.komplikasi;
                $scope.item.macamJaringan = dataItem.macamjaringan;
                $scope.item.diagnosaPraBedah = dataItem.diagnosaprabedah;
                $scope.item.diagnosaPascaBedah = dataItem.diagnosapascabedah;
                $scope.item.kesuaianDiagnosa = dataItem.kesesuiandiagnosa;

                $timeout(function () {
                    $scope.showInputan = true;
                    window.scrollBy({
                        top: 580,
                        behavior: 'smooth'
                    });
                }, 100);
            }

            function detailData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                // if (jenisPegawai !== "DOKTER" && idPegawaiLogin !== dataItem.pegawaifk) {
                $scope.isSuster = true;
                // }

                // console.log(dataItem);
                $scope.item.selectedAsistenOperator = {
                    namaLengkap: dataItem.asistenoperator,
                    id: dataItem.asistenoperatorfk
                };
                $scope.item.selectedPerawatInstrumen = {
                    namaLengkap: dataItem.perawatinst,
                    id: dataItem.perawatinstfk
                };
                $scope.item.selectedDataOperator = {
                    namaLengkap: dataItem.namaoperator,
                    id: dataItem.operatorfk
                };
                $scope.item.selectedPenataAnest = {
                    namaLengkap: dataItem.as,
                    id: dataItem.penataanestesifk
                };
                $scope.item.selectedAnestesiologis = {
                    namaLengkap: dataItem.anestesiologis,
                    id: dataItem.anestesiologisfk
                };
                $scope.item.noRecBedah = dataItem.norec;
                $scope.item.tglPembedahan = dataItem.tglbedah;
                $scope.item.jamMulai = dataItem.jammulai;
                $scope.item.jamSelesai = dataItem.jamselesai;
                $scope.item.lamaPembedahan = dataItem.lamabedah;
                $scope.item.selectedLabelPasien = dataItem.labelpasien;
                $scope.item.selectedPenangananKhusus = dataItem.kondisipenanganan
                $scope.item.selectedStatus = dataItem.status
                $scope.item.tindakanPembedahanSatu = dataItem.tindakanbedah1;
                $scope.item.tindakanPembedahanDua = dataItem.tindakanbedah2;
                $scope.item.tindakanPembedahanTiga = dataItem.tindakanbedah3;
                $scope.item.tindakanPembedahanEmpat = dataItem.tindakanbedah4;
                $scope.item.jaringanPatologi = dataItem.jaringanpatologi;
                $scope.item.uraianPembedahan = dataItem.uraianbedah;
                $scope.item.tekananDarah = dataItem.tekanandarah;
                $scope.item.nadi = dataItem.nadi;
                $scope.item.suhu = dataItem.suhu;
                $scope.item.pernafasan = dataItem.pernafasan;
                // $scope.item.selectedAvailMakan = { name:dataItem.makan, id: dataItem.makan === 'Ya' ? 1:2 };
                $scope.item.selectedAvailMakan = dataItem.makan;
                // $scope.item.selectedAvailMinum = { name:dataItem.minum, id: dataItem.minum === 'Ya' ? 1:2 };
                $scope.item.selectedAvailMinum = dataItem.minum;

                $scope.item.macam = dataItem.infusmacam;
                $scope.item.jumlah = dataItem.infusjml;
                $scope.item.tetesan = dataItem.infustetesan;
                $scope.item.obatObatan = dataItem.obat;
                $scope.item.instruksiKhusus = dataItem.instruksikhusus;
                $scope.item.jmlPendarahan = dataItem.jmlperdarahan;
                $scope.item.komplikasi = dataItem.komplikasi;
                $scope.item.macamJaringan = dataItem.macamjaringan;
                $scope.item.diagnosaPraBedah = dataItem.diagnosaprabedah;
                $scope.item.diagnosaPascaBedah = dataItem.diagnosapascabedah;
                $scope.item.kesuaianDiagnosa = dataItem.kesesuiandiagnosa;

                $timeout(function () {
                    $scope.showInputan = true;
                    window.scrollBy({
                        top: 580,
                        behavior: 'smooth'
                    });
                }, 100);
            }

            function hapusData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                if (idPegawaiLogin.id !== dataItem.pegawaifk) {
                    toastr.info('Anda tidak memiliki hak akses untuk hapus');
                    return;
                }

                var itemDelete = {
                    "norec": dataItem.norec
                };

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan menghapus Laporan Bedah?')
                    .textContent(`Anda akan menghapus Laporan Bedah dengan No. EMR: ${dataItem.noemr}`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    managePhp.postData(itemDelete, 'rekam-medis/post-lap-pasca-bedah/delete').then(function (e) {
                        if (e.status === 201) {
                            getLapPascaBedah();
                            grid.removeRow(row);
                        }
                    });
                    console.warn('Masuk sini pak eko');
                }, function () {
                    console.error('Tidak jadi hapus pak eko');
                });
            }
            $scope.detailGridOptions = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [{
                            field: "namaproduk",
                            title: "Deskripsi",
                            width: "300px"
                        },
                        {
                            field: "qtyproduk",
                            title: "Qty",
                            width: "100px"
                        }
                    ]
                };
            };

            $scope.back = function () {
                window.history.back();
            };

            // $scope.Simpan = function () { 
            //     var jammulai = $scope.item.jamMulai ? DateHelper.getJamFormatted($scope.item.jamMulai): '';
            //     console.log(jammulai)
            // };

            // $scope.getJamMulai = function (e){
            //     $scope.item.jamMulai = e.currentTarget.value;
            // };

            $scope.Simpan = function () {
                // if (!$scope.item.selectedAnestesiologis &&
                //     !$scope.item.selectedPenataAnest &&
                //     !$scope.item.selectedPerawatInstrumen &&
                //     !$scope.item.selectedDataOperator &&
                //     !$scope.item.selectedAsistenOperator) {
                //     toastr.warning('Belum ada pegawai yg dipilih');
                //     return;
                // }
                // if (!$scope.item.selectedAnestesiologis ||
                //     !$scope.item.selectedPenataAnest ||
                //     !$scope.item.selectedPerawatInstrumen ||
                //     !$scope.item.selectedDataOperator ||
                //     !$scope.item.selectedAsistenOperator) {
                //     toastr.warning('Harap isi semua pegawai');
                //     return;
                //     // } else if(($scope.item.jamMulai == '' || $scope.item.jamMulai == undefined) || ($scope.item.jamMulai == '' || $scope.item.jamMulai == undefined)) {
                //     //     toastr.warning('Jam tidak boleh kosong')
                // }
                if ($scope.item.jamMulai > $scope.item.jamSelesai) {
                    toastr.warning('Jam Mulai tidak boleh kurang dari Jam Selesai');
                    return;
                }

                if ($scope.item.tglPembedahan == undefined || $scope.item.tglPembedahan === "" || $scope.item.tglPembedahan === null) {
                    toastr.warning('Harap isi tanggal pembedahan');
                    return;
                }
                var tglDimulai = '';
                var tglSelesai = '';
                console.log($scope.item.noMr);
                if (!$scope.item.idRuangan || !$scope.item.noMr) {
                    LoadCache();
                }

                if ($scope.item.jamMulai) {
                    if (DateHelper.getJamFormatted(new Date($scope.item.jamMulai)) == 'NaN:NaN') {
                        tglDimulai = $scope.item.jamMulai;
                    } else {
                        tglDimulai = DateHelper.getJamFormatted(new Date($scope.item.jamMulai));
                    }

                } else {
                    tglDimulai = '';
                }

                if ($scope.item.jamSelesai) {
                    if (DateHelper.getJamFormatted(new Date($scope.item.jamSelesai)) === 'NaN:NaN') {
                        tglSelesai = $scope.item.jamSelesai;
                    } else {
                        tglSelesai = DateHelper.getJamFormatted(new Date($scope.item.jamSelesai));
                    }
                } else {
                    tglSelesai = '';
                }

                var dataSave = {
                    anestesiologisfk: $scope.item.selectedAnestesiologis ? $scope.item.selectedAnestesiologis.id : null,
                    ruanganfk: $scope.item.idRuangan,
                    tglbedah: new moment(new Date($scope.item.tglPembedahan)).format('YYYY-MM-DD'),
                    noregistrasifk: norec_apd,
                    pasienfk: $scope.item.noMr,
                    operatorfk: $scope.item.selectedDataOperator ? $scope.item.selectedDataOperator.id : null,
                    penataanestesifk: $scope.item.selectedPenataAnest ? $scope.item.selectedPenataAnest.id : null,
                    asistenoperatorfk: $scope.item.selectedAsistenOperator ? $scope.item.selectedAsistenOperator.id : null,
                    perawatinstfk: $scope.item.selectedPerawatInstrumen ? $scope.item.selectedPerawatInstrumen.id : null,
                    jammulai: tglDimulai,
                    jamselesai: tglSelesai,
                    lamabedah: $scope.item.lamaPembedahan,
                    labelpasien: $scope.item.selectedLabelPasien ? $scope.item.selectedLabelPasien : '',
                    kondisipenanganan: $scope.item.selectedPenangananKhusus ? $scope.item.selectedPenangananKhusus : '',
                    status: $scope.item.selectedStatus ? $scope.item.selectedStatus : '',
                    tindakanbedah1: $scope.item.tindakanPembedahanSatu ? $scope.item.tindakanPembedahanSatu : '',
                    tindakanbedah2: $scope.item.tindakanPembedahanDua ? $scope.item.tindakanPembedahanDua : '',
                    tindakanbedah3: $scope.item.tindakanPembedahanTiga ? $scope.item.tindakanPembedahanTiga : '',
                    tindakanbedah4: $scope.item.tindakanPembedahanEmpat ? $scope.item.tindakanPembedahanEmpat : '',
                    jaringanpatologi: $scope.item.jaringanPatologi ? $scope.item.jaringanPatologi : '',
                    uraianbedah: $scope.item.uraianPembedahan ? $scope.item.uraianPembedahan : '',
                    tekanandarah: $scope.item.tekananDarah ? $scope.item.tekananDarah : '',
                    nadi: $scope.item.nadi ? $scope.item.nadi : '',
                    suhu: $scope.item.suhu ? $scope.item.suhu : '',
                    pernafasan: $scope.item.pernafasan ? $scope.item.pernafasan : '',
                    makan: $scope.item.selectedAvailMakan ? $scope.item.selectedAvailMakan : '',
                    minum: $scope.item.selectedAvailMinum ? $scope.item.selectedAvailMinum : '',
                    infusmacam: $scope.item.macam ? $scope.item.macam : '',
                    infusjml: $scope.item.jumlah ? $scope.item.jumlah : '',
                    infustetesan: $scope.item.tetesan ? $scope.item.tetesan : '',
                    obat: $scope.item.obatObatan ? $scope.item.obatObatan : '',
                    instruksikhusus: $scope.item.instruksiKhusus ? $scope.item.instruksiKhusus : '',
                    norec: $scope.item.noRecBedah ? $scope.item.noRecBedah : '',
                    jmlperdarahan: $scope.item.jmlPendarahan ? $scope.item.jmlPendarahan : '',
                    pegawaifk: idPegawaiLogin.id,
                    komplikasi: $scope.item.komplikasi ? $scope.item.komplikasi : '',
                    macamjaringan: $scope.item.macamJaringan ? $scope.item.macamJaringan : '',
                    diagnosaprabedah: $scope.item.diagnosaPraBedah ? $scope.item.diagnosaPraBedah : '',
                    diagnosapascabedah: $scope.item.diagnosaPascaBedah ? $scope.item.diagnosaPascaBedah : '',
                    kesesuiandiagnosa: $scope.item.kesuaianDiagnosa ? $scope.item.kesuaianDiagnosa : '',
                };

                console.log(dataSave);
                managePhp.postData(dataSave, 'rekam-medis/post-lap-pasca-bedah/save').then(function (e) {
                    if (e.data.message != 'Error') {
                        // init();
                        getLapPascaBedah();
                        // $scope.item = {};
                        $scope.showInputan = false;
                    }
                    //ManagePhp.postLogging('POC', 'Norec planofcare_t',e.data.norec, 'POC').then(function (res) {
                    //})
                });


                //console.log(dataSave);

                /** if ($scope.item.ruangantujuan == undefined) {
                     alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                     return;
                 }
                 if (data2.length == 0) {
                     alert("Pilih layanan terlebih dahulu!!")
                     return;
                 }
                 var objSave = {
                     norec_so:'',
                     norec_apd: norec_apd,
                     norec_pd: norec_pd,
                     qtyproduk: data2.length,//
                     objectruanganfk:namaRuanganFk,
                     objectruangantujuanfk: $scope.item.ruangantujuan.id,
                     departemenfk:25,
                     pegawaiorderfk:$scope.PegawaiLogin2.pegawai[0].id,
                     tgloperasi:moment($scope.item.tglOperasi).format('YYYY-MM-DD hh:mm'),
                     details:data2
                 };
                     
                 managePhp.postOrderLaboratRad(objSave).then(function(e) {
                     // init();
                     $scope.BatalOrder();
                     // $scope.showInputan = false;
                     managePhp.postLogging('Order Jadwal Bedah', 'Norec strukorder_t',e.data.strukorder.norec, 'Menu Dokter').then(function (res) {
                     })
                 }); */
            };

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            };

            function onSelect(e) {
                var data3 = e.sender.dataSource._data
                // var itm = findObjectByKey(data3, 'uid', "245421fd-68db-4d25-8afc-dbe1d20a2056");
                var uid_select = e.node.dataset.uid
                var idTree = '';
                var urlTrue = null;
                for (var i = data3.length - 1; i >= 0; i--) {
                    if (uid_select == data3[i].uid) {
                        idTree = data3[i].id
                        urlTrue = data3[i].reportdisplay
                        break;
                    }
                    if (data3[i].child != undefined) {
                        for (var ii = data3[i].child.length - 1; ii >= 0; ii--) {
                            if (uid_select == data3[i].child[ii].uid) {
                                idTree = data3[i].child[ii].id
                                urlTrue = data3[i].child[ii].reportdisplay
                                break;
                            }
                            if (data3[i].child[ii].child != undefined) {
                                for (var iii = data3[i].child[ii].child.length - 1; iii >= 0; iii--) {
                                    if (uid_select == data3[i].child[ii].child[iii].uid) {
                                        idTree = data3[i].child[ii].child[iii].id
                                        urlTrue = data3[i].child[ii].child[iii].reportdisplay
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                var noemr = '-'
                if ($scope.dataSelected != undefined) {
                    noemr = $scope.dataSelected.noemr
                }
                if (urlTrue == null) {
                    $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                        namaEMR: idTree,
                        nomorEMR: noemr
                    });
                } else {
                    $state.go(urlTrue);
                }
            }
        }
    ]);
});