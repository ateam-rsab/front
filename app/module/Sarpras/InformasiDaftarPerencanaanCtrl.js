/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('InformasiDaftarPerencanaanCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','$state',
        function ($rootScope, $scope, ModelItem, DateHelper,$state) {
            $scope.title = "Informasi Daftar Perencanaan (Pengendali Kegiatan)";
            $scope.dataVOloaded = true;
            $scope.item = {};
                        
            ModelItem.get("InformasiDaftarPerencanaan").then(function(data) {
                $scope.item = data;
                $scope.dataVOloaded=true;
            },function errorCallBack(err) {});

            // var arrFieldSelectVoProduk = ['id','namaProduk'];
            // ModelItem.getKendoSource("Produk",arrFieldSelectVoProduk, false).then(function (data) {
            //     $scope.listNamaMenu = data;
            // })

            $scope.dataAllRow= new kendo.data.DataSource({
				data: []
			});
			
			$scope.columnAllData = [{
				"field": "noPerencanaan",
				"title": "No Perencanaan",
				
			},{
				"field": "tglPerencanaan",
				"title": "Tanggal Perencanaan",
				
			},{
				"field":"ruangan",
				"title": "Ruangan",
			},{
				"field": "status",
				"title": "Status",
				
			}];
            
			
            $scope.row = function(a, b, c, d, e, f, g, h, i) {
                 $scope.item = angular.copy($scope.get(id));
            }

        }]);

});