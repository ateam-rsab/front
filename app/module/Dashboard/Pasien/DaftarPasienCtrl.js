define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarPasienCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindPasien','ManagePasien',
		function($rootScope, $scope,$state, ModelItem, DateHelper,findPasien, ManagePasien){
			$scope.item = {};
			ModelItem.get("Daftar Pasin").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
          		
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.PasienRuangan = [
                {"id": 1, "name": "Pasien Ruangan Obat Alkes"}
            ]
						// debugger;
			$scope.mainGridOptions = {
                pageable: true,
                editable : true,
                scrollable:false,
                columns: [{
                    "field": "no",
					"title": "<h3 align=center>No<h3>",
					"width": "30px",
					"attributes": {align:"center"}
				}, {
					"field": "detailFaktor",
					"title": "<h3 align=center>Ruangan Perawatan</h3>",
					"width": "100px"
				}, {
					"field": "rating",
					"title": "<h3 align=center>No. Registrasi<h3>",
					"width": "100px",
					"attributes": {align:"center"}
				}, {
					"field": "bobot",
					"title": "<h3 align=center>No CM<h3>",
					"width": "100px",
					"attributes": {align:"center"}
				}, {
					"field": "skor",
					"title": "<h3 align=center>Nama Pasien<h3>",
					"width": "300px"
				}, {
					"field": "detailFaktor",
					"title": "<h3 align=center>JK</h3>",
					"width": "50px"
				}, {
					"field": "rating",
					"title": "<h3 align=center>Jenis Pasien<h3>",
					"width": "100px",
					"attributes": {align:"center"}
				}, {
					"field": "bobot",
					"title": "<h3 align=center>Nama Penjamin<h3>",
					"width": "100px",
					"attributes": {align:"center"}
				}, {
					"field": "skor",
					"title": "<h3 align=center>Kelas<h3>",
					"width": "100px"
				}, {
					"field": "bobot",
					"title": "<h3 align=center>Tgl Masuk<h3>",
					"width": "100px",
					"attributes": {align:"center"}
				}, {
					"field": "skor",
					"title": "<h3 align=center>Tgl Keluar<h3>",
					"width": "100px"
	            }]
		    };

			$scope.klik = function(r){
				console.log(JSON.stringify(r));
				$scope.current = r;
			}

			$scope.BuatResep = function(){
				$state.go("PenjualanResepPasienBaru")
			}
	}])
})