define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('testCtrl', ['$rootScope', '$scope', '$http',
		function($rootScope, $scope, $http) {
			$scope.gridOptions = {
				columns: [ { field: "ProductID" }, { field: "ProductName" } ],
				pageable: true,
				dataSource: {
					pageSize: 5,
					transport: {
						read: function (e) {
							$http.jsonp('http://demos.telerik.com/kendo-ui/service/Products?callback=JSON_CALLBACK')
							.then(function success(response) {
								e.success(response.data)
							}, function error(response) {
								alert('something went wrong')
								console.log(response);
							})
						}
					}
				}
			}
		}
	]);
});