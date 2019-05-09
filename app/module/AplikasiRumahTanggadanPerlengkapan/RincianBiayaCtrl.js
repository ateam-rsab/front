define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RincianBiayaCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'ManageSarpras',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.item = {};

            ModelItem.get("RumahTanggadanPerlengkapan/PelayananPemulasaraanJenazah").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) { });

            // $scope.listDataPelayanan = [{
            //     "namaPelayanan": "asd",
            //     "tarif" : 8000
            // }];
            var i = 1;
            $scope.tambahPelayanan = function () {
                // debugger;

                var datas = {
                    "no": i,
                    "id": $scope.item.pelayanan.idProduk,
                    "namaProduk": $scope.item.pelayanan.namaProduk,
                    "tarif": $scope.item.pelayanan.hargaSatuan,
                    "produk": {
                        "id": $scope.item.pelayanan.idProduk
                    },
                    "harga": {
                        "id": $scope.item.pelayanan.idHarga
                    },
                    "idHarga": $scope.item.pelayanan.idHarga
                }
                $scope.listDataPelayanan.add(datas);
                $scope.item.pelayanan = "";
                i++;
            }

            $scope.customOptions = {
                dataSource: $scope.customersDataSource,
                dataTextField: "namaProduk",
                dataValueField: "idProduk",

                // headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                // '<span>Nama Pelayanan</span>' +
                // '<span>Tarif</span>' +
                // '</div>',

                // using {{angular}} templates:
                // valueTemplate: '<span class="selected-value" <h3>{{dataItem.idProduk}}</h3>></span><span>{{dataItem.namaProduk}}</span>',

                template: '<span class="k-state-default" ></span>' +
                '<span class="k-state-default">{{dataItem.namaProduk}}<p>Tarif: Rp. {{dataItem.hargaSatuan}}</p></span>',
            };

            $scope.listDataPelayanan = new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            id: { editable: false, nullable: false, validation: { required: true } },
                            namaProduk: { editable: false, nullable: false, validation: { required: true } },
                            idHarga: { editable: false, type: "number", validation: { required: true, min: 0, max: 100 } },

                        }
                    }
                },
                aggregate: [
                    { field: "hargaSatuan", aggregate: "sum" }

                ]
            });

            ManageSarpras.getOrderList("daftar-pemulasaraan-jenazah/find-by-no-rec/?noRec=" + $state.params.noOrder).then(function (data) {
                // debugger;
                $scope.item = data.data.data.data[0]
                // $scope.item.noCm = data.data.data.data[0].noCm;
                // $scope.item.namaPasien = data.data.data.data[0].noCm;
                // $scope.item.umur = data.data.data.data[0].noCm;
                // $scope.item.alamatPasien = data.data.data.data[0].noCm;
                // $scope.item.jenisKelamin = data.data.data.data[0].noCm;
                // $scope.item.statusPerkawinan = data.data.data.data[0].noCm;         	
            })

            ManageSarpras.getOrderList("pemulasaraan-jenazah/find-rincian-biaya-pemulasaraan-jenazah/?noRec=" + $state.params.noOrder).then(function (data) {
                debugger;
                var i=1;
                data.data.data.forEach(function (datas) {
                    datas.no = i;
                    $scope.listDataPelayanan.add(datas);
                    i++;
                });
            })

            ManageSarpras.getOrderList("pemulasaraan-jenazah/find-pelayanan-pemulasaraan-jenazah/").then(function (data) {
                // debugger;
                $scope.listPelayanan = data.data.data;
            })

            $scope.columnDataPelayanan = [
                {
                    "field": "no",
                    "title": "<h3>No.</h3>",
                    attributes: { align: "center" },
                    width: "30px"
                },
                {
                    "field": "idProduk",
                    "title": "<h3>Kode Pelayanan</h3>",
                    width: "100px"
                },
                {
                    "field": "namaProduk",
                    "title": "<h3>Nama Pelayanan</h3>",
                    width: "150px"
                },
                {
                    "field": "hargaSatuan",
                    "title": "<h3>Tarif</h3>",
                    attributes: { align: "center" },
                    width: "75px",
                    footerTemplate: "<center>#= sum #</center> "
                }
                // ,
                // {
                //     command: ["destroy"],
                //     title: "&nbsp;",
                //     width: "50px"
                // }
            ];

            $scope.listDataPelayananPemulasaraan = [{
                "namaPelayanan": "asd",
                "tarif": 8000
            }];

            $scope.pelayananOptions = {
                dataSource: $scope.listDataPelayanan,
                pageable: false,
                //	toolbar:  [{ name: "create", text: "Tambah Data" }],
                editable: {
                    mode: "inline",
                    // template: kendo.template($("#popup-editor").html())
                },
                columns: $scope.columnDataPelayanan
            };

            $scope.columnDataPelayananPemulasaraan = [
                {
                    "field": "no",
                    "title": "<h3>No.</h3>",
                    width: "30px"
                },
                {
                    "field": "kdPelayanan",
                    "title": "<h3>Kode Pelayanan</h3>",
                    width: "150px"
                },
                {
                    "field": "namaPelayanan",
                    "title": "<h3>Nama Pelayanan</h3>",
                    width: "150px"
                },
                {
                    "field": "tarif",
                    "title": "<h3>Tarif</h3>",
                    width: "75px"
                }
            ];

            $scope.Save = function () {
                debugger;

                var data = {
                    "strukOrder": {
                        "totalHargaSatuan": $scope.listDataPelayanan._aggregateResult.tarif.sum,
                        "totalHarusDibayar": $scope.listDataPelayanan._aggregateResult.tarif.sum,
                        "caraBayarQuo": {
                            "id": $scope.item.idCaraBayar
                        }
                    },
                    "orderPelayanan": {
                        "mapJenazah": $scope.listDataPelayanan._data,
                        "ruangan": {
                            "id": $scope.item.idRuangan
                        },
                        "ruanganTujuan": {
                            "id": $scope.item.idRuangan
                        }
                    }
                }

                ManageSarpras.saveDataSarPras(data, "pemulasaraan-jenazah/save-pemulasaraan-jenazah/?noRec=" + $scope.item.noRec).then(function (e) {
                    debugger;
                    $scope.item = {};
                    console.log(JSON.stringify(e.data));
                    $scope.Back();
                });
            };

        }
    ]);
});