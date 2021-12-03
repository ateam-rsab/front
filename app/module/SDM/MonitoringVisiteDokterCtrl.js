define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MonitoringVisiteDokterCtrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSdmNew', 'DateHelper', 'ReportHelper', 'CetakHelper', 'ReportService',
        function ($q, $rootScope, $scope, $state, ManageSdmNew, dateHelper, reportHelper, cetakHelper, reportService) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.item.tglAwal = new Date();
            $scope.item.tglAkhir = new Date();
            $scope.isAuthorized = false;
            const dataLogin = JSON.parse(localStorage.getItem("pegawai"));

            $scope.getDataVisite = () => {
                $scope.isRouteLoading = true;
                let tglAwal = dateHelper.toTimeStamp($scope.item.tglAwal), tglAkhir = dateHelper.toTimeStamp($scope.item.tglAkhir);
                reportService.getListData(`reporting/presensi-visite-dokter?ksmId=${$scope.item.unitKerja ? $scope.item.unitKerja.id : ""}&kkId=${$scope.item.kelompokKerja ? $scope.item.kelompokKerja.id : ""}&drId=${$scope.item.dokter ? $scope.item.dokter.id ? $scope.item.dokter.id : $scope.item.dokter.pegawaiId : ""}&startDate=${tglAwal}&endDate=${tglAkhir}`).then((res) => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].jam = res.data.data[i].strJamInput ? res.data.data[i].strJamInput : "-";
                        res.data.data[i].namaRuangan = res.data.data[i].namaRuangan ? res.data.data[i].namaRuangan : "-";
                        // res.data.data[i].isDpjp = res.data.data[i].isDpjp  ? "Ya" : "Tidak";
                        res.data.data[i].isDpjp = res.data.data[i].isDpjp && res.data.data[i].cpptId ? "DPJP" : res.data.data[i].isDpjp === null ? "-" : "Bukan DPJP";

                        // console.log(new Date(res.data.data[i].tgl))

                    }

                    $scope.dataSourceVisite = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 20
                    })
                    $scope.isRouteLoading = false;
                })
            }

            $scope.getDataDokter = () => {
                // $scope.item.dokter = null;
                ManageSdmNew.getListData(`sdm/daftar-dokter?ksmId=${$scope.item.unitKerja ? $scope.item.unitKerja.id : ""}&kkId=${$scope.item.kelompokKerja ? $scope.item.kelompokKerja.id : ""}&drId=`).then((res) => {
                    $scope.listDokter = res.data;
                });

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

                console.log(dataSOTK)
                ManageSdmNew.getListData("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=statusEnabled,id&values=true,(58;59;60;61;62;63;82)&order=name:asc").then((res) => {
                    $scope.listUnitKerja = res.data;
                })

                // ManageSdmNew.getListData("service/list-generic/?view=SubUnitKerjaPegawai&select=id,name&criteria=statusEnabled,name,unitKerjaId&values=true,KK,58&order=name:asc").then((res) => {
                //     $scope.listKelompokKerja = res.data;
                // })
                $scope.isAuthorized = dataSOTK.reduce((res, item) => {
                    // if(item.x === 51) return true;
                    return item.x === 51 || (item.x === 48 && item.y === 274) || (item.x === 57 && (dataLogin.id === 1005 || dataLogin.id === 1193 || dataLogin.id === 1201));
                })

                $scope.item.dokter = $scope.isAuthorized ? null : { namaLengkap: dataLogin.namaLengkap, id: dataLogin.id }
                $scope.getDataVisite();
                $scope.getDataDokter();
            }

            $scope.init();
        }
    ]);
});
