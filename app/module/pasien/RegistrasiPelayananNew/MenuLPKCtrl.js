define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('MenuLPKCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'FindPasien', 'DateHelper', 'ManageServicePhp', 'ModelItemAkuntansi',
        function ($rootScope, $scope, $state, ModelItem, findPasien, DateHelper, manageServicePhp, modelItemAkuntansi) {
            $scope.now = new Date();
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
            $scope.dataLPK={}
            var data2 = [];
            var datatindakan = [];
            $scope.now = new Date();
            $scope.isRawatinap = false;
            $scope.clear = function () {

                $scope.dataLPK.tglMasuk = $scope.now

                $scope.item = {};
                $scope.model = {};
                $scope.isRouteLoading = false;
                $scope.item.tglMasuk = $scope.now;
                $scope.item.tglKeluar = $scope.now;
                $scope.item.tglKontrol = $scope.now;
                $scope.item.poliEksekutif = $scope.poliEksekutif[1];
                $scope.item.rencanaTindak = $scope.listRencanaTindak[0];
                $scope.item.penjamin = $scope.listPenjamin[0];

            };
            $scope.isShowPembuatanSep = false;
            $scope.isShowPotensi = true;
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


            // ***** start
            $scope.dataCheckbox = [{
                "id": 1, "name": "Insert"
            }, {
                "id": 2, "name": "Update"
            }];

            getComboBridging();
            $scope.clear();
            // $scope.item.pasca={kode:$scope.listPascaPulang[0].kode,nama:$scope.listPascaPulang[0].nama};


            $scope.findByNoSep = function () {
                $scope.isRouteLoading = true;
                manageServicePhp.cariSep($scope.item.noSep).then(function (e) {

                    if (e.data.metaData.code === "200") {
                        $scope.isRouteLoading = false;
                        $scope.item.noBPJS = e.data.response.peserta.noKartu
                        $scope.item.nama = e.data.response.peserta.nama
                        $scope.item.noRm = e.data.response.peserta.noMr
                        $scope.item.tglLahir = e.data.response.peserta.tglLahir
                        $scope.item.jeniskelamin = e.data.response.peserta.kelamin
                        $scope.item.tglMasuk = new Date(e.data.response.tglSep)
                        $scope.item.poliSep = e.data.response.poli
                        if (e.data.response.jnsPelayanan == "Rawat Jalan")
                            $scope.isRawatinap = false
                        else
                            $scope.isRawatinap = true


                        var tanggal = $scope.now;
                        var tanggalLahir = new Date(e.data.response.peserta.tglLahir);
                        var umur = DateHelper.CountAge(tanggalLahir, tanggal);
                        umur = umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari';
                        $scope.item.umur = umur

                        // $scope.kdProvider= e.data.response.peserta.provUmum.kdProvider;
                        toastr.info(e.data.metaData.message, 'Info');
                    } else {
                        $scope.isRouteLoading = false;
                        window.messageContainer.error(e.data.metaData.message);
                    }
                    // document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }

            $scope.Tambah = function () {

                var nomor = 0
                if ($scope.listGridDiagnosa == undefined) {
                    nomor = 1
                } else {
                    nomor = data2.length + 1
                }
                var kdDiagnosa = "";
                var namaDiagnosa = "";
                if ($scope.item.diagnosa != undefined) {
                    // var arrdiag=$scope.item.diagnosa.split(' - ');
                    // kdDiagnosa= arrdiag[0]
                    // namaDiagnosa= arrdiag[1]
                    kdDiagnosa = $scope.item.diagnosa.kode
                    namaDiagnosa = $scope.item.diagnosa.nama;
                }
                else {
                    messageContainer.error("Diagnosa Harus Di isi")
                    return
                }

                var dataDiagnosa = {};
                dataDiagnosa = {
                    no: nomor,
                    kddiagnosa: kdDiagnosa,
                    namadiagnosa: namaDiagnosa,
                    utama: $scope.model.diagnosaUtama === true ? 1 : 2,
                    jenis: $scope.model.diagnosaUtama === true ? "Primer" : "Sekunder",
                }
                data2.push(dataDiagnosa)
                $scope.listGridDiagnosa = new kendo.data.DataSource({
                    data: data2
                });
                $scope.item.diagnosa = undefined;

            }

            $scope.gridDiagnosa =
                // {
                //   selectable: "row",
                //   sortable: true,
                //   columns: 
                [
                    {
                        "title": "#",
                        "field": "no",
                        "width": 15
                    },
                    {
                        "field": "kddiagnosa",
                        "title": "Kode",
                        "width": 100
                    },
                    {
                        "field": "namadiagnosa",
                        "title": "Diagnosa",
                        "width": 150
                    },
                    {
                        "field": "jenis",
                        "title": "Jenis Diagnosa",
                        "width": 80
                    },
                    {
                        command: {
                            text: "Hapus",
                            width: "30px",
                            align: "center",
                            attributes: { align: "center" },
                            click: removeData2
                        },
                        title: "",
                        width: "30px"
                    }
                ];
            function removeData2(e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                $scope.tempDataTindakan = $scope.listGridDiagnosa
                    .filter(function (el) {
                        return el.name !== grid[0].name;
                    });
                grid.removeRow(row);
                var data = {};
                if (dataItem != undefined) {
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no == dataItem.no) {
                            data2.splice(i, 1);
                            for (var i = data2.length - 1; i >= 0; i--) {

                                data2[i].no = i + 1
                            }
                            $scope.listGridDiagnosa = new kendo.data.DataSource({
                                data: data2
                            });
                        }
                    }
                }

            }
            $scope.Tambah2 = function () {

                var nomor = 0
                if ($scope.listGridDiagnosaTindakan == undefined) {
                    nomor = 1
                } else {
                    nomor = datatindakan.length + 1
                }
                var kdDiagnosa = "";
                var namaDiagnosa = ";"
                if ($scope.item.diagnosaTindakan != undefined) {
                    // var arrdiagss=$scope.item.diagnosaTindakan.split(' - ');
                    //    kdDiagnosa= arrdiagss[0]
                    //    namaDiagnosa= arrdiagss[1]
                    kdDiagnosa = $scope.item.diagnosaTindakan.kode
                    namaDiagnosa = $scope.item.diagnosaTindakan.nama;
                }
                else {
                    messageContainer.error("Diagnosa Tindakan Harus Di isi")
                    return
                }

                var dataDiagnosaTin = {};
                dataDiagnosaTin = {
                    no: nomor,
                    kddiagnosatindakan: kdDiagnosa,
                    namadiagnosatindakan: namaDiagnosa,
                    // utama: $scope.model.diagnosaUtama === true ? 1 : 0,
                }
                datatindakan.push(dataDiagnosaTin)
                $scope.listGridDiagnosaTindakan = new kendo.data.DataSource({
                    data: datatindakan
                });

                $scope.item.diagnosaTindakan = undefined;

            }

            $scope.gridDiagnosaTindakan =
                [
                    {
                        "title": "#",
                        "field": "no",
                        "width": 15
                    },
                    {
                        "field": "kddiagnosatindakan",
                        "title": "Kode",
                        "width": 100
                    }, {
                        "field": "namadiagnosatindakan",
                        "title": "Procedure/tindakan",
                        "width": 150
                    }, {
                        command: {
                            text: "Hapus",
                            width: "30px",
                            align: "center",
                            attributes: { align: "center" },
                            click: removeData4
                        },
                        title: "",
                        width: "30px"
                    }

                ];

            function removeData4(e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                $scope.tempDataTindakanSS = $scope.listGridDiagnosaTindakan
                    .filter(function (el) {
                        return el.name !== grid[0].name;
                    });
                grid.removeRow(row);
                var data = {};
                if (dataItem != undefined) {
                    for (var i = datatindakan.length - 1; i >= 0; i--) {
                        if (datatindakan[i].no == dataItem.no) {
                            datatindakan.splice(i, 1);
                            for (var i = datatindakan.length - 1; i >= 0; i--) {

                                datatindakan[i].no = i + 1
                            }
                            $scope.listGridDiagnosaTindakan = new kendo.data.DataSource({
                                data: datatindakan
                            });
                        }
                    }
                }

            }
            $scope.Save = function () {
                if (!$scope.item.tipe) {
                    messageContainer.error('Pilih Tipe Post');
                    return;
                } else {

                    if ($scope.item.tipe.id === 1) {
                        $scope.status = 'Insert';
                        $scope.SaveData();
                    } else {
                        $scope.status = 'Update';
                        $scope.SaveData();
                    }
                }
            }

            $scope.SaveData = function () {

                var ruangRawat = "";
                if ($scope.item.ruangRawat != undefined) {
                    // var arrkdDiag=$scope.item.ruangRawat.split(' - ');
                    ruangRawat = $scope.item.ruangRawat.kode
                }
                var kelasRawat = "";
                if ($scope.item.kelas != undefined) {
                    kelasRawat = $scope.item.kelas.kode
                }
                var spesialistik = "";
                if ($scope.item.spesialistik != undefined) {
                    spesialistik = $scope.item.spesialistik.kode
                }

                var carakeluar = "";
                if ($scope.item.cara != undefined) {
                    carakeluar = $scope.item.cara.kode
                }
                var pasca = "";
                if ($scope.item.pasca != undefined) {
                    pasca = $scope.item.pasca.kode
                }
                var rencanaTindak = "";
                if ($scope.item.rencanaTindak != undefined) {
                    rencanaTindak = $scope.item.rencanaTindak.id
                }
                var kdpoli = "";
                var kdFaskes = "";
                var tglKontrol = ""
                if ($scope.item.rencanaTindak.id == 4) {
                    tglKontrol = moment($scope.item.tglKontrol).format('YYYY-MM-DD');

                    if ($scope.item.poli != undefined) {
                        var arrPoli = $scope.item.poli.split(' - ');
                        kdpoli = arrPoli[0];
                    }
                    if ($scope.item.faskess != undefined) {
                        var arrfask = $scope.item.faskess.split(' - ');
                        kdFaskes = arrfask[0];
                    }
                }
                var dpjp = "";
                if ($scope.item.dokter != undefined) {
                    dpjp = $scope.item.dokter.kode
                    // var arrdokter=$scope.item.dokter.split(' - ');
                    // dpjp=arrdokter[0]
                }
                var kodediagtindakanprimer = "";

                if ($scope.listGridDiagnosaTindakan._data.length > 0 && $scope.listGridDiagnosaTindakan._data.length < 2) {
                    kodediagtindakanprimer = $scope.listGridDiagnosaTindakan._data[0].kddiagnosatindakan
                } else if ($scope.listGridDiagnosaTindakan._data.length > 1) {
                    var kodediagtindakansekunder = "";
                    kodediagtindakanprimer = $scope.listGridDiagnosaTindakan._data[0].kddiagnosatindakan
                    kodediagtindakansekunder = $scope.listGridDiagnosaTindakan._data[1].kddiagnosatindakan
                }
                var kodeprimer = "";
                var levelprimer = "";
                var kodesekunder = "";
                var levelsekunder = "";
                if ($scope.listGridDiagnosa._data.length > 0 && $scope.listGridDiagnosa._data.length < 2) {
                    kodeprimer = $scope.listGridDiagnosa._data[0].kddiagnosa
                    levelprimer = $scope.listGridDiagnosa._data[0].utama
                } else if ($scope.listGridDiagnosa._data.length > 1) {
                    kodeprimer = $scope.listGridDiagnosa._data[0].kddiagnosa
                    levelprimer = $scope.listGridDiagnosa._data[0].utama
                    kodesekunder = $scope.listGridDiagnosa._data[1].kddiagnosa
                    levelsekunder = $scope.listGridDiagnosa._data[1].utama
                }

                if (kodesekunder == "") {
                    toastr.error('Diagnosa Tindakan Minimal 2', 'Info');
                }


                var objSave = {
                    "nosep": $scope.item.noSep,
                    "tglmasuk": moment($scope.item.tglMasuk).format('YYYY-MM-DD'),
                    "tglkeluar": moment($scope.item.tglKeluar).format('YYYY-MM-DD'),
                    "jaminan": "1",
                    // "poli": kdpoli,
                    "poli": $scope.isRawatinap === true ? "" : "ANA",
                    "ruangrawat": ruangRawat,
                    "kelasrawat": kelasRawat,
                    "spesialistik": spesialistik,
                    "carakeluar": carakeluar,
                    "kondisipulang": pasca,
                    "kodeprimer": kodeprimer,
                    "levelprimer": levelprimer,
                    "kodesekunder": kodesekunder,
                    "levelsekunder": levelsekunder,
                    "kodediagtindakanprimer": kodediagtindakanprimer,
                    "kodediagtindakansekunder": kodediagtindakansekunder,
                    "tindaklanjut": rencanaTindak,
                    "kodeppk": kdFaskes,
                    "tglkontrol": tglKontrol,
                    "polikontrol": kdpoli,
                    "dpjp": dpjp
                }
                $scope.isRouteLoading = true;
                if ($scope.status == 'Insert') {
                    manageServicePhp.insertLPK(objSave).then(function (e) {
                        if (e.data.metaData.code === "200") {
                            toastr.success(e.data.metaData.message, e.data.response);
                        } else {
                            window.messageContainer.error(e.data.metaData.message);
                        }
                    }).then(function () {
                        $scope.isRouteLoading = false;
                    });
                } else {
                    manageServicePhp.updateLPK(objSave).then(function (e) {
                        if (e.data.metaData.code === "200") {
                            toastr.success(e.data.metaData.message, e.data.response);
                        } else {
                            window.messageContainer.error(e.data.metaData.message);
                        }
                    }).then(function () {
                        $scope.isRouteLoading = false;
                    });
                }


            }

            function getComboBridging() {

                $scope.poliEksekutif = [{
                    "id": 10, "eks": "Eksekutif", "value": 1
                }, {
                    "id": 11, "eks": "Reguler", "value": 2
                }];
                $scope.listRencanaTindak = [{
                    "id": 1, "namarencana": "Diperbolehkan Pulang", "value": 1
                }, {
                    "id": 2, "namarencana": "Pemeriksaan Penunjang", "value": 2
                }, {
                    "id": 3, "namarencana": "Dirujuk Ke", "value": 3
                }, {
                    "id": 4, "namarencana": "Kontrol Kembali", "value": 4
                }];
                $scope.listPenjamin = [{
                    "id": 5, "namapenjamin": "JKN", "value": 1
                }];
                manageServicePhp.getDataTableTransaksi("bpjs/get-ref-ruangrawat"
                )
                    .then(function (e) {
                        $scope.listRuang = e.data.response.list;
                        if (e.data.metaData.code == 200) {

                        }
                    })

                manageServicePhp.getDataTableTransaksi("bpjs/get-ref-carakeluar"
                )
                    .then(function (e) {
                        if (e.data.metaData.code == 200) {
                            $scope.listCaraKeluar = e.data.response.list;
                        }

                    })

                manageServicePhp.getDataTableTransaksi("bpjs/get-ref-pascapulang"
                )
                    .then(function (e) {
                        if (e.data.metaData.code == 200) {
                            $scope.listPascaPulang = e.data.response.list;

                        }

                    })

                manageServicePhp.getDataTableTransaksi("bpjs/get-ref-spesialistik"
                )
                    .then(function (e) {
                        if (e.data.metaData.code == 200) {
                            $scope.listSpesialis = e.data.response.list;
                        }

                    })

                manageServicePhp.getDataTableTransaksi("bpjs/get-ref-kelasrawat"
                )
                    .then(function (e) {
                        if (e.data.metaData.code == 200) {
                            $scope.listKelas = e.data.response.list;
                        }

                    })


            }
            $scope.getFaskess = function () {
                if ($scope.item.faskess.length >= 3) {
                    manageServicePhp.getDataTableTransaksi("bpjs/get-ref-faskes?kdNamaFaskes="
                        + $scope.item.faskess
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


                        })
                }
            }
            $scope.getPoli = function () {
                if ($scope.item.poli.length >= 3) {
                    manageServicePhp.getDataTableTransaksi("bpjs/get-poli?kodeNamaPoli="
                        + $scope.item.poli
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

                        })
                }
            }
            $scope.getDokter = function () {
                if ($scope.item.dokter.length >= 3) {
                    manageServicePhp.getDataTableTransaksi("bpjs/get-ref-dokter?namaDokter="
                        + $scope.item.dokter
                    )
                        .then(function (e) {
                            if (e.data.metaData.code == 200) {
                                var result = e.data.response.list;
                                for (var x = 0; x < result.length; x++) {
                                    var element = result[x];
                                    element.nama = element.kode + ' - ' + element.nama
                                }
                                $scope.listDokter = result;
                            }

                        })
                }
            }
            $scope.getDiagnosa = function () {
                if ($scope.item.diagnosa != undefined) {
                    if ($scope.item.diagnosa.length >= 3) {
                        manageServicePhp.getDataTableTransaksi("bpjs/get-ref-diagnosa?kdNamaDiagnosa="
                            + $scope.item.diagnosa
                        )
                            .then(function (e) {
                                if (e.data.metaData.code == 200) {
                                    $scope.listDiagnosa = e.data.response.diagnosa;
                                }
                            })
                    }


                }

            }
            $scope.getDiagnosaTindakan = function () {
                if ($scope.item.diagnosaTindakan.length >= 3) {
                    manageServicePhp.getDataTableTransaksi("bpjs/get-ref-diagnosatindakan?kdNamaDiagnosa="
                        + $scope.item.diagnosaTindakan
                    )
                        .then(function (e) {
                            if (e.data.metaData.code == 200) {
                                $scope.listDiagnosaTindakan = e.data.response.procedure;
                            }

                        })
                }
            }

            modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-diagnosa-part", true, true, 10).then(function (data) {
                $scope.listDiagnosa = data;

            });
            modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-diagnosatindakan-part", true, true, 10).then(function (data) {
                $scope.listDiagnosaTindakan = data;

            });
            modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-dokter-part", true, true, 10).then(function (data) {
                $scope.listDokter = data;
                // document.getElementById("json").innerHTML = JSON.stringify(data, undefined, 4); 

            });
            // *** end

            $scope.deleteLPK = function (data) {
                $scope.isRouteLoading = true;
                var datas = {
                    'nosep': data
                }
                manageServicePhp.deleteLPKnew(datas).then(function (e) {
                    document.getElementById("jsonDelete").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }

            $scope.jenisPelayananLPK = [{
                "id": 1, "nama": "Rawat Inap   "
            }, {
                "id": 2, "nama": "Rawat Jalan   "
            }];
            $scope.findDataLPK = function (data) {
                $scope.isRouteLoading = true;
                var data = {
                    jenispelayanan: data.jenisPel,
                    tglmasuk: new moment(data.tglMasuk).format('YYYY-MM-DD')
                }
                manageServicePhp.getDataTableTransaksi("bpjs/data-lpk?tglmasuk="
                    + data.tglmasuk
                    + "&jenispelayanan="
                    + data.jenispelayanan
                ).then(function (e) {
                    document.getElementById("jsonDataLPK").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function () {
                    $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});