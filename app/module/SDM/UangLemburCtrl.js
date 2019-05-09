define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('UangLemburCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, ManageSdm, DateHelper) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.item.tanggalProses = moment($scope.now).format('DD-MM-yyyy');
            $scope.dataVOloaded = true;
            //Load data running number for uang lembur
            ManageSdm.getOrderList("sdm/get-running-text-struk-histori/").then(function(data) {
                $scope.item.nomorUang = data.data.data
            });
            //Ambil Jenis Pembayaran
            ManageSdm.getOrderList("service/list-generic/?view=JenisGaji&select=id,name", true).then(function(dat) {
                $scope.listJenisPembayaran = dat.data;

            });
            //Format Rupiah
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            };
            //Reformat Rupiah
            function reFormatRupiah(value, currency) {
                //var currency = "Rp. 37,000.00";
                var result = value.replace(currency, "");
                var number = Number(result.replace(/[^0-9\.]+/g, ""));
                return number;
            }
            /* $scope.$watch('item.periode', function(newValue, oldValue) {
                 console.log(oldValue + " " + newValue);

                 if (newValue !== undefined) {
                     console.log(DateHelper.getPeriodFormat(newValue));
                     ManageSdm.getOrderList("sdm/get-pegawai-lembur-by-priod/" + DateHelper.getPeriodFormat(newValue)).then(function(data) {
                         if (!_.isUndefined(data.data.data)) {
                             for (var x = 0; x < data.data.data.length; x++) {
                                 var element = data.data.data[x];
                                 var uangKotor = (data.data.data[x].totalUangMakan + data.data.data[x].totalUangLembur);
                                 element.kotor = $scope.formatRupiah(uangKotor, 'Rp.');
                                 var pajak = (uangKotor * (data.data.data[x].persenPajak / 100)).toFixed(2);
                                 element.persenPajak = $scope.formatRupiah(pajak, 'Rp.');
                                 var uangBersih = uangKotor - pajak;
                                 element.bersih = $scope.formatRupiah(uangBersih, 'Rp.');
                                 element.tarifLembur = $scope.formatRupiah(data.data.data[x].tarifLembur, 'Rp.');
                                 element.tarifMakan = $scope.formatRupiah(data.data.data[x].tarifMakan, 'Rp.');
                                 element.totalUangLembur = $scope.formatRupiah(data.data.data[x].totalUangLembur, 'Rp.');
                                 element.totalUangMakan = $scope.formatRupiah(data.data.data[x].totalUangMakan, 'Rp.');

                             }
                         }
                         $scope.sourceData = new kendo.data.DataSource({
                             data: data.data.data,
                             pageSize: 10,
                             total: data.length,
                             serverPaging: false
                         });
                     });
                 }
             });*/
            //Tombol Proses
            $scope.proses = function() {
                _.isUndefined
                if (!_.isUndefined($scope.item.periode)) {
                    console.log(DateHelper.getPeriodFormat($scope.item.periode));
                    ManageSdm.getOrderList("sdm/get-pegawai-lembur-by-priod/" + DateHelper.getPeriodFormat($scope.item.periode)).then(function(data) {
                        if (!_.isUndefined(data.data.data)) {
                            for (var x = 0; x < data.data.data.length; x++) {
                                var element = data.data.data[x];
                                var uangKotor = (data.data.data[x].totalUangMakan + data.data.data[x].totalUangLembur);
                                element.kotor = $scope.formatRupiah(uangKotor, 'Rp.');
                                var pajak = (uangKotor * (data.data.data[x].persenPajak / 100)).toFixed(2);
                                element.persenPajak = $scope.formatRupiah(pajak, 'Rp.');
                                var uangBersih = uangKotor - pajak;
                                element.bersih = $scope.formatRupiah(uangBersih, 'Rp.');
                                element.tarifLembur = $scope.formatRupiah(data.data.data[x].tarifLembur, 'Rp.');
                                element.tarifMakan = $scope.formatRupiah(data.data.data[x].tarifMakan, 'Rp.');
                                element.totalUangLembur = $scope.formatRupiah(data.data.data[x].totalUangLembur, 'Rp.');
                                element.totalUangMakan = $scope.formatRupiah(data.data.data[x].totalUangMakan, 'Rp.');

                            }
                        }
                        $scope.sourceData = new kendo.data.DataSource({
                            data: data.data.data,
                            pageSize: 10,
                            total: data.length,
                            serverPaging: false
                        });
                    });
                }

            }



            $scope.columnLaporanUjiHasil = [{
                template: "<input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='onCheckBoxClick($event, dataItem)' />",
                title: "<input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' />",
                width: 40
            }, {
                "field": "nip",
                "title": "NIP",
                width: "170px"

            }, {
                "field": "namaPegawai",
                "title": "Nama Pegawai",
                width: "200px"
            }, {
                "field": "golongan",
                "title": "Golongan",
                width: "150px"
            }, {
                "field": "statusPegawai",
                "title": "Status Pegawai",
                width: "150px"
            }, {
                "field": "jabatan",
                "title": "Jabatan",
                width: "150px"
            }, {
                "field": "totalJamLembur",
                "title": "Total Jam Lembur",
                width: "150px"
            }, {
                "field": "tarifLembur",
                "title": "Tarif Lembur",
                width: "150px"
            }, {
                "field": "totalUangLembur",
                "title": "Total Uang Lembur",
                width: "150px"
            }, {
                "field": "totalHariLembur",
                "title": "Total Hari Lembur",
                width: "150px"
            }, {
                "field": "tarifMakan",
                "title": "Tarif Uang Makan",
                width: "150px"
            }, {
                "field": "totalUangMakan",
                "title": "Total Uang Makan",
                width: "150px"
            }, {
                "field": "kotor",
                "title": "Kotor",
                width: "150px"
            }, {
                "field": "persenPajak",
                "title": "PPH",
                width: "150px"
            }, {
                "field": "bersih",
                "title": "Bersih",
                width: "150px"
            }];
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
            $scope.getType = function(x) {
                return typeof x;
            };
            $scope.isDate = function(x) {
                return x instanceof Date;
            };
            $scope.Save = function() {
                debugger;
                var grid = $scope.sourceData._data;
                var arrDataGrid = _.filter(grid, function(data) { return data.selected == true; });

                var arrSaveData = [];
                for (var x = 0; x < arrDataGrid.length; x++) {
                    var data = {
                        "idPegawai": arrDataGrid[x].idPegawai,
                        "strukVerifikasiSdm": arrDataGrid[x].noRecSdm,
                        "tglProses": $scope.now,
                        "keterangan": $scope.item.keterangan,
                        "priode": DateHelper.getBulanFormatted($scope.item.periode),
                        "pph": reFormatRupiah(arrDataGrid[x].persenPajak, 'Rp.'),
                        "uangBersih": reFormatRupiah(arrDataGrid[x].bersih, 'Rp.'),
                        "uangLembur": reFormatRupiah(arrDataGrid[x].totalUangLembur, 'Rp.'),
                        "uangMakan": reFormatRupiah(arrDataGrid[x].totalUangMakan, 'Rp.'),
                        "gajiKotor": reFormatRupiah(arrDataGrid[x].kotor, 'Rp.'),
                        "totalJamLembur": arrDataGrid[x].totalJamLembur,
                        "totalHariLembur": arrDataGrid[x].totalHariLembur,
                        "noStruk": $scope.item.nomorUang,
                        "jenisPembayaran": $scope.item.jenisPembayaran
                    }
                    arrSaveData.push(data);
                }

                ManageSdm.saveDataUji(arrSaveData, "sdm/save-perhitungan-uang-lembur").then(function(e) {
                    console.log(JSON.stringify(e.dataSend));
                    $scope.item = {};
                    $scope.now = new Date();
                    $scope.item.tanggalProses = moment($scope.now).format('DD-MM-yyyy');
                });

            };
            //Lukman Grid Checked

            $scope.dataSourceBackEnd = [];

            $scope.gridOptions = {
                selectable: true,
                sortable: true,
                pageable: true,
                /*dataSource: {
                    data: $scope.dataSourceBackEnd,
                    pageSize: 10
                },*/
                dataSource: {
                    data: $scope.dataSourceBackEnd,
                    /* type: "odata",
                     transport: {
                         read: "http://demos.kendoui.com/service/Northwind.svc/Customers"
                     },*/
                    pageSize: 10
                },
                columns: $scope.columnLaporanUjiHasil

            };

            $scope.toggleSelectAll = function(ev) {
                var grid = $(ev.target).closest("[kendo-grid]").data("kendoGrid");
                var items = grid.dataSource.data();
                items.forEach(function(item) {
                    item.selected = ev.target.checked;
                });
            };
            //End Lukman

        }
    ]);
});