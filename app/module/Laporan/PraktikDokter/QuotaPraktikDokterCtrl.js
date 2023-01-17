define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('QuotaPraktikDokterCtrl', ['$mdDialog', '$timeout', 'ModelItem', '$state', '$q', '$rootScope', '$scope', 'CacheHelper', 'DateHelper', 'ManageTataRekening', 'ManageSdm',
        function ($mdDialog, $timeout, ModelItem, $state, $q, $rootScope, $scope, cacheHelper, dateHelper, manageTataRekening, ManageSdm) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.now = new Date();
            $scope.item.listQuotaPraktikDokter = {};
            $scope.pegawaiLogin = ModelItem.getPegawai();

            function init() {
                ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
                    $scope.listPegawai = dat.data;
                });
            }

            init();

            function generateKolom() {
                if ($scope.item.tahun) {
                    var year = $scope.item.tahun.getYear();
                    var month = $scope.item.tahun.getMonth();
                    var dateInMonth = new Date(year, month + 1, 0);
                    var listDay = [];
                    for (var i = 0; i < dateInMonth.getDate(); i++) {
                        var data = {
                            field: "[" + (i + 1) + "]",
                            title: (i + 1).toString(),
                            width: "50px", attributes: { style: "text-align: right;" }, headerAttributes: { style: "text-align: center; " }
                        };
                        listDay.push(data);
                    }
                    return listDay;
                }

            }

            $scope.yearSelected = {
                start: "year",
                depth: "year",
                format: "MMMM yyyy"
            };

            $scope.formatTanggal = (tanggal) => {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }

            $scope.getServiceTable = () => {

                $scope.getTransaksiGrid();
            }

            $scope.getTransaksiGrid = () => {
                var listRawRequired = [
                    "item.tahun|k-ng-model|Pilih Periode",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.isRouteLoading = true;
                    let newTahun = dateHelper.getFormatMonthPicker($scope.item.tahun);
                    let param = '';
                    ($scope.item.dokter) ? param += 'iddokter=' + $scope.item.dokter.id + '&' : '';
                    param += 'tahun=' + newTahun.slice(0, 4) + '&';
                    param += 'bulan=' + newTahun.slice(5, 6);
                    param += '&page=1'
                    manageTataRekening.getDataTableTransaksi("laporan/get-laporan-kunjungan-by-dokter?" + param, false)
                        .then((data) => {
                            let newArr = [];
                            data.data.forEach(data => {
                                var customData = {};
                                for (let key in data) {
                                    switch (key) {
                                        case "volume_kunjungan":
                                            data.volume_kunjungan.forEach(subElement => {
                                                let tgl = subElement.tglregistrasi;
                                                let key = tgl.slice(-2);
                                                if (key[0] === "0") {
                                                    key = key.slice(-1);
                                                    customData[key] = subElement["volume_pasien"];
                                                } else {
                                                    customData[key] = subElement["volume_pasien"];
                                                }
                                            });
                                            break;
                                        default:
                                            customData[key] = data[key];
                                    }
                                }
                                newArr.push(customData);
                                var i = 0;

                                if (newArr != undefined) {
                                    for (i = 0; i < newArr.length; i++)
                                        newArr[i].no = i + 1;
                                }
                            });
                            $scope.dataQuotaPraktikDokter = newArr;
                        })
                        .then(() => {
                            $scope.optColums = [
                                {
                                    field: "rowNumber",
                                    title: "No",
                                    template: "<span class='row-number'></span>",
                                    width: 50,
                                }, {
                                    field: "ruangan",
                                    title: "Klinik Rawat Jalan",
                                    width: 200,
                                }, {
                                    field: "nama_dokter",
                                    title: "Dokter",
                                    width: 200,
                                },
                                {
                                    field: "jumlah_hari_praktik",
                                    title: "Hari Praktik",
                                    width: 100,
                                },
                                {
                                    field: "total_jam_praktik",
                                    title: "Jam Praktik",
                                    width: 100,
                                },
                                {
                                    field: "total_quota",
                                    title: "Quota",
                                    width: 100,
                                },
                                {
                                    title: "Rincian",
                                    headerAttributes: { style: "text-align: center" },
                                    columns: generateKolom(),
                                },
                            ];

                        })
                        .then((data) => {
                            $scope.optGrid = {
                                dataSource: {
                                    data: $scope.dataQuotaPraktikDokter,
                                },
                                columns: $scope.optColums,
                                pageSize: 10,
                                serverPaging: false,
                                toolbar: ["excel"],
                                excel: {
                                    fileName: "Quota Praktik Dokter" + moment($scope.now).format('DD/MMM/YYYY'),
                                    allPages: true,
                                },
                                selectable: 'row',
                                dataBound: function () {
                                    var rows = this.items();
                                    $(rows).each(function () {
                                        var index = $(this).index() + 1;
                                        var rowLabel = $(this).find(".row-number");
                                        $(rowLabel).html(index);
                                    });
                                },
                                change: function (e) {
                                    $scope.gridServerSide(e.sender._page)
                                }
                            }
                            $scope.listQuotaPraktikDokter = new kendo.data.DataSource({
                                data: $scope.dataQuotaPraktikDokter,
                            });
                            var grid = $("#gridQuotaPraktikDokter").data("kendoGrid");
                            if (grid) {
                                grid.setOptions($scope.optGrid);
                            }
                        })
                        .then(() => {
                            $scope.isRouteLoading = false;
                        })
                } else {
                    ModelItem.showMessages(isValid.messages);
                }

            }

            $scope.gridServerSide = (current_page) => {
                if (current_page != 1) {
                    let newTahun = dateHelper.getFormatMonthPicker($scope.item.tahun);
                    let param = '';
                    ($scope.item.dokter) ? param += 'iddokter=' + $scope.item.dokter.id + '&' : '';
                    param += 'tahun=' + newTahun.slice(0, 4) + '&';
                    param += 'bulan=' + newTahun.slice(5, 6);
                    param += '&page=1'
                    manageTataRekening.getDataTableTransaksi("laporan/get-laporan-kunjungan-by-dokter?" + param, false)
                        .then((data) => {
                            let newArr = [];
                            data.data.forEach(data => {
                                var customData = {};
                                for (let key in data) {
                                    switch (key) {
                                        case "volume_kunjungan":
                                            data.volume_kunjungan.forEach(subElement => {
                                                let tgl = subElement.tglregistrasi;
                                                let key = tgl.slice(-2);
                                                if (key[0] === "0") {
                                                    key = key.slice(-1);
                                                    customData[key] = subElement["volume_pasien"];
                                                } else {
                                                    customData[key] = subElement["volume_pasien"];
                                                }
                                            });
                                            break;
                                        default:
                                            customData[key] = data[key];
                                    }
                                }
                                newArr.push(customData);
                                var i = 0;
    
                                if (newArr != undefined) {
                                    for (i = 0; i < newArr.length; i++)
                                        newArr[i].no = i + 1;
                                }
                            });
                            $scope.dataQuotaPraktikDokter = newArr;
                        })
                        .then(() => {
                            $scope.optColums = [
                                {
                                    field: "rowNumber",
                                    title: "No",
                                    template: "<span class='row-number'></span>",
                                    width: 50,
                                }, {
                                    field: "ruangan",
                                    title: "Klinik Rawat Jalan",
                                    width: 200,
                                }, {
                                    field: "nama_dokter",
                                    title: "Dokter",
                                    width: 200,
                                },
                                {
                                    field: "jumlah_hari_praktik",
                                    title: "Hari Praktik",
                                    width: 100,
                                },
                                {
                                    field: "total_jam_praktik",
                                    title: "Jam Praktik",
                                    width: 100,
                                },
                                {
                                    field: "total_quota",
                                    title: "Quota",
                                    width: 100,
                                },
                                {
                                    title: "Rincian",
                                    headerAttributes: { style: "text-align: center" },
                                    columns: generateKolom(),
                                },
                            ];
    
                        })
                        .then((data) => {
                            $scope.optGrid = {
                                dataSource: {
                                    data: $scope.dataQuotaPraktikDokter,
                                },
                                columns: $scope.optColums,
                                pageSize: 10,
                                serverPaging: false,
                                toolbar: ["excel"],
                                excel: {
                                    fileName: "Quota Praktik Dokter" + moment($scope.now).format('DD/MMM/YYYY'),
                                    allPages: true,
                                },
                                selectable: 'row',
                                dataBound: function () {
                                    var rows = this.items();
                                    $(rows).each(function () {
                                        var index = $(this).index() + 1;
                                        var rowLabel = $(this).find(".row-number");
                                        $(rowLabel).html(index);
                                    });
                                },
                                change: function (e) {
                                    if(current_page!=e.sender._page){
                                        $scope.gridServerSide(e.sender._page)
                                    }
                                }
                            }
                            $scope.listQuotaPraktikDokter = new kendo.data.DataSource({
                                data: $scope.dataQuotaPraktikDokter,
                            });
                            var grid = $("#gridQuotaPraktikDokter").data("kendoGrid");
                            if (grid) {
                                grid.setOptions($scope.optGrid);
                            }
                        })
                        .then(() => {
                            $scope.isRouteLoading = false;
                        })
                }
            }
        }
    ]);
});