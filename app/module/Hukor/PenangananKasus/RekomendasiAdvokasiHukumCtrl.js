define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekomendasiAdvokasiHukumCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'ManageSarpras',
        function ($q, $rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.item = {}; 
            if($state.params.noUsulan !== undefined){
		            $q.all([
		                ManageSarpras.getOrderList("advokasi-hukum-medicolegal/get-by-nousulan/?noUsulan=" + $state.params.noUsulan, true),
		              ]).then(function (data) { 
            			$scope.item.noKasus = data[0].data.data.noUsulan; 
            			$scope.item.jenisKasusHukum = data[0].data.data.jenisKasusHukum; 
            			$scope.item.saran= data[0].data.data.saran; 
            			$scope.item.isiKajian= data[0].data.data.isiKajian; 
            			$scope.item.rekomendasi = data[0].data.data.rekomendasi; 
            			$scope.item.link = data[0].data.data.rekomendasi; 
		            });
		    }

   	        $scope.save = function () {
                var data =  {
						"noKasus": $scope.item.noKasus,  
            			"rekomendasi":$scope.item.rekomendasi
                    } 
                console.log(JSON.stringify(data)); 
                ManageSarpras.saveDataSarPras(data, "advokasi-hukum-medicolegal/save-rekomendasi").then(function (e) {
                    console.log(JSON.stringify(e.data)); 
                });
            }



        }
    ]);
});