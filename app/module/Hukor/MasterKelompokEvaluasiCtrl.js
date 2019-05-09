 define(['initialize'], function(initialize) {
     'use strict';
     initialize.controller('MasterKelompokEvaluasiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
         function($q, $rootScope, $scope, IPSRSService) {
             $scope.item = {};
             $scope.dataVOloaded = true;
             $scope.now = new Date();
             $scope.object = {};

             var init = function() {
                 $q.all([
                     IPSRSService.getFieldsMasterTable("get-data-master?className=KelompokEvaluasi", true),
                     IPSRSService.getFieldListData("Departemen&select=id,namaDepartemen"),
                     IPSRSService.getFieldListData("Pendidikan&select=id,namaPendidikan"),
                     IPSRSService.getFieldListData("KelompokEvaluasi&select=id,kelompokEvaluasi")

                 ]).then(function(data) {
                     $scope.listdepartemen = data[1].data;
                     $scope.listPendidikan = data[2].data;
                     $scope.listKelompokEvaluasiHead = data[3].data;
                     var map = data[0].data.data.KelompokEvaluasi;
                     var arrayData = [];
                     var arrS = {};
                     var dep;
                     var pen;
                     var kel;
                     for (var i = 0; i < map.length; i++) {
                         for (var j = 0; j < $scope.listdepartemen.length; j++) {
                             if (map[i].departemenId == $scope.listdepartemen[j].id) {
                                 dep = $scope.listdepartemen[j]
                                 break;
                             }
                         }

                         for (var k = 0; k < $scope.listPendidikan.length; k++) {
                             if (map[i].pendidikanId == $scope.listPendidikan[k].id) {
                                 pen = $scope.listPendidikan[k]
                                 break;
                             }
                         }


                         for (var k = 0; k < $scope.listKelompokEvaluasiHead.length; k++) {
                             if (map[i].kdKelompokEvaluasiHeadId == $scope.listKelompokEvaluasiHead[k].id) {
                                 kel = $scope.listKelompokEvaluasiHead[k]
                                 break;
                             }
                         }
                         arrS = {
                             "KelompokEvaluasiHead": kel,
                             "Pendidikan": pen,
                             "departemen": dep,
                             "departemenId": map[i].departemenId,
                             "pendidikanId": map[i].pendidikanId,
                             "kodeExternal": map[i].kodeExternal,
                             "id": map[i].id,
                             "kelompokEvaluasi": map[i].kelompokEvaluasi,
                             "noUrut": map[i].noUrut,
                             "pengalaman": map[i].pengalaman,
                             "pelatihan": map[i].pelatihan,
                             "namaExternal": map[i].namaExternal,
                             "statusEnabled": map[i].statusEnabled,
                             "noRec": map[i].noRec,
                             "kdKelompokEvaluasiHeadId": map[i].kdKelompokEvaluasiHeadId,
                             "keteranganLainnya": map[i].keteranganLainnya,
                             "qKelompokEvaluasi": map[i].qKelompokEvaluasi,
                             "kdKelompokEvaluasi": map[i].kdKelompokEvaluasi,
                             "reportDisplay": map[i].reportDisplay
                         }
                         arrayData.push(arrS)
                     }
                     $scope.gridMasterKelompokEvaluasi = new kendo.data.DataSource({
                         pageSize: 10,
                         data: arrayData,
                         autoSync: true
                     });

                 });
             }
             init();


             $scope.colGridMasterKelompokEvaluasi = [{
                     "field": "kdKelompokEvaluasi",
                     "title": "Kode Evaluasi"
                 },
                 {
                     "field": "kelompokEvaluasi",
                     "title": "Kelompok Evaluasi"
                 },
                 {
                     "field": "pengalaman",
                     "title": "Pengalaman"
                 },
                 {
                     "field": "pelatihan",
                     "title": "Pelatihan"
                 },
                 {
                     "field": "noUrut",
                     "title": "No Urut"
                 },
                 /* data kosng
                                  {
                                  	"field": "Pendidikan.namaPendidikan",
                                  	"title": "Pendidikan"
                                  },*/
                 {
                     "field": "KelompokEvaluasiHead.kelompokEvaluasi",
                     "title": "Kelompok Evaluasi Head"
                 },
                 {
                     "field": "departemen.namaDepartemen",
                     "title": "Departemen"
                 },
                 {
                     "field": "statusEnabled",
                     "title": "status"
                 }
             ];

             $scope.mainGridOptions = {
                 pageable: true,
                 columns: $scope.columnAgama,
                 editable: "popup",
                 selectable: "row",
                 scrollable: false
             };
             $scope.klik = function(current) {
                 $scope.showEdit = true;
                 $scope.item.dataFromGrid = current;
                 $scope.item.kodeKelompokEvaluasi = current.kdKelompokEvaluasi;
                 $scope.item.kelompokEvaluasi = current.kelompokEvaluasi;
                 $scope.item.kodeEksternal = current.kodeExternal;
                 $scope.item.namaEksternal = current.namaExternal;
                 $scope.item.pengalaman = current.pengalaman;
                 $scope.item.pelatihan = current.pelatihan;
                 $scope.item.noUrut = current.noUrut;
                 $scope.item.reportDisplay = current.reportDisplay;
                 $scope.item.kelompokEvaluasiHead = current.KelompokEvaluasiHead;
                 $scope.item.pendidikan = current.Pendidikan;
                 $scope.item.departemen = current.departemen;

                 if (current.statusEnabled === true) {
                     $scope.vals = true;
                 } else {
                     $scope.vals = false;
                 }

             };

             $scope.tambah = function() {
                 var data = {
                         "class": "KelompokEvaluasi",
                         "listField": {
                             "departemen": {
                                 "id": $scope.item.departemen.id
                             },
                             "pendidikan": {
                                 "id": $scope.item.pendidikan.id
                             },
                             //"departemenId": $scope.item.departemen.id,
                             "kodeExternal": $scope.item.kodeEksternal,
                             //"pendidikanId": $scope.item.pendidikan.id,
                             "pengalaman": $scope.item.pengalaman,
                             "kelompokEvaluasi": $scope.item.kelompokEvaluasi,
                             "noUrut": $scope.item.noUrut,
                             "qKelompokEvaluasi": 0,
                             "pelatihan": $scope.item.pelatihan,
                             "namaExternal": $scope.item.namaEksternal,
                             "statusEnabled": $scope.item.dataAktif,
                             "kdKelompokEvaluasiHeadId": $scope.item.kelompokEvaluasiHead.id,
                             "kdKelompokEvaluasi": $scope.item.kodeKelompokEvaluasi,
                             "reportDisplay": $scope.item.reportDisplay
                         }
                     }
                     // adding object for security role
                 $scope.object = data;
                 $scope.object.module = 'ITI';
                 $scope.object.form = 'KelompokEvaluasi';
                 $scope.object.action = 'Simpan';
                 IPSRSService.saveDataMaster(data, "save-master-table").then(function(e) {
                     console.log(JSON.stringify(e.data));
                     init();
                     $scope.showEdit = true;
                     $scope.item = {};
                 }, function(e) {
                     if (!e.hak_user) {
                         /*                   $scope.showContWindowLoginSupervisor = true;
                                            $scope.windowLoginSuperUser = $("#windowLoginSupervisor");
                                            $scope.windowLoginSuperUser.data("kendoWindow").open();*/
                     }
                 });
             }

             $scope.loginSupervisor = function() {
                 $rootScope.loginSuperUser($scope.object, "save-master-table").then(function(e) {
                     $scope.showContWindowLoginSupervisor = false;
                     /*                     $scope.windowLoginSuperUser = $("#windowLoginSupervisor");
                                          $scope.windowLoginSuperUser.data("kendoWindow").close();*/
                 }, function(e) {

                 });

             }

             $scope.closeWindowLoginSupervisor = function() {
                 $scope.showContWindowLoginSupervisor = false;
             }

             $scope.edit = function() {
                 var data = {
                     "class": "KelompokEvaluasi",
                     "listField": {
                         "id": $scope.item.dataFromGrid.id,
                         "noRec": $scope.item.dataFromGrid.noRec,
                         "departemen": {
                             "id": $scope.item.departemen.id
                         },
                         "kodeExternal": $scope.item.kodeEksternal,
                         "pendidikan": {
                             "id": $scope.item.pendidikan.id
                         },
                         "qKelompokEvaluasi": 0,
                         "pengalaman": $scope.item.pengalaman,
                         "kelompokEvaluasi": $scope.item.kelompokEvaluasi,
                         "noUrut": $scope.item.noUrut,
                         "pelatihan": $scope.item.pelatihan,
                         "namaExternal": $scope.item.namaEksternal,
                         "statusEnabled": $scope.item.dataAktif,
                         "kdKelompokEvaluasiHeadId": $scope.item.kelompokEvaluasiHead.id,
                         "kdKelompokEvaluasi": $scope.item.kodeKelompokEvaluasi,
                         "reportDisplay": $scope.item.reportDisplay
                     }
                 }
                 IPSRSService.saveDataMaster(data, "update-master-table").then(function(e) {
                     console.log(JSON.stringify(e.data));
                     init();
                 });
             }
             $scope.batal = function() {
                 $scope.showEdit = false;
                 $scope.item = {};
             }

         }
     ]);
 });