define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ReservasiCariCtrl', ['CacheHelper','$rootScope', '$scope', 'ModelItem','$state','JenisKelamin','TipeKeanggotaan','TipeKoleksi','TampilDataBuku','ManageSdm',
		function(cacheHelper,$rootScope, $scope, ModelItem,$state,TipeKeanggotaan,TipeKoleksi,TampilDataBuku,JenisKelamin,ManageSdm) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.no=1;
			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})
			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: [{}]
			});
			
			 $scope.pindah = function(){
				 
				$state.go("RekamDataPegawai");
				 
			 }
			 
			 
			  $scope.pindah1 = function(){
				 
				$state.go("DataKeluarga");
				 
			 }
			 
			 $scope.$on("kendoWidgetCreated", function(event, widget) {
				  debugger	
                    if (widget === $scope.grid) {
                        $scope.grid.element.on('dblclick', function(e) {
							
                            if ($state.current.name === 'ReservasiFind') {
								cacheHelper.set('noAnggota',$scope.item.nomorAnggota)
								cacheHelper.set('nama',$scope.item.nama),
								cacheHelper.set('tipeKeanggotaan',$scope.item.tipeKeanggotaan.name),
                                $state.go('Pengembalian', {
                                    noAnggota: $scope.item.nomorAnggota,
									nama:$scope.item.nama,
									tipeKeanggotaan:$scope.item.tipeKeanggotaan.name,
									 noRec:$scope.item.noRec
								   
                                });
							} 
							else 
							{ 
						($state.current.name === 'ReservasiCari') 
							cacheHelper.set('nomorAnggota',$scope.item.nomorAnggota),
								cacheHelper.set('nama',$scope.item.nama),
								cacheHelper.set('tipeKeanggotaan',$scope.item.tipeKeanggotaan.name),
							cacheHelper.set('noRec',$scope.item.noRec)
								
                                $state.go('Reservasi', {
                                   nomorAnggota: $scope.item.nomorAnggota,
									 nama:$scope.item.nama,
									 tipeKeanggotaan:$scope.item.tipeKeanggotaan.name,
								 noRec:$scope.item.noRec
									
								   
                                });
							}
						});
					}
			  });
			 
			 
			//  $scope.$on("kendoWidgetCreated", function(event, widget) {
			//	  debugger	
              //      if (widget === $scope.grid) {
             //           $scope.grid.element.on('dblclick', function(e) {
							
             //               if ($state.current.name === 'ReservasiCari') {
			//					cacheHelper.set('nomorAnggota',$scope.item.nomorAnggota),
			//					cacheHelper.set('nama',$scope.item.nama),
			//					cacheHelper.set('tipeKeanggotaan',$scope.item.tipeKeanggotaan.name),
			//					cacheHelper.set('noRec',$scope.item.noRec)
             //                   $state.go('Reservasi', {
             //                       nomorAnggota: $scope.item.nomorAnggota,
			//						 nama:$scope.item.nama,
			//						 tipeKeanggotaan:$scope.item.tipeKeanggotaan.name,
			//						 noRec:$scope.item.noRec
								   
             //                   });
			//				}
			//			});
			//		}
			//  });
			  
			  
			  
			  
			 
			 TampilDataBuku.getOrderList("sdm/get-registrasi-keanggotaan/-").then(function(dat){
		$scope.sourceOrder = ModelItem.beforePost( dat.data.data.items,true );
		
	         	
		
			});
			 
			 
			 
			   $scope.ListStatusPerkawinan = [{
					"id": 1,
					"kode": "1",
					"name": "laki"
				}

			];
			
			 $scope.daftarBahanLinen = new kendo.data.DataSource({
				data: []
			});
			 
			 JenisKelamin.getOrderList("service/list-generic/?view=JenisKelamin&select=*", true).then(function(dat){
				$scope.ListJenisKelamin = dat.data;
			
				});	

			
				
			 TipeKeanggotaan.getOrderList("service/list-generic/?view=TipeKeanggotaan&select=*", true).then(function(dat){
				$scope.ListTipeKeanggotaan = dat.data;
				
				});			
			
			
			
			
			
			
			$scope.columnLaporanUjiHasil = [
			{
				"field": "nomorAnggota",
				"title": "Nomor Anggota",
				"width": "20%"
			},
			{
				"field": "tipeKeanggotaan.name",
				"title": "Tipe Keanggotaan",
				"width": "25%"
			},
			{
				"field": "tanggal",
				"title": "Tanggal",
				"width": "20%",
				"template": "#= new moment(new Date(tanggal)).format('DD-MM-YYYY') #"
			},
			{
				"field": "nama",
				"title": "Nama",
				"width": "20%"
			},
			{
				"field": "jenisKelamin.jenisKelamin",
				"title": "Jenis Kelamin",
				"width": "20%"
			},
			{
				"field": "tempatLahir",
				"title": "Tempat Lahir",
				"width": "20%"
			},
			{
				"field": "tanggalLahir",
				"title": "Tanggal Lahir",
				"width": "20%",
				"template": "#= new moment(new Date(tanggalLahir)).format('DD-MM-YYYY') #"
			},
			{
				"field": "asalInstansi",
				"title": "Asal Instansi",
				"width": "20%"
			},
			{
				"field": "nomorHP",
				"title": "No HP",
				"width": "20%"
			},
			{
				"field": "email",
				"title": "Email",
				"width": "20%"
			},
			{
				"field": "alamat",
				"title": "Alamat",
				"width": "20%"
			}
			];
			
			
			
			 $scope.cari = function()
			{
			TampilDataBuku.getOrderList("sdm/get-registrasi-keanggotaan/"+$scope.item.Nama).then(function(dat){
		$scope.sourceOrder = ModelItem.beforePost( dat.data.data.items,true );
		debugger;
			});	
			}
		
			

			 $scope.Save = function() {
						
			  
             ManageSdm.saveRegistrasiKeanggotaan(ModelItem.beforePost($scope.item)).then(function (e) {
                  $scope.item= {};
                   
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


            };
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});