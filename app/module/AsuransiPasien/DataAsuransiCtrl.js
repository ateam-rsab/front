// define(['initialize'], function(initialize) {
//     'use strict';
//     initialize.controller('KeluargaPasienCtrl', ['$rootScope', '$scope',
//     	function($rootScope, $scope) {
// 	        $scope.title = "ini page registrasi pasien baru ctrl";


//     }]);
// });

define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('DataAsuransiCtrl', ['DateHelper', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien',
        function(dateHelper, managePasien, $rootScope, $scope, ModelItem, $state, findPasien) {
            $scope.title = "ini page registrasi pasien baru ctrl";
            $scope.item = {};
            if ($scope.item.tglRujukan === undefined)
                $scope.item.tglRujukan = new Date();
            $scope.item.lakalantas = false;
            findPasien.getByNoRegistrasi($state.params.noRegister).then(function(e) {
                $scope.item.registrasi = e.data;
            });
            $scope.generateSep = function() {
                var data = {
                    nokartu: $scope.item.asuransi.noKartu,
                    tanggalRujukan: new moment('yyyy-MM-dd').format($scope.item.tglRujukan),
                    noRujukan: $scope.item.noRujukan,
                    ppkRujukan: '0901R001',
                    isRawatJalan: 'T',
                    catatan: '',
                    kdDiagbosa: $scope.item.diagnosis.kdDiagnosa,
                    kelasRawat: $scope.item.asuransi.kelasTanggungan.kdKelas,
                    lakaLantas: $scope.item.lakalantas === true ? 1 : 2,
                    noCm: $scope.item.registrasi.pasien.noCm
                };
                managePasien.generateSep(data).then(function(e) {
                    if (e.data.data.metadata.code === "200")
                        $scope.item.noSep = e.data.data.response;
                    else {
                        window.messageContainer.error(e.data.data.metadata.message)
                    }
                    $scope.isLoadingRujukan = false;
                }, function(err) {
                    $scope.isLoadingRujukan = false;
                });
            }
            $scope.checkRujukan = function() {
                if ($scope.noRujukan === '' || $scope.noRujukan === undefined) return;
                $scope.isLoadingRujukan = true;

                findPasien.checkRujukanBpjs($scope.noRujukan).then(function(e) {
                    if (e.data.data.metadata.code === "200") {
                        $scope.item.asuransi = e.data.data.response.peserta;
                        $scope.item.ppkRujukan = $scope.item.asuransi.provUmum.kdProvider + " - " + $scope.item.asuransi.provUmum.nmProvider;
                    } else {
                        window.messageContainer.error('')
                    }
                    $scope.isLoadingRujukan = false;
                }, function(err) {
                    $scope.isLoadingRujukan = false;
                });
            }
            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                $scope.listDiagnosa = data;
            });
            $scope.checkKepesertaan = function() {
                if ($scope.noKepesertaan === '' || $scope.noKepesertaan === undefined) return;
                $scope.isLoading = true;

                findPasien.checkKepesertaan($scope.noKepesertaan).then(function(e) {
                    if (e.data.data.metadata.code === "200") {
                        $scope.item.asuransi = e.data.data.response.peserta;
                        $scope.item.ppkRujukan = $scope.item.asuransi.provUmum.kdProvider + " - " + $scope.item.asuransi.provUmum.nmProvider;
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoading = false;
                }, function(err) {
                    $scope.isLoading = false;
                });
            }

            $scope.now = new Date();

            var tempNoSep = 0;
            $scope.cetak = function() {
                window.location = configuration.urlPrinting + "master/antrianPasienDiperiksa?noRec=" + tempNoSep;
            }

            $scope.Save = function() {
                if ($scope.item.noRujukan === undefined)
                    $scope.item.noRujukan = "00000000000000000";
                $scope.item.tanggalPendaftaran = moment(new Date($scope.item.registrasi.tglRegistrasi)).format('YYYY-MM-DD hh:mm:ss');
                $scope.item.pasien = $scope.item.registrasi.pasien;
                $scope.item.noKepesertaan = $scope.noKepesertaan;
                var data = $scope.item;
                data.asuransi = {
                    noKepesertaan: $scope.noKepesertaan,
                    pasien: $scope.item.registrasi.pasien,
                }
                managePasien.savePemakaianAsuransi(data).then(function(e) {
                    tempNoSep = e.data.data.noSep;
                });
            }
        }
    ]);
});