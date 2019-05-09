define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MembuatDraftSuratCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Ketatausahaan/MembuatDraftSurat").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("Departemen", false).then(function(data) {
				$scope.listDepartemen = data;
			})

			$scope.daftarVerifikasi = new kendo.data.DataSource({
				data: [
				{ 
					"verifikasi":"Tata Usaha"				}
				]
			});

			$scope.columnVerifikasi= [
			{
				"field": "verifikasi",
				// "template": "<h3 align=center><input type=\"checkbox\" ng-click=\"klik()\"></h3>"
				"width" : "100%"
			}
		    ];
			
			
		}
		]);
});