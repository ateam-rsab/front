define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('CaraSetorCtrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSarprasPhp', 'ModelItem', '$http', 'CacheHelper','$mdDialog', 'ManageServicePhp',
		function ($q, $rootScope, $scope, $state, manageSarprasPhp, modelItem, $http, cacheHelper,$mdDialog, ManageServicePhp) {
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
				var kdCaraSet = "";
				if ($scope.item.kdCaraSetor != undefined) {
					kdCaraSet = "&kdcarasetor=" + $scope.item.kdCaraSetor;
				}
				var idCaraSetor = "";
				if ($scope.item.idCaraSetor != undefined) {
					idCaraSetor = "&id=" + $scope.item.idCaraSetor;
				}
				var caraSetor = "";
				if ($scope.item.caraSetor != undefined) {
					caraSetor = "&carasetor=" + $scope.item.caraSetor;
				}
			

				cacheHelper.set('CaraSetorCache');
				ManageServicePhp.getDataTableTransaksi("bendahara-penerimaan/get-data-combo?"
					+ kdCaraSet
					+ caraSetor
					+ kdCaraSet
				).then(function (data) {
						$scope.isRouteLoading = false;
						$scope.dataSource = new kendo.data.DataSource({
							data: data.data.carasetor,
							pageSize: 10,
							total: data.data.length,
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

			$scope.klik = function (dataSelected) {
				
				$scope.item.idx = dataSelected.id;
			}
			$scope.edit = function () {
				if ($scope.item.idx == undefined) {
					toastr.error("Pilih 1 Data Untuk di edit!")
				} else {
					$scope.popUpWin.center().open();
					$scope.item.inputID=$scope.dataSelected.id;
					$scope.item.inputKodeCaraSetor=$scope.dataSelected.kdcarasetor;
					$scope.item.inputCaraSetor=$scope.dataSelected.carasetor;

				}
			}


			$scope.disableData = function () {
				manageSarprasPhp.getDataTableMaster("delete-master-table?className=Rekanan&&id=" + $scope.item.id + "&&statusEnabled=false").then(function (dat) {
					init();
				});
			};
			$scope.enableData = function () {
				manageSarprasPhp.getDataTableMaster("delete-master-table?className=Rekanan&&id=" + $scope.item.id + "&&statusEnabled=true").then(function (dat) {
					init();

				});
			};
		manageSarprasPhp.getDataTableTransaksi("ruangan/get-data-combo", false).then(function (data) {
				$scope.listPegawai = data.data.pegawai;
				$scope.listModulAplikasi = data.data.modulaplikasi;
				$scope.listjenisrekanan = data.data.jenisrekanan;
			})

		
			$scope.tambah = function () {
				$scope.popUpWin.center().open();
			}

			$scope.columnGrid = [
				{
					"field": "id",
					"title": "Id",
					"width": "30px",
				},
				{
					"field": "carasetor",
					"title": "Cara Setor",
					"width": "300px",

				},
				{
					"field": "kdcarasetor",
					"title": "Kode Cara Setor",
					"width": "100px",
				},
				
				{
					"field": "statusenabled",
					"title": "Status Enabled",
					"width": "80px",
				},
				{
					"title": "Action",
					"width": "120px",
					"template": "<button class='btnEdit' ng-click='enableData()'>Enable</button>" +
						"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
				}
			];
			$scope.mainGridOptions = {
				pageable: true,
				columns: $scope.columnProduk,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
			$scope.save=function(){
				var id =""
				if ($scope.item.inputID != undefined)
					id = $scope.item.inputID 

				var kdcarasetor =""
				if ($scope.item.inputKodeCaraSetor != undefined)
					kdcarasetor = $scope.item.inputKodeCaraSetor 

				
				if ($scope.item.inputCaraSetor == undefined ||$scope.item.inputCaraSetor==""){
				
					toastr.error('Cara Seror harus diisi')
					return
				}

				var objSave={
					"id":id,
					"kdcarasetor":kdcarasetor,
					"carasetor":$scope.item.inputCaraSetor,
				}

				ManageServicePhp.saveCaraSetor(objSave).then(function(e){
					LoadData()
				})
			}

			$scope.hapus=function(){
				if($scope.dataSelected.id==undefined){
					toastr.error('Pilih data dulu')
					return
				}

				var delte={
					"id":$scope.dataSelected.id,
					
				}
				ManageServicePhp.deleteCaraSetor(delte).then(function(e){
					LoadData()
				})	
			}


			/*---------------*/
		}
	]);
});
