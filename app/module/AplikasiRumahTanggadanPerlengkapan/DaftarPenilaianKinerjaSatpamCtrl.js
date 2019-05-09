define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarPenilaianKinerjaSatpamCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state', 'ManageSarpras',
        function ($rootScope, $scope, ModelItem, DateHelper, $state, ManageSarpras) {
            ModelItem.get("Hukor/DaftarUsulanEvaluasiDanKajianOrganisasiTujuan").then(function (data) {
                $scope.item = data;
                $scope.item.periodeAwal = new Date();
                $scope.item.periodeAkhir = new Date();
                $scope.showDetailUsulan = false;
                $scope.idJabatanSelected = 0;
                $scope.now = new Date();
                $scope.dataVOloaded = true;

            }, function errorCallBack(err) { });

            $scope.item = {
                "periodeAwal": new Date(),
                "periodeAkhir": new Date()
            }


            var idPegawai = ModelItem.getPegawai().id;
            var idJabatan;


            $scope.change = function () {
                console.log(JSON.stringify($scope.item.cariNoUsulan));
            }

            $scope.show = function () {
                if ($state.current.name == "DaftarUsulanEvaluasiDanKajianOrganisasiTujuan")
                    return false;
                else
                    return true;
            }

            $scope.pegOptions = {
                dataTextField: "namaLengkap",
                dataValueField: "namaLengkap"
            }

            // $scope.dataAutoComplete = function () {

            // }

            $scope.mainGridOptions = {
                toolbar : ['excel','pdf', {
                    text:"Order", template:'<button ng-click="addNew()" class="k-button k-button-icontext k-grid-add"><span class="k-icon k-add"></span>Order Baru</button>'
                }],   
                columns: [
                    {"field": "tglPenilaian","title": "<h3>Tanggal Penilaian</h3>",width: "150px", template:'#= kendo.toString(kendo.parseDate(new Date(tglPenilaian)),"dd/MM/yyyy") #'},
                    {"field": "tglPeriodeAwal","title": "<h3>Periode Awal</h3>",width: "150px", template:'#= kendo.toString(kendo.parseDate(new Date(tglPeriodeAwal)),"dd/MM/yyyy") #'},
                    {"field": "tglPeriodeAkhir","title": "<h3>Periode Akhir</h3>",width: "150px", template:'#= kendo.toString(kendo.parseDate(new Date(tglPeriodeAkhir)),"dd/MM/yyyy") #'},
                    {"field": "namaSatpam","title": "<h3>Nama Pegawai</h3>",width: "150px"},
                    {"field": "namaPemberiNilai","title": "<h3>Nama Pemberi Nilai</h3>",width: "150px"},
                    {"field": "grandTotal","title": "<h3>Total Nilai</h3>",width: "150px"}
                ],
                selectable: "row",
                // editable: "popup",
                pageable: true
            };

            $scope.cariPegawai = function () {
                ManageSarpras.getOrderList("daftar-penilaian-kinerja-satpam/find-by-nama-pegawai/?namaPegawai=" + $scope.item.cariNamaPegawai).then(function (dat) {
                    debugger;
                    if(dat.data.data.result){
                        var gridData = $("#gridPenilaianKinerja").data("kendoGrid");
                        var ds = new kendo.data.DataSource({
                            data: dat.data.data.result,
                            pageSize: 12
                        });
                        gridData.setDataSource(ds);
                        gridData.dataSource.read();
                    }
                    /*
                    $scope.daftarPenilaianKinerja = dat.data.data.result;
                    $scope.daftarPenilaianKinerja.forEach(function (data) {
                        var date = new Date(data.tglPenilaian);
                        data.tglPenilaian = DateHelper.getTanggalFormatted(date);
                        date = new Date(data.tglPeriodeAwal);
                        data.tglPeriodeAwal = DateHelper.getTanggalFormatted(date);
                        date = new Date(data.tglPeriodeAkhir);
                        data.tglPeriodeAkhir = DateHelper.getTanggalFormatted(date);

                    })
                    */
                });
            }

            $scope.tutup = function () {
                console.log(JSON.stringify($scope.daftarEvaluasi))
            }



            function createTemplateFor(detailKajianSet) {
                var template =
                    "<ol> # for (var i = 0; i < detailKajianSet.length; i++) { #" +
                    "<li> #= detailKajianSet[i].tujuan.namaJabatan # </li><br/>" +
                    "# } #</ol>";

                console.log(template);
                return template;
            }

            ManageSarpras.getListData("Pegawai&select=namaLengkap").then(function (dat) {
                // debugger;
                $scope.dataPegawai = dat.data;

            });

            // ManageSarpras.getOrderList("daftar-penilaian-kinerja-satpam/find-by-nama-pegawai/?namaSatpam,noRec").then(function (dat) {
            //     debugger;
            //     $scope.daftarPenilaianKinerja = dat.data.data;
            //     $scope.daftarPenilaianKinerja.forEach(function (data) {
            //         var date = new Date(data.tglPenilaian);
            //         data.tglPenilaian = DateHelper.getTanggalFormatted(date);
            //         date = new Date(data.tglPeriodeAwal);
            //         data.tglPeriodeAwal = DateHelper.getTanggalFormatted(date);
            //         date = new Date(data.tglPeriodeAkhir);
            //         data.tglPeriodeAkhir = DateHelper.getTanggalFormatted(date);
            //     })
            // });




            $scope.navToKoreksi = function (selectedData) {
                console.log(JSON.stringify(selectedData.id));
                debugger;
                $state.go('Koreksi', {
                    id: selectedData.id
                });


                console.log(selectedData.id)
            };

            $scope.hapus = function () {
                console.log(JSON.stringify($scope.daftarEvaluasi._data));
                var idUsulan = [];
                var i = 0;
                $scope.daftarEvaluasi._data.forEach(function (data) {


                    if (data.check == true) {
                        var dat = {
                            "id": data.id
                        }

                        idUsulan[i] = dat;
                        i++;
                    }

                })
                console.log(JSON.stringify(idUsulan));
                ManageSarpras.saveDataSarPras(ModelItem.beforePost(idUsulan), "kajian-evaluasi/delete/").then(function (e) {
                    console.log(JSON.stringify(e.data));
                    $scope.cariTanggal();
                });
            }

            $scope.verifikasi = function (status) {
                var idUsulan = [];
                var i = 0;
                debugger;
                $scope.daftarEvaluasi._data.forEach(function (data) {
                    if (status == 1) {
                        if (data.check == true) {
                            var dat = {
                                "id": data.id,
                                "statusUsulan": "Verifikasi"
                            }

                            idUsulan[i] = dat;
                            i++;
                        }
                    } else {
                        if (data.check == true) {
                            var dat = {
                                "id": data.id,
                                "statusUsulan": "Unverifikasi"
                            }

                            idUsulan[i] = dat;
                            i++;
                        }
                    }

                })
                console.log(JSON.stringify(idUsulan));
                ManageSarpras.saveDataSarPras(ModelItem.beforePost(idUsulan), "kajian-evaluasi/update-kajian/").then(function (e) {
                    console.log(JSON.stringify(e.data));
                    $scope.cariTanggal();


                });
            }

            $scope.columnUraianTugas = [{
                "field": "uraianTugas",
                "title": "<h3>Uraian Tugas</h3>",
                "width": "100px",
                footerTemplate: "Total:"
            }, {
                "field": "nilaiUraianTugas",
                "title": "<h3>Nilai</h3>",
                "width": "100px",
                attributes: {
                    align: "center"
                },
                footerTemplate: "<center>#= sum #</center> "
            }]


            $scope.columnKualitas = [{
                "field": "kualitas",
                "title": "<h3>Kualitas</h3>",
                "width": "100px",
                footerTemplate: "Total:"
            }, {
                "field": "nilaiKualitas",
                "title": "<h3>Nilai</h3>",
                "width": "100px",
                attributes: {
                    align: "center"
                },
                footerTemplate: "<center>#= sum #</center> "
            }];

            $scope.columnSikapPerilaku = [{
                "field": "sikapPerilaku",
                "title": "<h3>Sikap Perilaku</h3>",
                "width": "100px",
                footerTemplate: "Total:"
            }, {
                "field": "nilaiSikapPerilaku",
                "title": "<h3>Nilai</h3>",
                "width": "100px",
                attributes: {
                    align: "center"
                },
                footerTemplate: "<center>#= sum #</center> "
            }];

            $scope.daftarUraianTugas = new kendo.data.DataSource({
                data: [],
                aggregate: [{
                    field: "nilaiUraianTugas",
                    aggregate: "sum"
                }

                ]

            });

            $scope.daftarKualitas = new kendo.data.DataSource({
                data: [],
                aggregate: [{
                    field: "nilaiKualitas",
                    aggregate: "sum"
                }

                ]

            });

            $scope.daftarSikapPerilaku = new kendo.data.DataSource({
                data: [],
                aggregate: [{
                    field: "nilaiSikapPerilaku",
                    aggregate: "sum"
                }

                ]

            });

            $scope.mainGridOptions1 = {
                pageable: false
            };

            $scope.mainGridOptions2 = {

                pageable: false

            };

            $scope.mainGridOptions3 = {

                pageable: false

            };

            $scope.detailPenilaian = function (selectedData) {
                debugger;
                console.log(JSON.stringify(selectedData));
                if (selectedData != undefined)
                    $scope.showDetailPenilaian = true;

                var uraianTugas = selectedData.listMappingUraianTugas;
                var kualitas = selectedData.listMappingKualitas;
                var sikapPerilaku = selectedData.listMappingSikapPerilaku;

                $scope.daftarUraianTugas = new kendo.data.DataSource({
                    data: [],
                    aggregate: [{
                        field: "nilaiUraianTugas",
                        aggregate: "sum"
                    }]
                });

                $scope.daftarKualitas = new kendo.data.DataSource({
                    data: [],
                    aggregate: [{
                        field: "nilaiKualitas",
                        aggregate: "sum"
                    }]
                });

                $scope.daftarSikapPerilaku = new kendo.data.DataSource({
                    data: [],
                    aggregate: [{
                        field: "nilaiSikapPerilaku",
                        aggregate: "sum"
                    }]
                });

                uraianTugas.forEach(function (dats) {
                    $scope.daftarUraianTugas.add(dats);
                })
                kualitas.forEach(function (dats) {
                    $scope.daftarKualitas.add(dats);
                })

                sikapPerilaku.forEach(function (dats) {
                    $scope.daftarSikapPerilaku.add(dats);
                })

            }

            $scope.addNew = function(){
                $state.go("PenilaianKinerjaSatpam");
            }

        }
    ]);
});

