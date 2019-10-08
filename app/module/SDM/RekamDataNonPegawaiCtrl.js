define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekamDataNonPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', 'ManageSarprasPhp', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, FindPegawai, FindSdm, $timeout, manageSarprasPhp, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.listJenisKelamin = [
                {
                    id: 1,
                    jenisKelamin: 'Laki - laki',
                },
                {
                    id: 1,
                    jenisKelamin: 'Perempuan',
                },
            ];



            $scope.init = function () {
                ManageSdm.getOrderList("service/list-generic/?view=Agama&select=*", true).then(res => {
                    $scope.ListAgama = res.data
                });
                ManageSdm.getOrderList("service/list-generic/?view=Negara&select=id,namaNegara&criteria=statusEnabled&values=true&order=namaNegara:asc", true).then(res => {
                    $scope.listOfNegara = res.data;
                });
                ManageSdm.getOrderList("service/list-generic/?view=Suku&select=id,suku&criteria=statusEnabled&values=true&order=suku:asc", true).then(res => {
                    $scope.ListSuku = res.data;
                });

                ManageSdm.getOrderList("service/list-generic/?view=StatusPerkawinan&select=id,statusPerkawinan&criteria=statusEnabled&values=true&order=statusPerkawinan:asc", true).then(res => {
                    var tempStatusKawin = res.data;
                    $scope.ListStatusKawin = [];
                    tempStatusKawin.forEach(function (el) {
                        if (el.statusPerkawinan !== '-') {
                            var dataTemp = {
                                id: el.id,
                                statusPerkawinan: el.statusPerkawinan
                            }
                            $scope.ListStatusKawin.push(dataTemp);
                        }                        
                    });
                });
                if ($state.params.idPegawai) {
                    ManageSdmNew.getListData("pegawai/get-pegawai-detail-by-customs/" + $state.params.idPegawai).then(res => {
                        $scope.item = res.data.data;
                    });
                }
            }
            $scope.init();

            $scope.save = function() {
                toastr.info('Dummy Sukses');
            }

            $scope.back = function() {
                window.history.back();
            }

        }
    ]);
});