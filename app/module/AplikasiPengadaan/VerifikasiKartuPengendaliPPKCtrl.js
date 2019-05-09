define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('VerifikasiKartuPengendaliPPKCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'dataRupService', 'ManageSarpras',
		function($rootScope, $scope, $state, DateHelper, ModelItem, dataRupService, ManageSarpras) {
			/*
			ModelItem.get("folder/KartuPengendali").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			*/

			$scope.item = {};
			$scope.items = {};

			$scope.item.pengadaan = {id: 1};
			$scope.item.jenisPengadaan = {id: 1};
			$scope.item.metodePengadaan = {id: 1};
			
			$scope.dats = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			$scope.jenis = true;
			$scope.metode = true;

			dataRupService.getData("Pengadaan&select=*", true).then(function(dat){
				$scope.listPengadaan = dat.data;
				//debugger;
			});

			dataRupService.getData("MetodePengadaanHeader&select=*", true).then(function(dat){
				$scope.JenisPengadaan = dat.data;
			});

			// $scope.pilihMetode = function() {
			// 	var ID = $scope.item.jenisPengadaan;
			// 	debugger;
			// }

			// $scope.$watch('tempItem.Generik', function(e) {
   //              // debugger;
   //              /*alert(e.id)*/
   //              findPasien.getAmbilObat(e.id).then(function(e) {
   //                  // debugger;
   //                  $scope.listAmbilObat = e.data.data.stokProdukGlobal
   //              });
   //          })

			$scope.$watch('item.jenisPengadaan', function(e){

				dataRupService.getDataRUP("kartu-pengendali/get-metode-pengadaan-detail?id="+e.id, true).then(function(e){
					$scope.MetodePengadaan = e.data;
				});
			})

			//hard code list cara, jenis & metode pengadaan

			// $scope.JenisPengadaan = [{
			// 	"id": 1, "namaExternal": "Barang"
			// },
			// {
			// 	"id": 2, "namaExternal": "Pekerjaan Konstruksi"
			// },
			// {
			// 	"id": 3, "namaExternal": "Penyedia Jasa Lain"
			// },
			// {
			// 	"id": 4, "namaExternal": "Jasa Konstruksi"
			// }];

			// $scope.MetodePengadaan = [{
			// 	"id": 1, "namaExternal": "Pelelangan Umum"
			// },
			// {
			// 	"id": 2, "namaExternal": "Pelelangan Terbatas"
			// },
			// {
			// 	"id": 3, "namaExternal": "Pelelangan Sederhana"
			// },
			// {
			// 	"id": 4, "namaExternal": "Penunjukan Langsung"
			// },
			// {
			// 	"id": 5, "namaExternal": "Pengadaan Langsung"
			// },
			// {
			// 	"id": 6, "namaExternal": "Sayembara"
			// },
			// {
			// 	"id": 7, "namaExternal": "Seleksi Umum"
			// },
			// {
			// 	"id": 8, "namaExternal": "Seleksi Sederhana"
			// }]

			// dataRupService.getData("Pengadaan&select=*", true).then(function(dat){
			// 	$scope.listPengadaan = dat.data;
			// });

			
			$scope.dataSpek = new kendo.data.DataSource({
				data: [],
				aggregate: [
	               	{ field: "totalHargaBarang", aggregate: "sum" },
	               	{ field: "totalHps", aggregate: "sum" }
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
	            			totalHargaBarang: {type: "number", editable: false},
	            			hargaHps: {type: "number"},
	            			totalHps: {type: "number", editable: false},
	            		}
	            	}
	            },
	            change: function (e) {
                    if (e.field && e.action === "itemchange") {
						$scope.current.totalHps = $scope.current.volume * $scope.current.hargaHps;
						
						init();
						// console.log(JSON.stringify($scope.dataSpek));
						// debugger;
                    }
                    // debugger;
                },
                pageSize: 100,
			});

			// ManageSarpras.getDataKartu($state.params.filter, $state.params.noRec).then(function(data){
			ManageSarpras.getDetailKartu($state.params.noRec).then(function(data){
				$scope.items = data.data;
				debugger;
				if ($scope.items.pengadaan === null) {
					$scope.items.pengadaan = {
						id: 1
					}
				} else {
					$scope.items.pengadaan = $scope.items.pengadaan.id;
				}
				
				// $scope.items.total = $scope.items.total.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
				// $scope.items.totalPpn = $scope.items.totalPpn.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
				// $scope.items.totalPembulatan = $scope.items.totalPembulatan.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
				$scope.items.kartuPengendaliHeader.tanggal = DateHelper.getPeriodeFormatted(new Date($scope.items.kartuPengendaliHeader.tanggal));
				$scope.items.kartuPengendaliHeader.total = $scope.items.kartuPengendaliHeader.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
				$scope.dataDetail = $scope.items.kartuPengendaliDetail;

				var i = 1;

				$scope.dataDetail.forEach(function(spek){
					spek.no = i;
					spek.tanggal = DateHelper.getPeriodeFormatted(new Date(spek.tanggal));
					if (spek.hargaHps === null) {
						spek.hargaHps = 0;
					}
					spek.noRec = {
						"noRec": spek.noRec,
						"kdProfile": spek.kdProfile
					}
					// spek.hargaSatuanBarangHps = 0;
					// spek.totalHps = 0;

					$scope.dataSpek.add(spek);
					i++;
				});

				init();
			});

			var init = function(){
				$scope.dataSpek.fetch();

				if (!$scope.dataSpek.aggregates().totalHps.sum) {
					var temptotal = $scope.dataSpek.aggregates().totalHargaBarang.sum;
					$scope.items.subtotal = kendo.toString(temptotal, "n0");

					// var tempPpn = (10 / 100) * temptotal;
					// $scope.items.totalPpn = kendo.toString(tempPpn, "n0");

					// var temptotalAkhir = temptotal + tempPpn;
					// $scope.items.total = kendo.toString(temptotalAkhir, "n0");

					// var pembulatan = Math.round(temptotalAkhir);
					// $scope.items.pembulatan = kendo.toString(pembulatan, "n0");
					// debugger;
				} else {
					var temptotal = $scope.dataSpek.aggregates().totalHps.sum;
					$scope.items.subtotal = kendo.toString(temptotal, "n0");

					// var tempPpn = (10 / 100) * temptotal;
					// $scope.items.totalPpn = kendo.toString(tempPpn, "n0");

					// var temptotalAkhir = temptotal + tempPpn;
					// $scope.items.total = kendo.toString(temptotalAkhir, "n0");

					// var pembulatan = Math.round(temptotalAkhir);
					// $scope.items.pembulatan = kendo.toString(pembulatan, "n0");
					// debugger;
				}


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
				// {
				// 	"field": "spesifikasi",
				// 	"title": "Spesifikasi",
				// 	"width": "250px"
				// },
				{
					"field": "namaProduk",
					"title": "Nama Produk/Spesifikasi",
					"width": "250px",
					editable: "false"
				},
				// {
				// 	"field": "namaAkun",
				// 	"title": "Nama AKun",
				// 	"width": "350px",
				// 	"template": "#=spesifikasi#"
				// },
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
					"field": "hargaSatuan",
					"title": "Harga Satuan",
					width: "120px",
					// attributes: {
					// 	style: "text-align: right"
					// },
					template: "<div class=\"pull-right\">#=kendo.toString(hargaSatuan, \"n0\")#</div>",
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
                    "field": "totalHargaBarang",
                    "title": "Sub Total",
                    width: "100px",
                    "format": "{0:n0}",
					attributes: {
						style: "text-align: right"
					},
	               	"aggregates": "[\"sum\"]",
	                "footerTemplate": "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>",
					editable: "false",
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
                    "format": "{0:n0}",
					// "template":"<div class=\"pull-right\">#=kendo.toString(totalHps, \"n0\")#</div>"
	               	"aggregates": "[\"sum\"]",
	                "footerTemplate": "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>",
					editable: "false",
					headerAttributes: {
						style: "text-align:center"
					}
				} 
				//,
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

			$scope.$watch('item.pengadaan', function(){
				$scope.jenis = true;

				if ($scope.item.pengadaan !== undefined) {
					$scope.jenis = false;
				}
			});

			$scope.$watch('item.jenisPengadaan', function(){
				$scope.metode = true;

				if ($scope.item.jenisPengadaan !== undefined) {
					$scope.metode = false;
				}
			});

			$scope.kl = function(current){
				$scope.current = current;
				console.log(current);
			}

			$scope.batal = function() {
			  	window.history.back();
			};

			if ($scope.item.pengadaan !== undefined && $scope.item.jenisPengadaan !== undefined && $scope.item.MetodePengadaan !== undefined) {
				$scope.item.keterangan = "pengadaan.id = " + $scope.item.pengadaan.id + "JenisPengadaan.id = " + $scope.item.jenisPengadaan.id + "MetodePengadaan.id = " + $scope.item.MetodePengadaan.id;
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
					"item.tanggal|k-ng-model|Tanggal verifikasi",
					"items.pengadaan|ng-model|Cara pengadaan",
					"item.jenisPengadaan|k-ng-model|Jenis pengadaan",
					"item.metodePengadaan|k-ng-model|Metode pengadaan"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
					
				if(isValid.status){
					var spekKartuKendali = [];

					$scope.dataSpek._data.forEach(function(data){

						if (data.hargaHps !== 0) {
							var newData = {
								"noRec": data.noRec.noRec,
								"hargaSatuanBarangHps": data.hargaHps,
								"volumeBarang": data.volume
							}
							spekKartuKendali.push(newData);
							console.log(JSON.stringify(newData));
						}
					})
					
					if (spekKartuKendali.length === $scope.dataSpek._data.length) {
						$scope.dats.pengadaanId = $scope.items.pengadaan;
						$scope.dats.metodePengadaanDetailId = $scope.item.metodePengadaan.id;
						$scope.dats.kartuPengendaliDetail = spekKartuKendali;
						$scope.dats.tanggal = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggal));
						// console.log(JSON.stringify($scope.dats));
						// debugger;

						ManageSarpras.saveDataSarPras($scope.dats, "kartu-pengendali/save-verifikasi-spek-anggaran").then(function(e){
							console.log(JSON.stringify(e.data));
							// debugger;
						});
					} else {
						$scope.messages = "Harga Perkiraan Semantara (HPS) harus di isi!";
    					$scope.showPopup();
					}
				
				// setTimeout(function(){history.back();}, 5000);
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			}

		}
	]);
});		