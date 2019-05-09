/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('PerencanaanPengadaanBarangOperasionalCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','$state',
        function ($rootScope, $scope, ModelItem, DateHelper,$state) {
            $scope.title = "Perencanaan Pengadaan Barang Operasional (Unit)";
            $scope.dataVOloaded = true;
            $scope.item = {};
                        
            ModelItem.get("PerencanaanPengadaanBarangOperasional").then(function(data) {
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
				"field":"noAll",
				"title": "No",
				"width" : "32px"
			},{
				"field": "kodeBarang",
				"title": "Kode Barang",
				
			},{
				"field": "namaBarang",
				"title": "Nama Barang",
				
			},{
				"field":"rataRataStock",
				"title": "Rata-Rata Stock",
			},{
				"field": "satuanBesar",
				"title": "Satuan Besar",
				
			},{
				"field": "jmlKemasan",
				"title": "Jml Kemasan",
				
			},{
				"field": "stockMin",
				"title": "Stock Min",
				
			},{
				"field": "hargaSatuan",
				"title": "Harga Satuan",
				
			},{
				"field":"hargaKemasan",
				"title": "Harga Kemasan",
			},{
				"field": "perecanaanOtomatis",
				"title": "Perencanaan Otomatis",
				
			},{
				"field": "totalOtomatis",
				"title": "Total Otomatis",
				
			},{
				"field":"perencanaan",
				"title": "Perencanaan",
			},{
				"field": "totalPerencanaan",
				"title": "Total Perencanaan",
				
			}];


            $scope.row = function(a, b, c, d, e, f, g, h, i) {
                 $scope.item = angular.copy($scope.get(id));
            }
            
        }]);

});