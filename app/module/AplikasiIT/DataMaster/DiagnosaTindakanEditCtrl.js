define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DiagnosaTindakanEditCtrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSarprasPhp', 'ModelItem', '$mdDialog','ManageLogistikPhp',
		function ($q, $rootScope, $scope, $state, ManageSarprasPhp, ModelItem, $mdDialog,manageLogistikPhp) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			// $scope.isRouteLoading = true;
			$scope.kembali = function () {
				$state.go('DiagnosaTindakanRev')
			}
			$scope.loginOperator=true;
			$scope.riwayatRegistrasi = function () {
				$state.go('RiwayatRegistrasi2')
			}
			load()

			function load() {

				if ($state.params.idx != "") {
					$scope.item.id = $state.params.idx;
					ManageSarprasPhp.getDataTableTransaksi("diagnosatindakan/get-diagnosabyid/" +
						$scope.item.id, true).then(function (e) {
							var datax = e.data;
						// $scope.isRouteLoading = false;

						$scope.item.id = e.data[0].id;
						$scope.item.kdprofile = e.data[0].kdprofile;
						$scope.item.statusenabled = e.data[0].statusenabled;
						$scope.item.norec = e.data[0].norec;
						$scope.item.kdDiagnosa = e.data[0].kddiagnosatindakan;
						$scope.item.namaDiagnosa = e.data[0].namadiagnosatindakan;
						$scope.item.kategorydiagnosa = { id: e.data[0].objectkategorydiagnosafk, kategorydiagnosa: e.data[0].kategorydiagnosa };
						$scope.item.kdExternal = e.data[0].kodeexternal;
						$scope.item.namaExternal = e.data[0].namaexternal;
						$scope.item.reportDisplay = e.data[0].reportdisplay;
				

					})
					}
				//$scope.load();
			}


		


			ManageSarprasPhp.getDataTableTransaksi("diagnosatindakan/get-data-combo", false).then(function (data) {
				$scope.listKategory = data.data.kategorydiagnosa;
				$scope.listJenisKelamin = data.data.jeniskelamin;

			})




			$scope.simpan = function () {
				if ($scope.item.namaDiagnosa == undefined) {
					messageContainer.error("Nama Diagnosa harus di isi!")
					return
				}
				if ($scope.item.kdDiagnosa == undefined) {
					messageContainer.error("Kode Diagnosa harus di isi!")
					return
				}
				
				var idDiagnosa = "";
				if ($scope.item.id != undefined) {
					idDiagnosa=$scope.item.id
				}


				var kategorydiagnosaid = "";
				if ($scope.item.kategorydiagnosa != undefined) {
					kategorydiagnosaid =$scope.item.kategorydiagnosa.id
				} else kategorydiagnosaid = null;
				
				var kdExternal = "";
				if ($scope.item.kdExternal != undefined) {
					kdExternal = $scope.item.kdExternal
				} else kdExternal = null;
				
				var namaExternal = "";
				if ($scope.item.namaExternal != undefined) {
					namaExternal = $scope.item.namaExternal
				} else namaExternal = "";
				
			
				var reportDisplay = "";
				if ($scope.item.reportDisplay != undefined) {
					reportDisplay =$scope.item.reportDisplay
				} else reportDisplay = "";
			
			
				var diagnosatindakan = {	
					iddiagnosatindakan: idDiagnosa,
					namadiagnosatindakan: $scope.item.namaDiagnosa,
					kddiagnosatindakan: $scope.item.kdDiagnosa,
					objectkategorydiagnosafk: kategorydiagnosaid,
					kodeexternal: kdExternal,
					namaexternal: namaExternal,
					reportdisplay: reportDisplay,
					
					}

					var objSave =
					{
						diagnosatindakan: diagnosatindakan
					}
					ManageSarprasPhp.postDiagnosaTindakan(objSave).then(function (e) {
						//  console.log(JSON.stringify(e.rekanan));
						$scope.item = {};
						var confirm = $mdDialog.confirm()
						.title('Caution')
						.textContent('Apakah Anda Akan Menambah Data Lagi?')
						.ariaLabel('Lucky day')
						.cancel('Ya')
						.ok('Tidak')
						$mdDialog.show(confirm).then(function () {
							$state.go("DiagnosaTindakanRev");
						})
					});
				// }
			}
			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.item = {};
			}




		}
		]);
});