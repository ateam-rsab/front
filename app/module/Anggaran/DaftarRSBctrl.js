define(['initialize'], function(initialize) { 
'use strict';
initialize.controller('DaftarRSBctrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','$state',
function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,$state) {
$scope.dataVOloaded = true;
$scope.now = new Date();



$scope.dataDaftarRSB = new kendo.data.DataSource({
data: [{"No":"1","Tahun":"2015","Keterangan":"-","Status":"Penyusunan"}]
});
$scope.columnDaftarRSB = [
{
"field": "No",
"title": "No"
},
{
"field": "Tahun",
"title": "Tahun"
},
{
"field": "Keterangan",
"title": "Keterangan"
},
{
"field": "Status",
"title": "Status"
}
];

$scope.Detail = function(){
	$state.go('DetailRSB');
};

}
]);
});