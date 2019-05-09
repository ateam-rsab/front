define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarUsulanEvaluasiDanKajianOrganisasiTujuanCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state', 'ManageSarpras',
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

            ManageSarpras.getOrderList("pegawai/get-all-pegawai?id=" + idPegawai).then(function success(dat) {
                idJabatan = dat.data.data[0];
                if (idJabatan.jabatanStrukturalId == undefined || idJabatan.jabatanStrukturalId == null) {
                    $scope.idJabatanSelected = idJabatan.jabatanFungsionalId;
                }
                else {
                    $scope.idJabatanSelected = idJabatan.jabatanStrukturalId;
                }


                $scope.cariTanggal();
                ManageSarpras.getOrderList("kajian-evaluasi/find-all-by-jabatan/?jabatanId=" + $scope.idJabatanSelected).then(function success(dat) {
                    $scope.dataNoUsulan = [];
                    var i = 0;
                    var arrUsulan = dat.data.data;
                    arrUsulan.forEach(function (data) {
                        var usulan = {
                            "noUsulan": data.kajianEvaluasi.noUsulan
                        }
                        $scope.dataNoUsulan[i] = usulan;
                        i++;
                    })

                }, function error(error) {
                    console.log(error);
                });

                console.log(JSON.stringify($scope.idJabatanSelected));
            });

            $scope.change = function () {
                console.log(JSON.stringify($scope.item.cariNoUsulan));
            }







            // http://172.16.16.54:8080/jasamedika-web/kajian-evaluasi/find-all-by-jabatan/?jabatanId=1

            // $scope.daftarEvaluasi = new kendo.data.DataSource({
            //     data: [
            //         {
            //             "noUsulan": "1"
            //         }
            //     ]
            // });

            $scope.show = function () {
                if ($state.current.name == "DaftarUsulanEvaluasiDanKajianOrganisasiTujuan")
                    return false;
                else
                    return true;
            }

            $scope.cariTanggal = function () {

                var awal = DateHelper.getPeriodeFormatted($scope.item.periodeAwal);
                var akhir = DateHelper.getPeriodeFormatted($scope.item.periodeAkhir);
                var id = $scope.idJabatanSelected;
                var url = "jabatanId=" + id + "&dateStart=" + awal + "&dateEnd=" + akhir;

                ManageSarpras.getOrderList("kajian-evaluasi/find-all-by-jabatan/?" + url).then(function (dat) {
                    $scope.daftarEvaluasi = new kendo.data.DataSource({
                        data: dat.data.data,
                        scrollable: true
                    });
                    console.log(url);
                    // console.log(JSON.stringify($scope.daftarEvaluasi.options));

                    for (var i = $scope.daftarEvaluasi.options.data.length - 1; i >= 0; i--) {
                        var date = new Date($scope.daftarEvaluasi.options.data[i].kajianEvaluasi.tglUsulan);
                        $scope.daftarEvaluasi.options.data[i].kajianEvaluasi.tglUsulan = DateHelper.getTanggalFormatted(date);
                    }
                    // debugger;
                });
                console.log(JSON.stringify($scope.daftarEvaluasi));
            }


            $scope.pegOptions = {
                dataTextField: "noUsulan",
                dataValueField: "noUsulan"
            }

            // $scope.dataAutoComplete = function () {

            // }


            $scope.cariNoUsulan = function () {
                console.log($scope.item.cariNoUsulan);

                ManageSarpras.getOrderList("kajian-evaluasi/find-all-by-jabatan/?noUsulan=" + $scope.item.cariNoUsulan[0].noUsulan + "&jabatanId=" + $scope.idJabatanSelected).then(function (dat) {
                    $scope.daftarEvaluasi = new kendo.data.DataSource({
                        data: dat.data.data,
                        scrollable: true
                    });

                    // console.log(JSON.stringify($scope.daftarEvaluasi.options));
                    // debugger;
                    for (var i = $scope.daftarEvaluasi.options.data.length - 1; i >= 0; i--) {
                        var date = new Date($scope.daftarEvaluasi.options.data[i].kajianEvaluasi.tglUsulan);
                        $scope.daftarEvaluasi.options.data[i].kajianEvaluasi.tglUsulan = DateHelper.getTanggalFormatted(date);
                    }
                    // debugger;
                });
            }

            $scope.tutup = function () {

                console.log(JSON.stringify($scope.daftarEvaluasi))
            }

            $scope.generateTemplate = function (detailKajianSet) {

                var template = "";
                for (var i = 0; i < detailKajianSet.length; i++) {
                    // template += "<li>" + detailKajianSet[i].tujuan.namaJabatan+ "</li>";
                    template = template + "<li>" + detailKajianSet[i].tujuan.namaJabatan + "</li>";
                }

                //return $sce.trustAsHtml('<b>BOLD</b>');

                return template = "<ul>" + template + "</ul>";


            }

            function createTemplateFor(detailKajianSet) {
                var template =
                    "<ol> # for (var i = 0; i < detailKajianSet.length; i++) { #" +
                    "<li> #= detailKajianSet[i].tujuan.namaJabatan # </li><br/>" +
                    "# } #</ol>";

                console.log(template);
                return template;
            }


             $scope.columnEvaluasi = [
               /* {
                    "template": "<center><input type='checkbox' class='checkbox' ng-model='dataItem.check'/></center>",
                    "width": 30
                },*/
                {
                    "field": "",
                    "title": "No Usulan",
                    "width": "100px"
                },
                {
                    "field": "",
                    "title": "Kajian",
                    "width": "100px"
                },
                {
                    "field": "",
                    "title": "Usulan",
                    "width": "100px"
                },
                {
                    "field": "",
                    "title": "Ruangan Tujuan",
                    "width": "100px"
                },
                {
                    "field": "",
                    "title": "Status",
                    "width": "100px"
                }
                
            ];


            $scope.navToKoreksi = function (selectedData) {
                console.log(JSON.stringify(selectedData.id));
                debugger;
                $state.go('Koreksi', {
                    id: selectedData.id
                });


                console.log(selectedData.id)
            };



            $scope.detailUsulan = function (selectedData) {
                debugger
                console.log(JSON.stringify($scope.daftarEvaluasi._data))
                if (selectedData != undefined)
                    $scope.showDetailUsulan = true;

                ManageSarpras.getOrderList("kajian-evaluasi/find-all/?noUsulan=" + selectedData.kajianEvaluasi.noUsulan).then(function (dat) {
                    var arrDetail = dat.data.data[0].detailKajianSet;
                    var arrDet = [];
                    var i = 0;
                    arrDetail.forEach(function (data) {
                        if (parseInt(data.tujuan.kdJabatan, 10) != $scope.idJabatanSelected) {
                            arrDet[i] = data;
                            i++;
                        }

                    })

                    $scope.detailEvaluasi = new kendo.data.DataSource({
                        data: arrDet,
                        scrollable: true
                    });
                    // console.log(JSON.stringify($scope.daftarEvaluasi.options));
                    // // debugger;
                    // for (var i = $scope.daftarEvaluasi.options.data.length - 1; i >= 0; i--) {
                    //     var date = new Date($scope.daftarEvaluasi.options.data[i].tglUsulan);
                    //     $scope.daftarEvaluasi.options.data[i].tglUsulan = DateHelper.getTanggalFormatted(date);
                    // }
                    // debugger;
                });

                $scope.item.noUsulan = selectedData.kajianEvaluasi.noUsulan;

            }

            $scope.hapus = function () {
                console.log(JSON.stringify($scope.daftarEvaluasi._data));
                var idUsulan = [];
                var i = 0;
                $scope.daftarEvaluasi._data.forEach(function (data) {


                    if (data.check == true) {
                        var dat =
                            {
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
                            var dat =
                                {
                                    "id": data.id,
                                    "statusUsulan": "Verifikasi"
                                }

                            idUsulan[i] = dat;
                            i++;
                        }
                    } else {
                        if (data.check == true) {
                            var dat =
                                {
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

            $scope.columnDetailEvaluasi = [

                {
                    "field": "tujuan.namaJabatan",
                    "title": "Tujuan Lain",
                    "width": "100px"
                },
                {
                    "field": "koreksi",
                    "title": "Koreksi",
                    "width": "100px"
                },
                {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width": "100px"
                }
            ];

        }
    ]);
});