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
                        pageSize: 100,
                        total: tempData.length
                    });
                    $scope.isRouteLoading = false;
                });
            }

            $scope.showImageCapture = () => {
                context.drawImage(video, 0, 0, 400, 350);
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
                        var marker = L.marker(koordinatViewMap).addTo(mymap);
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
                        var circle = L.rectangle(areaHarkit, {
                            color: 'green',
                            fillColor: '#7ea04d',
                            fillOpacity: 0.5,
                            // radius: 500
                        }).addTo(mymap);

                    });



                    // navigator.geolocation.watchPosition()

                    // $.get('http://api.geonames.org/findNearestAddress?lat=' + $scope.userLocation.lat + '&lng=' + $scope.userLocation.lng + '&username=demo').then((data) => {
                    //     console.log(data);
                    // })
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

<<<<<<< HEAD


            function getIPAddr() {
                let dataIP = null;
                let http = new XMLHttpRequest();

                http.onreadystatechange = () => {
                    if(http.readyState == 4 && http.status === 200) {
                        dataIP = http.responseText;
                    }
                }

                http.open("GET", "https://api.ipify.org", false);

                http.send();

                return dataIP;
            }

            $scope.savePresensi = function () {
                
                let imgUrl = canvas.toDataURL("image/jpg", 0.7);
                console.log(imgUrl);
                
                // let ip = getIPAddr();
                // $scope.isRouteLoading = true;
                // let data = {
                //     pegawai: {
                //         id: $scope.dataPegawaiLogin.id
                //     },
                //     processtatus: $scope.data.isWFH ? 1 : 0,
                //     ip_addr: ip
                // }

                // ManageSdmNew.saveData(data, 'sdm/save-presensi-pegawai/').then((res) => {
                //     getDataHistory();
                // })
            }

            // $scope.savePresensi = function () {
            //     let data = {
            //         // tr_date: DateHelper.toTimeStamp(new Date()),
            //         // tr_time: DateHelper.toTimeStamp(new Date()),
            //         pegawai: {
            //             id: $scope.dataPegawaiLogin.id
            //         },
            //         latitude: $scope.userLocation.lat,
            //         longitude: $scope.userLocation.lng,
            //         akurasi: $scope.userLocation.akurasi ,
            //         // empl_code: $scope.data.idFinger,
            //         processtatus: $scope.data.isWFH ? 1 : 0,
            //         ip_addr: $scope.dataDevice.geoplugin_request
            //     }
            //     // console.log(data);
            //     ManageSdmNew.saveData(data, 'sdm/save-presensi-pegawai/').then((res) => {
            //         getDataHistory();
            //     })
            // }
=======
            $scope.savePresensi = function () {
                getLocation();

                $scope.isRouteLoading = true;
                $.get('http://www.geoplugin.net/json.gp', function (req) {
                    $scope.dataDevice = JSON.parse(req);
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
                });
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
>>>>>>> fd00d619ca87ae8404890119a7fc5601f62ff6f6
        }
    ]);
});