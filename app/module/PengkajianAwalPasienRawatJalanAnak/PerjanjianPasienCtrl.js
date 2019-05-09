define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PerjanjianPasienCtrl', ['$q', 'FindPasien', 'DateHelper', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state','FindPegawai','ManageSdm', 'ModelItemAkuntansi', 'ManageTataRekening','ManageKasir','CacheHelper',
        function($q, findPasien, dateHelper, managePasien, $rootScope, $scope, ModelItem, $state, findPegawai, ManageSdm, modelItemAkuntansi,ManageTataRekening,manageKasir,cacheHelper) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian  Keperawatan";
            $scope.isDisable = false;
            //indikator harap tunggu
            $scope.dataParams = JSON.parse($state.params.dataPasien);
            $scope.now = new Date();
            $scope.tomorrow = new Date($scope.now);
            $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
            $scope.item = {};
            // findPasien.getByNoCM($scope.noCM).then(function(data) {
            //     $scope.pasien = data.data.data;

            // });
            // $scope.listRuangan = ModelItem.kendoHttpSource('service/list-generic/?view=Ruangan&select=namaRuangan,id', true);
            // findPasien.getByNoRegistrasi($state.params.noRec).then(function(e) {
            //     if (e.data.ruangan.id === 20) {
            //         ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat) {
            //             $scope.ruangans = dat.data;
            //         });
            //         // $scope.ruangans = ModelItem.kendoHttpSource('/registrasi-pelayanan/search-get-all-ruangan-rehab-medik');
            //         $scope.isRehabMedik = true;
            //     }
            //     $scope.pasienDaftar = e.data;
            // });
            LoadData();
            function LoadData(){
                $q.all([
                    modelItemAkuntansi.getDataTableTransaksi("tatarekening/detail-tagihan/"+ $scope.dataParams.noRegistrasi ),
                    modelItemAkuntansi.getDataTableTransaksi("pelayanan/get-data-combo-apd")
                    ])
                .then(function(data) {

                    if (data[0].statResponse){
                        $scope.item = data[0];
                        $scope.item.tglPulang = $scope.formatTanggal($scope.item.tglPulang);
                        $scope.item.tglMasuk = $scope.formatTanggal($scope.item.tglMasuk);


                        // $scope.dataRincianTagihan = new kendo.data.DataSource({
                        //  data: data[0].details
                        // });
                    }
                    if (data[1].statResponse){
                        $scope.listDokter = data[1].dokter;
                        $scope.listRuanganDokter = data[1].ruangan;
                    }

                });
                manageKasir.getDataTableTransaksi("tatarekening/get-detail-pasien?noregistrasi="+$scope.dataParams.noRegistrasi).then(function (e) {
                    debugger;
                    $scope.dataRincianTagihan = new kendo.data.DataSource({

                        data: e.data
                    });
                })
                manageKasir.getDataTableTransaksi("tatarekening/get-data-master").then(function (e) {
                    $scope.listJenisPetugas = e.data.JenisPetugasPelaksana;
                    $scope.listPetugas = e.data.Pegawai;
                    $scope.listRuangan = e.data.Ruangan;
                })

                manageKasir.getDataTableTransaksi("laporan/get-data-combo-laporan").then(function (e) {
                    $scope.listDokters = e.data.dataDokters;
                    $scope.listRuangans = e.data.ruangan;
                })
            }
            if ($state.params.noSchedule !== undefined){
                $scope.isDisable = true;
                ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat) {
                    $scope.ruangans = dat.data;
                });
                findPasien.getInformasiPerjanjian($state.params.noSchedule).then(function(e) {
                    e.data.data.PapInstruksiPerjanjian = ModelItem.beforePost(e.data.data.PapInstruksiPerjanjian, true);
                    // var dokter = ModelItem.kendoHttpSource('/pegawai/get-pegawai-by-ruangan/' + e.data.data.PapInstruksiPerjanjian[e.data.data.PapInstruksiPerjanjian.length - 1].ruangan.id + '/' + e.data.data.PapInstruksiPerjanjian[e.data.data.PapInstruksiPerjanjian.length - 1].tglPerjanjian.getFullYear() + '/' + (e.data.data.PapInstruksiPerjanjian[e.data.data.PapInstruksiPerjanjian.length - 1].tglPerjanjian.getMonth() + 1));
                    // dokter.fetch(function(i) {
                    //     var arr = [];
                    //     for (var key in this._data) {
                    //         if (this._data.hasOwnProperty(key)) {
                    //             var element = this._data[key];
                    //             if (element.pegawai !== undefined) //&& element.pegawai.jenisPegawai.id === 1
                    //                 arr.push(element.pegawai);
                    //         }
                    //     }
                    //     // $scope.dokters = arr;
                    //     $scope.item = e.data.data.PapInstruksiPerjanjian[e.data.data.PapInstruksiPerjanjian.length - 1];
                    //     $scope.ruangans.fetch(function(r) {
                    //         for (var key in this._data) {
                    //             if (this._data.hasOwnProperty(key)) {
                    //                 var ruangan = this._data[key];
                    //                 if (ruangan.id === $scope.item.ruangan.id) {
                    //                     if ($rootScope.$$phase === null)
                    //                         $scope.$apply();
                    //                     $scope.item.ruangan = ruangan;
                    //                     for (var j in $scope.dokters) {
                    //                         if ($scope.dokters.hasOwnProperty(j)) {
                    //                             var dokter = $scope.dokters[j];
                    //                             if (dokter.id === $scope.item.dokter.id) {
                    //                                 $scope.item.dokter = dokter;

                    //                             }
                    //                         }
                    //                     }
                    //                     break;
                    //                 }
                    //             }
                    //         }
                    //     })
                //         findPasien.countAntrianReservasi($scope.item.ruangan.id, $scope.item.tglPerjanjian).then(function(e) {
                //             $scope.jumlahReservasi = e.data.data;
                //         });
                //         if ($rootScope.$$phase === null)
                //             $scope.$apply();
                //     });
                //     $scope.isRehabMedik = true;
                });
            }
            // $scope.tanggal=function(){
            //     $scope.item.ruangan ="";
            //     $scope.item.dokter = "";
            // }
           
        
            $scope.getPegawai = function(data) {
                if(data == undefined) return;
                $scope.item.dokter = undefined;
                if($scope.item.tglPerjanjian == undefined) return;
                var doctor = findPegawai.getDokterRawatJalan($scope.item.tglPerjanjian, data);
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
                })
            };
            // $scope.$watch('item.tglPerjanjian', function(e) {
            //     if (e === undefined) return;
            //     if ($scope.item === undefined) return;
            //     if ($scope.item.ruangan === undefined) return;
            //     findPasien.countAntrianReservasi($scope.pasienDaftar.pasien.id, $scope.item.tglPerjanjian).then(function(e) {
            //         $scope.jumlahReservasi = e.data.data;
            //     });
            // })
            $scope.pilihTanggal = function(){
                if($scope.item.tglPerjanjian == undefined) return;
                findPasien.countAntrianReservasi($scope.pasienDaftar.pasien.id).then(function(e) {
                    debugger;
                    $scope.jumlahReservasi = e.data.data;
                });
            }
            // ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
            //     $scope.dokters = data;
            // });
            $scope.startDate = new Date();
            $scope.endDate = new Date();
            $scope.maxEndDate = new Date();
            $scope.selectedHari = [];
            $scope.clearSearchTerm = function() {
                $scope.listJadwal = [];
                var valid = true;
                var da = new Date();

                var jum = parseInt($scope.item.jumlahKunjungan);
                if (isNaN(jum) === true)
                    jum = 0;
                var date = new Date($scope.item.tglPerjanjian.getTime());
                while (valid) {
                    var any = [];
                    for (var i = 0; i < 10; i++) {
                        date.setDate(date.getDate() + 1);
                        var any = _.filter(this.selectedHari, function(e) {
                            return e.id === (date.getDay() - 1);
                        })
                        if (any.length !== 0) {
                            break;
                        }

                    }
                    var model = { tgl: new Date(date.getTime()) };
                    $scope.listJadwal.push(model);
                    if (jum === 1)
                        valid = false;
                    jum--;
                }

            }
            $scope.$watch('selectedHari', function(e) {
                if (e === undefined) return;
            })
            $scope.limit = 0;
            $scope.listhari = [{
                id: 0,
                name: "Senin"
            }, {
                id: 1,
                name: "Selasa"
            }, {
                id: 2,
                name: "Rabu"
            }, {
                id: 3,
                name: "Kamis"
            }, {
                id: 4,
                name: "Jumat"
            }, {
                id: 5,
                name: "Sabtu"
            }]
            $scope.$watch('item.ruangan', function(e) {
                if (e === undefined)
                    return;

                // var dokter = ModelItem.kendoHttpSource('/pegawai/get-pegawai-by-ruangan/' + e.id + '/' + $scope.item.tglPerjanjian.getFullYear() + '/' + ($scope.item.tglPerjanjian.getMonth() + 1));
                // dokter.fetch(function(e) {
                //     var arr = [];
                //     for (var key in this._data) {
                //         if (this._data.hasOwnProperty(key)) {
                //             var element = this._data[key];
                //             if (element.pegawai !== undefined) //&& element.pegawai.jenisPegawai.id === 1
                //                 arr.push(element.pegawai);
                //         }
                //     }
                //     $scope.dokters = arr;

                // })
                $scope.isRehabMedik = true;
                if ($state.params.noSchedule === undefined && $state.params.noSchedule === '')
                    findPasien.getInformasi($scope.pasien.id, e.id).then(function(e) {
                        debugger;
                        if (e.data.data.jumlahKunjungan !== undefined) {
                            if (e.data.data.jumlahKunjungan !== 0) {
                                $scope.item.jumlahKunjungan = e.data.data.jumlahKunjungan;
                                $scope.limit = e.data.data.current;
                                $scope.item.informasi = "Kunjungan ke " + (e.data.data.current + 1) + " dari " + e.data.data.jumlahKunjungan
                            }
                        }
                    });
                // findPasien.countAntrianReservasi($scope.item.ruangan.id, $scope.item.tglPerjanjian).then(function(e) {
                //     $scope.jumlahReservasi = e.data.data;
                // });
            })
            if ($state.params.noSchedule === undefined || $state.params.noSchedule === '')
                // $scope.ruangans = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan');
                ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat) {
                    $scope.ruangans = dat.data;
                });

            ModelItem.getDataDummyGeneric("KasusPenyakit", true, undefined, 10).then(function(data) {
                $scope.kasusPenyakits = data;
            });
            //($scope.pasien, dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {});
            $scope.Save = function() {
                var listRawRequired = [
                    "item.tglPerjanjian|k-ng-model|Tanggal perjanjian",
                    "item.ruangan|k-ng-model|Ruangan",
                    "item.dokter|k-ng-model|Dokter",
                    // "item.jumlahKunjungan|ng-model|Jumlah kunjungan",
                    "item.keteranganLainnya|ng-model|Keterangan",
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if ($scope.isDisable === false) {
                    if(isValid.status){
                        // var tmpData = {
                        //     "statusEnabled": true,
                        //     "dokter": {
                        //         "id":$scope.item.dokter.id
                        //     },
                        //     "ruangan":{
                        //         "id": $scope.item.ruangan.id
                        //     },
                        //     "keterangan": $scope.item.keteranganLainnya,
                        //     "tglPerjanjian": dateHelper.toTimeStamp($scope.item.tglPerjanjian),
                        //     "pasien": {
                        //         "id":$scope.item.pasienID
                        //     },
                        //     "tglInput": dateHelper.toTimeStamp(new Date())
             
                        // }
             
                        // managePasien.savePerjanjian(tmpData).then(function(e) {
                        //     debugger;
                        //     if(e.status==201){
                        //         $scope.clear();
                        //         var noRec = e.data.data.norec;
                        //         $scope.cetakSurat(noRec);
                        //     }
                        // });
                        
    
        
                        var jsonSave = {
                            norec:'',
                            nocm:$scope.item.noCm,
                            objectdokterfk:$scope.item.dokter.id,
                            tglperjanjian: moment( $scope.item.tglPerjanjian).format('YYYY-MM-DD HH:mm'),
                            jumlahkujungan: null,
                            keterangan: $scope.item.keteranganLainnya !== undefined ? $scope.item.keteranganLainnya : '-',
                            objectruanganfk: $scope.item.ruangan.id
                        }
                        manageKasir.postTransaksi( 'rekam-medis/post-perjanjian/save',jsonSave).then(function (e) {
                        
                            $scope.clear();
                            var noRec = e.data.norec;
                            $scope.cetakSurat(noRec);
                            //  ManagePhp.postLogging('Pengkajian Awal', 'Norec pasienperjanjian_t',e.data.norec, 'Perjanjian').then(function (res) {
                            // })
                        });
                    } else {
                        ModelItem.showMessages(isValid.messages);
                    }
                } else {
                    $scope.item.jadwal = [];
                    var temp = ModelItem.beforePost($scope.listJadwal)
                    for (var key in $scope.listJadwal) {
                        if ($scope.listJadwal.hasOwnProperty(key)) {
                            var element = $scope.listJadwal[key];
                            $scope.item.jadwal.push(element.tgl);
                        }
                    }
                    managePasien.updatePerjanjian($scope.pasien, dateHelper.toTimeStamp($scope.pasienDaftar.tglRegistrasi), ModelItem.beforePost($scope.item), $scope.item.jadwal).then(function(e) {
                        if(e.status==201){
                            var noRec = e.data.data.norec;
                            $scope.cetakSurat(noRec);
                        }
                    });
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

            $scope.cetakSurat=function(noRec){
                $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
                var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-suratPerjanjian=1&noRec='+noRec+'&strPegawai='+$scope.dataLogin.namaLengkap+'&view=true', function(response) {
                    // do something with response
                });
            }
            $scope.cetak=function(noRec){
                $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
                var pasienID = $scope.item.pasienID;
                var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-suratPerjanjian-bypasienID=1&pasienID='+pasienID+'&strPegawai='+$scope.dataLogin.namaLengkap+'&view=true', function(response) {
                    // do something with response
                });
            }
            $scope.clear =function(){
                $scope.item.dokter="";
                $scope.item.ruangan="";
                $scope.item.keteranganLainnya="";
                $scope.item.tglPerjanjian="";
            }
            
        }
    ]);
});