define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('FormulirTransferPasienInternalCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'ManageSdm', 'FindPasien', 'DateHelper',
        function($rootScope, $scope, $state, ModelItem, ManageSdm, FindPasien, dateHelper) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.item.tglMasuk = new Date();
            $scope.item.tglPindah = new Date();
            $scope.item.noRec = $state.params.noRec;
            debugger;
            $scope.item.tanggalPendaftaran = $scope.now;
            $scope.listPerlu = [{"id": 1, "name":"Alergi"},{"id":2, "name":"MRSA"}];
            $scope.listAlasanPemindahan = [{"id":1, "name":"Kondisi Pasien"},{"id":2, "name":"Fasilitas"},{"id":3, "name":"Tenaga"},{"id":4, "name": "Lain-lain"}];
            $scope.listMetodePemindahan = [{"id":1, "name": "Kursi Roda"},{"id":2, "name": "Brankar"},{"id":3, "name": "Tempat Tidur"}];
            $scope.listYaTidak = [{"id":1,"name":"Ya"},{"id":2, "name":"Tidak"}];
            $scope.listPeralatan = [{
            	"id": 1,
            	"name": "Oksigen"
            },
            {
            	"id": 2,
            	"name": "Kateter Urin"
            },
            {
            	"id": 3,
            	"name": "Alat Penghisap"
            },
            {
            	"id": 4,
            	"name": "Valve Mask Bag"
            },
            {
            	"id": 5,
            	"name": "Sonde Lambung"
            },
            {
            	"id": 6,
            	"name": "Ventilator"
            },
            {
            	"id": 7,
            	"name": "Pompainfus"
            }];
            $scope.listRisiko = [{
                "id": 1,
                "name": "Risiko Rendah"
            }, {
                "id": 2,
                "name": "Risiko Sedang"
            }, {
                "id": 3,
                "name": "Tidak Berisiko"
            }, {
                "id": 4,
                "name": "Risiko Tinggi"
            }];
            FindPasien.getByNoRegistrasi($scope.item.noRec).then(function(dat) {
                $scope.listData = dat.data;
                $scope.item.tglRegistrasi = dateHelper.formatDate(dat.data.tglRegistrasi, "YYYY-MM-DD");
                debugger;
            });
            $scope.listJenisNyeri = [{"id":1,"name":"Akut"},{"id":2, "name":"Kronik"}];
            $scope.listStatusPsikologis = [{"id":1,"name":"Marah"},{"id":2, "name":"Depresi"},{"id":3,"name":"Takut"},{"id":4, "name":"Gelisah"},{"id":1,"name":"Psikotik"},{"id":4, "name":"Cemas"},{"id":5,"name":"Kecenderungan Bunuh Diri"},{"id":6, "name":"Lain - Lain"},{"id":7, "name":"Tidak Ada Masalah"}];
            $scope.listInformasiMedis = [{"id":1,"name":"Disabilitas"},{"id":2, "name":"Kontraktur"},{"id":3,"name":"Amputasi"},{"id":4, "name":"Ulkus Dekubitus"},{"id":5, "name":"Paralisis"}];
            $scope.listGangguan = [{"id":1,"name":"Mental"},{"id":2, "name":"Bicara"},{"id":3,"name":"Pendengaran"},{"id":4, "name":"Penglihatan"},{"id":5, "name":"Sensasi"}];
            $scope.listInkontinensia = [{"id":1,"name":"Urin"},{"id":2, "name":"Saliva"},{"id":3,"name":"Alvi"}];
            $scope.listPotensiRehabilitasi =  [{"id":1,"name":"Baik"},{"id":2, "name":"Sedang"},{"id":3,"name":"Buruk"}];
            $scope.dataModelGrid = [];
            $scope.dataSelectedRow = {};
            $scope.dataSelectedTerapi = {};
            $scope.listYaPasienTidak = [{
                "id": 1,
                "name": "Ya"
            }, {
                "id": 2,
                "name": "Tidak"
            }];
            $scope.listYaKeluargaTidak = [{
                "id": 1,
                "name": "YaKeluarga",
                "namaExternal": "Ya"
            }, {
                "id": 2,
                "name": "TidakKeluarga",
                "namaExternal": "Tidak"
            }];
            $scope.listDataStatusMandiri = [{
                "id": 1,
                "name": "Mandiri"
            }, {
                "id": 2,
                "name": "Butuh Bantuan"
            }, {
                "id": 3,
                "name": "Tidak Dapat Melaksanakan"
            }];
            $scope.listDataStatusMandiriDuduk = [{
                "id": 1,
                "name": "MandiriDuduk",
                "namaExternal": "Mandiri"
            }, {
                "id": 2,
                "name": "ButuhBantuanDuduk",
                "namaExternal": "Butuh Bantuan"
            }, {
                "id": 3,
                "name": "TidakDapatMelaksanakanDuduk",
                "namaExternal": "Tidak Dapat Melaksanakan"
            }];
            $scope.listDataStatusMandiriWajah = [{
                "id": 1,
                "name": "MandiriWajah",
                "namaExternal": "Mandiri"
            }, {
                "id": 2,
                "name": "ButuhBantuanWajah",
                "namaExternal": "Butuh Bantuan"
            }, {
                "id": 3,
                "name": "TidakDapatMelaksanakanWajah",
                "namaExternal": "Tidak Dapat Melaksanakan"
            }];
            $scope.listDataStatusMandiriBatangTubuh = [{
                "id": 1,
                "name": "MandiriBatangTubuh",
                "namaExternal": "Mandiri"
            }, {
                "id": 2,
                "name": "ButuhBantuanBatangTubuh",
                "namaExternal": "Butuh Bantuan"
            }, {
                "id": 3,
                "name": "TidakDapatMelaksanakanBatangTubuh",
                "namaExternal": "Tidak Dapat Melaksanakan"
            }];
            $scope.listDataStatusMandiriTrektusSuges = [{
                "id": 1,
                "name": "MandiriTrektusSuges",
                "namaExternal": "Mandiri"
            }, {
                "id": 2,
                "name": "ButuhBantuanTrektusSuges",
                "namaExternal": "Butuh Bantuan"
            }, {
                "id": 3,
                "name": "TidakDapatMelaksanakanTrektusSuges",
                "namaExternal": "Tidak Dapat Melaksanakan"
            }];
            $scope.listDataStatusMandiriTraktusUrinarius = [{
                "id": 1,
                "name": "MandiriTraktusUrinarius",
                "namaExternal": "Mandiri"
            }, {
                "id": 2,
                "name": "ButuhBantuanTraktusUrinarius",
                "namaExternal": "Butuh Bantuan"
            }, {
                "id": 3,
                "name": "TidakDapatMelaksanakanTraktusUrinarius",
                "namaExternal": "Tidak Dapat Melaksanakan"
            }];
            $scope.listDataStatusMandiriEkstermitasAtas = [{
                "id": 1,
                "name": "MandiriEkstremitasAtas",
                "namaExternal": "Mandiri"
            }, {
                "id": 2,
                "name": "ButuhBantuanEkstermitasAtas",
                "namaExternal": "Butuh Bantuan"
            }, {
                "id": 3,
                "name": "TidakDapatMelaksanakanEkstermitasAtas",
                "namaExternal": "Tidak Dapat Melaksanakan"
            }];
            $scope.listDataStatusMandiriBatangTumbuh = [{
                "id": 1,
                "name": "MandiriBatangTumbuh",
                "namaExternal": "Mandiri"
            }, {
                "id": 2,
                "name": "ButuhBantuanBatangTumbuh",
                "namaExternal": "Butuh Bantuan"
            }, {
                "id": 3,
                "name": "TidakDapatMelaksanakanBatangTumbuh",
                "namaExternal": "Tidak Dapat Melaksanakan"
            }];
            $scope.listDataStatusMandiriEkstremitasBawah = [{
                "id": 1,
                "name": "MandiriEkstremitasBawah",
                "namaExternal": "Mandiri"
            }, {
                "id": 2,
                "name": "ButuhBantuanEkstermitasBawah",
                "namaExternal": "Butuh Bantuan"
            }, {
                "id": 3,
                "name": "TidakDapatMelaksanakanEkstermitasBawah",
                "namaExternal": "Tidak Dapat Melaksanakan"
            }];
            $scope.listDataStatusMandiriMakan = [{
                "id": 1,
                "name": "MandiriMakan",
                "namaExternal": "Mandiri"
            }, {
                "id": 2,
                "name": "ButuhBantuanMakan",
                "namaExternal": "Butuh Bantuan"
            }, {
                "id": 3,
                "name": "TidakDapatMelaksanakanMakan",
                "namaExternal": "Tidak Dapat Melaksanakan"
            }];
            $scope.listDataStatusMandiriJalanKaki = [{
                "id": 1,
                "name": "MandiriJalanKaki",
                "namaExternal": "Mandiri"
            }, {
                "id": 2,
                "name": "ButuhBantuanJalanKaki",
                "namaExternal": "Butuh Bantuan"
            }, {
                "id": 3,
                "name": "TidakDapatMelaksanakanJalanKaki",
                "namaExternal": "Tidak Dapat Melaksanakan"
            }];
            $scope.listDataStatusMandiriKursiRoda = [{
                "id": 1,
                "name": "MandiriKursiRoda",
                "namaExternal": "Mandiri"
            }, {
                "id": 2,
                "name": "ButuhBantuanKursiRoda",
                "namaExternal": "Butuh Bantuan"
            }, {
                "id": 3,
                "name": "TidakDapatMelaksanakanKursiRoda",
                "namaExternal": "Tidak Dapat Melaksanakan"
            }];
            $scope.angka = 3;
            $scope.getList = function(num) {
                return new Array(num);
            };
            $scope.checkListPerlu = [];
            $scope.checkListPerluFun = function(data) {
                debugger;
                var isExist = _.find($scope.checkListPerlu, function(dataExist){ return dataExist == data; });

                if(isExist == undefined)
                {
                    $scope.checkListPerlu.push(data);
                    if ($scope.checkListPerlu[0].id == 1) {
                        $scope.checkDataPerlu = true;
                    }else{
                        $scope.checkDataPerlu = false;
                    }
                }
                else
                {
                    $scope.checkListPerlu = _.without($scope.checkListPerlu, data);
                    $scope.checkDataPerlu = false;
                }
            };
            $scope.listPeralatan = [];
            $scope.checkListDataPeralatan = function(data) {
                var isExist = _.find($scope.listPeralatan, function(dataExist) {
                    return dataExist == data;
                });

                if (isExist == undefined) {
                    $scope.listPeralatan.push(data);

                } else {
                    $scope.listPeralatan = _.without($scope.listPeralatan, data);
                }
                debugger;
            };
            $scope.checklistAlasanPemindahan = [];
            $scope.checkAlasanPemindahan = function(data) {
                var isExist = _.find($scope.checklistAlasanPemindahan, function(dataExist) {
                    return dataExist == data;
                });

                if (isExist == undefined) {
                    $scope.checklistAlasanPemindahan.push(data);
                    if (data.name == "Kondisi Pasien") {
                    $scope.checkKondisiPasien = true;
                    }
                    if (data.name == "Fasilitas") {
                        $scope.checkFasilitas = true;
                    }
                    if (data.name == "Tenaga") {
                        $scope.checkTenaga = true;
                    }
                    if (data.name == "Lain-lain") {
                        $scope.checkLain = true;
                    }
                } else {
                    $scope.checklistAlasanPemindahan = _.without($scope.checklistAlasanPemindahan, data);
                }
                debugger;
            };
            $scope.checkList = function(data) {
                debugger
                var data = data;
                
            };

            $scope.dataSourceSekunder = new kendo.data.DataSource({
                data: [],
                pageSize:5,
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });
            $scope.dataSourceTerapi = new kendo.data.DataSource({
                data: [],
                pageSize:5,
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });
            $scope.mainGridOptions = {
                columns: $scope.columnTerapi,
                pageable: true,
                selectable: "row",
                pageSizes: true
            };
            $scope.mainGridOptionsDiagnosaSekunder = {
                toolbar: "<button class='c-button' ng-click='tambahData()' style='width:20%'>Tambah</button>",
                columns: $scope.columnDiagnosaSekunder,
                datasource: $scope.dataSourceSekunder,
                pageable: true,
                editable: "inline",
                pageSizes: true
            };
            $scope.mainGridOptionsPetugasPendamping = {
                columns: $scope.columnPetugasPendamping,
                toolbar: "<button class='c-button' ng-click='tambahPetugasData()' style='width: 20%;'>Tambah</button",
                pageable: true,
                editable: true,
                pageSizes: true
            };
            $scope.columnPetugasPendamping = [{
                "field": "namaPetugas",
                "title": "Nama Petugas",
                "width": "400px",
                "template": "<input kendo-combo-box k-ng-model='dataModelGrid[#: id #].pegawai' k-data-text-field=\"'namaExternal'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='listDataPegawai' />"
            }, {
                "command": [{
                    "name": "destroy",
                    "text": "Hapus",
                    "width": "500px"
                }]
            }];
            $scope.columnTerapi = [{
                "field": "namaObat",
                "title": "Nama Obat",
                "width": "300px",
                "template": "#: namaObat.namaObat #"
            }, {
                "field": "jumlah",
                "title": "Jumlah",
                "width": "100px",
            }, {
                "field": "frekuensi",
                "title": "Frekuensi",
                "width": "100px"
            }, {
                "field": "dosis",
                "title": "Dosis",
                "width": "100px"
            }, {
                "field": "caraPemberian",
                "title": "Cara Pemberian",
                "width": "100px"
            }];
            var id = 1;

            $scope.tambahData = function() {
                var grid = $('#gridDiagnosisSekunder').data("kendoGrid");
                id += 1;
                $scope.dataModelGrid[id] = {};
                grid.dataSource.add({
                    id: id
                });
            };
            $scope.tambahPetugasData = function() {
                var grid = $('#gridPetugasPendamping').data("kendoGrid");
                id += 1;
                $scope.dataModelGrid[id] = {};
                grid.dataSource.add({
                    id: id
                });
            };
            $scope.tambahDataTerapi = function() {
                var listRawRequired = [
                    "item.jenisObat|k-ng-model|Jenis Obat",
                    "item.jumlah|ng-model|Jumlah",
                    "item.frekuensi|ng-model|Frekuensi",
                    "item.dosis|ng-model|Dosis",
                    "item.caraPemberian|ng-model|Cara Pemberian"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    var grid = $('#dataTerapi').data("kendoGrid");
                    id += 1;
                    $scope.dataModelGrid[id] = {};

                    grid.dataSource.add({
                        id: id,
                        jumlah: $scope.item.jumlah,
                        frekuensi: $scope.item.frekuensi,
                        dosis: $scope.item.dosis,
                        caraPemberian: $scope.item.caraPemberian,
                        namaObat: $scope.item.jenisObat
                    });
                    $scope.item.jenisObat="";
                    $scope.item.jumlah="";
                    $scope.item.frekuensi="";
                    $scope.item.dosis="";
                    $scope.item.caraPemberian="";
                }else{
                    ModelItem.showMessages(isValid.messages);
                }
            };
            $scope.hapusDataTerapi = function() {
                var data = $scope.dataSelectedTerapi;
                $scope.dataSourceTerapi.remove(data);
            };
            $scope.columnDiagnosaSekunder = [{
                "field": "diagnosaSekunder",
                "title": "Diagnosa Sekunder",
                "width": "400px",
                "template": "<input kendo-combo-box k-ng-model='dataModelGrid[#: id #].diagnosisSekunder' k-data-text-field=\"'namaExternal'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='sourceDiagnosisPrimer' />"
            }, {
                "command": [{
                    "name": "destroy",
                    "text": "Hapus",
                    "width": "50px"
                }]
            }];
            function dataUndefined(){
                if (data.asalRuanganRawat.id === undefined) {
                    debugger;
                    delete data.asalRuanganRawat;
                }
                if (data.ruangRawatSelanjutnya.id === undefined) {
                    delete data.ruangRawatSelanjutnya;
                }
                if (data.dokterJaga.id === undefined) {
                    delete data.dokterJaga;
                }
                if (data.dokterPenanggungJawab.id === undefined) {
                    delete data.dokterPenanggungJawab;
                }
                if (data.dokterYangMengirim.id === undefined) {
                    delete data.dokterYangMengirim;
                }
                if (data.petugasYangMenerima.id === undefined) {
                    delete data.petugasYangMenerima;
                }
                if (data.petugasYangMengantar.id === undefined) {
                    delete data.petugasYangMengantar;
                }
                if (data.diagnosisUtama.id === undefined) {
                    delete data.diagnosisUtama;
                }
                if (data.alergi.id === undefined) {
                    delete data.alergi;
                }
                if (data.metodePemindahan.id === undefined) {
                    delete data.metodePemindahan;
                }
                if (data.keadaanPasien.id === undefined) {
                    delete data.keadaanPasien;
                }
                if (data.fasilitas.id === undefined) {
                    delete data.fasilitas;
                }
                if (data.tenaga.id === undefined) {
                    delete data.tenaga;
                }
                if (data.isPasienDiberiTahuAlasanPemindahan.id === undefined) {
                    delete data.isPasienDiberiTahuAlasanPemindahan;
                }
                if (data.isKeluargaDiberiTahuAlasanPemindahan.id === undefined) {
                    delete data.isKeluargaDiberiTahuAlasanPemindahan;
                }
                if (data.hubunganKeluarga.id === undefined) {
                    delete data.hubunganKeluarga;
                }
                if (data.resikoJatuh.id === undefined) {
                    delete data.resikoJatuh;
                }
                if (data.jenisNyeri.id === undefined) {
                    delete data.jenisNyeri;
                }
                if (data.statusPsikologis.id === undefined) {
                    delete data.statusPsikologis;
                }
                if (data.informasiMedis.id === undefined) {
                    delete data.informasiMedis;
                }
                if (data.gangguan.id === undefined) {
                    delete data.gangguan;
                }
                if (data.inkontinensia.id === undefined) {
                    delete data.inkontinensia;
                }
                if (data.potensiRehabilitasi.id === undefined) {
                    delete data.potensiRehabilitasi;
                }
                if (data.statusKemandirian.hPBatangTubuhDanPerineum.id === undefined) {
                    delete data.statusKemandirian.hPBatangTubuhDanPerineum;
                }
                if (data.statusKemandirian.hPEkstremitasBawah.id === undefined) {
                    delete data.statusKemandirian.hPEkstremitasBawah;
                }
                if (data.statusKemandirian.batangTumbuh.id === undefined) {
                    delete data.statusKemandirian.batangTumbuh;
                }
                if (data.statusKemandirian.ekstremitasBawah.id === undefined) {
                    delete data.statusKemandirian.ekstremitasBawah;
                }
                if (data.statusKemandirian.ekstremitasAtas.id === undefined) {
                    delete data.statusKemandirian.ekstremitasAtas;
                }
                if (data.statusKemandirian.duduk.id === undefined) {
                    delete data.statusKemandirian.duduk;
                }
                if (data.statusKemandirian.kursiRoda.id === undefined) {
                    delete data.statusKemandirian.kursiRoda;
                }
                if (data.statusKemandirian.hPWajahRambutTangan.id === undefined) {
                    delete data.statusKemandirian.hPWajahRambutTangan;
                }
                if (data.statusKemandirian.jalanKaki.id === undefined) {
                    delete data.statusKemandirian.jalanKaki;
                }
                if (data.statusKemandirian.berguling.id === undefined) {
                    delete data.statusKemandirian.berguling;
                }
                if (data.statusKemandirian.hPTraktusDigestivus.id === undefined) {
                    delete data.statusKemandirian.hPTraktusDigestivus;
                }
                if (data.statusKemandirian.hPTraktusUrinarius.id === undefined) {
                    delete data.statusKemandirian.hPTraktusUrinarius;
                }
                if (data.statusKemandirian.makanan.id === undefined) {
                    delete data.statusKemandirian.makanan;
                }
            }
            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                $scope.sourceDiagnosisPrimer = data;
            });
            ManageSdm.getOrderList("pegawai/get-all-dokter2").then(function(dat) {
                $scope.listDataDokter = dat.data.data;
                $scope.listDataDokterPenanggungJawab = dat.data.data;
            });
            ManageSdm.getOrderList("service/list-generic/?view=Diagnosa&select=id,namaExternal").then(function(dat) {
                $scope.listDataDiagnosa = dat.data;
                $scope.listDataDiagnosisSekunder = dat.data;
            });
            ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaExternal").then(function(dat) {
                $scope.listDataPegawai = dat.data;
            });
            ManageSdm.getOrderList("service/list-generic/?view=Peralatan&select=id,name").then(function(dat) {
                $scope.listDataPeralatan = dat.data;
            });
            ManageSdm.getOrderList("service/list-generic/?view=JenisNyeri&select=id,namaExternal").then(function(dat) {
                $scope.listDataJenisNyeri = dat.data;
            });
            ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,namaExternal").then(function(dat) {
                $scope.listDataRuangRawat = dat.data;
                $scope.listDataRuangRawatSelanjutnya = dat.data;
            });
            ManageSdm.getOrderList("service/list-generic/?view=Alergi&select=id,namaAlergi").then(function(dat) {
                $scope.listDataAlergi = dat;
            });
            ManageSdm.getOrderList("service/list-generic/?view=KeadaanPasien&select=id,name").then(function(dat) {
                $scope.listDataKondisiPasien = dat;
            });
            ManageSdm.getOrderList("service/list-generic/?view=Fasilitas&select=id,name").then(function(dat) {
                $scope.listDataFasilitas = dat;
            });
            ManageSdm.getOrderList("service/list-generic/?view=Tenaga&select=id,name").then(function(dat) {
                $scope.listDataTenaga = dat;
            });
            ManageSdm.getOrderList("service/list-generic/?view=HubunganKeluarga&select=id,namaExternal").then(function(dat) {
                $scope.listDataHubunganKeluarga = dat;
            });
            ManageSdm.getOrderList("service/list-generic/?view=StatusPsikologis&select=id,namaExternal").then(function(dat) {
                $scope.listDataStatusPsikologis = dat.data;
            });

            ManageSdm.getOrderList("transfer-pasien-internal/get-list-obat").then(function(dat) {
                $scope.listDataObat = dat.data.data;
            });

            $scope.simpan = function() {
                var gridDiagnosisSekunder = $('#gridDiagnosisSekunder').data("kendoGrid");
                var gridPetugasPendamping = $('#gridPetugasPendamping').data("kendoGrid");
                var gridDataTerapi = $('#dataTerapi').data("kendoGrid");
                $scope.dataDiagnosisSekunder = [];
                for (var i = 0; i < gridDiagnosisSekunder._data.length; i++) {
                    var daftar = {
                        "diagnosa": {
                            "id": $scope.dataModelGrid[gridDiagnosisSekunder._data[i].id].diagnosisSekunder.id
                        }
                    }
                    $scope.dataDiagnosisSekunder.push(daftar);
                };
                $scope.dataPetugasPendamping = [];
                for (var i = 0; i < gridPetugasPendamping._data.length; i++) {
                    var daftar = {
                        "pegawai": {
                            "id": $scope.dataModelGrid[gridPetugasPendamping._data[i].id].pegawai.id
                        }
                    }
                    $scope.dataPetugasPendamping.push(daftar);
                };
                $scope.dataTerapi = [];
                for (var i = 0; i < gridDataTerapi._data.length; i++) {
                    var daftar = {
                        "caraPemberian": gridDataTerapi._data[i].caraPemberian,
                        "frekuensi": gridDataTerapi._data[i].frekuensi,
                        "obat": {
                            "id": gridDataTerapi._data[i].namaObat.id
                        },
                        "dosis": gridDataTerapi._data[i].dosis,
                        "jumlah": gridDataTerapi._data[i].jumlah
                        }
                    }
                    $scope.dataTerapi.push(daftar);
                $scope.listPeralatanNew = [];
                for (var i = 0; i < $scope.listPeralatan.length; i++) {
                    var daftar = {
                        "peralatan":{
                            "id": $scope.listPeralatan[i].id
                        }
                    }
                    $scope.listPeralatanNew.push(daftar);
                }
                
                $scope.ListPerluNew = [];
                for (var i = 0; i < $scope.checkListPerlu.length; i++) {
                    var daftarPerhatian = {
                        "id": $scope.checkListPerlu[i].id
                    }
                    $scope.ListPerluNew.push(daftarPerhatian);
                }
                $scope.listAlasanPemindahanNew = [];
                for (var i = 0; i < $scope.checklistAlasanPemindahan.length; i++) {
                    var daftarAlasanPemindahan = {
                        "id": $scope.checklistAlasanPemindahan[i].id
                    }
                    $scope.listAlasanPemindahanNew.push(daftarAlasanPemindahan);
                }
                debugger;
                if($scope.checkListPerlu[1] !== undefined){
                    var mrsa = "true"
                }else{
                    var mrsa = "false"
                }

                var item = ModelItem.beforePost($scope.item);
                
                var data = {
                    // "tanggalMasuk": dateHelper.formatDate(item.tglMasuk, "YYYY-MM-DD HH:mm:ss"),
                    // "tanggalPindah": dateHelper.formatDate(item.tglPindah, "YYYY-MM-DD HH:mm:ss"),
                    "tanggalMasuk": item.tglMasuk,
                    "tanggalPindah": item.tglPindah,
                    "asalRuanganRawat": {
                        "id": item.asalRuangRawat.id
                    },
                    "ruangRawatSelanjutnya": {
                        "id": item.ruangRawatSelanjutnya.id
                    },
                    "dokterJaga": {
                        "id": item.dokterJaga.id
                    },
                    "dokterPenanggungJawab": {
                        "id": item.dokterPenanggungJawab.id
                    },
                    "dokterYangMengirim": {
                        "id": item.dokterYangMengirim.id
                    },
                    "petugasYangMenerima": {
                        "id": item.petugasYangMenerima.id
                    },
                    "petugasYangMengantar": {
                        "id": item.petugasYangMengantar.id
                    },
                    "detailPetugasPendamping": $scope.dataPetugasPendamping,
                    "diagnosaUtama": {
                        "id": item.diagnosisUtama.id
                    },
                    "diagnosaSekunder": $scope.dataDiagnosisSekunder,
                    "alergi": {
                        "id": item.alergi.id
                    },
                    "mrsa": mrsa,
                    "metodePemindahan": {
                        "id": item.metodePemindahan
                    },
                    "detailPeralatan": $scope.listPeralatanNew,
                    // "alasanPemindahan": $scope.listAlasanPemindahanNew,
                    "keadaanPasien": {
                        "id": item.kondisiPasien.id
                    },
                    "fasilitas": {
                        "id": item.fasilitas.id
                    },
                    "tenaga": {
                        "id": item.tenaga.id
                    },
                    "alasanLainPemindahan": item.alasanLainnya,
                    "isPasienDiberiTahuAlasanPemindahan": {
                        "id": item.pasienDiberitahu
                    },
                    "isKeluargaDiberiTahuAlasanPemindahan": {
                        "id": item.keluargaPasien
                    },
                    "namaKeluarga": item.namaKeluargaPasien,
                    "hubunganKeluarga": {
                        "id": item.hubunganKeluarga.id
                    },
                    "resikoJatuh": {
                        "id": item.risikoJatuh.id
                    },
                    "skor": item.skor,
                    "tekananDarah": item.tekananDarah,
                    "nadi": item.nadi,
                    "pernapasan": item.pernapasan,
                    "keadaanUmum": item.KeadaanUmum,
                    "kesadaran": item.kesadaran,
                    "suhu": item.suhu,
                    "skalaNyeri": item.skalaNyeri,
                    "skorNyeri": item.skorNyeri,
                    "jenisNyeri": {
                        "id": item.jenisNyeri
                    },
                    "lokasiNyeri": item.lokasi,
                    "durasiNyeri": item.durasi,
                    "statusPsikologis": {
                        "id": item.statusPsikologis
                    },
                    "pemeriksaanFisik": item.PemeriksaanFisik,
                    "statusLokasi": item.statusLokalis,
                    "pemeriksaanPenunjang": item.pemeriksaanpenunjang,
                    "diet": item.diet,
                    "intervensi": item.intervensi,
                    "rencanaPerawatan": item.rencanaPerawatan,
                    "informasiMedis": {
                        "id": item.informasiMedis
                    },
                    "gangguan": {
                        "id": item.gangguan
                    },
                    "inkontinensia": {
                        "id": item.inkontinensia
                    },
                    "potensiRehabilitasi": {
                         "id": item.potensiRehabilitasi
                    },
                    "detailTerapiSaatPindah": $scope.dataTerapi,
                    "statusKemandirian": {
                        "hPBatangTubuhDanPerineum": {
                            "id": item.batangTubuhPerineum
                        },
                        "hPEkstremitasBawah": {
                            "id": item.ekstremitasBawah
                        },
                        "batangTumbuh": {
                            "id": item.batangTubuh
                        },
                        "ekstremitasBawah": {
                            "id": item.ekstremitasBawah
                        },
                        "ekstremitasAtas": {
                            "id": item.ekstremitasAtas
                        },
                        "duduk": {
                            "id": item.duduk
                        },
                        "kursiRoda": {
                            "id": item.kursiRoda
                        },
                        "hPWajahRambutTangan": {
                            "id": item.wajahRambutTangan
                        },
                        "jalanKaki": {
                            "id": item.jalanKaki
                        },
                        "berguling": {
                            "id": item.berguling
                        },
                        "hPTraktusDigestivus": {
                            "id": item.traktusDigestivus
                        },
                        "hPTraktusUrinarius": {
                            "id": item.traktusUrinarius
                        },
                        "makanan": {
                            "id": item.makanan
                        }
                    },
                    "pasienDaftar": {
                        "noRec": item.noRec
                    }
                }
                //dataUndefined();
                ManageSdm.saveData(data, "transfer-pasien-internal/save-transfer-pasien-internal").then(function(e) {
                    console.log(e.data)
                    $scope.item = {};
                });

            };

            $scope.suhu = { "name": "Suhu", "ket": "°C"};
            $scope.nadi = { "name": "Nadi", "ket": "/menit"};
            $scope.pernapasan = { "name": "Pernapasan", "ket": "/menit" };
            $scope.tekananDarah = { "name": "Tekanan Darah", "ket": "mmHg"};
            $scope.beratBadan = { "name": "Berat Badan", "ket": "kg/cm"};
        }
    ]);
});
