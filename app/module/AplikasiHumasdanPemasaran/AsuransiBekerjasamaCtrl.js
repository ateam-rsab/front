define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('AsuransiBekerjasamaCtrl', ['$rootScope', '$scope', 'ModelItem','AsuransiBekerjasama', 'ManageSarpras','DateHelper', '$document', 'R','$state','$mdDialog',
		function($rootScope, $scope, ModelItem,AsuransiBekerjasama,ManageSarpras,DateHelper, $document, r,$state, $mdDialog) {		
			$scope.title = "Resep elektronik";			
			$scope.dataVOloaded = true;
            $scope.item={};
            $scope.now = new Date()
            $scope.item.jangkaAwal = $scope.now;
            $scope.item.jangkaAkhir = $scope.now;
            $scope.item.tanggal;

			AsuransiBekerjasama.getOrderList("data-perusahaan-yang-bekerjasama/get-rekanan-asuransi", true).then(function(dat){
				$scope.ListAsuransiBekerjasama = dat.data.data;
			});

			$scope.OnInit = function(argument) {
				$scope.nomor = 1;
				AsuransiBekerjasama.getOrderList("data-perusahaan-yang-bekerjasama/get-asuransi-1", true).then(function(dat){
					$scope.dataSourceAsuransi = dat.data.data;
					for(var i=0; $scope.dataSourceAsuransi.length; i++){
						$scope.dataSourceAsuransi[i].no = $scope.nomor+++".";
						$scope.dataSourceAsuransi[i].jangkaAkhir = new moment($scope.dataSourceAsuransi[i].jangkaAkhir).format("YYYY-MM-DD");
						$scope.dataSourceAsuransi[i].jangkaAwal = new moment($scope.dataSourceAsuransi[i].jangkaAwal).format("YYYY-MM-DD");
					}
				})
				
			}
			$scope.OnInit();

		   $scope.$watch('item.pencarian', function(e){
			 	var isi = e;
			 	var grid = $("#kGrid").data("kendoGrid");
			 	grid.dataSource.query({
			 		page : 1,
			 		pageSize : 20,
			 		filter:{
			 			logic:"or",
			 			filters :[{field : "noPks", operator:"contains", value : isi},
			 			{field : "anakPerusahaan", operator:"contains", value : isi},
			 			{field: "namaAsuransi", operator: "contains", value : isi}
			 			]
			 		}
			 	})
			 })

		   $scope.Refresh = function(){
		   	$scope.item = {};
		   	$scope.item.jangkaAwal = new Date();
		   	$scope.item.jangkaAkhir = new Date();
		   	$scope.ClearCari();
		   }

		   $scope.ClearCari = function() {
		   	$scope.item.pencarian = "";
		   	var grid = $("#kGrid").data("kendoGrid");
		   	grid.dataSource.filter({});
		   
		   }



			$scope.mainGridOptions = {
                pageable: true,
                scrollable: true,
                selectable: "row"
            };

			$scope.columnasuransi = [
			{
				"field" : "no",
				"title" : "<h3 align=center>No.<h3>",
				 "attributes": {
     			  "class": "table-cell",
      						style: "text-align: center; font-size: 14px"
    			},
				"width" : "15px"
			},			
			{
				"field" : "noPks",
				"title" : "<h3 align=center>No Pks<h3>",
				"width" : "30px"
			},			
			{
				"field" : "jangkaAwal",
				"title" : "<h3 align=center>Jangka Awal<h3>",
				"width" : "30px",
				 "attributes": {
     			  "class": "table-cell",
      						style: "text-align: center; font-size: 14px"
    			}
			},			
			{
				"field" : "jangkaAkhir",
				"title" : "<h3 align=center>Jangka Akhir<h3>",
				"width" : "30px",
				 "attributes": {
     			  "class": "table-cell",
      						style: "text-align: center; font-size: 14px"
    			}
			},			
			{
				"field" : "namaAsuransi",
				"title" : "<h3 align=center>Nama Asuransi<h3>",
				"width" : "80px"
			},			
			{
				"field" : "anakPerusahaan",
				"title" : "<h3 align=center>Nama Anak Perusahaan<h3>",
				"width" : "40px"
			},			
			{
				"field" : "jumlahKaryawan",
				"title" : "<h3 align=center>Jumlah Nasabah<h3>",
				"width" : "40px"
			},			
			{
				 "title": "<h3 align=center>Action</h3>",
			      "width" : "20px",
			     "template" : "<button class='btnHapus' ng-model='currents' ng-click='disableData(currents)'>Disable</button>"
		    }]


			
			$scope.listDataJenisPks = [
             {
             "id":1, "JenisPks":"Pelayanan Kesehatan"
             },
             {
             "id":2, "JenisPks":"PONEK"
             },
             {
              "id":3, "JenisPks":"Laborato`rium Kesehatan"
             },
             {
              "id":4, "JenisPks":"Pelayanan kesehatan Rujukan"
             },
             {
              "id":5, "JenisPks":"Sewa Lahan"
             },
             {
              "id":6, "JenisPks":"Lainnya"
             },

			 ]


			 $scope.listJenisPenagihan = [
             {
             "id":1, "JenisPenagihan":"Dijamin RS"
             },
             {
             "id":2, "JenisPenagihan":"Tidak dijamin RS"
             },
			 ]

			 $scope.now = new Date();
             $scope.pindah = function(){
				 
				$state.go("MonitoringStatusPks2");
				 
			 }
			 
			 $scope.batal = function()
			{
			  $scope.item= {};
			}

			 $scope.Save=function(){			
			   for(var i=0; i<$scope.dataSourceAsuransi.length; i++){
				   if($scope.dataSourceAsuransi[i].idAsuransi == $scope.item.rekanan.idRekanan){
						$scope.update = true;
					}
				};

				if($scope.update == true){
				  	  var confirm = $mdDialog.confirm()
	                   .title('Peringatan!')
	                   .textContent($scope.item.rekanan.namaRekanan+" Sudah Ada, Update?")
	                   .ariaLabel('Lucky day')
	                   .ok('Ya')
	                   .cancel('Tidak')
	                   $mdDialog.show(confirm).then(function(){
	                   	 $scope.update = false;
	                   	 return $scope.simpan()
	                   })
				 }else{
				  	$scope.simpan();
				 }
			 };

			 $scope.disableData = function(){
			 	debugger
			   var Getall = this.dataItem
		       var data = {
	                "noPks": Getall.noPks,
	                "rekanan": {
								 "namaRekanan": Getall.namaAsuransi,
							     "id": Getall.idAsuransi
								},
	                "anakPerusahaan": Getall.anakPerusahaan,
	                "jumlahKaryawan": Getall.jumlahKaryawan,
	                "plafon": Getall.plafon,
	                "caraPenagihan": Getall.caraPenagihan,
	                "alamatPenagihan": Getall.alamatPenagihan,
	                "contactPerson": Getall.contactPerson,
	                "jangkaAwal": Getall.jangkaAwal,
	                "jangkaAkhir": Getall.jangkaAkhir,
	                "namaFilePks": Getall.namaFilePks,
	                "noTelpFax": Getall.noTelpFax,
	                "email": Getall.email,
	                "statusEnabled" : false
	             }
			    ManageSarpras.saveDataUji(data, "data-perusahaan-yang-bekerjasama/save-data-perusahaan-yang-bekerjasama/").then(function (e) {
					$scope.OnInit();
					$scope.item = {};
					$scope.item.jangkaAwal = new Date();
					$scope.item.jangkaAkhir = new Date();
					$scope.ModeEdit == false
				 });
			}

			$scope.simpan = function(){
			   var data = {
	                "noPks": $scope.item.noPks,
	                "rekanan": {
								 "namaRekanan": $scope.item.rekanan.namaRekanan,
							     "id": $scope.item.rekanan.idRekanan
								},
	                "anakPerusahaan": $scope.item.anakPerusahaan,
	                "jumlahKaryawan": $scope.item.jumlahKaryawan,
	                "plafon": $scope.item.plafon,
	                "caraPenagihan": $scope.item.caraPenagihan,
	                "alamatPenagihan": $scope.item.alamatPenagihan,
	                "contactPerson": $scope.item.contactPerson,
	                "tanggal": $scope.item.tanggal,
	                "jangkaAwal": $scope.item.jangkaAwal,
	                "jangkaAkhir": $scope.item.jangkaAkhir,
	                "namaFilePks": $scope.item.namaFilePks,
	                "noTelpFax": $scope.item.noTelpFax,
	                "email": $scope.item.email,
	                "statusEnabled" : true
	             }
			    ManageSarpras.saveDataUji(data, "data-perusahaan-yang-bekerjasama/save-data-perusahaan-yang-bekerjasama/").then(function (e) {
					$scope.OnInit();
					$scope.item = {};
					$scope.item.jangkaAwal = new Date();
					$scope.item.jangkaAkhir = new Date();
					$scope.ModeEdit == false
				 });
			}
		}
	]);
});

// ManageSarpras.saveAsuransiBekerjasama($scope.item).then(function(e) {
// 	 $scope.item= {};
// 	 $Scope.OnInit();
//             });