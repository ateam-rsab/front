define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('IkiRemunerasiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','NamaAsuransi','ManageSdm','RekamDataPegawai',
		function($rootScope, $scope, ModelItem,$state,NamaAsuransi,ManageSdm,RekamDataPegawai) {
			debugger;
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.no=1;
			//tanggal sekarang
			$scope.now = new Date();
			var NoRec = '';
			var idPeg = '';
			$scope.yearSelected = { 
				start: "year", 
				depth: "year" 
			};

			RekamDataPegawai.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true").then(function(dat) {
				$scope.listDataPegawai = dat.data;
			});

   			/*$scope.$watch('item.dataPegawai', function(e) {
   				if (e === undefined) return;
   				if ($scope.item.bulan === undefined) return;
   				debugger;
   				$scope.cariData();
   			});*/

   			$scope.cari = function(){

   				if ($scope.item.bulan === undefined || $scope.item.dataPegawai === undefined){
   					window.messageContainer.error("Bulan dan pegawai harus terisi terlebih dahulu");
   					return;
   				}


   				RekamDataPegawai.getOrderList("iki-remunerasi/get-kalkulasi-remunerasi?id="+ $scope.item.dataPegawai.id 
   					+"&date="+ moment($scope.item.bulan).format("YYYY-MM") +"-01").then(function(dat){ 
					//$scope.listDataPegawai = dat.data;
					console.log( dat.data);
					$scope.item.gaji = dat.data.data.gaji;
					$scope.item.indeksKehadiran = dat.data.data.nilaiIndeksKehadiran;
					$scope.item.iki = dat.data.data.iki;
					$scope.item.jabatan = dat.data.data.jabatan;
					$scope.item.grade = dat.data.data.grade;
					$scope.item.nilaiJabatan = dat.data.data.nilaiJabatan;
					$scope.item.pir = dat.data.data.pir;
					$scope.item.pirP1 =dat.data.data.P1;
					$scope.item.pirP2 = dat.data.data.P2;
					$scope.item.ikuInstalasi= dat.data.data.iku;
					NoRec = dat.data.data.noRec;

					//$scope.item.p1 = dat.data.data.P1_Rp;
					///$scope.item.p2 = dat.data.data.P2_Rp;
 				   //"kelompokJabatanId": 0,
 				   debugger;
 				   $scope.item.p1 = dat.data.data.P1_Rp ;
 				   $scope.item.p2 = dat.data.data.P2_Rp;
 				   $scope.item.remunerasi =  dat.data.data.remunerasi;
 				   idPeg = $scope.item.dataPegawai.id ;
 				});	

   				}

   				$scope.Save = function() { 
   					if ( $scope.item.remunerasi === 0 ||  $scope.item.remunerasi === undefined || $scope.item.tanggalProses === undefined ){
   						window.messageContainer.error("Data harus dilengkapi terlebih dahulu");
   						return;
   					}
   					var data ={
                      "ikiDanRemunerasi" : 
                     [{
   						"pegawai":{
   							"id":idPeg
   						},
   						"nilaiJabatan": $scope.item.nilaiJabatan,
   						"p2": $scope.item.pirP2,
   						"p1": $scope.item.pirP1,
   						"gaji": $scope.item.gaji,
   						"indekKehadiran": $scope.item.indeksKehadiran,
   						"iki": $scope.item.iki,
   						"p2Rp": $scope.item.p2,
   						"tanggal": moment($scope.item.tanggalProses).format("YYYY-MM-DD"), 
                     "periode": moment($scope.item.bulan).format("YYYY-MM"), 
   						"evaluasiJabatan": {
   							"noRec":NoRec
   						},  
   						"p1Rp": $scope.item.p1,
   						"pir": $scope.item.pir,
   						"grade": $scope.item.grade,
   						"remunerasi": $scope.item.remunerasi,
   						"iku": $scope.item.ikuInstalasi,
   						"statusEnabled":true
   					}
                  ]}



   					ManageSdm.saveDataUji(data,"iki-remunerasi/save-iki-remunerasi").then(function(e) {
   						console.log(JSON.stringify(e.data));
   						 
   					});

   				};

   			}
   			]);
});