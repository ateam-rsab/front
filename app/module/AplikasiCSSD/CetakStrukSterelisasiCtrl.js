define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CetakStrukSterelisasiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("folder/fileJson").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.dataCheckbox = [
				{id:1, name:"Steam"},
				{id:2, name:"ETO"},
				{id:3, name:"Plasma"},
				{id:4, name:"Formaldehyde"}
				]
				$scope.prosesSterelisasi = [
				{id:1, name:"Kemasan Siap Steril"},
				{id:2, name:"Pengemasan s/d Steril"},
				{id:3, name:"Dekontaminasi s/d Sterilisasi"}]
			}, function errorCallBack(err) {});
		}
	]);
});