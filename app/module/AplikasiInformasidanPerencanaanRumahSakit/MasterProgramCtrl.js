define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterProgramCtrl', ['$rootScope', '$scope', 'ModelItem','daftarDataProgram','ManagePasien',
		function($rootScope, $scope, ModelItem, daftarDataProgram, ManagePasien) {		
			ModelItem.get("InformasidanPerencanaanRumahSakit/Program").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			// $scope.dataProgram = new kendo.data.DataSource({
			// 	data: [
			// 	{
			// 		"kodeProgram": "001",
			// 		"namaProgram": "Rekruitmen SDM sesuai dengan kompeten"
			// 	}
			// 	]
			// });
			daftarDataProgram.getProgramList("program/find-all-program/").then(function(dat){
				$scope.sourceProgram = dat.data.data.program;
				
			});

			$scope.columndataProgram= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				
				"field": "namaProgram",
				"title": "<h3 align = center>Nama Program</h3>",
				"width": "300px"
			},{
				"field": "kodeProgram",
				"title": "<h3 align = center>Kode Program</h3>",
				"width": "100px"
			
		    }];

			// ModelItem.getGridOption("Gizi/PermintaanBahanMakanandariRuangan/PermintaanBahanMakananDariRuangan", arrColumnGridResepElektronik).then(function(data) {
			// 	$scope.mainGridOptions = data;
			// })

			$scope.Save=function()
			{
				ManagePasien.saveProgram(ModelItem.beforePost($scope.item)).then(function(e) {
                });
			};
		}
	]);
});