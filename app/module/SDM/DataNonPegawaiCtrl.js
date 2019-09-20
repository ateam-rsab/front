define(['initialize'], function (initialize) {
    'use strict';
    // initialize.controller('DataPegawaiCtrl', ['$q', '$rootScope', '$scope', '$state', 'ModelItem','JenisSk','RekamDataPegawai','StatusPerkawinan','ManageSdm','ManageSdmNew','FindSdm',
    initialize.controller('DataNonPegawaiCtrl', ['$q', 'CacheHelper', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DaftarPegawaiService', 'DataHelper', 'FindSdm', 'DateHelper', '$timeout', 'CetakHelper', '$mdDialog',
        function ($q, cacheHelper, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, DaftarPegawaiService, dataHelper, FindSdm, dateHelper, $timeout, cetakHelper, $mdDialog) {
            $scope.item = {};
            $scope.item.tglMasuk = new Date();


            $scope.init = function () {
                $scope.daftarPegawai = new kendo.data.DataSource({
                    data: [],
                })
                ManageSdmNew.getListData("sdm/get-all-unit-kerja").then(res => {
                    $scope.listUnitKerja = res.data.data
                    $scope.isRouteLoading = false;
                });

                $scope.daftarpegawaiOpt = {
                    toolbar: [
                        // "excel",
                        // { text: "export", name: "Export detail", template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export All to Excel</button>' },
                        // { name: "username", text: "Show username", template: '<button ng-click="toogleClick()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-refresh"></span>{{username}} Username</button>' },
                        { name: "pegawaiBaru", text: "Rekam Pegawai Baru", template: '<button ng-click="inputBaru()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Masukkan Data Baru</button>' }
                    ],
                    // excel: {
                    //     allPages: true,
                    //     margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                    //     scale: 0.8,
                    //     fileName: "RSAB HK Export Data Pegawai-" + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                    // },
                    pageable: true,
                    pageSize: 10, //page size
                    selectable: 'row',
                    scrollable: true,
                    columns: [
                        {
                            field: "nipPns",
                            title: "<h3>N.I.P</h3>",
                            width: "17%",
                        },
                        {
                            field: "namaLengkap",
                            title: "<h3>Nama<br>Lengkap</h3>",
                            width: "25%"
                        },
                        {
                            field: "NamaUser",
                            title: "<h3>Username</h3>",
                            width: "20%",
                            hidden: true,
                        },
                        {
                            field: "unitKerja",
                            title: "<h3>Unit Kerja</h3>",
                            width: "20%"
                        },
                        {
                            field: "subUnitKerja",
                            title: "<h3>Sub Unit<br>Kerja</h3>",
                            width: "20%"
                        },
                        {
                            field: "jabatanInternal",
                            title: "<h3>Jabatan Internal</h3>",
                            width: "20%",
                            hidden: "true"
                        },
                        {
                            field: "kategoriPegawai",
                            title: "<h3>Status</h3>",
                            width: "15%",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            }
                        },
                        {
                            field: "tglMasuk",
                            title: "<h3>Tanggal <br>Masuk</h3>",
                            width: "10%"
                        },
                        // {
                        //     command: [
                        //         {
                        //             text: "Lihat",
                        //             width: "40px",
                        //             align: "center",
                        //             attributes: {
                        //                 align: "center"
                        //             },
                        //             click: editDataPegawai,
                        //             imageClass: "k-i-arrow-60-right"
                        //         },
                        //         {
                        //             text: "Hapus",
                        //             width: "40px",
                        //             align: "center",
                        //             attributes: {
                        //                 align: "center"
                        //             },
                        //             click: confirmHapusDataPegawai,
                        //             imageClass: "k-i-arrow-60-right"
                        //         }
                        //     ],
                        //     title: "",
                        //     width: "20%",
                        //     attributes: {
                        //         style: "text-align:center;valign=middle"
                        //     },
                        // }
                    ],
                    // excelExport: function (e) {
                    //     var columns = e.workbook.sheets[0].columns;
                    //     columns.forEach(function (column) {
                    //         delete column.width;
                    //         column.autoWidth = true;
                    //     });
                    // },
                    // change: function (e) {
                    //     var grid = $("#gridDataPegawai").data("kendoGrid");
                    //     var selectedRows = grid.dataItem(grid.select());
                    //     for (var i = 0; i < $scope.arrayMapAtasan.length; i++) {
                    //         if (selectedRows.idPegawai == $scope.arrayMapAtasan[i].pegawai.id) {
                    //             if ($scope.arrayMapAtasan[i].atasanLangsung) selectedRows.atasanLangsung = $scope.arrayMapAtasan[i].atasanLangsung;
                    //             if ($scope.arrayMapAtasan[i].atasanPejabatPenilai) selectedRows.atasanPejabatPenilai = $scope.arrayMapAtasan[i].atasanPejabatPenilai;
                    //             break;
                    //         }
                    //     }
                    //     $scope.dataItem = selectedRows;
                    // }
                };

            }
            $scope.init();

            $scope.inputBaru = function () {
                $state.go('RekamDataNonPegawai')
            }
        }
    ]);
});