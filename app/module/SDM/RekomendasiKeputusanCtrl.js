define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RekomendasiKeputusanCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,ManageSdm) {
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
						"no":"Bukti Tidak Langsung",
						"nama":"Log Book Log Book sesuai PK dan buku putih -Perawat menuliskan jumlah asuhan dan tindakan yang dilakukan Perawat menilai diri sendiri</h1>"
					},
					{ 
						"no":"Bukti Langsung",
						"nama":"Evaluasi Lisan -Apakah Kompetensi yang tertera sudah kompeten? -Mampu menjelaskan minimal 7 prinsip-prinsip etik dan contoh perilakunya -Mampu menjawab asuhan keperawatan sesuai standar -Mampu menyebutkan diagnosa keperawatan minimal 10 Mampu menjawab tindakan mandiri Mampu menjelaskan tindakan kolaborasi"
					},
					{ 
						"no":"",
						"nama":"Evaluasi Praktek Sesuai PAK dan SPO"
					}

				]
			});
			
			
			
			
			
			$scope.columnLaporanUjiHasil = [
			{
				"field": "no",
				"title": "Kegiatan Pengumpulan Bukti",
				"width": "10%"
			},
			{
				"field": "nama",
				"title": "Bukti bukti pendukung(Sebagai Lampiran)",
				"width": "10%"
			},
			{
				field: "satuan",
				title: "Nilai Range 0-100",
				columns: [
				{
					field: "tanggalAwal",
					title: "NBL PK0:55,PK I:60,PK II:65</br>PK III:70,PK IV:75,PK V:80",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
				
				}
				],
				headerAttributes: { style: "text-align : center"}
				
			},
			
			{
				field: "hasilUji",
				title: "Keputusan",
				columns: [
				{
					field: "tanggalAwal",
					title: "Kompeten",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
					
				},
				{
					field: "tanggalAkhir",
					title: "Belum Kompeten",
					width: "100px",
					headerAttributes: { style: "text-align : center"}
				
				}
				],
				headerAttributes: { style: "text-align : center"}
				
			}];
		
			
             $scope.Save = function() {
						
			  
             ManageSdm.saveUangLembur(ModelItem.beforePost($scope.item)).then(function (e) {
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