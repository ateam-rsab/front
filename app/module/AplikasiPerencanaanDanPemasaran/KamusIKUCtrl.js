define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('KamusIKUCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Kamus Indikator";
			$scope.titled = "Daftar Kamus Indikator";
			
			ModelItem.get("PerencanaanDanPemasaran/kamusIku").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.awal= new Date($scope.now).getFullYear();
				$scope.item.akhir= $scope.item.awal+4
				$scope.perspektif1 = true;
				$scope.perspektif2 = true;
				$scope.sasaranStrategis1 = true;
				$scope.sasaranStrategis2 = true;
				$scope.bobotIKU1 = true;
				$scope.bobotIKU2 = true;
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.Tampilan=function(){
				console.log($scope.item.jenisIndikator);
				if ($scope.item.jenisIndikator.jenisIndikator == "IKU"){
					$scope.perspektif1 = true;
					$scope.perspektif2 = true;
					$scope.sasaranStrategis1 = true;
					$scope.sasaranStrategis2 = true;
					$scope.bobotIKU1 = true;
					$scope.bobotIKU2 = true;
				}else{
					$scope.perspektif1 = false;
					$scope.perspektif2 = false;
					$scope.sasaranStrategis1 = false;
					$scope.sasaranStrategis2 = false;
					$scope.bobotIKU1 = false;
					$scope.bobotIKU2 = false;
				}
			}
			
			$scope.tahun = function(){
				$scope.item.awal= $scope.item.awal.getFullYear();
				$scope.item.akhir= $scope.item.awal+4;
			}
			// FindSarpras.getMasterPerspektif("service/list-generic/?view=Perspektif&select=id,perspektif").then(function(dat){
			// 	$scope.sourceMasterPerspektif= dat;
			// 	// debugger;
			// });	
			// FindSarpras.getMasterSasaranStrategis("service/list-generic/?view=SasaranStrategis&select=id,sasaranStrategis").then(function(dat){
			// 	$scope.sourceMasterSasaranStrategis= dat;
			// 	// debugger;
			// });
			FindSarpras.getSarpras("service/list-generic/?view=JenisIndikator&select=id,jenisIndikator").then(function(dat){
				$scope.sourceJenisIndikator= dat;
				// debugger;
			});
			$scope.select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.jenisDiagramTows=data.tows,
				$scope.item.input=data.input
				// debugger;
			};
			$scope.getPerspektif = function(){
				var ID2 = $scope.item.jenisIndikator.id;
				var url2 = "jenisIndikatorId=" + ID2;
				// debugger;
				FindSarpras.getSarpras("perspektif/find-all/?"+url2).then(function(dat){
					$scope.sourceMasterPerspektif= dat.data.data;
				// debugger;
				});
			}

			$scope.getMasterSasaranStrategis=function(){
				var ID2 = $scope.item.perspektif.id;
				var url2 = "perspektifId=" + ID2;
				// debugger;
				FindSarpras.getSarpras("sasaran-strategis/find-all/?"+url2).then(function(dat){
					$scope.sourceMasterSasaranStrategis= dat.data.data;
				// debugger;
				});
			}

			$scope.getMasterIndikator=function(){
				var ID2 = $scope.item.sasaranStrategis.id;
				var url2 = "sasaranStrategisId=" + ID2;
				// debugger;
				FindSarpras.getSarpras("indikator-rensar/find-all/?"+url2).then(function(dat){
					$scope.sourceMasterIndikator= dat.data.data;
				debugger;
				});
			}
			FindSarpras.getSarpras("service/list-generic/?view=SatuanIndikator&select=id,satuanIndikator").then(function(dat){
				$scope.sourceSatuanIndikator= dat;
				// debugger;
			});
			// FindSarpras.getMasterIndikator("service/list-generic/?view=IndikatorKinerjaUtama&select=id,indikatorKinerjaUtama").then(function(dat){
			// 	$scope.sourceMasterIndikator= dat;
			// 	// debugger;
			// });
			// $scope.CariDO = function(){
			// 	var indikatorId = $scope.item.indikatorKinerjaUtama.id;
			// 	var url = "indikatorId=" + indikatorId;
			// 		FindSarpras.getMasterDefinisiOperasional("mapping-do/find-all/?" +url).then(function(dat){
			// 			$scope.sourceMasterDefinisi= dat.data.data;
			// 			// debugger;
			// 		});
			// }
			// $scope.CariFormula = function(){
			// 	$scope.item.formula = $scope.item.definisiOperasional.formula.formula;
			// }
			// FindSarpras.getMasterFormula("mapping-do/find-all/").then(function(dat){
			// 	$scope.item.formula= dat.formula;
			// 	// debugger;
			// });
			FindSarpras.getSarpras("service/list-generic/?view=BobotIndikator&select=id,bobotIndikator").then(function(dat){
				$scope.sourceMasterBobotIku= dat.data;
				// debugger;
			});
			// FindSarpras.getPersonInCharge("mapping-DO/find-all/").then(function(dat){
			// 	$scope.sourcePersonInCharge= dat.data;
			// 	// debugger;
			// });
			FindSarpras.getSarpras("service/list-generic/?view=Departemen&select=id,namaDepartemen").then(function(dat){
				$scope.sourceDepartemen= dat;
				// debugger;
			});
			FindSarpras.getSarpras("service/list-generic/?view=SatuanKerja&select=id,satuanKerja").then(function(dat){
				$scope.sourceSatuanKerja= dat;
				// debugger;
			});	
			FindSarpras.getSarpras("service/list-generic/?view=PeriodePelaporan&select=id,periodePelaporan").then(function(dat){
				$scope.sourceMasterPeriodePelaporan= dat;
				// debugger;
			});
			
			$scope.tahun = function(){
				$scope.item.awal= $scope.item.awal.getFullYear();
				$scope.item.akhir= $scope.item.awal+4;
			}
			$scope.Save = function(){
				var data ={
					"indikator": {
						"id": $scope.item.indikator.id
					},
					"pic": {
						"id": $scope.item.personInchange.id
					},
					"bobotIndikator": {
						"id": $scope.item.bobotIndikator.id
					},
					"satuanIndikator":{
						"id": $scope.item.satuanIndikator.id
					},
					"sumberData": $scope.item.sumberData,
					"periodePelaporan": {
						"id": $scope.item.periodePelaporan.id
					},
        			"awalPeriode": $scope.item.awal,
        			"akhirPeriode": $scope.item.akhir
				}
            	// debugger;
            	console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(data,"kamus-indikator/save/").then(function(e) {
            		$scope.item = {};
            		FindSarpras.getSarpras("kamus-indikator/find-all/").then(function(dat){
						 var data = []
						 var i = 1
						 dat.data.data.forEach(function(e){
						 	var kamusIKU = {
						 		"id": e.id,
						 		"indikator": e.indikator,
								// "mappingDO": e.definisiOperasional,
								// "perspektif": e.perspektif,
								// "pic": e.personInchange,
								"sasaranStrategis": e.indikator.sasaranStrategis.sasaranStrategis,
								"bobotIndikator": e.bobotIndikator.bobotIndikator,
								// "sumberData": e.sumberData,
								"periodePelaporan": e.periodePelaporan,
			        			"awalPeriode": e.awalPeriode,
			        			"akhirPeriode": e.akhirPeriode,
						 		"no":i
						 	}
					 	data[i-1]=kamusIKU
					 	i++;
						});
						$scope.sourceDaftarKamusIKU = data;
						// debugger;
					});
            		// $scope.item.noMesin="",
            		// $scope.item.jenisLinen="",
            		// $scope.item.kapasitas="",
            		// $scope.daftarBahanLinen._data=""
				});
			};
			//Daftar KAMUS IKU
			FindSarpras.getSarpras("kamus-indikator/find-all/").then(function(dat){
				 var data = []
				 var i = 1
				 dat.data.data.forEach(function(e){
				 	var kamusIKU = {
				 		"id": e.id,
				 		"indikator": e.indikator,
						// "mappingDO": e.definisiOperasional,
						// "perspektif": e.perspektif,
						// "pic": e.personInchange,
						"sasaranStrategis": e.sasaranStrategis,
						"bobotIndikator": e.bobotIndikator,
						// "sumberData": e.sumberData,
						"periodePelaporan": e.periodePelaporan,
	        			"awalPeriode": e.awalPeriode,
	        			"akhirPeriode": e.akhirPeriode,
				 		"no":i
				 	}
			 	data[i-1]=kamusIKU
			 	i++;
				});
				$scope.source = data;
				// debugger;
				$scope.sourceDaftarKamusIKU = new kendo.data.DataSource({
    				pageSize: 10,
    				data:$scope.source
				});
				// debugger;
			})
			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
                	"field": "no",
					"title": "<h3 align=center>No<h3>",
					"width": "30px",
					"attributes": { align: "center" }
				}, {
					"field": "indikator.sasaranStrategis.sasaranStrategis",
					"title": "<h3 align=center>Sasaran Strategis</h3>",
					"width": "200px"
				}, {
					"field": "indikator.indikator",
					"title": "<h3 align=center>Indikator Kinerja Utama</h3>",
					"width": "300px"
				}, {
					"field": "bobotIndikator.bobotIndikator",
					"title": "<h3 align=center>Bobot (%)<h3>",
					"width": "70px",
					"attributes": { align: "center" }
				// }, {
				// 	"field": "satuan",
				// 	"title": "<h3 align=center>Satuan<h3>",
				// 	"width": "100px"
				}, {
					"field": "periodePelaporan.periodePelaporan",
					"title": "<h3 align=center>Periode<br>Pelaporan<h3>",
					"width": "100px",
					"attributes": { align: "center" }
		            }]
	            };
			// });

			// // $scope.daftarKamusIKU  = new kendo.data.DataSource({
			// // 	data: []
			// // });
			// $scope.columndaftarKamusIKU = [
			// {
			// 	"field": "no",
			// 	"title": "<h3 align=center>No<h3>",
			// 	"width": "30px",
			// 	"attributes": { align: "center" }
			// }, {
			// 	"field": "indikator.sasaranStrategis.sasaranStrategis",
			// 	"title": "<h3 align=center>Sasaran Strategis</h3>",
			// 	"width": "200px"
			// }, {
			// 	"field": "indikator.indikator",
			// 	"title": "<h3 align=center>Indikator Kinerja Utama</h3>",
			// 	"width": "300px"
			// }, {
			// 	"field": "bobotIndikator.bobotIndikator",
			// 	"title": "<h3 align=center>Bobot (%)<h3>",
			// 	"width": "70px",
			// 	"attributes": { align: "center" }
			// // }, {
			// // 	"field": "satuan",
			// // 	"title": "<h3 align=center>Satuan<h3>",
			// // 	"width": "100px"
			// }, {
			// 	"field": "periodePelaporan.periodePelaporan",
			// 	"title": "<h3 align=center>Periode<br>Pelaporan<h3>",
			// 	"width": "100px",
			// 	"attributes": { align: "center" }
			// }];
			$scope.klik = function(r){
				console.log(JSON.stringify(r));
				$scope.current = r;
				// debugger;
			}

			$scope.navToDetailKamusIKU = function(current){
				$state.go("DetailKamusIKU", {
					id: $scope.current.id,
					awalPeriode : $scope.current.awalPeriode,
					akhirPeriode : $scope.current.akhirPeriode
				})
			}
			$scope.navToMatriksIKU = function(current){
				$state.go("MatriksIKU", {
					id: $scope.current.id,
					awalPeriode : $scope.current.awalPeriode,
					akhirPeriode : $scope.current.akhirPeriode
				})
			}
	}])
})