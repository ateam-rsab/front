define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterJenisDietCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageGizi', 'FindPasienGizi','$window', '$timeout',
		function($rootScope, $scope, ModelItem, ManageGizi, FindPasienGizi, $window, $timeout) {
			ModelItem.get("").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			    $scope.statusSave = true;
			
			FindPasienGizi.getGizi("jenis-diet/generate/").then(function(dat){
				$scope.item.kodeJenisDiet = dat.data.data.result;
			})

		   $scope.init = function(){
			 FindPasienGizi.getGizi("jenis-diet/find-all/").then(function(dat){
				$scope.source= dat.data.data;
				$scope.sourceJenisGizi = new kendo.data.DataSource({
				pageSize: 10,
				data:$scope.source
				});
			  })
			}
			$scope.init();


		    $scope.Cari = function(getPencarian){
		    	debugger
			   	if(getPencarian != undefined){
			   	 var q = getPencarian;
			     var grid = $("#grid").data("kendoGrid");
			     	  grid.dataSource.query({
			          page:1,
			          pageSize:20,
			          filter:{
			          	logic:"or",
			         		 filters:[{field:"kdJenisDiet", operator:"contains",value:q},
			         		          {field:"jenisDiet", operator:"contains",value:q},
			         		          {field:"keterangan", operator:"contains",value:q}]
			          }
			      });
			   	}
			  }	

		    $scope.ClearCari = function(Pencarians){
			    $scope.item.pencarian = "";
			     var gridData = $("#grid").data("kendoGrid");
			     gridData.dataSource.filter({});
			 }

			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                height:50,
                pageSize:20,
                columns: [{
                    "field": "qJenisDiet",
					"title": "<h3 align=center>No</h3>",
					"width": "10px",
					"attributes": {align: "center"}
				}, {
					"field": "kdJenisDiet",
					"title": "<h3 align=center>Kode Jenis Diet</h3>",
					"width": "80px"
				}, {
					"field": "jenisDiet",
					"title": "<h3 align=center>Jenis Diet</h3>",
					"width": "150px"
				}, {
					"field": "keterangan",
					"title": "<h3 align=center>Keterangan</h3>",
					"width": "200px"
                },
                {
				 "title": "<h3 align=center>Action</h3>",
			      "width" : "100px",
			     "template" : "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
		     	}
                ]
            };

            $scope.Refresh = function(){
            	$scope.item.jenisDiet = "";
            	$scope.item.keterangan = "";
            	$scope.item.pencarian ="";
            	$scope.init();
            }

			$scope.Batal=function(){
				FindPasienGizi.getGizi("jenis-diet/generate/").then(function(dat){
					$scope.item.kodeJenisDiet = dat.data.data.result;
				// debugger;
				});

				$scope.item.jenisDiet="",
				$scope.item.keterangan=""
			}

			$scope.Select=function(data)
			{
				debugger
				console.log(JSON.stringify(data));
				$scope.idgrid = data.id,
				$scope.item.kodeJenisDiet=data.kdJenisDiet,
				$scope.item.jenisDiet=data.jenisDiet,
				$scope.item.keterangan=data.keterangan,
				toastr.info($scope.item.jenisDiet+" Dipilih");

			};

			$scope.disableData = function(){
				debugger
				var dataGrid = this.dataItem;
				$scope.id = dataGrid.id;
				$scope.jenisDiet = dataGrid.jenisDiet;
				$scope.kdJenisDiet = dataGrid.kdJenisDiet;
				$scope.kdProfile = dataGrid.kdProfile;
				$scope.namaExternal = dataGrid.namaExternal; 
				$scope.noRec =  dataGrid.noRec;
				$scope.qJenisDiet = dataGrid.qJenisDiet;
				$scope.reportDisplay = dataGrid.reportDisplay;

				var data = {
            		"id" : $scope.id,
            		"kdJenisDiet": $scope.kdJenisDiet, 
 					"qJenisDiet": parseInt($scope.qJenisDiet), 
					"jenisDiet" : $scope.jenisDiet, 
 					"keterangan": $scope.item.keterangan,
 					"statusEnabled" : false
            	};
				ManageGizi.saveGizi(data,"jenis-diet/save/").then(function(e) {
					$scope.init();
				});
			}

			$scope.Save = function(){
            	var data = {
            		"id" : $scope.idgrid,
            		"kdJenisDiet": $scope.item.kodeJenisDiet, 
 					"qJenisDiet": parseInt($scope.item.kodeJenisDiet), 
					"jenisDiet" : $scope.item.jenisDiet, 
 					"keterangan": $scope.item.keterangan,
 					"statusEnabled" : $scope.statusSave
            	};
            	console.log(JSON.stringify(data)); 
				ManageGizi.saveGizi(data,"jenis-diet/save/").then(function(e) {
					$scope.init();
				});
			}


		}
	]);
});

//===================== source old
         /*$timeout(function () {
		                $window.location.reload();
		            }, 4500);*/