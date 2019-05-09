define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CPPTCtrl', ['$scope', '$timeout', '$state', 'CacheHelper', 'DateHelper', 'ManagePhp',
        function ($scope, $timeout, $state, cacheHelper, dateHelper, ManagePhp) {

            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true
            $scope.isRouteLoading = false
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
            var cookie = document.cookie.split(';')
            var kelompokUser = cookie[0].split('=')
            var norec_apd = ''
            var norec_pd = ''
            localStorage.removeItem('activeMenuPengkajian');
            LoadCache();
            function LoadCache() {
                var chacePeriode = cacheHelper.get('cacheCPPT');
                if (chacePeriode != undefined) {
                    $scope.item.noMr = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    $scope.item.umur = chacePeriode[4]
                    $scope.item.kelompokPasien = chacePeriode[5]
                    $scope.item.tglRegistrasi = chacePeriode[6]
                    norec_apd = chacePeriode[7]
                    norec_pd = chacePeriode[8]
                    $scope.item.idKelas = chacePeriode[9]
                    $scope.item.kelas = chacePeriode[10]
                    $scope.item.idRuangan = chacePeriode[11]
                    $scope.item.namaRuangan = chacePeriode[12]
                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true
                    }
                }
            }

            $scope.back = function () {
                $state.go('DaftarAntrianDokterRajal')
            }
            $scope.showInputDiagnosaDokter = function () {
                var arrStr = cacheHelper.get('cacheCPPT');
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')
            }
            $scope.resep = function () {
                var arrStr = cacheHelper.get('cacheCPPT');
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }
            $scope.inputTindakanDokter = function () {
                var arrStr = cacheHelper.get('cacheCPPT')
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                $state.go('InputTindakanPelayananDokterRev', {
                    norecPD: norec_pd,
                    norecAPD: norec_apd,
                });
            }
            $scope.laboratorium = function () {
                var arrStr = cacheHelper.get('cacheCPPT')
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }
            $scope.radiologi = function () {
                var arrStr = cacheHelper.get('cacheCPPT')
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }
            $scope.rekamMedisElektronik = function () {
                var arrStr = cacheHelper.get('cacheCPPT');
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedisElektronik')
            }
            $scope.inputCPPT = function () {
                var arrStr = cacheHelper.get('cacheCPPT');
                cacheHelper.set('cacheCPPT', arrStr);
                $state.go('CPPT')
            }
            $scope.cppt = {}
            $scope.gridCPPT = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Dokter",
                        "width": "150px"
                    },
                    {
                        "field": "pegawaiasal",
                        "title": "Pegawai",
                        "template": '# if( pegawaiasal==null) {# - # } else {# #= pegawaiasal # #} #',

                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "width": "100px"
                    },
                    {
                        "command": [{
                            text: "Detail",
                            click: showDetail,
                            imageClass: "k-icon k-i-pencil"
                        }],
                        title: "",
                        width: "40px",
                    }
                ]
            };
            $scope.show = {}
            function showDetail(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.show = dataItem

                $scope.popUp.center().open();

            }
            $scope.gridCPPTnotVerif = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Pegawai",
                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "width": "100px"
                    },
                    {
                        "command": [{
                            text: "Detail",
                            click: showDetailss,
                            imageClass: "k-icon k-i-pencil"
                        }],
                        title: "",
                        width: "40px",
                    }
                ]
            };
            function showDetailss(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.show = dataItem

                $scope.popUp.center().open();

            }
            $scope.showSoap = function (bool, edit, verif) {

                if (bool && edit != true)
                    $scope.isShowSoap = true
                else
                    $scope.isShowSoap = false

                if (edit == true) {
                    if ($scope.dataCPPT == undefined) {
                        toastr.error('Pilih data dulu')
                        return
                    }

                    if ($scope.dataLogin.id != $scope.dataCPPT.pegawaifk && verif != true) {
                        toastr.error('Tidak bisa edit')
                        return
                    }
                    if (verif == true) {
                        if (kelompokUser[1] != 'dokter' && kelompokUser[1] != 'bedah' ) {
                            toastr.info('Verifikasi hanya untuk Dokter')
                            $scope.isShowSoap = false
                            return
                        }
                    }

                    $scope.isShowSoap = true
                    $scope.cppt.norec = $scope.dataCPPT.norec
                    $scope.cppt.s = $scope.dataCPPT.s
                    $scope.cppt.o = $scope.dataCPPT.o
                    $scope.cppt.a = $scope.dataCPPT.a
                    $scope.cppt.p = $scope.dataCPPT.p

                } else {
                    // buat Baru tapi ngambil data yg terakhir di input
                    if (kelompokUser[1] == 'dokter' && $scope.sourceCPPT._data.length > 0) {
                        var data = $scope.sourceCPPT._data[0]
                        // $scope.cppt.s = data.s
                        // $scope.cppt.o = data.o
                        // $scope.cppt.a = data.a
                        // $scope.cppt.p = data.p

                    } if (kelompokUser[1] == 'suster' && $scope.sourceCPPTnotVerif._data.length > 0) {
                        var data = $scope.sourceCPPTnotVerif._data[0]
                        // $scope.cppt.s = data.s
                        // $scope.cppt.o = data.o
                        // $scope.cppt.a = data.a
                        // $scope.cppt.p = data.p
                    }
                }
            }

            $scope.Save = function () {
                var s = ''
                if ($scope.cppt.s != undefined)
                    s = $scope.cppt.s
                var o = ''
                if ($scope.cppt.o != undefined)
                    o = $scope.cppt.o
                var a = ''
                if ($scope.cppt.a != undefined)
                    a = $scope.cppt.a
                var p = ''
                if ($scope.cppt.p != undefined)
                    p = $scope.cppt.p
                var jsonSave = {
                    "norec": $scope.cppt.norec !== undefined ? $scope.cppt.norec : '',
                    "noregistrasifk": norec_apd,
                    "pegawaifk": $scope.dataLogin.id,
                    "pegawaiasalfk": $scope.dataCPPT != undefined ? $scope.dataCPPT.pegawaifk : null,
                    "ruanganfk": $scope.item.idRuangan,
                    "pasienfk": $scope.item.noMr,
                    "s": s,
                    "o": o,
                    "a": a,
                    "p": p,

                }
                ManagePhp.postData(jsonSave, 'rekam-medis/post-cppt/save').then(function (e) {
                    loadCPPT()
                    $scope.cppt = {}
                    ManagePhp.postLogging('CPPT', 'Norec cppt_t',e.data.norec, 'SOAP').then(function (res) {
                    })
                });
            }
            $scope.delete = function () {
                if ($scope.dataCPPT == undefined) {
                    toastr.error('Pilih data dulu')
                    return
                }
                if ($scope.dataLogin.id != $scope.dataCPPT.pegawaifk) {
                    toastr.warning('Tidak bisa hapus data')
                    return
                }
                var deletes = {
                    'norec': $scope.dataCPPT.norec
                }
                ManagePhp.postData(deletes, 'rekam-medis/post-cppt/delete').then(function (e) {
                    loadCPPT()
                    $scope.cppt = {}
                });
            }
            loadCPPT()
            function loadCPPT() {
                let dataVerif = []
                let dataUnverif = []
                ManagePhp.getData('rekam-medis/get-cppt?nocm=' + $scope.item.noMr).then(function (dat) {
                    let array = dat.data.data;
                    for (let i in array) {
                        if (array[i].isverifikasi == true) {
                            dataVerif.push(array[i])
                        }
                        if (array[i].isverifikasi == false) {
                            dataUnverif.push(array[i])
                        }
                    }
                    $scope.sourceCPPT = new kendo.data.DataSource({
                        data: dataVerif
                    });
                    $scope.sourceCPPTnotVerif = new kendo.data.DataSource({
                        data: dataUnverif
                    });
                })
            }




        }
    ]);
});