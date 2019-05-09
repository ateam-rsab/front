define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('FormulirObservasiHarianTerintegrasiIntensiveCareUnitCtrl', ['$mdDialog', '$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindPasien','ManagePasien', '$window', '$timeout',
		function($mdDialog, $rootScope, $scope,$state, ModelItem, dateHelper,findPasien, ManagePasien, $window, $timeout){
			$scope.now = new Date();
			$scope.title="Formulir Observasi Harian Terintegrasi Intensive Care Unit (ICU)";
			$scope.init = function(){
				findPasien.getParameterObservasi().then(function(data){
					$scope.item = data.data.data;
					$scope.item.ssp = $scope.item[0];
					$scope.item.pesp = $scope.item[1];
					$scope.item.hemodinamik = $scope.item[2];
					$scope.item.intake = $scope.item[3];
					$scope.item.output = $scope.item[4];
					$scope.item.dataLab = $scope.item[5];
				})
			}
			$scope.init();
			$scope.items = {
				from : $scope.now,
				until : $scope.now
			};
            $scope.Column = [{
                field: "observasi",
                title: "Observasi"
			},
			{
                field: "tglObservasi",
                title: "Waktu Observasi",
				headerAttributes: {
					style: "text-align: center"
				},
				columns: [{
					field: "tglObservasi",
					title: "Tanggal",
					template: "#= new moment(new Date(tglObservasi)).format('DD-MM-YYYY') #"
				}, {
					field: "tglObservasi",
					title: "Jam",
					template: "#= new moment(new Date(tglObservasi)).format('hh:mm') #"
				}]
			},
			{
                field: "valueI",
                title: "Nilai I"
			},
			{
                field: "valueII",
                title: "Nilai II"
			}, {
                field: "jenisObservasi",
                title: "Jenis Observasi",
				hidden: true
			}]
			findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
				debugger;
				$scope.dats = ModelItem.beforePost(data.data, true);
				$scope.noRegistrasi = $scope.dats.pasienDaftar.noRegistrasi;
			});
			$scope.lihatData = false; // munculkan tombol lihat data observasi
			$scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
			debugger;
			$scope.cekRadio = function(data, item){
				debugger;
			}
			$scope.cekInput = function(data){
				debugger;
			}

			$scope.Save = function(){
				var tempData = [];
				if ($scope.item.pupilKiri) {
					debugger;
					tempData.push({
						"tglObservasi": $scope.now,
						"observasi": {
							"id": 8
						},
						"pegawai": {
							"id": $scope.pegawai.id
						},
						"noRegistrasi": {
							"noRec": $state.params.noRecDaftar
						},
						"jenisObservasi": {
							"id": 1
						},
						"valueI": $scope.item.pupilKiri.observasi,
						"valueII": $scope.item.pupilKiri.observasi,
					})
				}
				if ($scope.item.pupilKanan) {
					debugger;
					tempData.push({
						"tglObservasi": $scope.now,
						"observasi": {
							"id": 8
						},
						"pegawai": {
							"id": $scope.pegawai.id
						},
						"noRegistrasi": {
							"noRec": $state.params.noRecDaftar
						},
						"jenisObservasi": {
							"id": 1
						},
						"valueI": $scope.item.pupilKanan.observasi,
						"valueII": $scope.item.pupilKanan.observasi,
					})
				}
				$scope.item.forEach(function(x){
					debugger;
					x.details.forEach(function(y){
						if (y.value){
							debugger;
							tempData.push({
								"tglObservasi": $scope.now,
								"observasi": {
									"id": y.idObservasi
								},
								"pegawai": {
									"id": $scope.pegawai.id
								},
								"noRegistrasi": {
									"noRec": $state.params.noRecDaftar
								},
								"jenisObservasi": {
									"id": 1
								},
								"valueI": y.value === undefined ? y.value.observasi : y.value,
								"valueII": y.value === undefined ? y.value.observasi : y.value,
							})
						} else {
							if (y.detail) {
								debugger;
								y.detail.forEach(function(z){
									debugger;
									if (z.value){
										tempData.push({
											"tglObservasi": $scope.now,
											"observasi": {
												"id": z.idObservasi
											},
											"pegawai": {
												"id": $scope.pegawai.id
											},
											"noRegistrasi": {
												"noRec": $state.params.noRecDaftar
											},
											"jenisObservasi": {
												"id": z.idJenisObservasi
											},
											"valueI": z.value.observasi === undefined ? z.value : z.value.observasi,
											"valueII": z.value.observasi === undefined ? z.value : z.value.observasi,
										})
									}
								})
							}
						}
						debugger;
					})
				})
				// console.log(JSON.stringify(tempData));
				ManagePasien.saveObservasiIntCare({
					"listObservasi": tempData
				}).then(function(e){
					$scope.isNext = true;
				})
			}
			
			$scope.findDataObservasi = function(){
				findPasien.getValueObservasi(dateHelper.formatDate($scope.items.from, "YYYY-MM-DD HH:MM"), dateHelper.formatDate($scope.items.until, "YYYY-MM-DD HH:MM"), $scope.noRegistrasi).then(function(e){
					$scope.listPasien = e.data.data;
                    $scope.patienGrids = new kendo.data.DataSource({
                        data: $scope.listPasien,
                        group: [
							{field: "tglObservasi"},
							{field: "jenisObservasi"},
						]
                    });
				})
				debugger;
			}
			$scope.lihatDaftar = function(){
				$scope.findDataObservasi();
				$scope.lihatData = true;
			}
			$scope.Kembali = function(){
				$scope.init();
				$scope.lihatData = false;
			}
		}
	])
})