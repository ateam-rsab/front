define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PekerjaanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService','ManageSarpras','$state',
 	function($q, $rootScope, $scope,IPSRSService,ManageSarpras,$state) {
 		$scope.item = {};
		 $scope.dataVOloaded = true;
		 $scope.now = new Date();
		 
			 var init = function () {
			  var nomor = 1; 
			  IPSRSService.getItem("pekerjaan/get-pekerjaan", true).then(function(dat){
				$scope.listDataMaster = dat.data.data;
				for(var i=0; i<$scope.listDataMaster.length; i++){
					$scope.listDataMaster[i].no = nomor++
				}                             					
					$scope.dataSource = new kendo.data.DataSource({
					pageSize: 10,
					data: $scope.listDataMaster,
					autoSync: true
					});
			   });
			 }
	         init();

	         $scope.batal = function(){
	         	$state.go('home');
	         }

		     $scope.columnPekerjaan = [
				{
					"field": "no",
					"title": "<h3 align=center>No<h3>"
				},
				// {
				// 	"field": "kdPekerjaan",
				// 	"title": "<h3 align=center>Kode Pekerjaan<h3>"
				// },
				{
					"field": "pekerjaan",
					"title": "<h3 align=center>Pekerjaan<h3>"
				},
				// {
				// 	"field": "qPekerjaan",
				// 	"title": "<h3 align=center>Q Pekerjaan<h3>"
				// },
				{
					"field": "reportDisplay",
					"title": "<h3 align=center>Report Display<h3>"
				},
				{
					"field": "kodeExternal",
					"title": "<h3 align=center>Kode External<h3>"
				},
				{
					"field": "namaExternal",
					"title": "<h3 align=center>Nama External<h3>"
				},
				// {
				// 	"field": "statusEnabled",
				// 	"title": "<h3 align=center>Status Enabled<h3>"
				// },
				{
					"title" : "<h3 align=center>Action<h3>",
					"width" : "70px",
					"template" : "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
				}
			];




			$scope.mainGridOptions = { 
				 pageable: true,
				 columns: $scope.columnPekerjaan,
				 editable: "popup",
				 selectable: "row",
				 scrollable: false
			 };
		

		    ////fungsi klik untuk edit
		     $scope.klik = function(current){
		     	debugger
		     	toastr.info("Mode Edit Aktif");
				$scope.showEdit = true;
				$scope.current = current;
				$scope.id = current.id
				$scope.item.kdPekerjaan = current.kdPekerjaan;
				$scope.item.pekerjaan = current.pekerjaan;
				$scope.item.qPekerjaan = current.qPekerjaan;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
			 };


			$scope.disableData=function(){
			 IPSRSService.getClassMaster("delete-master-table?className=Pekerjaan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
			 	init();
			 });
			 };

			$scope.enableData=function(){
			 IPSRSService.getClassMaster("delete-master-table?className=Pekerjaan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
			 	init();
 			 });
			};


			$scope.disableData= function(){
				var DataAll = this.dataItem;
				var data = { 
					"id" : DataAll.id,
					"pekerjaan": DataAll.pekerjaan,
					"reportDisplay": DataAll.reportDisplay,
					"kodeExternal": DataAll.kodeExternal,
					"namaExternal": DataAll.namaExternal,
					"statusEnabled" : false
				}
			    ManageSarpras.saveDataUji(data, "pekerjaan/save-pekerjaan").then(function (e) {
	            init();
	           $scope.item = {};
	           $scope.ModeEdit == false
			   });
			
		     }

		     $scope.Baru = function(){
		     	$scope.id = undefined;
		     	$scope.item = {};
		     	toastr.info("Mode : Baru Aktif");
		     }

		   	 $scope.Save = function(){
			 var data = {
			 	    "id" : $scope.id,
			 	    "kdPekerjaan" : $scope.item.kdPekerjaan,
					"pekerjaan":$scope.item.pekerjaan,
					"reportDisplay":$scope.item.reportDisplay,
					"kodeExternal":$scope.item.kodeExternal,
					"namaExternal":$scope.item.namaExternal,
					"qPekerjaan":$scope.item.qPekerjaan,
					"statusEnabled" : true
			  }

			 ManageSarpras.saveDataUji(data, "pekerjaan/save-pekerjaan").then(function (e) {
	         init();
	         $scope.item = {};
	         $scope.ModeEdit == false
			 });
			}


			 $scope.edit = function(){	
			   var data = {
							"class": "Pekerjaan",
								"listField": {
											"kdPekerjaan": $scope.item.kdPekerjaan,
											"pekerjaan": $scope.item.pekerjaan,
											"qPekerjaan": $scope.item.qPekerjaan,
											"id": $scope.item.id,
											"noRec": $scope.item.noRec,
											"reportDisplay": $scope.item.reportDisplay,
											"kodeExternal": $scope.item.kodeExternal,
											"namaExternal": $scope.item.namaExternal,
											"statusEnabled": $scope.item.statusEnabled
											 }
			   }
			IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
				init();
				});
				}

				}
			]);
	});




//=====================================================SOURCE OLD DATA==============================


			// $scope.tambah = function(){
			//  var data = {
			// 	"class": "Pekerjaan",
			// 	"listField": {
			// 					"kdPekerjaan": $scope.item.kdPekerjaan,
			// 					"pekerjaan": $scope.item.pekerjaan,
			// 					"qPekerjaan": $scope.item.qPekerjaan,
			// 					"id": $scope.item.id,
			// 					"reportDisplay": $scope.item.reportDisplay,
			// 					"kodeExternal": $scope.item.kodeExternal,
			// 					"namaExternal": $scope.item.namaExternal
			// 					}
			// 	}
			// 	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
			// 	console.log(JSON.stringify(e.data));
			// 	init();
			// 	$scope.item = {};
			// 	 });
			// }