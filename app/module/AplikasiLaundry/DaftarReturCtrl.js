define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarReturCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageLaundry',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageLaundry) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.daftarPencucianLinen = new kendo.data.DataSource({
				data: [

				]
			});

			$scope.kl = function (current) {
				$scope.current = current;
				$scope.item.nmmesin = current.namaMesin;
				$scope.item.kapasitas = current.kapasitas;
				$scope.item.namaPetugas = current.namaPetugas;
				$scope.item.beratLinen = current.beratLinen;
				$scope.item.prosesCuci = current.namaProdukProsesCuci;
				$scope.item.mesinId = current.mesinId;
				$scope.item.petugasId = current.petugasId;
				$scope.item.noRecStrukPelayanan = current.noRecStrukPelayanan;
				$scope.item.namaPelanggan = current.namaPelanggan;
				$scope.item.ruanganAsalId = current.ruanganAsalId;
				//console.log(JSON.stringify($scope.item.id));
			}


			$scope.pindah = function (current) {

				$state.go("Pelipatan", { noRecStrukPelayanan: $scope.item.noRecStrukPelayanan, namaPelanggan: $scope.item.namaPelanggan, ruanganAsalId: $scope.item.ruanganAsalId });

			}


			$scope.Proses = function () {

				var gaji = moment($scope.item.awal).format("YYYY-MM-DD 00:00:00");
				var kerja = moment($scope.item.akhir).format("YYYY-MM-DD hh:mm:ss");


				debugger;
				ManageLaundry.getOrderList("laundry/get-all-retur-linen?startPeriode=" + gaji + "&endPeriode=" + kerja).then(function (dat) {
					debugger;
					$scope.sourceOrder = dat.data.data;


					debugger;
				});

			}



			var onChange = function (e) {
				//var inputId = this.element.attr("id");
				//  console.log(inputId);
				var grid = $(this).data("mainGridOptions");

			}


			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}




			$scope.mainGridOptions = {
				pageable: true,
				change: onChange,
				pageSize: 10,
				selectable: 'row',
				scrollable: true,
				filterable: {
					extra: false,
					operators: {
						string: {
							startswith: "Dimulai dengan",
							contains: "mengandung kata",
							neq: "Tidak mengandung kata"
						}
					}
				},
				columns: [{
					"field": "noPelanggan",
					"title": "Nomor Pelanggan ",
					"filterable": false
				}, {

					"field": "namaPelanggan",
					"title": "Nama Lengkap",
					"filterable": true
				}, {
					"field": "alamat",
					"title": "Alamat",
					"width": "200px",
					"filterable": false

				}, {
					"field": "noTelepon",
					"title": "Nomor Telepon",
					"filterable": false
				}, {
					"field": "noRetur",
					"title": "Nomor Retur",
					"filterable": false
				}]
			};







			//  $scope.pengeringan=function() {
			//  	$state.go("Pengeringan")
			//  }

		}
	]);
});