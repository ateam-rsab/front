

define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('daftarKartuPengendaliCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'dataRupService', 'ManageSarpras',
		function($rootScope, $scope, $state, DateHelper, dataRupService, ManageSarpras) {
			// ModelItem.get("PengajuanUsulan/dataRup").then(function(data) {
			// }, function errorCallBack(err) {});

			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			// dataRupService.getData("Pengendali&select=*", true).then(function(dat){
			// 	$scope.listPengendali = dat.data;
			// 	//debugger;
			// });

			// $scope.listFilters = [
			// 	{"kd": "noRec", "name": "No. Record"},
			// 	{"kd": "detail", "name": "Detail"},
			// 	{"kd": "spek", "name": "Spesifikasi"},
			// 	{"kd": "kegiatan", "name": "Kegiatan"}
			// ];

			var init = function(){
				dataRupService.getDataRUP("kartu-pengendali/kartu-pengendali-header-list?isPengendali=true", true).then(function(dat){
				
					$scope.dataRupLengkap = dat.data.data;
					$scope.dataRupLengkap.forEach(function(data){
						// var date1 = data.tanggal;
						data.tanggal = DateHelper.getPeriodeFormatted(new Date(data.tanggal));
						var isVerifikasiCustom = [];

						data.isVerifikasi.forEach(function(data){
							isVerifikasiCustom.push(data.isVerifikasi);
						})

						data.isVerifikasi = JSON.stringify(isVerifikasiCustom);

					})
				});
			}

			init();

			$scope.cariRup = function() {
				var tgl;

				if ($scope.item.dari !== undefined && $scope.item.sampai !== undefined) {
					tgl = "&dateStart="+DateHelper.getPeriodeFormatted($scope.item.dari)+"&dateEnd="+DateHelper.getPeriodeFormatted($scope.item.sampai);
				} else {
					tgl="&dateStart=&dateEnd="
				}

				dataRupService.getDataRUP("kartu-pengendali/kartu-pengendali-header-list?isPengendali=true"+tgl, true).then(function(dat){
					
					$scope.dataRupLengkap = dat.data.data;

					$scope.dataRupLengkap.forEach(function(data){

						data.tanggal = DateHelper.getPeriodeFormatted(new Date(data.tanggal));
						var isVerifikasiCustom = [];

						data.isVerifikasi.forEach(function(data){
							isVerifikasiCustom.push(data.isVerifikasi);
						})

						data.isVerifikasi = JSON.stringify(isVerifikasiCustom);

					})
				});	
			}
			// $scope.dataSource = new kendo.data.DataSource({
			// 	pageSize: 2,
			// 	data: [],
			// 	autoSync: true
			// });

			$scope.mainGridOptions = {
				pageable: true,
				columns: [
				{
					field: "noUsulan",
					title: "No Usulan",
					width: 120,
					attributes: {
						style: "text-align:center"
					}
				},
				{
					field: "tanggal",
					title: "Tanggal",
					width: 120,
					attributes: {
						style: "text-align:center"
					}
				},
				{
					field: "asalProduk",
					title: "Sumber Dana",
					width: 220
				},
				{
					field: "namaAccount",
					title: "Nama Akun",
					width: 100,
					attributes: {
						style: "text-align:center"
					}
				},
				{
					field: "kdAccount",
					title: "Mata Anggaran",
					width: 100,
					attributes: {
						style: "text-align:center"
					}
				},
				{
					field: "namaPengendali",
					title: "Pengendali",
					width: 275
				},
				{
					field: "isVerifikasi",
					title: "Status",
					width: 300,
					attributes: {
						style: "text-align:center"
					}
				},					
				// {
				// 	field: "namaProduk",
				// 	title: "Nama Produk",
				// 	width: 150
				// },
				{
					field: "totalCount",
					title: "Jumlah Item",
					width: 100,
					attributes: {
						style: "text-align:center"
					},
					template: "#=kendo.toString(totalCount, \"n0\")#"
				},
				// {
				// 	field: "hargaSatuan",
				// 	title: "Harga Satuan",
				// 	width: 100,
				// 	template: "<div class=\"pull-right\">#=kendo.toString(hargaSatuan, \"n0\")#</div>"
				// },
				{
					field: "total",
					title: "Total",
					width: 100,
					template: "<div class=\"pull-right\">#=kendo.toString(total, \"n0\")#</div>"
				}],
				//editable: true
			};

			$scope.kl = function(current){
				$scope.current = current;
				console.log(current);
			}

			$scope.handleChange = function(data, dataItem, columns) {
		      	$scope.data = data;
		      	$scope.columns = columns;
		      	$scope.dataItem = dataItem;

		      	// console.log(data);
		      	// debugger;
		    };

		    // $scope.verifikasiBaru = function(data) {
		    // 	var arrVerifikasi = [];

		    // 	$scope.data.forEach(function(data){

						// var temp = {
			   //  			"noRec": data.noRec,
			   //  			"keterangan": data.keterangan,
			   //  			"isVerifikasi": data.isVerifikasi
			   //  		}

		    // 			arrVerifikasi.push(temp)
			   //  		// console.log(JSON.stringify(arrVerifikasi));
			   //  		// debugger;

			   //  		var data = {
						// 	"detailSpekAnggaran": arrVerifikasi
						// }
						// 	console.log(JSON.stringify(data));

						// ManageSarpras.saveDataSarPras(data, "anggaran/save-verifikasi-spek-anggaran").then(function(e){
						// 	console.log(JSON.stringify(e.data));
						// })
		    		
		    // 	})
		    // }

		    $scope.lihatDetail = function(data) {

		    	var getDetailID = $scope.current.noRec;

				$state.go('DetailKartuPengendali', {
	                noRec: getDetailID
	            });
		    }

		    $scope.verifikasiKartuPengendali = function(data) {
		    	var arrDataRup = [];

		    	$scope.data.forEach(function(data){
		    		var temp = {
		    			"noRec": data.noRec
		    		}

		    		arrDataRup.push(temp)
		    		// console.log(JSON.stringify(arrDataRup));
		    		// debugger;
		    	})

				// $state.go('VerifikasiUsulan', {
	   //              noRec: arrDataRup
	   //          });
				var data = {
				    "kartuPengendaliDetail": arrDataRup
   				}

   				// console.log(JSON.stringify(data));
   				// debugger;

	            ManageSarpras.saveDataSarPras(data, "kartu-pengendali/verifikasi-kartu-pengendali-by-anggaran/").then(function(e){
					console.log(JSON.stringify(e.data));
					init();
					// debugger;
				})

	            // debugger;

				// ManageSarpras.saveDataSarPras(data, "anggaran/save-verifikasi-spek-anggaran").then(function(e){
				// 	console.log(JSON.stringify(e.data));
				// })
		    }

		    $scope.editKartuPengendali = function(data) {
		    	var arrDataRup = [];

		    	$scope.data.forEach(function(data){
		    		// var temp = {
		    		// 	"noRec": data.noRec
		    		// }

		    		arrDataRup.push(data.noRec)
		    		// console.log(JSON.stringify(arrDataRup));
		    		// debugger;
		    	})

				// $state.go('KartuPengendali', {
	   //              noRec: arrDataRup
	   //          });

	            // debugger;

				// ManageSarpras.saveDataSarPras(data, "anggaran/save-verifikasi-spek-anggaran").then(function(e){
				// 	console.log(JSON.stringify(e.data));
				// })
		    }

		    $scope.doTheBack = function() {
			  	window.history.back();
			};

			// $scope.NavToVerifikasi = function() {
			// 	if ($scope.item.filters.kd == "noRec") 
	  //           $state.go('PenyusunanRUP', {
	  //               noRec: $scope.current.noRec,
	  //               filter: $scope.item.filters.kd
	  //           });

	  //       	if ($scope.item.filters.kd == "detail") 
	  //           $state.go('PenyusunanRUP', {
	  //               noRec: $scope.current.noRecDetail,
	  //               filter: $scope.item.filters.kd
	  //           });

	  //       	if ($scope.item.filters.kd == "spek") 
	  //           $state.go('PenyusunanRUP', {
	  //               noRec: $scope.current.noRecSpek,
	  //               filter: $scope.item.filters.kd
	  //           });

	  //       	if ($scope.item.filters.kd == "kegiatan") 
	  //           $state.go('PenyusunanRUP', {
	  //               noRec: $scope.current.noRecKegiatan,
	  //               filter: $scope.item.filters.kd
	  //           });
	  //           //debugger;
	  //       };

	   //      $scope.buatKartuPengendali = function() {
				// if ($scope.item.filters.kd == "noRec") 
	   //          $state.go('KartuPengendali', {
	   //              noRec: $scope.current.noRec,
	   //              filter: $scope.item.filters.kd
	   //          });

	   //      	if ($scope.item.filters.kd == "detail") 
	   //          $state.go('KartuPengendali', {
	   //              noRec: $scope.current.noRecDetail,
	   //              filter: $scope.item.filters.kd
	   //          });

	   //      	if ($scope.item.filters.kd == "spek") 
	   //          $state.go('KartuPengendali', {
	   //              noRec: $scope.current.noRecSpek,
	   //              filter: $scope.item.filters.kd
	   //          });

	   //      	if ($scope.item.filters.kd == "kegiatan") 
	   //          $state.go('KartuPengendali', {
	   //              noRec: $scope.current.noRecKegiatan,
	   //              filter: $scope.item.filters.kd
	   //          });
	   //          //debugger;
	   //      };

		}
		]);
});