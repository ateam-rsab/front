

define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('dataKendaliCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'dataRupService',
		function($rootScope, $scope, $state, ModelItem, DateHelper, dataRupService) {
			// ModelItem.get("PengajuanUsulan/dataRup").then(function(data) {
			// 	$scope.item = data;
			// 	$scope.now = new Date();
			// 	$scope.dataVOloaded = true;
			// }, function errorCallBack(err) {});

			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.isKegiatan = true;
			$scope.isAsalProduk = true;

			dataRupService.getData("Pengendali&select=*", true).then(function(dat){
				$scope.listPengendali = dat.data;
			});

			// $scope.listFilters = [
			// 	{"kd": "noRec", "name": "No. Record"},
			// 	{"kd": "detail", "name": "Detail"},
			// 	{"kd": "spek", "name": "Spesifikasi"},
			// 	{"kd": "kegiatan", "name": "Kegiatan"}
			// ];

			dataRupService.getData("Kegiatan&select=id,kodeKegiatan,namaKegiatan", true).then(function(dat){
				$scope.listKegiatan = dat.data;
			});

			$scope.$watch('item.kegiatan', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                dataRupService.getDataRup('detail-rup/get-asal-produk/?kegiatanId=' + e.id, true).then(function(dat){
                	$scope.listSumberDana = dat.data.asalProduk;
                });
                $scope.isKegiatan = false;
            })
            $scope.$watch('item.sumberDana', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                dataRupService.getDataRup('detail-rup/get-mata-anggaran/?asalProdukId=' + e.id, true).then(function(dat){
                	$scope.listAkun = dat.data.mataAnggaran;
                });
                $scope.isAsalProduk = false;
            })
			// dataRupService.getDataRUP("detail-rup/pre-add-kartu-pengendali", true).then(function(dat){
			// 	$scope.dataRupLengkap = dat.data.data;
			// 	$scope.dataRupLengkap.forEach(function(data){
			// 		var date1 = data.pelaksanaanPemilihanAwal;
			// 		var date2 = data.pelaksanaanPemilihanAhir;
			// 		var date3 = data.pelaksanaanPekerjaanAwal;
			// 		var date4 = data.pelaksanaanPekerjaanAhir;
			// 		var date5 = new Date(data.tanggalPengajuan);

			// 		if (date1 == 0 ) {
			// 			data.pelaksanaanPemilihanAwal = '-';
			// 		} else {
			// 			data.pelaksanaanPemilihanAwal = DateHelper.getPeriodeFormatted(new Date(data.pelaksanaanPemilihanAwal));
			// 		}

			// 		if (date2 == 0) {
			// 			data.pelaksanaanPemilihanAhir = '-';
			// 		} else {
			// 			data.pelaksanaanPemilihanAhir = DateHelper.getPeriodeFormatted(new Date(data.pelaksanaanPemilihanAhir));
			// 		}

			// 		if (date3 == 0) {
			// 			data.pelaksanaanPekerjaanAwal = '-';
			// 		} else {
			// 			data.pelaksanaanPekerjaanAwal = DateHelper.getPeriodeFormatted(new Date(data.pelaksanaanPekerjaanAwal));
			// 		}

			// 		if (date4 == 0) {
			// 			data.pelaksanaanPekerjaanAhir = '-';
			// 		} else {
			// 			data.pelaksanaanPekerjaanAhir = DateHelper.getPeriodeFormatted(new Date(data.pelaksanaanPekerjaanAhir));
			// 		}

			// 		data.tanggalPengajuan = DateHelper.getPeriodeFormatted(date5);

			// 	})
			// });

			$scope.cariRup = function() {
				var listRawRequired = [
                    "item.dari|k-ng-model|Awal periode pencarian",
                    "item.sampai|k-ng-model|Akhir periode pencarian",
                    "item.kegiatan|k-ng-model|Nama kegiatan",
                    "item.sumberDana|k-ng-model|Sumber dana",
                    "item.namaAkun|k-ng-model|Mata anggaran"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
					var tglAwal, tglAKhir;
					tglAwal = DateHelper.getPeriodeFormatted($scope.item.dari);
					tglAKhir = DateHelper.getPeriodeFormatted($scope.item.sampai);

					dataRupService.getDataRUP("detail-rup/pre-add-kartu-pengendali?akunId="+$scope.item.namaAkun.id+"&kegiatanId="+$scope.item.kegiatan.id+"&asalProdukId="+$scope.item.sumberDana.id+"&dateStart="+tglAwal+"&dateEnd="+tglAKhir, true).then(function(dat){
						$scope.dataRupLengkap = dat.data.data;
						debugger;

						$scope.dataRupLengkap.forEach(function(data){
							var date6 = new Date(data.pelaksanaanPemilihanAwal);
							var date7 = new Date(data.pelaksanaanPemilihanAhir);
							var date8 = new Date(data.pelaksanaanPekerjaanAwal);
							var date9 = new Date(data.pelaksanaanPekerjaanAhir);
							var date10 = new Date(data.tanggalPengajuan);


							data.pelaksanaanPemilihanAwal = DateHelper.getPeriodeFormatted(date6);
							data.pelaksanaanPemilihanAhir = DateHelper.getPeriodeFormatted(date7);
							data.pelaksanaanPekerjaanAwal = DateHelper.getPeriodeFormatted(date8);
							data.pelaksanaanPekerjaanAhir = DateHelper.getPeriodeFormatted(date9);
							data.tanggalPengajuan = DateHelper.getPeriodeFormatted(date10);

						})
					});
				} else {
                    ModelItem.showMessages(isValid.messages);
                }
			}
			// $scope.dataSource = new kendo.data.DataSource({
			// 	pageSize: 2,
			// 	data: [],
			// 	autoSync: true
			// });

			$scope.mainGridOptions = {
				pageable: true,
				filterable: {
                    extra: false,
                    operators: {
                        string: {
                             contains: "Contains"
                        }
                    }
                },
				columns: [
				// {
				// 	field: "namaKegiatan",
				// 	title: "Kegiatan",
				// 	width: 400
				// },
				// {
				// 	field: "kegiatanDetail",
				// 	title: "Detail Kegiatan",
				// 	width: 275
				// },
				{
					field: "namaKomponen",
					title: "Komponen",
					width: 150,
					filterable: false
				},
				{
					field: "sumberDana",
					title: "Sumber Dana",
					width: 170,
					filterable: false
				},
				{
					field: "spesifikasi",
					title: "Nama Paket Pengadaan",
					width: 220
				},
				{
					field: "namaProduk",
					title: "Nama Produk",
					width: 220
				},
				{
					field: "tahun",
					title: "Tahun<br/>Anggaran",
					width: 100,
					filterable: false
				},
				{
					field: "tanggalPengajuan",
					title: "Tanggal Pengajuan",
					width: 100,
					filterable: false
				},
				// {
				// 	field: "namaSatuan",
				// 	title: "Satuan",
				// 	width: 100
				// },
				{	title: "Pelaksanaan Pemilihan",
					columns: [{
						field: "pelaksanaanPemilihanAwal",
						title: "Awal",
						width: 100,
					filterable: false
					},
					{
						field: "pelaksanaanPemilihanAhir",
						title: "Akhir",
						width: 100,
					filterable: false
					}]
				},
				{
					title: "Pelaksanaan Pekerjaan",
					columns: [
					{
						field: "pelaksanaanPekerjaanAwal",
						title: "Awal",
						width: 100,
					filterable: false
					},
					{
						field: "pelaksanaanPekerjaanAhir",
						title: "Akhir",
						width: 100,
					filterable: false
					}]
				},
				{
					field: "jumlahBiaya",
					title: "Total Biaya",
					width: 100,
					format: "{0:n0}",
					attributes: {
						style: "text-align:right"
					},
					filterable: false
				},
				// {
				// 	field: "keterangan",
				// 	title: "Keterangan",
				// 	width: 300,
				// 	filterable: false
				// }
				],
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

		  //   $scope.verifikasiBaru = function(data) {
		  //   	var arrDataRup = [];

		  //   	$scope.data.forEach(function(data){
		  //   		// var temp = {
		  //   		// 	"noRec": data.noRec
		  //   		// }

		  //   		arrDataRup.push(data.noRec)
		  //   		console.log(JSON.stringify(arrDataRup));
		  //   		// debugger;
		  //   	})

				// $state.go('PenyusunanRUP', {
	   //              noRec: arrDataRup
	   //          });

	   //          // debugger;

				// // ManageSarpras.saveDataSarPras(data, "anggaran/save-verifikasi-spek-anggaran").then(function(e){
				// // 	console.log(JSON.stringify(e.data));
				// // })
		  //   }

		    $scope.buatKartuBaru = function(data) {
		    	var arrDataRup = [];

		    	$scope.data.forEach(function(data){
		    		// var temp = {
		    		// 	"noRec": data.noRec
		    		// }

		    		arrDataRup.push(data.noRecSpek)
		    		console.log(JSON.stringify(arrDataRup));
		    		// debugger;
		    	})
				$state.go('KartuPengendali', {
	                noRec: arrDataRup,
	                idMataAng: $scope.item.namaAkun.id,
	                idAsalProd: $scope.item.sumberDana.id
	            });

	            debugger;

				// ManageSarpras.saveDataSarPras(data, "anggaran/save-verifikasi-spek-anggaran").then(function(e){
				// 	console.log(JSON.stringify(e.data));
				// })
		    }

		    $scope.batal = function() {
		    	$scope.item = {};
		    	$scope.now = new Date();
		    	$scope.dataRupLengkap = new kendo.data.DataSource({
			    	data: []
			    });
		    }

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