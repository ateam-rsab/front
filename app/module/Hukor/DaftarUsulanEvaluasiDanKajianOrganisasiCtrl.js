define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarUsulanEvaluasiDanKajianOrganisasiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state', 'ManageSarpras',
        function ($rootScope, $scope, ModelItem, DateHelper, $state, ManageSarpras) {

            ModelItem.get("Hukor/DaftarUsulanEvaluasiDanKajianOrganisasi").then(function (data) {
                $scope.item = data;
                $scope.item.periodeAwal = new Date();
                $scope.item.periodeAkhir = new Date();
                $scope.showDetailUsulan = false;
                $scope.now = new Date();
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) { });
            $scope.item = {
                "periodeAwal": new Date(),
                "periodeAkhir": new Date()
            }

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
                var url = "dateStart=" + awal + "&dateEnd=" + akhir;
                ManageSarpras.getOrderList("kajian-evaluasi/find-all/?" + url).then(function (dat) {
                    $scope.daftarEvaluasi = new kendo.data.DataSource({
                        data: dat.data.data,
                        scrollable: true
                    });
                    console.log(JSON.stringify($scope.daftarEvaluasi.options));
                    // debugger;
                    for (var i = $scope.daftarEvaluasi.options.data.length - 1; i >= 0; i--) {
                        var date = new Date($scope.daftarEvaluasi.options.data[i].tglUsulan);
                        $scope.daftarEvaluasi.options.data[i].tglUsulan = DateHelper.getTanggalFormatted(date);
                    }
                    // debugger;
                });
            }
            $scope.cariTanggal();

            $scope.pegOptions = {
                dataTextField: "noUsulan",
                dataValueField: "noUsulan",
            }

            // ManageSarpras.getListData("KajianEvaluasi&select=noUsulan").then(function success(dat) {
            //     $scope.dataNoUsulan = dat.data;

            // }, function error(error) {
            //     console.log(error);
            // });

            $scope.cariNoUsulan = function () {
                console.log($scope.item.cariNoUsulan);
                ManageSarpras.getOrderList("kajian-evaluasi/find-all/?noUsulan=" + $scope.item.cariNoUsulan[0].noUsulan).then(function (dat) {
                    $scope.daftarEvaluasi = new kendo.data.DataSource({
                        data: dat.data.data,
                        scrollable: true
                    });
                    console.log(JSON.stringify($scope.daftarEvaluasi.options));
                    // debugger;
                    for (var i = $scope.daftarEvaluasi.options.data.length - 1; i >= 0; i--) {
                        var date = new Date($scope.daftarEvaluasi.options.data[i].tglUsulan);
                        $scope.daftarEvaluasi.options.data[i].tglUsulan = DateHelper.getTanggalFormatted(date);
                    }
                    // debugger;
                });
            }

            $scope.tutup = function () {
                debugger;
                console.log(JSON.stringify($scope.daftarEvaluasi))
            }

            $scope.generateTemplate = function (detailKajianSet) {
                debugger;
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



            $scope.navToKoreksi = function () {
                console.log("Asdsd")
                $state.go('Koreksi', {
                    // id: selectedData.id

                });
                // console.log(selectedData.id)
            };



            $scope.detailUsulan = function (selectedData) {
                debugger
                console.log(JSON.stringify($scope.daftarEvaluasi._data))
                if (selectedData != undefined)
                    $scope.showDetailUsulan = true;

                $scope.item.noUsulan = selectedData.noUsulan;
                $scope.detailEvaluasi = new kendo.data.DataSource({
                    data: selectedData.detailKajianSet,
                    scrollable: true
                });
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

            $scope.columnDetailEvaluasi = [

                {
                    "field": "tujuan.namaJabatan",
                    "title": "Tujuan",
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