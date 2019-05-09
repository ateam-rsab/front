define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DomisiliCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("PengkajianAwalPsikologi/Domisili").then(function(data) {
			$scope.title = "Domisili";
			$scope.title1 = "Orang Lain yang Tinggal Bersama";
			$scope.item ={};

			$scope.Selanjutnya = function() {
				modelItem.set("Psikologi", $scope.item);
					$state.go('Psikologi.KomposisiKeluarga');
			};
			$scope.Back = function() {
				history.back();
			}

			$scope.DaftarDomisili = new kendo.data.DataSource({
						data: []
				});
			

			$scope.columnDomisili = [{
				"field":"Nomor",
				"title":"NO",
				width : "50px"
			},{
				"field": "Namatxt",
				"title": "Nama",
				width : "200px"	
			}, {
				"field": "JK",
				"title": "Jenis Kelamin",
				width : "200px"	

			}, {
				"field": "usia",
				"title": "Usia",
				width : "200px"	
			}, {
				"field": "Ket",
				"title": "Keterangan",
				width : "200px"	
			
			}, {
		        command: { text: "Hapus", click: $scope.removeDaftarDomisili },
		        title: "&nbsp;",
		        width: "110px"
		    }];



			$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});


			$scope.addDaftarDomisili = function() {
			
				var tempDaftarDomisili = {
					"Nomor":$scope.DaftarDomisili._data.length+1,
					"Namatxt": $scope.item.Nama,
					"JK" : $scope.item.JenisKelamin,
					"usia": $scope.item.Usia,
					"Ket" :$scope.item.Keterangan
					
				}

				$scope.DaftarDomisili.add(tempDaftarDomisili);
			}

			$scope.removeDaftarDomisili = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempDaftarDomisili== $scope.DaftarDomisili
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);
			};


			ModelItem.getDataDummyGeneric("PengkajianAwalPsikologi/TempatTinggal",false).then(function(data) {
				$scope.listTempatTinggal = data;
			})
			ModelItem.getDataDummyGeneric("PengkajianAwalPsikologi/JenisKelamin",false).then(function(data) {
				$scope.listJenisKelamin = data;
			})


}

	]);
});