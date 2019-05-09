define(['initialize'], function(initialize) {
'use strict';
initialize.controller('DistribusiRKAKLctrl', ['$q', '$rootScope', '$scope',
function($q, $rootScope, $scope) {
$scope.dataVOloaded = true;
$scope.now = new Date();

$scope.dataListTahun = new kendo.data.DataSource({
	data : [{"FieldTahun":"2017"}]
});

$scope.dataListStatusAnggaran = new kendo.data.DataSource({
	data : [{"NamaStatusAnggaran":"Definitif"},{"NamaStatusAnggaran":"Indikatif"}]
});
$scope.dataListStatusDistribusi = new kendo.data.DataSource({
	data : [{"Nama":"Distribusi"},{"Nama":"Belum Distribusi"},{"Nama":"Pending"}]
});


$scope.dataGrid = new kendo.data.DataSource({
data: [{"No":"1","tahun":"2016","statusPenyusunan":"Definitif","statusDistribusi":"Distribusi"},
{"No":"2","tahun":"2017","statusPenyusunan":"Indikatif","statusDistribusi":"Belum Distribusi"}]
});
$scope.columnGrid = [
{
"field": "No",
"title": "No",
"width":"50px"
},
{
"field": "tahun",
"title": "Tahun Anggaran",
"width":"150px"
},
{
"field": "statusPenyusunan",
"title": "Status Penyusunan",
"width":"150px"
},
{
"field": "statusDistribusi",
"title": "Status Distribusi",
"width":"150px"
}
];

}
]);
});