define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPesanAmbulanceCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper', 'ManageSarpras', '$state',
		function($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, $state) {		
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal = new Date();
			$scope.item.periodeAkhir = new Date();

			$scope.find = function(){
				var awal = DateHelper.getPeriodeFormatted($scope.item.periodeAwal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.periodeAkhir);
				var url = "periodeAwal=" + awal + "&periodeAkhir=" + akhir;
				ManageSarpras.getOrderList("daftar-pesan-ambulance/find-by-periode/?" + url).then(function(dat){
					// debugger;
				    $scope.DaftarPesanAmbulance = dat.data.data.data
				    $scope.DaftarPesanAmbulance.forEach(function(data){
						var date = new Date(data.noOrder.tglPelayananAwal);
						data.noOrder.tglPelayananAwal = DateHelper.getTanggalFormatted(date);

					})
				});
			};

			$scope.find();

			$scope.columnDaftarPesanAmbulance= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "noOrder.noOrder",
				"title": "<h3 align=center>No Order</h3>",
				"width": "100px"
			}, {
				"field": "noOrder.tglPelayananAwal",
				"title": "<h3 align=center>Tgl Order</h3>",
				"width": "100px"
			}, {
				"field": "noOrder.namaPasienPemesan",
				"title": "<h3 align=center>Nama Pasien</h3>",
				// "template": "<h3 align=center><input type=\"input\" ng-click=\"klik()\"></h3>",
				"width": "200px",
				// edittable:true
			},{
				"field": "noOrder.namaPJawabKeluarga",
				"title": "<h3 align=center>PJ Keluarga</h3>",
				// "template": "<h3 align=center><input type=\"combobox\" ng-click=\"klik()\"></h3>",
				"width": "200px"
			}, {
				"field": "noOrder.noTelpPJawabKeluarga",
				"title": "<h3 align=center>No Hp</h3>",
				"width": "100px"
			}, {
				"field": "noOrder.namaTempatTujuan",
				"title": "<h3 align=center>Tempat Tujuan</h3>",
				"width": "200px"
			},{
				"field": "noOrder.alamatTempatTujuan",
				"title": "<h3 align=center>Alamat Tujuan</h3>",
				"width": "200px"
			}, {
				"field": "produk.namaProduk",
				"title": "<h3 align=center>Nama Pelayanan</h3>",
				"width": "200px"
			},{
				"field": "noOrder.keteranganLainnya",
				"title": "<h3 align=center>Keterangan Lainnya</h3>",
				"width": "300px"
		    },{
				"field": "strukOrder.status",
				"title": "<h3 align=center>Status</h3>",
				"width": "300px"
		    }];

		    $scope.out = function(id, status, noOrder){
				console.log(noOrder);
				if(status == "DIPAKAI"){
					var tglKeluar = new Date();
					var saveData = {
                              "strukOrder": {
                                    "tglKeluar": tglKeluar.getTime()
                              }
                        }
                        ManageSarpras.saveDataSarPras(saveData, "daftar-pesan-ambulance/save-status-ambulance/?noOrder=" + noOrder + "&id=" + id).then(function(e){
                              console.log(JSON.stringify(e.data));
                              $state.find();
                        })
				}
			}

		    $scope.NavToPemakaianAmbulance = function(current) {
		    	if(current.strukOrder.status == "ORDER")
                $state.go('PemakaianAmbulance', {
                    noOrder: current.noOrder.noOrder
                });
            };

		    ModelItem.get("AplikasiRumahTanggadanPerlengkapan/DaftarPesanAmbulance").then(function(data) {
				$scope.ite = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
		}
	]);
});