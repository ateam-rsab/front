define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarBarangMonitoringDanEvaluasiCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', '$state',
		function($rootScope, $scope, ModelItem, IPSRSService, $state) {
			ModelItem.get("IPSRS/DaftarBarangMonitoringDanEvaluasi").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				var init = function () {
					debugger
					IPSRSService.getItem("", true).then(function(dat){
						debugger
						$scope.dataBarangMonev = dat.data.data.listIpsrsPeminjamanAlat;
						if ($scope.dataPeminjamanAlat == undefined) {
								
						} else {
							$scope.dataBarangMonev.forEach(function(data){
								var date1 = new Date(data.tanggalPengerjaan);
								data.tanggalPengerjaan = DateHelper.getTanggalFormatted(date1);
							});
						}
						
						$scope.dataSource = new kendo.data.DataSource({
		                    pageSize: 10,
		                    data: $scope.dataBarangMonev,
		                    autoSync: true
		                });
					});
				}
				init();
				$scope.mainGridBarangMonev = { 
                    pageable: true,
                    columns: [
                        {field: "namaProduk",title: "Nama Barang",width: 100},
						{field: "merk",title: "Merk",width: 150},
						{field: "type",title: "Type",width: 150},
						{field: "tanggalPengerjaan",title: "Tanggal Pengerjaan",width: 150},
						{field: "namaPT",title: "Nama PT",width: 150},
						{field: "namaTeknisi",title: "Nama Teknisi",width: 100}
                    ],
                };
			}, function errorCallBack(err) {});
		}
	]);
});