define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LapBIOSLayananKesehatanCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'ReportService', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, ReportService, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog) {
            $scope.dataVOloaded = true;
            $scope.enableBtnSimpanHitung = true;
            $scope.item = {};
            $scope.lk = {};
            $scope.now = new Date();
            $scope.yearSelected = {
                start: "year",
                depth: "year",
                format: "MMMM yyyy"
            };

            var initIndikator = function () {
                $scope.gridIndikator = {
                    toolbar: [{
                        name: "create",
                        text: "Hitung Data Layanan Kesehatan",
                        template: '<button ng-click="createNewCalculate()" id="btnCreateNewJabatan" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Add Data</button>'
                    }, "excel"],
                    excel: {
                        allPages: true,
                        fileName: "RSAB HK Export Data Layanan Kesehatan - " + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                    },
                    excelExport: function (e) {
                        var sheet = e.workbook.sheets[0];
                        sheet.frozenRows = 2;
                        sheet.mergedCells = ["A1:G1"];
                        sheet.name = dateHelper.formatDate($scope.item.periode, 'MMM YYYY');
                        var myHeaders = [{
                            value: "Data Layanan Kesehatan Periode " + dateHelper.formatDate($scope.periode, 'MMM YYYY'),
                            fontSize: 14,
                            textAlign: "center",
                            background: "#ffffff",
                        }];
                        sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 30 });
                    },
                    pageable: true,
                    columns: [
                        {
                            "field": "kdIndikator",
                            "title": "Kode Indikator", "width": "150px"
                        },
                        {
                            "field": "indikator",
                            "title": "Indikator", "width": "150px"

                        },
                        {
                            "field": "jmlHari",
                            "title": "Jumlah Hari Rawat", "width": "150px",
                            "template": "<p style='text-align:right'>{{ '#: jmlHari #' }}</p>"
                        },
                        {
                            "field": "jmlPasien",
                            "title": "Jumlah Pasien", "width": "150px",
                            "template": "<p style='text-align:right'>{{ '#: jmlPasien #' }}</p>"
                        },
                        {
                            "field": "tglTransaksi",
                            "title": "Tanggal Transaksi", "width": "150px",
                            "template": "<p style='text-align:right'>{{ '#: tglTransaksi #' }}</p>"
                        },
                        {
                            "field": "tglUpdate",
                            "title": "Tanggal Update", "width": "150px",
                            "template": "<p style='text-align:right'>{{ '#: tglUpdate #' }}</p>"
                        },
                        {
                            "field": "statusKirim",
                            "title": "Status Kirim", "width": "150px",
                            "template": "#if(statusKirim == 'Belum Terkirim'){# <p style='text-align:center'><button ng-click='sentToBIOSG2(dataItem)' class='k-button k-button-icontext k-grid-Cetak'><span class='k-icon k-i-upload'></span>Kirim</button></p> #} else {# <p style='text-align:center'>{{ '#: statusKirim #' }}</p> #}#"
                        }
                    ]
                };
            };

            $scope.loadDataGridIndikator = function () {
                $scope.isPopup = false;
                $scope.isRouteLoading = true;

                if ($scope.item.periode) {
                    $scope.periode = $scope.item.periode
                } else {
                    $scope.periode = new Date();
                }

                ReportService.getListData("reporting/transaksi-bios-layanan-kesehatan?bulan=" + dateHelper.formatDate($scope.item.periode, 'YYYY-MM')).then(function (data) {
                    $scope.dataSourceIndikator = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 5,
                        sort: [
                            { field: "tglT", dir: "asc" },
                            { field: "tglU", dir: "desc" },
                            { field: "kdIndikator", dir: "asc" }
                        ]
                    });

                    if (data.data.data.length == 0) {
                        $scope.isSaldoAwal = true;
                    } else {
                        $scope.isSaldoAwal = false;
                    }

                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.loadData = function () {
                $scope.loadDataGridIndikator();
                initIndikator();
            }

            $scope.init = function () {
                $scope.loadData();

                $scope.isPopup = false;
                $scope.isRouteLoading = false;
            };

            $scope.init();

            $scope.sentToBIOSG2 = function (data) {
                $scope.isPopup = false;
                $scope.isRouteLoading = true;

                $scope.selectedData = {
                    kelas: data.kdIndikator,
                    jml_hari: data.jmlHari,
                    jml_pasien: data.jmlPasien,
                    tglTransaksi: dateHelper.formatDate(data.tgl, "YYYY/MM/DD")
                };

                var dataUpdate = [];
                var transactionData = {
                    noRec: data.noRec
                }
                dataUpdate.push(transactionData);

                $.post('https://training-bios2.kemenkeu.go.id/api/token', { satker: 520611, key: "SQs8eQV27oFf3czNRZqCloYyyjS8HkVI" }, function (request) {
                    if (request.status == "MSG20004") {
                        $scope.token = request.token;
                        $.ajax({
                            url: 'https://training-bios2.kemenkeu.go.id/api/ws/kesehatan/prod',
                            type: 'post',
                            data: $scope.selectedData,
                            headers: {
                                token: $scope.token
                            },
                            dataType: 'json',
                            success: function (data) {
                                console.info(data);
                            }
                        });
                        ManageSdmNew.saveData(dataUpdate, "pelayanan/save-transaksi-indikator-bios").then(function (e) {
                            $scope.isRouteLoading = false;
                            $scope.loadData();
                        }, (error) => {
                            $scope.isRouteLoading = false;
                        });
                    } else {
                        $scope.isRouteLoading = false;
                        messageContainer.error(request.message);
                        return;
                    }
                });
            };

            $scope.sentAllToBIOSG2 = function () {
                $scope.isPopup = false;
                $scope.isRouteLoading = true;

                var dataSource = $scope.dataSourceIndikator.options.data;
                if (dataSource != undefined) {
                    $.post('https://training-bios2.kemenkeu.go.id/api/token', { satker: 520611, key: "SQs8eQV27oFf3czNRZqCloYyyjS8HkVI" }, function (request) {
                        if (request.status == "MSG20004") {
                            $scope.token = request.token;
                            var dataUpdate = []
                            for (let i = 0; i < dataSource.length; i++) {
                                if (dataSource[i].statusKirim == "Belum Terkirim") {
                                    var transactionData = {}
                                    transactionData = {
                                        noRec: dataSource[i].noRec
                                    }
                                    dataUpdate.push(transactionData);

                                    $scope.objSent = {
                                        "kelas": dataSource[i].kdIndikator,
                                        "jml_hari": dataSource[i].jmlHari,
                                        "jml_pasien": dataSource[i].jmlPasien,
                                        "tglTransaksi": dateHelper.formatDate(dataSource[i].tgl, "YYYY/MM/DD")
                                    }
                                    $.ajax({
                                        url: 'https://training-bios2.kemenkeu.go.id/api/ws/kesehatan/prod',
                                        type: 'post',
                                        data: $scope.objSent,
                                        headers: {
                                            token: $scope.token
                                        },
                                        dataType: 'json',
                                        success: function (data) {
                                            console.info(data);
                                        }
                                    });
                                }
                            }
                            ManageSdmNew.saveData(dataUpdate, "pelayanan/save-transaksi-indikator-bios").then(function (e) {
                                $scope.isRouteLoading = false;
                                $scope.loadData();
                            }, (error) => {
                                $scope.isRouteLoading = false;
                            });
                        } else {
                            $scope.isRouteLoading = false;
                            messageContainer.error(request.message);
                            return;
                        }
                    });
                }
            }

            $scope.createNewCalculate = function () {
                clearPop();

                $scope.startDateOptions = {
                    disableDates: function (date) {
                        return (date && date.getTime() > (new Date().getTime() - 1 * 24 * 60 * 60 * 1000));
                    }
                };

                $scope.endDateOptions = {
                    disableDates: function (date) {
                        return (date && date.getTime() > (new Date().getTime() - 1 * 24 * 60 * 60 * 1000));
                    }
                };

                $scope.idGridHitung = null;
                $scope.lk.tglAwal = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);
                $scope.lk.tglAkhir = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);

                $scope.popUpHitung.center().open();
                var actions = $scope.popUpHitung.options.actions;
                actions.splice(actions.indexOf("Close"), 1);
                $scope.popUpHitung.setOptions({
                    actions: actions
                });
            };

            function clearPop() {
                $scope.id = "";
                $scope.lk.tglAwal = null;
                $scope.lk.tglAkhir = null;
            }

            $scope.batal = function () {
                $scope.lk.idGridHitung = null;

                $scope.popUpHitung.close();
            };

            $scope.hitungDanSimpan = function (e) {
                $scope.isPopup = true;
                $scope.isRouteLoading = true;

                var listRawRequired = [
                    "lk.tglAwal|k-ng-model|Tanggal Awal",
                    "lk.tglAkhir|ng-model|Tanggal Akhir"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var tanggal1 = dateHelper.formatDate($scope.lk.tglAwal, "YYYY-MM-DD") + " 00:00:00";
                    var tanggal2 = dateHelper.formatDate($scope.lk.tglAkhir, "YYYY-MM-DD") + " 23:59:59";

                    if ($scope.isSaldoAwal) {
                        $scope.isRouteLoading = false;
                        $scope.popUpHitung.close();

                        var confirm = $mdDialog.confirm()
                            .title('Konfirmasi Perhitungan Saldo Awal')
                            .textContent('Saldo awal terhitung dari ' + dateHelper.formatDate($scope.lk.tglAwal, "DD/MM/YYYY") + " 00:00:00 - " + dateHelper.formatDate($scope.lk.tglAkhir, "DD/MM/YYYY") + " 23:59:59")
                            .ariaLabel('Lucky day')
                            .targetEvent(e)
                            .ok('Ya')
                            .cancel('Tidak');
                        $mdDialog.show(confirm).then(function () {
                            $scope.isPopup = false;
                            $scope.isRouteLoading = true;

                            ManageSdmNew.saveDataNoJson("pelayanan/hitung-simpan-bios-layanan-kesehatan?tglAwal=" + tanggal1 + "&tglAkhir=" + tanggal2).then(function (e) {
                                $scope.isRouteLoading = false;
                                $scope.loadData();
                            }, (error) => {
                                $scope.isRouteLoading = false;
                            });
                        }, function () {
                            // error function
                        });
                    } else {
                        ManageSdmNew.saveDataNoJson("pelayanan/hitung-simpan-bios-layanan-kesehatan?tglAwal=" + tanggal1 + "&tglAkhir=" + tanggal2).then(function (e) {
                            if (e.data.data.data.length == 0) {
                                messageContainer.error("Tidak diperkenankan untuk menghitung kembali saldo awal!");
                            }

                            $scope.isRouteLoading = false;
                            $scope.popUpHitung.close();
                            $scope.loadData();
                        }, (error) => {
                            $scope.isRouteLoading = false;
                        });
                    }
                } else {
                    $scope.isRouteLoading = false;
                    ModelItem.showMessages(isValid.messages);
                }
            }
        }
    ]);
});
