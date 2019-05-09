define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('IsianPelamarCtrl', ['$timeout', '$rootScope', '$scope', 'ModelItem', '$state', 'StatusPerkawinan', 'PosisiLamaran', 'JenisKelamin', 'Pendidikan', 'ManageSdm',
        function($timeout, $rootScope, $scope, ModelItem, $state, StatusPerkawinan, PosisiLamaran, JenisKelamin, Pendidikan, ManageSdm) {
            ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
                $scope.now = new Date();
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});
            $scope.no = 1;
            $scope.isSnap = true;
            $scope.myChannel = {
                // the fields below are all optional
                videoWidth: '100%',
                videoHeight: '161',
                video: null // Will reference the video element on success
            };
            $scope.patOpts = { x: 0, y: 0, w: 25, h: 25 };
            $scope.onSuccess = function() {
                // The video element contains the captured camera data
                $scope.$apply(function() {
                    $scope.patOpts.w = $scope.myChannel.video.width;
                    $scope.patOpts.h = $scope.myChannel.video.height;
                    $scope.showDemos = true;
                });
            };
            $scope.retake = function() {
                $scope.isSnap = true;
            }
            $scope.makeSnapshot = function makeSnapshot() {
                $scope.isSnap = false;
                var patCanvas = document.querySelector('#snapshot');
                if (!patCanvas) return;
                patCanvas.width = $("#webcam").width();
                patCanvas.height = $("#webcam").height();
                var ctxPat = patCanvas.getContext('2d');
                var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $("#webcam").width(), $("#webcam").height());
                ctxPat.putImageData(idata, 0, 0);

                sendSnapshotToServer(patCanvas.toDataURL());

                //  patData = idata;
            };
            var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
                $scope.snapshotData = imgBase64;
            };
            var getVideoData = function getVideoData(x, y, w, h) {
                var hiddenCanvas = document.createElement('canvas');
                hiddenCanvas.width = $("#webcam").width();
                hiddenCanvas.height = $("#webcam").height();
                var ctx = hiddenCanvas.getContext('2d');
                ctx.drawImage($scope.myChannel.video, 0, 0, $("#webcam").width(), $("#webcam").height());
                return ctx.getImageData(x, y, w, h);
            };
            if ($state.params.noRec !== "") {
                $scope.item = JSON.parse($state.params.noRec);
                if ($scope.item.picture !== undefined) {

                    $timeout(function() {
                        $scope.isSnap = false;
                        var patCanvas = document.querySelector('#snapshot');
                        var canvas = patCanvas;
                        var ctx = canvas.getContext("2d");
                        ctx.width = 215;
                        ctx.height = 164;
                        var image = new Image();
                        image.onload = function() {
                            ctx.drawImage(image, 0, 0);
                        };
                        image.src = $scope.item.picture;
                        debugger;
                    })
                }
                $scope.isDisable = true;
            } else {
                $scope.item = {};
            }
            ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
                $scope.listPenandatangan = data;
            })

            StatusPerkawinan.getOrderList("service/list-generic/?view=Agama&select=*", true).then(function(dat) {
                $scope.ListAgama = dat.data;

            });

            PosisiLamaran.getOrderList("service/list-generic/?view=PosisiLamaran&select=*", true).then(function(dat) {
                $scope.ListPosisiLamaran = dat.data;
            });


            Pendidikan.getOrderList("service/list-generic/?view=Pendidikan&select=*", true).then(function(dat) {
                $scope.ListPendidikan = dat.data;
            });


            JenisKelamin.getOrderList("service/list-generic/?view=JenisKelamin&select=*", true).then(function(dat) {
                $scope.ListJenisKelamin = dat.data;
            });


            $scope.ListStatusPerkawinan = [{
                    "id": 1,
                    "kode": "1",
                    "name": "Menikah"
                }, {
                    "id": 2,
                    "kode": "2",
                    "name": "Belum Menikah"
                }

            ];

            $scope.daftarBahanLinen = new kendo.data.DataSource({
                data: []
            });

            $scope.columnLaporanUjiHasil = [{
                    "field": "no",
                    "title": "No",
                    "width": "5%"
                },
                {
                    "field": "degree.namaPendidikan",
                    "title": "Degree",
                    "width": "20%"
                },
                {
                    "field": "sekolah",
                    "title": "Sekolah/Universitas",
                    "width": "20%"
                },
                {
                    "field": "jurusan",
                    "title": "Jurusan",
                    "width": "20%"
                },
                {
                    "field": "tahunmasuk",
                    "title": "Tahun Masuk",
                    "width": "20%"
                },
                {
                    "field": "tahunlulus",
                    "title": "Tahun Lulus",
                    "width": "20%"
                },
                {
                    "field": "nilai",
                    "title": "Nilai",
                    "width": "20%"
                }
            ];
            $scope.addDataBahanLinen = function() {

                var tempDataBahanLinen = {
                    "no": $scope.no++,
                    "degree": $scope.item.degree,
                    "sekolah": $scope.item.sekolah,
                    "jurusan": $scope.item.jurusan,
                    "tahunmasuk": $scope.item.tahunMasuk,
                    "tahunlulus": $scope.item.tahunLulus,
                    "nilai": $scope.item.nilai

                }

                $scope.daftarBahanLinen.add(tempDataBahanLinen);
                $scope.item.degree = "",
                    $scope.item.sekolah = "",
                    $scope.item.jurusan = "",
                    $scope.item.tahunMasuk = "",
                    $scope.item.tahunLulus = "",
                    $scope.item.nilai = ""
            }

            $scope.Save = function() {
                $scope.item.picture = $scope.snapshotData;
                ManageSdm.saveIsianPelamar($scope.item, "sdm/save-isian-pelamar").then(function(e) {
                    window.history.back();
                });
                $scope.daftarBahanLinen == new kendo.data.DataSource({
                    data: []
                });
            };
        }
    ]);
});