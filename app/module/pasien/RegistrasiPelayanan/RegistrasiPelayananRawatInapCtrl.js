define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('RegistrasiPelayananRawatInapCtrl', ['ManagePasien', '$scope', 'ModelItem', '$state', '$rootScope', '$timeout', '$window','FindPasien', 'FindPegawai', 'DateHelper', 'CetakHelper', 'ModelItem',
        function(managePasien, $scope, modelItem, $state, $rootScope, $timeout, $window, findPasien, findPegawai, dateHelper, cetakHelper, ModelItem) {
            $scope.item = {};
            $scope.items = {};
            $scope.model = {};
            $scope.jenisPasiens = [{
                id: 1, name: "Reguler"
            }, {
                id: 2, name: "Eksekutif"
            }]
            $scope.pegawai = modelItem.getPegawai();
            $scope.now = new Date();
            $scope.model.tglSEP = $scope.now;
            $scope.noCm = $state.params.noCm;
            $scope.listPasien = [];
            $scope.doneLoad = $rootScope.doneLoad;
            $scope.showFind = true;
            $scope.showTindakan = false;
            $scope.dataModelGrid = [];

            $scope.$watch('noCm', function(e) {
                if(e === '-') return;
                $scope.itemPatiens = findPasien.getDataPasien("", $scope.noCm, "", "", "");
                $scope.itemPatiens.then(function(e) {
                    $scope.listPasien = new kendo.data.DataSource({
                        data: e.data.data.listData,
                    });
                });
            });
            
            $scope.onSelect = function(a) {
                findPasien.getByNoCM(this._prev).then(function(e) {
                    $scope.item.pasien = modelItem.beforePost(e.data);
                    if (!$scope.$$phase)
                        $scope.$apply();
                });
            };
            var responData;
            $scope.$watch('item.kelompokPasien', function(e) {
                if (e === undefined) return;
                if (e.kelompokPasien === undefined) return;
                if (e.kelompokPasien.indexOf('Umum') < 0) {
                    $scope.asuransi=true;
                    $scope.model.namaPenjamin = $scope.item.kelompokPasien;
                    $scope.model.hubunganPeserta = $scope.sourceHubunganPasien[0];
                    if (e.kelompokPasien.indexOf('BPJS') >= 0) {
                        $scope.item.jenisPasien = $scope.jenisPasiens[0];
                        $scope.disableTipePelayanan = true;
                        $scope.noBPJS = true;
                        $scope.isCheckSJP = true;
                    }
                } else{
                    $scope.asuransi=false;
                    $scope.noBPJS = false;
                    $scope.isCheckSJP = false;
                    $scope.disableTipePelayanan = false;
                } 
                // if (e === undefined) return;
                // if (e.kelompokPasien === undefined) return;
                // if (e.kelompokPasien.indexOf('BPJS') >= 0) {
                //     debugger;
                //     $scope.disableTipePelayanan = true;
                //     $scope.item.jenisPasien = $scope.jenisPasiens[0];
                // } else{
                //     $scope.disableTipePelayanan = false;
                // }
                // if (e.kelompokPasien === "BPJS"){
                //     $scope.asuransi=true;
                // }else if(e.kelompokPasien === "Asuransi lain"){
                //     $scope.asuransi=true;
                // }else if(e.kelompokPasien === "Perusahaan"){
                //     $scope.asuransi=true;
                // }else{
                //      $scope.asuransi=false;
                // }
            })

            $scope.ruangans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
            $scope.pilihRuangan = function(id) {
                findPasien.getKelasByRuangan(id).then(function(e) {
                    $scope.listKelas = e.data.data.listData;
                })
                findPasien.findDokterDPJP(id).then(function(e){
                    $scope.dokters = new kendo.data.DataSource({
                        data: e.data
                    });
                })
            }
            $scope.$watch('item.kelas', function(e) {
                if (e === undefined) return;
                var kelasId = $scope.item.kelas.id;
                var ruanganId = $scope.item.ruangan.id
                findPasien.getKamarByKelas(kelasId, ruanganId).then(function(a) {
                    // $scope.listKamar = a.data.data.listData;
                    $scope.listKamar = _.filter(a.data.data.listData, function(v) {
                        return v.qtyBed > v.jumlaKamarIsi;
                    })
                })
            });
            $scope.$watch('item.kamar', function(e) {
                if (e === undefined) return;
                var kamarId = $scope.item.kamar.id;
                findPasien.getNoBed(kamarId).then(function(a) {
                    // $scope.listNoBed = a.data.data.listData;
                    $scope.listNoBed = _.filter(a.data.data.listData, function(v) {
                        return v.statusBed === "KOSONG";
                    })
                })
            });
            $scope.$watch('item.nomorTempatTidur', function(e) {
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
            $scope.find = function() {
                $state.go('registrasiPelayanan.find');
            }
            $scope.now = new Date();
            $scope.headerTemplate = '<table><tr><th width="150px">No. Rekam Medis</th><th width="150px">Nama Pasien</th><th width="300px">Alamat Pasien</th><th width="100px">Tanggal Lahir</th></tr></table>';
            $scope.template = '<table><tr><td width="150px">#: data.noCm #</td><td width="150px">#: data.namaPasien #</td><td width="300px">#: data.alamatPasien #</td><td width="100px">#: data.tanggalLahir #</td></tr></table>';
            $scope.asalrujukans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-asal-rujukan');
            // $scope.ruangans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan');
            modelItem.getDataDummyGeneric("KasusPenyakit", true, undefined, 10).then(function(data) {
                $scope.kasusPenyakits = data;
            });
            // $scope.$watch('item.tglRegistrasi', function(e) {
            //     if (e === undefined || $scope.item.ruangan === undefined) return;
            //     $scope.dokters = findPegawai.getDokterRawatJalan($scope.item.tanggalPendaftaran, e);
            //     $scope.item.tanggalPendaftaran = e;
            // });
            // $scope.$watch('item.ruangan', function(e) {
            //     if (e === undefined || $scope.item.tglRegistrasi === undefined) return;
            //     $scope.dokters = findPegawai.getDokterRawatJalan($scope.item.tanggalPendaftaran, e);
            // });


            // debugger;
            modelItem.getDataDummyGeneric("KelompokPasien", true, undefined, 10).then(function(data) {
                $scope.kelompokPasiens_bak = data;
            });
            $scope.Column = [{
                field: "noCm",
                title: "No Rekam Medik",
                aggregates: ["count"]
            }, {
                field: "namaLengkap",
                title: "Nama Pasien",
                aggregates: ["count"]
            }, {
                field: "jenisKelamin.jenisKelamin",
                title: "Jenis Kelamin",
                aggregates: ["count"]
            }, {
                field: "namaIbu",
                title: "Nama Ibu",
                aggregates: ["count"]
            }];

            var tempNoRec = 0;
            var tempNoCm = 0;

            $scope.cetak = function() {
                // cetak antrian
                // window.location = configuration.urlPrinting + "registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + tempNoRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize()
                // var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + tempNoRec);
                //     window.open(fixUrlLaporan, '', 'width=800,height=600')

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
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapBuktiPelayanan?noRegistrasi=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //cetakan langsung service VB6 by grh
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan=1&norec=' + $state.params.noRegistrasi + '&strIdPegawai=' + $scope.pegawai.id + '&view=false', function(response) {
                        // do something with response
                    });
                }
            }
            $scope.CetakSumList = function() {
                if($scope.item != undefined){
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapResume?noCm=" + tempNoCm + "&tglRegistrasi=" + new moment(new Date()).format('DD-MM-YYYY'));
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-summarylist=1&norec=' + responData.noCm + '&view=false', function(response) {
                        // do something with response
                    });

                }
            }
            $scope.tracerBon = function() {
                if($scope.item != undefined){
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapTracer?noRegistrasi=" + $state.params.noRegistrasi);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')
                    
                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-tracer=1&norec=' + responData.noRegistrasi + '&view=false', function(response) {
                        // do something with response
                    });
                }
            }
            $scope.cetakKartu = function() {
                if($scope.item != undefined){
                    // var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/kartuPasien?id=" + $scope.item.pasien.id);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')
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
                    // var noSep = e.data.data === null ? "2423432" : e.data.data;
                    // var fixUrlLaporan = cetakHelper.open("asuransi/asuransiBPJS?noSep=" + $scope.model.noSep);
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
            $scope.model.lakalantas = false;

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

            // $scope.arrSendiri = [];
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
            
            /*add_hanafi_03112016*/
            findPasien.getKelompokPasien().then(function(e) {
                $scope.kelompokPasiens = e.data.data
            })
            // datasource di ambil dari list kelompokPasiens
            // findPasien.getJenisPembiayaan().then(function(e){
            //     $scope.sourceJenisPembiayaan = e.data.data.listData;
            // });
            
            findPasien.getDataAsuransiPasien().then(function(e){
                $scope.isRouteLoading = true;
                $scope.sourceHubunganPasien = e.data.data.hubunganPesertaAsuransi;
                $scope.sourceUnitTugas = e.data.data.unitBagian;
                $scope.sourceKelasDitanggung = e.data.data.kelasDitanggung;
                // console.log(JSON.stringify($scope.sourceKelasDitanggung));
                $scope.sourceDiagnosa = e.data.data.diagnosa;
                $scope.sourceGolonganAsuransi = e.data.data.golonganAsuransi;
            }).then(function(){
                $scope.currentNoCm = $state.params.noCm;
                modelItem.get("RegistrasiPelayananVO").then(function(data) {
                    $rootScope.doneLoad = false;
                    $scope.doneLoad = false;
                    $scope.item = data;
                    $scope.item.tglRegistrasi = $scope.now;
                    if ($state.params.noCm !== undefined && $state.params.noCm !== '-') {
                        if ($scope.currentNoCm.indexOf('*') > 0) {
                            // findPasien.getReservasiPasienById($scope.currentNoCm.split('*')[0]).then(function(e) {
                            //     // $scope.item = e.data.data;
                            //     // $scope.item.pasien = {
                            //     //     namaPasien: $scope.item.namaPasien
                            //     // }
                            //     // $scope.item.pasien.desaKelurahan = $scope.item.desaKelurahan;
                            //     // $scope.item.pasien.tempatLahir = $scope.item.tempatLahir;
                            //     // $scope.item.namaAyah = $scope.item.namaAyah;
                            //     // $scope.item.pasien.tempatLahir = $scope.item.tempatLahir;
                            //     // $scope.item.kodePos = $scope.item.desaKelurahan.kodePos;
                            //     // $scope.findKodePos();
                            // });
                            findPasien.getByNoCM($scope.currentNoCm.split('*')[1]).then(function(e) {
                                $scope.item.pasien = modelItem.beforePost(e.data.data);
                                findPasien.getReservasiPasienById($scope.currentNoCm.split('*')[0]).then(function(e) {
                                    $scope.item.kelompokPasien = e.data.data.jenisPasien;
                                    $scope.item.ruangan = e.data.data.ruangan;
                                    $scope.item.pegawai = e.data.data.pegawai;
                                    if (e.data.data.type === "EKSEKUTIF") {
                                        $scope.item.jenisPasien = $scope.jenisPasiens[1];
                                    } else
                                        $scope.item.jenisPasien = $scope.jenisPasiens[0];
                                });
                                if (!$scope.$$phase)
                                    $scope.$apply();
                            });

                        } else {
                            findPasien.getByNoCM($scope.currentNoCm).then(function(e) {
                                $scope.item.pasien = modelItem.beforePost(e.data.data);
                                if (!$scope.$$phase)
                                    $scope.$apply();
                            });
                        }
                    }
                    if ($state.params.noRec) {
                        findPasien.getDataByNorecAntrian($state.params.noRec).then(function(e){
                            $scope.item.pasien = e.data.data;
                            $scope.item.pasien.tglLahir = new Date($scope.item.pasien.tglLahir);
                        });
                    }
                },
                function(error) {
                    $rootScope.doneLoad = false;
                    $scope.doneLoad = false;
                    window.messageContainer.error(error);
                });
            }).then(function(){
                $scope.isRouteLoading = false;
            });
    
            findPasien.getAsalRujukan().then(function(data){
                $scope.asalrujukans = data.data;
            });
            $scope.$watch('model.namaPenjamin', function(e){
                if (e === undefined) return;
                findPasien.getDataRekanan(e.id).then(function(data) {
                    $scope.sourceDataRekanan = data.data.data.listData;
                    $scope.model.institusiAsalPasien = $scope.sourceDataRekanan[0];
                });
                if($scope.model.namaPenjamin.kelompokPasien === "BPJS"){
                    $scope.SepCheck=false;
                }else{
                    $scope.SepCheck=true;
                }
            })
            // $scope.DataRekanan=function(){
            //     var id = $scope.model.namaPenjamin.id;
            //     findPasien.getDataRekanan(id).then(function(e) {
            //         $scope.sourceDataRekanan = e.data.data.listData;
            //         $scope.model.institusiAsalPasien =  $scope.sourceDataRekanan[0];
            //     });
            //     if($scope.model.namaPenjamin.kelompokPasien.indexO("BPJS") >= 0){
            //         $scope.SepCheck=false;
            //     }else{
            //         $scope.SepCheck=true;
            //     }
            // };
            // $scope.cekAsuransi = function(){
            //     if($scope.model.kelompokPasien.kelompokPasien.indexOf('Umum') >= 0){
            //         $scope.asuransi = false;
            //         // $scope.kelasPenjamin = true;
            //         // $scope.kelasBpjs = false;
            //         // $scope.noNonBPJS = true;
            //         $scope.noBPJS = false;
            //         $scope.isCheckSJP = false;
            //         // $scope.isNoCheckSJP = true;
            //     }else{
            //         $scope.asuransi = true;
            //         // $scope.kelasBpjs = true;
            //         // $scope.kelasPenjamin = false;
            //         // $scope.noNonBPJS = false;
            //         $scope.noBPJS = true;
            //         $scope.isCheckSJP = true;
            //         // $scope.isNoCheckSJP = false;
            //     }
            // }

            $scope.DataGolonganAsuransi=function(){
                var id = $scope.model.institusiAsalPasien.id;
                findPasien.getDataGolonganAsuransi(id, $state.params.noCm).then(function(e) {
                    $scope.sourceDataGolonganAsuransi = e.data.data.listData;
                });
            };

            // $scope.listSendiri = [
            //     {"id": 1, "name": "Sendiri"}
            // ];

            $scope.ListAsuransi = [
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

            $scope.check=function(){
                var id = $scope.model.namaPenjamin.id;
                if(id === 2 || id === 4){
                    $scope.checkKepesertaan();
                }
            }

            $scope.getRujukan=function(){
                // debugger;
                if($scope.item.asalRujukan != undefined){
                    $scope.model.asalRujukan = $scope.item.asalRujukan
                }
            }

            $scope.checkKepesertaan = function() {
                if ($scope.model.noKepesertaan === '' || $scope.model.noKepesertaan === undefined) return;
                if ($scope.model.sendiri === true) return;
                $scope.isLoading = true;

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
                        $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = e.data.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.data.response.peserta.provUmum.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.jenisKepesertaan = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoading = false;
                }, function(err) {
                    $scope.isLoading = false;
                });
            };

            // check kepesertaan berdasarkan NIK
            $scope.checkKepesertaanByNik = function() {
                if (!$scope.model.noIdentitas) return;
                if ($scope.model.sendiri) return;
                $scope.isLoading = true;

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
                        $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = e.data.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.data.response.peserta.provUmum.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.jenisKepesertaan = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoading = false;
                }, function(err) {
                    $scope.isLoading = false;
                });
            };

            
            // check kepesertaan berdasarkan SEP
            $scope.checkKepesertaanBySep = function() {
                if($scope.model.sendiri === true) return;
                if (!$scope.model.noSep) return;
                if ($scope.model.isCheckSJP) return;
                $scope.isLoading = true;

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
                        $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = e.data.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.data.response.peserta.provUmum.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.jenisKepesertaan = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
                        $scope.model.diagnosa = {
                            kdDiagnosa : e.data.data.response.diagAwal.kdDiag,
                            namaDiagnosa: e.data.data.response.diagAwal.nmDiag
                        };
                        if (e.data.data.response.lakaLantas.status === "0") {
                            // magics will appear
                        } else {
                            $scope.model.lakalantas = true;
                            $scope.model.lokasiLakaLantas = e.data.data.response.lakaLantasketerangan;
                        }
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoading = false;
                }, function(err) {
                    $scope.isLoading = false;
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
                    "model.tglRujukan|ng-model|Tgl Rujukan",
                    "model.diagnosa|ng-model|Diagnosa"
                ];
                var isValid = modelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    if($scope.model.lokasiLakaLantas !=undefined){
                       var lokasiLaka = $scope.model.lokasiLakaLantas;
                   }else{
                        var lokasiLaka = '';
                   }
                    var data = {
                        nokartu: $scope.noKartu,
                        tanggalRujukan: new moment($scope.model.tglRujukan).format('YYYY-MM-DD'),
                        noRujukan: $scope.model.noRujukan,
                        ppkRujukan: '0901R001',
                        isRawatJalan: $scope.model.rawatInap === true? 'F' : 'T',
                        catatan: '',
                        poliTujuan: $scope.item.ruangan.id,
                        kdDiagnosa: $scope.model.diagnosa.kdDiagnosa,
                        kelasRawat: $scope.model.kelasDitanggung.kdKelas,
                        noCm: $state.params.noCm,
                        lakaLantas: $scope.model.lakalantas === true ? 1 : 2,
                        lokasiLaka: lokasiLaka
                    };
                    managePasien.generateSep(data).then(function(e) {
                        // debugger;
                        if (e.data.data.metadata.code === "200" || e.data.data.metadata.code === "201"){
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
                    modelItem.showMessages(isValid.messages);
                }
            };  

            $scope.now = new Date();
            $scope.model.generateNoSEP=false;

            $scope.Save=function(){
                if($scope.model.generateNoSEP === true){
                    $scope.generateSep();
                }else{
                    $scope.Simpan();
                }
            }
            $scope.Simpan = function() {
                if ($scope.model.bertugas===undefined){
                    $scope.bertugas="";
                }else{
                    $scope.bertugas=$scope.model.bertugas.id;
                }

                // if ($scope.item.kelompokPasien.kelompokPasien === "BPJS"){
                //     if($scope.model.kelasDitanggung.kdKelas!==undefined){
                //         var kelasDiJamin = $scope.model.kelasDitanggung.kdKelas
                //     }else{
                //         var kelasDiJamin = $scope.model.kelasDitanggung.id
                //     }
                // }
                // if($scope.item.kelompokPasien.kelompokPasien === "Asuransi lain"){
                //     var kelasDiJamin = $scope.model.kelasDitanggung.id
                // }
                 if($scope.model.diagnosa===undefined){
                    var diagnosis = "-"
                }else{
                     var diagnosis = $scope.model.diagnosa.id
                }
                if($scope.model.noRujukan===undefined){
                    var noRujukan = "-";
                    $scope.model.noRujukan = noRujukan;
                }else{
                    var noRujukan = $scope.model.noRujukan
                }
                if($scope.kodeProvider !== undefined && $scope.namaProvider !== undefined){
                    var kodeProvider = $scope.kodeProvider;
                    var namaProvider = $scope.namaProvider;
                    var jenisKepesertaan = $scope.jenisKepesertaan;
                }else{
                    var kodeProvider = "";
                    var namaProvider = "";
                    var jenisKepesertaan = "";
                }
                if ($scope.item.kelompokPasien.kelompokPasien.indexOf("Umum") < 0){
                    if ($scope.model.sendiri === true) {
                        var listRawRequired = [
                            "item.ruangan|k-ng-model|Ruangan",
                            "item.asalRujukan|ng-model|Asal Rujukan",
                            "item.kelompokPasien|ng-model|Kelompok Pasien",
                            // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini",
                            "item.jenisPasien|k-ng-model|Jenis pelayanan",
                            "model.namaPeserta|ng-model|Nama peserta",
                            "model.namaPenjamin|k-ng-model|Nama Penjamin",
                            "model.institusiAsalPasien|ng-model|Institusi Asal Pasien",
                            "model.hubunganPeserta|ng-model|Hubungan Peserta",
                            // "model.noKepesertaan|ng-model|No Kepesertaan",
                            "model.kelasDitanggung|k-ng-model|Kelas Ditanggung",
                            "item.nomorTempatTidur|k-ng-model|Tempat tidur",
                            // "model.tglRujukan|ng-model|Tgl Rujukan"
                        ];
                    } else {
                        var listRawRequired = [
                            "item.ruangan|k-ng-model|Ruangan",
                            "item.asalRujukan|ng-model|Asal Rujukan",
                            "item.kelompokPasien|ng-model|Kelompok Pasien",
                            // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini",
                            "item.jenisPasien|k-ng-model|Jenis pelayanan",
                            "model.namaPenjamin|k-ng-model|Nama Penjamin",
                            "model.institusiAsalPasien|ng-model|Institusi Asal Pasien",
                            "model.noKepesertaan|ng-model|No Kepesertaan",
                            // "model.golonganAsuransi|ng-model|Golongan Asuransi",
                            "model.kelasDitanggung|k-ng-model|Kelas Ditanggung",
                            "model.asalRujukan|k-ng-model|Asal Rujukan",
                            "model.noRujukan|ng-model|No Rujukan",
                            "model.tglRujukan|ng-model|Tgl Rujukan",
                            "item.nomorTempatTidur|k-ng-model|Tempat tidur",
                            "model.diagnosa|ng-model|Diagnosa"
                        ];
                    }
                    var isValid = modelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
                        var TglLahir = dateHelper.getTanggalFormattedNew($scope.model.tglLahir);
                        var TglSEP = dateHelper.getTanggalFormattedNew($scope.model.tglSEP);
                        var dataAsuransi = {
                            "kdLastUnitBagian": $scope.bertugas,
                            "namaPeserta": $scope.model.namaPeserta,
                            "kelasDiJamin": $scope.model.kelasDitanggung,
                            // "golonganAsuransi": {
                            //     "id": $scope.model.golonganAsuransi.id
                            // },
                            "hubunganPeserta": {
                                "id": $scope.model.hubunganPeserta.id
                            },
                            "qAsuransi": $scope.model.namaPenjamin.id,
                            "kdPenjaminPasien": $scope.model.namaPenjamin.id,
                            "alamatLengkap":$scope.model.alamatPeserta,
                            "nikInstitusiAsal": $scope.model.institusiAsalPasien.id,
                            "tglLahir":  TglLahir,
                            "noIdentitas": $scope.model.noIdentitas,
                            "hubunganPesertaId": $scope.model.hubunganPeserta.id,
                            "noAsuransi": $scope.model.noKepesertaan,
                            "noCm": {
                                "id": $scope.item.pasien.id
                            },
                            "kdInstitusiAsal": $scope.model.institusiAsalPasien.id,
                            "jenisKelamin": {
                                "id": $scope.item.pasien.jenisKelamin.id
                            },
                            "ppkRujukan": "00010002",
                            "diagnosis": {
                                "id": diagnosis
                            },
                            "noKepesertaan": $scope.model.noKepesertaan,
                            "lakalantas": 0,
                            "tglRujukan": $scope.model.tglRujukan,
                            "noRujukan": $scope.model.noRujukan,
                            "noSep": $scope.model.noSep === undefined ? null : $scope.model.noSep,
                            "jenisPeserta": jenisKepesertaan,
                            "kdProvider": kodeProvider,
                            "nmProvider": namaProvider,
                            "diagnosa": {
                                "id": diagnosis
                            },
                            "tanggalSep": TglSEP
                        }
                        
                        modelItem.set("PasienVO", $scope.item);
                        $scope.item.isRegistrasiLengkap = 0;
                        $scope.item.isOnSiteService = 0;
                        var item = modelItem.beforePost($scope.item);

                        var dataRegistrasi = {
                            "pegawai": {
                                "id": item.pegawai === undefined ? undefined : item.pegawai.dokterId,
                            },
                            "isRegistrasiLengkap": item.isRegistrasiLengkap,
                            "isOnSiteService": item.isOnSiteService,
                            "tglRegistrasi": item.tglRegistrasi,
                            "jenisPelayanan": item.jenisPelayanan,
                            "kelompokPasien": {
                                "id": item.kelompokPasien.id
                            },
                            "ruangan": {
                                "id": item.ruangan.id,
                                "departemenId": item.ruangan.departemenId
                            },
                            "pasien": {
                                "id": item.pasien.id,
                                "pasienDaftar": {
                                    "noRec": item.pasien.pasienDaftar.noRec
                                },
                                "noCm": item.pasien.noCm
                            },
                            "noRecAntrianPasien": item.pasien.noRecAntrianPasien,
                            "asalRujukan": {
                                "id": item.asalRujukan.id
                            },
                            "kelas": {
                                "id": item.kelas.id
                            },
                            "kamar": {
                                "id": item.kamar.id
                            },
                            "nomorTempatTidur": $scope.item.nomorTempatTidur === undefined ? undefined : {
                                "id": $scope.item.nomorTempatTidur.id,
                                "nomorBed": $scope.item.nomorTempatTidur.nomorBed,
                                "statusBed": $scope.statusTempatTidur
                            }
                        }
                        if (dataRegistrasi.pegawai.id === undefined) {
                            delete dataRegistrasi.pegawai;
                        }
                        if (dataAsuransi.diagnosis.id === "-") {
                            delete dataAsuransi.diagnosis;
                        }
                        if(dataAsuransi.diagnosa.id === "-"){
                            delete dataAsuransi.diagnosa
                        }

                        var dataJson={
                            "registrasiPelayanan": dataRegistrasi,
                            "asuransiPasien": dataAsuransi
                        }
                        // console.log(JSON.stringify(dataJson));
                        // window.messageContainer.log('Data berhasil di simpan');
                        managePasien.saveAsuransiPasien(dataJson).then(function(e) {
                            responData = e.data.data;
                            $scope.isReport = true;
                            $scope.isReportPendaftaran = true;
                            $scope.isReportRawatJalan = true;
                            $scope.isNext = true; // hide button simpan
                            $scope.isAsuransi = true; // show button cetak SEP
                            // if (e.data.data.metadata.code === "200"){
                            //     modelItem.set("PasienVO", $scope.item);
                            //     $scope.item.isRegistrasiLengkap = 0;
                            //     $scope.item.isOnSiteService = 0;
                            //     var item = modelItem.beforePost($scope.item);
                            //     item.jenisPelayanan = $scope.item.jenisPasien.name;
                            //     managePasien.saveRegistrasiPelayanan(item).then(function(e) {
                            //         tempNoRec = e.data.data.noRecAntrian;
                            //         $scope.isReport = true;
                            //         if ($scope.currentNoCm.indexOf('*') > 0) {}
                            //         if (window.isPerjanjian !== undefined) {
                            //             findPasien.CheckNoReconfirm(window.isPerjanjian).then(function(e) {});
                            //         }
                            //     });
                            // }
                        });
                    } else {
                        modelItem.showMessages(isValid.messages);
                    }
                }else{
                    var listRawRequired = [
                        "item.ruangan|k-ng-model|Ruangan",
                        "item.kelas|k-ng-model|Kelas",
                        "item.asalRujukan|k-ng-model|Asal Rujukan",
                        "item.kelompokPasien|k-ng-model|Kelompok Pasien",
                        "item.jenisPasien|k-ng-model|Jenis pelayanan",
                        "item.nomorTempatTidur|k-ng-model|Tempat tidur"
                        // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini"
                        // "userPelapor|ng-model|User"
                    ];

                    var isValid = modelItem.setValidation($scope, listRawRequired);
                   
                    modelItem.set("PasienVO", $scope.item);
                    $scope.item.isRegistrasiLengkap = 0;
                    $scope.item.isOnSiteService = 0;
                    var item = modelItem.beforePost($scope.item);

                    item.jenisPelayanan = $scope.item.jenisPasien.name;
                    if(isValid.status){
                        var tmpData = {
                            "pegawai": {
                                "id": item.pegawai === undefined ? undefined : item.pegawai.dokterId
                            },
                            "isRegistrasiLengkap": item.isRegistrasiLengkap,
                            "isOnSiteService": item.isOnSiteService,
                            "tglRegistrasi": item.tglRegistrasi,
                            "jenisPelayanan": item.jenisPelayanan,
                            "kelompokPasien": {
                                "id": item.kelompokPasien.id
                            },
                            "ruangan": {
                                "id": item.ruangan.id,
                                "departemenId": item.ruangan.departemenId
                            },
                            "pasien": {
                                "id": item.pasien.id,
                                "pasienDaftar": {
                                    "noRec": item.pasien.pasienDaftar.noRec
                                },
                                "noCm": item.pasien.noCm
                            },
                            "noRecAntrianPasien": item.pasien.noRecAntrianPasien,
                            "asalRujukan": {
                                "id": item.asalRujukan.id
                            },
                            "kelas": {
                                "id": item.kelas.id
                            },
                            "kamar": {
                                "id": item.kamar.id
                            },
                            "nomorTempatTidur": $scope.item.nomorTempatTidur === undefined ? undefined : {
                                "id": $scope.item.nomorTempatTidur.id,
                                "nomorBed": $scope.item.nomorTempatTidur.nomorBed,
                                "statusBed": $scope.statusTempatTidur
                            }
                        }
                        if (tmpData.pegawai.id === undefined) {
                            debugger;
                            delete tmpData.pegawai;
                        }
                        
                        managePasien.saveRegistrasiPelayanan(tmpData).then(function(e) {
                            responData = e.data.data;
                            tempNoRec = e.data.data.noRecAntrian;
                            $state.params.noRegistrasi = e.data.data.noRegistrasi;
                            $scope.isNext = true;
                            $scope.isReport = true;
                            $scope.isReportPendaftaran = true;
                            $scope.isReportRawatJalan = true;
                            if ($scope.currentNoCm.indexOf('*') > 0) {}
                            if (window.isPerjanjian !== undefined) {
                                findPasien.CheckNoReconfirm(window.isPerjanjian).then(function(e) {});
                            }
                        });
                    } else {
                        modelItem.showMessages(isValid.messages);
                    }
                }
                
            };
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

            //input tindakan di pendaftaran pasien
            var pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            $scope.getHargaTindakan = function () {
                $scope.model.hargaTindakan = $scope.model.namaProduk.hargaSatuan;
            }
            $scope.listYaTidak = [
            {
                "id": 1, "name":"Ya"
            },
            {
                "id": 0, "name":"Tidak"
            }]
            $scope.hapusTransaksi = function(id){
                var raw = $scope.dataTindakan.data();
                var length = raw.length;
                var item, i;
                for(i=length-1; i>=0; i--){
                    item = raw[i];
                    if (item.no.toString() === id.toString()){
                        raw.remove(item);
                        //TODO call remote service to delete item....
                    }
                }
                // var data = $scope.dataSelectedRow;
                // $scope.dataTindakan.remove(data);
            };
            $scope.hapusAll = function(){
                debugger;
                $scope.dataTindakan = new kendo.data.DataSource({
                    data: []
                })
            };
            $scope.dataSelectedRow = {};
            $scope.dataTindakan = new kendo.data.DataSource({
                data: []
            });
            $scope.columnDataTindakan = [{
                "field": "noRec",
                "title": "",
                "hidden": true
            },{
                "field": "ruangan",
                "title": "",
                "hidden": true
            },{
                "field": "pasienDaftar",
                "title": "",
                "hidden": true
            },{
                "field": "no",
                "title": "<h3 align=center>No</h3>",
                "width": "80px"
            },{
                "field": "tglPelayanan",
                "title": "<h3 align=center>Tanggal</h3>",
                "width": "100px"
            },
            {
                "field": "produk",
                "title": "<h3 align=center>Tindakan</h3>",
                "width": "400px",
                "template": '#= produk.namaProduk #'
            },
            {
                "field": "hargaNetto",
                "title": "<h3 align=center>Harga Netto</h3>",
                "width": "100px",
                "attributes": {align:"center"}
            },
            {
                "field": "qty",
                "title": "<h3 align=center>Jumlah</h3>",
                "width": "70px",
                "attributes": {align:"center"}
            },{
                title: "<h5 align=center>Action</h5>",
                width: "70px",
                template: "<button class='btnTemplate1' style='width:50%' ng-click='hapusTransaksi(#=no#)'>Hapus</button>"
            },{
                "field": "pelayananPasienPetugasSet",
                "title": "",
                "hidden": true
            }];
            $scope.opsiGridTindakan = {
                columns: $scope.columnDataTindakan,
                pageable: true,
                selectable: "row",
                pageSizes: true
            };
            var id = 0;
            $scope.tambahTindakan = function() {
                var listRawRequired = [
                    "model.namaProduk|k-ng-model|Tindakan",
                    "model.jumlah|k-ng-model|Jumlah",
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    var tglPelayanan = dateHelper.getTanggalFormattedNew(new Date());
                    var grid = $('#grid').data("kendoGrid");
                    id += 1;
                    $scope.dataModelGrid[id] = {};

                    grid.dataSource.add({
                        "no": id,
                        "noRec": $scope.tempItem.pasienDaftar.noRec,
                        "tglPelayanan": tglPelayanan,
                        "ruangan" : $scope.tempItem.ruangan,
                        "produk": {
                            "id": $scope.model.namaProduk.produkId,
                            "namaProduk": $scope.model.namaProduk.namaProduk
                        },
                        "hargaNetto": $scope.model.hargaTindakan,
                        "qty" : $scope.model.jumlah,
                        "kelas" : $scope.tempItem.kelas,
                        "pasienDaftar": {
                            "noRec" : $scope.tempItem.noRec
                        },
                        "pelayananPasienPetugasSet": [{
                            "objectJenisPetugasPe": {
                                "id": 2
                            },
                            "mapPelayananPasienPetugasToPegawaiSet": [{
                                "id": pegawai.id,
                                "namaLengkap": pegawai.namaLengkap,
                                "jenisPegawai": pegawai.jenisPegawai.id
                            }]
                        }]
                    });
                    $scope.model.namaProduk = "";
                    $scope.model.hargaTindakan = "";
                    $scope.model.jumlah = "";
                }else{
                    ModelItem.showMessages(isValid.messages);
                }
            };
            $scope.inputTindakan = function(){
                if(responData) {
                    findPasien.getItem("registrasi-pelayanan/get-tindakan-pelayanan?noRec=4028821b5ea86945015ea896e1300003", true).then(function(dat){
                        $scope.listNamaBarang = dat.data.data.listData;
                    });
                    findPasien.getByNoRegistrasi("4028821b5ea86945015ea896e1300003").then(function(data) {
                        $scope.tempItem = ModelItem.beforePost(data.data, true);
                    });
                }
                $scope.showTindakan = true;
                // if(responData) {
                //     debugger;
                //     $state.go('registrasiPelayanan.inputTindakan',{
                //         noRec: responData.noRecAntrian === undefined ? "0000000" : responData.noRecAntrian,
                //         noRecRegistrasi: responData.noRec === undefined ? "0000000" : responData.noRec
                //     });
                // } else {
                //     messageContainer.error('Bad data')
                // }
            }
            $scope.SaveTindakan = function () {
                var listTindakan = $scope.dataTindakan._data;
                var dataTindakanFix = [];
                listTindakan.forEach(function(e){
                    var data ={
                        "noRec": e.noRec,
                        "tglPelayanan": e.tglPelayanan,
                        "ruangan" : e.ruangan,
                        "produk": {
                            "id": e.produk.id,
                            "namaProduk": e.produk.namaProduk
                        },
                        "hargaSatuan": e.hargaNetto,
                        "qty" : e.qty,
                        "kelas" : e.kelas,
                        "pasienDaftar": {
                            "noRec" : e.pasienDaftar.noRec
                        },
                        "pelayananPasienPetugasSet": e.pelayananPasienPetugasSet
                    }
                    dataTindakanFix.push(data);
                })
                managePasien.saveTindakan(JSON.stringify(dataTindakanFix)).then(function(e){
                    $scope.showTindakan = false;
                    $scope.dataTindakan = new kendo.data.DataSource({
                        data: [],
                        pageSize:5
                    });
                })
            }
            $scope.Cancel = function(){
                $scope.showTindakan = false
            }

        }
    ]);
});