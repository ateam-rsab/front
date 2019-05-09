define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KategoryPegawaiSdmCtrl', ['$q', '$rootScope', '$scope', 'FindPegawai', 'ManagePegawai', 'ModelItem',
		function($q, $rootScope, $scope, FindPegawai, ManagePegawai, ModelItem) {
			$scope.title = "Master Status Pegawai";
			$scope.opsiGrid = {
				toolbar: [{name: "create", text: "Tambah"}],
				pageable: true,
				selectable: "row",
				columns: [
					{field: "id", hidden: "true", hideMe: true},
					{field: "rowNumber", title: "#", width: 40, hideMe: true},
					{field: "kategoryPegawai", title: "Kategori Pegawai"},
					{command: [{name: "destroy", text: "Hapus"},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
				],
				// editable: { mode: "popup", window: { title: "Golongan Pegawai" }, template: kendo.template($("#popup-editor").html())},
				editable: "popup",
				dataBound: function(e) {
					e.sender._data.forEach(function(elemen, index){
						elemen.rowNumber = ++index;
					})
				},
				edit: function(e){
					e.sender.columns.forEach(function (element, index /*, array */) {
						if (element.hideMe) {
							e.container.find(".k-edit-label:eq(" + index + "), "
								+ ".k-edit-field:eq( " + index + ")"
							).hide();
						}
					});
				},
				save: function(e){
					if(e.model.id){
						$scope.edit(e.model);
					} else {
						$scope.Save(e.model);
					}
				}
			};
			function init(){
				$scope.isRouteLoading = true;
				FindPegawai.getListData("service/list-generic/?view=KategoryPegawai&select=*&criteria=statusEnabled&values=true").then(function(dat){
					var result = dat.data;
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
									noRec: {editable: false},
									rowNumber: {editable: false},
									kdKategoryPegawai: {editable: true},
									qKategoryPegawai: {editable: true},
									kategoryPegawai: {editable: true, validation: { 
										validasiKomponen: function (input) {
										if (input.is("[name='kategori']") && input.val() === "") {                        
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
								if(item.kategoryPegawai !== "" && item.id !== ""){
									item.action = e.action;
									$scope.edit(item);
								} else {
									$scope.dataGrid.sync(); // call sync function to auto update row number w/o click on grid
								}
							}
						}
	            	});
					$scope.isRouteLoading = false;
				}, (error) => {
					$scope.isRouteLoading = false;
					throw error;
				});
			}
			init();
			$scope.Save = function(data){
				var item = {
					"class": "KategoryPegawai",
					"listField": {
						"id": data.id,
						"statusEnabled": data.action === "remove" ? false : true,
						"kategoryPegawai": data.kategoryPegawai,
						"kdKategoryPegawai": data.kdKategoryPegawai === "" ? "-" : data.kdKategoryPegawai,
						"qKategoryPegawai": data.qKategoryPegawai === "" ? 0 : data.qKategoryPegawai,
						"reportDisplay": data.kategoryPegawai,
						"kodeExternal": "-",
						"namaExternal": data.kategoryPegawai
					}
				}
				if (data.id === "") delete item.listField.id;
				ManagePegawai.saveGenerateDataMaster(item,"save-master-table").then(function(e) {
					// debugger;
					init();
				}, (error) => {
					throw error;
				});
			}
		    $scope.edit = function(items){	
		        var data = {
					"class": "KategoryPegawai",
					"listField": {
							"id": items.id,
							"kategoryPegawai": items.kategoryPegawai,
					 		"kdKategoryPegawai": items.kdKategoryPegawai,
					 		"qKategoryPegawai": items.qKategoryPegawai,
					 		"reportDisplay": items.reportDisplay,
					 		"kodeExternal": items.kodeExternal,
					 		"namaExternal": items.namaExternal,
					 		"statusEnabled": items.action === "remove" ? false : items.statusEnabled,
					 		"noRec": items.noRec
					}
				}
		        ManagePegawai.saveGenerateDataMaster(data,"update-master-table").then(function(e) {
					// console.log(JSON.stringify(e.data));
					init();
		        });
		    }


			// old controller below
			$scope.columnKategoryPegawai = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kategoryPegawai",
				"title": "kategory Pegawai"
			},
			{
				"field": "kdKategoryPegawai",
				"title": "kd Kategory Pegawai"
			},
			{
				"field": "qKategoryPegawai",
				"title": "q Kategory Pegawai"
			},
			{
				"field": "reportDisplay",
				"title": "report Display"
			},
			{
				"field": "kodeExternal",
				"title": "kode External"
			},
			{
				"field": "namaExternal",
				"title": "nama External"
			},
			{
				"field": "statusEnabled",
				"title": "status Enabled"
			},
			{
				"title" : "Action",
    			"width" : "200px",
    			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];

			$scope.mainGridOptions = { 
                pageable: true,
                columns: $scope.columnKategoryPegawai,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klik = function(current){
            	$scope.showEdit = true;
				$scope.current = current;
				// debugger;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.statusEnabled = current.statusEnabled;
				$scope.item.kategoryPegawai = current.kategoryPegawai;
				$scope.item.kdKategoryPegawai = current.kdKategoryPegawai;
				$scope.item.qKategoryPegawai = current.qKategoryPegawai;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				FindPegawai.getClassMaster("delete-master-table?className=KategoryPegawai&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				FindPegawai.getClassMaster("delete-master-table?className=KategoryPegawai&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function(){
				var listRawRequired = [
					"item.kategoryPegawai|ng-model|Kategori",
					"item.kdKategoryPegawai|ng-model|Kode Kategori",
					"item.qKategoryPegawai|ng-model|Key Kategori"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					var data = {
						"class": "KategoryPegawai",
						"listField": {
								"kategoryPegawai": $scope.item.kategoryPegawai,
								"kdKategoryPegawai": $scope.item.kdKategoryPegawai,
								"qKategoryPegawai": $scope.item.qKategoryPegawai,
								"reportDisplay": $scope.item.reportDisplay,
								"kodeExternal": $scope.item.kodeExternal,
								"namaExternal": $scope.item.namaExternal
						}
					}
					ManagePegawai.saveGenerateDataMaster(data,"save-master-table").then(function(e) {
						console.log(JSON.stringify(e.data));
						init();
						$scope.item = {};
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
		    }

		    $scope.batal = function () {
		    	$scope.showEdit = false;
		    	$scope.item = {};
		    }

		}
		]);
});