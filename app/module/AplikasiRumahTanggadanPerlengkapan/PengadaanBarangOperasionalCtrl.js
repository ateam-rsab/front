define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengadaanBarangOperasionalCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
		function($rootScope, $scope, ModelItem, DateHelper, $document, r) {
			$scope.title = "";			

			$scope.dataVOloaded = true;
			$scope.item = {};

			$scope.item.ruangan = "";
			$scope.klik = function(){
				console.log("Ke klik");
			}


			//define column untuk grid
			var arrColumnGridResepElektronik = [{
                "field": "noPerencanaan",
               
				"type" : "hidden"
              
           
            }, {
				"template": "<input type=\"checkbox\" ng-click=\"klik()\">",
                "width": 30
            }, {
                "field": "kodeBarang",
                "title": "Kode Barang",
                "width": 200
            }, {
                "field": "namaBarang",
                "title": "Nama Barang",
                "width": 200
         
            }, {
                "field": "rataStok",
                "title": "Rata-rata stok",
                "width": 150
            }, {
                "field": "satuanBesar",
                "title": "Satuan Besar",
                "width": 150
            }, {
                "field": "jumlahKemasan",
                "title": "Jml Kemasan",
                "width": 200
            }, {
                "field": "stokMinimum",
                "title": "Stok minimum",
                "width": 150
		    }, {
                "field": "hargaSatuan",
                "title": "Harga Satuan",
                "width": 150
				
			}, {
                "field": "hargaKemasan",
                "title": "Harga Kemasan",
                "width": 150
				
				
			}, {
                "field": "perencanaanOtomatis",
                "title": "Perencanaan Otomatis",
                "width": 150
				
			}, {
                "field": "totalOtomatis",
                "title": "Total Otomatis",
                "width": 150
				
				
			}, {
                "field": "perencanaan",
                "title": "Perencanaan",
                "width": 150
				
			}, {
                "field": "totalPerencanaan",
                "title": "Total Perencanaan",
                "width": 150
            } ];

			ModelItem.getGridOption("Farmasi/DataPengendaliKegiatan", arrColumnGridResepElektronik).then(function(data) {
				$scope.mainGridOptions = data;
			})

			$scope.cari = function()
			{
				var filterArr = new Array();
				var isFilter = false;
				var grid = $('div[kendo-grid]').data('kendoGrid');
		        
		        if($scope.item.noPerencanaan != "")
		        {
		        	filterArr.push({ field: "noPerencanaan", operator: "contains", value: $scope.item.noPerencanaan });
		        	isFilter = true;
		        }

		        if($scope.item.ruangan != "")
		        {
		        	filterArr.push({ field: "unitLayanan", operator: "contains", value: $scope.item.ruangan.name });
		        	isFilter = true;
		        }
		        
		        if(isFilter)
		        {
		        	grid.dataSource.filter(filterArr);
			        grid.dataSource.read();
			        grid.refresh();
		        }
		        else
		        {
		        	grid.dataSource.read();
			        grid.refresh();
		        }
			}

			$scope.now = new Date();

			ModelItem.getDataDummyGeneric("Apotek/Penjualan/DataUnitLayanan", false).then(function(data) {
				$scope.listUnitLayanan = data;
			})

			

		}
	]);
});