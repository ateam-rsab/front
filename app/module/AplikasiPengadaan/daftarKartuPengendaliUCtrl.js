define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('daftarKartuPengendaliUCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'dataRupService', 'ManageSarpras',
		function($rootScope, $scope, $state, DateHelper, dataRupService, ManageSarpras) {
			// ModelItem.get("PengajuanUsulan/dataRup").then(function(data) {
			// }, function errorCallBack(err) {});

			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.lihatDetail = false;
			$scope.downloadHPS = true;
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
				dataRupService.getDataRUP("kartu-pengendali/kartu-pengendali-header-list?isUlp=true", true).then(function(dat){
				
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

				dataRupService.getDataRUP("kartu-pengendali/kartu-pengendali-header-list?isUlp=true"+tgl, true).then(function(dat){
					
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
					width: 150,
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
				// console.log(JSON.stringify(current));

				if ($scope.current.namaPengendali === "Bagian Medik") {

					$scope.lihatDetail = false;
					$scope.downloadHPS = true;
				} else {

					$scope.lihatDetail = true;
					$scope.downloadHPS = false;
				}
			}

			$scope.handleChange = function(data, dataItem, columns) {
		      	$scope.data = data;
		      	$scope.columns = columns;
		      	$scope.dataItem = dataItem;

		      	// console.log(data);
		      	// debugger;
		    };
			
			$scope.notf1Options = {
	            position: {
	                pinned: true,
	            	top: 30,
	                right: 30
	            },
	            autoHideAfter: 0,
	            stacking: "down",
	            templates: [{
	                type: "ngTemplate",
	                template: $("#notificationTemplate").html()
	            }]
	        };

	        $scope.showPopup = function () {
	            $scope.notf1.show({
	                title: "Informasi",
	                message: $scope.messages
	            }, "ngTemplate");
	        }
		    $scope.verifikasi = function(data) {
	    		var arrVerifikasi = [];

	    		var getDetail = $scope.current;
		    	console.log(getDetail);

	    		if (getDetail.isVerifikasi === "[\"VERIFIKASI_PPK\"]") {

	    			arrVerifikasi.push(getDetail.noRec)

	    		} else {
	    			$scope.messages = "Data sudah di verifikasi!";
	    			$scope.showPopup();
	    		}

		    	if (arrVerifikasi.length > 0) {

		    		console.log(JSON.stringify(arrVerifikasi));
		    		debugger;

		    		$state.go('VerifikasiKartuPengendaliUlp', {
		                noRec: arrVerifikasi
		            });
		    	}
		    }
		    $scope.download = function (){
		    	var noFile = $scope.current.noRec;
		    	dataRupService.getDownload("kartu-pengendali/generate-template-exel?noRec="+noFile).then(function(e){
					// console.log(e);
					window.open(e.config.url, '_blank');
					// debugger;
				});
		  //   	window.open("http://172.16.16.79:8888/jasamedika-web/kartu-pengendali/generate-template-exel?noRec="+noFile,'_blank');
		  // //   	dataRupService.getDownload("kartu-pengendali/generate-template-exel?noRec="+noFile, true).then(function(e){
				// // 	console.log(e);
				// // });

		    }
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

		    $scope.buatJadwal = function(data) {

				$state.go('JadwalSeleksiPrakualifikasi', {
	                noRec: $scope.current.noRec
	            });
		    }
		    $scope.detail = function(data) {

				$state.go('DetailUsulanPPK', {
	                noRec: $scope.current.noRec
	            });
		    }
		    $scope.rekapPemenang = function(data) {

				$state.go('RekapPemenangULP', {
	                noRec: $scope.current.noRec
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