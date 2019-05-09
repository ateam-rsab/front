define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('TransferPemeriksaanFisikCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
    	function($rootScope, $scope, ModelItem, $state) {
	        $scope.title = "transfer Pasien Internal - Pemeriksaan Fisik";

	        //dummy data kesadaran
	        $scope.listKesadaran = [
	        { "id": "1", "name": "Kompos mentis"},
	        { "id": "1", "name": "Apatis"},
	        { "id": "1", "name": "Somnolen"},
	        { "id": "1", "name": "Sopor"},
	        { "id": "1", "name": "Coma"},
	        { "id": "1", "name": "Tumpul"},
	        ];

	        $scope.listStatGanguanNeurologi = [
	        { "id": "1", "name": "Tidak Ada"},
	        { "id": "1", "name": "Ada"}
	        ];
	       
    }]);
});
