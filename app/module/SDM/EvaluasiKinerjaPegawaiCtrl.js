define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('EvaluasiKinerjaPegawaiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','NamaAsuransi','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,NamaAsuransi,ManageSdm) {
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
			 NamaAsuransi.getOrderList("service/list-generic/?view=NamaAsuransi&select=*", true).then(function(dat){
				$scope.ListNamaAsuransi = dat.data;
		
				});		
			 
			  $scope.Listketerangan = [{
					"id": 1,
					"kode": "1",
					"name": "2016"
				}];
				
				
				$scope.ganti = function() {
				
				if ($scope.item.tahunUMR.name=="2016")
				{
					$scope.item.jumlahUMR="2300000";
					
				}
				else
				{
					$scope.item.jumlahUMR="";
					
				}
				
			}
					
					
					
					
				

			
			 
			 
			  $scope.pindah1 = function(){
				 
				$state.go("DataKeluarga");
				 
			 }
			
			
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
			
			$scope.columnLaporanUjiHasil = [
			{
				field: "no",
				title: "Hasil Kerja",
				columns: [
				{
					field: "tanggalAwal",
					title: "Bobot",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAwal)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Pengetahuan",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Kuantitas",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Kualitas",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Penguasaan Kerja",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Rata-rata",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Hasil",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				}
				],
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "nama",
				title: "Perilaku Kerja",
				columns: [
				{
					field: "tanggalAwal",
					title: "Bobot",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAwal)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Disiplin",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Tanggung Jawab",
					width: "200px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Kerjasama",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Inisiatif",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Sikap Kerja",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Etika",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Rata-rata",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Hasil",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				}
				],
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "jumlahKaryawan",
				title: "Nilai Prestasi Kerja",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			}
			];
		
			

			
			
			$scope.Save = function() {
						
			  
             ManageSdm.savePremiKesehatan(ModelItem.beforePost($scope.item)).then(function (e) {
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