define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormulariumCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
            $scope.title = "Formularium 2017"
		}
	]);
});