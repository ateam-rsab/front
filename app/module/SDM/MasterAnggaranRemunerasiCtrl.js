define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MasterAnggaranRemunerasiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'NamaAsuransi', 'ManageSdm', 'ManageSdmNew', '$timeout', "DateHelper",
        function ($q, $rootScope, $scope, ModelItem, $state, NamaAsuransi, ManageSdm, ManageSdmNew, $timeout, DateHelper) {
            $scope.item = {};
            $scope.edit = {};
            $scope.totalNilaiJabatan = 0;
            $scope.item.anggaranRemunerasi = 0;
            $scope.item.pir = $scope.item.anggaranRemunerasi + "/" + 13;
            $scope.item.pirHitungan = 0;
            let dataLogin = JSON.parse(localStorage.getItem("datauserlogin"));

            var rupiahFormatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            $scope.angkaFormatter = new Intl.NumberFormat('id-ID');

            $scope.optGridPenempatanEvaluasiJabatan = {
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "namaPegawai",
                    title: "<h3>Nama Pegawai</h3>",
                    width: 200
                }, {
                    field: "unitKerja",
                    title: "<h3>Unit Kerja</h3>",
                    width: 150
                }, {
                    field: "namaJabatan",
                    title: "<h3>Jabatan</h3>",
                    width: 120
                }, {
                    field: "kelompokJabatan",
                    title: "<h3>Kelompok Jabatan</h3>",
                    width: 120
                }, {
                    field: "detailKelompokJabatan",
                    title: "<h3>Detail Kelompok<br>Jabatan</h3>",
                    width: 150
                }, {
                    field: "grade",
                    title: "<h3>Grade</h3>",
                    width: 70,
                    attributes: { align: "right" }
                }, {
                    field: "nilaiJabatan",
                    title: "<h3>Nilai Jabatan</h3>",
                    width: 70,
                    attributes: { align: "right" },
                    footerTemplate: "Total: <span>{{angkaFormatter.format(totalNilaiJabatan)}}</span>",
                    footerAttributes: { align: "right" }
                }]
            };

            $scope.optGridPlafon = {
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "grade",
                    title: "<h3>Grade</h3>",
                    width: 70,
                    attributes: { align: "right" }
                }, {
                    field: "nilaiTerendah",
                    title: "<h3>Nilai<br/>Terendah</h3>",
                    width: 50,
                    attributes: { align: "right" }
                }, {
                    field: "nilaiTertinggi",
                    title: "<h3>Nilai<br/>Tertinggi</h3>",
                    width: 50,
                    attributes: { align: "right" }
                }, {
                    field: "gajiHonorariumFormatted",
                    title: "<h3>Gaji Honorarium</h3>",
                    width: 150,
                    attributes: { align: "right" }
                }, {
                    title: "<h3>Insentif</h3>",
                    columns: [{
                        field: "minInsentifFormatted",
                        title: "<h3>Min</h3>",
                        width: 120,
                        attributes: { align: "right" }
                    }, {
                        field: "maxInsentifFormatted",
                        title: "<h3>Max</h3>",
                        width: 150,
                        attributes: { align: "right" }
                    }]
                }, {
                    field: "maxTotalRemunerasiFormatted",
                    title: "<h3>Total Remunerasi</h3>",
                    width: 120,
                    attributes: { align: "right" }
                }, {
                    command: [{
                        text: "Edit",
                        click: editDataPlafon,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: 50
                }],
            }

            function editDataPlafon(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                $scope.edit.noRec = dataItem.noRec;
                $scope.edit.grade = dataItem.grade;
                $scope.edit.nilaiTerendah = dataItem.nilaiTerendah;
                $scope.edit.nilaiTertinggi = dataItem.nilaiTertinggi;
                $scope.edit.gaji = dataItem.gajiHonorarium;
                $scope.edit.minInsentif = dataItem.minInsentif;
                $scope.edit.maxInsentif = dataItem.maxInsentif;
                $scope.edit.totalRemunerasi = dataItem.maxTotalRemunerasi;
                $scope.popUp.open().center();
            }

            $scope.getDataPlafon = () => {
                ManageSdmNew.getListData("sdm/get-plafon-remunerasi").then(res => {

                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].gajiHonorariumFormatted = rupiahFormatter.format(res.data.data[i].gajiHonorarium);
                        res.data.data[i].maxInsentifFormatted = rupiahFormatter.format(res.data.data[i].maxInsentif);
                        res.data.data[i].maxTotalRemunerasiFormatted = rupiahFormatter.format(res.data.data[i].maxTotalRemunerasi);
                        res.data.data[i].minInsentifFormatted = rupiahFormatter.format(res.data.data[i].minInsentif);
                    }

                    $scope.dataPlafon = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 20
                    })
                });
            }

            $scope.init = () => {
                $q.all([
                    ManageSdmNew.getListData("sdm/get-penempatan-evaluasi-jabatan"),
                    ManageSdmNew.getListData("sdm/get-anggaran-remunerasi-tahun-ini")
                ]).then(function (res) {
                    $scope.dataSourcePenempatanEvaluasiJabatan = new kendo.data.DataSource({
                        data: res[0].data.data,
                        pageSize: 10
                    });

                    for (let i in res[0].data.data) {
                        $scope.totalNilaiJabatan += res[0].data.data[i].nilaiJabatan;
                    }
                    if (res[1].data.data && res[1].data.data.anggaranTahun) {
                        $scope.item.anggaranRemunerasi = rupiahFormatter.format(res[1].data.data.anggaranTahun);
                        $scope.item.pir = rupiahFormatter.format(res[1].data.data.anggaranBulan);
                        $scope.item.pirHitungan = rupiahFormatter.format((res[1].data.data.anggaranBulan / res[1].data.data.totNilaiJabatan));

                        $scope.isExistedTahunIni = true
                    } else {
                        $scope.isExistedTahunIni = false
                    }
                }, (error) => {
                    throw (error);
                })

                $scope.getDataPlafon();

            }
            $scope.init();

            $scope.changeAnggaran = () => {
                $scope.item.pir = ($scope.item.anggaranRemunerasi * 0.85 / 13).toFixed(2);
                $scope.item.pirHitungan = ($scope.item.pir / $scope.totalNilaiJabatan).toFixed(2);
                $scope.item.pirUnformatted = $scope.item.pir;
                $scope.item.pirHitunganUnformatted = $scope.item.pirHitungan;

                let pirFormatted = rupiahFormatter.format($scope.item.pir),
                    pirHitunganFormatted = rupiahFormatter.format($scope.item.pirHitungan);

                $scope.item.pir = pirFormatted;
                $scope.item.pirHitungan = pirHitunganFormatted;

            }

            $scope.closePopUp = () => {
                $scope.popUp.close();
            }

            $scope.simpanEdit = () => {
                let anggaran = {
                    tahun: DateHelper.toTimeStamp(new Date),
                    totalNilaiJabatan: $scope.totalNilaiJabatan,
                    anggaranRemunTahun: $scope.item.anggaranRemunerasi,
                    anggaranRemunBulan: $scope.item.pirUnformatted,
                    poinIndeksRupiah: $scope.item.pirHitunganUnformatted,
                    grade: {
                        id: $scope.edit.grade
                    },
                    gajiHonorarium: $scope.edit.gaji,
                    minInsentif: $scope.edit.minInsentif,
                    maxInsentif: $scope.edit.maxInsentif,
                    maxTotalRemunerasi: $scope.edit.totalRemunerasi,
                    kdProfile: 0,
                    statusEnabled: true,
                    loginUserId: dataLogin.id,
                    noRec: $scope.edit.noRec
                }

                let data = {
                    grade: $scope.edit.grade,
                    nilaiTerendah: $scope.edit.nilaiTerendah,
                    nilaiTertinggi: $scope.edit.nilaiTertinggi,
                    gajiHonorarium: $scope.edit.gaji,
                    minInsentif: $scope.edit.minInsentif,
                    maxInsentif: $scope.edit.maxInsentif,
                    maxTotalRemunerasi: $scope.edit.totalRemunerasi,
                }

                $q.all([
                    ManageSdmNew.saveData(anggaran, "iki-remunerasi/save-anggaran-remunerasi"),
                    ManageSdmNew.saveData(data, "sdm/save-plafon-remunerasi")
                ]).then(function (res) {
                    $scope.getDataPlafon();
                    $scope.closePopUp();
                }, (error) => {
                    throw (error);
                })
            }

            $scope.simpanAllAnggaran = () => {
                let dataSource = $scope.dataPlafon._data;
                let dataSave = []

                for (let i = 0; i < dataSource.length; i++) {
                    dataSave.push({
                        tahun: DateHelper.toTimeStamp(new Date),
                        totalNilaiJabatan: $scope.totalNilaiJabatan,
                        anggaranRemunTahun: $scope.item.anggaranRemunerasi,
                        anggaranRemunBulan: $scope.item.pirUnformatted,
                        poinIndeksRupiah: $scope.item.pirHitunganUnformatted,
                        grade: {
                            id: dataSource[i].grade
                        },
                        gajiHonorarium: dataSource[i].gajiHonorarium,
                        minInsentif: dataSource[i].minInsentif,
                        maxInsentif: dataSource[i].maxInsentif,
                        maxTotalRemunerasi: dataSource[i].maxTotalRemunerasi,
                        kdProfile: 0,
                        statusEnabled: true
                    })
                }

                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-all-anggaran-remunerasi?loginUserId=" + dataLogin.id).then(res => {
                    $scope.isExistedTahunIni = true
                })
            }
        }
    ]);
});