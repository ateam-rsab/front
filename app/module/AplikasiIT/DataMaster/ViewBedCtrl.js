define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ViewBedCtrl', ['CacheHelper','$timeout', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', '$state','DateHelper','ManageKasir',
		function(cacheHelper,$timeout, $q, $rootScope, $scope, modelItemAkuntansi,$state,dateHelper,manageKasir) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			var STRidtempattidur =0;
				
				Carii();
				// modelItemAkuntansi.getDataTableMaster("tarif/view-bed").then(function(data){
				// 	var no = 0;
				// 	for (var i = 0; i < data.length; i++) {
				// 		no = no + 1;
				// 		data[i].no = no;
				// 	}
				// 	$scope.dataSource2=data;
				// });
				modelItemAkuntansi.getDataTableMaster("tarif/list-master?jenis=statusbed").then(function(data){
					$scope.listStatus = data;
				});
				modelItemAkuntansi.getDataTableMaster("tarif/list-master?jenis=ruangan").then(function(data){
					$scope.listRuangan = data;
				});
				modelItemAkuntansi.getDataTableMaster("tarif/list-master?jenis=kamar").then(function(data){
					$scope.listKamar = data;
				});
				modelItemAkuntansi.getDataTableMaster("tarif/list-master?jenis=kelas").then(function(data){
					$scope.listkelas = data;
				});

			$scope.klik = function(current){
				//$scope.current = dataSelected;
				$scope.item.ruangan = {'id':current.idruangan,'namaruangan':current.namaruangan};
				$scope.item.kamar = {'id':current.idkamar,'namakamar':current.namakamar};
				$scope.item.namaBedEdit = current.reportdisplay;
				$scope.item.status2 = {'id':current.idstatusbed,'statusbed':current.statusbed};
				$scope.item.nomorBed = current.nomorbed;
				STRidtempattidur = current.idtempattidur;
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
			$scope.mainGridOptions = {
                pageable: true,
                toolbar: "<button class='btnTemplate1' style='width:10%' ng-click='tambahTransaksi()'>Tambah Data</button>",
                editable : true,
                scrollable:false,
				autoSync: true
            }
			$scope.Cari = function(){
				Carii();
			}
			$scope.cariii = function(){
				Carii();
			}
			function Carii(){
				var nmR = "";
				if ($scope.item.namaRuangan != undefined) {
					nmR ='namaruangan=' + $scope.item.namaRuangan;
				}
				var nmK = "";
				if ($scope.item.namaKamar != undefined) {
					nmK ='&namakamar=' + $scope.item.namaKamar;
				}
				var nmB = "";
				if ($scope.item.namaBed != undefined) {
					nmB ='&namabed=' + $scope.item.namaBed;
				}
				var Stt = "";
				if ($scope.item.status != undefined) {
					Stt ='&idstatusbed=' + $scope.item.status.id;
				}
				modelItemAkuntansi.getDataTableMaster("tarif/view-bed?" + nmR + nmK + nmB + Stt).then(function(data){
					var no = 0;
					for (var i = 0; i < data.length; i++) {
						no = no + 1;
						data[i].no = no;
					}
					debugger;
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
					// for (var i = 0; i < data.length; i++) {
					// 	arrayM={reportdisplay:data[i].reportdisplay,
					// 			nomorbed:data[i].nomorbed,
					// 			statusbed:data[i].statusbed};
					// 	for (var j = 0; j < arrKamar.length; j++) {
					// 		if (data[i].idkamar == arrKamar[j].idkamar) {
					// 			arrKamar[j].tempattidur.push(arrayM);
					// 		}
					// 		// for (var k = 0; k < arrRuang.length; k++) {
					// 		// 	if (arrKamar[j].idruangan == arrRuang[k].idruangan) {
					// 		// 		arrRuang[k].kamar.push(arrKamar[j]);
					// 		// 	}
					// 		// }
					// 	}
					// 	//arr.push();
					// }

					//$scope.dataSource2=data;
					$scope.dataSource2=arrRuang;

				});
			}
 

			$scope.detail = function(){
				$scope.changePage("DetailCollectingPiutang");
			};
			$scope.changePage = function(stateName){
				if($scope.dataSelected.noPosting != undefined)
				{
					var obj = {
						splitString : $scope.dataSelected.noPosting + "~..:."
					}

					$state.go(stateName, {
						dataCollect: JSON.stringify(obj)
					});
				}
				else
				{
					alert("Silahkan pilih data Collector terlebih dahulu");
				}
			};

			$scope.save =function(){
				debugger;
				if($scope.item.ruangan == undefined){
					alert("Nama Ruangan belum dipilih!");
					return;
				}
				debugger;
				if($scope.item.kamar == undefined){
					alert("Nama Kamar belum dipilih!");
					return;
				}
				debugger;
				if($scope.item.namaBedEdit == undefined){
					alert("Nama Bed belum diisi!");
					return;
				}
				debugger;
				if($scope.item.status2 == undefined){
					alert("Status belum dipilih!");
					return;
				}
				debugger;
				if($scope.item.nomorBed == undefined){
					alert("No Bed belum diisi!");
					return;
				}
				var dataObjPost = {};
				dataObjPost = {idruangan : $scope.item.ruangan.id,
					idtempattidur: STRidtempattidur,
					idkamar: $scope.item.kamar.id,
					idstatusbed: $scope.item.status2.id,
					nomorbed: $scope.item.nomorBed,
					namabed: $scope.item.namaBedEdit
				}
				manageKasir.SaveBed(dataObjPost).then(function(e) {
				})
				

				Carii();
			}
          ////////////////////////////////////////////////////////////

		}
]);
});