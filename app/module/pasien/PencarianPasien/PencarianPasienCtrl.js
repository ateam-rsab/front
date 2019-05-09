define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PencarianPasienCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, dateHelper) {
            $scope.title = "ini page pencarian pasien";
            $scope.isHide = true;
            if ($state.current.name === 'dashboardpasien.pencarianPasien' || $state.current.name === 'registrasiPelayanan.find' | $state.current.name === 'triageFind' || $state.current.name === 'GawatDaruratFind' || $state.current.name === 'dashboardpasien.InformasiIbu.findPasien') {
                $scope.isHide = false;
            }
            
            $scope.$on("kendoWidgetCreated", function(event, widget) {

                if (widget === $scope.grid) {
                    if ($scope.isHide === false) {
                        $scope.grid.element.on('dblclick', function(e) {
                            if ($state.current.name === 'dashboardpasien.pencarianPasien') {
                                window.noCm = $scope.data.noCm;
                                $state.go('dashboardpasien.pasien', {
                                    noCM: $scope.data.noCm
                                })
                            } else if ($state.current.name === 'GawatDaruratFind') {
                                window.noCm = $scope.data.noCm;
                                $state.go('GawatDaruratDetail', {
                                    noRec: $state.params.noRec,
                                    noRecIGD:  $state.params.noRecIGD,
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
                                $state.go('registrasiPelayanan', {
                                    noCm: $scope.data.noCm
                                })
                        });
                    }
                }
            });
            $scope.dataVOloaded = false;
            $scope.data = "heloo";
            $scope.now = new Date();
            $scope.item = {
                from: $scope.now,
                until: $scope.now
            }
            // $scope.namaIbuKandug = "";
            // $scope.namaPasien = "";
            // $scope.tgllahir = undefined;
            // $scope.from = undefined;
            // $scope.noCm = "";
            // $scope.until = undefined;
            $scope.Column = [{
                field: "noCm",
                title: ModelItem.translate("noRekamMedis", 1),
                width: 240
            }, {
                field: "namaLengkap",
                title: ModelItem.translate("NamaPasien", 1),
                width: 240
            }, {
                field: "namaAyah",
                title: ModelItem.translate("NamaAyahKandung", 1),
                width: 240
            }, {
                field: "tglLahir",
                title: ModelItem.translate("tanggalLahir", 1),
                width: 240,
                template: "#= (data.tglLahir) ? kendo.toString(tglLahir, 'dd-MM-yyyy') : '' #"
            }];
            $scope.mainGridOptions = {
                dataBound: function() {}
            };
            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
            $scope.find = function() {
                $scope.isRouteLoading = true;
                var namaAyah = $scope.item.namaAyahKandug, nomorCm = $scope.item.noCm, tanggalLahir = $scope.item.tglLahir, from = $scope.item.from, until = $scope.item.until;
                if (!namaAyah) namaAyah = "";
                if (!nomorCm) nomorCm = "";
                if (!tanggalLahir) {
                    tanggalLahir = "";
                } else {
                    tanggalLahir = dateHelper.formatDate($scope.item.tglLahir, 'YYYY-MM-DD');
                }
                if (namaAyah || nomorCm || tanggalLahir) {
                    from = '';
                    until = '';
                }
                findPasien.getDataPasien(namaAyah, nomorCm, tanggalLahir, from, until).then(function(e) {
                    $scope.listPasien = ModelItem.beforePost(e.data.data.listData);
                }).then(function(){
                    $scope.isRouteLoading = false;
                }) ;
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