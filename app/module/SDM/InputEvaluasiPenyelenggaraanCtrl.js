define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InputEvaluasiPenyelenggaraanCtrl', ['$rootScope', '$scope', 'ModelItem','TipeKeanggotaan','TipeKoleksi','PeriodePinjaman','$state','ManageSdm',
		function($rootScope, $scope, ModelItem,TipeKeanggotaan,TipeKoleksi,PeriodePinjaman,$state,ManageSdm) {
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
			  TipeKeanggotaan.getOrderList("service/list-generic/?view=TipeKeanggotaan&select=*", true).then(function(dat){
				$scope.ListTipeKeanggotaan = dat.data;
					//debugger;
				});	
				
				
			TipeKoleksi.getOrderList("service/list-generic/?view=TipeKoleksi&select=*", true).then(function(dat){
				$scope.ListTipeKoleksi = dat.data;
	            
				});

			PeriodePinjaman.getOrderList("service/list-generic/?view=PeriodePinjaman&select=*", true).then(function(dat){
				$scope.ListPeriodePinjaman = dat.data;
	
				});	
				
			 
			 
			 $scope.ListKeterangan = [{
					"id": 1,
					"kode": "A",
					"name": "laki",
					"pertanyaan":"apakah"
				},
				{
					"id": 2,
					"kode": "B",
					"name": "perempuan",
					
				}

			];
			
			
			$scope.ListPertanyaan = [{
					"id": 1,
					
					"pertanyaan": "Apakah?"
				},
				{
					"id": 2,
					
					"name": "Siapakah?"
				}

			];
			
			
			$scope.daftarJenisBahan = new kendo.data.DataSource({
			data: [
					{ 
						"kodeJenis":"BHN001",
						"JenisBahan":"Aldet"
					},
					{ 
						"kodeJenis":"BHN002",
						"JenisBahan":"Laudet"
					},
					{ 
						"kodeJenis":"BHN003",
						"JenisBahan":"MC. Bleach"
					},
					{ 
						"kodeJenis":"BHN004",
						"JenisBahan":"OXO. Bleach"
					},
					{ 
						"kodeJenis":"BHN005",
						"JenisBahan":"E. 951"
					},
					{ 
						"kodeJenis":"BHN006",
						"JenisBahan":"M. Saur"
					},
					{ 
						"kodeJenis":"BHN007",
						"JenisBahan":"M. Soft"
					}

				]
			});
			
			
			$scope.daftarBahanLinen = new kendo.data.DataSource({
				data:[
					{ 
						"no":"1",
						"unsur":"Penguasaan Materi"
					},
					{ 
						"no":"2",
						"unsur":"Ketepatan Waktu"
					},
					{ 
						"no":"3",
						"unsur":"Sistematika Penyajian"
					},
					{ 
						"no":"4",
						"unsur":"Penggunaan Metode dan Alat Bantu"
					},
					{ 
						"no":"5",
						"unsur":"Empati,gaya dan sikap terhadap peserta"
					},
					{ 
						"no":"6",
						"unsur":"Penggunaan Bahasa dan Volume Suara"
					},
					{ 
						"no":"7",
						"unsur":"Pemberian Motivasi belajar kepada peserta"
					},
					{ 
						"no":"8",
						"unsur":"Isi Materi"
					},
					{ 
						"no":"9",
						"unsur":"Penyajian Materi"
					},
					{ 
						"no":"10",
						"unsur":"Dapat Diterapkan di klinik"
					},
					{ 
						"no":"11",
						"unsur":"Kesempatan Tanya Jawab"
					},
					{ 
						"no":"12",
						"unsur":"Pencapaian Tujuan Pembelajaran"
					},
					{ 
						"no":"13",
						"unsur":"Penampilan Fasilitator"
					},
					{ 
						"no":"14",
						"unsur":"Kerjasama Antar Tim Pengajar (jika tim)"
					}

				]
			});
			
			$scope.columnLaporanUjiHasil = [
			{
				"field": "no",
				"title": "Nomor",
				"width": "5%"
			},
			{
				"field": "unsur",
				"title": "Unsur Yang Dinilai",
				"width": "70%"
			},
			{
				"field": "nama",
				"title": "Kurang",
				"width": "20%",
				"template": "<div class='center'><input type=\"radio\" ng-model='val' value='0' ng-click='klik(dataItem,val)'></div>",
			},
			{
				"field": "satuan",
				"title": "Cukup",
				"width": "20%",
				"template": "<div class='center'><input type=\"radio\" ng-model='val' value='0' ng-click='klik(dataItem,val)'></div>",
			},
			{
				"field": "hasilUji",
				"title": "Baik",
				"width": "20%",
				"template": "<div class='center'><input type=\"radio\" ng-model='val' value='0' ng-click='klik(dataItem,val)'></div>",
			},
			{
				"field": "hasilUji",
				"title": "Sangat Baik",
				"width": "20%",
				"template": "<div class='center'><input type=\"radio\" ng-model='val' value='0' ng-click='klik(dataItem,val)'></div>",
			}
			];
		
			

			 $scope.Save = function() {
						
			  
             ManageSdm.saveAturanPeminjaman(ModelItem.beforePost($scope.item)).then(function (e) {
				 //debugger;
                  $scope.item= {};
                   init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


            };
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});