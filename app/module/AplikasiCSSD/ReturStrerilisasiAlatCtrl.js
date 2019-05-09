define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ReturStrerilisasiAlatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras','IPSRSService', 'DateHelper', '$state', '$mdDialog',
		function($rootScope, $scope, ModelItem, ManageSarpras, IPSRSService, DateHelper, $state,$mdDialog) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.dataPost = [];
			var init = function () {
				IPSRSService.getItem("retur-cssd/get-order-sterilisasi/?noRec="+$state.params.strukPelayananId).then(function(dat){
					$scope.dataHeader = dat.data.header;
					$scope.item.noRetur = dat.data.noRetur;
					$scope.item.noKirim = dat.data.noKirim;
					$scope.dataGrid = dat.data.detail;
					$scope.dataGrid.forEach(function (data) {
						data.jumlahRetur = 0;
					})
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 5,
						data: $scope.dataGrid,
						batch: true,
						schema: {
                        model: {
                            fields: {
                                namaProduk: { editable: false},
                                qtyProduk: { type: "number", editable: false},
                                jumlahRetur: { type: "number", validation: { min: 0, required: true}}
                            }
                        }
                   		}
					});	
					$scope.item.noOrder = $scope.dataHeader.noOrder;
					var tanggal = new Date($scope.dataHeader.tanggal);
					if ($scope.dataHeader.tanggal == "" || $scope.dataHeader.tanggal == "-") {
						$scope.item.tanggal = new Date();
					} else {
						$scope.item.tanggal = tanggal;
					}
					

				});
			};
			init();
			$scope.listStatus = [
			{"id":1,"name":"Dikirim"},
			{"id":2,"name":"Belum Dikirim"}]
			$scope.timeEditor = function(container, options) {
                $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
		            .appendTo(container)
		            .kendoTimePicker({});
            }
			$scope.gridDistribusiInternal = { 
				pageable: true,
				toolbar: ["cancel"],
				columns: [
				{ field:"namaProduk",title:"<center>Nama Barang", width:200},
				{ field:"qtyProduk",title:"<center>Jumlah", width:100},
				{ field:"jumlahRetur",title:"<center>Jumlah Retur", width:100}
				],
				editable: true
			};

			$scope.batal = function(){
				$state.go('DaftarPenerimaanSterilisasiAlat')
			}
			$scope.simpanInternal = function () {
				var dataPengemasan = []
				var adaAlert = []
				for (var i=0;i<$scope.dataSource._data.length;i++){
					if ($scope.dataSource._data[i].jumlahRetur > $scope.dataSource._data[i].qtyProduk) {
						adaAlert.push($scope.dataSource._data[i].namaProduk);
					}
				}
				if (adaAlert.length != 0) {
					window.messageContainer.error('Barang '+adaAlert.toString()+' Jumlah Retur Melebihi Jumlah Barang')
				} else {
					for (var i=0;i<$scope.dataSource._data.length;i++){
						var dataTemp =
						{
							 "detail":{  
					            "noRec":$scope.dataSource._data[i].noRecDetail
					         },
					         "qtyProdukRetur":$scope.dataSource._data[i].jumlahRetur
						}
						dataPengemasan.push(dataTemp);
					}
					var tanggal = new Date($scope.item.tanggal);
					var data = 
					{
					  "tanggalRetur":DateHelper.getTanggalFormattedNew(tanggal),
	   				  "keterangan":$scope.item.keterangan,
					  "returDetail": dataPengemasan
					}
					ManageSarpras.saveDataSarPras(data, "retur-cssd/save-retur-cssd/").then(function (e) {
						init();
						var konfirmasi = $mdDialog.confirm()
						.title('Peringatan!')
						.textContent('Apakah anda Akan Kembali ke Daftar Permintaan Sterilisasi?')
						.ariaLabel('Lucky Day')
						.ok('Ya')
						.cancel('Tidak')
						$mdDialog.show(konfirmasi).then(function(){
							$state.go("DaftarPenerimaanSterilisasiAlat")
						})
					});
				}
				
			}

			$scope.dataSource = new kendo.data.DataSource({
				pageSize: 5,
				data: $scope.dataDitribusiEksternal,
				autoSync: true
			});
			$scope.gridDistribusiEksternal = { 
				pageable: true,
				columns: [
				{ field:"namaPaket", title:"<center>Nama Paket"},
				{ field:"namaBarang",title:"<center>Nama Barang"},
				{ field:"jumlah",title:"<center>Jumlah"},
				{ field:"satuan",title:"<center>Satuan"}
				],
				editable: false
			};
		}
		]);
});