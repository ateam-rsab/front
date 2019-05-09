define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SuratPermintaanMasukRumahSakitCtrl', ['ReportHelper', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindPasien', '$state',
        function(reportHelper, managePasien, $rootScope, $scope, ModelItem, dateHelper, findPasien, $state) {
            $scope.now = new Date();
            $rootScope.hideButtonAdd = true;
            $rootScope.doneLoad = false;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.item = {};
            $scope.item.tglMasukRuangan = new Date();
            ModelItem.getDataDummyGeneric("StatusPerawatan", false).then(function(data) {
                $scope.ListPerawatan = data;

                ModelItem.getDataDummyGeneric("CaraMasuk", false).then(function(data) {
                    $scope.ListAksesMasuk = data;
                    findPasien.getSuratPermintaanMasukRumahSakit($state.params.noRec).then(function(e) {
                        if (e.data.data.SuratPermintaanMasuk === undefined)
                            return;
                        if (e.data.data.SuratPermintaanMasuk.length !== 0) {
                            $scope.item = ModelItem.beforePost(e.data.data.SuratPermintaanMasuk[0], true);
                            /*$scope.item = e.data.data.SuratPermintaanMasuk[0];*/
                            debugger
                            for (var key in $scope.ListAksesMasuk) {
                                if ($scope.ListAksesMasuk.hasOwnProperty(key)) {
                                    var element = $scope.ListAksesMasuk[key];
                                    if (element.caraMasuk === $scope.item.caraMasuk.caraMasuk)
                                        $scope.item.caraMasuk = element;
                                }
                            }
                            $scope.isHide = true;

                        }
                    });
                    $scope.getClick = function() {
                        console.log($scope.ListAksesMasuk);
                    }

                    ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
                        $scope.ListDokterPenanggunggJawab = data;
                        $scope.ListNamaPegawai = data;
                        $scope.ListPegawai = data;
                        $scope.ListDokterPengirim = data;
                        $scope.ListRuangan = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
                        $scope.ListUnitKerja = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan');
                        $scope.ListPerawat = ModelItem.kendoHttpSource('/pegawai/get-all-perawat/?key=');
                        findPasien.getPasienDaftar($state.params.noRec).then(function(e) {
                            var data = e.data.data;
                            $scope.pasien = {
                                noRegistrasi : data.noRegistrasi,
                                noRec : data.noRec
                            }
                            $scope.item.ruanganAsal = data.ruangan;
                            $scope.item.dokterPenanggungJawab = data.dokterPenanggungJawab;
                            $scope.item.dokterPengirim = ModelItem.getPegawai();
                            if (data.ruangan.departemenId === 18)
                                $scope.item.caraMasuk = $scope.ListAksesMasuk[0];
                            if (data.ruangan.departemenId === 24)
                                $scope.item.caraMasuk = $scope.ListAksesMasuk[1];
                            if (data.ruangan.departemenId === 16)
                                $scope.item.caraMasuk = $scope.ListAksesMasuk[3];
                            $scope.item.name = data.perawatan;
                        })
                    });
                });
            });

            findPasien.getPersetujuanUmum($state.params.noCM, $state.params.tanggal).then(function(e) {
                $scope.persetujuanUmum = e.data.data.PersetujuanUmum[0];
            });


            $scope.Save = function() {
                debugger;
                var pasien = {};
                findPasien.getByNoCM($state.params.noCM).then(function(data) {
                    debugger;
                    var temp = dateHelper.toDate($state.params.tanggal);
                    $scope.item.tanggalPendaftaran = $state.params.tanggal;
                    /*$scope.item.tglMasukRuangan = $scope.item.TanggalPendaftaran;*/
                    pasien.id = data.data.data.id;
                    $scope.pasien = {
                        noRec: data.data.data.pasienDaftar.noRec,
                        noRegistrasi: data.data.data.pasienDaftar.noRegistrasi,
                    };
                    $scope.item.pasien = pasien;
                    if ($scope.item.pasienDaftar === undefined)
                        $scope.item.pasienDaftar = {};
                    $scope.item.pasienDaftar.noRec = $state.params.noRec;
                    managePasien.saveSuratPermintaanMasuk(ModelItem.beforePost($scope.item)).then(function() {
                        // $scope.cetak();
                        // if userStatus = dokter, button cetak = visible
                        $scope.isDokter = ModelItem.getStatusUser() === "dokter";
                        if($scope.isDokter){
                            $scope.isReport = true;
                            $scope.isNext = true;
                        }
                    });

                    /*managePasien.saveSuratPermintaanMasuk({                    
                        "caraMasuk": {
                            "caraMasuk": $scope.item.caraMasuk
                        },
                        "statusPerawatan": {
                            "name": $scope.item.name
                        }
                    })*/

                    /*$state.go('dashboardpasien.PengkajianMedis.Instruksi.TransferInternal', {
                        noCM: $scope.noCM,
                        tanggal: $state.params.tanggal
                    });*/
                });

            };

            $scope.isDokter = ModelItem.getStatusUser() === "dokter";
            if($scope.isDokter){
                $scope.isReport = true;
            }

            $scope.cetak = function()
            {
                console.log(JSON.stringify($scope.pasien));
                debugger;
                if($scope.pasien != undefined){
                    debugger;
                    var fixUrlLaporan = reportHelper.open("reporting/lapSPMRS?noRegistrasi="+$scope.pasien.noRec);
                    window.open(fixUrlLaporan, '_blank')
                } 
            }
        }
    ]);
});