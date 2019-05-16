define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('TargetBobotCtrl', ['$rootScope', '$scope', '$state',
        'ModelItem', '$window', '$timeout', 'DateHelper', 'ManageSdm', 'ManageSdmNew', 'RekamDataPegawai', '$document',
        function ($rootScope, $scope, $state, ModelItem, $window, $timeout, DateHelper,
                  ManageSdm, ManageSdmNew, RekamDataPegawai, $document) {

            $scope.now = new Date();
            $scope.validate = false;
            ///use to validate after data is appear
            $scope.item = {};
            $scope.dataCB = [];
            $scope.dataAsal = [];
            $scope.item.satuanKerja = "";
            $scope.dataVOloaded = true;
            $scope.grid = [];
            $scope.yearSelected = {
                start: "year",
                depth: "year"
            };
            var vals = false;

            $scope.valCari = function () {
                if ($scope.item.DatePickerBulan != undefined && $scope.item.pegawai != undefined) {
                    $scope.cari();
                } else {
                    window.messageContainer.error("Bulan dan nama pegawai harus dipilih terlebih dahulu");
                }
            }

            $scope.cari = function () {
                $scope.vals = false;
                $scope.dataCB = [];
                $scope.dataAsal = [];
                $scope.validate = false;
                vals = false;
                var x = moment($scope.item.DatePickerBulan).format("YYYY-MM");
                ManageSdmNew.getListData("sdm/get-target-bobot-uraian-kerja/" + $scope.item.pegawai.id + "/" + x).then(function (dat) {
                    $scope.dataAsal = dat.data.data.uraianTugas;
                    $scope.createGrid(dat.data.data.uraianTugas);
                });
            }

            $scope.createGrid = function (dataAll) {
                var search = {};
                $scope.item.bulan = DateHelper.getBulanFormatted($scope.item.DatePickerBulan);
                var previousMonth = new Date($scope.item.DatePickerBulan);
                previousMonth.setMonth($scope.item.DatePickerBulan.getMonth() - 1);
                $scope.item.blns = DateHelper.getBulanFormatted(previousMonth);
                $scope.item.tahun = $scope.item.DatePickerBulan.getFullYear();
                $scope.sourceOrder = new kendo.data.DataSource({
                    data: dataAll,
                    schema: {
                        model: {
                            fields: {
                                idRincianKegiatan: {editable: false},
                                rincianKegiatan: {editable: false},
                                targetThisYear: {editable: false},
                                targetLastMonth: {
                                    type: "number",
                                    validation: {min: 0, required: true},
                                    editable: false
                                },
                                bobotLastMonth: {type: "number", validation: {min: 0, required: true}, editable: false},
                                targetThisMonth: {type: "number", validation: {min: 0, required: true}},
                                bobotThisMonth: {type: "number", validation: {min: 0, required: true}}
                            }
                        }
                    },
                    aggregate: [
                        {field: "bobotThisMonth", aggregate: "sum"},
                        {field: "bobotLastMonth", aggregate: "sum"}
                    ],
                    change: function (e) {
                        if (e.field && e.action == "itemchange") {
                            var grid = $("#grid").data("kendoGrid");
                            var model = e.items[0];
                            var groupFooterIndex = 0;
                            var groupFooters = grid.tbody.children(".k-group-footer");

                            function updateGroupFooters(items) {
                                var updatedSubGroup;
                                var updatedElement;
                                for (var idx = 0; idx < items.length; idx++) {
                                    var item = items[idx];
                                    if (item.hasSubgroups) {
                                        updatedSubGroup = updateGroupFooters(item.items);
                                    }
                                    if (updatedSubGroup || $.inArray(model, item.items) !== -1) {
                                        updatedElement = true;
                                        groupFooters.eq(groupFooterIndex).replaceWith(grid.groupFooterTemplate(item.aggregates));
                                    }
                                    groupFooterIndex++;
                                }
                                return updatedElement;
                            }

                            updateGroupFooters(this.view());
                            grid.footer.find(".k-footer-template").replaceWith(grid.footerTemplate(this.aggregates()));
                        }
                    }
                });


                $scope.mainGridOption = {
                    pageable: false,
                    columns: [
                        {
                            field: "rincianKegiatan", title: "<center>Uraian Tugas</center>",
                            width: "50%", footerTemplate: "Jumlah:"
                        },
                        {
                            title: "{{item.tahun}}", width: "25%",
                            columns: [
                                {field: "targetThisYear", "title": "Target"}
                            ],
                        },
                        {
                            title: "{{item.blns}}", width: "20%",
                            columns: [
                                {field: "targetLastMonth", "title": "Target"},
                                {
                                    field: "bobotLastMonth", "title": "Bobot",
                                    aggregates: ["sum"], footerTemplate: " #= kendo.toString(sum,'0')#"
                                },
                                {
                                    field: "satuanLastMonth", "title": "satuan"
                                }
                            ],
                        },
                        {
                            title: "{{item.bulan}}", width: "20%",
                            columns: [
                                {field: "targetThisMonth", title: "Target"},
                                {
                                    field: "bobotThisMonth", title: "Bobot",
                                    aggregates: ["sum"], footerTemplate: " #= kendo.toString(sum,'0')#"
                                },
                                {
                                    field: "satuanThisMonth", "title": "satuan"
                                }
                            ],
                        }],
                    columnDefs: [
                        {field: "idRincianKegiatan", title: "id", visible: false}
                    ]
                }
                $scope.validate = true;

            }
            var pegawaiLogin = ModelItem.getPegawai();
            if (pegawaiLogin.ruangan.departemenId === 42) {
                ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true").then(function (dat) {
                    // debugger;
                    $scope.listPegawai = dat.data;
                });
            } else {
                ManageSdmNew.getListData("sdm/get-pegawai-bawahan/" + pegawaiLogin.id).then(function (dat) {
                    $scope.listPegawai = dat.data.data;
                })
                // .then(function(){
                //     $scope.listPegawai.push({
                //         id: pegawaiLogin.id,
                //         namaLengkap: pegawaiLogin.namaLengkap
                //     })
                // });
            }

            $scope.cbSama = function () {
                if ($scope.validate === false) {
                    $scope.vals = false;
                    window.messageContainer.error("Pencarian harus dilakukan terlebih dahulu");
                } else {
                    if (vals === false) {
                        $scope.copyRow();
                        vals = true;
                    }
                    if ($scope.item.sama === 'true') {
                        $scope.createGrid(grid);
                        $scope.createGrid($scope.dataCB);
                    }
                    if ($scope.item.sama === 'false') {
                        //balikin ke data awal
                        $scope.createGrid(grid);
                        $scope.createGrid($scope.dataAsal);
                        //vals = false;
                    }
                }
            }

            $scope.copyRow = function () {
                $scope.sourceOrder._data.forEach(function (dataGrid) {
                    $scope.dataAsal.forEach(function (data) {
                        if (data.idRincianKegiatan === dataGrid.idRincianKegiatan) {
                            $scope.dataCB.push(
                                {
                                    "rincianKegiatan": data.rincianKegiatan,
                                    "targetThisYear" : data.targetThisYear,
                                    "bobotLastMonth": data.bobotLastMonth,
                                    "bobotThisMonth": data.bobotLastMonth,
                                    "targetThisMonth": data.targetLastMonth,
                                    "idRincianKegiatan": data.idRincianKegiatan,
                                    "targetLastMonth": data.targetLastMonth
                                }
                            );
                        }
                    });
                });
            }

            $scope.Save = function () {
                // debugger;
                var detail = $scope.sourceOrder._data;
                var detailHVA = [];
                detail.forEach(function (data) {
                    detailHVA.push({
                            "rincianKegiatan": {
                                "id": data.idRincianKegiatan
                            }, "target": data.targetThisMonth,
                            "bobot": data.bobotThisMonth,
                            "periode": moment($scope.item.DatePickerBulan).format("YYYY-MM"),
                            "pegawai": {
                                "id": $scope.item.pegawai.id
                            }
                        }
                    );

                })
                var data1 = {
                    "uraianTugas": detailHVA
                }

                ManageSdmNew.saveData(data1, "sdm/save-target-bobot-uraian-tugas-transaksi/").then(function (e) {
                    //$scope.createGrid(grid);
                    $scope.vals = false;
                    $scope.dataCB = [];
                    $scope.dataAsal = [];
                    $scope.validate = false;
                });

            };

        }
    ]);


});