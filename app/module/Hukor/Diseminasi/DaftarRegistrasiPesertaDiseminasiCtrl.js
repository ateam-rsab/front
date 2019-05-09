define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarRegistrasiPesertaDiseminasiCtrl', ['$rootScope', '$scope',
        'ModelItem', 'DateHelper', '$document', '$state', 'ManageSarpras',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.window;
            $scope.cari = function () {
                getGrid();
            };
            getGrid();
            function getGrid() {
                var awal = moment($scope.item.periodeAwal).format("DD-MM-YYYY");
                var akhir =moment($scope.item.periodeAkhir).add(1, 'day').format("DD-MM-YYYY");
                var url = "penyuluhan/get-daftar-pelaksanaan-diseminasi?dateStart=" + awal + "&dateEnd=" + akhir;
                console.log(url);
                if ($scope.item.noPlanning !== undefined) {
                    url += "&noPlanning=" + $scope.item.noPlanning;
                }
                ManageSarpras.getOrderList(url).then(function (dat) {
                    $scope.DaftarRegistrasi = new kendo.data.DataSource({
                        data: dat.data.data
                    });
                });
            }

            $scope.colDaftarRegistrasi = {
                columns: [
                    {
                        field: "noPlanning",
                        title: "No. Planning",
                        width: "10%"
                    }, {
                        field: "namaPlanning",
                        title: "Judul Diseminasi",
                        width: "20%"
                    }, {
                        field: "",
                        title: "Tanggal Pelaksanaan",
                        width: "20%",
                        columns: [
                            {
                                field: "tlgPlanningExecAwal",
                                title: "Tgl Awal"
                            }, {
                                field: "tglPlanningExecAkhir",
                                title: "Tgl Akhir"
                            }
                        ]
                    }, {
                        field: "nmRuanganExec",
                        title: "Ruangan Pelaksanaan Diseminasi",
                        width: "20%"
                    }, {
                        field: "nmRekanan",
                        title: "Pihak Penyelenggara",
                        width: "20%",
                        template: "{{penyelenggara('#: nmRekanan #')}}"
                    }, {
                        "command": {
                            "text": "Detail Peserta",
                            "click": $scope.lihatData
                        }
                    }
                ]
            };
            $scope.penyelenggara = function(value) {
                if(value === "null" || value === "" || value === undefined){
                    value = "Internal";
                }else{
                    value = "Eksternal";
                }
                return value;
            }

            $scope.klik = function (current) {
                var selectedItem = current;
                $scope.noPlanning = selectedItem.noPlanning;
            };

            $scope.lihatData = function (e) {
                debugger;
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var selectedItem = grid.dataItem(row);
                ManageSarpras.getOrderList("penyuluhan/get-peserta-registrasi-by-noplanning/?noPlanning=" + selectedItem.noPlanning).then(function (dat) {
                    $scope.gridListPeserta = new kendo.data.DataSource({
                        data: dat.data.data
                    });
                });

                $scope.win1visible = true
                $scope.DlgOptions = {
                    width: 1200,
                    height: 400,
                    visible: false,
                    actions: [
                        "Close"
                    ]
                };
                $scope.window.setOptions($scope.DlgOptions);
                $scope.window.center();
                $scope.window.open();

            };

            $scope.colgridListPeserta = {
                columns: [
                    {
                        field: "namaPegawai",
                        title: "Nama Peserta",
                        width: "20%"
                    }, {
                        field: "",
                        title: "Asal Peserta",
                        width: "10%"
                    }, {
                        field: "",
                        title: "Jabatan",
                        width: "10%"
                    }, {
                        field: "alamat",
                        title: "Alamat",
                        width: "10%"
                    }, {
                        field: "noTlp",
                        title: "No. Telp",
                        width: "10%"
                    }, {
                        field: "email",
                        title: "Email",
                        width: "10%"
                    }, {
                        field: "jenisPetugasPe",
                        title: "Jenis Peserta",
                        width: "10%"
                    }, {
                        field: "biaya",
                        title: "Biaya",
                        width: "10%"
                    }/*, {
                        field: "",
                        title: "Status Pembayaran",
                        width: "10%"
                    }*/
                ]
            };

            $scope.redirect = function () {
                if ($scope.noPlanning === undefined) {
                    toastr.warning("Pilih data terlebih dahulu..!!");
                    return;
                }
               // $state.go('RegistrasiPesertaDiseminasi', {idPlanning: $scope.noplanning});
            }
        }
    ]);
});