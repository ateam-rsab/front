define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('ObservasiIGDPelayananCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','DateHelper',
        function ($rootScope, $scope, ModelItem, $state, DateHelper) {
            $scope.title = "Observasi IGD Pelayanan";
            $scope.dataVOloaded = true;
            $scope.now=new Date;
            $scope.item={};

            ModelItem.getDataDummyGeneric("ListJenisPelayanan", true).then(function (data) {
                $scope.listJenisPelayanan = data;
            })

            ModelItem.get("ObservasiIGDPelayanan").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;

            }, function errorCallBack(err) { });

            $scope.Save = function (model) {
                debugger
                var pelayanan = [];
                for (var i in $scope.DaftarPelayanan._data) {
                    var dataItem = $scope.DaftarPelayanan._data[i];
                    var temp = {};
                    if (dataItem.jenisPelayanan !== undefined || dataItem.keterangan !== undefined || dataItem.jam !== undefined) {
                        temp = {
                            jenisPelayanan: { id: dataItem.jenisPelayanan.id },
                            jam: dataItem.jam,
                            keterangan: dataItem.keterangan
                        }
                        pelayanan.push(temp);
                    }
                }
                $scope.item.layananDetail=pelayanan;

                var tindakan = [];
                for (var i in $scope.DaftarTindakanLain._data) {
                    var dataItem = $scope.DaftarTindakanLain._data[i];
                    var tempTindakan = {};
                    if (dataItem.inhalasi !== undefined || dataItem.jamObat !== undefined) {
                        tempTindakan = {
                            inhalasi: dataItem ,
                            jamObat: dataItem.jamObat
                        }
                        tindakan.push(tempTindakan);
                    }
                }
                $scope.item.tindakanLain=tindakan;

                console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
            };

            $scope.DaftarPelayanan = new kendo.data.DataSource({
                data: []
            });

            $scope.columnPelayanan = [{
                "field": "no",
                "title": "No",
                width: "50px"
            }, {
                    "field": "jenisPelayanan.name",
                    "title": "JenisPelayanan",
                    width: "200px"
                }, {
                    "field": "jam",
                    "title": "Waktu Layanan",
                    width: "200px"

                }, {
                    "field": "keterangan",
                    "title": "Keterangan",
                    width: "200px"

                }, {
                    command: { text: "Hapus", click: $scope.removeDaftarIGD },
                    title: "&nbsp;",
                    width: "110px"
                }];

            $scope.tambah = function () {
                var tanggal = DateHelper.formatDate($scope.item.jam,"DD MM YYYY hh:mm");
                var temp = {
                    "no": $scope.DaftarPelayanan._data.length + 1,
                    "jenisPelayanan": $scope.item.jenisPelayanan,
                    "jam": tanggal,
                    "keterangan": $scope.item.keterangan

                }
                $scope.DaftarPelayanan.add(temp);
                $scope.reset();
            }

            $scope.removeDaftarIGD = function (e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                $scope.temp == $scope.DaftarPelayanan
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });
                grid.removeRow(row);
            };

            $scope.reset = function () {
                $scope.item.jenisPelayanan = undefined,
                    $scope.item.jam = undefined,
                    $scope.item.keterangan = undefined
            }


            //Tindakan Lain
            $scope.DaftarTindakanLain = new kendo.data.DataSource({
                data: []
            });

            $scope.columnTindakanLain = [{
                "field": "no",
                "title": "No",
                width: "50px"
            }, {
                    "field": "inhalasi",
                    "title": "Inhalasi",
                    width: "200px"
                }, {
                    "field": "jamObat",
                    "title": "Jam Obat",
                    width: "200px"

                }, {
                    command: { text: "Hapus", click: $scope.removeDaftarTindakanLain },
                    title: "&nbsp;",
                    width: "110px"
                }];

            $scope.tambahTindakanLain = function () {
                var jam_obat= DateHelper.formatDate($scope.item.jamObat,"hh:mm");
                var temp = {
                    "no": $scope.DaftarTindakanLain._data.length + 1,
                    "inhalasi": $scope.item.inhalasi,
                    "jamObat": jam_obat

                }
                $scope.DaftarTindakanLain.add(temp);
                $scope.resetTindakanLain();
            }

            $scope.removeDaftarTindakanLain = function (e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                $scope.temp == $scope.DaftarTindakanLain
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });
                grid.removeRow(row);
            };

            $scope.resetTindakanLain = function () {
                $scope.item.inhalasi = undefined,
                $scope.item.jamObat = undefined
            }
        }
    ]);
});