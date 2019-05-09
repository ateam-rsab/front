define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('EvaluasiPenawaranHargaCtrl', ['$rootScope', '$scope', 'ModelItem', 'PengajuanUsulanAnggaranService',
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

			$scope.item.pengadaan = "LELANG";
			$scope.item.noUsulan = "016000100c";
			$scope.item.tanggal = "2016-9-27";
			$scope.item.total = "121000";
			$scope.item.jumlah = 21;

			$scope.listJenisPengadaan = ["LELANG", "PENGADAAN LANGSUNG", "E-CATALOG"];

			$scope.dataSource = new kendo.data.DataSource({
		        pageSize: 5,
		        sortable: true,
		        data: [
				{
					no:"1",
					namaDistributor: "PT INDO",
					namaObat: "PANADOL",
					namaDagang: "PANADOL",
					hargaSatuan: "20000",
					satuanKemasan: 20,
					keterangan: "GENERIK BERMERK"
				},{
					no:"2",
					namaDistributor: "PT MAXINDO",
					namaObat: "PANADOL",
					namaDagang: "PANADOL",
					hargaSatuan: "25000",
					satuanKemasan: 20,
					keterangan: "GENERIK"
				},{
					no:"3",
					namaDistributor: "PT MEDIKA",
					namaObat: "PANADOL",
					namaDagang: "PANADOL",
					hargaSatuan: "30000",
					satuanKemasan: 20,
					keterangan: "GENERIK"
				},{
					no:"4",
					namaDistributor: "PT IGM",
					namaObat: "PANADOL",
					namaDagang: "PANADOL",
					hargaSatuan: "22000",
					satuanKemasan: 20,
					keterangan: "GENERIK BERMERK"
				},{
					no:"5",
					namaDistributor: "PT ARSURA",
					namaObat: "PANADOL",
					namaDagang: "PANADOL",
					hargaSatuan: "19000",
					satuanKemasan: 20,
					keterangan: "GENERIK"
				}],
		        autoSync: true
		    });

			$scope.mainGridOptions = {
		        dataSource: $scope.dataSource,
		        pageable: true,
		        columns: [
		          	{
						field: "no",
						title: "<h3 align=center>No</h3>",
						width: 50
					},
					{
						field: "namaDistributor",
						title: "<h3 align=center>Nama Distributor</h3>",
						width: 180
					},
					{
						field: "namaObat",
						title: "<h3 align=center>Nama Obat</h3>",
						width: 180
					},
					{
						field: "namaDagang",
						title: "<h3 align=center>Nama Dagang</h3>",
						width: 180
					},
					{
						field: "satuanKemasan",
						title: "<h3 align=center>Satuan<br/>Kemasan</h3>",
						width: 80,
						"template":"<div class=\"pull-right\">#=kendo.toString(satuanKemasan, \"n0\")# #=\"ampul\"#</div>"
					},
					{
						field: "hargaSatuan",
						title: "<h3 align=center>Harga<br/>+PPn</h3>",
						width: 80,
						"template":"<div class=\"pull-right\">#=kendo.toString(hargaSatuan, \"n0\")#</div>"
					},
					{
						field: "keterangan",
						title: "<h3 align=center>Keterangan</h3>",
						"template":"<div style=\"text-align:center\">#=keterangan#</div>"
					}]//,
		    	// /editable: true
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
			            document.getElementById("base64textarea").value = btoa(binaryString);

			   			console.log(btoa(binaryString));
			        	debugger;
			        };

			        reader.readAsBinaryString(file);
			    }
			}
		}
	]);
});