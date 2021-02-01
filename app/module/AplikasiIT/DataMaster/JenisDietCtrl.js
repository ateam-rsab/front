////header nya
initialize.controller('JenisDietCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisDiet", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisDiet;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



///colom tabel
// ,
// {
// 	"title" : "Action",
// 	"width" : "200px",
// 	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
// "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
// }
// ];
$scope.mainGridOptions = { 
 pageable: true,
 columns: $scope.columnJenisDiet,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisDiet = current.jenisDiet;
$scope.item.kdJenisDiet = current.kdJenisDiet;
$scope.item.qJenisDiet = current.qJenisDiet;
$scope.item.keterangan = current.keterangan;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisDiet&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisDiet&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "JenisDiet",
	"listField": {
"jenisDiet": $scope.item.jenisDiet,
"kdJenisDiet": $scope.item.kdJenisDiet,
"qJenisDiet": $scope.item.qJenisDiet,
"keterangan": $scope.item.keterangan,
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
 "class": "JenisDiet",
	"listField": {
"jenisDiet": $scope.item.jenisDiet,
"kdJenisDiet": $scope.item.kdJenisDiet,
"qJenisDiet": $scope.item.qJenisDiet,
"keterangan": $scope.item.keterangan,
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
/////end
