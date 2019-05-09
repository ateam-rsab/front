 define(['initialize'], function(initialize) {
		'use strict';
		 initialize.controller('DataPesertaYayasanCtrl', ['$rootScope', '$scope', 'ModelItem', 'DataPerusahaanBekerjasama' ,'TampilDataPerusahaanBekerjasama', 'ManageSarpras', '$state',
	        function($rootScope, $scope, ModelItem,DataPerusahaanBekerjasama,TampilDataPerusahaanBekerjasama, ManageSarpras, $state) {
			$scope.item = {};
			$scope.item.jenisKelamin = {id : 1}

		    $scope.OnInit = function(argument) {
				var nomor = 1;
				DataPerusahaanBekerjasama.getOrderList("data-perusahaan-yang-bekerjasama/get-asuransi-1", true).then(function(dat){
					$scope.sourceOrder = dat.data.data;
					for(var i=0; i<$scope.sourceOrder.length; i++){
						$scope.sourceOrder[i].no = nomor++;
						$scope.sourceOrder[i].jangkaAwal = new moment($scope.sourceOrder[i].jangkaAwal).format("DD-MM-YYYY");
						$scope.sourceOrder[i].jangkaAkhir = new moment($scope.sourceOrder[i].jangkaAkhir).format("DD-MM-YYYY"); 
					}
				})
		     }
			 $scope.OnInit();


			$scope.OnCombo = function(argument) {
				DataPerusahaanBekerjasama.getOrderList("data-peserta-perusahaan-yang-bekerja-sama/get-data-yayasan", true).then(function(dat){
			     	$scope.sourceListYayasan = dat.data.data;
			    })
			}
			$scope.OnCombo();
			
		   $scope.mainGridOptions = {
	            pageable: true,
	            scrollable: true,
	            selectable: "row"
	        };				

			$scope.columndataMasterDataPerusahaan= [
			{
				"field": "no",
				"title": "<h3 align=center>No<h3>",
				"width": "20px"
		    }, 			
		    {
				"field": "namaAsuransi",
				"title": "<h3 align=center>Nama Asuransi<h3>",
				"width": "100px"
		    }, 
		    {
				"field": "jangkaAwal",
				"title": "<h3 align=center>Jangka Awal<h3>",
				"width": "100px"	
	        }, 
		    {
				"field": "jangkaAkhir",
				"title": "<h3 align=center>Jangka Akhir<h3>",
				"width": "100px"	
	        }, 
	        {
				"field": "namaAsuransi",
				"title": "<h3 align=center>Nama Asuransi<h3>",
				"width": "100px" 
	        }, 
	        {
				"field": "email",
				"title": "<h3 align=center>Email<h3>",
				"width": "100px"
	        }, 
	        {
				"field": "caraPenagihan	",
			    "title": "<h3 align=center>Cara Penagihan<h3>",
				"width": "100px"			
		    }];
			
			$scope.batal = function(){
			  $scope.item= {};
			}

			$scope.cari = function(){
				TampilDataPerusahaanBekerjasama.getOrderList("data-peserta-perusahaan-yang-bekerja-sama/get-peserta-by-data-perusahaan/" + $scope.item.noRec.noRec + "/").then(function(dat){
					$scope.sourceOrder = dat.data.data;
		        });	
			}
		
			 $scope.Save = function() {
	                var data = {
							      "jenisKelamin": {
							            "id": $scope.item.jenisKelamin
							      },
							     "dataPerusahaanYangBekerjaSama" : {"noRec": $scope.item.yayasan.noRec},
							      "namaPeserta": $scope.item.namaPeserta,
							      "jumlahKeluarga": $scope.item.jumlahKeluarga,
							      "plafonYangDijamin": $scope.item.plafonYangDijamin,
							      "alamat": $scope.item.alamat,
							      "noTlp": $scope.item.noTlp,
							      "statusEnabled" : true
							  }

		         ManageSarpras.saveDataUji(data, "data-peserta-perusahaan-yang-bekerja-sama/save-data-peserta-perusahaan-yang-bekerja-sama/").then(function (e) {
					$scope.OnInit();
					$scope.item = {};
					$scope.ModeEdit == false
				 });
		   };
		}
	]);
});




//========================================================================================================================
//define column untuk grid
// var arrColumnGridResepElektronik = [{
/*$state.go('dashboardpasien.TandaVital', {
noCM: $scope.noCM
});*/

//define column untuk grid
//MasterLinen.getOrderList("service/list-generic/?view=JenisLinen&select=*").then(function(dat){
//	$scope.sourceOrder = dat;
//});
// $scope.dataSasaranStrategis = new kendo.data.DataSource({
// 	data: [
// 	{
// 		"kodeSasaranStrategis": "001",
// 		"sasaranStrategis": "Terpenuhinya SDM yang kompeten"
// 	}
// 	]
// });


// 			var DataPerusahaan = function(){
// 	DataPerusahaanBekerjasama.getOrderList("data-perusahaan-yang-bekerjasama/get-yayasan-yang-bekerja-sama/", true).then(function(dat){
// 	   $scope.ListDataPerusahaanBekerjasama = dat.data.data;
// 	});
// }
// DataPerusahaan();

// var init = function(){			
// 	TampilDataPerusahaanBekerjasama.getOrderList("data-peserta-perusahaan-yang-bekerja-sama/find-all-data-peserta/").then(function(dat){
// 		$scope.sourceOrder = dat.data.data;
// 	});
// };
//    init();	
// ManageSarpras.saveDataPerusahaanBekerjasama(ModelItem.beforePost($scope.item)).then(function (e) {
// $scope.item= {};
// init();  
// });