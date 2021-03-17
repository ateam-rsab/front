define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarAntrianPasienOperatorNewCtrl', ['SaveToWindow', 'DateHelper', '$rootScope', '$scope', 'ModelItem', 'ModelItemAkuntansi', '$state', 'FindPasien', 'ManagePasien', '$window', 'CetakHelper', 'ManageSarprasPhp', 'CacheHelper', 'ManagePhp',
        function (saveToWindow, dateHelper, $rootScope, $scope, ModelItem, modelItemAkuntansi, $state, findPasien, managePasien, $window, cetakHelper, manageSarprasPhp, cacheHelper, managePhp) {
            $scope.isRouteLoading = true;
            $scope.title = "ini page pencarian pasien";
            $scope.kodeRuangan = $state.params.kodeRuangan;
            $scope.isCalling = false;
            $scope.pegawai = ModelItem.getPegawai();
            $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            $scope.now = new Date();
            $scope.from = new Date();
            $scope.until = new Date()
            $scope.items = {};
            $scope.from = moment($scope.from).format('YYYY-MM-DD 00:00')
            loadCombo()
            function loadCombo() {
                managePhp.getData('antrian/get-list-combo').then(function (e) {
                    $scope.ruangans = e.data.data
                    $scope.listPembatalan = e.data.pembatalan
                    $scope.listJenisDiagnosa = e.data.jenisdiagnosa
                    $scope.listKelas = e.data.kelas
                })
                // $scope.ruangans = modelItemAkunteansi.kendoHttpSource('antrian/get-list-combo');
                // $scope.ruangans.fetch(function () {
                //     var data = [];
                //     for (var key in this._data) {
                //         if (this._data.hasOwnProperty(key)) {
                //             var element = this._data[key];
                //             if (element.objectdepartemenfk !== undefined) {
                //                 if (element.objectdepartemenfk === 18)
                //                     element.group = "Poliklinik";
                //                 else
                //                     element.group = "Penunjang";
                //                 data.push(element);
                //             }
                //         }
                //     }
                //     var temp = [];
                //     for (var key in _.groupBy(data, 'group')) {
                //         if (_.groupBy(data, 'group').hasOwnProperty(key)) {
                //             var element = _.groupBy(data, 'group')[key];
                //             temp.push({ key: key, items: element });
                //         }
                //     }
                //     $scope.ruangansLocal = temp;

                //     $scope.$apply();
                // });

            }
            modelItemAkuntansi.getDataDummyPHP("operator/get-data-diagnosa", true, true, 10).then(function (data) {
                $scope.listDiagnosa = data;
            });
            $scope.group = {
                field: "namaruangan",
                aggregates: [{
                    field: "namapasien",
                    aggregate: "count"
                }, {
                    field: "namaruangan",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [{
                field: "namapasien",
                aggregate: "count"
            }, {
                field: "ruangan.namaRuangan",
                aggregate: "count"
            }]
            $scope.Column = [{
                field: "noantrian",
                title: "No.",
                width: 50,
                aggregates: ["count"]
            }, {
                field: "namapasien",
                title: "Nama Pasien",
                aggregates: ["count"]
            }, {
                field: "nocm",
                title: "No. Rekam Medis",
                aggregates: ["count"]
            }, {
                field: "umur",
                title: "Umur",
                aggregates: ["count"]
            }, {
                field: "dokter",
                title: "Dokter",
                aggregates: ["count"]
            }, {
                field: "tglregistrasi",
                title: "Tgl Registrasi",
                template: "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY HH:mm') #",
                aggregates: ["count"]
            }, {
                field: "noregistrasi",
                title: "No Registrasi",
                aggregates: ["count"]
            }, {
                field: "jeniskelamin",
                title: "Jenis Kelamin",
                aggregates: ["count"]
            }, {
                field: "kelompokpasien",
                title: "Tipe Pembayaran",
                aggregates: ["count"]
            },
            {
                field: "namakelas",
                title: "Kelas",
                aggregates: ["count"]
            }, {
                field: "statusantrian",
                title: "Status",
                aggregates: ["count"]
            }, {
                hidden: true,
                field: "namaruangan",
                title: "Nama Ruangan",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
            }];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }


            $scope.findData = function () {
                $scope.isRouteLoading = true;
                var ruanganId = ''
                if ($scope.ruangan)
                    ruanganId = '&ruanganId=' + $scope.ruangan.id
                var noRM = ''
                if ($scope.noRekamMedis)
                    noRM = '&nocm=' + $scope.noRekamMedis
                var nama = ''
                if ($scope.namaPasiens)
                    nama = '&nama=' + $scope.namaPasiens
                // findPasien.findQueueSemua($scope.from, $scope.until, $scope.noRekamMedis, $scope.ruangan).then(function (e) {
                managePhp.getData('antrian/get-antrian-pasien-diperiksa?tglAwal=' + moment($scope.from).format('YYYY-MM-DD HH:mm') +
                    '&tglAkhir=' + moment($scope.until).format('YYYY-MM-DD HH:mm')
                    + ruanganId + noRM + nama).then(function (e) {
                        if (e.data.listData.length > 0) {
                            for (var key in e.data.listData) {
                                if (e.data.listData.hasOwnProperty(key)) {
                                    var element = e.data.listData[key];
                                    if (element.ruangan === undefined)
                                        element.ruangan = {
                                            namaRuangan: element.namaruangan
                                        }
                                }
                            }
                            var data = [];
                            for (var key in e.data.listData) {
                                if (e.data.listData.hasOwnProperty(key)) {
                                    var element = e.data.listData[key];
                                    data.push(element);
                                }
                            }
                            $scope.listPasien = data;
                            for (let i = 0; i < $scope.listPasien.length; i++) {
                                let umur = dateHelper.CountAge(new Date($scope.listPasien[i].tgllahir), new Date());
                                $scope.listPasien[i].umur = umur.year + ' th, ' + umur.month + ' bln, ' + umur.day + ' hr'

                            }
                            $scope.patienGrids = new kendo.data.DataSource({
                                data: $scope.listPasien,
                                group: $scope.group
                            });


                            $scope.isRouteLoading = false;
                        } else {
                            $scope.patienGrids = new kendo.data.DataSource({
                                data: [],
                                group: $scope.group
                            });
                            $scope.isRouteLoading = false;
                        }
                    });

            }
            $scope.findData();
            $scope.inputTindakan = function () {
                if ($scope.item) {
                    $state.go('InputTindakanPelayananRev', {
                        norecPD: $scope.item.norec_pd,
                        norecAPD: $scope.item.norec_apd
                    });
                } else {
                    messageContainer.error('Pasien belum di pilih')
                }
            }
            $scope.cetakNoAntrian = function () {
                if ($scope.item != undefined) {
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktipendaftaran=1&norec='
                        + $scope.item.noregistrasi + '&view=false', function (response) {
                            // do something with response
                        });
                }
            }
            $scope.cetakKartu = function () {
                if ($scope.item != undefined) {
                    manageSarprasPhp.getDataTableTransaksi("operator/identifikasi-kartu-pasien?norec_pd="
                        + $scope.item.norec_pd
                    ).then(function (data) {
                        var datas = data.data;
                    })

                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-kartupasien=1&norec='
                        + $scope.item.nocmfk + '&view=false', function (response) {
                            // do something with response
                        });
                }
            }
            $scope.formatNum = {
                format: "#.#",
                decimals: 0
            }
            $scope.cetakLabel = function () {
                $scope.dats = {
                    qty: 0
                }
                $scope.dialogCetakLabel.center().open();
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
                        managePhp.getData("operator/identifikasi-label?norec_pd="
                            + $scope.item.norec_pd + '&islabel=' + qtyhasil
                        ).then(function (data) {
                            var datas = data.data;
                        })
                        var client = new HttpClient();
                        client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-labelpasien=1&norec=' + $scope.item.noregistrasi + '&view=false&qty=' + qty, function (response) {
                            // do something with response
                        });
                    }
                    $scope.dialogCetakLabel.close();
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };
            $scope.cetakGelang = function () {
                if ($scope.item != undefined) {
                    var fixUrlLaporan = "http://192.168.12.4:7777/service-reporting/gelang-pasien/" + $scope.item.noregistrasi;
                    // var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/gelangPasien?id=" + $scope.item.nocmfk);
                    $window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
            }
            $scope.batalPeriksa = function () {
                var norReg = ""
                if ($scope.item.noregistrasi != undefined) {
                    norReg = "noReg=" + $scope.item.noregistrasi
                }

                manageSarprasPhp.getDataTableTransaksi("operator/get-data-pasien-mau-batal?"
                    + norReg
                ).then(function (data) {
                    var datas = data.data
                    if (datas.length > 0)
                        window.messageContainer.error('Pasien sudah Mendapatkan Pelayanan');
                    else {
                        $scope.listRuangan = [];
                        $scope.listRuangan.push($scope.item.ruangan);
                        $scope.items.ruangan = $scope.listRuangan[0];
                        $scope.winDialog.center().open();
                    }
                });
            }
            $scope.lanjutBatal = function (data, batal) {
                var BatalPeriksa = {
                    "norec": data.norec_pd,
                    "tanggalpembatalan": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    "pembatalanfk": batal.pembatalan.id,
                    "alasanpembatalan": batal.alasanBatal,

                }
                var grid = $("#grid").data('kendoGrid');
                grid._data.forEach(function (items) {
                    if (items.noRec === data.noRec) {
                        // delete selected grid row 
                        grid.dataSource.remove(items);
                        grid.dataSource.sync();
                    }
                })
                managePhp.postData2('operator/save-Batal-registrasi', BatalPeriksa).then(function (e) {
                    $scope.items = {};
                    $scope.winDialog.close();
                })

            }
            $scope.cetakBuktiLayanan = function () {
                if ($scope.item != undefined) {
                    managePhp.getData("operator/identifikasi-buktiLayanan?norec_pd="
                        + $scope.item.norec_pd
                    ).then(function (data) {
                        var datas = data.data;
                    })
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan=1&norec='
                        + $scope.item.noregistrasi + '&strIdPegawai='
                        + $scope.pegawai.id + '&view=false', function (response) {
                        });
                }
            }

            $scope.tracerBon = function () {
                if ($scope.item != undefined) {
                    //##save tracer
                    managePhp.getData("operator/identifikasi-tracer?norec_pd="
                        + $scope.item.norec_pd
                    ).then(function (data) {
                        var datas = data.data;
                    })
                    //##end
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-tracer=1&norec=' +
                        $scope.item.noregistrasi + '&view=false', function (response) {
                            // do something with response
                        });
                }
            }
            $scope.CetakSumList = function () {
                if ($scope.item != undefined) {
                    //##save summarylist
                    manage.getData("operator/identifikasi-sum-list?norec_pd="
                        + $scope.item.norec_pd
                    ).then(function (data) {
                        var datas = data.data;
                    })
                    //##end 

                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-summarylist=1&norec='
                        + $scope.item.nocm + '&view=false', function (response) {
                            // do something with response
                        });
                }
            }

            $scope.cetakSEP = function () {
                if ($scope.item != undefined && $scope.item.kelompokPasien !== "Umum/Pribadi") {
                    //##save sep
                    manageSarprasPhp.getDataTableTransaksi("operator/identifikasi-sep?norec_pd="
                        + $scope.item.norec_pd
                    ).then(function (data) {
                        var datas = data.data;
                    })
                    //##end 
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep-new=1&norec='
                        + $scope.item.noregistrasi + '&view=false', function (response) {
                            // do something with response
                        });
                }
            }
            $scope.openCetakRmk = function () {
                if ($scope.item != undefined) {
                    managePhp.getData("operator/get-data-diagnosa-pasien?noReg="
                        + $scope.item.noregistrasi
                    ).then(function (r) {
                        if (r.data.datas.length > 0 && r.data.datas[0].norec_diagnosapasien != null) {
                            $scope.cetakBro();
                        } else {
                            $scope.item.jenisDiagnosis = $scope.listJenisDiagnosa[4];
                            $scope.icd10.center().open();
                        }
                    })
                }
            }
            $scope.cetakRMK = function () {
                var listRawRequired = [
                    "item.diagnosisPrimer|k-ng-model|Diagnosa awal"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if (isValid.status) {
                    if ($scope.item != undefined) {
                        var detaildiagnosapasien = {
                            'norec_dp': '',
                            'noregistrasifk': $scope.item.norec_apd,
                            'objectdiagnosafk': $scope.item.diagnosisPrimer.id,
                            'objectjenisdiagnosafk': $scope.item.jenisDiagnosis.id,
                            'tglpendaftaran': $scope.item.tglregistrasi,
                            'tglinputdiagnosa': moment($scope.now).format('YYYY-MM-DD HH:mm:ss'),
                            'keterangan': $scope.item.keteranganDiagnosis != undefined ? $scope.item.keteranganDiagnosis : ''
                        }
                        managePhp.postData(detaildiagnosapasien, 'operator/save-diagnosa-rmk').then(function (e) {
                            $scope.icd10.close();
                            $scope.cetakBro();
                        })
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.cetakBro = function () {
                //##save identifikasi rmk
                managePhp.getData("operator/identifikasi-rmk?norec_pd="
                    + $scope.item.norec_pd
                ).then(function (data) {
                    var datas = data.data;
                })
                //##end 

                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar-byNorec=1&norec='
                    + $scope.item.norec_apd + '&view=false', function (response) {
                        // do something with response
                    });
            }

            $scope.batalPanggil = function () {
                if ($scope.item.statusantrian !== "SELESAI_DIPERIKSA") {
                    var dataJson = {
                        "norec_apd": $scope.item.norec_apd
                    }
                    manageSarprasPhp.pasienBatalPanggil(dataJson)
                        .then(function (e) {
                            $scope.findData();
                        });
                } else {
                    messageContainer.error('Pasien sudah selesai diperiksa')
                }
            }

            $scope.inputDiagnosa = function () {
                if ($scope.item != undefined) {
                    $scope.item.tglregistrasi = new Date($scope.item.tglregistrasi);
                    $scope.findDiagnosaPasien();
                    $scope.isLoadingDiagnosis = false;
                    $scope.findBy = 0;
                    $scope.toogleKlikDiagnosa();
                }
            }
            $scope.findDiagnosaPasien = function () {

                managePhp.getData('antrian/get-diagnosa-pasien-by-norecapd?noRec=' + $scope.item.norec_apd).then(function (e) {
                    if (e.data.data === undefined) return;
                    if (e.data.data.length === 0) return;

                    $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                        data: e.data.data,
                        change: function (e) {
                            var row = 0;
                            e.items.forEach(function (data) {
                                data.rowNumber = ++row;
                            })
                        }
                    });
                });
            }
            $scope.removeDiagnosa = function (e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);
                var dataDel = {
                    'diagnosa': {
                        'norec_dp': selectedItem.norec_diagnosapasien
                    }
                }
                // $scope.dataDiagnosisPrimer.remove(selectedItem);
                managePhp.postData(dataDel, 'pasien/delete-diagnosa-pasien').then(function (e) {
                    $scope.findDiagnosaPasien()
                })

            }
            $scope.klikInputData = function () {
                $scope.inputDataDiagnosis = !$scope.inputDataDiagnosis;
            }
            $scope.gridDiagnosa = {
                columns: [{
                    "field": "rowNumber", title: "#", "width": 40
                }, {
                    "field": "jenisdiagnosa",
                    "title": "Jenis Diagnosis",
                    "width": 150
                }, {
                    "field": "kddiagnosa",
                    "title": "Kode Diagnosa",
                    "width": 150
                }, {
                    "field": "namadiagnosa",
                    "title": "Nama Diagnosa"
                }, {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width": 150
                }, {
                    command: {
                        text: "Hapus",
                        click: $scope.removeDiagnosa
                    },
                    title: "&nbsp;",
                    width: "100px"
                }]
            }
            $scope.gridDiagnosaBaru = {
                columns: [{
                    "field": "rowNumber", title: "#", "width": 40
                }, {
                    "field": "jenisdiagnosa",
                    "title": "Jenis Diagnosis",
                    "width": 150
                }, {
                    "field": "kddiagnosa",
                    "title": "Kode Diagnosa",
                    "width": 150
                }, {
                    "field": "namadiagnosa",
                    "title": "Nama Diagnosa"
                }, {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width": 150
                }, {
                    command: {
                        text: "Hapus",
                        click: removeDiagnosaBaru
                    },
                    title: "&nbsp;",
                    width: "100px"
                }]
            }
            $scope.removeDataDiagnosisPrimer = function () {
                $scope.listInputDiagnosis = new kendo.data.DataSource({
                    data: [],
                    change: function (e) {
                        var row = e.index;
                        e.items.forEach(function (data) {
                            data.rowNumber = ++row;
                        })
                    }
                });
            }
            function removeDiagnosaBaru(e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.listInputDiagnosis.remove(selectedItem);
                // managePhp.postData(dataDel,'pasien/delete-diagnosa-pasien').then(function(e){
                //     $scope.findDiagnosaPasien()
                // })

            }
            $scope.listInputDiagnosis = new kendo.data.DataSource({
                data: [],
                change: function (e) {
                    var row = e.index;
                    e.items.forEach(function (data) {
                        data.rowNumber = ++row;
                    })
                }
            });
            $scope.addDataDiagnosisPrimer = function () {
                var listRawRequired = [
                    "item.jenisDiagnosis|k-ng-model|Jenis Diagnosa",
                    "item.diagnosisPrimer|k-ng-model|Diagnosa",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.listInputDiagnosis.add({
                        "jenisdiagnosisid": $scope.item.jenisDiagnosis.id,
                        "jenisdiagnosa": $scope.item.jenisDiagnosis.jenisdiagnosa,
                        "iddiagnosa": $scope.item.diagnosisPrimer.id,
                        "kddiagnosa": $scope.item.diagnosisPrimer.kddiagnosa,
                        "namadiagnosa": $scope.item.diagnosisPrimer.namadiagnosa,
                        "keterangan": $scope.item.keteranganDiagnosis
                    });
                    delete $scope.item.jenisDiagnosis;
                    delete $scope.item.diagnosisPrimer;
                    delete $scope.item.keteranganDiagnosis;
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            $scope.simpanDiagnosa = function () {
                if ($scope.item != undefined) {
                    if ($scope.listInputDiagnosis._data.length > 0) {

                        var saveData = {
                            'diagnosis': $scope.listInputDiagnosis._data,
                            'norec_apd': $scope.item.norec_apd,
                            'norec_pd': $scope.item.norec_pd,
                            'pegawaifk': $scope.pegawai.id
                        }

                        managePhp.postData(saveData, 'antrian/save-diagnosa-array').then(function (e) {
                            $scope.findDiagnosaPasien();
                            $scope.klikInputData();
                        }, function (error) {
                            console.log(JSON.stringify(error))
                        })
                    } else {
                        messageContainer.error('Data diagnosis belum ada');
                        return;
                    }
                } else {
                    messageContainer.error('Data belum dipilih');
                    return;
                }
            }
            $scope.editRegistrasi = function () {
                $state.go('RegistrasiPelayananRev', {
                    noCm: $scope.item.nocm
                });
                var cacheSet = $scope.item.norec_pd
                    + "~" + $scope.item.noregistrasi
                    + "~" + $scope.item.norec_apd;
                cacheHelper.set('CacheRegistrasiPasien', cacheSet);
            }
            $scope.updateKelasPelayanan = function () {
                $scope.item.updateKelas = { id: $scope.item.idkelas, namakelas: $scope.item.namakelas }
                $scope.winUpdateKelas.center().open()
            }
            $scope.simpanKelas = function () {
                var saveData = {
                    'norec_pd': $scope.item.norec_pd,
                    'norec_apd': $scope.item.norec_apd,
                    'objectkelasfk': $scope.item.updateKelas.id,
                    'tglmasuk': $scope.item.tglmasuk,
                    'objectruanganfk': $scope.item.objectruanganfk,
                }

                managePhp.postData(saveData, 'antrian/update-kelas-antrian').then(function (e) {
                    $scope.item.namakelas = $scope.item.updateKelas.namakelas
                    $scope.item.objectkelasfk = $scope.item.updateKelas.id
                    $scope.winUpdateKelas.close()
                }, function (error) {
                    console.log(JSON.stringify(error))
                })
            }
            $scope.pilihDokter = function (item, data) {
                if (data === undefined)
                    data = $scope.item;

                $scope.item = data;
                managePhp.getData("pasien/get-dokters-combos", false).then(function (data) {
                    $scope.listDokter = data.data.dokter;

                })
                // show popup untuk pilih dokter
                $scope.winDialogss.center().open();
            }
            $scope.simpanDokter = function (item, data) {
                var listRawRequired = [
                    "items.pilihDokter|k-ng-model|Dokter"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if (isValid.status) {
                    var tmpData = {
                        norec_apd: item.norec_apd,
                        iddokter: $scope.items.pilihDokter.id
                    }
                    manageSarprasPhp.updateDokters(tmpData).then(function (e) {
                        // update status antrian
                        $scope.item.pgid = $scope.items.pilihDokter.id
                        $scope.item.dokter = $scope.items.pilihDokter.namalengkap
                        $scope.items.pilihDokter = '';
                    });
                    $scope.winDialogss.close();

                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.EditPemakaianAsuransi = function () {
                managePhp.getData("registrasipasien/get-pemakaian-asuransi?noregistrasi="
                    + $scope.item.noregistrasi
                ).then(function (data) {
                    var dataPA = data.data.dataz[0];
                    $state.go('PemakaianAsuransi', {
                        norecPD: $scope.item.norec_pd,
                        norecAPD: $scope.item.norec_apd,
                    });

                    var cacheSet = dataPA.objectasuransipasienfk
                        + "~" + dataPA.norec_pa
                        + "~" + $scope.item.noregistrasi;

                    cacheHelper.set('CachePemakaianAsuransi', cacheSet);
                })
            }
            // **************END****************//
            // nameGeneric, kendoSource, isServerFiltering, top, filter, select


            if ($state.current.name === 'LaporanKonselingFind' || $state.current.name === 'PelayananIVAdmixtureFind' || $state.current.name === 'PelayananHandlingCytotoxicFind' || $state.current.name === 'PelayananTPNFind') {
                $scope.isCalling = true;
            }
            if ($scope.isCalling === true) {
                $scope.$on("kendoWidgetCreated", function (event, widget) {
                    if (widget === $scope.grid) {
                        $scope.grid.element.on('dblclick', function (e) {
                            if ($state.current.name === 'PelayananHandlingCytotoxicFind') {
                                $state.go('PelayananHandlingCytotoxicDetail', {
                                    noRec: $scope.item.pasienDaftar.noRec
                                })
                            } else if ($state.current.name === 'PelayananIVAdmixtureFind') {
                                $state.go('PelayananIVAdmixtureDetail', {
                                    noRec: $scope.item.pasienDaftar.noRec
                                })
                            } else if ($state.current.name === 'PelayananTPNFind') {
                                $state.go('PelayananTPNDetail', {
                                    noRec: $scope.item.pasienDaftar.noRec
                                })
                            } else if ($state.current.name === 'LaporanKonselingFind') {
                                $state.go('LaporanKonselingDetailCtrl', {
                                    noRec: $scope.item.pasienDaftar.noRec
                                })
                            }
                        });
                    }
                });
            };



            $scope.pemeriksaanPasien = function () {
                var cookie = document.cookie.split(';');

                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.pengkajianUtama', {
                            noCM: $scope.item.pasien.noCm,
                            tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.noRec
                        });
                    } else {
                        $state.go('dashboardpasien.pengkajianUtama', {
                            noCM: $scope.item.pasien.noCm,
                            tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.noRec
                        });
                    }
                } else {
                    window.messageContainer.error(objValid.msg);
                }
            }

            $scope.cekStatusBeforePemeriksaan = function (statusCode, statusAntrian) {
                var obj = {
                    "msg": "",
                    "status": true
                }
                switch (statusCode) {
                    case "suster":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = false;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.status = true;
                                break;
                            case "MENUNGGU":
                                obj.msg = "Pasien harus di panggil suster terlebih dahulu";
                                obj.status = false;
                                break;
                        };
                        break;
                    case "dokter":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.status = true;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.msg = "Pasien harus di panggil dokter terlebih dahulu";
                                obj.status = false;
                                break;
                            case "MENUNGGU":
                                obj.msg = "Pasien harus di panggil suster terlebih dahulu";
                                obj.status = false;
                                break;
                        };
                        break;
                }

                return obj;
            }

            $scope.cekStatusBeforePanggil = function (statusCode, statusAntrian) {
                var obj = {
                    "msg": "",
                    "status": false,
                    "statusAntrian": 0
                }

                switch (statusCode) {
                    case "suster":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = false;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.msg = "Pasien sudah di panggil suster";
                                obj.status = false;
                                break;
                            case "MENUNGGU":
                                obj.status = true;
                                obj.statusAntrian = 1;
                                break;
                        };
                        break;
                    case "dokter":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = false;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.status = true;
                                obj.statusAntrian = 2;
                                break;
                            case "MENUNGGU":
                                obj.msg = "Pasien harus di panggil suster terlebih dahulu";
                                obj.status = false;
                                break;
                        };
                        break;
                }

                return obj;
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


            // edit data registrasi pasien
            $scope.cekStatusBeforeEdit = function (statusAntrian) {
                var obj = {
                    "msg": "",
                    "status": true
                }
                debugger;
                switch (statusAntrian) {
                    case "DIPANGGIL_DOKTER":
                        obj.msg = "Pasien sudah di panggil dokter";
                        obj.status = false;
                        break;
                    case "DIPANGGIL_SUSTER":
                        obj.msg = "Pasien sudah di panggil dokter";
                        obj.status = false;
                        break;
                    case "MENUNGGU":
                        obj.status = true;
                        break;
                }
                return obj;
            }

            $scope.formatJam24 = {
                value: new Date(),			//set default value
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
            }
            $scope.toogleKlikDiagnosa = function () {
                $scope.klikDiagnosa = !$scope.klikDiagnosa;
            }




            /*
            */
        }

    ]);
});