define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterGajiPokokPegawaiCtrl', ['$rootScope', '$scope',
		'ModelItem', '$state', 'InstitusiPendidikan', 'JenisSantunanService', 'ManageSdm',
		function ($rootScope, $scope, ModelItem, $state,
			InstitusiPendidikan, JenisSantunanService, ManageSdm) {
 
				$scope.item = {};
				$scope.now = new Date();
				$scope.dataVOloaded = true; 	 
				$scope.item.dataFromGrid;

			ManageSdm.getOrderList("service/list-generic/?view=DetailKategoryPegawai&select=id,id,detailKategoryPegawai", true).then(function (dat) {
				$scope.listDetailKategoriPegawai = dat.data;
			});

			ManageSdm.getOrderList("service/list-generic/?view=Range&select=id,rangeMin,rangeMax&criteria=namaRange&values=Range Masa Kerja", true).then(function (dat) {
				     var data=[];
					 dat.data.forEach(function(e) { 
					  data.push({
							    "id": e.id,
							    "range": e.rangeMin + " - " + e.rangeMax
						  	});		
					 });
				$scope.listRangeMasaKerja = data;
			});

			ManageSdm.getOrderList("service/list-generic/?view=Pendidikan&select=id,namaPendidikan", true).then(function (dat) {
				$scope.listPendidikan = dat.data;
			});
 
			ManageSdm.getOrderList("service/list-generic/?view=KomponenHarga&select=id,komponenHarga", true).then(function(dat) {
                $scope.listKomponenHarga = dat.data;
            });


			$scope.pindah = function () {

				$state.go("RekamDataPegawai");

			}
   			$scope.listOperatorFactorRate = [
            {
                "op": "+"
            }, {
                "op": "-"
            }, {
                "op": "x"
            }, {
                "op": "/"
            }] 
            initial();
            function initial(){
                $scope.item = {};
				ManageSdm.getOrderList("pegawai-makape/get-all-pegawai-makape", true).then(function (dat) {
					var data=[];
					 dat.data.data.forEach(function(e) { 
					  data.push({ 
							  "pendidikanId": e.pendidikanId,
						      "operatorFactorRate": e.operatorFactorRate,
						      "detailKategoriPegawaiId": e.detailKategoriPegawaiId,
						      "namaDetailKategoriPegawai": e.namaDetailKategoriPegawai,
						      "komponenHargaId": e.komponenHargaId,
						      "range": e.rangeMin + " - " + e.rangeMax,
						      "id": e.id,
						      "kdProfile": e.kdProfile,
						      "rangeMin": e.rangeMin,
						      "rangeMax": e.rangeMax,
						      "factorRate": e.factorRate,
						      "namaRangeMasaKerja": e.namaRangeMasaKerja,
						      "rangeMasaKerjaId": e.rangeMasaKerjaId,
						      "statusEnabled": e.statusEnabled,
						      "hargaSatuan": e.hargaSatuan,
						      "namaKomponenHarga": e.namaKomponenHarga,
						      "namaPendidikan": e.namaPendidikan
						  	});		
					 });




					$scope.gridGajiPokok = data; 
				}); 
			}
			$scope.columnGridGajiPokok =  {
                scrollable: true,
                columns: [ 
				{
					"field": "namaDetailKategoriPegawai",
					"title": "Detail Kategori Pegawai",
					"width": "15%"
				},
				{
					"field": "rangeMasaKerjaId",
					"title": "Range Masa Kerja",
					"width": "15%"
				},
				{
					"field": "namaPendidikan",
					"title": "Pendidikan",
					"width": "10%"
				},
				{
					"field": "namaKomponenHarga",
					"title": "Komponen Harga",
					"width": "15%"
				},
				{
					"field": "hargaSatuan",
					"title": "Harga Satuan",
					"width": "15%"
				},
				{
					"field": "factorRate",
					"title": "Factor Rate",
					"width": "10%"
				},
				{
					"field": "operatorFactorRate",
					"title": "Operator Factor Rate",
					"width": "10%"
				},
				{
					"field": "statusEnabled",
					"title": "Status Aktif",
					"width": "10%"
				}
			]};
 			

 			$scope.klik = function(current) {
                $scope.item.dataFromGrid = current; 
                $scope.item.hargaSatuan = current.hargaSatuan;
                $scope.item.faktorRate = current.factorRate; 
                var x = 0; 
  
                for (x = 0; x < $scope.listDetailKategoriPegawai.length; x++) {
                    if ($scope.listDetailKategoriPegawai[x].id === current.detailKategoriPegawaiId) {
                        $scope.item.detailKategoriPegawai = $scope.listDetailKategoriPegawai[x];
                    }
                }

                for (x = 0; x < $scope.listRangeMasaKerja.length; x++) {
                    if ($scope.listRangeMasaKerja[x].id === current.rangeMasaKerjaId) {
                        $scope.item.rangeMasaKerja = $scope.listRangeMasaKerja[x];
                    }
                }

                for (x = 0; x < $scope.listPendidikan.length; x++) {
                    if ($scope.listPendidikan[x].id === current.pendidikanId) {
                        $scope.item.pendidikan = $scope.listPendidikan[x];
                    }
                }

                for (x = 0; x < $scope.listKomponenHarga.length; x++) {
                    if ($scope.listKomponenHarga[x].id === current.komponenHargaId) {
                        $scope.item.komponenHarga = $scope.listKomponenHarga[x];
                    }
                }
  
                for (x = 0; x < $scope.listOperatorFactorRate.length; x++) {
                    if ($scope.listOperatorFactorRate[x].op === current.operatorFactorRate) {
                        $scope.item.operatorFactorRate = $scope.listOperatorFactorRate[x];
                    }
                }

                if (current.statusEnabled === '1' || current.statusEnabled === true) {
                    $scope.vals = true;
                } else {
                    $scope.vals = false;
                }

            };
            $scope.Cancel = function(){ 
            	    initial();
            }
			$scope.Save = function () { 
				if($scope.item.detailKategoriPegawai === undefined || $scope.item.rangeMasaKerja === undefined || 
				$scope.item.komponenHarga === undefined || $scope.item.operatorFactorRate === undefined){
					toastr.warning("Lengkapi semua data");
                    return;
				}
				var id;
				if ($scope.item.dataFromGrid !== undefined) {
                    id =  $scope.item.dataFromGrid.id;
                }
                if ($scope.item.dataAktif === undefined) {
                    $scope.item.dataAktif = false;
                }

				var data = {
					  "id": id,
					  "kdProfile":0,
					  "detailKategoriPegawaiId":  $scope.item.detailKategoriPegawai.id,
					  "namaDetailKategoriPegawai":  $scope.item.detailKategoriPegawai.detailKategoryPegawai,
					  "rangeMasaKerjaId": $scope.item.rangeMasaKerja.id,
					  "namaRangeMasaKerja": '',
					  "pendidikanId":$scope.item.pendidikan.id,
					  "namaPendidikan":$scope.item.pendidikan.namaPendidikan,
					  "komponenHargaId":$scope.item.komponenHarga.id,
					  "namaKomponenHarga":$scope.item.komponenHarga.namaKomponenHarga,
					  "hargaSatuan": $scope.item.hargaSatuan,
					  "factorRate": $scope.item.faktorRate,
					  "operatorFactorRate": $scope.item.operatorFactorRate.op,
					  "statusEnabled": $scope.item.dataAktif
				};

				ManageSdm.saveJenisSantunan(ModelItem.beforePost(data), "pegawai-makape/save-pegawai-makape").then(function(e) {
                  	initial();
                });
			};
 
		}
	]);
});