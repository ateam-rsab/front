define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ReservasiCtrl', ['CacheHelper','$rootScope', '$scope', 'ModelItem','$state','ManageSdm',
		function(cacheHelper,$rootScope, $scope, ModelItem,$state,ManageSdm ) {
			
			$scope.item = {};
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			
				 $scope.item.nomorAnggota=cacheHelper.get("nomorAnggota");
             
				 $scope.item.nama=cacheHelper.get("nama");
				 $scope.item.tipeKeanggotaan=cacheHelper.get("tipeKeanggotaan");	
				  $scope.item.noRec=cacheHelper.get("noRec");	
			 if ($state.params.judulBuku!== "")
				 $scope.item.judulBuku=$state.params.judulBuku;
			 if ($state.params.kodeEksemplar!== "")
				 $scope.item.kodeEksemplar=$state.params.kodeEksemplar;
			 if ($state.params.noReg!== "")
			     $scope.item.noReg=$state.params.noReg;
			 
			 var currentDataGrid = cacheHelper.get("dataGridReservasi");
			 if(currentDataGrid != undefined || currentDataGrid != null)
			 {
				$scope.daftarBahanLinen = new kendo.data.DataSource({
					data: currentDataGrid
				}); 
				
			}
			 else{
				 $scope.daftarBahanLinen = new kendo.data.DataSource({
					data: []
				});
			 }
			
			$scope.no=1;
			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})
			
			
			 $scope.pindah = function(){
				 
				$state.go("ReservasiCari");
				 
			 }
			 
			 
			  $scope.pindah1 = function(){
				 
				$state.go("CariBuku");
				 
			 }
			
			
			
			
			
			$scope.columnLaporanUjiHasil = [
			{
				"field": "no",
				"title": "Judul Buku/ISSN",
				"width": "40%"
			},
			{
				"field": "nama",
				"title": "Kode Eksemplar",
				"width": "40%"
			},
			{
				"field": "satuan",
				"title": "Tanggal Pinjam",
				"width": "40%",
				"template": "#= new moment(new Date(satuan)).format('DD-MM-YYYY') #"
			},
			{
				"field": "noReg",
				"title": "",
				
			},
			{
				"field": "noRec",
				"title": "",
					
			}
			];
			
			$scope.addDataBahanLinen = function() {
                    
				var tempDataBahanLinen = {
					"no": $scope.item.judulBuku,
					"nama": $scope.item.nama,
					"satuan" : $scope.item.tanggalPinjam,
					"noReg" : $scope.item.noReg,
					"noRec" : $scope.item.noRec
					
				
				}

				$scope.daftarBahanLinen.add(tempDataBahanLinen);
				$scope.item.judulBuku="",
				$scope.item.nama="",
				$scope.item.tanggalPinjam="";
				
				
				var grid = $('#kGrid').data("kendoGrid");
				
				cacheHelper.set("dataGridReservasi", grid.dataSource._data);
				
				/*$scope.item.judulBuku=cacheHelper.get("judulBuku");
             
				 $scope.item.nama=cacheHelper.get("nama");
				 $scope.item.tanggalPinjam=cacheHelper.get("tanggalPinjam");
				*/
			
			}
			
		
		     
			

			
				$scope.Save = function () {
	          				
		
       
		
			
			
			var detail = $scope.daftarBahanLinen._data;
		    var i = 0;
			var detailHVA = [];
			detail.forEach(function (data) {
					var data = {
						
						buku:{noRec:data.noReg},
						tanggalPinjam:new Date(data.satuan).getTime()
						
					
						
					}
					detailHVA[i] = data;
					i++;
				})
			
				
			
						
			          
			
				
				
		
		var data1= {
			"anggota":{noRec:$scope.item.noRec},
			"buku":detailHVA
			
			
			
			
		}
		
		
				console.log(JSON.stringify(data1));
                ManageSdm.saveReservasiOk(data1, "sdm/save-reservasi").then(function (e) {
					console.log(JSON.stringify(e.data));
					$scope.Back();
				
                });
			

			cacheHelper.set("dataGridReservasi", "");
			$scope.daftarBahanLinen = [];	
			};
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});