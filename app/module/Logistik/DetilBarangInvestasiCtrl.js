define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DetilBarangInvestasiCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'R', 'DetilBarangInvestasi',
        function($rootScope, $scope, $state, ModelItem, r, DetilBarangInvestasi) {

            $scope.title = "Detil Barang Inventaris";
            $scope.dataVOloaded = true;
            $scope.item = {};

            ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
                $scope.listRuangan = data;
            })

            ModelItem.getDataDummyGeneric("MerkProduk", false).then(function(data) {
                $scope.listMerk = data;
            })
            ModelItem.getDataDummyGeneric("TypeProduk", false).then(function(data) {
                $scope.listType = data;
            })
            ModelItem.getDataDummyGeneric("KelompokAset", false).then(function(data) {
                $scope.listKelompokAset = data;
            })
            ModelItem.getDataDummyGeneric("Lokasi", false).then(function(data) {
                $scope.listLokasi = data;
            })
            ModelItem.getDataDummyGeneric("KondisiAset", false).then(function(data) {
                $scope.listKondisi = data;
            })
            ModelItem.getDataDummyGeneric("AsalProduk", false).then(function(data) {
                $scope.listAsalProduk = data;
            })
            $scope.item.noAset = $state.params.noAset;

            DetilBarangInvestasi.getDataInvestasi("registrasi-aset/first-registrasi-aset/?noRec=" + $scope.item.noAset).then(function(dat) {
                $scope.item = ModelItem.beforePost(dat.data.data);
            });
            $scope.selesai = function() {
                // action selesai required
            };

            $scope.back = function() {
                // $state.go("DaftarPenerimaanLogistik");
            }
        }
    ])
})