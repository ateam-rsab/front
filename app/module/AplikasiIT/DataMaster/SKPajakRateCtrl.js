define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SKPajakRateCtrl', ['$q', '$rootScope', '$state','$scope', 'IPSRSService','CacheHelper','DateHelper','MasterPantauParameter','$mdDialog',
		function($q, $rootScope,$state, $scope,IPSRSService,cacheHelper,dateHelper,MasterPantauParameter,$mdDialog) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();




			 MasterPantauParameter.getOrderList("skratepajak/get-objek-pajak", true).then(function(dat){
		     $scope.ListDataobjekpajak = dat.data.data.data;
	      	});
	         MasterPantauParameter.getOrderList("skratepajak/get-range", true).then(function(dat){
	         $scope.ListDatarange = dat.data.data.data;	
	      	});


            //getdaftar
            var init = function (){
            IPSRSService.getItem("skratepajak/get-sk-ratepajak", true).then(function(dat){
			$scope.dataKomponen = dat.data.data.data;
			var data = [];
					var i = 1;
					$scope.dataKomponen.forEach(function(e){
						debugger;
						var daftar = {
							"id" : e.id,
							"noSK" : e.noSK,
							"objekPajak" : e.objekPajak,
							"idObjekPajak" : e.idObjekPajak,
							"objekPajak" : e.objekPajak,
							"idRange" : e.idRange,
							"idRate": e.idRate,
							"namaRange": e.namaRange,
							"factorRate" : e.factorRate,
							"operatorFactorRate" : e.operatorFactorRate,
							"persenHargaSatuan" : e.persenHargaSatuan,
							"hargaSatuan" : e.hargaSatuan,
							"rumusPerhitungan" : e.rumusPerhitungan,
							"keteranganLainnya" : e.keteranganLainnya,
					 		"no": i
						 	}
					 	data[i-1]=daftar
					 	i++;
					});

            $scope.source = data;
			$scope.dataSource = new kendo.data.DataSource({
			pageSize:50,
			// data : $scope.dataKomponen,
			data : $scope.source,
			$scrollable : true
				});
			});
			}
			init();

	
			$scope.columnKomponen = [
			{
				"field": "no",
				"title": "No",
				"width": "20px"
			},
			{
				"field": "noSK",
				"title": "No SK",
				"width": "50px"
			},
			{
				"field": "objekPajak",
				"title": "Objek Pajak",
				"width": "70px"
			},
			{
				"field": "namaRange",
				"title": "Nama Range",
				"width": "70px"
			},
			{
				"field": "keteranganLainnya",
				"title": "Keterangan Lainnya",
				"width": "70px"
			},
	        {
				"title" : "Action",
    			"width" : "50px",
    			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];

			$scope.klik = function(current){
				debugger;
				$scope.showEdit = true;
				$scope.item.id = current.idRate;
				$scope.item.NoSK = current.noSK;
				$scope.item.ObjekPajak = {
					idObjekPajak:current.idObjekPajak,
					objekPajak:current.objekPajak
				}
				$scope.item.Range = {
					idRange: current.idRange,
					namaRange : current.namaRange
				}
				$scope.item.FactorRate = current.factorRate;
				$scope.item.OperatorFactorRate = current.operatorFactorRate;
				$scope.item.PersenHargaSatuan = current.persenHargaSatuan;
				$scope.item.HargaSatuan = current.hargaSatuan;
				$scope.item.RumusPerhitungan = current.rumusPerhitungan;
				$scope.item.KeteranganLainnya = current.keteranganLainnya;

			}

			  $scope.Save=function(){
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Apakah anda yakin akan menyimpan data ini?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $scope.Simpan();
                })
            };

			$scope.Simpan = function () {
			debugger;
			var data = 
			{
				"noSK" : $scope.item.NoSK,
				"persenHargaSatuan" : $scope.item.PersenHargaSatuan,
				"hargaSatuan" : $scope.item.HargaSatuan,
				"factorRate" : $scope.item.FactorRate,
				"operatorFactorRate" : $scope.item.OperatorFactorRate,
				"rumusPerhitungan" : $scope.item.RumusPerhitungan,
				"keteranganLainnya" : $scope.item.KeteranganLainnya,
				"kdObjekPajak" : {"id" : $scope.item.ObjekPajak.idObjekPajak},
				"kdRange" : {"id" : $scope.item.Range.idRange}
			}
		
			  IPSRSService.saveDataSarPras(data,"skratepajak/save-sk-ratepajak").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        });

			}

		$scope.Edit=function(){
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Data No SK "'+$scope.item.NoSK+'" akan di update, tetap lanjutkan?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $scope.Simpan();
                })
            };
	

			$scope.edit2 = function () {
			debugger;
			var data = 
			{
				"id" : $scope.item.id,
				"noSK" : $scope.item.NoSK,
				"persenHargaSatuan" : $scope.item.PersenHargaSatuan,
				"hargaSatuan" : $scope.item.HargaSatuan,
				"factorRate" : $scope.item.FactorRate,
				"operatorFactorRate" : $scope.item.OperatorFactorRate,
				"rumusPerhitungan" : $scope.item.RumusPerhitungan,
				"keteranganLainnya" : $scope.item.KeteranganLainnya,
				"kdObjekPajak" : {"id" : $scope.item.ObjekPajak.idObjekPajak},
				"kdRange" : {"id" : $scope.item.Range.idRange}
			}
		
			  IPSRSService.saveDataSarPras(data,"skratepajak/save-sk-ratepajak").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        });

			}
}
]);
});

