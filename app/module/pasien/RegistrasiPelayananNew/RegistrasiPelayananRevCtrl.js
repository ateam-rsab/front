define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('RegistrasiPelayananRevCtrl', ['ManagePasien', '$scope', 'ModelItem', '$state', '$mdDialog', '$rootScope', '$timeout', '$window', 'CacheHelper', 'DateHelper', 'CetakHelper', 'ModelItem', 'ManageServicePhp', 'ModelItemAkuntansi', 'FindPasien',
        function (managePasien, $scope, modelItem, $state, $mdDialog, $rootScope, $timeout, $window, cacheHelper, dateHelper, cetakHelper, ModelItem, manageServicePhp, modelItemAkuntansi, findPasien) {
            $scope.now = new Date();
            $scope.currentNoCm = $state.params.noCm;
            $scope.currentNorec = $state.params.noRec;
            var responData = '';
            var norecPD = '';
            var noRegistrasis = '';
            var norecAPD = '';
            var noCM = '';
            var isRegisOnline = '';
            var ruanganLog = ''
            $scope.isSimpanAsuransi = true;
            $scope.isNext = true;
            $scope.item = {};
            $scope.item.tglRegistrasi = $scope.now;
            $scope.model = {};
            $scope.model.tglSEP = $scope.now;
            $scope.model.tglRujukan = $scope.now;
            $scope.model.tglPelayanan = $scope.now;

            manageServicePhp.getDataTableTransaksi("registrasipasien/get-pasienbynocm?noCm=" + $scope.currentNoCm)
                .then(function (e) {
                    $scope.isRouteLoading = false;
                    $scope.item.pasien = e.data.data[0];
                    $scope.item.nocmfk = e.data.data[0].nocmfk;
                    var parameterBayi = $scope.item.pasien.namapasien;
                    if (parameterBayi.indexOf('By Ny') >= 0) {
                        $scope.item.tglRegistrasi = new Date($scope.item.pasien.tgllahir);

                        $scope.model.rawatInap = true;
                        $scope.cekRawatInap($scope.model.rawatInap);
                        // $scope.pasienBayi = true;
                    }
                    //  else {
                    //     $scope.item.tglRegistrasi = $scope.now;
                    // }

                });
            loadPertama();


            manageServicePhp.getDataTableTransaksi("registrasipasien/get-data-combo", true)
                .then(function (dat) {
                    $scope.listJenisPelayanan = dat.data.jenispelayanan;
                    // $scope.listKelas = dat.data.kelas;

                    $scope.listAsalRujukan = dat.data.asalrujukan;
                    $scope.listKelompokPasien = dat.data.kelompokpasien;
                    $scope.listDokter = dat.data.dokter;
                    $scope.listRuangan = dat.data.ruanganrajal;

                    $scope.sourceHubunganPasien = dat.data.hubunganpeserta;
                    $scope.sourceKelompokPasien = dat.data.kelompokpasien;
                    // $scope.sourceRekanan= dat.data.rekanan;
                    $scope.sourceKelasDitanggung = dat.data.kelas;
                    $scope.sourceAsalRujukan = dat.data.asalrujukan;
                    $scope.model.namaPenjamin = {
                        id: dat.data.kelompokpasien[1].id,
                        kelompokpasien: dat.data.kelompokpasien[1].kelompokpasien
                    }
                    // $scope.model.institusiAsalPasien={id:dat.data.rekanan[689].id,namarekanan:dat.data.rekanan[689].namarekanan}
                    $scope.model.hubunganPeserta = {
                        id: dat.data.hubunganpeserta[2].id,
                        hubunganpeserta: dat.data.hubunganpeserta[2].hubunganpeserta
                    }
                    $scope.model.asalRujukan = {
                        id: dat.data.asalrujukan[3].id,
                        asalrujukan: dat.data.asalrujukan[3].asalrujukan
                    }
                });

            function loadPertama() {

                var cacheRegisOnline = cacheHelper.get('CacheRegisOnline');
                if (cacheRegisOnline != undefined) {
                    var arrOnline = cacheRegisOnline[0];
                    $scope.item.tglRegistrasi = $scope.now; //arrOnline.tanggalreservasi,
                    $scope.item.ruangan = {
                        id: arrOnline.objectruanganfk,
                        namaruangan: arrOnline.namaruangan
                    }
                    $scope.item.dokter = {
                        id: arrOnline.objectpegawaifk,
                        namalengkap: arrOnline.dokter
                    }
                    isRegisOnline = 'Registrasi Online'

                }
                cacheHelper.set('CacheRegisOnline', undefined);

                var cacheOnlineBaru = cacheHelper.get('CacheRegisOnlineBaru');
                if (cacheOnlineBaru != undefined) {
                    isRegisOnline = 'Registrasi Online'
                }
                cacheHelper.set('CacheRegisOnlineBaru', undefined);

                norecPD = ''
                var cachePasienDaftar = cacheHelper.get('CacheRegistrasiPasien');
                if (cachePasienDaftar != undefined) {
                    var arrPasienDaftar = cachePasienDaftar.split('~');
                    norecPD = arrPasienDaftar[0];
                    noRegistrasis = arrPasienDaftar[1];
                    norecAPD = arrPasienDaftar[2];
                    $scope.cacheNorecPD = norecPD;
                    $scope.cacheNorecAPD = norecAPD;
                    $scope.cacheNoRegistrasi = noRegistrasis;
                    //jika cache ada get riwayat pasien
                    getPasienByNorecPD();

                }
                $scope.isRouteLoading = true;

                var tglReg = moment($scope.item.tglRegistrasi).format('YYYY-MM-DD');
                manageServicePhp.getDataTableTransaksi("registrasipasien/cek-pasien-daftar-duakali?nocm=" +
                        $scope.currentNoCm +
                        "&tglregistrasi=" +
                        tglReg)
                    .then(function (res) {
                        $scope.CekPasienDaftar = res.data.data;
                    })


            };

            function getPasienByNorecPD() {
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-pasienbynorec-pd?norecPD=" + norecPD + "&norecAPD=" + norecAPD)
                    .then(function (his) {

                        if (his.data.data[0].israwatinap == 'true') {
                            $scope.model.rawatInap = true;
                            $scope.cekRawatInap($scope.model.rawatInap);
                            $scope.pasienBayi = true;
                        }
                        $scope.item.tglRegistrasi = new Date(his.data.data[0].tglregistrasi),
                            $scope.item.ruangan = {
                                id: his.data.data[0].objectruanganlastfk,
                                namaruangan: his.data.data[0].namaruangan,
                                objectdepartemenfk: his.data.data[0].objectdepartemenfk
                            }
                        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                        var dateNow = new Date();
                        var dateRegis = new Date($scope.item.tglRegistrasi);
                        var diffDays = Math.round(Math.abs((dateNow.getTime() - dateRegis.getTime()) / (oneDay)))
                        if (diffDays >= 1) {
                            $scope.disableTgl = true
                        }
                        ruanganLog = his.data.data[0].namaruangan
                        $scope.item.kelas = {
                            id: his.data.data[0].objectkelasfk,
                            namakelas: his.data.data[0].namakelas
                        }
                        $scope.listKamar = ([{
                            id: his.data.data[0].objectkamarfk,
                            namakamar: his.data.data[0].namakamar
                        }])
                        $scope.item.kamar = {
                            id: his.data.data[0].objectkamarfk,
                            namakamar: his.data.data[0].namakamar
                        }
                        $scope.listNoBed = ([{
                            id: his.data.data[0].objecttempattidurfk,
                            reportdisplay: his.data.data[0].reportdisplay
                        }])
                        $scope.item.nomorTempatTidur = {
                            id: his.data.data[0].objecttempattidurfk,
                            reportdisplay: his.data.data[0].reportdisplay
                        }
                        $scope.item.asalRujukan = {
                            id: his.data.data[0].objectasalrujukanfk,
                            asalrujukan: his.data.data[0].asalrujukan
                        }
                        $scope.item.kelompokPasien = {
                            id: his.data.data[0].objectkelompokpasienlastfk,
                            kelompokpasien: his.data.data[0].kelompokpasien
                        }
                        $scope.item.rekanan = {
                            id: his.data.data[0].objectrekananfk,
                            namarekanan: his.data.data[0].namarekanan
                        }
                        $scope.listJenisPelayanan = ([{
                            id: parseInt(his.data.data[0].objectjenispelayananfk),
                            jenispelayanan: his.data.data[0].jenispelayanan
                        }])
                        $scope.item.jenisPasien = {
                            id: parseInt(his.data.data[0].objectjenispelayananfk),
                            jenispelayanan: his.data.data[0].jenispelayanan
                        }
                        $scope.item.dokter = {
                            id: his.data.data[0].objectpegawaifk,
                            namalengkap: his.data.data[0].dokter
                        }

                        $scope.isInputAsuransi = true;
                        $scope.isNext = false;
                        $scope.isBatal = true;
                        $scope.isReport = true;
                        $scope.isReportPendaftaran = true;
                        if ($scope.model.rawatInap == true) {
                            $scope.isReportRawatInap = true;
                        }
                        // $scope.isInputAsuransi=true;
                        $scope.isAsuransi = true;
                    });
            }
            $scope.cekRawatInap = function (data) {
                if (data === true) {
                    manageServicePhp.getDataTableTransaksi("registrasipasien/get-data-combo", true)
                        .then(function (dat) {
                            $scope.listRuangan = dat.data.ruanganranap;

                        })
                } else if (data === false || data === undefined) {
                    manageServicePhp.getDataTableTransaksi("registrasipasien/get-data-combo", true)
                        .then(function (dat) {
                            $scope.listRuangan = dat.data.ruanganrajal;
                            $scope.item.kelas = "";
                            $scope.item.nomorTempatTidur = "";
                            $scope.item.kamar = "";

                        })
                } else {
                    return;
                }
            }
            $scope.$watch('model.rawatInap', function (data) {
                if (!data) return;
                $scope.cekRawatInap(data);
            })

            $scope.pilihRuangan = function (id) {
                // get ruangan with condition (rawat jalan or rawat inap)
                if ($scope.model.rawatInap === true) {
                    var ruanganId = id;
                    manageServicePhp.getDataTableTransaksi("registrasipasien/get-kelasbyruangan?idRuangan=" + ruanganId)
                        .then(function (dat) {
                            $scope.listKelas = dat.data.kelas;

                        });
                }
            }
            $scope.$watch('item.kelas', function (e) {
                if (e === undefined) return;
                var kelasId = "idKelas=" + $scope.item.kelas.id;
                var ruanganId = "&idRuangan=" + $scope.item.ruangan.id;
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-kamarbyruangankelas?" + kelasId + ruanganId)
                    .then(function (b) {

                        if ($scope.model.rawatGabung) {
                            $scope.listKamar = b.data.kamar;
                        } else {
                            $scope.listKamar = _.filter(b.data.kamar, function (v) {
                                return v.qtybed > v.jumlakamarisi;
                            })
                        }
                    });
            });
            $scope.$watch('item.kamar', function (e) {
                if (e === undefined) return;
                var kamarId = $scope.item.kamar.id;
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-nobedbykamar?idKamar=" + kamarId)
                    .then(function (a) {
                        if ($scope.model.rawatGabung) {
                            $scope.listNoBed = a.data.bed;
                        } else {
                            $scope.listNoBed = _.filter(a.data.bed, function (v) {
                                return v.statusbed === "KOSONG";
                            })
                        }
                    })
            });

            $scope.$watch('item.kelas', function (e) {
                if (e === undefined) return;
                var kelasId = "idKelas=" + $scope.item.kelas.id;
                var ruanganId = "&idRuangan=" + $scope.item.ruangan.id;
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-kamarbyruangankelas?" + kelasId + ruanganId)
                    .then(function (a) {

                        if ($scope.model.rawatGabung) {
                            $scope.listKamar = a.data.kamar;
                        } else {
                            $scope.listKamar = _.filter(a.data.kamar, function (v) {
                                return v.qtybed > v.jumlakamarisi;
                            })
                        }
                    });
            });


            $scope.$watch('item.kelompokPasien', function (e) {
                if (e === undefined) return;
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-penjaminbykelompokpasien?kdKelompokPasien=" + e.id)
                    .then(function (z) {
                        $scope.listRekanan = z.data.rekanan;
                        if (e.kelompokpasien == 'Umum/Pribadi') {
                            $scope.item.rekanan = '';
                            $scope.nonUmum = false;
                            $scope.item.jenisPasien = {
                                id: $scope.listJenisPelayanan[0].id,
                                jenispelayanan: $scope.listJenisPelayanan[0].jenispelayanan
                            }
                        } else if (e.kelompokpasien == 'BPJS') {
                            $scope.item.rekanan = {
                                id: $scope.listRekanan[0].id,
                                namarekanan: $scope.listRekanan[0].namarekanan
                            };
                            $scope.nonUmum = true;
                            $scope.item.jenisPasien = {
                                id: $scope.listJenisPelayanan[1].id,
                                jenispelayanan: $scope.listJenisPelayanan[1].jenispelayanan
                            }

                        } else {
                            $scope.nonUmum = true;
                            $scope.item.jenisPasien = {
                                id: $scope.listJenisPelayanan[0].id,
                                jenispelayanan: $scope.listJenisPelayanan[0].jenispelayanan
                            }
                            // delete $scope.item.rekanan;

                        }

                    })
            });

            $scope.ListAsuransi = [{
                "id": "1",
                "name": "No. SEP Otomatis"
            }];


            $scope.noCm = $state.params.noCm;
            $scope.cekRawatGabung = function (data) {
                // opsi untuk pasien bayi
                // apakah pasien bayi satu ruangan dengan ibunya (true/false) ?
                $scope.model.rawatGabung = data;
            }
            $scope.formatJam24 = {
                format: "dd-MM-yyyy HH:mm", //set date format
                timeFormat: "HH:mm", //set drop down time format to 24 hours
            };
            // $scope.jenisPasiens = [{
            //     id: 1, name: "Reguler"
            // }, {
            //     id: 2, name: "Eksekutif"
            // }]
            $scope.pegawai = modelItem.getPegawai();

            $scope.listPasien = [];
            $scope.doneLoad = $rootScope.doneLoad;
            $scope.showFind = true;
            $scope.showTindakan = false;
            $scope.dataModelGrid = [];

            $scope.Save = function () {
                if (norecPD == '') {
                    if ($scope.item.kelompokPasien && $scope.item.kelompokPasien.id == 1) {
                        manageServicePhp.getDataTableTransaksi("registrasipasien/cek-pasien-bayar/" +
                            $scope.noCm).then(function (x) {
                            if (x.data.status == false && moment(x.data.tglregistrasi).format('YYYY-MM-DD') != moment($scope.now).format('YYYY-MM-DD')) {
                                toastr.error('Pasien belum bayar !', 'Warning')
                                return
                            } else {
                                $scope.lanjutDaftar()
                            }
                        })
                    } else {
                        $scope.lanjutDaftar()
                    }
                } else {
                    $scope.lanjutDaftar()
                }

            }
            $scope.lanjutDaftar = function () {

                if (norecPD == '') {
                    if ($scope.CekPasienDaftar.length > 0 && $scope.CekPasienDaftar[0].objectruanganlastfk == $scope.item.ruangan.id) {
                        var confirm = $mdDialog.confirm()
                            .title('Peringatan')
                            .textContent('Pasien Sudah Daftar Dipoli yang sama ! Lanjut Simpan? ')
                            .ariaLabel('Lucky day')
                            .cancel('Tidak')
                            .ok('Ya')
                        $mdDialog.show(confirm).then(function () {
                            $scope.SimpanRegistrasi();
                        })

                    } else
                        $scope.SimpanRegistrasi();
                } else
                    $scope.SimpanRegistrasi();

            }

            $scope.SimpanRegistrasi = function () {
                var kelasId = "";
                if ($scope.item.kelas == undefined || $scope.item.kelas == "") {
                    kelasId = null;
                } else
                    kelasId = $scope.item.kelas.id;

                var rekananId = "";
                if ($scope.item.rekanan == undefined || $scope.item.rekanan == "") {
                    rekananId = null;
                } else
                    rekananId = $scope.item.rekanan.id;

                var dokterId = "";
                if ($scope.item.dokter == undefined || $scope.item.dokter == "") {
                    dokterId = null;
                } else
                    dokterId = $scope.item.dokter.id;

                var kamarIds = "";
                if ($scope.item.kamar == undefined || $scope.item.kamar == "") {
                    kamarIds = null;
                } else
                    kamarIds = $scope.item.kamar.id;


                // var nomorTempatTidurs = "";
                // if ($scope.item.nomorTempatTidur == undefined || $scope.item.nomorTempatTidur == "") {
                //     nomorTempatTidurs = null;
                // } else
                //     nomorTempatTidurs = $scope.item.nomorTempatTidur.id;

                if($scope.model.rawatInap && !$scope.item.nomorTempatTidur) {
                    toastr.error("Harap isi Nomor Tempat Tidur", "Gagal");
                    return;
                }

                var noRegistrasi = "";
                if ($scope.model.noRegistrasi == undefined || $scope.model.noRegistrasi == "") {
                    noRegistrasi = "";
                } else
                    noRegistrasi = $scope.model.noRegistrasi;


                var norec_PasienDaftar = "";
                if ($scope.model.norec_pd != undefined) {
                    norec_PasienDaftar = $scope.model.norec_pd;
                } else if ($scope.cacheNorecPD != undefined) {
                    norec_PasienDaftar = $scope.cacheNorecPD;
                } else
                    norec_PasienDaftar = "";


                var norec_Antrian = "";
                if ($scope.cacheNorecAPD != undefined) {
                    norec_Antrian = $scope.cacheNorecAPD;
                } else if ($scope.resultAPD != undefined) {
                    norec_Antrian = $scope.resultAPD.norec;
                } else norec_Antrian = "";

                var jenisPel = "";
                if ($scope.item.jenisPasien != undefined)
                    jenisPel = $scope.item.jenisPasien.id
                else {
                    messageContainer.error("Jenis Pelayanan Harus Di isi")
                    return
                }
                var isRawatInap = ""
                if ($scope.model.rawatInap == undefined)
                    isRawatInap = "false"
                else if ($scope.model.rawatInap)
                    isRawatInap = "true"
                else
                    isRawatInap = "false"
                var noRegistrasizz = ""
                if ($scope.cacheNoRegistrasi != undefined) {
                    noRegistrasizz = $scope.cacheNoRegistrasi
                }

                var pasiendaftar = {
                    tglregistrasi: moment($scope.item.tglRegistrasi).format('YYYY-MM-DD HH:mm:ss'),
                    tglregistrasidate: moment($scope.item.tglRegistrasi).format('YYYY-MM-DD'),
                    nocmfk: $scope.item.nocmfk,
                    objectruanganfk: $scope.item.ruangan.id,
                    objectdepartemenfk: $scope.item.ruangan.objectdepartemenfk,
                    objectkelasfk: kelasId,
                    objectkelompokpasienlastfk: $scope.item.kelompokPasien.id,
                    objectrekananfk: rekananId,
                    tipelayanan: jenisPel,
                    objectpegawaifk: dokterId,
                    noregistrasi: noRegistrasizz,
                    norec_pd: norec_PasienDaftar,
                    israwatinap: isRawatInap,
                    statusschedule: isRegisOnline,

                }
                var antrianpasiendiperiksa = {
                    norec_apd: norec_Antrian,
                    tglregistrasi: moment($scope.item.tglRegistrasi).format('YYYY-MM-DD HH:mm:ss'),
                    objectruanganfk: $scope.item.ruangan.id,
                    objectkelasfk: kelasId,
                    objectpegawaifk: dokterId,
                    objectkamarfk: kamarIds,
                    nobed: $scope.item.nomorTempatTidur.id,
                    objectdepartemenfk: $scope.item.ruangan.objectdepartemenfk,
                    objectasalrujukanfk: $scope.item.asalRujukan.id,
                    israwatgabung: $scope.model.rawatGabung === true ? 1 : 0,
                }
                var objSave = {
                    pasiendaftar: pasiendaftar,
                    antrianpasiendiperiksa: antrianpasiendiperiksa
                }
                $scope.isSimpan = true;

                manageServicePhp.saveRegitrasiPasien(objSave).then(function (e) {
                    $scope.isSimpan = false;
                    $scope.resultAPD = e.data.dataAPD;
                    responData = e.data;
                    $scope.resultPD = e.data.dataPD;
                    $scope.model.noRegistrasi = e.data.dataPD.noregistrasi;
                    $scope.model.norec_pd = e.data.dataPD.norec;

                    var cachePasienDaftar = $scope.model.norec_pd +
                        "~" + $scope.model.noRegistrasi +
                        "~" + $scope.resultAPD.norec;
                    // + "~" + $scope.currentNoCm;
                    cacheHelper.set('CacheRegistrasiPasien', cachePasienDaftar);

                    if (e.data.status == 201) {
                        if (norecPD != '') {
                            $scope.saveLogging('Edit Registrasi', 'norec Pasien Daftar',
                                norecPD, ruanganLog)
                        } else {
                            //##log Pasien Daftar
                            manageServicePhp.getDataTableTransaksi("logging/save-log-pendaftaran-pasien?norec_pd=" +
                                $scope.model.norec_pd).then(function (x) {})
                            //## end log    
                        }
                        $scope.isNext = false;
                        $scope.isBatal = true;
                        $scope.isReport = true;
                        $scope.isReportPendaftaran = true;
                        if ($scope.model.rawatInap == true) {
                            $scope.isReportRawatInap = true;
                        }
                        $scope.isInputAsuransi = true;
                        $scope.isAsuransi = true;
                        $scope.model.generateNoSEP = false;
                        if ($scope.item.kelompokPasien.kelompokpasien != 'Umum/Pribadi') {
                            if (norecPD == '') {
                                $scope.inputPemakaianAsuransi();
                            }
                        }

                    }

                }, function (error) {
                    // throw error;
                    $scope.isSimpan = false;
                    $scope.isBatal = false;
                })
            }
            // end Save Function
            $scope.updateNoreg = function () {
                manageServicePhp.getDataTableTransaksi("registrasipasien/update-noregistrasi?norec_pd=" +
                    $scope.model.norec_pd).then(function (x) {
                    debugger
                })
            }
            $scope.saveLogging = function (jenis, referensi, noreff, ket) {
                manageServicePhp.getDataTableTransaksi("logging/save-log-all?jenislog=" + jenis +
                    "&referensi=" + referensi +
                    "&noreff=" + noreff +
                    "&keterangan=" + ket
                ).then(function (data) {

                })
            }


            // $scope.now = new Date();
            $scope.model.generateNoSEP = false;


            $scope.Next = function () {
                $state.go('RegistrasiPasienBaru');

            }
            $scope.formatNum = {
                format: "#.#",
                decimals: 0
            }
            $scope.cetakLabel = function (tempNoCm) {
                $scope.dats = {
                    qty: 0
                }
                $scope.winDialog.center().open();
            }
            $scope.pilihQty = function (data) {
                var listRawRequired = [
                    "dats.qty|k-ng-model|kuantiti"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if (isValid.status) {
                    var qty = data.qty;
                    var qtyhasil = data.qty * 2;
                    if (qty !== undefined) {

                        //##save identifikasi label pasien
                        manageServicePhp.getDataTableTransaksi("operator/identifikasi-label?norec_pd=" +
                            $scope.cacheNorecPD + '&islabel=' + qtyhasil
                        ).then(function (data) {
                            var datas = data.data;
                        })
                        //##end


                        // var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $state.params.noRegistrasi + "&qty=" + qty);
                        // window.open(fixUrlLaporan, '', 'width=800,height=600')

                        //cetakan langsung service VB6 by grh
                        var client = new HttpClient();
                        client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-labelpasien=1&norec=' + $scope.cacheNoRegistrasi + '&view=false&qty=' + qty, function (response) {
                            // do something with response
                        });

                    }
                    $scope.winDialog.close();
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };

            $scope.cetak = function () {
                if ($scope.model.rawatInap == true) {
                    messageContainer.error("Cetak Antrian hanya untuk rawat jalan")
                    return
                }
                // cetak antrian
                // window.location = configuration.urlPrinting + "registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + tempNoRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize()
                // var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + tempNoRec);
                //     window.open(fixUrlLaporan, '', 'width=800,height=600')

                //cetakan langsung service VB 6 by grh   
                var client = new HttpClient();

                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktipendaftaran=1&norec=' + $scope.cacheNoRegistrasi + '&view=false', function (response) {
                    // do something with response
                });

            }

            $scope.cetakGelang = function () {
                if ($scope.item != undefined) {
                    var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/gelangPasien?id=" + $scope.item.pasien.nocmfk);
                    window.open(fixUrlLaporan, '_blank')
                }
            }

            $scope.cetakBuktiLayanan = function () {
                if ($scope.item != undefined) {
                    //##save identifikasibuktiLayanan
                    manageServicePhp.getDataTableTransaksi("operator/identifikasi-buktiLayanan?norec_pd=" +
                        $scope.cacheNorecPD
                    ).then(function (data) {
                        var datas = data.data;
                    })
                    //##end 

                    // var fixUrlLaporan = cetakHelper.open("reporting/lapBuktiPelayanan?noRegistrasi=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //cetakan langsung service VB6 by grh
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan=1&norec=' + $scope.cacheNoRegistrasi + '&strIdPegawai=' + $scope.pegawai.id + '&view=false', function (response) {
                        // do something with response
                    });

                }
            }

            $scope.CetakSumList = function () {
                if ($scope.item != undefined) {
                    //##save identifikasi summary list
                    manageServicePhp.getDataTableTransaksi("operator/identifikasi-sum-list?norec_pd=" +
                        $scope.cacheNorecPD
                    ).then(function (data) {
                        var datas = data.data;
                    })
                    //## end identifikasi summary list

                    // var fixUrlLaporan = cetakHelper.open("reporting/lapResume?noCm=" + tempNoCm + "&tglRegistrasi=" + new moment(new Date()).format('DD-MM-YYYY'));
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-summarylist=1&norec=' + $scope.currentNoCm + '&view=false', function (response) {
                        // do something with response
                    });

                }

            }
            $scope.cetakSEP = function () {
                if ($scope.cacheNoRegistrasi != undefined && $scope.item.kelompokPasien.kelompokpasien !== "Umum/Pribadi") {

                    //##save identifikasi sep
                    manageServicePhp.getDataTableTransaksi("operator/identifikasi-sep?norec_pd=" +
                        $scope.cacheNorecPD
                    ).then(function (data) {
                        var datas = data.data;
                    })
                    //##end

                    // var noSep = e.data.data === null ? "2423432" : e.data.data;
                    // var fixUrlLaporan = cetakHelper.open("asuransi/asuransiBPJS?noSep=" + $scope.model.noSep);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep=1&norec=1708000087&view=true   
                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep-new=1&norec=' + $scope.cacheNoRegistrasi + '&view=false', function (response) {
                        // do something with response
                    });
                }
            }
            $scope.tracerBon = function () {
                if ($scope.item != undefined) {

                    //##save identifikasi tracer
                    manageServicePhp.getDataTableTransaksi("operator/identifikasi-tracer?norec_pd=" +
                        $scope.cacheNorecPD
                    ).then(function (data) {
                        var datas = data.data;
                    })
                    //##end

                    // var fixUrlLaporan = cetakHelper.open("reporting/lapTracer?noRegistrasi=" + $state.params.noRegistrasi);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-tracer=1&norec=' + $scope.cacheNoRegistrasi + '&view=false', function (response) {
                        // do something with response
                    });
                }
            }
            $scope.cetakKartu = function () {
                if ($scope.item != undefined) {

                    //##save identifikasi kartu pasien
                    manageServicePhp.getDataTableTransaksi("operator/identifikasi-kartu-pasien?norec_pd=" +
                        $scope.cacheNorecPD
                    ).then(function (data) {
                        var datas = data.data;
                    })
                    //##end 

                    // var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/kartuPasien?id=" + $scope.item.pasien.id);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')
                    //cetakan langsung service VB 6 by grh   
                    var client = new HttpClient();
                    // debugger;             
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-kartupasien=1&norec=' + $scope.item.pasien.nocmfk + '&view=false', function (response) {
                        // do something with response
                    });

                }
            }
            $scope.sourceJenisDiagnosisPrimer = [{
                "statusEnabled": true,
                "namaExternal": "Diagnosa Awal",
                "kdProfile": 0,
                "qJenisDiagnosa": 5,
                "reportDisplay": "Diagnosa Pasca Bedah",
                "jenisDiagnosa": "Diagnosa Awal",
                "id": 5,
                "kodeExternal": "05",
                "kdJenisDiagnosa": 5,
                "noRec": "5                               "
            }]
            $scope.ringkasanInOut = function () {
                if ($scope.item != undefined) {
                    findPasien.getDiagnosaNyNoRec($scope.cacheNorecAPD).then(function (e) {
                        if (e.data.data.DiagnosaPasien.length > 0) {
                            $scope.cetakBro();
                        } else {
                            $scope.item.jenisDiagnosis = $scope.sourceJenisDiagnosisPrimer[0];
                            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function (data) {
                                $scope.sourceDiagnosisPrimer = data;
                            });
                            $scope.icd10.center().open();
                        }
                    })
                }
            }

            $scope.cetakBro = function () {
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar-byNorec=1&norec=' + $scope.cacheNorecAPD + '&view=false', function (response) {});
            }
            $scope.cetakRMK = function () {
                var norReg = ""
                if ($scope != undefined) {
                    norReg = "noReg=" + $scope.cacheNoRegistrasi;
                }
                // manageServicePhp.getDataTableTransaksi("operator/get-data-diagnosa-pasien?"
                //     + norReg
                // ).then(function (data) {
                // var dataDiagnosa = data.data.datas[0]

                if ($scope.item.jenisDiagnosis == undefined) {
                    alert("Pilih Jenis Diagnosa terlebih dahulu!!")
                    return
                }
                if ($scope.item.diagnosisPrimer == undefined) {
                    alert("Pilih Kode Diagnosa dan Nama Diagnosa terlebih dahulu!!")
                    return
                }

                // var norecDiagnosaPasien = "";
                // if (dataDiagnosa != undefined) {
                //     norecDiagnosaPasien = dataDiagnosa.norec_diagnosapasien;
                // }

                var keterangan = "";
                if ($scope.item.keteranganDiagnosis == undefined) {
                    keterangan = "-"
                } else {
                    keterangan = $scope.item.keteranganDiagnosis;
                }


                $scope.now = new Date();
                var detaildiagnosapasien = {
                    norec_dp: "",
                    noregistrasifk: $scope.cacheNorecAPD,
                    objectdiagnosafk: $scope.item.diagnosisPrimer.id,
                    objectjenisdiagnosafk: $scope.item.jenisDiagnosis.id,
                    tglpendaftaran: moment($scope.item.pasien.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
                    tglinputdiagnosa: moment($scope.now).format('YYYY-MM-DD hh:mm:ss'),
                    keterangan: keterangan
                }
                manageServicePhp.postSaveDiagnosaRMK(detaildiagnosapasien).then(function (e) {
                    $scope.item.keteranganDiagnosis = "";
                    $scope.item.diagnosisPrimer = "";
                    // loadData()
                    $scope.icd10.close();

                    $scope.cetakBro();
                })
                // });
            }



            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }
            modelItemAkuntansi.getDataDummyPHP("registrasipasien/get-diagnosa-saeutik", true, true, 10).then(function (data) {
                $scope.sourceDiagnosa = data;

            });

            $scope.inputPemakaianAsuransi = function () {
                if ($scope.resultPD != undefined) {
                    // $state.go('PemakaianAsuransi', {
                    $state.go('PemakaianAsuransiV1', {
                        norecPD: $scope.resultPD.norec,
                        norecAPD: $scope.resultAPD.norec,
                    });
                    var cacheSet = undefined;
                    cacheHelper.set('CachePemakaianAsuransi', cacheSet);
                } else {
                    $state.go('PemakaianAsuransiV1', {
                        // $state.go('PemakaianAsuransi', {
                        norecPD: $scope.cacheNorecPD,
                        norecAPD: $scope.cacheNorecAPD,
                    });
                    var cacheSet = undefined;
                    cacheHelper.set('CachePemakaianAsuransi', cacheSet);
                }
            }

            // $scope.inputTindakan = function(){
            //   if ($scope.cacheNorecAPD==undefined)
            //   {
            //      $state.go('dashboardpasien.InputBilling',{
            //             noRec:$scope.resultAPD.norec,
            //             noAntrianPasien: $scope.resultAPD.norec,
            //             noRegister:$scope.resultAPD.norec  
            //         });
            //   }
            //   else
            //   {
            //         $state.go('dashboardpasien.InputBilling',{
            //             noRec:$scope.cacheNorecAPD,
            //             noAntrianPasien: $scope.cacheNorecAPD,
            //             noRegister:$scope.cacheNorecPD  
            //         });
            //       }
            // }
            $scope.inputTindakan = function () {
                if ($scope.resultPD != undefined) {
                    $state.go('InputTindakanPendaftaran', {
                        norecPD: $scope.resultPD.norec,
                        norecAPD: $scope.resultAPD.norec

                    });
                } else {
                    $state.go('InputTindakanPendaftaran', {
                        norecPD: $scope.cacheNorecPD,
                        norecAPD: $scope.cacheNorecAPD

                    });
                }
            }
            $scope.inputTindakanNew = function () {
                if ($scope.resultPD != undefined) {
                    $state.go('InputTindakanPelayananRev', {
                        norecPD: $scope.resultPD.norec,
                        norecAPD: $scope.resultAPD.norec

                    });
                } else {
                    $state.go('InputTindakanPelayananRev', {
                        norecPD: $scope.cacheNorecPD,
                        norecAPD: $scope.cacheNorecAPD

                    });
                }
            }

            $scope.find = function () {
                $state.go('RegistrasiPasienLamaRev');
            }
            $scope.Next = function () {
                $state.go('RegistrasiPasienBaruRev');
            }




        }
    ]);
});