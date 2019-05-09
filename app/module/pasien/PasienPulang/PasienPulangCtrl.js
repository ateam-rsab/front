define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PasienPulangCtrl', ['$q', '$rootScope', '$scope', '$mdDialog', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'FindPasien', 'ManagePasien',
        function($q, $rootScope, $scope,  $mdDialog, ModelItem, $state, cacheHelper, dateHelper, FindPasien, ManagePasien) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.doneLoad = $rootScope.doneLoad;
            $rootScope.isOpen = true;

            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            // $scope.item = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};

            ModelItem.get("PasienVO").then(function(data) {
                $rootScope.doneLoad = false;
                $scope.doneLoad = false;
                $scope.item = data;
                // $scope.item.tglKeluar = $scope.item.tglKeluar;
            }, function(error) {
                $rootScope.doneLoad = false;
                $scope.doneLoad = false;
                $scope.item.tglPulang = $scope.now;
                window.messageContainer.error(error);
            });

            //Begin Load Combo Box

            var arrFieldSelectVo = ['id', 'kondisiPasien'];
            $scope.kondisiKeluars = ModelItem.kendoSource("KondisiPasien", arrFieldSelectVo, false);

            // arrFieldSelectVo = ['id', 'statusKeluar'];
            // $scope.statusKeluars = ModelItem.kendoSource("StatusKeluar", arrFieldSelectVo, false);
            FindPasien.getListGeneric('StatusKeluar&select=*').then(function(e){
                $scope.statusKeluars = e.data;
                if ($scope.currentState.indexOf('Tatarekening') >= 0) {
                    // debugger;
                    $scope.item.statusKeluar = $scope.statusKeluars[0];
                    $scope.disabledStatus = true;
                }
            })

            arrFieldSelectVo = ['id', 'statusPulang'];
            $scope.statusPulangs = ModelItem.kendoSource("StatusPulang", arrFieldSelectVo, false);

            arrFieldSelectVo = ['id', 'hubunganKeluarga'];
            $scope.hubunganKeluargas = ModelItem.kendoSource("HubunganKeluarga", arrFieldSelectVo, false);

            //End
            $scope.Lanjutkan = function() {
                ModelItem.set("PasienVO", $scope.item);
                $state.go('');
            };

            $q.all([ModelItem.getDataDummyGeneric("StatusBaikTidakBaik", false),
                ModelItem.getDataDummyGeneric("StatusTempatTinggal", false),
                ModelItem.getDataDummyGeneric("KondisiPasien", false),
                ModelItem.get("RiwayatPsikososial"),
                FindPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {

                if (data[0].statResponse)
                    $scope.listStatusKesadaran = data[0];

                if (data[1].statResponse) {
                    for (var i = 0; i < data[1].length; i++) {
                        data[1][i].isChecked = false;
                    }
                    $scope.listStatusTempatTinggal = data[1];
                }

                if (data[2].statResponse) {
                    for (var i = 0; i < data[2].length; i++) {
                        data[2][i].isChecked = false;
                    }
                    $scope.listKondisiPasien = data[2];
                }

                /*if(data[2].statResponse)
                 $scope.listStatusRiwayatPsikologi = data[2];*/

                if (data[3].statResponse) {
                    $scope.item = data[3];
                    $scope.item.noRec = "";
                }
                if (data[4].statResponse) {

                    $rootScope.currentPasien = data[4].data.data;
                    $scope.item = data[4].data.data;
                    $scope.item.tglKeluar = new Date();
                    $scope.item.tglMeninggal = new Date();
                }
            });

            FindPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                // debugger;
                $scope.currentPasienNoRec = ModelItem.beforePost(data.data, true);
                // $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);
                // $scope.item.pasienDaftar = ModelItem.beforePost(data.data.pasienDaftar, true);
                // $scope.item.pasienDaftar.pasien = ModelItem.beforePost(data.data.pasien, true);
                // $scope.item.pasien.umurPasien = dateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                // $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('DD-MM-YYYY HH:mm');
                // if($scope.item.kelas.id!==undefined){
                //     $scope.cariRuangan();
                // }
                // if($scope.item.ruangan.id!==undefined){
                //     $scope.cariKamar();
                // }
                // if($scope.item.kamar.id!==undefined){
                //     $scope.cariNoBed();
                // }

                // debugger;
                $scope.kelasLoad = data.data.kelas.id;
                $scope.ruanganLoad = data.data.ruangan.id;
                $scope.kamarLoad = data.data.kamarId;
                $scope.noRecLoad = data.data.noRec;

            });
            FindPasien.getPulangMeninggal($state.params.noRec).then(function(e) {
                // debugger;
                $scope.penyebabKematian = e.data.data.listPenyebabKematian
                $scope.dokterPemeriksa = e.data.data.listDokterPemeriksa
                // debugger;
            })

            // $scope.loadKelas = function(){
            //     FindPasien.getLoadData($state.params.noRecPasienDaftar).then(function(e) {
            //         debugger;
            //         $scope.item.kelasLoad = e.data.data.atributPasien.namaKelas;
            //         $scope.item.kelasLoadId = e.data.data.atributPasien.kelasId;
            //         $scope.item.ruanganLoad = e.data.data.atributPasien.ruanganId;
            //         $scope.item.kamarLoad = e.data.data.atributPasien.kamarId;
            //         $scope.item.noRecLoad = e.data.data.atributPasien.noRec;
                    
            //     })
            // };

            FindPasien.getKelasPindah().then(function(e) {
                $scope.sourceKelas = e.data.data.listData;
            });

            $scope.ruangans = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap'); // diubah dr ruangan poliklinik ke ruangan rawat inap

            $scope.pilihRuangan = function(id) {
                var ruanganId = id;
                // debugger;
                FindPasien.getKelasByRuangan(ruanganId).then(function(e) {
                    // debugger;
                    $scope.listKelas = e.data.data.listData;
                })
                // FindPasien.findDokterDPJP(id).then(function(e){
                //     debugger;
                //     $scope.dokters = new kendo.data.DataSource({
                //         data: e.data
                //     });
                // })
            }
            
            $scope.$watch('item.kelas', function(e) {
                if (e === undefined) return;
                var kelasId = $scope.item.kelas.id;
                var ruanganId = $scope.item.ruangan.id
                FindPasien.getKamarByKelas(kelasId, ruanganId).then(function(a) {
                    // debugger;
                    // $scope.listKamar = a.data.data.listData;
                    $scope.listKamar = _.filter(a.data.data.listData, function(v) {
                        return v.qtyBed > v.jumlaKamarIsi;
                    })
                })
            });
            $scope.$watch('item.kamar', function(e) {
                if (e === undefined) return;
                var kamarId = $scope.item.kamar.id;
                FindPasien.getNoBed(kamarId).then(function(a) {
                    // $scope.listNoBed = a.data.data.listData;
                    $scope.listNoBed = _.filter(a.data.data.listData, function(v) {
                        return v.statusBed === "KOSONG";
                    })
                })
            });

            // $scope.cariRuangan = function(){
            //     var kelasId = $scope.item.kelas.id;

            //     FindPasien.getRuanganPindah(kelasId).then(function(e) {
            //         $scope.sourceRuangan = e.data.data.listData;
            //     });
            //     debugger;
            // };

            // $scope.cariKamar = function(){
            //     var ruanganId = $scope.item.ruangan.id;

            //     FindPasien.getKamarPindah(ruanganId).then(function(e) {
            //         $scope.sourceKamar = e.data.data.listData;
            //     });
            //     debugger;
            // };
            // $scope.cariNoBed = function(){
            //     var kamarId = $scope.item.kamar.id;

            //     FindPasien.getNoBedPindah(kamarId).then(function(e) {
            //         $scope.sourceNoBed = e.data.data.listData;
            //     });
            //     debugger;
            // };
            
            
            $scope.Save = function() {
                // debugger;
                if(!$scope.item.statusKeluar){
                    messageContainer.error('Status keluar belum di pilih');
                    return;
                } else if($scope.item.statusKeluar.id===2) {
                    $scope.SavePindah()
                } else {
                        var confirm = $mdDialog.confirm()
                            .title('Peringatan')
                            .textContent('Pastikan PELAYANAN sudah di Input semua ! Lanjut Simpan? ')
                            .ariaLabel('Lucky day')
                            .cancel('Tidak')
                            .ok('Ya')
                        $mdDialog.show(confirm).then(function () {
                            $scope.Simpan();
                        })
                 
                }
            }

            $scope.Simpan = function() {
                // debugger;
                var listRawRequired = [
                    "item.statusKeluar|k-ng-model|Status Keluar",
                    "item.kondisiKeluar|k-ng-model|Kondisi Keluar",
                    "item.statusPulang|k-ng-model|Status Pulang",
                    "item.tglKeluar|k-ng-model|Tanggal Keluar",
                    "item.namaPembawaPulang|ng-model|Nama pembawa pulang",
                    "item.hubunganKeluarga|k-ng-model|Hubungan keluarga"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.currentPasienNoRec.statusKeluar = $scope.item.statusKeluar;
                    $scope.currentPasienNoRec.kondisiKeluar = $scope.item.kondisiKeluar;
                    $scope.currentPasienNoRec.statusPulang = $scope.item.statusPulang;
                    $scope.currentPasienNoRec.tglKeluar = $scope.item.tglKeluar;
                    $scope.currentPasienNoRec.namaPembawaPulang = $scope.item.namaPembawaPulang;
                    $scope.currentPasienNoRec.hubunganKeluarga = $scope.item.hubunganKeluarga;
                    if($scope.item.penyebabKematian){
                        $scope.currentPasienNoRec.pasienDaftar.penyebabKematian = $scope.item.penyebabKematian
                    }
                    $scope.currentPasienNoRec.pasien.tanggalMeninggal = new Date($scope.item.tglMeninggal).getTime();
                    // console.log(JSON.stringify($scope.currentPasienNoRec));
                    ManagePasien.savePulang(ModelItem.beforePost($scope.currentPasienNoRec), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                        $scope.kajianAwal.pulang = $scope.item;
                        cacheHelper.set("kajianAwal", $scope.kajianAwal);
                        $scope.isNext = true;
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.SavePindah = function() {
                // debugger;
                // var dat = $scope.load;
                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                $scope.item.noRec = $state.params.noRec;
                $scope.item.noRecRegistrasi = $state.params.noRecRegistrasi;
                var tanggal = $scope.item.tglRencanaKeluar === undefined ? new Date() : $scope.item.tglRencanaKeluar;
                var data = {
                    tglKeluarRencana: tanggal.getTime(),
                    registrasiPelayananPasien:{
                        noRec: $scope.noRecLoad
                    },
                    kelasAwal:{
                        id: $scope.kelasLoad
                    },
                    ruanganAwal:{
                        id: $scope.ruanganLoad
                    },
                    kelasKamarAwal:{
                        id: $scope.kamarLoad
                    },
                    noBedRencana: $scope.item.nomorTempatTidur.id,
                    keteranganLainya: $scope.item.keteranganLainnya,
                    kelasRencana:{
                        id : $scope.item.kelas.id
                    },
                    ruanganRencana: {
                        id: $scope.item.ruangan.id
                    },
                    kelasKamarRencana: {
                        id: $scope.item.kamar.id
                    },
                    statusKeluarRencana: $scope.item.statusKeluar
                 }
                 if (data.kelasKamarAwal.id===undefined){
                    delete data.kelasKamarAwal
                }
                ManagePasien.savePasienPindah(ModelItem.beforePost(data)).then(function(e) {
                    $scope.kajianAwal.pulang = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.isNext = true;
                });
            }
            
            $scope.formatJam24 = {
                value: new Date(),			//set default value
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
            }
            // $scope.Save = function() {
            //     debugger;
            //     cacheHelper.set("kajianAwal", $scope.kajianAwal);
            //     $scope.item.noRec = $state.params.noRec;
            //     if ($scope.item.statusKeluar.Id === 5) {
            //         ManagePasien.savePulang(ModelItem.beforePost($scope.item), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
            //             $scope.kajianAwal.pulang = $scope.item;
            //             cacheHelper.set("kajianAwal", $scope.kajianAwal);
            //         });
            //     }
            //     if ($scope.item.statusKeluar.Id === 2){
            //         ManagePasien.savePasienPindah(ModelItem.beforePost($scope.item), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
            //             $scope.kajianAwal.pulang = $scope.item;
            //             cacheHelper.set("kajianAwal", $scope.kajianAwal);
            //         });
            //     }

            // }
        }
    ]);
});