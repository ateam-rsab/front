define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MappingProdukToKelompokKerjaCtrl', ['$q', 'CacheHelper', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DaftarPegawaiService', 'DataHelper', 'FindSdm', 'DateHelper', '$timeout', 'CetakHelper', '$mdDialog',
        function ($q, cacheHelper, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, DaftarPegawaiService, dataHelper, FindSdm, dateHelper, $timeout, cetakHelper, $mdDialog) {
            $scope.listOfProduct = [];
            const pageSizeGrid = 10;
            $scope.columnGrid = [
                {
                    // "title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
                    template: "# if (statusMapping) { #" +
                        "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />" +
                        "# } else { #" +
                        "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />" +
                        "# } #",
                    width: "50px"
                }, {
                    "field": "no",
                    "title": "No",
                    "width": "30px"
                }, {
                    "field": "unitKerja",
                    "title": "Unit Kerja",
                    "width": "500px"
                }, {
                    "field": "subunitKerja",
                    "title": "Sub Unit Kerja",
                    "width": "500px"
                }
            ]

            $scope.mainGridOptionSubject = {
                pageable: true,
                columns: [
                    {
                        "field": "no",
                        "title": "No",
                        "width": "50px"
                    }, {
                        "field": "namaProduk",
                        "title": "Nama Produk",
                        // "width": "100px"
                    },
                ]
            }

            $scope.mainGridOptions = {
                pageable: true,
                columns: $scope.columnGrid,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };

            $scope.onClickGrid = (data) => {
                // console.log(data);
                $scope.getObjectKelompokKerja(data.id);
            }

            $scope.getProdukTindakanMedis = () => {
                ManageSdmNew.getListData("iki-remunerasi/get-subject-map-produk-kelompok-kerja").then(res => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].no = i + 1;
                    }
                    $scope.dataSourceTindakanMedis = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: pageSizeGrid
                    })
                    // $scope.listOfProduct = [...res.data.data];
                })
            }

            $scope.getObjectKelompokKerja = (id) => {
                if (id) {
                    ManageSdmNew.getListData(`iki-remunerasi/get-object-map-produk-kelompok-kerja?produkId=${id}`).then(res => {
                        // console.log(res.data.data);
                        for (let i = 0; i < res.data.data.length; i++) {
                            // if (res.data.data[i].statusMapping) console.log(res.data.data[i]);
                            // res.data.data[i].statusMapping = false;
                            res.data.data[i].no = i + 1;
                        }
                        $scope.dataSource = new kendo.data.DataSource({
                            data: res.data.data,
                            pageSize: pageSizeGrid
                        })
                    })
                }
            }
            let init = () => {
                $scope.dataSource = new kendo.data.DataSource({
                    data: [],
                    pageSize: pageSizeGrid
                })
                $scope.getProdukTindakanMedis();
            }
            init();

            var isCheckAll = false
            $scope.selectUnselectAllRow = () => {
                var tempData = $scope.dataSource._data;

                if (isCheckAll) {
                    isCheckAll = false;
                    for (var i = 0; i < tempData.length; i++) {
                        tempData[i].statusMapping = false;
                    }
                }
                else {
                    isCheckAll = true;
                    for (var i = 0; i < tempData.length; i++) {
                        tempData[i].statusMapping = true;
                    }
                }
                changeGrid(tempData);
            }

            function changeGrid(ds) {

                var newDs = new kendo.data.DataSource({
                    data: ds,
                    pageSize: pageSizeGrid,
                    total: ds.length,
                    serverPaging: false,
                });

                var grid = $('#kGrid').data("kendoGrid");

                grid.setDataSource(newDs);
                grid.refresh();
                $scope.dataVOloaded = true;
            }

            $scope.selectRow = (dataItem) => {
                var dataSelect = _.find($scope.dataSource._data, function (data) {
                    return data.id == dataItem.id;
                });
                dataSelect.statusMapping = !dataSelect.statusMapping;

                $scope.tempCheckbox = dataSelect.statusMapping;

                changeGrid($scope.dataSource._data);

            }

            $scope.mapProductToKelompokKerja = () => {
                let dataSave = [];
                for (let i = 0; i < $scope.dataSource._data.length; i++) {
                    if ($scope.dataSource._data[i].statusMapping && !$scope.dataSource._data[i].noRec) {
                        dataSave.push({
                            noRec: $scope.dataSource._data[i].noRec,
                            kdProfile: 0,
                            statusEnabled: $scope.dataSource._data[i].statusMapping,
                            kelompokKerja: {
                                id: $scope.dataSource._data[i].id
                            },
                            produk: {
                                id: $scope.dataSelected.id
                            }
                        })
                    } else if (!$scope.dataSource._data[i].statusMapping && $scope.dataSource._data[i].noRec) {
                        dataSave.push({
                            noRec: $scope.dataSource._data[i].noRec,
                            kdProfile: 0,
                            statusEnabled: $scope.dataSource._data[i].statusMapping,
                            kelompokKerja: {
                                id: $scope.dataSource._data[i].subunitKerjaId
                            },
                            produk: {
                                id: $scope.dataSelected.id
                            }
                        })
                    }

                }
                // console.log(dataSave);
                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-all-map-produk-kelompok-kerja").then(function (res) {
                    init();
                }, function (error) {
                    messageContainer.error(error);
                })
            }
        }
    ]);
});