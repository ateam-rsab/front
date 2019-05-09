define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('RegistrasiPelayananCtrl', ['ManagePasien', '$scope', 'ModelItem', '$state', '$rootScope', '$timeout', '$window','FindPasien', 'FindPegawai', 'DateHelper', 'CetakHelper', 'ModelItem','ManageSarprasPhp',
        function(managePasien, $scope, modelItem, $state, $rootScope, $timeout, $window, findPasien, findPegawai, dateHelper, cetakHelper, ModelItem,manageSarprasPhp) {
            $scope.now = new Date();
            $scope.loadPertama = function(){
                $scope.item = {};
                $scope.item.tglRegistrasi = $scope.now;
                $scope.model = {};
                $scope.model.tglSEP = $scope.now;
                $scope.model.tglRujukan = $scope.now;
                $scope.model.tglPelayanan = $scope.now;
                manageSarprasPhp.getDataTableTransaksi("registrasipasien/get-data-combo-reg-lama", false).then(function(data) {
                  $scope.dokters = data.data.dokter;
              })
                //$scope.dokters
            };
            $scope.loadPertama();
            // $scope.items = {};
            $scope.noCm = $state.params.noCm;
            $scope.cekRawatGabung = function(data){
                // opsi untuk pasien bayi
                // apakah pasien bayi satu ruangan dengan ibunya (true/false) ?
                $scope.model.rawatGabung = data;
            }
            $scope.formatJam24 = {
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
            };
            $scope.jenisPasiens = [{
                id: 1, name: "Reguler"
            }, {
                id: 2, name: "Eksekutif"
            }]
            $scope.pegawai = modelItem.getPegawai();
            
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
                    $scope.item.jenisPasien = $scope.jenisPasiens[0];
                    if (e.kelompokPasien.indexOf('BPJS') >= 0) {
                        $scope.disableTipePelayanan = true;
                        $scope.noBPJS = true;
                        $scope.isCheckSJP = true;
                    } else {
                        $scope.model.sendiri = true;
                        $scope.Sendiri($scope.model.sendiri);
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

            // modelItem.getDataDummyGeneric("Ruangan", true, true, 500).then(function(data) {
            //     $scope.ruangans = data;
            // });
            findPasien.getRuanganRJ().then(function(data){
                $scope.ruangans = data.data.data;
                // debugger;
            });
            $scope.cekRawatInap = function(data){
                $scope.item.pegawai = undefined;
                // debugger;
                if (data === true) {
                    // $scope.ruangans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
                    findPasien.getRuanganRI().then(function(data){
                        $scope.ruangans = data.data.data;
                        // debugger;
                    })
                } else if (data === false || data === undefined){
                    findPasien.getRuanganRJ().then(function(data){
                        $scope.ruangans = data.data.data;
                        // debugger;
                    })
                } else {
                    return;
                }
            }
            // $scope.$watch('item.ruangan', function(e) {
            //     for (var prop in e) {
            //         if (e.hasOwnProperty(prop)) {
            //             if (!$scope.item.tglRegistrasi) return;
            //             var doctor = findPegawai.getDokterRawatJalan($scope.item.tglRegistrasi, $scope.item.ruangan);
            //             debugger;
            //             doctor.fetch(function() {
            //                 var temp = [];
            //                 for (var key in this._data) {
            //                     if (this._data.hasOwnProperty(key)) {
            //                         var element = this._data[key];
            //                         if (element.id !== undefined)
            //                             temp.push(element.dokter);
            //                     }
            //                 }
            //                 $scope.dokters = new kendo.data.DataSource({
            //                     data: temp
            //                 });

            //             })
            //         }
            //     }
            // })
            $scope.pilihRuangan = function(id) {
                // get ruangan with condition (rawat jalan or rawat inap)
                $scope.item.pegawai = undefined; 
                var ruanganId = id;
                // if (!ruanganId) return;
                if ($scope.model.rawatInap === true) {
                    findPasien.getKelasByRuangan(ruanganId).then(function(e) {
                        $scope.listKelas = e.data.data.listData;
                    })
                    // findPasien.findDokterDPJP(id).then(function(e){
                    //     $scope.dokters = new kendo.data.DataSource({
                    //         data: e.data
                    //     });
                    // })
                } else {
                    if (!$scope.item.tglRegistrasi) return;
                    // var doctor = findPegawai.getDokterRawatJalan($scope.item.tglRegistrasi, $scope.item.ruangan);
                    // if(doctor._data.length > 0){
                    //     doctor.fetch(function() {
                    //         var temp = [];
                    //         for (var key in this._data) {
                    //             if (this._data.hasOwnProperty(key)) {
                    //                 var element = this._data[key];
                    //                 if (element.id !== undefined)
                    //                     temp.push(element.dokter);
                    //             }
                    //         }
                    //         $scope.dokters = new kendo.data.DataSource({
                    //             data: temp
                    //         });
                    //     });
                    // }
                }
            }
            $scope.$watch('item.kelas', function(e) {
                if (e === undefined) return;
                var kelasId = $scope.item.kelas.id;
                var ruanganId = $scope.item.ruangan.id
                findPasien.getKamarByKelas(kelasId, ruanganId).then(function(a) {
                    if($scope.model.rawatGabung){
                        $scope.listKamar = a.data.data.listData;
                    } else {
                        $scope.listKamar = _.filter(a.data.data.listData, function(v) {
                            return v.qtyBed > v.jumlaKamarIsi;
                        })
                    }
                });
            });
            $scope.$watch('item.kamar', function(e) {
                if (e === undefined) return;
                var kamarId = $scope.item.kamar.id;
                findPasien.getNoBed(kamarId).then(function(a) {
                    if($scope.model.rawatGabung){
                        $scope.listNoBed = a.data.data.listData;    
                    } else {
                        $scope.listNoBed = _.filter(a.data.data.listData, function(v) {
                            return v.statusBed === "KOSONG";
                        })
                    }
                })
            });
            $scope.reformatModel = function(data){
                findPasien.getListGeneric("StatusBed&select=*").then(function(lis){
                    var ArrayStatusBed = lis.data;
                    var result = $.grep(ArrayStatusBed, function(items){
                        return data.statusBed == items.statusBed;
                    });
                    if (result.length != 0) {
                        $scope.statusTempatTidur = result[0];
                        // console.log(JSON.stringify($scope.statusTempatTidur));
                    };
                })
            }
            // $scope.$watch('item.nomorTempatTidur', function(e) {
            //     if (e === undefined) return;
            //     findPasien.getListGeneric("StatusBed&select=*").then(function(data){
            //         var ArrayStatusBed = data.data;
            //         var result = $.grep(ArrayStatusBed, function(items){
            //             return e.statusBed == items.statusBed;
            //         });
            //         if (result.length != 0) {
            //             $scope.statusTempatTidur = result[0];
            //             console.log(JSON.stringify($scope.statusTempatTidur));
            //         };
            //     })
            //     debugger;
            // });
            $rootScope.isOpen = true;
            $scope.find = function() {
                $state.go('registrasiPelayanan.find');
            }
            // $scope.now = new Date();
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

            $scope.reformatKelas = function(item){
                switch(item.id) {
                    case 1: // kelas 1 BPJS
                        item = {
                            "id": 3,
                            "namaKelas": "KELAS I"
                        };
                        break;
                    case 3:
                        item = {
                            "id": 1,
                            "namaKelas": "KELAS III"
                        };
                        break;
                    default:
                        break;
                }
                return item;
            }
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
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan=1&norec=' + responData.noRegistrasi + '&strIdPegawai=' + $scope.pegawai.id + '&view=false', function(response) {
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
                    // debugger;             
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
            $scope.sourceJenisDiagnosisPrimer = [{"statusEnabled": true,"namaExternal": "Diagnosa Awal","kdProfile": 0,"qJenisDiagnosa": 5,
            "reportDisplay": "Diagnosa Pasca Bedah","jenisDiagnosa": "Diagnosa Awal","id": 5,"kodeExternal": "05","kdJenisDiagnosa": 5,"noRec": "5                               "
            }]
            $scope.ringkasanInOut = function(){
                if($scope.item != undefined){
                    findPasien.getDiagnosaNyNoRec(responData.noRecAntrian).then(function(e){
                        if (e.data.data.DiagnosaPasien.length > 0) {
                            $scope.cetakBro();
                        } else {
                            $scope.item.jenisDiagnosis = $scope.sourceJenisDiagnosisPrimer[0];
                            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                                $scope.sourceDiagnosisPrimer = data;
                            });
                            $scope.icd10.center().open();
                        }
                    })
                }
            }
            // $scope.cetakRMK = function(){
            //     var client = new HttpClient();
            //     client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar-byNorec=1&norec=' + responData.noRecAntrian + '&view=false', function(response) {
            //             // do something with response
            //     });
            // }
            $scope.cetakRMK = function() {
                var listRawRequired = [
                    "item.diagnosisPrimer|k-ng-model|Diagnosa awal"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    if($scope.item != undefined){
                        var tgl = $scope.item.tglRegistrasi;
                        var saveData = {
                            pasien: {
                                id: $scope.item.pasien.id
                            },
                            tanggalPendaftaran: tgl.getTime(),
                            diagnosis: [{
                                diagnosa: {
                                    id: $scope.item.diagnosisPrimer.id
                                },
                                jenisDiagnosa: $scope.item.jenisDiagnosis,
                                keterangan: $scope.item.keteranganDiagnosis
                            }],
                            noRecPasienDaftar: responData.noRecAntrian
                        }
                        // console.log(JSON.stringify(saveData));
                        managePasien.saveDiagnosaRmk(saveData).then(function(e){
                            $scope.icd10.close();
                            $scope.cetakBro();
                            // var fixUrlLaporan = cetakHelper.open("reporting/lapRingkasanKeluarMasuk?noRegistrasi=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
                            // window.open(fixUrlLaporan, '', 'width=800,height=600')

                            // var client = new HttpClient();
                            // client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar-byNorec=1&norec=' + responData.noRecAntrian + '&view=false', function(response) {
                            //         // do something with response
                            // });

                            // var client = new HttpClient();
                            // client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&view=false', function(response) {
                            //     // do something with response
                            // }); 
                        })
                    }
                } else {
                    window.messageContainer.error(objValid.msg);
                }
                
            }
            $scope.cetakBro = function(){
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar-byNorec=1&norec=' + responData.noRecAntrian + '&view=false', function(response) {
                    // do something with response
                });
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
                $scope.sourceDiagnosa = e.data.data.diagnosa;
                $scope.sourceGolonganAsuransi = e.data.data.golonganAsuransi;
            }).then(function(){
                $scope.currentNoCm = $state.params.noCm;
                modelItem.get("RegistrasiPelayananVO").then(function(data) {
                    $rootScope.doneLoad = false;
                    $scope.doneLoad = false;
                    $scope.item = data;
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
                                    $scope.item.tglRegistrasi = $scope.now; //set tgl registrasi = saat ini
                                    $scope.item.kelompokPasien = e.data.data.jenisPasien;
                                    $scope.item.ruangan = e.data.data.ruangan;
                                    $scope.item.pegawai = e.data.data.pegawai;
                                    if (e.data.data.type === "EKSEKUTIF") {
                                        $scope.item.jenisPasien = $scope.jenisPasiens[1];
                                    } else
                                        $scope.item.jenisPasien = $scope.jenisPasiens[0];
                                }, function(error){
                                    // alert('error coy');
                                    $scope.item.tglRegistrasi = $scope.now; //set tgl registrasi = saat ini
                                });
                                if (!$scope.$$phase)
                                    $scope.$apply();
                            });

                        } else {
                            findPasien.getByNoCM($scope.currentNoCm).then(function(e) {
                                $scope.loadPertama();
                                $scope.item.pasien = modelItem.beforePost(e.data.data);
                                //check pasien bayi bukan
                                var parameterBayi = $scope.item.pasien.namaPasien;
                                if(parameterBayi.indexOf('By Ny') >= 0){
                                    $scope.item.tglRegistrasi = new Date($scope.item.pasien.tglLahir);
                                    $scope.model.rawatInap = true;
                                    $scope.pasienBayi = true;
                                } else {
                                    $scope.item.tglRegistrasi = $scope.now;
                                }
                                
                                if (!$scope.$$phase)
                                    $scope.$apply();
                            });
                        }
                    }
                },
                function(error) {
                    $rootScope.doneLoad = false;
                    $scope.doneLoad = false;
                    window.messageContainer.error(error);
                });
            }).then(function(){
                ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                    $scope.sourceDiagnosisPrimer = data;
                });
                $scope.isRouteLoading = false;
            });
            $scope.$watch('model.rawatInap', function(data){
                if(!data) return;
                // debugger;
                $scope.cekRawatInap(data);
            })
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
            $scope.checkDataRujukan = function() {
                if (!$scope.model.cekNomorRujukan) return;
                if ($scope.item.kelompokPasien.kelompokPasien.indexOf('BPJS')<0) return;
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
                        if(item.peserta.jenisPeserta.nmJenisPeserta) $scope.model.jenisPeserta = item.peserta.jenisPeserta.nmJenisPeserta; // dari bpjs kelas tanggungan = null
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
            $scope.getKelasditanggung = function(id){
                findPasien.checkKepesertaan(id).then(function(e) {
                    if (e.data.data.metadata.code == "200"){
                        $scope.model.noIdentitas = e.data.data.response.peserta.nik;
                        $scope.model.jenisPeserta = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
                        $scope.model.kelasDitanggung = {
                            id: parseInt(e.data.data.response.peserta.kelasTanggungan.kdKelas),
                            kdKelas: e.data.data.response.peserta.kelasTanggungan.kdKelas,
                            nmKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                            namaKelas: e.data.data.response.peserta.kelasTanggungan.nmKelas,
                        };
                        $scope.model.kelasDitanggung = $scope.reformatKelas($scope.model.kelasDitanggung);
                    };
                    
                })
            }
            $scope.checkKepesertaan = function() {
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
                        $scope.model.kelasDitanggung = $scope.reformatKelas($scope.model.kelasDitanggung);
                        // $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        // $scope.kodeProvider = e.data.data.response.peserta.provUmum.kdProvider;
                        // $scope.namaProvider = e.data.data.response.peserta.provUmum.nmProvider;
                        // $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.model.jenisPeserta = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoadingNoKartu = false;
                }, function(err) {
                    $scope.isLoadingNoKartu = false;
                }).then(function(){
                    getDataRujukan($scope.model.noKepesertaan);
                });
            };
            function getDataRujukan(noKartu){
                findPasien.checkRujukanByNoKartu(noKartu).then(function(res){
                    // debugger;
                    if(res.data.data.metadata.code == "200"){
                        var item = res.data.data.response.item;

                        // bind data rujukan
                        $scope.model.noRujukan = item.noKunjungan;
                        $scope.model.tglRujukan = new Date(item.tglKunjungan);
                        $scope.kodeProvider = item.provKunjungan.kdProvider;
                        $scope.namaProvider = item.provKunjungan.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;

                        // bind data diagnosa
                        if(item.diagnosa.kdDiag){
                            findPasien.getListGeneric("Diagnosa&select=*&criteria=kdDiagnosa&values=" + item.diagnosa.kdDiag).then(function(lis){
                                if(lis.data.length > 0){
                                    for(var i = 0; i < lis.data.length; i++){
                                        if(lis.data[i].kdDiagnosa == item.diagnosa.kdDiag){
                                            $scope.model.diagnosa = lis.data[i];
                                            break;
                                        }
                                    }
                                }
                            })
                        }
                    }
                })
            }
            // check kepesertaan berdasarkan NIK
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
                        $scope.model.kelasDitanggung = $scope.reformatKelas($scope.model.kelasDitanggung);
                        // $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = e.data.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.data.response.peserta.provUmum.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.model.jenisPeserta = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
                    } else {
                        window.messageContainer.error(e.data.data.metadata.message);
                    }
                    $scope.isLoadingNIK = false;
                }, function(err) {
                    $scope.isLoadingNIK = false;
                });
            };

            
            // check kepesertaan berdasarkan SEP
            $scope.checkKepesertaanBySep = function() {
                if (!$scope.model.generateNoSEP) return;
                // if (!$scope.model.noSep) return;
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
                        $scope.model.kelasDitanggung = $scope.reformatKelas($scope.model.kelasDitanggung);
                        // $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = e.data.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.data.response.peserta.provUmum.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.model.jenisPeserta = e.data.data.response.peserta.jenisPeserta.nmJenisPeserta;
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
                    "model.asalRujukan|k-ng-model|Asal Rujukan",
                    // "model.noRujukan|ng-model|No Rujukan",
                    "model.tglRujukan|ng-model|Tgl Rujukan",
                    "model.diagnosa|k-ng-model|Diagnosa",
                    "model.kelasDitanggung|k-ng-model|Kelas ditanggung",
                    "model.namaAsalRujukan|ng-model|Asal Rujukan"
                ];
                var kelasJaminan;
                if ($scope.model.rawatInap) {
                    listRawRequired.push("item.kelas|k-ng-model|Kelas Ditanggung");
                    switch($scope.item.kelas.namaKelas) {
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
                            kelasJaminan = $scope.item.kelas.id;
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
                var isValid = modelItem.setValidation($scope, listRawRequired);
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
                        ppkRujukan: $scope.kodeProvider,
                        isRawatJalan: $scope.model.rawatInap === true? 'F' : 'T',
                        catatan: $scope.model.catatan,
                        poliTujuan: $scope.item.ruangan.id,
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
                            $scope.model.generateNoSEP = false;
                            $scope.disableSEP = true;
                            $scope.Simpan();
                        }else {
                            $scope.isNext = false;
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
            // $scope.now = new Date();
            $scope.model.generateNoSEP=false;

            $scope.Save=function(){
                $scope.isNext = true;
                // disable validasi nomor rujukan
                // if($scope.model.noRujukan !== undefined && $scope.model.noRujukan !== "-"){
                //     var num=$scope.model.noRujukan;
                //     var str = num.toString();
                //     if(str.length !== 19){
                //         messageContainer.error('No Rujukan harus 19 Karakter');
                //         return;
                //     }
                // };
                if ($scope.item.kelompokPasien.kelompokPasien.indexOf('BPJS')>=0){
                    if($scope.model.tglRujukan && $scope.model.tglSEP){
                        var tglRujuk = new Date($scope.model.tglRujukan),
                            tglSepBpjs = $scope.model.tglSEP;

                        if(tglRujuk.getTime() >= tglSepBpjs.getTime()){
                            $scope.isNext = false;
                            messageContainer.error('TANGGAL SEP HARUS LEBIH KECIL DARI TGL RUJUKAN');
                            return;
                        }
                    }
                    if ($scope.model.diagnosa){
                        if ($scope.model.diagnosa.id===undefined)
                            findPasien.findDiagnosabyKode($scope.model.diagnosa.kdDiagnosa).then(function(e){
                                $scope.model.diagnosa = e.data.data[0];
                            })
                    } else {
                        $scope.isNext = false;
                        messageContainer.error('Diagnosa awal tidak boleh kosong');
                        return;
                    }
                }
                
                if($scope.model.generateNoSEP === true){
                    $scope.generateSep();
                }else{
                    $scope.Simpan();
                }
            }
            $scope.Simpan = function(){
                if ($scope.model.rawatInap === true) {
                    $scope.SimpanRawatInap();
                } else {
                    $scope.SimpanRawatJalan();
                }
            }
            $scope.SimpanRawatJalan = function() {
                // if ($scope.model.bertugas===undefined){
                //     $scope.bertugas="";
                // }else{
                //     $scope.bertugas=$scope.model.bertugas.id;
                // }

                // if($scope.model.noSep===undefined){
                //     $scope.model.noSep = "-"
                // }
                
                // if ($scope.item.kelompokPasien.kelompokPasien.indexOf("BPJS") >= 0){
                //     if($scope.model.kelasDitanggung.kdKelas!==undefined){
                //         var kelasDiJamin = $scope.model.kelasDitanggung.kdKelas
                //     }else{
                //         var kelasDiJamin = $scope.model.kelasDitanggung.id
                //     }
                // }
                // if($scope.item.kelompokPasien.kelompokPasien.inedxOf("Asuransi lain") >= 0){
                //     var kelasDiJamin = $scope.model.kelasDitanggung.id
                // }
                // if($scope.item.kelompokPasien.kelompokPasien === "Perusahaan"){
                //     var kelasDiJamin = $scope.model.kelasDitanggung.id
                // }
                // if($scope.model.diagnosa===undefined){
                //     var diagnosis = "-"
                // }else{
                //      var diagnosis = $scope.model.diagnosa.id
                // }
                // if($scope.model.namaAsalRujukan===undefined){
                //     var namaAsalRujukan = "-"
                // }else{
                //     var namaAsalRujukan = $scope.model.namaAsalRujukan
                // }
                // if($scope.model.noRujukan===undefined){
                //     var noRujukan = "-";
                //     $scope.model.noRujukan = noRujukan;
                // }else{
                //     var noRujukan = $scope.model.noRujukan;
                // }
                // if($scope.kodeProvider !== undefined){
                //     var kodeProvider = $scope.kodeProvider;
                //     var namaProvider = $scope.namaProvider;
                //     var jenisKepesertaan = $scope.jenisKepesertaan;
                // }else{
                //     var kodeProvider = "";
                //     var namaProvider = "";
                //     var jenisKepesertaan = "";
                // }
                if ($scope.item.kelompokPasien.kelompokPasien.indexOf("Umum") < 0){
                    if ($scope.model.sendiri === true) {
                        var listRawRequired = [
                            "item.ruangan|k-ng-model|Ruangan",
                            "item.asalRujukan|ng-model|Asal Rujukan",
                            "item.kelompokPasien|ng-model|Kelompok Pasien",
                            // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini",
                            "model.namaPeserta|ng-model|Nama peserta",
                            "model.namaPenjamin|k-ng-model|Nama Penjamin",
                            "model.institusiAsalPasien|k-ng-model|Institusi Asal Pasien",
                            "model.hubunganPeserta|k-ng-model|Hubungan Peserta",
                            // "model.noKepesertaan|ng-model|No Kepesertaan",
                            "model.kelasDitanggung|k-ng-model|Kelas Ditanggung",
                            // "model.tglRujukan|ng-model|Tgl Rujukan"
                        ];
                    } else {
                        var listRawRequired = [
                            "item.ruangan|k-ng-model|Ruangan",
                            "item.asalRujukan|ng-model|Asal Rujukan",
                            "item.kelompokPasien|ng-model|Kelompok Pasien",
                            // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini",
                            "model.namaPenjamin|k-ng-model|Nama Penjamin",
                            "model.institusiAsalPasien|k-ng-model|Institusi Asal Pasien",
                            "model.noKepesertaan|ng-model|No Kepesertaan",
                            // "model.golonganAsuransi|ng-model|Golongan Asuransi",
                            "model.kelasDitanggung|k-ng-model|Kelas Ditanggung",
                            "model.asalRujukan|k-ng-model|Asal Rujukan",
                            "model.namaAsalRujukan|k-ng-model|Nama Asal Rujukan",
                            // "model.noRujukan|ng-model|No Rujukan",
                            "model.tglRujukan|ng-model|Tgl Rujukan",
                            "model.diagnosa|ng-model|Diagnosa"
                        ];
                    }
                    var isValid = modelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
                        var TglLahir = $scope.model.tglLahir,
                            TglSEP = $scope.model.tglSEP,
                            TglRujukan = $scope.model.tglRujukan,
                            TglDaftar = $scope.item.tglRegistrasi,
                            providerRujukan = $scope.model.namaAsalRujukan,
                            entryProvRujukan, namaAsalRujukan;
                        if (providerRujukan){
                            if (providerRujukan.indexOf('-') > 0 ) {
                                entryProvRujukan = providerRujukan.split("-");
                                namaAsalRujukan = {
                                    "kdProvider": entryProvRujukan[0],
                                    "nmProvider": entryProvRujukan[1]
                                }
                            } else {
                                namaAsalRujukan = {
                                    "kdProvider": "-",
                                    "nmProvider": $scope.model.namaAsalRujukan
                                }
                            }
                        } else {
                            namaAsalRujukan = {
                                "kdProvider": null,
                                "nmProvider": null
                            }
                        }
                        
                        var dataAsuransi = {
                            "kdLastUnitBagian": $scope.model.bertugas === undefined ? "" : $scope.model.bertugas.id,
                            "namaPeserta": $scope.model.namaPeserta,
                            "kelasDiJamin": $scope.model.kelasDitanggung,
                            "qAsuransi": $scope.model.namaPenjamin.id,
                            "kdPenjaminPasien": $scope.model.namaPenjamin.id,
                            "alamatLengkap":$scope.model.alamatPeserta,
                            "nikInstitusiAsal": $scope.model.institusiAsalPasien.id,
                            "rekanan": {id:$scope.model.institusiAsalPasien.id},
                            "tglLahir":  TglLahir.getTime(),
                            "noIdentitas": $scope.model.noIdentitas,
                            "hubunganPeserta":{
                                "id": $scope.model.hubunganPeserta.id
                            },
                            "noAsuransi": $scope.model.noKepesertaan,
                            "noCm": {
                                "id": $scope.item.pasien.id,
                                "noCm": $scope.item.pasien.noCm
                            },
                            "jenisKelamin": {
                                "id": $scope.item.pasien.jenisKelamin.id,
                            },
                            "ppkRujukan": namaAsalRujukan.kdProvider,
                            "diagnosis": {
                                "id": $scope.model.diagnosa === undefined? "-" : $scope.model.diagnosa.id
                            },
                            "noKepesertaan": $scope.model.noKepesertaan,
                            "lakalantas":  $scope.model.lakalantas === true ? 1 : 2,
                            "tglRujukan": TglRujukan.getTime(),
                            "noRujukan": $scope.model.noRujukan === undefined ? "-" : $scope.model.noRujukan,
                            "noSep": $scope.model.noSep === undefined ? null : $scope.model.noSep,
                            "jenisPeserta": $scope.model.jenisPeserta === undefined ? null : $scope.model.jenisPeserta,
                            "kdProvider": namaAsalRujukan.kdProvider,
                            "nmProvider": namaAsalRujukan.nmProvider,
                            "diagnosa": {
                                "id": $scope.model.diagnosa === undefined? "-" : $scope.model.diagnosa.id
                            },
                            "tanggalSep": TglSEP.getTime(),
                            "catatan": $scope.model.catatan
                        }

                        modelItem.set("PasienVO", $scope.item);
                        $scope.item.isRegistrasiLengkap = 0;
                        $scope.item.isOnSiteService = 0;
                        var item = modelItem.beforePost($scope.item);

                        var dataRegistrasi = {
                            "pegawai": {
                                "id": item.pegawai === undefined ? undefined : item.pegawai.id,
                            },
                            "isRegistrasiLengkap": item.isRegistrasiLengkap,
                            "isOnSiteService": item.isOnSiteService,
                            "tglRegistrasi": TglDaftar.getTime(),
                            "asalRujukan": {
                                "id": item.asalRujukan.id
                            },
                            "jenisPelayanan": item.jenisPasien.name,
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
                            "rekanan": {id:$scope.model.institusiAsalPasien.id},
                            "noRecAntrianPasien": item.pasien.noRecAntrianPasien
                        }
                        // cek kondisi pasien bayi bukan
                        // jika iya push atribut rawatGabung ke data Registrasi
                        if ($scope.pasienBayi) {
                            dataRegistrasi.rawatGabung = $scope.model.rawatGabung === undefined ? false : true;
                        }
                        if (dataRegistrasi.pegawai.id === undefined) {
                            delete dataRegistrasi.pegawai;
                        }
                        if (dataRegistrasi.noRecAntrianPasien === undefined) {
                            dataRegistrasi.noRecAntrianPasien = "";
                        }
                        if(dataAsuransi.diagnosis.id === "-"){
                            delete dataAsuransi.diagnosis
                        }
                        if(dataAsuransi.diagnosa.id === "-"){
                            delete dataAsuransi.diagnosa
                        }
                        // item.jenisPelayanan = $scope.item.jenisPasien.name; 
                        
                        var dataJson={
                            "registrasiPelayanan": dataRegistrasi,
                            "asuransiPasien": dataAsuransi
                        }
                        // console.log(JSON.stringify(dataJson));
                        // window.messageContainer.log('Data berhasil di simpan');
                        managePasien.saveAsuransiPasien(dataJson).then(function(e) {
                            responData = e.data.data;
                            tempNoRec = e.data.data.noRecAntrian;
                            $scope.isNext = true;
                            $scope.isReport = true;
                            $scope.isReportPendaftaran = true;
                            $scope.isAsuransi = true;
                            $scope.model.generateNoSEP = false; // matiin trigger checkKepesertaanBySEP
                            // managePasien.saveRegistrasiPelayanan(dataJson).then(function(e) {
                            //     tempNoRec = e.data.data.noRecAntrian;
                            //     $scope.isReport = true;
                            //     if ($scope.currentNoCm.indexOf('*') > 0) {}
                            //     if (window.isPerjanjian !== undefined) {
                            //         findPasien.CheckNoReconfirm(window.isPerjanjian).then(function(e) {});
                            //     }
                            // });
                        }, function(err){
                            $scope.isNext = false;
                        });
                    }else{
                        $scope.isNext = false;
                        modelItem.showMessages(isValid.messages);
                    }
                }else{
                    var listRawRequired = [
                        "item.ruangan|k-ng-model|Ruangan",
                        "item.asalRujukan|ng-model|Asal Rujukan",
                        "item.kelompokPasien|ng-model|Kelompok Pasien",
                        "item.jenisPasien|k-ng-model|Jenis Pelayanan",
                        // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini"
                        // "userPelapor|ng-model|User"
                    ];
                    modelItem.set("PasienVO", $scope.item);
                    $scope.item.isRegistrasiLengkap = 0;
                    $scope.item.isOnSiteService = 0;
                    var item = modelItem.beforePost($scope.item);

                    var isValid = modelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
                        var TglDaftar = $scope.item.tglRegistrasi;
                        var dataRegistrasi = {
                            "pegawai": {
                                "id": item.pegawai === undefined ? undefined : item.pegawai.id,
                            },
                            "isRegistrasiLengkap": item.isRegistrasiLengkap,
                            "isOnSiteService": item.isOnSiteService,
                            "tglRegistrasi": TglDaftar.getTime(),
                            "asalRujukan": {
                                "id": item.asalRujukan.id
                            },
                            "jenisPelayanan": item.jenisPasien.name,
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
                            "noRecAntrianPasien": item.pasien.noRecAntrianPasien
                        }
                        
                        // cek kondisi pasien bayi bukan
                        // jika iya push atribut rawatGabung ke data Registrasi
                        if ($scope.pasienBayi) {
                            dataRegistrasi.rawatGabung = $scope.model.rawatGabung === undefined ? false : true;
                        }

                        if (dataRegistrasi.pegawai.id === undefined) {
                            delete dataRegistrasi.pegawai;
                        }
                        if (dataRegistrasi.noRecAntrianPasien === undefined) {
                            dataRegistrasi.noRecAntrianPasien = "";
                        }
                        managePasien.saveRegistrasiPelayanan(dataRegistrasi).then(function(e) {
                            responData = e.data.data;
                            tempNoRec = e.data.data.noRecAntrian,
                            tempNoCm = e.data.data.noCm;
                            $state.params.noRegistrasi = e.data.data.noRegistrasi;
                            $scope.isReport = true;
                            $scope.isNext = true;
                            $scope.isReportPendaftaran = true; // show button cetak gelang dan sumlist
                            if ($scope.currentNoCm.indexOf('*') > 0) {}
                            if (window.isPerjanjian !== undefined) {
                                findPasien.CheckNoReconfirm(window.isPerjanjian).then(function(e) {});
                            }
                        }, function(err){
                            $scope.isNext = false;
                        });
                    } else {
                        modelItem.showMessages(isValid.messages).then(function(){
                            $scope.isNext = false;
                        });
                    }
                }
                
            };

            $scope.SimpanRawatInap = function() {
                // if ($scope.model.bertugas===undefined){
                //     $scope.bertugas="";
                // }else{
                //     $scope.bertugas=$scope.model.bertugas.id;
                // }

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
                //  if($scope.model.diagnosa===undefined){
                //     var diagnosis = "-"
                // }else{
                //      var diagnosis = $scope.model.diagnosa.id
                // }
                // if($scope.model.noRujukan===undefined){
                //     var noRujukan = "-";
                //     $scope.model.noRujukan = noRujukan;
                // }else{
                //     var noRujukan = $scope.model.noRujukan
                // }
                // if($scope.kodeProvider !== undefined && $scope.namaProvider !== undefined){
                //     var kodeProvider = $scope.kodeProvider;
                //     var namaProvider = $scope.namaProvider;
                //     var jenisKepesertaan = $scope.jenisKepesertaan;
                // }else{
                //     var kodeProvider = "";
                //     var namaProvider = "";
                //     var jenisKepesertaan = "";
                // }
                if ($scope.item.kelompokPasien.kelompokPasien.indexOf("Umum") < 0){
                    if ($scope.model.sendiri === true) {
                        var listRawRequired = [
                            "item.ruangan|k-ng-model|Ruangan",
                            "item.asalRujukan|k-ng-model|Asal Rujukan",
                            "item.kelompokPasien|k-ng-model|Kelompok Pasien",
                            // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini",
                            "model.namaPeserta|ng-model|Nama peserta",
                            "model.namaPenjamin|k-ng-model|Nama Penjamin",
                            "model.institusiAsalPasien|k-ng-model|Institusi Asal Pasien",
                            "model.hubunganPeserta|k-ng-model|Hubungan Peserta",
                            // "model.noKepesertaan|ng-model|No Kepesertaan",
                            "model.kelasDitanggung|k-ng-model|Kelas Ditanggung",
                            "item.nomorTempatTidur|k-ng-model|Tempat tidur",
                            // "model.tglRujukan|ng-model|Tgl Rujukan"
                        ];
                    } else {
                        var listRawRequired = [
                            "item.ruangan|k-ng-model|Ruangan",
                            "item.asalRujukan|k-ng-model|Asal Rujukan",
                            "item.kelompokPasien|k-ng-model|Kelompok Pasien",
                            // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini",
                            "model.namaPenjamin|k-ng-model|Nama Penjamin",
                            "model.institusiAsalPasien|k-ng-model|Institusi Asal Pasien",
                            "model.noKepesertaan|ng-model|No Kepesertaan",
                            // "model.golonganAsuransi|ng-model|Golongan Asuransi",
                            "model.kelasDitanggung|k-ng-model|Kelas Ditanggung",
                            "model.asalRujukan|k-ng-model|Asal Rujukan",
                            "model.namaAsalRujukan|k-ng-model|Nama tempat rujukan",
                            // "model.noRujukan|ng-model|No Rujukan",
                            "model.tglRujukan|ng-model|Tgl Rujukan",
                            "model.diagnosa|ng-model|Diagnosa",
                            "item.nomorTempatTidur|k-ng-model|Tempat tidur"
                        ];
                    }
                    var isValid = modelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
                        var TglLahir = $scope.model.tglLahir,
                            TglSEP = $scope.model.tglSEP,
                            TglRujukan = $scope.model.tglRujukan,
                            TglDaftar = $scope.item.tglRegistrasi,
                            providerRujukan = $scope.model.namaAsalRujukan,
                            entryProvRujukan, namaAsalRujukan;
                        if (providerRujukan){
                            if (providerRujukan.indexOf('-') > 0 ) {
                                entryProvRujukan = providerRujukan.split("-");
                                namaAsalRujukan = {
                                    "kdProvider": entryProvRujukan[0],
                                    "nmProvider": entryProvRujukan[1]
                                }
                            } else {
                                namaAsalRujukan = {
                                    "kdProvider": "-",
                                    "nmProvider": $scope.model.namaAsalRujukan
                                }
                            }
                        } else {
                            namaAsalRujukan = {
                                "kdProvider": null,
                                "nmProvider": null
                            }
                        }
                        // var TglSEP = dateHelper.getTanggalFormattedNew($scope.model.tglSEP);
                        var dataAsuransi = {
                            "kdLastUnitBagian": $scope.model.bertugas === undefined ? "" : $scope.model.bertugas.id,
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
                            "rekanan": {id:$scope.model.institusiAsalPasien.id},
                            "tglLahir":  TglLahir.getTime(),
                            "noIdentitas": $scope.model.noIdentitas,
                            "hubunganPesertaId": $scope.model.hubunganPeserta.id,
                            "noAsuransi": $scope.model.noKepesertaan,
                            "noCm": {
                                "id": $scope.item.pasien.id,
                                "noCm": $scope.item.pasien.noCm
                            },
                            "kdInstitusiAsal": $scope.model.institusiAsalPasien.id,
                            "jenisKelamin": {
                                "id": $scope.item.pasien.jenisKelamin.id
                            },
                            "ppkRujukan": namaAsalRujukan.kdProvider,
                            "diagnosis": {
                                "id": $scope.model.diagnosa===undefined ? "-" : $scope.model.diagnosa.id
                            },
                            "noKepesertaan": $scope.model.noKepesertaan,
                            "lakalantas":  $scope.model.lakalantas === true ? 1 : 2,
                            "tglRujukan": TglRujukan.getTime(),
                            "noRujukan": $scope.model.noRujukan === undefined ? "-" : $scope.model.noRujukan,
                            "noSep": $scope.model.noSep === undefined ? null : $scope.model.noSep,
                            "jenisPeserta": $scope.model.jenisPeserta === undefined ? null : $scope.model.jenisPeserta,
                            "kdProvider": namaAsalRujukan.kdProvider,
                            "nmProvider": namaAsalRujukan.nmProvider,
                            "diagnosa": {
                                "id": $scope.model.diagnosa===undefined ? "-" : $scope.model.diagnosa.id
                            },
                            "tanggalSep": TglSEP.getTime(),
                            "catatan": $scope.model.catatan
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
                            "tglRegistrasi": TglDaftar.getTime(),
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
                            "rekanan": {id:$scope.model.institusiAsalPasien.id},
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
                        
                        // cek kondisi pasien bayi bukan
                        // jika iya push atribut rawatGabung ke data Registrasi
                        if ($scope.pasienBayi) {
                            dataRegistrasi.rawatGabung = $scope.model.rawatGabung === undefined ? false : true;
                        }
                        // debugger;
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
                            $scope.model.generateNoSEP = false; // matiin trigger checkKepesertaanBySEP
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
                        "item.jenisPasien|k-ng-model|Jenis Pelayanan",
                        "item.nomorTempatTidur|k-ng-model|Tempat tidur"
                        // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini"
                        // "userPelapor|ng-model|User"
                    ];

                    modelItem.set("PasienVO", $scope.item);
                    $scope.item.isRegistrasiLengkap = 0;
                    $scope.item.isOnSiteService = 0;
                    var item = modelItem.beforePost($scope.item);

                    var isValid = modelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
                        var TglDaftar = $scope.item.tglRegistrasi;
                        var tmpData = {
                            "pegawai": {
                                "id": item.pegawai === undefined ? undefined : item.pegawai.dokterId
                            },
                            "isRegistrasiLengkap": item.isRegistrasiLengkap,
                            "isOnSiteService": item.isOnSiteService,
                            "tglRegistrasi": TglDaftar.getTime(),
                            "jenisPelayanan": item.jenisPasien.name,
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
                        
                        // cek kondisi pasien bayi bukan
                        // jika iya push atribut rawatGabung ke data Registrasi
                        if ($scope.pasienBayi) {
                            tmpData.rawatGabung = $scope.model.rawatGabung === undefined ? false : $scope.model.rawatGabung;
                        }
                        if (tmpData.pegawai.id === undefined) {
                            // debugger;
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
                $scope.model.jumlah = 1;
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
                // debugger;
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
                    // var tglPelayanan = dateHelper.getTanggalFormattedNew(new Date());
                    var grid = $('#grid').data("kendoGrid");
                    id += 1;
                    $scope.dataModelGrid[id] = {};

                    grid.dataSource.add({
                        "no": id,
                        "noRec": responData.noRec,
                        "tglPelayanan": $scope.model.tglPelayanan,
                        "ruangan" : $scope.tempItem.ruangan,
                        "produk": {
                            "id": $scope.model.namaProduk.produkId,
                            "namaProduk": $scope.model.namaProduk.namaProduk
                        },
                        "hargaNetto": $scope.model.hargaTindakan,
                        "qty" : $scope.model.jumlah,
                        "kelas" : $scope.tempItem.kelas,
                        "pasienDaftar": {
                            "noRec" : responData.noRecAntrian
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
                    $scope.SaveTindakan();
                    // $scope.model.namaProduk = "";
                    // $scope.model.hargaTindakan = "";
                    // $scope.model.jumlah = "";
                }else{
                    ModelItem.showMessages(isValid.messages);
                }
            };
            $scope.inputTindakan = function(){
                if(responData) {
                    $scope.refreshDetilTagihan();
                    findPasien.getItem("registrasi-pelayanan/get-tindakan-pelayanan?noRec=" + responData.noRecAntrian, true).then(function(dat){
                        $scope.listNamaBarang = dat.data.data.listData;
                    });
                    findPasien.getByNoRegistrasi(responData.noRecAntrian).then(function(data) {
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
                        "tglPelayanan": e.tglPelayanan.getTime(),
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
                    // $scope.showTindakan = false;
                    $scope.dataTindakan = new kendo.data.DataSource({
                        data: [],
                        pageSize:5
                    });
                    $scope.model.namaProduk = "";
                    $scope.model.hargaTindakan = "";
                    $scope.model.jumlah = "";
                    $scope.refreshDetilTagihan();
                })
            }
            $scope.Cancel = function(){
                $scope.showTindakan = false
            }

            // controller untk data detil tagihan
            $scope.group = [
                {
                    field: "tglPelayanan",
                    groupHeaderTemplate: "Tanggal.  #= value #",
                    aggregates: [{
                        field: "namaProduk",
                        aggregate: "count"
                    }, {
                        field: "detailJenisProduk",
                        aggregate: "count"
                    }]
                }, {
                    field: "namaRuangan",
                    aggregates: [{
                        field: "tglPelayanan",
                        aggregate: "count"
                    }, {
                        field: "namaProduk",
                        aggregate: "count"
                    }, {
                        field: "namaRuangan",
                        aggregate: "count"
                    }]
                }, {
                    field: "detailJenisProduk",
                    groupHeaderTemplate: "Bagian #= value #",
                    aggregates: [{
                        field: "namaProduk",
                        aggregate: "count"
                    }, {
                        field: "detailJenisProduk",
                        aggregate: "count"
                    }]
                }
            ];
            $scope.gridOptions = {
                // dataSource: {
                //     data: data,
                //     group: $scope.group
                // },
                selectable: "row",
                sortable: true,
                columns: [{
                    "field": "namaProduk",
                    "title": "Nama Item",
                }, {
                    "field": "jumlah",
                    "title": "Jumlah",
                    width: 70
                }, {
                    "field": "hargaSatuan",
                    "title": "Harga",
                    width: 100,
                    template: "<span style='text-align:right;display:block'>#=kendo.toString(hargaSatuan, 'n2')#</span>",

                }, {
                    "field": "jumlah * hargaSatuan",
                    "title": "Total",
                    width: 100,
                    template: " <span style='text-align:right;display:block'> #=kendo.toString(jumlah*hargaSatuan, 'n2')# </span>  ",
                }, {
                    hidden: true,
                    field: "namaRuangan",
                    title: "Nama Ruangan",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
                },
                {
                    hidden: true,
                    field: "detailJenisProduk",
                    title: "",
                    aggregates: ["count"],
                    groupHeaderTemplate: " #= value # Jumlah: #= count# "
                },
                {
                    hidden: true,
                    field: "tglPelayanan",
                    title: "",
                    template: "#= kendo.toString(kendo.parseDate(tglPelayanan), 'dd MM yyyy HH:mm') #",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Tgl. #= value # "
                }]
            };
            $scope.refreshDetilTagihan = function(){
                findPasien.findDetailPelayanan(responData.noRec).then(function(e) {
                    $scope.listData = e.data.data.orders;
                    var data = e.data.data.orders;
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            var element = data[key];
                            element.tglPelayanan = moment(element.tglPelayanan).format('DD MMM YYYY');
                        }
                    }
                    // $scope.gridOptions = {
                    //     dataSource: {
                    //         data: data,
                    //         group: $scope.group
                    //     },
                    //     selectable: "row",
                    //     sortable: true,
                    //     columns: [{ 
                    //         template: "<input type='checkbox' class='checkbox' ng-click='onClick($event)' />",
                    //         width: 40
                    //     }, {
                    //         "field": "namaProduk",
                    //         "title": "Nama Item",
                    //     }, {
                    //         "field": "jumlah",
                    //         "title": "Jumlah",
                    //         width: 70
                    //     }, {
                    //         "field": "hargaSatuan",
                    //         "title": "Harga",
                    //         width: 100,
                    //         template: "<span style='text-align:right;display:block'>#=kendo.toString(hargaSatuan, 'n2')#</span>",

                    //     }, {
                    //         "field": "jumlah * hargaSatuan",
                    //         "title": "Total",
                    //         width: 100,
                    //         template: " <span style='text-align:right;display:block'> #=kendo.toString(jumlah*hargaSatuan, 'n2')# </span>  ",
                    //     }, {
                    //         hidden: true,
                    //         field: "namaRuangan",
                    //         title: "Nama Ruangan",
                    //         aggregates: ["count"],
                    //         groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
                    //     },
                    //     {
                    //         hidden: true,
                    //         field: "detailJenisProduk",
                    //         title: "",
                    //         aggregates: ["count"],
                    //         groupHeaderTemplate: " #= value # Jumlah: #= count# "
                    //     },
                    //     {
                    //         hidden: true,
                    //         field: "tglPelayanan",
                    //         title: "",
                    //         aggregates: ["count"],
                    //         groupHeaderTemplate: "Tgl. #= value # "
                    //     }]
                    // };

                    $scope.total = _.reduce(data, function(memo, num) {
                        if (num.nilaiNormal === 0)
                            return memo + (num.jumlah * num.hargaSatuan * -1);
                        return memo + (num.jumlah * num.hargaSatuan);
                    }, 0);
                });
            }   
        }
    ]);
});