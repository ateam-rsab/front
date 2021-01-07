define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DataCutiPegawaiCtrl', ['$q', '$rootScope', '$scope', '$mdDialog', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'ManageSdmNew',
        function ($q, $rootScope, $scope, $mdDialog, ModelItem, $state, manageSdm, manageSdmNew, dateHelper, ManageSdmNew) {
            $scope.onTabChanges = function (value) {
                $scope.selectedIndex = value;
                if (value === 0) {
                    // cuti per-shift clicked/activated
                } else if (value === 1) {
                    // cuti per-pegawai clicked/activated
                }
            };
            $scope.now = new Date();
            $scope.item = {
                "periode": $scope.now
            };
            function init() {

                $scope.isRouteLoading = true;
                manageSdm.getItem("service/list-generic/?view=KelompokShift&select=id,name&citeria=statusEnabled&values=true", true).then(function (res) {
                    $scope.listKelompokShift = res.data;
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                    throw error;
                })
            }
            function loadDataCuti() {
                init();
                $scope.isRouteLoading = true;
                $q.all([
                    manageSdm.getListData("KomponenIndex&select=id,komponenIndex"),
                    manageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true", true)
                ]).then(function (res) {
                    if (res[0].statResponse) {
                        $scope.listStatusPegawai = [];
                        res[0].data.forEach(function (e) {
                            if (e.id === 5) {
                                e.komponenIndex = "Cuti Tahunan";
                                $scope.listStatusPegawai.push(e);
                            } else if (e.id === 17) {
                                e.komponenIndex = "Izin"
                                $scope.listStatusPegawai.push(e);
                            } else if (e.id === 21) {
                                e.komponenIndex = "Cuti Bersama"
                                $scope.listStatusPegawai.push(e);
                            }
                        })
                    }
                    if (res[1].statResponse) {
                        var tempDataPegawai = res[1].data;
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
                        // $scope.listPegawai = res[1].data;
                    }
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                    throw error;
                });
            }
            $scope.formatThn = {
                start: "decade",
                depth: "decade",
                format: "yyyy"
            }
            $scope.formatInt = {
                format: "n0",
                min: 0
            }
            $scope.Save = function () {
                if ($scope.selectedIndex == 0) {
                    $scope.SaveCutiPerShift();
                } else if ($scope.selectedIndex == 1) {
                    $scope.SaveCutiPerPegawai();
                } else {
                    messageContainer.error('Something wrong, please reload the page')
                }
            }
            $scope.SaveCutiPerPegawai = function () {
                var listRawRequired = [
                    "item.periode|k-ng-model|Periode",
                    "item.pegawai|k-ng-model|pegawai",
                    "item.komponenIndexPegawai|k-ng-model|Komponen Index",
                    "item.jmlCuti|k-ng-model|Jumlah Cuti"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.isRouteLoading = true;
                    var d = new Date($scope.tempItem.tglMasuk);
                    var p = new Date($scope.item.periode);
                    var yearMulaiDapatCuti = d.getFullYear();
                    var yearInput = p.getFullYear();
                    if ($scope.tempItem.tglMasuk == undefined || $scope.tempItem.tglMasuk == null) {
                        $scope.isRouteLoading = false;
                        toastr.warning("Data tanggal masuk pegawai di rekam data pegawai belum diisi!");
                        return;
                    }
                    // if (yearInput<yearMulaiDapatCuti+1 && $scope.item.komponenIndexPegawai.id==5) {
                    //     $scope.isRouteLoading = false;
                    //     toastr.warning("Pegawai tidak mendapat jatah cuti untuk tahun input ini!");
                    //     return;
                    // }
                    var data = {
                        "statusEnabled": true,
                        "tahun": dateHelper.formatDate($scope.item.periode, "YYYY"),
                        "kdProfile": 0,
                        "pegawai": {
                            "id": $scope.item.pegawai.id
                        },
                        "value": $scope.item.jmlCuti,
                        "komponenIndex": {
                            "id": $scope.item.komponenIndexPegawai.id
                        },
                        "isTangguhkan": false
                    }
                    manageSdmNew.saveData(data, "sdm/save-jatah-cuti-dan-izin-pegawai").then(function (e) {
                        $scope.isRouteLoading = false;
                        loadDataCutiGrid();
                        init();
                    }, function (err) {
                        $scope.isRouteLoading = false;
                        throw err;
                    })
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.SaveCutiPerShift = function () {
                var listRawRequired = [
                    "item.periode|k-ng-model|Periode",
                    "item.komponenIndex|k-ng-model|Komponen Index"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.isRouteLoading = true;
                    var dataSend = [];
                    $scope.listKelompokShift.forEach(function (ls) {
                        if (ls.value) {
                            var tmpData = {
                                "kelompokShift": {
                                    "id": ls.id
                                },
                                "value": ls.value,
                                "noRec": "",
                                "komponenIndex": {
                                    "id": $scope.item.komponenIndex.id
                                },
                                "periode": dateHelper.formatDate($scope.item.periode, "YYYY"),
                                "isTangguhkan": false
                            }
                            dataSend.push(tmpData);
                        }
                    })
                    var data = {
                        "factorRateKelompokShift": dataSend
                    }
                    manageSdmNew.saveData(data, "sdm/save-jatah-cuti-dan-izin").then(function (e) {
                        $scope.isRouteLoading = false;
                        init();
                    }, function (err) {
                        $scope.isRouteLoading = false;
                        throw err;
                    })
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.findDataCuti = function () {
                var listRawRequired = [
                    "item.pegawai|k-ng-model|pegawai",
                    "item.periode|k-ng-model|periode",
                    "item.komponenIndexPegawai|k-ng-model|komponen"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.isRouteLoading = true;
                    delete $scope.item.jmlCuti;
                    delete $scope.item.sisaCuti;
                    $q.all([
                        manageSdmNew.getListData("sdm/get-data-pegawai?pegawaiId=" + $scope.item.pegawai.id),
                        manageSdmNew.getListData("sdm/get-data-cuti?pegawaiId=" + $scope.item.pegawai.id + "&statusPegawaiId=" + $scope.item.komponenIndexPegawai.id + "&kategoriPegawaiId=&year=" + new Date($scope.item.periode).getFullYear(), true)
                    ]).then(function (res) {
                        if (res[0].statResponse) {
                            $scope.tempItem = {
                                namaLengkap: $scope.item.pegawai.namaLengkap,
                                nipPns: res[0].data.data.nip,
                                unitKerja: res[0].data.data.unitKerja,
                                subUnitKerja: res[0].data.data.subUnitKerja,
                                tglMasuk: res[0].data.data.tglMasuk
                            }
                        }
                        if (res[1].statResponse) {
                            if ($scope.item.komponenIndexPegawai.id == 5) {
                                $scope.item.jmlCuti = res[1].data.data.dataCutiN;
                                $scope.item.sisaCuti = res[1].data.data.sisaCutiN;
                            } else if ($scope.item.komponenIndexPegawai.id == 21) {
                                $scope.item.jmlCuti = res[1].data.data.dataCutiB;
                                $scope.item.sisaCuti = res[1].data.data.sisaCutiB;
                            }

                            if ($scope.item.jumlahCuti <= 0) {
                                $scope.cutiHabis = true;
                            } else {
                                $scope.cutiHabis = false;
                            }
                            $scope.isRouteLoading = false;
                        }
                    }, function (error) {
                        $scope.isRouteLoading = false;
                        toastr.warning("Mohon lengkapi data pegawai terlebih dahulu!");
                        return;
                    })

                    loadDataCutiGrid();

                    // manageSdmNew.getListData("sdm/get-data-cuti?pegawaiId="+$scope.item.pegawai.id+"&statusPegawaiId="+$scope.item.komponenIndexPegawai.id+"&kategoriPegawaiId=&year=" + new Date($scope.item.periode).getFullYear(), true).then(function(dat){
                    //     $scope.item.jmlCuti = dat.data.data.dataCutiN;
                    //     $scope.item.sisaCuti = dat.data.data.sisaCutiN;
                    //     if ($scope.item.jumlahCuti <= 0) {
                    //         $scope.cutiHabis = true;
                    //     } else {
                    //         $scope.cutiHabis = false;
                    //     }
                    //     $scope.isRouteLoading = false;
                    // },(error) => {
                    //     $scope.isRouteLoading = false;
                    //     throw error;
                    // });
                } else {
                    ModelItem.showMessages(isValid.messages)
                }
            }
            loadDataCuti();



            //Grid
            $scope.daftarpegawaiOpt = {
                // toolbar: ["excel"],
                excel: {
                    allPages: true,
                    fileName: "RSAB HK Export Daftar Input Cuti - " + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                },
                pageable: true,
                selectable: 'row',

                dataBound: function (e) {
                    $(".k-state-disabled").each(function (index) {
                        $(this).removeClass('k-grid-delete')
                        $(this).removeClass('k-grid-edit')
                    });
                },

                columns: [
                    { field: "komponenIndex", title: "Komponen Index", width: "18%" },
                    // { field: "namaPegawai", title: "Nama Lengkap", width: "18%" },
                    // { field: "nipPegawai", title: "NIP", width: "18%" },
                    // { field: "unitKerja", title: "Unit Kerja", width: "14%" },
                    // { field: "subUnitKerja", title: "SubUnit Kerja", width: "15%" },
                    { field: "tahun", title: "Periode", width: "8%" },
                    { field: "value", title: "Jatah Cuti", width: "10%" },
                    { field: "cutiTerpakai", title: "Jatah Cuti Terpakai", width: "13%" },
                    { field: "sisaCuti", title: "Sisa Cuti", width: "10%" },
                    { field: "statusPenangguhan", title: "Penangguhan", width: "15%" },
                    // {
                    //     field: "isTangguhkan", title: "Penangguhan", width: "15%",
                    //     "template": "#if(isTangguhkan===false){# Belum / Tidak ditangguhkan #} else if(isTangguhkan===true){# Ditangguhkan #}#"
                    // },
                    {
                        "command":
                            [
                                {
                                    text: "Tangguhkan",
                                    click: penangguhanCuti,
                                    // imageClass: "k-icon k-floppy"

                                },

                                // {
                                //     text: "Disable", 
                                //     click: disableData, 
                                //     // imageClass: "k-icon k-delete"    
                                // }
                            ],

                        title: "",
                        width: "140px",
                    }
                ],
                // set column width to auto
                excelExport: function (e) {
                    var columns = e.workbook.sheets[0].columns;
                    columns.forEach(function (column) {
                        delete column.width;
                        column.autoWidth = true;
                    });
                }


            };

            function loadDataCutiGrid() {

                var idPegawai = "";
                if ($scope.item.pegawai.id != undefined) {
                    idPegawai = "&idPegawai=" + $scope.item.pegawai.id;
                    // idPegawai = "&idPegawai=" + 1345;
                }


                ManageSdmNew.getListData("sdm/get-all-jatah-cuti-pegawai/?" + idPegawai).then(function (res) {
                    var data = res.data.data;
                    $scope.daftarPegawai = new kendo.data.DataSource({
                        data: data,
                        pageSize: 15,
                        total: data.length,
                        serverPaging: false
                    });

                });
            }

            function penangguhanCuti(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (!dataItem) {
                    toastr.error("Data Tidak Ditemukan");
                    return;
                }
                if (dataItem.isTangguhkan === true) {
                    toastr.warning("Tidak ada perubahan data");
                    return;
                }

                // var dt = new Date().getFullYear();
                // if (dt!=dataItem.tahun){
                //     if (dataItem.tahun!="2018") {
                //         toastr.warning("Periode tahun pengajuan tidak sesuai dengan tahun saat ini");    
                //         return;
                //     }                    
                // }
                if (dataItem.komponenIndexId == 21) {
                    toastr.warning("Cuti Bersama tidak dapat ditangguhkan");
                    return;
                } else if (dataItem.komponenIndexId == 5 && dataItem.statusPenangguhan == "Tidak Ditangguhkan") {
                    toastr.warning("Sudah tidak dapat dilakukan penangguhan");
                    return;
                }

                var confirm = $mdDialog.confirm()
                    .title('Peringatan')
                    .textContent('Sisa cuti tahun ini akan ditangguhkan! Lanjut Simpan? ')
                    .ariaLabel('Lucky day')
                    .cancel('Tidak')
                    .ok('Ya')
                $mdDialog.show(confirm).then(function () {
                    $scope.isRouteLoading = true;
                    var data = {
                        "statusEnabled": true,
                        "tahun": dataItem.tahun,
                        "kdProfile": 0,
                        "pegawai": {
                            "id": dataItem.idPegawai
                        },
                        "value": dataItem.value,
                        "komponenIndex": {
                            "id": dataItem.komponenIndexId
                        },
                        "isTangguhkan": true
                    }
                    manageSdmNew.saveData(data, "sdm/save-jatah-cuti-dan-izin-pegawai").then(function (e) {
                        $scope.isRouteLoading = false;
                        loadDataCutiGrid();
                        init();
                    }, function (err) {
                        $scope.isRouteLoading = false;
                        throw err;
                    })
                })
            }

        }
    ]);
});