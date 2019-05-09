define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RekapKontrakPengadaanCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'PengajuanUsulanAnggaranService',
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
		        columns: [
		          	{
						field: "no",
						title: "No",
						width: 40,
						type: "number"
					},
					{
						field: "noRekap",
						title: "No Kontrak",
						type: "number",
						width: 80,
						// hidden: true
					},
					{
						field: "kegiatanDetail",
						title: "Nama Kegiatan",
						width: 200,
						type: "string"
					},
					{
						title: "Supplier",
						columns: [{
							field: "namaRekanan",
							title: "Nama Supplier",
							width: 180,
							type: "string"
						},
						{
							field: "pjSupplier",
							title: "Penanggung Jawab",
							width: 180,
							type: "string"
						},
						{
							field: "alamatLengkapSupplier",
							title: "Alamat",
							width: 180,
							type: "string"
						}]
					},
					{
						field: "nilaiKontrak",
						title: "Nilai Kontrak",
						width: 100,
						type: "numeric",
						template: "<div class=\"pull-right\">#=kendo.toString(nilaiKontrak, \"n0\")#</div>"
					},
					{
						field: "namaPengadaan",
						title: "Jenis Kontrak",
						width: 100,
						type: "string"
					},
					// {
					// 	field: "periodeKontrak",
					// 	title: "Jangka Waktu",
					// 	width: 180,
					// 	type: "datetime"
					// },
					// {
					// 	field: "linkDokumen",
					// 	title: "Link Dokumen",
					// 	width: 180,
					// 	type: "string"
					// },
					// {
					// 	field: "totalPenerimaan",
					// 	title: "Total Penerimaan",
					// 	width: 180,
					// 	type: "numberic",
					// 	template: "<div class=\"pull-right\">#=kendo.toString(totalPenerimaan, \"n0\")#</div>"
					// },
					// {
					// 	field: "sisaKontrak",
					// 	title: "Sisa Kontrak",
					// 	width: 180,
					// 	type: "numberic",
					// 	template: "<div class=\"pull-right\">#=kendo.toString(sisaKontrak, \"n0\")#</div>"
					// },
					// {
					// 	field: "status",
					// 	title: "Status",
					// 	width: 180,
					// 	type: "string"//,
					// 	//template: "<input style=\"width: 100%\" kendo-date-time-picker k-ng-model=\"item.tanggalAwal\" placeholer=\"{{item.now}}\"/>"
					// }
				]//,
		    	// /editable: true
	      	};

            var init = function() {
            	$scope.item = {};
				$scope.now = new Date();
				$scope.item.dari = $scope.now;
				$scope.item.sampai = $scope.now;
				$scope.dataVOloaded = true;

				$scope.dataSource = new kendo.data.DataSource({
			        data: []
			    });

            	PengajuanUsulanAnggaranService.getKomponen("kartu-pengendali/list-kontrak-grid").then(function(data){
	      			$scope.dataGrid = data.data.data;

	      			var i = 1;
	      			$scope.dataGrid.forEach(function(data) {
	      				if (data.totalPenerimaan === undefined)
	      					data.totalPenerimaan = 0;
	      				if (data.sisaKontrak === undefined)
	      					data.sisaKontrak = 0;
	      				data.no = i;
	      				$scope.dataSource.add(data);
	      				i++;
	      			})
	      		})

	      		$scope.dataSource.fetch();
            }

            init();

			$scope.navToDetailPemenang = function(){

			}

	      	$scope.Search = function(){
	      		if ($scope.item.dari !== $scope.now && $scope.item.sampai !== $scope.now) {
	      			var date = "?dateStart="+$scope.item.dari+"&dateEnd="+$scope.item.sampai
	      		}else{
	      			var date = "?dateStart=&dateEnd="
	      		}

	      		if ($scope.item.namaRekanan !== undefined) {
	      			var supplier = "&supplierId="+$scope.item.namaRekanan.id
	      		} else {
	      			var supplier = "&supplierId="
	      		}

	      		$scope.dataSource = new kendo.data.DataSource({
					data: []
				});
	      		PengajuanUsulanAnggaranService.getKomponen("kartu-pengendali/list-kontrak-grid"+date+supplier).then(function(data){
	      			$scope.dataGrid = data.data.data;

	      			var i = 1;
	      			$scope.dataGrid.forEach(function(data) {
	      				if (data.totalPenerimaan === undefined)
	      					data.totalPenerimaan = 0;
	      				if (data.sisaKontrak === undefined)
	      					data.sisaKontrak = 0;
	      				data.no = i;

	      				$scope.dataSource.add(data);
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