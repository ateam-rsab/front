define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('StandarPelayananMakananCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras',
		function($rootScope,$scope, ModelItem, ManageSarpras, FindSarpras) {
			ModelItem.get("Laundry/MasterJenisLinen").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.item = {};

			FindSarpras.getMasterJenisLinen("jenis-linen/find-all-jenis-linen/").then(function(dat){
				$scope.sourceDampakResiko = dat.data.data;
			});
			
			$scope.daftarBahanLinen = new kendo.data.DataSource({
				data: [],
				 group: $scope.group
			});

			         
			
			    $scope.group = {
                field: "menu",
                aggregates: [{
                    field: "menu",
                    aggregate: "count"
                }, {
                    field: "menu",
                    aggregate: "count"
                }]
            };
			
            $scope.Column = [{
                field: "menu",
                title: "Menu",
                width: 50,
                aggregates: ["count"]
            }, {
                field: "menu",
                title: "Berat (gram)",
                aggregates: ["count"]
            }, {
                field: "menu",
                title: "Qty",
                aggregates: ["count"]
            }, {
                field: "menu",
                title: "Satuan",
                aggregates: ["count"]
            }, {
                field: "menu",
                title: "Energi(kkal)",
                aggregates: ["count"]
            }, {
                field: "menu",
                title: "Protein (gram)",
                aggregates: ["count"]
            }, {
                field: "menu",
                title: "Lemak (gram)",
                aggregates: ["count"]
			 }, {
                field: "menu",
                title: "Karbohidrat (gram)",
                aggregates: ["count"]	
            }, {
                hidden: false,
                field: "waktu",
                title: "Nama Ruangan",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
            }];
			
			$scope.namaRuangan = [{
					"id": 1,
					"kode": "1",
					"name": "Diet tanpa gula"
				}

			];
			
			$scope.kelas = [{
					"id": 1,
					"kode": "1",
					"name": "Diet tanpa gula"
				}

			];
			
			
				$scope.menumakanan = [{
					"id": 1,
					"kode": "1",
					"name": "Nasi"
				},
				
				{
					"id": 2,
					"kode": "2",
					"name": "Lauk Hewani"
				},
				{
					"id": 3,
					"kode": "3",
					"name": "Lauk Nabati"
				},
				{
					"id": 4,
					"kode": "4",
					"name": "Sayur"
				},
				{
					"id": 5,
					"kode": "5",
					"name": "Minyak Goreng"
				}

			];
			
			$scope.waktumakan = [{
					"id": 1,
					"kode": "1",
					"name": "Makan pagi"
				}

			];
			
			
			$scope.satuan = [{
					"id": 1,
					"kode": "1",
					"name": "Porsi"
				},
				{
					"id": 2,
					"kode": "2",
					"name": "Mangkuk"
				}

			];
			
			
			
			$scope.kelas = [{
					"id": 1,
					"kode": "1",
					"name": "Kelas 1"
				},
				{
					"id": 2,
					"kode": "2",
					"name": "Kelas 2"
				}

			];
			
			$scope.addDataBahanLinen = function() {

				var tempDataBahanLinen = {
					
					"menu": $scope.item.menuMakanan.name,
					"waktu":$scope.item.waktuMakan.name
					
				
				}

				$scope.daftarBahanLinen.add(tempDataBahanLinen);
				$scope.item.menuMakanan=""
			
			
			}
					
			
			
		

		}
	]);
});