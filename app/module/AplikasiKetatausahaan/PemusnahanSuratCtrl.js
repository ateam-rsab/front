/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('PemusnahanSuratCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','$state',
        function ($rootScope, $scope, ModelItem, DateHelper,$state) {
            $scope.title = "Pemusnahan Surat";
            $scope.dataVOloaded = true;
            $scope.item = {};
                        
            ModelItem.get("PemusnahanSurat").then(function(data) {
                $scope.item = data;
                $scope.dataVOloaded=true;
            },function errorCallBack(err) {});

            $scope.dataAllRow= new kendo.data.DataSource({
				data: []
			});
			
			$scope.columnAllData = [{
				"field": "noSurat",
				"title": "No Surat",
				
			},{
				"field": "tglSurat",
				"title": "TglSurat",
				
			},{
				"field":"jenisSurat",
				"title": "Jenis Surat",
			},{
				"field": "noTerima",
				"title": "No Terima",
				
			},{
				"field": "tglTerima",
				"title": "Tgl Terima",
				
			},{
				"field":"judulSurat",
				"title": "Judul Surat",
			},{
				"field": "catatan",
				"title": "Catatan Keterangan",
				
			}];

			
            $scope.row = function(a, b, c, d) {
                 $scope.item = angular.copy($scope.get(id));
            }

        }]);

});