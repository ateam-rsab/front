define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('NeracaLimbahB3RevCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'TampilDataNeraca', 'TampilPerlakuan', 'TampilPerizinan', 'ManageKKKL', 'CetakHelper',
        function ($rootScope, $scope, ModelItem, DateHelper, TampilDataNeraca, TampilPerlakuan, TampilPerizinan, ManageKKKL, cetakHelper) {
            $scope.item = {
                periode: new Date(),
                periodeAhir: new Date()
            };
            $scope.dataFound = false;
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
            $scope.formatPercentage = {
                format: "p2",
                min: 0,
                decimals: 2
            };
            $scope.formatInt = {
                format: "n0",
                min: 0
            }
            $scope.listPerizinan = [
                { name: "Ada", id: 1 },
                { name: "Tidak Ada", id: 2 },
                { name: "Kadaluarsa", id: 3 }
            ];
            $scope.findData = function () {
                var listRawRequired = [
                    "item.periode|k-ng-model|Periode",
                    "item.periodeAhir|k-ng-model|PeriodeAkhir"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.dataFound = false;
                    $scope.isReport = false;
                    var datesAwal = DateHelper.getDaysofMonth($scope.item.periode);
                    var datesAhir = DateHelper.getDaysofMonth($scope.item.periodeAhir);
                    ManageKKKL.getOrderList("neraca-limbah/get-jumlah-jenis-limbah-b3-by-periode?startDate=" + datesAwal[0] + "&endDate=" + datesAhir[1]).
                        then(function (res) {
                            $scope.dataLimbah = res.data.data;
                            if ($scope.dataLimbah.dataJenisLimbahMasuk.length > 0)
                                $scope.dataLimbah.dataJenisLimbahMasuk.forEach(function (items, index) {
                                    items.idx = items.index + 1;
                                });
                            if ($scope.dataLimbah.totalLimbahKeluarPerlakuan.length > 0)
                                $scope.dataLimbah.totalLimbahKeluarPerlakuan.forEach(function (items, index) {
                                    items.idx = items.index + 1;
                                });
                            $scope.dataFound = true;
                            $scope.isReport = true;
                            $scope.item.jumlahbelumkelola = $scope.dataLimbah.limbahDiSimpan
                        }).
                        catch(function (err) {
                            messageContainer.error(err.statusText, err.status);
                        });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };
            $scope.countTotal = function () {
                if ($scope.item.residu == undefined || $scope.item.jumlahbelumkelola == undefined) return;
                var jumlahSisa = $scope.item.residu + $scope.item.jumlahbelumkelola,
                    totalLimbahMasuk = $scope.dataLimbah.totalLimbahMasuk;
                $scope.item.plus = jumlahSisa;
                $scope.item.kinerjapengelolaan = (totalLimbahMasuk - jumlahSisa) / totalLimbahMasuk;
            };
            
            // $scope.cetak = function () {
            //     debugger
            //     var periodeTgl = DateHelper.getDaysofMonth($scope.item.periode);
            //     var url = 'http://172.16.99.152:8080/jasamedika-web/reporting/neracaLimbahB3?startDate=' + periodeTgl[0] + '&endDate=' + periodeTgl[1] + '&X-AUTH-TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZGUubWFjaG11ciJ9.UNSWMl8JN0hwrt7_hcdkH_qH9lAohc4erzz1ZmgIREQLVIJKvvJ2zkvqdThTw36nMQGDGAAd5xodSPfJKPTtow';
            //     var urlLaporan = cetakHelper.open(url);
            //     window.open(url,'', 'width:600, height:500');
            //     // if (!$scope.dataFound) return;
            //     var windowOpen = window.open(urlLaporan, '', 'width:600, height:500');
			// 	windowOpen.focus();
			// 	windowOpen.print();
			// 	windowOpen.close();
                

            //     toastr.info("Mencetak Neraca Limbah B4 Periode: " + periodeTgl[0] + " s/d " + periodeTgl[1], "Printing...");
            // };
            $scope.Save = function () {
                // var dataTotalLimbah =$scope.dataLimbah.totalLimbahMasuk;
                var date = new Date();
                var listRawRequired = [
                    "item.periode|k-ng-model|Periode",
                    "item.residu|k-ng-model|Residu",
                    "item.jumlahbelumkelola|k-ng-model|Jumlah limbah belum dikelola",
                    "item.plus|k-ng-model|Jumlah limbah belum dikelola",
                    "item.kinerjapengelolaan|k-ng-model|Kinerja pengelolaan"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    debugger
                    // var tglPeriode = DateHelper.getDaysofMonth($scope.item.periode);
                    // var periodeAwal = new Date(date.getFullYear($scope.periode), date.getMonth($scope.periode), 1);
                    // var PeriodeAkhir = new Date(date.getFullYear($scope.periodeAhir), date.getMonth($scope.periodeAhir) + 1, 0);
                    // var tglPeriodeAwal = DateHelper.getDaysofMonth(periodeAwal);
                    // var tglPeriodeAkhir = DateHelper.getDaysofMonth(PeriodeAkhir);
                    var datesAwal = DateHelper.getDaysofMonth($scope.item.periode);
                    var datesAhir = DateHelper.getDaysofMonth($scope.item.periodeAhir);
                    var dataSend = {
                        "detailPerlakuan": [],
                        // "periodeAwal": new Date(tglPeriode[0]).getTime(),
                        "periodeAwal": Date.parse(datesAwal[0]),
                        "residu": $scope.item.residu,
                        // "periodeAhir": new Date(tglPeriode[1]).getTime(),
                        "periodeAhir": Date.parse(datesAhir[1]),
                        "detailJenisLimbah": [],
                        "kinerjaPengelolaan": $scope.item.kinerjapengelolaan,
                        "jumlahYangBelumTerkelola": $scope.item.plus,
                        "totalLimbahMasuk": $scope.dataLimbah.totalLimbahMasuk
                    };

                    for (var key in $scope.dataLimbah) {
                        if ($scope.dataLimbah.hasOwnProperty(key)) {
                            if (key.indexOf('dataJenisLimbahMasuk') >= 0) {
                                $scope.dataLimbah[key].forEach(function (items) {
                                    dataSend.detailJenisLimbah.push({
                                        "jenisLimbahB3Masuk": {
                                            "id": items.id
                                        },
                                        "jumlah": items.ttlqtymasuk
                                    })
                                });
                            } else if (key.indexOf('totalLimbahKeluarPerlakuan') >= 0) {
                                $scope.dataLimbah[key].forEach(function (items) {
                                    dataSend.detailPerlakuan.push({
                                        "perizinanLimbah": {
                                            "id": items.perizinan ? items.perizinan.id : 2
                                        },
                                        "jenisLimbahYangDikelola": items.jenisLimbahYangDikelola,
                                        "perlakuan": {
                                            "id": items.id
                                        },
                                        "jumlah": items.ttlqtyKeluar
                                    });
                                })
                            }
                        }
                    }
                    console.log(JSON.stringify(dataSend));
                    ManageKKKL.saveDataSarPras(dataSend, "neraca-limbah/save-neraca-limbah/").then(function() {
                        $scope.dataFound = !$scope.dataFound;
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };
        }
    ]);
});