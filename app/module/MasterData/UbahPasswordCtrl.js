define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('UbahPasswordCtrl', ['$q', '$rootScope', '$scope', '$window', 'ManageSarprasPhp', 'ModelItem', '$http', 'ManageSarpras', '$timeout',
		function ($q, $rootScope, $scope, $window, manageSarprasPhp, modelItem, $http, manageSarpras, $timeout) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			init();
			$scope.isLogout = false;
			$scope.pegawai = modelItem.getPegawai();
			$scope.datauserlogin = JSON.parse(window.localStorage.getItem("datauserlogin"));
			$scope.item.namaPegawai = $scope.pegawai.namaLengkap;

			getUserLoginData();

			function getUserLoginData() {
				manageSarprasPhp.getDataTableTransaksi("pegawai/svc-modul?get=loginuser&id=" + $scope.datauserlogin.id).then(function (data) {
					$scope.item.idlogin = data.data.loginuser[0].luid;
					$scope.item.namaUser = data.data.loginuser[0].namauser;
					// $scope.item.kataKunciPass = data.data.loginuser.katasandi;
					// $scope.item.kataKunciConfirm = data.data.loginuser.katasandi;
					$scope.item.kelompokUserHakAkses = {
						id: data.data.loginuser[0].kuid,
						kelompokuser: data.data.loginuser[0].kelompokuser
					};
					$scope.dataGrid = data.data.loginuser[0].data;


				})
			}
			init();

			function init() {
				manageSarprasPhp.getDataTableTransaksi("pegawai/svc-modul?get=kelompokuser").then(function (datapegawai) {
					$scope.listKelompokuser = datapegawai.data;
				});
			}

			$scope.simpan = function () {
				if ($scope.item.idlogin == undefined) {
					alert('Pilih dahullu pegawai!')
					return
				}
				if ($scope.item.kataKunciPass != $scope.item.kataKunciConfirm) {
					alert('Kata kunci tidak sama')
					return
				}

				var objSave = {
					id: $scope.item.idlogin,
					kelompokUser: {
						id: $scope.item.kelompokUserHakAkses.id
					},
					statusLogin: 0,
					kataSandi: $scope.item.kataKunciPass,
					namaUser: $scope.item.namaUser,
					pegawai: {
						id: $scope.pegawai.id
					}
				}

				//save to java katasandi column
				manageSarpras.saveLoginUser(objSave).then(function (je) {});

				//save to php passcode column
				manageSarprasPhp.saveDataTransaksi('admin/ubah-password', objSave).then(function (pe) {
					if (pe.data.messages == 'Sukses') {
						// jika sukses save to java 
						// manageSarpras.saveLoginUser(objSave).then(function (je) {
							// if (je.data.messages['label-success'] === "SUKSES") {
								toastr.info('Silahkan login ulang');
								$timeout(function() {
									// localStorage.clear();
									// $window.location.replace('Logout');
									$rootScope.doLogout();
								}, 5000);
								
							// }
							// $scope.isLogout = e.data.messages['label-success'] === "SUKSES" ? true : false;
						// });
					}
				});


				// doLogout();
			}

			$scope.batal2 = function () {
				window.history.back();
			}



		}
	]);
});
