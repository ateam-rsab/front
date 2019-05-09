define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailDashboardPerbaikanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','IPSRSService', 'DateHelper',
		function($rootScope, $scope, ModelItem, $state, IPSRSService, DateHelper) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			var listData = [];
			$scope.item = {};
			$scope.strukOrderId=$state.params.strukOrderId;
			debugger
			$scope.noRegistrasiAset=$state.params.noRegistrasiAset;
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"no",title:"No" },
				{ field:"namaProduk",title:"Nama Produk" },
				{ field:"satuanStandar",title:"Satuan" },
				{ field:"qtyProduk",title:"Quantity" }],
				editable: false
			};
			var init = function(){
				IPSRSService.getItem("psrsPermintaanPerbaikan/detail-monitoring?strukOrderId="+$scope.strukOrderId+"&noRegistrasiAset="+$scope.noRegistrasiAset, true).then(function(dat){
					debugger
					$scope.dataGrid = dat.data.sparepart;
					$scope.nomor = 1;
					$scope.dataGrid.forEach(function (data) {
						data.no = $scope.nomor++;
					})
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataGrid
					});
					$scope.item.noOrder = dat.data.header.noOrder;
					$scope.item.ruangan = dat.data.header.ruanganPemesan;
					$scope.item.namaProduk = dat.data.header.namaProduk;
					$scope.item.keteranganOrder = dat.data.header.keteranganOrder;;
				});
				
			};
			init();
			$scope.kembali = function () {
				$state.go("DashboardPerbaikan",{});
			}
		}
	]);
});