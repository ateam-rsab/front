define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MasterNarasumberCtrl', ['$q', 'CacheHelper', '$scope', '$state', 'DataHelper', '$timeout', 'ManagePhp', 'ModelItemAkuntansi', 'ModelItem',
        function ($q, cacheHelper, $scope, $state, dataHelper, $timeout, managePhp, modelItemAkuntansi, ModelItem) {
            $scope.isRouteLoading = true;
            $scope.optionGridMaster = {
                toolbar: [{
                    name: "create", text: "Tambah",
                    template: '<button ng-click="Tambah()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
                }],
                // MasterNarasumberCtrl
                pageable: true,
                selectable: "row",
                columns: [
                    { field: "no", title: "No", width: 40 },
                    { field: "namalengkap", title: "Narasumber", width: 160 },// template: "#= pegawai.namaLengkap #"},
                    { field: "nohandphone", title: "No Handphone", width: 100 }, //template: "#= atasanLangsung.namaLengkap #"},                    
                    {
                        field: "tgllahir", title: "Tanggal Lahir", width: 100,
                        template: "<span class='style-right'>{{formatTanggalAjah('#: tgllahir #', '')}}</span>"
                    },                                     
                    { command: [{ name: "edit", text: "Edit", click: editRow }, { text: "Hapus", click: deleteRow }], title: "&nbsp;", width: 120 }
                ],

            }

            function ClearAll(){
                $scope.item = {};
            }

            function init() {
                $scope.cari = {}
                managePhp.getMaster('pelatihan/get-combo').then(function (e) {
                    $scope.listJenisKelamin = e.data.jeniskelamin
                    $scope.listPendidikanTerakhir = e.data.pendidikan
                })

                $q.all([
                    managePhp.getMaster("narasumber/get-daftar-narasumber"),
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
                    "item.NamaNarasumber|k-ng-model|Narasumber",
                    "item.NamaPanggilan|k-ng-model|Panggilan",
                    "item.JenisKelamin|k-ng-model|Jenis Kelamin",
                    "item.PendidikanTerakhir|k-ng-model|Pendidikan Terakhir",
                    "item.TempatLahir|k-ng-model|Tempat Lahir",
                    "item.tglLahir|k-ng-model|Tgl Lahir",
                    "item.Handphone|k-ng-model|Handphone",
                    "item.Email|k-ng-model|Email",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var data = {
                        "id": $scope.id != undefined ? $scope.id : '',
                        "namalengkap": $scope.item.NamaNarasumber,
                        "namapanggilan": $scope.item.NamaPanggilan,
                        "objectjeniskelaminfk": $scope.item.JenisKelamin.id,
                        "objectpendidikanterakhirfk": $scope.item.PendidikanTerakhir.id,                       
                        "tempatlahir": $scope.item.TempatLahir,
                        "nohandphone": $scope.item.Handphone,
                        "tgllahir": moment($scope.item.tglLahir).format('YYYY-MM-DD HH:mm'),
                        "email": $scope.item.Email,
                    }
                    managePhp.postMaster(data, "narasumber/save-data-narasumber").then(function (e) {
                        init();
                        ClearAll()
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
           
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
                    // "objectjenistariffk": dataItem.objectjenistariffk,
                    // "objectasalprodukfk": dataItem.objectasalprodukfk,
                    // "objectkelasfk": dataItem.objectkelasfk,
                    // "objectprodukfk": dataItem.objectprodukfk
                }
                
                managePhp.postMaster(data, "narasumber/hapus-data-narasumber").then(function (e) {
                    init()
                })
            }
            function editRow(e) {
                $scope.item = {};
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.id = dataItem.id
                $scope.item.JenisKelamin = { id: dataItem.objectjeniskelaminfk, jeniskelamin: dataItem.jeniskelamin }
                $scope.item.PendidikanTerakhir = { id: dataItem.objectpendidikanterakhirfk, pendidikan: dataItem.pendidikan }                
                $scope.item.NamaNarasumber = dataItem.namalengkap
                $scope.item.NamaPanggilan =dataItem.namapanggilan
                $scope.item.TempatLahir = dataItem.tempatlahir
                $scope.item.tglLahir = dataItem.tgllahir
                $scope.item.Handphone = dataItem.nohandphone
                $scope.item.Email = dataItem.email
                $scope.dialogPopup.center().open()
            }
            init();
            $scope.formatTanggalAjah = function (tanggal) {
                return moment(tanggal).format('DD-MM-YYYY');
            }
        }
    ])
})