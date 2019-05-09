define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DataPemeriksaanCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','FindPasien','MasterLimbah','TampilDataLimbahKeluar',
		function($rootScope, $scope, ModelItem,DateHelper,FindPasien,MasterLimbah,TampilDataLimbahKeluar) {
			ModelItem.get("Humas/MonitoringStatusPks").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;

			}, function errorCallBack(err) {});
	MasterLimbah.getOrderList("service/list-generic/?view=JenisLimbahB3Masuk&select=*").then(function(dat){
		$scope.ListLimbah = dat.data;
      
			});
			$scope.columnMonitoringStatusPKS = [
			{
				field: "hasilPemeriksaanSwaDetail.satuanStandar",
				title: "Tanggal",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			},
			
			{
				field: "hasilPemeriksaanSwaDetail.nilai",
				title: "Inlet Debit",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "hasilPemeriksaanSwaDetail.parameter",
				title: "Outlet Debit",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "hasilPemeriksaanSwaPantauLimbahCair.keterangan",
				title: "Keterangan",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			}];
			
			 TampilDataLimbahKeluar.getOrderList("hasil-pemeriksaan-swa-pantau-limbah-cair/list-hasil-pemeriksaan-limbah-cair").then(function(dat){
			$scope.sourceOrder = dat.data.data;
			
			debugger;	
	          $scope.sourceOrder.forEach(function(data){
						var date = new Date(data.hasilPemeriksaanSwaPantauLimbahCair.tanggal);
						data.hasilPemeriksaanSwaPantauLimbahCair.tanggal = DateHelper.getTanggalFormatted(date);
						

					})	
		
			});
			
			
			$scope.cari = function()
		{
			
				var awal  =  DateHelper.getPeriodeFormatted($scope.item.periodeAwal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.periodeAkhir);
				
				
	       debugger;
        
		   TampilDataLimbahKeluar.getOrderList("hasil-pemeriksaan-swa-pantau-limbah-cair/list-hasil-pemeriksaan-limbah-cair?dateStart="+awal+"&dateEnd="+akhir).then(function(dat){
			$scope.sourceOrder = dat.data.data;
			
			debugger;	
	          $scope.sourceOrder.forEach(function(data){
						var date = new Date(data.hasilPemeriksaanSwaPantauLimbahCair.tanggal);
						data.hasilPemeriksaanSwaPantauLimbahCair.tanggal = DateHelper.getTanggalFormatted(date);
						

					})	
		
			});
			
				
					
					
		

	
			
				
			
		
		
		
		
		
			
			}
		}
	]);
});