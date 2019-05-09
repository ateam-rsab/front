define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('UploadPenawaranCtrl', ['$rootScope', '$scope', 'ModelItem', 'PengajuanUsulanAnggaranService',
		function($rootScope, $scope, ModelItem, PengajuanUsulanAnggaranService) {
			// ModelItem.get("PengajuanUsulan/DaftarPengajuanUsulan").then(function(data) {
			// 	$scope.item = data;
			// 	$scope.now = new Date();
			// 	$scope.dataVOloaded = true;

			// 	$scope.item.pengadaan = "LELANG";
			// 	$scope.item.noUsulan = "016000100c";
			// 	$scope.item.tanggal = "2016-9-27";
			// 	$scope.item.total = "121000";
			// 	$scope.item.jumlah = 21;
				

			// }, function errorCallBack(err) {});

			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			// $scope.item.pengadaan = "LELANG";
			// $scope.item.noUsulan = "016000100c";
			// $scope.item.tanggal = "2016-9-27";
			// $scope.item.total = "121000";
			// $scope.item.jumlah = 21;

			// $scope.listJenisPengadaan = ["LELANG", "PENGADAAN LANGSUNG", "E-CATALOG"];
			PengajuanUsulanAnggaranService.getGetData("Rekanan&select=id,namaRekanan").then(function(data) {
                $scope.listSuplier = data;
            });

			$scope.dataSource = new kendo.data.DataSource({
		        data: [],
		        pageSize: 5,
		        sortable: true,
		        autoSync: true
		    });

			$scope.mainGridOptions = {
		        dataSource: $scope.dataSource,
		        pageable: true,
		        columns: [
		          	{
						field: "no",
						title: "No",
						width: 50
					},
					{
						field: "noRec",
						hidden: true
					},
					// {
					// 	field: "namaDistributor",
					// 	title: "<h3 align=center>Nama Distributor</h3>",
					// 	width: 180
					// },
					{
						field: "namaObat",
						title: "Nama Obat",
						width: 180
					},
					{
						field: "namaDagang",
						title: "Nama Dagang",
						width: 180
					},
					{
						field: "kemasan",
						title: "Kemasan"
					},
					{
						field: "isiKemasan",
						title: "Isi Kemasan"
					},
					{
						field: "hargaSatuanTerkecil",
						title: "Harga Satuan"
					},
					{
						field: "tipeObat",
						title: "Tipe Obat"
					},
					{
						field: "spesifikasi",
						title: "Spesifikasi"
					}]//,
		    	// /editable: true
	      	};

			$scope.Save = function(){
				var tempData = {
					"penawaranHargaSupplier": $scope.dataSource._data,
					"supplier": {
						"id": $scope.item.namaRekanan.id
					}
				}

				PengajuanUsulanAnggaranService.savePengajuan(tempData, "kartu-pengendali/save-penawaran-harga-supplier/").then(function(e){
					console.log(JSON.stringify(e));
				})
				// console.log(JSON.stringify(tempData));
				// debugger;
			};

	      	$scope.onSelectFile = function(e)
		    {
		    	files = e.files
		    }

			$scope.upload = function() {

				var files = document.getElementById("filePicker");
			    var file = files.files[0];
			    debugger;

			    if (files && file) {
			        var reader = new FileReader();

			        reader.onload = function(readerEvt) {
			            var binaryString = readerEvt.target.result;
			            var fileInput = {
			            	"fileInput" : btoa(binaryString)
			            } 
			            // document.getElementById("base64textarea").value = btoa(binaryString);

			            PengajuanUsulanAnggaranService.savePengajuan(fileInput, "kartu-pengendali/upload-exel/").then(function(dat){
			            	
			            	console.log(fileInput);
			            	$scope.fileExcel = dat.data.data.data;

			            	$scope.fileExcel.forEach(function(data) {

			            		// if (!data.namaDagang) {
			            		// 	data.namaDagang = "-"
			            		// }

			            		// if (!data.kemasan) {
			            		// 	data.kemasan = "-"
			            		// }

			            		// if (!data.isiKemasan) {
			            		// 	data.isiKemasan = "-"
			            		// }

			            		// if (!data.hargaSatuanTerkecil) {
			            		// 	data.hargaSatuanTerkecil = "-"
			            		// }

			            		// if (!data.tipeObat) {
			            		// 	data.tipeObat = "-"
			            		// }

			            		$scope.dataSource.add(data);
			            		$scope.dataSource.fetch();
			            		console.log(JSON.stringify($scope.dataSource));
			     //        		var tempData = {
								// 	"penawaranHargaSupplier": $scope.dataSource._data,
								// 	"supplier": {
								// 		"id": $scope.item.namaRekanan.id
								// 	}
								// }

								// PengajuanUsulanAnggaranService.savePengajuan(tempData, "kartu-pengendali/save-penawaran-harga-supplier/").then(function(e){
								// 	console.log(JSON.stringify(e));
								// })
			            	})
			            })
			        };

			        reader.readAsBinaryString(file);
			    }
			};
		}
	]);
});