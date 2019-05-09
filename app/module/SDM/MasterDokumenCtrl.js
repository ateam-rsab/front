define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterDokumenCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm', 'DateHelper',
		function($rootScope, $scope, ModelItem,$state,ManageSdm,DateHelper) {
			//adi tgl 11-jul-17
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			
			ManageSdm.getOrderList("rekrutmen/get-ruangan-kegiatan", true).then(function (dat) {
				$scope.listDataRuangan = dat.data.data;
			});

			ManageSdm.getOrderList("rekrutmen/get-kategori-dokumen", true).then(function (dat) {
				$scope.listKatDokumen = dat.data.data;
			});



			$scope.optDataMasterD = {
            	pageable:true,
            	selectable:'row',
            	scrollable:true,
            	columns: [
            	{
            		"field": "namaRuangan",
            		"title": "Ruangan",
            		"width": "15%"
            	},
            	{
            		"field": "kategoryDokumen",
            		"title": "Kategori Dokumen",
            		"width": "15%"
            	},
            	{
            		"field": "namaJudulDokumen",
            		"title": "Nama Dokumen",
            		"width": "15%"
            	}
            	]
            }

            var init = function(){
            ManageSdm.getOrderList("rekrutmen/get-all-dokumen", true).then(function (dat) {
				
				$scope.dataGridDokumen = dat.data.data;


				$scope.dataSource = new kendo.data.DataSource({
                	pageSize:8,
                	data: $scope.dataGridDokumen,
                	batch:true,
                	schema:{
                		model: {
                			fields:{
                				namaRuangan:{},
                				kategoryDokumen:{},
                				namaJudulDokumen:{}
                			}
                		}
                	},
            });

			});
			}

			init();


			$scope.Save = function(){
				debugger;

				var listRawRequired = [
					"item.ruangan|k-ng-model|Ruangan",
					"item.kategoriDokumen|k-ng-model|Kategori Dokumen",
					"item.namaDm|ng-model|Nama Dokumen"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);


				if (isValid.status){

					var Data = {
					"ruanganId" : $scope.item.ruangan.id,
					"ruangan" : $scope.item.ruangan.namaRuangan,
					"kategoriDokumenId": $scope.item.kategoriDokumen.id,
					"kategoriDokumen": $scope.item.kategoriDokumen.kategoryDokumen,
					"namaJudulDokumen": $scope.item.namaDm
					}

			  		ManageSdm.savePelaksanaanSeleksi(Data,"rekrutmen/save-dokumen").then(function(e) {
            			$scope.item.ruangan = "";
            			$scope.item.kategoriDokumen = "";
            			$scope.item.namaDm = "";
						init();
            		});

			  	}else{
			  		ModelItem.showMessages(isValid.messages);
			 	 }


			  };










		}
	]);
});