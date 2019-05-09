define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('JadwalSupirAmbulanceCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', '$state',
		function ($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, $state) {
			$scope.title = "";
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.item.ruangan = "Ambulan";

			$scope.date = ["date1", "date2", "date3", "date4"];
			$scope.columnJadwal = [
				{
					"field": "supir",
					"title": "<h3>Nama Supir</h3>",
					width: "200px"
				},
				{
					// "title": "<h3>{{bulan}}</h3>",
					columns: []
				}


			];

			// $scope.selectedPeriode = function (periode) {
			// 	debugger;
			// 	$scope.now = new Date(periode);
			// 	$scope.nows = DateHelper.getTanggalFormatted($scope.now);
			// 	$scope.nows = $scope.nows.split(" ");
			// 	$scope.bulan = $scope.nows[1] + " - " + $scope.now.getFullYear();
			// 	var n = new Date($scope.now.getFullYear(), ($scope.now.getMonth() + 1), 0);
			// 	var j = n.getDate();
			// 	console.log($scope.now.getDate());
			// 	for (var i = 1; i <= j; i++) {
			// 		var newCol = {
			// 			"template": "# if(date[" + (i - 1).toString() + "].jadwalPraktekVO.reportDisplay != undefined) {# <div class='center'>#=date[" + (i - 1).toString() + "].jadwalPraktekVO.reportDisplay#</div> #} else{##}#",
			// 			"title": "<h3>" + i + "</h3>",
			// 			width: "50px"
			// 		}
			// 		$scope.columnJadwal[1].columns.push(newCol);
			// 	}

			// 	ManageSarpras.getOrderList("jadwalDokter/get-jadwal-supir-ambulance/" + $scope.now.getMonth() + "/" + $scope.now.getFullYear()).then(function (data) {
			// 		$scope.jadwalSupir = [];
			// 		var jadwal = data.data.data.data;
			// 		jadwal.forEach(function (dat) {
			// 			// debugger;

			// 			var tgl = initial();
			// 			dat.jadwalSupirDetailSet.forEach(function (date) {
			// 				var idx = new Date(date.tanggal);
			// 				idx = idx.getDate() - 1;
			// 				tgl[idx].jadwalPraktekVO = date.jadwalPraktekVO;
			// 			})
			// 			var supir = {
			// 				"supir": dat.pegawai,
			// 				"date": tgl
			// 			}

			// 			$scope.jadwalSupir.push(supir);
			// 		})
			// 	})

			// }

			$scope.selectedPeriode = function (periode) {
				debugger;
				$scope.now = new Date(periode);
				$scope.nows = DateHelper.getTanggalFormatted($scope.now);
				$scope.nows = $scope.nows.split(" ");
				$scope.bulan = $scope.nows[1] + " - " + $scope.now.getFullYear();
				var n = new Date($scope.now.getFullYear(), ($scope.now.getMonth() + 1), 0);
				var j = n.getDate();
				console.log($scope.now.getDate());
				for (var i = 1; i <= j; i++) {
					var newCol = {
						"template": "# if(date[" + (i - 1).toString() + "].jadwalPraktekVO.reportDisplay != undefined) {# <div class='center'>#=date[" + (i - 1).toString() + "].jadwalPraktekVO.reportDisplay#</div> #} else{##}#",
						"title": "<h3>" + i + "</h3>",
						width: "50px"
					}
					$scope.columnJadwal[1].columns.push(newCol);
				}

				ManageSarpras.getOrderList("jadwalDokter/get-jadwal-supir-ambulance/" + parseInt($scope.now.getMonth()+1) + "/" + $scope.now.getFullYear()).then(function (data) {
					$scope.jadwalSupir = [];
					var jadwal = data.data;
					jadwal.forEach(function (dat) {
						// debugger;

						var tgl = initial();
						dat.listJadwal.forEach(function (date) {
							var idx = new Date(date.tglJadwal);
							idx = idx.getDate() - 1;
							tgl[idx].jadwalPraktekVO = date;
						})
						var supir = {
							"supir": dat.pegawai.namaLengkap,
							"date": tgl
						}

						$scope.jadwalSupir.push(supir);
					})
				})

			}

			$scope.now = new Date();
			$scope.nows = DateHelper.getTanggalFormatted($scope.now);
			$scope.nows = $scope.nows.split(" ");
			$scope.bulan = $scope.nows[1] + " - " + $scope.now.getFullYear();
			var n = new Date($scope.now.getFullYear(), ($scope.now.getMonth() + 1), 0);
			// var j = n.getDate();
			var j = 31;
			console.log($scope.now.getDate());
			for (var i = 1; i <= j; i++) {
				var newCol = {
					"template": "# if(date[" + (i - 1).toString() + "].jadwalPraktekVO.reportDisplay != undefined) {# <div class='center'>#=date[" + (i - 1).toString() + "].jadwalPraktekVO.reportDisplay#</div> #} else{##}#",
					"title": "<h3>" + i + "</h3>",
					width: "50px"
				}
				$scope.columnJadwal[1].columns.push(newCol);
			}

			ManageSarpras.getOrderList("jadwalDokter/get-jadwal-supir-ambulance/" + parseInt($scope.now.getMonth()+1) + "/" + $scope.now.getFullYear()).then(function (data) {
				debugger;
				$scope.jadwalSupir = [];
				var jadwal = data.data;
				jadwal.forEach(function (dat) {
					// debugger;

					var tgl = initial();
					dat.listJadwal.forEach(function (date) {
						var idx = new Date(date.tglJadwal);
						idx = idx.getDate() - 1;
						tgl[idx].jadwalPraktekVO = date;
					})
					var supir = {
						"supir": dat.pegawai.namaLengkap,
						"date": tgl
					}

					$scope.jadwalSupir.push(supir);
				})
			})


			var initial = function () {
				var a = [];
				for (var i = 1; i <= j; i++) {
					var newData = {
						"jadwalPraktekVO": {
							"id": ""
						}
					}
					a.push(newData);
				}
				return a;
			}

			$scope.Edit = function (data) {
				debugger;
				$state.go("InputJadwal", {
					id: data.date[0].jadwalPraktekVO.id,
					nama: data.supir
				});
			}
			$scope.monthSelectorOptions = {
				start: "year",
				depth: "year"
			};

			ManageSarpras.getListData("JadwalPraktek&select=namaExternal,reportDisplay,jamPraktek").then(function (data) {
				$scope.keterangan = data.data;
				$scope.listKeterangan = data.data;
			})





			$scope.columnKeterangan = [
				{
					"field": "reportDisplay",
					"title": "<h3>Report Display</h3>",
					width: "100px"
				},
				{
					"field": "namaExternal",
					"title": "<h3>Nama External</h3>",
					width: "150px"
				},
				{
					"field": "jamPraktek",
					"title": "<h3>Jam Praktek</h3>",
					width: "150px"
				}

			];

		}])
})