/*===================================SOURCE OLD DATA==================================================================================*/

// ManageSarpras.getOrderList("daftar-penilaian-kinerja-satpam/find-by-nama-pegawai/?noRec=" + selectedData.noRec).then(function (dat) {
//     debugger;
//     var uraianTugas = dat.data.data[0].mapUraianTugas;
//     var kualitas = dat.data.data[0].mapKualitas;
//     var sikapPerilaku = dat.data.data[0].mapSikapPerilaku;

//     $scope.daftarUraianTugas = new kendo.data.DataSource({
//         data: [],
//         aggregate: [
//             { field: "nilaiUraianTugas", aggregate: "sum" }

//         ]

//     });

//     $scope.daftarKualitas = new kendo.data.DataSource({
//         data: [],
//         aggregate: [
//             { field: "nilaiKualitas", aggregate: "sum" }

//         ]

//     });

//     $scope.daftarSikapPerilaku = new kendo.data.DataSource({
//         data: [],
//         aggregate: [
//             { field: "nilaiSikapPerilaku", aggregate: "sum" }

//         ]

//     });

//     uraianTugas.forEach(function (dats) {
//         $scope.daftarUraianTugas.add(dats);
//     })
//     kualitas.forEach(function (dats) {
//         $scope.daftarKualitas.add(dats);
//     })

