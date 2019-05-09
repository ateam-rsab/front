define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('TargetBobotYearCtrl', ['$rootScope', '$scope', '$state',
        'ModelItem', '$window', '$timeout', 'DateHelper', 'ManageSdm', 'ManageSdmNew', 'RekamDataPegawai', '$document',
        function ($rootScope, $scope, $state, ModelItem, $window, $timeout, DateHelper, ManageSdm, ManageSdmNew, RekamDataPegawai, $document) {

            $scope.now = new Date().getFullYear();
            $scope.validate = false;
            ///use to validate after data is appear
            $scope.item = {};
            $scope.dataCB = [];
            $scope.dataAsal = [];
            $scope.item.satuanKerja = "";
            $scope.dataVOloaded = true;
            $scope.grid = [];

            $scope.yearSelected = {
                start: "decade",
                depth: "decade",
                format: "yyyy",
                dateInput: false
            };
            var vals = false;

            // $scope.valCari = function () {
            //     if ($scope.item.DatePickerTahun != undefined && $scope.item.pegawai != undefined) {
            //         $scope.cari();
            //     } else {
            //         window.messageContainer.error("Tahun dan nama pegawai harus dipilih terlebih dahulu");
            //     }
            // }

            $scope.cari = function () {
                var listRawRequired = [
                    "item.DatePickerTahun|k-ng-model|Periode",
                    "item.pegawai|k-ng-model|Pegawai"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status){
                    // $scope.vals = false;
                    $scope.dataCB = [];
                    $scope.dataAsal = [];
                    // $scope.validate = false;
                    // vals = false;
                    // var x = moment($scope.item.DatePickerTahun).format("YYYY");
                    ManageSdmNew.getListData("sdm/get-target-bobot-uraian-kerja/" + $scope.item.pegawai.id + "/" + moment($scope.item.DatePickerTahun).format("YYYY")).then(function (dat) {
                        if (dat.data.data != null){
                            $scope.dataAsal = dat.data.data.uraianTugas;
                            $scope.createGrid(dat.data.data.uraianTugas);
                        } else {
                            messageContainer.log('Data tidak ditemukan');
                        }
                    });
                } else {
                    ModelItem.showMessages(isValid.messages)
                }
            }

            $scope.createGrid = function (dataAll) {
                var search = {};
                $scope.item.year = DateHelper.getTahunFormatted($scope.item.DatePickerTahun);
                var previousYear = new Date($scope.item.DatePickerTahun);
                previousYear.setYear($scope.item.DatePickerTahun.getFullYear() - 1);
                $scope.item.years = DateHelper.getTahunFormatted(previousYear);
                $scope.sourceOrder = new kendo.data.DataSource({
                    data: dataAll,
                    schema: {
                        model: {
                            fields: {
                                rincianKegiatan: {editable: false},
                                targetLastMonth: {
                                    type: "number",
                                    validation: {min: 0, required: true},
                                    editable: false
                                },
                                bobotLastMonth: {type: "number", validation: {min: 0, required: true}, editable: false},
                                targetThisYear: {type: "number", validation: {min: 0, required: true}},
                                bobotThisYear: {type: "number", validation: {min: 0, required: true}}
                            }
                        }
                    },
                    aggregate: [
                        {field: "bobotLastMonth", aggregate: "sum"},
                        {field: "bobotThisYear", aggregate: "sum"}
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
                            title: "{{item.years}}", width: "20%",
                            columns: [
                                {field: "targetLastMonth", "title": "Target"},
                                {field: "bobotLastMonth", "title": "Bobot", aggregates: ["sum"], footerTemplate: " #= kendo.toString(sum,'0')#"},
                                {field: "satuanLastMonth", "title": "Satuan"}
                            ],
                        },
                        {
                            title: "{{item.year}}", width: "20%",
                            columns: [
                                {field: "targetThisYear", title: "Target"},
                                {field: "bobotThisYear", "title": "Bobot", aggregates: ["sum"], footerTemplate: " #= kendo.toString(sum,'0')#"},
                                {field: "satuanThisYear", "title": "Satuan"}

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
                    $scope.listPegawai = dat.data;
                });
            } else {
                ManageSdmNew.getListData("sdm/get-pegawai-bawahan/" + pegawaiLogin.id).then(function (dat) {
                    $scope.listPegawai = dat.data;
                });
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

                                    "bobotLastMonth": data.bobotLastMonth,
                                    "bobotThisYear": data.bobotLastMonth,
                                    "targetThisYear": data.targetLastMonth,
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
                            }, "target": data.targetThisYear,
                            "bobot": data.bobotThisYear,
                            "periode": moment($scope.item.DatePickerTahun).format("YYYY"),
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
                    $scope.createGrid(grid);
                    $scope.vals = false;
                    $scope.dataCB = [];
                    $scope.dataAsal = [];
                    $scope.validate = false;
                });

            };

        }
    ]);


});