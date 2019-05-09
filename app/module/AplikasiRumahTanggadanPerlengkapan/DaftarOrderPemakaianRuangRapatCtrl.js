define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarOrderPemakaianRuangRapatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'ManageIT', 'DateHelper', '$state',
		function ($rootScope, $scope, ModelItem, ManageSarpras, ManageIT, DateHelper, $state) {
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;

			$scope.mainGridOptions = {
                toolbar : ['excel','pdf', {
					text: "Order", template: '<button ng-click="addNew()" class="k-button k-button-icontext k-gridd-add"><span class="k-icon k-add"></span>Order Baru</button>'
				}],   
                columns: [
					{"field": "noOrder","title": "<h3>No Order</h3>",width: "100px"},
					{"field": "unitPemesan","title": "<h3>Unit Pemesan</h3>",width: "200px"},
					{"field": "temaRapat","title": "<h3>Tema Rapat</h3>",width: "180px"},
					{"field": "mulaiRapat","title": "<h3>Mulai Rapat</h3>",width: "100px",template: '#= kendo.toString(kendo.parseDate(new Date(mulaiRapat)), "HH:mm") #'},
					{"field": "selesaiRapat","title": "<h3>Selesai Rapat</h3>",width: "100px",template: '#= kendo.toString(kendo.parseDate(new Date(selesaiRapat)), "HH:mm") #'},
					{"field": "jumlahPeserta","title": "<h3>Jumlah Peserta</h3>",width: "70px"},
					{"field": "jumlahPanitia","title": "<h3>Jumlah Panitia</h3>",width: "70px"},
					{"field": "ruangRapat","title": "<h3>Nama Ruangan Rapat</h3>",width: "200px"},
					// {"field": "listJenisKonsumsi","title": "<h3>Jenis Konsumsi</h3>",width: "200px", template: '# if(listJenisKonsumsi.length == 2) {# <span class="center">Makan dan Snack<span> #} else if(listJenisKonsumsi[0].id == 1) {# <span class="center">Makan<span> #} else if(listJenisKonsumsi[0].id == 2) {# <span class="center">Snack<span> #} else {# "-" #}#'},
					{"field": "status","title": "<h3>Status</h3>",width: "100px"}
				],
                selectable: "row",
                // editable: "popup",
                pageable: true
            };

			$scope.find = function () {
				var awal = DateHelper.getPeriodeFormatted($scope.item.awal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.akhir);
				var url = "startDate=" + awal + "&endDate=" + akhir;
				ManageIT.getItem("daftar-order-pemakaian-ruang-rapat/get-daftar-order-pemakaian-ruang-rapat-by-periode?" + url).then(function (dat) {
					var gridData = $("#gridRuangRapat").data("kendoGrid");
					// debugger;
					var dataSource = dat.data.data;
					var ds = new kendo.data.DataSource({
						data: dataSource,
						pageSize: 12
					});
					gridData.setDataSource(ds);
					gridData.dataSource.read();
				});
			}
			$scope.find();

			$scope.batalOrder = function (selectedData) {
				let dataSave = {
					'noRecStrukOrder': selectedData.noRecStrukOrder,
					'statusEnabled': false
				}
				ManageIT.saveDataIT(dataSave, "order-pemakaian-ruang-rapat/save-order-pemakaian-ruang-rapat/").then(function (e) { 
					$scope.find();
				})
			}
			// $scope.getAll = function () {
			// 	ManageSarpras.getOrderList("daftar-order-pemakaian-ruang-rapat/get-all-order-ruang-rapat/").then(function (dat) {
			// 		var gridData = $("#gridRuangRapat").data("kendoGrid");
			// 		var ds = new kendo.data.DataSource({
			// 			data: dat.data.data.result,
			// 			pageSize: 12
			// 		});
			// 		gridData.setDataSource(ds);
			// 		gridData.dataSource.read();
			// 	});
			// }

			// $scope.getAll();

			$scope.out = function (noOrder, status) {
				// console.log(kdRuangan);
				if (status == "DIPAKAI") {
					var tglKeluar = new Date();
					var saveData = {
						"strukOrder": {
							"tglKeluar": tglKeluar.getTime()
						}
					}
					ManageSarpras.saveDataSarPras(saveData, "daftar-order-pemakaian-ruang-rapat/save-status-pemakaian-ruang-rapat/?noRec=" + noOrder).then(function (e) {
						console.log(JSON.stringify(e.data));
						// $scope.getAll();
					})
				}
			}

			$scope.klik = function (r) {
				// console.log(JSON.stringify(r));
				$scope.current = r;
			}

			$scope.navToPemakaianRuangRapat = function (current) {
				debugger;
				if ($scope.current.status == "ORDER")
					$state.go("PemakaianRuangRapat", {
						noOrder: $scope.current.noRecStrukOrder
					})
			}
			$scope.addNew = function(){
				$state.go("OrderPemakaianRuangRapat");
			}
		}])
})

// console.log(JSON.stringify($scope.listOrder[0].jenisKonsumsiSet.length));
// for (var i = $scope.listOrder.length - 1; i >= 0; i--) {
// 	var date = new Date($scope.listOrder[i].tglRapat);
// 	$scope.listOrder[i].tglRapat = DateHelper.getTanggalFormatted(date);
// 	date = new Date($scope.listOrder[i].waktu);
// 	$scope.listOrder[i].waktu = DateHelper.getJamFormatted(date);
// 	var konsumsi = "";
// 	for (var j = 0; j < $scope.listOrder[i].jenisKonsumsiSet.length; j++) {
// 		if(konsumsi != "") konsumsi = konsumsi + ", ";
// 		konsumsi = konsumsi + $scope.listOrder[i].jenisKonsumsiSet[j].jenisKonsumsi.name;
// 	}
// 		$scope.listOrder[i].jenisKonsumsiSet = konsumsi;
// }