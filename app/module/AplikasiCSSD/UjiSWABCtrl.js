define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('UjiSWABCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state', 'ManageSarpras','IPSRSService','$mdDialog',
		function($rootScope, $scope, ModelItem, DateHelper, $state, ManageSarpras, IPSRSService, $mdDialog) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.waktuMulai =  $scope.now;
			$scope.item.waktuSelesai =  $scope.now;
			$scope.dataVOloaded = true;
			var init = function () {
				IPSRSService.getItem("cssd-uji-swap/detail-uji-swap/?strukPelayananId="+$state.params.strukPelayananId).then(function(dat){
					$scope.dataHeader = dat.data.header;
					$scope.dataGrid = dat.data.detail;
					$scope.item.noOrder = $scope.dataHeader.noOrder;
					$scope.item.ruanganAsal = $scope.dataHeader.ruanganAsal;
					$scope.item.ruanganTujuan = $scope.dataHeader.ruanganTujuan;
					$scope.item.petugas = $scope.dataHeader.petugas;
					var tanggal = new Date($scope.dataHeader.tanggalPlanning);
					var jamMulai = new Date($scope.dataHeader.jamMulai);
					var jamSelesai = new Date($scope.dataHeader.jamAkhir);
					if ($scope.dataHeader.jamMulai == "" || $scope.dataHeader.jamMulai == "-") {
						$scope.item.jamMulai = $scope.dataHeader.jamMulai;
						$scope.item.jamSelesai = $scope.dataHeader.jamAkhir;
					} else {
						$scope.item.waktuMulai = jamMulai;
						$scope.item.waktuSelesai = jamSelesai;
					}

					if ($scope.dataHeader.tanggalPlanning == "" || $scope.dataHeader.tanggalPlanning == "-") {
						$scope.item.tanggal = new Date();
					} else {
						$scope.item.tanggal = tanggal;
					}
					var produkUjiSwab = [];
					$scope.dataGrid.forEach(function(data){
	                    if (data.hasil == "-" || data.hasil == ""){
	                        var listData = {
	                            "hasil":{
	                                "name":"",
	                                "id":""
	                            },
	                            "namaProduk": data.namaProduk,
	                            "qtyProduk": data.qtyProduk,
	                            "jumlahBakteri": data.jumlahBakteri,
	                            "status": data.status,
	                            "produkId": data.produkId,
	                            "noRec": data.noRec
	                        }  
	                        produkUjiSwab.push(listData);
	                    } else {
	                        var listData = {
	                            "hasil":{
	                                "name":data.hasil,
	                                "id":""
	                            },
	                            "namaProduk": data.namaProduk,
	                            "qtyProduk": data.qtyProduk,
	                            "jumlahBakteri": data.jumlahBakteri,
	                            "status": data.status,
	                            "produkId": data.produkId,
	                            "noRec": data.noRec
	                        }  
	                        produkUjiSwab.push(listData);
	                    }
	                });
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: produkUjiSwab,
						batch: true,
						schema: {
							model: {
								id: "produkId",
								fields: {
									produkId: { editable: false, nullable: true },
									namaProduk: { editable: false },
									qtyProduk: { editable: false },
									hasil: {editable: true},
									jumlahBakteri: { type: "number", validation: { min: 0, required: true } },
									status: { type: "boolean", editable: false},

								}
							}
						}
					});
				});
			};
			init();
			$scope.dataUjiSWAB = [];
			$scope.item.tanggal = new Date();
			$scope.status = [
			{"status":"TRUE"},
			{"status":"FALSE"}
			]
			$scope.hasil = [
            {"id":1, "name":"PASS"},
            {"id":2, "name":"FAIL"}
            ]

            $scope.dropDownHasil = function(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: $scope.hasil
                    });
            }
			$scope.gridUjiSWAB = { 
				pageable: true,
				toolbar: ["cancel"],
				columns: [
				{ field:"namaProduk", title:"<center>Nama Alat", width: 120},
				{ field:"qtyProduk",title:"<center>Quantity", width: 120},
				{ field:"hasil",title:"<center>Hasil", width: 120, editor: $scope.dropDownHasil, template: "#=hasil.name#"},
				{ field:"jumlahBakteri",title:"<center>Jumlah Bakteri", width: 100}
				],
				editable: true
			};

			$scope.batal = function(){
				$state.go('DaftarPenerimaanSterilisasiAlat');
			}
			
			$scope.simpan = function () {
				var dataGridNew = [];
				for (var i=0;i<$scope.dataGrid.length;i++) {
					var dataTemp =
					{
						"produk":{
							"id":$scope.dataSource._data[i].produkId
						},
						"hasil":$scope.dataSource._data[i].hasil.name,
						"qtyProduk":$scope.dataSource._data[i].qtyProduk,
						"status":false,
						"noRec":$scope.dataSource._data[i].noRec,
						"jumlahBakteri":$scope.dataSource._data[i].jumlahBakteri
					}
					var dataTemp_2 =
					{
						"produk":{
							"id":$scope.dataSource._data[i].produkId
						},
						"hasil":$scope.dataSource._data[i].hasil.name,
						"qtyProduk":$scope.dataSource._data[i].qtyProduk,
						"status":true,
						"noRec":$scope.dataSource._data[i].noRec,
						"jumlahBakteri":$scope.dataSource._data[i].jumlahBakteri
					}
					if ($scope.dataSource._data[i].hasil == "-" || $scope.dataSource._data[i].hasil == "") {
						dataGridNew.push(dataTemp);
					} else {
						dataGridNew.push(dataTemp_2);
					}
					
				}
				var tanggalFormat = new Date($scope.item.tanggal);
				var jamMulaiFormat = new Date($scope.item.waktuMulai)
				var jamSelesaiFormat = new Date($scope.item.waktuSelesai)
				var tanggal = DateHelper.getTanggalFormattedNew(tanggalFormat);
				var jamMulai = DateHelper.getJamFormatted(jamMulaiFormat);
				var jamSelesai = DateHelper.getJamFormatted(jamSelesaiFormat);
				var data =
				{
					"strukPelayanan": {
						"noRec": $state.params.strukPelayananId
					},
					"tanggal": $scope.item.tanggal.getTime(),
					"jamMulai": jamMulaiFormat.getTime(),
					"jamSelesai": jamSelesaiFormat.getTime(),
					"noRec": $scope.dataHeader.noRec,
					"cssdUjiSwapDetail": dataGridNew
				}
				IPSRSService.saveDataSarPras(data, "cssd-uji-swap/save-uji-swap/").then(function(e) {
					init();
				var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Kembali ke Daftar Penerimaan Sterilisasi?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $state.go("DaftarPenerimaanSterilisasiAlat");
                })
				});
			}
			function customBoolEditor(container, options) {
				$('<input class="k-checkbox" type="checkbox" name="status" data-type="boolean" data-bind="checked:status">').appendTo(container);
				$('<label class="k-checkbox-label">&#8203;</label>').appendTo(container);
			}
		}
		]);
});