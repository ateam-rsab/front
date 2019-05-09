define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarKontrakKinerjaCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Daftar Kontrak Kinerja";
			ModelItem.get("PerencanaanDanPemasaran/DaftarAnalisaSwot").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.tahun= new Date($scope.now).getFullYear();
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			FindSarpras.getSarpras("service/list-generic/?view=Departemen&select=id,namaDepartemen").then(function(dat){
				$scope.sourceDepartemen= dat;
				// debugger;
			});	

			$scope.search = function(){
				var periode =  $scope.item.tahun;
				var departemen = $scope.item.departemen.id;
				var url = "unitKerjaId=" + departemen +  "&periode=" + periode;
				FindSarpras.getSarpras("kontrak-kinerja/find-all/?" + url).then(function(dat){
					$scope.source = dat.data.data;
					   // debugger;
					$scope.sourceDaftarKontrakKinerja = new kendo.data.DataSource({
	    				pageSize: 10,
	    				data:$scope.source
					});
				});
			};

			FindSarpras.getSarpras("kontrak-kinerja/find-all/").then(function(dat){
				$scope.source= dat.data.data;
				debugger;
				$scope.sourceDaftarKontrakKinerja = new kendo.data.DataSource({
    				pageSize: 10,
    				data:$scope.source
				});
				debugger;
			})
			$scope.mainGridOptions = {
                pageable: true,
                scrollable:true,
                columns: [{
                    "field": "unitKerja.namaDepartemen",
					"title": "<h3 align=center>Unit Kerja</h3>",
					"width": "200px"
				},
				{
					"field": "kamusIndikator.indikator.sasaranStrategis.sasaranStrategis",
					"title": "<h3 align=center>Sasaran Strategis</h3>",
					"width": "400px"
				},
				{
					"field": "kamusIndikator.indikator.indikator",
					"title": "<h3 align=center>Indikator</h3>",
					"width": "300px"
				},
				{
					"field": "peran.peran",
					"title": "<h3 align=center>Peran</h3>",
					"width": "100px",
					"attributes": {align:"center"}
				},
				{
					"field": "tahun",
					"title": "<h3 align=center>Tahun</h3>",
					"width": "100px",
					"attributes": {align:"center"}
				},
				{
					"field": "pencapaian",
					"title": "<h3 align=center>Pencapaian</h3>",
					"width": "100px",
					"attributes": {align:"center"}
				},
				{
					"field": "kamusIndikator.satuanIndikator.satuanIndikator",
					"title": "<h3 align=center>Satuan Indikator</h3>",
					"width": "150px",
					"attributes": {align:"center"}
				},
				{
					"field": "bobot",
					"title": "<h3 align=center>Bobot</h3>",
					"width": "100px",
					"attributes": {align:"center"}
				},
				{
					"field": "program",
					"title": "<h3 align=center>Program</h3>",
					"width": "300px"
		        }]
            };
			// });	

			// $scope.columnDataKontrakKinerja = [
			// 	{
			// 		"field": "unitKerja.namaDepartemen",
			// 		"title": "<h3 align=center>Unit Kerja</h3>",
			// 		"width": "200px"
			// 	},
			// 	{
			// 		"field": "kamusIndikator.indikator.sasaranStrategis.sasaranStrategis",
			// 		"title": "<h3 align=center>Sasaran Strategis</h3>",
			// 		"width": "400px"
			// 	},
			// 	{
			// 		"field": "kamusIndikator.indikator.indikator",
			// 		"title": "<h3 align=center>Indikator</h3>",
			// 		"width": "300px"
			// 	},
			// 	{
			// 		"field": "peran.peran",
			// 		"title": "<h3 align=center>Peran</h3>",
			// 		"width": "100px"
			// 	},
			// 	{
			// 		"field": "tahun",
			// 		"title": "<h3 align=center>Tahun</h3>",
			// 		"width": "100px"
			// 	},
			// 	{
			// 		"field": "pencapaian",
			// 		"title": "<h3 align=center>Pencapaian</h3>",
			// 		"width": "100px"
			// 	},
			// 	{
			// 		"field": "kamusIndikator.satuanIndikator.satuanIndikator",
			// 		"title": "<h3 align=center>Satuan Indikator</h3>",
			// 		"width": "200px"
			// 	},
			// 	{
			// 		"field": "bobot",
			// 		"title": "<h3 align=center>Bobot</h3>",
			// 		"width": "100px"
			// 	},
			// 	{
			// 		"field": "program",
			// 		"title": "<h3 align=center>Program</h3>",
			// 		"width": "300px"
			// 	}
			// ];

			$scope.klik = function(r){
				console.log(JSON.stringify(r));
				$scope.current = r;
			}

			$scope.navToDistribusiSurat = function(current){
				$state.go("DistribusiKirimSuratMasukdariExternalKirimSurat", {
					noRec: $scope.current
				})
			}
	}])
})