define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SettingKomponenRenumerisasiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,ManageSdm) {

			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.status = false;
			$scope.awal;
			$scope.akhir;
			$scope.ids; 
			$scope.get;
			$scope.mainGridOption = {
				pageable: true,
                enableHorizontalScrollbar: 1,  
              /*  filterable: {
                            extra: false,
                            operators: {
                                string: {
                                    startswith: "Dimulai dengan",
                                    eq: "mengandung kata",
                                    neq: "Tidak mengandung kata"
                                }
                            }
                        },*/
				columns:[
				{
                    "field": "id",
                    "title": "id",
                    visible:false //,filterable :false
                },
				{
					"field": "tglAwal",
					"title": "Periode Berlaku",width:"34%"
				},
				{
					"field": "pir",
					"title": "PIR",width:"33%"
				},
				{
					"field": "iku",
					"title": "IKU",width:"33%"
				} 
				]};

				var years = $scope.now.getFullYear();
				years = years - 5;
				$scope.listTahun =[];
				var c = 0;
				while(c < 10){
					$scope.listTahun.push({'tahun': years + c})
					c++;
				}

				$scope.Cari = function(){
					if($scope.item.tahun.tahun === undefined )return; 
					$scope.isLoadingData = true; 
					ManageSdm.getOrderList("iki-remunerasi/get-iku-dan-pir/"+ $scope.item.tahun.tahun +"-01-01/"+ $scope.item.tahun.tahun +"-12-31").then(function(dat){
						$scope.awal =$scope.item.tahun.tahun + "-01-01";
						$scope.akhir = $scope.item.tahun.tahun +"-12-31";
						$scope.status = dat.data.data.status;
						$scope.get =[];
						$scope.get.push(dat.data.data);
						$scope.sourceOrder = new kendo.data.DataSource({
							data : $scope.get
						});  

						$scope.isLoadingData = false; 
					});
					
				}

				$scope.klik = function(){ 
					$scope.ids = $scope.sourceOrder._data[0].id;
					$scope.item.pir = $scope.sourceOrder._data[0].pir;
					$scope.item.iku = $scope.sourceOrder._data[0].iku;  
				};

				$scope.Ubah = function(){
					if($scope.status === true){
  							window.messageContainer.error("Data tidak boleh dirubah");
  							return;
					}

					if($scope.item.pir >=0 ){
						var dataSend = {
							"id" : $scope.ids,
							"tglAwal": $scope.awal, 
							"tglAkhir": $scope.akhir,
							"pir": $scope.item.pir,
							"tglBerlaku": $scope.awal,
							"suratKeputusan": {
								"id":160
							},
							"iku": $scope.item.iku
						}
						ManageSdm.saveDataUji(dataSend,"iki-remunerasi/save-pir-dan-iku").then(function(e) {
							console.log("DATA :" + JSON.stringify(dataSend));
							$scope.item.pir ='';
							$scope.item.iku ='';
							$scope.Cari();
						}); 
					}
				}

			}
			]);
});