define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarBahanMakananUmumCtrl', ['$rootScope', '$scope', '$state', 'ModelItem',
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
					"title": "Jenis Bahan",
					"width": "200px"
                }, {
					"field": "jenisDetil",
					"title": "Detil Jenis Bahan",
					"width": "200px"
                }, {
					"field": "kodeBarang",
					"title": "Kode Bahan Makanan"
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
					"title": "Nama Bahan Makanan/Minuman",
					"width": "200px"
                }, {
					"field": "satuanBesar",
					"title": "Satuan Terbsar"
                }, {
					"field": "satuanKecil",
					"title": "Satuan Terkecil"
                }, {
					"field": "spesifikasi",
					"title": "Spesifikasi"
                }]
            };
			$scope.Batal=function(){
				window.history.back();
			};

		}
	]);
});