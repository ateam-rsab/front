define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarSewaAsramaCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state',
		function ($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state) {
			// ModelItem.get("RumahTangga/DaftarSewaAsrama").then(function(data) {
			// 	// $scope.item = data;
			// 	// debugger;
			// }, function errorCallBack(err) {});
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.item = {
				periodeAwal: new Date(),
				periodeAkhir: new Date()
			};
			// $scope.item.periodeAwal = $scope.now;
			// $scope.item.periodeAkhir = new Date();
			$scope.detail = false;
			$scope.mainGridOptions = {
				dataSource: {
					data: []
				},
                toolbar : ["excel", "pdf", {
					text: "Order", template: '<button ng-click="addNew()" class="k-button k-button-icontext k-grid-add"><span class="k-icon k-add"></span>Order Baru</button>'
				}],
				columns: [
					{"field": "noOrder", "title": "<h3>No Order</h3>", width: "200px"},
					{"field": "namaPenyewa", "title": "<h3>Nama Penyewa</h3>",width: "250px"},
					{"field": "noKtp", "title": "<h3>No. KTP</h3>", width: "170px"},
					{"field": "noTelp","title": "<h3>No. Telp/HP</h3>",width: "150px"},
					{"field": "alamat","title": "<h3>Alamat</h3>",width: "250px"},
					{"field": "tglSewaAwal","title": "<h3>Tanggal<br>Mulai Sewa</h3>",template: '#= kendo.toString(kendo.parseDate(new Date(tglSewaAwal)), "dd MMMM yyyy") #',width: "150px"},
					{"field": "tglSewaAkhir","title": "<h3>Tanggal<br>Akhir Sewa</h3>",template: '#= kendo.toString(kendo.parseDate(new Date(tglSewaAkhir)), "dd MMMM yyyy") #',width: "150px"},
					{"field": "tglCheckout","title": "<h3>Tanggal Checkout</h3>",template: '#= kendo.toString(kendo.parseDate(new Date(tglCheckout)), "dd MMMM yyyy") # #= kendo.toString(kendo.parseDate(new Date(tglCheckout)), "HH:mm:ss") #',width: "150px"},
					// {"field": "jamKeluar","title": "<h3>Jam Checkout</h3>",template: '#= kendo.toString(kendo.parseDate(new Date(jamKeluar)), "HH:mm:ss") #',width: "150px"},
					{"field": "lamaSewa","title": "<h3>Lama Sewa</h3>",width: "100px"},
					// {
					// 	"field": "kamar.namaKamar",
					// 	"title": "<h3>No Kamar</h3>",
					// 	width: "150px"
					// },
					{"field": "harga","title": "<h3>Harga</h3>",width: "100px"},
					{"field": "status","title": "<h3>Status</h3>",width: "100px"}
				],
				selectable: "row",
				scrollable: true,
				editable: false
			}
			$scope.find = function () {
				var url = "periodeAwal=" + DateHelper.getPeriodeFormatted($scope.item.periodeAwal) + "&periodeAkhir=" + DateHelper.getPeriodeFormatted($scope.item.periodeAkhir);
				ManageSarpras.getOrderList("daftar-sewa-asrama/find-by-periode/?" + url).then(function (dat) {
					var gridData = $("#gridSewaAsrama").data("kendoGrid");
					var ds = new kendo.data.DataSource({
						data: dat.data.data.data,
						pageSize: 12
					});
					gridData.setDataSource(ds);
					gridData.dataSource.read();
				});
			}
			// $scope.find();

			ManageSarpras.getOrderList("daftar-sewa-asrama/get-all-sewa-asrama/").then(function (dat) {
				var gridData = $("#gridSewaAsrama").data("kendoGrid");
				var ds = new kendo.data.DataSource({
					data: dat.data.data.data,
					pageSize: 12
				});
				gridData.setDataSource(ds);
				gridData.dataSource.read();
			});

			$scope.out = function (order, status, orderIntern) {
				debugger;
				if (status == "Terisi")
					$state.go("KeluarAsrama", {
						noOrder: order

					})
			}

			$scope.columnDaftarSewaAsrama = [
				{"field": "noOrder","title": "<h3>No Order</h3>",width: "200px"},
				{"field": "namaPenyewa","title": "<h3>Nama Penyewa</h3>",width: "150px"},
				{"field": "noKtp","title": "<h3>No. KTP</h3>",width: "150px"},
				{"field": "noTelp","title": "<h3>No. Telp/HP</h3>",width: "150px"},
				{"field": "alamat","title": "<h3>Alamat</h3>",width: "200px"},
				{"field": "tglSewaAwal","title": "<h3>Tanggal Mulai Sewa</h3>",template: '#= kendo.toString(kendo.parseDate(new Date(tglSewaAwal)), "dd MMMM yyyy") #',width: "150px"},
				{"field": "tglSewaAkhir","title": "<h3>Tanggal Akhir Sewa</h3>",template: '#= kendo.toString(kendo.parseDate(new Date(tglSewaAkhir)), "dd MMMM yyyy") #',width: "150px"},
				{"field": "tglCheckout","title": "<h3>Tanggal Checkout</h3>",template: '#= kendo.toString(kendo.parseDate(new Date(tglCheckout)), "dd MMMM yyyy") # #= kendo.toString(kendo.parseDate(new Date(tglCheckout)), "HH:mm:ss") #',width: "150px"},
				// {"field": "tglCheckout","title": "<h3>Jam Checkout</h3>",template: '#= kendo.toString(kendo.parseDate(new Date(tglCheckout)), "HH:mm:ss") #',width: "150px"},
				{"field": "lamaSewa","title": "<h3>Lama Sewa</h3>",width: "100px"},
				// {
				// 	"field": "kamar.namaKamar",
				// 	"title": "<h3>No Kamar</h3>",
				// 	width: "150px"
				// },
				{"field": "harga","title": "<h3>Harga</h3>",width: "100px"},
				{"field": "status","title": "<h3>Status</h3>",width: "100px"}
			];

			$scope.columnDetailDaftarSewaAsrama = [
				{
					"field": "namaKamar",
					"title": "<h3>No. Kamar</h3>",
					width: "100px"
				},
				{
					"field": "namaRuangan",
					"title": "<h3>Ruangan</h3>",
					width: "150px"
				},
				{
					"field": "hargaSatuan",
					"title": "<h3>Harga Satuan</h3>",
					width: "150px"
				}

			];

			$scope.daftarKamar = function (current) {
				debugger;
				console.log(JSON.stringify(current.noOrder.noOrder))
				if (current.noOrder != undefined)
					$scope.detail = true;
				ManageSarpras.getOrderList("daftar-sewa-asrama/find-by-no-order/?noOrder=" + current.noOrder).then(function (dat) {
					debugger;
					$scope.detailDaftarSewaAsrama = new kendo.data.DataSource({
						data: [

						]
					})
					dat.data.data.data.forEach(function (datas) {
						$scope.detailDaftarSewaAsrama.add(datas);
					})

				});
			}
			$scope.addNew = function(){
				$state.go("SewaAsrama");
			};
		}
	]);
});