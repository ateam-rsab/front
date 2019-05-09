define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormLaporanUjiHasilCtrl', ['$rootScope', '$scope', 'ModelItem','MasterRekanan','TampilDataParameter','TampilDataSatuan','TampilDataBakuMutu','TampilDataLaporanUjiHasil','ManageSarpras',
		function($rootScope, $scope, ModelItem,MasterRekanan,TampilDataParameter,TampilDataSatuan,TampilDataBakuMutu,TampilDataLaporanUjiHasil,ManageSarpras) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.no=1;

			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})

			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: []
			});
			
			
		// 	TampilDataLaporanUjiHasil.getOrderList("laporan-uji-hasil/find-all-paging/").then(function(dat){
		// $scope.sourceOrder = dat.data.data;
	
		// 	});
			
			// TampilDataParameter.getOrderList("service/list-generic/?view=Parameter&select=*").then(function(dat){
			// 	$scope.ListParameter = dat.data;
			// });

			TampilDataParameter.getOrderList("service/list-generic/?view=JenisPemeriksaan&select=*").then(function(dat){
				$scope.listPemeriksaan = dat.data;
			});
			
			// MasterRekanan.getOrderList("laporan-uji-hasil/get-rekanan/").then(function(dat){
			// 	$scope.ListRekanan = dat.data.data.rekanan;
			// 	// debugger;
			// });
			
			// TampilDataSatuan.getOrderList("service/list-generic/?view=SatuanStandar&select=*", true).then(function(dat){
			// 	$scope.ListSatuan = dat.data;
			// });
			
			// TampilDataBakuMutu.getOrderList("baku-mutu/get-baku-mutu-child", true).then(function(dat){
			// 	$scope.ListBakuMutu = dat.data.data.bakuMutu;
			// // debugger;	
			// });

			$scope.gridDataPengujian = new kendo.data.DataSource({
				data: [],
				editable: "inline"
			});
			
			$scope.columnLaporanUjiHasil = [
				{
					"field": "id",
					"title": "",
					hidden: true
				},{
					"field": "no",
					"title": "No",
					"width": "5%"
				},
				{
					"field": "nama",
					"title": "Parameter",
					"width": "20%"
				},
				{
					"field": "satuan",
					"title": "Satuan",
					"width": "20%"
				},
				{
					"field": "refrange",
					"title": "Baku Matu",
					"width": "20%"
				},
				{
					"field": "hasilUji",
					"title": "Hasil Uji",
					"width": "20%",
					type:'number'
				},
				{
					"field": "keterangan",
					"title": "Keterangan",
					"width": "20%",
					type:'string'
				}
			];
			
			
			// $scope.gridDataPengujian = function() {

			// 	var dataPengujian = {
			// 		"no": $scope.no++,
			// 		"parameter": $scope.item.parameter,
			// 		"satuan" : $scope.item.satuan,
			// 		"hasilUji" :$scope.item.hasil,
			// 		"bakumutu":$scope.item.baku,
			// 		"metode":$scope.item.metode,
			// 		"keterangan":$scope.item.keterangan
				
			// 	}

			// 	$scope.daftarBahanLinen.add(dataPengujian);
			// 	$scope.item.parameter="",
			// 	$scope.item.satuan="",
			// 	$scope.item.hasil="",
			// 	$scope.item.baku="",
			// 	$scope.item.metode="",
			// 	$scope.item.keterangan=""
			// }

			$scope.inputData = function() {
				$scope.pemeriksaanId = $scope.item.jenisPemeriksaan.id;

				$scope.gridDataPengujian = new kendo.data.DataSource({
					data: []
				});

				TampilDataParameter.getOrderList("produk-kesling-nilai-normal/get-produk-kesling-nilai-normal?jenisPemeriksaanId="+$scope.pemeriksaanId).then(function(dat){
					$scope.sourceDataPengujian = dat.data.data.produkKeslingNilaiNormal;
					// console.log(JSON.stringify($scope.gridDataPengujian))
					// debugger;
					var i = 1;
					$scope.sourceDataPengujian.forEach(function(data) {
						data.no = i,

						$scope.gridDataPengujian.add(data);
						// console.log(JSON.stringify($scope.gridDataPengujian));
						// debugger;
						i++;
					})
				});
			
			}
			
			// $scope.Save = function () {
	          	
	  //         	var detail = $scope.gridDataPengujian._data;
			// 	var i = 0;
			// 	var detailHVA = [];
			// 	detail.forEach(function (data) {
			// 		var data = {
						
			// 			"bakuMutu":{
			// 			"id":data.bakumutu.id
			// 		},
			// 			"parameter":{
			// 			"id":data.parameter.id
			// 		},
					
					
			// 			"satuanStandar":{
			// 			"id":data.satuan.id
			// 		},
					
						
			// 			"hajilUJi": data.hasilUji,
			// 			"metode":data.metode
						
					
						
			// 		}
			// 		detailHVA[i] = data;
			// 		i++;
			// 	})
				
			// 	var data1 = {
				
			// 	    "nomorContoh":$scope.item.nomorContoh,
			// 	    "contohDari":$scope.item.uraianContoh,
			// 		"rekanan":$scope.item.persero,
			// 		"mapParameterToLaporanUjiHasil": detailHVA,
			// 		"tanggalPengujianContohFrom": new Date($scope.item.tanggalpengujiandari).getTime(),
			// 		"tanggalPengujianContohTo" : new Date($scope.item.tanggalpengujiansampai).getTime(),
			// 		"tanggalPenerimaanContoh"    : new Date($scope.item.tanggalditerimalab).getTime()
				
			// 	}

			// 	console.log(JSON.stringify(data1));
				
   //              ManageSarpras.saveDataUji(data1, "laporan-uji-hasil/save-laporan-uji-hasil/").then(function (e) {
			// 		console.log(JSON.stringify(e.data));
			// 		// $scope.Back();
			// 		$scope.item = {};
			// 		$scope.item.tanggalditerimalab = new Date();
			// 		$scope.item.tanggalpengujiandari = new Date();
			// 		$scope.item.tanggalpengujiansampai = new Date();
					
   //              });
				
			// 	$scope.daftarBahanLinen = [];
			// };

			$scope.Save = function () {
				$scope.item.pemeriksaanLimbahDetail = [];

				// console.log(JSON.stringify($scope.gridDataPengujian));

				var dataPengujian = $scope.gridDataPengujian._view;
				// debugger;

				for (var i=0; i<=dataPengujian; i++ ) {

					data.produkKeslingNilaiNormal = data.id,
					data.keterangan = data.keterangan,
					data.nilai = data.nilai

					$scope.item.pemeriksaanLimbahDetail.push(data);
					console.log(JSON.stringify(data));
					debugger;
				}

				// $scope.dataPengujian.foreach(function(data) {
				// 	data.produkKeslingNilaiNormal = data.id,
				// 	data.keterangan = data.keterangan,
				// 	data.nilai - data.nilai

				// 	$scope.item.pemeriksaanLimbahDetail.push(data);
				// 	console.log(JSON.stringify(data));
				// 	debugger;
				// })

				var data = {
					"jenisPemeriksaan" : $scope.item.jenisPemeriksaan,
					"tanggalPemeriksaan" : $scope.item.tanggalpengujian,
					"pemeriksaanLimbahDetail" : $scope.item.pemeriksaanLimbahDetail
				}

				console.log(JSON.stringify(data));
			};
		}
	]);
});