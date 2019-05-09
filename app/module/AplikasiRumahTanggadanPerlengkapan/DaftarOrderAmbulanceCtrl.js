define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarOrderAmbulanceCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window', '$timeout',
		function ($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window, $timeout) {
			$scope.title = "";
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {
				awal: $scope.now,
				akhir: $scope.now,
			};
			// $scope.item.awal = $scope.now;
			// $scope.item.akhir = $scope.now;
			$scope.isRouteLoading = false;
			$scope.find = function () {
				var awal = DateHelper.getPeriodeFormatted($scope.item.awal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.akhir);
				var url = "periodeAwal=" + awal + "&periodeAkhir=" + akhir;
				ManageSarpras.getOrderList("daftar-order-pemakaian-ruang-rapat/find-by-periode/?" + url).then(function (dat) {
					$scope.listOrder = dat.data.data.data;
					$scope.listOrder.forEach(function (data) {
						if (data.strukOrder.jenisKonsumsiSet.length == 2) {
							data.strukOrder.jenisKonsumsiSet = "Makan dan Snack"
						} else if (data.strukOrder.jenisKonsumsiSet.length == 1) {
							if (data.strukOrder.jenisKonsumsiSet[0].jenisKonsumsi.id == 1) {
								data.strukOrder.jenisKonsumsiSet = "Makan";
							} else if (data.strukOrder.jenisKonsumsiSet[0].jenisKonsumsi.id == 2) {
								data.strukOrder.jenisKonsumsiSet = "Snack";
							}
						} else {
							data.strukOrder.jenisKonsumsiSet = "-";
						}
						var date = new Date(data.strukOrder.tglPelayananAwal);
						data.strukOrder.tglPelayananAwal = DateHelper.getTanggalJamFormatted(date);
						date = new Date(data.strukOrder.tglPelayananAkhir);
						data.strukOrder.tglPelayananAkhir = DateHelper.getTanggalJamFormatted(date);
					})
				});
			}
            /*ManageSarpras.getOrderList("daftar-order-ambulance/get-all-daftar-order-ambulance/").then(function (dat) {
				debugger;
				$scope.listOrder = dat.data.data.data;
			});		*/	

			$scope.mainGridOptions = {
                toolbar : ['excel','pdf'],   
                columns: [
					{field: "noRecStrukOrder", hidden: true},
					{"field": "noOrder","title": "<h3>No Order</h3>",width: "100px"},
					{"field": "noCm","title": "<h3>No. Rekam Medis</h3>",width: "200px"},
					{"field": "namaPasien","title": "<h3>Nama Lengkap</h3>",width: "200px"},
					{"field": "umur","title": "<h3>Umur</h3>",width: "200px"},
					{"field": "jenisKelamin","title": "<h3>Jenis Kelamin</h3>",width: "100px"},
					{"field": "alamat","title": "<h3>Alamat Pasien</h3>",width: "300px"},
					// {"field": "statusPerkawinan","title": "<h3>Status Perkawinan</h3>",width: "150px"},
					// {"field": "namaProduk","title": "<h3>Nama Pelayanan</h3>",width: "200px"},
					// {"field": "status","title": "<h3>Status</h3>",width: "200px"},
					{field: "namaRuangan", title: "<h3>Ruangan</h3>"},
					{command: [{text: "Order", click: orderAmbulance, imageClass: "k-icon k-i-pencil"}],width: 90}
				],
                pageable: true,
                selectable: 'row',
            };

			$scope.findAllOrder = function(){
				var listRawRequired = [
					"item.awal|k-ng-model|Periode awal",
					"item.akhir|k-ng-model|Periode akhir"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					$scope.isRouteLoading = true;
					var tanggalAwal = new moment($scope.item.awal).format('YYYY-MM-DD');
					var tanggalAkhir = new moment($scope.item.akhir).format('YYYY-MM-DD');
					ManageSarpras.getOrderList("daftar-order-ambulance/find-by-periode/?periodeAwal="+tanggalAwal+"&periodeAkhir="+tanggalAkhir).then(function (dat) {
						if(!dat.data.data){
							$scope.isRouteLoading = false;
							return toastr.warning('Tidak ada data order pada tanggal '+ tanggalAwal + ' s/d ' + tanggalAkhir);
						};
						let daftarOrder = dat.data.data.data;
						$scope.filter = {}; // reset angular scope.filter values
						$scope.listOrder = new kendo.data.DataSource({
							data: daftarOrder,
							pageSize: 15,
							// total: daftarOrder.length,
							serverPaging: false
						});
						$scope.isRouteLoading = false;
					}, (err) => {
						$scope.isRouteLoading = false;
						throw err;
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			};
			
			// $scope.findAllOrder();

			// $window.kendoAlert = (function () {

			// 	// create modal window on the fly
			// 	var win = $("<div>").kendoWindow({
			// 		modal: true
			// 	}).getKendoWindow();

			// 	return function (msg) {

			// 		// set the content
			// 		win.content(msg);

			// 		// center it and open it
			// 		win.center().open();
			// 	};

			// } ());
			// $scope.columnOrder = [
			// 	{"field": "noOrder","title": "<h3>No Order</h3>",width: "100px"},
			// 	{"field": "noCm","title": "<h3>No. Rekam Medis</h3>",width: "200px"},
			// 	{"field": "namaPasien","title": "<h3>Nama Lengkap Pasien</h3>",width: "200px"},
			// 	{"field": "umur","title": "<h3>Umur</h3>",width: "200px"},
			// 	{"field": "alamat","title": "<h3>Alamat Pasien</h3>",width: "200px"},
			// 	{"field": "jenisKelamin","title": "<h3>Jenis Kelamin</h3>",width: "100px"},
			// 	{"field": "statusPerkawinan","title": "<h3>Status Perkawinan</h3>",width: "150px"},
			// 	{"field": "namaProduk","title": "<h3>Nama Pelayanan</h3>",width: "200px"},
			// 	{"field": "status","title": "<h3>Status</h3>",width: "200px"},
			// ];

			$scope.out = function (noOrder, status) {
				// console.log(kdRuangan);
				
				if (status == "DIPAKAI") {
					kendoAlert("Pemakaian Selesai");
					var tglKeluar = new Date();
					var saveData = {
						"strukOrder": {
							"tglKeluar": tglKeluar.getTime()
						}
					}
					ManageSarpras.saveDataSarPras(saveData, "daftar-order-pemakaian-ruang-rapat/save-status-pemakaian-ruang-rapat/?noOrder=" + noOrder).then(function (e) {
						console.log(JSON.stringify(e.data));
						// $scope.find();

					})
				}
			}

			$scope.klik = function (r) {
				// console.log(JSON.stringify(r));
				$scope.current = r;
			}

			$scope.navToOrderAmbulance = function (current) {
				if (current.noRecStrukOrder != undefined)
                     /*$state.go("OrderAmbulance", {
						noOrder: $scope.current.noRec
					}) // ini gak ada di datanya sy gnti by rendy*/
				   $state.go("OrderAmbulance", {
						noOrder: current.noRecStrukOrder
					})
			}

			// Penambahan fitur pencarian data grid
			var timeoutPromise;
			$scope.$watch('filter.noMr', function(newVal, oldVal){
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function(){
					if(newVal !== oldVal){
						applyFilter('noCm', newVal);
					}
				});
			});
			$scope.$watch('filter.namaPasien', function(newVal, oldVal){
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function(){
					if(newVal !== oldVal){
						applyFilter('namaPasien', newVal);
					}
				});
			});
			$scope.$watch('filter.ruangan', function(newVal, oldVal){
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function(){
					if(newVal !== oldVal){
						applyFilter('namaRuangan', newVal);
					}
				});
			});
			function applyFilter(filterField, filterValue){
				var gridData = $('#gridOrderAmbulance').data("kendoGrid");
				var currFilterObj = gridData.dataSource.filter();
                var currentFilters = currFilterObj ? currFilterObj.filters : [];

                if (currentFilters && currentFilters.length > 0){
                    for(var i = 0; i < currentFilters.length; i++){
                        if(currentFilters[i].field == filterField){
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                currentFilters.push({
                    field: filterField,
                    operator: "contains",
                    value: filterValue
                });

                gridData.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
			}

			$scope.resetFilters = function(){
                var gridData = $("#gridOrderAmbulance").data("kendoGrid");
                $scope.filter = {};
                gridData.dataSource.filter({});
			}
			
			// function click tombol action in grid cell
			function orderAmbulance(e){
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				$scope.navToOrderAmbulance(dataItem);
			}
		}])
})


