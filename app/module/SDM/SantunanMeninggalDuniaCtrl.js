define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SantunanMeninggalDuniaCtrl', ['$rootScope', '$scope', 'ModelItem','$state','SantunanMeninggal','JenisSantunanService',
		function($rootScope, $scope, ModelItem,$state,SantunanMeninggal,JenisSantunanService) {
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
			 
			  $scope.Listketerangan = [{
					"id": 1,
					"kode": "1",
					"keterangan": "Bantuan Duka Cita "
				},{"id": 2,
					"kode": "2",
					"keterangan": "Karangan Bunga"}

			];
			 
			 
			 
			  $scope.pindah1 = function(){
				 
				$state.go("DataKeluarga");
				 
			 }
			 
			 
			  $scope.ListStatusPerkawinan = [{
					"id": 1,
					"kode": "1",
					"name": "laki"
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
			
			$scope.columnLaporanUjiHasil = [
			{
				"field": "no",
				"title": "No  ",
				"width": "5%"
			},
			{
				"field": "nama",
				"title": "Nama",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Yang Meninggal",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Jumlah Orang",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Jumlah Bantuan Duka Cita(Uang)",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Jumlah Karangan Bunga",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Total",
				"width": "20%"
			}
			];
		SantunanMeninggal.getOrderList("service/list-generic/?view=StatusMeninggalDunia&select=*", true).then(function(dat){
				$scope.ListSantunanMeninggal = dat.data;
		
				});		
			
 var aktif = "";
			$scope.check = function () {
				if (aktif)
					aktif = "";

				else
					aktif = "Bantuan duka cita";				
			}
			
			
	 var aktip = "";		
			$scope.check2 = function () {
				if (aktip)
					aktip = "";

				else
					aktip = "Karangan Bunga";				
			}
			
	
			
				$scope.Save = function () {
                // debugger;
				var data = {
					"nomorSantunan": $scope.item.nomorSantunan,
					"tanggalProses":$scope.item.tanggalProses,
					"statusMeninggal":$scope.item.statusMeninggal,
					"nama":$scope.item.nama,
					"jumlahOrang":$scope.item.jumlahOrang,
					"jenisSantunan1": aktif,
					"jenisSantunan2":aktip,
					"jumlahSantunan":$scope.item.jumlahSantunan,
					"jumlahKaranganBunga":$scope.item.jumlahBunga,
					
	                "total":$scope.item.total			
				};				
                JenisSantunanService.saveJenisSantunan(ModelItem.beforePost(data), "sdm/save-perhitungan-santunan-pegawai-meninggal-dunia").then(
					function (e) {
						$scope.item = {};
					});
            };
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});