define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaboratoriumDaftarHistoryPasienCtrl', [ '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienLaboratorium', 'DateHelper',

        function($rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienLaboratorium, dateHelper) {
            $scope.now = new Date();
            $scope.namaPasienDevice = "";
            $scope.selected = {};
            $scope.selectedData = function(data) {

                $scope.selected = data;
            };
            $scope.isShowDetail = false;
            $scope.showDetail = function() {
                $scope.isShowDetail = !$scope.isShowDetail;
            }
            $scope.refresh = function() {
                findPasienLaboratorium.getHistoryPatient($state.params.noRec).then(function(e) {
                    var data = [];
                    for (var key in e.data.data) {
                        if (e.data.data.hasOwnProperty(key)) {
                            var element = e.data.data[key];
                            if (element.strukOrder.pegawaiOrder === undefined)
                                element.strukOrder.pegawaiOrder = {
                                    namaExternal: 'Belum ada dokter'
                                }
                        }
                    }

                    for (var key in e.data) {
                        if (e.data.hasOwnProperty(key)) {
                            var element = e.data[key];
                            if (element.statusAntrian === "0") {
                                element.myStyle = { 'background-color': '#FFFC38' };
                                element.statusAntrian = "Menunggu";
                            } else if (element.statusAntrian === "1") {
                                element.myStyle = { 'background-color': '#33e46a' };
                                element.statusAntrian = "Check in";
                            } else if (element.statusAntrian === "6") {
                                element.myStyle = { 'background-color': '#89c9f7' };
                                element.statusAntrian = "Hasil di Ambil";
                            } else if (element.statusAntrian === "4") {
                                element.myStyle = { 'background-color': '#FF8DFC' }
                                element.statusAntrian = "Menunggu Periksa";
                            } else if (element.statusAntrian === "5") {
                                element.myStyle = { 'background-color': '#1da214' };
                                element.statusAntrian = "Selesai Periksa";
                            } else if (element.statusAntrian === "10") {
                                element.myStyle = { 'background-color': '#FF3BAD' };
                                element.statusAntrian = "Sample di Terima";
                            } else if (element.statusAntrian === "9") {
                                element.myStyle = { 'background-color': '#FF7E3B' };
                                element.statusAntrian = "Sample di Ambil";
                            } else if (element.statusAntrian === "14") {
                                element.myStyle = { 'background-color':'#89c9f7' };// #'#f6a8ff' };
                                element.statusAntrian = "Release Analis";
                            } else if (element.statusAntrian === "12") {
                                element.myStyle = { 'background-color': '#f6a8ff' };
                                element.statusAntrian = "Release Dokter";
                            } else {
                                element.myStyle = { 'background-color': '#f6a8ff' };
                                element.statusAntrian = "Belum ada hasil";
                            }
                            data.push(element);
                        }
                    }
                    data = _.sortBy(data, function(e) {
                        if (e.strukOrder.noOrderIntern == undefined)
                            return 100000;
                        return -1 * parseInt(e.strukOrder.noOrderIntern.substring(1));
                    });
                    $scope.listDataPasien =
                        new kendo.data.DataSource({
                            data: data
                        });
                });

            }
            $scope.loadPacs = true;
            $scope.findDataPacs = function() {
                $scope.loadPacs = false;
                findPasienLaboratorium.findPasienDevice($scope.namaPasienDevice).then(function(e) {
                    var data = e.data;
                    $scope.loadPacs = true;
                    $scope.listPacs = data;
                });
            }
            $scope.refresh();
            $scope.MasukanHasil = function() {
                //if ($scope.item.statusAntrian === 'Release Dokter' || $scope.item.statusAntrian === 'Selesai Periksa') {
                    $state.go('DashboardLaboratoriumCtrlLihatHasil', {
                        noRegistrasi: $scope.item.pasienDaftar.noRec,
                        noOrder: $scope.item.strukOrder.noOrder,
                        noAntrianPasien: $scope.item.noRec
                    })

                    
               // } else {
                 //   window.messageContainer.log('Belum ada hasil')
               // }

            }
            $scope.editPermintaan = function() {
                debugger;
                var obj = {};
                obj = ModelItem.CopyObject(obj, $state.params);
                obj.noOrderRec = $scope.item.strukOrder.noRec
                $state.go('dashboardpasien.PengkajianMedis.Rencana.Order.LaboratoriumEdit', obj);
            }

            $scope.SimpanInternal = function() {
                manageLaboratorium.saveInternalMessage($scope.item.strukOrder);
            }
            $scope.Column = [{
                field: "strukOrder.noOrderIntern",
                title: ModelItem.translate("No Pemesanan", 1)
            }, {
                "field": "strukOrder.tglOrder",
                "title": "Tanggal Pemesanan",
                template: "#= new moment(new Date(pasienDaftar.tglRegistrasi)).format('DD-MM-YYYY') #"
            }, {
                "field": "asalRujukan.asalRujukan",
                "title": "Asal Rujukan"
            }, {
                "field": "statusAntrian",
                "title": "Status"
            }];
        }
    ]);
});