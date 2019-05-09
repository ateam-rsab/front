define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PemulasaraanJenazahEksternalCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', '$state', '$window',
		function ($q, $rootScope, $scope, ModelItem, DateHelper, ManageSarpras, $state, $window) {
			function init(){
				$scope.isRouteLoading = true;
				$scope.dataVOloaded = true;
				$scope.item = {
					tglStruk: new Date()
				};
				$scope.isNext = false;
				$scope.isShowDetil = false;
				$scope.gridOptions = {
					toolbar: [{text: "Input Baru", name: "create"}],
					pageable: true,
					editable: {
						mode: "popup",
						window: { title: "Input Produk Layanan", animation: false, width: 480 }
					},
					scrollable: false,
					columns: [
						{ field: "rowNumber", title: "<h3 align=center>#<h3>", hideMe: true, width: 40},
						{ field: "namaBarang", title: "<h3 align=center>Nama Barang<h3>", editor: dropDownProduk},
						// { field: "harga", title: "<h3 align=center>Harga (Rp)<h3>", aggregates: ["sum"], width: 80, format: "{0:n0}", attributes: {style: "text-align:right"}},
						{ field: "harga", title: "<h3 align=center>Harga (Rp)<h3>", editor: priceEditor },
						{ command: [{name: "edit", text: "Edit"}, {name: "destroy", text:"Hapus"}], width: 160}
					],
					dataBound: function(e) {
						e.sender._data.forEach(function(elemen, index){
							elemen.rowNumber = ++index;
						})
					},
					edit(e){
						e.sender.columns.forEach(function (element, index /*, array */) {
							if (element.hideMe) {
								e.container.find(".k-edit-label:eq(" + index + "), "
									+ ".k-edit-field:eq( " + index + ")"
								).hide();
							}
						});
						$('[name="namaBarang"]').on('change', function(){
							var obj = _.find($scope.sourceProduk._data, function (obj) { return obj.namaProduk === $('[name="namaBarang"]').val(); });
							e.model.harga = obj.hargaSatuan;
							e.model.produkId = obj.idProduk;
							var editor = $('[name="harga"]').data('kendoNumericTextBox');
							editor.value(obj.hargaSatuan);
							changeHarga($('[name="harga"]'), obj.hargaSatuan);
						})
					}
				};
				$q.all([])
				ManageSarpras.getOrderList("pemulasaraan-jenazah/find-pelayanan-pemulasaraan-jenazah/").then(function(res){
                    $scope.sourceProduk = new kendo.data.DataSource({
						data: res.data.data
					});
                    getDetil();
                }, (err) => {
                    $scope.isRouteLoading = false;
                    throw err;
				});
			};
			function changeHarga(inputBox,newValue){
				inputBox.val(newValue);        
				inputBox.trigger("change");
			}
			function getDetil(){
				if($state.current.name == "DetilPemulasaraanJenazahEksternal" && $state.params.noRec)
					ManageSarpras.getOrderList("daftar-pemulasaraan-jenazah/get-pemulasaraan-jenazah-external-detail-by-norec/?noRec="+$state.params.noRec).then(function(res){
						var data = [];
						$scope.item = res.data.data[0];
						for(var key in $scope.item){
							if($scope.item.hasOwnProperty(key)){
								if(key.indexOf('tglstruk') == 0){
									$scope.item['tglStruk'] = new Date($scope.item[key]);
								} else if (key.indexOf('produk') == 0){
									var arrProduk = $scope.item[key];
									for (var i = 0; i < arrProduk.length; i++){
										data.push({
											namaBarang: arrProduk[i].namaProduk,
											produkId: arrProduk[i].produkId,
											harga: arrProduk[i].harga,
											noRecDetail: arrProduk[i].noRecDetail
										})
									}
								}
							}
						}
						$scope.isNext = true;
						$scope.isShowDetil = true;
						generateGridDatasource(data);
					});
				else
				generateGridDatasource();
			}
			function generateGridDatasource(req){
				var data = req ? req: []
				var ds = new kendo.data.DataSource({
					data: data,
					schema: {
						model: {
							id: "rowNumber",
							fields: {
								rowNumber: { editable: false },
								namaBarang: { editable: true, nullable: false, validation: { required: true } },
								harga: { type: "number", nullable: false, validation: { min: 0, required: true } },
							}
						}
					},
					pageSize: 5,
					aggregate: [
						{ field: "harga", aggregate: "sum" }
					]
				});
				var grid = $('#gridData').data("kendoGrid");
				grid.setDataSource(ds);
				grid.dataSource.read();
				$scope.isRouteLoading = false;
			};
			$scope.Save = function () {
				var listRawRequired = [
					"item.namaPemesan|ng-model|Nama penyewa",
					"item.noKtp|ng-model|Nomor ktp",
					"item.noTelp|ng-model|Nomor telepon",
					"item.alamat|ng-model|Alamat",
					"item.tglStruk|k-ng-model|Tanggal"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					var data = $scope.item;
					var arrProduk = []
					var grid = $("#gridData").data("kendoGrid");
					for(var i=0; i < grid._data.length; i++){
						arrProduk.push({
							"produkId":grid._data[i].produkId,
							"harga":grid._data[i].harga
						});
					};
					data.pemulasaraaanJenazahDetail = arrProduk;
					ManageSarpras.saveDataSarPras(data, "pemulasaraan-jenazah/save-pemulasaraan-jenazah-external/").then(function (e) {
						$scope.isNext = true;
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			};
			$scope.formatHarga = {
				format: "Rp ##.#",
				decimals: 0
			};
			function dropDownProduk(container, options){
				$('<input name="' + options.field + '" data-bind="value:' + options.field + '"style="width:100%"/>')
				.appendTo(container)
				.kendoDropDownList({
					dataTextField: "namaProduk",
					dataValueField: "id",
					dataSource: $scope.sourceProduk
				});
			}
			init();
			function priceEditor(container, options){
				$('<input name="' + options.field + '" data-bind="value:' + options.field +'" disabled/>')
				.appendTo(container)
				.kendoNumericTextBox({
					format: "n0"
				});  		
			}
			$scope.isBack = $scope.Back = function(){
				window.history.back();
			}
		}	
	]);
});