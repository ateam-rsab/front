define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenangananKeluhanPelangganCtrl', ['$rootScope', '$scope', 'ModelItem','ManageSarpras','DateHelper', '$document', 'R','$state',
		function($rootScope, $scope, ModelItem,ManageSarpras,DateHelper, $document, r,$state) {		
			$scope.title = "Resep elektronik";			
			$scope.dataVOloaded = true;
            $scope.item={};
            var now = new Date()
            $scope.item.awal = now; 
            $scope.item.akhir = now; 
            $scope.item.TglPenangan = new moment(new Date()).format('YYYY-MM-DD');
            $scope.item.email=$state.params.email;
            $scope.item.idKeluhan = $state.params.idKeluhan;
            $scope.item.keluhan = $state.params.keluhan;
            $scope.item.saran = $state.params.saran;
			$scope.now = new Date();
			
		     $scope.OnInt = function(){
				 ManageSarpras.getOrderList("penanganan-keluhan-pelanggan/get-login-user/" ).then(function(data){
			        $scope.item.emailLogin = data.data.data.email;
				    $scope.item.user = data.data.data.name;
			 	 });		     	
		     }
		     $scope.OnInt();

		     $scope.$watch('item.pencarian', function(e) {
		      	var q = e;
		      	var grid = $("#kGrid").data("kendoGrid");
		      	if(e == ""){
		      	   grid.dataSource.filter({});
		      	}else{
		      	   grid.dataSource.query({
		      		 page:1,
		      		 pageSize:20,
		      		 filter:{
		      			 logic : "or",
		      			 filters:[{field :"namaPetugas", operator:"contains", value:q},
		      					   {field :"email", operator:"contains", value:q},
		      					   {field:"emailPelanggan", operator:"contains", value:q}
		      					 ]
		      		 }
		      	   })
		      	 }   	
             });


		     $scope.Clear = function(){
		     	var grid = $("#kGrid").data("kendoGrid");
		     	grid.dataSource.filter({});
		     	$scope.item.awal = new moment(new Date()).format("YYYY-MM-DD");
		     	$scope.item.akhir = new moment(new Date()).format("YYYY-MM-DD");
		     	$scope.item.pencarian = "";
		     	$scope.item.emailLogin = "";
			    $scope.item.reply = "";
		     }

		     $scope.mainGridOptions = {
                pageable: true,
                scrollable: true,
                selectable: "row"
            };


            $scope.OnIntData = function(){
            	var awalTgl = new moment($scope.item.awal).format('YYYY-MM-DD');
            	var AkhirTgl = new moment($scope.item.akhir).format('YYYY-MM-DD');
            	var number = 1
		        ManageSarpras.getOrderList("/penanganan-keluhan-pelanggan/find-all-penanganan-keluhan-pelanggan/?startDate="+awalTgl+"&endDate="+AkhirTgl, true).then(function(e){
			    	$scope.datasource =  e.data.data.data;	
			    	for(var i=0; i<$scope.datasource.length; i++){
			    		$scope.datasource[i].no = number+++".";
			    		$scope.datasource[i].tanggal = new moment($scope.datasource[i].tanggal).format('YYYY-MM-DD');
			    	}	
		 	    });            	
            }
            $scope.OnIntData();

             $scope.columnPermohonanPerubahanStatus = [
				{ "field":"no",
				  "title":"<h3 align=center>No</h3>", 
				  "width":"10px",
				  "attributes" : { style:"text-align:center"}
				},			
				{ "field":"tanggal",
				  "title":"<h3 align=center>Tanggal</h3>", 
				  "width":"20px",
				  "attributes" : {style:"text-align:center"}
				},				
				{ "field":"namaPetugas",
				  "title":"<h3 align=center>Petugas</h3>", 
				  "width":"60px" 
				},
				{ "field":"email",
				  "title":"<h3 align=center>Email</h3>", 
				  "width":"120px" 
				},			
				{ "field":"emailPelanggan",
				  "title":"<h3 align=center>Email Tujuan</h3>", 
				  "width":"120px" 
				}			
				]

	          $scope.Cari = function(GetPencarian){
	          	debugger
				  var q = GetPencarian;
			      var grid = $("#kGrid").data("kendoGrid");
			     	  grid.dataSource.query({
			          page:1,
			          pageSize:20,
			          filter:{
			          	logic:"or",
			         		 filters:[
			            		       {field:"namaPegawai", operator:"contains",value:q},
			            		       {field:"email", operator:"contains",value:q},
			            		       {field:"emailTujuan", operator:"contains",value:q}
			           				 ]
			           }
			      });
		    }

		    $scope.ClearForm = function() {
		    	// body...
		    	$scope.item.emailLogin =  "";
		    	$scope.item.reply = "";
		    }

		    $scope.DaftarKeluhanPelanggan = function(){
		    	// Back To Daftar
		    	$state.go('DaftarKeluhanPelanggan');
		    }

             
			
			$scope.Save=function(){	
				debugger
				console.log($scope.item);
                ManageSarpras.savePenangananKeluhanPelanggan(ModelItem.beforePost($scope.item)).then(function(e) {
                	$scope.OnIntData();
                });
			};
		}
	]);
});