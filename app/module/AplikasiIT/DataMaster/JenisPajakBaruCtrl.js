define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisPajakBaruCtrl', ['$q', '$rootScope', '$state','$scope', 'IPSRSService','CacheHelper','DateHelper','$mdDialog',
		function($q, $rootScope,$state, $scope,IPSRSService,cacheHelper,dateHelper,$mdDialog) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();

		     $scope.disableData=function(){
			 IPSRSService.getClassMaster("delete-master-table?className=JenisPajak&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
			 init();
			 });
			 };

			 $scope.enableData=function(){
			 IPSRSService.getClassMaster("delete-master-table?className=JenisPajak&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
			 init();

				});
			};

			var init = function () {
           	debugger;
			IPSRSService.getFieldsMasterTable("get-data-master?className=JenisPajak", true).then(function(dat){
			$scope.listDataMaster = dat.data.data.JenisPajak; 
					var data = [];
					var i = 1;
					$scope.listDataMaster.forEach(function(e){
						debugger;
						var daftar = {
							"deskripsi" : e.deskripsi,
							"id" : e.id,
							"jenisPajak": e.jenisPajak,
							"jenisPajakHeadId": e.jenisPajakHeadId,
							"kdJenisPajak": e.kdJenisPajak,
							"kodeExternal": e.kodeExternal,
							"namaExternal": e.namaExternal,
							"noRec": e.noRec,
							"qJenisPajak": e.qJenisPajak,
							"reportDisplay": e.reportDisplay,
							"statusEnabled": e.statusEnabled,
							"noRec" : e.noRec,
					 		"no": i
						 	}
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
				"field": "kdJenisPajak",
				"title": "Kode",
				"width": "30px"
			},
			{
				"field": "jenisPajak",
				"title": "Jenis Pajak",
				"width": "70px"
			},
			{
				"field": "qJenisPajak",
				"title": "Q Jenis Pajak",
				"width": "70px"
			},
			{
				"field": "jenisPajakHeadId",
				"title": "Jenis Pajak Head",
				"width": "70px"
			},
			{
				"field": "statusEnabled",
				"title": "Status Enabled",
				"width": "40px"
			},
			{
				"title" : "Action",
    			"width" : "80px",
    			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];

			$scope.klik = function(current){
				debugger;
				$scope.showEdit = true;
				$scope.item.id = current.id;
				$scope.item.kode = current.kdJenisPajak;
				$scope.item.JenisPajak = current.jenisPajak;
				$scope.item.Deskripsi = current.deskripsi;
				$scope.item.QJenisPajak = current.qJenisPajak;
				$scope.item.jenisPajakHead = 
				{id : current.jenisPajakHeadId,
				namaExternal : current.namaExternal};
				//$scope.item.jenisPajakHead2 = current.jenisPajakHeadId;
				$scope.item.ReportDisplay = current.reportDisplay;
				$scope.item.KodeExternal = current.kodeExternal;
				$scope.item.NamaExternal = current.namaExternal;
				$scope.item.noRec = current.noRec;
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
	           "item.JenisPajak|ng-model|Jenis Pajak",
	           "item.Deskripsi|ng-model|Deskripsi",
	           "item.QJenisPajak|ng-model|Q Jenis Pajak",
	           "item.jenisPajakHead|k-ng-model|Jenis Pajak Head",
		       "item.ReportDisplay|ng-model|Report Display",
		       "item.KodeExternal|ng-model|Kode External",
		       "item.NamaExternal|ng-model|Nama External"
	        	];
			 debugger
			var data = {
			"class": "JenisPajak",
			"listField": {
				"deskripsi": $scope.item.Deskripsi,
				"jenisPajak": $scope.item.JenisPajak,
				"kdJenisPajak": $scope.item.kode,
				"jenisPajakHead": {"id": $scope.item.jenisPajakHead.id}, 
				"qJenisPajak": $scope.item.QJenisPajak,
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
				if($scope.item.kode == undefined){
				    alert('Pilih "1" data yang akan di edit terlebih dahulu!!')
				}else{
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Jenis Pajak "'+$scope.item.JenisPajak+'" akan di update, tetap lanjutkan?')
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
			 "class": "JenisPajak",
			 "listField": {
				"deskripsi": $scope.item.Deskripsi,
				"jenisPajak": $scope.item.JenisPajak,
				"kdJenisPajak": $scope.item.kode,
				"jenisPajakHead": {"id": $scope.item.jenisPajakHead.id}, 
				"qJenisPajak": $scope.item.QJenisPajak,
				"id": $scope.item.id,
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
            $scope.listjenispajakhead= dat.data;
});	
}
]);
});

