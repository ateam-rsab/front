define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PohonKeluargaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("PengkajianAwalPsikologi/PohonKeluarga").then(function(data) {
				$scope.item = data;
				$scope.title = "Pohon Keluarga";
				$scope.now = new Date();
				$scope.item = data;
				$scope.tempItem = {};
				$scope.dateTimePickerOptions = {}
				$scope.now = new Date();
						data: []
				$scope.DaftarPohonKeluarga = new kendo.data.DataSource({
						data: []
				});
			
			$scope.Save = function() {
				
			};
			$scope.Back = function() {
				history.back();
			}

			$scope.columnPohonKeluarga = [{
				"field":"Nomor",
				"title":"NO",
				width : "50px"
			},{
				"field": "LevelGrid",
				"title": "Level",
				width : "200px"	
			}, {
				"field": "StatusHubunganGrid",
				"title": "Status Hubungan",
				width : "200px"	

			}, {
				"field": "NamaGrid",
				"title": "Nama",
				width : "200px"	
			
			}, {
		        command: { text: "Hapus", click: $scope.removeDaftarPohonKeluarga },
		        title: "&nbsp;",
		        width: "110px"
		    }];

			   $scope.dataVOloaded = true; 

			}, function errorCallBack(err) {});

		$scope.addDaftarPohonKeluarga = function() {
			
				var tempDaftarPohonKeluarga = {
					"Nomor":$scope.DaftarPohonKeluarga._data.length+1,
					"LevelGrid": $scope.item.Level.name,
					"StatusHubunganGrid" : $scope.item.StatusHubungan.name,
					"NamaGrid" :$scope.item.Nama
					
				}

				$scope.DaftarPohonKeluarga.add(tempDaftarPohonKeluarga);
			}

			$scope.removeDaftarPohonKeluarga = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempDaftarPohonKeluarga== $scope.DaftarPohonKeluarga
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);
			};

			
		

		ModelItem.getDataDummyGeneric("PengkajianAwalPsikologi/Level", false).then(function(data) {
				$scope.listLevel = data;
			})

		ModelItem.getDataDummyGeneric("PengkajianAwalPsikologi/StatusHubungan", false).then(function(data) {
				$scope.listStatusHubungan = data;
			})
		
		}
	]);
});