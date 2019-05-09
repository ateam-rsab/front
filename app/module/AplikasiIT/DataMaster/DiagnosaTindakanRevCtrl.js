define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DiagnosaTindakanRevCtrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSarprasPhp', 'ModelItem', '$http', 'CacheHelper','$mdDialog',
		function ($q, $rootScope, $scope, $state, manageSarprasPhp, modelItem, $http, cacheHelper,$mdDialog) {
			// $scope.isRouteLoading=false;
			$scope.dataVOloaded = true;
			$scope.dataSelected = {};
			$scope.item = {};
			LoadData();
			$scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));

			$scope.cariFilter = function () {
				$scope.isRouteLoading = true;
				LoadData()
			}
			$scope.clearSearch = function () {
				$scope.ClearSearch();
			}

			//fungsi clear kriteria search
			$scope.ClearSearch = function () {
				$scope.item = {};
				loadData()
			}


			function LoadData() {
				var kdDiagnosa = "";
				if ($scope.item.kddiagnosa != undefined) {
					kdDiagnosa = "&kdDiagnosa=" + $scope.item.kddiagnosa;
				}
				var idDiagnosa = "";
				if ($scope.item.iddiagnosa != undefined) {
					idDiagnosa = "&id=" + $scope.item.iddiagnosa;
				}
				var namaDiagnosa = "";
				if ($scope.item.namadiagnosa != undefined) {
					namaDiagnosa = "&namaDiagnosa=" + $scope.item.namadiagnosa;
				}


				cacheHelper.set('DiagnosaRevCtrl');
				manageSarprasPhp.getDataTableTransaksi("diagnosatindakan/get-data-diagnosa?"
					+ kdDiagnosa
					+ idDiagnosa
					+ namaDiagnosa
					).then(function (data) {
						$scope.isRouteLoading = false;
						$scope.dataSource = new kendo.data.DataSource({
							data: data.data.diagnosa,
							pageSize: 10,
							total: data.length,
							serverPaging: false,
							schema: {
								model: {
									fields: {
									}
								}
							}
						});
					})
				}

				$scope.click = function (dataPasienSelected) {
					var data = dataPasienSelected;

				};

				$scope.klik = function (current) {
					
					if(current.id!=undefined){
						$scope.item.idx = current.id;	
					}
					
				}
				$scope.edit = function () {
					if ($scope.item.idx == undefined) {
						messageContainer.error("Pilih 1 Data Untuk di edit!!")
					} else {
						$state.go("DiagnosaTindakanEdit",
						{
							idx: $scope.item.idx
						})
					}
				}

				// scope action grid
				// $scope.disableData = function () {

				// 	var idstatus = "";
				// 	if ($scope.item.idx != undefined) {
				// 		idstatus =  $scope.item.idx;
				// 	}
				// 	var statusenabledfalse = "";
				// 	if ($scope.item.idx != undefined) {
				// 		statusenabledfalse = 'f';
				// 	}


				// 	var data = {	
				// 		id: idstatus,
				// 		statusEnabled:statusenabledfalse,

				// 	}

				// 	var objSave =
				// 	{
				// 		data: data
				// 	}
				// 	manageSarprasPhp.updateFalseDT(objSave).then(function (e) {
				// 		$scope.cariFilter();

				// 	});
				// }

				function disableData(e) {

					var idstatus = "";
					// if ($scope.item.idx != undefined) {
					// 	idstatus =  $scope.item.idx;
					// }
					// var statusenabledfalse = "";
					// if ($scope.item.idx != undefined) {
					// 	statusenabledfalse = 'f';
					// }

					e.preventDefault();
					var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
					idstatus=dataItem.id;

					var data = {	
						id: idstatus,
						statusEnabled:"f",

					}


					var objSave =
					{
						data: data
					}
					manageSarprasPhp.updateFalseDT(objSave).then(function (e) {
						$scope.cariFilter();

					});
				}

				// $scope.enableData = function () {
				// 	var idstatus = "";
				// 	if ($scope.item.idx != undefined) {
				// 		idstatus =  $scope.item.idx;
				// 	}
				// 	var statusenabledfalse = "";
				// 	if ($scope.item.idx != undefined) {
				// 		statusenabledfalse = 't';
				// 	}


				// 	var data = {	
				// 		id: idstatus,
				// 		statusEnabled:statusenabledfalse,

				// 	}

				// 	var objSave =
				// 	{
				// 		data: data
				// 	}
				// 	manageSarprasPhp.updateFalseDT(objSave).then(function (e) {
				// 		$scope.cariFilter();

				// 	});
				// };


				function enableData(e) {
					var idstatus = "";
					// if ($scope.item.idx != undefined) {
					// 	idstatus =  $scope.item.idx;
					// }
					// var statusenabledfalse = "";
					// if ($scope.item.idx != undefined) {
					// 	statusenabledfalse = 't';
					// }

					e.preventDefault();
					var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
					idstatus=dataItem.id;

					var data = {	
						id: idstatus,
						statusEnabled:"t",

					}	


					var objSave =
					{
						data: data
					}
					manageSarprasPhp.updateFalseDT(objSave).then(function (e) {
						$scope.cariFilter();

					});
				};

				$scope.tambah = function () {
					// $scope.winDialog.center().open();
					$state.go("DiagnosaTindakanEdit")
				}

				$scope.columnGrid = [
				{
					"field": "id",
					"title": "Id",
					"width": "100px",
				},
				{
					"field": "kddiagnosatindakan",
					"title": "Kode Diagnosa",
					"width": "100px",
				},
				{
					"field": "namadiagnosatindakan",
					"title": "Nama Diagnosa",
					"width": "300px",

				},
				{
					"field": "statusenabled",
					"title": "Status Enabled",
					"width": "80px",
				},
				
				// {
				// 	"title": "Action",
				// 	"width": "120px",
				// 	"template": "<button class='btnEdit' ng-click='enableData()'>Enable</button>" +
				// 	"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
				// }

				{
							"command":
								[
									{
										text: "Enabled", 
										click: enableData, 
										// imageClass: "k-icon k-floppy"
									},
								
									{
										text: "Disable", 
										click: disableData, 
										// imageClass: "k-icon k-delete"	
									}
								],

							title: "",
							width: "200px",
				}

				];

				$scope.mainGridOptions = {
					pageable: true,
					columns: $scope.columnProduk,
					editable: "popup",
					selectable: "row",
					scrollable: false
				};
			}
			]);
});
