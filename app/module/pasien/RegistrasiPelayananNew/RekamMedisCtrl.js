define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('RekamMedisCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItemAkuntansi', 'CacheHelper',
        function ($rootScope, $scope, $state, dateHelper, modelItemAkuntansi, cacheHelper) {
            $scope.now = new Date();
            $scope.header = {};
            $scope.header.DataNoregis = '';
            $scope.checkNoregis =true
            var usia = ''
            var departemen = ''
            // $scope.header.Generate = true;
            // $scope.header.isChecked = true 
            $scope.getRekamMedisCheck = function() {
                $rootScope.getRekamMedisCheck($scope.checkNoregis);
            }
            // $scope.cekGetData(true);
            // $scope.Generate($scope.header.Generate);
            // $scope.Generate=true; 
            // norec Antrian Etateh
          
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'))
            $scope.isPerawat = true;
            // }
            // $rootScope.cekGetData = $scope.cekGetData()
            var getDataApd = function () {
                modelItemAkuntansi.getDataTableTransaksi('rekam-medis/get-apd/' + $state.params.noRec).then(function (e) {
                    if(e.statResponse) {
                        var result = e.result;
                        // result.umur = dateHelper.CountAge(new Date(result.tgllahir), new Date(result.tglregistrasi));
                        result.umur = dateHelper.CountAge(new Date(result.tgllahir), new Date());
                        var bln = result.umur.month,
                            thn = result.umur.year,
                            day = result.umur.day;
                        usia = (result.umur.year * 12) + result.umur.month;
                        departemen = result.objectdepartemenfk;
                        result.umur = thn + 'thn ' + bln + 'bln ' + day + 'hr '
                        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                        var firstDate = new Date(result.tgllahir);
                        var secondDate = new Date(result.tglregistrasi);
                        var countDay = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        
                        var setUsiaPengkajian = {
                            // 'hari': countDay,
                            'hari': day,
                            'umur': thn
                        }
                        $scope.header.generate = true;
        
                        $scope.header = result;
                        localStorage.setItem('nomorTelpPasien', result.notelepon)
                        localStorage.setItem('usiaPengkajian', JSON.stringify(setUsiaPengkajian));
                        localStorage.setItem('departemenPengkajian', departemen);
                        $scope.hideShowForm(setUsiaPengkajian, departemen);
                    }               
                });
            };
            getDataApd();
            $scope.nav = function (state) {
                $scope.currentState = state;
                var arrStr = {
                    0: $scope.header.nocm,
                    1: $scope.header.namapasien,
                    2: $scope.header.jeniskelamin,
                    3: $scope.header.noregistrasi,
                    4: $scope.header.umur,
                    5: $scope.header.kelompokpasien,
                    6: $scope.header.tglregistrasi,
                    7: $scope.header.norec,
                    8: $scope.header.norec_pd,
                    9: $scope.header.objectkelasfk,
                    10: $scope.header.namakelas,
                    11: $scope.header.objectruanganfk,
                    12: $scope.header.namaruangan,
                    13: $scope.header.DataNoregis
                }
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                cacheHelper.set('cacheRMelektronik', arrStr);
                cacheHelper.set('cacheCPPT', arrStr);
                cacheHelper.set('cachePengkajianPasien', arrStr);
                cacheHelper.set('OdontoGramDokterCtrl', arrStr);
                cacheHelper.set('cacheRekamMedis', arrStr);
                cacheHelper.set('cachePlanOfCare', arrStr);
                cacheHelper.set('cacheAsesmenGizi', arrStr);
                $state.go(state, $state.params);
                // console.log($scope.currentState);

            }

            // $scope.$watch('header.Generate', function (data) {
            //     if (!data) return;
            //     $scope.Generate(data);
            // })

            $scope.Generate = function (data) {

                if (data === true) {
                    $scope.header.DataNoregis = true;
                } else {
                    $scope.header.DataNoregis = false;
                }
            };
            // var aktif = window.localStorage.getItem('activeMenuPengkajian')
            // if (aktif == 'true') {
            //     // $scope.showMenuPengkajian = true;
            //     if (usia >= 1 && usia <= 216) { $scope.isAnak = true }
            //     if (usia >= 0 && usia < 1) { $scope.isNeonatal = true }
            //     if (usia >= 217) { $scope.isDewasa = true }
            //     if (departemen === 18 || departemen === 28) { $scope.isRawatJalan = true }
            //     if (departemen === 16 || departemen === 35) { $scope.isRawatInap = true }
            //     localStorage.removeItem('activeMenuPengkajian')

            // } else {
            //     // $scope.showMenuPengkajian = false;
            // }
            $scope.hideShowForm = function (usiaPengkajian, departemen) {
                // var usiaPengkajian = window.localStorage.getItem('usiaPengkajian')


                // var departemen = window.localStorage.getItem('departemenPengkajian')
                if (usiaPengkajian.hari >= 1 && usiaPengkajian.hari <= 31) { $scope.isNeonatal = true }
                if (usiaPengkajian.hari > 31 && usiaPengkajian.umur <= 17) { $scope.isAnak = true }
                if (usiaPengkajian.umur >= 18 && usiaPengkajian.umur <= 49) { $scope.isDewasa = true }
                if (usiaPengkajian.umur > 50) { $scope.isGeriatri = true }
                if (departemen == 18 || departemen == 28 || departemen == 24) { $scope.isRawatJalan = true }
                if (departemen == 16 || departemen == 35) { $scope.isRawatInap = true }

            }

        }
    ]);
});