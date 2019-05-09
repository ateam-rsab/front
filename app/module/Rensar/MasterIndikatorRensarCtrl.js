define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MasterIndikatorRensarCtrl', ['$q', 'CacheHelper', '$scope', '$state', 'DataHelper', '$timeout', 'ManagePhp', 'ModelItemAkuntansi', 'ModelItem',
        function ($q, cacheHelper, $scope, $state, dataHelper, $timeout, managePhp, modelItemAkuntansi, ModelItem) {
            $scope.isRouteLoading = false;
            $scope.item = {};
            $scope.cari = {}
            var bln = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September',
                'Oktober', 'November', 'Desember']
            managePhp.getData("rensar/get-jenis-indikator", true).then(function (e) {
                $scope.listJenis = e.data.data
            })

            $scope.monthUngkul = {
                start: "year",
                depth: "year"
            }
            $scope.yearUngkul = {
                start: "decade",
                depth: "decade"
            }
            $scope.optionGridMaster = {
                // toolbar: [{
                //     name: "create", text: "Tambah",
                //     template: '<button ng-click="Tambah()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
                // }],
                pageable: true,
                // selectable: "row",
                columns: [
                    { field: "no", title: "No", width: 10 },
                    { field: "indikator", title: "Indikator", width: 200 },// template: "#= pegawai.namaLengkap #"},
                    // { field: "satuan", title: "Kelas", width: 100 }, //template: "#= atasanLangsung.namaLengkap #"},
                    // { field: "definisioperasional", title: "Definisi Operasional", width: 100 , editor: textareaNameEditor},// template: "#= atasanPejabatPenilai.namaLengkap #"},
                    // { field: "numerator", title: "Numerator", width: 100 , editor: textareaNameEditor},
                    // { field: "denominator", title: "Denominator", width: 100 , editor: textareaNameEditor},
                    // { field: "formula", title: "Formula", width: 100 , editor: textareaNameEditor},
                    { field: "pic", title: "PIC", width: 100 },
                    { field: "jenisindikator", title: "Jenis", width: 100 },
                    // { command: [{ name: "edit", text: "Edit" ,click: editRow  }, { text: "Hapus", click: deleteRow }], title: "&nbsp;", width: 120 },

                ],
                // editable: { mode: "popup", window: { title: "Indikator Rensar", animation: true, width: 400, /* height: "100%" */},
                //  template: kendo.template($("#kendo-popup-editor").html())},


            }
            function textareaNameEditor(container, options) {
                $('<textarea required name="' + options.field + '" cols="20" row="4" style="line-height: 6em;"></textarea>')
                    .appendTo(container)
            }
            $scope.cariFilter = function () {
                init()
            }
            function init() {

                $scope.isRouteLoading = true;

                $q.all([
                    managePhp.getData("rensar/get-indikator-rensar-m"),
                ]).then(function (res) {
                    $scope.isRouteLoading = false;
                    if (res[0].statResponse) {
                        var data = res[0].data.data
                        if (data.length > 0) {
                            for (let index = 0; index < data.length; index++) {
                                data[index].no = index + 1;
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
                $scope.item = {}
                $scope.isEdit = false
                $scope.disabledText = false 
                $scope.dialogPopup.center().open()
            }
            $scope.clickedPopup = function () {
                $scope.item = {}
                $scope.dialogPopup.close();
            }
            $scope.Batal = function () {
                $scope.item = {}
                $scope.dialogPopup.close();
            }

            $scope.Save = function () {
                var listRawRequired = [
                    "item.indikator|k-ng-model|Indikator",
                    "item.jenisIndikator|k-ng-model|Jenis Indikator",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {

                    var data = {
                        "id": $scope.item.id != undefined ? $scope.item.id : '',
                        "statusenabled": true,
                        "definisioperasional": $scope.item.do != undefined ? $scope.item.do : '',
                        "formula": $scope.item.formula != undefined ? $scope.item.formula : '',
                        "indikator": $scope.item.indikator,
                        "pic": $scope.item.pic != undefined ? $scope.item.pic : '',
                        "jenisindikatorfk": $scope.item.jenisIndikator.id,
                        "numerator": $scope.item.numerator != undefined ? $scope.item.numerator : '',
                        "denominator": $scope.item.denominator != undefined ? $scope.item.denominator : '',

                    }
                    managePhp.postData2("rensar/save-indikator-rensar-m", data).then(function (e) {
                        init();
                        $scope.item = {}
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            $scope.resetFilter = function () {
                $scope.cari = {};
                init()
            }
            $scope.edit = function (bool) {
                if ($scope.dataSelect == undefined) {
                    toastr.error('Pilih data dulu')
                    return

                }
                $scope.item.id = $scope.dataSelect.id
                $scope.item.indikator = $scope.dataSelect.indikator
                $scope.item.pic = $scope.dataSelect.pic
                $scope.item.jenisIndikator = { id: $scope.dataSelect.jenisindikatorfk, jenisindikator: $scope.dataSelect.jenisindikator }
                $scope.item.formula = $scope.dataSelect.formula
                $scope.item.denominator = $scope.dataSelect.denominator
                $scope.item.numerator = $scope.dataSelect.numerator
                $scope.item.do = $scope.dataSelect.definisioperasional
                $scope.dialogPopup.center().open()
                if (bool) {
                    $scope.isEdit = true
                    $scope.disabledText = true
                } else{
                    $scope.isEdit = false
                    $scope.disabledText = false 
                }
            }
            $scope.hapus = function () {
                if ($scope.dataSelect == undefined) {
                    toastr.error('Pilih data dulu')
                    return
                }
                var data = {
                    "id": $scope.dataSelect.id,
                    "statusenabled": false,
                    "definisioperasional": $scope.dataSelect.definisioperasional,
                    "formula": $scope.dataSelect.formula,
                    "indikator": $scope.dataSelect.indikator,
                    "pic": $scope.dataSelect.pic,
                    "jenisindikatorfk": $scope.dataSelect.jenisindikatorfk,
                    "numerator": $scope.dataSelect.numerator,
                    "denominator": $scope.dataSelect.denominator,

                }
                managePhp.postData2("rensar/save-indikator-rensar-m", data).then(function (e) {
                    init()
                    $scope.item = {}
                })
            }
            function deleteRow(e) {
                e.preventDefault();

                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var data = {
                    "id": dataItem.id,
                    "statusenabled": false,
                    "definisioperasional": dataItem.definisioperasional,
                    "formula": dataItem.formula,
                    "indikator": dataItem.indikator,
                    "pic": dataItem.pic,
                    "jenisindikatorfk": dataItem.jenisindikatorfk,
                    "numerator": dataItem.numerator,
                    "denominator": dataItem.denominator,

                }
                managePhp.postData2("rensar/save-indikator-rensar-m", data).then(function (e) {
                    init()
                    $scope.item = {}
                })
            }
            function editRow(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                // var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                if (dataItem) {
                    $scope.item.id = dataItem.id
                    $scope.item.indikator = dataItem.indikator
                    $scope.item.pic = dataItem.pic
                    $scope.item.jenisIndikator = { id: dataItem.jenisindikatorfk, jenisindikator: dataItem.jenisindikator }
                    $scope.item.formula = dataItem.formula
                    $scope.item.denominator = dataItem.denominator
                    $scope.item.numerator = dataItem.numerator
                    $scope.item.do = dataItem.definisioperasional
                    $scope.dialogPopup.center().open()
                }

            }
            init();

            $scope.formatTanggalAjah = function (tanggal) {
                return moment(tanggal).format('DD-MM-YYYY');
            }
            var timeoutPromise;
            $scope.$watch('cari.indikator', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal != oldVal) {
                        applyFilter("indikator", newVal)
                    }
                }, 500)
            })
            $scope.$watch('cari.pic', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal != oldVal) {
                        applyFilter("pic", newVal)
                    }
                }, 500)
            })
            $scope.$watch('cari.jenisIndikator', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    applyFilter("jenisindikator", newVal.jenisindikator)
                }
            })

            function applyFilter(filterField, filterValue) {
                var dataGrid = $("#gridMaster").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field == filterField) {
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue.id
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    })
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            }
            $scope.resetFilter = function () {
                var dataGrid = $("#gridMaster").data("kendoGrid");
                dataGrid.dataSource.filter({});
                $scope.cari = {};
            }
        }
    ])
})