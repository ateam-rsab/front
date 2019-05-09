define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterBiayaDiklatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'DateHelper',
		function($rootScope, $scope, ModelItem, ManageSdm, DateHelper) {
			$scope.item = {};
			$scope.listKelas = ModelItem.kendoHttpSource('service/list-generic/?view=Kelas&select=namaKelas,id', true);
			$scope.listAsal = ModelItem.kendoHttpSource('service/list-generic/?view=AsalProduk&select=asalProduk,id', true);
			$scope.listJenisTarif = ModelItem.kendoHttpSource('service/list-generic/?view=JenisTarif&select=jenisTarif,id', true)
			ManageSdm.getItem("pelatihan-biaya-diklat/daftar-komponen").then(function(dat){
				$scope.listKomponen = dat.data.data;
			}); 
			$scope.item.diskon = 0;
			$scope.hitungDiskon = function () {
				var hargaSatuan = parseInt($scope.item.hargaSatuan);
				var diskon = parseInt($scope.item.diskon)
				$scope.item.hargaDiskon = hargaSatuan - (diskon/100 * hargaSatuan);
			}
			ManageSdm.getItem("pelatihan-biaya-diklat/list-biaya-diklat").then(function(dat){
				$scope.dataObject = dat.data.data;
				$scope.dataObject.forEach(function (data) {
					var date1 = new Date(data.tanggalAwal);
					var date2 = new Date(data.tanggalAhir);
					data.tanggalAwal = DateHelper.getTanggalFormattedNew(date1);
					data.tanggalAhir = DateHelper.getTanggalFormattedNew(date2);
					data.hargaDiskon = data.hargaSatuan - (data.persenDiskon/100 * data.hargaSatuan);
				})
				$scope.dataGrid = new kendo.data.DataSource({
					pageSize: 10,
					data: $scope.dataObject
				});
			}); 
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"komponen",title:"Komponen",width:150 },
				{ field:"kelas",title:"Kelas",width:100 },
				{ field:"asal",title:"Asal",width:150 },
				{ field:"jenisTarif",title:"Jenis Tarif",width:100 },
				{ field:"tanggalAwal",title:"Tanggal Awal",width:100 },
				{ field:"tanggalAhir",title:"Tanggal Akhir",width:100 },
				{ field:"hargaSatuan",title:"Harga Satuan",width:100 },
				{ field:"persenDiskon",title:"Diskon",width:100 },
				{ field:"hargaDiskon",title:"Harga Diskon",width:100 }],
				editable: false
			};
			$scope.simpan = function () {
				var listRawRequired = [
				"item.komponen|k-ng-model|Komponen",
				"item.kelas|k-ng-model|Kelas",
				"item.asal|k-ng-model|Asal",
				"item.jenisTarif|k-ng-model|Jenis Tarif",
				"item.tanggalAwal|k-ng-model|Tanggal Berlaku Awal",
				"item.tanggalAkhir|k-ng-model|Tanggal Berlaku Akhir",
				"item.hargaSatuan|ng-model|harga Satuan",
				"item.diskon|ng-model|Diskon",
				"item.hargaDiskon|ng-model|Harga Diskon"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					var data = 
					{
						"komponen":{
							"id":$scope.item.komponen.id
						},
						"kelas":{
							"id":$scope.item.kelas.id
						},
						"asalProduk":{
							"id":$scope.item.asal.id
						},
						"jenisTarif":{
							"id":$scope.item.jenisTarif.id
						},
						"diskon":$scope.item.diskon,
						"tglBerlakuAwal":$scope.item.tanggalAwal,
						"tglBerlakuAhir":$scope.item.tanggalAkhir,
						"hargaDiskon":$scope.item.hargaDiskon,
						"hargaSatuan":$scope.item.hargaSatuan
					}
					ManageSdm.saveData(data, "pelatihan-biaya-diklat/save-biaya-diklat/").then(function(e) {
						$scope.item = {};
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			};
		}
		]);
});