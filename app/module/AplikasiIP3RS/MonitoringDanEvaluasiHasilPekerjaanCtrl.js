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
							title: "Nama Kegiatan",
							width: 100
						},
						{
							field: "tglPerbaikan",
							title: "Tgl. Perbaikan",
							width: 100
						},
						{
							field: "tglSelesai",
							title: "Tgl Selesai",
							width: 100
						},
						{
							field: "namaPT",
							title: "nama PT",
							width: 100
						},
						{
							field: "namaTeknisi",
							title: "Nama Teknisi",
							width: 100
						},
						{
							field: "ketepatanWaktu",
							title: "Ketepatan Waktu",
							width: 100
						},
						{
							field: "frekuensiKerusakan",
							title: "Frekuensi Kerusakan",
							width: 150
						},
						{
							field: "hasilService",
							title: "Hasil Service",
							width: 150
						},
						{
							field: "tindakLanjutComplain",
							title: "Tindak Lanjut Complain",
							width: 150
						}],
			    	editable: false
		      	};
			}, function errorCallBack(err) {});
		}
	]);
});