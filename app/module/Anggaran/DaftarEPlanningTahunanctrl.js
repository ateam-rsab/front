define(['initialize'], function(initialize) {
'use strict';
initialize.controller('DaftarEPlanningTahunanctrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','ManageSarpras','DateHelper','$http','$state',
function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,ManageSarpras,dateHelper,$http,$state) {
$scope.dataVOloaded = true;
$scope.now = new Date();
$scope.item={};
$scope.dataPasienSelected = {};

//isi combobox
ManageSarpras.getOrderList("k3-checklist-facillity-sefety/get-k3-ruangan").then(function(data){
	$scope.ListRuangan=data.data.data.listRuangan;
})

//isi grid
ManageSarpras.getOrderList("k3-checklist-facillity-sefety/get-k3-ruangan").then(function(data){
	//cara 1
	$scope.dataDataRuangan=data.data.data.listRuangan 

	//cara 2
	// $scope.dataDataRuangan=new kendo.data.DataSource({
	// data:[

	// ]
	// });
	// data.data.data.listRuangan.forEach(function(dat){
	// 	$scope.dataDataRuangan.add(dat)	
	// })
	
});
var tahunPriode =  dateHelper.formatDate($scope.item.periodeTahun, 'YYYY');
           /* findPasien.getDataDetail(tahunPriode).then(function(data) {*/
            $http.get('module/Anggaran/dummy_json/DaftarRKAKL.json').success(function(data) {
            	debugger;
                var arraydata = data.result;
                $scope.dataDaftarEPlanning = new kendo.data.DataSource({
                    data: arraydata,
                    total: data.length,
                    serverPaging: false,
                    pageSize: 10,
                    schema:  {
                        model: {
                            fields: {
                                tanggalMasuk: { type: "date" },
                                tanggalPulang: { type: "date" }
                            }
                        }
                    }
                });
            })

$scope.dataDaftarEPlanning = new kendo.data.DataSource({

	data: $scope.item.dataArraySatu,
	pageSize: 10,
	});
$scope.columnDaftarEPlanning = [
                {
                    "field": "no",
                    "title": "No",
                    "width":"150px"
                },
                {
                    "field": "tahun",
                    "title": "Tahun"
                },
                {
                    "field": "status",
                    "title": "Status"
                },
                {
                    "field": "riwyat",
                    "title": "Riwayat"
                },
                {
                    "field": "statusDistribusi",
                    "title": "Status Distribusi"
                }
            ];

//select di grid isi ke textbox
$scope.selectedData=function(selectedRuangan){
	$scope.item.txtRuangan=selectedRuangan.namaRuangan
}
$scope.Edit = function() {
	$state.go('PenyusunanEPlanning')
}

$scope.Detail = function(){
    $state.go('PenyusunanEPlanning')
}

//set nama kolom di grid
$scope.columnDataRuangan = [
{
"field": "ruanganId",
"title": "Kode"
},
{
"field": "namaRuangan",
"title": "Nama Ruangan"
}
];

//set hardcode grid
// ManageSarpras.getOrderList("service/list-generic/?view=Parameter&select=*").then(function(data){
// 	$scope.dataDaftarEPlanning=data.data
// });
// // $scope.dataDaftarEPlanning = new kendo.data.DataSource({
// // data: [{"No":"1","Tahun":"2015","Total":"0","Status":"-"}]
// // });
// //set nama kolom grid
// $scope.columnDaftarEPlanning = [
// {
// "field": "kode",
// "title": "No"
// },
// {
// "field": "kode",
// "title": "Tahun"
// },
// {
// "field": "kode",
// "title": "Total"
// },
// {
// "field": "nama",
// "title": "Status"
// }
// ];

}
]);
});