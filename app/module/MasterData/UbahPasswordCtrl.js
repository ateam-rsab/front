define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('UbahPasswordCtrl', ['$q', '$rootScope', '$scope', '$window', 'ManageSarprasPhp', 'ModelItem','$http','ManageSarpras',
		function($q, $rootScope, $scope, $window, manageSarprasPhp, modelItem, $http,manageSarpras) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();	
			init();
		    $scope.pegawai = modelItem.getPegawai();
		 	$scope.datauserlogin = JSON.parse(window.localStorage.getItem("datauserlogin"));
			$scope.item.namaPegawai= $scope.pegawai.namaLengkap;

		    getUserLoginData();
			function getUserLoginData (){
			 	 manageSarprasPhp.getDataTableTransaksi("pegawai/svc-modul?get=loginuser&id="+$scope.datauserlogin .id).then(function(data){
					$scope.item.idlogin = data.data.loginuser[0].luid;
					$scope.item.namaUser = data.data.loginuser[0].namauser;
					// $scope.item.kataKunciPass = data.data.loginuser.katasandi;
					// $scope.item.kataKunciConfirm = data.data.loginuser.katasandi;
					$scope.item.kelompokUserHakAkses ={id:data.data.loginuser[0].kuid,kelompokuser:data.data.loginuser[0].kelompokuser} ;
					$scope.dataGrid = data.data.loginuser[0].data;
					
					
				})
			}
			init();
			
			function init() {
				manageSarprasPhp.getDataTableTransaksi("pegawai/svc-modul?get=kelompokuser").then(function(datapegawai){
					$scope.listKelompokuser = datapegawai.data;
				});
			}

			$scope.simpan = function(){
				if ($scope.item.idlogin == undefined) {
					alert('Pilih dahullu pegawai!')
					return
				}
				if ($scope.item.kataKunciPass != $scope.item.kataKunciConfirm) {
					alert('Kata kunci tidak sama')
					return
				}
			
                var objSave = {
                        id:$scope.item.idlogin,
						kelompokUser:{  
					      id:$scope.item.kelompokUserHakAkses.id
						},
						statusLogin:0,
						kataSandi:$scope.item.kataKunciPass,
						namaUser:$scope.item.namaUser,
						pegawai:{  
					      id:$scope.pegawai.id
						}
                    }
                
                manageSarprasPhp.saveDataTransaksi('admin/ubah-password',objSave).then(function(e) {
                // manageSarpras.saveLoginUser(objSave).then(function(e) {

                })
			}

			$scope.batal2=function(){
				window.history.back();
			}

		

		}
		]
		);
});