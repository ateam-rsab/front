define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RegistrasiPesertaDiseminasiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSarpras', '$q',
        function ($rootScope, $scope, ModelItem, $state, ManageSarpras, $q) {
            $scope.item = {};
            $scope.item.jml = 0;
            $scope.dataVOloaded = true;
            if ($state.params.idPlanning !== "") {
                $q.all([
                    ManageSarpras.getOrderList("service/list-generic/?view=StrukPlanning&select=namaplanning,kdruangan.id,kdruangan.namaRuangan&criteria=noplanning&values=" + $state.params.idPlanning, true),
                    ManageSarpras.getOrderList("penyuluhan/get-daftar-pelaksanaan-by-noplanning?noPlanning=" + $state.params.idPlanning, true),
                    ManageSarpras.getOrderList("service/list-generic/?view=AsalPeserta&select=id,asalPeserta", true),
                    ManageSarpras.getOrderList("penyuluhan/get-peserta-registrasi-by-noplanning/?noPlanning=" + $state.params.idPlanning, true)
                ]).then(function (data) {
                    $scope.item.judul = data[0].data[0].namaplanning;
                    $scope.item.penyelenggara = "Eksternal";
                    if (data[0].data[0].nmRekanan !== "") {
                        $scope.item.penyelenggara = "Internal";
                    }
                    $scope.listAsalPeserta = data[2];
                    $scope.item.noPlanning = $state.params.idPlanning;
                    $scope.item.periodeAwal = data[1].data.data.tlgPlanningExecAwal;
                    $scope.item.periodeAkhir = data[1].data.data.tglPlanningExecAkhir;
                    $scope.item.biaya = data[1].data.data.biaya;

                    $scope.item.pelaksanaanDiseminasi = data[1].data.data.nmRuanganExec;
                    $scope.item.deskripsi = data[1].data.data.deskipsi;
                    $scope.item.jml = data[3].data.data.length;
                    $scope.dat = data[3].data.data;
                    $scope.tmp = data[3].data.data;
                    $scope.gridInputPeserta = new kendo.data.DataSource({
                        data: $scope.dat,
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    biaya: {type: "number", validation: {min: 0, required: true}}
                                }
                            }
                        }, aggregate: [
                            {field: "biaya", aggregate: "sum"}
                        ],
                        change: function (e) {
                            if (e.action === "remove") {
                                $scope.item.jml -= 1;
                            }
                            if (e.action === "add") {
                                $scope.item.jml += 1;
                            }
                            if (e.action === "sync") {

                            }
                        }
                    });

                    $scope.colInputPeserta = {
                        sortable: true,
                        toolbar: [{name: "create", text: "Tambah"}],
                        columns: [
                            {
                                "field": "namaPegawai",
                                "title": "Nama Peserta",
                                "width": "20%",
                                footerTemplate: "Jumlah Peserta:"
                            },
                            {
                                "field": "asalPeserta",
                                "title": "Asal Peserta",
                                "width": "10%",
                                footerTemplate: "{{item.jml}}"
                            }, /*
                             {
                             "field": "jabatan",
                             "title": "Jabatan",
                             "width": "10%"
                             },*/
                            {
                                "field": "alamat",
                                "title": "Alamat",
                                "width": "10%"
                            },
                            {
                                "field": "noTlp",
                                "title": "No. Telp",
                                "width": "10%"
                            },
                            {
                                "field": "email",
                                "title": "Email",
                                "width": "10%"
                            },
                            {
                                "field": "jenisPetugasPe",
                                "title": "Jenis Peserta",
                                "width": "10%"
                            },
                            {
                                "command": "destroy",
                                "width": "10%"//,
                                //  footerTemplate: "Total :"
                            },
                            {
                                "field": "biaya",
                                "title": "Biaya",
                                "width": "10%"//,
                                // "template": "<span class='style-right'>{{formatRupiah('#: biaya #', 'Rp.')}}</span>",
                                //   aggregates: ["sum"],
                                //  footerTemplate: "<span class='style-right'>{{formatRupiah('#= kendo.toString(sum,'0')#', 'Rp.')}}</span>"
                            }
                        ],
                        editable: {
                            mode: "popup",
                            window: {
                                title: "Input Peserta"
                            },
                            template: kendo.template($("#popup-editors").html())
                        }
                    };

                });
            }


            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
            }

            $scope.getAsal = function (data, dataItem, columns) {
                $scope.dataItem = dataItem;
                $scope.dataItem.asalPeserta = $scope.dataItem.asalPesertas.asalPeserta;
                $scope.dataItem.ObjAsalPeserta = $scope.dataItem.asalPesertas;
                $scope.dataItem.jenisPetugasPe = "Peserta";
            }

            $scope.save = function () {
                var dataGrid = [];
                var deletes = [];
                debugger;
                //using for loop not foreach, for faster performa
                var map = $scope.gridInputPeserta._data;
                for (var i = 0; i < $scope.tmp.length; i++) {
                    var stat = true;
                    for (var j = 0; j < map.length; j++) {
                        if ($scope.tmp[i].noRec === map[j].noRec) {
                            stat = false;
                            break;
                        }
                    }
                    if (stat) {
                        deletes.push({
                            "noRec": $scope.tmp[i].noRec
                        })
                    }
                }
                debugger;
                var dataGrids = $scope.gridInputPeserta._data;
                angular.forEach(dataGrids, function (item) {
                    if (item.noRec === undefined) {
                        dataGrid.push({
                            "nama": item.namaPegawai,
                            "alamat": item.alamat,
                            "email": item.email,
                            "noTelp": item.noTlp,
                            "asalPeserta": item.ObjAsalPeserta
                        })
                    }
                })
                var data = {
                    "noplanning": $state.params.idPlanning,
                    "savePesertaDHM": dataGrid,
                    "deletePesertaDHM": deletes
                }
                ManageSarpras.saveSarpras(data, "penyuluhan/save-registrasi-peserta-penyuluhan").then(function (e) {

                });
            }
        }
    ]);
});