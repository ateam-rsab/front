define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('AgendaAcaraCtrl', ['$rootScope', '$scope', 'ModelItem','$state', 'ManageSdm',
		function($rootScope, $scope, ModelItem, $state, ManageSdm	) {
			$scope.item = {};
			var init = function () {
				ManageSdm.getItem("pelatihan-agenda/detail-pelatihan-agenda?strukPlanningId="+$state.params.strukPlanningId+"&produkId="+$state.params.produkId).then(function(dat){
					$scope.dataDetail = dat.data.data;
					$scope.item.namaPelatihan = $scope.dataDetail.namaPakrtPelatihan
					$scope.item.tanggalRencana = kendo.toString(new Date($scope.dataDetail.tanggalAwal), "dd MMMM yyyy");
					dat.data.agenda.forEach(function (data) {
						data.tanggal = new Date(data.tanggal)
					})
					$scope.dataGrid = new kendo.data.DataSource({
						pageSize: 10,
						data: dat.data.agenda,
						schema: {
							model: {
								fields: {
									tanggal: { type: "date"},
									jamMulai: {type: "date"},
									jamSelesai: { type: "date"},
									namaKegiatan: { type: "string"},
									naraSumber: { type: "string"}

								}
							}
						}
					});
				});
			}
			init();

			$scope.dateEditor = function(container, options) {
				$('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
				.appendTo(container)
				.kendoDateTimePicker({});
			}
			$scope.timeEditor = function(container, options) {
				$('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
				.appendTo(container)
				.kendoTimePicker({});
			}
			$scope.mainGridOptions = { 
				pageable: true,
				toolbar: ["create", "save"],
				columns: [
				{ field:"tanggal",title:"<center>Tanggal",width:100, format:"{0:dd MMMM yyyy}", editor: $scope.dateEditor},
				{ field:"aktivitas",title:"<center>Aktivitas",width:300, columns:
				[
				{ field:"jamMulai",title:"<center>Jam Mulai",width:100, format:"{0:HH:mm}", editor: $scope.timeEditor },
				{ field:"jamSelesai",title:"<center>Jam Selesai",width:100, format:"{0:HH:mm}", editor: $scope.timeEditor },
				{ field:"namaKegiatan",title:"<center>Nama Kegiatan",width:200 },
				{ field:"narasumber",title:"<center>Nara Sumber",width:200 }]},
				{ command: "destroy", title:"",width:100}],
				editable: true
			};
			$scope.viewGrid = function () {
				var pelatihanAgenda  = [];
				$scope.dataGrid._data.forEach(function (data) {
					var dataTemp = {
						"tanggal": data.tanggal,
						"jamMulai": data.jamMulai,
						"jamSelesai": data.jamSelesai,
						"namaKegiatan": data.namaKegiatan,
						"noRec": data.noRec,
						"narasumber": data.narasumber
					}
					pelatihanAgenda.push(dataTemp);
				})
				var data = {
					"strukPlanningId" : $state.params.strukPlanningId,
					"pelatihanAgenda" : pelatihanAgenda
				}
				ManageSdm.saveData(data, "pelatihan-agenda/save-pelatihan-agenda/").then(function(e) {
					init();
				});
			}
		}
		]);
});