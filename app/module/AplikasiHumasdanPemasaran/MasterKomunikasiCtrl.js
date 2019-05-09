define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterKomunikasiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','NamaAsuransi','ManageSdm',
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
			 init();

			 $scope.loadGrid = function () {
			 NamaAsuransi.getOrderList("service/list-generic/?view=Komunikasi&select=*", true).then(function(dat){
				$scope.ListNamaAsuransi = dat.data;
				 debugger;
		
				});	
				}
	
			 
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
			

			$scope.columnKomunikasi = [
			
				{
					"field": "kdKomunikasi",
					"title": "Kode Komunikasi",
					"width": "20%"
				},

				{
					"field": "komunikasi",
					"title": "Komunikasi",
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

		   $scope.reset = function(){
		   	debugger;
             $scope.item.kdKomunikasi = "";
             $scope.item.komunikasi = "";
             $scope.item.namaExternal = "";
             aktif = "";
             $scope.item.kodeExternal = "";
             $scope.item.reportDisplay = "";
            }


		   // var aktif = false;
            var aktif = "true";
			$scope.check = function () {
				debugger;	
				if (aktif)
					aktif ="false";

				else
					aktif = "true";		
			
			}

			ManageSdm.getOrderList("service/list-generic/?view=Komunikasi&select=*", true).then(function (dat) {
            $scope.daftarJabatan = new kendo.data.DataSource({ 
				data: dat.data
			});

	        
	        });

			$scope.Save = function () {
			debugger;
			var data = {
				
				"kdKomunikasi": $scope.item.kdKomunikasi,
				"id":"",
		     	"komunikasi": $scope.item.komunikasi,
		        "kdProfile": "",
		        "namaExternal": $scope.item.namaExternal,
		      	"noRec":"",
		      	"statusEnabled": aktif,
		        "kodeExternal": $scope.item.kodeExternal,
		      	"serialVersionUID": "",
		      	"qKomunikasi": "",
		      	"reportDisplay": $scope.item.reportDisplay		
			}
			ManageSdm.saveData(data,"komunikasi/save-komunikasi").then(function(e) {
			console.log(JSON.stringify(e.data));
			$scope.loadGrid();
			});

			}
		
			function init(){

          
		
       		};

			}

	]);
});