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

            $scope.optGridPenempatanEvaluasiJabatan = {
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
                    width: 70
                }, {
                    field: "nilaiJabatan",
                    title: "<h3>Nilai Jabatan</h3>",
                    width: 70,
                    footerTemplate: "Total: <span>{{totalNilaiJabatan}}</span>"
                }]
            };

            $scope.optGridPlafon = {
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "grade",
                    title: "<h3>Grade</h3>",
                    width: 70
                }, {
                    field: "gajiHonorariumFormatted",
                    title: "<h3>Gaji Honorarium</h3>",
                    width: 150
                }, {
                    // field: "Insentif",
                    title: "<h3>Insentif</h3>",
                    columns: [{
                        field: "minInsentifFormatted",
                        title: "<h3>Min</h3>",
                        width: 120
                    }, {
                        field: "maxInsentifFormatted",
                        title: "<h3>Max</h3>",
                        width: 150
                    }]
                }, {
                    field: "maxTotalRemunerasiFormatted",
                    title: "<h3>Total Remunerasi</h3>",
                    width: 120
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

                console.log(dataItem);
                $scope.edit.grade = dataItem.grade;
                $scope.edit.gaji = dataItem.gajiHonorarium;
                $scope.edit.minInsentif = dataItem.minInsentif;
                $scope.edit.maxInsentif = dataItem.maxInsentif;
                $scope.edit.totalRemunerasi = dataItem.maxTotalRemunerasi;
                $scope.popUp.open().center();
            }

            $scope.getDataPlafon = () => {
                ManageSdmNew.getListData("sdm/get-plafon-remunerasi").then(res => {

                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].gajiHonorariumFormatted = res.data.data[i].gajiHonorarium.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        });
                        // res.data.data[i].gradeFormatted = res.data.data[i].grade.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'});
                        res.data.data[i].maxInsentifFormatted = res.data.data[i].maxInsentif.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        });
                        res.data.data[i].maxTotalRemunerasiFormatted = res.data.data[i].maxTotalRemunerasi.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        });
                        res.data.data[i].minInsentifFormatted = res.data.data[i].minInsentif.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        });
                    }

                    $scope.dataPlafon = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 20
                    })
                });
            }

            $scope.init = () => {
                ManageSdmNew.getListData("sdm/get-penempatan-evaluasi-jabatan").then(res => {
                    for (let i in res.data.data) {
                        $scope.totalNilaiJabatan += res.data.data[i].nilaiJabatan;

                    }
                    $scope.item.pirHitungan = 0 + "/" + $scope.totalNilaiJabatan;
                    $scope.dataSourcePenempatanEvaluasiJabatan = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10
                    });
                });

                $scope.getDataPlafon();

            }
            $scope.init();

            $scope.changeAnggaran = () => {
                $scope.item.pir = Math.ceil($scope.item.anggaranRemunerasi / 13);
                $scope.item.pirHitungan = Math.ceil($scope.item.pir / $scope.totalNilaiJabatan);
                $scope.item.pirUnformatted = $scope.item.pir;
                $scope.item.pirHitunganUnformatted = $scope.item.pirHitungan;

                let pirFormatted = $scope.item.pir.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                    }),
                    pirHitunganFormatted = $scope.item.pirHitungan.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                    });

                $scope.item.pir = pirFormatted;
                $scope.item.pirHitungan = pirHitunganFormatted;

            }

            $scope.closePopUp = () => {
                $scope.popUp.close();
            }

            $scope.simpanEdit = () => {

                let data = {
                    grade: $scope.edit.grade,
                    gajiHonorarium: $scope.edit.gaji,
                    minInsentif: $scope.edit.minInsentif,
                    maxInsentif: $scope.edit.maxInsentif,
                    maxTotalRemunerasi: $scope.edit.totalRemunerasi,
                }
                ManageSdmNew.saveData(data, "sdm/save-plafon-remunerasi").then(res => {
                    $scope.getDataPlafon();
                    $scope.closePopUp();

                })
            }

            $scope.simpanAllAnggaran = () => {
                let dataSource = $scope.dataPlafon._data;
                console.log(dataSource);
                let dataSave = []

                for (let i = 0; i < dataSource.length; i++) {
                    dataSave.push({
                        tahun: DateHelper.toTimeStamp(new Date),
                        totalNilaiJabatan: $scope.totalNilaiJabatan,
                        anggaranRemunTahun: $scope.item.anggaranRemunerasi,
                        anggaranRemunBulan: $scope.item.pirUnformatted,
                        poinindeksrupiah: $scope.item.pirHitunganUnformatted,
                        grade: {
                            id: dataSource[i].grade
                        },
                        gajiHonorarium: dataSource[i].gajiHonorarium,
                        minInsentif: dataSource[i].minInsentif,
                        maxInsentif: dataSource[i].maxInsentif,
                        maxTotalRemunerasi: dataSource[i].maxTotalRemunerasi,
                        kdProfile: 0,
                        statusEnabled: true
                    }, )
                }
                // http://192.168.12.3:8080/jasamedika-sdm/iki-remunerasi/save-all-anggaran-remunerasi?loginUserId=29999
                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-all-anggaran-remunerasi?loginUserId=" + dataLogin.id).then(res => { })
            }
        }
    ]);
});