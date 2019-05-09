define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('DataPesertaRumahSakitCtrl', ['$rootScope', '$scope', 'ModelItem', 'DataPerusahaanBekerjasama' ,'TampilDataPerusahaanBekerjasama', 'ManageSarpras', '$state',
        function($rootScope, $scope, ModelItem,DataPerusahaanBekerjasama,TampilDataPerusahaanBekerjasama, ManageSarpras, $state) {
		$scope.item = {};
		$scope.item.jenisKelamin = {id:1};

		$scope.OnInitComboRumahSakit = function(){
		   DataPerusahaanBekerjasama.getOrderList("/data-peserta-perusahaan-yang-bekerja-sama/get-rekanan-rumah-sakit/").then(function(e){
			$scope.ListDataPerusahaanBekerjasama = e.data.data.data;
		   })
		}
		$scope.OnInitComboRumahSakit();

		$scope.mainGridOptions = {
            pageable: true,
            scrollable: true,
            selectable: "row"
        };

		$scope.OnInitGetAllTransaksi = function(){		
		$scope.number = 1;
		   TampilDataPerusahaanBekerjasama.getOrderList("data-peserta-perusahaan-yang-bekerja-sama/find-all-peserta-rumah-sakit-yang-bekerja-sama/").then(function(dat){
				$scope.sourceOrder = dat.data.data.data;
				for(var i=0; $scope.sourceOrder.length; i++){
					$scope.sourceOrder[i].no = $scope.number++;
					if($scope.sourceOrder[i].jenisKelaminId == 1){
						$scope.sourceOrder[i].namaJenisKelamin = "Laki - laki"
					}else{
						$scope.sourceOrder[i].namaJenisKelamin = "Perempuan"
					}
				}
		   });
		};
	    $scope.OnInitGetAllTransaksi();	
		

	   $scope.columndataMasterDataPerusahaan= [
	        {
			"field": "no",
			"title": "<h3 align=center>No.<h3>",
			"width": "20px"
		    },	       
		    {
			"field": "namaPeserta",
			"title": "<h3 align=center>Nama Peserta<h3>",
			"width": "50px"
		    }, 
		    {
			"field": "namaJenisKelamin",
			"title": "<h3 align=center>Jenis Kelamin<h3>",
			"width": "40px"
		    }, 
		    {
			"field": "jumlahKeluarga",
			"title": "<h3 align=center>Jumlah Keluarga<h3>",
		    "width": "70px"
            }, 
            {
			"field": "plafonYangDijamin",
			"title": "<h3 align=center>Plafon Yang di jamin<h3>",
			"width": "50px" 
            }, 
            {
		    "field": "alamat",
			"title": "<h3 align=center>Alamat<h3>",
			"width": "50px"
            }, 
            {
			"field": "noTlp",
			"title": "<h3 align=center>No Telepon<h3>",
			"width": "50px"			
		    },
		    {
				 "title": "<h3 align=center>Action</h3>",
			     "width" : "20px",
			     "attributes": {
     			  "class": "table-cell",
      						style: "text-align: center; font-size: 14px"
    			 },
			     "template" : "<button class='btnHapus' ng-model='currents' ng-click='disableData(currents)'>Disable</button>"
			}
		 ];

		    $scope.disableData = function(currents) {
		    debugger
		         var currents =  this.dataItem
		    	 var data = {
                    "dataPerusahaanYangBekerjaSama": { noRec: currents.dataPerusahaanYangBekerjaSamaId },
                    "jenisKelamin": {
						            "id": currents.jenisKelaminId
						      },
                    "namaPeserta": currents.namaPeserta,
                    "jumlahKeluarga": currents.jumlahKeluarga,
                    "plafonYangDijamin": currents.plafonYangDijamin,
                    "alamat": currents.alamat,
                    "noTlp": currents.noTlp,
                    "statusEnabled" : false,
                    "noRec" : currents.noRec
                }
	         ManageSarpras.saveDataUji(data, "data-peserta-perusahaan-yang-bekerja-sama/save-data-peserta-perusahaan-yang-bekerja-sama/").then(function (e) {
	        		 $scope.OnInitGetAllTransaksi()
	        		 $scope.item = {};
	       			 $scope.ModeEdit == false
			 });
		    }
			
			
	       $scope.batal = function(){
				  $scope.item= {};
		    }

		  $scope.cari = function(){
		     TampilDataPerusahaanBekerjasama.getOrderList("data-peserta-perusahaan-yang-bekerja-sama/get-peserta-by-data-perusahaan/" + $scope.item.noRec.noRec + "/").then(function(dat){
			 	$scope.sourceOrder = dat.data.data;
		     });	
		    }


	       $scope.Save = function() {
             ManageSarpras.saveDataPerusahaanBekerjasama(ModelItem.beforePost($scope.item)).then(function (e) {
			     $scope.item= {};
	             $scope.OnInitGetAllTransaksi();
             });
           };

	  
           $scope.Save = function() {
          	var data = {
                    "dataPerusahaanYangBekerjaSama": { noRec: $scope.item.NamaRumahSakit.noRec },
                    "jenisKelamin": {
						            "id": $scope.item.jenisKelamin.id
						      },
                    "namaPeserta": $scope.item.namaPeserta,
                    "jumlahKeluarga": $scope.item.jumlahKeluarga,
                    "plafonYangDijamin": $scope.item.plafonYangDijamin,
                    "alamat": $scope.item.alamat,
                    "noTlp": $scope.item.noTlp,
                    "statusEnabled" : true
                }
	         ManageSarpras.saveDataUji(data, "data-peserta-perusahaan-yang-bekerja-sama/save-data-peserta-perusahaan-yang-bekerja-sama/").then(function (e) {
	        		 $scope.OnInitGetAllTransaksi();
	        		 $scope.item = {};
	       			 $scope.ModeEdit == false
			 });

		
		}
    	}]
     )}
  );




















// ==================================================Source Data old ==================================================
//define column untuk grid
// var arrColumnGridResepElektronik = [{

//define column untuk grid
//MasterLinen.getOrderList("service/list-generic/?view=JenisLinen&select=*").then(function(dat){
//			$scope.sourceOrder = dat;
//		});
// $scope.dataSasaranStrategis = new kendo.data.DataSource({
// 	data: [
// 	{
// 		"kodeSasaranStrategis": "001",
// 		"sasaranStrategis": "Terpenuhinya SDM yang kompeten"
// 	}
// 	]
// });

		// DataPerusahaanBekerjasama.getOrderList("data-perusahaan-yang-bekerjasama/get-rumah-sakit-yang-bekerja-sama/", true).then(function(dat){
		// 		$scope.ListDataPerusahaanBekerjasama = dat.data.data;
		// });

				  // $scope.Save = function() {
    //          ManageSarpras.saveDataPerusahaanBekerjasama(ModelItem.beforePost($scope.item)).then(function (e) {
				//     $scope.item= {};
    //                init();  
    //          });
    //       };	
