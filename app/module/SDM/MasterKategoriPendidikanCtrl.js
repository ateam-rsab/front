define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterKategoriPendidikanCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManagePhp',
		function($rootScope, $scope, ModelItem, managePhp) {
			$scope.item = {};
			var init = function () {
				managePhp.getMaster("pendidikan/get-daftar-diklat-kategory").then(function(dat){
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
                $scope.item.idKategori = grid.id;
                $scope.item.kategoriPendidikan = grid.diklatkategori;
                $scope.item.statusAktif = grid.statusenabled;
            };
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"id",title:"Id" ,"width": "20px"},
				{ field:"diklatkategori",title:"Kategori Pendidikan","width": "60px" },
				{ field:"statusenabled",title:"Status Aktif","width": "20px",template:'<input ng-model = "dataItem.statusenabled" type="checkbox" ng-change="getClick(dataItem)" disabled></input>' }],
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
				var IDID = ''
				if ($scope.item.idKategori != undefined ) {
					IDID = $scope.item.idKategori
				}
				var enaena = 'f'
				if ($scope.item.statusAktif != false) {
					enaena = 't'
				}
				var data = {
					"id":IDID,
					"diklatkategori":$scope.item.kategoriPendidikan,
					"statusenabled":enaena
				}
				managePhp.postMaster(data, "pendidikan/save-daftar-diklat-kategory").then(function(e) {
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