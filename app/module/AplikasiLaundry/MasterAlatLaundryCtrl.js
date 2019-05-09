define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterAlatLaundryCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageLaundry', 'FindSarpras',
		function ($rootScope, $scope, ModelItem, $state, ManageLaundry, FindSarpras) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function (data) {
				$scope.item = {};
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });
			$scope.no = 1;

			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function (data) {
				$scope.listPenandatangan = data;
			})

			ManageLaundry.getOrderList("alat/get-mesin-aset", true).then(function (dat) {
				$scope.ListMesin = dat.data.data;
			});

			$scope.batton = function () {
				if ($scope.item.nama == $scope.item.nama) {
					$scope.item.xx = $scope.item.nama.noRegisterAset
					$scope.yy = $scope.item.nama.produkId
					$scope.item.zz = $scope.item.nama.namaProduk
					$scope.item.uu = $scope.item.nama.noRec
				}
			}

			$scope.auo = function () {
				if ($scope.item.satuan == $scope.item.satuan) {
				}
			}

			ManageLaundry.getOrderList("alat/get-departemen-laundry", true).then(function (dat) {
				$scope.listdepartemen = dat.data.data;
				$scope.item.unitKerja = dat.data.data.namaDepartemen;
				$scope.item.unitKerjaid = dat.data.data.id;

			});

			ManageLaundry.getOrderList("alat/get-satuan", true).then(function (dat) {
				$scope.listsatuan = dat.data.data;
			});

			ManageLaundry.getOrderList("alat/get-all-mesin-cuci", true).then(function (dat) {
				$scope.listtampilgridk = dat.data.data;
			});

			var init = function () {
				ManageLaundry.getOrderList("alat/get-all-mesin-cuci", true).then(function (dat) {
					$scope.ListTampilGrid = new kendo.data.DataSource({
						data: dat.data.data
					});
				});
				$scope.vals = false;
			}
			init();

			var onChange = function (e) {
				//var inputId = this.element.attr("id");
				//  console.log(inputId);
				var grid = $(this).data("mainGridOptions");

			}

			$scope.mainGridOptions = {
				pageable: true,
				change: onChange,
				pageSize: 10,
				selectable: 'row',
				scrollable: true,
				filterable: {
					extra: false,
					operators: {
						string: {
							startswith: "Dimulai dengan",
							contains: "mengandung kata",
							neq: "Tidak mengandung kata"
						}
					}
				},
				columns: [{
					"field": "alatId",
					"title": "No Mesin",
					"width": "80px",
					"filterable": false
				}, {
					"field": "namaMesin",
					"title": "Nama Mesin",
					"width": "250px",
					"filterable": true
				}, {
					"field": "noRegistrasiAset",
					"title": "No Registrasi Aset",
					"width": "180px",
					"filterable": true

				}, {
					"field": "kapasitasMesin",
					"title": "Kapasitas Mesin",
					"width": "180px",
					"filterable": false

				}, {
					"field": "namaSatuanStandar",
					"title": "Satuan",
					"width": "70px",
					"filterable": false
				}, {
					"field": "namaDepartemen",
					"title": "Unit Kerja",
					"width": "250px",
					"filterable": false

				}, {
					"field": "statusEnabled",
					"title": "Status Aktif",
					"width": "100px"
				}]
			};

			$scope.klik = function (m) {
				debugger
				$scope.m = m;
				if (m.statusEnabled === true) {
					$scope.vals = true;
				} else {
					$scope.vals = false;
				}
				$scope.nosk = m.alatId;
				$scope.item.xx = m.noRegistrasiAset;
				$scope.item.kapasitasMesin = m.kapasitasMesin;
				$scope.item.zz = m.namaMesin;
				$scope.item.uu = m.noRecRegistrasiAset;
				$scope.yy = m.produkAsetId;
				$scope.item.namaSatuan = m.namaSatuanStandar;
				$scope.item.unitKerja = m.namaDepartemen;
				var a = moment($scope.item.e).format("DD-MM-YYYY");
				var x = moment(m.tglBerlakuAkhir).format("DD-MM-YYYY");
				a = x;
				$scope.item.e = a;

				var f = moment($scope.item.c).format("DD-MM-YYYY");
				var t = moment(m.tglBerlakuAwal).format("DD-MM-YYYY");
				f = t;
				$scope.item.c = f;
				$scope.item.namaRuangan = m.namaRuangan;
				$scope.item.hargaSatuanPremi = m.hargaSatuanPremi;
				$scope.item.persenPremi = m.persenPremi;
				$scope.item.factorRate = m.factorRate;
				$scope.item.totalFactorRatePremi = m.totalFactorRatePremi;
				$scope.item.komponenHarga = m.namaKomponenHarga;
				$scope.item.cb1 = m.isByMonth;
				$scope.item.pegawaiSkAsuransiId = m.pegawaiSkAsuransiId;
				$scope.item.suratKeputusanId = m.suratKeputusanId;

				for (var x = 0; x < $scope.ListMesin.length; x++) {
					if ($scope.ListMesin[x].namaProduk === m.namaMesin) {
						$scope.item.nama = $scope.ListMesin[x];
						$scope.a = true;

					}
				}

				for (var y = 0; y < $scope.listsatuan.length; y++) {
					if ($scope.listsatuan[y].namaSatuanStandar === m.namaSatuanStandar) {
						$scope.item.satuan = $scope.listsatuan[y];
					}
				}

				// for (var t=0;t<  $scope.ListRekananAsuransi.length ;t++){
				// 					if ($scope.ListRekananAsuransi[t].namaRekanan === m.namaRekananPenjaminAsuransi){
				// 						$scope.item.penjaminAsuransi = $scope.ListRekananAsuransi[t];
				// 	  				}
				// 				}	
				// for (var z=0; z<$scope.Listoperatorfactorrate.length ;z++){
				// 	debugger
				// 			if ($scope.Listoperatorfactorrate[z].keterangan === m.operatorFactorRatePremi){
				// 						$scope.item.operatorFactorRate = $scope.Listoperatorfactorrate[z];	
				// 					}
				// 				}				

			};

			var aktif = "0";
			$scope.check = function () {
				if (aktif)
					aktif = "0";

				else
					aktif = "1";
			}

			var aktip = "0";
			$scope.check2 = function () {
				if (aktip)
					aktip = "0";
				else
					aktip = "1";
			}

			var aktiv = "false";
			$scope.check3 = function () {
				if (aktiv)
					aktiv = "false";
				else
					aktiv = "true";
			}


			$scope.baru = function () {
				$scope.item.nama = "";
				$scope.nosk = "";
				$scope.item.zz = "";
				$scope.item.uu = "";
				$scope.item.xx = "";
				$scope.item.kapasitasMesin = "";
				$scope.yy = "";
				$scope.item.satuan = "";
				$scope.item.namaSatuan = "";
				// $scope.item.unitKerjaid = "";
				// $scope.item.unitKerja = "";
				$scope.item.dataAktif = "";
				$scope.a = false;
			}


			$scope.Save = function () {
				debugger;
				if ($scope.item.dataAktif === undefined) {
					$scope.item.dataAktif = false;
				}
				debugger;
				var data1 = {
					"alatId": $scope.nosk,
					"noMesin": $scope.nosk,
					"namaMesin": $scope.item.zz,
					"noRecRegistrasiAset": $scope.item.uu,
					"noRegistrasiAset": $scope.item.xx,
					"kapasitasMesin": $scope.item.kapasitasMesin,
					"produkAsetId": $scope.yy,
					"namaprodukAset": "",
					"satuanStandarId": $scope.item.satuan.id,
					"namaSatuanStandar": $scope.item.namaSatuan,
					"departemenId": $scope.item.unitKerjaid,
					"namaDepartemen": $scope.item.unitKerja,
					"kodeEkternal": "",
					"namaEkternal": "",
					"statusEnabled": $scope.item.dataAktif
				}

				var b = $scope.nosk;
				var c = $scope.yy;

				if (c == undefined) {
					c = "";
				}

				if (b == undefined) {
					b = "";
				}

				//FindSarpras.getSarpras("alat/get-produkasetid-alatid?produkAsetId="+c+"&alatId="+b).then(function(dat){
				//  var j = true;	
				//  var x= dat.data.data.findAlat;
				//  var y= dat.data.data.idAlat;
				//  debugger;	

				// if ((x==true)&&(y==false))
				//              {
				// 		j = false;
				// 	toastr.warning("Maaf Data Nama Mesin Tidak Boleh Sama");

				// 	 }  				 
				// 	debugger; 
				// 	  if (j == true) 
				//{
				ManageLaundry.saveMasterAlatLaundry(data1, "alat/save-mesin-cuci").then(function (e) {
					debugger;
					//    $scope.item= {};
					init();
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
				});
				//}
				//}
				//});
			};
		}
	]);
});

		//for (var t=0;t<  $scope.ListMesin.length ;t++){
			//}
			//	 if ($scope.item.nama.namaProduk === m.namaMesin ) {
            //         toastr.warning("Lengkapi semua data");
            //         return;
            //     }


		//	$scope.item.nosk = e.data.data.noMesin;
			//	 var b = e.data.data.idAlat;
			//	 var c = e.data.data.findAlat;
			//	 debugger;
			//	 if ((b==false) && (c == true))
			//	 {
			//	toastr.warning("Maaf Data Nama Mesin Tidak Boleh Sama");						 
			//	 }


		//	ManageLaundry.getOrderList("alat/get-max-no-mesin", true).then(function(dat) {

		//		$scope.listnomesin=dat.data.data;
        //        $scope.item.nosk=dat.data.data.noMesin + 1;
		//     debugger;
        //    });
