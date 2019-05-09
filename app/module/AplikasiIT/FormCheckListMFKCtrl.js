define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormCheckListMFKCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("IT/FormCheckListMFK").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.dataAlarm = [
				{
					id:1, itemPeriksa:"Jumlah alarm berbunyi"
				},
				{
					id:2, itemPeriksa:"Jumlah false alarm"
				},
				{
					id:3, itemPeriksa:"Jumlah titik alarm"
				},
				{
					id:4, itemPeriksa:"Jumlah titik alarm yang tidak berfungsi"
				}]

				$scope.dataApar = [
				{
					id:5, itemPeriksa:"Jumlah APAR total"
				},
				{
					id:6, itemPeriksa:"Jumlah APAR yang diinspeksi pada bulan berjalan"
				},
				{
					id:7, itemPeriksa:"Jumlah APAR yang tidak memenuhi syarat"
				},
				{
					id:8, itemPeriksa:"Jumlah APAR yang terpakai pada bulan berjalan"
				},
				{
					id:9, itemPeriksa:"Jumlah APAR yang terpasang pada tempatnya"
				},
				{
					id:10, itemPeriksa:"Jumlah HYDRANT total"
				},
				{
					id:11, itemPeriksa:"Jumlah HYDRANT yang diinspeksi pada bulan berjalan"
				},
				{
					id:12, itemPeriksa:"Jumlah HYDRANT yang tidak memenuhi syarat"
				},
				{
					id:13, itemPeriksa:"Jumlah HYDRANT yang terpakai pada bulan berjalan"
				},
				{
					id:14, itemPeriksa:"Jumlah Nozzle HYDRANT yang terpasang pada tempatnya"
				}
				,
				{
					id:15, itemPeriksa:"Jumlah SPRINKLER total"
				},
				{
					id:16, itemPeriksa:"Jumlah SPRINKLER yang diinspeksi pada bulan berjalan"
				},
				{
					id:17, itemPeriksa:"Jumlah SPRINKLER yang tidak memenuhi syarat"
				},
				{
					id:18, itemPeriksa:"Jumlah SPRINKLER yang terpakai pada bulan berjalan"
				}
				]

				$scope.dataInsiden = [
				{
					id:19, itemPeriksa:"Jumlah Insiden kebakaran pada bulan berjalan"
				},
				{
					id:20, itemPeriksa:"Jumlah korban kebakaran yang meninggal/ cacat"
				},
				{
					id:21, itemPeriksa:"Jumlah korban kebakaran yang luka - luka"
				},
				{
					id:22, itemPeriksa:"Jumlah lantai yang terdampak kebakaran"
				},
				{
					id:23, itemPeriksa:"Jumlah insiden keselamatan kerja pada bulan berjalan (Co: Jatuh, terpeleset, tertusuk, terpotong, tabrakan, tertimpa, kecelakaan"
				},
				{
					id:24, itemPeriksa:"Jumlah korban kecelakaan kerja yang meninggal/ cacat"
				},
				{
					id:25, itemPeriksa:"Jumlah korban kecelakaan kerja yang dirawat inap"
				},
				{
					id:26, itemPeriksa:"Jumlah korban kecelakaan kerja yang dirawat jalan"
				},
				{
					id:27, itemPeriksa:"Jumlah alat kerja yang terdampak oleh kecelakaan kerja"
				},
				{
					id:28, itemPeriksa:"Jumlah investigasi yang sudah selesai dilakukan terhadap kebakaran dan kecelakaan kerja"
				}
				]

				$scope.dataKeselamatanKerja = [
				{
					id:29, itemPeriksa:"Jumlah pegawai gedung"
				},
				{
					id:30, itemPeriksa:"Jumlah pekerja outsource gedung"
				},
				{
					id:31, itemPeriksa:"Jumlah pegawai & outsource yang sudah mendapat orientasi keselamatan kerja"
				},
				{
					id:32, itemPeriksa:"Jumlah kotak P3K"
				},
				{
					id:33, itemPeriksa:"Jumlah Kotak P3K yang diinspeksi pada bulan berjalan"
				},
				{
					id:34, itemPeriksa:"Jumlah Kotak P3K yang ditemukan obat ED"
				},
				{
					id:35, itemPeriksa:"Jumlah Kotak P3K yang isinya sesuai daftar"
				}
				] 

				$scope.alarmData = new kendo.data.DataSource({
					data: $scope.dataAlarm,
					schema: {
						model: {
							id: "alarm",
							fields: {
										/*uraianTugas: { editable: true, nullable: false, validation: { required: true } },
										nilai: { type: "number", validation: { min: 0, required: true, max: 100 } },*/

									}
								}
							}
						});
				$scope.aparData = new kendo.data.DataSource({
					data: $scope.dataApar,
					schema: {
						model: {
							id: "apar",
							fields: {
										/*uraianTugas: { editable: true, nullable: false, validation: { required: true } },
										nilai: { type: "number", validation: { min: 0, required: true, max: 100 } },*/

									}
								}
							}
						});
				$scope.insidenData = new kendo.data.DataSource({
					data: $scope.dataInsiden,
					schema: {
						model: {
							id: "insiden",
							fields: {
										/*uraianTugas: { editable: true, nullable: false, validation: { required: true } },
										nilai: { type: "number", validation: { min: 0, required: true, max: 100 } },*/

									}
								}
							}
						});
				$scope.keselamatanKerjaData = new kendo.data.DataSource({
					data: $scope.dataKeselamatanKerja,
					schema: {
						model: {
							id: "keselamatanKerja",
							fields: {
										/*uraianTugas: { editable: true, nullable: false, validation: { required: true } },
										nilai: { type: "number", validation: { min: 0, required: true, max: 100 } },*/

									}
								}
							}
						});

				$scope.columnCheckList = [
				{
					"field": "itemPeriksa",
					"title": "<center>Item Periksa",
					"width": "350px"
				},{
					"field": "jumlah",
					"title": "<center>Jumlah</center>",
					"width": "150px"
				},{
					"field": "keterangan",
					"title": "<center>Keterangan</center>",
					"width": "150px"
				}];

				$scope.alarmGridOptions = {
					dataSource: $scope.alarmData,
					pageable: false,
					columns: $scope.columnCheckList
				};

				$scope.aparmGridOptions = {
					dataSource: $scope.aparData,
					pageable: false,
					columns: $scope.columnCheckList
				};

				$scope.insidenGridOptions = {
					dataSource: $scope.insidenData,
					pageable: false,
					columns: $scope.columnCheckList
				};

				$scope.keselamatanKerjaGridOptions = {
					dataSource: $scope.keselamatanKerjaData,
					pageable: false,
					columns: $scope.columnCheckList
				};

				$scope.bebasAsapGridOptions = {
					dataSource: $scope.alarmData,
					pageable: false,
					columns: $scope.columnCheckList
				};

				$scope.pekerjaanGridOptions = {
					dataSource: $scope.alarmData,
					pageable: false,
					columns: $scope.columnCheckList
				};
			}, function errorCallBack(err) {});
		}
		]);
});