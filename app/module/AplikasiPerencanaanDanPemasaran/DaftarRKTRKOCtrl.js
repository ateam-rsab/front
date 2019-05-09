define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarRKTRKOCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Daftar Rencana Kerja Tahunan(RKT) dan Rencana Kerja Operasional(RKO)";
			
			ModelItem.get("PerencanaanDanPemasaran/kamusIku").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.periodeTahun= new Date().getFullYear();
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
          		$scope.no=1;
          		// $scope.item.ruangan = ModelItem.ruangan(getRuangan).id;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			FindSarpras.getSarpras("user/get-user").then(function(dat){
				$scope.sourceUnit = dat.data.data.pegawai.ruangan.departemen;
				// debugger;
			});
			FindSarpras.getSarpras("rencana-kinerja-tahunan/find-all/").then(function(dat){
				var a = 1;
				var daftarRKT = [];
				var column= []
				var index = 0;
				dat.data.data.forEach(function(modelData){
					var listRKO = [];
					for(var i=0;i<4;i++){
						// debugger;
						var data = {
							"target" : "-",
							"realisasi": "-"
						}
						listRKO[i] = data;
					}
					var mainData = {
							"noRec": "-",
							"periode": "-",
							"pic":"-",
							"sasaranStrategis" : "-",
							"programKerjaStrategis": "-",
							"uraian": "-",
							"indikatorKinerja": "-",
							"satuanIndikator": "-",
							"rencanaKinerjaTahunan": "-",
							"no": a++
						}
						if(modelData.noRec != undefined)
							mainData.noRec=modelData.noRec;
						if(modelData.periode != undefined)
							mainData.periode=modelData.periode;
						if(modelData.pic != undefined)
							mainData.pic=modelData.pic;
						if(modelData.sasaranStrategis != undefined)
							mainData.sasaranStrategis=modelData.sasaranStrategis;
						if(modelData.programKerjaStrategis != undefined)
							mainData.programKerjaStrategis=modelData.programKerjaStrategis;
						if(modelData.uraian != undefined)
							mainData.uraian=modelData.uraian;
						if(modelData.indikatorKinerja != undefined)
							mainData.indikatorKinerja=modelData.indikatorKinerja;
						if(modelData.satuanIndikator != undefined)
							mainData.satuanIndikator=modelData.satuanIndikator;
						if(modelData.rencanaKinerjaTahunan != undefined)
							mainData.rencanaKinerjaTahunan=modelData.rencanaKinerjaTahunan;


					modelData.rko.forEach(function(e){
							var idx = e.triwulan-1;
						listRKO[idx].target = e.target;
						if(e.realisasi != undefined)
							listRKO[idx].realisasi = e.realisasi;
					});

					daftarRKT[index] = {
						"mainData" : mainData,
						"listRKO" : listRKO
					}
					index++;
				});
				$scope.source = daftarRKT;
				// debugger;
				$scope.sourceDaftarRKT = new kendo.data.DataSource({
					pageSize: 10,
					data:$scope.source
				});
			});				 

			$scope.columnDaftarRKTRKO = function(){

			var mainColumn =[
				{
					"field": "mainData.no",
					"title": "<h3 align=center>No</h3>",
					"width": "50px",
					"attributes": {align:"center"}
				},
				{
					"field": "mainData.periode",
					"title": "<h3 align=center>Periode</h3>",
					"width": "100px",
					"attributes": {align:"center"}
				},
				{
					"field": "mainData.pic.namaDepartemen",
					"title": "<h3 align=center>Unit Kerja</h3>",
					"width": "200px"
				},
				{
					"field": "mainData.sasaranStrategis.sasaranStrategis",
					"title": "<h3 align=center>Sasaran Strategis</h3>",
					"width": "400px"
				},
				{
					"field": "mainData.programKerjaStrategis.programKerjaStrategis",
					"title": "<h3 align=center>Program</h3>",
					"width": "400px"
				},
				{
					"field": "mainData.uraian",
					"title": "<h3 align=center>Urian</h3>",
					"width": "300px"
				},
				{
					"field": "mainData.indikatorKinerja",
					"title": "<h3 align=center>Indikator</h3>",
					"width": "300px"
				},
				{
					"field": "mainData.satuanIndikator.satuanIndikator",
					"title": "<h3 align=center>Satuan<br>Indikator</h3>",
					"width": "100px"
				},
				{
					"field": "mainData.rencanaKinerjaTahunan",
					"title": "<h3 align=center>Rencana Kinerja<br>Tahunan</h3>",
					"width": "150px",
					"attributes": {align:"center"}
				},
				{
					"title": "<h3 align=center>Rencana Kinerja Operasional</h3>",
					"width": "400px",
					columns:[
					]
				},
				{
					command: {text: "Edit", click: $scope.Realisasi},
					title: "&nbsp;",
					width: "70px"
				}
			];
			var column = [];
				for(var i=0;i<4;i++){
					var colNum = {
						"field": "listRKO["+i+"].target",
						"title": "<h3 align=center>Target TW "+(i+1)+" </h3>",
						"width": "120px",
						"attributes": {align:"center"}
					};
					column.push(colNum);
					colNum = {
						"field": "listRKO["+i+"].realisasi",
						"title": "<h3 align=center>Realisasi TW "+(i+1)+" </h3>",
						"width": "120px",
						"attributes": {align:"center"}
					};
					column.push(colNum);
				}
				mainColumn[9].columns= column; 
				return mainColumn;
				// debugger;
			}

			$scope.klik = function(r){
				console.log(JSON.stringify(r));
				$scope.current = r;
				// debugger;
			}
			
			$scope.Realisasi=function(){
				// debugger;
				$state.go('RKO', {
					noRec: $scope.current.mainData.noRec
				})
			}
			$scope.Batal = function(){
				$scope.item.periodeTahun = "";
				$scope.item.departemen = "";
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
			$scope.DaftarRKTRKO=function(){
				$state.go("DaftarRKTRKO")
			}
		}
	])
})