define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('FormMasterRekananCtrl', ['$rootScope', '$scope', 'ModelItem', '$window', '$timeout', 'ManageSarpras', 'ManageIPSRS', 'IPSRSService', '$state',
		function ($rootScope, $scope, ModelItem, $window, $timeout, ManageSarpras, ManageIPSRS, IPSRSService, $state) {
			$scope.item = {}
			$scope.DataHide = false;
			$scope.isLoading = false;
			IPSRSService.getItem("service/list-generic/?view=JenisRekanan&select=id,namaJenisRekanan").then(function (dat) {
				$scope.jenisRekanan = dat.data;
			});

			$scope.$watch('pencarian', function (newValued) {
				if (newValued != undefined) {
					var q = newValued;
					var grid = $("#gridrekanan").data("kendoGrid");
					grid.dataSource.query({
						page: 1,
						pageSize: 20,
						filter: {
							logic: "or",
							filters: [
								{ field: "namaRekanan", operator: "contains", value: q },
								{ field: "alamatLengkap", operator: "contains", value: q },
								{ field: "telepon", operator: "contains", value: q },
							]
						}
					});
				}
			});

			$scope.CariPegawai = function (getPencarian) {
				if (getPencarian != undefined) {
					var q = getPencarian;
					var grid = $("#grid").data("kendoGrid");
					grid.dataSource.query({
						page: 1,
						pageSize: 20,
						filter: {
							logic: "or",
							filters: [{ field: "pegawai", operator: "contains", value: q }]
						}
					});
				}
			}

			$scope.refresh = function () {
				$scope.DataHide = true;
				$scope.isLoading = true;
				$scope.item = {};
				$scope.pencarian = "";
				init();
			}

			$scope.batal = function () {
				$scope.item.idRekanan = "",
					$scope.item.namaRekanan = "",
					$scope.item.jenisRekanan = "",
					$scope.item.alamatRekanan = "",
					$scope.item.noTelepon = ""
			};

			var init = function () {
				ManageIPSRS.getItemIPSRS("rekanan/list-rekanan?jenisRekananId=").then(function (dat) {
					$scope.number = 1;
					$scope.dataMaster = dat.data.data;
					for (var i = 0; i < $scope.dataMaster.length; i++) {
						$scope.dataMaster[i].no = $scope.number++;
					}
					$scope.DataHide = false;
					$scope.isLoading = false;
					$scope.dataRekanan = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataMaster
					});
				});
			};
			init();


			$scope.searchDataGrid = function () {
				$scope.numbers = 1;
				ManageIPSRS.getItemIPSRS("rekanan/list-rekanan?jenisRekananId=" + $scope.item.jenisRekananGrid.id).then(function (dat) {
					$scope.dataMaster = dat.data.data;
					for (var i = 0; i < $scope.dataMaster.length; i++) {
						$scope.dataMaster[i].no = $scope.numbers++
					}
					$scope.dataRekanan = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataMaster
					});
				});
			}



			$scope.tutup = function () {
				$state.go("FormKontrak");
			}


			$scope.mainGridOptions = {
				filterable: {
					extra: false,
					operators: {
						string: {
							startsWith: "Pencarian"
						}
					}
				},
				pageable: true,
				columns: [
					{ field: "no", title: "<h3 align=center>No<h3>", filterable: false },
					{ field: "namaRekanan", title: "<h3 align=center>Nama Rekanan<h3>", filterable: false },
					{ field: "namaJenisRekanan", title: "<h3 align=center>Jenis Rekanan<h3>", filterable: false },
					{ field: "alamatLengkap", title: "<h3 align=center>Alamat Rekanan<h3>", filterable: false },
					{ field: "telepon", title: "<h3 align=enter>Nomor Telepon<h3>", filterable: false }],
				editable: false
			};



			$scope.save_rekanan = function () {
				var listRawRequired = [
					"item.namaRekanan|ng-model|Nama Rekanan",
					"item.alamatRekanan|ng-model|Alamat Rekanan",
					"item.noTelepon|ng-model|No Telepon",
					"item.jenisRekanan|k-ng-model|Jenis Rekanan"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if (isValid.status) {
					var data = {
						"namaRekanan": $scope.item.namaRekanan,
						"alamatLengkap": $scope.item.alamatRekanan,
						"telepon": $scope.item.noTelepon,
						"jenisRekanan": { "id": $scope.item.jenisRekanan.id }
					}
					ManageIPSRS.saveDataSarPras(data, "rekanan/save-rekanan/").then(function (e) {
						console.log(JSON.stringify(e.data));
						init();
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			}

		}
	]);
});
