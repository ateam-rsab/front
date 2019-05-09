define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterJenisLinenCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageLaundry', 'FindLaundry', '$state',
		function ($rootScope, $scope, ModelItem, ManageLaundry, FindLaundry, $state) {
	// initialize.controller('MasterJenisLinenCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindLaundry', '$state',
	// 	function ($rootScope, $scope, ModelItem, ManageSarpras, FindLaundry, $state) {
			ModelItem.get("Laundry/MasterJenisLinen").then(function (data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });
			$scope.item = {};
			$scope.SembunyikanKode = true;

			$scope.InitJenisLinen = function () {
				debugger;
				FindLaundry.getLaundry("jenis-linen/find-all-jenis-linen/").then(function (dat) {
					debugger
					$scope.nomor = 1;
					$scope.sourceMasterJenisLinen = dat.data.data.data;
					$scope.dataSourceJenisLinen = new kendo.data.DataSource({
						data:$scope.sourceMasterJenisLinen,
						pageSize: 10
					})

					for (var i = 0; i < $scope.sourceMasterJenisLinen.length; i++) {
						$scope.sourceMasterJenisLinen[i].no = $scope.nomor++
					}
				});
			}
			$scope.InitJenisLinen();

			$scope.mainGridOptions = {
				pageable: true,
				filterable: {
					extra: false,
					operators: {
						string: {
							startsWith: "Pencarian"
						}
					}
				},
				sortable: true,
			}
			$scope.columndataJenisLinen = [
				{
					"field": "no",
					"title": "<h3 align=center>No.</h3>",
					"width": "50px"
				},
				{
					"field": "kdJenisLinen",
					"title": "<h3 align=center>Kode Jenis Linen</h3>",
					"width": "150px"
				}, {
					"field": "jenisLinen",
					"title": "<h3 align=center>Jenis Linen</h3>",
					"width": "200px"
				}, {
					"field": "kodeExternal",
					"title": "<h3 align=center>Kode Eksternal</h3>",
					"width": "150px"
				}, {
					"field": "namaExternal",
					"title": "<h3 align=center>Nama Eksternal</h3>",
					"width": "150px"
				},
				// {
				// 	"field": "statusEnabled",
				// 	"title": "<h3 align=center>Status Enabled</h3>",
				// 	"width": "150px"
				// },
				{
					"title": "<h3 align=center>Action</h3>",
					"width": "100px",
					"template": "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
				}
			];


			$scope.disableData = function () {
				$scope.Alldata = this.dataItem;
				var data = {
					"id": this.dataItem.id,
					"jenisLinen": this.dataItem.jenisLinen,
					"kodeExternal": this.dataItem.kodeExternal,
					"namaExternal": this.dataItem.namaExternal,
					"statusEnabled": false
				};
				console.log(JSON.stringify(data));
				ManageLaundry.saveLaundry(ModelItem.beforePost(data), "jenis-linen/save-jenis-linen/").then(function (e) {
					$scope.item.kodeJenisLinen = "",
						$scope.item.jenisLinen = "",
						$scope.item.kodeEksternal = "",
						$scope.item.namaEksternal = "",
						$scope.SembunyikanKode = true;
					$scope.selectedid = undefined;
					$scope.InitJenisLinen();
				});
			}


			$scope.tutup = function () {
				$state.go('home');
			}

			console.log($scope.checkbox);
			$scope.SelectJenisLinen = function (data) {
				if ($scope.selectedid == undefined) {
					toastr.info("Mode Edit : Aktif");
				}
				console.log(JSON.stringify(data));
				$scope.item.kodeJenisLinen = data.kdJenisLinen,
					$scope.item.jenisLinen = data.jenisLinen,
					$scope.item.kodeEksternal = data.kodeExternal,
					$scope.item.namaEksternal = data.namaExternal,
					$scope.selectedid = data.id;
				$scope.SembunyikanKode = false;
				//$scope.item.aktif=$scope.checkbox();
			};

			$scope.baru = function () {
				$scope.item.kodeJenisLinen = "",
					$scope.item.jenisLinen = "",
					$scope.item.kodeEksternal = "",
					$scope.item.namaEksternal = "",
					$scope.SembunyikanKode = true,
					$scope.selectedid = undefined
				toastr.info("Mode Baru : Aktif");
			}


			$scope.enableKodeJenisLinen = "true";
			$scope.Save = function () {
				var data = {
					"id": $scope.selectedid,
					"jenisLinen": $scope.item.jenisLinen,
					"kodeExternal": $scope.item.kodeEksternal,
					"namaExternal": $scope.item.namaEksternal,
					// "statusEnabled": aktif
					"statusEnabled": true
				};
				console.log(JSON.stringify(data));
				ManageLaundry.saveLaundry(ModelItem.beforePost(data), "jenis-linen/save-jenis-linen/").then(function (e) {
					$scope.SembunyikanKode = true;
					$scope.selectedid = undefined;
					$scope.InitJenisLinen();
				});
				$scope.Batal();
			};
			$scope.Batal = function () {
				// debugger;
				$scope.item.kodeJenisLinen = "",
					$scope.item.jenisLinen = "",
					$scope.item.kodeEksternal = "",
					$scope.item.namaEksternal = ""
			};
		}
	]);
});


//============================================================================================== Data Old
	// $scope.Delete = function () {
   //              debugger;
   //              // var data = $scope.selected.id;
   //              var dataid = $scope.selectedid
			// 	// console.log(data);
   //              ManageSarpras.deleteMasterJenisLinen("jenis-linen/delete-jenis-linen/?id=" + dataid).then(
			// 		function (e) {
			// 			FindSarpras.getMasterJenisLinen("jenis-linen/find-all-jenis-linen/").then(function(dat){
			// 			$scope.sourceMasterJenisLinen = dat.data.data;

			// 			});
			// 		});
   //          };
            // $scope.editJenisLinen = function()
            // {
            //     if($scope.dataSelectedRowCoa)
            //     {
            //         if(this.dataItem.id != $scope.dataSelectedRowCoa.id)
            //         {
            //             alert("row beom ke select");
            //         }
            //         else
            //         {
            //             $scope.isEditing = true;
            //             $scope.showButtonTemplate = true;
            //             showDataEdit($scope.dataSelectedRowCoa.id);
            //         }
            //     }   
            // };

            	// var aktif = false;
			// $scope.checkbox = function () {
			// 	if (aktif)
			// 		aktif = false;

			// 	else
			// 		aktif = true;

			// 	console.log(aktif);
			// }
