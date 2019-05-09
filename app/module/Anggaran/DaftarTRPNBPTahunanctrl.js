define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarTRPNBPTahunanctrl', ['$q', '$rootScope', '$scope','$state', 'ModelItemAkuntansi', 'ManageAkuntansi','FindPasien',
		function($q, $rootScope, $scope, $state, modelItemAkuntansi, manageAkuntansi,findPasien) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();



			$scope.dataDaftarTRPNBPTahunan = new kendo.data.DataSource({
				data: [{"No":"1","tahun":"2016","grandTotal":0,"Status":"-"},{"No":"2","tahun":"2017","grandTotal":0,"Status":"-"}
				]
			});

// debugger;
// findPasien.getDataDaftarTRPNBP().then(function(data){
// 	debugger;/**/
// 	$scope.dataDaftarTRPNBPTahunan=data.data.result;
// });
// debugger;

// $scope.Cari=function(){
// 	var tglAwal1=dateHelper.formatDate($scope.item.tglAwal,"YYYY-MM-DD")
// 	var tglAkhir1=dateHelper.formatDate($scope.item.tglAkhir,"YYYY-MM-DD")
// 	debugger;
// 	findPasien.getDataDaftarTRPNBP().then(function(data){
// 		debugger;
// 	$scope.dataDaftarTRPNBPTahunan=data.data.result;
// });
// }

$scope.columnDaftarTRPNBPTahunan = [
{
	"field": "No",
	"title": "No",
	"width": "50px"
},
{
	"field": "tahun",
	"title": "Tahun",
	"width": "150px"
},
{
	"field": "grandTotal",
	"title": "Grand Total",
	"width": "200px",
	"template": "<span class='style-right'>{{formatRupiah('#: grandTotal #', 'Rp.')}}</span>"
},
{	
	"field": "status",
	"title": "Status",
	"width": "150px"
}
];
$scope.formatRupiah = function(value, currency) {
	return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
};

$scope.Detail = function(){
	$state.go('PenyusunanTRPNBP')
}

}
]);
});