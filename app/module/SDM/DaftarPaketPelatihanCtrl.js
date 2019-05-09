define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPaketPelatihanCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm', '$state',
		function($rootScope, $scope, ModelItem, ManageSdm, $state) {
			$scope.item = {};
			var init = function () {
				ManageSdm.getItem("pelatihan-paket/list-pelatihan-paket?tanggalAwal=&tanggalAhir=").then(function(dat){
					$scope.dataGrid = dat.data.data;
					$scope.dataGrid.forEach(function (data) {
						data.tanggalAwal = new Date(data.tanggalAwal);
						data.tanggalAhir = new Date(data.tanggalAhir);
						data.tanggalAkreditasi = new Date(data.tanggalAkreditasi);
					})
					$scope.dataGridMaster = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataGrid
					});
				});
			}; 
			$scope.item.tanggalRencana = new Date();
			$scope.item.tanggalRencanaSelesai = new Date();
			$scope.cari = function () {
				var tanggalRencana = kendo.toString(new Date($scope.item.tanggalRencana), "yyyy-MM-dd");
				var tanggalRencanaSelesai = kendo.toString(new Date($scope.item.tanggalRencanaSelesai), "yyyy-MM-dd");
				ManageSdm.getItem("pelatihan-paket/list-pelatihan-paket?tanggalAwal="+tanggalRencana+"&tanggalAhir="+tanggalRencanaSelesai).then(function(dat){
					$scope.dataGrid = dat.data.data;
					$scope.dataGrid.forEach(function (data) {
						data.tanggalAwal = new Date(data.tanggalAwal);
						data.tanggalAhir = new Date(data.tanggalAhir);
						data.tanggalAkreditasi = new Date(data.tanggalAkreditasi);
					})
					$scope.dataGridMaster = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataGrid
					});
				});
			}; 
			init();
			$scope.klik = function(current){
                $scope.current = current;
                $scope.strukPlanningId = current.noRec;
                $scope.produkId = current.produkId;
            };
			$scope.detailGrid = function(dataItem){
				$scope.dataItem = dataItem;
				$state.go('DetailPaketPelatihan',{
					strukPlanningId: dataItem.noRec,
					produkId: dataItem.produkId
				})
			}
			$scope.agendaAcara = function(dataItem){
				$scope.dataItem = dataItem;
				$state.go('AgendaAcara',{
					strukPlanningId: $scope.strukPlanningId,
					produkId: $scope.produkId
				})
			}
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"jenisPaket",title:"Jenis Paket",width:150},
				{ field:"namaPaketPelatihan",title:"Nama Paket Pelatihan/Seminar",width:300 },
				{ field:"penyelenggara",title:"Penyelenggara",width:150 },
				{ field:"tempat",title:"Tempat",width:100 },
				{ field:"tanggalRencana",title:"Tanggal Rencana Pelaksanaan",width:200, columns: [
				{ field:"tanggalAwal", title:"Tanggal Awal", width:100, format:"{0:dd-MM-yyyy}" },
				{ field:"tanggalAhir", title:"Tanggal Akhir", width:100, format:"{0:dd-MM-yyyy}" }] },
				{ field:"akreditasiOleh",title:"Akreditasi Pelatihan",width:200 },
				{ field:"tanggalAkreditasi",title:"Tanggal Akreditasi",width:200, format:"{0:dd-MM-yyyy}"},
				{ field:"jumlahPengajar",title:"Jumlah Pengajar",width:200 },
				{
					title : "Detail",
					width : "200px",
					template : "<button class='c-button' ng-click='detailGrid(dataItem)''>Detail</button>"
				}],
				editable: false,
				selectable: true
			};
			
		}
		]);
});