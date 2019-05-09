define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPengajuanBelanjaCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'PengajuanUsulanAnggaranService', 'dataRupService',
		function($rootScope, $scope, ModelItem, DateHelper, PengajuanUsulanAnggaranService, dataRupService) {
			ModelItem.get("PengajuanUsulan/DaftarPengajuanUsulan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			dataRupService.getData("Pengadaan&select=*", true).then(function(dat){
				$scope.listPengadaan = dat.data;
				//debugger;
			});

			$scope.dataSource = new kendo.data.DataSource({
		        data: []
		    });

			var init = function(){
				dataRupService.getDataRUP("kartu-pengendali/kartu-pengendali-list?isUlp=true", true).then(function(dat){
				
					$scope.dataRupLengkap = dat.data.data;
					// debugger;

					$scope.dataRupLengkap.forEach(function(data){

						var date = new Date(data.tanggal)
						data.tanggal = DateHelper.getPeriodeFormatted(date);
						
						$scope.dataSource.add(data);
						console.log(JSON.stringify($scope.dataSource));
					})
				});
			}

			init();

			// $scope.listTahun = ["2011","2012","2013","2014","2015","2016","2017","2018","2019"];

			// $scope.isVerifikasi = [
			// 	{"id": "1","status": "USULAN"}, 
			// 	{"id": "2","status":"VERIFIED PPK"}, 
			// 	{"id": "3", "status": "VERIFIED PEA"}, 
			// 	{"id": "4", "status": "VERIFIED Direksi"},
			// 	{"id": "5","status":"UNVERIFIED PPK"}, 
			// 	{"id": "6", "status": "UNVERIFIED PEA"}, 
			// 	{"id": "7", "status": "UNVERIFIED Direksi"}
			// ];

			// $scope.listJenisPengadaan = ["LELANG", "PENGADAAN LANGSUNG", "E-CATALOG"];

			$scope.mainGridOptions = {
		        dataSource: $scope.dataSource,
		        pageable: true,
		        columns: [
				{
					field: "noUsulanPermintaan",
					title: "No Usulan",
					width: 120
				},
				// {
				// 	field: "detailAnggaran",
				// 	title: "Detil Anggaran",
				// 	width: 200
				// },
				{
					field: "tanggal",
					title: "Tanggal",
					width: 150
				},
				{
					field: "pengendali",
					title: "Pengendali",
					width: 275
				},
				{
					field: "isVerifikasi",
					title: "Status",
					width: 275
				},					
				{
					field: "namaProduk",
					title: "Nama Produk",
					width: 150
				},
				{
					field: "volume",
					title: "Volume",
					width: 100,
					template: "<div class=\"pull-right\">#=kendo.toString(volume, \"n0\")#</div>"
				},
				{
					field: "hargaSatuan",
					title: "Harga Satuan",
					width: 100,
					template: "<div class=\"pull-right\">#=kendo.toString(hargaSatuan, \"n0\")#</div>"
				},
				{
					field: "total",
					title: "Total",
					width: 100,
					template: "<div class=\"pull-right\">#=kendo.toString(total, \"n0\")#</div>"
				}],
		    	editable: true
	      	};
		}
	]);
});