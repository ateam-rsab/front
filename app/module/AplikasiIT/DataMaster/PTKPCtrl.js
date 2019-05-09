define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PTKPCtrl', ['$q', '$rootScope', '$state','$scope', 'IPSRSService','CacheHelper','DateHelper','$mdDialog',
		function($q, $rootScope,$state, $scope,IPSRSService,cacheHelper,dateHelper,$mdDialog) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			

			var init = function () {
           	     debugger;
				IPSRSService.getItem("ptkp/get-list-ptkp", true).then(function(dat){
					debugger
					$scope.listDataMaster = dat.data.data.listData;	    
					var data = [];
					var i = 1;
					$scope.listDataMaster.forEach(function(e){
						debugger;
						// var daftar = {
						
						// 	  "qPTKP" : e.qPTKP,
						//       "noRec" : e.noRec,
						//       "totalHargaPTKP" :e.totalHargaPTKP,
						//       "statusEnabled" : e.statusEnabled,
						//       "namaExternal" :e.namaExternal,
						//       "qtyAnak" :e.qtyAnak,
						//       "reportDisplay" : e.reportDisplay,
						//       "deskripsi" : e.deskripsi,
						//       "statusPerkawinanId" : e.statusPerkawinanId,
						//       "id" :e.id,
						//       "statusPTKP" : e.statusPTKP,
						//       "kodeExternal" :e.kodeExternal,
						//       "kdPTKP" :e.kdPTKP,
					 // 		"no": i
						//  	}
						var daftar = {
						            "qPTKP": e.qPTKP,
							        "statusPerkawinan": e.statusPerkawinan,
							        "totalHargaPTKP": e.totalHargaPTKP,
							        "statusEnabled": e.statusEnabled,
							        "namaExternal": e.namaExternal,
							        "idStatusKawin": e.idStatusKawin,
							        "idPTKP": e.idPTKP,
							        "qtyAnak": e.qtyAnak,
							        "reportDisplay": e.reportDisplay,
							        "deskripsi": e.deskripsi,
							        "statusPTKP": e.statusPTKP,
							        "kodeExternal": e.kodeExternal,
							        "kdPTKP": e.kdPTKP,
							        "no" : i
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
			 $scope.disableData=function(){
			 IPSRSService.getClassMaster("delete-master-table?className=PenghasilanTidakKenaPajak&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
			 init();
			 });
			 };
			$scope.enableData=function(){
			 IPSRSService.getClassMaster("delete-master-table?className=PenghasilanTidakKenaPajak&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
			 init();

				});
			};

		
			
			
			$scope.columnKomponen = [
			{
				"field": "no",
				"title": "No",
				"width": "20px"
			},
			{
				"field": "kdPTKP",
				"title": "Kode",
				"width": "50px"
			},
			{
				"field": "statusPTKP",
				"title": "Status PTKP",
				"width": "70px"
			},
			{
				"field": "statusPerkawinan",
				"title": "Status Perkawinan",
				"width": "70px"
			},
			{
				"field": "qtyAnak",
				"title": "QTY Anak",
				"width": "70px"
			},
			{
				"field": "totalHargaPTKP",
				"title": "Total Harga",
				"width": "70px"
			},
			{
				"field": "statusEnabled",
				"title": "Status Enabled",
				"width": "70px"
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
				$scope.item.id = current.idPTKP;
				$scope.item.kode = current.kdPTKP;
				$scope.item.StPTKP = current.statusPTKP;
				$scope.item.ReportDisplay = current.reportDisplay;
				$scope.item.Deskripsi = current.deskripsi;
				$scope.item.statusPerkawinan = {id : current.idStatusKawin,
												namaExternal: current.statusPerkawinan}
				$scope.item.QtyAwal = current.qtyAnak;
				$scope.item.TotalHargaPTKP = current.totalHargaPTKP;
				$scope.item.QPTKP = current.qPTKP;
				$scope.item.KodeExternal = current.kodeExternal;
				$scope.item.NamaExternal = current.namaExternal;
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


			$scope.Simpan = function()
			 {
			 debugger
			var data = {
			"class": "PenghasilanTidakKenaPajak",
			"listField": {
							"deskripsi": $scope.item.Deskripsi,
							"kdPTKP": $scope.item.kode,
							"statusPerkawinan": {"id" : $scope.item.statusPerkawinan.id},//?
							"statusPerkawinanId": $scope.item.statusPerkawinan.id,
							"qPTKP": $scope.item.QPTKP,
							"qtyAnak": $scope.item.QtyAwal,
							"statusPTKP": $scope.item.StPTKP,
							"totalHargaPTKP": $scope.item.TotalHargaPTKP,
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
            var listRawRequired = [
	           "item.kode|ng-model|Kode",
	           "item.StPTKP|ng-model|Nama Status PTKP",
	           "item.ReportDisplay|ng-model|Report Display",
	           "item.Deskripsi|ng-model|Deskripsi",
	           "item.statusPerkawinan|k-ng-model|Status Perkawinan",
		       "item.QtyAwal|ng-model|QTY Awal",
		       "item.TotalHargaPTKP|ng-model|Total Harga PTKP",
		       "item.QPTKP|ng-model|QPTKP",
		       "item.KodeExternal|ng-model|Kode External",
		       "item.NamaExternal|ng-model|Nama External"
	        ];
	        var isValid = ModelItem.setValidation($scope, listRawRequired);
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Data dengan kode "'+$scope.item.kode+'" akan di update, tetap lanjutkan?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $scope.edit2();
                })
            };

	
			 $scope.edit2 = function()
			  {	
			  if($scope.item.kode == undefined){
			   var data = {
			 "class": "PenghasilanTidakKenaPajak",
			 "listField": {
							"deskripsi": $scope.item.Deskripsi,
							"kdPTKP": $scope.item.kode,
							"statusPerkawinan": {"id" : $scope.item.statusPerkawinan.id},//?
							"statusPerkawinanId": $scope.item.statusPerkawinan.id,
							"qPTKP": $scope.item.QPTKP,
							"qtyAnak": $scope.item.QtyAwal,
							"statusPTKP": $scope.item.StPTKP,
							"totalHargaPTKP": $scope.item.TotalHargaPTKP,
							"id": $scope.item.id,
							"reportDisplay": $scope.item.ReportDisplay,
							"kodeExternal": $scope.item.KodeExternal,
							"namaExternal": $scope.item.NamaExternal,
							"statusEnabled": $scope.item.statusEnabled,
							"id": $scope.item.id,
							"noRec": $scope.item.noRec
							 }
			 }
			IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
			init();
			});
			}
			}
			$scope.batal = function () {
			$scope.showEdit = false;
			$scope.item = {};
			}
			IPSRSService.getFieldListData("StatusPerkawinan&select=id,namaExternal", true).then(function(dat){
            $scope.liststatusperkawinan= dat.data;
});	
}
]);
});

