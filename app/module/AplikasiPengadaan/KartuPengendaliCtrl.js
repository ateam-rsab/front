define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KartuPengendaliCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'dataRupService', 'ManageSarpras',
		function($rootScope, $scope, $state, DateHelper, ModelItem, dataRupService, ManageSarpras) {
			$scope.item = {};
			$scope.items = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			dataRupService.getData("MataAnggaran&select=id,namaMataAnggaran,kodeMataAnggaran", true).then(function(dat){
				$scope.listAkun = dat.data;
			});
			dataRupService.getData("AsalProduk&select=id,kdAsalProduk,asalProduk", true).then(function(dat){
				$scope.listSumberDana = dat.data;
			});
			$scope.dataSpek = new kendo.data.DataSource({
				data: [],
				aggregate: [
	                { field: "volumeBarang", aggregate: "sum" },
	               	{ field: "jumlahBiaya", aggregate: "sum" }],
	            editable: true,
	            schema: {
	            	model: {
	            		fields: {
	            			spesifikasi: { editable: false},
	            			namaProduk: { editable: false},
	            			volumeBarang: { type: "number"},
	            			hargaSatuanBarang: { type: "number"},
	            			jumlahBiaya: {type: "number", editable: false}
	            		}
	            	}
	            },
	            change: function (e) {
                    console.log("change: " + e.action);
                    if (e.field && e.action === "itemchange") {
						$scope.current.jumlahBiaya = $scope.current.volumeBarang * $scope.current.hasrgaSatuanBarang;
						
						init();
						// console.log(JSON.stringify($scope.dataSpek));
						// debugger;
                    }
                    // debugger;
                },
                pageSize: 100,
			});
			// ManageSarpras.getDataKartu($state.params.filter, $state.params.noRec).then(function(data){
			ManageSarpras.getDataKartu($state.params.noRec, $state.params.idMataAng, $state.params.idAsalProd).then(function(data){
				$scope.item = data.data;
				$scope.spek = $scope.item.data;
				debugger;
				$scope.spek.forEach(function(spek){
					$scope.item.paketPengadaan = spek.spesifikasi;
					spek.tanggalPengajuan = DateHelper.getTanggalFormatted(new Date(spek.tanggalPengajuan));
					spek.noRec = {
						"noRec": spek.noRec,
						"kdProfile": spek.kdProfile
					}
					$scope.dataSpek.add(spek);
					// $scope.item.pengendali = $scope.dataSpek._data[0].pengendali;
					//spek.no = $scope.dataSpe.length;
					// console.log(JSON.stringify($scope.item.pengendali));
					// debugger;
				});
				init();
				// $scope.$watch($scope.item.totalSub - ($scope.item.ppn/100 * ($scope.item.totalSub)), function(value) {
	   //              $scope.item.totalAkhir = value;
	   //          });
	            // debugger;
				//item.speks.push($scope.dataSpe)
				// $scope.dataSpek = new kendo.data.DataSource({
				// 	data: temp,
				// 	editable: true
				// })
			});
			var init = function(){
				$scope.dataSpek.fetch();
				// debugger;
				var temptotal = $scope.dataSpek.aggregates().jumlahBiaya.sum;
				$scope.items.totalSub = kendo.toString(temptotal, "n0");
				var tempPpn = (10 / 100) * temptotal;
				$scope.items.ppn = kendo.toString(tempPpn, "n0");
				var temptotalAkhir = temptotal + tempPpn;
				$scope.items.totalAkhir = kendo.toString(temptotalAkhir, "n0");
				var pembulatan = Math.round(temptotalAkhir);
				$scope.items.pembulatan = kendo.toString(pembulatan, "n0");
				// debugger;
			};
			$scope.columnKartuPengendali = [
				{
					"field": "isVerifikasi",
					"title": "Verifikasi",
					"width": "100px",
					"hidden": true,
				},
				// {
				// 	"field": "namaKegiatan",
				// 	"title": "Nama Kegiatan",
				// 	"width": "350px",
					
				// },
				// {
				// 	"field": "kegiatanDetail",
				// 	"title": "Kegiatan Detail",
				// 	"width": "350px",
					
				// },
				// {
				// 	"field": "namaKomponen",
				// 	"title": "Nama Komponen",
				// 	"width": "350px",
					
				// },
				// {
				// 	"field": "sumberDana",
				// 	"title": "Sumber Dana",
				// 	"width": "350px",
					
				// },
				// {
				// 	"field": "output",
				// 	"title": "Output",
				// 	"width": "350px",
						
				// },
				{
					"field": "spesifikasi",
					"title": "Nama Paket Pengadaan",
					"width": "250px",
					"template": "#=spesifikasi#"
				},
				{
					"field": "namaProduk",
					"title": "Nama Produk",
					"width": "250px",
					"template": "#=namaProduk#"
				},
				// {
				// 	"field": "namaAkun",
				// 	"title": "Nama AKun",
				// 	"width": "350px",
				// 	"template": "#=spesifikasi#"
				// },
				{
					"field": "volumeBarang",
					"title": "Volume",
					width: "100px",
					// template: "<div class=\"pull-right\">#=kendo.toString(volumeBarang, \"n0\")#</div>",
					"aggregates": "[\"count\"]", 
					"footerTemplate": "Qty: <div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
				},
				{
					"field": "hasrgaSatuanBarang",
					"title": "Harga Satuan",
					width: "120px",
					attributes: {
						style: "text-align: right"
					},
					format: "{0:n0}"
				}, {
                    "field": "jumlahBiaya",
                    "title": "Total",
                    width: "150px",
                    "format": "{0:n0}",
					attributes: {
						style: "text-align: right"
					},
					// template: "<div class=\"pull-right\">#=kendo.toString(jumlahBiaya, \"n0\")#</div>",
                    "aggregates": "[\"sum\"]",
                    "footerTemplate": "Jumlah: <div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
                } //,
				// {
				// 	"title": "Total",
				// 	width: "120px",
				// 	template: "<div class=\"pull-right\">#=kendo.toString(totalHargaBarang, \"n0\")#</div>",
				// 	aggregates: "[\"sum\"]"
				// },
				// {
				// 	"title": "Keterangan",
				// 	"field": "noRec.keterangan",
				// 	width: "200px"
				// }
			];
			// $scope.dataSpek.fetch();
			// $scope.dataSpek.sync();
			// debugger;
			// $scope.$watch('volumeBarang', function() {
		 //        alert('hey, myVar has changed!');
		 //    });
			//$scope.item.speks = [];
			//console.log(JSON.stringify($scope.dataSpe));
			//$scope.item.jumlah = $scope.dataSpe.totalHargaBarang;
			$scope.kl = function(current){
				$scope.current = current;
				console.log(current);
			}
			$scope.batal = function() {
			  	window.history.back();
			};
			$scope.tambah = function(){
				var listRawRequired = [
                    "item.paketPengadaan|ng-model|Nama paket pengadaan",
                    "item.tanggal|k-ng-model|Tanggal verifikasi",
                    "item.mataAnggaran|k-ng-model|Mata anggaran",
                    "item.asalProduk|k-ng-model|Sumber dana"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
					var kartuPengendaliDetail = [];
					$scope.dataSpek._view.forEach(function(data){
						var newData = {
							"detailRup": data.noRec,
							"volumeBarang": data.volumeBarang,
							"hargaSatuanBarang": data.hasrgaSatuanBarang,
							"keterangan" : $scope.item.keterangan
						}
						kartuPengendaliDetail.push(newData);
					});
					$scope.item.kartuPengendaliDetail = kartuPengendaliDetail;
					$scope.item.tanggal = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggal));
					
					ManageSarpras.saveDataSarPras($scope.item, "kartu-pengendali/save-kartu-pengendali").then(function(e){
						console.log(JSON.stringify(e.data));
					});
					setTimeout(function(){history.back();}, 5000);
				} else {
                    ModelItem.showMessages(isValid.messages);
                }
			}

		}
	]);
});		