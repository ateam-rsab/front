define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterUraianTugasCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm',
		function ($rootScope, $scope, ModelItem, $state, ManageSdm) {
			$scope.isRouteLoading = false;
			$scope.dirtyItemsinGrid = [];
			$scope.init = function(){
				$scope.isRouteLoading = true;
				ManageSdm.getOrderList("service/list-generic/?view=RincianKegiatan&select=*&criteria=statusEnabled&values=true").then(function(res) {
					$scope.gridUraianTugas = new kendo.data.DataSource({
						data: res.data,
						schema: {
							model: {
								id: "id",
								fields: {
									id: {editable: false},
									uraianTugas: {editable: true, validation: { 
										validasiUraian: function (textarea) {
											if (textarea.is("[name='uraianTugas']") && textarea.val() === "") {                        
												return false;
											}
											return true;
										}
									}},
									satuan: {validation: {required: true,
										validasiSatuan: function (input) {
											if (input.is("[name='satuan']") && input.val() === "") {                        
												return false;
											}
											return true;
										}
									}},
								}
							}
						},
						// change: function(e){
						// },
						// create: function(e){
						// },
						pageSize: 12
					})
					$scope.isRouteLoading = false;
				}, function(error){
					messageContainer.error(error);
					$scope.isRouteLoading = false;
				})
			}
			$scope.init();
			$scope.dataGridUraiantugas = {
				autoSync: false,
				toolbar: [{
					name: "create", text: "Tambah"
				}, {
					text: "Mapping Uraian Tugas",
					template: '<a ng-click="mappingUraian($event)" class="k-button k-button-icontext k-grid-edit" href="\\#">Mapping Uraian Tugas</a>'	
				}, {
					text: "Daftar Mapping Uraian Tugas",
					template: '<a ng-click="daftarMapping($event)" class="k-button k-button-icontext k-grid-edit" href="\\#">Daftar Mapping Uraian Tugas</a>'	
				}],
				editable: { mode: "popup", window: { title: "Master Uraian Tugas", animation: false, width: "29.7%", /* height: "100%" */}, template: kendo.template($("#kendo-popup-editor").html())},
				columns: [
					{
						field: "id",
						title: "id",
						hidden: true
					},
					{
						field: "rincianKegiatan",
						title: "Rincian Kegiatan",
						width: "70%",
						filterable: {
							mode: "cell"
						}
					},
					{
						field: "satuan",
						title: "Satuan",
						width: "10%",
						filterable: false
					},
					{command: [{name: "edit", text: "Edit"},{ text: "Hapus", click: deleteRow }], title: "&nbsp;", width: "11%" }
				],
				pageable: true,
				scrollable: false,
				// sortable: true,
				filterable: {
					extra: false,
					operators: {
						string: {
							//eq: "Equal:",
							startswith: "Dimulai Dengan:",
							contains: "Mengandung:"
						}
					}
				},
				save: function(e){
					$scope.Save(e.model);
				}
			}
			$scope.Save = function(data){
				if(data.rincianKegiatan){
					var datasend = {
						"statusEnabled": true,
						"satuan":data.satuan,
						"rincianKegiatan":data.rincianKegiatan,	
						"id":data.id
					};
					ManageSdm.saveData(datasend, "sdm/save-rincian-kegiatan").then(function(res){
						if(res.status === 201){
							$scope.init();
						}
					}, function(error){
						messageContainer.error(error);
					})
				} else {
					messageContainer.error('Rincian kegiatan tidak boleh kosong')
				}
			}
			$scope.mappingUraian = function(e){
				e.preventDefault();
				$state.go('MappingUraianTugas')
			}
			$scope.daftarMapping = function(e){
				e.preventDefault();
				$state.go('DaftarMappingUraianTugas')
			}
			function deleteRow(e){
				e.preventDefault();

				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				var datasend = {
					"statusEnabled": false,
					"satuan":dataItem.satuan,
					"rincianKegiatan":dataItem.rincianKegiatan,	
					"id":dataItem.id
				};
				ManageSdm.saveData(datasend, "sdm/save-rincian-kegiatan").then(function(res){
					if(res.status === 201){
						$scope.init();
					}
				}, function(error){
					messageContainer.error(error);
				})
			}
		}
	]);
});