//     sikapPerilaku.forEach(function (dats) {
//         $scope.daftarSikapPerilaku.add(dats);
//     })

//     // $scope.daftarUraianTugas = new kendo.data.DataSource({
//     //     data: dat.data.data[0].mapUraianTugas,
//     //     aggregate: [
//     //         { field: "nilaiUraianTugas", aggregate: "sum" }

//     //     ]
//     // });

// ManageSarpras.getOrderList("pegawai/get-all-pegawai?id=" + idPegawai).then(function success(dat) {
//     idJabatan = dat.data.data[0];
//     if (idJabatan.jabatanStrukturalId == undefined || idJabatan.jabatanStrukturalId == null) {
//         $scope.idJabatanSelected = idJabatan.jabatanFungsionalId;
//     }
//     else {
//         $scope.idJabatanSelected = idJabatan.jabatanStrukturalId;
//     }


//     $scope.cariTanggal();
//     ManageSarpras.getOrderList("kajian-evaluasi/find-all-by-jabatan/?jabatanId=" + $scope.idJabatanSelected).then(function success(dat) {
//         $scope.dataNoUsulan = [];
//         var i = 0;
//         var arrUsulan = dat.data.data;
//         arrUsulan.forEach(function (data) {
//             var usulan = {
//                 "noUsulan": data.kajianEvaluasi.noUsulan
//             }
//             $scope.dataNoUsulan[i] = usulan;
//             i++;
//         })

//     }, function error(error) {
//         console.log(error);
//     });

//     console.log(JSON.stringify($scope.idJabatanSelected));
// });

// http://172.16.16.54:8080/jasamedika-web/kajian-evaluasi/find-all-by-jabatan/?jabatanId=1

// $scope.daftarEvaluasi = new kendo.data.DataSource({
//     data: [
//         {
//             "noUsulan": "1"
//         }
//     ]
// });






//     //  $scope.grid1.dataSource.read();

// });
