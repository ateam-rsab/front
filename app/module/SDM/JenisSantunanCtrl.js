define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisSantunanCtrl', ['$rootScope', '$scope', 'ModelItem','$state','SantunanMeninggal','JenisSantunanService',
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
			 
			 
			  $scope.pindah1 = function(){
				 
				$state.go("DataKeluarga");
				 
			 }
			SantunanMeninggal.getOrderList("service/list-generic/?view=StatusMeninggalDunia&select=*", true).then(function(dat){
				$scope.ListSantunanMeninggal = dat.data;
		
				});		
			
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
				"title": "No SK ",
				"width": "5%"
			},
			{
				"field": "nama",
				"title": "Status Yang Meninggal Dunia",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Jenis Santunan",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Besaran Bantuan Duka Cita",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Status Aktif",
				"width": "20%"
			}
			];
		
			
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
			
	

	var akti = false;
			$scope.check3 = function () {
				if (akti)
					akti = "false";

				else
					akti = "true";				
			}		

			$scope.Save = function () {
                // debugger;
				var data = {
					"nomorSurat": $scope.item.nomorSurat,
					"statusMeninggal":$scope.item.statusMeninggal,
					"jenisSantunan1": aktif,
					"jenisSantunan2":aktip,
					"besaranBantuan":$scope.item.besaranBantuan,
					"statusEnabled":akti 
				};				
                JenisSantunanService.saveJenisSantunan(ModelItem.beforePost(data), "baku-mutu/save-baku-mutu/").then(
					function (e) {
						$scope.item = {};
					});
            };
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});