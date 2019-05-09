define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('RKOCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
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
			
			FindSarpras.getSarpras("rencana-kinerja-tahunan/find-all/?noRec=" + $state.params.noRec).then(function(dat){
				$scope.item.periode = dat.data.data[0].periode;
				$scope.item.unitKerja = dat.data.data[0].pic.namaDepartemen;
				$scope.item.sasaranStrategis = dat.data.data[0].sasaranStrategis.sasaranStrategis;
				$scope.item.program = dat.data.data[0].programKerjaStrategis.programKerjaStrategis;
				$scope.item.indikator = dat.data.data[0].indikatorKinerja;
				$scope.item.uraian = dat.data.data[0].uraian;
				$scope.item.satuanIndikator = dat.data.data[0].satuanIndikator.satuanIndikator;
				$scope.item.rkt = dat.data.data[0].rencanaKinerjaTahunan;
				$scope.item.target1 = dat.data.data[0].rko[0];
				$scope.item.realisasi1 = dat.data.data[0].rko[0];
				$scope.item.target2 = dat.data.data[0].rko[1];
				$scope.item.realisasi2 = dat.data.data[0].rko[1];
				$scope.item.target3 = dat.data.data[0].rko[2];
				$scope.item.realisasi3 = dat.data.data[0].rko[2];
				$scope.item.target4 = dat.data.data[0].rko[3];
				$scope.item.realisasi4 = dat.data.data[0].rko[3];
				// debugger;
			});
			$scope.Save = function(){
				var data =[{
			      		"noRec": $scope.item.target1.noRec,
			            "realisasi" : $scope.item.realisasi1.realisasi
			        },
			        {
			        	"noRec": $scope.item.target2.noRec,
			            "realisasi" : $scope.item.realisasi2.realisasi
			        },
			        {
			        	"noRec": $scope.item.target3.noRec,
			            "realisasi" : $scope.item.realisasi3.realisasi
			        },
			        {
			        	"noRec": $scope.item.target4.noRec,
			            "realisasi" : $scope.item.realisasi4.realisasi
			        }
			        ]
            	// debugger;
            	console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(data,"rencana-kinerja-tahunan/update-rko/").then(function(e) {
            		// $scope.item.noMesin="",
            		// $scope.item.jenisLinen="",
            		// $scope.item.kapasitas="",
            		// $scope.daftarBahanLinen._data=""
				});
				$scope.DaftarRKTRKO();
			};
			$scope.DaftarRKTRKO=function(){
				$state.go('DaftarRKTRKO')
			}
			$scope.Batal=function(){
				$state.go('DaftarRKTRKO')
			}
		}
	])
})