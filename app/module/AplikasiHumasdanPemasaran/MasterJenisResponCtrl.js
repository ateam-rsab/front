define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterJenisResponCtrl', ['$rootScope', '$scope', 'ModelItem','$state','NamaAsuransi','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,NamaAsuransi,ManageSdm) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, 
			function errorCallBack(err) {});
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
			 ManageSdm.getOrderList("service/list-generic/?view=JenisRespon&select=*", true).then(function (dat) {
              $scope.daftarJabatan = new kendo.data.DataSource({ 
				data: dat.data
			  });
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
			

			
			$scope.columnLaporanUjiHasil = [
			{
				"field": "noRec",
				"title": "NoRec  ",
				"width": "5%"
			},
			{
				"field": "kdProfile",
				"title": "Kode Profile",
				"width": "20%"
			},
			{
				"field": "kdJenisRespon",
				"title": "Kode Jenis Respon",
				"width": "20%"
			},
			{
				"field": "jeniRespon",
				"title": "Jenis Respon",
				"width": "20%"
			},
			{
				"field": "reportDisplay",
				"title": "Report Display",
				"width": "20%"
			},
			{
				"field": "kodeExternal",
				"title": "Kode External",
				"width": "20%"
			},
			{
				"field": "namaExternal",
				"title": "Nama External",
				"width": "20%"
			},
			{
				"field": "statusEnabled",
				"title": "Status Enabled",
				"width": "20%"
			}
			];

			var aktif = "true";
			$scope.check = function () {
				debugger;	
				if (aktif)
					aktif ="false";

				else
					aktif = "true";		
			
			}
		
			
			$scope.Save = function() {

		        var data = {

				"qJenisRespon": $scope.item.qJenisRespon,
			      
				"namaExternal": $scope.item.namaExternal,
			      
				"noRec": $scope.item.noRec,
			      
				"statusEnabled": aktif,
			      
				"jeniRespon": $scope.item.jeniRespon,
			      
				"kdJenisRespon": $scope.item.kdJenisRespon
		         }
						
						
			  
             ManageSdm.saveData(data,"jenisRespon/save-jenis-respon").then(function(e) {
			console.log(JSON.stringify(e.data));
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


            };

			
		}
	]);
});