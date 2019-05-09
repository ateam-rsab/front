define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('DataAsuransiBekerjasamaCtrl', ['$rootScope', '$scope', 'ModelItem', 'DataPerusahaanBekerjasama' ,'TampilDataPerusahaanBekerjasama', 'ManageSarpras', '$state',
        function($rootScope, $scope, ModelItem,DataPerusahaanBekerjasama,TampilDataPerusahaanBekerjasama, ManageSarpras, $state) {
		$scope.item = {};
		
		
		DataPerusahaanBekerjasama.getOrderList("data-perusahaan-yang-bekerjasama/get-asuransi-yang-bekerja-sama/", true).then(function(dat){
				$scope.ListDataPerusahaanBekerjasama = dat.data.data;
				});
				
		var init = function(){				
		TampilDataPerusahaanBekerjasama.getOrderList("data-peserta-perusahaan-yang-bekerja-sama/find-all-data-peserta/").then(function(dat){
		$scope.sourceOrder = dat.data.data;
			});
			};
	init();	
	//define column untuk grid
//MasterLinen.getOrderList("service/list-generic/?view=JenisLinen&select=*").then(function(dat){
	//			$scope.sourceOrder = dat;
	//		});
			// $scope.dataSasaranStrategis = new kendo.data.DataSource({
			// 	data: [
			// 	{
			// 		"kodeSasaranStrategis": "001",
			// 		"sasaranStrategis": "Terpenuhinya SDM yang kompeten"
			// 	}
			// 	]
			// });

			$scope.columndataMasterDataPerusahaan= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "namaPeserta",
			"title": "Nama Peserta",
			"width": "100px"
		}, {
			"field": "jenisKelamin.namaExternal",
			"title": "Jenis Kelamin",
			"width": "100px"
				
		}, {
			"field": "jumlahKeluarga",
			"title": "Jumlah Keluarga",
				"width": "100px"
				
          }, {
			"field": "plafonYangDijamin",
			"title": "Plafon Yang Dijamin",
			"width": "100px" 

            }, {
				"field": "alamat",
			"title": "Alamat",
			"width": "100px"
			
            }, {
			"field": "noTlp",
				"title": "No Telp",
				"width": "100px"			
				
				
			
            
				
			
		    }];
			
			
			$scope.batal = function()
			{
			 $scope.item= {};
			
			}

		$scope.cari = function()
			{
			TampilDataPerusahaanBekerjasama.getOrderList("data-peserta-perusahaan-yang-bekerja-sama/get-peserta-by-data-perusahaan/" + $scope.item.noRec.noRec + "/").then(function(dat){
		$scope.sourceOrder = dat.data.data;
			});	
			}
		
		  $scope.Save = function() {
						
			  
             ManageSarpras.saveDataPerusahaanBekerjasama(ModelItem.beforePost($scope.item)).then(function (e) {
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