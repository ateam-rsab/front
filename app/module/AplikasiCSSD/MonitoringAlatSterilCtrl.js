define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MonitoringAlatSterilCtrl', ['$rootScope', '$scope', 'ModelItem','ManageSarpras','$state','DateHelper',
		function($rootScope, $scope, ModelItem,ManageSarpras,$state,DateHelper) {
			ModelItem.get("CSSD/MonitoringAlatSteril").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.item.tglPengecekan = new Date();
				$scope.item.tglSterilisasi = new Date();
				$scope.item.tglKadaluarsa = new Date();
				$scope.item.awal = $scope.now;
				$scope.item.akhir = $scope.now;
				$scope.statusSave = true;
				$scope.Rubahdat = false;
				ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
	              $scope.dataMasterPetugas = dat.data;
	           });	

				$scope.klik = function(dataSelected){
					if(dataSelected != undefined){
						$scope.item.tglKadaluarsa = dataSelected.tanggalKadaluarsa
						$scope.item.tglSterilisasi = dataSelected.tanggalSteril
						$scope.item.tglPengecekan = dataSelected.tanggalPengecekan
						$scope.item.ruangan = {id : dataSelected.idRuangan, namaRuangan : dataSelected.namaRuangan}
						$scope.item.satuan = {id :dataSelected.idSatuan,satuanStandar : dataSelected.namaSatuan}
					    $scope.item.petugas = {id : dataSelected.idPegawai, namaLengkap : dataSelected.namaPegawai}
						$scope.item.namaAlat = {id : dataSelected.idAlat, namaAlat : dataSelected.namaAlat}
						$scope.noRec = dataSelected.noRec;
						$scope.item.jumlah = dataSelected.jumlah;
						toastr.info('1 Data Edit Dipilih ');
					}	
				}

				$scope.listSatuan = ModelItem.kendoHttpSource('service/list-generic/?view=SatuanStandar&select=satuanStandar,id', true);

				$scope.gridFetch = function(){
					ManageSarpras.getOrderList("mapping-alat-to-bundle/get-mesin-all", true).then(function(dat){
						$scope.listBundel = dat.data.data;
					});
				}
				$scope.gridFetch();

	            $scope.batal = function(){
	            	$state.go('home');
	            }

			  $scope.mainGridOptions = { 
					pageable: true,
					filterable: {
								  extra: false,operators: {string: {startsWith: "Pencarian"}}
							    },
		            sortable: true,
		            editable : false
		     	}


		   $scope.ChangeDat = function(){
	       	    $scope.isLoading = true;
		    	$scope.Pencarians = "";
		    	$scope.Pencarians = undefined;
		    	$scope.Rubahdat = false;
		    	$scope.init();
		    	$scope.isLoading = false;
		    } 	

		     $scope.ClearCari = function(Pencarians){
			    $scope.item.Pencarians = "";
			     var gridData = $("#grid").data("kendoGrid");
			     gridData.dataSource.filter({});
			 }

	     	$scope.init = function(Pencarians){
	     		var getPencarian = Pencarians;
	     		var tanggalawalParse = new moment($scope.item.awal).format('YYYY-MM-DD')
	            var tanggalakhirParse = new moment($scope.item.akhir).format('YYYY-MM-DD');
	     		var no = 1;
	     		if($scope.Rubahdat == false && getPencarian == undefined){
		     	ManageSarpras.getOrderList("monitoringalatsteril/get-monitoringalatsteril?startDate="+tanggalawalParse+"&endDate="+tanggalakhirParse, true).then(function(dat){
	              debugger
	              $scope.datagrid = dat.data.data;
	              for(var i=0; i<$scope.datagrid.length; i++){
	              	$scope.datagrid[i].no = no++;
					var tanggalSteril = new moment($scope.datagrid[i].tanggalSteril).format('YYYY-MM-DD');
					var tanggalKadaluarsa = new moment($scope.datagrid[i].tanggalKadaluarsa).format('YYYY-MM-DD'); 
					var tanggalPengecekan = new moment($scope.datagrid[i].tanggalPengecekan).format('YYYY-MM-DD');
	                 $scope.datagrid[i].tanggalSteril = tanggalSteril;
	                 $scope.datagrid[i].tanggalKadaluarsa = tanggalKadaluarsa;
	                 $scope.datagrid[i].tanggalPengecekan = tanggalPengecekan;

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

		    $scope.FilterdataSource = function(getPencarian){
			   	if(getPencarian != undefined){
			   	 var q = getPencarian;
			     var grid = $("#grid").data("kendoGrid");
			     	  grid.dataSource.query({
			          page:1,
			          pageSize:20,
			          filter:{
			          	logic:"or",
			         		 filters:[{field:"namaAlat", operator:"contains",value:q},
			         		          {field:"namaPegawai", operator:"contains",value:q},
			         		          {field:"namaRuangan", operator:"contains",value:q}]
			          }
			      });
			   	}
			  }	


            $scope.listRuangan = ModelItem.kendoHttpSource('service/list-generic/?view=Ruangan&select=namaRuangan,id', true);


			$scope.columnMonitoringAlat = [{
					"field": "no",
					"title": "<h3 align=center>No. <h3>",
					"width": "40px",
					"filterable" : false
				},
				{
					"field": "tanggalPengecekan",
					"title": "<h3 align=center>Tanggal Pengecekan<h3>",
					"width": "100px",
					"attributes": {
		                             "class": "table-cell"
		                           },
		            "filterable" : false
				},
				{
					"field": "namaRuangan",
					"title": "<h3 align=center>Ruangan<h3>",
					"width": "100px",
					"attributes": {
		                             "class": "table-cell"
		                           },
		            "filterable" : false
		          
				},			
				{
					"field": "namaAlat",
					"title": "<h3 align=center>Nama Alat<h3>",
					"width": "100px",
					"attributes": {
		                             "class": "table-cell"
		                           },
		            "filterable" : false
				},
				{
					"field": "tanggalSteril",
					"title": "<h3 align=center>Tanggal Steril<h3>",
					"width": "100px",
					"attributes": {
		                             "class": "table-cell"
		                           },
		            "filterable" : false
				},			
				{
					"field": "namaSatuan",
					"title": "<h3 align=center>Satuan<h3>",
					"width": "100px",
					"attributes": {
		                             "class": "table-cell"
		                           },
		            "filterable" : false
				},			
				{
					"field": "jumlah",
					"title": "<h3 align=center>Jumlah<h3>",
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
		          "width": "100px",
		          "template": "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
		        }
			];

			$scope.Refresh = function(){
				$scope.item = {};
			    $scope.now = new Date();
				$scope.item.tglPengecekan = new Date();
				$scope.item.tglSterilisasi = new Date();
				$scope.item.tglKadaluarsa = new Date();
			    $scope.item.awal = $scope.now;
				$scope.item.akhir = $scope.now;
				$scope.noRec = undefined;
				$scope.init();
			}

			$scope.disableData = function(){
				debugger
				var viewDataCurrent = this.dataItem;
				var data = {
					"noRec": viewDataCurrent.noRec,
					"tanggalPengecekan" : viewDataCurrent.tanggalPengecekan,
					"ruanganId" : viewDataCurrent.idRuangan,
					"alatId" : viewDataCurrent.idAlat,
					"petugasId" : viewDataCurrent.idPegawai,
					"satuanId" : viewDataCurrent.idSatuan,
					"jumlah" : viewDataCurrent.jumlah,
					"tanggalKadaluarsa" : viewDataCurrent.tanggalKadaluarsa,
					"tanggalSteril" : viewDataCurrent.tanggalSteril,
					"statusEnabled" : false
				}
				ManageSarpras.saveDataUji(data, "monitoringalatsteril/save-monitoringalatsteril").then(function(e){
					$scope.init();
					$scope.item = {};
					$scope.noRec = undefined;
		         	$scope.item.tglKadaluarsa = new Date();
		         	$scope.item.tglPengecekan = new Date();
		         	$scope.item.tglSterilisasi = new Date();
				})
			}

			$scope.Save = function(){
				debugger
				 var TanggalPengecekan = DateHelper.formatDate($scope.item.tglPengecekan,"YYYY-MM-DD");
				 var tanggalKadaluarsa = DateHelper.formatDate($scope.item.tglKadaluarsa,"YYYY-MM-DD");
				 var tanggalSteril = DateHelper.formatDate($scope.item.tglSterilisasi,"YYYY-MM-DD");
				 
				 var data = {
					"noRec":$scope.noRec,
					"tanggalPengecekan":TanggalPengecekan,
					"ruanganId" :$scope.item.ruangan.id,
					"alatId" :$scope.item.namaAlat.id,
					"petugasId":$scope.item.petugas.id,
					"satuanId" :$scope.item.satuan.id,
					"jumlah":$scope.item.jumlah,
					"tanggalKadaluarsa":tanggalKadaluarsa,
					"tanggalSteril":tanggalSteril,
					"statusEnabled":$scope.statusSave
			    }
			 ManageSarpras.saveDataUji(data, "monitoringalatsteril/save-monitoringalatsteril").then(function (e) {
	         	debugger
	         	$scope.init();
	         	debugger
	         	$scope.item = {};
	         	$scope.noRec = undefined;
	         	$scope.item.tglKadaluarsa = new Date();
	         	$scope.item.tglPengecekan = new Date();
	         	$scope.item.tglSterilisasi = new Date();
			 });
		    }

			}, function errorCallBack(err) {});
		}
	]);
});





