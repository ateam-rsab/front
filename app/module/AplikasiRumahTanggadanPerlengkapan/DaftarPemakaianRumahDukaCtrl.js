define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPemakaianRumahDukaCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', '$state',
		function ($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, $state) {
			$scope.mainGridOptions = {
				dataSource: {
					data: []
				},
				toolbar : ["excel", "pdf", 
				{text: "Order", template: '<button ng-click="addNew()" class="k-button k-button-icontext k-grid-add"><span class="k-icon k-add"></span>Order Baru</button>'},
				{text: 'Print', template: '<button ng-click="print()" class="k-button k-button-icontext k-grid-add"><span class="k-icon k-printer"></span>Print</button>'}
			],   
				columns: [
					{field: "noOrder", title: "<h3>No Order</h3>", width: "120px"},
					{title: "Tanggal Sewa", columns: [
						{field: "tglPelayananAwal", title: "<h3>Awal</h3>", template: "#=kendo.toString(kendo.parseDate(new Date(tglPelayananAwal)), 'dd-MM-yyyy')#",width: 80},
						{field: "tglPelayananAkhir", title: "<h3>Akhir</h3>", template: "#=kendo.toString(kendo.parseDate(new Date(tglPelayananAkhir)), 'dd-MM-yyyy')#",width: 80}
					]},
					{field: "namaPenyewa", title: "<h3>Nama Penyewa</h3>", width: "150px"},
					// {field: "noKtp", title: "<h3>No KTP</h3>", width: "150px"},
					{field: "noTelp", title: "<h3>No Telp/HP</h3>", width: "120px"},
					{field: "alamat", title: "<h3>Alamat</h3>", width: "200px"},
					{field: "namaProduk", title: "<h3>Nama Pelayanan</h3>", width: "200px"},
					// {field: "totalHargaSatuan", title: "<h3>Harga</h3>", width: "100px"},
					{field: "status", title: "<h3>Status</h3>", width: "100px"},
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
				findAll();
			}
			$scope.Search = function () {
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
				$state.go("PemakaianRumahDuka")
			};
			$scope.print = function(){
				var idGrid = $('#gridRumahDuka');
				var printContent = '';
				var win =  window.open('', '', 'width=800, height=500, resizeable=1, scrollbars=1');
				var doc = win.document.open();
				var htmlStart =
                '<!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<meta charset="utf-8" />' +
                '<title>Daftar Pemakaian Rumah Duka</title>' +
                '<link href="http://kendo.cdn.telerik.com/' + kendo.version + '/styles/kendo.common.min.css" rel="stylesheet" /> ' +
                '<style>' +
                'html { font: 11pt sans-serif; }' +
                '.k-grid { border-top-width: 0; }' +
                '.k-grid, .k-grid-content { height: auto !important; }' +
                '.k-grid-content { overflow: visible !important; }' +
                'div.k-grid table { table-layout: auto; width: 100% !important; }' +
                '.k-grid .k-grid-header th { border-top: 1px solid; }' +
                '.k-grouping-header, .k-grid-toolbar, .k-grid-pager > .k-link { display: none; }' +
                // '.k-grid-pager { display: none; }' + // optional: hide the whole pager
                '</style>' +
                '</head>' +
				'<body>';
				var htmlEnd =
                '</body>' +
				'</html>';
				
				var gridHeader = idGrid.children('.k-grid-header');
				if(gridHeader[0]){
					var thead = gridHeader.find('thead').clone().addClass('k-grid-header');
					printContent = idGrid.clone().children('k-grid-header').remove().end().children('k-grid-content').find('table').first()
						.children('tbody').before(thead).end()
						.end().end().end().end()[0].outerHTML;
				} else {
					printContent = idGrid.clone()[0].outerHTML;
				}
				doc.write(htmlStart + printContent + htmlEnd);
				doc.clone();
				win.print();

				
			}
			init();
			function viewOrder(e){
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				$state.go("DetilPemakaianRumahDuka",{
					noRecStrukOrder: dataItem.noRecStrukOrder
				});
			}
			function findAll(){
				ManageSarpras.getOrderList("daftar-pemakaian-rumah-duka/get-all-daftar-pemakaian-rumah-duka/").then(function (dat) {
					var gridData = $("#gridRumahDuka").data("kendoGrid");
					var ds = new kendo.data.DataSource({
						data:  dat.data.data.result,
						pageSize: 15
					});
					gridData.setDataSource(ds);
					gridData.dataSource.read();
				});
			}
			function findByPeriode(awal, akhir){
				var awal = DateHelper.getPeriodeFormatted(awal);
				var akhir = DateHelper.getPeriodeFormatted(akhir);
				var url = "periodeAwal=" + awal + "&periodeAkhir=" + akhir;
				ManageSarpras.getOrderList("daftar-pemakaian-rumah-duka/find-by-periode/?" + url).then(function (dat) {
					var ds = new kendo.data.DataSource({
						data: dat.data.data.result,
						pageSize: 15
					});
					var grid = $("#gridRumahDuka").data("kendoGrid");
					grid.setDataSource(ds);
					grid.dataSource.read();
				});
			}
			$scope.findAll = function(){
				findAll();
			};
		}
	]);
});