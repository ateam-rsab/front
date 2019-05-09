/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('RespondMaintenanceCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','$state',
        function ($rootScope, $scope, ModelItem, DateHelper,$state) {
            $scope.title = "Respond Maintenance, Kontrak Service, Kalibrasi";
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.now = new Date();
            socket.on('PermintaanPerbaikan', function(data) {
	            debugger;
	            //var str = data.message;
	            // $scope.tmp = angular.fromJson(data.message);
	            kendoAlert(data.message.keluhan);
	            //console.log(data.message);
	        });
            
            ModelItem.get("RespondMaintenance").then(function(data) {
                $scope.item = data;
                $scope.dataVOloaded=true;
            },function errorCallBack(err) {});

            
            ModelItem.getDataDummyGeneric("ListPilihTeknisi", false).then(function(data) {
				$scope.listPilihTeknisi = data;
			})

            // var arrFieldSelectVoProduk = ['id','namaProduk'];
            // ModelItem.getKendoSource("Produk",arrFieldSelectVoProduk, false).then(function (data) {
            //     $scope.listNamaMenu = data;
            // })

            $scope.dataAllRow= new kendo.data.DataSource({
				data: []
			});
			
			$scope.columnAllData = [{
				"field": "noRegAset",
				"title": "No. Reg Asset",
				
			},{
				"field": "noInventaris",
				"title": "No. Inventaris Internal",
				
			},{
				"field":"namaBarang",
				"title": "Nama Barang",
			},{
				"field": "quantity",
				"title": "Qty",
				
			},{
				"field": "satuan",
				"title": "Satuan",
				
			},{
				"field": "harga",
				"title": "Harga",
				
			},{
				"field": "nomenKlatur",
				"title": "Nomen Klatur Kemenkes",
				
			},{
				"field":"tahun",
				"title": "Tahun Perolehan",
			},{
				"field": "lokasi",
				"title": "Lokasi",
				
			},{
				"field": "noSeri",
				"title": "No Seri",
			},{
				"field": "dayaListrik",
				"title": "Daya Listrik",
			}];

            $scope.dataRow= new kendo.data.DataSource({
				data: []
			});
			
			$scope.columnData = [{
				"field": "TglPemeliharaan",
				"title": "tglPemeliharaan",
				
			},{
				"field": "TglPemeliharaan",
				"title": "tglPemeliharaan",
			},{
				"field":"namaTeknisi",
				"title": "Nama teknisi/teknisi pendamping",
			},{
				"field": "tglKontak",
				"title": "Tgl Kontak Service",
			},{
				"field":"tglKalibrasi",
				"title": "Lokasi",
			},{
				"field": "namaPT",
				"title": "Nama PT",
			}];
            
			
            $scope.row = function(a, b, c, d) {
                 $scope.item = angular.copy($scope.get(id));
            }

        }]);

});