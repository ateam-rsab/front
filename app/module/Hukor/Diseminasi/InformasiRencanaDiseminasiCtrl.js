define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InformasiRencanaDiseminasiCtrl', ['$rootScope', '$scope', 'ModelItem',
        'DateHelper', '$document', '$state', 'ManageSarpras',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.noplanning;

            $scope.colgridRencanaDiseminasi = {
                columns: [{
                    field: "noplanning",
                    title: "No. Planning",
                    width: "10%"
                }, {
                    field: "namaplanning",
                    title: "Judul Diseminasi",
                    width: "15%"
                }, {
                    field: "deskripsiplanning",
                    title: "Deskripsi",
                    width: "15%"
                }, {
                    field: "",
                    title: "Rencana Pelaksanaan",
                    width: "20%",
                    columns: [
                        {
                            field: "tglPlanning",
                            title: "Tgl Awal"
                        }, {
                            field: "tglPlanningAkhir",
                            title: "Tgl Akhir"
                        }
                    ]
                }, {
                    field: "penyelenggara",
                    title: "Pihak Penyelenggara",
                    width: "15%"//,
                   // template: "{{penyelenggara('#: namaRekanan #')}}"
                }, {
                    field: "namaRuangan",
                    title: "Ruangan Diseminasi",
                    width: "15%"
                }, {
                    field: "namaRekanan",
                    title: "Rekanan",
                    width: "15%"
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

            $scope.detailGridOptions = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.planningBiaya
                    }),
                    columns: [
                        {
                            field: "namaProduk",
                            title: "Komponen",
                            width: "30%"
                        }, {
                            field: "qtyProduk",
                            title: "Qty",
                            width: "10%"
                        }, {
                            field: "hargaSatuan",
                            title: "Harga Satuan",
                            width: "30%"
                        }, {
                           // field: "",
                            title: "Total Harga",
                            width: "30%",
                            template: "#=qtyProduk * hargaSatuan #"
                        }
                    ]
                };

            };

            $scope.klik = function (current) {
                var selectedItem = current;
                $scope.noplanning = selectedItem.noplanning;
            };

            $scope.input = function () {
                // window.location = "#/InputPesertaDanPengajarDanPanitia";
                if( $scope.noplanning === undefined){
                    toastr.warning("Pilih data terlebih dahulu..!!");
                    return;
                }
                $state.go('InputPesertaDanPengajarDanPanitia', {idPlanning: $scope.noplanning});
            }
            $scope.pelaksanaan = function () {
                // window.location = "#/PelaksanaanDiseminasi";
                if($scope.noplanning === undefined){
                    toastr.warning("Pilih data terlebih dahulu..!!");
                    return;
                }
                $state.go('PelaksanaanDiseminasi', {idPlanning: $scope.noplanning});
            }

            $scope.cari = function () {
                getGrid();
            }
            getGrid();
            function getGrid() {
                var awal = moment($scope.item.periodeAwal).format("DD-MM-YYYY");
                var akhir =moment($scope.item.periodeAkhir).add(1, 'day').format("DD-MM-YYYY");
                var url = "penyuluhan/get-list-planning?dateStart=" + awal + "&dateEnd=" + akhir;
                if ($scope.item.noPlanning !== undefined) {
                    url += "&noPlanning=" + $scope.item.noPlanning;
                }
                ManageSarpras.getOrderList(url).then(function (dat) {
                    $scope.dataSource = new kendo.data.DataSource({
                        data: dat.data.data
                    });
                });
            }

        }]);
});