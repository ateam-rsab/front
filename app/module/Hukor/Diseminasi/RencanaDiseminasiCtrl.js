define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RencanaDiseminasiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state',
        'ManageSarpras', '$q',
        function ($rootScope, $scope, ModelItem, DateHelper, $state, ManageSarpras, $q) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.eksternal = false;
            $scope.item.tujuan = "1";
            $scope.redirect = function () {
                window.location = "#/InformasiRencanaDiseminasi";
            }
            $scope.listProduk;
            $q.all([
                ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true),
                ManageSarpras.getOrderList("service/list-generic/?view=Rekanan&select=id,namaRekanan", true),
                ManageSarpras.getOrderList("service/list-generic/?view=Produk&select=id,namaProduk&criteria=detailJenisProduk.jenisProduk.id&values=279", true),
                ManageSarpras.getOrderList("penyuluhan/get-no-planning/", true)
            ]).then(function (data) {
                $scope.listRuangan = data[0].data;
                $scope.listRekanan = data[1].data;
                $scope.listProduk = data[2].data;
                $scope.item.noPlanning = data[3].data.data.noSurat;
            });

            $scope.produkDropDown = function (container, options) {
                // $('<input required name="' + options.field + '"/>')
                $("<input kendo-combo-box required name='" + options.field + "' k-data-text-field=\"'namaProduk'\" k-data-value-field=\"'namaProduk'\" k-data-source=\"listProduk\" style=\"width: 100%\" >")
                    .appendTo(container)
            }

            $scope.colgridRencanaDiseminasi =
                {
                    toolbar: [{name: "create", text: "Tambah"}],
                    columns: [
                        {
                            "field": "komponen",
                            "title": "Komponen",
                            "editor": $scope.produkDropDown,
                            "width": "35%",
                            footerTemplate:"Total :"
                        },
                        {
                            "field": "qty",
                            "title": "Qty",
                            "width": "10%"
                        },
                        {
                            "field": "hargaSatuan",
                            "title": "Harga Satuan",
                            "width": "10%"
                        },
                        {
                            "field": "totalHarga",
                            "title": "Total Harga",
                            "width": "20%",
                            aggregates: ["sum"],
                            footerTemplate: " #= kendo.toString(sum,'0')#"
                        },

                        {
                            "field": "setBiaya",
                            "title": "Set Biaya Peserta",
                            "width": "15%",
                            "template": '<input ng-model = "dataItem.setBiaya" type="checkbox"></input>'
                            //"template": '<input type="checkbox" #= setBiaya ? "checked=checked" : "" # ></input>'
                        },
                        {
                            "command": "destroy",
                            "title": "&nbsp;",
                            "width": "10%"
                        }
                    ],
                    editable: true
                };
 
            $scope.kl = function (rencanaDiseminasi) {
                $scope.rencanaDiseminasi = rencanaDiseminasi;
            };

            $scope.gridRencanaDiseminasi = new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        fields: {
                            komponen: {
                                editable: true,
                                validation: {required: true}/*,
                                 defaultValue: {id: 0, namaProduk: "--Pilih barang"}*/
                            },
                            qty: {type: "number", min: 0, validation: {required: true}},
                            hargaSatuan: { type: "number", min: 0, validation: {required: true}},
                            totalHarga: {editable: false, type: "number", min: 0, validation: {required: true}},
                            setBiaya: {type: "boolean", defaultValue: false}
                        }
                    }
                },
                aggregate: [
                    {field: "totalHarga", aggregate: "sum"}
                ],
                change: function (e) {
                    if (e.field && e.action === "itemchange") {
                        $scope.rencanaDiseminasi.totalHarga = $scope.rencanaDiseminasi.qty * $scope.rencanaDiseminasi.hargaSatuan;
                    }
                    if (e.action === "sync") {
                        $scope.rebuild();
                    }
                }
            });

            $scope.getKomponen = function (data, dataItem, columns) {
                debugger;
                $scope.dataItem = dataItem;
                $scope.dataItem.komponen = $scope.dataItem.komponens.namaProduk;
                $scope.dataItem.komponenId = $scope.dataItem.komponens.id;
            }

            $scope.getTotal = function (data, dataItem, columns) {
                $scope.dataItem = dataItem;
                $scope.dataItem.totalHarga = $scope.dataItem.qty * $scope.dataItem.hargaSatuan;
            }

            $scope.$watch('item.tujuan', function (e) {
                if ($scope.item.tujuan === "1") {
                    $scope.eksternal = false;
                } else {
                    $scope.eksternal = true;
                }
            });

            $scope.save = function () {
                var listRawRequired = [
                    "item.noPlanning|ng-model|No Planning",
                    "item.judulDiseminasi|ng-model|Judul Diseminasi",
                    "item.deskripsi|ng-model|Deskripsi",
                    "item.ruangan|k-ng-model|Ruangan",
                    "item.periodeAwal|k-ng-model|Tanggal Pelaksanaan",
                    "item.periodeAkhir|k-ng-model|Tanggal Pelaksanaan"
                ];

                if ($scope.item.tujuan === "2") {
                    listRawRequired.push("item.rekanan|ng-model|Rekanan");
                }

                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if (isValid.status) {
                    var data;
                    var dataGrid = []; 
                    angular.forEach($scope.gridRencanaDiseminasi._data, function (item) {
                        if (item.komponen.id !== 0) {
                            dataGrid.push({
                                "noPlanning": $scope.item.noPlanning,
                                "tglPlanning": $scope.now,
                                "produk": {
                                    'namaProduk': item.komponen
                                },
                                "qtyProduk": item.qty,
                                "hargaSatuan": item.hargaSatuan,
                                "isSetBiayaPeserta": item.setBiaya
                            })
                        }
                    })
                    if ($scope.item.tujuan === "2") {
                        data = {
                            "rekanan": $scope.item.rekanan,
                            "tglplanning": $scope.now,
                            "planningDiklatHumasMarket": {
                                "tglPlanning": $scope.item.periodeAwal,
                                "tglPlanningAkhir": $scope.item.periodeAkhir
                            },
                            "pegawaiPenanggungJawab": ModelItem.getPegawai,
                            "kdruangan": $scope.item.ruangan,
                            "namaplanning": $scope.item.judulDiseminasi,
                            "planningDHM": dataGrid,
                            "noplanning": $scope.item.noPlanning,
                            "deskripsiplanning": $scope.item.deskripsi
                        }
                    } else {
                        data = {
                            "tglplanning": $scope.now,
                            "planningDiklatHumasMarket": {
                                "tglPlanning": $scope.item.periodeAwal,
                                "tglPlanningAkhir": $scope.item.periodeAkhir
                            },
                            "pegawaiPenanggungJawab": ModelItem.getPegawai,
                            "kdruangan": $scope.item.ruangan,
                            "namaplanning": $scope.item.judulDiseminasi,
                            "planningDHM": dataGrid,
                            "noplanning": $scope.item.noPlanning,
                            "deskripsiplanning": $scope.item.deskripsi
                        }
                    }
                   // console.log(JSON.stringify(data));
                    ManageSarpras.saveSarpras(data, "penyuluhan/save-rencana-penyuluhan").then(function (e) {
                        window.location = "#/InformasiRencanaDiseminasi";
                    });

                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };
        }
    ]);
});