define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PermohonanKredensialCtrl', ['$rootScope', '$scope', 'ModelItem','TipeKeanggotaan','TipeKoleksi','PeriodePinjaman','$state','ManageSdm',
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
			
			
			
			
			 $scope.Listketerangan = [{
					"id": 1,
					"kode": "1",
					"keterangan": "Bukti Pendukung telah sesuai dengan persyaratan sehingga dapat mengikuti tahap pelaksanaan assesmen"
					
				},{"id": 2,
					"kode": "2",
					"keterangan": "Bukti Pendukung belum sesuai dengan persyaratan sehingga peserta diminta untuk melengkapi sesuai persyaratan dan belum dapat mengikuti tahap pelaksanaan assesmen"
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
						"unsur":"STR"
					},
					{ 
						"no":"2",
						"unsur":"SIP"
					},
					{ 
						"no":"3",
						"unsur":"SIK"
					},
					{ 
						"no":"4",
						"unsur":"Training Record"
					},
					{ 
						"no":"5",
						"unsur":"Logbook"
					},
					{ 
						"no":"6",
						"unsur":"Clinical Privelege"
					},
					{ 
						"no":"7",
						"unsur":"SPKK sebelumnya"
					},
					{ 
						"no":"8",
						"unsur":"Surat Keterangan berbadan sehat/sakit"
					}

				]
			});
			
			$scope.columnLaporanUjiHasil = [
			
			{
				"field": "",
				"title": "Pendidikan",
				"width": "20%"
			},
			{
				"field": "nama",
				"title": "Tahun Lulus",
				"width": "20%"
				
			},
			{
				"field": "satuan",
				"title": "Nama Institusi Pendidikan",
				"width": "50%",
				
			}
			];
			
			
			
			
			$scope.columnLaporanUjiUnit = [
			
			{
				"field": "",
				"title": "Nama Rumah Sakit/Unit",
				"width": "20%"
			},
			{
				field: "nama",
				title: "Pindah/Rotasi/Mutasi",
				columns: [
				{
					field: "tanggalAwal",
					title: "Mulai(Bln/Thn)",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
				
				},
				{
					field: "tanggalAkhir",
					title: "Sampai(Bln/Thn)",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
				
				}
				],
				headerAttributes: { style: "text-align : center"}
				
			},
			{
				field: "jumlahKaryawan",
				title: "Posisi/Jabatan",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			}
			];
			
			
			
			$scope.columnLaporanUjiKredensial = [
			
			{
				"field": "unsur",
				"title": "Bukti Pendukung",
				"width": "70%"
			},
			{
				field: "nama",
				title: "Kelengkapan Bukti",
				width: "20%",
				columns: [
				{
					field: "tanggalAwal",
					title: "Ya",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "<div class='center'><input type=\"radio\" ng-model='val' value='0' ng-click='klik(dataItem,val)'></div>",
				},
				{
					field: "tanggalAkhir",
					title: "Tahun",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				},
				{
					field: "tanggalAkhir",
					title: "Tidak",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "<div class='center'><input type=\"radio\" ng-model='val' value='0' ng-click='klik(dataItem,val)'></div>",
				}
				],
				headerAttributes: { style: "text-align : center"}
				
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