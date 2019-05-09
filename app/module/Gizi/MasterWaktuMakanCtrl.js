define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterWaktuMakanCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageGizi', 'FindPasienGizi',
		function($rootScope, $scope, ModelItem, ManageGizi, FindPasienGizi) {
			ModelItem.get("perencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.Savedefault = true;
			

			$scope.init = function(){
				FindPasienGizi.getGizi("jenis-waktu/get-jenis-waktu/").then(function(dat){
					$scope.sourceJenisWaktu = dat.data.data;
					var nomor = 1;
					$scope.sourceJenisWaktu.forEach(function(e){
						e.no = nomor++
					})
				})
		    }
		    $scope.init();

			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                filterable: {
                   extra: false,
                   operators: {
                      string: {
                      startsWith: "Pencarian"
                      }
                   }
                },
                sortable: true,
                columns: [{
                    "field": "no",
					"title": "<h3 align=center>No</h3>",
					"width": "20px",
					"attributes": {align: "center"},
					"filterable" : false
				}, {
					"field": "jenisWaktu",
					"title": "<h3 align=center>Jenis Waktu</h3>",
					"width": "300px"
                },
                {
				 "title": "<h3 align=center>Action</h3>",
			      "width" : "100px",
			     "template" : "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
		     	}
                ]
            };

            $scope.disableData = function(){
               var isigrid = this.dataItem;
               var Idgrid = isigrid.id;
               var jenisWaktus = isigrid.jenisWaktu;
               var data = {
				    "jamAkhir":1,
					"jamAwal":0,
					"jenisWaktu":jenisWaktus,
					"departemen": {"id":6},
					"kelompokProduk" : {"id":6},
					"noUrut":5,
					"qJenisWaktu":5,
					"kdJenisWaktu":5,
					"statusEnabled":false,
					"id":Idgrid
				}
				ManageGizi.saveGizi(data,"/jenis-waktu/save/").then(function(e) {
					$scope.init();
				})
            }
            
            $scope.Select=function(data)
			{
			   $scope.item.jenisWaktu=data.jenisWaktu;
			   $scope.item.idWaktu=data.id;
			   toastr.info($scope.item.jenisWaktu+' Dipilih');
			};

			$scope.Baru = function(){
				toastr.info('Mode Edit : Mati');
				$scope.item.jenisWaktu = "";
				$scope.item.idWaktu = undefined;
			}


			$scope.Batal=function(){
				$scope.item.jenisWaktu="";
			};
            $scope.Save = function(){
            	var data = 
				{
				    "jamAkhir":1,
					"jamAwal":0,
					"jenisWaktu":$scope.item.jenisWaktu,
					"departemen": {"id":6},
					"kelompokProduk" : {"id":6},
					"noUrut":5,
					"qJenisWaktu":5,
					"kdJenisWaktu":5,
					"statusEnabled":$scope.Savedefault,
					"id":$scope.item.idWaktu
				}
            	console.log(JSON.stringify(data)); 
				ManageGizi.saveGizi(data,"/jenis-waktu/save/").then(function(e) {
					$scope.init();
				})
			}

		}
	]);
});

/*=======================================SOURCE OLD==========================================
        $scope.Save = function(){
            	var data = {
            		"jenisWaktu": $scope.item.jenisWaktu,
            		"departemen":{
            			"id": 6
            		},
            		"kelompokProduk":{
            			"id": 6
            		},
            		"kdJenisWaktu": 0
            	};
            	console.log(JSON.stringify(data)); 
				ManageGizi.saveGizi(data,"jenis-waktu/save/").then(function(e) {
					FindPasienGizi.getGizi("jenis-waktu/find-all/").then(function(dat){
						var data = []
						var i = 1
						dat.data.data.forEach(function(e){
						 	var a = {
						 		"id": e.id,
						 		"jenisWaktu": e.jenisWaktu,
						 		"nomor": i
						 	}
					 	data[i-1]=a
					 	i++;
						});
						$scope.source= dat.data.data;
						debugger;
						$scope.sourceJenisWaktu = new kendo.data.DataSource({
							pageSize: 10,
							data:$scope.source
						});
					})
					$scope.Batal();
				})
				ManageGizi.saveGizi(data,"jenis-waktu/save/").then(function(e) {
				})
			}*/


			/*			FindPasienGizi.getGizi("jenis-waktu/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var a = {
				 		"id": e.id,
				 		"jenisWaktu": e.jenisWaktu,
				 		"no": i
				 	}
			 	data[i-1]=a
			 	i++;
				});
				$scope.source= dat.data.data;
				debugger;
				$scope.sourceJenisWaktu = new kendo.data.DataSource({
    				pageSize: 10,
    				data:$scope.source
				});
			})
*/

