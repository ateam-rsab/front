define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPelaksanaanDiseminasiCtrl', ['$rootScope', '$scope', 'ModelItem',
        'DateHelper', '$document', '$state', 'ManageSarpras',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.item = {};

            $scope.colgridPelaksanaanDiseminasi = {
                columns: [{
                    field: "noPlanning",
                    title: "No. Planning",
                    width: "10%"
                }, {
                    field: "namaPlanning",
                    title: "Judul Diseminasi",
                    width: "20%"
                }, {
                    field: "deskripsi",
                    title: "Deskripsi",
                    width: "20%"
                }, {
                    field: "",
                    title: "Rencana Pelaksanaan",
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
                }
                ]
            };

            $scope.klik = function (current) {
                var selectedItem = current;
                $scope.noplanning = selectedItem.noPlanning;
            };

            $scope.input = function () {
                if ($scope.noplanning === undefined) {
                    toastr.warning("Pilih data terlebih dahulu..!!");
                    return;
                }
                $state.go('InputPesertaDanPengajarDanPanitia', {idPlanning: $scope.noplanning});
            }
            $scope.regis = function () {
                if ($scope.noplanning === undefined) {
                    toastr.warning("Pilih data terlebih dahulu..!!");
                    return;
                }
                $state.go('RegistrasiPesertaDiseminasi', {idPlanning: $scope.noplanning});
            }

            $scope.cari = function () {
                getGrid();
            }
            getGrid();
            function getGrid() {
                var awal = moment($scope.item.periodeAwal).format("DD-MM-YYYY");
                var akhir = moment($scope.item.periodeAkhir).add(1, 'day').format("DD-MM-YYYY");
                 var url = "penyuluhan/get-daftar-pelaksanaan-diseminasi?dateStart=" + awal + "&dateEnd=" + akhir;
                if ($scope.item.noPlanning !== undefined) {
                    url += "&noPlanning=" + $scope.item.noPlanning;
                }
                console.log(url);
                ManageSarpras.getOrderList(url).then(function (dat) {
                    $scope.dataSource = new kendo.data.DataSource({
                        data: dat.data.data
                    });
                });
            }
        }
    ]);
});


