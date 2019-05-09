define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarProperLingkunganCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state', 'ManageSarpras',
        function ($rootScope, $scope, ModelItem, DateHelper, $state, ManageSarpras) {

            ModelItem.get("Kesling/DaftarProperLingkungan").then(function (data) {
                $scope.item = data;
                $scope.item.periodeAwal = new Date();
                $scope.item.periodeAkhir = new Date();
                $scope.showDetailUsulan = false;
                $scope.now = new Date();
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});
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

            $scope.listProper = new kendo.data.DataSource({
                data: [

                ],
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            kriteriaProper: {
                                editable: true,
                                nullable: false,
                                validation: {
                                    required: true
                                }
                            },
                            aspekPenilaian: {
                                editable: true,
                                nullable: false,
                                validation: {
                                    required: true
                                }
                            },
                            elemenPenilaian: {
                                editable: true,
                                nullable: false,
                                validation: {
                                    required: true
                                }
                            },
                            Keterangan: {
                                editable: true,
                                nullable: false,
                                validation: {
                                    required: true
                                }
                            },

                        }
                    }
                },
                editable: false
            });

            $scope.columnProper = [{
                "field": "kriteriaProper",
                "title": "<center>Kriteria Proper</center>",
                "width": "150px"
            }, {
                "field": "aspekPenilaian",
                "title": "<center>Aspek Penilaian</center>",
                "width": "150px"
            }, {
                "field": "elemenPenilaian",
                "title": "<center>Elemen Penilaian</center>",
                "width": "150px"
            }, {
                "title": "<center>Ya</center>",
                "template": "<div class='center'><input type=\"radio\" ng-model='val' value=2 ng-click='klik(dataItem,val)'></div>",
                "width": "150px"
            }, {
                "title": "<center>tidak</center>",
                "template": "<div class='center'><input type=\"radio\" ng-model='val' value=1 ng-click='klik(dataItem,val)'></div>",
                "width": "150px"
            }, {
                "field": "Keterangan",
                "title": "<center>Keterangan</center>",
                "width": "150px"
            }];

            $scope.optionsProper = {
                dataSource: $scope.listProper,
                pageable: false,
                editable: {
                    mode: "inline",
                    // template: kendo.template($("#popup-editor").html())
                },
                columns: $scope.columnB3
            };



            $scope.tutup = function () {
                debugger;
                console.log(JSON.stringify($scope.daftarEvaluasi))
            }

            $scope.hapus = function () {

            }

            //davis was here
        }
    ]);
});