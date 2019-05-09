define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('VerifikasiNilaiCtrl', ['$rootScope', '$scope', 'ModelItem','TipeKeanggotaan','TipeKoleksi','PeriodePinjaman','$state','ManageSdm',
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
			
			
			
			
			 $scope.ListVerifikasi = [{
					"id": 1,
					"kode": "A",
					"name": "kesehatan",
					
				},
				{
					"id": 2,
					"kode": "B",
					"name": "donor",
					
				}

			];
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			 $scope.DaftarSoal = [{
					"id": 1,
					"kode": "1",
					"name": "Pre-Test"
					
				},
				{
					"id": 2,
					"kode": "2",
					"name": "Post-Test"
					
				},
				{
					"id": 3,
					"kode": "3",
					"name": "Rekrutmen"
					
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
			
			$scope.columnLaporanUjiHasil = [{
				field: "noPks",
				title: "Nama Peserta",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			},{
				field: "noPks",
				title: "Instansi",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "namaPerusahaan",
				title: "Tanggal Pelaksanaan",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "tanggalPks",
				title: "Jawaban",
				columns: [
				{
					field: "tanggalAwal",
					title: "1",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAwal)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "2",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "3",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "4",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "5",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "6",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "7",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				}
				],
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "namaPerusahaan",
				title: "Nilai (Poin)",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			}];
			

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