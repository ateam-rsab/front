define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormDetilBarangMedisCtrl', ['$rootScope', '$scope', '$state', 'ModelItem',
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
					"field": "kodeBarang",
					"title": "Kode Barang"
                }, {
					"field": "namaBarang",
					"title": "Nama Barang",
					"width": "200px"
                }, {
					"field": "komposisiBarang",
					"title": "Komposisi Barang"
                }, {
					"field": "indikasi",
					"title": "Indikasi"
                }, {
					"field": "kontraIndikasi",
					"title": "Kontra Indikasi"
                }, {
					"field": "interaksi",
					"title": "Interaksi"
                }, {
					"field": "efekSamping",
					"title": "Efek Samping"
                }, {
					"field": "peringatan",
					"title": "Peringatan"
                }, {
					"field": "dosis",
					"title": "Dosis"
                }, {
					"field": "penyimpanan",
					"title": "Penyimpanan"
                }, {
					"field": "pustaka",
					"title": "Pustaka"
                }]
            };
            $scope.cari = function(dataItem){

            }
            $scope.detilGenerik = function(){
            	$state.go('DetilBarangGenerik');
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