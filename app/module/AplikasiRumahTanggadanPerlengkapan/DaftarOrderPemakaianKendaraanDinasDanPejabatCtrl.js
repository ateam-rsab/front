define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarOrderPemakaianKendaraanDinasDanPejabatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', '$state', 'DateHelper',
		function ($rootScope, $scope, ModelItem, ManageSarpras, $state, DateHelper) {
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {
				awal: $scope.now,
				akhir: $scope.now
			};
			// $scope.item.awal = $scope.now;
			// $scope.item.akhir = $scope.now;
			// $scope.columnPemakaian = ;
			$scope.mainGridOptions = {
                toolbar : ['excel','pdf', {
					text: "Order", template: '<button ng-click="addNew()" class="k-button k-button-icontext k-grid-add"><span class="k-icon k-add"></span>Order Baru</button>'
				}],   
                selectable: "row",
                editable: "popup",
				pageable: true,
				columns: [
					{"field": "noOrder","title": "<h3>No Order</h3>",width: "130px"},
					{"field": "namaRuangan","title": "<h3>Unit Pemesan</h3>",width: "150px"},
					{"field": "alamatTempatTujuan","title": "<h3>Tujuan</h3>",width: "150px"},
					{"field": "status","title": "<h3>Status</h3>",width: "150px"},
					{ title: "<h3>Rencana Pemakaian</h3>", columns: [
						{"field": "tglPelayananAwal","title": "<h3>Tanggal Awal</h3>", template: ' #= kendo.toString(kendo.parseDate(new Date(tglPelayananAwal)), "dd/MM/yyyy") #'},
						{"field": "tglPelayananAwal","title": "<h3>Jam Awal</h3>", template: ' #= kendo.toString(kendo.parseDate(new Date(tglPelayananAwal)), "HH:mm") #'},
						{"field": "tglPelayananAkhir","title": "<h3>Tanggal Akhir</h3>", template: ' #= kendo.toString(kendo.parseDate(new Date(tglPelayananAkhir)), "dd/MM/yyyy") #'},
						{"field": "tglPelayananAkhir","title": "<h3>Jam Akhir</h3>", template: ' #= kendo.toString(kendo.parseDate(new Date(tglPelayananAkhir)), "HH:mm") #'}]
					},
					{ title: "<h3>Pengembalian</h3>", columns: [
						{"field": "waktuPengembalian","title": "<h3>Tanggal Pengembalian</h3>", template: '#= kendo.toString(kendo.parseDate(waktuPengembalian), "dd/MM/yyyy") #'},
						{"field": "waktuPengembalian","title": "<h3>Waktu Pengembalian</h3>", template: '#= kendo.toString(kendo.parseDate(waktuPengembalian), "HH:mm") #'}
					]}
				]
            };

			$scope.Search = function () {
				var awal = DateHelper.getPeriodeFormatted($scope.item.awal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.akhir);
				var url = "periodeAwal=" + awal + "&periodeAkhir=" + akhir;
				ManageSarpras.getOrderList("daftar-kendaraan-dinas/find-by-periode/?" + url).then(function (dat) {
					var gridData = $("#gridPakaiKendaraan").data("kendoGrid");
					var ds = new kendo.data.DataSource({
						data: dat.data.data.data,
						pageSize: 12
					});
					gridData.setDataSource(ds);
					gridData.dataSource.read();
				});
			}


			ManageSarpras.getOrderList("daftar-kendaraan-dinas/get-all-kendaraan-dinas-dan-pejabat/" ).then(function (dat) {
				var gridData = $("#gridPakaiKendaraan").data("kendoGrid");
				var ds = new kendo.data.DataSource({
					data: dat.data.data.data,
					pageSize: 12
				});
				gridData.setDataSource(ds);
				gridData.dataSource.read();
			});

			$scope.kl = function (current) {
				$scope.current = current;
				// console.log(current)
			}
			$scope.NavToPemakaianKendaraanDinas = function () {
				debugger;
				if ($scope.current.status == "ORDER")
					$state.go('PemakaianKendaraanDinasDanPejabat', {
						noOrder: $scope.current.noRec
					});
			};
			$scope.NavToPengembalianKendaraanDinas = function () {
				debugger;
				if ($scope.current.status == "DIPAKAI")
					$state.go('PengembalianKendaraanDinasDanPejabat', {
						noOrder: $scope.current.noRec
					});
			};

			$scope.addNew = function(){
				$state.go("OrderPemakaianKendaraanDinasDanPejabat")
			};

			
	}])
});