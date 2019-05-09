define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MonitoringDanEvaluasiHasilPekerjaanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("IPSRS/MonitoringDanEvaluasiHasilPekerjaan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.dataSource = new kendo.data.DataSource({
 					pageSize: 2,
			        data: [],
			        autoSync: true
			    });

				$scope.mainGridOptions = {
			        dataSource: $scope.dataSource,
			        pageable: false,
			        columns: [
			          	{
							field: "namaKegiatan",
							title: "<h3 align='center'>Nama Kegiatan</h3>",
							width: 100
						},
						{
							field: "tglPerbaikan",
							title: "<h3 align='center'>Tgl. Perbaikan</h3>",
							width: 100
						},
						{
							field: "tglSelesai",
							title: "<h3 align='center'>Tgl Selesai</h3>",
							width: 100
						},
						{
							field: "namaPT",
							title: "<h3 align='center'>Nama PT</h3>",
							width: 100
						},
						{
							field: "namaTeknisi",
							title: "<h3 align='center'>Nama Teknisi</h3>",
							width: 100
						},
						{
							field: "ketepatanWaktu",
							title: "<h3 align='center'>Ketepatan Waktu</h3>",
							width: 100
						},
						{
							field: "frekuensiKerusakan",
							title: "<h3 align='center'>Frekuensi Kerusakan</h3>",
							width: 150
						},
						{
							field: "hasilService",
							title: "<h3 align='center'>Hasil Service</h3>",
							width: 150
						},
						{
							field: "tindakLanjutComplain",
							title: "<h3 align='center'>Tindak Lanjut Complain</h3>",
							width: 150
						}],
			    	editable: false
		      	};
			}, function errorCallBack(err) {});
		}
	]);
});