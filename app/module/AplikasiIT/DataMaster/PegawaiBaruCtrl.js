define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PegawaiBaruCtrl', ['$q', '$rootScope', '$state','$scope', 'IPSRSService','CacheHelper','DateHelper','$mdDialog','ModelItem',
		function($q, $rootScope,$state, $scope,IPSRSService,cacheHelper,dateHelper,$mdDialog,ModelItem) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();

           	$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=GolonganPegawai&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=GolonganPegawai&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
            
           var init = function () {
           	debugger;
				IPSRSService.getFieldsMasterTable("get-data-master?className=GolonganPegawai", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.GolonganPegawai;
					var data = [];
					var i = 1;
					$scope.listDataMaster.forEach(function(e){
						debugger;
						var daftar = {
							"id" : e.id,
							"kdGolonganPegawai" : e.kdGolonganPegawai,
							"golonganPegawai": e.golonganPegawai,
							"noUrut": e.noUrut,
							"qGolonganPegawai" : e.qGolonganPegawai,
							"reportDisplay" : e.reportDisplay,
							"kodeExternal" : e.kodeExternal,
							"namaExternal" : e.namaExternal,
							"statusEnabled" : e.statusEnabled,
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
				"width": "10px"
			},
			{
				"field": "kdGolonganPegawai",
				"title": "Kode",
				"width": "50px"
			},
			{
				"field": "golonganPegawai",
				"title": "Golongan Pegawai",
				"width": "40px"
			},
			{
				"field": "noUrut",
				"title": "No Urut",
				"width": "20px"
			},
			{
				"field": "statusEnabled",
				"title": "Status Enable",
				"width": "20px"
			},
			{
				"title" : "Action",
    			"width" : "50px",
    			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];

			$scope.klik = function(current){
				debugger;
				$scope.showEdit = true;
				$scope.item.id = current.id;
				$scope.item.kode = current.kdGolonganPegawai;
				$scope.item.GolonganPegawai = current.golonganPegawai;
				$scope.item.norut = current.noUrut;
				$scope.item.qgolonganPegawai = current.qGolonganPegawai;
				$scope.item.ReportDisplay = current.reportDisplay;
				$scope.item.KodeExternal = current.kodeExternal;
				$scope.item.NamaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
				$scope.item.noRec = current.noRec;
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
	           "item.GolonganPegawai|ng-model|Golongan Pegawai",
	           "item.norut|ng-model|No Urut",
	           "item.qgolonganPegawai|ng-model|Q Golongan Pegawai",
	           "item.ReportDisplay|ng-model|Report Display",
		       "item.KodeExternal|ng-model|Kode External",
		       "item.NamaExternal|ng-model|Nama External"
        	];
       		 var isValid = ModelItem.setValidation($scope, listRawRequired);
		        var data = {
					"class": "GolonganPegawai",
					"listField": {
							"golonganPegawai": $scope.item.GolonganPegawai,
					 		"kdGolonganPegawai": $scope.item.kode,
					 		"noUrut": $scope.item.norut,
					 		"qGolonganPegawai": $scope.item.qgolonganPegawai,
					 		"reportDisplay": $scope.item.ReportDisplay,
					 		"kodeExternal": $scope.item.KodeExternal,
					 		"namaExternal": $scope.item.NamaExternal
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
                      .textContent('Golongan Pegawai "'+$scope.item.GolonganPegawai+'" akan di update, tetap lanjutkan?')
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
		        var data = {
					"class": "GolonganPegawai",
					"listField": {
							"id": $scope.item.id,
							"golonganPegawai": $scope.item.GolonganPegawai,
					 		"kdGolonganPegawai": $scope.item.kode,
					 		"noUrut": $scope.item.norut,
					 		"qGolonganPegawai": $scope.item.qgolonganPegawai,
					 		"reportDisplay": $scope.item.ReportDisplay,
					 		"kodeExternal": $scope.item.KodeExternal,
					 		"namaExternal": $scope.item.NamaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
		        });
		    }

		    $scope.batal = function () {
		    	$scope.showEdit = false;
		    	$scope.item = {};
		    }	
}
]);
});

