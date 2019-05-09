define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('MenuRujukanCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'FindPasien', 'DateHelper', 'ManageServicePhp', 'ModelItemAkuntansi',
        function ($rootScope, $scope, $state, ModelItem, findPasien, DateHelper, manageServicePhp, modelItemAkuntansi) {
            $scope.now = new Date();
            $scope.daftar = {};
            $scope.daftar.periodeAkhir = new Date();
            $scope.daftar.periodeAwal = new Date();
            $scope.nav = function (state) {
                // debugger;
                $scope.currentState = state;
                $state.go(state, $state.params);
                console.log($scope.currentState);
            }
            $scope.approval = {};
            $scope.pengajuan = {};
            $scope.model = {};
            $scope.item1 = {};
            $scope.insert = {};
            $scope.update = {};
            $scope.item2 = {};
            $scope.delete = {};
            $scope.clear = function () {
                $scope.item1 = {};
                $scope.item2 = {};
                $scope.item3 = {};
                $scope.item4 = {
                    data: $scope.now
                };
                $scope.isRouteLoading = false;
            };
            $scope.isShowPembuatanSep = false;
            $scope.isShowPotensi = false;
            $scope.isShowApproval = false;
            $scope.isShowTglPulang = false;
            $scope.isShowIntegrasi = false;
            $scope.showPembuatanSep = function () {
                $scope.isShowPembuatanSep = !$scope.isShowPembuatanSep;
            }
            $scope.showPotensi = function () {
                $scope.isShowPotensi = !$scope.isShowPotensi;
            }
            $scope.showApproval = function () {
                $scope.isShowApproval = !$scope.isShowApproval;
            }
            $scope.showTglPulang = function () {
                $scope.isShowTglPulang = !$scope.isShowTglPulang;
            }
            $scope.showIntegrasi = function () {
                $scope.isShowIntegrasi = !$scope.isShowIntegrasi;
            }
            $scope.clear();
            $scope.dataCheckbox = [{
                "id": 1, "name": "PCare"
            }, {
                "id": 2, "name": "Rumah Sakit"
            }];
            $scope.dataCheckbox2 = [{
                "id": 1, "name": "PCare  "
            }, {
                "id": 2, "name": "Rumah Sakit  "
            }];
            $scope.dataCheckbox3 = [{
                "id": 1, "name": "PCare   "
            }, {
                "id": 2, "name": "Rumah Sakit   "
            }];
            $scope.dataCheckbox4 = [{
                "id": 1, "name": "PCare    "
            }, {
                "id": 2, "name": "Rumah Sakit    "
            }];
            $scope.item1.identitas1 = $scope.dataCheckbox[0];
            $scope.item2.identitas = $scope.dataCheckbox2[0];
            $scope.item3.identitas = $scope.dataCheckbox3[0];
            $scope.item4.identitas = $scope.dataCheckbox4[0];
            // ** TAB !
            $scope.findData1 = function (data) {
                if (!data) return;
                if (!$scope.item1.identitas1) {
                    messageContainer.error('Pilih Pencarian Terlebih Dahulu');
                    return;
                } else {

                    if ($scope.item1.identitas1.id == 1) {
                        $scope.cekNoRujukan(data);
                    } else {
                        $scope.cekNoKartu(data);
                    }
                }

            }
            $scope.cekNoRujukan = function (noKartu) {
                $scope.isRouteLoading = true;
                manageServicePhp.getDataTableTransaksi("bpjs/get-rujukan-pcare?norujukan=" + noKartu).then(function (e) {
                    document.getElementById("json1").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
            $scope.cekNoKartu = function (nik) {
                $scope.isRouteLoading = true;
                manageServicePhp.getDataTableTransaksi("bpjs/get-rujukan-rs?norujukan=" + nik).then(function (e) {
                    document.getElementById("json1").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
            // ****
            // ** TAB nu kadua
            $scope.findData2 = function (data) {
                if (!data) return;
                if (!$scope.item2.identitas) {
                    messageContainer.error('Pilih Pencarian Terlebih Dahulu');
                    return;
                } else {
                    if ($scope.item2.identitas == 1) {
                        $scope.cekPcare2(data);
                    } else {
                        $scope.cekRS2(data);
                    }
                }
            }
            $scope.cekPcare2 = function (noKartu) {
                $scope.isRouteLoading = true;
                manageServicePhp.getDataTableTransaksi("bpjs/get-rujukan-pcare-nokartu?nokartu=" + noKartu).then(function (e) {
                    document.getElementById("json2").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
            $scope.cekRS2 = function (nik) {
                $scope.isRouteLoading = true;
                manageServicePhp.getDataTableTransaksi("bpjs/get-rujukan-rs-nokartu?nokartu=" + nik).then(function (e) {
                    document.getElementById("json2").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
            // ****
            // / ** TAB nu tilu
            $scope.findData3 = function (data) {
                if (!data) return;
                if (!$scope.item3.identitas) {
                    messageContainer.error('Pilih Pencarian Terlebih Dahulu');
                    return;
                } else {
                    if ($scope.item3.identitas == 1) {
                        $scope.cekPcare3(data);
                    } else {
                        $scope.cekRS3(data);
                    }
                }
            }
            $scope.cekPcare3 = function (noKartu) {
                $scope.isRouteLoading = true;
                manageServicePhp.getDataTableTransaksi("bpjs/get-rujukan-pcare-nokartu-multi?nokartu=" + noKartu).then(function (e) {
                    document.getElementById("json3").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
            $scope.cekRS3 = function (nik) {
                $scope.isRouteLoading = true;
                manageServicePhp.getDataTableTransaksi("bpjs/get-rujukan-rs-nokartu-multi?nokartu=" + nik).then(function (e) {
                    document.getElementById("json3").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
            // ****
            // / ** TAB nu opat
            $scope.findData4 = function (data) {
                if (!data) return;
                if (!$scope.item4.identitas) {
                    messageContainer.error('Pilih Pencarian Terlebih Dahulu');
                    return;
                } else {
                    if ($scope.item4.identitas == 1) {
                        $scope.cekPcare4(data);
                    } else {
                        $scope.cekRS4(data);
                    }
                }
            }
            $scope.cekPcare4 = function (tgl) {
                $scope.isRouteLoading = true;
                manageServicePhp.getDataTableTransaksi("bpjs/get-rujukanbytglrujukan?tglRujukan=" + moment(tgl).format('YYYY-MM-DD')).then(function (e) {
                    document.getElementById("json4").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
            $scope.cekRS4 = function (tgl) {
                $scope.isRouteLoading = true;
                manageServicePhp.getDataTableTransaksi("bpjs/get-rujukanbytglrujukan-rs?tglRujukan=" + moment(tgl).format('YYYY-MM-DD')).then(function (e) {
                    document.getElementById("json4").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
            // ****


            // *** INSERT RUJUKAN
            modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-diagnosa-part", true, true, 10).then(function (data) {
                $scope.listDiagnosa = data;

            });
            modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-diagnosatindakan-part", true, true, 10).then(function (data) {
                $scope.listTindakan = data;

            });
            modelItemAkuntansi.getDataDummyPHP("bpjs/get-poli-part", true, true, 10).then(function (data) {
                $scope.listPoli = data;

            });
            modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-faskes-part", true, true, 10).then(function (data) {
                $scope.listFaskess = data;

            });
            $scope.$watch('insert.jenisPelayanan', function (e) {
                if (!e) return;
                if (e.jenispelayanan.indexOf('Inap') >= 0) {
                    manageServicePhp.getDataTableTransaksi("bpjs/get-ruangan-ri").then(function (data) {
                        $scope.ruangans = data.data.data;
                    })
                } else {
                    manageServicePhp.getDataTableTransaksi("bpjs/get-ruangan-rj").then(function (data) {
                        $scope.ruangans = data.data.data;
                    })
                    $scope.insert.kelasRawat = $scope.kelasRawat[2];
                }
            })


            $scope.jenisPelayanan = [{
                "idjenispelayanan": 1, "jenispelayanan": "Rawat Inap"
            }, {
                "idjenispelayanan": 2, "jenispelayanan": "Rawat Jalan"
            }];
            $scope.listTipeRujukan = [{
                "id": 3, "tiperujukan": "Penuh", "value": 0
            }, {
                "id": 4, "tiperujukan": "Partial", "value": 1
            }, {
                "id": 5, "tiperujukan": "Rujuk Balik", "value": 2
            }];

            // "penjamin": "{penjamin lakalantas -> 1=Jasa raharja PT, 2=BPJS Ketenagakerjaan, 3=TASPEN PT, 4=ASABRI PT} jika lebih dari 1 isi -> 1,2 (pakai delimiter koma)",

            $scope.clear();

            $scope.Save = function (data) {
                if ($scope.insert.noRujukan == undefined) {
                    $scope.SaveRujukan();
                } else
                    $scope.UpdateRujukan();

            }


            $scope.SaveRujukan = function () {
                var kdiagnosa = "";
                if ($scope.insert.diagnosaRujukan != undefined) {
                    kdiagnosa = $scope.insert.diagnosaRujukan.kddiagnosa;
                }
                // var kdpoli="";
                // if ( data.poliTujuan!=undefined){
                //     kdpoli=data.poliTujuan.kdinternal;
                // }
                var kdPpkRujukan = "";
                if ($scope.insert.faskess != undefined) {
                    kdPpkRujukan = $scope.insert.faskess.kode
                    // var arrKdPpkRUjukanBrid=$scope.insert.faskess.split(' - ');
                    // kdPpkRujukan=arrKdPpkRUjukanBrid[0];
                }
                var kdPolis = "";
                if ($scope.insert.poli != undefined) {
                    kdPolis = $scope.insert.poli.kode
                    // var arrKdPoli=$scope.insert.poli.split(' - ');
                    // kdPolis=arrKdPoli[0];
                }

                $scope.isRouteLoading = true;
                var dataGen = {
                    nosep: $scope.insert.noSep,
                    tglrujukan: new moment($scope.insert.tglRujukan).format('YYYY-MM-DD'),
                    jenispelayanan: $scope.insert.jenisPelayanan.idjenispelayanan,
                    ppkdirujuk: kdPpkRujukan,
                    catatan: $scope.insert.catatan,
                    diagnosarujukan: kdiagnosa,
                    polirujukan: kdPolis,//'ANA',//$scope.insert.ruangan.kdinternal,
                    tiperujukan: $scope.insert.tipeRujukan.value,

                };

                manageServicePhp.postRujukan(dataGen).then(function (e) {
                    if (e.data.metaData.code == 200) {
                        $scope.insert.noRujukan = e.data.response.rujukan.noRujukan
                        var data = {
                            nosep: $scope.insert.noSep,
                            tglrujukan: new moment($scope.insert.tglRujukan).format('YYYY-MM-DD'),
                            jenispelayanan: $scope.insert.jenisPelayanan.idjenispelayanan,
                            ppkdirujuk: $scope.insert.faskess.nama,
                            kdppkdirujuk: kdPpkRujukan,
                            catatan: $scope.insert.catatan,
                            diagnosarujukan: kdiagnosa,
                            polirujukan: kdPolis,//'ANA',//$scope.insert.ruangan.kdinternal,
                            tiperujukan: $scope.insert.tipeRujukan.value,
                            nama: $scope.insert.nama,
                            nokartu: $scope.insert.noKartu,
                            tglsep: $scope.insert.tglSep,
                            sex: $scope.insert.jk,
                            norujukan: $scope.insert.noRujukan,
                            nocm: e.data.response.rujukan.peserta.noMr

                        };
                        manageServicePhp.saveDataTransaksi("bpjs/save-rujukan", data).then(function (z) {

                        })
                    }
                    document.getElementById("jsonInsert").innerHTML = JSON.stringify(e.data, undefined, 4);
                    $scope.isRouteLoading = false;
                }).then(function () {
                    $scope.isRouteLoading = false;
                })
            }

            $scope.UpdateRujukan = function () {
                var kdiagnosa = "";
                if ($scope.insert.diagnosaRujukan != undefined) {
                    kdiagnosa = $scope.insert.diagnosaRujukan.kddiagnosa;
                }
                // var kdpoli="";
                // if ( data.poliTujuan!=undefined){
                //     kdpoli=data.poliTujuan.kdinternal;
                // }
                var kdPpkRujukan = "";
                if ($scope.insert.faskess != undefined) {
                    kdPpkRujukan = $scope.insert.faskess.kode
                    // var arrKdPpkRUjukanBrid=$scope.insert.faskess.split(' - ');
                    // kdPpkRujukan=arrKdPpkRUjukanBrid[0];
                }
                var kdPolis = "";
                if ($scope.insert.poli != undefined) {
                    kdPolis = $scope.insert.poli.kode
                    // var arrKdPoli=$scope.insert.poli.split(' - ');
                    // kdPolis=arrKdPoli[0];
                }

                $scope.isRouteLoading = true;
                var dataGen = {
                    norujukan: $scope.insert.noRujukan,
                    tglrujukan: new moment($scope.insert.tglRujukan).format('YYYY-MM-DD'),
                    jenispelayanan: $scope.insert.jenisPelayanan.idjenispelayanan,
                    ppkdirujuk: kdPpkRujukan,
                    catatan: $scope.insert.catatan,
                    diagnosarujukan: kdiagnosa,
                    polirujukan: kdPolis,//'ANA',//$scope.insert.ruangan.kdinternal,
                    tiperujukan: $scope.insert.tipeRujukan.value,
                    tipe: $scope.insert.tipeRujukan.value,


                };
                manageServicePhp.updateRujukan(dataGen).then(function (e) {
                    if (e.data.metaData.code === "200")
                        toastr.success('Sukses Update Rujukan', 'Information');
                    else
                        toastr.error(e.data.metaData.message, 'Information');
                    $scope.isRouteLoading = false;
                    document.getElementById("jsonInsert").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                })
            }

            $scope.hideRujukan = function () {
                $scope.showSEP = false;
            }

            $scope.cariRujukan = function () {
                $scope.isRouteLoading = true;
                manageServicePhp.cariSep($scope.insert.noSep).then(function (e) {
                    if (e.data.metaData.code === "200") {
                        var tglLahir = new Date(e.data.response.peserta.tglLahir);
                        $scope.insert.pelayanan = e.data.response.jnsPelayanan;
                        $scope.insert.tglSep = e.data.response.tglSep;
                        $scope.insert.tglLahir = e.data.response.peserta.tglLahir;
                        $scope.insert.noKartu = e.data.response.peserta.noKartu;
                        $scope.insert.nama = e.data.response.peserta.nama;
                        $scope.insert.hakKelas = e.data.response.peserta.hakKelas;
                        $scope.insert.diagnosa = e.data.response.diagnosa;
                        $scope.insert.jk = e.data.response.peserta.kelamin;
                        $scope.insert.nocm = e.data.response.peserta.noRm;
                        $scope.isRouteLoading = false;
                        $scope.showSEP = true;
                        toastr.info(e.data.metaData.message, 'Information');
                        // document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                    } else {
                        $scope.isRouteLoading = false;
                        toastr.warning(e.data.metaData.message, 'Warning');
                    }

                })
            }
            manageServicePhp.getDataTableTransaksi("bpjs/get-ref-ruangrawat"
            )
                .then(function (e) {
                    if (e.data.metaData.code == 200) {
                        $scope.listRuang = e.data.response.list;
                    }
                })
            manageServicePhp.getDataTableTransaksi("bpjs/get-ref-kelasrawat"
            )
                .then(function (e) {
                    if (e.data.metaData.code == 200) {
                        $scope.listKelas = e.data.response.list;
                    }

                })
            $scope.getFaskess = function () {
                if ($scope.insert.faskess.length >= 3) {
                    manageServicePhp.getDataTableTransaksi("bpjs/get-ref-faskes?kdNamaFaskes="
                        + $scope.insert.faskess
                        + "&jenisFakses="
                        + "2"
                    )
                        .then(function (e) {
                            if (e.data.metaData.code == 200) {
                                var result = e.data.response.faskes;
                                for (var x = 0; x < result.length; x++) {
                                    var element = result[x];
                                    element.nama = element.kode + ' - ' + element.nama
                                }
                                $scope.listFaskess = result;
                            }

                            document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                        })
                }
            }
            $scope.getPoli = function () {
                if ($scope.insert.poli.length >= 3) {
                    manageServicePhp.getDataTableTransaksi("bpjs/get-poli?kodeNamaPoli="
                        + $scope.insert.poli
                    )
                        .then(function (e) {
                            if (e.data.metaData.code == 200) {
                                var result = e.data.response.poli;
                                for (var x = 0; x < result.length; x++) {
                                    var element = result[x];
                                    element.nama = element.kode + ' - ' + element.nama
                                }
                                $scope.listPoli = result;
                            }
                            document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                        })
                }
            }

            // END

            // *** UPDATE RUJUKAN
            modelItemAkuntansi.getDataDummyPHP("bpjs/get-diagnosa-saeutik", true, true, 10).then(function (data) {
                $scope.listDiagnosa = data;

            });
            $scope.$watch('update.jenisPelayanan', function (e) {
                if (!e) return;
                if (e.jenispelayanan.indexOf('Inap') >= 0) {
                    manageServicePhp.getDataTableTransaksi("bpjs/get-ruangan-ri").then(function (data) {
                        $scope.ruangans = data.data.data;
                    })
                } else {
                    manageServicePhp.getDataTableTransaksi("bpjs/get-ruangan-rj").then(function (data) {
                        $scope.ruangans = data.data.data;
                    })
                    $scope.update.kelasRawat = $scope.kelasRawat[2];
                }
            })
            $scope.checkNoRujukanPeserta = function () {
                if (!$scope.model.cekNoRujukan) return;
                if ($scope.update.noRujukan === '' || $scope.update.noRujukan === undefined) return;
                $scope.isLoadingNoKartu = true;
                manageServicePhp.checkPesertaByNoRujukanRs($scope.update.noRujukan).then(function (e) {
                    if (e.data.metaData.code === "200") {
                        var tglLahir = new Date(e.data.response.peserta.tglLahir);
                        $scope.model.noRujukan = $scope.noKartu = e.data.response.peserta.noKartu;
                        $scope.model.namaPeserta = e.data.response.peserta.nama;
                        $scope.model.tglLahir = tglLahir;
                        $scope.model.noIdentitas = e.data.response.peserta.nik;
                        $scope.model.kelasBridg = {
                            id: parseInt(e.data.response.peserta.hakKelas.kode),
                            kdKelas: e.data.response.peserta.hakKelas.kode,
                            nmKelas: e.data.response.peserta.hakKelas.keterangan,
                            namakelas: e.data.response.peserta.hakKelas.keterangan,
                        };

                        $scope.update.kelasRawat = { idkelas: $scope.model.kelasBridg.id, namakelas: $scope.model.kelasBridg.nmKelas }
                        $scope.kodeProvider = e.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.response.peserta.provUmum.nmProvider;
                        $scope.update.ppkRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;

                        toastr.info(e.data.response.peserta.statusPeserta.keterangan, 'Status Peserta');
                    } else {
                        window.messageContainer.error(e.data.metaData.message);
                    }
                    $scope.isLoadingNoKartu = false;
                }, function (err) {
                    $scope.isLoadingNoKartu = false;
                });

                var arrKdPpkRUjukan = $scope.model.namaAsalRujukan.split(' - ');
                if (arrKdPpkRUjukan != undefined) {
                    var kdPpkRujukan = arrKdPpkRUjukan[0];
                    var namaPpkRujukan = arrKdPpkRUjukan[1];
                }

            }


            $scope.jenisPelayanan = [{
                "idjenispelayanan": 1, "jenispelayanan": "Rawat Inap       "
            }, {
                "idjenispelayanan": 2, "jenispelayanan": "Rawat Jalan      "
            }];
            $scope.listTipeRujukan = [{
                "id": 3, "tiperujukan": "Penuh", "value": 0
            }, {
                "id": 4, "tiperujukan": "Partial", "value": 1
            }, {
                "id": 5, "tiperujukan": "Rujuk Balik", "value": 2
            }];

            // "penjamin": "{penjamin lakalantas -> 1=Jasa raharja PT, 2=BPJS Ketenagakerjaan, 3=TASPEN PT, 4=ASABRI PT} jika lebih dari 1 isi -> 1,2 (pakai delimiter koma)",

            $scope.clear();



            $scope.generateSep = function (data) {
                var kdiagnosa = "";
                if ($scope.update.diagnosaRujukan != undefined) {
                    kdiagnosa = $scope.update.diagnosaRujukan.kddiagnosa;
                }
                var kdpoli = "";
                if (data.poliTujuan != undefined) {
                    kdpoli = data.poliTujuan.internal;
                }


                $scope.isRouteLoading = true;
                var dataGen = {
                    nosep: $scope.udpdate.noSep,
                    tglrujukan: new moment(data.tglRujukan).format('YYYY-MM-DD'),
                    jenispelayanan: data.jenisPelayanan.idjenispelayanan,
                    ppkdirujuk: data.ppkDirujuk,
                    catatan: data.catatan,
                    diagnosarujukan: kdiagnosa,
                    polirujukan: kdpoli,//'ANA',//$scope.update.ruangan.kdinternal,
                    tiperujukan: data.tipeRujukan.value,

                };
                manageServicePhp.postRujukan(dataGen).then(function (e) {
                    document.getElementById("jsonUpdate").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                })


            }
            // **END

            // ***delete rujukan
            $scope.deleteRujukan = function (data) {
                $scope.isRouteLoading = true;
                manageServicePhp.deleteRujukan(data).then(function (e) {
                    document.getElementById("jsonDelete").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
            // ***



            // *** DAFTAR RUJUKAN LOKAL
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.columnGrid = {
                // toolbar: [
                // 	"excel",

                // 	],
                // 	excel: {
                // 		fileName: "DaftarRegistrasiPasien.xlsx",
                // 		allPages: true,
                // 	},
                // 	excelExport: function(e){
                // 		var sheet = e.workbook.sheets[0];
                // 		sheet.frozenRows = 2;
                // 		sheet.mergedCells = ["A1:K1"];
                // 		sheet.name = "Orders";

                // 		var myHeaders = [{
                // 			value:"Daftar Registrasi Pasien",
                // 			fontSize: 20,
                // 			textAlign: "center",
                // 			background:"#ffffff",
                //          // color:"#ffffff"
                //      }];

                //      sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70});
                //  },
                selectable: 'row',
                pageable: true,
                columns: [

                    {
                        "field": "tglrujukan",
                        "title": "Tgl Rujukan",
                        "width": "100px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglrujukan #')}}</span>"
                    },
                    {
                        "field": "norujukan",
                        "title": "No Rujukan",
                        "width": "150px"
                    },
                    {
                        "field": "nocm",
                        "title": "NoRM",
                        "width": "70px",
                        "template": "<span class='style-center'>#: nocm #</span>"
                    },
                    {
                        "field": "nama",
                        "title": "Nama Pasien",
                        "width": "150px",
                        "template": "<span class='style-left'>#: nama #</span>"
                    },

                    {
                        "field": "nosep",
                        "title": "No SEP",
                        "width": "150px",
                        "template": "<span class='style-left'>#: nosep #</span>"
                    },
                    // {
                    //     "field": "tglsep",
                    //     "title": "Tgl SEP",
                    //     "width": "80px",
                    //     "template": "<span class='style-left'>{{formatTanggal('#: tglsep #')}}</span>"
                    // },
                    {
                        "field": "nokartu",
                        "title": "No Kartu",
                        "width": "90px",
                        "template": "<span class='style-left'>#: nokartu #</span>"
                    },
                    {
                        "field": "jenispelayanan",
                        "title": "Jenis Pelayanan",
                        "width": "80px",
                        "template": "<span class='style-left'>#: jenispelayanan #</span>"
                    },
                    {
                        "field": "namaruangan",
                        "title": "Poli Rujukan",
                        "width": "100px",
                        "template": "<span class='style-left'>#: namaruangan #</span>"
                    },
                    {
                        "field": "tiperujukan",
                        "title": "Tipe",
                        "width": "80px",
                        "template": "<span class='style-left'>#: tiperujukan #</span>"
                    },
                    {
                        "field": "ppkdirujuk",
                        "title": "PPK Dirujuk",
                        "width": "150px",
                        "template": "<span class='style-left'>#: ppkdirujuk #</span>"
                    },

                    {
                        "field": "diagnosarujukan",
                        "title": "Diagnosa",
                        "width": "60px",
                        "template": "<span class='style-center'>#: diagnosarujukan #</span>"
                    },
                    // {
                    //     "field": "catatan",
                    //     "title": "Catatan",
                    //     "width": "80px",
                    //     "template": "<span class='style-center'>#: catatan #</span>"
                    // }
                    // {
                    // 	"field": "statuspasien",
                    // 	"title": "Status Pasien",
                    // 	"width":"100px",
                    // }				
                ]
            };
            $scope.getGridData = function () {
                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.daftar.periodeAwal).format('YYYY-MM-DD');
                var tglAkhir = moment($scope.daftar.periodeAkhir).format('YYYY-MM-DD');

                var noRujukan = ""
                if ($scope.daftar.noRujukan != undefined) {
                    noRujukan = "&norujukan=" + $scope.daftar.noRujukan
                }
                var rm = ""
                if ($scope.daftar.nocm != undefined) {
                    rm = "&nocm=" + $scope.daftar.nocm
                }

                manageServicePhp.getDataTableTransaksi("bpjs/get-daftar-rujukan?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    noRujukan + rm
                )
                    .then(function (data) {
                        $scope.isRouteLoading = false;
                        var result = data.data.data
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].jenispelayanan == 1 && result[i].jenispelayanan != null)
                                result[i].jenispelayanan = 'Rawat Inap'
                            else
                                result[i].jenispelayanan = 'Rawat Jalan'

                            if (result[i].tiperujukan == "0")
                                result[i].jenispelayanan = 'Penuh'
                            else if (result[i].tiperujukan == "1")
                                result[i].jenispelayanan = 'Partial'
                            else if (result[i].tiperujukan == "2")
                                result[i].jenispelayanan = 'Rujuk Balik'
                        }
                        $scope.dataSource = new kendo.data.DataSource({
                            data: result,
                            pageSize: 10,
                            total: result,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                    }
                                }
                            }
                        });

                    });

            }

            $scope.onTabSelected = function (tabId) {
                //you can add some loading before rendering
                $scope.tabId = tabId;
            };
            $scope.updateRujukanGrid = function () {
                if ($scope.dataSelected == undefined) {
                    toastr.error('Pilih data dulu')
                    return
                }

                //default template loaded
                $scope.insert.noSep = $scope.dataSelected.nosep
                $scope.insert.noRujukan = $scope.dataSelected.norujukan
                $scope.insert.catatan = $scope.dataSelected.catatan
                $scope.insert.tglRujukan = $scope.dataSelected.tglrujukan
                manageServicePhp.cariSep($scope.dataSelected.nosep).then(function (e) {
                    if (e.data.metaData.code === "200") {
                        var tglLahir = new Date(e.data.response.peserta.tglLahir);
                        $scope.insert.pelayanan = e.data.response.jnsPelayanan;
                        $scope.insert.tglSep = e.data.response.tglSep;
                        $scope.insert.tglLahir = e.data.response.peserta.tglLahir;
                        $scope.insert.noKartu = e.data.response.peserta.noKartu;
                        $scope.insert.nama = e.data.response.peserta.nama;
                        $scope.insert.hakKelas = e.data.response.peserta.hakKelas;
                        $scope.insert.diagnosa = e.data.response.diagnosa;
                        $scope.insert.jk = e.data.response.peserta.kelamin;
                        $scope.insert.nocm = e.data.response.peserta.noRm;
                        // $scope.isRouteLoading = false;
                        $scope.showSEP = true;
                        toastr.info(e.data.metaData.message, 'Information');
                        // document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                    } else {

                        toastr.warning(e.data.metaData.message, 'Warning');
                    }

                })
            }
            $scope.$watch('insert.tipeRujukan', function (e) {
                if (!e) return;
                if (e.value == 2) {
                    manageServicePhp.checkPesertaByNoBpjs($scope.insert.noKartu).then(function (e) {
                        if (e.data.metaData.code === "200") {
                         
                            $scope.insert.faskess = {
                                kode: e.data.response.peserta.provUmum.kdProvider,
                                nama: e.data.response.peserta.provUmum.nmProvider
                            }
                        }
                    });
                }
            })


        }
    ]);
});