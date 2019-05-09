define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InputJadwalSeleksiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm', 'DateHelper','$timeout','$window',
		function($rootScope, $scope, ModelItem,$state,ManageSdm,DateHelper,$timeout,$window) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.no=1;
			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})
			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: [{}]
			});
			
			 $scope.pindah = function(){
				 
				$state.go("RekamDataPegawai");
				 
			 }
			 
			  ManageSdm.getOrderList("rekrutmen/get-jenis-test", true).then(function(dat) {
				
				$scope.listtest=dat.data.data;
				
			
            });
			
			ManageSdm.getOrderList("rekrutmen/get-all-ruangan", true).then(function(dat) {
				
				$scope.listruangan=dat.data.data;
				
			
            });
			
			
		
			
			ManageSdm.getOrderList("rekrutmen/get-petugas-sdm", true).then(function(dat) {
				
				$scope.listpetugas=dat.data.data;
				
			
				
			
            });
			
		    ManageSdm.getOrderList("rekrutmen/generate-no-planning", true).then(function(dat) {
				
				$scope.item.noPlanning=dat.data.data.noPlanning;
				
			debugger;
			
            });
			
		//	ManageSdm.getOrderList("rekrutmen/get-pelamars-lolos-administrasi", true).then(function(dat) {
				
	//			$scope.ok=dat.data.data;
     //       getTotal();

     //       });
			
			
            var getTotal= function(){
				
			var total = 0;
			for(var i = 0; i < $scope.ok.length; i++){
				var product = $scope.ok[i];
				debugger;
				total = total + 1;
		        
			}
			return $scope.item.jumlahPeserta = total;
		
		    debugger;
			}
			
			$scope.satuanBahan = function() {
				$scope.idtest = $scope.item.jenisTest.id;
			};
			
			function Hitung() {
				 
				 
			debugger;	
			
            var a=	$scope.idtest;			 
			if (a==undefined)
			{
				a="";
			}else
			{
				a=$scope.idtest;
			}	
			
			var b = moment($scope.item.Waktu).format("MM-YYYY");
			if (b==undefined)
			{
				b="";
			}else
			{
				b=moment($scope.item.Waktu).format("MM-YYYY");
			}
			
			ManageSdm.getOrderList("rekrutmen/get-jadwal-pelamar-by-jenis-test-periode?jenisTestId="+a+"&periode="+b, true).then(function (dat) {
				$scope.ok = dat.data.data;
			getTotal();			
			debugger;
		
			});
			
		
		
			
			}
			
			function Proses() {
				 
				 
			debugger;	
			
            var a=	$scope.idtest;			 
			if (a==undefined)
			{
				a="";
			}else
			{
				a=$scope.idtest;
			}	
			
			var b = moment($scope.item.Waktu).format("MM-YYYY");
			if (b==undefined)
			{
				b="";
			}else
			{
				b=moment($scope.item.Waktu).format("MM-YYYY");
			}
			
			ManageSdm.getOrderList("rekrutmen/get-jadwal-pelamar-by-jenis-test-periode?jenisTestId="+a+"&periode="+b, true).then(function (dat) {
				$scope.ListTampilGrid = new kendo.data.DataSource({
								data: dat.data.data	
			  });
				
			debugger;
		
			});
			
		
		
			
			}
			
			
			$scope.viewgrid = function(){
			 
             var a=$scope.idtest;
			 if (a==undefined)
			{
				a="";
			}else
			{
				a=$scope.idtest;
			}	
             var b = moment($scope.Waktu).format("MM-YYYY");			 
			Proses();
            Hitung();			
				
				
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
				
			 
			//  $scope.Listketerangan = [{
			//		"id": 1,
			//		"kode": "1",
			//		"name": "2016"
			//	}];
				
				
		//		$scope.ganti = function() {
				
		//		if ($scope.item.tahunUMR.name=="2016")
		//		{
		//			$scope.item.jumlahUMR="2300000";
					
		//		}
		//		else
		//		{
		//			$scope.item.jumlahUMR="";
					
		//		}
				
		//	}
					
					
					
					
				

			
			 
			 
	//		  $scope.pindah1 = function(){
				 
	//			$state.go("DataKeluarga");
				 
	//		 }
			
			
			
			
			
	//		$scope.daftarBahanLinen = new kendo.data.DataSource({
	//			data:[
	//				{ 
	//					"kodeJenis":"BHN001",
	//					"JenisBahan":"Aldet"
	//				},
	//				{ 
	//					"kodeJenis":"BHN002",
	//					"JenisBahan":"Laudet"
	//				},
	//				{ 
	//					"kodeJenis":"BHN003",
	//					"JenisBahan":"MC. Bleach"
	//				},
	//				{ 
	//					"kodeJenis":"BHN004",
	//					"JenisBahan":"OXO. Bleach"
	//				},
	//				{ 
	//					"kodeJenis":"BHN005",
	//					"JenisBahan":"E. 951"
	//				},
	//				{ 
	//					"kodeJenis":"BHN006",
	//					"JenisBahan":"M. Saur"
	//				},
	//				{ 
	//					"kodeJenis":"BHN007",
	//					"JenisBahan":"M. Soft"
	//				}

	//			]
	//		});
	
		 var onChange = function(e) {
                //var inputId = this.element.attr("id");
              //  console.log(inputId);
                var grid = $(this).data("mainGridOptions");

            }
			
			 $scope.mainGridOptions = {
				 pageable:true,
				change:onChange,
				pageSize:10,
				selectable:'row',
				scrollable:true,
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
			columns:[{
				"field": "pelamarId",
				"title": "No. Peserta",
				"width": "15%",
				filterable:false
			},
			{
				"field": "namaPelamar",
				"title": "Nama Lengkap",
				"width": "20%"
			},
			{
				"field": "jenisKelamin",
				"title": "Jenis Kelamin",
				"width": "20%"
			},
			{
				"field": "degree",
				"title": "Degree",
				"width": "20%"
			},
			{
				"field": "jurusan",
				"title": "Jurusan",
				"width": "20%"
			},
			{
				"field": "nilai",
				"title": "Nilai",
				"width": "20%",
				filterable:false
	
			},
			{
				"field": "posisiLamar",
				"title": "Posisi Dilamar",
				"width": "20%"
			},
			{
				"field": "email",
				"title": "Email",
				"width": "20%"
	
			},
			{
				"field": "kategoriLamar",
				"title": "Kategori Lamar ",
				"width": "20%",
				hidden : true
	
			},
			{
				"field": "kategoriLamarId",
				"title": "Kategori Lamar Id",
				"width": "20%",
				hidden : true
	
			},
			{
				"field": "posisiLamarId",
				"title": "Posisi Lamar Id",
				"width": "20%",
				hidden : true
	
			},
			{
				"field": "isLulus",
				"title": "isLulus",
				"width": "20%",
	            hidden : true
			},
			{
				"field": "degree",
				"title": "degree",
				"width": "20%",
				hidden : true
	
			},
			{
				"field": "universitas",
				"title": "universitas",
				"width": "20%",
                hidden : true	
			}
			]
			
		
			 };	

			
			
			$scope.Save = function(){
				var listRawRequired = [
                    // "item.noPeserta|ng-model|No Peserta",
                    "item.jenisTest|ng-model|Jenis Test",
                    "item.ruangan|ng-model|Ruangan",
                    "item.petugasPenanggungJawab|ng-model|Petugas Penanggung Jawab"
                ];
				
			 var isValid = ModelItem.setValidation($scope, listRawRequired);	
				
			    if (isValid.status){	
				var dat = $scope.ListTampilGrid._data;
				//console.log(JSON.stringify(dat));
				var i=0;
				var mapLinen = [];
				dat.forEach(function(data){
					var data ={
						
						"pelamarId":data.pelamarId,
						"namaPelamar":data.namaPelamar,
						"universitas":data.universitas,
						"degree":data.degree,
						"jurusan":data.jurusan,
						"nilai":data.nilai,
						"posisiLamarId":data.posisiLamarId,
						"posisiLamar":data.posisiLamar,
						"kategoriLamarId":data.kategoriLamarId,
						"kategoriLamar":data.kategoriLamar,
						"nilaiScore":"",
						"periode":"",
						"isLulus":data.isLulus
					}
					mapLinen[i] =data;
					i++;
				})
				//console.log(JSON.stringify(mapCycle));
				
				var data1 = {
					
                    "noRecHistori":"",
					"noRecPlanning":"",
					"noPlanning":$scope.item.noPlanning,
					"tglRencanaSeleksi":moment($scope.item.tanggalRencanaSeleksi).format("YYYY-MM-DD hh:mm:ss"),
					"tglPlanning":"",
					"jenisTestId":$scope.item.jenisTest.id,
					"namaJenisTest":$scope.item.jenisTest.namaProduk,
					"ruanganId":$scope.item.ruangan.ruanganId,
					"namaRuangan":$scope.item.ruangan.namaRuangan,
					"petugasId":$scope.item.petugasPenanggungJawab.id,
					"namaPetugas":$scope.item.petugasPenanggungJawab.namaLengkap,
					"periodeLowongan":moment($scope.item.Periode).format("MM-YYYY"),
					"jumlahPeserta":$scope.item.jumlahPeserta,
					"pelamars" : mapLinen		                    

					
				
					
				}
            		// "mapCycle": $scope.daftarBahanLinen._data	
            //		console.log(JSON.stringify(data));
            		ManageSdm.savePremiAsuransi(data1,"rekrutmen/save-jadwal-seleksi").then(function(e) {
						 $timeout(function () {
                            $window.location.reload();
                        }, 5500);
            			//$scope.item = {};
            		// $scope.item.noMesin="",
            		// $scope.item.jenisLinen="",
            		// $scope.item.kapasitas="",
            		// $scope.daftarBahanLinen._data=""

            	});
            		debugger;
            	}
				else{
				
                    ModelItem.showMessages(isValid.messages);
                }
			}
			
				
			$scope.Batal = function(){
              $scope.item = {};
			  




			};

             // option untuk kendodatepicker
              $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});