define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PerusahaanBekerjasamaCtrl', ['$rootScope', '$scope', 'ModelItem','PerusahaanBekerjasama', 'ManageSarpras','DateHelper', '$document', 'R','$mdDialog',
		function($rootScope, $scope, ModelItem,PerusahaanBekerjasama,ManageSarpras,DateHelper, $document, r, $mdDialog) {		
			$scope.title = "Resep elektronik";
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.jangkaAwal = new Date();
			$scope.item.jangkaAkhir = new Date();
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;			
			$scope.dataVOloaded = true;

            $scope.listDataJenisPks = [
             {
             "id":1, "JenisPks":"Pelayanan Kesehatan"
             },
             {
             "id":2, "JenisPks":"PONEK"
             },
             {
              "id":3, "JenisPks":"Laboratorium Kesehatan"
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

			 $scope.$watch('item.pencarian', function(e){
			 	var isi = e;
			 	var grid = $("#kGrid").data("kendoGrid");
			 	grid.dataSource.query({
			 		page : 1,
			 		pageSize : 20,
			 		filter:{
			 			logic:"or",
			 			filters :[{field : "noPks", operator:"contains", value : isi},
			 			{field : "namaRekanan", operator:"contains", value : isi},
			 			{field: "alamatPenagihan", operator: "contains", value : isi},
			 			{field: "caraPenagihan", operator:"contains", value:isi}
			 			]
			 		}
			 	})
			 })

			 $scope.ClearCari = function(){
			 	$scope.item.pencarian = "";
			 	var grid = $("#kGrid").data("kendoGrid");
			 	grid.dataSource.filer({});
			 }


			 $scope.CariPerusahaanBekerjasama = function(){
			 	var q = e;
			 	var DataGrid =$("#kGrid").data("kendoGrid");
			 	DataGrid.dataSource.query({
			 		page : 1,
			 		pageSize : 20,
			 		filter : {
			 			logic : "or",
			 			filters :[{field : "noPks", operator : "contains", value : q},
			 					 {field  : "namaRekanan", operator : "contains", value : q},
			 					 {field  : "alamatPenagihan", operator : "contains", value : q},
			 					 {field  : "caraPenagihan", operator : "contains", value : q}
			 					 ]
			 		}
			 	})
			 }

			 
			 $scope.Cari = function(e){
			 	var q = e;
			 	var DataGrid =$("#kGrid").data("kendoGrid");
			 	DataGrid.dataSource.query({
			 		page : 1,
			 		pageSize : 20,
			 		filter : {
			 			logic : "or",
			 			filters :[{field : "noPks", operator : "contains", value : q},
			 					 {field: "namaRekanan", operator : "contains", value : q},
			 					 {field: "alamatPenagihan", operator : "contains", value : q},
			 					 {field : "caraPenagihan", operator : "contains", value : q}
			 					 ]

			 		}
			 	})

			 }

			 $scope.ClearCari = function(){
			 	$scope.item.pencarian = "";
			 	var gridData = $("#kGrid").data("kendoGrid");
			 	gridData.dataSource.filter({});
			 }


			 $scope.klik = function(dataSelected){
			 	toastr.info("1 Data Di Pilih")
			 	$scope.noRec = dataSelected.noRec;
			 	$scope.item.alamatPenagihan =  dataSelected.alamatPenagihan;
				$scope.item.caraPenagihan = dataSelected.caraPenagihan;
				$scope.item.contactPerson = dataSelected.contactPerson
				$scope.item.email = dataSelected.email
				$scope.item.rekanan =  {
					namaRekanan : dataSelected.namaRekanan,
					id : dataSelected.idRekanan
				},
				$scope.item.jangkaAwal = dataSelected.jangkaAwal; 
				$scope.item.jangkaAkhir = dataSelected.jangkaAkhir;
				$scope.item.jumlahKaryawan = dataSelected.jumlahKaryawan;
				$scope.item.namaFilePks = dataSelected.namaFilePks;
				$scope.item.noPks = dataSelected.noPks
				$scope.item.noRec = dataSelected.noRec
				$scope.item.noTelpFax = dataSelected.noTelpFax
				$scope.item.parent = dataSelected.parent = dataSelected.parent;
				$scope.item.pathFile = dataSelected.pathFile; 
				$scope.item.plafon = dataSelected.plafon;
				$scope.item.uid = dataSelected.uid;
				$scope.item.JenisPks = {id:dataSelected.idJenisRekanan,JenisPks :""};
			 }


			$scope.mainGridOptions = {
                pageable: true,
                scrollable: true,
                selectable: "row"
            };

            $scope.columnPermohonanPerubahanStatus = [
				{ "field":"no",
				  "title":"<h3 align=center>No</h3>", 
				  "width":"20px",
				  "attributes": {
     			  "class": "table-cell",
      						style: "text-align: center; font-size: 14px"
    			}
				},
				{ "field":"noPks",
				  "title":"<h3 align=center>No Pks</h3>", 
				  "width":"30px" 
				},	
				{ "field":"jangkaAwal",
				  "title":"<h3 align=center>Jangka Awal</h3>", 
				  "width":"60px" 
				},
				{ "field":"jangkaAkhir",
				  "title":"<h3 align=center>Jangka Akhir</h3>", 
				  "width":"60px" 
				},							
				{ "field":"namaRekanan",
				  "title":"<h3 align=center>Nama Rekanan</h3>", 
				  "width":"60px" 
				},
				{ "field":"alamatPenagihan",
				  "title":"<h3 align=center>Alamat</h3>", 
				  "width":"50px" 
				},				
				{ "field":"email",
				  "title":"<h3 align=center>Email</h3>", 
				  "width":"50px" 
				},		
				{ "field":"caraPenagihan",
				  "title":"<h3 align=center>Cara Penagihan</h3>", 
				  "width":"50px" 
				},								
				{ "field":"noTelpFax",
				  "title":"<h3 align=center>No Telepon Fax</h3>", 
				  "width":"50px" 
				},				
				{ "field":"contactPerson",
				  "title":"<h3 align=center>Kontak Person</h3>", 
				  "width":"50px" 
				},				
                {
				 "title": "<h3 align=center>Action</h3>",
			      "width" : "40px",
			     "template" : "<button class='btnHapus' ng-model='currents' ng-click='disableData(currents)'>Disable</button>"
		     	}]

			
				$scope.Oniinit = function(){
				 $scope.number = 1;
				 PerusahaanBekerjasama.getOrderList("data-perusahaan-yang-bekerjasama/get-data-perusahaan-all", true).then(function(dat){
						$scope.dataSourcePerusahaan = dat.data.data;
						for(var i=0; i<$scope.dataSourcePerusahaan.length; i++){
							$scope.dataSourcePerusahaan[i].no = $scope.number+++".";
							$scope.dataSourcePerusahaan[i].jangkaAwal = new moment($scope.dataSourcePerusahaan[i].jangkaAwal).format('YYYY-MM-DD');
							$scope.dataSourcePerusahaan[i].jangkaAkhir = new moment($scope.dataSourcePerusahaan[i].jangkaAkhir).format('YYYY-MM-DD');
						}
				   });
				}

			$scope.Oniinit();
		   PerusahaanBekerjasama.getOrderList("data-perusahaan-yang-bekerjasama/get-rekanan", true).then(function(dat){
				$scope.ListPerusahaanBekerjasama = dat.data.data;
				
			});

		   $scope.Refresh = function(){
		   	$scope.noRec = undefined;
		   	$scope.item = {};
		   	$scope.item.jangkaAwal = new Date();
		   	$scope.item.jangkaAkhir = new Date();
		   	$scope.item.awal = new Date();
		   	$scope.item.akhir = new Date();
		   	$scope.Oniinit();
		   }

			  $scope.now = new Date();

			  $scope.disableData = function(currents){
				var GetData = this.dataItem;
				$scope.item.tanggal = new Date();
                var data =  {
                    "noRec" : GetData.noRec,
                    "noPks": GetData.noPks,
                    "rekanan": {"namaRekanan" : GetData.namaRekanan,"id": GetData.idRekanan},
                    "jumlahKaryawan": GetData.jumlahKaryawan,
                    "plafon": GetData.plafon,
                    "caraPenagihan": GetData.caraPenagihan,
                    "alamatPenagihan": GetData.alamatPenagihan,
                    "contactPerson": GetData.contactPerson,
                    "jangkaAwal": GetData.jangkaAwal,
                      "ok": $scope.item.ok,
                    "jangkaAkhir": GetData.jangkaAkhir,
                    "namaFilePks": GetData.namaFilePks,
                    "noTelpFax": GetData.noTelpFax,
                    "email": GetData.email,
                    "statusEnabled" : false
                }
               ManageSarpras.saveDataUji(data, "data-perusahaan-yang-bekerjasama/save-data-perusahaan-yang-bekerjasama/").then(function (e) {
	              $scope.Oniinit();
	              $scope.item = {};
	              $scope.item.jangkaAwal = new Date();
	              $scope.item.jangkaAkhir = new Date();
	              $scope.ModeEdit == false
			   });
			};

            $scope.batal = function()
			{
			  $scope.item= {};
			  $scope.item.jangkaAwal = new Date();
			  $scope.item.jangkaAkhir = new Date();
			  $scope.item.awal = new Date();
			  $scope.item.akhir = new Date();
			  $scope.ClearCari();
			}


			$scope.Save = function(){
				debugger
			  for(var i=0; i<$scope.dataSourcePerusahaan.length; i++){
			  	debugger
				   if($scope.dataSourcePerusahaan[i].idRekanan == $scope.item.rekanan.id){
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

			}

			$scope.simpan=function()
			{
				$scope.item.tanggal = new Date();
                var data =  {
                	"noRec" : $scope.noRec,
                    "noPks": $scope.item.noPks,
                    "rekanan": $scope.item.rekanan,
                    "jumlahKaryawan": $scope.item.jumlahKaryawan,
                    "plafon": $scope.item.plafon,
                    "caraPenagihan": $scope.item.caraPenagihan,
                    "alamatPenagihan": $scope.item.alamatPenagihan,
                    "contactPerson": $scope.item.contactPerson,
                    "tanggal": $scope.item.tanggal,
                    "jangkaAwal": $scope.item.jangkaAwal,
                    "ok": $scope.item.ok,
                    "jangkaAkhir": $scope.item.jangkaAkhir,
                    "namaFilePks": $scope.item.namaFilePks,
                    "noTelpFax": $scope.item.noTelpFax,
                    "email": $scope.item.email,		 
                    "statusEnabled" : true
                }

            ManageSarpras.saveDataUji(data, "data-perusahaan-yang-bekerjasama/save-data-perusahaan-yang-bekerjasama/").then(function (e) {
		         $scope.Oniinit();
		         $scope.item = {};
		         $scope.item.jangkaAwal = new Date();
		         $scope.item.jangkaAkhir = new Date();
		         $scope.ModeEdit == false
			 });
			};
		}
	]);
});

				//console.log($scope.item);
/*				ManageSarpras.savePerusahaanBekerjasama(ModelItem.beforePost($scope.item)).then(function(e) {
					  $scope.item= {};
					  $scope.Oniinit();
                });*/