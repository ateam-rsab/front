define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('KontrakKinerjaCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Kontrak Kinerja";
			
			ModelItem.get("PerencanaanDanPemasaran/kamusIku").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.tahun= new Date($scope.now).getFullYear();
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
          		// $scope.item.ruangan = ModelItem.ruangan(getRuangan).id;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.dataKontrakKinerja = new kendo.data.DataSource({
				data: [
				],
				schema: {
					model: {
						fields: {
							bobotIndikator: { type: "number", validation: { required: true, min: 0, max: 100 } },

						}
					}
				},
				aggregate: [
					{ field: "bobotIndikator", aggregate: "sum" }

				]
			});	
			$scope.columnDataKontrakKinerja = [
				{
					"field": "unitKerja.namaDepartemen",
					"title": "<h3 align=center>Unit Kerja</h3>",
					"width": "200px"
				},
				{
					"field": "sasaranStrategis.sasaranStrategis",
					"title": "<h3 align=center>Sasaran Strategis</h3>",
					"width": "400px"
				},
				{
					"field": "indikator.indikator.indikator",
					"title": "<h3 align=center>Indikator</h3>",
					"width": "300px"
				},
				{
					"field": "peran.peran",
					"title": "<h3 align=center>Peran</h3>",
					"width": "100px"
				},
				{
					"field": "tahun",
					"title": "<h3 align=center>Tahun</h3>",
					"width": "70px"
				},
				{
					"field": "pencapaian",
					"title": "<h3 align=center>Pencapaian</h3>",
					"width": "80px"
				},
				{
					"field": "satuanIndikator",
					"title": "<h3 align=center>Satuan<br>Indikator</h3>",
					"width": "100px",
					footerTemplate: "Total:"
				},
				{
					"field": "bobotIndikator.bobotIndikator",
					"title": "<h3 align=center>Bobot</h3>",
					"width": "80px",
					attributes: { align: "center" },
					footerTemplate: "<center>#= sum #</center>"
				},
				{
					"field": "programKerjaStrategis",
					"title": "<h3 align=center>Program Kerja<br>Strategis</h3>",
					"width": "200px"
				}
			];

			$scope.addData = function() {

				var tempData = {
					"unitKerja" : $scope.item.departemen,
					"sasaranStrategis" : $scope.item.sasaranStrategis,
					"indikator" : $scope.item.indikator,
					"peran" : $scope.item.peran,
					"tahun" : $scope.item.tahun,
					"pencapaian" : $scope.item.pencapaian,
					"satuanIndikator" : $scope.item.indikator.satuanIndikator.satuanIndikator,
					"bobotIndikator" : $scope.item.bobot,
					"programKerjaStrategis" : $scope.item.programKerjaStrategis
				}
				// debugger;
				$scope.dataKontrakKinerja.add(tempData);

				$scope.item.sasaranStrategis = "";
				$scope.item.indikator = "";
				$scope.item.peran = "";	
				$scope.item.pencapaian = "";
				$scope.item.satuanIndikator = "";	
				$scope.item.bobot = "";
				$scope.item.programKerjaStrategis = "";
			}
			// FindSarpras.getMasterSasaranStrategis("service/list-generic/?view=SasaranStrategis&select=id,sasaranStrategis").then(function(dat){
			// 	$scope.sourceMasterSasaranStrategis= dat;
			// 	// debugger;
			// });
			FindSarpras.getSarpras("service/list-generic/?view=SasaranStrategis&select=id,sasaranStrategis").then(function(dat){
				$scope.sourceMasterSasaranStrategis= dat;
				// debugger;
			});
			// $scope.indikatorIKU= function(){
			// 	var a = $scope.item.sasaranStrategis.id;
			// 	var url = "sasaranStrategisId=" + a;
			// 	FindSarpras.getSarpras("kamus-iku/find-all/?"+ url).then(function(dat){
			// 		$scope.sourceMasterIndikator= dat.data.data;
			// 		// debugger;
			// 	});
			// }
			$scope.getSatuan = function(){
				$scope.item.satuanIndikator = $scope.item.indikator.satuanIndikator.satuanIndikator;
			}
			
			// FindSarpras.getMasterIndikator("service/list-generic/?view=IndikatorKinerjaUtama&select=id,indikatorKinerjaUtama").then(function(dat){
			// 	$scope.sourceMasterIndikator= dat;
			// 	// debugger;
			// });
			FindSarpras.getSarpras("service/list-generic/?view=Peran&select=id,peran").then(function(dat){
				$scope.sourceMasterPeran= dat;
				// debugger;
			});
			FindSarpras.getSarpras("service/list-generic/?view=SatuanIndikator&select=id,satuanIndikator").then(function(dat){
				$scope.sourceMasterSatuanIndikator= dat;
				// debugger;
			});
			FindSarpras.getSarpras("service/list-generic/?view=MasterProgramKerjaStrategis&select=id,programKerjaStrategis").then(function(dat){
				$scope.sourceMasterProgramKerjaStrategis= dat;
				// debugger;
			});
			FindSarpras.getSarpras("user/get-user").then(function(dat){
				$scope.item.departemen = dat.data.data.pegawai.ruangan.departemen;
				// debugger;
			});
			FindSarpras.getSarpras("service/list-generic/?view=BobotIndikator&select=id,bobotIndikator").then(function(dat){
				$scope.sourceMasterBobot= dat;
				// debugger;
			});
			$scope.getSarpras=function(){
				var ID2 = $scope.item.sasaranStrategis.id;
				var url2 = "sasaranStrategisId=" + ID2;
				// debugger;
				FindSarpras.getSarpras("kamus-indikator/find-all/?"+url2).then(function(dat){
					$scope.sourceMasterIndikator= dat.data.data;
				// debugger;
				});
			}
			$scope.Batal = function(){
				$scope.item.peran = "";
				$scope.item.programKerjaStrategis = "";
				$scope.item.satuanIndikator = "";
				$scope.item.sasaranStrategis = "";
				$scope.item.indikator = "";
				$scope.item.target = "";
				$scope.item.bobot = "";
			}
			$scope.Save = function(){
				var dat = $scope.dataKontrakKinerja._data;
				console.log(JSON.stringify(dat));
				var i=0;
				var kontrakKinerja = [];
				dat.forEach(function(data){
					var data ={
						"unitKerja":{
							"id": data.unitKerja.id
						},
	            		"tahun":  data.tahun,
	            		"peran": {
	            			"id": data.peran.id
	            		},
	            		"program": data.programKerjaStrategis,
						"bobot": data.bobotIndikator.bobotIndikator,
						"pencapaian": data.pencapaian,
	            		"kamusIndikator":{
	            			"id": data.indikator.id
	            		}
					}
					kontrakKinerja[i] =data;
					i++;
				})
            	// debugger;
            	console.log(JSON.stringify(kontrakKinerja));
				ManageSarpras.saveSarpras(kontrakKinerja,"kontrak-kinerja/save/").then(function(e) {
            		// $scope.item.noMesin="",
            		// $scope.item.jenisLinen="",
            		// $scope.item.kapasitas="",
            		// $scope.daftarBahanLinen._data=""
				});
				$scope.Batal();
			};
			$scope.Daftar=function(){
				$state.go('DaftarKontrakKinerja')
			}
		}
	])
})