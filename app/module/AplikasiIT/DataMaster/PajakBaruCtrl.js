define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PajakBaruCtrl', ['$q', '$rootScope', '$state','$scope', 'IPSRSService','CacheHelper','DateHelper','$mdDialog','ModelItem',
		function($q, $rootScope,$state, $scope,IPSRSService,cacheHelper,dateHelper,$mdDialog,ModelItem) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.disableData=function(){
			IPSRSService.getClassMaster("delete-master-table?className=Pajak&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
			init();
			 });
			 };

			$scope.enableData=function(){
			 IPSRSService.getClassMaster("delete-master-table?className=Pajak&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
			 init();

				});
			};

			var init = function () {
           	debugger;
					IPSRSService.getFieldsMasterTable("get-data-master?className=Pajak", true).then(function(dat){
			        $scope.listDataMaster = dat.data.data.Pajak;
					var data = [];
					var i = 1;
					$scope.listDataMaster.forEach(function(e){
						debugger;
						var daftar = {
					 	  "statusEnabled" : e.statusEnabled,
					      "namaExternal" : e.namaExternal,
					      "pajak" : e.pajak ,
					      "qPajak" : e.qPajak,
					      "reportDisplay" : e.reportDisplay ,
					      "deskripsi" : e.deskripsi,
					      "id" : e.id,
					      "jenisPajakId" : e.jenisPajakId,
					      "kodeExternal" : e.kodeExternal,
					      "kdPajak" : e.kdPajak,
					      "noRec" :	e.noRec,
					      "jenisPajak" : e.jenisPajak,
					      "no": i				 	}
					 	data[i-1]=daftar
					 	i++;
					});
					$scope.source = data;
					$scope.dataSource = new kendo.data.DataSource({
	                    pageSize: 10,
	                    data: $scope.source,
	                    autoSync: true
	            	});
					
				});
			}
			init();
				
			$scope.columnKomponen = [
			{
				"field": "no",
				"title": "No",
				"width": "20px"
			},
			{
				"field": "kdPajak",
				"title": "Kode",
				"width": "50px"
			},
			{
				"field": "pajak",
				"title": "Pajak",
				"width": "70px"
			},
			{
				"field": "jenisPajakId",
				"title": "Jenis Pajak",
				"width": "40px"
			},
			{
				"field": "qPajak",
				"title": "Q Pajak",
				"width": "70px"
			},
			{
				"field": "statusEnabled",
				"title": "Status Enabled",
				"width": "70px"
			},
			{
				"title" : "Action",
    			"width" : "90px",
    			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];

			$scope.klik = function(current){
				debugger;
				$scope.showEdit = true;
				$scope.item.id = current.id;
                $scope.item.noRec = current.noRec;
				$scope.item.Kode = current.kdPajak;
				$scope.item.Pajak = current.pajak;
				$scope.item.JenisPajak =
				{id : current.jenisPajakId,
				namaExternal : current.namaExternal};
				$scope.item.QPajak = current.qPajak;
				$scope.item.ReportDisplay = current.reportDisplay;
				$scope.item.KodeExternal = current.kodeExternal;
				$scope.item.NamaExternal = current.namaExternal;
				$scope.item.Deskripsi = current.deskripsi; 
				$scope.item.statusEnabled = current.statusEnabled;
			}


	       $scope.Save=function(){
            var confirm = $mdDialog.confirm()
                  .title('Peringatan!')
                  .textContent('Apakah anda yakin akan menyimpan data ini?')
                  .ariaLabel('Lucky day')
                  .ok('Ya')
                  .cancel('Tidak')

            $mdDialog.show(confirm).then(function() {
                $scope.Simpan();
            })
        };


			$scope.Simpan = function(){
				 var listRawRequired = [
		           "item.kode|ng-model|Kode",
		           "item.Pajak|ng-model|Pajak",
		           "item.JenisPajak|k-ng-model|Jenis Pajak",
		           "item.Deskripsi|ng-model|Deskripsi",
		           "item.QPajak|ng-model|Q Pajak",
			       "item.ReportDisplay|ng-model|Report Display",
			       "item.KodeExternal|ng-model|Kode External",
			       "item.NamaExternal|ng-model|Nama External"
	        	];
       		 var isValid = ModelItem.setValidation($scope, listRawRequired);
			 	debugger
			var data = {
			"class": "Pajak",
			"listField": {
				"deskripsi": $scope.item.Deskripsi,
				"jenisPajak": {id : $scope.item.JenisPajak.id},
				"kdPajak": $scope.item.Kode,
				"pajak": $scope.item.Pajak,
				"qPajak": $scope.item.QPajak,
				"reportDisplay": $scope.item.ReportDisplay,
				"kodeExternal": $scope.item.KodeExternal,
				"namaExternal": $scope.item.NamaExternal,
			     }
		     }
			IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
			console.log(JSON.stringify(e.data));
			init();
			$scope.item = {};
			 });
			  }



		  $scope.edit=function(){
		  	if ($scope.item.Kode==undefined){
		  		alert('Pilih "1" data yang akan di edit terlebih dahulu!!')
		  	}else{
                   var confirm = $mdDialog.confirm()
                  .title('Peringatan!')
                  .textContent('Data Pajak'+$scope.item.Pajak+' akan di update, tetap lanjutkan?')
                  .ariaLabel('Lucky day')
                  .ok('Ya')
                  .cancel('Tidak')
            $mdDialog.show(confirm).then(function() {
                $scope.edit2();
               })
            }
             };

			 $scope.edit2 = function()
			  {	
			  	debugger
			   var data = {
			    "class": "Pajak",
				"listField": {
					"deskripsi": $scope.item.Deskripsi,
					"jenisPajak": $scope.item.JenisPajak,
					"kdPajak": $scope.item.Kode,
					"pajak": $scope.item.Pajak,
					"qPajak": $scope.item.QPajak,
					"id": $scope.item.id,
                    "noRec": $scope.item.noRec,
					"reportDisplay": $scope.item.ReportDisplay,
					"kodeExternal": $scope.item.KodeExternal,
					"namaExternal": $scope.item.NamaExternal,
					"statusEnabled": $scope.item.statusEnabled
			   }
			 }
			IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
			init();
			});
			}
			$scope.batal = function () {
			$scope.showEdit = false;
			$scope.item = {};
			}
			IPSRSService.getFieldListData("JenisPajak&select=id,namaExternal", true).then(function(dat){
			$scope.listjenispajak= dat.data;
			});	


}
]);
});

