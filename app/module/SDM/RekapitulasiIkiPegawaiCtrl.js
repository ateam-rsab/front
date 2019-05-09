define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RekapitulasiIkiPegawaiCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSdm', 'ReportHelper','CetakHelper', 'FindSdm',
	    function($rootScope, $scope, $state, ModelItem, DateHelper, ManageSdm, reportHelper, CetakHelper, FindSdm) {
			$scope.now = new Date();
			$scope.item = {};

			$scope.dataVOloaded = true;

			$scope.yearSelected = {
				start: "year",
				depth: "year"
			};

			FindSdm.getUnitKerja().then(function(res){
				$scope.listUnitKerja = res.data.data;
			})

			$scope.cari = function() {
				if ($scope.item.ruangan.id === undefined || $scope.item.DatePickerBulan === undefined) {
					window.messageContainer.error("Ruangan dan bulan harus dipilih terlebih dahulu");
					return;
				} else {
					ManageSdm.getOrderList("sdm/get-rekap-IKI/" + $scope.item.ruangan.id + "/" + moment($scope.item.DatePickerBulan).format("YYYY-MM")).then(function(dat) {
						$scope.sourceOrder = new kendo.data.DataSource({
							data: dat.data.data.listIKI,
							schema: {
								model: {
									fields: {
										namaLengkap: { editable: false },
										totalIKI: { editable: false },
										perilaku: { editable: false },
										inovasi: { editable: true },
										kuantitas: { editable: false },
										kualitas: { editable: false },
										nip: { editable: false }
									}
								}
							},
							aggregate: [{ field: "totalIKI", aggregate: "sum" }],
						});
						$scope.mainGridOption = {
							editable: false,
							selectable: "row",
							columns: [{
								"field": "nip",
								"title": "NIP",
								"width": "12%",
								footerTemplate: "Jumlah:"
							}, {
								"field": "namaLengkap",
								"title": "Nama Pegawai",
								"width": "28%"
							}, {
								"field": "kuantitas",
								"title": "Kuantitas",
								"width": "12%",
								"format": "{0:n2}",
								"attributes": {
									"style": "text-align:right"
								}
							}, {
								"field": "kualitas",
								"title": "Kualitas",
								"width": "12%",
								"format": "{0:n2}",
								"attributes": {
									"style": "text-align:right"
								}
							}, {
								"field": "perilaku",
								"title": "Perilaku",
								"width": "12%",
								"format": "{0:n2}",
								"attributes": {
									"style": "text-align:right"
								}
							}, {
								"field": "inovasi",
								"title": "Inovasi",
								"width": "12%",
								"format": "{0:n2}",
								"attributes": {
									"style": "text-align:right"
								}
							}, {
								"field": "totalIKI",
								"title": "IKI",
								"width": "12%",
								"format": "{0:n2}",
								aggregates: ["sum"],
								footerTemplate: "<span class=\"pull-right\"> #= kendo.toString(sum,'0.00')# </span>",
								"attributes": {
									"style": "text-align:right"
								}
							}]
						}
					});
				}
			};

			$scope.cetakLapIndeksKehadiran = function() {
				var listRawRequired = [
					"item.DatePickerBulan|k-ng-model|Periode"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					var fixUrlLaporan = CetakHelper.open("reporting/lapRekapIndeksKehadiran?periode="+DateHelper.formatDate($scope.item.DatePickerBulan, "YYYY-MM"));
					window.open(fixUrlLaporan, '', 'width=800,height=600');
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			};

			$scope.Cetak = function() {
				var listRawRequired = [
					"item.ruangan|k-ng-model|Unit Kerja",
					"item.DatePickerBulan|k-ng-model|Periode"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					var fixUrlLaporan = CetakHelper.open("reporting/lapRekapIKI?ruanganId="+$scope.item.ruangan.id+"&periode="+DateHelper.formatDate($scope.item.DatePickerBulan, "YYYY-MM"));
					window.open(fixUrlLaporan, '', 'width=800,height=600');
				} else {
					ModelItem.showMessages(isValid.messages);
				}
				
			};

			
			$scope.cetakRekapIKI = function() {
				var listRawRequired = [
					"item.DatePickerBulan|k-ng-model|Periode"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					var fixUrlLaporan = CetakHelper.open("reporting/lapRekapALLIKI?periode="+DateHelper.formatDate($scope.item.DatePickerBulan, "YYYY-MM"));
					window.open(fixUrlLaporan, '', 'width=800,height=600');
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			};



	             

		}
	]);
});
