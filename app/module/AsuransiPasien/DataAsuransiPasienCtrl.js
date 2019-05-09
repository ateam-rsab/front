define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('DataAsuransiPasienCtrl', ['DateHelper', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien',
        function(dateHelper, managePasien, $rootScope, $scope, ModelItem, $state, findPasien) {
            $scope.title = "ini page registrasi pasien baru ctrl";
            $scope.item = {};
            $state.params.json;
            if ($scope.item.tglRujukan === undefined)
                $scope.item.tglRujukan = new Date();
            $scope.item.lakalantas = false;
            $scope.disAnakKe = true;

            // findPasien.getByNoRegistrasi($state.params.noRegister).then(function(e) {
            //     $scope.item.registrasi = e.data;
            // });

            findPasien.getByNoCM($state.params.noCm).then(function(e) {
                debugger;
                $scope.item.pasien = e.data.data;
                $scope.sourcePasien = e.data.data;
                $scope.tglLahir = new Date(e.data.data.tglLahir);
            });

            // findPasien.getDataAsuransi(id, $state.params.noCm).then(function(e) {
            //     $scope.sourceAsuransiPasien = e.data.data;
            // });

            $scope.arrSendiri = [];
            $scope.Sendiri = function(id){
                debugger;
                if ($scope.item.sendiri === true) {
                    $scope.item.namaPeserta = $scope.sourcePasien.namaPasien;
                    $scope.item.tglLahir =  $scope.tglLahir;
                    $scope.item.noIdentitas =  $scope.sourcePasien.noIdentitas;
                    $scope.item.alamatPasien = $scope.sourcePasien.pasien;
                }else{
                    $scope.item.namaPeserta = "";
                    $scope.item.tglLahir =  "";
                    $scope.item.noIdentitas =  "";
                    $scope.item.alamatPasien = "";
                }
                debugger;
            };

            findPasien.getJenisPembiayaan().then(function(e){
                $scope.sourceJenisPembiayaan = e.data.data.listData;
            });

            findPasien.getDataAsuransiPasien().then(function(e){
                $scope.sourceHubunganPasien = e.data.data.hubunganPesertaAsuransi;
                $scope.sourceUnitTugas = e.data.data.unitBagian;
                $scope.sourceKelasDitanggung = e.data.data.kelasDitanggung;
                $scope.sourceDiagnosa = e.data.data.diagnosa;
                $scope.sourceGolonganAsuransi = e.data.data.golonganAsuransi;
            });
    
            findPasien.getAsalRujukan().then(function(data){
                $scope.asalrujukans = data.data;
            });

            $scope.DataRekanan=function(){
                var id = $scope.item.namaPenjamin.id;
                findPasien.getDataRekanan(id).then(function(e) {
                    $scope.sourceDataRekanan = e.data.data.listData;
                });
            };

            $scope.DataGolonganAsuransi=function(){
                var id = $scope.item.institusiAsalPasien.id;
                findPasien.getDataGolonganAsuransi(id, $state.params.noCm).then(function(e) {
                    $scope.sourceDataGolonganAsuransi = e.data.data.listData;
                });
            };

            $scope.listSendiri = [
                {"id": 1, "name": "Sendiri"}
            ];

            $scope.ListAsuransi = [
                {"id": "1", "name": "No. SJP Otomatis"}
            ];
            // ModelItem.getDataDummyGeneric("Sendiri", false).then(function(data) {
            //     $scope.listSendiri = data;
            // })
            // ModelItem.getDataDummyGeneric("Asuransi", false).then(function(data) {
            //     $scope.ListAsuransi = data;
            // })
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
            };

            findPasien.getDiagnosa().then(function(data) {
                $scope.listDiagnosa = data;
            });

            
            $scope.textAnakKe = function(){
                debugger;
                if($scope.item.hubunganPeserta.id === 3){
                    $scope.disAnakKe = false
                }else{
                    $scope.disAnakKe = true
                }
            };

            $scope.checkKepesertaan = function() {
                if ($scope.item.noKepesertaan === '' || $scope.item.noKepesertaan === undefined) return;
                $scope.isLoading = true;

                findPasien.checkKepesertaan($scope.item.noKepesertaan).then(function(e) {
                    if (e.data.data.metadata.code === "200") {
                        var tglLahir = new Date(e.data.data.response.peserta.tglLahir);
                        // $scope.item.asuransi = e.data.data.response.peserta.nama;
                        // $scope.item.ppkRujukan = $scope.item.asuransi.provUmum.kdProvider + " - " + $scope.item.asuransi.provUmum.nmProvider;
                        $scope.noKartu = e.data.data.response.peserta.noKartu;
                        $scope.item.namaPeserta = e.data.data.response.peserta.nama;
                        $scope.item.tglLahir = tglLahir;
                        $scope.item.noIdentitas = e.data.data.response.peserta.nik;
                        $scope.item.kelasDitanggung = e.data.data.response.peserta.kelasTanggungan;
                        $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.item.namaAsalRujukan = e.data.data.response.peserta.provUmum.kdProvider + " - " + e.data.data.response.peserta.provUmum.nmProvider;
                        
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoading = false;
                }, function(err) {
                    $scope.isLoading = false;
                });
            };

            $scope.arrNoSEP = [];
            $scope.NoSEP = function(){
                debugger;
                if ($scope.item.noSEP === true) {
                    var data = {
                        nokartu: $scope.noKartu,
                        tanggalRujukan: new moment('yyyy-MM-dd').format($scope.item.tglRujukan),
                        noRujukan: $scope.item.noRujukan,
                        ppkRujukan: '0901R001',
                        isRawatJalan: 'T',
                        catatan: '',
                        kdDiagbosa: $scope.item.diagnosa.kdDiagnosa,
                        kelasRawat: $scope.kelas,
                        noCm: $state.params.noCm
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
                }else{
                    $scope.item.noSep = "";
                }
                debugger;
            };
             $scope.generateSep = function() {
                var data = {
                    nokartu: $scope.noKartu,
                    tanggalRujukan: new moment('yyyy-MM-dd').format($scope.item.tglRujukan),
                    noRujukan: $scope.item.noRujukan,
                    ppkRujukan: '0901R001',
                    isRawatJalan: 'T',
                    catatan: '',
                    kdDiagbosa: $scope.item.diagnosis.kdDiagnosa,
                    kelasRawat: $scope.item.asuransi.kelasTanggungan.kdKelas,
                    // lakaLantas: $scope.item.lakalantas === true ? 1 : 2,
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
            };

            $scope.now = new Date();

            var tempNoSep = 0;
            $scope.cetak = function() {
                window.location = configuration.urlPrinting + "master/antrianPasienDiperiksa?noRec=" + tempNoSep;
            };

            $scope.Save = function() {
                debugger;
                var TglLahir = dateHelper.getTanggalFormattedNew($scope.item.tglLahir);
                debugger;
                var data = {
                    "kdLastUnitBagian": $scope.item.bertugas.id,
                    "namaPeserta": $scope.item.namaPeserta,
                    //"noTelpMobile": "",
                    "kelasDiJamin": {
                        "id": $scope.kelas
                    },
                    "golonganAsuransi": {
                        "id": $scope.item.golonganAsuransi.id
                      },
                    "hubunganPeserta": {
                        "id": $scope.item.hubunganPeserta.id
                    },
                    // "id": "",
                    "qAsuransi": $scope.item.namaPenjamin.id,
                    "kdPenjaminPasien": $scope.item.namaPenjamin.id,
                    // "tglAkhirBerlakuLast": "",
                    "alamatLengkap":$scope.item.alamatPeserta,
                    "nikInstitusiAsal": $scope.item.institusiAsalPasien.id,
                    "tglLahir":  TglLahir,
                    // "nipPns": "",
                    "noIdentitas": $scope.item.noIdentitas,
                    "hubunganPesertaId": $scope.item.hubunganPeserta.id,
                    "lastUnitBagian": {
                        "id" :$scope.item.bertugas.id
                    },
                    "noAsuransi": $scope.item.noKepesertaan,
                    // "pegawai": {
                    //     "id": ""
                    // },
                    "noCm": {
                        "id": $scope.sourcePasien.id
                    },
                    // "noAsuransiHead": $scope.item.noKepesertaan,
                    // "noTelpFixed": "",
                    "kdInstitusiAsal": $scope.item.institusiAsalPasien.id,
                    // "jenisKelaminId": $scope.sourcePasien.jenisKelaminId,
                    // "tglMulaiBerlakuLast": "",
                    "jenisKelamin": {
                        "id": $scope.sourcePasien.jenisKelamin.id,
                    }
                    // ,
                    // "kelasDiJaminId": $scope.kelas
                }
                managePasien.saveAsuransiPasien(data).then(function(e) {
                });
                managePasien.saveGawatDarurat(modelItem.beforePost($state.params.json)).then(function() {
                        debugger;
                    managePasien.saveRegistrasiPasienGawatDarurat(modelItem.beforePost($state.params.json));
                });
                // if ($scope.item.noRujukan === undefined)
                //     $scope.item.noRujukan = "00000000000000000";
                // $scope.item.tanggalPendaftaran = moment(new Date($scope.item.registrasi.tglRegistrasi)).format('YYYY-MM-DD hh=mm=ss');
                // $scope.item.pasien = $scope.item.registrasi.pasien;
                // $scope.item.noKepesertaan = $scope.noKepesertaan;
                // var data = $scope.item;
                // data.asuransi = {
                //     noKepesertaan= $scope.noKepesertaan,
                //     pasien= $scope.item.registrasi.pasien,
                // }
                // managePasien.savePemakaianAsuransi(data).then(function(e) {
                //     tempNoSep = e.data.data.noSep;
                // });
            }

        }
    ]);
});