define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TambahPengajuanPelatihanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm',
		function($rootScope, $scope, ModelItem, $state, ManageSdm) {
			$scope.item = {};
			var init = function () {
				ManageSdm.getItem("pelatihan-agenda/detail-pelatihan-agenda?strukPlanningId="+$state.params.strukPlanningId+"&produkId="+$state.params.produkId).then(function(dat){
					$scope.dataMaster = dat.data.data;
					$scope.item.namaPaketPelatihan = $scope.dataMaster.namaPakrtPelatihan;
					$scope.item.penyelenggara = $scope.dataMaster.penyelenggara;
					$scope.item.tanggalAkhir = new Date($scope.dataMaster.tanggalAhir);
					$scope.item.tanggalAwal = new Date($scope.dataMaster.tanggalAwal);
					$scope.item.kapasitasPeserta = $scope.dataMaster.kapasitasPeserta;
					$scope.item.lokasi = $scope.dataMaster.tempat
					$scope.item.dataMax = $scope.dataGrid_1._data.length+"/"+$scope.item.kapasitasPeserta;
					dat.data.agenda.forEach(function (data) {
						data.tanggal = kendo.toString(new Date(data.tanggal), "dd MMMM yyyy");
						data.sesi = data.jamMulai+"-"+data.jamSelesai
					})
					$scope.dataGrid_2 = new kendo.data.DataSource({
						pageSize: 10,
						data: dat.data.agenda
					});

				});
				ManageSdm.getItem("pelatihan-permintaan/get-no-pengajuan").then(function(dat){
					$scope.item.noPengajuan = dat.data.noPengajuan;

				});
				
			};
			init();
			
			$scope.listPegawai = ModelItem.kendoHttpSource('service/list-generic/?view=Pegawai&select=namaLengkap,id&criteria=statusEnabled&values=true', true);
			$scope.dropDownPegawai = function(container, options) {
				var editor = $('<input kendo-combo-box required k-data-text-field="\'namaLengkap\'" k-data-value-field="\'id\'" k-filter="\'contains\'" k-data-source="listPegawai" data-bind="value:' + options.field + '"/>')
				.appendTo(container);
			};
			$scope.dataGrid_1 = new kendo.data.DataSource({
				pageSize: 10,
				data: [],
				schema: {
					model: {
						fields: {
							peserta: { defaultValue: { id: null, namaLengkap: "--Pilih Pegawai"}}
						}
					}
				}
			});
			$scope.mainGridOptions_1 = { 
				toolbar : [ {
							    name: "tambah",
				                text: "Tambah Peserta",
			              		template: '<button class="k-button k-button-icontext" ng-click="cekPeserta()">Tambah Peserta</button>'	 
							}, 
							"save"
						  ],
				pageable: true,
				columns: [
				{ field:"peserta",title:"Peserta",width:200,editor: $scope.dropDownPegawai, template: "#=peserta.namaLengkap#"}],
				editable: true
			};
			$scope.cekPeserta = function () {
				if ($scope.dataGrid_1._data.length >= 5) {
					window.messageContainer.error('Kapasitas Peserta Sudah Penuh')
				}
				else {
					$("#kendoGrid").data("kendoGrid").addRow();
					init();
				}
				
			};
			$scope.mainGridOptions_2 = { 
				pageable: true,
				columns: [
				{ field:"tanggal",title:"Tanggal",width:100 },
				{ field:"sesi",title:"Sesi",width:150 },
				{ field:"namaKegiatan",title:"Keterangan",width:200 },
				{ field:"narasumber",title:"Nara Sumber",width:150 }],
				editable: false
			};
			$scope.simpan = function () {
				var permintaanPelatihanDetail = []
				$scope.dataGrid_1._data.forEach(function (data) {
					var dataTemp ={ 
						"pegawai":{
							"id": data.peserta.id
						}
					}
					permintaanPelatihanDetail.push(dataTemp);
				})
				var data =
				{
					"strukPlanningId":$state.params.strukPlanningId,
					"alasan":$scope.item.alasan,
					"permintaanPelatihanDetail": permintaanPelatihanDetail
				}
				ManageSdm.saveData(data, "pelatihan-permintaan/save-pelatihan-permintaan/").then(function(e) {
					init();
				});
			}
		}
		]);
});