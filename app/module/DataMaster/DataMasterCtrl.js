define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DataMasterCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'ModelItemDataMaster', 'ManageDataMaster', '$window',
		function($mdDialog, $timeout, $state, $q, $rootScope, $scope, modelItemDataMaster, manageDataMaster, $window) {
		   
	    $scope.title = "Data Master";
    	$scope.item = {};
	    $scope.listField = [];
	    $scope.kosong = "";

	    $scope.selectedForm = {};

	    $scope.showFieldForm = false; //nampilin form
	    $scope.showListData = false; //nampilin list data
	    $scope.showAddEditData = false; //nampilin form add data


	    $q.all([
			manageDataMaster.getClassMaster("get-class-master/")
		]).then(function(data) {
            if (data[0].statResponse){
            	$scope.listForm = data[0].data.data.listClass
            }                
        });
	    $scope.listData = function()
	    {	
	    	// debugger;
	    	
		   	$scope.showListData = true;
		    $scope.showAddEditData = false; 

	    	/*$scope.data = [
	    	{
	    		"kdAgama": "isl",
		    	"agama": "Islam",
	    	},
	    	{
	    		"kdAgama": "krt",
		    	"agama": "Kristen",
	    	},
	    	{
	    		"kdAgama": "hnd",
		    	"agama": "Hindu",
	    	},
	    	{
	    		"kdAgama": "bdh",
		    	"agama": "Budha",
	    	}]
			
	    	$scope.sourceData = new kendo.data.DataSource({
				data: $scope.data
			});*/

			/*manageDataMaster.getFieldsMasterTable("get-data-master?className="+ $scope.selectedForm.namaEntity, true).then(function(dat){
				$scope.listData = dat.data.data[$scope.selectedForm.namaEntity];
				$scope.sourceData = new kendo.data.DataSource({
					data: $scope.listData
				});
			});*/
			manageDataMaster.getFieldsMasterTable("get-data-master?className="+ $scope.selectedForm.namaEntity, true).then(function(dat){
				$scope.listDataMaster = dat.data.data[$scope.selectedForm.namaEntity];
				/*$scope.listNoSeri.forEach(function(data){
					for (var i=1; i<data.length+1;i++)
						{			
							$scope.data[i].no= i ;
					};
				});*/
				
				$scope.dataSource = new kendo.data.DataSource({
                    pageSize: 10,
                    data: $scope.listDataMaster,
                    autoSync: true,
                    schema: {
                      	model: {
                        	id: "asetId",
                        	fields: {
                            	
                        	}   
                    	}
                	}	
            	});
				
			});

	    	$scope.columnData = [];
	    	for(var i=0; i<$scope.listField.length; i++)
	    	{
	    		var data = {
	    			field : $scope.listField[i].property,
	    			title : $scope.listField[i].caption,
	    			width : "150px"
	    		}

	    		$scope.columnData.push(data);
	    	}
	    	
	    	var action = {
    			"title" : "Action",
    			"width" : "200px",
    			"template" : "<button class='btnEdit' ng-click='editData()'>Edit</button>"+
                        	 "<button class='btnHapus' ng-click='deleteData()'>Hapus</button>"
    		}
    		/*{ command: ["edit"] }*/
	    	$scope.columnData.push(action);
	    	
	    	$scope.mainGridOptions = { 
                pageable: true,
                columns: $scope.columnData,
                editable: "popup"
            };

	    }

	    $scope.showForm = function()
	    {
	    	$q.all([
				manageDataMaster.getFieldsMasterTable("get-fields-master-table?className="+ $scope.selectedForm.namaEntity)
			]).then(function(data) {
                if (data[0].statResponse){
                	$scope.item = data[0];
                	$scope.listField = [];
			    	$scope.showBtnKembali = true;
			    	$scope.title = "Form " + $scope.selectedForm.namaEntity;
			    	$scope.showFieldForm = true;
			    	for (var property in $scope.item.data.data) {

					    if ($scope.item.data.data.hasOwnProperty(property)) {
					       var arrValue = $scope.item.data.data[property].split(";");
						   var field = {
					       	"type" : arrValue[0].toLowerCase(),
					       	"caption" : arrValue[1],
					       	"property": property
					       }

					       $scope.listField.push(field);
					    }
					    $scope.item.data.data[field.property] = "";
					}
			    	$scope.listData();
                }                
            });
	    }

	    $scope.addData = function()
	    {
	    	$scope.SubTitle = "Add Data";
	    	$scope.showListData = false;
		    $scope.showAddEditData = true; 
			$scope.showBtnSimpan = true;
			$scope.showBtnBatal = true;
			$scope.showBtnReset = true;
			$scope.showBtnKembali = false;
	    }

	    $scope.editData = function()
	    {
	    	$scope.SubTitle = "Edit Data";
	    	$scope.showListData = false;
		    $scope.showAddEditData = true; 
		    $scope.showBtnSimpan = true;
			$scope.showBtnBatal = true;
			$scope.showBtnReset = true;
			$scope.showBtnKembali = false;
	    }

	    $scope.deleteData = function()
	    {

	    }



	    $scope.Kembali = function()
	    {
	    	$window.location.reload();
	    	$scope.showBtnKembali = false;
	    	$scope.showFieldForm = false;
	    	$scope.title = "Data Master";

    	
	    }

	    $scope.Batal = function()
	    {
	    	$scope.listData();
	    	$scope.showBtnSimpan = false;
			$scope.showBtnBatal = false;
			$scope.showBtnReset = false;
			$scope.showBtnKembali = true;
	    }

	    $scope.Simpan = function()
	    {
	    	var a = $scope.item.data.data;
	    	debugger;
            var data = {
				"class": $scope.selectedForm.namaExternal,
				"listField": a
			}
	        manageDataMaster.saveDataMaster(data,"save-master-table").then(function(e) {
				console.log(JSON.stringify(e.data));
	        });
	    }

    }]);
});