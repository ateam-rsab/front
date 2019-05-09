define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PencarianPasienPenunjangCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien) {
            $scope.title = "ini page pencarian pasien";
            $scope.isHide = true;
            if ($state.current.name === 'dashboardpasien.pencarianPasienPenunjang' || $state.current.name === 'registrasiPasienLamaPenunjang.find' | $state.current.name === 'triageFind' || $state.current.name === 'GawatDaruratFind' || $state.current.name === 'dashboardpasien.InformasiIbu.findPasien') {
                $scope.isHide = false;
            }
            $scope.$on("kendoWidgetCreated", function(event, widget) {
                if (widget === $scope.grid) {
                    if ($scope.isHide === false) {
                        $scope.grid.element.on('dblclick', function(e) {
                            debugger;
                            if ($state.current.name === 'dashboardpasien.pencarianPasienPenunjang') {
                                window.noCm = $scope.data.noCm;
                                $state.go('dashboardpasien.pasien', {
                                    noCM: $scope.data.noCm
                                })
                            } else if ($state.current.name === 'GawatDaruratFind') {
                                window.noCm = $scope.data.noCm;
                                $state.go('GawatDaruratDetail', {
                                    noRec: $state.params.noRec,
                                    noCm: $scope.data.noCm
                                })
                            } else if ($state.current.name === 'triageFind') {
                                window.noCm = $scope.data.noCm;
                                $state.go('InputTriage', {
                                    noRec: $state.params.noRec,
                                    noCm: $scope.data.noCm,
                                    state: 8
                                })
                            } else if ($state.current.name === 'dashboardpasien.InformasiIbu.findPasien') {
                                $rootScope.tempPasien = $scope.data;
                                $state.go('dashboardpasien.InformasiIbu', {
                                    noCM: $scope.noCM,
                                    tanggal: $state.params.tanggal,
                                    noRec: $state.params.noRec,
                                    noCmIbu: $rootScope.tempPasien.noCm
                                });
                            } else
                                $state.go('registrasiPasienLamaPenunjang', {
                                    noCm: $scope.data.noCm
                                })
                        });
                    }
                }
            });
            $scope.dataVOloaded = false;
            $scope.data = "heloo";
            $scope.now = new Date();
            $scope.namaIbuKandug = "";
            $scope.namaPasien = "";
            $scope.tgllahir = undefined;
            $scope.from = undefined;
            $scope.noCm = "";
            $scope.until = undefined;
            $scope.Column = [{
                field: "noCm",
                title: ModelItem.translate("noRekamMedis", 1),
                width: 240
            }, {
                field: "namaLengkap",
                title: ModelItem.translate("NamaPasien", 1),
                width: 240
            }, {
                field: "namaIbu",
                title: ModelItem.translate("NamaIbuKandung", 1),
                width: 240
            }, {
                field: "tglLahir",
                title: ModelItem.translate("tanggalLahir", 1),
                width: 240,
                template: "#= new moment(new Date(tglLahir)).format('DD-MM-YYYY') #"
            }];
            $scope.mainGridOptions = {
                dataBound: function() {}
            };
            $scope.Page = {
                refresh: true,
                pageSizes: false,
                buttonCount: 5
            }
            $scope.find = function() {
                debugger;
                findPasien.getDataPasien($scope.namaIbuKandug, $scope.noCm, $scope.tgllahir, $scope.from, $scope.until).then(function(e) {
                    $scope.listDataPekerjaan = ModelItem.beforePost(e.data.data.listData);

                });
            }
            // $scope.find();
            $scope.$watch('noCm', function() {


                $rootScope.doneLoad = false;
                $scope.dataVOloaded = true;

            });
            $scope.select = function(a, b, c, d) {}
            $scope.selectPasien = function(a, b, c, d) {

            };
            $scope.registrasiPelayanan = function() {
                $state.go('registrasiPelayanan', {
                    noCm: $scope.data.noCm
                })
            }
            $scope.registrasiPasien = function() {
                $state.go('registrasiPasienBaru')
            }
            $scope.detailPasien = function() {
                $state.go('registrasiPasienEdit', {
                    noCm: $scope.data.noCm
                })
            }
        }
    ]);
});