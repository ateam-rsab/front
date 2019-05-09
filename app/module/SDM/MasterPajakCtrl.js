 define(['initialize'], function(initialize) {
     'use strict';
     initialize.controller('MasterPajakCtrl', ['$rootScope', '$scope',
         'ModelItem', '$state', 'InstitusiPendidikan', 'JenisSantunanService', 'ManageSdm', 'DateHelper',
         function($rootScope, $scope, ModelItem, $state,
             InstitusiPendidikan, JenisSantunanService, ManageSdm, dateHelper) {
             $scope.item = {};
             $scope.now = new Date();
             $scope.dataVOloaded = true;
             $scope.no = 1;
             $scope.item.range;
             $scope.item.dataFromGrid;

             ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true).then(function(dat) {
                 $scope.listRuangan = dat.data;
             });

             ManageSdm.getOrderList("service/list-generic/?view=GolonganPegawai&select=id,golonganPegawai", true).then(function(dat) {
                 $scope.listgolPegawai = dat.data;
             });

             ManageSdm.getOrderList("service/list-generic/?view=ObjekPajak&select=id,objekPajak", true).then(function(dat) {
                 $scope.listObjekPajak = dat.data;
             });

             init();

             function init() {
                 $scope.item = {};
                 ManageSdm.getOrderList("pegawai-sk-pajak/get-all-pegawai-sk-Pajak", true).then(function(dat) {
                     $scope.gridMasterPajak = new kendo.data.DataSource({
                         data: dat.data.data
                     });
                 });
                 $scope.vals = false;
                 $scope.item.range = "Range Pajak Penghasilan";
                 $scope.item.dataFromGrid = [];
             }

             InstitusiPendidikan.getOrderList("service/list-generic/?view=InstitusiPendidikan&select=*", true).then(function(dat) {
                 $scope.ListInstitusiPendidikan = dat.data;

             });

             $scope.colGridMasterPajak = [{
                     "field": "noSuratKeputusan",
                     "title": "No SK",
                     "width": "10%"
                 },
                 {
                     "field": "namaSuratKeputusan",
                     "title": "Nama SK",
                     "width": "10%"
                 },
                 {
                     "field": "tglBerlakuAwal",
                     "title": "Tanggal Berlaku Awal",
                     "width": "10%"
                 },
                 {
                     "field": "tglBerlakuAkhir",
                     "title": "Tanggal Berlaku Akhir",
                     "width": "10%"
                 },
                 {
                     "field": "namaRuangan",
                     "title": "Ruangan",
                     "width": "10%"
                 },
                 {
                     "field": "golonganPegawai",
                     "title": "Golongan Pegawai",
                     "width": "10%"
                 },
                 {
                     "field": "objekPajak",
                     "title": "Objek Pajak",
                     "width": "10%"
                 },
                 {
                     "field": "hasilUji",
                     "title": "Range",
                     "width": "10%"
                 },
                 {
                     "field": "persenPajak",
                     "title": "Persen Pajak",
                     "width": "10%"
                 },
                 {
                     "field": "statusEnabled",
                     "title": "Status Aktif",
                     "width": "10%"
                 }
             ];

             function formatTgl(tanggal) {
                 debugger;
                 if (tanggal.match("-")) {
                     var res = tanggal.split("-");
                     return res[1] + "-" + res[0] + "-" + res[2];
                 } else {
                     return tanggal;
                 }

             }

             $scope.klik = function(current) {
                 $scope.item.dataFromGrid = current;
                 $scope.item.noSk = current.noSuratKeputusan;
                 $scope.item.namaSK = current.namaSuratKeputusan;
                 $scope.item.tanggalAwal = new Date(formatTgl(current.tglBerlakuAwal)); // moment(current.tglBerlakuAwal).format("dd-MM-yyyy");
                 $scope.item.tanggalAkhir = new Date(formatTgl(current.tglBerlakuAkhir)); //moment(current.tglBerlakuAkhir).format("dd-MM-yyyy"); 
                 $scope.item.persenPajak = current.persenPajak;
                 var x = 0;
                 for (x = 0; x < $scope.listRuangan.length; x++) {
                     if ($scope.listRuangan[x].id === current.ruanganId) {
                         $scope.item.ruangan = $scope.listRuangan[x];
                     }
                 }
                 for (x = 0; x < $scope.listgolPegawai.length; x++) {
                     if ($scope.listgolPegawai[x].id === current.golonganPegawaiId) {
                         $scope.item.golPegawai = $scope.listgolPegawai[x];
                     }
                 }
                 for (x = 0; x < $scope.listObjekPajak.length; x++) {
                     if ($scope.listObjekPajak[x].id === current.objekpajakId) {
                         $scope.item.objekPajak = $scope.listObjekPajak[x];
                     }
                 }

                 if (current.statusEnabled === true) {
                     $scope.vals = true;
                 } else {
                     $scope.vals = false;
                 }

             };

             $scope.Cancel = function() {
                 init();
             }

             $scope.Save = function() {
                 if ($scope.item.ruangan === undefined || $scope.item.golPegawai === undefined || $scope.item.objekPajak === undefined ||
                     $scope.item.tanggalAwal === undefined || $scope.item.tanggalAkhir === undefined || $scope.item.persenPajak === undefined) {
                     toastr.warning("Lengkapi semua data");
                     return;
                 }
                 var id1 = "";
                 var id2 = "";
                 if ($scope.item.dataFromGrid !== undefined) {
                     id1 = $scope.item.dataFromGrid.pegawaiSkPajakId;
                     id2 = $scope.item.dataFromGrid.suratKeputusanId
                 }
                 if ($scope.item.dataAktif === undefined) {
                     $scope.item.dataAktif = false;
                 }

                 debugger;
                 var data = {
                     "pegawaiSkPajakId": id1,
                     "suratKeputusanId": id2,
                     "noSuratKeputusan": $scope.item.noSk,
                     "namaSuratKeputusan": $scope.item.namaSK,
                     "tglBerlakuAwal": $scope.item.tanggalAwal,
                     "tglBerlakuAkhir": $scope.item.tanggalAkhir,
                     "ruanganId": $scope.item.ruangan.id,
                     "namaRuangan": $scope.item.ruangan.namaRuangan,
                     "golongaPegawaiId": $scope.item.golPegawai.id,
                     "namaGolonganPegawai": $scope.item.golPegawai.golonganPegawai,
                     "objekPajakId": $scope.item.objekPajak.id,
                     "namaObjekPajak": $scope.item.objekPajak.objekPajak,
                     "rangeId": 18,
                     "persenPajak": $scope.item.persenPajak,
                     "statusEnabled": $scope.item.dataAktif
                 }

                 ManageSdm.saveJenisSantunan(ModelItem.beforePost(data), "pegawai-sk-pajak/save-pegawai-sk-pajak").then(function(e) {
                     init();
                 });
             };
         }
     ]);
 });