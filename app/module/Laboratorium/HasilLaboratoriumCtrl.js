define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('HasilLaboratoriumCtrl', ['$scope', '$state', 'ModelItemAkuntansi', 'CacheHelper',
        function ($scope, $state, ModelItemAkuntansi, cacheHelper) {

            $scope.isRouteLoading = false;
            $scope.norecPD = $state.params.norecPd
            $scope.norecAPD = $state.params.norecApd
            // $scope.shows = 0;
            $scope.item = {};
            // $scope.item.tgl1 = "-";
            // $scope.item.tgl2 = "-";
            // $scope.item.tgl3 = "-";
            // getHeaderData();
            // function getHeaderData() {
            //     $scope.isRouteLoading = true;
            //     ModelItemAkuntansi.getDataTableTransaksi("registrasipasien/get-pasien-bynorec/"
            //         +  $scope.norecPD 
            //         + "/"
            //         +$scope.norecAPD)
            //         .then(function (e) {
            //             $scope.isRouteLoading = false;
            //             // if (e.statResponse == true)
            //                 $scope.item.pasien = e[0];
            //         })
            // }
            LoadCacheHelper();
            function LoadCacheHelper() {
                var chacePeriode = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.noMr = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    $scope.item.umur = chacePeriode[4]
                    $scope.item.kelompokPasien = chacePeriode[5]
                    $scope.item.tglRegistrasi = chacePeriode[6]
                    $scope.item.idKelas = chacePeriode[9]
                    $scope.item.kelas = chacePeriode[10]
                    $scope.item.idRuangan = chacePeriode[11]
                    $scope.item.namaRuangan = chacePeriode[12]

                    //    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                    //         $scope.showTombol = true
                    //    }
                }
                // init()
            }
            $scope.noRegistrasi = $state.params.noRegistrasi;
            $scope.noOrder = $state.params.noOrder;


            $scope.result = function () {
                //belum di rapihkan, 2 view yang berbeda
                ///grid untuk di modul app lab khusus
                $scope.group = {
                    field: "Pemeriksaan"
                };

                $scope.ColumnResult = {
                    toolbar: [
                        "excel",
                      
                    ],
                    excel: {
                        fileName: "HasilLab.xlsx",
                        allPages: true,
                    },
                  
                    excelExport: function (e) {

                        var sheet = e.workbook.sheets[0];
                        sheet.frozenRows = 2;
                        sheet.mergedCells = ["A1:H1"];
                        sheet.name = "Hasil";

                        var myHeaders = [

                            {
                                value: "Hasil Laboratorium",
                                fontSize: 15,
                                textAlign: "center",
                                background: "#c1d2d2",
                                // color:"#ffffff"
                            }];

                        sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 50 });
                    },
                    columns: [{
                        field: "namaPemeriksaan",
                        title: "Nama Pemeriksaan",
                        width: "20%"
                    }, {
                        field: "hasilPemeriksaan",
                        title: "Hasil Pemeriksaan",
                        width: "15%",
                        attributes: {
                            class: "#=flag != 'N' ? 'red' : 'green' #"
                        }
                    }, {
                        field: "nilaiNormal",
                        title: "Nilai Normal",
                        width: "15%"
                    }, {
                        field: "satuan",
                        title: "Satuan",
                        width: "8%"
                    }, {
                        field: "keterangan",
                        title: "Keterangan",
                        width: "15%"
                    }, {
                        field: "validator",
                        title: "Validator",
                        width: "20%"
                    }, {
                        title: "Status",
                        field: "flag",
                        width: "7%"
                    }, {
                        hidden: true,
                        field: "paket",
                        title: "Pemeriksaan"
                    }, {
                        hidden: true,
                        field: "idLab"
                    }, {
                        hidden: true,
                        field: "urutan"

                    }]
                };

                ModelItemAkuntansi.getDataTableTransaksi("lab-radiologi/get-hasil-lab?noorder=" + $scope.noOrder).then(function (data) {
                    var sourceGrid = []
                    if (data.statResponse == true && data.data.length > 0) {
                        sourceGrid = data.data
                    } else
                        toastr.info('Data Hasil tidak ada', 'Info')

                    $scope.resultGrids = new kendo.data.DataSource({
                        data: sourceGrid,
                        group: {
                            field: "paket"
                        },
                        sort: { field: "urutan", dir: "asc" }
                    });
                });
            }


            $scope.result();

        }
    ]);
});