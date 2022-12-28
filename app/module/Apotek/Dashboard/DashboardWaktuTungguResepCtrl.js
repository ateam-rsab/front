define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DashboardWaktuTungguResepCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper', 'DateHelper', 'ManageTataRekening',
		function ($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper, dateHelper, manageTataRekening) {

			$scope.item = {};
			$scope.formatTanggal = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}
			$scope.columnOptions = {
				selectable: 'row',
				pageable: true,
				resizable: true,
				navigatable: true,
				columns: [
					{
						"field": "tanggal_resep",
						"title": "Tgl Registrasi",
						"width": 80,
						"template": "<span class='style-left'>{{formatTanggal('#: tanggal_resep #')}}</span>"
					},
					{
						"field": "nomor_resep",
						"title": "No Resep",
						"width": 80
					},
					{
						"field": "noregistrasi",
						"title": "No Registrasi",
						"width": 80
					},
					{
						"field": "nocmfk",
						"title": "No RM",
						"width": 80,
						"template": "<span class='style-right'>#: nocmfk #</span>"
					},
					{
						"field": "nama_pasien",
						"title": "Nama Pasien",
						"width": 150,
						"template": "<span class='style-center'>#: nama_pasien #</span>"
					},
					{
						"field": "waktutunggu",
						"title": "Waktu Tunggu",
						"width": 100,
						"template": "<span class='style-center'>#: waktutunggu #</span>"
					},
					{
						"field": "status",
						"title": "Status",
						"width": 100,
						"template": "<span class='style-center'>#: status #</span>"
					},
					{
						"field": "kelompok_pasien",
						"title": "",
						"width": 100,
						"template": "<span class='style-center'><strong>#: kelompok_pasien #</strong></span>"
					}
				],
				dataBound: function () {
					// $('.k-grid-header-wrap').css({'touch-action': 'auto'})
					// $('.k-selectable').css({'touch-action': 'auto'})
				}
			};

			const loadData = () => {
				let dataResponse='';
				$scope.isRouteLoading = true;
				manageTataRekening.getDataTableTransaksi("apotik/dashboard",false)
				.then((data)=>{
					// $scope.item.antren = data.data.data;
					dataResponse = data.data.data;
				})
				.then((data)=>{
					let newArr=[];
					dataResponse.forEach(dataResponse => {
						if(dataResponse.time_proses){
							dataResponse['status'] = "Proses";
							dataResponse['waktutunggu']=dataResponse.time_proses;
							if(dataResponse.time_selsai){
								dataResponse['status'] = "Selesai";
								dataResponse['waktutunggu']=dataResponse.time_selsai;
								if(dataResponse.time_diserahkan){
									dataResponse['status'] = "Diserahkan";
									dataResponse['waktutunggu']=dataResponse.time_diserahkan;
								}
							}
						}else{
							dataResponse['status'] = "?";
							dataResponse['waktutunggu']='';
						}
						newArr.push(dataResponse)
					});
					$scope.item.antren=newArr;
				})
				.then((data)=>{
					$scope.daftarWaktuTungguResep = new kendo.data.DataSource({
						data: $scope.item.antren,
						pageSize: 10,
						serverPaging: false,
						schema: {
							model: {
								fields: {}
							}
						}
					});
				})
				.finally(()=>{
					$scope.isRouteLoading = false;
				})
			}
			loadData();

			setInterval(() => {
				loadData();
			}, 30000);
		}
	]);
});