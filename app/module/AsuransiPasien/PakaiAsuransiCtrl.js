// define(['initialize'], function(initialize) {
//     'use strict';
//     initialize.controller('KeluargaPasienCtrl', ['$rootScope', '$scope',
//     	function($rootScope, $scope) {
// 	        $scope.title = "ini page registrasi pasien baru ctrl";
	       
	        
//     }]);
// });

define(['initialize'], function(initialize) {
   'use strict';
   initialize.controller('PakaiAsuransiCtrl', ['$rootScope', '$scope', 'ModelItem',	
   	function($rootScope, $scope, ModelItem) {
	    $scope.title = "ini page alamat";
	       
	        //ambil data Pasien VO
	        $scope.item = {};
	        ModelItem.get("PasienVO").then(function(data) {
	            $scope.item = data;
	            $scope.dataAlamat = data.alamat;
	            
	        });
	    $scope.Lanjutkan = function() {
                modelItem.set("PakaiAsuransi", $scope.item);
                $state.go('pakaiAsuransi');
            }
	    $scope.test = function() {
	    	
	    }
	        //waktu saat ini
       		$scope.now = new Date();

			//list data pekerjaan
			ModelItem.getDataDummyGeneric("JenisKelamin", false).then(function(data) {
				$scope.listkelamin = data;
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
