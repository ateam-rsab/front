define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RevMonitoringAbsensiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'ReportHelper', 'CetakHelper', 'FindSdm', '$timeout', 'ManageSarprasPhp',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, reportHelper, cetakHelper, FindSdm, $timeout, manageSarprasPhp) {
            $scope.dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));
            $scope.dataLoginUser = JSON.parse(localStorage.getItem('datauserlogin'));
            $scope.pegawai = ModelItem.getPegawai();
            $scope.item = {};
            $scope.dataDetail = [];
            firstLoad();

            function firstLoad() {
                $scope.item = $scope.filter = {};
            }

            var now = new Date(); //tgl skrg
            var nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()) //bulannya + 1
            var lastday = function (y, m) {
                return new Date(y, m + 1, 0).getDate() //fungsi buat ngambil tgl terakhir in month
            }
            var dateLast = lastday(nextMonth.getFullYear(), nextMonth.getMonth()) // tgl terakhir
            $scope.dateLast = new Date(now.getFullYear(), now.getMonth() + 1, dateLast); // variable dateLast masukin ke html k-max
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.isRouteLoading = false;
            var validate = 2;
            $scope.paramURl = '';
            //1 by tanggal
            //2 by nama pegawai
            //3 by unit kerja
            $scope.item.monitoringAwal = new Date();
            $scope.item.monitoringAkhir = new Date();
            $scope.yearSelected = {
                start: "year",
                depth: "year"
            };
            $scope.cbAll = function () {
                if ($scope.vals === true) {
                    validateAll = 1;
                } else {
                    validateAll = 0;
                }
            }

            $q.all([
                ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-status-create-jadwal?id=" + ModelItem.getPegawai().id),
                ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-drop-down-unit?id=" + ModelItem.getPegawai().id),
                ManageSdmNew.getListData("pegawai/get-pegawai-sdm-for-cred"),
                ManageSdmNew.getListData("sdm/get-jabatan-login-user?idPegawai=" + $scope.dataPegawaiLogin.id),
                ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true")
            ]).then(function (res) {
                $scope.isSingle = false;
                $scope.listUnitKerja = res[1].data.data.data;
                $scope.showButtonInputJadwalDinas = res[0].data.data.data;
                $scope.isMonitoring = res[0].data.data.dataMonitoring;
                $scope.isPegawaiSDM = false;
                $scope.pegawaiDayaGunaSDM = res[3].data.data.idJabatan;
                for (var i = 0; i < res[2].data.data.data.length; i++) {
                    if (res[2].data.data.data[i] == ModelItem.getPegawai().id) {
                        $scope.isPegawaiSDM = true;
                        break
                    }
                };
                $scope.isBebasValidasi = false;
                if (ModelItem.getPegawai().nama === "Administrator" || $scope.isPegawaiSDM || $scope.pegawaiDayaGunaSDM == 249) {
                    $scope.isSingle = false;
                    var tempDataPegawai = res[4].data;
                    $scope.listPegawai = [];
                    tempDataPegawai.forEach(function (el) {
                        if (el.namaLengkap !== '-') {
                            var dataTemp = {
                                namaLengkap: el.namaLengkap,
                                id: el.id
                            }
                            $scope.listPegawai.push(dataTemp);
                        }
                    })
                    $scope.isBebasValidasi = true;
                    ManageSdmNew.getListData("sdm/get-all-unit-kerja").then(function (dat) {
                        var toRemove = [0],
                            listUnitKerja = dat.data.data;

                        $scope.listUnitKerja = listUnitKerja.filter(function (el) {
                            return !toRemove.includes(el.id);
                        });
                    });
                } else
                    if ($scope.listUnitKerja.length == 1 && !$scope.isMonitoring) {
                        var single = res[0].data.data.dataSingle[0];
                        $scope.isSingle = true;
                        $scope.listUnitKerja = [{
                            id: single.idUnit,
                            name: single.nameUnit
                        }];
                        ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-drop-down-subunit?id=" + single.idPgw
                            + "&idUnit=" + single.idUnit).then(function (data) {
                                $scope.item.subUnitKerja = {
                                    id: single.idSub,
                                    name: single.nameSub
                                };
                                $scope.listSubUnitKerja = data.data.data;
                            });
                        $scope.listPegawai = [{
                            id: single.idPgw,
                            namalengkap: single.namalengkap
                        }];
                        $scope.item.unitKerja = {
                            id: single.idUnit,
                            name: single.nameUnit
                        };
                        $scope.item.pegawai = {
                            id: single.idPgw,
                            namalengkap: single.namalengkap
                        };
                    } else if ($scope.listUnitKerja.length == 1 && $scope.isMonitoring) {
                        var single = res[0].data.data.dataSingle[0];
                        $scope.isSingle = true;
                        $scope.listUnitKerja = [{
                            id: single.idUnit,
                            name: single.nameUnit
                        }];
                        ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-drop-down-subunit?id=" + single.idPgw
                            + "&idUnit=" + single.idUnit).then(function (data) {
                                $scope.item.subUnitKerja = {
                                    id: single.idSub,
                                    name: single.nameSub
                                };
                                $scope.listSubUnitKerja = data.data.data;
                            });
                        $scope.item.unitKerja = {
                            id: single.idUnit,
                            name: single.nameUnit
                        };
                    }
                $scope.isRouteLoading = false;
            });

            $scope.cariTgl = function () {
                if ($scope.item.monitoringAwal === undefined || $scope.item.monitoringAkhir === undefined) {
                    window.messageContainer.error("tanggal monitoring harus dipilih terlebih dahulu");
                    return;
                } else {
                    $scope.paramURl = "sdm/get-kehadiran-all-pegawai/" + moment($scope.item.monitoringAwal).format("YYYY-MM-DD")
                        + "/" + moment($scope.item.monitoringAkhir).format("YYYY-MM-DD");
                    $scope.pencarian();
                }
            }

            $scope.pijit = function (value) {
                validate = value;
            }
            $scope.item.terlambat = '';
            $scope.item.pulang = '';
            $scope.item.efektif = '';
            $scope.item.kelebihan = '';
            $scope.item.titleFooter = '';



            $scope.Cari = function () {
                //1 by tanggal
                //2 by nama pegawai
                //3 by unit kerja
                //get from validation
                $scope.cs();
                if (!$scope.item.unitKerja && !$scope.isBebasValidasi) {
                    window.messageContainer.error("Unit Kerja harus dipilih terlebih dahulu!");
                    return;
                } else if (!$scope.item.unitKerja && !$scope.item.pegawai && $scope.isBebasValidasi) {
                    window.messageContainer.error("Unit Kerja / Pegawai harus dipilih terlebih dahulu!");
                    return;
                } else if ($scope.item.pegawai && $scope.item.pegawai.id) {
                    $scope.paramURl = "sdm/get-kehadiran/" + $scope.item.pegawai.id + "/" + moment($scope.item.monitoringAwal).format("YYYY-MM-DD")
                        + "/" + moment($scope.item.monitoringAkhir).format("YYYY-MM-DD");
                    $scope.pencarian();
                } else {
                    $scope.paramURl = "sdm/get-kehadiran-by-ruangan/" + $scope.item.unitKerja.id + ($scope.item.subUnitKerja ? "/" + $scope.item.subUnitKerja.id : "")
                        + "/" + moment($scope.item.monitoringAwal).format("YYYY-MM-DD") + "/" + moment($scope.item.monitoringAkhir).format("YYYY-MM-DD");
                    $scope.pencarian();
                }
            }
            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
            $scope.group = {
                field: "nama",
                aggregates: [{
                    field: "nama",
                    aggregate: "count"
                }]
            };
            $scope.mainGridOption = {
                columns: [{
                    field: "nama",
                    headerAttributes: {
                        style: "text-align : center"
                    },
                    title: "Nama Pegawai",
                    width: "150px",
                    footerTemplate: "{{item.titleFooter}}",
                    aggregates: ["count"]
                }, {
                    field: "tanggal",
                    title: "Tanggal",
                    headerAttributes: {
                        style: "text-align : center"
                    },
                    width: "100px"
                }, {
                    title: "Jadwal",
                    headerAttributes: {
                        style: "text-align : center"
                    }, columns: [{
                        field: "jadwalMasuk",
                        title: "Masuk",
                        width: "45px"
                    }, {
                        field: "jadwalPulang",
                        title: "Pulang",
                        width: "45px"
                    }],
                }, {
                    title: "Absensi ",
                    headerAttributes: {
                        style: "text-align : center"
                    }, columns: [{
                        field: "absensiMasuk",
                        title: "Masuk",
                        width: "45px"
                    }, {
                        field: "validMasuk",
                        title: "V",
                        width: "18px"
                    }, {
                        field: "absensiPulang",
                        title: "Pulang",
                        width: "45px"
                    }, {
                        field: "validPulang",
                        title: "V",
                        width: "18px"
                    }],
                }, {
                    field: "terlambat",
                    title: "Terlam-<br/>bat (menit)",
                    width: "50px",
                    footerTemplate: "{{item.terlambat}}",
                    headerAttributes: {
                        style: "text-align : center"
                    }
                }, {
                    field: "pulangAwal",
                    title: "Pulang Awal (menit)",
                    width: "50px",
                    footerTemplate: "{{item.pulang}}",
                    headerAttributes: {
                        style: "text-align : center"
                    }
                }, {
                    field: "kelebihanJamKerja",
                    title: "Kelebih-<br/>an Menit Kerja",
                    width: "50px",
                    aggregates: ["sum"],
                    footerTemplate: "{{item.kelebihan}}",
                    headerAttributes: {
                        style: "text-align : center"
                    }
                }, {
                    field: "jamEfektif",
                    title: "Jam Efektif",
                    width: "50px",
                    footerTemplate: "{{item.efektif}}",
                    headerAttributes: {
                        style: "text-align : center"
                    }
                }, {
                    field: "namaShift",
                    title: "Shift",
                    width: "50px",
                    headerAttributes: {
                        style: "text-align : center"
                    }
                }, {
                    field: "alasan",
                    title: "Keterangan",
                    width: "120px",
                    headerAttributes: {
                        style: "text-align : center"
                    }
                }, {
                    field: "listTrNo",
                    hidden: true
                }, {
                    width: "30px",
                    template: "<p style='text-align:left'><button ng-click='getDetail(dataItem)' class='k-button k-button-icontext'><i class='fa fa-ellipsis-v'></i></button></p>"
                }],
                sortable: {
                    mode: "single",
                    allowUnsort: false,
                }

            }
            $scope.mainGridNotif = {
                columns: [{
                    field: "nama",
                    title: "Nama Pegawai",
                    visible: false,
                    width: "40%"
                }, {
                    field: "tanggal",
                    title: "Tanggal",
                    visible: false,
                    width: "60%"
                }]
            }

            $scope.seeLocation = (data) => {
                ManageSdmNew.getListData("sdm/get-reverse-geocoding?latitude=" + data.latitude + "&longitude=" + data.longitude).then(function (res) {
                    $scope.showLocation = true;
                    $scope.reverseLocation = res.data.data;
                })
            }

            $scope.hideLocation = () => {
                $scope.showLocation = false;
            }

            $scope.getDetail = function (data) {
                $scope.hideLocation();

                if (!$scope.isBebasValidasi) {
                    toastr.warning("Tidak ada akses!");
                    return;
                }

                if (!data) {
                    messageContainer.error("Data Tidak Ditemukan");
                    return;
                }
                var dataItem = data;
                $scope.loadDetail(dataItem);
            };

            $scope.loadDetail = function (data) {
                $scope.dataDetail = [];
                $scope.listTrNo = data.listTrNo;
                var listTrNo = [];
                for (let index = 0; index < data.listTrNo.length; index++) {
                    listTrNo.push(data.listTrNo[index])
                }

                ManageSdmNew.getListData("sdm/get-detail-presensi?listTrNo=" + listTrNo).then(function (res) {
                    $scope.dataDetail = res.data.data;
                    $scope.windDetailPresensi.center().open();
                })
            }

            function filterByStatus(item) {
                if (item.absensiMasuk !== '-' && item.namaShift === 'Libur') {
                    return true;
                } else if (item.absensiMasuk !== '-' && item.jadwalMasuk === null && item.jadwalPulang === null) {
                    return true;
                }

                return false;
            }

            $scope.closeNotif = function () {
                $scope.dialogPopup.close()
            }

            $scope.showNotif = function () {
                $scope.dialogPopup.center().open()
            }

            $scope.addTimes = function (timeMap) {
                var totalH = 0;
                var totalM = 0;
                // First simply adding all of it together, total hours and total minutes
                for (var x in timeMap) {
                    totalH = totalH + parseInt(timeMap[x].hour, 10);
                    totalM = totalM + parseInt(timeMap[x].minutes, 10);
                }

                // If the minutes exceed 60
                if (totalM >= 60) {
                    // Divide minutes by 60 and add result to hours
                    totalH = totalH + Math.floor(totalM / 60);
                    // Add remainder of totalM / 60 to minutes
                    totalM = totalM % 60;
                }

                return totalH + "." + totalM;
            }

            $scope.pencarian = function () {
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData($scope.paramURl).then(function (dat) {
                    $scope.isRouteLoading = false;

                    var belumDiInputJadwal = dat.data.data.listkehadiran.filter(filterByStatus);
                    var groupHeula = []
                    var sama = false
                    for (var i = 0; i < belumDiInputJadwal.length; i++) {
                        sama = false
                        for (var j = 0; j < groupHeula.length; j++) {
                            if (belumDiInputJadwal[i].nama == groupHeula[j].nama) {
                                sama = true
                                groupHeula[j].tanggal = belumDiInputJadwal[i].tanggal + ', ' + groupHeula[j].tanggal
                            }
                        }
                        if (sama == false) {
                            groupHeula.push({
                                "nama": belumDiInputJadwal[i].nama,
                                "tanggal": belumDiInputJadwal[i].tanggal,
                                "ket": "Belum koreksi data",
                            })
                        }
                    }

                    if (groupHeula.length > 0) {
                        $scope.sourceNotif = new kendo.data.DataSource({
                            data: groupHeula,
                            pageSize: 5,
                            total: groupHeula,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {}
                                }
                            }
                        })
                        $scope.dialogPopup.setOptions({
                            width: 500,
                            title: 'Notifikasi Belum Koreksi Jadwal / Rekomendasi Pengajuan Lembur'
                        })
                        var actions = $scope.dialogPopup.options.actions;
                        // Remove "Close" button
                        actions.splice(actions.indexOf("Close"), 1);
                        // Set the new options
                        $scope.dialogPopup.setOptions({
                            actions: actions
                        });

                        $scope.dialogPopup.center();
                        $scope.dialogPopup.open();
                    }
                    $scope.item.jmlBelumDiinputJadwal = belumDiInputJadwal.length;
                    $scope.isAdaDataBelumDiinputJadwal = belumDiInputJadwal.length > 0 ? true : false;

                    if (validate === 2) {
                        var terlambat = 0;
                        var pulang = 0;
                        var kelebihan = 0;
                        var efektif = 0;
                        var timeArr = []
                        for (var i = 0; i < dat.data.data.listkehadiran.length; i++) {
                            terlambat = terlambat + parseFloat(dat.data.data.listkehadiran[i].terlambat)
                            pulang = pulang + parseFloat(dat.data.data.listkehadiran[i].pulangAwal)
                            kelebihan = kelebihan + dat.data.data.listkehadiran[i].kelebihanJamKerja
                            if (dat.data.data.listkehadiran[i].jamEfektif != "") {
                                efektif = efektif + parseFloat(dat.data.data.listkehadiran[i].jamEfektif)
                                var split = dat.data.data.listkehadiran[i].jamEfektif.split(".")
                                if (split.length > 1) {
                                    timeArr.push({
                                        "hour": split[0],
                                        "minutes": split[1]
                                    })
                                } else {
                                    timeArr.push({
                                        "hour": split[0],
                                        "minutes": 0
                                    })
                                }
                            }
                        }

                        var resSumHour = $scope.addTimes(timeArr)
                        $scope.item.terlambat = terlambat
                        $scope.item.pulang = pulang
                        $scope.item.kelebihan = kelebihan
                        $scope.item.efektif = resSumHour

                        $scope.item.titleFooter = 'Jumlah : ';
                    } else {
                        $scope.item.terlambat = "";
                        $scope.item.pulang = "";
                        $scope.item.efektif = "";
                        $scope.item.kelebihan = '';

                        $scope.item.titleFooter = '';
                    }


                    $scope.sourceOrder = new kendo.data.DataSource({
                        data: dat.data.data.listkehadiran,
                        schema: {
                            model: {
                                fields: {
                                    kehadiranidFinger: {
                                        editable: false
                                    },
                                    nama: {
                                        editable: false
                                    },
                                    tanggal: {
                                        editable: false
                                    },
                                    jadwalMasuk: {
                                        editable: false
                                    },
                                    jadwalPulang: {
                                        editable: false
                                    },
                                    absensiMasuk: {
                                        editable: false
                                    },
                                    absensiPulang: {
                                        editable: false
                                    },
                                    terlambat: {
                                        editable: false
                                    },
                                    pulangAwal: {
                                        editable: false
                                    },
                                    kelebihanJamKerja: {
                                        editable: false
                                    },
                                    jamEfektif: {
                                        editable: false
                                    },
                                    namaShift: {
                                        editable: false
                                    },
                                    idShift: {
                                        editable: false
                                    },
                                    alasan: {
                                        editable: true
                                    }
                                }
                            }
                        },
                        sort: {
                            field: "dates",
                            dir: "asc"
                        },
                        group: $scope.group,
                        aggregate: [{
                            field: "nama",
                            aggregate: "count"
                        },
                        {
                            field: "kelebihanJamKerja",
                            aggregate: "sum"
                        },
                        {
                            field: "jamEfektif",
                            aggregate: "sum"
                        }]
                    });
                    $scope.isRouteLoading = false;
                }, function (error) {
                    $scope.isRouteLoading = false;
                });
            }

            $scope.klik = function (current) {
                if (!current) return;

                $scope.current = current;
                $scope.item.jabatan = current.jabatanInternal;
                $scope.item.unitKerjatxt = current.unitKerja;
                $scope.item.idFingerPrint = current.idFinger;
                $scope.item.nip = current.nip;
                $scope.item.nama = current.nama;
            };

            $scope.cs = function () {
                $scope.item.jabatan = "";
                $scope.item.unitKerjatxt = "";
                $scope.item.idFingerPrint = "";
                $scope.item.nip = "";
                $scope.item.nama = "";
            };

            $scope.Save = function () {
                var data = $scope.sourceOrder._data;
                var datas = [];
                if (data.length > 0) {
                    $scope.isRouteLoading = true;
                    for (var x = 0; x < data.length; x++) {
                        datas.push({
                            "pulangAwal": data[x].pulangAwal,
                            "kelebihanJamKerja": data[x].kelebihanJamKerja,
                            "jadwalPulang": data[x].jadwalPulang,
                            "absensiPulang": data[x].absensiPulang,
                            "shiftKerja": {
                                "id": data[x].idShift
                            },
                            "terlambat": data[x].terlambat,
                            "alasan": data[x].alasan,
                            "pegawai": {
                                "id": data[x].idPegawai
                            },
                            "absensiMasuk": data[x].absensiMasuk,
                            "jadwalmasuk": data[x].jadwalMasuk,
                            "jamEfektif": data[x].jamEfektif,
                            "tanggal": data[x].tanggal

                        });
                    };

                    var dataSend = {
                        "monitoringAbsen": datas,
                        "loginUser": {
                            "id": $scope.dataLoginUser.id
                        },
                        "pegawaiLogin": {
                            "id": $scope.dataPegawaiLogin.id
                        }
                    }

                    ManageSdmNew.saveData(dataSend, "sdm/save-monitoring-absen/").then(function (e) {
                        $scope.isRouteLoading = false;
                    }, function (err) {
                        $scope.isRouteLoading = true;

                        throw err;
                    });
                }

            }
            $scope.cetak = function () {
                var listRawRequired = [
                    "item.monitoringAwal|k-ng-model|Tanggal awal",
                    "item.monitoringAkhir|k-ng-model|Tanggal akhir",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var idPegawai, unitKerja, subUnitKerja;
                    var tanggalAwal = dateHelper.formatDate($scope.item.monitoringAwal, "YYYY-MM-DD");
                    var tanggalAkhir = dateHelper.formatDate($scope.item.monitoringAkhir, "YYYY-MM-DD");
                    switch (validate) {
                        case 2:
                            if ($scope.item.pegawai) {
                                idPegawai = $scope.item.pegawai.id;
                            }

                            if ($scope.isBebasValidasi && $scope.item.unitKerja == undefined) {
                                unitKerja = "";
                            } else if ($scope.isBebasValidasi && $scope.item.unitKerja == "") {
                                unitKerja = "";
                            } else {
                                unitKerja = $scope.item.unitKerja.id;
                            }

                            if ($scope.isBebasValidasi && $scope.item.subUnitKerja == undefined) {
                                subUnitKerja = "";
                            } else if ($scope.isBebasValidasi && $scope.item.subUnitKerja == "") {
                                subUnitKerja = "";
                            } else {
                                subUnitKerja = $scope.item.subUnitKerja.id;
                            }

                            if (!$scope.item.pegawai) {
                                idPegawai = "";
                            };

                            if (!$scope.item.unitKerja && !$scope.isBebasValidasi) {
                                messageContainer.error("Unit kerja belum di pilih");
                                return
                            };

                            break;
                        case 3:
                            if (!$scope.item.unitKerja && !$scope.isBebasValidasi) {
                                messageContainer.error("Unit kerja belum di pilih");
                                return
                            };

                            idPegawai = "";
                            if ($scope.isBebasValidasi && $scope.item.unitKerja == undefined) {
                                unitKerja = "";
                            } else if ($scope.isBebasValidasi && $scope.item.unitKerja == "") {
                                unitKerja = "";
                            } else {
                                unitKerja = $scope.item.unitKerja.id;
                            }

                            break;
                    }

                    var fixUrlLaporan = cetakHelper.openURLReporting("reporting/lapMonitoringAbsensi?idPegawai=" + idPegawai + "&startDate=" + tanggalAwal
                        + "&endDate=" + tanggalAkhir + "&unitKerja=" + unitKerja + "&subUnitKerja=" + (subUnitKerja ? subUnitKerja : ""));
                    window.open(fixUrlLaporan, "RincianAbsensi", "width=800, height=600");
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };

            $scope.klikInputJadwalDinas = function () {
                $state.go('JadwalAbsensiPegawai');
            }

            $scope.$watch('item.unitKerja', function (newVal, oldVal) {
                if (!newVal) return;
                if ((newVal && oldVal) && newVal.id == oldVal.id || $scope.isSingle === true) return;
                $scope.item.subUnitKerja = "";
                if (ModelItem.getPegawai().nama === "Administrator" || $scope.isPegawaiSDM || $scope.pegawaiDayaGunaSDM == 249) {
                    ManageSdm.getOrderList("service/list-generic/?view=SubUnitKerjaPegawai&select=id,name&criteria=statusEnabled,unitKerjaId&values=true,"
                        + newVal.id + "&order=name:asc").then(function (dat) {
                            $scope.listSubUnitKerja = dat.data;
                        });
                } else {
                    ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-drop-down-subunit?id=" + ModelItem.getPegawai().id
                        + "&idUnit=" + newVal.id).then(function (data) {
                            $scope.listSubUnitKerja = data.data.data;
                        });
                }
            });

            $scope.$watch('item.subUnitKerja', function (newVal, oldVal) {
                if (oldVal != undefined) {
                    if (!newVal) return;
                    if ((newVal && oldVal) && newVal.id == oldVal.id || $scope.isSingle === true) return;
                    if ($scope.item.subUnitKerja) {
                        ManageSdmNew.getListData("sdm/get-dataPegawai-rev?idUnitKerja=" + $scope.item.unitKerja.id + "&idSubUnitKerja=" + newVal.id
                            + "&idPegawaiLogin=" + $scope.pegawai.id).then(function (data) {
                                $scope.item.pegawai = "";
                                $scope.listPegawai = data.data;
                                if ($scope.listPegawai.length > 1) {
                                    $scope.isSingle = false;
                                }
                            });
                    }
                } else {
                    if ($scope.item.subUnitKerja) {
                        ManageSdmNew.getListData("sdm/get-dataPegawai-rev?idUnitKerja=" + $scope.item.unitKerja.id + "&idSubUnitKerja=" + newVal.id
                            + "&idPegawaiLogin=" + $scope.pegawai.id).then(function (data) {
                                $scope.item.pegawai = "";
                                $scope.listPegawai = data.data.data;
                                $scope.item.pegawai = {
                                    id: $scope.listPegawai[0].id,
                                    namaLengkap: $scope.listPegawai[0].namaLengkap
                                }
                                if ($scope.listPegawai.length > 1) {
                                    $scope.isSingle = false;
                                }
                            });
                    }
                }
            });

            var timeoutPromise;
            $scope.$watch('filter.namaPegawai', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter('nama', newVal)
                    }
                }, 500)
            })

            function applyFilter(filterField, filterValue) {
                var gridData = $("#grid").data("kendoGrid");
                var currFilterObj = gridData.dataSource.filter();
                var currentFilters = currFilterObj ? currFilterObj.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field == filterField) {
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                currentFilters.push({
                    field: filterField,
                    operator: "contains",
                    value: filterValue
                });

                gridData.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            }

            function resetAndCheckListPegawai() {
                ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true").then(function (data) {
                    if (ModelItem.getPegawai().nama === "Administrator" || $scope.isPegawaiSDM || $scope.pegawaiDayaGunaSDM == 249) {
                        $scope.isSingle = false;
                        $scope.listPegawai = data.data;
                        $scope.isBebasValidasi = true;
                        ManageSdmNew.getListData("sdm/get-all-unit-kerja").then(function (dat) {
                            $scope.listUnitKerja = dat.data.data;
                        });
                    }
                });
            }

            $scope.resetFilters = function () {
                var gridData = $("#grid").data("kendoGrid");
                gridData.dataSource.filter({});
                $scope.filter = {};
            }

            $scope.resetFilters2 = function () {
                resetAndCheckListPegawai();
                $scope.item.unitKerja = "";
                $scope.item.subUnitKerja = "";
                $scope.item.pegawai = "";
                $scope.item.monitoringAwal = $scope.now;
                $scope.item.monitoringAkhir = $scope.now;
            }
        }

    ]);
});