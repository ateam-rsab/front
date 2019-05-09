define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RepackingObatInjeksiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state','ManageApotek',
        function($rootScope, $scope, ModelItem, DateHelper, $state, manageApotek) {
            $scope.now = new Date();
            $scope.isInputMode = true;
            $scope.temp = {};
            $scope.idSequence = 1;

            ModelItem.get("RepackingObatInjeksi").then(function(data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});
            ModelItem.getDataDummyGeneric("Produk", true).then(function(data) {
                $scope.listNamaBarang = data;
            })
            ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
                $scope.listYangMeminta = data;
            })
            ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
                $scope.listYangMemberikan = data;
            })
            ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
                $scope.listMengetahui = data;
            })
            ModelItem.getDataDummyGeneric("Expired", true).then(function(data) {
                $scope.listExpired = data;
            })
            $scope.idData = "";

            $scope.Data = [];
            $scope.AddData = function() {
                $scope.temp.subTotal=$scope.temp.qty*$scope.temp.harga;
                var data = {
                    'id': $scope.idSequence,
                    'kdBarang': $scope.temp.barang.kdProduk,
                    'namaBarang': $scope.temp.barang.namaProduk,
                    'satuan': $scope.temp.barang.satuanStandarId,
                    'qty': $scope.temp.qty,
                    'harga': $scope.temp.harga,
                    'subTotal': $scope.temp.subTotal,
                    'cmbBarang':$scope.temp.barang,
                    "kdProfile": "",
                    "statusEnabled": "",
                    "noRec": "",
                };
                $scope.temp = {};
                $scope.Data.push(data);
                $scope.idSequence++;
            }

            $scope.EditData = function() {
                var data = _.find($scope.Data, function(data) {
                    return data.id == $scope.idData;
                });
                data.kdBarang = $scope.temp.barang.kdProduk,
                data.namaBarang = $scope.temp.barang.namaProduk,
                data.satuan = $scope.temp.barang.satuanStandarId,
                data.qty = $scope.temp.qty,
                data.harga = $scope.temp.harga,
                data.subTotal=data.qty*data.harga;
                $scope.isInputMode = true;
                $scope.temp = {};
            }

            $scope.getEditData = function(id) {
                $scope.idData = id;
                $scope.isInputMode = false;
                var data = _.find($scope.Data, function(data) {
                    return data.id == id;
                });
                //$scope.temp.barang.id = data.kodeBarang;
                $scope.temp.barang = data.cmbBarang;
                //$scope.temp.barang.satuanStandar = data.satuan;
                $scope.temp.qty = data.qty;
                $scope.temp.harga = data.harga;
                $scope.temp.subTotal = data.subTotal;
            }
            $scope.removeData = function(data) {
                $scope.Data = _.without($scope.Data, data);
            }

            $scope.Save = function(model) {
                $scope.item.pegawaiYgMeminta={id:$scope.item.pegawaiYgMeminta.id}
                $scope.item.pegawaiYgMengetahui={id:$scope.item.pegawaiYgMengetahui.id}
                $scope.item.pegawaiYgMemberikan={id:$scope.item.pegawaiYgMemberikan.id}
                $scope.item.produk={id:$scope.item.produk.id}
                $scope.item.noRec=""
                $scope.item.produksiDetailSet=[]
                debugger
                for(var i in $scope.Data){
                    var dataItem = $scope.Data[i];
                     $scope.item.produksiDetailSet.push(_.omit(dataItem, "cmbBarang","id"));
                }
                //console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                manageApotek.saveRepacking(ModelItem.beforePost($scope.item)).then(function () {
					debugger
				}, function (err) {debugger});
            };
        }
    ]);
});