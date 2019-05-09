define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPengajuanUsulanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("PengajuanUsulan/DaftarPengajuanUsulan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.dataSource = new kendo.data.DataSource({
		        pageSize: 2,
		        data: [
				{
					no:"1",
					tanggal: "2016-9-7",
					output: "Peralatan Dan Mesin",
					komponen: "Belanja Modal",
					akun: "Belanja Modal Peralatan Dan Mesin",
					sumberDana: "Dana Rumah Sakit",
					detail: "Optimalisasi software",
					spesifikasi: "Pembelian SOfware windows",
					keterangan: ""
				},{
					no:"1",
					tanggal: "2016-9-7",
					output: "Peralatan Dan Mesin",
					komponen: "Belanja Modal",
					akun: "Belanja Modal Peralatan Dan Mesin",
					sumberDana: "Dana Rumah Sakit",
					detail: "Optimalisasi software",
					spesifikasi: "Pembelian SOfware windows",
					keterangan: ""
				},{
					no:"1",
					tanggal: "2016-9-7",
					output: "Peralatan Dan Mesin",
					komponen: "Belanja Modal",
					akun: "Belanja Modal Peralatan Dan Mesin",
					sumberDana: "Dana Rumah Sakit",
					detail: "Optimalisasi software",
					spesifikasi: "Pembelian SOfware windows",
					keterangan: ""
				},{
					no:"1",
					tanggal: "2016-9-7",
					output: "Peralatan Dan Mesin",
					komponen: "Belanja Modal",
					akun: "Belanja Modal Peralatan Dan Mesin",
					sumberDana: "Dana Rumah Sakit",
					detail: "Optimalisasi software",
					spesifikasi: "Pembelian SOfware windows",
					keterangan: ""
				}],
		        autoSync: true
		    });

			$scope.mainGridOptions = {
		        dataSource: $scope.dataSource,
		        pageable: true,
		        columns: [
		          	{
						field: "no",
						title: "No",
						width: 40
					},
					{
						field: "tanggal",
						title: "Tanggal",
						width: 100
					},
					{
						field: "output",
						title: "Output",
						width: 150
					},
					{
						field: "komponen",
						title: "Komponen",
						width: 100
					},
					{
						field: "akun",
						title: "Akun",
						width: 150
					},
					{
						field: "sumberDana",
						title: "Sumber Dana",
						width: 100
					},
					{
						field: "detail",
						title: "Detail",
						width: 100
					},
					{
						field: "spesifikasi",
						title: "Spesifikasi",
						width: 100
					},
					{
						field: "keterangan",
						title: "Keterangan",
						width: 150
					}],
		    	editable: true
	      	};
		}
	]);
});