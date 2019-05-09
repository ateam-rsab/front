define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('VerifikasiUsulanCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'dataRupService', 'ManageSarpras',
		function($rootScope, $scope, $state, DateHelper, ModelItem, dataRupService, ManageSarpras) {
			// ModelItem.get("PengajuanUsulan/DaftarPengajuanUsulan").then(function(data) {
			// 	$scope.item = data;
			// 	$scope.now = new Date();
			// 	$scope.dataVOloaded = true;
			// }, function errorCallBack(err) {});
				
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			dataRupService.getData("Pengadaan&select=*", true).then(function(dat){
				$scope.listPengadaan = dat.data;
				// console.log(JSON.stringify($scope.listPengadaan));
				// debugger;
			});
			// $scope.dataSource = new kendo.data.DataSource({
		 //        pageSize: 2,
		 //        data: [
			// 	{
			// 		no:"1",
			// 		tanggal: "2016-9-7",
			// 		detail: "Optimalisasi software",
			// 		volume: "10",
			// 		hargaBarang: "5000",
			// 		hps: "5500",
			// 		total: "50000",
			// 		totalHps: "55000"
			// 	},{
			// 		no:"1",
			// 		tanggal: "2016-9-7",
			// 		detail: "Optimalisasi software",
			// 		volume: "10",
			// 		hargaBarang: "5000",
			// 		hps: "5500",
			// 		total: "50000",
			// 		totalHps: "55000"
			// 	},{
			// 		no:"1",
			// 		tanggal: "2016-9-7",
			// 		detail: "Optimalisasi software",
			// 		volume: "10",
			// 		hargaBarang: "5000",
			// 		hps: "5500",
			// 		total: "50000",
			// 		totalHps: "55000"
			// 	},{
			// 		no:"1",
			// 		tanggal: "2016-9-7",
			// 		detail: "Optimalisasi software",
			// 		volume: "10",
			// 		hargaBarang: "5000",
			// 		hps: "5500",
			// 		total: "50000",
			// 		totalHps: "55000"
			// 	}],
		 //        autoSync: true
		 //    });

			$scope.kolomVerifikasi = [
		  //       {
				// 	field: "noUrut",
				// 	title: "No",
				// 	width: 40
				// },
				{
					field: "namaProduk",
					title: "Deskripsi Spek",
					width: 300
				},
				{
					"field": "volumeBarang",
					"title": "Volume",
					width: "100px",
					template: "<div class=\"pull-right\">#=kendo.toString(volumeBarang, \"n0\")#</div>",
					"aggregates": "[\"count\"]", 
					"footerTemplate": "Qty: <div class=\"pull-right\">#=kendo.toString(count, \"n0\")#</div>"
				},
				{
					"field": "hargaSatuanBarang",
					"title": "Harga Satuan",
					width: "120px",
					attributes: {
						style: "text-align: right"
					},
					// template: "<div class=\"pull-right\">#=kendo.toString(hargaSatuanBarang, \"n0\")#</div>"
				},
				{
					field: "hargaSatuanBarangHps",
					title: "HPS",
					width: 100,
					"template":"<div class=\"pull-right\">#=kendo.toString(hargaSatuanBarangHps, \"n0\")#</div>"
				},
				{
	                "field": "totalHargaBarang",
	                "title": "Total",
	                width: "150px",
					attributes: {
						style: "text-align: right"
					},
					// template: "<div class=\"pull-right\">#=kendo.toString(totalHargaBarang, \"n0\")#</div>",
	               	"aggregates": "[\"sum\"]",
	                "footerTemplate": "Jumlah: <div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
	            },
				{
					field: "totalHps",
					title: "Total HPS",
					width: 100,
					attributes: {
						style: "text-align: right"
					},
					// "template":"<div class=\"pull-right\">#=kendo.toString(totalHps, \"n0\")#</div>"
	               	"aggregates": "[\"sum\"]",
	                "footerTemplate": "Jumlah: <div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
				}
			];

			$scope.dataVerifikasi = new kendo.data.DataSource({
				data: [],
				aggregate: [
	                { field: "volumeBarang", aggregate: "count" },
	               	{ field: "totalHargaBarang", aggregate: "sum" },
	               	{ field: "totalHps", aggregate: "sum" }],
	            editable: true,
	            schema: {
	            	model: {
	            		fields: {
	            			namaProduk: { type: "string", editable: false},
	            			volumeBarang: { type: "number"},
	            			hargaSatuanBarang: { type: "number"},
	            			totalHargaBarang: {type: "number", editable: false},
	            			hargaSatuanBarangHps: { type: "number"},
	            			totalHps: {type: "number", editable: false}
	            		}
	            	}
	            },
	            change: function (e) {
                    console.log("change: " + e.action);
                    if (e.action === "itemchange") {
						$scope.current.totalHargaBarang = $scope.current.volumeBarang * $scope.current.hargaSatuanBarang;
						$scope.current.totalHps = $scope.current.volumeBarang * $scope.current.hargaSatuanBarangHps;
                    }
                    // debugger;
                },
                pageSize: 7,
			});

	      	ManageSarpras.getVerifikasiKartu($state.params.noRec).then(function(data){
	      		$scope.dataAwal = data.data;

	      		$scope.dataAwal.forEach(function(dats){
		      		dats.totalHargaBarang = dats.volumeBarang * dats.hargaSatuanBarang;
		      		dats.hargaSatuanBarangHps = 0;
		      		dats.totalHps = 0;
		      		$scope.dataVerifikasi.add(dats);
					$scope.item.pengendali = $scope.dataVerifikasi._data[0].pengendali;

		      		console.log(JSON.stringify($scope.dataVerifikasi));
		      		// debugger;
	      		})
	      	})

	      	$scope.verifikasi = function(){
	      		var tempData = []
	      		$scope.dataVerifikasi._data.forEach(function(dats){
	      			if (dats.hargaSatuanBarangHps === 0)
	      				dats.hargaSatuanBarangHps = dats.hargaSatuanBarang

		      		var data = {
						"noRec": dats.noRecs,
						"hargaSatuanBarangHps": dats.hargaSatuanBarangHps,
						"volumeBarang": dats.volumeBarang
					}

	      			tempData.push(data);

	      		})

	      		var data = {
	      			"kartuPengendaliDetail": tempData
	      		}
				// console.log(JSON.stringify(data));
				// debugger;

				ManageSarpras.saveDataSarPras(data, "kartu-pengendali/9999-verifikasi-spek-anggaran").then(function(e){
					console.log(JSON.stringify(e.data));
				})

				$scope.doTheBack();
	      	}

	      	$scope.unverifikasi = function(){

	      	}

	      	$scope.doTheBack = function() {
			  	window.history.back();
			};
		}
	]);
});