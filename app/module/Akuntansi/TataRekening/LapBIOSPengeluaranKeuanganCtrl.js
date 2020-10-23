define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LapBIOSPengeluaranKeuanganCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'ReportService', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, ReportService, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog) {
            $scope.dataVOloaded = true;
            $scope.enableBtnSimpan = true;
            $scope.item = {};
            $scope.lk = {};
            $scope.max1 = new Date();
            $scope.max1.setDate($scope.max1.getDate() - 1);
            $scope.tglAwalSelected = {
                start: "month",
                depth: "month",
                format: "dd-MM-yyyy",
                max: $scope.max1,
                change: function () {
                    $scope.item.tglAkhir = undefined;
                    var datepicker = $("#tglAkhir").data("kendoDatePicker");
                    $scope.max2 = new Date($scope.item.tglAwal.getFullYear(), $scope.item.tglAwal.getMonth() + 1, 0);
                    if ($scope.max2 > $scope.max1) {
                        datepicker.setOptions({
                            min: $scope.item.tglAwal,
                            max: $scope.max1
                        });
                    } else {
                        datepicker.setOptions({
                            min: $scope.item.tglAwal,
                            max: $scope.max2
                        });
                    }
                }
            };
            $scope.tglAkhirSelected = {
                start: "month",
                depth: "month",
                format: "dd-MM-yyyy"
            };
            $scope.listStatusKirim = [
                {
                    "id": 1,
                    "statusKirim": "Terkirim"
                }, {
                    "id": 0,
                    "statusKirim": "Belum Terkirim"
                }

            ]

            var initIndikator = function () {
                $scope.gridIndikator = {
                    toolbar: [{
                        name: "create",
                        text: "Entri Data Pengeluaran Keuangan",
                        template: '<button ng-click="createNewCalculate()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Add Data</button>'
                    }, "excel"],
                    excel: {
                        allPages: true,
                        fileName: "RSAB HK Export Data Pengeluaran Keuangan - " + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                    },
                    excelExport: function (e) {
                        var sheet = e.workbook.sheets[0];
                        sheet.frozenRows = 2;
                        sheet.mergedCells = ["A1:F1"];
                        sheet.name = dateHelper.formatDate($scope.item.tglAwal, 'MMM YYYY');
                        var myHeaders = [{
                            value: "Data Pengeluaran Keuangan Periode " + dateHelper.formatDate($scope.periode, 'MMM YYYY'),
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
                            "title": "Kode Akun", "width": "150px"
                        },
                        {
                            "field": "indikator",
                            "title": "Akun", "width": "150px"
                        },
                        {
                            "field": "jumlah",
                            "title": "Jumlah", "width": "150px",
                            "template": "<p style='text-align:right'>{{formatRupiah('#: jumlah #', 'Rp.')}}</p>"
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

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            };

            $scope.loadDataGridIndikator = function () {
                $scope.isPopup = false;
                $scope.isRouteLoading = true;

                if ($scope.item.tglAwal) {
                    $scope.periode = $scope.item.tglAwal
                } else {
                    $scope.periode = new Date();
                }

                var periode = $scope.item.tglAwal ? dateHelper.formatDate($scope.item.tglAwal, 'YYYY-MM') : "";
                var tglAwal = $scope.item.tglAwal ? dateHelper.formatDate($scope.item.tglAwal, 'YYYY-MM-DD') + " 00:00:00" : "";
                var tglAkhir = $scope.item.tglAkhir ? dateHelper.formatDate($scope.item.tglAkhir, 'YYYY-MM-DD') + " 23:59:59" : "";
                var idIndikator = $scope.item.indikator ? $scope.item.indikator.id : "";
                var statusKirim = $scope.item.statusKirim && $scope.item.statusKirim.id == 1 ? true : $scope.item.statusKirim && $scope.item.statusKirim.id == 0 ? false : "";

                ReportService.getListData("reporting/transaksi-bios-indikator-lain?bulan=" + periode + "&tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir + "&idIndikator=" + idIndikator + "&statusKirim=" + statusKirim + "&jenisIndikator=3").then(function (data) {
                    $scope.dataSourceIndikator = new kendo.data.DataSource({
                        data: data.data.data.data,
                        pageSize: 10,
                        sort: [
                            { field: "tglT", dir: "asc" },
                            { field: "tglU", dir: "desc" },
                            { field: "kdIndikator", dir: "asc" }
                        ]
                    });

                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.loadData = function () {
                if (($scope.item.tglAwal == undefined && $scope.item.tglAkhir) || ($scope.item.tglAkhir == undefined && $scope.item.tglAwal)) {
                    toastr.warning("Tanggal awal dan tanggal akhir harus diisi!")
                    return
                }

                $scope.loadDataGridIndikator();
                initIndikator();
            }

            $scope.resetFilter = function () {
                $scope.item.tglAwal = undefined;
                $scope.item.tglAkhir = undefined;
                $scope.item.indikator = undefined;
                $scope.item.statusKirim = undefined;
            };

            $scope.init = function () {
                $q.all([
                    ManageSdmNew.getListData("pelayanan/indikator-pengeluaran-keuangan")
                ]).then(function (res) {
                    if (res[0].data) {
                        $scope.listIndikator = res[0].data;
                    }
                    $scope.loadDataGridIndikator();
                    initIndikator();

                    $scope.isPopup = false;
                    $scope.isRouteLoading = false;
                })
            };

            $scope.init();

            $scope.sentToBIOSG2 = function (data) {
                $scope.isPopup = false;
                $scope.isRouteLoading = true;

                ManageSdmNew.getListData("integrasi/send-to-bios?bulan=" + dateHelper.formatDate(data.tglT, "YYYY-MM") + "&noRec=" + data.noRec + "&jenisIndikator=3").then(function () {
                    $scope.isRouteLoading = false;
                    $scope.loadData();
                }, (error) => {
                    messageContainer.error(error.statusText);
                    $scope.isRouteLoading = false;
                });
            };

            $scope.sentAllToBIOSG2 = function (e) {
                var confirm = $mdDialog.confirm()
                    .title('Konfirmasi Batasan Pengiriman Data')
                    .textContent('Pengiriman data hanya untuk 50 data pertama')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('OK')
                    .cancel('Cancel');
                $mdDialog.show(confirm).then(function () {
                    $scope.isPopup = false;
                    $scope.isRouteLoading = true;

                    $scope.data = $scope.dataSourceIndikator.options.data;

                    ManageSdmNew.getListData("integrasi/send-to-bios?bulan=" + dateHelper.formatDate($scope.data[0].tglT, "YYYY-MM") + "&jenisIndikator=3").then(function (response) {
                        $scope.isRouteLoading = false;
                        if (response.data.data.length == 0) {
                            toastr.info("Data transaksi bulan " + dateHelper.formatDate($scope.data[0].tglT, "MM/YYYY") + " sudah terkirim!")
                        }
                        for (let i = 0; i < response.data.data.length; i++) {
                            if (!response.data.data[i].status) {
                                toastr.error("Too many requests!")
                                $scope.loadData();
                                return
                            }
                        }
                        $scope.loadData();
                    }, (error) => {
                        messageContainer.error(error.statusText);
                        $scope.isRouteLoading = false;
                    });
                }, function () {
                    // error function
                });
            }

            $scope.createNewCalculate = function () {
                clearPop();

                $scope.dateOptions = {
                    max: $scope.max1
                };

                $scope.idGrid = null;

                $scope.popUpSimpan.center().open();
                var actions = $scope.popUpSimpan.options.actions;
                actions.splice(actions.indexOf("Close"), 1);
                $scope.popUpSimpan.setOptions({
                    actions: actions
                });
            };

            function clearPop() {
                $scope.id = "";
                $scope.lk.indikator = null;
                $scope.lk.jumlah = "";
                $scope.lk.tglTransaksi = undefined;
            }

            $scope.batal = function () {
                $scope.lk.idGrid = null;

                $scope.popUpSimpan.close();
            };

            $scope.simpan = function (e) {
                $scope.isPopup = true;
                $scope.isRouteLoading = true;

                var listRawRequired = [
                    "lk.indikator|k-ng-model|Indikator",
                    "lk.jumlah|k-ng-model|Jumlah",
                    "lk.tglTransaksi|k-ng-model|Tanggal Transaksi"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    ManageSdmNew.getListData("pelayanan/check-saldo-awal-exists?indikatorId=" + $scope.lk.indikator.id).then(function (response) {
                        $scope.isSaldoAwal = response.data;
                        var tanggal = dateHelper.formatDate($scope.lk.tglTransaksi, "YYYY-MM-DD") + " 00:00:00";

                        var data = [];
                        var jsonData = {
                            "indikatorBIOSVO": {
                                "id": $scope.lk.indikator.id
                            },
                            "jumlah": $scope.lk.jumlah,
                            "bulan": dateHelper.toMonthNum(new Date(tanggal).getMonth()),
                            "tahun": new Date(tanggal).getFullYear(),
                            "tglTransaksi": new Date(tanggal)
                        }
                        data.push(jsonData);

                        if (!$scope.isSaldoAwal) {
                            $scope.isRouteLoading = false;
                            $scope.popUpSimpan.close();

                            var confirm = $mdDialog.confirm()
                                .title('Konfirmasi Entri Saldo Awal')
                                .textContent('Saldo awal yang diinput harus dari rentang 01/01/2019 00:00:00 - ' + dateHelper.formatDate($scope.lk.tglTransaksi, "DD/MM/YYYY") + " 23:59:59")
                                .ariaLabel('Lucky day')
                                .targetEvent(e)
                                .ok('Lanjutkan')
                                .cancel('Batalkan');
                            $mdDialog.show(confirm).then(function () {
                                $scope.isPopup = false;
                                $scope.isRouteLoading = true;

                                ManageSdmNew.saveData(data, "pelayanan/save-transaksi-indikator-bios").then(function (e) {
                                    $scope.isRouteLoading = false;
                                    $scope.loadData();
                                }, (error) => {
                                    $scope.isRouteLoading = false;
                                });
                            }, function () {
                                // error function
                            });
                        } else {
                            ManageSdmNew.saveData(data, "pelayanan/save-transaksi-indikator-bios").then(function (e) {
                                if (e.data.data.length == 0) {
                                    messageContainer.error("Tidak diperkenankan untuk entri kembali data saldo awal!");
                                }

                                $scope.isRouteLoading = false;
                                $scope.popUpSimpan.close();
                                $scope.loadData();
                            }, (error) => {
                                $scope.isRouteLoading = false;
                            });
                        }
                    });
                } else {
                    $scope.isRouteLoading = false;
                    ModelItem.showMessages(isValid.messages);
                }
            }
        }
    ]);
});
