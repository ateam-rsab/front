define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MonitoringStatusPks2Ctrl', ['$rootScope', '$scope', 'ModelItem','FindPasien','$state',
		function($rootScope, $scope, ModelItem, FindPasien,$state) {
			ModelItem.get("Humas/MonitoringStatusPks").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			FindPasien.getMonitoringStatusPKS("data-perusahaan-yang-bekerjasama/find-all-data-perusahaan-yang-bekerjasama/").then(function(dat){
				$scope.dataMonitoringStatusPKS = dat.data.data;
			});
			$scope.columnMonitoringStatusPKS = [
			{
				field: "noPks",
				title: "No PKS",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "namaPerusahaan",
				title: "Nama Perusahaan<br>/Asuransi",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "alamat",
				title: "Alamat",
				width: "200px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "contactPerson",
				title: "Contact Person",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "jumlahKaryawan",
				title: "Jumlah Karyawan<br>/Nasabah",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "tanggalPks",
				title: "Tanggal PKS",
				columns: [
				{
					field: "tanggalAwal",
					title: "Tanggal Awal",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAwal)).format('DD-MM-YYYY') #"
				},
				{
					field: "tanggalAkhir",
					title: "Tanggal Akhir",
					width: "100px",
					headerAttributes: { style: "text-align : center"},
					template: "#= new moment(new Date(tglAkhir)).format('DD-MM-YYYY') #"
				}
				],
				headerAttributes: { style: "text-align : center"}
			},
			{
				command: {text: "Download", click:$scope.removeMakanan},
				title : "&nbsp;",
				width: "100px",
				headerAttributes: { style: "text-align : center"}
			}];
		}
	]);
});