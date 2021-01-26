define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanPasienCovidCtrl', ['$q', '$rootScope', '$scope', 'ManagePhp', '$state', 'CacheHelper', 'DateHelper', '$mdDialog',
        function ($q, $rootScope, $scope, managePhp, $state, cacheHelper, DateHelper, $mdDialog) {
            $scope.today = new Date();
            $scope.tanggalPasienMasuk = new Date();
            $scope.isRouteLoading = true;
            $(':text').val('0');

            $scope.onChangeTab = (index) => {
                // console.log(index);
                if (index === 1) {
                    getDataPasienMasuk();
                    return;
                }

                if (index === 2) {
                    getDataPasienDirawat();
                    return;
                }

                if (index === 3) {
                    getDataRekapPasienKeluar();
                    return;
                }

                if (index === 4) {
                    getDataTempatTidur();
                    return;
                }

                if (index === 5) {
                    getDataSDM();
                    return;
                }

                if (index === 6) {
                    getDataAlkesApd();
                    return;
                }

                // if(index === 2) {
                //     return;
                // }

                // if(index === 2) {
                //     return;
                // }
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
                $scope.isRouteLoading = true;
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
                        },
                        // {
                        //     field: "koders",
                        //     title: "Koders",
                        //     width: "100px",
                        // },
                        {
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
                        }
                    ]
                }

                managePhp.getDataBridgingRSOnline("get-pasien-masuk").then(res => {
                    $scope.dataSourcePasienMasuk = new kendo.data.DataSource({
                        data: res.data.data.RekapPasienMasuk,
                        pageSize: 20
                    });
                    $scope.isRouteLoading = false;
                })
            }
            // getDataPasienMasuk();

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
                    },
                    // {
                    //     field: "koders",
                    //     title: "Kode RS",
                    //     width: "100px"
                    // },
                    {
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
            // getDataPasienDirawat();

            $scope.onChangeRiwayatPasien = () => {
                getDataPasienDirawat();
            }

            $scope.simpanDataPasienDenganKomorbid = () => {
                let url = $scope.riwayatPasien.value === 1 ? "send-pasien-dirawat-komorbid/" + $scope.tanggalPasienMasuk ? DateHelper.formatDate($scope.tanggalPasienMasuk, "YYYY-MM-DD") : $scope.tanggalPasienMasuk : "send-pasien-dirawat-tanpa-komorbid/" + $scope.tanggalPasienMasuk ? DateHelper.formatDate($scope.tanggalPasienMasuk, "YYYY-MM-DD") : $scope.tanggalPasienMasuk;
                let dataSave = {
                    tanggal: $scope.tanggalPasienMasuk ? DateHelper.formatDate($scope.tanggalPasienMasuk, "YYYY-MM-DD") : new Date(),
                    icu_dengan_ventilator_suspect_l: $scope.icuDenganVentilatorSuspectL,
                    icu_dengan_ventilator_suspect_p: $scope.icuDenganVentilatorSuspectP,
                    icu_dengan_ventilator_confirm_l: $scope.icuDenganVentilatorKonfirmL,
                    icu_dengan_ventilator_confirm_p: $scope.icuDenganVentilatorKonfirmP,
                    icu_tanpa_ventilator_suspect_l: $scope.icuTanpaVentilatorSuspectL,
                    icu_tanpa_ventilator_suspect_p: $scope.icuTanpaVentilatorSuspectP,
                    icu_tanpa_ventilator_confirm_l: $scope.icuTanpaVentilatorKonfirmL,
                    icu_tanpa_ventilator_confirm_p: $scope.icuTanpaVentilatorKonfirmP,
                    icu_tekanan_negatif_dengan_ventilator_suspect_l: $scope.icuTekananNegatifDenganVentilatorSuspectL,
                    icu_tekanan_negatif_dengan_ventilator_suspect_p: $scope.icuTekananNegatifDenganVentilatorSuspectP,
                    icu_tekanan_negatif_dengan_ventilator_confim_l: $scope.icuTekananNegatifDenganVentilatorKonfirmL,
                    icu_tekanan_negatif_dengan_ventilator_confim_p: $scope.icuTekananNegatifDenganVentilatorKonfirmP,
                    icu_tekanan_negatif_tanpa_ventilator_suspect_l: $scope.icuTekananNegatifTanpaVentilatorSuspectL,
                    icu_tekanan_negatif_tanpa_ventilator_suspect_p: $scope.icuTekananNegatifTanpaVentilatorSuspectP,
                    icu_tekanan_negatif_tanpa_ventilator_confim_l: $scope.icuTekananNegatifTanpaVentilatorKonfirmL,
                    icu_tekanan_negatif_tanpa_ventilator_confim_p: $scope.icuTekananNegatifTanpaVentilatorKonfirmP,
                    isolasi_tekanan_negatif_suspect_l: $scope.isolasiTekananNegatifSuspectL,
                    isolasi_tekanan_negatif_suspect_p: $scope.isolasiTekananNegatifSuspectP,
                    isolasi_tekanan_negatif_confirm_l: $scope.isolasiTekananNegatifKonfirmL,
                    isolasi_tekanan_negatif_confirm_p: $scope.isolasiTekananNegatifKonfirmP,
                    isolasi_tanpa_tekanan_negatif_suspect_l: $scope.isolasiTanpaTekananNegatifSuspectL,
                    isolasi_tanpa_tekanan_negatif_suspect_p: $scope.isolasiTanpaTekananNegatifSuspectP,
                    isolasi_tanpa_tekanan_negatif_confirm_l: $scope.isolasiTanpaTekananNegatifKonfirmL,
                    isolasi_tanpa_tekanan_negatif_confirm_p: $scope.isolasiTanpaTekananNegatifKonfirmP,
                    nicu_khusus_covid_suspect_l: $scope.nicuKhususCovidSuspectL,
                    nicu_khusus_covid_suspect_p: $scope.nicuKhususCovidSuspectP,
                    nicu_khusus_covid_confirm_l: $scope.nicuKhususCovidKonfirmL,
                    nicu_khusus_covid_confirm_p: $scope.nicuKhususCovidKonfirmP,
                    picu_khusus_covid_suspect_l: $scope.picuKhususCovidSuspectL,
                    picu_khusus_covid_suspect_p: $scope.picuKhususCovidSuspectP,
                    picu_khusus_covid_confirm_l: $scope.picuKhususCovidKonfirmL,
                    picu_khusus_covid_confirm_p: $scope.picuKhususCovidKonfirmP
                }
                managePhp.saveDataBridgingRSOnline(url, dataSave).then(res => {
                    $scope.isRouteLoading = false;
                    getDataPasienDirawat();
                })

            }
            // #endregion PASIEN DIRAWAT

            // #region Pasien Keluar
            let getDataRekapPasienKeluar = () => {
                $scope.isRouteLoading = true;
                $scope.optGroupPasienKeluar = {
                    pageable: true,
                    scrollable: true,
                    columns: [
                        // {
                        //     field: "koders",
                        //     title: "Kode RS",
                        //     width: "100px"
                        // },
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
            // getDataRekapPasienKeluar();

            $scope.simpanRekapPasienKeluar = () => {
                let data = {
                    tanggal: $scope.tanggalPasienMasuk ? DateHelper.formatDate($scope.tanggalPasienMasuk, "YYYY-MM-DD") : new Date(),
                    sembuh: $scope.sembuh,
                    discarded: $scope.discarded ? $scope.discarded : 0,
                    meninggal_komorbid: $scope.meninggalKomorbid ? $scope.meninggalKomorbid : 0,
                    meninggal_tanpa_komorbid: $scope.meninggalTanpaKomorbid ? $scope.meninggalTanpaKomorbid : 0,
                    meninggal_prob_pre_komorbid: $scope.meninggalProbPreKomorbid ? $scope.meninggalProbPreKomorbid : 0,
                    meninggal_prob_neo_komorbid: $scope.meninggalProbNeoKomorbid ? $scope.meninggalProbNeoKomorbid : 0,
                    meninggal_prob_bayi_komorbid: $scope.meninggalProbBayiKomorbid ? $scope.meninggalProbBayiKomorbid : 0,
                    meninggal_prob_balita_komorbid: $scope.meninggalProbBalitaKomorbid ? $scope.meninggalProbBalitaKomorbid : 0,
                    meninggal_prob_anak_komorbid: $scope.meninggalProbAnakKomorbid ? $scope.meninggalProbAnakKomorbid : 0,
                    meninggal_prob_remaja_komorbid: $scope.meninggalProbRemajaKomorbid ? $scope.meninggalProbRemajaKomorbid : 0,
                    meninggal_prob_dws_komorbid: $scope.meninggalProbDwsKomorbid ? $scope.meninggalProbDwsKomorbid : 0,
                    meninggal_prob_lansia_komorbid: $scope.meninggalProbLansiaKomorbid ? $scope.meninggalProbLansiaKomorbid : 0,
                    meninggal_prob_pre_tanpa_komorbid: $scope.meninggalProbPreTanpaKomorbid ? $scope.meninggalProbPreTanpaKomorbid : 0,
                    meninggal_prob_neo_tanpa_komorbid: $scope.meninggalProbNeoTanpaKomorbid ? $scope.meninggalProbNeoTanpaKomorbid : 0,
                    meninggal_prob_bayi_tanpa_komorbid: $scope.meninggalProbBayiTanpaKomorbid ? $scope.meninggalProbBayiTanpaKomorbid : 0,
                    meninggal_prob_balita_tanpa_komorbid: $scope.meninggalProbBalitaTanpaKomorbid ? $scope.meninggalProbBalitaTanpaKomorbid : 0,
                    meninggal_prob_anak_tanpa_komorbid: $scope.meninggalProbAnakTanpaKomorbid ? $scope.meninggalProbAnakTanpaKomorbid : 0,
                    meninggal_prob_remaja_tanpa_komorbid: $scope.meninggalProbRemajaTanpaKomorbid ? $scope.meninggalProbRemajaTanpaKomorbid : 0,
                    meninggal_prob_dws_tanpa_komorbid: $scope.meninggalProbDwsTanpaKomorbid ? $scope.meninggalProbDwsTanpaKomorbid : 0,
                    meninggal_prob_lansia_tanpa_komorbid: $scope.meninggalProbLansiaTanpaKomorbid ? $scope.meninggalProbLansiaTanpaKomorbid : 0,
                    meninggal_disarded_komorbid: $scope.meninggal_disarded_komorbid ? $scope.meninggal_disarded_komorbid : 0,
                    meninggal_discarded_tanpa_komorbid: $scope.meninggalDiscardedTanpaKomorbid ? $scope.meninggalDiscardedTanpaKomorbid : 0,
                    dirujuk: $scope.dirujuk ? $scope.dirujuk : 0,
                    isman: $scope.isman ? $scope.isman : 0,
                    aps: $scope.aps ? $scope.aps : 0
                }

                managePhp.saveDataBridgingRSOnline("send-pasien-keluar/" + $scope.tanggalPasienMasuk ? DateHelper.formatDate($scope.tanggalPasienMasuk, "YYYY-MM-DD") : new Date(), data).then(res => {
                    $scope.isRouteLoading = false;
                    getDataRekapPasienKeluar();
                })
            }

            // #endregion Pasien Keluar

            // #region Tempat Tidur
            let getDataTempatTidur = () => {
                $scope.isRouteLoading = true;
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

                managePhp.getDataBridgingRSOnline("get-referensi-tempat-tidur").then(res => {
                    $scope.listDataReferensiTempatTidur = res.data.data.tempat_tidur;
                })

                managePhp.getDataBridgingRSOnline("get-tempat-tidur").then(res => {
                    $scope.dataSourceTempatTidur = new kendo.data.DataSource({
                        data: res.data.data.fasyankes,
                        pageSize: 20
                    })
                    $scope.isRouteLoading = false;
                })
            }
            // getDataTempatTidur();

            $scope.simpanDataTempatTidur = () => {
                $scope.isRouteLoading = true;
                let dataSave = {
                    id_tt: $scope.referensiTempatTidur.kode_tt,
                    ruang: $scope.namaRuangan ? $scope.namaRuangan : "",
                    jumlah_ruang: $scope.jmlRuangan ? $scope.jmlRuangan : 0,
                    jumlah: $scope.jumlah ? $scope.jumlah : 0,
                    terpakai: $scope.terpakai ? $scope.terpakai : 0,
                    prepare: $scope.prepare ? $scope.prepare : 0,
                    prepare_plan: $scope.prepare_plan ? $scope.prepare_plan : 0,
                    kosong: $scope.kosong ? $scope.kosong : 0,
                    covid: $scope.covid ? $scope.covid : 0,
                }

                managePhp.saveDataBridgingRSOnline("send-add-tempat-tidur", dataSave).then(res => {
                    $scope.isRouteLoading = false;
                    getDataTempatTidur();
                })
            }

            // #endregion Tempat Tidur

            //#region Data SDM
            let getDataSDM = () => {
                $scope.isRouteLoading = true;
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
                    $scope.dataSourceSDM = new kendo.data.DataSource({
                        data: res.data.data.sdm,
                        pageSize: 20
                    });
                    $scope.isRouteLoading = false;
                })
            }
            // getDataSDM();

            $scope.simpanDataSDM = () => {
                $scope.isRouteLoading = true;
                let dataSave = {
                    id_kebutuhan: $scope.referensiSDM.id_kebutuhan,
                    jumlah_eksisting: $scope.jumlahEksistingSDM ? $scope.jumlahEksistingSDM : 0,
                    jumlah: $scope.jumlahSDM ? $scope.jumlahSDM : 0,
                    jumlah_diterima: $scope.jumlahDiterimaSDM ? $scope.jumlahDiterimaSDM : 0,
                }

                console.log(dataSave);
                managePhp.saveDataBridgingRSOnline("send-ketersediaan-sdm", dataSave).then(res => {
                    $scope.isRouteLoading = false;
                    getDataSDM();
                })
            }
            //#endregion

            //#region Data ALKSES & APD

            let getDataAlkesApd = () => {
                $scope.isRouteLoading = true;
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
                    $scope.listDataAlkes = res.data.data.kebutuhan_apd;
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
                $scope.isRouteLoading = true;
                let dataSave = {
                    id_kebutuhan: $scope.referensiAlkes.id_kebutuhan,
                    jumlah_eksisting: $scope.jumlahEksistingDA ? $scope.jumlahEksistingDA : 0,
                    jumlah: $scope.jumlahDA ? $scope.jumlahDA : 0,
                    jumlah_diterima: $scope.jumlahDiterimaDA ? $scope.jumlahDiterimaDA : 0,
                }

                console.log(dataSave);
                managePhp.saveDataBridgingRSOnline("send-ketersediaan-apd", dataSave).then(res => {
                    $scope.isRouteLoading = false;
                    getDataAlkesApd();
                })
                // localhost:7878/service-bridging-integerasi-covid/send-ketersediaan-apd

            }

            //#endregion
        }
    ]);
});