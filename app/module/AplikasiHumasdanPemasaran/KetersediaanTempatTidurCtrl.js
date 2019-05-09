define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('KetersediaanTempatTidurCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', 'ModelItemAkuntansi',
		function($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, modelItemAkuntansi){
			$scope.title = "";
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.isRouteLoading=false;
			loadDataCombo();

			$scope.item = {};

			function loadDataCombo(){
				
				// modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-data-produk", true, true, 20).then(function(data) {
    //                 $scope.listProduk=data;
    //             });

                modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-combo?", true).then(function(dat){
                	$scope.ListKelas=dat.kelaskamar;
                	$scope.ListRuangan=dat.ruanganrawatinap;
                })
                LoadDataViewBed();
                LoadData();
			}

			function LoadData(){
				$scope.isRouteLoading=true;
				var nmR = "";
				if ($scope.item.ruangan != undefined) {
					nmR ='namaruangan=' + $scope.item.ruangan.namaruangan;
				}
				// var nmK = "";
				// if ($scope.item.namaKamar != undefined) {
				// 	nmK ='&namakamar=' + $scope.item.namaKamar;
				// }
				var nmK = "";
				if ($scope.item.kelas != undefined) {
					nmK ='&idkelas=' + $scope.item.kelas.id;
				}
				// var Stt = "";
				// if ($scope.item.status != undefined) {
				// 	Stt ='&idstatusbed=' + $scope.item.status.id;
				// }
				modelItemAkuntansi.getDataTableMaster("tarif/view-bed?" + nmR + nmK).then(function(data){
					// debugger;
					var no = 0;
					for (var i = 0; i < data.length; i++) {
						no = no + 1;
						data[i].no = no;
					}
					var arrRuang = [];
					var arrKamar = [];
					var arrTT = [];
					var arr = [];
					var arrayS = {};
					var arrayK = {};
					var arrayM = {};
					var stt=true;
					for (var i = 0; i < data.length; i++) {
						arrayM={idtempattidur:data[i].idtempattidur,
								idruangan:data[i].idruangan,
								namaruangan:data[i].namaruangan,
								idkamar:data[i].idkamar,
								namakamar:data[i].namakamar,
								reportdisplay:data[i].reportdisplay,
								nomorbed:data[i].nomorbed,
								idstatusbed:data[i].idstatusbed,
								statusbed:data[i].statusbed};
						arrTT.push(arrayM)
					}
					for (var i = 0; i < data.length; i++) {
						//kamar
						stt=true;
						for (var j = 0; j < arrKamar.length; j++) {
							if (data[i].idkamar == arrKamar[j].idkamar) {
								arrKamar[j].qtyBed = arrKamar[j].qtyBed +1;
								if (data[i].idstatusbed == 1) {
									arrKamar[j].isi = arrKamar[j].isi +1;
								}else{
									arrKamar[j].kosong = arrKamar[j].kosong +1;
								}
								stt=false;
							}
						}
						if (stt == true) {
							var arrTTT = [];
							for (var j = 0; j < arrTT.length; j++) {
								if (arrTT[j].idkamar == data[i].idkamar) {
									arrTTT.push(arrTT[j]);
								}
							}
							
							if (data[i].idstatusbed == 1) {
								arrayK={idruangan:data[i].idruangan,
										idkamar:data[i].idkamar,
										namakamar:data[i].namakamar,
										idkelas:data[i].idkelas,
										namakelas:data[i].namakelas,
										qtyBed:1,
										isi:1,
										kosong:0,
										tempattidur:arrTTT};
							}else{
								arrayK={idruangan:data[i].idruangan,
										idkamar:data[i].idkamar,
										namakamar:data[i].namakamar,
										idkelas:data[i].idkelas,
										namakelas:data[i].namakelas,
										qtyBed:1,
										isi:0,
										kosong:1,
										tempattidur:arrTTT};
							}
							arrKamar.push(arrayK);
						}
						
						
					}
					for (var i = 0; i < data.length; i++) {
						//ruang
						stt=true;
						for (var j = 0; j < arrRuang.length; j++) {
							if (data[i].idruangan == arrRuang[j].idruangan) {
								arrRuang[j].qtyBed = arrRuang[j].qtyBed +1;
								if (data[i].idstatusbed == 1) {
									arrRuang[j].isi = arrRuang[j].isi +1;
								}else{
									arrRuang[j].kosong = arrRuang[j].kosong +1;
								}
								stt=false;
							}
						}
						if (stt == true) {
							var arrTTT = [];
							for (var j = 0; j < arrKamar.length; j++) {
								if (arrKamar[j].idruangan == data[i].idruangan) {
									arrTTT.push(arrKamar[j]);
								}
							}
							if (data[i].idstatusbed == 1) {
								arrayS={idruangan:data[i].idruangan,
										namaruangan:data[i].namaruangan,
										qtyBed:1,
										isi:1,
										kosong:0,
										kamar:arrTTT};
							}else{
								arrayS={idruangan:data[i].idruangan,
										namaruangan:data[i].namaruangan,
										qtyBed:1,
										isi:0,
										kosong:1,
										kamar:arrTTT};
							}
							
							arrRuang.push(arrayS);
						}
						
					}
					$scope.isRouteLoading=false;
					$scope.dataSource2=arrRuang;
				});
			}

			function LoadDataViewBed(){
				$scope.isRouteLoading=true;
				var nmR = "";
				if ($scope.item.ruangan != undefined) {
					nmR ='namaruangan=' + $scope.item.ruangan.namaruangan;
				}
				// var nmK = "";
				// if ($scope.item.namaKamar != undefined) {
				// 	nmK ='&namakamar=' + $scope.item.namaKamar;
				// }
				var nmK = "";
				if ($scope.item.kelas != undefined) {
					nmK ='&idkelas=' + $scope.item.kelas.id;
				}
				// var Stt = "";
				// if ($scope.item.status != undefined) {
				// 	Stt ='&idstatusbed=' + $scope.item.status.id;
				// }
				modelItemAkuntansi.getDataTableTransaksi("humas/get-ketersediaan-tempat-tidur-view?" + nmR + nmK).then(function(data){
					debugger;
					var dataView = data[0];
					$scope.infoKamar = [
						{
							"id": "1",
							"title": "Tempat Tidur Terpakai",
							"value": dataView.kamarisi,
							"path": "stylesheets/redbed.png"
						},
						{
							"id": "2",
							"title": "Tempat Tidur Kosong",
							"value": dataView.kamarkosong,
							"path": "stylesheets/greenbed.png"
						},
						{
							"id": "2",
							"title": "Sedang Dalam Proses Administrasi",
							"value": dataView.kamarprosesadmin,
							"path": "stylesheets/yellow.png"
						},
						{
							"id": "4",
							"title": "Total Tempat Tidur",
							"value": dataView.kamartotal,
							"path": "stylesheets/greybed.png"
						}
					];
						// 	// $scope.item.kosong = data.data.data.Kosong;
						// 	// debugger;
				});
			}

			$scope.SearchData = function(){
				LoadData();
				LoadDataViewBed();
			}

			$scope.columnPencatatanPiutang = [
			{
				"field": "no",
				"title": "No",
				"width" : "50px",
			},
			{
				"field": "namaruangan",
				"title": "Nama Ruangan",
				"width" : "150px",
			},
			{
				"field": "namakamar",
				"title": "Nama Kamar",
				"width" : "150px",
			},
			{
				"field": "reportdisplay",
				"title": "Nama Bed",
				"width" : "150px",
			},
			{
				"field": "nomorbed",
				"title": "No Bed",
				"width" : "80px",
			},
			{
				"field": "statusbed",
				"title": "Status",
				"width" : "80px",
			}
			];
			$scope.columnPencatatanPiutang2 = [
			{
				"field": "namaruangan",
				"title": "Nama Ruangan",
				"width" : "150px",
			},
			{
				"field": "qtyBed",
				"title": "Qty Bed",
				"width" : "80px",
			},
			{
				"field": "isi",
				"title": "Jumlah Bed Isi",
				"width" : "80px",
			},
			{
				"field": "kosong",
				"title": "Jumlah Bed Kosong",
				"width" : "80px",
			}
			];

			$scope.data2 = function(dataItem) {
				return {
						dataSource: new kendo.data.DataSource({
							data: dataItem.kamar
						}),
              			columns: [
						{
							"field": "namakamar",
							"title": "Nama Kamar",
							"width" : "150px",
						},
						{
							"field": "namakelas",
							"title": "Kelas",
							"width" : "100px",
						},
						{
							"field": "qtyBed",
							"title": "Qty Bed",
							"width" : "80px",
						},
						{
							"field": "isi",
							"title": "Jumlah Bed Isi",
							"width" : "80px",
						},
						{
							"field": "kosong",
							"title": "Jumlah Bed Kosong",
							"width" : "80px",
						}
					]
				}
			};	
			$scope.data3 = function(dataItem) {
				return {
						dataSource: new kendo.data.DataSource({
							data: dataItem.tempattidur
						}),
              			columns: [
              			{
							"field": "reportdisplay",
							"title": "Nama Bed",
							"width" : "150px"//,
							//"template": "<input  class='k-textbox' ng-model='dataModelGrid[#: idtempattidur #].reportdisplay'/>"
						},
						{
							"field": "nomorbed",
							"title": "No Bed",
							"width" : "80px"
						},
						{
							"field": "statusbed",
							"title": "Status",
							"width" : "80px"
						}
					]
				}
			};	

			// $scope.$watch('item.ruangan', function(date) {
			// 	var ruangan = $scope.item.ruangan.id;
			// 	$scope.item.kelas = "";
			// 	ManageSarpras.getOrderList("ketersediaan-tempat-tidur/get-kelas-by-ruangan/"+ruangan+"/").then(function(data){
			// 		$scope.sourceKelas = data.data.data;
			// 	});   
   //          });

			$scope.columnKamar = [
				{
					"field": "namaKamar",
					"title": "Kamar"
				},
				{
					"field": "namaKelas",
					"title": "Kelas"
				},
				{
					"field": "tempatTidurTerpakai",
					"title": "Tempat Tidur Isi"
				},
				{
					"field": "tempatTidurKosong",
					"title": "Tempat Tidur Kosong"
				},
				{
					"field": "tempatTidurProsesAdministrasi",
					"title": "Sedang Dalam Proses Administrasi"
				}
			];

			// ManageSarpras.getOrderList("ketersediaan-tempat-tidur/get-ruangan-rawat-inap/").then(function(data){
			// 	// debugger;
			// 	$scope.sourceRuangan = data.data.data;
			// });

			// ManageSarpras.getOrderList("ketersediaan-tempat-tidur/find-ketersediaan-tempat-tidur/").then(function(data){
			// 	$scope.infoKamar = [
			// 		{
			// 			"id": "1",
			// 			"title": "Tempat Tidur Terpakai",
			// 			"value": data.data.data.Terpakai,
			// 			"path": "stylesheets/redbed.png"
			// 		},
			// 		{
			// 			"id": "2",
			// 			"title": "Tempat Tidur Kosong",
			// 			"value": data.data.data.Kosong,
			// 			"path": "stylesheets/greenbed.png"
			// 		},
			// 		{
			// 			"id": "2",
			// 			"title": "Sedang Dalam Proses Administrasi",
			// 			"value": data.data.data.Proses,
			// 			"path": "stylesheets/yellow.png"
			// 		},
			// 		{
			// 			"id": "4",
			// 			"title": "Total Tempat Tidur",
			// 			"value": data.data.data.Total,
			// 			"path": "stylesheets/greybed.png"
			// 		}
			// 	];
			// 	// $scope.item.kosong = data.data.data.Kosong;
			// 	// debugger;
			// });	

		$scope.batal = function(){
			 $scope.item= {};
		}			

		$scope.now = new Date();
		$scope.tanggal = DateHelper.getTanggalFormatted($scope.now);
		var HH = $scope.now.getHours();
		var mm = $scope.now.getMinutes();
		var ss = $scope.now.getSeconds();
		if(HH<10) HH = "0" + HH;
		if(mm<10) mm = "0" + mm;
		if(ss<10) ss = "0" + ss;
		$scope.jam = HH + ":" + mm + ":" + ss;

		$scope.Search = function(){
			var ruangan = $scope.item.ruangan.id;
			var kelas = $scope.item.kelas.id;
			// console.log(JSON.stringify(kamar));

			ManageSarpras.getOrderList("ketersediaan-tempat-tidur/find-kamar-by-ruangan-and-kelas/"+ruangan+"/"+kelas).then(function(data){
				// debugger;
				$scope.sourceInfoKamar = data.data.data;
			});
		}
	}])
})