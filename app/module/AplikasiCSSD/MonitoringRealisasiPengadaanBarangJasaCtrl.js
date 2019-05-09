define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MonitoringRealisasiPengadaanBarangJasaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.columnBarangJasa = [
			{
				field: "noPerencanaan",
				title: "No Perencanaan"
			},
			{
				"title": "Pengendali Kegiatan",
				columns: [
					{
						"field": "statusKegiatan",
						"title": "Status"
					},
					{
						"field": "tglSelesaiKegiatan",
						"title": "Tanggal"
					},
					{
						"field": "jamSelesaiKegiatan",
						"title": "Jam"
					}
				]
			},
			{
				"title": "PEA",
				columns: [
					{
						"field": "statusPEA",
						"title": "Status"
					},
					{
						"field": "tglSelesaiPEA",
						"title": "Tanggal"
					},
					{
						"field": "jamSelesaiPEA",
						"title": "Jam"
					}
				]
			},
			{
				"title": "Direktur Terkait",
				columns: [
					{
						"field": "statusDT",
						"title": "Status"
					},
					{
						"field": "tanggalSelesaiDT",
						"title": "Tanggal"
					},
					{
						"field": "jamSelesaiDT",
						"title": "Jam"
					}
				]
			},
			{
				"title": "Direktur Keuangan",
				columns: [
					{
						"field": "statusDK",
						"title": "Status"
					},
					{
						"field": "tanggalSelesaiDK",
						"title": "Tanggal"
					},
					{
						"field": "jamSelesaiDK",
						"title": "Jam"
					}
				]
			}
		];
		$scope.columnLanjutan = [
			{
				"title": "PPK",
				columns: [
					{
						"field": "statusPPK",
						"title": "Status"
					},
					{
						"field": "tglSelesaiPPK",
						"title": "Tanggal",
						width: "75px"
					},
					{
						"field": "jamSelesaiPPK",
						"title": "Jam"
					}
				]
			},
			{
				"title": "UUP",
				columns: [
					{
						"field": "statusUUP",
						"title": "Status"
					},
					{
						"field": "tglSelesaiUUP",
						"title": "Tanggal",
						width: "75px"
					},
					{
						"field": "jamSelesaiUUP",
						"title": "Jam"
					}
				]
			},
			{
				"title": "PPHP",
				columns: [
					{
						"field": "statusPPHP",
						"title": "Status"
					},
					{
						"field": "tanggalSelesaiPPHP",
						"title": "Tanggal",
						width: "75px"
					},
					{
						"field": "jamSelesaiPPHP",
						"title": "Jam"
					}
				]
			},
			{
				"title": "Akver",
				columns: [
					{
						"field": "statusAkver",
						"title": "Status"
					},
					{
						"field": "tanggalSelesaiAkver",
						"title": "Tanggal",
						width: "75px"
					},
					{
						"field": "jamSelesaiAkver",
						"title": "Jam"
					}
				]
			},
			{
				"title": "PMD",
				columns: [
					{
						"field": "statusPMD",
						"title": "Status"
					},
					{
						"field": "tanggalSelesaiPMD",
						"title": "Tanggal",
						width: "75px"
					},
					{
						"field": "jamSelesaiPMD",
						"title": "Jam"
					}
				]
			}
		];
	}])
})