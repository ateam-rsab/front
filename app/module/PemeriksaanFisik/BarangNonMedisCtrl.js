define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('BarangNonMedisCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','GetPostOnPengkajianAwal',
		function($rootScope, $scope, ModelItem, $state,GetPostOnPengkajianAwal) {
			$scope.title = "Tanda Vital";
			
	        $scope.total = function() {
    var total = parseFloat($scope.txtAmount1 || 0) + parseFloat($scope.txtAmount2 || 0) 
               ;
    return total || 0;
	
};


$scope.$watch('item.b', function(newValue, oldValue) {
                 $scope.item.KodeBarang = ($scope.item.a)+(newValue); 
            });
 $scope.$watch('item.a', function(newValue, oldValue) {
             $scope.item.KodeBarang =($scope.item.b) + (newValue);
            });
			
			

 $scope.AddNumbers = function() {
           
            $scope.item.KodeBarang = a+b;
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
				"field": "jenis",
				"title": "Jenis Barang",
				 width: "120px"
			}, {
				"field": "satuan",
				"title": "Satuan",
				 width: "70px"
			}, {
				"field": "jumlah",
				"title": "Jumlah Kemasan",
				 width: "150px"
			}, {
				"field": "bahan",
				"title": "Bahan",
				 width: "70px"
		    }, {
				"field": "merk",
				"title": "Merk",
				 width: "70px"
		    }, {
				"field": "type",
				"title": "Type",
				 width: "70px"
			}, {
				"field": "warna",
				"title": "Warna",
				 width: "70px"
			}, {
				"field": "terkecil",
				"title": "Jumlah Terkecil",
				 width: "150px"
			}, {
				"field": "status",
				"title": "Status Aktif",
				 width: "200px"
		    },{
		        command: { text: "Hapus", click: $scope.removeRiwayatPenyakitOrObat },
		        title: "&nbsp;",
		        width: "110px"
		    
				
			}];
			
			
			$scope.addDataLembarPengobatan = function() {
						var xx = {
							'id': $scope.item.KodeBarang,
							'name':$scope.item.NamaBarang,
						    'jenis' :$scope.item.JenisBarang.name,
							'satuan':$scope.item.Satuan.name,
							'bahan' :$scope.item.Bahan.name,
							'merk':$scope.item.Merk.name,
							'type' :$scope.item.Type.name,
							'warna' :$scope.item.Warna.name,
							'terkecil' :$scope.item.JumlahTerkecil,
							'jumlah':$scope.item.JumlahKemasan
							
							
						}
						
				$scope.dataLembarPengobatan.add(xx);
				
			
			}
				
			
			
			
			
				
			
			$scope.removeRiwayatKelahiran = function() {

				$scope.dataRiwayatKelahiran.data([]);
			};
			
				$scope.sourceJenisBarang = [{
					"id": 1,
					"kode": "1",
					"name": "Infus"
				}, {
					"id": 2,
					"kode": "2",
					"name": "Suntik"
				}

			];
			
			
			$scope.sourceSatuan = [{
					"id": 1,
					"kode": "1",
					"name": "kg"
				}, {
					"id": 2,
					"kode": "2",
					"name": "hg"
				}

			];
			
			$scope.sourceBahan = [{
					"id": 1,
					"kode": "1",
					"name": "cotton"
				}, {
					"id": 2,
					"kode": "2",
					"name": "jeans"
				}

			];
			
			
			$scope.sourceMerk = [{
					"id": 1,
					"kode": "1",
					"name": "sedan"
				}, {
					"id": 2,
					"kode": "2",
					"name": "mitsubishi"
				}

			];
			
			$scope.sourceType = [{
					"id": 1,
					"kode": "1",
					"name": "x15"
				}, {
					"id": 2,
					"kode": "2",
					"name": "x17"
				}

			];
			
				$scope.sourceWarna = [{
					"id": 1,
					"kode": "1",
					"name": "merah"
				}, {
					"id": 2,
					"kode": "2",
					"name": "biru"
				}

			];
			
			$scope.listJenisBarang = new kendo.data.DataSource({
				data: $scope.sourceJenisBarang
			});
			
			$scope.listSatuan = new kendo.data.DataSource({
				data: $scope.sourceSatuan
			});
			
			$scope.listBahan = new kendo.data.DataSource({
				data: $scope.sourceBahan
			});
			
			$scope.listMerk = new kendo.data.DataSource({
				data: $scope.sourceMerk
			});
			
				$scope.listType = new kendo.data.DataSource({
				data: $scope.sourceType
			});
			
			$scope.listWarna = new kendo.data.DataSource({
				data: $scope.sourceWarna
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