//==========================================================SOURCE OLD DATA ========================================================
// $scope.gridMonitoringAlatSteril = { 
// pageable: true,
//  columns: [
//{ field:"tglPengecekan", title:"<center>TanggalPengecekan"},
// { field:"Ruangan",title:"<center>Ruangan"},
//  { field:"namaAlat",title:"<center>Nama Alat"},
// { field:"tglSteril",title:"<center>Tanggal Steril"},
// { field:"tglKadaluarsa",title:"<center>Tanggal Kadaluarsa"},
// { field:"satuan",title:"<center>Satuan"},
//  { field:"jumlah",title:"<center>Jumlah"},
//  { field:"petugas",title:"<center>Petugas"}/*,
//    { command: "destroy", title: "&nbsp;", width: 150 }*/
//],
//editable: false
//};


/*$scope.no = 1; 
$scope.tambah = function() {
var listRawRequired = [
"item.tglPengecekan|k-ng-model|Tanggal Pengecekan",
"item.tglSterilisasi|k-ng-model|Tanggal Sterilisasi",
"item.tglKadaluarsa|k-ng-model|Tanggal Kadaluarsa",
"item.ruangan|k-ng-model|Ruangan",
"item.namaAlat|k-ng-model|Nama Alat",
"item.satuan|ng-model|Satuan",
"item.jumlah|ng-model|Jumlah",
"item.petugas|k-ng-model|Petugas",
];

var isValid = ModelItem.setValidation($scope, listRawRequired);  
if(isValid.status){
var ParseTanggalPengecekan = new moment($scope.item.tglPengecekan).format("YYYY-MM-DD");
var ParseTanggalSteril = new moment($scope.item.tglSterilisasi).format("YYYY-MM-DD");
var ParseTanggalKadaluarsa = new moment($scope.item.tglKadaluarsa).format("YYYY-MM-DD");
var temporaryData = {
"no": $scope.no++,
"tglPengecekan": ParseTanggalPengecekan,
"Ruangan" :{namaRuangan : $scope.item.ruangan.namaRuangan, id : $scope.item.ruangan.id},
"namaAlat" : {name : $scope.item.namaAlat.name, id : $scope.item.namaAlat.id},
"tglSteril" : ParseTanggalSteril,
"tglKadaluarsa" : ParseTanggalKadaluarsa,
"satuan" : $scope.item.satuan,
"jumlah" : $scope.item.jumlah,
"petugas" : $scope.item.petugas.namaLengkap
}
$scope.dataSource.add(temporaryData);
}else{
ModelItem.showMessages(isValid.messages);
}
}*/