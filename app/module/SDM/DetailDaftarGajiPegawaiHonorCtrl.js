define(['initialize'], function(initialize) {
	"use strict";
	initialize.controller('DetailDaftarGajiPegawaiHonorCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm', 
		function($rootScope, $scope, ModelItem, ManageSdm){
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.columnDetailGajiHonor = [{
				field: "nip",
				title: "<div style='text-align:center'>NIP</div>"
			}, {
				field: "namaPegawai",
				title: "<div style='text-align:center'>Nama Pegawai</div>"
			}, {
				field: "golongan",
				title: "<div style='text-align:center'>Golongan</div>"
			}, {
				field: "pendidikan",
				title: "<div style='text-align:center'>Pendidikan</div>"
			}, {
				field: "masaKerja",
				title: "<div style='text-align:center'>Masa Kerja</div>"
			},{
				field: "jabatan",
				title: "<div style='text-align:center'>Jabatan</div>"
			}, {
				field: "komponenHarga",
				title: "<div style='text-align:center'>Komponen Harga</div>"
			}, {
				field: "harga",
				title: "<div style='text-align:center'>Harga</div>"
			}];
			$scope.dataSource = new kendo.data.DataSource({
				data: []
			});
			$scope.mainGridOptions = {
				columns: $scope.columnDetailGajiHonor,
				selectable: "row",
				editable: "popup",
				scrollable: false
			};
		}
	])
});