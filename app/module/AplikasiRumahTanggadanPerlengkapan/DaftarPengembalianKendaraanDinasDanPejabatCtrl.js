define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarPengembalianKendaraanDinasDanPejabatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', '$state', 'DateHelper',
		function($rootScope, $scope, ModelItem, ManageSarpras, $state, DateHelper){
			$scope.title = "";
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {
				awal: new Date(),
				akhir: new Date()
			};
			$scope.mainGridOptions = {
				editable: false,
				selectable: "row",
				columns: [
					{field: "noOrder",title: "<h3>No. Order</h3>",width: "10%"},
					{field: "tglOrder",title: "<h3>Pemakaian</h3>",width: "20%", template: "#= kendo.toString(kendo.parseDate(new Date(tglOrder)),\"dd/MM/yyyy\")# / #= kendo.toString(kendo.parseDate(new Date(tglOrder)),\"HH:mm\")#"},
					{field: "kmAwal",title: "<h3>KM Awal</h3>",width: "10%", attributes: {style: "text-align:right"}, format: "{0:n0}"},
					{field: "kmTerakhir",title: "<h3>KM Akhir</h3>",width: "10%", attributes: {style: "text-align:right"}, format: "{0:n0}"},
					{field: "kondisi", title: "<h3>Kondisi</h3>", width: "10%"},
					{field: "tglPengembalian",title: "<h3>Pengembalian</h3>",width: "20%", template: "#= kendo.toString(kendo.parseDate(new Date(tglPengembalian)),\"dd/MM/yyyy\")# / #= kendo.toString(kendo.parseDate(new Date(tglPengembalian)),\"HH:mm\")#"},
					{field: "keterangan",title: "<h3>Keterangan</h3>",width: "35%"},
					{command: [{text: "Detail", click: showDetail, imageClass: "k-icon k-i-pencil"}], width: 90}
				]
			};
			$scope.Search = function(){
				var listRawRequired = [
					"item.awal|k-ng-model|Periode awal",
					"item.akhir|k-ng-model|Periode akhir"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					$scope.isRouteLoading = true;
					ManageSarpras.getOrderList("daftar-kendaraan-dinas/get-all-pengembalian-kendaraan-dinas/?startDate="+DateHelper.getDateTimeFormatted3($scope.item.awal)+"&endDate=" + DateHelper.getDateTimeFormatted3($scope.item.akhir)).then(function(dat){
						var gridData = $("#gridPengembalian").data("kendoGrid");
						var ds = new kendo.data.DataSource({
							data: dat.data.data.data,
							pageSize: 12
						});
						gridData.setDataSource(ds);
						gridData.dataSource.read();
						$scope.isRouteLoading = false;
						if(gridData.dataSource._data.length==0) toastr.warning('Belum ada data tersimpan.','Info');
					},(err)=>{
						$scope.isRouteLoading = false;
						throw err;
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			};
			$scope.kl = function(current){
				$scope.current = current;
			}
			$scope.NavToPemakaianKendaraanDinas = function() {
                $state.go('PemakaianKendaraanDinasDanPejabat', {
                    noOrder: $scope.current
                });
            };
            $scope.NavToPengembalianKendaraanDinas = function() {
                $state.go('PengembalianKendaraanDinasDanPejabat', {
                    noOrder: $scope.current
                });
			};
			$scope.opsiGridDetil = {
				columns: [
					{field: "noOrder", title: "No. Order"},
					{field: "namaProduk", title: "Nama Produk"},
					{field: "tglKeberangkatan", title: "Tanggal Berangkat", template: "#= kendo.toString(kendo.parseDate(new Date(tglKeberangkatan)), \"dd-MM-yyyy\") #"},
					{field: "namaRuangan", title: "Ruangan"},
					{field: "noPolisi", title: "No. Polisi"},
					{field: "tujuan", title: "Tujuan"},
					{field: "supir", title: "Supir"}
				]
			};
			function showDetail(e){
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				if(dataItem){
					$scope.isRouteLoading = true;
					ManageSarpras.getOrderList("daftar-kendaraan-dinas/get-detail-pengembalian-kendaraan-dinas-by-norec/?noRec="+dataItem.noRecStrukOrder).then(function(dat){
						$scope.dataItem = dat.data.data.data[0];
						for(var key in $scope.dataItem){
							if($scope.dataItem.hasOwnProperty(key)){
								if(key.indexOf("tgl") >= 0){
									$scope.dataItem[key] = DateHelper.formatDate(new Date($scope.dataItem[key]), "DD-MM-YYYY")
								}
							}
						};
						// var gridData = $("#gridDetil").data("kendoGrid");
						// var ds = new kendo.data.DataSource({
						// 	data: $scope.dataItem.permintaan,
						// 	pagesize: 5
						// });
						// gridData.setDataSource(ds);
						// gridData.dataSource.read();
						$scope.isRouteLoading = false;
						$scope.winDialog.center().open();
					}, function(err){
						$scope.isRouteLoading = false;
						throw err;
					});
				}
			}
	}])
})