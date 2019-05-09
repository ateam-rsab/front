define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailProdukBMHPCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', '$state',
		function($rootScope, $scope, ModelItem, IPSRSService, $state) {
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.dataGrid = [];
			function init() {
				IPSRSService.getItem("cssd-bmhp/detail-produk-bmhp?produkId="+$state.params.produkId).then(function(dat){
				    $scope.dataMaster = dat.data.bahanMentah;
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataMaster
					});
					$scope.item.namaProduk = dat.data.produkBmhp.namaProduk;
					$scope.item.kdProduk = dat.data.produkBmhp.kdProduk;
				});
			}
			init();
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"namaProduk",title:"Nama Produk"},
				{ field:"qtyProdukAsal",title:"Quantity" }],
				editable: false
			};

			$scope.tutup = function(){
				$state.go('MasterProduksiBMHP')
			}
		}
		]);
});