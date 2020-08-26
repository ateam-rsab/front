define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('ActivityPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'DateHelper', 'ManageSdmNew',
		function ($q, $rootScope, $scope, ModelItem, IPSRSService, dateHelper, ManageSdmNew) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				$scope.isRouteLoading = true;

				var activityPegawai = [];
				var pegawai = [];
				var namaPegawai = "";
				var nomor = 0;
				var dataActivityPegawai = [];
				$q.all([
					ManageSdmNew.getListData("sdm/get-activity-pegawai?tanggal=&idPegawai=", true),
					IPSRSService.getFieldListData("Pegawai&select=id,namaLengkap", true)
				]).then(function (data) {
					activityPegawai = data[0].data.data;
					pegawai = data[1].data;
					for (var i = 0; i < activityPegawai.length; i++) {
						nomor += 1;
						for (var j = 0; j < pegawai.length; j++) {
							if (activityPegawai[i].pegawaiId == pegawai[j].id) {
								namaPegawai = pegawai[j].namaLengkap
							}
						}
						var daftar = {
							no: nomor,
							keterangan: activityPegawai[i].keterangan,
							tanggalKejadian: activityPegawai[i].tanggalKejadian,
							pegawai: namaPegawai,
							pegawaiId: activityPegawai[i].pegawaiId,
							group: activityPegawai[i].group,
							statusEnabled: activityPegawai[i].statusEnabled,
							noRec: activityPegawai[i].noRec
						}
						dataActivityPegawai.push(daftar);
					}
					$scope.dataSource = new kendo.data.DataSource({
						data: dataActivityPegawai,
						pageSize: 10
					});
					$scope.listpegawai = pegawai;

					$scope.isRouteLoading = false;
				});
			};
			init();
			$scope.mainGridOptions = {
				pageable: true,
				columns: $scope.columnActivityPegawai,
				scrollable: false,
				editable: "popup",
				selectable: "row"
			}
			$scope.columnActivityPegawai = [{
				"field": "no",
				"title": "No"
			}, {
				"field": "keterangan",
				"title": "Keterangan"
			}, {
				"field": "tanggalKejadian",
				"title": "Tanggal Kejadian",
				"template": "{{formatTanggal('#: tanggalKejadian #')}}"
			}, {
				"field": "pegawai",
				"title": "Pegawai"
			}
				// , {
				//     "field": "group",
				//     "title": "Group"
				// }, {
				//     "field": "statusEnabled",
				//     "title": "Status Enabled"
				// }, {
				// 	'title': 'Action',
				// 	'width': '200px',
				// 	'template': "<button class='btnEdit' ng-click='enableData()'>Enable</button>" +
				// 				"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
				// }
			];
			$scope.formatTanggal = function (value) {
				var data = value;
				if (data == "null") {
					return "";
				} else {
					return dateHelper.formatDate(parseInt(data), "DD-MM-YYYY HH:MM:SS");
				}
			};
			$scope.klik = function (current) {
				$scope.showEdit = true;
				$scope.current = current;
				$scope.item.noRec = current.noRec;
				$scope.item.statusEnabled = current.statusEnabled;
				$scope.item.keterangan = current.keterangan;
				$scope.item.group = current.group;
				$scope.item.pegawai = {
					id: current.pegawaiId,
					namaLengkap: current.pegawai
				}
				$scope.item.tanggalKejadian = dateHelper.formatDate(parseInt(current.tanggalKejadian), "YYYY-MM-DD");
				//debugger;
			};
			$scope.Search = function () {
				var listRawRequired = [
					"item.tanggalKejadian|k-ng-model|Tanggal Kejadian"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if (isValid.status) {
					$scope.isRouteLoading = true;

					var activityPegawai = [];
					var pegawai = [];
					var namaPegawai = "";
					var nomor = 0;
					var dataActivityPegawai = [];
					var tanggalKejadian = $scope.item.tanggalKejadian ? dateHelper.formatDate($scope.item.tanggalKejadian, "YYYY-MM-DD") : "";
					var idPegawai = $scope.item.pegawai ? $scope.item.pegawai.id : ""
					$q.all([
						ManageSdmNew.getListData("sdm/get-activity-pegawai?tanggal=" + tanggalKejadian + "&idPegawai=" + idPegawai, true),
						IPSRSService.getFieldListData("Pegawai&select=id,namaLengkap", true)
					]).then(function (data) {
						activityPegawai = data[0].data.data;
						pegawai = data[1].data;
						for (var i = 0; i < activityPegawai.length; i++) {
							nomor += 1;
							for (var j = 0; j < pegawai.length; j++) {
								if (activityPegawai[i].pegawaiId == pegawai[j].id) {
									namaPegawai = pegawai[j].namaLengkap
								}
							}
							var daftar = {
								no: nomor,
								keterangan: activityPegawai[i].keterangan,
								tanggalKejadian: activityPegawai[i].tanggalKejadian,
								pegawai: namaPegawai,
								pegawaiId: activityPegawai[i].pegawaiId,
								group: activityPegawai[i].group,
								statusEnabled: activityPegawai[i].statusEnabled,
								noRec: activityPegawai[i].noRec
							}
							dataActivityPegawai.push(daftar);
						}
						$scope.dataSource = new kendo.data.DataSource({
							data: dataActivityPegawai,
							pageSize: 10
						});
						$scope.listpegawai = pegawai;

						$scope.isRouteLoading = false;
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			};
			$scope.enableData = function () {
				IPSRSService.getClassMaster("delete-master-table?className=ActivityPegawai&&noRec=" + $scope.item.noRec + "&&statusEnabled=true").then(function (dat) {
					init();
				});
			};
			$scope.disableData = function () {
				IPSRSService.getClassMaster("delete-master-table?className=ActivityPegawai&&noRec=" + $scope.item.noRec + "&&statusEnabled=false").then(function (dat) {
					init();
				});
			};
			$scope.tambah = function () {
				var data = {
					"class": "ActivityPegawai",
					"listField": {
						"group": $scope.item.group,
						"keterangan": $scope.item.keterangan,
						"pegawai": {
							"id": $scope.item.pegawai.id
						},
						"pegawaiId": $scope.item.pegawai.id,
						"tanggalKejadian": $scope.item.tanggalKejadian
					}
				}
				IPSRSService.saveDataMaster(data, "update-master-table").then(function (e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
				});
			};
			$scope.edit = function () {
				var data = {
					"class": "ActivityPegawai",
					"listField": {
						"group": $scope.item.group,
						"keterangan": $scope.item.keterangan,
						"pegawai": {
							"id": $scope.item.pegawai.id
						},
						"pegawaiId": $scope.item.pegawai.id,
						"tanggalKejadian": $scope.item.tanggalKejadian,
						"noRec": $scope.item.noRec,
						"statusEnabled": $scope.item.statusEnabled
					}
				};
				IPSRSService.saveDataMaster(data, "update-master-table").then(function (e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
				});
			};
			$scope.batal = function () {
				$scope.item = {};
			};

		}
	]);
});
