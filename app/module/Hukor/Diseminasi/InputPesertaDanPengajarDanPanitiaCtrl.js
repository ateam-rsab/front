define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputPesertaDanPengajarDanPanitiaCtrl', ['$rootScope', '$scope', 'ModelItem',
        'DateHelper', '$state', 'ManageSarpras', '$q',
        function ($rootScope, $scope, ModelItem, DateHelper, $state, ManageSarpras, $q) {
            $scope.item = {};
            $scope.item.jml = 0;
            if ($state.params.idPlanning !== "") {
                $q.all([
                    ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap,jabatanInternal.id,jabatanInternal.namaJabatan,alamat,email,noTlp", true),
                    ManageSarpras.getOrderList("service/list-generic/?view=StrukPlanning&select=namaplanning&criteria=noplanning&values=" + $state.params.idPlanning, true),
                    ManageSarpras.getOrderList("penyuluhan/get-peserta-penyuluhan-by-noplanning/?noPlanning=" + $state.params.idPlanning, true)
                ]).then(function (data) {
                    $scope.listPegawai = data[0].data;
                    var dats = data[1].data;
                    $scope.item.judul = dats.namaplanning;
                    $scope.listJenis = [{'id': 1, 'jenis': 'Pengajar'},
                        {'id': 2, 'jenis': 'Peserta'},
                        {'id': 3, 'jenis': 'Panitia'}]
                    $scope.item.jml = data[2].data.data.length;
                    $scope.gridInputPeserta = new kendo.data.DataSource({
                        data: data[2].data.data,
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {editable: false},
                                    pegawai: {validation: {required: true}},
                                    jenis: {validation: {required: true}},
                                }
                            }
                        },
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
                });
            }

            $scope.colInputPeserta = {
                sortable: true,
                toolbar: [{name: "create", text: "Tambah"}],
                columns: [{
                    field: "namaPegawai",
                    title: "Nama Pegawai",
                    width: "20%",
                    footerTemplate: "Jumlah Peserta:"
                }, {
                    field: "jabatan",
                    title: "Jabatan",
                    width: "20%",
                    footerTemplate: "{{item.jml}}"
                }, {
                    field: "alamat",
                    title: "Alamat",
                    width: "10%"
                }, {
                    field: "noTlp",
                    title: "no.Telp",
                    width: "10%"
                }, {
                    field: "email",
                    title: "Email",
                    width: "10%"
                }, {
                    field: "jenisPetugasPe",
                    title: "Jenis Peserta",
                    width: "10%"
                }, {command: "destroy", title: " ", width: "10%"}
                    //  { command: ["edit", "destroy"], title: " ", width: "10%" }
                ],
                editable: {
                    mode: "popup",
                    window: {
                        title: "Input Peserta"
                    },
                    template: kendo.template($("#popup-editor").html())
                }
            };

            var x = 0;
            $scope.getPegawai = function (data, dataItem, columns) {
                $scope.dataItem = dataItem;
                x += 1;
                $scope.dataItem.id = x;
                $scope.dataItem.namaPegawai = $scope.dataItem.pegawais.namaLengkap;
                $scope.dataItem.pegawaiObj = $scope.dataItem.pegawais;
                $scope.dataItem.jabatan = $scope.dataItem.pegawais.jabatanInternal_namaJabatan;
                $scope.dataItem.alamat = $scope.dataItem.pegawais.alamat;
                $scope.dataItem.noTlp = $scope.dataItem.pegawais.noTlp;
                $scope.dataItem.email = $scope.dataItem.pegawais.email;
            }
            $scope.getJenis = function (data, dataItem, columns) {
                $scope.dataItem = dataItem;
                $scope.dataItem.jenisPetugasPe = $scope.dataItem.jeniss.jenis;
            }

            $scope.save = function () {
                var dataGrid = [];
                angular.forEach($scope.gridInputPeserta._data, function (item) {
                    if (item.pegawaiObj !== undefined) {
                        if (item.noRec === undefined || _.isNull(item.noRec)) {
                            dataGrid.push({
                                "kdPegawai": item.pegawaiObj,
                                "kdJenisPetugasPe": {
                                    "jenisPetugasPe": item.jenisPetugasPe
                                }
                            })
                        }
                    }
                })
                var data = {
                    "noplanning": $state.params.idPlanning,
                    "pesertaDHM": dataGrid
                }
                ManageSarpras.saveSarpras(data, "penyuluhan/save-peserta-penyuluhan").then(function (e) {

                });
            }

        }
    ]);
});