define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarSppbDibuatCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'PengajuanUsulanAnggaranService',
		function($rootScope, $scope, $state, DateHelper, ModelItem, PengajuanUsulanAnggaranService) {
			// ModelItem.get("PengajuanUsulan/DaftarPengajuanUsulan").then(function(data) {
			// 	$scope.item = data;
			// 	$scope.now = new Date();
			// 	$scope.dataVOloaded = true;

			// 	$scope.item.pengadaan = "LELANG";
			// 	$scope.item.noUsulan = "016000100c";
			// 	$scope.item.tanggal = "2016-9-27";
			// 	$scope.item.total = "121000";
			// 	$scope.item.jumlah = 21;
				

			// }, function errorCallBack(err) {});

			PengajuanUsulanAnggaranService.getGetData("Rekanan&select=id,namaRekanan").then(function(data) {
                $scope.listSuplier = data;
            });

			$scope.mainGridOptions = {
		        pageable: true,
		        selectable: "row",
		        columns: [
		          	{
						field: "no",
						title: "No",
						width: 40,
						attributes: {
							style: "text-align:center"
						}
					},
					{
						field: "tanggalSppb",
						title: "Tanggal",
						width: 100
					},
					{
						field: "noSppb",
						title: "No SPPB",
						width: 150
					},
					{
						field: "noKontrak",
						title: "No Kontrak",
						width: 150
					},
					{
						field: "namaRekanan",
						title: "Nama Supplier",
						width: 200
					},
					{
						field: "totalSppb",
						title: "Total SPPB",
						width: 80,
						format: "{0:n0}",
						attributes: {
							style: "text-align:right"
						}
					},
					{
						field: "tanggalKartuKendali",
						title: "Tanggal Pengadaan",
						width: 80
					},
					{
						field: "verifikasi",
						title: "Status",
						width: 120
					}
				]//,
		    	// /editable: true
	      	};

            var init = function() {
				$scope.now = new Date();
            	$scope.item = {
            		dari: $scope.now,
            		sampai: $scope.now,
            		kelUser: document.cookie.split(';')[0].split('=')[1]
            	};
				$scope.dataVOloaded = true;

				$scope.dataSource = new kendo.data.DataSource({
			        data: []
			    });

            	PengajuanUsulanAnggaranService.getKomponen("sppb/list-sppb").then(function(data){
	      			$scope.dataGrid = data.data.data;

	      			var i = 1;
	      			$scope.dataGrid.forEach(function(items){
	      				items.no = i;
	      				$scope.dataSource.add(items);
	      				i++;
	      			})
	      		})

	      		$scope.dataSource.fetch();
            }

            init();

            $scope.kl = function(current) {
            	$scope.current = current;
            	if ($scope.current.verifikasi === "UNVERIF_SPPB_PPK") {
            		$scope.isEditable = true;
            	} else {
            		$scope.isEditable = false;
            	}
            	console.log(current);
            }
			$scope.verifikasi = function(){
				$state.go('VerifikasiSppb', {
					noRec: $scope.current.noRec
				})
			}
			$scope.edit = function(){
				$state.go('EditSppb', {
					noRec: $scope.current.noRec
				})
			}

       //      $scope.$watch('item.namaRekanan', function(e) {
       //      	$scope.dataSource = new kendo.data.DataSource({
			    //     data: []
			    // });

       //          if (e === undefined) return;
       //          if ($scope.item.dari !== $scope.now && $scope.item.sampai !== $scope.now) {
	      // 			var date = "?dateStart="+$scope.item.dari+"&dateEnd="+$scope.item.sampai
	      // 		}else{
	      // 			var date = "?dateStart=&dateEnd="
	      // 		}
       //          var supplier = "&supplierId="+e.id
       //          PengajuanUsulanAnggaranService.getKomponen("sppb/list-sppb"+date+supplier).then(function(data){
	      // 			$scope.dataGrid = data.data.data;

	      // 			var i = 1;
	      // 			$scope.dataGrid.forEach(function(items){
	      // 				items.no = i;
	      // 				$scope.dataSource.add(items);
	      // 				i++;
	      // 			})
	      // 		})

	      // 		$scope.dataSource.fetch();
       //      })

	      	$scope.Search = function(){
	      		var dateAwal = DateHelper.getPeriodeFormatted(new Date($scope.item.dari));
	      		var dateAhir = DateHelper.getPeriodeFormatted(new Date($scope.item.sampai));
	      		if (dateAwal !== undefined && dateAhir !== undefined) {
	      			var date = "?dateStart="+dateAwal+"&dateEnd="+dateAhir;
	      		} else {
	      			var date = "?dateStart=&dateEnd=";
	      		}

	      		if ($scope.item.namaRekanan !== undefined) {
	      			var supplier = "&supplierId="+$scope.item.namaRekanan.id;
	      		} else {
	      			var supplier = "&supplierId=";
	      		}
	      		debugger;
	      		$scope.dataSource = new kendo.data.DataSource({
				    data: []
				});
	      		PengajuanUsulanAnggaranService.getKomponen("sppb/list-sppb"+date+supplier).then(function(data){
	      			$scope.dataGrid = data.data.data;

	      			var i = 1;
	      			$scope.dataGrid.forEach(function(items){
	      				items.no = i;
	      				$scope.dataSource.add(items);
	      				i++;
	      			})
	      		})

	      		$scope.dataSource.fetch();
	      	}
	      	$scope.Cancel = function() {
            	init();
	      	}
		}
	]);
});