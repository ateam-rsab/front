define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InputLogbookCtrl', ['LoginService', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper','ManageSdm', 'ManageSdmNew',
		function(loginService, socket, $rootScope, $scope, ModelItem, $state, DateHelper, ManageSdm, ManageSdmNew) {
			$scope.i = 2;
			$scope.now = new Date();
			var idPgw=0;
			// $scope.tanggal = moment( new Date()).format("YYYY-MM-DD");
			$scope.tanggal = $scope.now;
			ManageSdmNew.getListData("sdm/get-uraian-kerja", true).then(function(dat) {
				$scope.daftarBahanLinen = new kendo.data.DataSource({
					data:  dat.data.data,
					schema: {
						model: {
							fields: {
								capaian: { type : "number", validation: { min: 0, required: true } }
							}
						}
					}      
				});
			});
			ManageSdmNew.getListData("sdm/get-id-pgw").then(function(dat) {
				idPgw = dat.data.data.id; 
			});
			var satu  =  moment($scope.now).format("YYYY-MM-DD");
			var last = moment($scope.now).format("YYYY-MM-DD"); 
			ManageSdmNew.getListData("sdm/get-tindakan-by-user-id/"+satu+"/"+last).then(function(dat){
				$scope.patienGrids = dat.data.data;
			});	
			var awal  =  moment($scope.now).format("YYYY-MM-DD");
			var akhir = moment($scope.now).format("YYYY-MM-DD");
			ManageSdmNew.getListData("sdm/get-persen-uraian-kerja/"+awal+"/"+akhir).then(function(dat){
				$scope.sourceyes = dat.data.data;
			});
			$scope.search = function() {
				var awal  =  moment($scope.item.from).format("YYYY-MM-DD");
				var akhir = moment($scope.item.until).format("YYYY-MM-DD");
				ManageSdmNew.getListData("sdm/get-persen-uraian-kerja/"+awal+"/"+akhir).then(function(dat){
					$scope.sourceyes = dat.data.data;
				});	
			}
			$scope.cari = function() {
				var search={};
				search.goleti=function(){
					var awal  =  moment($scope.item.from).format("YYYY-MM-DD");
					var akhir = moment($scope.item.until).format("YYYY-MM-DD");
					ManageSdmNew.getListData("sdm/get-persen-uraian-kerja/"+awal+"/"+akhir).then(function(dat){
						$scope.sourceyes = dat.data.data;
					});	
				};
				search.find=function(){
					var awal  = moment($scope.now).format("YYYY-MM-DD");
					var akhir = moment($scope.now).format("YYYY-MM-DD");
					ManageSdmNew.getListData("sdm/get-tindakan-by-user-id/"+awal+"/"+akhir).then(function(dat){
						$scope.patienGrids = dat.data.data;
					});	
				};	
				search.goleti ();
				search.find ();
			}
			$scope.mencari = function() {
				var awal  =  moment($scope.tanggal).format("YYYY-MM-DD");
				// $scope.tanggal = moment($scope.item.waktu).format("YYYY-MM-DD");
				ManageSdmNew.getListData("sdm/get-uraian-kerja-dan-capaian/"+awal).then(function(dat){
					$scope.daftarBahanLinen = dat.data.data;
					//debugger;
					$scope.daftarBahanLinen2 = new kendo.data.DataSource({
						data: dat.data.data,
						schema: {
							model: {
								fields: {
									capaian: { type : "number", validation: { min: 0, required: false }},
									rincianKegiatan: {editable: false},
									target: {editable: false}
								}
							}
						},
						aggregate: 
						{ field: "capaian", aggregate: "sum" }
					});
				});	
			}
			///belum di rapihin :p
			$scope.mencariAwal = function(){
				var awal  = moment($scope.now).format("YYYY-MM-DD");
				ManageSdmNew.getListData("sdm/get-uraian-kerja-dan-capaian/"+awal).then(function(dat){
					$scope.daftarBahanLinen = dat.data.data;
					$scope.daftarBahanLinen2 = new kendo.data.DataSource({
						data: dat.data.data,
						schema: {
							model: {
								fields: {
										capaian: { type : "number", validation: { min: 0, required: false }},
										rincianKegiatan: {editable: false},
										target: {editable: false}
								}
							}
						},
						aggregate: 
						{ field: "capaian", aggregate: "sum" }
					});
				});	

			}
			$scope.mencariAwal();
			$scope.columnLaporanUjiHasil = [{
				"field": "rincianKegiatanId",
				"title": "Id",
				width:1,
				visible: false
			},
			{
				"field": "rincianKegiatan",
				"title": "Uraian Tugas",
				"width": "60%"
			},
			{
				"field": "target",
				"title": "Target per Bulan",
				"width": "20%"
			},
			{
				"field": "capaian",
				"title": "Capaian",
				"width": "20%",

			}];

			$scope.Save = function () {
				var detail = $scope.daftarBahanLinen2._data;
				var detailHV = [];
				//console.log(detail);
				// debugger;
				var data;
				for(var x = 0 ; x < detail.length;x++){
					//console.log(detail[x]);
					var tmpdat = {
						"rincianKegiatan": {"id":""	},
						"hasil":"",
						"periode":"",
						"total":"",
						"pegawai":{	"id":""	},
						"detailUraianTugas": [
						{
							"capaian": detail[x].capaian,
							"rincianKegiatan": {
								"id": detail[x].rincianKegiatanId
							},
							"pegawai": {
								"id": idPgw
							},
							"tanggal": $scope.tanggal
						}
						]
					}
					detailHV.push(tmpdat);
				}
				var data1 = {
					"uraianTugas": detailHV
				}
				ManageSdmNew.saveData(data1,"sdm/save-uraian-tugas-transaksi/").then(function (e) {
					console.log(JSON.stringify(data1));
				});
			};
		}
	])
});