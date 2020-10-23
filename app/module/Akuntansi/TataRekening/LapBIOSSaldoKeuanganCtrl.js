define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LapBIOSSaldoKeuanganCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'ReportService', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
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
                        text: "Entri Data Saldo Keuangan",
                        template: '<button ng-click="createNewCalculate()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Add Data</button>'
                    }, "excel"],
                    excel: {
                        allPages: true,
                        fileName: "RSAB HK Export Data Saldo Keuangan - " + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                    },
                    excelExport: function (e) {
                        var sheet = e.workbook.sheets[0];
                        sheet.frozenRows = 2;
                        sheet.mergedCells = ["A1:G1"];
                        sheet.name = dateHelper.formatDate($scope.item.tglAwal, 'MMM YYYY');
                        var myHeaders = [{
                            value: "Data Saldo Keuangan Periode " + dateHelper.formatDate($scope.periode, 'MMM YYYY'),
                            fontSize: 14,
                            textAlign: "center",
                            background: "#ffffff",
                        }];
                        sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 30 });
                    },
                    pageable: true,
                    columns: [
                        {
                            "field": "bank",
                            "title": "Bank", "width": "150px"
                        },
                        {
                            "field": "norek",
                            "title": "No Rekening", "width": "150px"
                        },
                        {
                            "field": "jumlah",
                            "title": "Jumlah", "width": "150px",
                            "template": "<p style='text-align:right'>{{formatRupiah('#: jumlah #', 'Rp.')}}</p>"
                        },
                        {
                            "field": "rekening",
                            "title": "Rekening", "width": "150px"
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
                var kdBank = $scope.item.bank ? $scope.item.bank.kode : "";
                var kdRek = $scope.item.rekening ? $scope.item.rekening.kode : "";
                var statusKirim = $scope.item.statusKirim && $scope.item.statusKirim.id == 1 ? true : $scope.item.statusKirim && $scope.item.statusKirim.id == 0 ? false : "";

                ReportService.getListData("reporting/transaksi-bios-saldo-keuangan?bulan=" + periode + "&tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir + "&kdBank=" + kdBank + "&kdRek=" + kdRek + "&statusKirim=" + statusKirim + "&jenisIndikator=3").then(function (data) {
                    $scope.dataSourceIndikator = new kendo.data.DataSource({
                        data: data.data.data.data,
                        pageSize: 10,
                        sort: [
                            { field: "tglT", dir: "asc" },
                            { field: "tglU", dir: "desc" },
                            { field: "kdRek", dir: "asc" }
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
                $scope.item.bank = undefined;
                $scope.item.rekening = undefined;
                $scope.item.statusKirim = undefined;
            };

            $scope.init = function () {
                $q.all([
                    ManageSdmNew.getListData("integrasi/get-list-bank"),
                    ManageSdmNew.getListData("integrasi/get-list-rekening")
                ]).then(function (res) {
                    if (res[0].data) {
                        $scope.listBank = res[0].data.data;
                    }
                    if (res[1].data) {
                        $scope.listRekening = res[1].data.data;
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

                ManageSdmNew.getListData("integrasi/send-to-bios?bulan=" + dateHelper.formatDate(data.tglT, "YYYY-MM") + "&noRec=" + data.noRec + "&jenisIndikator=4").then(function () {
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

                    ManageSdmNew.getListData("integrasi/send-to-bios?bulan=" + dateHelper.formatDate($scope.data[0].tglT, "YYYY-MM") + "&jenisIndikator=4").then(function (response) {
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
                $scope.lk.bank = null;
                $scope.lk.norek = "";
                $scope.lk.rekening = null;
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
                    "lk.bank|k-ng-model|Bank",
                    "lk.norek|k-ng-model|No Rekening",
                    "lk.jumlah|k-ng-model|Saldo",
                    "lk.rekening|k-ng-model|Rekening",
                    "lk.tglTransaksi|k-ng-model|Tanggal Transaksi"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var tanggal = dateHelper.formatDate($scope.lk.tglTransaksi, "YYYY-MM-DD") + " 00:00:00";

                    var data = [];
                    var jsonData = {
                        "kdBank": $scope.lk.bank.kode,
                        "norek": $scope.lk.norek,
                        "jumlah": $scope.lk.jumlah,
                        "kdRek": $scope.lk.rekening.kode,
                        "bulan": dateHelper.toMonthNum(new Date(tanggal).getMonth()),
                        "tahun": new Date(tanggal).getFullYear(),
                        "tglTransaksi": new Date(tanggal)
                    }
                    data.push(jsonData);

                    ManageSdmNew.saveData(data, "pelayanan/save-transaksi-indikator-bios").then(function (e) {
                        $scope.isPopup = false;
                        $scope.isRouteLoading = false;
                        $scope.popUpSimpan.close();

                        $scope.loadData();
                    }, (error) => {
                        $scope.isRouteLoading = false;
                    });
                } else {
                    $scope.isRouteLoading = false;
                    ModelItem.showMessages(isValid.messages);
                }
            }
        }
    ]);
});
