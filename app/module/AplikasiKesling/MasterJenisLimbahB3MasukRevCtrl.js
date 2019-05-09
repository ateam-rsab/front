define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterJenisLimbahB3MasukRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'MasterJenisLimbahService', 'ManageSarpras',
		function ($q, $rootScope, $scope, ModelItem, MasterJenisLimbahService, ManageSarpras) {
            $scope.dataVOloaded = true;
            $scope.isRouteLoading = true;
            $scope.kategoriLimbah = [
                {name: "Medis", value: "medis"},
                {name: "Non Medis", value: "nonMedis"}
            ];
			$scope.gridOptions = {
				toolbar: [{
					name: "create", text: "Input Baru"
                }],
				pageable: true,
				scrollable: true,
				columns: [
					{ field: "rowNumber", title: "#", width: 40, width: 40, attributes: { style: "text-align:right; padding-right: 15px;"}, hideMe: true},
					{ field: "kdJenisLimbah", title: "Kode", width: 120, hideMe: true },
					{ field: "jenisLimbahB3masuk", title: "Jenis Limbah" },
					{ field: "kategori", title: "Kategori ", editor: categoryDropDownEditor, "template": "# if (kategori === 'medis') {# #= 'Medis' # #} else if (kategori === 'nonMedis'){# #= 'Non Medis' # #} else {# #= '-' # #}#"},
					// { field: "usiaPensiun", title: "Usia Pensiun", width: 120, attributes: { style: "text-align:right; padding-right: 15px;"}},
					{command: [{text: "Hapus", click: hapusData},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
				],
				editable: {
                    mode: "popup",
                    window: { title: "MAster Jenis Limbah" }
                },
				save: function(e){
					$scope.Save(e.model);
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
            };
            function init(){
                $scope.item = {}; // set defined object
				ManageSarpras.getOrderList("jenis-limbah-b3-masuk/find-all-jenis-limbah-b3-masuk/").then(function(res){
                    var grid, ds;
					if(res.statResponse){
                        grid = $("#gridMasterLimbah").data("kendoGrid");
						ds = new kendo.data.DataSource({ 
							data: res.data.data.jenisLimbahB3Masuk,
							sort: {
								field: "kdJenisLimbah", 
								dir: "asc"
							},
							pageSize: 20,
							schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        id: {editable: false},
                                        jenisLimbahB3masuk: {editable: true, validation: { 
                                            validasiNamaJabatan: function (input) {
                                                if (input.is("[name='jenisLimbahB3masuk']") && input.val() === "") {                        
                                                    return false;
                                                }
                                                return true;
                                            }
                                        }},
                                        kdJenisLimbah: {editable: false},
                                        kategori: {editable: true, validation: { 
                                            validasiJenisJabatan: function (input) {
                                                if (input.is("[name='kategori']") && input.val() === "") {                        
                                                    return false;
                                                }
                                                return true;
                                            }
                                        }}
                                    }
                                }
                            },
							change: function (e) {
								if(!e.action || e.action == "sync"){
									// set row number on detail grid
									e.items.forEach(function(lis, index){
										lis.rowNumber = ++index;
									})
                                } 
                                // else 
								// if(e.field == "jenisJabatanId" && e.action == "itemchange"){
								// 	e.items[0].jenisJabatanId = e.items[0].jenisJabatanId.id ? e.items[0].jenisJabatanId.id : e.items[0].jenisJabatanId;
								// } 
								// if (e.action === "remove"){
								// 	var item = e.items[0];
								// 	if(item.jenisJabatanId !== "" && item.namaJabatan !== ""){
								// 		item.action = e.action;
								// 		$scope.Save(item);
								// 		//$scope.Disabling(e.items[0]);
								// 	} else {
								// 		$scope.daftarJabatan.sync(); // call sync function to auto update row number w/o click on grid
								// 	}
								// }
							}
                        });
                        grid.setDataSource(ds);
                        grid.dataSource.fetch();
					}
					$scope.isRouteLoading = false;
				}, (error) => {
					$scope.isRouteLoading = false;
					throw error;
				});
            };
            init();
			function categoryDropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "name",
                        dataValueField: "value",
                        dataSource: $scope.kategoriLimbah
                    });
            };
            $scope.Save = function(data){
                var dataSend = {
                    "jenisLimbahB3masuk": data.jenisLimbahB3masuk,
                    "kategori" :data.kategori,
                    "statusEnabled" : true
                };
                ManageSarpras.saveDataSarPras(dataSend, "jenis-limbah-b3-masuk/save-jenis-limbah-b3-masuk/").then(function(e){
                    init();
                });
                
                // console.log(data);
                // alert("Data Berhasil di simpan" + JSON.stringify(data));
            }
            function hapusData(e){
                e.preventDefault();
                // var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                // alert("Hapus " + JSON.stringify(dataItem));
                toastr.warning("Fitur belum tersedia", "Maaf,");
            }
		}
	]);
});