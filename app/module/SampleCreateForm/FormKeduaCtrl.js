
define(['initialize'], function(initialize) {
	
	'use strict';
	initialize.controller('FormKeduaCtrl', ['$rootScope', '$scope', 'ModelItem', 'GetPostOnFormKedua',
		function($rootScope, $scope, ModelItem, b) {
			$scope.title = "Data Pasien Baru";
			$scope.showNamaAyah=false;
			
			$scope.$watch('item.NamaLengkapAyah', function(newValue, oldValue) {
				if(newValue==='ayah'){
					$scope.showNamaAyah=true;
				}else
					$scope.showNamaAyah=false;
					
			});


			// TextInput Conntroller Nama Lengkap Pasien
			$scope.item = {}; 
			$scope.now = new Date();

			ModelItem.get("Sample/LabelFormKedua").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			// TextInput Conntroller Nama Lengkap Ayah
			// TextInput Conntroller Tempat Tanggal Lahir
			// TextInput Conntroller Nama Lengkap Ibu			
			// TextInput Conntroller Nama Lengkap Suami
			// Text Area Conntroller Alamat Lengkap
			// Combo box Jenis Kelamin
			ModelItem.getDataDummyGeneric("ListCheckBoxFormKeduaJenisKelamin", true).then(function(data) {
				$scope.listJenisKelamin = data;
			})
			
			// Combo box Agama
			ModelItem.getDataDummyGeneric("ListCheckBoxFormKeduaAgama", true).then(function(data) {
				$scope.listAgama = data;
			})
			
			// Combo box Status Perkawinan
			ModelItem.getDataDummyGeneric("ListCheckBoxFormKeduaStatusPerkawinan", true).then(function(data) {
				$scope.listStatusPerkawinan = data;
			})
			
			// Combo box Pendidikan
			ModelItem.getDataDummyGeneric("ListCheckBoxFormKeduaPendidikan", true).then(function(data) {
				$scope.listPendidikan = data;
			})
			
			// Combo box Pekerjaan
			ModelItem.getDataDummyGeneric("ListCheckBoxFormKeduaPekerjaan", true).then(function(data) {
				$scope.listPekerjaan = data;
			})

			//-----keperluan grid 
			$scope.dataFormKedua = new kendo.data.DataSource({
				data: []
			});



			$scope.Next=function(){
				//$scope.item.dataForm = $scope.dataFormKedua._data;
				
				
				delete $scope.item.attributes;
				var dataVO=$scope.item;
				console.log(JSON.stringify($scope.item));
				
				//kirim data inputan dari frontend ke server
				var a=b.KataKata();
				
				b.POSTDataFormKedua(dataVO, "FormKedua")
				.then(
					function(res) {
						alert("success");
					},
					function(err) {
						
						alert(err.data);
					})
			}
			
		}]);	
	
});