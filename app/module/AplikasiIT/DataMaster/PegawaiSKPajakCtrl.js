define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PegawaiSKPajakCtrl', ['$q', '$rootScope', '$state','$scope', 'IPSRSService','CacheHelper','DateHelper','MasterPantauParameter','$mdDialog',
		function($q, $rootScope,$state, $scope,IPSRSService,cacheHelper,dateHelper,MasterPantauParameter,$mdDialog) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
             

              MasterPantauParameter.getOrderList("service/list-generic/?view=GolonganPegawai&select=id,golonganPegawai", true).then(function(dat) {
                 $scope.listgolPegawai = dat.data;
             });

              	MasterPantauParameter.getOrderList("skratepajak/get-objek-pajak", true).then(function(dat){
		     $scope.ListDataobjekpajak = dat.data.data.data;
	      	});
	         MasterPantauParameter.getOrderList("skratepajak/get-range", true).then(function(dat){
	         $scope.ListDatarange = dat.data.data.data;	
	      	});


			 var init = function () {
			     debugger
                 IPSRSService.getItem("pegawai-sk-pajak/get-all-pegawai-sk-Pajak", true).then(function(dat) {
                 	debugger
                 $scope.listDataMaster = dat.data.data;
                 var data =[];
                    var i=1;
                    $scope.listDataMaster.forEach(function(e){
                    	debugger
                    var daftar = 
                    {
						  "factorRate": e.factorRate,
						  "operatorFactorRate": e.operatorFactorRate,
						  "keteranganLainnya": e.keteranganLainnya,
					      "namaRuangan": e.namaRuangan,
					      "persenPajak": e.persenPajak,
					      "tglBerlakuAwal": e.tglBerlakuAwal,
					      "idrange": e.idrange,
					      "objekPajak": e.objekPajak,
					      "namaRange": e.namaRange,
					      "persenHargaSatuan": e.persenHargaSatuan,
					      "statusEnabled": e.statusEnabled,
					      "tglBerlakuAkhir": e.tglBerlakuAkhir,
					      "golonganPegawaiId": e.golonganPegawaiId,
					      "ruanganId": e.ruanganId,
					      "hargaSatuan": e.hargaSatuan,
					      "namaSuratKeputusan": e.namaSuratKeputusan,
					      "rumusPerhitungan": e.rumusPerhitungan,
					      "golonganPegawai": e.golonganPegawai,
					      "noSuratKeputusan": e.noSuratKeputusan,
					      "objekpajakId": e.objekpajakId,
					      "pegawaiSkPajakId": e.pegawaiSkPajakId,
					      "suratKeputusanId": e.suratKeputusanId,
			              "no" : i
                         }
                    data[i-1] = daftar
                    i++;
                    });

                    $scope.source = data;
					$scope.dataSource = new kendo.data.DataSource({
	                    pageSize: 10,
	                    data: $scope.source,
	                    autoSync: true
	    
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
				"field": "noSuratKeputusan",
				"title": "No SK",
				"width": "50px"
			},
			{
				"field": "golonganPegawai",
				"title": "Golongan Pegawai",
				"width": "70px"
			},
			{
				"field": "objekPajak",
				"title": "Objek Pajak",
				"width": "70px"
			},
			{
				"field": "keteranganLainnya",
				"title": "Keterangan",
				"width": "70px"
			},
				{
				"field": "statusEnabled",
				"title": "Status Enable",
				"width": "70px"
			},
			{
				"title" : "Action",
    			"width" : "60px",
    			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];

		$scope.klik = function(current){
				debugger;
				$scope.showEdit = true;
			     // $scope.item.id = current.id;
				$scope.item.noSK = current.noSuratKeputusan;
				$scope.item.Range = 
				{namaRange : current.namaRange,
					idRange : current.idrange}
				$scope.item.golPegawai = {golonganPegawai: current.golonganPegawai,
											id : current.golonganPegawaiId}
				$scope.item.ObjekPajak = {objekPajak: current.objekPajak,
										idObjekPajak : current.objekpajakId}
				$scope.item.ruanganid = current.ruanganId;
				$scope.item.PersenHargaSatuan = current.persenHargaSatuan;
				$scope.item.HargaSatuan = current.hargaSatuan;
				$scope.item.FactorRate = current.factorRate;
				$scope.item.OperatorFactorRate = current.operatorFactorRate;
				$scope.item.RumusPerhitungan = current.rumusPerhitungan;
				$scope.item.KeternganLainnya = current.keteranganLainnya;
				$scope.item.pegawaiSkPajakId = current.pegawaiSkPajakId;
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

             $scope.Simpan=function(){
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

		  	$scope.Simpan = function()
			 {
			 debugger
			var data = 
						    {
							"noSuratKeputusan" : $scope.item.noSK,
							"golongaPegawaiId" : $scope.item.golPegawai.id,
							"objekPajakId" : $scope.item.ObjekPajak.idObjekPajak,
							"rangeId" : $scope.item.Range.idRange,
							"persenPajak" : "20.05",
							"statusEnabled" : true,
							"persenHargaSatuan" : $scope.item.PersenHargaSatuan,
							"hargaSatuan" : $scope.item.HargaSatuan,
							"factorRate" : $scope.item.FactorRate,
							"rumusPerhitungan" : $scope.item.RumusPerhitungan,
							"operatorFactorRate" : $scope.item.OperatorFactorRate,
							"keteranganLainnya" : $scope.item.KeternganLainnya
						    }


			  IPSRSService.saveDataSarPras(data,"pegawai-sk-pajak/save-pegawai-sk-pajak").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        });
			}



		 $scope.edit=function(){
            var confirm = $mdDialog.confirm()
                  .title('Peringatan!')
                 .textContent('No SK "'+$scope.item.noSK+'" akan di update, tetap lanjutkan?')
                  .ariaLabel('Lucky day')
                  .ok('Ya')
                  .cancel('Tidak')

            $mdDialog.show(confirm).then(function() {
                $scope.edit2();
            })
        };
        


       

	    $scope.edit2 = function()
			 {
		var data = 
			             {
							"noSuratKeputusan" : $scope.item.noSK,
							"golongaPegawaiId" : $scope.item.golPegawai.id,
							"objekPajakId" : $scope.item.ObjekPajak.idObjekPajak,
							"rangeId" : $scope.item.Range.idRange,
							"persenPajak" : "20.05",
							"statusEnabled" : true,
							"persenHargaSatuan" : $scope.item.PersenHargaSatuan,
							"hargaSatuan" : $scope.item.HargaSatuan,
							"factorRate" : $scope.item.FactorRate,
							"rumusPerhitungan" : $scope.item.RumusPerhitungan,
							"operatorFactorRate" : $scope.item.OperatorFactorRate,
							"keteranganLainnya" : $scope.item.KeternganLainnya,
							"pegawaiSkPajakId" : $scope.item.pegawaiSkPajakId
						    }
	                IPSRSService.saveDataSarPras(data,"pegawai-sk-pajak/save-pegawai-sk-pajak").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        });
			}

				$scope.disableData=function(){

					 {
		       var data = 
			             {
							"noSuratKeputusan" : $scope.item.noSK,
							"golongaPegawaiId" : $scope.item.golPegawai.id,
							"objekPajakId" : $scope.item.ObjekPajak.idObjekPajak,
							"rangeId" : $scope.item.Range.idRange,
							"persenPajak" : "20.05",
							"statusEnabled" : false,
							"persenHargaSatuan" : $scope.item.PersenHargaSatuan,
							"hargaSatuan" : $scope.item.HargaSatuan,
							"factorRate" : $scope.item.FactorRate,
							"rumusPerhitungan" : $scope.item.RumusPerhitungan,
							"operatorFactorRate" : $scope.item.OperatorFactorRate,
							"keteranganLainnya" : $scope.item.KeternganLainnya,
							"pegawaiSkPajakId" : $scope.item.pegawaiSkPajakId
						    }
	                IPSRSService.saveDataSarPras(data,"pegawai-sk-pajak/save-pegawai-sk-pajak").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        });
			}
				
			};

			$scope.enableData=function(){

				 {
		       var data = 
			             {
							"noSuratKeputusan" : $scope.item.noSK,
							"golongaPegawaiId" : $scope.item.golPegawai.id,
							"objekPajakId" : $scope.item.ObjekPajak.idObjekPajak,
							"rangeId" : $scope.item.Range.idRange,
							"persenPajak" : "20.05",
							"statusEnabled" : true,
							"persenHargaSatuan" : $scope.item.PersenHargaSatuan,
							"hargaSatuan" : $scope.item.HargaSatuan,
							"factorRate" : $scope.item.FactorRate,
							"rumusPerhitungan" : $scope.item.RumusPerhitungan,
							"operatorFactorRate" : $scope.item.OperatorFactorRate,
							"keteranganLainnya" : $scope.item.KeternganLainnya,
							"pegawaiSkPajakId" : $scope.item.pegawaiSkPajakId
						    }
	                IPSRSService.saveDataSarPras(data,"pegawai-sk-pajak/save-pegawai-sk-pajak").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        });
			}
				
			};

			 $scope.batal = function () {
		    	$scope.showEdit = false;
		    	$scope.item = {};
		    }	


	


}
]);
});

