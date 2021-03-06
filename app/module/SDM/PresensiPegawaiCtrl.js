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
            $scope.isNotEditable = false;
            $scope.dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));

            let getDataHistory = function () {
                $scope.isRouteLoading = true;
                let tempData = [];
                ManageSdmNew.getListData('sdm/get-histori-presensi-pegawai?idPegawai=' + $scope.dataPegawaiLogin.id).then((res) => {
                    if (res.data.data) {
                        for (let i = 0; i < res.data.data.length; i++) {
                            tempData.push({
                                jam: res.data.data[i].tr_time,
                                statusPresensi: res.data.data[i].processtatus,
                                statusInternet: res.data.data[i].ip_addr
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
                    // $('#date-part').html(momentNow.format('YYYY MMMM DD') + ' ' + momentNow.format('dddd').substring(0, 3).toUpperCase());
                    $('#date-part').html(DateHelper.getTanggalFormatted(momentNow.toDate()));
                    $('#time-part').html(momentNow.format('HH:mm:ss'));
                }, 100);

                $scope.tanggalPresensi = new Date();
                getDataHistory();
                ManageSdmNew.getListData('sdm/get-jadwal-pegawai?idPegawai=' + $scope.dataPegawaiLogin.id).then((res) => {
                    $scope.data = res.data.data;
                    checkEditableWFH()
                });

                $scope.ip = getIPAddr();
                var listProviders = ['43.225.67.209', '103.116.203.81', '103.116.203.82', '103.116.203.83', '103.116.203.84', '103.116.203.85', '103.116.203.86', '103.116.203.87', '103.116.203.88', '103.116.203.89', '103.116.203.90', '103.116.203.91', '103.116.203.92', '103.116.203.93', '103.116.203.94', '103.116.203.95', '103.247.219.149']
                if (listProviders.includes($scope.ip)) {
                    $scope.strJenisJaringan = "Jaringan Internet RSAB"
                    $scope.isRSABNet = true
                } else {
                    $scope.strJenisJaringan = "Bukan Jaringan Internet RSAB"
                    $scope.isRSABNet = false
                }
            }

            init();

            $scope.columnGrid = [
                {
                    "field": "jam",
                    "title": "<h3>Jam</h3>",
                    "width": "30px",
                    attributes: { style: "text-align:center" }
                }, {
                    "field": "statusPresensi",
                    "title": "<h3>Status<br/>Presensi</h3>",
                    "width": "20px",
                    attributes: { style: "text-align:center" }
                }, {
                    "field": "statusInternet",
                    "title": "<h3>Status Internet</h3>",
                    "width": "100px"
                }
            ];

            $scope.optHistoryPresensi = {
                pageable: true,
                scrollable: true,
                columns: $scope.columnGrid
            }

            function getIPAddr() {
                let dataIP = null;
                let http = new XMLHttpRequest();

                http.onreadystatechange = () => {
                    console.log(http.readyState, http.status, http.statusText);
                    if(http.status === 0 && http.readyState === 1) {
                        toastr.info("Jaringan anda bermasalah");
                    }
                    if (http.readyState == 4 && http.status === 200) {
                        dataIP = JSON.parse(http.responseText);
                    }
                    
                }

                http.open("GET", "http://www.geoplugin.net/json.gp", false);
                http.send();

                return dataIP.geoplugin_request;
            }

            // $.get('http://www.geoplugin.net/json.gp', function (req) {
            //     $scope.dataDevice = JSON.parse(req);
            //     var listProviders = ['43.225.67.209', '103.116.203.81', '103.116.203.82', '103.116.203.83', '103.116.203.84', '103.116.203.85', '103.116.203.86', '103.116.203.87', '103.116.203.88', '103.116.203.89', '103.116.203.90', '103.116.203.91', '103.116.203.92', '103.116.203.93', '103.116.203.94', '103.116.203.95', '103.247.219.149']
            //     if (listProviders.includes($scope.dataDevice.geoplugin_request)) {
            //         $scope.strJenisJaringan = "Jaringan Internet RSAB"
            //     } else {
            //         $scope.strJenisJaringan = "Bukan Jaringan Internet RSAB"
            //     }
            //     for (let index = 0; index < listProviders.length; index++) {
            //         if (listProviders[index] == $scope.dataDevice.geoplugin_request) {
            //             $scope.strJenisJaringan = "Jaringan Internet RSAB"
            //             break
            //         }
            //     }
            //     if (!$scope.strJenisJaringan) {
            //         $scope.strJenisJaringan = "Bukan Jaringan Internet RSAB"
            //     }
            // });

            $scope.savePresensi = function () {
                getLocation();

                $scope.isRouteLoading = true;
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
                    assignToNotEditable()
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

            function checkEditableWFH() {
                if ($scope.data && $scope.dataHistoriPresensi.options.data) {
                    if ($scope.data.jadwal !== "-"
                        && !$scope.data.jadwal.contains("Malam")
                        && $scope.dataHistoriPresensi.options.data.length > 0) {
                        $scope.isNotEditable = true
                    }
                }
            }

            function assignToNotEditable() {
                if ($scope.data) {
                    if ($scope.data.jadwal !== "-"
                        && !$scope.data.jadwal.contains("Malam")) {
                        $scope.isNotEditable = true
                    }
                }
            }
        }
    ]);
});