define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('TargetIndikatorRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManagePhp', '$timeout',
        function ($q, $rootScope, $scope, ModelItem, $state, managePhp, $timeout) {

            $scope.isRouteLoading = false;
            $scope.cari = {}
            $scope.item = {};
            managePhp.getData('rensar/get-combo').then(function (e) {
                for (var i = 0; i < e.data.indikator.length; i++) {
                    e.data.indikator[i].namaindikator = e.data.indikator[i].indikator
                }
                $scope.Indikator = e.data.indikator

                $scope.listJenisIndikator = e.data.jenisindikator
            })
            $scope.daftarMasterOpt = {
                // toolbar: [{
                //     name: "create", text: "Input Baru"
                // }],
                pageable: true,
                scrollable: true,
                columns: [
                    { field: "jenisIndikator", title: "JenisIndikator", width: 250, 
                    editor:jenisIndikatorDropDownEditor , template: "#= jenisIndikator.jenisindikator #", },
                    { field: "indikatorRensar", title: "Indikator", width: 250, editor: indikatorDropDownEditor, template: "#= indikatorRensar.namaindikator #", },
                    { field: "tahuns", title: "Tahun", width: 80 },
                    { field: "target", title: "Target", width: 100 },
                    { field: "pic", title: "PIC", width: 200, editor: picEditor },
                    // { command: [{ name: "edit", text: "Edit" }, { name: "destroy", text: "Hapus" },], title: "&nbsp;", width: 120 }
                ],
                  editable: { mode: "popup", window: { title: "Tambah Target", animation: false, width: 400, /* height: "100%" */}, template: kendo.template($("#kendo-popup-editor").html())},
                // editable: "popup",
                save: function (e) {
                    $scope.Save(e.model);
                },
                // edit: function (e) {
                //     e.sender.columns.forEach(function (element, index /*, array */) {
                //         if (element.hideMe) {
                //             e.container.find(".k-edit-label:eq(" + index + "), "
                //                 + ".k-edit-field:eq( " + index + ")"
                //             ).hide();
                //         }
                //     });
                // }
            };
            init();
            function indikatorDropDownEditor(container, options) {
                $('<input required style="width: 230px;" k-filter="contains"  kendo-combo-box  name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "indikator",
                        dataValueField: "id",
                        dataSource: $scope.listIndikator,
                        filter:"contains"
                    });
            }
            function jenisIndikatorDropDownEditor(container, options) {
                $('<input required style="width: 230px;"  onSelect="getComboIndikator" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "jenisindikator",
                        dataValueField: "id",
                        dataSource:   $scope.listJenisIndikator,
                        filter:"contains",
                        change: $scope.getComboIndikator()
                    });
            }
            $scope.getComboIndikator = function(data){
                $scope.listIndikator = []
                if($scope.Indikator.length > 0){
                    for (var i = 0; i < $scope.Indikator.length; i++) {
                        if( $scope.Indikator[i].jenisindikatorfk ==$scope.dataItem.jenisIndikator.id){
                            $scope.listIndikator.push( $scope.Indikator[i])
                            $scope.dataItem.pic = $scope.Indikator[0].pic
                        }
                    }
                    if( $scope.listIndikator.length == 0)
                        toastr.info('Tidak ada indikator','Info')
                }
               
            }
            function picEditor(container, options) {
                $('<input disabled  c-text-box class="k-textbox" name="' + options.field + '"/>')
                    .appendTo(container)
            }
            function init() {
                // set defined object
                $scope.isRouteLoading = true;
                $q.all([
                    managePhp.getData("rensar/get-target-indikator", true),
                ]).then(function (res) {
                    $scope.isRouteLoading = false;
                    if (res[0].statResponse) {
                        var data = res[0].data.data

                        for (let i = 0; i < data.length; i++) {
                            data[i].indikatorRensar = {
                                "id": data[i].indikatorrensarfk,
                                "namaindikator": data[i].indikator,
                            }
                             data[i].jenisIndikator = {
                                "id": data[i].jenisindikatorfk,
                                "jenisindikator": data[i].jenisindikator,
                            }
                        }
                        $scope.dataSource = new kendo.data.DataSource({
                            data: data,
                            sort: {
                                field: "indikatorRensar",
                                dir: "asc"
                            },
                            pageSize: 20,
                            schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        id: { editable: false },
                                        indikatorRensar: {
                                            editable: true, validation: {
                                                validasijindikator: function (input) {
                                                    if (input.is("[name='indikatorRensar']") && input.val() === "") {
                                                        return false;
                                                    }
                                                    return true;
                                                }
                                            }
                                        },
                                         jenisIndikator: {
                                            editable: true, validation: {
                                                validasijenisindikator: function (input) {
                                                    if (input.is("[name='jenisIndikator']") && input.val() === "") {
                                                        return false;
                                                    }
                                                    return true;
                                                }
                                            }
                                        },

                                    }
                                }
                            },
                            change: function (e) {
                                // if(e.action === "add" ){
                                //     e.items[0].jenisIndikator.id = $scope.item.pegawai ? $scope.item.pegawai.id : 0;
                                //     e.items[0].atasanLangsung.id = $scope.item.atasanLangsung ? $scope.item.atasanLangsung.id : "";
                                //     e.items[0].atasanPejabatPenilai.id = $scope.item.atasanPejabatPenilai ? $scope.item.atasanPejabatPenilai.id : "";
                                // }
                                if (e.field == "indikator" && e.action == "itemchange") {
                                    e.items[0].indikator = e.items[0].indikator ? e.items[0].indikator : e.items[0].indikator;
                                }
                                // $scope.listIndikator =[]
                                // if (e.field == "jenisIndikator" && e.action == "itemchange") {
                                //        for (var i = 0; i < $scope.Indikator.length; i++) {
                                //            if( $scope.Indikator[i].jenisindikatorfk == e.items[0].jenisIndikator){
                                //                 $scope.listIndikator.push( $scope.Indikator[i])
                                //            }
                                //         }
                                //         // indikatorDropDownEditor()
                                //         if( $scope.listIndikator.length == 0)
                                //             toastr.info('Tidak ada indikator','Info')
                                //     // e.items[0].indikator = ? e.items[0].indikator : e.items[0].indikator;
                                // }
                                if (e.action === "remove") {
                                    var item = e.items[0];
                                    if (item.indikator !== "" && item.id !== "") {
                                        item.action = e.action;
                                        $scope.Save(item);
                                    } else {
                                        $scope.dataSource.sync(); // call sync function to auto update row number w/o click on grid
                                    }
                                }
                            }
                        });
                    }

                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                    throw error;
                })
            };
            $scope.getIndikator = function(data){
                  for (var i = 0; i < $scope.Indikator.length; i++) {
                       if( $scope.Indikator[i].jenisindikatorfk == data.id){
                            $scope.listIndikator.push( $scope.Indikator[i])
                       }
                    }
                    // indikatorDropDownEditor()
                    if( $scope.listIndikator.length == 0)
                        toastr.info('Tidak ada indikator','Info')
            }
            // var jenisIndikator = $("#jenisIndikator").data("kendoDropDownList");
            // $scope.$watch(jenisIndikator, function (newVal, oldVal) {
            //     if(newVal!=oldVal){
            //          $scope.listIndikator = []
            //         for (var i = 0; i < $scope.Indikator.length; i++) {
            //                if( $scope.Indikator[i].jenisindikatorfk ==newVal.id){
            //                     $scope.listIndikator.push( $scope.Indikator[i])
            //                }
            //         }
            //     }
               
            // })
            $scope.dataItem ={}
            $scope.Save = function (data) {
                var item = {
                    id: data.id,
                    Indikator: data.indikator,
                    Tahun: data.tahuns,
                    Target: data.target,
                }
                if (data.action && data.action === "remove") {
                    managePhp.postData(item, 'rensar/delete-target-indikator').then(function (e) {
                        init();
                    });
                } else {
                    managePhp.postData(item, 'rensar/save-target-indikator').then(function (e) {
                        // delete $scope.item;
                        // $scope.item = {};
                        init();
                    });
                }

            };
            $scope.yearUngkul = {
                start: "decade",
                depth: "decade"
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

            $scope.$watch('cari.tahun', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    newVal = moment(newVal).format('YYYY')
                    oldVal = moment(oldVal).format('YYYY')
                    if (newVal != oldVal) {
                        applyFilter("tahuns", newVal)
                    }
                }, 500)
            })

            $scope.$watch('cari.target', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal != oldVal) {
                        applyFilter("target", newVal)
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
            $scope.Tambah = function () {
                $scope.dataItem ={}
                $scope.dialogPopup.center().open()
            }
            $scope.clickedPopup = function () {
                $scope.dialogPopup.close();
                $scope.dataItem ={}
            }
            $scope.Batal = function () {
                $scope.dialogPopup.close();
                $scope.dataItem ={}
            }
            $scope.simpan = function(){
                if($scope.dataItem.indikator == undefined){
                    toastr.error('Indikator belum di pilih ')
                    return
                }
                
                if($scope.dataItem.tahuns == undefined){
                    toastr.error('Tahun belum di isi')
                    return
                }
                if($scope.dataItem.target == undefined){
                    toastr.error('Target belum di isi ')
                    return
                }
                 var item = {
                    id: $scope.dataItem.id != undefined ? $scope.dataItem.id: null,
                    Indikator: $scope.dataItem.indikator.id,
                    Tahun: moment ($scope.dataItem.tahuns).format('YYYY'),
                    Target: $scope.dataItem.target,
                }
                // if (data.action && data.action === "remove") {
                //     managePhp.postData(item, 'rensar/delete-target-indikator').then(function (e) {
                //         init();
                //     });
                // } else {
                    managePhp.postData(item, 'rensar/save-target-indikator').then(function (e) {
                        // delete $scope.item;
                        // $scope.item = {};
                        init();
                         $scope.modelGrid = undefined
                    });
                // }
            }
            $scope.hapus = function(){
                if($scope.modelGrid == undefined){
                    toastr.error('pilih data dulu')
                    return
                }
                var item = {
                    id: $scope.modelGrid.id 
                }
                managePhp.postData(item, 'rensar/delete-target-indikator').then(function (e) {
                        init();
                        $scope.modelGrid = undefined
                });
            }
            $scope.edit = function(){
                if($scope.modelGrid == undefined){
                    toastr.error('pilih data dulu')
                    return
                }
                $scope.dataItem.id = $scope.modelGrid.id
                $scope.dataItem.jenisIndikator = $scope.modelGrid.jenisIndikator
                $scope.listIndikator=[]
                $scope.listIndikator.push($scope.modelGrid.indikatorRensar)
                $scope.dataItem.indikator =  $scope.listIndikator[0]
                $scope.dataItem.tahuns = $scope.modelGrid.tahuns
                $scope.dataItem.pic = $scope.modelGrid.pic
                $scope.dataItem.target = $scope.modelGrid.target
                $scope.dialogPopup.center().open()

            }
        }
    ]);
});