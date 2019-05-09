define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LaporanPemakaiandanPemanasanMesinPerJenisMesinCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','TampilDataAirBersih',
		function($rootScope, $scope, ModelItem,DateHelper,TampilDataAirBersih) {
			ModelItem.get("Kesling/LaporanPemakaianAirBersih").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.dataLaporanAirBersih = new kendo.data.DataSource({
				data: []
			});

			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})
			
			
			var init = function(){			
				TampilDataAirBersih.getOrderList("pemakaian-mesin/find-all-pemakaian-mesin/").then(function(dat){
					$scope.sourceOrder = dat.data.data;
					debugger;

					if ($scope.sourceOrder.dataFound == false) {
						alert("data tidak tersedia");
					} else {

						$scope.sourceOrder.forEach(function(data){
							var date = new Date(data.tanggal);
							data.tanggal = DateHelper.getTanggalFormatted(date);

						})

					}
				});
			};
	
			init();	
			

			$scope.columnLaporanAirBersih = [
				{
					"field": "tanggal",
					"title": "Tanggal",
					"width": "30%"
				},
				{
					"field": "mesin.namaExternal",
					"title": "Nama mesin",
					"width": "20%"
				},
				
				{
					"field": "lamaPemakaianPemanasanMesin",
					"title": "Lama Pemakaian/Pemanasan",
					"width": "20%"
				},
				{
					"field": "keterangan",
					"title": "Keterangan",
					"width": "20%"
				}
			];
			
			$scope.cari = function() {
				var awal, akhir;
				if ($scope.item.dateStart == undefined || $scope.item.dateEnd == undefined) {
					awal = "dateStart=";
					akhir = "&dateEnd=";
				} else {
					awal = "dateStart=" + DateHelper.getPeriodeFormatted($scope.item.dateStart);
					akhir = "&dateEnd=" + DateHelper.getPeriodeFormatted($scope.item.dateEnd);
				}
				// var awal  =  DateHelper.getPeriodeFormatted($scope.item.dateStart);
				// var akhir = DateHelper.getPeriodeFormatted($scope.item.dateEnd);
		       	//debugger;
	   //       	TampilDataAirBersih.getOrderList("pemakaian-mesin/find-by-periode?dateStart="+awal+"&dateEnd="+akhir).then(function(dat){
				// 	$scope.sourceOrder = dat.data;
				// 	//debugger;	
				// });

				TampilDataAirBersih.getOrderList("pemakaian-mesin/find-by-periode?"+awal+akhir).then(function(dat){
					$scope.sourceOrder = dat.data;
					//debugger;	
				});
			
			}
		}
	]);
});