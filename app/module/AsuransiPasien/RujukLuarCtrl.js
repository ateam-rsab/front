// define(['initialize'], function(initialize) {
//     'use strict';
//     initialize.controller('KeluargaPasienCtrl', ['$rootScope', '$scope',
//     	function($rootScope, $scope) {
// 	        $scope.title = "ini page registrasi pasien baru ctrl";
	       
	        
//     }]);
// });

define(['initialize'], function(initialize) {
   'use strict';
   initialize.controller('RujukLuarCtrl', ['$rootScope', '$scope', 'ModelItem',	
   	function($rootScope, $scope, ModelItem) {
	    $scope.title = "ini page alamat";
	       
	        //ambil data Pasien VO
	        $scope.item = {};
	        ModelItem.get("PasienVO").then(function(data) {
	            $scope.item = data;
	            $scope.dataAlamat = data.alamat;
	            
	        });
	    $scope.Lanjutkan = function() {
                modelItem.set("RujukLuar", $scope.item);
                $state.go('rujukLuar');
            }
	    $scope.test = function() {
	    	
	    }
	        //waktu saat ini
       		$scope.now = new Date();

			//list data pekerjaan
			var arrFieldSelectVoPekerjaan = ['id', 'pekerjaan'];
			ModelItem.getKendoSource("Pekerjaan", arrFieldSelectVoPekerjaan).then(function(data){
				$scope.listDataPekerjaan = data;
			})

			//list data agama
			var arrFieldSelectVoAgama = ['id', 'agama'];
			ModelItem.getKendoSource("Agama", arrFieldSelectVoAgama).then(function(data){
				$scope.listDataAgama = data;
			})

			//list data status perkawinan
			var arrFieldSelectVoStatusPerkawinan = ['id', 'statusPerkawinan'];
			ModelItem.getKendoSource("StatusPerkawinan", arrFieldSelectVoStatusPerkawinan).then(function(data){
				$scope.listDataStatusPerkawinan = data;
			})

			//list data jenis kelamin
			var arrFieldSelectVoJenisKelamin = ['id', 'jenisKelamin'];
			ModelItem.getKendoSource("JenisKelamin", arrFieldSelectVoJenisKelamin).then(function(data){
				$scope.listDataJenisKelamin = data;
			})

			//list data nama title depan
			var arrFieldSelectVoNamaTitle = ['id', 'namaTitle'];
			ModelItem.getKendoSource("TitlePasien", arrFieldSelectVoNamaTitle).then(function(data){
				$scope.listDataNamaTitle = data;
			})

			//list data pendidikan
			var arrFieldSelectVoPendidikan = ['id', 'pendidikan'];
			ModelItem.getKendoSource("Pendidikan", arrFieldSelectVoPendidikan).then(function(data){
				$scope.listDataPendidikan = data;
			})

			//list data jabatan
			var arrFieldSelectVoJabatan = ['id', 'namaJabatan'];
			ModelItem.getKendoSource("Jabatan", arrFieldSelectVoJabatan).then(function(data){
				$scope.listDataJabatan = data;
			})

			//list data Suku
			var arrFieldSelectVoSuku = ['id', 'suku'];
			ModelItem.getKendoSource("Suku", arrFieldSelectVoSuku).then(function(data){
				$scope.listDataSuku = data;
			})

			//list data Suku
			var arrFieldSelectVoGolonganDarah = ['id', 'golonganDarah'];
			ModelItem.getKendoSource("GolonganDarah", arrFieldSelectVoGolonganDarah).then(function(data){
				$scope.listDataGolonganDarah = data;
			})

			//list data Suku
			var arrFieldSelectVoNegara = ['id', 'namaNegara'];
			ModelItem.getKendoSource("Negara", arrFieldSelectVoNegara).then(function(data){
				$scope.listDataNegara = data;
			})


			//toggle alamat detail
			$scope.showHIdeAlamatDetail = function()
			{
				if($scope.alamatDetailIsShow)
				{
					$scope.alamatDetailIsShow = false;
				}
				else
				{
					$scope.alamatDetailIsShow = true;
				}
			}

	        //kirim data
	        $scope.KirimData = function()
	        {
	        	
	        	// var atributeIsdeleted = delete $scope.item.attributes; 

	        	// var arrDataAlamat = [$scope.dataAlamat];
	        	// $scope.item.alamats = arrDataAlamat;

	        	// RegistrasiPasienBaru.SendData($scope.item, "pasien/save-pasien")
	        	// .then(function(res){
	        	// 	
	        	// })


	        	/*var dataVO = $scope.dataPasienBaru;

	        	dataVO.noCM.namaPasien = "Dicky Jaya Umbara";

	        	ModelItem.post("save-pasien-daftar", dataVO)
	        	.then(function(res){
	        		alert("sukses kiri data");
	        	})*/
	        }
	        
   }]);
}); 
