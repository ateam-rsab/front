define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarPemakaianRuangRapatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state',
		function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;

			$scope.mainGridOptions = {
				toolbar: [{
					text: "Order", template: '<button ng-click="addNew()" class="k-button k-button-icontext k-gridd-add"><span class="k-icon k-add"></span>Order Baru</button>'
				}],
				columns: [
					{"field": "noOrder","title": "No Order",width: "100px"},
					{"field": "unitPemesan.namaRuangan","title": "Unit Pemakai",width: "200px"},
					{"field": "temaRapat","title": "Tema Rapat",width: "200px"},
					{"field": "tglRapat","title": "Tgl Rapat",width: "200px"},
					{"field": "hari","title": "Hari",width: "200px"},
					{"field": "waktu","title": "Waktu",width: "100px"},
					{"field": "lamaPenggunaan","title": "Lama Penggunaan",width: "100px"},
					{"field": "jumlahPeserta","title": "Jumlah Peserta",width: "100px"},
					{"field": "ruanganRapat.namaRuangan","title": "Nama Ruangan Rapat",width: "200px"},
					{"field": "jenisKonsumsiSet","title": "Jenis Konsumsi",width: "200px"}
				],
				selectable: "row",
				editable: false
			}
			$scope.find = function(){
				var awal = DateHelper.getPeriodeFormatted($scope.item.awal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.akhir);
				var url = "periodeAwal=" + awal + "&periodeAkhir=" + akhir;
				ManageSarpras.getOrderList("daftar-order-pemakaian-ruang-rapat/find-by-periode/?" + url).then(function(dat){
					// debugger;
				    $scope.listOrder = dat.data.data.data;
					// console.log(JSON.stringify($scope.listOrder[0].jenisKonsumsiSet.length));
				    for (var i = $scope.listOrder.length - 1; i >= 0; i--) {
						var date = new Date($scope.listOrder[i].tglRapat);
						$scope.listOrder[i].tglRapat = DateHelper.getTanggalFormatted(date);
						date = new Date($scope.listOrder[i].waktu);
						$scope.listOrder[i].waktu = DateHelper.getJamFormatted(date);
						var konsumsi = "";
						for (var j = 0; j < $scope.listOrder[i].jenisKonsumsiSet.length; j++) {
							if(konsumsi != "") konsumsi = konsumsi + ", ";
							konsumsi = konsumsi + $scope.listOrder[i].jenisKonsumsiSet[j].jenisKonsumsi.name;
						}
							$scope.listOrder[i].jenisKonsumsiSet = konsumsi;
					}
				});
			}
			$scope.find();

			$scope.klik = function(r){
				console.log(JSON.stringify(r));
				$scope.current = r;
			}

			$scope.navToPemakaianRuangRapat = function(current){
				$state.go("PemakaianRuangRapat", {
					noOrder: $scope.current
				})
			}
	}])
})