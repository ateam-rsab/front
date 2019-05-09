define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('VerifikasiKartuPengendaliCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'dataRupService', 'ManageSarpras',
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
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			$scope.dataSpek = new kendo.data.DataSource({
				data: [],
				aggregate: [
	               	{ field: "total", aggregate: "sum" }],
	            editable: false,
	     //        schema: {
	     //        	model: {
	     //        		fields: {
	     //        			spesifikasi: { editable: false},
	     //        			namaProduk: { editable: false},
	     //        			volumeBarang: { type: "number"},
	     //        			hargaSatuanBarang: { type: "number"},
	     //        			jumlahBiaya: {type: "number", editable: false}
	     //        		}
	     //        	}
	     //        },
	     //        change: function (e) {
      //               console.log("change: " + e.action);
      //               if (e.field && e.action === "itemchange") {
						// $scope.current.jumlahBiaya = $scope.current.volumeBarang * $scope.current.hasrgaSatuanBarang;
						
						// init();
						// // console.log(JSON.stringify($scope.dataSpek));
						// // debugger;
      //               }
      //               // debugger;
      //           },
                pageSize: 100,
			});

			// ManageSarpras.getDataKartu($state.params.filter, $state.params.noRec).then(function(data){
			ManageSarpras.getDetailKartu($state.params.noRec).then(function(data){
				$scope.items = data.data.kartuPengendaliHeader;

				// $scope.items.total = $scope.items.total.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
				// $scope.items.totalPpn = $scope.items.totalPpn.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
				// $scope.items.totalPembulatan = $scope.items.totalPembulatan.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
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

					$scope.dataSpek.add(spek);
					i++;
				});

				init();
			});

			var init = function(){
				$scope.dataSpek.fetch();
				// debugger;

				var temptotal = $scope.dataSpek.aggregates().total.sum;
				$scope.items.subtotal = kendo.toString(temptotal, "n0");

				var tempPpn = (10 / 100) * temptotal;
				$scope.items.totalPpn = kendo.toString(tempPpn, "n0");

				var temptotalAkhir = temptotal + tempPpn;
				$scope.items.total = kendo.toString(temptotalAkhir, "n0");

				var pembulatan = Math.round(temptotalAkhir);
				$scope.items.pembulatan = kendo.toString(pembulatan, "n0");
				// debugger;

			};

			$scope.columnKartuPengendali = [
				{
					"field": "no",
					"title": "No",
					width: "50px",
					attributes: {
						style: "text-align: center"
					},
				},
				{
					"field": "tanggal",
					"title": "Tanggal Kebutuhan",
					"width": "120px",
					
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
					"width": "250px"
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
					width: "70px",
					template: "<div class=\"pull-right\">#=kendo.toString(volume, \"n0\")#</div>"
				},
				{
					"field": "hargaSatuan",
					"title": "Harga Satuan",
					width: "120px",
					// attributes: {
					// 	style: "text-align: right"
					// },
					template: "<div class=\"pull-right\">#=kendo.toString(hargaSatuan, \"n0\")#</div>"
				}, {
                    "field": "total",
                    "title": "Total",
                    width: "150px",
                    "format": "{0:n0}",
					attributes: {
						style: "text-align: right"
					},
	               	"aggregates": "[\"sum\"]",
	                "footerTemplate": "Jumlah: <div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
					// template: "<div class=\"pull-right\">#=kendo.toString(jumlahBiaya, \"n0\")#</div>"

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

			$scope.save = function(){
				var listRawRequired = [
                    "item.tanggal|k-ng-model|Tanggal verifikasi"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
				
					var kartuPengendaliDetail = [];
						
					var newData = {
						"noRec": $scope.items.noRec
					}

					kartuPengendaliDetail.push(newData);

					$scope.item.kartuPengendali = kartuPengendaliDetail;
					$scope.item.tanggal = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggal));
					// console.log(JSON.stringify($scope.item));
					// debugger;

					ManageSarpras.saveDataSarPras($scope.item, "kartu-pengendali/verifikasi-kartu-pengendali-by-header/").then(function(e){
						console.log(JSON.stringify(e));
					});
					
					setTimeout(function(){history.back();}, 5000);
				} else {
                    ModelItem.showMessages(isValid.messages);
                }
			}

		}
	]);
});		