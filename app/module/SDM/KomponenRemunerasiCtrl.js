define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KomponenRemunerasiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem','$state','ManageSdm','FindSdm','DateHelper',
		function($q, $rootScope, $scope, ModelItem,$state,ManageSdm, FindSdm, DateHelper) {
			function init(){
				$scope.item = {
					periodePir: new Date()
				};
				$scope.isRouteLoading = true;
				$q.all([
					FindSdm.getUnitKerja()
				]).then(function(res){
					$scope.listUnitKerja = res[0].data.data;
					$scope.isRouteLoading = false;
				}, (err)=>{
					$scope.isRouteLoading = false;
					throw err;
				});
			}
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.yearSelected = { 
				start: "decade",                          
				depth: "decade",                           
				format: "yyyy"
			};
            $scope.monthSelected = {
                start: "year",
                depth: "year",                       
				format: "MM-yyyy"
            };
			$scope.onTabChanges = function(value){
                if (value === 1){
                    if(!$scope.datagridPir){
                        $scope.loadDataPir();
                    }
                } else if (value === 2){
                    if(!$scope.datagridIku){
                        $scope.loadDataIku();
                    }
                }
            };
			$scope.opsiGridPir = {
				toolbar: [{
                    name: "create",
                    text: "Tambah",
                    template: '<button ng-click="openWindow1()" class="k-button k-button-icontext k-grid-add"><span class="k-icon k-i-plus"></span>Tambah</button>'	
                }],
				pageable: true,
				selectable: "row",
				scrollable: false,
				columns: [
					{ field: "id", title: "", hidden: true},
					{ field: "tahun", title: "Tahun", width: 280},
					{ field: "pir", title: "PIR"},
					{ field: "status", title: "", hidden: true},
					{command: [{text: "Edit", click: editPir}], title: "&nbsp;", width: "6%"}
				]
			};
            $scope.opsiGridIku = {
				toolbar: [{
                    name: "create",
                    text: "Tambah",
                    template: '<button ng-click="openWindow2()" class="k-button k-button-icontext k-grid-add"><span class="k-icon k-i-plus"></span>Tambah</button>'	
                }],
                pageable: true,
                selectable: "row",
                scrollable: false,
                columns: [
					{ field: "id", title: "", hidden: true},
					{ field: "idUnitKerja", title: "", hidden: true},
					{ field: "unitKerja", title: "Unit Kerja"},
					{ field: "periode", title: "Periode"},
					{ field: "iku", title: "IKU"},
					// { field: "status", title: "", hidden: true},
					{command: [{text: "Edit", click: editIku}], title: "&nbsp;", width: "6%"}
				]
			};
			$scope.loadDataPir = function(){
				$scope.isRouteLoading = true;
				var year = new Date($scope.item.periodePir);
                ManageSdm.getOrderList("iki-remunerasi/get-pir/" + year.getFullYear()).then(function(res){
					if(!res.data.data){
						toastr.warning("Data tidak tersedia");
						return;
					}
					if(res.statResponse){
						var gridDt = [];
						gridDt.push(res.data.data);
						$scope.datagridPir = new kendo.data.DataSource({
							data: gridDt,
							pageSize: 10,
							// group: {
							//     field: "tahun",
							//     aggregates: [{
							//         field: "tglBerakhirSip",
							//         aggregate: "count"
							//     }]
							// },
							// aggregate: [ { field: "tglBerakhirSip", aggregate: "count" }]
						});
					}
                    $scope.isRouteLoading = false;
                }, (err) => {
                    $scope.isRouteLoading = false;
                });
                $scope.tabActive = 'masaBerlakuSip';
            };
            $scope.loadDataIku = function(){
                $scope.isRouteLoading = true;
                ManageSdm.getOrderList("iki-remunerasi/get-all-iku/").then(function(res){
                    $scope.datagridIku = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10,
                        group: {
                            field: "unitKerja",
                            aggregates: [{
                                field: "unitKerja",
                                aggregate: "count"
                            }]
                        },
                        aggregate: [ { field: "unitKerja", aggregate: "count" }]
                    });
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
                $scope.tabActive = 'tabIku';
            };
			init();
			$scope.openWindow1 = function(data){
				$scope.dataPir = {
					id: data ? data.id : null,
					tglAwal: data ? moment("01-01-" + data.tahun, "DD-MM-YYYYTHH:mmZ").toDate() : new Date(),
					tglAkhir: data ? moment("31-12-" + data.tahun, "DD-MM-YYYYTHH:mmZ").toDate() : new Date(),
					pir: data ? data.pir : 0,
					tglBerlaku: data ? moment("01-01-" + data.tahun, "DD-MM-YYYYTHH:mmZ").toDate() : new Date(),
				}
				$scope.inputNewPir.center().open();
			}
			$scope.openWindow2 = function(data){
				if(data){
					data.unitKerja = {
						id: data.idUnitKerja,
						name: data.unitKerja
					}
				}
				$scope.dataIku = {
					id: data ? data.id : "",
					tglAwal: data ? moment("01-01-" + data.tahun, "DD-MM-YYYYTHH:mmZ").toDate() : new Date(),
					tglAkhir: data ? moment("31-12-" + data.tahun, "DD-MM-YYYYTHH:mmZ").toDate() : new Date(),
					unitKerja: data ? data.unitKerja : "",
					iku: data ? data.iku : 0,
					tglBerlaku: data ? moment("01-01-" + data.tahun, "DD-MM-YYYYTHH:mmZ").toDate() : new Date(),
				}
				$scope.inputNewIku.center().open();
			}
			$scope.simpanNewPir = function(data){
				if($scope.status === true){
					toastr.warning("Data tidak dapat dirubah");
					return;
				}
				if(data.pir == 0) {
					toastr.warning("Nilai PIR tidak valid");
					return;
				}
				for(var key in data){
					if(data.hasOwnProperty(key)){
						if(key.indexOf("tgl") >= 0){
							data[key] = DateHelper.getDateTimeFormatted3(data[key]);
						}
						if(key.indexOf("pir") >= 0){
							data[key] = data[key].toString();
						}
					}
				}
				var tmpData = [];
				if(!data.id){
					delete data.id;
				}
				tmpData.push(data);
				ManageSdm.saveDataUji(tmpData,"iki-remunerasi/save-pir-dan-iku").then(function(e) {
					$scope.inputNewPir.close(); // close window popup
					$scope.loadDataPir();		// reload data pir
					// console.log("DATA :" + JSON.stringify(dataSend));
					// $scope.item.pir ='';
					// $scope.item.iku ='';
					// $scope.Cari();
				}); 
			}
			$scope.simpanNewIku = function(data){
				if($scope.status === true){
					toastr.warning("Data tidak dapat dirubah");
					return;
				}
				if(data.iku == 0) {
					toastr.warning("Nilai IKU tidak valid");
					return;
				}
				var listRawRequired = [
					"dataIku.tglAwal|k-ng-model|Tanggal Awal",
					"dataIku.tglAkhir|k-ng-model|Tanggal Akhir",
					"dataIku.unitKerja|k-ng-model|Unit Kerja",
					"dataIku.iku|k-ng-model|Unit iku",
					"dataIku.tglBerlaku|k-ng-model|Unit tglBerlaku",
				]
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					for(var key in data){
						if(data.hasOwnProperty(key)){
							if(key.indexOf("tgl") >= 0){
								data[key] = DateHelper.getDateTimeFormatted3(data[key]);
							}
							if(key.indexOf("iku") >= 0){
								data[key] = data[key].toString();
							}
						}
					}
					var tmpData = [];
					tmpData.push(data);
					ManageSdm.saveDataUji(tmpData,"iki-remunerasi/save-pir-dan-iku").then(function(e) {
						$scope.inputNewIku.close(); // close window popup
						$scope.loadDataIku();		// reload data pir
						// console.log("DATA :" + JSON.stringify(dataSend));
						// $scope.item.pir ='';
						// $scope.item.iku ='';
						// $scope.Cari();
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
				 
			}
			function editPir(e){
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				if(dataItem.tahun){
					ManageSdm.getOrderList("iki-remunerasi/get-pir/"+dataItem.tahun).then(function(res){
						if(res.data.data){
							$scope.openWindow1(res.data.data);
						}
					})
				}
			}
			function editIku(e){
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				if(dataItem.periode && dataItem.idUnitKerja){
					ManageSdm.getOrderList("iki-remunerasi/get-iku/"+ dataItem.periode +"/"+ dataItem.idUnitKerja).then(function(res){
						if(res.data.data){
							$scope.openWindow2(res.data.data);
						}
					})
				} else {
					toastr.error('Data yang anda pilih tidak valid');
				}
			}
		}
	]);
});