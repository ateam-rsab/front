define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JurnalRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'NamaAsuransi', 'ManageSdm', '$timeout', 'ManageServicePhp',
		function($q, $rootScope, $scope, ModelItem, $state, NamaAsuransi, ManageSdm, $timeout, manageServicePhp) {
			$scope.isRouteLoading = true;
			$scope.yearSelected = {
				start: "year", 
				depth: "year",
				format: "yyyy"
			};
			$scope.tdate = new Date ();
			$scope.optGrid = {
				toolbar: [{
					name: "create", text: "Input Baru",
				
				}],
				pageable: true,
				scrollable: true,
				columns: [
				
				{ field: "juduljurnal", title: "Judul Jurnal" },
				{ field: "namapenulis", title: "Nama Penulis "} ,
				{ field: "volume", title: "Volume" ,width: 80,format: "{0:n0}", attributes: { style: "text-align:right; padding-right: 15px;"}},
				{ field: "jumlahhalaman", title: "Jumlah Halaman",format: "{0:n0}", width: 120, attributes: { style: "text-align:right; padding-right: 15px;"}},
				{ field: "tahunterbit", title: "Tahun",  editor: dateTimeEditor, format: "{0:yyyy}", width: 100, attributes: { style: "text-align:right; padding-right: 15px;"}},
				{command: [{name: "destroy", text: "Hapus"},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
				],
				editable: "popup",
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
			init();

			function init(){
				$scope.item = {}; // set defined object
				var jurnal =""
				if ($scope.item.jurnal!= undefined){
					jurnal ="&judulJurnal=" +$scope.item.jurnal
				}
				var namaPengarang =""
				if ($scope.item.namapenulis != undefined){
					namaPengarang ="&namapenulis=" +$scope.item.namapenulis
				}
				
				
				manageServicePhp.getDataTableTransaksi("perpustakaan/get-bibliography-jurnal?"
					+jurnal
					+namaPengarang

					).then(function(res){
					// if(res[0].statResponse){
						$scope.dataSourceGrid = new kendo.data.DataSource({ 
							data: res.data.data,

							pageSize: 20,
							schema: {
								model: {
									// norec: "norec",
									fields: {
										norec: {editable: false},
										juduljurnal: {editable: true, validation: { 
											validasiNamaJabatan: function (input) {
												if (input.is("[name='juduljurnal']") && input.val() === "") {                        
													return false;
												}
												return true;
											}
										}},
										volume: {type: "number", validation: { required: true, min: 1 }},
										jumlahhalaman: {type: "number", validation: { required: true, min: 1 }},
										namapenulis: {editable: true, validation: { 
											validasiJenisJabatan: function (input) {
												if (input.is("[name='namapenulis']") && input.val() === "") {                        
													return false;
												}
												return true;
											}
										}}
									}
								}
							},
							change: function (e) {

								if(e.field == "norec" && e.action == "itemchange"){
                            		e.items[0].norec = e.items[0].norec ;//? e.items[0].jenisJabatanId.id : e.items[0].jenisJabatanId;
                            	} 
                            	if (e.action === "remove"){
                            		var item = e.items[0];
                            		if(item.namapenulis !== "" && item.juduljurnal !== ""){
                            			item.action = e.action;
                            			$scope.Save(item);

                            		} else {
										$scope.dataSourceGrid.sync(); // call sync function to auto update row number w/o click on grid
									}
								}
							}
						});
					// }
					// if(res[1].statResponse){
					// 	$scope.listJenisJabatan = res[1].data;
					// }
					$scope.isRouteLoading = false;
				}, (error) => {
					$scope.isRouteLoading = false;
					throw error;
				})


				};
				$scope.Disabling= function(data){ 
					var item = {
						"norec_bj": data.norec,
					}
					manageServicePhp.saveDataTransaksi("perpustakaan/delete-bibliography-jurnal",item).then(function (e) {

					});  
				};

				$scope.Save = function(data) {
					var item = {
						"norec_bj": data.norec !== "" ?  data.norec : "",
						"namapenulis": data.namapenulis,
						"juduljurnal": data.juduljurnal,
						"statusEnabled": data.action ? false : true,
						"volume": data.volume,
						"tahunterbit": moment (data.tahunterbit).format('YYYY'),
						"jumlahhalaman": parseInt(data.jumlahhalaman),

					}
					if(data.action && data.action === "remove") {
						manageServicePhp.saveDataTransaksi("perpustakaan/delete-bibliography-jurnal",item).then(function (e) {

						}); 
					}else{

						manageServicePhp.saveDataTransaksi("perpustakaan/save-bibliography-jurnal",item).then(function (e) {

						});
					}

				};
				function dateTimeEditor(container, options) {
					$('<input data-text-field="' + options.field + 
						'" data-value-field="' + options.field +
						// '" data-bind="value:' + options.field +
						'" data-format="' + options.format + '"/>')
					.appendTo(container)
					.kendoDateTimePicker({
						start: "year",
						depth: "year",
						format: "yyyy",
						value: new Date(),
						dateInput: true

					});
				}
				var timeoutPromise;
				$scope.$watch('item.jurnal', function(newVal, oldVal){
					if(newVal  && newVal !== oldVal){
						applyFilter("juduljurnal", newVal)
					}
				})
				$scope.$watch('item.namapenulis', function(newVal, oldVal){
					$timeout.cancel(timeoutPromise);
					timeoutPromise = $timeout(function(){
						if(newVal && newVal !== oldVal){
							applyFilter("namapenulis", newVal)
						}
					}, 500)
				})
				function applyFilter(filterField, filterValue){
					var dataGrid = $("#grids").data("kendoGrid");
					var currFilterObject = dataGrid.dataSource.filter();
					var currentFilters = currFilterObject ? currFilterObject.filters : [];

					if (currentFilters && currentFilters.length > 0){
						for(var i = 0; i < currentFilters.length; i++){
							if(currentFilters[i].field == filterField){
								currentFilters.splice(i, 1);
								break;
							}
						}
					}

					if(filterValue.id){
						currentFilters.push({
							field: filterField,
							operator: "eq",
							value: filterValue.id
						});
					} else {
						currentFilters.push({
							field: filterField,
							operator: "contains",
							value: filterValue
						})
					}

					dataGrid.dataSource.filter({
						logic: "and",
						filters: currentFilters
					})
				}
				$scope.resetFilter = function(){
					var dataGrid = $("#grids").data("kendoGrid");
					dataGrid.dataSource.filter({});
					$scope.item = {};
				}
			}
			]);
});