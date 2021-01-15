define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PresensiPegawaiNewCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'ManageSdmNew', 'DateHelper', '$mdDialog', 'CetakHelper',
        '$state', 'ManageSarprasPhp', '$timeout',
        function ($q, $rootScope, $scope, ModelItem, ManageSdm, ManageSdmNew, DateHelper, $mdDialog, cetakHelper, $state, manageSarprasPhp, $timeout) {
            $scope.data = {};
            $scope.now = new Date();
            $scope.dataDevice = {};
            $scope.time = "";
            $scope.isRouteLoading = false;
            $scope.data.isWFH = true;
            $scope.isDisblePresensi = true;
            $scope.dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));
            $scope.userLocation = {};

            let canvas = document.getElementById('canvas');
            let context = canvas.getContext('2d');
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
                        pageSize: 50,
                        total: tempData.length
                    });
                    $scope.isRouteLoading = false;
                });
            }

            $scope.showImageCapture = () => {
                context.drawImage(video, 0, 0, 400, 350);
                $scope.canvasDataURL = canvas.toDataURL().replace("image/png", "image/jpg");
                // console.log(imageDataURL);
                $scope.isDisblePresensi = false;
            }

            function getDecimal(n) {
                return (n - Math.floor(n));
            }

            let init = function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        $scope.userLocation.lat = position.coords.latitude;
                        $scope.userLocation.lng = position.coords.longitude;
                        $scope.userLocation.akurasi = position.coords.accuracy;
                        $scope.userLocation.latMin = Math.floor(getDecimal(Math.abs(position.coords.latitude)) * 60);
                        $scope.userLocation.latSec = getDecimal(getDecimal(Math.abs(position.coords.latitude)) * 60) * 60;
                        $scope.userLocation.longMin = Math.floor(getDecimal(Math.abs(position.coords.longitude)) * 60);
                        $scope.userLocation.longSec = getDecimal(getDecimal(Math.abs(position.coords.longitude)) * 60) * 60;

                        let koordinatViewMap = [$scope.userLocation.lat, $scope.userLocation.lng];
                        let mymap = L.map('mapid').setView(koordinatViewMap, 13);

                        L.marker(koordinatViewMap).addTo(mymap);

                        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHJlZmVscmVyZSIsImEiOiJja2V1bmFzNmUyemVsMnNtcWRhbnMwbXR1In0.1ZJDyJLNvi2QrCs4X7wZqQ', {
                            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                            maxZoom: 18,
                            id: 'mapbox/streets-v11',
                            tileSize: 512,
                            zoomOffset: -1,
                            accessToken: 'pk.eyJ1IjoiaHJlZmVscmVyZSIsImEiOiJja2V1bmFzNmUyemVsMnNtcWRhbnMwbXR1In0.1ZJDyJLNvi2QrCs4X7wZqQ'
                        }).addTo(mymap);

                        let areaHarkit = [
                            [-6.184190, 106.797235],
                            [-6.1861155, 106.801147]
                        ];

                        L.circle([$scope.userLocation.lat, $scope.userLocation.lng], {
                            color: "#87ceeb",
                            fillColor: "#87ceeb",
                            fillOpacity: 0.5,
                            radius: $scope.userLocation.akurasi
                        }).addTo(mymap);

                        L.rectangle(areaHarkit, {
                            color: 'green',
                            fillColor: '#7ea04d',
                            fillOpacity: 0.5,
                            // radius: 500
                        }).addTo(mymap);
                    });
                } else {
                    alert("Geolocation not supported");
                }

                let video = document.getElementById('video');

                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({
                        video: true
                    }).then((stream) => {
                        video.srcObject = stream;
                        video.play();
                    })
                }

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

            function getIPAddr() {
                let dataIP = null;
                let http = new XMLHttpRequest();

                http.onreadystatechange = () => {
                    if (http.readyState == 4 && http.status === 200) {
                        dataIP = http.responseText;
                    }
                }
                http.open("GET", "https://api.ipify.org", false);
                http.send();

                return dataIP;
            }

            $scope.savePresensi = function () {
                // let ip = getIPAddr();

                $scope.isRouteLoading = true;
                let data = {
                    pegawai: {
                        id: $scope.dataPegawaiLogin.id
                    },
                    processtatus: $scope.data.isWFH ? 1 : 0,
                    ip_addr: $scope.ip,
                    latitude: $scope.userLocation.lat,
                    longitude: $scope.userLocation.lng,
                    akurasi: $scope.userLocation.akurasi,
                    imageURLData: $scope.canvasDataURL
                }

                ManageSdmNew.saveData(data, 'sdm/save-presensi-pegawai/').then((res) => {
                    getDataHistory();
                })
            }
        }
    ]);
});