define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanPasienCovidCtrl', ['$q', '$rootScope', '$scope', 'ManagePhp', '$state', 'CacheHelper', 'DateHelper', '$mdDialog',
        function ($q, $rootScope, $scope, managePhp, $state, cacheHelper, DateHelper, $mdDialog) {
            $scope.today = new Date();
            $scope.tanggalPasienMasuk = new Date();
            $scope.isRouteLoading = true;

            $scope.onChangeTab = (index) => {
                // console.log(index);
            }

            $scope.listRiwayatPasien = [{
                name: "Komorbid",
                value: 1
            }, {
                name: "Tanpa Komorbid",
                value: 2
            }];

            $scope.riwayatPasien = {
                name: "Komorbid",
                value: 1
            }

            // #region PASIEN MASUK 
            let getDataPasienMasuk = () => {
                $scope.optGroupPasienMasuk = {
                    pageable: true,
                    scrollable: true,
                    columns: [{
                        field: "tanggal",
                        title: "Tanggal",
                        width: "100px",
                    }, {
                        field: "tgl_lapor",
                        title: "Tanggal <br> Lapor",
                        width: "100px",
                    }, {
                        field: "koders",
                        title: "Koders",
                        width: "100px",
                    }, {
                        title: "IGD Suspect",
                        width: "100px",
                        columns: [{
                            field: "igd_suspect_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "igd_suspect_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {
                        title: "IGD Konfirm",
                        width: "100px",
                        columns: [{
                            field: "igd_confirm_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "igd_confirm_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {
                        title: "Rawat Jalan Suspect",
                        width: "100px",
                        columns: [{
                            field: "rj_suspect_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "rj_suspect_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {
                        title: "Rawat Jalan Konfirm",
                        width: "100px",
                        columns: [{
                            field: "rj_confirm_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "rj_confirm_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {
                        title: "Rawat Inap Suspect",
                        width: "100px",
                        columns: [{
                            field: "ri_suspect_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "ri_suspect_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {
                        title: "Rawat Inap Konfirm",
                        width: "100px",
                        columns: [{
                            field: "ri_confirm_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "ri_confirm_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {
                        command: [{
                            text: "Hapus",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: confirmHapusPasienMasuk,
                        }],
                        title: "",
                        width: "100px",
                        attributes: {
                            style: "text-align:center;valign=middle"
                        },
                    }]
                }

                managePhp.getDataBridgingRSOnline("get-pasien-masuk").then(res => {
                    $scope.dataSourcePasienMasuk = new kendo.data.DataSource({
                        data: res.data.data.RekapPasienMasuk,
                        pageSize: 20
                    });
                    $scope.isRouteLoading = false;
                })
            }
            getDataPasienMasuk();

            $scope.simpanRekapPasienMasuk = () => {
                $scope.isRouteLoading = true;
                let dataSave = {
                    tanggal: $scope.tanggalPasienMasuk ? DateHelper.formatDate($scope.tanggalPasienMasuk, "YYYY-MM-DD") : $scope.tanggalPasienMasuk,
                    igd_suspect_l: $scope.igdSuspectL ? $scope.igdSuspectL : "0",
                    igd_suspect_p: $scope.igdSuspectP ? $scope.igdSuspectP : "0",
                    igd_confirm_l: $scope.igdKonfirmL ? $scope.igdKonfirmL : "0",
                    igd_confirm_p: $scope.igdKonfirmP ? $scope.igdKonfirmP : "0",
                    rj_suspect_l: $scope.rjSuspectL ? $scope.rjSuspectL : "0",
                    rj_suspect_p: $scope.rjSuspectP ? $scope.rjSuspectP : "0",
                    rj_confirm_l: $scope.rjKonfirmL ? $scope.rjKonfirmL : "0",
                    rj_confirm_p: $scope.rjKonfirmP ? $scope.rjKonfirmP : "0",
                    ri_suspect_l: $scope.riSuspectL ? $scope.riSuspectL : "0",
                    ri_suspect_p: $scope.riSuspectP ? $scope.riSuspectP : "0",
                    ri_confirm_l: $scope.riKonfirmL ? $scope.riKonfirmL : "0",
                    ri_confirm_p: $scope.riKonfirmP ? $scope.riKonfirmP : "0",
                }

                console.log(dataSave);

                managePhp.saveDataBridgingRSOnline("send-pasien-masuk/" + DateHelper.formatDate($scope.tanggalPasienMasuk, "YYYY-MM-DD"), dataSave).then(res => {
                    $scope.isRouteLoading = false;
                    $scope.igdSuspectL = "";
                    $scope.igdSuspectP = "";
                    $scope.igdKonfirmL = "";
                    $scope.igdKonfirmP = "";
                    $scope.rjSuspectL = "";
                    $scope.rjSuspectP = "";
                    $scope.rjKonfirmL = "";
                    $scope.rjKonfirmP = "";
                    $scope.riSuspectL = "";
                    $scope.riSuspectP = "";
                    $scope.riKonfirmL = "";
                    $scope.riKonfirmP = "";
                    getDataPasienMasuk();
                })
            }

            function confirmHapusPasienMasuk(e) {
                e.preventDefault();

                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);

                var confirm = $mdDialog.confirm()
                    .title('Peringatan')
                    .textContent('Apakah anda yakin mau menghapus data ini? ')
                    .ariaLabel('Lucky day')
                    .ok('Ya')
                    .cancel('Batal')
                $mdDialog.show(confirm).then(function () {
                    $scope.deleteDataPasienMasuk(dataItem);

                })
            }

            $scope.deleteDataPasienMasuk = (data) => {
                // tanggal
                console.log(data);

                let dataDelete = {
                    tanggal: data.tanggal
                }

                managePhp.deleteDataBridgingRSOnline("send-hapus-pasien-masuk/" + data.tanggal, dataDelete).then(res => {
                    console.log(res);
                })
            }

            // #endregion PASIEN MASUK

            // #region PASIEN DIRAWAT
            $scope.optGroupPasienDirawat = {
                pageable: true,
                scrollable: true,
                columns: [{
                        field: "tanggal",
                        title: "Tanggal",
                        width: "100px",
                    },
                    {
                        field: "tgl_lapor",
                        title: "Tanggal<br>Lapor",
                        width: "150px",
                    }, {
                        field: "koders",
                        title: "Kode RS",
                        width: "100px"
                    }, {
                        title: "ICU dengan<br> Ventilator Konfirm",
                        width: "250px",
                        columns: [{
                            field: "icu_dengan_ventilator_confirm_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "icu_dengan_ventilator_confirm_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {
                        title: "ICU dengan<br> Ventilator Suspect",
                        width: "250px",
                        columns: [{
                            field: "icu_dengan_ventilator_suspect_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "icu_dengan_ventilator_suspect_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {
                        title: "ICU tanpa<br> Ventilator Konfirm",
                        width: "250px",
                        columns: [{
                            field: "icu_tanpa_ventilator_confirm_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "icu_tanpa_ventilator_confirm_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {
                        title: "ICU tanpa<br> Ventilator Suspect",
                        width: "250px",
                        columns: [{
                            field: "icu_tanpa_ventilator_suspect_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "icu_tanpa_ventilator_suspect_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {
                        title: "ICU Tekanan Negatif<br>dengan Ventilator<br> Konfirm",
                        width: "250px",
                        columns: [{
                            field: "icu_tekanan_negatif_dengan_ventilator_confirm_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "icu_tekanan_negatif_dengan_ventilator_confirm_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {

                        title: "ICU Tekanan Negatif<br>dengan Ventilator<br> Suspect",
                        width: "250px",
                        columns: [{
                            field: "icu_tekanan_negatif_dengan_ventilator_suspect_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "icu_tekanan_negatif_dengan_ventilator_suspect_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {

                        title: "ICU Tekanan Negatif<br>tanpa Ventilator<br> Konfirm",
                        width: "250px",
                        columns: [{
                            field: "icu_tekanan_negatif_tanpa_ventilator_confirm_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "icu_tekanan_negatif_tanpa_ventilator_confirm_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {

                        title: "ICU Tekanan Negatif<br>tanpa Ventilator<br> Suspect",
                        width: "250px",
                        columns: [{
                            field: "icu_tekanan_negatif_tanpa_ventilator_suspect_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "icu_tekanan_negatif_tanpa_ventilator_suspect_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {

                        title: "Isolasi tanpa<br> Tekanan <br> Negatif Konfirm",
                        width: "250px",
                        columns: [{
                            field: "isolasi_tanpa_tekanan_negatif_confirm_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "isolasi_tanpa_tekanan_negatif_confirm_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {

                        title: "Isolasi tanpa Tekanan <br> Negatif Suspect",
                        width: "250px",
                        columns: [{
                            field: "isolasi_tanpa_tekanan_negatif_suspect_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "isolasi_tanpa_tekanan_negatif_suspect_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {

                        title: "Isolasi Tekanan <br> Negatif Konfirm",
                        width: "250px",
                        columns: [{
                            field: "isolasi_tekanan_negatif_confirm_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "isolasi_tekanan_negatif_confirm_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {

                        title: "Isolasi Tekanan <br> Negatif Suspect",
                        width: "250px",
                        columns: [{
                            field: "isolasi_tekanan_negatif_suspect_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "isolasi_tekanan_negatif_suspect_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {

                        title: "NICU Khusus<br>Covid Konfirm",
                        width: "250px",
                        columns: [{
                            field: "nicu_khusus_covid_confirm_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "nicu_khusus_covid_confirm_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {

                        title: "NICU Khusus<br>Covid Suspect",
                        width: "250px",
                        columns: [{
                            field: "nicu_khusus_covid_suspect_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "nicu_khusus_covid_suspect_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {

                        title: "PICU Khusus<br>Covid Konfirm",
                        width: "250px",
                        columns: [{
                            field: "picu_khusus_covid_confirm_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "picu_khusus_covid_confirm_p",
                            title: "P",
                            width: "70px",
                        }]
                    }, {

                        title: "PICU Khusus<br>Covid Suspect",
                        width: "250px",
                        columns: [{
                            field: "picu_khusus_covid_suspect_l",
                            title: "L",
                            width: "70px",
                        }, {
                            field: "picu_khusus_covid_suspect_p",
                            title: "P",
                            width: "70px",
                        }]
                    },
                ]
            }

            let getDataPasienDirawat = () => {
                let url = $scope.riwayatPasien.value === 1 ? "get-pasien-dirawat-komorbid" : "get-pasien-dirawat-tanpa-komorbid";

                managePhp.getDataBridgingRSOnline(url).then(res => {
                    console.log(res);
                    // data.data.RekapPasienDirawatTanpaKomorbid
                    let dataGrid = $scope.riwayatPasien.value === 1 ? res.data.data.RekapPasienDirawatKomorbid : res.data.data.RekapPasienDirawatTanpaKomorbid;
                    if ($scope.riwayatPasien.value === 2) {
                        // res.data.data.RekapPasienDirawatTanpaKomorbid
                        for (let i in res.data.data.RekapPasienDirawatTanpaKomorbid) {
                            console.log(i);
                            res.data.data.RekapPasienDirawatTanpaKomorbid[i].icu_tekanan_negatif_dengan_ventilator_confirm_l = res.data.data.RekapPasienDirawatTanpaKomorbid[i].icu_tekanan_negatif_dengan_ventilator_confim_l;
                            res.data.data.RekapPasienDirawatTanpaKomorbid[i].icu_tekanan_negatif_dengan_ventilator_confirm_p = res.data.data.RekapPasienDirawatTanpaKomorbid[i].icu_tekanan_negatif_dengan_ventilator_confim_p;
                            res.data.data.RekapPasienDirawatTanpaKomorbid[i].icu_tekanan_negatif_tanpa_ventilator_confirm_l = res.data.data.RekapPasienDirawatTanpaKomorbid[i].icu_tekanan_negatif_tanpa_ventilator_confim_l;
                            res.data.data.RekapPasienDirawatTanpaKomorbid[i].icu_tekanan_negatif_tanpa_ventilator_confirm_p = res.data.data.RekapPasienDirawatTanpaKomorbid[i].icu_tekanan_negatif_tanpa_ventilator_confim_p;
                            // res.data.data.RekapPasienDirawatTanpaKomorbid[i].icu_tekanan_negatif_tanpa_ventilator_confirm_p = res.data.data.RekapPasienDirawatTanpaKomorbid[i].icu_tekanan_negatif_tanpa_ventilator_confirm_p;
                        }
                    }
                    console.log(dataGrid)

                    $scope.dataSourcePasienDirawat = new kendo.data.DataSource({
                        data: dataGrid,
                        pageSize: 20
                    });
                    $scope.isRouteLoading = false;
                })
            }
            getDataPasienDirawat();

            $scope.onChangeRiwayatPasien = () => {
                getDataPasienDirawat();
            }

            $scope.simpanDataPasienDenganKomorbid = () => {
                let data = {
                    tanggal: $scope.tanggalPasienMasuk ? DateHelper.formatDate($scope.tanggalPasienMasuk, "YYYY-MM-DD") : $scope.tanggalPasienMasuk,
                    icu_dengan_ventilator_suspect_l: "0",
                    icu_dengan_ventilator_suspect_p: "0",
                    icu_dengan_ventilator_confirm_l: "2",
                    icu_dengan_ventilator_confirm_p: "0",
                    icu_tanpa_ventilator_suspect_l: "2",
                    icu_tanpa_ventilator_suspect_p: "5",
                    icu_tanpa_ventilator_confirm_l: "2",
                    icu_tanpa_ventilator_confirm_p: "0",
                    icu_tekanan_negatif_dengan_ventilator_suspect_l: "0",
                    icu_tekanan_negatif_dengan_ventilator_suspect_p: "0",
                    icu_tekanan_negatif_dengan_ventilator_confim_l: "0",
                    icu_tekanan_negatif_dengan_ventilator_confim_p: "0",
                    icu_tekanan_negatif_tanpa_ventilator_suspect_l: "0",
                    icu_tekanan_negatif_tanpa_ventilator_suspect_p: "0",
                    icu_tekanan_negatif_tanpa_ventilator_confim_l: "0",
                    icu_tekanan_negatif_tanpa_ventilator_confim_p: "0",
                    isolasi_tekanan_negatif_suspect_l: "2",
                    isolasi_tekanan_negatif_suspect_p: "2",
                    isolasi_tekanan_negatif_confirm_l: "7",
                    isolasi_tanpa_tekanan_negatif_suspect_l: "5",
                    isolasi_tanpa_tekanan_negatif_suspect_p: "24",
                    isolasi_tanpa_tekanan_negatif_confirm_l: "5",
                    isolasi_tanpa_tekanan_negatif_confirm_p: "15",
                    nicu_khusus_covid_suspect_l: "0",
                    nicu_khusus_covid_suspect_p: "0",
                    nicu_khusus_covid_confirm_l: "0",
                    nicu_khusus_covid_confirm_p: "0",
                    picu_khusus_covid_suspect_l: "1",
                    picu_khusus_covid_suspect_p: "0",
                    picu_khusus_covid_confirm_l: "0",
                    picu_khusus_covid_confirm_p: "0"
                }
            }

            // #endregion PASIEN DIRAWAT

            // #region Pasien Keluar
            let getDataRekapPasienKeluar = () => {
                $scope.optGroupPasienKeluar = {
                    pageable: true,
                    scrollable: true,
                    columns: [{
                            field: "koders",
                            title: "Kode RS",
                            width: "100px"
                        },
                        {
                            field: "tanggal",
                            title: "Tanggal",
                            width: "100px"
                        },
                        {
                            field: "tgl_lapor",
                            title: "Tanggal<br> Lapor",
                            width: "150px"
                        },
                        {
                            field: "sembuh",
                            title: "Sembuh",
                            width: "100px"
                        },
                        {
                            field: "discarded",
                            title: "Discarded",
                            width: "100px"
                        },
                        {
                            field: "meninggal_komorbid",
                            title: "Meninggal<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_tanpa_komorbid",
                            title: "Meninggal<br>tanpa<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_pre_komorbid",
                            title: "Meninggal<br>prob Pre<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_neo_komorbid",
                            title: "Meninggal<br> prob Neo<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_bayi_komorbid",
                            title: "Meninggal<br>prob Bayi<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_balita_komorbid",
                            title: "Meninggal<br> prob Balita<br>komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_anak_komorbid",
                            title: "Meninggal<br>prob Anak<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_remaja_komorbid",
                            title: "Meninggal<br>prob Remaja<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_dws_komorbid",
                            title: "Meninggal<br>prob Dewasa<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_lansia_komorbid",
                            title: "Meninggal<br>prob Lansia<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_pre_tanpa_komorbid",
                            title: "Meninggal<br>prob pre<br>tanpa<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_neo_tanpa_komorbid",
                            title: "Meninggal<br>prob Neo<br>tanpa<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_bayi_tanpa_komorbid",
                            title: "Meninggal<br>prob Bayi<br>tanpa<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_balita_tanpa_komorbid",
                            title: "Meninggal<br>prob Balita<br>tanpa<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_anak_tanpa_komorbid",
                            title: "Meninggal<br>prob Anak<br>tanpa<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_remaja_tanpa_komorbid",
                            title: "Meninggal<br>prob Remaja<br>tanpa<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_dws_tanpa_komorbid",
                            title: "Meninggal<br>prob Dewasa<br>tanpa<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_prob_lansia_tanpa_komorbid",
                            title: "Meninggal<br>prob Lansia<br>tanpa<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_discarded_komorbid",
                            title: "Meninggal<br>Discarded<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "meninggal_discarded_tanpa_komorbid",
                            title: "Meninggal<br>Disacarded<br>tanpa<br>Komorbid",
                            width: "100px"
                        },
                        {
                            field: "dirujuk",
                            title: "Di Rujuk",
                            width: "100px"
                        },
                        {
                            field: "isman",
                            title: "Isolasi<br>Mandiri",
                            width: "100px"
                        },
                        {
                            field: "aps",
                            title: "APS",
                            width: "100px"
                        },
                    ]
                }
                // localhost:7878/service-bridging-integerasi-covid/get-pasien-keluar
                managePhp.getDataBridgingRSOnline("get-pasien-keluar").then(res => {
                    // console.log(res.data.RekapPasienKeluar);
                    $scope.dataSourcePasienKeluar = new kendo.data.DataSource({
                        data: res.data.data.RekapPasienKeluar,
                        pageSize: 20
                    });
                    $scope.isRouteLoading = false;
                })
            }

            getDataRekapPasienKeluar();
            $scope.simpanRekapPasienKeluar = () => {
                let data = {
                    tanggal: $scope.tanggalPasienMasuk ? DateHelper.formatDate($scope.tanggalPasienMasuk, "YYYY-MM-DD") : $scope.tanggalPasienMasuk,
                    sembuh: $scope.sembuh,
                    discarded: $scope.discarded,
                    meninggal_komorbid: $scope.meninggalKomorbid,
                    meninggal_tanpa_komorbid: $scope.meninggalTanpaKomorbid,
                    meninggal_prob_pre_komorbid: $scope.meninggalProbPreKomorbid,
                    meninggal_prob_neo_komorbid: $scope.meninggalProbNeoKomorbid,
                    meninggal_prob_bayi_komorbid: $scope.meninggalProbBayiKomorbid,
                    meninggal_prob_balita_komorbid: $scope.meninggalProbBalitaKomorbid,
                    meninggal_prob_anak_komorbid: $scope.meninggalProbAnakKomorbid,
                    meninggal_prob_remaja_komorbid: $scope.meninggalProbRemajaKomorbid,
                    meninggal_prob_dws_komorbid: $scope.meninggalProbDwsKomorbid,
                    meninggal_prob_lansia_komorbid: $scope.meninggalProbLansiaKomorbid,
                    meninggal_prob_pre_tanpa_komorbid: $scope.meninggalProbPreTanpaKomorbid,
                    meninggal_prob_neo_tanpa_komorbid: $scope.meninggalProbNeoTanpaKomorbid,
                    meninggal_prob_bayi_tanpa_komorbid: $scope.meninggalProbBayiTanpaKomorbid,
                    meninggal_prob_balita_tanpa_komorbid: $scope.meninggalProbBalitaTanpaKomorbid,
                    meninggal_prob_anak_tanpa_komorbid: $scope.meninggalProbAnakTanpaKomorbid,
                    meninggal_prob_remaja_tanpa_komorbid: $scope.meninggalProbRemajaTanpaKomorbid,
                    meninggal_prob_dws_tanpa_komorbid: $scope.meninggalProbDwsTanpaKomorbid,
                    meninggal_prob_lansia_tanpa_komorbid: $scope.meninggalProbLansiaTanpaKomorbid,
                    meninggal_disarded_komorbid: $scope.meninggal_disarded_komorbid,
                    meninggal_discarded_tanpa_komorbid: $scope.meninggalDiscardedTanpaKomorbid,
                    dirujuk: $scope.dirujuk,
                    isman: $scope.isman,
                    aps: $scope.aps
                }


            }

            // #endregion Pasien Keluar

            // #region Tempat Tidur
            let getDataTempatTidur = () => {
                $scope.optGroupTempatTidur = {
                    pageable: true,
                    scrollable: true,
                    columns: [{
                        field: "tt",
                        title: "Nama Tempat Tidur",
                        width: "100px"
                    }, {
                        field: "ruang",
                        title: "Ruangan",
                        width: "100px"
                    }, {
                        field: "kode_siranap",
                        title: "Kode Siranap",
                        width: "100px"
                    }, {
                        field: "jumlah_ruang",
                        title: "Jumlah Ruangan",
                        width: "100px"
                    }, {
                        field: "jumlah",
                        title: "Jumlah",
                        width: "100px"
                    }, {
                        field: "terpakai",
                        title: "Terpakai",
                        width: "100px"
                    }, {
                        field: "prepare",
                        title: "Prepare",
                        width: "100px"
                    }, {
                        field: "prepare_plan",
                        title: "Prepare Plan",
                        width: "100px"
                    }, {
                        field: "kosong",
                        title: "Kosong",
                        width: "100px"
                    }, {
                        field: "covid",
                        title: "COVID",
                        width: "100px"

                    }, ]
                }

                // localhost:7878/service-bridging-integerasi-covid/get-referensi-tempat-tidur
                managePhp.getDataBridgingRSOnline("get-referensi-tempat-tidur").then(res => {
                    $scope.listDataReferensiTempatTidur = res.data.data.tempat_tidur;
                })
                // localhost:7878/service-bridging-integerasi-covid/get-tempat-tidur
                managePhp.getDataBridgingRSOnline("get-tempat-tidur").then(res => {
                    console.log(res.data.data.fasyankes);

                    $scope.dataSourceTempatTidur = new kendo.data.DataSource({
                        data: res.data.data.fasyankes,
                        pageSize: 20
                    })
                    $scope.isRouteLoading = false;
                })
            }
            getDataTempatTidur();

            $scope.simpanDataTempatTidur = () => {
                let dataSave = {
                    // id_tt: "1",
                    // tt: "VVIP/ Super VIP",
                    // kode_siranap: jmlRuangan,
                    ruang: $scope.namaRuangan,
                    jumlah_ruang: $scope.jmlRuangan,
                    jumlah: $scope.jumlah,
                    terpakai: $scope.terpakai,
                    prepare: $scope.prepare,
                    prepare_plan: $scope.prepare_plan,
                    kosong: $scope.kosong,
                    covid: $scope.covid,
                }

                console.log(dataSave);
            }

            // #endregion Tempat Tidur

            //#region Data SDM
            let getDataSDM = () => {
                $scope.optGroupDataSDM = {
                    pageable: true,
                    scrollable: true,
                    columns: [{
                        field: "kebutuhan",
                        title: "Kebutuhan",
                        width: "100px"
                    }, {
                        field: "tglupdate",
                        title: "Tanggal Update",
                        width: "100px"
                    }, {
                        field: "jumlah",
                        title: "Jumlah",
                        width: "100px"
                    }, {
                        field: "jumlah_diterima",
                        title: "Jumlah Diterima",
                        width: "100px"
                    }, {
                        field: "jumlah_eksisting",
                        title: "Jumlah Eksisting",
                        width: "100px"
                    }]
                }
                // localhost:7878/service-bridging-integerasi-covid/get-referensi-sdm

                managePhp.getDataBridgingRSOnline("get-referensi-sdm").then(res => {
                    $scope.listReferensiDataSDM = res.data.data.kebutuhan_sdm;
                })

                // localhost:7878/service-bridging-integerasi-covid/get-ketersediaan-sdm
                managePhp.getDataBridgingRSOnline("get-ketersediaan-sdm").then(res => {
                    // console.log('sdm', res);
                    $scope.dataSourceSDM = new kendo.data.DataSource({
                        data: res.data.data.sdm,
                        pageSize: 20
                    })
                })
            }
            getDataSDM();

            $scope.simpanDataSDM = () => {
                let dataSave = {
                    id_kebutuhan: "",
                    jumlah_eksisting: $scope.jumlahEksisting,
                    jumlah: $scope.jumlah,
                    jumlah_diterima: $scope.jumlahDiterima,
                }

                console.log(dataSave);
            }
            //#endregion

            //#region Data ALKSES & APD

            let getDataAlkesApd = () => {
                $scope.optGroupAlkes = {
                    pageable: true,
                    scrollable: true,
                    columns: [{
                        field: "tglupdate",
                        title: "Tanggal Update",
                        width: "100px"
                    }, {
                        field: "kebutuhan",
                        title: "Kebutuhan",
                        width: "100px"
                    }, {
                        field: "jumlah",
                        title: "Jumlah",
                        width: "100px"
                    }, {
                        field: "jumlah_diterima",
                        title: "Jumlah Diterima",
                        width: "100px"
                    }, {
                        field: "jumlah_eksisting",
                        title: "Jumlah Eksisting",
                        width: "100px"
                    }]
                }

                // localhost:7878/service-bridging-integerasi-covid/get-referensi-kebutuhan-apd
                managePhp.getDataBridgingRSOnline("get-referensi-kebutuhan-apd").then(res => {
                    console.log("refs => ", res);
                    $scope.listDataAlkes = res.data.data.kebutuhan_apd;
                    $scope.isRouteLoading = false;
                })
                // localhost:7878/service-bridging-integerasi-covid/get-ketersediaan-apd
                managePhp.getDataBridgingRSOnline("get-ketersediaan-apd").then(res => {
                    $scope.dataSourceAlkes = new kendo.data.DataSource({
                        data: res.data.data.apd,
                        pageSize: 20
                    })
                    $scope.isRouteLoading = false;
                })
            }
            getDataAlkesApd();

            $scope.simpanDataAlkes = () => {

            }
            //#endregion
        }
    ]);
});