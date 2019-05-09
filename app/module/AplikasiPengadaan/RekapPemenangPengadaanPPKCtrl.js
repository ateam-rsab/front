define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RekapPemenangPengadaanPPKCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'dataRupService', 'ManageSarpras',
		function($rootScope, $scope, $state, DateHelper, ModelItem, dataRupService, ManageSarpras) {
			$scope.item = {
				pengadaan: {id: 1},
				jenisPengadaan: {id: 1},
				metodePengadaan: {id: 1}
			};
			$scope.items = {};
			$scope.dats = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.jenis = true;
			$scope.metode = true;
			dataRupService.getData("Rekanan&select=id,namaRekanan").then(function(data) {
                $scope.listSuplier = data;
            });
			
			$scope.dataSpek = new kendo.data.DataSource({
				data: [],
				aggregate: [
	               	{ field: "total", aggregate: "sum" },
	               	{ field: "totalHps", aggregate: "sum" },
	               	{ field: "totalSupplier", aggregate: "sum" }
	            ],
	            editable: true,
	            schema: {
	            	model: {
	            		fields: {
	            			noRec: { editable: false},
	            			spesifikasi: { editable: false},
	            			tanggal: { editable: false},
	            			namaProduk: { editable: false},
	            			volume: { type: "number"},
	            			hargaSatuanBarang: { type: "number"},
	            			jumlahBiaya: {type: "number", editable: false},
	            			hargaHps: {type: "number", editable: false},
	            			hargaSupplier: {type: "number"},
	            			totalHps: {type: "number", editable: false},
	            			totalSupplier: {type: "number", editable: false},
	            		}
	            	}
	            },
	            change: function (e) {
                    if (e.field && e.action === "itemchange") {
						$scope.current.totalSupplier = $scope.current.volume * $scope.current.hargaSupplier;
						
						init();
                    }
                },
                pageSize: 100,
			});
			ManageSarpras.getDetailKartu($state.params.noRec).then(function(data){
				$scope.items = data.data.kartuPengendaliHeader;
				$scope.items.tanggal = DateHelper.getTanggalFormatted(new Date($scope.items.tanggal));

				$scope.dataDetail = data.data.kartuPengendaliDetail;

				var i = 1;

				$scope.dataDetail.forEach(function(spek){
					spek.no = i;
					spek.tanggal = DateHelper.getTanggalFormatted(new Date(spek.tanggal));
					spek.noRec = {
						"noRec": spek.noRec,
						"kdProfile": spek.kdProfile
					}

					if (!spek.hargaSupplier && !spek.totalSupplier) {
						spek.hargaSupplier = 0;
						spek.totalSupplier = 0;
					}

					$scope.dataSpek.add(spek);
					i++;
				});

				init();
			});

			var init = function(){
				$scope.dataSpek.fetch();

				var temptotal = $scope.dataSpek.aggregates().totalSupplier.sum;
				$scope.items.subtotal = kendo.toString(temptotal, "n0");

				var tempPpn = (10 / 100) * temptotal;
				$scope.items.totalPpn = kendo.toString(tempPpn, "n0");

				var temptotalAkhir = temptotal + tempPpn;
				$scope.items.total = kendo.toString(temptotalAkhir, "n0");

				var pembulatan = Math.round(temptotalAkhir);
				$scope.items.pembulatan = kendo.toString(pembulatan, "n0");
			};

			$scope.columnKartuPengendali = [
				{
					"field": "no",
					"title": "No",
					width: "50px",
					attributes: {
						style: "text-align: center"
					},
					editable: "false"
				},
				{
					"field": "noRec",
					hidden: true
				},
				{
					"field": "tanggal",
					"title": "Tanggal Kebutuhan",
					"width": "120px",
					editable: "false"
					
				},
				{
					"field": "namaProduk",
					"title": "Nama Produk/Spesifikasi",
					"width": "250px",
					editable: "false"
				},
				{
					"field": "volume",
					"title": "Qty",
					width: "50px",
					template: "<div class=\"pull-right\">#=kendo.toString(volume, \"n0\")#</div>",
					headerAttributes: {
						style: "text-align:center"
					}
				},
				{
					field: "hargaHps",
					title: "Harga (HPS)",
					width: 100,
					"template":"<div class=\"pull-right\">#=kendo.toString(hargaHps, \"n0\")#</div>",
					headerAttributes: {
						style: "text-align:center"
					}
				},
				{
					field: "totalHps",
					title: "Sub Total (HPS)",
					width: 100,
					attributes: {
						style: "text-align: right"
					},
					// "template":"<div class=\"pull-right\">#=kendo.toString(totalHps, \"n0\")#</div>"
	               	"aggregates": "[\"sum\"]",
	                "footerTemplate": "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>",
					editable: "false",
					headerAttributes: {
						style: "text-align:center"
					},
					format: "{0:n0}"
				},
				{
					field: "hargaSupplier",
					title: "Harga (Supplier)",
					width: 100,
					"template":"<div class=\"pull-right\">#=kendo.toString(hargaSupplier, \"n0\")#</div>",
					headerAttributes: {
						style: "text-align:center"
					}
				},
				{
					field: "totalSupplier",
					title: "Sub Total (Supplier)",
					width: 100,
					attributes: {
						style: "text-align: right"
					},
					// "template":"<div class=\"pull-right\">#=kendo.toString(totalHps, \"n0\")#</div>"
	               	"aggregates": "[\"sum\"]",
	                "footerTemplate": "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>",
					editable: "false",
					headerAttributes: {
						style: "text-align:center"
					},
					format: "{0:n0}"
				},
				{
					field: "supplier",
					title: "Nama Supplier",
					headerAttributes: {
						style: "text-align:center"
					},
					"template": "<input kendo-combo-box k-ng-model=\"dataItem.supplier\" k-data-text-field=\"'namaRekanan'\" k-data-value-field=\"'id'\" k-data-source=\"listSuplier\"  k-on-change=\"update(data, columns, dataItem)\" style=\"width: 100%\" ></input>"

				}
			];
			$scope.kl = function(current){
				$scope.current = current;
				console.log(current);
			}
			$scope.batal = function() {
			  	window.history.back();
			};
			$scope.update = function(data, columns, dataItem) {
				$scope.data = data;
				$scope.columns = columns;
				$scope.dataItem = dataItem;
			}
			$scope.notf1Options = {
	            position: {
	                pinned: true,
	            	top: 30,
	                right: 30
	            },
	            autoHideAfter: 3000,
	            stacking: "down",
	            templates: [{
	                type: "ngTemplate",
	                template: $("#notificationTemplate").html()
	            }]
	        };
	        $scope.showPopup = function () {
	            $scope.notf1.show({
	                title: "Informasi",
	                message: $scope.messages
	            }, "ngTemplate");
	        }
			$scope.save = function(){
				var listRawRequired = [
					"item.tanggal|k-ng-model|Tanggal verifikasi"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
					
				if(isValid.status){
					var rekapPemenangDetail = [];

					$scope.dataSpek._data.forEach(function(data){
						
						if (data.supplier !== undefined || data.hargaSupplier !== 0) {
							debugger
							var newData = {
								"noRec": data.noRec.noRec,
								"hargaSupplier": data.hargaSupplier,
								"supplier": data.supplier
							}
							rekapPemenangDetail.push(newData);
							// console.log(JSON.stringify(newData));
						}
					})
					
					if (rekapPemenangDetail.length === $scope.dataSpek._data.length) {
						$scope.dats.kartuPengendaliDetail = rekapPemenangDetail;
						$scope.dats.tanggal = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggal));

						ManageSarpras.saveDataSarPras($scope.dats, "kartu-pengendali/rekap-pemenang").then(function(e){
							console.log(JSON.stringify(e));
						});
						
						// setTimeout(function(){history.back();}, 5000);
					} else {
						$scope.messages = "Data belum lengkap";
			    		$scope.showPopup();
					}
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			}
		}
	]);
});		