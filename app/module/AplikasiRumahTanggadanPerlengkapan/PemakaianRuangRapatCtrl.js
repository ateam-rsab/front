define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PemakaianRuangRapatCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageIT', 'ManageSarpras', '$state',
		function ($rootScope, $scope, ModelItem, DateHelper, ManageIT, ManageSarpras, $state) {
			ModelItem.get("RumahTangga/PemakaianRuangRapat").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.item.noOrder = "0001";
				$scope.item.unitPemesan = "Klinik Dahlia";
			}, function errorCallBack(err) { });
			// ModelItem.getDataDummyGeneric("JenisKonsumsi", false).then(function(data) {
			//              $scope.listJenisKonsumsi = data;
			//          })

			$scope.listJenisKonsumsi = [
				{
					"id": 1,
					"name": "Makan"
				},
				{
					"id": 2,
					"name": "Snack"
				}
			];
			ModelItem.getDataDummyGeneric("Ruangan", true).then(function (data) {
				$scope.listRuanganRapat = data;
			})

			ManageIT.getItem("daftar-order-pemakaian-ruang-rapat/get-pemakaian-ruang-rapat-by-noRec?noRec=" + $state.params.noOrder).then(function (data) {
				debugger
				var dat = data.data.data[0];
				$scope.order = dat;
				$scope.noRec = dat.noRec;
				$scope.item.tglPelayananAwal = DateHelper.getTanggalJamFormatted(new Date(dat.mulaiRapat));
				$scope.item.tglPelayananAkhir = DateHelper.getTanggalJamFormatted(new Date(dat.selesaiRapat));
				$scope.daftarPenambahanKebutuhanSarana = dat.penambahanKebutuhanSarana;
				$scope.jenisKonsumsi = dat.jenisKonsumsi;
				// console.log($scope.jenisKonsumsi)
			});

			ManageSarpras.getListData("Pegawai&select=id,namaLengkap,jenisPegawaiId").then(function (data) {
				$scope.listPetugas = [];
				data = data.data;
				for (var i = 0; i < data.length; i++) {
					if (data[i].jenisPegawaiId == 10) $scope.listPetugas.push(data[i]);
				}
				// debugger;
			})

			// ModelItem.getKendoSource("Pegawai","",true).then(function(data){
			// 	$scope.listPetugas = data;
			// 	// debugger;
			// })

			$scope.arrPetugas = [{
				"petugas": {
					"id": "",
					"namaLengkap": ""
				}
			}];

			$scope.addPetugas = function () {
				var newData = {
					"petugas": {
						"id": "",
						"namaLengkap": ""
					}
				}
				$scope.arrPetugas.push(newData);
			}

			$scope.remove = function (index) {
				$scope.arrPetugas.splice(index, 1);
			}

			$scope.hari = function () {
				var hariIndo = DateHelper.DescDay($scope.item.tglRapat);
				$scope.item.cHari = hariIndo;
			}

			$scope.arrJenisKonsumsi = [];
			// $scope.cekkArrJenisKonsumsi = function (data) {

			// 	var isExist = _.find($scope.arrJenisKonsumsi, function (dataExist) {
			// 		return dataExist == data;
			// 	});

			// 	if (isExist == undefined) {
			// 		$scope.arrJenisKonsumsi.push(data);
			// 	}
			// 	else {
			// 		$scope.arrJenisKonsumsi = _.without($scope.arrJenisKonsumsi, data);
			// 	}

			// 	//
			// };

			$scope.daftarPenambahanKebutuhanSarana = new kendo.data.DataSource({
				data: []
			});
			$scope.columnPenambahanKebutuhanSarana = [
				{
					"field": "namaBarang",
					"title": "<h3>Nama Barang</h3>",
					"width": "20%"
				},
				{
					"field": "jumlah",
					"title": "<h3>Jumlah</h3>",
					"width": "20%"
				},
				{
					"field": "satuan",
					"title": "<h3>Satuan</h3>",
					"width": "20%"
				}
			];

			$scope.addDaftarPenambahanKebutuhanSarana = function () {

				var tempDataBarang = {
					"namaBarang": $scope.item.namaBarang,
					"jumlah": $scope.item.jumlah,
					"satuan": $scope.item.satuan
				}

				$scope.daftarPenambahanKebutuhanSarana.add(tempDataBarang);
				$scope.item.namaBarang = "";
				$scope.item.jumlah = "";
				$scope.item.satuan = ""

			};

			$scope.cekKonsumsi = function (konsumsi) {
				// debugger;
				// for (var i = 0; i < $scope.order.listJenisKonsumsi.length; i++) {
				// 	var kms = $scope.order.listJenisKonsumsi[i].id.toString();
				// 	var idx = kms.indexOf(konsumsi.id.toString());
				// 	// console.log(JSON.stringify(konsumsi.id));
				// 	console.log(JSON.stringify(idx));
				// 	if (idx > -1) break;
				// }
				// // console.log(JSON.stringify(konsumsi.id));
				// if (idx > -1) return true;
				// else return false;
			}

			// $scope.list = [
			// 	{

			// 	}
			// ];

			$scope.removeDaftarPenambahanKebutuhanSarana = function (e) {
				e.preventDefault();

				var grid = this;
				var row = $(e.currentTarget).closest("tr");

				$scope.tempDataBarang = $scope.daftarPenambahanKebutuhanSarana
					.filter(function (el) {
						return el.name !== grid[0].name;
					});
				grid.removeRow(row);
			};

			$scope.Save = function () {
				debugger;
				// 			var data1=[];


				// 			for (var i=0; i<$scope.listJenisKonsumsi.length;i++)
				// 			{
				// 				$scope.listJenisKonsumsi[i].isNilai= "false"  ;

				// 				for (var j=0; j<$scope.arrJenisKonsumsi.length;j++)
				// 					{	

				// 				if($scope.listJenisKonsumsi[i] == $scope.arrJenisKonsumsi[j]) 
				// 				{

				// 				//debugger;	
				// 				$scope.listJenisKonsumsi[i].isNilai= "true"  ;
				// 				}    

				// 			}
				// 		}

				// 	//	for (var i=0; i<$scope.listJenisKonsumsi.length;i++)
				// //		{
				// //		   document.writeln($scope.listJenisKonsumsi[i].name + " : " + $scope.listJenisKonsumsi[i].isNilai);	
				// //		}
				// 		$scope.item.listJenisKonsumsi = $scope.listJenisKonsumsi;
				//debugger;
				var data = {
					
					"strukOrder": {},
					
					"mapPegawaiRuangRapat": $scope.arrPetugas
				}
				console.log(JSON.stringify(data));

				ManageSarpras.saveDataSarPras(ModelItem.beforePost(data), "pemakaian-ruang-rapat/save-pemakaian-ruang-rapat/?noRec=" + $scope.order.noRecStrukOrder).then(function (e) {
					$scope.Back();
				});
			};

			$scope.Back = function () {
				$state.go("DaftarOrderPemakaianRuangRapat");
			}
		}
	]);
});