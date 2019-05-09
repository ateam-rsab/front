define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPemulasaraanJenazahEksternalCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', '$state',
		function ($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, $state) {
			$scope.mainGridOptions = {
				// dataSource: {
				// 	data: []
				// },
				toolbar : ["excel", "pdf", {
					text: "Print", template: '<button ng-click="addNew()" class="k-button k-button-icontext k-grid-add"><span class="k-icon k-add"></span>Print</button>'
				}],   
				columns: [
					{field: "nostruk", title: "<h3>No Order</h3>", width: "120px"},
					{field: "namaPemesan", title: "<h3>Nama Penyewa</h3>", width: "150px"},
					// {field: "noKtp", title: "<h3>No KTP</h3>", width: "150px"},
					{field: "noTelp", title: "<h3>No Telp/HP</h3>", width: "120px"},
					{field: "alamat", title: "<h3>Alamat</h3>", width: "200px"},
					{field: "tglstruk", title: "<h3>Tgl Struk</h3>", template: "#if (tglstruk !== null) {# #=kendo.toString(kendo.parseDate(new Date(tglstruk)), 'dd-MM-yyyy')# #} else{# '-' #}#",width: 80},
					{field: "tglfaktur", title: "<h3>Tgl Faktur</h3>", template: "#if (tglfaktur !== null) {# #=kendo.toString(kendo.parseDate(new Date(tglfaktur)), 'dd-MM-yyyy')# #} else{# '-' #}#",width: 80},
					{field: "statusPakai", title: "<h3>Status Pakai</h3>", width: "100px"},
					{field: "statusBayar", title: "<h3>Status Bayar</h3>", width: "100px"},
					{field: "totalhargasatuan", title: "<h3>Total Biaya</h3>", width: "100px", format: "{0:n0}", attributes: {style: "text-align:right"}},
					{command: [{text:"Detil",click:viewOrder}], width: 80}
				],
				selectable: "row",
				editable: false,
				pageable: true
			};
			function init() {
				$scope.dataVOloaded = true;
				$scope.now = new Date(); 
				$scope.item = {
					periodeAwal: new Date(),
					periodeAkhir: new Date()
				};
				$scope.Search();
			}
			$scope.Search = function () {
				if(!$scope.item.periodeAwal || !$scope.item.periodeAkhir) return;
				findByPeriode($scope.item.periodeAwal, $scope.item.periodeAkhir);
			};
			$scope.out = function (order, status) {
				if (status == "DIPAKAI"){
					$state.go("KeluarRumahDuka", {
						noOrder: order
					})
				}else if (status == "SELESAI"){
					window.messageContainer.error('Data Selesai Digunakan');
				}
			};
            $scope.addNew = function(){
				// alert("You are going to add new order");
				$state.go("PemulasaraanJenazahEksternal")
			};
			init();
			function viewOrder(e){
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				$state.go("DetilPemulasaraanJenazahEksternal",{
					noRec: dataItem.noRec
				});
			}
			function findByPeriode(awal, akhir){
				var awal = DateHelper.getPeriodeFormatted(awal);
				var akhir = DateHelper.getPeriodeFormatted(akhir);
				var url = "startDate=" + awal + "&endDate=" + akhir;
				ManageSarpras.getOrderList("daftar-pemulasaraan-jenazah/get-pemulasaraan-jenazah-external/?" + url).then(function (dat) {
					var ds = new kendo.data.DataSource({
						data: dat.data.data.data,
						pageSize: 15
					});
					var grid = $("#gridPemulasaraanEksternal").data("kendoGrid");
					grid.setDataSource(ds);
					grid.dataSource.read();
				});
			}
			// $scope.findAll = function(){
			// 	findAll();
			// };
		}
	]);
});