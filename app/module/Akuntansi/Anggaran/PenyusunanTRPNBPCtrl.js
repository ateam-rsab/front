define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PenyusunanTRPNBPCtrl', ['$q', '$rootScope', '$scope','FindPasien','DateHelper','ManagePasien','ModelItem',
function($q, $rootScope, $scope,findPasien,dateHelper,ManagePasien,ModelItem) {
$scope.dataVOloaded = true;
$scope.now = new Date();
$scope.item={};
$scope.item.tglAwal = new Date();
$scope.item.tglAkhir = new Date();
$scope.dataPasienSelected = {};
$scope.dataListTahun=new kendo.data.DataSource({
	data:[{"FieldTahun":"2015"},{"FieldTahun":"2016"},{"FieldTahun":"2017"},{"FieldTahun":"2018"},{"FieldTahun":"2019"},
	{"FieldTahun":"2020"},{"FieldTahun":"2021"},{"FieldTahun":"2022"},{"FieldTahun":"2023"},{"FieldTahun":"2024"},
	{"FieldTahun":"2025"},{"FieldTahun":"2026"},{"FieldTahun":"2027"},{"FieldTahun":"2028"},{"FieldTahun":"2029"},{"FieldTahun":"2030"}]
});
$scope.dataStatus = [{"id":1,"Status":"PENYUSUNAN"},{"id":2,"Status":"Selesai"}]

findPasien.getDataTRPNBP($scope.item.tglAwal,$scope.item.tglAkhir).then(function(data){
	$scope.dataPenyusunanTRPNBP=data.data.result;
	/*for (var i = 0; i < $scope.dataPenyusunanTRPNBP.length; i++) {
		$scope.item.prosentase = $scope.dataPenyusunanTRPNBP[i].prosentase
	}*/
	
});
$scope.Cari = function() {
	debugger;
	findPasien.getDataTRPNBPHead($scope.item.tahun.FieldTahun).then(function(data){	
	debugger;
	$scope.item.tglAwal = dateHelper.formatDate(data.data.result[0].periodeAwal,"DD-MM-YYYY");
	$scope.item.tglAkhir = dateHelper.formatDate(data.data.result[0].periodeAkhir,"DD-MM-YYYY");
	$scope.item.prosentase = data.data.result[0].prosentase;
	$scope.item.status = {id:data.data.result[0].id,"Status":data.data.result[0].status}
	;
	/*for (var i = 0; i < $scope.dataPenyusunanTRPNBP.length; i++) {
		$scope.item.prosentase = $scope.dataPenyusunanTRPNBP[i].prosentase
	}*/
	
});
}

debugger;

$scope.loadData=function(){
	var tglAwal1=dateHelper.formatDate($scope.item.tglAwal,"YYYY-MM-DD")
	var tglAkhir1=dateHelper.formatDate($scope.item.tglAkhir,"YYYY-MM-DD")
	debugger;
	findPasien.getDataTRPNBP(tglAwal1,tglAkhir1).then(function(data){
		debugger;
	$scope.dataPenyusunanTRPNBP=data.data.result;
	for (var i = 0; i < $scope.dataPenyusunanTRPNBP.length; i++) {
		$scope.dataPenyusunanTRPNBP[i].totalTarget =$scope.dataPenyusunanTRPNBP[i].totalRealisasi + (($scope.dataPenyusunanTRPNBP[i].totalRealisasi * $scope.item.prosentase)/100);
		$scope.dataPenyusunanTRPNBP[i].volumeTarget =$scope.dataPenyusunanTRPNBP[i].totalTarget/$scope.dataPenyusunanTRPNBP[i].harga;
	}
});
}


$scope.columnPenyusunanTRPNBP = [
{
"field": "kdProduk",
"title": "Kode Produk"
},
{
"field": "namaProduk",
"title": "Nama Produk"
},
{
"field": "volumeRealisasi",
"title": "Volume Realisasi"
},
{
"field": "harga",
"title": "Harga",
"template": "<span class='style-right'>{{formatRupiah('#: harga #', 'Rp.')}}</span>"
},

{
"field": "totalRealisasi",
"title": "Total",
"template": "<span class='style-right'>{{formatRupiah('#: totalRealisasi #', 'Rp.')}}</span>"
},
{
"field": "volumeTarget",
"title": "Volume Target"
},
{
"field": "totalTarget",
"title": "Total Target",
"template": "<span class='style-right'>{{formatRupiah('#: totalTarget #', 'Rp.')}}</span>"
}
];

$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			};

$scope.Simpan = function() {
	debugger;
	$scope.item.tahun = $scope.item.tahun.FieldTahun
	$scope.item.periodeAwal = dateHelper.formatDate(ModelItem.beforePost($scope.item.tglAwal),"YYYY-MM-DD"); 
	$scope.item.periodeAkhir = dateHelper.formatDate(ModelItem.beforePost($scope.item.tglAkhir),"YYYY-MM-DD"); 
	$scope.item.status = $scope.item.status.Status
	ManagePasien.savePenyusunanTRPNB(ModelItem.beforePost($scope.item)).then(function(e) {
	})
	


}
}
]);
});