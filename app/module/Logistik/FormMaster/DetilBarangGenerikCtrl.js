define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetilBarangGenerikCtrl', ['$rootScope', '$scope', '$state', 'ModelItem',
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
					"field": "namaGenerik",
					"title": "Nama Generik",
					"width": "200px"
                }, {
					"field": "kekuatan",
					"title": "Kekuatan Dosis",
					"width": "200px"
                }, {
					"field": "satuanDosis",
					"title": "Satuan Dosis"
                }, {
					"field": "volume",
					"title": "Volume"
                }, {
					"field": "satuanVolume",
					"title": "Satuan Volume"
                }, {
					"field": "satuanSediaan",
					"title": "Satuan Sediaan"
                }]
            };
            $scope.Batal = function(){

            }
            $scope.Save = function(){
            	
            }
            $scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.namaMenu=data.namaMenu

			};
			$scope.Back=function(){
				window.history.back();
			};
			// $scope.lihatDaftar = function(){
			// 	$state.go('')
			// }

		}
	]);
});