/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('FormulirCatatanPelaksanaanTransfusiTerintegrasiCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper',
        function ($rootScope, $scope, ModelItem, DateHelper) {
            $scope.title = "Formulir Catatan Pelaksanaan Transfusi Terintegrasi";
            $scope.dataVOloaded = true;
            $scope.item = {};
			$scope.now = new Date();
            $scope.showGridData=true;
            $scope.no=1;
			$scope.noAll=1;

            ModelItem.get("Sample/FormulirCatatanPelaksanaanTransfusiTerintegrasi").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});

            // Combo box Jenis Perawatan
            ModelItem.getDataDummyGeneric("StatusSesuaiTidak", false).then(function (data) {
                $scope.status = data;
            })

            ModelItem.getDataDummyGeneric("ListJenisDarah", false).then(function (data) {
                $scope.listJenisDarah = data;
            })

			ModelItem.getDataDummyGeneric("ListKeadaanKantong", false).then(function (data) {
                $scope.listKeadaanKantong = data;
            })

			$scope.item.paraf = true;
			$scope.item.parafTTV = true;

            $scope.dataRow= new kendo.data.DataSource({
				data: []
			});
			
			$scope.columnData = [{
				"field":"no",
				"title": "No",
				"width" : "50px"
			},{
				"field": "keterangan",
				"title": "Keterangan",
				
			},{
				"field": "jam",
				"title": "Jam",
				
			}];

            $scope.dataAllRow= new kendo.data.DataSource({
				data: []
			});
			
			$scope.columnAllData = [{
				"field":"noAll",
				"title": "No",
				"width" : "50px"
			},{
				"field": "golonganDarah",
				"title": "Golongn Darah",
				
			},{
				"field": "jenisDarah",
				"title": "JenisDarah",
				
			},{
				"field":"target",
				"title": "Target Transfusi",
			},{
				"field": "namaDPJP",
				"title": "DPJP",
				
			},{
				"field": "pemberian",
				"title": "Pemberian Pre-medikasi",
				
			},{
				"field": "alasan",
				"title": "Alasan",
				
			},{
				"field": "kecepatan",
				"title": "Kecepatan Pemberian",
				
			},{
				"field":"pemeriksaan",
				"title": "Pemeriksaan",
			},{
				"field": "namaDokter",
				"title": "Dokter",
				
			},{
				"field": "pemberian",
				"title": "Pemberian Pre-medikasi",
				
			}];

            $scope.addDataToRow = function() {
				
				var tempData = {
					"no":$scope.no++,
					"keterangan" :$scope.item.keterangan,
					"jam" :DateHelper.getTanggalFormatted($scope.item.jam)
				}
				$scope.dataRow.add(tempData);				
			};

			$scope.reset = function(){
				$scope.item.jam = null,
				$scope.item.keterangan = null
			}

			$scope.addAllDataToRow = function() {
				
				var tempData = {
					"noAll":$scope.noAll++,
					"golonganDarah":$scope.item.golonganDarah,
					"jenisDarah":$scope.item.jenisDarah,
					"target":$scope.item.target,
					"namaDPJP":$scope.item.namaDPJP,
					"alasan":$scope.item.alasan,
					"kecepatan":$scope.item.kecepatan,
					"pemeriksaan":$scope.item.pemeriksaan,
					"namaDokter" :$scope.item.namaDokter,
					"pemberian":$scope.item.pemberian
					
				}
				$scope.dataAllRow.add(tempData);				
			};

			$scope.resetAll = function(){
				$scope.item.keadaanKantong=null,
				$scope.item.golonganDarah=null,
				$scope.item.volume=null,
				$scope.item.target=null,
				$scope.item.namaDPJP=null,
				$scope.item.alasan=null,
				$scope.item.kecepatan=null,
				$scope.item.pemeriksaan=null,
				$scope.item.namaDokter=null,
				$scope.item.pemberian=null
			}

    }]);
});