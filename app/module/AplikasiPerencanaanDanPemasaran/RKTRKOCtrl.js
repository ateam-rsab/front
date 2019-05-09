define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('RKTRKOCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Rencana Kerja Tahunan(RKT) dan Rencana Kerja Operasional(RKO)";
			
			ModelItem.get("PerencanaanDanPemasaran/kamusIku").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.periodeTahun= new Date($scope.now).getFullYear();
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
          		$scope.no=1;
          		// $scope.item.ruangan = ModelItem.ruangan(getRuangan).id;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.dataRKTRKO = new kendo.data.DataSource({
				data: []
			});	
			$scope.columnDataRKTRKO = [
				{
					"field": "no",
					"title": "<h3 align=center>No</h3>",
					"width": "50px",
					"attributes": {align:"center"}
				},
				{
					"field": "periode",
					"title": "<h3 align=center>Periode</h3>",
					"width": "100px",
					"attributes": {align:"center"}
				},
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
					"field": "programKerjaStrategis.programKerjaStrategis",
					"title": "<h3 align=center>Program</h3>",
					"width": "400px"
				},
				{
					"field": "uraian",
					"title": "<h3 align=center>Urian</h3>",
					"width": "300px"
				},
				{
					"field": "indikator",
					"title": "<h3 align=center>Indikator</h3>",
					"width": "300px"
				},
				{
					"field": "satuanIndikator.satuanIndikator",
					"title": "<h3 align=center>Satuan<br>Indikator</h3>",
					"width": "100px"
				},
				{
					"field": "rkt",
					"title": "<h3 align=center>RKT</h3>",
					"width": "80px",
					"attributes": {align:"center"}
				},
				{
					"field": "rkoI",
					"title": "<h3 align=center>Target<br>RKO TW I</h3>",
					"width": "100px",
					"attributes": {align:"center"}
				},
				{
					"field": "rkoII",
					"title": "<h3 align=center>Target<br>RKO TW I</h3>",
					"width": "100px",
					"attributes": {align:"center"}
				},
				{
					"field": "rkoIII",
					"title": "<h3 align=center>Target<br>RKO TW III</h3>",
					"width": "100px",
					"attributes": {align:"center"}
				},
				{
					"field": "rkoIV",
					"title": "<h3 align=center>Target<br>RKO TW IV</h3>",
					"width": "100px",
					"attributes": {align:"center"}
				},
				{
					command: ["destroy"],
					width: "100px"
				}

			];

			$scope.addData = function() {

				var tempData = {
					"no": $scope.no++,
					"periode" : $scope.item.periodeTahun,
					"unitKerja" : $scope.item.departemen,
					"sasaranStrategis" : $scope.item.sasaranStrategis,
					"programKerjaStrategis" : $scope.item.programKerjaStrategis,
					"uraian" : $scope.item.uraian,
					"indikator" : $scope.item.indikator,
					"satuanIndikator" : $scope.item.satuanIndikator,
					"rkt" : $scope.item.rkt,
					"rkoI" : $scope.item.target1,
					"rkoII" : $scope.item.target2,
					"rkoIII" : $scope.item.target3,
					"rkoIV" : $scope.item.target4
				}
				// debugger;
				$scope.dataRKTRKO.add(tempData);
				$scope.Batal();
			}
			
			FindSarpras.getSarpras("service/list-generic/?view=SasaranStrategis&select=id,sasaranStrategis").then(function(dat){
				$scope.sourcedaftarSasaranStrategiss= dat;
				// debugger;
			});
			FindSarpras.getSarpras("service/list-generic/?view=MasterProgramKerjaStrategis&select=id,programKerjaStrategis").then(function(dat){
				$scope.sourceMasterProgramKerjaStrategis= dat.data;
				// debugger;
			});
			FindSarpras.getSarpras("service/list-generic/?view=SatuanIndikator&select=id,satuanIndikator").then(function(dat){
				$scope.sourceSatuanIndikator= dat;
				// debugger;
			});
			FindSarpras.getSarpras("user/get-user").then(function(dat){
				$scope.item.departemen = dat.data.data.pegawai.ruangan.departemen;
				// debugger;
			});
			
			$scope.Batal = function(){
				$scope.item.sasaranStrategis = "";
				$scope.item.indikator = "";
				$scope.item.rkt = "";	
				$scope.item.satuanIndikator = "";	
				$scope.item.uraian = "";
				$scope.item.programKerjaStrategis = "";
				$scope.item.target1 = "";
				$scope.item.target2 = "";
				$scope.item.target3 = "";
				$scope.item.target4 = "";
			}
			$scope.Save = function(){
				var dat = $scope.dataRKTRKO._data;
				console.log(JSON.stringify(dat));
				var i=0;
				var RKTRKO = [];
				dat.forEach(function(data){
					var data ={ 
				      "uraian": data.uraian, 
				      "sasaranStrategis": { 
				        "id": data.sasaranStrategis.id
				      }, 
				      "rencanaKinerjaTahunan": data.rkt, 
				      "indikatorKinerja": data.indikator, 
				      "pic": { 
				        "id": data.unitKerja.id
				      }, 
				      "satuanIndikator": { 
				        "id": data.satuanIndikator.id
				      }, 
				      "programKerjaStrategis": { 
				        "id": data.programKerjaStrategis.id
				      }, 
				      "periode" : data.periode,
				      "rko" : [
				        {
				            "target" : data.rkoI,
				            "triwulan": 1
				        },
				        {
				            "target" : data.rkoII,
				            "triwulan": 2
				        },
				        {
				            "target" : data.rkoIII,
				            "triwulan": 3
				        },
				        {
				            "target" : data.rkoIV,
				            "triwulan": 4
				        }
				      ]

				    }
					RKTRKO[i] =data;
					i++;
				})
            	// debugger;
            	console.log(JSON.stringify(RKTRKO));
				ManageSarpras.saveSarpras(RKTRKO,"rencana-kinerja-tahunan/save/").then(function(e) {
            		// $scope.item.noMesin="",
            		// $scope.item.jenisLinen="",
            		// $scope.item.kapasitas="",
            		// $scope.daftarBahanLinen._data=""
				});
				$scope.Batal();
			};
			$scope.DaftarRKTRKO=function(){
				$state.go('DaftarRKTRKO')
			}
		}
	])
})