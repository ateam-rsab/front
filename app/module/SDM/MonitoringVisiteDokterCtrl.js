define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MonitoringVisiteDokterCtrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSdmNew', 'DateHelper', 'ReportHelper', 'CetakHelper', 'ReportService',
        function ($q, $rootScope, $scope, $state, ManageSdmNew, dateHelper, reportHelper, cetakHelper, reportService) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.item.periode = new Date();
            $scope.isSuperuser = false;
            $scope.isSpecified = false;
            $scope.isKsm = false;
            $scope.monthly = {
                start: "year",
                depth: "year",
                format: "MMMM yyyy"
            };
            const dataLogin = JSON.parse(localStorage.getItem("pegawai"));

            $scope.getDataVisite = () => {
                if ($scope.item.dokter) {
                    $scope.isSpecified = true
                } else {
                    $scope.isSpecified = false
                }

                $scope.isRouteLoading = true;
                let periode = dateHelper.toTimeStamp($scope.item.periode);
                reportService.getListData(`reporting/presensi-visite-dokter?ksmId=${$scope.item.unitKerja ? $scope.item.unitKerja.id : ""}&kkId=${$scope.item.kelompokKerja ? $scope.item.kelompokKerja.id : ""}&drId=${$scope.item.dokter ? $scope.item.dokter.id ? $scope.item.dokter.id : $scope.item.dokter.pegawaiId : ""}&periode=${periode}`).then((res) => {
                    $scope.verifyDataSend = res.data.data.indikator;
                    for (let i = 0; i < res.data.data.detail.length; i++) {
                        res.data.data.detail[i].jam = res.data.data.detail[i].strJamInput ? res.data.data.detail[i].strJamInput : "-";
                        res.data.data.detail[i].namaRuangan = res.data.data.detail[i].namaRuangan ? res.data.data.detail[i].namaRuangan : "-";
                        res.data.data.detail[i].isDpjp = res.data.data.detail[i].isDpjp && res.data.data.detail[i].cpptId ? "DPJP" : res.data.data.detail[i].isDpjp === null ? "-" : "Bukan DPJP";
                    }
                    if (res.data.data.indikator) {
                        $scope.persenTepatHadir = res.data.data.persenTepatHadir;
                        $scope.item.viewTepatHadir = $scope.persenTepatHadir + "%";
                    }

                    $scope.dataSourceVisite = new kendo.data.DataSource({
                        data: res.data.data.detail,
                        pageSize: 20
                    })
                    $scope.isRouteLoading = false;
                })
            }

            $scope.getDataDokter = () => {
                if ($scope.isKsm) {
                    ManageSdmNew.getListData(`sdm/daftar-dokter?ksmId=${$scope.unitKerjaId ? $scope.unitKerjaId : ""}&kkId=&drId=`).then((res) => {
                        $scope.listDokter = res.data;
                    });
                } else {
                    ManageSdmNew.getListData(`sdm/daftar-dokter?ksmId=${$scope.item.unitKerja ? $scope.item.unitKerja.id : ""}&kkId=${$scope.item.kelompokKerja ? $scope.item.kelompokKerja.id : ""}&drId=`).then((res) => {
                        $scope.listDokter = res.data;
                    });
                }


                if (!$scope.item.unitKerja) {
                    $scope.listKelompokKerja = undefined
                }

                if ($scope.item.unitKerja) {
                    ManageSdmNew.getListData("service/list-generic/?view=SubUnitKerjaPegawai&select=id,name&criteria=statusEnabled,name,unitKerjaId&values=true,KK," + $scope.item.unitKerja.id + "&order=name:asc").then((res) => {
                        $scope.listKelompokKerja = res.data;
                    })
                }
            }

            $scope.init = () => {
                let dataSOTK = JSON.parse(localStorage.getItem('sotk_coor'));

                $scope.optGrid = {
                    toolbar: [
                        "excel",
                    ],
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
                    pageable: {
                        refresh: true,
                        pageSizes: true,
                        buttonCount: 5
                    },
                    columns: [
                        {
                            "field": "namaLengkap",
                            "title": "Nama Lengkap",
                            "width": 150
                        }, {
                            "field": "strTgl",
                            "title": "Tanggal",
                            "width": 50
                        }, {
                            "field": "jam",
                            "title": "Jam",
                            "width": 50
                        }, {
                            "field": "namaRuangan",
                            "title": "Ruangan",
                            "width": 150
                        }, {
                            "field": "isDpjp",
                            "title": "DPJP",
                            "width": 50
                        }, {
                            hidden: true,
                            field: "namaLengkap",
                            title: "Nama Lengkap",
                            aggregates: ["count"],
                            groupHeaderTemplate: "Nama #= value # (Jumlah: #= count#)"
                        }
                    ]
                }

                ManageSdmNew.getListData("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=statusEnabled,id&values=true,(58;59;60;61;62;63;82)&order=name:asc").then((res) => {
                    $scope.listUnitKerja = res.data;
                })

                $scope.isSuperuser = dataSOTK.reduce((res, item) => {
                    return item.x === 51 || (item.x === 48 && item.y === 274) || (item.x === 57 && (dataLogin.id === 1005 || dataLogin.id === 1193 || dataLogin.id === 1201));
                })

                dataSOTK.reduce((res, item) => {
                    if ((item.x === 58 || item.x === 59 || item.x === 60 || item.x === 61 || item.x === 62 || item.x === 63 || item.x === 82) && item.z === 3) {
                        $scope.isKsm = true
                        $scope.unitKerjaId = item.x
                    } else {
                        $scope.isKsm = false
                    }
                })

                $scope.item.dokter = $scope.isSuperuser ? null : { namaLengkap: dataLogin.namaLengkap, id: dataLogin.id }
                $scope.getDataVisite();
                $scope.getDataDokter();
            }

            $scope.init();

            $scope.verify = function () {
                $scope.isRouteLoading = true;

                if (!$scope.isKsm) {
                    toastr.warning("Tidak memiliki akses", "Peringatan")
                    $scope.isRouteLoading = false
                    return
                }

                if (!$scope.verifyDataSend.logbookId) {
                    toastr.warning("Penilaian kinerja tidak ditemukan", "Peringatan")
                    $scope.isRouteLoading = false
                    return
                }

                ManageSdmNew.saveData($scope.verifyDataSend, "iki-remunerasi/verifikasi-presensi-dpjp").then(function (e) {
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});
