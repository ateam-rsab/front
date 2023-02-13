define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengelolaanRekeningBridgingCtrl', ['$sce', '$q', '$rootScope', '$scope', '$http', 'ModelItemAkuntansi', 'ManageAkuntansi','DateHelper','CacheHelper',
		function($sce, $q, $rootScope, $scope, $http, modelItemAkuntansi, manageAkuntansi,dateHelper,cacheHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.tanggal = $scope.now;
			$scope.dataSelected = {};
			$scope.item = {};
			$scope.dblklik = {};
			$scope.item.cekDebet = false
			$scope.item.cekKredit = false
			$scope.isRouteLoading=false;

            var init = () => {
                var tgl = moment($scope.tanggal).format('YYYY-MM-DD HH:mm:ss');
                manageAkuntansi.getDataTableTransaksi(`akuntansi/get-pengelolaan-rek-bridge?tanggal_transaksi=${tgl}`)
                .then(res => {
                    if(res.data.data.length === 0) {
						toastr.error('Data tidak tersedia!')
					}
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: res.data.data,
                        sort:[
							{
								field: "",
								dir:"asc"
							}
						],
						pageSize: 20,
                    })
                })
            }

            $scope.cariFilter = () => {
                init();
            }

            $scope.optionsDataGrid = {
                sortable: false,
                reorderable: true,
                filterable: false,
                pageable: true,
                columnMenu: false,
                resizable: true,
                selectable: 'row',
                columns: [
                    {
						"field": "kd_bank",
						"title": "<h3>Kode Bank</h3>",
						"width":"70px",
		                "template": "<span class='style-center'>#: kd_bank #</span>"
					},
					
                    {
						"field": "no_rekening",
						"title": "<h3>No. Rekening</h3>",
                        "width":"80px",
                        "template": "<span class='style-right'>#: no_rekening #</span>"
					},

                    {
						"field": "saldo_akhir",
						"title": "<h3>Saldo Akhir</h3>",
                        "width":"80px",
                        "template": "<span class='style-right'>{{formatRupiah('#: saldo_akhir #', 'Rp. ')}}</span>"
					}
                ],

            };

            $scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			};
		}      
	]);
});