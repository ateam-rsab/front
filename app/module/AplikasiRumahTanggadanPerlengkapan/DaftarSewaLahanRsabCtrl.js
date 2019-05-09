define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarSewaLahanRsabCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', '$state',
		function ($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, $state) {
			ModelItem.get("RumahTangga/DaftarSewaLahanRsab").then(function (data) {
				$scope.ite = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });
			$scope.item = {};
			$scope.item.periodeAwal = new Date();
			$scope.item.periodeAkhir = new Date();

			$scope.cari = function () {
				var awal = DateHelper.getPeriodeFormatted($scope.item.periodeAwal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.periodeAkhir);
				var url = "periodeAwal=" + awal + "&periodeAkhir=" + akhir;
				ManageSarpras.getOrderList("daftar-sewa-lahan/find-by-periode/?" + url).then(function (dat) {
					var gridData = $("#gridSewaLahan").data("kendoGrid");
					var ds = new kendo.data.DataSource({
						data: dat.data.data.data,
						pageSize: 12
					});
					gridData.setDataSource(ds);
					gridData.dataSource.read();
				})

			};
			// $scope.cari();

			ManageSarpras.getOrderList("daftar-sewa-lahan/get-all-sewa-lahan/").then(function (dat) {
				var gridData = $("#gridSewaLahan").data("kendoGrid");
				var ds = new kendo.data.DataSource({
					data: dat.data.data.data,
					pageSize: 12
				});
				gridData.setDataSource(ds);
				gridData.dataSource.read();
			});

			
			$scope.mainGridOptions = {
                toolbar : ["excel", "pdf", {
					text: "Order", template: '<button ng-click="addNew()" class="k-button k-button-icontext k-grid-add"><span class="k-icon k-add"></span>Order Baru</button>'
				}],
				dataBinding: dataBound,
				selectable: "row",
				editable: "popup",
				scrollable: true,
                pageable: true,
                columns: [
					{"field": "noOrder","title": "<h3>No. Order</h3>",width: "100px"},
					{"field": "namaPenyewa","title": "<h3>Nama Penyewa</h3>",width: "150px"},
					{"field": "noKtp","title": "<h3>No KTP</h3>",width: "150px"},
					{"field": "noTelp","title": "<h3>No. Telp/HP</h3>",width: "130px"},
					{"field": "alamat","title": "<h3>Alamat</h3>",width: "200px"},
					{"field": "tglSewaAwal","title": "<h3>Tgl Mulai Sewa</h3>",template: '#= kendo.toString(kendo.parseDate(new Date(tglSewaAwal)), "dd MMMM yyyy") #',width: "150px"},
					{"field": "tglSewaAkhir","title": "<h3>Tgl Akhir Sewa</h3>",template: '#= kendo.toString(kendo.parseDate(new Date(tglSewaAkhir)), "dd MMMM yyyy") #',width: "150px"},
					{"template": "#=lamaSewa# #=satuan#","title": "<h3>Lama Sewa</h3>",width: "100px"},
					{"field": "harga","title": "<h3>Harga Sewa Lahan</h3>",width: "130px"},
					{"field": "status","title": "<h3>Status</h3>",width: "130px"}
				],
                
			};
			
			var dataBound = function () {
				$('td').each(function () {
				  if ($(this).text() == 'SELESAI') {$(this).addClass('yellow')}
				  if ($(this).text() == 'Selesai') {$(this).addClass('green')}
				  if ($(this).text() == 'selesai') {$(this).addClass('red')}
				  // for status response
				  if ($(this).text() == 'Belum di Respon') {$(this).addClass('yellow')}
				  if ($(this).text() == 'Respon 0-15menit') {$(this).addClass('green')}
				  if ($(this).text() == 'Respon 15-30menit') {$(this).addClass('yellow')}
				  if ($(this).text() == 'Respon lebih dari 30menit') {$(this).addClass('red')}
				})
			  }
			$scope.out = function (order, status) {
				if (status == "DIPAKAI")
					$state.go("KeluarLahan", {
						noOrder: order
					})
			};
			$scope.addNew =  function(){
				$state.go("SewaLahan");
			};
		}
	]);
});