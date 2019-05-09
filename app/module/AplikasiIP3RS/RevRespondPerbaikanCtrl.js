define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RevRespondPerbaikanCtrl', ['$rootScope', '$scope', 'ModelItem','IPSRSService', 'DateHelper', '$state', '$location', 'socket', '$window', '$mdDialog',
		function($rootScope, $scope, ModelItem, IPSRSService, DateHelper, $state, $location, socket, $window, $mdDialog) {
			$scope.isLoadingData = true;
			$scope.AllData = true;
			$scope.dataVOloaded = true;
			$scope.showUser = true;
			$scope.showAdmin = true;	
			$scope.item = {};
			$scope.now = new Date();
			$scope.init = function(){
			debugger
			IPSRSService.getItem("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function(dat){
				debugger
				$scope.ruangan = dat.data.namaRuangan;
				$scope.idRuangan = dat.data.id;
				$scope.item.noOrder = "";
				$scope.item.jenisOrder = {	
					"id":null,
					"name":""
				};
				$scope.item.dateStart = "";
				$scope.item.dateEnd = "";
				if ($scope.idRuangan == 229) {
					$scope.showUser = false;
					$scope.showAdmin = true;
				} else {
					$scope.showUser = true;
					$scope.showAdmin = false;
				}
				if ($scope.idRuangan == 229) {
				//service Old
				IPSRSService.getItem("psrsPermintaanPerbaikan/get-informasi-perbaikan-masuk/", true).then(function(dat){
				// IPSRSService.getItem("psrsPermintaanPerbaikan/get-lap-permintaan-perbaikan", true).then(function(dat){
				 debugger
				 $scope.listData = dat.data.data;
				 $scope.listDataRespon = dat.data.data;
				 for(var i = 0; i<$scope.listDataRespon.length; i++){
				 	debugger
				 	if($scope.listDataRespon[i].namaTeknisi = "-"){
					   $scope.listDataRespon[i].dataStatusPending = "Pending";
					}else{
					   $scope.listDataRespon[i].dataStatusPending = "Sudah Dikerjakan";
					}
					switch($scope.listDataRespon[i].dataStatusPending){
						 case "Pending" :
                             $scope.listDataRespon[i].myStyle = {'background-color': '#FFFF00'};
                         break;
                         case "Sudah Dikerjakan" :
                             $scope.listDataRespon[i].myStyle = {'background-color': '#9ACD32'};
                         break;
					}

				  }
					$scope.nomor = 1
					$scope.listData.forEach(function(data){
						var date1 = new Date(data.tanggalOrder);
						data.tanggalOrder = DateHelper.getTanggalFormatted(date1);
						data.no = $scope.nomor++;
					});
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listData
					});
					$scope.isLoadingData = false;
					$scope.AllData = false;
				});

				$("#grud").kendoGrid({
				    dataSource: $scope.dataSource,
				    rowTemplate:'<tr class="#:noOrder==\"PBK-0000215\"? \"yellow\" : \"red\"#"><td>#: no #</td><td>#: noOrder #</td><td>#: ruanganPemesan #</td><td>#: userPemesan #</td><td>#: noRespon #</td><td>#: namaTeknisi #</td><td>#: noVerifikasi #</td><td>#: noVerifikasi #</td></tr>'
				});
				
				// var ds = new kendo.data.DataSource({
				//     data: [{
				//         name: "foo",
				//         ReportClassDescription:"Not Express"
				//     }, {
				//         name: "bar",
				//         ReportClassDescription:"Express"
				//     }],
				//     pageSize: 10
				// });

				$scope.mainGridOptions = { 

					pageable: true,
					// columns: [
					// 	{ field:"no",title:"No" },
					// 	{ field:"noOrder",title:"No Order" },
					// 	{ field:"tglOrder",
					// 	  template: "#= new moment(new Date(tglOrder)).format('DD-MM-YYYY') #",
					// 	  title:"Tanggal Order" },
					// 	{ field:"ruanganPemesan",title:"Ruangan Pemesan" },
					// 	{ field:"userPemesan",title:"User Pemesan" },
					// 	{ field:"noRespon",title:"No Respon" },
					// 	{ field:"noVerifikasi",title:"No Verifikasi" },
					// 	{ field:"keteranganLainnya",title:"Keterangan" },
					// 	{ field:"asalSukuCadang",title:"Asal Suku Cadang" },
					// 	{ field:"keteranganOrder",title:"Keterangan Order" },
					// 	{ field:"namaTeknisi",title:"Nama Teknisi" }],
				columns: [
							{ field:"no",
 							rowTemplate: '<tr class="#:no==\"Pending\"? \"yellow\" : \"green\"#"></tr>',
							title:"No" },
							{ field:"noOrder",title:"No Order" },
							{ field:"tanggalOrder",title:"Tanggal Order" },
							{ field:"ruanganPemesan",title:"Ruangan Pemesan" },
							{ field:"userPemesan",title:"User Pemesan" },
							{ field:"noRespon",title:"No Respon" },
							{ field:"noVerifikasi",title:"No Verifikasi" },
							{ field:"keteranganLainnya",title:"Keterangan" },
							{ field:"asalSukuCadang",title:"Asal Suku Cadang" },
							{ field:"keteranganOrder",title:"Keterangan Order" },
							{ field:"namaTeknisi",title:"Nama Teknisi" },
							{ field:"dataStatusPending", title:"dataStatusPending"}
						],
						  editable: false
				   };
				} else {
					IPSRSService.getItem("psrsPermintaanPerbaikan/get-informasi-perbaikan-keluar/", true).then(function(dat){
						debugger
						$scope.listData = dat.data.data;
						$scope.nomor = 1
						$scope.listData.forEach(function(data){
							var date1 = new Date(data.tanggalOrder);
							data.tanggalOrder = DateHelper.getTanggalFormatted(date1);
							data.no = $scope.nomor++;
						});
						$scope.dataSource = new kendo.data.DataSource({
							pageSize: 10,
							data: $scope.listData
						});
						$scope.isLoadingData = false;
						$scope.AllData = false;
					});
					$scope.mainGridOptions = { 
						pageable: true,
						columns: [
							{ field:"no",title:"No" },
							{ field:"noOrder",title:"No Order" },
							{ field:"tanggalOrder",title:"Tanggal Order" },
							{ field:"ruanganPemesan",title:"Ruangan Pemesan" },
							{ field:"userPemesan",title:"User Pemesan" },
							{ field:"noRespon",title:"No Respon" },
							{ field:"noVerifikasi",title:"No Verifikasi" },
							{ field:"keteranganLainnya",title:"Keterangan" },
							{ field:"asalSukuCadang",title:"Asal Suku Cadang" },
							{ field:"keteranganOrder",title:"Keterangan Order" },
							{ field:"namaTeknisi",title:"Nama Teknisi" }],
							editable: false
					       };
				          }
                     	});
			           $scope.AllData = true;
                      };
	                 

	                $scope.init();
					$scope.klik = function(current){
						debugger
						$scope.current = current;
						$scope.item.noRecOrderPelayanan = current.noRecOrderPelayanan;
						$scope.item.statusRespon = current.noRespon;
						$scope.item.kedatangan = current.noVerifikasi;
						$scope.item.noRecKirim = current.noRecKirimProduk;
						$scope.item.keteranganOrder = current.keteranganOrder;
						$scope.item.noRec = current.noRec;
						$scope.item.asalSukuCadang = current.asalSukuCadang;
						$scope.item.noRecKirimProduk = current.noRecKirimProduk;
						$scope.item.noVerifikasi = current.noVerifikasi;
					};

					$scope.batal = function () {
							// body...
							$location.path('home');
						}
						$scope.detail = function(current){
							$state.go("DetailOrder",
							{ 	
								noRec:$scope.item.noRec
							});
						}
						$scope.perbaikan = function () {
							debugger
							if (($scope.item.statusRespon === null || $scope.item.kedatangan === null)||($scope.item.statusRespon === undefined || $scope.item.kedatangan === undefined)) {
								if($scope.item.statusRespon === undefined || $scope.item.kedatangan === undefined){
									toastr.warning("Belum memiliki Properties dari Backend, noRespon, noVerifikasi & noRecKirimProduk undefined")
								}else{
									window.messageContainer.error('Permintaan Belum di Respon / Belum Diverifikasi User');
								}
							} else if($scope.item.keteranganOrder == "Jadwal Pemeliharaan") {
								$state.go('PreventiveMaintenance',{
									noRec: $scope.item.noRec,
									noRecKirimProduk: $scope.item.noRecKirimProduk
								})
							} else {
								$state.go('FormPermintaanPerbaikan',{
									noRec: $scope.item.noRec,
									noRecKirimProduk: $scope.item.noRecKirimProduk
								})
							}
						}

						$scope.respon =  function () {
							if ($scope.item.statusRespon === null || $scope.item.statusRespon === undefined ) {
								var data = 
								{
									"noRecOrderPelayanan": $scope.item.noRecOrderPelayanan
								}
								IPSRSService.saveDataSarPras(data, "psrsPermintaanPerbaikan/kirim-perbaikan/").then(function(e) {
									$scope.init();
								});
							} else {
								window.messageContainer.error('Permintaan Sudah Direspon')
							}
						}
						$scope.verifKedatangan =  function () {
							if ($scope.item.statusRespon === null || $scope.item.statusRespon === undefined ) {
								window.messageContainer.error('Permintaan Belum Di Respon')
							} else if ($scope.item.kedatangan === null || $scope.item.kedatangan === undefined ) {
								var data = 
								{
									"noRecKirimProduk": $scope.item.noRecKirim
								}
								IPSRSService.saveDataSarPras(data, "psrsPermintaanPerbaikan/save-verifikasi-perbaikan/").then(function(e) {
									$scope.init();
								});
							} else {
								window.messageContainer.error('Kedatangan Sudah Diverifikasi')
							}
						};
						$scope.verifPekerjaan =  function () {
							if ($scope.item.statusRespon === null || $scope.item.statusRespon === undefined ) {
								window.messageContainer.error('Permintaan Belum Di Respon')
							} else if ($scope.item.kedatangan === null || $scope.item.kedatangan === undefined ) {
								window.messageContainer.error('Kedatangan Belum Di Verifikasi')
							} else if($scope.item.keteranganOrder == "Jadwal Pemeliharaan") {
								$state.go('PreventiveMaintenance',{
									noRec: $scope.item.noRec,
									noRecKirimProduk: $scope.item.noRecKirimProduk
								})
							} else {
								$state.go('FormPermintaanPerbaikan',{
									noRec: $scope.item.noRec,
									noRecKirimProduk: $scope.item.noRecKirimProduk
								})
							}
						};
						$scope.permintaanSukuCadang = function () {
							if ($scope.item.asalSukuCadang === null || $scope.item.asalSukuCadang === undefined ) {
								window.messageContainer.error('Silahkan Pilih Data')
							} else if ($scope.item.asalSukuCadang === "-" || $scope.item.asalSukuCadang === "Tidak Dengan Suku Cadang" ) {
								window.messageContainer.error('Perbaikan Tidak Memerlukan Suku Cadang')
							} else if ($scope.item.asalSukuCadang === "Suku Cadang") {
								$state.go('SukuCadangLogistik',{
									strukOrder: $scope.item.noRec
								})
							} else {
								$state.go('SukuCadangDariPihakLuar',{
									strukOrder: $scope.item.noRec
								})
							}
						}
						$scope.dataJenisOrder = [
						{	
							"id":1,
							"name":"Jadwal Pemeliharaan"
						},{	
							"id":2,
							"name":"Permintaan Perbaikan"
						},{	
							"id":3,
							"name":"Jadwal Kalibrasi"
						},{	
							"id":4,
							"name":"Jadwal Kontrak Service"
						}];
						$scope.cari = function () {
							debugger
							if ($scope.item.dateStart == "") {
								var tanggalAwal = ""
							} else {
								var tanggal1 = new Date($scope.item.dateStart);
								var tanggalAwal = DateHelper.getTanggalFormattedNew(tanggal1);
							}
							if ($scope.item.dateEnd == "") {
								var tanggalAkhir = ""
							} else {
								var tanggal2 = new Date($scope.item.dateEnd);
								var tanggalAkhir = DateHelper.getTanggalFormattedNew(tanggal2);
							}

							if ($scope.idRuangan == 229) {
								IPSRSService.getItem("psrsPermintaanPerbaikan/get-informasi-perbaikan-masuk/?dateStart="+tanggalAwal+"&dateEnd="+tanggalAkhir+"&noOrder="+$scope.item.noOrder+"&jenisOrder="+$scope.item.jenisOrder.name, true).then(function(dat){
									debugger
									// data old
									$scope.listData = dat.data.data;
									$scope.nomor = 1;
									// old foreach
									// $scope.listData.forEach(function(data){
									// 	var date1 = new Date(data.tanggalOrder);
									// 	data.tanggalOrder = DateHelper.getTanggalFormatted(date1);
									// 	data.no = $scope.nomor++;
									// });
									$scope.listData.forEach(function(data){
										data.tglOrder = data.tanggalOrder
										var date1 = new Date(data.tglOrder);
										data.tanggalOrder = DateHelper.getTanggalFormatted(date1);
										data.no = $scope.nomor++;
									});
									$scope.dataSource = new kendo.data.DataSource({
										pageSize: 10,
										data: $scope.listData
									});
								});
							} else {
								IPSRSService.getItem("psrsPermintaanPerbaikan/get-informasi-perbaikan-keluar/?dateStart="+tanggalAwal+"&dateEnd="+tanggalAkhir+"&noOrder="+$scope.item.noOrder+"&jenisOrder="+$scope.item.jenisOrder.name, true).then(function(dat){
									$scope.listData = dat.data.data;
									$scope.nomor = 1;
									$scope.listData.forEach(function(data){
										var date1 = new Date(data.tanggalOrder);
										data.tanggalOrder = DateHelper.getTanggalFormatted(date1);
										data.no = $scope.nomor++;
									});
									$scope.dataSource = new kendo.data.DataSource({
										pageSize: 10,
										data: $scope.listData
									});
								});
							}
						}
					}
					]);
		});

//columns Old/Lama
// 	columns: [
// 	{ field:"no",title:"No" },
// 	{ field:"noOrder",title:"No Order" },
// 	{ field:"tanggalOrder",title:"Tanggal Order" },
// 	{ field:"ruanganPemesan",title:"Ruangan Pemesan" },
// 	{ field:"userPemesan",title:"User Pemesan" },
// 	{ field:"noRespon",title:"No Respon" },
// 	{ field:"noVerifikasi",title:"No Verifikasi" },
// 	{ field:"keteranganLainnya",title:"Keterangan" },
// 	{ field:"asalSukuCadang",title:"Asal Suku Cadang" },
// 	{ field:"keteranganOrder",title:"Keterangan Order" },
// 	{ field:"namaTeknisi",title:"Nama Teknisi" }],
// 	editable: false
// };
//Grid Ruangan IP3RS