define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailDaftarGajiPnsCtrl', ['$rootScope', '$scope', '$state', 'ManageSdm', 
		function($rootScope, $scope, $state, manageSdm){
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.dataParamsIdPns = JSON.parse($state.params.idPNS);
			$scope.item.Periode = JSON.parse(JSON.stringify($state.params.periode));
			$scope.item.jenisGaji = JSON.parse(JSON.stringify($state.params.jenis));
			$scope.dataParamsNoRec = JSON.parse(JSON.stringify($state.params.noRec));

			$scope.item.total = "Total";
			$scope.item.TotalKeseluruhan = "";
			var dataNamaPegawai = [];
			var dataKomponenGaji = [];

			var init = function () {
				manageSdm.getOrderList("sdm/get-detail-gaji-pns?noRec=" + $scope.dataParamsNoRec + "&id=" + $scope.dataParamsIdPns + "&periode=" + $scope.item.Periode + "&namaPegawai=", true).then(function(dat) {
					$scope.listDetailPns = dat.data.data.listData;
					$scope.item.TotalKeseluruhan = "Rp." + " " + parseFloat(dat.data.data.totalKeseluruhan).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					$scope.dataSource = new kendo.data.DataSource({
						data: $scope.listDetailPns,
						pageSize: 50
					});

					$scope.detailGridOptions = function(dataItem) {
						return {
							dataSource: new kendo.data.DataSource({
								data: dataItem.detail
							}),
							columns: [{
								field: "komponenGaji",
								title: "Komponen Gaji"
							}, {
								field: "harga",
								title: "Harga",
								template: "<span class='style-right'>{{formatRupiah('#: harga #', 'Rp.')}}</span>"
							}]
						};
						
					};
					
				});
			}
			init();
			

			$scope.columnDetailDaftarGajiPns = [{
				field: "nip",
				title: "<div style='text-align:center'>NIP</div>",
				filterable: false
			}, {
				field: "namaPegawai",
				title: "<div style='text-align:center'>Nama Pegawai</div>",
				filterable: false
			}, {
				field: "golongan",
				title: "<div style='text-align:center'>Golongan</div>",
				filterable: false
			}, {
				field: "totalHarga",
				title: "<div style='text-align:center'>Total</div>",
				template: "<span class='style-right'>{{formatRupiah('#: totalHarga #', 'Rp.')}}</span>",
				filterable: false
			}];
			$scope.mainGridOptions = {
				columns: $scope.columnDetailDaftarGajiPns,
				selectable: "row",
				editable: "popup",
				pageable: true
			};
			$scope.formatRupiah = function(value, curreny) {
				return curreny + " " +  parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			};
			
			/*function namaPegawai(element) {
				element.kendoAutoComplete({
					dataSource: dataNamaPegawai
				});
			};
			function komponenGaji(element) {
				element.kendoAutoComplete({
					dataSource: dataKomponenGaji
				})
			};
			$scope.Cetak = function () {

			}*/
		}
	])
});