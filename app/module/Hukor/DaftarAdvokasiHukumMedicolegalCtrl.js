define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarAdvokasiHukumMedicolegalCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManageSarpras',
        function ($rootScope, $scope, ModelItem, $state, DateHelper, ManageSarpras) {

            ModelItem.get("Hukor/DaftarAdvokasiHukumMedicolegal").then(function (data) {
                $scope.item = data;
                $scope.now = new Date();
                $scope.item.periodeAwal = new Date();
                $scope.item.periodeAkhir = new Date();
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) { });

            $scope.item = {
                "periodeAwal": new Date(),
                "periodeAkhir": new Date()
            }

            //  $scope.pegOptions = {
            // 	dataTextField: "noUsulan",
            //     dataValueField: "noUsulan",
            // }

            // ManageSarpras.getListData("KajianEvaluasi&select=noUsulan").then(function success(dat) {
            // 	$scope.dataNoUsulan = dat.data;

            // }, function error(error) {
            //     console.log(error);
            // });

            $scope.cariTanggal = function () {
                var awal = DateHelper.getPeriodeFormatted($scope.item.periodeAwal);
                var akhir = DateHelper.getPeriodeFormatted($scope.item.periodeAkhir);
                var url = "dateStart=" + awal + "&dateEnd=" + akhir;
                ManageSarpras.getOrderList("advokasi-hukum-medicolegal/find-all/?" + url).then(function (dat) {

                    $scope.daftarAdvokasi = new kendo.data.DataSource({
                        data: dat.data.data,
                        scrollable: true
                    });
                    // console.log(JSON.stringify($scope.daftarAdvokasi.options));
                    // debugger;
                    for (var i = $scope.daftarAdvokasi.options.data.length - 1; i >= 0; i--) {
                        var date = new Date($scope.daftarAdvokasi.options.data[i].tglKasus);
                        $scope.daftarAdvokasi.options.data[i].tglKasus = DateHelper.getTanggalFormatted(date);
                    }
                    // debugger;
                });
            }
            $scope.cariTanggal();

            $scope.pegOptions = {
                dataTextField: "noKasus",
                dataValueField: "noKasus"
            }

            ManageSarpras.getListData("AdvokasiHukumMedicolegal&select=noKasus").then(function success(dat) {
                debugger;
                $scope.dataNoKasus = dat.data;
                console.log(JSON.stringify($scope.dataNoKasus));
            }, function error(error) {
                console.log(error);
            });





            $scope.cariNoKasus = function () {

                ManageSarpras.getOrderList("advokasi-hukum-medicolegal/find-all/?noKasus=" + $scope.item.cariNoKasus[0].noKasus).then(function (dat) {
                    $scope.daftarAdvokasi = new kendo.data.DataSource({
                        data: dat.data.data,
                        scrollable: true
                    });
                    debugger;
                    // console.log(JSON.stringify($scope.daftarAdvokasi.options));
                    // debugger;
                    for (var i = $scope.daftarAdvokasi.options.data.length - 1; i >= 0; i--) {
                        var date = new Date($scope.daftarAdvokasi.options.data[i].tglKasus);
                        $scope.daftarAdvokasi.options.data[i].tglKasus = DateHelper.getTanggalFormatted(date);
                    }
                    // debugger;

                    // $scope.daftarEvaluasi = new kendo.data.DataSource({
                    //     data: dat.data.data,
                    //     scrollable: true
                    // });
                    // console.log(JSON.stringify($scope.daftarEvaluasi.options));
                    // // debugger;
                    // for (var i = $scope.daftarEvaluasi.options.data.length - 1; i >= 0; i--) {
                    //     var date = new Date($scope.daftarEvaluasi.options.data[i].tglKasus);
                    //     $scope.daftarEvaluasi.options.data[i].tglKasus = DateHelper.getTanggalFormatted(date);
                    // }
                    // // debugger;
                });
            }



            $scope.daftarAdvokasi = new kendo.data.DataSource({
                data: [
                    {
                        "noUsulan": "1"
                    }
                ]
            });

            $scope.columnAdvokasi = [
                {
                    "template": "<center><input type='checkbox' class='checkbox' ng-model='dataItem.check'/></center>",
                    "width": 30
                },
                {
                    "field": "noKasus",
                    "title": "No Kasus",
                    "width": "150px"
                },
                {
                    "field": "user.namaLengkap",
                    "title": "User ID",
                    "width": "150px"
                },
                {
                    "field": "tglKasus",
                    "title": "Tanggal",
                    "width": "150px"
                },
                {
                    "field": "analisaKajian",
                    "title": "Input Analisa Kajian",
                    "width": "200px"
                },
                {
                    "field": "hasilKeputusan",
                    "title": "Input Hasil Keputusan",
                    "width": "150px"
                },
                {
                    "field": "jenisKasus.jenisKasus",
                    "title": "Jenis Kasus",
                    "width": "100px"
                },
                {
                    "field": "deskripsiKasus",
                    "title": "Deskripsi",
                    "width": "200px"
                },
                {
                    "field": "penanggungJawab.namaLengkap",
                    "title": "Penanggung Jawab",
                    "width": "150px"
                },
                {
                    "field": "statusKasus",
                    "title": "Keterangan",
                    "width": "150px"
                }
            ];

            $scope.hapus = function () {
                console.log(JSON.stringify($scope.daftarAdvokasi._data));
                debugger;
                var idKasus = [];
                var i = 0;
                $scope.daftarAdvokasi._data.forEach(function (data) {
                    if (data.check == true) {
                        var dat =
                            {
                                "id": data.id
                            }

                        idKasus[i] = dat;
                        i++;
                    }

                })
                console.log(JSON.stringify(idKasus));
                // if (idKasus.length > 0) {
                    ManageSarpras.saveDataSarPras(ModelItem.beforePost(idKasus), "advokasi-hukum-medicolegal/delete/").then(function (e) {
                        console.log(JSON.stringify(e.data));
                        $scope.cariTanggal();
                    });
                // }
                // else alert("Silakan check data yang ingin dihapus")

               
            }
        }
    ]);
});