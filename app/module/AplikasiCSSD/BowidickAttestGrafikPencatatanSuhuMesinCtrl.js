define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('BowidickAttestGrafikPencatatanSuhuMesinCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','ManageSarpras','$state','IPSRSService',
		function($rootScope, $scope, ModelItem, DateHelper,ManageSarpras,$state,IPSRSService) {
			ModelItem.get("CSSD/BowidickAttestGrafikPencatatanSuhuMesin").then(function(data) {
			$scope.item = data;
			$scope.now = new Date();
			$scope.item = {};
			$scope.Rubahdat = false;
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;
			$scope.item.tanggalBowidick = $scope.now;
			$scope.item.tanggalBiological = $scope.now;
			$scope.item.tanggalAttestPembanding = $scope.now;
			$scope.item.tanggal = $scope.now;
			$scope.saveShow = true;
		    $scope.SetTotalJam = function(){
	   		  var TotalWaktu = DateHelper.CountDifferenceHourMinute($scope.item.waktuMulai,$scope.item.waktuSelesai);
	          return $scope.item.lamaProses = TotalWaktu;
	        }

	        $scope.getPegawai = function(){
	           IPSRSService.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
            	 $scope.dataMasterPegawai = dat.data;
               });
	        }
	        $scope.getPegawai();
	        
	        IPSRSService.getItem("pencatatan-suhu-mesin/get-mesin", true).then(function(dat){
		      $scope.listMesin = dat.data.data;
		    });	

		    $scope.DataBaru = function(){
		       $scope.item = {};
		       $scope.NorecBowidick = undefined;
		       $scope.NorecBiological = undefined;
		       $scope.NorecAttestPembanding = undefined;
		       $scope.NorecpencatatanSuhuMesin = undefined;
		       $scope.item.awal = $scope.now;
			   $scope.item.akhir = $scope.now;
		       $scope.dataEdit = false;
		       $scope.ModeEdit = false;
		       $scope.Cari();
		    }	        

	       $scope.mainGridOptions = {
              pageable: true,
              scrollable: true,
              selectable: "row"
            };

           $scope.Selected = function(current){
           	debugger
	          $scope.dataEdit = true;
	          $scope.ModeEdit = true;
	          $scope.item = {};
			  $scope.item.awal = $scope.now;
			  $scope.item.akhir = $scope.now;
	          IPSRSService.getItem("bowidick/get-bowidick-by-norec?noRec="+current.noRes, true).then(function(dat){
		      $scope.SubdataGrid = dat.data.data; 
	          
	          /*- - - BOWIDICK - - - */
	          var bowidick = $scope.SubdataGrid.bowidick[0];
	          $scope.NorecBowidick = bowidick.noRes;
	          $scope.item.noCycle = bowidick.programMesin
	          $scope.item.noMesin = {"id" : bowidick.idMesin,"namaExternal" : bowidick.namaMesin};
	          $scope.item.hasilBowidick = bowidick.hasil;
	          $scope.item.suhuBowdick =  bowidick.suhu;
	          $scope.item.operatorBowidick = {"id" : bowidick.idOperator,"namaLengkap" : bowidick.namaOperator}		          
	          $scope.item.SupervisiorBowidick = {"id" : bowidick.idSupervisor,"namaLengkap" : bowidick.nameSupervisor}
	          var TanggalBowidik = new Date(bowidick.tanggal);
	          $scope.item.tanggalBowidick = TanggalBowidik;
	           
	           /*- - - BIOLOGICAL - - - */
	           var Biological = $scope.SubdataGrid.biologicalSudahDisterile[0];
	           $scope.NorecBiological = Biological.noRes;
	           $scope.item.tanggalBiological = new Date(Biological.tanggal)
	           $scope.item.operatorBiological =  {"id" : Biological.idOperator,"namaLengkap" : Biological.namaOperator};
	           $scope.item.suhuBiological = Biological.suhuPensterilan;
	           $scope.item.suhuIncubatorBiological = Biological.SuhuIncubator;
	           $scope.item.hasilBilogical = Biological.hasil;
	           $scope.item.jamMasukBiological = Biological.jamMasuk;
	           $scope.item.jamKeluarBiological = Biological.jamKeluar;

	           /*- - - ATTEST PEMBANDING - - -*/
	           var attestPembanding = $scope.SubdataGrid.attestPembanding[0];
	           $scope.NorecAttestPembanding = attestPembanding.noRes 
	           $scope.item.tanggalAttestPembanding = new Date(attestPembanding.tanggal);
	           $scope.item.operatorAttestPembanding = {"id" : attestPembanding.idOperator,"namaLengkap" : attestPembanding.namaOperator};
	           $scope.item.suhuPensterilanAttestPembanding = attestPembanding.suhuPensterilan;
	           $scope.item.suhuIncubatorAttestPembanding = attestPembanding.SuhuIncubator;
	           $scope.item.hasilAttestPembanding = attestPembanding.hasil;
	           $scope.item.jamMasukAttestPembanding = attestPembanding.jamMasuk;
	           $scope.item.jamKeluarAttestPembanding = attestPembanding.jamKeluar;

	           /*- - - PENCATATAN SUHU - - -*/
	           var pencatatanSuhuMesin = $scope.SubdataGrid.pencatatanSuhuMesin[0];
	           $scope.NorecpencatatanSuhuMesin = pencatatanSuhuMesin.noRes
	           $scope.item.tanggal = new Date(pencatatanSuhuMesin.tanggal);
	           $scope.item.programMesin = pencatatanSuhuMesin.programMesin;
	           $scope.item.suhu = pencatatanSuhuMesin.suhu;
	           $scope.item.tekanan = pencatatanSuhuMesin.tekanan;
	           $scope.item.waktuMulai = pencatatanSuhuMesin.waktuMulai;
	           $scope.item.waktuSelesai = pencatatanSuhuMesin.waktuSelesai;
	           $scope.item.lamaProses = pencatatanSuhuMesin.lamaProses;
	           $scope.item.petugas = {"id" : pencatatanSuhuMesin.idPegawai,"namaLengkap" : pencatatanSuhuMesin.namaPegawai}
	           
		    });  
           	 toastr.info('1 Data Dipilih');
          }

	       $scope.ChangeDat = function(){
	       	    $scope.isLoading = true;
		    	$scope.Pencarians = "";
		    	$scope.Pencarians = undefined;
		    	$scope.Rubahdat = false;
		    	$scope.Cari();
		    	$scope.isLoading = false;
		    }

		  	 $scope.ClearCari = function(Pencarians){
			    $scope.item.Pencarians = "";
			     var gridData = $("#kGrid").data("kendoGrid");
			     gridData.dataSource.filter({});
			  }

			 $scope.Cari = function(Pencarians){
			 	debugger
			 	$scope.number = 1;
				  var getPencarian = Pencarians;
	              var tanggalawalParse = new moment($scope.item.awal).format('YYYY-MM-DD')
	              var tanggalakhirParse = new moment($scope.item.akhir).format('YYYY-MM-DD');
				   if($scope.Rubahdat == false && getPencarian == undefined){
				   	 IPSRSService.getItem("bowidick/get-bowidick?startDate="+tanggalawalParse+"&endDate="+tanggalakhirParse, true).then(function(dat){
				      debugger
				      $scope.dataMaster = dat.data.data.data;
				      	for(var i=0; i<$scope.dataMaster.length; i++){
					    	var tanggalParse = new moment($scope.dataMaster[i].tanggal).format('YYYY-MM-DD');
					    	$scope.dataMaster[i].tanggal = tanggalParse;
					    	$scope.dataMaster[i].no = $scope.number++;
					    }
					    
						$scope.dataSource = new kendo.data.DataSource({
						 pageSize:20,
						 data : $scope.dataMaster,
						 $scrollable : true
					     }); 

				      });
			      }else{
			   		$scope.FilterdataSource(getPencarian);
			      }

			   }
			   $scope.Cari();

			 $scope.FilterdataSource = function(getPencarian){
			   	if(getPencarian != undefined){
			   	 var q = getPencarian;
			     var grid = $("#kGrid").data("kendoGrid");
			     	  grid.dataSource.query({
			          page:1,
			          pageSize:20,
			          filter:{
			          	logic:"or",
			         		 filters:[{field:"namaMesin", operator:"contains",value:q},
			         		          {field:"namaPegawai", operator:"contains",value:q}]
			          }
			      });
			   	}
			  }	


               $scope.columnPermohonanPerubahanStatus = [
						{ "field":"no",
						  "title":"<h3 align=center>No.</h3>", 
						  "width":"20px" 
						},
						{ "field":"tanggal",
						  "title":"<h3 align=center>Tanggal</h3>", 
						  "width":"60px" 
						},
						{ "field":"namaMesin",
						  "title":"<h3 align=center>Nama Mesin</h3>", 
						  "width":"160px" 
						},
					    {  field:"Waktu", title: "<h3 align=center>Waktu<h3>",headerAttributes: { style: "text-align : center"},
								columns :[
											{
												"field": "waktuMulai",
												"title": "<h3 align=center>Mulai<h3>",
												"width": "50px"
											}, 
											{
												"field": "waktuSelesai",
												"title": "<h3 align=center>Selesai<h3>",
												"width": "50px"
											}, 
											{
												"field": "lamaProses",
												"title": "<h3 align=center>Lama<h3>",
												"width": "50px"
											}
										]
					   },					
					   { "field":"suhu",
						  "title":"<h3 align=center>Suhu</h3>", 
						  "width":"40px" 
					   },
					   { "field":"tekanan",
						  "title":"<h3 align=center>Tekanan</h3>", 
						  "width":"40px" 
					  },
					  { "field":"namaPegawai",
						  "title":"<h3 align=center>Pegawai</h3>", 
						  "width":"80px" 
					  }]
 

		$scope.batal = function(){
			$state.go('home');
		}

		 $scope.Save = function(){
		 debugger
		     $scope.saveShow = false;
		     $scope.isLoading = true;
		 	 var TanggalBowidick = DateHelper.formatDate($scope.item.tanggalBowidick,"YYYY-MM-DD");
			 var TanggalBiological = DateHelper.formatDate($scope.item.tanggalBiological,"YYYY-MM-DD");
			 var TanggalAttestPembanding = DateHelper.formatDate($scope.item.tanggalAttestPembanding,"YYYY-MM-DD");
			 var Tanggal = DateHelper.formatDate($scope.item.tanggal,"YYYY-MM-DD");

			if($scope.ModeEdit === true){
				var JamMasukBiological = $scope.item.jamMasukBiological;
				var JamKeluarBiological = $scope.item.jamKeluarBiological;

				var JamMasukAttest = $scope.item.jamMasukAttestPembanding;
				var JamKeluarAttest = $scope.item.jamKeluarAttestPembanding;				

				var JamMasuk = $scope.item.waktuMulai;
				var JamKeluar = $scope.item.waktuSelesai;

			}else{
				var JamMasukBiological = DateHelper.formatDate($scope.item.jamMasukBiological, "HH:mm");
				var JamKeluarBiological = DateHelper.formatDate($scope.item.jamKeluarBiological, "HH:mm");

				var JamMasukAttest = DateHelper.formatDate($scope.item.jamMasukAttestPembanding, "HH:mm");
				var JamKeluarAttest = DateHelper.formatDate($scope.item.jamKeluarAttestPembanding, "HH:mm");				

				var JamMasuk = DateHelper.formatDate($scope.item.waktuMulai, "HH:mm");
				var JamKeluar = DateHelper.formatDate($scope.item.waktuSelesai, "HH:mm");
			}


	            var listRawRequired = [
	            	/*Bowidick*/
			          "item.noMesin|k-ng-model|No Mesin",
			          "item.suhuBowdick|ng-model|Suhu Mesin Bowidick",
			          "item.hasilBowidick|ng-model|Hasil Bowidick",
			          "item.tanggalBowidick|k-ng-model|Tanggal Bowidick",
			          "item.operatorBowidick|k-ng-model|Operator Bowidick",
			          "item.SupervisiorBowidick|k-ng-model|Supervisior Bowidick",
			         

			          /*Biological*/
			          "item.tanggalBiological|k-ng-model|Tanggal Biological",
			          "item.operatorBiological|k-ng-model|Operator Biological",
			          "item.suhuBiological|ng-model|Suhu Pensterilan",
			          "item.suhuIncubatorBiological|ng-model|Suhu Incubator",
			          "item.hasilBilogical|ng-model|Hasil Biological",
			          "item.jamMasukBiological|k-ng-model|Jam Masuk Biological",
			          "item.jamKeluarBiological|k-ng-model|Jam Keluar Biological",

			          /*Attest Pembanding*/	
			          "item.tanggalAttestPembanding|k-ng-model|Tanggal Attest Pembanding",
			          "item.operatorAttestPembanding|k-ng-model|Operator Attest Pembanding",
			          "item.suhuPensterilanAttestPembanding|ng-model|Suhu Pensterilan Attest Pembanding",
			          "item.suhuIncubatorAttestPembanding|ng-model|Suhu Incubator Attest Pembanding",
			          "item.hasilAttestPembanding|ng-model|Hasil Attest Pembanding",
			          "item.jamMasukAttestPembanding|k-ng-model|Jam Masuk Attest Pembanding",
			          "item.jamKeluarAttestPembanding|k-ng-model|Jam Keluar Attest Pembanding",
			          
			          /*Grafik*/	
			          "item.tanggal|k-ng-model|Tanggal",
			          "item.tekanan|ng-model|Tekanan",
			          "item.waktuMulai|k-ng-model|Waktu Mulai",
			          "item.programMesin|ng-model|Program Mesin",
			          "item.waktuSelesai|k-ng-model|Waktu Selesai",
			          "item.lamaProses|ng-model|Lama Proses",
			          "item.petugas|k-ng-model|Petugas",
			        ];

	        var isValid = ModelItem.setValidation($scope, listRawRequired); 
		    if(isValid.status){
		    	debugger
				var data = {

							"pencatatanMesinNoRec": $scope.NorecpencatatanSuhuMesin,
							"bowidickNoRec":$scope.NorecBowidick,
							"biologicalNoRec":$scope.NorecBiological,
							"attestPembandingNoRec":$scope.NorecAttestPembanding,

							"mesinId": $scope.item.noMesin.id,
							"suhu":$scope.item.suhuBowdick,
							"hasil":$scope.item.hasilBowidick,
							"tanggalBowidick":TanggalBowidick,
							"operatorId" : $scope.item.operatorBowidick.id,
							"supervisorId":$scope.item.SupervisiorBowidick.id,

							"tanggalBiological" : TanggalBiological,
							"operatorBiologicalId":$scope.item.operatorBiological.id,
							"suhuPensterilan" :$scope.item.suhuBiological,
							"suhuIncubator":$scope.item.suhuIncubatorBiological,
							"hasilBiological":$scope.item.hasilBilogical,
							"jamMasukBiological":JamMasukBiological,
							"jamKeluarBiological":JamKeluarBiological,
							
							"tanggalAttest" : TanggalAttestPembanding,
							"operatorAttestId":$scope.item.operatorAttestPembanding.id,
							"suhuPensterilanAttest" :$scope.item.suhuPensterilanAttestPembanding,
							"suhuIncubatorAttest":$scope.item.suhuIncubatorAttestPembanding,
							"hasilAttest":$scope.item.hasilAttestPembanding,
							"jamMasukAttest":JamMasukAttest,
							"jamKeluarAttest":JamKeluarAttest,
							
							"tanggal":Tanggal,
							"tekanan":$scope.item.tekanan,
							"waktuMulai":JamMasuk,
							"waktuSelesai":JamKeluar,
							"lamaProses":$scope.item.lamaProses,
							"programMesin":$scope.item.programMesin,
							"petugasId": $scope.item.petugas.id,
							"StatusEnabled" : true
						}
						/*console.log(JSON.stringify(data));*/
						ManageSarpras.saveSarpras(data,  "bowidick/save-bowidick").then(function(e) {
		                	$scope.Cari();
		                	$scope.saveShow = true;
		                	$scope.isLoading = false;
						});
			    }else{
			           $scope.saveShow = true;
			           $scope.isLoading = false;
				  	   ModelItem.showMessages(isValid.messages);
				} 
			 }
			  $scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
		}
	]);
});