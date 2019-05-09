define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormPelaksanaanPerbaikanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("IPSRS/FormPelaksanaanPerbaikan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("SukuCadang", false).then(function(data) {
                $scope.listSukuCadang = data;
            })
            ModelItem.getDataDummyGeneric("NamaTeknisi", true).then(function(data) {
                $scope.listTeknisi = data;
            })
            ModelItem.getDataDummyGeneric("NamaUser", true).then(function(data) {
                $scope.listUser = data;
            })
            $scope.sourceSukuCadang = [
				{
					"id": "1",
					"name": "SukuCadang"
				},
				{
					"id": "2",
					"name": "Tidak"
				}
			];
			$scope.$watch('item.sukuCadang', function(newValue, oldValue) {
                if (newValue == "SukuCadang") {
                    $scope.showSuku = true;
                } else {
                    $scope.showSuku = false;
                }
            });

            $scope.showTambah1 = true;
            $scope.Tambah1 = function() {

				$scope.showTambah2 = true;
				$scope.showPilihTeknisi2 = true;
				$scope.showTambah1 = false;

            };
            $scope.Tambah2 = function() {

				$scope.showTambah3 = true;
				$scope.showPilihTeknisi3 = true;
				$scope.showTambah2 = false;

            };
            $scope.Tambah3 = function() {

				$scope.showTambah4 = true;
				$scope.showPilihTeknisi4 = true;
				$scope.showTambah3 = false;

            };
            $scope.Tambah4 = function() {
            	$scope.showPilihTeknisi5 = true;
				$scope.showTambah4 = false;

            };
			$scope.daftarPermintaanPerbaikan = new kendo.data.DataSource({
				data: []
			});
			$scope.columnPermintaanPerbaikan = [
			{
				"field": "noOrder",
				"title": "No Order",
				"width": "100px"
			},
			{
				"field": "kodeBarang",
				"title": "Kode Barang",
				"width": "120px"
			},
			{
				"field": "namaBarang",
				"title": "Nama Baran",
				"width": "150px"
			},
			{
				"field": "tanggalPesan",
				"title": "Tanggal Pesan",
				"width": "150px"
			},
			{
				"field": "merk",
				"title": "Merk",
				"width": "100px"
			},
			{
				"field": "type",
				"title": "Type",
				"width": "100px"
			},
			{
				"field": "noSeri",
				"title": "No Seri",
				"width": "150px"
			}
			,
			{
				"field": "kerusakan/keluhan",
				"title": "Kerusakan Keluhan",
				"width": "200px"
			}
			,
			{
				"field": "user/pelapor",
				"title": "User / Pelapor",
				"width": "150px"
			}
			,
			{
				"field": "namaRuangan",
				"title": "Nama Ruangan",
				"width": "150px"
			}
			];

			$scope.daftarSukuCadang = new kendo.data.DataSource({
				data: []
			});
			$scope.columnSukuCadang = [
			{
				"field": "kodeBarang",
				"title": "Kode Barang",
				"width": "100px"
			},
			{
				"field": "namaBarang",
				"title": "Nama Barang",
				"width": "120px"
			},
			{
				"field": "satuan",
				"title": "Satuan",
				"width": "150px"
			},
			{
				"field": "volume",
				"title": "Volume",
				"width": "150px"
			},
			{
				"field": "harga",
				"title": "harga",
				"width": "100px"
			},
			{
				"field": "satuan",
				"title": "Satuan",
				"width": "100px"
			},
			{
				"field": "jumlahRp",
				"title": "Jumlah Rp",
				"width": "150px"
			}
			,
			{
				"field": "tujuan",
				"title": "Tujuan",
				"width": "200px"
			}
			];
			$scope.showSukuCadang = false;
			$scope.$watch('item.sukuCadang', function(newValue, oldValue) {
				if (newValue == "Suku cadang") {
					$scope.showSukuCadang = true;
				} else {
					$scope.showSukuCadang = false;
				}
			});
		}
	]);
});