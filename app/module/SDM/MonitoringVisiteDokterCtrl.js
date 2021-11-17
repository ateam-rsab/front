define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MonitoringVisiteDokterCtrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSdmNew', 'DateHelper', 'ReportHelper', 'CetakHelper', 'ReportService',
        function ($q, $rootScope, $scope, $state, ManageSdmNew, dateHelper, reportHelper, cetakHelper, reportService) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.item.tglAwal = new Date();
            $scope.item.tglAkhir = new Date();
            $scope.item.dataLogin = JSON.parse(localStorage.getItem("pegawai"));
            $scope.getDataVisite = () => {
                $scope.isRouteLoading = true;
                let tglAwal = dateHelper.toTimeStamp($scope.item.tglAwal), tglAkhir = dateHelper.toTimeStamp($scope.item.tglAkhir);
                reportService.getListData(`reporting/presensi-visite-dokter?ksmId=${$scope.item.unitKerja ? $scope.item.unitKerja.id : ""}&kkId=${$scope.item.kelompokKerja ? $scope.item.kelompokKerja.id : ""}&drId=${$scope.item.dokter ? $scope.item.dokter.pegawaiId : ""}&startDate=${tglAwal}&endDate=${tglAkhir}`).then((res) => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].jam = res.data.data[i].strJamInput ? res.data.data[i].strJamInput : "-";
                        res.data.data[i].namaRuangan = res.data.data[i].namaRuangan ? res.data.data[i].namaRuangan : "-";
                        // res.data.data[i].isDpjp = res.data.data[i].isDpjp  ? "Ya" : "Tidak";
                        res.data.data[i].isDpjp = res.data.data[i].isDpjp && res.data.data[i].cpptId ? "Ya" : res.data.data[i].isDpjp === null ? "-" : "Tidak";

                        console.log(new Date(res.data.data[i].tgl))

                    }

                    let dataTemp = [];
                    // res.data.data.map(a => {
                    //     console.log(a)
                    // })
                    $scope.dataSourceVisite = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 20
                    })
                    $scope.isRouteLoading = false;
                })
            }

            $scope.getDataDokter = () => {
                $scope.item.dokter = null;
                ManageSdmNew.getListData(`sdm/daftar-dokter?ksmId=${$scope.item.unitKerja ? $scope.item.unitKerja.id : ""}&kkId=${$scope.item.kelompokKerja ? $scope.item.kelompokKerja.id : ""}&drId=`).then((res) => {
                    $scope.listDokter = res.data;
                });
            }

            $scope.init = () => {
                $scope.getDataVisite();
                $scope.getDataDokter();
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
                            "title": "<h3 align=center>Nama Lengkap</h3>",
                            "width": 150
                        }, {
                            "field": "strTgl",
                            "title": "<h3 align=center>Tanggal</h3>",
                            "width": 50
                        }, {
                            "field": "jam",
                            "title": "<h3 align=center>Jam</h3>",
                            "width": 50
                        }, {
                            "field": "namaRuangan",
                            "title": "<h3 align=center>Ruangan</h3>",
                            "width": 150
                        }, {
                            "field": "isDpjp",
                            "title": "<h3 align=center>DPJP</h3>",
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

                ManageSdmNew.getListData("service/list-generic/?view=SubUnitKerjaPegawai&select=id,name&criteria=statusEnabled,name,unitKerjaId&values=true,KK,58&order=name:asc").then((res) => {
                    $scope.listKelompokKerja = res.data;
                })
            }

            $scope.init();
        }
    ]);
});