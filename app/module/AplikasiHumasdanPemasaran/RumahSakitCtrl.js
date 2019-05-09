define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RumahSakitCtrl', ['$rootScope', '$scope', 'ModelItem','PerusahaanBekerjasama', 'ManageSarpras','DateHelper', '$document', 'R',
		function($rootScope, $scope, ModelItem,PerusahaanBekerjasama,ManageSarpras,DateHelper, $document, r) {		
			$scope.title = "Resep elektronik";			
			$scope.dataVOloaded = true;
            $scope.item={};
            $scope.now = new Date();
            $scope.item.periodeAwal = $scope.now;
            $scope.item.periodeAkhi = $scope.now;
            $scope.item.jangkaAwal = $scope.now;
            $scope.item.jangkaAkhir = $scope.now;

            $scope.klik = function function_name(dataSelected) {
            	// body...
            	debugger
            	$scope.item.noPks = dataSelected.noPks
            	$scope.item.rekanan = {
            		id : dataSelected.rekananId,
            		namaRekanan : dataSelected.namaRekanan
            	}
            	$scope.item.jumlahKaryawan = dataSelected.jumlahKaryawan;
		        dataSelected.jangkaAwal
		        dataSelected.namaFilePks
		        dataSelected.contactPerson
		        dataSelected.jangkaAkhir
		        dataSelected.pathFile
		        dataSelected.caraPenagihan
		        dataSelected.anakPerusahaan
		        dataSelected.noTelpFax
		        dataSelected.alamatPenagihan
		        dataSelected.plafon
		        dataSelected.email
            }


            $scope.listRumahSakit = function(){
	        	//PerusahaanBekerjasama.getOrderList('data-perusahaan-yang-bekerjasama/get-rekanan', true).then(function(dat){
	        	PerusahaanBekerjasama.getOrderList('data-perusahaan-yang-bekerjasama/get-rumah-sakit', true).then(function(dat){
	        		$scope.ListNamaRumahSakit = dat.data.data;
	        	})
            }
            $scope.listRumahSakit();


           $scope.initPerusahan = function(){
           	var nomor = 1
           	 PerusahaanBekerjasama.getOrderList("data-perusahaan-yang-bekerjasama/get-rumah-sakit-yang-bekerja-sama/", true).then(function(dat){
				$scope.dataSourcePerusahaan = dat.data.data.data;
				for(var i=0; i<$scope.dataSourcePerusahaan.length; i++){
					$scope.dataSourcePerusahaan[i].no = nomor++
				}
			 });	
           }
           $scope.initPerusahan();

            $scope.listDataJenisPks = [{
             	"id":1, "JenisPks":"Pelayanan Kesehatan"
            },
            {
             	"id":2, "JenisPks":"PONEK"
            },
            {
                "id":3, "JenisPks":"Laboratorium Kesehatan"
            },
            {
                "id":4, "JenisPks":"Pelayanan kesehatan Rujukan"
            },
            {
                "id":5, "JenisPks":"Sewa Lahan"
            },
            {
                "id":6, "JenisPks":"Lainnya"
            }]

			  $scope.listJenisPenagihan = [
              {
                "id":1, "JenisPenagihan":"Dijamin RS"
              },
              {
               "id":2, "JenisPenagihan":"Tidak dijamin RS"
              },
			  ]
		

			$scope.now = new Date();

			$scope.batal = function()
			{
			  $scope.item= {};
			}  

			$scope.mainGridOptions = {
                pageable: true,
                scrollable: true,
                selectable: "row"
            };

			$scope.columnRumahSakit = [
			{
				"field" : "no",
				"title" : "<h3 align=center>No.<h3>",
				"attributes": {
     			  "class": "table-cell",
      						style: "text-align: center; font-size: 14px"
    			},
				"width":"10px"
			},			
			{
				"field" : "noPks",
				"title" : "<h3 align=center>No Pks<h3>",
				"width" : "30px"
			},			
			{
				"field" : "namaRekanan",
				"title" : "<h3 align=center>Nama Rumah Sakit<h3>",
				"width" :"80px"
			},			
			{
				"field" : "jumlahKaryawan",
				"title" : "<h3 align=center>Jumlah Karyawan<h3>",
				"width" :"40px"
			},			
			{
				"field" : "alamatPenagihan",
				"title" : "<h3 align=center>Alamat Penagihan<h3>",
				"width" :"40px"
			},
		    {
				 "title": "<h3 align=center>Action</h3>",
			     "width" : "20px",
			     "attributes": {
     			  "class": "table-cell",
      						style: "text-align: center; font-size: 14px"
    			 },
			     "template" : "<button class='btnHapus' ng-model='currents' ng-click='disableData(currents)'>Disable</button>"
		    }]


			  $scope.disableData = function(currents){
				var GetData = this.dataItem;
				$scope.item.tanggal = new Date();
                var data =  {
                    "noRec" : GetData.noRec,
                    "noPks": GetData.noPks,
                    "rekanan": {"namaRekanan" : GetData.namaRekanan,"id": GetData.rekananId},
                    "jumlahKaryawan": GetData.jumlahKaryawan,
                    "plafon": GetData.plafon,
                    "caraPenagihan": GetData.caraPenagihan,
                    "alamatPenagihan": GetData.alamatPenagihan,
                    "contactPerson": GetData.contactPerson,
                    "jangkaAwal": GetData.jangkaAwal,
                      "ok": $scope.item.ok,
                    "jangkaAkhir": GetData.jangkaAkhir,
                    "namaFilePks": GetData.namaFilePks,
                    "noTelpFax": GetData.noTelpFax,
                    "email": GetData.email,
                    "statusEnabled" : false
                }
               ManageSarpras.saveDataUji(data, "data-perusahaan-yang-bekerjasama/save-data-perusahaan-yang-bekerjasama/").then(function (e) {
	              $scope.initPerusahan();
	              $scope.item = {};
	              $scope.item.jangkaAwal = new Date();
	              $scope.item.jangkaAkhir = new Date();
	              $scope.ModeEdit == false
			   });
			};

		    $scope.Save=function(){
                var data =  {
                	"noRec" : $scope.noRec,
                    "noPks": $scope.item.noPks,
                    "rekanan" : {"id" : $scope.item.rekanan.id},
                    "jumlahKaryawan": $scope.item.jumlahKaryawan,
                    "plafon": $scope.item.plafon,
                    "caraPenagihan": $scope.item.caraPenagihan,
                    "alamatPenagihan": $scope.item.alamatPenagihan,
                    "contactPerson": $scope.item.contactPerson,
                    "tanggal": $scope.item.tanggal,
                    "jangkaAwal": $scope.item.jangkaAwal,
                    "ok": $scope.item.ok,
                    "jangkaAkhir": $scope.item.jangkaAkhir,
                    "namaFilePks": $scope.item.namaFilePks,
                    "noTelpFax": $scope.item.noTelpFax,
                    "email": $scope.item.email,		 
                    "statusEnabled" : true
                }

            	ManageSarpras.saveDataUji(data, "data-perusahaan-yang-bekerjasama/save-data-perusahaan-yang-bekerjasama/").then(function (e) {
	         		$scope.initPerusahan();
	         		$scope.item = {};
	        	 	$scope.item.jangkaAwal = new Date();
	         		$scope.item.jangkaAkhir = new Date();
	         		$scope.ModeEdit == false
			    });
			};
			
		}
	]);
});

//====================================================================================================================================================================================
// $scope.Save=function(){
// 	$scope.item.jangkaAwal=$scope.item.jangkaAwal.getTime();
// 	$scope.item.jangkaAkhir=$scope.item.jangkaAkhir.getTime();
// 	//console.log($scope.item);
// 	ManageSarpras.savePerusahaanBekerjasama(ModelItem.beforePost($scope.item)).then(function(e) {
// 		 $scope.item= {};
//});
// };