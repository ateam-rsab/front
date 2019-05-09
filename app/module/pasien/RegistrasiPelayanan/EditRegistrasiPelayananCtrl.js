define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('EditRegistrasiPelayananCtrl', ['ManagePasien', '$scope', 'ModelItem', '$state', '$rootScope', '$timeout', '$window','FindPasien', 'FindPegawai', 'DateHelper', 'CetakHelper',
        function(managePasien, $scope, ModelItem, $state, $rootScope, $timeout, $window, findPasien, findPegawai, dateHelper, cetakHelper) {
            debugger;
            // trigger url Edit Registrasi atau edit kelas
            if ($scope.currentState.indexOf('Kelas') >= 0) {
                $scope.isEditKelas = true;
            }
            $scope.item = {};
            $scope.items = {};
            $scope.model = {};
            $scope.statusTempatTidur;
            $scope.jenisPasiens = [{
                id: 1, name: "Reguler"
            }, {
                id: 2, name: "Eksekutif"
            }]
            $scope.now = new Date();
            // $scope.model.tglSEP = $scope.now;
            $scope.noCm = $state.params.noCm;
            $scope.listPasien = [];
            $scope.doneLoad = $rootScope.doneLoad;
            findPasien.getListGeneric('Kelas&select=*').then(function(data){
                $scope.listKelasLayanan = data.data
            })
            // get data asuransi
            findPasien.getDataAsuransiPasien().then(function(e){
                $scope.isRouteLoading = true;
                $scope.sourceHubunganPasien = e.data.data.hubunganPesertaAsuransi;
                $scope.sourceUnitTugas = e.data.data.unitBagian;
                $scope.sourceKelasDitanggung = e.data.data.kelasDitanggung;
                $scope.sourceDiagnosa = e.data.data.diagnosa;
                $scope.sourceGolonganAsuransi = e.data.data.golonganAsuransi;
            }).then(function(){
                // get pasien data and bind data to header.html
                ModelItem.get("RegistrasiPelayananVO").then(function(data) {
                    $rootScope.doneLoad = false;
                    $scope.doneLoad = false;
                    $scope.item = data;
                    // $scope.item.tglRegistrasi = $scope.now;
                    if ($state.params.noCm !== undefined) {
                        findPasien.getByNoCM($state.params.noCm).then(function(e) {
                            $scope.item.pasien = ModelItem.beforePost(e.data.data);
                            if (!$scope.$$phase)
                                $scope.$apply();
                        });
                    }
                }, function(error) {
                    $rootScope.doneLoad = false;
                    $scope.doneLoad = false;
                    window.messageContainer.error(error);
                }).then(function(){
                    // get pasien's registration detail and bind to $scope.model
                    findPasien.getDataPelayananPasien($state.params.noRec).then(function(data){
                        $scope.model = data.data.data;
                        $scope.model.nomorTempatTidur = $scope.model.tempatTidur;
                        $scope.model.tglRegistrasi = new Date($scope.model.tglRegistrasi);
                        // $scope.model.namaPenjamin = $scope.model.kelompokPasien; //di set saat kelompok pasien bukan umum/pribadi
                        switch($scope.model.jenisLayanan){
                            case ("Reguler"):
                                $scope.model.jenisPasien = $scope.jenisPasiens[0];
                                break;
                            case ("Eksekutif"):
                                $scope.model.jenisPasien = $scope.jenisPasiens[1];
                                break;
                            default:
                                break;
                        }
                        if($scope.model.ruangan){
                            if ($scope.model.ruangan.departemenId === 16 || $scope.model.ruangan.departemenId === 35){
                                $scope.model.rawatInap = true;
                            };
                            $scope.pilihRuangan($scope.model.ruangan.id);
                        }
                        $scope.model.pegawai = {
                            "id": $scope.model.dokterPenanggungJawab.id,
                            "namaLengkap": $scope.model.dokterPenanggungJawab.namaLengkap,
                            "dokterId" : $scope.model.dokterPenanggungJawab.id,
                            "namaDokter": $scope.model.dokterPenanggungJawab.namaLengkap,
                        };
                        if ($scope.model.asuransi !== undefined){
                            // $scope.model.sendiri = true;
                            if($scope.model.asuransi.pemakaianAsuransi.lakalantas === 2)
                                $scope.model.lakalantas = false;
                            else
                                $scope.model.lakalantas = true;
                            $scope.model.diagnosa = $scope.model.asuransi.pemakaianAsuransi.diagnosis;
                            $scope.model.noSep = $scope.model.asuransi.pemakaianAsuransi.noSep;
                            $scope.model.tanggalSep = $scope.model.asuransi.pemakaianAsuransi.tanggalSep === undefined ? undefined : new Date($scope.model.asuransi.pemakaianAsuransi.tanggalSep);
                            $scope.model.tglRujukan = $scope.model.asuransi.pemakaianAsuransi.tglRujukan === undefined ? undefined : new Date($scope.model.asuransi.pemakaianAsuransi.tglRujukan);
                            $scope.model.noRujukan = $scope.model.asuransi.pemakaianAsuransi.noRujukan;
                            $scope.model.noKepesertaan = $scope.model.asuransi.asuransiPasien.noAsuransi;
                            $scope.model.namaPeserta = $scope.model.asuransi.asuransiPasien.namaPeserta;
                            $scope.model.tglLahir = new Date($scope.model.asuransi.pemakaianAsuransi.asuransiPasien.tglLahir);
                            $scope.model.noIdentitas = $scope.model.asuransi.asuransiPasien.noIdentitas;
                            $scope.model.alamatPeserta = $scope.model.asuransi.asuransiPasien.alamatLengkap;
                            $scope.model.hubunganPeserta = $scope.model.asuransi.asuransiPasien.hubunganPeserta;
                            $scope.model.kelasDitanggung = $scope.model.asuransi.asuransiPasien.kelasDiJamin;
                            $scope.model.namaAsalRujukan = $scope.model.asuransi.asuransiPasien.nmProvider;
                            $scope.model.institusiAsalPasien = {
                                id: parseInt($scope.model.asuransi.asuransiPasien.nikInstitusiAsal)
                            };
                        }
                    })
                    $scope.isRouteLoading = false;
                }, function(err){
                    $scope.isRouteLoading = false;
                });
                
            });

            var responData;
            $scope.$watch('model.kelompokPasien', function(e) {
                if (e === undefined) return;
                if (e.kelompokPasien === undefined) return;
                if (e.kelompokPasien.indexOf('Umum') < 0) {
                    $scope.asuransi=true;
                    $scope.model.namaPenjamin = $scope.model.kelompokPasien;
                    $scope.model.hubunganPeserta = $scope.sourceHubunganPasien[0];
                    $scope.item.jenisPasien = $scope.jenisPasiens[0];
                    // $scope.model.sendiri = true;
                    // $scope.Sendiri($scope.model.sendiri); //generate data pasien dar pasien daftar
                    if (e.kelompokPasien.indexOf('BPJS') >= 0) {
                        // $scope.model.sendiri = false;
                        // $scope.Sendiri($scope.model.sendiri); //generate data pasien dar pasien daftar
                        $scope.disableTipePelayanan = true;
                        $scope.noBPJS = true;
                        $scope.isCheckSJP = true;
                    } else {
                        // $scope.model.sendiri = true;
                        // $scope.Sendiri($scope.model.sendiri);
                        $scope.model.kelasDitanggung = $scope.sourceKelasDitanggung[5];
                        $scope.disableTipePelayanan = false;
                        $scope.noBPJS = false;
                        $scope.isCheckSJP = false;
                    }
                } else{
                    $scope.asuransi=false;
                    $scope.noBPJS = false;
                    $scope.isCheckSJP = false;
                    $scope.disableTipePelayanan = false;
                } 
                // if (e === undefined) return;
                // if (e.kelompokPasien === undefined) return;
                // if (e.kelompokPasien.indexOf('Umum') < 0) {
                //     $scope.asuransi=true;
                //     $scope.model.namaPenjamin = $scope.model.kelompokPasien;
                //     $scope.disableTipePelayanan = true;
                //     $scope.model.jenisPasien = $scope.jenisPasiens[0];
                //     $scope.model.hubunganPeserta = $scope.sourceHubunganPasien[0];
                // } else{
                //     $scope.asuransi=false;
                //     $scope.disableTipePelayanan = false;
                // }
            })
            ModelItem.getDataDummyGeneric("Ruangan", true, true, 500).then(function(data) {
                $scope.ruangans = data;
            });
            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                $scope.sourceDiagnosisPrimer = data;
            });
            $scope.cekRawatInap = function(data){
                $scope.model.pegawai = undefined;
                // debugger;
                if (data === true) {
                    $scope.ruangans = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
                } else if (data === false){
                    ModelItem.getDataDummyGeneric("Ruangan", true, true, 500).then(function(data) {
                        $scope.ruangans = data;
                    });
                } else {
                    return;
                }
            }
            $scope.pilihRuangan = function(id) {
                // get ruangan with condition (rawat jalan or rawat inap)
                $scope.model.pegawai = undefined; 
                var ruanganId = id;
                // if (!ruanganId) return;
                if ($scope.model.rawatInap === true) {
                    findPasien.getKelasByRuangan(ruanganId).then(function(e) {
                        $scope.listKelas = e.data.data.listData;
                    })
                    findPasien.findDokterDPJP(id).then(function(e){
                        $scope.dokters = new kendo.data.DataSource({
                            data: e.data
                        });
                        $scope.model.pegawai = {
                            "dokterId" : $scope.model.dokterPenanggungJawab.id,
                            "namaDokter": $scope.model.dokterPenanggungJawab.namaLengkap,
                        };
                    })
                } else {
                    if (!$scope.model.tglRegistrasi) return;
                    var doctor = findPegawai.getDokterRawatJalan($scope.model.tglRegistrasi, $scope.model.ruangan);
                    doctor.fetch(function() {
                        var temp = [];
                        for (var key in this._data) {
                            if (this._data.hasOwnProperty(key)) {
                                var element = this._data[key];
                                if (element.id !== undefined)
                                    temp.push(element.dokter);
                            }
                        }
                        $scope.dokters = new kendo.data.DataSource({
                            data: temp
                        });
                    });
                    $scope.model.pegawai = {
                        "id": $scope.model.dokterPenanggungJawab.id,
                        "namaLengkap": $scope.model.dokterPenanggungJawab.namaLengkap
                    };
                }
            }
            $scope.$watch('model.ruangan', function(e) {
                if (e === undefined) return;
                $scope.pilihRuangan(e.id);
            });
            $scope.$watch('model.kelas', function(e) {
                if (e === undefined) return;
                var kelasId = $scope.model.kelas.id;
                var ruanganId = $scope.model.ruangan.id
                findPasien.getKamarByKelas(kelasId, ruanganId).then(function(a) {
                    // $scope.listKamar = a.data.data.listData;
                    $scope.listKamar = _.filter(a.data.data.listData, function(v) {
                        return v.qtyBed > v.jumlaKamarIsi;
                    })
                })
            });
            $scope.$watch('model.kamar', function(e) {
                if (e === undefined) return;
                var kamarId = $scope.model.kamar.id;
                findPasien.getNoBed(kamarId).then(function(a) {
                    // $scope.listNoBed = a.data.data.listData;
                    $scope.listNoBed = _.filter(a.data.data.listData, function(v) {
                        return v.statusBed === "KOSONG";
                    })
                })
            });
            $scope.$watch('model.nomorTempatTidur', function(e) {
                if (e === undefined) return;
                findPasien.getListGeneric("StatusBed&select=*").then(function(data){
                    var ArrayStatusBed = data.data;
                    var result = $.grep(ArrayStatusBed, function(items){
                        return e.statusBed == items.statusBed;
                    });
                    if (result.length != 0) {
                        $scope.statusTempatTidur = result[0];
                        console.log(JSON.stringify($scope.statusTempatTidur));
                    };
                })

            });
            $rootScope.isOpen = true;
            $scope.now = new Date();
            $scope.headerTemplate = '<table><tr><th width="150px">No. Rekam Medis</th><th width="150px">Nama Pasien</th><th width="300px">Alamat Pasien</th><th width="100px">Tanggal Lahir</th></tr></table>';
            $scope.template = '<table><tr><td width="150px">#: data.noCm #</td><td width="150px">#: data.namaPasien #</td><td width="300px">#: data.alamatPasien #</td><td width="100px">#: data.tanggalLahir #</td></tr></table>';
            $scope.asalrujukans = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-asal-rujukan');
            ModelItem.getDataDummyGeneric("KasusPenyakit", true, undefined, 10).then(function(data) {
                $scope.kasusPenyakits = data;
            });


            // debugger;
            /*add_hanafi_03112016*/
            findPasien.getKelompokPasien().then(function(e) {
                $scope.kelompokPasiens = e.data.data
            })
            ModelItem.getDataDummyGeneric("KelompokPasien", true, undefined, 10).then(function(data) {
                $scope.kelompokPasiens_bak = data;
            });
            // $scope.$watch('noCm', function(e) {
            //     debugger;
            //     $scope.itemPatiens = findPasien.getDataPasien("", $scope.noCm, "", "", "");
            //     $scope.itemPatiens.then(function(e) {
            //         $scope.listPasien = new kendo.data.DataSource({
            //             data: e.data.data.listData,
            //         });
            //     });

            // });

            var tempNoRec = 0;
            var tempNoCm = 0;

            $scope.cetak = function() {
                //cetakan langsung service VB 6 by grh   
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktipendaftaran=1&norec=' + responData.noRegistrasi + '&view=false', function(response) {
                    // do something with response
                });
   
            }
            $scope.cetakGelang = function() {
                if($scope.item != undefined){
                    var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/gelangPasien?id=" + $scope.item.pasien.id);
                    window.open(fixUrlLaporan, '_blank')
                }
            }
            $scope.cetakBuktiLayanan = function() {
                if($scope.item != undefined){
                    //cetakan langsung service VB6 by grh
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan=1&norec=' + responData.noRegistrasi + '&view=false', function(response) {
                        // do something with response
                    });
                }
            }
            $scope.CetakSumList = function() {
                if($scope.item != undefined){
                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-summarylist=1&norec=' + responData.noCm + '&view=false', function(response) {
                        // do something with response
                    });

                }
            }
            $scope.tracerBon = function() {
                if($scope.item != undefined){
                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-tracer=1&norec=' + responData.noRegistrasi + '&view=false', function(response) {
                        // do something with response
                    });
                }
            }
            $scope.cetakKartu = function() {
                if($scope.item != undefined){
                    //cetakan langsung service VB 6 by grh   
                    var client = new HttpClient();
                    debugger;             
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-kartupasien=1&norec=' + $scope.item.pasien.id + '&view=false', function(response) {
                        // do something with response
                    });

                }
            }
            $scope.cetakSEP = function() {
                if($scope.item != undefined){
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                     //http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep=1&norec=1708000087&view=true   
                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep=1&norec=' + responData.noRegistrasi + '&view=false', function(response) {
                        // do something with response
                    });
                }
            }
            if ($scope.model.tglRujukan === undefined)
                $scope.model.tglRujukan = new Date();
            // $scope.model.lakalantas = false;

            // findPasien.getByNoRegistrasi($state.params.noRegister).then(function(e) {
            //     $scope.item.registrasi = e.data;
            // });

            // findPasien.getByNoCM($state.params.noCm).then(function(e) {
            //     $scope.model.pasien = e.data.data;
            //     $scope.sourcePasien = e.data.data;
            //     $scope.tglLahir = new Date(e.data.data.tglLahir);
            // });

            // findPasien.getDataAsuransi(id, $state.params.noCm).then(function(e) {
            //     $scope.sourceAsuransiPasien = e.data.data;
            // });

            $scope.arrSendiri = [];
            $scope.Sendiri = function(data){
                if (data === true) {
                    $scope.model.namaPeserta = $scope.item.pasien.namaPasien;
                    $scope.model.tglLahir =  $scope.item.pasien.tglLahir;
                    $scope.model.noIdentitas =  $scope.item.pasien.noIdentitas;
                    $scope.model.alamatPeserta = $scope.item.pasien.alamat.alamatLengkap;
                    // $scope.model.noSep="2345";
                    $scope.kelasBpjs = false;
                    $scope.kelasPenjamin = true;
                }else{
                    $scope.model.noKepesertaan="";
                    $scope.model.namaPeserta = "";
                    $scope.model.tglLahir =  "";
                    $scope.model.noIdentitas =  "";
                    $scope.model.alamatPeserta = "";
                    $scope.kelasBpjs = true;
                    $scope.kelasPenjamin = false;
                }
                $scope.disableSEP = data;
            };

            // findPasien.getJenisPembiayaan().then(function(e){
            //     $scope.sourceJenisPembiayaan = e.data.data.listData;
            // });
    
            // findPasien.getAsalRujukan().then(function(data){
            //     $scope.asalrujukans = data.data;
            // });

            // $scope.DataRekanan=function(){
            //     debugger;
            //     var id = $scope.model.namaPenjamin.id;
            //     findPasien.getDataRekanan(id).then(function(e) {
            //         $scope.sourceDataRekanan = e.data.data.listData;
            //     });
            //     if($scope.model.namaPenjamin.kelompokPasien === "BPJS" || $scope.model.namaPenjamin.kelompokPasien === "BPJS Non PBI "){
            //         $scope.SepCheck=false;
            //     }else{
            //         $scope.SepCheck=true;
            //     }
            // };
            $scope.$watch('model.namaPenjamin', function(e){
                if (e === undefined) return;
                findPasien.getDataRekanan(e.id).then(function(data) {
                    $scope.sourceDataRekanan = data.data.data.listData;
                    if(!$scope.model.institusiAsalPasien)
                        $scope.model.institusiAsalPasien = $scope.sourceDataRekanan[0];
                    $scope.model.institusiAsalPasien = $scope.model.asuransi.asuransiPasien.rekanan;
                });
                if($scope.model.namaPenjamin.kelompokPasien.indexOf("BPJS") >= 0){
                    $scope.SepCheck=false;
                }else{
                    $scope.SepCheck=true;
                }
            })
            $scope.cekAsuransi = function(){
                if($scope.model.kelompokPasien.kelompokPasien.indexOf('Umum') >= 0){
                    $scope.asuransi = false;
                    // $scope.kelasPenjamin = true;
                    // $scope.kelasBpjs = false;
                    // $scope.noNonBPJS = true;
                    $scope.noBPJS = false;
                    $scope.isCheckSJP = false;
                    // $scope.isNoCheckSJP = true;
                }else{
                    $scope.asuransi = true;
                    // $scope.kelasBpjs = true;
                    // $scope.kelasPenjamin = false;
                    // $scope.noNonBPJS = false;
                    $scope.noBPJS = true;
                    $scope.isCheckSJP = true;
                    // $scope.isNoCheckSJP = false;
                }
            }

            // $scope.DataGolonganAsuransi=function(){
            //     var id = $scope.model.institusiAsalPasien.id;
            //     findPasien.getDataGolonganAsuransi(id, $state.params.noCm).then(function(e) {
            //         debugger;
            //         $scope.sourceDataGolonganAsuransi = e.data.data.listData;
            //     });
            // };

            // $scope.listSendiri = [
            //     {"id": 1, "name": "Sendiri"}
            // ];

            $scope.listAsuransi = [
                {"id": "1", "name": "No. SEP Otomatis"}
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
                        $scope.model.asuransi = e.data.data.response.peserta;
                        $scope.model.ppkRujukan = $scope.model.asuransi.provUmum.kdProvider + " - " + $scope.model.asuransi.provUmum.nmProvider;
                    } else {
                        window.messageContainer.error('')
                    }
                    $scope.isLoadingRujukan = false;
                }, function(err) {
                    $scope.isLoadingRujukan = false;
                });
            };

            // findPasien.getDiagnosa().then(function(data) {
            //     $scope.listDiagnosa = data;
            // });
            $scope.SepCheck = true;
            $scope.disAnakKe = true;
            $scope.textAnakKe = function(){
                if($scope.model.hubunganPeserta.id === 3){
                    $scope.disAnakKe = false;
                }else{
                    $scope.model.anakKe="";
                    $scope.disAnakKe = true;
                }
            };

            // $scope.check=function(){
            //     var id = $scope.model.namaPenjamin.id;
            //     if(id === 2 || id === 4){
            //         $scope.checkKepesertaan();
            //     }
            // }

            // $scope.getRujukan=function(){
            //     // debugger;
            //     if($scope.model.asalRujukan != undefined){
            //         $scope.model.asalRujukan = $scope.item.asalRujukan
            //     }
            // }
            // $scope.$watch('model.generateNoSEP', function(e){
            //     if (e) {
            //         $scope.generateSep();
            //     }
            // })
            $scope.initTanggalAsuransi = function(){
                $scope.model.tanggalSep = $scope.now;
                $scope.model.tglRujukan = $scope.now;
            }
            $scope.checkKepesertaan = function() {
                debugger;
                if(!$scope.model.cekNomorPeserta) return;
                if ($scope.model.noKepesertaan === '' || $scope.model.noKepesertaan === undefined) return;
                if ($scope.model.sendiri === true) return;
                $scope.isLoadingNoKartu = true;

                findPasien.checkKepesertaan($scope.model.noKepesertaan).then(function(e) {
                    // debugger;
                    if (e.data.data.metadata.code === "200") {
                        var tglLahir = new Date(e.data.data.response.peserta.tglLahir);
                        // $scope.item.asuransi = e.data.data.response.peserta.nama;
                        // $scope.item.ppkRujukan = $scope.item.asuransi.provUmum.kdProvider + " - " + $scope.item.asuransi.provUmum.nmProvider;
                        $scope.model.noKepesertaan = $scope.noKartu = e.data.data.response.peserta.noKartu;
                        $scope.model.namaPeserta = e.data.data.response.peserta.nama;
                        $scope.model.tglLahir = tglLahir;
                        $scope.model.noIdentitas = e.data.data.response.peserta.nik;
                        // $scope.model.kelasDitanggung = e.data.data.response.peserta.kelasTanggungan;
                        $scope.model.kelasDitanggung = {
                            id: parseInt(e.data.data.response.peserta.kelasTanggungan.kdKelas),
                            kdKelas: e.data.data.response.peserta.kelasTanggungan.kdKelas,
                            nmKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                            namaKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                        };
                        // $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = e.data.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.data.response.peserta.provUmum.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.jenisKepesertaan = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoadingNoKartu = false;
                }, function(err) {
                    $scope.isLoadingNoKartu = false;
                });
            };
            $scope.checkKepesertaanByNik = function() {
                if (!$scope.model.cekNikPeserta) return;
                if (!$scope.model.noIdentitas) return;
                if ($scope.model.sendiri) return;
                $scope.isLoadingNIK = true;

                findPasien.checkKepesertaanByNik($scope.model.noIdentitas).then(function(e) {
                    // debugger;
                    if (e.data.data.metadata.code === "200") {
                        var tglLahir = new Date(e.data.data.response.peserta.tglLahir);
                        // $scope.item.asuransi = e.data.data.response.peserta.nama;
                        // $scope.item.ppkRujukan = $scope.item.asuransi.provUmum.kdProvider + " - " + $scope.item.asuransi.provUmum.nmProvider;
                        $scope.model.noKepesertaan = $scope.noKartu = e.data.data.response.peserta.noKartu;
                        $scope.model.namaPeserta = e.data.data.response.peserta.nama;
                        $scope.model.tglLahir = tglLahir;
                        $scope.model.noIdentitas = e.data.data.response.peserta.nik;
                        // $scope.model.kelasDitanggung = e.data.data.response.peserta.kelasTanggungan;
                        $scope.model.kelasDitanggung = {
                            id: parseInt(e.data.data.response.peserta.kelasTanggungan.kdKelas),
                            kdKelas: e.data.data.response.peserta.kelasTanggungan.kdKelas,
                            nmKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                            namaKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                        };
                        // $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = e.data.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.data.response.peserta.provUmum.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.jenisKepesertaan = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoadingNIK = false;
                }, function(err) {
                    $scope.isLoadingNIK = false;
                });
            };
            $scope.checkKepesertaanBySep = function() {
                if (!$scope.model.noSep) return;
                if ($scope.model.sendiri) return;
                if ($scope.model.isCheckSJP) return;
                $scope.isLoadingSEP = true;

                findPasien.getDetailSep($scope.model.noSep).then(function(e) {
                    if (e.data.data.metadata.code === "200") {
                        $scope.disableSEP = true;
                        var tglLahir = new Date(e.data.data.response.peserta.tglLahir);
                        // $scope.item.asuransi = e.data.data.response.peserta.nama;
                        // $scope.item.ppkRujukan = $scope.item.asuransi.provUmum.kdProvider + " - " + $scope.item.asuransi.provUmum.nmProvider;
                        // $scope.noKartu = e.data.data.response.peserta.noKartu;
                        $scope.model.noKepesertaan = $scope.noKartu = e.data.data.response.peserta.noKartu;
                        $scope.model.namaPeserta = e.data.data.response.peserta.nama;
                        $scope.model.tglLahir = tglLahir;
                        $scope.model.noIdentitas = e.data.data.response.peserta.nik;
                        // $scope.model.kelasDitanggung = e.data.data.response.peserta.kelasTanggungan;
                        $scope.model.kelasDitanggung = {
                            id: parseInt(e.data.data.response.peserta.kelasTanggungan.kdKelas),
                            kdKelas: e.data.data.response.peserta.kelasTanggungan.kdKelas,
                            nmKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                            namaKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                        };
                        // $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = e.data.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.data.response.peserta.provUmum.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.jenisKepesertaan = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
                        // $scope.model.diagnosa = {
                        //     kdDiagnosa : e.data.data.response.diagAwal.kdDiag,
                        //     namaDiagnosa: e.data.data.response.diagAwal.nmDiag
                        // };
                        $scope.model.diagnosa = e.data.data.response.diagAwal.kdDiag;
                        if (e.data.data.response.lakaLantas.status === "0") {
                            // magics will appear
                        } else {
                            $scope.model.lakalantas = true;
                            $scope.model.lokasiLakaLantas = e.data.data.response.lakaLantasketerangan;
                        }
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoadingSEP = false;
                }, function(err) {
                    $scope.isLoadingSEP = false;
                });
            };
            $scope.getKelasditanggung = function(id){
                debugger;
                findPasien.checkKepesertaan(id).then(function(e) {
                    if (e.data.data.metadata.code !== "200" || e.data.data.metadata.code !== "201") return;
                    $scope.model.noIdentitas = e.data.data.response.peserta.nik;
                    $scope.model.kelasDitanggung = {
                        id: parseInt(e.data.data.response.peserta.kelasTanggungan.kdKelas),
                        kdKelas: e.data.data.response.peserta.kelasTanggungan.kdKelas,
                        nmKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                        namaKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                    };
                    $scope.model.kelasDitanggung = $scope.reformatKelas($scope.model.kelasDitanggung);
                    $scope.model.jenisPeserta = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta
                })
            }
            $scope.checkDataRujukan = function() {
                if (!$scope.model.cekNomorRujukan) return;
                if ($scope.model.kelompokPasien.kelompokPasien.indexOf('BPJS')<0) return;
                if ($scope.model.noRujukan === '' || $scope.model.noRujukan === undefined) return;
                $scope.isLoadingRujukan = true;

                findPasien.checkNomorRujukanBpjs($scope.model.noRujukan).then(function(e) {
                    if (e.data.data.metadata.code === "200") {
                        // $scope.model.asuransi = e.data.data.response.item.peserta;
                        // $scope.model.ppkRujukan = $scope.model.asuransi.provUmum.kdProvider + " - " + $scope.model.asuransi.provUmum.nmProvider;
                        var item = e.data.data.response.item;
                        var tglLahir = new Date(item.peserta.tglLahir);
                        // $scope.item.asuransi = item.peserta.nama;
                        // $scope.item.ppkRujukan = $scope.item.asuransi.provUmum.kdProvider + " - " + $scope.item.asuransi.provUmum.nmProvider;
                        $scope.model.noKepesertaan = $scope.noKartu = item.peserta.noKartu;
                        $scope.model.namaPeserta = item.peserta.nama;
                        $scope.model.tglLahir = tglLahir;
                        $scope.model.noIdentitas = item.peserta.nik;
                        // $scope.kelas = item.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = item.provKunjungan.kdProvider;
                        $scope.namaProvider = item.provKunjungan.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        if(item.peserta.jenisPeserta.nmJenisPeserta) $scope.jenisKepesertaan = item.peserta.jenisPeserta.nmJenisPeserta; // dari bpjs kelas tanggungan = null
                        $scope.model.diagnosa = {
                            kdDiagnosa: item.diagnosa.kdDiag,
                            namaDiagnosa: item.diagnosa.nmDiag
                        };
                        $scope.model.tglRujukan = new Date(item.tglKunjungan);
                        // $scope.model.kelasDitanggung = item.peserta.kelasTanggungan;
                        if (item.peserta.kelasTanggungan.kdKelas) { // dari bpjs kelas tanggungan = null
                            $scope.model.kelasDitanggung = {
                                id: parseInt(item.peserta.kelasTanggungan.kdKelas),
                                kdKelas: item.peserta.kelasTanggungan.kdKelas,
                                nmKelas: item.peserta.kelasTanggungan.nmKelas,
                                namaKelas: item.peserta.kelasTanggungan.nmKelas,
                            };
                        } else {
                            $scope.getKelasditanggung($scope.model.noKepesertaan);
                        };
                    } else if (e.data.data.metadata.code === "201") {
                        window.messageContainer.error(e.data.data.metadata.message)
                    } else {
                        window.messageContainer.error('Terjadi Kesalahan')
                    }
                    $scope.isLoadingRujukan = false;
                }, function(err) {
                    $scope.isLoadingRujukan = false;
                });
            };
            // $scope.arrNoSEP = [];
            // $scope.NoSEP = function(){
            //     if ($scope.model.noSEP === true) {
            //         var data = {
            //             nokartu: $scope.noKartu,
            //             tanggalRujukan: new moment($scope.model.tglRujukan).format('YYYY-MM-DD'),
            //             noRujukan: $scope.model.noRujukan,
            //             ppkRujukan: '0901R001',
            //             isRawatJalan: $scope.model.rawatInap === true ? "F" : "T",
            //             catatan: '',
            //             kdDiagnosa: $scope.model.diagnosa.kdDiagnosa,
            //             kelasRawat: $scope.model.kelasDitanggung.kdKelas === undefined? $scope.model.kelasDitanggung.id : $scope.model.kelasDitanggung.kdKelas,
            //             noCm: $state.params.noCm
            //         };
            //         // console.log(JSON.stringify(data));
            //         managePasien.generateSep(data).then(function(e) {
            //             if (e.data.data.metadata.code === "200")
            //                 $scope.model.noSep = e.data.data.response;
            //             else {
            //                 window.messageContainer.error(e.data.data.metadata.message)
            //             }
            //             $scope.isLoadingRujukan = false;
            //         }, function(err) {
            //             $scope.isLoadingRujukan = false;
            //         });
            //     }else{
            //         $scope.model.noSep = "";
            //     }
            // };
            $scope.generateSep = function() {
                var listRawRequired = [
                    "item.ruangan|k-ng-model|Ruangan",
                    "item.asalRujukan|ng-model|Asal Rujukan",
                    "item.kelompokPasien|ng-model|Kelompok Pasien",
                    // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini",
                    "model.namaPenjamin|k-ng-model|Nama Penjamin",
                    "model.institusiAsalPasien|ng-model|Institusi Asal Pasien",
                    "model.noKepesertaan|ng-model|No Kepesertaan",
                    "model.kelasDitanggung|k-ng-model|Kelas Ditanggung",
                    "model.asalRujukan|k-ng-model|Asal Rujukan",
                    // "model.noRujukan|ng-model|No Rujukan",
                    "model.tglRujukan|k-ng-model|Tgl Rujukan",
                    "model.diagnosa|ng-model|Diagnosa"
                ];
                var kelasJaminan;
                if ($scope.model.rawatInap) {
                    listRawRequired.push("model.kelas|k-ng-model|Kelas Ditanggung");
                    switch($scope.model.kelas.namaKelas) {
                        case 'Kelas I':
                            kelasJaminan = "1";
                            break;
                        case 'Kelas II':
                            kelasJaminan = "2";
                            break;
                        case 'Kelas III':
                            kelasJaminan = "3";
                            break;
                        default:
                            kelasJaminan = $scope.model.kelas.id;
                            break;
                    }
                } else {
                    // listRawRequired.push("model.kelasDitanggung|k-ng-model|Kelas Ditanggung");
                    if ($scope.model.kelasDitanggung) {
                        switch($scope.model.kelasDitanggung.nmKelas) {
                            case 'Kelas I':
                                kelasJaminan = "1";
                                break;
                            case 'Kelas II':
                                kelasJaminan = "2";
                                break;
                            case 'Kelas III':
                                kelasJaminan = "3";
                                break;
                            default:
                                kelasJaminan = $scope.model.kelasDitanggung.kdKelas;
                                break;
                        }
                    }
                }
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    if($scope.model.lokasiLakaLantas !=undefined){
                       var lokasiLaka = $scope.model.lokasiLakaLantas;
                    }else{
                            var lokasiLaka = '';
                    }
                    var data = {
                        nokartu: $scope.noKartu,
                        tanggalRujukan: new moment($scope.model.tglRujukan).format('YYYY-MM-DD HH:mm:ss'),
                        noRujukan: $scope.model.noRujukan === undefined ? 0 : $scope.model.noRujukan,
                        ppkRujukan: '0901R001',
                        isRawatJalan: $scope.model.rawatInap === true? 'F' : 'T',
                        catatan: $scope.model.catatan,
                        poliTujuan: $scope.model.ruangan.id,
                        kdDiagnosa: $scope.model.diagnosa.kdDiagnosa,
                        kelasRawat: $scope.model.rawatInap === true ? kelasJaminan : "3",
                        noCm: $state.params.noCm,
                        lakaLantas: $scope.model.lakalantas === true ? 1 : 2,
                        lokasiLaka: lokasiLaka,
                        tglSep: new moment($scope.model.tglSEP).format('YYYY-MM-DD HH:mm:ss')
                    };
                    managePasien.generateSep(data).then(function(e) {
                        // debugger;
                        if (e.data.data.response){
                            $scope.model.noSep = e.data.data.response;
                            $scope.Simpan();
                        }else {
                            window.messageContainer.error(e.data.data.metadata.message)
                        }
                        $scope.isLoadingRujukan = false;
                    }, function(err) {
                        $scope.isLoadingRujukan = false;
                    });
                }else{
                    ModelItem.showMessages(isValid.messages);
                }
            };  

            $scope.now = new Date();
            $scope.model.generateNoSEP=false;
            $scope.Save = function(){
                if ($scope.model.kelompokPasien.kelompokPasien.indexOf('BPJS')>=0){
                    if($scope.model.tglRujukan && $scope.model.tanggalSep){
                        var tglRujuk = $scope.model.tglRujukan,
                            tglSepBpjs = $scope.model.tanggalSep;

                        if(tglRujuk.getTime() >= tglSepBpjs.getTime()){
                            messageContainer.error('TANGGAL SEP HARUS LEBIH KECIL DARI TGL RUJUKAN');
                            return;
                        }
                    }
                    if ($scope.model.diagnosa)
                        if ($scope.model.diagnosa.id===undefined){
                            findPasien.findDiagnosabyKode($scope.model.diagnosa.kdDiagnosa).then(function(e){
                                $scope.model.diagnosa = e.data.data[0];
                            })
                        }
                } else if ($scope.model.kelompokPasien.kelompokPasien.indexOf('Umum') >= 0) {
                    if ($scope.model.asuransi) {
                        delete $scope.model.asuransi
                    }
                }
                if ($scope.model.generateNoSEP === true){
                    $scope.generateSep();
                } else {
                    $scope.Simpan()
                }
            }
            $scope.Simpan=function(){
                var pegawaiId;
                if($scope.model.rawatInap === true){
                    if($scope.model.pegawai)
                        pegawaiId = $scope.model.pegawai.dokterId
                    else
                        pegawaiId = undefined 
                } else {
                    if($scope.model.pegawai)
                        pegawaiId = $scope.model.pegawai.id
                    else
                        pegawaiId = undefined
                }
                var tglRegis = $scope.model.tglRegistrasi,
                    tglLahir = $scope.model.tglLahir,
                    tglRujukan = $scope.model.tglRujukan,
                    tglSep = $scope.model.tanggalSep;
                if ($scope.model.kelompokPasien.kelompokPasien.indexOf('Umum') < 0){
                    var listRawRequired = [
                        "model.ruangan|k-ng-model|Ruangan",
                        "model.asalRujukan|k-ng-model|Asal Rujukan",
                        "model.kelompokPasien|k-ng-model|Kelompok Pasien",
                        "model.namaPenjamin|k-ng-model|Nama Penjamin",
                        "model.institusiAsalPasien|k-ng-model|Institusi Asal Pasien",
                        // "model.noKepesertaan|ng-model|No Kepesertaan",
                        "model.kelasDitanggung|k-ng-model|Kelas Ditanggung",
                        // "model.noRujukan|ng-model|No Rujukan",
                        
                    ];
                    if($scope.model.rawatInap) listRawRequired.push("model.kamar|k-ng-model|Kamar","model.nomorTempatTidur|k-ng-model|Tempat Tidur");
                    if(!$scope.model.sendiri && $scope.model.kelompokPasien.kelompokPasien.indexOf('BPJS') > 0) listRawRequired.push("model.noKepesertaan|ng-model|No Kepesertaan", "model.asalRujukan|k-ng-model|Asal Rujukan","model.tglRujukan|ng-model|Tanggal Rujukan","model.diagnosa|k-ng-model|Diagnosa");
                    var isValid = ModelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
                        var dataAsuransi = {
                            "kdLastUnitBagian": $scope.bertugas === undefined ? '' : $scope.bertugas,
                            "namaPeserta": $scope.model.namaPeserta,
                            "kelasDiJamin": {
                                "id": $scope.model.kelasDitanggung.id
                            },
                            "hubunganPeserta": {
                                "id": $scope.model.hubunganPeserta.id
                            },
                            "qAsuransi": $scope.model.namaPenjamin.id,
                            "kdPenjaminPasien": $scope.model.namaPenjamin.id,
                            "alamatLengkap":$scope.model.alamatPeserta,
                            "nikInstitusiAsal": $scope.model.institusiAsalPasien.id,
                            "rekanan": {id:$scope.model.institusiAsalPasien.id},
                            "tglLahir":  tglLahir.getTime(),
                            "noIdentitas": $scope.model.noIdentitas,
                            "hubunganPesertaId": $scope.model.hubunganPeserta.id,
                            "noAsuransi": $scope.model.noKepesertaan,
                            "noCm": {
                                "id": $scope.item.pasien.id,
                                "noCm": $scope.item.pasien.noCm,
                            },
                            "kdInstitusiAsal": $scope.model.institusiAsalPasien.id,
                            "jenisKelamin": {
                                "id": $scope.item.pasien.jenisKelamin.id
                            },
                            "ppkRujukan": $scope.model.namaAsalRujukan,
                            "diagnosis": $scope.model.diagnosa === undefined ? "-" : $scope.model.diagnosa,
                            "noKepesertaan": $scope.model.noKepesertaan,
                            "lakalantas": $scope.model.lakalantas === true ? 1 : 2,
                            "tglRujukan": tglRujukan.getTime(),
                            "noRujukan": $scope.model.noRujukan,
                            "noSep": $scope.model.noSep,
                            "jenisPeserta": $scope.model.jenisKepesertaan === undefined ? '' : jenisKepesertaan,
                            "kdProvider": $scope.model.kodeProvider === undefined ? '' : kodeProvider,
                            "nmProvider": $scope.model.namaProvider === undefined ? '' : namaProvider,
                            "diagnosa": $scope.model.diagnosa === undefined ? "-" : $scope.model.diagnosa,
                            "tanggalSep": tglSep.getTime(),
                        }
                        
                        ModelItem.set("PasienVO", $scope.item);
                        var item = ModelItem.beforePost($scope.item);
                        var dataRegistrasi = {
                            "pegawai": {
                                "id": pegawaiId,
                            },
                            "isRegistrasiLengkap": 0,
                            "isOnSiteService": 0,
                            "tglRegistrasi": tglRegis.getTime(),
                            "asalRujukan": {
                                "id": $scope.model.asalRujukan.id
                            },
                            "jenisPelayanan": $scope.model.jenisPasien.name,
                            "kelompokPasien": {
                                "id": $scope.model.kelompokPasien.id
                            },
                            "ruangan": {
                                "id": $scope.model.ruangan.id,
                                "departemenId": $scope.model.ruangan.departemenId
                            },
                            "pasien": {
                                "id": $scope.item.pasien.id,
                                "pasienDaftar": {
                                    "noRec": $scope.model.noRecPasienDaftar
                                },
                                "noCm": $scope.item.pasien.noCm
                            },
                            "noRecPasienDaftar": $scope.model.norecPasienDaftar,
                            "noRecAntrianPasien": $scope.model.noRecAntrianPasienDiperiksa,
                            "kelas": $scope.model.kelas,
                            "kamar": $scope.model.kamar,
                            "nomorTempatTidur": $scope.model.nomorTempatTidur === undefined ? undefined : {
                                "id": $scope.model.nomorTempatTidur.id,
                                "nomorBed": $scope.model.nomorTempatTidur.nomorBed,
                                "statusBed": $scope.statusTempatTidur
                            }
                        }
                        if (dataRegistrasi.pegawai.id === undefined) {
                            delete dataRegistrasi.pegawai;
                        }
                        if (dataAsuransi.diagnosis === "-") {
                            delete dataAsuransi.diagnosis;
                        }
                        if(dataAsuransi.diagnosa === "-"){
                            delete dataAsuransi.diagnosa
                        }

                        var dataJson={
                            "registrasiPelayanan": dataRegistrasi,
                            "asuransiPasien": dataAsuransi
                        }
                        // console.log(JSON.stringify(dataJson));
                        managePasien.editDataAsuransiPasien(dataJson).then(function(e) {
                            // magics goes here
                            responData = e.data.data;
                            $scope.isNext = true;
                            $scope.isReport = true;
                            $scope.isReportPendaftaran = true;
                            $scope.isAsuransi = true;
                            // $scope.isReportRawatJalan = true;
                        });
                    } else {
                        ModelItem.showMessages(isValid.messages);
                    }
                }else{
                    var listRawRequired = [
                        "model.ruangan|k-ng-model|Ruangan",
                        // "model.kelas|k-ng-model|Kelas",
                        "model.asalRujukan|ng-model|Asal Rujukan",
                        "model.kelompokPasien|ng-model|Kelompok Pasien",
                        // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini"
                        // "userPelapor|ng-model|User"
                    ];
                    if($scope.model.rawatInap) listRawRequired.push("model.kamar|k-ng-model|Kamar","model.nomorTempatTidur|k-ng-model|No Bed");
                    var isValid = ModelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
                        var tglRegis = $scope.model.tglRegistrasi,
                            tmpData = {
                            "pegawai": {
                                "id": pegawaiId
                            },
                            "isRegistrasiLengkap": 0,
                            "isOnSiteService": 0,
                            "tglRegistrasi": tglRegis.getTime(),
                            "asalRujukan": {
                                "id": $scope.model.asalRujukan.id
                            },
                            "jenisPelayanan": $scope.model.jenisPasien.name,
                            "kelompokPasien": {
                                "id": $scope.model.kelompokPasien.id
                            },
                            "ruangan": {
                                "id": $scope.model.ruangan.id,
                                "departemenId": $scope.model.ruangan.departemenId
                            },
                            "pasien": {
                                "id": $scope.item.pasien.id,
                                "pasienDaftar": {
                                    "noRec": $scope.model.noRecPasienDaftar
                                },
                                "noCm": $scope.item.pasien.noCm
                            },
                            "noRecPasienDaftar": $scope.model.norecPasienDaftar,
                            "noRecAntrianPasien": $scope.model.noRecAntrianPasienDiperiksa,
                            "kelas": $scope.model.kelas === undefined ? {id:1} : $scope.model.kelas,
                            "kamar": $scope.model.kamar,
                            "nomorTempatTidur": $scope.model.nomorTempatTidur === undefined ? undefined : {
                                "id": $scope.model.nomorTempatTidur.id,
                                "nomorBed": $scope.model.nomorTempatTidur.nomorBed,
                                "statusBed": $scope.statusTempatTidur
                            }
                        }
                        if (tmpData.pegawai.id === undefined) {
                            debugger;
                            delete tmpData.pegawai;
                        }
                        // console.log(JSON.stringify(tmpData));
                        managePasien.editRegistrasiPelayanan(tmpData).then(function(e) {
                            // magics goes here
                        });
                    } else {
                        ModelItem.showMessages(isValid.messages);
                    }  
                }
            }
            $scope.simpanInap = function(){
                alert('Simpan Rawat Inap')
            }
            $scope.simpanJalan = function(){
                alert('Simpan Rawat Jalan')
            }
            $scope.formatNum = {
                format: "#.#",
                decimals: 0
            }
            $scope.cetakLabel = function(tempNoCm){
                $scope.dats = {
                    qty: 0
                }
                $scope.winDialog.center().open();
            }
            $scope.pilihQty = function(data) {
                var listRawRequired = [
                    "dats.qty|k-ng-model|kuantiti"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    var qty = data.qty;
                    if(qty !== undefined){
                        // var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $state.params.noRegistrasi + "&qty=" + qty);
                        // window.open(fixUrlLaporan, '', 'width=800,height=600')
                        
                        //cetakan langsung service VB6 by grh
                        var client = new HttpClient();
                        client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-labelpasien=1&norec=' + responData.noRegistrasi + '&view=false&qty=' + qty, function(response) {
                            // do something with response
                        });

                    }
                    $scope.winDialog.close();
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };

            $scope.Next = function() {
                $state.go('registrasiPasienBaru', {
                });
            }

            var HttpClient = function() {
                this.get = function(aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function() { 
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open( "GET", aUrl, true );            
                    anHttpRequest.send( null );
                }
            }

        }
    ]);
});