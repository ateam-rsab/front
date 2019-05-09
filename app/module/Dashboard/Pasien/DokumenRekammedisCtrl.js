define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DokumenRekammedisCtrl', ['ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'DateHelper',

        function(managePasien, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, dateHelper) {
            $scope.now = new Date();
            $scope.items = {
                tglKirim: $scope.now,
                tglTerima: $scope.now
            };
            $scope.batal = function(){
                $scope.from = $scope.until = $scope.now;
                $scope.namaPasien = "";
                $scope.ruangan = "";
            }
            $scope.batal();
            ModelItem.getDataDummyGeneric("Ruangan", true, true, 500).then(function(data) {
                $scope.sourceRuangan = data;
            });
            $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            if($scope.pegawai.ruangan.id === 147 || $scope.pegawai.ruangan.id === 130) {
                $scope.showRuangan = true;
                $scope.ruangan = '';
                $scope.isTerima = false;
            } else {
                $scope.ruangan = $scope.pegawai.ruangan.id;
                $scope.isTerima = true;
            }
            $scope.group = {
                field: "ruanganPasien",
                aggregates: [{
                    field: "noCM",
                    aggregate: "count"
                }, {
                    field: "ruanganPasien",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [{
                field: "noCM",
                aggregate: "count"
            }, {
                field: "ruanganAsal.namaRuangan",
                aggregate: "count"
            }]
            $scope.ColumnKirim = [{
                field: "noCM.namaPasien",
                title: "Nama Pasien",
                aggregates: ["count"]
            }, {
                field: "noCM.noCm",
                title: "No. Rekam Medis",
                aggregates: ["count"]
            }, {
                field: "ruanganTujuan.namaRuangan",
                title: "Ruangan Asal",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
            }, {
                field: "ruanganAsal.namaRuangan",
                template: '<input style="width: 100%; " kendo-combo-box k-ng-model="dataItem.ruanganAsal" k-data-text-field="\'namaRuangan\' " k-filter="\'contains\' " k-data-value-field="\'value\'" k-auto-bind="false " k-data-source="ruangans " />',
                title: "Ruangan Tujuan",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
            }];
            $scope.Column = [{
                field: "isCheck",
                title: " ",
                template: '<input k-ng-model="isCheck" type="checkbox" #= isCheck ? \'checked="checked"\' : "" # class="chkbx" />',
                width: 40
            }, {
                field: "noRegistrasi",
                title: "No. Pendaftaran"
            }, {
                field: "noCm",
                title: "No. Rekam Medis"
            }, {
                field: "namaPasien",
                title: "Nama Pasien",
                aggregates: ["count"],
                width: 250
            }, {
                field: "jenisKelamin",
                title: "Jenis Kelamin"
            }, {
                field: "ruanganPasien",
                title: "Ruangan Pelayanan",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)",
                width: 250
            }, {
                field: "tglPulang",
                title: "Tgl Pulang",
                // template: "#= new moment(tglPulang).format(\'DD-MM-YYYY\') #",
                template: "#if (tglPulang) {# #= new moment(tglPulang).format(\'DD-MM-YYYY\')# #} else {# - #} #"
                // '#if (HasNotes) {# <a href="javascript:void(0)" onclick="openNotes(${CustomerKey}, ${ReservationKey})">View Notes</a> #} else {# N/A #}#'
            }, {
                field: "tglkirim",
                title: "Tgl Kirim",
                template: "#if (tglkirim) {# #= new moment(tglkirim).format(\'DD-MM-YYYY\')# #} else {# - #} #"
            }, {
                field: "statusDokumen",
                title: "Status",
                aggregates: ["count"]
            }];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
            $scope.$on("kendoWidgetCreated", function(event, widget) {
                // debugger;
                if (widget === $scope.grid) {
                    // debugger;
                    $scope.grid.element.on("change", "input.chkbx", function(e) {
                        var grid = $scope.grid,
                            dataItem = grid.dataItem($(e.target).closest("tr"));

                        // if ((dataItem.ruanganTujuan.id === ModelItem.getPegawai().ruangan.id || dataItem.ruanganAsal.id === ModelItem.getPegawai().ruangan.id)) {
                            dataItem.set("isCheck", this.checked);
                        //     if (this.checked === true) {
                        //         $scope.isTerima = dataItem.ruanganTujuan.id === ModelItem.getPegawai().ruangan.id;
                        //         if ($scope.$$phase === null)
                        //             $scope.$apply();
                        //     }
                        // } else {
                        //     dataItem.set("isCheck", false);
                        //     this.checked = false;

                        // }
                    });
                } else if (widget === $scope.gridDokumen) {
                    $scope.gridDokumen.element.on("change", "input.k-input", function(e) {
                        // debugger;
                        var grid = $scope.grid,
                            dataItem = grid.dataItem($(e.target).closest("tr"));
                        dataItem.set("isCheck", this.checked);
                    });
                }
            });
            $scope.findData = function() {
                $scope.isRouteLoading = true;
                if ($scope.ruangan.id !== undefined) $scope.ruangan = $scope.ruangan.id;
                if($scope.pegawai.ruangan.id === 147 || $scope.pegawai.ruangan.id === 130) {
                    findPasien.findDokumenRekammediss(dateHelper.formatDate($scope.from, 'YYYY-DD-MM'), dateHelper.formatDate($scope.until, 'YYYY-DD-MM'), $scope.ruangan, $scope.namaPasien).then(function(e) {
                        debugger;
                        $scope.isRouteLoading = false;
                        var data = [];
                        for (var key in e.data.result) {
                            if (e.data.result.hasOwnProperty(key)) {
                                var element = e.data.result[key];
                                element.isCheck = false;
                                data.push(element);
                            }
                        }
                        $scope.listPasien = data;
                        $scope.patienGrids = new kendo.data.DataSource({
                            data: $scope.listPasien,
                            group: $scope.group,
                            pageSize: 25
                        });

                    });
                } else {
                    findPasien.getDokumenKirim(dateHelper.formatDate($scope.from, 'YYYY-DD-MM'), dateHelper.formatDate($scope.until, 'YYYY-DD-MM'), $scope.ruangan, $scope.namaPasien).then(function(e) {
                        debugger;
                        $scope.isRouteLoading = false;
                        var data = [];
                        for (var key in e.data.result) {
                            if (e.data.result.hasOwnProperty(key)) {
                                var element = e.data.result[key];
                                element.isCheck = false;
                                data.push(element);
                            }
                        }
                        $scope.listPasien = data;
                        $scope.patienGrids = new kendo.data.DataSource({
                            data: $scope.listPasien,
                            group: $scope.group,
                            pageSize: 25
                        });

                    });
                }

            }
            $scope.findData();
            
            $scope.kirimDokumen = function() {
                var listRawRequired = [
                    "items.ruanganTujuan|k-ng-model|Ruangan tujuan",
                    "items.tglKirim|k-ng-model|Tanggal kirim"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    // $scope.isTerimaDokumen = false;
                    // debugger;
                    var array = [];
                    $scope.patienGrids._data.forEach(function(element){
                        if (element !== undefined && element.isCheck === true) {
                            var arr = {
                                "pasienDaftar":{
                                    "noRec":element.noRec	
                                },
                                "pasien": {
                                    "id": element.idPasien
                                },
                                "dokumen": {
                                    "id": element.idDokumen
                                },
                                "ruanganTujuan": {
                                    "id": $scope.items.ruanganTujuan.id
                                }
                            }
                            array.push(arr);
                            debugger;
                        }
                    })
                    var dataPush = {
                        "strukKirim": {
                            "tglkirim": new moment($scope.items.tglKirim).format('YYYY-MM-DD'),
                            "kdruangantujuan": {
                                "id": $scope.items.ruanganTujuan.id
                            }
                        },
                        "dokumenRekamMedis": {
                            "ruanganTujuan": {
                                "id": $scope.items.ruanganTujuan.id
                            },
                            "mapKirimDokumenPasien": array
                        }
                    }
                    // console.log(JSON.stringify(dataPush));
                    managePasien.kirimDokumenRekammediss(dataPush).then(function(e){
                        // console.log(JSON.stringify(e.data))
                    })
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.terimaDokumen = function(){
                var listRawRequired = [
                    "items.tglTerima|k-ng-model|Tanggal terima"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    var array = "";
                    for (var key in $scope.patienGrids._data) {
                        if ($scope.patienGrids._data.hasOwnProperty(key)) {
                            var element = $scope.patienGrids._data[key];
                            if (element.isCheck === true && element.ruanganPasien === ModelItem.getPegawai().ruangan.namaRuangan) {
                                if (element.statusDokumen === null) {
                                    if (array === "") {
                                        array += element.noReVerifikasi;
                                    } else {
                                        array += "," + element.noReVerifikasi;
                                    }
                                } else {
                                     window.messageContainer.error('Dokumen sudah di terima');
                                     return;
                                }
                            }
                        }
                    }
                    // console.log(array);
                    managePasien.terimaDokumenRekammedis(array).then(function(e) {
                        window.messageContainer.log('Data berhasil di terima');
                        $scope.findData();
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
        }
    ]);
});