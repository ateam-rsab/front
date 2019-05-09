define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('GawatDaruratCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'ModelItem', 'FindPasien', 'DateHelper', 'FindPegawai', 'CetakHelper',
        function($rootScope, $scope, ModelItem, $state, managePasien, modelItem, findPasien, dateHelper, findPegawai, cetakHelper) {
            $scope.title = "GAWAT DARURAT";
            $scope.item = {};
            $scope.data = {};
            $scope.now = new Date();
            
            $scope.isRegistrasi = $state.current.name === 'GawatDaruratDetailNext';

            $scope.jenisPasiens = [{
                name: "Reguler"
            }, {
                name: "Eksekutif"
            }]

            $scope.listEmergency=[{
                id: 1,
                name: "True Emergency"
            },{
                id: 2,
                name: "False Emergency"
            }]

            if($state.params.noRecIGD!==undefined||$state.params.noRecIGD!==''){
                var noRecIGD = $state.params.noRecIGD;
                findPasien.findPasienIGD(noRecIGD).then(function(e) {
                    $scope.kategoriIgd = e.data.data[0].Kategori;
                    $scope.nama = e.data.data[0].namaPasien;
                    $scope.tglMasuk = moment(e.data.data[0].tanggalMasuk).format('DD-MM-YYYY HH:mm')                    
                });
            }

            $scope.item.tanggalRegistrasi = $scope.now;
            $scope.item.tanggalKejadian = $scope.now;
            $rootScope.isOpen = true;
            if ($state.params.noCm !== undefined && $state.params.noCm !== '') {
                findPasien.getByNoCM($state.params.noCm).then(function(data) {
                    var data = data.data.data;
                    $scope.item.tglLahir = moment(data.tglLahir).format('DD-MM-YYYY'); //DateHelper.formatDate($scope.currentPasien.tglLahir,DD-MM-YYYY);
                    $scope.item.namaPasien = data.namaPasien;
                    $scope.item.noCm = data.noCm;
                    $scope.item.alamat = data.alamat.alamatLengkap;
                    $scope.item.jenisKelamin = data.jenisKelamin.jenisKelamin;
                    $scope.item.pendidikan = data.pendidikan.namaExternal;
                    $scope.item.pekerjaan = data.pekerjaan.namaExternal;
                    $scope.item.tipePasien = "Lama";
                });
            } else {
                if ($scope.isRegistrasi === true) {
                    findPasien.getHasilTriage($state.params.noRec).then(function(e) {
                        debugger;
                        $scope.currentPasien = e.data.pasien;
                        $rootScope.currentPasien = e.data.pasien;
                        ModelItem.set("CurrentPasien", e.data.pasien);
                        $scope.item = e.data.pasien;
                        // $scope.item.tipePasien = "Lama";
                        $scope.item.tglLahir = new Date($scope.currentPasien.tglLahir); //DateHelper.formatDate($scope.currentPasien.tglLahir,DD-MM-YYYY);
                        $scope.item.namaLengkap = $scope.currentPasien.namaLengkap;
                        $scope.item.tempNoCm = $scope.currentPasien.noCm;
                    })
                }
            }

            $scope.klik=function(data){
                if(data==="Baru"){
                    $state.go('registrasiPelayananGawatDarurat')
                }
            }

            ModelItem.getDataDummyGeneric("StatusPasien", false).then(function(data) {
                $scope.listStatusPasien = data;
                if (window.noCm != undefined) {
                    // $scope.item.tipePasien = "Lama";
                    $scope.item.namaLengkap = $scope.currentPasien.namaPasien;
                    $scope.item.tempNoCm = $scope.currentPasien.noCm;
                    if ($rootScope.$$phase === undefined)
                        $scope.$apply();
                }
            })

            $scope.findData = function() {
                $state.go('GawatDaruratFind', {
                    noRec: $state.params.noRec,
                    noRecIGD: $state.params.noRecIGD
                });
            }
            $scope.onSelect = function(a) {
                $rootScope.currentPasien = a.sender._old;

            };

            //asuransi

            $scope.model = {};
            $scope.jenisPasiens = [{
                name: "Reguler"
            }, {
                name: "Eksekutif"
            }]
            $scope.now = new Date();
            $scope.noCm = $state.params.noCm;
            $scope.listPasien = [];
            $scope.doneLoad = $rootScope.doneLoad;
            $scope.showFind = true;

            $scope.onSelect = function(a) {
                findPasien.getByNoCM(this._prev).then(function(e) {
                    $scope.item.pasien = modelItem.beforePost(e.data);
                    if (!$scope.$$phase)
                        $scope.$apply();
                });
            };
            $scope.$watch('item.kelompokPasien', function(e) {
                if (e === undefined) return;
                if (e.kelompokPasien === undefined) return;
                if (e.kelompokPasien.indexOf('BPJS') >= 0) {
                    $scope.disableTipePelayanan = true;
                    $scope.item.jenisPasien = $scope.jenisPasiens[0];
                } else{
                    $scope.disableTipePelayanan = false;
                }
                if (e.kelompokPasien === "BPJS"){
                    $scope.asuransi=true;
                }else if(e.kelompokPasien === "Asuransi lain"){
                    $scope.asuransi=true;
                }else{
                     $scope.asuransi=false;
                }
            })


            $scope.getDokter =  function() {
                // if (e === undefined) return;
                if ($scope.item.tglRegistrasi !== undefined)
                    var doctor = findPegawai.getDokterIGD($scope.item.tglRegistrasi, $scope.item.ruangan);
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
            }
            $rootScope.isOpen = true;
            $scope.find = function() {
                $state.go('registrasiPelayanan.find');
            }
            $scope.now = new Date();
            $scope.headerTemplate = '<table><tr><th width="150px">No. Rekam Medis</th><th width="150px">Nama Pasien</th><th width="300px">Alamat Pasien</th><th width="100px">Tanggal Lahir</th></tr></table>';
            $scope.template = '<table><tr><td width="150px">#: data.noCm #</td><td width="150px">#: data.namaPasien #</td><td width="300px">#: data.alamatPasien #</td><td width="100px">#: data.tanggalLahir #</td></tr></table>';
            $scope.asalrujukans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-asal-rujukan');
            $scope.ruangans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-igd');
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


            debugger;
            /*add_hanafi_03112016*/
            findPasien.getKelompokPasien().then(function(e) {
                $scope.kelompokPasiens = e.data.data
            })
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
            $scope.$watch('noCm', function(e) {
                $scope.itemPatiens = findPasien.getDataPasien("", $scope.noCm, "", "", "");
                $scope.itemPatiens.then(function(e) {
                    $scope.listPasien = new kendo.data.DataSource({
                        data: e.data.data.listData,
                    });
                });

            });
            $scope.currentNoCm = $state.params.noCm;

            modelItem.get("RegistrasiPelayananVO").then(function(data) {

                    $rootScope.doneLoad = false;
                    $scope.doneLoad = false;
                    $scope.item = data;
                    $scope.item.tglRegistrasi = $scope.now;
                    if ($state.params.noCm !== undefined) {
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
                },
                function(error) {
                    $rootScope.doneLoad = false;
                    $scope.doneLoad = false;
                    window.messageContainer.error(error);
                });

            var tempNoRec = 0;
            var tempNoCm = 0;

            $scope.cetak = function() {
                // window.location = configuration.urlPrinting + "registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + tempNoRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize()
                var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + tempNoRec);
                    window.open(fixUrlLaporan, '', 'width=800,height=600')
            }
            // $scope.cetakGelang = function() {
            //     if($scope.item != undefined){
            //         var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/gelangPasien?id=" + $scope.item.pasien.id);
            //         window.open(fixUrlLaporan, '_blank')
            //     }
            // }
            $scope.cetakBuktiLayanan = function() {
                if($scope.item != undefined){
                    debugger;
                    var fixUrlLaporan = cetakHelper.open("reporting/lapBuktiPelayanan?noRegistrasi=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
            }
            $scope.CetakSumList = function() {
                if($scope.item != undefined){
                    var fixUrlLaporan = cetakHelper.open("reporting/lapResume?noCm=" + tempNoCm + "&tglRegistrasi=" + new moment(new Date()).format('DD-MM-YYYY'));
                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
            }
            $scope.tracerBon = function() {
                if($scope.item != undefined){
                    debugger;
                    var fixUrlLaporan = cetakHelper.open("reporting/lapTracer?noRegistrasi=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
            }
            $scope.cetakKartu = function() {
                if($scope.item != undefined){
                    var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/kartuPasien?id=" + $scope.item.pasien.id);
                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
            }
            $scope.cetakSEP = function() {
                if($scope.item != undefined){
                    // var noSep = e.data.data === null ? "2423432" : e.data.data;
                    var fixUrlLaporan = cetakHelper.open("asuransi/asuransiBPJS?noSep=" + $scope.model.noSep);
                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
            }
            $scope.formatNum = {
                format: "#.#",
                decimals: 0
            }
            $scope.cetakLabel = function(tempNoCm){
                debugger;
                $scope.dats = {
                    qty: 0
                }
                $scope.winDialog.center().open();
            }
            $scope.pilihQty = function(data) {
                debugger;
                var listRawRequired = [
                    "dats.qty|k-ng-model|kuantiti"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    var qty = data.qty;
                    if(qty !== undefined){
                        var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $scope.item.pasien.pasienDaftar.noRegistrasi + "&qty=" + qty);
                        window.open(fixUrlLaporan, '', 'width=800,height=600')
                    }
                    $scope.winDialog.close();
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };
            if ($scope.model.tglRujukan === undefined)
                $scope.model.tglRujukan = new Date();
            $scope.model.lakalantas = false;

            // findPasien.getByNoRegistrasi($state.params.noRegister).then(function(e) {
            //     $scope.item.registrasi = e.data;
            // });

            findPasien.getByNoCM($state.params.noCm).then(function(e) {
                $scope.model.pasien = e.data.data;
                $scope.sourcePasien = e.data.data;
                $scope.tglLahir = new Date(e.data.data.tglLahir);
            });

            // findPasien.getDataAsuransi(id, $state.params.noCm).then(function(e) {
            //     $scope.sourceAsuransiPasien = e.data.data;
            // });

            // $scope.arrSendiri = [];
            $scope.Sendiri = function(data){
                if (data === true) {
                    $scope.model.namaPeserta = $scope.sourcePasien.namaPasien;
                    $scope.model.tglLahir =  $scope.tglLahir;
                    $scope.model.noIdentitas =  $scope.sourcePasien.noIdentitas;
                    $scope.model.alamatPeserta = $scope.sourcePasien.alamat.alamatLengkap;
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

            findPasien.getJenisPembiayaan().then(function(e){
                $scope.sourceJenisPembiayaan = e.data.data.listData;
            });

            findPasien.getDataAsuransiPasien().then(function(e){
                $scope.sourceHubunganPasien = e.data.data.hubunganPesertaAsuransi;
                $scope.sourceUnitTugas = e.data.data.unitBagian;
                $scope.sourceKelasDitanggung = e.data.data.kelasDitanggung;
                // console.log(JSON.stringify($scope.sourceKelasDitanggung));
                $scope.sourceDiagnosa = e.data.data.diagnosa;
                $scope.sourceGolonganAsuransi = e.data.data.golonganAsuransi;
            });
    
            findPasien.getAsalRujukan().then(function(data){
                $scope.asalrujukans = data.data;
            });

            $scope.DataRekanan=function(){
                debugger;
                var id = $scope.model.namaPenjamin.id;
                findPasien.getDataRekanan(id).then(function(e) {
                    $scope.sourceDataRekanan = e.data.data.listData;
                });
                if($scope.model.namaPenjamin.kelompokPasien === "BPJS" || $scope.model.namaPenjamin.kelompokPasien === "BPJS Non PBI "){
                    $scope.SepCheck=false;
                }else{
                    $scope.SepCheck=true;
                }
            };

            $scope.cekAsuransi = function(){
                if($scope.item.kelompokPasien.kelompokPasien != "BPJS"){
                    $scope.kelasPenjamin = true;
                    $scope.kelasBpjs = false;
                    $scope.noNonBPJS = true;
                    $scope.noBPJS = false;
                    $scope.isCheckSJP = false;
                    $scope.isNoCheckSJP = true;
                }else{
                    $scope.kelasBpjs = true;
                    $scope.kelasPenjamin = false;
                    $scope.noNonBPJS = false;
                    $scope.noBPJS = true;
                    $scope.isCheckSJP = true;
                    $scope.isNoCheckSJP = false;
                }
            }

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

            findPasien.getDiagnosa().then(function(data) {
                $scope.listDiagnosa = data;
            });
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
                        $scope.noKartu = e.data.data.response.peserta.noKartu;
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

            $scope.arrNoSEP = [];
            $scope.NoSEP = function(){
                if ($scope.model.noSEP === true) {
                    var data = {
                        nokartu: $scope.noKartu,
                        tanggalRujukan: new moment($scope.model.tglRujukan).format('YYYY-MM-DD'),
                        noRujukan: $scope.model.noRujukan,
                        ppkRujukan: '0901R001',
                        isRawatJalan: 'T',
                        catatan: '',
                        kdDiagnosa: $scope.model.diagnosa.kdDiagnosa,
                        kelasRawat: $scope.model.kelasDitanggung.kdKelas === undefined? $scope.model.kelasDitanggung.id : $scope.model.kelasDitanggung.kdKelas,
                        noCm: $state.params.noCm
                    };
                    // console.log(JSON.stringify(data));
                    managePasien.generateSep(data).then(function(e) {
                        if (e.data.data.metadata.code === "200")
                            $scope.model.noSep = e.data.data.response;
                        else {
                            window.messageContainer.error(e.data.data.metadata.message)
                        }
                        $scope.isLoadingRujukan = false;
                    }, function(err) {
                        $scope.isLoadingRujukan = false;
                    });
                }else{
                    $scope.model.noSep = "";
                }
            };
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
                            isRawatJalan: 'T',
                            catatan: '',
                            kdDiagnosa: $scope.model.diagnosa.kdDiagnosa,
                            kelasRawat: $scope.model.kelasDitanggung.kdKelas,
                            noCm: $state.params.noCm,
                            lakaLantas: $scope.item.lakalantas === true ? 1 : 2,
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
            $scope.Simpan = function(){
                $scope.model.tglSEP = new Date()
                if($scope.item.emergency===1){
                    $scope.item.emergency = true
                }else{
                    $scope.item.emergency = false
                }
                if ($scope.model.bertugas===undefined){
                    $scope.bertugas="";
                }else{
                    $scope.bertugas=$scope.model.bertugas.id;
                }

                if($scope.model.noSep===undefined){
                    $scope.model.noSep = "-"
                }
                
                if ($scope.item.kelompokPasien.kelompokPasien === "BPJS"){
                    if($scope.model.kelasDitanggung.kdKelas!==undefined){
                        var kelasDiJamin = $scope.model.kelasDitanggung.kdKelas
                    }else{
                        var kelasDiJamin = $scope.model.kelasDitanggung.id
                    }
                }
                if($scope.item.kelompokPasien.kelompokPasien === "Asuransi lain"){
                    var kelasDiJamin = $scope.model.kelasDitanggung.id
                }
                if($scope.model.diagnosa===undefined){
                    var diagnosis = "-"
                }else{
                     var diagnosis = $scope.model.diagnosa.id
                }
                if($scope.model.namaAsalRujukan===undefined){
                    var namaAsalRujukan = "-"
                }else{
                    var namaAsalRujukan = $scope.model.namaAsalRujukan
                }
                if($scope.model.noRujukan===undefined){
                    var noRujukan = "-";
                    $scope.model.noRujukan = noRujukan;
                }else{
                    var noRujukan = $scope.model.noRujukan
                }
                if($scope.kodeProvider !== undefined){
                    var kodeProvider = $scope.kodeProvider;
                    var namaProvider = $scope.namaProvider;
                    var jenisKepesertaan = $scope.jenisKepesertaan;
                }else{
                    var kodeProvider = "";
                    var namaProvider = "";
                    var jenisKepesertaan = "";
                }
                if ($scope.item.kelompokPasien.kelompokPasien === "BPJS" || $scope.item.kelompokPasien.kelompokPasien === "Asuransi lain"){
                    if ($scope.model.sendiri === true) {
                        var listRawRequired = [
                            "item.ruangan|k-ng-model|Ruangan",
                            "item.asalRujukan|ng-model|Asal Rujukan",
                            "item.kelompokPasien|ng-model|Kelompok Pasien",
                            // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini",
                            "model.namaPeserta|ng-model|Nama peserta",
                            "model.namaPenjamin|k-ng-model|Nama Penjamin",
                            "model.institusiAsalPasien|ng-model|Institusi Asal Pasien",
                            "model.hubunganPeserta|ng-model|Hubungan Peserta",
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
                            "model.institusiAsalPasien|ng-model|Institusi Asal Pasien",
                            "model.noKepesertaan|ng-model|No Kepesertaan",
                            // "model.golonganAsuransi|ng-model|Golongan Asuransi",
                            "model.kelasDitanggung|k-ng-model|Kelas Ditanggung",
                            "model.asalRujukan|k-ng-model|Asal Rujukan",
                            // "model.noRujukan|ng-model|No Rujukan",
                            "model.tglRujukan|ng-model|Tgl Rujukan",
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
                            "kelasDiJamin": {
                                "id": kelasDiJamin
                            },
                            "qAsuransi": $scope.model.namaPenjamin.id,
                            "kdPenjaminPasien": $scope.model.namaPenjamin.id,
                            "alamatLengkap":$scope.model.alamatPeserta,
                            "nikInstitusiAsal": $scope.model.institusiAsalPasien.id,
                            "tglLahir":  TglLahir,
                            "noIdentitas": $scope.model.noIdentitas,
                            "hubunganPeserta":{
                                "id": $scope.model.hubunganPeserta.id
                            },
                            "noAsuransi": $scope.model.noKepesertaan,
                            "noCm": {
                                "id": $scope.sourcePasien.id,
                                "noCm": $scope.noCm
                            },
                            "jenisKelamin": {
                                "id": $scope.sourcePasien.jenisKelamin.id,
                            },
                            "ppkRujukan": "00010002",
                            "diagnosis": {
                                "id": diagnosis
                            },
                            "noKepesertaan": $scope.model.noKepesertaan,
                            "lakalantas":  $scope.item.lakalantas === true ? 1 : 2,
                            "tglRujukan": $scope.model.tglRujukan,
                            "noRujukan": noRujukan,
                            "noSep": $scope.model.noSep,
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
                                "id": item.pegawai === undefined ? undefined : item.pegawai.id,
                            },
                            "isRegistrasiLengkap": item.isRegistrasiLengkap,
                            "isOnSiteService": item.isOnSiteService,
                            "tglRegistrasi": item.tglRegistrasi,
                            "asalRujukan": {
                                "id": item.asalRujukan.id
                            },
                            "jenisPelayanan": item.jenisPasien.name,
                            "kelompokPasien": {
                                "id": item.kelompokPasien.id
                            },
                            "ruangan": {
                                "id": item.ruangan.idRuangan,
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
                            "emergensi": item.emergency
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
                            // debugger;
                            $scope.isNext = true;
                            $scope.isReport = true;
                            $scope.isReportPelayanan = true;
                            $scope.isAsuransi = true;
                            // managePasien.saveRegistrasiPelayanan(dataJson).then(function(e) {
                            //     tempNoRec = e.data.data.noRecAntrian;
                            //     $scope.isReport = true;
                            //     if ($scope.currentNoCm.indexOf('*') > 0) {}
                            //     if (window.isPerjanjian !== undefined) {
                            //         findPasien.CheckNoReconfirm(window.isPerjanjian).then(function(e) {});
                            //     }
                            // });
                        });
                    }else{
                        modelItem.showMessages(isValid.messages);
                    }
                }else{
                    var listRawRequired = [
                        "item.ruangan|k-ng-model|Ruangan",
                        "item.asalRujukan|ng-model|Asal Rujukan",
                        "item.kelompokPasien|ng-model|Kelompok Pasien",
                        // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini"
                        // "userPelapor|ng-model|User"
                    ];

                    var isValid = modelItem.setValidation($scope, listRawRequired);
                   
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
                        "tglRegistrasi": item.tglRegistrasi,
                        "asalRujukan": {
                            "id": item.asalRujukan.id
                        },
                        "jenisPelayanan": item.jenisPasien.name,
                        "kelompokPasien": {
                            "id": item.kelompokPasien.id
                        },
                        "ruangan": {
                            "id": item.ruangan.idRuangan,
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
                        "emergensi": item.emergency
                    }
                    if (dataRegistrasi.pegawai.id === undefined) {
                        delete dataRegistrasi.pegawai;
                    }
                    if (dataRegistrasi.noRecAntrianPasien === undefined) {
                        dataRegistrasi.noRecAntrianPasien = "";
                    }
                        // item.jenisPelayanan = $scope.item.jenisPasien.name; 
                        
                    if(isValid.status){
                        managePasien.saveRegistrasiPelayanan(dataRegistrasi).then(function(e) {
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
                        });
                    } else {
                        modelItem.showMessages(isValid.messages);
                    }
                }
                
            };

            // $scope.Simpan = function() {
            //     debugger;
            //     if($scope.item.emergency===1){
            //         $scope.item.emergency = true
            //     }else{
            //         $scope.item.emergency = false
            //     }
            //     if($scope.kodeProvider !== undefined && $scope.namaProvider !== undefined){
            //         var kodeProvider = $scope.kodeProvider;
            //         var namaProvider = $scope.namaProvider;
            //         var jenisKepesertaan = $scope.jenisKepesertaan;
            //     }else{
            //         var kodeProvider = "";
            //         var namaProvider = "";
            //         var jenisKepesertaan = "";
            //     }
            //     if ($scope.item.kelompokPasien.kelompokPasien === "BPJS" || $scope.item.kelompokPasien.kelompokPasien === "Asuransi lain"){
            //         var listRawRequired = [
            //             "item.ruangan|k-ng-model|Ruangan",
            //             "item.asalRujukan|ng-model|Asal Rujukan",
            //             "item.kelompokPasien|ng-model|Kelompok Pasien",
            //             "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini",
            //             "model.namaPenjamin|k-ng-model|Nama Penjamin",
            //             "model.hubunganPeserta|ng-model|Hubungan Peserta",
            //             "model.institusiAsalPasien|ng-model|Institusi Asal Pasien",
            //             "model.noKepesertaan|ng-model|No Kepesertaan",
            //             "model.kelasDitanggung|k-ng-model|Kelas Ditanggung",
            //             "model.asalRujukan|k-ng-model|Asal Rujukan",
            //             "model.noRujukan|ng-model|No Rujukan",
            //             "model.tglRujukan|ng-model|Tgl Rujukan",
            //             "model.diagnosa|ng-model|Diagnosa"
            //         ];
            //         var isValid = modelItem.setValidation($scope, listRawRequired);
            //         if(isValid.status){
            //             if ($scope.model.bertugas===undefined){
            //                 $scope.bertugas="";
            //             }else{
            //                 $scope.bertugas=$scope.model.bertugas.id;
            //             }
            //             if($scope.model.noSep===undefined){
            //                 $scope.model.noSep = "-"
            //             }
            //             if($scope.model.diagnosa===undefined){
            //                 var diagnosis = "-"
            //             }else{
            //                  var diagnosis = $scope.model.diagnosa.id
            //             }
            //             if ($scope.item.kelompokPasien.kelompokPasien === "BPJS"){
            //                 var kelasDiJamin = $scope.model.kelasDitanggung.kdKelas
            //             }
            //             if($scope.item.kelompokPasien.kelompokPasien === "Asuransi lain"){
            //                 var kelasDiJamin = $scope.model.kelasDitanggung.id
            //             }
            //             if($scope.sendiri===true){
            //                 var kelasDiJamin = $scope.model.kelasDitanggung.id
            //             }else{
            //                 var kelasDiJamin = $scope.model.kelasDitanggung.kdKelas
            //             }
            //             var TglSEP = dateHelper.getTanggalFormattedNew($scope.model.tglSEP);
            //             var TglLahir = dateHelper.getTanggalFormattedNew($scope.model.tglLahir);
            //             var dataAsuransi = {
            //                 "kdLastUnitBagian": $scope.bertugas,
            //                 "namaPeserta": $scope.model.namaPeserta,
            //                 "kelasDiJamin": {
            //                     "id": kelasDiJamin
            //                 },
            //                 "qAsuransi": $scope.model.namaPenjamin.id,
            //                 "kdPenjaminPasien": $scope.model.namaPenjamin.id,
            //                 "alamatLengkap":$scope.model.alamatPeserta,
            //                 "nikInstitusiAsal": $scope.model.institusiAsalPasien.id,
            //                 "tglLahir":  TglLahir,
            //                 "noIdentitas": $scope.model.noIdentitas,
            //                 "hubunganPeserta":{
            //                     "id": $scope.model.hubunganPeserta.id
            //                 },
            //                 "noAsuransi": $scope.model.noKepesertaan,
            //                 "noCm": {
            //                     "id": $scope.sourcePasien.id,
            //                     "noCm": $scope.noCm
            //                 },
            //                 "jenisKelamin": {
            //                     "id": $scope.sourcePasien.jenisKelamin.id,
            //                 },
            //                 "ppkRujukan": "00010002",
            //                 "diagnosis": {
            //                     "id": diagnosis
            //                 },
            //                 "noKepesertaan": $scope.model.noKepesertaan,
            //                 "lakalantas":  $scope.item.lakalantas === true ? 1 : 2,
            //                 "tglRujukan": $scope.model.tglRujukan,
            //                 "noRujukan": $scope.model.noRujukan,
            //                 "noSep": $scope.model.noSep,
            //                 "jenisPeserta": jenisKepesertaan,
            //                 "kdProvider": kodeProvider,
            //                 "nmProvider": namaProvider,
            //                 "diagnosa": {
            //                     "id": diagnosis
            //                 },
            //                 "tanggalSep": TglSEP
            //             }

            //             modelItem.set("PasienVO", $scope.item);
            //             $scope.item.isRegistrasiLengkap = 0;
            //             $scope.item.isOnSiteService = 0;
            //             var item = modelItem.beforePost($scope.item);
            //             if (item.pegawai.dokterId === undefined) {
            //                 var pegawai="";
            //             }else{
            //                 var pegawai = item.pegawai.dokterId;
            //             }
            //             var dataRegistrasi = {
            //                 "pegawai": {
            //                     "id": pegawai
            //                 },
            //                 "isRegistrasiLengkap": item.isRegistrasiLengkap,
            //                 "isOnSiteService": item.isOnSiteService,
            //                 "tglRegistrasi": item.tglRegistrasi,
            //                 "jenisPelayanan": item.jenisPelayanan,
            //                 "kelompokPasien": {
            //                     "id": item.kelompokPasien.id
            //                 },
            //                 "ruangan": {
            //                     "id": item.ruangan.idRuangan,
            //                     "departemenId": item.ruangan.departemenId
            //                 },
            //                 "pasien": {
            //                     "id": item.pasien.id,
            //                     "pasienDaftar": {
            //                         "noRec": item.pasien.pasienDaftar.noRec
            //                     },
            //                     "noCm": item.pasien.noCm
            //                 },
            //                 "asalRujukan": {
            //                     "id": item.asalRujukan.id
            //                 },
            //                 "emergensi": item.emergency
            //             }
            //             // item.jenisPelayanan = $scope.item.jenisPasien.name; 
            //             if (dataRegistrasi.pegawai.id === "") {
            //                 delete dataRegistrasi.pegawai;
            //             }
            //             if (dataAsuransi.diagnosis.id === "-") {
            //                 debugger;
            //                 delete dataAsuransi.diagnosis;
            //             }
            //             if(dataAsuransi.diagnosa.id === "-"){
            //                 delete dataAsuransi.diagnosa
            //             }
            //             var dataJson={
            //                 "registrasiPelayanan": dataRegistrasi,
            //                 "asuransiPasien": dataAsuransi
            //             }
            //             managePasien.saveAsuransiPasien(dataJson).then(function(e) {
            //                 $scope.isNext = true;
            //                 $scope.isReport = true;
            //                 $scope.isReportPelayanan = true;
            //                 $scope.isAsuransi = true;
            //                 // managePasien.saveRegistrasiPelayanan(dataJson).then(function(e) {
            //                 //     tempNoRec = e.data.data.noRecAntrian;
            //                 //     $scope.isReport = true;
            //                 //     if ($scope.currentNoCm.indexOf('*') > 0) {}
            //                 //     if (window.isPerjanjian !== undefined) {
            //                 //         findPasien.CheckNoReconfirm(window.isPerjanjian).then(function(e) {});
            //                 //     }
            //                 // });
                            
            //             });
            //         }else{
            //             modelItem.showMessages(isValid.messages);
            //         }
            //     }else{
            //         var listRawRequired = [
            //             "item.ruangan|k-ng-model|Ruangan",
            //             "item.asalRujukan|ng-model|Asal Rujukan",
            //             "item.kelompokPasien|ng-model|Kelompok Pasien",
            //             // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini"
            //             // "userPelapor|ng-model|User"
            //         ];

            //         var isValid = modelItem.setValidation($scope, listRawRequired);
                   
            //         modelItem.set("PasienVO", $scope.item);
            //         $scope.item.isRegistrasiLengkap = 0;
            //         $scope.item.isOnSiteService = 0;
            //         var item = modelItem.beforePost($scope.item);

            //         // remove object pegawai jika dokter tidak di pilih saat registrasi 
            //         if (item.pegawai.id === undefined) {
            //                 var pegawai="";
            //         }else{
            //             var pegawai = item.pegawai.id;
            //         }
            //         // item.jenisPelayanan = $scope.item.jenisPasien.name;
            //         var temp = {
            //             "pegawai": {
            //                 "id": pegawai
            //             },
            //             "isRegistrasiLengkap": item.isRegistrasiLengkap,
            //             "isOnSiteService": item.isOnSiteService,
            //             "tglRegistrasi": item.tglRegistrasi,
            //             "jenisPelayanan": item.jenisPelayanan,
            //             "kelompokPasien": {
            //                 "id": item.kelompokPasien.id
            //             },
            //             "ruangan": {
            //                 "id": item.ruangan.idRuangan,
            //                 "departemenId": item.ruangan.departemenId
            //             },
            //             "pasien": {
            //                 "id": item.pasien.id,
            //                 "pasienDaftar": {
            //                     "noRec": item.pasien.pasienDaftar.noRec
            //                 },
            //                 "noCm": item.pasien.noCm
            //             },
            //             "asalRujukan": {
            //                 "id": item.asalRujukan.id
            //             },
            //             "emergensi": item.emergency
            //         }
            //         if (temp.pegawai.id === "") {
            //                 delete temp.pegawai;
            //             }
                    
            //         if(isValid.status){
            //             managePasien.saveRegistrasiPelayanan(temp).then(function(e) {
            //                 tempNoRec = e.data.data.noRecAntrian,
            //                 tempNoCm = e.data.data.noCm;
            //                 $scope.isReport = true;
            //                 $scope.isNext = true;
            //                 $scope.isReportPendaftaran = true; // show button cetak gelang dan sumlist
            //                 if ($scope.currentNoCm.indexOf('*') > 0) {}
            //                 if (window.isPerjanjian !== undefined) {
            //                     findPasien.CheckNoReconfirm(window.isPerjanjian).then(function(e) {});
            //                 }
            //             });
            //         } else {
            //             modelItem.showMessages(isValid.messages);
            //         }
            //     }
                
            // };

        }
    ]);
});