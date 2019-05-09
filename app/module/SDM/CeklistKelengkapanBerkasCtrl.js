define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CeklistKelengkapanBerkasCtrl', ['$rootScope', '$scope', 'ModelItem','TipeKeanggotaan','TipeKoleksi','PeriodePinjaman','$state','ManageSdm',
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
					debugger;
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
						"unsur":"Permohonan Kredensial"
					},
					{ 
						"no":"2",
						"unsur":"Penilaian"
					},
					{ 
						"no":"3",
						"unsur":"Rekomendasi"
					},
					{ 
						"no":"4",
						"unsur":"Rincian Kewenangan Klinis"
					},
					{ 
						"no":"5",
						"unsur":"Surat Penugasan Klinis"
					},
					{ 
						"no":"6",
						"unsur":"STR yang berlaku"
					},
					{ 
						"no":"7",
						"unsur":"SIK yang berlaku"
					},
					{ 
						"no":"8",
						"unsur":"Ijazah(SD,SMP,D3,S1,S2)"
					},
					{ 
						"no":"9",
						"unsur":"Ijazah Keperawatan Terakhir legalisir basah"
					},
					{ 
						"no":"10",
						"unsur":"Training Record"
					},
					{ 
						"no":"11",
						"unsur":"Sertifikat Pelatihan (Verifikasi)"
					},
					{ 
						"no":"12",
						"unsur":"Log Book(1 tahun up date)"
					},
					{ 
						"no":"13",
						"unsur":"Berkas Asesmen"
					},
					{ 
						"no":"14",
						"unsur":"Uraian Tugas"
					}

				]
			});
			
			$scope.columnLaporanUjiHasil = [
			{
				"field": "no",
				"title": "Nomor",
				"width": "15%"
			},
			{
				"field": "unsur",
				"title": "Dokumen",
				"width": "70%"
			},
			{
				"field": "nama",
				"title": "Ada",
				"width": "20%",
				"template": "<div class='center'><input type=\"radio\" ng-model='val' value='0' ng-click='klik(dataItem,val)'></div>",
			},
			{
				"field": "satuan",
				"title": "Tidak",
				"width": "20%",
				"template": "<div class='center'><input type=\"radio\" ng-model='val' value='0' ng-click='klik(dataItem,val)'></div>",
			},
			{
				"field": "hasilUji",
				"title": "Keterangan",
				"width": "20%",
				
			}
			];
		
			

			 $scope.Save = function() {
						
			  
             ManageSdm.saveAturanPeminjaman(ModelItem.beforePost($scope.item)).then(function (e) {
				 debugger;
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