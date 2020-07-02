define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PangkatBaruCtrl', ['$q', '$rootScope', '$state','$scope', 'IPSRSService','CacheHelper','DateHelper','MasterPantauParameter','$mdDialog','ModelItem',
		function($q, $rootScope,$state, $scope,IPSRSService,cacheHelper,dateHelper,MasterPantauParameter,$mdDialog,ModelItem) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.disableData=function(){
				debugger
				IPSRSService.getClassMaster("delete-master-table?className=Pangkat&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.enableData=function(){
				debugger
				IPSRSService.getClassMaster("delete-master-table?className=Pangkat&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};

			 MasterPantauParameter.getOrderList("service/list-generic/?view=Golongan&select=id,name", true).then(function(dat){
	         $scope.listGolongan = dat;	
	      	});
              var init = function () {
				debugger
				IPSRSService.getItem("pangkat/get-list-pangkat", true).then(function(dat){
					debugger
					$scope.listDataMaster = dat.data.data.listData;	
                    var data =[];
                    var i=1;
                    $scope.listDataMaster.forEach(function(g){
                    	debugger
                    var daftar = {
                    "noUrut": g.noUrut,
			        "idGolPegawai": g.idGolPegawai,
			        "namaPangkat": g.namaPangkat,
			        "qPangkat": g.qPangkat,
			        "golonganPegawai": g.golonganPegawai,
			        "id": g.id,
			        "kdPangkat": g.kdPangkat,
			        "ruang" : g.ruang,
			        "reportDisplay" : g.reportDisplay,
			        "kodeExternal" : g.kodeExternal,
			        "namaExternal" : g.namaExternal,
			        "statusEnabled" : g.statusEnabled,
			         "no" : i
                    }
                    data[i-1] = daftar
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
				"field": "kdPangkat",
				"title": "Kode Pangkat",
				"width": "30px"
			},
			{
				"field": "namaPangkat",
				"title": "Nama Pangkat",
				"width": "120px"
			},
			{
				"field": "noUrut",
				"title": "No Urut",
				"width": "30px"
			},
			{
				"field": "golonganPegawai",
				"title": "Golongan",
				"width": "30px"
			},
			{
				"field": "ruang",
				"title": "Ruang",
				"width": "20px"
			},
			{
				"field": "statusEnabled",
				"title": "Status Enable",
				"width": "30px"
			},
			{
				"title" : "Action",
    			"width" : "60px",
    			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];

			 $scope.klik = function(current){
			 	debugger
             	$scope.showEdit = true;
				$scope.current = current;
				$scope.item.id = current.id;
				$scope.item.KdPangkat = current.kdPangkat;				
				$scope.item.NamaPangkat = current.namaPangkat; 
				$scope.item.norut = current.noUrut; 
				$scope.item.QPangkat = current.qPangkat; 
				$scope.item.golongan = {id :current.idGolPegawai,
										name : current.golonganPegawai}
				$scope.item.ruangan = current.ruang; 
				$scope.item.ReportDisplay = current.reportDisplay; 
				$scope.item.KodeExternal = current.kodeExternal; 
				$scope.item.NamaExternal = current.namaExternal;
				$scope.item.noRec = current.noRec;
				$scope.item.statusEnabled = current.statusEnabled;
			};

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
           "item.KdPangkat|ng-model|Kode Pangkat",
           "item.NamaPangkat|ng-model|Nama Pangkat",
           "item.norut|ng-model|No Urut",
           "item.QPangkat|ng-model|Q Pangkat",
           "item.golongan|k-ng-model|Golongan Pegawai",
	       "item.ruangan|ng-model|Detail Ruangan",
	       "item.ReportDisplay|ng-model|Report Display",
	       "item.KodeExternal|ng-model|Kode External",
	       "item.NamaExternal|ng-model|Nama External"
         
        	];
       		 var isValid = ModelItem.setValidation($scope, listRawRequired);
		    	debugger
		        var data = 
		        {
					"namaPangkat" : $scope.item.NamaPangkat,
					"noUrut" : $scope.item.norut,
					"qPakat" : $scope.item.QPangkat,
					"kdGolonganPegawai" : {"id" : $scope.item.golongan.id},
					"kdPangkat" : $scope.item.KdPangkat,
					"qPangkat" : 18,
					"kodeExternal" : $scope.item.KodeExternal,
					"namaExternal" : $scope.item.NamaExternal,
					"reportDisplay" : $scope.item.ReportDisplay,
					"ruang" : $scope.item.ruangan,
					"statusEnabled" : "true"
				}
		        IPSRSService.saveDataSarPras(data,"pangkat/save-pangkat").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        });

		    }

		    $scope.edit=function(){
		    if($scope.item.KdPangkat==undefined){
            	alert('Pilih "1" data yang akan di edit terlebih dahulu!!')
            }else
            {
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Nama Pangkat "'+$scope.item.NamaPangkat+'" akan di update, tetap lanjutkan?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $scope.edit2();
                })
              }
            };

		    $scope.edit2 = function(){	
		    var listRawRequired = [
	           "item.KdPangkat|ng-model|Kode Pangkat",
	           "item.NamaPangkat|ng-model|Nama Pangkat",
	           "item.norut|ng-model|No Urut",
	           "item.QPangkat|ng-model|Q Pangkat",
	           "item.golongan|k-ng-model|Golongan Pegawai",
		       "item.ruangan|ng-model|Detail Ruangan",
		       "item.ReportDisplay|ng-model|Report Display",
		       "item.KodeExternal|ng-model|Kode External",
		       "item.NamaExternal|ng-model|Nama External"
	        ];
	        var isValid = ModelItem.setValidation($scope, listRawRequired);
			     
           
			      var data = {   
					        	"id": $scope.item.id,
								"namaPangkat" : $scope.item.NamaPangkat,
								"noUrut" : $scope.item.norut,
								"qPakat" : "id",
								"kdGolonganPegawai" : {"id" : $scope.item.golongan.id},
								"kdPangkat" : $scope.item.KdPangkat,
								"qPangkat" : 18,
								"kodeExternal" : $scope.item.KodeExternal,
								"namaExternal" : $scope.item.NamaExternal,
								"reportDisplay" : $scope.item.ReportDisplay,
								"ruang" : $scope.item.ruangan,
								"statusEnabled" : "true"
							 }
			        IPSRSService.saveDataSarPras(data,"pangkat/save-pangkat").then(function(e) {
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

