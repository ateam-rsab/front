define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LaporanPemakaianAirBersihCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','TampilDataAirBersih',
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
				TampilDataAirBersih.getOrderList("ipsrs-pemakaian-ruangan/pemakaian-air").then(function(dat){
					$scope.sourceOrder = dat.data.data;
					// debugger;
				});
			};
		
			init();

			$scope.reset = function(){			
				TampilDataAirBersih.getOrderList("ipsrs-pemakaian-ruangan/pemakaian-air").then(function(dat){
					$scope.sourceOrder = dat.data.data;
					// debugger;
				});
			};
		
			$scope.columnLaporanAirBersih = [
				{
					"field": "namaRuangan",
					"title": "Ruangan"
				},
				{
					"field": "periode",
					"title": "Periode"
				},
				{
					"field": "jenisPemakaian",
					"title": "Jenis Pemakaian"
				},
				{
					"field": "biayaPerBulan",
					"title": "Biaya per Bulan"
				},
				{
					title: "Stand Meter",
					columns: [
					{
						field: "jumlahMeterAwal",
						title: "Akhir",
						width: "100px",
						headerAttributes: { style: "text-align : center"},
						
					},
					{
						field: "jumlahMeterAhir",
						title: "Lalu",
						width: "100px",
						headerAttributes: { style: "text-align : center"},
						
					}
					],
					headerAttributes: { style: "text-align : center"}
				},
				{
					"field": "jumlahPemakaian",
					"title": "Jumlah Pemakaian"
				},
				{
					"field": "satuan",
					"title": "Satuan"
				}
			];
				
			$scope.cari = function() {
				
				var url, awal, akhir;

				if ($scope.item.dateStart !== undefined || $scope.item.dateEnd !== undefined) {
					var awal  =  DateHelper.getPeriodeFormatted($scope.item.dateStart);
					var akhir = DateHelper.getPeriodeFormatted($scope.item.dateEnd);

					url = "dateStart=" + awal +"&dateEnd="+ akhir;
				} else {
					url = "dateStart=&dateEnd=";
				}
	          	
	          	TampilDataAirBersih.getOrderList("pemakaian-air-bersih/find-by-periode?" + url).then(function(dat){
					$scope.sourceOrder = dat.data;
					debugger;	
				
				});
	        }

		}
	]);
});