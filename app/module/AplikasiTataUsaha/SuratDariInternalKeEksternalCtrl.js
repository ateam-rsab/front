define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SuratDariInternalKeEksternalCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($q, $rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {

            $scope.item = {};
            $scope.buttonStat = true;
            var fileTypes = ['doc', 'docx']; //acceptable file types
            var files;
            if ($state.params.idDocument !== "") {
                //Ambil data Pegawai dari database 
                ManageSarpras.getOrderList("surat-masuk/get-surat-masuk-internal-eksternal-penomoran-by-no-rec/?norec=" + $state.params.idDocument).then(function(data) {
                    $scope.item = data.data.data;
                    $scope.item.tanggal = new Date(data.data.data.tglDokumen);
                    $scope.item.namaSurat = data.data.data.namaJudulDokumen;
                    $scope.item.penerimaSurat = ModelItem.getPegawai().namaLengkap;
                    $scope.item.ruanganPenerima = ModelItem.getPegawai().ruangan.namaRuangan;
                    $scope.item.ruanganPengirim = data.data.data.ruanganPengirimNamaRuangan;
                    $scope.item.idDocument = data.data.data.id;
                    var dateObj = new Date();
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
                })
            }

            $scope.$watch('item.kodeKlasifikasi', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                ManageSarpras.getOrderList('service/list-generic/?view=SubKlasifikasiArsip&select=id,kodesubklasifikasiarsip,name&criteria=klasifikasiArsipId&values=' + e.id, true).then(function(dat) {
                    $scope.item.kodeSubKlasifikasi = "";
                    $scope.listKodeSubKlasifikasi = dat.data;
                });
                buildNoSurat();
            });

            $scope.$watch('item.kodeSubKlasifikasi', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                buildNoSurat();
            });

            $scope.$watch('item.kodeUnitPengolahan', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                buildNoSurat();
            });

            function buildNoSurat() {
                if ($scope.item.kodeKlasifikasi === undefined, $scope.item.kodeSubKlasifikasi === undefined, $scope.item.kodeUnitPengolahan === undefined) {
                    return;
                }

                ManageSarpras.getOrderList('surat-masuk/get-no-surat-ke-eksternal/' +
                    '?idUnitPemrakarsa=' + $scope.item.kodeUnitPengolahan.id +
                    '&idKlasifikasiArsip=' + $scope.item.kodeKlasifikasi.id +
                    '&idSubKlasifikasiArsip=' + $scope.item.kodeSubKlasifikasi.id +
                    '&tahun=' + $scope.item.tahun, true).then(function(dat) {

                    $scope.item.nomorSurat = dat.data.data;
                    $scope.item.noSurat  = $scope.item.kodeKlasifikasi.kodeklasifikasiarsip.trim() + "." +
                        $scope.item.kodeSubKlasifikasi.kodesubklasifikasiarsip.trim() + "/" +
                        $scope.item.kodeUnitPengolahan.kodeUnitPengelolaPrakarsaSurat.trim() + "/" +
                        $scope.item.nomorSurat + "/" + $scope.item.tahun; 
                });
            }

            $q.all([
                ManageSarpras.getOrderList("service/list-generic/?view=SifatSurat&select=id,name", true),
                ManageSarpras.getOrderList("service/list-generic/?view=StatusBerkas&select=id,name", true),
                ManageSarpras.getOrderList("service/list-generic/?view=JenisArsip&select=id,name", true),
                ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=ruangan.id&values=304", true),
                ManageSarpras.getOrderList("service/list-generic/?view=KlasifikasiArsip&select=id,kodeklasifikasiarsip,name", true),
                ManageSarpras.getOrderList("service/list-generic/?view=UnitPengelolaPrakarsaSurat&select=id,kodeUnitPengelolaPrakarsaSurat,unitKerja", true),
                ManageSarpras.getOrderList("service/list-generic/?view=MetodeKirim&select=id,nama", true)

            ]).then(function(data) {
                $scope.listSifatSurat = data[0].data;
                $scope.listStatusBerkas = data[1].data;
                $scope.listJenisArsip = data[2].data;
                $scope.listPetugasKirim = data[3].data;
                $scope.listKodeKlasifikasi = data[4].data;
                $scope.listkodeUnitPengolahan = data[5].data;
                $scope.listMetodeKirim = data[6].data;
            });
            $scope.redirect = function() {
                window.location = "#/DaftarSuratEksternal";
            }

            $scope.onSelectFile = function(e) {
                $scope.selectfiledata = true;
                var tempArray = e.files[0].rawFile.name.split(".");
                files = e.files[0].rawFile;
            }

            $scope.downloadSurat = function() {
                ManageSarpras.downloadFile("surat-masuk/download-dokumen/" + $scope.item.idDocument, true);
            }

            $scope.Save = function() {
                if ($scope.item.kodeKlasifikasi === undefined,
                    $scope.item.kodeSubKlasifikasi === undefined,
                    $scope.item.kodeUnitPengolahan === undefined,
                    $scope.item.nomorSurat === undefined, 
                    $scope.item.noSurat === undefined,
                    $scope.item.sifatSurat === undefined,
                    $scope.item.statusBerkas === undefined,
                    $scope.item.jenisSurat === undefined,
                    $scope.item.jenisArsip === undefined,
                    $scope.item.jangkaWaktu === undefined,
                    $scope.item.jangka === undefined,
                    $scope.item.perihal === undefined,
                    $scope.item.lampiranPerihal === undefined,
                    $scope.item.petugasKirim === undefined,
                    $scope.item.metodeKirim === undefined,
                    $scope.item.tujuanSurat === undefined) {
                    toastr.warning("Lengkapi semua data");
                    return;
                } 
                if($scope.selectfiledata == undefined){
                    toastr.warning("File Belum dipilih !")
                }
                

                var f = files;
                {
                    var reader = new FileReader();
                    
                    var name = f.name;
                    reader.onload = function(e) {
                        var data = e.target.result;
                  
                         var paramSave = {  
                                "tglDokumen" : $scope.item.tanggal,
                                "fileName" : name,
                                "bodyFile" : btoa(data),
                                'idDokumen': $scope.item.idDocument, 
                                'tahun': $scope.item.tahun,
                                'perihal': $scope.item.perihal,
                                'perihalLampiran': $scope.item.lampiranPerihal,
                                'jangkaWaktuRange': $scope.item.jangka.name,
                                'sifatSurat': $scope.item.sifatSurat,
                                'statusBerkas': $scope.item.statusBerkas,
                                'jenisSurat': $scope.item.jenisSurat,
                                'noSurat': $scope.item.noSurat,
                                'lampiran': $scope.item.lampiranPerihal, 
                                'jenisArsip': $scope.item.jenisArsip,
                                'jangkaWaktu': $scope.item.jangkaWaktu,
                                'petugasKirim' : $scope.item.petugasKirim ,
                                'pegawaiPenerima' :  ModelItem.getPegawai() ,
                                'ruanganPenerima' :  ModelItem.getPegawai().ruangan ,
                                'metodeKirim' : $scope.item.metodeKirim ,
                                'klasifikasiArsip' : $scope.item.kodeKlasifikasi ,
                                'subKlasifikasiArsip' : $scope.item.kodeSubKlasifikasi,
                                'unitPengelolaPrakarsaSurat': $scope.item.kodeUnitPengolahan,
                                'tujuanSurat': $scope.item.tujuanSurat 
                            } 
                            ManageSarpras.saveSarpras(paramSave, "surat-masuk/save-surat-masuk-ke-external-penomoran").then(function(dat) { 
                                 $scope.buttonStat = false;
                            });
                    };

                    reader.readAsBinaryString(f);
                } 
            }


        }
    ])
})