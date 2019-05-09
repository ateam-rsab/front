define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterJenisLimbahB3MasukCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'MasterJenisLimbahService', 'ManageSarpras', '$mdDialog',
		function ($q, $rootScope, $scope, ModelItem, MasterJenisLimbahService, ManageSarpras, $mdDialog) {
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
                $scope.item = {};
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
                    "statusEnabled" : data.statusEnabled == undefined ? true : data.statusEnabled
				};
				if(data.id) dataSend.id = data.id;
                ManageSarpras.saveDataSarPras(dataSend, "jenis-limbah-b3-masuk/save-jenis-limbah-b3-masuk/").then(function(e){
                    init();
                });
            }
            function hapusData(e){
                e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				dataItem.statusEnabled = false;
				showAlertDialog(dataItem);
			}
			function showAlertDialog(data){
				var confirm = $mdDialog.confirm()
					.title('Peringatan!')
					.ariaLabel('Lucky day')
					.textContent('Yakin Menghapus Data Master '+data.jenisLimbahB3masuk+" ?")
					.ok('Ya')
					.cancel('Tidak')
				
				$mdDialog.show(confirm).then(function() {
					$scope.Save(data)
				});
			}
		}
	]);
});