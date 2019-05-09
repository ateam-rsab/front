define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InputMOUCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,ManageSdm) {
			 	/*ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				
			}, function errorCallBack(err) {});*/
			var init = function () {
                ManageSdm.getItem("diklat/get-mou-pks").then(function(dat){
                    $scope.dataMaster = dat.data.data;
                    $scope.dataMaster.forEach(function (data) {
                    	data.masaBerlakuAkreditasi =kendo.toString(new Date(data.startBerlakuAkreditasi), "dd/MM/yyyy")+" - "+kendo.toString(new Date(data.endBerlakuAkreditasi), "dd/MM/yyyy")
                    	data.masaBerlakuPks =kendo.toString(new Date(data.tglBerlakuAwalPks), "dd/MM/yyyy")+" - "+kendo.toString(new Date(data.tglBerlakuAkhirPks), "dd/MM/yyyy")
					})
                    $scope.dataGrid = new kendo.data.DataSource({
                        pageSize: 10,
                        data: $scope.dataMaster
                    });
                });
            }
            init()
            $scope.keteranganInstitusi = [
            {
            	"id":1, "name":"Institusi Pendidikan Baru"
            },
            {
            	"id":2, "name":"Institusi Pendidikan Lama"
            }]
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.listStatusPendidikan = [
			{"id":1, "name":"Negeri"},
			{"id":2, "name":"Swasta"}]
			ManageSdm.getItem("diklat/get-institusi-pendidikan").then(function(dat){
				$scope.listInstitusiPendidikan = dat.data.data;
			});
			ManageSdm.getItem("diklat/get-jurusan").then(function(dat){
				$scope.listJurusan = dat.data.data;
			});
			ManageSdm.getItem("diklat/get-program-studi").then(function(dat){
				$scope.listProgramStudi = dat.data.data;
			});
			$scope.pindah = function(){

				$state.go("RekamDataPegawai");

			}


			 $scope.ganti = function() {


			 }

			 $scope.pindah1 = function(){

			//	$state.go("DataKeluarga");

		}

		$scope.onSelect = function(e) {
            var data1 = $.map(e.files, function(file) { return file.extension; });
            var data2 = $.map(e.files, function(file) { return file.rawFile; });
            var files = data1[0];
            var file = data2[0];

		    if (files && file) {
		        var reader = new FileReader();

		        reader.onload = function(readerEvt) {
		            var binaryString = readerEvt.target.result;
		            $scope.item.urlDokumen = btoa(binaryString);
		            $scope.item.extention = files.substring(1);
		        };
		    }
		    reader.readAsBinaryString(file);
        };
		$scope.daftarBahanLinen = new kendo.data.DataSource({
			data:[]
		});
		$scope.simpan = function () {
			if ($scope.item.RadioButton == 1) {
				var data = {
					"namaInstitusiPendidikan":$scope.item.institusiPendidikanbaru,
					"kualifikasiJurusanId":"",
					"namaKualifikasiJurusan":$scope.item.jurusan.kualifikasiJurusan,
					"diklatProgramStudiId":$scope.item.programStudi.id,
					"namaDiklatProgramStudi":$scope.item.programStudi.programStudi,
					"statusInstitusiPendidikan":$scope.item.status.name,
					"badanAkreditasi":$scope.item.akreditasi,
					"tkt":$scope.item.tkt,
					"startMasaBerlakuAkreditasi":kendo.toString(new Date($scope.item.tglBerlakuMulai), "yyyy-MM-dd"),
					"endMasaBerlakuAkreditasi":kendo.toString(new Date($scope.item.tglBerlakuSelesai), "yyyy-MM-dd"),
					"terakhirPkl":$scope.item.terakhirPKL,
					"bangunan":$scope.item.bangunan,
					"noPks":$scope.item.noPks,
					"startMasaBerlakukPks":kendo.toString(new Date($scope.item.tglAwal), "yyyy-MM-dd"),
					"endMasaBerlakuPks":kendo.toString(new Date($scope.item.tglAkhir), "yyyy-MM-dd"),
					"hambatan":$scope.item.hambatan,
					"saran":$scope.item.saran,
					"keterangan":$scope.item.keterangan,
					"fileDokumen":$scope.item.urlDokumen,
					"fileExtention":$scope.item.extention
				}
				ManageSdm.saveData(data, "diklat/save-mou-pks").then(function(e) {
	                $scope.item = {};
	                init();
	            });
			} else {
				var data = {
					"namaInstitusiPendidikan":$scope.item.institusiPendidikan.namaRekanan,
					"kualifikasiJurusanId":$scope.item.jurusan.id,
					"namaKualifikasiJurusan":$scope.item.jurusan.kualifikasiJurusan,
					"diklatProgramStudiId":$scope.item.programStudi.id,
					"namaDiklatProgramStudi":$scope.item.programStudi.programStudi,
					"statusInstitusiPendidikan":$scope.item.status.name,
					"badanAkreditasi":$scope.item.akreditasi,
					"tkt":$scope.item.tkt,
					"startMasaBerlakuAkreditasi":kendo.toString(new Date($scope.item.tglBerlakuMulai), "yyyy-MM-dd"),
					"endMasaBerlakuAkreditasi":kendo.toString(new Date($scope.item.tglBerlakuSelesai), "yyyy-MM-dd"),
					"terakhirPkl":$scope.item.terakhirPKL,
					"bangunan":$scope.item.bangunan,
					"noPks":$scope.item.noPks,
					"startMasaBerlakukPks":kendo.toString(new Date($scope.item.tglAwal), "yyyy-MM-dd"),
					"endMasaBerlakuPks":kendo.toString(new Date($scope.item.tglAkhir), "yyyy-MM-dd"),
					"hambatan":$scope.item.hambatan,
					"saran":$scope.item.saran,
					"keterangan":$scope.item.keterangan,
					"fileDokumen":$scope.item.urlDokumen,
					"fileExtention":$scope.item.extention
				}
				ManageSdm.saveData(data, "diklat/save-mou-pks").then(function(e) {
	                $scope.item = {};
	                init();
	            });
			}
			
		}
		$scope.downloadDokumen = function(dataItem){
			$scope.dataItem = dataItem;
			ManageSdm.downloadData("diklat/get-download-dokumen?dokumenId="+dataItem.dokumenId)
		}

		$scope.columnLaporanUjimou = [
		{
			"field": "noPks",
			"title": "No PKS",
			"width": 100
		},
		{
			"field": "namaRekanan",
			"title": "Nama Institusi",
			"width": 200
		},
		{
			"field": "jurusan",
			"title": "Jurusan",
			"width": 150
		},
		{
			"field": "programStudi",
			"title": "Program Studi",
			"width": 120
		},
		{
			"field": "statusInstitusi",
			"title": "Status institusi",
			"width": 100
		},
		{
			"field": "akreditasi",
			"title": "Badan Akreditasi",
			"width": 150
		},{
			"field": "tkt",
			"title": "tkt",
			"width": 100
		},
		{
			"field": "masaBerlakuAkreditasi",
			"title": "Masa Berlaku Akreditasi",
			"width": 200
		},
		{
			"field": "endPkl",
			"title": "Terakhir PKL",
			"width": 120
		},
		{
			"field": "bangunan",
			"title": "Bangunan",
			"width": 100
		},
		{
			"field": "masaBerlakuPks",
			"title": "Masa Berlaku PKS",
			"width": 200
		},{
			"field": "hambatan",
			"title": "Hambatan",
			"width": 100
		},
		{
			"field": "saran",
			"title": "Saran",
			"width": 100
		},
		{
			"field": "keterangan",
			"title": "Keterangan",
			"width": 120
		},
		{
			title : "Download",
			width : 100,
			template : "<button class='c-button' ng-click='downloadDokumen(dataItem)''>Download</button>"
		}
		];

		$scope.Save = function() {

			  // saveDaftarPaketPelatihan
			  ManageSdm.saveRekananMouPks(ModelItem.beforePost($scope.item),"/peserta-didik/input-mou-pks").then(function (e) {
			  	$scope.item= {};

                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                 });*/
             });


			};

		}
		]);
});