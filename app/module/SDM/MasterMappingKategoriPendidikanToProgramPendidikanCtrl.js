define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterMappingKategoriPendidikanToProgramPendidikanCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm',
		function($rootScope, $scope, ModelItem, ManageSdm) {
			$scope.item = {};
			var init = function () {
				ManageSdm.getItem("map-diklat-program-to-jurusan/get-kategori-pendidikan").then(function(dat){
					$scope.listKategoriPendidikan = dat.data.data;
				});
				ManageSdm.getItem("map-diklat-program-to-jurusan/get-pendidikan").then(function(dat){
					$scope.listPendidikan = dat.data.data;
				});
				ManageSdm.getItem("map-diklat-program-to-jurusan/get-jurusan-peminatan").then(function(dat){
					$scope.listJurusan = dat.data.data;
				});
				ManageSdm.getItem("map-diklat-program-to-jurusan/get-all").then(function(dat){
					$scope.dataGrid = dat.data.data;
					$scope.dataGridMaster = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataGrid
					});
				});
			}; 
			init();
			$scope.item.jurusan = [];
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"diklatKategori",title:"Kategori Pendidikan" },
				{ field:"diklatProgram",title:"Pendidikan" },
				{ field:"diklatJurusan",title:"Jurusan Peminatan" }],
				editable: false
			};
			$scope.simpan = function () {
				var listDiklatJurusan = [];
				var listRawRequired = [
					"item.kategoriPendidikan|ng-model|NIM",
					"item.pendidikan|ng-model|Nama Lengkap",
					"item.jurusan|k-ng-model|Jenis Kelamin"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					$scope.item.jurusan.forEach(function (data) {
						var temp = {
							"diklatJurusanId":data.id,
							"diklatJurusan":data.diklatJurusan
						}
						listDiklatJurusan.push(temp);
					})
					var data = {
						"kategoriPendidikanId":$scope.item.kategoriPendidikan.id,
						"namaKategoriPendidikan":$scope.item.kategoriPendidikan.diklatKategori,
						"pendidikanId":$scope.item.pendidikan.id,
						"namaPendidikan":$scope.item.pendidikan.namaPendidikan,
						"listDiklatJurusan":listDiklatJurusan
					}
					ManageSdm.saveData(data, "map-diklat-program-to-jurusan/save").then(function(e) {
						$scope.item = {};
						init();
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			}
		}
		]);
});