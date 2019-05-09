define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterJurusanPeminatanCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManagePhp',
		function($rootScope, $scope, ModelItem, managePhp) {
			$scope.item = {};
			var init = function () {
				managePhp.getMaster("pendidikan/get-daftar-diklat-jurusan").then(function(dat){
					$scope.dataGrid = dat.data.data;
					$scope.dataGridMaster = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataGrid
					});
				});
			}; 
			init();
			$scope.klik = function(grid){
                $scope.grid = grid;
                $scope.item.idJurusanPeminatan = grid.id;
                $scope.item.jurusanPeminatan = grid.diklatjurusan;
                $scope.item.statusAktif = grid.statusenabled;
            };
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"id",title:"Id" },
				{ field:"diklatjurusan",title:"Jurusan Peminatan" },
				{ field:"statusenabled",title:"Status Aktif",template:'<input ng-model = "dataItem.statusenabled" type="checkbox" ng-change="getClick(dataItem)" disabled></input>' }],
				editable: false,
				selectable: true
			};
			$scope.getClick = function(item){
				if(item.statusEnabled){
					for(var i = 0; i<$scope.dataGridMaster.data().length; i++){
						var ditem = $scope.dataGridMaster.at(i)
						if(ditem !== item){
							ditem.set('statusEnabled', false);
						}
					}

				}
			}
			$scope.simpan = function () {
				// var data = {
				// 	"id":parseInt($scope.item.idJurusanPeminatan),
				// 	"diklatjurusan":$scope.item.jurusanPeminatan,
				// 	"statusenabled":$scope.item.statusAktif
				// }
				var IDID = ''
				if ($scope.item.idJurusanPeminatan != undefined ) {
					IDID = $scope.item.idJurusanPeminatan
				}
				var enaena = 'f'
				if ($scope.item.statusAktif != false) {
					enaena = 't'
				}
				var data = {
					"id":IDID,
					"diklatkategori":$scope.item.jurusanPeminatan,
					"statusenabled":enaena
				}
				managePhp.postMaster(data, "pendidikan/save-daftar-diklat-jurusan").then(function(e) {
					$scope.item = {};
					init();
				});
			}
			$scope.batal = function () {
				$scope.item = {};
			}
		}
		]);
});