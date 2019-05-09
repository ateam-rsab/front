define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MonitoringStatusPksCtrl', ['$rootScope', '$scope', 'ModelItem','FindPasien',
		function($rootScope, $scope, ModelItem, FindPasien) {
			ModelItem.get("Humas/MonitoringStatusPks").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;

			}, function errorCallBack(err) {});
			FindPasien.getMonitoringStatusPKS("data-perusahaan-yang-bekerjasama/find-all-data-perusahaan-yang-bekerjasama/").then(function(dat){
				$scope.dataMonitoringStatusPKS = dat.data.data.data;
				for (var i=0; i<$scope.dataMonitoringStatusPKS.length;i++)
						{			

                            var d3= $scope.dataMonitoringStatusPKS[i].sekarang = new Date().getTime();
							var d1 = moment($scope.dataMonitoringStatusPKS[i].tglAkhir);
							var d2 = moment( $scope.dataMonitoringStatusPKS[i].tglAwal);
							var days = moment.duration(d1.diff(d3)).asMonths();
							$scope.dataMonitoringStatusPKS[i].lama = days;
							if(2 <= $scope.dataMonitoringStatusPKS[i].lama <=0)
							
							{
							$scope.dataMonitoringStatusPKS[i].status ='mendekati non aktif';	
								
								
							}
							else if($scope.dataMonitoringStatusPKS[i].lama < 2)
							{
							$scope.dataMonitoringStatusPKS[i].status ='aktif';		
								
							}	
							else
							{
							$scope.dataMonitoringStatusPKS[i].status ='non aktif';		
								
							}	
							
							
							
						}
						debugger;
			});
			$scope.columnMonitoringStatusPKS = [
			{
				field: "noPks",
				title: "No PKS",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			},
			{
				field: "noPks",
				title: "Jenis PKS",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			},
			
			{
				field: "namaPerusahaan",
				title: "Nama Perusahaan,Asuransi,<br>Rumah Sakit,Dinas Kesehatan",
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
			// {
			// 	field: "jumlahKaryawan",
			// 	title: "Jumlah Karyawan<br>/Nasabah",
			// 	width: "150px",
			// 	headerAttributes: { style: "text-align : center"}
			// },
			// {
			// 	field: "tanggalPks",
			// 	title: "Tanggal PKS",
			// 	columns: [
				{
					field: "tanggalAwal",
					title: "Tanggal Mulai",
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
				},
				// ],
				// headerAttributes: { style: "text-align : center"}
			// },
			{
				field: "status",
				title: "Status",
				width: "150px",
				headerAttributes: { style: "text-align : center"}
			}];
		}
	]);
});