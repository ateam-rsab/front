define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengeluaranBridgingCtrl', ['$sce', '$q', '$rootScope', '$scope', '$http', 'ModelItemAkuntansi', 'ManageAkuntansi','DateHelper','CacheHelper',
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

			$scope.dataLists = [
				{
					"kd_akun": "",
					"jumlah": parseInt("")
				}
			]
			
			$scope.addDataLists = () => {
				$scope.dataLists.push({
					"kd_akun": "",
					"jumlah": parseInt("")
				})
			}

            $scope.postData = () => {
				let body = {
					"data": $scope.dataLists
				};

				$scope.postListPenerimaan = () => {
					manageAkuntansi.postpost(body, 'akuntansi/add-pengeluaran-bridge')
					.then(res => {
						console.log(res)
					})
				}                                        

				$scope.postListPenerimaan();

            }

			var init = () => {
				var tglAwal = moment($scope.tanggal).format('YYYY-MM-DD HH:mm:ss');
				manageAkuntansi.getDataTableTransaksi(`akuntansi/get-pengeluaran-bridge?tanggal_transaksi=${tglAwal}`)
				.then((res)=>{
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
                // toolbar: ["excel"],
                // excel: {
                //     fileName: "Jurnal " + moment($scope.item.tglAwal).format( 'DD/MMM/YYYY'),
                //     allPages: true,
                // },
                sortable: false,
                reorderable: true,
                filterable: false,
                pageable: true,
                columnMenu: false,
                resizable: true,
                selectable: 'row',
                columns: [
                    {
						"field": "kd_akun",
						"title": "<h3>Kode Akun</h3>",
						"width":"70px",
		                "template": "<span class='style-center'>#: kd_akun #</span>"
					},
					
                    {
						"field": "jumlah",
						"title": "<h3>Jumlah</h3>",
                        "width":"80px",
                        "template": "<span class='style-center'>{{formatRupiah('#: jumlah #', 'Rp.')}}</span>"
					}
                ],

            };

			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			};
		}
	]);
});