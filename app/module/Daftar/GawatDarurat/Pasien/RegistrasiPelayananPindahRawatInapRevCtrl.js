define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('RegistrasiPelayananPindahRawatInapRevCtrl', ['ManagePasien','ManageSarprasPhp', 'ManageTataRekening','$scope', 'ModelItem', '$state', '$rootScope', '$timeout', '$window','FindPasien', 'FindPegawai', 'DateHelper', 'CetakHelper',
        function(managePasien,ManageSarprasPhp, manageTataRekening,$scope, modelItem, $state, $rootScope, $timeout, $window, findPasien, findPegawai, dateHelper, cetakHelper) { // form registrasi pelayanan untuk rawat inap duplicate from RegistrasiPelayananCtrl
            var responData;
            $scope.item = {};
            $scope.model = {};
            $scope.jenisPasiens = [{
                id: 1, name: "Reguler"
            }, {
                id: 2, name: "Eksekutif"
            }]
            $scope.now = new Date();
            $scope.formatJam24 = {
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm" 		//set drop down time format to 24 hours
            }
            $scope.listPasien = [];
            $scope.doneLoad = $rootScope.doneLoad;
            $scope.pilihRuangan = function(id) {
                var ruanganId = id;
                findPasien.getKelasByRuangan(ruanganId).then(function(e) {
                    $scope.listKelas = e.data.data.listData;
                })
                findPasien.findDokterDPJP(id).then(function(e){
                    $scope.dokters = new kendo.data.DataSource({
                        data: e.data
                    });
                })
            }
   ManageSarprasPhp.getDataTableTransaksi("mutasi/get-data-combo", true).then(function (dat) {
        $scope.listDokter = dat.data.dokter;
      
        })
    
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
            })
            $scope.$watch('item.kelas', function(e) {
                if (e === undefined) return;
                var kelasId = $scope.item.kelas.id;
                var ruanganId = $scope.item.ruangan.id;
                // debugger;
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
            $scope.now = new Date();
            $scope.asalrujukans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-asal-rujukan');
            // $scope.ruangans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
              // $scope.ruangans = modelItem.kendoHttpSource('mutasi/get-data-combo');
           ManageSarprasPhp.getDataTableTransaksi("mutasi/get-data-combo", true).then(function (dat) {
                $scope.ruangans = dat.data.ruanganranap;
              
           })
            /*add_hanafi_03112016*/
            findPasien.getKelompokPasien().then(function(e) {
                $scope.kelompokPasiens = e.data.data
            })
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
            // $scope.$watch('noCm', function(e) {
            //     $scope.itemPatiens = findPasien.getDataPasien("", $scope.noCm, "", "", "");
            //     $scope.itemPatiens.then(function(e) {
            //         $scope.listPasien = new kendo.data.DataSource({
            //             data: e.data.data.listData,
            //         });
            //     });

            // });
            $scope.currentNoCm = $state.params.noCm;
            // modelItem.get("RegistrasiPelayananVO").then(function(data) {
            //     $rootScope.doneLoad = false;
            //     $scope.doneLoad = false;
            //     $scope.item = data;
            //     $scope.item.tglRegistrasi = $scope.now;
            //     if ($state.params.noCm !== undefined) {
            //         if ($scope.currentNoCm.indexOf('*') > 0) {

            //             // findPasien.getReservasiPasienById($scope.currentNoCm.split('*')[0]).then(function(e) {
            //             //     // $scope.item = e.data.data;
            //             //     // $scope.item.pasien = {
            //             //     //     namaPasien: $scope.item.namaPasien
            //             //     // }
            //             //     // $scope.item.pasien.desaKelurahan = $scope.item.desaKelurahan;
            //             //     // $scope.item.pasien.tempatLahir = $scope.item.tempatLahir;
            //             //     // $scope.item.namaAyah = $scope.item.namaAyah;
            //             //     // $scope.item.pasien.tempatLahir = $scope.item.tempatLahir;
            //             //     // $scope.item.kodePos = $scope.item.desaKelurahan.kodePos;
            //             //     // $scope.findKodePos();

            //             // });
            //             findPasien.getByNoCM($scope.currentNoCm.split('*')[1]).then(function(e) {
            //                 $scope.item.pasien = modelItem.beforePost(e.data.data);
            //                 debugger;

            //                 findPasien.getReservasiPasienById($scope.currentNoCm.split('*')[0]).then(function(e) {
            //                     $scope.item.kelompokPasien = e.data.data.jenisPasien;
            //                     $scope.item.ruangan = e.data.data.ruangan;
            //                     $scope.item.pegawai = e.data.data.pegawai;

            //                     if (e.data.data.type === "EKSEKUTIF") {
            //                         $scope.item.jenisPasien = $scope.jenisPasiens[1];
            //                     } else
            //                         $scope.item.jenisPasien = $scope.jenisPasiens[0];

            //                 });
            //                 if (!$scope.$$phase)
            //                     $scope.$apply();
            //             });

            //         } else {
            //             findPasien.getByNoCM($scope.currentNoCm).then(function(e) {
            //                 debugger;
            //                 $scope.item.pasien = modelItem.beforePost(e.data.data);
            //                 // $scope.item.pasien.tglLahir = dateHelper.getTanggalFormatted(new Date($scope.item.pasien.tglLahir));
            //                 if (!$scope.$$phase)
            //                     $scope.$apply();
            //             });
            //         }
            //     }
            // },
            // function(error) {
            //     $rootScope.doneLoad = false;
            //     $scope.doneLoad = false;
            //     window.messageContainer.error(error);
            // });
            
            var tempNoRec = 0;

            // $scope.cetak = function() {
            //     window.location = configuration.urlPrinting + "registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + tempNoRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize()
            // }
            $scope.cetak = function() {
                window.messageContainer.error('Cetak No Antrian hanya untuk Rawat Jalan');
                // if($scope.item != undefined){
                //     debugger;
                //     var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + $scope.item.noRec);
                //     window.open(fixUrlLaporan, '', 'width=800,height=600')
                // }
            }
            $scope.formatNum = {
                format: "#.#",
                decimals: 0
            }
            $scope.cetakGelang = function() {
                if($scope.item != undefined){
                    var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/gelangPasien?id=" + $scope.item.pasien.id);
                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
            }
            // $scope.cetakLabel = function() {
            //     if($scope.item != undefined){
            //         var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
            //         window.open(fixUrlLaporan, '', 'width=800,height=600')
            //     }
            // }
             $scope.cetakLabel = function() {
                // if($scope.item != undefined){
                //     var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $scope.item.pasien.noCm);
                //     window.open(fixUrlLaporan, '', 'width=800,height=600')
                // }
                $scope.dats = {
                    qty: 0
                }
                $scope.dialogCetakLabel.center().open();
            }
            $scope.pilihQty = function(data) {
                var listRawRequired = [
                    "dats.qty|k-ng-model|kuantiti"
                ];
                var isValid = modelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    var qty = data.qty;
                    if(qty !== undefined){
                        // var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $scope.item.pasienDaftar.noRegistrasi + "&qty=" + qty);
                        // window.open(fixUrlLaporan, '', 'width=800,height=600')
                        //cetakan langsung service VB6 by grh
                        var client = new HttpClient();
                        client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-labelpasien=1&norec=' + $scope.item.pasien.pasienDaftar.noRegistrasi + '&view=false&qty=' + qty, function(response) {
                            // do something with response
                        });

                    }
                    $scope.dialogCetakLabel.close();
                } else {
                    modelItem.showMessages(isValid.messages);
                }
            };
            $scope.generalConsent = function() {
                if($scope.item != undefined){
                    debugger;
                    var fixUrlLaporan = cetakHelper.open("reporting/lapGeneralConsent?noRegistrasi=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
            }
            // $scope.ringkasanInOut = function() {
            //     if($scope.item != undefined){
            //         var fixUrlLaporan = cetakHelper.open("reporting/lapRingkasanKeluarMasuk?noRegistrasi=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
            //         window.open(fixUrlLaporan, '', 'width=800,height=600')
            //     }
            // }

            modelItem.getDataDummyGeneric("JenisDiagnosa", false, false, 10).then(function(data) {
                $scope.sourceJenisDiagnosisPrimer = data;
            });
             $scope.ringkasanInOut = function(){
                if($scope.item != undefined){
                    findPasien.getDiagnosaNyNoRec($scope.item.pasien.noRec).then(function(e){
                        if (e.data.data.DiagnosaPasien.length > 0) {
                            $scope.cetakBro();
                        } else {
                            $scope.item.jenisDiagnosis = $scope.sourceJenisDiagnosisPrimer[4];
                            modelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                                $scope.sourceDiagnosisPrimer = data;
                            });
                            $scope.icd10.center().open();
                        }
                    })
                    // $scope.item.jenisDiagnosis = $scope.sourceJenisDiagnosisPrimer[0];
                    // ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                    //     $scope.sourceDiagnosisPrimer = data;
                    // });
                    // $scope.icd10.center().open();
                }
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
             $scope.cetakRMK = function() {
                var norReg = ""
                if ($scope.item.pasien.pasienDaftar != undefined) {
                    norReg = "noReg=" + $scope.item.pasien.pasienDaftar.noRegistrasi;
                }   
                manageTataRekening.getDataTableTransaksi("operator/get-data-diagnosa-pasien?"
                    + norReg
                ).then(function (data) {
                var dataDiagnosa = data.data.datas[0]
                
                if ($scope.item.jenisDiagnosis == undefined) {
                    alert("Pilih Jenis Diagnosa terlebih dahulu!!")
                    return
                }
                if ($scope.item.diagnosisPrimer == undefined) {
                    alert("Pilih Kode Diagnosa dan Nama Diagnosa terlebih dahulu!!")
                    return
                }  

                var norecDiagnosaPasien = "";
                if (dataDiagnosa != undefined) {
                    norecDiagnosaPasien = dataDiagnosa.norec_diagnosapasien;
                }

                var keterangan ="";
                if ($scope.item.keteranganDiagnosis == undefined){
                    keterangan = "-"
                }
                else{
                    keterangan = $scope.item.keteranganDiagnosis;
                }
               

                $scope.now = new Date();
                var detaildiagnosapasien = {
                    norec_dp: norecDiagnosaPasien,
                    noregistrasifk: dataDiagnosa.norec_apd,
                    objectdiagnosafk: $scope.item.diagnosisPrimer.id,
                    objectjenisdiagnosafk: $scope.item.jenisDiagnosis.id,
                    tglpendaftaran:  moment($scope.item.pasien.pasienDaftar.tglRegistrasi).format('YYYY-MM-DD hh:mm:ss'),
                    tglinputdiagnosa: moment($scope.now).format('YYYY-MM-DD hh:mm:ss'),
                    keterangan: keterangan
                }
                manageTataRekening.postSaveDiagnosaRMK(detaildiagnosapasien).then(function(e){
                        $scope.item.keteranganDiagnosis="";
                        $scope.item.diagnosisPrimer="";
                        // loadData()
                        $scope.icd10.close();
                        var client = new HttpClient();
                        client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar-byNorec=1&norec=' + dataDiagnosa.norec_apd + '&view=false', function(response) {
                        }); 
                        // $scope.cetakBro();
                    })
            });
            
                // var listRawRequired = [
                //     "item.diagnosisPrimer|k-ng-model|Diagnosa awal"
                // ]
                // var isValid = modelItem.setValidation($scope, listRawRequired);

                // if(isValid.status){
                //     if($scope.item != undefined){
                //         var saveData = {
                //             pasien: {
                //                 id: $scope.item.pasien.id
                //             },
                //             tanggalPendaftaran: $scope.item.pasien.pasienDaftar.tglRegistrasi,
                //             // moment($scope.item.pasien.pasienDaftar.tglRegistrasi).format('YYYY-MM-DD hh:mm:ss'),
                //             diagnosis: [{
                //                 diagnosa: {
                //                     id: $scope.item.diagnosisPrimer.id
                //                 },
                //                 jenisDiagnosa: $scope.item.jenisDiagnosis,
                //                 keterangan: $scope.item.keteranganDiagnosis
                //             }],
                //             noRecPasienDaftar: $scope.item.pasien.pasienDaftar.noRec
                //         }
                //         // console.log(JSON.stringify(saveData));
                //         managePasien.saveDiagnosaRmk(saveData).then(function(e){
                //             $scope.icd10.close();
                //             $scope.cetakBro();
                 
                //         })
                //     }
                // } else {
                //     modelItem.showMessages(isValid.messages);
                // }
                
            }
            $scope.cetakBro = function(){
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar-byNorec=1&norec=' + $scope.item.noRec + '&view=false', function(response) {
                        // do something with response
                });
            }
                $scope.inputTindakan = function(){
                // if ($scope.item.pasien == undefined) {
                //     alert("Pilih pelayanan dahulu!");
                //     return;
                // }
                // if ($scope.dataSelected.strukfk != null) {
                //  alert("Pelayanan yang sudah di Verif tidak bisa di ubah!");
    //                 return;
                // }
                if ($scope.item){
                    $state.go('dashboardpasien.InputBilling',{
                           noRec:responData.norec,
                        noAntrianPasien: responData.norec,
                        noRegister: $scope.item.pasien.pasienDaftar.noRec,  
                        // noRec:$scope.item.pasien.pasienDaftar.noRec,
                        // noAntrianPasien: $scope.item.pasien.noRecAntrianPasien,
                        // noRegister: $scope.item.pasien.pasienDaftar.noRegistrasi,   
                    });
                } else {
                    messageContainer.error('Pasien belum di pilih')
                }
            }
            if ($scope.model.tglRujukan === undefined)
                $scope.model.tglRujukan = new Date();
            $scope.model.lakalantas = false;

            // findPasien.getByNoRegistrasi($state.params.noRegister).then(function(e) {
            //     $scope.item.registrasi = e.data;
            // });

            // findPasien.getByNoCM($state.params.noCm).then(function(e) {
            //     debugger;
            //     $scope.model.pasien = e.data.data;
            //     $scope.sourcePasien = e.data.data;
            //     // $scope.tglLahir = new Date(e.data.data.tglLahir);
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
                    $scope.model.noSep=undefined;
                    $scope.kelasBpjs = true;
                    $scope.kelasPenjamin = false;
                }
                $scope.disableSEP = data;
            };

            findPasien.getJenisPembiayaan().then(function(e){
                $scope.sourceJenisPembiayaan = e.data.data.listData;
            });

            findPasien.getDataAsuransiPasien().then(function(e){
                $scope.isRouteLoading = true;
                $scope.sourceHubunganPasien = e.data.data.hubunganPesertaAsuransi;
                $scope.sourceUnitTugas = e.data.data.unitBagian;
                $scope.sourceKelasDitanggung = e.data.data.kelasDitanggung;
                $scope.sourceDiagnosa = e.data.data.diagnosa;
                $scope.sourceGolonganAsuransi = e.data.data.golonganAsuransi;
            }).then(function(){
                // get pasien's registration detail and bind to $scope.model (termasuk data asuransi yang di input di registrasi pelayanan)
                findPasien.getDataPelayananPasien($state.params.noRec).then(function(data){
                    $scope.model = data.data.data;
                    $scope.model.tglRegistrasi = new Date($scope.model.tglRegistrasi);
                    $scope.item.asalRujukan = $scope.model.asalRujukan;
                    $scope.item.kelompokPasien = $scope.model.kelompokPasien;

                    // $scope.model.namaPenjamin = $scope.model.kelompokPasien; //di set saat kelompok pasien bukan umum/pribadi
                    switch($scope.model.jenisLayanan){
                        case ("Reguler"):
                            $scope.item.jenisPasien = $scope.jenisPasiens[0];
                            break;
                        case ("Eksekutif"):
                            $scope.item.jenisPasien = $scope.jenisPasiens[1];
                            break;
                        default:
                            break;
                    }
                    // checking rawat inap or not based on departemenId
                    // if ($scope.model.ruangan.departemenId === 16 || $scope.model.ruangan.departemenId === 35)
                    //     $scope.model.rawatInap = true;
                    if ($scope.model.asuransi !== undefined){
                        $scope.model.sendiri = true;
                        if($scope.model.asuransi.pemakaianAsuransi.lakalantas === 2)
                            $scope.model.lakalantas = false;
                        else
                            $scope.model.lakalantas = true;
                        $scope.model.diagnosa = $scope.model.asuransi.pemakaianAsuransi.diagnosis;
                        $scope.model.noSep = $scope.model.asuransi.pemakaianAsuransi.noSep;
                        $scope.model.tglSEP = $scope.model.asuransi.pemakaianAsuransi.tanggalSep === undefined ? new Date() : new Date($scope.model.asuransi.pemakaianAsuransi.tanggalSep);
                        $scope.model.tglRujukan = $scope.model.asuransi.pemakaianAsuransi.tglRujukan === undefined ? new Date() : new Date($scope.model.asuransi.pemakaianAsuransi.tglRujukan);
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
            }).then(function(){
                findPasien.getRencanaAdmisi($state.params.noRecAdmisi).then(function(data) {
                    $scope.dataAdmisi = data.data.admisiRencanaPindahRuangan;
                    $scope.noBedRencana ={
                        "id": $scope.dataAdmisi.noBedRencana
                    }

                    $scope.item.tglDaftar=new Date($scope.dataAdmisi.tglKeluarRencana);
                    $scope.item.ruangan=$scope.dataAdmisi.ruanganRencana;
                    $scope.item.kelas=$scope.dataAdmisi.kelasRencana;
                    $scope.item.kamar=$scope.dataAdmisi.kelasKamarRencana;
                    $scope.item.nomorTempatTidur = $scope.noBedRencana
                    if($scope.item.ruangan!==undefined){
                        findPasien.findDokterDPJP($scope.item.ruangan.id).then(function(e){
                            $scope.dokters = new kendo.data.DataSource({
                                data: e.data
                            });
                        })
                    }
                });
                $scope.isRouteLoading = false;
            }).then(function(){
                // get data antrian berdasarkan nomor antrian (tanpa data asuransi yang di input di registrasi pelayanan)
                findPasien.getDataByNorecAntrian($state.params.noRecAntrian).then(function(e){
                    $scope.item.pasien = e.data.data;
                    $scope.item.pasien.tglLahir = new Date($scope.item.pasien.tglLahir);
                    $scope.item.pasien.tglDaftar = new Date($scope.item.pasien.tglDaftar);
                });
                modelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                    $scope.sourceDiagnosisPrimer = data;
                });
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
            //     });
            //     if($scope.model.namaPenjamin.kelompokPasien.indexOf('BPJS') >= 0){
            //         $scope.SepCheck=false;
            //     }else{
            //         $scope.SepCheck=true;
            //     }
            // };

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
            $scope.SepCheck = true;
            $scope.disAnakKe = true;
            $scope.textAnakKe = function(){
                // debugger;
                if($scope.model.hubunganPeserta.id === 3){
                    $scope.disAnakKe = false;
                }else{
                    $scope.model.anakKe="";
                    $scope.disAnakKe = true;
                }
            };

            $scope.getRujukan=function(){
                // debugger;
                if($scope.item.asalRujukan != undefined){
                    $scope.model.asalRujukan = $scope.item.asalRujukan
                }
            }

            // $scope.check=function(){
            //     var id = $scope.model.namaPenjamin.id;
            //     if(id === 2 || id === 4){
            //         $scope.checkKepesertaan();
            //     }
            // }
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
                if (!$scope.model.noSep) return;
                if ($scope.model.sendiri) return;
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
                    $scope.isLoading = false;
                }, function(err) {
                    $scope.isLoading = false;
                });
            };
            // $scope.arrNoSEP = [];
            // $scope.NoSEP = function(){
            //     debugger;
            //     if ($scope.model.noSEP === true) {
            //         var data = {
            //             nokartu: $scope.noKartu,
            //             tanggalRujukan: new moment($scope.model.tglRujukan).format('YYYY-MM-DD'),
            //             noRujukan: $scope.model.noRujukan,
            //             ppkRujukan: '0901R001',
            //             isRawatJalan: 'T',
            //             catatan: '',
            //             kdDiagnosa: $scope.model.diagnosa.kdDiagnosa,
            //             kelasRawat: $scope.model.kelasDitanggung.kdKelas,
            //             noCm: $state.params.noCm
            //         };
            //         console.log(JSON.stringify(data));
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
            //     debugger;
            // };
            // $scope.cekAsuransi = function(){
            //     if($scope.item.kelompokPasien.kelompokPasien != "BPJS"){
            //         $scope.kelasPenjamin = true;
            //         $scope.kelasBpjs = false;
            //         $scope.noNonBPJS = true;
            //         $scope.noBPJS = false;
            //         $scope.isCheckSJP = false;
            //         $scope.isNoCheckSJP = true;
            //     }else{
            //         $scope.kelasBpjs = true;
            //         $scope.kelasPenjamin = false;
            //         $scope.noNonBPJS = false;
            //         $scope.noBPJS = true;
            //         $scope.isCheckSJP = true;
            //         $scope.isNoCheckSJP = false;
            //     }
            // }
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
                    "model.diagnosa|k-ng-model|Diagnosa"
                ];
                if ($scope.model.rawatInap) {
                    listRawRequired.push("item.kelas|k-ng-model|Kelas Ditanggung");
                }
                var isValid = modelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    if($scope.model.lokasiLakaLantas !=undefined){
                       var lokasiLaka = $scope.model.lokasiLakaLantas;
                   }else{
                        var lokasiLaka = '';
                   }
                //    if($scope.model.diagnosa){
                //        findPasien.findDiagnosabyKode($scope.model.diagnosa).then(function(e){
                //            $scope.model.diagnosis = e.data.data[0];
                //        })
                //    }
                    var data = {
                        nokartu: $scope.noKartu,
                        tanggalRujukan: new moment($scope.model.tglRujukan).format('YYYY-MM-DD HH:mm:ss'),
                        noRujukan: $scope.model.noRujukan === undefined ? 0 : $scope.model.noRujukan,
                        ppkRujukan: '0901R001',
                        isRawatJalan: 'F',
                        catatan: '',
                        poliTujuan: $scope.item.ruangan.id,
                        kdDiagnosa: $scope.model.diagnosa.kdDiagnosa,
                        kelasRawat: $scope.item.kelas.id,
                        noCm: $state.params.noCm,
                        lakaLantas: $scope.model.lakalantas === true ? 1 : 2,
                        lokasiLaka: lokasiLaka,
                        tglSep: new moment($scope.model.tglSEP).format('YYYY-MM-DD HH:mm:ss')
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
            $scope.Save = function() {
                // if($scope.model.noRujukan){
                //     var num=$scope.model.noRujukan;
                //     var str = num.toString();
                //     if(str.length !== 19){
                //         messageContainer.error('No Rujukan harus 19 Karakter');
                //         return;
                //     }
                // };
                if($scope.model.tglRujukan && $scope.model.tglSEP){
                    if(new Date($scope.model.tglRujukan) > new Date($scope.model.tglSEP)){
                        messageContainer.error('TANGGAL SEP HARUS LEBIH KECIL DARI TGL RUJUKAN');
                        return;
                    }
                }
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
                if ($scope.item.kelompokPasien.kelompokPasien.indexOf("Lainnya") < 0){
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
                            "model.noRujukan|ng-model|No Rujukan",
                            "model.tglRujukan|ng-model|Tgl Rujukan",
                            "model.diagnosa|ng-model|Diagnosa"
                        ];
                    }
                //     if($scope.item.asalRujukan.asalRujukan.indexOf('Datang Sendiri') >= 0)
                //      listRawRequired.push("model.noRujukan|ng-model|No Rujukan");
                //     var isValid = modelItem.setValidation($scope, listRawRequired);
                //     if(isValid.status){
                //         var TglLahir = dateHelper.getTanggalFormattedNew($scope.model.tglLahir);
                //         // var TglSEP = dateHelper.getTanggalFormattedNew($scope.model.tglSEP);
                //         var dataAsuransi = {
                //             "kdLastUnitBagian": $scope.bertugas,
                //             "namaPeserta": $scope.model.namaPeserta,
                //             "kelasDiJamin": $scope.model.kelasDitanggung,
                //             "qAsuransi": $scope.model.namaPenjamin.id,
                //             "kdPenjaminPasien": $scope.model.namaPenjamin.id,
                //             "alamatLengkap":$scope.model.alamatPeserta,
                //             "nikInstitusiAsal": $scope.model.institusiAsalPasien.id,
                //             "tglLahir":  dateHelper.getTanggalFormattedNew($scope.model.tglLahir),
                //             "noIdentitas": $scope.model.noIdentitas,
                //             "hubunganPeserta":{
                //                 "id": $scope.model.hubunganPeserta.id
                //             },
                //             "noAsuransi": $scope.model.noKepesertaan,
                //             "noCm": {
                //                 "id": $scope.item.pasien.id,
                //                 "noCm": $scope.item.pasien.noCm
                //             },
                //             "jenisKelamin": {
                //                 "id": $scope.item.pasien.jenisKelamin.id,
                //             },
                //             "ppkRujukan": "00010002",
                //             "diagnosis": {
                //                 "id": diagnosis
                //             },
                //             "noKepesertaan": $scope.model.noKepesertaan,
                //             "lakalantas":  $scope.model.lakalantas === true ? 1 : 2,
                //             "tglRujukan": $scope.model.tglRujukan,
                //             "noRujukan": $scope.model.noRujukan,
                //             "noSep": $scope.model.noSep === undefined ? null : $scope.model.noSep,
                //             "jenisPeserta": $scope.jenisKepesertaan === undefined ? "" : $scope.jenisKepesertaan,
                //             "kdProvider": $scope.kodeProvider === undefined ? "" : $scope.kodeProvider,
                //             "nmProvider": $scope.namaProvider === undefined ? "" : $scope.namaProvider,
                //             "diagnosa": {
                //                 "id": diagnosis
                //             },
                //             "tanggalSep": $scope.model.tglSEP
                //         }
                        
                //         modelItem.set("PasienVO", $scope.item);
                //         $scope.item.isRegistrasiLengkap = 0;
                //         $scope.item.isOnSiteService = 0;
                //         var item = modelItem.beforePost($scope.item);

                //         var dataRegistrasi = {
                //             "pegawai": {
                //                 "id": item.pegawai === undefined ? undefined : item.pegawai.dokterId,
                //             },
                //             "isRegistrasiLengkap": item.isRegistrasiLengkap,
                //             "isOnSiteService": item.isOnSiteService,
                //             "tglRegistrasi": item.tglRegistrasi,
                //             "jenisPelayanan": item.jenisPelayanan,
                //             "kelompokPasien": {
                //                 "id": item.kelompokPasien.id
                //             },
                //             "ruangan": {
                //                 "id": item.ruangan.id,
                //                 "departemenId": item.ruangan.departemenId
                //             },
                //             "pasien": {
                //                 "id": item.pasien.id,
                //                 "pasienDaftar": {
                //                     "noRec": item.pasien.pasienDaftar.noRec
                //                 },
                //                 "noCm": item.pasien.noCm
                //             },
                //             "noRecAntrianPasien": $scope.item.pasien.noRecAntrianPasien,
                //             "asalRujukan": {
                //                 "id": item.asalRujukan.id
                //             },
                //             "kelas": {
                //                 "id": item.kelas.id
                //             },
                //             "kamar": {
                //                 "id": item.kamar.id
                //             },
                //             "nomorTempatTidur": {
                //                 "id": item.nomorTempatTidur.id
                //             },
                //             "status":"pindah Kamar",
                //             "noRecPasienDaftar": item.pasien.pasienDaftar.noRec,
                //             // "admisiRencanaPindahRuangan":{
                //             //     "noRec": $scope.dataAdmisi.noRec,
                //             //     "noRecRegistrasiPelayananPasien": item.pasien.noRecRegistrasiPelayananPasien,
                //             //     "registrasiPelayananPasien":{
                //             //         "noRec":$scope.dataAdmisi.registrasiPelayananPasien.noRec
                //             //     },
                //             //     "tglKeluarRencana":$scope.dataAdmisi.tglKeluarRencana,
                //             //     "kelasRencana":{
                //             //         "id":item.kelas.id
                //             //     },
                //             //     "ruanganRencana":{
                //             //         "id": item.ruangan.id
                //             //     },
                //             //     "kelasKamarRencana":{
                //             //         "id":item.kamar.id
                //             //     },
                //             //     "noBedRencana":item.nomorTempatTidur.id,
                //             //     "keteranganLainya":$scope.dataAdmisi.keteranganLainya,
                //             //     "kelasAwal":{
                //             //         "id":$scope.dataAdmisi.kelasAwalId
                //             //     },
                //             //     "ruanganAwal":{
                //             //         "id":$scope.dataAdmisi.ruanganAwalId
                //             //     },
                //             //     "kelasKamarAwal":{
                //             //         "id":$scope.dataAdmisi.kelasKamarAwalId
                //             //     },
                //             //     "tempatTidur":{
                //             //         "id":$scope.dataAdmisi.noBedRencana
                //             //     }
                //             // }
                //         }
                //         if (dataRegistrasi.pegawai.id === undefined) {
                //             delete dataRegistrasi.pegawai;
                //         }
                //         if (dataAsuransi.diagnosis.id === "-") {
                //             delete dataAsuransi.diagnosis;
                //         }
                //         if(dataAsuransi.diagnosa.id === "-"){
                //             delete dataAsuransi.diagnosa
                //         }

                //         var dataJson={
                //             "registrasiPelayanan": dataRegistrasi,
                //             "asuransiPasien": dataAsuransi
                //         }
                //         // console.log(JSON.stringify(dataJson));
                //         // window.messageContainer.log('Data berhasil di simpan');
                //         managePasien.saveAsuransiPasien(dataJson).then(function(e) {
                //             responData = e.data.data;
                //             $scope.isReport = true;
                //             $scope.isReportPendaftaran = true;
                //             $scope.isReportRawatJalan = true;
                //             $scope.isNext = true; // hide button simpan
                //             $scope.isAsuransi = true; // show button cetak SEP
                //             // if (e.data.data.metadata.code === "200"){
                //             //     modelItem.set("PasienVO", $scope.item);
                //             //     $scope.item.isRegistrasiLengkap = 0;
                //             //     $scope.item.isOnSiteService = 0;
                //             //     var item = modelItem.beforePost($scope.item);
                //             //     item.jenisPelayanan = $scope.item.jenisPasien.name;
                //             //     managePasien.saveRegistrasiPelayanan(item).then(function(e) {
                //             //         tempNoRec = e.data.data.noRecAntrian;
                //             //         $scope.isReport = true;
                //             //         if ($scope.currentNoCm.indexOf('*') > 0) {}
                //             //         if (window.isPerjanjian !== undefined) {
                //             //             findPasien.CheckNoReconfirm(window.isPerjanjian).then(function(e) {});
                //             //         }
                //             //     });
                //             // }
                //         });
                //     } else {
                //         modelItem.showMessages(isValid.messages);
                //     }
                // }
                // else{
                    var listRawRequired = [
                        "item.ruangan|k-ng-model|Ruangan",
                        "item.kelas|k-ng-model|Kelas",
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
                    var idrekanan = "";
                        if ($scope.model.namaPenjamin != undefined) {
                          idrekanan = $scope.model.namaPenjamin.id;
                        }
                    var tglRegis = "";
                        if (item.tglRegistrasi != undefined) {
                          tglRegis = item.tglRegistrasi;
                        }
                        var idruanganasal = "";
                        if ($scope.item.pasien.pasienDaftar.ruangan != undefined) {
                          idruanganasal =  $scope.item.pasien.pasienDaftar.ruangan.id;
                        }
                          var statusPasiens = "";
                        if ($scope.item.pasien.pasienDaftar.statusPasien != undefined) {
                          statusPasiens = $scope.item.pasien.pasienDaftar.statusPasien ;
                        }

                    item.jenisPelayanan = $scope.item.jenisPasien.name;
                    if(isValid.status){
                        var tmpData = {
                            "pegawai": {
                                "id": item.pegawai === undefined ? undefined : item.pegawai.dokterId,
                            },
                            "isRegistrasiLengkap": item.isRegistrasiLengkap,
                            "isOnSiteService": item.isOnSiteService,
                            "tglRegistrasi":  new moment($scope.item.tglRegistrasi).format('YYYY-MM-DD HH:mm:ss'),
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
                            
                            // "noRecAntrianPasien": $scope.dataAdmisi.registrasiPelayananPasien.noRec,
                            "noRecAntrianPasien": $scope.item.pasien.noRecAntrianPasien ,
                            // "tglRegistrasi":  $scope.item.pasien.tglDaftar,
                            "tglRegisDateOnly":  new moment($scope.item.pasien.tglDaftar).format('YYYY-MM-DD'),
                            "objectruanganasalfk":  idruanganasal,
                            "objectrekananfk":  idrekanan,
                            "asalRujukan": {
                                "id": item.asalRujukan.id
                            },
                            "kelas": {
                                "id": item.kelas.id
                            },
                            "kamar": {
                                "id": item.kamar.id
                            },
                            "nomorTempatTidur": {
                                "id": item.nomorTempatTidur.id
                            },
                            "status":"pindah Kamar",
                            "noRecPasienDaftar": $state.params.noRec,
                            "statusPasien": statusPasiens,
                            // "admisiRencanaPindahRuangan":{
                            //     "noRec": $scope.dataAdmisi.noRec,
                            //     "noRecPasienDaftar": $state.params.noRec,
                            //     "noRecRegistrasiPelayananPasien": item.pasien.noRecRegistrasiPelayananPasien,
                            //     "registrasiPelayananPasien":{
                            //         "noRec":$scope.dataAdmisi.registrasiPelayananPasien.noRec
                            //     },
                            //     "tglKeluarRencana":$scope.dataAdmisi.tglKeluarRencana,
                            //     "kelasRencana":{
                            //         "id":$scope.dataAdmisi.kelasRencanaId
                            //     },
                            //     "ruanganRencana":{
                            //         "id":$scope.dataAdmisi.ruanganRencanaId
                            //     },
                            //     "kelasKamarRencana":{
                            //         "id":$scope.dataAdmisi.kelasKamarRencanaId
                            //     },
                            //     "noBedRencana":$scope.dataAdmisi.noBedRencana,
                            //     "keteranganLainya":$scope.dataAdmisi.keteranganLainya,
                            //     "kelasAwal":{
                            //         "id":$scope.dataAdmisi.kelasAwalId
                            //     },
                            //     "ruanganAwal":{
                            //         "id":$scope.dataAdmisi.ruanganAwalId
                            //     },
                            //     "kelasKamarAwal":{
                            //         "id":$scope.dataAdmisi.kelasKamarAwalId
                            //     },
                            //     "tempatTidur":{
                            //         "id":$scope.dataAdmisi.noBedRencana
                            //     }
                            // }
                        }
                        if (tmpData.pegawai.id === undefined) {
                            // debugger;
                            delete tmpData.pegawai;
                        }
                        // console.log(JSON.stringify(tmpData));
                        ManageSarprasPhp.saveMutasiPindahPasien(tmpData).then(function(e) {
                                   // managePasien.saveRegistrasiPelayanan(tmpData).then(function(e) {
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
        }
    ]);
});