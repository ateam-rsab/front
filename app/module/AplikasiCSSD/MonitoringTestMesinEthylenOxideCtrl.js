define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MonitoringTestMesinEthylenOxideCtrl', ['$rootScope', '$scope', 'ModelItem','ManageSarpras','DateHelper','$state',
		function($rootScope, $scope, ModelItem, ManageSarpras,DateHelper,$state) {
			ModelItem.get("CSSD/MonitoringTestMesinEthylenOxide").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.awal = $scope.now;
				$scope.item.akhir = $scope.now;
				$scope.item.tglMulai = $scope.now;
				$scope.item.tglSelesai = $scope.now;
				$scope.Rubahdat = false;
				$scope.jamdisable = false;
				$scope.dataVOloaded = true;
				$scope.statusSave = true;
				$scope.ModeEdit = false;
                $scope.mainGridOptions = { 
	                pageable: true,
	                editable: false
	            };

	          $scope.ChangeDat = function(){
	       	    $scope.isLoading = true;
		    	$scope.Pencarians = "";
		    	$scope.Pencarians = undefined;
		    	$scope.Rubahdat = false;
		    	$scope.init();
		    	$scope.isLoading = false;
		    }

		      $scope.Refresh = function(){
		      	$scope.jamdisable = false;
		      	$scope.ModeEdit = false;
				$scope.item = {};
			    $scope.now = new Date();
				$scope.item.awal = $scope.now;
				$scope.item.akhir = $scope.now;
				$scope.item.tglMulai = $scope.now;
				$scope.item.tglSelesai = $scope.now;
				$scope.noRec = undefined;
			}

		    $scope.batal = function(){
		    	$state.go('home');
		    }

		    $scope.ClearCari = function(Pencarians){
			    $scope.item.Pencarians = "";
			     var gridData = $("#grid").data("kendoGrid");
			     gridData.dataSource.filter({});
			 }

		    $scope.klik = function(dataSelected){
				if(dataSelected != undefined){
					$scope.jamdisable = true
					$scope.ModeEdit = true;
					$scope.item.tglMulai = dataSelected.tanggalMulai;
					$scope.item.tglSelesai = dataSelected.tanggalSelesai;
					$scope.waktuMulaiSave = dataSelected.jamMulai;
					$scope.waktuAkhirSave = dataSelected.jamSelesai;
				    $scope.item.jamMulai = new Date('1970-01-01T' + $scope.waktuMulaiSave); //Convert To Standard GMT
				    $scope.item.jamSelesai = new Date('1970-01-01T' + $scope.waktuAkhirSave); //Convert To Standard GMT
				    $scope.item.pemeriksaan = dataSelected.pemeriksaan;
				    $scope.item.petugas = {id : dataSelected.idPetugas, namaLengkap : dataSelected.namaPegawai}
					$scope.noRec = dataSelected.noRec;
					toastr.info('1 Data Edit Dipilih ');
				}	
			}

			$scope.RubahJamMulai = function(){
				$scope.item.jamMulai;
				$scope.item.jamSelesai;
			}

	     	$scope.init = function(Pencarians){
	     		var getPencarian = Pencarians;
	     		var tanggalawalParse = new moment($scope.item.awal).format('YYYY-MM-DD')
	            var tanggalakhirParse = new moment($scope.item.akhir).format('YYYY-MM-DD');
	     		var no = 1;
	     		if($scope.Rubahdat == false && getPencarian == undefined){
		     	ManageSarpras.getOrderList("monitoringtestentylenoxide/get-monitoring-test-entylen-oxide?startDate="+tanggalawalParse+"&endDate="+tanggalakhirParse, true).then(function(dat){
	              debugger
	              $scope.datagrid = dat.data.data;
	              for(var i=0; i<$scope.datagrid.length; i++){
	              	$scope.datagrid[i].no = no++;
					var tanggalMulai = new moment($scope.datagrid[i].tanggalMulai).format('YYYY-MM-DD');
					var tanggalSelesai = new moment($scope.datagrid[i].tanggalSelesai).format('YYYY-MM-DD'); 
	                 $scope.datagrid[i].tanggalMulai = tanggalMulai;
	                 $scope.datagrid[i].tanggalSelesai = tanggalSelesai;

	              } 
					$scope.dataSource = new kendo.data.DataSource({
						data: $scope.datagrid,
						pageable: true,
		                sortable: true,
						batch: true,
						autoSync: false
					});
				});
			  }else{
			  	$scope.FilterdataSource(Pencarians)
			  }
			}
			$scope.init();

		  ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
	              $scope.dataMasterPetugas = dat.data;
	           });	

			$scope.FilterdataSource = function(getPencarian){
			   	if(getPencarian != undefined){
			   	 var q = getPencarian;
			     var grid = $("#grid").data("kendoGrid");
			     	  grid.dataSource.query({
			          page:1,
			          pageSize:20,
			          filter:{
			          	logic:"or",
			         		 filters:[{field:"pemeriksaan", operator:"contains",value:q},
			         		          {field:"namaPegawai", operator:"contains",value:q}]
			          }
			      });
			   	}
			  }	


			$scope.columnTesAlat = [{
					"field": "no",
					"title": "<h3 align=center>No. <h3>",
					"width": "40px",
					"filterable" : false
				},
				{
					"field": "tanggalMulai",
					"title": "<h3 align=center>Tanggal Mulai<h3>",
					"width": "100px",
					"attributes": {
		                             "class": "table-cell"
		                           },
		            "filterable" : false
		          
				},					
				{
					"field": "tanggalSelesai",
					"title": "<h3 align=center>Tanggal Selesai<h3>",
					"width": "100px",
					"attributes": {
		                             "class": "table-cell"
		                           },
		            "filterable" : false
		          
				},			
				{
					"field": "jamMulai",
					"title": "<h3 align=center>Jam Mulai<h3>",
					"width": "100px",
					"attributes": {
		                             "class": "table-cell"
		                           },
		            "filterable" : false
				},
				{
					"field": "jamSelesai",
					"title": "<h3 align=center>Jam Selesai<h3>",
					"width": "100px",
					"attributes": {
		                             "class": "table-cell"
		                           },
		            "filterable" : false
				},			
				{
					"field": "pemeriksaan",
					"title": "<h3 align=center>Pemeriksaan 24 Jam<h3>",
					"width": "100px",
					"attributes": {
		                             "class": "table-cell"
		                           },
		            "filterable" : false
				},			
				{
					"field": "namaPegawai",
					"title": "<h3 align=center>Petugas<h3>",
					"width": "100px",
					"attributes": {
		                             "class": "table-cell"
		                           },
	               "filterable" : false	                           
				},
			    {
				 "title": "<h3 align=center>Action</h3>",
			      "width" : "100px",
			     "template" : "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
		     	}
			];

			$scope.disableData = function (function_name){
 				var viewDataCurrent = this.dataItem;
				var data = {
					"noRec":viewDataCurrent.noRec,
					"tanggalMulai":viewDataCurrent.tanggalMulai,
					"tanggalSelesai":viewDataCurrent.tanggalSelesai,
					"jamMulai": viewDataCurrent.jamMulai,
					"jamSelesai":viewDataCurrent.jamSelesai,
					"pemeriksaan" : viewDataCurrent.pemeriksaan,
					"petugasId":viewDataCurrent.idPetugas,
					"statusEnabled":false
				}

		    	ManageSarpras.saveDataUji(data, "monitoringtestentylenoxide/save-monitoring-test-entylen-oxide").then(function (e) {
					$scope.init();
					$scope.item = {};
					$scope.noRec = undefined;
				});
			}

		      $scope.Save = function(){
		      	debugger
					 var TanggalMulai = DateHelper.formatDate($scope.item.tglMulai,"YYYY-MM-DD");
					 var TanggalSelesai = DateHelper.formatDate($scope.item.tglSelesai,"YYYY-MM-DD");
					 var jamAwal = new moment($scope.item.jamMulai).format('HH:mm');
					 var jamAkhir = new moment($scope.item.jamSelesai).format('HH:mm');	

					  var data = {
						"noRec":$scope.noRec,
						"tanggalMulai":TanggalMulai,
						"tanggalSelesai":TanggalSelesai,
						"jamMulai": jamAwal,
						"jamSelesai":jamAkhir,
						"pemeriksaan" : $scope.item.pemeriksaan,
						"petugasId":$scope.item.petugas.id,
						"statusEnabled":$scope.statusSave
					 }
				 ManageSarpras.saveDataUji(data, "monitoringtestentylenoxide/save-monitoring-test-entylen-oxide").then(function (e) {
		         	$scope.init();
		         	$scope.item = {};
		         	$scope.noRec = undefined;
				 });
			    }
			}, function errorCallBack(err) {});
		}
	]);
});