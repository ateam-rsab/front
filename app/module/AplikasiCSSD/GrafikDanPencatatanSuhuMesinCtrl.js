define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('GrafikDanPencatatanSuhuMesinCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper','ManageSarpras','IPSRSService','$state',
		function($rootScope, $scope, ModelItem, DateHelper,ManageSarpras,IPSRSService,$state){
			$scope.title = "";
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.tanggal = $scope.now;
		    IPSRSService.getItem("pencatatan-suhu-mesin/get-mesin", true).then(function(dat){
			      $scope.listMesin = dat.data.data;
			});

		    $scope.getPegawai = function(){
	           IPSRSService.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
            	 $scope.dataMasterPegawai = dat.data;
               });
	        }
	        $scope.getPegawai();

	        $scope.klik = function(current){
	        	debugger
	        	$scope.modeEdit = true;
	        	$scope.noRec = current.noRes;
	        	$scope.item.tanggal = current.TanggalParse;
	        	$scope.item.mesin = {
	        		id : current.idMesin,
	        		namaExternal : current.namaMesin
	        	}
	        	$scope.item.cycle = current.programMesin;
	        	$scope.waktuMulaiSave = current.waktuMulai;
	        	$scope.waktuAkhirSave =  current.waktuSelesai;
	        	$scope.item.waktuMulai = new Date('1970-01-01T' + $scope.waktuMulaiSave); //Convert To Standard GMT
				$scope.item.jamAkhir = new Date('1970-01-01T' + $scope.waktuAkhirSave); //Convert To Standard GMT
	        	$scope.item.lamaProses = current.lamaProses;
	        	$scope.item.suhu = current.suhu;
	        	$scope.item.tekanan = current.tekanan;
	        	$scope.item.petugas = {namaLengkap : current.namaPegawai,
	        	id : current.idPegawai};
	        }
		    
		    $scope.init = function(){
		    $scope.no = 1;
			  IPSRSService.getItem("pencatatan-suhu-mesin/get-pencatatan-suhu-mesin-grafik", true).then(function(dat){
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

	    $scope.Refresh = function(){
	    	$scope.item = {};
	    	$scope.noRec = undefined;
	    }

	   $scope.ClearCari = function(){
		    $scope.item.pencarians = "";
		    var gridData = $("#kGrid").data("kendoGrid");
		    gridData.dataSource.filter({});
		}
			

	      $scope.SetTotalJam = function(){
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
			      "width" : "50px",
			     "template" : "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
		     	}]

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

		   $scope.disableData = function(){
	        debugger
            $scope.Alldata = this.dataItem;
 			var data = {  
 						 "noRec" : $scope.Alldata.noRes,
						 "mesin":{"id":$scope.Alldata.idMesin},
						 "petugas":{"id":$scope.Alldata.idPegawai},
						 "tanggal":$scope.Alldata.TanggalParse,
						 "programMesin":$scope.Alldata.programMesin,
						 "waktuMulai": $scope.Alldata.waktuMulai,
						 "waktuSelesai": $scope.Alldata.waktuSelesai,
						 "lamaProses":$scope.Alldata.lamaProses,
						 "suhu":$scope.Alldata.suhu,
						 "tekanan":$scope.Alldata.tekanan,
						 "statusEnabled" : false
						}
		     ManageSarpras.saveDataUji(data, "pencatatan-suhu-mesin/save-pencatatan-suhu-mesin-grafik/").then(function (e) {
		         $scope.init();
		         $scope.item = {};
				 });
          }


			$scope.Save = function(){
			debugger
			var Tanggal = DateHelper.formatDate($scope.item.tanggal,"YYYY-MM-DD");
		    var JamAwal = new moment($scope.item.waktuMulai).format('HH:mm');
			var JamAkhir = new moment($scope.item.jamAkhir).format('HH:mm');	
		    var listRawRequired = [
	          "item.mesin|k-ng-model|Mesin",
	          "item.cycle|ng-model|Cycle",
	          "item.petugas|ng-model|Petugas",
	          "item.tanggal|k-ng-model|Tanggal",
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
						 "waktuMulai": JamAwal,
						 "waktuSelesai": JamAkhir,
						 "lamaProses":$scope.item.lamaProses,
						 "suhu":$scope.item.suhu,
						 "tekanan":$scope.item.tekanan,
						 "statusEnabled" : true
						}
	         ManageSarpras.saveDataUji(data, "pencatatan-suhu-mesin/save-pencatatan-suhu-mesin-grafik/").then(function (e) {
	         $scope.init();
	         $scope.item = {};
			 });
		    }else{
			  	 ModelItem.showMessages(isValid.messages);
			} 
		 }


	}])
})