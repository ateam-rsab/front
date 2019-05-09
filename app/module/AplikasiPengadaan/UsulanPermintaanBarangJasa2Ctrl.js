

define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('UsulanPermintaanBarangJasa2Ctrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'dataRupService', 'ManageSarpras',
		function($rootScope, $scope, $state, DateHelper, dataRupService, ManageSarpras) {
			// ModelItem.get("PengajuanUsulan/dataRup").then(function(data) {
			// }, function errorCallBack(err) {});

			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			dataRupService.getData("Pengendali&select=*", true).then(function(dat){
				$scope.listPengendali = dat.data;
				//debugger;
			});

			// $scope.listFilters = [
			// 	{"kd": "noRec", "name": "No. Record"},
			// 	{"kd": "detail", "name": "Detail"},
			// 	{"kd": "spek", "name": "Spesifikasi"},
			// 	{"kd": "kegiatan", "name": "Kegiatan"}
			// ];

			var init = function(){
				dataRupService.getDataRUP("kartu-pengendali/kartu-pengendali-list?kelompokUser=true", true).then(function(dat){
				
					$scope.dataRupLengkap = dat.data.data;
					$scope.dataRupLengkap.forEach(function(data){
						// var date1 = data.tanggal;
						data.tanggal = DateHelper.getPeriodeFormatted(new Date(data.tanggal));
						// debugger;
						// var date2 = data.pelaksanaanPemilihanAhir;
						// var date3 = data.pelaksanaanPekerjaanAwal;
						// var date4 = data.pelaksanaanPekerjaanAhir;
						// var date5 = new Date(data.tanggalPengajuan);

						// if (date1 == 0 ) {
						// 	data.pelaksanaanPemilihanAwal = '-';
						// } else {
						// 	data.pelaksanaanPemilihanAwal = DateHelper.getPeriodeFormatted(new Date(data.pelaksanaanPemilihanAwal));
						// }

						// if (date2 == 0) {
						// 	data.pelaksanaanPemilihanAhir = '-';
						// } else {
						// 	data.pelaksanaanPemilihanAhir = DateHelper.getPeriodeFormatted(new Date(data.pelaksanaanPemilihanAhir));
						// }

						// if (date3 == 0) {
						// 	data.pelaksanaanPekerjaanAwal = '-';
						// } else {
						// 	data.pelaksanaanPekerjaanAwal = DateHelper.getPeriodeFormatted(new Date(data.pelaksanaanPekerjaanAwal));
						// }

						// if (date4 == 0) {
						// 	data.pelaksanaanPekerjaanAhir = '-';
						// } else {
						// 	data.pelaksanaanPekerjaanAhir = DateHelper.getPeriodeFormatted(new Date(data.pelaksanaanPekerjaanAhir));
						// }

						// data.tanggalPengajuan = DateHelper.getPeriodeFormatted(date5);

					})
				});
			}

			init();

			$scope.cariRup = function() {
				
				var tglAwal = DateHelper.getPeriodeFormatted($scope.item.dari);
				var tglAkhir = DateHelper.getPeriodeFormatted($scope.item.sampai);
				//debugger;

				if ($scope.item.pengendali.id !== undefined) {
					var paramPengendali = "pengendaliId=" + $scope.item.pengendali.id;
				} else {
					var paramPengendali = "pengendaliId=";
				}

				dataRupService.getDataRUP("kartu-pengendali/kartu-pengendali-list?dateStart="+tglAwal+"&dateEnd="+tglAkhir+"&"+paramPengendali, true).then(function(dat){
					
					$scope.dataRupLengkap = dat.data.data;
					//debugger;

					$scope.dataRupLengkap.forEach(function(data){
						// var date6 = new Date(data.pelaksanaanPemilihanAwal);
						// var date7 = new Date(data.pelaksanaanPemilihanAhir);
						// var date8 = new Date(data.pelaksanaanPekerjaanAwal);
						// var date9 = new Date(data.pelaksanaanPekerjaanAhir);
						var date10 = new Date(data.tanggal);


						// data.pelaksanaanPemilihanAwal = DateHelper.getTanggalFormatted(date6);
						// data.pelaksanaanPemilihanAhir = DateHelper.getTanggalFormatted(date7);
						// data.pelaksanaanPekerjaanAwal = DateHelper.getTanggalFormatted(date8);
						// data.pelaksanaanPekerjaanAhir = DateHelper.getTanggalFormatted(date9);
						data.tanggal = DateHelper.getTanggalFormatted(date10);

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

		  //   $scope.editKartuPengendali = function(data) {
		  //   	var arrDataRup = [];

		  //   	$scope.data.forEach(function(data){
		  //   		// var temp = {
		  //   		// 	"noRec": data.noRec
		  //   		// }

		  //   		arrDataRup.push(data.noRec)
		  //   		// console.log(JSON.stringify(arrDataRup));
		  //   		// debugger;
		  //   	})

				// // $state.go('KartuPengendali', {
	   // //              noRec: arrDataRup
	   // //          });

	   //          // debugger;

				// // ManageSarpras.saveDataSarPras(data, "anggaran/save-verifikasi-spek-anggaran").then(function(e){
				// // 	console.log(JSON.stringify(e.data));
				// // })
		  //   }

		    $scope.verifikasiPPK = function(data) {
		    	var arrDataRup = [];

		    	$scope.data.forEach(function(data){
		    		// var temp = {
		    		// 	"noRec": data.noRec
		    		// }

		    		arrDataRup.push(data.noRec)
		    		console.log(JSON.stringify(arrDataRup));
		    		// debugger;
		    	})

				$state.go('VerifikasiUsulan', {
	                noRec: arrDataRup
	            });

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