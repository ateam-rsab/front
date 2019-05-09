define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DashboarPasienCtrl', ['ReportHelper', 'DateHelper', 'ManagePasien', 'SaveToWindow', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'CetakHelper',

        function(reportHelper, dateHelper, managePasien, saveToWindow, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, cetakHelper) {
            // debugger;
            $rootScope.listActive = {};
            $scope.noCM=$state.params.noCM;
            $scope.noRecPasienDaftar = $state.params.noRecPasienDaftar;
            $scope.noRecSOAP = $state.params.noRecSOAP;
            $rootScope.currentNoCm = $state.params.noCM;
            $scope.isRawatJalan = false;
            $scope.isRawatInap = false;
            var statusCode = ModelItem.getStatusUser();
            if (currentState.indexOf('DashboardSkriningUmum') > 0 || currentState.indexOf('DashboardSkriningKekhususan') > 0) 
                $scope.activeMenuDashboardPAP = localStorage.getItem('activeMenuDashboardPAP'); // initialize dashboard PAP active menu
            
            $rootScope.$watch('changeState', function(e) {
                $scope.currentState = e.name;
                if ($scope.currentState === 'dashboardpasien.pemeriksaanDetail') {
                    var arr = $(".breadcrum.main a");
                    var list = [];
                    var valid = false;
                    arr.each(function(index) {
                        if ($(this).is(':visible')) {
                            if (valid === true) {
                                nextState = $(this).attr('current');
                                valid = undefined;
                                window.localStorage.setItem('lastCurrent', nextState);
                            }
                            if (valid !== undefined) {
                                list.push({
                                    name: $(this).text(),
                                    value: $(this)
                                });
                                if ($scope.currentState === $(this).attr('current'))
                                    valid = true;
                            }
                        }
                    });
                } else if ($scope.currentState === 'dashboardpasien.pengkajianLanjutan') {
                    findPasien.getNorecKajianLanjutan($state.params.noRec).then(function(data) {
                        if(data.data.data !== null){
                            cacheHelper.set('idPengkajianLanjut', data.data.data.noRec);
                        }
                    })
                }

                var nextState = "";
                setTimeout(function() {
                    var arr = $(".breadcrum.main a");
                    var list = [];
                    var valid = false;
                    arr.each(function(index) {
                        if ($(this).is(':visible')) {
                            if (valid === true) {
                                nextState = $(this).attr('current');
                                valid = undefined;
                                window.localStorage.setItem('lastCurrent', nextState);
                            }
                            if (valid !== undefined) {
                                list.push({
                                    name: $(this).text(),
                                    value: $(this)
                                });
                                if ($scope.currentState === $(this).attr('current'))
                                    valid = true;
                            }
                        }
                    });
                    $rootScope.next = function() {
                        $state.go(window.localStorage.getItem('lastCurrent'), {
                            noCM: $scope.noCM,
                            tanggal: $state.params.tanggal,
                            noRec: $state.params.noRec,
                            noRecPasienDaftar: $state.params.noRecPasienDaftar,
                            noRecSOAP: $state.params.noRecSOAP
                        });
                    }

                    var arrDetail = $(".breadcrum.detail a");
                    var listDetail = [];
                    var validDetail = false;
                    var nextStateDetail = "";
                    arrDetail.each(function(index) {
                        if (validDetail === true) {
                            nextStateDetail = $(this).attr('current');
                            validDetail = undefined;

                        }
                        if (validDetail !== undefined) {
                            listDetail.push({
                                name: $(this).text(),
                                validDetail: $(this)
                            });
                            if ($scope.currentState === $(this).attr('current'))
                                validDetail = true;
                        }
                    });
                    $rootScope.nextDetail = function() {
                        $state.go(nextStateDetail, {
                            noCM: $scope.noCM,
                            tanggal: $state.params.tanggal,
                            noRec: $state.params.noRec,
                            noRecPasienDaftar: $state.params.noRecPasienDaftar,
                            noRecSOAP: $state.params.noRecSOAP
                        });
                    }
                }, 500);
            });
            ModelItem.initActiveMenu($rootScope.listActive, statusCode, $state.params.noRecSOAP);
            $scope.listActive = $rootScope.listActive;

            findPasien.checkInput($state.params.noRec).then(function(e) {
                var data = e.data.data;
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var element = data[key];
                        if (element > 0) {
                            $scope.listActive[key] = true;
                        }
                    }
                }
            })
            $scope.findData = function() {
                $state.go('dashboardpasien.pencarianPasien');
            }
            $scope.nextPemeriksaan = function() {
                $rootScope.next();
            }
            $scope.isDokter = ModelItem.getStatusUser() === "dokter" || ModelItem.getStatusUser() === "bedah";
            
            // debugger;
            $scope.hideCppt = true;
            if ($state.params.noRec !== undefined)
                findPasien.getPasienDaftar($state.params.noRec).then(function(e) {
                    $scope.hideCppt = e.data.data.isKajianAwal;
                });
            if (window.stateKajianAwal !== undefined) {
                window.localStorage.setItem('isKajianAwal', window.stateKajianAwal);
                $scope.hideCppt = window.stateKajianAwal;
            } else {
                $scope.hideCppt = window.localStorage.getItem('isKajianAwal') === 'true';
            }
            $rootScope.$watch('hideMenuKajianAwal', function(e) {
                if (e === undefined) return;
                $scope.hideCppt = e;
            });
            $rootScope.$watch('showMenu', function(e) {
                if (e === undefined) return;
                $scope.showMenu = e;
            });
            $rootScope.$watch('tanggal', function(e) {
                if (e === undefined) return;

                $scope.tanggal = e;
            });
            $rootScope.$watch('dpjp', function(e) {
                if (e === undefined) return;
                $scope.dpjp = e;
            });
            $scope.tanggal = $state.params.tanggal;

            $rootScope.$watch('showMenuPengkajianMedis', function(e) {
                if (e === undefined) return;
                $scope.showMenuPengkajianMedis = e;
            });
            $rootScope.$watch('showMenuDetail', function(e) {
                if (e === undefined) return;
                $scope.showMenuDetail = e;
            });
            $rootScope.$watch('showMenuPengkajianLanjutan', function(e) {
                if (e === undefined) return;
                $scope.showMenuPengkajianLanjutan = e;
            });
            $rootScope.showMenu = false;
            $rootScope.showMenuPengkajianMedis = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianLanjutan = false;
            // $scope.isNeonatus = ModelItem.getStatusUser() === 'neonatus';
            // $scope.isAnak = ModelItem.getStatusUser() === 'anak';

            /*ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
                debugger;
                $scope.listRuanganTujuans = _.filter(data, function(e) {
                    return e.kdRuangan === "36";
                });
                $scope.ruanganapa = $scope.listRuanganTujuan = $scope.listRuanganTujuans[0].id === "36"; 
            })*/

            $scope.ruanganapa = $state.params.ruangana === "36";
            // debugger;
            if ($state.params.noRec !== '-' && $state.params.noRec !== undefined) {
                // debugger;
                $scope.noRec = $state.params.noRec;
                findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                    // debugger;
                    $scope.item = ModelItem.beforePost(data.data, true);
                    // $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);
                    if ($scope.item.kamar !== null && $scope.item.noBed !== undefined)
                        $scope.item.noKamar = $scope.item.kamar.namaKamar + " - " + $scope.item.noBed; 
                    $scope.item.pasien.umurPasien = dateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                    var bln = $scope.item.pasien.umurPasien.month,
                        thn = $scope.item.pasien.umurPasien.year,
                        usia = ($scope.item.pasien.umurPasien.year * 12) + $scope.item.pasien.umurPasien.month;
                    if (usia >= 1 && usia <= 216) {$scope.isAnak = true}
                    if (usia >= 0 && usia < 1) {$scope.isNeonatal = true}
                    if (usia >= 217) {$scope.isDewasa = true}
                        
                    $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('DD-MM-YYYY HH:mm');

                    var departemen = data.data.ruangan.departemenId;
                    if (departemen === 18 || departemen === 28){$scope.isRawatJalan = true}
                    if (departemen === 16 || departemen === 35){$scope.isRawatInap = true}
                });
            }
            // if ($state.params.noCM !== '-' && $state.params.noCM !== undefined) {
            //     $scope.noCM = $state.params.noCM;   
            //     findPasien.getByNoCM($scope.noCM).then(function(data) {
            //         debugger;
            //         $scope.item = ModelItem.beforePost(data.data.data);
            //         $scope.item.age = dateHelper.CountAge($scope.item.tglLahir, new Date());
            //         $scope.item.tglRegistrasi = moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('DD-MM-YYYY');                    $scope.isNeonatal = $scope.item.age.year === 0;
            //         $scope.isAnak = ($scope.item.age.day > 28) || ($scope.item.age.year > 0 && $scope.item.age.year <= 17);
            //         $scope.isDewasa = $scope.item.age.year > 17;

            //         $scope.isNeonatal = $scope.item.age.day < 28 && $scope.item.age.year === 0 && $scope.item.age.month === 0;
            //         /*$scope.isAnak = $scope.item.age.day > 28 && $scope.item.age.day <= 6120;
            //         $scope.isDewasa = $scope.item.age.year > 657;*/
                    
            //     });
            // }
            $scope.value = "";
            $scope.title = "ini page pencarian pasien";
            $scope.item = {};
            window.noCm = undefined;

            $scope.onSelect = function(a) {
                $rootScope.currentPasien = a.sender._old;
            };

            $rootScope.isOpen = true;
            $scope.headerTemplate = '<table><tr><th width="100px">No. RM</th><th width="200px">Nama Pasien</th></tr></table>';
            $scope.template = '<table><tr><td width="100px">#: data.noCm #</td><td width="200px">#: data.namaLengkap #</td></tr></table>';

            $scope.NavToIdentitas = function() {
                $scope.currentPasien = cacheHelper.get('currentPasien');
                $state.go('dashboardpasien.identitas', {
                    noCM: $scope.item.pasien.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec : $state.params.noRec
                });
            };
            $scope.NavToAlergi = function() {
                $scope.currentPasien = cacheHelper.get('currentPasien');
                $state.go('dashboardpasien.alergi', {
                    noCM: $scope.item.pasien.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec : $state.params.noRec
                });
            };
            $scope.NavToDiagnosis = function() {
                $scope.currentPasien = cacheHelper.get('currentPasien');
                $state.go('dashboardpasien.diagnosis', {
                    noCM: $scope.item.pasien.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec: $scope.item.noRec 
                });
            };
            $scope.NavToStigma = function() {
                $scope.currentPasien = cacheHelper.get('currentPasien');
                $state.go('dashboardpasien.stigma', {
                    noCM: $scope.item.pasien.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec : $state.params.noRec
                });
            };
            $scope.NavToLayananMedik = function() {
                // debugger;
                $scope.currentPasien = cacheHelper.get('currentPasien');
                $state.go('dashboardpasien.layananMedik', {
                    noCM: $scope.item.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec: $state.params.noRec
                });
            };
            
            $scope.NavToLembarPengobatan = function() {
                // debugger;
                $scope.currentPasien = cacheHelper.get('currentPasien');
                $state.go('dashboardpasien.LembarPengobatan', {
                    noCM: $scope.item.pasien.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec: $state.params.noRec
                });
            };
            $scope.navigasiPap = function(state){
                $scope.currentPasien = cacheHelper.get('currentPasien');
                $scope.activeMenuDashboardPAP = state;
                localStorage.setItem('activeMenuDashboardPAP', state);
                $state.go(state, {
                    noCM: $scope.item.pasien.noCm,
                    tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec : $state.params.noRec,
                    pasienId : $state.params.pasienId,
                    kdPap : $state.params.kdPap
                });
            }
            //
            // $scope.pasiens = findPasien.findByNoCM('23243');

            $scope.GoTo = function(stateUrl) {
                // debugger;
                $state.go(stateUrl, {
                    noCM: $state.params.noCM,
                    tanggal:  moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    noRec: $state.params.noRec,
                    noRecPasienDaftar: $state.params.noRecPasienDaftar,
                    noRecSOAP: $state.params.noRecSOAP,
                    noRecRiwayatPap: $state.params.noRecRiwayatPap,
                    kdPap : $state.params.kdPap
                });
            };

            $scope.SaveSOAP = function(stateUrl) {

                var data = {
                    "noRec": $state.params.noRecSOAP,
                    "s": "",
                    "o": "",
                    "a": "",
                    "p": "",
                    "pasienDaftar": {
                        "noRec": $state.params.noRec
                    }
                }

                $scope.pasien = $scope.item;

                managePasien.saveSOAP($scope.pasien, dateHelper.toTimeStamp($state.params.tanggal), data).then(function(e) {

                });
            };
            // $scope.isRuangan = function(){
            //     var data = findPasien.getPasienDaftar($state.params.noRec);
            //     debugger;
            //     if (data.ruangan.departemenId === 18 || data.ruangan.departemenId === 28){
            //         data.then(function(e){
            //             $scope.isRawatInap = true;
            //         })
            //     }else{
            //         $scope.isRawatJalan = true;
            //     }
            // }
            // $scope.isRuangan();
            // if (data !== undefined)
            //     data.then(function(e) {
            //         $scope.isRawatInap = true;

            //     })
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                if ($state.params.noRecSOAP != undefined) {

                    var DataNoRecSoap = {
                        "noRecSOAP": $state.params.noRecSOAP,
                        "noRecPasienDaftar": $state.params.noRecPasienDaftar
                    }
                    window.localStorage.setItem('DataNoRecSoap', JSON.stringify(DataNoRecSoap));

                }
            });


            $scope.SaveSOAP = function() {
                findPasien.getSoap($scope.noCM, $state.params.tanggal).then(function(data) {

                    var pegawai = ModelItem.getPegawai();

                    if (data.statResponse) {
                        var dataSOAP = {
                            "noRec": JSON.parse(localStorage.getItem('DataNoRecSoap')).noRecSOAP,
                            "s": data.data.data.s,
                            "o": data.data.data.o,
                            "a": data.data.data.a,
                            "p": data.data.data.p,
                            "pasienDaftar": {
                                "noRec": $state.params.noRec
                            },
                            "pegawai": pegawai
                        }

                        $scope.pasien = $scope.item;

                        managePasien.saveSOAP($scope.pasien, dateHelper.toTimeStamp($state.params.tanggal), dataSOAP).then(function(e) {

                        });
                    } else {
                        window.messageContainer.error("Data SOAP tidak ditemukan");
                    }

                });
            }

            $scope.noRec = $state.params.noRec;
            
            $scope.cetakLaporan = function(){
                var dataLaporan = $state.params.kdPap, caseStr, fixUrlLaporan;
                if (dataLaporan) {
                    caseStr = dataLaporan.substring(0, 2);
                    switch (caseStr) {
                        case 'RJ':
                            if($scope.isAnak){
                                var fixUrlLaporan = cetakHelper.open("reporting/lapPengkajianAwalAnakRawatJalan?&kdPap="+ dataLaporan +"&noRec="+ $state.params.noRec);
                                window.open(fixUrlLaporan, '', 'width=800,height=600')
                            }
                            else if($scope.isDewasa){
                                var fixUrlLaporan = cetakHelper.open("reporting/lapPengkajianAwalDewasaRawatJalan?&kdPap="+ dataLaporan +"&noRec="+ $state.params.noRec);
                                window.open(fixUrlLaporan, '', 'width=800,height=600')
                            }
                            else if($scope.isNeonatal){
                                var fixUrlLaporan = cetakHelper.open("reporting/lapPengkajianAwalNeonatusRawatJalan?&kdPap="+ dataLaporan +"&noRec="+ $state.params.noRec);
                                window.open(fixUrlLaporan, '', 'width=800,height=600')
                            }
                            break;
                        case 'RI':
                            if($scope.isAnak){
                                var fixUrlLaporan = cetakHelper.open("reporting/lapPengkajianAwalAnakRawatInap?&kdPap="+ dataLaporan +"&noRec="+ $state.params.noRec);
                                window.open(fixUrlLaporan, '', 'width=800,height=600')
                            }
                            else if($scope.isDewasa){
                                // var fixUrlLaporan = cetakHelper.open("reporting/lapPengkajianAwalDewasaRawatInap?&kdPap="+ dataLaporan.noRec +"&noRec="+ $state.params.noRec);
                                // window.open(fixUrlLaporan, '', 'width=800,height=600');
                                messageContainer.log('Belum tersedia');
                            }
                            else if($scope.isNeonatal){
                                var fixUrlLaporan = cetakHelper.open("reporting/lapPengkajianAwalNeonatusRawatInap?&kdPap="+ dataLaporan +"&noRec="+ $state.params.noRec);
                                window.open(fixUrlLaporan, '', 'width=800,height=600')
                            }
                            break;
                        default:

                    }
                    // if(fixUrlLaporan != ""){
                    //     window.open(fixUrlLaporan, '_blank')
                    // }
                } else {
                    messageContainer.error('Data belum di pilih');
                }
                    

            }
        }
    ]);
});