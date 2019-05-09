define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MembuatDraftSuratCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras',
		function($rootScope, $scope, ModelItem, ManageSarpras, FindSarpras) {
			/*ModelItem.get("Ketatausahaan/MembuatDraftSurat").then(function(data) {
			$scope.item = data;
			}, function errorCallBack(err) {});*/
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			ModelItem.getDataDummyGeneric("Departemen", false).then(function(data) {
				$scope.listDepartemen = data;
			})

			$scope.GetDataSurat = function(){
			   FindSarpras.getSarpras("draft-surat/get-no-surat/").then(function(dat){
		
		  		 $scope.getNosurat = dat.data.data
	   		   });					
			}
			$scope.GetDataSurat();			

			$scope.getAllDrafSurat = function(){
				var nomor = 1;
			   FindSarpras.getSarpras("draft-surat/grid-draft-surat").then(function(dat){
		  		 $scope.sourceDataGrid = dat.data.data;
		  		 for(var i=0; i<$scope.sourceDataGrid.length; i++){
		  		 	 $scope.sourceDataGrid[i].no =  nomor++
		  		 }
	   		   });					
			}
			$scope.getAllDrafSurat();



			FindSarpras.getSarpras("service/list-generic/?view=JenisSurat&select=id,name").then(function(dat){
				$scope.sourceJenisSurat = dat;
			});
			FindSarpras.getSarpras("service/list-generic/?view=Pegawai&select=id,namaLengkap").then(function(dat){
				$scope.sourcePegawai = dat;
			});			
			FindSarpras.getSarpras("service/list-generic/?view=Ruangan&select=*").then(function(dat){
				$scope.dataMasterRuangan = dat;
			});

			$scope.arrRuangan = [];
			$scope.tambahRuangan = function () {
				var data = {
					"noRec":"",
					"namaRuangan":"",
					"pegawai":{
						"id": ""
					}
				}
				$scope.arrRuangan.push(data);
			}

		      $scope.Cari = function(GetPencarian){
				  var q = GetPencarian;
			      var grid = $("#kGrid").data("kendoGrid");
			     	  grid.dataSource.query({
			          page:1,
			          pageSize:20,
			          filter:{
			          	logic:"or",
			         		 filters:[
			            		       {field:"noDraftSurat", operator:"contains",value:q},
			            		       {field:"judulSurat", operator:"contains",value:q}
			           				 ]
			           }
			      });
		    }


			$scope.verifikasiSurat = function() {
				$scope.verifikasi = true;
            };

           $scope.mainGridOptions = {
			pageable:true,
       		pageSize: 5,
			scrollable:true,
			selectable:'row',
			toolbar: ["excel", "pdf"],
            columns: [
            {
                "field": "no",
                "title": "<h3 align=center>No.<h3>",
				"filterable":true,
			    "width": "10px",
			    attributes: {
                             "class": "table-cell",
                                style: "text-align: center;"
                             },
			    "filterable" : false	
			},
			{
                "field": "noDraftSurat",
                "title": "<h3 align=center>No Draft Surat<h3>",
			    "width": "120px",
				"filterable":false
			},
			{
				"field" : "judulSurat",
				"title" : "<h3 align=center>Judul Surat<h3>",
				"filterable" : false,
				"width" : "100px"
			},
            {
                "field": "fileName",
                "title": "<h3 align=center>Nama fileName<h3>",
				"filterable":false,
				"width": "70px",
			    attributes: {
                             "class": "table-cell",
                                style: "text-align: center;"
                             },		
			},
			{
                "field": "isVerifikasi",
                "title": "<h3 align=center>Verifikasi<h3>",
			    "width": "30px",
				"filterable":false,
				attributes: {
                             "class": "table-cell",
                                style: "text-align: center;"
                             },
			},
			{
                "field": "status",
                "title": "<h3 align=center>Status<h3>",
                "width": "30px",
				"filterable":false	
			}
            ]
           };

           $scope.batal = function(){
           	 $scope.item = {};
             $scope.item.pencarian = "";
		     var gridData = $("#kGrid").data("kendoGrid");
		     gridData.dataSource.filter({});
           }

	      $scope.RemoveRuangan = function(data) {
	        $scope.arrRuangan.pop();
	        $scope.Ruangans.pop();
	      };

          $scope.Ruangans = []
           $scope.insertRuangan = function(){
           	debugger
           	for(var i=0; i<$scope.arrRuangan.length; i++){
           		debugger
           	 if($scope.item.Ruangan[i].namaRuangan != undefined || $scope.item.Ruangan[i].id){	
           	    var data = {
					"noRec":"",
					"namaRuangan":$scope.item.Ruangan[i].namaRuangan,
					"idRuangan": $scope.item.Ruangan[i].id	
				}
			 }else{		
			 	window.messageContainer.error('Nama Ruangan Tidak boleh ada yang kosong');
			 }
				$scope.Ruangans.push(data);
           	}
           }

			$scope.Save = function(){
			debugger
			var dataRuangan = [];
			$scope.insertRuangan();
	        $scope.Ruangans.forEach(function(croot){
	          var dataTemp = { "ruangan" : {"id":croot.idRuangan}}
	           dataRuangan.push(dataTemp);
	        })
			 var data = {
							"surat" : {"id":5},
							"keterangan" : $scope.item.keterangan,
							"judul" : $scope.item.judul,
							"isiSurat": $scope.item.isiSurat, 
							"jenisSurat" : {"id":$scope.item.jenisSurat.id},
							"draftSuratRuangan" : dataRuangan
						}
			   console.log(data);
			   ManageSarpras.saveDataUji(data, "draft-surat/save-draft-surat/").then(function (e) {
	            	$scope.item = {};
	            	$scope.getAllDrafSurat();
			    });
			};
			
			
		}
	]);
});


//========================================== SOURCE DATA OLD ==============================
// getBalanceStatus:function(){
//           var data = [
//                 { "id":"D", "value":"Debit"},
//                 { "id":"K", "value":"Kredit"}
//             ]
//           return data;
//         },
// FindSarpras.getNamaPengirim("user/get-all-user/").then(function(dat){
// 	$scope.sourceNamaPengirim = dat.data.data.data;
// });

/*			$scope.Save = function(){

			//	var data = {
			//		"judul" : $scope.item.judul,
			//		"listPegawai" : $scope.item.pegawai1,
			//		"noSurat": $scope.item.noSurat,
			//		"keterangan": $scope.item.keterangan,
			//		"isiSurat": $scope.item.isiSurat,
			//		"jenisSurat": $scope.item.jenisSurat,
			//		"xxx":$scope.item.sourcePegawai

			//	};

				ManageSarpras.saveSarpras("draft-surat/save-draft-surat/").then(function(e) {
					$scope.item = {};
				});
			};*/


/*$scope.tambah1=true;
$scope.Tambah1 = function() {

$scope.tambah2 = true;
$scope.pegawai2 = true;
$scope.tambah1 = false;

};
$scope.Tambah2 = function() {

$scope.tambah3 = true;
$scope.pegawai3 = true;
$scope.tambah2 = false;

};
$scope.Tambah3 = function() {

$scope.tambah4 = true;
$scope.pegawai4 = true;
$scope.tambah3 = false;

};
$scope.Tambah4 = function() {
$scope.pegawai5 = true;
$scope.tambah4 = false;
};*/