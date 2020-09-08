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
            $scope.dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));

            let getDataHistory = function () {
                $scope.isRouteLoading = true;
                let tempData = [];
                ManageSdmNew.getListData('sdm/get-histori-presensi-pegawai?idPegawai=' + $scope.dataPegawaiLogin.id).then((res) => {
                    if (res.data.data.data) {
                        for (let i = 0; i < res.data.data.data.length; i++) {
                            tempData.push({
                                jam: res.data.data.data[i]
                            });
                        }
                    }
                    $scope.dataHistoriPresensi = new kendo.data.DataSource({
                        data: tempData,
                        pageSize: 100,
                        total: tempData.length
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

                $scope.tanggalPresensi = new Date();
                getDataHistory();
                ManageSdmNew.getListData('sdm/get-jadwal-pegawai?idPegawai=' + $scope.dataPegawaiLogin.id).then((res) => {
                    $scope.data = res.data.data;
                });
            }

            init();

            $scope.columnGrid = [{
                "field": "jam",
                "title": "<h3>Jam</h3>",
                "width": "150px"
            }];

            $scope.optHistoryPresensi = {
                pageable: true,
                scrollable: true,
                columns: $scope.columnGrid
            }

            $scope.savePresensi = function () {
                $.get('http://www.geoplugin.net/json.gp', function (data) {
                    $scope.dataDevice = JSON.parse(data);
                });

                getLocation();

                let data = {
                    pegawai: {
                        id: $scope.dataPegawaiLogin.id
                    },
                    processtatus: $scope.data.isWFH ? 1 : 0,
                    ip_addr: $scope.dataDevice.geoplugin_request,
                    latitude: $scope.latitude,
                    longitude: $scope.longitude,
                    akurasi: $scope.akurasi
                }
                ManageSdmNew.saveData(data, 'sdm/save-presensi-pegawai/').then((res) => {
                    getDataHistory();
                })
            }

            var x = document.getElementById("map");
            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else {
                    x.innerHTML = "Geolocation is not supported by this browser.";
                }
            }

            function showPosition(position) {
                $scope.latitude = position.coords.latitude;
                $scope.longitude = position.coords.longitude;
                $scope.akurasi = position.coords.accuracy;
                var latMin = Math.floor(getDecimal(Math.abs(position.coords.latitude)) * 60);
                var latSec = getDecimal(getDecimal(Math.abs(position.coords.latitude)) * 60) * 60;
                var longMin = Math.floor(getDecimal(Math.abs(position.coords.longitude)) * 60);
                var longSec = getDecimal(getDecimal(Math.abs(position.coords.longitude)) * 60) * 60;

                if (position.coords.latitude < 0 && position.coords.longitude < 0) {
                    x.innerHTML = "Lintang: " + Math.floor(Math.abs(position.coords.latitude)) + "&#176;" + latMin + "&#8242;" + latSec.toFixed(2) + "&#8243;LS" +
                        ", Bujur: " + Math.floor(Math.abs(position.coords.longitude)) + "&#176;" + longMin + "&#8242;" + longSec.toFixed(2) + "&#8243;BB" +
                        ", Akurasi: " + position.coords.accuracy + " meter";
                } else if (position.coords.latitude > 0 && position.coords.longitude > 0) {
                    x.innerHTML = "Lintang: " + Math.floor(Math.abs(position.coords.latitude)) + "&#176;" + latMin + "&#8242;" + latSec.toFixed(2) + "&#8243;LU" +
                        ", Bujur: " + Math.floor(Math.abs(position.coords.longitude)) + "&#176;" + longMin + "&#8242;" + longSec.toFixed(2) + "&#8243;BT" +
                        ", Akurasi: " + position.coords.accuracy + " meter";
                } else if (position.coords.latitude < 0 && position.coords.longitude > 0) {
                    x.innerHTML = "Lintang: " + Math.floor(Math.abs(position.coords.latitude)) + "&#176;" + latMin + "&#8242;" + latSec.toFixed(2) + "&#8243;LS" +
                        ", Bujur: " + Math.floor(Math.abs(position.coords.longitude)) + "&#176;" + longMin + "&#8242;" + longSec.toFixed(2) + "&#8243;BT" +
                        ", Akurasi: " + position.coords.accuracy + " meter";
                } else if (position.coords.latitude > 0 && position.coords.longitude < 0) {
                    x.innerHTML = "Lintang: " + Math.floor(Math.abs(position.coords.latitude)) + "&#176;" + latMin + "&#8242;" + latSec.toFixed(2) + "&#8243;LU" +
                        ", Bujur: " + Math.floor(Math.abs(position.coords.longitude)) + "&#176;" + longMin + "&#8242;" + longSec.toFixed(2) + "&#8243;BB" +
                        ", Akurasi: " + position.coords.accuracy + " meter";
                }
            }

            function getDecimal(n) {
                return (n - Math.floor(n));
            }
        }
    ]);
});