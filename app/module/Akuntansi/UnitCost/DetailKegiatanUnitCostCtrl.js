define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('DetailKegiatanUnitCostCtrl', ['$q', '$state', 'FindProduk', '$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras', 'PengajuanUsulanAnggaranService', 'ManageSdm',
        function($q, $state, findProduk, $rootScope, $scope, ModelItem, manageSarpras, findSarpras, PengajuanUsulanAnggaranService, manageSdm) {

            $scope.item = {};
            $scope.tempItem = {};

            if ($state.params.dataFilter !== "" || $state.params.dataFilter) {
                $scope.isDisabled = true;
            } else {
                $scope.isDisabled = false;
            }
            $scope.dataOrder = new kendo.data.DataSource({
                data: [],
                pageSize: 20,
                schema: {
                    model: {
                        fields: {
                            NamaBarang: { defaultValue: { id: 1, namaJenisUnitCost: "--Pilih Jenis Biaya" } },
                            DetailsJenisBiaya: { defaultValue: { id: 1, namaDetailJenisUnitCost: "--Pilih Detail Jenis --" } },
                            biaya: { type: "number", editable: false },
                            qty: { type: "number" },
                            satuan: { defaultValue: { id: 1, satuanStandar: "--Pilih Satuan" } }
                        }
                    }
                },
                change: function(e) {
                    console.log(e.action);
                    if (e.action === "add") {
                        /*var listRawRequired = [
                            "item.ruanganTujuan|k-ng-model|Ruangan tujuan",
                            "item.kelompokBarang|k-ng-model|Status barang"
                        ];

                        var isValid = ModelItem.setValidation($scope, listRawRequired);

                        if (!isValid.status) {
                            ModelItem.showMessages(isValid.messages);
                        }*/
                    }
                }
            });
            $scope.optionsOrder = {
                pageable: true,
                scrollable: true,
                toolbar: [{
                    name: "create",
                    text: "Tambah"
                }],
                columns: [{
                        "field": "NamaBarang",
                        "title": "Nama Barang",
                        "editor": categoryDropDownEditor,
                        "template": "#=NamaBarang.namaJenisUnitCost#"
                    }, {
                        "field": "DetailsJenisBiaya",
                        "title": "Detail Jenis",
                        "editor": categoryDropDownDetailJenisEditor,
                        "template": "#=DetailsJenisBiaya.namaExternal#"
                    }, {
                        "field": "biaya",
                        "title": "Biaya",
                        "width": "120px"
                    },
                    {
                        "field": "qty",
                        "title": "Qty",
                        "width": "120px"
                    },
                    {
                        "field": "satuan",
                        "title": "Satuan",
                        "width": "150px",
                        "editor": category2DropDownEditor,
                        "template": "#=satuan.satuanStandar#"
                    },
                    {
                        "command": [{
                            name: "edit",
                            text: "Edit"
                        }, {
                            name: "destroy",
                            text: "Hapus"
                        }],
                        "title": " ",
                        "width": 200
                    }
                ],
                editable: {
                    mode: "popup",
                    template: kendo.template($("#popup-editor").html())
                }
            };

            LoadCombo();

            function LoadCombo() {
                $q.all([
                    manageSdm.getOrderList("/service/list-generic/?view=Departemen&select=id,namaDepartemen")
                ]).then(function(data) {
                    debugger;
                    $scope.listInstalasi = data[0].data;


                });
            };
            //Onchange untuk mendapatkan Data produk dan Ruangan berdasarkan departemen/instalasi agar tidak berat
            $scope.$watch('item.instalasi', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.ListRuangan = ModelItem.kendoHttpSource('/service/list-generic/?view=Ruangan&select=id,namaRuangan&criteria=departemenId&values=' + e.id, true);
                $scope.listProduk = ModelItem.kendoHttpSource('/service/list-generic/?view=Produk&select=id,namaProduk&criteria=departemenId&values=' + e.id, true);
            });


            $scope.Save = function() {
                /* var listRawRequired = [
                     "item.jenisPermintaan|ng-model|Jenis permintaan"
                 ];*/

                var isValid = true; //ModelItem.setValidation($scope, listRawRequired);

                //if (isValid.status) {
                if (isValid) {
                    var data = [];

                    console.log(JSON.stringify($scope.dataOrder._data));
                    $scope.item.unitCostDetailSet = $scope.dataOrder._data;
                    console.log(JSON.stringify($scope.item));
                    /* if (data.length !== 0) {
                         manageSarpras.saveOrderProduk(ModelItem.beforePost({
                             "noOrder": $scope.item.noOrder,
                             "requestBarangDariRuanganDetail": data,
                             "tglOrder": $scope.item.tglOrder,
                             "ruangan": {

                                 "id": $scope.item.ruangan.id
                             },
                             "ruanganTujuan": {
                                 "id": $scope.item.ruanganTujuan.id
                             },
                             "jenisPermintaanVO": {
                                 "id": $scope.item.jenisPermintaan.id
                             },
                             "statusBarang": {
                                 "id": $scope.item.kelompokBarang.id
                             }
                         })).then(function() {
                             $scope.isNext = true;
                         });
                     } else {
                         window.messageContainer.error('Mohon maaf, Data belum lengkap');
                     }*/
                } else {
                    // ModelItem.showMessages(isValid.messages);
                }
            }

            $scope.getSaldoStok = function(data, dataItem, columns) {
                    //console.log(JSON.stringify(data));
                    console.log(JSON.stringify(dataItem));
                    // console.log(JSON.stringify(columns));
                    $scope.data = data;
                    $scope.dataItem = dataItem;
                    $scope.columns = columns;
                    var idx = $scope.dataItem.NamaBarang;
                    $scope.listSatuanStandard = ModelItem.kendoHttpSource('/service/list-generic/?view=SatuanStandar&select=id,satuanStandar&criteria=departemenId&values=' + idx.id, true);
                    //$scope.listSatuanStandard = ModelItem.kendoHttpSource('unit-cost/get-list-unit-cost-jenis-detail?idUnitCostJenis=' + idx.id, true);
                    $scope.listDetailJenisUnitCost = ModelItem.kendoHttpSource('unit-cost/get-list-unit-cost-jenis-detail?idUnitCostJenis=' + idx.id, true);
                }
                /*  $scope.$watch('item.kelompokBarang', function(e) {
                      if (e === undefined) return;
                      if (e.id === undefined) return;
                      $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                      $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-barang-by-kelompok?id=' + e.id, true);
                  })*/
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/unit-cost/get-list-unit-cost-jenis', true);
            // $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);

            /*ModelItem.getDataDummyGeneric("SatuanStandar", false).then(function(data) {
                $scope.listSatuanStandard = data;
            })*/


            function categoryDropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "namaJenisUnitCost",
                        dataValueField: "id",
                        dataSource: ModelItem.kendoHttpSource('/unit-cost/get-list-unit-cost-jenis', true)
                    });
            }

            function categoryDropDownDetailJenisEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "namaExternal",
                        dataValueField: "id",
                        dataSource: $scope.listDetailJenisUnitCost
                    });
            }

            function category2DropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "satuanStandar",
                        dataValueField: "id",
                        dataSource: $scope.listSatuanStandard
                    });
            }


            $scope.Back = function() {
                window.history.back();
            }


        }
    ]);
});