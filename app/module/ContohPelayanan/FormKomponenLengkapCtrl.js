define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormKomponenLengkapCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			$scope.title = "Data Pasien : ";
			$scope.jadwal = "Jadwal Kunjungan :" ; 
			$scope.tempItem = {};
			$scope.DaftarPenyakit = new kendo.data.DataSource({
				data: []
			});

			$scope.columncombogrid = [{
				"field": "name",
				"title": "Data Combobox"	
			}, {
				"field": "tanggal",
				"title": "Data Tanggal"
			}, {
				"field": "tanggal",
				"title": "Data Tanggal"
			}, {
				"field": "textgrid",
				"title": "Dari Textbox"
			}, {
				"field": "radio",
				"title": "Dari Radio Button"
			}, {
				"field": "CheckGrid",
				"title": "Dari Checkbox"
			}, {
		        command: { text: "Hapus", click: $scope.removeDaftarPenyakit },
		        title: "&nbsp;",
		        width: "110px"
		    }];
 
		    $scope.now = new Date();

			ModelItem.getDataDummyGeneric("ContohPelayanan/combogrid", false).then(function(data) {
				$scope.listPenyakit = data;
			})

			$scope.addDaftarPenyakit = function() {
				
				var TglGrid = DateHelper.getTanggalFormatted($scope.tempItem.TglGrid);

				// 
				var tempDaftarPenyakit = {
					"id": $scope.tempItem.combogrid.id,
					"name" : $scope.tempItem.combogrid.name,
					"tanggal" : TglGrid,
					"textgrid" : $scope.tempItem.TxtGrid,
					"radio"	:$scope.tempItem.radiogrid
				}

				$scope.DaftarPenyakit.add(tempDaftarPenyakit);
			}

			$scope.removeDaftarPenyakit = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempDaftarPenyakit== $scope.DaftarPenyakit
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);

			    // var selectedItem = grid.dataItem(row);

			    // $scope.DaftarPenyakit.remove(selectedItem);
			};




// Untuk Data selain grid yaa

			$scope.$watch('item.Penyakit', function(newValue, oldValue) {
				if (newValue == "Ya") {
					$scope.isPenyakit = true;
				} else {
					$scope.isPenyakit = false;
					$scope.tempItem = {};
					$scope.DataRiwayatPenyakit = {};
				}
			});


			ModelItem.get("ContohPelayanan/KomponenLengkap").then(function(data) {
				$scope.item = data;



				$scope.dataVOloaded = true;
				}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("ContohPelayanan/JenisKelamin", true).then(function(data) {
				$scope.listDataCombobox = data;
			})
			ModelItem.getDataDummyGeneric("ContohPelayanan/Agama", true).then(function(data) {
				$scope.listDataAgama = data;
			})
			ModelItem.getDataDummyGeneric("ContohPelayanan/DataJadwal", false).then(function(data) {
				$scope.listDataJadwal = data;
			})
			ModelItem.getDataDummyGeneric("ContohPelayanan/DataJamPraktek", true).then(function(data) {
				$scope.listDataPraktek = data;
			})
			ModelItem.getDataDummyGeneric("ContohPelayanan/DataRiwayatPenyakit", false).then(function(data) {
				$scope.listRiwayatPenyakit = data;
			})
			ModelItem.getDataDummyGeneric("ContohPelayanan/Penyakit", false).then(function(data) {
				$scope.listDataPenyakit = data;
			})

			$scope.RiwayatPenyakit = [];
			$scope.cekRiwayatPenyakit = function(data) {

				var isExist = _.find($scope.RiwayatPenyakit, function(dataExist){ return dataExist == data; });

				if(isExist == undefined)
				{
					$scope.RiwayatPenyakit.push(data);
				}
				else
				{
					$scope.RiwayatPenyakit = _.without($scope.RiwayatPenyakit, data);
				}
			
				console.log('list RiwayatPenyakit : ' + JSON.stringify($scope.RiwayatPenyakit));
			};

			$scope.now = new Date();


			$scope.Save = function() {
				

				$scope.item.Checkbox = $scope.RiwayatPenyakit
				console.log(JSON.stringify($scope.item));

				// alert("Alert Berhasil"); ngecek button savenya berhasil
               
                /*cacheHelper.set("kajianAwal", $scope.kajianAwal); 
                ManagePengkajianAwal.saveTandaVital(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.kajianAwal.tandaVital = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $state.go('dashboardpasien.SkriningNyeri', {
                        noCM: $scope.noCM
                    });
                }); */

            };

		}
	]);
});