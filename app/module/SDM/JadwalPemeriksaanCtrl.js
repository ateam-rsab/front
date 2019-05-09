define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('JadwalPemeriksaanCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSdm', 'JadwalRencanaPemeriksaanService', '$document', 'R',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageSdm, JadwalRencanaPemeriksaanService, $document, r) {
			$scope.now = new Date();
			ModelItem.get("K3/JadwalRencanaPemeriksaan").then(function (data) {
				$scope.item = data;
				$scope.item.satuanKerja = "";
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });

			
			JadwalRencanaPemeriksaanService.getListSatuanKerja("SatuanKerja&select=id,satuanKerja").then(
				function (e) {
					$scope.listSatuanKerja = e.data;
					console.log(JSON.stringify($scope.listSatuanKerja));
				}
			)

			$scope.date = ["date1", "date2", "date3", "date4"];
			$scope.columnJadwal = [
				{
					"field": "pegawai.namaLengkap",
					"title": "<h3>Nama Pegawai</h3>",
					width: "200px"
				},
				{
					"title": "<h3>{{bulan}}</h3>",
					columns: []
				}


			];
			$scope.now = new Date();
			$scope.nows = DateHelper.getTanggalFormatted($scope.now);
			$scope.nows = $scope.nows.split(" ");
			$scope.bulan = $scope.nows[1] + " - " + $scope.now.getFullYear();
			var n = new Date($scope.now.getFullYear(), ($scope.now.getMonth() + 1), 0);
			var j = n.getDate();
			console.log($scope.now.getDate());
			for (var i = 1; i <= j; i++) {
				var newCol = {
					"template": "#=date[" + (i - 1).toString() + "].status#",
					"title": "<h3>" + i + "</h3>",
					width: "35px"
				}
				$scope.columnJadwal[1].columns.push(newCol);
			}

			var initial = function () {
				var a = [];
				for (var i = 1; i <= j; i++) {
					var newData = {
						"status": ""
					}
					a.push(newData);
				}
				return a;
			}

			$scope.Edit = function (data) {
				$state.go("InputJadwal", {
					id: data.supir.id,
					nama: data.supir.namaLengkap
				});
			}
			var bln = $scope.now.getMonth() + 1;

			$scope.show = function(){
				
			}

			$scope.findSatuanKerja = function () {
				ManageSdm.getOrderList("jadwal-rencana-pemeriksaan/find-all-by-date-satuan-kerja/" + bln + "/" + $scope.now.getFullYear() + "/" + $scope.item.satuanKerja.id).then(function (data) {
					$scope.jadwalSupir = [];
					console.log(bln);
					console.log($scope.now.getFullYear());
					var jadwal = data.data.data.data;

					jadwal.forEach(function (dat) {
						// console.log(JSON.stringify(dat));
						var tgl = initial();
						dat.jadwalRencanaPemeriksaan.forEach(function (date) {
							// debugger;
							var idx = new Date(date.tglPemeriksaan);
							idx = idx.getDate() - 1;
							tgl[idx].status = "  V";
						})
						var supir = {
							"pegawai": dat.pegawai,
							"date": tgl
						}
						// console.log(JSON.stringify(supir))
						$scope.jadwalSupir.push(supir);
					})
				})
			}

			 $scope.navToRencanaPemeriksaan = function (selectedData) {
				console.log(JSON.stringify(selectedData.pegawai.id))

                $state.go('RencanaPemeriksaan', {
                    id: selectedData.pegawai.id
                });
            };



		}
	]);
});