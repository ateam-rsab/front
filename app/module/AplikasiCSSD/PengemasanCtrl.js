define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengemasanCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras','IPSRSService', 'DateHelper', '$state','$mdDialog',
		function($rootScope, $scope, ModelItem, ManageSarpras, IPSRSService, DateHelper, $state,$mdDialog) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.dataPost = [];
			var init = function () {
				debugger
				IPSRSService.getItem("cssd-pengemasan/detail-pengemasan/?strukPelayananId="+$state.params.strukPelayananId).then(function(dat){
					debugger
					$scope.dataHeader = dat.data.header;
					$scope.dataGrid = dat.data.detail;
					$scope.dataGrid.forEach(function (data) {
						if (data.jamAkhir == "-") {
							//data.jamMulai = "-";
							//data.jamAkhir = "-";
							data.jamMulai = $scope.now;
							data.jamAkhir = $scope.now;
						} else {
							var dateAwal = new Date(data.jamMulai);
							var dateAkhir = new Date (data.jamAkhir);
							data.jamMulai = dateAwal;
							data.jamAkhir = dateAkhir;
						}
						
					})	
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 5,
						data: $scope.dataGrid,
						batch: true,
						schema: {
	                        model: {
	                            fields: {
	                                namaProduk: { editable: false},
	                                satuanStandar: { editable: false},
	                                qtyProduk: { editable: false},
	                                jamMulai: { editable: true},
	                                jamSelesai: { editable: true}
	                            }
	                        }
                   		}
					});
					$scope.item.jumlahCycle = $scope.dataHeader.siklus;
					$scope.item.jenisHarga = $scope.dataHeader.jenisHarga;
					$scope.item.noOrder = $scope.dataHeader.noOrder;
					$scope.item.noBundle = $scope.dataHeader.noBundel;
					$scope.item.ruangan = $scope.dataHeader.ruanganAsal;
					$scope.item.operator = $scope.dataHeader.petugas;
					var tanggal = new Date($scope.dataHeader.tanggalPlanning);
					if ($scope.dataHeader.tanggalPlanning == "" || $scope.dataHeader.tanggalPlanning == "-") {
						$scope.item.tanggal = new Date();
					} else {
						$scope.item.tanggal = tanggal;
					}
					

				});
			};
			init();

			$scope.batal = function(){
				debugger
				$state.go('DaftarPenerimaanSterilisasiAlat');
			}
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
				{ field:"satuanStandar",title:"<center>Satuan", width:100},
				{ field:"qtyProduk",title:"<center>Jumlah", width:100},
				{ field:"jamMulai",title:"<center>Jam Mulai", width:100, format:"{0:HH:mm}", editor: $scope.timeEditor},
				{ field:"jamAkhir",title:"<center>Jam Selesai", width:100, format:"{0:HH:mm}", editor: $scope.timeEditor}
				],
				editable: true
			};
			$scope.simpanInternal = function () {
				var dataPengemasan = []
				for (var i=0;i<$scope.dataSource._data.length;i++){
					var dataTemp =
					{
						"produk": {
					    	"id": $scope.dataSource._data[i].produkId
					    },
					    "qtyProduk": $scope.dataSource._data[i].qtyProduk,
					    "noRec": $scope.dataSource._data[i].noRec,
					    "jamMulai":$scope.dataSource._data[i].jamMulai,
         				"jamSelesai":$scope.dataSource._data[i].jamAkhir
					}
					dataPengemasan.push(dataTemp);
				}
				var data = 
				{
				  "strukPelayanan": {
				    "noRec": $state.params.strukPelayananId
				  },
				  "noRec": $scope.dataHeader.noRec,
				  "tanggal": $scope.item.tanggal,
				  "cssdPengemasanDetail": dataPengemasan
				}
				ManageSarpras.saveDataSarPras(data, "cssd-pengemasan/save-pengemasan/").then(function (e) {
					init();
					var konfirmasi = $mdDialog.confirm()
					.title("Peringatan!")
					.textContent("Kembali ke daftar Penerimaan Sterilisasi?")
					.ariaLabel("Lucky Day")
					.ok("Ya")
					.cancel("Tidak")
					$mdDialog.show(konfirmasi).then(function(){
						$state.go("DaftarPenerimaanSterilisasiAlat");
					})
				});
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