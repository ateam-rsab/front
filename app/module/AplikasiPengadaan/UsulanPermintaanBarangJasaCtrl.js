
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('UsulanPermintaanBarangJasaCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'dataRupService',
		function($rootScope, $scope, ModelItem, DateHelper, dataRupService) {
			ModelItem.get("AplikasiPengadaan/UsulanPermintaanBarangJasa").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
            $scope.enablePengendali = true;
            $scope.enableKodeAnggaran = true;
            $scope.enableJumlah = true;
            $scope.enablePpn = true;
            $scope.enableTotal = true;
            $scope.enablePembulatan = true;

			dataRupService.getData("Pengendali&select=id,kodePengendali,namaPengendali", true).then(function(dat){
				$scope.listUsulan = dat;
			});

			dataRupService.getListData("kartu-pengendali/kartu-pengendali-list?kelompokUser=true", true).then(function(dat){
				$scope.dataUsulanPermintaanBarangJasa = dat.data.data;
				
				$scope.dataUsulanPermintaanBarangJasa.forEach(function(data) {
					data.tanggal = DateHelper.getTanggalFormatted(new Date(data.tanggal));
					data.jumlahBaru = data.volume * data.total;
				});
				//debugger;

			});

			// $scope.isVerifikasi = [
			// 	{"id": "1","status": "USULAN"}, 
			// 	{"id": "2","status":"VERIFIED PPK"}, 
			// 	{"id": "3", "status": "VERIFIED PEA"}, 
			// 	{"id": "4", "status": "VERIFIED Direksi"},
			// 	{"id": "5","status":"UNVERIFIED PPK"}, 
			// 	{"id": "6", "status": "UNVERIFIED PEA"}, 
			// 	{"id": "7", "status": "UNVERIFIED Direksi"}
			// ]

			$scope.columnUsulanPermintaanBarangJasa= [{
				"field": "noUsulanPermintaan",
				"title": "<h3 align=center>No Usulan</h3>",
				"width": "150px",
				"template":"<div style=\"text-align: center\">#=noUsulanPermintaan#</div>"
			}, {
				"field": "tanggal",
				"title": "<h3 align=center>Tanggal</h3>",
				"width": "150px"
			}, {
				"field": "pengendali",
				"title": "<h3 align=center>Pengendali</h3>",
				"width": "250px"
			}, {
				"title": "<h3 align=center>Harga</h3>",
				"columns": [{
					"field": "total",
					"title": "<h3 align=center>Satuan</h3>",
					"width": "120px",
					"template":"<div class=\"pull-right\">#=kendo.toString(total, \"n0\")#</div>"
				}, {
					"field": "volume",
					"title": "<h3 align=center>Qty</h3>",
					"width": "70px",
					"template":"<div class=\"pull-right\">#=kendo.toString(volume, \"n0\")#</div>"
				}, {
					"field": "jumlahBaru",
					"title": "<h3 align=center>Total</h3>",
					"width": "120px",
					"template":"<div class=\"pull-right\">#=kendo.toString(jumlahBaru, \"n0\")#</div>"
				}]
			}, {
				"field": "status",
				"title": "<h3 align=center>Status</h3>"//,
				//"template": "<input kendo-drop-down-list k-ng-model=\"dataItem.status\" k-data-text-field=\"'status'\" k-data-value-field=\"'id'\" k-data-source=\"isVerifikasi\"  k-on-change=\"update(data, columns, dataItem)\" style=\"width: 100%\" ></input>"
			}, {
				"field": "action",
				"command": "[\"UPDATE\"]",
				"template": ""
				//"template": "<input kendo-drop-down-list k-ng-model=\"dataItem.status\" k-data-text-field=\"'status'\" k-data-value-field=\"'id'\" k-data-source=\"isVerifikasi\"  k-on-change=\"update(data, columns, dataItem)\" style=\"width: 100%\" ></input>"
			}];

			$scope.dataListPengajuan = new kendo.data.DataSource({
                data: [],
                editable: true,
                serverPaging: true
            });
            //debugger;

            $scope.ArrListPengajuan = [];

			$scope.update = function(data, columns, dataItem) {
                // call apply to force Angular to update
                //$scope.$apply();
                $scope.data = data;

                $scope.columns = columns;
                $scope.dataItem = dataItem;

                $scope.dataListPengajuan.add(dataItem);
                $scope.ArrListPengajuan.push(dataItem);
                //$scope.canEdit = false;
                console.log(JSON.stringify($scope.ArrListPengajuan));
            };

            $scope.notification = {
		        status: 'hide',
		        type: 'success',
		        message: 'Welcome! It\'s yet another angular alert ;)'
		    };
		    $scope.simpanLokalSukses = false;

            $scope.Save = function(){
            	var grid = $('#GridDataUsulanPermintaan').data("kendoGrid");
				var ds = new kendo.data.DataSource({
					data: $scope.ArrListPengajuan
				});

				grid.setDataSource(ds);
				ds.read();
				ds.sync();

				$scope.notification = {
			        status: 'show',
			        type: 'info',
			        message: 'SUKSES'
			    };

			    $scope.simpanLokalSukses = true;
            }
		}
	]);
});