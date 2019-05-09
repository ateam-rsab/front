define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MasterBiayaDiklatRevCtrl', ['$q', 'CacheHelper', '$scope', '$state', 'DataHelper', '$timeout', 'ManagePhp', 'ModelItemAkuntansi', 'ModelItem',
        function ($q, cacheHelper, $scope, $state, dataHelper, $timeout, managePhp, modelItemAkuntansi, ModelItem) {
            $scope.isRouteLoading = true;
            $scope.optionGridMaster = {
                toolbar: [{
                    name: "create", text: "Tambah",
                    template: '<button ng-click="Tambah()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
                }],
                pageable: true,
                selectable: "row",
                columns: [
                    { field: "no", title: "No", width: 40 },
                    { field: "namaproduk", title: "Komponen", width: 160 },// template: "#= pegawai.namaLengkap #"},
                    { field: "namakelas", title: "Kelas", width: 100 }, //template: "#= atasanLangsung.namaLengkap #"},
                    { field: "asalproduk", title: "Asal", width: 100 },// template: "#= atasanPejabatPenilai.namaLengkap #"},
                    { field: "jenistarif", title: "Jenis Tarif", width: 100 },
                    {
                        field: "tglberlakuawal", title: "Tanggal Awal", width: 100,
                        template: "<span class='style-right'>{{formatTanggalAjah('#: tglberlakuawal #', '')}}</span>"
                    },
                    {
                        field: "tglberlakuakhir", title: "Tanggal Akhir", width: 100,
                        template: "<span class='style-right'>{{formatTanggalAjah('#: tglberlakuakhir #', '')}}</span>"
                    },
                    { field: "hargasatuan", title: "Harga Satuan", width: 100 },
                    { field: "persendiscount", title: "Diskon", width: 100 },
                    { field: "hargadiscount", title: "Harga Diskon", width: 100 },
                    { command: [{ name: "edit", text: "Edit", click: editRow }, { text: "Hapus", click: deleteRow }], title: "&nbsp;", width: 120 }
                ],

            }
            modelItemAkuntansi.getDataDummyPHP("pelatihan/get-combo-produk-part", true, true, 10).then(function (data) {
                $scope.listProduk = data;
            });
            function init() {
                $scope.item = {
                    persenDiscount: 0
                };
                $scope.cari = {}
                managePhp.getMaster('pelatihan/get-combo').then(function (e) {
                    $scope.listKelas = e.data.kelas
                    $scope.listJenisTarif = e.data.jenistarif
                    $scope.listAsal = e.data.asalproduk
                })

                $q.all([
                    managePhp.getMaster("pelatihan/get-biaya-diklat"),
                ]).then(function (res) {
                    $scope.isRouteLoading = false;
                    if (res[0].statResponse) {
                        var data = res[0].data.data
                        if (data.length > 0) {
                            for (let index = 0; index < data.length; index++) {
                                data[index].no = index + 1;
                                if (data[index].persendiscount == null)
                                    data[index].persendiscount = 0
                            }
                        }
                        $scope.dataSource = new kendo.data.DataSource({
                            data: data,
                            pageSize: 20,
                        })
                    }
                }, function (error) {
                    $scope.isRouteLoading = false;
                    throw error;
                })
            }
            $scope.Tambah = function () {
                $scope.dialogPopup.center().open()
            }
            $scope.clickedPopup = function () {
                $scope.dialogPopup.close();
            }
            $scope.Batal = function () {
                $scope.dialogPopup.close();
            }

            $scope.Save = function () {
                var listRawRequired = [
                    "item.komponen|k-ng-model|Komponen",
                    "item.kelas|k-ng-model|Kelas",
                    "item.asalProduk|k-ng-model|Asal Produk",
                    "item.jenisTarif|k-ng-model|Jenis Tarif",
                    "item.tglBerlakuAwal|k-ng-model|Tgl Berlaku Awal",
                    "item.tglBerlakuAkhir|k-ng-model|Tgl Berlaku Akhir",
                    "item.hargaSatuan|k-ng-model|Harga Satuan",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var data = {
                        "id": $scope.id != undefined ? $scope.id : '',
                        "objectasalprodukfk": $scope.item.asalProduk.id,
                        "objectjenistariffk": $scope.item.jenisTarif.id,
                        "objectkelasfk": $scope.item.kelas.id,
                        "objectprodukfk": $scope.item.komponen.id,
                        "hargadiscount": $scope.item.hargaDiscount != undefined ? $scope.item.hargaDiscount : 0,
                        "hargasatuan": $scope.item.hargaSatuan,
                        "persendiscount": $scope.item.persenDiscount,
                        "tglberlakuakhir": moment($scope.item.tglBerlakuAkhir).format('YYYY-MM-DD HH:mm'),
                        "tglberlakuawal": moment($scope.item.tglBerlakuAwal).format('YYYY-MM-DD HH:mm'),
                    }
                    managePhp.postMaster(data, "pelatihan/save-biaya-diklat").then(function (e) {
                        init();
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.$watch('item.persenDiscount', function (newVal, oldVal) {
                // if (newVal && newVal !== oldVal) {
                if ($scope.item.persenDiscount > 100) {
                    $scope.item.persenDiscount = 0;
                }
                $scope.item.hargaDiscount = ((parseFloat($scope.item.hargaSatuan)) * newVal) / 100
                // }

            });
            $scope.$watch('item.hargaSatuan', function (newVal, oldVal) {
                $scope.item.hargaDiscount = ((parseFloat($scope.item.persenDiscount)) * newVal) / 100
            });
            var timeoutPromise;
            $scope.$watch('cari.komponen', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("namaproduk", newVal)
                    }
                })
            });
            $scope.$watch('cari.jenisTarif', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("jenistarif", newVal)
                    }
                })
            });
            $scope.$watch('cari.asalProduk', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("asalproduk", newVal)
                    }
                })
            });
            function applyFilter(filterField, filterValue) {
                var dataGrid = $("#gridMaster").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field === filterField)
                            currentFilters.splice(i, 1);
                        break;
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            };
            $scope.resetFilter = function () {
                var dataGrid = $("#gridMaster").data("kendoGrid");
                dataGrid.dataSource.filter({});
                $scope.item = {};
            }
            function deleteRow(e) {
                e.preventDefault();

                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var data = {
                    "id": dataItem.id,
                    "objectjenistariffk": dataItem.objectjenistariffk,
                    "objectasalprodukfk": dataItem.objectasalprodukfk,
                    "objectkelasfk": dataItem.objectkelasfk,
                    "objectprodukfk": dataItem.objectprodukfk
                }
                
                managePhp.postMaster(data, "pelatihan/delete-biaya-diklat").then(function (e) {
                    init()
                })
            }
            function editRow(e) {
                e.preventDefault();

                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.id = dataItem.id
                $scope.item.asalProduk = { id: dataItem.objectasalprodukfk, asalproduk: dataItem.asalproduk }
                $scope.item.jenisTarif = { id: dataItem.objectjenistariffk, jenistarif: dataItem.jenistarif }
                $scope.item.kelas = { id: dataItem.objectkelasfk, namakelas: dataItem.namakelas }
                managePhp.getMaster("pelatihan/get-combo-produk-part?namaProduk="
                    + dataItem.namaproduk, true, true, 10)
                    .then(function (data) {
                        $scope.listProduk.add(data.data[0])
                        $scope.item.komponen = data.data[0]
                    })

                $scope.item.hargaDiscount = parseFloat(dataItem.hargadiscount)
                $scope.item.hargaSatuan = parseFloat(dataItem.hargasatuan)
                $scope.item.persenDiscount = parseFloat(dataItem.persendiscount)
                $scope.item.tglBerlakuAkhir = dataItem.tglberlakuakhir// moment($scope.item.tglBerlakuAkhir).format('YYYY-MM-DD HH:mm')
                $scope.item.tglBerlakuAwal = dataItem.tglberlakuawal//moment($scope.item.tglBerlakuAwal).format('YYYY-MM-DD HH:mm')
                $scope.dialogPopup.center().open()
            }
            init();
            $scope.formatTanggalAjah = function (tanggal) {
                return moment(tanggal).format('DD-MM-YYYY');
            }
        }
    ])
})