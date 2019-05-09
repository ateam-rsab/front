define(['initialize'], function(initialize) { 
'use strict';
initialize.controller('DaftarRBActrl', ['$q', '$rootScope', '$scope', '$state', 'ModelItemAkuntansi', 'ManageAkuntansi',
function($q, $rootScope, $scope,$state , modelItemAkuntansi, manageAkuntansi) {
$scope.dataVOloaded = true;
$scope.now = new Date();



$scope.dataGrid = new kendo.data.DataSource({
data: [{"No":"1","Tahun":"2015","Keterangan":"-","Status":"Penyusunan"}]
});
$scope.columnGrid = [
{
"field": "No",
"title": "No","width": "50px"
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
	$state.go('DetailRBA');
};

}
]);
});