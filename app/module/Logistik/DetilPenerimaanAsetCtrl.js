define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetilPenerimaanAsetCtrl', ['$sce', '$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'FindSarpras',
		function($sce, $rootScope, $scope, $state, DateHelper, ModelItem, findSarpras) {
			$scope.item = {
				kelUser: document.cookie.split(';')[0].split('=')[1]
			};

			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.isNext = true;
			$scope.isReport = true;
			$scope.isQrCode = true;
			
			$scope.dataSource = new kendo.data.DataSource({
				data: [],
			    aggregate: [
	                { field: "jumlahHarga", aggregate: "sum" }
	            ],
	            editable: true,
				schema: {
					model: {
						fields: {
							kdBarang: { editable: false},
							namaBarang: { editable: false},
							satuan: { type: "string"},
		            		hargaSatuan: { type: "number", editable: false},
		            		banyakNya: { type: "number", editable: false},
		            		jumlahHarga: { type: "number"}
		            	}
		            }
		        }
			});
			$scope.mainGridOptions = {
		        columns: [
		   //        	{
					// 	field: "no",
					// 	title: "No",
					// 	width: 40,
					// 	type: "number"
					// },
					{
						field: "kdBarang",
						title: "Kode Barang",
						width: 200
					},
					{
						field: "namaBarang",
						title: "Nama Barang",
						width: 250
					},
					{
						field: "satuan",
						title: "Satuan",
						width: 200
					},
					{
						field: "banyakNya",
						title: "Qty",
						width: 60,
						template: "<div class=\"pull-right\">#=kendo.toString(banyakNya, \"n0\")#</div>"
					},
					{
						field: "hargaSatuan",
						title: "Harga Satuan",
						width: 100,
						template: "<div class=\"pull-right\">#=kendo.toString(hargaSatuan, \"n0\")#</div>"
					},
					{
						field: "jumlahHarga",
						title: "Sub Total",
						width: 100,
						format: "{0:n0}",
						template: "<div class=\"pull-right\">#=kendo.toString(jumlahHarga, \"n0\")#</div>",
						aggregates: "[\"sum\"]",
						"footerTemplate": "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
					}
				]
	      	};

			if ($state.params.noRec !== undefined) {
				findSarpras.getTerimaDetil($state.params.noRec).then(function(e){
					$scope.items = e.data;

					$scope.items.detail.forEach(function(e){
						$scope.dataSource.add(e)
					})
					// $scope.item.header.tanggalDokumen = DateHelper.getPeriodeFormatted($scope.item.header.tanggalDokumen);
					// $scope.item.header.tanggalSpk = DateHelper.getPeriodeFormatted($scope.item.header.tanggalSpk);
					// $scope.item.header.tanggalKontrak = DateHelper.getPeriodeFormatted($scope.item.header.tanggalKontrak);
				})
			} else {}

			$scope.kl = function(current){
				$scope.current = current;
				console.log(current);
			}
		  	$scope.handleChange = function(data, dataItem, columns) {
		      	$scope.data = data;
		      	$scope.columns = columns;
		      	$scope.dataItem = dataItem;
		    };
		    $scope.$watch('item.disc', function(e) {
		    	if (!$scope.item.disc) return;
		    	$scope.tempDisc = $scope.item.total * ($scope.item.disc / 100);

		    	$scope.item.total = $scope.item.total - $scope.tempDisc;
		    });

			// $scope.Verif = function(){

			// 	var tempData = {
			// 		"noRec": $state.params.noRec
			// 	}
			// 	PengajuanUsulanAnggaranService.savePengajuan(tempData, "sppb/verifikasi-sppb").then(function(e){
			// 		console.log(JSON.stringify(tempData));
			// 	});
			// };

			// $scope.Unverif = function(){

			// 	var tempData = {
			// 		"noRec": $state.params.noRec,
			// 		"keterangan": $scope.item.keterangan
			// 	}
			// 	PengajuanUsulanAnggaranService.savePengajuan(tempData, "sppb/unverifikasi-sppb").then(function(e){
			// 		console.log(JSON.stringify(tempData));
			// 	});
			// };

			$scope.batal = function() {
			  	window.history.back();
			};

			$scope.cetak = function() {
				var getDetailID = $state.params.noRec;
				console.log(getDetailID);
                $scope.urlBilling = $sce.trustAsResourceUrl(findSarpras.reportTerimaSupplier(getDetailID));
                window.open($scope.urlBilling, '','width=800,height=600');
			}

			$scope.cetakQR = function() {
				if ($scope.item.kelUser === "logistik") {
					var getDetailID = $state.params.noRec;
					console.log(getDetailID);
	                $scope.urlBilling = $sce.trustAsResourceUrl(findSarpras.cetakQr(getDetailID));
	                window.open($scope.urlBilling, '','width=800,height=600');
				} else {
					var getDetailID = $state.params.noRec;
					console.log(getDetailID);
	                $scope.urlBilling = $sce.trustAsResourceUrl(findSarpras.cetakQrAset(getDetailID));
	                window.open($scope.urlBilling, '','width=800,height=600');
				}
			}
		}
	]);
});