define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('AdvokasiHukumMedicolegalxxCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=AdvokasiHukumMedicolegal", true).then(function(dat){
$scope.listDataMaster = dat.data.data.AdvokasiHukumMedicolegal;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnAdvokasiHukumMedicolegal = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "noKasus",
				"title": "no Kasus"
			},
			{
				"field": "tglKasus",
				"title": "tgl Kasus"
			},
			{
				"field": "user",
				"title": "user"
			},
			{
				"field": "userId",
				"title": "user Id"
			},
			{
				"field": "jenisKasus",
				"title": "jenis Kasus"
			},
			{
				"field": "jenisKasusId",
				"title": "jenis Kasus Id"
			},
			{
				"field": "deskripsiKasus",
				"title": "deskripsi Kasus"
			},
			{
				"field": "penanggungJawab",
				"title": "penanggung Jawab"
			},
			{
				"field": "penanggungJawabId",
				"title": "penanggung Jawab Id"
			},
			{
				"field": "analisaKajian",
				"title": "analisa Kajian"
			},
			{
				"field": "hasilKeputusan",
				"title": "hasil Keputusan"
			},
			{
				"field": "statusKasus",
				"title": "status Kasus"
			},
			{
				"field": "reportDisplay",
				"title": "report Display"
			},
			{
				"field": "kodeExternal",
				"title": "kode External"
			},
			{
				"field": "namaExternal",
				"title": "nama External"
			},
			{
				"field": "statusEnabled",
				"title": "status Enabled"
			},
{
	"title" : "Action",
	"width" : "200px",
	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
}
];
$scope.mainGridOptions = { 
 pageable: true,
 columns: $scope.columnAdvokasiHukumMedicolegal,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.noKasus = current.noKasus;
$scope.item.tglKasus = current.tglKasus;
$scope.item.user = current.user;
$scope.item.userId = current.userId;
$scope.item.jenisKasus = current.jenisKasus;
$scope.item.jenisKasusId = current.jenisKasusId;
$scope.item.deskripsiKasus = current.deskripsiKasus;
$scope.item.penanggungJawab = current.penanggungJawab;
$scope.item.penanggungJawabId = current.penanggungJawabId;
$scope.item.analisaKajian = current.analisaKajian;
$scope.item.hasilKeputusan = current.hasilKeputusan;
$scope.item.statusKasus = current.statusKasus;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AdvokasiHukumMedicolegal&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AdvokasiHukumMedicolegal&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "AdvokasiHukumMedicolegal",
	"listField": {
"noKasus": $scope.item.noKasus,
"tglKasus": $scope.item.tglKasus,
"user": $scope.item.user,
"userId": $scope.item.userId,
"jenisKasus": $scope.item.jenisKasus,
"jenisKasusId": $scope.item.jenisKasusId,
"deskripsiKasus": $scope.item.deskripsiKasus,
"penanggungJawab": $scope.item.penanggungJawab,
"penanggungJawabId": $scope.item.penanggungJawabId,
"analisaKajian": $scope.item.analisaKajian,
"hasilKeputusan": $scope.item.hasilKeputusan,
"statusKasus": $scope.item.statusKasus,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
init();
$scope.item = {};
 });
  }
////edit
 $scope.edit = function()
  {	
   var data = {
 "class": "AdvokasiHukumMedicolegal",
	"listField": {
"noKasus": $scope.item.noKasus,
"tglKasus": $scope.item.tglKasus,
"user": $scope.item.user,
"userId": $scope.item.userId,
"jenisKasus": $scope.item.jenisKasus,
"jenisKasusId": $scope.item.jenisKasusId,
"deskripsiKasus": $scope.item.deskripsiKasus,
"penanggungJawab": $scope.item.penanggungJawab,
"penanggungJawabId": $scope.item.penanggungJawabId,
"analisaKajian": $scope.item.analisaKajian,
"hasilKeputusan": $scope.item.hasilKeputusan,
"statusKasus": $scope.item.statusKasus,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
init();
});
}
$scope.batal = function () {
$scope.showEdit = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
$scope.listuser= dat.data;
});
IPSRSService.getFieldListData("JenisKasusMedicolegal&select=id,namaExternal", true).then(function(dat){
$scope.listjeniskasus= dat.data;
});
IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
$scope.listpenanggungjawab= dat.data;
});
	}
		]);
});