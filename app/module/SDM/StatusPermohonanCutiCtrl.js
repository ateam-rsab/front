define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('StatusPermohonanCutiCtrl', ['$rootScope', '$scope', 'ModelItem','$state',
		function($rootScope, $scope, ModelItem,$state) {
			ModelItem.get("Humas/MonitoringStatusPks").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;

			}, function errorCallBack(err) {});
			
			 $scope.pindah = function(){
				 
				$state.go("CutiPegawai");
				 
			 }

			$scope.columnMonitoringStatusPKS = [
			{
				field: "tglstruk",
				title: "No Permohonan",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			},
			
			{
				field: "jenisLimbahB3masuk",
				title: "Nama Pegawai",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "qtyproduk",
				title: "Unit Kerja",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "satuanWaktuKesling",
				title: "Jenis Cuti",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "ruanganTujuan",
				title: "Tanggal Pengajuan Cuti",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "ruanganAsal",
				title: "Status Persetujuan(Disetujui/Ditolak)",
				width: "250px",
				headerAttributes: { style: "text-align : center"}
			}];
			

		}
	]);
});