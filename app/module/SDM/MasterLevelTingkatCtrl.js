define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterLevelTingkatCtrl', ['$rootScope', '$scope',
		'ModelItem', '$state', 'InstitusiPendidikan', 'JenisSantunanService', 'ManageSdm',
		function ($rootScope, $scope, ModelItem, $state,
			InstitusiPendidikan, JenisSantunanService, ManageSdm) {

				$scope.item = {};
				$scope.now = new Date();
				$scope.dataVOloaded = true; 


            ManageSdm.getOrderList("service/list-generic/?view=LevelTingkat&select=id,levelTingkat,kdLevelTingkatHead", true).then(function(dat) {
                $scope.listLevelTingkat = dat.data;
            });
			

            ManageSdm.getOrderList("service/list-generic/?view=Departemen&select=id,namaDepartemen", true).then(function(dat) {
                $scope.listDepartemen = dat.data;
            });
			
			 initial();
            function initial(){

                ManageSdm.getOrderList("level-tingkat/get-all-level-tingkat", true).then(function(dat) {
                    $scope.gridMasterLevelTingkat = dat.data;
                });
                 $scope.item = {};
                  $scope.vals = false;
            }
			  $scope.columnGridMasterLevelTingkat ={
			  columns: [
				/*{
					"field": "no",
					"title": "Kode Profile",
					"width": "40%"
				},*/
				{
					"field": "kdLevelTingkat",
					"title": "Kode Level Tingkat",
					"width": "10%"
				},
				{
					"field": "levelTingkat",
					"title": "Level Tingkat",
					"width": "10%"
				},
				{
					"field": "reportDisplay",
					"title": "Report Display",
					"width": "10%"
				},
				{
					"field": "kdLevelTingkatHead",
					"title": "Kode Level Tingkat Head",
					"width": "10%"
				},
				{
					"field": "namaDepartemen",
					"title": "Departemen",
					"width": "15%"
				},
				{
					"field": "qLevelTingkat",
					"title": "Q Level Tingkat",
					"width": "10%"
				},
				{
					"field": "kodeExternal",
					"title": "Kode External",
					"width": "10%"
				},
				{
					"field": "namaExternal",
					"title": "Nama External",
					"width": "10%"
				},
				{
					"field": "statusEnabled",
					"title": "Status Aktif",
					"width": "10%"
				}
			]}; 
 
 
             $scope.klik = function(current) {
                $scope.item.dataFromGrid = current; 

                    $scope.item.kodeLevelTingkat = current.kdLevelTingkat;
                   $scope.item.namaLevelTingkat= current.levelTingkat;
                   $scope.item.reportDisplay= current.reportDisplay;
                  $scope.item.qLevelTingkat= current.qLevelTingkat;
                  $scope.item.kodeExternal= current.kodeExternal;
                  $scope.item.namaExternal= current.namaExternal;

                var x = 0; 
                for (x = 0; x < $scope.listDepartemen.length; x++) {
                    if ($scope.listDepartemen[x].id === current.departemenId) {
                        $scope.item.Departemen = $scope.listDepartemen[x];
                    }
                } 
                 $scope.item.levelTingkat = current.kdLevelTingkatHead;
               /* for (x = 0; x < $scope.listLevelTingkat.length; x++) {
                    if ($scope.listLevelTingkat[x].kdLevelTingkatHead === current.kdLevelTingkatHead) {
                        $scope.item.levelTingkat = $scope.listLevelTingkat[x];
                    }
                }*/
 
                if (current.statusEnabled === true) {
                    $scope.vals = true;
                } else {
                    $scope.vals = false;
                }

            };
            $scope.Cancel = function(){  
                initial();
            }
            $scope.Save = function () { 
                  debugger;
                if($scope.item.kodeLevelTingkat === undefined || $scope.item.namaLevelTingkat === undefined || 
                    $scope.item.Departemen  === undefined ){
                    toastr.warning("Lengkapi data");
                    return;
                }
                var id=null;;
                if ($scope.item.dataFromGrid !== undefined) {
                    id =  $scope.item.dataFromGrid.id;
                } 
                if ($scope.item.dataAktif === undefined) {
                    $scope.item.dataAktif = false;
                }
                var data = {
                    "id": id,
                    "kdProfile":0,
                    "kdLevelTingkat": $scope.item.kodeLevelTingkat,
                    "namaLevelTingkat": $scope.item.namaLevelTingkat,
                    "reportDisplay": $scope.item.reportDisplay,
                    "kdLevelTingkatHead": $scope.item.levelTingkat, 
                    "departemenId": $scope.item.Departemen.id,
                    "namaDepartemen": $scope.item.Departemen.namaDepartemen, 
                    "qlevelTingkat": $scope.item.qLevelTingkat,
                    "kodeExternal": $scope.item.kodeExternal,
                    "namaExternal": $scope.item.namaExternal,
                    "statusEnabled": $scope.item.dataAktif 
                };
  
                ManageSdm.saveJenisSantunan(ModelItem.beforePost(data), "level-tingkat/save-level-tingkat").then(function(e) {
                    initial();                 
                });
            };




		}
	]);
});