/*=====================================SOURCE DATA OLD=================================================*/
// $scope.listOrder.forEach(function (data) {
// 	if (data.strukOrder.jenisKonsumsiSet.length == 2) {
// 		data.strukOrder.jenisKonsumsiSet = "Makan dan Snack"
// 	} else if (data.strukOrder.jenisKonsumsiSet.length == 1) {
// 		if (data.strukOrder.jenisKonsumsiSet[0].jenisKonsumsi.id == 1) {
// 			data.strukOrder.jenisKonsumsiSet = "Makan";
// 		} else if (data.strukOrder.jenisKonsumsiSet[0].jenisKonsumsi.id == 2) {
// 			data.strukOrder.jenisKonsumsiSet = "Snack";
// 		}
// 	} else {
// 		data.strukOrder.jenisKonsumsiSet = "-";
// 	}
// 	var date = new Date(data.strukOrder.tglPelayananAwal);
// 	data.strukOrder.tglPelayananAwal = DateHelper.getTanggalJamFormatted(date);
// 	date = new Date(data.strukOrder.tglPelayananAkhir);
// 	data.strukOrder.tglPelayananAkhir = DateHelper.getTanggalJamFormatted(date);


// })

// console.log(JSON.stringify($scope.listOrder[0].jenisKonsumsiSet.length));
// for (var i = $scope.listOrder.length - 1; i >= 0; i--) {
// 	var date = new Date($scope.listOrder[i].tglRapat);
// 	$scope.listOrder[i].tglRapat = DateHelper.getTanggalFormatted(date);
// 	date = new Date($scope.listOrder[i].waktu);
// 	$scope.listOrder[i].waktu = DateHelper.getJamFormatted(date);
// 	var konsumsi = "";
// 	for (var j = 0; j < $scope.listOrder[i].jenisKonsumsiSet.length; j++) {
// 		if(konsumsi != "") konsumsi = konsumsi + ", ";
// 		konsumsi = konsumsi + $scope.listOrder[i].jenisKonsumsiSet[j].jenisKonsumsi.name;
// 	}
// 		$scope.listOrder[i].jenisKonsumsiSet = konsumsi;
// }
// $scope.find();

// $scope.out = function (noOrder, status) {
// 	console.log(noOrder);
// 	if (status == "DIPAKAI") {
// 		var tglKeluar = new Date();
// 		var saveData = {
// 			"strukOrder": {
// 				"tglKeluar": tglKeluar.getTime()
// 			}
// 		}
// 		ManageSarpras.saveDataSarPras(saveData, "daftar-pesan-ambulance/save-status-ambulance/?noOrder=" + noOrder).then(function (e) {
// 			console.log(JSON.stringify(e.data));
// 			$state.find();
// 		})
// 	}
// }