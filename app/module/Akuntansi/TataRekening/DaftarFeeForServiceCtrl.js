define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarFeeForServiceCtrl', ['$rootScope', '$scope', 'DateHelper', 'ManageSdm',
        function($rootScope, $scope, dateHelper, manageSdm) {
            $scope.item = {};
            manageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaExternal", true).then(function(dat) {
                $scope.listPegawai = dat.data;
            });
            $scope.formatTanggal = function(value) {
                return dateHelper.formatDate(parseInt(value), "YYYY-MM-DD");
            };
            $scope.cariData = function() {
            	if ($scope.item.namaDokter == undefined) {
            		var namaDokter = "";
            	}
            	else {
            		var namaDokter = $scope.item.namaDokter.id;
            		debugger;
            	}
            	if ($scope.item.periodeAwal == undefined) {
            		var periodeAwal = "";
            	}
            	else {
            		var periodeAwal = dateHelper.formatDate($scope.item.periodeAwal, "YYYY-MM-DD");
            	}
            	if ($scope.item.periodeAkhir == undefined) {
            		var periodeAkhir = "";
            	}
            	else {
            		var periodeAkhir = dateHelper.formatDate($scope.item.periodeAkhir, "YYYY-MM-DD");
            	}
            	manageSdm.getOrderList("fee-for-service?page=&limit=&pegawaiId="+ namaDokter + "&from=" + periodeAwal + "&to=" + periodeAkhir).then(function(dat) {
            		$scope.listPencarian = dat.data.data;
            		$scope.dataSource = new kendo.data.DataSource({
                		data: $scope.listPencarian,
                		pageSize: 10
            		});
            	});
            };
            
            $scope.columnDaftarService = [{
            	'field': 'nipPegawai',
            	'title': 'NIP Pegawai'
            }, {
            	'field': 'namaDokter',
            	'title': 'Nama Dokter'
            }, {
                "field": "tglPelayanan",
                "title": "Tgl Pelayanan",
                "template": "<span class='style-left'>{{formatTanggal('#: tglPelayanan #')}}</span>"
            }, {
            	'field': 'namaProduk',
            	'title': 'Nama Produk'
            }, {
            	'field': 'jmlProduk',
            	'title': 'Jml Produk'
            }, {
            	'field': 'hargaProduk',
            	'title': 'Harga Produk'
            }, {
            	'field': 'hargJual',
            	'title': 'Harga Jual'
            }, {
            	'field': 'hargaDiskon',
            	'title': 'Harga Diskon'
            }];

            $scope.mainGridOptions = {
                pageable: true,
                selectable: "row",
                editable: "popup",
                scrollable: false,
                columns: $scope.columnDaftarService
            };
            var init = function() {
            	manageSdm.getOrderList('fee-for-service').then(function(dat) {
            		$scope.dataGrid = dat.data.data;
            		$scope.dataSource = new kendo.data.DataSource({
                		data: $scope.dataGrid,
                		pageSize: 10
            		});
            	});
            };
            init();
        }
    ])
});
