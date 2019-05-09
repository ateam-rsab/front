define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarStrukPenjualanPasienBaruCtrl', ['$rootScope', '$scope', '$state', '$mdDialog', 'ModelItem', 'DateHelper','FindPasien','ManagePasien',
		function($rootScope, $scope, $state, $mdDialog, ModelItem, DateHelper,findPasien, ManagePasien){
			$scope.item = {};
			ModelItem.get("Daftar Pasin").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
          		
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			findPasien.getDaftarPenjualanObatPesanBaru().then(function(e){
				debugger;
				$scope.ListDaftar = e.data.data.list;
				
				$scope.sourceDaftarPasien = new kendo.data.DataSource({
					pageSize: 8,
					data:$scope.ListDaftar
				});
			});

			$scope.dataSelectedRow={};
			$scope.sourceDaftarPasien = new kendo.data.DataSource({
				pageSize: 8,
				data:$scope.ListDaftar
			});

			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
					"field": "noCm",
					"title": "<h3 align=center>No CM<h3>",
					"width": "100px"
				}, {
					"field": "namaPasien",
					"title": "<h3 align=center>Nama Pasien<h3>",
					"width": "300px"
				},{
					"field": "noOrder",
					"title": "<h3 align=center>No Struk</h3>",
					"width": "150px"
				}, {
					"field": "noResep",
					"title": "<h3 align=center>No Resep<h3>",
					"width": "100px"
				}, {
					template: "#= new moment(new Date(tglResep)).format('DD-MM-YYYY HH:mm:ss') #",
					"field": "tglResep",
					"title": "<h3 align=center>Tgl Resep</h3>",
					"width": "150px"
				// }, {
				// 	template: "#= new moment(new Date(tglAmbilResep)).format('DD-MM-YYYY HH:mm:ss') #",
				// 	"field": "tglAmbilResep",
				// 	"title": "<h3 align=center>Tgl Struk<h3>",
				// 	"width": "150px"
	            }]
		    };

		    $scope.isShowPopUp = false;
		    $scope.validasi= function(){
		    	var confirm = $mdDialog.confirm()
		          .title('Validasi')
		          .textContent('Data belum di pilih !!!')
		          .ariaLabel('Lucky day')
		          .cancel('Ok')
			    $mdDialog.show(confirm).then(function() {
            	})
            };
            
		    $scope.ReturPenjualan = function(ev){
		    	$scope.noRecStrukPelayanan = $scope.dataSelectedRow.noRecStrukPelayanan;
		    	if($scope.dataSelectedRow.noOrder === undefined)
		    	{
                    $scope.validasi();
                }else if($scope.dataSelectedRow.namaLengkapAmbilResep === undefined)
                {
                    alert("Transaksi Sudah Terjadi !!!");
                }else {
					var myWindow = $("#winPopUp");
						myWindow.data("kendoWindow").open();
						$scope.isShowPopUp = true;

					findPasien.getProdukRetur($scope.noRecStrukPelayanan).then(function(e){
						debugger;
						$scope.ListProdukRetur = e.data.data.listData;

						 $scope.dataSourceProduk = new kendo.data.DataSource({
			                data: $scope.ListProdukRetur 
			            });
					});
				}
		    };

		    $scope.dataRetur = new kendo.data.DataSource({
		    	pageSize:5,
				data: []
			});

		    $scope.tambahRetur=function(){
		    	var listRawRequired = [
                    "item.namaProduk|k-ng-model|Nama Produk",
                    "item.hargaProduk|ng-model|Harga",
                    "item.jumlah|ng-model|Jumlah"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                	var tempData = {
			    		"namaProduk": $scope.item.namaProduk,
			    		"harga": $scope.item.hargaProduk,
			    		"jumlah": $scope.item.jumlah
			    	}
			    	$scope.dataRetur.add(tempData);
			    	$scope.item.namaProduk="";
			    	$scope.item.hargaProduk="";
			    	$scope.item.jumlah=""
                }else {
                    ModelItem.showMessages(isValid.messages);
                }
		    };

		    $scope.removeDataRetur = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempData== $scope.dataRetur
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);

			    // var selectedItem = grid.dataItem(row);

			    // $scope.DaftarPenyakit.remove(selectedItem);
			};
		    
		    $scope.mainGridOptions2 = {
                pageable: true,
                scrollable:false,
                columns: [{
					"field": "namaProduk.namaProduk",
					"title": "<align=center>Nama Produk</align>",
					"width": "300px"
				},{
					"field": "harga",
					"title": "<align=center>Harga</align>",
					"width": "100px"
				}, {
					"field": "jumlah",
					"title": "<align=center>Jumlah</align",
					"width": "100px"
				}, {
			        command: { text: "Hapus", click: $scope.removeDataRetur},
			        title: "&nbsp;",
			        width: "60px"
	            }]
		    };
		   
			$scope.listProduk = [];

			$scope.simpanRetur=function(){
				var dat = $scope.dataRetur._data;
				console.log(JSON.stringify(dat));
				var i=0;
				var listProduk = [];
				dat.forEach(function(value){
					var data ={
						"noRec": value.namaProduk.noRecStrukPelayananDetail,
            			"hargasatuan": value.harga,
            			"qtyproduk": value.jumlah
						}
					listProduk[i] =data;
					i++;
				})
                debugger;

				var dataFix = {
					"noRec": dat[0].namaProduk.noRecStrukPelayanan,
					"strukPelayananDetail": listProduk
				}
				console.log(JSON.stringify(dataFix))
				debugger;
				ManagePasien.saveReturObat(dataFix,"registrasi-pelayanan/save-retur-penjualan-bebas").then(function(e){
				});
				$scope.close();
			}

			$scope.close = function(){
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();
			}

			$scope.getHarga = function(){
				debugger;
				$scope.item.hargaProduk = $scope.item.namaProduk.harga;
			}

			$scope.produkRetur=[
				{
					"id": 1,
					"namaProduk": "panadol",
					"harga": 1000
				},
				{
					"id": 2,
					"namaProduk": "Bodrex",
					"harga": 600
				}
			]
	}])
})