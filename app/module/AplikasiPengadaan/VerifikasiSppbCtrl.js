define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('VerifikasiSppbCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ModelItem', 'PengajuanUsulanAnggaranService',
		function($rootScope, $scope, $state, DateHelper, ModelItem, PengajuanUsulanAnggaranService) {
			$scope.item = {
				kelUser: document.cookie.split(';')[0].split('=')[1]
			};
			debugger;
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			if ($scope.item.kelUser === "ppk") {
				$scope.isNotPpk = false;
			} else {
				$scope.isNotPpk = true;
			}

			$scope.dataSource = new kendo.data.DataSource({
				data: [],
			    aggregate: [
	                { field: "subTotal", aggregate: "sum" }
	            ],
	            editable: true,
				schema: {
					model: {
						fields: {
							spesifikasi: { editable: false},
							namaProduk: { editable: false},
							keterangan: { type: "string"},
		            		qtyKontrak: { type: "number", editable: false},
		            		qtySppb: { type: "number", editable: false},
		            		hargaSatuan: { type: "number", editable: false},
		            		hargadiscount: { type: "number", editable: false},
		            		hargaPpn: { type: "number", editable: false},
		            		subTotal: { type: "number", editable: false}
		            	}
		            }
		        }
			});
			
			PengajuanUsulanAnggaranService.getDetilSppb($state.params.noRec).then(function(data){
				$scope.item = data.data.sppb;
				$scope.item.tanggalKartuKendali = new Date($scope.item.tanggalKartuKendali);
				$scope.item.tanggalSppb = new Date($scope.item.tanggalSppb);

				$scope.item.totalSppb = Math.floor($scope.item.totalSppb).toLocaleString();

				$scope.itemDetil = data.data.detailSppb;
				var i = 1;
				$scope.itemDetil.forEach(function(dats){
					dats.no = i;
					dats.subTotal = dats.qtySppb * dats.hargaPpn;

					$scope.dataSource.add(dats);
					i++;
				})
			})

			$scope.mainGridOptions = {
		        columns: [
		          	{
						field: "no",
						title: "No",
						width: 40,
						type: "number"
					},
					{
						field: "spesifikasi",
						title: "Spesifikasi",
						width: 200
					},
					{
						field: "namaProduk",
						title: "Nama Produk",
						width: 250
					},
					{
						field: "keterangan",
						title: "Keterangan",
						width: 200
					},
					{
						title: "Volume",
						columns: [{
							field: "qtyKontrak",
							title: "Kontrak",
							width: 60,
							template: "<div class=\"pull-right\">#=kendo.toString(qtyKontrak, \"n0\")#</div>"
						},
						{
							field: "qtySppb",
							title: "Sppb",
							width: 60,
							template: "<div class=\"pull-right\">#=kendo.toString(qtySppb, \"n0\")#</div>"
						}]
					},
					{
						field: "hargaSatuan",
						title: "Harga Satuan",
						width: 100,
						template: "<div class=\"pull-right\">#=kendo.toString(hargaSatuan, \"n0\")#</div>"
					},
					{
						field: "hargadiscount",
						title: "Harga Diskon",
						width: 100,
						template: "<div class=\"pull-right\">#=kendo.toString(hargadiscount, \"n0\")#</div>"
					},
					{
						field: "hargaPpn",
						title: "Harga PPn",
						width: 100,
						template: "<div class=\"pull-right\">#=kendo.toString(hargaPpn, \"n0\")#</div>"
					},
					{
						field: "subTotal",
						title: "Sub Total",
						width: 100,
						template: "<div class=\"pull-right\">#=kendo.toString(subTotal, \"n0\")#</div>",
						aggregates: "[\"sum\"]",
                    	footerTemplate: "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
					}
				]
	      	};

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

		    $scope.notf1Options = {
	            position: {
	                pinned: true,
	            	top: 30,
	                right: 30
	            },
	            autoHideAfter: 3000,
	            stacking: "down",
	            templates: [{
	                type: "ngTemplate",
	                template: $("#notificationTemplate").html()
	            }]
	        };

	        $scope.showPopup = function () {
	            $scope.notf1.show({
	                title: "Informasi",
	                message: $scope.messages
	            }, "ngTemplate");
	        }

			$scope.Verif = function(){

				var tempData = {
					"noRec": $state.params.noRec
				}
				PengajuanUsulanAnggaranService.savePengajuan(tempData, "sppb/verifikasi-sppb").then(function(e){
					console.log(JSON.stringify(tempData));
				});
			};

			$scope.Unverif = function(){

				var tempData = {
					"noRec": $state.params.noRec,
					"keterangan": $scope.item.keterangan
				}
				PengajuanUsulanAnggaranService.savePengajuan(tempData, "sppb/unverifikasi-sppb").then(function(e){
					console.log(JSON.stringify(tempData));
				});
			};

			$scope.batal = function() {
			  	window.history.back();
			};
		}
	]);
});