define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ObjekPajakBaruCtrl', ['$q', '$rootScope', '$state','$scope', 'IPSRSService','CacheHelper','DateHelper','MasterPantauParameter','$mdDialog',
		function($q, $rootScope,$state, $scope,IPSRSService,cacheHelper,dateHelper,MasterPantauParameter,$mdDialog) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();


            //Untuk Panggil objek pajak :
             MasterPantauParameter.getOrderList("objek-pajak/get-list-objek-pajak", true).then(function(dat){
		     $scope.ListDataobjekpajak = dat.data.data.listData;
	      	});

             //get pajak :
             MasterPantauParameter.getOrderList("objek-pajak/get-list-pajak", true).then(function(dat){
		     $scope.ListDatapajak = dat.data.data.listData;
	      	});

              //jenis produk:
              MasterPantauParameter.getOrderList("objek-pajak/get-list-jenis-produk", true).then(function(dat){
		     $scope.ListDataJenisProduk= dat.data.data.listData;
	      	});

			//produk by jenis :

			$scope.getProduk = function(){
              debugger;
			  MasterPantauParameter.getOrderList("objek-pajak/get-list-produk-by-jenis?jenis="+$scope.item.JenisProduk.id, true).then(function(dat){
			 $scope.ListDataProdukByJenis = dat.data.data.listData;
			  });

			 }

			//komponen harga:
			  MasterPantauParameter.getOrderList("objek-pajak/get-list-komponen-harga", true).then(function(dat){
			  $scope.ListDataKomponenHarga = dat.data.data.listData;
			});

			var init = function (){
            IPSRSService.getItem("objek-pajak/get-list-objek-pajak", true).then(function(dat){
			$scope.dataKomponen = dat.data.data.listData;
			var data = [];
					var i = 1;
					$scope.dataKomponen.forEach(function(e){
						debugger;
						var daftar = {
							    "idProduk": e.idProduk,
						        "namaProduk": e.namaProduk,
						        "idkomponenharga": e.idkomponenharga,
						        "objekPajak": e.objekPajak,
						        "idPajak": e.idPajak,
						        "kdObjekPajak": e.kdObjekPajak,
						        "statusEnabled": e.statusEnabled,
						        "namaExternal": e.namaExternal,
						        "iddetailJenisProduk": e.iddetailJenisProduk,
						        "pajak": e.pajak,
						        "kdKomponenHarga": e.kdKomponenHarga,
						        "detailJenisProduk": e.detailJenisProduk,
						        "reportDisplay": e.reportDisplay,
						        "id": e.id,
						        "deskripsi": e.deskripsi,
						        "qObjekPajak": e.qObjekPajak,
						        "kodeExternal": e.kodeExternal,
								"no": i
						 	}
					 	data[i-1]=daftar
					 	i++;
					});

            $scope.source = data;
			$scope.dataSource = new kendo.data.DataSource({
			pageSize:50,
			// data : $scope.dataKomponen,
			data : $scope.source,
			$scrollable : true
				});
			});
			}
			init();






			$scope.disableData=function(){
			 IPSRSService.getClassMaster("delete-master-table?className=ObjekPajak&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
			 init();
			 });
			 };
			$scope.enableData=function(){
			 IPSRSService.getClassMaster("delete-master-table?className=ObjekPajak&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
			 init();

				});
			};
			

			
			$scope.columnKomponen = [
			{
				"field": "no",
				"title": "No",
				"width": "20px"
			},
			{
				"field": "kdObjekPajak",
				"title": "Kode",
				"width": "50px"
			},
			{
				"field": "objekPajak",
				"title": "Objek Pajak",
				"width": "70px"
			},
			{
				"field": "qObjekPajak",
				"title": "Q Objek Pajak",
				"width": "70px"
			},
			{
				"field": "deskripsi",
				"title": "Deskripsi",
				"width": "70px"
			},
			{
				"field": "statusEnabled",
				"title": "Status Enabled",
				"width": "70px"
			},
			{
				"title" : "Action",
    			"width" : "90px",
    			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];

			$scope.klik = function(current){
				debugger;
				$scope.showEdit = true;
				$scope.item.id = current.id;
				$scope.item.Kode = current.kdObjekPajak;
				$scope.item.ObjekPajak = current.objekPajak;
				$scope.item.pajak = 
				{id : current.idPajak,
				pajak : current.pajak}
				$scope.item.Deskripsi = current.deskripsi;
				$scope.item.JenisProduk = 
				{jenisProduk : current.detailJenisProduk,
				id : current.iddetailJenisProduk}
				$scope.item.KomponenHarga = 
				{id :current.idkomponenharga,
				kdKomponenHarga : current.kdKomponenHarga}
				$scope.item.QObjekPajak = current.qObjekPajak;
				$scope.item.ReportDisplay = current.reportDisplay;
				$scope.item.KodeExternal = current.kodeExternal;
				$scope.item.NamaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
				MasterPantauParameter.getOrderList("objek-pajak/get-list-produk-by-jenis?jenis="+$scope.item.JenisProduk.id, true).then(function(dat){
			    $scope.ListDataProdukByJenis = dat.data.data.listData;
			    $scope.item.Produk = 
				{id : current.idProduk,
				namaProduk : current.namaProduk}
			    });
// 				$scope.item.noRec = current.noRec;
			}


			 $scope.Save=function(){
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Apakah anda yakin akan menyimpan data ini?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $scope.Simpan();
                })
            };
	

			$scope.Simpan = function()
			 {
			 	debugger;
			var data = {
				"deskripsi" : $scope.item.Deskripsi,
				"kdObjekPajak" : $scope.item.Kode,
				"pajak" : {"id" : $scope.item.pajak.id},
				"komponenHarga" : {"id" : $scope.item.KomponenHarga.id},
				"produk" : {"id" : $scope.item.Produk.id},
				"objekPajak" : $scope.item.ObjekPajak,
				"qObjekPajak" : $scope.item.QObjekPajak,
				"reportDisplay": $scope.item.ReportDisplay,
				"kodeExternal": $scope.item.KodeExternal,
				"namaExternal": $scope.item.NamaExternal,
				 "statusEnabled" : true
				
				}
		            IPSRSService.saveDataSarPras(data,"objek-pajak/save-objek-pajak").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        });

			  }

			    $scope.edit=function(){
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Objek Pajak"'+$scope.item.ObjekPajak+'" akan di update, tetap lanjutkan?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $scope.edit2();
                })
            };

            
			 $scope.edit2 = function()
			  {	
			  	debugger
			   var data = 
			   {
			   	"id" : $scope.item.id,
				"deskripsi" : $scope.item.Deskripsi,
				"kdObjekPajak" : $scope.item.Kode,
				"pajak" : {"id" : $scope.item.pajak.id},
				"komponenHarga" : {"id" : $scope.item.KomponenHarga.id},
				"produk" : {"id" : $scope.item.Produk.id},
				"objekPajak" : $scope.item.ObjekPajak,
				"qObjekPajak" : $scope.item.QObjekPajak,
				"reportDisplay": $scope.item.ReportDisplay,
				"kodeExternal": $scope.item.KodeExternal,
				"namaExternal": $scope.item.NamaExternal
				
				}
				   IPSRSService.saveDataSarPras(data,"objek-pajak/save-objek-pajak").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        })
		
			}
           $scope.disableData=function(){
			  {	
			  	debugger
			   var data = 
			   {
			   	"id" : $scope.item.id,
				"deskripsi" : $scope.item.Deskripsi,
				"kdObjekPajak" : $scope.item.Kode,
				"pajak" : {"id" : $scope.item.pajak.id},
				"komponenHarga" : {"id" : $scope.item.KomponenHarga.id},
				"produk" : {"id" : $scope.item.Produk.id},
				"objekPajak" : $scope.item.ObjekPajak,
				"qObjekPajak" : $scope.item.QObjekPajak,
				"reportDisplay": $scope.item.ReportDisplay,
				"kodeExternal": $scope.item.KodeExternal,
				"namaExternal": $scope.item.NamaExternal,
				"statusEnabled" : false
				
				}
				   IPSRSService.saveDataSarPras(data,"objek-pajak/save-objek-pajak").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        })
		
			}
			 };
            


            $scope.enableData=function(){
			  {	
			  	debugger
			   var data = 
			   {
			   	"id" : $scope.item.id,
				"deskripsi" : $scope.item.Deskripsi,
				"kdObjekPajak" : $scope.item.Kode,
				"pajak" : {"id" : $scope.item.pajak.id},
				"komponenHarga" : {"id" : $scope.item.KomponenHarga.id},
				"produk" : {"id" : $scope.item.Produk.id},
				"objekPajak" : $scope.item.ObjekPajak,
				"qObjekPajak" : $scope.item.QObjekPajak,
				"reportDisplay": $scope.item.ReportDisplay,
				"kodeExternal": $scope.item.KodeExternal,
				"namaExternal": $scope.item.NamaExternal,
				"statusEnabled" : true
				
				}
				   IPSRSService.saveDataSarPras(data,"objek-pajak/save-objek-pajak").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        })
		
			}
			 };









			$scope.batal = function () {
			$scope.showEdit = false;
			$scope.item = {};
			}
}
]);
});

