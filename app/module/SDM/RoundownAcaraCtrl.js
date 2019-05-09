define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RoundownAcaraCtrl', ['$rootScope', '$scope', 'ModelItem','$state','HubunganKeluarga','NamaAsuransi','RekamDataPegawai','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,HubunganKeluarga,NamaAsuransi,RekamDataPegawai,ManageSdm) {
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
			 
			  $scope.ListStatusPerkawinan = [{
					"id": 1,
					"kode": "1",
					"name": "laki"
				}

			];
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
				data:[]			
			});
			
			$scope.columnLaporanUjiHasil = [
			{
				"field": "no",
				"title": "Nama Pelatihan/Seminar/Workshop ",
				"width": "5%"
			},
			{
				"field": "nama",
				"title": "Penyelenggara",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Tanggal Pelaksanaan",
				"width": "20%"
			}
			];
			
			
			
			
				$scope.columnLaporanUjiNaker = [
				{
				"field": "narasumber",
				"title": "Tanggal",
				"width": "20%"
			},
			{
				"field": "waktu",
				"title": "Waktu ",
				"width": "10%"
			},
			{
				"field": "kegiatan",
				"title": "Kegiatan",
				"width": "20%"
			},
			{
				"field": "narasumber",
				"title": "Narasumber",
				"width": "20%"
			}
			
			];
		
		HubunganKeluarga.getOrderList("service/list-generic/?view=HubunganKeluarga&select=*", true).then(function(dat){
				$scope.ListHubunganKeluarga = dat.data;
		
				});	
				
		RekamDataPegawai.getOrderList("service/list-generic/?view=RekamDataPegawai&select=*", true).then(function(dat){
				$scope.ListRekamDataPegawai = dat.data;
		
				});			
				
		NamaAsuransi.getOrderList("service/list-generic/?view=NamaAsuransi&select=*", true).then(function(dat){
				$scope.ListNamaAsuransi = dat.data;
		
				});			
			
$scope.addDataBahanLinen = function() {

				var tempDataBahanLinen = {
					"waktu": $scope.item.waktu,
					"kegiatan": $scope.item.kegiatan,
					"narasumber":$scope.item.narasumber
					
				
				}

				$scope.daftarBahanLinen.add(tempDataBahanLinen);
				$scope.item.waktu="",
				$scope.item.kegiatan="",
				$scope.item.narasumber=""
			
			}
			
			
			$scope.Save = function () {
	          				var detail = $scope.daftarBahanLinen._data;
				var i = 0;
				var detailHVA = [];
				detail.forEach(function (data) {
					var data = {
						
						
						
					
						
						"waktu": data.waktu,
						"kegiatan":data.kegiatan,
						"narasumber":data.narasumber
						
						
					
						
					}
					detailHVA[i] = data;
					i++;
				})
		var data1 = {
				
			    "NamaKegiatan":$scope.item.namaKegiatan,
				"Penyelenggara":$scope.item.penyelenggara,
				"Tempat":$scope.item.tempat,
				"TanggalMulai":new Date($scope.item.tanggalMulai).getTime(),
				"TanggalSelesai":new Date($scope.item.tanggalSelesai).getTime(),
				"Acara": detailHVA
				
				
		}
				console.log(JSON.stringify(data1));
                ManageSdm.saveAsuransiNaker(data1, "sdm/save-asuransi-naker").then(function (e) {
					console.log(JSON.stringify(e.data));
					$scope.Back();
                });
				
				$scope.daftarBahanLinen = [];
			};
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});