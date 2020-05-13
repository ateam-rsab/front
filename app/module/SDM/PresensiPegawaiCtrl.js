define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PresensiPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'ManageSdmNew', 'DateHelper', '$mdDialog', 'CetakHelper',
        '$state', 'ManageSarprasPhp', '$timeout',
        function ($q, $rootScope, $scope, ModelItem, ManageSdm, ManageSdmNew, DateHelper, $mdDialog, cetakHelper, $state, manageSarprasPhp, $timeout) {
            $scope.data = {};
            $scope.now = new Date();
            $scope.dataDevice = {};
            $scope.time = "";
            $scope.isRouteLoading = false;
            $scope.data.isWFH = true;
            let dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));

            let getDataHistory = function () {
                $scope.isRouteLoading = true;
                let tempData = [];
                ManageSdmNew.getListData('sdm/get-histori-presensi-pegawai').then((res) => {
                    if (res.data.data.data) {
                        for (let i = 0; i < res.data.data.data.length; i++) {
                            tempData.push({
                                jam: res.data.data.data[i]
                            });
                        }
                    }
                    $scope.dataHistoriPresensi = new kendo.data.DataSource({
                        data: tempData
                    });
                    $scope.isRouteLoading = false;
                });
            }

            let init = function () {
                var interval = setInterval(function () {
                    var momentNow = moment();
                    $('#date-part').html(momentNow.format('YYYY MMMM DD') + ' ' + momentNow.format('dddd').substring(0, 3).toUpperCase());
                    $('#time-part').html(momentNow.format('HH:mm:ss'));
                }, 100);

                $.get('http://www.geoplugin.net/json.gp', function (data) {
                    $scope.dataDevice = JSON.parse(data);
                });

                $scope.tanggalPresensi = new Date();
                getDataHistory();
                ManageSdmNew.getListData('sdm/get-jadwal-pegawai').then((res) => {
                    $scope.data = res.data.data;
                });


            }

            init();

            $scope.columnGrid = [{
                    "field": "jam",
                    "title": "<h3>Jam</h3>",
                    "width": "150px"
                },

            ];

            $scope.optHistoryPresensi = {
                pageable: true,
                scrollable: true,
                columns: $scope.columnGrid
            }

            $scope.savePresensi = function () {
                let data = {
                    // tr_date: DateHelper.toTimeStamp(new Date()),
                    // tr_time: DateHelper.toTimeStamp(new Date()),
                    empl_code: $scope.data.idFinger,
                    processtatus: $scope.data.isWFH ? 1 : 0,
                    ip_addr: $scope.dataDevice.geoplugin_request
                }
                console.log(data);
                ManageSdmNew.saveData(data, 'sdm/save-presensi-pegawai/').then((res) => {
                    getDataHistory();
                })
            }


        }
    ]);
});