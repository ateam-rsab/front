define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarBahanB3DiRuanganCtrl', ['$q', '$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'JadwalRencanaPemeriksaanService', '$document', 'R',
		function ($q, $rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras, JadwalRencanaPemeriksaanService, $document, r) {
			// event to initialize if the kendo grid is already rendered
			$scope.$on("kendoWidgetCreated", function(event, widget) {
				if (widget.options.name === "Grid") {
					// initialize dataSource
					setDataSource();
				}
			});
			$scope.jenisLimbah = [
				{name: "Medis", value:"medis"},
				{name: "Non Medis", value:"nonMedis"}
			];
			$scope.listSatuanWaktu = [
				{"satuanWaktu": "Hari","value": "Hari"},
				{"satuanWaktu": "Minggu","value": "Minggu"},
				{"satuanWaktu": "Bulan","value": "Bulan"},
				{"satuanWaktu": "Tahun","value": "Tahun"}
			];
			$scope.gridOptions = {
                toolbar: [{name: "create", text: "Tambah"}],
				pageable: true,
				editable: {
					mode: "popup",
					window: {title: "Bahan B3 di Ruangan"}
				},
				selectable: "row", 
				// autoBind: false,
				columns: [
					{field: "noRec", hidden: "true", hideMe: true},
					{field: "rowNumber", title: "#", width: 40, hideMe: true},
					{field: "namaRuangan",title: "Ruangan",width: "150px", hideMe: true},
					{field: "ruanganId", title: "Ruangan", hidden: true, editor: ruanganDropDownEditor},
					{field: "kategoriLimbah", title: "Kategori Limbah", hidden: true, editor: categoryDropDownEditor},
					{field: "jenisLimbahB3masuk",title: "Jenis Limbah",width: "150px", hideMe: true},
					{field: "idJenisBahan", title: "Jenis Limbah", hidden: true, editor: jenislimbahDropDownEditor},
					// {field: "wadahKemasan",title: "<center>Wadah</center>",width: "150px"},
					{field: "jumlah",title: "Jumlah",width: "150px"},
					{title: "Pemakaian",width: "150px", columns:[
						{field:"banyakPemakaian", title:"Qty"},
						{field:"lamaPemakaian", title:"Durasi"},
						{field:"satuanPemakaian", title:"Satuan", editor: satuanpakaiDropDownEditor}
					]},
					{field: "karakteristik",title: "Karakteristik",width: "150px"},
					{field: "tempatPenyimpanan",title: "Tempat Penyimpanan",width: "150px"},
					{command: [{text: "Hapus", click:hapus},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
				],
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
					$scope.Save(e.model);
				}
			};
			$scope.dataVOloaded = true;
			$scope.isRouteLoading = true;
			function initPage() {
				$scope.item = {};
				$scope.now = new Date();
			};
			$q.all([
				ManageSarpras.getOrderList("b3-Ruangan-Input-Data/get-ruangan"),
				ManageSarpras.getOrderList("b3-Ruangan-Input-Data/get-login-petugas")
			]).then(function(res){
				$scope.listRuangan = res[0].data.data.unitRuangan;
				$scope.petugas = res[1].data.data;
				$scope.isRouteLoading = false;
			}, (err) => {
				$scope.isRouteLoading = false;
				throw err;
			});
			$scope.cari = function(){
				var listRawRequired = [
					"item.ruangan|k-ng-model|Ruangan"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					$scope.isRouteLoading = true;
					ManageSarpras.getOrderList("b3-Ruangan-Input-Data/get-bahan-b3?ruanganId=" + $scope.item.ruangan.ruanganId).then(function(res){
						// var grid = $("#gridB3ruangan").data("kendoGrid");
						var data = res.data.data.b3RuanganInputData ? res.data.data.b3RuanganInputData : [];
						setDataSource(data);
						// var ds = new kendo.data.DataSource({
						// 	data: res.data.data.b3RuanganInputData ? res.data.data.b3RuanganInputData : [],
						// 	pageSize: 12,
						// 	schema: {
						// 		model: {
                        //             id: "noRec",
                        //             fields: {
						// 				noRec: { editable: false },
						// 				produkId: { editable: true, nullable: false, validation: { required: true } },
						// 				ruanganId: { editable: true, nullable: false, validation: { required: true } },
						// 				wadahKemasan: { editable: true, nullable: false, validation: { required: true } },
						// 				jumlah: { editable: true, nullable: false, type: "number", validation: { required: true } },
						// 				banyakPemakaian: {  editable: true, nullable: false, type: "number", validation: { required: true } },
						// 				lamaPemakaian: {  editable: true, nullable: false, type: "number", validation: { required: true } },
						// 				satuanPemakaian: {  editable: true, nullable: false, type: "number", validation: { required: true } },
						// 				karakteristik: { editable: true, nullable: false, validation: { required: true } },
						// 				tempatPenyimpanan: { editable: true, nullable: false, validation: { required: true } },
						// 			}
						// 		}
						// 	},
						// 	change: function(e){
						// 		debugger;
						// 	}
						// });
						// grid.setDataSource(ds);
						// grid.dataSource.fetch();
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			}
			$scope.Save = function(data){
				var dataSend = {
					"petugas": {
						"id": $scope.petugas.idPegawai
					},
					"ruangan": {
						"id": data.ruanganId
					},
					"b3DaftarBahanBerbahaya": [
						{
							"banyakPemakaian" :data.banyakPemakaian,
							"satuanPemakaian" :data.satuanPemakaian,
							"jumlah" : data.jumlah,
							"karakteristik" : data.karakteristik,
							"tempatPenyimpanan" : data.tempatPenyimpanan,
							"jenisLimbahB3MasukId" :data.idJenisBahan,
							"lamaPemakaian" : data.lamaPemakaian
						}
					]
				};
				// console.log(JSON.stringify(dataSend));
				ManageSarpras.saveDataSarPras(dataSend, "b3-Ruangan-Input-Data/save-bahan-b3").then(function (e) {
					// console.log(JSON.stringify(e.data));
					// $scope.selectedRuangan();
				});
			};
			function hapus(e){
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				var grid = $("#gridB3ruangan").data("kendoGrid");
				if(dataItem && dataItem.noRec){
					grid.dataSource.remove(dataItem);
					// grid.removeRow(dataItem);
					ManageSarpras.getOrderList("b3-Ruangan-Input-Data/delete-bahan-b3?noRec=" + dataItem.noRec).then(function (dat) {
						// $scope.selectedRuangan();
					});
				}
			};
			function categoryDropDownEditor(container, options) {
                $('<input required name="' + options.field + '" data-filter="contains" style="width:100%"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "name",
                        dataValueField: "value",
						dataSource: $scope.jenisLimbah,
						change: function(e){
							// var value = this.value();
							var ds, value;
							value = this.value();
							ManageSarpras.getOrderList("jenis-limbah-b3-masuk/get-jenis-limbah-b3-masuk?kategori="+value).then(function(dat){
								ds = new kendo.data.DataSource({
									data: dat.data.data.jenisLimbahB3Masuk
								});
								var dropdownlist = $("#daftarLimbah").data("kendoDropDownList");
								dropdownlist.setDataSource(ds);
							});
							// var dropdownlist = $("#daftarLimbah").data("kendoDropDownList");
							// dropdownlist.setDataSource()
							debugger;
						}
                    });
			};
			function jenislimbahDropDownEditor(container, options) {
                $('<input id="daftarLimbah" required name="' + options.field + '" data-filter="contains" style="width:100%"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "jenisLimbahB3masuk",
                        dataValueField: "id",
						dataSource: $scope.daftarLimbah,
						change: function(e) {
							var value = this.value();
							// Use the value of the widget
						}
                    });
			};
			function satuanpakaiDropDownEditor(container, options){
				$('<input required name="' + options.field + '" data-filter="contains" style="width:100%"/>')
				.appendTo(container)
				.kendoDropDownList({
					dataTextField: "satuanWaktu",
					dataValueField: "value",
					dataSource: $scope.listSatuanWaktu
				});
			};
			function ruanganDropDownEditor(container, options){
				$('<input required name="' + options.field + '" data-filter="contains" style="width:100%"/>')
				.appendTo(container)
				.kendoDropDownList({
					dataTextField: "namaRuangan",
					dataValueField: "ruanganId",
					dataSource: $scope.listRuangan
				});
			};
			function setDataSource(data){
				var grid = $("#gridB3ruangan").data("kendoGrid");
				var ds = new kendo.data.DataSource({
					data: data ? data : [],
					pageSize: 12,
					schema: {
						model: {
							id: "noRec",
							fields: {
								noRec: { editable: false },
								idJenisBahan: { editable: true, nullable: false, validation: { required: true } },
								// jenisLimbahB3masuk: { editable: true, nullable: false, validation: { required: true } },
								ruanganId: { editable: true, nullable: false, validation: { required: true } },
								kategoriLimbah: { editable: true, nullable: false, validation: { required: true } },
								// namaRuangan: { editable: true, nullable: false, validation: { required: true } },
								// wadahKemasan: { editable: true, nullable: false, validation: { required: true } },
								jumlah: { editable: true, nullable: false, type: "number", validation: { required: true } },
								banyakPemakaian: {  editable: true, nullable: false, type: "number", validation: { required: true } },
								lamaPemakaian: {  editable: true, nullable: false, type: "number", validation: { required: true } },
								satuanPemakaian: {  editable: true, nullable: false, validation: { required: true } },
								karakteristik: { editable: true, nullable: false, validation: { required: true } },
								tempatPenyimpanan: { editable: true, nullable: false, validation: { required: true } },
							}
						}
					},
					change: function(e){
						if(e.action == "itemchange"){
							if(e.field == "ruanganId"){
								var selectedRuangan = _.find($scope.listRuangan, function(items){
									return items.ruanganId == e.items[0].ruanganId;
								});
								e.items[0].namaRuangan = selectedRuangan.namaRuangan;
							}
							if (e.field == "idJenisBahan"){
								var selectedLimbah = _.find($scope.daftarLimbah, function(items){
									return items.id == e.items[0].idJenisBahan;
								});
								e.items[0].jenisLimbahB3masuk = selectedLimbah.jenisLimbahB3masuk;
							}
							if(e.field == "kategoriLimbah"){
								var selectedCategory = _.find($scope.jenisLimbah, function(items){
									return items = e.items[0].kategoriLimbah;
								});
								ManageSarpras.getOrderList("jenis-limbah-b3-masuk/get-jenis-limbah-b3-masuk?kategori="+e.items[0].kategoriLimbah).then(function(dat){
									$scope.daftarLimbah = dat.data.data.jenisLimbahB3Masuk;
									$scope.isRouteLoading =  false;
								});
							}
						}
						// debugger;
					}
				});
				grid.setDataSource(ds);
				grid.dataSource.fetch();
			}
			initPage();
		}
	]);
});