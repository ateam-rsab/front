define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarAntrianPasienOperatorCtrl', ['SaveToWindow', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket', 'ManagePasien', '$mdDialog', '$window', 'CetakHelper',
        function(saveToWindow, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket, managePasien, $mdDialog, window, cetakHelper) {
            $scope.isRouteLoading = true;
            $scope.title = "ini page pencarian pasien";
            $scope.kodeRuangan = $state.params.kodeRuangan;
            $scope.isCalling = false;
            $scope.pegawai = ModelItem.getPegawai();
            // nameGeneric, kendoSource, isServerFiltering, top, filter, select
            ModelItem.getDataDummyGeneric("JenisDiagnosa", false, false, 10).then(function(data) {
                $scope.sourceJenisDiagnosisPrimer = data;
            });
            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                $scope.sourceDiagnosisPrimer = data;
            });
            $scope.items= {};
            if ($state.current.name === 'LaporanKonselingFind' || $state.current.name === 'PelayananIVAdmixtureFind' || $state.current.name === 'PelayananHandlingCytotoxicFind' || $state.current.name === 'PelayananTPNFind') {
                $scope.isCalling = true;
            }
            if ($scope.isCalling === true) {
                $scope.$on("kendoWidgetCreated", function(event, widget) {
                    if (widget === $scope.grid) {
                        $scope.grid.element.on('dblclick', function(e) {
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
            $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            $scope.now = new Date();
            $scope.from = new Date();
            $scope.until = new Date();
            $scope.ruangans = ModelItem.kendoHttpSource('/ruangan/get-all-ruangan-operator');
            $scope.ruangans.fetch(function() {
                var data = [];
                for (var key in this._data) {
                    if (this._data.hasOwnProperty(key)) {
                        var element = this._data[key];
                        if (element.departemenId !== undefined) {
                            if (element.departemenId === 18)
                                element.group = "Poliklinik";
                            else
                                element.group = "Penunjang";
                            data.push(element);
                        }
                    }
                }
                debugger;
                var temp = [];
                for (var key in _.groupBy(data, 'group')) {
                    if (_.groupBy(data, 'group').hasOwnProperty(key)) {
                        var element = _.groupBy(data, 'group')[key];
                        temp.push({ key: key, items: element });
                    }
                }
                $scope.ruangansLocal = temp;

                $scope.$apply();
            });
            $scope.group = {
                field: "ruangan.namaRuangan",
                aggregates: [{
                    field: "pasien",
                    aggregate: "count"
                }, {
                    field: "ruangan.namaRuangan",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [{
                field: "pasien",
                aggregate: "count"
            }, {
                field: "ruangan.namaRuangan",
                aggregate: "count"
            }]
            $scope.Column = [{
                field: "noAntrian",
                title: "No.",
                width: 50,
                aggregates: ["count"]
            }, {
                field: "pasien.namaPasien",
                title: "Nama Pasien",
                aggregates: ["count"]
            }, {
                field: "pasien.noCm",
                title: "No. Rekam Medis",
                aggregates: ["count"]
            }, {
                field: "pasien.umur",
                title: "Umur",
                aggregates: ["count"]
            }, {
                field: "dokter",
                title: "Dokter",
                aggregates: ["count"]
            }, {
                field: "pasienDaftar.tglRegistrasi",
                title: "Tgl Registrasi",
                template: "#= new moment(new Date(pasienDaftar.tglRegistrasi)).format('DD-MM-YYYY HH:mm') #",
                aggregates: ["count"]
            }, {
                field: "pasienDaftar.noRegistrasi",
                title: "No Registrasi",
                aggregates: ["count"]
            }, {
                field: "jenisKelamin",
                title: "Jenis Kelamin",
                aggregates: ["count"]
            }, {
                field: "kelompokPasien",
                title: "Tipe Pembayaran",
                aggregates: ["count"]
            }, {
                field: "statusAntrian",
                title: "Status",
                aggregates: ["count"]
            }, {
                hidden: true,
                field: "ruangan.namaRuangan",
                title: "Nama Ruangan",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
            }];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
            var arrFieldSelectVoPekerjaan = ['id', 'namaRuangan'];
            // ModelItem.getDataDummyGeneric("Ruangan", true, undefined, 10).then(function(data) {
            //     $scope.ruangans = data;
            // });

            $scope.findData = function() {
                $scope.isRouteLoading = true;
                if($scope.ruangan) $scope.ruangan = $scope.ruangan.id;
                findPasien.findQueueSemua($scope.from, $scope.until, $scope.noRekamMedis, $scope.ruangan).then(function(e) {
                    if (e.data.data !== null) {
                        var data = [];
                        for (var key in e.data.data.listData) {
                            if (e.data.data.listData.hasOwnProperty(key)) {     
                                var element = e.data.data.listData[key];
                                var tglRegistrasi = new moment(element.pasienDaftar.tglRegistrasi).format('DD-MM-YYYY');
                                if (element.pasienDaftar.noRegistrasi === undefined)
                                    element.pasienDaftar.noRegistrasi = {
                                        namaExternal: '-'
                                    }
                            }
                        }

                        var data = [];
                        for (var key in e.data.data.listData) {
                            if (e.data.data.listData.hasOwnProperty(key)) {
                                var element = e.data.data.listData[key];
                                data.push(element);
                            }
                        }
                        $scope.listPasien = data;
                        $scope.patienGrids = new kendo.data.DataSource({
                            data: $scope.listPasien,
                            group: $scope.group
                        });

                        if ($scope.kodeRuangan !== undefined) {
                            $scope.listPasien.then(function(e) {
                                $scope.listPatients = e.data.data.listData;
                                $scope.patienGrids = new kendo.data.DataSource({
                                    data: $scope.listPatients,
                                    group: $scope.group
                                });
                                var listQueue = _.filter(e.data.data.listData, {
                                    "statusAntrian": "MENUNGGU"
                                });
                                $scope.sumMenunggu = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                                $scope.ruanganMenunggu = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;

                                listQueue = _.filter(e.data.data.listData, {
                                    "statusAntrian": "DIPANGGIL_SUSTER"
                                });
                                $scope.sumSuster = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                                $scope.ruanganSuster = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;
                                listQueue = _.filter(e.data.data.listData, {
                                    "statusAntrian": "DIPANGGIL_DOKTER"
                                });
                                $scope.sumDokter = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                                $scope.ruanganDokter = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;

                                listQueue = _.filter(e.data.data.listData, {
                                    "statusAntrian": "SELESAI_DIPERIKSA"
                                });
                                $scope.sumSelesai = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                                $scope.ruanganSelesai = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;
                            });

                        }
                        $scope.isRouteLoading = false;
                    } else {
                        $scope.isRouteLoading = false;
                    }
                });

            }
            $scope.findData();
            // socket.on('DaftarAntrian', function(data) {
            //     $scope.findData();
            // });
            // $scope.detailBilling = function() {
            //     $state.go('BillingPasien', {
            //         noPendaftaran: $scope.item.pasienDaftar.noRegistrasi
            //     });
            // }

            // $scope.susterClick = function() {

            //     $state.go('dashboardpasien.pengkajianUtama', {
            //         noCM: $scope.item.pasien.noCm,
            //         tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD hh:mm:ss,SSS')
            //     });
            // }
            // $scope.detailOrder = function() {
            //     $state.go('ResepElektronikDetail', { noOrder: $scope.item.pasienDaftar.noRegistrasi });
            // }
            // $scope.monitoring = function() {
            //     $state.go('MonitoringPasien', { noCm: $scope.item.pasien.noCm });
            // }

            // $scope.masukPasien = function(data) {
            //     $scope.isRouteLoading = true;

            //     if (data === undefined)
            //         data = $scope.item;
            //     var statusCode = ModelItem.getStatusUser()
            //     var statusAntrian = 0;

            //     var objValid = $scope.cekStatusBeforePanggil(statusCode, $scope.item.statusAntrian);

            //     if (objValid.status) {
            //         $scope.item = data;

            //         socket.emit('DaftarAntrian' + data.ruangan.id, "asdasdsad", function(a, b, c, d, e, f) {})
            //         managePasien.updateStatusAntrian(data.noRec, objValid.statusAntrian).then(function() {
            //             if (statusCode === 'suster')
            //                 $scope.item.statusAntrian = "DIPANGGIL_SUSTER";
            //             else
            //                 $scope.item.statusAntrian = "DIPANGGIL_DOKTER";
            //             $scope.isRouteLoading = false;
            //             //$scope.findData();
            //         });
            //     } else {
            //         $scope.isRouteLoading = false;
            //         window.messageContainer.error(objValid.msg);
            //     }
            // }


            $scope.pemeriksaanPasien = function() {
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

            $scope.cekStatusBeforePemeriksaan = function(statusCode, statusAntrian) {
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

            $scope.cekStatusBeforePanggil = function(statusCode, statusAntrian) {
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

            //  $scope.batal = function() {
            //     $scope.showAlert();
            //  }
            // $("#confirmBtn").on("click", function () {
            //     window.myconfirm("Anda Yakin akan membatalkan pasien?").then(function () {
            //       window.myalert("Operation done!");
            //     }, function () {
            //       window.myalert("You chose to Cancel action.");
            //     });
            // });
            // function myconfirm(content){
            //     return $("<div></div>").kendoConfirm({
            //       title: "My Title",
            //       content: content
            //     }).data("kendoConfirm").open().result;
            // }
            $scope.batalPeriksa = function() {
                if ($scope.item.statusAntrian === "MENUNGGU") {
                    if ($scope.item !== undefined && $scope.item.pasienDaftar !== undefined) {
                        debugger;
                        findPasien.getListData('service/list-generic/?view=Pembatal&select=*').then(function(e){
                            $scope.listPembatalan = e.data;
                        })
                        $scope.listRuangan = [];
                        $scope.listRuangan.push($scope.item.ruangan);
                        $scope.items.ruangan = $scope.listRuangan[0];
                        // $scope.item.pasienDaftar.tglRegistrasi = dateHelper.formatDate($scope.item.pasienDaftar.tglRegistrasi, 'DD-MM-YYYY');
                        $scope.winDialog.center().open();
                    } else {
                        window.messageContainer.error('Pasien belum di pilih');
                    }
                } else {
                    messageContainer.error('Pasien sudah diperiksa')
                }
            }
            $scope.lanjutBatal = function(data, batal) {
                 var listRawRequired = [
                    "items.pembatalan|k-ng-model|Pembatalan",
                    "items.alasanBatal|ng-model|Alasan pembatalan"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    debugger;
                    var pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
                    var tmpData = {  
                        "tanggalPembatalan":dateHelper.formatDate(new Date(), 'YYYY-MM-DD'),
                        "alasanPembatalan":batal.alasanBatal,
                        "pasienDaftar":{  
                            "noRec": data.pasienDaftar.noRec
                        },
                        "pegawai":{  
                            "id": pegawai.id
                        },
                        "pembatalan":{  
                            "id":batal.pembatalan.id
                        }
                    }
                    var grid = $("#grid").data('kendoGrid');
                    grid._data.forEach(function(items){
                        if (items.noRec === data.noRec){
                            // delete selected grid row 
                            grid.dataSource.remove(items);
                            grid.dataSource.sync();
                        }
                    })
                    // console.log(JSON.stringify(tmpData));
                    managePasien.batalPeriksa(tmpData).then(function(e){
                        $scope.items = {};
                        $scope.winDialog.close();
                    })
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
                // var raw = $scope.patienGrids.data();
                // raw.forEach(function(item){
                //     if (item.pasien.id === id){
                //         raw.remove(item);
                //         $scope.item = {};
                //         $scope.winDialog.close();
                //         //TODO call remote service to delete item....
                //     }
                // })
            }
            $scope.CetakSumList = function() {
                if($scope.item != undefined){
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapResume?noCm=" + $scope.item.pasien.noCm + "&tglRegistrasi=" + new moment($scope.item.pasienDaftar.tglRegistrasi).format('DD-MM-YYYY'));
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-summarylist=1&norec=' + $scope.item.pasien.noCm + '&view=false', function(response) {
                        // do something with response
                    });


                }
            }
            $scope.cetakBuktiLayanan = function() {
                if($scope.item != undefined){
                    debugger;
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapBuktiPelayanan?noRegistrasi=" + $scope.item.pasienDaftar.noRegistrasi);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')
                    //cetakan langsung service VB6 by grh
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&strIdPegawai=' + $scope.pegawai.id + '&view=false', function(response) {
                       debugger;
                    });

                }
            }
            $scope.cetakGelang = function() {
                if($scope.item != undefined){
                    var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/gelangPasien?id=" + $scope.item.pasien.id);
                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
            }
            $scope.tracerBon = function() {
                if($scope.item != undefined){
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapTracer?noRegistrasi=" + $scope.item.pasienDaftar.noRegistrasi);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')
                    
                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-tracer=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&view=false', function(response) {
                        // do something with response
                    });            


                }
            }
            $scope.formatNum = {
                format: "#.#",
                decimals: 0
            }
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
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    var qty = data.qty;
                    if(qty !== undefined){
                        // var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $scope.item.pasienDaftar.noRegistrasi + "&qty=" + qty);
                        // window.open(fixUrlLaporan, '', 'width=800,height=600')
                        //cetakan langsung service VB6 by grh
                        var client = new HttpClient();
                        client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-labelpasien=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&view=false&qty=' + qty, function(response) {
                            // do something with response
                        });

                    }
                    $scope.dialogCetakLabel.close();
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };
            $scope.cetakNoAntrian = function() {
                if($scope.item != undefined){
                    debugger; 
                    // var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + $scope.item.noRec);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')
                    //cetakan langsung service VB 6 by grh   
                    var client = new HttpClient();
                                
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktipendaftaran=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&view=false', function(response) {
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
            // $scope.sourceJenisDiagnosisPrimer = [{
            //     "statusEnabled": true,
            //     "namaExternal": "Diagnosa Awal",
            //     "kdProfile": 0,
            //     "qJenisDiagnosa": 5,
            //     "reportDisplay": "Diagnosa Pasca Bedah",
            //     "jenisDiagnosa": "Diagnosa Awal",
            //     "id": 5,
            //     "kodeExternal": "05",
            //     "kdJenisDiagnosa": 5,
            //     "noRec": "5                               "
            // }]
            $scope.openCetakRmk = function(){
                if($scope.item != undefined){
                    findPasien.getDiagnosaNyNoRec($scope.item.noRec).then(function(e){
                        if (e.data.data.DiagnosaPasien.length > 0) {
                            $scope.cetakBro();
                        } else {
                            $scope.item.jenisDiagnosis = $scope.sourceJenisDiagnosisPrimer[4];
                            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
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
            $scope.cetakRMK = function() {
                var listRawRequired = [
                    "item.diagnosisPrimer|k-ng-model|Diagnosa awal"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    if($scope.item != undefined){
                        var saveData = {
                            pasien: {
                                id: $scope.item.pasien.id
                            },
                            tanggalPendaftaran: $scope.item.pasienDaftar.tglRegistrasi,
                            diagnosis: [{
                                diagnosa: {
                                    id: $scope.item.diagnosisPrimer.id
                                },
                                jenisDiagnosa: $scope.item.jenisDiagnosis,
                                keterangan: $scope.item.keteranganDiagnosis
                            }],
                            noRecPasienDaftar: $scope.item.noRec
                        }
                        // console.log(JSON.stringify(saveData));
                        managePasien.saveDiagnosaRmk(saveData).then(function(e){
                            $scope.icd10.close();
                            $scope.cetakBro();
                            // var fixUrlLaporan = cetakHelper.open("reporting/lapRingkasanKeluarMasuk?noRegistrasi=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
                            // window.open(fixUrlLaporan, '', 'width=800,height=600')

                            // var client = new HttpClient();
                            // client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar-byNorec=1&norec=' + $scope.item.noRec + '&view=false', function(response) {
                            //         // do something with response
                            // });

                            // var client = new HttpClient();
                            // client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&view=false', function(response) {
                            //     // do something with response
                            // }); 
                        })
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
                
            }
            $scope.cetakBro = function(){
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar-byNorec=1&norec=' + $scope.item.noRec + '&view=false', function(response) {
                        // do something with response
                });
            }
            // //*cetak SEP
            // $scope.CetakSEP = function() {
            //     if($scope.item != undefined){
            //         var fixUrlLaporan = cetakHelper.open("asuransi/asuransiBPJS?noSep=" + $scope.model.noSep);
            //         window.open(fixUrlLaporan, '_blank')
            //     }
            // }

            $scope.inputTindakan = function(){
                if ($scope.item){
                    $state.go('dashboardpasien.InputBilling',{
                        noAntrianPasien: $scope.item.noRec,
                        noRegister: $scope.item.pasienDaftar.noRec,
                        noRec: $scope.item.noRec   
                    });
                } else {
                    messageContainer.error('Pasien belum di pilih')
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

            $scope.cetakSEP = function() {
                if($scope.item != undefined && $scope.item.kelompokPasien !== "Umum/Pribadi"){
                    // var noSep = e.data.data === null ? "2423432" : e.data.data;
                    // var fixUrlLaporan = cetakHelper.open("asuransi/asuransiBPJS?noSep=" + $scope.model.noSep);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep=1&norec=1708000087&view=true   
                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&view=false', function(response) {
                        // do something with response
                    });
                }
            }

            // edit data registrasi pasien
            $scope.cekStatusBeforeEdit = function(statusAntrian){
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
            $scope.editRegistrasi = function(){
                // var objValid = $scope.cekStatusBeforeEdit($scope.item.statusAntrian);
                // if (objValid.status) {
                    $state.go('editRegistrasiPelayanan', {
                        noCm: $scope.item.pasien.noCm,
                        noRec: $scope.item.pasienDaftar.noRec
                    });
                // } else {
                //     window.messageContainer.error(objValid.msg);
                // }
            }
            $scope.formatJam24 = {
                value: new Date(),			//set default value
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
            }
            $scope.toogleKlikDiagnosa = function(){
                $scope.klikDiagnosa = !$scope.klikDiagnosa;
            }
            $scope.findDiagnosaPasien = function(){
                $scope.currentNorec = $scope.item.noRec;
                findPasien.getDiagnosaNyNoRec($scope.currentNorec).then(function(data) {
                    if (data.data.data.DiagnosaPasien === undefined) return;
                    if (data.data.data.DiagnosaPasien.length === 0) return;
                    $scope.listDiagnosa = ModelItem.beforePost(data.data.data.DiagnosaPasien[data.data.data.DiagnosaPasien.length - 1].diagnosis, true);
                    // $scope.item.noRec = data.data.data.DiagnosaPasien[0].noRec;
                    var temp = [];
                    var i = 1;
                    for (var key in $scope.listDiagnosa) {
                        if ($scope.listDiagnosa.hasOwnProperty(key)) {
                            var element = $scope.listDiagnosa[key];
                            temp.push({
                                jenisDiagnosis: element.jenisDiagnosa,
                                kdDiagnosa: element.diagnosa.kdDiagnosa,
                                namaDiagnosa: element.diagnosa.namaDiagnosa,
                                id: element.diagnosa.id,
                                // no: i
                            });
                            i++;
                        }
                    }
                    $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                        data: temp,
                        change: function(e) {
                            var row = 0;
                            e.items.forEach(function(data){
                                data.rowNumber = ++row;
                            })
                        }
                    });
                });
            }
            $scope.inputDiagnosa = function(){
                if($scope.item != undefined){
                    $scope.item.pasienDaftar.tglRegistrasi = new Date($scope.item.pasienDaftar.tglRegistrasi);
                    $scope.findDiagnosaPasien();
                    $scope.isLoadingDiagnosis = false;
                    $scope.findBy = 0;
                    $scope.toogleKlikDiagnosa();
                    // $scope.item.jenisDiagnosis = $scope.sourceJenisDiagnosisPrimer[0];
                    // ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                    //     $scope.sourceDiagnosisPrimer = data;
                    // });
                    // $scope.WinInputDiagnosa.center().open();
                }
            }
            $scope.removeDiagnosa = function(e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.dataDiagnosisPrimer.remove(selectedItem);
            }
            $scope.klikInputData = function(){
                $scope.inputDataDiagnosis = !$scope.inputDataDiagnosis;
            }
            $scope.gridDiagnosa = {
                columns: [{
                    "field": "rowNumber", title: "#", "width": 40
                }, {
                    "field": "jenisDiagnosis.jenisDiagnosa",
                    "title": "Jenis Diagnosis",
                    "width": 150
                }, {
                    "field": "kdDiagnosa",
                    "title": "Kode Diagnosa",
                    "width": 150
                }, {
                    "field": "namaDiagnosa",
                    "title": "Nama Diagnosa"
                }, {
                    "field": "ketDiagnosis",
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
                    "field": "jenisDiagnosis.jenisDiagnosa",
                    "title": "Jenis Diagnosis",
                    "width": 150
                }, {
                    "field": "diagnosisPrimer.kdDiagnosa",
                    "title": "Kode Diagnosa",
                    "width": 150
                }, {
                    "field": "diagnosisPrimer.namaDiagnosa",
                    "title": "Nama Diagnosa"
                }, {
                    "field": "ketDiagnosis",
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
            $scope.listInputDiagnosis = new kendo.data.DataSource({
                data: [],
                change: function(e) {
                    var row = e.index;
                    e.items.forEach(function(data){
                        data.rowNumber = ++row;
                    })
                }
            });
            $scope.addDataDiagnosisPrimer = function(){
                var listRawRequired = [
                    "item.jenisDiagnosis|k-ng-model|Jenis Diagnosa",
                    "item.diagnosisPrimer|k-ng-model|Diagnosa",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.listInputDiagnosis.add({
                        "jenisDiagnosis" : $scope.item.jenisDiagnosis,
                        "diagnosisPrimer" : $scope.item.diagnosisPrimer,
                        "ketDiagnosis" : $scope.item.keteranganDiagnosis
                    });
                    delete $scope.item.jenisDiagnosis;
                    delete $scope.item.diagnosisPrimer;
                    delete $scope.item.keteranganDiagnosis;
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.simpanDiagnosa = function(){
                if($scope.item != undefined){
                    if ($scope.listInputDiagnosis._data.length >0){
                        var dataDiagnosis = [];
                        $scope.listInputDiagnosis._data.forEach(function(elemen){
                            dataDiagnosis.push({
                                diagnosa: {
                                    id: elemen.diagnosisPrimer.id
                                },
                                jenisDiagnosa: elemen.jenisDiagnosis,
                                keterangan: elemen.ketDiagnosis
                            })
                        });
                        var saveData = {
                            pasien: {
                                id: $scope.item.pasien.id
                            },
                            tanggalPendaftaran: $scope.item.pasienDaftar.tglRegistrasi,
                            // diagnosis: [{
                            //     diagnosa: {
                            //         id: $scope.item.diagnosisPrimer.id
                            //     },
                            //     jenisDiagnosa: $scope.item.jenisDiagnosis
                            // }],
                            diagnosis: dataDiagnosis,
                            noRecPasienDaftar: $scope.item.noRec
                        }
                        // console.log(JSON.stringify(saveData));
                        managePasien.saveDiagnosaRmk(saveData).then(function(e){
                            // $scope.WinInputDiagnosa.close();
                            $scope.findDiagnosaPasien();
                            $scope.klikInputData();
                        }, function(error){
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
            $scope.updateKelasPelayanan = function(){
                if ($scope.item) {
                    $state.go('editKelasPelayanan', {
                        noCm: $scope.item.pasien.noCm,
                        noRec: $scope.item.pasienDaftar.noRec
                    });
                }
            }
        }

    ]);
});