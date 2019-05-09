define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterPerlakuanLimbahB3Ctrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'MasterJenisLimbahService', 'ManageSarpras',
		function ($q, $rootScope, $scope, ModelItem, MasterJenisLimbahService, ManageSarpras) {
            $scope.dataVOloaded = true;
            $scope.isRouteLoading = true;
			$scope.gridOptions = {
				toolbar: [{
					name: "create", text: "Input Baru"
                }],
				pageable: true,
				scrollable: true,
				columns: [
					{ field: "rowNumber", title: "#", width: 40, width: 40, attributes: { style: "text-align:right; padding-right: 15px;"}, hideMe: true},
					{ field: "id", title: "Kode", width: 120, hideMe: true, hidden: true },
					{ field: "name", title: "Jenis Perlakuan" },
					{command: [{text: "Hapus", click: hapusData},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
				],
				editable: {
                    mode: "popup",
                    window: { title: "Master Jenis Perlakuan Limbah" }
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
				ManageSarpras.getOrderList("perlakuan/get-all-perlakuan/").then(function(res){
                    var grid, ds;
					if(res.statResponse){
                        grid = $("#gridPerlakuan").data("kendoGrid");
						ds = new kendo.data.DataSource({ 
							data: res.data.data.data,
							sort: {
								field: "name", 
								dir: "asc"
							},
							pageSize: 20,
							schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        id: {editable: false},
                                        name: {editable: true, validation: { 
                                            validasiNamaPerlakuan: function (input) {
                                                if (input.is("[name='name']") && input.val() === "") {                        
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
									// set row number on grid
									e.items.forEach(function(lis, index){
										lis.rowNumber = ++index;
									})
                                }
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
            $scope.Save = function(data){
                var dataSend = {
                    "name": data.name
                };
                ManageSarpras.saveDataSarPras(dataSend, "perlakuan/save-perlakuan/").then(function(e){
                    init();
                });
            }
            function hapusData(e){
                e.preventDefault();
                toastr.warning("Fitur belum tersedia", "Maaf,");
            }
		}
	]);
});