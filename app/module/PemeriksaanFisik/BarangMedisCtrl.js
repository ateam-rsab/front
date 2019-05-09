define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('BarangMedisCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','GetPostOnPengkajianAwal',
		function($rootScope, $scope, ModelItem, $state,GetPostOnPengkajianAwal) {
			$scope.title = "Tanda Vital";
			
	        $scope.total = function() {
    var total = parseFloat($scope.txtAmount1 || 0) + parseFloat($scope.txtAmount2 || 0) 
               ;
    return total || 0;
	
};




 $scope.$watch('item.a', function(newValue, oldValue) {
             $scope.item.KodeBarang = ($scope.item.b)+(newValue);
            });
			
			$scope.$watch('item.b', function(newValue, oldValue) {
                 $scope.item.KodeBarang = ($scope.item.a)+(newValue); 
            });


 $scope.AddNumbers = function() {
            var a = Number($scope.a || 0);
            var b = Number($scope.b || 0);
            $scope.sum = a+b;
        }
			
			 $scope.isShowForm = false;
			
			$scope.isAdaGangguan = false;
			$scope.$watch('item.Genetalia', function(newValue, oldValue) {
			  if(newValue == "Ya")
			  {
			  	$scope.isAdaGangguan = true;
			  }
			  else
			  {
			  	$scope.isAdaGangguan = false;
			  }
			});
			
			
		
			
						
			$scope.item = {};
			ModelItem.get("PatalogiAnatomik").then(function(data) {
				$scope.item = data;
				$rootScope.dataVOloaded = true;

			}, function errorCallBack(err) {
			});
			
			
			$scope.dataLembarPengobatan = new kendo.data.DataSource({
			data: []
			});
			$scope.columnLembarPengobatan = [{
				"field": "id",
				"title": "Kode Barang",
				 width: "120px"
			}, {
				"field": "name",
				"title": "Nama Barang",
				 width: "120px"
			}, {
				"field": "generik",
				"title": "Nama Generik",
				 width: "140px"
			}, {
				"field": "sediaan",
				"title": "Sediaan",
				 width: "100px"
			}, {
				"field": "kategori",
				"title": "Kategory Barang",
				 width: "150px"
			}, {
				"field": "sub",
				"title": "Sub Kelompok",
				 width: "140px"
		   
		    }, {
				"field": "detail",
				"title": "Detail Obat",
				 width: "120px"
			}, {
				"field": "statusbarang",
				"title": "Status Barang",
				 width: "120px"
			}, {
				"field": "pabrik",
				"title": "Pabrik",
				 width: "150px"
	    	 }, {
				"field": "satuanbesar",
				"title": "Satuan Besar",
				 width: "150px"	 
		     }, {
				"field": "satuankecil",
				"title": "Satuan Kecil",
				 width: "150px"	 
		     }, {
				"field": "kekuatan",
				"title": "Kekuatan",
				 width: "150px"
				 
		      }, {
				"field": "kemasan",
				"title": "Jumlah Kemasan",
				 width: "150px"
			 }, {
				"field": "terkecil",
				"title": "Jumlah Terkecil",
				 width: "150px" 
				 
		      }, {
				"field": "spesifikasi",
				"title": "Spesifikasi",
				 width: "150px" 	 
			}, {
				"field": "aktif",
				"title": "Status Aktif",
				 width: "200px"
		    },{
		        command: { text: "Hapus", click: $scope.removeRiwayatPenyakitOrObat },
		        title: "&nbsp;",
		        width: "110px"
		    
				
			}];
			
			
			$scope.addDataLembarPengobatan = function() {
						var xx = {
							'id':$scope.item.KodeBarang,
							'name' :$scope.item.NamaBarang,
						    'generik':$scope.item.Generik.name,
							'sediaan' :$scope.item.Sediaan.name,
							'kategori':$scope.item.KategoryBarang.name,
							'sub' :$scope.item.SubKelompok.name,
							'detail' :$scope.item.DetailObat.name,
							'statusbarang' :$scope.item.StatusBarang.name,
							'pabrik': $scope.item.Pabrik.name,
							'satuanbesar':$scope.item.SatuanBesar.name,
							'satuankecil':$scope.item.SatuanKecil.name,
							'kekuatan'   :$scope.item.Kekuatan,
							'kemasan'    :$scope.item.JumlahKemasan,
							'terkecil'   :$scope.item.JumlahTerkecil,
							'spesifikasi':$scope.item.Spesifikasi
						}
						
				$scope.dataLembarPengobatan.add(xx);
				
			
			}
				
			
			
			
			
				
			
			$scope.removeRiwayatKelahiran = function() {

				$scope.dataRiwayatKelahiran.data([]);
			};
			
			
			$scope.sourceGenerik = [{
					"id": 1,
					"kode": "1",
					"name": "ObatGenerik"
				}

			];
			
				$scope.sourceSediaan = [{
					"id": 1,
					"kode": "1",
					"name": "Infus"
				}

			];
			
			
			$scope.sourceKategoryBarang = [{
					"id": 1,
					"kode": "1",
					"name": "Generik"
				}

			];
			
			$scope.sourceSubKelompok = [{
					"id": 1,
					"kode": "1",
					"name": "Psikotropika"
				}

			];
			
			
			$scope.sourceDetailObat = [{
					"id": 1,
					"kode": "1",
					"name": "Antibiotik"
				}

			];
			
			$scope.sourceStatusBarang = [{
					"id": 1,
					"kode": "1",
					"name": "Formularium"
				}

			];
			
				$scope.sourcePabrik = [{
					"id": 1,
					"kode": "1",
					"name": "Bayer"
				}

			];
			
			$scope.sourceSatuanBesar = [{
					"id": 1,
					"kode": "1",
					"name": "Box"
				}

			];
			
				$scope.sourceSatuanKecil = [{
					"id": 1,
					"kode": "1",
					"name": "Vial"
				}

			];
			
			
			
			$scope.listGenerik = new kendo.data.DataSource({
				data: $scope.sourceGenerik
			});
			
			
			$scope.listSediaan = new kendo.data.DataSource({
				data: $scope.sourceSediaan
			});
			
			$scope.listKategoryBarang = new kendo.data.DataSource({
				data: $scope.sourceKategoryBarang
			});
			
			$scope.listSubKelompok = new kendo.data.DataSource({
				data: $scope.sourceSubKelompok
			});
			
			$scope.listDetailObat = new kendo.data.DataSource({
				data: $scope.sourceDetailObat
			});
			
				$scope.listStatusBarang = new kendo.data.DataSource({
				data: $scope.sourceStatusBarang
			});
			
			$scope.listPabrik = new kendo.data.DataSource({
				data: $scope.sourcePabrik
			});
			
			$scope.listSatuanBesar = new kendo.data.DataSource({
				data: $scope.sourceSatuanBesar
			});
			
			$scope.listSatuanKecil = new kendo.data.DataSource({
				data: $scope.sourceSatuanKecil
			});
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			

			
			
			
			
		
			
			$scope.now = new Date();
			
			$scope.Save = function() {
				$scope.item.dataRiwayat = $scope.datariwayat;

				if($scope.item.RiwayatDalamKeluarga == "Tidak")
				{
					$scope.item.PenyakitMayor = "";
				}  

				var dataVO = delete $scope.item.attributes;
				console.log(JSON.stringify($scope.item));

				//kirim data inputan dari frontend ke server
				GetPostOnPengkajianAwal.SendData(dataVO, "Pengkajian/PatologiAnatomik")
				.then(
					function(res) {

					},
					function(err) {
						/*alert(err.data);*/
					})
			};
			
			
			

		}
	]);
});