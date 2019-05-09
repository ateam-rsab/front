define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterKelompokJabatanCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManagePegawai', 'FindPegawai',
		function($q, $rootScope, $scope, ModelItem, ManagePegawai, FindPegawai) {
			$scope.title = "Master Kelompok Jabatan";
			$scope.opsiGrid = {
				toolbar: [{name: "create", text: "Tambah"}],
				pageable: true,
				selectable: "row",
                detailInit: detailInit,
				columns: [
					{field: "id", hidden: "true"},
					{field: "rowNumber", title: "#", width: 40},
					{field: "namaKelompokJabatan", title: "Kelompok Jabatan"},
					{command: [{name: "destroy", text: "Hapus"},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
				],
				editable: { mode: "popup", window: { title: "Master Kelompok Jabatan" }, template: kendo.template($("#popup-editor").html())},
				dataBound: function(e) {
					this.expandRow(this.tbody.find("tr.k-master-row").first());
					e.sender._data.forEach(function(elemen, index){
						elemen.rowNumber = ++index;
					})
				},
				save: function(e){
					$scope.Save(e.model);
				}
			};
			function init(){
				$scope.isRouteLoading = true;
				$q.all([
					FindPegawai.getListData("sdm/get-detail-kelompok-jabatan"),
					FindPegawai.getListData("sdm/get-all-kelompok-jabatan")
				]).then(function(res){
					if(res[0].statResponse){
						$scope.dataGridDetail = res[0].data.data;
					}
					if(res[1].statResponse){
						var result = $scope.listKelompokJabatan = res[1].data.data;
						result.forEach(function(item, index){
							item.rowNumber = ++index;
						})
						$scope.dataGrid = new kendo.data.DataSource({
							data: result,
							schema: {
								model: {
									id: "id",
									fields: {
										id: {editable: false},
										rowNumber: { editable: false},
										namaKelompokJabatan: {editable: true, validation: { 
											validasiKomponen: function (input) {
											if (input.is("[name='kelompokJabatan']") && input.val() === "") {                        
												return false;
											}
											return true;
											}
										}},
									}
								}
							},
							pageSize: 20,
							change: function(e){
								if(e.action === "itemchange"){
									if(e.items[0].id){
										e.items.state = "edit"
									} else {
										e.items.state = "add"
									}
								} else if (e.action === "remove"){
									var item = e.items[0];
									if(item.namaKelompokJabatan !== ""){
										item.action = e.action;
										$scope.Save(item);
									} else {
										$scope.dataGrid.sync(); // call sync function to auto update row number w/o click on grid
									}
								}
							}
						});
					}
					$scope.isRouteLoading = false;
				}, function(error){
					$scope.isRouteLoading = false;
					throw error;
				})
			}
			init();
			$scope.Save = function(data){
				var item = {
					"id": data.id,
					"statusEnabled": true,
					"kodeKelompok": "001",
					"namaExternal": data.namaKelompokJabatan,
					"namaKelompokJabatan": data.namaKelompokJabatan,
					"reportDisplay": data.namaKelompokJabatan,
				}
				if(data.action && data.action === "remove"){
					item.statusEnabled = false;
				}
				ManagePegawai.saveMasterData("sdm/save-master-kelompok-jabatan", item).then(function(res){
					// debugger;
				}, (error) => {
					throw error;
				})
			}
			function detailInit(e) {
				$('<div class="childGrid"></div>').appendTo(e.detailCell).kendoGrid({
					toolbar: [{name: "create", text: "Tambah"}],
					dataSource: {
						data: $scope.dataGridDetail,
						schema: {
                            model: {
                                id: "id",
                                fields: {
									id: {editable: false},
									kelompokJabatanId: { validation: { required: true }},
									nilaiTertinggi: {type: "number", validation: { required: true, min: 1 }},
									nilaiTerendah: {type: "number", validation: { required: true,min: 1 }},
									grade: {type: "string", validation: { required: true }},
									detailKelompokJabatan: {type: "string", validation: { required: true }}
                                }
                            }
						},
						pageSize: 5,
						filter: {
							field: "kelompokJabatanId",
							operator: "eq",
							value: e.data.id
						},
                        change: function (e) {
							if(!e.action){
								// set row number on detail grid
								e.items.forEach(function(lis, index){
									lis.rowNumber = ++index;
								})
							} else if (e.action === "remove"){
								var item = e.items[0];
								if(item.kelompokJabatanId !== "" && item.detailKelompokJabatan !== ""){
									item.action = e.action;
									$scope.SaveDetail(item);
								} else {
									$scope.dataGrid.sync(); // call sync function to auto update row number w/o click on grid
								}
							}
                        }
					},
					scrollable: false,
					sortable: true,
					pageable: true,
					columns: [
						{ field: "rowNumber", title: "#", width: 40, hideMe: true },
						{ field: "kelompokJabatanId", title: "Kelompok Jabatan", hidden: true, editor: categoryDropDownEditor},
						{ field: "id", title: "idDetilKelJbtn", hidden: true, hideMe: true },
						{ field: "detailKelompokJabatan", title: "Nama Kelompok Jabatan"},
						{ field: "grade", title: "Grade", width: 60, attributes: { style: "text-align: right"} },
						{ title: "Nilai", columns: [
							{ field: "nilaiTerendah", title: "Terendah", width: 120, attributes: { style: "text-align: right"}, format: "{0:n0}"},
							{ field: "nilaiTertinggi", title: "Tertinggi", width: 120, attributes: { style: "text-align: right"}, format: "{0:n0}" }
						]},
						{command: [{name: "destroy", text: "Hapus"},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
					],
					editable: "popup",
					save: function(e){
						$scope.SaveDetail(e.model);
					},
					edit: function(e){
						e.sender.columns.forEach(function (element, index /*, array */) {
							if (element.hideMe) {
								e.container.find(".k-edit-label:eq(" + index + "), "
									+ ".k-edit-field:eq( " + index + ")"
								).hide();
							}
						});
					}
				});
			}
			$scope.SaveDetail = function(data){
				var item = {
					"id": data.id,
					"detailKelompokJabatan": data.detailKelompokJabatan,
					"statusEnabled": data.action === "remove" ? false : true,
					"namaExternal": data.detailKelompokJabatan,
					"grade": data.grade,
					"nilaiTerendah": data.nilaiTerendah.toString(),
					"reportDisplay": data.detailKelompokJabatan,
					"nilaiTertinggi": data.nilaiTertinggi.toString(),
					"kelompokJabatan": {
						"id":data.kelompokJabatanId
					},
					"kodeExternal": "001"
				}
				console.log(JSON.stringify(item));
				ManagePegawai.saveMasterData("sdm/save-kelompok-jabatan", item).then(function(res){
					// debugger;
					init();
				}, (error) => {
					throw error;
				})
			}
			function categoryDropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "namaKelompokJabatan",
                        dataValueField: "id",
                        dataSource: $scope.listKelompokJabatan
                    });
            }
		}
	]);
});