define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('ProperLingkunganCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'JadwalRencanaPemeriksaanService', '$document', 'R',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras, JadwalRencanaPemeriksaanService, $document, r) {
			$scope.now = new Date();
			ModelItem.get("K3/JadwalRencanaPemeriksaan").then(function (data) {
				$scope.item = data;
				$scope.item.satuanKerja = "";
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });


			ManageSarpras.getOrderList("b3-Ruangan-Input-Data/get-ruangan").then(function (dat) {
				// debugger;
				$scope.listRuangan = dat.data.data.unitRuangan;

			})

			ManageSarpras.getOrderList("b3-Ruangan-Input-Data/get-stok-global").then(function (dat) {
				// debugger;
				$scope.listB3 = dat.data.data.stokGlobal;


			})

			ManageSarpras.getOrderList("b3-Ruangan-Input-Data/get-login-petugas").then(function (dat) {
				// debugger;
				$scope.petugas = dat.data.data;
			})



		


			$scope.listProper = new kendo.data.DataSource({
				data: [

				],
				schema: {
					model: {
						id: "id",
						fields: {
							kriteriaProper: { editable: true, nullable: false, validation: { required: true } },
							aspekPenilaian: { editable: true, nullable: false, validation: { required: true } },
							elemenPenilaian: { editable: true, nullable: false, validation: { required: true } },
							Keterangan: { editable: true, nullable: false, validation: { required: true } },

						}
					}
				},
				editable: false
			});

			$scope.columnProper = [
				{
					"field": "kriteriaProper",
					"title": "<center>Kriteria Proper</center>",
					"width": "150px"
				},
				{
					"field": "aspekPenilaian",
					"title": "<center>Aspek Penilaian</center>",
					"width": "150px"
				},
				{
					"field": "elemenPenilaian",
					"title": "<center>Elemen Penilaian</center>",
					"width": "150px"
				},
				{
					"title": "<center>Ya</center>",
					"template": "<div class='center'><input type=\"radio\" ng-model='val' value=2 ng-click='klik(dataItem,val)'></div>",
					"width": "150px"
				},
				{
					"title": "<center>tidak</center>",
					"template": "<div class='center'><input type=\"radio\" ng-model='val' value=1 ng-click='klik(dataItem,val)'></div>",
					"width": "150px"
				},
				{
					"field": "Keterangan",
					"title": "<center>Keterangan</center>",
					"width": "150px"
				}
			];

			$scope.optionsProper = {
				dataSource: $scope.listProper,
				pageable: false,
				editable: {
					mode: "inline",
					// template: kendo.template($("#popup-editor").html())
				},
				columns: $scope.columnB3
			};


			$scope.tambah = function () {
				


			}

			$scope.hapus = function(selectedData){
				debugger;
				ManageSarpras.getOrderList("" + selectedData.noRec).then(function (dat) {
					
				})
			}
		}
	]);
});