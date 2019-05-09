define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterBakuMutuCtrl', ['$rootScope', '$scope', 'ModelItem', 'MasterBakuMutuService', 'ManageSarpras',
		function ($rootScope, $scope, ModelItem, MasterBakuMutuService, ManageSarpras) {

			ModelItem.get("Kesling/MasterSatuan").then(function (data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });

			// $scope.dataVOloaded = true;
			// $scope.item = {};
			$scope.dataMasterBakuMutu = new kendo.data.DataSource({
				data: []
			});

			var init = function (){
				MasterBakuMutuService.findAllBakuMutu("baku-mutu/find-all-baku-mutu/").then(function (dat) {
					$scope.dataMasterBakuMutu = dat.data.data.bakuMutu;
					// debugger;

					var i = 1;
					$scope.dataMasterBakuMutu.forEach(function(data){
						data.no = i;
						i++;
					}) 
					// var i ;				
					// for(i=1;i<$scope.dataMasterBakuMutu.length;i++){
					// 	$scope.dataMasterBakuMutu.no = i;
					// 	// debugger;
					// }
				});
			}

			init();

			MasterBakuMutuService.findAllBakuMutu("baku-mutu/get-baku-mutu-parent").then(function (dat) {
				$scope.ListBakuMutu = dat.data.data.bakuMutu;
				// debugger;
			});

			MasterBakuMutuService.findAllBakuMutu("service/list-generic/?view=SatuanStandar&select=*").then(function (dat) {
				$scope.ListSatuan = dat.data;
				// debugger;
			});

			MasterBakuMutuService.findAllBakuMutu("service/list-generic/?view=JenisBakuMutu&select=*").then(function (dat) {
				$scope.ListJenisBaku = dat.data;
				// debugger;
			});

			$scope.columndataMasterBakuMutu = [{
					"field": "id",
					"hidden": true
				},{
					"field": "no",
					"title": "No",
					width: "70px",
					attributes: {
						style: "text-align:center"
					}
				},{
					"field": "namaBakuMutu",
					"title": "Nama Baku Mutu"
				}, {
					"field": "jenisBakuMutu",
					"title": "Jenis Baku Mutu"
				}, {
					"field": "kadarMaksimum",
					"title": "Kadar Maksimum"
				}, {
					"field": "satuanStandar",
					"title": "Satuan"
				}];


			$scope.now = new Date();

			var aktif = false;
			$scope.check = function () {
				if (aktif)
					aktif = "false";

				else
					aktif = "true";				
			}

			// $scope.Save = function () {
   //              // //debugger;
			// 	var data = {
			// 		"bakuMutu": $scope.item.bakuMutu,
			// 		"statusEnabled": aktif
			// 	};

   //              MasterBakuMutuService.saveMasterBakuMutu(ModelItem.beforePost(data), "baku-mutu/save-baku-mutu/").then(
			// 		function (e) {
			// 			$scope.item = {};
			// 		}
			// 	);
   //         	};

           	$scope.kl = function(current){
				$scope.current = current;
				// $scope.item.id=current.id;
				// $scope.item.namaBakuMutu=current.namaBakuMutu;
				// $scope.item.kadarMaksimum=current.kadarMaksimum;
				// $scope.item.jenisBakuMutu=current.jenisBakuMutu;
				// $scope.item.satuanStandar=current.satuanStandar;

				MasterBakuMutuService.findAllBakuMutu("baku-mutu/get-baku-mutu-by-id?id=" + current.id).then(function (dat) {
					$scope.item = dat.data.data.bakuMutu;
					// debugger;
				});
			}
			//debugger;
			
			$scope.Save = function() {
				if ($scope.item.id !== undefined) {
					var data = {
						"id" : $scope.item.id,
					    "kadarMaksimum": $scope.item.kadarMaksimum,
					    "satuanStandar": $scope.item.satuanStandar,
						"bakuMutu" : $scope.item.bakuMutu,
					    "jenisBakuMutu": $scope.item.jenisBakuMutu,
						"namaBakuMutu": $scope.item.namaBakuMutu
					}
				} else {
					var data = {
					    "kadarMaksimum": $scope.item.kadarMaksimum,
					    "satuanStandar": $scope.item.satuanStandar,
						"bakuMutu" : $scope.item.bakuMutu,
					    "jenisBakuMutu": $scope.item.jenisBakuMutu,
						"namaBakuMutu": $scope.item.namaBakuMutu
					   }
				}
				// console.log(JSON.stringify(data));
				// debugger;
				
				ManageSarpras.saveBakuMutu(ModelItem.beforePost(data)).then(function (e) {
					$scope.item= {};
               		init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             	});
				debugger;

            };

            $scope.batal = function() {
            	$scope.item = {};
            };

			$scope.enableKodeParameter = true;

			// MasterBakuMutuService.findAllBakuMutu("baku-mutu/find-all-baku-mutu/").then(function (dat) {
			// 	$scope.dataMasterBakuMutu = dat.data.data.bakuMutu;
			// 	var i = 0;				
			// 	for(i=0;i<$scope.dataMasterBakuMutu.length;i++){
			// 		if($scope.dataMasterBakuMutu[i].statusEnabled)
			// 		$scope.dataMasterBakuMutu[i].statusEnabled = "Aktif";
			// 		else
			// 		$scope.dataMasterBakuMutu[i].statusEnabled = "Tidak Aktif";
			// 	}
			// });

		}
	]);
});