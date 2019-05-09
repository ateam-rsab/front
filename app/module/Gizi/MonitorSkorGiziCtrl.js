define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MonitorSkorGiziCtrl', ['$q', 'CacheHelper', 'ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'DateHelper',

        function($q, cacheHelper, managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, dateHelper) {
            $scope.now = new Date();
            $rootScope.isOpen = true;
            $scope.tglInputData = new Date();
            $scope.tglAwal = new Date();
            $scope.tglAkhir = new Date();
            $scope.selected = function(data) {
                $scope.item = data;
            };
            $scope.skoring = "";
            $scope.namaPasen = "";
            findPasien.getListPatientGizi(dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD HH:mm:00'), dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD HH:mm:59'), $scope.noCm).then(function(e) {
                var data = [];

                for (var key in e.data.data) {
                    if (e.data.data.hasOwnProperty(key)) {
                        var element = e.data.data[key];
                        if (element.strukOrder.pegawaiOrder === undefined)
                            element.strukOrder.pegawaiOrder = {
                                namaExternal: 'Belum ada dokter'
                            }
                    }
                }
                for (var key in e.data.data) {
                    if (e.data.data.hasOwnProperty(key)) {
                        var element = e.data.data[key];
                        if (element.warna == 'merah') {
                            element.myStyle = {
                                'background-color': '#FF0000'
                            };
                            element.statusAntrian = "Menunggu";
                        } else if (element.statusAntrian === 'DIPANGGIL_SUSTER') {
                            element.myStyle = {
                                'background-color': '#33e46a'
                            };
                            element.statusAntrian = "Kirim Sebagian Menu";
                        } else if (element.statusAntrian === 'DIPANGGIL_DOKTER') {
                            element.myStyle = {
                                'background-color': '#89c9f7'
                            };
                            element.statusAntrian = "Kirim Semua Menu";
                        }
                        // else if (element.statusAntrian === 'SELESAI_HASIL')
                        //     element.statusAntrian = "Persiapan";
                        else if (element.statusAntrian === 'PERSIAPAN') {
                            element.myStyle = {
                                'background-color': '#FF8DFC'
                            }
                            element.statusAntrian = "Menunggu Periksa";
                        } else if (element.statusAntrian === 'PERIKSA') {
                            element.myStyle = {
                                'background-color': '#1da214'
                            };
                            element.statusAntrian = "Selesai Periksa";
                        } else if (element.statusAntrian === 'SAMPLE_DI_TERIMA') {
                            element.myStyle = {
                                'background-color': '#FF3BAD'
                            };
                            element.statusAntrian = "Sample di Terima";
                        } else if (element.statusAntrian === 'SAMPLE_DI_AMBIL') {
                            element.myStyle = {
                                'background-color': '#FF7E3B'
                            };
                            element.statusAntrian = "Sample di Ambil";
                        } else if (element.statusAntrian === 'VALIDASI_ANALIS') {
                            element.myStyle = {
                                'background-color': '#f6a8ff'
                            };
                            element.statusAntrian = "Release Analis";
                        } else if (element.statusAntrian === 'VALIDASI') {
                            element.myStyle = {
                                'background-color': '#f6a8ff'
                            };
                            element.statusAntrian = "Release Dokter";
                        }



                        //
                        //
                        //
                        data.push(element);
                    }
                }
                data = _.sortBy(data, function(e) {
                    if (e.strukOrder.noOrderIntern == undefined)
                        return 100000;
                    return -1 * parseInt(e.strukOrder.noOrderIntern.substring(1));
                });
                $scope.listDataPasien =
                    new kendo.data.DataSource({
                        data: data
                    });
                $scope.listDataPasien.fetch(function(e) {
                    var temp = [];
                    var listData = ModelItem.beforePost(this._data, true);
                    for (var key in listData) {
                        if (this._data.hasOwnProperty(key)) {
                            var element = this._data[key];
                            if (angular.isFunction(element) === false && key !== "_events" && key !== "length") {
                                {
                                    debugger;
                                    temp.push(element);
                                }

                            }
                        }
                    }
                    $scope.listPasien = temp;
                    cacheHelper.set('listGizi', temp);
                    $scope.listSkoring = temp;
                    var giziDetailSet = $scope.listSkoring
                    for (var i = 0; i < giziDetailSet.length; i++) {
                        $scope.item.noRecam = giziDetailSet[i].antrianPasienDiPeriksa.noRec
                        $scope.item.tglRegis = giziDetailSet[i].tglInputData
                    }

                    var vartglinputdata = $scope.listSkoring
                    for (var i = 0; i < vartglinputdata.length; i++) {
                        var ctglinputgrid = vartglinputdata[i].tglInputData
                        var ctglinputgridc = dateHelper.formatDate(ctglinputgrid, ' DD-MM-YYYY')
                        var tglinputgrid = ctglinputgridc



                    }
                    $scope.putih.tglinputgrid = tglinputgrid;

                });
            });



            /*$scope.kajianAwal = cacheHelper.get("kajianAwal");
             if ($scope.kajianAwal === undefined)
             $scope.kajianAwal = {};*/
            /*findPasien.getByNoCM($scope.noCM).then(function(data) {
             $rootScope.currentPasien = data.data.data;
             $scope.pasien = data.data.data;
             });*/


            $scope.item = {};
            $scope.putih = {};

            findPasien.GetRadioSkoring().then(function(e) {
                $scope.ListStatusSkoring = e.data;
                $scope.skoring = $scope.ListStatusSkoring.name;
            });
            $scope.tglAwal = new Date($scope.tglAwal.getFullYear(), $scope.tglAwal.getMonth(), $scope.tglAwal.getDate(), 0, 0, 0);

            /*findPasien.getSkriningGizi().then(function(e) {
             e.data.data
             })

             socket.on('DaftarAntrianGizi', function(data) {
             $scope.refresh();
             });*/

            $scope.refresh = function() {
                cacheHelper.set('tglAwalGizi', $scope.tglAwal);
                cacheHelper.set('tglAkhirGizi', $scope.tglAkhir);
                findPasien.getListMonitorSkorSearch(dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD'), dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD'), $scope.namaPasen, $scope.skoring).then(function(e) {
                    var data = [];
                    for (var key in e.data.data.papSkriningGizi) {
                        if (e.data.data.papSkriningGizi.hasOwnProperty(key)) {
                            var element = e.data.data.papSkriningGizi[key];
                            data.push(element);
                        }
                    }

                    $scope.listDataGiziPasien =
                        new kendo.data.DataSource({
                            data: data
                        });

                    $scope.listDataGiziPasien.fetch(function(e) {
                        var temp = [];
                        for (var key in this._data) {
                            if (this._data.hasOwnProperty(key)) {
                                var element = this._data[key];

                                if (angular.isFunction(element) === false && key !== "_events" && key !== "length")
                                    temp.push(element);
                            }
                        }

                        $scope.listSkoring = ModelItem.beforePost(temp, true);
                        cacheHelper.set('listGizi', temp);
                    });
                });
            };



            $scope.KlikSelesai = function(noRecPas, noRec, tgls, noCM, data) {
                $scope.item = data;
                debugger;
                var tgl = dateHelper.formatDate(tgls, 'YYYY-MM-DD HH:mm:ss');

                findPasien.getSkriningGizi(noRec, tgl).then(function(e) {
                    if (e.data.data.PapSkriningGizi[0] != undefined) {
                        $scope.item.PapSkriningGizi = e.data.data.PapSkriningGizi[0];
                        $scope.item.noRec = $scope.item.PapSkriningGizi.noRec;
                        $scope.item.beratBadan = $scope.item.PapSkriningGizi.beratBadan;
                        $scope.item.lingkarKepala = $scope.item.PapSkriningGizi.lingkarKepala;
                        $scope.item.tinggiBadan = $scope.item.PapSkriningGizi.tinggiBadan;
                        $scope.item.TotalSkor = $scope.item.PapSkriningGizi.totalSkor;
                        $scope.item.tglInputData = $scope.item.tglInputData;
                        saveSelesaiAsesment();
                        /*if (!$scope.$$phase)
                         $scope.$apply();*/
                    }
                });

                function saveSelesaiAsesment() {
                    var vnoRec = noRecPas
                    var vberatBadan = $scope.item.beratBadan
                    var vlingkarKepala = $scope.item.lingkarKepala
                    var vtinggiBadan = $scope.item.tinggiBadan
                    var vtglInputData = Date.parse(tgls)
                    var vstatus = "Ok"
                    var vskor = $scope.item.TotalSkor
                    var vtglinput = Date.parse($scope.item.tglInputData)
                    $scope.pasien = {
                        noRec: noRec
                    }
                    managePasien.saveFinishAssasmenent($scope.pasien, vnoRec, vberatBadan, vlingkarKepala, vtinggiBadan, vtglInputData, vstatus, vskor, vtglinput).then(function(e) {
                        $scope.isNext = true;
                        $scope.kajianAwal.skriningGizi = $scope.item;
                        cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    });
                }
            };
            /*socket.on('DaftarAntrianGizi', function(data) {
             $scope.refresh();
             });*/

            $scope.refresh();
            $scope.notDetail = true;
            if ($state.current.name === 'Gizi.Queue' || $state.current.name === 'Gizi.Sample' || $state.current.name === 'Radiologi.Result' || $state.current.name === 'Gizi.Take') {
                $scope.notDetail = false;
            }

            $scope.title = $state.params.title;
            if ($scope.title === undefined)
                $scope.title = "Monitoring Evaluasi";

            $scope.selected = function(noRecPasienDaftar, noRec, tglReg, noCm, tglRegis) {
                var tglRegistrasi = dateHelper.formatDate(tglReg, 'YYYY-MM-DD HH:mm:ss');
                $state.go('dashboardpasien.SkriningGiziEdit', {
                    noCM: noCm,
                    noRec: noRec,
                    tanggal: tglRegistrasi

                })
            };
        }
    ]);
});