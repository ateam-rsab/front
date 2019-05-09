define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('FormKontrakCtrl', ['$rootScope', '$state', '$scope', 'ModelItem', '$window', '$timeout', 'ManageSarpras', 'IPSRSService', 'ManageIPSRS',
		function ($rootScope, $state, $scope, ModelItem, $window, $timeout, ManageSarpras, IPSRSService, ManageIPSRS) {
			$scope.item = {};
			$scope.DataHide = false;
			$scope.isLoading = false;

			IPSRSService.getItem("service/list-generic/?view=Rekanan&select=namaRekanan,id").then(function (dat) {
				debugger
				$scope.rekanan = dat.data;
				// debugger;
			});
			var init = function () {
				$scope.number = 1;
				ManageIPSRS.getItemIPSRS("kontrak/list-kontrak/?namaKontrak=&rekananId=&noKontrak=").then(function (dat) {
					debugger
					$scope.dataMaster = dat.data.data;
					for (var i = 0; i < $scope.dataMaster.length; i++) {
						$scope.dataMaster[i].no = $scope.number++;
					}
					$scope.dataKontrak = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataMaster
					});
					$scope.DataHide = false;
					$scope.isLoading = false;
				});
			}
			init();

			$scope.$watch('pencarian', function (newValued) {
				if (newValued != undefined) {
					var q = newValued;
					var grid = $("#gridkontrak").data("kendoGrid");
					grid.dataSource.query({
						page: 1,
						pageSize: 20,
						filter: {
							logic: "or",
							filters: [
								{ field: "noSk", operator: "contains", value: q },
								{ field: "namaRekanan", operator: "contains", value: q },
								{ field: "namaKontrak", operator: "contains", value: q },
							]
						}
					});
				}
			});

			$scope.refresh = function () {
				$scope.DataHide = true;
				$scope.isLoading = true;
				$scope.item = {};
				$scope.pencarian = "";
				init();
			}


			$scope.mainGridOptions = {
				pageable: true,
				columns: [
					{ field: "no", title: "<h3 align=center>No.<h3>", filterable: false },
					{ field: "noSk", title: "<h3 align=center>Nomor SK<h3>", filterable: false },
					{ field: "namaRekanan", title: "<h3 align=center>Nama Rekanan<h3>", filterable: false },
					{ field: "namaKontrak", title: "<h3 align=center>Nama Kontrak<h3>", filterable: false }],
				editable: false
			};

			$scope.klik = function (current) {
				$scope.current = current;
				$scope.item.noSk = current.noSk;
				$scope.item.namaRekanan = current.namaRekanan;
				$scope.item.namaKontrak = current.namaKontrak;
				$scope.item.noRec = current.noRec;

			};
			$scope.detail = function (current) {
				if ($scope.item.noRec == undefined) {
					window.messageContainer.error("Harap pilih daftar terlebih dahulu");
				} else {
					$state.go("FormDetailKontrak",
						{
							noRec: $scope.item.noRec
						});
				}

			}
			$scope.onSelect = function (e) {
				var data1 = $.map(e.files, function (file) { return file.extension; });
				var data2 = $.map(e.files, function (file) { return file.rawFile; });
				var files = data1[0];
				var file = data2[0];

				if (files && file) {
					var reader = new FileReader();

					reader.onload = function (readerEvt) {
						var binaryString = readerEvt.target.result;
						$scope.item.urlDokumen = btoa(binaryString);
						$scope.item.extexntion = files.substring(1);
					};
				}
				reader.readAsBinaryString(file);
			};

			$scope.save_kontrak = function () {
				var listRawRequired = [
					"item.noKontrak|ng-model|No Kontrak",
					"item.namaRekanan|k-ng-model|Nama Rekanan",
					"item.namaKontrak|ng-model|Nama Kontrak",
					"item.keterangan|ng-model|Keterangan"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
				var data =
				{
					"rekanan": {
						"id": $scope.item.namaRekanan.id
					},
					"noSk": $scope.item.noKontrak,
					"namaKontrak": $scope.item.namaKontrak,
					"keterangan": $scope.item.keterangan,
					"extexntion": $scope.item.extexntion,
					"urlDokumen": $scope.item.urlDokumen
				}
				if (isValid.status) {
					ManageIPSRS.saveDataSarPras(data, "kontrak/save-kontrak/").then(function (e) {
						console.log(JSON.stringify(e.data));
						init();
						$scope.item = {};
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			}

			$scope.Batal = function () {
				$scope.item.noKontrak = "",
					$scope.item.namaRekanan = "",
					$scope.item.namaKontrak = "",
					$scope.item.keterangan = ""
			};


		}
	]);
});