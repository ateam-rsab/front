define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RadiologiPemeriksaanCtrl', ['ManagePasien', '$http', 'ManageRadiologi', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienRadiologi', 'DateHelper',

        function(managePasien, $http, manageRadiologi, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienRadiologi, dateHelper) {
            $scope.item = {};
            $scope.fit = true;
            $scope.listImageUpload = [];
            $scope.uploadFile = function() {
                var file = $scope.myFile;
                var uploadUrl = "/multer";
                var fd = new FormData();
                fd.append('file', file);
                $http.post(uploadUrl, fd, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    })
                    .success(function(e) {
                        $scope.listImageUpload.push(e.fileName);
                        window.messageContainer.log("Berhasil upload data");
                    })
                    .error(function() {
                        console.log("error!!");
                    });
            };
            $scope.width = 0;
            $scope.height = 0;
            $rootScope.isOpen = true;
            $scope.noRegistrasi = $state.params.noRegistrasi;
            $scope.noOrder = $state.params.noOrder;
            $scope.brightness = 0;
            $scope.contrast = 0;
            $scope.exposure = 0;
            var currentData = undefined;
            $scope.reset = function() {
                $scope.brightness = 0;
                $scope.contrast = 0;
                $scope.exposure = 0;
            }
            $scope.Kembali = function() {
                $scope.current = undefined;
            }
            $scope.$watch('current.url', function(e) {
                if (e === undefined) return;
                Caman('#current-img', function() {
                    currentData = this;
                    currentData.render();
                });
            })
            $scope.$watch('brightness', function(e, old) {
                if (e === undefined) return;
                render();
            })
            $scope.$watch('contrast', function(e, old) {
                if (e === undefined) return;
                render();
            })
            $scope.$watch('exposure', function(e, old) {
                if (e === undefined) return;
                render();
            })

            function render() {
                if (currentData === undefined) return;
                if (currentData.reset === undefined) return;
                currentData.reset();
                currentData.brightness($scope.brightness);
                // currentData.contrast($scope.contrast);
                currentData.exposure($scope.exposure);
                currentData.render();
            }
            $scope.scale = function(index, item) {
                $scope.current = item;
                // var targetBox = kendo.effects.box($("#parent"));
                // var element = $("#img_" + index);

                // var viewBox = kendo.effects.box(element);
                // var origin = kendo.effects.transformOrigin(targetBox, viewBox);
                // if (item.show !== undefined) {
                //     item.show = undefined;
                //     element.css({
                //         transformOrigin: 0 + "px " + 0 + "px",
                //         transform: "scale(" + 1 + ")"
                //     });
                // } else {
                //     var scale = 1;

                //     item.scale = kendo.effects.fitScale(targetBox, viewBox);
                //     element.css({
                //         transformOrigin: origin.x + "px " + origin.y + "px",
                //         transform: "scale(" + item.scale + ")"
                //     });
                //     item.show = true;
                // }

            }
            $scope.noRecPasien = $state.params.noAntrianPasien;
            $scope.noOrder = $state.params.noOrder;
            findPasien.getByNoRegistrasi($state.params.noAntrianPasien).then(function(data) {
                $scope.item = ModelItem.beforePost(data.data, true);
                $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);

                $scope.item.pasien.umur = dateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                $scope.tglRegistrasi = data.data.tglRegistrasi;
                if (data.data.keluhanUtama !== undefined)
                    $scope.item.keluhan = 'Keluhan utama :' + data.data.keluhanUtama.keluhanUtama;
                $scope.item.displayCito = $scope.item.strukOrder.cito === true ? 'Cito' : "Tidak Cito";

                if ($state.current.name === 'DashboardRadiologiCtrlHasilData') {

                    $rootScope.doneLoad = true;
                    findPasienRadiologi.getImagesByStudy($scope.item.noMrPacs, $scope.item.studyId).then(function(e) {
                        if (e.data.length === 0) return;
                        var temp = [];

                        for (var key in e.data) {
                            if (e.data.hasOwnProperty(key)) {
                                var element = e.data[key];
                                element.url = findPasienRadiologi.getImage(element.NoMedicalRecord, element.FileName);
                                temp.push(element);
                            }
                        }

                        $scope.listImages = temp;
                        $rootScope.doneLoad = false;
                    });


                }

                //ambil data pacs
                findPasienRadiologi.findPasienDevice(item.pasien.namaPasien).then(function(e) {
                    var data = e.data;
                    $scope.loadPacs = true;
                    $scope.listPacs = data;
                });

            });
            $scope.Save = function() {
                if ($state.current.name === 'DashboardRadiologiCtrlHasilData') {
                    manageRadiologi.saveUploadGambar($state.params.noOrder, ModelItem.beforePost($scope.listImageUpload)).then(function(e) {

                    });
                }
                if ($state.current.name === "DashboardRadiologiCtrlInputHasil") {
                    var data = [];
                    debugger;
                    for (var key in $scope.listOrders) {
                        if ($scope.listOrders.hasOwnProperty(key)) {
                            var element = $scope.listOrders[key];
                            for (var keyItem in element) {
                                if (element.hasOwnProperty(keyItem)) {
                                    var subData = element[keyItem];
                                    subData.klinis = subData.klinis;
                                    subData.expertise = subData.expertise;
                                    data.push(subData);
                                }
                            }
                        }
                    }
                    manageRadiologi.saveHasilPeriksa($scope.noOrder, ModelItem.beforePost(data)).then(function(e) {
                        managePasien.updateStatusAntrian($state.params.noAntrianPasien, 5).then(function(e) {
                            window.history.back();
                        });
                    });
                } else {
                    manageRadiologi.verifikasiPemeriksaan(list.join(','), $state.params.noAntrianPasien).then(function(e) {
                        // window.messageContainer.info('Success');

                    });
                    managePasien.updateStatusAntrian($state.params.noAntrianPasien, 10).then(function(e) {
                        window.history.back();
                    });
                }
            }
            if ($state.current.name === 'DashboardRadiologiCtrlHasilData')
                return;


            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }
            // findPasienRadiologi.getOrder($scope.noOrder).then(function(data) {
            //     var items = data.data.data.orders[0].detail;
            //     var data = [];
            //     for (var key in items) {
            //         if (items.hasOwnProperty(key)) {
            //             var element = items[key];

            //             element.produk.jenisPeriksa = element.produk.detailJenisProduk.detailJenisProduk;
            //             if (element.keteranganLainnya === "Sudah diverifikasi")
            //                 element.produk.check = true;
            //             element.produk.orderRec = element.noRec;
            //             data.push(element.produk);
            //         }
            //     }
            //     $scope.listOrders = _.groupBy(data, 'jenisPeriksa');
            // });

            if ($state.current.name === "DashboardRadiologiCtrlInputHasil" || $state.current.name === 'DashboardRadiologiCtrlVerifikasi') {
                findPasienRadiologi.getOrderDetail($scope.noOrder).then(function(data) {
                    var items = data.data.data.orders;
                    if (items.length === 0) return;
                    $scope.strukOrder = data.data.data.strukOrder;
                    if (data.data.data.header !== undefined)
                        $scope.item.keteranganLainnya = data.data.data.header.keteranganLainnya;
                    var data = [];
                    var dataTemp = [];
                    var id = 0;
                    for (var key in items) {
                        if (items.hasOwnProperty(key)) {
                            var element = items[key];
                            if (element.produk === undefined) {
                                var valid = false;
                                if (ModelItem.getStatusUser() === 'radiologi') {
                                    valid = element.hasilPemeriksaan.statusVerifikasi === 2 ? true : false;
                                } else
                                    valid = element.hasilPemeriksaan.statusVerifikasi === 1 || element.hasilPemeriksaan.statusVerifikasi === 2 ? true : false;
                                var item = {
                                    detail: element.hasilPemeriksaan.detail,
                                    namaProduk: element.hasilPemeriksaan.produk.namaProduk,
                                    klinis: element.hasilPemeriksaan.klinis,
                                    expertise: element.hasilPemeriksaan.expertise,
                                    metode: 'metode ' + id,
                                    uuid: guid(),
                                    jenisPeriksa: element.hasilPemeriksaan.produk.jenisPemeriksaanPenunjang.jenisPeriksa,
                                    statusVerifikasi: valid
                                };
                                item.noRec = element.hasilPemeriksaan.noRec;
                                valid = true;
                                if (ModelItem.getStatusUser() === 'radiologi') {
                                    if (valid === true || element.hasilPemeriksaan.statusVerifikasi === 1)
                                        data.push(item);
                                } else data.push(item);

                            } else {
                                if (element.produk.jenisPeriksaPenunjang == null)
                                    element.produk.jenisPeriksa = "";
                                else
                                    element.produk.jenisPeriksa = element.produk.jenisPeriksaPenunjang.jenisPeriksa;
                                if (element.keteranganLainnya === "Sudah diverifikasi")
                                    element.produk.check = true;
                                element.produk.orderRec = element.noRec;
                                for (var key in element.detail) {
                                    if (element.detail.hasOwnProperty(key)) {
                                        var subItem = element.detail[key];
                                        var nilaiNormal = "";

                                        id++;
                                        element.produk._id = id;
                                        element.produk.detail = element.subItem;
                                        subItem.hasil = "";
                                        data.push({
                                            noRec: subItem.noRec,
                                            detail: subItem,
                                            namaProduk: subItem.detailPemeriksaan,
                                            nilaiNormal: nilaiNormal,
                                            uuid: guid(),
                                            jenisPeriksa: element.produk.jenisPeriksa
                                        });
                                    }
                                }
                            }

                        }
                    }
                    if (ModelItem.getStatusUser() === 'radiologi') {
                        for (var key in data) {
                            if (data.hasOwnProperty(key)) {
                                var element = data[key];
                                // element.statusVerifikasi = false;
                            }
                        }
                    }
                    $scope.listOrders = _.groupBy(data, 'jenisPeriksa');
                });
            } else {
                findPasienRadiologi.getOrder($scope.noOrder).then(function(data) {
                    var items = data.data.data.orders[0].detail;
                    var data = [];
                    for (var key in items) {
                        if (items.hasOwnProperty(key)) {
                            var element = items[key];
                            if (element.produk.jenisPeriksaPenunjang === undefined) {
                                element.produk.jenisPeriksa = "";
                            } else
                                element.produk.jenisPeriksa = element.produk.jenisPeriksaPenunjang.jenisPeriksa;
                            if (element.keteranganLainnya === "Sudah diverifikasi")
                                element.produk.check = true;
                            element.produk.orderRec = element.noRec;
                            data.push(element.produk);
                        }
                    }
                    $scope.listOrders = _.groupBy(data, 'jenisPeriksa');
                });
            }

            var list = [];
            $scope.checked = function(data) {
                if (data.check === true) {
                    data.check = undefined;
                    var index = list.indexOf(data.orderRec);
                    list = list.slice(index, index - 1);
                } else {
                    data.check = true;
                    list.push(data.orderRec);
                }
            }


            /*ID
            :
            "df2cb133-6d8b-42c2-8843-f233d37d4e44"
            Name
            :
            "SUDARYATNO SUDIRHAM"
            NoMr
            :
            "X3343521E"*/


            //open service pacs
            $scope.openPACSService = function (noMr, id) {
                var wsImpl = window.WebSocket || window.MozWebSocket;

                window.ws = new wsImpl('ws://localhost:8888/');
                var urlFormat = "ID-" + noMr + "-" + id;  //format : ID-5Yp0E-2.16.840.1.113669.632.20.1211.10000357775
                ws.send(urlFormat);
                

                /*var inc = document.getElementById('incomming');
                var wsImpl = window.WebSocket || window.MozWebSocket;
                var form = document.getElementById('sendForm');
                var input = document.getElementById('sendText');

                inc.innerHTML += "connecting to server ..<br/>";

                // create a new websocket and connect
                window.ws = new wsImpl('ws://localhost:8888/');

                // when data is comming from the server, this metod is called
                ws.onmessage = function (evt) {
                    inc.innerHTML += evt.data + '<br/>';
                };

                // when the connection is established, this method is called
                ws.onopen = function () {
                    inc.innerHTML += '.. connection open<br/>';
                };

                // when the connection is closed, this method is called
                ws.onclose = function () {
                    inc.innerHTML += '.. connection closed<br/>';
                }

                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    var val = input.value;
                    ws.send(val);
                    input.value = "";
                });*/

            }



        }
    ]);
});