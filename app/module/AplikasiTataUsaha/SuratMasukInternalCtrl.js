define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SuratMasukInternalCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($q, $rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.item = {};
            var fileTypes = ['doc', 'docx']; //acceptable file types
            var files;
            $scope.buttonStat = true;
            if ($state.params.idDocument !== "") {
                //Ambil data Pegawai dari database 
                ManageSarpras.getOrderList("surat-masuk/get-surat-masuk-internal-eksternal-penomoran-by-no-rec/?norec=" + $state.params.idDocument).then(function(data) {
                    $scope.item = data.data.data;
                    $scope.item.tanggal = new Date(data.data.data.tglDokumen);
                    $scope.item.namaSurat = data.data.data.namaJudulDokumen;
                    $scope.item.namaPenerima = ModelItem.getPegawai().namaLengkap;
                    $scope.item.ruanganPenerima = ModelItem.getPegawai().ruangan.namaRuangan;
                    $scope.item.ruanganPengirim = data.data.data.ruanganPengirimNamaRuangan;
                    $scope.item.idDocument = data.data.data.id;
                    var dateObj = new Date();
                    $scope.item.bulan = dateObj.getUTCMonth() + 1;
                    $scope.item.tahun = dateObj.getUTCFullYear();
                    $scope.listjangka = [{
                        'id': 1,
                        'name': 'Hari'
                    }, {
                        'id': 2,
                        'name': 'Minggu'
                    }, {
                        'id': 3,
                        'name': 'Bulan'
                    }, {
                        'id': 4,
                        'name': 'Tahun'
                    }]
                    $scope.item.ruanganTujuan = [];
                })
            }

            $scope.$watch('item.unitPemrakarsa', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;

                ManageSarpras.getOrderList('surat-masuk/get-no-surat-ke-internal/?idUnitPemrakarsa=' + e.id +
                    '&tahun=' + $scope.item.tahun + '&bulan=' + $scope.item.bulan, true).then(function(dat) {
                    $scope.item.noUrutSurat = dat.data.data;
                    $scope.item.noSurat = e.kodeUnitPengelolaPrakarsaSurat + "/" + $scope.item.noUrutSurat + "/" + $scope.item.bulan + "/" + $scope.item.tahun;
                });


            });

            $q.all([
                ManageSarpras.getOrderList("service/list-generic/?view=TipePengirimSurat&select=id,name,reportDisplay", true),
                ManageSarpras.getOrderList("service/list-generic/?view=SifatSurat&select=id,name", true),
                ManageSarpras.getOrderList("service/list-generic/?view=StatusBerkas&select=id,name", true),
                ManageSarpras.getOrderList("service/list-generic/?view=JenisSurat&select=id,name", true),
                ManageSarpras.getOrderList("service/list-generic/?view=JenisArsip&select=id,name", true),
                ManageSarpras.getOrderList("service/list-generic/?view=UnitPengelolaPrakarsaSurat&select=id,kodeUnitPengelolaPrakarsaSurat", true),
                ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true)

            ]).then(function(data) {
                $scope.TipePengirimSurat = data[0].data;
                $scope.listSifatSurat = data[1].data;
                $scope.listStatusBerkas = data[2].data;
                $scope.listJenisSurat = data[3].data;
                $scope.listJenisArsip = data[4].data;
                $scope.listUnitPemrakarsa = data[5].data;
                $scope.ListRuangan = data[6].data;
            });
            $scope.redirect = function() {
                window.location = "#/ListDaftarSuratMasuk";
            }

            $scope.onSelectFile = function(e) {
                var tempArray = e.files[0].rawFile.name.split(".");
                files = e.files[0].rawFile;
            }

            $scope.downloadSurat = function() {
                ManageSarpras.downloadFile("surat-masuk/download-dokumen/" + $scope.item.idDocument, true);
            }



            $scope.Save = function() {
            debugger
                if ($scope.item.noSurat === undefined,
                    $scope.item.sifatSurat === undefined,
                    $scope.item.statusBerkas === undefined,
                    $scope.item.jenisSurat === undefined,
                    $scope.item.jenisArsip === undefined,
                    $scope.item.jangkaWaktu === undefined,
                    $scope.item.jangka === undefined,
                    $scope.item.perihal === undefined,
                    $scope.item.lampiranPerihal === undefined,
                    $scope.item.ruanganTujuan === undefined) {
                    toastr.warning("Lengkapi semua data");
                    return;
                }

                var f = files;
                var name = "";
                if (f !== undefined) {
                    name = f.name; {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            var data = null;
                            if (e.target.result !== undefined) {
                                data = e.target.result;
                            }
                            var paramSave = {
                                'fileName': name,
                                'bodyFile': btoa(data),
                                'idDokumen': $scope.item.idDocument,
                                'bulan': $scope.item.bulan,
                                'tahun': $scope.item.tahun,
                                'perihal': $scope.item.perihal,
                                'perihalLampiran': $scope.item.lampiranPerihal,
                                'jangkaWaktuRange': $scope.item.jangka.name,
                                'sifatSurat': $scope.item.sifatSurat,
                                'statusBerkas': $scope.item.statusBerkas,
                                'jenisSurat': $scope.item.jenisSurat,
                                'noSurat': $scope.item.noSurat,
                                'lampiran': $scope.item.lampiranPerihal,
                                'ruanganTujuan': $scope.item.ruanganTujuan,
                                'jenisArsip': $scope.item.jenisArsip,
                                'jangkaWaktu': $scope.item.jangkaWaktu,
                                'unitPengelolaPrakarsaSurat': $scope.item.unitPemrakarsa
                            }
                            ManageSarpras.saveSarpras(paramSave, "surat-masuk/save-surat-masuk-ke-internal-penomoran").then(function(dat) {
                                $scope.buttonStat = false;
                            });
                        };

                        reader.readAsBinaryString(f);
                    }
                } else {
                    var paramSave2 = {
                        'idDokumen': $scope.item.idDocument,
                        'bulan': $scope.item.bulan,
                        'tahun': $scope.item.tahun,
                        'perihal': $scope.item.perihal,
                        'perihalLampiran': $scope.item.lampiranPerihal,
                        'jangkaWaktuRange': $scope.item.jangka.name,
                        'sifatSurat': $scope.item.sifatSurat,
                        'statusBerkas': $scope.item.statusBerkas,
                        'jenisSurat': $scope.item.jenisSurat,
                        'noSurat': $scope.item.noSurat,
                        'lampiran': $scope.item.lampiranPerihal,
                        'ruanganTujuan': $scope.item.ruanganTujuan,
                        'jenisArsip': $scope.item.jenisArsip,
                        'jangkaWaktu': $scope.item.jangkaWaktu,
                        'unitPengelolaPrakarsaSurat': $scope.item.unitPemrakarsa
                    }
                    ManageSarpras.saveSarpras(paramSave2, "surat-masuk/save-surat-masuk-ke-internal-penomoran").then(function(dat) {
                        $scope.buttonStat = false;
                    });
                }

            }
        }
    ]);
});