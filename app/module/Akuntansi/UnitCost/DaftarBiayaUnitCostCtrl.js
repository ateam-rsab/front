define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarBiayaUnitCostCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','ManageUC',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,manageUC) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

            $scope.item = {};

			manageUC.getDataTableMaster("unit-cost/get-biaya-unit-cost").then(function(data){
				//debugger;
                $scope.dataDaftarBiaya = data;
                for (var i = 0; i < $scope.dataDaftarBiaya.data.length; i++) {
					$scope.dataDaftarBiaya.data[i].no = i+1
				}
            });
            manageUC.getDataTableMaster("unit-cost/table-master?jenis=jenisBiaya").then(function(data){
                $scope.listJenisBiaya = data;
            });

            $scope.cariNamaBiaya =function(){
            	goleti()
            }
            $scope.SearchData = function(){
            	goleti()
            }
            $scope.simpan = function(){
            	if ($scope.dataSelected.satuanstandar == $scope.dataSelected.harganetto1) {
	            	if ($scope.dataSelected.id == null) {
	            		alert("tidak ada harga unit cost yg akan di update");
	                    return;
	            	}
	            	if ($scope.dataSelected.harganetto1 == null) {
	            		alert("tidak ada harga satuan penerimaan untuk di update");
	                    return;
	            	}
	            	var objSave ={'idDetail':$scope.dataSelected.id,
	            				'harga':$scope.dataSelected.harganetto1}
	            	manageUC.saveHargaDetailUC(objSave).then(function(data){
		            });
	            }else{
	            	alert("Satuan tidak sama!");
	                return;
	            }
            }
            function goleti(){
            	var nb = '?namaproduk='
            	if ($scope.item.namaBiaya != undefined) {
            		nb="?namaproduk="+$scope.item.namaBiaya
            	}
            	var jb ='&idJenis='
            	if ($scope.item.jenisBiaya != undefined) {
            		jb="&idJenis="+$scope.item.jenisBiaya.id
            	}
        		manageUC.getDataTableMaster("unit-cost/get-biaya-unit-cost"+nb+jb).then(function(data){
	                $scope.dataDaftarBiaya = data;
	                for (var i = 0; i < $scope.dataDaftarBiaya.data.length; i++) {
						$scope.dataDaftarBiaya.data[i].no = i+1
					}
	            });	
            }
			$scope.columnDaftarBiaya = [
				{
					"field": "no",
					"title": "No",
                    "width": "50px"
				},
				{
					"field": "jenisproduk",
					"title": "Jenis",
                    "width": "150px"
				},
				{
					"field": "namaproduk",
					"title": "Nama",
                    "width": "250px"
				},
				{
					"field": "namaruanganfisik",
					"title": "Ruangan Fisik",
                    "width": "150px"
				},
				{
					"field": "satuanstandar",
					"title": "Satuan",
                    "width": "100px"
				},
				{
					"field": "satuanProduk",
					"title": "Satuan Penerimaan",
                    "width": "100px"
				},
				{
					"field": "harganetto1",
					"title": "Harga Penerimaan",
                    "width": "100px"
				},
				{
					"field": "hargasatuan",
					"title": "Harga Unit Cost",
                    "width": "100px"
				},
				{
					"field": "tglterimakiriman",
					"title": "Tanggal",
                    "width": "100px"
				}
			];

		}
	]);
});