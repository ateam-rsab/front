define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('HeaderPAPSkriningGiziCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', '$mdDialog', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, $mdDialog, findPasien, cacheHelper, ManagePasien, dateHelper) {
        
            //$rootScope.listActive -> data listMenu
            //ModelItem.setActiveMenu($rootScope.listActive, "PemeriksaanKesehatan");

            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            //$scope.noRecPap = window.localStorage.getItem('noRecPap');
            debugger;
            $scope.title = "Status Skrining Gizi";
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuSkrining = true;
            $scope.noCM = $state.params.noCM;
            $scope.dataVOloaded = true;
            $scope.now = new Date();

            $scope.item = {};
            $scope.item.noRec = "";

            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                debugger;
                $scope.item = ModelItem.beforePost(data.data, true);
                $scope.noCm = data.data.pasien.noCm;
                // $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);

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
            
            $scope.arrSkriningGiziNeo = [
                { "name": "Berat Badan", "nilai": "", "type": "numeric", "ket": "Kg", "noRec": "" },
                { "name": "Tinggi Badan", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" },
                { "name": "Lingkar Kepala", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" }
            ];
            $scope.arrSkriningGiziAnak = [
                { "name": "Berat Badan", "nilai": "", "type": "numeric", "ket": "Kg", "noRec": "" },
                { "name": "Tinggi Badan", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" },
                { "name": "Lingkar Kepala", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" },
                { "name": "Status Gizi", "nilai": "", "type": "numeric", "ket": "", "noRec": "" }
            ];
            $scope.arrSkriningGiziDewasa = [
                { "name": "Berat Badan", "nilai": "", "type": "numeric", "ket": "Kg", "noRec": "" },
                { "name": "Tinggi Badan", "nilai": "", "type": "numeric", "ket": "Kg", "noRec": "" },
                { "name": "Lingkar Kepala", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "", "visible": false },
                { "name": "Index Masa Tubuh", "nilai": "", "type": "numeric", "ket": "Kg / m2", "noRec": "" },
                { "name": "Status Gizi", "nilai": "", "type": "numeric", "ket": "", "noRec": "" }
            ];

            $scope.DataSourceSkriningGizi=function(){
                var noCm = $state.params.noCM;
                var tglAwal = "";
                var tglAkhir = "";
                var status = 2;

                findPasien.getTandaVitals(noCm, tglAwal, tglAkhir, status).then(function(e) {
                    debugger;
                    var dataSkriningGizi = e.data[0];

                    $scope.arrSkriningGiziNeo[0].nilai=dataSkriningGizi.beratBadan;
                    $scope.arrSkriningGiziNeo[1].nilai=dataSkriningGizi.tinggiBadan;
                    $scope.arrSkriningGiziNeo[2].nilai=dataSkriningGizi.lingkarKepala;

                    $scope.arrSkriningGiziAnak[0].nilai=dataSkriningGizi.beratBadan;
                    $scope.arrSkriningGiziAnak[1].nilai=dataSkriningGizi.tinggiBadan;
                    $scope.arrSkriningGiziAnak[2].nilai=dataSkriningGizi.lingkarKepala;

                    $scope.arrSkriningGiziDewasa[0].nilai=dataSkriningGizi.beratBadan;
                    $scope.arrSkriningGiziDewasa[1].nilai=dataSkriningGizi.tinggiBadan;
                    $scope.arrSkriningGiziDewasa[2].nilai=dataSkriningGizi.lingkarKepala;
                    $scope.arrSkriningGiziDewasa[3].nilai=dataSkriningGizi.imt;
                })
            };
            $scope.DataSourceSkriningGizi();
        }
    ]);
});