define(['initialize'], function(initialize) {
	"use strict";
	initialize.controller('InformasiDaftarGajiPegawaiHonorCtrl', ['$rootScope', '$scope', '$state', 
		function($rootScope, $scope, $state){
			$scope.item = {};
			$scope.dataVOloaded = true;
			
			$scope.columnGajiPegawaiHonor = [{
				field: "noGaji",
				title: "<div style='text-align:center'>No Gaji</div>"
			}, {
				field: "periode",
				title: "<div style='text-align:center'>Periode</div>"
			}, {
				field: "statusPegawai",
				title: "<div style='text-align:center'>Pegawai</div>"
			}, {
				field: "keterangan",
				title: "<div style='text-align:center'>Keterangan</div>"
			}]
			$scope.mainGridOptions = {
				columns: $scope.columnGajiPegawaiHonor,
				selectable: "row",
				scrollable: false,
				editable: "popup"
			}
			$scope.dataSource = new kendo.data.DataSource({
				data: []
			})
			$scope.listPilihan = [{
				"id": 1,
				"kode": "1",
				"keterangan": "Golongan I"
			}, {
				"id": 2,
				"kode": "2",
				"keterangan": "Golongan II"
			}, {
				"id": 3,
				"kode": "3",
				"keterangan": "Golongan III"
			}, {
				"id": 4,
				"kode": "4",
				"keterangan": "Golongan IV"
			}, {
				"id": 5,
				"kode": "5",
				"keterangan": "Rekapitulasi"
			}];
			$scope.Detail = function() {
				 $state.go("DetailDaftarGajiPegawaiHonor");
			}
		}
	])
});