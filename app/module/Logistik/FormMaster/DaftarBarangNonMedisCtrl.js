define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarBarangNonMedisCtrl', ['$rootScope', '$scope', '$state', 'ModelItem',
		function($rootScope, $scope, $state, ModelItem) {

			$scope.item = {};
			$scope.dataVOloaded = true;

			$scope.dataSource = new kendo.data.DataSource({
                data: [],
				pageable: true
            });


			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
                    "field": "no",
					"title": "No",
					"width": "20px",
					"attributes": {align: "center"}
				}, {
					"field": "jenis",
					"title": "Jenis Barang",
					"width": "200px"
                }, {
					"field": "jenisDetil",
					"title": "Detil Jenis",
					"width": "200px"
                }, {
					"field": "kodeBarang",
					"title": "Kode Barang"
                }, {
					"field": "kodeBmn",
					"title": "Kode BMN"
                }, {
					"field": "kodeAspak",
					"title": "Kode Aspak"
                }, {
					"field": "kodeRs",
					"title": "Kode RS"
                }, {
					"field": "namaBarang",
					"title": "Nama Barang",
					"width": "200px"
                }, {
					"field": "satuan",
					"title": "Satuan"
                }, {
					"field": "bahan",
					"title": "Bahan"
                }, {
					"field": "merk",
					"title": "Merk"
                }, {
					"field": "type",
					"title": "Type"
                }, {
					"field": "warna",
					"title": "Warna"
                }
                ]
            };
            $scope.cari = function(dataItem){

            }
            $scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.namaMenu=data.namaMenu

			};
			$scope.Batal=function(){
				window.history.back();
			};
			// $scope.lihatDaftar = function(){
			// 	$state.go('')
			// }

		}
	]);
});