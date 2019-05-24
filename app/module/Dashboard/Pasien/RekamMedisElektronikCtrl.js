define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekamMedisElektronikCtrl', ['$scope', '$timeout', 'ModelItem', 'ModelItemAkuntansi', '$state', 'CacheHelper', 'DateHelper', 'ManagePhp',
        function ($scope, $timeout, ModelItem, modelItemAkuntansi, $state, cacheHelper, dateHelper, ManagePhp) {

            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true
            $scope.isRouteLoading = false
            // menu disabled
            $scope.isShowAnamnesis = true;
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
            $scope.showAnamnesis = function () {
                $scope.isShowAnamnesis = !$scope.isShowAnamnesis;
            }
            $scope.ishShowFisikUmum = true;
            $scope.showFisikUmum = function () {
                $scope.ishShowFisikUmum = !$scope.ishShowFisikUmum;
            }
            $scope.isShowRencana = true;
            $scope.showRencana = function () {
                $scope.isShowRencana = !$scope.isShowRencana;
            }

            $scope.isShowEdukasi = true;
            $scope.showEdukasi = function () {
                $scope.isShowEdukasi = !$scope.isShowEdukasi;
            }
            $scope.isShowPerjanjian = true;
            $scope.showPerjanjian = function () {
                $scope.isShowPerjanjian = !$scope.isShowPerjanjian;
            }
            $scope.nav = function (state) {
                // debugger;
                $scope.currentState = state;
                $state.go(state, $state.params);
                console.log($scope.currentState);
            }

            $scope.findBy = "1"
            var norec_apd = ''
            var norec_pd = ''
            $scope.showTombol = false

            LoadCache();
            function LoadCache() {
                var chacePeriode = cacheHelper.get('cacheRMelektronik');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.item.noMr = chacePeriode[0]
                    $scope.item.namaPasien = chacePeriode[1]
                    $scope.item.jenisKelamin = chacePeriode[2]
                    $scope.item.noregistrasi = chacePeriode[3]
                    $scope.item.umur = chacePeriode[4]
                    $scope.item.kelompokPasien = chacePeriode[5]
                    $scope.item.tglRegistrasi = chacePeriode[6]
                    norec_apd = chacePeriode[7]
                    norec_pd = chacePeriode[8]
                    $scope.item.idKelas = chacePeriode[9]
                    $scope.item.kelas = chacePeriode[10]
                    $scope.item.idRuangan = chacePeriode[11]
                    $scope.item.namaRuangan = chacePeriode[12]
                    //if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                    //    $scope.showTombol = true
                    //}
                }
            }

            $scope.back = function () {
                $state.go('DaftarAntrianDokterRajal')
            }
            $scope.showInputDiagnosaDokter = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik');
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')
            }
            $scope.resep = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik');
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }
            $scope.inputTindakanDokter = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik')
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                $state.go('InputTindakanPelayananDokterRev', {
                    norecPD: norec_pd,
                    norecAPD: norec_apd,

                });
            }
            $scope.laboratorium = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik')
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }
            $scope.radiologi = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik')
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }
            $scope.rekamMedisElektronik = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik');
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedisElektronik')
            }
            $scope.inputCPPT = function () {
                var arrStr = cacheHelper.get('cacheRMelektronik');
                cacheHelper.set('cacheCPPT', arrStr);
                $state.go('CPPT')
            }

            $scope.gridAnamnesis = {
                toolbar: [{
                    name: "create", text: "Input Baru",
                    template: '<button ng-click="inputBaru()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah Pengkajian Awal</button>'
                },],
                pageable: true,
                scrollable: true,
                columns: [
                    {field: "tglinput", title: "<h3>Tanggal/Jam</h3>", width: 100}, 
                    {field: "namalengkap", title: "<h3>Dokter</h3>",width: 150}, 
                    {field: "namaruangan", title: "<h3>Ruangan</h3>", width: 120}, 
                    {field: "anamnesisdokter", title: "<h3>Anamnesis</h3>", width: 190},
                    {field: "pemeriksaanumum", title: "<h3>Pemeriksaan<br> Fisik Umum</h3>", widht: 190}, 
                    {field: "analisis", title: "<h3>Analisis</h3>", widht: 190}, 
                    {field: "rencana", title: "<h3>Rencana</h3>", widht: 190}, 
                    {field: "edukasi", title: "<h3>Edukasi</h3>", widht: 190}, 
                    {command: [{text: "Edit", click: editData, imageClass: "k-icon k-i-pencil"}, 
                       {text: "Hapus", click: deleteData, imageClass: "k-icon k-i-cancel"}
                      ], title: "", width: 120}
                ]
            };

            $scope.gridRiwayatAnamnesis = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Petugas",
                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "riwayatpenyakit",
                        "title": "Riwayat Penyakit",
                        "width": "300px"
                    },
                    {
                        "field": "riwayatpengobatan",
                        "title": "Riwayat Pengobatan",
                        "width": "300px"
                    }
                ]
            };


            $scope.gridFisikUmum = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Petugas",
                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "pemeriksaanumum",
                        "title": "Pemeriksaan Fisik Umum",
                        "width": "400px"
                    }
                ]
            }
            $scope.gridRencana = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Petugas",
                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "rencana",
                        "title": "Rencana",
                        "width": "400px"
                    }
                ]
            }

            $scope.gridEdukasi = {
                pageable: true,
                columns: [
                    {
                        "field": "tglinput",
                        "title": "Tgl / Jam",
                        "width": "100px"
                    }, {
                        "field": "namalengkap",
                        "title": "Petugas",
                        "width": "150px"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "150px"
                    }, {
                        "field": "edukasi",
                        "title": "Edukasi",
                        "width": "400px"
                    }
                ]
            }
            // anam
            $scope.anamnesis = {};
            function loadAnamnesis() {
                //ManagePhp.getData("rekam-medis/get-anamnesis?noregistrasifk=" + norec_apd
                ManagePhp.getData("rekam-medis/get-pengkajian-awal?nocm=" + $scope.item.noMr
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        for (let i in array) {

                        }
                        $scope.sourceAnamnesis = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }

            loadAnamnesis()
            $scope.tambahAnamnesis = function () {
                if ($scope.anamnesis.anamnesis == undefined) {
                    toastr.error('Anamnesis masih kosong')
                    return
                }
                var jsonSave = {
                    norec: $scope.anamnesis.norecAnam !== undefined ? $scope.anamnesis.norecAnam : '',
                    noregistrasifk: norec_apd,
                    anamnesisdokter: $scope.anamnesis.anamnesis,
                    anamnesissuster: null,
                    ruanganfk: $scope.item.idRuangan,
                    pegawaifk: $scope.dataLogin.id,
                    // jenisinput: 'Anamnesis',
                }
                ManagePhp.postData(jsonSave, 'rekam-medis/post-anamnesis/save').then(function (e) {
                    loadAnamnesis()
                    $scope.anamnesis = {}
                    ManagePhp.postLogging('Pengkajian Awal', 'Norec anamnesis_t',e.data.norec, 'Anamnesis').then(function (res) {
                    })
                });
            };

            $scope.klikAnamnesis = function (dataAnamnesis) {
                $scope.anamnesis.anamnesis = dataAnamnesis.anamnesisdokter
                $scope.anamnesis.norecAnam = dataAnamnesis.norec
            }

            $scope.hapusAnamnesis = function () {
                if ($scope.dataAnamnesis == undefined) {
                    toastr.error('Pilih data yg mau di hapus')
                    return
                }
                var jsonSave = {
                    norec: $scope.dataAnamnesis.norec,
                    jenisinput: $scope.dataAnamnesis.jenisinput
                }
                ManagePhp.postData(jsonSave, 'rekam-medis/post-anamnesis/delete').then(function (e) {
                    loadAnamnesis()
                    $scope.anamnesis = {}
                });
            }

            //save pengkajian awal
            //created by : IK
            //date : 01.05.2019
            loadAnamnesis()
            $scope.save = function () {
                if ($scope.item.anamnesis == undefined) {
                    toastr.error('Anamnesis masih kosong')
                    return
                }
                var jsonSave = {
                    norec: $scope.item.norec !== undefined ? $scope.item.norec : '',
                    noregistrasifk: norec_apd,
                    anamnesisdokter: $scope.item.anamnesis,
                    anamnesissuster: null,
                    ruanganfk: $scope.item.idRuangan,
                    pegawaifk: $scope.dataLogin.id,
                    pemeriksaanumum: $scope.item.pemeriksaanUmum, 
                    analisis: $scope.item.analisis,
                    rencana: $scope.item.rencana,
                    edukasi: $scope.item.edukasi,
                }
                ManagePhp.postData(jsonSave, 'rekam-medis/save-pengkajian-awal/save').then(function (e) {
                    loadAnamnesis()
                    $scope.anamnesis = {}
                    ManagePhp.postLogging('Pengkajian Awal', 'Norec anamnesis_t',e.data.norec, 'Anamnesis').then(function (res) {
                    })
                });
                $scope.popUp.close();
            };

            //popUp add Pengkajian Awal
            //created by : IK
            //date : 01.05.2019
            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if(!dataItem) {
                    toastr.warning('Data tidak ditemukan')
                    return
                }
                if($scope.dataLogin.id != dataItem.pegawaifk) {
                    toastr.warning('Tidak bisa edit data')
                    return
                }

                $scope.item.norec = dataItem.norec
                $scope.item.anamnesis = dataItem.anamnesisdokter
                $scope.item.pemeriksaanUmum = dataItem.pemeriksaanumum
                $scope.item.analisis = dataItem.analisis
                $scope.item.rencana = dataItem.rencana
                $scope.item.edukasi = dataItem.edukasi
    
                $scope.popUp.center().open();

            }

            //create by iwankasan
            function deleteData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if(!dataItem) {
                    toastr.warning('Data tidak ditemukan')
                    return
                }
                if($scope.dataLogin.id != dataItem.pegawaifk) {
                    toastr.warning('Tidak bisa hapus data')
                    return
                }
                var itemDelete = {
                    "norec" : dataItem.norec
                }

                ManagePhp.postData(itemDelete, 'rekam-medis/save-pengkajian-awal/delete').then(function (e) {
                    loadAnamnesis()
                    $scope.anamnesis = {}
                });

            }


            function clear() {
                delete $scope.item.norec
                delete $scope.item.anamnesis
                delete $scope.item.pemeriksaanUmum
                delete $scope.item.analisis
                delete $scope.item.rencana
                delete $scope.item.edukasi
            }

            $scope.inputBaru = function(e) {
                //clear(); //dokter dpt menggunakan data yg ditampilkan, bisa dimodifikasi sesuai dengan kebutuhan
                delete $scope.item.norec
                $scope.item.pemeriksaanUmum = "Keadaan umum : Sadar, tidak sesak tidak sianosis dan tidak ada nyeri."
                    + "\n" + "Tanda-tanda Vital : Baik. Kepala : Mata tidak pucat,  tidak cekung dan tidak kuning."
                    + "\n" + "Faring: tidak hiperemis. Jantung/Paru : dalam batas normal."
                    + "\n" + "Perut: lemas,  Hepar/lien tidak teraba.  Tidak ada nyeri tekan dan turgor cukup."
                    + "\n" + "Ekstremitas : akral hangat";
                
                $scope.popUp.center().open();
            }

            $scope.close = function() {
                $scope.popUp.close();
            }
            
            // riawyat anamnesis
            var timeoutPromise;
            $scope.$watch('anamnesis.cariAnamnesis', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("anamnesisdokter", newVal)
                    }
                })
            });
            $scope.$watch('anamnesis.cariPetugas', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("namalengkap", newVal)
                    }
                })
            });
            function applyFilter(filterField, filterValue) {
                var dataGrid = $("#gridRiwayatAnamnesisss").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field === filterField)
                            currentFilters.splice(i, 1);
                        break;
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            };
            $scope.resetFilter = function () {
                var dataGrid = $("#gridRiwayatAnamnesisss").data("kendoGrid");
                if (dataGrid != undefined)
                    dataGrid.dataSource.filter({});
                var dataGrid2 = $("#idRiwayatPengobatan").data("kendoGrid");
                if (dataGrid2 != undefined)
                    dataGrid2.dataSource.filter({});
                var dataGrid3 = $("#idRiwayatPemeriksaan").data("kendoGrid");
                if (dataGrid3 != undefined)
                    dataGrid3.dataSource.filter({});
                var dataGrid4 = $("#idRiwayatRencana").data("kendoGrid");
                if (dataGrid4 != undefined)
                    dataGrid4.dataSource.filter({});

                $scope.edukasi = {}
                $scope.rencana = {}
                $scope.pemriksaan = {}
                $scope.riwayat = {}
                $scope.anamnesis = {}
            }
            $scope.riwayatAnamnesis = function (data) {
                $scope.gridRiwayatAnamnesis2 = {
                    pageable: true,
                    columns: [
                        {
                            "field": "noregistrasi",
                            "title": "No Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglregistrasi",
                            "title": "Tgl Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglinput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "namalengkap",
                            "title": "Petugas",
                            "width": "150px"
                        }, {
                            "field": "namaruangan",
                            "title": "Ruangan",
                            "width": "150px"
                        }, {
                            "field": "anamnesisdokter",
                            "title": "Anamnesis",
                            "width": "300px"
                        }
                    ]
                }
                ManagePhp.getData("rekam-medis/get-anamnesis?nocm=" + $scope.item.noMr
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        $scope.sourceRiwayatAnamnesis2 = new kendo.data.DataSource({
                            data: array
                        });
                    })
                if (data == true)
                    $scope.isRiwayatAnam = true
                else
                    $scope.isRiwayatAnam = false
            }
            // emd riwayat anam
            // end anamnesis

            // riwayatpenuakit
            $scope.riwayat = {};
            function loadRiwayat() {
                ManagePhp.getData("rekam-medis/get-riwayat?noregistrasifk=" + norec_apd
                    , true).then(function (dat) {
                        let array = dat.data.data;

                        $scope.sourceRiwayatAnamnesis = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }
            loadRiwayat()
            $scope.tambahRiwayatPenyakit = function () {
                if ($scope.riwayat.riwayatPenyakit == undefined) {
                    toastr.error('Riwayat Penyakit masih kosong')
                    return
                }
                if ($scope.riwayat.riwayatPengobatan == undefined) {
                    toastr.error('Riwayat Pengobatan masih kosong')
                    return
                }
                var jsonSave = {
                    norec: $scope.riwayat.norec !== undefined ? $scope.riwayat.norec : '',
                    noregistrasifk: norec_apd,
                    riwayatpenyakit: $scope.riwayat.riwayatPenyakit,
                    riwayatpengobatan: $scope.riwayat.riwayatPengobatan,
                    ruanganfk: $scope.item.idRuangan,
                    pegawaifk: $scope.dataLogin.id,
                    jenisinput: 'Riwayat',
                }
                ManagePhp.postData(jsonSave, 'rekam-medis/post-riwayat/save').then(function (e) {
                    loadRiwayat()
                    $scope.riwayat = {}
                    ManagePhp.postLogging('Pengkajian Awal', 'Norec riwayatpengobatan_t',e.data.norec, 'Riwayat Pengobatan').then(function (res) {
                    })
                });
            };

            $scope.klikRiwayatAnamnesis = function (data) {
                $scope.riwayat.riwayatPenyakit = data.riwayatpenyakit
                $scope.riwayat.riwayatPengobatan = data.riwayatpengobatan
                $scope.riwayat.norec = data.norec
            }
            $scope.hapusRiwayatPenyakit = function () {
                if ($scope.dataRiwayatAnamnesis == undefined) {
                    toastr.error('Pilih data yg mau di hapus')
                    return
                }
                var jsonSave = {
                    norec: $scope.dataRiwayatAnamnesis.norec,
                    jenisinput: $scope.dataRiwayatAnamnesis.jenisinput
                }
                ManagePhp.postData(jsonSave, 'rekam-medis/post-riwayat/delete').then(function (e) {
                    loadRiwayat()
                    $scope.riwayat = {}
                });
            }

            // riawyat poengobaytan
            var timeoutPromise;
            $scope.$watch('riwayat.penyakit', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter2("riwayatpenyakit", newVal)
                    }
                })
            });
            $scope.$watch('riwayat.pengobatan', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter2("riwayatpengobatan", newVal)
                    }
                })
            });
            function applyFilter2(filterField, filterValue) {
                var dataGrid = $("#idRiwayatPengobatan").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field === filterField)
                            currentFilters.splice(i, 1);
                        break;
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            };

            $scope.riwayatPengobatan = function (data) {
                $scope.gridRiwayatPengobatan = {
                    pageable: true,
                    columns: [
                        {
                            "field": "noregistrasi",
                            "title": "No Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglregistrasi",
                            "title": "Tgl Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglinput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "namalengkap",
                            "title": "Petugas",
                            "width": "150px"
                        }, {
                            "field": "namaruangan",
                            "title": "Ruangan",
                            "width": "150px"
                        }, {
                            "field": "riwayatpenyakit",
                            "title": "Riwayat Penyakit",
                            "width": "300px"
                        },
                        {
                            "field": "riwayatpengobatan",
                            "title": "Riwayat Pengobatan",
                            "width": "300px"
                        }
                    ]
                }
                ManagePhp.getData("rekam-medis/get-riwayat?nocm=" + $scope.item.noMr
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        $scope.sourceRiwayatPengobatan = new kendo.data.DataSource({
                            data: array
                        });
                    })
                if (data == true) {
                    $scope.isRiwayatPengobatan = true
                    $scope.isRiwayatAnam = false
                }
                else {
                    $scope.isRiwayatAnam = false
                    $scope.isRiwayatPengobatan = false
                }


            }
            // emd riwayat poengobaytan
            // end riwayatpenuakit


            // PEMERIKSAAN UMUM
            $scope.pemriksaan = {};
            function loadPemeriksaan() {
                ManagePhp.getData("rekam-medis/get-pemeriksaanumum?noregistrasifk=" + norec_apd
                    // + "&jenisinput=" + "Pemeriksaan Umum"
                    , true).then(function (dat) {
                        let array = dat.data.data;

                        $scope.sourceFisikUmum = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }
            loadPemeriksaan()
            $scope.tambahFisik = function () {
                if ($scope.pemriksaan.pemeriksaanUmum == undefined) {
                    toastr.error('pemeriksaanUmum masih kosong')
                    return
                }

                var jsonSave = {
                    norec: $scope.pemriksaan.norec !== undefined ? $scope.pemriksaan.norec : '',
                    noregistrasifk: norec_apd,
                    pemeriksaanumum: $scope.pemriksaan.pemeriksaanUmum,
                    // keterangantambahan: null,
                    ruanganfk: $scope.item.idRuangan,
                    pegawaifk: $scope.dataLogin.id,
                    jenisinput: 'Pemeriksaan Umum',
                }
                ManagePhp.postData(jsonSave, 'rekam-medis/post-pemeriksaanumum/save').then(function (e) {
                    loadPemeriksaan()
                    $scope.pemriksaan = {}
                    ManagePhp.postLogging('Pengkajian Awal', 'Norec pemeriksaanumum_t',e.data.norec, 'Pemeriksaan Umum').then(function (res) {
                    })
                });
            };

            $scope.klikFisikUmum = function (data) {
                $scope.pemriksaan.pemeriksaanUmum = data.pemeriksaanumum
                $scope.pemriksaan.norec = data.norec
            }
            $scope.hapusFisik = function () {
                if ($scope.dataFisikUmum == undefined) {
                    toastr.error('Pilih data yg mau di hapus')
                    return
                }
                var jsonSave = {
                    norec: $scope.dataFisikUmum.norec,
                    // jenisinput: $scope.dataFisikUmum.jenisinput
                }
                ManagePhp.postData(jsonSave, 'rekam-medis/post-pemeriksaanumum/delete').then(function (e) {
                    loadPemeriksaan()
                    $scope.pemriksaan = {}
                });
            }

            //  RIWAYAT PEMERIKSAAN UMUM
            var timeoutPromise;
            $scope.$watch('pemriksaan.cariPemeriksaan', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter3("pemeriksaanumum", newVal)
                    }
                })
            });

            function applyFilter3(filterField, filterValue) {
                var dataGrid = $("#idRiwayatPemeriksaan").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field === filterField)
                            currentFilters.splice(i, 1);
                        break;
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            };

            $scope.riwayatFisik = function (data) {
                $scope.gridRiwayatPemeriksaan = {
                    pageable: true,
                    columns: [
                        {
                            "field": "noregistrasi",
                            "title": "No Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglregistrasi",
                            "title": "Tgl Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglinput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "namalengkap",
                            "title": "Petugas",
                            "width": "150px"
                        }, {
                            "field": "namaruangan",
                            "title": "Ruangan",
                            "width": "150px"
                        }, {
                            "field": "pemeriksaanumum",
                            "title": "Pemeriksaan Umum",
                            "width": "300px"
                        },

                    ]
                }
                ManagePhp.getData("rekam-medis/get-pemeriksaanumum?nocm=" + $scope.item.noMr
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        $scope.sourceRiwayatPemeriksaan = new kendo.data.DataSource({
                            data: array
                        });
                    })
                if (data == true) {
                    $scope.isRiwayatFisik = true
                }
                else {
                    $scope.isRiwayatFisik = false
                }
            }
            // emd RIWAYAT PEMERIKSAAN UMUM
            // END PEMERIKSAAN UMUM


            // RENCANA
            $scope.rencana = {};
            function loadRencana() {
                ManagePhp.getData("rekam-medis/get-rencana?noregistrasifk=" + norec_apd
                    // + "&jenisinput=" + "Rencana"
                    , true).then(function (dat) {
                        let array = dat.data.data;

                        $scope.sourceRencana = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }
            loadRencana()
            $scope.tambahRencana = function () {
                if ($scope.rencana.rencana == undefined) {
                    toastr.error('rencana masih kosong')
                    return
                }

                var jsonSave = {
                    norec: $scope.rencana.norec !== undefined ? $scope.rencana.norec : '',
                    noregistrasifk: norec_apd,
                    rencana: $scope.rencana.rencana,
                    // keterangantambahan: null,
                    ruanganfk: $scope.item.idRuangan,
                    pegawaifk: $scope.dataLogin.id,
                    jenisinput: 'Rencana',
                }
                ManagePhp.postData(jsonSave, 'rekam-medis/post-rencana/save').then(function (e) {
                    loadRencana()
                    $scope.rencana = {}
                    ManagePhp.postLogging('Pengkajian Awal', 'Norec rencana_t',e.data.norec, 'Rencana').then(function (res) {
                    })
                });
            };

            $scope.klikRencana = function (data) {
                $scope.rencana.rencana = data.rencana
                $scope.rencana.norec = data.norec
            }
            $scope.hapusRencana = function () {
                if ($scope.dataRencana == undefined) {
                    toastr.error('Pilih data yg mau di hapus')
                    return
                }
                var jsonSave = {
                    norec: $scope.dataRencana.norec,
                    jenisinput: $scope.dataRencana.jenisinput
                }
                ManagePhp.postData(jsonSave, 'rekam-medis/post-rencana/delete').then(function (e) {
                    loadRencana()
                    $scope.rencana = {}
                });
            }

            //  RIWAYAT RENCANA
            var timeoutPromise;
            $scope.$watch('rencana.cariRencana', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter4("rencana", newVal)
                    }
                })
            });

            function applyFilter4(filterField, filterValue) {
                var dataGrid = $("#idRiwayatRencana").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field === filterField)
                            currentFilters.splice(i, 1);
                        break;
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            };

            $scope.riwayatRencana = function (data) {
                $scope.gridRiwayatRencana = {
                    pageable: true,
                    columns: [
                        {
                            "field": "noregistrasi",
                            "title": "No Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglregistrasi",
                            "title": "Tgl Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglinput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "namalengkap",
                            "title": "Petugas",
                            "width": "150px"
                        }, {
                            "field": "namaruangan",
                            "title": "Ruangan",
                            "width": "150px"
                        }, {
                            "field": "rencana",
                            "title": "Rencana",
                            "width": "300px"
                        },

                    ]
                }
                ManagePhp.getData("rekam-medis/get-rencana?nocm=" + $scope.item.noMr
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        $scope.sourceRiwayatRencana = new kendo.data.DataSource({
                            data: array
                        });
                    })
                if (data == true) {
                    $scope.isRiwayatRencana = true
                }
                else {
                    $scope.isRiwayatRencana = false
                }
            }
            // emd RIWAYAT RencanaM
            // END RENCANA


            // EDUKASI
            $scope.edukasi = {};
            function loadEdukasi() {
                ManagePhp.getData("rekam-medis/get-edukasi?noregistrasifk=" + norec_apd
                    // + "&jenisinput=" + "Edukasi"
                    , true).then(function (dat) {
                        let array = dat.data.data;

                        $scope.sourceEdukasi = new kendo.data.DataSource({
                            data: array
                        });
                    })
            }
            loadEdukasi()
            $scope.tambahEdukasi = function () {
                if ($scope.edukasi.edukasi == undefined) {
                    toastr.error('edukasi masih kosong')
                    return
                }

                var jsonSave = {
                    norec: $scope.edukasi.norec !== undefined ? $scope.edukasi.norec : '',
                    noregistrasifk: norec_apd,
                    edukasi: $scope.edukasi.edukasi,
                    // keterangantambahan: null,
                    ruanganfk: $scope.item.idRuangan,
                    pegawaifk: $scope.dataLogin.id,
                    // jenisinput: 'Edukasi',
                }
                ManagePhp.postData(jsonSave, 'rekam-medis/post-edukasi/save').then(function (e) {
                    loadEdukasi()
                    $scope.edukasi = {}
                    ManagePhp.postLogging('Pengkajian Awal', 'Norec edukasi_t',e.data.norec, 'Edukasi').then(function (res) {
                    })
                });
            };

            $scope.klikEdukasi = function (data) {
                $scope.edukasi.edukasi = data.edukasi
                $scope.edukasi.norec = data.norec
            }
            $scope.hapusEdukasi = function () {
                if ($scope.dataEdukasi == undefined) {
                    toastr.error('Pilih data yg mau di hapus')
                    return
                }
                var jsonSave = {
                    norec: $scope.dataEdukasi.norec,
                    jenisinput: $scope.dataEdukasi.jenisinput
                }
                ManagePhp.postData(jsonSave, 'rekam-medis/post-edukasi/delete').then(function (e) {
                    loadEdukasi()
                    $scope.edukasi = {}
                });
            }
            //  RIWAYAT Edukasi
            var timeoutPromise;
            $scope.$watch('edukasi.cariEdukasi', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter5("edukasi", newVal)
                    }
                })
            });

            function applyFilter5(filterField, filterValue) {
                var dataGrid = $("#idRiwayatEdukasi").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field === filterField)
                            currentFilters.splice(i, 1);
                        break;
                    }
                }

                if (filterValue.id) {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            };

            $scope.riwayatEdukasi = function (data) {
                $scope.gridRiwayatEdukasi = {
                    pageable: true,
                    columns: [
                        {
                            "field": "noregistrasi",
                            "title": "No Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglregistrasi",
                            "title": "Tgl Registrasi",
                            "width": "100px"
                        },
                        {
                            "field": "tglinput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "namalengkap",
                            "title": "Petugas",
                            "width": "150px"
                        }, {
                            "field": "namaruangan",
                            "title": "Ruangan",
                            "width": "150px"
                        }, {
                            "field": "edukasi",
                            "title": "Edukasi",
                            "width": "300px"
                        },

                    ]
                }
                ManagePhp.getData("rekam-medis/get-edukasi?nocm=" + $scope.item.noMr
                    , true).then(function (dat) {
                        let array = dat.data.data;
                        $scope.sourceRiwayatEdukasi = new kendo.data.DataSource({
                            data: array
                        });
                    })
                if (data == true) {
                    $scope.isRiwayatEdu = true
                }
                else {
                    $scope.isRiwayatEdu = false
                }
            }
            // emd RIWAYAT EDUKASI
            // END EDUKASI

            $scope.batal = function () {
                $scope.edukasi = {}
                $scope.rencana = {}
                $scope.pemriksaan = {}
                $scope.riwayat = {}
                $scope.anamnesis = {}
            }

            // // PERJANJIAN
            // $scope.gridPerjanjian = {
            //     pageable: true,
            //     columns: [
            //         {
            //             "field": "noperjanjian",
            //             "title": "No Perjanjian",
            //             "width": "100px"
            //         },
            //         {
            //             "field": "tglperjanjian",
            //             "title": "Tgl Perjanjian",
            //             "width": "100px"
            //         },
            //         {
            //             "field": "namaruangan",
            //             "title": "Poliklinik",
            //             "width": "150px"
            //         }, {
            //             "field": "namalengkap",
            //             "title": "Dokter",
            //             "width": "150px"
            //         }, {
            //             "field": "keterangan",
            //             "title": "Keterangan",
            //             "width": "200px"
            //         }

            //     ]
            // }
            // $scope.perjanjian = {};
            // function loadPerjanjian() {
            //     $scope.perjanjian.tglPerjanjian = new Date();
            //     ManagePhp.getData("rekam-medis/get-combo" ).then(function (dat) {
            //         $scope.listRuangan = dat.data.ruangan
            //         $scope.listDokter = dat.data.dokter
            //     })
            //     ManagePhp.getData("rekam-medis/get-perjanjian?nocm=" + $scope.item.noMr).then(function (dat) {
            //             let array = dat.data.data;
            //             $scope.sourcePerjanjian = new kendo.data.DataSource({
            //                 data: array
            //             });
            //         })
            // }
            // loadPerjanjian()
            // $scope.tambahPerjanjian = function () {
            //     if ($scope.perjanjian.ruangan == undefined) {
            //         toastr.error('Ruangan masih kosong')
            //         return
            //     }
            //     if ($scope.perjanjian.dokter == undefined) {
            //         toastr.error('Dokter masih kosong')
            //         return
            //     }

            //     var jsonSave = {
            //         norec: $scope.perjanjian.norec !== undefined ? $scope.perjanjian.norec : '',
            //         nocm: $scope.item.noMr,
            //         objectdokterfk: $scope.perjanjian.dokter.id,
            //         tglperjanjian: moment( $scope.perjanjian.tglPerjanjian).format('YYYY-MM-DD HH:mm'),
            //         jumlahkujungan: null,
            //         keterangan: $scope.perjanjian.keteranganLainnya !== undefined ? $scope.perjanjian.keteranganLainnya : '-',
            //         objectruanganfk: $scope.perjanjian.ruangan.id,
            //     }
            //     ManagePhp.postData(jsonSave, 'rekam-medis/post-perjanjian/save').then(function (e) {
            //         loadPerjanjian()
            //         $scope.perjanjian = {}
            //          ManagePhp.postLogging('Pengkajian Awal', 'Norec pasienperjanjian_t',e.data.norec, 'Perjanjian').then(function (res) {
            //         })
            //     });
            // };

            // $scope.klikPerjanjian = function (data) {
            //     $scope.perjanjian.ruangan = { id:data.objectruanganfk, namaruangan:data.namaruangan}
            //     $scope.perjanjian.dokter = { id:data.objectdokterfk, namalengkap:data.namalengkap}
            //     $scope.perjanjian.tglPerjanjian = data.tglperjanjian
            //     $scope.perjanjian.norec = data.norec
            //     $scope.perjanjian.keteranganLainnya = data.keterangan
            // }
            // $scope.hapusPerjanjian = function () {
            //     if ($scope.dataPerjanjian == undefined) {
            //         toastr.error('Pilih data yg mau di hapus')
            //         return
            //     }
            //     var jsonSave = {
            //         norec: $scope.dataPerjanjian.norec,
            //     }
            //     ManagePhp.postData(jsonSave, 'rekam-medis/post-perjanjian/delete').then(function (e) {
            //         loadPerjanjian()
            //         $scope.perjanjian = {}
            //     });
            // }
            // // END PERJANJIAN

        }

    ]);
});