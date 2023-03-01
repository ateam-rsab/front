define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengaturanDataPenghasilanCtrl', ['$rootScope', '$scope', 'ModelItem','$state',
		function($rootScope, $scope, ModelItem,$state) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.tanggal = $scope.now;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.no=1;
			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})
			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: [{}]
			});
			
			 $scope.pindah = function(){
				 
				$state.go("RekamDataPegawai");
				 
			 }
			 
			 
			  $scope.pindah1 = function(){
				 
				$state.go("DataKeluarga");
				 
			 }
			
			
			$scope.daftarJenisBahan = new kendo.data.DataSource({
			data: [
					{ 
						"kodeJenis":"BHN001",
						"JenisBahan":"Aldet"
					},
					{ 
						"kodeJenis":"BHN002",
						"JenisBahan":"Laudet"
					},
					{ 
						"kodeJenis":"BHN003",
						"JenisBahan":"MC. Bleach"
					},
					{ 
						"kodeJenis":"BHN004",
						"JenisBahan":"OXO. Bleach"
					},
					{ 
						"kodeJenis":"BHN005",
						"JenisBahan":"E. 951"
					},
					{ 
						"kodeJenis":"BHN006",
						"JenisBahan":"M. Saur"
					},
					{ 
						"kodeJenis":"BHN007",
						"JenisBahan":"M. Soft"
					}

				]
			});
			
			
			// $scope.daftarBahanLinen = new kendo.data.DataSource({
			// 	data: []
			// });
			
			// $scope.columnRincianDataPenghasilan = {
			// 	sortable: false,
			// 	reorderable: true,
			// 	filterable: false,
			// 	pageable: true,
			// 	columnMenu: false,
			// 	resizable: true, 
			// 	selectable: 'row',
			// 	column: [
			// 		{
			// 			"field": "no",
			// 			"title": "Uraian ",
			// 			"width": "40%",
			// 			"template": "<span class='style-center'>#: saldo_akhir #</span>"
			// 		},
			// 		{
			// 			"field": "nama",
			// 			"title": "Rincian",
			// 			"width": "40%",
			// 			"template": "<span class='style-center'>#: saldo_akhir #</span>"
			// 		}
			// 	]
			// }

				// data table
				$scope.dataGrid = new kendo.data.DataSource({
					data: [{}] ,
					sort:[
						{
							field: "nojurnal",
							dir:"asc"
						}
					],
					pageSize: 20,
	
				})
	
			// data table field
			$scope.columnGridExcel = {
				toolbar: [{
					text: "export",
					name: "Tambah",
					template: '<button ng-click="showInputData()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>'
				}],
				// excel: {
				// 	fileName: "Jurnal " + moment($scope.item.tglAwal).format( 'DD/MMM/YYYY'),
				// 	allPages: true,
				// },
				sortable: false,
				reorderable: true,
				filterable: false,
				pageable: true,
				columnMenu: false,
				resizable: true, 
				selectable: 'row',
				columns:[
					{
						"field": "kd_akun",
						"title": "Kode Akun",
						"width" : "40px",
						"template": "<span class='style-center'> 1221 </span>"
					},
					{
						"field": "jumlah",
						"title": "Jumlah",
						"width" : "40px",
						"template": "<span class='style-center'> 125000 </span>"
					},
					{
						"command": [
							{
								"text": "Edit",
								"click": editData,
								"imageClass": "k-icon k-i-pencil"
							}
						],
						"title": "Aksi",
						"width": "10px"
					}
				]
			}

	
			$scope.showInputData = () => {
				alert('clicked!!!')
			}

			function editData(event) {
				event.preventDefault();
				alert('clicked');
			}

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});