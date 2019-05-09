define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DataLaporanUjiHasilCtrl', ['$rootScope', '$scope', '$state', 'ModelItem','DateHelper','FindPasien','MasterLimbah','TampilDataLimbahKeluar',
		function($rootScope, $scope, $state, ModelItem,DateHelper,FindPasien,MasterLimbah,TampilDataLimbahKeluar) {
			ModelItem.get("Humas/MonitoringStatusPks").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;

			}, function errorCallBack(err) {});

			$scope.columnMonitoringStatusPKS = [
			{
				field: "uraianContoh",
				title: "Uraian Contoh",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "tanggalPenerimaanContoh",
				title: "Tanggal terima lab",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "",
				title: "Tanggal Pengujian",
				columns: [
				{
					field: "tanggalPengujianContohFrom",
					title: "Dari",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					
				},
				{
					field: "tanggalPengujianContohTo",
					title: "Sampai",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					
				}
				],
				headerAttributes: { style: "text-align : center"}
			},{
				field: "namaRekanan",
				title: "PT",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			}];
			
			var init = function(){
				TampilDataLimbahKeluar.getOrderList("laporan-uji-hasil/list-laporan-uji-hasil").then(function(dat){
					$scope.sourceOrder = dat.data.data;
				
					//debugger;	
		         	 $scope.sourceOrder.forEach(function(data){
						var date = new Date(data.tanggalPengujianContohFrom);
						data.tanggalPengujianContohFrom = DateHelper.getTanggalFormatted(date);
						var date = new Date(data.tanggalPengujianContohTo);
						data.tanggalPengujianContohTo = DateHelper.getTanggalFormatted(date);
						var date = new Date(data.tanggalPenerimaanContoh);
						data.tanggalPenerimaanContoh = DateHelper.getTanggalFormatted(date);

					})	
			
				});
			}
			
			init();

			$scope.reset = function(){
				TampilDataLimbahKeluar.getOrderList("laporan-uji-hasil/list-laporan-uji-hasil").then(function(dat){
					$scope.sourceOrder = dat.data.data;
				
					//debugger;	
		         	 $scope.sourceOrder.forEach(function(data){
						var date = new Date(data.tanggalPengujianContohFrom);
						data.tanggalPengujianContohFrom = DateHelper.getTanggalFormatted(date);
						var date = new Date(data.tanggalPengujianContohTo);
						data.tanggalPengujianContohTo = DateHelper.getTanggalFormatted(date);
						var date = new Date(data.tanggalPenerimaanContoh);
						data.tanggalPenerimaanContoh = DateHelper.getTanggalFormatted(date);

					})	
			
				});
			}

			$scope.cari = function() {

				var url, awal, akhir;
				
				if ($scope.item.periodeAwal !== undefined || $scope.item.periodeAkhir !== undefined) {
					
					var awal  =  DateHelper.getPeriodeFormatted($scope.item.periodeAwal);
					var akhir = DateHelper.getPeriodeFormatted($scope.item.periodeAkhir);
					url = "dateStart="+awal+"&dateEnd="+akhir;
				
				} else {
					url = "dateStart=&dateEnd=";
				}
				
	       		//debugger;
        
		   		TampilDataLimbahKeluar.getOrderList("laporan-uji-hasil/list-laporan-uji-hasil?" + url).then(function(dat){
					$scope.sourceOrder = dat.data.data;
			
					//debugger;	
	          		$scope.sourceOrder.forEach(function(data){
						var date = new Date(data.tanggalPengujianContohFrom);
						data.tanggalPengujianContohFrom = DateHelper.getTanggalFormatted(date);
						var date = new Date(data.tanggalPengujianContohTo);
						data.tanggalPengujianContohTo = DateHelper.getTanggalFormatted(date);
						var date = new Date(data.tanggalPenerimaanContoh);
						data.tanggalPenerimaanContoh = DateHelper.getTanggalFormatted(date);

					})	
				});
			}

			$scope.kl = function(current){
				$scope.current = current;
				console.log(current)
			}

			$scope.navToDetail = function() {
                $state.go('LaporanUjiHasilDetail', {
                    noRec: $scope.current.noRec
                });
                // debugger;
            };
		}
	]);
});