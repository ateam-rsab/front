define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarSppbCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'PengajuanUsulanAnggaranService',
		function($rootScope, $scope, $state, DateHelper, ModelItem, PengajuanUsulanAnggaranService) {
			// ModelItem.get("PengajuanUsulan/DaftarPengajuanUsulan").then(function(data) {
			// 	$scope.item = data;
			// 	$scope.now = new Date();
			// 	$scope.dataVOloaded = true;

			// 	$scope.item.pengadaan = "LELANG";
			// 	$scope.item.noUsulan = "016000100c";
			// 	$scope.item.tanggal = "2016-9-27";
			// 	$scope.item.total = "121000";
			// 	$scope.item.jumlah = 21;
				

			// }, function errorCallBack(err) {});

			PengajuanUsulanAnggaranService.getGetData("Rekanan&select=id,namaRekanan").then(function(data) {
                $scope.listSuplier = data;
            });

			$scope.mainGridOptions = {
		        pageable: true,
		        selectable: "row",
		        columns: [
		          	{
						field: "no",
						title: "No",
						width: 40
					},
					{
						field: "noRekap",
						title: "No Rekap",
						hidden: true
					},
					{
						field: "noRec",
						hidden: true
					},
					{
						field: "tanggal",
						title: "Tanggal",
						width: 150
					},
					{
						field: "namaSupplier",
						title: "Nama Supplier"
					},
					{
						field: "totalCount",
						title: "Jumlah Item",
						format: "{0:n0}",
						attributes: {
							style: "text-align:right"
						},
						width: 100
					},
					{
						field: "totalHargaBarangSupplier",
						title: "Total Penerimaan",
						width: 120,
						format: "{0:n0}",
						attributes: {
							style: "text-align:right"
						}
					}
				]//,
		    	// /editable: true
	      	};

            var init = function() {
            	$scope.item = {};
				$scope.now = new Date();
				$scope.item.dari = $scope.now;
				$scope.item.sampai = $scope.now;
				$scope.dataVOloaded = true;

				$scope.dataSource = new kendo.data.DataSource({
			        data: []
			    });

            	PengajuanUsulanAnggaranService.getKomponen("sppb/pre-add-sppb").then(function(data){
	      			$scope.dataGrid = data.data.data;

	      			var i = 1;
	      			$scope.dataGrid.forEach(function(data) {
	      				if (data.totalPenerimaan === undefined)
	      					data.totalPenerimaan = 0;
	      				if (data.sisaKontrak === undefined)
	      					data.sisaKontrak = 0;
	      				data.no = i;
	      				data.tanggal = DateHelper.getPeriodeFormatted(new Date(data.tanggal));
	      				$scope.dataSource.add(data);
	      				i++;
	      			})
	      		})

	      		$scope.dataSource.fetch();
            }

            init();

            $scope.kl = function(current) {
            	$scope.current = current;
            	console.log(current);
            }
			$scope.navToSppb = function(){
				$state.go('BuatSppb', {
					noRec: $scope.current
				})
			}

	      	$scope.Search = function(){
	      		var awal, akhir;
	      		if ($scope.item.dari !== undefined && $scope.item.sampai !== undefined) {
	      			awal = DateHelper.getPeriodeFormatted($scope.item.dari);
	      			akhir = DateHelper.getPeriodeFormatted($scope.item.sampai);

	      			var date = "?dateStart="+awal+"&dateEnd="+akhir
	      		}else{
	      			var date = "?dateStart=&dateEnd="
	      		}

	      		if ($scope.item.namaRekanan !== undefined) {
	      			var supplier = "&supplierId="+$scope.item.namaRekanan.id
	      		} else {
	      			var supplier = "&supplierId="
	      		}
	      		
	      		$scope.dataSource = new kendo.data.DataSource({
				    data: []
				});
	      		PengajuanUsulanAnggaranService.getKomponen("sppb/pre-add-sppb"+date+supplier).then(function(data){
	      			$scope.dataGrid = data.data.data;

	      			var i = 1;
	      			$scope.dataGrid.forEach(function(data) {
	      				if (data.totalPenerimaan === undefined)
	      					data.totalPenerimaan = 0;
	      				if (data.sisaKontrak === undefined)
	      					data.sisaKontrak = 0;
	      				data.no = i;

	      				$scope.dataSource.add(data);
	      				i++;
	      			})
	      		})

	      		$scope.dataSource.fetch();
	      	}
	      	$scope.Cancel = function() {
            	init();
	      	}
		}
	]);
});