define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('YayasanCtrl', ['$rootScope', '$scope', 'ModelItem','PerusahaanBekerjasama', 'ManageSarpras','DateHelper', '$document', 'R',
		function($rootScope, $scope, ModelItem,PerusahaanBekerjasama,ManageSarpras,DateHelper, $document, r) {		
			$scope.item={};
			$scope.title = "Yayasan";
			$scope.now = new Date();
			$scope.dataVOloaded = true;
            $scope.item.jangkaAwal = $scope.now;
            $scope.item.jangkaAkhir = $scope.now;

		    $scope.listJenisPenagihan = [{
             "id":1, "JenisPenagihan":"Dijamin RS"
             },
             {
             "id":2, "JenisPenagihan":"Tidak dijamin RS"
             }]


			$scope.OnitComboYayasan = function (argument) {
		      PerusahaanBekerjasama.getOrderList("data-perusahaan-yang-bekerjasama/get-rekanan-yayasan", true).then(function(dat){
				$scope.ListYayasan = dat.data.data;	
			  });
			}
			$scope.OnitComboYayasan();			


			$scope.OnitAll = function () {
			  $scope.now = new Date();
			  $scope.item.jangkaAwal = $scope.now;
			  $scope.item.jangkaAkhir = $scope.now;
			  var nomor = 1;
		      PerusahaanBekerjasama.getOrderList("data-perusahaan-yang-bekerjasama/get-yayasan-1", true).then(function(dat){
				$scope.listDataSource = dat.data.data;
				 for(var i = 0; i<$scope.listDataSource.length; i++){
					$scope.listDataSource[i].no = nomor++;
					$scope.listDataSource[i].jangkaAwal =  new moment($scope.listDataSource[i].jangkaAwal).format('YYYY-MM-DD');
					$scope.listDataSource[i].jangkaAkhir =  new moment($scope.listDataSource[i].jangkaAkhir).format('YYYY-MM-DD');
				}
			  });
			}
			$scope.OnitAll();	

			$scope.klik = function(argument) {
				$scope.item.jangkaAwal = argument.jangkaAwal;
				$scope.item.rekanan = {idRekanan : argument.idAsuransi, namaRekanan:argument.namaAsuransi};
				$scope.item.namaFilePks = argument.namaFilePks;
				$scope.item.contactPerson = argument.contactPerson;
				$scope.item.jangkaAkhir = argument.jangkaAkhir;
				$scope.item.noTelpFax = argument.noTelpFax;
				$scope.item.JenisPenagihan =  {JenisPenagihan : argument.caraPenagihan};				
				$scope.item.alamatPenagihan = argument.alamatPenagihan;
				$scope.item.noPks = argument.noPks;
				$scope.item.jumlahKaryawan = argument.jumlahKaryawan;
				$scope.item.plafon = argument.plafon;
				$scope.item.email = argument.email;
			}

			 $scope.mainGridOptions = {
                pageable: true,
                scrollable: true,
                selectable: "row"
             };

			$scope.columnYayasanBekerjasama = [
			{
				"field" : "no",
				"title" : "<h3 align=center>No.<h3>",
			    "attributes" : { style:"text-align:center"},
				"width" : "15px"
			},			
			{
				"field" : "noPks",
				"title" : "<h3 align=center>No Pks<h3>",
				"width" : "30px"
			},			
			{
				"field" : "jangkaAwal",
				"title" : "<h3 align=center>Jangka Awal<h3>",
				"width" : "60px"
			},			
			{
				"field" : "jangkaAkhir",
				"title" : "<h3 align=center>Jangka Akhir<h3>",
				"width" : "60px"
			},			
			{
				"field" : "namaAsuransi",
				"title" : "<h3 align=center>Nama Yayasan<h3>",
				"width" : "50px"
			},				
			{
				"field" : "jumlahKaryawan",
				"title" : "<h3 align=center>Jumlah Karyawan<h3>",
				"width" : "40px"
			},			
			{
				 "title": "<h3 align=center>Action</h3>",
			      "width" : "40px",
			     "template" : "<button class='btnHapus' ng-model='currents' ng-click='disableData(currents)'>Disable</button>"
		    }]			
          
		  PerusahaanBekerjasama.getOrderList("data-perusahaan-yang-bekerjasama/get-yayasan", true).then(function(dat){
				$scope.ListPerusahaanBekerjasama = dat.data.data.data;
		});

		  	$scope.disableData = function(){
		  		debugger
		  		var getAll = this.dataItem;
		  	    var data = {
	                "noPks": getAll.noPks,
	                "rekanan": {
								 "namaRekanan": getAll.namaAsuransi,
							     "id": getAll.idAsuransi
								},
	                "anakPerusahaan": getAll.anakPerusahaan,
	                "jumlahKaryawan": getAll.jumlahKaryawan,
	                "plafon": getAll.plafon,
	                "caraPenagihan": getAll.caraPenagihan,
	                "alamatPenagihan": getAll.alamatPenagihan,
	                "contactPerson": getAll.contactPerson,
	                "jangkaAwal": getAll.jangkaAwal,
	                "jangkaAkhir": getAll.jangkaAkhir,
	                "namaFilePks": getAll.namaFilePks,
	                "noTelpFax": getAll.noTelpFax,
	                "email": getAll.email,
	                "statusEnabled" : false
	             }
			    ManageSarpras.saveDataUji(data, "data-perusahaan-yang-bekerjasama/save-data-perusahaan-yang-bekerjasama/").then(function (e) {
					$scope.OnitAll();
				    $scope.item.jangkaAwal = new Date();
			        $scope.item.jangkaAkhir = new Date();
					$scope.item = {};
					$scope.ModeEdit == false
				 });

		  	}

			 
            $scope.batal = function(){
			  $scope.item= {};
			}

			$scope.item={};
			$scope.Save = function(argument) {
				 var data = {
	                "noPks": $scope.item.noPks,
	                "rekanan": {
								 "namaRekanan": $scope.item.rekanan.namaRekanan,
							     "id": $scope.item.rekanan.idRekanan
								},
	                "anakPerusahaan": $scope.item.anakPerusahaan,
	                "jumlahKaryawan": $scope.item.jumlahKaryawan,
	                "plafon": $scope.item.plafon,
	                "caraPenagihan": $scope.item.caraPenagihan,
	                "alamatPenagihan": $scope.item.alamatPenagihan,
	                "contactPerson": $scope.item.contactPerson,
	                "tanggal": $scope.item.tanggal,
	                "jangkaAwal": $scope.item.jangkaAwal,
	                "jangkaAkhir": $scope.item.jangkaAkhir,
	                "namaFilePks": $scope.item.namaFilePks,
	                "noTelpFax": $scope.item.noTelpFax,
	                "email": $scope.item.email,
	                "statusEnabled" : true
	             }
			    ManageSarpras.saveDataUji(data, "data-perusahaan-yang-bekerjasama/save-data-perusahaan-yang-bekerjasama/").then(function (e) {
					$scope.OnitAll();
					$scope.item = {};
					$scope.ModeEdit == false
					$scope.item.jangkaAwal = new Date();
					$scope.item.jangkaAkhir = new Date();
				 });
			}

		}
	]);
});

// $scope.Save=function()
// {
// 	$scope.item.jangkaAwal=$scope.item.jangkaAwal.getTime();
// 	$scope.item.jangkaAkhir=$scope.item.jangkaAkhir.getTime();
// 	//console.log($scope.item);
// 	ManageSarpras.savePerusahaanBekerjasama(ModelItem.beforePost($scope.item)).then(function(e) {
// 		 $scope.item= {};
//              });
// };