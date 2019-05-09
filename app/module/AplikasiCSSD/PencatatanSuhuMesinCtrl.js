define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('PencatatanSuhuMesinCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper','ManageSarpras','IPSRSService','$state',
		function($rootScope, $scope, ModelItem, DateHelper,ManageSarpras,IPSRSService,$state){
			$scope.title = "";
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.ModeEdit = false;
			$scope.item.tanggal = $scope.now;
			$scope.StatusSave = true;
			var JamAwalFormat = new moment($scope.item.tanggal).format("HH:mm");
			var JamAkhirFormat = new moment($scope.item.tanggal).format("HH:mm");
			//$scope.item.waktuMulai = JamAwalFormat;
			//$scope.item.jamAkhir = JamAkhirFormat;
			//$scope.item.lamaProses =  DateHelper.CountDifferenceHourMinute($scope.now,$scope.now);
		    //return $scope.item.lamaProses = TotalWaktu;
		    IPSRSService.getItem("pencatatan-suhu-mesin/get-mesin", true).then(function(dat){
			      $scope.listMesin = dat.data.data;
			});

		    $scope.getPegawai = function(){
	           IPSRSService.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
            	 $scope.dataMasterPegawai = dat.data;
               });
	        }
	        $scope.getPegawai();


		    
		    $scope.init = function(){
		      $scope.no = 1;
			   IPSRSService.getItem("pencatatan-suhu-mesin/get-pencatatan-suhu-mesin", true).then(function(dat){
				   $scope.dataMaster = dat.data.data;
				     for(var i=0; i<$scope.dataMaster.length; i++){
						 $scope.dataMaster[i].no = $scope.no++;
						 var ParseTgl = new moment($scope.dataMaster[i].tanggal).format('YYYY-MM-DD');
						 $scope.dataMaster[i].TanggalParse = ParseTgl;
				     }
				   $scope.dataSource = new kendo.data.DataSource({
					pageSize:50,
					data : $scope.dataMaster,
					$scrollable : true
				 });
			  });
			 }
			$scope.init();

			$scope.mainGridOptions = {
                pageable: true,
                scrollable: true,
                selectable: "row"
            };

	       $scope.Cari = function(GetPencarian){
				  var q = GetPencarian;
			      var grid = $("#kGrid").data("kendoGrid");
			     	  grid.dataSource.query({
			          page:1,
			          pageSize:20,
			          filter:{
			          	logic:"or",
			         		 filters:[
			            		       {field:"namaMesin", operator:"contains",value:q},
			            		       {field:"programMesin", operator:"contains",value:q},
			            		       {field:"namaPegawai", operator:"contains",value:q}
			           				 ]
			           }
			      });
		    }

	   $scope.ClearCari = function(){
		    $scope.item.pencarian = "";
		    var gridData = $("#kGrid").data("kendoGrid");
		    gridData.dataSource.filter({});
		}
			

	      $scope.SetTotalJam = function(){
	      	debugger
		   	var TotalWaktu = DateHelper.CountDifferenceHourMinute($scope.item.waktuMulai,$scope.item.jamAkhir);
		    return $scope.item.lamaProses = TotalWaktu;  
		  }

	        $scope.columnPermohonanPerubahanStatus = [
				{ "field":"no",
				  "title":"<h3 align=center>No</h3>", 
				  "width":"20px" 
				},			
				{ "field":"TanggalParse",
				  "title":"<h3 align=center>Tanggal</h3>", 
				  "width":"60px" 
				},
				{ "field":"namaPegawai",
				  "title":"<h3 align=center>Petugas</h3>", 
				  "width":"120px" 
				},
				{ field:"Waktu",title:"<h3 align=center>Waktu</h3>",headerAttributes: { style: "text-align : center"},
					columns:[
							{ field:"waktuMulai", title:"<h3 align=center>Mulai</h3>", width:100, filterable: false},
							{ field:"waktuSelesai", title:"<h3 align=center>Selesai</h3>", width:100, filterable: false}], width:"50px", filterable: false },
							
				{ "field":"lamaProses",
				  "title":"<h3 align=center>Lama Proses</h3>", 
				  "width":"50px" 
				},				
				{ "field":"namaMesin",
				  "title":"<h3 align=center>Nama Mesin</h3>", 
				  "width":"80px" 
				},				
				{ "field":"programMesin",
				  "title":"<h3 align=center>Program Mesin</h3>", 
				  "width":"80px" 
				},
				{ "field":"suhu",
				  "title":"<h3 align=center>Suhu</h3>", 
				  "width":"40px" 
				},				
				{ "field":"tekanan",
				  "title":"<h3 align=center>Tekanan</h3>", 
				  "width":"40px" 
				},
                {
				 "title": "<h3 align=center>Action</h3>",
			      "width" : "100px",
			     "template" : "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
		     	}]


		     $scope.Refresh = function(){
		     	$scope.item = {};
		     	$scope.noRec = undefined;
		     }


			$scope.listPetugas = [
				{
					"id": "1",
					"namaLengkap": "Rendra"
				},
				{
					"id": "2",
					"namaLengkap": "Rony"
				}
			];
			
			$scope.Batal = function(){
				$state.go('home');
			}

		  $scope.klik = function(dataSelected){
	        	$scope.ModeEdit = true;
	        	$scope.no = dataSelected.no;
				$scope.noRec = dataSelected.noRes;
				$scope.item.tanggal = dataSelected.TanggalParse,
				$scope.item.mesin = {id : dataSelected.idMesin,namaExternal:dataSelected.namaMesin};
				$scope.item.petugas ={id:dataSelected.idPegawai ,namaLengkap:dataSelected.namaPegawai};
				$scope.item.lamaProses = dataSelected.lamaProses;
				$scope.item.cycle = dataSelected.programMesin;
				$scope.item.tekanan = dataSelected.tekanan;
				$scope.waktuMulaiSave = dataSelected.waktuMulai;
                $scope.waktuAkhirSave = dataSelected.waktuSelesai;
				$scope.item.waktuMulai = new Date('1970-01-01T' + $scope.waktuMulaiSave); //Convert To Standard GMT
				$scope.item.jamAkhir = new Date('1970-01-01T' + $scope.waktuAkhirSave); //Convert To Standard GMT
				$scope.item.suhu = dataSelected.suhu;
	        }

	        
	        $scope.disableData = function(){
	        	debugger
            $scope.Alldata = this.dataItem;
          	   var data = {  
          	   		 "noRec" : $scope.Alldata.noRes,
					 "mesin":{"id":$scope.Alldata.idMesin,"namaExternal":$scope.Alldata.namaMesin},
					 "petugas":{"id":$scope.Alldata.idPegawai, "namaLengkap": $scope.Alldata.namaPegawai},
					 "tanggal":$scope.Alldata.TanggalParse,
					 "programMesin":$scope.Alldata.programMesin,
					 "waktuMulai": $scope.Alldata.waktuMulai,
					 "waktuSelesai": $scope.Alldata.waktuSelesai,
					 "lamaProses":$scope.Alldata.lamaProses,
					 "suhu":$scope.Alldata.suhu,
					 "tekanan":$scope.Alldata.tekanan,
					 "noRec" : $scope.Alldata.noRes,
					 "statusEnabled" : false,
					}
		     ManageSarpras.saveDataUji(data, "pencatatan-suhu-mesin/save-pencatatan-suhu-mesin/").then(function (e) {
		         $scope.init();
		         $scope.item = {};
				 });
          }



			$scope.Save = function(){
			debugger
			var jamAwal = new moment($scope.item.waktuMulai).format('HH:mm');
			var jamAkhir = new moment($scope.item.jamAkhir).format('HH:mm');			
			var Tanggal = DateHelper.formatDate($scope.item.tanggal,"YYYY-MM-DD");
		    var listRawRequired = [
	          "item.mesin|k-ng-model|Mesin",
	          "item.cycle|ng-model|Cycle",
	          "item.petugas|ng-model|Petugas",
	          "item.tanggal|ng-model|Tanggal",
	          "item.waktuMulai|k-ng-model|Waktu Mulai",
	          "item.jamAkhir|k-ng-model|Waktu Selesai",
	          "item.suhu|ng-model|Suhu",
	          "item.tekanan|ng-model|Tekanan",
	          "item.petugas|k-ng-model|Petugas",
	          "item.lamaProses|ng-model|Lama Proses",
	        ];
         var isValid = ModelItem.setValidation($scope, listRawRequired); 
         if(isValid.status){
			var data = {  
				         "noRec" : $scope.noRec,
						 "mesin":{"id":$scope.item.mesin.id},
						 "petugas":{"id":$scope.item.petugas.id},
						 "tanggal":$scope.item.tanggal,
						 "programMesin":$scope.item.cycle,
						 "waktuMulai": jamAwal,
						 "waktuSelesai": jamAkhir,
						 "lamaProses":$scope.item.lamaProses,
						 "suhu":$scope.item.suhu,
						 "tekanan":$scope.item.tekanan,
						 "noRec" : $scope.noRec,
					    "statusEnabled" : $scope.StatusSave,
						}
	         ManageSarpras.saveDataUji(data, "pencatatan-suhu-mesin/save-pencatatan-suhu-mesin/").then(function (e) {
	         $scope.init();
	         $scope.item = {};
	         $scope.ModeEdit == false
			 });
		    }else{
			  	 ModelItem.showMessages(isValid.messages);
			} 
		 }
	}])
})