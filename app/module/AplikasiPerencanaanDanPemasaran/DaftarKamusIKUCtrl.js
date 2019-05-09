define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarKamusIKUCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.title = "Daftar Kamus IKU";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};

			FindSarpras.getSarpras("kamus-iku/find-all/").then(function(dat){
				 var data = []
				 var i = 1
				 dat.data.data.forEach(function(e){
				 	var kamusIKU = {
				 		"id": e.id,
				 		"indikatorKinerjaUtama": e.mappingDO.indikatorKinerjaUtama,
						// "mappingDO": e.definisiOperasional,
						// "perspektif": e.perspektif,
						// "pic": e.personInchange,
						"sasaranStrategis": e.sasaranStrategis,
						"bobotIKU": e.bobotIKU,
						// "sumberData": e.sumberData,
						"periodePelaporan": e.periodePelaporan,
	        			"awalPeriode": e.awalPeriode,
	        			"akhirPeriode": e.akhirPeriode,
				 		"no":i
				 	}
			 	data[i-1]=kamusIKU
			 	i++;
				});
				$scope.sourceDaftarKamusIKU = data;
				// debugger;
			});

			// $scope.daftarKamusIKU  = new kendo.data.DataSource({
			// 	data: []
			// });
			$scope.columndaftarKamusIKU = [
			{
				"field": "no",
				"title": "<h3 align=center>No<h3>",
				"width": "30px",
				"attributes": { align: "center" }
			}, {
				"field": "sasaranStrategis.sasaranStrategis",
				"title": "<h3 align=center>Sasaran Strategis</h3>",
				"width": "200px"
			}, {
				"field": "indikatorKinerjaUtama.indikatorKinerjaUtama",
				"title": "<h3 align=center>Indikator Kinerja Utama</h3>",
				"width": "300px"
			}, {
				"field": "bobotIKU.bobotIKU",
				"title": "<h3 align=center>Bobot (%)<h3>",
				"width": "70px",
				"attributes": { align: "center" }
			// }, {
			// 	"field": "satuan",
			// 	"title": "<h3 align=center>Satuan<h3>",
			// 	"width": "100px"
			}, {
				"field": "periodePelaporan.periodePelaporan",
				"title": "<h3 align=center>Periode<br>Pelaporan<h3>",
				"width": "100px",
				"attributes": { align: "center" }
			}];
			$scope.klik = function(r){
				console.log(JSON.stringify(r));
				$scope.current = r;
				// debugger;
			}

			$scope.navToDetailKamusIKU = function(current){
				$state.go("DetailKamusIKU", {
					id: $scope.current.id,
					awalPeriode : $scope.current.awalPeriode,
					akhirPeriode : $scope.current.akhirPeriode
				})
			}
			$scope.navToMatriksIKU = function(current){
				$state.go("MatriksIKU", {
					id: $scope.current.id,
					awalPeriode : $scope.current.awalPeriode,
					akhirPeriode : $scope.current.akhirPeriode
				})
			}
	}])
})