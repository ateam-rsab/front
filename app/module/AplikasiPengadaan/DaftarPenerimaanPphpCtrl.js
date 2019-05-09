define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPenerimaanPphpCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'PengajuanUsulanAnggaranService',
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

            var init = function() {
				$scope.now = new Date();
            	$scope.item = {
            		dari: $scope.now,
            		sampai: $scope.now
            	};
				$scope.dataVOloaded = true;

				$scope.dataSource = new kendo.data.DataSource({
				    data: []
				});
	      		PengajuanUsulanAnggaranService.getKomponen("pphp/list-pphp/").then(function(data){
	      			$scope.dataGrid = data.data.data;

	      			var i = 1;
	      			$scope.dataGrid.forEach(function(items){
	      				items.no = i;
	      				$scope.dataSource.add(items);
	      				i++;
	      			})
	      		})

	      		$scope.dataSource.fetch();
            }

            init();

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
						width: 40,
						attributes: {
							style: "text-align:center"
						}
					},
					{
						field: "tanggalSppb",
						title: "Tanggal",
						width: 100
					},
					{
						field: "noPphp",
						title: "No Penerimaan",
						width: 150
					},
					{
						field: "noKontrak",
						title: "No Kontrak",
						width: 150
					},
					{
						field: "namaRekanan",
						title: "Nama Supplier",
						width: 200
					},
					{
						field: "totalSppb",
						title: "Total SPPB",
						width: 80,
						format: "{0:n0}",
						attributes: {
							style: "text-align:right"
						}
					},
					{
						field: "tanggalKartuKendali",
						title: "Tanggal Pengadaan",
						width: 80
					}
				]
	      	};

            $scope.kl = function(current) {
            	$scope.current = current;
            	console.log(current);
            }
			$scope.goToDetil = function(){
				$state.go('DetilPenerimaanPphp', {
					noRec: $scope.current.noRec
				})
			}

	      	$scope.Search = function(){
	      		var dateAwal = DateHelper.getPeriodeFormatted(new Date($scope.item.dari));
	      		var dateAhir = DateHelper.getPeriodeFormatted(new Date($scope.item.sampai));
	      		if (dateAwal !== undefined && dateAhir !== undefined) {
	      			var date = "?dateStart="+dateAwal+"&dateEnd="+dateAhir;
	      		} else {
	      			var date = "?dateStart=&dateEnd=";
	      		}

	      		if ($scope.item.namaRekanan !== undefined) {
	      			var supplier = "&supplierId="+$scope.item.namaRekanan.id;
	      		} else {
	      			var supplier = "&supplierId=";
	      		}
	      		debugger;
	      		$scope.dataSource = new kendo.data.DataSource({
				    data: []
				});
	      		PengajuanUsulanAnggaranService.getKomponen("pphp/list-pphp/"+date+supplier).then(function(data){
	      			$scope.dataGrid = data.data.data;

	      			var i = 1;
	      			$scope.dataGrid.forEach(function(items){
	      				items.no = i;
	      				$scope.dataSource.add(items);
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