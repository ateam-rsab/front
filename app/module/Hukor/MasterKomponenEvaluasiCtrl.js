 define(['initialize'], function(initialize) {
     'use strict';
     initialize.controller('MasterKomponenEvaluasiCtrl', ['$rootScope', '$scope',
         'ModelItem', '$state', 'ManageSarpras', 'DateHelper', '$q', 'IPSRSService',
         function($rootScope, $scope, ModelItem, $state, ManageSarpras, dateHelper, $q, IPSRSService) {
             $scope.item = {};
             $scope.now = new Date();
             $scope.dataVOloaded = true;
             $scope.no = 1;
             $scope.item.dataFromGrid;
             init();

             function init() {
                 $scope.item = {};
                 $q.all([
                     ManageSarpras.getOrderList("service/list-generic/?view=KelompokEvaluasi&select=id,kelompokEvaluasi", true),
                     ManageSarpras.getOrderList("service/list-generic/?view=SatuanHasil&select=id,satuanHasil", true),
                     ManageSarpras.getOrderList("service/list-generic/?view=Departemen&select=id,namaDepartemen", true),
                     //ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=ruangan.id&values=304", true),
                     ManageSarpras.getOrderList("komponen-evaluasi/get-all", true),
                 ]).then(function(data) {
                     $scope.listKelompokEvaluasi = data[0].data;
                     $scope.listsatuanHasil = data[1].data;
                     $scope.listdepartemen = data[2].data;
                     var dataMastetKomponenEvaluasi = [];
                     angular.forEach(data[3].data.data, function(item) {
                         item.departemen = _.find(data[2].data, function(itemDepartemen) {
                             if (item.departemenId === itemDepartemen.id) {
                                 return itemDepartemen;
                             }
                         });
                         if (_.isNull(item.satuanHasilId)) {
                             item.satuanHasil = { "SatuanHasil": null };

                         } else {

                             item.satuanHasil = _.find(data[1].data, function(itemSatuanHasil) {
                                 if (item.satuanHasilId === itemSatuanHasil.id) {
                                     return itemSatuanHasil;
                                 }
                             });
                         }
                         if (_.isNull(item.kdKelompokEvaluasiId)) {
                             item.kelompokEvaluasi = { "kelompokEvaluasi": null };

                         } else {
                             item.kelompokEvaluasi = _.find(data[0].data, function(itemKelompokEvaluasi) {
                                 if (item.kdKelompokEvaluasiId === itemKelompokEvaluasi.id) {
                                     return itemKelompokEvaluasi;
                                 }
                             });
                         }
                         if (item.operatorFactorRate === "") {
                             item.operatorFactorRate = { "op": null };

                         } else {
                             item.operatorFactorRate = _.find($scope.listFaktorRate, function(itemFaktorRate) {
                                 if (item.operatorFactorRate === itemFaktorRate) {
                                     return itemFaktorRate;
                                 }
                             });
                         }
                         dataMastetKomponenEvaluasi.push(item);
                     });

                     $scope.gridMasterKelompokEvaluasi = new kendo.data.DataSource({
                         pageSize: 10,
                         data: dataMastetKomponenEvaluasi,
                         autoSync: true
                     });
                 });

                 $scope.listFaktorRate = [{
                     "op": "+"
                 }, {
                     "op": "-"
                 }, {
                     "op": "x"
                 }, {
                     "op": "/"
                 }];
                 $scope.gridMasterKelompokEvaluasi = new kendo.data.DataSource({
                     data: []
                 });

                 $scope.vals = false;
                 $scope.item.dataFromGrid = [];
             }

             $scope.colGridMasterKelompokEvaluasi = [{
                     "field": "kdKomponenEvaluasi",
                     "title": "Kode Komponen Evaluasi",
                     "width": "10%"
                 },
                 {
                     "field": "komponenEvaluasi",
                     "title": "komponen Evaluasi",
                     "width": "10%"
                 },
                 {
                     "field": "kelompokEvaluasi.kelompokEvaluasi",
                     "title": "Kelompok Evaluasi",
                     "width": "10%"
                 },
                 {
                     "field": "nilaiMin",
                     "title": "Nilai Min",
                     "width": "10%"
                 },
                 {
                     "field": "nilaiMax",
                     "title": "Nilai Max",
                     "width": "10%"
                 },
                 {
                     "field": "nilaiStandar",
                     "title": "Nilai Standar",
                     "width": "10%"
                 },
                 {
                     "field": "satuanHasil.satuanHasil",
                     "title": "Satuan Hasil",
                     "width": "10%"
                 },
                 {
                     "field": "factorRate",
                     "title": "Faktor Rate",
                     "width": "10%"
                 },
                 {
                     "field": "operatorFactorRate.op",
                     "title": "Operator Faktor Rate",
                     "width": "10%"
                 },
                 {
                     "field": "departemen.namaDepartemen",
                     "title": "Departemen",
                     "width": "10%"
                 },
                 {
                     "field": "statusEnabled",
                     "title": "Status Aktif",
                     "width": "5%"
                 }
             ];


             $scope.klik = function(current) {
                 $scope.showEdit = true;
                 //  $scope.item.dataFromGrid = current;
                 $scope.item = current;
                 $scope.item.dataAktif = current.statusEnabled;
                 $scope.item.kodeKomponenEvaluasi = current.kdKomponenEvaluasi;
                 $scope.item.min = current.nilaiMin;
                 $scope.item.max = current.nilaiMax;
                 $scope.item.standar = current.nilaiStandar;
                 $scope.item.OperatorfaktorRate = current.operatorFactorRate;
                 /* 
                 $scope.item.komponenEvaluasi= current.komponenEvaluasi;
                 $scope.item.kelompokEvaluasi= current.kelompokEvaluasi;
                 
                 $scope.item.standar= current;
                 $scope.item.satuanHasil= current;
                 $scope.item.faktorRate= current;
                 $scope.item.OperatorfaktorRate= current;
                 $scope.item.departemen= current;
                 $scope.item.reportDisplay= current;
                 $scope.item.kodeEksternal= current;
                 $scope.item.namaEksternal= current;
                 $scope.item.dataAktif= current;*/


                 if (current.statusEnabled === true) {
                     $scope.vals = true;
                 } else {
                     $scope.vals = false;
                 }

             };

             $scope.Cancel = function() {
                 init();
             }
             $scope.batal = function() {
                 $scope.showEdit = false;
                 $scope.item = {};
             }
             $scope.Save = function() {
                 if ($scope.item.kodeKomponenEvaluasi === undefined,
                     $scope.item.komponenEvaluasi === undefined,
                     $scope.item.kelompokEvaluasi === undefined,
                     $scope.item.min === undefined,
                     $scope.item.max === undefined,
                     $scope.item.standa === undefined,
                     $scope.item.satuanHasil === undefined,
                     $scope.item.faktorRate === undefined,
                     $scope.item.OperatorfaktorRate === undefined,
                     $scope.item.departemen === undefined) {
                     toastr.warning("Lengkapi semua data");
                     return;
                 }

                 if ($scope.item.dataAktif === undefined) {
                     $scope.item.dataAktif = false;
                 }

                 debugger;
                 var data = {
                     "id": $scope.item.id,
                     "kdKomponenEvaluasi": $scope.item.kodeKomponenEvaluasi,
                     "komponenEvaluasi": $scope.item.komponenEvaluasi,
                     "kelompokEvaluasi": $scope.item.kelompokEvaluasi,
                     "nilaiMin": $scope.item.min,
                     "nilaiMax": $scope.item.max,
                     "nilaiStandar": $scope.item.standar,
                     "satuanHasil": $scope.item.satuanHasil,
                     "factorRate": $scope.item.faktorRate,
                     "operatorFactorRate": $scope.item.OperatorfaktorRate.po,
                     "departemen": $scope.item.departemen,
                     "reportDisplay": $scope.item.reportDisplay,
                     "kodeExternal": $scope.item.kodeEksternal,
                     "namaExternal": $scope.item.namaEksternal,
                     "statusEnabled": $scope.item.dataAktif,
                     "qKomponenEvaluasi": $scope.item.qKomponenEvaluasi,
                     "noUrut": $scope.item.noUrut
                 }

                 /* ManageSarpras.saveDataMaster(ModelItem.beforePost(data), "komponen-evaluasi/save/").then(function(e) {
                      init();
                  });*/
                 // init();
                 IPSRSService.saveDataSarPras(data, "komponen-evaluasi/save/").then(function(e) {
                     console.log(JSON.stringify(e.data));
                     //init();
                     $scope.showEdit = true;
                 });
             };
         }
     ]);
 });