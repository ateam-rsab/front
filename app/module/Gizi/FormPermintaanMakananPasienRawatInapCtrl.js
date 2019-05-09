/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['initialize'], function(initialize) {


    'use strict';
    initialize.controller('FormPermintaanMakananPasienRawatInapCtrl', ['$timeout', '$window', '$interval', 'SaveToWindow','ManagePasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageGizi', '$state', 'FindPasien',
        function($timeout, $window, $interval, saveToWindow, managePasien, $rootScope, $scope, ModelItem, DateHelper, manageGizi, $state, findPasien) {
            debugger;
            $scope.title = "Form Permintaan Makanan Pasien dari Ruang Rawat";
           
            $scope.item = {};   
            $scope.showTF = false;
            $scope.now = new Date();
            $scope.item.tanggalOrderGizi = new Date($scope.now);
            $scope.noAll = 1;
            $scope.data = {};
            $scope.noCM = $state.params.noCM;
            $scope.pasien = {};
            $scope.item.menuTambahan=false;
            $scope.dataModelGrid = {};
            $scope.dataVOloaded = true;

            $scope.noCM = $state.params.noCM;
            findPasien.getByNoCM($scope.noCM).then(function(data) {
                $scope.pasien= ModelItem.beforePost(data.data.data);
                debugger;
            });

            var pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            if (pegawai.ruangan !== undefined)
                $scope.validasiruangan = pegawai.ruangan.departemenId

            if ($scope.kodeRuangan === undefined) {
                window.byPassId = $state.params.id;
                $scope.kodeRuangan = $state.params.id
                $scope.namaRuangan = $state.params.nama;
            } else {
                window.byPassId = undefined;
            }
            $scope.isLoading = false;
            $interval(function() {
                $scope.tglhariIni = new Date();
            }, 1000)
            $scope.isCalling = false;
            $scope.ruangans = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan');
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
            $scope.nav = function(item) {
                $state.go('antrianPasien', { id: item.id, nama: item.namaRuangan });
            }
            if ($state.current.name === 'LaporanKonselingFind' || $state.current.name === 'PelayananIVAdmixtureFind' || $state.current.name === 'PelayananHandlingCytotoxicFind' || $state.current.name === 'PelayananTPNFind' || $state.current.name === 'dashboardpasien.InformasiIbu.findPasienTerdaftar') {
                $scope.isCalling = true;
            }
            if ($scope.isCalling === true) {
                $scope.$on("kendoWidgetCreated", function(event, widget) {
                    if (widget === $scope.grid) {
                        $scope.grid.element.on('dblclick', function(e) {
                            if ($state.current.name === 'PelayananHandlingCytotoxicFind') {
                                $state.go('PelayananHandlingCytotoxicDetail', {
                                    noRec: $scope.item.noRec
                                })
                            } else if ($state.current.name === 'PelayananIVAdmixtureFind') {
                                $state.go('PelayananIVAdmixtureDetail', {
                                    noRec: $scope.item.noRec
                                })
                            } else if ($state.current.name === 'PelayananTPNFind') {
                                $state.go('PelayananTPNDetail', {
                                    noRec: $scope.item.noRec
                                })
                            } else if ($state.current.name === 'LaporanKonselingFind') {
                                $state.go('LaporanKonselingDetailCtrl', {
                                    noRec: $scope.item.noRec
                                })
                            } else if ($state.current.name === 'dashboardpasien.InformasiIbu.findPasienTerdaftar') {
                                $rootScope.tempPasien = $scope.item;

                                $state.go('dashboardpasien.InformasiIbu', {
                                    noCM: $scope.noCM,
                                    tanggal: $state.params.tanggal,
                                    noRec: $state.params.noRec,
                                    noCmIbu: $rootScope.tempPasien.pasien.noCm,
                                    terdaftar: $rootScope.tempPasien.ruangan.id
                                });
                            }

                        });
                    }
                });
            }
            $rootScope.isOpen = true;
            $scope.from = new Date();
            $scope.until = new Date();
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
                width: "50px",
                title:  "<center><input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' />",
                template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='onCheckBoxClick($event, dataItem)' </div>"
            },{
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
                field: "jenisKelamin",
                title: "Jenis Kelamin",
                aggregates: ["count"]
            }, {
                field: "kelompokPasien",
                title: "Tipe Pembayaran",
                aggregates: ["count"]
            }, {
                field: "kelas.namaKelas",
                title: "Kelas",
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

            $scope.toggleSelectAll = function(ev) {
                var grid = $(ev.target).closest("[kendo-grid]").data("kendoGrid");
                var items = grid.dataSource.data();
                items.forEach(function(item){
                    item.selected = ev.target.checked;
                });
            };

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
            var arrFieldSelectVoPekerjaan = ['id', 'namaRuangan'];
            ModelItem.getDataDummyGeneric("Ruangan", true, undefined, 10).then(function(data) {
                $scope.ruangans = data;
            });

            $scope.findData = function() {
                $scope.isRouteLoading = true;

                if ($scope.noCm === undefined)
                    $scope.noCm = '';
                if ($scope.ruangan === undefined) {
                    if ($scope.kodeRuangan !== undefined)
                        $scope.ruangan = {
                            id: $scope.kodeRuangan
                        };
                    else
                        $scope.ruangan = {};
                }
                if ($state.params.id !== undefined) {
                    $scope.ruangan = { id: $state.params.id };
                }
                if ($scope.ruangan === undefined)
                    return;
                if ($scope.ruangan.id === undefined)
                    $scope.ruangan.id = "";
                $scope.isLoading === true
                findPasien.findQueueInap($scope.from, $scope.until, $scope.ruangan, $scope.namaPasien).then(function(e) {
                    debugger;
                    $scope.isRouteLoading = false;
                    $scope.isLoading === false
                    var data = [];
                    for (var key in e.data.data) {
                        if (e.data.data.hasOwnProperty(key)) {
                            var element = e.data.data[key];
                            if (element.kelas === undefined)
                                element.kelas = { namaKelas: "Non Kelas" };
                                $scope.ruangana = element.ruangan.id;
                            data.push(element);
                        }
                    }
                    $scope.listRuanganTujuans = _.filter(e.data.data, function(e) {
                    return e.ruangan === "36";
                });
                /*$scope.ruanganapa = $scope.listRuanganTujuan = $scope.listRuanganTujuans[0].id === "36"; */

                    $scope.listPasien = data;
                    $scope.patienGrids = new kendo.data.DataSource({
                        data: $scope.listPasien,
                        group: $scope.group
                    });
                    debugger;
                    if ($scope.kodeRuangan !== undefined) {
                            debugger;
                        // $scope.listPasien.then(function(e) {
                        $scope.listPatients = $scope.listPasien;
                        $scope.patienGrids = new kendo.data.DataSource({
                            data: $scope.listPatients,
                            group: $scope.group
                        });
                        $scope.listQueue = _.filter(_.sortBy(_.filter(e.data.data, {
                            "statusAntrian": "MENUNGGU"
                        }), function(num) {
                            return num.noAntrian * -1;
                        }), function(e, f, g, h) {
                            if (f > 4) return undefined;
                            return e;
                        });
                        $scope.listCallingUser = _.filter(_.sortBy(_.filter(e.data.data, {
                            "statusAntrian": "DIPANGGIL_SUSTER"
                        }), function(num) {
                            return num.noAntrian * -1;
                        }), function(e, f, g, h) {
                            if (f > 4) return undefined;
                            return e;
                        });

                        $scope.listCallingDoctor = _.filter(_.sortBy(_.filter(e.data.data, {
                            "statusAntrian": "DIPANGGIL_DOKTER"
                        }), function(num) {
                            return num.noAntrian * -1;
                        }), function(e, f, g, h) {
                            if (f > 4) return undefined;
                            return e;
                        });

                        $scope.listCallingDone = _.filter(_.sortBy(_.filter(e.data.data, {
                            "statusAntrian": "SELESAI_DIPERIKSA"
                        }), function(num) {
                            return num.noAntrian * -1;
                        }), function(e, f, g, h) {
                            if (f > 4) return undefined;
                            return e;
                        });
                        // var listQueue = _.filter(e.data.data, {
                        //     "statusAntrian": "DIPANGGIL_SUSTER"
                        // });
                        // $scope.sumSuster = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                        // $scope.ruanganSuster = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;
                        // listQueue = _.filter(e.data.data, {
                        //     "statusAntrian": "DIPANGGIL_DOKTER"
                        // });
                        // $scope.sumDokter = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                        // $scope.ruanganDokter = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;

                        // listQueue = _.filter(e.data.data, {
                        //     "statusAntrian": "SELESAI_DIPERIKSA"
                        // });
                        // $scope.sumSelesai = listQueue.length === 0 ? "-" : listQueue[listQueue.length - 1].noAntrian;
                        // $scope.ruanganSelesai = listQueue.length === 0 ? "" : listQueue[listQueue.length - 1].ruangan.namaRuangan;
                        // });
                    }

                });

            }

            if ($state.current.name === 'dashboardpasien.PengkajianMedis.Rencana.Order.Gizi') {
                $rootScope.showMenu = false;
                $rootScope.showMenuDetail = false;
            } else {
                $rootScope.showMenu = false;
                $rootScope.showMenuDetail = false;
            }

            $scope.pasien = {};
            findPasien.getDiagnosisaByNoRec($state.params.noRec).then(function(e) {
                $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                    data: e.data.data.DiagnosaPasien.diagnosis
                });
            });
            findPasien.getAlergiByNoCm($scope.noCM).then(function(e) {
                $scope.dataRow = new kendo.data.DataSource({
                    data: e.data.data.PapAlergi
                });
            });
            findPasien.getByNoCM($scope.noCM).then(function(data) {
                debugger;
                $rootScope.currentPasien = data.data.data;
                $scope.pasien = data.data.data;
                $scope.item.nama = $scope.pasien.namaPasien;
                $scope.data.namaPemesan = $scope.pasien.namaPasien;
                $scope.item.jenisKelamin = $scope.pasien.jenisKelamin.jenisKelamin;
                $scope.item.noCM = $scope.pasien.noCm;
                $scope.item.tglPendaftaran = DateHelper.formatDate($scope.pasien.tglDaftar);
                $scope.ruanganId = data.data.data.pasienDaftar.ruanganId;
                // $scope.item.diagnosis = $scope.pasien.diagnosis;
                // $scope.item.tipePembayaran = $scope.pasien.tipePembayaran;
                // $scope.item.kelas = $scope.pasien.kelas;
            });

            ModelItem.getDataDummyGeneric("JenisWaktu", false).then(function(data) {
                $scope.listJenisWaktu = data;
            })

            ModelItem.getDataDummyGeneric("JenisDiet", false).then(function(data) {
                $scope.listJenisDiet = data;
            })
            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listStatusYaTidak = data;
            })
            // $scope.listNamaMenu = ModelItem.kendoHttpSource('/product/find-menu-diet', true);

            findPasien.getMenuTambahan().then(function(data){
                debugger;
                $scope.listMenu = data.data.data.list;
            });

            ModelItem.getDataDummyGeneric("SatuanWaktu", false).then(function(data) {
                $scope.listFrekuensi = data;
            })
            ModelItem.getDataDummyGeneric("BentukProduk", false).then(function(data) {
                var obj34 = _.find(data, function(e) {
                        return e.id === 34;
                    });
                var obj35 = _.find(data, function(e) {
                        return e.id === 35;
                    });

                $scope.listTipeMakanan = [obj34, obj35];

            })

            $scope.dataRow = new kendo.data.DataSource({
                // data: $scope.listPatients,
                // group: $scope.group
                data: []
            });

            $scope.columnDiagnosisPrimer = [{
                "field": "jenisDiagnosis.jenisDiagnosa",
                "title": "Jenis Diagnosis",
                "width": 150
            }, {
                "field": "diagnosa.kdDiagnosa",
                "title": "Kode ICD 10",
                "width": 150
            }, {
                "field": "diagnosa.namaDiagnosa",
                "title": "ICD 10"
            }, {
                "field": "ketDiagnosis",
                "title": "Keterangan",
                "width": 150
            }];

            $scope.columnData = [{
                field: "alergi.namaAlergi",
                title: "Alergi Makanan"
            }, {
                field: "reaksi",
                title: "Reaksi"
            }, {
                field: "keteranganData",
                title: "Keterangan"
            }];
            // $scope.isNotVip = true;
            // $scope.modelKendoGrid = {};
            // findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
            //     $scope.isNotVip = data.data.kelas.id === 1 || data.data.kelas.id === 2;
            //     if ($rootScope.$$phase === null)
            //         $scope.$apply();
            // });

            $scope.dataAllRow = new kendo.data.DataSource({
                data: []
            });

            $scope.dataSelectedRow = {};
            $scope.dataMenuDiet = new kendo.data.DataSource({
                data: [{id:1}],
                pageSize : 10
            });

            $scope.mainGridOptions = {
                pageable: true,
                toolbar: "<button class='btnTemplate1' style='width:10%' ng-click='tambahTransaksi()'>Tambah Data</button>",
                scrollable:false,
                columns: [
                {
                    "field": "menuDiet",
                    "title": "<center>Nama Menu Diet</center>",
                    "width": "300px",
                    "template": "<input style='width: 100%;' kendo-combo-box k-ng-model='dataModelGrid[#: id #].namaMenu' k-on-data-bound='dataBoundJenisKemasan()' k-data-text-field=\"'namaProduk'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='listMenu' />"
                }, {
                    "field": "qty",
                    "title": "<center>Qty</center>",
                    "width": "50px",
                    "template": "<input c-text-box type='number' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].jumlah'/>"
                }, {
                    "field": "statusCito",
                    "title": "<center>Status Cito</center>",
                    "width": "100px",
                    "columns":[
                        {
                            "field": "ya",
                            "title": "<center>Ya</center>",
                            "width": "50px",
                            "template": "<div class='center'><input type=\"radio\" ng-model='val' value=1 ng-click='klik(dataItem,val)'></div>"
                        },
                        {
                            "field": "tidak",
                            "title": "<center>Tidak</center>",
                            "width": "50px",
                            "template": "<div class='center'><input type=\"radio\" ng-model='val' value=2 ng-click='klik(dataItem,val)'></div>"
                        }
                    ]
                }, {
                    title: "<center>Action</center>",
                    width: "100px",
                    template: "<div class='center'><button class='btnTemplate1' style='width:50%' ng-click='hapusTransaksi()'>Hapus</button></div>"
                }]
            };

            var noID = 1;
            $scope.tambahTransaksi = function(){
                var grid = $('#gridMenuDiet').data("kendoGrid");
                
                noID += 1;

                $scope.dataModelGrid[noID] = {};

                grid.dataSource.add({
                  id: noID
                }); 
            };

            $scope.hapusTransaksi = function()
            {
                if($scope.dataSelectedRow)
                {
                    if(this.dataItem.id != $scope.dataSelectedRow.id)
                    {
                        alert("Data Belum Dipilih !!!");
                    }
                    else
                    {
                        var grid = $('#gridMenuDiet').data("kendoGrid");
                        grid.dataSource.remove($scope.dataSelectedRow);
                        removeDataModelGrid(this.dataItem.id);
                    }
                }   
            };

            $scope.row = function(a, b, c, d, e, f, g, h, i) {
                $scope.item = angular.copy($scope.get(id));
            }

            $scope.resetAll = function() {
                $scope.data.jenisWaktu = null;
                $scope.data.namaMenu = null;
                $scope.data.tipeMakanan = null;
            }

            $scope.Save = function() {
                debugger;

                var grid = $('#gridMenuDiet').data("kendoGrid");
                $scope.dataFixMenuTambahan = {};
                $scope.dataFixMenuTambahan.data = [];
                for(var i=0; i<grid._data.length; i++)
                {
                    $scope.dataFixMenuTambahan.data.push($scope.dataModelGrid[grid._data[i].id])
                }
                if($scope.item.menuTambahan===false){
                    var tempArrDetailMenuTambahan = [];
                }else{
                    var tempArrDetailMenuTambahan = [];
                    for(var i=0; i<$scope.dataFixMenuTambahan.data.length; i++)
                    {
                        var obj = {
                            "siklusKe": "1",
                            "jenisDiet": {
                                "id": $scope.item.jenisDiet.id
                            },
                            "produk":{
                                "id": $scope.dataFixMenuTambahan.data[i].namaMenu.id
                            },   
                            "qty": $scope.dataFixMenuTambahan.data[i].jumlah,
                            "isCito": "0",
                            "kategoriProduk": {
                                "id": $scope.item.tipeMakanan.id
                            },
                            "bentukProduk": {
                                "id": $scope.item.jenisDiet.id
                            },
                            "kelas": {
                                "id": "1"
                            },
                            "jenisWaktu": {
                                "id": $scope.item.jenisWaktu.id
                            }
                           
                        }
                        tempArrDetailMenuTambahan.push(obj);
                    }
                };
               

                var tanggalOrder = DateHelper.getDateTimeFormattedNew($scope.item.tanggalOrderGizi);
                var tanggalPelayanan = DateHelper.getDateTimeFormattedNew($scope.item.tanggalOrderGizi);

                var data = {
                    "strukOrder": {
                        "tglOrder": tanggalOrder
                    },
                    "tanggalPelayanan": tanggalPelayanan,
                    "menuTambahan": tempArrDetailMenuTambahan,
                    "ruanganAsal": {
                        "id": $scope.ruanganId
                    },
                    "keteranganOrder": "1",
                    "antrianPasienDiPeriksa": {
                        "noRec": $state.params.noRec
                    },
                    "siklusGizi":{
                        "siklusKe": "1",
                        "jenisDiet": {
                            "id": $scope.item.jenisDiet.id
                        },  
                        "qty": "1",
                        "isCito": "0",
                        "kategoriProduk": {
                                "id": $scope.item.jenisDiet.id
                            },
                        "bentukProduk": {
                            "id": $scope.item.tipeMakanan.id
                        },
                        "kelas": {
                            "id": "1"
                        },
                        "jenisWaktu": {
                            "id": $scope.item.jenisWaktu.id
                        }
                    }
                }

                console.log(JSON.stringify(data));
                managePasien.saveOrderGizi(data,"registrasi-pelayanan/save-order-gizi?").then(function(e) {
                    $timeout(function () {
                        $window.location.reload();
                  }, 6000);
                })
            };

            $scope.multiple=function(){
                if($scope.item.multiple === true){
                    $scope.dataPasien = true;
                    $scope.findData();
                }else{
                    $scope.dataPasien = false;
                }
            };

            $scope.menuTambahan=function(){
                if($scope.item.menuTambahan === true){
                    $scope.DataMenuTambahan = true;
                }else{
                    $scope.DataMenuTambahan = false;
                }
            };

            $scope.listMultiple=[
                {
                    "id": 1,
                    "name": "Multiple"
                }
            ];
            $scope.listMenuTambahan=[
                {
                    "id": 1,
                    "name": "Menu Tambahan"
                }
            ];
        }
    ]);
});