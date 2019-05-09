define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailOrderCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','IPSRSService', 'DateHelper',
		function($rootScope, $scope, ModelItem, $state, IPSRSService, DateHelper) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			var listData = [];
			$scope.item = {};
			$scope.noRec=$state.params.noRec;
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"noRegisterAset",title:"No Asset" },
				{ field:"namaProduk",title:"Nama Barang" },
				{ field:"merkProduk",title:"Merk Barang" },
				{ field:"noSeri",title:"User No Seri" },
				{ field:"typeProduk",title:"Tipe" },
				{ field:"keteranganLainnya",title:"Keterangan" }],
				editable: false
			};
			var init = function(){
				IPSRSService.getItem("psrsPermintaanPerbaikan/get-detail-permintaan?noRec="+$scope.noRec, true).then(function(dat){
					var listData = [];
					listData.push(dat.data.detail);
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: listData
					});

					var tanggal = new Date(dat.data.header.tanggalOrder);
					$scope.item.noOrder = dat.data.header.noOrder;
					$scope.item.tanggalOrder = DateHelper.getTanggalFormatted(tanggal);
					$scope.item.userPemesan = dat.data.header.userPemesan;
					$scope.item.ruanganPemesan = dat.data.header.ruanganPemesan;
				});
				
			};
			init();
			$scope.kembali = function () {
				$state.go("RespondPerbaikan",{});
			}
		}
	]);
});