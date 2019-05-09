define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('JenisKartuDetailCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisKartuDetail", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisKartuDetail;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnJenisKartuDetail = [
{
"field": "No",
"title": "No"
},
{
"field": "nameOnCard",
"title": "name On Card"
},
{
"field": "cardNumber",
"title": "card Number"
},
{
"field": "jenisKartu",
"title": "jenis Kartu"
},
{
"field": "jenisKartuId",
"title": "jenis Kartu Id"
},
{
"field": "cardExpired",
"title": "card Expired"
},
{
"field": "securityCode",
"title": "security Code"
},
{
"field": "billingAddressAlamat",
"title": "billing Address Alamat"
},
{
"field": "kodePost",
"title": "kode Post"
},
{
"field": "kecamatan",
"title": "kecamatan"
},
{
"field": "kotaKabupaten",
"title": "kota Kabupaten"
},
{
"field": "propinsi",
"title": "propinsi"
},
{
"field": "negara",
"title": "negara"
},
{
"field": "negaraiId",
"title": "negarai Id"
},
{
"field": "emailAddress",
"title": "email Address"
},
{
"field": "phoneNumber",
"title": "phone Number"
},
{
"field": "antrianPasienRegistrasiDetails",
"title": "antrian Pasien Registrasi Details"
},
{
"field": "id",
"title": "id"
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
 columns: $scope.columnJenisKartuDetail,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.nameOnCard = current.nameOnCard;
$scope.item.cardNumber = current.cardNumber;
$scope.item.jenisKartu = current.jenisKartu;
$scope.item.jenisKartuId = current.jenisKartuId;
$scope.item.cardExpired = current.cardExpired;
$scope.item.securityCode = current.securityCode;
$scope.item.billingAddressAlamat = current.billingAddressAlamat;
$scope.item.kodePost = current.kodePost;
$scope.item.kecamatan = current.kecamatan;
$scope.item.kotaKabupaten = current.kotaKabupaten;
$scope.item.propinsi = current.propinsi;
$scope.item.negara = current.negara;
$scope.item.negaraiId = current.negaraiId;
$scope.item.emailAddress = current.emailAddress;
$scope.item.phoneNumber = current.phoneNumber;
$scope.item.antrianPasienRegistrasiDetails = current.antrianPasienRegistrasiDetails;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisKartuDetail&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisKartuDetail&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "JenisKartuDetail",
	"listField": {
"nameOnCard": $scope.item.nameOnCard,
"cardNumber": $scope.item.cardNumber,
"jenisKartu": $scope.item.jenisKartu,

"cardExpired": $scope.item.cardExpired,
"securityCode": $scope.item.securityCode,
"billingAddressAlamat": $scope.item.billingAddressAlamat,
"kodePost": $scope.item.kodePost,
"kecamatan": $scope.item.kecamatan,
"kotaKabupaten": $scope.item.kotaKabupaten,
"propinsi": $scope.item.propinsi,
"negara": $scope.item.negara,

"emailAddress": $scope.item.emailAddress,
"phoneNumber": $scope.item.phoneNumber,
"antrianPasienRegistrasiDetails": $scope.item.antrianPasienRegistrasiDetails,
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

 $scope.edit = function()
  {	
   var data = {
 "class": "JenisKartuDetail",
	"listField": {
"nameOnCard": $scope.item.nameOnCard,
"cardNumber": $scope.item.cardNumber,
"jenisKartu": $scope.item.jenisKartu,

"cardExpired": $scope.item.cardExpired,
"securityCode": $scope.item.securityCode,
"billingAddressAlamat": $scope.item.billingAddressAlamat,
"kodePost": $scope.item.kodePost,
"kecamatan": $scope.item.kecamatan,
"kotaKabupaten": $scope.item.kotaKabupaten,
"propinsi": $scope.item.propinsi,
"negara": $scope.item.negara,
"negaraiId": $scope.item.negaraiId,
"emailAddress": $scope.item.emailAddress,
"phoneNumber": $scope.item.phoneNumber,
"antrianPasienRegistrasiDetails": $scope.item.antrianPasienRegistrasiDetails,
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
IPSRSService.getFieldListData("JenisKartu&select=id,namaExternal", true).then(function(dat){
$scope.listjeniskartu= dat.data;
});
IPSRSService.getFieldListData("Negara&select=id,namaExternal", true).then(function(dat){
$scope.listnegara= dat.data;
});
IPSRSService.getFieldListData("Set&select=id,namaExternal", true).then(function(dat){
$scope.listantrianpasienregistrasidetails= dat.data;
});
}
]);
});