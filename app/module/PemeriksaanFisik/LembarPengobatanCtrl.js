define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LembarPengobatanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','GetPostOnPengkajianAwal',
		function($rootScope, $scope, ModelItem, $state,GetPostOnPengkajianAwal) {
			$scope.title = "Tanda Vital";
			
			
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
				"title": "no",
				 width: "40px"
			}, {
				"field": "name",
				"title": "Nama Obat"
			}, {
				"field": "nama",
				"title": "Dokter"
			}, {
				"field": "farmasi",
				"title": "Pharmasi"
			}, {
				"field": "Tanggal",
				"title": "Tanggal diberikan"
			}, {
				"field": "keterangan",
				"title": "Keterangan"
		    },{
		        command: { text: "Hapus", click: $scope.removeRiwayatPenyakitOrObat },
		        title: "&nbsp;",
		        width: "110px"
		    
				
			}];
			
			
			
					$scope.addDataLembarPengobatan = function() {
						var xx = {
							'id'  :$scope.item.NamaObat.id,
							'name':$scope.item.NamaObat.name,
							'nama':$scope.item.Dokter.nama,
							'farmasi':$scope.item.Pharmasi.name,
							'keterangan':$scope.item.Keterangan,
							'Tanggal': $scope.item.Tanggal
							
						}
						
				$scope.dataLembarPengobatan.add(xx);
				
			
			}
			
			
				
			
			$scope.removeRiwayatKelahiran = function() {

				$scope.dataRiwayatKelahiran.data([]);
			};
			
				$scope.sourceNamaObat = [{
					"id": 1,
					"kode": "1",
					"name": "Paramex"
				}, {
					"id": 2,
					"kode": "2",
					"name": "Oskadon"
				}

			];
			
			
			$scope.sourceNamaDokter = [{
					"id": 1,
					"kode": "1",
					"nama": "Rudi"
				}, {
					"id": 2,
					"kode": "2",
					"nama": "Budi"
				}

			];
			
			$scope.sourcePharmasi = [{
					"id": 1,
					"kode": "1",
					"name": "farmasi obat"
				}, {
					"id": 2,
					"kode": "2",
					"name": "farmasi suplemen"
				}

			];
			
			$scope.listNamaObat = new kendo.data.DataSource({
				data: $scope.sourceNamaObat
			});
			
			$scope.listNamaDokter = new kendo.data.DataSource({
				data: $scope.sourceNamaDokter
			});
			
			$scope.listPharmasi = new kendo.data.DataSource({
				data: $scope.sourcePharmasi
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