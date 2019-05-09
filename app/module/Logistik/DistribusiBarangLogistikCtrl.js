define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DistribusiBarangLogistikCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'R', 'DistribusiBarangLogistik',
        function($rootScope, $scope, $state, ModelItem, r, DistribusiBarangLogistik) {

            $scope.title = "Distribusi Barang Inventaris";
            $scope.dataVOloaded = true;
            $scope.item = {};


            DistribusiBarangLogistik.getListRuangan("Ruangan&select=id,namaRuangan").then(function(data) {
                $scope.sourceRuangan = data;
                // debugger;
            });


            /*
            $scope.sourceRuangan = [{
            	"kdRuangan" : 1, "namaRuangan" : "ANGGREK"
            }, {
            	"kdRuangan" : 2, "namaRuangan" : "MAWAR"
            }, {
            	"kdRuangan" : 3, "namaRuangan" : "MELATI"
            }, {
            	"kdRuangan" : 4, "namaRuangan" : "SOKA"
            }, {
            	"kdRuangan" : 5, "namaRuangan" : "TERATAI"
            }];
            */

            $scope.item.noRec = $state.params.noRec;
            //console.log(JSON.stringify($scope.item.noRec));
            //debugger;

            DistribusiBarangLogistik.findDetailAsset("penerimaan-barang/get-detail-penerimaan/?noRec=" + $scope.item.noRec).then(function(dat) {
                $scope.detilRecord = dat.data.data;
                $scope.daftarAset = $scope.detilRecord.registrasiAset;
                // debugger;
                /* data ruangan sudah di generate oleh backend
                // tidak perlu didefinisikan seperti dibawah 
                for (var i = $scope.daftarAset.length - 1; i >= 0; i--) {
                	var ruangan;
                	$scope.daftarAset[i].ruangan = {}
                }
                */
                for (var i = 0; i <= $scope.daftarAset.length; i++) {
                    var ruangan;
                    $scope.daftarAset[i].id = i + 1;
                }

                $scope.dataInventaris;
                //$scope.daftarAset.noRegisterAset = "";
                //var id = $scope.daftarAset.length + 1;

                //debugger;
            });

            /*
            $scope.daftarAset = [{
            		"id": 1,
            		"kdProfile": 1,
            		"noRec": "4028ab215722883b0157228a59b70005",
            		"noRegisterAset": "1609000008"
            	},{
            		"id": 2,
            		"kdProfile": 1,
            		"noRec": "4028ab215722883b0157228a59b60003",
            		"noRegisterAset": "1609000006"
            	},{
            		"id": 3,
            		"kdProfile": 0,
            		"noRec": "4028ab215722883b0157228a59b7000a",
            		"noRegisterAset": "1609000005"
            	},{
            		"id": 4,
            		"kdProfile": 1,
            		"noRec": "4028ab215722883b0157228a59b60002",
            		"noRegisterAset": "1609000011"
            	},{
            		"id": 5,
            		"kdProfile": 1,
            		"noRec": "4028ab215722883b0157228a59b70008",
            		"noRegisterAset": "1609000010"
            	},{
            		"id": 6,
            		"kdProfile": 1,
            		"noRec": "4028ab215722883b0157228a59b70004",
            		"noRegisterAset": "1609000004"
            	},{
            		"id": 7,
            		"kdProfile": 1,
            		"noRec": "4028ab215722883b0157228a59b70007",
            		"noRegisterAset": "1609000002"
            	},{
            		"id": 8,
            		"kdProfile": 1,
            		"noRec": "4028ab215722883b0157228a59b8000b",
            		"noRegisterAset": "1609000007"
            	},{
            		"id": 9,
            		"kdProfile": 1,
            		"noRec": "4028ab215722883b0157228a59b70009",
            		"noRegisterAset": "1609000009"
            	},{
            		"id": 10,
            		"kdProfile": 1,
            		"noRec": "4028ab215722883b0157228a59b70006",
            		"noRegisterAset": "1609000003"
            	}
            ];
            */

            //console.log(JSON.stringify($scope.daftarAset));
            //debugger;
            /*
            $scope.noRec = [{
            	"kdProfile": 0,
            	"produk": {
            		"kdProfile": 0,
            		"statusEnabled": true,
            		"id": 11869,
            		"noRec": "34d1E1w8-AC468-A5Cs6-DE9B26443  ",
            		"reportDisplay": "MEJA",
            		"namaExternal": "MEJA",
            		"kdProduk": "8G12C01015",
            		"kdProdukIntern": "8G12C01015",
            		"namaProduk": "Meja",
            		"nilaiNormal": 1,
            		"qProduk": 11860,
            		"qtyJualTerkecil": 1,
            		"qtySatuKemasan": 1,
            		"qtyTerkecil": 1
            	},
            	"asalProduk": {
            		"kdProfile": 1,
            		"statusEnabled": true,
            		"id": 1,
            		"noRec": "1",
            		"reportDisplay": "Dana Rumah Sakit",
            		"namaExternal": "Dana Rumah Sakit",
            		"asalProduk": "Dana Rumah Sakit",
            		"kdAsalProduk": 1,
            		"qAsalProduk": 1
            	},
            	"satuan": {
            		"kdSatuanStandar": 1,
            		"qSatuanStandar": 1,
            		"satuanStandar": "Tindakan"
            	},
            	"jumlahTerima": 10
            }];
            */
            $scope.dataInventaris = new kendo.data.DataSource({
                data: [],
                editable: true,
                serverPaging: true
            });
            //debugger;

            $scope.ArrAsset = [];

            $scope.colomnInventaris = [{
                "field": "id",
                "title": "No",
                "width": "50px"
            }, {
                "field": "noRec",
                "title": "No Record",
                hidden: true
            }, {
                "field": "noRegisterAset",
                "title": "No Asset"
            }, {
                "field": "ruangan",
                "title": "Ruangan Tujuan",
                "template": "<input kendo-drop-down-list k-ng-model=\"dataItem.ruangan\" k-data-text-field=\"'namaRuangan'\" k-data-value-field=\"'id'\" k-data-source=\"sourceRuangan\"  k-on-change=\"update(data, columns, dataItem)\" style=\"width: 100%\" ></input>"
            }, {
                "field": "qrCode",
                "title": "No QR-Code"
            }];

            //debugger;
            /*

		  	DistribusiBarangLogistik.getListRuangan("Ruangan&select=id,namaRuangan&take=20").then(function(data){
				$scope.sourceRuangan = data;
				//debugger;
			});

			DistribusiBarangLogistik.findDetailAsset("penerimaan-barang/get-detail-penerimaan/?noRec=").then(function(data){
				$scope.item = data;
				$scope.dataVOloaded = true;
			}), 

			function errorCallBack(err) {});)
			*/

            $scope.update = function(data, columns, dataItem) {
                // call apply to force Angular to update
                //$scope.$apply();
                $scope.data = data;

                $scope.columns = columns;
                $scope.dataItem = dataItem;

                $scope.dataInventaris.add(dataItem);
                $scope.ArrAsset.push(dataItem);
                //$scope.canEdit = false;
                //console.log(JSON.stringify($scope.dataInventaris));
            };

            /* function save dari Penerimaan Logistik
    		$scope.selesai = function(dataBaru){
				var id = $scope.ArrProduk.length + 1;
				// var idx = _.indexOf(_.pluck($scope.ArrProduk), dataBaru);
				// console.log(idx);
				// var HH = dataBaru.tanggal.getHours();
				// var mm = dataBaru.tanggal.getMinutes();
				// if(HH < 10) HH = "0" + HH;
				// if(mm < 10) mm = "0" + mm;

				var newData = {
					"no": id,
					"produk": dataBaru.produk,
					"asalProduk": dataBaru.asalProduk,
					"qtyproduk": dataBaru.qtyproduk,
					"satuan": dataBaru.satuan,
					"jumlahTerima": dataBaru.jumlahTerima,
					"satuanTerima": dataBaru.satuanTerima,
					"harga": dataBaru.harga,
					"discount": dataBaru.discount,
					"total": dataBaru.subTotalProduk,
					"tanggalKadaluarsa": DateHelper.getPeriodeFormatted(dataBaru.tanggalKadaluarsa),
					"noBatch": dataBaru.noBatch
				};

				$scope.dataProduk.add(newData);
				$scope.ArrProduk.push(newData);
				$scope.canEdit = false;
				console.log(JSON.stringify($scope.ArrProduk));
			}
			*/

            $scope.selesai = function() {
                //$scope.item.registrasiAset = $scope.dataInventaris;

                // $scope.item.registrasiAsets
                var data = {
                    "registrasiAset": $scope.ArrAsset
                };

                //console.log("dataInventaris = " + JSON.stringify($scope.item.registrasiAset));
                //console.log("ArrAsset = " + JSON.stringify($scope.item.registrasiAsets));

                DistribusiBarangLogistik.saveDistribusi(ModelItem.beforePost(data), "registrasi-aset/save-distribusi-barang/").then(function(e) {
                    $scope.isNext = true;
                });
            };

            $scope.back = function() {
                $state.go("DaftarPenerimaanLogistik");
            }
        }
    ])
})